import arduinoGenerator from "./arduinoGenerator.js";

function findSetupInput(parent, targetBlock) {
  return parent.inputList.find(
    (input) => input.connection?.targetBlock() === targetBlock
  );
}
arduinoGenerator.forBlock["servo_rotate_microseconds"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const micros =
    arduinoGenerator.valueToCode(block, "MICROS", arduinoGenerator.ORDER_ATOMIC) || "1500";

  arduinoGenerator.addInclude(`#include <Servo.h>`);
  arduinoGenerator.addDeclaration(`Servo servo_${pin};`);

  let isSetup = false;
  let parent = block.getParent();
  while (parent) {
    const input = findSetupInput(parent, block);
    if (input && input.name === "SETUP_CODE") {
      isSetup = true;
      break;
    }
    block = parent;
    parent = block.getParent();
  }

  arduinoGenerator.addSetup(`servo_${pin}.attach(${pin});`);

  if (isSetup) {
    arduinoGenerator.addSetup(`servo_${pin}.writeMicroseconds(${micros});`);
    return '';
  } else {
    return `servo_${pin}.writeMicroseconds(${micros});\n`;
  }
};
