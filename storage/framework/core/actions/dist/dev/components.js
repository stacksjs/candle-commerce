// @bun
// src/dev/components.ts
import { parseOptions, runCommand } from "@stacksjs/cli";
import { libsPath } from "@stacksjs/path";
var options = parseOptions();
if (options.verbose)
  console.log("dev components options", options);
await runCommand(`bun run dev`, {
  ...options,
  cwd: libsPath("components/vue")
});
