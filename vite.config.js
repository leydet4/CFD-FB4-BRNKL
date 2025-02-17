import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Ensure Vite knows the root folder
  publicDir: "public", // Ensure Vite knows where index.html is
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "public/index.html", // Ensure correct entry point
    },
  },
  server: {
    port: 3000, // Optional: Run dev server on port 3000
  },
});
