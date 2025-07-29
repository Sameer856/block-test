import * as Blockly from "blockly";

// Define the servo rotation block
Blockly.Blocks["servo_attach"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("attach servo")
      .appendField(
        new Blockly.FieldDropdown([
          ["PIN 2", "2"],
          ["PIN 3", "3"],
          ["PIN 4", "4"],
          ["PIN 5", "5"],
          ["PIN 6", "6"],
          ["PIN 7", "7"],
          ["PIN 8", "8"],
          ["PIN 9", "8"],
          ["PIN 10", "10"],
          ["PIN 11", "11"],
          ["PIN 12", "12"],
          ["PIN 13", "13"],
          ["PIN A1", "A1"],
          ["PIN A2", "A2"],
          ["PIN A3", "A3"],
          ["PIN A4", "A4"],
          ["PIN A5", "A5"],
          ["PIN A6", "A6"],
          ["PIN A7", "A7"]
          

        ]),
        "PIN"
      ); // This is a FIELD (use getFieldValue)
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
  },
};
