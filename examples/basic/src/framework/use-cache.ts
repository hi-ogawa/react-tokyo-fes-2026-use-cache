import { env } from "cloudflare:workers";
import { createStorage } from "unstorage";
import cloudflareR2BindingDriver from "unstorage/drivers/cloudflare-r2-binding";
// import cloudflareKVBindingDriver from "unstorage/drivers/cloudflare-kv-binding";
import { provideCache } from "vite-plugin-react-use-cache/runtime";
// // https://unstorage.unjs.io/drivers/cloudflare#cloudflare-kv-binding
// const storage = createStorage({
//   driver: cloudflareKVBindingDriver({ binding: env.KV }),
// });
import { createUnstorageCache } from "vite-plugin-react-use-cache/unstorage";

// https://unstorage.unjs.io/drivers/cloudflare#cloudflare-r2-binding
const storage = createStorage({
  driver: cloudflareR2BindingDriver({ binding: env.R2 }),
});

export function withUseCache<T>(handler: () => Promise<T>): Promise<T> {
  return provideCache(createUnstorageCache(storage), handler);
}
