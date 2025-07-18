import * as Blockly from "blockly";

import arduinoGenerator from "./arduinoGenerator";

// Generator for servo rotation block

arduinoGenerator.forBlock["servo_rotate_microseconds"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const micros = block.getFieldValue("MICROS");

  // Add required includes and declarations
  arduinoGenerator.addInclude("#include <Servo.h>");
  arduinoGenerator.addDeclaration(`Servo servo_${pin};`);
  arduinoGenerator.addSetup(`servo_${pin}.attach(${pin});`);
  arduinoGenerator.addLoopTrap(`servo_${pin}.writeMicroseconds(${micros})`);

  return `  servo_${pin}.writeMicroseconds(${micros});\n`;
};
