
  #include <Servo.h>
  
  Servo servo_2;
  
  void setup() {
    servo_2.attach(2);
  servo_2.writeMicroseconds(1500);
  pinMode(13, OUTPUT);
    while (true) {
      }
  }
  
  void loop() {
      digitalWrite(13, HIGH);
      delay(1000);
      digitalWrite(13, LOW);
      delay(1000);

  }