import * as Blockly from "blockly";

// Define the servo rotation block
Blockly.Blocks['servo_rotate_microseconds'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage(
        "https://img.icons8.com/external-flatart-icons-outline-flatarticons/32/000000/external-servo-robotics-flatart-icons-outline-flatarticons.png",
        15, 15, "*"
      ))
      .appendField("rotate")
      .appendField(new Blockly.FieldDropdown([
        ["PIN 2", "2"],
        ["PIN 3", "3"], 
        ["PIN 4", "4"],
        ["PIN 5", "5"]
      ]), "PIN")  // This is a FIELD (use getFieldValue)
      .appendField("for microseconds");

    this.appendValueInput("MICROS")  // This is a VALUE INPUT (use valueToCode)
      .setCheck("Number")
      .appendField("duration (μs):");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Control servo with microsecond pulses (500-2500μs)");
  }
};
// Define a custom number input block with validation
Blockly.Blocks["servo_number_input"] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(1500, 500, 2500), "NUM");
    this.setOutput(true, "Number");
    this.setColour(160);
    this.setTooltip("Microsecond value (500-2500)");
  }
};