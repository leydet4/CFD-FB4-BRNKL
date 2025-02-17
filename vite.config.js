import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',      // Ensure Vite looks at the correct root
  publicDir: 'public', // Ensures public assets like index.html are found
  build: {
    outDir: 'dist', // This is where the build output will go
  },
});
