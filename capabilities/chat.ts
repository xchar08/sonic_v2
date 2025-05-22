const { ipcMain } = require('electron');
import axios from 'axios';

export default {
  api: ['analyzeChat'],
  sonarProfile: '# Chat transcript analysis with Perplexity',
  handler() {
    ipcMain.handle('chat:analyzeChat', async (_event: any, params: { transcript: string }) => {
      const response = await axios.post(
        'https://api.perplexity.ai/chat/completions',
        {
          model: 'sonar',
          messages: [{ role: 'user', content: `Analyze: ${params.transcript}` }],
        },
        { headers: { Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}` } }
      );
      return { success: true, analysis: response.data.choices[0].message.content };
    });
  },
};