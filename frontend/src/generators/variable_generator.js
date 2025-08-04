import arduinoGenerator from "./arduinoGenerator.js";
import * as Blockly from "blockly/core";

arduinoGenerator.forBlock["declare_variable"] = function (block) {
  const rawVarName = block.getFieldValue("VAR");
  const varName = arduinoGenerator.nameDB_.getName(rawVarName, Blockly.VARIABLE_CATEGORY_NAME);
  const type = block.getFieldValue("TYPE");

  let cppType = "int";
  switch (type) {
    case "BOOLEAN": cppType = "bool"; break;
    case "CHAR": cppType = "char"; break;
    case "TEXT": cppType = "String"; break;
    case "BYTE": cppType = "byte"; break;
    case "INT": cppType = "int"; break;
    case "UINT": cppType = "unsigned int"; break;
    case "LONG": cppType = "long"; break;
    case "FLOAT": cppType = "float"; break;
  }

  const valueBlock = block.getInputTargetBlock("VALUE");
  const valueCode = valueBlock
    ? arduinoGenerator.valueToCode(block, "VALUE", arduinoGenerator.ORDER_ATOMIC)
    : null;

  const declaration = valueCode
    ? `${cppType} ${varName} = ${valueCode};`
    : `${cppType} ${varName};`;

  // Only store as global declaration
  arduinoGenerator.addDeclaration(varName, declaration);

  // 🚫 Do not return anything (no code to insert into loop)
  return '';
};

