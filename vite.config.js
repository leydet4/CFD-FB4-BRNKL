import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // ✅ Ensures Cloudflare Pages serves from dist/
  },
  server: {
    open: true,
  },
});
