# React Tokyo Fes 2026 "use cache" poster demo

This repository is the companion demo resource for my [React Tokyo Fes 2026](https://react-tokyo.vercel.app/fes2026) poster session on `use cache`.
The poster explains the concepts visually, and this repo lets you run the same step-by-step demos locally and compare the output with the diagrams.

[Run it on browser (Stackblitz)](https://stackblitz.com/edit/github-ivqdpjye?file=src%2Fdemo-use-cache.tsx)

## Demo 1.1

Code: [src/demo-rsc.tsx](./src/demo-rsc.tsx)

```tsx
import {
  renderToReadableStream,
  createFromReadableStream
} from "@vitejs/plugin-rsc/rsc";

// Step 1/3: Server Component Node
async function ServerComponent() {
  return (
    <div>
      <span>{Math.random()}</span>
    </div>
  );
}

const reactNode = <ServerComponent />;

// Step 2/3: RSC Stream Payload (renderToReadableStream)
const rscStream = renderToReadableStream(reactNode);

// Step 3/3: React Node on Client (createFromReadableStream)
const reactNodeClient = await createFromReadableStream(rscStream);
```

```sh
$ node ./vite-run.js src/demo-rsc.tsx
```

![Demo 1.1 SVG snapshot](./assets/demo-rsc-output.svg)

## Demo 1.2 (simple)

Code: [src/demo-server-function-arguments.tsx](./src/demo-server-function-arguments.tsx#L18)

```tsx
import { decodeReply, encodeReply } from "@vitejs/plugin-rsc/rsc";

// Step 1/3: Server Function Arguments
const args = [{ greet: "hi" }];

// Step 2/3: encodeReply Result
const body = await encodeReply(args);

// Step 3/3: decodeReply Result
const decoded = await decodeReply(body);
```

```sh
$ node ./vite-run.js src/demo-server-function-arguments.tsx simple
```

![Demo 1.2 simple SVG snapshot](./assets/demo-server-function-arguments-simple-output.svg#L36)

## Demo 1.2 (form)

Code: [src/demo-server-function-arguments.tsx](./src/demo-server-function-arguments.tsx)

```tsx
import { decodeReply, encodeReply } from "@vitejs/plugin-rsc/rsc";

// Step 1/3: Server Function Arguments
const formData = new FormData();
formData.set("greet", "hey");
const args = [formData];

// Step 2/3: encodeReply Result
const body = await encodeReply(args);

// Step 3/3: decodeReply Result
const decoded = await decodeReply(body);
```

```sh
$ node ./vite-run.js src/demo-server-function-arguments.tsx form
```

![Demo 1.2 form SVG snapshot](./assets/demo-server-function-arguments-form-output.svg)

## Demo 2.1

Code: [src/demo-use-cache.tsx](./src/demo-use-cache.tsx)

```tsx
import {
  createClientTemporaryReferenceSet,
  createFromReadableStream,
  createTemporaryReferenceSet,
  decodeReply,
  encodeReply,
  renderToReadableStream,
} from "@vitejs/plugin-rsc/rsc";

function CachedParent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span>static: {new Date().toISOString()}</span>
      {children}
    </>
  );
}

function DynamicChild() {
  return <span>dynamic: {new Date().toISOString()}</span>;
}

async function __cache_wrapper__(originalFn: (...args: any[]) => React.ReactNode) {
  const cache = new Map<string, string>();

  return async (...args: any[]) => {
    // Step 1/5: Encode Args as Cache Key (encodeReply)
    const clientTempRefs = createClientTemporaryReferenceSet();
    const encodedArgs = await encodeReply(args, { temporaryReferences: clientTempRefs });
    if (typeof encodedArgs !== "string") throw new Error("Expected string cache key");

    if (!cache.has(encodedArgs)) {
      // Step 2/5: Decode Arguments (decodeReply)
      const serverTempRefs = createTemporaryReferenceSet();
      const decodedArgs = await decodeReply(encodedArgs, { temporaryReferences: serverTempRefs });

      // Step 3/5: Execute Original Function
      const result = originalFn(...(decodedArgs as any[]));

      // Step 4/5: Serialize Result and Cache (renderToReadableStream)
      const stream = renderToReadableStream(result, { temporaryReferences: serverTempRefs });
      const payload = await new Response(stream).text();
      cache.set(encodedArgs, payload);
    }

    // Step 5/5: Deserialize Cached RSC Stream (createFromReadableStream)
    const payload = cache.get(encodedArgs)!;
    return createFromReadableStream(new Response(payload).body!, {
      temporaryReferences: clientTempRefs,
    });
  };
}

const CachedParent_wrapped = await __cache_wrapper__(CachedParent);

// Run #1
await CachedParent_wrapped({ children: <DynamicChild /> });

// Run #2 (same args shape)
// cache = hit (skip Steps 2-4)
await CachedParent_wrapped({ children: <DynamicChild /> });
```

```sh
$ node ./vite-run.js src/demo-use-cache.tsx
```

![Demo 2.1 SVG snapshot](./assets/demo-use-cache-output.svg)
