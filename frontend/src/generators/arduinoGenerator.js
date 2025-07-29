import * as Blockly from "blockly";

const arduinoGenerator = new Blockly.Generator("Arduino");

// Operator precedences
arduinoGenerator.ORDER_ATOMIC = 0;
arduinoGenerator.ORDER_NONE = 99;

// Storage for includes, declarations, and setup code
arduinoGenerator.includes_ = new Set();
arduinoGenerator.declarations_ = new Set();
arduinoGenerator.setups_ = new Set();

arduinoGenerator.nameDB_ = new Blockly.Names(Blockly.Generator.NAME_TYPE);

arduinoGenerator.init = function (workspace) {
  this.nameDB_ = new Blockly.Names(Blockly.Generator.NAME_TYPE);
  this.nameDB_.setVariableMap(workspace.getVariableMap());
};


// Helper methods
arduinoGenerator.addInclude = function (code) {
  this.includes_.add(code);
};

arduinoGenerator.addDeclaration = function (code) {
  this.declarations_.add(code);
};

arduinoGenerator.addSetup = function (...lines) {
  lines.forEach((line) => this.setups_.add(line));
};
arduinoGenerator.setupsMap_ = new Map(); // pin -> setup lines
arduinoGenerator.reset = function () {
  this.includes_.clear();
  this.declarations_.clear();
  this.setups_.clear();
  this.setupsMap_?.clear?.(); // safely clear maps too
};

arduinoGenerator.getSetupCode = function () {
  return Array.from(this.setupsMap_.values())
    .map((line) => `  ${line}`)
    .join("\n");
};

arduinoGenerator.forBlock["math_number"] = function (block) {
  const code = Number(block.getFieldValue("NUM"));
  return [code, arduinoGenerator.ORDER_ATOMIC];
};

arduinoGenerator.workspaceToCode = function (workspace) {
  this.includes_.clear();
  this.declarations_.clear();
  this.setups_.clear();

  let loopCode = "";

  const blocks = workspace.getTopBlocks(true);
  for (const block of blocks) {
    if (block.type === "arduino_loop") {
      const code = this.blockToCode(block);
      loopCode += code + "\n";
    } else if (block.type === "arduino_setup") {
      const setupCode = this.blockToCode(block); 
      setupCode.split("\n").forEach((line) => {
        const clean = line.trim();
        if (clean) this.setups_.add(clean);
      });
    } else {
      const parent = block.getSurroundParent?.();
      if (!parent) {
        const code = this.blockToCode(block);
        
        // ✅ Inject into loop if it's a valid loop-bound type
        if (["switch_case", "repeat_for", "case_block", "some_other_custom"].includes(block.type)) {
          loopCode += code + "\n";
        } else {
          // optionally warn or inject somewhere else
        }
      }
    }
    
  }

  return `
  ${Array.from(this.includes_).join("\n")}
  
  ${Array.from(this.declarations_).join("\n")}
  
  void setup() {
  ${Array.from(this.setups_)
    .map((line) => `  ${line}`)
    .join("\n")}
  }
  
  void loop() {
  ${loopCode
    .split("\n")
    .map((line) => (line.trim() ? `  ${line}` : ""))
    .join("\n")}
  }`;
  
};


export default arduinoGenerator;
