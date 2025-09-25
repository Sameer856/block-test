import arduinoGenerator from "./arduinoGenerator.js";
import * as Blockly from "blockly";

//IF ELSE
arduinoGenerator.forBlock["custom_if_then"] = function (block) {
  const condition = arduinoGenerator.valueToCode(
    block,
    "IF",
    arduinoGenerator.ORDER_NONE
  );
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

//REPEAT WHILE
arduinoGenerator.forBlock["repeat_while"] = function (block) {
  const mode = block.getFieldValue("DIRECTION"); // "AS_LONG_AS" or "UP"

  // Get condition or default to "true"
  const condition =
    arduinoGenerator.valueToCode(
      block,
      "MICROS",
      arduinoGenerator.ORDER_NONE
    ) || "true";

  const finalCondition = mode === "UP" ? `!(${condition})` : `${condition}`;

  // Get nested statements
  const statements = arduinoGenerator.statementToCode(block, "DO") || "";

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

//REPEAT TIMES
arduinoGenerator.forBlock["repeat_times"] = function (block) {
  const times =
    arduinoGenerator.valueToCode(block, "TIMES", arduinoGenerator.ORDER_NONE) ||
    "2";

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

//REPEAT FOR
arduinoGenerator.forBlock["repeat_for"] = function (block) {
  const variable = arduinoGenerator.nameDB_.getName(
    block.getFieldValue("VARIABLE"),
    Blockly.VARIABLE_CATEGORY_NAME // keep this if available, else use ''
  );

  const startValue =
    arduinoGenerator.valueToCode(
      block,
      "START",
      arduinoGenerator.ORDER_ATOMIC
    ) || "0";

  const endValue =
    arduinoGenerator.valueToCode(block, "END", arduinoGenerator.ORDER_ATOMIC) ||
    "10";

  const stepValue =
    arduinoGenerator.valueToCode(
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

//switch case
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

//Exit
arduinoGenerator.forBlock["exit_loop"] = function (block) {
  const flowType = block.getFieldValue("FLOW");

  if (flowType === "BREAK") {
    return "break;\n";
  } else if (flowType === "CONTINUE") {
    return "continue;\n";
  }

  return ""; // fallback
};

//Bitwise
arduinoGenerator.forBlock["bitwise_operator"] = function (block) {
  const operator = block.getFieldValue("OPERATOR");
  const argument0 =
    arduinoGenerator.valueToCode(block, "A", arduinoGenerator.ORDER_ATOMIC) ||
    "0";
  const argument1 =
    arduinoGenerator.valueToCode(block, "B", arduinoGenerator.ORDER_ATOMIC) ||
    "0";

  const code = `${argument0} ${operator} ${argument1}`;
  return [code, arduinoGenerator.ORDER_ATOMIC];
};

//NOT
arduinoGenerator.forBlock["bitwise_not"] = function (block) {
  const value =
    arduinoGenerator.valueToCode(
      block,
      "VALUE",
      arduinoGenerator.ORDER_ATOMIC
    ) || "!";
  const code = `~${value}`;
  return [code, arduinoGenerator.ORDER_ATOMIC];
};
//NULL
arduinoGenerator.forBlock["null_value"] = function (block) {
  return ["NULL", arduinoGenerator.ORDER_ATOMIC];
};
