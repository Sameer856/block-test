import arduinoGenerator from "./arduinoGenerator.js";
import * as Blockly from "blockly/core";

arduinoGenerator.forBlock["switch_case"] = function (block) {
    const variable = arduinoGenerator.nameDB_.getName(
      block.getFieldValue("VAR"),
      Blockly.VARIABLE_CATEGORY_NAME
    );
  
    // For now, let’s assume a basic placeholder `case : break;` structure
    // You can extend this later with a proper `case_block` nested block
    const casesCode = `  case:\n      break;\n`;
  
    const code = `switch (${variable}) {\n${casesCode}}`;
    return code + "\n"; // newline for clarity
  };
  