import arduinoGenerator from "./arduinoGenerator";

arduinoGenerator.forBlock["setup_and_loop"] = function (block) {
  const setupCode = arduinoGenerator.statementToCode(block, "SETUP_CODE");
  const loopCode = arduinoGenerator.statementToCode(block, "LOOP_CODE");

  if (setupCode) {
    setupCode.split("\n").forEach((line) => {
      if (line.trim()) arduinoGenerator.setups_.add(line); // ✅ use arduinoGenerator directly
    });
  }

  return loopCode;
};
