import arduinoGenerator from "./arduinoGenerator.js";

arduinoGenerator.forBlock["bitwise_operator"] = function (block) {
  const operator = block.getFieldValue("OPERATOR");
  const argument0 = arduinoGenerator.valueToCode(block, "A", arduinoGenerator.ORDER_ATOMIC) || "0";
  const argument1 = arduinoGenerator.valueToCode(block, "B", arduinoGenerator.ORDER_ATOMIC) || "0";

  const code = `${argument0} ${operator} ${argument1}`;
  return [code, arduinoGenerator.ORDER_ATOMIC];
};
