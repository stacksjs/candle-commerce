// @bun
import {
  commit
} from "./commit.js";
import {
  createComponent,
  createDatabase,
  createFactory,
  createFunction,
  createLanguage,
  createMiddleware,
  createMigration,
  createModel,
  createNotification,
  createPage,
  make,
  makeAction,
  makeCertificate,
  makeComponent,
  makeDatabase,
  makeFunction,
  makeLanguage,
  makeNotification,
  makePage,
  makeQueueTable,
  makeStack
} from "./make.js";
import {
  add
} from "./add.js";
import {
  generate,
  generateComponentMeta,
  generateCoreSymlink,
  generateIdeHelpers,
  generateLibEntries,
  generateOpenApiSpec,
  generatePkgxConfig,
  generateSeeder,
  generateTypes,
  generateVsCodeCustomData,
  generateWebTypes,
  invoke
} from "./generate/index.js";
import"./chunk-0gc6v0f2.js";
import"./chunk-n15ser40.js";
import"./chunk-3c1jpby0.js";
import"./chunk-w88kkvg9.js";
import"./chunk-b9x6g0z3.js";
import"./chunk-wnsa83r3.js";
import"./chunk-9xtmc45q.js";
import"./chunk-acrzjgsw.js";
import"./chunk-zzerxbrm.js";
import"./chunk-a6zghhmf.js";
import"./chunk-nxefcthm.js";
import"./chunk-yy4683da.js";
import"./chunk-1mr9ryxr.js";
import"./helpers/vscode-custom-data.js";
import"./chunk-r0f7edw2.js";
import"./chunk-494jp8d5.js";
import"./chunk-kmvsfpmq.js";
import"./chunk-31w5ygdv.js";
import"./chunk-xjn4vpw3.js";
import"./chunk-3vsmxw3t.js";
import"./chunk-6dza9hpj.js";
import"./chunk-mffax2kj.js";
import"./chunk-5y2n067z.js";
import {
  runApiDevServer,
  runBackendDevServer,
  runComponentsDevServer,
  runDashboardDevServer,
  runDesktopDevServer,
  runDevServer,
  runDocsDevServer,
  runFrontendDevServer,
  runSystemTrayDevServer
} from "./dev/index.js";
import"./chunk-ze46550n.js";
import {
  hasAction,
  runAction,
  runActions
} from "./helpers/utils.js";
import"./chunk-tsfemdz5.js";

// src/action.ts
class Action {
  name;
  description;
  rate;
  tries;
  backoff;
  enabled;
  path;
  method;
  validations;
  requestFile;
  handle;
  model;
  constructor({
    name,
    description,
    validations,
    handle,
    rate,
    tries,
    backoff,
    enabled,
    path,
    method,
    requestFile,
    model
  }) {
    this.name = name;
    this.description = description;
    this.validations = validations;
    this.rate = rate;
    this.tries = tries;
    this.backoff = backoff;
    this.enabled = enabled;
    this.path = path;
    this.method = method;
    this.handle = handle;
    this.requestFile = requestFile;
    this.model = model;
  }
}
export {
  runSystemTrayDevServer,
  make as runMake,
  runFrontendDevServer,
  runDocsDevServer,
  runDevServer,
  runDesktopDevServer,
  runDashboardDevServer,
  runComponentsDevServer,
  commit as runCommit,
  runBackendDevServer,
  runApiDevServer,
  add as runAdd,
  runActions,
  runAction,
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
  invoke,
  hasAction,
  generateWebTypes,
  generateVsCodeCustomData,
  generateTypes,
  generateSeeder,
  generatePkgxConfig,
  generateOpenApiSpec,
  generateLibEntries,
  generateIdeHelpers,
  generateCoreSymlink,
  generateComponentMeta,
  generate,
  createPage,
  createNotification,
  createModel,
  createMigration,
  createMiddleware,
  createLanguage,
  createFunction,
  createFactory,
  createDatabase,
  createComponent,
  Action
};
