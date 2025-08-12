// @bun
import {
  seed
} from "../chunk-kmvsfpmq.js";
import"../chunk-31w5ygdv.js";
import"../chunk-xjn4vpw3.js";
import"../chunk-3vsmxw3t.js";
import"../chunk-6dza9hpj.js";
import"../chunk-mffax2kj.js";
import"../chunk-5y2n067z.js";
import"../chunk-tsfemdz5.js";

// src/database/seed.ts
import process from "process";
import { log } from "@stacksjs/cli";
log.info("Seeding database...");
await seed();
process.exit(0);
