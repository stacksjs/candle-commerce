function __insertCSSStacksCommandPalette(code) {
	if (!code || typeof document > "u") return;
	let head = document.head || document.getElementsByTagName("head")[0], style = document.createElement("style");
	style.type = "text/css", head.appendChild(style), style.styleSheet ? style.styleSheet.cssText = code : style.appendChild(document.createTextNode(code));
}
__insertCSSStacksCommandPalette("");
import { Teleport, Transition, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, getCurrentScope, h, nextTick, normalizeClass, onBeforeUnmount, onMounted, onScopeDispose, openBlock, provide, reactive, ref, renderSlot, shallowReadonly, shallowRef, toDisplayString, toRefs, toValue, unref, vShow, watch, watchEffect, withCtx, withDirectives } from "vue";
function tryOnScopeDispose(fn) {
	return getCurrentScope() ? (onScopeDispose(fn), !0) : !1;
}
const isClient = typeof window < "u" && typeof document < "u", isWorker = typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope, toString$1 = Object.prototype.toString, isObject = (val) => toString$1.call(val) === "[object Object]", noop = () => {};
function createFilterWrapper(filter, fn) {
	function wrapper(...args) {
		return new Promise((resolve, reject) => {
			Promise.resolve(filter(() => fn.apply(this, args), {
				fn,
				thisArg: this,
				args
			})).then(resolve).catch(reject);
		});
	}
	return wrapper;
}
function debounceFilter(ms, options = {}) {
	let timer, maxTimer, lastRejector = noop, _clearTimeout = (timer2) => {
		clearTimeout(timer2), lastRejector(), lastRejector = noop;
	}, lastInvoker, filter = (invoke) => {
		let duration = toValue(ms), maxDuration = toValue(options.maxWait);
		return timer && _clearTimeout(timer), duration <= 0 || maxDuration !== void 0 && maxDuration <= 0 ? (maxTimer && (_clearTimeout(maxTimer), maxTimer = void 0), Promise.resolve(invoke())) : new Promise((resolve, reject) => {
			lastRejector = options.rejectOnCancel ? reject : resolve, lastInvoker = invoke, maxDuration && !maxTimer && (maxTimer = setTimeout(() => {
				timer && _clearTimeout(timer), maxTimer = void 0, resolve(lastInvoker());
			}, maxDuration)), timer = setTimeout(() => {
				maxTimer && _clearTimeout(maxTimer), maxTimer = void 0, resolve(invoke());
			}, duration);
		});
	};
	return filter;
}
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
function cacheStringFunction(fn) {
	let cache = /* @__PURE__ */ Object.create(null);
	return (str$1) => {
		let hit = cache[str$1];
		return hit || (cache[str$1] = fn(str$1));
	};
}
const hyphenateRE = /\B([A-Z])/g, hyphenate = cacheStringFunction((str$1) => str$1.replace(hyphenateRE, "-$1").toLowerCase()), camelizeRE = /-(\w)/g, camelize = cacheStringFunction((str$1) => str$1.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : ""));
/* @__NO_SIDE_EFFECTS__ */
function useDebounceFn(fn, ms = 200, options = {}) {
	return createFilterWrapper(debounceFilter(ms, options), fn);
}
function refDebounced(value, ms = 200, options = {}) {
	let debounced = ref(toValue(value)), updater = /* @__PURE__ */ useDebounceFn(() => {
		debounced.value = value.value;
	}, ms, options);
	return watch(value, () => updater()), shallowReadonly(debounced);
}
function watchImmediate(source, cb, options) {
	return watch(source, cb, {
		...options,
		immediate: !0
	});
}
function whenever(source, cb, options) {
	let stop = watch(source, (v$1, ov, onInvalidate) => {
		v$1 && (options?.once && nextTick(() => stop()), cb(v$1, ov, onInvalidate));
	}, {
		...options,
		once: !1
	});
	return stop;
}
const defaultWindow = isClient ? window : void 0, defaultDocument = isClient ? window.document : void 0, defaultNavigator = isClient ? window.navigator : void 0, defaultLocation = isClient ? window.location : void 0;
function unrefElement(elRef) {
	var _a;
	let plain = toValue(elRef);
	return (_a = plain?.$el) ?? plain;
}
function useEventListener(...args) {
	let cleanups = [], cleanup = () => {
		cleanups.forEach((fn) => fn()), cleanups.length = 0;
	}, register = (el, event, listener, options) => (el.addEventListener(event, listener, options), () => el.removeEventListener(event, listener, options)), firstParamTargets = computed(() => {
		let test = toArray(toValue(args[0])).filter((e) => e != null);
		return test.every((e) => typeof e != "string") ? test : void 0;
	}), stopWatch = watchImmediate(() => {
		var _a, _b;
		return [
			(_b = (_a = firstParamTargets.value)?.map((e) => unrefElement(e))) ?? [defaultWindow].filter((e) => e != null),
			toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
			toArray(unref(firstParamTargets.value ? args[2] : args[1])),
			toValue(firstParamTargets.value ? args[3] : args[2])
		];
	}, ([raw_targets, raw_events, raw_listeners, raw_options]) => {
		if (cleanup(), !raw_targets?.length || !raw_events?.length || !raw_listeners?.length) return;
		let optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
		cleanups.push(...raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone)))));
	}, { flush: "post" }), stop = () => {
		stopWatch(), cleanup();
	};
	return tryOnScopeDispose(cleanup), stop;
}
const ssrWidthSymbol = Symbol("vueuse-ssr-width"), DefaultMagicKeysAliasMap = {
	ctrl: "control",
	command: "meta",
	cmd: "meta",
	option: "alt",
	up: "arrowup",
	down: "arrowdown",
	left: "arrowleft",
	right: "arrowright"
};
function useMagicKeys(options = {}) {
	let { reactive: useReactive = !1, target = defaultWindow, aliasMap = DefaultMagicKeysAliasMap, passive = !0, onEventFired = noop } = options, current = reactive(/* @__PURE__ */ new Set()), obj = {
		toJSON() {
			return {};
		},
		current
	}, refs = useReactive ? reactive(obj) : obj, metaDeps = /* @__PURE__ */ new Set(), shiftDeps = /* @__PURE__ */ new Set(), usedKeys = /* @__PURE__ */ new Set();
	function setRefs(key, value) {
		key in refs && (useReactive ? refs[key] = value : refs[key].value = value);
	}
	function reset() {
		current.clear();
		for (let key of usedKeys) setRefs(key, !1);
	}
	function updateRefs(e, value) {
		var _a, _b;
		let key = (_a = e.key)?.toLowerCase(), code = (_b = e.code)?.toLowerCase(), values = [code, key].filter(Boolean);
		key && (value ? current.add(key) : current.delete(key));
		for (let key2 of values) usedKeys.add(key2), setRefs(key2, value);
		if (key === "shift" && !value) {
			let shiftDepsArray = Array.from(shiftDeps), shiftIndex = shiftDepsArray.indexOf("shift");
			shiftDepsArray.forEach((key2, index) => {
				index >= shiftIndex && (current.delete(key2), setRefs(key2, !1));
			}), shiftDeps.clear();
		} else typeof e.getModifierState == "function" && e.getModifierState("Shift") && value && [...current, ...values].forEach((key2) => shiftDeps.add(key2));
		key === "meta" && !value ? (metaDeps.forEach((key2) => {
			current.delete(key2), setRefs(key2, !1);
		}), metaDeps.clear()) : typeof e.getModifierState == "function" && e.getModifierState("Meta") && value && [...current, ...values].forEach((key2) => metaDeps.add(key2));
	}
	useEventListener(target, "keydown", (e) => (updateRefs(e, !0), onEventFired(e)), { passive }), useEventListener(target, "keyup", (e) => (updateRefs(e, !1), onEventFired(e)), { passive }), useEventListener("blur", reset, { passive }), useEventListener("focus", reset, { passive });
	let proxy = new Proxy(refs, { get(target2, prop, rec) {
		if (typeof prop != "string") return Reflect.get(target2, prop, rec);
		if (prop = prop.toLowerCase(), prop in aliasMap && (prop = aliasMap[prop]), !(prop in refs)) if (/[+_-]/.test(prop)) {
			let keys = prop.split(/[+_-]/g).map((i) => i.trim());
			refs[prop] = computed(() => keys.map((key) => toValue(proxy[key])).every(Boolean));
		} else refs[prop] = shallowRef(!1);
		let r$1 = Reflect.get(target2, prop, rec);
		return useReactive ? toValue(r$1) : r$1;
	} });
	return proxy;
}
const DEFAULT_UNITS = [
	{
		max: 6e4,
		value: 1e3,
		name: "second"
	},
	{
		max: 276e4,
		value: 6e4,
		name: "minute"
	},
	{
		max: 72e6,
		value: 36e5,
		name: "hour"
	},
	{
		max: 5184e5,
		value: 864e5,
		name: "day"
	},
	{
		max: 24192e5,
		value: 6048e5,
		name: "week"
	},
	{
		max: 28512e6,
		value: 2592e6,
		name: "month"
	},
	{
		max: Infinity,
		value: 31536e6,
		name: "year"
	}
];
var { create: y, defineProperty: V, getOwnPropertyDescriptor: d, getOwnPropertyNames: k, getPrototypeOf: n } = Object, u = Object.prototype.hasOwnProperty, m = (T, A) => () => (A || T((A = { exports: {} }).exports, A), A.exports), o = (T, A) => {
	for (var _ in A) V(T, _, {
		get: A[_],
		enumerable: !0
	});
}, q = (T, A, _, B) => {
	if (A && typeof A == "object" || typeof A == "function") for (let $ of k(A)) !u.call(T, $) && $ !== _ && V(T, $, {
		get: () => A[$],
		enumerable: !(B = d(A, $)) || B.enumerable
	});
	return T;
}, r = (T, A, _) => (q(T, A, "default"), _ && q(_, A, "default")), w = (T, A, _) => (_ = T == null ? {} : y(n(T)), q(A || !T || !T.__esModule ? V(_, "default", {
	value: T,
	enumerable: !0
}) : _, T)), g = m((T, A) => {
	var _ = A.exports = {}, B, $;
	function Z() {
		throw Error("setTimeout has not been defined");
	}
	function J() {
		throw Error("clearTimeout has not been defined");
	}
	(function() {
		try {
			B = typeof setTimeout == "function" ? setTimeout : Z;
		} catch {
			B = Z;
		}
		try {
			$ = typeof clearTimeout == "function" ? clearTimeout : J;
		} catch {
			$ = J;
		}
	})();
	function Q(G) {
		if (B === setTimeout) return setTimeout(G, 0);
		if ((B === Z || !B) && setTimeout) return B = setTimeout, setTimeout(G, 0);
		try {
			return B(G, 0);
		} catch {
			try {
				return B.call(null, G, 0);
			} catch {
				return B.call(this, G, 0);
			}
		}
	}
	function H(G) {
		if ($ === clearTimeout) return clearTimeout(G);
		if (($ === J || !$) && clearTimeout) return $ = clearTimeout, clearTimeout(G);
		try {
			return $(G);
		} catch {
			try {
				return $.call(null, G);
			} catch {
				return $.call(this, G);
			}
		}
	}
	var E = [], W = !1, Y, L = -1;
	function N() {
		!W || !Y || (W = !1, Y.length ? E = Y.concat(E) : L = -1, E.length && K());
	}
	function K() {
		if (!W) {
			var G = Q(N);
			W = !0;
			for (var S = E.length; S;) {
				for (Y = E, E = []; ++L < S;) Y && Y[L].run();
				L = -1, S = E.length;
			}
			Y = null, W = !1, H(G);
		}
	}
	_.nextTick = function(G) {
		var S = Array(arguments.length - 1);
		if (arguments.length > 1) for (var M = 1; M < arguments.length; M++) S[M - 1] = arguments[M];
		E.push(new X(G, S)), E.length === 1 && !W && Q(K);
	};
	function X(G, S) {
		this.fun = G, this.array = S;
	}
	X.prototype.run = function() {
		this.fun.apply(null, this.array);
	}, _.title = "browser", _.browser = !0, _.env = {}, _.argv = [], _.version = "", _.versions = {};
	function F() {}
	_.on = F, _.addListener = F, _.once = F, _.off = F, _.removeListener = F, _.removeAllListeners = F, _.emit = F, _.prependListener = F, _.prependOnceListener = F, _.listeners = function(G) {
		return [];
	}, _.binding = function(G) {
		throw Error("process.binding is not supported");
	}, _.cwd = function() {
		return "/";
	}, _.chdir = function(G) {
		throw Error("process.chdir is not supported");
	}, _.umask = function() {
		return 0;
	};
}), f = {};
o(f, { default: () => D }), r(f, w(g()));
var D = w(g());
function P(T) {
	let A = [], _ = null, B = null;
	async function* $() {
		if (_) {
			for (let J of _) yield J;
			return;
		}
		let Z = [];
		for await (let J of T) {
			for (let Q of A) if (J = Q(J), J === void 0) break;
			if (J !== void 0) if (B) {
				if (Z.push(J), Z.length >= B) {
					for (let Q of Z) yield Q;
					Z = [];
				}
			} else yield J;
		}
		if (Z.length > 0) for (let J of Z) yield J;
	}
	return {
		map(Z) {
			let J = 0;
			return A.push((Q) => Z(Q, J++)), P($());
		},
		filter(Z) {
			let J = 0;
			return A.push((Q) => Z(Q, J++) ? Q : void 0), P($());
		},
		flatMap(Z) {
			let J = 0;
			return A.push((Q) => Z(Q, J++)), P($());
		},
		take(Z) {
			let J = 0;
			return A.push((Q) => J++ < Z ? Q : void 0), P($());
		},
		skip(Z) {
			let J = 0;
			return A.push((Q) => J++ < Z ? void 0 : Q), P($());
		},
		chunk(Z) {
			let J = [];
			return A.push((Q) => {
				if (J.push(Q), J.length === Z) {
					let H = J;
					return J = [], H;
				}
			}), P($());
		},
		async toArray() {
			if (_) return _;
			let Z = [];
			for await (let J of $()) Z.push(J);
			return Z;
		},
		async toCollection() {
			let Z = await this.toArray();
			return U(Z);
		},
		async forEach(Z) {
			for await (let J of $()) Z(J);
		},
		async reduce(Z, J) {
			let Q = J;
			for await (let H of $()) Q = Z(Q, H);
			return Q;
		},
		async count() {
			let Z = 0;
			for await (let J of $()) Z++;
			return Z;
		},
		async first() {
			let J = await $().next();
			return J.done ? void 0 : J.value;
		},
		async last() {
			let Z;
			for await (let J of $()) Z = J;
			return Z;
		},
		async nth(Z) {
			let J = 0;
			for await (let Q of $()) {
				if (J === Z) return Q;
				J++;
			}
		},
		cache() {
			return this.toArray().then((Z) => {
				_ = Z;
			}), this;
		},
		batch(Z) {
			return B = Z, this;
		},
		pipe(Z) {
			return Z(this);
		}
	};
}
function h$1(T, A) {
	return T.getFullYear() === A.getFullYear() && T.getMonth() === A.getMonth() && T.getDate() === A.getDate();
}
function x(T, A) {
	let _ = new Date(T);
	switch (A) {
		case "day":
			_.setDate(T.getDate() + 1);
			break;
		case "week":
			_.setDate(T.getDate() + 7);
			break;
		case "month":
			_.setMonth(T.getMonth() + 1);
			break;
		case "year":
			_.setFullYear(T.getFullYear() + 1);
			break;
	}
	return _.getTime();
}
function I(T, A) {
	return T >= -90 && T <= 90 && A >= -180 && A <= 180;
}
function U(T) {
	if (Array.isArray(T) && T.length === 0) return b({
		items: [],
		length: 0
	});
	let A = Array.isArray(T) ? T : Array.from(T);
	return b({
		items: A,
		length: A.length
	});
}
function b(collection) {
	function calculateFuzzyScore(T, A) {
		let _ = 0, B = -1;
		for (let $ of T) {
			let Z = A.indexOf($, B + 1);
			if (Z === -1) return 0;
			_ += 1 / (Z - B), B = Z;
		}
		return _;
	}
	return {
		...collection,
		all() {
			return [...collection.items];
		},
		average(T) {
			return this.avg(T);
		},
		collapse() {
			return U(collection.items.flat());
		},
		combine(T) {
			let A = {};
			return collection.items.forEach((_, B) => {
				A[String(_)] = T[B];
			}), U([A]);
		},
		contains(T, A) {
			return arguments.length === 1 ? T === void 0 ? !1 : collection.items.includes(T) : collection.items.some((_) => _[T] === A);
		},
		containsOneItem() {
			return collection.length === 1;
		},
		containsAll(T, A) {
			if (arguments.length === 1) return T.every(($) => $ === void 0 ? collection.items.includes(void 0) : collection.items.includes($));
			let _ = T;
			return (A || []).every((B) => collection.items.some(($) => $[_] === B));
		},
		countBy(T) {
			let A = /* @__PURE__ */ new Map();
			for (let _ of collection.items) {
				let B = typeof T == "function" ? T(_) : _[T];
				A.set(B, (A.get(B) || 0) + 1);
			}
			return A;
		},
		diffAssoc(T) {
			let A = Array.isArray(T) ? T : T.items;
			return U(collection.items.filter((_, B) => A[B] === void 0 || JSON.stringify(_) !== JSON.stringify(A[B])));
		},
		diffKeys(T) {
			return U(collection.items.filter((A) => !T.some((_) => Object.keys(A).every((B) => B in _))));
		},
		diffUsing(T, A) {
			return U(collection.items.filter((_) => !T.some((B) => A(_, B) === 0)));
		},
		doesntContain(T, A) {
			return arguments.length === 1 ? !collection.items.includes(T) : !collection.items.some((_) => _[T] === A);
		},
		duplicates(T) {
			let A = /* @__PURE__ */ new Map(), _ = collection.items;
			return _.forEach((B) => {
				let $ = T ? B[T] : B;
				A.set($, (A.get($) || 0) + 1);
			}), U(_.filter((B) => {
				let $ = T ? B[T] : B;
				return A.get($) > 1;
			}));
		},
		each(T) {
			return collection.items.forEach(T), this;
		},
		eachSpread(T) {
			return collection.items.forEach((A) => {
				T(...Array.isArray(A) ? A : [A]);
			}), this;
		},
		except(...T) {
			return U(collection.items.map((A) => {
				let _ = { ...A };
				return T.forEach((B) => delete _[B]), _;
			}));
		},
		firstOrFail() {
			let T = this.first();
			if (!T) throw Error("Item not found.");
			return T;
		},
		firstWhere(T, A) {
			return collection.items.find((_) => _[T] === A);
		},
		flatten(T = Infinity) {
			let A = (_, B) => B > 0 ? _.reduce(($, Z) => $.concat(Array.isArray(Z) ? A(Z, B - 1) : Z), []) : _.slice();
			return U(A(collection.items, T));
		},
		flip() {
			if (this.items.length === 0) return U([]);
			let T = {};
			function A(_) {
				return typeof _ != "object" || !_ ? !1 : Object.values(_).every((B) => typeof B == "string" || typeof B == "number");
			}
			return this.items.forEach((_) => {
				A(_) && Object.entries(_).forEach(([B, $]) => {
					T[$] = B;
				});
			}), U([T]);
		},
		forget(T) {
			return U(collection.items.map((A) => {
				let _ = { ...A };
				return delete _[T], _;
			}));
		},
		get(T, A) {
			let _ = collection.items[0];
			return _ ? _[T] === void 0 ? A : _[T] : A;
		},
		has(T) {
			return collection.items.some((A) => T in A);
		},
		keyBy(T) {
			return new Map(collection.items.map((A) => [A[T], A]));
		},
		macro(T, A) {
			Object.defineProperty(this, T, {
				value(..._) {
					return A.apply(this, _);
				},
				enumerable: !1,
				configurable: !0,
				writable: !0
			});
		},
		make(T) {
			return U(T);
		},
		mapInto(T) {
			return U(collection.items.map((A) => Object.assign(new T(), A)));
		},
		mapToDictionary(T) {
			let A = /* @__PURE__ */ new Map();
			return collection.items.forEach((_) => {
				let [B, $] = T(_);
				A.set(B, $);
			}), A;
		},
		mapWithKeys(T) {
			let A = /* @__PURE__ */ new Map();
			return collection.items.forEach((_) => {
				let [B, $] = T(_);
				A.set(B, $);
			}), A;
		},
		merge(T) {
			let A = Array.isArray(T) ? T : T.items;
			return U([...collection.items, ...A]);
		},
		mergeRecursive(T) {
			function A($, Z) {
				if (Z == null) return $;
				if (Array.isArray(Z)) return [...Z];
				if (typeof Z != "object") return Z;
				let J = Array.isArray($) ? [...$] : { ...$ };
				for (let Q of Object.keys(Z)) {
					let H = Z[Q];
					Array.isArray(H) ? J[Q] = [...H] : H && typeof H == "object" ? J[Q] = Q in J ? A(J[Q], H) : { ...H } : J[Q] = H;
				}
				return J;
			}
			let _ = Array.isArray(T) ? T : T.items, B = collection.items.map(($, Z) => Z < _.length ? A($, _[Z]) : { ...$ });
			return U(B);
		},
		only(...T) {
			return this.map((A) => {
				let _ = {};
				return T.forEach((B) => {
					if (A && typeof A == "object" && B in A) {
						let $ = B;
						_[$] = A[$];
					}
				}), _;
			});
		},
		pad(T, A) {
			let _ = collection.items.map(($) => $), B = Math.abs(T);
			for (; _.length < B;) T > 0 ? _.push(A) : _.unshift(A);
			return U(_);
		},
		pop() {
			return collection.items.pop();
		},
		prepend(T) {
			let A = [T, ...collection.items.map((_) => _)];
			return U(A);
		},
		pull(T) {
			let A = collection.items[0];
			return A ? A[T] : void 0;
		},
		push(T) {
			let A = [...collection.items.map((_) => _), T];
			return U(A);
		},
		put(T, A) {
			return U(collection.items.map((_) => ({
				..._,
				[T]: A
			})));
		},
		random(T) {
			let A = [...collection.items];
			if (T === void 0) {
				let B = Math.floor(Math.random() * A.length);
				return U([A[B]]);
			}
			let _ = A.sort(() => Math.random() - .5);
			return U(_.slice(0, T));
		},
		reject(T) {
			return this.filter((A) => !T(A));
		},
		replace(T) {
			return U(T);
		},
		replaceRecursive(T) {
			function A(_, B) {
				if (!B || typeof B != "object") return B;
				if (Array.isArray(B)) return B.map((Z, J) => A(Array.isArray(_) ? _[J] : {}, Z));
				let $ = {};
				for (let Z in B) $[Z] = A(_?.[Z], B[Z]);
				return $;
			}
			return U(A(collection.items, T));
		},
		reverse() {
			return U([...collection.items].reverse());
		},
		shift() {
			if (collection.length === 0) return;
			let T = collection.items[0];
			return collection.items.splice(0, 1), T;
		},
		shuffle() {
			return U([...collection.items].sort(() => Math.random() - .5));
		},
		skipUntil(T) {
			let A = typeof T == "function" ? T : (B) => B === T, _ = collection.items.findIndex(A);
			return U(_ === -1 ? [] : collection.items.slice(_));
		},
		skipWhile(T) {
			let A = typeof T == "function" ? T : (B) => B === T, _ = 0;
			for (; _ < collection.items.length && A(collection.items[_]);) _++;
			return U(collection.items.slice(_));
		},
		slice(T, A) {
			return U(A === void 0 ? collection.items.slice(T) : collection.items.slice(T, T + A));
		},
		sole() {
			if (collection.length !== 1) throw Error("Collection does not contain exactly one item.");
			return collection.items[0];
		},
		sortDesc() {
			return this.sort((T, A) => T < A ? 1 : T > A ? -1 : 0);
		},
		sortKeys() {
			return U(collection.items.map((T) => {
				let A = {};
				return Object.keys(T).sort().forEach((_) => {
					A[_] = T[_];
				}), A;
			}));
		},
		sortKeysDesc() {
			return U(collection.items.map((T) => {
				let A = {};
				return Object.keys(T).sort((_, B) => B.localeCompare(_)).forEach((_) => {
					A[_] = T[_];
				}), A;
			}));
		},
		splice(T, A, ..._) {
			let B = [...collection.items];
			return T > B.length || (A === void 0 ? B.splice(T) : B.splice(T, A, ..._)), U(B);
		},
		split(T) {
			let A = [], _ = Math.ceil(collection.length / T);
			for (let B = 0; B < collection.length; B += _) A.push(collection.items.slice(B, B + _));
			return U(A);
		},
		takeUntil(T) {
			let A = typeof T == "function" ? T : (B) => B === T, _ = collection.items.findIndex(A);
			return U(_ === -1 ? collection.items : collection.items.slice(0, _));
		},
		takeWhile(T) {
			let A = typeof T == "function" ? T : (B) => B === T, _ = 0;
			for (; _ < collection.items.length && A(collection.items[_]);) _++;
			return U(collection.items.slice(0, _));
		},
		times(T, A) {
			let _ = [];
			for (let B = 0; B < T; B++) _.push(A(B));
			return U(_);
		},
		undot() {
			let T = {};
			return collection.items.forEach((A) => {
				Object.entries(A).forEach(([_, B]) => {
					_.split(".").reduce(($, Z, J, Q) => (J === Q.length - 1 ? $[Z] = B : $[Z] = $[Z] || {}, $[Z]), T);
				});
			}), U([T]);
		},
		unlessEmpty(T) {
			return this.isNotEmpty() ? T(this) : this;
		},
		unlessNotEmpty(T) {
			return this.isEmpty() ? T(this) : this;
		},
		unwrap(T) {
			return T instanceof Object && "items" in T ? T.toArray() : Array.isArray(T) ? T : [T];
		},
		whenEmpty(T) {
			return this.isEmpty() ? T(this) : this;
		},
		whenNotEmpty(T) {
			return this.isNotEmpty() ? T(this) : this;
		},
		wrap(T) {
			return Array.isArray(T) ? U(T) : U([T]);
		},
		zip(T) {
			return U(collection.items.map((A, _) => [A, T[_]]));
		},
		map(T) {
			return U(collection.items.map(T));
		},
		filter(T) {
			return U(collection.items.filter(T));
		},
		reduce(T, A) {
			return collection.items.reduce(T, A);
		},
		flatMap(T) {
			return U(collection.items.flatMap(T));
		},
		first: function(T) {
			let A = collection.items[0];
			return arguments.length === 0 ? A : A ? A[T] : void 0;
		},
		last: function(T) {
			let A = collection.items[collection.length - 1];
			return arguments.length === 0 ? A : A ? A[T] : void 0;
		},
		nth(T) {
			return collection.items[T];
		},
		take(T) {
			return U(collection.items.slice(0, T));
		},
		skip(T) {
			return U(collection.items.slice(T));
		},
		sum(T) {
			return collection.length === 0 ? 0 : collection.items.reduce((A, _) => {
				let B = T ? Number(_[T]) : Number(_);
				return A + (Number.isNaN(B) ? 0 : B);
			}, 0);
		},
		avg(T) {
			return collection.length ? this.sum(T) / collection.length : 0;
		},
		median(T) {
			if (collection.length === 0) return;
			let A = T ? collection.items.map((B) => Number(B[T])).sort((B, $) => B - $) : collection.items.map((B) => Number(B)).sort((B, $) => B - $), _ = Math.floor(A.length / 2);
			return A.length % 2 == 0 ? (A[_ - 1] + A[_]) / 2 : A[_];
		},
		mode(T) {
			if (collection.length === 0) return;
			let A = /* @__PURE__ */ new Map(), _ = 0, B;
			for (let $ of collection.items) {
				let Z = T ? $[T] : $, J = (A.get(Z) || 0) + 1;
				A.set(Z, J), J > _ && (_ = J, B = $);
			}
			return B;
		},
		min(T) {
			if (collection.length !== 0) return collection.items.reduce((A, _) => (T ? _[T] : _) < (T ? A[T] : A) ? _ : A);
		},
		max(T) {
			if (collection.length !== 0) return collection.items.reduce((A, _) => (T ? _[T] : _) > (T ? A[T] : A) ? _ : A);
		},
		chunk(T) {
			if (T < 1) throw Error("Chunk size must be greater than 0");
			let A = [];
			for (let _ = 0; _ < collection.length; _ += T) A.push(collection.items.slice(_, _ + T));
			return U(A);
		},
		groupBy(T) {
			let A = /* @__PURE__ */ new Map();
			for (let _ of collection.items) {
				let B = typeof T == "function" ? T(_) : _[T];
				A.has(B) || A.set(B, []), A.get(B).push(_);
			}
			return new Map(Array.from(A.entries()).map(([_, B]) => [_, U(B)]));
		},
		partition(T) {
			let A = [], _ = [];
			for (let B of collection.items) T(B) ? A.push(B) : _.push(B);
			return [U(A), U(_)];
		},
		where(T, A) {
			return U(collection.items.filter((_) => _[T] === A));
		},
		whereIn(T, A) {
			let _ = new Set(A);
			return U(collection.items.filter((B) => _.has(B[T])));
		},
		whereNotIn(T, A) {
			let _ = new Set(A);
			return U(collection.items.filter((B) => !_.has(B[T])));
		},
		whereBetween(T, A, _) {
			return U(collection.items.filter((B) => {
				let $ = B[T];
				return $ >= A && $ <= _;
			}));
		},
		whereNotBetween(T, A, _) {
			return U(collection.items.filter((B) => {
				let $ = B[T];
				return $ < A || $ > _;
			}));
		},
		unique(T) {
			if (!T) return U([...new Set(collection.items)]);
			let A = /* @__PURE__ */ new Set();
			return U(collection.items.filter((_) => {
				let B = _[T];
				return A.has(B) ? !1 : (A.add(B), !0);
			}));
		},
		when(T, A) {
			return (typeof T == "function" ? T(this) : T) ? A(this) : this;
		},
		unless(T, A) {
			return (typeof T == "function" ? T(this) : T) ? this : A(this);
		},
		sort(T) {
			if (!T) {
				let A = [...collection.items], _ = [], B = [], $ = [];
				for (let Z of A) Z === null ? _.push(Z) : Z === void 0 ? B.push(Z) : $.push(Z);
				return $.sort((Z, J) => typeof Z == "number" && typeof J == "number" ? Z - J : String(Z).localeCompare(String(J))), U([
					..._,
					...B,
					...$
				]);
			}
			return U([...collection.items].sort(T));
		},
		sortBy(T, A = "asc") {
			let _ = [...collection.items];
			return _.length === 0 || !_.some(($) => $?.[T] !== void 0 && $[T] !== null) ? U(_) : U(_.sort(($, Z) => {
				let J = $?.[T], Q = Z?.[T];
				if (J == null) return A === "asc" ? -1 : 1;
				if (Q == null) return A === "asc" ? 1 : -1;
				if (typeof J == "number" && typeof Q == "number") return A === "asc" ? J - Q : Q - J;
				let H = String(J).localeCompare(String(Q));
				return A === "asc" ? H : -H;
			}));
		},
		sortByDesc(T) {
			return this.sortBy(T, "desc");
		},
		pluck(T) {
			return U(collection.items.map((A) => A[T]));
		},
		values() {
			return U([...collection.items]);
		},
		keys(T) {
			return U(Array.from(new Set(collection.items.map((A) => A[T]))));
		},
		intersect(T) {
			let A = new Set(Array.isArray(T) ? T : T.items);
			return U(collection.items.filter((_) => A.has(_)));
		},
		union(T) {
			let A = Array.isArray(T) ? T : T.items;
			return U([...new Set([...collection.items, ...A])]);
		},
		tap(T) {
			return T(this), this;
		},
		pipe(T) {
			return T(this);
		},
		isEmpty() {
			return collection.length === 0;
		},
		isNotEmpty() {
			return collection.length > 0;
		},
		count() {
			return collection.length;
		},
		toArray() {
			return [...collection.items];
		},
		toMap(T) {
			return new Map(collection.items.map((A) => [A[T], A]));
		},
		toSet() {
			return new Set(collection.items);
		},
		product(T) {
			return collection.length === 0 ? 0 : collection.items.reduce((A, _) => {
				let B = T ? Number(_[T]) : Number(_);
				return A * (Number.isNaN(B) ? 1 : B);
			}, 1);
		},
		standardDeviation(T) {
			if (collection.length <= 1) return {
				population: 0,
				sample: 0
			};
			let A = this.avg(T), _ = collection.items.map((Z) => {
				let Q = (T ? Number(Z[T]) : Number(Z)) - A;
				return Q * Q;
			}), B = _.reduce((Z, J) => Z + J, 0) / collection.length, $ = _.reduce((Z, J) => Z + J, 0) / (collection.length - 1);
			return {
				population: Math.sqrt(B),
				sample: Math.sqrt($)
			};
		},
		percentile(T, A) {
			if (T < 0 || T > 100 || collection.length === 0) return;
			let _ = A ? collection.items.map(($) => Number($[A])).sort(($, Z) => $ - Z) : collection.items.map(($) => Number($)).sort(($, Z) => $ - Z), B = Math.ceil(T / 100 * _.length) - 1;
			return _[B];
		},
		variance(T) {
			return this.standardDeviation(T).population ** 2;
		},
		frequency(T) {
			let A = /* @__PURE__ */ new Map();
			for (let _ of collection.items) {
				let B = T ? _[T] : _;
				A.set(B, (A.get(B) || 0) + 1);
			}
			return A;
		},
		whereNull(T) {
			return U(collection.items.filter((A) => A[T] == null));
		},
		whereNotNull(T) {
			return U(collection.items.filter((A) => A[T] != null));
		},
		whereLike(T, A) {
			let _ = new RegExp(A.replace(/%/g, ".*"), "i");
			return U(collection.items.filter((B) => _.test(String(B[T]))));
		},
		whereRegex(T, A) {
			return U(collection.items.filter((_) => A.test(String(_[T]))));
		},
		whereInstanceOf(T) {
			return U(collection.items.filter((A) => A instanceof T));
		},
		async mapAsync(T) {
			let A = await Promise.all(collection.items.map((_, B) => T(_, B)));
			return U(A);
		},
		async filterAsync(T) {
			let A = await Promise.all(collection.items.map(async (_, B) => ({
				item: _,
				keep: await T(_, B)
			})));
			return U(A.filter(({ keep: _ }) => _).map(({ item: _ }) => _));
		},
		async reduceAsync(T, A) {
			let _ = A;
			for (let B of collection.items) _ = await T(_, B);
			return _;
		},
		async everyAsync(T) {
			return (await Promise.all(collection.items.map((_, B) => T(_, B)))).every((_) => _);
		},
		async someAsync(T) {
			return (await Promise.all(collection.items.map((_, B) => T(_, B)))).some((_) => _);
		},
		paginate(T, A = 1) {
			let _ = collection.length, B = Math.ceil(_ / T), $ = Math.min(Math.max(A, 1), B);
			return {
				data: this.forPage($, T),
				total: _,
				perPage: T,
				currentPage: $,
				lastPage: B,
				hasMorePages: $ < B
			};
		},
		forPage(T, A) {
			if (T < 1 || A <= 0) return U([]);
			let _ = (T - 1) * A;
			return _ >= collection.items.length ? U([]) : U(collection.items.slice(_, _ + A));
		},
		async *cursor(T) {
			let A = 0;
			for (; A < collection.length;) yield U(collection.items.slice(A, A + T)), A += T;
		},
		symmetricDiff(T) {
			let A = Array.isArray(T) ? T : T.items, _ = new Set(A), B = new Set(collection.items), $ = /* @__PURE__ */ new Set();
			return collection.items.forEach((Z) => {
				_.has(Z) || $.add(Z);
			}), A.forEach((Z) => {
				B.has(Z) || $.add(Z);
			}), U([...$]);
		},
		cartesianProduct(T) {
			let A = Array.isArray(T) ? T : T.items, _ = [];
			for (let B of collection.items) for (let $ of A) _.push([B, $]);
			return U(_);
		},
		groupByMultiple(...T) {
			let A = /* @__PURE__ */ new Map();
			for (let _ of collection.items) {
				let B = T.map(($) => String(_[$])).join("::");
				A.has(B) || A.set(B, []), A.get(B).push(_);
			}
			return new Map(Array.from(A.entries()).map(([_, B]) => [_, U(B)]));
		},
		describe(T) {
			let A = /* @__PURE__ */ new Map();
			A.set("count", this.count()), A.set("mean", this.avg(T)), A.set("min", Number(this.min(T))), A.set("max", Number(this.max(T))), A.set("sum", this.sum(T));
			let _ = this.standardDeviation(T);
			A.set("stdDev", _.population), A.set("variance", this.variance(T));
			let B = this.percentile(25, T), $ = this.percentile(75, T);
			return B !== void 0 && $ !== void 0 && (A.set("q1", B), A.set("q3", $), A.set("iqr", $ - B)), A;
		},
		debug() {
			return console.log({
				items: collection.items,
				length: collection.length,
				memory: D.memoryUsage()
			}), this;
		},
		dump() {
			console.log(collection.items);
		},
		dd() {
			this.dump(), D.exit(1);
		},
		timeSeries({ dateField: T, valueField: A, interval: _ = "day", fillGaps: B = !0 }) {
			let Z = collection.items.map((Y) => {
				let L = Y[T], N = Y[A], K = L instanceof Date ? L : new Date(String(L)), X = typeof N == "number" ? N : Number(N);
				return {
					date: K,
					value: X
				};
			}).filter((Y) => !Number.isNaN(Y.date.getTime())).sort((Y, L) => Y.date.getTime() - L.date.getTime());
			if (!B || Z.length === 0) return U(Z);
			let J = Math.min(...Z.map((Y) => Y.date.getTime())), Q = Math.max(...Z.map((Y) => Y.date.getTime())), H = J, E = [], W = Q + 1;
			for (; H < W;) {
				let Y = new Date(H), L = Z.find((N) => h$1(N.date, Y));
				E.push({
					date: new Date(Y),
					value: L ? L.value : 0
				}), H = x(Y, _);
			}
			return U(E);
		},
		movingAverage({ window: T, centered: A = !1 }) {
			if (collection.length === 0) return U([]);
			if (T < 1 || T > collection.length) throw Error("Invalid window size");
			if (T === collection.length) {
				let Z = collection.items.reduce((J, Q) => Number(J) + Number(Q), 0) / T;
				return U([Z]);
			}
			let _ = collection.items.map((Z) => Number(Z)), B = [], $ = A ? Math.floor(T / 2) : 0;
			for (let Z = 0; Z <= _.length - T; Z++) {
				let J = _.slice(Z, Z + T).reduce((Q, H) => Q + H, 0);
				B[Z + $] = J / T;
			}
			if (A) {
				let Z = Math.floor(T / 2);
				for (let Q = 0; Q < Z; Q++) {
					let H = _.slice(0, T);
					B[Q] = H.reduce((E, W) => E + W, 0) / H.length;
				}
				let J = Math.ceil(T / 2) - 1;
				for (let Q = 0; Q < J; Q++) {
					let H = _.length - J + Q, E = _.slice(-T);
					B[H] = E.reduce((W, Y) => W + Y, 0) / E.length;
				}
			}
			return U(B);
		},
		async validate(T) {
			let A = /* @__PURE__ */ new Map(), _ = Object.entries(T);
			for (let [B, $] of _) {
				if (!$ || !Array.isArray($)) continue;
				for (let Z of collection.items) {
					let J = Z[B], Q = [];
					for (let H of $) try {
						await H(J) || Q.push(`Validation failed for ${String(B)}`);
					} catch (E) {
						Q.push(`Validation error for ${String(B)}: ${E instanceof Error ? E.message : "Unknown error"}`);
					}
					Q.length > 0 && A.set(String(B), Q);
				}
			}
			return {
				isValid: A.size === 0,
				errors: A
			};
		},
		validateSync(T) {
			let A = /* @__PURE__ */ new Map(), _ = Object.entries(T);
			for (let [B, $] of _) {
				if (!$ || !Array.isArray($)) continue;
				for (let Z of collection.items) {
					let J = Z[B], Q = [];
					for (let H of $) try {
						let E = H(J);
						if (E instanceof Promise) throw TypeError("Async validation rules are not supported in validateSync");
						E || Q.push(`Validation failed for ${String(B)}`);
					} catch (E) {
						Q.push(`Validation error for ${String(B)}: ${E instanceof Error ? E.message : "Unknown error"}`);
					}
					Q.length > 0 && A.set(String(B), Q);
				}
			}
			return {
				isValid: A.size === 0,
				errors: A
			};
		},
		stream() {
			let T = 0;
			return new ReadableStream({ pull: (A) => {
				T < collection.length ? A.enqueue(collection.items[T++]) : A.close();
			} });
		},
		async fromStream(T) {
			let A = [], _ = T.getReader();
			try {
				for (;;) {
					let { done: B, value: $ } = await _.read();
					if (B) break;
					A.push($);
				}
			} finally {
				_.releaseLock();
			}
			return U(A);
		},
		fuzzyMatch(T, A, _ = .7) {
			function B(Z, J) {
				let Q = [];
				for (let H = 0; H <= Z.length; H++) Q[H] = [H];
				for (let H = 0; H <= J.length; H++) Q[0][H] = H;
				for (let H = 1; H <= Z.length; H++) for (let E = 1; E <= J.length; E++) {
					let W = Z[H - 1] === J[E - 1] ? 0 : 1;
					Q[H][E] = Math.min(Q[H - 1][E] + 1, Q[H][E - 1] + 1, Q[H - 1][E - 1] + W);
				}
				return Q[Z.length][J.length];
			}
			function $(Z, J) {
				let Q = Math.max(Z.length, J.length);
				return Q === 0 ? 1 : 1 - B(Z, J) / Q;
			}
			return U(collection.items.filter((Z) => $(String(Z[T]), A) >= _));
		},
		metrics() {
			let T = {
				count: this.count(),
				nullCount: 0,
				uniqueCount: this.unique().count(),
				heapUsed: 0,
				heapTotal: 0
			}, A = D.memoryUsage();
			if (T.heapUsed = A.heapUsed, T.heapTotal = A.heapTotal, collection.length > 0) {
				let _ = collection.items[0], B = Object.keys(_);
				T.fieldCount = B.length;
				let $ = /* @__PURE__ */ new Map();
				for (let Z of B) {
					let J = collection.items.filter((Q) => Q[Z] === null).length;
					$.set(String(Z), J), T.nullCount += J;
				}
				T.nullFieldsDistribution = $;
			}
			return T;
		},
		async profile() {
			let T = D.hrtime(), A = D.memoryUsage().heapUsed;
			await Promise.resolve([...collection.items]);
			let [_, B] = D.hrtime(T), $ = D.memoryUsage().heapUsed;
			return {
				time: _ * 1e3 + B / 1e6,
				memory: $ - A
			};
		},
		transform(T) {
			return U(collection.items.map((A) => {
				let _ = {}, B = Object.entries(T);
				for (let [$, Z] of B) _[$] = Z(A);
				return _;
			}));
		},
		kmeans({ k: T, maxIterations: A = 100, distanceMetric: _ = "euclidean" }) {
			if (collection.length === 0) return v(U([]));
			if (T <= 0 || T > collection.length) throw Error("Invalid k value");
			let B = collection.items.map((E) => Object.values(E).filter((Y) => typeof Y == "number"));
			if (B.some((E) => E.length === 0)) throw Error("No numeric values found in data");
			let $ = B.slice(0, T).map((E) => [...E]), Z = Array.from({ length: B.length }).fill(0), J = 0, Q = !0;
			for (; Q && J < A;) {
				Q = !1, B.forEach((E, W) => {
					let L = $.map((N, K) => ({
						index: K,
						distance: _ === "euclidean" ? Math.sqrt(E.reduce((X, F, G) => X + (F - N[G]) ** 2, 0)) : E.reduce((X, F, G) => X + Math.abs(F - N[G]), 0)
					})).reduce((N, K) => K.distance < N.distance ? K : N);
					Z[W] !== L.index && (Q = !0, Z[W] = L.index);
				});
				for (let E = 0; E < T; E++) {
					let W = B.filter((Y, L) => Z[L] === E);
					W.length > 0 && ($[E] = W[0].map((Y, L) => W.reduce((N, K) => N + K[L], 0) / W.length));
				}
				J++;
			}
			let H = collection.items.map((E, W) => ({
				cluster: Z[W],
				data: E
			}));
			return v(U(H));
		},
		linearRegression(T, A) {
			if (collection.length <= A.length) throw Error("Insufficient data points for regression");
			try {
				let $ = function(M, R) {
					return M.reduce((O, j, C) => O + j * R[C], 0);
				}, Z = function(M) {
					return M[0].map((R, O) => M.map((j) => j[O]));
				}, _ = collection.items.map((M) => Number(M[T])), B = collection.items.map((M) => [1, ...A.map((R) => Number(M[R]))]), J = Z(B), Q = J.map((M) => B[0].map((R, O) => $(M, B.map((j) => j[O])))), H = J.map((M) => $(M, _)), E = 1e-10;
				for (let M = 0; M < Q.length; M++) Q[M][M] += 1e-10;
				let W = Q.length, Y = Q.map((M, R) => [...M, H[R]]);
				for (let M = 0; M < W; M++) {
					let R = M;
					for (let j = M + 1; j < W; j++) Math.abs(Y[j][M]) > Math.abs(Y[R][M]) && (R = j);
					R !== M && ([Y[M], Y[R]] = [Y[R], Y[M]]);
					let O = Y[M][M];
					if (Math.abs(O) < 1e-10) throw Error("Matrix is nearly singular");
					for (let j = M; j <= W; j++) Y[M][j] /= O;
					for (let j = 0; j < W; j++) if (j !== M) {
						let C = Y[j][M];
						for (let z = M; z <= W; z++) Y[j][z] -= C * Y[M][z];
					}
				}
				let L = Y.map((M) => M[W]), N = B.map((M) => $(M, L)), K = _.reduce((M, R) => M + R, 0) / _.length, X = _.reduce((M, R) => M + (R - K) ** 2, 0), F = N.reduce((M, R, O) => M + (_[O] - R) ** 2, 0), G = X === 0 ? 0 : Math.min(1, Math.max(0, 1 - F / X)), S = _.map((M, R) => M - N[R]);
				return {
					coefficients: L,
					rSquared: Number.isFinite(G) ? G : 0,
					predictions: N,
					residuals: S
				};
			} catch {
				let B = collection.length, $ = collection.items.map((J) => Number(J[T])), Z = $.reduce((J, Q) => J + Q, 0) / B;
				return {
					coefficients: Array.from({ length: A.length + 1 }, () => 0),
					rSquared: 0,
					predictions: Array.from({ length: B }, () => Z),
					residuals: $.map((J) => J - Z)
				};
			}
		},
		async parallel(T, A = {}) {
			let { chunks: _ = navigator.hardwareConcurrency || 4, maxConcurrency: B = _ } = A, $ = Math.ceil(collection.length / _), Z = this.chunk($), J = 0, Q = [], H = [];
			for (let E = 0; E < Z.count(); E++) {
				let W = Z.nth(E);
				if (!W) continue;
				for (; J >= B;) await Promise.race(Q);
				J++;
				let Y, L = (async () => {
					try {
						let N = await T(U(W));
						Array.isArray(N) ? H.push(...N) : N && typeof N.toArray == "function" ? H.push(...N.toArray()) : H.push(N);
					} finally {
						J--, Y?.();
					}
				})();
				Y = () => {
					let N = Q.indexOf(L);
					N > -1 && Q.splice(N, 1);
				}, Q.push(L);
			}
			return await Promise.all(Q), U(H);
		},
		index(T) {
			let A = /* @__PURE__ */ new Map();
			for (let _ of T) {
				let B = /* @__PURE__ */ new Map();
				for (let $ of collection.items) {
					let Z = $[_];
					B.has(Z) || B.set(Z, []), B.get(Z).push($);
				}
				A.set(_, B);
			}
			return this.__indexes = A, this;
		},
		explain() {
			let T = [], A = this;
			for (; A.__previous;) T.unshift(A.__operation), A = A.__previous;
			return T.map((_, B) => `${B + 1}. ${_}`).join("\n");
		},
		async benchmark() {
			let T = {}, A = {}, _ = {}, B = [
				"filter",
				"map",
				"reduce",
				"sort"
			];
			for (let $ of B) {
				let Z = performance.now(), J = D.memoryUsage().heapUsed;
				switch ($) {
					case "filter":
						this.filter(() => !0), _[$] = "O(n)";
						break;
					case "map":
						this.map((Q) => Q), _[$] = "O(n)";
						break;
					case "reduce":
						this.reduce((Q) => Q, null), _[$] = "O(n)";
						break;
					case "sort":
						this.sort(), _[$] = "O(n log n)";
						break;
				}
				T[$] = performance.now() - Z, A[$] = D.memoryUsage().heapUsed - J;
			}
			return {
				timing: T,
				memory: A,
				complexity: _
			};
		},
		lazy() {
			async function* T(A) {
				for (let _ of A) yield _;
			}
			return P(T(collection.items));
		},
		mapToGroups(T) {
			let A = /* @__PURE__ */ new Map();
			for (let _ of collection.items) {
				let [B, $] = T(_);
				A.has(B) || A.set(B, []), A.get(B).push($);
			}
			return new Map(Array.from(A.entries()).map(([_, B]) => [_, U(B)]));
		},
		mapSpread(T) {
			return U(collection.items.map((A) => T(...Array.isArray(A) ? A : [A])));
		},
		mapUntil(T, A) {
			let _ = [];
			for (let B = 0; B < collection.items.length; B++) {
				let $ = T(collection.items[B], B);
				if (A($)) break;
				_.push($);
			}
			return U(_);
		},
		pivot(T, A) {
			return new Map(collection.items.map((_) => [_[T], _[A]]));
		},
		join(T) {
			return collection.items.join(T);
		},
		implode(T, A = "") {
			return collection.items.map((_) => String(_[T])).join(A);
		},
		lower() {
			return U(collection.items.map((T) => String(T).toLowerCase()));
		},
		upper() {
			return U(collection.items.map((T) => String(T).toUpperCase()));
		},
		slug() {
			return U(collection.items.map((T) => String(T).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")));
		},
		power() {
			let T = [[]];
			for (let A of collection.items) {
				let _ = T.length;
				for (let B = 0; B < _; B++) T.push([...T[B], A]);
			}
			return U(T.map((A) => U(A)));
		},
		correlate(T, A) {
			let _ = collection.items.map((E) => Number(E[T])), B = collection.items.map((E) => Number(E[A])), $ = _.reduce((E, W) => E + W, 0) / _.length, Z = B.reduce((E, W) => E + W, 0) / B.length, J = _.reduce((E, W) => E + (W - $) ** 2, 0), Q = B.reduce((E, W) => E + (W - Z) ** 2, 0);
			return _.reduce((E, W, Y) => E + (_[Y] - $) * (B[Y] - Z), 0) / Math.sqrt(J * Q);
		},
		outliers(T, A = 2) {
			let _ = collection.items.map((Z) => Number(Z[T])), B = _.reduce((Z, J) => Z + J, 0) / _.length, $ = Math.sqrt(_.reduce((Z, J) => Z + (J - B) ** 2, 0) / _.length);
			return U(collection.items.filter((Z) => Math.abs((Number(Z[T]) - B) / $) > A));
		},
		cast(T) {
			return U(collection.items.map((A) => new T(A)));
		},
		zscore(T) {
			if (T === void 0) {
				let $ = this.items, Z = $.reduce((Q, H) => Q + H, 0) / $.length, J = Math.sqrt($.reduce((Q, H) => Q + (H - Z) ** 2, 0) / $.length);
				return U($.map((Q) => (Q - Z) / J));
			}
			let A = collection.items.map(($) => Number($[T])), _ = A.reduce(($, Z) => $ + Z, 0) / A.length, B = Math.sqrt(A.reduce(($, Z) => $ + (Z - _) ** 2, 0) / A.length);
			return U(A.map(($) => ($ - _) / B));
		},
		kurtosis(T) {
			let A;
			A = T === void 0 ? this.items : collection.items.map((Z) => Number(Z[T]));
			let _ = A.reduce((Z, J) => Z + J, 0) / A.length, B = Math.sqrt(A.reduce((Z, J) => Z + (J - _) ** 2, 0) / A.length);
			return A.reduce((Z, J) => Z + (J - _) ** 4, 0) / A.length / B ** 4 - 3;
		},
		skewness(T) {
			let A;
			A = T === void 0 ? this.items : collection.items.map((Z) => Number(Z[T]));
			let _ = A.reduce((Z, J) => Z + J, 0) / A.length, B = Math.sqrt(A.reduce((Z, J) => Z + (J - _) ** 2, 0) / A.length);
			return A.reduce((Z, J) => Z + (J - _) ** 3, 0) / A.length / B ** 3;
		},
		covariance(T, A) {
			let _ = collection.items.map((J) => Number(J[T])), B = collection.items.map((J) => Number(J[A])), $ = _.reduce((J, Q) => J + Q, 0) / _.length, Z = B.reduce((J, Q) => J + Q, 0) / B.length;
			return _.reduce((J, Q, H) => J + (_[H] - $) * (B[H] - Z), 0) / _.length;
		},
		entropy(T) {
			let A;
			A = T === void 0 ? this.items : collection.items.map((B) => B[T]);
			let _ = /* @__PURE__ */ new Map();
			for (let B of A) _.set(B, (_.get(B) || 0) + 1);
			return -Array.from(_.values()).map((B) => B / A.length).reduce((B, $) => B + $ * Math.log2($), 0);
		},
		mapOption(T) {
			return U(collection.items.map(T).filter((A) => A != null));
		},
		zipWith(T, A) {
			let _ = Math.min(collection.length, T.count()), B = [];
			for (let $ = 0; $ < _; $++) B.push(A(collection.items[$], T.toArray()[$]));
			return U(B);
		},
		scan(T, A) {
			let _ = [], B = A;
			for (let $ of collection.items) B = T(B, $), _.push(B);
			return U(_);
		},
		unfold(T, A) {
			let _ = [], B = A, $ = T(B);
			for (; $ !== null;) {
				let [Z, J] = $;
				_.push(Z), B = J, $ = T(B);
			}
			return U(_);
		},
		as(T) {
			return U(collection.items.map((A) => {
				let _ = new T(), B = Object.keys(_), $ = A;
				return B.forEach((Z) => {
					Z in $ && (_[Z] = $[Z]);
				}), _;
			}));
		},
		pick(...T) {
			return U(collection.items.map((A) => {
				let _ = {};
				for (let B of T) _[B] = A[B];
				return _;
			}));
		},
		omit(...T) {
			let A = new Set(T);
			return U(collection.items.map((_) => {
				let B = {};
				for (let $ of Object.keys(_)) A.has($) || (B[$] = _[$]);
				return B;
			}));
		},
		search(T, A, _ = {}) {
			let { fuzzy: B = !1, weights: $ = {} } = _, Z = T.toLowerCase();
			return U(collection.items.map((J) => {
				let Q = 0;
				for (let H of A) {
					let E = String(J[H]).toLowerCase(), W = $[H] || 1;
					B ? Q += calculateFuzzyScore(Z, E) * W : Q += E.includes(Z) ? W : 0;
				}
				return {
					...J,
					score: Q
				};
			})).filter((J) => J.score > 0).sort((J, Q) => Q.score - J.score);
		},
		aggregate(T, A) {
			let _ = this.groupBy(T), B = /* @__PURE__ */ new Map();
			for (let [$, Z] of _.entries()) {
				let J = {};
				for (let Q of A) switch (Q) {
					case "sum":
						J.sum = Z.sum();
						break;
					case "avg":
						J.avg = Z.avg();
						break;
					case "min":
						J.min = Number(Z.min());
						break;
					case "max":
						J.max = Number(Z.max());
						break;
					case "count":
						J.count = Z.count();
						break;
				}
				B.set($, J);
			}
			return B;
		},
		pivotTable(T, A, _, B) {
			let $ = /* @__PURE__ */ new Map(), Z = new Set(collection.items.map((Q) => Q[T])), J = new Set(collection.items.map((Q) => Q[A]));
			for (let Q of Z) {
				let H = /* @__PURE__ */ new Map();
				for (let E of J) {
					let W = this.filter((L) => L[T] === Q && L[A] === E), Y;
					switch (B) {
						case "sum":
							Y = W.sum(_);
							break;
						case "avg":
							Y = W.avg(_);
							break;
						case "count":
							Y = W.count();
							break;
					}
					H.set(E, Y);
				}
				$.set(Q, H);
			}
			return $;
		},
		toSQL(T) {
			if (collection.length === 0) return "";
			let A = Object.keys(collection.items[0]), _ = collection.items.map((B) => `(${A.map(($) => JSON.stringify(B[$])).join(", ")})`).join(",\n");
			return `INSERT INTO ${T} (${A.join(", ")})
VALUES
${_};`;
		},
		toGraphQL(T) {
			if (collection.length === 0) return `query {
  ${T}s {
    []
  }
}`;
			let A = Object.keys(collection.items[0]);
			return `query {
  ${T}s {
    nodes {
${collection.items.map((_) => `      ${T} {
${A.map((B) => `        ${B}: ${JSON.stringify(_[B])}`).join("\n")}
      }`).join("\n")}
    }
  }
}`;
		},
		toElastic(T) {
			return {
				index: T,
				body: collection.items.flatMap((A) => [{ index: { _index: T } }, A])
			};
		},
		toPandas() {
			return collection.length === 0 ? "pd.DataFrame()" : `pd.DataFrame([
  ${collection.items.map((A) => JSON.stringify(A)).join(",\n  ")}
])`;
		},
		playground() {
			console.log("Collection Playground:", {
				items: collection.items,
				length: collection.length,
				operations: Object.keys(this)
			});
		},
		fft() {
			if (!collection.items.every((A) => typeof A == "number")) throw Error("FFT can only be performed on number collections");
			function T(A) {
				let _ = A.length;
				if (_ <= 1) return [[A[0], 0]];
				let B = T(A.filter((J, Q) => Q % 2 == 0)), $ = T(A.filter((J, Q) => Q % 2 == 1)), Z = Array(_);
				for (let J = 0; J < _ / 2; J++) {
					let Q = -2 * Math.PI * J / _, H = [Math.cos(Q) * $[J][0] - Math.sin(Q) * $[J][1], Math.sin(Q) * $[J][0] + Math.cos(Q) * $[J][1]];
					Z[J] = [B[J][0] + H[0], B[J][1] + H[1]], Z[J + _ / 2] = [B[J][0] - H[0], B[J][1] - H[1]];
				}
				return Z;
			}
			return U(T(collection.items));
		},
		interpolate(T) {
			if (T < 2) throw Error("Points must be greater than 1");
			if (this.count() === 1) {
				let $ = Number(this.first());
				return U(Array(T).fill($));
			}
			let A = this.toArray(), _ = [], B = (A.length - 1) / (T - 1);
			for (let $ = 0; $ < T; $++) {
				let Z = $ * B, J = Math.floor(Z), Q = Math.min(Math.ceil(Z), A.length - 1), H = A[J], E = A[Q];
				_.push(H + (E - H) * (Z - J));
			}
			return U(_);
		},
		convolve(T) {
			if (T.length === 0) throw Error("Kernel must not be empty");
			if (this.count() === 0) throw Error("Signal must not be empty");
			let A = this.toArray(), _ = A.length, B = T.length, $ = [];
			for (let Z = 0; Z < _ + B - 1; Z++) {
				let J = 0;
				for (let Q = Math.max(0, Z - B + 1); Q <= Math.min(_ - 1, Z); Q++) J += A[Q] * T[Z - Q];
				$.push(J);
			}
			return U($);
		},
		differentiate() {
			if (this.count() <= 1) return U([]);
			let T = this.toArray();
			return U(T.slice(1).map((A, _) => Number(A) - Number(T[_])));
		},
		integrate() {
			let T = this.toArray();
			if (T.length === 0) return U([0]);
			let A = [0], _ = 0;
			for (let B of T) _ += B, A.push(_);
			return U(A);
		},
		geoDistance(T, A, _ = "km") {
			function B($, Z, J, Q) {
				if (!I($, Z) || !I(J, Q)) throw Error("Invalid coordinates");
				let H = _ === "km" ? 6371 : 3959, E = (J - $) * Math.PI / 180, W = (Q - Z) * Math.PI / 180, Y = $ * Math.PI / 180, L = J * Math.PI / 180, N = Math.sin(E / 2) * Math.sin(E / 2) + Math.cos(Y) * Math.cos(L) * Math.sin(W / 2) * Math.sin(W / 2), K = 2 * Math.atan2(Math.sqrt(N), Math.sqrt(1 - N));
				return H * K;
			}
			return U(collection.items.map(($) => {
				let Z = $[T];
				if (!Z || !Array.isArray(Z) || Z.length !== 2) throw Error("Invalid coordinates");
				return {
					...$,
					distance: B(Z[0], Z[1], A[0], A[1])
				};
			}));
		},
		money(T, A = "USD") {
			let _ = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: A
			});
			return U(collection.items.map((B) => ({
				...B,
				formatted: _.format(Number(B[T]))
			})));
		},
		dateTime(T, A = "en-US") {
			return U(collection.items.map((_) => ({
				..._,
				formatted: new Date(_[T]).toLocaleString(A)
			})));
		},
		configure(T) {
			T.locale && (Intl.NumberFormat.prototype.format = new Intl.NumberFormat(T.locale).format), T.timezone && (Intl.DateTimeFormat.prototype.format = new Intl.DateTimeFormat(void 0, { timeZone: T.timezone }).format);
		},
		trend(T) {
			let A = this.timeSeries(T), _ = A.count(), B = Array.from({ length: _ }, (Y, L) => L), $ = A.pluck("value").toArray(), Z = B.reduce((Y, L) => Y + L, 0), J = $.reduce((Y, L) => Y + L, 0), Q = B.reduce((Y, L, N) => Y + L * $[N], 0), H = B.reduce((Y, L) => Y + L * L, 0), E = (_ * Q - Z * J) / (_ * H - Z * Z), W = (J - E * Z) / _;
			return {
				slope: E,
				intercept: W
			};
		},
		seasonality(T) {
			let A = this.timeSeries(T), _ = /* @__PURE__ */ new Map(), B = A.groupBy(($) => {
				let Z = $.date;
				switch (T.interval) {
					case "month": return Z.getMonth().toString();
					case "week": return Z.getDay().toString();
					default: return Z.getDate().toString();
				}
			});
			for (let [$, Z] of B) _.set(String($), Z.avg("value"));
			return _;
		},
		forecast(T) {
			let A = this.trend({
				dateField: "",
				valueField: ""
			}), _ = this.last();
			if (!_) return U([]);
			let B = Array.from({ length: T }, ($, Z) => {
				let J = { ..._ }, Q = A.slope * (this.count() + Z) + A.intercept, H = J;
				return H.value !== void 0 && (H.value = Q), H;
			});
			return U(B);
		},
		async assertValid(T) {
			let A = await this.validate(T);
			if (!A.isValid) throw Error(`Validation failed: ${JSON.stringify(Array.from(A.errors.entries()))}`);
		},
		sanitize(T) {
			return this.map((A) => {
				let _ = { ...A };
				for (let [B, $] of Object.entries(T)) _[B] = $(A[B]);
				return _;
			});
		},
		query(sql, params = []) {
			let lowerSQL = sql.toLowerCase(), result = this;
			if (lowerSQL.includes("where")) {
				let whereClause = sql.split("where")[1].trim(), paramIndex = 0;
				result = this.filter((item) => {
					let parsedClause = whereClause.replace(/\$\{(\w+)\}/g, (T, A) => JSON.stringify(item[A])).replace(/\?/g, () => {
						let T = params[paramIndex];
						return paramIndex++, JSON.stringify(T);
					});
					return eval(parsedClause);
				});
			}
			return result;
		},
		having(T, A, _) {
			let B = {
				">": ($, Z) => $ > Z,
				"<": ($, Z) => $ < Z,
				">=": ($, Z) => $ >= Z,
				"<=": ($, Z) => $ <= Z,
				"=": ($, Z) => $ === Z,
				"!=": ($, Z) => $ !== Z
			};
			return this.filter(($) => B[A]($[T], _));
		},
		crossJoin(T) {
			let A = [];
			for (let _ of this.items) for (let B of T.items) A.push({
				..._,
				...B
			});
			return U(A);
		},
		leftJoin(T, A, _) {
			return this.map((B) => {
				let $ = T.items.find((Z) => {
					let J = B[A], Q = Z[_];
					return J === Q;
				});
				return {
					...B,
					...$ || {}
				};
			});
		},
		batch(T) {
			return this.cursor(T);
		},
		toJSON(T = {}) {
			let { pretty: A = !1, exclude: _ = [], include: B } = T, $ = this.items.map((Z) => {
				let J = {}, Q = B || Object.keys(Z);
				for (let H of Q) _.includes(H) || (J[H] = Z[H]);
				return J;
			});
			return JSON.stringify($, null, A ? 2 : void 0);
		},
		toCsv(T = {}) {
			let { exclude: A = [], include: _ } = T, B = this.toArray();
			if (B.length === 0) return "";
			let Z = (_ || Object.keys(B[0])).filter((Q) => !A.includes(Q)), J = B.map((Q) => Z.map((H) => JSON.stringify(Q[H])).join(","));
			return [Z.join(","), ...J].join("\n");
		},
		toXml(T = {}) {
			let { exclude: A = [], include: _ } = T, B = this.toArray(), $ = "items", Z = "item";
			function J(H) {
				return H.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
			}
			return `<?xml version="1.0" encoding="UTF-8"?>
<items>
${B.map((H) => `<item>
${(_ || Object.keys(H)).filter((Y) => !A.includes(Y)).map((Y) => `  <${Y}>${J(String(H[Y]))}</${Y}>`).join("\n")}
</item>`).join("\n")}
</items>`;
		},
		parse(T, A) {
			switch (A) {
				case "json": return U(JSON.parse(T));
				case "csv": {
					let _ = T.trim().split("\n"), B = _[0].split(","), $ = _.slice(1).map((Z) => {
						let J = Z.split(","), Q = {};
						return B.forEach((H, E) => {
							Q[H] = J[E];
						}), Q;
					});
					return U($);
				}
				case "xml": throw Error("XML parsing not implemented");
				default: throw Error(`Unsupported format: ${A}`);
			}
		},
		cache(T = 6e4) {
			let A = /* @__PURE__ */ new Map(), _ = JSON.stringify(this.items), B = Date.now(), $ = A.get(_);
			return $ && $.expiry > B ? U($.data) : (A.set(_, {
				data: [...this.items],
				expiry: B + T
			}), this);
		},
		memoize(T) {
			let A = /* @__PURE__ */ new Map(), _ = this.items.map((B) => {
				let $ = B[T];
				return A.has($) || A.set($, B), A.get($);
			});
			return U(_);
		},
		async prefetch() {
			let T = await Promise.all(this.items.map(async (A) => A instanceof Promise ? await A : await Promise.resolve(A)));
			return U(T);
		},
		sentiment() {
			let T = new Set([
				"good",
				"great",
				"awesome",
				"excellent",
				"happy",
				"love"
			]), A = new Set([
				"bad",
				"terrible",
				"awful",
				"horrible",
				"sad",
				"hate"
			]), _ = [new Set(["great", "awesome"])];
			return this.map((B) => {
				let $ = B.toLowerCase().replace(/[.,!?]*/g, "").split(/\s+/).filter((Q) => Q.length > 0), Z = 0, J = /* @__PURE__ */ new Set();
				return $.forEach((Q) => {
					if (T.has(Q)) {
						let H = !1;
						_.forEach((E, W) => {
							E.has(Q) && J.has(W) && (H = !0);
						}), !H && (Z++, _.forEach((E, W) => {
							E.has(Q) && J.add(W);
						}));
					}
					A.has(Q) && Z--;
				}), {
					score: Z,
					comparative: Z / $.length
				};
			});
		},
		wordFrequency() {
			let T = /* @__PURE__ */ new Map();
			return this.items.forEach((A) => {
				A.toLowerCase().split(/\s+/).forEach((B) => {
					T.set(B, (T.get(B) || 0) + 1);
				});
			}), T;
		},
		ngrams(T) {
			return U(this.items.flatMap((A) => {
				let _ = A.split(/\s+/), B = [];
				for (let $ = 0; $ <= _.length - T; $++) B.push(_.slice($, $ + T).join(" "));
				return B;
			}));
		},
		instrument(T) {
			let A = /* @__PURE__ */ new Map();
			A.set("count", this.count()), A.set("operations", 0), A.set("timeStart", Date.now());
			let _ = new Proxy(this, { get(B, $) {
				return typeof B[$] == "function" && A.set("operations", (A.get("operations") || 0) + 1), B[$];
			} });
			return T(A), _;
		},
		optimize() {
			let T = this.cache();
			if (this.count() > 1e3) {
				let A = this.first();
				if (A) {
					let _ = Object.keys(A);
					T.index(_);
				}
			}
			return T;
		},
		removeOutliers(T, A = 2) {
			let _ = this.pluck(T).toArray(), B = _.reduce((Z, J) => Number(Z) + Number(J), 0) / _.length, $ = Math.sqrt(_.reduce((Z, J) => Z + (Number(J) - B) ** 2, 0) / _.length);
			return this.filter((Z) => {
				let J = Number(Z[T]);
				return Math.abs((J - B) / $) <= A;
			});
		},
		impute(T, A) {
			let _ = this.pluck(T).toArray(), B;
			switch (A) {
				case "mean":
					B = _.reduce((Z, J) => Number(Z) + Number(J), 0) / _.length;
					break;
				case "median": {
					let $ = [..._].sort((J, Q) => Number(J) - Number(Q)), Z = Math.floor($.length / 2);
					B = $[Z];
					break;
				}
				case "mode": {
					let $ = /* @__PURE__ */ new Map(), Z = 0, J = _[0];
					for (let Q of _) {
						let H = ($.get(Q) || 0) + 1;
						$.set(Q, H), H > Z && (Z = H, J = Q);
					}
					B = J;
					break;
				}
			}
			return this.map(($) => ({
				...$,
				[T]: $[T] ?? B
			}));
		},
		normalize(T, A) {
			let _ = this.pluck(T).toArray().map(Number);
			if (A === "minmax") {
				let Z = Math.min(..._), Q = Math.max(..._) - Z;
				return this.map((H) => ({
					...H,
					[T]: Q === 0 ? 0 : (Number(H[T]) - Z) / Q
				}));
			}
			let B = _.reduce((Z, J) => Z + J, 0) / _.length, $ = Math.sqrt(_.reduce((Z, J) => Z + (J - B) ** 2, 0) / _.length);
			return this.map((Z) => ({
				...Z,
				[T]: $ === 0 ? 0 : (Number(Z[T]) - B) / $
			}));
		},
		knn(T, A, _) {
			function B(Z, J) {
				return Math.sqrt(Array.from(_).reduce((Q, H) => {
					let E = J[H], W = Z[H];
					if (E === void 0) return Q;
					let Y = Number(W), L = Number(E);
					if (Number.isNaN(Y) || Number.isNaN(L)) return Q;
					let N = Y - L;
					return Q + N * N;
				}, 0));
			}
			let $ = collection.items.map((Z) => ({
				item: Z,
				distance: B(Z, T)
			})).sort((Z, J) => Z.distance - J.distance).slice(0, Math.min(A, collection.items.length)).map((Z) => Z.item);
			return U($);
		},
		naiveBayes(T, A) {
			let _ = new Set(this.pluck(A).toArray()), B = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Map();
			for (let Z of _) {
				let J = this.where(A, Z);
				B.set(Z, J.count() / this.count()), $.set(Z, /* @__PURE__ */ new Map());
				for (let Q of T) {
					let H = /* @__PURE__ */ new Map(), E = new Set(J.pluck(Q).toArray());
					for (let W of E) {
						let Y = J.where(Q, W).count();
						H.set(W, Y / J.count());
					}
					$.get(Z).set(Q, H);
				}
			}
			return (Z) => {
				let J = -Infinity, Q = Array.from(_)[0];
				for (let H of _) {
					let E = Math.log(B.get(H) || 0);
					for (let W of T) {
						let Y = Z[W], L = $.get(H)?.get(W)?.get(Y) || 1e-4;
						E += Math.log(L);
					}
					E > J && (J = E, Q = H);
				}
				return Q;
			};
		},
		detectAnomalies(T) {
			let { method: A = "zscore", threshold: _ = 2, features: B = [] } = T;
			switch (A) {
				case "zscore": {
					let $ = B.length > 0 ? B : Object.keys(this.first() || {});
					return this.filter((Z) => {
						for (let J of $) {
							let Q = this.pluck(J).toArray().map(Number), H = Q.reduce((Y, L) => Y + L, 0) / Q.length, E = Math.sqrt(Q.reduce((Y, L) => Y + (L - H) ** 2, 0) / Q.length);
							if (Math.abs((Number(Z[J]) - H) / E) > _) return !0;
						}
						return !1;
					});
				}
				case "iqr": {
					let $ = B.length > 0 ? B : Object.keys(this.first() || {});
					return this.filter((Z) => {
						for (let J of $) {
							let Q = this.pluck(J).toArray().map(Number).sort((L, N) => L - N), H = Q[Math.floor(Q.length * .25)], E = Q[Math.floor(Q.length * .75)], W = E - H, Y = Number(Z[J]);
							if (Y < H - _ * W || Y > E + _ * W) return !0;
						}
						return !1;
					});
				}
				case "isolationForest": {
					let J = function(H, E, W) {
						if (W >= Z || H.length <= 1) return W;
						let Y = H.map((G) => Number(G[E])), L = Math.min(...Y), N = Math.max(...Y), K = L + Math.random() * (N - L), X = H.filter((G) => Number(G[E]) < K), F = H.filter((G) => Number(G[E]) >= K);
						return Math.max(J(X, E, W + 1), J(F, E, W + 1));
					}, $ = Math.min(256, this.count()), Z = Math.ceil(Math.log2($)), Q = B.length > 0 ? B : Object.keys(this.first() || {});
					return this.filter((H) => Q.reduce((W, Y) => {
						let L = J([H], Y, 0);
						return W + L;
					}, 0) / Q.length < _);
				}
			}
		}
	};
}
function v(T) {
	let A = T.pluck.bind(T), _ = T;
	function B($) {
		let Z = A($);
		if ($ === "cluster") {
			let J = Z;
			return {
				values: () => J.toArray(),
				toArray: () => J.toArray(),
				*[Symbol.iterator]() {
					yield* J.toArray();
				}
			};
		}
		if ($ === "data") {
			let J = Z;
			return {
				values: () => J.toArray(),
				toArray: () => J.toArray(),
				forEach: (Q) => {
					J.toArray().forEach(Q);
				},
				avg: (Q) => {
					let H = J.toArray().map((E) => Number(E[Q])).filter((E) => !Number.isNaN(E));
					return H.reduce((E, W) => E + W, 0) / H.length;
				},
				filter: (Q) => {
					let H = J.toArray().filter(Q);
					return p(U(H));
				}
			};
		}
		return Z;
	}
	return _.pluck = B, _;
}
function p(T) {
	return {
		values: () => T.toArray(),
		toArray: () => T.toArray(),
		forEach: (A) => {
			T.toArray().forEach(A);
		},
		avg: (A) => {
			let _ = T.toArray().map((B) => Number(B[A])).filter((B) => !Number.isNaN(B));
			return _.reduce((B, $) => B + $, 0) / _.length;
		},
		filter: (A) => {
			let _ = T.toArray().filter(A);
			return p(U(_));
		}
	};
}
function useCommandEvent() {
	let itemInfo = ref(), rerenderList = ref(!1);
	return {
		itemInfo,
		rerenderList
	};
}
const state = reactive({
	selectedNode: "",
	selectedGroup: "",
	shouldRerender: !1,
	search: "",
	filtered: {
		count: 0,
		items: /* @__PURE__ */ new Map(),
		groups: /* @__PURE__ */ new Set()
	}
});
function useCommandState() {
	let isSearching = computed(() => state.search !== ""), resetStore = () => {
		state.search = "", state.filtered.count = 0, state.filtered.items = /* @__PURE__ */ new Map(), state.filtered.groups = /* @__PURE__ */ new Set();
	};
	return {
		isSearching,
		resetStore,
		...toRefs(state)
	};
}
function findNextSibling(el, selector) {
	let sibling = el.nextElementSibling;
	for (; sibling;) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling;
	}
}
function findPreviousSibling(el, selector) {
	let sibling = el.previousElementSibling;
	for (; sibling;) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.previousElementSibling;
	}
}
const _hoisted_1$4 = ["command-theme"], _hoisted_2$2 = { "command-root": "" }, ITEM_SELECTOR = "[command-item=\"\"]", ITEM_KEY_SELECTOR = "command-item-key", GROUP_SELECTOR = "[command-group=\"\"]", GROUP_KEY_SELECTOR = "command-group-key", GROUP_HEADING_SELECTOR = "[command-group-heading=\"\"]", SELECT_EVENT = "command-item-select", VALUE_ATTR = "data-value";
var CommandRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "Command.Root",
	__name: "CommandRoot",
	props: {
		theme: { default: "default" },
		options: { default: {
			threshold: .2,
			key: "label"
		} }
	},
	emits: ["selectItem"],
	setup(__props, { emit: __emit }) {
		let props = __props, emit = __emit, VALID_ITEM_SELECTOR = `${ITEM_SELECTOR}:not([aria-disabled="true"])`, SELECTED_ITEM_SELECTOR = `${ITEM_SELECTOR}[aria-selected="true"]`;
		provide("theme", props.theme || "default");
		let { selectedNode, search, filtered, shouldRerender } = useCommandState(), { itemInfo, rerenderList } = useCommandEvent(), commandRef = ref(), commandList = refDebounced(ref(/* @__PURE__ */ new Map()), 333), allItemIds = refDebounced(ref(/* @__PURE__ */ new Set()), 333), allGroupIds = refDebounced(ref(/* @__PURE__ */ new Map())), commandSearchList = computed(() => {
			let list = [];
			for (let [key, label] of commandList.value.entries()) list.push({
				key,
				label
			});
			return list;
		});
		function scrollSelectedIntoView() {
			let item = getSelectedItem();
			item && (item.parentElement?.firstElementChild === item && item.closest(GROUP_SELECTOR)?.querySelector("[command-group-heading=\"\"]")?.scrollIntoView({ block: "nearest" }), item.scrollIntoView({ block: "nearest" }));
		}
		function getSelectedItem() {
			return commandRef.value?.querySelector(SELECTED_ITEM_SELECTOR);
		}
		function getAllGroups() {
			let allGroupEl = commandRef.value?.querySelectorAll(GROUP_SELECTOR);
			return allGroupEl ? Array.from(allGroupEl) : [];
		}
		function getAllItems(rootNode = commandRef.value) {
			let allItemEl = rootNode?.querySelectorAll(ITEM_SELECTOR);
			return allItemEl ? Array.from(allItemEl) : [];
		}
		function getValidItems(rootNode = commandRef.value) {
			let allItemEl = rootNode?.querySelectorAll(VALID_ITEM_SELECTOR);
			return allItemEl ? Array.from(allItemEl) : [];
		}
		function selectedFirstItem() {
			let [firstItem] = getValidItems();
			firstItem && firstItem.getAttribute(ITEM_KEY_SELECTOR) && (selectedNode.value = firstItem.getAttribute(ITEM_KEY_SELECTOR) || "");
		}
		function updateSelectedToIndex(index) {
			let items = getValidItems(), item = items[index];
			item && (selectedNode.value = item.getAttribute(ITEM_KEY_SELECTOR) || "");
		}
		function updateSelectedByChange(change) {
			let selected = getSelectedItem(), items = getValidItems(), index = items.findIndex((item) => item === selected), newSelected = items[index + change];
			newSelected ? selectedNode.value = newSelected.getAttribute(ITEM_KEY_SELECTOR) || "" : updateSelectedToIndex(change > 0 ? 0 : items.length - 1);
		}
		function updateSelectedToGroup(change) {
			let selected = getSelectedItem(), group = selected?.closest(GROUP_SELECTOR), item = null;
			for (; group && !item;) group = change > 0 ? findNextSibling(group, GROUP_SELECTOR) : findPreviousSibling(group, GROUP_SELECTOR), item = group?.querySelector(VALID_ITEM_SELECTOR);
			item ? selectedNode.value = item.getAttribute(ITEM_KEY_SELECTOR) || "" : updateSelectedByChange(change);
		}
		let first = () => updateSelectedToIndex(0), last = () => updateSelectedToIndex(getValidItems().length - 1);
		function next(e) {
			e.preventDefault(), e.metaKey ? last() : e.altKey ? updateSelectedToGroup(1) : updateSelectedByChange(1);
		}
		function prev(e) {
			e.preventDefault(), e.metaKey ? first() : e.altKey ? updateSelectedToGroup(-1) : updateSelectedByChange(-1);
		}
		function handleKeyDown(e) {
			switch (e.key) {
				case "n":
				case "j":
					e.ctrlKey && next(e);
					break;
				case "ArrowDown":
					next(e);
					break;
				case "p":
				case "k":
					e.ctrlKey && prev(e);
					break;
				case "ArrowUp":
					prev(e);
					break;
				case "Home":
					first();
					break;
				case "End":
					last();
					break;
				case "Enter": {
					let item = getSelectedItem();
					if (item) {
						let event = new Event("command-item-select");
						item.dispatchEvent(event);
					}
				}
			}
		}
		function filterItems() {
			if (!search.value) {
				filtered.value.count = allItemIds.value.size;
				return;
			}
			filtered.value.groups = /* @__PURE__ */ new Set();
			let items = /* @__PURE__ */ new Map(), key = props.options.key || "label", threshold = props.options.threshold || .2, list = U(commandSearchList.value).fuzzyMatch(key, search.value, threshold).all();
			for (let { key: key$1, label } of list) items.set(key$1, label);
			for (let [groupId, itemIdsInGroup] of allGroupIds.value) for (let itemId of itemIdsInGroup) items.get(itemId) && filtered.value.groups.add(groupId);
			filtered.value.count = items.size, filtered.value.items = items;
		}
		function initStore() {
			let groups = getAllGroups(), items = getAllItems();
			for (let item of items) {
				let itemKey = item.getAttribute(ITEM_KEY_SELECTOR) || "", itemLabel = item.getAttribute("data-value") || "";
				allItemIds.value.add(itemKey), commandList.value.set(itemKey, itemLabel), filtered.value.count = commandList.value.size;
			}
			for (let group of groups) {
				let itemsInGroup = getAllItems(group), groupId = group.getAttribute("command-group-key") || "", itemIds = /* @__PURE__ */ new Set("");
				for (let item of itemsInGroup) {
					let itemKey = item.getAttribute(ITEM_KEY_SELECTOR) || "";
					itemIds.add(itemKey);
				}
				allGroupIds.value.set(groupId, itemIds);
			}
		}
		watch(() => selectedNode.value, (newVal) => {
			newVal && nextTick(scrollSelectedIntoView);
		}, { deep: !0 }), watch(() => search.value, () => {
			shouldRerender.value || (filterItems(), nextTick(selectedFirstItem));
		}), watch(() => itemInfo.value, (item) => {
			emit("selectItem", item);
		});
		function rerenderMenuList(isRerender) {
			isRerender && (shouldRerender.value = isRerender, initStore(), nextTick(() => {
				filterItems(), selectedFirstItem(), shouldRerender.value = !1;
			}));
		}
		return watch(() => rerenderList.value, (val) => {
			val && rerenderMenuList(val);
		}), onMounted(() => {
			initStore(), nextTick(selectedFirstItem), console.log(commandSearchList.value);
		}), (_ctx, _cache) => (openBlock(), createElementBlock("div", {
			ref_key: "commandRef",
			ref: commandRef,
			class: normalizeClass(_ctx.theme),
			"command-theme": _ctx.theme,
			onKeydown: handleKeyDown
		}, [createElementVNode("div", _hoisted_2$2, [renderSlot(_ctx.$slots, "default")])], 42, _hoisted_1$4));
	}
}), CommandRoot_default = CommandRoot_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1$3 = { "command-dialog": "" }, _hoisted_2$1 = { "command-dialog-mask": "" }, _hoisted_3$1 = { "command-dialog-wrapper": "" }, _hoisted_4 = { "command-dialog-header": "" }, _hoisted_5 = { "command-dialog-body": "" }, _hoisted_6 = {
	key: 0,
	"command-dialog-footer": ""
};
var CommandDialog_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "Command.Dialog",
	__name: "CommandDialog",
	props: {
		visible: { type: Boolean },
		theme: {}
	},
	emits: ["selectItem"],
	setup(__props, { emit: __emit }) {
		let props = __props, emit = __emit, { resetStore } = useCommandState(), { itemInfo } = useCommandEvent(), dialogRef = ref();
		return watch(() => itemInfo.value, (item) => {
			emit("selectItem", item);
		}), whenever(() => props.visible, resetStore), onBeforeUnmount(resetStore), (_ctx, _cache) => (openBlock(), createBlock(Teleport, {
			ref_key: "dialogRef",
			ref: dialogRef,
			to: "body"
		}, [createVNode(Transition, {
			name: "command-dialog",
			appear: ""
		}, {
			default: withCtx(() => [_ctx.visible ? (openBlock(), createBlock(CommandRoot_default, {
				key: 0,
				theme: _ctx.theme
			}, {
				default: withCtx(() => [createElementVNode("div", _hoisted_1$3, [createElementVNode("div", _hoisted_2$1, [createElementVNode("div", _hoisted_3$1, [
					createElementVNode("div", _hoisted_4, [renderSlot(_ctx.$slots, "header")]),
					createElementVNode("div", _hoisted_5, [renderSlot(_ctx.$slots, "body")]),
					_ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_6, [renderSlot(_ctx.$slots, "footer")])) : createCommentVNode("", !0)
				])])])]),
				_: 3
			}, 8, ["theme"])) : createCommentVNode("", !0)]),
			_: 3
		})], 512));
	}
}), CommandDialog_default = CommandDialog_vue_vue_type_script_setup_true_lang_default, __defProp = Object.defineProperty, __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: !0,
		configurable: !0,
		set: (newValue) => all[name] = () => newValue
	});
}, exports_string = {};
__export(exports_string, {
	urlAlphabet: () => urlAlphabet,
	truncate: () => truncate,
	trainCase: () => trainCase,
	toString: () => toString,
	titleCase: () => titleCase,
	template: () => template,
	swapCase: () => swapCase,
	str: () => str,
	spongeCase: () => spongeCase,
	splitSeparateNumbers: () => splitSeparateNumbers,
	split: () => split,
	snakeCase: () => snakeCase,
	slugify: () => slugify,
	slug: () => slug,
	slash: () => slash,
	singular: () => singular,
	sentenceCase: () => sentenceCase,
	random: () => random,
	pluralize: () => pluralize,
	plural: () => plural,
	pathCase: () => pathCase,
	pascalSnakeCase: () => pascalSnakeCase,
	pascalCase: () => pascalCase,
	paramCase: () => paramCase,
	noCase: () => noCase,
	lowercase: () => lowercase,
	kebabCase: () => kebabCase,
	extendCharMap: () => extendCharMap,
	ensureSuffix: () => ensureSuffix,
	ensurePrefix: () => ensurePrefix,
	dotCase: () => dotCase,
	detectNewlineGraceful: () => detectNewlineGraceful,
	detectNewline: () => detectNewline,
	detectIndent: () => detectIndent,
	constantCase: () => constantCase,
	capitalize: () => capitalize,
	capitalCase: () => capitalCase,
	camelCase: () => camelCase,
	WORD_SEPARATORS: () => WORD_SEPARATORS,
	TITLE_TERMINATORS: () => TITLE_TERMINATORS,
	Str: () => Str,
	SMALL_WORDS: () => SMALL_WORDS,
	SENTENCE_TERMINATORS: () => SENTENCE_TERMINATORS
});
function spongeCase(input, locale) {
	let result = "";
	for (let char of input) result += Math.random() > .5 ? char.toLocaleUpperCase(locale) : char.toLocaleLowerCase(locale);
	return result;
}
function swapCase(input, locale) {
	let result = "";
	for (let char of input) {
		let lower = char.toLocaleLowerCase(locale);
		result += char === lower ? char.toLocaleUpperCase(locale) : lower;
	}
	return result;
}
var TOKENS = /(\S+)|(.)/g, IS_SPECIAL_CASE = /[.#][\p{L}\p{N}]/u, IS_MANUAL_CASE = /\p{Ll}(?=\p{Lu})/u, ALPHANUMERIC_PATTERN = /[\p{L}\p{N}]+/gu, IS_ACRONYM = /^(\P{L})*(?:\p{L}\.){2,}(\P{L})*$/u, WORD_SEPARATORS = new Set([
	"—",
	"–",
	"-",
	"―",
	"/"
]), SENTENCE_TERMINATORS = new Set([
	".",
	"!",
	"?"
]), TITLE_TERMINATORS = new Set([
	...SENTENCE_TERMINATORS,
	":",
	"\"",
	"'",
	"”"
]), SMALL_WORDS = new Set("a.an.and.as.at.because.but.by.en.for.if.in.neither.nor.of.on.only.or.over.per.so.some.than.that.the.to.up.upon.v.versus.via.vs.when.with.without.yet".split("."));
function titleCase(input, options = {}) {
	let { locale = void 0, sentenceCase: sentenceCase$1 = !1, sentenceTerminators = SENTENCE_TERMINATORS, titleTerminators = TITLE_TERMINATORS, smallWords = SMALL_WORDS, wordSeparators = WORD_SEPARATORS } = typeof options == "string" || Array.isArray(options) ? { locale: options } : options, terminators = sentenceCase$1 ? sentenceTerminators : titleTerminators, result = "", isNewSentence = !0;
	for (let m$1 of input.matchAll(TOKENS)) {
		let { 1: token, 2: whiteSpace, index = 0 } = m$1;
		if (whiteSpace) {
			result += whiteSpace;
			continue;
		}
		if (IS_SPECIAL_CASE.test(token)) {
			let acronym = token.match(IS_ACRONYM);
			if (acronym) {
				let [_, prefix = "", suffix = ""] = acronym;
				result += sentenceCase$1 && !isNewSentence ? token : upperAt(token, prefix.length, locale), isNewSentence = terminators.has(suffix.charAt(0));
				continue;
			}
			result += token, isNewSentence = terminators.has(token.charAt(token.length - 1));
		} else {
			let matches = Array.from(token.matchAll(ALPHANUMERIC_PATTERN)), value = token, isSentenceEnd = !1;
			for (let i = 0; i < matches.length; i++) {
				let { 0: word, index: wordIndex = 0 } = matches[i], nextChar = token.charAt(wordIndex + word.length);
				if (isSentenceEnd = terminators.has(nextChar), isNewSentence) isNewSentence = !1;
				else if (sentenceCase$1 || IS_MANUAL_CASE.test(word)) continue;
				else if (matches.length === 1) {
					if (smallWords.has(word)) {
						let isFinalToken = index + token.length === input.length;
						if (!isFinalToken && !isSentenceEnd) continue;
					}
				} else if (i > 0 && (!wordSeparators.has(token.charAt(wordIndex - 1)) || smallWords.has(word) && wordSeparators.has(nextChar))) continue;
				value = upperAt(value, wordIndex, locale);
			}
			result += value, isNewSentence = isSentenceEnd || terminators.has(token.charAt(token.length - 1));
		}
	}
	return result;
}
function upperAt(input, index, locale) {
	return input.slice(0, index) + input.charAt(index).toLocaleUpperCase(locale) + input.slice(index + 1);
}
function capitalize(str$1) {
	return str$1[0] ? str$1[0].toUpperCase() + str$1.slice(1).toLowerCase() : "";
}
function lowercase(str$1) {
	return str$1.toLowerCase();
}
var SPLIT_LOWER_UPPER_RE = /([\p{Ll}\d])(\p{Lu})/gu, SPLIT_UPPER_UPPER_RE = /(\p{Lu})(\p{Lu}\p{Ll})/gu, SPLIT_SEPARATE_NUMBER_RE = /(\d)\p{Ll}|(\p{L})\d/u, DEFAULT_STRIP_REGEXP = /[^\p{L}\d]+/giu, SPLIT_REPLACE_VALUE = "$1\0$2", DEFAULT_PREFIX_SUFFIX_CHARACTERS = "";
function split(value) {
	let result = value.trim();
	result = result.replace(SPLIT_LOWER_UPPER_RE, SPLIT_REPLACE_VALUE).replace(SPLIT_UPPER_UPPER_RE, SPLIT_REPLACE_VALUE), result = result.replace(DEFAULT_STRIP_REGEXP, "\0");
	let start = 0, end = result.length;
	for (; result.charAt(start) === "\0";) start++;
	if (start === end) return [];
	for (; result.charAt(end - 1) === "\0";) end--;
	return result.slice(start, end).split(/\0/g);
}
function splitSeparateNumbers(value) {
	let words = split(value);
	for (let i = 0; i < words.length; i++) {
		let word = words[i], match = SPLIT_SEPARATE_NUMBER_RE.exec(word);
		if (match) {
			let offset = match.index + (match[1] ?? match[2]).length;
			words.splice(i, 1, word.slice(0, offset), word.slice(offset));
		}
	}
	return words;
}
function noCase(input, options) {
	let [prefix, words, suffix] = splitPrefixSuffix(input, options);
	return prefix + words.map(lowerFactory(options?.locale)).join(options?.delimiter ?? " ") + suffix;
}
function camelCase(input, options) {
	let [prefix, words, suffix] = splitPrefixSuffix(input, options), lower = lowerFactory(options?.locale), upper = upperFactory(options?.locale), transform = options?.mergeAmbiguousCharacters ? capitalCaseTransformFactory(lower, upper) : pascalCaseTransformFactory(lower, upper);
	return prefix + words.map((word, index) => index === 0 ? lower(word) : transform(word, index)).join(options?.delimiter ?? "") + suffix;
}
function pascalCase(input, options) {
	let [prefix, words, suffix] = splitPrefixSuffix(input, options), lower = lowerFactory(options?.locale), upper = upperFactory(options?.locale), transform = options?.mergeAmbiguousCharacters ? capitalCaseTransformFactory(lower, upper) : pascalCaseTransformFactory(lower, upper);
	return prefix + words.map(transform).join(options?.delimiter ?? "") + suffix;
}
function pascalSnakeCase(input, options) {
	return capitalCase(input, {
		delimiter: "_",
		...options
	});
}
function capitalCase(input, options) {
	let [prefix, words, suffix] = splitPrefixSuffix(input, options), lower = lowerFactory(options?.locale), upper = upperFactory(options?.locale);
	return prefix + words.map(capitalCaseTransformFactory(lower, upper)).join(options?.delimiter ?? " ") + suffix;
}
function constantCase(input, options) {
	let [prefix, words, suffix] = splitPrefixSuffix(input, options);
	return prefix + words.map(upperFactory(options?.locale)).join(options?.delimiter ?? "_") + suffix;
}
function dotCase(input, options) {
	return noCase(input, {
		delimiter: ".",
		...options
	});
}
function kebabCase(input, options) {
	return noCase(input, {
		delimiter: "-",
		...options
	});
}
function pathCase(input, options) {
	return noCase(input, {
		delimiter: "/",
		...options
	});
}
function sentenceCase(input, options) {
	let [prefix, words, suffix] = splitPrefixSuffix(input, options), lower = lowerFactory(options?.locale), upper = upperFactory(options?.locale), transform = capitalCaseTransformFactory(lower, upper);
	return prefix + words.map((word, index) => index === 0 ? transform(word) : lower(word)).join(options?.delimiter ?? " ") + suffix;
}
function snakeCase(input, options) {
	return noCase(input, {
		delimiter: "_",
		...options
	});
}
function trainCase(input, options) {
	return capitalCase(input, {
		delimiter: "-",
		...options
	});
}
function paramCase(input, options) {
	return kebabCase(input, options);
}
function lowerFactory(locale) {
	return locale === !1 ? (input) => input.toLowerCase() : (input) => input.toLocaleLowerCase(locale);
}
function upperFactory(locale) {
	return locale === !1 ? (input) => input.toUpperCase() : (input) => input.toLocaleUpperCase(locale);
}
function capitalCaseTransformFactory(lower, upper) {
	return (word) => `${upper(word[0])}${lower(word.slice(1))}`;
}
function pascalCaseTransformFactory(lower, upper) {
	return (word, index) => {
		let char0 = word[0], initial = index > 0 && char0 >= "0" && char0 <= "9" ? `_${char0}` : upper(char0);
		return initial + lower(word.slice(1));
	};
}
function splitPrefixSuffix(input, options = {}) {
	let splitFn = options.split ?? split, prefixCharacters = options.prefixCharacters ?? DEFAULT_PREFIX_SUFFIX_CHARACTERS, suffixCharacters = options.suffixCharacters ?? DEFAULT_PREFIX_SUFFIX_CHARACTERS, prefixIndex = 0, suffixIndex = input.length;
	for (; prefixIndex < input.length;) {
		let char = input.charAt(prefixIndex);
		if (!prefixCharacters.includes(char)) break;
		prefixIndex++;
	}
	for (; suffixIndex > prefixIndex;) {
		let index = suffixIndex - 1, char = input.charAt(index);
		if (!suffixCharacters.includes(char)) break;
		suffixIndex = index;
	}
	return [
		input.slice(0, prefixIndex),
		splitFn(input.slice(prefixIndex, suffixIndex)),
		input.slice(suffixIndex)
	];
}
function toString(v$1) {
	return Object.prototype.toString.call(v$1);
}
var pluralRules = [], singularRules = [], uncountables = {}, irregularPlurals = {}, irregularSingles = {};
function sanitizeRule(rule) {
	return typeof rule == "string" ? RegExp(`^${rule}$`, "i") : rule;
}
function restoreCase(word, token) {
	return word === token ? token : word === word.toLowerCase() ? token.toLowerCase() : word === word.toUpperCase() ? token.toUpperCase() : word[0] === word[0].toUpperCase() ? token.charAt(0).toUpperCase() + token.slice(1).toLowerCase() : token.toLowerCase();
}
function interpolate(str$1, ...args) {
	return str$1.replace(/\$(\d{1,2})/g, (match, index) => args[Number(index)] || "");
}
function replace(word, rule) {
	return word.replace(rule[0], (...matchArgs) => {
		let result = interpolate(rule[1], ...matchArgs);
		return matchArgs[0] === "" ? restoreCase(word[matchArgs[matchArgs.length - 2] - 1], result) : restoreCase(matchArgs[0], result);
	});
}
function sanitizeWord(token, word, rules) {
	if (!token.length || uncountables[token]) return word;
	for (let i = rules.length - 1; i >= 0; i--) {
		let rule = rules[i];
		if (rule[0].test(word)) return replace(word, rule);
	}
	return word;
}
function replaceWord(replaceMap, keepMap, rules) {
	return (word) => {
		let token = word.toLowerCase();
		return keepMap[token] ? restoreCase(word, token) : replaceMap[token] ? restoreCase(word, replaceMap[token]) : sanitizeWord(token, word, rules);
	};
}
function checkWord(replaceMap, keepMap, rules) {
	return (word) => {
		let token = word.toLowerCase();
		return keepMap[token] ? !0 : replaceMap[token] ? !1 : sanitizeWord(token, token, rules) === token;
	};
}
var pluralize = (word, options = {}) => {
	let { count = 2, inclusive = !1 } = options;
	if (typeof word != "string") throw TypeError("Word must be a string");
	let pluralized = count === 1 ? pluralize.singular(word) : pluralize.plural(word);
	return inclusive ? `${count} ${pluralized}` : pluralized;
}, singular = (word) => pluralize.singular(word), plural = (word, count = 2) => pluralize(word, { count });
pluralize.plural = replaceWord(irregularSingles, irregularPlurals, pluralRules), pluralize.isPlural = checkWord(irregularSingles, irregularPlurals, pluralRules), pluralize.singular = replaceWord(irregularPlurals, irregularSingles, singularRules), pluralize.isSingular = checkWord(irregularPlurals, irregularSingles, singularRules), pluralize.addPluralRule = (rule, replacement) => {
	pluralRules.push([sanitizeRule(rule), replacement]);
}, pluralize.addSingularRule = (rule, replacement) => {
	singularRules.push([sanitizeRule(rule), replacement]);
}, pluralize.addUncountableRule = (word) => {
	if (typeof word == "string") {
		uncountables[word.toLowerCase()] = !0;
		return;
	}
	pluralize.addPluralRule(word, "$0"), pluralize.addSingularRule(word, "$0");
}, pluralize.addIrregularRule = (single, plural2) => {
	let lowerPlural = plural2.toLowerCase(), lowerSingle = single.toLowerCase();
	irregularSingles[lowerSingle] = lowerPlural, irregularPlurals[lowerPlural] = lowerSingle;
}, [
	["I", "we"],
	["me", "us"],
	["he", "they"],
	["she", "they"],
	["them", "them"],
	["myself", "ourselves"],
	["yourself", "yourselves"],
	["itself", "themselves"],
	["herself", "themselves"],
	["himself", "themselves"],
	["themself", "themselves"],
	["is", "are"],
	["was", "were"],
	["has", "have"],
	["this", "these"],
	["that", "those"],
	["my", "our"],
	["its", "their"],
	["his", "their"],
	["her", "their"],
	["echo", "echoes"],
	["dingo", "dingoes"],
	["volcano", "volcanoes"],
	["tornado", "tornadoes"],
	["torpedo", "torpedoes"],
	["genus", "genera"],
	["viscus", "viscera"],
	["stigma", "stigmata"],
	["stoma", "stomata"],
	["dogma", "dogmata"],
	["lemma", "lemmata"],
	["schema", "schemata"],
	["anathema", "anathemata"],
	["ox", "oxen"],
	["axe", "axes"],
	["die", "dice"],
	["yes", "yeses"],
	["foot", "feet"],
	["eave", "eaves"],
	["goose", "geese"],
	["tooth", "teeth"],
	["quiz", "quizzes"],
	["human", "humans"],
	["proof", "proofs"],
	["carve", "carves"],
	["valve", "valves"],
	["looey", "looies"],
	["thief", "thieves"],
	["groove", "grooves"],
	["pickaxe", "pickaxes"],
	["passerby", "passersby"],
	["canvas", "canvases"]
].forEach(([single, plural2]) => pluralize.addIrregularRule(single, plural2)), [
	[/s?$/i, "s"],
	[/[^\x20-\x7F]$/, "$0"],
	[/([^aeiou]ese)$/i, "$1"],
	[/(ax|test)is$/i, "$1es"],
	[/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
	[/(e[mn]u)s?$/i, "$1s"],
	[/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
	[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
	[/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
	[/(seraph|cherub)(?:im)?$/i, "$1im"],
	[/(her|at|gr)o$/i, "$1oes"],
	[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
	[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
	[/sis$/i, "ses"],
	[/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
	[/([^aeiouy]|qu)y$/i, "$1ies"],
	[/([^ch][ieo][ln])ey$/i, "$1ies"],
	[/(x|ch|ss|sh|zz)$/i, "$1es"],
	[/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
	[/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
	[/(pe)(?:rson|ople)$/i, "$1ople"],
	[/(child)(?:ren)?$/i, "$1ren"],
	[/eaux$/i, "$0"],
	[/m[ae]n$/i, "men"],
	["thou", "you"]
].forEach(([rule, replacement]) => pluralize.addPluralRule(rule, replacement)), [
	[/s$/i, ""],
	[/(ss)$/i, "$1"],
	[/(wi|kni|(?:after|half|high|low|mid|non|night|\W|^)li)ves$/i, "$1fe"],
	[/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
	[/ies$/i, "y"],
	[/(dg|ss|ois|lk|ok|wn|mb|th|ch|ec|oal|is|ck|ix|sser|ts|wb)ies$/i, "$1ie"],
	[/\b(l|(?:neck|cross|hog|aun)?t|coll|faer|food|gen|goon|group|hipp|junk|vegg|(?:pork)?p|charl|calor|cut)ies$/i, "$1ie"],
	[/\b(mon|smil)ies$/i, "$1ey"],
	[/\b((?:tit)?m|l)ice$/i, "$1ouse"],
	[/(seraph|cherub)im$/i, "$1"],
	[/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
	[/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
	[/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
	[/(test)(?:is|es)$/i, "$1is"],
	[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
	[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
	[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
	[/(alumn|alg|vertebr)ae$/i, "$1a"],
	[/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
	[/(matr|append)ices$/i, "$1ix"],
	[/(pe)(rson|ople)$/i, "$1rson"],
	[/(child)ren$/i, "$1"],
	[/(eau)x?$/i, "$1"],
	[/men$/i, "man"]
].forEach(([rule, replacement]) => pluralize.addSingularRule(rule, replacement)), [
	"adulthood",
	"advice",
	"agenda",
	"aid",
	"aircraft",
	"alcohol",
	"ammo",
	"analytics",
	"anime",
	"athletics",
	"audio",
	"bison",
	"blood",
	"bream",
	"buffalo",
	"butter",
	"carp",
	"cash",
	"chassis",
	"chess",
	"clothing",
	"cod",
	"commerce",
	"cooperation",
	"corps",
	"debris",
	"diabetes",
	"digestion",
	"elk",
	"energy",
	"equipment",
	"excretion",
	"expertise",
	"firmware",
	"flounder",
	"fun",
	"gallows",
	"garbage",
	"graffiti",
	"hardware",
	"headquarters",
	"health",
	"herpes",
	"highjinks",
	"homework",
	"housework",
	"information",
	"jeans",
	"justice",
	"kudos",
	"labour",
	"literature",
	"machinery",
	"mackerel",
	"mail",
	"media",
	"mews",
	"moose",
	"music",
	"mud",
	"manga",
	"news",
	"only",
	"personnel",
	"pike",
	"plankton",
	"pliers",
	"police",
	"pollution",
	"premises",
	"rain",
	"research",
	"rice",
	"salmon",
	"scissors",
	"series",
	"sewage",
	"shambles",
	"shrimp",
	"software",
	"staff",
	"swine",
	"tennis",
	"traffic",
	"transportation",
	"trout",
	"tuna",
	"wealth",
	"welfare",
	"whiting",
	"wildebeest",
	"wildlife",
	"you",
	/pok[e\u00E9]mon$/i,
	/[^aeiou]ese$/i,
	/deer$/i,
	/fish$/i,
	/measles$/i,
	/o[iu]s$/i,
	/pox$/i,
	/sheep$/i
].forEach(pluralize.addUncountableRule);
var pluralize_default = pluralize, charMap = JSON.parse("{\"$\":\"dollar\",\"%\":\"percent\",\"&\":\"and\",\"<\":\"less\",\">\":\"greater\",\"|\":\"or\",\"¢\":\"cent\",\"£\":\"pound\",\"¤\":\"currency\",\"¥\":\"yen\",\"©\":\"(c)\",\"ª\":\"a\",\"®\":\"(r)\",\"º\":\"o\",\"À\":\"A\",\"Á\":\"A\",\"Â\":\"A\",\"Ã\":\"A\",\"Ä\":\"A\",\"Å\":\"A\",\"Æ\":\"AE\",\"Ç\":\"C\",\"È\":\"E\",\"É\":\"E\",\"Ê\":\"E\",\"Ë\":\"E\",\"Ì\":\"I\",\"Í\":\"I\",\"Î\":\"I\",\"Ï\":\"I\",\"Ð\":\"D\",\"Ñ\":\"N\",\"Ò\":\"O\",\"Ó\":\"O\",\"Ô\":\"O\",\"Õ\":\"O\",\"Ö\":\"O\",\"Ø\":\"O\",\"Ù\":\"U\",\"Ú\":\"U\",\"Û\":\"U\",\"Ü\":\"U\",\"Ý\":\"Y\",\"Þ\":\"TH\",\"ß\":\"ss\",\"à\":\"a\",\"á\":\"a\",\"â\":\"a\",\"ã\":\"a\",\"ä\":\"a\",\"å\":\"a\",\"æ\":\"ae\",\"ç\":\"c\",\"è\":\"e\",\"é\":\"e\",\"ê\":\"e\",\"ë\":\"e\",\"ì\":\"i\",\"í\":\"i\",\"î\":\"i\",\"ï\":\"i\",\"ð\":\"d\",\"ñ\":\"n\",\"ò\":\"o\",\"ó\":\"o\",\"ô\":\"o\",\"õ\":\"o\",\"ö\":\"o\",\"ø\":\"o\",\"ù\":\"u\",\"ú\":\"u\",\"û\":\"u\",\"ü\":\"u\",\"ý\":\"y\",\"þ\":\"th\",\"ÿ\":\"y\",\"Ā\":\"A\",\"ā\":\"a\",\"Ă\":\"A\",\"ă\":\"a\",\"Ą\":\"A\",\"ą\":\"a\",\"Ć\":\"C\",\"ć\":\"c\",\"Č\":\"C\",\"č\":\"c\",\"Ď\":\"D\",\"ď\":\"d\",\"Đ\":\"DJ\",\"đ\":\"dj\",\"Ē\":\"E\",\"ē\":\"e\",\"Ė\":\"E\",\"ė\":\"e\",\"Ę\":\"e\",\"ę\":\"e\",\"Ě\":\"E\",\"ě\":\"e\",\"Ğ\":\"G\",\"ğ\":\"g\",\"Ģ\":\"G\",\"ģ\":\"g\",\"Ĩ\":\"I\",\"ĩ\":\"i\",\"Ī\":\"i\",\"ī\":\"i\",\"Į\":\"I\",\"į\":\"i\",\"İ\":\"I\",\"ı\":\"i\",\"Ķ\":\"k\",\"ķ\":\"k\",\"Ļ\":\"L\",\"ļ\":\"l\",\"Ľ\":\"L\",\"ľ\":\"l\",\"Ł\":\"L\",\"ł\":\"l\",\"Ń\":\"N\",\"ń\":\"n\",\"Ņ\":\"N\",\"ņ\":\"n\",\"Ň\":\"N\",\"ň\":\"n\",\"Ō\":\"O\",\"ō\":\"o\",\"Ő\":\"O\",\"ő\":\"o\",\"Œ\":\"OE\",\"œ\":\"oe\",\"Ŕ\":\"R\",\"ŕ\":\"r\",\"Ř\":\"R\",\"ř\":\"r\",\"Ś\":\"S\",\"ś\":\"s\",\"Ş\":\"S\",\"ş\":\"s\",\"Š\":\"S\",\"š\":\"s\",\"Ţ\":\"T\",\"ţ\":\"t\",\"Ť\":\"T\",\"ť\":\"t\",\"Ũ\":\"U\",\"ũ\":\"u\",\"Ū\":\"u\",\"ū\":\"u\",\"Ů\":\"U\",\"ů\":\"u\",\"Ű\":\"U\",\"ű\":\"u\",\"Ų\":\"U\",\"ų\":\"u\",\"Ŵ\":\"W\",\"ŵ\":\"w\",\"Ŷ\":\"Y\",\"ŷ\":\"y\",\"Ÿ\":\"Y\",\"Ź\":\"Z\",\"ź\":\"z\",\"Ż\":\"Z\",\"ż\":\"z\",\"Ž\":\"Z\",\"ž\":\"z\",\"Ə\":\"E\",\"ƒ\":\"f\",\"Ơ\":\"O\",\"ơ\":\"o\",\"Ư\":\"U\",\"ư\":\"u\",\"ǈ\":\"LJ\",\"ǉ\":\"lj\",\"ǋ\":\"NJ\",\"ǌ\":\"nj\",\"Ș\":\"S\",\"ș\":\"s\",\"Ț\":\"T\",\"ț\":\"t\",\"ə\":\"e\",\"˚\":\"o\",\"Ά\":\"A\",\"Έ\":\"E\",\"Ή\":\"H\",\"Ί\":\"I\",\"Ό\":\"O\",\"Ύ\":\"Y\",\"Ώ\":\"W\",\"ΐ\":\"i\",\"Α\":\"A\",\"Β\":\"B\",\"Γ\":\"G\",\"Δ\":\"D\",\"Ε\":\"E\",\"Ζ\":\"Z\",\"Η\":\"H\",\"Θ\":\"8\",\"Ι\":\"I\",\"Κ\":\"K\",\"Λ\":\"L\",\"Μ\":\"M\",\"Ν\":\"N\",\"Ξ\":\"3\",\"Ο\":\"O\",\"Π\":\"P\",\"Ρ\":\"R\",\"Σ\":\"S\",\"Τ\":\"T\",\"Υ\":\"Y\",\"Φ\":\"F\",\"Χ\":\"X\",\"Ψ\":\"PS\",\"Ω\":\"W\",\"Ϊ\":\"I\",\"Ϋ\":\"Y\",\"ά\":\"a\",\"έ\":\"e\",\"ή\":\"h\",\"ί\":\"i\",\"ΰ\":\"y\",\"α\":\"a\",\"β\":\"b\",\"γ\":\"g\",\"δ\":\"d\",\"ε\":\"e\",\"ζ\":\"z\",\"η\":\"h\",\"θ\":\"8\",\"ι\":\"i\",\"κ\":\"k\",\"λ\":\"l\",\"μ\":\"m\",\"ν\":\"n\",\"ξ\":\"3\",\"ο\":\"o\",\"π\":\"p\",\"ρ\":\"r\",\"ς\":\"s\",\"σ\":\"s\",\"τ\":\"t\",\"υ\":\"y\",\"φ\":\"f\",\"χ\":\"x\",\"ψ\":\"ps\",\"ω\":\"w\",\"ϊ\":\"i\",\"ϋ\":\"y\",\"ό\":\"o\",\"ύ\":\"y\",\"ώ\":\"w\",\"Ё\":\"Yo\",\"Ђ\":\"DJ\",\"Є\":\"Ye\",\"І\":\"I\",\"Ї\":\"Yi\",\"Ј\":\"J\",\"Љ\":\"LJ\",\"Њ\":\"NJ\",\"Ћ\":\"C\",\"Џ\":\"DZ\",\"А\":\"A\",\"Б\":\"B\",\"В\":\"V\",\"Г\":\"G\",\"Д\":\"D\",\"Е\":\"E\",\"Ж\":\"Zh\",\"З\":\"Z\",\"И\":\"I\",\"Й\":\"J\",\"К\":\"K\",\"Л\":\"L\",\"М\":\"M\",\"Н\":\"N\",\"О\":\"O\",\"П\":\"P\",\"Р\":\"R\",\"С\":\"S\",\"Т\":\"T\",\"У\":\"U\",\"Ф\":\"F\",\"Х\":\"H\",\"Ц\":\"C\",\"Ч\":\"Ch\",\"Ш\":\"Sh\",\"Щ\":\"Sh\",\"Ъ\":\"U\",\"Ы\":\"Y\",\"Ь\":\"\",\"Э\":\"E\",\"Ю\":\"Yu\",\"Я\":\"Ya\",\"а\":\"a\",\"б\":\"b\",\"в\":\"v\",\"г\":\"g\",\"д\":\"d\",\"е\":\"e\",\"ж\":\"zh\",\"з\":\"z\",\"и\":\"i\",\"й\":\"j\",\"к\":\"k\",\"л\":\"l\",\"м\":\"m\",\"н\":\"n\",\"о\":\"o\",\"п\":\"p\",\"р\":\"r\",\"с\":\"s\",\"т\":\"t\",\"у\":\"u\",\"ф\":\"f\",\"х\":\"h\",\"ц\":\"c\",\"ч\":\"ch\",\"ш\":\"sh\",\"щ\":\"sh\",\"ъ\":\"u\",\"ы\":\"y\",\"ь\":\"\",\"э\":\"e\",\"ю\":\"yu\",\"я\":\"ya\",\"ё\":\"yo\",\"ђ\":\"dj\",\"є\":\"ye\",\"і\":\"i\",\"ї\":\"yi\",\"ј\":\"j\",\"љ\":\"lj\",\"њ\":\"nj\",\"ћ\":\"c\",\"ѝ\":\"u\",\"џ\":\"dz\",\"Ґ\":\"G\",\"ґ\":\"g\",\"Ғ\":\"GH\",\"ғ\":\"gh\",\"Қ\":\"KH\",\"қ\":\"kh\",\"Ң\":\"NG\",\"ң\":\"ng\",\"Ү\":\"UE\",\"ү\":\"ue\",\"Ұ\":\"U\",\"ұ\":\"u\",\"Һ\":\"H\",\"һ\":\"h\",\"Ә\":\"AE\",\"ә\":\"ae\",\"Ө\":\"OE\",\"ө\":\"oe\",\"Ա\":\"A\",\"Բ\":\"B\",\"Գ\":\"G\",\"Դ\":\"D\",\"Ե\":\"E\",\"Զ\":\"Z\",\"Է\":\"E'\",\"Ը\":\"Y'\",\"Թ\":\"T'\",\"Ժ\":\"JH\",\"Ի\":\"I\",\"Լ\":\"L\",\"Խ\":\"X\",\"Ծ\":\"C'\",\"Կ\":\"K\",\"Հ\":\"H\",\"Ձ\":\"D'\",\"Ղ\":\"GH\",\"Ճ\":\"TW\",\"Մ\":\"M\",\"Յ\":\"Y\",\"Ն\":\"N\",\"Շ\":\"SH\",\"Չ\":\"CH\",\"Պ\":\"P\",\"Ջ\":\"J\",\"Ռ\":\"R'\",\"Ս\":\"S\",\"Վ\":\"V\",\"Տ\":\"T\",\"Ր\":\"R\",\"Ց\":\"C\",\"Փ\":\"P'\",\"Ք\":\"Q'\",\"Օ\":\"O''\",\"Ֆ\":\"F\",\"և\":\"EV\",\"ء\":\"a\",\"آ\":\"aa\",\"أ\":\"a\",\"ؤ\":\"u\",\"إ\":\"i\",\"ئ\":\"e\",\"ا\":\"a\",\"ب\":\"b\",\"ة\":\"h\",\"ت\":\"t\",\"ث\":\"th\",\"ج\":\"j\",\"ح\":\"h\",\"خ\":\"kh\",\"د\":\"d\",\"ذ\":\"th\",\"ر\":\"r\",\"ز\":\"z\",\"س\":\"s\",\"ش\":\"sh\",\"ص\":\"s\",\"ض\":\"dh\",\"ط\":\"t\",\"ظ\":\"z\",\"ع\":\"a\",\"غ\":\"gh\",\"ف\":\"f\",\"ق\":\"q\",\"ك\":\"k\",\"ل\":\"l\",\"م\":\"m\",\"ن\":\"n\",\"ه\":\"h\",\"و\":\"w\",\"ى\":\"a\",\"ي\":\"y\",\"ً\":\"an\",\"ٌ\":\"on\",\"ٍ\":\"en\",\"َ\":\"a\",\"ُ\":\"u\",\"ِ\":\"e\",\"ْ\":\"\",\"٠\":\"0\",\"١\":\"1\",\"٢\":\"2\",\"٣\":\"3\",\"٤\":\"4\",\"٥\":\"5\",\"٦\":\"6\",\"٧\":\"7\",\"٨\":\"8\",\"٩\":\"9\",\"پ\":\"p\",\"چ\":\"ch\",\"ژ\":\"zh\",\"ک\":\"k\",\"گ\":\"g\",\"ی\":\"y\",\"۰\":\"0\",\"۱\":\"1\",\"۲\":\"2\",\"۳\":\"3\",\"۴\":\"4\",\"۵\":\"5\",\"۶\":\"6\",\"۷\":\"7\",\"۸\":\"8\",\"۹\":\"9\",\"฿\":\"baht\",\"ა\":\"a\",\"ბ\":\"b\",\"გ\":\"g\",\"დ\":\"d\",\"ე\":\"e\",\"ვ\":\"v\",\"ზ\":\"z\",\"თ\":\"t\",\"ი\":\"i\",\"კ\":\"k\",\"ლ\":\"l\",\"მ\":\"m\",\"ნ\":\"n\",\"ო\":\"o\",\"პ\":\"p\",\"ჟ\":\"zh\",\"რ\":\"r\",\"ს\":\"s\",\"ტ\":\"t\",\"უ\":\"u\",\"ფ\":\"f\",\"ქ\":\"k\",\"ღ\":\"gh\",\"ყ\":\"q\",\"შ\":\"sh\",\"ჩ\":\"ch\",\"ც\":\"ts\",\"ძ\":\"dz\",\"წ\":\"ts\",\"ჭ\":\"ch\",\"ხ\":\"kh\",\"ჯ\":\"j\",\"ჰ\":\"h\",\"Ṣ\":\"S\",\"ṣ\":\"s\",\"Ẁ\":\"W\",\"ẁ\":\"w\",\"Ẃ\":\"W\",\"ẃ\":\"w\",\"Ẅ\":\"W\",\"ẅ\":\"w\",\"ẞ\":\"SS\",\"Ạ\":\"A\",\"ạ\":\"a\",\"Ả\":\"A\",\"ả\":\"a\",\"Ấ\":\"A\",\"ấ\":\"a\",\"Ầ\":\"A\",\"ầ\":\"a\",\"Ẩ\":\"A\",\"ẩ\":\"a\",\"Ẫ\":\"A\",\"ẫ\":\"a\",\"Ậ\":\"A\",\"ậ\":\"a\",\"Ắ\":\"A\",\"ắ\":\"a\",\"Ằ\":\"A\",\"ằ\":\"a\",\"Ẳ\":\"A\",\"ẳ\":\"a\",\"Ẵ\":\"A\",\"ẵ\":\"a\",\"Ặ\":\"A\",\"ặ\":\"a\",\"Ẹ\":\"E\",\"ẹ\":\"e\",\"Ẻ\":\"E\",\"ẻ\":\"e\",\"Ẽ\":\"E\",\"ẽ\":\"e\",\"Ế\":\"E\",\"ế\":\"e\",\"Ề\":\"E\",\"ề\":\"e\",\"Ể\":\"E\",\"ể\":\"e\",\"Ễ\":\"E\",\"ễ\":\"e\",\"Ệ\":\"E\",\"ệ\":\"e\",\"Ỉ\":\"I\",\"ỉ\":\"i\",\"Ị\":\"I\",\"ị\":\"i\",\"Ọ\":\"O\",\"ọ\":\"o\",\"Ỏ\":\"O\",\"ỏ\":\"o\",\"Ố\":\"O\",\"ố\":\"o\",\"Ồ\":\"O\",\"ồ\":\"o\",\"Ổ\":\"O\",\"ổ\":\"o\",\"Ỗ\":\"O\",\"ỗ\":\"o\",\"Ộ\":\"O\",\"ộ\":\"o\",\"Ớ\":\"O\",\"ớ\":\"o\",\"Ờ\":\"O\",\"ờ\":\"o\",\"Ở\":\"O\",\"ở\":\"o\",\"Ỡ\":\"O\",\"ỡ\":\"o\",\"Ợ\":\"O\",\"ợ\":\"o\",\"Ụ\":\"U\",\"ụ\":\"u\",\"Ủ\":\"U\",\"ủ\":\"u\",\"Ứ\":\"U\",\"ứ\":\"u\",\"Ừ\":\"U\",\"ừ\":\"u\",\"Ử\":\"U\",\"ử\":\"u\",\"Ữ\":\"U\",\"ữ\":\"u\",\"Ự\":\"U\",\"ự\":\"u\",\"Ỳ\":\"Y\",\"ỳ\":\"y\",\"Ỵ\":\"Y\",\"ỵ\":\"y\",\"Ỷ\":\"Y\",\"ỷ\":\"y\",\"Ỹ\":\"Y\",\"ỹ\":\"y\",\"–\":\"-\",\"‘\":\"'\",\"’\":\"'\",\"“\":\"\\\"\",\"”\":\"\\\"\",\"„\":\"\\\"\",\"†\":\"+\",\"•\":\"*\",\"…\":\"...\",\"₠\":\"ecu\",\"₢\":\"cruzeiro\",\"₣\":\"french franc\",\"₤\":\"lira\",\"₥\":\"mill\",\"₦\":\"naira\",\"₧\":\"peseta\",\"₨\":\"rupee\",\"₩\":\"won\",\"₪\":\"new shequel\",\"₫\":\"dong\",\"€\":\"euro\",\"₭\":\"kip\",\"₮\":\"tugrik\",\"₯\":\"drachma\",\"₰\":\"penny\",\"₱\":\"peso\",\"₲\":\"guarani\",\"₳\":\"austral\",\"₴\":\"hryvnia\",\"₵\":\"cedi\",\"₸\":\"kazakhstani tenge\",\"₹\":\"indian rupee\",\"₺\":\"turkish lira\",\"₽\":\"russian ruble\",\"₿\":\"bitcoin\",\"℠\":\"sm\",\"™\":\"tm\",\"∂\":\"d\",\"∆\":\"delta\",\"∑\":\"sum\",\"∞\":\"infinity\",\"♥\":\"love\",\"元\":\"yuan\",\"円\":\"yen\",\"﷼\":\"rial\",\"ﻵ\":\"laa\",\"ﻷ\":\"laa\",\"ﻹ\":\"lai\",\"ﻻ\":\"la\"}"), locales = JSON.parse("{\"bg\":{\"Й\":\"Y\",\"Ц\":\"Ts\",\"Щ\":\"Sht\",\"Ъ\":\"A\",\"Ь\":\"Y\",\"й\":\"y\",\"ц\":\"ts\",\"щ\":\"sht\",\"ъ\":\"a\",\"ь\":\"y\"},\"de\":{\"Ä\":\"AE\",\"ä\":\"ae\",\"Ö\":\"OE\",\"ö\":\"oe\",\"Ü\":\"UE\",\"ü\":\"ue\",\"ß\":\"ss\",\"%\":\"prozent\",\"&\":\"und\",\"|\":\"oder\",\"∑\":\"summe\",\"∞\":\"unendlich\",\"♥\":\"liebe\"},\"es\":{\"%\":\"por ciento\",\"&\":\"y\",\"<\":\"menor que\",\">\":\"mayor que\",\"|\":\"o\",\"¢\":\"centavos\",\"£\":\"libras\",\"¤\":\"moneda\",\"₣\":\"francos\",\"∑\":\"suma\",\"∞\":\"infinito\",\"♥\":\"amor\"},\"fr\":{\"%\":\"pourcent\",\"&\":\"et\",\"<\":\"plus petit\",\">\":\"plus grand\",\"|\":\"ou\",\"¢\":\"centime\",\"£\":\"livre\",\"¤\":\"devise\",\"₣\":\"franc\",\"∑\":\"somme\",\"∞\":\"infini\",\"♥\":\"amour\"},\"pt\":{\"%\":\"porcento\",\"&\":\"e\",\"<\":\"menor\",\">\":\"maior\",\"|\":\"ou\",\"¢\":\"centavo\",\"∑\":\"soma\",\"£\":\"libra\",\"∞\":\"infinito\",\"♥\":\"amor\"},\"uk\":{\"И\":\"Y\",\"и\":\"y\",\"Й\":\"Y\",\"й\":\"y\",\"Ц\":\"Ts\",\"ц\":\"ts\",\"Х\":\"Kh\",\"х\":\"kh\",\"Щ\":\"Shch\",\"щ\":\"shch\",\"Г\":\"H\",\"г\":\"h\"},\"vi\":{\"Đ\":\"D\",\"đ\":\"d\"},\"da\":{\"Ø\":\"OE\",\"ø\":\"oe\",\"Å\":\"AA\",\"å\":\"aa\",\"%\":\"procent\",\"&\":\"og\",\"|\":\"eller\",\"$\":\"dollar\",\"<\":\"mindre end\",\">\":\"større end\"},\"nb\":{\"&\":\"og\",\"Å\":\"AA\",\"Æ\":\"AE\",\"Ø\":\"OE\",\"å\":\"aa\",\"æ\":\"ae\",\"ø\":\"oe\"},\"it\":{\"&\":\"e\"},\"nl\":{\"&\":\"en\"},\"sv\":{\"&\":\"och\",\"Å\":\"AA\",\"Ä\":\"AE\",\"Ö\":\"OE\",\"å\":\"aa\",\"ä\":\"ae\",\"ö\":\"oe\"}}");
function slugify(string, options = {}) {
	if (typeof string != "string") throw TypeError("slugify: string argument expected");
	let { replacement = "-", remove = /[^\w\s$*+~.()'"!\-:@]+/g, lower = !1, strict = !1, locale, trim = !0 } = options, localeMap = locale && locales[locale] || {}, slug$1 = string.normalize().split("").reduce((result, ch) => {
		let appendChar = localeMap[ch] ?? charMap[ch] ?? ch;
		return appendChar = appendChar === replacement ? " " : appendChar, result + appendChar;
	}, "").replace(remove, ""), strictSlug = strict ? slug$1.replace(/[^A-Z0-9\s]/gi, "") : slug$1, trimmedSlug = trim ? strictSlug.trim() : strictSlug, finalSlug = trimmedSlug.replace(/\s+/g, replacement);
	return lower ? finalSlug.toLowerCase() : finalSlug;
}
function extendCharMap(customMap) {
	Object.assign(charMap, customMap);
}
var INDENT_REGEX = /^(?:( )+|\t+)/, INDENT_TYPE_SPACE = "space", INDENT_TYPE_TAB = "tab";
function makeIndentsMap(string, ignoreSingleSpaces = !0) {
	let indents = /* @__PURE__ */ new Map(), previousSize = 0, previousIndentType, key;
	for (let line of string.split(/\n/g)) {
		if (!line) continue;
		let indent, indentType, use, weight, entry, matches = line.match(INDENT_REGEX);
		if (matches === null) previousSize = 0, previousIndentType = "";
		else {
			if (indent = matches[0].length, indentType = matches[1] ? INDENT_TYPE_SPACE : INDENT_TYPE_TAB, ignoreSingleSpaces && indentType === INDENT_TYPE_SPACE && indent === 1) continue;
			indentType !== previousIndentType && (previousSize = 0), previousIndentType = indentType, use = 1, weight = 0;
			let indentDifference = indent - previousSize;
			if (previousSize = indent, indentDifference === 0) use = 0, weight = 1;
			else {
				let absoluteIndentDifference = indentDifference > 0 ? indentDifference : -indentDifference;
				key = encodeIndentsKey(indentType, absoluteIndentDifference);
			}
			entry = indents.get(key), entry = entry === void 0 ? [1, 0] : [entry[0] + use, entry[1] + weight], indents.set(key, entry);
		}
	}
	return indents;
}
function encodeIndentsKey(indentType, indentAmount) {
	let typeCharacter = indentType === INDENT_TYPE_SPACE ? "s" : "t";
	return typeCharacter + String(indentAmount);
}
function decodeIndentsKey(indentsKey) {
	let keyHasTypeSpace = indentsKey[0] === "s", type = keyHasTypeSpace ? INDENT_TYPE_SPACE : INDENT_TYPE_TAB, amount = Number(indentsKey.slice(1));
	return {
		type,
		amount
	};
}
function getMostUsedKey(indents) {
	let result, maxUsed = 0, maxWeight = 0;
	for (let [key, [usedCount, weight]] of indents) (usedCount > maxUsed || usedCount === maxUsed && weight > maxWeight) && (maxUsed = usedCount, maxWeight = weight, result = key);
	return result;
}
function makeIndentString(type, amount) {
	let indentCharacter = type === INDENT_TYPE_SPACE ? " " : "	";
	return indentCharacter.repeat(amount);
}
function detectIndent(string) {
	if (typeof string != "string") throw TypeError("Expected a string");
	let indents = makeIndentsMap(string, !0);
	indents.size === 0 && (indents = makeIndentsMap(string, !1));
	let keyOfMostUsedIndent = getMostUsedKey(indents), type, amount = 0, indent = "";
	return keyOfMostUsedIndent !== void 0 && ({type, amount} = decodeIndentsKey(keyOfMostUsedIndent), indent = makeIndentString(type, amount)), {
		amount,
		type,
		indent
	};
}
function detectNewline(string) {
	if (typeof string != "string") throw TypeError("Expected a string");
	let newlines = string.match(/\r?\n/g) || [];
	if (newlines.length === 0) return;
	let crlf = newlines.filter((newline) => newline === "\r\n").length, lf = newlines.length - crlf;
	return crlf > lf ? "\r\n" : "\n";
}
function detectNewlineGraceful(string) {
	return typeof string == "string" && detectNewline(string) || "\n";
}
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
function slash(str$1) {
	return str$1.replace(/\\/g, "/");
}
function ensurePrefix(prefix, str$1) {
	return str$1.startsWith(prefix) ? str$1 : prefix + str$1;
}
function ensureSuffix(suffix, str$1) {
	return str$1.endsWith(suffix) ? str$1 : str$1 + suffix;
}
function template(str$1, ...args) {
	return str$1.replace(/\{(\d+)\}/g, (match, key) => {
		let index = Number(key);
		return Number.isNaN(index) ? match : args[index];
	});
}
function truncate(str$1, length, end = "...") {
	return str$1.length <= length ? str$1 : str$1.slice(0, length - end.length) + end;
}
function random(size = 16, dict = urlAlphabet) {
	let id = "", i = size, len = dict.length;
	for (; i--;) id += dict[Math.random() * len | 0];
	return id;
}
function slug(str$1, options) {
	return options ? slugify(str$1, options) : slugify(str$1, {
		lower: !0,
		strict: !0
	});
}
var Str = {
	slash(str$1) {
		return slash(str$1);
	},
	ensurePrefix(prefix, str$1) {
		return ensurePrefix(prefix, str$1);
	},
	ensureSuffix(suffix, str$1) {
		return ensureSuffix(suffix, str$1);
	},
	template(str$1, ...args) {
		return template(str$1, ...args);
	},
	truncate(str$1, length, end = "...") {
		return truncate(str$1, length, end);
	},
	random(length = 16, dict) {
		return random(length, dict);
	},
	capitalize(str$1) {
		return capitalize(str$1);
	},
	slug(str$1) {
		return slug(str$1);
	},
	detectIndent(str$1) {
		return detectIndent(str$1);
	},
	detectNewline(str$1) {
		return detectNewline(str$1);
	},
	camelCase(str$1) {
		return camelCase(str$1);
	},
	capitalCase(str$1) {
		return capitalCase(str$1);
	},
	constantCase(str$1) {
		return constantCase(str$1);
	},
	dotCase(str$1) {
		return dotCase(str$1);
	},
	noCase(str$1) {
		return noCase(str$1);
	},
	paramCase(str$1) {
		return paramCase(str$1);
	},
	pascalCase(str$1) {
		return pascalCase(str$1);
	},
	pathCase(str$1) {
		return pathCase(str$1);
	},
	sentenceCase(str$1) {
		return sentenceCase(str$1);
	},
	snakeCase(str$1) {
		return snakeCase(str$1);
	},
	titleCase(str$1) {
		return titleCase(str$1);
	},
	kebabCase(str$1) {
		return kebabCase(str$1);
	},
	plural(str$1) {
		return pluralize_default.plural(str$1);
	},
	singular(str$1) {
		return pluralize_default.singular(str$1);
	},
	isPlural(str$1) {
		return pluralize_default.isPlural(str$1);
	},
	isSingular(str$1) {
		return pluralize_default.isSingular(str$1);
	},
	addPluralRule(rule, repl) {
		pluralize_default.addPluralRule(rule, repl);
	},
	addSingularRule(rule, repl) {
		pluralize_default.addSingularRule(rule, repl);
	},
	addIrregularRule(single, plural2) {
		pluralize_default.addIrregularRule(single, plural2);
	},
	addUncountableRule(word) {
		pluralize_default.addUncountableRule(word);
	}
}, str = Str;
const _hoisted_1$2 = ["command-group-key", "data-value"], _hoisted_2 = {
	key: 0,
	"command-group-heading": ""
}, _hoisted_3 = {
	"command-group-items": "",
	role: "group"
};
var CommandGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "Command.Group",
	__name: "CommandGroup",
	props: { heading: {} },
	setup(__props) {
		let groupId = computed(() => `command-group-${random()}`), { filtered, isSearching } = useCommandState(), isRender = computed(() => isSearching.value ? filtered.value.groups.has(groupId.value) : !0);
		return (_ctx, _cache) => withDirectives((openBlock(), createElementBlock("div", {
			key: groupId.value,
			"command-group": "",
			role: "presentation",
			"command-group-key": groupId.value,
			"data-value": _ctx.heading
		}, [_ctx.heading ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(_ctx.heading), 1)) : createCommentVNode("", !0), createElementVNode("div", _hoisted_3, [renderSlot(_ctx.$slots, "default")])], 8, _hoisted_1$2)), [[vShow, isRender.value]]);
	}
}), CommandGroup_default = CommandGroup_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1$1 = ["placeholder", "value"];
var CommandInput_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "Command.Input",
	__name: "CommandInput",
	props: {
		placeholder: {},
		value: {}
	},
	emits: ["input", "update:value"],
	setup(__props, { emit: __emit }) {
		let emit = __emit, inputRef = ref(null), { search } = useCommandState(), localSearch = computed(() => search.value);
		function handleInput(e) {
			let event = e, input = e.target;
			search.value = input?.value, emit("input", event), emit("update:value", search.value);
		}
		return watchEffect(() => {
			inputRef.value?.focus();
		}), (_ctx, _cache) => (openBlock(), createElementBlock("input", {
			ref_key: "inputRef",
			ref: inputRef,
			"command-input": "",
			"auto-focus": "",
			"auto-complete": "off",
			"auto-correct": "off",
			"spell-check": !1,
			"aria-autocomplete": "list",
			role: "combobox",
			"aria-expanded": !0,
			placeholder: _ctx.placeholder,
			value: localSearch.value,
			onInput: handleInput
		}, null, 40, _hoisted_1$1));
	}
}), CommandInput_default = CommandInput_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1 = [
	"aria-selected",
	"aria-disabled",
	"command-item-key"
];
var CommandItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "Command.Item",
	__name: "CommandItem",
	props: {
		shortcut: {},
		perform: { type: Function }
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		let props = __props, emit = __emit, SELECT_EVENT$1 = "command-item-select", VALUE_ATTR$1 = "data-value", { current } = useMagicKeys(), { selectedNode, filtered, isSearching } = useCommandState(), { itemInfo } = useCommandEvent(), itemRef = ref(), itemId = computed(() => `command-item-${random()}`), isRender = computed(() => {
			let itemKey = filtered.value.items.get(itemId.value);
			return isSearching.value ? itemKey !== void 0 : !0;
		}), currentKeys = computed(() => Array.from(current));
		function handleSelect() {
			let itemInfoObj = {
				key: itemId.value,
				value: itemRef.value?.getAttribute("data-value") || ""
			};
			itemInfo.value = itemInfoObj, emit("select", itemInfoObj);
		}
		return whenever(currentKeys, (v$1) => {
			if (props.shortcut && props.shortcut.length > 0) {
				let hasKey = props.shortcut.every((key) => current.has(key.toLowerCase()));
				hasKey && props.perform && props.perform();
			}
		}), watchEffect(() => {
			itemRef.value?.addEventListener(SELECT_EVENT$1, handleSelect);
		}), onBeforeUnmount(() => {
			itemRef.value?.removeEventListener(SELECT_EVENT$1, handleSelect);
		}), (_ctx, _cache) => withDirectives((openBlock(), createElementBlock("div", {
			ref_key: "itemRef",
			ref: itemRef,
			key: itemId.value,
			"command-item": "",
			role: "option",
			"aria-selected": unref(selectedNode) === itemId.value,
			"aria-disabled": !isRender.value,
			"command-item-key": itemId.value,
			onClick: handleSelect
		}, [renderSlot(_ctx.$slots, "default")], 8, _hoisted_1)), [[vShow, isRender.value]]);
	}
}), CommandItem_default = CommandItem_vue_vue_type_script_setup_true_lang_default, CommandList_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "Command.List",
	__name: "CommandList",
	setup(__props) {
		let { rerenderList } = useCommandEvent(), listRef = ref(), heightRef = ref(), observer = null, sizer;
		return watchEffect(() => {
			sizer = heightRef.value;
			let wrapper = listRef.value, animationFrame;
			if (sizer && wrapper) return observer = new ResizeObserver((entries) => {
				animationFrame = requestAnimationFrame(() => {
					let height = sizer?.offsetHeight;
					wrapper?.style.setProperty("--command-list-height", `${height?.toFixed(1)}px`), rerenderList.value = !0;
				});
			}), observer.observe(sizer), () => {
				cancelAnimationFrame(animationFrame), observer?.unobserve(sizer);
			};
		}), onBeforeUnmount(() => {
			observer !== null && sizer && observer.unobserve(sizer);
		}), (_ctx, _cache) => (openBlock(), createElementBlock("div", {
			ref_key: "listRef",
			ref: listRef,
			"command-list": "",
			role: "listbox",
			"aria-label": "Suggestions"
		}, [createElementVNode("div", {
			ref_key: "heightRef",
			ref: heightRef,
			"command-list-sizer": ""
		}, [renderSlot(_ctx.$slots, "default")], 512)], 512));
	}
}), CommandList_default = CommandList_vue_vue_type_script_setup_true_lang_default;
const Empty = defineComponent({
	name: "Command.Empty",
	setup(props, { attrs, slots }) {
		let { filtered } = useCommandState(), isRender = computed(() => filtered.value.count === 0);
		return () => isRender.value ? h("div", {
			"command-empty": "",
			role: "presentation",
			...attrs
		}, slots) : h("div", {
			"command-empty": "hidden",
			role: "presentation",
			style: { display: "none" },
			...attrs
		});
	}
}), Loading = defineComponent({
	name: "Command.Loading",
	setup(props, { attrs, slots }) {
		return () => h("div", {
			"command-loading": "",
			role: "progressbar",
			...attrs
		}, slots);
	}
}), Separator = defineComponent({
	name: "Command.Separator",
	setup(props, { attrs, slots }) {
		return () => h("div", {
			"command-separator": "",
			role: "separator",
			...attrs
		});
	}
}), Command = Object.assign(CommandRoot_default, {
	Root: CommandRoot_default,
	Dialog: CommandDialog_default,
	Empty,
	Group: CommandGroup_default,
	Input: CommandInput_default,
	Item: CommandItem_default,
	List: CommandList_default,
	Loading,
	Separator
});
export { Command, useCommandState };

//# sourceMappingURL=index.js.map