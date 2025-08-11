"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/common.ts
var _nodepath = require('node:path'); var _nodepath2 = _interopRequireDefault(_nodepath);
var _nodeprocess = require('node:process'); var _nodeprocess2 = _interopRequireDefault(_nodeprocess);


var _config = require('@vue-macros/config');
var _mugglestring = require('muggle-string');
var REGEX_DEFINE_COMPONENT = /(?<=(?:__VLS_|\(await import\(\S+\)\)\.)defineComponent\(\{\n)/g;
function addProps(codes, decl, vueLibName) {
  if (!decl.length || codes.toString().includes("{} as __VLS_TypePropsToOption<"))
    return;
  _mugglestring.replace.call(void 0, 
    codes,
    /(?<=type __VLS_PublicProps = )/,
    `{
${decl.join(",\n")}
} & `
  );
  _mugglestring.replaceAll.call(void 0, 
    codes,
    REGEX_DEFINE_COMPONENT,
    "props: {} as __VLS_TypePropsToOption<__VLS_PublicProps>,\n"
  );
  codes.push(
    `type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
`,
    `type __VLS_TypePropsToOption<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? { type: import('${vueLibName}').PropType<__VLS_NonUndefinedable<T[K]>> } : { type: import('${vueLibName}').PropType<T[K]>, required: true } };
`
  );
  return true;
}
function addEmits(codes, decl, vueLibName) {
  if (!decl.length || codes.toString().includes("{} as __VLS_NormalizeEmits<"))
    return;
  let index = codes.findIndex(
    (code) => code.toString().startsWith("const __VLS_modelEmitsType = ")
  );
  if (index < 0) {
    index = codes.findIndex(
      (code) => code.toString().includes("type __VLS_PublicProps = ")
    );
    codes.splice(
      index,
      0,
      `const __VLS_modelEmitsType = (await import('${vueLibName}')).defineEmits<{
${decl.join(",\n")}
}>();
`,
      `type __VLS_ModelEmitsType = typeof __VLS_modelEmitsType;
`
    );
  } else {
    codes.splice(index + 4, 0, `${decl.join(",\n")}
`);
  }
  _mugglestring.replaceAll.call(void 0, 
    codes,
    REGEX_DEFINE_COMPONENT,
    "emits: {} as __VLS_NormalizeEmits<__VLS_ModelEmitsType>,\n"
  );
  return true;
}
function addCode(codes, ...args) {
  const index = codes.findIndex(
    (code) => code.includes("__VLS_setup = (async () => {")
  );
  codes.splice(index !== -1 ? index + 1 : codes.length, 0, ...args);
}
var resolvedOptions = /* @__PURE__ */ new Map();
function getVolarOptions(context, key) {
  const configPath = context.compilerOptions.configFilePath;
  const root = typeof configPath === "string" ? _nodepath2.default.dirname(configPath) : _nodeprocess2.default.cwd();
  let resolved;
  if (!resolvedOptions.has(root)) {
    resolved = _config.resolveOptions.call(void 0, context.vueCompilerOptions.vueMacros, root);
    resolvedOptions.set(root, resolved);
  }
  return (resolved || resolvedOptions.get(root))[key];
}
function getStart(node, { ts, ast, sfc, source = "scriptSetup" }) {
  ast = ast || _optionalChain([sfc, 'optionalAccess', _ => _[source], 'optionalAccess', _2 => _2.ast]);
  return ts.getTokenPosOfNode(node, ast);
}
function getText(node, context) {
  let { sfc, ast, source = "scriptSetup" } = context;
  ast = ast || _optionalChain([sfc, 'optionalAccess', _3 => _3[source], 'optionalAccess', _4 => _4.ast]);
  return ast.text.slice(getStart(node, context), node.end);
}
function isJsxExpression(node) {
  return _optionalChain([node, 'optionalAccess', _5 => _5.kind]) === 294;
}
function patchSFC(block, offset) {
  if (block) {
    block.loc.start.column -= offset;
    block.loc.start.offset -= offset;
    block.loc.end.offset -= offset;
    if (block.loc.end.line === block.loc.start.line) {
      block.loc.end.column -= offset;
    }
  }
}











exports.REGEX_DEFINE_COMPONENT = REGEX_DEFINE_COMPONENT; exports.addProps = addProps; exports.addEmits = addEmits; exports.addCode = addCode; exports.getVolarOptions = getVolarOptions; exports.getStart = getStart; exports.getText = getText; exports.isJsxExpression = isJsxExpression; exports.patchSFC = patchSFC;
