#!/usr/bin/env bun
// @bun
import {
  generateComponentMeta
} from "../helpers/component-meta.js";
import"../chunk-3m5vgw5b.js";
import"../chunk-skftfmsf.js";
import"../chunk-e9syc5kq.js";
import"../chunk-1j66gxht.js";

// src/generate/component-meta.ts
import { log } from "@stacksjs/logging";
import { hasComponents } from "@stacksjs/storage";
log.info("Generating component meta...");
if (hasComponents())
  generateComponentMeta();
else
  log.info("No components found. Skipping component meta generation.");
log.success("Generated component meta.");
