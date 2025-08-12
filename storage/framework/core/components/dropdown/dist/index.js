function e(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
e("");
import * as t from "vue";
import { Fragment as n, cloneVNode as r, computed as i, defineComponent as a, h as o, inject as s, nextTick as c, onMounted as l, onUnmounted as u, provide as d, ref as f, watchEffect as p } from "vue";
var m;
let h = Symbol("headlessui.useid"), g = 0;
const _ = (m = t.useId) ?? function() {
	return t.inject(h, () => `${++g}`)();
};
function v(e) {
	var t;
	if (e == null || e.value == null) return null;
	let n = (t = e.value.$el) ?? e.value;
	return n instanceof Node ? n : null;
}
function y(e, t, ...n) {
	if (e in t) {
		let r = t[e];
		return typeof r == "function" ? r(...n) : r;
	}
	let r = /* @__PURE__ */ Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((e) => `"${e}"`).join(", ")}.`);
	throw Error.captureStackTrace && Error.captureStackTrace(r, y), r;
}
var b = Object.defineProperty, x = (e, t, n) => t in e ? b(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, S = (e, t, n) => (x(e, typeof t == "symbol" ? t : t + "", n), n), C = class {
	constructor() {
		S(this, "current", this.detect()), S(this, "currentId", 0);
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
let w = new C();
function T(e) {
	if (w.isServer) return null;
	if (e instanceof Node) return e.ownerDocument;
	if (e != null && e.hasOwnProperty("value")) {
		let t = v(e);
		if (t) return t.ownerDocument;
	}
	return document;
}
let E = [
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
var D = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(D || {}), ee = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(ee || {}), te = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(te || {});
function O(e = document.body) {
	return e == null ? [] : Array.from(e.querySelectorAll(E)).sort((e, t) => Math.sign((e.tabIndex || 2 ** 53 - 1) - (t.tabIndex || 2 ** 53 - 1)));
}
var k = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(k || {});
function A(e, t = 0) {
	var n;
	return e === (n = T(e))?.body ? !1 : y(t, {
		0() {
			return e.matches(E);
		},
		1() {
			let t = e;
			for (; t !== null;) {
				if (t.matches(E)) return !0;
				t = t.parentElement;
			}
			return !1;
		}
	});
}
function j(e) {
	let t = T(e);
	c(() => {
		t && !A(t.activeElement, 0) && re(e);
	});
}
var ne = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(ne || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
	e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
	e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function re(e) {
	e?.focus({ preventScroll: !0 });
}
let ie = ["textarea", "input"].join(",");
function ae(e) {
	var t, n;
	return (n = (t = e?.matches)?.call(e, ie)) ?? !1;
}
function M(e, t = (e) => e) {
	return e.slice().sort((e, n) => {
		let r = t(e), i = t(n);
		if (r === null || i === null) return 0;
		let a = r.compareDocumentPosition(i);
		return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
	});
}
function oe(e, t) {
	return se(O(), t, { relativeTo: e });
}
function se(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: i = [] } = {}) {
	var a;
	let o = (a = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e?.ownerDocument) ?? document, s = Array.isArray(e) ? n ? M(e) : e : O(e);
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
	return t & 6 && ae(p) && p.select(), 2;
}
function N() {
	return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function ce() {
	return /Android/gi.test(window.navigator.userAgent);
}
function le() {
	return N() || ce();
}
function P(e, t, n) {
	w.isServer || p((r) => {
		document.addEventListener(e, t, n), r(() => document.removeEventListener(e, t, n));
	});
}
function ue(e, t, n) {
	w.isServer || p((r) => {
		window.addEventListener(e, t, n), r(() => window.removeEventListener(e, t, n));
	});
}
function de(e, t, n = i(() => !0)) {
	function r(r, i) {
		if (!n.value || r.defaultPrevented) return;
		let a = i(r);
		if (a === null || !a.getRootNode().contains(a)) return;
		let o = function e(t) {
			return typeof t == "function" ? e(t()) : Array.isArray(t) || t instanceof Set ? t : [t];
		}(e);
		for (let e of o) {
			if (e === null) continue;
			let t = e instanceof HTMLElement ? e : v(e);
			if (t != null && t.contains(a) || r.composed && r.composedPath().includes(t)) return;
		}
		return !A(a, k.Loose) && a.tabIndex !== -1 && r.preventDefault(), t(r, a);
	}
	let a = f(null);
	P("pointerdown", (e) => {
		var t, r;
		n.value && (a.value = (r = (t = e.composedPath)?.call(e))?.[0] || e.target);
	}, !0), P("mousedown", (e) => {
		var t, r;
		n.value && (a.value = (r = (t = e.composedPath)?.call(e))?.[0] || e.target);
	}, !0), P("click", (e) => {
		le() || a.value && (r(e, () => a.value), a.value = null);
	}, !0), P("touchend", (e) => r(e, () => e.target instanceof HTMLElement ? e.target : null), !0), ue("blur", (e) => r(e, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function F(e, t) {
	if (e) return e;
	let n = t ?? "button";
	if (typeof n == "string" && n.toLowerCase() === "button") return "button";
}
function fe(e, t) {
	let n = f(F(e.value.type, e.value.as));
	return l(() => {
		n.value = F(e.value.type, e.value.as);
	}), p(() => {
		var e;
		n.value || v(t) && v(t) instanceof HTMLButtonElement && !((e = v(t)) != null && e.hasAttribute("type")) && (n.value = "button");
	}), n;
}
function I(e) {
	return [e.screenX, e.screenY];
}
function pe() {
	let e = f([-1, -1]);
	return {
		wasMoved(t) {
			let n = I(t);
			return e.value[0] === n[0] && e.value[1] === n[1] ? !1 : (e.value = n, !0);
		},
		update(t) {
			e.value = I(t);
		}
	};
}
function me({ container: e, accept: t, walk: n, enabled: r }) {
	p(() => {
		let i = e.value;
		if (!i || r !== void 0 && !r.value) return;
		let a = T(e);
		if (!a) return;
		let o = Object.assign((e) => t(e), { acceptNode: t }), s = a.createTreeWalker(i, NodeFilter.SHOW_ELEMENT, o, !1);
		for (; s.nextNode();) n(s.currentNode);
	});
}
var L = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(L || {}), he = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(he || {});
function R({ visible: e = !0, features: t = 0, ourProps: n, theirProps: r,...i }) {
	var a;
	let o = V(r, n), s = Object.assign(i, { props: o });
	if (e || t & 2 && o.static) return z(s);
	if (t & 1) {
		let e = (a = o.unmount) == null || a ? 0 : 1;
		return y(e, {
			0() {
				return null;
			},
			1() {
				return z({
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
	return z(s);
}
function z({ props: e, attrs: t, slots: n, slot: i, name: a }) {
	var s, c;
	let { as: l,...u } = ge(e, ["unmount", "static"]), d = (s = n.default)?.call(n, i), f = {};
	if (i) {
		let e = !1, t = [];
		for (let [n, r] of Object.entries(i)) typeof r == "boolean" && (e = !0), r === !0 && t.push(n);
		e && (f["data-headlessui-state"] = t.join(" "));
	}
	if (l === "template") {
		if (d = B(d ?? []), Object.keys(u).length > 0 || Object.keys(t).length > 0) {
			let [e, ...n] = d ?? [];
			if (!_e(e) || n.length > 0) throw Error([
				"Passing props on \"template\"!",
				"",
				`The current component <${a} /> is rendering a "template".`,
				"However we need to passthrough the following props:",
				Object.keys(u).concat(Object.keys(t)).map((e) => e.trim()).filter((e, t, n) => n.indexOf(e) === t).sort((e, t) => e.localeCompare(t)).map((e) => `  - ${e}`).join("\n"),
				"",
				"You can apply a few solutions:",
				["Add an `as=\"...\"` prop, to ensure that we render an actual element instead of a \"template\".", "Render a single element as the child so that we can forward the props onto that element."].map((e) => `  - ${e}`).join("\n")
			].join("\n"));
			let i = V((c = e.props) ?? {}, u, f), o = r(e, i, !0);
			for (let e in i) e.startsWith("on") && (o.props ||= {}, o.props[e] = i[e]);
			return o;
		}
		return Array.isArray(d) && d.length === 1 ? d[0] : d;
	}
	return o(l, Object.assign({}, u, f), { default: () => d });
}
function B(e) {
	return e.flatMap((e) => e.type === n ? B(e.children) : [e]);
}
function V(...e) {
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
function ge(e, t = []) {
	let n = Object.assign({}, e);
	for (let e of t) e in n && delete n[e];
	return n;
}
function _e(e) {
	return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
let H = Symbol("Context");
var U = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(U || {});
function ve() {
	return s(H, null);
}
function ye(e) {
	d(H, e);
}
var W = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(W || {});
function be(e) {
	throw Error("Unexpected object: " + e);
}
var G = ((e) => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(G || {});
function xe(e, t) {
	let n = t.resolveItems();
	if (n.length <= 0) return null;
	let r = t.resolveActiveIndex(), i = r ?? -1;
	switch (e.focus) {
		case 0:
			for (let e = 0; e < n.length; ++e) if (!t.resolveDisabled(n[e], e, n)) return e;
			return r;
		case 1:
			i === -1 && (i = n.length);
			for (let e = i - 1; e >= 0; --e) if (!t.resolveDisabled(n[e], e, n)) return e;
			return r;
		case 2:
			for (let e = i + 1; e < n.length; ++e) if (!t.resolveDisabled(n[e], e, n)) return e;
			return r;
		case 3:
			for (let e = n.length - 1; e >= 0; --e) if (!t.resolveDisabled(n[e], e, n)) return e;
			return r;
		case 4:
			for (let r = 0; r < n.length; ++r) if (t.resolveId(n[r], r, n) === e.id) return r;
			return r;
		case 5: return null;
		default: be(e);
	}
}
let K = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function q(e) {
	var t, n;
	let r = (t = e.innerText) ?? "", i = e.cloneNode(!0);
	if (!(i instanceof HTMLElement)) return r;
	let a = !1;
	for (let e of i.querySelectorAll("[hidden],[aria-hidden],[role=\"img\"]")) e.remove(), a = !0;
	let o = a ? (n = i.innerText) ?? "" : r;
	return K.test(o) && (o = o.replace(K, "")), o;
}
function Se(e) {
	let t = e.getAttribute("aria-label");
	if (typeof t == "string") return t.trim();
	let n = e.getAttribute("aria-labelledby");
	if (n) {
		let e = n.split(" ").map((e) => {
			let t = document.getElementById(e);
			if (t) {
				let e = t.getAttribute("aria-label");
				return typeof e == "string" ? e.trim() : q(t).trim();
			}
			return null;
		}).filter(Boolean);
		if (e.length > 0) return e.join(", ");
	}
	return q(e).trim();
}
function Ce(e) {
	let t = f(""), n = f("");
	return () => {
		let r = v(e);
		if (!r) return "";
		let i = r.innerText;
		if (t.value === i) return n.value;
		let a = Se(r).trim().toLowerCase();
		return t.value = i, n.value = a, a;
	};
}
var we = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(we || {}), Te = ((e) => (e[e.Pointer = 0] = "Pointer", e[e.Other = 1] = "Other", e))(Te || {});
function Ee(e) {
	requestAnimationFrame(() => requestAnimationFrame(e));
}
let J = Symbol("MenuContext");
function Y(e) {
	let t = s(J, null);
	if (t === null) {
		let t = /* @__PURE__ */ Error(`<${e} /> is missing a parent <Menu /> component.`);
		throw Error.captureStackTrace && Error.captureStackTrace(t, Y), t;
	}
	return t;
}
let X = a({
	name: "Menu",
	props: { as: {
		type: [Object, String],
		default: "template"
	} },
	setup(e, { slots: t, attrs: n }) {
		let r = f(1), a = f(null), o = f(null), s = f([]), c = f(""), l = f(null), u = f(1);
		function p(e = (e) => e) {
			let t = l.value === null ? null : s.value[l.value], n = M(e(s.value.slice()), (e) => v(e.dataRef.domRef)), r = t ? n.indexOf(t) : null;
			return r === -1 && (r = null), {
				items: n,
				activeItemIndex: r
			};
		}
		let m = {
			menuState: r,
			buttonRef: a,
			itemsRef: o,
			items: s,
			searchQuery: c,
			activeItemIndex: l,
			activationTrigger: u,
			closeMenu: () => {
				r.value = 1, l.value = null;
			},
			openMenu: () => r.value = 0,
			goToItem(e, t, n) {
				let r = p(), i = xe(e === G.Specific ? {
					focus: G.Specific,
					id: t
				} : { focus: e }, {
					resolveItems: () => r.items,
					resolveActiveIndex: () => r.activeItemIndex,
					resolveId: (e) => e.id,
					resolveDisabled: (e) => e.dataRef.disabled
				});
				c.value = "", l.value = i, u.value = n ?? 1, s.value = r.items;
			},
			search(e) {
				let t = c.value === "" ? 1 : 0;
				c.value += e.toLowerCase();
				let n = (l.value === null ? s.value : s.value.slice(l.value + t).concat(s.value.slice(0, l.value + t))).find((e) => e.dataRef.textValue.startsWith(c.value) && !e.dataRef.disabled), r = n ? s.value.indexOf(n) : -1;
				r === -1 || r === l.value || (l.value = r, u.value = 1);
			},
			clearSearch() {
				c.value = "";
			},
			registerItem(e, t) {
				let n = p((n) => [...n, {
					id: e,
					dataRef: t
				}]);
				s.value = n.items, l.value = n.activeItemIndex, u.value = 1;
			},
			unregisterItem(e) {
				let t = p((t) => {
					let n = t.findIndex((t) => t.id === e);
					return n !== -1 && t.splice(n, 1), t;
				});
				s.value = t.items, l.value = t.activeItemIndex, u.value = 1;
			}
		};
		return de([a, o], (e, t) => {
			var n;
			m.closeMenu(), A(t, k.Loose) || (e.preventDefault(), (n = v(a)) == null || n.focus());
		}, i(() => r.value === 0)), d(J, m), ye(i(() => y(r.value, {
			0: U.Open,
			1: U.Closed
		}))), () => {
			let i = {
				open: r.value === 0,
				close: m.closeMenu
			};
			return R({
				ourProps: {},
				theirProps: e,
				slot: i,
				slots: t,
				attrs: n,
				name: "Menu"
			});
		};
	}
}), Z = a({
	name: "MenuButton",
	props: {
		disabled: {
			type: Boolean,
			default: !1
		},
		as: {
			type: [Object, String],
			default: "button"
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(e, { attrs: t, slots: n, expose: r }) {
		var a;
		let o = (a = e.id) ?? `headlessui-menu-button-${_()}`, s = Y("MenuButton");
		r({
			el: s.buttonRef,
			$el: s.buttonRef
		});
		function l(e) {
			switch (e.key) {
				case W.Space:
				case W.Enter:
				case W.ArrowDown:
					e.preventDefault(), e.stopPropagation(), s.openMenu(), c(() => {
						var e;
						(e = v(s.itemsRef)) == null || e.focus({ preventScroll: !0 }), s.goToItem(G.First);
					});
					break;
				case W.ArrowUp:
					e.preventDefault(), e.stopPropagation(), s.openMenu(), c(() => {
						var e;
						(e = v(s.itemsRef)) == null || e.focus({ preventScroll: !0 }), s.goToItem(G.Last);
					});
					break;
			}
		}
		function u(e) {
			switch (e.key) {
				case W.Space:
					e.preventDefault();
					break;
			}
		}
		function d(t) {
			e.disabled || (s.menuState.value === 0 ? (s.closeMenu(), c(() => {
				var e;
				return (e = v(s.buttonRef))?.focus({ preventScroll: !0 });
			})) : (t.preventDefault(), s.openMenu(), Ee(() => {
				var e;
				return (e = v(s.itemsRef))?.focus({ preventScroll: !0 });
			})));
		}
		let f = fe(i(() => ({
			as: e.as,
			type: t.type
		})), s.buttonRef);
		return () => {
			var r;
			let i = { open: s.menuState.value === 0 }, { ...a } = e, c = {
				ref: s.buttonRef,
				id: o,
				type: f.value,
				"aria-haspopup": "menu",
				"aria-controls": (r = v(s.itemsRef))?.id,
				"aria-expanded": s.menuState.value === 0,
				onKeydown: l,
				onKeyup: u,
				onClick: d
			};
			return R({
				ourProps: c,
				theirProps: a,
				slot: i,
				attrs: t,
				slots: n,
				name: "MenuButton"
			});
		};
	}
}), Q = a({
	name: "MenuItems",
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		static: {
			type: Boolean,
			default: !1
		},
		unmount: {
			type: Boolean,
			default: !0
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(e, { attrs: t, slots: n, expose: r }) {
		var a;
		let o = (a = e.id) ?? `headlessui-menu-items-${_()}`, s = Y("MenuItems"), l = f(null);
		r({
			el: s.itemsRef,
			$el: s.itemsRef
		}), me({
			container: i(() => v(s.itemsRef)),
			enabled: i(() => s.menuState.value === 0),
			accept(e) {
				return e.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : e.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
			},
			walk(e) {
				e.setAttribute("role", "none");
			}
		});
		function u(e) {
			var t;
			switch (l.value && clearTimeout(l.value), e.key) {
				case W.Space: if (s.searchQuery.value !== "") return e.preventDefault(), e.stopPropagation(), s.search(e.key);
				case W.Enter:
					if (e.preventDefault(), e.stopPropagation(), s.activeItemIndex.value !== null) {
						let e = s.items.value[s.activeItemIndex.value];
						(t = v(e.dataRef.domRef)) == null || t.click();
					}
					s.closeMenu(), j(v(s.buttonRef));
					break;
				case W.ArrowDown: return e.preventDefault(), e.stopPropagation(), s.goToItem(G.Next);
				case W.ArrowUp: return e.preventDefault(), e.stopPropagation(), s.goToItem(G.Previous);
				case W.Home:
				case W.PageUp: return e.preventDefault(), e.stopPropagation(), s.goToItem(G.First);
				case W.End:
				case W.PageDown: return e.preventDefault(), e.stopPropagation(), s.goToItem(G.Last);
				case W.Escape:
					e.preventDefault(), e.stopPropagation(), s.closeMenu(), c(() => {
						var e;
						return (e = v(s.buttonRef))?.focus({ preventScroll: !0 });
					});
					break;
				case W.Tab:
					e.preventDefault(), e.stopPropagation(), s.closeMenu(), c(() => oe(v(s.buttonRef), e.shiftKey ? D.Previous : D.Next));
					break;
				default:
					e.key.length === 1 && (s.search(e.key), l.value = setTimeout(() => s.clearSearch(), 350));
					break;
			}
		}
		function d(e) {
			switch (e.key) {
				case W.Space:
					e.preventDefault();
					break;
			}
		}
		let p = ve(), m = i(() => p === null ? s.menuState.value === 0 : (p.value & U.Open) === U.Open);
		return () => {
			var r, i;
			let a = { open: s.menuState.value === 0 }, { ...c } = e, l = {
				"aria-activedescendant": s.activeItemIndex.value === null || (r = s.items.value[s.activeItemIndex.value]) == null ? void 0 : r.id,
				"aria-labelledby": (i = v(s.buttonRef))?.id,
				id: o,
				onKeydown: u,
				onKeyup: d,
				role: "menu",
				tabIndex: 0,
				ref: s.itemsRef
			};
			return R({
				ourProps: l,
				theirProps: c,
				slot: a,
				attrs: t,
				slots: n,
				features: L.RenderStrategy | L.Static,
				visible: m.value,
				name: "MenuItems"
			});
		};
	}
}), $ = a({
	name: "MenuItem",
	inheritAttrs: !1,
	props: {
		as: {
			type: [Object, String],
			default: "template"
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(e, { slots: t, attrs: n, expose: r }) {
		var a;
		let o = (a = e.id) ?? `headlessui-menu-item-${_()}`, s = Y("MenuItem"), d = f(null);
		r({
			el: d,
			$el: d
		});
		let m = i(() => s.activeItemIndex.value === null ? !1 : s.items.value[s.activeItemIndex.value].id === o), h = Ce(d), g = i(() => ({
			disabled: e.disabled,
			get textValue() {
				return h();
			},
			domRef: d
		}));
		l(() => s.registerItem(o, g)), u(() => s.unregisterItem(o)), p(() => {
			s.menuState.value === 0 && m.value && s.activationTrigger.value !== 0 && c(() => {
				var e, t;
				return (t = (e = v(d))?.scrollIntoView)?.call(e, { block: "nearest" });
			});
		});
		function y(t) {
			if (e.disabled) return t.preventDefault();
			s.closeMenu(), j(v(s.buttonRef));
		}
		function b() {
			if (e.disabled) return s.goToItem(G.Nothing);
			s.goToItem(G.Specific, o);
		}
		let x = pe();
		function S(e) {
			x.update(e);
		}
		function C(t) {
			x.wasMoved(t) && (e.disabled || m.value || s.goToItem(G.Specific, o, 0));
		}
		function w(t) {
			x.wasMoved(t) && (e.disabled || m.value && s.goToItem(G.Nothing));
		}
		return () => {
			let { disabled: r,...i } = e, a = {
				active: m.value,
				disabled: r,
				close: s.closeMenu
			};
			return R({
				ourProps: {
					id: o,
					ref: d,
					role: "menuitem",
					tabIndex: r === !0 ? void 0 : -1,
					"aria-disabled": r === !0 ? !0 : void 0,
					onClick: y,
					onFocus: b,
					onPointerenter: S,
					onMouseenter: S,
					onPointermove: C,
					onMousemove: C,
					onPointerleave: w,
					onMouseleave: w
				},
				theirProps: {
					...n,
					...i
				},
				slot: a,
				attrs: n,
				slots: t,
				name: "MenuItem"
			});
		};
	}
});
const De = { install(e) {
	Object.entries({
		Menu: X,
		MenuButton: Z,
		MenuItem: $,
		MenuItems: Q
	}).forEach(([t, n]) => {
		e.component(t, n);
	});
} };
var Oe = De;
export { X as Dropdown, X as Menu, Z as DropdownButton, Z as MenuButton, $ as DropdownItem, $ as MenuItem, Q as DropdownItems, Q as MenuItems, Oe as default };

//# sourceMappingURL=index.js.map