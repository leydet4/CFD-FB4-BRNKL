import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./",  // Ensure Vite finds the correct root directory
  build: {
    outDir: "dist",
  },
});
