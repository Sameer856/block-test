import arduinoGenerator from "./arduinoGenerator";



arduinoGenerator.forBlock['blink_led_with_speed'] = function(block) {
  
    const delay = block.getFieldValue("SPEED");
    const pin = 13;
    const parent = block.getParent();
  
    let code = '';
    if (
      parent &&
      parent.type === 'setup_and_loop' &&
      block.getSurroundParent() === parent.getInput('SETUP_CODE').connection.targetBlock()
    ) {
      code += `  pinMode(${pin}, OUTPUT);\n`;
    }
  
    code += `  digitalWrite(${pin}, HIGH);\n`;
    code += `  delay(${delay});\n`;
    code += `  digitalWrite(${pin}, LOW);\n`;
    code += `  delay(${delay});\n`;
  
    return code;
  };
  

  