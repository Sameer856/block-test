import arduinoGenerator from "./arduinoGenerator.js";
import * as Blockly from "blockly";

arduinoGenerator.forBlock["declare_variable"] = function (block) {
  const rawVarName = block.getFieldValue("VAR");
  const varName = arduinoGenerator.nameDB_.getName(
    rawVarName,
    Blockly.VARIABLE_CATEGORY_NAME
  );
  const type = block.getFieldValue("TYPE");

  let cppType = "int";
  switch (type) {
    case "BOOLEAN":
      cppType = "bool";
      break;
    case "CHAR":
      cppType = "char";
      break;
    case "TEXT":
      cppType = "String";
      break;
    case "BYTE":
      cppType = "byte";
      break;
    case "INT":
      cppType = "int";
      break;
    case "UINT":
      cppType = "unsigned int";
      break;
    case "LONG":
      cppType = "long";
      break;
    case "FLOAT":
      cppType = "float";
      break;
  }

  const valueBlock = block.getInputTargetBlock("VALUE");
  const valueCode = valueBlock
    ? arduinoGenerator.valueToCode(
        block,
        "VALUE",
        arduinoGenerator.ORDER_ATOMIC
      )
    : null;

  const declaration = valueCode
    ? `${cppType} ${varName} = ${valueCode};`
    : `${cppType} ${varName};`;

  // Only store as global declaration
  arduinoGenerator.addDeclaration(varName, declaration);

  // 🚫 Do not return anything (no code to insert into loop)
  return "";
};

arduinoGenerator.forBlock["set_variable"] = function (block) {
  const rawVarName = block.getFieldValue("VAR");
  const varName = arduinoGenerator.nameDB_.getName(
    rawVarName,
    Blockly.VARIABLE_CATEGORY_NAME
  );
  const value =
    arduinoGenerator.valueToCode(
      block,
      "VALUE",
      arduinoGenerator.ORDER_ASSIGNMENT
    ) || "0";

  return `${varName} = ${value};\n`;
};
arduinoGenerator.forBlock["change_variable"] = function (block) {
  const rawVarName = block.getFieldValue("VAR");
  const varName = arduinoGenerator.nameDB_.getName(
    rawVarName,
    Blockly.VARIABLE_CATEGORY_NAME
  );
  const delta =
    arduinoGenerator.valueToCode(
      block,
      "DELTA",
      arduinoGenerator.ORDER_ADDITION
    ) || "0";

  const code = `${varName} = ${varName} + ${delta};\n`;
  return code;
};
arduinoGenerator.forBlock["declare_constant"] = function (block) {
  const rawVarName = block.getFieldValue("VAR");
  const varName = arduinoGenerator.nameDB_.getName(
    rawVarName,
    Blockly.VARIABLE_CATEGORY_NAME
  );
  const type = block.getFieldValue("TYPE");
  const value =
    arduinoGenerator.valueToCode(
      block,
      "VALUE",
      arduinoGenerator.ORDER_ATOMIC
    ) || "";

  // Map dropdown value to Arduino types
  const typeMap = {
    BOOLEAN: "bool",
    CHAR: "char",
    TEXT: "String",
    BYTE: "byte",
    INT: "int",
    UINT: "unsigned int",
    LONG: "long",
    FLOAT: "float",
  };

  const cppType = typeMap[type] || "0"; // Default to int if undefined

  const code = `const ${cppType} ${varName} = ${value};\n`;
  arduinoGenerator.addDeclaration(varName, code);
  return ""; // No inline code needed in setup() or loop()
};
arduinoGenerator.forBlock["set_constant"] = function (block) {
  const rawVarName = block.getFieldValue("VAR");
  const varName = arduinoGenerator.nameDB_.getName(
    rawVarName,
    Blockly.VARIABLE_CATEGORY_NAME
  );
  const value =
    arduinoGenerator.valueToCode(
      block,
      "VALUE",
      arduinoGenerator.ORDER_ATOMIC
    ) || "";

  const defineCode = `#define ${varName} ${value}`;
  arduinoGenerator.addDeclaration(varName, defineCode + "\n");

  return ""; // No code inside setup() or loop()
};

arduinoGenerator.forBlock["get_variable"] = function (block) {
  const rawVarName = block.getFieldValue("VAR");
  const varName = arduinoGenerator.nameDB_.getName(
    rawVarName,
    Blockly.VARIABLE_CATEGORY_NAME
  );
  return [varName, arduinoGenerator.ORDER_ATOMIC];
};
