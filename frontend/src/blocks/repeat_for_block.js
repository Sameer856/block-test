import * as Blockly from "blockly/core";

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
