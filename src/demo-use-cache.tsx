import {
  createClientTemporaryReferenceSet,
  createFromReadableStream,
  createTemporaryReferenceSet,
  decodeReply,
  encodeReply,
  renderToReadableStream,
} from "@vitejs/plugin-rsc/rsc";
import { styleText } from "node:util";
import { logLhs, logNote, logSection, stringToStream, stringToString } from "./utils";

export async function main() {
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

  const CachedParent_wrapped = await __cache_wrapper__(CachedParent);

  console.log(styleText("bold", "Run #1"));
  await CachedParent_wrapped({ children: <DynamicChild /> });

  console.log(styleText("bold", "Run #2 (same args shape)"));
  await CachedParent_wrapped({ children: <DynamicChild /> });
}

async function __cache_wrapper__(originalFn: (...args: any[]) => React.ReactNode) {
  const cache = new Map<string, string>();

  return async (...args: any[]) => {
    logSection("Step 1/5", "Encode Args as Cache Key (encodeReply)");
    logLhs("args", args, { styled: true });
    console.log();
    const clientTempRefs = createClientTemporaryReferenceSet();
    const encodedArgs = await encodeReply(args, { temporaryReferences: clientTempRefs });
    if (typeof encodedArgs !== "string") {
      throw new Error("Expected encodedArgs to be a string in this simplified demo.");
    }
    logLhs("encodedArgs", encodedArgs, { styled: true });
    logLhs("clientTempRefs", clientTempRefs, { styled: true });
    console.log();

    if (!cache.has(encodedArgs)) {
      console.log(styleText(["bold", "green"], "cache = miss"));
      console.log();

      logSection("Step 2/5", "Decode Arguments (decodeReply)");
      const serverTempRefs = createTemporaryReferenceSet();
      const decodedArgs = await decodeReply(encodedArgs, { temporaryReferences: serverTempRefs });
      logLhs("decodedArgs", decodedArgs, { styled: true });
      logLhs("serverTempRefs", serverTempRefs, { styled: true });
      logNote("[Function (anonymous)] is a temporary reference proxy for encoded $T.");
      console.log();

      logSection("Step 3/5", "Execute Original Function");
      const result = originalFn(...(decodedArgs as any[]));
      logLhs("result", result, { styled: true });
      console.log();

      logSection("Step 4/5", "Serialize Result and Cache (renderToReadableStream)");
      const stream = renderToReadableStream(result, { temporaryReferences: serverTempRefs });
      const payload = await stringToString(stream);
      cache.set(encodedArgs, payload);
      logLhs("stream", payload.trim(), { styled: true });
      logNote("static timestamp is baked into the cached RSC payload.");
      logNote("temporary reference proxy is encoded back to $T in the payload.");
      console.log();
    } else {
      console.log(styleText(["bold", "magenta"], "cache = hit (skip Steps 2-4)"));
      console.log();
    }

    logSection("Step 5/5", "Deserialize Cached RSC Stream (createFromReadableStream)");
    const payload = cache.get(encodedArgs)!;
    const finalResult = await createFromReadableStream(stringToStream(payload), {
      temporaryReferences: clientTempRefs,
    });
    logLhs("finalResult", finalResult, { styled: true });
    logNote("$T in payload is restored to the latest <DynamicChild /> reference.");
    console.log();

    return finalResult;
  };
}
