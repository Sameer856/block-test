import * as Blockly from "blockly";


Blockly.Blocks['array_set'] = {
    init: function () {
        this.appendDummyInput()
          .appendField("set array")
          .appendField(new Blockly.FieldVariable("i"), "VAR")
          .appendField("type")
          .appendField(new Blockly.FieldDropdown([
            ["character", "char"],
            ["integer", "int"],
            ["float", "float"]
          ]), "TYPE");
    
        this.appendDummyInput()
          .appendField("size")
          .appendField(new Blockly.FieldDropdown([
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"]
          ]), "ARRAY_SIZE")
          .appendField(new Blockly.FieldDropdown([
            ["size", "size"],
            ["which contains", "which_contains"]
          ]), "DESCRIPTION");
    
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip("Set array with type and size");
        this.setHelpUrl("");
      }
  };
  
  Blockly.Blocks['array_set_element'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("elements")
      this.appendValueInput("SIZE")
        .setCheck("Number")
        .appendField("");
      this.appendValueInput("VALUE")
        .appendField("");
    
    this.setOutput(true, null);
    this.setColour(20);
      this.setTooltip("Set value at array index");
      this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['array_put_element'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("put the element of array")
        .appendField(new Blockly.FieldVariable("i"), "ARRAY_NAME")
        .appendField("of size")
        .appendField(new Blockly.FieldDropdown([
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
          ["5", "5"]
        ]), "ARRAY_SIZE");
  
      this.appendValueInput("INDEX_INPUT")
        .setCheck("Number")
        .appendField("to");
  
      this.appendValueInput("VALUE_INPUT")
        .setCheck("Number")
        .appendField("index");
  
      this.setInputsInline(true); // Makes everything appear in one row
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("Get and assign array element");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['array_get_element'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("the element of array")
        .appendField(new Blockly.FieldVariable("i"), "ARRAY_NAME")
        .appendField("of size")
        .appendField(new Blockly.FieldDropdown([
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
          ["5", "5"]
        ]), "ARRAY_SIZE");  
      this.appendValueInput("VALUE_INPUT")
        .setCheck("Number")
        .appendField("index");
  
      this.setInputsInline(true); // Makes everything appear in one row
      this.setOutput(true, null);

      this.setColour(20);
      this.setTooltip("Get and assign array element");
      this.setHelpUrl("");
    }
  };
  
  
  
  Blockly.Blocks['array_size'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("array size")
        .appendField(new Blockly.FieldVariable("i"), "VAR");
        this.setInputsInline(true);

      this.setOutput(true, "Number");
      this.setColour(20);
      this.setTooltip("Returns the size of the array");
      this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['list_create_with'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("create a list")
        .appendField(new Blockly.FieldVariable("i"), "VAR");
      this.appendValueInput("VALUE")
        .appendField("with");
        this.setInputsInline(true);

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("Create a list with initial value");
      this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['list_set_element'] = {
    init: function () {
      this.appendValueInput("VALUE")
        .appendField("put the element");
      this.appendDummyInput()
        .appendField("of")
        .appendField(new Blockly.FieldVariable("i"), "VAR");
      this.appendValueInput("INDEX")
        .appendField("to");

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("Put value at specific index in list");
      this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['list_get_element'] = {
    init: function () {
      this.appendValueInput("INDEX")
        .appendField("the element");
      this.appendDummyInput()
        .appendField("of")
        .appendField(new Blockly.FieldVariable("i"), "VAR");
      this.setOutput(true, null);
      this.setColour(20);
      this.setTooltip("Get value from specific index in list");
      this.setHelpUrl("");
    }
  };
    
  Blockly.Blocks['array_add_element'] = {
    init: function () {
      // Initialize the block with a dummy input for the "add" field
      this.appendDummyInput()
        .appendField("add");
  
      // Add a value input for the "VALUE"
      this.appendValueInput("VALUE")
  
      // Add a variable input for the array
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("i"), "VAR");

    

      // Set the inputs to be inline
      this.setInputsInline(true);
  
      // Allow previous and next connections
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
  
      // Set block color and tooltips
      this.setColour(20);
      this.setTooltip("Add an element to the array");
      this.setHelpUrl("");
    }
  };
  
 
  Blockly.Blocks['size_of'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("size of")
        .appendField(new Blockly.FieldVariable("i"), "VAR");
        this.setInputsInline(true);

      this.setOutput(true, "Number");
      this.setColour(20);
      this.setTooltip("Returns the size of the array");
      this.setHelpUrl("");
    }
  };