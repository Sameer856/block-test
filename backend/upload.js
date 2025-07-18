const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/upload', (req, res) => {
  console.log("=== DEBUG INFO ===");
  console.log("Available USB ports:", 
    fs.readdirSync('/dev').filter(name => name.startsWith('cu.usb')));
  const code = req.body.code;
  let boardType = req.body.board;

  if (!boardType) boardType = 'arduino:avr:uno';
  if (boardType === 'arduino:avr:nano') {
    boardType = 'arduino:avr:nano:cpu=atmega328old'; // fix for CH340-based Nano clones
  }

  if (!code) return res.status(400).send('Missing code');
  fs.writeFileSync('blink/blink.ino', code);

  // ✅ Scan for /dev/cu.usb* serial devices (CH340, CP210x, ESP32, etc.)
  const usbPorts = fs.readdirSync('/dev').filter(name => name.startsWith('cu.usb'));
  if (usbPorts.length === 0) {
    return res.status(500).send('❌ No USB serial device found (Is your board plugged in?)');
  }

  const port = `/dev/${usbPorts[0]}`;
  console.log(`✅ Using serial port: ${port}`);

  const compile = `arduino-cli compile --fqbn ${boardType} blink`;
  const upload = `arduino-cli upload -p ${port} --fqbn ${boardType} blink`;

  exec(`${compile} && ${upload}`, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

app.listen(3001, () => console.log('✅ IDE backend running at http://localhost:3001'));
