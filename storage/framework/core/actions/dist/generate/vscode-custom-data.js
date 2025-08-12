#!/usr/bin/env bun
// @bun
import {
  generateVsCodeCustomData
} from "../helpers/vscode-custom-data.js";
import"../chunk-494jp8d5.js";
import"../chunk-tsfemdz5.js";

// src/generate/vscode-custom-data.ts
import { log } from "@stacksjs/logging";
import { hasComponents } from "@stacksjs/storage";
log.info("Generating VS Code custom data...");
if (hasComponents())
  await generateVsCodeCustomData();
else
  log.info("No components found. Skipping VS Code custom data generation.");
log.success("Generated VS Code custom data.");
