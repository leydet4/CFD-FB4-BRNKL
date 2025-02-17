import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Ensure Vite finds index.html
  publicDir: "public", // Explicitly set the public directory
  build: {
    outDir: "dist", // Cloudflare Pages will serve from this directory
    emptyOutDir: true,
    rollupOptions: {
      input: "public/index.html", // Ensure Vite includes index.html
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {
    "process.env": {}, // Prevent missing env variable errors
  },
});
