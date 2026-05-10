import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('test'),
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});
