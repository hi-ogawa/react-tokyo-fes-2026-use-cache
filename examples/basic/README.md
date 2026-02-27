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
It also includes a `Reset cache` button that calls a server action and revalidates a global cache tag (`demo-global`).

## What to verify

1. Open the page.
2. Reload multiple times.
3. Compare values:
   - `static` should stay cached for the same render input.
   - `dynamic` should keep updating because it is outside the cached component body.
4. Click `Reset cache` and confirm `static` recomputes on the next render.

```js
pnpm dev
pnpm build
pnpm preview
pnpm release
```

```js
pnpm wrangler kv namespace create react-tokyo-fes-2026-use-cache-kv
pnpm wrangler r2 bucket create react-tokyo-fes-2026-use-cache-r2
```
