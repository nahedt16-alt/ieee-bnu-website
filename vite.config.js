import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    // The 3D scene (three.js) is loaded lazily in its own chunk, so it is
    // expected to be larger than the default warning limit.
    chunkSizeWarningLimit: 1500,
  },
});
