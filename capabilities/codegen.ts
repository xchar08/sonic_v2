const { ipcMain } = require('electron');
import { Cerebras } from '@cerebras/cerebras_cloud_sdk';

export default {
  api: ['generateCode'],
  sonarProfile: '# Code generation with Cerebras',
  handler() {
    ipcMain.handle('custom-code:generateCode', async (_event: any, params: { spec: string }) => {
      const client = new Cerebras({ apiKey: process.env.CEREBRAS_API_KEY });
      const response = await client.chat.completions.create({
        model: 'llama3.1-8b',
        messages: [{ role: 'user', content: `Generate code: ${params.spec}` }],
      });
      const choices = (response as { choices: { message: { content: string } }[] }).choices;
      return { success: true, code: choices[0].message.content };
    });
  },
};