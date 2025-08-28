import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  plugins: [
    react({
      babel: {
        plugins: [
          // Remove console logs in production
          process.env.NODE_ENV === 'production' && ['transform-remove-console', { exclude: ['error', 'warn'] }]
        ].filter(Boolean)
      }
    }),
    splitVendorChunkPlugin()
  ],
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'framer-motion'],
          utils: ['clsx', 'tailwind-merge']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@supabase/supabase-js'],
    exclude: ['lucide-react', 'framer-motion'],
    force: true
  },
  esbuild: {
    target: 'es2015',
    minify: true,
    treeShaking: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});