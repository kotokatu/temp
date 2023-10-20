import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...['app', 'entities', 'features', 'pages', 'shared', 'widgets'].reduce((acc, item) => {
        return { ...acc, [item]: resolve(__dirname, 'src', item) };
      }, {}),
    },
  },
});
