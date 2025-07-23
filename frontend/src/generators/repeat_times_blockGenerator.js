import arduinoGenerator from "./arduinoGenerator.js";

arduinoGenerator.forBlock["repeat_times"] = function (block) {
  const times =
    arduinoGenerator.valueToCode(block, "TIMES", arduinoGenerator.ORDER_NONE) || "2";

  const code = `
  for (int count = 0; count < ${times}; count++) {
  }
  `;

  const parent = block.getSurroundParent();
  const isInSetup = parent && parent.type === "arduino_setup";

  if (isInSetup) {
    arduinoGenerator.addSetup(code.trim());
    return "";
  } else {
    return code.trim();
  }
};
