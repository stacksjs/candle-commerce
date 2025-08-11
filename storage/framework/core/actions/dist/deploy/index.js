// @bun
import"../chunk-jycndeyj.js";
import"../chunk-1j66gxht.js";

// src/deploy/index.ts
import process from "process";
import { log, runCommand } from "@stacksjs/cli";
import { config } from "@stacksjs/config";
import { path as p } from "@stacksjs/path";
import { storage } from "@stacksjs/storage";
log.info("Building the framework...");
await runCommand("bun run build", {
  cwd: p.frameworkPath()
});
log.success("Framework built");
if (storage.hasFiles(p.projectPath("docs"))) {
  log.info("Building the documentation...");
  await runCommand("bun run build", {
    cwd: p.frameworkPath("docs")
  });
  log.success("Documentation built");
}
if (config.app.docMode !== true) {
  log.info("Building the views...");
  await runCommand("bun run build", {
    cwd: p.frameworkPath("views/web")
  });
  log.success("Views built");
}
log.info("Building the server...");
await runCommand("bun build.ts", {
  cwd: p.frameworkPath("server")
});
log.success("Server built");
await runCommand("bun zip.ts", {
  cwd: p.corePath("cloud")
});
log.info("Deploying...");
var profile = process.env.AWS_PROFILE ?? "stacks";
var result = await runCommand(`bunx --bun cdk deploy --require-approval never --profile="${profile}"`, {
  cwd: p.frameworkCloudPath()
});
if (result.isErr()) {
  log.error(result.error);
  process.exit(1 /* FatalError */);
}
var t = result.value;
await t.exited;
