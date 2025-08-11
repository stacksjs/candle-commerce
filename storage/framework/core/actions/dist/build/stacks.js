// @bun
// src/build/stacks.ts
import { runCommands } from "@stacksjs/cli";
import { frameworkPath } from "@stacksjs/path";
await runCommands([
  "bun build:cli",
  "bun build:core"
], { verbose: true, cwd: frameworkPath() });
