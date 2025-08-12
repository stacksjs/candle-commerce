// @bun
import {
  library_default
} from "../chunk-494jp8d5.js";
import"../chunk-mffax2kj.js";
import {
  kebabCase
} from "../chunk-5y2n067z.js";
import"../chunk-tsfemdz5.js";

// src/helpers/lib-entries.ts
import process from "process";
import { log } from "@stacksjs/logging";
import { componentsPath, functionsPath, libraryEntryPath } from "@stacksjs/path";
import { writeTextFile } from "@stacksjs/storage";
import { determineResetPreset } from "@stacksjs/utils";
async function generateLibEntry(type) {
  await createLibraryEntryPoint(type);
}
async function createLibraryEntryPoint(type) {
  if (type === "vue-components")
    await createVueLibraryEntryPoint();
  if (type === "web-components")
    await createWebComponentLibraryEntryPoint();
  if (type === "functions")
    await createFunctionLibraryEntryPoint();
}
async function createVueLibraryEntryPoint(type = "vue-components") {
  log.info("Ensuring Component Library Entry Point...");
  await writeTextFile({
    path: libraryEntryPath(type),
    data: generateEntryPointData(type)
  }).catch((err) => {
    log.error("There was an error generating the Vue Component Library Entry Point.", err);
    process.exit(1 /* FatalError */);
  });
  log.success("Created Vue Component Library Entry Point");
}
async function createWebComponentLibraryEntryPoint(type = "web-components") {
  log.info("Ensuring Web Component Library Entry Point...");
  await writeTextFile({
    path: libraryEntryPath(type),
    data: generateEntryPointData(type)
  }).catch((err) => {
    log.error("There was an error generating the Web Component library entry point", err);
    process.exit(1 /* FatalError */);
  });
  log.success("Created Web Component Library Entry Point");
}
async function createFunctionLibraryEntryPoint(type = "functions") {
  log.info("Ensuring Function Library Entry Point...");
  await writeTextFile({
    path: libraryEntryPath(type),
    data: generateEntryPointData(type)
  }).catch((err) => {
    log.error("There was an error generating Function Library Entry Point", err);
    process.exit(1 /* FatalError */);
  });
  log.success("Created Functions Library Entry Point");
}
function generateEntryPointData(type) {
  let arr = [];
  if (type === "functions") {
    if (!library_default.functions?.files) {
      log.error(new Error("There are no functions defined to be built. Please check your config/library.ts file for potential adjustments"));
      process.exit();
    }
    for (const fx of library_default.functions.files) {
      if (Array.isArray(fx))
        arr.push(`export * as ${fx[1]} from '${functionsPath(fx[0])}'`);
      else
        arr.push(`export * from '${functionsPath(fx)}'`);
    }
    return arr.join(`\r
`);
  }
  if (type === "vue-components") {
    if (!library_default.vueComponents?.tags) {
      log.error(new Error("There are no components defined to be built. Please check your config/library.ts file for potential adjustments"));
      process.exit();
    }
    arr = determineResetPreset();
    for (const component of library_default.vueComponents.tags.map((tag) => tag.name)) {
      if (Array.isArray(component))
        arr.push(`export { default as ${component[1]} } from '${componentsPath(component[0])}.vue'`);
      else
        arr.push(`export { default as ${component} } from '${componentsPath(component)}.vue'`);
    }
    return arr.join(`\r
`);
  }
  arr = determineResetPreset();
  const imports = [...arr, "import { defineCustomElement } from 'vue'"];
  const declarations = [];
  const definitions = [];
  if (!library_default.webComponents?.tags) {
    log.error(new Error("There are no components defined to be built. Please check your config/library.ts file for potential adjustments"));
    process.exit();
  }
  for (const component of library_default.webComponents.tags.map((tag) => tag.name)) {
    if (Array.isArray(component)) {
      imports.push(`import ${component[1]} from '${componentsPath(component[0])}.vue'`);
      declarations.push(`const ${component[1]}CustomElement = defineCustomElement(${component[1]})`);
      definitions.push(`customElements.define('${kebabCase(component[1])}', ${component[1]}CustomElement)`);
    } else {
      imports.push(`import ${component} from '${componentsPath(component)}.vue'`);
      declarations.push(`const ${component}CustomElement = defineCustomElement(${component})`);
      definitions.push(`customElements.define('${kebabCase(component)}', ${component}CustomElement)`);
    }
  }
  return [...imports, ...declarations, ...definitions].join(`\r
`);
}
export {
  generateLibEntry,
  generateEntryPointData,
  createWebComponentLibraryEntryPoint,
  createVueLibraryEntryPoint,
  createLibraryEntryPoint,
  createFunctionLibraryEntryPoint
};

export { generateLibEntry };
