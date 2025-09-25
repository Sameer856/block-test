import arduinoGenerator from "./arduinoGenerator.js";

arduinoGenerator.forBlock["motor_driver_setup"] = function (block) {
  const ena = block.getFieldValue("ENA");
  const enb = block.getFieldValue("ENB");
  const in1 = block.getFieldValue("IN1");
  const in2 = block.getFieldValue("IN2");
  const in3 = block.getFieldValue("IN3");
  const in4 = block.getFieldValue("IN4");

  // Add global variable declarations
  arduinoGenerator.addDeclaration(
    "motor_pins",
    `
int l298n_ena = ${ena};
const int l298n_enb = ${enb};
const int l298n_in1 = ${in1};
const int l298n_in2 = ${in2};
const int l298n_in3 = ${in3};
const int l298n_in4 = ${in4};
    `
  );

  // Add setup code (no placeholders!)
  arduinoGenerator.addSetup(`pinMode(${ena}, OUTPUT);`);
  arduinoGenerator.addSetup(`pinMode(${enb}, OUTPUT);`);
  arduinoGenerator.addSetup(`pinMode(${in1}, OUTPUT);`);
  arduinoGenerator.addSetup(`pinMode(${in2}, OUTPUT);`);
  arduinoGenerator.addSetup(`pinMode(${in3}, OUTPUT);`);
  arduinoGenerator.addSetup(`pinMode(${in4}, OUTPUT);`);

  return "";
};

arduinoGenerator.forBlock["motor_spin"] = function (block) {
  const motor = block.getFieldValue("MOTOR");
  const dir = block.getFieldValue("DIR");
  const speed = block.getFieldValue("SPEED");

  let code = "";

  const forward = dir === "FORWARD" ? "LOW" : "HIGH";
  const backward = dir === "FORWARD" ? "HIGH" : "LOW";

  if (motor === "RIGHT" || motor === "BOTH") {
    code += `
digitalWrite(l298n_in1, ${forward});
digitalWrite(l298n_in2, ${backward});
analogWrite(l298n_ena, ${speed});
`;
  }

  if (motor === "LEFT" || motor === "BOTH") {
    code += `
digitalWrite(l298n_in3, ${forward});
digitalWrite(l298n_in4, ${backward});
analogWrite(l298n_enb, ${speed});
`;
  }

  return code;
};
arduinoGenerator.forBlock["motor_stop"] = function (block) {
  const motor = block.getFieldValue("MOTOR");
  let code = "";

  if (motor === "RIGHT" || motor === "BOTH") {
    code += `
digitalWrite(l298n_in1, LOW);
digitalWrite(l298n_in2, LOW);
`;
  }

  if (motor === "LEFT" || motor === "BOTH") {
    code += `
digitalWrite(l298n_in3, LOW);
digitalWrite(l298n_in4, LOW);
`;
  }

  return code;
};

arduinoGenerator.forBlock["soft_pwm_motor"] = function (block) {
  const motor = block.getFieldValue("MOTOR");
  const dir = block.getFieldValue("DIR");
  let speed = Number(block.getFieldValue("SPEED"));
  speed = Math.min(Math.max(speed, 0), 255);

  const motorMap = {
    ML1: { dirPin: 2, pwmPin: 4 },
    MR1: { dirPin: 3, pwmPin: 5 },
    ML2: { dirPin: 5, pwmPin: 9 },
    MR2: { dirPin: 6, pwmPin: 10 },
  };

  const { dirPin, pwmPin } = motorMap[motor];
  const directionState = dir === "FORWARD" ? "HIGH" : "LOW";

  // Only add SoftPWMBegin once
  arduinoGenerator.addSetup("SoftPWMBegin()");

  arduinoGenerator.addSetup(`pinMode(${dirPin}, OUTPUT);`);

  // Loop code
  const code = `
pinMode(${dirPin}, OUTPUT);
digitalWrite(${dirPin}, ${directionState});
SoftPWMSet(${pwmPin}, ${speed});
`;

  return code;
};
arduinoGenerator.forBlock["soft_pwm_motor_stop"] = function (block) {
  const motor = block.getFieldValue("MOTOR");

  const motorMap = {
    ML1: { dirPin: 7, pwmPin: 3 },
    MR1: { dirPin: 4, pwmPin: 2 },
    ML2: { dirPin: 8, pwmPin: 1 },
    MR2: { dirPin: 6, pwmPin: 0 },
  };

  const { dirPin, pwmPin } = motorMap[motor];

  arduinoGenerator.addSetup("SoftPWMBegin()");

  // Ensure dir pin is OUTPUT in setup
  arduinoGenerator.addSetup(`pinMode(${dirPin}, OUTPUT);`);

  // Loop code to stop motor
  const code = `
  pinMode(${pwmPin},OUTPUT)
digitalWrite(${pwmPin}, LOW);
SoftPWMSet(${dirPin}, 0);
`;

  return code;
};
