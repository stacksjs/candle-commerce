// @bun
// src/lint/fix.ts
import process from "process";
import { log, parseOptions, runCommand } from "@stacksjs/cli";
import { NpmScript } from "@stacksjs/enums";
import { projectPath } from "@stacksjs/path";
log.info("Ensuring Code Style...");
var options = parseOptions();
var result = await runCommand(NpmScript.LintFix, {
  cwd: projectPath(),
  ...options
});
if (result.isErr()) {
  log.error("There was an error fixing your code style.");
  console.error(result.error);
  process.exit(1);
}
log.success("Linted");
