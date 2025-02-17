import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",  
  publicDir: "public", // Ensure it looks in the right place
  build: {
    outDir: "dist",
    emptyOutDir: true, // ✅ Ensures clean build
    rollupOptions: {
      input: "public/index.html", // 👈 Explicitly set entry point
    },
  },
});
