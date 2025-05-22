const { ipcMain } = require('electron');
import { createClient } from '@supabase/supabase-js';

export default {
  api: ['query'],
  sonarProfile: '# Database operations with Supabase',
  handler() {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
    ipcMain.handle('db:query', async (_event: any, params: { table: string; query: any }) => {
      const { data } = await supabase.from(params.table).select('*').match(params.query);
      return { success: true, data };
    });
  },
};