// ../../../../node_modules/@vue/shared/dist/shared.esm-bundler.js
/*! #__NO_SIDE_EFFECTS__ */
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(","))
    map[key] = 1;
  return (val) => (val in map);
}
var EMPTY_OBJ = Object.freeze({});
var EMPTY_ARR = Object.freeze([]);
var NOOP = () => {};
var NO = () => false;
var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
var extend = Object.assign;
var remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isSet = (val) => toTypeString(val) === "[object Set]";
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isPlainObject = (val) => toTypeString(val) === "[object Object]";
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var toHandlerKey = cacheStringFunction((str) => {
  const s = str ? `on${capitalize(str)}` : ``;
  return s;
});
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
var toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
var _globalThis;
var getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0;i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:([^]+)/;
var styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0;i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);

// ../../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
var activeEffectScope;

class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this._on = 0;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length;i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length;i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length;i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length;i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (true) {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      activeEffectScope = this.prevScope;
      this.prevScope = undefined;
    }
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length;i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length;i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length;i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = undefined;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn, failSilently = false) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else if (!failSilently) {
    warn(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
  }
}
var activeSub;
var pausedQueueEffects = /* @__PURE__ */ new WeakSet;

class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = undefined;
    this.depsTail = undefined;
    this.flags = 1 | 4;
    this.next = undefined;
    this.cleanup = undefined;
    this.scheduler = undefined;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      if (activeSub !== this) {
        warn("Active effect was not restored correctly - this is likely a Vue internal bug.");
      }
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps;link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = undefined;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
var batchDepth = 0;
var batchedSub;
var batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = undefined;
    while (e) {
      const next = e.next;
      e.next = undefined;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = undefined;
    while (e) {
      const next = e.next;
      e.next = undefined;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          e.trigger();
        } catch (err) {
          if (!error)
            error = err;
        }
      }
      e = next;
    }
  }
  if (error)
    throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps;link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail)
        tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = undefined;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps;link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed) {
  if (computed.flags & 4 && !(computed.flags & 16)) {
    return;
  }
  computed.flags &= -17;
  if (computed.globalVersion === globalVersion) {
    return;
  }
  computed.globalVersion = globalVersion;
  if (!computed.isSSR && computed.flags & 128 && (!computed.deps && !computed._dirty || !isDirty(computed))) {
    return;
  }
  computed.flags |= 2;
  const dep = computed.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed;
  shouldTrack = true;
  try {
    prepareDeps(computed);
    const value = computed.fn(computed._value);
    if (dep.version === 0 || hasChanged(value, computed._value)) {
      computed.flags |= 128;
      computed._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed);
    computed.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = undefined;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = undefined;
  }
  if (dep.subsHead === link) {
    dep.subsHead = nextSub;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps;l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = undefined;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = undefined;
  }
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === undefined ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = undefined;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = undefined;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
var globalVersion = 0;

class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = undefined;
  }
}

class Dep {
  constructor(computed) {
    this.computed = computed;
    this.version = 0;
    this.activeLink = undefined;
    this.subs = undefined;
    this.map = undefined;
    this.key = undefined;
    this.sc = 0;
    this.__v_skip = true;
    if (true) {
      this.subsHead = undefined;
    }
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === undefined || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = undefined;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    if (activeSub.onTrack) {
      activeSub.onTrack(extend({
        effect: activeSub
      }, debugInfo));
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (true) {
        for (let head = this.subsHead;head; head = head.nextSub) {
          if (head.sub.onTrigger && !(head.sub.flags & 8)) {
            head.sub.onTrigger(extend({
              effect: head.sub
            }, debugInfo));
          }
        }
      }
      for (let link = this.subs;link; link = link.prevSub) {
        if (link.sub.notify()) {
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed = link.dep.computed;
    if (computed && !link.dep.subs) {
      computed.flags |= 4 | 16;
      for (let l = computed.deps;l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail)
        currentTail.nextSub = link;
    }
    if (link.dep.subsHead === undefined) {
      link.dep.subsHead = link;
    }
    link.dep.subs = link;
  }
}
var targetMap = /* @__PURE__ */ new WeakMap;
var ITERATE_KEY = Symbol("Object iterate");
var MAP_KEY_ITERATE_KEY = Symbol("Map keys iterate");
var ARRAY_ITERATE_KEY = Symbol("Array iterate");
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map);
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep);
      dep.map = depsMap;
      dep.key = key;
    }
    if (true) {
      dep.track({
        target,
        type,
        key
      });
    } else {}
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      if (true) {
        dep.trigger({
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        });
      } else {}
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== undefined || depsMap.has(undefined)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function getDepFromReactive(object, key) {
  const depMap = targetMap.get(object);
  return depMap && depMap.get(key);
}
function reactiveReadArray(array) {
  const raw = toRaw(array);
  if (raw === array)
    return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
var arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...args) {
    return reactiveReadArray(this).concat(...args.map((x) => isArray(x) ? reactiveReadArray(x) : x));
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toReactive(value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, undefined, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
  },
  find(fn, thisArg) {
    return apply(this, "find", fn, thisArg, toReactive, arguments);
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, undefined, arguments);
  },
  findLast(fn, thisArg) {
    return apply(this, "findLast", fn, thisArg, toReactive, arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, undefined, arguments);
  },
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, undefined, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, undefined, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, undefined, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", toReactive);
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (result.value) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
var arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toReactive(item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  let wrappedFn = fn;
  if (arr !== self2) {
    if (!isShallow(self2)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self2, method, args) {
  const arr = toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = toRaw(self2)[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
function hasOwnProperty2(key) {
  if (!isSymbol(key))
    key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}

class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip")
      return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty2;
      }
    }
    const res = Reflect.get(target, key, isRef(target) ? target : receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}

class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, isRef(target) ? target : receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, undefined, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
}

class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    if (true) {
      warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
  deleteProperty(target, key) {
    if (true) {
      warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
}
var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler;
var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler;
var shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
var shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (true) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : type === "clear" ? undefined : this;
  };
}
function createInstrumentations(readonly, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly && track(toRaw(target), "iterate", ITERATE_KEY);
      return Reflect.get(target, "size", target);
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
      !readonly && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(instrumentations, readonly ? {
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear")
  } : {
    add(value) {
      if (!shallow && !isShallow(value) && !isReadonly(value)) {
        value = toRaw(value);
      }
      const target = toRaw(this);
      const proto = getProto(target);
      const hadKey = proto.has.call(target, value);
      if (!hadKey) {
        target.add(value);
        trigger(target, "add", value, value);
      }
      return this;
    },
    set(key, value) {
      if (!shallow && !isShallow(value) && !isReadonly(value)) {
        value = toRaw(value);
      }
      const target = toRaw(this);
      const { has, get } = getProto(target);
      let hadKey = has.call(target, key);
      if (!hadKey) {
        key = toRaw(key);
        hadKey = has.call(target, key);
      } else if (true) {
        checkIdentityKeys(target, has, key);
      }
      const oldValue = get.call(target, key);
      target.set(key, value);
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
      return this;
    },
    delete(key) {
      const target = toRaw(this);
      const { has, get } = getProto(target);
      let hadKey = has.call(target, key);
      if (!hadKey) {
        key = toRaw(key);
        hadKey = has.call(target, key);
      } else if (true) {
        checkIdentityKeys(target, has, key);
      }
      const oldValue = get ? get.call(target, key) : undefined;
      const result = target.delete(key);
      if (hadKey) {
        trigger(target, "delete", key, undefined, oldValue);
      }
      return result;
    },
    clear() {
      const target = toRaw(this);
      const hadItems = target.size !== 0;
      const oldTarget = isMap(target) ? new Map(target) : new Set(target);
      const result = target.clear();
      if (hadItems) {
        trigger(target, "clear", undefined, undefined, oldTarget);
      }
      return result;
    }
  });
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
var mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
var shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
var readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
var shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has.call(target, rawKey)) {
    const type = toRawType(target);
    warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var reactiveMap = /* @__PURE__ */ new WeakMap;
var shallowReactiveMap = /* @__PURE__ */ new WeakMap;
var readonlyMap = /* @__PURE__ */ new WeakMap;
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap;
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (true) {
      warn(`value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
var toReactive = (value) => isObject(value) ? reactive(value) : value;
var toReadonly = (value) => isObject(value) ? readonly(value) : value;
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}

class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep;
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    if (true) {
      this.dep.track({
        target: this,
        type: "get",
        key: "value"
      });
    } else {}
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      if (true) {
        this.dep.trigger({
          target: this,
          type: "set",
          key: "value",
          newValue,
          oldValue
        });
      } else {}
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
function toValue(source) {
  return isFunction(source) ? source() : unref(source);
}
var shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}

class CustomRefImpl {
  constructor(factory) {
    this["__v_isRef"] = true;
    this._value = undefined;
    const dep = this.dep = new Dep;
    const { get, set } = factory(dep.track.bind(dep), dep.trigger.bind(dep));
    this._get = get;
    this._set = set;
  }
  get value() {
    return this._value = this._get();
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function customRef(factory) {
  return new CustomRefImpl(factory);
}
function toRefs(object) {
  if (!isProxy(object)) {
    warn(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = propertyToRef(object, key);
  }
  return ret;
}

class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this["__v_isRef"] = true;
    this._value = undefined;
  }
  get value() {
    const val = this._object[this._key];
    return this._value = val === undefined ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}

class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this["__v_isRef"] = true;
    this["__v_isReadonly"] = true;
    this._value = undefined;
  }
  get value() {
    return this._value = this._getter();
  }
}
function toRef(source, key, defaultValue) {
  if (isRef(source)) {
    return source;
  } else if (isFunction(source)) {
    return new GetterRefImpl(source);
  } else if (isObject(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
}

class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = undefined;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = undefined;
    this.depsTail = undefined;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = undefined;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && activeSub !== this) {
      batch(this, true);
      return true;
    } else if (true)
      ;
  }
  get value() {
    const link = this.dep.track({
      target: this,
      type: "get",
      key: "value"
    });
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    } else if (true) {
      warn("Write operation failed: computed value is readonly");
    }
  }
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.onTrack = debugOptions.onTrack;
    cRef.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
var INITIAL_WATCHER_VALUE = {};
var cleanupMap = /* @__PURE__ */ new WeakMap;
var activeWatcher = undefined;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups)
      cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  } else if (!failSilently) {
    warn(`onWatcherCleanup() was called when there was no active watcher to associate with.`);
  }
}
function watch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const warnInvalidSource = (s) => {
    (options.onWarn || warn)(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const reactiveGetter = (source2) => {
    if (deep)
      return source2;
    if (isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return call ? call(s, 2) : s();
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect.flags & 1) || !effect.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect;
        try {
          const args = [
            newValue,
            oldValue === INITIAL_WATCHER_VALUE ? undefined : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          oldValue = newValue;
          call ? call(cb, 3, args) : cb(...args);
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect = new ReactiveEffect(getter);
  effect.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect);
  cleanup = effect.onStop = () => {
    const cleanups = cleanupMap.get(effect);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups)
          cleanup2();
      }
      cleanupMap.delete(effect);
    }
  };
  if (true) {
    effect.onTrack = options.onTrack;
    effect.onTrigger = options.onTrigger;
  }
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect.run();
  }
  watchHandle.pause = effect.pause.bind(effect);
  watchHandle.resume = effect.resume.bind(effect);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set;
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray(value)) {
    for (let i = 0;i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}
// ../../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
var isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning)
    return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.map((a) => {
        var _a, _b;
        return (_b = (_a = a.toString) == null ? undefined : _a.call(a)) != null ? _b : JSON.stringify(a);
      }).join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join(`
`),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function assertNumber(val, type) {
  if (false)
    ;
  if (val === undefined) {
    return;
  } else if (typeof val !== "number") {
    warn$1(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn$1(`${type} is NaN - the duration expression might be incorrect.`);
  }
}
var ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush",
  [15]: "component update",
  [16]: "app unmount cleanup function"
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray(fn)) {
    const values = [];
    for (let i = 0;i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  } else if (true) {
    warn$1(`Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`);
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings$1[type];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0;i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (true) {
    const info = ErrorTypeStrings$1[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  } else
    ;
}
var queue = [];
var flushIndex = -1;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = /* @__PURE__ */ Promise.resolve();
var currentFlushPromise = null;
var RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort((a, b) => getId(a) - getId(b));
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    if (true) {
      seen = seen || /* @__PURE__ */ new Map;
    }
    for (postFlushIndex = 0;postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8))
        cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
var getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  if (true) {
    seen = seen || /* @__PURE__ */ new Map;
  }
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0;flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (check(job)) {
          continue;
        }
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(job, job.i, job.i ? 15 : 14);
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (;flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs(seen);
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  const count = seen.get(fn) || 0;
  if (count > RECURSION_LIMIT) {
    const instance = fn.i;
    const componentName = instance && getComponentName(instance.type);
    handleError(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`, null, 10);
    return true;
  }
  seen.set(fn, count + 1);
  return false;
}
var isHmrUpdating = false;
var hmrDirtyComponents = /* @__PURE__ */ new Map;
if (true) {
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
var map = /* @__PURE__ */ new Map;
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (let i = 0;i < instances.length; i++) {
    const instance = instances[i];
    const oldComp = normalizeClassComponent(instance.type);
    let dirtyInstances = hmrDirtyComponents.get(oldComp);
    if (!dirtyInstances) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.set(oldComp, dirtyInstances = /* @__PURE__ */ new Set);
    }
    dirtyInstances.add(instance);
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      dirtyInstances.add(instance);
      instance.ceReload(newComp.styles);
      dirtyInstances.delete(instance);
    } else if (instance.parent) {
      queueJob(() => {
        isHmrUpdating = true;
        instance.parent.update();
        isHmrUpdating = false;
        dirtyInstances.delete(instance);
      });
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
    }
    if (instance.root.ce && instance !== instance.root) {
      instance.root.ce._removeChildStyle(oldComp);
    }
  }
  queuePostFlushCb(() => {
    hmrDirtyComponents.clear();
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
    }
  };
}
/*! #__NO_SIDE_EFFECTS__ */
var currentRenderingInstance = null;
var currentScopeId = null;
var TeleportEndKey = Symbol("_vte");
var isTeleport = (type) => type.__isTeleport;
var leaveCbKey = Symbol("_leaveCb");
var enterCbKey = Symbol("_enterCb");
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
var TransitionHookValidator = [Function, Array];
var BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance, postClone) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook(hook, args);
    if (isArray(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el[leaveCbKey]) {
        el[leaveCbKey](true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
        leavingVNode.el[leaveCbKey]();
      }
      callHook(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el[enterCbKey] = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook(cancelHook, [el]);
        } else {
          callHook(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey] = undefined;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el[enterCbKey]) {
        el[enterCbKey](true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook(onBeforeLeave, [el]);
      let called = false;
      const done = el[leaveCbKey] = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook(onLeaveCancelled, [el]);
        } else {
          callHook(onAfterLeave, [el]);
        }
        el[leaveCbKey] = undefined;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      const hooks2 = resolveTransitionHooks(vnode2, props, state, instance, postClone);
      if (postClone)
        postClone(hooks2);
      return hooks2;
    }
  };
  return hooks;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0;i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0;i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
/*! #__NO_SIDE_EFFECTS__ */
function defineComponent(options, extraOptions) {
  return isFunction(options) ? /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))() : options;
}
var requestIdleCallback = getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
var cancelIdleCallback = getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
/*! #__NO_SIDE_EFFECTS__ */
var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else if (true) {
    const apiName = toHandlerKey(ErrorTypeStrings$1[type].replace(/ hook$/, ""));
    warn$1(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().` + ` If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
var createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
var onBeforeMount = createHook("bm");
var onMounted = createHook("m");
var onBeforeUpdate = createHook("bu");
var onUpdated = createHook("u");
var onBeforeUnmount = createHook("bum");
var onUnmounted = createHook("um");
var onServerPrefetch = createHook("sp");
var onRenderTriggered = createHook("rtg");
var onRenderTracked = createHook("rtc");
var NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
var getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
var publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => shallowReadonly(i.props),
  $attrs: (i) => shallowReadonly(i.attrs),
  $slots: (i) => shallowReadonly(i.slots),
  $refs: (i) => shallowReadonly(i.refs),
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $host: (i) => i.ce,
  $emit: (i) => i.emit,
  $options: (i) => __VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type,
  $forceUpdate: (i) => i.f || (i.f = () => {
    queueJob(i.update);
  }),
  $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
  $watch: (i) => __VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP
});
var isReservedPrefix = (key) => key === "_" || key === "$";
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
var PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== undefined) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
        markAttrsAccessed();
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
if (true) {
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
}
var shouldCacheAccess = true;
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
var internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0;i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap,
    propsCache: /* @__PURE__ */ new WeakMap,
    emitsCache: /* @__PURE__ */ new WeakMap
  };
}
var currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    if (true) {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : undefined;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else if (true) {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else if (true) {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
function hasInjectionContext() {
  return !!(currentInstance || currentRenderingInstance || currentApp);
}
var internalObjectProto = {};
var isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
var queuePostRenderEffect = queueEffectWithSuspense;
var ssrContextKey = Symbol.for("v-scx");
var useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
      warn$1(`Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`);
    }
    return ctx;
  }
};
function watchEffect(effect2, options) {
  return doWatch(effect2, null, options);
}
function watch2(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  if (!cb) {
    if (immediate !== undefined) {
      warn$1(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== undefined) {
      warn$1(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (once !== undefined) {
      warn$1(`watch() "once" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const baseWatchOptions = extend({}, options);
  if (true)
    baseWatchOptions.onWarn = warn$1;
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {};
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0;i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
var accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
var isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
var Fragment = Symbol.for("v-fgt");
var Text = Symbol.for("v-txt");
var Comment = Symbol.for("v-cmt");
var Static = Symbol.for("v-stc");
var currentBlock = null;
var isBlockTreeEnabled = 1;
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (n2.shapeFlag & 6 && n1.component) {
    const dirtyInstances = hmrDirtyComponents.get(n2.type);
    if (dirtyInstances && dirtyInstances.has(n1.component)) {
      n1.shapeFlag &= -257;
      n2.shapeFlag &= -513;
      return false;
    }
  }
  return n1.type === n2.type && n1.key === n2.key;
}
var vnodeArgsTransformer;
var createVNodeWithArgsTransform = (...args) => {
  return _createVNode(...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args);
};
var normalizeKey = ({ key }) => key != null ? key : null;
var normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (vnode.key !== vnode.key) {
    warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
var createVNode = createVNodeWithArgsTransform;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!type) {
      warn$1(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  if (shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn$1(`Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
  }
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref2, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(cloned, transition.clone(cloned));
  }
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0;i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
var emptyAppContext = createAppContext();
var currentInstance = null;
var getCurrentInstance = () => currentInstance || currentRenderingInstance;
var internalSetCurrentInstance;
var setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key]))
      setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1)
        setters.forEach((set) => set(v));
      else
        setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(`__VUE_INSTANCE_SETTERS__`, (v) => currentInstance = v);
  setInSSRSetupState = registerGlobalSetter(`__VUE_SSR_SETTERS__`, (v) => isInSSRComponentSetup = v);
}
var setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
var isInSSRComponentSetup = false;
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
var classifyRE = /(?:^|[-_])(\w)/g;
var classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
var computed2 = (getterOrOptions, debugOptions) => {
  const c = computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
  if (true) {
    const i = getCurrentInstance();
    if (i && i.appContext.config.warnRecursiveComputed) {
      c._warnRecursive = true;
    }
  }
  return c;
};
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
function initCustomFormatter() {
  if (typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#1677ff" };
  const stringStyle = { style: "color:#f5222d" };
  const keywordStyle = { style: "color:#eb2f96" };
  const formatter = {
    __vue_custom_formatter: true,
    header(obj) {
      if (!isObject(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        pauseTracking();
        const value = obj.value;
        resetTracking();
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed3 = extractKeys(instance, "computed");
    if (computed3) {
      blocks.push(createInstanceBlock("computed", computed3));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject(v)) {
      return ["object", { object: asRaw ? toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
var version = "3.5.17";
var warn2 = warn$1;
// ../../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var policy = undefined;
var tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
    warn2(`Error creating trusted types policy: ${e}`);
  }
}
var TRANSITION = "transition";
var ANIMATION = "animation";
var vtcKey = Symbol("_vtc");
var DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
var TransitionPropsValidators = /* @__PURE__ */ extend({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
var callHook = (hook, args = []) => {
  if (isArray(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
var hasExplicitCallback = (hook) => {
  return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done, isCancelled) => {
    el._enterCancelled = isCancelled;
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      if (!el._enterCancelled) {
        forceReflow();
        addTransitionClass(el, leaveActiveClass);
      } else {
        addTransitionClass(el, leaveActiveClass);
        forceReflow();
      }
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve);
        }
      });
      callHook(onLeave, [el, resolve]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false, undefined, true);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true, undefined, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  if (true) {
    assertNumber(res, "<transition> explicit duration");
  }
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set)).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el[vtcKey] = undefined;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
var endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve();
    }
  };
  if (explicitTimeout != null) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  if (s === "auto")
    return 0;
  return Number(s.slice(0, -1).replace(",", ".")) * 1000;
}
function forceReflow() {
  return document.body.offsetHeight;
}
var vShowOriginalDisplay = Symbol("_vod");
var vShowHidden = Symbol("_vsh");
var vShow = {
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
if (true) {
  vShow.name = "show";
}
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : "none";
  el[vShowHidden] = !value;
}
var CSS_VAR_TEXT = Symbol("CSS_VAR_TEXT");
var veiKey = Symbol("_vei");
/*! #__NO_SIDE_EFFECTS__ */
/*! #__NO_SIDE_EFFECTS__ */
var positionMap = /* @__PURE__ */ new WeakMap;
var newPositionMap = /* @__PURE__ */ new WeakMap;
var moveCbKey = Symbol("_moveCb");
var enterCbKey2 = Symbol("_enterCb");
var decorate = (t) => {
  delete t.props.mode;
  return t;
};
var TransitionGroupImpl = /* @__PURE__ */ decorate({
  name: "TransitionGroup",
  props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
        prevChildren = [];
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c) => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el[moveCbKey] = (e) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el[moveCbKey] = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
      prevChildren = [];
    });
    return () => {
      const rawProps = toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment;
      prevChildren = [];
      if (children) {
        for (let i = 0;i < children.length; i++) {
          const child = children[i];
          if (child.el && child.el instanceof Element) {
            prevChildren.push(child);
            setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
            positionMap.set(child, child.el.getBoundingClientRect());
          }
        }
      }
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i = 0;i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
        } else if (child.type !== Text) {
          warn2(`<TransitionGroup> children must be keyed.`);
        }
      }
      return createVNode(tag, null, children);
    };
  }
});
var TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
  const el = c.el;
  if (el[moveCbKey]) {
    el[moveCbKey]();
  }
  if (el[enterCbKey2]) {
    el[enterCbKey2]();
  }
}
function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}
function applyTranslation(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
    return c;
  }
}
function hasCSSTransform(el, root, moveClass) {
  const clone = el.cloneNode();
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
var assignKey = Symbol("_assign");

// ../../../../node_modules/vue/dist/vue.runtime.esm-bundler.js
function initDev() {
  {
    initCustomFormatter();
  }
}
if (true) {
  initDev();
}

// ../../../../node_modules/@vueuse/shared/index.mjs
function computedEager(fn, options) {
  var _a;
  const result = shallowRef();
  watchEffect(() => {
    result.value = fn();
  }, {
    ...options,
    flush: (_a = options == null ? undefined : options.flush) != null ? _a : "sync"
  });
  return readonly(result);
}
function computedWithControl(source, fn, options = {}) {
  let v = undefined;
  let track2;
  let trigger2;
  let dirty = true;
  const update = () => {
    dirty = true;
    trigger2();
  };
  watch2(source, update, { flush: "sync", ...options });
  const get = typeof fn === "function" ? fn : fn.get;
  const set = typeof fn === "function" ? undefined : fn.set;
  const result = customRef((_track, _trigger) => {
    track2 = _track;
    trigger2 = _trigger;
    return {
      get() {
        if (dirty) {
          v = get(v);
          dirty = false;
        }
        track2();
        return v;
      },
      set(v2) {
        set == null || set(v2);
      }
    };
  });
  result.trigger = update;
  return result;
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function createEventHook() {
  const fns = /* @__PURE__ */ new Set;
  const off = (fn) => {
    fns.delete(fn);
  };
  const clear = () => {
    fns.clear();
  };
  const on = (fn) => {
    fns.add(fn);
    const offFn = () => off(fn);
    tryOnScopeDispose(offFn);
    return {
      off: offFn
    };
  };
  const trigger2 = (...args) => {
    return Promise.all(Array.from(fns).map((fn) => fn(...args)));
  };
  return {
    on,
    off,
    trigger: trigger2,
    clear
  };
}
function createGlobalState(stateFactory) {
  let initialized = false;
  let state;
  const scope = effectScope(true);
  return (...args) => {
    if (!initialized) {
      state = scope.run(() => stateFactory(...args));
      initialized = true;
    }
    return state;
  };
}
var localProvidedStateMap = /* @__PURE__ */ new WeakMap;
var injectLocal = (...args) => {
  var _a;
  const key = args[0];
  const instance = (_a = getCurrentInstance()) == null ? undefined : _a.proxy;
  if (instance == null && !hasInjectionContext())
    throw new Error("injectLocal must be called in setup");
  if (instance && localProvidedStateMap.has(instance) && key in localProvidedStateMap.get(instance))
    return localProvidedStateMap.get(instance)[key];
  return inject(...args);
};
function provideLocal(key, value) {
  var _a;
  const instance = (_a = getCurrentInstance()) == null ? undefined : _a.proxy;
  if (instance == null)
    throw new Error("provideLocal must be called in setup");
  if (!localProvidedStateMap.has(instance))
    localProvidedStateMap.set(instance, /* @__PURE__ */ Object.create(null));
  const localProvidedState = localProvidedStateMap.get(instance);
  localProvidedState[key] = value;
  return provide(key, value);
}
function createInjectionState(composable, options) {
  const key = (options == null ? undefined : options.injectionKey) || Symbol(composable.name || "InjectionState");
  const defaultValue = options == null ? undefined : options.defaultValue;
  const useProvidingState = (...args) => {
    const state = composable(...args);
    provideLocal(key, state);
    return state;
  };
  const useInjectedState = () => injectLocal(key, defaultValue);
  return [useProvidingState, useInjectedState];
}
function createRef2(value, deep) {
  if (deep === true) {
    return ref(value);
  } else {
    return shallowRef(value);
  }
}
function createSharedComposable(composable) {
  let subscribers = 0;
  let state;
  let scope;
  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = undefined;
      scope = undefined;
    }
  };
  return (...args) => {
    subscribers += 1;
    if (!scope) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose(dispose);
    return state;
  };
}
function extendRef(ref2, extend2, { enumerable = false, unwrap = true } = {}) {
  for (const [key, value] of Object.entries(extend2)) {
    if (key === "value")
      continue;
    if (isRef(value) && unwrap) {
      Object.defineProperty(ref2, key, {
        get() {
          return value.value;
        },
        set(v) {
          value.value = v;
        },
        enumerable
      });
    } else {
      Object.defineProperty(ref2, key, { value, enumerable });
    }
  }
  return ref2;
}
function isDefined(v) {
  return unref(v) != null;
}
function makeDestructurable(obj, arr) {
  if (typeof Symbol !== "undefined") {
    const clone = { ...obj };
    Object.defineProperty(clone, Symbol.iterator, {
      enumerable: false,
      value() {
        let index = 0;
        return {
          next: () => ({
            value: arr[index++],
            done: index > arr.length
          })
        };
      }
    });
    return clone;
  } else {
    return Object.assign([...arr], obj);
  }
}
function reactify(fn, options) {
  const unrefFn = (options == null ? undefined : options.computedGetter) === false ? unref : toValue;
  return function(...args) {
    return computed2(() => fn.apply(this, args.map((i) => unrefFn(i))));
  };
}
function reactifyObject(obj, optionsOrKeys = {}) {
  let keys = [];
  let options;
  if (Array.isArray(optionsOrKeys)) {
    keys = optionsOrKeys;
  } else {
    options = optionsOrKeys;
    const { includeOwnProperties = true } = optionsOrKeys;
    keys.push(...Object.keys(obj));
    if (includeOwnProperties)
      keys.push(...Object.getOwnPropertyNames(obj));
  }
  return Object.fromEntries(keys.map((key) => {
    const value = obj[key];
    return [
      key,
      typeof value === "function" ? reactify(value.bind(obj), options) : value
    ];
  }));
}
function toReactive2(objectRef) {
  if (!isRef(objectRef))
    return reactive(objectRef);
  const proxy = new Proxy({}, {
    get(_, p, receiver) {
      return unref(Reflect.get(objectRef.value, p, receiver));
    },
    set(_, p, value) {
      if (isRef(objectRef.value[p]) && !isRef(value))
        objectRef.value[p].value = value;
      else
        objectRef.value[p] = value;
      return true;
    },
    deleteProperty(_, p) {
      return Reflect.deleteProperty(objectRef.value, p);
    },
    has(_, p) {
      return Reflect.has(objectRef.value, p);
    },
    ownKeys() {
      return Object.keys(objectRef.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
  return reactive(proxy);
}
function reactiveComputed(fn) {
  return toReactive2(computed2(fn));
}
function reactiveOmit(obj, ...keys) {
  const flatKeys = keys.flat();
  const predicate = flatKeys[0];
  return reactiveComputed(() => typeof predicate === "function" ? Object.fromEntries(Object.entries(toRefs(obj)).filter(([k, v]) => !predicate(toValue(v), k))) : Object.fromEntries(Object.entries(toRefs(obj)).filter((e) => !flatKeys.includes(e[0]))));
}
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
var isWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var isDef = (val) => typeof val !== "undefined";
var notNullish = (val) => val != null;
var toString = Object.prototype.toString;
var isObject2 = (val) => toString.call(val) === "[object Object]";
var timestamp = () => +Date.now();
var clamp = (n, min, max) => Math.min(max, Math.max(min, n));
var noop = () => {};
var hasOwn2 = (val, key) => Object.prototype.hasOwnProperty.call(val, key);
var isIOS = /* @__PURE__ */ getIsIOS();
function getIsIOS() {
  var _a, _b;
  return isClient && ((_a = window == null ? undefined : window.navigator) == null ? undefined : _a.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? undefined : window.navigator) == null ? undefined : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? undefined : window.navigator.userAgent));
}
function toRef2(...args) {
  if (args.length !== 1)
    return toRef(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
}
var resolveRef = toRef2;
function reactivePick(obj, ...keys) {
  const flatKeys = keys.flat();
  const predicate = flatKeys[0];
  return reactiveComputed(() => typeof predicate === "function" ? Object.fromEntries(Object.entries(toRefs(obj)).filter(([k, v]) => predicate(toValue(v), k))) : Object.fromEntries(flatKeys.map((k) => [k, toRef2(obj, k)])));
}
function refAutoReset(defaultValue, afterMs = 1e4) {
  return customRef((track2, trigger2) => {
    let value = toValue(defaultValue);
    let timer;
    const resetAfter = () => setTimeout(() => {
      value = toValue(defaultValue);
      trigger2();
    }, toValue(afterMs));
    tryOnScopeDispose(() => {
      clearTimeout(timer);
    });
    return {
      get() {
        track2();
        return value;
      },
      set(newValue) {
        value = newValue;
        trigger2();
        clearTimeout(timer);
        timer = resetAfter();
      }
    };
  });
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
var bypassFilter = (invoke) => {
  return invoke();
};
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  let lastInvoker;
  const filter = (invoke) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== undefined && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = undefined;
      }
      return Promise.resolve(invoke());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      lastInvoker = invoke;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = undefined;
          resolve(lastInvoker());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = undefined;
        resolve(invoke());
      }, duration);
    });
  };
  return filter;
}
function throttleFilter(...args) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  let lastRejector = noop;
  let lastValue;
  let ms;
  let trailing;
  let leading;
  let rejectOnCancel;
  if (!isRef(args[0]) && typeof args[0] === "object")
    ({ delay: ms, trailing = true, leading = true, rejectOnCancel = false } = args[0]);
  else
    [ms, trailing = true, leading = true, rejectOnCancel = false] = args;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
      lastRejector();
      lastRejector = noop;
    }
  };
  const filter = (_invoke) => {
    const duration = toValue(ms);
    const elapsed = Date.now() - lastExec;
    const invoke = () => {
      return lastValue = _invoke();
    };
    clear();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve;
        timer = setTimeout(() => {
          lastExec = Date.now();
          isLeading = true;
          resolve(invoke());
          clear();
        }, Math.max(0, duration - elapsed));
      });
    }
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration);
    isLeading = false;
    return lastValue;
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter, options = {}) {
  const {
    initialState = "active"
  } = options;
  const isActive = toRef2(initialState === "active");
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive: readonly(isActive), pause, resume, eventFilter };
}
function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
  return new Promise((resolve, reject) => {
    if (throwOnTimeout)
      setTimeout(() => reject(reason), ms);
    else
      setTimeout(resolve, ms);
  });
}
function identity(arg) {
  return arg;
}
function createSingletonPromise(fn) {
  let _promise;
  function wrapper() {
    if (!_promise)
      _promise = fn();
    return _promise;
  }
  wrapper.reset = async () => {
    const _prev = _promise;
    _promise = undefined;
    if (_prev)
      await _prev;
  };
  return wrapper;
}
function containsProp(obj, ...props) {
  return props.some((k) => (k in obj));
}
function increaseWithUnit(target, delta) {
  var _a;
  if (typeof target === "number")
    return target + delta;
  const value = ((_a = target.match(/^-?\d+\.?\d*/)) == null ? undefined : _a[0]) || "";
  const unit = target.slice(value.length);
  const result = Number.parseFloat(value) + delta;
  if (Number.isNaN(result))
    return target;
  return result + unit;
}
function pxValue(px) {
  return px.endsWith("rem") ? Number.parseFloat(px) * 16 : Number.parseFloat(px);
}
function objectPick(obj, keys, omitUndefined = false) {
  return keys.reduce((n, k) => {
    if (k in obj) {
      if (!omitUndefined || obj[k] !== undefined)
        n[k] = obj[k];
    }
    return n;
  }, {});
}
function objectOmit(obj, keys, omitUndefined = false) {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => {
    return (!omitUndefined || value !== undefined) && !keys.includes(key);
  }));
}
function objectEntries(obj) {
  return Object.entries(obj);
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function cacheStringFunction2(fn) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var hyphenateRE2 = /\B([A-Z])/g;
var hyphenate2 = cacheStringFunction2((str) => str.replace(hyphenateRE2, "-$1").toLowerCase());
var camelizeRE2 = /-(\w)/g;
var camelize2 = cacheStringFunction2((str) => {
  return str.replace(camelizeRE2, (_, c) => c ? c.toUpperCase() : "");
});
function getLifeCycleTarget(target) {
  return target || getCurrentInstance();
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}
function refDebounced(value, ms = 200, options = {}) {
  const debounced = ref(toValue(value));
  const updater = useDebounceFn(() => {
    debounced.value = value.value;
  }, ms, options);
  watch2(value, () => updater());
  return shallowReadonly(debounced);
}
function refDefault(source, defaultValue) {
  return computed2({
    get() {
      var _a;
      return (_a = source.value) != null ? _a : defaultValue;
    },
    set(value) {
      source.value = value;
    }
  });
}
function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
  return createFilterWrapper(throttleFilter(ms, trailing, leading, rejectOnCancel), fn);
}
function refThrottled(value, delay = 200, trailing = true, leading = true) {
  if (delay <= 0)
    return value;
  const throttled = ref(toValue(value));
  const updater = useThrottleFn(() => {
    throttled.value = value.value;
  }, delay, trailing, leading);
  watch2(value, () => updater());
  return throttled;
}
function refWithControl(initial, options = {}) {
  let source = initial;
  let track2;
  let trigger2;
  const ref2 = customRef((_track, _trigger) => {
    track2 = _track;
    trigger2 = _trigger;
    return {
      get() {
        return get();
      },
      set(v) {
        set(v);
      }
    };
  });
  function get(tracking = true) {
    if (tracking)
      track2();
    return source;
  }
  function set(value, triggering = true) {
    var _a, _b;
    if (value === source)
      return;
    const old = source;
    if (((_a = options.onBeforeChange) == null ? undefined : _a.call(options, value, old)) === false)
      return;
    source = value;
    (_b = options.onChanged) == null || _b.call(options, value, old);
    if (triggering)
      trigger2();
  }
  const untrackedGet = () => get(false);
  const silentSet = (v) => set(v, false);
  const peek = () => get(false);
  const lay = (v) => set(v, false);
  return extendRef(ref2, {
    get,
    set,
    untrackedGet,
    silentSet,
    peek,
    lay
  }, { enumerable: true });
}
var controlledRef = refWithControl;
function watchWithFilter(source, cb, options = {}) {
  const {
    eventFilter = bypassFilter,
    ...watchOptions
  } = options;
  return watch2(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
function watchPausable(source, cb, options = {}) {
  const {
    eventFilter: filter,
    initialState = "active",
    ...watchOptions
  } = options;
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
  const stop2 = watchWithFilter(source, cb, {
    ...watchOptions,
    eventFilter
  });
  return { stop: stop2, pause, resume, isActive };
}
function syncRef(left, right, ...[options]) {
  const {
    flush = "sync",
    deep = false,
    immediate = true,
    direction = "both",
    transform = {}
  } = options || {};
  const watchers = [];
  const transformLTR = "ltr" in transform && transform.ltr || ((v) => v);
  const transformRTL = "rtl" in transform && transform.rtl || ((v) => v);
  if (direction === "both" || direction === "ltr") {
    watchers.push(watchPausable(left, (newValue) => {
      watchers.forEach((w) => w.pause());
      right.value = transformLTR(newValue);
      watchers.forEach((w) => w.resume());
    }, { flush, deep, immediate }));
  }
  if (direction === "both" || direction === "rtl") {
    watchers.push(watchPausable(right, (newValue) => {
      watchers.forEach((w) => w.pause());
      left.value = transformRTL(newValue);
      watchers.forEach((w) => w.resume());
    }, { flush, deep, immediate }));
  }
  const stop2 = () => {
    watchers.forEach((w) => w.stop());
  };
  return stop2;
}
function syncRefs(source, targets, options = {}) {
  const {
    flush = "sync",
    deep = false,
    immediate = true
  } = options;
  const targetsArray = toArray(targets);
  return watch2(source, (newValue) => targetsArray.forEach((target) => target.value = newValue), { flush, deep, immediate });
}
function toRefs2(objectRef, options = {}) {
  if (!isRef(objectRef))
    return toRefs(objectRef);
  const result = Array.isArray(objectRef.value) ? Array.from({ length: objectRef.value.length }) : {};
  for (const key in objectRef.value) {
    result[key] = customRef(() => ({
      get() {
        return objectRef.value[key];
      },
      set(v) {
        var _a;
        const replaceRef = (_a = toValue(options.replaceRef)) != null ? _a : true;
        if (replaceRef) {
          if (Array.isArray(objectRef.value)) {
            const copy = [...objectRef.value];
            copy[key] = v;
            objectRef.value = copy;
          } else {
            const newObject = { ...objectRef.value, [key]: v };
            Object.setPrototypeOf(newObject, Object.getPrototypeOf(objectRef.value));
            objectRef.value = newObject;
          }
        } else {
          objectRef.value[key] = v;
        }
      }
    }));
  }
  return result;
}
var resolveUnref = toValue;
function tryOnBeforeMount(fn, sync = true, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    onBeforeMount(fn, target);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function tryOnBeforeUnmount(fn, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    onBeforeUnmount(fn, target);
}
function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    onMounted(fn, target);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function tryOnUnmounted(fn, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    onUnmounted(fn, target);
}
function createUntil(r, isNot = false) {
  function toMatch(condition, { flush = "sync", deep = false, timeout, throwOnTimeout } = {}) {
    let stop2 = null;
    const watcher = new Promise((resolve) => {
      stop2 = watch2(r, (v) => {
        if (condition(v) !== isNot) {
          if (stop2)
            stop2();
          else
            nextTick(() => stop2 == null ? undefined : stop2());
          resolve(v);
        }
      }, {
        flush,
        deep,
        immediate: true
      });
    });
    const promises = [watcher];
    if (timeout != null) {
      promises.push(promiseTimeout(timeout, throwOnTimeout).then(() => toValue(r)).finally(() => stop2 == null ? undefined : stop2()));
    }
    return Promise.race(promises);
  }
  function toBe(value, options) {
    if (!isRef(value))
      return toMatch((v) => v === value, options);
    const { flush = "sync", deep = false, timeout, throwOnTimeout } = options != null ? options : {};
    let stop2 = null;
    const watcher = new Promise((resolve) => {
      stop2 = watch2([r, value], ([v1, v2]) => {
        if (isNot !== (v1 === v2)) {
          if (stop2)
            stop2();
          else
            nextTick(() => stop2 == null ? undefined : stop2());
          resolve(v1);
        }
      }, {
        flush,
        deep,
        immediate: true
      });
    });
    const promises = [watcher];
    if (timeout != null) {
      promises.push(promiseTimeout(timeout, throwOnTimeout).then(() => toValue(r)).finally(() => {
        stop2 == null || stop2();
        return toValue(r);
      }));
    }
    return Promise.race(promises);
  }
  function toBeTruthy(options) {
    return toMatch((v) => Boolean(v), options);
  }
  function toBeNull(options) {
    return toBe(null, options);
  }
  function toBeUndefined(options) {
    return toBe(undefined, options);
  }
  function toBeNaN(options) {
    return toMatch(Number.isNaN, options);
  }
  function toContains(value, options) {
    return toMatch((v) => {
      const array = Array.from(v);
      return array.includes(value) || array.includes(toValue(value));
    }, options);
  }
  function changed(options) {
    return changedTimes(1, options);
  }
  function changedTimes(n = 1, options) {
    let count = -1;
    return toMatch(() => {
      count += 1;
      return count >= n;
    }, options);
  }
  if (Array.isArray(toValue(r))) {
    const instance = {
      toMatch,
      toContains,
      changed,
      changedTimes,
      get not() {
        return createUntil(r, !isNot);
      }
    };
    return instance;
  } else {
    const instance = {
      toMatch,
      toBe,
      toBeTruthy,
      toBeNull,
      toBeNaN,
      toBeUndefined,
      changed,
      changedTimes,
      get not() {
        return createUntil(r, !isNot);
      }
    };
    return instance;
  }
}
function until(r) {
  return createUntil(r);
}
function defaultComparator(value, othVal) {
  return value === othVal;
}
function useArrayDifference(...args) {
  var _a, _b;
  const list = args[0];
  const values = args[1];
  let compareFn = (_a = args[2]) != null ? _a : defaultComparator;
  const {
    symmetric = false
  } = (_b = args[3]) != null ? _b : {};
  if (typeof compareFn === "string") {
    const key = compareFn;
    compareFn = (value, othVal) => value[key] === othVal[key];
  }
  const diff1 = computed2(() => toValue(list).filter((x) => toValue(values).findIndex((y) => compareFn(x, y)) === -1));
  if (symmetric) {
    const diff2 = computed2(() => toValue(values).filter((x) => toValue(list).findIndex((y) => compareFn(x, y)) === -1));
    return computed2(() => symmetric ? [...toValue(diff1), ...toValue(diff2)] : toValue(diff1));
  } else {
    return diff1;
  }
}
function useArrayEvery(list, fn) {
  return computed2(() => toValue(list).every((element, index, array) => fn(toValue(element), index, array)));
}
function useArrayFilter(list, fn) {
  return computed2(() => toValue(list).map((i) => toValue(i)).filter(fn));
}
function useArrayFind(list, fn) {
  return computed2(() => toValue(toValue(list).find((element, index, array) => fn(toValue(element), index, array))));
}
function useArrayFindIndex(list, fn) {
  return computed2(() => toValue(list).findIndex((element, index, array) => fn(toValue(element), index, array)));
}
function isArrayIncludesOptions(obj) {
  return isObject2(obj) && containsProp(obj, "formIndex", "comparator");
}
function useArrayIncludes(...args) {
  var _a;
  const list = args[0];
  const value = args[1];
  let comparator = args[2];
  let formIndex = 0;
  if (isArrayIncludesOptions(comparator)) {
    formIndex = (_a = comparator.fromIndex) != null ? _a : 0;
    comparator = comparator.comparator;
  }
  if (typeof comparator === "string") {
    const key = comparator;
    comparator = (element, value2) => element[key] === toValue(value2);
  }
  comparator = comparator != null ? comparator : (element, value2) => element === toValue(value2);
  return computed2(() => toValue(list).slice(formIndex).some((element, index, array) => comparator(toValue(element), toValue(value), index, toValue(array))));
}
function useArrayMap(list, fn) {
  return computed2(() => toValue(list).map((i) => toValue(i)).map(fn));
}
function useArrayReduce(list, reducer, ...args) {
  const reduceCallback = (sum, value, index) => reducer(toValue(sum), toValue(value), index);
  return computed2(() => {
    const resolved = toValue(list);
    return args.length ? resolved.reduce(reduceCallback, typeof args[0] === "function" ? toValue(args[0]()) : toValue(args[0])) : resolved.reduce(reduceCallback);
  });
}
function useArraySome(list, fn) {
  return computed2(() => toValue(list).some((element, index, array) => fn(toValue(element), index, array)));
}
function uniq(array) {
  return Array.from(new Set(array));
}
function uniqueElementsBy(array, fn) {
  return array.reduce((acc, v) => {
    if (!acc.some((x) => fn(v, x, array)))
      acc.push(v);
    return acc;
  }, []);
}
function useArrayUnique(list, compareFn) {
  return computed2(() => {
    const resolvedList = toValue(list).map((element) => toValue(element));
    return compareFn ? uniqueElementsBy(resolvedList, compareFn) : uniq(resolvedList);
  });
}
function useCounter(initialValue = 0, options = {}) {
  let _initialValue = unref(initialValue);
  const count = shallowRef(initialValue);
  const {
    max = Number.POSITIVE_INFINITY,
    min = Number.NEGATIVE_INFINITY
  } = options;
  const inc = (delta = 1) => count.value = Math.max(Math.min(max, count.value + delta), min);
  const dec = (delta = 1) => count.value = Math.min(Math.max(min, count.value - delta), max);
  const get = () => count.value;
  const set = (val) => count.value = Math.max(min, Math.min(max, val));
  const reset = (val = _initialValue) => {
    _initialValue = val;
    return set(val);
  };
  return { count: shallowReadonly(count), inc, dec, get, set, reset };
}
var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[T\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/i;
var REGEX_FORMAT = /[YMDHhms]o|\[([^\]]+)\]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a{1,2}|A{1,2}|m{1,2}|s{1,2}|Z{1,2}|z{1,4}|SSS/g;
function defaultMeridiem(hours, minutes, isLowercase, hasPeriod) {
  let m = hours < 12 ? "AM" : "PM";
  if (hasPeriod)
    m = m.split("").reduce((acc, curr) => acc += `${curr}.`, "");
  return isLowercase ? m.toLowerCase() : m;
}
function formatOrdinal(num) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}
function formatDate(date, formatStr, options = {}) {
  var _a;
  const years = date.getFullYear();
  const month = date.getMonth();
  const days = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  const day = date.getDay();
  const meridiem = (_a = options.customMeridiem) != null ? _a : defaultMeridiem;
  const stripTimeZone = (dateString) => {
    var _a2;
    return (_a2 = dateString.split(" ")[1]) != null ? _a2 : "";
  };
  const matches = {
    Yo: () => formatOrdinal(years),
    YY: () => String(years).slice(-2),
    YYYY: () => years,
    M: () => month + 1,
    Mo: () => formatOrdinal(month + 1),
    MM: () => `${month + 1}`.padStart(2, "0"),
    MMM: () => date.toLocaleDateString(toValue(options.locales), { month: "short" }),
    MMMM: () => date.toLocaleDateString(toValue(options.locales), { month: "long" }),
    D: () => String(days),
    Do: () => formatOrdinal(days),
    DD: () => `${days}`.padStart(2, "0"),
    H: () => String(hours),
    Ho: () => formatOrdinal(hours),
    HH: () => `${hours}`.padStart(2, "0"),
    h: () => `${hours % 12 || 12}`.padStart(1, "0"),
    ho: () => formatOrdinal(hours % 12 || 12),
    hh: () => `${hours % 12 || 12}`.padStart(2, "0"),
    m: () => String(minutes),
    mo: () => formatOrdinal(minutes),
    mm: () => `${minutes}`.padStart(2, "0"),
    s: () => String(seconds),
    so: () => formatOrdinal(seconds),
    ss: () => `${seconds}`.padStart(2, "0"),
    SSS: () => `${milliseconds}`.padStart(3, "0"),
    d: () => day,
    dd: () => date.toLocaleDateString(toValue(options.locales), { weekday: "narrow" }),
    ddd: () => date.toLocaleDateString(toValue(options.locales), { weekday: "short" }),
    dddd: () => date.toLocaleDateString(toValue(options.locales), { weekday: "long" }),
    A: () => meridiem(hours, minutes),
    AA: () => meridiem(hours, minutes, false, true),
    a: () => meridiem(hours, minutes, true),
    aa: () => meridiem(hours, minutes, true, true),
    z: () => stripTimeZone(date.toLocaleDateString(toValue(options.locales), { timeZoneName: "shortOffset" })),
    zz: () => stripTimeZone(date.toLocaleDateString(toValue(options.locales), { timeZoneName: "shortOffset" })),
    zzz: () => stripTimeZone(date.toLocaleDateString(toValue(options.locales), { timeZoneName: "shortOffset" })),
    zzzz: () => stripTimeZone(date.toLocaleDateString(toValue(options.locales), { timeZoneName: "longOffset" }))
  };
  return formatStr.replace(REGEX_FORMAT, (match, $1) => {
    var _a2, _b;
    return (_b = $1 != null ? $1 : (_a2 = matches[match]) == null ? undefined : _a2.call(matches)) != null ? _b : match;
  });
}
function normalizeDate(date) {
  if (date === null)
    return new Date(Number.NaN);
  if (date === undefined)
    return /* @__PURE__ */ new Date;
  if (date instanceof Date)
    return new Date(date);
  if (typeof date === "string" && !/Z$/i.test(date)) {
    const d = date.match(REGEX_PARSE);
    if (d) {
      const m = d[2] - 1 || 0;
      const ms = (d[7] || "0").substring(0, 3);
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
    }
  }
  return new Date(date);
}
function useDateFormat(date, formatStr = "HH:mm:ss", options = {}) {
  return computed2(() => formatDate(normalizeDate(toValue(date)), toValue(formatStr), options));
}
function useIntervalFn(cb, interval = 1000, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  let timer = null;
  const isActive = shallowRef(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    const intervalValue = toValue(interval);
    if (intervalValue <= 0)
      return;
    isActive.value = true;
    if (immediateCallback)
      cb();
    clean();
    if (isActive.value)
      timer = setInterval(cb, intervalValue);
  }
  if (immediate && isClient)
    resume();
  if (isRef(interval) || typeof interval === "function") {
    const stopWatch = watch2(interval, () => {
      if (isActive.value && isClient)
        resume();
    });
    tryOnScopeDispose(stopWatch);
  }
  tryOnScopeDispose(pause);
  return {
    isActive: shallowReadonly(isActive),
    pause,
    resume
  };
}
function useInterval(interval = 1000, options = {}) {
  const {
    controls: exposeControls = false,
    immediate = true,
    callback
  } = options;
  const counter = shallowRef(0);
  const update = () => counter.value += 1;
  const reset = () => {
    counter.value = 0;
  };
  const controls = useIntervalFn(callback ? () => {
    update();
    callback(counter.value);
  } : update, interval, { immediate });
  if (exposeControls) {
    return {
      counter: shallowReadonly(counter),
      reset,
      ...controls
    };
  } else {
    return shallowReadonly(counter);
  }
}
function useLastChanged(source, options = {}) {
  var _a;
  const ms = shallowRef((_a = options.initialValue) != null ? _a : null);
  watch2(source, () => ms.value = timestamp(), options);
  return shallowReadonly(ms);
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  const isPending = shallowRef(false);
  let timer;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  }
  function stop2() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    if (immediateCallback)
      cb();
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = undefined;
      cb(...args);
    }, toValue(interval));
  }
  if (immediate) {
    isPending.value = true;
    if (isClient)
      start();
  }
  tryOnScopeDispose(stop2);
  return {
    isPending: shallowReadonly(isPending),
    start,
    stop: stop2
  };
}
function useTimeout(interval = 1000, options = {}) {
  const {
    controls: exposeControls = false,
    callback
  } = options;
  const controls = useTimeoutFn(callback != null ? callback : noop, interval, options);
  const ready = computed2(() => !controls.isPending.value);
  if (exposeControls) {
    return {
      ready,
      ...controls
    };
  } else {
    return ready;
  }
}
function useToNumber(value, options = {}) {
  const {
    method = "parseFloat",
    radix,
    nanToZero
  } = options;
  return computed2(() => {
    let resolved = toValue(value);
    if (typeof method === "function")
      resolved = method(resolved);
    else if (typeof resolved === "string")
      resolved = Number[method](resolved, radix);
    if (nanToZero && Number.isNaN(resolved))
      resolved = 0;
    return resolved;
  });
}
function useToString(value) {
  return computed2(() => `${toValue(value)}`);
}
function useToggle(initialValue = false, options = {}) {
  const {
    truthyValue = true,
    falsyValue = false
  } = options;
  const valueIsRef = isRef(initialValue);
  const _value = shallowRef(initialValue);
  function toggle(value) {
    if (arguments.length) {
      _value.value = value;
      return _value.value;
    } else {
      const truthy = toValue(truthyValue);
      _value.value = _value.value === truthy ? toValue(falsyValue) : truthy;
      return _value.value;
    }
  }
  if (valueIsRef)
    return toggle;
  else
    return [_value, toggle];
}
function watchArray(source, cb, options) {
  let oldList = (options == null ? undefined : options.immediate) ? [] : [...typeof source === "function" ? source() : Array.isArray(source) ? source : toValue(source)];
  return watch2(source, (newList, _, onCleanup) => {
    const oldListRemains = Array.from({ length: oldList.length });
    const added = [];
    for (const obj of newList) {
      let found = false;
      for (let i = 0;i < oldList.length; i++) {
        if (!oldListRemains[i] && obj === oldList[i]) {
          oldListRemains[i] = true;
          found = true;
          break;
        }
      }
      if (!found)
        added.push(obj);
    }
    const removed = oldList.filter((_2, i) => !oldListRemains[i]);
    cb(newList, oldList, added, removed, onCleanup);
    oldList = [...newList];
  }, options);
}
function watchAtMost(source, cb, options) {
  const {
    count,
    ...watchOptions
  } = options;
  const current = shallowRef(0);
  const stop2 = watchWithFilter(source, (...args) => {
    current.value += 1;
    if (current.value >= toValue(count))
      nextTick(() => stop2());
    cb(...args);
  }, watchOptions);
  return { count: current, stop: stop2 };
}
function watchDebounced(source, cb, options = {}) {
  const {
    debounce = 0,
    maxWait = undefined,
    ...watchOptions
  } = options;
  return watchWithFilter(source, cb, {
    ...watchOptions,
    eventFilter: debounceFilter(debounce, { maxWait })
  });
}
function watchDeep(source, cb, options) {
  return watch2(source, cb, {
    ...options,
    deep: true
  });
}
function watchIgnorable(source, cb, options = {}) {
  const {
    eventFilter = bypassFilter,
    ...watchOptions
  } = options;
  const filteredCb = createFilterWrapper(eventFilter, cb);
  let ignoreUpdates;
  let ignorePrevAsyncUpdates;
  let stop2;
  if (watchOptions.flush === "sync") {
    let ignore = false;
    ignorePrevAsyncUpdates = () => {};
    ignoreUpdates = (updater) => {
      ignore = true;
      updater();
      ignore = false;
    };
    stop2 = watch2(source, (...args) => {
      if (!ignore)
        filteredCb(...args);
    }, watchOptions);
  } else {
    const disposables = [];
    let ignoreCounter = 0;
    let syncCounter = 0;
    ignorePrevAsyncUpdates = () => {
      ignoreCounter = syncCounter;
    };
    disposables.push(watch2(source, () => {
      syncCounter++;
    }, { ...watchOptions, flush: "sync" }));
    ignoreUpdates = (updater) => {
      const syncCounterPrev = syncCounter;
      updater();
      ignoreCounter += syncCounter - syncCounterPrev;
    };
    disposables.push(watch2(source, (...args) => {
      const ignore = ignoreCounter > 0 && ignoreCounter === syncCounter;
      ignoreCounter = 0;
      syncCounter = 0;
      if (ignore)
        return;
      filteredCb(...args);
    }, watchOptions));
    stop2 = () => {
      disposables.forEach((fn) => fn());
    };
  }
  return { stop: stop2, ignoreUpdates, ignorePrevAsyncUpdates };
}
function watchImmediate(source, cb, options) {
  return watch2(source, cb, {
    ...options,
    immediate: true
  });
}
function watchOnce(source, cb, options) {
  return watch2(source, cb, {
    ...options,
    once: true
  });
}
function watchThrottled(source, cb, options = {}) {
  const {
    throttle = 0,
    trailing = true,
    leading = true,
    ...watchOptions
  } = options;
  return watchWithFilter(source, cb, {
    ...watchOptions,
    eventFilter: throttleFilter(throttle, trailing, leading)
  });
}
function watchTriggerable(source, cb, options = {}) {
  let cleanupFn;
  function onEffect() {
    if (!cleanupFn)
      return;
    const fn = cleanupFn;
    cleanupFn = undefined;
    fn();
  }
  function onCleanup(callback) {
    cleanupFn = callback;
  }
  const _cb = (value, oldValue) => {
    onEffect();
    return cb(value, oldValue, onCleanup);
  };
  const res = watchIgnorable(source, _cb, options);
  const { ignoreUpdates } = res;
  const trigger2 = () => {
    let res2;
    ignoreUpdates(() => {
      res2 = _cb(getWatchSources(source), getOldValue(source));
    });
    return res2;
  };
  return {
    ...res,
    trigger: trigger2
  };
}
function getWatchSources(sources) {
  if (isReactive(sources))
    return sources;
  if (Array.isArray(sources))
    return sources.map((item) => toValue(item));
  return toValue(sources);
}
function getOldValue(source) {
  return Array.isArray(source) ? source.map(() => {
    return;
  }) : undefined;
}
function whenever(source, cb, options) {
  const stop2 = watch2(source, (v, ov, onInvalidate) => {
    if (v) {
      if (options == null ? undefined : options.once)
        nextTick(() => stop2());
      cb(v, ov, onInvalidate);
    }
  }, {
    ...options,
    once: false
  });
  return stop2;
}
// ../../../../node_modules/@vueuse/core/index.mjs
function computedAsync(evaluationCallback, initialState, optionsOrRef) {
  let options;
  if (isRef(optionsOrRef)) {
    options = {
      evaluating: optionsOrRef
    };
  } else {
    options = optionsOrRef || {};
  }
  const {
    lazy = false,
    flush = "pre",
    evaluating = undefined,
    shallow = true,
    onError = noop
  } = options;
  const started = shallowRef(!lazy);
  const current = shallow ? shallowRef(initialState) : ref(initialState);
  let counter = 0;
  watchEffect(async (onInvalidate) => {
    if (!started.value)
      return;
    counter++;
    const counterAtBeginning = counter;
    let hasFinished = false;
    if (evaluating) {
      Promise.resolve().then(() => {
        evaluating.value = true;
      });
    }
    try {
      const result = await evaluationCallback((cancelCallback) => {
        onInvalidate(() => {
          if (evaluating)
            evaluating.value = false;
          if (!hasFinished)
            cancelCallback();
        });
      });
      if (counterAtBeginning === counter)
        current.value = result;
    } catch (e) {
      onError(e);
    } finally {
      if (evaluating && counterAtBeginning === counter)
        evaluating.value = false;
      hasFinished = true;
    }
  }, { flush });
  if (lazy) {
    return computed2(() => {
      started.value = true;
      return current.value;
    });
  } else {
    return current;
  }
}
function computedInject(key, options, defaultSource, treatDefaultAsFactory) {
  let source = inject(key);
  if (defaultSource)
    source = inject(key, defaultSource);
  if (treatDefaultAsFactory)
    source = inject(key, defaultSource, treatDefaultAsFactory);
  if (typeof options === "function") {
    return computed2((oldValue) => options(source, oldValue));
  } else {
    return computed2({
      get: (oldValue) => options.get(source, oldValue),
      set: options.set
    });
  }
}
function createReusableTemplate(options = {}) {
  const {
    inheritAttrs = true
  } = options;
  const render = shallowRef();
  const define = /* @__PURE__ */ defineComponent({
    setup(_, { slots }) {
      return () => {
        render.value = slots.default;
      };
    }
  });
  const reuse = /* @__PURE__ */ defineComponent({
    inheritAttrs,
    props: options.props,
    setup(props, { attrs, slots }) {
      return () => {
        var _a;
        if (!render.value && true)
          throw new Error("[VueUse] Failed to find the definition of reusable template");
        const vnode = (_a = render.value) == null ? undefined : _a.call(render, {
          ...options.props == null ? keysToCamelKebabCase(attrs) : props,
          $slots: slots
        });
        return inheritAttrs && (vnode == null ? undefined : vnode.length) === 1 ? vnode[0] : vnode;
      };
    }
  });
  return makeDestructurable({ define, reuse }, [define, reuse]);
}
function keysToCamelKebabCase(obj) {
  const newObj = {};
  for (const key in obj)
    newObj[camelize2(key)] = obj[key];
  return newObj;
}
function createTemplatePromise(options = {}) {
  let index = 0;
  const instances = ref([]);
  function create(...args) {
    const props = shallowReactive({
      key: index++,
      args,
      promise: undefined,
      resolve: () => {},
      reject: () => {},
      isResolving: false,
      options
    });
    instances.value.push(props);
    props.promise = new Promise((_resolve, _reject) => {
      props.resolve = (v) => {
        props.isResolving = true;
        return _resolve(v);
      };
      props.reject = _reject;
    }).finally(() => {
      props.promise = undefined;
      const index2 = instances.value.indexOf(props);
      if (index2 !== -1)
        instances.value.splice(index2, 1);
    });
    return props.promise;
  }
  function start(...args) {
    if (options.singleton && instances.value.length > 0)
      return instances.value[0].promise;
    return create(...args);
  }
  const component = /* @__PURE__ */ defineComponent((_, { slots }) => {
    const renderList = () => instances.value.map((props) => {
      var _a;
      return h(Fragment, { key: props.key }, (_a = slots.default) == null ? undefined : _a.call(slots, props));
    });
    if (options.transition)
      return () => h(TransitionGroup, options.transition, renderList);
    return renderList;
  });
  component.start = start;
  return component;
}
function createUnrefFn(fn) {
  return function(...args) {
    return fn.apply(this, args.map((i) => toValue(i)));
  };
}
var defaultWindow = isClient ? window : undefined;
var defaultDocument = isClient ? window.document : undefined;
var defaultNavigator = isClient ? window.navigator : undefined;
var defaultLocation = isClient ? window.location : undefined;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? undefined : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed2(() => {
    const test = toArray(toValue(args[0])).filter((e) => e != null);
    return test.every((e) => typeof e !== "string") ? test : undefined;
  });
  const stopWatch = watchImmediate(() => {
    var _a, _b;
    return [
      (_b = (_a = firstParamTargets.value) == null ? undefined : _a.map((e) => unrefElement(e))) != null ? _b : [defaultWindow].filter((e) => e != null),
      toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
      toArray(unref(firstParamTargets.value ? args[2] : args[1])),
      toValue(firstParamTargets.value ? args[3] : args[2])
    ];
  }, ([raw_targets, raw_events, raw_listeners, raw_options]) => {
    cleanup();
    if (!(raw_targets == null ? undefined : raw_targets.length) || !(raw_events == null ? undefined : raw_events.length) || !(raw_listeners == null ? undefined : raw_listeners.length))
      return;
    const optionsClone = isObject2(raw_options) ? { ...raw_options } : raw_options;
    cleanups.push(...raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone)))));
  }, { flush: "post" });
  const stop2 = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(cleanup);
  return stop2;
}
var _iOSWorkaround = false;
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false, controls = false } = options;
  if (!window2) {
    return controls ? { stop: noop, cancel: noop, trigger: noop } : noop;
  }
  if (isIOS && !_iOSWorkaround) {
    _iOSWorkaround = true;
    const listenerOptions = { passive: true };
    Array.from(window2.document.body.children).forEach((el) => el.addEventListener("click", noop, listenerOptions));
    window2.document.documentElement.addEventListener("click", noop, listenerOptions);
  }
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return toValue(ignore).some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  function hasMultipleRoots(target2) {
    const vm = toValue(target2);
    return vm && vm.$.subTree.shapeFlag === 16;
  }
  function checkMultipleRoots(target2, event) {
    const vm = toValue(target2);
    const children = vm.$.subTree && vm.$.subTree.children;
    if (children == null || !Array.isArray(children))
      return false;
    return children.some((child) => child.el === event.target || event.composedPath().includes(child.el));
  }
  const listener = (event) => {
    const el = unrefElement(target);
    if (event.target == null)
      return;
    if (!(el instanceof Element) && hasMultipleRoots(target) && checkMultipleRoots(target, event))
      return;
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if ("detail" in event && event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  let isProcessingClick = false;
  const cleanup = [
    useEventListener(window2, "click", (event) => {
      if (!isProcessingClick) {
        isProcessingClick = true;
        setTimeout(() => {
          isProcessingClick = false;
        }, 0);
        listener(event);
      }
    }, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      setTimeout(() => {
        var _a;
        const el = unrefElement(target);
        if (((_a = window2.document.activeElement) == null ? undefined : _a.tagName) === "IFRAME" && !(el == null ? undefined : el.contains(window2.document.activeElement))) {
          handler(event);
        }
      }, 0);
    }, { passive: true })
  ].filter(Boolean);
  const stop2 = () => cleanup.forEach((fn) => fn());
  if (controls) {
    return {
      stop: stop2,
      cancel: () => {
        shouldListen = false;
      },
      trigger: (event) => {
        shouldListen = true;
        listener(event);
        shouldListen = false;
      }
    };
  }
  return stop2;
}
function useMounted() {
  const isMounted = shallowRef(false);
  const instance = getCurrentInstance();
  if (instance) {
    onMounted(() => {
      isMounted.value = true;
    }, instance);
  }
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed2(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useMutationObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...mutationOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && ("MutationObserver" in window2));
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };
  const targets = computed2(() => {
    const value = toValue(target);
    const items = toArray(value).map(unrefElement).filter(notNullish);
    return new Set(items);
  });
  const stopWatch = watch2(() => targets.value, (targets2) => {
    cleanup();
    if (isSupported.value && targets2.size) {
      observer = new MutationObserver(callback);
      targets2.forEach((el) => observer.observe(el, mutationOptions));
    }
  }, { immediate: true, flush: "post" });
  const takeRecords = () => {
    return observer == null ? undefined : observer.takeRecords();
  };
  const stop2 = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop2);
  return {
    isSupported,
    stop: stop2,
    takeRecords
  };
}
function onElementRemoval(target, callback, options = {}) {
  const {
    window: window2 = defaultWindow,
    document: document2 = window2 == null ? undefined : window2.document,
    flush = "sync"
  } = options;
  if (!window2 || !document2)
    return noop;
  let stopFn;
  const cleanupAndUpdate = (fn) => {
    stopFn == null || stopFn();
    stopFn = fn;
  };
  const stopWatch = watchEffect(() => {
    const el = unrefElement(target);
    if (el) {
      const { stop: stop2 } = useMutationObserver(document2, (mutationsList) => {
        const targetRemoved = mutationsList.map((mutation) => [...mutation.removedNodes]).flat().some((node) => node === el || node.contains(el));
        if (targetRemoved) {
          callback(mutationsList);
        }
      }, {
        window: window2,
        childList: true,
        subtree: true
      });
      cleanupAndUpdate(stop2);
    }
  }, { flush });
  const stopHandle = () => {
    stopWatch();
    cleanupAndUpdate();
  };
  tryOnScopeDispose(stopHandle);
  return stopHandle;
}
function createKeyPredicate(keyFilter) {
  if (typeof keyFilter === "function")
    return keyFilter;
  else if (typeof keyFilter === "string")
    return (event) => event.key === keyFilter;
  else if (Array.isArray(keyFilter))
    return (event) => keyFilter.includes(event.key);
  return () => true;
}
function onKeyStroke(...args) {
  let key;
  let handler;
  let options = {};
  if (args.length === 3) {
    key = args[0];
    handler = args[1];
    options = args[2];
  } else if (args.length === 2) {
    if (typeof args[1] === "object") {
      key = true;
      handler = args[0];
      options = args[1];
    } else {
      key = args[0];
      handler = args[1];
    }
  } else {
    key = true;
    handler = args[0];
  }
  const {
    target = defaultWindow,
    eventName = "keydown",
    passive = false,
    dedupe = false
  } = options;
  const predicate = createKeyPredicate(key);
  const listener = (e) => {
    if (e.repeat && toValue(dedupe))
      return;
    if (predicate(e))
      handler(e);
  };
  return useEventListener(target, eventName, listener, passive);
}
function onKeyDown(key, handler, options = {}) {
  return onKeyStroke(key, handler, { ...options, eventName: "keydown" });
}
function onKeyPressed(key, handler, options = {}) {
  return onKeyStroke(key, handler, { ...options, eventName: "keypress" });
}
function onKeyUp(key, handler, options = {}) {
  return onKeyStroke(key, handler, { ...options, eventName: "keyup" });
}
var DEFAULT_DELAY = 500;
var DEFAULT_THRESHOLD = 10;
function onLongPress(target, handler, options) {
  var _a, _b;
  const elementRef = computed2(() => unrefElement(target));
  let timeout;
  let posStart;
  let startTimestamp;
  let hasLongPressed = false;
  function clear() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    posStart = undefined;
    startTimestamp = undefined;
    hasLongPressed = false;
  }
  function onRelease(ev) {
    var _a2, _b2, _c;
    const [_startTimestamp, _posStart, _hasLongPressed] = [startTimestamp, posStart, hasLongPressed];
    clear();
    if (!(options == null ? undefined : options.onMouseUp) || !_posStart || !_startTimestamp)
      return;
    if (((_a2 = options == null ? undefined : options.modifiers) == null ? undefined : _a2.self) && ev.target !== elementRef.value)
      return;
    if ((_b2 = options == null ? undefined : options.modifiers) == null ? undefined : _b2.prevent)
      ev.preventDefault();
    if ((_c = options == null ? undefined : options.modifiers) == null ? undefined : _c.stop)
      ev.stopPropagation();
    const dx = ev.x - _posStart.x;
    const dy = ev.y - _posStart.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    options.onMouseUp(ev.timeStamp - _startTimestamp, distance, _hasLongPressed);
  }
  function onDown(ev) {
    var _a2, _b2, _c, _d;
    if (((_a2 = options == null ? undefined : options.modifiers) == null ? undefined : _a2.self) && ev.target !== elementRef.value)
      return;
    clear();
    if ((_b2 = options == null ? undefined : options.modifiers) == null ? undefined : _b2.prevent)
      ev.preventDefault();
    if ((_c = options == null ? undefined : options.modifiers) == null ? undefined : _c.stop)
      ev.stopPropagation();
    posStart = {
      x: ev.x,
      y: ev.y
    };
    startTimestamp = ev.timeStamp;
    timeout = setTimeout(() => {
      hasLongPressed = true;
      handler(ev);
    }, (_d = options == null ? undefined : options.delay) != null ? _d : DEFAULT_DELAY);
  }
  function onMove(ev) {
    var _a2, _b2, _c, _d;
    if (((_a2 = options == null ? undefined : options.modifiers) == null ? undefined : _a2.self) && ev.target !== elementRef.value)
      return;
    if (!posStart || (options == null ? undefined : options.distanceThreshold) === false)
      return;
    if ((_b2 = options == null ? undefined : options.modifiers) == null ? undefined : _b2.prevent)
      ev.preventDefault();
    if ((_c = options == null ? undefined : options.modifiers) == null ? undefined : _c.stop)
      ev.stopPropagation();
    const dx = ev.x - posStart.x;
    const dy = ev.y - posStart.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance >= ((_d = options == null ? undefined : options.distanceThreshold) != null ? _d : DEFAULT_THRESHOLD))
      clear();
  }
  const listenerOptions = {
    capture: (_a = options == null ? undefined : options.modifiers) == null ? undefined : _a.capture,
    once: (_b = options == null ? undefined : options.modifiers) == null ? undefined : _b.once
  };
  const cleanup = [
    useEventListener(elementRef, "pointerdown", onDown, listenerOptions),
    useEventListener(elementRef, "pointermove", onMove, listenerOptions),
    useEventListener(elementRef, ["pointerup", "pointerleave"], onRelease, listenerOptions)
  ];
  const stop2 = () => cleanup.forEach((fn) => fn());
  return stop2;
}
function isFocusedElementEditable() {
  const { activeElement, body } = document;
  if (!activeElement)
    return false;
  if (activeElement === body)
    return false;
  switch (activeElement.tagName) {
    case "INPUT":
    case "TEXTAREA":
      return true;
  }
  return activeElement.hasAttribute("contenteditable");
}
function isTypedCharValid({
  keyCode,
  metaKey,
  ctrlKey,
  altKey
}) {
  if (metaKey || ctrlKey || altKey)
    return false;
  if (keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105)
    return true;
  if (keyCode >= 65 && keyCode <= 90)
    return true;
  return false;
}
function onStartTyping(callback, options = {}) {
  const { document: document2 = defaultDocument } = options;
  const keydown = (event) => {
    if (!isFocusedElementEditable() && isTypedCharValid(event)) {
      callback(event);
    }
  };
  if (document2)
    useEventListener(document2, "keydown", keydown, { passive: true });
}
function templateRef(key, initialValue = null) {
  const instance = getCurrentInstance();
  let _trigger = () => {};
  const element = customRef((track2, trigger2) => {
    _trigger = trigger2;
    return {
      get() {
        var _a, _b;
        track2();
        return (_b = (_a = instance == null ? undefined : instance.proxy) == null ? undefined : _a.$refs[key]) != null ? _b : initialValue;
      },
      set() {}
    };
  });
  tryOnMounted(_trigger);
  onUpdated(_trigger);
  return element;
}
function useActiveElement(options = {}) {
  var _a;
  const {
    window: window2 = defaultWindow,
    deep = true,
    triggerOnRemoval = false
  } = options;
  const document2 = (_a = options.document) != null ? _a : window2 == null ? undefined : window2.document;
  const getDeepActiveElement = () => {
    var _a2;
    let element = document2 == null ? undefined : document2.activeElement;
    if (deep) {
      while (element == null ? undefined : element.shadowRoot)
        element = (_a2 = element == null ? undefined : element.shadowRoot) == null ? undefined : _a2.activeElement;
    }
    return element;
  };
  const activeElement = shallowRef();
  const trigger2 = () => {
    activeElement.value = getDeepActiveElement();
  };
  if (window2) {
    const listenerOptions = {
      capture: true,
      passive: true
    };
    useEventListener(window2, "blur", (event) => {
      if (event.relatedTarget !== null)
        return;
      trigger2();
    }, listenerOptions);
    useEventListener(window2, "focus", trigger2, listenerOptions);
  }
  if (triggerOnRemoval) {
    onElementRemoval(activeElement, trigger2, { document: document2 });
  }
  trigger2();
  return activeElement;
}
function useRafFn(fn, options = {}) {
  const {
    immediate = true,
    fpsLimit = undefined,
    window: window2 = defaultWindow,
    once = false
  } = options;
  const isActive = shallowRef(false);
  const intervalLimit = computed2(() => {
    return fpsLimit ? 1000 / toValue(fpsLimit) : null;
  });
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp2) {
    if (!isActive.value || !window2)
      return;
    if (!previousFrameTimestamp)
      previousFrameTimestamp = timestamp2;
    const delta = timestamp2 - previousFrameTimestamp;
    if (intervalLimit.value && delta < intervalLimit.value) {
      rafId = window2.requestAnimationFrame(loop);
      return;
    }
    previousFrameTimestamp = timestamp2;
    fn({ delta, timestamp: timestamp2 });
    if (once) {
      isActive.value = false;
      rafId = null;
      return;
    }
    rafId = window2.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      previousFrameTimestamp = 0;
      rafId = window2.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}
function useAnimate(target, keyframes, options) {
  let config;
  let animateOptions;
  if (isObject2(options)) {
    config = options;
    animateOptions = objectOmit(options, ["window", "immediate", "commitStyles", "persist", "onReady", "onError"]);
  } else {
    config = { duration: options };
    animateOptions = options;
  }
  const {
    window: window2 = defaultWindow,
    immediate = true,
    commitStyles,
    persist,
    playbackRate: _playbackRate = 1,
    onReady,
    onError = (e) => {
      console.error(e);
    }
  } = config;
  const isSupported = useSupported(() => window2 && HTMLElement && ("animate" in HTMLElement.prototype));
  const animate = shallowRef(undefined);
  const store = shallowReactive({
    startTime: null,
    currentTime: null,
    timeline: null,
    playbackRate: _playbackRate,
    pending: false,
    playState: immediate ? "idle" : "paused",
    replaceState: "active"
  });
  const pending = computed2(() => store.pending);
  const playState = computed2(() => store.playState);
  const replaceState = computed2(() => store.replaceState);
  const startTime = computed2({
    get() {
      return store.startTime;
    },
    set(value) {
      store.startTime = value;
      if (animate.value)
        animate.value.startTime = value;
    }
  });
  const currentTime = computed2({
    get() {
      return store.currentTime;
    },
    set(value) {
      store.currentTime = value;
      if (animate.value) {
        animate.value.currentTime = value;
        syncResume();
      }
    }
  });
  const timeline = computed2({
    get() {
      return store.timeline;
    },
    set(value) {
      store.timeline = value;
      if (animate.value)
        animate.value.timeline = value;
    }
  });
  const playbackRate = computed2({
    get() {
      return store.playbackRate;
    },
    set(value) {
      store.playbackRate = value;
      if (animate.value)
        animate.value.playbackRate = value;
    }
  });
  const play = () => {
    if (animate.value) {
      try {
        animate.value.play();
        syncResume();
      } catch (e) {
        syncPause();
        onError(e);
      }
    } else {
      update();
    }
  };
  const pause = () => {
    var _a;
    try {
      (_a = animate.value) == null || _a.pause();
      syncPause();
    } catch (e) {
      onError(e);
    }
  };
  const reverse = () => {
    var _a;
    if (!animate.value)
      update();
    try {
      (_a = animate.value) == null || _a.reverse();
      syncResume();
    } catch (e) {
      syncPause();
      onError(e);
    }
  };
  const finish = () => {
    var _a;
    try {
      (_a = animate.value) == null || _a.finish();
      syncPause();
    } catch (e) {
      onError(e);
    }
  };
  const cancel = () => {
    var _a;
    try {
      (_a = animate.value) == null || _a.cancel();
      syncPause();
    } catch (e) {
      onError(e);
    }
  };
  watch2(() => unrefElement(target), (el) => {
    if (el) {
      update();
    } else {
      animate.value = undefined;
    }
  });
  watch2(() => keyframes, (value) => {
    if (animate.value) {
      update();
      const targetEl = unrefElement(target);
      if (targetEl) {
        animate.value.effect = new KeyframeEffect(targetEl, toValue(value), animateOptions);
      }
    }
  }, { deep: true });
  tryOnMounted(() => update(true), false);
  tryOnScopeDispose(cancel);
  function update(init) {
    const el = unrefElement(target);
    if (!isSupported.value || !el)
      return;
    if (!animate.value)
      animate.value = el.animate(toValue(keyframes), animateOptions);
    if (persist)
      animate.value.persist();
    if (_playbackRate !== 1)
      animate.value.playbackRate = _playbackRate;
    if (init && !immediate)
      animate.value.pause();
    else
      syncResume();
    onReady == null || onReady(animate.value);
  }
  const listenerOptions = { passive: true };
  useEventListener(animate, ["cancel", "finish", "remove"], syncPause, listenerOptions);
  useEventListener(animate, "finish", () => {
    var _a;
    if (commitStyles)
      (_a = animate.value) == null || _a.commitStyles();
  }, listenerOptions);
  const { resume: resumeRef, pause: pauseRef } = useRafFn(() => {
    if (!animate.value)
      return;
    store.pending = animate.value.pending;
    store.playState = animate.value.playState;
    store.replaceState = animate.value.replaceState;
    store.startTime = animate.value.startTime;
    store.currentTime = animate.value.currentTime;
    store.timeline = animate.value.timeline;
    store.playbackRate = animate.value.playbackRate;
  }, { immediate: false });
  function syncResume() {
    if (isSupported.value)
      resumeRef();
  }
  function syncPause() {
    if (isSupported.value && window2)
      window2.requestAnimationFrame(pauseRef);
  }
  return {
    isSupported,
    animate,
    play,
    pause,
    reverse,
    finish,
    cancel,
    pending,
    playState,
    replaceState,
    startTime,
    currentTime,
    timeline,
    playbackRate
  };
}
function useAsyncQueue(tasks, options) {
  const {
    interrupt = true,
    onError = noop,
    onFinished = noop,
    signal
  } = options || {};
  const promiseState = {
    aborted: "aborted",
    fulfilled: "fulfilled",
    pending: "pending",
    rejected: "rejected"
  };
  const initialResult = Array.from(Array.from({ length: tasks.length }), () => ({ state: promiseState.pending, data: null }));
  const result = reactive(initialResult);
  const activeIndex = shallowRef(-1);
  if (!tasks || tasks.length === 0) {
    onFinished();
    return {
      activeIndex,
      result
    };
  }
  function updateResult(state, res) {
    activeIndex.value++;
    result[activeIndex.value].data = res;
    result[activeIndex.value].state = state;
  }
  tasks.reduce((prev, curr) => {
    return prev.then((prevRes) => {
      var _a;
      if (signal == null ? undefined : signal.aborted) {
        updateResult(promiseState.aborted, new Error("aborted"));
        return;
      }
      if (((_a = result[activeIndex.value]) == null ? undefined : _a.state) === promiseState.rejected && interrupt) {
        onFinished();
        return;
      }
      const done = curr(prevRes).then((currentRes) => {
        updateResult(promiseState.fulfilled, currentRes);
        if (activeIndex.value === tasks.length - 1)
          onFinished();
        return currentRes;
      });
      if (!signal)
        return done;
      return Promise.race([done, whenAborted(signal)]);
    }).catch((e) => {
      if (signal == null ? undefined : signal.aborted) {
        updateResult(promiseState.aborted, e);
        return e;
      }
      updateResult(promiseState.rejected, e);
      onError();
      return e;
    });
  }, Promise.resolve());
  return {
    activeIndex,
    result
  };
}
function whenAborted(signal) {
  return new Promise((resolve, reject) => {
    const error = new Error("aborted");
    if (signal.aborted)
      reject(error);
    else
      signal.addEventListener("abort", () => reject(error), { once: true });
  });
}
function useAsyncState(promise, initialState, options) {
  const {
    immediate = true,
    delay = 0,
    onError = noop,
    onSuccess = noop,
    resetOnExecute = true,
    shallow = true,
    throwError
  } = options != null ? options : {};
  const state = shallow ? shallowRef(initialState) : ref(initialState);
  const isReady = shallowRef(false);
  const isLoading = shallowRef(false);
  const error = shallowRef(undefined);
  async function execute(delay2 = 0, ...args) {
    if (resetOnExecute)
      state.value = initialState;
    error.value = undefined;
    isReady.value = false;
    isLoading.value = true;
    if (delay2 > 0)
      await promiseTimeout(delay2);
    const _promise = typeof promise === "function" ? promise(...args) : promise;
    try {
      const data = await _promise;
      state.value = data;
      isReady.value = true;
      onSuccess(data);
    } catch (e) {
      error.value = e;
      onError(e);
      if (throwError)
        throw e;
    } finally {
      isLoading.value = false;
    }
    return state.value;
  }
  if (immediate) {
    execute(delay);
  }
  const shell = {
    state,
    isReady,
    isLoading,
    error,
    execute,
    executeImmediate: (...args) => execute(0, ...args)
  };
  function waitUntilIsLoaded() {
    return new Promise((resolve, reject) => {
      until(isLoading).toBe(false).then(() => resolve(shell)).catch(reject);
    });
  }
  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return waitUntilIsLoaded().then(onFulfilled, onRejected);
    }
  };
}
var defaults = {
  array: (v) => JSON.stringify(v),
  object: (v) => JSON.stringify(v),
  set: (v) => JSON.stringify(Array.from(v)),
  map: (v) => JSON.stringify(Object.fromEntries(v)),
  null: () => ""
};
function getDefaultSerialization(target) {
  if (!target)
    return defaults.null;
  if (target instanceof Map)
    return defaults.map;
  else if (target instanceof Set)
    return defaults.set;
  else if (Array.isArray(target))
    return defaults.array;
  else
    return defaults.object;
}
function useBase64(target, options) {
  const base64 = shallowRef("");
  const promise = shallowRef();
  function execute() {
    if (!isClient)
      return;
    promise.value = new Promise((resolve, reject) => {
      try {
        const _target = toValue(target);
        if (_target == null) {
          resolve("");
        } else if (typeof _target === "string") {
          resolve(blobToBase64(new Blob([_target], { type: "text/plain" })));
        } else if (_target instanceof Blob) {
          resolve(blobToBase64(_target));
        } else if (_target instanceof ArrayBuffer) {
          resolve(window.btoa(String.fromCharCode(...new Uint8Array(_target))));
        } else if (_target instanceof HTMLCanvasElement) {
          resolve(_target.toDataURL(options == null ? undefined : options.type, options == null ? undefined : options.quality));
        } else if (_target instanceof HTMLImageElement) {
          const img = _target.cloneNode(false);
          img.crossOrigin = "Anonymous";
          imgLoaded(img).then(() => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL(options == null ? undefined : options.type, options == null ? undefined : options.quality));
          }).catch(reject);
        } else if (typeof _target === "object") {
          const _serializeFn = (options == null ? undefined : options.serializer) || getDefaultSerialization(_target);
          const serialized = _serializeFn(_target);
          return resolve(blobToBase64(new Blob([serialized], { type: "application/json" })));
        } else {
          reject(new Error("target is unsupported types"));
        }
      } catch (error) {
        reject(error);
      }
    });
    promise.value.then((res) => {
      base64.value = (options == null ? undefined : options.dataUrl) === false ? res.replace(/^data:.*?;base64,/, "") : res;
    });
    return promise.value;
  }
  if (isRef(target) || typeof target === "function")
    watch2(target, execute, { immediate: true });
  else
    execute();
  return {
    base64,
    promise,
    execute
  };
}
function imgLoaded(img) {
  return new Promise((resolve, reject) => {
    if (!img.complete) {
      img.onload = () => {
        resolve();
      };
      img.onerror = reject;
    } else {
      resolve();
    }
  });
}
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader;
    fr.onload = (e) => {
      resolve(e.target.result);
    };
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}
function useBattery(options = {}) {
  const { navigator: navigator2 = defaultNavigator } = options;
  const events = ["chargingchange", "chargingtimechange", "dischargingtimechange", "levelchange"];
  const isSupported = useSupported(() => navigator2 && ("getBattery" in navigator2) && typeof navigator2.getBattery === "function");
  const charging = shallowRef(false);
  const chargingTime = shallowRef(0);
  const dischargingTime = shallowRef(0);
  const level = shallowRef(1);
  let battery;
  function updateBatteryInfo() {
    charging.value = this.charging;
    chargingTime.value = this.chargingTime || 0;
    dischargingTime.value = this.dischargingTime || 0;
    level.value = this.level;
  }
  if (isSupported.value) {
    navigator2.getBattery().then((_battery) => {
      battery = _battery;
      updateBatteryInfo.call(battery);
      useEventListener(battery, events, updateBatteryInfo, { passive: true });
    });
  }
  return {
    isSupported,
    charging,
    chargingTime,
    dischargingTime,
    level
  };
}
function useBluetooth(options) {
  let {
    acceptAllDevices = false
  } = options || {};
  const {
    filters = undefined,
    optionalServices = undefined,
    navigator: navigator2 = defaultNavigator
  } = options || {};
  const isSupported = useSupported(() => navigator2 && ("bluetooth" in navigator2));
  const device = shallowRef();
  const error = shallowRef(null);
  watch2(device, () => {
    connectToBluetoothGATTServer();
  });
  async function requestDevice() {
    if (!isSupported.value)
      return;
    error.value = null;
    if (filters && filters.length > 0)
      acceptAllDevices = false;
    try {
      device.value = await (navigator2 == null ? undefined : navigator2.bluetooth.requestDevice({
        acceptAllDevices,
        filters,
        optionalServices
      }));
    } catch (err) {
      error.value = err;
    }
  }
  const server = shallowRef();
  const isConnected = shallowRef(false);
  function reset() {
    isConnected.value = false;
    device.value = undefined;
    server.value = undefined;
  }
  async function connectToBluetoothGATTServer() {
    error.value = null;
    if (device.value && device.value.gatt) {
      useEventListener(device, "gattserverdisconnected", reset, { passive: true });
      try {
        server.value = await device.value.gatt.connect();
        isConnected.value = server.value.connected;
      } catch (err) {
        error.value = err;
      }
    }
  }
  tryOnMounted(() => {
    var _a;
    if (device.value)
      (_a = device.value.gatt) == null || _a.connect();
  });
  tryOnScopeDispose(() => {
    var _a;
    if (device.value)
      (_a = device.value.gatt) == null || _a.disconnect();
  });
  return {
    isSupported,
    isConnected: readonly(isConnected),
    device,
    requestDevice,
    server,
    error
  };
}
var ssrWidthSymbol = Symbol("vueuse-ssr-width");
function useSSRWidth() {
  const ssrWidth = hasInjectionContext() ? injectLocal(ssrWidthSymbol, null) : null;
  return typeof ssrWidth === "number" ? ssrWidth : undefined;
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow, ssrWidth = useSSRWidth() } = options;
  const isSupported = useSupported(() => window2 && ("matchMedia" in window2) && typeof window2.matchMedia === "function");
  const ssrSupport = shallowRef(typeof ssrWidth === "number");
  const mediaQuery = shallowRef();
  const matches = shallowRef(false);
  const handler = (event) => {
    matches.value = event.matches;
  };
  watchEffect(() => {
    if (ssrSupport.value) {
      ssrSupport.value = !isSupported.value;
      const queryStrings = toValue(query).split(",");
      matches.value = queryStrings.some((queryString) => {
        const not = queryString.includes("not all");
        const minWidth = queryString.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        const maxWidth = queryString.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        let res = Boolean(minWidth || maxWidth);
        if (minWidth && res) {
          res = ssrWidth >= pxValue(minWidth[1]);
        }
        if (maxWidth && res) {
          res = ssrWidth <= pxValue(maxWidth[1]);
        }
        return not ? !res : res;
      });
      return;
    }
    if (!isSupported.value)
      return;
    mediaQuery.value = window2.matchMedia(toValue(query));
    matches.value = mediaQuery.value.matches;
  });
  useEventListener(mediaQuery, "change", handler, { passive: true });
  return computed2(() => matches.value);
}
var breakpointsTailwind = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
};
var breakpointsBootstrapV5 = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};
var breakpointsVuetifyV2 = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1264,
  xl: 1904
};
var breakpointsVuetify = breakpointsVuetifyV2;
var breakpointsAntDesign = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
};
var breakpointsQuasar = {
  xs: 0,
  sm: 600,
  md: 1024,
  lg: 1440,
  xl: 1920
};
var breakpointsSematic = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop4K: 2560
};
var breakpointsMasterCss = {
  "3xs": 360,
  "2xs": 480,
  xs: 600,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
  "2xl": 1600,
  "3xl": 1920,
  "4xl": 2560
};
function useBreakpoints(breakpoints, options = {}) {
  function getValue(k, delta) {
    let v = toValue(breakpoints[toValue(k)]);
    if (delta != null)
      v = increaseWithUnit(v, delta);
    if (typeof v === "number")
      v = `${v}px`;
    return v;
  }
  const { window: window2 = defaultWindow, strategy = "min-width", ssrWidth = useSSRWidth() } = options;
  const ssrSupport = typeof ssrWidth === "number";
  const mounted = ssrSupport ? shallowRef(false) : { value: true };
  if (ssrSupport) {
    tryOnMounted(() => mounted.value = !!window2);
  }
  function match(query, size) {
    if (!mounted.value && ssrSupport) {
      return query === "min" ? ssrWidth >= pxValue(size) : ssrWidth <= pxValue(size);
    }
    if (!window2)
      return false;
    return window2.matchMedia(`(${query}-width: ${size})`).matches;
  }
  const greaterOrEqual = (k) => {
    return useMediaQuery(() => `(min-width: ${getValue(k)})`, options);
  };
  const smallerOrEqual = (k) => {
    return useMediaQuery(() => `(max-width: ${getValue(k)})`, options);
  };
  const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
    Object.defineProperty(shortcuts, k, {
      get: () => strategy === "min-width" ? greaterOrEqual(k) : smallerOrEqual(k),
      enumerable: true,
      configurable: true
    });
    return shortcuts;
  }, {});
  function current() {
    const points = Object.keys(breakpoints).map((k) => [k, shortcutMethods[k], pxValue(getValue(k))]).sort((a, b) => a[2] - b[2]);
    return computed2(() => points.filter(([, v]) => v.value).map(([k]) => k));
  }
  return Object.assign(shortcutMethods, {
    greaterOrEqual,
    smallerOrEqual,
    greater(k) {
      return useMediaQuery(() => `(min-width: ${getValue(k, 0.1)})`, options);
    },
    smaller(k) {
      return useMediaQuery(() => `(max-width: ${getValue(k, -0.1)})`, options);
    },
    between(a, b) {
      return useMediaQuery(() => `(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`, options);
    },
    isGreater(k) {
      return match("min", getValue(k, 0.1));
    },
    isGreaterOrEqual(k) {
      return match("min", getValue(k));
    },
    isSmaller(k) {
      return match("max", getValue(k, -0.1));
    },
    isSmallerOrEqual(k) {
      return match("max", getValue(k));
    },
    isInBetween(a, b) {
      return match("min", getValue(a)) && match("max", getValue(b, -0.1));
    },
    current,
    active() {
      const bps = current();
      return computed2(() => bps.value.length === 0 ? "" : bps.value.at(strategy === "min-width" ? -1 : 0));
    }
  });
}
function useBroadcastChannel(options) {
  const {
    name,
    window: window2 = defaultWindow
  } = options;
  const isSupported = useSupported(() => window2 && ("BroadcastChannel" in window2));
  const isClosed = shallowRef(false);
  const channel = ref();
  const data = ref();
  const error = shallowRef(null);
  const post = (data2) => {
    if (channel.value)
      channel.value.postMessage(data2);
  };
  const close = () => {
    if (channel.value)
      channel.value.close();
    isClosed.value = true;
  };
  if (isSupported.value) {
    tryOnMounted(() => {
      error.value = null;
      channel.value = new BroadcastChannel(name);
      const listenerOptions = {
        passive: true
      };
      useEventListener(channel, "message", (e) => {
        data.value = e.data;
      }, listenerOptions);
      useEventListener(channel, "messageerror", (e) => {
        error.value = e;
      }, listenerOptions);
      useEventListener(channel, "close", () => {
        isClosed.value = true;
      }, listenerOptions);
    });
  }
  tryOnScopeDispose(() => {
    close();
  });
  return {
    isSupported,
    channel,
    data,
    post,
    close,
    error,
    isClosed
  };
}
var WRITABLE_PROPERTIES = [
  "hash",
  "host",
  "hostname",
  "href",
  "pathname",
  "port",
  "protocol",
  "search"
];
function useBrowserLocation(options = {}) {
  const { window: window2 = defaultWindow } = options;
  const refs = Object.fromEntries(WRITABLE_PROPERTIES.map((key) => [key, ref()]));
  for (const [key, ref2] of objectEntries(refs)) {
    watch2(ref2, (value) => {
      if (!(window2 == null ? undefined : window2.location) || window2.location[key] === value)
        return;
      window2.location[key] = value;
    });
  }
  const buildState = (trigger2) => {
    var _a;
    const { state: state2, length } = (window2 == null ? undefined : window2.history) || {};
    const { origin } = (window2 == null ? undefined : window2.location) || {};
    for (const key of WRITABLE_PROPERTIES)
      refs[key].value = (_a = window2 == null ? undefined : window2.location) == null ? undefined : _a[key];
    return reactive({
      trigger: trigger2,
      state: state2,
      length,
      origin,
      ...refs
    });
  };
  const state = ref(buildState("load"));
  if (window2) {
    const listenerOptions = { passive: true };
    useEventListener(window2, "popstate", () => state.value = buildState("popstate"), listenerOptions);
    useEventListener(window2, "hashchange", () => state.value = buildState("hashchange"), listenerOptions);
  }
  return state;
}
function useCached(refValue, comparator = (a, b) => a === b, options) {
  const { deepRefs = true, ...watchOptions } = options || {};
  const cachedValue = createRef2(refValue.value, deepRefs);
  watch2(() => refValue.value, (value) => {
    if (!comparator(value, cachedValue.value))
      cachedValue.value = value;
  }, watchOptions);
  return cachedValue;
}
function usePermission(permissionDesc, options = {}) {
  const {
    controls = false,
    navigator: navigator2 = defaultNavigator
  } = options;
  const isSupported = useSupported(() => navigator2 && ("permissions" in navigator2));
  const permissionStatus = shallowRef();
  const desc = typeof permissionDesc === "string" ? { name: permissionDesc } : permissionDesc;
  const state = shallowRef();
  const update = () => {
    var _a, _b;
    state.value = (_b = (_a = permissionStatus.value) == null ? undefined : _a.state) != null ? _b : "prompt";
  };
  useEventListener(permissionStatus, "change", update, { passive: true });
  const query = createSingletonPromise(async () => {
    if (!isSupported.value)
      return;
    if (!permissionStatus.value) {
      try {
        permissionStatus.value = await navigator2.permissions.query(desc);
      } catch (e) {
        permissionStatus.value = undefined;
      } finally {
        update();
      }
    }
    if (controls)
      return toRaw(permissionStatus.value);
  });
  query();
  if (controls) {
    return {
      state,
      isSupported,
      query
    };
  } else {
    return state;
  }
}
function useClipboard(options = {}) {
  const {
    navigator: navigator2 = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500,
    legacy = false
  } = options;
  const isClipboardApiSupported = useSupported(() => navigator2 && ("clipboard" in navigator2));
  const permissionRead = usePermission("clipboard-read");
  const permissionWrite = usePermission("clipboard-write");
  const isSupported = computed2(() => isClipboardApiSupported.value || legacy);
  const text = shallowRef("");
  const copied = shallowRef(false);
  const timeout = useTimeoutFn(() => copied.value = false, copiedDuring, { immediate: false });
  async function updateText() {
    let useLegacy = !(isClipboardApiSupported.value && isAllowed(permissionRead.value));
    if (!useLegacy) {
      try {
        text.value = await navigator2.clipboard.readText();
      } catch (e) {
        useLegacy = true;
      }
    }
    if (useLegacy) {
      text.value = legacyRead();
    }
  }
  if (isSupported.value && read)
    useEventListener(["copy", "cut"], updateText, { passive: true });
  async function copy(value = toValue(source)) {
    if (isSupported.value && value != null) {
      let useLegacy = !(isClipboardApiSupported.value && isAllowed(permissionWrite.value));
      if (!useLegacy) {
        try {
          await navigator2.clipboard.writeText(value);
        } catch (e) {
          useLegacy = true;
        }
      }
      if (useLegacy)
        legacyCopy(value);
      text.value = value;
      copied.value = true;
      timeout.start();
    }
  }
  function legacyCopy(value) {
    const ta = document.createElement("textarea");
    ta.value = value != null ? value : "";
    ta.style.position = "absolute";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  function legacyRead() {
    var _a, _b, _c;
    return (_c = (_b = (_a = document == null ? undefined : document.getSelection) == null ? undefined : _a.call(document)) == null ? undefined : _b.toString()) != null ? _c : "";
  }
  function isAllowed(status) {
    return status === "granted" || status === "prompt";
  }
  return {
    isSupported,
    text,
    copied,
    copy
  };
}
function useClipboardItems(options = {}) {
  const {
    navigator: navigator2 = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500
  } = options;
  const isSupported = useSupported(() => navigator2 && ("clipboard" in navigator2));
  const content = ref([]);
  const copied = shallowRef(false);
  const timeout = useTimeoutFn(() => copied.value = false, copiedDuring, { immediate: false });
  function updateContent() {
    if (isSupported.value) {
      navigator2.clipboard.read().then((items) => {
        content.value = items;
      });
    }
  }
  if (isSupported.value && read)
    useEventListener(["copy", "cut"], updateContent, { passive: true });
  async function copy(value = toValue(source)) {
    if (isSupported.value && value != null) {
      await navigator2.clipboard.write(value);
      content.value = value;
      copied.value = true;
      timeout.start();
    }
  }
  return {
    isSupported,
    content,
    copied,
    copy
  };
}
function cloneFnJSON(source) {
  return JSON.parse(JSON.stringify(source));
}
function useCloned(source, options = {}) {
  const cloned = ref({});
  const isModified = shallowRef(false);
  let _lastSync = false;
  const {
    manual,
    clone = cloneFnJSON,
    deep = true,
    immediate = true
  } = options;
  watch2(cloned, () => {
    if (_lastSync) {
      _lastSync = false;
      return;
    }
    isModified.value = true;
  }, {
    deep: true,
    flush: "sync"
  });
  function sync() {
    _lastSync = true;
    isModified.value = false;
    cloned.value = clone(toValue(source));
  }
  if (!manual && (isRef(source) || typeof source === "function")) {
    watch2(source, sync, {
      ...options,
      deep,
      immediate
    });
  } else {
    sync();
  }
  return { cloned, isModified, sync };
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = /* @__PURE__ */ getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function setSSRHandler(key, fn) {
  handlers[key] = fn;
}
function usePreferredDark(options) {
  return useMediaQuery("(prefers-color-scheme: dark)", options);
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
var StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v))
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString()
  }
};
var customStorageEventName = "vueuse-storage";
function useStorage(key, defaults2, storage, options = {}) {
  var _a;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e);
    },
    initOnMounted
  } = options;
  const data = (shallow ? shallowRef : ref)(typeof defaults2 === "function" ? defaults2() : defaults2);
  const keyComputed = computed2(() => toValue(key));
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a2;
        return (_a2 = defaultWindow) == null ? undefined : _a2.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  if (!storage)
    return data;
  const rawInit = toValue(defaults2);
  const type = guessSerializerType(rawInit);
  const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, () => write(data.value), { flush, deep, eventFilter });
  watch2(keyComputed, () => update(), { flush });
  let firstMounted = false;
  const onStorageEvent = (ev) => {
    if (initOnMounted && !firstMounted) {
      return;
    }
    update(ev);
  };
  const onStorageCustomEvent = (ev) => {
    if (initOnMounted && !firstMounted) {
      return;
    }
    updateFromCustomEvent(ev);
  };
  if (window2 && listenToStorageChanges) {
    if (storage instanceof Storage)
      useEventListener(window2, "storage", onStorageEvent, { passive: true });
    else
      useEventListener(window2, customStorageEventName, onStorageCustomEvent);
  }
  if (initOnMounted) {
    tryOnMounted(() => {
      firstMounted = true;
      update();
    });
  } else {
    update();
  }
  function dispatchWriteEvent(oldValue, newValue) {
    if (window2) {
      const payload = {
        key: keyComputed.value,
        oldValue,
        newValue,
        storageArea: storage
      };
      window2.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, {
        detail: payload
      }));
    }
  }
  function write(v) {
    try {
      const oldValue = storage.getItem(keyComputed.value);
      if (v == null) {
        dispatchWriteEvent(oldValue, null);
        storage.removeItem(keyComputed.value);
      } else {
        const serialized = serializer.write(v);
        if (oldValue !== serialized) {
          storage.setItem(keyComputed.value, serialized);
          dispatchWriteEvent(oldValue, serialized);
        }
      }
    } catch (e) {
      onError(e);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
    if (rawValue == null) {
      if (writeDefaults && rawInit != null)
        storage.setItem(keyComputed.value, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === "function")
        return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value))
        return { ...rawInit, ...value };
      return value;
    } else if (typeof rawValue !== "string") {
      return rawValue;
    } else {
      return serializer.read(rawValue);
    }
  }
  function update(event) {
    if (event && event.storageArea !== storage)
      return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== keyComputed.value)
      return;
    pauseWatch();
    try {
      if ((event == null ? undefined : event.newValue) !== serializer.write(data.value))
        data.value = read(event);
    } catch (e) {
      onError(e);
    } finally {
      if (event)
        nextTick(resumeWatch);
      else
        resumeWatch();
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  return data;
}
var CSS_DISABLE_TRANS = "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function useColorMode(options = {}) {
  const {
    selector = "html",
    attribute = "class",
    initialValue = "auto",
    window: window2 = defaultWindow,
    storage,
    storageKey = "vueuse-color-scheme",
    listenToStorageChanges = true,
    storageRef,
    emitAuto,
    disableTransition = true
  } = options;
  const modes = {
    auto: "",
    light: "light",
    dark: "dark",
    ...options.modes || {}
  };
  const preferredDark = usePreferredDark({ window: window2 });
  const system = computed2(() => preferredDark.value ? "dark" : "light");
  const store = storageRef || (storageKey == null ? toRef2(initialValue) : useStorage(storageKey, initialValue, storage, { window: window2, listenToStorageChanges }));
  const state = computed2(() => store.value === "auto" ? system.value : store.value);
  const updateHTMLAttrs = getSSRHandler("updateHTMLAttrs", (selector2, attribute2, value) => {
    const el = typeof selector2 === "string" ? window2 == null ? undefined : window2.document.querySelector(selector2) : unrefElement(selector2);
    if (!el)
      return;
    const classesToAdd = /* @__PURE__ */ new Set;
    const classesToRemove = /* @__PURE__ */ new Set;
    let attributeToChange = null;
    if (attribute2 === "class") {
      const current = value.split(/\s/g);
      Object.values(modes).flatMap((i) => (i || "").split(/\s/g)).filter(Boolean).forEach((v) => {
        if (current.includes(v))
          classesToAdd.add(v);
        else
          classesToRemove.add(v);
      });
    } else {
      attributeToChange = { key: attribute2, value };
    }
    if (classesToAdd.size === 0 && classesToRemove.size === 0 && attributeToChange === null)
      return;
    let style;
    if (disableTransition) {
      style = window2.document.createElement("style");
      style.appendChild(document.createTextNode(CSS_DISABLE_TRANS));
      window2.document.head.appendChild(style);
    }
    for (const c of classesToAdd) {
      el.classList.add(c);
    }
    for (const c of classesToRemove) {
      el.classList.remove(c);
    }
    if (attributeToChange) {
      el.setAttribute(attributeToChange.key, attributeToChange.value);
    }
    if (disableTransition) {
      window2.getComputedStyle(style).opacity;
      document.head.removeChild(style);
    }
  });
  function defaultOnChanged(mode) {
    var _a;
    updateHTMLAttrs(selector, attribute, (_a = modes[mode]) != null ? _a : mode);
  }
  function onChanged(mode) {
    if (options.onChanged)
      options.onChanged(mode, defaultOnChanged);
    else
      defaultOnChanged(mode);
  }
  watch2(state, onChanged, { flush: "post", immediate: true });
  tryOnMounted(() => onChanged(state.value));
  const auto = computed2({
    get() {
      return emitAuto ? store.value : state.value;
    },
    set(v) {
      store.value = v;
    }
  });
  return Object.assign(auto, { store, system, state });
}
function useConfirmDialog(revealed = shallowRef(false)) {
  const confirmHook = createEventHook();
  const cancelHook = createEventHook();
  const revealHook = createEventHook();
  let _resolve = noop;
  const reveal = (data) => {
    revealHook.trigger(data);
    revealed.value = true;
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  };
  const confirm = (data) => {
    revealed.value = false;
    confirmHook.trigger(data);
    _resolve({ data, isCanceled: false });
  };
  const cancel = (data) => {
    revealed.value = false;
    cancelHook.trigger(data);
    _resolve({ data, isCanceled: true });
  };
  return {
    isRevealed: computed2(() => revealed.value),
    reveal,
    confirm,
    cancel,
    onReveal: revealHook.on,
    onConfirm: confirmHook.on,
    onCancel: cancelHook.on
  };
}
function useCssVar(prop, target, options = {}) {
  const { window: window2 = defaultWindow, initialValue, observe = false } = options;
  const variable = shallowRef(initialValue);
  const elRef = computed2(() => {
    var _a;
    return unrefElement(target) || ((_a = window2 == null ? undefined : window2.document) == null ? undefined : _a.documentElement);
  });
  function updateCssVar() {
    var _a;
    const key = toValue(prop);
    const el = toValue(elRef);
    if (el && window2 && key) {
      const value = (_a = window2.getComputedStyle(el).getPropertyValue(key)) == null ? undefined : _a.trim();
      variable.value = value || variable.value || initialValue;
    }
  }
  if (observe) {
    useMutationObserver(elRef, updateCssVar, {
      attributeFilter: ["style", "class"],
      window: window2
    });
  }
  watch2([elRef, () => toValue(prop)], (_, old) => {
    if (old[0] && old[1])
      old[0].style.removeProperty(old[1]);
    updateCssVar();
  }, { immediate: true });
  watch2([variable, elRef], ([val, el]) => {
    const raw_prop = toValue(prop);
    if ((el == null ? undefined : el.style) && raw_prop) {
      if (val == null)
        el.style.removeProperty(raw_prop);
      else
        el.style.setProperty(raw_prop, val);
    }
  }, { immediate: true });
  return variable;
}
function useCurrentElement(rootComponent) {
  const vm = getCurrentInstance();
  const currentElement = computedWithControl(() => null, () => rootComponent ? unrefElement(rootComponent) : vm.proxy.$el);
  onUpdated(currentElement.trigger);
  onMounted(currentElement.trigger);
  return currentElement;
}
function useCycleList(list, options) {
  const state = shallowRef(getInitialValue());
  const listRef = toRef2(list);
  const index = computed2({
    get() {
      var _a;
      const targetList = listRef.value;
      let index2 = (options == null ? undefined : options.getIndexOf) ? options.getIndexOf(state.value, targetList) : targetList.indexOf(state.value);
      if (index2 < 0)
        index2 = (_a = options == null ? undefined : options.fallbackIndex) != null ? _a : 0;
      return index2;
    },
    set(v) {
      set(v);
    }
  });
  function set(i) {
    const targetList = listRef.value;
    const length = targetList.length;
    const index2 = (i % length + length) % length;
    const value = targetList[index2];
    state.value = value;
    return value;
  }
  function shift(delta = 1) {
    return set(index.value + delta);
  }
  function next(n = 1) {
    return shift(n);
  }
  function prev(n = 1) {
    return shift(-n);
  }
  function getInitialValue() {
    var _a, _b;
    return (_b = toValue((_a = options == null ? undefined : options.initialValue) != null ? _a : toValue(list)[0])) != null ? _b : undefined;
  }
  watch2(listRef, () => set(index.value));
  return {
    state,
    index,
    next,
    prev,
    go: set
  };
}
function useDark(options = {}) {
  const {
    valueDark = "dark",
    valueLight = ""
  } = options;
  const mode = useColorMode({
    ...options,
    onChanged: (mode2, defaultHandler) => {
      var _a;
      if (options.onChanged)
        (_a = options.onChanged) == null || _a.call(options, mode2 === "dark", defaultHandler, mode2);
      else
        defaultHandler(mode2);
    },
    modes: {
      dark: valueDark,
      light: valueLight
    }
  });
  const system = computed2(() => mode.system.value);
  const isDark = computed2({
    get() {
      return mode.value === "dark";
    },
    set(v) {
      const modeVal = v ? "dark" : "light";
      if (system.value === modeVal)
        mode.value = "auto";
      else
        mode.value = modeVal;
    }
  });
  return isDark;
}
function fnBypass(v) {
  return v;
}
function fnSetSource(source, value) {
  return source.value = value;
}
function defaultDump(clone) {
  return clone ? typeof clone === "function" ? clone : cloneFnJSON : fnBypass;
}
function defaultParse(clone) {
  return clone ? typeof clone === "function" ? clone : cloneFnJSON : fnBypass;
}
function useManualRefHistory(source, options = {}) {
  const {
    clone = false,
    dump = defaultDump(clone),
    parse = defaultParse(clone),
    setSource = fnSetSource
  } = options;
  function _createHistoryRecord() {
    return markRaw({
      snapshot: dump(source.value),
      timestamp: timestamp()
    });
  }
  const last = ref(_createHistoryRecord());
  const undoStack = ref([]);
  const redoStack = ref([]);
  const _setSource = (record) => {
    setSource(source, parse(record.snapshot));
    last.value = record;
  };
  const commit = () => {
    undoStack.value.unshift(last.value);
    last.value = _createHistoryRecord();
    if (options.capacity && undoStack.value.length > options.capacity)
      undoStack.value.splice(options.capacity, Number.POSITIVE_INFINITY);
    if (redoStack.value.length)
      redoStack.value.splice(0, redoStack.value.length);
  };
  const clear = () => {
    undoStack.value.splice(0, undoStack.value.length);
    redoStack.value.splice(0, redoStack.value.length);
  };
  const undo = () => {
    const state = undoStack.value.shift();
    if (state) {
      redoStack.value.unshift(last.value);
      _setSource(state);
    }
  };
  const redo = () => {
    const state = redoStack.value.shift();
    if (state) {
      undoStack.value.unshift(last.value);
      _setSource(state);
    }
  };
  const reset = () => {
    _setSource(last.value);
  };
  const history = computed2(() => [last.value, ...undoStack.value]);
  const canUndo = computed2(() => undoStack.value.length > 0);
  const canRedo = computed2(() => redoStack.value.length > 0);
  return {
    source,
    undoStack,
    redoStack,
    last,
    history,
    canUndo,
    canRedo,
    clear,
    commit,
    reset,
    undo,
    redo
  };
}
function useRefHistory(source, options = {}) {
  const {
    deep = false,
    flush = "pre",
    eventFilter,
    shouldCommit = () => true
  } = options;
  const {
    eventFilter: composedFilter,
    pause,
    resume: resumeTracking,
    isActive: isTracking
  } = pausableFilter(eventFilter);
  let lastRawValue = source.value;
  const {
    ignoreUpdates,
    ignorePrevAsyncUpdates,
    stop: stop2
  } = watchIgnorable(source, commit, { deep, flush, eventFilter: composedFilter });
  function setSource(source2, value) {
    ignorePrevAsyncUpdates();
    ignoreUpdates(() => {
      source2.value = value;
      lastRawValue = value;
    });
  }
  const manualHistory = useManualRefHistory(source, { ...options, clone: options.clone || deep, setSource });
  const { clear, commit: manualCommit } = manualHistory;
  function commit() {
    ignorePrevAsyncUpdates();
    if (!shouldCommit(lastRawValue, source.value))
      return;
    lastRawValue = source.value;
    manualCommit();
  }
  function resume(commitNow) {
    resumeTracking();
    if (commitNow)
      commit();
  }
  function batch2(fn) {
    let canceled = false;
    const cancel = () => canceled = true;
    ignoreUpdates(() => {
      fn(cancel);
    });
    if (!canceled)
      commit();
  }
  function dispose() {
    stop2();
    clear();
  }
  return {
    ...manualHistory,
    isTracking,
    pause,
    resume,
    commit,
    batch: batch2,
    dispose
  };
}
function useDebouncedRefHistory(source, options = {}) {
  const filter = options.debounce ? debounceFilter(options.debounce) : undefined;
  const history = useRefHistory(source, { ...options, eventFilter: filter });
  return {
    ...history
  };
}
function useDeviceMotion(options = {}) {
  const {
    window: window2 = defaultWindow,
    requestPermissions = false,
    eventFilter = bypassFilter
  } = options;
  const isSupported = useSupported(() => typeof DeviceMotionEvent !== "undefined");
  const requirePermissions = useSupported(() => isSupported.value && ("requestPermission" in DeviceMotionEvent) && typeof DeviceMotionEvent.requestPermission === "function");
  const permissionGranted = shallowRef(false);
  const acceleration = ref({ x: null, y: null, z: null });
  const rotationRate = ref({ alpha: null, beta: null, gamma: null });
  const interval = shallowRef(0);
  const accelerationIncludingGravity = ref({
    x: null,
    y: null,
    z: null
  });
  function init() {
    if (window2) {
      const onDeviceMotion = createFilterWrapper(eventFilter, (event) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i;
        acceleration.value = {
          x: ((_a = event.acceleration) == null ? undefined : _a.x) || null,
          y: ((_b = event.acceleration) == null ? undefined : _b.y) || null,
          z: ((_c = event.acceleration) == null ? undefined : _c.z) || null
        };
        accelerationIncludingGravity.value = {
          x: ((_d = event.accelerationIncludingGravity) == null ? undefined : _d.x) || null,
          y: ((_e = event.accelerationIncludingGravity) == null ? undefined : _e.y) || null,
          z: ((_f = event.accelerationIncludingGravity) == null ? undefined : _f.z) || null
        };
        rotationRate.value = {
          alpha: ((_g = event.rotationRate) == null ? undefined : _g.alpha) || null,
          beta: ((_h = event.rotationRate) == null ? undefined : _h.beta) || null,
          gamma: ((_i = event.rotationRate) == null ? undefined : _i.gamma) || null
        };
        interval.value = event.interval;
      });
      useEventListener(window2, "devicemotion", onDeviceMotion, { passive: true });
    }
  }
  const ensurePermissions = async () => {
    if (!requirePermissions.value)
      permissionGranted.value = true;
    if (permissionGranted.value)
      return;
    if (requirePermissions.value) {
      const requestPermission = DeviceMotionEvent.requestPermission;
      try {
        const response = await requestPermission();
        if (response === "granted") {
          permissionGranted.value = true;
          init();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  if (isSupported.value) {
    if (requestPermissions && requirePermissions.value) {
      ensurePermissions().then(() => init());
    } else {
      init();
    }
  }
  return {
    acceleration,
    accelerationIncludingGravity,
    rotationRate,
    interval,
    isSupported,
    requirePermissions,
    ensurePermissions,
    permissionGranted
  };
}
function useDeviceOrientation(options = {}) {
  const { window: window2 = defaultWindow } = options;
  const isSupported = useSupported(() => window2 && ("DeviceOrientationEvent" in window2));
  const isAbsolute = shallowRef(false);
  const alpha = shallowRef(null);
  const beta = shallowRef(null);
  const gamma = shallowRef(null);
  if (window2 && isSupported.value) {
    useEventListener(window2, "deviceorientation", (event) => {
      isAbsolute.value = event.absolute;
      alpha.value = event.alpha;
      beta.value = event.beta;
      gamma.value = event.gamma;
    }, { passive: true });
  }
  return {
    isSupported,
    isAbsolute,
    alpha,
    beta,
    gamma
  };
}
function useDevicePixelRatio(options = {}) {
  const {
    window: window2 = defaultWindow
  } = options;
  const pixelRatio = shallowRef(1);
  const query = useMediaQuery(() => `(resolution: ${pixelRatio.value}dppx)`, options);
  let stop2 = noop;
  if (window2) {
    stop2 = watchImmediate(query, () => pixelRatio.value = window2.devicePixelRatio);
  }
  return {
    pixelRatio: readonly(pixelRatio),
    stop: stop2
  };
}
function useDevicesList(options = {}) {
  const {
    navigator: navigator2 = defaultNavigator,
    requestPermissions = false,
    constraints = { audio: true, video: true },
    onUpdated: onUpdated2
  } = options;
  const devices = ref([]);
  const videoInputs = computed2(() => devices.value.filter((i) => i.kind === "videoinput"));
  const audioInputs = computed2(() => devices.value.filter((i) => i.kind === "audioinput"));
  const audioOutputs = computed2(() => devices.value.filter((i) => i.kind === "audiooutput"));
  const isSupported = useSupported(() => navigator2 && navigator2.mediaDevices && navigator2.mediaDevices.enumerateDevices);
  const permissionGranted = shallowRef(false);
  let stream;
  async function update() {
    if (!isSupported.value)
      return;
    devices.value = await navigator2.mediaDevices.enumerateDevices();
    onUpdated2 == null || onUpdated2(devices.value);
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
    }
  }
  async function ensurePermissions() {
    const deviceName = constraints.video ? "camera" : "microphone";
    if (!isSupported.value)
      return false;
    if (permissionGranted.value)
      return true;
    const { state, query } = usePermission(deviceName, { controls: true });
    await query();
    if (state.value !== "granted") {
      let granted = true;
      try {
        const allDevices = await navigator2.mediaDevices.enumerateDevices();
        const hasCamera = allDevices.some((device) => device.kind === "videoinput");
        const hasMicrophone = allDevices.some((device) => device.kind === "audioinput" || device.kind === "audiooutput");
        constraints.video = hasCamera ? constraints.video : false;
        constraints.audio = hasMicrophone ? constraints.audio : false;
        stream = await navigator2.mediaDevices.getUserMedia(constraints);
      } catch (e) {
        stream = null;
        granted = false;
      }
      update();
      permissionGranted.value = granted;
    } else {
      permissionGranted.value = true;
    }
    return permissionGranted.value;
  }
  if (isSupported.value) {
    if (requestPermissions)
      ensurePermissions();
    useEventListener(navigator2.mediaDevices, "devicechange", update, { passive: true });
    update();
  }
  return {
    devices,
    ensurePermissions,
    permissionGranted,
    videoInputs,
    audioInputs,
    audioOutputs,
    isSupported
  };
}
function useDisplayMedia(options = {}) {
  var _a;
  const enabled = shallowRef((_a = options.enabled) != null ? _a : false);
  const video = options.video;
  const audio = options.audio;
  const { navigator: navigator2 = defaultNavigator } = options;
  const isSupported = useSupported(() => {
    var _a2;
    return (_a2 = navigator2 == null ? undefined : navigator2.mediaDevices) == null ? undefined : _a2.getDisplayMedia;
  });
  const constraint = { audio, video };
  const stream = shallowRef();
  async function _start() {
    var _a2;
    if (!isSupported.value || stream.value)
      return;
    stream.value = await navigator2.mediaDevices.getDisplayMedia(constraint);
    (_a2 = stream.value) == null || _a2.getTracks().forEach((t) => useEventListener(t, "ended", stop2, { passive: true }));
    return stream.value;
  }
  async function _stop() {
    var _a2;
    (_a2 = stream.value) == null || _a2.getTracks().forEach((t) => t.stop());
    stream.value = undefined;
  }
  function stop2() {
    _stop();
    enabled.value = false;
  }
  async function start() {
    await _start();
    if (stream.value)
      enabled.value = true;
    return stream.value;
  }
  watch2(enabled, (v) => {
    if (v)
      _start();
    else
      _stop();
  }, { immediate: true });
  return {
    isSupported,
    stream,
    start,
    stop: stop2,
    enabled
  };
}
function useDocumentVisibility(options = {}) {
  const { document: document2 = defaultDocument } = options;
  if (!document2)
    return shallowRef("visible");
  const visibility = shallowRef(document2.visibilityState);
  useEventListener(document2, "visibilitychange", () => {
    visibility.value = document2.visibilityState;
  }, { passive: true });
  return visibility;
}
function useDraggable(target, options = {}) {
  var _a;
  const {
    pointerTypes,
    preventDefault,
    stopPropagation,
    exact,
    onMove,
    onEnd,
    onStart,
    initialValue,
    axis = "both",
    draggingElement = defaultWindow,
    containerElement,
    handle: draggingHandle = target,
    buttons = [0]
  } = options;
  const position = ref((_a = toValue(initialValue)) != null ? _a : { x: 0, y: 0 });
  const pressedDelta = ref();
  const filterEvent = (e) => {
    if (pointerTypes)
      return pointerTypes.includes(e.pointerType);
    return true;
  };
  const handleEvent = (e) => {
    if (toValue(preventDefault))
      e.preventDefault();
    if (toValue(stopPropagation))
      e.stopPropagation();
  };
  const start = (e) => {
    var _a2;
    if (!toValue(buttons).includes(e.button))
      return;
    if (toValue(options.disabled) || !filterEvent(e))
      return;
    if (toValue(exact) && e.target !== toValue(target))
      return;
    const container = toValue(containerElement);
    const containerRect = (_a2 = container == null ? undefined : container.getBoundingClientRect) == null ? undefined : _a2.call(container);
    const targetRect = toValue(target).getBoundingClientRect();
    const pos = {
      x: e.clientX - (container ? targetRect.left - containerRect.left + container.scrollLeft : targetRect.left),
      y: e.clientY - (container ? targetRect.top - containerRect.top + container.scrollTop : targetRect.top)
    };
    if ((onStart == null ? undefined : onStart(pos, e)) === false)
      return;
    pressedDelta.value = pos;
    handleEvent(e);
  };
  const move = (e) => {
    if (toValue(options.disabled) || !filterEvent(e))
      return;
    if (!pressedDelta.value)
      return;
    const container = toValue(containerElement);
    const targetRect = toValue(target).getBoundingClientRect();
    let { x, y } = position.value;
    if (axis === "x" || axis === "both") {
      x = e.clientX - pressedDelta.value.x;
      if (container)
        x = Math.min(Math.max(0, x), container.scrollWidth - targetRect.width);
    }
    if (axis === "y" || axis === "both") {
      y = e.clientY - pressedDelta.value.y;
      if (container)
        y = Math.min(Math.max(0, y), container.scrollHeight - targetRect.height);
    }
    position.value = {
      x,
      y
    };
    onMove == null || onMove(position.value, e);
    handleEvent(e);
  };
  const end = (e) => {
    if (toValue(options.disabled) || !filterEvent(e))
      return;
    if (!pressedDelta.value)
      return;
    pressedDelta.value = undefined;
    onEnd == null || onEnd(position.value, e);
    handleEvent(e);
  };
  if (isClient) {
    const config = () => {
      var _a2;
      return {
        capture: (_a2 = options.capture) != null ? _a2 : true,
        passive: !toValue(preventDefault)
      };
    };
    useEventListener(draggingHandle, "pointerdown", start, config);
    useEventListener(draggingElement, "pointermove", move, config);
    useEventListener(draggingElement, "pointerup", end, config);
  }
  return {
    ...toRefs2(position),
    position,
    isDragging: computed2(() => !!pressedDelta.value),
    style: computed2(() => `left:${position.value.x}px;top:${position.value.y}px;`)
  };
}
function useDropZone(target, options = {}) {
  var _a, _b;
  const isOverDropZone = shallowRef(false);
  const files = shallowRef(null);
  let counter = 0;
  let isValid = true;
  if (isClient) {
    const _options = typeof options === "function" ? { onDrop: options } : options;
    const multiple = (_a = _options.multiple) != null ? _a : true;
    const preventDefaultForUnhandled = (_b = _options.preventDefaultForUnhandled) != null ? _b : false;
    const getFiles = (event) => {
      var _a2, _b2;
      const list = Array.from((_b2 = (_a2 = event.dataTransfer) == null ? undefined : _a2.files) != null ? _b2 : []);
      return list.length === 0 ? null : multiple ? list : [list[0]];
    };
    const checkDataTypes = (types) => {
      const dataTypes = unref(_options.dataTypes);
      if (typeof dataTypes === "function")
        return dataTypes(types);
      if (!(dataTypes == null ? undefined : dataTypes.length))
        return true;
      if (types.length === 0)
        return false;
      return types.every((type) => dataTypes.some((allowedType) => type.includes(allowedType)));
    };
    const checkValidity = (items) => {
      const types = Array.from(items != null ? items : []).map((item) => item.type);
      const dataTypesValid = checkDataTypes(types);
      const multipleFilesValid = multiple || items.length <= 1;
      return dataTypesValid && multipleFilesValid;
    };
    const isSafari = () => /^(?:(?!chrome|android).)*safari/i.test(navigator.userAgent) && !("chrome" in window);
    const handleDragEvent = (event, eventType) => {
      var _a2, _b2, _c, _d, _e, _f;
      const dataTransferItemList = (_a2 = event.dataTransfer) == null ? undefined : _a2.items;
      isValid = (_b2 = dataTransferItemList && checkValidity(dataTransferItemList)) != null ? _b2 : false;
      if (preventDefaultForUnhandled) {
        event.preventDefault();
      }
      if (!isSafari() && !isValid) {
        if (event.dataTransfer) {
          event.dataTransfer.dropEffect = "none";
        }
        return;
      }
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "copy";
      }
      const currentFiles = getFiles(event);
      switch (eventType) {
        case "enter":
          counter += 1;
          isOverDropZone.value = true;
          (_c = _options.onEnter) == null || _c.call(_options, null, event);
          break;
        case "over":
          (_d = _options.onOver) == null || _d.call(_options, null, event);
          break;
        case "leave":
          counter -= 1;
          if (counter === 0)
            isOverDropZone.value = false;
          (_e = _options.onLeave) == null || _e.call(_options, null, event);
          break;
        case "drop":
          counter = 0;
          isOverDropZone.value = false;
          if (isValid) {
            files.value = currentFiles;
            (_f = _options.onDrop) == null || _f.call(_options, currentFiles, event);
          }
          break;
      }
    };
    useEventListener(target, "dragenter", (event) => handleDragEvent(event, "enter"));
    useEventListener(target, "dragover", (event) => handleDragEvent(event, "over"));
    useEventListener(target, "dragleave", (event) => handleDragEvent(event, "leave"));
    useEventListener(target, "drop", (event) => handleDragEvent(event, "drop"));
  }
  return {
    files,
    isOverDropZone
  };
}
function useResizeObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...observerOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && ("ResizeObserver" in window2));
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };
  const targets = computed2(() => {
    const _targets = toValue(target);
    return Array.isArray(_targets) ? _targets.map((el) => unrefElement(el)) : [unrefElement(_targets)];
  });
  const stopWatch = watch2(targets, (els) => {
    cleanup();
    if (isSupported.value && window2) {
      observer = new ResizeObserver(callback);
      for (const _el of els) {
        if (_el)
          observer.observe(_el, observerOptions);
      }
    }
  }, { immediate: true, flush: "post" });
  const stop2 = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop2);
  return {
    isSupported,
    stop: stop2
  };
}
function useElementBounding(target, options = {}) {
  const {
    reset = true,
    windowResize = true,
    windowScroll = true,
    immediate = true,
    updateTiming = "sync"
  } = options;
  const height = shallowRef(0);
  const bottom = shallowRef(0);
  const left = shallowRef(0);
  const right = shallowRef(0);
  const top = shallowRef(0);
  const width = shallowRef(0);
  const x = shallowRef(0);
  const y = shallowRef(0);
  function recalculate() {
    const el = unrefElement(target);
    if (!el) {
      if (reset) {
        height.value = 0;
        bottom.value = 0;
        left.value = 0;
        right.value = 0;
        top.value = 0;
        width.value = 0;
        x.value = 0;
        y.value = 0;
      }
      return;
    }
    const rect = el.getBoundingClientRect();
    height.value = rect.height;
    bottom.value = rect.bottom;
    left.value = rect.left;
    right.value = rect.right;
    top.value = rect.top;
    width.value = rect.width;
    x.value = rect.x;
    y.value = rect.y;
  }
  function update() {
    if (updateTiming === "sync")
      recalculate();
    else if (updateTiming === "next-frame")
      requestAnimationFrame(() => recalculate());
  }
  useResizeObserver(target, update);
  watch2(() => unrefElement(target), (ele) => !ele && update());
  useMutationObserver(target, update, {
    attributeFilter: ["style", "class"]
  });
  if (windowScroll)
    useEventListener("scroll", update, { capture: true, passive: true });
  if (windowResize)
    useEventListener("resize", update, { passive: true });
  tryOnMounted(() => {
    if (immediate)
      update();
  });
  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update
  };
}
function useElementByPoint(options) {
  const {
    x,
    y,
    document: document2 = defaultDocument,
    multiple,
    interval = "requestAnimationFrame",
    immediate = true
  } = options;
  const isSupported = useSupported(() => {
    if (toValue(multiple))
      return document2 && "elementsFromPoint" in document2;
    return document2 && "elementFromPoint" in document2;
  });
  const element = shallowRef(null);
  const cb = () => {
    var _a, _b;
    element.value = toValue(multiple) ? (_a = document2 == null ? undefined : document2.elementsFromPoint(toValue(x), toValue(y))) != null ? _a : [] : (_b = document2 == null ? undefined : document2.elementFromPoint(toValue(x), toValue(y))) != null ? _b : null;
  };
  const controls = interval === "requestAnimationFrame" ? useRafFn(cb, { immediate }) : useIntervalFn(cb, interval, { immediate });
  return {
    isSupported,
    element,
    ...controls
  };
}
function useElementHover(el, options = {}) {
  const {
    delayEnter = 0,
    delayLeave = 0,
    triggerOnRemoval = false,
    window: window2 = defaultWindow
  } = options;
  const isHovered = shallowRef(false);
  let timer;
  const toggle = (entering) => {
    const delay = entering ? delayEnter : delayLeave;
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    if (delay)
      timer = setTimeout(() => isHovered.value = entering, delay);
    else
      isHovered.value = entering;
  };
  if (!window2)
    return isHovered;
  useEventListener(el, "mouseenter", () => toggle(true), { passive: true });
  useEventListener(el, "mouseleave", () => toggle(false), { passive: true });
  if (triggerOnRemoval) {
    onElementRemoval(computed2(() => unrefElement(el)), () => toggle(false));
  }
  return isHovered;
}
function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const { window: window2 = defaultWindow, box = "content-box" } = options;
  const isSVG = computed2(() => {
    var _a, _b;
    return (_b = (_a = unrefElement(target)) == null ? undefined : _a.namespaceURI) == null ? undefined : _b.includes("svg");
  });
  const width = shallowRef(initialSize.width);
  const height = shallowRef(initialSize.height);
  const { stop: stop1 } = useResizeObserver(target, ([entry]) => {
    const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
    if (window2 && isSVG.value) {
      const $elem = unrefElement(target);
      if ($elem) {
        const rect = $elem.getBoundingClientRect();
        width.value = rect.width;
        height.value = rect.height;
      }
    } else {
      if (boxSize) {
        const formatBoxSize = toArray(boxSize);
        width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
        height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
      } else {
        width.value = entry.contentRect.width;
        height.value = entry.contentRect.height;
      }
    }
  }, options);
  tryOnMounted(() => {
    const ele = unrefElement(target);
    if (ele) {
      width.value = "offsetWidth" in ele ? ele.offsetWidth : initialSize.width;
      height.value = "offsetHeight" in ele ? ele.offsetHeight : initialSize.height;
    }
  });
  const stop2 = watch2(() => unrefElement(target), (ele) => {
    width.value = ele ? initialSize.width : 0;
    height.value = ele ? initialSize.height : 0;
  });
  function stop3() {
    stop1();
    stop2();
  }
  return {
    width,
    height,
    stop: stop3
  };
}
function useIntersectionObserver(target, callback, options = {}) {
  const {
    root,
    rootMargin = "0px",
    threshold = 0,
    window: window2 = defaultWindow,
    immediate = true
  } = options;
  const isSupported = useSupported(() => window2 && ("IntersectionObserver" in window2));
  const targets = computed2(() => {
    const _target = toValue(target);
    return toArray(_target).map(unrefElement).filter(notNullish);
  });
  let cleanup = noop;
  const isActive = shallowRef(immediate);
  const stopWatch = isSupported.value ? watch2(() => [targets.value, unrefElement(root), isActive.value], ([targets2, root2]) => {
    cleanup();
    if (!isActive.value)
      return;
    if (!targets2.length)
      return;
    const observer = new IntersectionObserver(callback, {
      root: unrefElement(root2),
      rootMargin,
      threshold
    });
    targets2.forEach((el) => el && observer.observe(el));
    cleanup = () => {
      observer.disconnect();
      cleanup = noop;
    };
  }, { immediate, flush: "post" }) : noop;
  const stop2 = () => {
    cleanup();
    stopWatch();
    isActive.value = false;
  };
  tryOnScopeDispose(stop2);
  return {
    isSupported,
    isActive,
    pause() {
      cleanup();
      isActive.value = false;
    },
    resume() {
      isActive.value = true;
    },
    stop: stop2
  };
}
function useElementVisibility(element, options = {}) {
  const {
    window: window2 = defaultWindow,
    scrollTarget,
    threshold = 0,
    rootMargin,
    once = false
  } = options;
  const elementIsVisible = shallowRef(false);
  const { stop: stop2 } = useIntersectionObserver(element, (intersectionObserverEntries) => {
    let isIntersecting = elementIsVisible.value;
    let latestTime = 0;
    for (const entry of intersectionObserverEntries) {
      if (entry.time >= latestTime) {
        latestTime = entry.time;
        isIntersecting = entry.isIntersecting;
      }
    }
    elementIsVisible.value = isIntersecting;
    if (once) {
      watchOnce(elementIsVisible, () => {
        stop2();
      });
    }
  }, {
    root: scrollTarget,
    window: window2,
    threshold,
    rootMargin: toValue(rootMargin)
  });
  return elementIsVisible;
}
var events = /* @__PURE__ */ new Map;
function useEventBus(key) {
  const scope = getCurrentScope();
  function on(listener) {
    var _a;
    const listeners = events.get(key) || /* @__PURE__ */ new Set;
    listeners.add(listener);
    events.set(key, listeners);
    const _off = () => off(listener);
    (_a = scope == null ? undefined : scope.cleanups) == null || _a.push(_off);
    return _off;
  }
  function once(listener) {
    function _listener(...args) {
      off(_listener);
      listener(...args);
    }
    return on(_listener);
  }
  function off(listener) {
    const listeners = events.get(key);
    if (!listeners)
      return;
    listeners.delete(listener);
    if (!listeners.size)
      reset();
  }
  function reset() {
    events.delete(key);
  }
  function emit(event, payload) {
    var _a;
    (_a = events.get(key)) == null || _a.forEach((v) => v(event, payload));
  }
  return { on, once, off, emit, reset };
}
function resolveNestedOptions$1(options) {
  if (options === true)
    return {};
  return options;
}
function useEventSource(url, events2 = [], options = {}) {
  const event = shallowRef(null);
  const data = shallowRef(null);
  const status = shallowRef("CONNECTING");
  const eventSource = ref(null);
  const error = shallowRef(null);
  const urlRef = toRef2(url);
  const lastEventId = shallowRef(null);
  let explicitlyClosed = false;
  let retried = 0;
  const {
    withCredentials = false,
    immediate = true,
    autoConnect = true,
    autoReconnect
  } = options;
  const close = () => {
    if (isClient && eventSource.value) {
      eventSource.value.close();
      eventSource.value = null;
      status.value = "CLOSED";
      explicitlyClosed = true;
    }
  };
  const _init = () => {
    if (explicitlyClosed || typeof urlRef.value === "undefined")
      return;
    const es = new EventSource(urlRef.value, { withCredentials });
    status.value = "CONNECTING";
    eventSource.value = es;
    es.onopen = () => {
      status.value = "OPEN";
      error.value = null;
    };
    es.onerror = (e) => {
      status.value = "CLOSED";
      error.value = e;
      if (es.readyState === 2 && !explicitlyClosed && autoReconnect) {
        es.close();
        const {
          retries = -1,
          delay = 1000,
          onFailed
        } = resolveNestedOptions$1(autoReconnect);
        retried += 1;
        if (typeof retries === "number" && (retries < 0 || retried < retries))
          setTimeout(_init, delay);
        else if (typeof retries === "function" && retries())
          setTimeout(_init, delay);
        else
          onFailed == null || onFailed();
      }
    };
    es.onmessage = (e) => {
      event.value = null;
      data.value = e.data;
      lastEventId.value = e.lastEventId;
    };
    for (const event_name of events2) {
      useEventListener(es, event_name, (e) => {
        event.value = event_name;
        data.value = e.data || null;
        lastEventId.value = e.lastEventId || null;
      }, { passive: true });
    }
  };
  const open = () => {
    if (!isClient)
      return;
    close();
    explicitlyClosed = false;
    retried = 0;
    _init();
  };
  if (immediate)
    open();
  if (autoConnect)
    watch2(urlRef, open);
  tryOnScopeDispose(close);
  return {
    eventSource,
    event,
    data,
    status,
    error,
    open,
    close,
    lastEventId
  };
}
function useEyeDropper(options = {}) {
  const { initialValue = "" } = options;
  const isSupported = useSupported(() => typeof window !== "undefined" && ("EyeDropper" in window));
  const sRGBHex = shallowRef(initialValue);
  async function open(openOptions) {
    if (!isSupported.value)
      return;
    const eyeDropper = new window.EyeDropper;
    const result = await eyeDropper.open(openOptions);
    sRGBHex.value = result.sRGBHex;
    return result;
  }
  return { isSupported, sRGBHex, open };
}
function useFavicon(newIcon = null, options = {}) {
  const {
    baseUrl = "",
    rel = "icon",
    document: document2 = defaultDocument
  } = options;
  const favicon = toRef2(newIcon);
  const applyIcon = (icon) => {
    const elements = document2 == null ? undefined : document2.head.querySelectorAll(`link[rel*="${rel}"]`);
    if (!elements || elements.length === 0) {
      const link = document2 == null ? undefined : document2.createElement("link");
      if (link) {
        link.rel = rel;
        link.href = `${baseUrl}${icon}`;
        link.type = `image/${icon.split(".").pop()}`;
        document2 == null || document2.head.append(link);
      }
      return;
    }
    elements == null || elements.forEach((el) => el.href = `${baseUrl}${icon}`);
  };
  watch2(favicon, (i, o) => {
    if (typeof i === "string" && i !== o)
      applyIcon(i);
  }, { immediate: true });
  return favicon;
}
var payloadMapping = {
  json: "application/json",
  text: "text/plain"
};
function isFetchOptions(obj) {
  return obj && containsProp(obj, "immediate", "refetch", "initialData", "timeout", "beforeFetch", "afterFetch", "onFetchError", "fetch", "updateDataOnError");
}
var reAbsolute = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i;
function isAbsoluteURL(url) {
  return reAbsolute.test(url);
}
function headersToObject(headers) {
  if (typeof Headers !== "undefined" && headers instanceof Headers)
    return Object.fromEntries(headers.entries());
  return headers;
}
function combineCallbacks(combination, ...callbacks) {
  if (combination === "overwrite") {
    return async (ctx) => {
      let callback;
      for (let i = callbacks.length - 1;i >= 0; i--) {
        if (callbacks[i] != null) {
          callback = callbacks[i];
          break;
        }
      }
      if (callback)
        return { ...ctx, ...await callback(ctx) };
      return ctx;
    };
  } else {
    return async (ctx) => {
      for (const callback of callbacks) {
        if (callback)
          ctx = { ...ctx, ...await callback(ctx) };
      }
      return ctx;
    };
  }
}
function createFetch(config = {}) {
  const _combination = config.combination || "chain";
  const _options = config.options || {};
  const _fetchOptions = config.fetchOptions || {};
  function useFactoryFetch(url, ...args) {
    const computedUrl = computed2(() => {
      const baseUrl = toValue(config.baseUrl);
      const targetUrl = toValue(url);
      return baseUrl && !isAbsoluteURL(targetUrl) ? joinPaths(baseUrl, targetUrl) : targetUrl;
    });
    let options = _options;
    let fetchOptions = _fetchOptions;
    if (args.length > 0) {
      if (isFetchOptions(args[0])) {
        options = {
          ...options,
          ...args[0],
          beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[0].beforeFetch),
          afterFetch: combineCallbacks(_combination, _options.afterFetch, args[0].afterFetch),
          onFetchError: combineCallbacks(_combination, _options.onFetchError, args[0].onFetchError)
        };
      } else {
        fetchOptions = {
          ...fetchOptions,
          ...args[0],
          headers: {
            ...headersToObject(fetchOptions.headers) || {},
            ...headersToObject(args[0].headers) || {}
          }
        };
      }
    }
    if (args.length > 1 && isFetchOptions(args[1])) {
      options = {
        ...options,
        ...args[1],
        beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[1].beforeFetch),
        afterFetch: combineCallbacks(_combination, _options.afterFetch, args[1].afterFetch),
        onFetchError: combineCallbacks(_combination, _options.onFetchError, args[1].onFetchError)
      };
    }
    return useFetch(computedUrl, fetchOptions, options);
  }
  return useFactoryFetch;
}
function useFetch(url, ...args) {
  var _a, _b;
  const supportsAbort = typeof AbortController === "function";
  let fetchOptions = {};
  let options = {
    immediate: true,
    refetch: false,
    timeout: 0,
    updateDataOnError: false
  };
  const config = {
    method: "GET",
    type: "text",
    payload: undefined
  };
  if (args.length > 0) {
    if (isFetchOptions(args[0]))
      options = { ...options, ...args[0] };
    else
      fetchOptions = args[0];
  }
  if (args.length > 1) {
    if (isFetchOptions(args[1]))
      options = { ...options, ...args[1] };
  }
  const {
    fetch: fetch2 = (_b = (_a = defaultWindow) == null ? undefined : _a.fetch) != null ? _b : globalThis == null ? undefined : globalThis.fetch,
    initialData,
    timeout
  } = options;
  const responseEvent = createEventHook();
  const errorEvent = createEventHook();
  const finallyEvent = createEventHook();
  const isFinished = shallowRef(false);
  const isFetching = shallowRef(false);
  const aborted = shallowRef(false);
  const statusCode = shallowRef(null);
  const response = shallowRef(null);
  const error = shallowRef(null);
  const data = shallowRef(initialData || null);
  const canAbort = computed2(() => supportsAbort && isFetching.value);
  let controller;
  let timer;
  const abort = (reason) => {
    if (supportsAbort) {
      controller == null || controller.abort(reason);
      controller = new AbortController;
      controller.signal.onabort = () => aborted.value = true;
      fetchOptions = {
        ...fetchOptions,
        signal: controller.signal
      };
    }
  };
  const loading = (isLoading) => {
    isFetching.value = isLoading;
    isFinished.value = !isLoading;
  };
  if (timeout)
    timer = useTimeoutFn(abort, timeout, { immediate: false });
  let executeCounter = 0;
  const execute = async (throwOnFailed = false) => {
    var _a2, _b2;
    abort();
    loading(true);
    error.value = null;
    statusCode.value = null;
    aborted.value = false;
    executeCounter += 1;
    const currentExecuteCounter = executeCounter;
    const defaultFetchOptions = {
      method: config.method,
      headers: {}
    };
    const payload = toValue(config.payload);
    if (payload) {
      const headers = headersToObject(defaultFetchOptions.headers);
      const proto = Object.getPrototypeOf(payload);
      if (!config.payloadType && payload && (proto === Object.prototype || Array.isArray(proto)) && !(payload instanceof FormData))
        config.payloadType = "json";
      if (config.payloadType)
        headers["Content-Type"] = (_a2 = payloadMapping[config.payloadType]) != null ? _a2 : config.payloadType;
      defaultFetchOptions.body = config.payloadType === "json" ? JSON.stringify(payload) : payload;
    }
    let isCanceled = false;
    const context = {
      url: toValue(url),
      options: {
        ...defaultFetchOptions,
        ...fetchOptions
      },
      cancel: () => {
        isCanceled = true;
      }
    };
    if (options.beforeFetch)
      Object.assign(context, await options.beforeFetch(context));
    if (isCanceled || !fetch2) {
      loading(false);
      return Promise.resolve(null);
    }
    let responseData = null;
    if (timer)
      timer.start();
    return fetch2(context.url, {
      ...defaultFetchOptions,
      ...context.options,
      headers: {
        ...headersToObject(defaultFetchOptions.headers),
        ...headersToObject((_b2 = context.options) == null ? undefined : _b2.headers)
      }
    }).then(async (fetchResponse) => {
      response.value = fetchResponse;
      statusCode.value = fetchResponse.status;
      responseData = await fetchResponse.clone()[config.type]();
      if (!fetchResponse.ok) {
        data.value = initialData || null;
        throw new Error(fetchResponse.statusText);
      }
      if (options.afterFetch) {
        ({ data: responseData } = await options.afterFetch({
          data: responseData,
          response: fetchResponse,
          context,
          execute
        }));
      }
      data.value = responseData;
      responseEvent.trigger(fetchResponse);
      return fetchResponse;
    }).catch(async (fetchError) => {
      let errorData = fetchError.message || fetchError.name;
      if (options.onFetchError) {
        ({ error: errorData, data: responseData } = await options.onFetchError({
          data: responseData,
          error: fetchError,
          response: response.value,
          context,
          execute
        }));
      }
      error.value = errorData;
      if (options.updateDataOnError)
        data.value = responseData;
      errorEvent.trigger(fetchError);
      if (throwOnFailed)
        throw fetchError;
      return null;
    }).finally(() => {
      if (currentExecuteCounter === executeCounter)
        loading(false);
      if (timer)
        timer.stop();
      finallyEvent.trigger(null);
    });
  };
  const refetch = toRef2(options.refetch);
  watch2([
    refetch,
    toRef2(url)
  ], ([refetch2]) => refetch2 && execute(), { deep: true });
  const shell = {
    isFinished: readonly(isFinished),
    isFetching: readonly(isFetching),
    statusCode,
    response,
    error,
    data,
    canAbort,
    aborted,
    abort,
    execute,
    onFetchResponse: responseEvent.on,
    onFetchError: errorEvent.on,
    onFetchFinally: finallyEvent.on,
    get: setMethod("GET"),
    put: setMethod("PUT"),
    post: setMethod("POST"),
    delete: setMethod("DELETE"),
    patch: setMethod("PATCH"),
    head: setMethod("HEAD"),
    options: setMethod("OPTIONS"),
    json: setType("json"),
    text: setType("text"),
    blob: setType("blob"),
    arrayBuffer: setType("arrayBuffer"),
    formData: setType("formData")
  };
  function setMethod(method) {
    return (payload, payloadType) => {
      if (!isFetching.value) {
        config.method = method;
        config.payload = payload;
        config.payloadType = payloadType;
        if (isRef(config.payload)) {
          watch2([
            refetch,
            toRef2(config.payload)
          ], ([refetch2]) => refetch2 && execute(), { deep: true });
        }
        return {
          ...shell,
          then(onFulfilled, onRejected) {
            return waitUntilFinished().then(onFulfilled, onRejected);
          }
        };
      }
      return;
    };
  }
  function waitUntilFinished() {
    return new Promise((resolve, reject) => {
      until(isFinished).toBe(true).then(() => resolve(shell)).catch(reject);
    });
  }
  function setType(type) {
    return () => {
      if (!isFetching.value) {
        config.type = type;
        return {
          ...shell,
          then(onFulfilled, onRejected) {
            return waitUntilFinished().then(onFulfilled, onRejected);
          }
        };
      }
      return;
    };
  }
  if (options.immediate)
    Promise.resolve().then(() => execute());
  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return waitUntilFinished().then(onFulfilled, onRejected);
    }
  };
}
function joinPaths(start, end) {
  if (!start.endsWith("/") && !end.startsWith("/")) {
    return `${start}/${end}`;
  }
  if (start.endsWith("/") && end.startsWith("/")) {
    return `${start.slice(0, -1)}${end}`;
  }
  return `${start}${end}`;
}
var DEFAULT_OPTIONS = {
  multiple: true,
  accept: "*",
  reset: false,
  directory: false
};
function prepareInitialFiles(files) {
  if (!files)
    return null;
  if (files instanceof FileList)
    return files;
  const dt = new DataTransfer;
  for (const file of files) {
    dt.items.add(file);
  }
  return dt.files;
}
function useFileDialog(options = {}) {
  const {
    document: document2 = defaultDocument
  } = options;
  const files = ref(prepareInitialFiles(options.initialFiles));
  const { on: onChange, trigger: changeTrigger } = createEventHook();
  const { on: onCancel, trigger: cancelTrigger } = createEventHook();
  let input;
  if (document2) {
    input = unrefElement(options.input) || document2.createElement("input");
    input.type = "file";
    input.onchange = (event) => {
      const result = event.target;
      files.value = result.files;
      changeTrigger(files.value);
    };
    input.oncancel = () => {
      cancelTrigger();
    };
  }
  const reset = () => {
    files.value = null;
    if (input && input.value) {
      input.value = "";
      changeTrigger(null);
    }
  };
  const open = (localOptions) => {
    if (!input)
      return;
    const _options = {
      ...DEFAULT_OPTIONS,
      ...options,
      ...localOptions
    };
    input.multiple = _options.multiple;
    input.accept = _options.accept;
    input.webkitdirectory = _options.directory;
    if (hasOwn2(_options, "capture"))
      input.capture = _options.capture;
    if (_options.reset)
      reset();
    input.click();
  };
  return {
    files: readonly(files),
    open,
    reset,
    onCancel,
    onChange
  };
}
function useFileSystemAccess(options = {}) {
  const {
    window: _window = defaultWindow,
    dataType = "Text"
  } = options;
  const window2 = _window;
  const isSupported = useSupported(() => window2 && ("showSaveFilePicker" in window2) && ("showOpenFilePicker" in window2));
  const fileHandle = shallowRef();
  const data = shallowRef();
  const file = shallowRef();
  const fileName = computed2(() => {
    var _a, _b;
    return (_b = (_a = file.value) == null ? undefined : _a.name) != null ? _b : "";
  });
  const fileMIME = computed2(() => {
    var _a, _b;
    return (_b = (_a = file.value) == null ? undefined : _a.type) != null ? _b : "";
  });
  const fileSize = computed2(() => {
    var _a, _b;
    return (_b = (_a = file.value) == null ? undefined : _a.size) != null ? _b : 0;
  });
  const fileLastModified = computed2(() => {
    var _a, _b;
    return (_b = (_a = file.value) == null ? undefined : _a.lastModified) != null ? _b : 0;
  });
  async function open(_options = {}) {
    if (!isSupported.value)
      return;
    const [handle] = await window2.showOpenFilePicker({ ...toValue(options), ..._options });
    fileHandle.value = handle;
    await updateData();
  }
  async function create(_options = {}) {
    if (!isSupported.value)
      return;
    fileHandle.value = await window2.showSaveFilePicker({ ...options, ..._options });
    data.value = undefined;
    await updateData();
  }
  async function save(_options = {}) {
    if (!isSupported.value)
      return;
    if (!fileHandle.value)
      return saveAs(_options);
    if (data.value) {
      const writableStream = await fileHandle.value.createWritable();
      await writableStream.write(data.value);
      await writableStream.close();
    }
    await updateFile();
  }
  async function saveAs(_options = {}) {
    if (!isSupported.value)
      return;
    fileHandle.value = await window2.showSaveFilePicker({ ...options, ..._options });
    if (data.value) {
      const writableStream = await fileHandle.value.createWritable();
      await writableStream.write(data.value);
      await writableStream.close();
    }
    await updateFile();
  }
  async function updateFile() {
    var _a;
    file.value = await ((_a = fileHandle.value) == null ? undefined : _a.getFile());
  }
  async function updateData() {
    var _a, _b;
    await updateFile();
    const type = toValue(dataType);
    if (type === "Text")
      data.value = await ((_a = file.value) == null ? undefined : _a.text());
    else if (type === "ArrayBuffer")
      data.value = await ((_b = file.value) == null ? undefined : _b.arrayBuffer());
    else if (type === "Blob")
      data.value = file.value;
  }
  watch2(() => toValue(dataType), updateData);
  return {
    isSupported,
    data,
    file,
    fileName,
    fileMIME,
    fileSize,
    fileLastModified,
    open,
    create,
    save,
    saveAs,
    updateData
  };
}
function useFocus(target, options = {}) {
  const { initialValue = false, focusVisible = false, preventScroll = false } = options;
  const innerFocused = shallowRef(false);
  const targetElement = computed2(() => unrefElement(target));
  const listenerOptions = { passive: true };
  useEventListener(targetElement, "focus", (event) => {
    var _a, _b;
    if (!focusVisible || ((_b = (_a = event.target).matches) == null ? undefined : _b.call(_a, ":focus-visible")))
      innerFocused.value = true;
  }, listenerOptions);
  useEventListener(targetElement, "blur", () => innerFocused.value = false, listenerOptions);
  const focused = computed2({
    get: () => innerFocused.value,
    set(value) {
      var _a, _b;
      if (!value && innerFocused.value)
        (_a = targetElement.value) == null || _a.blur();
      else if (value && !innerFocused.value)
        (_b = targetElement.value) == null || _b.focus({ preventScroll });
    }
  });
  watch2(targetElement, () => {
    focused.value = initialValue;
  }, { immediate: true, flush: "post" });
  return { focused };
}
var EVENT_FOCUS_IN = "focusin";
var EVENT_FOCUS_OUT = "focusout";
var PSEUDO_CLASS_FOCUS_WITHIN = ":focus-within";
function useFocusWithin(target, options = {}) {
  const { window: window2 = defaultWindow } = options;
  const targetElement = computed2(() => unrefElement(target));
  const _focused = shallowRef(false);
  const focused = computed2(() => _focused.value);
  const activeElement = useActiveElement(options);
  if (!window2 || !activeElement.value) {
    return { focused };
  }
  const listenerOptions = { passive: true };
  useEventListener(targetElement, EVENT_FOCUS_IN, () => _focused.value = true, listenerOptions);
  useEventListener(targetElement, EVENT_FOCUS_OUT, () => {
    var _a, _b, _c;
    return _focused.value = (_c = (_b = (_a = targetElement.value) == null ? undefined : _a.matches) == null ? undefined : _b.call(_a, PSEUDO_CLASS_FOCUS_WITHIN)) != null ? _c : false;
  }, listenerOptions);
  return { focused };
}
function useFps(options) {
  var _a;
  const fps = shallowRef(0);
  if (typeof performance === "undefined")
    return fps;
  const every = (_a = options == null ? undefined : options.every) != null ? _a : 10;
  let last = performance.now();
  let ticks = 0;
  useRafFn(() => {
    ticks += 1;
    if (ticks >= every) {
      const now = performance.now();
      const diff = now - last;
      fps.value = Math.round(1000 / (diff / ticks));
      last = now;
      ticks = 0;
    }
  });
  return fps;
}
var eventHandlers = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "webkitendfullscreen",
  "mozfullscreenchange",
  "MSFullscreenChange"
];
function useFullscreen(target, options = {}) {
  const {
    document: document2 = defaultDocument,
    autoExit = false
  } = options;
  const targetRef = computed2(() => {
    var _a;
    return (_a = unrefElement(target)) != null ? _a : document2 == null ? undefined : document2.documentElement;
  });
  const isFullscreen = shallowRef(false);
  const requestMethod = computed2(() => {
    return [
      "requestFullscreen",
      "webkitRequestFullscreen",
      "webkitEnterFullscreen",
      "webkitEnterFullScreen",
      "webkitRequestFullScreen",
      "mozRequestFullScreen",
      "msRequestFullscreen"
    ].find((m) => document2 && (m in document2) || targetRef.value && (m in targetRef.value));
  });
  const exitMethod = computed2(() => {
    return [
      "exitFullscreen",
      "webkitExitFullscreen",
      "webkitExitFullScreen",
      "webkitCancelFullScreen",
      "mozCancelFullScreen",
      "msExitFullscreen"
    ].find((m) => document2 && (m in document2) || targetRef.value && (m in targetRef.value));
  });
  const fullscreenEnabled = computed2(() => {
    return [
      "fullScreen",
      "webkitIsFullScreen",
      "webkitDisplayingFullscreen",
      "mozFullScreen",
      "msFullscreenElement"
    ].find((m) => document2 && (m in document2) || targetRef.value && (m in targetRef.value));
  });
  const fullscreenElementMethod = [
    "fullscreenElement",
    "webkitFullscreenElement",
    "mozFullScreenElement",
    "msFullscreenElement"
  ].find((m) => document2 && (m in document2));
  const isSupported = useSupported(() => targetRef.value && document2 && requestMethod.value !== undefined && exitMethod.value !== undefined && fullscreenEnabled.value !== undefined);
  const isCurrentElementFullScreen = () => {
    if (fullscreenElementMethod)
      return (document2 == null ? undefined : document2[fullscreenElementMethod]) === targetRef.value;
    return false;
  };
  const isElementFullScreen = () => {
    if (fullscreenEnabled.value) {
      if (document2 && document2[fullscreenEnabled.value] != null) {
        return document2[fullscreenEnabled.value];
      } else {
        const target2 = targetRef.value;
        if ((target2 == null ? undefined : target2[fullscreenEnabled.value]) != null) {
          return Boolean(target2[fullscreenEnabled.value]);
        }
      }
    }
    return false;
  };
  async function exit() {
    if (!isSupported.value || !isFullscreen.value)
      return;
    if (exitMethod.value) {
      if ((document2 == null ? undefined : document2[exitMethod.value]) != null) {
        await document2[exitMethod.value]();
      } else {
        const target2 = targetRef.value;
        if ((target2 == null ? undefined : target2[exitMethod.value]) != null)
          await target2[exitMethod.value]();
      }
    }
    isFullscreen.value = false;
  }
  async function enter() {
    if (!isSupported.value || isFullscreen.value)
      return;
    if (isElementFullScreen())
      await exit();
    const target2 = targetRef.value;
    if (requestMethod.value && (target2 == null ? undefined : target2[requestMethod.value]) != null) {
      await target2[requestMethod.value]();
      isFullscreen.value = true;
    }
  }
  async function toggle() {
    await (isFullscreen.value ? exit() : enter());
  }
  const handlerCallback = () => {
    const isElementFullScreenValue = isElementFullScreen();
    if (!isElementFullScreenValue || isElementFullScreenValue && isCurrentElementFullScreen())
      isFullscreen.value = isElementFullScreenValue;
  };
  const listenerOptions = { capture: false, passive: true };
  useEventListener(document2, eventHandlers, handlerCallback, listenerOptions);
  useEventListener(() => unrefElement(targetRef), eventHandlers, handlerCallback, listenerOptions);
  tryOnMounted(handlerCallback, false);
  if (autoExit)
    tryOnScopeDispose(exit);
  return {
    isSupported,
    isFullscreen,
    enter,
    exit,
    toggle
  };
}
function mapGamepadToXbox360Controller(gamepad) {
  return computed2(() => {
    if (gamepad.value) {
      return {
        buttons: {
          a: gamepad.value.buttons[0],
          b: gamepad.value.buttons[1],
          x: gamepad.value.buttons[2],
          y: gamepad.value.buttons[3]
        },
        bumper: {
          left: gamepad.value.buttons[4],
          right: gamepad.value.buttons[5]
        },
        triggers: {
          left: gamepad.value.buttons[6],
          right: gamepad.value.buttons[7]
        },
        stick: {
          left: {
            horizontal: gamepad.value.axes[0],
            vertical: gamepad.value.axes[1],
            button: gamepad.value.buttons[10]
          },
          right: {
            horizontal: gamepad.value.axes[2],
            vertical: gamepad.value.axes[3],
            button: gamepad.value.buttons[11]
          }
        },
        dpad: {
          up: gamepad.value.buttons[12],
          down: gamepad.value.buttons[13],
          left: gamepad.value.buttons[14],
          right: gamepad.value.buttons[15]
        },
        back: gamepad.value.buttons[8],
        start: gamepad.value.buttons[9]
      };
    }
    return null;
  });
}
function useGamepad(options = {}) {
  const {
    navigator: navigator2 = defaultNavigator
  } = options;
  const isSupported = useSupported(() => navigator2 && ("getGamepads" in navigator2));
  const gamepads = ref([]);
  const onConnectedHook = createEventHook();
  const onDisconnectedHook = createEventHook();
  const stateFromGamepad = (gamepad) => {
    const hapticActuators = [];
    const vibrationActuator = "vibrationActuator" in gamepad ? gamepad.vibrationActuator : null;
    if (vibrationActuator)
      hapticActuators.push(vibrationActuator);
    if (gamepad.hapticActuators)
      hapticActuators.push(...gamepad.hapticActuators);
    return {
      id: gamepad.id,
      index: gamepad.index,
      connected: gamepad.connected,
      mapping: gamepad.mapping,
      timestamp: gamepad.timestamp,
      vibrationActuator: gamepad.vibrationActuator,
      hapticActuators,
      axes: gamepad.axes.map((axes) => axes),
      buttons: gamepad.buttons.map((button) => ({ pressed: button.pressed, touched: button.touched, value: button.value }))
    };
  };
  const updateGamepadState = () => {
    const _gamepads = (navigator2 == null ? undefined : navigator2.getGamepads()) || [];
    for (const gamepad of _gamepads) {
      if (gamepad && gamepads.value[gamepad.index])
        gamepads.value[gamepad.index] = stateFromGamepad(gamepad);
    }
  };
  const { isActive, pause, resume } = useRafFn(updateGamepadState);
  const onGamepadConnected = (gamepad) => {
    if (!gamepads.value.some(({ index }) => index === gamepad.index)) {
      gamepads.value.push(stateFromGamepad(gamepad));
      onConnectedHook.trigger(gamepad.index);
    }
    resume();
  };
  const onGamepadDisconnected = (gamepad) => {
    gamepads.value = gamepads.value.filter((x) => x.index !== gamepad.index);
    onDisconnectedHook.trigger(gamepad.index);
  };
  const listenerOptions = { passive: true };
  useEventListener("gamepadconnected", (e) => onGamepadConnected(e.gamepad), listenerOptions);
  useEventListener("gamepaddisconnected", (e) => onGamepadDisconnected(e.gamepad), listenerOptions);
  tryOnMounted(() => {
    const _gamepads = (navigator2 == null ? undefined : navigator2.getGamepads()) || [];
    for (const gamepad of _gamepads) {
      if (gamepad && gamepads.value[gamepad.index])
        onGamepadConnected(gamepad);
    }
  });
  pause();
  return {
    isSupported,
    onConnected: onConnectedHook.on,
    onDisconnected: onDisconnectedHook.on,
    gamepads,
    pause,
    resume,
    isActive
  };
}
function useGeolocation(options = {}) {
  const {
    enableHighAccuracy = true,
    maximumAge = 30000,
    timeout = 27000,
    navigator: navigator2 = defaultNavigator,
    immediate = true
  } = options;
  const isSupported = useSupported(() => navigator2 && ("geolocation" in navigator2));
  const locatedAt = shallowRef(null);
  const error = shallowRef(null);
  const coords = ref({
    accuracy: 0,
    latitude: Number.POSITIVE_INFINITY,
    longitude: Number.POSITIVE_INFINITY,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  });
  function updatePosition(position) {
    locatedAt.value = position.timestamp;
    coords.value = position.coords;
    error.value = null;
  }
  let watcher;
  function resume() {
    if (isSupported.value) {
      watcher = navigator2.geolocation.watchPosition(updatePosition, (err) => error.value = err, {
        enableHighAccuracy,
        maximumAge,
        timeout
      });
    }
  }
  if (immediate)
    resume();
  function pause() {
    if (watcher && navigator2)
      navigator2.geolocation.clearWatch(watcher);
  }
  tryOnScopeDispose(() => {
    pause();
  });
  return {
    isSupported,
    coords,
    locatedAt,
    error,
    resume,
    pause
  };
}
var defaultEvents$1 = ["mousemove", "mousedown", "resize", "keydown", "touchstart", "wheel"];
var oneMinute = 60000;
function useIdle(timeout = oneMinute, options = {}) {
  const {
    initialState = false,
    listenForVisibilityChange = true,
    events: events2 = defaultEvents$1,
    window: window2 = defaultWindow,
    eventFilter = throttleFilter(50)
  } = options;
  const idle = shallowRef(initialState);
  const lastActive = shallowRef(timestamp());
  let timer;
  const reset = () => {
    idle.value = false;
    clearTimeout(timer);
    timer = setTimeout(() => idle.value = true, timeout);
  };
  const onEvent = createFilterWrapper(eventFilter, () => {
    lastActive.value = timestamp();
    reset();
  });
  if (window2) {
    const document2 = window2.document;
    const listenerOptions = { passive: true };
    for (const event of events2)
      useEventListener(window2, event, onEvent, listenerOptions);
    if (listenForVisibilityChange) {
      useEventListener(document2, "visibilitychange", () => {
        if (!document2.hidden)
          onEvent();
      }, listenerOptions);
    }
    if (!initialState)
      reset();
  }
  return {
    idle,
    lastActive,
    reset
  };
}
async function loadImage(options) {
  return new Promise((resolve, reject) => {
    const img = new Image;
    const { src, srcset, sizes, class: clazz, loading, crossorigin, referrerPolicy, width, height, decoding, fetchPriority, ismap, usemap } = options;
    img.src = src;
    if (srcset != null)
      img.srcset = srcset;
    if (sizes != null)
      img.sizes = sizes;
    if (clazz != null)
      img.className = clazz;
    if (loading != null)
      img.loading = loading;
    if (crossorigin != null)
      img.crossOrigin = crossorigin;
    if (referrerPolicy != null)
      img.referrerPolicy = referrerPolicy;
    if (width != null)
      img.width = width;
    if (height != null)
      img.height = height;
    if (decoding != null)
      img.decoding = decoding;
    if (fetchPriority != null)
      img.fetchPriority = fetchPriority;
    if (ismap != null)
      img.isMap = ismap;
    if (usemap != null)
      img.useMap = usemap;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}
function useImage(options, asyncStateOptions = {}) {
  const state = useAsyncState(() => loadImage(toValue(options)), undefined, {
    resetOnExecute: true,
    ...asyncStateOptions
  });
  watch2(() => toValue(options), () => state.execute(asyncStateOptions.delay), { deep: true });
  return state;
}
function resolveElement(el) {
  if (typeof Window !== "undefined" && el instanceof Window)
    return el.document.documentElement;
  if (typeof Document !== "undefined" && el instanceof Document)
    return el.documentElement;
  return el;
}
var ARRIVED_STATE_THRESHOLD_PIXELS = 1;
function useScroll(element, options = {}) {
  const {
    throttle = 0,
    idle = 200,
    onStop = noop,
    onScroll = noop,
    offset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    observe: _observe = {
      mutation: false
    },
    eventListenerOptions = {
      capture: false,
      passive: true
    },
    behavior = "auto",
    window: window2 = defaultWindow,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const observe = typeof _observe === "boolean" ? {
    mutation: _observe
  } : _observe;
  const internalX = shallowRef(0);
  const internalY = shallowRef(0);
  const x = computed2({
    get() {
      return internalX.value;
    },
    set(x2) {
      scrollTo(x2, undefined);
    }
  });
  const y = computed2({
    get() {
      return internalY.value;
    },
    set(y2) {
      scrollTo(undefined, y2);
    }
  });
  function scrollTo(_x, _y) {
    var _a, _b, _c, _d;
    if (!window2)
      return;
    const _element = toValue(element);
    if (!_element)
      return;
    (_c = _element instanceof Document ? window2.document.body : _element) == null || _c.scrollTo({
      top: (_a = toValue(_y)) != null ? _a : y.value,
      left: (_b = toValue(_x)) != null ? _b : x.value,
      behavior: toValue(behavior)
    });
    const scrollContainer = ((_d = _element == null ? undefined : _element.document) == null ? undefined : _d.documentElement) || (_element == null ? undefined : _element.documentElement) || _element;
    if (x != null)
      internalX.value = scrollContainer.scrollLeft;
    if (y != null)
      internalY.value = scrollContainer.scrollTop;
  }
  const isScrolling = shallowRef(false);
  const arrivedState = reactive({
    left: true,
    right: false,
    top: true,
    bottom: false
  });
  const directions = reactive({
    left: false,
    right: false,
    top: false,
    bottom: false
  });
  const onScrollEnd = (e) => {
    if (!isScrolling.value)
      return;
    isScrolling.value = false;
    directions.left = false;
    directions.right = false;
    directions.top = false;
    directions.bottom = false;
    onStop(e);
  };
  const onScrollEndDebounced = useDebounceFn(onScrollEnd, throttle + idle);
  const setArrivedState = (target) => {
    var _a;
    if (!window2)
      return;
    const el = ((_a = target == null ? undefined : target.document) == null ? undefined : _a.documentElement) || (target == null ? undefined : target.documentElement) || unrefElement(target);
    const { display, flexDirection, direction } = getComputedStyle(el);
    const directionMultipler = direction === "rtl" ? -1 : 1;
    const scrollLeft = el.scrollLeft;
    directions.left = scrollLeft < internalX.value;
    directions.right = scrollLeft > internalX.value;
    const left = Math.abs(scrollLeft * directionMultipler) <= (offset.left || 0);
    const right = Math.abs(scrollLeft * directionMultipler) + el.clientWidth >= el.scrollWidth - (offset.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
    if (display === "flex" && flexDirection === "row-reverse") {
      arrivedState.left = right;
      arrivedState.right = left;
    } else {
      arrivedState.left = left;
      arrivedState.right = right;
    }
    internalX.value = scrollLeft;
    let scrollTop = el.scrollTop;
    if (target === window2.document && !scrollTop)
      scrollTop = window2.document.body.scrollTop;
    directions.top = scrollTop < internalY.value;
    directions.bottom = scrollTop > internalY.value;
    const top = Math.abs(scrollTop) <= (offset.top || 0);
    const bottom = Math.abs(scrollTop) + el.clientHeight >= el.scrollHeight - (offset.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
    if (display === "flex" && flexDirection === "column-reverse") {
      arrivedState.top = bottom;
      arrivedState.bottom = top;
    } else {
      arrivedState.top = top;
      arrivedState.bottom = bottom;
    }
    internalY.value = scrollTop;
  };
  const onScrollHandler = (e) => {
    var _a;
    if (!window2)
      return;
    const eventTarget = (_a = e.target.documentElement) != null ? _a : e.target;
    setArrivedState(eventTarget);
    isScrolling.value = true;
    onScrollEndDebounced(e);
    onScroll(e);
  };
  useEventListener(element, "scroll", throttle ? useThrottleFn(onScrollHandler, throttle, true, false) : onScrollHandler, eventListenerOptions);
  tryOnMounted(() => {
    try {
      const _element = toValue(element);
      if (!_element)
        return;
      setArrivedState(_element);
    } catch (e) {
      onError(e);
    }
  });
  if ((observe == null ? undefined : observe.mutation) && element != null && element !== window2 && element !== document) {
    useMutationObserver(element, () => {
      const _element = toValue(element);
      if (!_element)
        return;
      setArrivedState(_element);
    }, {
      attributes: true,
      childList: true,
      subtree: true
    });
  }
  useEventListener(element, "scrollend", onScrollEnd, eventListenerOptions);
  return {
    x,
    y,
    isScrolling,
    arrivedState,
    directions,
    measure() {
      const _element = toValue(element);
      if (window2 && _element)
        setArrivedState(_element);
    }
  };
}
function useInfiniteScroll(element, onLoadMore, options = {}) {
  var _a;
  const {
    direction = "bottom",
    interval = 100,
    canLoadMore = () => true
  } = options;
  const state = reactive(useScroll(element, {
    ...options,
    offset: {
      [direction]: (_a = options.distance) != null ? _a : 0,
      ...options.offset
    }
  }));
  const promise = ref();
  const isLoading = computed2(() => !!promise.value);
  const observedElement = computed2(() => {
    return resolveElement(toValue(element));
  });
  const isElementVisible = useElementVisibility(observedElement);
  function checkAndLoad() {
    state.measure();
    if (!observedElement.value || !isElementVisible.value || !canLoadMore(observedElement.value))
      return;
    const { scrollHeight, clientHeight, scrollWidth, clientWidth } = observedElement.value;
    const isNarrower = direction === "bottom" || direction === "top" ? scrollHeight <= clientHeight : scrollWidth <= clientWidth;
    if (state.arrivedState[direction] || isNarrower) {
      if (!promise.value) {
        promise.value = Promise.all([
          onLoadMore(state),
          new Promise((resolve) => setTimeout(resolve, interval))
        ]).finally(() => {
          promise.value = null;
          nextTick(() => checkAndLoad());
        });
      }
    }
  }
  const stop2 = watch2(() => [state.arrivedState[direction], isElementVisible.value], checkAndLoad, { immediate: true });
  tryOnUnmounted(stop2);
  return {
    isLoading,
    reset() {
      nextTick(() => checkAndLoad());
    }
  };
}
var defaultEvents = ["mousedown", "mouseup", "keydown", "keyup"];
function useKeyModifier(modifier, options = {}) {
  const {
    events: events2 = defaultEvents,
    document: document2 = defaultDocument,
    initial = null
  } = options;
  const state = shallowRef(initial);
  if (document2) {
    events2.forEach((listenerEvent) => {
      useEventListener(document2, listenerEvent, (evt) => {
        if (typeof evt.getModifierState === "function")
          state.value = evt.getModifierState(modifier);
      }, { passive: true });
    });
  }
  return state;
}
function useLocalStorage(key, initialValue, options = {}) {
  const { window: window2 = defaultWindow } = options;
  return useStorage(key, initialValue, window2 == null ? undefined : window2.localStorage, options);
}
var DefaultMagicKeysAliasMap = {
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
  const {
    reactive: useReactive = false,
    target = defaultWindow,
    aliasMap = DefaultMagicKeysAliasMap,
    passive = true,
    onEventFired = noop
  } = options;
  const current = reactive(/* @__PURE__ */ new Set);
  const obj = {
    toJSON() {
      return {};
    },
    current
  };
  const refs = useReactive ? reactive(obj) : obj;
  const metaDeps = /* @__PURE__ */ new Set;
  const shiftDeps = /* @__PURE__ */ new Set;
  const usedKeys = /* @__PURE__ */ new Set;
  function setRefs(key, value) {
    if (key in refs) {
      if (useReactive)
        refs[key] = value;
      else
        refs[key].value = value;
    }
  }
  function reset() {
    current.clear();
    for (const key of usedKeys)
      setRefs(key, false);
  }
  function updateRefs(e, value) {
    var _a, _b;
    const key = (_a = e.key) == null ? undefined : _a.toLowerCase();
    const code = (_b = e.code) == null ? undefined : _b.toLowerCase();
    const values = [code, key].filter(Boolean);
    if (key) {
      if (value)
        current.add(key);
      else
        current.delete(key);
    }
    for (const key2 of values) {
      usedKeys.add(key2);
      setRefs(key2, value);
    }
    if (key === "shift" && !value) {
      shiftDeps.forEach((key2) => {
        current.delete(key2);
        setRefs(key2, false);
      });
      shiftDeps.clear();
    } else if (typeof e.getModifierState === "function" && e.getModifierState("Shift") && value) {
      [...current, ...values].forEach((key2) => shiftDeps.add(key2));
    }
    if (key === "meta" && !value) {
      metaDeps.forEach((key2) => {
        current.delete(key2);
        setRefs(key2, false);
      });
      metaDeps.clear();
    } else if (typeof e.getModifierState === "function" && e.getModifierState("Meta") && value) {
      [...current, ...values].forEach((key2) => metaDeps.add(key2));
    }
  }
  useEventListener(target, "keydown", (e) => {
    updateRefs(e, true);
    return onEventFired(e);
  }, { passive });
  useEventListener(target, "keyup", (e) => {
    updateRefs(e, false);
    return onEventFired(e);
  }, { passive });
  useEventListener("blur", reset, { passive });
  useEventListener("focus", reset, { passive });
  const proxy = new Proxy(refs, {
    get(target2, prop, rec) {
      if (typeof prop !== "string")
        return Reflect.get(target2, prop, rec);
      prop = prop.toLowerCase();
      if (prop in aliasMap)
        prop = aliasMap[prop];
      if (!(prop in refs)) {
        if (/[+_-]/.test(prop)) {
          const keys = prop.split(/[+_-]/g).map((i) => i.trim());
          refs[prop] = computed2(() => keys.map((key) => toValue(proxy[key])).every(Boolean));
        } else {
          refs[prop] = shallowRef(false);
        }
      }
      const r = Reflect.get(target2, prop, rec);
      return useReactive ? toValue(r) : r;
    }
  });
  return proxy;
}
function usingElRef(source, cb) {
  if (toValue(source))
    cb(toValue(source));
}
function timeRangeToArray(timeRanges) {
  let ranges = [];
  for (let i = 0;i < timeRanges.length; ++i)
    ranges = [...ranges, [timeRanges.start(i), timeRanges.end(i)]];
  return ranges;
}
function tracksToArray(tracks) {
  return Array.from(tracks).map(({ label, kind, language, mode, activeCues, cues, inBandMetadataTrackDispatchType }, id) => ({ id, label, kind, language, mode, activeCues, cues, inBandMetadataTrackDispatchType }));
}
var defaultOptions = {
  src: "",
  tracks: []
};
function useMediaControls(target, options = {}) {
  target = toRef2(target);
  options = {
    ...defaultOptions,
    ...options
  };
  const {
    document: document2 = defaultDocument
  } = options;
  const listenerOptions = { passive: true };
  const currentTime = shallowRef(0);
  const duration = shallowRef(0);
  const seeking = shallowRef(false);
  const volume = shallowRef(1);
  const waiting = shallowRef(false);
  const ended = shallowRef(false);
  const playing = shallowRef(false);
  const rate = shallowRef(1);
  const stalled = shallowRef(false);
  const buffered = ref([]);
  const tracks = ref([]);
  const selectedTrack = shallowRef(-1);
  const isPictureInPicture = shallowRef(false);
  const muted = shallowRef(false);
  const supportsPictureInPicture = document2 && "pictureInPictureEnabled" in document2;
  const sourceErrorEvent = createEventHook();
  const playbackErrorEvent = createEventHook();
  const disableTrack = (track2) => {
    usingElRef(target, (el) => {
      if (track2) {
        const id = typeof track2 === "number" ? track2 : track2.id;
        el.textTracks[id].mode = "disabled";
      } else {
        for (let i = 0;i < el.textTracks.length; ++i)
          el.textTracks[i].mode = "disabled";
      }
      selectedTrack.value = -1;
    });
  };
  const enableTrack = (track2, disableTracks = true) => {
    usingElRef(target, (el) => {
      const id = typeof track2 === "number" ? track2 : track2.id;
      if (disableTracks)
        disableTrack();
      el.textTracks[id].mode = "showing";
      selectedTrack.value = id;
    });
  };
  const togglePictureInPicture = () => {
    return new Promise((resolve, reject) => {
      usingElRef(target, async (el) => {
        if (supportsPictureInPicture) {
          if (!isPictureInPicture.value) {
            el.requestPictureInPicture().then(resolve).catch(reject);
          } else {
            document2.exitPictureInPicture().then(resolve).catch(reject);
          }
        }
      });
    });
  };
  watchEffect(() => {
    if (!document2)
      return;
    const el = toValue(target);
    if (!el)
      return;
    const src = toValue(options.src);
    let sources = [];
    if (!src)
      return;
    if (typeof src === "string")
      sources = [{ src }];
    else if (Array.isArray(src))
      sources = src;
    else if (isObject2(src))
      sources = [src];
    el.querySelectorAll("source").forEach((e) => {
      e.remove();
    });
    sources.forEach(({ src: src2, type, media }) => {
      const source = document2.createElement("source");
      source.setAttribute("src", src2);
      source.setAttribute("type", type || "");
      source.setAttribute("media", media || "");
      useEventListener(source, "error", sourceErrorEvent.trigger, listenerOptions);
      el.appendChild(source);
    });
    el.load();
  });
  watch2([target, volume], () => {
    const el = toValue(target);
    if (!el)
      return;
    el.volume = volume.value;
  });
  watch2([target, muted], () => {
    const el = toValue(target);
    if (!el)
      return;
    el.muted = muted.value;
  });
  watch2([target, rate], () => {
    const el = toValue(target);
    if (!el)
      return;
    el.playbackRate = rate.value;
  });
  watchEffect(() => {
    if (!document2)
      return;
    const textTracks = toValue(options.tracks);
    const el = toValue(target);
    if (!textTracks || !textTracks.length || !el)
      return;
    el.querySelectorAll("track").forEach((e) => e.remove());
    textTracks.forEach(({ default: isDefault, kind, label, src, srcLang }, i) => {
      const track2 = document2.createElement("track");
      track2.default = isDefault || false;
      track2.kind = kind;
      track2.label = label;
      track2.src = src;
      track2.srclang = srcLang;
      if (track2.default)
        selectedTrack.value = i;
      el.appendChild(track2);
    });
  });
  const { ignoreUpdates: ignoreCurrentTimeUpdates } = watchIgnorable(currentTime, (time) => {
    const el = toValue(target);
    if (!el)
      return;
    el.currentTime = time;
  });
  const { ignoreUpdates: ignorePlayingUpdates } = watchIgnorable(playing, (isPlaying) => {
    const el = toValue(target);
    if (!el)
      return;
    if (isPlaying) {
      el.play().catch((e) => {
        playbackErrorEvent.trigger(e);
        throw e;
      });
    } else {
      el.pause();
    }
  });
  useEventListener(target, "timeupdate", () => ignoreCurrentTimeUpdates(() => currentTime.value = toValue(target).currentTime), listenerOptions);
  useEventListener(target, "durationchange", () => duration.value = toValue(target).duration, listenerOptions);
  useEventListener(target, "progress", () => buffered.value = timeRangeToArray(toValue(target).buffered), listenerOptions);
  useEventListener(target, "seeking", () => seeking.value = true, listenerOptions);
  useEventListener(target, "seeked", () => seeking.value = false, listenerOptions);
  useEventListener(target, ["waiting", "loadstart"], () => {
    waiting.value = true;
    ignorePlayingUpdates(() => playing.value = false);
  }, listenerOptions);
  useEventListener(target, "loadeddata", () => waiting.value = false, listenerOptions);
  useEventListener(target, "playing", () => {
    waiting.value = false;
    ended.value = false;
    ignorePlayingUpdates(() => playing.value = true);
  }, listenerOptions);
  useEventListener(target, "ratechange", () => rate.value = toValue(target).playbackRate, listenerOptions);
  useEventListener(target, "stalled", () => stalled.value = true, listenerOptions);
  useEventListener(target, "ended", () => ended.value = true, listenerOptions);
  useEventListener(target, "pause", () => ignorePlayingUpdates(() => playing.value = false), listenerOptions);
  useEventListener(target, "play", () => ignorePlayingUpdates(() => playing.value = true), listenerOptions);
  useEventListener(target, "enterpictureinpicture", () => isPictureInPicture.value = true, listenerOptions);
  useEventListener(target, "leavepictureinpicture", () => isPictureInPicture.value = false, listenerOptions);
  useEventListener(target, "volumechange", () => {
    const el = toValue(target);
    if (!el)
      return;
    volume.value = el.volume;
    muted.value = el.muted;
  }, listenerOptions);
  const listeners = [];
  const stop2 = watch2([target], () => {
    const el = toValue(target);
    if (!el)
      return;
    stop2();
    listeners[0] = useEventListener(el.textTracks, "addtrack", () => tracks.value = tracksToArray(el.textTracks), listenerOptions);
    listeners[1] = useEventListener(el.textTracks, "removetrack", () => tracks.value = tracksToArray(el.textTracks), listenerOptions);
    listeners[2] = useEventListener(el.textTracks, "change", () => tracks.value = tracksToArray(el.textTracks), listenerOptions);
  });
  tryOnScopeDispose(() => listeners.forEach((listener) => listener()));
  return {
    currentTime,
    duration,
    waiting,
    seeking,
    ended,
    stalled,
    buffered,
    playing,
    rate,
    volume,
    muted,
    tracks,
    selectedTrack,
    enableTrack,
    disableTrack,
    supportsPictureInPicture,
    togglePictureInPicture,
    isPictureInPicture,
    onSourceError: sourceErrorEvent.on,
    onPlaybackError: playbackErrorEvent.on
  };
}
function useMemoize(resolver, options) {
  const initCache = () => {
    if (options == null ? undefined : options.cache)
      return shallowReactive(options.cache);
    return shallowReactive(/* @__PURE__ */ new Map);
  };
  const cache = initCache();
  const generateKey = (...args) => (options == null ? undefined : options.getKey) ? options.getKey(...args) : JSON.stringify(args);
  const _loadData = (key, ...args) => {
    cache.set(key, resolver(...args));
    return cache.get(key);
  };
  const loadData = (...args) => _loadData(generateKey(...args), ...args);
  const deleteData = (...args) => {
    cache.delete(generateKey(...args));
  };
  const clearData = () => {
    cache.clear();
  };
  const memoized = (...args) => {
    const key = generateKey(...args);
    if (cache.has(key))
      return cache.get(key);
    return _loadData(key, ...args);
  };
  memoized.load = loadData;
  memoized.delete = deleteData;
  memoized.clear = clearData;
  memoized.generateKey = generateKey;
  memoized.cache = cache;
  return memoized;
}
function useMemory(options = {}) {
  const memory = ref();
  const isSupported = useSupported(() => typeof performance !== "undefined" && ("memory" in performance));
  if (isSupported.value) {
    const { interval = 1000 } = options;
    useIntervalFn(() => {
      memory.value = performance.memory;
    }, interval, { immediate: options.immediate, immediateCallback: options.immediateCallback });
  }
  return { isSupported, memory };
}
var UseMouseBuiltinExtractors = {
  page: (event) => [event.pageX, event.pageY],
  client: (event) => [event.clientX, event.clientY],
  screen: (event) => [event.screenX, event.screenY],
  movement: (event) => event instanceof MouseEvent ? [event.movementX, event.movementY] : null
};
function useMouse(options = {}) {
  const {
    type = "page",
    touch = true,
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 },
    window: window2 = defaultWindow,
    target = window2,
    scroll = true,
    eventFilter
  } = options;
  let _prevMouseEvent = null;
  let _prevScrollX = 0;
  let _prevScrollY = 0;
  const x = shallowRef(initialValue.x);
  const y = shallowRef(initialValue.y);
  const sourceType = shallowRef(null);
  const extractor = typeof type === "function" ? type : UseMouseBuiltinExtractors[type];
  const mouseHandler = (event) => {
    const result = extractor(event);
    _prevMouseEvent = event;
    if (result) {
      [x.value, y.value] = result;
      sourceType.value = "mouse";
    }
    if (window2) {
      _prevScrollX = window2.scrollX;
      _prevScrollY = window2.scrollY;
    }
  };
  const touchHandler = (event) => {
    if (event.touches.length > 0) {
      const result = extractor(event.touches[0]);
      if (result) {
        [x.value, y.value] = result;
        sourceType.value = "touch";
      }
    }
  };
  const scrollHandler = () => {
    if (!_prevMouseEvent || !window2)
      return;
    const pos = extractor(_prevMouseEvent);
    if (_prevMouseEvent instanceof MouseEvent && pos) {
      x.value = pos[0] + window2.scrollX - _prevScrollX;
      y.value = pos[1] + window2.scrollY - _prevScrollY;
    }
  };
  const reset = () => {
    x.value = initialValue.x;
    y.value = initialValue.y;
  };
  const mouseHandlerWrapper = eventFilter ? (event) => eventFilter(() => mouseHandler(event), {}) : (event) => mouseHandler(event);
  const touchHandlerWrapper = eventFilter ? (event) => eventFilter(() => touchHandler(event), {}) : (event) => touchHandler(event);
  const scrollHandlerWrapper = eventFilter ? () => eventFilter(() => scrollHandler(), {}) : () => scrollHandler();
  if (target) {
    const listenerOptions = { passive: true };
    useEventListener(target, ["mousemove", "dragover"], mouseHandlerWrapper, listenerOptions);
    if (touch && type !== "movement") {
      useEventListener(target, ["touchstart", "touchmove"], touchHandlerWrapper, listenerOptions);
      if (resetOnTouchEnds)
        useEventListener(target, "touchend", reset, listenerOptions);
    }
    if (scroll && type === "page")
      useEventListener(window2, "scroll", scrollHandlerWrapper, listenerOptions);
  }
  return {
    x,
    y,
    sourceType
  };
}
function useMouseInElement(target, options = {}) {
  const {
    windowResize = true,
    windowScroll = true,
    handleOutside = true,
    window: window2 = defaultWindow
  } = options;
  const type = options.type || "page";
  const { x, y, sourceType } = useMouse(options);
  const targetRef = shallowRef(target != null ? target : window2 == null ? undefined : window2.document.body);
  const elementX = shallowRef(0);
  const elementY = shallowRef(0);
  const elementPositionX = shallowRef(0);
  const elementPositionY = shallowRef(0);
  const elementHeight = shallowRef(0);
  const elementWidth = shallowRef(0);
  const isOutside = shallowRef(true);
  function update() {
    if (!window2)
      return;
    const el = unrefElement(targetRef);
    if (!el || !(el instanceof Element))
      return;
    const {
      left,
      top,
      width,
      height
    } = el.getBoundingClientRect();
    elementPositionX.value = left + (type === "page" ? window2.pageXOffset : 0);
    elementPositionY.value = top + (type === "page" ? window2.pageYOffset : 0);
    elementHeight.value = height;
    elementWidth.value = width;
    const elX = x.value - elementPositionX.value;
    const elY = y.value - elementPositionY.value;
    isOutside.value = width === 0 || height === 0 || elX < 0 || elY < 0 || elX > width || elY > height;
    if (handleOutside) {
      elementX.value = elX;
      elementY.value = elY;
    }
  }
  const stopFnList = [];
  function stop2() {
    stopFnList.forEach((fn) => fn());
    stopFnList.length = 0;
  }
  tryOnMounted(() => {
    update();
  });
  if (window2) {
    const {
      stop: stopResizeObserver
    } = useResizeObserver(targetRef, update);
    const {
      stop: stopMutationObserver
    } = useMutationObserver(targetRef, update, {
      attributeFilter: ["style", "class"]
    });
    const stopWatch = watch2([targetRef, x, y], update);
    stopFnList.push(stopResizeObserver, stopMutationObserver, stopWatch);
    useEventListener(document, "mouseleave", () => isOutside.value = true, { passive: true });
    if (windowScroll) {
      stopFnList.push(useEventListener("scroll", update, { capture: true, passive: true }));
    }
    if (windowResize) {
      stopFnList.push(useEventListener("resize", update, { passive: true }));
    }
  }
  return {
    x,
    y,
    sourceType,
    elementX,
    elementY,
    elementPositionX,
    elementPositionY,
    elementHeight,
    elementWidth,
    isOutside,
    stop: stop2
  };
}
function useMousePressed(options = {}) {
  const {
    touch = true,
    drag = true,
    capture = false,
    initialValue = false,
    window: window2 = defaultWindow
  } = options;
  const pressed = shallowRef(initialValue);
  const sourceType = shallowRef(null);
  if (!window2) {
    return {
      pressed,
      sourceType
    };
  }
  const onPressed = (srcType) => (event) => {
    var _a;
    pressed.value = true;
    sourceType.value = srcType;
    (_a = options.onPressed) == null || _a.call(options, event);
  };
  const onReleased = (event) => {
    var _a;
    pressed.value = false;
    sourceType.value = null;
    (_a = options.onReleased) == null || _a.call(options, event);
  };
  const target = computed2(() => unrefElement(options.target) || window2);
  const listenerOptions = { passive: true, capture };
  useEventListener(target, "mousedown", onPressed("mouse"), listenerOptions);
  useEventListener(window2, "mouseleave", onReleased, listenerOptions);
  useEventListener(window2, "mouseup", onReleased, listenerOptions);
  if (drag) {
    useEventListener(target, "dragstart", onPressed("mouse"), listenerOptions);
    useEventListener(window2, "drop", onReleased, listenerOptions);
    useEventListener(window2, "dragend", onReleased, listenerOptions);
  }
  if (touch) {
    useEventListener(target, "touchstart", onPressed("touch"), listenerOptions);
    useEventListener(window2, "touchend", onReleased, listenerOptions);
    useEventListener(window2, "touchcancel", onReleased, listenerOptions);
  }
  return {
    pressed,
    sourceType
  };
}
function useNavigatorLanguage(options = {}) {
  const { window: window2 = defaultWindow } = options;
  const navigator2 = window2 == null ? undefined : window2.navigator;
  const isSupported = useSupported(() => navigator2 && ("language" in navigator2));
  const language = shallowRef(navigator2 == null ? undefined : navigator2.language);
  useEventListener(window2, "languagechange", () => {
    if (navigator2)
      language.value = navigator2.language;
  }, { passive: true });
  return {
    isSupported,
    language
  };
}
function useNetwork(options = {}) {
  const { window: window2 = defaultWindow } = options;
  const navigator2 = window2 == null ? undefined : window2.navigator;
  const isSupported = useSupported(() => navigator2 && ("connection" in navigator2));
  const isOnline = shallowRef(true);
  const saveData = shallowRef(false);
  const offlineAt = shallowRef(undefined);
  const onlineAt = shallowRef(undefined);
  const downlink = shallowRef(undefined);
  const downlinkMax = shallowRef(undefined);
  const rtt = shallowRef(undefined);
  const effectiveType = shallowRef(undefined);
  const type = shallowRef("unknown");
  const connection = isSupported.value && navigator2.connection;
  function updateNetworkInformation() {
    if (!navigator2)
      return;
    isOnline.value = navigator2.onLine;
    offlineAt.value = isOnline.value ? undefined : Date.now();
    onlineAt.value = isOnline.value ? Date.now() : undefined;
    if (connection) {
      downlink.value = connection.downlink;
      downlinkMax.value = connection.downlinkMax;
      effectiveType.value = connection.effectiveType;
      rtt.value = connection.rtt;
      saveData.value = connection.saveData;
      type.value = connection.type;
    }
  }
  const listenerOptions = { passive: true };
  if (window2) {
    useEventListener(window2, "offline", () => {
      isOnline.value = false;
      offlineAt.value = Date.now();
    }, listenerOptions);
    useEventListener(window2, "online", () => {
      isOnline.value = true;
      onlineAt.value = Date.now();
    }, listenerOptions);
  }
  if (connection)
    useEventListener(connection, "change", updateNetworkInformation, listenerOptions);
  updateNetworkInformation();
  return {
    isSupported,
    isOnline: readonly(isOnline),
    saveData: readonly(saveData),
    offlineAt: readonly(offlineAt),
    onlineAt: readonly(onlineAt),
    downlink: readonly(downlink),
    downlinkMax: readonly(downlinkMax),
    effectiveType: readonly(effectiveType),
    rtt: readonly(rtt),
    type: readonly(type)
  };
}
function useNow(options = {}) {
  const {
    controls: exposeControls = false,
    interval = "requestAnimationFrame",
    immediate = true
  } = options;
  const now = ref(/* @__PURE__ */ new Date);
  const update = () => now.value = /* @__PURE__ */ new Date;
  const controls = interval === "requestAnimationFrame" ? useRafFn(update, { immediate }) : useIntervalFn(update, interval, { immediate });
  if (exposeControls) {
    return {
      now,
      ...controls
    };
  } else {
    return now;
  }
}
function useObjectUrl(object) {
  const url = shallowRef();
  const release = () => {
    if (url.value)
      URL.revokeObjectURL(url.value);
    url.value = undefined;
  };
  watch2(() => toValue(object), (newObject) => {
    release();
    if (newObject)
      url.value = URL.createObjectURL(newObject);
  }, { immediate: true });
  tryOnScopeDispose(release);
  return readonly(url);
}
function useClamp(value, min, max) {
  if (typeof value === "function" || isReadonly(value))
    return computed2(() => clamp(toValue(value), toValue(min), toValue(max)));
  const _value = ref(value);
  return computed2({
    get() {
      return _value.value = clamp(_value.value, toValue(min), toValue(max));
    },
    set(value2) {
      _value.value = clamp(value2, toValue(min), toValue(max));
    }
  });
}
function useOffsetPagination(options) {
  const {
    total = Number.POSITIVE_INFINITY,
    pageSize = 10,
    page = 1,
    onPageChange = noop,
    onPageSizeChange = noop,
    onPageCountChange = noop
  } = options;
  const currentPageSize = useClamp(pageSize, 1, Number.POSITIVE_INFINITY);
  const pageCount = computed2(() => Math.max(1, Math.ceil(toValue(total) / toValue(currentPageSize))));
  const currentPage = useClamp(page, 1, pageCount);
  const isFirstPage = computed2(() => currentPage.value === 1);
  const isLastPage = computed2(() => currentPage.value === pageCount.value);
  if (isRef(page)) {
    syncRef(page, currentPage, {
      direction: isReadonly(page) ? "ltr" : "both"
    });
  }
  if (isRef(pageSize)) {
    syncRef(pageSize, currentPageSize, {
      direction: isReadonly(pageSize) ? "ltr" : "both"
    });
  }
  function prev() {
    currentPage.value--;
  }
  function next() {
    currentPage.value++;
  }
  const returnValue = {
    currentPage,
    currentPageSize,
    pageCount,
    isFirstPage,
    isLastPage,
    prev,
    next
  };
  watch2(currentPage, () => {
    onPageChange(reactive(returnValue));
  });
  watch2(currentPageSize, () => {
    onPageSizeChange(reactive(returnValue));
  });
  watch2(pageCount, () => {
    onPageCountChange(reactive(returnValue));
  });
  return returnValue;
}
function useOnline(options = {}) {
  const { isOnline } = useNetwork(options);
  return isOnline;
}
function usePageLeave(options = {}) {
  const { window: window2 = defaultWindow } = options;
  const isLeft = shallowRef(false);
  const handler = (event) => {
    if (!window2)
      return;
    event = event || window2.event;
    const from = event.relatedTarget || event.toElement;
    isLeft.value = !from;
  };
  if (window2) {
    const listenerOptions = { passive: true };
    useEventListener(window2, "mouseout", handler, listenerOptions);
    useEventListener(window2.document, "mouseleave", handler, listenerOptions);
    useEventListener(window2.document, "mouseenter", handler, listenerOptions);
  }
  return isLeft;
}
function useScreenOrientation(options = {}) {
  const {
    window: window2 = defaultWindow
  } = options;
  const isSupported = useSupported(() => window2 && ("screen" in window2) && ("orientation" in window2.screen));
  const screenOrientation = isSupported.value ? window2.screen.orientation : {};
  const orientation = ref(screenOrientation.type);
  const angle = shallowRef(screenOrientation.angle || 0);
  if (isSupported.value) {
    useEventListener(window2, "orientationchange", () => {
      orientation.value = screenOrientation.type;
      angle.value = screenOrientation.angle;
    }, { passive: true });
  }
  const lockOrientation = (type) => {
    if (isSupported.value && typeof screenOrientation.lock === "function")
      return screenOrientation.lock(type);
    return Promise.reject(new Error("Not supported"));
  };
  const unlockOrientation = () => {
    if (isSupported.value && typeof screenOrientation.unlock === "function")
      screenOrientation.unlock();
  };
  return {
    isSupported,
    orientation,
    angle,
    lockOrientation,
    unlockOrientation
  };
}
function useParallax(target, options = {}) {
  const {
    deviceOrientationTiltAdjust = (i) => i,
    deviceOrientationRollAdjust = (i) => i,
    mouseTiltAdjust = (i) => i,
    mouseRollAdjust = (i) => i,
    window: window2 = defaultWindow
  } = options;
  const orientation = reactive(useDeviceOrientation({ window: window2 }));
  const screenOrientation = reactive(useScreenOrientation({ window: window2 }));
  const {
    elementX: x,
    elementY: y,
    elementWidth: width,
    elementHeight: height
  } = useMouseInElement(target, { handleOutside: false, window: window2 });
  const source = computed2(() => {
    if (orientation.isSupported && (orientation.alpha != null && orientation.alpha !== 0 || orientation.gamma != null && orientation.gamma !== 0)) {
      return "deviceOrientation";
    }
    return "mouse";
  });
  const roll = computed2(() => {
    if (source.value === "deviceOrientation") {
      let value;
      switch (screenOrientation.orientation) {
        case "landscape-primary":
          value = orientation.gamma / 90;
          break;
        case "landscape-secondary":
          value = -orientation.gamma / 90;
          break;
        case "portrait-primary":
          value = -orientation.beta / 90;
          break;
        case "portrait-secondary":
          value = orientation.beta / 90;
          break;
        default:
          value = -orientation.beta / 90;
      }
      return deviceOrientationRollAdjust(value);
    } else {
      const value = -(y.value - height.value / 2) / height.value;
      return mouseRollAdjust(value);
    }
  });
  const tilt = computed2(() => {
    if (source.value === "deviceOrientation") {
      let value;
      switch (screenOrientation.orientation) {
        case "landscape-primary":
          value = orientation.beta / 90;
          break;
        case "landscape-secondary":
          value = -orientation.beta / 90;
          break;
        case "portrait-primary":
          value = orientation.gamma / 90;
          break;
        case "portrait-secondary":
          value = -orientation.gamma / 90;
          break;
        default:
          value = orientation.gamma / 90;
      }
      return deviceOrientationTiltAdjust(value);
    } else {
      const value = (x.value - width.value / 2) / width.value;
      return mouseTiltAdjust(value);
    }
  });
  return { roll, tilt, source };
}
function useParentElement(element = useCurrentElement()) {
  const parentElement = shallowRef();
  const update = () => {
    const el = unrefElement(element);
    if (el)
      parentElement.value = el.parentElement;
  };
  tryOnMounted(update);
  watch2(() => toValue(element), update);
  return parentElement;
}
function usePerformanceObserver(options, callback) {
  const {
    window: window2 = defaultWindow,
    immediate = true,
    ...performanceOptions
  } = options;
  const isSupported = useSupported(() => window2 && ("PerformanceObserver" in window2));
  let observer;
  const stop2 = () => {
    observer == null || observer.disconnect();
  };
  const start = () => {
    if (isSupported.value) {
      stop2();
      observer = new PerformanceObserver(callback);
      observer.observe(performanceOptions);
    }
  };
  tryOnScopeDispose(stop2);
  if (immediate)
    start();
  return {
    isSupported,
    start,
    stop: stop2
  };
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = /* @__PURE__ */ Object.keys(defaultState);
function usePointer(options = {}) {
  const {
    target = defaultWindow
  } = options;
  const isInside = shallowRef(false);
  const state = ref(options.initialValue || {});
  Object.assign(state.value, defaultState, state.value);
  const handler = (event) => {
    isInside.value = true;
    if (options.pointerTypes && !options.pointerTypes.includes(event.pointerType))
      return;
    state.value = objectPick(event, keys, false);
  };
  if (target) {
    const listenerOptions = { passive: true };
    useEventListener(target, ["pointerdown", "pointermove", "pointerup"], handler, listenerOptions);
    useEventListener(target, "pointerleave", () => isInside.value = false, listenerOptions);
  }
  return {
    ...toRefs2(state),
    isInside
  };
}
function usePointerLock(target, options = {}) {
  const { document: document2 = defaultDocument } = options;
  const isSupported = useSupported(() => document2 && ("pointerLockElement" in document2));
  const element = shallowRef();
  const triggerElement = shallowRef();
  let targetElement;
  if (isSupported.value) {
    const listenerOptions = { passive: true };
    useEventListener(document2, "pointerlockchange", () => {
      var _a;
      const currentElement = (_a = document2.pointerLockElement) != null ? _a : element.value;
      if (targetElement && currentElement === targetElement) {
        element.value = document2.pointerLockElement;
        if (!element.value)
          targetElement = triggerElement.value = null;
      }
    }, listenerOptions);
    useEventListener(document2, "pointerlockerror", () => {
      var _a;
      const currentElement = (_a = document2.pointerLockElement) != null ? _a : element.value;
      if (targetElement && currentElement === targetElement) {
        const action = document2.pointerLockElement ? "release" : "acquire";
        throw new Error(`Failed to ${action} pointer lock.`);
      }
    }, listenerOptions);
  }
  async function lock(e) {
    var _a;
    if (!isSupported.value)
      throw new Error("Pointer Lock API is not supported by your browser.");
    triggerElement.value = e instanceof Event ? e.currentTarget : null;
    targetElement = e instanceof Event ? (_a = unrefElement(target)) != null ? _a : triggerElement.value : unrefElement(e);
    if (!targetElement)
      throw new Error("Target element undefined.");
    targetElement.requestPointerLock();
    return await until(element).toBe(targetElement);
  }
  async function unlock() {
    if (!element.value)
      return false;
    document2.exitPointerLock();
    await until(element).toBeNull();
    return true;
  }
  return {
    isSupported,
    element,
    triggerElement,
    lock,
    unlock
  };
}
function usePointerSwipe(target, options = {}) {
  const targetRef = toRef2(target);
  const {
    threshold = 50,
    onSwipe,
    onSwipeEnd,
    onSwipeStart,
    disableTextSelect = false
  } = options;
  const posStart = reactive({ x: 0, y: 0 });
  const updatePosStart = (x, y) => {
    posStart.x = x;
    posStart.y = y;
  };
  const posEnd = reactive({ x: 0, y: 0 });
  const updatePosEnd = (x, y) => {
    posEnd.x = x;
    posEnd.y = y;
  };
  const distanceX = computed2(() => posStart.x - posEnd.x);
  const distanceY = computed2(() => posStart.y - posEnd.y);
  const { max, abs } = Math;
  const isThresholdExceeded = computed2(() => max(abs(distanceX.value), abs(distanceY.value)) >= threshold);
  const isSwiping = shallowRef(false);
  const isPointerDown = shallowRef(false);
  const direction = computed2(() => {
    if (!isThresholdExceeded.value)
      return "none";
    if (abs(distanceX.value) > abs(distanceY.value)) {
      return distanceX.value > 0 ? "left" : "right";
    } else {
      return distanceY.value > 0 ? "up" : "down";
    }
  });
  const eventIsAllowed = (e) => {
    var _a, _b, _c;
    const isReleasingButton = e.buttons === 0;
    const isPrimaryButton = e.buttons === 1;
    return (_c = (_b = (_a = options.pointerTypes) == null ? undefined : _a.includes(e.pointerType)) != null ? _b : isReleasingButton || isPrimaryButton) != null ? _c : true;
  };
  const listenerOptions = { passive: true };
  const stops = [
    useEventListener(target, "pointerdown", (e) => {
      if (!eventIsAllowed(e))
        return;
      isPointerDown.value = true;
      const eventTarget = e.target;
      eventTarget == null || eventTarget.setPointerCapture(e.pointerId);
      const { clientX: x, clientY: y } = e;
      updatePosStart(x, y);
      updatePosEnd(x, y);
      onSwipeStart == null || onSwipeStart(e);
    }, listenerOptions),
    useEventListener(target, "pointermove", (e) => {
      if (!eventIsAllowed(e))
        return;
      if (!isPointerDown.value)
        return;
      const { clientX: x, clientY: y } = e;
      updatePosEnd(x, y);
      if (!isSwiping.value && isThresholdExceeded.value)
        isSwiping.value = true;
      if (isSwiping.value)
        onSwipe == null || onSwipe(e);
    }, listenerOptions),
    useEventListener(target, "pointerup", (e) => {
      if (!eventIsAllowed(e))
        return;
      if (isSwiping.value)
        onSwipeEnd == null || onSwipeEnd(e, direction.value);
      isPointerDown.value = false;
      isSwiping.value = false;
    }, listenerOptions)
  ];
  tryOnMounted(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    (_b = (_a = targetRef.value) == null ? undefined : _a.style) == null || _b.setProperty("touch-action", "pan-y");
    if (disableTextSelect) {
      (_d = (_c = targetRef.value) == null ? undefined : _c.style) == null || _d.setProperty("-webkit-user-select", "none");
      (_f = (_e = targetRef.value) == null ? undefined : _e.style) == null || _f.setProperty("-ms-user-select", "none");
      (_h = (_g = targetRef.value) == null ? undefined : _g.style) == null || _h.setProperty("user-select", "none");
    }
  });
  const stop2 = () => stops.forEach((s) => s());
  return {
    isSwiping: readonly(isSwiping),
    direction: readonly(direction),
    posStart: readonly(posStart),
    posEnd: readonly(posEnd),
    distanceX,
    distanceY,
    stop: stop2
  };
}
function usePreferredColorScheme(options) {
  const isLight = useMediaQuery("(prefers-color-scheme: light)", options);
  const isDark = useMediaQuery("(prefers-color-scheme: dark)", options);
  return computed2(() => {
    if (isDark.value)
      return "dark";
    if (isLight.value)
      return "light";
    return "no-preference";
  });
}
function usePreferredContrast(options) {
  const isMore = useMediaQuery("(prefers-contrast: more)", options);
  const isLess = useMediaQuery("(prefers-contrast: less)", options);
  const isCustom = useMediaQuery("(prefers-contrast: custom)", options);
  return computed2(() => {
    if (isMore.value)
      return "more";
    if (isLess.value)
      return "less";
    if (isCustom.value)
      return "custom";
    return "no-preference";
  });
}
function usePreferredLanguages(options = {}) {
  const { window: window2 = defaultWindow } = options;
  if (!window2)
    return ref(["en"]);
  const navigator2 = window2.navigator;
  const value = ref(navigator2.languages);
  useEventListener(window2, "languagechange", () => {
    value.value = navigator2.languages;
  }, { passive: true });
  return value;
}
function usePreferredReducedMotion(options) {
  const isReduced = useMediaQuery("(prefers-reduced-motion: reduce)", options);
  return computed2(() => {
    if (isReduced.value)
      return "reduce";
    return "no-preference";
  });
}
function usePrevious(value, initialValue) {
  const previous = shallowRef(initialValue);
  watch2(toRef2(value), (_, oldValue) => {
    previous.value = oldValue;
  }, { flush: "sync" });
  return readonly(previous);
}
var topVarName = "--vueuse-safe-area-top";
var rightVarName = "--vueuse-safe-area-right";
var bottomVarName = "--vueuse-safe-area-bottom";
var leftVarName = "--vueuse-safe-area-left";
function useScreenSafeArea() {
  const top = shallowRef("");
  const right = shallowRef("");
  const bottom = shallowRef("");
  const left = shallowRef("");
  if (isClient) {
    const topCssVar = useCssVar(topVarName);
    const rightCssVar = useCssVar(rightVarName);
    const bottomCssVar = useCssVar(bottomVarName);
    const leftCssVar = useCssVar(leftVarName);
    topCssVar.value = "env(safe-area-inset-top, 0px)";
    rightCssVar.value = "env(safe-area-inset-right, 0px)";
    bottomCssVar.value = "env(safe-area-inset-bottom, 0px)";
    leftCssVar.value = "env(safe-area-inset-left, 0px)";
    tryOnMounted(update);
    useEventListener("resize", useDebounceFn(update), { passive: true });
  }
  function update() {
    top.value = getValue(topVarName);
    right.value = getValue(rightVarName);
    bottom.value = getValue(bottomVarName);
    left.value = getValue(leftVarName);
  }
  return {
    top,
    right,
    bottom,
    left,
    update
  };
}
function getValue(position) {
  return getComputedStyle(document.documentElement).getPropertyValue(position);
}
function useScriptTag(src, onLoaded = noop, options = {}) {
  const {
    immediate = true,
    manual = false,
    type = "text/javascript",
    async = true,
    crossOrigin,
    referrerPolicy,
    noModule,
    defer,
    document: document2 = defaultDocument,
    attrs = {},
    nonce = undefined
  } = options;
  const scriptTag = shallowRef(null);
  let _promise = null;
  const loadScript = (waitForScriptLoad) => new Promise((resolve, reject) => {
    const resolveWithElement = (el2) => {
      scriptTag.value = el2;
      resolve(el2);
      return el2;
    };
    if (!document2) {
      resolve(false);
      return;
    }
    let shouldAppend = false;
    let el = document2.querySelector(`script[src="${toValue(src)}"]`);
    if (!el) {
      el = document2.createElement("script");
      el.type = type;
      el.async = async;
      el.src = toValue(src);
      if (defer)
        el.defer = defer;
      if (crossOrigin)
        el.crossOrigin = crossOrigin;
      if (noModule)
        el.noModule = noModule;
      if (referrerPolicy)
        el.referrerPolicy = referrerPolicy;
      if (nonce) {
        el.nonce = nonce;
      }
      Object.entries(attrs).forEach(([name, value]) => el == null ? undefined : el.setAttribute(name, value));
      shouldAppend = true;
    } else if (el.hasAttribute("data-loaded")) {
      resolveWithElement(el);
    }
    const listenerOptions = {
      passive: true
    };
    useEventListener(el, "error", (event) => reject(event), listenerOptions);
    useEventListener(el, "abort", (event) => reject(event), listenerOptions);
    useEventListener(el, "load", () => {
      el.setAttribute("data-loaded", "true");
      onLoaded(el);
      resolveWithElement(el);
    }, listenerOptions);
    if (shouldAppend)
      el = document2.head.appendChild(el);
    if (!waitForScriptLoad)
      resolveWithElement(el);
  });
  const load = (waitForScriptLoad = true) => {
    if (!_promise)
      _promise = loadScript(waitForScriptLoad);
    return _promise;
  };
  const unload = () => {
    if (!document2)
      return;
    _promise = null;
    if (scriptTag.value)
      scriptTag.value = null;
    const el = document2.querySelector(`script[src="${toValue(src)}"]`);
    if (el)
      document2.head.removeChild(el);
  };
  if (immediate && !manual)
    tryOnMounted(load);
  if (!manual)
    tryOnUnmounted(unload);
  return { scriptTag, load, unload };
}
function checkOverflowScroll(ele) {
  const style = window.getComputedStyle(ele);
  if (style.overflowX === "scroll" || style.overflowY === "scroll" || style.overflowX === "auto" && ele.clientWidth < ele.scrollWidth || style.overflowY === "auto" && ele.clientHeight < ele.scrollHeight) {
    return true;
  } else {
    const parent = ele.parentNode;
    if (!parent || parent.tagName === "BODY")
      return false;
    return checkOverflowScroll(parent);
  }
}
function preventDefault(rawEvent) {
  const e = rawEvent || window.event;
  const _target = e.target;
  if (checkOverflowScroll(_target))
    return false;
  if (e.touches.length > 1)
    return true;
  if (e.preventDefault)
    e.preventDefault();
  return false;
}
var elInitialOverflow = /* @__PURE__ */ new WeakMap;
function useScrollLock(element, initialState = false) {
  const isLocked = shallowRef(initialState);
  let stopTouchMoveListener = null;
  let initialOverflow = "";
  watch2(toRef2(element), (el) => {
    const target = resolveElement(toValue(el));
    if (target) {
      const ele = target;
      if (!elInitialOverflow.get(ele))
        elInitialOverflow.set(ele, ele.style.overflow);
      if (ele.style.overflow !== "hidden")
        initialOverflow = ele.style.overflow;
      if (ele.style.overflow === "hidden")
        return isLocked.value = true;
      if (isLocked.value)
        return ele.style.overflow = "hidden";
    }
  }, {
    immediate: true
  });
  const lock = () => {
    const el = resolveElement(toValue(element));
    if (!el || isLocked.value)
      return;
    if (isIOS) {
      stopTouchMoveListener = useEventListener(el, "touchmove", (e) => {
        preventDefault(e);
      }, { passive: false });
    }
    el.style.overflow = "hidden";
    isLocked.value = true;
  };
  const unlock = () => {
    const el = resolveElement(toValue(element));
    if (!el || !isLocked.value)
      return;
    if (isIOS)
      stopTouchMoveListener == null || stopTouchMoveListener();
    el.style.overflow = initialOverflow;
    elInitialOverflow.delete(el);
    isLocked.value = false;
  };
  tryOnScopeDispose(unlock);
  return computed2({
    get() {
      return isLocked.value;
    },
    set(v) {
      if (v)
        lock();
      else
        unlock();
    }
  });
}
function useSessionStorage(key, initialValue, options = {}) {
  const { window: window2 = defaultWindow } = options;
  return useStorage(key, initialValue, window2 == null ? undefined : window2.sessionStorage, options);
}
function useShare(shareOptions = {}, options = {}) {
  const { navigator: navigator2 = defaultNavigator } = options;
  const _navigator = navigator2;
  const isSupported = useSupported(() => _navigator && ("canShare" in _navigator));
  const share = async (overrideOptions = {}) => {
    if (isSupported.value) {
      const data = {
        ...toValue(shareOptions),
        ...toValue(overrideOptions)
      };
      let granted = true;
      if (data.files && _navigator.canShare)
        granted = _navigator.canShare({ files: data.files });
      if (granted)
        return _navigator.share(data);
    }
  };
  return {
    isSupported,
    share
  };
}
var defaultSortFn = (source, compareFn) => source.sort(compareFn);
var defaultCompare = (a, b) => a - b;
function useSorted(...args) {
  var _a, _b, _c, _d;
  const [source] = args;
  let compareFn = defaultCompare;
  let options = {};
  if (args.length === 2) {
    if (typeof args[1] === "object") {
      options = args[1];
      compareFn = (_a = options.compareFn) != null ? _a : defaultCompare;
    } else {
      compareFn = (_b = args[1]) != null ? _b : defaultCompare;
    }
  } else if (args.length > 2) {
    compareFn = (_c = args[1]) != null ? _c : defaultCompare;
    options = (_d = args[2]) != null ? _d : {};
  }
  const {
    dirty = false,
    sortFn = defaultSortFn
  } = options;
  if (!dirty)
    return computed2(() => sortFn([...toValue(source)], compareFn));
  watchEffect(() => {
    const result = sortFn(toValue(source), compareFn);
    if (isRef(source))
      source.value = result;
    else
      source.splice(0, source.length, ...result);
  });
  return source;
}
function useSpeechRecognition(options = {}) {
  const {
    interimResults = true,
    continuous = true,
    maxAlternatives = 1,
    window: window2 = defaultWindow
  } = options;
  const lang = toRef2(options.lang || "en-US");
  const isListening = shallowRef(false);
  const isFinal = shallowRef(false);
  const result = shallowRef("");
  const error = shallowRef(undefined);
  let recognition;
  const start = () => {
    isListening.value = true;
  };
  const stop2 = () => {
    isListening.value = false;
  };
  const toggle = (value = !isListening.value) => {
    if (value) {
      start();
    } else {
      stop2();
    }
  };
  const SpeechRecognition = window2 && (window2.SpeechRecognition || window2.webkitSpeechRecognition);
  const isSupported = useSupported(() => SpeechRecognition);
  if (isSupported.value) {
    recognition = new SpeechRecognition;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = toValue(lang);
    recognition.maxAlternatives = maxAlternatives;
    recognition.onstart = () => {
      isListening.value = true;
      isFinal.value = false;
    };
    watch2(lang, (lang2) => {
      if (recognition && !isListening.value)
        recognition.lang = lang2;
    });
    recognition.onresult = (event) => {
      const currentResult = event.results[event.resultIndex];
      const { transcript } = currentResult[0];
      isFinal.value = currentResult.isFinal;
      result.value = transcript;
      error.value = undefined;
    };
    recognition.onerror = (event) => {
      error.value = event;
    };
    recognition.onend = () => {
      isListening.value = false;
      recognition.lang = toValue(lang);
    };
    watch2(isListening, (newValue, oldValue) => {
      if (newValue === oldValue)
        return;
      if (newValue)
        recognition.start();
      else
        recognition.stop();
    });
  }
  tryOnScopeDispose(() => {
    stop2();
  });
  return {
    isSupported,
    isListening,
    isFinal,
    recognition,
    result,
    error,
    toggle,
    start,
    stop: stop2
  };
}
function useSpeechSynthesis(text, options = {}) {
  const {
    pitch = 1,
    rate = 1,
    volume = 1,
    window: window2 = defaultWindow
  } = options;
  const synth = window2 && window2.speechSynthesis;
  const isSupported = useSupported(() => synth);
  const isPlaying = shallowRef(false);
  const status = shallowRef("init");
  const spokenText = toRef2(text || "");
  const lang = toRef2(options.lang || "en-US");
  const error = shallowRef(undefined);
  const toggle = (value = !isPlaying.value) => {
    isPlaying.value = value;
  };
  const bindEventsForUtterance = (utterance2) => {
    utterance2.lang = toValue(lang);
    utterance2.voice = toValue(options.voice) || null;
    utterance2.pitch = toValue(pitch);
    utterance2.rate = toValue(rate);
    utterance2.volume = toValue(volume);
    utterance2.onstart = () => {
      isPlaying.value = true;
      status.value = "play";
    };
    utterance2.onpause = () => {
      isPlaying.value = false;
      status.value = "pause";
    };
    utterance2.onresume = () => {
      isPlaying.value = true;
      status.value = "play";
    };
    utterance2.onend = () => {
      isPlaying.value = false;
      status.value = "end";
    };
    utterance2.onerror = (event) => {
      error.value = event;
    };
  };
  const utterance = computed2(() => {
    isPlaying.value = false;
    status.value = "init";
    const newUtterance = new SpeechSynthesisUtterance(spokenText.value);
    bindEventsForUtterance(newUtterance);
    return newUtterance;
  });
  const speak = () => {
    synth.cancel();
    if (utterance)
      synth.speak(utterance.value);
  };
  const stop2 = () => {
    synth.cancel();
    isPlaying.value = false;
  };
  if (isSupported.value) {
    bindEventsForUtterance(utterance.value);
    watch2(lang, (lang2) => {
      if (utterance.value && !isPlaying.value)
        utterance.value.lang = lang2;
    });
    if (options.voice) {
      watch2(options.voice, () => {
        synth.cancel();
      });
    }
    watch2(isPlaying, () => {
      if (isPlaying.value)
        synth.resume();
      else
        synth.pause();
    });
  }
  tryOnScopeDispose(() => {
    isPlaying.value = false;
  });
  return {
    isSupported,
    isPlaying,
    status,
    utterance,
    error,
    stop: stop2,
    toggle,
    speak
  };
}
function useStepper(steps, initialStep) {
  const stepsRef = ref(steps);
  const stepNames = computed2(() => Array.isArray(stepsRef.value) ? stepsRef.value : Object.keys(stepsRef.value));
  const index = ref(stepNames.value.indexOf(initialStep != null ? initialStep : stepNames.value[0]));
  const current = computed2(() => at(index.value));
  const isFirst = computed2(() => index.value === 0);
  const isLast = computed2(() => index.value === stepNames.value.length - 1);
  const next = computed2(() => stepNames.value[index.value + 1]);
  const previous = computed2(() => stepNames.value[index.value - 1]);
  function at(index2) {
    if (Array.isArray(stepsRef.value))
      return stepsRef.value[index2];
    return stepsRef.value[stepNames.value[index2]];
  }
  function get(step) {
    if (!stepNames.value.includes(step))
      return;
    return at(stepNames.value.indexOf(step));
  }
  function goTo(step) {
    if (stepNames.value.includes(step))
      index.value = stepNames.value.indexOf(step);
  }
  function goToNext() {
    if (isLast.value)
      return;
    index.value++;
  }
  function goToPrevious() {
    if (isFirst.value)
      return;
    index.value--;
  }
  function goBackTo(step) {
    if (isAfter(step))
      goTo(step);
  }
  function isNext(step) {
    return stepNames.value.indexOf(step) === index.value + 1;
  }
  function isPrevious(step) {
    return stepNames.value.indexOf(step) === index.value - 1;
  }
  function isCurrent(step) {
    return stepNames.value.indexOf(step) === index.value;
  }
  function isBefore(step) {
    return index.value < stepNames.value.indexOf(step);
  }
  function isAfter(step) {
    return index.value > stepNames.value.indexOf(step);
  }
  return {
    steps: stepsRef,
    stepNames,
    index,
    current,
    next,
    previous,
    isFirst,
    isLast,
    at,
    get,
    goTo,
    goToNext,
    goToPrevious,
    goBackTo,
    isNext,
    isPrevious,
    isCurrent,
    isBefore,
    isAfter
  };
}
function useStorageAsync(key, initialValue, storage, options = {}) {
  var _a;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const rawInit = toValue(initialValue);
  const type = guessSerializerType(rawInit);
  const data = (shallow ? shallowRef : ref)(toValue(initialValue));
  const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorageAsync", () => {
        var _a2;
        return (_a2 = defaultWindow) == null ? undefined : _a2.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  async function read(event) {
    if (!storage || event && event.key !== key)
      return;
    try {
      const rawValue = event ? event.newValue : await storage.getItem(key);
      if (rawValue == null) {
        data.value = rawInit;
        if (writeDefaults && rawInit !== null)
          await storage.setItem(key, await serializer.write(rawInit));
      } else if (mergeDefaults) {
        const value = await serializer.read(rawValue);
        if (typeof mergeDefaults === "function")
          data.value = mergeDefaults(value, rawInit);
        else if (type === "object" && !Array.isArray(value))
          data.value = { ...rawInit, ...value };
        else
          data.value = value;
      } else {
        data.value = await serializer.read(rawValue);
      }
    } catch (e) {
      onError(e);
    }
  }
  read();
  if (window2 && listenToStorageChanges)
    useEventListener(window2, "storage", (e) => Promise.resolve().then(() => read(e)), { passive: true });
  if (storage) {
    watchWithFilter(data, async () => {
      try {
        if (data.value == null)
          await storage.removeItem(key);
        else
          await storage.setItem(key, await serializer.write(data.value));
      } catch (e) {
        onError(e);
      }
    }, {
      flush,
      deep,
      eventFilter
    });
  }
  return data;
}
var _id = 0;
function useStyleTag(css, options = {}) {
  const isLoaded = shallowRef(false);
  const {
    document: document2 = defaultDocument,
    immediate = true,
    manual = false,
    id = `vueuse_styletag_${++_id}`
  } = options;
  const cssRef = shallowRef(css);
  let stop2 = () => {};
  const load = () => {
    if (!document2)
      return;
    const el = document2.getElementById(id) || document2.createElement("style");
    if (!el.isConnected) {
      el.id = id;
      if (options.nonce)
        el.nonce = options.nonce;
      if (options.media)
        el.media = options.media;
      document2.head.appendChild(el);
    }
    if (isLoaded.value)
      return;
    stop2 = watch2(cssRef, (value) => {
      el.textContent = value;
    }, { immediate: true });
    isLoaded.value = true;
  };
  const unload = () => {
    if (!document2 || !isLoaded.value)
      return;
    stop2();
    document2.head.removeChild(document2.getElementById(id));
    isLoaded.value = false;
  };
  if (immediate && !manual)
    tryOnMounted(load);
  if (!manual)
    tryOnScopeDispose(unload);
  return {
    id,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
function useSwipe(target, options = {}) {
  const {
    threshold = 50,
    onSwipe,
    onSwipeEnd,
    onSwipeStart,
    passive = true
  } = options;
  const coordsStart = reactive({ x: 0, y: 0 });
  const coordsEnd = reactive({ x: 0, y: 0 });
  const diffX = computed2(() => coordsStart.x - coordsEnd.x);
  const diffY = computed2(() => coordsStart.y - coordsEnd.y);
  const { max, abs } = Math;
  const isThresholdExceeded = computed2(() => max(abs(diffX.value), abs(diffY.value)) >= threshold);
  const isSwiping = shallowRef(false);
  const direction = computed2(() => {
    if (!isThresholdExceeded.value)
      return "none";
    if (abs(diffX.value) > abs(diffY.value)) {
      return diffX.value > 0 ? "left" : "right";
    } else {
      return diffY.value > 0 ? "up" : "down";
    }
  });
  const getTouchEventCoords = (e) => [e.touches[0].clientX, e.touches[0].clientY];
  const updateCoordsStart = (x, y) => {
    coordsStart.x = x;
    coordsStart.y = y;
  };
  const updateCoordsEnd = (x, y) => {
    coordsEnd.x = x;
    coordsEnd.y = y;
  };
  const listenerOptions = { passive, capture: !passive };
  const onTouchEnd = (e) => {
    if (isSwiping.value)
      onSwipeEnd == null || onSwipeEnd(e, direction.value);
    isSwiping.value = false;
  };
  const stops = [
    useEventListener(target, "touchstart", (e) => {
      if (e.touches.length !== 1)
        return;
      const [x, y] = getTouchEventCoords(e);
      updateCoordsStart(x, y);
      updateCoordsEnd(x, y);
      onSwipeStart == null || onSwipeStart(e);
    }, listenerOptions),
    useEventListener(target, "touchmove", (e) => {
      if (e.touches.length !== 1)
        return;
      const [x, y] = getTouchEventCoords(e);
      updateCoordsEnd(x, y);
      if (listenerOptions.capture && !listenerOptions.passive && Math.abs(diffX.value) > Math.abs(diffY.value))
        e.preventDefault();
      if (!isSwiping.value && isThresholdExceeded.value)
        isSwiping.value = true;
      if (isSwiping.value)
        onSwipe == null || onSwipe(e);
    }, listenerOptions),
    useEventListener(target, ["touchend", "touchcancel"], onTouchEnd, listenerOptions)
  ];
  const stop2 = () => stops.forEach((s) => s());
  return {
    isSwiping,
    direction,
    coordsStart,
    coordsEnd,
    lengthX: diffX,
    lengthY: diffY,
    stop: stop2,
    isPassiveEventSupported: true
  };
}
function useTemplateRefsList() {
  const refs = ref([]);
  refs.value.set = (el) => {
    if (el)
      refs.value.push(el);
  };
  onBeforeUpdate(() => {
    refs.value.length = 0;
  });
  return refs;
}
function useTextDirection(options = {}) {
  const {
    document: document2 = defaultDocument,
    selector = "html",
    observe = false,
    initialValue = "ltr"
  } = options;
  function getValue2() {
    var _a, _b;
    return (_b = (_a = document2 == null ? undefined : document2.querySelector(selector)) == null ? undefined : _a.getAttribute("dir")) != null ? _b : initialValue;
  }
  const dir = ref(getValue2());
  tryOnMounted(() => dir.value = getValue2());
  if (observe && document2) {
    useMutationObserver(document2.querySelector(selector), () => dir.value = getValue2(), { attributes: true });
  }
  return computed2({
    get() {
      return dir.value;
    },
    set(v) {
      var _a, _b;
      dir.value = v;
      if (!document2)
        return;
      if (dir.value)
        (_a = document2.querySelector(selector)) == null || _a.setAttribute("dir", dir.value);
      else
        (_b = document2.querySelector(selector)) == null || _b.removeAttribute("dir");
    }
  });
}
function getRangesFromSelection(selection) {
  var _a;
  const rangeCount = (_a = selection.rangeCount) != null ? _a : 0;
  return Array.from({ length: rangeCount }, (_, i) => selection.getRangeAt(i));
}
function useTextSelection(options = {}) {
  const {
    window: window2 = defaultWindow
  } = options;
  const selection = ref(null);
  const text = computed2(() => {
    var _a, _b;
    return (_b = (_a = selection.value) == null ? undefined : _a.toString()) != null ? _b : "";
  });
  const ranges = computed2(() => selection.value ? getRangesFromSelection(selection.value) : []);
  const rects = computed2(() => ranges.value.map((range) => range.getBoundingClientRect()));
  function onSelectionChange() {
    selection.value = null;
    if (window2)
      selection.value = window2.getSelection();
  }
  if (window2)
    useEventListener(window2.document, "selectionchange", onSelectionChange, { passive: true });
  return {
    text,
    rects,
    ranges,
    selection
  };
}
function tryRequestAnimationFrame(window2 = defaultWindow, fn) {
  if (window2 && typeof window2.requestAnimationFrame === "function") {
    window2.requestAnimationFrame(fn);
  } else {
    fn();
  }
}
function useTextareaAutosize(options = {}) {
  var _a, _b;
  const { window: window2 = defaultWindow } = options;
  const textarea = toRef2(options == null ? undefined : options.element);
  const input = toRef2((_a = options == null ? undefined : options.input) != null ? _a : "");
  const styleProp = (_b = options == null ? undefined : options.styleProp) != null ? _b : "height";
  const textareaScrollHeight = shallowRef(1);
  const textareaOldWidth = shallowRef(0);
  function triggerResize() {
    var _a2;
    if (!textarea.value)
      return;
    let height = "";
    textarea.value.style[styleProp] = "1px";
    textareaScrollHeight.value = (_a2 = textarea.value) == null ? undefined : _a2.scrollHeight;
    const _styleTarget = toValue(options == null ? undefined : options.styleTarget);
    if (_styleTarget)
      _styleTarget.style[styleProp] = `${textareaScrollHeight.value}px`;
    else
      height = `${textareaScrollHeight.value}px`;
    textarea.value.style[styleProp] = height;
  }
  watch2([input, textarea], () => nextTick(triggerResize), { immediate: true });
  watch2(textareaScrollHeight, () => {
    var _a2;
    return (_a2 = options == null ? undefined : options.onResize) == null ? undefined : _a2.call(options);
  });
  useResizeObserver(textarea, ([{ contentRect }]) => {
    if (textareaOldWidth.value === contentRect.width)
      return;
    tryRequestAnimationFrame(window2, () => {
      textareaOldWidth.value = contentRect.width;
      triggerResize();
    });
  });
  if (options == null ? undefined : options.watch)
    watch2(options.watch, triggerResize, { immediate: true, deep: true });
  return {
    textarea,
    input,
    triggerResize
  };
}
function useThrottledRefHistory(source, options = {}) {
  const { throttle = 200, trailing = true } = options;
  const filter = throttleFilter(throttle, trailing);
  const history = useRefHistory(source, { ...options, eventFilter: filter });
  return {
    ...history
  };
}
var DEFAULT_UNITS = [
  { max: 60000, value: 1000, name: "second" },
  { max: 2760000, value: 60000, name: "minute" },
  { max: 72000000, value: 3600000, name: "hour" },
  { max: 518400000, value: 86400000, name: "day" },
  { max: 2419200000, value: 604800000, name: "week" },
  { max: 28512000000, value: 2592000000, name: "month" },
  { max: Number.POSITIVE_INFINITY, value: 31536000000, name: "year" }
];
var DEFAULT_MESSAGES = {
  justNow: "just now",
  past: (n) => n.match(/\d/) ? `${n} ago` : n,
  future: (n) => n.match(/\d/) ? `in ${n}` : n,
  month: (n, past) => n === 1 ? past ? "last month" : "next month" : `${n} month${n > 1 ? "s" : ""}`,
  year: (n, past) => n === 1 ? past ? "last year" : "next year" : `${n} year${n > 1 ? "s" : ""}`,
  day: (n, past) => n === 1 ? past ? "yesterday" : "tomorrow" : `${n} day${n > 1 ? "s" : ""}`,
  week: (n, past) => n === 1 ? past ? "last week" : "next week" : `${n} week${n > 1 ? "s" : ""}`,
  hour: (n) => `${n} hour${n > 1 ? "s" : ""}`,
  minute: (n) => `${n} minute${n > 1 ? "s" : ""}`,
  second: (n) => `${n} second${n > 1 ? "s" : ""}`,
  invalid: ""
};
function DEFAULT_FORMATTER(date) {
  return date.toISOString().slice(0, 10);
}
function useTimeAgo(time, options = {}) {
  const {
    controls: exposeControls = false,
    updateInterval = 30000
  } = options;
  const { now, ...controls } = useNow({ interval: updateInterval, controls: true });
  const timeAgo = computed2(() => formatTimeAgo(new Date(toValue(time)), options, toValue(now)));
  if (exposeControls) {
    return {
      timeAgo,
      ...controls
    };
  } else {
    return timeAgo;
  }
}
function formatTimeAgo(from, options = {}, now = Date.now()) {
  var _a;
  const {
    max,
    messages = DEFAULT_MESSAGES,
    fullDateFormatter = DEFAULT_FORMATTER,
    units = DEFAULT_UNITS,
    showSecond = false,
    rounding = "round"
  } = options;
  const roundFn = typeof rounding === "number" ? (n) => +n.toFixed(rounding) : Math[rounding];
  const diff = +now - +from;
  const absDiff = Math.abs(diff);
  function getValue2(diff2, unit) {
    return roundFn(Math.abs(diff2) / unit.value);
  }
  function format(diff2, unit) {
    const val = getValue2(diff2, unit);
    const past = diff2 > 0;
    const str = applyFormat(unit.name, val, past);
    return applyFormat(past ? "past" : "future", str, past);
  }
  function applyFormat(name, val, isPast) {
    const formatter = messages[name];
    if (typeof formatter === "function")
      return formatter(val, isPast);
    return formatter.replace("{0}", val.toString());
  }
  if (absDiff < 60000 && !showSecond)
    return messages.justNow;
  if (typeof max === "number" && absDiff > max)
    return fullDateFormatter(new Date(from));
  if (typeof max === "string") {
    const unitMax = (_a = units.find((i) => i.name === max)) == null ? undefined : _a.max;
    if (unitMax && absDiff > unitMax)
      return fullDateFormatter(new Date(from));
  }
  for (const [idx, unit] of units.entries()) {
    const val = getValue2(diff, unit);
    if (val <= 0 && units[idx - 1])
      return format(diff, units[idx - 1]);
    if (absDiff < unit.max)
      return format(diff, unit);
  }
  return messages.invalid;
}
function useTimeoutPoll(fn, interval, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  const { start } = useTimeoutFn(loop, interval, { immediate });
  const isActive = shallowRef(false);
  async function loop() {
    if (!isActive.value)
      return;
    await fn();
    start();
  }
  function resume() {
    if (!isActive.value) {
      isActive.value = true;
      if (immediateCallback)
        fn();
      start();
    }
  }
  function pause() {
    isActive.value = false;
  }
  if (immediate && isClient)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}
function useTimestamp(options = {}) {
  const {
    controls: exposeControls = false,
    offset = 0,
    immediate = true,
    interval = "requestAnimationFrame",
    callback
  } = options;
  const ts = shallowRef(timestamp() + offset);
  const update = () => ts.value = timestamp() + offset;
  const cb = callback ? () => {
    update();
    callback(ts.value);
  } : update;
  const controls = interval === "requestAnimationFrame" ? useRafFn(cb, { immediate }) : useIntervalFn(cb, interval, { immediate });
  if (exposeControls) {
    return {
      timestamp: ts,
      ...controls
    };
  } else {
    return ts;
  }
}
function useTitle(newTitle = null, options = {}) {
  var _a, _b, _c;
  const {
    document: document2 = defaultDocument,
    restoreOnUnmount = (t) => t
  } = options;
  const originalTitle = (_a = document2 == null ? undefined : document2.title) != null ? _a : "";
  const title = toRef2((_b = newTitle != null ? newTitle : document2 == null ? undefined : document2.title) != null ? _b : null);
  const isReadonly2 = !!(newTitle && typeof newTitle === "function");
  function format(t) {
    if (!("titleTemplate" in options))
      return t;
    const template = options.titleTemplate || "%s";
    return typeof template === "function" ? template(t) : toValue(template).replace(/%s/g, t);
  }
  watch2(title, (newValue, oldValue) => {
    if (newValue !== oldValue && document2)
      document2.title = format(newValue != null ? newValue : "");
  }, { immediate: true });
  if (options.observe && !options.titleTemplate && document2 && !isReadonly2) {
    useMutationObserver((_c = document2.head) == null ? undefined : _c.querySelector("title"), () => {
      if (document2 && document2.title !== title.value)
        title.value = format(document2.title);
    }, { childList: true });
  }
  tryOnScopeDispose(() => {
    if (restoreOnUnmount) {
      const restoredTitle = restoreOnUnmount(originalTitle, title.value || "");
      if (restoredTitle != null && document2)
        document2.title = restoredTitle;
    }
  });
  return title;
}
function createEasingFunction([p0, p1, p2, p3]) {
  const a = (a1, a2) => 1 - 3 * a2 + 3 * a1;
  const b = (a1, a2) => 3 * a2 - 6 * a1;
  const c = (a1) => 3 * a1;
  const calcBezier = (t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
  const getSlope = (t, a1, a2) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
  const getTforX = (x) => {
    let aGuessT = x;
    for (let i = 0;i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, p0, p2);
      if (currentSlope === 0)
        return aGuessT;
      const currentX = calcBezier(aGuessT, p0, p2) - x;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  };
  return (x) => p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3);
}
function lerp(a, b, alpha) {
  return a + alpha * (b - a);
}
function toVec(t) {
  return (typeof t === "number" ? [t] : t) || [];
}
function executeTransition(source, from, to, options = {}) {
  var _a, _b;
  const fromVal = toValue(from);
  const toVal = toValue(to);
  const v1 = toVec(fromVal);
  const v2 = toVec(toVal);
  const duration = (_a = toValue(options.duration)) != null ? _a : 1000;
  const startedAt = Date.now();
  const endAt = Date.now() + duration;
  const trans = typeof options.transition === "function" ? options.transition : (_b = toValue(options.transition)) != null ? _b : identity;
  const ease = typeof trans === "function" ? trans : createEasingFunction(trans);
  return new Promise((resolve) => {
    source.value = fromVal;
    const tick = () => {
      var _a2;
      if ((_a2 = options.abort) == null ? undefined : _a2.call(options)) {
        resolve();
        return;
      }
      const now = Date.now();
      const alpha = ease((now - startedAt) / duration);
      const arr = toVec(source.value).map((n, i) => lerp(v1[i], v2[i], alpha));
      if (Array.isArray(source.value))
        source.value = arr.map((n, i) => {
          var _a3, _b2;
          return lerp((_a3 = v1[i]) != null ? _a3 : 0, (_b2 = v2[i]) != null ? _b2 : 0, alpha);
        });
      else if (typeof source.value === "number")
        source.value = arr[0];
      if (now < endAt) {
        requestAnimationFrame(tick);
      } else {
        source.value = toVal;
        resolve();
      }
    };
    tick();
  });
}
function useTransition(source, options = {}) {
  let currentId = 0;
  const sourceVal = () => {
    const v = toValue(source);
    return typeof v === "number" ? v : v.map(toValue);
  };
  const outputRef = ref(sourceVal());
  watch2(sourceVal, async (to) => {
    var _a, _b;
    if (toValue(options.disabled))
      return;
    const id = ++currentId;
    if (options.delay)
      await promiseTimeout(toValue(options.delay));
    if (id !== currentId)
      return;
    const toVal = Array.isArray(to) ? to.map(toValue) : toValue(to);
    (_a = options.onStarted) == null || _a.call(options);
    await executeTransition(outputRef, outputRef.value, toVal, {
      ...options,
      abort: () => {
        var _a2;
        return id !== currentId || ((_a2 = options.abort) == null ? undefined : _a2.call(options));
      }
    });
    (_b = options.onFinished) == null || _b.call(options);
  }, { deep: true });
  watch2(() => toValue(options.disabled), (disabled) => {
    if (disabled) {
      currentId++;
      outputRef.value = sourceVal();
    }
  });
  tryOnScopeDispose(() => {
    currentId++;
  });
  return computed2(() => toValue(options.disabled) ? sourceVal() : outputRef.value);
}
function useUrlSearchParams(mode = "history", options = {}) {
  const {
    initialValue = {},
    removeNullishValues = true,
    removeFalsyValues = false,
    write: enableWrite = true,
    writeMode = "replace",
    window: window2 = defaultWindow,
    stringify = (params) => params.toString()
  } = options;
  if (!window2)
    return reactive(initialValue);
  const state = reactive({});
  function getRawParams() {
    if (mode === "history") {
      return window2.location.search || "";
    } else if (mode === "hash") {
      const hash = window2.location.hash || "";
      const index = hash.indexOf("?");
      return index > 0 ? hash.slice(index) : "";
    } else {
      return (window2.location.hash || "").replace(/^#/, "");
    }
  }
  function constructQuery(params) {
    const stringified = stringify(params);
    if (mode === "history")
      return `${stringified ? `?${stringified}` : ""}${window2.location.hash || ""}`;
    if (mode === "hash-params")
      return `${window2.location.search || ""}${stringified ? `#${stringified}` : ""}`;
    const hash = window2.location.hash || "#";
    const index = hash.indexOf("?");
    if (index > 0)
      return `${window2.location.search || ""}${hash.slice(0, index)}${stringified ? `?${stringified}` : ""}`;
    return `${window2.location.search || ""}${hash}${stringified ? `?${stringified}` : ""}`;
  }
  function read() {
    return new URLSearchParams(getRawParams());
  }
  function updateState(params) {
    const unusedKeys = new Set(Object.keys(state));
    for (const key of params.keys()) {
      const paramsForKey = params.getAll(key);
      state[key] = paramsForKey.length > 1 ? paramsForKey : params.get(key) || "";
      unusedKeys.delete(key);
    }
    Array.from(unusedKeys).forEach((key) => delete state[key]);
  }
  const { pause, resume } = watchPausable(state, () => {
    const params = new URLSearchParams("");
    Object.keys(state).forEach((key) => {
      const mapEntry = state[key];
      if (Array.isArray(mapEntry))
        mapEntry.forEach((value) => params.append(key, value));
      else if (removeNullishValues && mapEntry == null)
        params.delete(key);
      else if (removeFalsyValues && !mapEntry)
        params.delete(key);
      else
        params.set(key, mapEntry);
    });
    write(params, false);
  }, { deep: true });
  function write(params, shouldUpdate) {
    pause();
    if (shouldUpdate)
      updateState(params);
    if (writeMode === "replace") {
      window2.history.replaceState(window2.history.state, window2.document.title, window2.location.pathname + constructQuery(params));
    } else {
      window2.history.pushState(window2.history.state, window2.document.title, window2.location.pathname + constructQuery(params));
    }
    resume();
  }
  function onChanged() {
    if (!enableWrite)
      return;
    write(read(), true);
  }
  const listenerOptions = { passive: true };
  useEventListener(window2, "popstate", onChanged, listenerOptions);
  if (mode !== "history")
    useEventListener(window2, "hashchange", onChanged, listenerOptions);
  const initial = read();
  if (initial.keys().next().value)
    updateState(initial);
  else
    Object.assign(state, initialValue);
  return state;
}
function useUserMedia(options = {}) {
  var _a, _b;
  const enabled = shallowRef((_a = options.enabled) != null ? _a : false);
  const autoSwitch = shallowRef((_b = options.autoSwitch) != null ? _b : true);
  const constraints = ref(options.constraints);
  const { navigator: navigator2 = defaultNavigator } = options;
  const isSupported = useSupported(() => {
    var _a2;
    return (_a2 = navigator2 == null ? undefined : navigator2.mediaDevices) == null ? undefined : _a2.getUserMedia;
  });
  const stream = shallowRef();
  function getDeviceOptions(type) {
    switch (type) {
      case "video": {
        if (constraints.value)
          return constraints.value.video || false;
        break;
      }
      case "audio": {
        if (constraints.value)
          return constraints.value.audio || false;
        break;
      }
    }
  }
  async function _start() {
    if (!isSupported.value || stream.value)
      return;
    stream.value = await navigator2.mediaDevices.getUserMedia({
      video: getDeviceOptions("video"),
      audio: getDeviceOptions("audio")
    });
    return stream.value;
  }
  function _stop() {
    var _a2;
    (_a2 = stream.value) == null || _a2.getTracks().forEach((t) => t.stop());
    stream.value = undefined;
  }
  function stop2() {
    _stop();
    enabled.value = false;
  }
  async function start() {
    await _start();
    if (stream.value)
      enabled.value = true;
    return stream.value;
  }
  async function restart() {
    _stop();
    return await start();
  }
  watch2(enabled, (v) => {
    if (v)
      _start();
    else
      _stop();
  }, { immediate: true });
  watch2(constraints, () => {
    if (autoSwitch.value && stream.value)
      restart();
  }, { immediate: true });
  tryOnScopeDispose(() => {
    stop2();
  });
  return {
    isSupported,
    stream,
    start,
    stop: stop2,
    restart,
    constraints,
    enabled,
    autoSwitch
  };
}
function useVModel(props, key, emit, options = {}) {
  var _a, _b, _c;
  const {
    clone = false,
    passive = false,
    eventName,
    deep = false,
    defaultValue,
    shouldEmit
  } = options;
  const vm = getCurrentInstance();
  const _emit = emit || (vm == null ? undefined : vm.emit) || ((_a = vm == null ? undefined : vm.$emit) == null ? undefined : _a.bind(vm)) || ((_c = (_b = vm == null ? undefined : vm.proxy) == null ? undefined : _b.$emit) == null ? undefined : _c.bind(vm == null ? undefined : vm.proxy));
  let event = eventName;
  if (!key) {
    key = "modelValue";
  }
  event = event || `update:${key.toString()}`;
  const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
  const getValue2 = () => isDef(props[key]) ? cloneFn(props[key]) : defaultValue;
  const triggerEmit = (value) => {
    if (shouldEmit) {
      if (shouldEmit(value))
        _emit(event, value);
    } else {
      _emit(event, value);
    }
  };
  if (passive) {
    const initialValue = getValue2();
    const proxy = ref(initialValue);
    let isUpdating = false;
    watch2(() => props[key], (v) => {
      if (!isUpdating) {
        isUpdating = true;
        proxy.value = cloneFn(v);
        nextTick(() => isUpdating = false);
      }
    });
    watch2(proxy, (v) => {
      if (!isUpdating && (v !== props[key] || deep))
        triggerEmit(v);
    }, { deep });
    return proxy;
  } else {
    return computed2({
      get() {
        return getValue2();
      },
      set(value) {
        triggerEmit(value);
      }
    });
  }
}
function useVModels(props, emit, options = {}) {
  const ret = {};
  for (const key in props) {
    ret[key] = useVModel(props, key, emit, options);
  }
  return ret;
}
function useVibrate(options) {
  const {
    pattern = [],
    interval = 0,
    navigator: navigator2 = defaultNavigator
  } = options || {};
  const isSupported = useSupported(() => typeof navigator2 !== "undefined" && ("vibrate" in navigator2));
  const patternRef = toRef2(pattern);
  let intervalControls;
  const vibrate = (pattern2 = patternRef.value) => {
    if (isSupported.value)
      navigator2.vibrate(pattern2);
  };
  const stop2 = () => {
    if (isSupported.value)
      navigator2.vibrate(0);
    intervalControls == null || intervalControls.pause();
  };
  if (interval > 0) {
    intervalControls = useIntervalFn(vibrate, interval, {
      immediate: false,
      immediateCallback: false
    });
  }
  return {
    isSupported,
    pattern,
    intervalControls,
    vibrate,
    stop: stop2
  };
}
function useVirtualList(list, options) {
  const { containerStyle, wrapperProps, scrollTo, calculateRange, currentList, containerRef } = "itemHeight" in options ? useVerticalVirtualList(options, list) : useHorizontalVirtualList(options, list);
  return {
    list: currentList,
    scrollTo,
    containerProps: {
      ref: containerRef,
      onScroll: () => {
        calculateRange();
      },
      style: containerStyle
    },
    wrapperProps
  };
}
function useVirtualListResources(list) {
  const containerRef = shallowRef(null);
  const size = useElementSize(containerRef);
  const currentList = ref([]);
  const source = shallowRef(list);
  const state = ref({ start: 0, end: 10 });
  return { state, source, currentList, size, containerRef };
}
function createGetViewCapacity(state, source, itemSize) {
  return (containerSize) => {
    if (typeof itemSize === "number")
      return Math.ceil(containerSize / itemSize);
    const { start = 0 } = state.value;
    let sum = 0;
    let capacity = 0;
    for (let i = start;i < source.value.length; i++) {
      const size = itemSize(i);
      sum += size;
      capacity = i;
      if (sum > containerSize)
        break;
    }
    return capacity - start;
  };
}
function createGetOffset(source, itemSize) {
  return (scrollDirection) => {
    if (typeof itemSize === "number")
      return Math.floor(scrollDirection / itemSize) + 1;
    let sum = 0;
    let offset = 0;
    for (let i = 0;i < source.value.length; i++) {
      const size = itemSize(i);
      sum += size;
      if (sum >= scrollDirection) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };
}
function createCalculateRange(type, overscan, getOffset, getViewCapacity, { containerRef, state, currentList, source }) {
  return () => {
    const element = containerRef.value;
    if (element) {
      const offset = getOffset(type === "vertical" ? element.scrollTop : element.scrollLeft);
      const viewCapacity = getViewCapacity(type === "vertical" ? element.clientHeight : element.clientWidth);
      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length ? source.value.length : to
      };
      currentList.value = source.value.slice(state.value.start, state.value.end).map((ele, index) => ({
        data: ele,
        index: index + state.value.start
      }));
    }
  };
}
function createGetDistance(itemSize, source) {
  return (index) => {
    if (typeof itemSize === "number") {
      const size2 = index * itemSize;
      return size2;
    }
    const size = source.value.slice(0, index).reduce((sum, _, i) => sum + itemSize(i), 0);
    return size;
  };
}
function useWatchForSizes(size, list, containerRef, calculateRange) {
  watch2([size.width, size.height, list, containerRef], () => {
    calculateRange();
  });
}
function createComputedTotalSize(itemSize, source) {
  return computed2(() => {
    if (typeof itemSize === "number")
      return source.value.length * itemSize;
    return source.value.reduce((sum, _, index) => sum + itemSize(index), 0);
  });
}
var scrollToDictionaryForElementScrollKey = {
  horizontal: "scrollLeft",
  vertical: "scrollTop"
};
function createScrollTo(type, calculateRange, getDistance, containerRef) {
  return (index) => {
    if (containerRef.value) {
      containerRef.value[scrollToDictionaryForElementScrollKey[type]] = getDistance(index);
      calculateRange();
    }
  };
}
function useHorizontalVirtualList(options, list) {
  const resources = useVirtualListResources(list);
  const { state, source, currentList, size, containerRef } = resources;
  const containerStyle = { overflowX: "auto" };
  const { itemWidth, overscan = 5 } = options;
  const getViewCapacity = createGetViewCapacity(state, source, itemWidth);
  const getOffset = createGetOffset(source, itemWidth);
  const calculateRange = createCalculateRange("horizontal", overscan, getOffset, getViewCapacity, resources);
  const getDistanceLeft = createGetDistance(itemWidth, source);
  const offsetLeft = computed2(() => getDistanceLeft(state.value.start));
  const totalWidth = createComputedTotalSize(itemWidth, source);
  useWatchForSizes(size, list, containerRef, calculateRange);
  const scrollTo = createScrollTo("horizontal", calculateRange, getDistanceLeft, containerRef);
  const wrapperProps = computed2(() => {
    return {
      style: {
        height: "100%",
        width: `${totalWidth.value - offsetLeft.value}px`,
        marginLeft: `${offsetLeft.value}px`,
        display: "flex"
      }
    };
  });
  return {
    scrollTo,
    calculateRange,
    wrapperProps,
    containerStyle,
    currentList,
    containerRef
  };
}
function useVerticalVirtualList(options, list) {
  const resources = useVirtualListResources(list);
  const { state, source, currentList, size, containerRef } = resources;
  const containerStyle = { overflowY: "auto" };
  const { itemHeight, overscan = 5 } = options;
  const getViewCapacity = createGetViewCapacity(state, source, itemHeight);
  const getOffset = createGetOffset(source, itemHeight);
  const calculateRange = createCalculateRange("vertical", overscan, getOffset, getViewCapacity, resources);
  const getDistanceTop = createGetDistance(itemHeight, source);
  const offsetTop = computed2(() => getDistanceTop(state.value.start));
  const totalHeight = createComputedTotalSize(itemHeight, source);
  useWatchForSizes(size, list, containerRef, calculateRange);
  const scrollTo = createScrollTo("vertical", calculateRange, getDistanceTop, containerRef);
  const wrapperProps = computed2(() => {
    return {
      style: {
        width: "100%",
        height: `${totalHeight.value - offsetTop.value}px`,
        marginTop: `${offsetTop.value}px`
      }
    };
  });
  return {
    calculateRange,
    scrollTo,
    containerStyle,
    wrapperProps,
    currentList,
    containerRef
  };
}
function useWakeLock(options = {}) {
  const {
    navigator: navigator2 = defaultNavigator,
    document: document2 = defaultDocument
  } = options;
  const requestedType = shallowRef(false);
  const sentinel = shallowRef(null);
  const documentVisibility = useDocumentVisibility({ document: document2 });
  const isSupported = useSupported(() => navigator2 && ("wakeLock" in navigator2));
  const isActive = computed2(() => !!sentinel.value && documentVisibility.value === "visible");
  if (isSupported.value) {
    useEventListener(sentinel, "release", () => {
      var _a, _b;
      requestedType.value = (_b = (_a = sentinel.value) == null ? undefined : _a.type) != null ? _b : false;
    }, { passive: true });
    whenever(() => documentVisibility.value === "visible" && (document2 == null ? undefined : document2.visibilityState) === "visible" && requestedType.value, (type) => {
      requestedType.value = false;
      forceRequest(type);
    });
  }
  async function forceRequest(type) {
    var _a;
    await ((_a = sentinel.value) == null ? undefined : _a.release());
    sentinel.value = isSupported.value ? await navigator2.wakeLock.request(type) : null;
  }
  async function request(type) {
    if (documentVisibility.value === "visible")
      await forceRequest(type);
    else
      requestedType.value = type;
  }
  async function release() {
    requestedType.value = false;
    const s = sentinel.value;
    sentinel.value = null;
    await (s == null ? undefined : s.release());
  }
  return {
    sentinel,
    isSupported,
    isActive,
    request,
    forceRequest,
    release
  };
}
function useWebNotification(options = {}) {
  const {
    window: window2 = defaultWindow,
    requestPermissions: _requestForPermissions = true
  } = options;
  const defaultWebNotificationOptions = options;
  const isSupported = useSupported(() => {
    if (!window2 || !("Notification" in window2))
      return false;
    if (Notification.permission === "granted")
      return true;
    try {
      const notification2 = new Notification("");
      notification2.onshow = () => {
        notification2.close();
      };
    } catch (e) {
      if (e.name === "TypeError")
        return false;
    }
    return true;
  });
  const permissionGranted = shallowRef(isSupported.value && "permission" in Notification && Notification.permission === "granted");
  const notification = ref(null);
  const ensurePermissions = async () => {
    if (!isSupported.value)
      return;
    if (!permissionGranted.value && Notification.permission !== "denied") {
      const result = await Notification.requestPermission();
      if (result === "granted")
        permissionGranted.value = true;
    }
    return permissionGranted.value;
  };
  const { on: onClick, trigger: clickTrigger } = createEventHook();
  const { on: onShow, trigger: showTrigger } = createEventHook();
  const { on: onError, trigger: errorTrigger } = createEventHook();
  const { on: onClose, trigger: closeTrigger } = createEventHook();
  const show = async (overrides) => {
    if (!isSupported.value || !permissionGranted.value)
      return;
    const options2 = Object.assign({}, defaultWebNotificationOptions, overrides);
    notification.value = new Notification(options2.title || "", options2);
    notification.value.onclick = clickTrigger;
    notification.value.onshow = showTrigger;
    notification.value.onerror = errorTrigger;
    notification.value.onclose = closeTrigger;
    return notification.value;
  };
  const close = () => {
    if (notification.value)
      notification.value.close();
    notification.value = null;
  };
  if (_requestForPermissions)
    tryOnMounted(ensurePermissions);
  tryOnScopeDispose(close);
  if (isSupported.value && window2) {
    const document2 = window2.document;
    useEventListener(document2, "visibilitychange", (e) => {
      e.preventDefault();
      if (document2.visibilityState === "visible") {
        close();
      }
    });
  }
  return {
    isSupported,
    notification,
    ensurePermissions,
    permissionGranted,
    show,
    close,
    onClick,
    onShow,
    onError,
    onClose
  };
}
var DEFAULT_PING_MESSAGE = "ping";
function resolveNestedOptions(options) {
  if (options === true)
    return {};
  return options;
}
function useWebSocket(url, options = {}) {
  const {
    onConnected,
    onDisconnected,
    onError,
    onMessage,
    immediate = true,
    autoConnect = true,
    autoClose = true,
    protocols = []
  } = options;
  const data = ref(null);
  const status = shallowRef("CLOSED");
  const wsRef = ref();
  const urlRef = toRef2(url);
  let heartbeatPause;
  let heartbeatResume;
  let explicitlyClosed = false;
  let retried = 0;
  let bufferedData = [];
  let retryTimeout;
  let pongTimeoutWait;
  const _sendBuffer = () => {
    if (bufferedData.length && wsRef.value && status.value === "OPEN") {
      for (const buffer of bufferedData)
        wsRef.value.send(buffer);
      bufferedData = [];
    }
  };
  const resetRetry = () => {
    if (retryTimeout != null) {
      clearTimeout(retryTimeout);
      retryTimeout = undefined;
    }
  };
  const resetHeartbeat = () => {
    clearTimeout(pongTimeoutWait);
    pongTimeoutWait = undefined;
  };
  const close = (code = 1000, reason) => {
    resetRetry();
    if (!isClient && !isWorker || !wsRef.value)
      return;
    explicitlyClosed = true;
    resetHeartbeat();
    heartbeatPause == null || heartbeatPause();
    wsRef.value.close(code, reason);
    wsRef.value = undefined;
  };
  const send = (data2, useBuffer = true) => {
    if (!wsRef.value || status.value !== "OPEN") {
      if (useBuffer)
        bufferedData.push(data2);
      return false;
    }
    _sendBuffer();
    wsRef.value.send(data2);
    return true;
  };
  const _init = () => {
    if (explicitlyClosed || typeof urlRef.value === "undefined")
      return;
    const ws = new WebSocket(urlRef.value, protocols);
    wsRef.value = ws;
    status.value = "CONNECTING";
    ws.onopen = () => {
      status.value = "OPEN";
      retried = 0;
      onConnected == null || onConnected(ws);
      heartbeatResume == null || heartbeatResume();
      _sendBuffer();
    };
    ws.onclose = (ev) => {
      status.value = "CLOSED";
      resetHeartbeat();
      heartbeatPause == null || heartbeatPause();
      onDisconnected == null || onDisconnected(ws, ev);
      if (!explicitlyClosed && options.autoReconnect && (wsRef.value == null || ws === wsRef.value)) {
        const {
          retries = -1,
          delay = 1000,
          onFailed
        } = resolveNestedOptions(options.autoReconnect);
        const checkRetires = typeof retries === "function" ? retries : () => typeof retries === "number" && (retries < 0 || retried < retries);
        if (checkRetires(retried)) {
          retried += 1;
          retryTimeout = setTimeout(_init, delay);
        } else {
          onFailed == null || onFailed();
        }
      }
    };
    ws.onerror = (e) => {
      onError == null || onError(ws, e);
    };
    ws.onmessage = (e) => {
      if (options.heartbeat) {
        resetHeartbeat();
        const {
          message = DEFAULT_PING_MESSAGE,
          responseMessage = message
        } = resolveNestedOptions(options.heartbeat);
        if (e.data === toValue(responseMessage))
          return;
      }
      data.value = e.data;
      onMessage == null || onMessage(ws, e);
    };
  };
  if (options.heartbeat) {
    const {
      message = DEFAULT_PING_MESSAGE,
      interval = 1000,
      pongTimeout = 1000
    } = resolveNestedOptions(options.heartbeat);
    const { pause, resume } = useIntervalFn(() => {
      send(toValue(message), false);
      if (pongTimeoutWait != null)
        return;
      pongTimeoutWait = setTimeout(() => {
        close();
        explicitlyClosed = false;
      }, pongTimeout);
    }, interval, { immediate: false });
    heartbeatPause = pause;
    heartbeatResume = resume;
  }
  if (autoClose) {
    if (isClient)
      useEventListener("beforeunload", () => close(), { passive: true });
    tryOnScopeDispose(close);
  }
  const open = () => {
    if (!isClient && !isWorker)
      return;
    close();
    explicitlyClosed = false;
    retried = 0;
    _init();
  };
  if (immediate)
    open();
  if (autoConnect)
    watch2(urlRef, open);
  return {
    data,
    status,
    close,
    send,
    open,
    ws: wsRef
  };
}
function useWebWorker(arg0, workerOptions, options) {
  const {
    window: window2 = defaultWindow
  } = options != null ? options : {};
  const data = ref(null);
  const worker = shallowRef();
  const post = (...args) => {
    if (!worker.value)
      return;
    worker.value.postMessage(...args);
  };
  const terminate = function terminate2() {
    if (!worker.value)
      return;
    worker.value.terminate();
  };
  if (window2) {
    if (typeof arg0 === "string")
      worker.value = new Worker(arg0, workerOptions);
    else if (typeof arg0 === "function")
      worker.value = arg0();
    else
      worker.value = arg0;
    worker.value.onmessage = (e) => {
      data.value = e.data;
    };
    tryOnScopeDispose(() => {
      if (worker.value)
        worker.value.terminate();
    });
  }
  return {
    data,
    post,
    terminate,
    worker
  };
}
function depsParser(deps, localDeps) {
  if (deps.length === 0 && localDeps.length === 0)
    return "";
  const depsString = deps.map((dep) => `'${dep}'`).toString();
  const depsFunctionString = localDeps.filter((dep) => typeof dep === "function").map((fn) => {
    const str = fn.toString();
    if (str.trim().startsWith("function")) {
      return str;
    } else {
      const name = fn.name;
      return `const ${name} = ${str}`;
    }
  }).join(";");
  const importString = `importScripts(${depsString});`;
  return `${depsString.trim() === "" ? "" : importString} ${depsFunctionString}`;
}
function jobRunner(userFunc) {
  return (e) => {
    const userFuncArgs = e.data[0];
    return Promise.resolve(userFunc.apply(undefined, userFuncArgs)).then((result) => {
      postMessage(["SUCCESS", result]);
    }).catch((error) => {
      postMessage(["ERROR", error]);
    });
  };
}
function createWorkerBlobUrl(fn, deps, localDeps) {
  const blobCode = `${depsParser(deps, localDeps)}; onmessage=(${jobRunner})(${fn})`;
  const blob = new Blob([blobCode], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  return url;
}
function useWebWorkerFn(fn, options = {}) {
  const {
    dependencies = [],
    localDependencies = [],
    timeout,
    window: window2 = defaultWindow
  } = options;
  const worker = ref();
  const workerStatus = shallowRef("PENDING");
  const promise = ref({});
  const timeoutId = shallowRef();
  const workerTerminate = (status = "PENDING") => {
    if (worker.value && worker.value._url && window2) {
      worker.value.terminate();
      URL.revokeObjectURL(worker.value._url);
      promise.value = {};
      worker.value = undefined;
      window2.clearTimeout(timeoutId.value);
      workerStatus.value = status;
    }
  };
  workerTerminate();
  tryOnScopeDispose(workerTerminate);
  const generateWorker = () => {
    const blobUrl = createWorkerBlobUrl(fn, dependencies, localDependencies);
    const newWorker = new Worker(blobUrl);
    newWorker._url = blobUrl;
    newWorker.onmessage = (e) => {
      const { resolve = () => {}, reject = () => {} } = promise.value;
      const [status, result] = e.data;
      switch (status) {
        case "SUCCESS":
          resolve(result);
          workerTerminate(status);
          break;
        default:
          reject(result);
          workerTerminate("ERROR");
          break;
      }
    };
    newWorker.onerror = (e) => {
      const { reject = () => {} } = promise.value;
      e.preventDefault();
      reject(e);
      workerTerminate("ERROR");
    };
    if (timeout) {
      timeoutId.value = setTimeout(() => workerTerminate("TIMEOUT_EXPIRED"), timeout);
    }
    return newWorker;
  };
  const callWorker = (...fnArgs) => new Promise((resolve, reject) => {
    var _a;
    promise.value = {
      resolve,
      reject
    };
    (_a = worker.value) == null || _a.postMessage([[...fnArgs]]);
    workerStatus.value = "RUNNING";
  });
  const workerFn = (...fnArgs) => {
    if (workerStatus.value === "RUNNING") {
      console.error("[useWebWorkerFn] You can only run one instance of the worker at a time.");
      return Promise.reject();
    }
    worker.value = generateWorker();
    return callWorker(...fnArgs);
  };
  return {
    workerFn,
    workerStatus,
    workerTerminate
  };
}
function useWindowFocus(options = {}) {
  const { window: window2 = defaultWindow } = options;
  if (!window2)
    return shallowRef(false);
  const focused = shallowRef(window2.document.hasFocus());
  const listenerOptions = { passive: true };
  useEventListener(window2, "blur", () => {
    focused.value = false;
  }, listenerOptions);
  useEventListener(window2, "focus", () => {
    focused.value = true;
  }, listenerOptions);
  return focused;
}
function useWindowScroll(options = {}) {
  const { window: window2 = defaultWindow, ...rest } = options;
  return useScroll(window2, rest);
}
function useWindowSize(options = {}) {
  const {
    window: window2 = defaultWindow,
    initialWidth = Number.POSITIVE_INFINITY,
    initialHeight = Number.POSITIVE_INFINITY,
    listenOrientation = true,
    includeScrollbar = true,
    type = "inner"
  } = options;
  const width = shallowRef(initialWidth);
  const height = shallowRef(initialHeight);
  const update = () => {
    if (window2) {
      if (type === "outer") {
        width.value = window2.outerWidth;
        height.value = window2.outerHeight;
      } else if (type === "visual" && window2.visualViewport) {
        const { width: visualViewportWidth, height: visualViewportHeight, scale } = window2.visualViewport;
        width.value = Math.round(visualViewportWidth * scale);
        height.value = Math.round(visualViewportHeight * scale);
      } else if (includeScrollbar) {
        width.value = window2.innerWidth;
        height.value = window2.innerHeight;
      } else {
        width.value = window2.document.documentElement.clientWidth;
        height.value = window2.document.documentElement.clientHeight;
      }
    }
  };
  update();
  tryOnMounted(update);
  const listenerOptions = { passive: true };
  useEventListener("resize", update, listenerOptions);
  if (window2 && type === "visual" && window2.visualViewport) {
    useEventListener(window2.visualViewport, "resize", update, listenerOptions);
  }
  if (listenOrientation) {
    const matches = useMediaQuery("(orientation: portrait)");
    watch2(matches, () => update());
  }
  return { width, height };
}

// src/composables/useAuth.ts
var token = useStorage("token", "");
var baseUrl = "http://localhost:3008";
var user = ref(null);
var isAuthenticated = ref(false);
function useAuth() {
  async function fetchAuthUser() {
    try {
      if (!token) {
        isAuthenticated.value = false;
        user.value = null;
        return null;
      }
      const response = await fetch(`${baseUrl}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });
      if (!response.ok) {
        token.value = null;
        isAuthenticated.value = false;
        user.value = null;
        return null;
      }
      const data = await response.json();
      user.value = data.user;
      isAuthenticated.value = true;
      return data.user;
    } catch (error) {
      console.error("Error fetching user:", error);
      token.value = null;
      isAuthenticated.value = false;
      user.value = null;
      return null;
    }
  }
  async function checkAuthentication() {
    try {
      const userData = await fetchAuthUser();
      return userData !== null;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  }
  async function register(user2) {
    const url = `${baseUrl}/register`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user2)
    });
    const data = await response.json();
    if (isRegisterError(data)) {
      return data;
    }
    if (isRegisterResponse(data)) {
      token.value = data.data.token;
      return data;
    }
    return data;
  }
  function isRegisterError(data) {
    return "errors" in data;
  }
  function isRegisterResponse(data) {
    return "data" in data && "token" in data.data;
  }
  async function login(user2) {
    try {
      const url = `${baseUrl}/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user2)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      token.value = data.data.token;
      await fetchAuthUser();
      return data;
    } catch (error) {
      return error;
    }
  }
  async function logout() {
    try {
      const token2 = localStorage.getItem("token");
      if (token2) {
        await fetch(`${baseUrl}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token2}`,
            Accept: "application/json"
          }
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("token");
      user.value = null;
      isAuthenticated.value = false;
    }
  }
  return {
    user,
    isAuthenticated,
    token,
    getToken: () => token.value,
    register,
    login,
    logout,
    fetchAuthUser,
    checkAuthentication
  };
}
function authGuard({ guest = false } = {}) {
  const { isAuthenticated: isAuthenticated2 } = useAuth();
  if (guest) {
    if (isAuthenticated2.value) {
      window.location.replace("/");
    }
    return;
  }
  if (!isAuthenticated2.value) {
    window.location.replace("/login");
  }
}
// ../strings/src/title-case.ts
var WORD_SEPARATORS = new Set(["—", "–", "-", "―", "/"]);
var SENTENCE_TERMINATORS = new Set([".", "!", "?"]);
var TITLE_TERMINATORS = new Set([
  ...SENTENCE_TERMINATORS,
  ":",
  '"',
  "'",
  "”"
]);
var SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "because",
  "but",
  "by",
  "en",
  "for",
  "if",
  "in",
  "neither",
  "nor",
  "of",
  "on",
  "only",
  "or",
  "over",
  "per",
  "so",
  "some",
  "than",
  "that",
  "the",
  "to",
  "up",
  "upon",
  "v",
  "versus",
  "via",
  "vs",
  "when",
  "with",
  "without",
  "yet"
]);
// ../strings/src/helpers.ts
function toString2(v) {
  return Object.prototype.toString.call(v);
}
// ../strings/src/pluralize.ts
var pluralRules = [];
var singularRules = [];
var uncountables = {};
var irregularPlurals = {};
var irregularSingles = {};
function sanitizeRule(rule) {
  return typeof rule === "string" ? new RegExp(`^${rule}$`, "i") : rule;
}
function restoreCase(word, token2) {
  if (word === token2)
    return token2;
  if (word === word.toLowerCase())
    return token2.toLowerCase();
  if (word === word.toUpperCase())
    return token2.toUpperCase();
  if (word[0] === word[0].toUpperCase()) {
    return token2.charAt(0).toUpperCase() + token2.slice(1).toLowerCase();
  }
  return token2.toLowerCase();
}
function interpolate(str, ...args) {
  return str.replace(/\$(\d{1,2})/g, (match, index) => args[Number(index)] || "");
}
function replace(word, rule) {
  return word.replace(rule[0], (...matchArgs) => {
    const result = interpolate(rule[1], ...matchArgs);
    if (matchArgs[0] === "") {
      return restoreCase(word[matchArgs[matchArgs.length - 2] - 1], result);
    }
    return restoreCase(matchArgs[0], result);
  });
}
function sanitizeWord(token2, word, rules) {
  if (!token2.length || uncountables[token2]) {
    return word;
  }
  for (let i = rules.length - 1;i >= 0; i--) {
    const rule = rules[i];
    if (rule[0].test(word))
      return replace(word, rule);
  }
  return word;
}
function replaceWord(replaceMap, keepMap, rules) {
  return (word) => {
    const token2 = word.toLowerCase();
    if (keepMap[token2])
      return restoreCase(word, token2);
    if (replaceMap[token2])
      return restoreCase(word, replaceMap[token2]);
    return sanitizeWord(token2, word, rules);
  };
}
function checkWord(replaceMap, keepMap, rules) {
  return (word) => {
    const token2 = word.toLowerCase();
    if (keepMap[token2])
      return true;
    if (replaceMap[token2])
      return false;
    return sanitizeWord(token2, token2, rules) === token2;
  };
}
var pluralize = (word, options = {}) => {
  const { count = 2, inclusive = false } = options;
  if (typeof word !== "string") {
    throw new TypeError("Word must be a string");
  }
  const pluralized = count === 1 ? pluralize.singular(word) : pluralize.plural(word);
  return inclusive ? `${count} ${pluralized}` : pluralized;
};
pluralize.plural = replaceWord(irregularSingles, irregularPlurals, pluralRules);
pluralize.isPlural = checkWord(irregularSingles, irregularPlurals, pluralRules);
pluralize.singular = replaceWord(irregularPlurals, irregularSingles, singularRules);
pluralize.isSingular = checkWord(irregularPlurals, irregularSingles, singularRules);
pluralize.addPluralRule = (rule, replacement) => {
  pluralRules.push([sanitizeRule(rule), replacement]);
};
pluralize.addSingularRule = (rule, replacement) => {
  singularRules.push([sanitizeRule(rule), replacement]);
};
pluralize.addUncountableRule = (word) => {
  if (typeof word === "string") {
    uncountables[word.toLowerCase()] = true;
    return;
  }
  pluralize.addPluralRule(word, "$0");
  pluralize.addSingularRule(word, "$0");
};
pluralize.addIrregularRule = (single, plural) => {
  const lowerPlural = plural.toLowerCase();
  const lowerSingle = single.toLowerCase();
  irregularSingles[lowerSingle] = lowerPlural;
  irregularPlurals[lowerPlural] = lowerSingle;
};
[
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
].forEach(([single, plural]) => pluralize.addIrregularRule(single, plural));
[
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
].forEach(([rule, replacement]) => pluralize.addPluralRule(rule, replacement));
[
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
].forEach(([rule, replacement]) => pluralize.addSingularRule(rule, replacement));
[
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
  /pok[eé]mon$/i,
  /[^aeiou]ese$/i,
  /deer$/i,
  /fish$/i,
  /measles$/i,
  /o[iu]s$/i,
  /pox$/i,
  /sheep$/i
].forEach(pluralize.addUncountableRule);

// ../strings/src/slug.ts
var charMap = JSON.parse('{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E\'","Ը":"Y\'","Թ":"T\'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C\'","Կ":"K","Հ":"H","Ձ":"D\'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R\'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P\'","Ք":"Q\'","Օ":"O\'\'","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"\'","’":"\'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}');
var locales = JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');
// src/utils/base.ts
async function loop(times, callback) {
  Array.from({ length: times }).forEach(async (_, i) => await callback(i));
}
// ../../../../node_modules/@stripe/stripe-js/dist/index.mjs
var RELEASE_TRAIN = "basil";
var runtimeVersionToUrlVersion = function runtimeVersionToUrlVersion2(version2) {
  return version2 === 3 ? "v3" : version2;
};
var ORIGIN = "https://js.stripe.com";
var STRIPE_JS_URL = "".concat(ORIGIN, "/").concat(RELEASE_TRAIN, "/stripe.js");
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var STRIPE_JS_URL_REGEX = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
var isStripeJSURL = function isStripeJSURL2(url) {
  return V3_URL_REGEX.test(url) || STRIPE_JS_URL_REGEX.test(url);
};
var findScript = function findScript2() {
  var scripts = document.querySelectorAll('script[src^="'.concat(ORIGIN, '"]'));
  for (var i = 0;i < scripts.length; i++) {
    var script = scripts[i];
    if (!isStripeJSURL(script.src)) {
      continue;
    }
    return script;
  }
  return null;
};
var injectScript = function injectScript2(params) {
  var queryString = params && !params.advancedFraudSignals ? "?advancedFraudSignals=false" : "";
  var script = document.createElement("script");
  script.src = "".concat(STRIPE_JS_URL).concat(queryString);
  var headOrBody = document.head || document.body;
  if (!headOrBody) {
    throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  }
  headOrBody.appendChild(script);
  return script;
};
var registerWrapper = function registerWrapper2(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }
  stripe._registerWrapper({
    name: "stripe-js",
    version: "7.4.0",
    startTime
  });
};
var stripePromise$1 = null;
var onErrorListener = null;
var onLoadListener = null;
var onError = function onError2(reject) {
  return function(cause) {
    reject(new Error("Failed to load Stripe.js", {
      cause
    }));
  };
};
var onLoad = function onLoad2(resolve, reject) {
  return function() {
    if (window.Stripe) {
      resolve(window.Stripe);
    } else {
      reject(new Error("Stripe.js not available"));
    }
  };
};
var loadScript = function loadScript2(params) {
  if (stripePromise$1 !== null) {
    return stripePromise$1;
  }
  stripePromise$1 = new Promise(function(resolve, reject) {
    if (typeof window === "undefined" || typeof document === "undefined") {
      resolve(null);
      return;
    }
    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }
    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }
    try {
      var script = findScript();
      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      } else if (script && onLoadListener !== null && onErrorListener !== null) {
        var _script$parentNode;
        script.removeEventListener("load", onLoadListener);
        script.removeEventListener("error", onErrorListener);
        (_script$parentNode = script.parentNode) === null || _script$parentNode === undefined || _script$parentNode.removeChild(script);
        script = injectScript(params);
      }
      onLoadListener = onLoad(resolve, reject);
      onErrorListener = onError(reject);
      script.addEventListener("load", onLoadListener);
      script.addEventListener("error", onErrorListener);
    } catch (error) {
      reject(error);
      return;
    }
  });
  return stripePromise$1["catch"](function(error) {
    stripePromise$1 = null;
    return Promise.reject(error);
  });
};
var initStripe = function initStripe2(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }
  var pk = args[0];
  var isTestKey = pk.match(/^pk_test/);
  var version2 = runtimeVersionToUrlVersion(maybeStripe.version);
  var expectedVersion = RELEASE_TRAIN;
  if (isTestKey && version2 !== expectedVersion) {
    console.warn("Stripe.js@".concat(version2, " was loaded on the page, but @stripe/stripe-js@").concat("7.4.0", " expected Stripe.js@").concat(expectedVersion, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
  }
  var stripe = maybeStripe.apply(undefined, args);
  registerWrapper(stripe, startTime);
  return stripe;
};
var stripePromise;
var loadCalled = false;
var getStripePromise = function getStripePromise2() {
  if (stripePromise) {
    return stripePromise;
  }
  stripePromise = loadScript(null)["catch"](function(error) {
    stripePromise = null;
    return Promise.reject(error);
  });
  return stripePromise;
};
Promise.resolve().then(function() {
  return getStripePromise();
})["catch"](function(error) {
  if (!loadCalled) {
    console.warn(error);
  }
});
var loadStripe = function loadStripe2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0;_key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  loadCalled = true;
  var startTime = Date.now();
  return getStripePromise().then(function(maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};
// src/utils/billable.ts
var publishableKey = import.meta.env.FRONTEND_STRIPE_PUBLIC_KEY || "";
var client;
async function loadCardElement(clientSecret) {
  client = await loadStripe(publishableKey);
  const elements = client.elements({ clientSecret });
  const cardElement = elements.create("card");
  cardElement.mount("#card-element");
  return cardElement;
}
async function loadPaymentElement(clientSecret) {
  client = await loadStripe(publishableKey);
  const elements = client.elements({ clientSecret });
  const paymentElement = elements.create("payment", {
    fields: { billingDetails: "auto" }
  });
  paymentElement.mount("#payment-element");
  return elements;
}
async function confirmCardSetup(clientSecret, elements) {
  const data = await client.confirmCardSetup(clientSecret, { payment_method: { card: elements } });
  const { setupIntent, error } = data;
  return { setupIntent, error };
}
async function confirmCardPayment(clientSecret, elements) {
  try {
    const data = await client.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements,
        billing_details: {
          name: "Chris Breuer"
        }
      }
    });
    const { paymentIntent, error } = data;
    return { paymentIntent, error };
  } catch (err) {
    console.error("Error confirming card payment:", err);
    return { paymentIntent: null, error: err };
  }
}
async function createPaymentMethod(elements) {
  try {
    const data = await client.createPaymentMethod({
      type: "card",
      card: elements
    });
    const { paymentIntent, error } = data;
    return { paymentIntent, error };
  } catch (err) {
    console.error("Error confirming card payment:", err);
    return { paymentIntent: null, error: err };
  }
}
async function confirmPayment(elements) {
  try {
    const data = await client.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/settings/billing"
      }
    });
    const { paymentIntent, error } = data;
    return { paymentIntent, error };
  } catch (err) {
    console.error("Error confirming card payment:", err);
    return { paymentIntent: null, error: err };
  }
}
// ../../../../node_modules/@formkit/tempo/dist/iso8601.mjs
var iso8601Match = /^([0-9]{4})-([0-1][0-9])(?:-([0-3][0-9]))?(?:[T ]?([0-2][0-9])(?::([0-5][0-9]))?(?::([0-5][0-9]))?)?(?:\.[0-9]+)?(Z|(?:\+|\-)[0-9]{2}:?[0-9]{2})?$/;
function iso8601(date) {
  const matches = date.match(iso8601Match);
  if (matches) {
    const month = Number(matches[2]);
    if (month < 1 || month > 12)
      return false;
    if (typeof matches[3] !== undefined) {
      const date2 = Number(matches[3]);
      if (date2 < 1 || date2 > 31)
        return false;
    }
    if (typeof matches[4] !== undefined) {
      const hours = Number(matches[4]);
      if (hours < 0 || hours > 23)
        return false;
    }
    return true;
  }
  return false;
}

// ../../../../node_modules/@formkit/tempo/dist/date.mjs
function normalize(date2) {
  const matches = date2.match(iso8601Match);
  if (matches && typeof matches[4] === "undefined") {
    return date2 += "T00:00:00";
  }
  return date2;
}
function date(date2) {
  if (!date2) {
    date2 = /* @__PURE__ */ new Date;
  }
  if (date2 instanceof Date) {
    const d = new Date(date2);
    d.setMilliseconds(0);
    return d;
  }
  date2 = date2.trim();
  if (iso8601(date2)) {
    return new Date(normalize(date2));
  }
  throw new Error(`Non ISO 8601 compliant date (${date2}).`);
}

// ../../../../node_modules/@formkit/tempo/dist/monthEnd.mjs
function monthEnd(inputDate) {
  const d = date(inputDate);
  d.setDate(1);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  return d;
}

// ../../../../node_modules/@formkit/tempo/dist/monthDays.mjs
function monthDays(inputDate) {
  const d = monthEnd(inputDate);
  return d.getDate();
}

// ../../../../node_modules/@formkit/tempo/dist/common.mjs
var specDate = "1999-03-04T02:05:01.000Z";
var memoParts = /* @__PURE__ */ new Map;
var clockAgnostic = [
  ["YYYY", { year: "numeric" }],
  ["YY", { year: "2-digit" }],
  ["MMMM", { month: "long" }],
  ["MMM", { month: "short" }],
  ["MM", { month: "2-digit" }],
  ["M", { month: "numeric" }],
  ["DD", { day: "2-digit" }],
  ["D", { day: "numeric" }],
  ["dddd", { weekday: "long" }],
  ["ddd", { weekday: "short" }],
  ["d", { weekday: "narrow" }],
  ["mm", { minute: "2-digit" }],
  ["m", { minute: "numeric" }],
  ["ss", { second: "2-digit" }],
  ["s", { second: "numeric" }],
  ["ZZ", { timeZoneName: "long" }],
  ["Z", { timeZoneName: "short" }]
];
var clock24 = [
  ["HH", { hour: "2-digit" }],
  ["H", { hour: "numeric" }]
];
var clock12 = [
  ["hh", { hour: "2-digit" }],
  ["h", { hour: "numeric" }],
  ["a", { dayPeriod: "narrow" }],
  ["A", { dayPeriod: "narrow" }]
];
var fixedLength = {
  DD: 2,
  HH: 2,
  MM: 2,
  YY: 2,
  YYYY: 4,
  hh: 2,
  mm: 2,
  ss: 2
};
function fixedLengthByOffset(offsetString) {
  if (/^[+-]\d{2}:\d{2}/.test(offsetString)) {
    return 6;
  }
  if (/^[+-]\d{4}/.test(offsetString)) {
    return 5;
  }
  throw new Error("Invalid offset format");
}
var genitiveTokens = ["MMMM", "MMM", "dddd", "ddd"];
var tokens = /* @__PURE__ */ new Map(/* @__PURE__ */ [...clockAgnostic, ...clock24, ...clock12].map((format) => {
  return [format[0], format];
}));
var dayPeriodMap = /* @__PURE__ */ new Map;
var styles = [
  "full",
  "long",
  "medium",
  "short"
];
var two = (n) => String(n).padStart(2, "0");
var four = (n) => String(n).padStart(2, "0");
function normStr(part) {
  if (part.type === "literal") {
    part.value = part.value.normalize("NFKC");
  }
  return part;
}
function fill(inputDate, parts, locale, genitive = false, offset = null) {
  const partMap = createPartMap(inputDate, parts, locale, genitive);
  const d = date(inputDate);
  function value({ partName, partValue, token: token2 }) {
    if (partName === "literal")
      return partValue;
    const value2 = partMap[partName];
    if (partName === "hour" && token2 === "H") {
      return value2.replace(/^0/, "") || "0";
    }
    if (["mm", "ss", "MM"].includes(token2) && value2.length === 1) {
      return `0${value2}`;
    }
    if (partName === "dayPeriod") {
      const p = ap(d.getUTCHours() < 12 ? "am" : "pm", locale);
      return token2 === "A" ? p.toUpperCase() : p.toLowerCase();
    }
    if (partName === "timeZoneName") {
      return offset != null ? offset : minsToOffset(-1 * d.getTimezoneOffset(), token2);
    }
    return value2;
  }
  return parts.map((part) => {
    return {
      ...part,
      value: value(part)
    };
  });
}
function createPartMap(inputDate, parts, locale, genitive = false) {
  const d = date(inputDate);
  const hour12 = parts.filter((part) => part.hour12);
  const hour24 = parts.filter((part) => !part.hour12);
  const valueParts = [];
  const genitiveParts = [];
  function addValues(requestedParts, hour122 = false) {
    const preciseLocale = `${locale}-u-hc-${hour122 ? "h12" : "h23"}`;
    valueParts.push(...new Intl.DateTimeFormat(preciseLocale, requestedParts.reduce((options, part) => {
      if (part.partName === "literal")
        return options;
      if (genitive && genitiveTokens.includes(part.token)) {
        genitiveParts.push(part);
      }
      return Object.assign(options, part.option);
    }, { timeZone: "UTC" })).formatToParts(d).map(normStr));
    if (genitive && genitiveParts.length) {
      for (const part of genitiveParts) {
        let formattedParts = [];
        switch (part.token) {
          case "MMMM":
            formattedParts = new Intl.DateTimeFormat(preciseLocale, {
              dateStyle: "long",
              timeZone: "UTC"
            }).formatToParts(d).map(normStr);
            break;
          case "MMM":
            formattedParts = new Intl.DateTimeFormat(preciseLocale, {
              dateStyle: "medium",
              timeZone: "UTC"
            }).formatToParts(d).map(normStr);
            break;
        }
        const genitiveFormattedPart = formattedParts.find((p) => p.type === part.partName);
        const index = valueParts.findIndex((p) => p.type === part.partName);
        if (genitiveFormattedPart && index > -1) {
          valueParts[index] = genitiveFormattedPart;
        }
      }
    }
  }
  if (hour12.length)
    addValues(hour12, true);
  if (hour24.length)
    addValues(hour24);
  return valueParts.reduce((map2, part) => {
    map2[part.type] = part.value;
    return map2;
  }, {});
}
function minsToOffset(timeDiffInMins, token2 = "Z") {
  const hours = String(Math.floor(Math.abs(timeDiffInMins / 60))).padStart(2, "0");
  const mins = String(Math.abs(timeDiffInMins % 60)).padStart(2, "0");
  const sign = timeDiffInMins < 0 ? "-" : "+";
  if (token2 === "ZZ") {
    return `${sign}${hours}${mins}`;
  }
  return `${sign}${hours}:${mins}`;
}
function offsetToMins(offset, token2) {
  validOffset(offset, token2);
  const [_, sign, hours, mins] = offset.match(/([+-])([0-3][0-9]):?([0-6][0-9])/);
  const offsetInMins = Number(hours) * 60 + Number(mins);
  return sign === "+" ? offsetInMins : -offsetInMins;
}
function validOffset(offset, token2 = "Z") {
  const valid = ((token22) => {
    switch (token22) {
      case "Z":
        return /^([+-])[0-3][0-9]:[0-6][0-9]$/.test(offset);
      case "ZZ":
        return /^([+-])[0-3][0-9][0-6][0-9]$/.test(offset);
    }
  })(token2);
  if (!valid)
    throw new Error(`Invalid offset: ${offset}`);
  return offset;
}
function escapeTokens(str) {
  return clockAgnostic.concat(clock24).concat(clock12).sort((a, b) => a[0].length > b[0].length ? 1 : -1).reduce((target, part) => {
    return target.replace(part[0], `\\${part[0]}`);
  }, str);
}
function isNumeric(part) {
  return ["numeric", "2-digit"].includes(part.partValue);
}
function validate(parts) {
  let lastPart = undefined;
  for (const part of parts) {
    if (part.partName === "literal" && !isNaN(parseFloat(part.partValue))) {
      throw new Error(`Numbers in format (${part.partValue}).`);
    }
    if (lastPart && lastPart.partName !== "literal" && part.partName !== "literal") {
      if (!(lastPart.token in fixedLength) && !(part.token in fixedLength) && !(isNumeric(lastPart) && part.token.toLowerCase() === "a")) {
        throw new Error(`Illegal adjacent tokens (${lastPart.token}, ${part.token})`);
      }
    }
    lastPart = part;
  }
  return parts;
}
function getOffsetFormat(format) {
  if (typeof format === "string") {
    return format.includes("ZZ") ? "ZZ" : "Z";
  }
  return "time" in format && format.time === "full" ? "Z" : "ZZ";
}

// ../../../../node_modules/@formkit/tempo/dist/ap.mjs
function ap(ampm, locale) {
  const l = dayPeriodMap.get(locale);
  if (l && l[ampm])
    return l[ampm];
  const specimen = new Date(specDate);
  specimen.setUTCHours(ampm === "am" ? 5 : 20);
  const subparts = new Intl.DateTimeFormat(locale, {
    timeStyle: "full",
    timeZone: "UTC",
    hour12: true
  }).formatToParts(specimen).map(normStr);
  const period = subparts.find((part) => part.type === "dayPeriod");
  if (period) {
    const localePeriods = l || {};
    dayPeriodMap.set(locale, Object.assign(localePeriods, { [ampm]: period.value }));
    return period.value;
  }
  return ampm;
}

// ../../../../node_modules/@formkit/tempo/dist/applyOffset.mjs
function applyOffset(dateInput, offset = "+00:00") {
  const d = date(dateInput);
  const token2 = (() => {
    switch (fixedLengthByOffset(offset)) {
      case 5:
        return "ZZ";
      case 6:
        return "Z";
    }
  })();
  const timeDiffInMins = offsetToMins(offset, token2);
  return new Date(d.getTime() + timeDiffInMins * 1000 * 60);
}

// ../../../../node_modules/@formkit/tempo/dist/deviceTZ.mjs
function deviceTZ() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// ../../../../node_modules/@formkit/tempo/dist/offset.mjs
function relativeTime(d, timeZone) {
  const utcParts = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone,
    hourCycle: "h23"
  }).formatToParts(d).map(normStr);
  const parts = {};
  utcParts.forEach((part) => {
    parts[part.type] = part.value;
  });
  return /* @__PURE__ */ new Date(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`);
}
function offset(utcTime, tzA = "UTC", tzB = "device", timeZoneToken = "Z") {
  var _a;
  tzB = tzB === "device" ? (_a = deviceTZ()) != null ? _a : "utc" : tzB;
  const d = date(utcTime);
  const timeA = relativeTime(d, tzA);
  const timeB = relativeTime(d, tzB);
  const timeDiffInMins = Math.round((timeB.getTime() - timeA.getTime()) / 1000 / 60);
  return minsToOffset(timeDiffInMins, timeZoneToken);
}

// ../../../../node_modules/@formkit/tempo/dist/parts.mjs
function parts(format, locale) {
  if (styles.includes(format) || typeof format === "object") {
    return styleParts(format, locale);
  }
  let f = format;
  let match = 0;
  const testPattern = (pattern) => {
    if (!pattern[2])
      pattern[2] = new RegExp(`(.)?(${pattern[0]})`, "g");
    if (pattern[2].test(f)) {
      let didAdd = 0;
      f = f.replace(pattern[2], (_, prefix, actualMatch) => {
        if (prefix === "\\")
          return actualMatch;
        return `${typeof prefix === "string" ? prefix : ""}{!${didAdd++ ? match : match++}!}`;
      });
      return !!didAdd;
    }
    return false;
  };
  function validate2(patterns) {
    const parts3 = patterns.map((part) => part.partName);
    const deduped = new Set(parts3);
    if (parts3.length > deduped.size) {
      throw new Error(`Cannot reuse format tokens.`);
    }
    return patterns;
  }
  function createPart(hour12, [token2, option, exp]) {
    const partName = Object.keys(option)[0];
    const partValue = option[partName];
    return {
      option,
      partName,
      partValue,
      token: token2,
      pattern: exp,
      hour12
    };
  }
  const found24Patterns = clockAgnostic.filter(testPattern).concat(clock24.filter(testPattern)).map(createPart.bind(null, false));
  const parts2 = validate2(found24Patterns.concat(clock12.filter(testPattern).map(createPart.bind(null, true))));
  const extractIndex = /^\{!(\d+)!\}$/;
  return f.split(/(\{!\d+!\})/).map((match2) => {
    const hasIndex = match2.match(extractIndex);
    if (hasIndex) {
      return parts2[Number(hasIndex[1])];
    }
    return {
      option: { literal: match2 },
      partName: "literal",
      partValue: match2,
      token: match2,
      pattern: new RegExp(""),
      hour12: false
    };
  }).filter((part) => !(part.partName === "literal" && part.partValue === ""));
}
function styleParts(format, locale) {
  const options = {
    timeZone: "UTC"
  };
  if (typeof format === "string") {
    options.dateStyle = format;
  } else {
    if ("date" in format)
      options.dateStyle = format.date;
    if ("time" in format)
      options.timeStyle = format.time;
  }
  const formatter = new Intl.DateTimeFormat(locale, options);
  const segments = formatter.formatToParts(new Date(specDate)).map(normStr);
  const hourTypeSegments = formatter.formatToParts(/* @__PURE__ */ new Date("1999-04-05T23:05:01.000Z")).map(normStr);
  const hourPart = hourTypeSegments.find((segment) => segment.type === "hour");
  const hourType = hourPart && hourPart.value === "23" ? 24 : 12;
  return segments.map((part) => {
    const partName = part.type;
    const formatPattern = guessPattern(part.type, part.value, locale, part.type === "hour" ? hourType : undefined, options);
    if (formatPattern === undefined)
      return;
    const partValue = formatPattern[1][partName];
    if (!partValue)
      return;
    if (!formatPattern[2])
      formatPattern[2] = new RegExp(`${formatPattern[0]}`, "g");
    return {
      option: { [partName]: partValue },
      partName,
      partValue,
      token: formatPattern[0],
      pattern: formatPattern[2],
      hour12: hourType === 12
    };
  }).filter((part) => !!part);
}
function guessPattern(partName, partValue, locale, hour, options) {
  const l = partValue.length;
  const n = !isNaN(Number(partValue));
  let style;
  switch (partName) {
    case "year":
      return l === 2 ? tokens.get("YY") : tokens.get("YYYY");
    case "month":
      if (n)
        return l === 1 ? tokens.get("M") : tokens.get("MM");
      style = partStyle(locale, partName, partValue);
      switch (style) {
        case "long":
          return tokens.get("MMMM");
        default:
          return tokens.get("MMM");
      }
    case "day":
      return l === 1 ? tokens.get("D") : tokens.get("DD");
    case "weekday":
      style = partStyle(locale, partName, partValue);
      switch (style) {
        case "narrow":
          return tokens.get("d");
        case "short":
          return tokens.get("ddd");
        default:
          return tokens.get("dddd");
      }
    case "hour":
      if (hour === 12)
        return l === 1 ? tokens.get("h") : tokens.get("hh");
      return l === 1 ? tokens.get("H") : tokens.get("HH");
    case "minute":
      return l === 1 ? tokens.get("m") : tokens.get("mm");
    case "second":
      return l === 1 ? tokens.get("s") : tokens.get("ss");
    case "dayPeriod":
      return /^[A-Z]+$/u.test(partValue) ? tokens.get("A") : tokens.get("a");
    case "literal":
      return [partValue, { literal: partValue }, new RegExp("")];
    case "timeZoneName":
      return options.timeStyle === "full" ? tokens.get("Z") : tokens.get("ZZ");
    default:
      return;
  }
}
function partStyle(locale, part, value) {
  if (!memoParts.has(locale)) {
    const date2 = new Date(specDate);
    const weekdays = [3, 8, 9, 7, 6, 4, 3];
    const parts2 = ["weekday", "month", "dayPeriod"];
    const partStyles = ["long", "short", "narrow"];
    const formats2 = {};
    for (let i = 0;i < 12; i++) {
      date2.setMonth(0 + i);
      if (i in weekdays)
        date2.setDate(weekdays[i]);
      date2.setUTCHours(8 + i);
      for (const style of partStyles) {
        const segments = new Intl.DateTimeFormat(locale, parts2.reduce((options, part2) => Object.assign(options, { [part2]: style }), { hour12: true, timeZone: "UTC" })).formatToParts(date2).map(normStr);
        if (style === "long" || style === "short") {
          const genitiveFormattedParts = new Intl.DateTimeFormat(locale, {
            dateStyle: style === "short" ? "medium" : "long",
            timeZone: "UTC"
          }).formatToParts(date2).map(normStr);
          const genitiveMonth = genitiveFormattedParts.find((part2) => part2.type === "month");
          const index = segments.findIndex((part2) => part2.type === "month");
          if (index > -1 && genitiveMonth)
            segments[index] = genitiveMonth;
        }
        segments.forEach((part2) => {
          if (part2.type === "literal")
            return;
          const type = part2.type;
          formats2[type] = Object.assign(formats2[type] || {}, {
            [part2.value]: style
          });
        });
      }
    }
    memoParts.set(locale, formats2);
  }
  const formats = memoParts.get(locale);
  return formats ? formats[part][value] : undefined;
}

// ../../../../node_modules/@formkit/tempo/dist/removeOffset.mjs
function removeOffset(dateInput, offset2 = "+00:00") {
  const positive = offset2.slice(0, 1) === "+";
  return applyOffset(dateInput, offset2.replace(positive ? "+" : "-", positive ? "-" : "+"));
}

// ../../../../node_modules/@formkit/tempo/dist/deviceLocale.mjs
function deviceLocale() {
  return Intl.DateTimeFormat().resolvedOptions().locale;
}

// ../../../../node_modules/@formkit/tempo/dist/format.mjs
function format(inputDateOrOptions, format2 = "long", locale = "device", genitive = false, partFilter) {
  let tz, forceOffset;
  if (typeof inputDateOrOptions === "object" && !(inputDateOrOptions instanceof Date)) {
    ({
      date: inputDateOrOptions,
      format: format2,
      locale,
      genitive,
      partFilter,
      tz
    } = inputDateOrOptions);
  }
  if (format2 === "ISO8601")
    return date(inputDateOrOptions).toISOString();
  if (tz) {
    forceOffset = offset(inputDateOrOptions, "utc", tz, getOffsetFormat(format2));
  }
  tz != null || (tz = deviceTZ());
  if ((tz == null ? undefined : tz.toLowerCase()) !== "utc") {
    inputDateOrOptions = removeOffset(inputDateOrOptions, offset(inputDateOrOptions, tz, "utc"));
  }
  if (!locale || locale === "device") {
    locale = deviceLocale();
  }
  return fill(inputDateOrOptions, parts(format2, locale).filter(partFilter != null ? partFilter : () => true), locale, genitive, forceOffset).map((p) => p.value).join("");
}

// ../../../../node_modules/@formkit/tempo/dist/formatStr.mjs
function formatStr(format2, locale = "en", escapeLiterals = false, filterParts = () => true) {
  return parts(format2, locale).filter(filterParts).reduce((f, p) => f += escapeLiterals && p.partName === "literal" ? escapeTokens(p.token) : p.token, "").normalize("NFKC");
}

// ../../../../node_modules/@formkit/tempo/dist/fourDigitYear.mjs
function fourDigitYear(value) {
  const y = (/* @__PURE__ */ new Date()).getFullYear();
  const currentYear = y % 100;
  const century = Math.floor(y / 100);
  const parsedYear = Number(value);
  return (century + (parsedYear > currentYear + 20 ? -1 : 0)) * 100 + parsedYear;
}

// ../../../../node_modules/@formkit/tempo/dist/range.mjs
function range(token2, locale = "en", genitive = false) {
  const r = (n, c) => Array(n).fill("").map((_, i) => `${c(i)}`);
  if (token2 === "M")
    return r(12, (i) => i + 1);
  if (token2 === "MM")
    return r(12, (i) => {
      const m = i + 1;
      return m < 10 ? `0${m}` : m;
    });
  if (token2.startsWith("M"))
    return range("MM").map((m) => format(`2000-${m}-05`, token2, locale, genitive));
  if (token2.startsWith("d"))
    return r(7, (i) => `0${i + 2}`).map((d) => format(`2022-10-${d}`, token2, locale));
  if (token2 === "a")
    return [ap("am", locale).toLowerCase(), ap("pm", locale).toLowerCase()];
  if (token2 === "A")
    return [ap("am", locale).toUpperCase(), ap("pm", locale).toUpperCase()];
  if (token2.startsWith("Y")) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return r(120, (i) => i + 1).reduce((ranges, i) => {
      if (i !== "120")
        ranges.push(format(`${year + Number(i)}-06-06`, token2, locale));
      ranges.unshift(format(`${year - Number(i)}-06-06`, token2, locale));
      return ranges;
    }, [format(`${year}-06-06`, token2, locale)]);
  }
  if (token2.startsWith("D"))
    return r(31, (i) => `${token2 === "DD" && i < 9 ? "0" : ""}${i + 1}`);
  if (token2.startsWith("H"))
    return r(24, (i) => `${token2 === "HH" && i < 10 ? "0" : ""}${i}`);
  if (token2.startsWith("h"))
    return r(12, (i) => `${token2 === "hh" && i < 9 ? "0" : ""}${i + 1}`);
  if (token2.startsWith("m") || token2.startsWith("s"))
    return r(60, (i) => `${token2.length > 1 && i < 10 ? "0" : ""}${i}`);
  return [];
}

// ../../../../node_modules/@formkit/tempo/dist/parse.mjs
function parse(dateStrOrOptions, format2 = "ISO8601", locale = "device") {
  let partFilter = () => true;
  let dateStr;
  let dateOverflow = "backward";
  if (typeof dateStrOrOptions === "object") {
    ({
      date: dateStr,
      format: format2 = "ISO8601",
      locale = "device",
      dateOverflow = "backward",
      partFilter = () => true
    } = dateStrOrOptions);
  } else {
    dateStr = dateStrOrOptions;
  }
  if (!dateStr)
    throw new Error("parse() requires a date string.");
  const invalid = () => {
    throw new Error(`Date (${dateStr}) does not match format (${formatStr(format2, locale)})`);
  };
  if (format2 === "ISO8601")
    return date(dateStr);
  const genitive = styles.includes(format2) || typeof format2 === "object";
  const formatParts = validate(parts(format2, locale).filter(partFilter));
  if (!formatParts.length)
    throw new Error("parse() requires a pattern.");
  let parsedParts;
  try {
    parsedParts = parseParts(dateStr, formatParts);
  } catch {
    return invalid();
  }
  const now = /* @__PURE__ */ new Date;
  const parsed = /* @__PURE__ */ new Map([
    ["YYYY", now.getFullYear()],
    ["MM", now.getMonth() + 1],
    ["DD", now.getDate()],
    ["HH", 0],
    ["mm", 0],
    ["ss", 0]
  ]);
  let a = null;
  let offset2 = "";
  parsedParts.forEach((part) => {
    if (part.partName === "literal")
      return;
    if (part.token === part.value)
      return invalid();
    const v = Number(part.value);
    if (parsed.has(part.token)) {
      parsed.set(part.token, v);
    } else if (part.token === "YY") {
      parsed.set("YYYY", fourDigitYear(part.value));
    } else {
      const t = part.token;
      if (t.startsWith("d")) {
        return;
      } else if (t === "D") {
        parsed.set("DD", v);
      } else if (t === "H" || t.startsWith("h")) {
        parsed.set("HH", v);
      } else if (t === "M") {
        parsed.set("MM", v);
      } else if (t === "a" || t === "A") {
        a = part.value.toLowerCase() === ap("am", locale).toLowerCase();
      } else if (t === "Z" || t === "ZZ") {
        offset2 = validOffset(part.value, t);
      } else {
        const values = range(t, locale, genitive);
        const index = values.indexOf(part.value);
        if (index !== -1) {
          switch (t) {
            case "MMM":
            case "MMMM":
              parsed.set("MM", index + 1);
              break;
          }
        }
      }
    }
  });
  let hours = parsed.get("HH") || 0;
  if (a === false) {
    hours += hours === 12 ? 0 : 12;
    parsed.set("HH", hours === 24 ? 0 : hours);
  } else if (a === true && hours === 12) {
    parsed.set("HH", 0);
  }
  parsed.set("MM", (parsed.get("MM") || 1) - 1);
  let [Y, M, D, h2, m, s] = Array.from(parsed.values());
  const maxDaysInMonth = monthDays(/* @__PURE__ */ new Date(`${four(Y)}-${two(M + 1)}-10`));
  if (maxDaysInMonth < D && dateOverflow === "throw")
    throw new Error(`Invalid date ${four(Y)}-${two(M + 1)}-${two(D)}`);
  D = dateOverflow === "backward" ? Math.min(D, maxDaysInMonth) : D;
  const isoString = `${four(Y)}-${two(M + 1)}-${two(D)}T${two(h2)}:${two(m)}:${two(s)}${offset2}`;
  const d = new Date(isoString);
  if (isFinite(+d))
    return d;
  return invalid();
}
function parseParts(dateStr, formatParts) {
  let i = 0;
  const advance = (parts2) => [
    parts2[i++],
    parts2[i]
  ];
  let pos = 0;
  const parsed = [];
  let n = undefined;
  do {
    const [current, next] = advance(formatParts);
    n = next;
    let len = 1;
    if (current.partName === "literal") {
      len = current.partValue.length;
    } else if (current.partName === "timeZoneName") {
      len = fixedLengthByOffset(dateStr.substring(pos));
    } else if (current.token in fixedLength) {
      len = fixedLength[current.token];
    } else if (next) {
      if (next.partName === "literal") {
        len = dateStr.indexOf(next.partValue, pos) - pos;
        if (len < 0)
          throw new Error;
      } else if (next.partName === "dayPeriod") {
        for (let i2 = 1;i2 <= 4; i2++) {
          if (isNaN(Number(dateStr.charAt(pos + i2)))) {
            len = i2;
            break;
          }
        }
      } else {
        const nextChar = dateStr.substring(pos).search(/\d/);
        if (nextChar !== -1)
          len = pos + nextChar;
      }
    } else {
      len = dateStr.length;
    }
    parsed.push({ ...current, value: dateStr.substring(pos, pos + len) });
    pos += len;
  } while (n);
  return parsed;
}
// ../datetime/src/index.ts
var now = useNow;
var dateFormat = useDateFormat;
// ../../../../node_modules/perfect-debounce/dist/index.mjs
var DEBOUNCE_DEFAULTS = {
  trailing: true
};
function debounce(fn, wait = 25, options = {}) {
  options = { ...DEBOUNCE_DEFAULTS, ...options };
  if (!Number.isFinite(wait)) {
    throw new TypeError("Expected `wait` to be a finite number");
  }
  let leadingValue;
  let timeout;
  let resolveList = [];
  let currentPromise;
  let trailingArgs;
  const applyFn = (_this, args) => {
    currentPromise = _applyPromised(fn, _this, args);
    currentPromise.finally(() => {
      currentPromise = null;
      if (options.trailing && trailingArgs && !timeout) {
        const promise = applyFn(_this, trailingArgs);
        trailingArgs = null;
        return promise;
      }
    });
    return currentPromise;
  };
  return function(...args) {
    if (currentPromise) {
      if (options.trailing) {
        trailingArgs = args;
      }
      return currentPromise;
    }
    return new Promise((resolve) => {
      const shouldCallNow = !timeout && options.leading;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        const promise = options.leading ? leadingValue : applyFn(this, args);
        for (const _resolve of resolveList) {
          _resolve(promise);
        }
        resolveList = [];
      }, wait);
      if (shouldCallNow) {
        leadingValue = applyFn(this, args);
        resolve(leadingValue);
      } else {
        resolveList.push(resolve);
      }
    });
  };
}
async function _applyPromised(fn, _this, args) {
  return await fn.apply(_this, args);
}
// ../../../../node_modules/destr/dist/index.mjs
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

// ../../../../node_modules/ufo/dist/index.mjs
var r = String.fromCharCode;
var HASH_RE = /#/g;
var AMPERSAND_RE = /&/g;
var SLASH_RE = /\//g;
var EQUAL_RE = /=/g;
var PLUS_RE = /\+/g;
var ENC_CARET_RE = /%5e/gi;
var ENC_BACKTICK_RE = /%60/gi;
var ENC_PIPE_RE = /%7c/gi;
var ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === undefined) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== undefined).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}
var PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
var PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
var PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
var TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
var JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
var protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

// ../../../../node_modules/ofetch/dist/shared/ofetch.03887fc3.mjs
class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(message, ctx.error ? { cause: ctx.error } : undefined);
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}
var payloadMethods = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === undefined) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
var textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
var JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults2, Headers2) {
  const headers = mergeHeaders(input?.headers ?? request?.headers, defaults2?.headers, Headers2);
  let query;
  if (defaults2?.query || defaults2?.params || input?.params || input?.query) {
    query = {
      ...defaults2?.params,
      ...defaults2?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults2,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults2, Headers2) {
  if (!defaults2) {
    return new Headers2(input);
  }
  const headers = new Headers2(defaults2);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers2(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}
var retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  409,
  425,
  429,
  500,
  502,
  503,
  504
]);
var nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch2(globalOptions = {}) {
  const {
    fetch: fetch2 = globalThis.fetch,
    Headers: Headers2 = globalThis.Headers,
    AbortController: AbortController2 = globalThis.AbortController
  } = globalOptions;
  async function onError3(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(_request, _options, globalOptions.defaults, Headers2),
      response: undefined,
      error: undefined
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers2(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if ("pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || typeof context.options.body.pipe === "function") {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController2;
      abortTimeout = setTimeout(() => {
        const error = new Error("[TimeoutError]: The operation was aborted due to timeout");
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch2(context.request, context.options);
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(context, context.options.onRequestError);
      }
      return await onError3(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(context, context.options.onResponse);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(context, context.options.onResponseError);
      }
      return await onError3(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r2 = await $fetchRaw(request, options);
    return r2._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch2(...args);
  $fetch.create = (defaultOptions2 = {}, customGlobalOptions = {}) => createFetch2({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions2
    }
  });
  return $fetch;
}

// ../../../../node_modules/ofetch/dist/index.mjs
var _globalThis2 = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
}();
var fetch2 = _globalThis2.fetch ? (...args) => _globalThis2.fetch(...args) : () => Promise.reject(new Error("[ofetch] global.fetch is not supported!"));
var Headers2 = _globalThis2.Headers;
var AbortController2 = _globalThis2.AbortController;
var ofetch = createFetch2({ fetch: fetch2, Headers: Headers2, AbortController: AbortController2 });

// src/utils/fetch.ts
var loading = false;
var token2 = "";
var baseURL = "/";
async function get(url, params, headers) {
  if (headers) {
    if (token2)
      headers.set("Authorization", `Bearer ${token2}`);
  }
  return await ofetch(url, { method: "GET", baseURL, params, headers });
}
async function post(url, params, headers) {
  if (headers) {
    if (token2)
      headers.set("Authorization", `Bearer ${token2}`);
  }
  loading = true;
  try {
    const result = await ofetch(url, {
      method: "POST",
      baseURL,
      params,
      headers
    });
    loading = false;
    return result;
  } catch (err) {
    loading = false;
    throw err;
  }
}
async function patch(url, params, headers) {
  if (headers) {
    if (token2)
      headers.set("Authorization", `Bearer ${token2}`);
  }
  loading = true;
  return await ofetch(url, {
    method: "PATCH",
    baseURL,
    params,
    headers
  });
}
async function put(url, params, headers) {
  if (headers) {
    if (token2)
      headers.set("Authorization", `Bearer ${token2}`);
  }
  loading = true;
  return await ofetch(url, {
    method: "PUT",
    baseURL,
    params,
    headers
  });
}
async function destroy(url, params, headers) {
  if (headers) {
    if (token2)
      headers.set("Authorization", `Bearer ${token2}`);
  }
  loading = true;
  return await ofetch(url, {
    method: "DELETE",
    baseURL,
    params,
    headers
  });
}
function setToken(authToken) {
  token2 = authToken;
}
var Fetch = {
  get,
  post,
  patch,
  put,
  destroy,
  baseURL,
  token: token2,
  setToken,
  loading
};
// src/utils/guards.ts
function notNullish2(v) {
  return v != null;
}
function noNull(v) {
  return v !== null;
}
function notUndefined(v) {
  return v !== undefined;
}
function isTruthy(v) {
  return Boolean(v);
}
// src/utils/lazy.ts
function lazy(getter) {
  return {
    get value() {
      const value = getter();
      Object.defineProperty(this, "value", { value });
      return value;
    }
  };
}
// ../../../../node_modules/@vueuse/math/index.mjs
function createGenericProjection(fromDomain, toDomain, projector) {
  return (input) => {
    return computed2(() => projector(toValue(input), toValue(fromDomain), toValue(toDomain)));
  };
}
function defaultNumericProjector(input, from, to) {
  return (input - from[0]) / (from[1] - from[0]) * (to[1] - to[0]) + to[0];
}
function createProjection(fromDomain, toDomain, projector = defaultNumericProjector) {
  return createGenericProjection(fromDomain, toDomain, projector);
}
function logicAnd(...args) {
  return computed2(() => args.every((i) => toValue(i)));
}
function logicNot(v) {
  return computed2(() => !toValue(v));
}
function logicOr(...args) {
  return computed2(() => args.some((i) => toValue(i)));
}
function useAbs(value) {
  return computed2(() => Math.abs(toValue(value)));
}
function toValueArgsFlat(args) {
  return args.flatMap((i) => {
    const v = toValue(i);
    if (Array.isArray(v))
      return v.map((i2) => toValue(i2));
    return [v];
  });
}
function useAverage(...args) {
  return computed2(() => {
    const array = toValueArgsFlat(args);
    return array.reduce((sum, v) => sum += v, 0) / array.length;
  });
}
function useCeil(value) {
  return computed2(() => Math.ceil(toValue(value)));
}
function useClamp2(value, min, max) {
  if (typeof value === "function" || isReadonly(value))
    return computed2(() => clamp(toValue(value), toValue(min), toValue(max)));
  const _value = ref(value);
  return computed2({
    get() {
      return _value.value = clamp(_value.value, toValue(min), toValue(max));
    },
    set(value2) {
      _value.value = clamp(value2, toValue(min), toValue(max));
    }
  });
}
function useFloor(value) {
  return computed2(() => Math.floor(toValue(value)));
}
function useMath(key, ...args) {
  return reactify(Math[key])(...args);
}
function useMax(...args) {
  return computed2(() => {
    const array = toValueArgsFlat(args);
    return Math.max(...array);
  });
}
function useMin(...args) {
  return computed2(() => {
    const array = toValueArgsFlat(args);
    return Math.min(...array);
  });
}
function accurateMultiply(value, power) {
  const valueStr = value.toString();
  if (value > 0 && valueStr.includes(".")) {
    const decimalPlaces = valueStr.split(".")[1].length;
    const multiplier = 10 ** decimalPlaces;
    return value * multiplier * power / multiplier;
  } else {
    return value * power;
  }
}
function usePrecision(value, digits, options) {
  return computed2(() => {
    var _a;
    const _value = toValue(value);
    const _digits = toValue(digits);
    const power = 10 ** _digits;
    return Math[((_a = toValue(options)) == null ? undefined : _a.math) || "round"](accurateMultiply(_value, power)) / power;
  });
}
function useProjection(input, fromDomain, toDomain, projector) {
  return createProjection(fromDomain, toDomain, projector)(input);
}
function useRound(value) {
  return computed2(() => Math.round(toValue(value)));
}
function useSum(...args) {
  return computed2(() => toValueArgsFlat(args).reduce((sum, v) => sum += v, 0));
}
function useTrunc(value) {
  return computed2(() => Math.trunc(toValue(value)));
}

// src/utils/math.ts
var clamp2 = (n, min, max) => Math.min(max, Math.max(min, n));
function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// src/utils/plans.ts
var saas = {
  plans: [
    {
      productName: "Stacks Hobby",
      description: "All the Stacks features.",
      pricing: [
        {
          key: "stacks_hobby_early_monthly",
          price: 1900,
          interval: "month",
          currency: "usd"
        },
        {
          key: "stacks_hobby_launch_monthly",
          price: 2900,
          interval: "month",
          currency: "usd"
        },
        {
          key: "stacks_hobby_monthly",
          price: 3900,
          interval: "month",
          currency: "usd"
        },
        {
          key: "stacks_hobby_yearly",
          price: 37900,
          interval: "year",
          currency: "usd"
        }
      ],
      metadata: {
        createdBy: "admin",
        version: "1.0.0"
      }
    },
    {
      productName: "Stacks Pro",
      description: "All the Stacks features, including being able to invite team members.",
      pricing: [
        {
          key: "stacks_pro_early_monthly",
          price: 3900,
          interval: "month",
          currency: "usd"
        },
        {
          key: "stacks_pro_monthly",
          price: 5900,
          interval: "month",
          currency: "usd"
        },
        {
          key: "stacks_pro_yearly",
          price: 57900,
          interval: "year",
          currency: "usd"
        },
        {
          key: "stacks_pro_early_yearly",
          price: 39000,
          interval: "year",
          currency: "usd"
        }
      ],
      metadata: {
        createdBy: "admin",
        version: "1.0.0"
      }
    },
    {
      productName: "Stacks Lifetime",
      description: "One-time lifetime access to all Stacks features.",
      pricing: [
        {
          key: "stacks_hobby_early_lifetime",
          price: 17900,
          currency: "usd"
        },
        {
          key: "stacks_hobby_launch_lifetime",
          price: 27900,
          currency: "usd"
        },
        {
          key: "stacks_hobby_lifetime",
          price: 47900,
          currency: "usd"
        },
        {
          key: "stacks_pro_early_lifetime",
          price: 27900,
          currency: "usd"
        },
        {
          key: "stacks_pro_launch_lifetime",
          price: 37900,
          currency: "usd"
        },
        {
          key: "stacks_pro_lifetime",
          price: 74900,
          currency: "usd"
        }
      ],
      metadata: {
        createdBy: "admin",
        version: "1.0.0"
      }
    }
  ],
  webhook: {
    endpoint: "your-webhook-endpoint",
    secret: "your-webhook-secret"
  },
  currencies: ["usd"],
  coupons: [],
  products: [
    {
      name: "Stacks Hobby",
      description: "All the Stacks features.",
      images: ["image-url"]
    },
    {
      name: "Stacks Pro",
      description: "All the Stacks features, including team invites.",
      images: ["image-url"]
    },
    {
      name: "Stacks Lifetime",
      description: "Lifetime access to Stacks features.",
      images: ["image-url"]
    }
  ]
};
// src/utils/promise.ts
function createSingletonPromise2(fn) {
  let _promise;
  function wrapper() {
    if (!_promise)
      _promise = fn();
    return _promise;
  }
  wrapper.reset = async () => {
    const _prev = _promise;
    _promise = undefined;
    if (_prev)
      await _prev;
  };
  return wrapper;
}
function createPromiseLock() {
  let currentPromise = Promise.resolve();
  const queue2 = [];
  return {
    async run(fn) {
      const runTask = async () => {
        await currentPromise;
        return fn();
      };
      const taskPromise = runTask();
      queue2.push(taskPromise);
      currentPromise = taskPromise.catch(() => {}).finally(() => {
        const index = queue2.indexOf(taskPromise);
        if (index > -1)
          queue2.splice(index, 1);
      });
      return taskPromise;
    },
    async wait() {
      while (queue2.length > 0) {
        await Promise.all(queue2);
      }
    },
    isWaiting() {
      return queue2.length > 0;
    },
    clear() {
      queue2.length = 0;
      currentPromise = Promise.resolve();
    }
  };
}
function createControlledPromise() {
  let resolve;
  let reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  promise.resolve = resolve;
  promise.reject = reject;
  return promise;
}
// src/utils/random.ts
var POOL_SIZE_MULTIPLIER = 128;
var pool = null;
var poolOffset = 0;
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
function fillPool(bytes) {
  if (!pool || pool.length < bytes) {
    pool = new Uint8Array(bytes * POOL_SIZE_MULTIPLIER);
    globalThis.crypto.getRandomValues(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    globalThis.crypto.getRandomValues(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
}
function randomPool(bytes) {
  fillPool(bytes |= 0);
  if (!pool) {
    throw new Error("Pool is not initialized");
  }
  return pool.subarray(poolOffset - bytes, poolOffset);
}
function customRandom(alphabet, defaultSize, getRandom) {
  const mask = (2 << 31 - Math.clz32(alphabet.length - 1 | 1)) - 1;
  const step = Math.ceil(1.6 * mask * defaultSize / alphabet.length);
  return (size = defaultSize) => {
    let id = "";
    while (true) {
      const bytes = getRandom(step);
      let i = step;
      while (i--) {
        id += alphabet[bytes[i] & mask] || "";
        if (id.length >= size)
          return id;
      }
    }
  };
}
function customAlphabet(alphabet, size = 21) {
  return customRandom(alphabet, size, randomPool);
}
function randomNonSecure(size = 21) {
  let id = "";
  let i = size | 0;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
}
function random2(size = 21) {
  fillPool(size |= 0);
  if (!pool) {
    return "";
  }
  let id = "";
  for (let i = poolOffset - size;i < poolOffset; i++) {
    id += urlAlphabet[pool[i] & 63];
  }
  return id;
}
// ../../../../node_modules/magic-regexp/dist/shared/magic-regexp.DKp_q_HX.mjs
var NO_WRAP_RE = /^(?:\(.*\)|\\?.)$/;
function wrap(s) {
  const v = s.toString();
  return NO_WRAP_RE.test(v) ? v : `(?:${v})`;
}
var GROUPED_AS_REPLACE_RE = /^(?:\(\?:(.+)\)|(.+))$/;
var GROUPED_REPLACE_RE = /^(?:\(\?:(.+)\)([?+*]|\{[\d,]+\})?|(.+))$/;
function createInput(s) {
  const groupedAsFn = (key) => createInput(`(?<${key}>${`${s}`.replace(GROUPED_AS_REPLACE_RE, "$1$2")})`);
  return {
    toString: () => s.toString(),
    and: Object.assign((...inputs) => createInput(`${s}${exactly(...inputs)}`), {
      referenceTo: (groupName) => createInput(`${s}\\k<${groupName}>`)
    }),
    or: (...inputs) => createInput(`(?:${s}|${inputs.map((v) => exactly(v)).join("|")})`),
    after: (...input) => createInput(`(?<=${exactly(...input)})${s}`),
    before: (...input) => createInput(`${s}(?=${exactly(...input)})`),
    notAfter: (...input) => createInput(`(?<!${exactly(...input)})${s}`),
    notBefore: (...input) => createInput(`${s}(?!${exactly(...input)})`),
    times: Object.assign((number) => createInput(`${wrap(s)}{${number}}`), {
      any: () => createInput(`${wrap(s)}*`),
      atLeast: (min) => createInput(`${wrap(s)}{${min},}`),
      atMost: (max) => createInput(`${wrap(s)}{0,${max}}`),
      between: (min, max) => createInput(`${wrap(s)}{${min},${max}}`)
    }),
    optionally: () => createInput(`${wrap(s)}?`),
    as: groupedAsFn,
    groupedAs: groupedAsFn,
    grouped: () => createInput(`${s}`.replace(GROUPED_REPLACE_RE, "($1$3)$2")),
    at: {
      lineStart: () => createInput(`^${s}`),
      lineEnd: () => createInput(`${s}$`)
    }
  };
}
var ESCAPE_REPLACE_RE = /[.*+?^${}()|[\]\\/]/g;
function createCharInput(raw) {
  const input = createInput(`[${raw}]`);
  const from = (charFrom, charTo) => createCharInput(`${raw}${escapeCharInput(charFrom)}-${escapeCharInput(charTo)}`);
  const orChar = Object.assign((chars) => createCharInput(`${raw}${escapeCharInput(chars)}`), { from });
  return Object.assign(input, { orChar, from });
}
function escapeCharInput(raw) {
  return raw.replace(/[-\\^\]]/g, "\\$&");
}
var charIn = Object.assign((chars) => {
  return createCharInput(escapeCharInput(chars));
}, createCharInput(""));
var charNotIn = Object.assign((chars) => {
  return createCharInput(`^${escapeCharInput(chars)}`);
}, createCharInput("^"));
function anyOf(...inputs) {
  return createInput(`(?:${inputs.map((a) => exactly(a)).join("|")})`);
}
var char = createInput(".");
var word = createInput("\\b\\w+\\b");
var wordChar = createInput("\\w");
var wordBoundary = createInput("\\b");
var digit = createInput("\\d");
var whitespace = createInput("\\s");
var letter = Object.assign(createInput("[a-zA-Z]"), {
  lowercase: createInput("[a-z]"),
  uppercase: createInput("[A-Z]")
});
var tab = createInput("\\t");
var linefeed = createInput("\\n");
var carriageReturn = createInput("\\r");
var not = {
  word: createInput("\\W+"),
  wordChar: createInput("\\W"),
  wordBoundary: createInput("\\B"),
  digit: createInput("\\D"),
  whitespace: createInput("\\S"),
  letter: Object.assign(createInput("[^a-zA-Z]"), {
    lowercase: createInput("[^a-z]"),
    uppercase: createInput("[^A-Z]")
  }),
  tab: createInput("[^\\t]"),
  linefeed: createInput("[^\\n]"),
  carriageReturn: createInput("[^\\r]")
};
function maybe(...inputs) {
  return createInput(`${wrap(exactly(...inputs))}?`);
}
function exactly(...inputs) {
  return createInput(inputs.map((input) => typeof input === "string" ? input.replace(ESCAPE_REPLACE_RE, "\\$&") : input).join(""));
}
function oneOrMore(...inputs) {
  return createInput(`${wrap(exactly(...inputs))}+`);
}
var withIndices = "d";
var caseInsensitive = "i";
var global2 = "g";
var multiline = "m";
var dotAll = "s";
var unicode = "u";
var sticky = "y";
// src/utils/regex.ts
function createRegExp(pattern, options = {}) {
  return new RegExp(pattern, options.flags);
}
// src/utils/retry.ts
function retry(fn, options = {}) {
  const { retries = 3, initialDelay = 1000, backoffFactor = 2, jitter = true } = options;
  return new Promise((resolve, reject) => {
    let attemptCount = 0;
    const attempt = async () => {
      try {
        resolve(await fn());
      } catch (err) {
        if (attemptCount >= retries) {
          reject(err);
        } else {
          const delay = calculateDelay(attemptCount, initialDelay, backoffFactor, jitter);
          setTimeout(() => attempt(), delay);
          attemptCount++;
        }
      }
    };
    attempt();
  });
}
function calculateDelay(attemptCount, initialDelay, backoffFactor, jitter) {
  let delay = initialDelay * backoffFactor ** attemptCount;
  if (jitter) {
    const random3 = Math.random();
    const jitterValue = delay * 0.3;
    delay = delay + jitterValue * (random3 - 0.5) * 2;
  }
  return delay;
}
// src/utils/sleep.ts
function sleep(ms) {
  if (ms < 0 || !Number.isInteger(ms)) {
    throw new Error("sleep() requires a non-negative integer");
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function wait(ms) {
  if (ms < 0 || !Number.isInteger(ms)) {
    throw new Error("wait() requires a non-negative integer");
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function delay(ms) {
  if (ms < 0 || !Number.isInteger(ms)) {
    throw new Error("delay() requires a non-negative integer");
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function waitUntil(condition, options = {}) {
  return new Promise((resolve) => {
    const { interval, timeout } = normalizeOptions(options);
    if (condition()) {
      resolve();
      return;
    }
    const check = () => {
      if (condition()) {
        resolve();
      } else {
        setTimeout(check, interval);
      }
    };
    if (timeout) {
      setTimeout(resolve, timeout);
    }
    check();
  });
}
function normalizeOptions(options) {
  if (typeof options === "number") {
    return { interval: 100, timeout: options };
  }
  return {
    interval: options.interval ?? 100,
    timeout: options.timeout ?? 0
  };
}
function waitWhile(condition, options = {}) {
  return new Promise((resolve) => {
    const { interval = 100, timeout = 0 } = options;
    if (!condition()) {
      resolve();
      return;
    }
    const check = () => {
      if (!condition()) {
        resolve();
      } else {
        setTimeout(check, interval);
      }
    };
    if (timeout) {
      setTimeout(resolve, timeout);
    }
    check();
  });
}
// src/utils/throttle.ts
function throttle(fn, wait2 = 300) {
  let inThrottle;
  let lastFn;
  let lastTime;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait2) {
          fn.apply(this, args);
          lastTime = Date.now();
        }
      }, Math.max(wait2 - (Date.now() - lastTime), 0));
    }
  };
}
// ../../../../node_modules/@unhead/shared/dist/index.mjs
var SelfClosingTags = /* @__PURE__ */ new Set(["meta", "link", "base"]);
var TagsWithInnerContent = /* @__PURE__ */ new Set(["title", "titleTemplate", "script", "style", "noscript"]);
var HasElementTags = /* @__PURE__ */ new Set([
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
]);
var ValidHeadTags = /* @__PURE__ */ new Set([
  "title",
  "titleTemplate",
  "templateParams",
  "base",
  "htmlAttrs",
  "bodyAttrs",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
]);
var UniqueTags = /* @__PURE__ */ new Set(["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"]);
var TagConfigKeys = /* @__PURE__ */ new Set(["tagPosition", "tagPriority", "tagDuplicateStrategy", "children", "innerHTML", "textContent", "processTemplateParams"]);
var IsBrowser = typeof window !== "undefined";
var composableNames = [
  "getActiveHead",
  "useHead",
  "useSeoMeta",
  "useHeadSafe",
  "useServerHead",
  "useServerSeoMeta",
  "useServerHeadSafe"
];
function defineHeadPlugin(plugin) {
  return plugin;
}
function hashCode(s) {
  let h2 = 9;
  for (let i = 0;i < s.length; )
    h2 = Math.imul(h2 ^ s.charCodeAt(i++), 9 ** 9);
  return ((h2 ^ h2 >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function hashTag(tag) {
  if (tag._h) {
    return tag._h;
  }
  if (tag._d) {
    return hashCode(tag._d);
  }
  let content = `${tag.tag}:${tag.textContent || tag.innerHTML || ""}:`;
  for (const key in tag.props) {
    content += `${key}:${String(tag.props[key])},`;
  }
  return hashCode(content);
}
var p = (p2) => ({ keyValue: p2, metaKey: "property" });
var k = (p2) => ({ keyValue: p2 });
var MetaPackingSchema = {
  appleItunesApp: {
    unpack: {
      entrySeparator: ", ",
      resolve({ key, value }) {
        return `${fixKeyCase(key)}=${value}`;
      }
    }
  },
  articleExpirationTime: p("article:expiration_time"),
  articleModifiedTime: p("article:modified_time"),
  articlePublishedTime: p("article:published_time"),
  bookReleaseDate: p("book:release_date"),
  charset: {
    metaKey: "charset"
  },
  contentSecurityPolicy: {
    unpack: {
      entrySeparator: "; ",
      resolve({ key, value }) {
        return `${fixKeyCase(key)} ${value}`;
      }
    },
    metaKey: "http-equiv"
  },
  contentType: {
    metaKey: "http-equiv"
  },
  defaultStyle: {
    metaKey: "http-equiv"
  },
  fbAppId: p("fb:app_id"),
  msapplicationConfig: k("msapplication-Config"),
  msapplicationTileColor: k("msapplication-TileColor"),
  msapplicationTileImage: k("msapplication-TileImage"),
  ogAudioSecureUrl: p("og:audio:secure_url"),
  ogAudioUrl: p("og:audio"),
  ogImageSecureUrl: p("og:image:secure_url"),
  ogImageUrl: p("og:image"),
  ogSiteName: p("og:site_name"),
  ogVideoSecureUrl: p("og:video:secure_url"),
  ogVideoUrl: p("og:video"),
  profileFirstName: p("profile:first_name"),
  profileLastName: p("profile:last_name"),
  profileUsername: p("profile:username"),
  refresh: {
    metaKey: "http-equiv",
    unpack: {
      entrySeparator: ";",
      resolve({ key, value }) {
        if (key === "seconds")
          return `${value}`;
      }
    }
  },
  robots: {
    unpack: {
      entrySeparator: ", ",
      resolve({ key, value }) {
        if (typeof value === "boolean")
          return `${fixKeyCase(key)}`;
        else
          return `${fixKeyCase(key)}:${value}`;
      }
    }
  },
  xUaCompatible: {
    metaKey: "http-equiv"
  }
};
var openGraphNamespaces = /* @__PURE__ */ new Set([
  "og",
  "book",
  "article",
  "profile"
]);
function fixKeyCase(key) {
  const updated = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  const prefixIndex = updated.indexOf("-");
  const fKey = updated.substring(0, prefixIndex);
  if (fKey === "twitter" || openGraphNamespaces.has(fKey))
    return key.replace(/([A-Z])/g, ":$1").toLowerCase();
  return updated;
}
function thenable(val, thenFn) {
  if (val instanceof Promise) {
    return val.then(thenFn);
  }
  return thenFn(val);
}
function normaliseTag(tagName, input, e, normalizedProps) {
  const props = normalizedProps || normaliseProps(typeof input === "object" && typeof input !== "function" && !(input instanceof Promise) ? { ...input } : { [tagName === "script" || tagName === "noscript" || tagName === "style" ? "innerHTML" : "textContent"]: input }, tagName === "templateParams" || tagName === "titleTemplate");
  if (props instanceof Promise) {
    return props.then((val) => normaliseTag(tagName, input, e, val));
  }
  const tag = {
    tag: tagName,
    props
  };
  for (const k2 of TagConfigKeys) {
    const val = tag.props[k2] !== undefined ? tag.props[k2] : e[k2];
    if (val !== undefined) {
      if (!(k2 === "innerHTML" || k2 === "textContent" || k2 === "children") || TagsWithInnerContent.has(tag.tag)) {
        tag[k2 === "children" ? "innerHTML" : k2] = val;
      }
      delete tag.props[k2];
    }
  }
  if (tag.props.body) {
    tag.tagPosition = "bodyClose";
    delete tag.props.body;
  }
  if (tag.tag === "script") {
    if (typeof tag.innerHTML === "object") {
      tag.innerHTML = JSON.stringify(tag.innerHTML);
      tag.props.type = tag.props.type || "application/json";
    }
  }
  return Array.isArray(tag.props.content) ? tag.props.content.map((v) => ({ ...tag, props: { ...tag.props, content: v } })) : tag;
}
function normaliseStyleClassProps(key, v) {
  const sep = key === "class" ? " " : ";";
  if (v && typeof v === "object" && !Array.isArray(v)) {
    v = Object.entries(v).filter(([, v2]) => v2).map(([k2, v2]) => key === "style" ? `${k2}:${v2}` : k2);
  }
  return String(Array.isArray(v) ? v.join(sep) : v)?.split(sep).filter((c) => Boolean(c.trim())).join(sep);
}
function nestedNormaliseProps(props, virtual, keys2, startIndex) {
  for (let i = startIndex;i < keys2.length; i += 1) {
    const k2 = keys2[i];
    if (k2 === "class" || k2 === "style") {
      props[k2] = normaliseStyleClassProps(k2, props[k2]);
      continue;
    }
    if (props[k2] instanceof Promise) {
      return props[k2].then((val) => {
        props[k2] = val;
        return nestedNormaliseProps(props, virtual, keys2, i);
      });
    }
    if (!virtual && !TagConfigKeys.has(k2)) {
      const v = String(props[k2]);
      const isDataKey = k2.startsWith("data-");
      if (v === "true" || v === "") {
        props[k2] = isDataKey ? "true" : true;
      } else if (!props[k2]) {
        if (isDataKey && v === "false")
          props[k2] = "false";
        else
          delete props[k2];
      }
    }
  }
}
function normaliseProps(props, virtual = false) {
  const resolvedProps = nestedNormaliseProps(props, virtual, Object.keys(props), 0);
  if (resolvedProps instanceof Promise) {
    return resolvedProps.then(() => props);
  }
  return props;
}
var TagEntityBits = 10;
function nestedNormaliseEntryTags(headTags, tagPromises, startIndex) {
  for (let i = startIndex;i < tagPromises.length; i += 1) {
    const tags = tagPromises[i];
    if (tags instanceof Promise) {
      return tags.then((val) => {
        tagPromises[i] = val;
        return nestedNormaliseEntryTags(headTags, tagPromises, i);
      });
    }
    if (Array.isArray(tags)) {
      headTags.push(...tags);
    } else {
      headTags.push(tags);
    }
  }
}
function normaliseEntryTags(e) {
  const tagPromises = [];
  const input = e.resolvedInput;
  for (const k2 in input) {
    if (!Object.prototype.hasOwnProperty.call(input, k2)) {
      continue;
    }
    const v = input[k2];
    if (v === undefined || !ValidHeadTags.has(k2)) {
      continue;
    }
    if (Array.isArray(v)) {
      for (const props of v) {
        tagPromises.push(normaliseTag(k2, props, e));
      }
      continue;
    }
    tagPromises.push(normaliseTag(k2, v, e));
  }
  if (tagPromises.length === 0) {
    return [];
  }
  const headTags = [];
  return thenable(nestedNormaliseEntryTags(headTags, tagPromises, 0), () => headTags.map((t, i) => {
    t._e = e._i;
    e.mode && (t._m = e.mode);
    t._p = (e._i << TagEntityBits) + i;
    return t;
  }));
}
var NetworkEvents = /* @__PURE__ */ new Set(["onload", "onerror", "onabort", "onprogress", "onloadstart"]);
var TAG_WEIGHTS = {
  base: -10,
  title: 10
};
var TAG_ALIASES = {
  critical: -80,
  high: -10,
  low: 20
};
function tagWeight(tag) {
  const priority = tag.tagPriority;
  if (typeof priority === "number")
    return priority;
  let weight = 100;
  if (tag.tag === "meta") {
    if (tag.props["http-equiv"] === "content-security-policy")
      weight = -30;
    else if (tag.props.charset)
      weight = -20;
    else if (tag.props.name === "viewport")
      weight = -15;
  } else if (tag.tag === "link" && tag.props.rel === "preconnect") {
    weight = 20;
  } else if (tag.tag in TAG_WEIGHTS) {
    weight = TAG_WEIGHTS[tag.tag];
  }
  if (priority && priority in TAG_ALIASES) {
    return weight + TAG_ALIASES[priority];
  }
  return weight;
}
var SortModifiers = [{ prefix: "before:", offset: -1 }, { prefix: "after:", offset: 1 }];
var allowedMetaProperties = ["name", "property", "http-equiv"];
function tagDedupeKey(tag) {
  const { props, tag: tagName } = tag;
  if (UniqueTags.has(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  if (props.id) {
    return `${tagName}:id:${props.id}`;
  }
  for (const n of allowedMetaProperties) {
    if (props[n] !== undefined) {
      return `${tagName}:${n}:${props[n]}`;
    }
  }
  return false;
}
var sepSub = "%separator";
function sub(p2, token3, isJson = false) {
  let val;
  if (token3 === "s" || token3 === "pageTitle") {
    val = p2.pageTitle;
  } else if (token3.includes(".")) {
    const dotIndex = token3.indexOf(".");
    val = p2[token3.substring(0, dotIndex)]?.[token3.substring(dotIndex + 1)];
  } else {
    val = p2[token3];
  }
  if (val !== undefined) {
    return isJson ? (val || "").replace(/"/g, "\\\"") : val || "";
  }
  return;
}
var sepSubRe = new RegExp(`${sepSub}(?:\\s*${sepSub})*`, "g");
function processTemplateParams(s, p2, sep, isJson = false) {
  if (typeof s !== "string" || !s.includes("%"))
    return s;
  let decoded = s;
  try {
    decoded = decodeURI(s);
  } catch {}
  const tokens2 = decoded.match(/%\w+(?:\.\w+)?/g);
  if (!tokens2) {
    return s;
  }
  const hasSepSub = s.includes(sepSub);
  s = s.replace(/%\w+(?:\.\w+)?/g, (token3) => {
    if (token3 === sepSub || !tokens2.includes(token3)) {
      return token3;
    }
    const re = sub(p2, token3.slice(1), isJson);
    return re !== undefined ? re : token3;
  }).trim();
  if (hasSepSub) {
    if (s.endsWith(sepSub))
      s = s.slice(0, -sepSub.length);
    if (s.startsWith(sepSub))
      s = s.slice(sepSub.length);
    s = s.replace(sepSubRe, sep).trim();
  }
  return s;
}
function resolveTitleTemplate(template2, title) {
  if (template2 == null)
    return title || null;
  if (typeof template2 === "function")
    return template2(title);
  return template2;
}

// ../../../../node_modules/@vueuse/head/node_modules/@unhead/dom/dist/index.mjs
async function renderDOMHead(head, options = {}) {
  const dom = options.document || head.resolvedOptions.document;
  if (!dom || !head.dirty)
    return;
  const beforeRenderCtx = { shouldRender: true, tags: [] };
  await head.hooks.callHook("dom:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender)
    return;
  if (head._domUpdatePromise) {
    return head._domUpdatePromise;
  }
  head._domUpdatePromise = new Promise(async (resolve) => {
    const tags = (await head.resolveTags()).map((tag) => ({
      tag,
      id: HasElementTags.has(tag.tag) ? hashTag(tag) : tag.tag,
      shouldRender: true
    }));
    let state = head._dom;
    if (!state) {
      state = {
        elMap: { htmlAttrs: dom.documentElement, bodyAttrs: dom.body }
      };
      const takenDedupeKeys = /* @__PURE__ */ new Set;
      for (const key of ["body", "head"]) {
        const children = dom[key]?.children;
        for (const c of children) {
          const tag = c.tagName.toLowerCase();
          if (!HasElementTags.has(tag)) {
            continue;
          }
          const t = {
            tag,
            props: await normaliseProps(c.getAttributeNames().reduce((props, name) => ({ ...props, [name]: c.getAttribute(name) }), {})),
            innerHTML: c.innerHTML
          };
          const dedupeKey = tagDedupeKey(t);
          let d = dedupeKey;
          let i = 1;
          while (d && takenDedupeKeys.has(d))
            d = `${dedupeKey}:${i++}`;
          if (d) {
            t._d = d;
            takenDedupeKeys.add(d);
          }
          state.elMap[c.getAttribute("data-hid") || hashTag(t)] = c;
        }
      }
    }
    state.pendingSideEffects = { ...state.sideEffects };
    state.sideEffects = {};
    function track2(id, scope, fn) {
      const k2 = `${id}:${scope}`;
      state.sideEffects[k2] = fn;
      delete state.pendingSideEffects[k2];
    }
    function trackCtx({ id, $el, tag }) {
      const isAttrTag = tag.tag.endsWith("Attrs");
      state.elMap[id] = $el;
      if (!isAttrTag) {
        if (tag.textContent && tag.textContent !== $el.textContent) {
          $el.textContent = tag.textContent;
        }
        if (tag.innerHTML && tag.innerHTML !== $el.innerHTML) {
          $el.innerHTML = tag.innerHTML;
        }
        track2(id, "el", () => {
          state.elMap[id]?.remove();
          delete state.elMap[id];
        });
      }
      if (tag._eventHandlers) {
        for (const k2 in tag._eventHandlers) {
          if (!Object.prototype.hasOwnProperty.call(tag._eventHandlers, k2)) {
            continue;
          }
          if ($el.getAttribute(`data-${k2}`) !== "") {
            (tag.tag === "bodyAttrs" ? dom.defaultView : $el).addEventListener(k2.substring(2), tag._eventHandlers[k2].bind($el));
            $el.setAttribute(`data-${k2}`, "");
          }
        }
      }
      for (const k2 in tag.props) {
        if (!Object.prototype.hasOwnProperty.call(tag.props, k2)) {
          continue;
        }
        const value = tag.props[k2];
        const ck = `attr:${k2}`;
        if (k2 === "class") {
          if (!value) {
            continue;
          }
          for (const c of value.split(" ")) {
            isAttrTag && track2(id, `${ck}:${c}`, () => $el.classList.remove(c));
            !$el.classList.contains(c) && $el.classList.add(c);
          }
        } else if (k2 === "style") {
          if (!value) {
            continue;
          }
          for (const c of value.split(";")) {
            const propIndex = c.indexOf(":");
            const k22 = c.substring(0, propIndex).trim();
            const v = c.substring(propIndex + 1).trim();
            track2(id, `${ck}:${k22}`, () => {
              $el.style.removeProperty(k22);
            });
            $el.style.setProperty(k22, v);
          }
        } else {
          $el.getAttribute(k2) !== value && $el.setAttribute(k2, value === true ? "" : String(value));
          isAttrTag && track2(id, ck, () => $el.removeAttribute(k2));
        }
      }
    }
    const pending = [];
    const frag = {
      bodyClose: undefined,
      bodyOpen: undefined,
      head: undefined
    };
    for (const ctx of tags) {
      const { tag, shouldRender, id } = ctx;
      if (!shouldRender)
        continue;
      if (tag.tag === "title") {
        dom.title = tag.textContent;
        continue;
      }
      ctx.$el = ctx.$el || state.elMap[id];
      if (ctx.$el) {
        trackCtx(ctx);
      } else if (HasElementTags.has(tag.tag)) {
        pending.push(ctx);
      }
    }
    for (const ctx of pending) {
      const pos = ctx.tag.tagPosition || "head";
      ctx.$el = dom.createElement(ctx.tag.tag);
      trackCtx(ctx);
      frag[pos] = frag[pos] || dom.createDocumentFragment();
      frag[pos].appendChild(ctx.$el);
    }
    for (const ctx of tags)
      await head.hooks.callHook("dom:renderTag", ctx, dom, track2);
    frag.head && dom.head.appendChild(frag.head);
    frag.bodyOpen && dom.body.insertBefore(frag.bodyOpen, dom.body.firstChild);
    frag.bodyClose && dom.body.appendChild(frag.bodyClose);
    for (const k2 in state.pendingSideEffects) {
      state.pendingSideEffects[k2]();
    }
    head._dom = state;
    await head.hooks.callHook("dom:rendered", { renders: tags });
    resolve();
  }).finally(() => {
    head._domUpdatePromise = undefined;
    head.dirty = false;
  });
  return head._domUpdatePromise;
}
function debouncedRenderDOMHead(head, options = {}) {
  const fn = options.delayFn || ((fn2) => setTimeout(fn2, 10));
  return head._domDebouncedUpdatePromise = head._domDebouncedUpdatePromise || new Promise((resolve) => fn(() => {
    return renderDOMHead(head, options).then(() => {
      delete head._domDebouncedUpdatePromise;
      resolve();
    });
  }));
}
function DomPlugin(options) {
  return defineHeadPlugin((head) => {
    const initialPayload = head.resolvedOptions.document?.head.querySelector('script[id="unhead:payload"]')?.innerHTML || false;
    if (initialPayload) {
      head.push(JSON.parse(initialPayload));
    }
    return {
      mode: "client",
      hooks: {
        "entries:updated": (head2) => {
          debouncedRenderDOMHead(head2, options);
        }
      }
    };
  });
}

// ../../../../node_modules/hookable/dist/index.mjs
function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
var defaultTask = { run: (function_) => function_() };
var _createTask = () => defaultTask;
var createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce((promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))), Promise.resolve());
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = undefined;
    this._after = undefined;
    this._deprecatedMessages = undefined;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {};
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set;
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {}
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = undefined;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = undefined;
      _function = undefined;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : undefined;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(name in this._hooks ? [...this._hooks[name]] : [], arguments_);
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== undefined) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== undefined) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable;
}

// ../../../../node_modules/@vueuse/head/node_modules/@unhead/vue/node_modules/unhead/dist/index.mjs
var UsesMergeStrategy = /* @__PURE__ */ new Set(["templateParams", "htmlAttrs", "bodyAttrs"]);
var DedupePlugin = defineHeadPlugin({
  hooks: {
    "tag:normalise": ({ tag }) => {
      if (tag.props.hid) {
        tag.key = tag.props.hid;
        delete tag.props.hid;
      }
      if (tag.props.vmid) {
        tag.key = tag.props.vmid;
        delete tag.props.vmid;
      }
      if (tag.props.key) {
        tag.key = tag.props.key;
        delete tag.props.key;
      }
      const generatedKey = tagDedupeKey(tag);
      if (generatedKey && !generatedKey.startsWith("meta:og:") && !generatedKey.startsWith("meta:twitter:")) {
        delete tag.key;
      }
      const dedupe = generatedKey || (tag.key ? `${tag.tag}:${tag.key}` : false);
      if (dedupe)
        tag._d = dedupe;
    },
    "tags:resolve": (ctx) => {
      const deduping = /* @__PURE__ */ Object.create(null);
      for (const tag of ctx.tags) {
        const dedupeKey = (tag.key ? `${tag.tag}:${tag.key}` : tag._d) || hashTag(tag);
        const dupedTag = deduping[dedupeKey];
        if (dupedTag) {
          let strategy = tag?.tagDuplicateStrategy;
          if (!strategy && UsesMergeStrategy.has(tag.tag))
            strategy = "merge";
          if (strategy === "merge") {
            const oldProps = dupedTag.props;
            if (oldProps.style && tag.props.style) {
              if (oldProps.style[oldProps.style.length - 1] !== ";") {
                oldProps.style += ";";
              }
              tag.props.style = `${oldProps.style} ${tag.props.style}`;
            }
            if (oldProps.class && tag.props.class) {
              tag.props.class = `${oldProps.class} ${tag.props.class}`;
            } else if (oldProps.class) {
              tag.props.class = oldProps.class;
            }
            deduping[dedupeKey].props = {
              ...oldProps,
              ...tag.props
            };
            continue;
          } else if (tag._e === dupedTag._e) {
            dupedTag._duped = dupedTag._duped || [];
            tag._d = `${dupedTag._d}:${dupedTag._duped.length + 1}`;
            dupedTag._duped.push(tag);
            continue;
          } else if (tagWeight(tag) > tagWeight(dupedTag)) {
            continue;
          }
        }
        const hasProps = tag.innerHTML || tag.textContent || Object.keys(tag.props).length !== 0;
        if (!hasProps && HasElementTags.has(tag.tag)) {
          delete deduping[dedupeKey];
          continue;
        }
        deduping[dedupeKey] = tag;
      }
      const newTags = [];
      for (const key in deduping) {
        const tag = deduping[key];
        const dupes = tag._duped;
        newTags.push(tag);
        if (dupes) {
          delete tag._duped;
          newTags.push(...dupes);
        }
      }
      ctx.tags = newTags;
      ctx.tags = ctx.tags.filter((t) => !(t.tag === "meta" && (t.props.name || t.props.property) && !t.props.content));
    }
  }
});
var ValidEventTags = /* @__PURE__ */ new Set(["script", "link", "bodyAttrs"]);
var EventHandlersPlugin = defineHeadPlugin((head) => ({
  hooks: {
    "tags:resolve": (ctx) => {
      for (const tag of ctx.tags) {
        if (!ValidEventTags.has(tag.tag)) {
          continue;
        }
        const props = tag.props;
        for (const key in props) {
          if (key[0] !== "o" || key[1] !== "n") {
            continue;
          }
          if (!Object.prototype.hasOwnProperty.call(props, key)) {
            continue;
          }
          const value = props[key];
          if (typeof value !== "function") {
            continue;
          }
          if (head.ssr && NetworkEvents.has(key)) {
            props[key] = `this.dataset.${key}fired = true`;
          } else {
            delete props[key];
          }
          tag._eventHandlers = tag._eventHandlers || {};
          tag._eventHandlers[key] = value;
        }
        if (head.ssr && tag._eventHandlers && (tag.props.src || tag.props.href)) {
          tag.key = tag.key || hashCode(tag.props.src || tag.props.href);
        }
      }
    },
    "dom:renderTag": ({ $el, tag }) => {
      const dataset = $el?.dataset;
      if (!dataset) {
        return;
      }
      for (const k2 in dataset) {
        if (!k2.endsWith("fired")) {
          continue;
        }
        const ek = k2.slice(0, -5);
        if (!NetworkEvents.has(ek)) {
          continue;
        }
        tag._eventHandlers?.[ek]?.call($el, new Event(ek.substring(2)));
      }
    }
  }
}));
var DupeableTags = /* @__PURE__ */ new Set(["link", "style", "script", "noscript"]);
var HashKeyedPlugin = defineHeadPlugin({
  hooks: {
    "tag:normalise": ({ tag }) => {
      if (tag.key && DupeableTags.has(tag.tag)) {
        tag.props["data-hid"] = tag._h = hashCode(tag.key);
      }
    }
  }
});
var PayloadPlugin = defineHeadPlugin({
  mode: "server",
  hooks: {
    "tags:beforeResolve": (ctx) => {
      const payload = {};
      let hasPayload = false;
      for (const tag of ctx.tags) {
        if (tag._m !== "server" || tag.tag !== "titleTemplate" && tag.tag !== "templateParams" && tag.tag !== "title") {
          continue;
        }
        payload[tag.tag] = tag.tag === "title" || tag.tag === "titleTemplate" ? tag.textContent : tag.props;
        hasPayload = true;
      }
      if (hasPayload) {
        ctx.tags.push({
          tag: "script",
          innerHTML: JSON.stringify(payload),
          props: { id: "unhead:payload", type: "application/json" }
        });
      }
    }
  }
});
var SortPlugin = defineHeadPlugin({
  hooks: {
    "tags:resolve": (ctx) => {
      for (const tag of ctx.tags) {
        if (typeof tag.tagPriority !== "string") {
          continue;
        }
        for (const { prefix, offset: offset2 } of SortModifiers) {
          if (!tag.tagPriority.startsWith(prefix)) {
            continue;
          }
          const key = tag.tagPriority.substring(prefix.length);
          const position = ctx.tags.find((tag2) => tag2._d === key)?._p;
          if (position !== undefined) {
            tag._p = position + offset2;
            break;
          }
        }
      }
      ctx.tags.sort((a, b) => {
        const aWeight = tagWeight(a);
        const bWeight = tagWeight(b);
        if (aWeight < bWeight) {
          return -1;
        } else if (aWeight > bWeight) {
          return 1;
        }
        return a._p - b._p;
      });
    }
  }
});
var SupportedAttrs = {
  meta: "content",
  link: "href",
  htmlAttrs: "lang"
};
var contentAttrs = ["innerHTML", "textContent"];
var TemplateParamsPlugin = defineHeadPlugin((head) => ({
  hooks: {
    "tags:resolve": (ctx) => {
      const { tags } = ctx;
      let templateParams;
      for (let i = 0;i < tags.length; i += 1) {
        const tag = tags[i];
        if (tag.tag !== "templateParams") {
          continue;
        }
        templateParams = ctx.tags.splice(i, 1)[0].props;
        i -= 1;
      }
      const params = templateParams || {};
      const sep = params.separator || "|";
      delete params.separator;
      params.pageTitle = processTemplateParams(params.pageTitle || tags.find((tag) => tag.tag === "title")?.textContent || "", params, sep);
      for (const tag of tags) {
        if (tag.processTemplateParams === false) {
          continue;
        }
        const v = SupportedAttrs[tag.tag];
        if (v && typeof tag.props[v] === "string") {
          tag.props[v] = processTemplateParams(tag.props[v], params, sep);
        } else if (tag.processTemplateParams || tag.tag === "titleTemplate" || tag.tag === "title") {
          for (const p2 of contentAttrs) {
            if (typeof tag[p2] === "string")
              tag[p2] = processTemplateParams(tag[p2], params, sep, tag.tag === "script" && tag.props.type.endsWith("json"));
          }
        }
      }
      head._templateParams = params;
      head._separator = sep;
    },
    "tags:afterResolve": ({ tags }) => {
      let title;
      for (let i = 0;i < tags.length; i += 1) {
        const tag = tags[i];
        if (tag.tag === "title" && tag.processTemplateParams !== false) {
          title = tag;
        }
      }
      if (title?.textContent) {
        title.textContent = processTemplateParams(title.textContent, head._templateParams, head._separator);
      }
    }
  }
}));
var TitleTemplatePlugin = defineHeadPlugin({
  hooks: {
    "tags:resolve": (ctx) => {
      const { tags } = ctx;
      let titleTag;
      let titleTemplateTag;
      for (let i = 0;i < tags.length; i += 1) {
        const tag = tags[i];
        if (tag.tag === "title") {
          titleTag = tag;
        } else if (tag.tag === "titleTemplate") {
          titleTemplateTag = tag;
        }
      }
      if (titleTemplateTag && titleTag) {
        const newTitle = resolveTitleTemplate(titleTemplateTag.textContent, titleTag.textContent);
        if (newTitle !== null) {
          titleTag.textContent = newTitle || titleTag.textContent;
        } else {
          ctx.tags.splice(ctx.tags.indexOf(titleTag), 1);
        }
      } else if (titleTemplateTag) {
        const newTitle = resolveTitleTemplate(titleTemplateTag.textContent);
        if (newTitle !== null) {
          titleTemplateTag.textContent = newTitle;
          titleTemplateTag.tag = "title";
          titleTemplateTag = undefined;
        }
      }
      if (titleTemplateTag) {
        ctx.tags.splice(ctx.tags.indexOf(titleTemplateTag), 1);
      }
    }
  }
});
var XSSPlugin = defineHeadPlugin({
  hooks: {
    "tags:afterResolve": (ctx) => {
      for (const tag of ctx.tags) {
        if (typeof tag.innerHTML === "string") {
          if (tag.innerHTML && (tag.props.type === "application/ld+json" || tag.props.type === "application/json")) {
            tag.innerHTML = tag.innerHTML.replace(/</g, "\\u003C");
          } else {
            tag.innerHTML = tag.innerHTML.replace(new RegExp(`</${tag.tag}`, "g"), `<\\/${tag.tag}`);
          }
        }
      }
    }
  }
});
var activeHead;
function createHead(options = {}) {
  const head = createHeadCore(options);
  head.use(DomPlugin());
  return activeHead = head;
}
function filterMode(mode, ssr) {
  return !mode || mode === "server" && ssr || mode === "client" && !ssr;
}
function createHeadCore(options = {}) {
  const hooks = createHooks();
  hooks.addHooks(options.hooks || {});
  options.document = options.document || (IsBrowser ? document : undefined);
  const ssr = !options.document;
  const updated = () => {
    head.dirty = true;
    hooks.callHook("entries:updated", head);
  };
  let entryCount = 0;
  let entries = [];
  const plugins = [];
  const head = {
    plugins,
    dirty: false,
    resolvedOptions: options,
    hooks,
    headEntries() {
      return entries;
    },
    use(p2) {
      const plugin = typeof p2 === "function" ? p2(head) : p2;
      if (!plugin.key || !plugins.some((p22) => p22.key === plugin.key)) {
        plugins.push(plugin);
        filterMode(plugin.mode, ssr) && hooks.addHooks(plugin.hooks || {});
      }
    },
    push(input, entryOptions) {
      delete entryOptions?.head;
      const entry = {
        _i: entryCount++,
        input,
        ...entryOptions
      };
      if (filterMode(entry.mode, ssr)) {
        entries.push(entry);
        updated();
      }
      return {
        dispose() {
          entries = entries.filter((e) => e._i !== entry._i);
          updated();
        },
        patch(input2) {
          for (const e of entries) {
            if (e._i === entry._i) {
              e.input = entry.input = input2;
            }
          }
          updated();
        }
      };
    },
    async resolveTags() {
      const resolveCtx = { tags: [], entries: [...entries] };
      await hooks.callHook("entries:resolve", resolveCtx);
      for (const entry of resolveCtx.entries) {
        const resolved = entry.resolvedInput || entry.input;
        entry.resolvedInput = await (entry.transform ? entry.transform(resolved) : resolved);
        if (entry.resolvedInput) {
          for (const tag of await normaliseEntryTags(entry)) {
            const tagCtx = { tag, entry, resolvedOptions: head.resolvedOptions };
            await hooks.callHook("tag:normalise", tagCtx);
            resolveCtx.tags.push(tagCtx.tag);
          }
        }
      }
      await hooks.callHook("tags:beforeResolve", resolveCtx);
      await hooks.callHook("tags:resolve", resolveCtx);
      await hooks.callHook("tags:afterResolve", resolveCtx);
      return resolveCtx.tags;
    },
    ssr
  };
  [
    DedupePlugin,
    PayloadPlugin,
    EventHandlersPlugin,
    HashKeyedPlugin,
    SortPlugin,
    TemplateParamsPlugin,
    TitleTemplatePlugin,
    XSSPlugin,
    ...options?.plugins || []
  ].forEach((p2) => head.use(p2));
  head.hooks.callHook("init", head);
  return head;
}
function getActiveHead() {
  return activeHead;
}
var ScriptProxyTarget = Symbol("ScriptProxyTarget");
function scriptProxy() {}
scriptProxy[ScriptProxyTarget] = true;

// ../../../../node_modules/@vueuse/head/node_modules/@unhead/vue/dist/shared/vue.ziyDaVMR.mjs
var Vue3 = version[0] === "3";
function resolveUnref2(r2) {
  return typeof r2 === "function" ? r2() : unref(r2);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root = resolveUnref2(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r2) => resolveUnrefHeadInput(r2));
  if (typeof root === "object") {
    const resolved = {};
    for (const k2 in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k2)) {
        continue;
      }
      if (k2 === "titleTemplate" || k2[0] === "o" && k2[1] === "n") {
        resolved[k2] = unref(root[k2]);
        continue;
      }
      resolved[k2] = resolveUnrefHeadInput(root[k2]);
    }
    return resolved;
  }
  return root;
}
var VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});
var headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createHead2(options = {}) {
  options.domDelayFn = options.domDelayFn || ((fn) => nextTick(() => setTimeout(() => fn(), 0)));
  const head = createHead(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}
var _global2 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey2 = "__unhead_injection_handler__";
function injectHead() {
  if (globalKey2 in _global2) {
    return _global2[globalKey2]();
  }
  const head = inject(headSymbol);
  if (!head && true)
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
// ../../../../node_modules/@vueuse/head/node_modules/@unhead/vue/dist/shared/vue.-sixQ7xP.mjs
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry = head.push(resolvedInput.value, options);
  watch2(resolvedInput, (e) => {
    entry.patch(e);
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}

// ../../../../node_modules/@vueuse/head/node_modules/@unhead/vue/dist/index.mjs
var coreComposableNames = [
  "injectHead"
];
var unheadVueComposablesImports = {
  "@unhead/vue": [...coreComposableNames, ...composableNames]
};
var Vue2ProvideUnheadPlugin = (_Vue, head) => {
  _Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      const origProvide = options.provide;
      options.provide = function() {
        let origProvideResult;
        if (typeof origProvide === "function")
          origProvideResult = origProvide.call(this);
        else
          origProvideResult = origProvide || {};
        return {
          ...origProvideResult,
          [headSymbol]: head
        };
      };
    }
  });
};

// ../../../../node_modules/@vueuse/head/node_modules/@unhead/vue/dist/polyfill.mjs
function polyfillAsVueUseHead(head) {
  const polyfilled = head;
  polyfilled.headTags = head.resolveTags;
  polyfilled.addEntry = head.push;
  polyfilled.addHeadObjs = head.push;
  polyfilled.addReactiveEntry = (input, options) => {
    const api = useHead(input, options);
    if (api !== undefined)
      return api.dispose;
    return () => {};
  };
  polyfilled.removeHeadObjs = () => {};
  polyfilled.updateDOM = () => {
    head.hooks.callHook("entries:updated", head);
  };
  polyfilled.unhead = head;
  return polyfilled;
}

// ../../../../node_modules/@unhead/ssr/dist/index.mjs
function encodeAttribute(value) {
  return String(value).replace(/"/g, "&quot;");
}
function propsToString(props) {
  let attrs = "";
  for (const key in props) {
    if (!Object.prototype.hasOwnProperty.call(props, key)) {
      continue;
    }
    const value = props[key];
    if (value !== false && value !== null) {
      attrs += value === true ? ` ${key}` : ` ${key}="${encodeAttribute(value)}"`;
    }
  }
  return attrs;
}
function ssrRenderTags(tags, options) {
  const schema = { htmlAttrs: {}, bodyAttrs: {}, tags: { head: "", bodyClose: "", bodyOpen: "" } };
  const lineBreaks = !options?.omitLineBreaks ? `
` : "";
  for (const tag of tags) {
    if (Object.keys(tag.props).length === 0 && !tag.innerHTML && !tag.textContent) {
      continue;
    }
    if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs") {
      Object.assign(schema[tag.tag], tag.props);
      continue;
    }
    const s = tagToString(tag);
    const tagPosition = tag.tagPosition || "head";
    schema.tags[tagPosition] += schema.tags[tagPosition] ? `${lineBreaks}${s}` : s;
  }
  return {
    headTags: schema.tags.head,
    bodyTags: schema.tags.bodyClose,
    bodyTagsOpen: schema.tags.bodyOpen,
    htmlAttrs: propsToString(schema.htmlAttrs),
    bodyAttrs: propsToString(schema.bodyAttrs)
  };
}
function escapeHtml(str) {
  return str.replace(/[&<>"'/]/g, (char2) => {
    switch (char2) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#x27;";
      case "/":
        return "&#x2F;";
      default:
        return char2;
    }
  });
}
function tagToString(tag) {
  const attrs = propsToString(tag.props);
  const openTag = `<${tag.tag}${attrs}>`;
  if (!TagsWithInnerContent.has(tag.tag))
    return SelfClosingTags.has(tag.tag) ? openTag : `${openTag}</${tag.tag}>`;
  let content = String(tag.innerHTML || "");
  if (tag.textContent)
    content = escapeHtml(String(tag.textContent));
  return SelfClosingTags.has(tag.tag) ? openTag : `${openTag}${content}</${tag.tag}>`;
}
async function renderSSRHead(head, options) {
  const beforeRenderCtx = { shouldRender: true };
  await head.hooks.callHook("ssr:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender) {
    return {
      headTags: "",
      bodyTags: "",
      bodyTagsOpen: "",
      htmlAttrs: "",
      bodyAttrs: ""
    };
  }
  const ctx = { tags: await head.resolveTags() };
  await head.hooks.callHook("ssr:render", ctx);
  const html = ssrRenderTags(ctx.tags, options);
  const renderCtx = { tags: ctx.tags, html };
  await head.hooks.callHook("ssr:rendered", renderCtx);
  return renderCtx.html;
}

// ../../../../node_modules/@vueuse/head/node_modules/@unhead/vue/dist/components.mjs
function addVNodeToHeadObj(node, obj) {
  const nodeType = !Vue3 ? node.tag : node.type;
  const type = nodeType === "html" ? "htmlAttrs" : nodeType === "body" ? "bodyAttrs" : nodeType;
  if (typeof type !== "string" || !(type in obj))
    return;
  const nodeData = !Vue3 ? node.data : node;
  const props = (!Vue3 ? nodeData.attrs : node.props) || {};
  if (!Vue3) {
    if (nodeData.staticClass)
      props.class = nodeData.staticClass;
    if (nodeData.staticStyle)
      props.style = Object.entries(nodeData.staticStyle).map(([key, value]) => `${key}:${value}`).join(";");
  }
  if (node.children) {
    const childrenAttr = !Vue3 ? "text" : "children";
    props.children = Array.isArray(node.children) ? node.children[0][childrenAttr] : node[childrenAttr];
  }
  if (Array.isArray(obj[type]))
    obj[type].push(props);
  else if (type === "title")
    obj.title = props.children;
  else
    obj[type] = props;
}
function vnodesToHeadObj(nodes) {
  const obj = {
    title: undefined,
    htmlAttrs: undefined,
    bodyAttrs: undefined,
    base: undefined,
    meta: [],
    link: [],
    style: [],
    script: [],
    noscript: []
  };
  for (const node of nodes) {
    if (typeof node.type === "symbol" && Array.isArray(node.children)) {
      for (const childNode of node.children)
        addVNodeToHeadObj(childNode, obj);
    } else {
      addVNodeToHeadObj(node, obj);
    }
  }
  return obj;
}
var Head = /* @__PURE__ */ defineComponent({
  name: "Head",
  setup(_, { slots }) {
    const head = injectHead();
    const obj = ref({});
    const entry = head.push(obj);
    onBeforeUnmount(() => {
      entry.dispose();
    });
    return () => {
      watchEffect(() => {
        if (!slots.default)
          return;
        entry.patch(vnodesToHeadObj(slots.default()));
      });
      return null;
    };
  }
});

// ../../../../node_modules/@vueuse/head/dist/index.mjs
function createHead3(initHeadObject, options) {
  const unhead = createHead2(options || {});
  const legacyHead = polyfillAsVueUseHead(unhead);
  if (initHeadObject)
    legacyHead.push(initHeadObject);
  return legacyHead;
}
var HeadVuePlugin = Vue2ProvideUnheadPlugin;
var renderHeadToString = (head) => renderSSRHead(head.unhead);
// ../../../../node_modules/pretty-bytes/index.js
var BYTE_UNITS = [
  "B",
  "kB",
  "MB",
  "GB",
  "TB",
  "PB",
  "EB",
  "ZB",
  "YB"
];
var BIBYTE_UNITS = [
  "B",
  "KiB",
  "MiB",
  "GiB",
  "TiB",
  "PiB",
  "EiB",
  "ZiB",
  "YiB"
];
var BIT_UNITS = [
  "b",
  "kbit",
  "Mbit",
  "Gbit",
  "Tbit",
  "Pbit",
  "Ebit",
  "Zbit",
  "Ybit"
];
var BIBIT_UNITS = [
  "b",
  "kibit",
  "Mibit",
  "Gibit",
  "Tibit",
  "Pibit",
  "Eibit",
  "Zibit",
  "Yibit"
];
var toLocaleString = (number, locale, options) => {
  let result = number;
  if (typeof locale === "string" || Array.isArray(locale)) {
    result = number.toLocaleString(locale, options);
  } else if (locale === true || options !== undefined) {
    result = number.toLocaleString(undefined, options);
  }
  return result;
};
var log10 = (numberOrBigInt) => {
  if (typeof numberOrBigInt === "number") {
    return Math.log10(numberOrBigInt);
  }
  const string2 = numberOrBigInt.toString(10);
  return string2.length + Math.log10("0." + string2.slice(0, 15));
};
var log = (numberOrBigInt) => {
  if (typeof numberOrBigInt === "number") {
    return Math.log(numberOrBigInt);
  }
  return log10(numberOrBigInt) * Math.log(10);
};
var divide = (numberOrBigInt, divisor) => {
  if (typeof numberOrBigInt === "number") {
    return numberOrBigInt / divisor;
  }
  const integerPart = numberOrBigInt / BigInt(divisor);
  const remainder = numberOrBigInt % BigInt(divisor);
  return Number(integerPart) + Number(remainder) / divisor;
};
function prettyBytes(number, options) {
  if (typeof number !== "bigint" && !Number.isFinite(number)) {
    throw new TypeError(`Expected a finite number, got ${typeof number}: ${number}`);
  }
  options = {
    bits: false,
    binary: false,
    space: true,
    ...options
  };
  const UNITS = options.bits ? options.binary ? BIBIT_UNITS : BIT_UNITS : options.binary ? BIBYTE_UNITS : BYTE_UNITS;
  const separator = options.space ? " " : "";
  if (options.signed && (typeof number === "number" ? number === 0 : number === 0n)) {
    return ` 0${separator}${UNITS[0]}`;
  }
  const isNegative = number < 0;
  const prefix = isNegative ? "-" : options.signed ? "+" : "";
  if (isNegative) {
    number = -number;
  }
  let localeOptions;
  if (options.minimumFractionDigits !== undefined) {
    localeOptions = { minimumFractionDigits: options.minimumFractionDigits };
  }
  if (options.maximumFractionDigits !== undefined) {
    localeOptions = { maximumFractionDigits: options.maximumFractionDigits, ...localeOptions };
  }
  if (number < 1) {
    const numberString2 = toLocaleString(number, options.locale, localeOptions);
    return prefix + numberString2 + separator + UNITS[0];
  }
  const exponent = Math.min(Math.floor(options.binary ? log(number) / Math.log(1024) : log10(number) / 3), UNITS.length - 1);
  number = divide(number, (options.binary ? 1024 : 1000) ** exponent);
  if (!localeOptions) {
    number = number.toPrecision(3);
  }
  const numberString = toLocaleString(Number(number), options.locale, localeOptions);
  const unit = UNITS[exponent];
  return prefix + numberString + separator + unit;
}
export {
  wordChar,
  wordBoundary,
  word,
  withIndices,
  whitespace,
  whenever,
  watchWithFilter,
  watchTriggerable,
  watchThrottled,
  watchPausable,
  watchOnce,
  watchImmediate,
  watchIgnorable,
  watchDeep,
  watchDebounced,
  watchAtMost,
  watchArray,
  waitWhile,
  waitUntil,
  wait,
  useWindowSize,
  useWindowScroll,
  useWindowFocus,
  useWebWorkerFn,
  useWebWorker,
  useWebSocket,
  useWebNotification,
  useWakeLock,
  useVirtualList,
  useVibrate,
  useVModels,
  useVModel,
  useUserMedia,
  useUrlSearchParams,
  useTrunc,
  useTransition,
  useToggle,
  useToString,
  useToNumber,
  useTitle,
  useTimestamp,
  useTimeoutPoll,
  useTimeoutFn,
  useTimeout,
  useTimeAgo,
  useThrottledRefHistory,
  useThrottleFn,
  refThrottled as useThrottle,
  useTextareaAutosize,
  useTextSelection,
  useTextDirection,
  useTemplateRefsList,
  useSwipe,
  useSupported,
  useSum,
  useStyleTag,
  useStorageAsync,
  useStorage,
  useStepper,
  useSpeechSynthesis,
  useSpeechRecognition,
  useSorted,
  useShare,
  useSessionStorage,
  useScrollLock,
  useScroll,
  useScriptTag,
  useScreenSafeArea,
  useScreenOrientation,
  useRound,
  useResizeObserver,
  useRefHistory,
  useRafFn,
  useProjection,
  usePrevious,
  usePreferredReducedMotion,
  usePreferredLanguages,
  usePreferredDark,
  usePreferredContrast,
  usePreferredColorScheme,
  usePrecision,
  usePointerSwipe,
  usePointerLock,
  usePointer,
  usePermission,
  usePerformanceObserver,
  useParentElement,
  useParallax,
  usePageLeave,
  useOnline,
  useOffsetPagination,
  useObjectUrl,
  useNow,
  useNetwork,
  useNavigatorLanguage,
  useMutationObserver,
  useMousePressed,
  useMouseInElement,
  useMouse,
  useMounted,
  useMin,
  useMemory,
  useMemoize,
  useMediaQuery,
  useMediaControls,
  useMax,
  useMath,
  useManualRefHistory,
  useMagicKeys,
  useLocalStorage,
  useLastChanged,
  useKeyModifier,
  useIntervalFn,
  useInterval,
  useIntersectionObserver,
  useInfiniteScroll,
  useImage,
  useIdle,
  useGeolocation,
  useGamepad,
  useFullscreen,
  useFps,
  useFocusWithin,
  useFocus,
  useFloor,
  useFileSystemAccess,
  useFileDialog,
  useFetch,
  useFavicon,
  useEyeDropper,
  useEventSource,
  useEventListener,
  useEventBus,
  useElementVisibility,
  useElementSize,
  useElementHover,
  useElementByPoint,
  useElementBounding,
  useDropZone,
  useDraggable,
  useDocumentVisibility,
  useDisplayMedia,
  useDevicesList,
  useDevicePixelRatio,
  useDeviceOrientation,
  useDeviceMotion,
  useDebouncedRefHistory,
  useDebounceFn,
  refDebounced as useDebounce,
  useDateFormat,
  useDark,
  useCycleList,
  useCurrentElement,
  useCssVar,
  useCounter,
  useConfirmDialog,
  useColorMode,
  useCloned,
  useClipboardItems,
  useClipboard,
  useClamp2 as useClamp,
  useCeil,
  useCached,
  useBrowserLocation,
  useBroadcastChannel,
  useBreakpoints,
  useBluetooth,
  useBattery,
  useBase64,
  useAverage,
  useAuth,
  useAsyncState,
  useAsyncQueue,
  useArrayUnique,
  useArraySome,
  useArrayReduce,
  useArrayMap,
  useArrayIncludes,
  useArrayFindIndex,
  useArrayFind,
  useArrayFilter,
  useArrayEvery,
  useArrayDifference,
  useAnimate,
  useActiveElement,
  useAbs,
  until,
  unrefElement,
  unicode,
  tryOnUnmounted,
  tryOnScopeDispose,
  tryOnMounted,
  tryOnBeforeUnmount,
  tryOnBeforeMount,
  toString2 as toString,
  toReactive2 as toReactive,
  watchThrottled as throttledWatch,
  refThrottled as throttledRef,
  throttle,
  templateRef,
  tab,
  syncRefs,
  syncRef,
  sticky,
  sleep,
  setSSRHandler,
  saas,
  retry,
  resolveUnref,
  resolveRef,
  renderHeadToString,
  refWithControl,
  refThrottled,
  refDefault,
  refDebounced,
  refAutoReset,
  prettyBytes as readableSize,
  reactivePick,
  reactiveOmit,
  reactiveComputed,
  reactifyObject,
  reactify,
  randomNonSecure,
  random2 as random,
  rand,
  publishableKey,
  provideLocal,
  watchPausable as pausableWatch,
  parse,
  logicOr as or,
  oneOrMore,
  onStartTyping,
  onLongPress,
  onKeyUp,
  onKeyStroke,
  onKeyPressed,
  onKeyDown,
  onClickOutside,
  now,
  notUndefined,
  notNullish2 as notNullish,
  not,
  noNull,
  multiline,
  maybe,
  mapGamepadToXbox360Controller,
  makeDestructurable,
  loop,
  logicOr,
  logicNot,
  loadPaymentElement,
  loadCardElement,
  linefeed,
  letter,
  lazy,
  isTruthy,
  isDefined,
  injectLocal,
  watchIgnorable as ignorableWatch,
  global2 as global,
  getSSRHandler,
  formatTimeAgo,
  format,
  extendRef,
  executeTransition,
  exactly,
  computedEager as eagerComputed,
  dotAll,
  digit,
  delay,
  defaultWindow,
  defaultNavigator,
  defaultLocation,
  defaultDocument,
  watchDebounced as debouncedWatch,
  refDebounced as debouncedRef,
  debounce,
  dateFormat,
  customStorageEventName,
  customRandom,
  customAlphabet,
  createUnrefFn,
  createTemplatePromise,
  createSingletonPromise2 as createSingletonPromise,
  createSharedComposable,
  createReusableTemplate,
  createRegExp,
  reactify as createReactiveFn,
  createPromiseLock,
  createProjection,
  createPaymentMethod,
  createInjectionState,
  createHead3 as createHead,
  createGlobalState,
  createGenericProjection,
  createFetch,
  createEventHook,
  createControlledPromise,
  controlledRef,
  computedWithControl as controlledComputed,
  confirmPayment,
  confirmCardSetup,
  confirmCardPayment,
  computedWithControl,
  computedInject,
  computedEager,
  computedAsync,
  cloneFnJSON,
  clamp2 as clamp,
  charNotIn,
  charIn,
  char,
  caseInsensitive,
  carriageReturn,
  calculateDelay,
  breakpointsVuetify,
  breakpointsTailwind,
  breakpointsSematic,
  breakpointsQuasar,
  breakpointsMasterCss,
  breakpointsBootstrapV5,
  breakpointsAntDesign,
  refAutoReset as autoResetRef,
  authGuard,
  computedAsync as asyncComputed,
  anyOf,
  logicAnd as and,
  HeadVuePlugin,
  Head,
  Fetch
};
