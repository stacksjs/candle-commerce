// src/config-worker.ts
async function loadConfigAsync(cwd) {
  const { loadConfig } = await import("unconfig");
  const { config } = await loadConfig({
    sources: [
      {
        files: "vue-macros.config",
        extensions: ["mts", "cts", "ts", "mjs", "cjs", "js", "json", ""]
      },
      {
        files: "package.json",
        extensions: [],
        rewrite: (config2) => config2?.vueMacros
      }
    ],
    defaults: {},
    cwd
  });
  delete config.plugins;
  return config;
}

export {
  loadConfigAsync
};
