import * as Blockly from "blockly/core";

Blockly.Blocks["blink_led_with_speed"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("LED board blink at")
        .appendField(
          new Blockly.FieldDropdown([
            ["Normal", "1000"],
            ["Slow", "2000"],
            ["Very Slow", "5000"],
            ["Fast", "500"],
            ["Very Fast", "200"],
          ]),
          "SPEED"
        );
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Blink LED at predefined speeds");
      this.setHelpUrl("");
    },
  };
  
