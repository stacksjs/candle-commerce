// @bun
import {
  generateTypes
} from "./generate/index.js";
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
import"./chunk-ze46550n.js";
import"./helpers/utils.js";
import"./chunk-tsfemdz5.js";

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
