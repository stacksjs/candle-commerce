"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEGU4N6PXjs = require('./chunk-EGU4N6PX.js');


var _chunkGNURCPBJjs = require('./chunk-GNURCPBJ.js');


var _chunk3ODTIJIVjs = require('./chunk-3ODTIJIV.js');


var _chunkS5IRVDASjs = require('./chunk-S5IRVDAS.js');


var _chunkHEQSPOZHjs = require('./chunk-HEQSPOZH.js');


var _chunkTIOHFKS7js = require('./chunk-TIOHFKS7.js');


var _chunk3J2VQLRKjs = require('./chunk-3J2VQLRK.js');


var _chunkAL7TL7E6js = require('./chunk-AL7TL7E6.js');


var _chunkUNZLKUZBjs = require('./chunk-UNZLKUZB.js');


var _chunk7DSAP2PIjs = require('./chunk-7DSAP2PI.js');


var _chunkIGETBVAMjs = require('./chunk-IGETBVAM.js');


var _chunkDXSFUSOYjs = require('./chunk-DXSFUSOY.js');


var _chunkFEMYKYBYjs = require('./chunk-FEMYKYBY.js');


var _chunkSQNWMKHKjs = require('./chunk-SQNWMKHK.js');


var _chunkQK7K53HHjs = require('./chunk-QK7K53HH.js');


var _chunk2K57YKYUjs = require('./chunk-2K57YKYU.js');


var _chunk5YM43MCTjs = require('./chunk-5YM43MCT.js');


var _chunkBKEM3ZBTjs = require('./chunk-BKEM3ZBT.js');


var _chunkAYLN7HFVjs = require('./chunk-AYLN7HFV.js');


var _chunk6LLWWLOSjs = require('./chunk-6LLWWLOS.js');


var _chunkPEB2SWHRjs = require('./chunk-PEB2SWHR.js');

// src/index.ts
var plugins = {
  defineOptions: _chunkBKEM3ZBTjs.define_options_default,
  defineModels: _chunk5YM43MCTjs.define_models_default,
  defineProps: _chunk3J2VQLRKjs.define_props_default,
  definePropsRefs: _chunkPEB2SWHRjs.define_props_refs_default,
  shortBind: _chunkHEQSPOZHjs.short_bind_default,
  shortVmodel: _chunkTIOHFKS7js.short_vmodel_default,
  defineSlots: _chunkAL7TL7E6js.define_slots_default,
  jsxDirective: _chunkDXSFUSOYjs.jsx_directive_default,
  booleanProp: _chunkSQNWMKHKjs.boolean_prop_default,
  exportRender: _chunkIGETBVAMjs.export_render_default,
  exportProps: _chunk7DSAP2PIjs.export_props_default,
  exportExpose: _chunkUNZLKUZBjs.export_expose_default,
  defineProp: _chunkAYLN7HFVjs.define_prop_default,
  defineEmit: _chunkQK7K53HHjs.define_emit_default,
  defineGeneric: _chunk2K57YKYUjs.define_generic_default,
  setupJsdoc: _chunk3ODTIJIVjs.setup_jsdoc_default,
  setupSFC: _chunkS5IRVDASjs.setup_sfc_default,
  scriptSFC: _chunkGNURCPBJjs.script_sfc_default,
  scriptLang: _chunkEGU4N6PXjs.script_lang_default,
  jsxRef: _chunkFEMYKYBYjs.jsx_ref_default
};
var plugin = (ctx) => Object.entries(plugins).flatMap(([name, plugin2]) => {
  const options = _chunk6LLWWLOSjs.getVolarOptions.call(void 0, ctx, name);
  if (!options) return [];
  (ctx.vueCompilerOptions.vueMacros ??= {})[name] ??= options;
  return plugin2(ctx, options);
});
var index_default = plugin;


exports.default = index_default;

module.exports = exports.default;
