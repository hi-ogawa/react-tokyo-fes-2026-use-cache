import assert from "node:assert";

import rsc from "@vitejs/plugin-rsc";
import { createServer, isRunnableDevEnvironment } from "vite";

async function main() {
  const [input, ...args] = process.argv.slice(2);
  if (!input) {
    console.error("Usage: vite-run <module-path> [args...]");
    process.exitCode = 1;
    return;
  }

  process.env.NODE_ENV ??= "production";

  const server = await createServer({
    configFile: false,
    plugins: [
      rsc({
        serverHandler: false,
      }),
    ],
  });

  const environment = server.environments.rsc;
  assert(isRunnableDevEnvironment(environment));
  const mod = await environment.runner.import(input);
  if ("main" in mod) {
    await mod.main(args);
  }
  await server.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
