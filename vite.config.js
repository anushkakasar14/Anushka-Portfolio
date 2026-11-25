import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Dev-only: serve /api/* with the same Vercel function files, so the contact
 * form works under `npm run dev`. In production Vercel runs /api natively.
 * Adapts Node's req/res to the small subset of Vercel's helpers we use.
 */
function devApi() {
  return {
    name: 'dev-vercel-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        let raw = '';
        for await (const chunk of req) raw += chunk;
        let parsed;
        let malformed = false;
        try {
          parsed = raw ? JSON.parse(raw) : undefined;
        } catch {
          malformed = true;
        }
        Object.defineProperty(req, 'body', {
          get() {
            if (malformed) throw new SyntaxError('Invalid JSON body');
            return parsed;
          },
        });
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (obj) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(obj));
          return res;
        };
        const { default: handler } = await server.ssrLoadModule('/api/contact.js');
        await handler(req, res);
      });
    },
  };
}

export default defineConfig(({ command, mode }) => {
  // Make server-only secrets from .env.local (e.g. RESEND_API_KEY) visible to
  // the dev API. Only VITE_* variables are ever exposed to browser code.
  if (command === 'serve') Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react(), devApi()],
    build: {
      target: 'es2019',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
  };
});
