import arduinoGenerator from "./arduinoGenerator.js";
arduinoGenerator.forBlock["arduino_do"] = function (block) {
  const functionName = block.getFieldValue("FUNC_NAME");
  const statements = arduinoGenerator.statementToCode(block, "DO_CODE");

  const code = `void ${functionName}() {\n${arduinoGenerator.prefixLines(
    statements,
    "  "
  )}\n}`;

  // ✅ Replace old function with updated name
  arduinoGenerator.functions_[functionName] = code;

  return ""; // nothing in loop/setup
};

arduinoGenerator.forBlock['arduino_function_return'] = function (block) {
    const funcName = block.getFieldValue("FUNC_NAME");
    const returnType = block.getFieldValue("RET_TYPE");
    const statements = arduinoGenerator.statementToCode(block, "BODY");
    const returnValue = arduinoGenerator.valueToCode(block, "STRING", arduinoGenerator.ORDER_NONE);
  
    let cppType = "void";
    switch (returnType) {
      case "BOOLEAN": cppType = "bool"; break;
      case "CHAR": cppType = "char"; break;
      case "TEXT": cppType = "String"; break;
      case "BYTE": cppType = "byte"; break;
      case "INT": cppType = "int"; break;
      case "UINT": cppType = "unsigned int"; break;
      case "LONG": cppType = "long"; break;
      case "FLOAT": cppType = "float"; break;
    }
  
    const returnLine = returnValue ? `  return ${returnValue};\n` : "";
    const fullCode = `${cppType} ${funcName}() {\n${arduinoGenerator.prefixLines(statements, "  ")}${returnLine}}\n`;
  
    // ✅ Use functions_ for proper top-level code inclusion
    arduinoGenerator.functions_[funcName] = fullCode;
  
    return ''; // Don't inject code inline in loop/setup
  };
  arduinoGenerator.forBlock['arduino_return'] = function(block) {
    const returnValue = arduinoGenerator.valueToCode(block, 'RETURN', arduinoGenerator.ORDER_NONE);
    return `return ${returnValue};\n`;
  };
  