const { BrowserWindow, ipcMain } = require('electron');

export default {
  api: ['navigate', 'openTab'],
  sonarProfile: '# Browser control actions',
  handler() {
    ipcMain.handle('browser:navigate', async (_event: any, params: { url: string }) => {
      const win = BrowserWindow.getFocusedWindow();
      if (win) win.loadURL(params.url);
      return { success: true };
    });
    ipcMain.handle('browser:openTab', async (_event: any, params: { url: string }) => {
      const win = new BrowserWindow({ width: 800, height: 600 });
      win.loadURL(params.url);
      return { success: true };
    });
  },
};