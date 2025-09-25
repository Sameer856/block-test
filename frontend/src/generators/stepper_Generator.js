import arduinoGenerator from "./arduinoGenerator";

arduinoGenerator.forBlock["stepper_setup"] = function (block) {
  const stepperNumber = block.getFieldValue("STEPPER"); // Stepper number 1-4
  const stepsPerRev =
    arduinoGenerator.valueToCode(
      block,
      "VALUE",
      arduinoGenerator.ORDER_ATOMIC
    ) || 4096; // default 4096 if no value connected

  const pin1 = block.getFieldValue("PIN1");
  const pin2 = block.getFieldValue("PIN2");
  const pin3 = block.getFieldValue("PIN3");
  const pin4 = block.getFieldValue("PIN4");

  const stepperName = `stepper_${stepperNumber}`;

  // Add declaration
  arduinoGenerator.addDeclaration(
    stepperName,
    `Stepper ${stepperName}(${stepsPerRev}, ${pin1}, ${pin2}, ${pin3}, ${pin4});`
  );

  return ""; // Setup blocks don’t generate code in loop
};

arduinoGenerator.forBlock["stepper_set_speed"] = function (block) {
  const stepperNumber = block.getFieldValue("STEPPER");
  const speed =
    arduinoGenerator.valueToCode(
      block,
      "SPEED",
      arduinoGenerator.ORDER_ATOMIC
    ) || 20; // default 20 RPM if no value connected

  const stepperName = `stepper_${stepperNumber}`;

  const code = `${stepperName}.setSpeed(${speed});\n`;
  return code;
};
arduinoGenerator.forBlock["stepper_set_step"] = function (block) {
    const stepperNumber = block.getFieldValue("STEPPER");
    const speed =
      arduinoGenerator.valueToCode(
        block,
        "SPEED",
        arduinoGenerator.ORDER_ATOMIC
      ) || 20; // default 20 RPM if no value connected
  
    const stepperName = `stepper_${stepperNumber}`;
  
    const code = `${stepperName}.step(${speed});\n`;
    return code;
  };