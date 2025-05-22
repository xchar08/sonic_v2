const { ipcMain } = require('electron');
import robot from 'robotjs';

export default {
  api: ['click', 'move'],
  sonarProfile: '# Mouse control actions',
  handler() {
    ipcMain.handle('mouse:click', async (_event: any, params: { x: number; y: number }) => {
      robot.moveMouse(params.x, params.y);
      robot.mouseClick();
      return { success: true };
    });
    ipcMain.handle('mouse:move', async (_event: any, params: { x: number; y: number }) => {
      robot.moveMouse(params.x, params.y);
      return { success: true };
    });
  },
};