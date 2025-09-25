import * as Blockly from "blockly";
import arduinoGenerator from "./arduinoGenerator.js";

arduinoGenerator.forBlock["otto_matrix_setup"] = function (block) {
  let clk = block.getFieldValue("CLK");
  let cs = block.getFieldValue("CS");
  let din = block.getFieldValue("DIN");
  let orient = block.getFieldValue("ORIENT");

  // Includes (only once)
  arduinoGenerator.addInclude("#include <Otto.h>");
  arduinoGenerator.addDeclaration("otto_instance", "Otto Otto;");
  arduinoGenerator.addDeclaration(
    "otto_data",
    'const char data[] = "VARIABLE#";\nunsigned long int matrix;'
  );

  // Defines
  arduinoGenerator.addDeclaration("otto_clk", `#define CLK ${clk}`);
  arduinoGenerator.addDeclaration("otto_cs", `#define CS ${cs}`);
  arduinoGenerator.addDeclaration("otto_din", `#define DIN ${din}`);
  arduinoGenerator.addDeclaration(
    "otto_orient",
    `#define Orientation ${orient}`
  );

  // Setup
  arduinoGenerator.addSetup("Otto.initMATRIX(DIN, CS, CLK, Orientation);");

  return ""; // nothing goes in loop
};
arduinoGenerator.forBlock["otto_put_mouth"] = function (block) {
  let mouth = block.getFieldValue("MOUTH");
  return `Otto.putMouth(${mouth});\n`;
};
arduinoGenerator.forBlock["otto_clear_mouth"] = function (block) {
  return "Otto.clearMouth();\n";
};
arduinoGenerator.forBlock["otto_matrix_intensity"] = function (block) {
  // Get the code for the value input
  const value =
    arduinoGenerator.valueToCode(
      block,
      "VALUE",
      arduinoGenerator.ORDER_ATOMIC
    ) || "0";

  // Generate the Arduino code
  const code = `Otto.matrixIntensity(${value});\n`;
  return code;
};
arduinoGenerator.forBlock["otto_write_text"] = function (block) {
  // Get the text input from the block
  const text = block.getFieldValue("TEXT") || '""';

  // Generate Arduino code with a fixed speed (80)
  const code = `Otto.writeText("${text}", 80);\n`;

  return code;
};
arduinoGenerator.forBlock["otto_display_number"] = function (block) {
  const number =
    arduinoGenerator.valueToCode(
      block,
      "NUMBER",
      arduinoGenerator.ORDER_ATOMIC
    ) || "0";
  const speed =
    arduinoGenerator.valueToCode(
      block,
      "SPEED",
      arduinoGenerator.ORDER_ATOMIC
    ) || "50";

  // We'll use a global 'data' buffer for the string
  return `
  itoa(${number}, data, 10); // convert number to string
  Otto.clearMouth();
  Otto.writeText(data, ${speed});
  delay(50);
  `;
};
// arduinoGenerator.forBlock["otto_mouth_matrix"] = function (block) {
//   const matrix = block.getFieldValue("MATRIX");
//   const code = `matrix = 0b${matrix};\nOtto.putMouth(matrix, false);\n`;
//   return code;
// };
