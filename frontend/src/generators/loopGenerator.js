import arduinoGenerator from "./arduinoGenerator";

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
