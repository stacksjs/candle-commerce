import {
  addCode,
  getStart,
  getText,
  isJsxExpression
} from "./chunk-IT4DIA5L.mjs";

// src/jsx-directive.ts
import { createFilter } from "@vue-macros/common";
import { createPlugin } from "ts-macro";

// src/jsx-directive/index.ts
import { replaceSourceRange as replaceSourceRange10 } from "muggle-string";

// src/jsx-directive/context.ts
import { replaceSourceRange } from "muggle-string";
function resolveCtxMap(ctxNodeMap, options) {
  if (ctxNodeMap.size) {
    options.codes.push(`
type __VLS_IsAny<T> = 0 extends 1 & T ? true : false;
type __VLS_PickNotAny<A, B> = __VLS_IsAny<A> extends true ? B : A;
type __VLS_Element = globalThis.JSX.Element;
function __VLS_asFunctionalComponent<T, K = T extends new (...args: any) => any ? InstanceType<T> : unknown>(t: T, instance?: K):
  T extends new (...args: any) => any
  ? (props: (K extends { $props: infer Props } ? Props : any) & Record<string, unknown>, ctx?: any) => __VLS_Element & { __ctx?: {
    attrs?: any,
    slots?: K extends { $scopedSlots: infer Slots } ? Slots : K extends { $slots: infer Slots } ? Slots : any,
    emit?: K extends { $emit: infer Emit } ? Emit : any
  } & { props?: (K extends { $props: infer Props } ? Props : any) & Record<string, unknown>; expose?(exposed: K): void; } }
  : T extends () => any ? (props: {}, ctx?: any) => ReturnType<T>
  : T extends (...args: any) => any ? T
  : (_: {} & Record<string, unknown>, ctx?: any) => { __ctx?: { attrs?: any, expose?: any, slots?: any, emit?: any, props?: {} & Record<string, unknown> } };
const __VLS_nativeElements = {
  ...{} as SVGElementTagNameMap,
  ...{} as HTMLElementTagNameMap,
};
function __VLS_getFunctionalComponentCtx<T, K, const S>(
  comp: T,
  compInstance: K,
  s: S,
): S extends keyof typeof __VLS_nativeElements
  ? { expose: (exposed: (typeof __VLS_nativeElements)[S]) => any }
  : '__ctx' extends keyof __VLS_PickNotAny<K, {}>
    ? K extends { __ctx?: infer Ctx }
      ? Ctx
      : never
    : T extends (props: infer P, ctx: infer Ctx) => any
      ? { props: P; slots: P['vSlots']; expose: P['vExpose'] } & Ctx
      : {};
`);
  }
  return new Map(
    Array.from(ctxNodeMap).map(([node, root], index) => [
      node,
      transformCtx(node, root, index, options)
    ])
  );
}
function transformCtx(node, root, index, options) {
  const { ts, codes, prefix } = options;
  const openingElement = getOpeningElement(node, options);
  if (!openingElement) return "";
  let props = "";
  let refValue;
  for (const prop of openingElement.attributes.properties) {
    if (!ts.isJsxAttribute(prop)) continue;
    let name = getText(prop.name, options);
    if (name === "ref" && prop.initializer && isJsxExpression(prop.initializer) && prop.initializer.expression) {
      refValue = getRefValue(prop.initializer.expression, options);
      continue;
    }
    if (name.startsWith(`${prefix}model`)) {
      name = name.split("_")[0].split(":")[1] || "modelValue";
    } else if (name.includes("_")) {
      name = name.split("_")[0];
    } else if (prefix && name.startsWith(prefix)) {
      continue;
    }
    const value = prop.initializer ? isJsxExpression(prop.initializer) && prop.initializer.expression ? getText(prop.initializer.expression, options) : getText(prop.initializer, options) : "true";
    props += `'${name}': ${value},`;
  }
  const ctxName = `__VLS_ctx_${refValue || index}`;
  const tagName = getTagName(node, { ...options, withTypes: true });
  const result = `
const ${ctxName} = __VLS_getFunctionalComponentCtx(${tagName}, __VLS_asFunctionalComponent(${tagName})({${props}}), '${tagName}');
`;
  if (root) {
    replaceSourceRange(
      codes,
      options.source,
      root.end - 1,
      root.end - 1,
      result
    );
  } else {
    addCode(codes, result);
  }
  return ctxName;
}
function getRefValue(expression, options) {
  const { ts } = options;
  if (ts.isIdentifier(expression)) {
    return getText(expression, options);
  } else if (ts.isFunctionLike(expression)) {
    let left;
    if (ts.isBinaryExpression(expression.body)) {
      left = expression.body.left;
    }
    ts.forEachChild(expression.body, (node) => {
      if (ts.isBinaryExpression(node)) {
        left = node.left;
      } else if (ts.isExpressionStatement(node) && ts.isBinaryExpression(node.expression)) {
        left = node.expression.left;
      }
    });
    return left && getText(
      ts.isPropertyAccessExpression(left) || ts.isElementAccessExpression(left) ? left.expression : left,
      options
    );
  } else if (ts.isCallExpression(expression) && expression.arguments[0] && ts.isIdentifier(expression.arguments[0])) {
    return getText(expression.arguments[0], options);
  }
}

// src/jsx-directive/custom-directive.ts
import { replaceSourceRange as replaceSourceRange2 } from "muggle-string";
import { allCodeFeatures } from "ts-macro";
function transformCustomDirective(attributes, options) {
  if (!attributes.length) return;
  attributes.forEach((attribute) => transform(attribute, options));
  options.codes.push(`
type __VLS_ResolveDirective<T> = T extends import('vue').Directive<
  any,
  infer V,
  infer M extends string,
  infer A extends string
>
  ? [any, V, A, Record<M, true>]
  : any;
`);
}
function transform(attribute, options) {
  const { codes, source, ts, ast } = options;
  const attributeName = getText(attribute.name, options);
  let directiveName = attributeName.split(/\s/)[0].split("v-")[1];
  let modifiers = [];
  if (directiveName.includes("_")) {
    ;
    [directiveName, ...modifiers] = directiveName.split("_");
  }
  if (directiveName)
    directiveName = directiveName[0].toUpperCase() + directiveName.slice(1);
  let arg;
  if (directiveName.includes(":")) {
    ;
    [directiveName, arg] = directiveName.split(":");
  }
  const start = getStart(attribute, options);
  const offset = start + directiveName.length + 2;
  replaceSourceRange2(
    codes,
    source,
    start,
    attribute.end,
    [ast.text.slice(start, offset), source, start, { verification: true }],
    `={[`,
    [`v`, source, start, { ...allCodeFeatures, verification: false }],
    [
      directiveName,
      source,
      start + 2,
      { ...allCodeFeatures, verification: false }
    ],
    `,`,
    attribute.initializer ? [
      ts.isStringLiteral(attribute.initializer) ? getText(attribute.initializer, options) : getText(attribute.initializer, options).slice(1, -1),
      source,
      getStart(attribute.initializer, options) + (ts.isStringLiteral(attribute.initializer) ? 0 : 1),
      allCodeFeatures
    ] : "{} as any",
    ",",
    ...arg !== void 0 ? [
      [`'`, source, offset + 1, { verification: true }],
      [arg, source, offset + 1, allCodeFeatures],
      [
        `'`,
        source,
        offset + arg.length,
        allCodeFeatures,
        { verification: true }
      ]
    ] : ["{} as any"],
    ",",
    ...modifiers.length ? [
      "{",
      ...modifiers.flatMap((modify, index) => [
        modify ? "" : `'`,
        [
          modify,
          source,
          getStart(attribute, options) + (attributeName.indexOf("_") + 1) + (index ? modifiers.slice(0, index).join("").length + index : 0),
          allCodeFeatures
        ],
        modify ? ": true," : `'`
      ]),
      "}"
    ] : ["{} as any"],
    `] satisfies __VLS_ResolveDirective<typeof v${directiveName}>}`
  );
}

// src/jsx-directive/ref.ts
import { replaceSourceRange as replaceSourceRange3 } from "muggle-string";
import { allCodeFeatures as allCodeFeatures2 } from "ts-macro";
function transformRef(nodes, ctxMap, options) {
  const { codes, source, ts } = options;
  for (const { node, attribute } of nodes) {
    if (attribute.initializer && isJsxExpression(attribute.initializer) && attribute.initializer.expression && (ts.isFunctionExpression(attribute.initializer.expression) || ts.isArrowFunction(attribute.initializer.expression))) {
      replaceSourceRange3(
        codes,
        source,
        getStart(attribute, options),
        attribute.end,
        "{...({ ",
        ["ref", source, getStart(attribute.name, options), allCodeFeatures2],
        ": ",
        [
          getText(attribute.initializer.expression, options),
          source,
          getStart(attribute.initializer.expression, options),
          allCodeFeatures2
        ],
        `} satisfies { ref: (e: Parameters<typeof ${ctxMap.get(node)}.expose>[0]) => any }) as {}}`
      );
    }
  }
}

// src/jsx-directive/v-bind.ts
import { replaceSourceRange as replaceSourceRange4 } from "muggle-string";
function transformVBind(nodes, options) {
  if (nodes.length === 0) return;
  const { codes, source } = options;
  for (const { attribute } of nodes) {
    const attributeName = getText(attribute.name, options);
    const start = getStart(attribute.name, options);
    const end = attribute.name.end;
    if (attributeName.includes("_")) {
      replaceSourceRange4(codes, source, start + attributeName.indexOf("_"), end);
    }
  }
}

// src/jsx-directive/v-for.ts
import { replaceSourceRange as replaceSourceRange5 } from "muggle-string";
import { allCodeFeatures as allCodeFeatures3 } from "ts-macro";
function resolveVFor(attribute, options) {
  const { ts, ast, source } = options;
  const result = [];
  if (isJsxExpression(attribute.initializer) && attribute.initializer.expression && ts.isBinaryExpression(attribute.initializer.expression)) {
    let index;
    let objectIndex;
    let item = attribute.initializer.expression.left;
    const list = attribute.initializer.expression.right;
    if (ts.isParenthesizedExpression(item)) {
      if (ts.isBinaryExpression(item.expression)) {
        if (ts.isBinaryExpression(item.expression.left)) {
          index = item.expression.left.right;
          objectIndex = item.expression.right;
          item = item.expression.left.left;
        } else {
          index = item.expression.right;
          item = item.expression.left;
        }
      } else {
        item = item.expression;
      }
    }
    if (item && list) {
      result.push(
        "__VLS_getVForSourceType(",
        [
          ast.text.slice(getStart(list, options), list.end),
          source,
          getStart(list, options),
          allCodeFeatures3
        ],
        ").map(([",
        [
          String(ast.text.slice(getStart(item, options), item.end)),
          source,
          getStart(item, options),
          allCodeFeatures3
        ],
        ", ",
        index ? [
          String(ast.text.slice(getStart(index, options), index.end)),
          source,
          getStart(index, options),
          allCodeFeatures3
        ] : objectIndex ? "undefined" : "",
        ...objectIndex ? [
          ", ",
          [
            String(
              ast?.text.slice(
                getStart(objectIndex, options),
                objectIndex.end
              )
            ),
            source,
            getStart(objectIndex, options),
            allCodeFeatures3
          ]
        ] : "",
        "]) => "
      );
    }
  }
  return result;
}
function transformVFor(nodes, options) {
  if (!nodes.length) return;
  const { codes, source } = options;
  nodes.forEach(({ attribute, node, parent }) => {
    const result = resolveVFor(attribute, options);
    if (parent) {
      result.unshift("{");
    }
    replaceSourceRange5(codes, source, node.pos, node.pos, ...result);
    replaceSourceRange5(
      codes,
      source,
      node.end - 1,
      node.end,
      `>)${parent ? "}" : ""}`
    );
    replaceSourceRange5(
      codes,
      source,
      getStart(attribute, options),
      attribute.end
    );
  });
  codes.push(`
declare function __VLS_getVForSourceType(source: number): [number, number, number][];
declare function __VLS_getVForSourceType(source: string): [string, number, number][];
declare function __VLS_getVForSourceType<T extends any[]>(source: T): [
  item: T[number],
  key: number,
  index: number,
][];
declare function __VLS_getVForSourceType<T extends { [Symbol.iterator](): Iterator<any> }>(source: T): [
  item: T extends { [Symbol.iterator](): Iterator<infer T1> } ? T1 : never, 
  key: number,
  index: undefined,
][];
declare function __VLS_getVForSourceType<T extends number | { [Symbol.iterator](): Iterator<any> }>(source: T): [
  item: number | (Exclude<T, number> extends { [Symbol.iterator](): Iterator<infer T1> } ? T1 : never), 
  key: number,
  index: undefined,
][];
declare function __VLS_getVForSourceType<T>(source: T): [
  item: T[keyof T],
  key: keyof T,
  index: number,
][];
`);
}

// src/jsx-directive/v-if.ts
import { replaceSourceRange as replaceSourceRange6 } from "muggle-string";
import { allCodeFeatures as allCodeFeatures4 } from "ts-macro";
function transformVIf(nodes, options) {
  const { codes, ts, source, prefix } = options;
  nodes.forEach(({ node, attribute, parent }, index) => {
    if (!ts.isIdentifier(attribute.name)) return;
    if ([`${prefix}if`, `${prefix}else-if`].includes(
      getText(attribute.name, options)
    ) && isJsxExpression(attribute.initializer) && attribute.initializer.expression) {
      const hasScope = parent && attribute.name.escapedText === `${prefix}if`;
      replaceSourceRange6(
        codes,
        source,
        node.pos,
        node.pos,
        `${hasScope ? "{" : " "}(`,
        [
          getText(attribute.initializer.expression, options),
          source,
          getStart(attribute.initializer.expression, options),
          allCodeFeatures4
        ],
        ") ? "
      );
      const nextAttribute = nodes[index + 1]?.attribute;
      const nextNodeHasElse = nextAttribute && ts.isIdentifier(nextAttribute.name) ? String(nextAttribute.name.escapedText).startsWith(`${prefix}else`) : false;
      replaceSourceRange6(
        codes,
        source,
        node.end,
        node.end,
        nextNodeHasElse ? " : " : ` : null${parent ? "}" : ""}`
      );
    } else if (attribute.name.escapedText === `${prefix}else`) {
      replaceSourceRange6(codes, source, node.end, node.end, parent ? "}" : "");
    }
    replaceSourceRange6(
      codes,
      source,
      getStart(attribute, options),
      attribute.end
    );
  });
}

// src/jsx-directive/v-model.ts
import { replaceSourceRange as replaceSourceRange7 } from "muggle-string";
import { allCodeFeatures as allCodeFeatures5 } from "ts-macro";
function transformVModel(nodeMap, ctxMap, options) {
  if (!nodeMap.size) return;
  for (const [, nodes] of nodeMap) {
    transform2(nodes, ctxMap, options);
  }
  getModelsType(options.codes);
}
function transform2(nodes, ctxMap, options) {
  const { codes, ts, source, ast, prefix } = options;
  let firstNamespacedNode;
  const result = [];
  const emits = [];
  const offset = `${prefix}model`.length + 1;
  for (const { attribute: attribute2, node: node2 } of nodes) {
    const modelValue = ["input", "select", "textarea"].includes(
      getTagName(node2, options)
    ) ? "value" : "modelValue";
    const isArrayExpression = isJsxExpression(attribute2.initializer) && attribute2.initializer.expression && ts.isArrayLiteralExpression(attribute2.initializer.expression);
    const name = getText(attribute2.name, options);
    const start = getStart(attribute2.name, options);
    if (name.startsWith(`${prefix}model:`) || isArrayExpression) {
      let isDynamic = false;
      const attributeName2 = name.slice(offset).split(/\s/)[0].split("_")[0].replace(/^\$(.*)\$/, (_, $1) => {
        isDynamic = true;
        return $1;
      });
      firstNamespacedNode ??= {
        attribute: attribute2,
        attributeName: attributeName2,
        node: node2
      };
      if (firstNamespacedNode.attribute !== attribute2) {
        replaceSourceRange7(
          codes,
          source,
          getStart(attribute2, options),
          attribute2.end
        );
        result.push(",");
      }
      if (isArrayExpression) {
        const { elements } = attribute2.initializer.expression;
        if (elements[1] && !ts.isArrayLiteralExpression(elements[1])) {
          isDynamic = !ts.isStringLiteral(elements[1]);
          result.push(
            isDynamic ? "[`${" : "",
            [
              getText(elements[1], options),
              source,
              getStart(elements[1], options),
              allCodeFeatures5
            ],
            isDynamic ? "}`]" : ""
          );
        } else {
          result.push(modelValue);
        }
        if (elements[0])
          result.push(":", [
            getText(elements[0], options),
            source,
            getStart(elements[0], options),
            allCodeFeatures5
          ]);
      } else {
        result.push(
          isDynamic ? "[`${" : "",
          ...attributeName2.split("-").map((code, index, codes2) => [
            index ? code.at(0)?.toUpperCase() + code.slice(1) : code,
            source,
            start + offset + (isDynamic ? 1 : 0) + (index && codes2[index - 1].length + 1),
            allCodeFeatures5
          ]),
          isDynamic ? "}`]" : ""
        );
        if (attribute2.initializer && isJsxExpression(attribute2.initializer) && attribute2.initializer.expression && attributeName2)
          result.push(":", [
            getText(attribute2.initializer.expression, options),
            source,
            getStart(attribute2.initializer.expression, options),
            allCodeFeatures5
          ]);
      }
      emits.push(`'onUpdate:${attributeName2}': () => {}, `);
    } else {
      replaceSourceRange7(
        codes,
        source,
        start,
        attribute2.name.end,
        modelValue.slice(0, 3),
        [modelValue.slice(3), source, start, allCodeFeatures5]
      );
      replaceSourceRange7(
        codes,
        source,
        attribute2.end,
        attribute2.end,
        ` {...{'onUpdate:${modelValue}': () => {} }}`
      );
    }
  }
  if (!firstNamespacedNode) return;
  const { attribute, attributeName, node } = firstNamespacedNode;
  const end = attributeName ? attribute.end : getStart(attribute, options) + offset;
  replaceSourceRange7(
    codes,
    source,
    getStart(attribute, options),
    end,
    `{...{`,
    ...result,
    `} satisfies __VLS_GetModels<__VLS_NormalizeProps<typeof ${ctxMap.get(node)}.props>>}`,
    ` {...{`,
    ...emits,
    `}}`
  );
  replaceSourceRange7(codes, source, end, end + 1, ast.text.slice(end, end + 1));
}
function getModelsType(codes) {
  codes.push(`
type __VLS_NormalizeProps<T> = T extends object
  ? {
      [K in keyof T as {} extends Record<K, 1>
        ? never
        : K extends keyof import('vue').VNodeProps | 'class' | 'style'
          ? never
          : K]: T[K]
    }
  : never;
type __VLS_CamelCase<S extends string> = S extends \`\${infer F}-\${infer RF}\${infer R}\`
  ? \`\${F}\${Uppercase<RF>}\${__VLS_CamelCase<R>}\`
  : S;
type __VLS_PropsToEmits<T> = T extends object
    ? {
        [K in keyof T as K extends \`onUpdate:\${infer R}\`
          ? R extends 'modelValue'
            ? never
            : __VLS_CamelCase<R>
          : never]: T[K]
      }
    : never
type __VLS_GetModels<P, E = __VLS_PropsToEmits<P>> = P extends object
  ? {
      [K in keyof P as K extends keyof E
        ? K
        : never]: K extends keyof P ? P[K] : never
    }
  : {};
`);
}

// src/jsx-directive/v-on.ts
import { replaceSourceRange as replaceSourceRange8 } from "muggle-string";
import { allCodeFeatures as allCodeFeatures6 } from "ts-macro";
function transformVOn(nodes, ctxMap, options) {
  if (nodes.length === 0) return;
  const { codes, source } = options;
  for (const { node, attribute } of nodes) {
    replaceSourceRange8(
      codes,
      source,
      getStart(attribute, options),
      attribute.name.end + 2,
      "{..."
    );
    replaceSourceRange8(
      codes,
      source,
      attribute.end - 1,
      attribute.end - 1,
      ` satisfies __VLS_NormalizeEmits<typeof ${ctxMap.get(node)}.emit>`
    );
  }
  codes.push(`
type __VLS_UnionToIntersection<U> = (U extends unknown ? (arg: U) => unknown : never) extends ((arg: infer P) => unknown) ? P : never;
type __VLS_OverloadUnionInner<T, U = unknown> = U & T extends (...args: infer A) => infer R
  ? U extends T
  ? never
  : __VLS_OverloadUnionInner<T, Pick<T, keyof T> & U & ((...args: A) => R)> | ((...args: A) => R)
  : never;
type __VLS_OverloadUnion<T> = Exclude<
  __VLS_OverloadUnionInner<(() => never) & T>,
  T extends () => never ? never : () => never
>;
type __VLS_ConstructorOverloads<T> = __VLS_OverloadUnion<T> extends infer F
  ? F extends (event: infer E, ...args: infer A) => any
  ? { [K in E & string]: (...args: A) => void; }
  : never
  : never;
type __VLS_NormalizeEmits<T> = __VLS_PrettifyGlobal<
  __VLS_UnionToIntersection<
    __VLS_ConstructorOverloads<T> & {
      [K in keyof T]: T[K] extends any[] ? { (...args: T[K]): void } : never
    }
  >
>;
type __VLS_PrettifyGlobal<T> = { [K in keyof T]: T[K]; } & {};
`);
}
function transformOnWithModifiers(nodes, options) {
  const { codes, source } = options;
  for (const { attribute } of nodes) {
    const attributeName = getText(attribute.name, options).split("_")[0];
    const start = getStart(attribute.name, options);
    const end = attribute.name.end;
    replaceSourceRange8(codes, source, start, end, "{...{", [
      attributeName,
      source,
      start,
      allCodeFeatures6
    ]);
    if (!attribute.initializer) {
      replaceSourceRange8(codes, source, end, end, ": () => {}}}");
    } else if (isJsxExpression(attribute.initializer) && attribute.initializer.expression) {
      replaceSourceRange8(
        codes,
        source,
        end,
        getStart(attribute.initializer.expression, options),
        ": "
      );
      replaceSourceRange8(codes, source, attribute.end, attribute.end, "}");
    }
  }
}

// src/jsx-directive/v-slot.ts
import { replaceSourceRange as replaceSourceRange9 } from "muggle-string";
import { allCodeFeatures as allCodeFeatures7 } from "ts-macro";
function transformVSlot(nodeMap, ctxMap, options) {
  if (nodeMap.size === 0) return;
  const { codes, ts, ast, source, prefix } = options;
  nodeMap.forEach(({ attributeMap, vSlotAttribute }, node) => {
    const result = [" vSlots={{"];
    const attributes = Array.from(attributeMap);
    attributes.forEach(
      ([attribute, { children, vIfAttribute, vForAttribute }], index) => {
        if (!attribute) return;
        let vIfAttributeName;
        if (vIfAttribute && (vIfAttributeName = getText(vIfAttribute.name, options))) {
          if (`${prefix}if` === vIfAttributeName) {
            result.push("...");
          }
          if ([`${prefix}if`, `${prefix}else-if`].includes(vIfAttributeName) && isJsxExpression(vIfAttribute.initializer) && vIfAttribute.initializer.expression) {
            result.push(
              "(",
              [
                getText(vIfAttribute.initializer.expression, options),
                source,
                getStart(vIfAttribute.initializer.expression, options),
                allCodeFeatures7
              ],
              ") ? {"
            );
          } else if (`${prefix}else` === vIfAttributeName) {
            result.push("{");
          }
        }
        if (vForAttribute) {
          result.push("...", ...resolveVFor(vForAttribute, options), "({");
        }
        let isDynamic = false;
        let attributeName = getText(attribute.name, options).slice(6).split(/\s/)[0].replace(/\$(.*)\$/, (_, $1) => {
          isDynamic = true;
          return $1;
        });
        const isNamespace = attributeName.startsWith(":");
        attributeName = attributeName.slice(1);
        const wrapByQuotes = !attributeName || attributeName.includes("-");
        result.push(
          isNamespace ? [
            isDynamic ? `[${attributeName}]` : wrapByQuotes ? `'${attributeName}'` : attributeName,
            source,
            getStart(attribute.name, options) + (wrapByQuotes ? 6 : 7),
            allCodeFeatures7
          ] : "default",
          `: (`,
          (!isNamespace || attributeName) && isJsxExpression(attribute.initializer) && attribute.initializer.expression ? [
            getText(attribute.initializer.expression, options),
            source,
            getStart(attribute.initializer.expression, options),
            allCodeFeatures7
          ] : "",
          isDynamic ? ": any" : "",
          ") => <>",
          ...children.map((child) => {
            replaceSourceRange9(codes, source, child.pos, child.end);
            const isSlotTemplate = getTagName(child, options) === "template" && !vSlotAttribute;
            const node2 = isSlotTemplate && ts.isJsxElement(child) ? child.children : child;
            return isSlotTemplate && ts.isJsxSelfClosingElement(child) ? "" : [
              ast.text.slice(node2.pos, node2.end),
              source,
              node2.pos,
              allCodeFeatures7
            ];
          }),
          "</>,"
        );
        if (vForAttribute) {
          result.push("})),");
        }
        if (vIfAttribute && vIfAttributeName) {
          if ([`${prefix}if`, `${prefix}else-if`].includes(vIfAttributeName)) {
            const nextIndex = index + (attributes[index + 1]?.[0] ? 1 : 2);
            const nextAttribute = attributes[nextIndex]?.[1].vIfAttribute;
            result.push(
              "}",
              nextAttribute && getText(nextAttribute.name, options).startsWith(`${prefix}else`) ? " : " : " : null,"
            );
          } else if (`${prefix}else` === vIfAttributeName) {
            result.push("},");
          }
        }
      }
    );
    const slotType = `} satisfies typeof ${ctxMap.get(node)}.slots}`;
    if (attributeMap.has(null)) {
      result.push("default: () => <>");
    } else {
      result.push(slotType);
    }
    if (vSlotAttribute) {
      replaceSourceRange9(
        codes,
        source,
        getStart(vSlotAttribute, options),
        vSlotAttribute.end,
        ...result
      );
      replaceSourceRange9(
        codes,
        source,
        vSlotAttribute.end,
        vSlotAttribute.end + 1,
        ast.text.slice(vSlotAttribute.end, vSlotAttribute.end + 1)
      );
    } else if (ts.isJsxElement(node)) {
      replaceSourceRange9(
        codes,
        source,
        node.openingElement.end - 1,
        node.openingElement.end,
        ...result
      );
      replaceSourceRange9(
        codes,
        source,
        node.closingElement.pos,
        node.closingElement.pos,
        attributeMap.has(null) ? `</>${slotType}>` : ">"
      );
    }
  });
}
function transformVSlots(nodes, ctxMap, options) {
  const { codes, source } = options;
  for (const {
    node,
    attribute: { initializer }
  } of nodes) {
    if (initializer && isJsxExpression(initializer) && initializer.expression) {
      replaceSourceRange9(
        codes,
        source,
        initializer.expression.end,
        initializer.expression.end,
        ` satisfies typeof ${ctxMap.get(node)}.slots`
      );
    }
  }
}

// src/jsx-directive/index.ts
function transformJsxDirective(options) {
  const { ast, ts, source, prefix, codes } = options;
  const resolvedPrefix = prefix.replaceAll("$", String.raw`\$`);
  const slotRegex = new RegExp(`^${resolvedPrefix}slot(?=:|$)`);
  const modelRegex = new RegExp(`^${resolvedPrefix}model(?=[:_]|$)`);
  const bindRegex = new RegExp(`^(?!${resolvedPrefix}|on[A-Z])\\S+_\\S+`);
  const onWithModifiersRegex = /^on[A-Z]\S*_\S+/;
  const vIfMap = /* @__PURE__ */ new Map();
  const vForNodes = [];
  const vSlotMap = /* @__PURE__ */ new Map();
  const vModelMap = /* @__PURE__ */ new Map();
  const vOnNodes = [];
  const onWithModifiers = [];
  const vBindNodes = [];
  const refNodes = [];
  const vSlots = [];
  const customDirectives = [];
  const ctxNodeMap = /* @__PURE__ */ new Map();
  function walkJsxDirective(node, parent, parents = []) {
    const tagName = getTagName(node, options);
    const properties = getOpeningElement(node, options);
    let ctxNode;
    let vIfAttribute;
    let vForAttribute;
    let vSlotAttribute;
    for (const attribute of properties?.attributes.properties || []) {
      if (!ts.isJsxAttribute(attribute)) continue;
      const attributeName = getText(attribute.name, options);
      if ([`${prefix}if`, `${prefix}else-if`, `${prefix}else`].includes(
        attributeName
      )) {
        vIfAttribute = attribute;
      } else if (attributeName === `${prefix}for`) {
        vForAttribute = attribute;
      } else if (slotRegex.test(attributeName)) {
        vSlotAttribute = attribute;
      } else if (modelRegex.test(attributeName)) {
        vModelMap.has(node) || vModelMap.set(node, []);
        vModelMap.get(node).push({
          node,
          attribute
        });
        ctxNode = node;
      } else if (attributeName === `${prefix}on`) {
        vOnNodes.push({ node, attribute });
        ctxNode = node;
      } else if (onWithModifiersRegex.test(attributeName)) {
        onWithModifiers.push({ node, attribute });
      } else if (bindRegex.test(attributeName)) {
        vBindNodes.push({ node, attribute });
      } else if (attributeName === "ref") {
        refNodes.push({ node, attribute });
        ctxNode = node;
      } else if (attributeName === `${prefix}slots`) {
        ctxNode = node;
        vSlots.push({ node, attribute });
      } else if ([`${prefix}html`, `${prefix}memo`, `${prefix}once`].includes(
        attributeName
      )) {
        replaceSourceRange10(codes, source, attribute.pos, attribute.end);
      } else if (attributeName.startsWith("v-")) {
        customDirectives.push(attribute);
      }
    }
    if (isJsxExpression(node) && node.expression && ts.isObjectLiteralExpression(node.expression) && parent && ts.isJsxElement(parent) && parent.children.filter(
      (child) => ts.isJsxText(child) ? getText(child, options).trim() : true
    ).length === 1) {
      ctxNode = node;
      vSlots.push({
        node: parent,
        attribute: {
          initializer: {
            kind: ts.SyntaxKind.JsxExpression,
            expression: node.expression
          }
        }
      });
    }
    if (!vSlotAttribute || tagName !== "template") {
      if (vIfAttribute) {
        vIfMap.has(parent) || vIfMap.set(parent, []);
        vIfMap.get(parent).push({
          node,
          attribute: vIfAttribute,
          parent
        });
      }
      if (vForAttribute) {
        vForNodes.push({
          node,
          attribute: vForAttribute,
          parent: vIfAttribute ? void 0 : parent
        });
      }
    }
    if (vSlotAttribute) {
      const slotNode = tagName === "template" ? parent : node;
      if (!slotNode) return;
      ctxNode = slotNode;
      const attributeMap = vSlotMap.get(slotNode)?.attributeMap || vSlotMap.set(slotNode, {
        vSlotAttribute: tagName === "template" ? void 0 : vSlotAttribute,
        attributeMap: /* @__PURE__ */ new Map()
      }).get(slotNode).attributeMap;
      const children = attributeMap.get(vSlotAttribute)?.children || attributeMap.set(vSlotAttribute, {
        children: [],
        ...tagName === "template" ? {
          vIfAttribute,
          vForAttribute
        } : {}
      }).get(vSlotAttribute).children;
      if (slotNode === parent && ts.isJsxElement(parent)) {
        children.push(node);
        if (attributeMap.get(null)) return;
        for (const child of parent.children) {
          if (getTagName(child, options) === "template" || ts.isJsxText(child) && !getText(child, options).trim())
            continue;
          const defaultNodes = attributeMap.get(null)?.children || attributeMap.set(null, { children: [] }).get(null).children;
          defaultNodes.push(child);
        }
      } else if (ts.isJsxElement(node)) {
        children.push(...node.children);
      }
    }
    if (ctxNode) {
      ctxNodeMap.set(ctxNode, parents.find(ts.isBlock));
    }
    ts.forEachChild(node, (child) => {
      parents.unshift(node);
      walkJsxDirective(
        child,
        ts.isJsxElement(node) || ts.isJsxFragment(node) ? node : void 0,
        parents
      );
      parents.shift();
    });
  }
  ts.forEachChild(ast, walkJsxDirective);
  const ctxMap = resolveCtxMap(ctxNodeMap, options);
  transformVSlot(vSlotMap, ctxMap, options);
  transformVFor(vForNodes, options);
  vIfMap.forEach((nodes) => transformVIf(nodes, options));
  transformVModel(vModelMap, ctxMap, options);
  transformVOn(vOnNodes, ctxMap, options);
  transformOnWithModifiers(onWithModifiers, options);
  transformVBind(vBindNodes, options);
  transformRef(refNodes, ctxMap, options);
  transformVSlots(vSlots, ctxMap, options);
  transformCustomDirective(customDirectives, options);
}
function getOpeningElement(node, options) {
  const { ts } = options;
  return ts.isJsxSelfClosingElement(node) ? node : ts.isJsxElement(node) ? node.openingElement : void 0;
}
function getTagName(node, options) {
  const openingElement = getOpeningElement(node, options);
  if (!openingElement) return "";
  let types = "";
  if (options.withTypes && openingElement.typeArguments?.length) {
    types = `<${openingElement.typeArguments.map((argument) => getText(argument, options)).join(", ")}>`;
  }
  return getText(openingElement.tagName, options) + types;
}

// src/jsx-directive.ts
var plugin = createPlugin(
  ({ ts, vueCompilerOptions }, options = vueCompilerOptions?.vueMacros?.jsxDirective === true ? {} : vueCompilerOptions?.vueMacros?.jsxDirective ?? {}) => {
    if (!options) return [];
    const filter = createFilter(options);
    return {
      name: "vue-macros-jsx-directive",
      resolveVirtualCode({ filePath, ast, codes, source, languageId }) {
        if (!filter(filePath) || !["jsx", "tsx"].includes(languageId)) return;
        transformJsxDirective({
          codes,
          ast,
          ts,
          source,
          prefix: options.prefix ?? "v-"
        });
      }
    };
  }
);
var jsx_directive_default = plugin;

export {
  jsx_directive_default
};
