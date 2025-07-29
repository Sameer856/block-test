import * as Blockly from "blockly";

// Define the servo rotation block
Blockly.Blocks["servo_detach"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("detach servo")
      .appendField(
        new Blockly.FieldDropdown([
          ["PIN 2", "2"],
          ["PIN 3", "3"],
          ["PIN 4", "4"],
          ["PIN 5", "5"],
        ]),
        "PIN"
      ) // This is a FIELD (use getFieldValue)
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
  },
};

