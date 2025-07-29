import arduinoGenerator from "./arduinoGenerator.js";

arduinoGenerator.forBlock["exit_loop"] = function (block) {

  const flowType = block.getFieldValue("FLOW");

  if (flowType === "BREAK") {
    return "break;\n";
  } else if (flowType === "CONTINUE") {
    return "continue;\n";
  }

  return ""; // fallback
};
