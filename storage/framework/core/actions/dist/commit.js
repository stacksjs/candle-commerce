// @bun
import"./chunk-tsfemdz5.js";

// src/commit.ts
import { NpmScript } from "@stacksjs/enums";
import { log } from "@stacksjs/logging";
import { projectPath } from "@stacksjs/path";
import { runNpmScript } from "@stacksjs/utils";
async function invoke(options) {
  log.info("Committing...");
  await runNpmScript(NpmScript.Commit, { cwd: projectPath(), ...options });
  log.success("Committed");
}
async function commit(options) {
  return await invoke(options);
}
export {
  invoke,
  commit
};

export { commit };
