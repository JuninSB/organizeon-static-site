import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
  root: import.meta.dirname,
  base: "/d4/",
  plugins: [react()],
  resolve: { alias: { "@": resolve(import.meta.dirname, "src") } },
  css: { postcss: resolve(import.meta.dirname, "postcss.config.cjs") },
  build: {
    outDir: resolve(import.meta.dirname, "../d4-dist"),
    emptyOutDir: true,
    rolldownOptions: { input: resolve(import.meta.dirname, "d4.html") },
  },
});
