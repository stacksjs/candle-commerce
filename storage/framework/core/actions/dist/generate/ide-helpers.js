#!/usr/bin/env bun
// @bun
import {
  generateVsCodeCustomData,
  generateWebTypes
} from "../helpers/vscode-custom-data.js";
import"../chunk-494jp8d5.js";
import"../chunk-1j66gxht.js";

// src/generate/ide-helpers.ts
import { log } from "@stacksjs/logging";
import { hasComponents } from "@stacksjs/storage";
if (hasComponents()) {
  await generateWebTypes();
  await generateVsCodeCustomData();
} else {
  log.info("No components found. Skipping IDE helper generation.");
}
