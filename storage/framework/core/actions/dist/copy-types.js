#!/usr/bin/env bun
// @bun

// src/copy-types.ts
import { frameworkPath } from "@stacksjs/path";
import { copyFolder } from "@stacksjs/storage";
var destinations = [
  [frameworkPath("dist/types/components"), frameworkPath("defaults/components/vue/dist/types")],
  [frameworkPath("dist/types/components"), frameworkPath("defaults/components/web/dist/types")],
  [frameworkPath("dist/types/functions"), frameworkPath("defaults/functions/dist/types")]
];
destinations.forEach(([src, dest]) => {
  copyFolder(src, dest);
});
