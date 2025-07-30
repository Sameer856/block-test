// src/generators/blinkLedGenerator.js
import arduinoGenerator from "./arduinoGenerator";

//BLINK
arduinoGenerator.forBlock["blink_led"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const delay = block.getFieldValue("DELAY");
  const parent = block.getSurroundParent();
  const isInSetup = parent && parent.type === "arduino_setup";

  const blinkCode = `
  digitalWrite(${pin}, HIGH);
  delay(${delay});
  digitalWrite(${pin}, LOW);
  delay(${delay});
  `;

  // Always add pinMode to setup
  arduinoGenerator.addSetup(`pinMode(${pin}, OUTPUT);`);

  if (isInSetup) {
    // Put full code inside setup
    arduinoGenerator.addSetup(blinkCode.trim());
    return ""; // Nothing goes into loop
  } else {
    // Put full code into loop instead
    return blinkCode.trim();
  }
};

//BLINK WITH SPEED
arduinoGenerator.forBlock["blink_led_with_speed"] = function (block) {
  const delay = block.getFieldValue("SPEED");
  const pin = 13;

  const parent = block.getSurroundParent();
  const isInSetup = parent && parent.type === "arduino_setup";

  const blinkCode = `
  digitalWrite(${pin}, HIGH);
  delay(${delay});
  digitalWrite(${pin}, LOW);
  delay(${delay});
  `;

  // Always add pinMode to setup
  arduinoGenerator.addSetup(`pinMode(${pin}, OUTPUT);`);

  if (isInSetup) {
    // Put full code inside setup
    arduinoGenerator.addSetup(blinkCode.trim());
    return ""; // Nothing goes into loop
  } else {
    // Put full code into loop instead
    return blinkCode.trim();
  }
};

//TURN ON LED
arduinoGenerator.forBlock["turn_on_led"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const state = block.getFieldValue("STATE");

  const parent = block.getSurroundParent();
  const isInSetup = parent && parent.type === "arduino_setup";

  // Always add pinMode in setup
  arduinoGenerator.addSetup(`pinMode(${pin}, OUTPUT);`);

  if (isInSetup) {
    // If block is in setup — write digitalWrite once
    arduinoGenerator.addSetup(
      `digitalWrite(${pin}, ${state});`
    );
    return "";
  } else {
    // If block is in loop — just return the code
    return `digitalWrite(${pin}, ${state});`;
  }
};

