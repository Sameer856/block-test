import * as Blockly from "blockly";

//BLINK LED
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

//Blinking Speed
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
  
//Turn on LED

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

