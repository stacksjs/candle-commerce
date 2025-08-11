// @bun
import {
  library_default
} from "../chunk-494jp8d5.js";
import"../chunk-1j66gxht.js";

// src/helpers/package-json.ts
import { log } from "@stacksjs/logging";
import { packageJsonPath } from "@stacksjs/path";
import { writeTextFile } from "@stacksjs/storage";
async function generatePackageJson(type) {
  let name;
  let description;
  let directory;
  let keywords;
  let config;
  let prettyName;
  if (type === "vue-components") {
    name = library_default.vueComponents?.name;
    description = library_default.vueComponents?.description;
    directory = "components";
    keywords = library_default.vueComponents?.keywords;
    config = "vue-components";
  } else if (type === "web-components") {
    name = library_default.webComponents?.name;
    description = library_default.webComponents?.description;
    directory = "components";
    keywords = library_default.webComponents?.keywords;
    config = "web-components";
  } else if (type === "functions") {
    name = library_default.functions?.name;
    description = library_default.functions?.description;
    directory = "functions";
    keywords = library_default.functions?.keywords;
    config = "functions";
  }
  try {
    await writeTextFile({
      path: packageJsonPath(type),
      data: `{
  "name": "${name}",
  "type": "module",
  "version": "",
  "packageManager": "bun",
  "description": "${description}",
  "author": "${library_default.author}",
  "license": "MIT",
  "homepage": "https://github.com/${library_default.repository}/tree/main/${directory}#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/${library_default.repository}.git",
    "directory": "${directory}"
  },
  "bugs": {
    "url": "https://github.com/${library_default.repository}/issues"
  },
  "keywords": ${JSON.stringify(keywords)},
  "contributors": ${JSON.stringify(library_default.contributors)},
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "require": "./dist/index.cjs",
      "import": "./dist/index.js"
    }
  },
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "vite build -c ../build/${config}.ts",
    "prepublishOnly": "bun run build"
  },
  "devDependencies": {
    "stacks": "workspace:*"
  }
}
`
    });
    if (type === "vue-components")
      prettyName = "Vue Component library";
    else if (type === "web-components")
      prettyName = "Web Component library";
    else if (type === "functions")
      prettyName = "Function Library";
    log.success(`Created ${prettyName} package.json file`);
  } catch (err) {
    log.error(`There was an error creating the ${prettyName} package.json`, err);
  }
}
export {
  generatePackageJson
};
