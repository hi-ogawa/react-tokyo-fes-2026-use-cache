import react from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import { defineConfig } from "vite";
import { useCachePlugin } from "vite-plugin-react-use-cache";

export default defineConfig({
  plugins: [
    rsc({
      entries: {
        client: "./src/framework/entry.browser.tsx",
        rsc: "./src/framework/entry.rsc.tsx",
      },
    }),
    useCachePlugin(),
    react(),
  ],
});
