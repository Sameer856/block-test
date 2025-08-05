const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const { spawn, execSync } = require("child_process");
const fs = require("fs");

let backendProcess;

// === LOGGING SETUP ===
const userDataPath = app.getPath("userData");
const mainLogPath = path.join(userDataPath, "main.log");
const backendLogPath = path.join(userDataPath, "backend.log");

const mainLogStream = fs.createWriteStream(mainLogPath, { flags: "a" });
function log(...args) {
  const message = "[LOG] " + args.join(" ") + "\n";
  mainLogStream.write(message);
  console.log(...args);
}
function error(...args) {
  const message = "[ERROR] " + args.join(" ") + "\n";
  mainLogStream.write(message);
  console.error(...args);
}

// === FRONTEND WINDOW ===
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const frontendPath = path.join(__dirname, "../frontend/build/index.html");
  log("🎨 Loading frontend from:", frontendPath);
  win.loadFile(frontendPath);
  // win.webContents.openDevTools(); // Uncomment for debug
}

// === START BACKEND ===
function startBackend() {
  const backendPath = app.isPackaged
    ? path.join(process.resourcesPath, "backend", "upload.js")
    : path.join(__dirname, "../backend/upload.js");

  log("📦 App is packaged:", app.isPackaged);
  log("🚀 Starting backend from:", backendPath);

  if (!fs.existsSync(backendPath)) {
    error("❌ Backend script not found:", backendPath);
    dialog.showErrorBox("Error", `upload.js not found at:\n${backendPath}`);
    return;
  }

  const nodePath = app.isPackaged
  ? path.join(process.resourcesPath, "node", "bin", "node")
  : "/opt/homebrew/bin/node"; // fallback in dev
  // Replace this!
  backendProcess = spawn(nodePath, [backendPath], {
    stdio: ["ignore", "pipe", "pipe"],
    shell: false
  });
  
  

  const backendLogStream = fs.createWriteStream(backendLogPath, { flags: "a" });

  backendProcess.stdout.on("data", (data) => {
    backendLogStream.write("[OUT] " + data.toString());
  });

  backendProcess.stderr.on("data", (data) => {
    backendLogStream.write("[ERR] " + data.toString());
  });

  backendProcess.on("close", (code) => {
    backendLogStream.write(`\n[EXIT] Backend exited with code ${code}\n`);
    log(`Backend exited with code ${code}`);
  });

  backendProcess.on("error", (err) => {
    backendLogStream.write(`[ERROR] ${err.stack}\n`);
    error("❌ Backend process error:", err);
  });
}

// === ARDUINO CLI SETUP ===
function setupArduinoCLI() {
  const cliPath = app.isPackaged
    ? path.join(process.resourcesPath, "cli", "arduino-cli")
    : path.join(__dirname, "cli", "arduino-cli");

  log("🔧 Using Arduino CLI at:", cliPath);

  try {
    const output = execSync(`"${cliPath}" core list`).toString();
    const avrInstalled = output.includes("arduino:avr");

    if (!avrInstalled) {
      log("⚙️ Installing arduino:avr core...");
      const install = spawn(cliPath, ["core", "install", "arduino:avr"], {
        stdio: "inherit",
        shell: true
      });

      install.on("close", (code) => {
        if (code === 0) {
          log("✅ arduino:avr core installed");
        } else {
          error("❌ Failed to install arduino:avr core");
        }
      });
    } else {
      log("✅ arduino:avr core already installed");
    }
  } catch (err) {
    error("❌ Failed to check/install Arduino core:", err.message);
  }
}

// === APP READY ===
app.whenReady().then(() => {
  setupArduinoCLI();
  startBackend();
  createWindow();
});

// === MAC WINDOW HANDLING ===
app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// === CLEANUP ===
app.on("window-all-closed", function () {
  if (backendProcess) backendProcess.kill();
  if (process.platform !== "darwin") app.quit();
});
