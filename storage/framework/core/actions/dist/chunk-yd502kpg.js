// @bun
import {
  ruby
} from "./chunk-j2wea1c9.js";
import"./chunk-6bnzvp5w.js";
import"./chunk-8de719pq.js";
import"./chunk-8ksqq8hx.js";
import"./chunk-zxxsmbgp.js";
import"./chunk-pbmjg5ta.js";
import"./chunk-kk6gh973.js";
import {
  html
} from "./chunk-1z351g9m.js";
import"./chunk-5pe47x6e.js";
import"./chunk-z9kr9mmc.js";
import"./chunk-1j66gxht.js";

// ../../../../node_modules/vue-email/node_modules/shiki/dist/langs/erb.mjs
var lang = Object.freeze({ displayName: "ERB", fileTypes: ["erb", "rhtml", "html.erb"], injections: { "text.html.erb - (meta.embedded.block.erb | meta.embedded.line.erb | comment)": { patterns: [{ begin: "(^\\s*)(?=<%+#(?![^%]*%>))", beginCaptures: { "0": { name: "punctuation.whitespace.comment.leading.erb" } }, end: "(?!\\G)(\\s*$\\n)?", endCaptures: { "0": { name: "punctuation.whitespace.comment.trailing.erb" } }, patterns: [{ include: "#comment" }] }, { begin: "(^\\s*)(?=<%(?![^%]*%>))", beginCaptures: { "0": { name: "punctuation.whitespace.embedded.leading.erb" } }, end: "(?!\\G)(\\s*$\\n)?", endCaptures: { "0": { name: "punctuation.whitespace.embedded.trailing.erb" } }, patterns: [{ include: "#tags" }] }, { include: "#comment" }, { include: "#tags" }] } }, name: "erb", patterns: [{ include: "text.html.basic" }], repository: { comment: { patterns: [{ begin: "<%+#", beginCaptures: { "0": { name: "punctuation.definition.comment.begin.erb" } }, end: "%>", endCaptures: { "0": { name: "punctuation.definition.comment.end.erb" } }, name: "comment.block.erb" }] }, tags: { patterns: [{ begin: "<%+(?!>)[-=]?(?![^%]*%>)", beginCaptures: { "0": { name: "punctuation.section.embedded.begin.erb" } }, contentName: "source.ruby", end: "(-?%)>", endCaptures: { "0": { name: "punctuation.section.embedded.end.erb" }, "1": { name: "source.ruby" } }, name: "meta.embedded.block.erb", patterns: [{ captures: { "1": { name: "punctuation.definition.comment.erb" } }, match: "(#).*?(?=-?%>)", name: "comment.line.number-sign.erb" }, { include: "source.ruby" }] }, { begin: "<%+(?!>)[-=]?", beginCaptures: { "0": { name: "punctuation.section.embedded.begin.erb" } }, contentName: "source.ruby", end: "(-?%)>", endCaptures: { "0": { name: "punctuation.section.embedded.end.erb" }, "1": { name: "source.ruby" } }, name: "meta.embedded.line.erb", patterns: [{ captures: { "1": { name: "punctuation.definition.comment.erb" } }, match: "(#).*?(?=-?%>)", name: "comment.line.number-sign.erb" }, { include: "source.ruby" }] }] } }, scopeName: "text.html.erb", embeddedLangs: ["html", "ruby"] });
var erb = [
  ...html,
  ...ruby,
  lang
];
export {
  erb as default
};
