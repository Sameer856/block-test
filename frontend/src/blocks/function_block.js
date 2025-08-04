import * as Blockly from "blockly";

Blockly.Blocks["arduino_do"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("function")
        .appendField(new Blockly.FieldTextInput("do2"), "FUNC_NAME");
      this.appendStatementInput("DO_CODE")
        .setCheck(null)
  
      this.setColour(230);
      this.setTooltip("Define a custom function");
      this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['arduino_function_return'] = {
    init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("do"), "FUNC_NAME")
          
          this.appendDummyInput().appendField("")
          
            
            this.appendStatementInput("BODY")
            .setCheck(null)
            .appendField("");
            
        this.appendValueInput("STRING").setCheck("String").appendField("return")
        this.appendDummyInput().appendField("of type")
          .appendField(new Blockly.FieldDropdown([
              ["boolean", "BOOLEAN"],
              ["character", "CHAR"],
              ["text", "TEXT"],
              ["byte", "BYTE"],
              ["integer", "INT"],
              ["unsigned integer", "UINT"],
              ["long integer", "LONG"],
              ["floating point number", "FLOAT"]
            ]), "RET_TYPE");
        this.setColour(290);
        this.setTooltip("Custom function block with return type");
        this.setHelpUrl("");
        this.setPreviousStatement(false);
        this.setNextStatement(false);
      }
  };
  Blockly.Blocks['arduino_return'] = {
    init: function () {
      this.appendValueInput("RETURN")
        .setCheck(null)
        .appendField("return");
  
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Returns a value from a function.");
      this.setHelpUrl("");
    }
  };
  