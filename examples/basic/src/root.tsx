import "./index.css";
import { Demo } from "./demo.tsx";

export function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + RSC</title>
      </head>
      <body>
        <App />
      </body>
    </html>
  );
}

// TODO: design and framing
// - mention @vitejs/plugin-rsc + vite-plugin-react-use-cache
// - example to paralell demo-use-cache.ts
// - deploy to cloudflare workers with kv
// - allow each cache fro each user?

function App() {
  return (
    <div id="root">
      <h1>"use cache" demo</h1>
      <div className="card">
        <Demo />
      </div>
    </div>
  );
}
