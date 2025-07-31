const express = require("express");
const cors = require("cors");
const fs = require("fs");
const os = require("os");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/upload", async (req, res) => {
  const code = req.body.code;
  let boardType = req.body.boards || req.body.board || "arduino:avr:uno";

  console.log("🔍 Received board:", boardType);
  console.log(`\n=== 🔧 Upload Requested ===`);
  console.log(`➡️  Board type: ${boardType}`);

  if (!code) return res.status(400).send("❌ Missing code");

  try {
    fs.mkdirSync("blink", { recursive: true });
    fs.writeFileSync("blink/blink.ino", code);
  } catch (e) {
    return res.status(500).send(`❌ Failed to save code: ${e.message}`);
  }

  // Detect OS-specific serial ports
  const platform = os.platform();
  let port = null;

  try {
    if (platform === "darwin") {
      // macOS
      const devEntries = fs.readdirSync("/dev");
      const match = devEntries.find(
        (name) => name.startsWith("cu.usb") || name.includes("usbserial") || name.includes("SLAB")
      );
      if (match) port = `/dev/${match}`;
    } else if (platform === "win32") {
      // Windows — naive guess: COM3 to COM10
      // You can improve this using `@serialport/list`
      for (let i = 3; i <= 10; i++) {
        port = `COM${i}`;
        break; // First COM assumed
      }
    } else {
      return res.status(500).send("❌ Unsupported OS");
    }
  } catch (e) {
    return res.status(500).send(`❌ Port detection error: ${e.message}`);
  }

  if (!port) {
    return res.status(500).send("❌ No serial port found (Is your board connected?)");
  }

  console.log(`✅ Using serial port: ${port}`);

  const compileCmd = `arduino-cli compile --fqbn ${boardType} blink`;
  const uploadCmd = `arduino-cli upload -p ${port} --fqbn ${boardType} blink`;

  console.log("🚀 Running command:");
  console.log(`${compileCmd} && ${uploadCmd}`);

  exec(`${compileCmd} && ${uploadCmd}`, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Upload failed:\n", stderr);
      return res.status(500).send(stderr || "Upload failed");
    }

    console.log("✅ Upload output:\n", stdout);
    res.send(stdout);
  });
});

app.listen(3001, () => {
  console.log("✅ IDE backend running at http://localhost:3001");
});
