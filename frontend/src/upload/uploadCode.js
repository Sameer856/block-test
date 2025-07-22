export default function uploadCode(
  workspace,
  generator,
  setUploadProgress,
  setUploadStatus,
  setUploadConsole,
  selectedBoard
) {
  const code = generator.workspaceToCode(workspace);

  const fqbn = selectedBoard; // ✅ Already the full FQBN like 'esp32:esp32:esp32'
  console.log("Selected Board (FQBN):", fqbn);

  if (!fqbn) {
    setUploadStatus("❌ No board selected.");
    return;
  }

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
    body: JSON.stringify({ code, board: fqbn }),
  })
    .then((res) => {
      setUploadProgress(60);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
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
