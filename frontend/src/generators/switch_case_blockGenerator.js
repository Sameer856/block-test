import arduinoGenerator from "./arduinoGenerator.js";
import * as Blockly from "blockly/core";

arduinoGenerator.forBlock["switch_case"] = function (block) {
    const variable = arduinoGenerator.nameDB_.getName(
      block.getFieldValue("VAR"),
      Blockly.VARIABLE_CATEGORY_NAME
    );
  
    const casesCode = arduinoGenerator.statementToCode(block, "CASES");
  
    const code = `switch (${variable}) {\n${casesCode}}`;
    return code;
  };
  
  