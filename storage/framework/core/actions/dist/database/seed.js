// @bun
import {
  seed
} from "../chunk-jdfnxamh.js";
import"../chunk-kxsrvkd8.js";
import"../chunk-389b9wtx.js";
import"../chunk-e9syc5kq.js";
import"../chunk-jycndeyj.js";
import"../chunk-1j66gxht.js";

// src/database/seed.ts
import process from "process";
import { log } from "@stacksjs/cli";
log.info("Seeding database...");
await seed();
process.exit(0);
