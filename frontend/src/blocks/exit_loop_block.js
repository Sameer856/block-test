import * as Blockly from "blockly";

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
