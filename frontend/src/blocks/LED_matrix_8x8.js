import * as Blockly from "blockly";
// import FieldLedMatrix from '../fields/FieldLedMatrix';



Blockly.Blocks["otto_matrix_setup"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Mouth")
      .appendField(" CLK ")
      .appendField(
        new Blockly.FieldDropdown([
          ["A0", "A0"],
          ["A1", "A1"],
          ["A2", "A2"],
          ["A3", "A3"],
          ["A4", "A4"],
          ["A5", "A5"],
        ]),
        "CLK"
      )
      .appendField(" CS ")
      .appendField(
        new Blockly.FieldDropdown([
          ["A0", "A0"],
          ["A1", "A1"],
          ["A2", "A2"],
          ["A3", "A3"],
          ["A4", "A4"],
          ["A5", "A5"],
        ]),
        "CS"
      )
      .appendField(" DIN ")
      .appendField(
        new Blockly.FieldDropdown([
          ["A0", "A0"],
          ["A1", "A1"],
          ["A2", "A2"],
          ["A3", "A3"],
          ["A4", "A4"],
          ["A5", "A5"],
        ]),
        "DIN"
      )
      .appendField(" rotate ")
      .appendField(
        new Blockly.FieldDropdown([
          ["0", "0"],
          ["90", "1"],
          ["180", "2"],
          ["270", "3"],
        ]),
        "ORIENT"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip("Initialize Otto DIY 8x8 LED Matrix");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["otto_put_mouth"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Show mouth")
      .appendField(
        new Blockly.FieldDropdown([
          ["😊 Happy1", "happyOpen"],
          ["🙂 Happy2", "happyClosed"],
          ["😃 Smile", "smile"],
          ["👅 Tongue", "tongue"],
          ["🤪 Silly", "silly"],
          ["😐 Serious", "serious"],
          ["😕 Confused", "confused"],
          ["☹️ Sad1", "sadOpen"],
          ["🙁 Sad2", "sadClosed"],
          ["❤️ Heart", "heart"],
          ["😯 Surprise1", "smallSurprise"],
          ["😲 Surprise2", "bigSurprise"],
          ["➖ Line Mouth", "lineMouth"],
          ["❌ No", "no"],
          ["✅ OK", "ok"],
          ["❓ Question", "question"],
          ["⚡ Thunder", "thunder"],
        ]),
        "MOUTH"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip("Display a mouth pattern on Otto's LED matrix");
    this.setHelpUrl("");
  },
};
Blockly.Blocks["otto_clear_mouth"] = {
  init: function () {
    this.appendDummyInput().appendField("Clear ");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Clears the mouth display on the matrix");
    this.setHelpUrl("");
  },
};
Blockly.Blocks["otto_matrix_intensity"] = {
  init: function () {
    this.appendDummyInput().appendField("mouth brightness");
    this.appendValueInput("VALUE").setCheck("Number").appendField("");
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);

    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Set the brightness of Otto's LED matrix (0-15).");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["otto_write_text"] = {
  init: function () {
    this.appendDummyInput().appendField("Otto write text");

    // Text input for the message
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput("HELLO"),
      "TEXT"
    );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip(
      "Display text on Otto's matrix. Allowed: CAPITAL LETTERS, 0-9, ; < > = @, MAX 9 characters"
    );
    this.setHelpUrl("");
    this.setInputsInline(true);
  },
};
Blockly.Blocks["otto_display_number"] = {
  init: function () {
    this.appendDummyInput().appendField("mouth");
    this.appendValueInput("VALUE").setCheck("Number").appendField("");
    this.setInputsInline(true);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Convert number to string and display on Otto's matrix");
    this.setHelpUrl("");
  },
};
// // ✅ Use in block
// if (!Blockly.fieldRegistry.getField('field_led_matrix')) {
//   Blockly.fieldRegistry.register('field_led_matrix', FieldLedMatrix);
// }

// // Define the LED Matrix block
// Blockly.Blocks['otto_mouth_matrix'] = {
//   init: function() {
//       this.appendDummyInput()
//           .appendField('set mouth pattern')
//           .appendField(new FieldLedMatrix('000000000000000000000000000000'), 'MATRIX');
//       this.setPreviousStatement(true, null);
//       this.setNextStatement(true, null);
//       this.setColour(200);
//       this.setTooltip('Set the LED matrix pattern for Otto\'s mouth');
//       this.setHelpUrl('');
//   }
// };
