import arduinoGenerator from './arduinoGenerator.js';



//SETUP
arduinoGenerator.forBlock["arduino_setup"] = function (block) {
  let currentBlock = block.getInputTargetBlock("SETUP_CODE");

  while (currentBlock) {
    const lineOrArray = arduinoGenerator.blockToCode(currentBlock);

    // blockToCode might return a string or an array [code, order]
    let line = '';
    if (Array.isArray(lineOrArray)) {
      line = lineOrArray[0];
    } else if (typeof lineOrArray === "string") {
      line = lineOrArray;
    }

    // Only add non-empty lines
    if (line.trim()) {
      line.split("\n").forEach((l) => {
        if (l.trim()) arduinoGenerator.setups_.add(l.trim());
      });
    }

    currentBlock = currentBlock.getNextBlock();
  }

  return ''; // Nothing directly generated
};


//LOOP
arduinoGenerator.forBlock["arduino_loop"] = function (block) {
  let loopCode = "";

  let currentBlock = block.getInputTargetBlock("LOOP_CODE");

  while (currentBlock) {
    const lineOrArray = arduinoGenerator.blockToCode(currentBlock);

    // blockToCode might return a string or an array [code, order]
    let line = "";
    if (Array.isArray(lineOrArray)) {
      line = lineOrArray[0];
    } else if (typeof lineOrArray === "string") {
      line = lineOrArray;
    }

    if (line.trim()) {
      loopCode += line + "\n";
    }

    currentBlock = currentBlock.getNextBlock();
  }

  return loopCode;
};

//SETUP AND LOOP
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
