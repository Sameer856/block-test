import { FieldAngle } from "@blockly/field-angle";
import * as Blockly from "blockly";

//Attach pin
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


Blockly.Blocks["servo_move"] = {
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
        .appendField("get servo angle")
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
  

  // Define the servo rotation block
  Blockly.Blocks["servo_rotate_microseconds"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("rotate")
        .appendField(
          new Blockly.FieldDropdown([
            ["PIN 2", "2"],
            ["PIN 3", "3"],
            ["PIN 4", "4"],
            ["PIN 5", "5"],
          ]),
          "PIN"
        ) // This is a FIELD (use getFieldValue)
        .appendField("microseconds");
  
      this.appendValueInput("MICROS") // This is a VALUE INPUT (use valueToCode)
        .setCheck("Number");
  
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip("Control servo with microsecond pulses (500-2500μs)");
    },
  };
  // Define a custom number input block with validation
  Blockly.Blocks["servo_number_input"] = {
  
    init: function () {
      this.appendDummyInput().appendField(
        new Blockly.FieldNumber(1500, 500, 2500),
        "NUM"
      );
      this.setOutput(true, "Number");
      this.setColour(120);
      this.setTooltip("Microsecond value (500-2500)");
    },
  };
  

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


// Register FieldAngle if needed
if (!Blockly.registry.hasItem(Blockly.registry.Type.FIELD, "field_angle")) {
  Blockly.registry.register(
    Blockly.registry.Type.FIELD,
    "field_angle",
    FieldAngle
  );
}

Blockly.Blocks["servo_write"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Rotate PIN")
      .appendField(
        new Blockly.FieldDropdown([
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
          ["5", "5"],
        ]),
        "PIN"
      );

    this.appendDummyInput()
      .appendField("angle [0-180]")
      .appendField(new Blockly.FieldNumber(90, 0, 360), "ANGLE");

    this.appendDummyInput()
      .appendField("delay")
      .appendField(new Blockly.FieldNumber(80, 0), "DELAY");

    this.setColour("#3f51b5");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Attaches a servo to a pin and writes angle");
    this.setHelpUrl("");
  },
};
