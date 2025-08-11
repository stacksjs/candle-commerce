// @bun
// src/index.ts
import os from "os";
import {
  basename,
  delimiter,
  dirname,
  extname,
  isAbsolute,
  join,
  normalize,
  parse,
  relative,
  resolve,
  sep,
  toNamespacedPath
} from "path";
import process from "process";
import { log } from "@stacksjs/logging";
function actionsPath(path) {
  return corePath(`actions/${path || ""}`);
}
function relativeActionsPath(path) {
  return relative(projectPath(), actionsPath(path));
}
function userActionsPath(path, options) {
  const absolutePath = appPath(`Actions/${path || ""}`);
  if (options?.relative)
    return relative(process.cwd(), absolutePath);
  return absolutePath;
}
function builtUserActionsPath(path, options) {
  const absolutePath = frameworkPath(`actions/${path || ""}`);
  if (options?.relative)
    return relative(process.cwd(), absolutePath);
  return absolutePath;
}
function userComponentsPath(path) {
  return libsPath(`components/${path || ""}`);
}
function userViewsPath(path) {
  return resourcesPath(`views/${path || ""}`);
}
function userFunctionsPath(path) {
  return resourcesPath(`functions/${path || ""}`);
}
function userJobsPath(path) {
  return appPath(`Jobs/${path || ""}`);
}
function userListenersPath(path) {
  return appPath(`Listeners/${path || ""}`);
}
function userMiddlewarePath(path) {
  return appPath(`Middleware/${path || ""}`);
}
function userModelsPath(path) {
  return appPath(`Models/${path || ""}`);
}
function userNotificationsPath(path) {
  return appPath(`Notifications/${path || ""}`);
}
function userDatabasePath(path) {
  return projectPath(`database/${path || ""}`);
}
function userMigrationsPath(path) {
  return userDatabasePath(`migrations/${path || ""}`);
}
function userEventsPath() {
  return appPath(`Events.ts`);
}
function aiPath(path) {
  return corePath(`ai/${path || ""}`);
}
function assetsPath(path) {
  return resourcesPath(`assets/${path || ""}`);
}
function aliasPath() {
  return corePath("alias/src/index.ts");
}
function buddyPath(path, options) {
  const absolutePath = corePath(`buddy/${path || ""}`);
  if (options?.relative)
    return relative(process.cwd(), absolutePath);
  return absolutePath;
}
function runtimePath(path) {
  return frameworkPath(`buddy/${path || ""}`);
}
function analyticsPath(path) {
  return corePath(`analytics/${path || ""}`);
}
function arraysPath(path) {
  return corePath(`arrays/${path || ""}`);
}
function appPath(path, options) {
  const absolutePath = projectPath(`app/${path || ""}`);
  if (options?.relative)
    return relative(options.cwd || process.cwd(), absolutePath);
  return absolutePath;
}
function authPath(path) {
  return corePath(`auth/${path || ""}`);
}
function coreApiPath(path) {
  return corePath(`api/${path || ""}`);
}
function buildPath(path) {
  return corePath(`build/${path || ""}`);
}
function buildEnginePath(path) {
  return buildPath(`${path || ""}`);
}
function libsPath(path) {
  return frameworkPath(`libs/${path || ""}`);
}
function userLibsPath(path) {
  return resourcesPath(`${path || ""}`);
}
function libsEntriesPath(path) {
  return libsPath(`entries/${path || ""}`);
}
function cachePath(path) {
  return corePath(`cache/${path || ""}`);
}
function chatPath(path) {
  return corePath(`chat/${path || ""}`);
}
function cliPath(path) {
  return corePath(`cli/${path || ""}`);
}
function cloudPath(path) {
  return corePath(`cloud/${path || ""}`);
}
function frameworkCloudPath(path) {
  return frameworkPath(`cloud/${path || ""}`);
}
function collectionsPath(path) {
  return corePath(`collections/${path || ""}`);
}
function commandsPath(path) {
  return appPath(`Commands/${path || ""}`);
}
function componentsPath(path) {
  return userLibsPath(`components/${path || ""}`);
}
function configPath(path) {
  return corePath(`config/${path || ""}`);
}
function corePath(path) {
  return frameworkPath(`core/${path || ""}`);
}
function customElementsDataPath() {
  return frameworkPath("core/custom-elements.json");
}
function databasePath(path) {
  return corePath(`database/${path || ""}`);
}
function datetimePath(path) {
  return corePath(`datetime/${path || ""}`);
}
function developmentPath(path) {
  return corePath(`development/${path || ""}`);
}
function desktopPath(path) {
  return corePath(`desktop/${path || ""}`);
}
function docsPath(path) {
  return corePath(`docs/${path || ""}`);
}
function dnsPath(path) {
  return corePath(`domains/${path || ""}`);
}
function emailPath(path) {
  return notificationsPath(`email/${path || ""}`);
}
function enumsPath(path) {
  return corePath(`enums/${path || ""}`);
}
function eslintPluginPath(path) {
  return corePath(`eslint-plugin/${path || ""}`);
}
function errorHandlingPath(path) {
  return corePath(`error-handling/${path || ""}`);
}
function eventsPath(path) {
  return corePath(`events/${path || ""}`);
}
function coreEnvPath(path) {
  return corePath(`env/${path || ""}`);
}
function examplesPath(type) {
  return frameworkPath(`examples/${type || ""}`);
}
function fakerPath(path) {
  return corePath(`faker/${path || ""}`);
}
function frameworkPath(path, options) {
  const absolutePath = storagePath(`framework/${path || ""}`);
  if (options?.relative)
    return relative(options.cwd || process.cwd(), absolutePath);
  return absolutePath;
}
function browserPath(path) {
  return corePath(`browser/${path || ""}`);
}
function healthPath(path) {
  return corePath(`health/${path || ""}`);
}
function functionsPath(path) {
  return userLibsPath(`functions/${path || ""}`);
}
function gitPath(path) {
  return corePath(`git/${path || ""}`);
}
function langPath(path) {
  return resourcesPath(`lang/${path || ""}`);
}
function layoutsPath(path, options) {
  let absolutePath;
  if (options?.defaults)
    absolutePath = frameworkPath(`defaults/layouts/${path || ""}`);
  else
    absolutePath = resourcesPath(`layouts/${path || ""}`);
  if (options?.relative)
    return relative(process.cwd(), absolutePath);
  return absolutePath;
}
function libraryEntryPath(type) {
  return libsEntriesPath(`${type}.ts`);
}
function lintPath(path) {
  return corePath(`lint/${path || ""}`);
}
function listenersPath(path) {
  return appPath(`Listeners/${path || ""}`);
}
function jobsPath(path) {
  return appPath(`Jobs/${path || ""}`);
}
function loggingPath(path) {
  return corePath(`logging/${path || ""}`);
}
function logsPath(path) {
  return storagePath(`logs/${path || ""}`);
}
function modelsPath(path) {
  return appPath(`models/${path || ""}`);
}
function modulesPath(path) {
  return resourcesPath(`modules/${path || ""}`);
}
function notificationsPath(path) {
  return corePath(`notifications/${path || ""}`);
}
function ormPath(path) {
  return corePath(`orm/${path || ""}`);
}
function objectsPath(path) {
  return corePath(`objects/${path || ""}`);
}
function onboardingPath(path) {
  return projectPath(`${path || "views/dashboard/onboarding"}`);
}
function packageJsonPath(type) {
  if (type === "vue-components")
    return frameworkPath("libs/components/vue/package.json");
  if (type === "web-components")
    return frameworkPath("libs/components/web/package.json");
  return frameworkPath(`libs/${type}/package.json`);
}
function viewsPath(path) {
  return resourcesPath(`views/${path || ""}`);
}
function pathPath(path) {
  return corePath(`path/${path || ""}`);
}
function paymentsPath(path) {
  return corePath(`payments/${path || ""}`);
}
function projectPath(filePath = "", options) {
  let path = process.cwd();
  while (path.includes("storage"))
    path = resolve(path, "..");
  const finalPath = resolve(path, filePath);
  if (options?.relative)
    return relative(process.cwd(), finalPath);
  return finalPath;
}
async function findProjectPath(project) {
  const projectList = Bun.spawnSync(["buddy", "projects:list", "--quiet"]).stdout.toString();
  log.debug(`ProjectList in findProjectPath ${projectList}`);
  const projects = projectList.split(`
`).filter((line) => line.startsWith("   - ")).map((line) => line.trim().substring(4));
  log.debug(`Projects in findProjectPath ${projects}`);
  const projectPath2 = projects.find((proj) => proj.includes(project));
  if (!projectPath2)
    throw new Error(`Could not find project with name: ${project}`);
  return projectPath2.startsWith("/") ? projectPath2 : `/${projectPath2}`;
}
function projectConfigPath(path) {
  return projectPath(`config/${path || ""}`);
}
function storagePath(path) {
  return projectPath(`storage/${path || ""}`);
}
function publicPath(path) {
  return projectPath(`public/${path || ""}`);
}
function pushPath(path) {
  return notificationsPath(`push/${path || ""}`);
}
function queryBuilderPath(path) {
  return corePath(`query-builder/${path || ""}`);
}
function queuePath(path) {
  return corePath(`queue/${path || ""}`);
}
function realtimePath(path) {
  return corePath(`realtime/${path || ""}`);
}
function resourcesPath(path, options) {
  if (options?.relative) {
    const absolutePath = projectPath(`resources/${path || ""}`);
    return relative(process.cwd(), absolutePath);
  }
  return projectPath(`resources/${path || ""}`);
}
function replPath(path) {
  return corePath(`repl/${path || ""}`);
}
function routerPath(path) {
  return corePath(`router/${path || ""}`);
}
function routesPath(path, options) {
  const absolutePath = resourcesPath(`routes/${path || ""}`);
  if (options?.relative)
    return relative(process.cwd(), absolutePath);
  return projectPath(`routes/${path || ""}`);
}
function searchEnginePath(path) {
  return corePath(`search-engine/${path || ""}`);
}
function settingsPath(path) {
  return projectPath(`${path || "views/dashboard/settings"}`);
}
function scriptsPath(path) {
  return frameworkPath(`scripts/${path || ""}`);
}
function schedulerPath(path) {
  return corePath(`scheduler/${path || ""}`);
}
function slugPath(path) {
  return corePath(`slug/${path || ""}`);
}
function smsPath(path) {
  return notificationsPath(`sms/${path || ""}`);
}
function coreStoragePath(path) {
  return corePath(`storage/${path || ""}`);
}
function storesPath(path) {
  return resourcesPath(`stores/${path || ""}`);
}
function securityPath(path) {
  return corePath(`security/${path || ""}`);
}
function serverPath(path) {
  return corePath(`server/${path || ""}`);
}
function userServerPath(path) {
  return frameworkPath(`server/${path || ""}`);
}
function serverlessPath(path) {
  return corePath(`serverless/${path || ""}`);
}
function stacksPath(path) {
  return frameworkPath(`src/${path || ""}`);
}
function shellPath(path) {
  return corePath(`shell/${path || ""}`);
}
function stringsPath(path) {
  return corePath(`strings/${path || ""}`);
}
function testingPath(path) {
  return corePath(`testing/${path || ""}`);
}
function tinkerPath(path) {
  return corePath(`tinker/${path || ""}`);
}
function testsPath(path) {
  return frameworkPath(`tests/${path || ""}`);
}
function typesPath(path) {
  return corePath(`types/${path || ""}`);
}
function uiPath(path, options) {
  const absolutePath = corePath(`ui/${path || ""}`);
  if (options?.relative)
    return relative(process.cwd(), absolutePath);
  return absolutePath;
}
function utilsPath(path) {
  return corePath(`utils/${path || ""}`);
}
function validationPath(path) {
  return corePath(`validation/${path || ""}`);
}
function socialsPath(path) {
  return corePath(`socials/${path || ""}`);
}
function viteConfigPath(path) {
  return corePath(`vite-config/${path || ""}`);
}
function vitePluginPath(path) {
  return corePath(`vite-plugin/${path || ""}`);
}
function xRayPath(path) {
  return frameworkPath(`stacks/x-ray/${path || ""}`);
}
function homeDir(path) {
  return os.homedir() + (path ? (path.startsWith("/") ? "" : "/") + path : "~");
}
var path = {
  actionsPath,
  userActionsPath,
  builtUserActionsPath,
  userComponentsPath,
  userViewsPath,
  userFunctionsPath,
  aiPath,
  assetsPath,
  relativeActionsPath,
  aliasPath,
  analyticsPath,
  arraysPath,
  appPath,
  authPath,
  coreApiPath,
  buddyPath,
  buildEnginePath,
  libsEntriesPath,
  buildPath,
  cachePath,
  chatPath,
  cliPath,
  cloudPath,
  frameworkCloudPath,
  collectionsPath,
  commandsPath,
  componentsPath,
  configPath,
  projectConfigPath,
  corePath,
  customElementsDataPath,
  databasePath,
  datetimePath,
  developmentPath,
  desktopPath,
  docsPath,
  dnsPath,
  emailPath,
  enumsPath,
  eslintPluginPath,
  errorHandlingPath,
  eventsPath,
  coreEnvPath,
  healthPath,
  examplesPath,
  fakerPath,
  frameworkPath,
  browserPath,
  storagePath,
  functionsPath,
  gitPath,
  langPath,
  layoutsPath,
  libsPath,
  userLibsPath,
  libraryEntryPath,
  lintPath,
  listenersPath,
  loggingPath,
  logsPath,
  jobsPath,
  modulesPath,
  ormPath,
  objectsPath,
  onboardingPath,
  notificationsPath,
  packageJsonPath,
  viewsPath,
  pathPath,
  paymentsPath,
  projectPath,
  findProjectPath,
  coreStoragePath,
  publicPath,
  pushPath,
  queryBuilderPath,
  queuePath,
  realtimePath,
  resourcesPath,
  replPath,
  routerPath,
  routesPath,
  runtimePath,
  searchEnginePath,
  schedulerPath,
  settingsPath,
  smsPath,
  slugPath,
  scriptsPath,
  securityPath,
  serverPath,
  userServerPath,
  serverlessPath,
  stacksPath,
  stringsPath,
  shellPath,
  socialsPath,
  storesPath,
  testingPath,
  testsPath,
  tinkerPath,
  typesPath,
  uiPath,
  userDatabasePath,
  userMigrationsPath,
  userEventsPath,
  userJobsPath,
  userListenersPath,
  userMiddlewarePath,
  userModelsPath,
  userNotificationsPath,
  utilsPath,
  validationPath,
  viteConfigPath,
  vitePluginPath,
  xRayPath,
  homeDir,
  basename,
  delimiter: () => delimiter,
  dirname,
  extname,
  isAbsolute,
  join,
  normalize,
  relative,
  resolve,
  parse,
  sep: () => sep,
  toNamespacedPath
};
export {
  xRayPath,
  vitePluginPath,
  viteConfigPath,
  viewsPath,
  validationPath,
  utilsPath,
  userViewsPath,
  userServerPath,
  userNotificationsPath,
  userModelsPath,
  userMigrationsPath,
  userMiddlewarePath,
  userListenersPath,
  userLibsPath,
  userJobsPath,
  userFunctionsPath,
  userEventsPath,
  userDatabasePath,
  userComponentsPath,
  userActionsPath,
  uiPath,
  typesPath,
  toNamespacedPath,
  tinkerPath,
  testsPath,
  testingPath,
  stringsPath,
  storesPath,
  storagePath,
  stacksPath,
  socialsPath,
  smsPath,
  slugPath,
  shellPath,
  settingsPath,
  serverlessPath,
  serverPath,
  sep,
  securityPath,
  searchEnginePath,
  scriptsPath,
  schedulerPath,
  runtimePath,
  routesPath,
  routerPath,
  resourcesPath,
  resolve,
  replPath,
  relativeActionsPath,
  relative,
  realtimePath,
  queuePath,
  queryBuilderPath,
  pushPath,
  publicPath,
  projectPath,
  projectConfigPath,
  paymentsPath,
  pathPath,
  path,
  packageJsonPath,
  ormPath,
  onboardingPath,
  objectsPath,
  notificationsPath,
  normalize,
  modulesPath,
  modelsPath,
  logsPath,
  loggingPath,
  listenersPath,
  lintPath,
  libsPath,
  libsEntriesPath,
  libraryEntryPath,
  layoutsPath,
  langPath,
  join,
  jobsPath,
  isAbsolute,
  homeDir,
  healthPath,
  gitPath,
  functionsPath,
  frameworkPath,
  frameworkCloudPath,
  findProjectPath,
  fakerPath,
  extname,
  examplesPath,
  eventsPath,
  eslintPluginPath,
  errorHandlingPath,
  enumsPath,
  emailPath,
  docsPath,
  dnsPath,
  dirname,
  developmentPath,
  desktopPath,
  delimiter,
  datetimePath,
  databasePath,
  customElementsDataPath,
  coreStoragePath,
  corePath,
  coreEnvPath,
  coreApiPath,
  configPath,
  componentsPath,
  commandsPath,
  collectionsPath,
  cloudPath,
  cliPath,
  chatPath,
  cachePath,
  builtUserActionsPath,
  buildPath,
  buildEnginePath,
  buddyPath,
  browserPath,
  basename,
  authPath,
  assetsPath,
  arraysPath,
  appPath,
  analyticsPath,
  aliasPath,
  aiPath,
  actionsPath
};
