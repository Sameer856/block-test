const express = require("express");
const cors = require("cors");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

const isDev = !process.env.ELECTRON_RUN_AS_NODE && process.env.NODE_ENV !== "production";

const cliPath = isDev
  ? path.join(__dirname, "arduino-cli", "arduino-cli")
  : path.join(process.resourcesPath, "backend", "arduino-cli", "arduino-cli");

// Ensure executable permission (macOS/Linux)
fs.chmod(cliPath, 0o755, (err) => {
  if (err) console.warn("⚠️ Failed to set exec permission for CLI:", err.message);
});

app.post("/upload", async (req, res) => {
  const code = req.body.code;
  const boardType = req.body.boards || req.body.board || "arduino:avr:uno";

  console.log("\n=== 🔧 Upload Requested ===");
  console.log("📦 Board:", boardType);

  if (!code) return res.status(400).send("❌ Missing code");

  try {
    fs.mkdirSync("blink", { recursive: true });
    fs.writeFileSync("blink/blink.ino", code);
  } catch (e) {
    return res.status(500).send(`❌ Failed to save code: ${e.message}`);
  }

  const platform = os.platform();
  let port = null;

  if (platform === "darwin") {
    try {
      const devEntries = fs.readdirSync("/dev");
      const match = devEntries.find((name) =>
        name.startsWith("cu.usb") || name.includes("usbserial") || name.includes("SLAB")
      );
      if (match) port = `/dev/${match}`;
    } catch (e) {
      return res.status(500).send("❌ Failed to read /dev on macOS");
    }
  } else if (platform === "win32") {
    // Just assume COM3 for demo (can be improved with serialport module)
    port = "COM3";
  } else {
    return res.status(500).send("❌ Unsupported OS");
  }

  if (!port) {
    return res.status(500).send("❌ No serial port found (Is your board connected?)");
  }

  console.log(`✅ Detected Port: ${port}`);

  const compileCmd = `"${cliPath}" compile --fqbn ${boardType} blink`;
  const uploadCmd = `"${cliPath}" upload -p ${port} --fqbn ${boardType} blink`;

  console.log("🚀 Command:");
  console.log(`${compileCmd} && ${uploadCmd}`);

  exec(`${compileCmd} && ${uploadCmd}`, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Upload failed:\n", stderr);
      return res.status(500).send(stderr || "Upload failed");
    }

    console.log("✅ Success:\n", stdout);
    res.send(stdout);
  });
});

app.listen(3001, () => {
  console.log("✅ IDE backend running at http://localhost:3001");
});
