// electron/loadCapabilities.cts
export {}; // Explicitly make this file a module

const fs = require('fs').promises;
import path from 'path';
const { app } = require('electron');

module.exports = async function loadCapabilities() {
  // Resolve capabilities directory based on packaged or dev mode
  const capabilitiesDir = app.isPackaged
    ? path.join(process.resourcesPath, 'capabilities') // Packaged mode
    : path.join(__dirname, '../../capabilities'); // Dev mode

  console.log('Capabilities directory:', capabilitiesDir); // Debug path

  try {
    const files = await fs.readdir(capabilitiesDir);
    for (const file of files) {
      if (file.endsWith('.js')) {
        const capabilityPath = path.join(capabilitiesDir, file);
        let capabilityModule;
        try {
          // Use dynamic import for ESM or CommonJS modules
          capabilityModule = (await import(capabilityPath)).default;
        } catch (error) {
          console.error(`Error loading capability from ${capabilityPath}:`, error);
          continue;
        }

        if (capabilityModule && typeof capabilityModule.handler === 'function') {
          const { ipcMain } = require('electron');
          capabilityModule.handler(ipcMain);
        } else {
          console.warn(`Capability file ${file} does not export a default handler function or handler is not a function.`);
        }
      }
    }
  } catch (error) {
    console.error('Error reading capabilities directory:', error);
  }
};