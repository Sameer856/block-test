// src/generators/setupLoopGenerator.js
import arduinoGenerator from './arduinoGenerator';



arduinoGenerator.forBlock['setup_and_loop'] = function(block) {
  // Get all blocks in setup section to find used pins
  const setupBlocks = block.getInputTargetBlock('SETUP_CODE');
  const pins = new Set();
  
  let current = setupBlocks;
  while (current) {
    if (current.type === 'turn_on_led') {
      pins.add(current.getFieldValue('PIN'));
    }
    current = current.getNextBlock();
  }
  
  // Generate pinMode declarations
  let pinModes = '';
  pins.forEach(pin => {
    pinModes += `  pinMode(${pin}, OUTPUT);\n`;
  });
  
  // Combine with other setup code
  const setupCode = pinModes + arduinoGenerator.statementToCode(block, 'SETUP_CODE');
  const loopCode = arduinoGenerator.statementToCode(block, 'LOOP_CODE');  // Fixed typo here
  
  return `void setup() {\n${setupCode}}\n\nvoid loop() {\n${loopCode}}\n`;
};