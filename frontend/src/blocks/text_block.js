import * as Blockly from "blockly";

Blockly.Blocks["string_literal"] = {
    init: function () {
      this.appendDummyInput()
        .appendField('"')
        .appendField(new Blockly.FieldTextInput(""), "VALUE")
        .appendField('"');
      this.setOutput(true, "String");
      this.setColour(160);
      this.setTooltip("Text string");
      this.setHelpUrl("");
    },
  };
  Blockly.Blocks["empty_string"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(" ' ")  // opening quote
        .appendField(new Blockly.FieldTextInput(""), "VALUE")
        .appendField(" ' "); // closing quote
      this.setOutput(true, "String");
      this.setColour(160);
      this.setTooltip('Enter a string (double quotes shown for clarity)');
      this.setHelpUrl('');
    }
  };
  
  
  
  Blockly.Blocks["serial_print"] = {
    init: function () {
      this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("Serial.println");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Print text to Serial");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["char_literal"] = {
    init: function () {
        this.appendValueInput("STRING").setCheck("String").appendField("Casting of Char");

      this.setOutput(true, "Char");
      this.setColour(210);
      this.setTooltip("A single character literal");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks["string_length"] = {
    init: function () {
      this.appendValueInput("STRING").setCheck("String").appendField("length of");
      this.setOutput(true, "Number");
      this.setColour(160);
      this.setTooltip("Returns the length of a string");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks["string_empty_constructor"] = {
    init: function () {
        this.appendValueInput("STRING").setCheck("String").appendField("Convert to String");

      this.setOutput(true, "String");
      this.setColour(160);
      this.setTooltip("Creates an empty String object");
      this.setHelpUrl("");
    }
};
  Blockly.Blocks["string_with_length"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Convert to string");
      this.appendValueInput("VAL")
        .setCheck(null);
      this.appendDummyInput()
      this.appendValueInput("LEN")
        .appendField("Number of decimals")
        .setCheck("Number");
      this.appendDummyInput()
      this.setOutput(true, "String");
      this.setColour(160);
      this.setTooltip("Creates a String from another string or array with specified length");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks["string_concat"] = {
    init: function () {
      this.appendValueInput("A").appendField("Create text with").setCheck(["String", "Number"])
      this.appendDummyInput().appendField("+");
      this.appendValueInput("B").setCheck(["String", "Number"])

      this.setOutput(true, "String");
      this.setColour(160);
      this.setTooltip("Concatenates two strings");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks["string_is_empty"] = {
    init: function () {
      this.appendValueInput("STRING")
          .setCheck("String")
        this.appendDummyInput().appendField("is empty");
      this.setOutput(true, "Boolean");
      this.setColour(210);
      this.setTooltip("Returns true if the string is empty");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks["string_index_of_dropdown"] = {
    init: function () {
      this.appendValueInput("BASE")
          .setCheck("String")
          .appendField("in text");
  
      this.appendDummyInput()
          .appendField("find")
          .appendField(new Blockly.FieldDropdown([
            ["first", "indexOf"],
            ["last", "lastIndexOf"]
          ]), "MODE");
  
      this.appendValueInput("FIND")
          .setCheck("String")
          .appendField("(");
  
      this.appendDummyInput().appendField("occurrence of text )");
  
      this.setOutput(true, "Number");
      this.setColour(200);
      this.setTooltip("Finds index of substring (first or last)");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks["string_index"] = {
    init: function () {
      this.appendValueInput("BASE")
          .setCheck("String")
          .appendField("in text");
  
      this.appendDummyInput()
          .appendField("get")
          .appendField(new Blockly.FieldDropdown([
            ["letter #", "letter #"],
            ["letter # from end", "letter # from end"],
            ["first letter", "first letter"],
            ["last letter", "last letter"],
          ]), "MODE");
  
      this.appendValueInput("FIND")
          .setCheck("String")
  
      this.appendDummyInput();
      this.setOutput(true, "Number");
      this.setColour(200);
      this.setTooltip("Finds index of substring (first or last)");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks["string_substring"] = {
    init: function () {
      // BASE input
      this.appendValueInput("BASE")
        .setCheck("String")
        .appendField("in text");
  
      // START dropdown and input
      this.appendDummyInput()
        .appendField("get substring from")
        .appendField(new Blockly.FieldDropdown([
          ["letter #", "letter"],
          ["letter # from end", "from_end"],
          ["first letter", "first"],
        ]), "START_MODE");
  
      this.appendValueInput("START")
        .setCheck("Number");
  
      // END dropdown and input
      this.appendDummyInput()
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([
          ["letter #", "letter"],
          ["letter # from end", "from_end"],
          ["first letter", "first"],
        ]), "END_MODE");
  
      this.appendValueInput("END")
        .setCheck("Number");
  
      this.setOutput(true, "String");
      this.setColour(200);
      this.setTooltip("Gets a substring from start index to end index with custom modes");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks["string_case_convert"] = {
    init: function () {
      this.appendDummyInput()
          .appendField("to")
          .appendField(new Blockly.FieldDropdown([
            ["UPPERCASE", "UPPER"],
            ["LOWERCASE", "LOWER"]
          ]), "CASE");
  
      this.setOutput(true, "String");
      this.setColour(200);
      this.setTooltip("Converts text to upper or lower case");
      this.setHelpUrl("");
    }
  };
  

  Blockly.Blocks["string_append_variable"] = {
    init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldVariable("var"), "VAR")
          .appendField("append text")
          .appendField(new Blockly.FieldTextInput(""), "TEXT")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Appends trimmed string to variable");
        this.setHelpUrl("");
      }
  };
  Blockly.Blocks["string_trim"] = {
    init: function () {
      this.appendValueInput("INPUT")
          .setCheck("String")
          .appendField("trim spaces from");
      this.setOutput(true, "String");
      this.setColour(160);
      this.setTooltip("Returns the trimmed string");
      this.setHelpUrl("");
    }
  };
  