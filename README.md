# React Tokyo Fes 2026 - use cache demos

Associated demo resources for my poster session:

- https://react-tokyo.vercel.app/fes2026

## Setup

```sh
pnpm install
```

## Run demos

### Demo 1.1

- Code: [src/demo-rsc.tsx](./src/demo-rsc.tsx)

```sh
pnpm -s vite-run src/demo-rsc.tsx
```

### Demo 1.2 (simple)

- Code: [src/demo-server-function-arguments.tsx](./src/demo-server-function-arguments.tsx)

```sh
pnpm -s vite-run src/demo-server-function-arguments.tsx simple
```

### Demo 1.2 (form)

- Code: [src/demo-server-function-arguments.tsx](./src/demo-server-function-arguments.tsx)

```sh
pnpm -s vite-run src/demo-server-function-arguments.tsx form
```

### Demo 2.1

- Code: [src/demo-use-cache.tsx](./src/demo-use-cache.tsx)

```sh
pnpm -s vite-run src/demo-use-cache.tsx
```

## Generate SVG snapshots

```sh
pnpm -s update-svg
```

Generated files:

- [assets/demo-rsc-output.svg](./assets/demo-rsc-output.svg)
- [assets/demo-server-function-arguments-simple-output.svg](./assets/demo-server-function-arguments-simple-output.svg)
- [assets/demo-server-function-arguments-form-output.svg](./assets/demo-server-function-arguments-form-output.svg)
- [assets/demo-use-cache-output.svg](./assets/demo-use-cache-output.svg)
