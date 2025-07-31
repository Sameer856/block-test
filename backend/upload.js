const express = require("express");
const cors = require("cors");
const fs = require("fs");
const os = require("os");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/upload", (req, res) => {
  const code = req.body.code;
  let boardType = req.body.boards || req.body.board || "arduino:avr:uno";
  console.log("🔍 Received board:", boardType);

  console.log(`\n=== 🔧 Upload Requested ===`);
  console.log(`➡️  Board type: ${boardType}`);

  if (!code) return res.status(400).send("❌ Missing code");

  // Save code to blink.ino
  try {
    fs.mkdirSync("blink", { recursive: true });
    fs.writeFileSync("blink/blink.ino", code);
  } catch (e) {
    return res.status(500).send(`❌ Failed to save code: ${e.message}`);
  }

  // Detect available USB serial ports
  const platform = os.platform();
  let usbPorts = [];

  try {
    if (platform === "darwin") {
      // macOS
      usbPorts = fs
        .readdirSync("/dev")
        .filter(
          (name) =>
            name.startsWith("cu.usb") ||
            name.includes("usbserial") ||
            name.includes("SLAB")
        )
        .map((name) => `/dev/${name}`);
    } else if (platform === "win32") {
      // Windows: Try COM1 to COM20 as possible ports
      usbPorts = Array.from({ length: 20 }, (_, i) => `COM${i + 1}`);
    } else {
      return res.status(500).send("❌ Unsupported OS");
    }
  } catch (err) {
    return res
      .status(500)
      .send(`❌ Failed to read serial ports: ${err.message}`);
  }

  console.log("🔌 Available USB ports:", usbPorts);

  if (usbPorts.length === 0) {
    return res
      .status(500)
      .send("❌ No USB serial device found (Is your board plugged in?)");
  }

  const port = usbPorts[0];
  console.log(`✅ Using serial port: ${port}`);

  // Compile & Upload
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
