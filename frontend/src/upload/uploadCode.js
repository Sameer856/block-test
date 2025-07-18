import * as Blockly from "blockly";
import "../generators/arduinoGenerator.js";

export default function uploadCode(
  workspace,
  generator,
  setUploadProgress,
  setUploadStatus,
  setUploadConsole
) {
  const code = generator.workspaceToCode(workspace);

  if (!code.trim()) {
    setUploadStatus("❌ No code to upload. Add blocks first.");
    setUploadProgress(0);
    return;
  }

  setUploadStatus("⏳ Uploading...");
  setUploadProgress(10);
  setUploadConsole("[Uploading started...]\n");

  fetch("http://localhost:3001/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  })
    .then((res) => {
      setUploadProgress(60);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.status}`);
      }
      return res.text();
    })
    .then((text) => {
      setUploadProgress(100);
      setUploadStatus("✅ Upload Successful!");
      setUploadConsole((prev) => prev + text);
    })
    .catch((err) => {
      setUploadProgress(0);
      setUploadStatus("❌ Upload Failed.");
      setUploadConsole(
        (prev) => prev + `Error: ${err.message}\nCheck board & connection.\n`
      );
    });
}
