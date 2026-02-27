# React Tokyo Fes 2026 "use cache" poster demo

This repository is the companion demo resource for my [React Tokyo Fes 2026](https://react-tokyo.vercel.app/fes2026) poster session on `use cache`.
The poster explains the concepts visually, and this repo lets you run the same step-by-step demos locally and compare the output with the diagrams.

## Run demos

[Run it on browser (Stackblitz)](https://stackblitz.com/edit/github-ivqdpjye?file=src%2Fdemo-use-cache.tsx)

### Demo 1.1

Code: [src/demo-rsc.tsx](./src/demo-rsc.tsx)

```tsx
import {
  renderToReadableStream,
  createFromReadableStream
} from "@vitejs/plugin-rsc/rsc";

async function ServerComponent() {
  return (
    <div>
      <span>{Math.random()}</span>
    </div>
  );
}

const reactNode = <ServerComponent />;

const rscStream = renderToReadableStream(reactNode);

const reactNodeClient = await createFromReadableStream(rscStream);
```

```sh
$ node ./vite-run.js src/demo-rsc.tsx
```

![Demo 1.1 SVG snapshot](./assets/demo-rsc-output.svg)

### Demo 1.2 (simple)

Code: [src/demo-server-function-arguments.tsx](./src/demo-server-function-arguments.tsx#L18)

```sh
$ node ./vite-run.js src/demo-server-function-arguments.tsx simple
```

![Demo 1.2 simple SVG snapshot](./assets/demo-server-function-arguments-simple-output.svg#L36)

### Demo 1.2 (form)

Code: [src/demo-server-function-arguments.tsx](./src/demo-server-function-arguments.tsx)

```sh
$ node ./vite-run.js src/demo-server-function-arguments.tsx form
```

![Demo 1.2 form SVG snapshot](./assets/demo-server-function-arguments-form-output.svg)

### Demo 2.1

Code: [src/demo-use-cache.tsx](./src/demo-use-cache.tsx)

```sh
$ node ./vite-run.js src/demo-use-cache.tsx
```

![Demo 2.1 SVG snapshot](./assets/demo-use-cache-output.svg)
