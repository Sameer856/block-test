import * as Blockly from "blockly";

Blockly.Blocks["software_serial_delay"] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck("Number")
      .appendField(
        new Blockly.FieldImage(
          "https://www.svgrepo.com/show/532160/time-timer.svg", // clock icon
          20,
          20,
          "*"
        )
      )
      .appendField("delay");

    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["seconds", "SECONDS"],
        ["milliseconds", "MILLISECONDS"],
        ["microseconds", "MICROSECONDS"],
      ]),
      "UNIT"
    );

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip(
      "Pause the program for a given time in seconds, ms, or µs."
    );
    this.setHelpUrl(
      "https://www.arduino.cc/reference/en/language/functions/time/delay/"
    );
  },
};
Blockly.Blocks["millis_timer"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("every")
      .appendField(new Blockly.FieldNumber(1, 0), "INTERVAL")
      .appendField(
        new Blockly.FieldDropdown([
          ["seconds", "SECONDS"],
          ["milliseconds", "MILLISECONDS"],
          ["microseconds", "MICROSECONDS"],
        ]),
        "UNIT"
      );
    this.appendStatementInput("DO").setCheck(null).appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(
      "Run the inside blocks every given interval using millis(). Non-blocking timing."
    );
    this.setHelpUrl(
      "https://www.arduino.cc/reference/en/language/functions/time/millis/"
    );
  },
};
Blockly.Blocks["timekeeping_start"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("start timekeeping in")
      .appendField(
        new Blockly.FieldDropdown([
          ["milliseconds", "MILLIS"],
          ["microseconds", "MICROS"],
        ]),
        "UNIT"
      )
      .appendField("as")
      .appendField(new Blockly.FieldTextInput("timer1"), "VARNAME");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip(
      "Save current millis() or micros() into a variable for later use."
    );
    this.setHelpUrl(
      "https://www.arduino.cc/reference/en/language/functions/time/millis/"
    );
  },
};
Blockly.Blocks["time_since_start"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("duration in")
      .appendField(
        new Blockly.FieldDropdown([
          ["seconds", "SECONDS"],
          ["milliseconds", "MILLISECONDS"],
          ["microseconds", "MICROSECONDS"],
        ]),
        "UNIT"
      )
      .appendField("from the beginning");
    this.setOutput(true, "Number");
    this.setColour(200);
    this.setTooltip(
      "Returns the time since the Arduino started in the selected unit."
    );
    this.setHelpUrl(
      "https://www.arduino.cc/reference/en/language/functions/time/millis/"
    );
  },
};
Blockly.Blocks["pulse_in"] = {
    init: function () {
      this.appendValueInput("PIN")
        .setCheck("Number")
        .appendField("state duration")
        .appendField(
          new Blockly.FieldDropdown([
            ["UP", "HIGH"],
            ["DOWN", "LOW"],
          ]),
          "STATE"
        )
        .appendField("PIN");
        
      this.setOutput(true, "Number");
      this.setColour(180);
      this.setTooltip(
        "Reads a HIGH or LOW pulse duration on a pin (in microseconds)."
      );
      this.setHelpUrl(
        "https://www.arduino.cc/reference/en/language/functions/advanced-io/pulsein/"
      );
    },
  };
  