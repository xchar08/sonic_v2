const { ipcMain } = require('electron');
import robot from 'robotjs';

export default {
  api: ['typeText'],
  sonarProfile: '# Keyboard control actions',
  handler() {
    ipcMain.handle('keyboard:typeText', async (_event: any, params: { text: string }) => {
      robot.typeString(params.text);
      robot.keyTap('enter');
      return { success: true };
    });
  },
};