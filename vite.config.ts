import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const layers = [
  'app',
  'entities',
  'features',
  'pages',
  'shared',
  'widgets',
  'tests',
];
const aliases = layers.reduce((acc, item) => {
  return { ...acc, [item]: resolve('src', item) };
}, {});

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: { alias: { ...aliases } },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      all: true,
      exclude: ['**/*.type.*'],
    },
    setupFiles: './src/tests/vitest-setup.ts',
  },
});
