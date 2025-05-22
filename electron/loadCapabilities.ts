// electron/loadCapabilities.ts
export {}; // Explicitly make this file a module

// Use CommonJS require for built-in Node.js modules
const fs = require('fs').promises;
const path = require('path');

module.exports = async function loadCapabilities() {
  const capabilitiesDir = path.join(__dirname, '../capabilities');
  const files = await fs.readdir(capabilitiesDir);
  for (const file of files) {
    if (file.endsWith('.js')) { // Ensure we only try to load compiled .js files
      const capabilityPath = path.join(capabilitiesDir, file);
      let capabilityModule;
      try {
        // Use synchronous require for dynamically loading compiled CommonJS modules
        capabilityModule = require(capabilityPath);

        // If the capability file uses 'export default', access it via .default after compilation
        if (capabilityModule && typeof capabilityModule === 'object' && 'default' in capabilityModule) {
            capabilityModule = capabilityModule.default;
        }

      } catch (error) {
        console.error(`Error loading capability from ${capabilityPath}:`, error);
        continue;
      }

      if (capabilityModule && typeof capabilityModule.handler === 'function') {
        const { ipcMain } = require('electron'); // This is fine
        capabilityModule.handler(ipcMain);
      } else {
        console.warn(`Capability file ${file} does not export a default handler function or handler is not a function.`);
      }
    }
  }
};