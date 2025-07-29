import * as Blockly from "blockly";

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
