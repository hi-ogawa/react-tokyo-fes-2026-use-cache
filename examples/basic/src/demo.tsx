export function Demo() {
  return (
    <div>
      <CachedParent>
        <DynamicChild />
      </CachedParent>
    </div>
  );
}

function CachedParent({ children }: { children: React.ReactNode }) {
  "use cache";
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
