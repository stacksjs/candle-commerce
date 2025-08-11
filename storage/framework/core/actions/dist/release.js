#!/usr/bin/env bun
// @bun
import"./index.js";
import"./commit.js";
import"./make.js";
import"./add.js";
import"./generate/index.js";
import"./chunk-ha4gh26a.js";
import"./chunk-50tnyd8h.js";
import"./chunk-8pca1d4b.js";
import"./chunk-3rkn8egm.js";
import"./chunk-1yw79y36.js";
import"./chunk-z7g8sgtg.js";
import"./chunk-0be2fzx4.js";
import"./chunk-1n9mxrp7.js";
import"./chunk-zzerxbrm.js";
import"./chunk-geb98aw8.js";
import"./chunk-p8vym9ay.js";
import"./chunk-0rra9d59.js";
import"./chunk-zpek37sa.js";
import"./helpers/vscode-custom-data.js";
import"./chunk-skftfmsf.js";
import"./chunk-494jp8d5.js";
import"./chunk-jdfnxamh.js";
import"./chunk-kxsrvkd8.js";
import"./chunk-389b9wtx.js";
import"./chunk-e9syc5kq.js";
import"./chunk-jycndeyj.js";
import"./dev/index.js";
import"./chunk-ze46550n.js";
import {
  runActions
} from "./helpers/utils.js";
import"./chunk-1j66gxht.js";

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
