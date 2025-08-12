#!/usr/bin/env bun
// @bun
import {
  generateComponentMeta
} from "../helpers/component-meta.js";
import"../chunk-x0e83atq.js";
import"../chunk-r0f7edw2.js";
import"../chunk-3vsmxw3t.js";
import"../chunk-6dza9hpj.js";
import"../chunk-tsfemdz5.js";

// src/generate/component-meta.ts
import { log } from "@stacksjs/logging";
import { hasComponents } from "@stacksjs/storage";
log.info("Generating component meta...");
if (hasComponents())
  generateComponentMeta();
else
  log.info("No components found. Skipping component meta generation.");
log.success("Generated component meta.");
