// @bun
import"../chunk-mffax2kj.js";
import"../chunk-5y2n067z.js";
import"../chunk-ze46550n.js";
import {
  runAction
} from "../helpers/utils.js";
import"../chunk-tsfemdz5.js";

// src/upgrade/index.ts
import process from "process";
import { parseArgs } from "@stacksjs/cli";
import { Action } from "@stacksjs/enums";
var options = parseArgs();
if (options?.dependencies || options?.all)
  await runAction(Action.UpgradeDeps, options);
if (options?.bun || options?.all)
  await runAction(Action.UpgradeBun, options);
if (options?.shell || options?.all)
  await runAction(Action.UpgradeShell, options);
if (options?.binary || options?.all)
  await runAction(Action.UpgradeBinary, options);
process.exit(9 /* InvalidArgument */);
