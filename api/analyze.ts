import { analyzeScreenshotWithGemini } from '../server/analyzer.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  try {
    const { base64Data, mimeType, websiteNameOrUrl, userConcern } = req.body || {};
    const result = await analyzeScreenshotWithGemini(
      base64Data,
      mimeType || 'image/png',
      websiteNameOrUrl,
      userConcern
    );
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(result));
  } catch (err: any) {
    console.error('Vercel API Analysis Error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: err?.message || 'Server analysis failed' }));
  }
}
