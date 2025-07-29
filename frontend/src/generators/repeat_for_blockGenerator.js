import arduinoGenerator from "./arduinoGenerator.js";
import * as Blockly from "blockly/core";

arduinoGenerator.forBlock["repeat_for"] = function (block) {
  const variable = arduinoGenerator.nameDB_.getName(
    block.getFieldValue("VARIABLE"),
    Blockly.VARIABLE_CATEGORY_NAME // keep this if available, else use ''
  );

  const startValue = arduinoGenerator.valueToCode(
    block,
    "START",
    arduinoGenerator.ORDER_ATOMIC
  ) || "0";

  const endValue = arduinoGenerator.valueToCode(
    block,
    "END",
    arduinoGenerator.ORDER_ATOMIC
  ) || "10";

  const stepValue = arduinoGenerator.valueToCode(
    block,
    "STEP",
    arduinoGenerator.ORDER_ATOMIC
  ) || "1";

  const statements = arduinoGenerator.statementToCode(block, "DO");

  const code = `for (int ${variable} = ${startValue}; ${variable} <= ${endValue}; ${variable} += ${stepValue}) {
${statements}
}`;
  return code;
};
