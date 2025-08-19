import * as Blockly from "blockly";

Blockly.Blocks["serial_begin"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Serial begin baud")
      .appendField(new Blockly.FieldNumber(19200, 300, 2000000, 1), "BAUD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160); // purple/orange-ish
    this.setTooltip("Initialize Serial at the given baud rate (goes into setup).");
    this.setHelpUrl("");
  },
};
//Serial availabe
Blockly.Blocks["serial_available"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Serial.available?");
      this.setOutput(true, "Number"); // it returns int
      this.setColour(160);
      this.setTooltip("Returns the number of bytes available for reading from Serial.");
      this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/communication/serial/available/");
    }
  };
  
  //serial read
  Blockly.Blocks["serial_read"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Serial read byte");
      this.setOutput(true, "Number"); // returns int (-1 if no data)
      this.setColour(160);
      this.setTooltip("Reads incoming serial data (returns int, -1 if no data).");
      this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/communication/serial/read/");
    }
  };
  Blockly.Blocks["serial_readstring"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Serial read string")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "UNTIL")
        .appendField("until line feed");
      this.setOutput(true, "String");
      this.setColour(160);
      this.setTooltip("Reads characters from Serial until timeout or until newline if checked.");
      this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/communication/serial/readstring/");
    }
  };
  Blockly.Blocks["serial_parsefloat"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Serial read as number")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "USE_ATOF")
        .appendField("use line feed");
      this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Parses a float directly or using atof with Serial.readStringUntil.");
      this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/communication/serial/parsefloat/");
    }
  };
  Blockly.Blocks["usbserial_print"] = {
    init: function () {
      this.appendValueInput("VALUE")
        .setCheck("Number")
        .appendField("Serial.print");
      this.appendDummyInput()
        .appendField("format")
     
        .appendField(new Blockly.FieldDropdown([
          ["DEC", "DEC"],
          ["HEX", "HEX"],
          ["BIN", "BIN"],
          ["OCT", "OCT"]
        ]), "FORMAT");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Prints data to the serial port with the selected format.");
      this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/communication/serial/print/");
    }
  };
  
  Blockly.Blocks['serial_print_same_line'] = {
    init: function () {
      this.appendValueInput("VALUE")
          .setCheck("String")
          .appendField(new Blockly.FieldImage("https://www.svgrepo.com/show/361643/terminal.svg", 20, 20, "*"))
          .appendField("serial print on same line");
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip("Print text on the same line in the Serial Monitor");
      this.setHelpUrl("");
    }
  };
    
  Blockly.Blocks['serial_print_diff_line'] = {
    init: function () {
      this.appendValueInput("VALUE")
          .setCheck("String")
          .appendField(new Blockly.FieldImage("https://www.svgrepo.com/show/361643/terminal.svg", 20, 20, "*"))
          .appendField("serial print on different line");
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip("Print text on the same line in the Serial Monitor");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['serial_write'] = {
    init: function () {
      this.appendValueInput("VALUE")
          .setCheck("String")
          .appendField(new Blockly.FieldImage("https://www.svgrepo.com/show/361643/terminal.svg", 20, 20, "*"))
          .appendField("serial write");
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip("Print text on the same line in the Serial Monitor");
      this.setHelpUrl("");
    }
  };
  