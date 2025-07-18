import * as Blockly from "blockly";

Blockly.Blocks['arduino_setup'] = {
    init: function() {
      this.appendStatementInput("SETUP_CODE")
        .setCheck(null)
        .appendField("setup");
      this.setColour(120);
      this.setTooltip("Put setup code here");
    }
  };
  
  