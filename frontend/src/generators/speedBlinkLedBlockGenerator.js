import arduinoGenerator from "./arduinoGenerator.js";

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
