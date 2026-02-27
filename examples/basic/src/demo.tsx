import { cacheTag, revalidateTag } from "vite-plugin-react-use-cache/runtime";

export function Demo() {
  const snippet = `\
<CachedParent>
  <DynamicChild />
</CachedParent>

function CachedParent({ children }) {
  "use cache";
  return (
    <div>
      <div>static: {new Date().toISOString()}</div>
      {children}
    </div>
  );
}

function DynamicChild() {
  return <div>dynamic: {new Date().toISOString()}</div>;
}
`;

  return (
    <section className="demo">
      <h2>Live output</h2>
      <div className="output">
        <CachedParent>
          <DynamicChild />
        </CachedParent>
      </div>

      <p className="hint">
        Reload this page a few times: static should stay cached, while dynamic
        keeps updating. Default cache TTL is 5 minutes. Click Reset cache to
        force static to recompute.
      </p>

      <form
        action={async () => {
          "use server";
          await revalidateTag("demo-global");
        }}
        className="controls"
      >
        <button type="submit">Reset cache</button>
        <span className="control-note">Global tag: demo-global</span>
      </form>

      <h2>Code</h2>
      <pre className="code-block">
        <code>{snippet}</code>
      </pre>
    </section>
  );
}

function CachedParent({ children }: { children: React.ReactNode }) {
  "use cache";
  cacheTag("demo-global");
  return (
    <div className="cached-parent-box">
      <strong>&lt;CachedParent&gt; (with "use cache")</strong>
      <div className="value">static: {new Date().toISOString()}</div>
      {children}
    </div>
  );
}

function DynamicChild() {
  return (
    <div className="dynamic-child-box">
      <strong>&lt;DynamicChild&gt;</strong>
      <div className="value">dynamic: {new Date().toISOString()}</div>
    </div>
  );
}
