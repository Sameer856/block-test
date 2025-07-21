import arduinoGenerator from "./arduinoGenerator";

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
