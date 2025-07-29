import * as Blockly from "blockly/core";
import { FieldAngle } from "@blockly/field-angle";

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
