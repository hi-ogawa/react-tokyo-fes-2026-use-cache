import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import { provideCache } from "vite-plugin-react-use-cache/runtime";
import { createUnstorageCache } from "vite-plugin-react-use-cache/unstorage";

const storage = createStorage({
  driver: fsDriver({ base: "./node_modules/.use-cache" }),
});

export function withUseCache<T>(handler: () => Promise<T>): Promise<T> {
  return provideCache(createUnstorageCache(storage), handler);
}
