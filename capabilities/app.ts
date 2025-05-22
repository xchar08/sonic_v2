const { app, BrowserWindow, ipcMain } = require('electron');

export default {
  api: ['openApp', 'closeApp'],
  sonarProfile: '# Application and window management',
  handler() {
    ipcMain.handle('app:openApp', async (_event: any, params: { appName: string }) => {
      // Platform-specific app launching (simplified example)
      const { exec } = require('child_process');
      exec(params.appName === 'notepad' ? 'notepad' : params.appName);
      return { success: true };
    });
    ipcMain.handle('app:closeApp', async (_event: any) => {
      const win = BrowserWindow.getFocusedWindow();
      if (win) win.close();
      return { success: true };
    });
  },
};