// @bun
import {
  generateAppKey
} from "./chunk-xjn4vpw3.js";
import"./chunk-tsfemdz5.js";

// src/key-generate.ts
import { runCommand } from "@stacksjs/cli";
import { projectPath } from "@stacksjs/path";
import { fs } from "@stacksjs/storage";
import { setEnvValue } from "@stacksjs/utils";
if (!await fs.exists(".env"))
  await runCommand("cp .env.example .env", { cwd: projectPath() });
await setEnvValue("APP_KEY", generateAppKey());
