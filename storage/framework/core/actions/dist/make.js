// @bun
import"./chunk-ze46550n.js";
import {
  runAction
} from "./helpers/utils.js";
import"./chunk-1j66gxht.js";

// src/make.ts
import process from "process";
import { italic, runCommand } from "@stacksjs/cli";
import { localUrl } from "@stacksjs/config";
import { Action } from "@stacksjs/enums";
import { handleError } from "@stacksjs/error-handling";
import { log } from "@stacksjs/logging";
import { frameworkPath, path as p, resolve } from "@stacksjs/path";
import { createFolder, doesFolderExist, writeTextFile } from "@stacksjs/storage";
async function invoke(options) {
  if (options.component)
    await makeComponent(options);
  if (options.database)
    makeDatabase(options);
  if (options.function)
    await makeFunction(options);
  if (options.language)
    await makeLanguage(options);
  if (options.notification)
    await makeNotification(options);
  if (options.page)
    await makePage(options);
  if (options.stack)
    makeStack(options);
}
async function make(options) {
  return await invoke(options);
}
async function makeAction(options) {
  try {
    const name = options.name;
    log.info("Creating your action...");
    await createAction(options);
    log.success(`Created ${italic(name)} action`);
  } catch (error) {
    log.error("There was an error creating your action", error);
    process.exit();
  }
}
async function makeComponent(options) {
  try {
    const name = options.name;
    log.info("Creating your component...");
    await createComponent(options);
    log.success(`Created ${italic(name)} component`);
  } catch (error) {
    log.error("There was an error creating your component", error);
    process.exit();
  }
}
async function createAction(options) {
  const name = options.name;
  await writeTextFile({
    path: p.userActionsPath(name),
    data: `import { Action } from '@stacksjs/actions'

export default new Action({
  name: '${name}',
  description: '${name} action',

  handle() {
    return 'Hello World action'
  },
})
`
  });
}
async function createComponent(options) {
  const name = options.name;
  await writeTextFile({
    path: p.userComponentsPath(`${name}.vue`),
    data: `<script setup lang="ts">
console.log('Hello World component created')
</script>

<template>
  <div>
    Some HTML block
  </div>
</template>
`
  });
}
function makeDatabase(options) {
  try {
    const name = options.name;
    log.info(`Creating your ${italic(name)} database...`);
    createDatabase(options);
    log.success(`Created ${italic(name)} database`);
  } catch (error) {
    log.error("There was an error creating your database", error);
    process.exit();
  }
}
function createDatabase(options) {
  console.log("createDatabase options", options);
}
function factory(options) {
  try {
    const name = options.name;
    log.info(`Creating your ${italic(name)} factory...`);
    createDatabase(options);
    log.success(`Created ${italic(name)} factory`);
  } catch (error) {
    log.error("There was an error creating your factory", error);
    process.exit();
  }
}
function createFactory(options) {
  console.log("options", options);
}
async function makeNotification(options) {
  try {
    const name = options.name;
    log.info(`Creating your ${italic(name)} notification...`);
    await createNotification(options);
    log.success(`Created ${italic(name)} notification`);
  } catch (error) {
    log.error("There was an error creating your notification", error);
    process.exit();
  }
}
async function makePage(options) {
  try {
    const name = options.name;
    log.info("Creating your page...");
    await createPage(options);
    log.success(`Created ${name} page`);
  } catch (error) {
    log.error("There was an error creating your page", error);
    process.exit();
  }
}
async function createPage(options) {
  const name = options.name;
  await writeTextFile({
    path: p.userViewsPath(`${name}.vue`),
    data: `<script setup lang="ts">
console.log('Hello World page created')
</script>

<template>
  <div>
    Visit http://127.0.0.1/${name}
  </div>
</template>
`
  });
}
async function makeFunction(options) {
  try {
    const name = options.name;
    log.info("Creating your function...");
    await createFunction(options);
    log.success(`Created ${name} function`);
  } catch (error) {
    log.error("There was an error creating your function", error);
    process.exit();
  }
}
async function createFunction(options) {
  const name = options.name;
  await writeTextFile({
    path: p.userFunctionsPath(`${name}.ts`),
    data: `// reactive state
const ${name} = ref(0)

// functions that mutate state and trigger updates
function increment() {
  ${name}.value++
}

export {
  ${name},
  increment,
}
`
  });
}
async function makeLanguage(options) {
  try {
    const name = options.name;
    log.info("Creating your translation file...");
    await createLanguage(options);
    log.success(`Created ${name} translation file`);
  } catch (error) {
    log.error("There was an error creating your language.", error);
    process.exit();
  }
}
async function createLanguage(options) {
  const name = options.name;
  await writeTextFile({
    path: p.resourcesPath(`lang/${name}.yml`),
    data: `button:
  text: Copy
`
  });
}
function makeStack(options) {
  try {
    const name = options.name;
    log.info(`Creating your ${name} stack...`);
    const path = resolve(process.cwd(), name);
    log.success("Successfully scaffolded your project");
    log.info(`cd ${path} && bun install`);
  } catch (error) {
    log.error("There was an error creating your stack", error);
    process.exit();
  }
}
async function createNotification(options) {
  const name = options.name;
  try {
    let importOption = "EmailOptions";
    if (!doesFolderExist("notifications"))
      await createFolder("./notifications");
    if (options.chat)
      importOption = "ChatOptions";
    if (options.sms)
      importOption = "SMSOptions";
    await writeTextFile({
      path: p.userNotificationsPath(`${name}.ts`),
      data: `import type { ${importOption} } from '@stacksjs/types'

function content(): string {
  return 'example'
}

function send(): ${importOption} {
  return {
    content: content(),
  }
}`
    });
    return true;
  } catch (error) {
    handleError("Error creating notification", error);
    return false;
  }
}
async function createMigration(options) {
  const optionName = options.name;
  const table = "dummy-name";
  if (!optionName[0])
    throw new Error("options.name is required and cannot be empty");
  const name = optionName[0].toUpperCase() + optionName.slice(1);
  const path = frameworkPath(`database/migrations/${name}.ts`);
  try {
    await writeTextFile({
      path: `${path}`,
      data: `import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('${table}')
    .addColumn('id', 'integer', col => col.autoIncrement().primaryKey())
    .execute()
}`
    });
    log.success(`Successfully created your migration file at stacks/database/migrations/${name}.ts`);
  } catch (error) {
    log.error(error);
  }
}
async function makeQueueTable() {
  await runAction(Action.QueueTable);
}
async function makeCertificate() {
  const domain = await localUrl();
  log.info(`Creating SSL certificate...`);
  await runCommand(`tlsx ${domain}`, {
    cwd: p.storagePath("keys")
  });
  log.success("Certificate created");
  log.info(`Installing SSL certificate...`);
  await runCommand(`tlsx -install`, {
    cwd: p.storagePath("keys")
  });
  log.success("Certificate installed");
}
async function createModel(options) {
  const optionName = options.name;
  if (!optionName[0])
    throw new Error("options.name is required and cannot be empty");
  const name = optionName[0].toUpperCase() + optionName.slice(1);
  const path = p.userModelsPath(`${name}.ts`);
  try {
    await writeTextFile({
      path: `${path}`,
      data: `import { faker } from '@stacksjs/faker'
import { schema } from '@stacksjs/validation'
import type { Model } from '@stacksjs/types'

export default {
  name: '${name}',

  traits: {
    useTimestamps: true,

    useSeeder: {
      count: 10,
    },
  },

  attributes: {
    // your attributes here
  },
} satisfies Model`
    });
    log.success(`Model created: ${italic(`app/Models/${name}.ts`)}`);
  } catch (error) {
    log.error(error);
  }
}
export {
  makeStack,
  makeQueueTable,
  makePage,
  makeNotification,
  makeLanguage,
  makeFunction,
  makeDatabase,
  makeComponent,
  makeCertificate,
  makeAction,
  make,
  invoke,
  factory,
  createPage,
  createNotification,
  createModel,
  createMigration,
  createLanguage,
  createFunction,
  createFactory,
  createDatabase,
  createComponent,
  createAction
};

export { make, makeAction, makeComponent, createComponent, makeDatabase, createDatabase, createFactory, makeNotification, makePage, createPage, makeFunction, createFunction, makeLanguage, createLanguage, makeStack, createNotification, createMigration, makeQueueTable, makeCertificate, createModel };
