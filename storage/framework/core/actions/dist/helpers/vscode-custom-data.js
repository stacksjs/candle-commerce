// @bun
import {
  library_default
} from "../chunk-494jp8d5.js";
import"../chunk-1j66gxht.js";

// src/helpers/vscode-custom-data.ts
import { err, ok } from "@stacksjs/error-handling";
import { log } from "@stacksjs/logging";
import { customElementsDataPath } from "@stacksjs/path";
import { writeTextFile } from "@stacksjs/storage";
async function generateVsCodeCustomData() {
  try {
    log.info("Generating custom-elements.json...");
    await writeTextFile({
      path: customElementsDataPath(),
      data: generateComponentInfoData()
    });
    log.success("Generated custom-elements.json for IDEs.");
    return ok(undefined);
  } catch (e) {
    log.error("There was an error generating the custom-elements.json file.", e);
    return err("There was an error generating the custom-elements.json file.");
  }
}
async function generateWebTypes() {
  log.info("Generating web-types.json...");
  log.info("This feature is not yet implemented.");
}
function generateComponentInfoData() {
  const componentsData = JSON.stringify(library_default.vueComponents?.tags);
  return `{
  "version": 1.1,
  "tags": ${componentsData}
}
`;
}
export {
  generateWebTypes,
  generateVsCodeCustomData
};

export { generateVsCodeCustomData, generateWebTypes };
