import arduinoGenerator from "./arduinoGenerator.js";
import * as Blockly from "blockly/core";

arduinoGenerator.forBlock['array_set'] = function(block) {
    const variable = arduinoGenerator.nameDB_.getName(
      block.getFieldValue('VAR'),
      Blockly.VARIABLE_CATEGORY_NAME
    );
    const type = block.getFieldValue('TYPE');
    const size = block.getFieldValue('ARRAY_SIZE');
  
    // Global declaration at the top
    const declaration = `${type} ${variable}[${size}];`;
    arduinoGenerator.addDeclaration(variable, declaration);
  
    return ''; // nothing inside setup() or loop()
  };

  arduinoGenerator.forBlock["array_set_element"] = function (block) {
    const size = arduinoGenerator.valueToCode(block, "SIZE", arduinoGenerator.ORDER_NONE) || "null";
    const value = arduinoGenerator.valueToCode(block, "VALUE", arduinoGenerator.ORDER_NONE) || "null";
    
    const code = `{${size}, ${value}};\n`;
    return code;
  };
  
  arduinoGenerator.forBlock['array_put_element'] = function(block, generator) {
    // Get the raw variable name *as shown in the block*
    const variable = block.getField('ARRAY_NAME').getText();  // ✅ This bypasses nameDB_
    
    const index = generator.valueToCode(block, 'INDEX_INPUT', generator.ORDER_NONE) || '0';
    const value = generator.valueToCode(block, 'VALUE_INPUT', generator.ORDER_NONE) || '0';
    
    // Correct array element assignment logic
    const code = `${variable}[${index}] = ${value};\n`;
    return code;
  };
  arduinoGenerator.forBlock['array_get_element'] = function(block, generator) {
    // Get the raw variable name *as shown in the block*
    const variable = block.getField('ARRAY_NAME').getText();  // ✅ This bypasses nameDB_
    
    // Generate code to access the array without assigning a value or index
    const code = `${variable}[];\n`;  // This will generate the desired output "j[];"
    
    return code;
  };
  arduinoGenerator.forBlock['array_size'] = function(block, generator) {
    // Get the raw variable name *as shown in the block*
    const variable = block.getField('VAR').getText();  // ✅ Get the array variable name
    
    // Generate the code to calculate the array size using sizeof
    const code = `sizeof(${variable}) / sizeof(${variable}[0]);\n`;
    
    return code;
  };
  arduinoGenerator.forBlock['list_create_with'] = function(block, generator) {
    // Simply return empty code as per your request
    const code = `\n`;  // Empty setup and loop
    return code;
  };
  arduinoGenerator.forBlock['list_set_element'] = function(block, generator) {
    // Simply return empty code as per your request
    const code = `\n`;  // Empty setup and loop
    return code;
  };
  arduinoGenerator.forBlock['list_get_element'] = function(block, generator) {
    // Simply return empty code as per your request
    const code = `\n`;  // Empty setup and loop
    return code;
  };
  arduinoGenerator.forBlock['array_add_element'] = function(block, generator) {
    // Simply return empty code as per your request
    const code = `\n`;  // Empty setup and loop
    return code;
  };
  arduinoGenerator.forBlock['size_of'] = function(block, generator) {
    // Simply return empty code as per your request
    const code = `\n`;  // Empty setup and loop
    return code;
  };
  

  