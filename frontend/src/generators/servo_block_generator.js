import arduinoGenerator from "./arduinoGenerator.js";


//SERVO ATTACH
arduinoGenerator.includes_ = arduinoGenerator.includes_ || new Set();
arduinoGenerator.definitions_ = arduinoGenerator.definitions_ || {};

arduinoGenerator.forBlock["servo_attach"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const varName = `servo_${pin}`;

  // Add Servo include once
  arduinoGenerator.includes_.add("#include <Servo.h>");

  // Add servo declaration
  arduinoGenerator.definitions_[varName] = `Servo ${varName};`;
  arduinoGenerator.addInclude("#include <Servo.h>");
  arduinoGenerator.addDeclaration(`Servo servo_${pin};`);

  // No setup code
  return `  ${varName}.attach(${pin});\n`;
};

//SERVO ATTACHED?
arduinoGenerator.includes_ = arduinoGenerator.includes_ || new Set();
arduinoGenerator.definitions_ = arduinoGenerator.definitions_ || {};

arduinoGenerator.forBlock["servo_read"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const varName = `servo_${pin}`;

  // Add Servo include once
  arduinoGenerator.includes_.add("#include <Servo.h>");

  // Add servo declaration
  arduinoGenerator.definitions_[varName] = `Servo ${varName};`;
  arduinoGenerator.addInclude("#include <Servo.h>");
  arduinoGenerator.addDeclaration(`Servo servo_${pin};`);

  // No setup code
  return `  ${varName}.attached();\n`;
};



//SERVO Detach
arduinoGenerator.includes_ = arduinoGenerator.includes_ || new Set();
arduinoGenerator.definitions_ = arduinoGenerator.definitions_ || {};

arduinoGenerator.forBlock['servo_detach'] = function (block) {
  const pin = block.getFieldValue('PIN');
  const varName = `servo_${pin}`;

  // Add Servo include once
  arduinoGenerator.includes_.add('#include <Servo.h>');

  // Add servo declaration
  arduinoGenerator.definitions_[varName] = `Servo ${varName};`;
  arduinoGenerator.addInclude("#include <Servo.h>");
  arduinoGenerator.addDeclaration(`Servo servo_${pin};`);
  arduinoGenerator.addSetup(`servo_${pin}.attach(${pin});`);
  

  // No setup code
  return `  ${varName}.detach();\n`;
};


//SERVO ROTATE MICROSECS
function findSetupInput(parent, targetBlock) {
  return parent.inputList.find(
    (input) => input.connection?.targetBlock() === targetBlock
  );
}
arduinoGenerator.forBlock["servo_rotate_microseconds"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const micros =
    arduinoGenerator.valueToCode(block, "MICROS", arduinoGenerator.ORDER_ATOMIC) || "1500";

  arduinoGenerator.addInclude(`#include <Servo.h>`);
  arduinoGenerator.addDeclaration(`Servo servo_${pin};`);

  let isSetup = false;
  let parent = block.getParent();
  while (parent) {
    const input = findSetupInput(parent, block);
    if (input && input.name === "SETUP_CODE") {
      isSetup = true;
      break;
    }
    block = parent;
    parent = block.getParent();
  }

  arduinoGenerator.addSetup(`servo_${pin}.attach(${pin});`);

  if (isSetup) {
    arduinoGenerator.addSetup(`servo_${pin}.writeMicroseconds(${micros});`);
    return '';
  } else {
    return `servo_${pin}.writeMicroseconds(${micros});\n`;
  }
};



//
arduinoGenerator.includes_ = arduinoGenerator.includes_ || new Set();
arduinoGenerator.definitions_ = arduinoGenerator.definitions_ || {};

arduinoGenerator.forBlock['servo_read'] = function (block) {
  const pin = block.getFieldValue('PIN');
  const varName = `servo_${pin}`;

  // Add Servo include once
  arduinoGenerator.includes_.add('#include <Servo.h>');

  // Add servo declaration
  arduinoGenerator.definitions_[varName] = `Servo ${varName};`;
  arduinoGenerator.addInclude("#include <Servo.h>");
  arduinoGenerator.addDeclaration(`Servo servo_${pin};`);
  arduinoGenerator.addSetup(`servo_${pin}.attach(${pin});`);

  // No setup code
  return `  ${varName}.read();\n`;
};

//SERVO PWM
arduinoGenerator.forBlock["set_pwm_servo"] = function (block) {
  const channel = block.getFieldValue("CHANNEL");
  const angle = block.getFieldValue("ANGLE") || "90";

  // Add includes & declarations only once
  arduinoGenerator.addInclude(`#include <Wire.h>`);
  arduinoGenerator.addInclude(`#include <Adafruit_PWMServoDriver.h>`);
  arduinoGenerator.addDeclaration(
    `Adafruit_PWMServoDriver servos = Adafruit_PWMServoDriver(0x40);`
  );

  arduinoGenerator.addDeclaration(`unsigned int pos0=172;`);
  arduinoGenerator.addDeclaration(`unsigned int pos180=565;`);
  arduinoGenerator.addDeclaration(
    `
void setServo(uint8_t n_servo, int angulo) {
  int duty;
  duty = map(angulo, 0, 180, pos0, pos180);
  servos.setPWM(n_servo, 0, duty);
}
`.trim()
  );

  // Setup code
  arduinoGenerator.addSetup(`servos.begin();`);
  arduinoGenerator.addSetup(`servos.setPWMFreq(60);`);

  // Code for loop or inline use
  return `setServo(${channel}, ${angle});`;
};

//SERVO ANGLE
arduinoGenerator.forBlock["servo_write"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const angle = block.getFieldValue("ANGLE") || "90";
  const delayVal = block.getFieldValue("DELAY") || "0";

  // Add header + declaration
  arduinoGenerator.addInclude(`#include <Servo.h>`);
  arduinoGenerator.addDeclaration(`Servo servo_${pin};`);

  const parent = block.getSurroundParent();
  const isInSetup = parent && parent.type === "arduino_setup";

  if (isInSetup) {
    // In setup — attach + write + delay
    arduinoGenerator.addSetup(
      `servo_${pin}.attach(${pin});`,
      `servo_${pin}.write(${angle}); delay(${delayVal});`
    );

    return ""; // Nothing goes in loop
  } else {
    // In loop — only write + delay
    arduinoGenerator.addSetup(`servo_${pin}.attach(${pin});`); // Safe to call once
    return `servo_${pin}.write(${angle});delay(${delayVal});`;
  }
};
