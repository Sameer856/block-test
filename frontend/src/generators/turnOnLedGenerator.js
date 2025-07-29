import arduinoGenerator from "./arduinoGenerator.js";

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
