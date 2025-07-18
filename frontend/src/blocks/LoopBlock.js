import * as Blockly from "blockly";

Blockly.Blocks["arduino_loop"] = {
    init: function () {
      this.appendStatementInput("LOOP_CODE")
        .setCheck(null)
        .appendField("loop");
      this.setColour(180);
      this.setTooltip("Put your loop code here");
    },
  };
  