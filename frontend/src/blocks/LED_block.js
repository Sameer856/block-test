import * as Blockly from "blockly";

//BLINK LED
Blockly.Blocks["blink_led"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Blink LED on pin")
      .appendField(
        new Blockly.FieldDropdown([
          ["13", "13"],
          ["2", "2"],
          ["12", "12"],
        ]),
        "PIN"
      )
      .appendField("every")
      .appendField(new Blockly.FieldNumber(1000, 100, 10000), "DELAY")
      .appendField("ms");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
  },
};

//Blinking Speed
Blockly.Blocks["blink_led_with_speed"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("LED board blink at")
      .appendField(
        new Blockly.FieldDropdown([
          ["Normal", "1000"],
          ["Slow", "2000"],
          ["Very Slow", "5000"],
          ["Fast", "500"],
          ["Very Fast", "200"],
        ]),
        "SPEED"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Blink LED at predefined speeds");
    this.setHelpUrl("");
  },
};

//Turn on LED

Blockly.Blocks["turn_on_led"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("turn pin")
      .appendField(
        new Blockly.FieldDropdown([
          ["13", "13"],
          ["2", "2"],
          ["12", "12"],
        ]),
        "PIN"
      )
      .appendField("LED Board")
      .appendField(
        new Blockly.FieldDropdown([
          ["ON", "HIGH"],
          ["OFF", "LOW"],
        ]),
        "STATE"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Turns a pin ON or OFF");
  },
};

/* ─────────────── Block 1: LED Setup ─────────────── */
Blockly.Blocks["led_setup"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage(
          "https://img.icons8.com/ios-filled/50/000000/led-diode.png", // LED icon
          20,
          20,
          "*"
        )
      )
      .appendField("#")
      .appendField(
        new Blockly.FieldDropdown([
          ["1", "1"],
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
        "LED_NUM"
      )
      .appendField("LED digital")
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
        "PIN"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("Setup an LED on a digital pin");
  },
};

/* ─────────────── Block 2: LED ON/OFF ─────────────── */
Blockly.Blocks["led_onoff"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage(
          "https://img.icons8.com/ios-filled/50/000000/light-on.png", // Lightbulb icon
          20,
          20,
          "*"
        )
      )
      .appendField("#")
      .appendField(
        new Blockly.FieldDropdown([
          ["1", "1"],
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
        "LED_NUM"
      )
      .appendField("LED digital")
      .appendField(
        new Blockly.FieldDropdown([
          ["ON", "HIGH"],
          ["OFF", "LOW"],
        ]),
        "STATE"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("Turn an LED ON or OFF");
  },
};

/* ─────────────── Block 3: LED PWM Control ─────────────── */
Blockly.Blocks["led_pwm"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("LED (PWM)")
      .appendField(
        new Blockly.FieldDropdown([
          ["3", "3"],
          ["5", "5"],
          ["6", "6"],
          ["9", "9"],
          ["10", "10"],
          ["11", "11"],
        ]),
        "PIN"
      )
      .appendField("to");
    this.appendValueInput("VALUE").setCheck("Number").appendField("");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("Set LED brightness with PWM (0-255)");
  },
};
