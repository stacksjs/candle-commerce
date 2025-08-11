// @bun
import"../chunk-jycndeyj.js";
import"../chunk-1j66gxht.js";

// src/build/core.ts
var {$ } = globalThis.Bun;
import process from "process";
import { dim, italic, log } from "@stacksjs/cli";
import { corePath } from "@stacksjs/path";
import { glob } from "@stacksjs/storage";
log.info("Building core packages");
var dirs = (await glob([corePath("*")], { onlyDirectories: true })).sort();
if (dirs.length === 0) {
  log.info("No core packages found");
  process.exit(1 /* FatalError */);
}
for (const folder of dirs) {
  log.info(`\uD83C\uDFD7\uFE0F  Building ${italic(dim(folder))}`);
  $.cwd(folder);
  await $`bun run build`;
  log.success(`${italic(dim(folder))} built`);
  console.log(``);
}
