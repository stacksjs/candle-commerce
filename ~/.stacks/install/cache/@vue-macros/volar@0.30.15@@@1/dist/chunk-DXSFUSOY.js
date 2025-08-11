"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }




var _chunk6LLWWLOSjs = require('./chunk-6LLWWLOS.js');

// src/jsx-directive.ts
var _common = require('@vue-macros/common');
var _tsmacro = require('ts-macro');

// src/jsx-directive/index.ts
var _mugglestring = require('muggle-string');

// src/jsx-directive/context.ts

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
    let name = _chunk6LLWWLOSjs.getText.call(void 0, prop.name, options);
    if (name === "ref" && prop.initializer && _chunk6LLWWLOSjs.isJsxExpression.call(void 0, prop.initializer) && prop.initializer.expression) {
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
    const value = prop.initializer ? _chunk6LLWWLOSjs.isJsxExpression.call(void 0, prop.initializer) && prop.initializer.expression ? _chunk6LLWWLOSjs.getText.call(void 0, prop.initializer.expression, options) : _chunk6LLWWLOSjs.getText.call(void 0, prop.initializer, options) : "true";
    props += `'${name}': ${value},`;
  }
  const ctxName = `__VLS_ctx_${refValue || index}`;
  const tagName = getTagName(node, { ...options, withTypes: true });
  const result = `
const ${ctxName} = __VLS_getFunctionalComponentCtx(${tagName}, __VLS_asFunctionalComponent(${tagName})({${props}}), '${tagName}');
`;
  if (root) {
    _mugglestring.replaceSourceRange.call(void 0, 
      codes,
      options.source,
      root.end - 1,
      root.end - 1,
      result
    );
  } else {
    _chunk6LLWWLOSjs.addCode.call(void 0, codes, result);
  }
  return ctxName;
}
function getRefValue(expression, options) {
  const { ts } = options;
  if (ts.isIdentifier(expression)) {
    return _chunk6LLWWLOSjs.getText.call(void 0, expression, options);
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
    return left && _chunk6LLWWLOSjs.getText.call(void 0, 
      ts.isPropertyAccessExpression(left) || ts.isElementAccessExpression(left) ? left.expression : left,
      options
    );
  } else if (ts.isCallExpression(expression) && expression.arguments[0] && ts.isIdentifier(expression.arguments[0])) {
    return _chunk6LLWWLOSjs.getText.call(void 0, expression.arguments[0], options);
  }
}

// src/jsx-directive/custom-directive.ts


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
  const attributeName = _chunk6LLWWLOSjs.getText.call(void 0, attribute.name, options);
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
  const start = _chunk6LLWWLOSjs.getStart.call(void 0, attribute, options);
  const offset = start + directiveName.length + 2;
  _mugglestring.replaceSourceRange.call(void 0, 
    codes,
    source,
    start,
    attribute.end,
    [ast.text.slice(start, offset), source, start, { verification: true }],
    `={[`,
    [`v`, source, start, { ..._tsmacro.allCodeFeatures, verification: false }],
    [
      directiveName,
      source,
      start + 2,
      { ..._tsmacro.allCodeFeatures, verification: false }
    ],
    `,`,
    attribute.initializer ? [
      ts.isStringLiteral(attribute.initializer) ? _chunk6LLWWLOSjs.getText.call(void 0, attribute.initializer, options) : _chunk6LLWWLOSjs.getText.call(void 0, attribute.initializer, options).slice(1, -1),
      source,
      _chunk6LLWWLOSjs.getStart.call(void 0, attribute.initializer, options) + (ts.isStringLiteral(attribute.initializer) ? 0 : 1),
      _tsmacro.allCodeFeatures
    ] : "{} as any",
    ",",
    ...arg !== void 0 ? [
      [`'`, source, offset + 1, { verification: true }],
      [arg, source, offset + 1, _tsmacro.allCodeFeatures],
      [
        `'`,
        source,
        offset + arg.length,
        _tsmacro.allCodeFeatures,
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
          _chunk6LLWWLOSjs.getStart.call(void 0, attribute, options) + (attributeName.indexOf("_") + 1) + (index ? modifiers.slice(0, index).join("").length + index : 0),
          _tsmacro.allCodeFeatures
        ],
        modify ? ": true," : `'`
      ]),
      "}"
    ] : ["{} as any"],
    `] satisfies __VLS_ResolveDirective<typeof v${directiveName}>}`
  );
}

// src/jsx-directive/ref.ts


function transformRef(nodes, ctxMap, options) {
  const { codes, source, ts } = options;
  for (const { node, attribute } of nodes) {
    if (attribute.initializer && _chunk6LLWWLOSjs.isJsxExpression.call(void 0, attribute.initializer) && attribute.initializer.expression && (ts.isFunctionExpression(attribute.initializer.expression) || ts.isArrowFunction(attribute.initializer.expression))) {
      _mugglestring.replaceSourceRange.call(void 0, 
        codes,
        source,
        _chunk6LLWWLOSjs.getStart.call(void 0, attribute, options),
        attribute.end,
        "{...({ ",
        ["ref", source, _chunk6LLWWLOSjs.getStart.call(void 0, attribute.name, options), _tsmacro.allCodeFeatures],
        ": ",
        [
          _chunk6LLWWLOSjs.getText.call(void 0, attribute.initializer.expression, options),
          source,
          _chunk6LLWWLOSjs.getStart.call(void 0, attribute.initializer.expression, options),
          _tsmacro.allCodeFeatures
        ],
        `} satisfies { ref: (e: Parameters<typeof ${ctxMap.get(node)}.expose>[0]) => any }) as {}}`
      );
    }
  }
}

// src/jsx-directive/v-bind.ts

function transformVBind(nodes, options) {
  if (nodes.length === 0) return;
  const { codes, source } = options;
  for (const { attribute } of nodes) {
    const attributeName = _chunk6LLWWLOSjs.getText.call(void 0, attribute.name, options);
    const start = _chunk6LLWWLOSjs.getStart.call(void 0, attribute.name, options);
    const end = attribute.name.end;
    if (attributeName.includes("_")) {
      _mugglestring.replaceSourceRange.call(void 0, codes, source, start + attributeName.indexOf("_"), end);
    }
  }
}

// src/jsx-directive/v-for.ts


function resolveVFor(attribute, options) {
  const { ts, ast, source } = options;
  const result = [];
  if (_chunk6LLWWLOSjs.isJsxExpression.call(void 0, attribute.initializer) && attribute.initializer.expression && ts.isBinaryExpression(attribute.initializer.expression)) {
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
          ast.text.slice(_chunk6LLWWLOSjs.getStart.call(void 0, list, options), list.end),
          source,
          _chunk6LLWWLOSjs.getStart.call(void 0, list, options),
          _tsmacro.allCodeFeatures
        ],
        ").map(([",
        [
          String(ast.text.slice(_chunk6LLWWLOSjs.getStart.call(void 0, item, options), item.end)),
          source,
          _chunk6LLWWLOSjs.getStart.call(void 0, item, options),
          _tsmacro.allCodeFeatures
        ],
        ", ",
        index ? [
          String(ast.text.slice(_chunk6LLWWLOSjs.getStart.call(void 0, index, options), index.end)),
          source,
          _chunk6LLWWLOSjs.getStart.call(void 0, index, options),
          _tsmacro.allCodeFeatures
        ] : objectIndex ? "undefined" : "",
        ...objectIndex ? [
          ", ",
          [
            String(
              _optionalChain([ast, 'optionalAccess', _2 => _2.text, 'access', _3 => _3.slice, 'call', _4 => _4(
                _chunk6LLWWLOSjs.getStart.call(void 0, objectIndex, options),
                objectIndex.end
              )])
            ),
            source,
            _chunk6LLWWLOSjs.getStart.call(void 0, objectIndex, options),
            _tsmacro.allCodeFeatures
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
    _mugglestring.replaceSourceRange.call(void 0, codes, source, node.pos, node.pos, ...result);
    _mugglestring.replaceSourceRange.call(void 0, 
      codes,
      source,
      node.end - 1,
      node.end,
      `>)${parent ? "}" : ""}`
    );
    _mugglestring.replaceSourceRange.call(void 0, 
      codes,
      source,
      _chunk6LLWWLOSjs.getStart.call(void 0, attribute, options),
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


function transformVIf(nodes, options) {
  const { codes, ts, source, prefix } = options;
  nodes.forEach(({ node, attribute, parent }, index) => {
    if (!ts.isIdentifier(attribute.name)) return;
    if ([`${prefix}if`, `${prefix}else-if`].includes(
      _chunk6LLWWLOSjs.getText.call(void 0, attribute.name, options)
    ) && _chunk6LLWWLOSjs.isJsxExpression.call(void 0, attribute.initializer) && attribute.initializer.expression) {
      const hasScope = parent && attribute.name.escapedText === `${prefix}if`;
      _mugglestring.replaceSourceRange.call(void 0, 
        codes,
        source,
        node.pos,
        node.pos,
        `${hasScope ? "{" : " "}(`,
        [
          _chunk6LLWWLOSjs.getText.call(void 0, attribute.initializer.expression, options),
          source,
          _chunk6LLWWLOSjs.getStart.call(void 0, attribute.initializer.expression, options),
          _tsmacro.allCodeFeatures
        ],
        ") ? "
      );
      const nextAttribute = _optionalChain([nodes, 'access', _5 => _5[index + 1], 'optionalAccess', _6 => _6.attribute]);
      const nextNodeHasElse = nextAttribute && ts.isIdentifier(nextAttribute.name) ? String(nextAttribute.name.escapedText).startsWith(`${prefix}else`) : false;
      _mugglestring.replaceSourceRange.call(void 0, 
        codes,
        source,
        node.end,
        node.end,
        nextNodeHasElse ? " : " : ` : null${parent ? "}" : ""}`
      );
    } else if (attribute.name.escapedText === `${prefix}else`) {
      _mugglestring.replaceSourceRange.call(void 0, codes, source, node.end, node.end, parent ? "}" : "");
    }
    _mugglestring.replaceSourceRange.call(void 0, 
      codes,
      source,
      _chunk6LLWWLOSjs.getStart.call(void 0, attribute, options),
      attribute.end
    );
  });
}

// src/jsx-directive/v-model.ts


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
    const isArrayExpression = _chunk6LLWWLOSjs.isJsxExpression.call(void 0, attribute2.initializer) && attribute2.initializer.expression && ts.isArrayLiteralExpression(attribute2.initializer.expression);
    const name = _chunk6LLWWLOSjs.getText.call(void 0, attribute2.name, options);
    const start = _chunk6LLWWLOSjs.getStart.call(void 0, attribute2.name, options);
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
        _mugglestring.replaceSourceRange.call(void 0, 
          codes,
          source,
          _chunk6LLWWLOSjs.getStart.call(void 0, attribute2, options),
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
              _chunk6LLWWLOSjs.getText.call(void 0, elements[1], options),
              source,
              _chunk6LLWWLOSjs.getStart.call(void 0, elements[1], options),
              _tsmacro.allCodeFeatures
            ],
            isDynamic ? "}`]" : ""
          );
        } else {
          result.push(modelValue);
        }
        if (elements[0])
          result.push(":", [
            _chunk6LLWWLOSjs.getText.call(void 0, elements[0], options),
            source,
            _chunk6LLWWLOSjs.getStart.call(void 0, elements[0], options),
            _tsmacro.allCodeFeatures
          ]);
      } else {
        result.push(
          isDynamic ? "[`${" : "",
          ...attributeName2.split("-").map((code, index, codes2) => [
            index ? _optionalChain([code, 'access', _7 => _7.at, 'call', _8 => _8(0), 'optionalAccess', _9 => _9.toUpperCase, 'call', _10 => _10()]) + code.slice(1) : code,
            source,
            start + offset + (isDynamic ? 1 : 0) + (index && codes2[index - 1].length + 1),
            _tsmacro.allCodeFeatures
          ]),
          isDynamic ? "}`]" : ""
        );
        if (attribute2.initializer && _chunk6LLWWLOSjs.isJsxExpression.call(void 0, attribute2.initializer) && attribute2.initializer.expression && attributeName2)
          result.push(":", [
            _chunk6LLWWLOSjs.getText.call(void 0, attribute2.initializer.expression, options),
            source,
            _chunk6LLWWLOSjs.getStart.call(void 0, attribute2.initializer.expression, options),
            _tsmacro.allCodeFeatures
          ]);
      }
      emits.push(`'onUpdate:${attributeName2}': () => {}, `);
    } else {
      _mugglestring.replaceSourceRange.call(void 0, 
        codes,
        source,
        start,
        attribute2.name.end,
        modelValue.slice(0, 3),
        [modelValue.slice(3), source, start, _tsmacro.allCodeFeatures]
      );
      _mugglestring.replaceSourceRange.call(void 0, 
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
  const end = attributeName ? attribute.end : _chunk6LLWWLOSjs.getStart.call(void 0, attribute, options) + offset;
  _mugglestring.replaceSourceRange.call(void 0, 
    codes,
    source,
    _chunk6LLWWLOSjs.getStart.call(void 0, attribute, options),
    end,
    `{...{`,
    ...result,
    `} satisfies __VLS_GetModels<__VLS_NormalizeProps<typeof ${ctxMap.get(node)}.props>>}`,
    ` {...{`,
    ...emits,
    `}}`
  );
  _mugglestring.replaceSourceRange.call(void 0, codes, source, end, end + 1, ast.text.slice(end, end + 1));
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


function transformVOn(nodes, ctxMap, options) {
  if (nodes.length === 0) return;
  const { codes, source } = options;
  for (const { node, attribute } of nodes) {
    _mugglestring.replaceSourceRange.call(void 0, 
      codes,
      source,
      _chunk6LLWWLOSjs.getStart.call(void 0, attribute, options),
      attribute.name.end + 2,
      "{..."
    );
    _mugglestring.replaceSourceRange.call(void 0, 
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
    const attributeName = _chunk6LLWWLOSjs.getText.call(void 0, attribute.name, options).split("_")[0];
    const start = _chunk6LLWWLOSjs.getStart.call(void 0, attribute.name, options);
    const end = attribute.name.end;
    _mugglestring.replaceSourceRange.call(void 0, codes, source, start, end, "{...{", [
      attributeName,
      source,
      start,
      _tsmacro.allCodeFeatures
    ]);
    if (!attribute.initializer) {
      _mugglestring.replaceSourceRange.call(void 0, codes, source, end, end, ": () => {}}}");
    } else if (_chunk6LLWWLOSjs.isJsxExpression.call(void 0, attribute.initializer) && attribute.initializer.expression) {
      _mugglestring.replaceSourceRange.call(void 0, 
        codes,
        source,
        end,
        _chunk6LLWWLOSjs.getStart.call(void 0, attribute.initializer.expression, options),
        ": "
      );
      _mugglestring.replaceSourceRange.call(void 0, codes, source, attribute.end, attribute.end, "}");
    }
  }
}

// src/jsx-directive/v-slot.ts


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
        if (vIfAttribute && (vIfAttributeName = _chunk6LLWWLOSjs.getText.call(void 0, vIfAttribute.name, options))) {
          if (`${prefix}if` === vIfAttributeName) {
            result.push("...");
          }
          if ([`${prefix}if`, `${prefix}else-if`].includes(vIfAttributeName) && _chunk6LLWWLOSjs.isJsxExpression.call(void 0, vIfAttribute.initializer) && vIfAttribute.initializer.expression) {
            result.push(
              "(",
              [
                _chunk6LLWWLOSjs.getText.call(void 0, vIfAttribute.initializer.expression, options),
                source,
                _chunk6LLWWLOSjs.getStart.call(void 0, vIfAttribute.initializer.expression, options),
                _tsmacro.allCodeFeatures
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
        let attributeName = _chunk6LLWWLOSjs.getText.call(void 0, attribute.name, options).slice(6).split(/\s/)[0].replace(/\$(.*)\$/, (_, $1) => {
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
            _chunk6LLWWLOSjs.getStart.call(void 0, attribute.name, options) + (wrapByQuotes ? 6 : 7),
            _tsmacro.allCodeFeatures
          ] : "default",
          `: (`,
          (!isNamespace || attributeName) && _chunk6LLWWLOSjs.isJsxExpression.call(void 0, attribute.initializer) && attribute.initializer.expression ? [
            _chunk6LLWWLOSjs.getText.call(void 0, attribute.initializer.expression, options),
            source,
            _chunk6LLWWLOSjs.getStart.call(void 0, attribute.initializer.expression, options),
            _tsmacro.allCodeFeatures
          ] : "",
          isDynamic ? ": any" : "",
          ") => <>",
          ...children.map((child) => {
            _mugglestring.replaceSourceRange.call(void 0, codes, source, child.pos, child.end);
            const isSlotTemplate = getTagName(child, options) === "template" && !vSlotAttribute;
            const node2 = isSlotTemplate && ts.isJsxElement(child) ? child.children : child;
            return isSlotTemplate && ts.isJsxSelfClosingElement(child) ? "" : [
              ast.text.slice(node2.pos, node2.end),
              source,
              node2.pos,
              _tsmacro.allCodeFeatures
            ];
          }),
          "</>,"
        );
        if (vForAttribute) {
          result.push("})),");
        }
        if (vIfAttribute && vIfAttributeName) {
          if ([`${prefix}if`, `${prefix}else-if`].includes(vIfAttributeName)) {
            const nextIndex = index + (_optionalChain([attributes, 'access', _11 => _11[index + 1], 'optionalAccess', _12 => _12[0]]) ? 1 : 2);
            const nextAttribute = _optionalChain([attributes, 'access', _13 => _13[nextIndex], 'optionalAccess', _14 => _14[1], 'access', _15 => _15.vIfAttribute]);
            result.push(
              "}",
              nextAttribute && _chunk6LLWWLOSjs.getText.call(void 0, nextAttribute.name, options).startsWith(`${prefix}else`) ? " : " : " : null,"
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
      _mugglestring.replaceSourceRange.call(void 0, 
        codes,
        source,
        _chunk6LLWWLOSjs.getStart.call(void 0, vSlotAttribute, options),
        vSlotAttribute.end,
        ...result
      );
      _mugglestring.replaceSourceRange.call(void 0, 
        codes,
        source,
        vSlotAttribute.end,
        vSlotAttribute.end + 1,
        ast.text.slice(vSlotAttribute.end, vSlotAttribute.end + 1)
      );
    } else if (ts.isJsxElement(node)) {
      _mugglestring.replaceSourceRange.call(void 0, 
        codes,
        source,
        node.openingElement.end - 1,
        node.openingElement.end,
        ...result
      );
      _mugglestring.replaceSourceRange.call(void 0, 
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
    if (initializer && _chunk6LLWWLOSjs.isJsxExpression.call(void 0, initializer) && initializer.expression) {
      _mugglestring.replaceSourceRange.call(void 0, 
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
    for (const attribute of _optionalChain([properties, 'optionalAccess', _16 => _16.attributes, 'access', _17 => _17.properties]) || []) {
      if (!ts.isJsxAttribute(attribute)) continue;
      const attributeName = _chunk6LLWWLOSjs.getText.call(void 0, attribute.name, options);
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
        _mugglestring.replaceSourceRange.call(void 0, codes, source, attribute.pos, attribute.end);
      } else if (attributeName.startsWith("v-")) {
        customDirectives.push(attribute);
      }
    }
    if (_chunk6LLWWLOSjs.isJsxExpression.call(void 0, node) && node.expression && ts.isObjectLiteralExpression(node.expression) && parent && ts.isJsxElement(parent) && parent.children.filter(
      (child) => ts.isJsxText(child) ? _chunk6LLWWLOSjs.getText.call(void 0, child, options).trim() : true
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
      const attributeMap = _optionalChain([vSlotMap, 'access', _18 => _18.get, 'call', _19 => _19(slotNode), 'optionalAccess', _20 => _20.attributeMap]) || vSlotMap.set(slotNode, {
        vSlotAttribute: tagName === "template" ? void 0 : vSlotAttribute,
        attributeMap: /* @__PURE__ */ new Map()
      }).get(slotNode).attributeMap;
      const children = _optionalChain([attributeMap, 'access', _21 => _21.get, 'call', _22 => _22(vSlotAttribute), 'optionalAccess', _23 => _23.children]) || attributeMap.set(vSlotAttribute, {
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
          if (getTagName(child, options) === "template" || ts.isJsxText(child) && !_chunk6LLWWLOSjs.getText.call(void 0, child, options).trim())
            continue;
          const defaultNodes = _optionalChain([attributeMap, 'access', _24 => _24.get, 'call', _25 => _25(null), 'optionalAccess', _26 => _26.children]) || attributeMap.set(null, { children: [] }).get(null).children;
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
  if (options.withTypes && _optionalChain([openingElement, 'access', _27 => _27.typeArguments, 'optionalAccess', _28 => _28.length])) {
    types = `<${openingElement.typeArguments.map((argument) => _chunk6LLWWLOSjs.getText.call(void 0, argument, options)).join(", ")}>`;
  }
  return _chunk6LLWWLOSjs.getText.call(void 0, openingElement.tagName, options) + types;
}

// src/jsx-directive.ts
var plugin = _tsmacro.createPlugin.call(void 0, 
  ({ ts, vueCompilerOptions }, options = _optionalChain([vueCompilerOptions, 'optionalAccess', _29 => _29.vueMacros, 'optionalAccess', _30 => _30.jsxDirective]) === true ? {} : _nullishCoalesce(_optionalChain([vueCompilerOptions, 'optionalAccess', _31 => _31.vueMacros, 'optionalAccess', _32 => _32.jsxDirective]), () => ( {}))) => {
    if (!options) return [];
    const filter = _common.createFilter.call(void 0, options);
    return {
      name: "vue-macros-jsx-directive",
      resolveVirtualCode({ filePath, ast, codes, source, languageId }) {
        if (!filter(filePath) || !["jsx", "tsx"].includes(languageId)) return;
        transformJsxDirective({
          codes,
          ast,
          ts,
          source,
          prefix: _nullishCoalesce(options.prefix, () => ( "v-"))
        });
      }
    };
  }
);
var jsx_directive_default = plugin;



exports.jsx_directive_default = jsx_directive_default;
