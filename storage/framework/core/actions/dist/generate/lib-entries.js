#!/usr/bin/env bun
// @bun
import {
  generateLibEntry
} from "../helpers/lib-entries.js";
import"../chunk-494jp8d5.js";
import"../chunk-mffax2kj.js";
import"../chunk-5y2n067z.js";
import"../chunk-tsfemdz5.js";

// src/generate/lib-entries.ts
import { library } from "@stacksjs/config";
import { log } from "@stacksjs/logging";
import { hasComponents, hasFunctions } from "@stacksjs/storage";
async function generateLibEntries() {
  log.info("Generating library entry points...");
  if (library.releaseable && hasComponents()) {
    await generateLibEntry("vue-components");
    await generateLibEntry("web-components");
  } else {
    log.info("No components found. Skipping building component entry points.");
  }
  if (library.releaseable && hasFunctions())
    await generateLibEntry("functions");
  else
    log.info("No functions found. Skipping building function entry point.");
}
await generateLibEntries();
export {
  generateLibEntries
};
