import arduinoGenerator from "./arduinoGenerator.js";

arduinoGenerator.forBlock["custom_if_then"] = function (block) {
  const condition = arduinoGenerator.valueToCode(block, "IF", arduinoGenerator.ORDER_NONE);
  const statements = arduinoGenerator.statementToCode(block, "THEN");

  const code = `
  if (${condition}) {
${statements}
  }
  `;

  const parent = block.getSurroundParent();
  const isInSetup = parent && parent.type === "arduino_setup";

  if (isInSetup) {
    // Add code to setup
    arduinoGenerator.addSetup(code.trim());
    return "";
  } else {
    // Add code to loop
    return code.trim();
  }
};
