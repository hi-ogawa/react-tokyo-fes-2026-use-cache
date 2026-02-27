import { env, waitUntil } from "cloudflare:workers";
import { createStorage } from "unstorage";
import cloudflareKVBindingDriver from "unstorage/drivers/cloudflare-kv-binding";
import { provideCache } from "vite-plugin-react-use-cache/runtime";
import { createUnstorageCache } from "vite-plugin-react-use-cache/unstorage";

// https://unstorage.unjs.io/drivers/cloudflare#cloudflare-kv-binding
const storage = createStorage({
  driver: cloudflareKVBindingDriver({ binding: env.KV }),
});

export function withUseCache<T>(handler: () => Promise<T>): Promise<T> {
  return provideCache(
    createUnstorageCache(storage),
    handler,
    undefined,
    waitUntil,
  );
}
