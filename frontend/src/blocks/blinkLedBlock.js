import * as Blockly from "blockly";

Blockly.Blocks["blink_led"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Blink LED on pin")
      .appendField(
        new Blockly.FieldDropdown([
          ["13", "13"],
          ["2", "2"],
          ["12", "12"],
        ]),
        "PIN"
      )
      .appendField("every")
      .appendField(new Blockly.FieldNumber(1000, 100, 10000), "DELAY")
      .appendField("ms");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};
