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
import"./chunk-ha4gh26a.js";
import"./chunk-50tnyd8h.js";
import"./chunk-8pca1d4b.js";
import"./chunk-3rkn8egm.js";
import"./chunk-1yw79y36.js";
import"./chunk-z7g8sgtg.js";
import"./chunk-0be2fzx4.js";
import"./chunk-1n9mxrp7.js";
import"./chunk-zzerxbrm.js";
import"./chunk-geb98aw8.js";
import"./chunk-p8vym9ay.js";
import"./chunk-0rra9d59.js";
import"./chunk-zpek37sa.js";
import"./helpers/vscode-custom-data.js";
import"./chunk-skftfmsf.js";
import"./chunk-494jp8d5.js";
import"./chunk-jdfnxamh.js";
import"./chunk-kxsrvkd8.js";
import"./chunk-389b9wtx.js";
import"./chunk-e9syc5kq.js";
import"./chunk-jycndeyj.js";
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
import"./chunk-1j66gxht.js";

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
  createLanguage,
  createFunction,
  createFactory,
  createDatabase,
  createComponent,
  Action
};
