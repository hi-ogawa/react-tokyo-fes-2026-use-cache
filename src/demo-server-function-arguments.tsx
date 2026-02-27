import { decodeReply, encodeReply } from "@vitejs/plugin-rsc/rsc";

import { logLhs, logSection } from "./utils";

export async function main(args: string[]) {
  const type = args[0] || "simple";
  if (type === "simple") {
    await mainSimple();
    return;
  }
  if (type === "form") {
    await mainForm();
    return;
  }

  throw new Error(`Unknown mode: ${type}`);
}

async function mainSimple() {
  const args = [{ greet: "hi" }];

  logSection("Step 1/3", "Server Function Arguments");
  logLhs("args", args);
  console.log();

  const body = await encodeReply(args);
  logSection("Step 2/3", "encodeReply Result");
  logLhs("body", body);
  console.log();

  const decoded = await decodeReply(body);
  logSection("Step 3/3", "decodeReply Result");
  logLhs("args", decoded);
  console.log();
}

async function mainForm() {
  const formData = new FormData();
  formData.set("greet", "hey");
  const args = [formData];

  logSection("Step 1/3", "Server Function Arguments");
  logLhs("args", args);
  console.log();

  const body = await encodeReply(args);
  logSection("Step 2/3", "encodeReply Result");
  logLhs("body", body);
  console.log();

  const decoded = await decodeReply(body);
  logSection("Step 3/3", "decodeReply Result");
  logLhs("args", decoded);
  console.log();
}
