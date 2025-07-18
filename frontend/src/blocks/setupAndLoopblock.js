import * as Blockly from "blockly/core";

Blockly.Blocks["setup_and_loop"] = {
  init: function () {
    this.appendStatementInput("SETUP_CODE").setCheck(null).appendField("Setup");

    this.appendStatementInput("LOOP_CODE").setCheck(null).appendField("Loop");

    this.setColour(230);
    this.setTooltip("Contains Arduino setup() and loop() code blocks");
    this.setHelpUrl("");
  },
};
