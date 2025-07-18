// src/generators/blinkLedGenerator.js
import arduinoGenerator from "./arduinoGenerator";

arduinoGenerator.forBlock["blink_led"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const delay = block.getFieldValue("DELAY");
  return `
pinMode(${pin}, OUTPUT);
digitalWrite(${pin}, HIGH);
delay(${delay});
digitalWrite(${pin}, LOW);
delay(${delay});
`;
};
