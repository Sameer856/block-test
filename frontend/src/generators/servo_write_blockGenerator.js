import arduinoGenerator from "./arduinoGenerator.js";

arduinoGenerator.forBlock["servo_write"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const angle = block.getFieldValue("ANGLE") || "90";
  const delayVal = block.getFieldValue("DELAY") || "0";

  // Add header + declaration
  arduinoGenerator.addInclude(`#include <Servo.h>`);
  arduinoGenerator.addDeclaration(`Servo servo_${pin};`);

  const parent = block.getSurroundParent();
  const isInSetup = parent && parent.type === "arduino_setup";

  if (isInSetup) {
    // In setup — attach + write + delay
    arduinoGenerator.addSetup(
      `servo_${pin}.attach(${pin});`,
      `servo_${pin}.write(${angle}); delay(${delayVal});`
    );

    return ""; // Nothing goes in loop
  } else {
    // In loop — only write + delay
    arduinoGenerator.addSetup(`servo_${pin}.attach(${pin});`); // Safe to call once
    return `servo_${pin}.write(${angle});delay(${delayVal});`;
  }
};
