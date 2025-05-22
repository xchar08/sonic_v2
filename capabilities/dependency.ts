const { ipcMain } = require('electron');
import { exec } from 'child_process';
import { promisify } from 'util';
const execPromise = promisify(exec);

export default {
  api: ['install'],
  sonarProfile: '# Dependency management',
  handler() {
    ipcMain.handle('dependency:install', async (_event: any, params: { package: string }) => {
      await execPromise(`npm install ${params.package}`);
      return { success: true };
    });
  },
};