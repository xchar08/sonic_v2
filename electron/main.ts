// electron/main.ts
export {}; // Explicitly make this file a module

const { app, BrowserWindow } = require('electron');
const path = require('path');

// Dynamic import for electron-is-dev as it's an ESM module
let isDev: boolean;
async function initializeIsDev() {
  const electronIsDev = await import('electron-is-dev');
  isDev = electronIsDev.default; // electron-is-dev exports 'default'
}

// loadCapabilities is a CommonJS module we require
const loadCapabilities = require('./loadCapabilities'); // No .default needed here for CommonJS output

// Main execution logic wrapped in an async IIFE to await initializeIsDev()
(async () => {
  await initializeIsDev(); // Ensure isDev is ready before app.on('ready')

  app.on('ready', () => {
    const mainWindow = new BrowserWindow({
      width: 1280,
      height: 800,
      frame: false,
      transparent: true,
      backgroundColor: '#00000000',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });
    mainWindow.loadURL(
      isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../out/index.html')}`
    );
    loadCapabilities(); // Register capability handlers
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
})();