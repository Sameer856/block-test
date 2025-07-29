import * as Blockly from "blockly/core";

Blockly.Blocks["set_pwm_servo"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Servo")
      .appendField("Channel")
      .appendField(new Blockly.FieldNumber(0, 0, 15), "CHANNEL")
      .appendField("to angle")
      this.appendDummyInput()
      .appendField("angle [0-180]")
      .appendField(new Blockly.FieldNumber(90, 0, 360), "ANGLE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Set a PCA9685 PWM servo angle on a channel");
    this.setHelpUrl("");
  },
};
