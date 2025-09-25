import arduinoGenerator from "./arduinoGenerator.js";

/* ─────────────── Blink LED ─────────────── */
arduinoGenerator.forBlock["blink_led"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const delayTime = block.getFieldValue("DELAY");

  // declare LED pin only once
  arduinoGenerator.addDeclaration(
    `led_${pin}`,
    `const int led${pin} = ${pin};`
  );

  // setup only once
  arduinoGenerator.addSetup(`setup_led_${pin}`, `pinMode(${pin}, OUTPUT);`);

  const code =
    `digitalWrite(${pin}, HIGH);\n` +
    `delay(${delayTime});\n` +
    `digitalWrite(${pin}, LOW);\n` +
    `delay(${delayTime});\n`;
  return code;
};

/* ─────────────── Blink LED with Speed ─────────────── */
arduinoGenerator.forBlock["blink_led_with_speed"] = function (block) {
  const speed = block.getFieldValue("SPEED");

  // Assume LED 13 as default
  arduinoGenerator.addDeclaration("led_13", `const int led13 = 13;`);
  arduinoGenerator.addSetup("setup_led_13", `pinMode(13, OUTPUT);`);

  const code =
    `digitalWrite(13, HIGH);\n` +
    `delay(${speed});\n` +
    `digitalWrite(13, LOW);\n` +
    `delay(${speed});\n`;
  return code;
};

/* ─────────────── Turn ON/OFF LED ─────────────── */
arduinoGenerator.forBlock["turn_on_led"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const state = block.getFieldValue("STATE");

  arduinoGenerator.addDeclaration(
    `led_${pin}`,
    `const int led${pin} = ${pin};`
  );
  arduinoGenerator.addSetup(`setup_led_${pin}`, `pinMode(${pin}, OUTPUT);`);

  return `digitalWrite(${pin}, ${state});\n`;
};

/* ─────────────── LED Setup ─────────────── */
arduinoGenerator.forBlock["led_setup"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const ledNum = block.getFieldValue("LED_NUM");

  // use LED_NUM as a unique key so old ones get replaced
  arduinoGenerator.addDeclaration(
    `led_${ledNum}`,
    `const int led${ledNum} = ${pin};`
  );

  // also overwrite setup by same key
  arduinoGenerator.addSetup(`setup_led_${ledNum}`, `pinMode(${pin}, OUTPUT);`);

  return ``; // setup only, no loop code
};

/* ─────────────── LED ON/OFF ─────────────── */
arduinoGenerator.forBlock["led_onoff"] = function (block) {
  const ledNum = block.getFieldValue("LED_NUM");
  const state = block.getFieldValue("STATE");

  return `digitalWrite(led${ledNum}, ${state});\n`;
};

/* ─────────────── LED PWM Control ─────────────── */
arduinoGenerator.forBlock["led_pwm"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const value =
    arduinoGenerator.valueToCode(
      block,
      "VALUE",
      arduinoGenerator.ORDER_ATOMIC
    ) || "0";

  arduinoGenerator.addDeclaration(`const int ledPWM${pin} = ${pin};`);
  arduinoGenerator.addSetup(`pinMode(${pin}, OUTPUT);`);

  return `analogWrite(${pin}, ${value});\n`;
};
