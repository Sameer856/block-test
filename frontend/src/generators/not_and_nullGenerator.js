import arduinoGenerator from "./arduinoGenerator.js";

arduinoGenerator.forBlock["bitwise_not"] = function (block) {
    const value = arduinoGenerator.valueToCode(block, "VALUE", arduinoGenerator.ORDER_ATOMIC) || "!";
    const code = `~${value}`;
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
  
  arduinoGenerator.forBlock["null_value"] = function (block) {
    return ["NULL", arduinoGenerator.ORDER_ATOMIC];
  };
  