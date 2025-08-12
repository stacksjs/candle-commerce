// @bun
import"./chunk-mffax2kj.js";
import"./chunk-5y2n067z.js";
import"./chunk-tsfemdz5.js";

// src/examples.ts
import process from "process";
import { NpmScript } from "@stacksjs/enums";
import { log } from "@stacksjs/logging";
import { hasComponents } from "@stacksjs/storage";
import { runNpmScript } from "@stacksjs/utils";
async function invoke(options) {
  if (options.components || options.vue) {
    await componentExample(options);
  } else if (options.webComponents || options.elements) {
    await webComponentExample(options);
  } else {
    log.error("An unsupported option was used. Please try again, check the documentation & report the issue, if needed.");
  }
}
async function examples(options) {
  return await invoke(options);
}
async function componentExample(options) {
  if (hasComponents()) {
    await runNpmScript(NpmScript.ExampleVue, options);
    log.success("Your component library was built successfully");
  } else {
    log.info("No components found.");
  }
}
async function webComponentExample(options) {
  if (hasComponents()) {
    log.info("Building your Web Component library...");
    await runNpmScript(NpmScript.BuildWebComponents, options);
    log.success("Your Web Component library was built successfully");
  } else {
    log.info("No components found.");
    process.exit(1 /* FatalError */);
  }
}
export {
  webComponentExample,
  invoke,
  examples,
  componentExample
};
