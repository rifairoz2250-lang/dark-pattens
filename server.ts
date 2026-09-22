import express from 'express';
import path from 'path';
import 'dotenv/config';
import { analyzeScreenshotWithGemini } from './server/analyzer.ts';

const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/api/analyze', async (req, res) => {
  try {
    const { base64Data, mimeType, websiteNameOrUrl, userConcern } = req.body;
    const result = await analyzeScreenshotWithGemini(
      base64Data,
      mimeType || 'image/png',
      websiteNameOrUrl,
      userConcern
    );
    res.json(result);
  } catch (err: any) {
    console.error('Analysis error:', err);
    res.status(500).json({ error: err?.message || 'Server analysis failed' });
  }
});

// In production, serve built static files from dist/
const distPath = path.resolve('dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`BetYouPay server running on port ${PORT}`);
});
