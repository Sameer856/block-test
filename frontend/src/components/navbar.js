import React from "react";
import "../styles/navbar.css";

const Navbar = ({
  selectedBoard,
  setSelectedBoard,
  onSaveProject,
  onLoadProject,
  onExportCode,
}) => {
  const boards = [
    { label: "Arduino Uno", value: "arduino:avr:uno" },
    { label: "Arduino Mega", value: "arduino:avr:mega" },
    { label: "Arduino Nano", value: "arduino:avr:nano:cpu=atmega328old" },
    { label: "ESP32 Dev Module", value: "esp32:esp32:esp32" },
  ];

  const handleChange = (e) => {
    setSelectedBoard(e.target.value); // Will be fqbn like "esp32:esp32:esp32dev"
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">🔗 MyArduino Blockly IDE</div>

      <div className="navbar-board-select">
        <label htmlFor="board-select">Board: </label>
        <select id="board-select" value={selectedBoard} onChange={handleChange}>
          {boards.map((board) => (
            <option key={board.value} value={board.value}>
              {board.label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
