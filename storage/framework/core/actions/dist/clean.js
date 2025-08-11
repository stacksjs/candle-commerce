// @bun
// src/clean.ts
import { log } from "@stacksjs/logging";
import { cleanProject } from "@stacksjs/utils";
log.info("Running clean command...");
await cleanProject();
