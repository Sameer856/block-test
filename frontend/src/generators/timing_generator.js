import arduinoGenerator from "./arduinoGenerator.js";

arduinoGenerator.forBlock["software_serial_delay"] = function (block) {
  const value =
    arduinoGenerator.valueToCode(
      block,
      "VALUE",
      arduinoGenerator.ORDER_ATOMIC
    ) || "0";
  const unit = block.getFieldValue("UNIT");

  let code = "";
  if (unit === "SECONDS") {
    code = "delay(" + value + " * 1000);\n";
  } else if (unit === "MILLISECONDS") {
    code = "delay(" + value + ");\n";
  } else if (unit === "MICROSECONDS") {
    code = "delayMicroseconds(" + value + ");\n";
  }
  return code;
};
arduinoGenerator.forBlock["millis_timer"] = function (block) {
  const interval = block.getFieldValue("INTERVAL") || "1";
  const unit = block.getFieldValue("UNIT");
  const branch = arduinoGenerator.statementToCode(block, "DO");

  // Fixed variable name (can expand to temps2, temps3 if needed later)
  const varName = "temps1";

  // Add global variable definition once
  arduinoGenerator.definitions_[`var_${varName}`] = `long ${varName} = 0;`;

  let intervalCode = interval;
  if (unit === "SECONDS") {
    intervalCode = `${interval} * 1000`;
  } else if (unit === "MICROSECONDS") {
    // Using micros() instead of millis()
    return (
      `if ((micros() - ${varName}) >= ${interval}) {\n` +
      `  ${varName} = micros();\n` +
      branch +
      `}\n`
    );
  }

  const code =
    `if ((millis() - ${varName}) >= ${intervalCode}) {\n` +
    `  ${varName} = millis();\n` +
    branch +
    `}\n`;
  return code;
};
arduinoGenerator.forBlock["timekeeping_start"] = function (block) {
  const unit = block.getFieldValue("UNIT");
  const varName = block.getFieldValue("VARNAME") || "timer1";

  // Add global variable definition once
  arduinoGenerator.definitions_[
    `var_${varName}`
  ] = `unsigned long ${varName} = 0;`;

  if (unit === "MILLIS") {
    return `${varName} = millis();\n`;
  } else {
    return `${varName} = micros();\n`;
  }
};

arduinoGenerator.forBlock["time_since_start"] = function (block) {
  const unit = block.getFieldValue("UNIT");

  if (unit === "SECONDS") {
    return ["(millis() / 1000)", "ORDER_ATOMIC"];
  } else if (unit === "MILLISECONDS") {
    return ["millis()", "ORDER_ATOMIC"];
  } else {
    return ["micros()", "ORDER_ATOMIC"];
  }
};
arduinoGenerator.forBlock["pulse_in"] = function (block) {
    const pin =
      arduinoGenerator.valueToCode(block, "PIN", arduinoGenerator.ORDER_ATOMIC) ||
      "10";
    const state = block.getFieldValue("STATE") || "HIGH";
  
    // ✅ Add pinMode to setup() using addSetup()
    arduinoGenerator.addSetup(`pinMode(${pin}, INPUT);`);
  
    // Generate the pulseIn() expression
    const code = `pulseIn(${pin}, ${state})`;
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
  