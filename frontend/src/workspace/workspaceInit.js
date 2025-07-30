import * as Blockly from "blockly/core";

export default function initWorkspace(blocklyDiv, toolboxXml, arduinoGenerator, onCodeChange) {
  // Clean up any existing workspace
  const existingWorkspace = Blockly.getMainWorkspace();
  if (existingWorkspace && !existingWorkspace.disposed) {
    try {
      console.log("Disposing existing workspace...");
      existingWorkspace.dispose();
    } catch (error) {
      console.warn('Error disposing existing workspace:', error);
    }
  }

  const workspace = Blockly.inject(blocklyDiv, {
    
    toolbox: toolboxXml,
    scrollbars: true,
    horizontalLayout: false,
    toolboxPosition: 'start',
    toolboxWidth: 500,
    theme: Blockly.Themes.Classic,
    renderer: 'geras',
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2
    },
    grid: {
      spacing: 20,
      length: 3,
      colour: '#ccc',
      snap: true
    },
    move: {
      scrollbars: {
        horizontal: true,
        vertical: true
      },
      drag: true,
      wheel: true
    }
  });
  arduinoGenerator.init(workspace);

  // Add real-time code generation
// Add real-time code generation
if (typeof onCodeChange === "function") {
  workspace.addChangeListener(() => {
    if (!workspace.disposed) {
      try {
        // ✅ Clear old includes, declarations, setup lines etc.
        if (typeof arduinoGenerator.reset === "function") {
          arduinoGenerator.reset();
        }

        // Generate fresh code
        const rawCode = arduinoGenerator.workspaceToCode(workspace);
        const finalCode = arduinoGenerator.finish
          ? arduinoGenerator.finish(rawCode)
          : rawCode;

        onCodeChange(finalCode || "// No blocks in workspace.");
      } catch (error) {
        console.error("Error generating code:", error);
        onCodeChange("// Error generating code");
      }
    }
  });
}


  // Adjust size after a brief delay
  setTimeout(() => {
    if (!workspace.disposed) {
      Blockly.svgResize(workspace);
  
      const toolboxWidth = 500;
  
      // Wait for DOM to render toolbox/flyout
      setTimeout(() => {
        const toolboxDiv = document.querySelector('.blocklyToolboxDiv');
        const flyout = document.querySelector('.blocklyFlyout');
  
        if (toolboxDiv) toolboxDiv.style.width = `${toolboxWidth}px`;
        if (flyout) flyout.style.left = `${toolboxWidth}px`;
      }, 50);
    }
  }, 100);
  

  console.log("Workspace created successfully");
  return workspace;
}