function e(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
e("");
import * as t from "vue";
import { Fragment as n, cloneVNode as r, computed as i, defineComponent as a, h as o, inject as s, onMounted as c, onUnmounted as l, provide as u, ref as d, toRaw as f, unref as p, watch as m, watchEffect as h } from "vue";
function g(e, t, n) {
	let r = d(n?.value), a = i(() => e.value !== void 0);
	return [i(() => a.value ? e.value : r.value), function(e) {
		return a.value || (r.value = e), t?.(e);
	}];
}
var _;
let v = Symbol("headlessui.useid"), y = 0;
const b = (_ = t.useId) ?? function() {
	return t.inject(v, () => `${++y}`)();
};
function x(e) {
	var t;
	if (e == null || e.value == null) return null;
	let n = (t = e.value.$el) ?? e.value;
	return n instanceof Node ? n : null;
}
function S(e, t, ...n) {
	if (e in t) {
		let r = t[e];
		return typeof r == "function" ? r(...n) : r;
	}
	let r = /* @__PURE__ */ Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((e) => `"${e}"`).join(", ")}.`);
	throw Error.captureStackTrace && Error.captureStackTrace(r, S), r;
}
var C = Object.defineProperty, w = (e, t, n) => t in e ? C(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, T = (e, t, n) => (w(e, typeof t == "symbol" ? t : t + "", n), n), E = class {
	constructor() {
		T(this, "current", this.detect()), T(this, "currentId", 0);
	}
	set(e) {
		this.current !== e && (this.currentId = 0, this.current = e);
	}
	reset() {
		this.set(this.detect());
	}
	nextId() {
		return ++this.currentId;
	}
	get isServer() {
		return this.current === "server";
	}
	get isClient() {
		return this.current === "client";
	}
	detect() {
		return typeof window > "u" || typeof document > "u" ? "server" : "client";
	}
};
let ee = new E();
function D(e) {
	if (ee.isServer) return null;
	if (e instanceof Node) return e.ownerDocument;
	if (e != null && e.hasOwnProperty("value")) {
		let t = x(e);
		if (t) return t.ownerDocument;
	}
	return document;
}
let te = [
	"[contentEditable=true]",
	"[tabindex]",
	"a[href]",
	"area[href]",
	"button:not([disabled])",
	"iframe",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])"
].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var O = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(O || {}), k = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(k || {}), ne = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(ne || {});
function re(e = document.body) {
	return e == null ? [] : Array.from(e.querySelectorAll(te)).sort((e, t) => Math.sign((e.tabIndex || 2 ** 53 - 1) - (t.tabIndex || 2 ** 53 - 1)));
}
var ie = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(ie || {}), ae = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(ae || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
	e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
	e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
let oe = ["textarea", "input"].join(",");
function se(e) {
	var t, n;
	return (n = (t = e?.matches)?.call(e, oe)) ?? !1;
}
function A(e, t = (e) => e) {
	return e.slice().sort((e, n) => {
		let r = t(e), i = t(n);
		if (r === null || i === null) return 0;
		let a = r.compareDocumentPosition(i);
		return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
	});
}
function j(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: i = [] } = {}) {
	var a;
	let o = (a = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e?.ownerDocument) ?? document, s = Array.isArray(e) ? n ? A(e) : e : re(e);
	i.length > 0 && s.length > 1 && (s = s.filter((e) => !i.includes(e))), r ??= o.activeElement;
	let c = (() => {
		if (t & 5) return 1;
		if (t & 10) return -1;
		throw Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
	})(), l = (() => {
		if (t & 1) return 0;
		if (t & 2) return Math.max(0, s.indexOf(r)) - 1;
		if (t & 4) return Math.max(0, s.indexOf(r)) + 1;
		if (t & 8) return s.length - 1;
		throw Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
	})(), u = t & 32 ? { preventScroll: !0 } : {}, d = 0, f = s.length, p;
	do {
		if (d >= f || d + f <= 0) return 0;
		let e = l + d;
		if (t & 16) e = (e + f) % f;
		else {
			if (e < 0) return 3;
			if (e >= f) return 1;
		}
		p = s[e], p?.focus(u), d += c;
	} while (p !== o.activeElement);
	return t & 6 && se(p) && p.select(), 2;
}
function ce({ container: e, accept: t, walk: n, enabled: r }) {
	h(() => {
		let i = e.value;
		if (!i || r !== void 0 && !r.value) return;
		let a = D(e);
		if (!a) return;
		let o = Object.assign((e) => t(e), { acceptNode: t }), s = a.createTreeWalker(i, NodeFilter.SHOW_ELEMENT, o, !1);
		for (; s.nextNode();) n(s.currentNode);
	});
}
var le = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(le || {}), ue = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(ue || {});
function M({ visible: e = !0, features: t = 0, ourProps: n, theirProps: r,...i }) {
	var a;
	let o = F(r, n), s = Object.assign(i, { props: o });
	if (e || t & 2 && o.static) return N(s);
	if (t & 1) {
		let e = (a = o.unmount) == null || a ? 0 : 1;
		return S(e, {
			0() {
				return null;
			},
			1() {
				return N({
					...i,
					props: {
						...o,
						hidden: !0,
						style: { display: "none" }
					}
				});
			}
		});
	}
	return N(s);
}
function N({ props: e, attrs: t, slots: n, slot: i, name: a }) {
	var s, c;
	let { as: l,...u } = I(e, ["unmount", "static"]), d = (s = n.default)?.call(n, i), f = {};
	if (i) {
		let e = !1, t = [];
		for (let [n, r] of Object.entries(i)) typeof r == "boolean" && (e = !0), r === !0 && t.push(n);
		e && (f["data-headlessui-state"] = t.join(" "));
	}
	if (l === "template") {
		if (d = P(d ?? []), Object.keys(u).length > 0 || Object.keys(t).length > 0) {
			let [e, ...n] = d ?? [];
			if (!fe(e) || n.length > 0) throw Error([
				"Passing props on \"template\"!",
				"",
				`The current component <${a} /> is rendering a "template".`,
				"However we need to passthrough the following props:",
				Object.keys(u).concat(Object.keys(t)).map((e) => e.trim()).filter((e, t, n) => n.indexOf(e) === t).sort((e, t) => e.localeCompare(t)).map((e) => `  - ${e}`).join("\n"),
				"",
				"You can apply a few solutions:",
				["Add an `as=\"...\"` prop, to ensure that we render an actual element instead of a \"template\".", "Render a single element as the child so that we can forward the props onto that element."].map((e) => `  - ${e}`).join("\n")
			].join("\n"));
			let i = F((c = e.props) ?? {}, u, f), o = r(e, i, !0);
			for (let e in i) e.startsWith("on") && (o.props ||= {}, o.props[e] = i[e]);
			return o;
		}
		return Array.isArray(d) && d.length === 1 ? d[0] : d;
	}
	return o(l, Object.assign({}, u, f), { default: () => d });
}
function P(e) {
	return e.flatMap((e) => e.type === n ? P(e.children) : [e]);
}
function F(...e) {
	var t;
	if (e.length === 0) return {};
	if (e.length === 1) return e[0];
	let n = {}, r = {};
	for (let i of e) for (let e in i) e.startsWith("on") && typeof i[e] == "function" ? ((t = r[e]) ?? (r[e] = []), r[e].push(i[e])) : n[e] = i[e];
	if (n.disabled || n["aria-disabled"]) return Object.assign(n, Object.fromEntries(Object.keys(r).map((e) => [e, void 0])));
	for (let e in r) Object.assign(n, { [e](t, ...n) {
		let i = r[e];
		for (let e of i) {
			if (t instanceof Event && t.defaultPrevented) return;
			e(t, ...n);
		}
	} });
	return n;
}
function de(e) {
	let t = Object.assign({}, e);
	for (let e in t) t[e] === void 0 && delete t[e];
	return t;
}
function I(e, t = []) {
	let n = Object.assign({}, e);
	for (let e of t) e in n && delete n[e];
	return n;
}
function fe(e) {
	return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
var L = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(L || {});
let pe = a({
	name: "Hidden",
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		features: {
			type: Number,
			default: 1
		}
	},
	setup(e, { slots: t, attrs: n }) {
		return () => {
			var r;
			let { features: i,...a } = e, o = {
				"aria-hidden": (i & 2) == 2 ? !0 : (r = a["aria-hidden"]) ?? void 0,
				hidden: (i & 4) == 4 ? !0 : void 0,
				style: {
					position: "fixed",
					top: 1,
					left: 1,
					width: 1,
					height: 0,
					padding: 0,
					margin: -1,
					overflow: "hidden",
					clip: "rect(0, 0, 0, 0)",
					whiteSpace: "nowrap",
					borderWidth: "0",
					...(i & 4) == 4 && (i & 2) != 2 && { display: "none" }
				}
			};
			return M({
				ourProps: o,
				theirProps: a,
				slot: {},
				attrs: n,
				slots: t,
				name: "Hidden"
			});
		};
	}
});
var R = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(R || {});
function z(e = {}, t = null, n = []) {
	for (let [r, i] of Object.entries(e)) V(n, B(t, r), i);
	return n;
}
function B(e, t) {
	return e ? e + "[" + t + "]" : t;
}
function V(e, t, n) {
	if (Array.isArray(n)) for (let [r, i] of n.entries()) V(e, B(t, r.toString()), i);
	else n instanceof Date ? e.push([t, n.toISOString()]) : typeof n == "boolean" ? e.push([t, n ? "1" : "0"]) : typeof n == "string" ? e.push([t, n]) : typeof n == "number" ? e.push([t, `${n}`]) : n == null ? e.push([t, ""]) : z(n, t, e);
}
function me(e) {
	var t, n;
	let r = (t = e?.form) ?? e.closest("form");
	if (r) {
		for (let t of r.elements) if (t !== e && (t.tagName === "INPUT" && t.type === "submit" || t.tagName === "BUTTON" && t.type === "submit" || t.nodeName === "INPUT" && t.type === "image")) {
			t.click();
			return;
		}
		(n = r.requestSubmit) == null || n.call(r);
	}
}
let H = Symbol("DescriptionContext");
function he() {
	let e = s(H, null);
	if (e === null) throw Error("Missing parent");
	return e;
}
function U({ slot: e = d({}), name: t = "Description", props: n = {} } = {}) {
	let r = d([]);
	function a(e) {
		return r.value.push(e), () => {
			let t = r.value.indexOf(e);
			t !== -1 && r.value.splice(t, 1);
		};
	}
	return u(H, {
		register: a,
		slot: e,
		name: t,
		props: n
	}), i(() => r.value.length > 0 ? r.value.join(" ") : void 0);
}
let ge = a({
	name: "Description",
	props: {
		as: {
			type: [Object, String],
			default: "p"
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(e, { attrs: t, slots: n }) {
		var r;
		let i = (r = e.id) ?? `headlessui-description-${b()}`, a = he();
		return c(() => l(a.register(i))), () => {
			let { name: r = "Description", slot: o = d({}), props: s = {} } = a, { ...c } = e, l = {
				...Object.entries(s).reduce((e, [t, n]) => Object.assign(e, { [t]: p(n) }), {}),
				id: i
			};
			return M({
				ourProps: l,
				theirProps: c,
				slot: o.value,
				attrs: t,
				slots: n,
				name: r
			});
		};
	}
}), W = Symbol("LabelContext");
function G() {
	let e = s(W, null);
	if (e === null) {
		let e = /* @__PURE__ */ Error("You used a <Label /> component, but it is not inside a parent.");
		throw Error.captureStackTrace && Error.captureStackTrace(e, G), e;
	}
	return e;
}
function K({ slot: e = {}, name: t = "Label", props: n = {} } = {}) {
	let r = d([]);
	function a(e) {
		return r.value.push(e), () => {
			let t = r.value.indexOf(e);
			t !== -1 && r.value.splice(t, 1);
		};
	}
	return u(W, {
		register: a,
		slot: e,
		name: t,
		props: n
	}), i(() => r.value.length > 0 ? r.value.join(" ") : void 0);
}
let _e = a({
	name: "Label",
	props: {
		as: {
			type: [Object, String],
			default: "label"
		},
		passive: {
			type: [Boolean],
			default: !1
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(e, { slots: t, attrs: n }) {
		var r;
		let i = (r = e.id) ?? `headlessui-label-${b()}`, a = G();
		return c(() => l(a.register(i))), () => {
			let { name: r = "Label", slot: o = {}, props: s = {} } = a, { passive: c,...l } = e, u = {
				...Object.entries(s).reduce((e, [t, n]) => Object.assign(e, { [t]: p(n) }), {}),
				id: i
			};
			return c && (delete u.onClick, delete u.htmlFor, delete l.onClick), M({
				ourProps: u,
				theirProps: l,
				slot: o,
				attrs: n,
				slots: t,
				name: r
			});
		};
	}
});
function ve(e, t) {
	return e === t;
}
let q = Symbol("RadioGroupContext");
function J(e) {
	let t = s(q, null);
	if (t === null) {
		let t = /* @__PURE__ */ Error(`<${e} /> is missing a parent <RadioGroup /> component.`);
		throw Error.captureStackTrace && Error.captureStackTrace(t, J), t;
	}
	return t;
}
let Y = a({
	name: "RadioGroup",
	emits: { "update:modelValue": (e) => !0 },
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		disabled: {
			type: [Boolean],
			default: !1
		},
		by: {
			type: [String, Function],
			default: () => ve
		},
		modelValue: {
			type: [
				Object,
				String,
				Number,
				Boolean
			],
			default: void 0
		},
		defaultValue: {
			type: [
				Object,
				String,
				Number,
				Boolean
			],
			default: void 0
		},
		form: {
			type: String,
			optional: !0
		},
		name: {
			type: String,
			optional: !0
		},
		id: {
			type: String,
			default: null
		}
	},
	inheritAttrs: !1,
	setup(e, { emit: t, attrs: r, slots: a, expose: s }) {
		var l;
		let p = (l = e.id) ?? `headlessui-radiogroup-${b()}`, h = d(null), _ = d([]), v = K({ name: "RadioGroupLabel" }), y = U({ name: "RadioGroupDescription" });
		s({
			el: h,
			$el: h
		});
		let [S, C] = g(i(() => e.modelValue), (e) => t("update:modelValue", e), i(() => e.defaultValue)), w = {
			options: _,
			value: S,
			disabled: i(() => e.disabled),
			firstOption: i(() => _.value.find((e) => !e.propsRef.disabled)),
			containsCheckedOption: i(() => _.value.some((t) => w.compare(f(t.propsRef.value), f(e.modelValue)))),
			compare(t, n) {
				if (typeof e.by == "string") {
					let r = e.by;
					return t?.[r] === n?.[r];
				}
				return e.by(t, n);
			},
			change(t) {
				var n;
				if (e.disabled || w.compare(f(S.value), f(t))) return !1;
				let r = (n = _.value.find((e) => w.compare(f(e.propsRef.value), f(t))))?.propsRef;
				return r != null && r.disabled ? !1 : (C(t), !0);
			},
			registerOption(e) {
				_.value.push(e), _.value = A(_.value, (e) => e.element);
			},
			unregisterOption(e) {
				let t = _.value.findIndex((t) => t.id === e);
				t !== -1 && _.value.splice(t, 1);
			}
		};
		u(q, w), ce({
			container: i(() => x(h)),
			accept(e) {
				return e.getAttribute("role") === "radio" ? NodeFilter.FILTER_REJECT : e.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
			},
			walk(e) {
				e.setAttribute("role", "none");
			}
		});
		function T(e) {
			if (!h.value || !h.value.contains(e.target)) return;
			let t = _.value.filter((e) => e.propsRef.disabled === !1).map((e) => e.element);
			switch (e.key) {
				case R.Enter:
					me(e.currentTarget);
					break;
				case R.ArrowLeft:
				case R.ArrowUp:
					if (e.preventDefault(), e.stopPropagation(), j(t, O.Previous | O.WrapAround) === k.Success) {
						let e = _.value.find((e) => {
							var t;
							return e.element === (t = D(h))?.activeElement;
						});
						e && w.change(e.propsRef.value);
					}
					break;
				case R.ArrowRight:
				case R.ArrowDown:
					if (e.preventDefault(), e.stopPropagation(), j(t, O.Next | O.WrapAround) === k.Success) {
						let e = _.value.find((e) => {
							var t;
							return e.element === (t = D(e.element))?.activeElement;
						});
						e && w.change(e.propsRef.value);
					}
					break;
				case R.Space:
					{
						e.preventDefault(), e.stopPropagation();
						let t = _.value.find((e) => {
							var t;
							return e.element === (t = D(e.element))?.activeElement;
						});
						t && w.change(t.propsRef.value);
					}
					break;
			}
		}
		let E = i(() => {
			var e;
			return (e = x(h))?.closest("form");
		});
		return c(() => {
			m([E], () => {
				if (!E.value || e.defaultValue === void 0) return;
				function t() {
					w.change(e.defaultValue);
				}
				return E.value.addEventListener("reset", t), () => {
					var e;
					(e = E.value) == null || e.removeEventListener("reset", t);
				};
			}, { immediate: !0 });
		}), () => {
			let { disabled: t, name: i, form: s,...c } = e, l = {
				ref: h,
				id: p,
				role: "radiogroup",
				"aria-labelledby": v.value,
				"aria-describedby": y.value,
				onKeydown: T
			};
			return o(n, [...i != null && S.value != null ? z({ [i]: S.value }).map(([e, n]) => o(pe, de({
				features: L.Hidden,
				key: e,
				as: "input",
				type: "hidden",
				hidden: !0,
				readOnly: !0,
				form: s,
				disabled: t,
				name: e,
				value: n
			}))) : [], M({
				ourProps: l,
				theirProps: {
					...r,
					...I(c, [
						"modelValue",
						"defaultValue",
						"by"
					])
				},
				slot: {},
				attrs: r,
				slots: a,
				name: "RadioGroup"
			})]);
		};
	}
});
var X = ((e) => (e[e.Empty = 1] = "Empty", e[e.Active = 2] = "Active", e))(X || {});
let Z = a({
	name: "RadioGroupOption",
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		value: { type: [
			Object,
			String,
			Number,
			Boolean
		] },
		disabled: {
			type: Boolean,
			default: !1
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(e, { attrs: t, slots: n, expose: r }) {
		var a;
		let o = (a = e.id) ?? `headlessui-radiogroup-option-${b()}`, s = J("RadioGroupOption"), u = K({ name: "RadioGroupLabel" }), p = U({ name: "RadioGroupDescription" }), m = d(null), h = i(() => ({
			value: e.value,
			disabled: e.disabled
		})), g = d(1);
		r({
			el: m,
			$el: m
		});
		let _ = i(() => x(m));
		c(() => s.registerOption({
			id: o,
			element: _,
			propsRef: h
		})), l(() => s.unregisterOption(o));
		let v = i(() => {
			var e;
			return (e = s.firstOption.value)?.id === o;
		}), y = i(() => s.disabled.value || e.disabled), S = i(() => s.compare(f(s.value.value), f(e.value))), C = i(() => y.value ? -1 : S.value || !s.containsCheckedOption.value && v.value ? 0 : -1);
		function w() {
			var t;
			s.change(e.value) && (g.value |= 2, (t = x(m)) == null || t.focus());
		}
		function T() {
			g.value |= 2;
		}
		function E() {
			g.value &= -3;
		}
		return () => {
			let { value: r, disabled: i,...a } = e, s = {
				checked: S.value,
				disabled: y.value,
				active: !!(g.value & 2)
			}, c = {
				id: o,
				ref: m,
				role: "radio",
				"aria-checked": S.value ? "true" : "false",
				"aria-labelledby": u.value,
				"aria-describedby": p.value,
				"aria-disabled": y.value ? !0 : void 0,
				tabIndex: C.value,
				onClick: y.value ? void 0 : w,
				onFocus: y.value ? void 0 : T,
				onBlur: y.value ? void 0 : E
			};
			return M({
				ourProps: c,
				theirProps: a,
				slot: s,
				attrs: t,
				slots: n,
				name: "RadioGroupOption"
			});
		};
	}
}), Q = _e, $ = ge;
const ye = { install(e) {
	Object.entries({
		RadioGroup: Y,
		RadioGroupLabel: Q,
		RadioGroupDescription: $,
		RadioGroupOption: Z
	}).forEach(([t, n]) => {
		e.component(t, n);
	});
} };
var be = ye;
export { Y as RadioGroup, $ as RadioGroupDescription, Q as RadioGroupLabel, Z as RadioGroupOption, be as default };

//# sourceMappingURL=index.js.map