import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import 'dotenv/config';
import { analyzeScreenshotWithGemini } from './server/analyzer.ts';

function apiPlugin(): Plugin {
  return {
    name: 'api-server',
    configureServer(server) {
      server.middlewares.use('/api/analyze', async (req, res, next) => {
        if (req.method !== 'POST') return next();
        const chunks: Buffer[] = [];
        req.on('data', chunk => chunks.push(Buffer.from(chunk)));
        req.on('end', async () => {
          try {
            const raw = Buffer.concat(chunks).toString('utf-8');
            const body = JSON.parse(raw);
            const { base64Data, mimeType, websiteNameOrUrl, userConcern } = body;
            const result = await analyzeScreenshotWithGemini(
              base64Data,
              mimeType || 'image/png',
              websiteNameOrUrl,
              userConcern
            );
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          } catch (err: any) {
            console.error('API Error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err?.message || 'Analysis failed' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
