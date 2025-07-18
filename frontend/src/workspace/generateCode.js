// src/workspace/generateCode.js
import * as Blockly from 'blockly';
import Arduino from '../generators/arduinoGenerator.js';

export default function generateCode(workspace) {
  return Arduino.workspaceToCode(workspace);
}
