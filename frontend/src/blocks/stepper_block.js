import * as Blockly from "blockly";

Blockly.Blocks["stepper_setup"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Stepper")
      .appendField(
        new Blockly.FieldDropdown([
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
        ]),
        "STEPPER"
      )
      .appendField("Stepper");
    this.appendValueInput("VALUE").setCheck("Number").appendField("Steps/rev");

    this.appendDummyInput()
      .appendField("Pins")
      .appendField("IN1")
      .appendField(new Blockly.FieldNumber(2, 0), "PIN1")
      .appendField("IN2")
      .appendField(new Blockly.FieldNumber(3, 0), "PIN2")
      .appendField("IN3")
      .appendField(new Blockly.FieldNumber(4, 0), "PIN3")
      .appendField("IN4")
      .appendField(new Blockly.FieldNumber(5, 0), "PIN4");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("Setup stepper motor with given pins");
    this.setHelpUrl("");
  },
};
Blockly.Blocks["stepper_set_speed"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Stepper")
      .appendField(
        new Blockly.FieldDropdown([
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
        ]),
        "STEPPER"
      );
    this.appendValueInput("SPEED")
      .setCheck("Number")
      .appendField("# Speed (rpm)");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("Set speed of stepper motor in RPM");
    this.setHelpUrl("");
  },
};
Blockly.Blocks["stepper_set_step"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Stepper")
      .appendField(
        new Blockly.FieldDropdown([
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
        ]),
        "STEPPER"
      )
      .appendField("# steps");
    this.appendValueInput("SPEED").setCheck("Number");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("Set speed of stepper motor in RPM");
    this.setHelpUrl("");
  },
};
