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

arduinoGenerator.addSetup = function (code) {
  this.setups_.add(code);
};

arduinoGenerator.workspaceToCode = function (workspace) {
  this.init(workspace);

  const blocks = workspace.getTopBlocks(true);
  let setupBody = '';
  let loopBody = '';

  for (const block of blocks) {
    if (block.type === 'arduino_setup') {
      setupBody += this.blockToCode(block);
    } else if (block.type === 'arduino_loop') {
      loopBody += this.blockToCode(block);
    }
  }

  const includes = Object.values(this.includes_).join('\n');
  const declarations = Object.values(this.definitions_).join('\n');
  const setups = Object.values(this.setups_).map(line => `  ${line}`).join('\n');

  return `${includes}
${declarations}

void setup() {
${setups}${setupBody}
}

void loop() {
${loopBody}
}`;
};


export default arduinoGenerator;
