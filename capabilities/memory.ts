const { ipcMain } = require('electron');
import { createClient } from '@supabase/supabase-js';

export default {
  api: ['logEvent', 'retrieveMemories'],
  sonarProfile: '# Memory management with Supabase',
  handler() {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
    ipcMain.handle('memory:logEvent', async (_event: any, params: { tag: string; data: any }) => {
      await supabase.from('memories').insert([{ tag: params.tag, data: params.data }]);
      return { success: true };
    });
    ipcMain.handle('memory:retrieveMemories', async (_event: any, params: { query: string }) => {
      const { data } = await supabase.from('memories').select('*').textSearch('data', params.query);
      return { success: true, memories: data };
    });
  },
};