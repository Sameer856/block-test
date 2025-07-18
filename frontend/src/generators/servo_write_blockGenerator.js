import arduinoGenerator from './arduinoGenerator.js';

arduinoGenerator.forBlock['servo_write'] = function (block) {
    const pin = block.getFieldValue('PIN');
    const angle = arduinoGenerator.valueToCode(block, 'ANGLE', arduinoGenerator.ORDER_ATOMIC) || '90';
    const delayVal = block.getFieldValue('DELAY');
  
    arduinoGenerator.definitions_['include_servo'] = '#include <Servo.h>';
    arduinoGenerator.definitions_['declare_servo'] = 'Servo servo_' + pin + ';';
    arduinoGenerator.setups_['setup_servo_' + pin] = 'servo_' + pin + '.attach(' + pin + ');';

    arduinoGenerator.addInclude('servo', '#include <Servo.h>');
arduinoGenerator.addDeclaration(`servo_${pin}`, `Servo servo_${pin};`);
arduinoGenerator.addSetup(`servo_attach_${pin}`, `servo_${pin}.attach(${pin});`);

  
    const code = `servo_${pin}.write(${angle});\ndelay(${delayVal});\n`;
    return code;
  };
  