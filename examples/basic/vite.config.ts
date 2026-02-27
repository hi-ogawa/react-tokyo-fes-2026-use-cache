import react from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    rsc({
      entries: {
        client: "./src/framework/entry.browser.tsx",
        rsc: "./src/framework/entry.rsc.tsx",
      },
    }),
    react(),
  ],
});
