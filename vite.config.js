import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // ✅ Cloudflare Pages serves from this directory
    emptyOutDir: true, // Clears old builds before a new build
    rollupOptions: {
      input: "index.html", // ✅ Ensures index.html is included in the build
    },
  },
  server: {
    open: true, // Opens in browser on local dev
    port: 3000, // Port for local dev
  },
  resolve: {
    alias: {
      "@": "/src", // ✅ Allows imports like "@/components/TripDashboard"
    },
  },
  define: {
    "process.env": {}, // ✅ Prevents errors from missing env variables
  },
});
