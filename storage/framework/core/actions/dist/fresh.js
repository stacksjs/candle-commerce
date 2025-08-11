// @bun
import"./chunk-jycndeyj.js";
import"./chunk-1j66gxht.js";

// src/fresh.ts
import process from "process";
import { runCommand } from "@stacksjs/cli";
import { handleError } from "@stacksjs/error-handling";
import { log } from "@stacksjs/logging";
import { projectPath } from "@stacksjs/path";
import { cleanProject } from "@stacksjs/utils";
log.info("Cleaning project...");
await cleanProject();
log.info("Installing dependencies...");
var result = await runCommand("bun install", {
  cwd: projectPath()
});
if (result.isErr()) {
  handleError(result.error);
  process.exit(1 /* FatalError */);
}
