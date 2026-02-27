import { inspect, styleText } from "node:util";

const SECTION_LINE = "=".repeat(56);

export function logSection(step: string, title: string) {
  console.log(styleText("dim", SECTION_LINE));
  console.log(styleText(["bold", "cyan"], `${step}: ${title}`));
  console.log(styleText("dim", SECTION_LINE));
}

export function logNote(note: string) {
  console.log(styleText("yellow", `Note: ${note}`));
}

export function logLhs(
  name: string,
  value: unknown,
  options?: { styled?: boolean },
) {
  const label = options?.styled ? styleText("bold", `${name} =`) : `${name} =`;
  console.log(label);
  const text =
    typeof value === "string"
      ? value
      : inspect(value, { depth: null, colors: true });
  console.log(
    text
      .split("\n")
      .map((line) => `  ${line}`)
      .join("\n"),
  );
}

export async function stringToString(stream: ReadableStream<Uint8Array>) {
  let result = "";
  await stream.pipeThrough(new TextDecoderStream() as any).pipeTo(
    new WritableStream({
      write(chunk) {
        result += chunk;
      },
    }),
  );
  return result;
}

export function stringToStream(text: string) {
  return new Blob([text]).stream() as ReadableStream<Uint8Array>;
}
