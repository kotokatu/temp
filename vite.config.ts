import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const layers = ['app', 'entities', 'features', 'pages', 'shared', 'widgets'];
const aliases = layers.reduce((acc, item) => {
  return { ...acc, [item]: resolve(__dirname, 'src', item) };
}, {});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { ...aliases } },
});
