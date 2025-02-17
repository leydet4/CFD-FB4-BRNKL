import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Ensures Vite starts from the correct directory
  publicDir: "public", // Ensures public assets like index.html are found
  build: {
    outDir: "dist", // Ensures built files go to the correct folder
    emptyOutDir: true, // Clears old files before building
  },
  server: {
    port: 5173, // Default Vite port (can be changed)
    open: true, // Opens the app in the browser automatically
  },
});
