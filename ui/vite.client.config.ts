import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  root: import.meta.dirname,
  plugins: [react()],
  resolve: { alias: { "@": resolve(import.meta.dirname, "src") } },
  css: { postcss: resolve(import.meta.dirname, "postcss.config.cjs") },
  build: {
    outDir: resolve(import.meta.dirname, "../ui-dist"),
    emptyOutDir: false,
    sourcemap: false,
    lib: {
      entry: resolve(import.meta.dirname, "src/client/bridge.tsx"),
      name: "OrganizeOnUI",
      formats: ["es"],
      fileName: () => "client-ui.js",
      cssFileName: "client-ui",
    },
    rolldownOptions: { output: { codeSplitting: false } },
  },
});
