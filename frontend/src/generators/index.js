// src/generators/index.js
import "./blinkLedBlockGenerator.js";
import "./setupLoopGenerator.js";
import "./turnOnLedGenerator.js";
import "./loopGenerator.js";
import "./setupGenerator.js";
import "./setupLoopGenerator.js";
import "./speedBlinkLedBlockGenerator.js";

import "./servo_move_blockGenerator.js";
import "./servo_write_blockGenerator.js";
import "./servo_microseconds_blockGenerator.js";
import "./servo_attach_block.js";
import "./servo_detach_block.js";
import "./servo_attached_blockGenerator.js";
import "./servo_set_blockGenerator.js";

import "./if_then_blockGenerator.js";
import "./repeat_times_blockGenerator.js";
import "./repeat_while_blockGenerator.js";
import "./repeat_for_blockGenerator.js";
import "./switch_case_blockGenerator.js";
import "./exit_loop_blockGenerator.js"
import "./bitwise_block_Generator.js"
import "./not_and_nullGenerator.js"

import arduinoGenerator from "./arduinoGenerator";

export default arduinoGenerator;
