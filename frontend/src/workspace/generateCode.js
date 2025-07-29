// src/workspace/generateCode.js
import Arduino from '../generators/arduinoGenerator.js';

export default function generateCode(workspace) {
  return Arduino.workspaceToCode(workspace);
}
