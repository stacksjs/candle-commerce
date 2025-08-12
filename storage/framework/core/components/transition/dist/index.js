function e(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
e("");
import * as t from "vue";
import { Fragment as n, cloneVNode as r, computed as i, defineComponent as a, h as o, inject as s, normalizeClass as c, onMounted as l, onUnmounted as u, provide as d, ref as f, watch as p, watchEffect as m } from "vue";
function h(e) {
	typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((e) => setTimeout(() => {
		throw e;
	}));
}
function g() {
	let e = [], t = {
		addEventListener(e, n, r, i) {
			return e.addEventListener(n, r, i), t.add(() => e.removeEventListener(n, r, i));
		},
		requestAnimationFrame(...e) {
			let n = requestAnimationFrame(...e);
			t.add(() => cancelAnimationFrame(n));
		},
		nextFrame(...e) {
			t.requestAnimationFrame(() => {
				t.requestAnimationFrame(...e);
			});
		},
		setTimeout(...e) {
			let n = setTimeout(...e);
			t.add(() => clearTimeout(n));
		},
		microTask(...e) {
			let n = { current: !0 };
			return h(() => {
				n.current && e[0]();
			}), t.add(() => {
				n.current = !1;
			});
		},
		style(e, t, n) {
			let r = e.style.getPropertyValue(t);
			return Object.assign(e.style, { [t]: n }), this.add(() => {
				Object.assign(e.style, { [t]: r });
			});
		},
		group(e) {
			let t = g();
			return e(t), this.add(() => t.dispose());
		},
		add(t) {
			return e.push(t), () => {
				let n = e.indexOf(t);
				if (n >= 0) for (let t of e.splice(n, 1)) t();
			};
		},
		dispose() {
			for (let t of e.splice(0)) t();
		}
	};
	return t;
}
var _;
let v = Symbol("headlessui.useid"), y = 0;
const ee = (_ = t.useId) ?? function() {
	return t.inject(v, () => `${++y}`)();
};
function b(e) {
	var t;
	if (e == null || e.value == null) return null;
	let n = (t = e.value.$el) ?? e.value;
	return n instanceof Node ? n : null;
}
function x(e, t, ...n) {
	if (e in t) {
		let r = t[e];
		return typeof r == "function" ? r(...n) : r;
	}
	let r = /* @__PURE__ */ Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((e) => `"${e}"`).join(", ")}.`);
	throw Error.captureStackTrace && Error.captureStackTrace(r, x), r;
}
var S = Object.defineProperty, C = (e, t, n) => t in e ? S(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, w = (e, t, n) => (C(e, typeof t == "symbol" ? t : t + "", n), n), T = class {
	constructor() {
		w(this, "current", this.detect()), w(this, "currentId", 0);
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
let te = new T();
var E = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(E || {}), D = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(D || {});
function O({ visible: e = !0, features: t = 0, ourProps: n, theirProps: r,...i }) {
	var a;
	let o = j(r, n), s = Object.assign(i, { props: o });
	if (e || t & 2 && o.static) return k(s);
	if (t & 1) {
		let e = (a = o.unmount) == null || a ? 0 : 1;
		return x(e, {
			0() {
				return null;
			},
			1() {
				return k({
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
	return k(s);
}
function k({ props: e, attrs: t, slots: n, slot: i, name: a }) {
	var s, c;
	let { as: l,...u } = M(e, ["unmount", "static"]), d = (s = n.default)?.call(n, i), f = {};
	if (i) {
		let e = !1, t = [];
		for (let [n, r] of Object.entries(i)) typeof r == "boolean" && (e = !0), r === !0 && t.push(n);
		e && (f["data-headlessui-state"] = t.join(" "));
	}
	if (l === "template") {
		if (d = A(d ?? []), Object.keys(u).length > 0 || Object.keys(t).length > 0) {
			let [e, ...n] = d ?? [];
			if (!N(e) || n.length > 0) throw Error([
				"Passing props on \"template\"!",
				"",
				`The current component <${a} /> is rendering a "template".`,
				"However we need to passthrough the following props:",
				Object.keys(u).concat(Object.keys(t)).map((e) => e.trim()).filter((e, t, n) => n.indexOf(e) === t).sort((e, t) => e.localeCompare(t)).map((e) => `  - ${e}`).join("\n"),
				"",
				"You can apply a few solutions:",
				["Add an `as=\"...\"` prop, to ensure that we render an actual element instead of a \"template\".", "Render a single element as the child so that we can forward the props onto that element."].map((e) => `  - ${e}`).join("\n")
			].join("\n"));
			let i = j((c = e.props) ?? {}, u, f), o = r(e, i, !0);
			for (let e in i) e.startsWith("on") && (o.props ||= {}, o.props[e] = i[e]);
			return o;
		}
		return Array.isArray(d) && d.length === 1 ? d[0] : d;
	}
	return o(l, Object.assign({}, u, f), { default: () => d });
}
function A(e) {
	return e.flatMap((e) => e.type === n ? A(e.children) : [e]);
}
function j(...e) {
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
function M(e, t = []) {
	let n = Object.assign({}, e);
	for (let e of t) e in n && delete n[e];
	return n;
}
function N(e) {
	return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
let P = Symbol("Context");
var F = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(F || {});
function ne() {
	return I() !== null;
}
function I() {
	return s(P, null);
}
function L(e) {
	d(P, e);
}
function R(e) {
	let t = { called: !1 };
	return (...n) => {
		if (!t.called) return t.called = !0, e(...n);
	};
}
function z(e, ...t) {
	e && t.length > 0 && e.classList.add(...t);
}
function B(e, ...t) {
	e && t.length > 0 && e.classList.remove(...t);
}
var V = ((e) => (e.Finished = "finished", e.Cancelled = "cancelled", e))(V || {});
function H(e, t) {
	let n = g();
	if (!e) return n.dispose;
	let { transitionDuration: r, transitionDelay: i } = getComputedStyle(e), [a, o] = [r, i].map((e) => {
		let [t = 0] = e.split(",").filter(Boolean).map((e) => e.includes("ms") ? parseFloat(e) : parseFloat(e) * 1e3).sort((e, t) => t - e);
		return t;
	});
	return a === 0 ? t("finished") : n.setTimeout(() => t("finished"), a + o), n.add(() => t("cancelled")), n.dispose;
}
function U(e, t, n, r, i, a) {
	let o = g(), s = a === void 0 ? () => {} : R(a);
	return B(e, ...i), z(e, ...t, ...n), o.nextFrame(() => {
		B(e, ...n), z(e, ...r), o.add(H(e, (n) => (B(e, ...r, ...t), z(e, ...i), s(n))));
	}), o.add(() => B(e, ...t, ...n, ...r, ...i)), o.add(() => s("cancelled")), o.dispose;
}
function W(e = "") {
	return e.split(/\s+/).filter((e) => e.length > 1);
}
let G = Symbol("TransitionContext");
var K = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(K || {});
function q() {
	return s(G, null) !== null;
}
function re() {
	let e = s(G, null);
	if (e === null) throw Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
	return e;
}
function ie() {
	let e = s(J, null);
	if (e === null) throw Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
	return e;
}
let J = Symbol("NestingContext");
function Y(e) {
	return "children" in e ? Y(e.children) : e.value.filter(({ state: e }) => e === "visible").length > 0;
}
function X(e) {
	let t = f([]), n = f(!1);
	l(() => n.value = !0), u(() => n.value = !1);
	function r(r, i = D.Hidden) {
		let a = t.value.findIndex(({ id: e }) => e === r);
		a !== -1 && (x(i, {
			[D.Unmount]() {
				t.value.splice(a, 1);
			},
			[D.Hidden]() {
				t.value[a].state = "hidden";
			}
		}), !Y(t) && n.value && e?.());
	}
	function i(e) {
		let n = t.value.find(({ id: t }) => t === e);
		return n ? n.state !== "visible" && (n.state = "visible") : t.value.push({
			id: e,
			state: "visible"
		}), () => r(e, D.Unmount);
	}
	return {
		children: t,
		register: i,
		unregister: r
	};
}
let Z = E.RenderStrategy, Q = a({
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		show: {
			type: [Boolean],
			default: null
		},
		unmount: {
			type: [Boolean],
			default: !0
		},
		appear: {
			type: [Boolean],
			default: !1
		},
		enter: {
			type: [String],
			default: ""
		},
		enterFrom: {
			type: [String],
			default: ""
		},
		enterTo: {
			type: [String],
			default: ""
		},
		entered: {
			type: [String],
			default: ""
		},
		leave: {
			type: [String],
			default: ""
		},
		leaveFrom: {
			type: [String],
			default: ""
		},
		leaveTo: {
			type: [String],
			default: ""
		}
	},
	emits: {
		beforeEnter: () => !0,
		afterEnter: () => !0,
		beforeLeave: () => !0,
		afterLeave: () => !0
	},
	setup(e, { emit: t, attrs: n, slots: r, expose: a }) {
		let s = f(0);
		function h() {
			s.value |= F.Opening, t("beforeEnter");
		}
		function g() {
			s.value &= ~F.Opening, t("afterEnter");
		}
		function _() {
			s.value |= F.Closing, t("beforeLeave");
		}
		function v() {
			s.value &= ~F.Closing, t("afterLeave");
		}
		if (!q() && ne()) return () => o($, {
			...e,
			onBeforeEnter: h,
			onAfterEnter: g,
			onBeforeLeave: _,
			onAfterLeave: v
		}, r);
		let y = f(null), S = i(() => e.unmount ? D.Unmount : D.Hidden);
		a({
			el: y,
			$el: y
		});
		let { show: C, appear: w } = re(), { register: T, unregister: E } = ie(), k = f(C.value ? "visible" : "hidden"), A = { value: !0 }, j = ee(), M = { value: !1 }, N = X(() => {
			!M.value && k.value !== "hidden" && (k.value = "hidden", E(j), v());
		});
		l(() => {
			let e = T(j);
			u(e);
		}), m(() => {
			if (S.value === D.Hidden && j) {
				if (C.value && k.value !== "visible") {
					k.value = "visible";
					return;
				}
				x(k.value, {
					hidden: () => E(j),
					visible: () => T(j)
				});
			}
		});
		let P = W(e.enter), I = W(e.enterFrom), R = W(e.enterTo), z = W(e.entered), B = W(e.leave), H = W(e.leaveFrom), G = W(e.leaveTo);
		l(() => {
			m(() => {
				if (k.value === "visible") {
					let e = b(y);
					if (e instanceof Comment && e.data === "") throw Error("Did you forget to passthrough the `ref` to the actual DOM node?");
				}
			});
		});
		function K(e) {
			let t = A.value && !w.value, n = b(y);
			!n || !(n instanceof HTMLElement) || t || (M.value = !0, C.value && h(), C.value || _(), e(C.value ? U(n, P, I, R, z, (e) => {
				M.value = !1, e === V.Finished && g();
			}) : U(n, B, H, G, z, (e) => {
				M.value = !1, e === V.Finished && (Y(N) || (k.value = "hidden", E(j), v()));
			})));
		}
		return l(() => {
			p([C], (e, t, n) => {
				K(n), A.value = !1;
			}, { immediate: !0 });
		}), d(J, N), L(i(() => x(k.value, {
			visible: F.Open,
			hidden: F.Closed
		}) | s.value)), () => {
			let { appear: t, show: i, enter: a, enterFrom: o, enterTo: s, entered: l, leave: u, leaveFrom: d, leaveTo: f,...p } = e, m = { ref: y }, h = {
				...p,
				...w.value && C.value && te.isServer ? { class: c([
					n.class,
					p.class,
					...P,
					...I
				]) } : {}
			};
			return O({
				theirProps: h,
				ourProps: m,
				slot: {},
				slots: r,
				attrs: n,
				features: Z,
				visible: k.value === "visible",
				name: "TransitionChild"
			});
		};
	}
}), ae = Q, $ = a({
	inheritAttrs: !1,
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		show: {
			type: [Boolean],
			default: null
		},
		unmount: {
			type: [Boolean],
			default: !0
		},
		appear: {
			type: [Boolean],
			default: !1
		},
		enter: {
			type: [String],
			default: ""
		},
		enterFrom: {
			type: [String],
			default: ""
		},
		enterTo: {
			type: [String],
			default: ""
		},
		entered: {
			type: [String],
			default: ""
		},
		leave: {
			type: [String],
			default: ""
		},
		leaveFrom: {
			type: [String],
			default: ""
		},
		leaveTo: {
			type: [String],
			default: ""
		}
	},
	emits: {
		beforeEnter: () => !0,
		afterEnter: () => !0,
		beforeLeave: () => !0,
		afterLeave: () => !0
	},
	setup(e, { emit: t, attrs: n, slots: r }) {
		let a = I(), s = i(() => e.show === null && a !== null ? (a.value & F.Open) === F.Open : e.show);
		m(() => {
			if (![!0, !1].includes(s.value)) throw Error("A <Transition /> is used but it is missing a `:show=\"true | false\"` prop.");
		});
		let c = f(s.value ? "visible" : "hidden"), u = X(() => {
			c.value = "hidden";
		}), p = f(!0), h = {
			show: s,
			appear: i(() => e.appear || !p.value)
		};
		return l(() => {
			m(() => {
				p.value = !1, s.value ? c.value = "visible" : Y(u) || (c.value = "hidden");
			});
		}), d(J, u), d(G, h), () => {
			let i = M(e, [
				"show",
				"appear",
				"unmount",
				"onBeforeEnter",
				"onBeforeLeave",
				"onAfterEnter",
				"onAfterLeave"
			]), a = { unmount: e.unmount };
			return O({
				ourProps: {
					...a,
					as: "template"
				},
				theirProps: {},
				slot: {},
				slots: {
					...r,
					default: () => [o(ae, {
						onBeforeEnter: () => t("beforeEnter"),
						onAfterEnter: () => t("afterEnter"),
						onBeforeLeave: () => t("beforeLeave"),
						onAfterLeave: () => t("afterLeave"),
						...n,
						...a,
						...i
					}, r.default)]
				},
				attrs: {},
				features: Z,
				visible: c.value === "visible",
				name: "Transition"
			});
		};
	}
});
const oe = { install(e) {
	Object.entries({
		TransitionRoot: $,
		TransitionChild: Q
	}).forEach(([t, n]) => {
		e.component(t, n);
	});
} };
var se = oe;
export { Q as TransitionChild, $ as TransitionRoot, se as default };

//# sourceMappingURL=index.js.map