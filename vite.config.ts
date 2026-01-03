import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3002,
      host: '0.0.0.0',
      strictPort: false,
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.JULES_API_KEY': JSON.stringify(env.JULES_API_KEY),
      'import.meta.env.VITE_JULES_API_KEY': JSON.stringify(env.JULES_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    build: {
      // Minification voor productie
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Verwijder console.log in productie
          drop_debugger: true,
        },
      },
      // Code splitting voor betere caching
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['lucide-react'],
            'three-vendor': ['three'],
          },
        },
      },
      // Chunk size warnings verhogen
      chunkSizeWarningLimit: 1000,
      // Source maps voor productie (optioneel, kan uit voor betere performance)
      sourcemap: false,
    },
    // Performance optimalisaties
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./test/setup.ts'],
      include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      coverage: {
        reporter: ['text', 'json', 'html'],
      },
    },
  };
});
