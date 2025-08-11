// ../../../../config/library.ts
var library_default = {
  name: "hello-world",
  owner: "@stacksjs",
  repository: "stacksjs/stacks",
  license: "MIT",
  author: "Chris Breuer",
  contributors: ["Chris Breuer <chris@stacksjs.org>"],
  defaultLanguage: "en",
  releaseable: true,
  vueComponents: {
    name: "hello-world-vue",
    description: "Your Vue component library description",
    keywords: ["component", "library", "vue", "vite", "typescript", "javascript"],
    tags: [
      {
        name: ["HelloWorld", "AppHelloWorld"],
        description: "The Hello World custom element, built via this framework.",
        attributes: [
          {
            name: "greeting",
            description: "The greeting."
          }
        ]
      }
    ]
  },
  webComponents: {
    name: "hello-world-elements",
    description: "Your framework agnostic web component library description.",
    keywords: ["custom-elements", "web-components", "library", "framework-agnostic", "typescript", "javascript"],
    tags: [
      {
        name: ["HelloWorld", "AppHelloWorld"],
        description: "The Hello World custom element, built via this framework.",
        attributes: [
          {
            name: "greeting",
            description: "The greeting."
          }
        ]
      }
    ]
  },
  functions: {
    name: "hello-world-fx",
    description: "Your function library description.",
    keywords: ["functions", "composables", "library", "typescript", "javascript"],
    shouldGenerateSourcemap: false,
    files: ["counter", "dark"]
  }
};

export { library_default };
