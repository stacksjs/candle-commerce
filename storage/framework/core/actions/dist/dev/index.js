// @bun
import"../chunk-ze46550n.js";
import {
  runAction
} from "../helpers/utils.js";
import"../chunk-1j66gxht.js";

// src/dev/index.ts
import { Action } from "@stacksjs/enums";
import { log } from "@stacksjs/logging";
async function runDevServer(options) {
  log.info("Starting your Frontend Engine...");
  await runAction(Action.Dev, options);
}
async function runFrontendDevServer(options) {
  log.info("Starting your UI Engine...");
  await runAction(Action.Dev, options);
}
async function runBackendDevServer(options) {
  runApiDevServer(options);
}
async function runApiDevServer(options) {
  log.info("Starting your API...");
  await runAction(Action.DevApi, options);
}
async function runComponentsDevServer(options) {
  log.info("Starting your Library Engine...");
  await runAction(Action.DevComponents, options);
}
async function runDashboardDevServer(options) {
  log.info("Starting your Dashboard...");
  await runAction(Action.DevDashboard, options);
}
async function runSystemTrayDevServer(options) {
  log.info("Starting your System Tray...");
  await runAction(Action.DevSystemTray, options);
}
async function runDesktopDevServer(options) {
  log.info("Starting your Desktop Engine...");
  await runAction(Action.DevDesktop, options);
}
async function runDocsDevServer(options) {
  log.info("Starting your Docs Engine...");
  await runAction(Action.DevDocs, options);
}
export {
  runSystemTrayDevServer,
  runFrontendDevServer,
  runDocsDevServer,
  runDevServer,
  runDesktopDevServer,
  runDashboardDevServer,
  runComponentsDevServer,
  runBackendDevServer,
  runApiDevServer
};

export { runDevServer, runFrontendDevServer, runBackendDevServer, runApiDevServer, runComponentsDevServer, runDashboardDevServer, runSystemTrayDevServer, runDesktopDevServer, runDocsDevServer };
