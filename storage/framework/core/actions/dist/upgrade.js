// @bun
import"./chunk-1j66gxht.js";

// src/upgrade.ts
import process from "process";
import { intro, outro, runCommand } from "@stacksjs/cli";
import { NpmScript } from "@stacksjs/enums";
import { log } from "@stacksjs/logging";
import { projectPath } from "@stacksjs/path";
import * as storage from "@stacksjs/storage";
// package.json
var version = "0.70.23";

// src/upgrade.ts
function checkForUncommittedChanges(options) {
  try {
    console.log("checkForUncommittedChanges", options);
  } catch (error) {
    console.error(error);
  }
}
async function downloadFrameworkUpdate(options) {
  const tempFolderName = "updates";
  const tempUpdatePath = projectPath(tempFolderName);
  if (storage.doesFolderExist(tempUpdatePath))
    await storage.deleteFolder(tempUpdatePath);
  log.info("Downloading framework updates...");
  await runCommand(`giget stacks ${tempFolderName}`, options);
  log.success(`Your framework updated correctly to version: v${version}`);
}
async function updateDependencies() {
  const perf = await intro("buddy upgrade:dependencies");
  const result = await runCommand(NpmScript.UpgradeDependencies, {
    cwd: projectPath()
  });
  if (result.isErr()) {
    await outro("While running the upgrade:dependencies command, there was an issue", { startTime: perf, useSeconds: true }, result.error);
    process.exit();
  }
  await outro("Freshly updated your dependencies.", {
    startTime: perf,
    useSeconds: true
  });
  process.exit();
}
export {
  updateDependencies,
  downloadFrameworkUpdate,
  checkForUncommittedChanges
};
