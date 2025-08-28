import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import arduinoGenerator from "./generators";
import "./blocks/index.js";
import initWorkspace from "./workspace/workspaceInit.js";
import uploadCode from "./upload/uploadCode.js";
import Navbar from "./components/navbar.js";

export default function App() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  const [codeOutput, setCodeOutput] = useState(
    "// Generated code will appear here"
  );
  const [selectedBoard, setSelectedBoard] = useState("arduino:avr:uno");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadConsole, setUploadConsole] = useState("");

  const toolboxXml = `
  <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
    <category name="LED Blocks" colour="
#D25D5D">
      <block type="blink_led"></block>
      <block type="turn_on_led"></block>
      <block type="blink_led_with_speed"></block>
    </category>
    <category name="Structure" colour="
#2196f3">
      <block type="setup_and_loop"></block>
      <block type="arduino_setup"></block>
      <block type="arduino_loop"></block>
    </category>

     <category name="Servo" colour="#4caf50">
      <block type="servo_read"></block>
            <block type="servo_move"></block>

      <block type="servo_write"></block>
      <block type="servo_rotate_microseconds" x="50" y="50">
        <field name="PIN">2</field>
        <value name="MICROS">
          <block type="math_number">
        <field name="NUM">1500</field>
      </block>
    </value>
  </block>
      <block type="servo_detach"></block>
      <block type="servo_attach"></block>
      <block type="set_pwm_servo"></block>
    </category>
    <category name="Control" colour="#9C27B0">
      <block type="custom_if_then"></block>
      <block type="repeat_while"></block>
      <block type="repeat_times">
        <value name="TIMES">
          <block type="math_number">
            <field name="NUM">2</field>
          </block>
        </value>
      </block>
<block type="repeat_for">
  <value name="START">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
  </value>
  <value name="END">
    <block type="math_number">
      <field name="NUM">10</field>
    </block>
  </value>
  <value name="STEP">
    <block type="math_number">
      <field name="NUM">1</field>
    </block>
  </value>
</block>
<block type="switch_case" x="50" y="50"></block>
<block type="exit_loop"></block>
<block type="bitwise_operator"></block>
<block type="bitwise_not"></block>
<block type="null_value"></block>
</category>

    <category name="Operators" colour="#B9375D">
            <block type="math_number"></block>
              <block type="field_angle"></block>
              <block type="pin_number"></block>
              <block type="math_operator"></block>
              <block type="comparison_operator"></block>
              <block type="nested_comparison_operator"></block>
              <block type="map_function">
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">100</field>
            </block>
          </value>
          <value name="FROM_LOW">
            <block type="math_number">
              <field name="NUM">0</field>
            </block>
          </value>
          <value name="FROM_HIGH">
            <block type="math_number">
              <field name="NUM">1023</field>
            </block>
          </value>
          <value name="TO_LOW">
            <block type="math_number">
              <field name="NUM">0</field>
            </block>
          </value>
          <value name="TO_HIGH">
            <block type="math_number">
              <field name="NUM">10</field>
            </block>
          </value>
        </block>
              <block type="math_remainder"></block>
              <block type="random_int_block">
          <value name="FROM">
            <block type="math_number">
              <field name="NUM">10</field>
            </block>
          </value>
          <value name="TO">
            <block type="math_number">
              <field name="NUM">99</field>
            </block>
          </value>
        </block>

        <block type="constrain_block">
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">150</field>
            </block>
          </value>
          <value name="LOW">
            <block type="math_number">
              <field name="NUM">0</field>
            </block>
          </value>
          <value name="HIGH">
            <block type="math_number">
              <field name="NUM">100</field>
            </block>
          </value>
        </block>
        <block type="math_sqrt_or_abs"></block>
        <block type="math_rounding"></block>
        <block type="math_tri"></block>
        <block type="math_constants"></block>
        <block type="math_number_property"></block>
        <block type="math_byte"></block>
        <block type="unsigned_int"></block>
        <block type="int_block"></block>
        <block type="float_block"></block>
</category>
<category name="Text" colour="#FFBC4C">
<block type="string_literal"></block>
<block type="empty_string"></block>
<block type="serial_print"></block>
<block type="char_literal"></block>
<block type="string_empty_constructor"></block>
<block type="string_concat"></block>
<block type="string_length"></block>
<block type="string_is_empty"></block>
<block type="string_index_of_dropdown"></block>
<block type="string_index"></block>
<block type="string_substring"></block>
<block type="string_trim"></block>
<block type="string_append_variable"></block>
<block type="string_case_convert"></block>
<block type="string_with_length">
<value name="LEN">
<block type="math_number">
<field name="NUM">5</field>
</block>
</value>
</category>
<category name="Functions" colour="290">
  <block type="arduino_do"></block>
    <block type="arduino_function_return"></block>
        <block type="arduino_return"></block>


</category>
<category name="Variables" colour="30">
  <block type="declare_variable"></block>
  <block type="set_variable"></block>
  <block type="change_variable"></block>
  <block type="declare_constant"></block>
  <block type="set_constant"></block>
  <block type="get_variable"></block>
</category>
<category name="Arrays" colour="100">
  <block type="array_set"></block>
  <block type="array_set_element"></block>
  <block type="array_put_element"></block>

  <block type="array_get_element"></block>
  <block type="array_size"></block>
  <block type="list_create_with"></block>
  <block type="list_set_element"></block>
  <block type="list_get_element"></block>
  <block type="array_add_element"></block>
    <block type="size_of"></block>
</category>
<category name="Communicate" colour="#567568">
    <category name="USB Serial" colour="#567568">
    <block type="serial_begin">
      <field name="BAUD">19200</field>
    </block>
        <block type="serial_available"></block>
        <block type="serial_read"></block>
        <block type="serial_readstring"></block>
        <block type="serial_parsefloat"></block>
        <block type="usbserial_print">
         <value name="VALUE">
            <block type="math_number">
              <field name="NUM">10</field>
            </block>
        </block>
        <block type="serial_print_same_line">
  <field name="METHOD">PRINTLN</field>
  <value name="VALUE">
    <block type="text">
      <field name="TEXT">Hello Blockly!</field>
    </block>
  </value>
</block>
<block type="serial_print_diff_line">
  <field name="METHOD">PRINTLN</field>
  <value name="VALUE">
    <block type="text">
      <field name="TEXT">Hello Blockly!</field>
    </block>
  </value>
</block>
<block type="serial_write">
  <field name="METHOD">PRINTLN</field>
  <value name="VALUE">
    <block type="text">
      <field name="TEXT">A</field>
    </block>
  </value>
</block>
</category>
<category name="Software Serial" colour="#567568">
  <block type="software_serial_setup"></block>
  <block type="software_serial_available"></block>
  <block type="software_serial_read"></block>
  <block type="serial_read_string"></block>
  <block type="serial_read_float"></block>
  <block type="software_serial_print">
  <value name="VALUE">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
  </value>
  <field name="FORMAT">DEC</field>
</block>
<block type="software_serial_print_text">
  <value name="VALUE">
    <block type="text">
      <field name="TEXT">Hello World</field>
    </block>
  </value>
</block>
<block type="software_serial_print_newline_text">
  <value name="VALUE">
    <block type="text">
      <field name="TEXT">Hello World</field>
    </block>
  </value>
</block>
<block type="software_serial_print_write">
  <value name="VALUE">
    <block type="text">
      <field name="TEXT">A</field>
    </block>
  </value>
</block>




</category>
<category name="Bluetooth" colour="#567568"></category>
<category name="Remote Control" colour="#567568"></category>



</category>


  </xml>
`;

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("blocklyDiv.current:", blocklyDiv.current);
    console.log("workspaceRef.current:", workspaceRef.current);

    if (!workspaceRef.current && blocklyDiv.current) {
      console.log("Initializing workspace...");
      try {
        workspaceRef.current = initWorkspace(
          blocklyDiv.current,
          toolboxXml,
          arduinoGenerator,
          setCodeOutput
        );
        console.log("Workspace initialized:", workspaceRef.current);
      } catch (error) {
        console.error("Error initializing workspace:", error);
      }
    }

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, [toolboxXml]);

  // const handleGenerateCode = () => {
  //   if (workspaceRef.current) {
  //     const code = arduinoGenerator.workspaceToCode(workspaceRef.current);
  //     setCodeOutput(code || "// No blocks in workspace.");
  //   }
  // };

  const handleUploadCode = () => {
    if (workspaceRef.current) {
      uploadCode(
        workspaceRef.current,
        arduinoGenerator,
        setUploadProgress,
        setUploadStatus,
        setUploadConsole,
        selectedBoard,
        setCodeOutput
      );
    }
  };

  return (
    <div className="App">
      <Navbar
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
      />

      <div className="main-container">
        <div ref={blocklyDiv} id="blocklyDiv" />

        <div className="right-panel">
          <div className="code-container">
            <div className="button-group">
              {/* <button onClick={handleGenerateCode}>Generate Code</button> */}
              <button onClick={handleUploadCode}>Upload Code</button>
            </div>

            <pre className="code-output">{codeOutput}</pre>

            <div className="upload-status">{uploadStatus}</div>

            <div className="upload-progress">
              <div
                className="upload-progress-bar"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>

            <pre id="uploadConsole">{uploadConsole}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
