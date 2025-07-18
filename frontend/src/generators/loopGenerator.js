import arduinoGenerator from "./arduinoGenerator";

arduinoGenerator.forBlock["arduino_loop"] = function (block) {
    const statements = arduinoGenerator.statementToCode(block, "LOOP_CODE");
    return `${statements}`;
  };
  