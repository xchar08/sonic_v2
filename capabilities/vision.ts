const { ipcMain, desktopCapturer } = require('electron');
import Tesseract from 'tesseract.js';
import { Cerebras } from '@cerebras/cerebras_cloud_sdk';

export default {
  api: ['captureScreen', 'captureCamera', 'parseDiagram'],
  sonarProfile: '# Vision processing actions',
  handler() {
    ipcMain.handle('vision:captureScreen', async () => {
      const sources = await desktopCapturer.getSources({ types: ['screen'] });
      return { success: true, data: sources[0].thumbnail.toPNG() };
    });
    ipcMain.handle('vision:captureCamera', async () => {
      // Camera capture handled in renderer (navigator.mediaDevices.getUserMedia)
      return { success: true };
    });
    ipcMain.handle('vision:parseDiagram', async (_event: any, params: { image: string }) => {
      const ocrResult = await Tesseract.recognize(params.image, 'eng');
      const client = new Cerebras({ apiKey: process.env.CEREBRAS_API_KEY });
      const diagramResult = await client.chat.completions.create({
        model: 'llama3.1-8b',
        messages: [{ role: 'user', content: `Parse diagram from OCR: ${ocrResult.data.text}` }],
      });
      const choices = (diagramResult as { choices: { message: { content: string } }[] }).choices;
      return { success: true, ocr: ocrResult.data.text, diagram: choices[0].message.content };
    });
  },
};