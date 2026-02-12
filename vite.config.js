import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',   // directorio de build que Vercel usará
  },
  base: './',         // importante para URL temporal
});