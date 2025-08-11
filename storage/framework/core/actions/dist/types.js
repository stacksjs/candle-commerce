// @bun
import"./chunk-1j66gxht.js";

// src/types.ts
import process from "process";
import { NpmScript } from "@stacksjs/enums";
import { log } from "@stacksjs/logging";
import { runNpmScript } from "@stacksjs/utils";
async function invoke(options) {
  const results = await runNpmScript(NpmScript.TypesFix, options);
  if (results.isErr()) {
    log.error("There was an error fixing your types.", results.error);
    process.exit();
  }
  log.success("Types are set");
}
async function types(options) {
  return await invoke(options);
}
export {
  types,
  invoke
};
