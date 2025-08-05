# macOS Build - Quick Reference

## 🚀 Quick Build Commands

### Complete Build (Recommended)
```bash
npm run dist
```

### Step-by-Step Build
```bash
# 1. Build frontend
npm run build

# 2. Create macOS package
npx electron-builder
```

### Development
```bash
# Start dev environment
npm run dev

# Test built app
npm run electron
```

## 🔧 Common Fixes

### Fix react-scripts Error
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..
```

### Clean Build
```bash
rm -rf dist/ frontend/build/
npm run dist
```

### Fix Permissions
```bash
sudo chown -R $(whoami) ~/.npm
```

## 📁 Build Output
- **Installer**: `dist/ArduinoBlockIDE-1.0.0-arm64.dmg`
- **App Bundle**: `dist/mac-arm64/ArduinoBlockIDE.app/`

## 🎯 Target
- **Architecture**: ARM64 (Apple Silicon)
- **Format**: DMG installer
- **Category**: Developer Tools

---
📖 **Full Documentation**: [BUILD_MAC.md](./BUILD_MAC.md)