import { join } from 'node:path';
import { ESLintUtils } from '@typescript-eslint/utils';
import { createSyncFn } from 'synckit';
import { distDir } from './dirs.mjs';
import MagicString from 'magic-string';
import 'node:url';

const CLASS_FIELDS = ["class", "classname"];
const AST_NODES_WITH_QUOTES = ["Literal", "VLiteral"];

const syncAction = createSyncFn(join(distDir, "worker.mjs"));
const createRule = ESLintUtils.RuleCreator(
  () => "https://unocss.dev/integrations/eslint#rules"
);

const IGNORE_ATTRIBUTES = ["style", "class", "classname", "value"];
const orderAttributify = createRule({
  create(context) {
    const scriptVisitor = {};
    const templateBodyVisitor = {
      VStartTag(node) {
        const valueless = node.attributes.filter((i) => typeof i.key?.name === "string" && !IGNORE_ATTRIBUTES.includes(i.key?.name?.toLowerCase()) && i.value == null);
        if (!valueless.length)
          return;
        const input = valueless.map((i) => i.key.name).join(" ").trim();
        const sorted = syncAction(
          context.settings.unocss?.configPath,
          "sort",
          input
        );
        if (sorted !== input) {
          context.report({
            fix(fixer) {
              const codeFull = context.getSourceCode();
              const offset = node.range[0];
              const code = codeFull.getText().slice(node.range[0], node.range[1]);
              const s = new MagicString(code);
              const sortedNodes = valueless.map((i) => [i.range[0] - offset, i.range[1] - offset]).sort((a, b) => b[0] - a[0]);
              for (const [start, end] of sortedNodes.slice(1))
                s.remove(start, end);
              s.overwrite(sortedNodes[0][0], sortedNodes[0][1], ` ${sorted.trim()} `);
              return fixer.replaceText(node, s.toString());
            },
            messageId: "invalid-order",
            node
          });
        }
      }
    };
    const parserServices = context?.sourceCode.parserServices || context.parserServices;
    if (parserServices == null || parserServices.defineTemplateBodyVisitor == null) {
      return scriptVisitor;
    } else {
      return parserServices?.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor);
    }
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: "Order of UnoCSS attributes"
    },
    fixable: "code",
    messages: {
      "invalid-order": "UnoCSS attributes are not ordered"
    },
    schema: [],
    type: "layout"
  },
  name: "order-attributify"
});

const blocklist = createRule({
  create(context) {
    const checkLiteral = (node) => {
      if (typeof node.value !== "string" || !node.value.trim())
        return;
      const input = node.value;
      const blocked = syncAction(
        context.settings.unocss?.configPath,
        "blocklist",
        input,
        context.filename
      );
      blocked.forEach(([name, meta]) => {
        context.report({
          data: {
            name,
            reason: meta?.message ? `: ${meta.message}` : ""
          },
          messageId: "in-blocklist",
          node
        });
      });
    };
    const scriptVisitor = {
      JSXAttribute(node) {
        if (typeof node.name.name === "string" && CLASS_FIELDS.includes(node.name.name.toLowerCase()) && node.value) {
          if (node.value.type === "Literal")
            checkLiteral(node.value);
        }
      },
      SvelteAttribute(node) {
        if (node.key.name === "class") {
          if (node.value?.[0].type === "SvelteLiteral")
            checkLiteral(node.value[0]);
        }
      }
    };
    const templateBodyVisitor = {
      VAttribute(node) {
        if (node.key.name === "class") {
          if (node.value.type === "VLiteral")
            checkLiteral(node.value);
        }
      },
      // Attributify
      VStartTag(node) {
        const valueless = node.attributes.filter((i) => typeof i.key?.name === "string" && !IGNORE_ATTRIBUTES.includes(i.key?.name?.toLowerCase()) && i.value == null);
        if (!valueless.length)
          return;
        for (const node2 of valueless) {
          if (!node2?.key?.name)
            continue;
          const blocked = syncAction(
            context.settings.unocss?.configPath,
            "blocklist",
            node2.key.name,
            context.filename
          );
          blocked.forEach(([name, meta]) => {
            context.report({
              data: {
                name,
                reason: meta?.message ? `: ${meta.message}` : ""
              },
              messageId: "in-blocklist",
              node: node2
            });
          });
        }
      }
    };
    const parserServices = context?.sourceCode.parserServices || context.parserServices;
    if (parserServices == null || parserServices.defineTemplateBodyVisitor == null) {
      return scriptVisitor;
    } else {
      return parserServices?.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor);
    }
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: "Utilities in UnoCSS blocklist"
    },
    fixable: "code",
    messages: {
      "in-blocklist": '"{{name}}" is in blocklist{{reason}}'
    },
    schema: [],
    type: "problem"
  },
  name: "blocklist"
});

const enforceClassCompile = createRule({
  create(context, [mergedOptions]) {
    const CLASS_COMPILE_PREFIX = `${mergedOptions.prefix} `;
    const ENABLE_FIX = mergedOptions.enableFix;
    function report({ fix, node }) {
      context.report({
        data: { prefix: CLASS_COMPILE_PREFIX.trim() },
        fix: (...args) => ENABLE_FIX ? fix(...args) : null,
        loc: node.loc,
        messageId: "missing",
        node
      });
    }
    const scriptVisitor = {
      JSXAttribute(_node) {
      },
      SvelteAttribute(_node) {
      }
    };
    const reportClassList = (node, classList) => {
      if (classList.startsWith(CLASS_COMPILE_PREFIX))
        return;
      report({
        fix(fixer) {
          return fixer.replaceTextRange([node.range[0] + 1, node.range[1] - 1], `${CLASS_COMPILE_PREFIX}${classList}`);
        },
        node
      });
    };
    const templateBodyVisitor = {
      [`VAttribute[key.argument.name=class] VExpressionContainer Literal:not(ConditionalExpression .test Literal):not(Property .value Literal)`](literal) {
        if (!literal.value || typeof literal.value !== "string")
          return;
        reportClassList(literal, literal.value);
      },
      [`VAttribute[key.argument.name=class] VExpressionContainer Property`](property) {
        if (property.key.type !== "Identifier")
          return;
        const classListString = property.key.name;
        if (classListString.startsWith(CLASS_COMPILE_PREFIX))
          return;
        report({
          fix(fixer) {
            let replacePropertyKeyText = `'${CLASS_COMPILE_PREFIX}${classListString}'`;
            if (property.shorthand)
              replacePropertyKeyText = `${replacePropertyKeyText}: ${classListString}`;
            return fixer.replaceTextRange(property.key.range, replacePropertyKeyText);
          },
          node: property.key
        });
      },
      [`VAttribute[key.argument.name=class] VExpressionContainer TemplateElement`](templateElement) {
        if (!templateElement.value.raw)
          return;
        reportClassList(templateElement, templateElement.value.raw);
      },
      [`VAttribute[key.name=class]`](attr) {
        const valueNode = attr.value;
        if (!valueNode || !valueNode.value)
          return;
        reportClassList(valueNode, valueNode.value);
      }
    };
    const parserServices = context?.sourceCode.parserServices || context.parserServices;
    if (parserServices == null || parserServices.defineTemplateBodyVisitor == null) {
      return scriptVisitor;
    } else {
      return parserServices?.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor);
    }
  },
  defaultOptions: [{ enableFix: true, prefix: ":uno:" }],
  meta: {
    docs: {
      description: "Enforce class compilation"
    },
    fixable: "code",
    messages: {
      missing: "prefix: `{{prefix}}` is missing"
    },
    schema: [{
      additionalProperties: false,
      properties: {
        enableFix: {
          type: "boolean"
        },
        prefix: {
          type: "string"
        }
      },
      type: "object"
    }],
    type: "problem"
  },
  name: "enforce-class-compile"
});

const order = createRule({
  create(context) {
    function checkLiteral(node) {
      if (typeof node.value !== "string" || !node.value.trim())
        return;
      const input = node.value;
      const sorted = syncAction(
        context.settings.unocss?.configPath,
        "sort",
        input
      ).trim();
      if (sorted !== input) {
        context.report({
          fix(fixer) {
            if (AST_NODES_WITH_QUOTES.includes(node.type))
              return fixer.replaceTextRange([node.range[0] + 1, node.range[1] - 1], sorted);
            else
              return fixer.replaceText(node, sorted);
          },
          messageId: "invalid-order",
          node
        });
      }
    }
    const scriptVisitor = {
      JSXAttribute(node) {
        if (typeof node.name.name === "string" && CLASS_FIELDS.includes(node.name.name.toLowerCase()) && node.value) {
          if (node.value.type === "Literal")
            checkLiteral(node.value);
        }
      },
      SvelteAttribute(node) {
        if (node.key.name === "class") {
          if (node.value?.[0].type === "SvelteLiteral")
            checkLiteral(node.value[0]);
        }
      }
    };
    const templateBodyVisitor = {
      VAttribute(node) {
        if (node.key.name === "class") {
          if (node.value.type === "VLiteral")
            checkLiteral(node.value);
        }
      }
    };
    const parserServices = context?.sourceCode.parserServices || context.parserServices;
    if (parserServices == null || parserServices.defineTemplateBodyVisitor == null) {
      return scriptVisitor;
    } else {
      return parserServices?.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor);
    }
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: "Order of UnoCSS utilities in class attribute"
    },
    fixable: "code",
    messages: {
      "invalid-order": "UnoCSS utilities are not ordered"
    },
    schema: [],
    type: "layout"
  },
  name: "order"
});

const plugin = {
  rules: {
    blocklist,
    "enforce-class-compile": enforceClassCompile,
    order,
    "order-attributify": orderAttributify
  }
};

const configsFlat = {
  plugins: {
    unocss: plugin
  },
  rules: {
    "unocss/order": "warn",
    "unocss/order-attributify": "warn"
  }
};

const configsRecommended = {
  plugins: ["@unocss"],
  rules: {
    "@unocss/order": "warn",
    "@unocss/order-attributify": "warn"
  }
};

const index = {
  ...plugin,
  configs: {
    flat: configsFlat,
    recommended: configsRecommended
  }
};

export { index as default };
