import React, { useState } from "react";
import "../styles/navbar.css";

const Navbar = ({
  selectedBoard,
  setSelectedBoard,
  onSaveProject,
  onLoadProject,
  onExportCode,
}) => {
  const boards = [
    "Arduino Uno",
    "Arduino Mega",
    "Arduino Nano",
    "ESP32 Dev Module",
  ];

  const handleChange = (e) => {
    setSelectedBoard(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">🔗 MyArduino Blockly IDE</div>

      <div className="navbar-board-select">
        <label htmlFor="board-select">Board: </label>
        <select id="board-select" value={selectedBoard} onChange={handleChange}>
          {boards.map((board) => (
            <option key={board} value={board}>
              {board}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
