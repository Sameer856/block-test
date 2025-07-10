# Arduino Block IDE

A visual programming environment for Arduino using Google's Blockly library. Create Arduino code by dragging and dropping blocks, then upload directly to your board.

## Features

- 🧱 **Visual Programming**: Drag-and-drop interface using Blockly
- ⚡ **Real-time Code Generation**: Generate Arduino code instantly
- 📤 **Direct Upload**: Upload code directly to Arduino boards
- 🎯 **Multiple Board Support**: Uno, Mega, Nano, ESP32
- 🎨 **Modern UI**: Clean, responsive interface with progress tracking

## Project Structure

```
arduino-block-ide/
├── backend/
│   └── upload.js               # Node.js backend for code upload
├── blink/
│   └── blink.ino               # Generated Arduino sketch
├── frontend/
│   └── index.html              # Blockly UI interface
├── package.json                # Node.js dependencies
└── README.md                   # This file
```

## Prerequisites

- **Node.js** (v14 or higher)
- **Arduino CLI** installed and configured
- **Arduino board** connected via USB

### Installing Arduino CLI

```bash
# macOS
brew install arduino-cli

# Linux
curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh

# Windows
# Download from: https://github.com/arduino/arduino-cli/releases
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:8080`

## Usage

1. **Select your board** from the dropdown menu
2. **Drag blocks** from the toolbox to create your program
3. **Click "Generate Code"** to see the Arduino code
4. **Click "Upload to Arduino"** to compile and upload to your board

## Supported Boards

- Arduino Uno
- Arduino Mega
- Arduino Nano (Old Bootloader)
- ESP32 Dev Module

## Development

- **Backend**: Express.js server on port 3000
- **Frontend**: Static HTML with Blockly on port 8080
- **Upload**: Uses Arduino CLI for compilation and upload

## Troubleshooting

- **No USB device found**: Make sure your Arduino is connected and drivers are installed
- **Upload failed**: Check board selection and USB connection
- **Compilation errors**: Verify Arduino CLI installation and board type

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own Arduino projects!
