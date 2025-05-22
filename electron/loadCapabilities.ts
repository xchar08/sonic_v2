// electron/loadCapabilities.ts

import fs from 'fs/promises';
import path from 'path';

export default async function loadCapabilities() {
  const capabilitiesDir = path.join(__dirname, '../capabilities');
  const files = await fs.readdir(capabilitiesDir);
  for (const file of files) {
    if (file.endsWith('.ts')) {
      const capability = (await import(path.join(capabilitiesDir, file))).default;
      capability.handler(require('electron').ipcMain);
    }
  }
}