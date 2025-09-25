import * as Blockly from "blockly";

const arduinoGenerator = new Blockly.Generator("Arduino");

// Operator precedences
arduinoGenerator.ORDER_ATOMIC = 0;
arduinoGenerator.ORDER_NONE = 99;
arduinoGenerator.ORDER_MULTIPLICATIVE = 3; // * /
arduinoGenerator.ORDER_ADDITIVE = 4; // + -
arduinoGenerator.ORDER_NONE = 99;

// Storage for includes, declarations, and setup code
arduinoGenerator.includes_ = new Set();
arduinoGenerator.declarationsMap_ = new Map();

arduinoGenerator.setups_ = [];

arduinoGenerator.nameDB_ = new Blockly.Names(Blockly.Generator.NAME_TYPE);

arduinoGenerator.init = function (workspace) {
  this.nameDB_ = new Blockly.Names(Blockly.Generator.NAME_TYPE);
  this.nameDB_.setVariableMap(workspace.getVariableMap());
};

// Helper methods
arduinoGenerator.addInclude = function (code) {
  this.includes_.add(code);
};

arduinoGenerator.addDeclaration = function (name, code) {
  if (!this.declarationsMap_) {
    this.declarationsMap_ = new Map();
  }
  this.declarationsMap_.set(name, code); // Always overwrite
};

arduinoGenerator.addSetup = function (line) {
  if (line && line.trim()) this.setups_.push(line.trim());
};

arduinoGenerator.setupsMap_ = new Map(); // pin -> setup lines

arduinoGenerator.reset = function () {
  this.includes_.clear();
  this.setups_ = [];
  this.declarationsMap_.clear();
  this.functions_ = {};
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
arduinoGenerator.functions_ = {};

arduinoGenerator.addFunction = function (name, code) {
  if (!this.functions_[name]) {
    this.functions_[name] = code;
  }
};

arduinoGenerator.workspaceToCode = function (workspace) {
  this.includes_.clear();
  this.setups_ = [];
  this.functions_ = {};

  let loopCode = "";

  const blocks = workspace.getTopBlocks(true);
  for (const block of blocks) {
    if (block.type === "arduino_loop") {
      loopCode += this.blockToCode(block) + "\n";
    } else if (block.type === "arduino_setup") {
      const setupCode = this.blockToCode(block);
      setupCode.split("\n").forEach((line) => {
        const clean = line.trim();
        if (clean) this.setups_.add(clean);
      });
    } else {
      const parent = block.getSurroundParent?.();
      if (!parent) {
        // Handle top-level blocks
        if (block.type === "declare_variable") {
          // Process declare_variable blocks to add to declarations
          this.blockToCode(block);
        } else {
          // Handle other top-level blocks
          const code = this.blockToCode(block);
          if (Array.isArray(code)) {
            loopCode += code[0] + ";\n";
          } else if (typeof code === "string") {
            loopCode += code + "\n";
          }
        }
      }
    }
  }

  const indentLines = (code, level = 1, indentStr = "  ") => {
    const indent = indentStr.repeat(level);
    return code
      .split("\n")
      .map((line) => (line.trim() ? indent + line.trim() : ""))
      .join("\n");
  };

  return `
${Array.from(this.includes_).join("\n")}

${Object.values(this.functions_).join("\n\n")}

${Array.from(this.declarationsMap_.values()).join("\n")}


void setup() {
  ${arduinoGenerator.setups_.map((line) => "  " + line).join("\n")}
  }
  

void loop() {
${indentLines(loopCode)}
}
`;
};

export default arduinoGenerator;
