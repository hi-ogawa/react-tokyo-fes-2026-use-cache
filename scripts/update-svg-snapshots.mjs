import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ansiToSvg from "ansi-to-svg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const assetsDir = resolve(rootDir, "assets");

const snapshots = [
  {
    displayCommand: "pnpm -s vite-run src/demo-rsc.tsx",
    command: "pnpm -s vite-run src/demo-rsc.tsx",
    outFile: "demo-rsc-output.svg",
  },
  {
    displayCommand: "pnpm -s vite-run src/demo-server-function-arguments.tsx simple",
    command: "pnpm -s vite-run src/demo-server-function-arguments.tsx simple",
    outFile: "demo-server-function-arguments-simple-output.svg",
  },
  {
    displayCommand: "pnpm -s vite-run src/demo-server-function-arguments.tsx form",
    command: "pnpm -s vite-run src/demo-server-function-arguments.tsx form",
    outFile: "demo-server-function-arguments-form-output.svg",
  },
  {
    displayCommand: "pnpm -s vite-run src/demo-use-cache.tsx",
    command: "pnpm -s vite-run src/demo-use-cache.tsx",
    outFile: "demo-use-cache-output.svg",
  },
];

const svgOptions = {
  fontFamily: "Roboto Mono, Menlo, monospace",
  fontSize: 14,
  lineHeight: 20,
  paddingTop: 12,
  paddingRight: 12,
  paddingBottom: 12,
  paddingLeft: 12,
};

mkdirSync(assetsDir, { recursive: true });

for (const snapshot of snapshots) {
  const output = execSync(snapshot.command, {
    cwd: rootDir,
    encoding: "utf8",
    env: {
      ...process.env,
      FORCE_COLOR: "1",
    },
  });
  const withCommand = `$ ${snapshot.displayCommand}\n${output}`;
  const svg = ansiToSvg(withCommand, svgOptions);
  const outPath = resolve(assetsDir, snapshot.outFile);
  writeFileSync(outPath, svg);
  console.log(`Wrote assets/${snapshot.outFile}`);
}
