import {
  require_HTMLBaseElement_impl,
  require_HTMLElement,
  require_custom_elements,
  require_html_constructor,
  require_lib,
  require_utils
} from "./chunk-wjwrtbq7.js";
import {
  __commonJS
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/jsdom/lib/jsdom/living/generated/HTMLBaseElement.js
var require_HTMLBaseElement = __commonJS((exports) => {
  var conversions = require_lib();
  var utils = require_utils();
  var HTMLConstructor_helpers_html_constructor = require_html_constructor().HTMLConstructor;
  var ceReactionsPreSteps_helpers_custom_elements = require_custom_elements().ceReactionsPreSteps;
  var ceReactionsPostSteps_helpers_custom_elements = require_custom_elements().ceReactionsPostSteps;
  var implSymbol = utils.implSymbol;
  var ctorRegistrySymbol = utils.ctorRegistrySymbol;
  var HTMLElement = require_HTMLElement();
  var interfaceName = "HTMLBaseElement";
  exports.is = (value) => {
    return utils.isObject(value) && utils.hasOwn(value, implSymbol) && value[implSymbol] instanceof Impl.implementation;
  };
  exports.isImpl = (value) => {
    return utils.isObject(value) && value instanceof Impl.implementation;
  };
  exports.convert = (globalObject, value, { context = "The provided value" } = {}) => {
    if (exports.is(value)) {
      return utils.implForWrapper(value);
    }
    throw new globalObject.TypeError(`${context} is not of type 'HTMLBaseElement'.`);
  };
  function makeWrapper(globalObject, newTarget) {
    let proto;
    if (newTarget !== undefined) {
      proto = newTarget.prototype;
    }
    if (!utils.isObject(proto)) {
      proto = globalObject[ctorRegistrySymbol]["HTMLBaseElement"].prototype;
    }
    return Object.create(proto);
  }
  exports.create = (globalObject, constructorArgs, privateData) => {
    const wrapper = makeWrapper(globalObject);
    return exports.setup(wrapper, globalObject, constructorArgs, privateData);
  };
  exports.createImpl = (globalObject, constructorArgs, privateData) => {
    const wrapper = exports.create(globalObject, constructorArgs, privateData);
    return utils.implForWrapper(wrapper);
  };
  exports._internalSetup = (wrapper, globalObject) => {
    HTMLElement._internalSetup(wrapper, globalObject);
  };
  exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
    privateData.wrapper = wrapper;
    exports._internalSetup(wrapper, globalObject);
    Object.defineProperty(wrapper, implSymbol, {
      value: new Impl.implementation(globalObject, constructorArgs, privateData),
      configurable: true
    });
    wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
    if (Impl.init) {
      Impl.init(wrapper[implSymbol]);
    }
    return wrapper;
  };
  exports.new = (globalObject, newTarget) => {
    const wrapper = makeWrapper(globalObject, newTarget);
    exports._internalSetup(wrapper, globalObject);
    Object.defineProperty(wrapper, implSymbol, {
      value: Object.create(Impl.implementation.prototype),
      configurable: true
    });
    wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
    if (Impl.init) {
      Impl.init(wrapper[implSymbol]);
    }
    return wrapper[implSymbol];
  };
  var exposed = new Set(["Window"]);
  exports.install = (globalObject, globalNames) => {
    if (!globalNames.some((globalName) => exposed.has(globalName))) {
      return;
    }
    const ctorRegistry = utils.initCtorRegistry(globalObject);

    class HTMLBaseElement extends globalObject.HTMLElement {
      constructor() {
        return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
      }
      get href() {
        const esValue = this !== null && this !== undefined ? this : globalObject;
        if (!exports.is(esValue)) {
          throw new globalObject.TypeError("'get href' called on an object that is not a valid instance of HTMLBaseElement.");
        }
        ceReactionsPreSteps_helpers_custom_elements(globalObject);
        try {
          return esValue[implSymbol]["href"];
        } finally {
          ceReactionsPostSteps_helpers_custom_elements(globalObject);
        }
      }
      set href(V) {
        const esValue = this !== null && this !== undefined ? this : globalObject;
        if (!exports.is(esValue)) {
          throw new globalObject.TypeError("'set href' called on an object that is not a valid instance of HTMLBaseElement.");
        }
        V = conversions["USVString"](V, {
          context: "Failed to set the 'href' property on 'HTMLBaseElement': The provided value",
          globals: globalObject
        });
        ceReactionsPreSteps_helpers_custom_elements(globalObject);
        try {
          esValue[implSymbol]["href"] = V;
        } finally {
          ceReactionsPostSteps_helpers_custom_elements(globalObject);
        }
      }
      get target() {
        const esValue = this !== null && this !== undefined ? this : globalObject;
        if (!exports.is(esValue)) {
          throw new globalObject.TypeError("'get target' called on an object that is not a valid instance of HTMLBaseElement.");
        }
        ceReactionsPreSteps_helpers_custom_elements(globalObject);
        try {
          const value = esValue[implSymbol]._reflectGetTheContentAttribute("target");
          return value === null ? "" : value;
        } finally {
          ceReactionsPostSteps_helpers_custom_elements(globalObject);
        }
      }
      set target(V) {
        const esValue = this !== null && this !== undefined ? this : globalObject;
        if (!exports.is(esValue)) {
          throw new globalObject.TypeError("'set target' called on an object that is not a valid instance of HTMLBaseElement.");
        }
        V = conversions["DOMString"](V, {
          context: "Failed to set the 'target' property on 'HTMLBaseElement': The provided value",
          globals: globalObject
        });
        ceReactionsPreSteps_helpers_custom_elements(globalObject);
        try {
          esValue[implSymbol]._reflectSetTheContentAttribute("target", V);
        } finally {
          ceReactionsPostSteps_helpers_custom_elements(globalObject);
        }
      }
    }
    Object.defineProperties(HTMLBaseElement.prototype, {
      href: { enumerable: true },
      target: { enumerable: true },
      [Symbol.toStringTag]: { value: "HTMLBaseElement", configurable: true }
    });
    ctorRegistry[interfaceName] = HTMLBaseElement;
    Object.defineProperty(globalObject, interfaceName, {
      configurable: true,
      writable: true,
      value: HTMLBaseElement
    });
  };
  var Impl = require_HTMLBaseElement_impl();
});

export { require_HTMLBaseElement };
