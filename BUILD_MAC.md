# macOS Package Building Guide

## Arduino Block IDE - macOS Distribution Build Process

This guide provides comprehensive instructions for building and distributing the Arduino Block IDE as a macOS application (.dmg installer).

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Build Configuration](#build-configuration)
- [Build Process](#build-process)
- [Troubleshooting](#troubleshooting)
- [Distribution](#distribution)
- [Development Workflow](#development-workflow)

## Prerequisites

### System Requirements
- **macOS**: 10.15 (Catalina) or later
- **Architecture**: Apple Silicon (ARM64) - current build target
- **Xcode Command Line Tools**: Required for native module compilation
- **Node.js**: v16.x or later (LTS recommended)
- **npm**: v8.x or later

### Install Dependencies
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Verify Node.js and npm versions
node --version  # Should be v16+
npm --version   # Should be v8+
```

## Project Structure

```
arduino-block-ide/
├── frontend/                 # React application
│   ├── src/                 # React source code
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── build/               # Built React app (generated)
├── backend/                 # Express.js server
│   ├── upload.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── node_modules/       # Backend dependencies
├── electron/               # Electron main process
│   ├── main.js            # Electron entry point
│   ├── cli/               # Arduino CLI binaries
│   └── node/              # Node.js runtime
├── assets/                # Build resources (icons, etc.)
├── dist/                  # Built packages (generated)
└── package.json          # Main build configuration
```

## Build Configuration

### electron-builder Configuration
Located in root `package.json` under the `"build"` key:

```json
{
  "build": {
    "appId": "com.robovision.arduinoide",
    "mac": {
      "category": "public.app-category.developer-tools",
      "target": [
        {
          "target": "dmg",
          "arch": ["arm64"]
        }
      ]
    },
    "dmg": {
      "format": "UDZO"
    },
    "directories": {
      "buildResources": "assets"
    },
    "files": [
      "frontend/build/**/*",
      "electron/**/*",
      "backend/**/*",
      "package.json"
    ],
    "extraResources": [
      {
        "from": "electron/cli",
        "to": "electron/cli"
      },
      {
        "from": "backend",
        "to": "backend"
      },
      {
        "from": "backend/node_modules",
        "to": "backend/node_modules"
      },
      {
        "from": "electron/node",
        "to": "node"
      }
    ]
  }
}
```

### Key Configuration Details
- **Target Architecture**: ARM64 (Apple Silicon)
- **Package Format**: DMG with UDZO compression
- **App Category**: Developer Tools
- **Bundle ID**: `com.robovision.arduinoide`

## Build Process

### Step 1: Environment Setup
```bash
# Clone/navigate to project directory
cd /path/to/arduino-block-ide

# Install root dependencies
npm install
```

### Step 2: Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Verify react-scripts is installed correctly
npm list react-scripts
# Should show: react-scripts@5.0.1
```

### Step 3: Backend Setup
```bash
# Navigate to backend directory
cd ../backend

# Install backend dependencies
npm install
```

### Step 4: Build Frontend
```bash
# From project root
npm run build

# This executes: cd frontend && npm run build
# Creates optimized React build in frontend/build/
```

### Step 5: Build macOS Package
```bash
# From project root
npm run dist

# This executes: npm run build && electron-builder
# Creates .dmg installer in dist/ directory
```

### Complete Build Command Sequence
```bash
# One-command build (recommended)
npm run dist

# Or step-by-step
npm run build
npx electron-builder
```

## Build Scripts Explained

### Available Scripts
- `npm start`: Start frontend development server
- `npm run build`: Build frontend for production
- `npm run electron`: Run Electron app in development
- `npm run dist`: Build complete macOS package
- `npm run dev`: Start both frontend and backend in development

### Build Artifacts
After successful build:
```
dist/
├── ArduinoBlockIDE-1.0.0-arm64.dmg    # macOS installer
├── ArduinoBlockIDE-1.0.0-arm64.dmg.blockmap
├── mac-arm64/                          # Unpacked app
│   └── ArduinoBlockIDE.app/
└── builder-debug.yml                   # Build debug info
```

## Troubleshooting

### Common Issues and Solutions

#### 1. "react-scripts: command not found"
**Problem**: Frontend dependencies not installed or corrupted
```bash
# Solution
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### 2. "electron-builder not found"
**Problem**: Build tools not installed
```bash
# Solution
npm install electron-builder --save-dev
# Or globally: npm install -g electron-builder
```

#### 3. Native Module Compilation Errors
**Problem**: Missing development tools
```bash
# Solution
xcode-select --install
npm rebuild
```

#### 4. Permission Denied Errors
**Problem**: Insufficient permissions for build tools
```bash
# Solution
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### 5. Arduino CLI Binary Not Found
**Problem**: Arduino CLI not properly bundled
```bash
# Verify Arduino CLI exists
ls -la electron/cli/arduino-cli
# Should show executable file

# Make executable if needed
chmod +x electron/cli/arduino-cli
```

#### 6. DMG Creation Failed
**Problem**: Disk space or permissions
```bash
# Check disk space
df -h

# Clean previous builds
rm -rf dist/
npm run dist
```

### Build Verification

#### Verify Successful Build
```bash
# Check build artifacts
ls -la dist/

# Verify DMG integrity
hdiutil verify dist/ArduinoBlockIDE-*.dmg

# Test installation
open dist/ArduinoBlockIDE-*.dmg
```

#### App Bundle Verification
```bash
# Check app bundle structure
ls -la dist/mac-arm64/ArduinoBlockIDE.app/Contents/

# Verify code signing (if configured)
codesign -dv --verbose=4 dist/mac-arm64/ArduinoBlockIDE.app

# Check app info
plutil -p dist/mac-arm64/ArduinoBlockIDE.app/Contents/Info.plist
```

## Distribution

### Code Signing (Optional but Recommended)
For distribution outside the Mac App Store:

1. **Get Developer Certificate**
   - Apple Developer Program membership required
   - Download "Developer ID Application" certificate

2. **Configure Code Signing**
   ```json
   {
     "build": {
       "mac": {
         "identity": "Developer ID Application: Your Name (XXXXXXXXXX)"
       }
     }
   }
   ```

3. **Notarization** (for macOS 10.15+)
   ```bash
   # Add to package.json build config
   "afterSign": "scripts/notarize.js"
   ```

### Distribution Checklist
- [ ] Test installation on clean macOS system
- [ ] Verify all features work in packaged app
- [ ] Check Arduino CLI functionality
- [ ] Test file permissions and access
- [ ] Validate code signing (if used)
- [ ] Document system requirements
- [ ] Create installation instructions

## Development Workflow

### Quick Development Build
```bash
# Start development environment
npm run dev

# In separate terminal, build for testing
npm run build
npm run electron
```

### Production Build Workflow
```bash
# 1. Clean previous builds
rm -rf dist/ frontend/build/

# 2. Fresh dependency install
cd frontend && npm ci && cd ..
cd backend && npm ci && cd ..

# 3. Build and package
npm run dist

# 4. Test built app
open dist/ArduinoBlockIDE-*.dmg
```

### Build Optimization

#### Reduce Bundle Size
- Remove unused dependencies
- Optimize assets in `assets/` directory
- Configure file exclusions in electron-builder

#### Build Performance
```bash
# Use npm ci for faster, reliable installs
npm ci

# Parallel builds (if multiple targets)
npx electron-builder --parallel
```

## Environment Variables

### Build Configuration
```bash
# Set build mode
export NODE_ENV=production

# Skip code signing (development)
export CSC_IDENTITY_AUTO_DISCOVERY=false

# Enable debug output
export DEBUG=electron-builder
```

### Custom Build Paths
```bash
# Custom output directory
export BUILD_DIR=custom-dist

# Custom electron cache
export ELECTRON_CACHE=~/.electron-cache
```

## Continuous Integration

### GitHub Actions Example
```yaml
name: Build macOS
on: [push, pull_request]

jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: cd frontend && npm ci
      - run: cd backend && npm ci
      - run: npm run dist
      - uses: actions/upload-artifact@v3
        with:
          name: ArduinoBlockIDE-macOS
          path: dist/*.dmg
```

---

## Support

For build issues:
1. Check this documentation first
2. Review electron-builder logs in `dist/builder-debug.yml`
3. Verify all dependencies are correctly installed
4. Test in clean environment

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Target Platform**: macOS (ARM64)