import arduinoGenerator from "./arduinoGenerator.js";

arduinoGenerator.forBlock["repeat_while"] = function (block) {
  const mode = block.getFieldValue("DIRECTION"); // "AS_LONG_AS" or "UP"

  // Get condition or default to "true"
  const condition =
    arduinoGenerator.valueToCode(block, "MICROS", arduinoGenerator.ORDER_NONE) || "true";

  const finalCondition = mode === "UP" ? `!(${condition})` : `${condition}`;

  // Get nested statements
  const statements =
    arduinoGenerator.statementToCode(block, "DO") || "";

  const code = `
  while (${finalCondition}) {
    ${statements}
  }
  `;

  // Check if block is inside setup
  const parent = block.getSurroundParent();
  const isInSetup = parent && parent.type === "arduino_setup";

  if (isInSetup) {
    arduinoGenerator.addSetup(code.trim());
    return "";
  } else {
    return code.trim();
  }
};
