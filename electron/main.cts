// electron/main.cts
export {}; // Explicitly make this file a module

const { app, BrowserWindow } = require('electron');
import path from 'path';

let isDev: boolean = false;

async function initializeIsDev() {
  try {
    // Use app.isPackaged to determine dev mode
    isDev = !app.isPackaged || process.env.NODE_ENV === 'development';
    console.log('isDev set to:', isDev);
  } catch (error) {
    console.error('Error determining isDev:', error);
    isDev = false;
  }
}

const loadCapabilities = require('./loadCapabilities.cjs');

(async () => {
  await initializeIsDev();

  app.on('ready', () => {
    const mainWindow = new BrowserWindow({
      width: 1280,
      height: 800,
      frame: false,
      transparent: true,
      backgroundColor: '#00000000',
      webPreferences: {
        preload: path.join(__dirname, 'preload.cjs'),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    // Adjust path for production mode
    const loadUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../out/index.html')}`;
    console.log('Loading URL:', loadUrl);
    mainWindow.loadURL(loadUrl);

    loadCapabilities();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
})();