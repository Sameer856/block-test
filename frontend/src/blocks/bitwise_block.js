import * as Blockly from "blockly";

Blockly.Blocks["bitwise_operator"] = {
  init: function () {
    this.appendValueInput("A").setCheck(null).appendField("Value A");
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ["AND (&)", "&"],
          ["OR (|)", "|"],
          ["XOR (^)", "^"],
          ["LEFT SHIFT (<<)", "<<"],
          ["RIGHT SHIFT (>>)", ">>"]
        ]),
        "OPERATOR"
      );
    this.appendValueInput("B").setCheck(null).appendField("Value B");

    this.setOutput(true, null);
    this.setColour(210); // Math/purple
    this.setTooltip("Bitwise/Logical operator between A and B");
    this.setHelpUrl("");
  },
};
