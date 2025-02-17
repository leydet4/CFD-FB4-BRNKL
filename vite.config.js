import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Root directory
  publicDir: "public", // Ensure Vite finds `index.html`
  build: {
    outDir: "dist", // Build output goes into `dist/`
    emptyOutDir: true, // Clears old build files before creating new ones
  },
  server: {
    port: 5173, // Default Vite port
    open: true, // Opens the app automatically
  },
});
