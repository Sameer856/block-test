import * as Blockly from "blockly";

// Motor Driver Setup Block
Blockly.Blocks["motor_driver_setup"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("⚙️ motor DC")
      .appendField("ENA")
      .appendField(
        new Blockly.FieldDropdown([
          ["3", "3"],
          ["5", "5"],
          ["6", "6"],
          ["9", "9"],
          ["10", "10"],
          ["11", "11"],
        ]),
        "ENA"
      )
      .appendField("ENB")
      .appendField(
        new Blockly.FieldDropdown([
          ["3", "3"],
          ["5", "5"],
          ["6", "6"],
          ["9", "9"],
          ["10", "10"],
          ["11", "11"],
        ]),
        "ENB"
      )
      .appendField("IN1")
      .appendField(
        new Blockly.FieldDropdown([
          ["2", "2"],
          ["4", "4"],
          ["7", "7"],
          ["8", "8"],
          ["A0", "A0"],
          ["A1", "A1"],
          ["A2", "A2"],
          ["A3", "A3"],
        ]),
        "IN1"
      )
      .appendField("IN2")
      .appendField(
        new Blockly.FieldDropdown([
          ["2", "2"],
          ["4", "4"],
          ["7", "7"],
          ["8", "8"],
          ["A0", "A0"],
          ["A1", "A1"],
          ["A2", "A2"],
          ["A3", "A3"],
        ]),
        "IN2"
      )
      .appendField("IN3")
      .appendField(
        new Blockly.FieldDropdown([
          ["2", "2"],
          ["4", "4"],
          ["7", "7"],
          ["8", "8"],
          ["A0", "A0"],
          ["A1", "A1"],
          ["A2", "A2"],
          ["A3", "A3"],
        ]),
        "IN3"
      )
      .appendField("IN4")
      .appendField(
        new Blockly.FieldDropdown([
          ["2", "2"],
          ["4", "4"],
          ["7", "7"],
          ["8", "8"],
          ["A0", "A0"],
          ["A1", "A1"],
          ["A2", "A2"],
          ["A3", "A3"],
        ]),
        "IN4"
      );

    this.setColour(230);
    this.setTooltip("Setup motor driver with selected pins");
    this.setHelpUrl("");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};
Blockly.Blocks["motor_spin"] = {
  init: function () {
    this.appendDummyInput().appendField("Spin Motor");

    // Motor selection dropdown
    this.appendDummyInput()
      .appendField("Motor")
      .appendField(
        new Blockly.FieldDropdown([
          ["Left", "LEFT"],
          ["Right", "RIGHT"],
          ["Both", "BOTH"],
        ]),
        "MOTOR"
      );

    // Direction dropdown
    this.appendDummyInput()
      .appendField("Direction")
      .appendField(
        new Blockly.FieldDropdown([
          ["Forward", "FORWARD"],
          ["Backward", "BACKWARD"],
        ]),
        "DIR"
      );

    // Speed input
    this.appendValueInput("SPEED").setCheck("Number").appendField("Speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Spin motor with selected direction and speed");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["motor_stop"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Stop Motor")
      .appendField(
        new Blockly.FieldDropdown([
          ["Left", "LEFT"],
          ["Right", "RIGHT"],
          ["Both", "BOTH"],
        ]),
        "MOTOR"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0); // optional: red color for stop
    this.setTooltip("Stop selected motor(s)");
    this.setHelpUrl("");
  },
};
Blockly.Blocks["soft_pwm_motor"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor")
      .appendField(
        new Blockly.FieldDropdown([
          ["ML1", "ML1"],
          ["MR1", "MR1"],
          ["ML2", "ML2"],
          ["MR2", "MR2"],
        ]),
        "MOTOR"
      );

    this.appendDummyInput()
      .appendField("Direction")
      .appendField(
        new Blockly.FieldDropdown([
          ["Forward", "FORWARD"],
          ["Backward", "BACKWARD"],
        ]),
        "DIR"
      );

    // Value input for speed (connects to math_number block)
    this.appendValueInput("SPEED").setCheck("Number").appendField("Speed");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Control motor using SoftPWM with variable speed");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["soft_pwm_motor_stop"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor")
      .appendField(
        new Blockly.FieldDropdown([
          ["ML1", "ML1"],
          ["MR1", "MR1"],
          ["ML2", "ML2"],
          ["MR2", "MR2"],
        ]),
        "MOTOR"
      )
      .appendField("Stop");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Stop the selected motor");
    this.setHelpUrl("");
  },
};
