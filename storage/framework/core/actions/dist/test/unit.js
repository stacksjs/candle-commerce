// @bun
// src/test/unit.ts
import process from "process";
import { log } from "@stacksjs/cli";
import { projectPath } from "@stacksjs/path";
var proc = Bun.spawn(["sh", "-c", "bun test ./tests/unit/**"], {
  cwd: projectPath(),
  stdio: ["inherit", "inherit", "inherit"]
});
var exitCode = await proc.exited;
if (exitCode !== 0) {
  log.error("Tests failed");
  process.exit(exitCode);
}
