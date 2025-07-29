import * as Blockly from "blockly";

Blockly.Blocks["servo_read"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage(
          "https://img.icons8.com/ios-filled/24/000000/servo.png",
          20,
          20,
          "*"
        )
      )
      .appendField("Attached?")
      .appendField("PIN")
      .appendField(
        new Blockly.FieldDropdown([
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
          ["5", "5"],
        ]),
        "PIN"
      );

    this.setOutput(true, "Number"); // ✅ Inner block outputting a value
    this.setColour("#3f51b5");
    this.setTooltip("Reads the current servo angle from a pin.");
    this.setHelpUrl("");
  },
};
