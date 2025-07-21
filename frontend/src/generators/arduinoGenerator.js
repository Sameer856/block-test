import * as Blockly from "blockly";

const arduinoGenerator = new Blockly.Generator("Arduino");

// Operator precedences
arduinoGenerator.ORDER_ATOMIC = 0;
arduinoGenerator.ORDER_NONE = 99;

// Storage for includes, declarations, and setup code
arduinoGenerator.includes_ = new Set();
arduinoGenerator.declarations_ = new Set();
arduinoGenerator.setups_ = new Set();

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
    }
    if (block.type === "arduino_setup") {
      const setupCode = this.blockToCode(block); // This gives indented lines
      setupCode.split("\n").forEach((line) => {
        const clean = line.trim();
        if (clean) this.setups_.add(clean);
      });
    } else {
      // For blocks like setup_and_loop if used
      const code = this.blockToCode(block);
      loopCode += code + "\n";
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
${loopCode}}`;
};

export default arduinoGenerator;
