const { ipcMain } = require('electron');
import { exec } from 'child_process';

export default {
  api: ['play', 'pause'],
  sonarProfile: '# Media playback control',
  handler() {
    ipcMain.handle('media:play', async () => {
      // Example: macOS media play command
      exec('osascript -e \'tell application "Spotify" to play\'');
      return { success: true };
    });
    ipcMain.handle('media:pause', async () => {
      exec('osascript -e \'tell application "Spotify" to pause\'');
      return { success: true };
    });
  },
};