import * as Blockly from "blockly";

Blockly.Blocks["custom_if_then"] = {
  init: function () {
    this.setColour(30); // orange
    this.appendValueInput("IF")
      .setCheck("Boolean")
      .appendField("if");
    this.appendStatementInput("THEN")
      .appendField("then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("If condition is true, do something");
    this.setHelpUrl("");
  },
};



Blockly.Blocks["repeat_while"] = {
    init: function () {
        this.appendDummyInput()
          .appendField("repeat")
          .appendField(
            new Blockly.FieldDropdown([
              ["as long as", "AS_LONG_AS"],
              ["up", "UP"],
             
            ]),"DIRECTION"
          ) // This is a FIELD (use getFieldValue)
    
        this.appendValueInput("MICROS") // This is a VALUE INPUT (use valueToCode)
          .setCheck("Number");

          this.appendStatementInput("DO") // ALLOWS NESTING BLOCKS INSIDE
          .setCheck(null)
          .appendField("");
        
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Control servo with microsecond pulses (500-2500μs)");
      },
    };
  

  
    Blockly.Blocks["repeat_times"] = {
      init: function () {
        this.appendDummyInput()
          
          .appendField("repeat");
    
        this.appendValueInput("TIMES") // VALUE INPUT for number
          .setCheck("Number")
          .appendField("", "DYNAMIC_NUMBER"); // empty label to push the input inline
    
        this.appendDummyInput()
          .appendField("times");
    
        this.appendStatementInput("DO") // ALLOWS NESTING BLOCKS INSIDE
          .setCheck(null)
          .appendField(""); // optional label before the inner block
    
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#fbbc05");
        this.setTooltip("Repeat enclosed statements n times.");
        this.setHelpUrl("");
      },
    };


Blockly.Blocks["repeat_for"] = {
  init: function () {
    const dropdown = new Blockly.FieldDropdown(
      [
        ["i", "i"],
        ["j", "j"],
        ["k", "k"],
        ["rename variable i", "RENAME"],
      ],
      function (newValue) {
        if (newValue === "RENAME") {
          const oldVarName = this.getValue();
          const newName = prompt("Enter new variable name:", oldVarName.toLowerCase());
          const workspace = this.sourceBlock_.workspace;

          if (newName) {
            const existing = workspace.getVariable(newName, "");
            if (!existing) {
              workspace.createVariable(newName, "");  // ✅ THIS IS THE FIX
              this.setValue(newName);
            } else {
              alert(`Variable "${newName}" already exists.`);
              this.setValue(oldVarName);
            }
          } else {
            this.setValue(oldVarName);
          }

          return null; // prevents setting "RENAME" as the value
        }

        return newValue;
      }
    );

    this.appendDummyInput()
  .appendField("for")
  .appendField(new Blockly.FieldVariable("i"), "VARIABLE") // ✅ uses Blockly's variable system
  .appendField("ranging from");


    this.appendValueInput("START").setCheck("Number").appendField("");
    this.appendDummyInput().appendField("to");
    this.appendValueInput("END").setCheck("Number").appendField("");
    this.appendValueInput("STEP").setCheck("Number").appendField("in steps of");
    this.appendStatementInput("DO").setCheck(null).appendField("");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#fbbc05");
    this.setTooltip("For loop block");
    this.setHelpUrl("");
  }
};


Blockly.Blocks["switch_case"] = {
  init: function () {
    this.appendDummyInput()
      
      .appendField("switch")
      .appendField(new Blockly.FieldVariable("k"), "VAR")

    this.appendValueInput("CONDITION").setCheck(null).appendField("is");

    this.appendStatementInput("CASES").setCheck(null).appendField("then"); // visually matches your block

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip("Switch statement with nested cases");
    this.setHelpUrl("");
  },
};


Blockly.Blocks["exit_loop"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ["exit the loop", "BREAK"],
          ["move to the next iteration", "CONTINUE"]
        ]),
        "FLOW"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0); // red for flow control
    this.setTooltip("Control loop flow: break or continue");
    this.setHelpUrl("");
  },
};


Blockly.Blocks["bitwise_operator"] = {
  init: function () {
    this.appendValueInput("A").setCheck(null).appendField("Value A");
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ["AND (&)", "&"],
          ["OR (|)", "|"],
          ["XOR (^)", "^"],
          ["LEFT SHIFT (<<)", "<<"],
          ["RIGHT SHIFT (>>)", ">>"]
        ]),
        "OPERATOR"
      );
    this.appendValueInput("B").setCheck(null).appendField("Value B");

    this.setOutput(true, null);
    this.setColour(210); // Math/purple
    this.setTooltip("Bitwise/Logical operator between A and B");
    this.setHelpUrl("");
  },
};


Blockly.Blocks["bitwise_not"] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck("Number")
      .appendField("NOT");
    this.setOutput(true, "Number");
    this.setColour(200);
    this.setTooltip("Bitwise NOT (~)");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["null_value"] = {
  init: function () {
    this.appendDummyInput().appendField("null");
    this.setOutput(true, null);
    this.setColour(10);
    this.setTooltip("Null value");
    this.setHelpUrl("");
  },
};
