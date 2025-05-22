const { ipcMain } = require('electron');
import { exec } from 'child_process';

export default {
  api: ['openEditor', 'writeCode'],
  sonarProfile: '# Code editor manipulation',
  handler() {
    ipcMain.handle('editor:openEditor', async (_event: any, params: { editor: string }) => {
      exec(params.editor === 'vscode' ? 'code .' : params.editor);
      return { success: true };
    });
    ipcMain.handle('editor:writeCode', async (_event: any, params: { code: string }) => {
      // Simulate writing code via keyboard input
      require('robotjs').typeString(params.code);
      return { success: true };
    });
  },
};