const express = require("express");
const cors = require("cors");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/upload", (req, res) => {
  const code = req.body.code;
  let boardType = req.body.boards || req.body.board || "arduino:avr:uno"; // Default fallback

  console.log("\n=== 🔧 Upload Requested ===");
  console.log("Board:", boardType);

  if (!code) return res.status(400).send("❌ Missing code");

  // === 1. Create sketch folder and save blink.ino ===
  const isPackaged = !!process.resourcesPath;
  const sketchDir = isPackaged
    ? path.join(os.tmpdir(), "arduino-ide-sketch")
    : path.join(__dirname, "blink");

  const inoPath = path.join(sketchDir, "blink.ino");

  try {
    fs.mkdirSync(sketchDir, { recursive: true });
    fs.writeFileSync(inoPath, code);
  } catch (e) {
    return res.status(500).send(`❌ Failed to save code: ${e.message}`);
  }

  // === 2. Detect serial port ===
  const platform = process.platform;
  let port;

  try {
    if (platform === "darwin") {
      const devDir = "/dev";
      const usbPorts = fs.readdirSync(devDir).filter(name =>
        name.includes("usb") || name.includes("SLAB") || name.includes("modem")
      );
      if (usbPorts.length === 0) throw new Error("No USB devices found");
      port = path.join(devDir, usbPorts[0]);
    } else if (platform === "win32") {
      // NOTE: You should use `serialport` package for dynamic detection
      port = "COM3"; // Default fallback for Windows
    } else {
      // Linux
      const devDir = "/dev";
      const usbPorts = fs.readdirSync(devDir).filter(name =>
        name.startsWith("ttyUSB") || name.startsWith("ttyACM")
      );
      if (usbPorts.length === 0) throw new Error("No USB devices found");
      port = path.join(devDir, usbPorts[0]);
    }
  } catch (e) {
    return res.status(500).send(`❌ USB detection error: ${e.message}`);
  }

  console.log(`✅ Using port: ${port}`);

  // === 3. Locate CLI and config file ===
  let cliPath, cliConfig;
  if (isPackaged) {
    cliPath = path.join(process.resourcesPath, "electron", "cli", "arduino-cli");
    cliConfig = path.join(process.resourcesPath, "electron", "cli", "arduino-cli.yaml");
  } else {
    cliPath = path.join(__dirname, "..", "electron", "cli", "arduino-cli");
    cliConfig = path.join(__dirname, "..", "electron", "cli", "arduino-cli.yaml");
  }

  console.log("🔧 Using Arduino CLI:", cliPath);
  console.log("📄 Using CLI config:", cliConfig);

  // Ensure Arduino CLI uses local data dir (not system Arduino15)
process.env.ARDUINO_DATA_DIR = path.join(path.dirname(cliConfig), "arduino15");

// Build compile and upload command
const compileCmd = `"${cliPath}" --config-file "${cliConfig}" compile --fqbn ${boardType} "${sketchDir}"`;
const uploadCmd = `"${cliPath}" --config-file "${cliConfig}" upload -p ${port} --fqbn ${boardType} "${sketchDir}"`;

console.log("🚀 CMD:", compileCmd, "&&", uploadCmd);


exec(`${compileCmd} && ${uploadCmd}`, { env: process.env }, (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Upload error:", stderr || err.message);
    return res.status(500).send(stderr || err.message);
  }

  console.log("✅ Upload successful:\n", stdout);
  res.send(stdout);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ IDE backend running on http://localhost:${PORT}`);
});
