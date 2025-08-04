import * as Blockly from "blockly";

Blockly.Blocks['declare_variable'] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck(["String", "Number", "Boolean"])
      .appendField("declare")
      .appendField(new Blockly.FieldVariable("i"), "VAR")
      .appendField("type")
      .appendField(new Blockly.FieldDropdown([
        ["boolean", "BOOLEAN"],
        ["character", "CHAR"],
        ["text", "TEXT"],
        ["byte", "BYTE"],
        ["integer", "INT"],
        ["unsigned integer", "UINT"],
        ["long integer", "LONG"],
        ["floating point number", "FLOAT"]
      ]), "TYPE")
      .appendField("to");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
    this.setTooltip("Declares a variable of a specified type");
    this.setHelpUrl("");
  }
};

  
  Blockly.Blocks['set_variable'] = {
    init: function () {
      this.appendValueInput("VALUE")
          .appendField("set")
          .appendField(new Blockly.FieldVariable("i"), "VAR")
          .appendField("to");
          this.setInputsInline(true); 

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
      this.setTooltip("Sets a variable to a value");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['change_variable'] = {
    init: function () {
      this.appendValueInput("DELTA")
          .appendField("change")
          .appendField(new Blockly.FieldVariable("i"), "VAR")
          .appendField("by");
          this.setInputsInline(true); 

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
      this.setTooltip("Changes a variable by a value");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['declare_constant'] = {
    init: function () {
      this.appendValueInput("VALUE")
          .appendField("declare constant")
          .appendField(new Blockly.FieldVariable("i"), "VAR")
          .appendField("type")
          .appendField(new Blockly.FieldDropdown([
            ["character", "CHAR"],
            ["text", "TEXT"],
            ["boolean", "BOOLEAN"],
            ["integer", "INT"],
            ["float", "FLOAT"]
          ]), "TYPE")
          .appendField("to");
          this.setInputsInline(true); 

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
      this.setTooltip("Declares a constant of the specified type");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['set_constant'] = {
    init: function () {
      this.appendValueInput("VALUE")
          .appendField("set constant")
          .appendField(new Blockly.FieldVariable("i"), "VAR")
          .appendField("which is equivalent to");
          this.setInputsInline(true); 

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
      this.setTooltip("Sets a constant to a value");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['get_variable'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(new Blockly.FieldVariable("i"), "VAR");
          this.setInputsInline(true); 

      this.setOutput(true, null);
      this.setColour(30);
      this.setTooltip("Returns the value of the variable");
      this.setHelpUrl("");
    }
  };
    