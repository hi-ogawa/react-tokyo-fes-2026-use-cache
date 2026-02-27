import { createFromReadableStream, renderToReadableStream } from "@vitejs/plugin-rsc/rsc";
import { logLhs, logSection, stringToString } from "./utils";

export async function main() {
  async function ServerComponent() {
    return (
      <div>
        <span>{Math.random()}</span>
      </div>
    );
  }

  const rootNode = <ServerComponent />;
  logSection("Step 1/3", "Server Component Node");
  logLhs("reactNode", rootNode);
  console.log();

  const rscStream = renderToReadableStream(rootNode);
  const [rscStream1, rscStream2] = rscStream.tee();
  logSection("Step 2/3", "RSC Stream Payload (renderToReadableStream)");
  logLhs("rscStream", await stringToString(rscStream1));
  console.log();

  const rootNodeClient = await createFromReadableStream(rscStream2);
  logSection("Step 3/3", "React Node on Client (createFromReadableStream)");
  logLhs("reactNode", rootNodeClient);
}
