import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import { defineConfig } from "vite";
import { useCachePlugin } from "vite-plugin-react-use-cache";

export default defineConfig({
  plugins: [
    react(),
    rsc({
      entries: {
        client: "./src/framework/entry.browser.tsx",
      },
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
    useCachePlugin(),
    {
      // TODO: fix upstream
      name: "use-cache-plugin-patch",
      transform: {
        order: "pre",
        handler(code) {
          if (code.includes("global.___VITE_USE_CACHE_STORAGE___ ")) {
            return code.replace(
              "global.___VITE_USE_CACHE_STORAGE___",
              "globalThis.___VITE_USE_CACHE_STORAGE___",
            );
          }
        },
      },
    },
  ],
  environments: {
    ssr: {
      build: {
        // build `ssr` inside `rsc` directory so that
        // wrangler can deploy self-contained `dist/rsc`
        outDir: "./dist/rsc/ssr",
      },
      optimizeDeps: {
        entries: ["./src/framework/entry.ssr.tsx"],
      },
    },
    rsc: {
      optimizeDeps: {
        entries: ["./src/framework/entry.rsc.tsx"],
      },
    },
  },
});
