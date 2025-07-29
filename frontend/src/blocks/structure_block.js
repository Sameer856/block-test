import * as Blockly from "blockly";


//Setup Block
Blockly.Blocks['arduino_setup'] = {
    init: function() {
      this.appendStatementInput("SETUP_CODE")
        .setCheck(null)
        .appendField("setup");
      this.setColour(120);
      this.setTooltip("Put setup code here");
    }
  };
  
//Loop Block
Blockly.Blocks["arduino_loop"] = {
    init: function () {
      this.appendStatementInput("LOOP_CODE")
        .setCheck(null)
        .appendField("loop");
      this.setColour(180);
      this.setTooltip("Put your loop code here");
    },
  };

  //Setup and loop block
Blockly.Blocks["setup_and_loop"] = {
    init: function () {
      this.appendStatementInput("SETUP_CODE").setCheck(null).appendField("Setup");
  
      this.appendStatementInput("LOOP_CODE").setCheck(null).appendField("Loop");
  
      this.setColour(230);
      this.setTooltip("Contains Arduino setup() and loop() code blocks");
      this.setHelpUrl("");
    },
  };
  