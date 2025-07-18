import * as Blockly from "blockly";

Blockly.Blocks["turn_on_led"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("turn pin")
      .appendField(
        new Blockly.FieldDropdown([
          ["13", "13"],
          ["2", "2"],
          ["12", "12"],
        ]),
        "PIN"
      )
      .appendField("LED Board")
      .appendField(
        new Blockly.FieldDropdown([
          ["ON", "HIGH"],
          ["OFF", "LOW"],
        ]),
        "STATE"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Turns a pin ON or OFF");
  },
};
