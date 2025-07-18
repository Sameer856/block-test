import arduinoGenerator from './arduinoGenerator.js';

arduinoGenerator.forBlock["arduino_setup"] = function (block) {
    const statements = arduinoGenerator.statementToCode(block, "SETUP_CODE");
    return `  ${statements}`;
  };
  