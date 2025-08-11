"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/config-worker.ts
async function loadConfigAsync(cwd) {
  const { loadConfig } = await Promise.resolve().then(() => _interopRequireWildcard(require("unconfig")));
  const { config } = await loadConfig({
    sources: [
      {
        files: "vue-macros.config",
        extensions: ["mts", "cts", "ts", "mjs", "cjs", "js", "json", ""]
      },
      {
        files: "package.json",
        extensions: [],
        rewrite: (config2) => _optionalChain([config2, 'optionalAccess', _ => _.vueMacros])
      }
    ],
    defaults: {},
    cwd
  });
  delete config.plugins;
  return config;
}



exports.loadConfigAsync = loadConfigAsync;
