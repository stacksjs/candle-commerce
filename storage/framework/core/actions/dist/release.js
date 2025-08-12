#!/usr/bin/env bun
// @bun
import"./index.js";
import"./commit.js";
import"./make.js";
import"./add.js";
import"./generate/index.js";
import"./chunk-0gc6v0f2.js";
import"./chunk-n15ser40.js";
import"./chunk-3c1jpby0.js";
import"./chunk-w88kkvg9.js";
import"./chunk-b9x6g0z3.js";
import"./chunk-wnsa83r3.js";
import"./chunk-9xtmc45q.js";
import"./chunk-acrzjgsw.js";
import"./chunk-zzerxbrm.js";
import"./chunk-a6zghhmf.js";
import"./chunk-nxefcthm.js";
import"./chunk-yy4683da.js";
import"./chunk-1mr9ryxr.js";
import"./helpers/vscode-custom-data.js";
import"./chunk-r0f7edw2.js";
import"./chunk-494jp8d5.js";
import"./chunk-kmvsfpmq.js";
import"./chunk-31w5ygdv.js";
import"./chunk-xjn4vpw3.js";
import"./chunk-3vsmxw3t.js";
import"./chunk-6dza9hpj.js";
import"./chunk-mffax2kj.js";
import"./chunk-5y2n067z.js";
import"./dev/index.js";
import"./chunk-ze46550n.js";
import {
  runActions
} from "./helpers/utils.js";
import"./chunk-tsfemdz5.js";

// src/release.ts
import { app } from "@stacksjs/config";
import { Action } from "@stacksjs/enums";
import { log } from "@stacksjs/logging";
import { projectPath } from "@stacksjs/path";
await runActions([
  Action.GenerateLibraryEntries,
  Action.LintFix,
  Action.Bump
], {
  cwd: projectPath()
});
log.success(`Successfully released ${app.name}`);
