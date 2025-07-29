import * as Blockly from "blockly";

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
