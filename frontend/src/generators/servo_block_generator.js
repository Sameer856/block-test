import arduinoGenerator from "./arduinoGenerator.js";


// === SERVO ATTACH ===
arduinoGenerator.forBlock["servo_attach"] = function (block) {
 const pin = block.getFieldValue("PIN");
 const varName = `servo_${pin}`;


 arduinoGenerator.addInclude(`#include <Servo.h>`);
 arduinoGenerator.addDeclaration(varName, `Servo ${varName};`);
 arduinoGenerator.addSetup(`${varName}.attach(${pin});`);


 return ""; // All handled in setup
};


// === SERVO WRITE (angle with optional delay) ===
arduinoGenerator.forBlock["servo_write"] = function (block) {
 const pin = block.getFieldValue("PIN");
 const angle = block.getFieldValue("ANGLE") || "90";
 const delayVal = block.getFieldValue("DELAY") || "0";
 const varName = `servo_${pin}`;


 arduinoGenerator.addInclude(`#include <Servo.h>`);
 arduinoGenerator.addDeclaration(varName, `Servo ${varName};`);
 arduinoGenerator.addSetup(`${varName}.attach(${pin});`);


 const parent = block.getSurroundParent();
 const isInSetup = parent && parent.type === "arduino_setup";


 if (isInSetup) {
   arduinoGenerator.addSetup(`${varName}.write(${angle}); delay(${delayVal});`);
   return "";
 } else {
   return `${varName}.write(${angle}); delay(${delayVal});`;
 }
};


// === SERVO DETACH ===
arduinoGenerator.forBlock["servo_detach"] = function (block) {
 const pin = block.getFieldValue("PIN");
 const varName = `servo_${pin}`;


 arduinoGenerator.addInclude(`#include <Servo.h>`);
 arduinoGenerator.addDeclaration(varName, `Servo ${varName};`);
 arduinoGenerator.addSetup(`${varName}.attach(${pin});`);


 return `${varName}.detach();`;
};


// === SERVO READ ===
arduinoGenerator.forBlock["servo_read"] = function (block) {
 const pin = block.getFieldValue("PIN");
 const varName = `servo_${pin}`;


 arduinoGenerator.addInclude(`#include <Servo.h>`);
 arduinoGenerator.addDeclaration(varName, `Servo ${varName};`);


 return [`${varName}.attached()`, arduinoGenerator.ORDER_ATOMIC];
};


// === SERVO ROTATE (writeMicroseconds) ===
arduinoGenerator.forBlock["servo_rotate_microseconds"] = function (block) {
 const pin = block.getFieldValue("PIN");
 const micros = arduinoGenerator.valueToCode(block, "MICROS", arduinoGenerator.ORDER_ATOMIC) || "1500";
 const varName = `servo_${pin}`;


 arduinoGenerator.addInclude(`#include <Servo.h>`);
 arduinoGenerator.addDeclaration(varName, `Servo ${varName};`);
 arduinoGenerator.addSetup(`${varName}.attach(${pin});`);


 // Check if this block is inside setup
 let isSetup = false;
 let parent = block.getParent();
 while (parent) {
   if (parent.type === "arduino_setup") {
     isSetup = true;
     break;
   }
   parent = parent.getParent();
 }


 if (isSetup) {
   arduinoGenerator.addSetup(`${varName}.writeMicroseconds(${micros});`);
   return "";
 } else {
   return `${varName}.writeMicroseconds(${micros});`;
 }
};


// === SERVO PWM (Adafruit PWM Servo Driver) ===
arduinoGenerator.forBlock["set_pwm_servo"] = function (block) {
 const channel = block.getFieldValue("CHANNEL");
 const angle = block.getFieldValue("ANGLE") || "90";


 arduinoGenerator.addInclude(`#include <Wire.h>`);
 arduinoGenerator.addInclude(`#include <Adafruit_PWMServoDriver.h>`);
 arduinoGenerator.addDeclaration("servos", `Adafruit_PWMServoDriver servos = Adafruit_PWMServoDriver(0x40);`);
 arduinoGenerator.addDeclaration("pos0", `unsigned int pos0 = 172;`);
 arduinoGenerator.addDeclaration("pos180", `unsigned int pos180 = 565;`);
 arduinoGenerator.addDeclaration(
   "setServo",
   `
void setServo(uint8_t n_servo, int angulo) {
 int duty;
 duty = map(angulo, 0, 180, pos0, pos180);
 servos.setPWM(n_servo, 0, duty);
}`.trim()
 );


 arduinoGenerator.addSetup(`servos.begin();`);
 arduinoGenerator.addSetup(`servos.setPWMFreq(60);`);


 return `setServo(${channel}, ${angle});`;
};
arduinoGenerator.forBlock["servo_move"] = function (block) {
   const pin = block.getFieldValue("PIN");
   const varName = `servo_${pin}`;
    arduinoGenerator.addInclude(`#include <Servo.h>`);
   arduinoGenerator.addDeclaration(varName, `Servo ${varName};`);
   arduinoGenerator.addSetup(`${varName}.attach(${pin});`);
    return [`${varName}.attached()`, arduinoGenerator.ORDER_ATOMIC];
 };



