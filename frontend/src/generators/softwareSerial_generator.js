import arduinoGenerator from "./arduinoGenerator";

arduinoGenerator.forBlock["software_serial_setup"] = function (block) {
  const rx = block.getFieldValue("RX");
  const tx = block.getFieldValue("TX");
  const baud = block.getFieldValue("BAUD");

  // Add include only once
  arduinoGenerator.definitions_["include_softwareserial"] =
    "#include <SoftwareSerial.h>";
  // Declare serial object
  arduinoGenerator.definitions_[
    "declare_mySerial"
  ] = `SoftwareSerial mySerial(${rx}, ${tx});`;
  // Add setup
  arduinoGenerator.setups_["setup_mySerial"] = `mySerial.begin(${baud});`;

  return "";
};

arduinoGenerator.forBlock["software_serial_available"] = function (block) {
  const code = "  mySerial.available()";
  return [code, arduinoGenerator.ORDER_ATOMIC];
};
arduinoGenerator.forBlock["software_serial_read"] = function (block) {
  const code = "(mySerial.read())";
  return [code, arduinoGenerator.ORDER_ATOMIC];
};
arduinoGenerator.forBlock["serial_read_string"] = function (block) {
  var untilNewline = block.getFieldValue("UNTIL_NEWLINE") === "TRUE";
  var code = untilNewline
    ? "mySerial.readStringUntil('\\n');\n"
    : "mySerial.readString();\n";
  return code;
};
arduinoGenerator.forBlock["serial_read_float"] = function (block) {
  var useAtof = block.getFieldValue("USE_ATOF") === "TRUE";
  var code = useAtof
    ? "atof((mySerial.readStringUntil('\\n')).c_str());\n"
    : "mySerial.parseFloat();\n";
  return code;
};
arduinoGenerator.forBlock["software_serial_print"] = function (block) {
  const value =
    arduinoGenerator.valueToCode(
      block,
      "VALUE",
      arduinoGenerator.ORDER_ATOMIC
    ) || "0";
  const format = block.getFieldValue("FORMAT");
  const code = "mySerial.print(" + value + ", " + format + ");\n";
  return code;
};
arduinoGenerator.forBlock["software_serial_print_text"] = function (block) {
  const text = block.getFieldValue("TEXT") || "";
  const code = 'mySerial.print("' + text + '");\n';
  return code;
};
arduinoGenerator.forBlock["software_serial_print_newline_text"] = function (block) {
  const text = block.getFieldValue("TEXT") || "";
  const code = 'mySerial.println("' + text + '");\n';
  return code;
};
arduinoGenerator.forBlock["software_serial_print_write"] = function (block) {
  const text = block.getFieldValue("TEXT") || "";
  const code = 'mySerial.println("' + text + '");\n';
  return code;
};
