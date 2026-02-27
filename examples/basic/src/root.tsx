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

// TODO:
// - link to source
// - mention `@vitejs/plugin-rsc`, `vite-plugin-react-use-cache`, and cloudflare workers KV with `unstorage`
// - ability to reset cache
// - cache per visitor?

function App() {
  return (
    <main id="root" className="page">
      <h1>"use cache" demo</h1>
      <p className="lead">
        This page demonstrates that a cached server component can include a
        dynamic child.
      </p>
      <div className="panel">
        <Demo />
      </div>
    </main>
  );
}
