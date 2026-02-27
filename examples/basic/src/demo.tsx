export function Demo() {
  const snippet = `\
<CachedParent>
  <DynamicChild />
</CachedParent>

function CachedParent({ children }) {
  "use cache";
  return (
    <div>
      <span>static: {new Date().toISOString()}</span>
      {children}
    </div>
  );
}

function DynamicChild() {
  return <span>dynamic: {new Date().toISOString()}</span>;
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
        Reload this page a few times. The static value should stay cached while
        the dynamic value updates.
      </p>

      <h2>Code</h2>
      <pre className="code-block">
        <code>{snippet}</code>
      </pre>
    </section>
  );
}

function CachedParent({ children }: { children: React.ReactNode }) {
  "use cache";
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
