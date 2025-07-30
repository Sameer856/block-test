import * as Blockly from "blockly";
import { FieldAngle } from "@blockly/field-angle";


Blockly.Blocks["math_number"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "NUM");
      this.setOutput(true, "Number");
      this.setColour(200);
      this.setTooltip("A number literal");
      this.setHelpUrl("");
    },
  };
  


// Register FieldAngle if not already registered
if (!Blockly.registry.hasItem(Blockly.registry.Type.FIELD, "field_angle")) {
  Blockly.registry.register(
    Blockly.registry.Type.FIELD,
    "field_angle",
    FieldAngle
  );
}

Blockly.Blocks["field_angle"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("angle")
      .appendField(new FieldAngle(90), "ANGLE");
    this.setOutput(true, "Number"); // ✅ Output block, can be connected
    this.setColour(200);
    this.setTooltip("Returns an angle in degrees");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["pin_number"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Pin")
        .appendField(new Blockly.FieldTextInput("A1"), "NUM");
      this.setOutput(true, "Number");
      this.setColour(350);
      this.setTooltip("Enter any pin identifier (e.g., A0, 13, LED_BUILTIN)");
      this.setHelpUrl("");
    },
  };
  Blockly.Blocks["math_operator"] = {
    init: function () {
      this.appendValueInput("A")
        .setCheck("Number")
        .appendField("A");
  
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldDropdown([
            ["+", "+"],
            ["-", "-"],
            ["×", "*"],
            ["÷", "/"],
            ["^" ,"^"]
          ]),
          "OP"
        );
  
      this.appendValueInput("B")
        .setCheck("Number")
        .appendField("B");
  
      this.setOutput(true, "Number");
      this.setColour(210); // Math/purple
      this.setTooltip("Performs the selected operation on A and B");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["comparison_operator"] = {
    init: function () {
      this.appendValueInput("A")
        .setCheck("Number")
        .appendField("Value A");
  
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["=", "=="],
          ["≠", "!="],
          ["<", "<"],
          [">", ">"],
          ["≤", "<="],
          ["≥", ">="]
        ]), "OP");
  
      this.appendValueInput("B")
        .setCheck("Number")
        .appendField("","Value B");
        
  
      this.setOutput(true, "Boolean");
      this.setColour(230); // Logic color
      this.setTooltip("Returns true or false based on comparison");
      this.setHelpUrl("");
    },
  };
  Blockly.Blocks["nested_comparison_operator"] = {
    init: function () {
      this.appendValueInput("A")
        .setCheck("Number")
        .appendField("");
  
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["=", "=="],
          ["≠", "!="],
          ["<", "<"],
          [">", ">"],
          ["≤", "<="],
          ["≥", ">="]
        ]), "OP1");
  
      this.appendValueInput("B")
        .setCheck("Number")
        .appendField("");
        
        this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["=", "=="],
          ["≠", "!="],
          ["<", "<"],
          [">", ">"],
          ["≤", "<="],
          ["≥", ">="]
        ]), "OP2");
  
      this.appendValueInput("C")
        .setCheck("Number")
        .appendField("");
        
  
      this.setOutput(true, "Boolean");
      this.setColour(230); // Logic color
      this.setTooltip("Returns true or false based on comparison");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["map_function"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("map");
  
      this.appendValueInput("VALUE")
        .appendField("");


  
      this.appendValueInput("FROM_LOW")
        .setCheck("Number")
        .appendField("from");
  
      this.appendDummyInput()
        .appendField("-");
  
      this.appendValueInput("FROM_HIGH")
        .setCheck("Number");
  
      this.appendValueInput("TO_LOW")
        .setCheck("Number")
        .appendField("to");
  
      this.appendDummyInput()
        .appendField("-");
  
      this.appendValueInput("TO_HIGH")
        .setCheck("Number");
  
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Maps a number from one range to another");
      this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/math/map/");
    }
  };

  Blockly.Blocks["math_remainder"] = {
    init: function () {
      this.appendValueInput("A")
        .setCheck("Number")
        .appendField("Remainder of");

  
      this.appendDummyInput()
        .appendField("%");
  
      this.appendValueInput("B")
        .setCheck("Number")
        .appendField("");
        

        this.setInputsInline(true);
        this.setOutput(true, "Number");
      this.setColour(210);
      this.setTooltip("Evaluates A % B");
      this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks["random_int_block"] = {
    init: function () {
      this.appendDummyInput()
          .appendField("random integer between");
  
      this.appendValueInput("FROM")
          .setCheck("Number");
       
  
      this.appendDummyInput()
          .appendField("&");
        
  
      this.appendValueInput("TO")
          .setCheck("Number");
  
      this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Returns a random integer between two values (inclusive)");
      this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks["constrain_block"] = {
    init: function () {
      this.appendDummyInput()
          .appendField("constrain");
      this.appendValueInput("VALUE")
          .setCheck("Number")
          .appendField("#");
      this.appendValueInput("LOW")
          .setCheck("Number")
          .appendField("between");
      this.appendValueInput("HIGH")
          .setCheck("Number")
          .appendField("&");
      this.setOutput(true, "Number");
      this.setInputsInline(true);
      this.setColour(230);
      this.setTooltip("Constrains a number between a minimum and maximum value.");
      this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/math/constrain/");
    }
  };
  Blockly.Blocks["math_sqrt_or_abs"] = {
    init: function () {
      this.appendValueInput("NUM")
          .setCheck("Number")
          .appendField(new Blockly.FieldDropdown([
            ["√", "SQRT"],
            ["|x|", "ABS"]
          ]), "OP");    
        this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Returns the square root of a number");
    }
  };

  Blockly.Blocks["math_rounding"] = {
    init: function () {
      this.appendValueInput("NUM")
          .setCheck("Number")
          .appendField(new Blockly.FieldDropdown([
            ["round", "ROUND"],
            ["round up", "CEIL"],
            ["round down", "FLOOR"]

          ]), "OP");    
        this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Returns the square root of a number");
    }
  };
  Blockly.Blocks["math_tri"] = {
    init: function () {
      this.appendValueInput("NUM")
          .setCheck("Number")
          .appendField(new Blockly.FieldDropdown([
            ["sin", "SIN"],
            ["cos", "COS"],
            ["tan", "TAN"]
        ]), "OP");

        this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Returns the square root of a number");
    }
  };
  
  Blockly.Blocks["math_constants"] = {
    init: function () {
      this.appendValueInput("NUM")
          .setCheck("Number")
          .appendField(new Blockly.FieldDropdown([
            ["π", "PI"],
            ["e", "E"],
            ["φ", "PHI"],
            ["√2", "SQRT2"],
            ["√½", "SQRT1_2"],
            ["∞", "INFINITY"]
          ]), "CONST");

        this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Returns the square root of a number");
    }
  };
  
  Blockly.Blocks["math_number_property"] = {
    init: function () {
      this.appendValueInput("NUM")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField("is")
          .appendField(new Blockly.FieldDropdown([
            ["even", "EVEN"],
            ["odd", "ODD"],
            ["positive", "POSITIVE"],
            ["negative", "NEGATIVE"],
            ["prime", "PRIME"],
            ["an integer", "INTEGER"],
            ["divisible by", "DIVISIBLE_BY"]
          ]), "PROPERTY");
  
      this.appendValueInput("DIVISOR")
          .setCheck("Number")
          .appendField(" ")
          .setVisible(false); // initially hidden unless "divisible by" is selected
  
      this.setOutput(true, "Boolean");
      this.setColour(120); // green like in image
      this.setTooltip("Checks a mathematical property of a number.");
      this.setHelpUrl("");
  
      // Update visibility of DIVISOR input
      const block = this;
      this.getField("PROPERTY").setValidator(function (option) {
        block.getInput("DIVISOR").setVisible(option === "DIVISIBLE_BY");
        block.render();
        return option;
      });
    }
  };
  Blockly.Blocks["math_byte"] = {
    init: function () {
      this.appendValueInput("NUM")
          .setCheck("Number")
          .appendField("Casting to Byte")

        this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Returns the square root of a number");
    }
  };
  Blockly.Blocks["unsigned_int"] = {
    init: function () {
      this.appendValueInput("NUM")
          .setCheck("Number")
          .appendField("Casting to Unsigned int")


        this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Returns the square root of a number");
    }
  };
  Blockly.Blocks["int_block"] = {
    init: function () {
      this.appendValueInput("NUM")
          .setCheck("Number")
          .appendField("Casting to Int")


        this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Returns the square root of a number");
    }
  };Blockly.Blocks["float_block"] = {
    init: function () {
      this.appendValueInput("NUM")
          .setCheck("Number")
          .appendField("Casting to Float")


        this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Returns the square root of a number");
    }
  };