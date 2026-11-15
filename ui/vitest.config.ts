import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: import.meta.dirname,
  plugins: [react()],
  resolve: { alias: { "@": resolve(import.meta.dirname, "src") } },
  css: { postcss: resolve(import.meta.dirname, "postcss.config.cjs") },
  test: { environment: "jsdom", setupFiles: ["./src/test/setup.ts"], restoreMocks: true },
});
