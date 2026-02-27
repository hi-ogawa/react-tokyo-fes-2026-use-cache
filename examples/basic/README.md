# Basic example

- https://react-tokyo-fes-2026-use-cache.hiro18181.workers.dev/

Integrating [`vite-plugin-react-use-cache`](https://github.com/jacob-ebey/vite-plugin-react-use-cache) with [`@vitejs/plugin-rsc` starter example](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc/examples/starter)

This app intentionally stays minimal and demonstrates the same shape as Demo 2.1 in the root README:

```tsx
<CachedParent>
  <DynamicChild />
</CachedParent>
```

`CachedParent` has a `"use cache"` directive and renders:

- `static: {new Date().toISOString()}`

`DynamicChild` renders:

- `dynamic: {new Date().toISOString()}`

The page also includes a small code block so the UI itself explains what is running.

## What to verify

1. Open the page.
2. Reload multiple times.
3. Compare values:
   - `static` should stay cached for the same render input.
   - `dynamic` should keep updating because it is outside the cached component body.

```js
pnpm dev
pnpm build
pnpm preview
pnpm release
```
