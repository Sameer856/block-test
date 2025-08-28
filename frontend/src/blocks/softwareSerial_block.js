import * as Blockly from "blockly";

Blockly.Blocks["software_serial_setup"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Software Serial RX")
      .appendField(
        new Blockly.FieldDropdown([
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
          ["5", "5"],
          ["6", "6"],
          ["7", "7"],
          ["8", "8"],
          ["9", "9"],
          ["10", "10"],
          ["11", "11"],
          ["12", "12"],
          ["13", "13"],
        ]),
        "RX"
      )
      .appendField("TX")
      .appendField(
        new Blockly.FieldDropdown([
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
          ["5", "5"],
          ["6", "6"],
          ["7", "7"],
          ["8", "8"],
          ["9", "9"],
          ["10", "10"],
          ["11", "11"],
          ["12", "12"],
          ["13", "13"],
        ]),
        "TX"
      )
      .appendField("baud rate")
      .appendField(
        new Blockly.FieldDropdown([
          ["1200", "1200"],
          ["2400", "2400"],
          ["4800", "4800"],
          ["9600", "9600"],
          ["14400", "14400"],
          ["19200", "19200"],
          ["38400", "38400"],
          ["57600", "57600"],
          ["115200", "115200"],
        ]),
        "BAUD"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Setup SoftwareSerial with selected RX, TX, and baud rate");
    this.setHelpUrl("");
  },
};
Blockly.Blocks["software_serial_available"] = {
  init: function () {
    this.appendDummyInput().appendField("software serial available?");
    this.setOutput(true, "Number"); // it returns int
    this.setColour(160);
    this.setTooltip(
      "Returns the number of bytes available for reading from Serial."
    );
    this.setHelpUrl(
      "https://www.arduino.cc/reference/en/language/functions/communication/serial/available/"
    );
  },
};

Blockly.Blocks["software_serial_read"] = {
  init: function () {
    this.appendDummyInput().appendField("data read on the software port");
    this.setOutput(true, "Number"); // it returns int
    this.setColour(160);
    this.setTooltip(
      "Returns the number of bytes available for reading from Serial."
    );
    this.setHelpUrl(
      "https://www.arduino.cc/reference/en/language/functions/communication/serial/available/"
    );
  },
};
Blockly.Blocks["serial_read_string"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Software Serial read string")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "UNTIL_NEWLINE")
      .appendField("until line feed");
    this.setOutput(true, "Number"); // it returns int

    this.setColour(230);
    this.setTooltip("Read serial input as string. Tick to read until newline.");
    this.setHelpUrl("");
  },
};
Blockly.Blocks["serial_read_float"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Software Serial read as number")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "USE_ATOF")
      .appendField("use atof")
      .appendField("until line feed");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(
      "Read a float from SoftwareSerial. Tick to use atof with readStringUntil."
    );
    this.setHelpUrl("");
  },
};
Blockly.Blocks["software_serial_print"] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck(null) // allow Number or Text
      .appendField("Software serial print format");

    this.appendDummyInput()
      .appendField("")
      .appendField(
        new Blockly.FieldDropdown([
          ["DEC", "DEC"],
          ["HEX", "HEX"],
          ["BIN", "BIN"],
          ["OCT", "OCT"],
        ]),
        "FORMAT"
      );

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip(
      "Prints data to the SoftwareSerial port with the selected format."
    );
    this.setHelpUrl(
      "https://www.arduino.cc/reference/en/language/functions/communication/serial/print/"
    );
  },
};
Blockly.Blocks["software_serial_print_text"] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck("String")
      .appendField(
        new Blockly.FieldImage(
          "https://www.svgrepo.com/show/361643/terminal.svg",
          20,
          20,
          "*"
        )
      )
      .appendField("Software serial print on same line");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("Print text on the same line in the Serial Monitor");
    this.setHelpUrl("");
  },
};
Blockly.Blocks["software_serial_print_newline_text"] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck("String")
      .appendField(
        new Blockly.FieldImage(
          "https://www.svgrepo.com/show/361643/terminal.svg",
          20,
          20,
          "*"
        )
      )
      .appendField("Software serial print on new line");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("Print text on the same line in the Serial Monitor");
    this.setHelpUrl("");
  },
};
Blockly.Blocks["software_serial_print_write"] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck("String")
      .appendField(
        new Blockly.FieldImage(
          "https://www.svgrepo.com/show/361643/terminal.svg",
          20,
          20,
          "*"
        )
      )
      .appendField("Send to the software port");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("Send to the software port");
    this.setHelpUrl("");
  },
};
