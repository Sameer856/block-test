import arduinoGenerator from './arduinoGenerator.js';

arduinoGenerator.forBlock['turn_on_led'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const state = block.getFieldValue('STATE');
    arduinoGenerator.addSetup(`pinMode_${pin}`, `pinMode(${pin}, OUTPUT);`);
    
    // Check if we're in the setup section
    let code = '';
    const parent = block.getParent();
    
    if (parent && parent.type === 'setup_and_loop' && 
        block.getSurroundParent() === parent.getInput('SETUP_CODE').connection.targetBlock()) {
      code += `  pinMode(${pin}, OUTPUT);\n`;
    }
    
    code += `  digitalWrite(${pin}, ${state});\n`;
    return code;
  };