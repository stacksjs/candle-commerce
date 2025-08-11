// @bun
// src/test/ui.ts
import { runCommand } from "@stacksjs/cli";
import { NpmScript } from "@stacksjs/enums";
import { frameworkPath } from "@stacksjs/path";
await runCommand(NpmScript.TestUi, { verbose: true, cwd: frameworkPath() });
