// @bun
import"./chunk-tsfemdz5.js";

// src/add.ts
import { installPackage } from "@stacksjs/cli";
async function invoke(options) {
  if (options?.table)
    await addTable();
  if (options?.calendar)
    await addCalendar();
}
async function add(options) {
  return await invoke(options);
}
async function addTable() {
  await installPackage("@stacksjs/table");
}
async function addCalendar() {
  await installPackage("@stacksjs/calendar");
}
async function installPackages(names) {
  for (const name of names)
    await installPackage(name);
}
export {
  invoke,
  installPackages,
  addTable,
  addCalendar,
  add
};

export { add };
