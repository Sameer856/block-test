import arduinoGenerator from "./arduinoGenerator.js";

// SERIAL BEGIN
arduinoGenerator.forBlock["serial_begin"] = function (block) {
  const baud = block.getFieldValue("BAUD") || 19200;
  const code = `Serial.begin(${baud});`;

  // store inside setup() code set
  arduinoGenerator.setups_.add(code);

  // nothing should be returned because setup handles it
  return "";
};

arduinoGenerator.forBlock["serial_available"] = function (block) {
  const code = "Serial.available()";
  return [code, arduinoGenerator.ORDER_ATOMIC];
};
arduinoGenerator.forBlock["serial_read"] = function (block) {
  const code = "Serial.read()";
  return [code, arduinoGenerator.ORDER_ATOMIC];
};
arduinoGenerator.forBlock["serial_readstring"] = function (block) {
  const untilNewline = block.getFieldValue("UNTIL") === "TRUE";
  let code = untilNewline
    ? "Serial.readStringUntil('\\n')"
    : "Serial.readString()";
  return [code, arduinoGenerator.ORDER_ATOMIC];
};
arduinoGenerator.forBlock["serial_parsefloat"] = function (block) {
  const useAtof = block.getFieldValue("USE_ATOF") === "TRUE";
  let code = useAtof
    ? "atof((Serial.readStringUntil('\\n')).c_str())"
    : "Serial.parseFloat()";
  return [code, arduinoGenerator.ORDER_ATOMIC];
};
arduinoGenerator.forBlock["usbserial_print"] = function (block) {
  const value =
    arduinoGenerator.valueToCode(
      block,
      "VALUE",
      arduinoGenerator.ORDER_ATOMIC
    ) || "0";
  const format = block.getFieldValue("FORMAT") || "DEC";
  return `Serial.print(${value}, ${format});\n`;
};

arduinoGenerator.forBlock["serial_print_diff_line"] = function (block) {
  const value =
    arduinoGenerator.valueToCode(
      block,
      "VALUE",
      arduinoGenerator.ORDER_ATOMIC
    ) || '""';
  return `Serial.println(${value});\n`;
};

arduinoGenerator.forBlock["serial_write"] = function (block) {
  const value =
    arduinoGenerator.valueToCode(
      block,
      "VALUE",
      arduinoGenerator.ORDER_ATOMIC
    ) || '""';
  return `Serial.write(${value});\n`;
};
