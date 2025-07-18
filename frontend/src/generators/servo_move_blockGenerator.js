import arduinoGenerator from './arduinoGenerator.js';



arduinoGenerator.includes_ = arduinoGenerator.includes_ || new Set();
arduinoGenerator.definitions_ = arduinoGenerator.definitions_ || {};

arduinoGenerator.forBlock['servo_read'] = function (block) {
  const pin = block.getFieldValue('PIN');
  const varName = `servo_${pin}`;

  // Add Servo include once
  arduinoGenerator.includes_.add('#include <Servo.h>');

  // Add servo declaration
  arduinoGenerator.definitions_[varName] = `Servo ${varName};`;
  arduinoGenerator.addInclude('servo', '#include <Servo.h>');
arduinoGenerator.addDeclaration(`servo_${pin}`, `Servo servo_${pin};`);
arduinoGenerator.addSetup(`servo_attach_${pin}`, `servo_${pin}.attach(${pin});`);


  // No setup code
  return `  ${varName}.read();\n`;
};

