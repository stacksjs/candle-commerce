// @bun
import"../chunk-1j66gxht.js";

// src/helpers/utils.ts
import { buddyOptions, runCommand, runCommands } from "@stacksjs/cli";
import { err } from "@stacksjs/error-handling";
import { log } from "@stacksjs/logging";
import * as p from "@stacksjs/path";
import { globSync } from "@stacksjs/storage";
async function runAction(action, options) {
  log.debug("runAction:", action, options);
  const glob = new Bun.Glob("**/*.{ts,js}");
  const scanOptions = { cwd: p.userActionsPath(), onlyFiles: true, absolute: true };
  for await (const file of glob.scan(scanOptions)) {
    if (file.endsWith(`${action}.ts`) || file.endsWith(`${action}.js`))
      return (await import(file)).default.handle();
    try {
      log.debug("trying to import", file);
      const a = await import(file);
      if (a.name === action) {
        log.debug("a.name matches", a.name);
        return await a.handle();
      }
    } catch (error) {}
  }
  const opts = buddyOptions();
  const path = p.relativeActionsPath(`src/${action}.ts`);
  const cmd = `bun ${path} ${opts}`.trimEnd();
  const optionsWithCwd = {
    cwd: options?.cwd || p.projectPath(),
    stdio: [options?.stdin ?? "inherit", "pipe", "pipe"],
    ...options
  };
  log.debug("action cmd:", cmd);
  log.debug("optionsWithCwd:", optionsWithCwd);
  return await runCommand(cmd, optionsWithCwd);
}
async function runActions(actions, options) {
  log.debug("runActions:", actions, options);
  if (!actions.length)
    return err("No actions were specified");
  for (const action of actions) {
    log.debug(`running action "${action}"`);
    if (!hasAction(action))
      return err(`The specified action "${action}" does not exist`);
  }
  const opts = buddyOptions();
  const o = {
    cwd: options?.cwd || p.projectPath(),
    ...options
  };
  const commands = actions.map((action) => `bun ${p.relativeActionsPath(`src/${action}.ts`)} ${opts}`);
  log.debug("commands:", commands);
  return await runCommands(commands, o);
}
function hasAction(action) {
  const userActionPatterns = [
    `${action}.ts`,
    `${action}`,
    `Dashboard/${action}.ts`,
    `Dashboard/${action}`,
    `Buddy/${action}.ts`,
    `Buddy/${action}`
  ];
  const actionPatterns = [`src/${action}.ts`, `src/${action}`, `${action}.ts`, `${action}`];
  const userActionFiles = globSync(userActionPatterns.map((pattern) => p.userActionsPath(pattern)));
  const actionFiles = globSync(actionPatterns.map((pattern) => p.actionsPath(pattern)));
  return userActionFiles.length > 0 || actionFiles.length > 0;
}
export {
  runActions,
  runAction,
  hasAction
};

export { runAction, runActions, hasAction };
