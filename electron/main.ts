// electron/main.ts
const { app, BrowserWindow } = require('electron');
const path = require('path'); // Change this
const isDev = require('electron-is-dev'); // Change this
const loadCapabilities = require('./loadCapabilities').default; // Adjust if loadCapabilities is default export

// If loadCapabilities is a named export, it would be:
// const { loadCapabilities } = require('./loadCapabilities');
// You'll need to check how loadCapabilities.ts exports its function.
// For now, assuming it's a default export based on 'import loadCapabilities from...'

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