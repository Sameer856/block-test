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
