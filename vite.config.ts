import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tsconfigPaths } from "vite-plugin-lib";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), dts()],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "index",
    },
  },
});
