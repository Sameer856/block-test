import arduinoGenerator from "./arduinoGenerator.js";
import * as Blockly from "blockly";

arduinoGenerator.forBlock["string_literal"] = function (block) {
    const value = block.getFieldValue("VALUE");
    const code = `"${value}"`;
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
  arduinoGenerator.forBlock["empty_string"] = function (block) {
    const value = block.getFieldValue("VALUE");
    const code = `"${value}"`;
    return [code, arduinoGenerator.ORDER_ATOMIC];  };
  
  

  arduinoGenerator.forBlock["serial_print"] = function (block) {
    const value = arduinoGenerator.valueToCode(block, "TEXT", arduinoGenerator.ORDER_NONE) || '""';
    return `Serial.println(${value});`;
  };

  arduinoGenerator.forBlock["char_literal"] = function (block) {
    return ["char()", arduinoGenerator.ORDER_ATOMIC];

  };
  arduinoGenerator.forBlock["string_empty_constructor"] = function (block) {
    return ["String()", arduinoGenerator.ORDER_ATOMIC];
  };
  arduinoGenerator.forBlock["string_with_length"] = function (block) {
    const val = arduinoGenerator.valueToCode(block, "VAL", arduinoGenerator.ORDER_NONE) || '""';
    const len = arduinoGenerator.valueToCode(block, "LEN", arduinoGenerator.ORDER_ATOMIC) || '0';
    return [`String(${val}, ${len})`, arduinoGenerator.ORDER_ATOMIC];
  };
  arduinoGenerator.forBlock["string_concat"] = function (block) {
    const a = arduinoGenerator.valueToCode(block, "A", arduinoGenerator.ORDER_ADDITIVE) || '""';
    const b = arduinoGenerator.valueToCode(block, "B", arduinoGenerator.ORDER_ADDITIVE) || '""';
    return [`${a} + ${b}`, arduinoGenerator.ORDER_ADDITIVE];
  };
  arduinoGenerator.forBlock["string_length"] = function (block) {
    const str = arduinoGenerator.valueToCode(block, "STRING", arduinoGenerator.ORDER_NONE) || '""';
    return [`${str}.length()`, arduinoGenerator.ORDER_ATOMIC];
  };
  arduinoGenerator.forBlock["string_is_empty"] = function (block) {
    const str = arduinoGenerator.valueToCode(block, "STRING", arduinoGenerator.ORDER_NONE) || '""';
    return [`(${str}.length() == 0)`, arduinoGenerator.ORDER_ATOMIC];
  };
  arduinoGenerator.forBlock["string_index_of_dropdown"] = function (block) {
    const base = arduinoGenerator.valueToCode(block, "BASE", arduinoGenerator.ORDER_ATOMIC) || '""';
    const mode = block.getFieldValue("MODE") || "indexOf";
    const find = arduinoGenerator.valueToCode(block, "FIND", arduinoGenerator.ORDER_ATOMIC) || '""';
    return [`${base}.${mode}(${find})`, arduinoGenerator.ORDER_ATOMIC];
  };
  arduinoGenerator.forBlock["string_index"] = function (block) {
    const base = arduinoGenerator.valueToCode(block, "BASE", arduinoGenerator.ORDER_ATOMIC) || '""';
    const index = arduinoGenerator.valueToCode(block, "FIND", arduinoGenerator.ORDER_ATOMIC) || "-1";
    const mode = block.getFieldValue("MODE");
  
    let code = "";
  
    switch (mode) {
      case "letter #":
        code = `${base}.charAt(${index})`;
        break;
      case "letter # from end":
        code = `${base}.charAt(${base}.length() - ${index})`;
        break;
      case "first letter":
        code = `${base}.charAt(0)`;
        break;
      case "last letter":
        code = `${base}.charAt(${base}.length() - 1)`;
        break;
      default:
        code = '""';
    }
  
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
  

  arduinoGenerator.forBlock["string_substring"] = function (block) {
    const base = arduinoGenerator.valueToCode(block, "BASE", arduinoGenerator.ORDER_NONE) || "";
    const start = arduinoGenerator.valueToCode(block, "START", arduinoGenerator.ORDER_NONE) || "-1";
    const end = arduinoGenerator.valueToCode(block, "END", arduinoGenerator.ORDER_NONE) || "-1";
  
    const dropdownStartMode = block.getFieldValue("START_MODE");
    const dropdownEndMode = block.getFieldValue("END_MODE");
  
    let startCode, endCode;
  
    switch (dropdownStartMode) {
      case "letter":
        startCode = start;
        break;
      case "from_end":
        startCode = `${base}.length() - ${start}`;
        break;
      case "first":
        startCode = "0";
        break;
      default:
        startCode = start;
    }
  
    switch (dropdownEndMode) {
      case "letter":
        endCode = end;
        break;
      case "from_end":
        endCode = `${base}.length() - ${end}`;
        break;
      case "first":
        endCode = "0";
        break;
      default:
        endCode = end;
    }
  
    const code = `${base}.substring(${startCode}, ${endCode})`;
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
  arduinoGenerator.forBlock["string_case_convert"] = function (block) {
    const caseType = block.getFieldValue("CASE");
    const boolValue = caseType === "UPPER" ? "true" : "false";
  
    // Ensure function is defined once
    arduinoGenerator.addFunction("UpperLowerString", `
  String UpperLowerString(String Source, boolean ToUpper) {
    if (ToUpper == true) Source.toUpperCase();
    else Source.toLowerCase();
    return(Source);
  }
    `);
  
    // Use a hardcoded string
    return [`UpperLowerString("", ${boolValue})`, arduinoGenerator.ORDER_FUNCTION_CALL];
  };
  

arduinoGenerator.forBlock["string_trim"] = function (block) {
    const input = arduinoGenerator.valueToCode(block, "INPUT", arduinoGenerator.ORDER_ATOMIC) || '""';
  
    arduinoGenerator.addFunction("TrimString", `
  String TrimString(String Source) {
    Source.trim();
    return(Source);
  }
    `);
  
    return [`TrimString(${input})`, arduinoGenerator.ORDER_FUNCTION_CALL];
  };
  arduinoGenerator.forBlock["string_append_variable"] = function (block) {
    const variable = arduinoGenerator.nameDB_.getName(
        block.getFieldValue("VAR"),
        Blockly.VARIABLE_CATEGORY_NAME
      );
      const text = block.getFieldValue("TEXT");
      return `${variable} += String("${text}");`;
  };
  