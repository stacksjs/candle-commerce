// @bun
import {
  generateTypes
} from "./generate/index.js";
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
import"./chunk-ze46550n.js";
import"./helpers/utils.js";
import"./chunk-1j66gxht.js";

// src/build.ts
import { NpmScript } from "@stacksjs/enums";
import { log } from "@stacksjs/logging";
import { hasComponents, hasFunctions } from "@stacksjs/storage";
import { runNpmScript } from "@stacksjs/utils";
async function invoke(options) {
  if (options.components)
    await componentLibraries(options);
  else if (options.vueComponents)
    await vueComponentLibrary(options);
  else if (options.webComponents || options.elements)
    await webComponentLibrary(options);
  else if (options.functions)
    await functionsLibrary(options);
  else if (options.docs)
    await docs(options);
  else if (options.stacks)
    await stacks(options);
  await generateTypes();
}
async function build(options) {
  return await invoke(options);
}
async function componentLibraries(options) {
  await runNpmScript(NpmScript.GenerateEntries, options);
  await vueComponentLibrary(options);
  await webComponentLibrary(options);
}
async function vueComponentLibrary(options) {
  if (hasComponents()) {
    log.info("Building your component library...");
    await runNpmScript(NpmScript.BuildComponents, options);
    log.success("Your component library was built successfully");
  } else {
    log.warn("No components found.");
    log.info("Before you can build components,");
    log.info("you need to have created some in the ./components folder.");
  }
}
async function webComponentLibrary(options) {
  log.info("Building your component library for production use & npm/CDN distribution...");
  if (hasComponents()) {
    await runNpmScript(NpmScript.BuildWebComponents, options);
    log.success("Your Web Component library was built successfully");
  } else {
    log.info("No components found.");
  }
}
async function docs(options) {
  log.info("Building the documentation site...");
  await runNpmScript(NpmScript.BuildDocs, options);
  log.success("Docs built successfully");
}
async function stacks(options) {
  log.info("Building the Stacks Framework...");
  await runNpmScript(NpmScript.BuildStacks, options);
  log.success("Stacks built successfully");
}
async function functionsLibrary(options) {
  if (hasFunctions()) {
    log.info("Building your functions library for production usages...");
    log.info("Production usages include: manual npm distribution and/or CDN distribution");
    await runNpmScript(NpmScript.BuildFunctions, options);
    log.success("Functions library built successfully");
  } else {
    log.info("No functions found");
  }
}
export {
  webComponentLibrary,
  vueComponentLibrary,
  stacks,
  invoke,
  functionsLibrary,
  docs,
  componentLibraries,
  build
};
