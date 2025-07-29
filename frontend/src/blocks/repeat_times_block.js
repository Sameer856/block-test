import * as Blockly from "blockly";

Blockly.Blocks["repeat_times"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage(
          "https://www.gstatic.com/codesite/ph/images/reload-32.png",
          15,
          15,
          "*"
        )
      )
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
