import * as Blockly from "blockly/core";

let workspace = null; // global reference

export default function initWorkspace(
  blocklyDiv,
  toolboxXml,
  arduinoGenerator,
  onCodeChange
) {
  // Reuse existing workspace
  if (workspace && !workspace.isDisposed) {
    Blockly.svgResize(workspace);
    return workspace;
  }

  // Create new workspace
  workspace = Blockly.inject(blocklyDiv, {
    toolbox: toolboxXml,
    scrollbars: true,
    toolboxPosition: "start",
    theme: Blockly.Themes.Classic,
    renderer: "geras",
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
    },
    grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
    move: {
      scrollbars: { horizontal: true, vertical: true },
      drag: true,
      wheel: true,
    },
  });

  // Initialize Arduino generator
  arduinoGenerator.init(workspace);

  // Generate code helper
  const generateCode = () => {
    if (!workspace.isDisposed) {
      try {
        arduinoGenerator.reset?.();
        const rawCode = arduinoGenerator.workspaceToCode(workspace);
        const finalCode = arduinoGenerator.finish
          ? arduinoGenerator.finish(rawCode)
          : rawCode;
        onCodeChange(finalCode || "// No blocks in workspace.");
      } catch (err) {
        console.error("Error generating code:", err);
        onCodeChange("// Error generating code");
      }
    }
  };

  // Restore workspace from localStorage
  const savedXml = localStorage.getItem("blocklyWorkspace");
  if (savedXml) {
    try {
      const xmlDom = Blockly.Xml.textToDom(savedXml);
      Blockly.Xml.domToWorkspace(xmlDom, workspace);
    } catch (err) {
      console.error("Failed to restore workspace:", err);
    }
  }

  // Listen to changes
  workspace.addChangeListener(() => {
    generateCode();
    try {
      const xml = Blockly.Xml.workspaceToDom(workspace);
      localStorage.setItem("blocklyWorkspace", Blockly.Xml.domToText(xml));
    } catch (err) {
      console.error("Failed to save workspace:", err);
    }
  });

  generateCode(); // initial code generation

  setTimeout(() => {
    if (!workspace.isDisposed) Blockly.svgResize(workspace);
  }, 100);

  return workspace;
}

// Safe dispose function
export function disposeWorkspace() {
  if (workspace && !workspace.isDisposed) {
    try {
      workspace.dispose();
    } catch (err) {
      console.warn("Workspace already disposed:", err);
    }
    workspace = null;
  }
}
