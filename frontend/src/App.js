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
#f44336">
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
    <category name="Servo" colour="
#4caf50">
      <block type="servo_read"></block>
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
