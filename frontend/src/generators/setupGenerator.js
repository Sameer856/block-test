import arduinoGenerator from './arduinoGenerator.js';

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
