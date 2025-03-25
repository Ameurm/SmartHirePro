import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    headers: {
      'Content-Type': 'application/javascript',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*',
    },
    middleware: (req, res, next) => {
      if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      next();
    },
  },
  build: {
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash][extname]',
      },
    },
    commonjsOptions: {
      include: [/compromise/, /node_modules/],
    },
    target: 'esnext',
    modulePreload: true,
  },
  optimizeDeps: {
    include: ['compromise'],
    exclude: ['lucide-react'],
  },
});
