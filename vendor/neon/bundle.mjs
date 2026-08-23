var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// vendor/neon/tslib_2.8.1_es2022_tslib.mjs
var tslib_2_8_1_es2022_tslib_exports = {};
__export(tslib_2_8_1_es2022_tslib_exports, {
  __addDisposableResource: () => X,
  __assign: () => v,
  __asyncDelegator: () => q,
  __asyncGenerator: () => $,
  __asyncValues: () => B,
  __await: () => _,
  __awaiter: () => F,
  __classPrivateFieldGet: () => Q,
  __classPrivateFieldIn: () => W,
  __classPrivateFieldSet: () => U,
  __createBinding: () => j,
  __decorate: () => E,
  __disposeResources: () => Z,
  __esDecorate: () => D,
  __exportStar: () => G,
  __extends: () => P,
  __generator: () => M,
  __importDefault: () => J,
  __importStar: () => H,
  __makeTemplateObject: () => L,
  __metadata: () => C,
  __param: () => T,
  __propKey: () => A,
  __read: () => x,
  __rest: () => S,
  __rewriteRelativeImportExtension: () => k,
  __runInitializers: () => R,
  __setFunctionName: () => I,
  __spread: () => K,
  __spreadArray: () => V,
  __spreadArrays: () => N,
  __values: () => g,
  default: () => ee
});
var m = function(e8, t10) {
  return m = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r21, n18) {
    r21.__proto__ = n18;
  } || function(r21, n18) {
    for (var i20 in n18) Object.prototype.hasOwnProperty.call(n18, i20) && (r21[i20] = n18[i20]);
  }, m(e8, t10);
};
function P(e8, t10) {
  if (typeof t10 != "function" && t10 !== null) throw new TypeError("Class extends value " + String(t10) + " is not a constructor or null");
  m(e8, t10);
  function r21() {
    this.constructor = e8;
  }
  e8.prototype = t10 === null ? Object.create(t10) : (r21.prototype = t10.prototype, new r21());
}
var v = function() {
  return v = Object.assign || function(t10) {
    for (var r21, n18 = 1, i20 = arguments.length; n18 < i20; n18++) {
      r21 = arguments[n18];
      for (var o21 in r21) Object.prototype.hasOwnProperty.call(r21, o21) && (t10[o21] = r21[o21]);
    }
    return t10;
  }, v.apply(this, arguments);
};
function S(e8, t10) {
  var r21 = {};
  for (var n18 in e8) Object.prototype.hasOwnProperty.call(e8, n18) && t10.indexOf(n18) < 0 && (r21[n18] = e8[n18]);
  if (e8 != null && typeof Object.getOwnPropertySymbols == "function") for (var i20 = 0, n18 = Object.getOwnPropertySymbols(e8); i20 < n18.length; i20++) t10.indexOf(n18[i20]) < 0 && Object.prototype.propertyIsEnumerable.call(e8, n18[i20]) && (r21[n18[i20]] = e8[n18[i20]]);
  return r21;
}
function E(e8, t10, r21, n18) {
  var i20 = arguments.length, o21 = i20 < 3 ? t10 : n18 === null ? n18 = Object.getOwnPropertyDescriptor(t10, r21) : n18, a16;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o21 = Reflect.decorate(e8, t10, r21, n18);
  else for (var f17 = e8.length - 1; f17 >= 0; f17--) (a16 = e8[f17]) && (o21 = (i20 < 3 ? a16(o21) : i20 > 3 ? a16(t10, r21, o21) : a16(t10, r21)) || o21);
  return i20 > 3 && o21 && Object.defineProperty(t10, r21, o21), o21;
}
function T(e8, t10) {
  return function(r21, n18) {
    t10(r21, n18, e8);
  };
}
function D(e8, t10, r21, n18, i20, o21) {
  function a16(b12) {
    if (b12 !== void 0 && typeof b12 != "function") throw new TypeError("Function expected");
    return b12;
  }
  for (var f17 = n18.kind, p21 = f17 === "getter" ? "get" : f17 === "setter" ? "set" : "value", c19 = !t10 && e8 ? n18.static ? e8 : e8.prototype : null, s20 = t10 || (c19 ? Object.getOwnPropertyDescriptor(c19, n18.name) : {}), l19, w25 = false, u18 = r21.length - 1; u18 >= 0; u18--) {
    var y15 = {};
    for (var h17 in n18) y15[h17] = h17 === "access" ? {} : n18[h17];
    for (var h17 in n18.access) y15.access[h17] = n18.access[h17];
    y15.addInitializer = function(b12) {
      if (w25) throw new TypeError("Cannot add initializers after decoration has completed");
      o21.push(a16(b12 || null));
    };
    var d13 = (0, r21[u18])(f17 === "accessor" ? { get: s20.get, set: s20.set } : s20[p21], y15);
    if (f17 === "accessor") {
      if (d13 === void 0) continue;
      if (d13 === null || typeof d13 != "object") throw new TypeError("Object expected");
      (l19 = a16(d13.get)) && (s20.get = l19), (l19 = a16(d13.set)) && (s20.set = l19), (l19 = a16(d13.init)) && i20.unshift(l19);
    } else (l19 = a16(d13)) && (f17 === "field" ? i20.unshift(l19) : s20[p21] = l19);
  }
  c19 && Object.defineProperty(c19, n18.name, s20), w25 = true;
}
function R(e8, t10, r21) {
  for (var n18 = arguments.length > 2, i20 = 0; i20 < t10.length; i20++) r21 = n18 ? t10[i20].call(e8, r21) : t10[i20].call(e8);
  return n18 ? r21 : void 0;
}
function A(e8) {
  return typeof e8 == "symbol" ? e8 : "".concat(e8);
}
function I(e8, t10, r21) {
  return typeof t10 == "symbol" && (t10 = t10.description ? "[".concat(t10.description, "]") : ""), Object.defineProperty(e8, "name", { configurable: true, value: r21 ? "".concat(r21, " ", t10) : t10 });
}
function C(e8, t10) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(e8, t10);
}
function F(e8, t10, r21, n18) {
  function i20(o21) {
    return o21 instanceof r21 ? o21 : new r21(function(a16) {
      a16(o21);
    });
  }
  return new (r21 || (r21 = Promise))(function(o21, a16) {
    function f17(s20) {
      try {
        c19(n18.next(s20));
      } catch (l19) {
        a16(l19);
      }
    }
    function p21(s20) {
      try {
        c19(n18.throw(s20));
      } catch (l19) {
        a16(l19);
      }
    }
    function c19(s20) {
      s20.done ? o21(s20.value) : i20(s20.value).then(f17, p21);
    }
    c19((n18 = n18.apply(e8, t10 || [])).next());
  });
}
function M(e8, t10) {
  var r21 = { label: 0, sent: function() {
    if (o21[0] & 1) throw o21[1];
    return o21[1];
  }, trys: [], ops: [] }, n18, i20, o21, a16 = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return a16.next = f17(0), a16.throw = f17(1), a16.return = f17(2), typeof Symbol == "function" && (a16[Symbol.iterator] = function() {
    return this;
  }), a16;
  function f17(c19) {
    return function(s20) {
      return p21([c19, s20]);
    };
  }
  function p21(c19) {
    if (n18) throw new TypeError("Generator is already executing.");
    for (; a16 && (a16 = 0, c19[0] && (r21 = 0)), r21; ) try {
      if (n18 = 1, i20 && (o21 = c19[0] & 2 ? i20.return : c19[0] ? i20.throw || ((o21 = i20.return) && o21.call(i20), 0) : i20.next) && !(o21 = o21.call(i20, c19[1])).done) return o21;
      switch (i20 = 0, o21 && (c19 = [c19[0] & 2, o21.value]), c19[0]) {
        case 0:
        case 1:
          o21 = c19;
          break;
        case 4:
          return r21.label++, { value: c19[1], done: false };
        case 5:
          r21.label++, i20 = c19[1], c19 = [0];
          continue;
        case 7:
          c19 = r21.ops.pop(), r21.trys.pop();
          continue;
        default:
          if (o21 = r21.trys, !(o21 = o21.length > 0 && o21[o21.length - 1]) && (c19[0] === 6 || c19[0] === 2)) {
            r21 = 0;
            continue;
          }
          if (c19[0] === 3 && (!o21 || c19[1] > o21[0] && c19[1] < o21[3])) {
            r21.label = c19[1];
            break;
          }
          if (c19[0] === 6 && r21.label < o21[1]) {
            r21.label = o21[1], o21 = c19;
            break;
          }
          if (o21 && r21.label < o21[2]) {
            r21.label = o21[2], r21.ops.push(c19);
            break;
          }
          o21[2] && r21.ops.pop(), r21.trys.pop();
          continue;
      }
      c19 = t10.call(e8, r21);
    } catch (s20) {
      c19 = [6, s20], i20 = 0;
    } finally {
      n18 = o21 = 0;
    }
    if (c19[0] & 5) throw c19[1];
    return { value: c19[0] ? c19[1] : void 0, done: true };
  }
}
var j = Object.create ? (function(e8, t10, r21, n18) {
  n18 === void 0 && (n18 = r21);
  var i20 = Object.getOwnPropertyDescriptor(t10, r21);
  (!i20 || ("get" in i20 ? !t10.__esModule : i20.writable || i20.configurable)) && (i20 = { enumerable: true, get: function() {
    return t10[r21];
  } }), Object.defineProperty(e8, n18, i20);
}) : (function(e8, t10, r21, n18) {
  n18 === void 0 && (n18 = r21), e8[n18] = t10[r21];
});
function G(e8, t10) {
  for (var r21 in e8) r21 !== "default" && !Object.prototype.hasOwnProperty.call(t10, r21) && j(t10, e8, r21);
}
function g(e8) {
  var t10 = typeof Symbol == "function" && Symbol.iterator, r21 = t10 && e8[t10], n18 = 0;
  if (r21) return r21.call(e8);
  if (e8 && typeof e8.length == "number") return { next: function() {
    return e8 && n18 >= e8.length && (e8 = void 0), { value: e8 && e8[n18++], done: !e8 };
  } };
  throw new TypeError(t10 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function x(e8, t10) {
  var r21 = typeof Symbol == "function" && e8[Symbol.iterator];
  if (!r21) return e8;
  var n18 = r21.call(e8), i20, o21 = [], a16;
  try {
    for (; (t10 === void 0 || t10-- > 0) && !(i20 = n18.next()).done; ) o21.push(i20.value);
  } catch (f17) {
    a16 = { error: f17 };
  } finally {
    try {
      i20 && !i20.done && (r21 = n18.return) && r21.call(n18);
    } finally {
      if (a16) throw a16.error;
    }
  }
  return o21;
}
function K() {
  for (var e8 = [], t10 = 0; t10 < arguments.length; t10++) e8 = e8.concat(x(arguments[t10]));
  return e8;
}
function N() {
  for (var e8 = 0, t10 = 0, r21 = arguments.length; t10 < r21; t10++) e8 += arguments[t10].length;
  for (var n18 = Array(e8), i20 = 0, t10 = 0; t10 < r21; t10++) for (var o21 = arguments[t10], a16 = 0, f17 = o21.length; a16 < f17; a16++, i20++) n18[i20] = o21[a16];
  return n18;
}
function V(e8, t10, r21) {
  if (r21 || arguments.length === 2) for (var n18 = 0, i20 = t10.length, o21; n18 < i20; n18++) (o21 || !(n18 in t10)) && (o21 || (o21 = Array.prototype.slice.call(t10, 0, n18)), o21[n18] = t10[n18]);
  return e8.concat(o21 || Array.prototype.slice.call(t10));
}
function _(e8) {
  return this instanceof _ ? (this.v = e8, this) : new _(e8);
}
function $(e8, t10, r21) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n18 = r21.apply(e8, t10 || []), i20, o21 = [];
  return i20 = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), f17("next"), f17("throw"), f17("return", a16), i20[Symbol.asyncIterator] = function() {
    return this;
  }, i20;
  function a16(u18) {
    return function(y15) {
      return Promise.resolve(y15).then(u18, l19);
    };
  }
  function f17(u18, y15) {
    n18[u18] && (i20[u18] = function(h17) {
      return new Promise(function(d13, b12) {
        o21.push([u18, h17, d13, b12]) > 1 || p21(u18, h17);
      });
    }, y15 && (i20[u18] = y15(i20[u18])));
  }
  function p21(u18, y15) {
    try {
      c19(n18[u18](y15));
    } catch (h17) {
      w25(o21[0][3], h17);
    }
  }
  function c19(u18) {
    u18.value instanceof _ ? Promise.resolve(u18.value.v).then(s20, l19) : w25(o21[0][2], u18);
  }
  function s20(u18) {
    p21("next", u18);
  }
  function l19(u18) {
    p21("throw", u18);
  }
  function w25(u18, y15) {
    u18(y15), o21.shift(), o21.length && p21(o21[0][0], o21[0][1]);
  }
}
function q(e8) {
  var t10, r21;
  return t10 = {}, n18("next"), n18("throw", function(i20) {
    throw i20;
  }), n18("return"), t10[Symbol.iterator] = function() {
    return this;
  }, t10;
  function n18(i20, o21) {
    t10[i20] = e8[i20] ? function(a16) {
      return (r21 = !r21) ? { value: _(e8[i20](a16)), done: false } : o21 ? o21(a16) : a16;
    } : o21;
  }
}
function B(e8) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t10 = e8[Symbol.asyncIterator], r21;
  return t10 ? t10.call(e8) : (e8 = typeof g == "function" ? g(e8) : e8[Symbol.iterator](), r21 = {}, n18("next"), n18("throw"), n18("return"), r21[Symbol.asyncIterator] = function() {
    return this;
  }, r21);
  function n18(o21) {
    r21[o21] = e8[o21] && function(a16) {
      return new Promise(function(f17, p21) {
        a16 = e8[o21](a16), i20(f17, p21, a16.done, a16.value);
      });
    };
  }
  function i20(o21, a16, f17, p21) {
    Promise.resolve(p21).then(function(c19) {
      o21({ value: c19, done: f17 });
    }, a16);
  }
}
function L(e8, t10) {
  return Object.defineProperty ? Object.defineProperty(e8, "raw", { value: t10 }) : e8.raw = t10, e8;
}
var z = Object.create ? (function(e8, t10) {
  Object.defineProperty(e8, "default", { enumerable: true, value: t10 });
}) : function(e8, t10) {
  e8.default = t10;
};
var O = function(e8) {
  return O = Object.getOwnPropertyNames || function(t10) {
    var r21 = [];
    for (var n18 in t10) Object.prototype.hasOwnProperty.call(t10, n18) && (r21[r21.length] = n18);
    return r21;
  }, O(e8);
};
function H(e8) {
  if (e8 && e8.__esModule) return e8;
  var t10 = {};
  if (e8 != null) for (var r21 = O(e8), n18 = 0; n18 < r21.length; n18++) r21[n18] !== "default" && j(t10, e8, r21[n18]);
  return z(t10, e8), t10;
}
function J(e8) {
  return e8 && e8.__esModule ? e8 : { default: e8 };
}
function Q(e8, t10, r21, n18) {
  if (r21 === "a" && !n18) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t10 == "function" ? e8 !== t10 || !n18 : !t10.has(e8)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return r21 === "m" ? n18 : r21 === "a" ? n18.call(e8) : n18 ? n18.value : t10.get(e8);
}
function U(e8, t10, r21, n18, i20) {
  if (n18 === "m") throw new TypeError("Private method is not writable");
  if (n18 === "a" && !i20) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t10 == "function" ? e8 !== t10 || !i20 : !t10.has(e8)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n18 === "a" ? i20.call(e8, r21) : i20 ? i20.value = r21 : t10.set(e8, r21), r21;
}
function W(e8, t10) {
  if (t10 === null || typeof t10 != "object" && typeof t10 != "function") throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof e8 == "function" ? t10 === e8 : e8.has(t10);
}
function X(e8, t10, r21) {
  if (t10 != null) {
    if (typeof t10 != "object" && typeof t10 != "function") throw new TypeError("Object expected.");
    var n18, i20;
    if (r21) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      n18 = t10[Symbol.asyncDispose];
    }
    if (n18 === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      n18 = t10[Symbol.dispose], r21 && (i20 = n18);
    }
    if (typeof n18 != "function") throw new TypeError("Object not disposable.");
    i20 && (n18 = function() {
      try {
        i20.call(this);
      } catch (o21) {
        return Promise.reject(o21);
      }
    }), e8.stack.push({ value: t10, dispose: n18, async: r21 });
  } else r21 && e8.stack.push({ async: true });
  return t10;
}
var Y = typeof SuppressedError == "function" ? SuppressedError : function(e8, t10, r21) {
  var n18 = new Error(r21);
  return n18.name = "SuppressedError", n18.error = e8, n18.suppressed = t10, n18;
};
function Z(e8) {
  function t10(o21) {
    e8.error = e8.hasError ? new Y(o21, e8.error, "An error was suppressed during disposal.") : o21, e8.hasError = true;
  }
  var r21, n18 = 0;
  function i20() {
    for (; r21 = e8.stack.pop(); ) try {
      if (!r21.async && n18 === 1) return n18 = 0, e8.stack.push(r21), Promise.resolve().then(i20);
      if (r21.dispose) {
        var o21 = r21.dispose.call(r21.value);
        if (r21.async) return n18 |= 2, Promise.resolve(o21).then(i20, function(a16) {
          return t10(a16), i20();
        });
      } else n18 |= 1;
    } catch (a16) {
      t10(a16);
    }
    if (n18 === 1) return e8.hasError ? Promise.reject(e8.error) : Promise.resolve();
    if (e8.hasError) throw e8.error;
  }
  return i20();
}
function k(e8, t10) {
  return typeof e8 == "string" && /^\.\.?\//.test(e8) ? e8.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(r21, n18, i20, o21, a16) {
    return n18 ? t10 ? ".jsx" : ".js" : i20 && (!o21 || !a16) ? r21 : i20 + o21 + "." + a16.toLowerCase() + "js";
  }) : e8;
}
var ee = { __extends: P, __assign: v, __rest: S, __decorate: E, __param: T, __esDecorate: D, __runInitializers: R, __propKey: A, __setFunctionName: I, __metadata: C, __awaiter: F, __generator: M, __createBinding: j, __exportStar: G, __values: g, __read: x, __spread: K, __spreadArrays: N, __spreadArray: V, __await: _, __asyncGenerator: $, __asyncDelegator: q, __asyncValues: B, __makeTemplateObject: L, __importStar: H, __importDefault: J, __classPrivateFieldGet: Q, __classPrivateFieldSet: U, __classPrivateFieldIn: W, __addDisposableResource: X, __disposeResources: Z, __rewriteRelativeImportExtension: k };

// vendor/neon/_supabase_auth-js_2.79.0_es2022_auth-js.mjs
var ne = "2.79.0";
var W2 = 30 * 1e3;
var oe = 3;
var ae = oe * W2;
var Pe = "http://localhost:9999";
var je = "supabase.auth.token";
var Ue = { "X-Client-Info": `gotrue-js/${ne}` };
var te = "X-Supabase-Api-Version";
var be = { "2024-01-01": { timestamp: Date.parse("2024-01-01T00:00:00.0Z"), name: "2024-01-01" } };
var Ne = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
var $e = 600 * 1e3;
var L2 = class extends Error {
  constructor(e8, t10, r21) {
    super(e8), this.__isAuthError = true, this.name = "AuthError", this.status = t10, this.code = r21;
  }
};
function h(i20) {
  return typeof i20 == "object" && i20 !== null && "__isAuthError" in i20;
}
var le = class extends L2 {
  constructor(e8, t10, r21) {
    super(e8, t10, r21), this.name = "AuthApiError", this.status = t10, this.code = r21;
  }
};
function Le(i20) {
  return h(i20) && i20.name === "AuthApiError";
}
var x2 = class extends L2 {
  constructor(e8, t10) {
    super(e8), this.name = "AuthUnknownError", this.originalError = t10;
  }
};
var O2 = class extends L2 {
  constructor(e8, t10, r21, s20) {
    super(e8, r21, s20), this.name = t10, this.status = r21;
  }
};
var I2 = class extends O2 {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
};
function qe(i20) {
  return h(i20) && i20.name === "AuthSessionMissingError";
}
var j2 = class extends O2 {
  constructor() {
    super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
  }
};
var M2 = class extends O2 {
  constructor(e8) {
    super(e8, "AuthInvalidCredentialsError", 400, void 0);
  }
};
var B2 = class extends O2 {
  constructor(e8, t10 = null) {
    super(e8, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = t10;
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status, details: this.details };
  }
};
function De(i20) {
  return h(i20) && i20.name === "AuthImplicitGrantRedirectError";
}
var re = class extends O2 {
  constructor(e8, t10 = null) {
    super(e8, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = t10;
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status, details: this.details };
  }
};
var Z2 = class extends O2 {
  constructor(e8, t10) {
    super(e8, "AuthRetryableFetchError", t10, void 0);
  }
};
function ue(i20) {
  return h(i20) && i20.name === "AuthRetryableFetchError";
}
var se = class extends O2 {
  constructor(e8, t10, r21) {
    super(e8, "AuthWeakPasswordError", t10, "weak_password"), this.reasons = r21;
  }
};
var G2 = class extends O2 {
  constructor(e8) {
    super(e8, "AuthInvalidJwtError", 400, "invalid_jwt");
  }
};
var ce = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
var Ke = ` 	
\r=`.split("");
var yt = (() => {
  let i20 = new Array(128);
  for (let e8 = 0; e8 < i20.length; e8 += 1) i20[e8] = -1;
  for (let e8 = 0; e8 < Ke.length; e8 += 1) i20[Ke[e8].charCodeAt(0)] = -2;
  for (let e8 = 0; e8 < ce.length; e8 += 1) i20[ce[e8].charCodeAt(0)] = e8;
  return i20;
})();
function We(i20, e8, t10) {
  if (i20 !== null) for (e8.queue = e8.queue << 8 | i20, e8.queuedBits += 8; e8.queuedBits >= 6; ) {
    let r21 = e8.queue >> e8.queuedBits - 6 & 63;
    t10(ce[r21]), e8.queuedBits -= 6;
  }
  else if (e8.queuedBits > 0) for (e8.queue = e8.queue << 6 - e8.queuedBits, e8.queuedBits = 6; e8.queuedBits >= 6; ) {
    let r21 = e8.queue >> e8.queuedBits - 6 & 63;
    t10(ce[r21]), e8.queuedBits -= 6;
  }
}
function Me(i20, e8, t10) {
  let r21 = yt[i20];
  if (r21 > -1) for (e8.queue = e8.queue << 6 | r21, e8.queuedBits += 6; e8.queuedBits >= 8; ) t10(e8.queue >> e8.queuedBits - 8 & 255), e8.queuedBits -= 8;
  else {
    if (r21 === -2) return;
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(i20)}"`);
  }
}
function me(i20) {
  let e8 = [], t10 = (o21) => {
    e8.push(String.fromCodePoint(o21));
  }, r21 = { utf8seq: 0, codepoint: 0 }, s20 = { queue: 0, queuedBits: 0 }, n18 = (o21) => {
    mt(o21, r21, t10);
  };
  for (let o21 = 0; o21 < i20.length; o21 += 1) Me(i20.charCodeAt(o21), s20, n18);
  return e8.join("");
}
function vt(i20, e8) {
  if (i20 <= 127) {
    e8(i20);
    return;
  } else if (i20 <= 2047) {
    e8(192 | i20 >> 6), e8(128 | i20 & 63);
    return;
  } else if (i20 <= 65535) {
    e8(224 | i20 >> 12), e8(128 | i20 >> 6 & 63), e8(128 | i20 & 63);
    return;
  } else if (i20 <= 1114111) {
    e8(240 | i20 >> 18), e8(128 | i20 >> 12 & 63), e8(128 | i20 >> 6 & 63), e8(128 | i20 & 63);
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${i20.toString(16)}`);
}
function bt(i20, e8) {
  for (let t10 = 0; t10 < i20.length; t10 += 1) {
    let r21 = i20.charCodeAt(t10);
    if (r21 > 55295 && r21 <= 56319) {
      let s20 = (r21 - 55296) * 1024 & 65535;
      r21 = (i20.charCodeAt(t10 + 1) - 56320 & 65535 | s20) + 65536, t10 += 1;
    }
    vt(r21, e8);
  }
}
function mt(i20, e8, t10) {
  if (e8.utf8seq === 0) {
    if (i20 <= 127) {
      t10(i20);
      return;
    }
    for (let r21 = 1; r21 < 6; r21 += 1) if ((i20 >> 7 - r21 & 1) === 0) {
      e8.utf8seq = r21;
      break;
    }
    if (e8.utf8seq === 2) e8.codepoint = i20 & 31;
    else if (e8.utf8seq === 3) e8.codepoint = i20 & 15;
    else if (e8.utf8seq === 4) e8.codepoint = i20 & 7;
    else throw new Error("Invalid UTF-8 sequence");
    e8.utf8seq -= 1;
  } else if (e8.utf8seq > 0) {
    if (i20 <= 127) throw new Error("Invalid UTF-8 sequence");
    e8.codepoint = e8.codepoint << 6 | i20 & 63, e8.utf8seq -= 1, e8.utf8seq === 0 && t10(e8.codepoint);
  }
}
function q2(i20) {
  let e8 = [], t10 = { queue: 0, queuedBits: 0 }, r21 = (s20) => {
    e8.push(s20);
  };
  for (let s20 = 0; s20 < i20.length; s20 += 1) Me(i20.charCodeAt(s20), t10, r21);
  return new Uint8Array(e8);
}
function Be(i20) {
  let e8 = [];
  return bt(i20, (t10) => e8.push(t10)), new Uint8Array(e8);
}
function U2(i20) {
  let e8 = [], t10 = { queue: 0, queuedBits: 0 }, r21 = (s20) => {
    e8.push(s20);
  };
  return i20.forEach((s20) => We(s20, t10, r21)), We(null, t10, r21), e8.join("");
}
function Ge(i20) {
  return Math.round(Date.now() / 1e3) + i20;
}
function Fe() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(i20) {
    let e8 = Math.random() * 16 | 0;
    return (i20 == "x" ? e8 : e8 & 3 | 8).toString(16);
  });
}
var k2 = () => typeof window < "u" && typeof document < "u";
var F2 = { tested: false, writable: false };
var he = () => {
  if (!k2()) return false;
  try {
    if (typeof globalThis.localStorage != "object") return false;
  } catch {
    return false;
  }
  if (F2.tested) return F2.writable;
  let i20 = `lswt-${Math.random()}${Math.random()}`;
  try {
    globalThis.localStorage.setItem(i20, i20), globalThis.localStorage.removeItem(i20), F2.tested = true, F2.writable = true;
  } catch {
    F2.tested = true, F2.writable = false;
  }
  return F2.writable;
};
function Ve(i20) {
  let e8 = {}, t10 = new URL(i20);
  if (t10.hash && t10.hash[0] === "#") try {
    new URLSearchParams(t10.hash.substring(1)).forEach((s20, n18) => {
      e8[n18] = s20;
    });
  } catch {
  }
  return t10.searchParams.forEach((r21, s20) => {
    e8[s20] = r21;
  }), e8;
}
var de = (i20) => i20 ? (...e8) => i20(...e8) : (...e8) => fetch(...e8);
var ze = (i20) => typeof i20 == "object" && i20 !== null && "status" in i20 && "ok" in i20 && "json" in i20 && typeof i20.json == "function";
var V2 = async (i20, e8, t10) => {
  await i20.setItem(e8, JSON.stringify(t10));
};
var D2 = async (i20, e8) => {
  let t10 = await i20.getItem(e8);
  if (!t10) return null;
  try {
    return JSON.parse(t10);
  } catch {
    return t10;
  }
};
var N2 = async (i20, e8) => {
  await i20.removeItem(e8);
};
var ie = class i {
  constructor() {
    this.promise = new i.promiseConstructor((e8, t10) => {
      this.resolve = e8, this.reject = t10;
    });
  }
};
ie.promiseConstructor = Promise;
function fe(i20) {
  let e8 = i20.split(".");
  if (e8.length !== 3) throw new G2("Invalid JWT structure");
  for (let r21 = 0; r21 < e8.length; r21++) if (!Ne.test(e8[r21])) throw new G2("JWT not in base64url format");
  return { header: JSON.parse(me(e8[0])), payload: JSON.parse(me(e8[1])), signature: q2(e8[2]), raw: { header: e8[0], payload: e8[1] } };
}
async function Je(i20) {
  return await new Promise((e8) => {
    setTimeout(() => e8(null), i20);
  });
}
function He(i20, e8) {
  return new Promise((r21, s20) => {
    (async () => {
      for (let n18 = 0; n18 < 1 / 0; n18++) try {
        let o21 = await i20(n18);
        if (!e8(n18, null, o21)) {
          r21(o21);
          return;
        }
      } catch (o21) {
        if (!e8(n18, o21)) {
          s20(o21);
          return;
        }
      }
    })();
  });
}
function St(i20) {
  return ("0" + i20.toString(16)).substr(-2);
}
function Rt() {
  let e8 = new Uint32Array(56);
  if (typeof crypto > "u") {
    let t10 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", r21 = t10.length, s20 = "";
    for (let n18 = 0; n18 < 56; n18++) s20 += t10.charAt(Math.floor(Math.random() * r21));
    return s20;
  }
  return crypto.getRandomValues(e8), Array.from(e8, St).join("");
}
async function Et(i20) {
  let t10 = new TextEncoder().encode(i20), r21 = await crypto.subtle.digest("SHA-256", t10), s20 = new Uint8Array(r21);
  return Array.from(s20).map((n18) => String.fromCharCode(n18)).join("");
}
async function kt(i20) {
  if (!(typeof crypto < "u" && typeof crypto.subtle < "u" && typeof TextEncoder < "u")) return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), i20;
  let t10 = await Et(i20);
  return btoa(t10).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function z2(i20, e8, t10 = false) {
  let r21 = Rt(), s20 = r21;
  t10 && (s20 += "/PASSWORD_RECOVERY"), await V2(i20, `${e8}-code-verifier`, s20);
  let n18 = await kt(r21);
  return [n18, r21 === n18 ? "plain" : "s256"];
}
var At = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function Ye(i20) {
  let e8 = i20.headers.get(te);
  if (!e8 || !e8.match(At)) return null;
  try {
    return /* @__PURE__ */ new Date(`${e8}T00:00:00.0Z`);
  } catch {
    return null;
  }
}
function Xe(i20) {
  if (!i20) throw new Error("Missing exp claim");
  let e8 = Math.floor(Date.now() / 1e3);
  if (i20 <= e8) throw new Error("JWT has expired");
}
function Ze(i20) {
  switch (i20) {
    case "RS256":
      return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
    case "ES256":
      return { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } };
    default:
      throw new Error("Invalid alg claim");
  }
}
var It = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function J2(i20) {
  if (!It.test(i20)) throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
}
function _e() {
  let i20 = {};
  return new Proxy(i20, { get: (e8, t10) => {
    if (t10 === "__isUserNotAvailableProxy") return true;
    if (typeof t10 == "symbol") {
      let r21 = t10.toString();
      if (r21 === "Symbol(Symbol.toPrimitive)" || r21 === "Symbol(Symbol.toStringTag)" || r21 === "Symbol(util.inspect.custom)") return;
    }
    throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t10}" property of the session object is not supported. Please use getUser() instead.`);
  }, set: (e8, t10) => {
    throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t10}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
  }, deleteProperty: (e8, t10) => {
    throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t10}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
  } });
}
function Qe(i20, e8) {
  return new Proxy(i20, { get: (t10, r21, s20) => {
    if (r21 === "__isInsecureUserWarningProxy") return true;
    if (typeof r21 == "symbol") {
      let n18 = r21.toString();
      if (n18 === "Symbol(Symbol.toPrimitive)" || n18 === "Symbol(Symbol.toStringTag)" || n18 === "Symbol(util.inspect.custom)" || n18 === "Symbol(nodejs.util.inspect.custom)") return Reflect.get(t10, r21, s20);
    }
    return !e8.value && typeof r21 == "string" && (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), e8.value = true), Reflect.get(t10, r21, s20);
  } });
}
function Se(i20) {
  return JSON.parse(JSON.stringify(i20));
}
var H2 = (i20) => i20.msg || i20.message || i20.error_description || i20.error || JSON.stringify(i20);
var Tt = [502, 503, 504];
async function et(i20) {
  var e8;
  if (!ze(i20)) throw new Z2(H2(i20), 0);
  if (Tt.includes(i20.status)) throw new Z2(H2(i20), i20.status);
  let t10;
  try {
    t10 = await i20.json();
  } catch (n18) {
    throw new x2(H2(n18), n18);
  }
  let r21, s20 = Ye(i20);
  if (s20 && s20.getTime() >= be["2024-01-01"].timestamp && typeof t10 == "object" && t10 && typeof t10.code == "string" ? r21 = t10.code : typeof t10 == "object" && t10 && typeof t10.error_code == "string" && (r21 = t10.error_code), r21) {
    if (r21 === "weak_password") throw new se(H2(t10), i20.status, ((e8 = t10.weak_password) === null || e8 === void 0 ? void 0 : e8.reasons) || []);
    if (r21 === "session_not_found") throw new I2();
  } else if (typeof t10 == "object" && t10 && typeof t10.weak_password == "object" && t10.weak_password && Array.isArray(t10.weak_password.reasons) && t10.weak_password.reasons.length && t10.weak_password.reasons.reduce((n18, o21) => n18 && typeof o21 == "string", true)) throw new se(H2(t10), i20.status, t10.weak_password.reasons);
  throw new le(H2(t10), i20.status || 500, r21);
}
var Ot = (i20, e8, t10, r21) => {
  let s20 = { method: i20, headers: e8?.headers || {} };
  return i20 === "GET" ? s20 : (s20.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, e8?.headers), s20.body = JSON.stringify(r21), Object.assign(Object.assign({}, s20), t10));
};
async function _2(i20, e8, t10, r21) {
  var s20;
  let n18 = Object.assign({}, r21?.headers);
  n18[te] || (n18[te] = be["2024-01-01"].name), r21?.jwt && (n18.Authorization = `Bearer ${r21.jwt}`);
  let o21 = (s20 = r21?.query) !== null && s20 !== void 0 ? s20 : {};
  r21?.redirectTo && (o21.redirect_to = r21.redirectTo);
  let a16 = Object.keys(o21).length ? "?" + new URLSearchParams(o21).toString() : "", l19 = await Ct(i20, e8, t10 + a16, { headers: n18, noResolveJson: r21?.noResolveJson }, {}, r21?.body);
  return r21?.xform ? r21?.xform(l19) : { data: Object.assign({}, l19), error: null };
}
async function Ct(i20, e8, t10, r21, s20, n18) {
  let o21 = Ot(e8, r21, s20, n18), a16;
  try {
    a16 = await i20(t10, Object.assign({}, o21));
  } catch (l19) {
    throw console.error(l19), new Z2(H2(l19), 0);
  }
  if (a16.ok || await et(a16), r21?.noResolveJson) return a16;
  try {
    return await a16.json();
  } catch (l19) {
    await et(l19);
  }
}
function T2(i20) {
  var e8;
  let t10 = null;
  Pt(i20) && (t10 = Object.assign({}, i20), i20.expires_at || (t10.expires_at = Ge(i20.expires_in)));
  let r21 = (e8 = i20.user) !== null && e8 !== void 0 ? e8 : i20;
  return { data: { session: t10, user: r21 }, error: null };
}
function Re(i20) {
  let e8 = T2(i20);
  return !e8.error && i20.weak_password && typeof i20.weak_password == "object" && Array.isArray(i20.weak_password.reasons) && i20.weak_password.reasons.length && i20.weak_password.message && typeof i20.weak_password.message == "string" && i20.weak_password.reasons.reduce((t10, r21) => t10 && typeof r21 == "string", true) && (e8.data.weak_password = i20.weak_password), e8;
}
function C2(i20) {
  var e8;
  return { data: { user: (e8 = i20.user) !== null && e8 !== void 0 ? e8 : i20 }, error: null };
}
function tt(i20) {
  return { data: i20, error: null };
}
function rt(i20) {
  let { action_link: e8, email_otp: t10, hashed_token: r21, redirect_to: s20, verification_type: n18 } = i20, o21 = S(i20, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]), a16 = { action_link: e8, email_otp: t10, hashed_token: r21, redirect_to: s20, verification_type: n18 }, l19 = Object.assign({}, o21);
  return { data: { properties: a16, user: l19 }, error: null };
}
function Ee(i20) {
  return i20;
}
function Pt(i20) {
  return i20.access_token && i20.refresh_token && i20.expires_in;
}
var ge = ["global", "local", "others"];
var K2 = class {
  constructor({ url: e8 = "", headers: t10 = {}, fetch: r21 }) {
    this.url = e8, this.headers = t10, this.fetch = de(r21), this.mfa = { listFactors: this._listFactors.bind(this), deleteFactor: this._deleteFactor.bind(this) }, this.oauth = { listClients: this._listOAuthClients.bind(this), createClient: this._createOAuthClient.bind(this), getClient: this._getOAuthClient.bind(this), updateClient: this._updateOAuthClient.bind(this), deleteClient: this._deleteOAuthClient.bind(this), regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this) };
  }
  async signOut(e8, t10 = ge[0]) {
    if (ge.indexOf(t10) < 0) throw new Error(`@supabase/auth-js: Parameter scope must be one of ${ge.join(", ")}`);
    try {
      return await _2(this.fetch, "POST", `${this.url}/logout?scope=${t10}`, { headers: this.headers, jwt: e8, noResolveJson: true }), { data: null, error: null };
    } catch (r21) {
      if (h(r21)) return { data: null, error: r21 };
      throw r21;
    }
  }
  async inviteUserByEmail(e8, t10 = {}) {
    try {
      return await _2(this.fetch, "POST", `${this.url}/invite`, { body: { email: e8, data: t10.data }, headers: this.headers, redirectTo: t10.redirectTo, xform: C2 });
    } catch (r21) {
      if (h(r21)) return { data: { user: null }, error: r21 };
      throw r21;
    }
  }
  async generateLink(e8) {
    try {
      let { options: t10 } = e8, r21 = S(e8, ["options"]), s20 = Object.assign(Object.assign({}, r21), t10);
      return "newEmail" in r21 && (s20.new_email = r21?.newEmail, delete s20.newEmail), await _2(this.fetch, "POST", `${this.url}/admin/generate_link`, { body: s20, headers: this.headers, xform: rt, redirectTo: t10?.redirectTo });
    } catch (t10) {
      if (h(t10)) return { data: { properties: null, user: null }, error: t10 };
      throw t10;
    }
  }
  async createUser(e8) {
    try {
      return await _2(this.fetch, "POST", `${this.url}/admin/users`, { body: e8, headers: this.headers, xform: C2 });
    } catch (t10) {
      if (h(t10)) return { data: { user: null }, error: t10 };
      throw t10;
    }
  }
  async listUsers(e8) {
    var t10, r21, s20, n18, o21, a16, l19;
    try {
      let u18 = { nextPage: null, lastPage: 0, total: 0 }, c19 = await _2(this.fetch, "GET", `${this.url}/admin/users`, { headers: this.headers, noResolveJson: true, query: { page: (r21 = (t10 = e8?.page) === null || t10 === void 0 ? void 0 : t10.toString()) !== null && r21 !== void 0 ? r21 : "", per_page: (n18 = (s20 = e8?.perPage) === null || s20 === void 0 ? void 0 : s20.toString()) !== null && n18 !== void 0 ? n18 : "" }, xform: Ee });
      if (c19.error) throw c19.error;
      let g12 = await c19.json(), d13 = (o21 = c19.headers.get("x-total-count")) !== null && o21 !== void 0 ? o21 : 0, p21 = (l19 = (a16 = c19.headers.get("link")) === null || a16 === void 0 ? void 0 : a16.split(",")) !== null && l19 !== void 0 ? l19 : [];
      return p21.length > 0 && (p21.forEach((v13) => {
        let b12 = parseInt(v13.split(";")[0].split("=")[1].substring(0, 1)), y15 = JSON.parse(v13.split(";")[1].split("=")[1]);
        u18[`${y15}Page`] = b12;
      }), u18.total = parseInt(d13)), { data: Object.assign(Object.assign({}, g12), u18), error: null };
    } catch (u18) {
      if (h(u18)) return { data: { users: [] }, error: u18 };
      throw u18;
    }
  }
  async getUserById(e8) {
    J2(e8);
    try {
      return await _2(this.fetch, "GET", `${this.url}/admin/users/${e8}`, { headers: this.headers, xform: C2 });
    } catch (t10) {
      if (h(t10)) return { data: { user: null }, error: t10 };
      throw t10;
    }
  }
  async updateUserById(e8, t10) {
    J2(e8);
    try {
      return await _2(this.fetch, "PUT", `${this.url}/admin/users/${e8}`, { body: t10, headers: this.headers, xform: C2 });
    } catch (r21) {
      if (h(r21)) return { data: { user: null }, error: r21 };
      throw r21;
    }
  }
  async deleteUser(e8, t10 = false) {
    J2(e8);
    try {
      return await _2(this.fetch, "DELETE", `${this.url}/admin/users/${e8}`, { headers: this.headers, body: { should_soft_delete: t10 }, xform: C2 });
    } catch (r21) {
      if (h(r21)) return { data: { user: null }, error: r21 };
      throw r21;
    }
  }
  async _listFactors(e8) {
    J2(e8.userId);
    try {
      let { data: t10, error: r21 } = await _2(this.fetch, "GET", `${this.url}/admin/users/${e8.userId}/factors`, { headers: this.headers, xform: (s20) => ({ data: { factors: s20 }, error: null }) });
      return { data: t10, error: r21 };
    } catch (t10) {
      if (h(t10)) return { data: null, error: t10 };
      throw t10;
    }
  }
  async _deleteFactor(e8) {
    J2(e8.userId), J2(e8.id);
    try {
      return { data: await _2(this.fetch, "DELETE", `${this.url}/admin/users/${e8.userId}/factors/${e8.id}`, { headers: this.headers }), error: null };
    } catch (t10) {
      if (h(t10)) return { data: null, error: t10 };
      throw t10;
    }
  }
  async _listOAuthClients(e8) {
    var t10, r21, s20, n18, o21, a16, l19;
    try {
      let u18 = { nextPage: null, lastPage: 0, total: 0 }, c19 = await _2(this.fetch, "GET", `${this.url}/admin/oauth/clients`, { headers: this.headers, noResolveJson: true, query: { page: (r21 = (t10 = e8?.page) === null || t10 === void 0 ? void 0 : t10.toString()) !== null && r21 !== void 0 ? r21 : "", per_page: (n18 = (s20 = e8?.perPage) === null || s20 === void 0 ? void 0 : s20.toString()) !== null && n18 !== void 0 ? n18 : "" }, xform: Ee });
      if (c19.error) throw c19.error;
      let g12 = await c19.json(), d13 = (o21 = c19.headers.get("x-total-count")) !== null && o21 !== void 0 ? o21 : 0, p21 = (l19 = (a16 = c19.headers.get("link")) === null || a16 === void 0 ? void 0 : a16.split(",")) !== null && l19 !== void 0 ? l19 : [];
      return p21.length > 0 && (p21.forEach((v13) => {
        let b12 = parseInt(v13.split(";")[0].split("=")[1].substring(0, 1)), y15 = JSON.parse(v13.split(";")[1].split("=")[1]);
        u18[`${y15}Page`] = b12;
      }), u18.total = parseInt(d13)), { data: Object.assign(Object.assign({}, g12), u18), error: null };
    } catch (u18) {
      if (h(u18)) return { data: { clients: [] }, error: u18 };
      throw u18;
    }
  }
  async _createOAuthClient(e8) {
    try {
      return await _2(this.fetch, "POST", `${this.url}/admin/oauth/clients`, { body: e8, headers: this.headers, xform: (t10) => ({ data: t10, error: null }) });
    } catch (t10) {
      if (h(t10)) return { data: null, error: t10 };
      throw t10;
    }
  }
  async _getOAuthClient(e8) {
    try {
      return await _2(this.fetch, "GET", `${this.url}/admin/oauth/clients/${e8}`, { headers: this.headers, xform: (t10) => ({ data: t10, error: null }) });
    } catch (t10) {
      if (h(t10)) return { data: null, error: t10 };
      throw t10;
    }
  }
  async _updateOAuthClient(e8, t10) {
    try {
      return await _2(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${e8}`, { body: t10, headers: this.headers, xform: (r21) => ({ data: r21, error: null }) });
    } catch (r21) {
      if (h(r21)) return { data: null, error: r21 };
      throw r21;
    }
  }
  async _deleteOAuthClient(e8) {
    try {
      return await _2(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${e8}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
    } catch (t10) {
      if (h(t10)) return { data: null, error: t10 };
      throw t10;
    }
  }
  async _regenerateOAuthClientSecret(e8) {
    try {
      return await _2(this.fetch, "POST", `${this.url}/admin/oauth/clients/${e8}/regenerate_secret`, { headers: this.headers, xform: (t10) => ({ data: t10, error: null }) });
    } catch (t10) {
      if (h(t10)) return { data: null, error: t10 };
      throw t10;
    }
  }
};
function ke(i20 = {}) {
  return { getItem: (e8) => i20[e8] || null, setItem: (e8, t10) => {
    i20[e8] = t10;
  }, removeItem: (e8) => {
    delete i20[e8];
  } };
}
var Y2 = { debug: !!(globalThis && he() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true") };
var Q2 = class extends Error {
  constructor(e8) {
    super(e8), this.isAcquireTimeout = true;
  }
};
var we = class extends Q2 {
};
async function Ie(i20, e8, t10) {
  Y2.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire lock", i20, e8);
  let r21 = new globalThis.AbortController();
  return e8 > 0 && setTimeout(() => {
    r21.abort(), Y2.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", i20);
  }, e8), await Promise.resolve().then(() => globalThis.navigator.locks.request(i20, e8 === 0 ? { mode: "exclusive", ifAvailable: true } : { mode: "exclusive", signal: r21.signal }, async (s20) => {
    if (s20) {
      Y2.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", i20, s20.name);
      try {
        return await t10();
      } finally {
        Y2.debug && console.log("@supabase/gotrue-js: navigatorLock: released", i20, s20.name);
      }
    } else {
      if (e8 === 0) throw Y2.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", i20), new we(`Acquiring an exclusive Navigator LockManager lock "${i20}" immediately failed`);
      if (Y2.debug) try {
        let n18 = await globalThis.navigator.locks.query();
        console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(n18, null, "  "));
      } catch (n18) {
        console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", n18);
      }
      return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"), await t10();
    }
  }));
}
function it() {
  if (typeof globalThis != "object") try {
    Object.defineProperty(Object.prototype, "__magic__", { get: function() {
      return this;
    }, configurable: true }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
  } catch {
    typeof self < "u" && (self.globalThis = self);
  }
}
function xe(i20) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(i20)) throw new Error(`@supabase/auth-js: Address "${i20}" is invalid.`);
  return i20.toLowerCase();
}
function nt(i20) {
  return parseInt(i20, 16);
}
function ot(i20) {
  let e8 = new TextEncoder().encode(i20);
  return "0x" + Array.from(e8, (r21) => r21.toString(16).padStart(2, "0")).join("");
}
function at(i20) {
  var e8;
  let { chainId: t10, domain: r21, expirationTime: s20, issuedAt: n18 = /* @__PURE__ */ new Date(), nonce: o21, notBefore: a16, requestId: l19, resources: u18, scheme: c19, uri: g12, version: d13 } = i20;
  {
    if (!Number.isInteger(t10)) throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t10}`);
    if (!r21) throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
    if (o21 && o21.length < 8) throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o21}`);
    if (!g12) throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
    if (d13 !== "1") throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d13}`);
    if (!((e8 = i20.statement) === null || e8 === void 0) && e8.includes(`
`)) throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${i20.statement}`);
  }
  let p21 = xe(i20.address), v13 = c19 ? `${c19}://${r21}` : r21, b12 = i20.statement ? `${i20.statement}
` : "", y15 = `${v13} wants you to sign in with your Ethereum account:
${p21}

${b12}`, E21 = `URI: ${g12}
Version: ${d13}
Chain ID: ${t10}${o21 ? `
Nonce: ${o21}` : ""}
Issued At: ${n18.toISOString()}`;
  if (s20 && (E21 += `
Expiration Time: ${s20.toISOString()}`), a16 && (E21 += `
Not Before: ${a16.toISOString()}`), l19 && (E21 += `
Request ID: ${l19}`), u18) {
    let w25 = `
Resources:`;
    for (let f17 of u18) {
      if (!f17 || typeof f17 != "string") throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${f17}`);
      w25 += `
- ${f17}`;
    }
    E21 += w25;
  }
  return `${y15}
${E21}`;
}
var S2 = class extends Error {
  constructor({ message: e8, code: t10, cause: r21, name: s20 }) {
    var n18;
    super(e8, { cause: r21 }), this.__isWebAuthnError = true, this.name = (n18 = s20 ?? (r21 instanceof Error ? r21.name : void 0)) !== null && n18 !== void 0 ? n18 : "Unknown Error", this.code = t10;
  }
};
var X2 = class extends S2 {
  constructor(e8, t10) {
    super({ code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: t10, message: e8 }), this.name = "WebAuthnUnknownError", this.originalError = t10;
  }
};
function lt({ error: i20, options: e8 }) {
  var t10, r21, s20;
  let { publicKey: n18 } = e8;
  if (!n18) throw Error("options was missing required publicKey property");
  if (i20.name === "AbortError") {
    if (e8.signal instanceof AbortSignal) return new S2({ message: "Registration ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: i20 });
  } else if (i20.name === "ConstraintError") {
    if (((t10 = n18.authenticatorSelection) === null || t10 === void 0 ? void 0 : t10.requireResidentKey) === true) return new S2({ message: "Discoverable credentials were required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT", cause: i20 });
    if (e8.mediation === "conditional" && ((r21 = n18.authenticatorSelection) === null || r21 === void 0 ? void 0 : r21.userVerification) === "required") return new S2({ message: "User verification was required during automatic registration but it could not be performed", code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE", cause: i20 });
    if (((s20 = n18.authenticatorSelection) === null || s20 === void 0 ? void 0 : s20.userVerification) === "required") return new S2({ message: "User verification was required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT", cause: i20 });
  } else {
    if (i20.name === "InvalidStateError") return new S2({ message: "The authenticator was previously registered", code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED", cause: i20 });
    if (i20.name === "NotAllowedError") return new S2({ message: i20.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: i20 });
    if (i20.name === "NotSupportedError") return n18.pubKeyCredParams.filter((a16) => a16.type === "public-key").length === 0 ? new S2({ message: 'No entry in pubKeyCredParams was of type "public-key"', code: "ERROR_MALFORMED_PUBKEYCREDPARAMS", cause: i20 }) : new S2({ message: "No available authenticator supported any of the specified pubKeyCredParams algorithms", code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG", cause: i20 });
    if (i20.name === "SecurityError") {
      let o21 = window.location.hostname;
      if (Te(o21)) {
        if (n18.rp.id !== o21) return new S2({ message: `The RP ID "${n18.rp.id}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: i20 });
      } else return new S2({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: i20 });
    } else if (i20.name === "TypeError") {
      if (n18.user.id.byteLength < 1 || n18.user.id.byteLength > 64) return new S2({ message: "User ID was not between 1 and 64 characters", code: "ERROR_INVALID_USER_ID_LENGTH", cause: i20 });
    } else if (i20.name === "UnknownError") return new S2({ message: "The authenticator was unable to process the specified options, or could not create a new credential", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: i20 });
  }
  return new S2({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: i20 });
}
function ut({ error: i20, options: e8 }) {
  let { publicKey: t10 } = e8;
  if (!t10) throw Error("options was missing required publicKey property");
  if (i20.name === "AbortError") {
    if (e8.signal instanceof AbortSignal) return new S2({ message: "Authentication ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: i20 });
  } else {
    if (i20.name === "NotAllowedError") return new S2({ message: i20.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: i20 });
    if (i20.name === "SecurityError") {
      let r21 = window.location.hostname;
      if (Te(r21)) {
        if (t10.rpId !== r21) return new S2({ message: `The RP ID "${t10.rpId}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: i20 });
      } else return new S2({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: i20 });
    } else if (i20.name === "UnknownError") return new S2({ message: "The authenticator was unable to process the specified options, or could not create a new assertion signature", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: i20 });
  }
  return new S2({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: i20 });
}
var Oe = class {
  createNewAbortSignal() {
    if (this.controller) {
      let t10 = new Error("Cancelling existing WebAuthn API call for new one");
      t10.name = "AbortError", this.controller.abort(t10);
    }
    let e8 = new AbortController();
    return this.controller = e8, e8.signal;
  }
  cancelCeremony() {
    if (this.controller) {
      let e8 = new Error("Manually cancelling existing WebAuthn API call");
      e8.name = "AbortError", this.controller.abort(e8), this.controller = void 0;
    }
  }
};
var Nt = new Oe();
function dt(i20) {
  if (!i20) throw new Error("Credential creation options are required");
  if (typeof PublicKeyCredential < "u" && "parseCreationOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseCreationOptionsFromJSON == "function") return PublicKeyCredential.parseCreationOptionsFromJSON(i20);
  let { challenge: e8, user: t10, excludeCredentials: r21 } = i20, s20 = S(i20, ["challenge", "user", "excludeCredentials"]), n18 = q2(e8).buffer, o21 = Object.assign(Object.assign({}, t10), { id: q2(t10.id).buffer }), a16 = Object.assign(Object.assign({}, s20), { challenge: n18, user: o21 });
  if (r21 && r21.length > 0) {
    a16.excludeCredentials = new Array(r21.length);
    for (let l19 = 0; l19 < r21.length; l19++) {
      let u18 = r21[l19];
      a16.excludeCredentials[l19] = Object.assign(Object.assign({}, u18), { id: q2(u18.id).buffer, type: u18.type || "public-key", transports: u18.transports });
    }
  }
  return a16;
}
function ft(i20) {
  if (!i20) throw new Error("Credential request options are required");
  if (typeof PublicKeyCredential < "u" && "parseRequestOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseRequestOptionsFromJSON == "function") return PublicKeyCredential.parseRequestOptionsFromJSON(i20);
  let { challenge: e8, allowCredentials: t10 } = i20, r21 = S(i20, ["challenge", "allowCredentials"]), s20 = q2(e8).buffer, n18 = Object.assign(Object.assign({}, r21), { challenge: s20 });
  if (t10 && t10.length > 0) {
    n18.allowCredentials = new Array(t10.length);
    for (let o21 = 0; o21 < t10.length; o21++) {
      let a16 = t10[o21];
      n18.allowCredentials[o21] = Object.assign(Object.assign({}, a16), { id: q2(a16.id).buffer, type: a16.type || "public-key", transports: a16.transports });
    }
  }
  return n18;
}
function _t(i20) {
  var e8;
  if ("toJSON" in i20 && typeof i20.toJSON == "function") return i20.toJSON();
  let t10 = i20;
  return { id: i20.id, rawId: i20.id, response: { attestationObject: U2(new Uint8Array(i20.response.attestationObject)), clientDataJSON: U2(new Uint8Array(i20.response.clientDataJSON)) }, type: "public-key", clientExtensionResults: i20.getClientExtensionResults(), authenticatorAttachment: (e8 = t10.authenticatorAttachment) !== null && e8 !== void 0 ? e8 : void 0 };
}
function gt(i20) {
  var e8;
  if ("toJSON" in i20 && typeof i20.toJSON == "function") return i20.toJSON();
  let t10 = i20, r21 = i20.getClientExtensionResults(), s20 = i20.response;
  return { id: i20.id, rawId: i20.id, response: { authenticatorData: U2(new Uint8Array(s20.authenticatorData)), clientDataJSON: U2(new Uint8Array(s20.clientDataJSON)), signature: U2(new Uint8Array(s20.signature)), userHandle: s20.userHandle ? U2(new Uint8Array(s20.userHandle)) : void 0 }, type: "public-key", clientExtensionResults: r21, authenticatorAttachment: (e8 = t10.authenticatorAttachment) !== null && e8 !== void 0 ? e8 : void 0 };
}
function Te(i20) {
  return i20 === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(i20);
}
function ct() {
  var i20, e8;
  return !!(k2() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && typeof ((i20 = navigator?.credentials) === null || i20 === void 0 ? void 0 : i20.create) == "function" && typeof ((e8 = navigator?.credentials) === null || e8 === void 0 ? void 0 : e8.get) == "function");
}
async function $t(i20) {
  try {
    let e8 = await navigator.credentials.create(i20);
    return e8 ? e8 instanceof PublicKeyCredential ? { data: e8, error: null } : { data: null, error: new X2("Browser returned unexpected credential type", e8) } : { data: null, error: new X2("Empty credential response", e8) };
  } catch (e8) {
    return { data: null, error: lt({ error: e8, options: i20 }) };
  }
}
async function Lt(i20) {
  try {
    let e8 = await navigator.credentials.get(i20);
    return e8 ? e8 instanceof PublicKeyCredential ? { data: e8, error: null } : { data: null, error: new X2("Browser returned unexpected credential type", e8) } : { data: null, error: new X2("Empty credential response", e8) };
  } catch (e8) {
    return { data: null, error: ut({ error: e8, options: i20 }) };
  }
}
var qt = { hints: ["security-key"], authenticatorSelection: { authenticatorAttachment: "cross-platform", requireResidentKey: false, userVerification: "preferred", residentKey: "discouraged" }, attestation: "none" };
var Dt = { userVerification: "preferred", hints: ["security-key"] };
function pe(...i20) {
  let e8 = (s20) => s20 !== null && typeof s20 == "object" && !Array.isArray(s20), t10 = (s20) => s20 instanceof ArrayBuffer || ArrayBuffer.isView(s20), r21 = {};
  for (let s20 of i20) if (s20) for (let n18 in s20) {
    let o21 = s20[n18];
    if (o21 !== void 0) if (Array.isArray(o21)) r21[n18] = o21;
    else if (t10(o21)) r21[n18] = o21;
    else if (e8(o21)) {
      let a16 = r21[n18];
      e8(a16) ? r21[n18] = pe(a16, o21) : r21[n18] = pe(o21);
    } else r21[n18] = o21;
  }
  return r21;
}
function Kt(i20, e8) {
  return pe(qt, i20, e8 || {});
}
function Wt(i20, e8) {
  return pe(Dt, i20, e8 || {});
}
var ye = class {
  constructor(e8) {
    this.client = e8, this.enroll = this._enroll.bind(this), this.challenge = this._challenge.bind(this), this.verify = this._verify.bind(this), this.authenticate = this._authenticate.bind(this), this.register = this._register.bind(this);
  }
  async _enroll(e8) {
    return this.client.mfa.enroll(Object.assign(Object.assign({}, e8), { factorType: "webauthn" }));
  }
  async _challenge({ factorId: e8, webauthn: t10, friendlyName: r21, signal: s20 }, n18) {
    try {
      let { data: o21, error: a16 } = await this.client.mfa.challenge({ factorId: e8, webauthn: t10 });
      if (!o21) return { data: null, error: a16 };
      let l19 = s20 ?? Nt.createNewAbortSignal();
      if (o21.webauthn.type === "create") {
        let { user: u18 } = o21.webauthn.credential_options.publicKey;
        u18.name || (u18.name = `${u18.id}:${r21}`), u18.displayName || (u18.displayName = u18.name);
      }
      switch (o21.webauthn.type) {
        case "create": {
          let u18 = Kt(o21.webauthn.credential_options.publicKey, n18?.create), { data: c19, error: g12 } = await $t({ publicKey: u18, signal: l19 });
          return c19 ? { data: { factorId: e8, challengeId: o21.id, webauthn: { type: o21.webauthn.type, credential_response: c19 } }, error: null } : { data: null, error: g12 };
        }
        case "request": {
          let u18 = Wt(o21.webauthn.credential_options.publicKey, n18?.request), { data: c19, error: g12 } = await Lt(Object.assign(Object.assign({}, o21.webauthn.credential_options), { publicKey: u18, signal: l19 }));
          return c19 ? { data: { factorId: e8, challengeId: o21.id, webauthn: { type: o21.webauthn.type, credential_response: c19 } }, error: null } : { data: null, error: g12 };
        }
      }
    } catch (o21) {
      return h(o21) ? { data: null, error: o21 } : { data: null, error: new x2("Unexpected error in challenge", o21) };
    }
  }
  async _verify({ challengeId: e8, factorId: t10, webauthn: r21 }) {
    return this.client.mfa.verify({ factorId: t10, challengeId: e8, webauthn: r21 });
  }
  async _authenticate({ factorId: e8, webauthn: { rpId: t10 = typeof window < "u" ? window.location.hostname : void 0, rpOrigins: r21 = typeof window < "u" ? [window.location.origin] : void 0, signal: s20 } }, n18) {
    if (!t10) return { data: null, error: new L2("rpId is required for WebAuthn authentication") };
    try {
      if (!ct()) return { data: null, error: new x2("Browser does not support WebAuthn", null) };
      let { data: o21, error: a16 } = await this.challenge({ factorId: e8, webauthn: { rpId: t10, rpOrigins: r21 }, signal: s20 }, { request: n18 });
      if (!o21) return { data: null, error: a16 };
      let { webauthn: l19 } = o21;
      return this._verify({ factorId: e8, challengeId: o21.challengeId, webauthn: { type: l19.type, rpId: t10, rpOrigins: r21, credential_response: l19.credential_response } });
    } catch (o21) {
      return h(o21) ? { data: null, error: o21 } : { data: null, error: new x2("Unexpected error in authenticate", o21) };
    }
  }
  async _register({ friendlyName: e8, rpId: t10 = typeof window < "u" ? window.location.hostname : void 0, rpOrigins: r21 = typeof window < "u" ? [window.location.origin] : void 0, signal: s20 }, n18) {
    if (!t10) return { data: null, error: new L2("rpId is required for WebAuthn registration") };
    try {
      if (!ct()) return { data: null, error: new x2("Browser does not support WebAuthn", null) };
      let { data: o21, error: a16 } = await this._enroll({ friendlyName: e8 });
      if (!o21) return await this.client.mfa.listFactors().then((c19) => {
        var g12;
        return (g12 = c19.data) === null || g12 === void 0 ? void 0 : g12.all.find((d13) => d13.factor_type === "webauthn" && d13.friendly_name === e8 && d13.status !== "unverified");
      }).then((c19) => c19 ? this.client.mfa.unenroll({ factorId: c19?.id }) : void 0), { data: null, error: a16 };
      let { data: l19, error: u18 } = await this._challenge({ factorId: o21.id, friendlyName: o21.friendly_name, webauthn: { rpId: t10, rpOrigins: r21 }, signal: s20 }, { create: n18 });
      return l19 ? this._verify({ factorId: o21.id, challengeId: l19.challengeId, webauthn: { rpId: t10, rpOrigins: r21, type: l19.webauthn.type, credential_response: l19.webauthn.credential_response } }) : { data: null, error: u18 };
    } catch (o21) {
      return h(o21) ? { data: null, error: o21 } : { data: null, error: new x2("Unexpected error in register", o21) };
    }
  }
};
it();
var Mt = { url: Pe, storageKey: je, autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, headers: Ue, flowType: "implicit", debug: false, hasCustomAuthorizationHeader: false, throwOnError: false };
async function wt(i20, e8, t10) {
  return await t10();
}
var ee2 = {};
var ve = class i2 {
  get jwks() {
    var e8, t10;
    return (t10 = (e8 = ee2[this.storageKey]) === null || e8 === void 0 ? void 0 : e8.jwks) !== null && t10 !== void 0 ? t10 : { keys: [] };
  }
  set jwks(e8) {
    ee2[this.storageKey] = Object.assign(Object.assign({}, ee2[this.storageKey]), { jwks: e8 });
  }
  get jwks_cached_at() {
    var e8, t10;
    return (t10 = (e8 = ee2[this.storageKey]) === null || e8 === void 0 ? void 0 : e8.cachedAt) !== null && t10 !== void 0 ? t10 : Number.MIN_SAFE_INTEGER;
  }
  set jwks_cached_at(e8) {
    ee2[this.storageKey] = Object.assign(Object.assign({}, ee2[this.storageKey]), { cachedAt: e8 });
  }
  constructor(e8) {
    var t10, r21;
    this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = true, this.hasCustomAuthorizationHeader = false, this.suppressGetSessionWarning = false, this.lockAcquired = false, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log, this.instanceID = i2.nextInstanceID, i2.nextInstanceID += 1, this.instanceID > 0 && k2() && console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
    let s20 = Object.assign(Object.assign({}, Mt), e8);
    if (this.logDebugMessages = !!s20.debug, typeof s20.debug == "function" && (this.logger = s20.debug), this.persistSession = s20.persistSession, this.storageKey = s20.storageKey, this.autoRefreshToken = s20.autoRefreshToken, this.admin = new K2({ url: s20.url, headers: s20.headers, fetch: s20.fetch }), this.url = s20.url, this.headers = s20.headers, this.fetch = de(s20.fetch), this.lock = s20.lock || wt, this.detectSessionInUrl = s20.detectSessionInUrl, this.flowType = s20.flowType, this.hasCustomAuthorizationHeader = s20.hasCustomAuthorizationHeader, this.throwOnError = s20.throwOnError, s20.lock ? this.lock = s20.lock : k2() && (!((t10 = globalThis?.navigator) === null || t10 === void 0) && t10.locks) ? this.lock = Ie : this.lock = wt, this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = { verify: this._verify.bind(this), enroll: this._enroll.bind(this), unenroll: this._unenroll.bind(this), challenge: this._challenge.bind(this), listFactors: this._listFactors.bind(this), challengeAndVerify: this._challengeAndVerify.bind(this), getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this), webauthn: new ye(this) }, this.oauth = { getAuthorizationDetails: this._getAuthorizationDetails.bind(this), approveAuthorization: this._approveAuthorization.bind(this), denyAuthorization: this._denyAuthorization.bind(this) }, this.persistSession ? (s20.storage ? this.storage = s20.storage : he() ? this.storage = globalThis.localStorage : (this.memoryStorage = {}, this.storage = ke(this.memoryStorage)), s20.userStorage && (this.userStorage = s20.userStorage)) : (this.memoryStorage = {}, this.storage = ke(this.memoryStorage)), k2() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (n18) {
        console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", n18);
      }
      (r21 = this.broadcastChannel) === null || r21 === void 0 || r21.addEventListener("message", async (n18) => {
        this._debug("received broadcast notification from other tab or client", n18), await this._notifyAllSubscribers(n18.data.event, n18.data.session, false);
      });
    }
    this.initialize();
  }
  isThrowOnErrorEnabled() {
    return this.throwOnError;
  }
  _returnResult(e8) {
    if (this.throwOnError && e8 && e8.error) throw e8.error;
    return e8;
  }
  _debug(...e8) {
    return this.logDebugMessages && this.logger(`GoTrueClient@${this.instanceID} (${ne}) ${(/* @__PURE__ */ new Date()).toISOString()}`, ...e8), this;
  }
  async initialize() {
    return this.initializePromise ? await this.initializePromise : (this.initializePromise = (async () => await this._acquireLock(-1, async () => await this._initialize()))(), await this.initializePromise);
  }
  async _initialize() {
    var e8;
    try {
      let t10 = {}, r21 = "none";
      if (k2() && (t10 = Ve(window.location.href), this._isImplicitGrantCallback(t10) ? r21 = "implicit" : await this._isPKCECallback(t10) && (r21 = "pkce")), k2() && this.detectSessionInUrl && r21 !== "none") {
        let { data: s20, error: n18 } = await this._getSessionFromURL(t10, r21);
        if (n18) {
          if (this._debug("#_initialize()", "error detecting session from URL", n18), De(n18)) {
            let l19 = (e8 = n18.details) === null || e8 === void 0 ? void 0 : e8.code;
            if (l19 === "identity_already_exists" || l19 === "identity_not_found" || l19 === "single_identity_not_deletable") return { error: n18 };
          }
          return await this._removeSession(), { error: n18 };
        }
        let { session: o21, redirectType: a16 } = s20;
        return this._debug("#_initialize()", "detected session in URL", o21, "redirect type", a16), await this._saveSession(o21), setTimeout(async () => {
          a16 === "recovery" ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", o21) : await this._notifyAllSubscribers("SIGNED_IN", o21);
        }, 0), { error: null };
      }
      return await this._recoverAndRefresh(), { error: null };
    } catch (t10) {
      return h(t10) ? this._returnResult({ error: t10 }) : this._returnResult({ error: new x2("Unexpected error during initialization", t10) });
    } finally {
      await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
    }
  }
  async signInAnonymously(e8) {
    var t10, r21, s20;
    try {
      let n18 = await _2(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { data: (r21 = (t10 = e8?.options) === null || t10 === void 0 ? void 0 : t10.data) !== null && r21 !== void 0 ? r21 : {}, gotrue_meta_security: { captcha_token: (s20 = e8?.options) === null || s20 === void 0 ? void 0 : s20.captchaToken } }, xform: T2 }), { data: o21, error: a16 } = n18;
      if (a16 || !o21) return this._returnResult({ data: { user: null, session: null }, error: a16 });
      let l19 = o21.session, u18 = o21.user;
      return o21.session && (await this._saveSession(o21.session), await this._notifyAllSubscribers("SIGNED_IN", l19)), this._returnResult({ data: { user: u18, session: l19 }, error: null });
    } catch (n18) {
      if (h(n18)) return this._returnResult({ data: { user: null, session: null }, error: n18 });
      throw n18;
    }
  }
  async signUp(e8) {
    var t10, r21, s20;
    try {
      let n18;
      if ("email" in e8) {
        let { email: c19, password: g12, options: d13 } = e8, p21 = null, v13 = null;
        this.flowType === "pkce" && ([p21, v13] = await z2(this.storage, this.storageKey)), n18 = await _2(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, redirectTo: d13?.emailRedirectTo, body: { email: c19, password: g12, data: (t10 = d13?.data) !== null && t10 !== void 0 ? t10 : {}, gotrue_meta_security: { captcha_token: d13?.captchaToken }, code_challenge: p21, code_challenge_method: v13 }, xform: T2 });
      } else if ("phone" in e8) {
        let { phone: c19, password: g12, options: d13 } = e8;
        n18 = await _2(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { phone: c19, password: g12, data: (r21 = d13?.data) !== null && r21 !== void 0 ? r21 : {}, channel: (s20 = d13?.channel) !== null && s20 !== void 0 ? s20 : "sms", gotrue_meta_security: { captcha_token: d13?.captchaToken } }, xform: T2 });
      } else throw new M2("You must provide either an email or phone number and a password");
      let { data: o21, error: a16 } = n18;
      if (a16 || !o21) return this._returnResult({ data: { user: null, session: null }, error: a16 });
      let l19 = o21.session, u18 = o21.user;
      return o21.session && (await this._saveSession(o21.session), await this._notifyAllSubscribers("SIGNED_IN", l19)), this._returnResult({ data: { user: u18, session: l19 }, error: null });
    } catch (n18) {
      if (h(n18)) return this._returnResult({ data: { user: null, session: null }, error: n18 });
      throw n18;
    }
  }
  async signInWithPassword(e8) {
    try {
      let t10;
      if ("email" in e8) {
        let { email: n18, password: o21, options: a16 } = e8;
        t10 = await _2(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { email: n18, password: o21, gotrue_meta_security: { captcha_token: a16?.captchaToken } }, xform: Re });
      } else if ("phone" in e8) {
        let { phone: n18, password: o21, options: a16 } = e8;
        t10 = await _2(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { phone: n18, password: o21, gotrue_meta_security: { captcha_token: a16?.captchaToken } }, xform: Re });
      } else throw new M2("You must provide either an email or phone number and a password");
      let { data: r21, error: s20 } = t10;
      if (s20) return this._returnResult({ data: { user: null, session: null }, error: s20 });
      if (!r21 || !r21.session || !r21.user) {
        let n18 = new j2();
        return this._returnResult({ data: { user: null, session: null }, error: n18 });
      }
      return r21.session && (await this._saveSession(r21.session), await this._notifyAllSubscribers("SIGNED_IN", r21.session)), this._returnResult({ data: Object.assign({ user: r21.user, session: r21.session }, r21.weak_password ? { weakPassword: r21.weak_password } : null), error: s20 });
    } catch (t10) {
      if (h(t10)) return this._returnResult({ data: { user: null, session: null }, error: t10 });
      throw t10;
    }
  }
  async signInWithOAuth(e8) {
    var t10, r21, s20, n18;
    return await this._handleProviderSignIn(e8.provider, { redirectTo: (t10 = e8.options) === null || t10 === void 0 ? void 0 : t10.redirectTo, scopes: (r21 = e8.options) === null || r21 === void 0 ? void 0 : r21.scopes, queryParams: (s20 = e8.options) === null || s20 === void 0 ? void 0 : s20.queryParams, skipBrowserRedirect: (n18 = e8.options) === null || n18 === void 0 ? void 0 : n18.skipBrowserRedirect });
  }
  async exchangeCodeForSession(e8) {
    return await this.initializePromise, this._acquireLock(-1, async () => this._exchangeCodeForSession(e8));
  }
  async signInWithWeb3(e8) {
    let { chain: t10 } = e8;
    switch (t10) {
      case "ethereum":
        return await this.signInWithEthereum(e8);
      case "solana":
        return await this.signInWithSolana(e8);
      default:
        throw new Error(`@supabase/auth-js: Unsupported chain "${t10}"`);
    }
  }
  async signInWithEthereum(e8) {
    var t10, r21, s20, n18, o21, a16, l19, u18, c19, g12, d13;
    let p21, v13;
    if ("message" in e8) p21 = e8.message, v13 = e8.signature;
    else {
      let { chain: b12, wallet: y15, statement: E21, options: w25 } = e8, f17;
      if (k2()) if (typeof y15 == "object") f17 = y15;
      else {
        let P12 = window;
        if ("ethereum" in P12 && typeof P12.ethereum == "object" && "request" in P12.ethereum && typeof P12.ethereum.request == "function") f17 = P12.ethereum;
        else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.");
      }
      else {
        if (typeof y15 != "object" || !w25?.url) throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        f17 = y15;
      }
      let R20 = new URL((t10 = w25?.url) !== null && t10 !== void 0 ? t10 : window.location.href), $10 = await f17.request({ method: "eth_requestAccounts" }).then((P12) => P12).catch(() => {
        throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid");
      });
      if (!$10 || $10.length === 0) throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
      let m16 = xe($10[0]), A19 = (r21 = w25?.signInWithEthereum) === null || r21 === void 0 ? void 0 : r21.chainId;
      if (!A19) {
        let P12 = await f17.request({ method: "eth_chainId" });
        A19 = nt(P12);
      }
      let pt4 = { domain: R20.host, address: m16, statement: E21, uri: R20.href, version: "1", chainId: A19, nonce: (s20 = w25?.signInWithEthereum) === null || s20 === void 0 ? void 0 : s20.nonce, issuedAt: (o21 = (n18 = w25?.signInWithEthereum) === null || n18 === void 0 ? void 0 : n18.issuedAt) !== null && o21 !== void 0 ? o21 : /* @__PURE__ */ new Date(), expirationTime: (a16 = w25?.signInWithEthereum) === null || a16 === void 0 ? void 0 : a16.expirationTime, notBefore: (l19 = w25?.signInWithEthereum) === null || l19 === void 0 ? void 0 : l19.notBefore, requestId: (u18 = w25?.signInWithEthereum) === null || u18 === void 0 ? void 0 : u18.requestId, resources: (c19 = w25?.signInWithEthereum) === null || c19 === void 0 ? void 0 : c19.resources };
      p21 = at(pt4), v13 = await f17.request({ method: "personal_sign", params: [ot(p21), m16] });
    }
    try {
      let { data: b12, error: y15 } = await _2(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "ethereum", message: p21, signature: v13 }, !((g12 = e8.options) === null || g12 === void 0) && g12.captchaToken ? { gotrue_meta_security: { captcha_token: (d13 = e8.options) === null || d13 === void 0 ? void 0 : d13.captchaToken } } : null), xform: T2 });
      if (y15) throw y15;
      if (!b12 || !b12.session || !b12.user) {
        let E21 = new j2();
        return this._returnResult({ data: { user: null, session: null }, error: E21 });
      }
      return b12.session && (await this._saveSession(b12.session), await this._notifyAllSubscribers("SIGNED_IN", b12.session)), this._returnResult({ data: Object.assign({}, b12), error: y15 });
    } catch (b12) {
      if (h(b12)) return this._returnResult({ data: { user: null, session: null }, error: b12 });
      throw b12;
    }
  }
  async signInWithSolana(e8) {
    var t10, r21, s20, n18, o21, a16, l19, u18, c19, g12, d13, p21;
    let v13, b12;
    if ("message" in e8) v13 = e8.message, b12 = e8.signature;
    else {
      let { chain: y15, wallet: E21, statement: w25, options: f17 } = e8, R20;
      if (k2()) if (typeof E21 == "object") R20 = E21;
      else {
        let m16 = window;
        if ("solana" in m16 && typeof m16.solana == "object" && ("signIn" in m16.solana && typeof m16.solana.signIn == "function" || "signMessage" in m16.solana && typeof m16.solana.signMessage == "function")) R20 = m16.solana;
        else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.");
      }
      else {
        if (typeof E21 != "object" || !f17?.url) throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        R20 = E21;
      }
      let $10 = new URL((t10 = f17?.url) !== null && t10 !== void 0 ? t10 : window.location.href);
      if ("signIn" in R20 && R20.signIn) {
        let m16 = await R20.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, f17?.signInWithSolana), { version: "1", domain: $10.host, uri: $10.href }), w25 ? { statement: w25 } : null)), A19;
        if (Array.isArray(m16) && m16[0] && typeof m16[0] == "object") A19 = m16[0];
        else if (m16 && typeof m16 == "object" && "signedMessage" in m16 && "signature" in m16) A19 = m16;
        else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
        if ("signedMessage" in A19 && "signature" in A19 && (typeof A19.signedMessage == "string" || A19.signedMessage instanceof Uint8Array) && A19.signature instanceof Uint8Array) v13 = typeof A19.signedMessage == "string" ? A19.signedMessage : new TextDecoder().decode(A19.signedMessage), b12 = A19.signature;
        else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
      } else {
        if (!("signMessage" in R20) || typeof R20.signMessage != "function" || !("publicKey" in R20) || typeof R20 != "object" || !R20.publicKey || !("toBase58" in R20.publicKey) || typeof R20.publicKey.toBase58 != "function") throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
        v13 = [`${$10.host} wants you to sign in with your Solana account:`, R20.publicKey.toBase58(), ...w25 ? ["", w25, ""] : [""], "Version: 1", `URI: ${$10.href}`, `Issued At: ${(s20 = (r21 = f17?.signInWithSolana) === null || r21 === void 0 ? void 0 : r21.issuedAt) !== null && s20 !== void 0 ? s20 : (/* @__PURE__ */ new Date()).toISOString()}`, ...!((n18 = f17?.signInWithSolana) === null || n18 === void 0) && n18.notBefore ? [`Not Before: ${f17.signInWithSolana.notBefore}`] : [], ...!((o21 = f17?.signInWithSolana) === null || o21 === void 0) && o21.expirationTime ? [`Expiration Time: ${f17.signInWithSolana.expirationTime}`] : [], ...!((a16 = f17?.signInWithSolana) === null || a16 === void 0) && a16.chainId ? [`Chain ID: ${f17.signInWithSolana.chainId}`] : [], ...!((l19 = f17?.signInWithSolana) === null || l19 === void 0) && l19.nonce ? [`Nonce: ${f17.signInWithSolana.nonce}`] : [], ...!((u18 = f17?.signInWithSolana) === null || u18 === void 0) && u18.requestId ? [`Request ID: ${f17.signInWithSolana.requestId}`] : [], ...!((g12 = (c19 = f17?.signInWithSolana) === null || c19 === void 0 ? void 0 : c19.resources) === null || g12 === void 0) && g12.length ? ["Resources", ...f17.signInWithSolana.resources.map((A19) => `- ${A19}`)] : []].join(`
`);
        let m16 = await R20.signMessage(new TextEncoder().encode(v13), "utf8");
        if (!m16 || !(m16 instanceof Uint8Array)) throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
        b12 = m16;
      }
    }
    try {
      let { data: y15, error: E21 } = await _2(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "solana", message: v13, signature: U2(b12) }, !((d13 = e8.options) === null || d13 === void 0) && d13.captchaToken ? { gotrue_meta_security: { captcha_token: (p21 = e8.options) === null || p21 === void 0 ? void 0 : p21.captchaToken } } : null), xform: T2 });
      if (E21) throw E21;
      if (!y15 || !y15.session || !y15.user) {
        let w25 = new j2();
        return this._returnResult({ data: { user: null, session: null }, error: w25 });
      }
      return y15.session && (await this._saveSession(y15.session), await this._notifyAllSubscribers("SIGNED_IN", y15.session)), this._returnResult({ data: Object.assign({}, y15), error: E21 });
    } catch (y15) {
      if (h(y15)) return this._returnResult({ data: { user: null, session: null }, error: y15 });
      throw y15;
    }
  }
  async _exchangeCodeForSession(e8) {
    let t10 = await D2(this.storage, `${this.storageKey}-code-verifier`), [r21, s20] = (t10 ?? "").split("/");
    try {
      let { data: n18, error: o21 } = await _2(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, { headers: this.headers, body: { auth_code: e8, code_verifier: r21 }, xform: T2 });
      if (await N2(this.storage, `${this.storageKey}-code-verifier`), o21) throw o21;
      if (!n18 || !n18.session || !n18.user) {
        let a16 = new j2();
        return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: a16 });
      }
      return n18.session && (await this._saveSession(n18.session), await this._notifyAllSubscribers("SIGNED_IN", n18.session)), this._returnResult({ data: Object.assign(Object.assign({}, n18), { redirectType: s20 ?? null }), error: o21 });
    } catch (n18) {
      if (h(n18)) return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: n18 });
      throw n18;
    }
  }
  async signInWithIdToken(e8) {
    try {
      let { options: t10, provider: r21, token: s20, access_token: n18, nonce: o21 } = e8, a16 = await _2(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, body: { provider: r21, id_token: s20, access_token: n18, nonce: o21, gotrue_meta_security: { captcha_token: t10?.captchaToken } }, xform: T2 }), { data: l19, error: u18 } = a16;
      if (u18) return this._returnResult({ data: { user: null, session: null }, error: u18 });
      if (!l19 || !l19.session || !l19.user) {
        let c19 = new j2();
        return this._returnResult({ data: { user: null, session: null }, error: c19 });
      }
      return l19.session && (await this._saveSession(l19.session), await this._notifyAllSubscribers("SIGNED_IN", l19.session)), this._returnResult({ data: l19, error: u18 });
    } catch (t10) {
      if (h(t10)) return this._returnResult({ data: { user: null, session: null }, error: t10 });
      throw t10;
    }
  }
  async signInWithOtp(e8) {
    var t10, r21, s20, n18, o21;
    try {
      if ("email" in e8) {
        let { email: a16, options: l19 } = e8, u18 = null, c19 = null;
        this.flowType === "pkce" && ([u18, c19] = await z2(this.storage, this.storageKey));
        let { error: g12 } = await _2(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { email: a16, data: (t10 = l19?.data) !== null && t10 !== void 0 ? t10 : {}, create_user: (r21 = l19?.shouldCreateUser) !== null && r21 !== void 0 ? r21 : true, gotrue_meta_security: { captcha_token: l19?.captchaToken }, code_challenge: u18, code_challenge_method: c19 }, redirectTo: l19?.emailRedirectTo });
        return this._returnResult({ data: { user: null, session: null }, error: g12 });
      }
      if ("phone" in e8) {
        let { phone: a16, options: l19 } = e8, { data: u18, error: c19 } = await _2(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { phone: a16, data: (s20 = l19?.data) !== null && s20 !== void 0 ? s20 : {}, create_user: (n18 = l19?.shouldCreateUser) !== null && n18 !== void 0 ? n18 : true, gotrue_meta_security: { captcha_token: l19?.captchaToken }, channel: (o21 = l19?.channel) !== null && o21 !== void 0 ? o21 : "sms" } });
        return this._returnResult({ data: { user: null, session: null, messageId: u18?.message_id }, error: c19 });
      }
      throw new M2("You must provide either an email or phone number.");
    } catch (a16) {
      if (h(a16)) return this._returnResult({ data: { user: null, session: null }, error: a16 });
      throw a16;
    }
  }
  async verifyOtp(e8) {
    var t10, r21;
    try {
      let s20, n18;
      "options" in e8 && (s20 = (t10 = e8.options) === null || t10 === void 0 ? void 0 : t10.redirectTo, n18 = (r21 = e8.options) === null || r21 === void 0 ? void 0 : r21.captchaToken);
      let { data: o21, error: a16 } = await _2(this.fetch, "POST", `${this.url}/verify`, { headers: this.headers, body: Object.assign(Object.assign({}, e8), { gotrue_meta_security: { captcha_token: n18 } }), redirectTo: s20, xform: T2 });
      if (a16) throw a16;
      if (!o21) throw new Error("An error occurred on token verification.");
      let l19 = o21.session, u18 = o21.user;
      return l19?.access_token && (await this._saveSession(l19), await this._notifyAllSubscribers(e8.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", l19)), this._returnResult({ data: { user: u18, session: l19 }, error: null });
    } catch (s20) {
      if (h(s20)) return this._returnResult({ data: { user: null, session: null }, error: s20 });
      throw s20;
    }
  }
  async signInWithSSO(e8) {
    var t10, r21, s20;
    try {
      let n18 = null, o21 = null;
      this.flowType === "pkce" && ([n18, o21] = await z2(this.storage, this.storageKey));
      let a16 = await _2(this.fetch, "POST", `${this.url}/sso`, { body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e8 ? { provider_id: e8.providerId } : null), "domain" in e8 ? { domain: e8.domain } : null), { redirect_to: (r21 = (t10 = e8.options) === null || t10 === void 0 ? void 0 : t10.redirectTo) !== null && r21 !== void 0 ? r21 : void 0 }), !((s20 = e8?.options) === null || s20 === void 0) && s20.captchaToken ? { gotrue_meta_security: { captcha_token: e8.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: n18, code_challenge_method: o21 }), headers: this.headers, xform: tt });
      return this._returnResult(a16);
    } catch (n18) {
      if (h(n18)) return this._returnResult({ data: null, error: n18 });
      throw n18;
    }
  }
  async reauthenticate() {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._reauthenticate());
  }
  async _reauthenticate() {
    try {
      return await this._useSession(async (e8) => {
        let { data: { session: t10 }, error: r21 } = e8;
        if (r21) throw r21;
        if (!t10) throw new I2();
        let { error: s20 } = await _2(this.fetch, "GET", `${this.url}/reauthenticate`, { headers: this.headers, jwt: t10.access_token });
        return this._returnResult({ data: { user: null, session: null }, error: s20 });
      });
    } catch (e8) {
      if (h(e8)) return this._returnResult({ data: { user: null, session: null }, error: e8 });
      throw e8;
    }
  }
  async resend(e8) {
    try {
      let t10 = `${this.url}/resend`;
      if ("email" in e8) {
        let { email: r21, type: s20, options: n18 } = e8, { error: o21 } = await _2(this.fetch, "POST", t10, { headers: this.headers, body: { email: r21, type: s20, gotrue_meta_security: { captcha_token: n18?.captchaToken } }, redirectTo: n18?.emailRedirectTo });
        return this._returnResult({ data: { user: null, session: null }, error: o21 });
      } else if ("phone" in e8) {
        let { phone: r21, type: s20, options: n18 } = e8, { data: o21, error: a16 } = await _2(this.fetch, "POST", t10, { headers: this.headers, body: { phone: r21, type: s20, gotrue_meta_security: { captcha_token: n18?.captchaToken } } });
        return this._returnResult({ data: { user: null, session: null, messageId: o21?.message_id }, error: a16 });
      }
      throw new M2("You must provide either an email or phone number and a type");
    } catch (t10) {
      if (h(t10)) return this._returnResult({ data: { user: null, session: null }, error: t10 });
      throw t10;
    }
  }
  async getSession() {
    return await this.initializePromise, await this._acquireLock(-1, async () => this._useSession(async (t10) => t10));
  }
  async _acquireLock(e8, t10) {
    this._debug("#_acquireLock", "begin", e8);
    try {
      if (this.lockAcquired) {
        let r21 = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), s20 = (async () => (await r21, await t10()))();
        return this.pendingInLock.push((async () => {
          try {
            await s20;
          } catch {
          }
        })()), s20;
      }
      return await this.lock(`lock:${this.storageKey}`, e8, async () => {
        this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
        try {
          this.lockAcquired = true;
          let r21 = t10();
          for (this.pendingInLock.push((async () => {
            try {
              await r21;
            } catch {
            }
          })()), await r21; this.pendingInLock.length; ) {
            let s20 = [...this.pendingInLock];
            await Promise.all(s20), this.pendingInLock.splice(0, s20.length);
          }
          return await r21;
        } finally {
          this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = false;
        }
      });
    } finally {
      this._debug("#_acquireLock", "end");
    }
  }
  async _useSession(e8) {
    this._debug("#_useSession", "begin");
    try {
      let t10 = await this.__loadSession();
      return await e8(t10);
    } finally {
      this._debug("#_useSession", "end");
    }
  }
  async __loadSession() {
    this._debug("#__loadSession()", "begin"), this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
    try {
      let e8 = null, t10 = await D2(this.storage, this.storageKey);
      if (this._debug("#getSession()", "session from storage", t10), t10 !== null && (this._isValidSession(t10) ? e8 = t10 : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !e8) return { data: { session: null }, error: null };
      let r21 = e8.expires_at ? e8.expires_at * 1e3 - Date.now() < ae : false;
      if (this._debug("#__loadSession()", `session has${r21 ? "" : " not"} expired`, "expires_at", e8.expires_at), !r21) {
        if (this.userStorage) {
          let o21 = await D2(this.userStorage, this.storageKey + "-user");
          o21?.user ? e8.user = o21.user : e8.user = _e();
        }
        if (this.storage.isServer && e8.user && !e8.user.__isUserNotAvailableProxy) {
          let o21 = { value: this.suppressGetSessionWarning };
          e8.user = Qe(e8.user, o21), o21.value && (this.suppressGetSessionWarning = true);
        }
        return { data: { session: e8 }, error: null };
      }
      let { data: s20, error: n18 } = await this._callRefreshToken(e8.refresh_token);
      return n18 ? this._returnResult({ data: { session: null }, error: n18 }) : this._returnResult({ data: { session: s20 }, error: null });
    } finally {
      this._debug("#__loadSession()", "end");
    }
  }
  async getUser(e8) {
    return e8 ? await this._getUser(e8) : (await this.initializePromise, await this._acquireLock(-1, async () => await this._getUser()));
  }
  async _getUser(e8) {
    try {
      return e8 ? await _2(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: e8, xform: C2 }) : await this._useSession(async (t10) => {
        var r21, s20, n18;
        let { data: o21, error: a16 } = t10;
        if (a16) throw a16;
        return !(!((r21 = o21.session) === null || r21 === void 0) && r21.access_token) && !this.hasCustomAuthorizationHeader ? { data: { user: null }, error: new I2() } : await _2(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: (n18 = (s20 = o21.session) === null || s20 === void 0 ? void 0 : s20.access_token) !== null && n18 !== void 0 ? n18 : void 0, xform: C2 });
      });
    } catch (t10) {
      if (h(t10)) return qe(t10) && (await this._removeSession(), await N2(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({ data: { user: null }, error: t10 });
      throw t10;
    }
  }
  async updateUser(e8, t10 = {}) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._updateUser(e8, t10));
  }
  async _updateUser(e8, t10 = {}) {
    try {
      return await this._useSession(async (r21) => {
        let { data: s20, error: n18 } = r21;
        if (n18) throw n18;
        if (!s20.session) throw new I2();
        let o21 = s20.session, a16 = null, l19 = null;
        this.flowType === "pkce" && e8.email != null && ([a16, l19] = await z2(this.storage, this.storageKey));
        let { data: u18, error: c19 } = await _2(this.fetch, "PUT", `${this.url}/user`, { headers: this.headers, redirectTo: t10?.emailRedirectTo, body: Object.assign(Object.assign({}, e8), { code_challenge: a16, code_challenge_method: l19 }), jwt: o21.access_token, xform: C2 });
        if (c19) throw c19;
        return o21.user = u18.user, await this._saveSession(o21), await this._notifyAllSubscribers("USER_UPDATED", o21), this._returnResult({ data: { user: o21.user }, error: null });
      });
    } catch (r21) {
      if (h(r21)) return this._returnResult({ data: { user: null }, error: r21 });
      throw r21;
    }
  }
  async setSession(e8) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._setSession(e8));
  }
  async _setSession(e8) {
    try {
      if (!e8.access_token || !e8.refresh_token) throw new I2();
      let t10 = Date.now() / 1e3, r21 = t10, s20 = true, n18 = null, { payload: o21 } = fe(e8.access_token);
      if (o21.exp && (r21 = o21.exp, s20 = r21 <= t10), s20) {
        let { data: a16, error: l19 } = await this._callRefreshToken(e8.refresh_token);
        if (l19) return this._returnResult({ data: { user: null, session: null }, error: l19 });
        if (!a16) return { data: { user: null, session: null }, error: null };
        n18 = a16;
      } else {
        let { data: a16, error: l19 } = await this._getUser(e8.access_token);
        if (l19) throw l19;
        n18 = { access_token: e8.access_token, refresh_token: e8.refresh_token, user: a16.user, token_type: "bearer", expires_in: r21 - t10, expires_at: r21 }, await this._saveSession(n18), await this._notifyAllSubscribers("SIGNED_IN", n18);
      }
      return this._returnResult({ data: { user: n18.user, session: n18 }, error: null });
    } catch (t10) {
      if (h(t10)) return this._returnResult({ data: { session: null, user: null }, error: t10 });
      throw t10;
    }
  }
  async refreshSession(e8) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._refreshSession(e8));
  }
  async _refreshSession(e8) {
    try {
      return await this._useSession(async (t10) => {
        var r21;
        if (!e8) {
          let { data: o21, error: a16 } = t10;
          if (a16) throw a16;
          e8 = (r21 = o21.session) !== null && r21 !== void 0 ? r21 : void 0;
        }
        if (!e8?.refresh_token) throw new I2();
        let { data: s20, error: n18 } = await this._callRefreshToken(e8.refresh_token);
        return n18 ? this._returnResult({ data: { user: null, session: null }, error: n18 }) : s20 ? this._returnResult({ data: { user: s20.user, session: s20 }, error: null }) : this._returnResult({ data: { user: null, session: null }, error: null });
      });
    } catch (t10) {
      if (h(t10)) return this._returnResult({ data: { user: null, session: null }, error: t10 });
      throw t10;
    }
  }
  async _getSessionFromURL(e8, t10) {
    try {
      if (!k2()) throw new B2("No browser detected.");
      if (e8.error || e8.error_description || e8.error_code) throw new B2(e8.error_description || "Error in URL with unspecified error_description", { error: e8.error || "unspecified_error", code: e8.error_code || "unspecified_code" });
      switch (t10) {
        case "implicit":
          if (this.flowType === "pkce") throw new re("Not a valid PKCE flow url.");
          break;
        case "pkce":
          if (this.flowType === "implicit") throw new B2("Not a valid implicit grant flow url.");
          break;
        default:
      }
      if (t10 === "pkce") {
        if (this._debug("#_initialize()", "begin", "is PKCE flow", true), !e8.code) throw new re("No code detected.");
        let { data: w25, error: f17 } = await this._exchangeCodeForSession(e8.code);
        if (f17) throw f17;
        let R20 = new URL(window.location.href);
        return R20.searchParams.delete("code"), window.history.replaceState(window.history.state, "", R20.toString()), { data: { session: w25.session, redirectType: null }, error: null };
      }
      let { provider_token: r21, provider_refresh_token: s20, access_token: n18, refresh_token: o21, expires_in: a16, expires_at: l19, token_type: u18 } = e8;
      if (!n18 || !a16 || !o21 || !u18) throw new B2("No session defined in URL");
      let c19 = Math.round(Date.now() / 1e3), g12 = parseInt(a16), d13 = c19 + g12;
      l19 && (d13 = parseInt(l19));
      let p21 = d13 - c19;
      p21 * 1e3 <= W2 && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p21}s, should have been closer to ${g12}s`);
      let v13 = d13 - g12;
      c19 - v13 >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", v13, d13, c19) : c19 - v13 < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", v13, d13, c19);
      let { data: b12, error: y15 } = await this._getUser(n18);
      if (y15) throw y15;
      let E21 = { provider_token: r21, provider_refresh_token: s20, access_token: n18, expires_in: g12, expires_at: d13, refresh_token: o21, token_type: u18, user: b12.user };
      return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), this._returnResult({ data: { session: E21, redirectType: e8.type }, error: null });
    } catch (r21) {
      if (h(r21)) return this._returnResult({ data: { session: null, redirectType: null }, error: r21 });
      throw r21;
    }
  }
  _isImplicitGrantCallback(e8) {
    return !!(e8.access_token || e8.error_description);
  }
  async _isPKCECallback(e8) {
    let t10 = await D2(this.storage, `${this.storageKey}-code-verifier`);
    return !!(e8.code && t10);
  }
  async signOut(e8 = { scope: "global" }) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._signOut(e8));
  }
  async _signOut({ scope: e8 } = { scope: "global" }) {
    return await this._useSession(async (t10) => {
      var r21;
      let { data: s20, error: n18 } = t10;
      if (n18) return this._returnResult({ error: n18 });
      let o21 = (r21 = s20.session) === null || r21 === void 0 ? void 0 : r21.access_token;
      if (o21) {
        let { error: a16 } = await this.admin.signOut(o21, e8);
        if (a16 && !(Le(a16) && (a16.status === 404 || a16.status === 401 || a16.status === 403))) return this._returnResult({ error: a16 });
      }
      return e8 !== "others" && (await this._removeSession(), await N2(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({ error: null });
    });
  }
  onAuthStateChange(e8) {
    let t10 = Fe(), r21 = { id: t10, callback: e8, unsubscribe: () => {
      this._debug("#unsubscribe()", "state change callback with id removed", t10), this.stateChangeEmitters.delete(t10);
    } };
    return this._debug("#onAuthStateChange()", "registered callback with id", t10), this.stateChangeEmitters.set(t10, r21), (async () => (await this.initializePromise, await this._acquireLock(-1, async () => {
      this._emitInitialSession(t10);
    })))(), { data: { subscription: r21 } };
  }
  async _emitInitialSession(e8) {
    return await this._useSession(async (t10) => {
      var r21, s20;
      try {
        let { data: { session: n18 }, error: o21 } = t10;
        if (o21) throw o21;
        await ((r21 = this.stateChangeEmitters.get(e8)) === null || r21 === void 0 ? void 0 : r21.callback("INITIAL_SESSION", n18)), this._debug("INITIAL_SESSION", "callback id", e8, "session", n18);
      } catch (n18) {
        await ((s20 = this.stateChangeEmitters.get(e8)) === null || s20 === void 0 ? void 0 : s20.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e8, "error", n18), console.error(n18);
      }
    });
  }
  async resetPasswordForEmail(e8, t10 = {}) {
    let r21 = null, s20 = null;
    this.flowType === "pkce" && ([r21, s20] = await z2(this.storage, this.storageKey, true));
    try {
      return await _2(this.fetch, "POST", `${this.url}/recover`, { body: { email: e8, code_challenge: r21, code_challenge_method: s20, gotrue_meta_security: { captcha_token: t10.captchaToken } }, headers: this.headers, redirectTo: t10.redirectTo });
    } catch (n18) {
      if (h(n18)) return this._returnResult({ data: null, error: n18 });
      throw n18;
    }
  }
  async getUserIdentities() {
    var e8;
    try {
      let { data: t10, error: r21 } = await this.getUser();
      if (r21) throw r21;
      return this._returnResult({ data: { identities: (e8 = t10.user.identities) !== null && e8 !== void 0 ? e8 : [] }, error: null });
    } catch (t10) {
      if (h(t10)) return this._returnResult({ data: null, error: t10 });
      throw t10;
    }
  }
  async linkIdentity(e8) {
    return "token" in e8 ? this.linkIdentityIdToken(e8) : this.linkIdentityOAuth(e8);
  }
  async linkIdentityOAuth(e8) {
    var t10;
    try {
      let { data: r21, error: s20 } = await this._useSession(async (n18) => {
        var o21, a16, l19, u18, c19;
        let { data: g12, error: d13 } = n18;
        if (d13) throw d13;
        let p21 = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e8.provider, { redirectTo: (o21 = e8.options) === null || o21 === void 0 ? void 0 : o21.redirectTo, scopes: (a16 = e8.options) === null || a16 === void 0 ? void 0 : a16.scopes, queryParams: (l19 = e8.options) === null || l19 === void 0 ? void 0 : l19.queryParams, skipBrowserRedirect: true });
        return await _2(this.fetch, "GET", p21, { headers: this.headers, jwt: (c19 = (u18 = g12.session) === null || u18 === void 0 ? void 0 : u18.access_token) !== null && c19 !== void 0 ? c19 : void 0 });
      });
      if (s20) throw s20;
      return k2() && !(!((t10 = e8.options) === null || t10 === void 0) && t10.skipBrowserRedirect) && window.location.assign(r21?.url), this._returnResult({ data: { provider: e8.provider, url: r21?.url }, error: null });
    } catch (r21) {
      if (h(r21)) return this._returnResult({ data: { provider: e8.provider, url: null }, error: r21 });
      throw r21;
    }
  }
  async linkIdentityIdToken(e8) {
    return await this._useSession(async (t10) => {
      var r21;
      try {
        let { error: s20, data: { session: n18 } } = t10;
        if (s20) throw s20;
        let { options: o21, provider: a16, token: l19, access_token: u18, nonce: c19 } = e8, g12 = await _2(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, jwt: (r21 = n18?.access_token) !== null && r21 !== void 0 ? r21 : void 0, body: { provider: a16, id_token: l19, access_token: u18, nonce: c19, link_identity: true, gotrue_meta_security: { captcha_token: o21?.captchaToken } }, xform: T2 }), { data: d13, error: p21 } = g12;
        return p21 ? this._returnResult({ data: { user: null, session: null }, error: p21 }) : !d13 || !d13.session || !d13.user ? this._returnResult({ data: { user: null, session: null }, error: new j2() }) : (d13.session && (await this._saveSession(d13.session), await this._notifyAllSubscribers("USER_UPDATED", d13.session)), this._returnResult({ data: d13, error: p21 }));
      } catch (s20) {
        if (h(s20)) return this._returnResult({ data: { user: null, session: null }, error: s20 });
        throw s20;
      }
    });
  }
  async unlinkIdentity(e8) {
    try {
      return await this._useSession(async (t10) => {
        var r21, s20;
        let { data: n18, error: o21 } = t10;
        if (o21) throw o21;
        return await _2(this.fetch, "DELETE", `${this.url}/user/identities/${e8.identity_id}`, { headers: this.headers, jwt: (s20 = (r21 = n18.session) === null || r21 === void 0 ? void 0 : r21.access_token) !== null && s20 !== void 0 ? s20 : void 0 });
      });
    } catch (t10) {
      if (h(t10)) return this._returnResult({ data: null, error: t10 });
      throw t10;
    }
  }
  async _refreshAccessToken(e8) {
    let t10 = `#_refreshAccessToken(${e8.substring(0, 5)}...)`;
    this._debug(t10, "begin");
    try {
      let r21 = Date.now();
      return await He(async (s20) => (s20 > 0 && await Je(200 * Math.pow(2, s20 - 1)), this._debug(t10, "refreshing attempt", s20), await _2(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, { body: { refresh_token: e8 }, headers: this.headers, xform: T2 })), (s20, n18) => {
        let o21 = 200 * Math.pow(2, s20);
        return n18 && ue(n18) && Date.now() + o21 - r21 < W2;
      });
    } catch (r21) {
      if (this._debug(t10, "error", r21), h(r21)) return this._returnResult({ data: { session: null, user: null }, error: r21 });
      throw r21;
    } finally {
      this._debug(t10, "end");
    }
  }
  _isValidSession(e8) {
    return typeof e8 == "object" && e8 !== null && "access_token" in e8 && "refresh_token" in e8 && "expires_at" in e8;
  }
  async _handleProviderSignIn(e8, t10) {
    let r21 = await this._getUrlForProvider(`${this.url}/authorize`, e8, { redirectTo: t10.redirectTo, scopes: t10.scopes, queryParams: t10.queryParams });
    return this._debug("#_handleProviderSignIn()", "provider", e8, "options", t10, "url", r21), k2() && !t10.skipBrowserRedirect && window.location.assign(r21), { data: { provider: e8, url: r21 }, error: null };
  }
  async _recoverAndRefresh() {
    var e8, t10;
    let r21 = "#_recoverAndRefresh()";
    this._debug(r21, "begin");
    try {
      let s20 = await D2(this.storage, this.storageKey);
      if (s20 && this.userStorage) {
        let o21 = await D2(this.userStorage, this.storageKey + "-user");
        !this.storage.isServer && Object.is(this.storage, this.userStorage) && !o21 && (o21 = { user: s20.user }, await V2(this.userStorage, this.storageKey + "-user", o21)), s20.user = (e8 = o21?.user) !== null && e8 !== void 0 ? e8 : _e();
      } else if (s20 && !s20.user && !s20.user) {
        let o21 = await D2(this.storage, this.storageKey + "-user");
        o21 && o21?.user ? (s20.user = o21.user, await N2(this.storage, this.storageKey + "-user"), await V2(this.storage, this.storageKey, s20)) : s20.user = _e();
      }
      if (this._debug(r21, "session from storage", s20), !this._isValidSession(s20)) {
        this._debug(r21, "session is not valid"), s20 !== null && await this._removeSession();
        return;
      }
      let n18 = ((t10 = s20.expires_at) !== null && t10 !== void 0 ? t10 : 1 / 0) * 1e3 - Date.now() < ae;
      if (this._debug(r21, `session has${n18 ? "" : " not"} expired with margin of ${ae}s`), n18) {
        if (this.autoRefreshToken && s20.refresh_token) {
          let { error: o21 } = await this._callRefreshToken(s20.refresh_token);
          o21 && (console.error(o21), ue(o21) || (this._debug(r21, "refresh failed with a non-retryable error, removing the session", o21), await this._removeSession()));
        }
      } else if (s20.user && s20.user.__isUserNotAvailableProxy === true) try {
        let { data: o21, error: a16 } = await this._getUser(s20.access_token);
        !a16 && o21?.user ? (s20.user = o21.user, await this._saveSession(s20), await this._notifyAllSubscribers("SIGNED_IN", s20)) : this._debug(r21, "could not get user data, skipping SIGNED_IN notification");
      } catch (o21) {
        console.error("Error getting user data:", o21), this._debug(r21, "error getting user data, skipping SIGNED_IN notification", o21);
      }
      else await this._notifyAllSubscribers("SIGNED_IN", s20);
    } catch (s20) {
      this._debug(r21, "error", s20), console.error(s20);
      return;
    } finally {
      this._debug(r21, "end");
    }
  }
  async _callRefreshToken(e8) {
    var t10, r21;
    if (!e8) throw new I2();
    if (this.refreshingDeferred) return this.refreshingDeferred.promise;
    let s20 = `#_callRefreshToken(${e8.substring(0, 5)}...)`;
    this._debug(s20, "begin");
    try {
      this.refreshingDeferred = new ie();
      let { data: n18, error: o21 } = await this._refreshAccessToken(e8);
      if (o21) throw o21;
      if (!n18.session) throw new I2();
      await this._saveSession(n18.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", n18.session);
      let a16 = { data: n18.session, error: null };
      return this.refreshingDeferred.resolve(a16), a16;
    } catch (n18) {
      if (this._debug(s20, "error", n18), h(n18)) {
        let o21 = { data: null, error: n18 };
        return ue(n18) || await this._removeSession(), (t10 = this.refreshingDeferred) === null || t10 === void 0 || t10.resolve(o21), o21;
      }
      throw (r21 = this.refreshingDeferred) === null || r21 === void 0 || r21.reject(n18), n18;
    } finally {
      this.refreshingDeferred = null, this._debug(s20, "end");
    }
  }
  async _notifyAllSubscribers(e8, t10, r21 = true) {
    let s20 = `#_notifyAllSubscribers(${e8})`;
    this._debug(s20, "begin", t10, `broadcast = ${r21}`);
    try {
      this.broadcastChannel && r21 && this.broadcastChannel.postMessage({ event: e8, session: t10 });
      let n18 = [], o21 = Array.from(this.stateChangeEmitters.values()).map(async (a16) => {
        try {
          await a16.callback(e8, t10);
        } catch (l19) {
          n18.push(l19);
        }
      });
      if (await Promise.all(o21), n18.length > 0) {
        for (let a16 = 0; a16 < n18.length; a16 += 1) console.error(n18[a16]);
        throw n18[0];
      }
    } finally {
      this._debug(s20, "end");
    }
  }
  async _saveSession(e8) {
    this._debug("#_saveSession()", e8), this.suppressGetSessionWarning = true;
    let t10 = Object.assign({}, e8), r21 = t10.user && t10.user.__isUserNotAvailableProxy === true;
    if (this.userStorage) {
      !r21 && t10.user && await V2(this.userStorage, this.storageKey + "-user", { user: t10.user });
      let s20 = Object.assign({}, t10);
      delete s20.user;
      let n18 = Se(s20);
      await V2(this.storage, this.storageKey, n18);
    } else {
      let s20 = Se(t10);
      await V2(this.storage, this.storageKey, s20);
    }
  }
  async _removeSession() {
    this._debug("#_removeSession()"), await N2(this.storage, this.storageKey), await N2(this.storage, this.storageKey + "-code-verifier"), await N2(this.storage, this.storageKey + "-user"), this.userStorage && await N2(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null);
  }
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    let e8 = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      e8 && k2() && window?.removeEventListener && window.removeEventListener("visibilitychange", e8);
    } catch (t10) {
      console.error("removing visibilitychange callback failed", t10);
    }
  }
  async _startAutoRefresh() {
    await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
    let e8 = setInterval(() => this._autoRefreshTokenTick(), W2);
    this.autoRefreshTicker = e8, e8 && typeof e8 == "object" && typeof e8.unref == "function" ? e8.unref() : typeof Deno < "u" && typeof Deno.unrefTimer == "function" && Deno.unrefTimer(e8), setTimeout(async () => {
      await this.initializePromise, await this._autoRefreshTokenTick();
    }, 0);
  }
  async _stopAutoRefresh() {
    this._debug("#_stopAutoRefresh()");
    let e8 = this.autoRefreshTicker;
    this.autoRefreshTicker = null, e8 && clearInterval(e8);
  }
  async startAutoRefresh() {
    this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
  }
  async stopAutoRefresh() {
    this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
  }
  async _autoRefreshTokenTick() {
    this._debug("#_autoRefreshTokenTick()", "begin");
    try {
      await this._acquireLock(0, async () => {
        try {
          let e8 = Date.now();
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r21 } } = t10;
              if (!r21 || !r21.refresh_token || !r21.expires_at) {
                this._debug("#_autoRefreshTokenTick()", "no session");
                return;
              }
              let s20 = Math.floor((r21.expires_at * 1e3 - e8) / W2);
              this._debug("#_autoRefreshTokenTick()", `access token expires in ${s20} ticks, a tick lasts ${W2}ms, refresh threshold is ${oe} ticks`), s20 <= oe && await this._callRefreshToken(r21.refresh_token);
            });
          } catch (t10) {
            console.error("Auto refresh tick failed with error. This is likely a transient error.", t10);
          }
        } finally {
          this._debug("#_autoRefreshTokenTick()", "end");
        }
      });
    } catch (e8) {
      if (e8.isAcquireTimeout || e8 instanceof Q2) this._debug("auto refresh token tick lock not available");
      else throw e8;
    }
  }
  async _handleVisibilityChange() {
    if (this._debug("#_handleVisibilityChange()"), !k2() || !window?.addEventListener) return this.autoRefreshToken && this.startAutoRefresh(), false;
    try {
      this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false), window?.addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(true);
    } catch (e8) {
      console.error("_handleVisibilityChange", e8);
    }
  }
  async _onVisibilityChanged(e8) {
    let t10 = `#_onVisibilityChanged(${e8})`;
    this._debug(t10, "visibilityState", document.visibilityState), document.visibilityState === "visible" ? (this.autoRefreshToken && this._startAutoRefresh(), e8 || (await this.initializePromise, await this._acquireLock(-1, async () => {
      if (document.visibilityState !== "visible") {
        this._debug(t10, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
        return;
      }
      await this._recoverAndRefresh();
    }))) : document.visibilityState === "hidden" && this.autoRefreshToken && this._stopAutoRefresh();
  }
  async _getUrlForProvider(e8, t10, r21) {
    let s20 = [`provider=${encodeURIComponent(t10)}`];
    if (r21?.redirectTo && s20.push(`redirect_to=${encodeURIComponent(r21.redirectTo)}`), r21?.scopes && s20.push(`scopes=${encodeURIComponent(r21.scopes)}`), this.flowType === "pkce") {
      let [n18, o21] = await z2(this.storage, this.storageKey), a16 = new URLSearchParams({ code_challenge: `${encodeURIComponent(n18)}`, code_challenge_method: `${encodeURIComponent(o21)}` });
      s20.push(a16.toString());
    }
    if (r21?.queryParams) {
      let n18 = new URLSearchParams(r21.queryParams);
      s20.push(n18.toString());
    }
    return r21?.skipBrowserRedirect && s20.push(`skip_http_redirect=${r21.skipBrowserRedirect}`), `${e8}?${s20.join("&")}`;
  }
  async _unenroll(e8) {
    try {
      return await this._useSession(async (t10) => {
        var r21;
        let { data: s20, error: n18 } = t10;
        return n18 ? this._returnResult({ data: null, error: n18 }) : await _2(this.fetch, "DELETE", `${this.url}/factors/${e8.factorId}`, { headers: this.headers, jwt: (r21 = s20?.session) === null || r21 === void 0 ? void 0 : r21.access_token });
      });
    } catch (t10) {
      if (h(t10)) return this._returnResult({ data: null, error: t10 });
      throw t10;
    }
  }
  async _enroll(e8) {
    try {
      return await this._useSession(async (t10) => {
        var r21, s20;
        let { data: n18, error: o21 } = t10;
        if (o21) return this._returnResult({ data: null, error: o21 });
        let a16 = Object.assign({ friendly_name: e8.friendlyName, factor_type: e8.factorType }, e8.factorType === "phone" ? { phone: e8.phone } : e8.factorType === "totp" ? { issuer: e8.issuer } : {}), { data: l19, error: u18 } = await _2(this.fetch, "POST", `${this.url}/factors`, { body: a16, headers: this.headers, jwt: (r21 = n18?.session) === null || r21 === void 0 ? void 0 : r21.access_token });
        return u18 ? this._returnResult({ data: null, error: u18 }) : (e8.factorType === "totp" && l19.type === "totp" && (!((s20 = l19?.totp) === null || s20 === void 0) && s20.qr_code) && (l19.totp.qr_code = `data:image/svg+xml;utf-8,${l19.totp.qr_code}`), this._returnResult({ data: l19, error: null }));
      });
    } catch (t10) {
      if (h(t10)) return this._returnResult({ data: null, error: t10 });
      throw t10;
    }
  }
  async _verify(e8) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t10) => {
          var r21;
          let { data: s20, error: n18 } = t10;
          if (n18) return this._returnResult({ data: null, error: n18 });
          let o21 = Object.assign({ challenge_id: e8.challengeId }, "webauthn" in e8 ? { webauthn: Object.assign(Object.assign({}, e8.webauthn), { credential_response: e8.webauthn.type === "create" ? _t(e8.webauthn.credential_response) : gt(e8.webauthn.credential_response) }) } : { code: e8.code }), { data: a16, error: l19 } = await _2(this.fetch, "POST", `${this.url}/factors/${e8.factorId}/verify`, { body: o21, headers: this.headers, jwt: (r21 = s20?.session) === null || r21 === void 0 ? void 0 : r21.access_token });
          return l19 ? this._returnResult({ data: null, error: l19 }) : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + a16.expires_in }, a16)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", a16), this._returnResult({ data: a16, error: l19 }));
        });
      } catch (t10) {
        if (h(t10)) return this._returnResult({ data: null, error: t10 });
        throw t10;
      }
    });
  }
  async _challenge(e8) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t10) => {
          var r21;
          let { data: s20, error: n18 } = t10;
          if (n18) return this._returnResult({ data: null, error: n18 });
          let o21 = await _2(this.fetch, "POST", `${this.url}/factors/${e8.factorId}/challenge`, { body: e8, headers: this.headers, jwt: (r21 = s20?.session) === null || r21 === void 0 ? void 0 : r21.access_token });
          if (o21.error) return o21;
          let { data: a16 } = o21;
          if (a16.type !== "webauthn") return { data: a16, error: null };
          switch (a16.webauthn.type) {
            case "create":
              return { data: Object.assign(Object.assign({}, a16), { webauthn: Object.assign(Object.assign({}, a16.webauthn), { credential_options: Object.assign(Object.assign({}, a16.webauthn.credential_options), { publicKey: dt(a16.webauthn.credential_options.publicKey) }) }) }), error: null };
            case "request":
              return { data: Object.assign(Object.assign({}, a16), { webauthn: Object.assign(Object.assign({}, a16.webauthn), { credential_options: Object.assign(Object.assign({}, a16.webauthn.credential_options), { publicKey: ft(a16.webauthn.credential_options.publicKey) }) }) }), error: null };
          }
        });
      } catch (t10) {
        if (h(t10)) return this._returnResult({ data: null, error: t10 });
        throw t10;
      }
    });
  }
  async _challengeAndVerify(e8) {
    let { data: t10, error: r21 } = await this._challenge({ factorId: e8.factorId });
    return r21 ? this._returnResult({ data: null, error: r21 }) : await this._verify({ factorId: e8.factorId, challengeId: t10.id, code: e8.code });
  }
  async _listFactors() {
    var e8;
    let { data: { user: t10 }, error: r21 } = await this.getUser();
    if (r21) return { data: null, error: r21 };
    let s20 = { all: [], phone: [], totp: [], webauthn: [] };
    for (let n18 of (e8 = t10?.factors) !== null && e8 !== void 0 ? e8 : []) s20.all.push(n18), n18.status === "verified" && s20[n18.factor_type].push(n18);
    return { data: s20, error: null };
  }
  async _getAuthenticatorAssuranceLevel() {
    var e8, t10;
    let { data: { session: r21 }, error: s20 } = await this.getSession();
    if (s20) return this._returnResult({ data: null, error: s20 });
    if (!r21) return { data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] }, error: null };
    let { payload: n18 } = fe(r21.access_token), o21 = null;
    n18.aal && (o21 = n18.aal);
    let a16 = o21;
    ((t10 = (e8 = r21.user.factors) === null || e8 === void 0 ? void 0 : e8.filter((c19) => c19.status === "verified")) !== null && t10 !== void 0 ? t10 : []).length > 0 && (a16 = "aal2");
    let u18 = n18.amr || [];
    return { data: { currentLevel: o21, nextLevel: a16, currentAuthenticationMethods: u18 }, error: null };
  }
  async _getAuthorizationDetails(e8) {
    try {
      return await this._useSession(async (t10) => {
        let { data: { session: r21 }, error: s20 } = t10;
        return s20 ? this._returnResult({ data: null, error: s20 }) : r21 ? await _2(this.fetch, "GET", `${this.url}/oauth/authorizations/${e8}`, { headers: this.headers, jwt: r21.access_token, xform: (n18) => ({ data: n18, error: null }) }) : this._returnResult({ data: null, error: new I2() });
      });
    } catch (t10) {
      if (h(t10)) return this._returnResult({ data: null, error: t10 });
      throw t10;
    }
  }
  async _approveAuthorization(e8, t10) {
    try {
      return await this._useSession(async (r21) => {
        let { data: { session: s20 }, error: n18 } = r21;
        if (n18) return this._returnResult({ data: null, error: n18 });
        if (!s20) return this._returnResult({ data: null, error: new I2() });
        let o21 = await _2(this.fetch, "POST", `${this.url}/oauth/authorizations/${e8}/consent`, { headers: this.headers, jwt: s20.access_token, body: { action: "approve" }, xform: (a16) => ({ data: a16, error: null }) });
        return o21.data && o21.data.redirect_url && k2() && !t10?.skipBrowserRedirect && window.location.assign(o21.data.redirect_url), o21;
      });
    } catch (r21) {
      if (h(r21)) return this._returnResult({ data: null, error: r21 });
      throw r21;
    }
  }
  async _denyAuthorization(e8, t10) {
    try {
      return await this._useSession(async (r21) => {
        let { data: { session: s20 }, error: n18 } = r21;
        if (n18) return this._returnResult({ data: null, error: n18 });
        if (!s20) return this._returnResult({ data: null, error: new I2() });
        let o21 = await _2(this.fetch, "POST", `${this.url}/oauth/authorizations/${e8}/consent`, { headers: this.headers, jwt: s20.access_token, body: { action: "deny" }, xform: (a16) => ({ data: a16, error: null }) });
        return o21.data && o21.data.redirect_url && k2() && !t10?.skipBrowserRedirect && window.location.assign(o21.data.redirect_url), o21;
      });
    } catch (r21) {
      if (h(r21)) return this._returnResult({ data: null, error: r21 });
      throw r21;
    }
  }
  async fetchJwk(e8, t10 = { keys: [] }) {
    let r21 = t10.keys.find((a16) => a16.kid === e8);
    if (r21) return r21;
    let s20 = Date.now();
    if (r21 = this.jwks.keys.find((a16) => a16.kid === e8), r21 && this.jwks_cached_at + $e > s20) return r21;
    let { data: n18, error: o21 } = await _2(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, { headers: this.headers });
    if (o21) throw o21;
    return !n18.keys || n18.keys.length === 0 || (this.jwks = n18, this.jwks_cached_at = s20, r21 = n18.keys.find((a16) => a16.kid === e8), !r21) ? null : r21;
  }
  async getClaims(e8, t10 = {}) {
    try {
      let r21 = e8;
      if (!r21) {
        let { data: p21, error: v13 } = await this.getSession();
        if (v13 || !p21.session) return this._returnResult({ data: null, error: v13 });
        r21 = p21.session.access_token;
      }
      let { header: s20, payload: n18, signature: o21, raw: { header: a16, payload: l19 } } = fe(r21);
      t10?.allowExpired || Xe(n18.exp);
      let u18 = !s20.alg || s20.alg.startsWith("HS") || !s20.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(s20.kid, t10?.keys ? { keys: t10.keys } : t10?.jwks);
      if (!u18) {
        let { error: p21 } = await this.getUser(r21);
        if (p21) throw p21;
        return { data: { claims: n18, header: s20, signature: o21 }, error: null };
      }
      let c19 = Ze(s20.alg), g12 = await crypto.subtle.importKey("jwk", u18, c19, true, ["verify"]);
      if (!await crypto.subtle.verify(c19, g12, o21, Be(`${a16}.${l19}`))) throw new G2("Invalid JWT signature");
      return { data: { claims: n18, header: s20, signature: o21 }, error: null };
    } catch (r21) {
      if (h(r21)) return this._returnResult({ data: null, error: r21 });
      throw r21;
    }
  }
};
ve.nextInstanceID = 0;

// vendor/neon/_neondatabase_auth_0.5.0-beta_es2022_dist_better-auth-helpers-DlzEQzcv.mjs
var g2 = 6e4;
var A2 = 1e4;
var I3 = "neon_auth_session_verifier";
var P2 = "neon_popup";
var T3 = "neon_popup_callback";
var F3 = "/auth/callback";
var R2 = "neon-auth:oauth-complete";
var e = { BadJwt: "bad_jwt", InvalidCredentials: "invalid_credentials", SessionExpired: "session_expired", SessionNotFound: "session_not_found", InvalidGrant: "invalid_grant", UserNotFound: "user_not_found", UserAlreadyExists: "user_already_exists", EmailExists: "email_exists", PhoneExists: "phone_exists", EmailNotConfirmed: "email_not_confirmed", PhoneNotConfirmed: "phone_not_confirmed", ValidationFailed: "validation_failed", BadJson: "bad_json", WeakPassword: "weak_password", EmailAddressInvalid: "email_address_invalid", FeatureNotSupported: "feature_not_supported", NotImplemented: "not_implemented", OAuthProviderNotSupported: "oauth_provider_not_supported", PhoneProviderDisabled: "phone_provider_disabled", MagicLinkNotSupported: "magic_link_not_supported", SsoProviderDisabled: "sso_provider_disabled", AnonymousProviderDisabled: "anonymous_provider_disabled", Web3ProviderDisabled: "web3_provider_disabled", BadOAuthCallback: "bad_oauth_callback", OAuthCallbackFailed: "oauth_callback_failed", OverRequestRateLimit: "over_request_rate_limit", OverEmailSendRateLimit: "over_email_send_rate_limit", OverSmsSendRateLimit: "over_sms_send_rate_limit", UnexpectedFailure: "unexpected_failure", InternalError: "internal_error", IdentityNotFound: "identity_not_found", UnknownError: "unknown_error" };
var _3 = { [e.BadJwt]: { code: e.BadJwt, status: 401, message: "Invalid or expired session token", description: "The JWT token is malformed, expired, or has an invalid signature" }, [e.InvalidCredentials]: { code: e.InvalidCredentials, status: 401, message: "Invalid email or password", description: "The provided credentials do not match any user account" }, [e.SessionExpired]: { code: e.SessionExpired, status: 401, message: "Session has expired", description: "The user session has exceeded its timeout period" }, [e.SessionNotFound]: { code: e.SessionNotFound, status: 401, message: "No active session found", description: "The user does not have an active session or the session was invalidated" }, [e.InvalidGrant]: { code: e.InvalidGrant, status: 401, message: "Invalid authorization grant", description: "OAuth/OIDC grant validation failed" }, [e.UserNotFound]: { code: e.UserNotFound, status: 404, message: "User not found", description: "No user exists with the provided identifier" }, [e.UserAlreadyExists]: { code: e.UserAlreadyExists, status: 409, message: "User already exists", description: "A user with this email or phone number is already registered" }, [e.EmailExists]: { code: e.EmailExists, status: 409, message: "Email address already registered", description: "This email address is already associated with an account" }, [e.PhoneExists]: { code: e.PhoneExists, status: 409, message: "Phone number already registered", description: "This phone number is already associated with an account" }, [e.EmailNotConfirmed]: { code: e.EmailNotConfirmed, status: 422, message: "Email verification required", description: "The user must verify their email before signing in" }, [e.PhoneNotConfirmed]: { code: e.PhoneNotConfirmed, status: 422, message: "Phone verification required", description: "The user must verify their phone number before signing in" }, [e.ValidationFailed]: { code: e.ValidationFailed, status: 400, message: "Invalid request parameters", description: "One or more request parameters are invalid or missing" }, [e.BadJson]: { code: e.BadJson, status: 400, message: "Invalid JSON in request body", description: "The request body contains malformed JSON" }, [e.WeakPassword]: { code: e.WeakPassword, status: 400, message: "Password does not meet security requirements", description: "The password is too weak or does not meet complexity requirements" }, [e.EmailAddressInvalid]: { code: e.EmailAddressInvalid, status: 400, message: "Invalid email address format", description: "The provided email address is not in a valid format" }, [e.FeatureNotSupported]: { code: e.FeatureNotSupported, status: 403, message: "Feature not available", description: "This feature is not supported in the current configuration" }, [e.NotImplemented]: { code: e.NotImplemented, status: 501, message: "Feature not implemented", description: "This feature has not been implemented yet" }, [e.OAuthProviderNotSupported]: { code: e.OAuthProviderNotSupported, status: 403, message: "OAuth provider not supported", description: "The requested OAuth provider is not enabled" }, [e.PhoneProviderDisabled]: { code: e.PhoneProviderDisabled, status: 403, message: "Phone authentication not available", description: "Phone number authentication is not enabled" }, [e.MagicLinkNotSupported]: { code: e.MagicLinkNotSupported, status: 403, message: "Magic link authentication not available", description: "Magic link authentication is not supported" }, [e.SsoProviderDisabled]: { code: e.SsoProviderDisabled, status: 403, message: "SSO not supported", description: "Enterprise SSO authentication is not available" }, [e.AnonymousProviderDisabled]: { code: e.AnonymousProviderDisabled, status: 403, message: "Anonymous authentication not available", description: "Anonymous sign-in is not enabled" }, [e.Web3ProviderDisabled]: { code: e.Web3ProviderDisabled, status: 403, message: "Web3 authentication not supported", description: "Web3/blockchain authentication is not available" }, [e.BadOAuthCallback]: { code: e.BadOAuthCallback, status: 400, message: "Invalid OAuth callback", description: "The OAuth callback request is missing required parameters" }, [e.OAuthCallbackFailed]: { code: e.OAuthCallbackFailed, status: 500, message: "OAuth authentication failed", description: "The OAuth callback completed but no session was created" }, [e.OverRequestRateLimit]: { code: e.OverRequestRateLimit, status: 429, message: "Too many requests", description: "Rate limit exceeded. Please try again later" }, [e.OverEmailSendRateLimit]: { code: e.OverEmailSendRateLimit, status: 429, message: "Too many email requests", description: "Too many emails sent. Please wait before trying again" }, [e.OverSmsSendRateLimit]: { code: e.OverSmsSendRateLimit, status: 429, message: "Too many SMS requests", description: "Too many SMS messages sent. Please wait before trying again" }, [e.UnexpectedFailure]: { code: e.UnexpectedFailure, status: 500, message: "An unexpected error occurred", description: "The server encountered an unexpected condition" }, [e.InternalError]: { code: e.InternalError, status: 500, message: "Internal server error", description: "An internal error occurred while processing the request" }, [e.IdentityNotFound]: { code: e.IdentityNotFound, status: 404, message: "Identity not found", description: "The requested user identity does not exist" }, [e.UnknownError]: { code: e.UnknownError, status: 500, message: "An unknown error occurred", description: "The error could not be categorized" } };
function o(i20) {
  return _3[i20];
}
var E2 = { INVALID_EMAIL_OR_PASSWORD: e.InvalidCredentials, INVALID_PASSWORD: e.InvalidCredentials, INVALID_EMAIL: e.EmailAddressInvalid, USER_NOT_FOUND: e.UserNotFound, INVALID_TOKEN: e.BadJwt, SESSION_EXPIRED: e.SessionExpired, FAILED_TO_GET_SESSION: e.SessionNotFound, USER_ALREADY_EXISTS: e.UserAlreadyExists, EMAIL_NOT_VERIFIED: e.EmailNotConfirmed, USER_EMAIL_NOT_FOUND: e.UserNotFound, PASSWORD_TOO_SHORT: e.WeakPassword, PASSWORD_TOO_LONG: e.WeakPassword, USER_ALREADY_HAS_PASSWORD: e.ValidationFailed, CREDENTIAL_ACCOUNT_NOT_FOUND: e.IdentityNotFound, FAILED_TO_UNLINK_LAST_ACCOUNT: e.ValidationFailed, ACCOUNT_NOT_FOUND: e.IdentityNotFound, SOCIAL_ACCOUNT_ALREADY_LINKED: e.ValidationFailed, PROVIDER_NOT_FOUND: e.OAuthProviderNotSupported, ID_TOKEN_NOT_SUPPORTED: e.FeatureNotSupported, FAILED_TO_CREATE_USER: e.InternalError, FAILED_TO_CREATE_SESSION: e.InternalError, FAILED_TO_UPDATE_USER: e.InternalError, EMAIL_CAN_NOT_BE_UPDATED: e.FeatureNotSupported };
var x3 = { 400: e.ValidationFailed, 401: e.BadJwt, 403: e.FeatureNotSupported, 404: e.UserNotFound, 409: e.UserAlreadyExists, 422: e.ValidationFailed, 429: e.OverRequestRateLimit, 500: e.UnexpectedFailure, 501: e.NotImplemented, 503: e.FeatureNotSupported };
function C3(i20) {
  if (i20 != null && typeof i20 == "object" && "status" in i20 && "statusText" in i20) {
    let s20 = i20, n18 = s20.status;
    if ("code" in s20 && s20.code && typeof s20.code == "string") {
      let r21 = E2[s20.code];
      if (r21) {
        let u18 = o(r21);
        return l(u18.message, u18.status, u18.code, n18);
      }
    }
    let a16 = o(f(n18, s20.message || s20.statusText));
    return l(s20.message || a16.message, n18, a16.code, n18);
  }
  if (i20 instanceof Error) {
    let s20 = o(v2(i20.message));
    return l(i20.message || s20.message, s20.status, s20.code, s20.status);
  }
  let t10 = o(e.UnknownError);
  return new L2(t10.message, t10.status, t10.code);
}
function f(i20, t10) {
  let s20 = t10?.toLowerCase() || "";
  switch (i20) {
    case 401:
      return s20.includes("token") || s20.includes("jwt") ? e.BadJwt : s20.includes("session") ? e.SessionNotFound : s20.includes("expired") ? e.SessionExpired : e.InvalidCredentials;
    case 404:
      return s20.includes("identity") || s20.includes("account") ? e.IdentityNotFound : s20.includes("session") ? e.SessionNotFound : e.UserNotFound;
    case 409:
      return s20.includes("email") ? e.EmailExists : s20.includes("phone") ? e.PhoneExists : e.UserAlreadyExists;
    case 422:
      return s20.includes("email") && s20.includes("confirm") ? e.EmailNotConfirmed : s20.includes("phone") && s20.includes("confirm") ? e.PhoneNotConfirmed : e.ValidationFailed;
    case 429:
      return s20.includes("email") ? e.OverEmailSendRateLimit : s20.includes("sms") || s20.includes("phone") ? e.OverSmsSendRateLimit : e.OverRequestRateLimit;
    case 400:
      return s20.includes("password") && s20.includes("weak") ? e.WeakPassword : s20.includes("email") && s20.includes("invalid") ? e.EmailAddressInvalid : s20.includes("json") ? e.BadJson : s20.includes("oauth") || s20.includes("callback") ? e.BadOAuthCallback : e.ValidationFailed;
    case 403:
      return s20.includes("provider") || s20.includes("oauth") ? e.OAuthProviderNotSupported : s20.includes("phone") ? e.PhoneProviderDisabled : s20.includes("sso") ? e.SsoProviderDisabled : e.FeatureNotSupported;
    case 501:
      return e.NotImplemented;
    case 503:
      return e.FeatureNotSupported;
    default:
      return s20.includes("oauth") ? e.OAuthCallbackFailed : e.UnexpectedFailure;
  }
}
function v2(i20) {
  let t10 = i20.toLowerCase();
  return t10.includes("invalid login") || t10.includes("incorrect") || t10.includes("wrong password") ? e.InvalidCredentials : t10.includes("token") && (t10.includes("invalid") || t10.includes("expired")) ? e.BadJwt : t10.includes("session") && t10.includes("expired") ? e.SessionExpired : t10.includes("session") && t10.includes("not found") ? e.SessionNotFound : t10.includes("already exists") || t10.includes("already registered") ? e.UserAlreadyExists : t10.includes("not found") && t10.includes("user") ? e.UserNotFound : t10.includes("not found") && t10.includes("identity") ? e.IdentityNotFound : t10.includes("email") && t10.includes("not confirmed") ? e.EmailNotConfirmed : t10.includes("phone") && t10.includes("not confirmed") ? e.PhoneNotConfirmed : t10.includes("weak password") || t10.includes("password") && t10.includes("requirements") ? e.WeakPassword : t10.includes("email") && t10.includes("invalid") ? e.EmailAddressInvalid : t10.includes("rate limit") || t10.includes("too many requests") ? e.OverRequestRateLimit : t10.includes("oauth") && t10.includes("failed") ? e.OAuthCallbackFailed : t10.includes("provider") && t10.includes("not supported") ? e.OAuthProviderNotSupported : e.UnexpectedFailure;
}
function l(i20, t10, s20, n18) {
  let a16 = t10;
  return a16 !== 500 && a16 !== 501 && a16 !== 503 ? new le(i20, a16, s20) : new L2(i20, a16, s20);
}

// vendor/neon/node_async_hooks.mjs
var c = class {
  __unenv__ = true;
  _currentStore;
  _enterStore;
  _enabled = true;
  getStore() {
    return this._currentStore ?? this._enterStore;
  }
  disable() {
    this._enabled = false;
  }
  enable() {
    this._enabled = true;
  }
  enterWith(e8) {
    this._enterStore = e8;
  }
  run(e8, r21, ...t10) {
    this._currentStore = e8;
    let n18 = r21(...t10);
    return this._currentStore = void 0, n18;
  }
  exit(e8, ...r21) {
    let t10 = this._currentStore;
    this._currentStore = void 0;
    let n18 = e8(...r21);
    return this._currentStore = t10, n18;
  }
  static snapshot() {
    throw new Error("[unenv] `AsyncLocalStorage.snapshot` is not implemented!");
  }
};
var S3 = globalThis.AsyncLocalStorage || c;
var R3 = Symbol("init");
var a = Symbol("before");
var o2 = Symbol("after");
var i3 = Symbol("destroy");
var A3 = Symbol("promiseResolve");
var T4 = class {
  __unenv__ = true;
  _enabled = false;
  _callbacks = {};
  constructor(e8 = {}) {
    this._callbacks = e8;
  }
  enable() {
    return this._enabled = true, this;
  }
  disable() {
    return this._enabled = false, this;
  }
  get [R3]() {
    return this._callbacks.init;
  }
  get [a]() {
    return this._callbacks.before;
  }
  get [o2]() {
    return this._callbacks.after;
  }
  get [i3]() {
    return this._callbacks.destroy;
  }
  get [A3]() {
    return this._callbacks.promiseResolve;
  }
};
var s = function() {
  return 0;
};
var I4 = Object.assign(/* @__PURE__ */ Object.create(null), { NONE: 0, DIRHANDLE: 1, DNSCHANNEL: 2, ELDHISTOGRAM: 3, FILEHANDLE: 4, FILEHANDLECLOSEREQ: 5, BLOBREADER: 6, FSEVENTWRAP: 7, FSREQCALLBACK: 8, FSREQPROMISE: 9, GETADDRINFOREQWRAP: 10, GETNAMEINFOREQWRAP: 11, HEAPSNAPSHOT: 12, HTTP2SESSION: 13, HTTP2STREAM: 14, HTTP2PING: 15, HTTP2SETTINGS: 16, HTTPINCOMINGMESSAGE: 17, HTTPCLIENTREQUEST: 18, JSSTREAM: 19, JSUDPWRAP: 20, MESSAGEPORT: 21, PIPECONNECTWRAP: 22, PIPESERVERWRAP: 23, PIPEWRAP: 24, PROCESSWRAP: 25, PROMISE: 26, QUERYWRAP: 27, QUIC_ENDPOINT: 28, QUIC_LOGSTREAM: 29, QUIC_PACKET: 30, QUIC_SESSION: 31, QUIC_STREAM: 32, QUIC_UDP: 33, SHUTDOWNWRAP: 34, SIGNALWRAP: 35, STATWATCHER: 36, STREAMPIPE: 37, TCPCONNECTWRAP: 38, TCPSERVERWRAP: 39, TCPWRAP: 40, TTYWRAP: 41, UDPSENDWRAP: 42, UDPWRAP: 43, SIGINTWATCHDOG: 44, WORKER: 45, WORKERHEAPSNAPSHOT: 46, WRITEWRAP: 47, ZLIB: 48, CHECKPRIMEREQUEST: 49, PBKDF2REQUEST: 50, KEYPAIRGENREQUEST: 51, KEYGENREQUEST: 52, KEYEXPORTREQUEST: 53, CIPHERREQUEST: 54, DERIVEBITSREQUEST: 55, HASHREQUEST: 56, RANDOMBYTESREQUEST: 57, RANDOMPRIMEREQUEST: 58, SCRYPTREQUEST: 59, SIGNREQUEST: 60, TLSWRAP: 61, VERIFYREQUEST: 62 });
var _4 = 100;
var y = class {
  __unenv__ = true;
  type;
  _asyncId;
  _triggerAsyncId;
  constructor(e8, r21 = s()) {
    this.type = e8, this._asyncId = -1 * _4++, this._triggerAsyncId = typeof r21 == "number" ? r21 : r21?.triggerAsyncId;
  }
  static bind(e8, r21, t10) {
    return new E3(r21 ?? "anonymous").bind(e8);
  }
  bind(e8, r21) {
    let t10 = (...n18) => this.runInAsyncScope(e8, r21, ...n18);
    return t10.asyncResource = this, t10;
  }
  runInAsyncScope(e8, r21, ...t10) {
    return e8.apply(r21, t10);
  }
  emitDestroy() {
    return this;
  }
  asyncId() {
    return this._asyncId;
  }
  triggerAsyncId() {
    return this._triggerAsyncId;
  }
};
var E3 = globalThis.AsyncResource || y;

// vendor/neon/node_events.mjs
function te2(e8) {
  return new Error(`[unenv] ${e8} is not implemented yet!`);
}
function w(e8) {
  return Object.assign(() => {
    throw te2(e8);
  }, { __unenv__: true });
}
var y2 = 10;
var ne2 = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
}).prototype);
var G3 = (e8, t10) => e8;
var _5 = Error;
var ie2 = Error;
var v3 = Error;
var b = Error;
var se2 = Error;
var C4 = Symbol.for("nodejs.rejection");
var f2 = Symbol.for("kCapture");
var M3 = Symbol.for("events.errorMonitor");
var d = Symbol.for("shapeMode");
var x4 = Symbol.for("events.maxEventTargetListeners");
var oe2 = Symbol.for("kEnhanceStackBeforeInspector");
var ue2 = Symbol.for("nodejs.watermarkData");
var S4 = Symbol.for("kEventEmitter");
var h2 = Symbol.for("kAsyncResource");
var le2 = Symbol.for("kFirstEventParam");
var P3 = Symbol.for("kResistStopPropagation");
var W3 = Symbol.for("events.maxEventTargetListenersWarned");
var U3 = class E4 {
  _events = void 0;
  _eventsCount = 0;
  _maxListeners = y2;
  [f2] = false;
  [d] = false;
  static captureRejectionSymbol = C4;
  static errorMonitor = M3;
  static kMaxEventTargetListeners = x4;
  static kMaxEventTargetListenersWarned = W3;
  static usingDomains = false;
  static get on() {
    return fe2;
  }
  static get once() {
    return he2;
  }
  static get getEventListeners() {
    return ve2;
  }
  static get getMaxListeners() {
    return me2;
  }
  static get addAbortListener() {
    return X3;
  }
  static get EventEmitterAsyncResource() {
    return ae2;
  }
  static get EventEmitter() {
    return E4;
  }
  static setMaxListeners(t10 = y2, ...r21) {
    if (r21.length === 0) y2 = t10;
    else for (let n18 of r21) if (J3(n18)) n18[x4] = t10, n18[W3] = false;
    else if (typeof n18.setMaxListeners == "function") n18.setMaxListeners(t10);
    else throw new v3("eventTargets", ["EventEmitter", "EventTarget"], n18);
  }
  static listenerCount(t10, r21) {
    if (typeof t10.listenerCount == "function") return t10.listenerCount(r21);
    E4.prototype.listenerCount.call(t10, r21);
  }
  static init() {
    throw new Error("EventEmitter.init() is not implemented.");
  }
  static get captureRejections() {
    return this[f2];
  }
  static set captureRejections(t10) {
    this[f2] = t10;
  }
  static get defaultMaxListeners() {
    return y2;
  }
  static set defaultMaxListeners(t10) {
    y2 = t10;
  }
  constructor(t10) {
    this._events === void 0 || this._events === Object.getPrototypeOf(this)._events ? (this._events = { __proto__: null }, this._eventsCount = 0, this[d] = false) : this[d] = true, this._maxListeners = this._maxListeners || void 0, t10?.captureRejections ? this[f2] = !!t10.captureRejections : this[f2] = E4.prototype[f2];
  }
  setMaxListeners(t10) {
    return this._maxListeners = t10, this;
  }
  getMaxListeners() {
    return T5(this);
  }
  emit(t10, ...r21) {
    let n18 = t10 === "error", i20 = this._events;
    if (i20 !== void 0) n18 && i20[M3] !== void 0 && this.emit(M3, ...r21), n18 = n18 && i20.error === void 0;
    else if (!n18) return false;
    if (n18) {
      let s20;
      if (r21.length > 0 && (s20 = r21[0]), s20 instanceof Error) {
        try {
          let c19 = {};
          Error.captureStackTrace?.(c19, E4.prototype.emit), Object.defineProperty(s20, oe2, { __proto__: null, value: Function.prototype.bind(de2, this, s20, c19), configurable: true });
        } catch {
        }
        throw s20;
      }
      let l19;
      try {
        l19 = G3(s20);
      } catch {
        l19 = s20;
      }
      let a16 = new ie2(l19);
      throw a16.context = s20, a16;
    }
    let o21 = i20[t10];
    if (o21 === void 0) return false;
    if (typeof o21 == "function") {
      let s20 = o21.apply(this, r21);
      s20 != null && K3(this, s20, t10, r21);
    } else {
      let s20 = o21.length, l19 = I5(o21);
      for (let a16 = 0; a16 < s20; ++a16) {
        let c19 = l19[a16].apply(this, r21);
        c19 != null && K3(this, c19, t10, r21);
      }
    }
    return true;
  }
  addListener(t10, r21) {
    return q3(this, t10, r21, false), this;
  }
  on(t10, r21) {
    return this.addListener(t10, r21);
  }
  prependListener(t10, r21) {
    return q3(this, t10, r21, true), this;
  }
  once(t10, r21) {
    return this.on(t10, z3(this, t10, r21)), this;
  }
  prependOnceListener(t10, r21) {
    return this.prependListener(t10, z3(this, t10, r21)), this;
  }
  removeListener(t10, r21) {
    let n18 = this._events;
    if (n18 === void 0) return this;
    let i20 = n18[t10];
    if (i20 === void 0) return this;
    if (i20 === r21 || i20.listener === r21) this._eventsCount -= 1, this[d] ? n18[t10] = void 0 : this._eventsCount === 0 ? this._events = { __proto__: null } : (delete n18[t10], n18.removeListener && this.emit("removeListener", t10, i20.listener || r21));
    else if (typeof i20 != "function") {
      let o21 = -1;
      for (let s20 = i20.length - 1; s20 >= 0; s20--) if (i20[s20] === r21 || i20[s20].listener === r21) {
        o21 = s20;
        break;
      }
      if (o21 < 0) return this;
      o21 === 0 ? i20.shift() : ge2(i20, o21), i20.length === 1 && (n18[t10] = i20[0]), n18.removeListener !== void 0 && this.emit("removeListener", t10, r21);
    }
    return this;
  }
  off(t10, r21) {
    return this.removeListener(t10, r21);
  }
  removeAllListeners(t10) {
    let r21 = this._events;
    if (r21 === void 0) return this;
    if (r21.removeListener === void 0) return arguments.length === 0 ? (this._events = { __proto__: null }, this._eventsCount = 0) : r21[t10] !== void 0 && (--this._eventsCount === 0 ? this._events = { __proto__: null } : delete r21[t10]), this[d] = false, this;
    if (arguments.length === 0) {
      for (let i20 of Reflect.ownKeys(r21)) i20 !== "removeListener" && this.removeAllListeners(i20);
      return this.removeAllListeners("removeListener"), this._events = { __proto__: null }, this._eventsCount = 0, this[d] = false, this;
    }
    let n18 = r21[t10];
    if (typeof n18 == "function") this.removeListener(t10, n18);
    else if (n18 !== void 0) for (let i20 = n18.length - 1; i20 >= 0; i20--) this.removeListener(t10, n18[i20]);
    return this;
  }
  listeners(t10) {
    return B3(this, t10, true);
  }
  rawListeners(t10) {
    return B3(this, t10, false);
  }
  eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  }
  listenerCount(t10, r21) {
    let n18 = this._events;
    if (n18 !== void 0) {
      let i20 = n18[t10];
      if (typeof i20 == "function") return r21 != null ? r21 === i20 || r21 === i20.listener ? 1 : 0 : 1;
      if (i20 !== void 0) {
        if (r21 != null) {
          let o21 = 0;
          for (let s20 = 0, l19 = i20.length; s20 < l19; s20++) (i20[s20] === r21 || i20[s20].listener === r21) && o21++;
          return o21;
        }
        return i20.length;
      }
    }
    return 0;
  }
};
var ae2 = class extends U3 {
  constructor(e8) {
    let t10;
    typeof e8 == "string" ? (t10 = e8, e8 = void 0) : t10 = e8?.name || new.target.name, super(e8), this[h2] = new ce2(this, t10, e8);
  }
  emit(e8, ...t10) {
    if (this[h2] === void 0) throw new _5("EventEmitterAsyncResource");
    let { asyncResource: r21 } = this;
    return Array.prototype.unshift(t10, super.emit, this, e8), Reflect.apply(r21.runInAsyncScope, r21, t10);
  }
  emitDestroy() {
    if (this[h2] === void 0) throw new _5("EventEmitterAsyncResource");
    this.asyncResource.emitDestroy();
  }
  get asyncId() {
    if (this[h2] === void 0) throw new _5("EventEmitterAsyncResource");
    return this.asyncResource.asyncId();
  }
  get triggerAsyncId() {
    if (this[h2] === void 0) throw new _5("EventEmitterAsyncResource");
    return this.asyncResource.triggerAsyncId();
  }
  get asyncResource() {
    if (this[h2] === void 0) throw new _5("EventEmitterAsyncResource");
    return this[h2];
  }
};
var ce2 = class extends E3 {
  constructor(e8, t10, r21) {
    super(t10, r21), this[S4] = e8;
  }
  get eventEmitter() {
    if (this[S4] === void 0) throw new _5("EventEmitterReferencingAsyncResource");
    return this[S4];
  }
};
var fe2 = function(e8, t10, r21 = {}) {
  let n18 = r21.signal;
  if (n18?.aborted) throw new b(void 0, { cause: n18?.reason });
  let i20 = r21.highWaterMark ?? r21.highWatermark ?? Number.MAX_SAFE_INTEGER, o21 = r21.lowWaterMark ?? r21.lowWatermark ?? 1, s20 = new N3(), l19 = new N3(), a16 = false, c19 = null, m16 = false, p21 = 0, Q11 = Object.setPrototypeOf({ next() {
    if (p21) {
      let u18 = s20.shift();
      return p21--, a16 && p21 < o21 && (e8.resume?.(), a16 = false), Promise.resolve(k3(u18, false));
    }
    if (c19) {
      let u18 = Promise.reject(c19);
      return c19 = null, u18;
    }
    return m16 ? L14() : new Promise(function(u18, ee12) {
      l19.push({ resolve: u18, reject: ee12 });
    });
  }, return() {
    return L14();
  }, throw(u18) {
    if (!u18 || !(u18 instanceof Error)) throw new v3("EventEmitter.AsyncIterator", "Error", u18);
    R20(u18);
  }, [Symbol.asyncIterator]() {
    return this;
  }, [ue2]: { get size() {
    return p21;
  }, get low() {
    return o21;
  }, get high() {
    return i20;
  }, get isPaused() {
    return a16;
  } } }, ne2), { addEventListener: A19, removeAll: V9 } = Ee2();
  A19(e8, t10, r21[le2] ? $10 : function(...u18) {
    return $10(u18);
  }), t10 !== "error" && typeof e8.on == "function" && A19(e8, "error", R20);
  let F12 = r21?.close;
  if (F12?.length) for (let u18 of F12) A19(e8, u18, L14);
  let Y13 = n18 ? X3(n18, Z15) : null;
  return Q11;
  function Z15() {
    R20(new b(void 0, { cause: n18?.reason }));
  }
  function $10(u18) {
    l19.isEmpty() ? (p21++, !a16 && p21 > i20 && (a16 = true, e8.pause?.()), s20.push(u18)) : l19.shift().resolve(k3(u18, false));
  }
  function R20(u18) {
    l19.isEmpty() ? c19 = u18 : l19.shift().reject(u18), L14();
  }
  function L14() {
    Y13?.[Symbol.dispose](), V9(), m16 = true;
    let u18 = k3(void 0, true);
    for (; !l19.isEmpty(); ) l19.shift().resolve(u18);
    return Promise.resolve(u18);
  }
};
var he2 = async function(e8, t10, r21 = {}) {
  let n18 = r21?.signal;
  if (n18?.aborted) throw new b(void 0, { cause: n18?.reason });
  return new Promise((i20, o21) => {
    let s20 = (m16) => {
      typeof e8.removeListener == "function" && e8.removeListener(t10, l19), n18 != null && g3(n18, "abort", c19), o21(m16);
    }, l19 = (...m16) => {
      typeof e8.removeListener == "function" && e8.removeListener("error", s20), n18 != null && g3(n18, "abort", c19), i20(m16);
    }, a16 = { __proto__: null, once: true, [P3]: true };
    O3(e8, t10, l19, a16), t10 !== "error" && typeof e8.once == "function" && e8.once("error", s20);
    function c19() {
      g3(e8, t10, l19), g3(e8, "error", s20), o21(new b(void 0, { cause: n18?.reason }));
    }
    n18 != null && O3(n18, "abort", c19, { __proto__: null, once: true, [P3]: true });
  });
};
var X3 = function(e8, t10) {
  if (e8 === void 0) throw new v3("signal", "AbortSignal", e8);
  let r21;
  return e8.aborted ? queueMicrotask(() => t10()) : (e8.addEventListener("abort", t10, { __proto__: null, once: true, [P3]: true }), r21 = () => {
    e8.removeEventListener("abort", t10);
  }), { __proto__: null, [Symbol.dispose]() {
    r21?.();
  } };
};
var ve2 = function(e8, t10) {
  if (typeof e8.listeners == "function") return e8.listeners(t10);
  if (J3(e8)) {
    let r21 = e8[kEvents].get(t10), n18 = [], i20 = r21?.next;
    for (; i20?.listener !== void 0; ) {
      let o21 = i20.listener?.deref ? i20.listener.deref() : i20.listener;
      n18.push(o21), i20 = i20.next;
    }
    return n18;
  }
  throw new v3("emitter", ["EventEmitter", "EventTarget"], e8);
};
var me2 = function(e8) {
  if (typeof e8?.getMaxListeners == "function") return T5(e8);
  if (e8?.[x4]) return e8[x4];
  throw new v3("emitter", ["EventEmitter", "EventTarget"], e8);
};
var H3 = 2048;
var j3 = H3 - 1;
var D3 = class {
  bottom;
  top;
  list;
  next;
  constructor() {
    this.bottom = 0, this.top = 0, this.list = new Array(H3), this.next = null;
  }
  isEmpty() {
    return this.top === this.bottom;
  }
  isFull() {
    return (this.top + 1 & j3) === this.bottom;
  }
  push(e8) {
    this.list[this.top] = e8, this.top = this.top + 1 & j3;
  }
  shift() {
    let e8 = this.list[this.bottom];
    return e8 === void 0 ? null : (this.list[this.bottom] = void 0, this.bottom = this.bottom + 1 & j3, e8);
  }
};
var N3 = class {
  head;
  tail;
  constructor() {
    this.head = this.tail = new D3();
  }
  isEmpty() {
    return this.head.isEmpty();
  }
  push(e8) {
    this.head.isFull() && (this.head = this.head.next = new D3()), this.head.push(e8);
  }
  shift() {
    let e8 = this.tail, t10 = e8.shift();
    return e8.isEmpty() && e8.next !== null && (this.tail = e8.next, e8.next = null), t10;
  }
};
function J3(e8) {
  return typeof e8?.addEventListener == "function";
}
function K3(e8, t10, r21, n18) {
  if (e8[f2]) try {
    let i20 = t10.then;
    typeof i20 == "function" && i20.call(t10, void 0, function(o21) {
      setTimeout(pe2, 0, e8, o21, r21, n18);
    });
  } catch (i20) {
    e8.emit("error", i20);
  }
}
function pe2(e8, t10, r21, n18) {
  if (typeof e8[C4] == "function") e8[C4](t10, r21, ...n18);
  else {
    let i20 = e8[f2];
    try {
      e8[f2] = false, e8.emit("error", t10);
    } finally {
      e8[f2] = i20;
    }
  }
}
function T5(e8) {
  return e8._maxListeners === void 0 ? y2 : e8._maxListeners;
}
function de2(e8, t10) {
  let r21 = "";
  try {
    let { name: o21 } = this.constructor;
    o21 !== "EventEmitter" && (r21 = ` on ${o21} instance`);
  } catch {
  }
  let n18 = `
Emitted 'error' event${r21} at:
`, i20 = (t10.stack || "").split(`
`).slice(1);
  return e8.stack + n18 + i20.join(`
`);
}
function q3(e8, t10, r21, n18) {
  let i20, o21, s20;
  if (o21 = e8._events, o21 === void 0 ? (o21 = e8._events = { __proto__: null }, e8._eventsCount = 0) : (o21.newListener !== void 0 && (e8.emit("newListener", t10, r21.listener ?? r21), o21 = e8._events), s20 = o21[t10]), s20 === void 0) o21[t10] = r21, ++e8._eventsCount;
  else if (typeof s20 == "function" ? s20 = o21[t10] = n18 ? [r21, s20] : [s20, r21] : n18 ? s20.unshift(r21) : s20.push(r21), i20 = T5(e8), i20 > 0 && s20.length > i20 && !s20.warned) {
    s20.warned = true;
    let l19 = new se2(`Possible EventEmitter memory leak detected. ${s20.length} ${String(t10)} listeners added to ${G3(e8, { depth: -1 })}. MaxListeners is ${i20}. Use emitter.setMaxListeners() to increase limit`, { name: "MaxListenersExceededWarning", emitter: e8, type: t10, count: s20.length });
    console.warn(l19);
  }
  return e8;
}
function ye2() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function z3(e8, t10, r21) {
  let n18 = { fired: false, wrapFn: void 0, target: e8, type: t10, listener: r21 }, i20 = ye2.bind(n18);
  return i20.listener = r21, n18.wrapFn = i20, i20;
}
function B3(e8, t10, r21) {
  let n18 = e8._events;
  if (n18 === void 0) return [];
  let i20 = n18[t10];
  return i20 === void 0 ? [] : typeof i20 == "function" ? r21 ? [i20.listener || i20] : [i20] : r21 ? _e2(i20) : I5(i20);
}
function I5(e8) {
  switch (e8.length) {
    case 2:
      return [e8[0], e8[1]];
    case 3:
      return [e8[0], e8[1], e8[2]];
    case 4:
      return [e8[0], e8[1], e8[2], e8[3]];
    case 5:
      return [e8[0], e8[1], e8[2], e8[3], e8[4]];
    case 6:
      return [e8[0], e8[1], e8[2], e8[3], e8[4], e8[5]];
  }
  return Array.prototype.slice.call(e8);
}
function _e2(e8) {
  let t10 = I5(e8);
  for (let r21 = 0; r21 < t10.length; ++r21) {
    let n18 = t10[r21].listener;
    typeof n18 == "function" && (t10[r21] = n18);
  }
  return t10;
}
function k3(e8, t10) {
  return { value: e8, done: t10 };
}
function g3(e8, t10, r21, n18) {
  if (typeof e8.removeListener == "function") e8.removeListener(t10, r21);
  else if (typeof e8.removeEventListener == "function") e8.removeEventListener(t10, r21, n18);
  else throw new v3("emitter", "EventEmitter", e8);
}
function O3(e8, t10, r21, n18) {
  if (typeof e8.on == "function") n18?.once ? e8.once(t10, r21) : e8.on(t10, r21);
  else if (typeof e8.addEventListener == "function") e8.addEventListener(t10, r21, n18);
  else throw new v3("emitter", "EventEmitter", e8);
}
function Ee2() {
  let e8 = [];
  return { addEventListener(t10, r21, n18, i20) {
    O3(t10, r21, n18, i20), Array.prototype.push(e8, [t10, r21, n18, i20]);
  }, removeAll() {
    for (; e8.length > 0; ) Reflect.apply(g3, void 0, e8.pop());
  } };
}
function ge2(e8, t10) {
  for (; t10 + 1 < e8.length; t10++) e8[t10] = e8[t10 + 1];
  e8.pop();
}
var Me2 = Symbol.for("nodejs.rejection");
var je2 = Symbol.for("events.errorMonitor");
var Ce = w("node:events.setMaxListeners");
var Pe2 = w("node:events.listenerCount");
var Oe2 = w("node:events.init");

// vendor/neon/node_tty.mjs
var o3 = class {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(t10) {
    this.fd = t10;
  }
  setRawMode(t10) {
    return this.isRaw = t10, this;
  }
};
var s2 = class {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(t10) {
    this.fd = t10;
  }
  clearLine(t10, r21) {
    return r21 && r21(), false;
  }
  clearScreenDown(t10) {
    return t10 && t10(), false;
  }
  cursorTo(t10, r21, e8) {
    return e8 && typeof e8 == "function" && e8(), false;
  }
  moveCursor(t10, r21, e8) {
    return e8 && e8(), false;
  }
  getColorDepth(t10) {
    return 1;
  }
  hasColors(t10, r21) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(t10, r21, e8) {
    t10 instanceof Uint8Array && (t10 = new TextDecoder().decode(t10));
    try {
      console.log(t10);
    } catch {
    }
    return e8 && typeof e8 == "function" && e8(), false;
  }
};

// vendor/neon/node_process.mjs
function r(t10) {
  return new Error(`[unenv] ${t10} is not implemented yet!`);
}
function a2(t10) {
  return Object.assign(() => {
    throw r(t10);
  }, { __unenv__: true });
}
var v4 = "22.14.0";
var _6 = class m2 extends U3 {
  env;
  hrtime;
  nextTick;
  constructor(e8) {
    super(), this.env = e8.env, this.hrtime = e8.hrtime, this.nextTick = e8.nextTick;
    for (let s20 of [...Object.getOwnPropertyNames(m2.prototype), ...Object.getOwnPropertyNames(U3.prototype)]) {
      let i20 = this[s20];
      typeof i20 == "function" && (this[s20] = i20.bind(this));
    }
  }
  emitWarning(e8, s20, i20) {
    console.warn(`${i20 ? `[${i20}] ` : ""}${s20 ? `${s20}: ` : ""}${e8}`);
  }
  emit(...e8) {
    return super.emit(...e8);
  }
  listeners(e8) {
    return super.listeners(e8);
  }
  #t;
  #s;
  #r;
  get stdin() {
    return this.#t ??= new o3(0);
  }
  get stdout() {
    return this.#s ??= new s2(1);
  }
  get stderr() {
    return this.#r ??= new s2(2);
  }
  #e = "/";
  chdir(e8) {
    this.#e = e8;
  }
  cwd() {
    return this.#e;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${v4}`;
  }
  get versions() {
    return { node: v4 };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw r("process.umask");
  }
  getBuiltinModule() {
  }
  getActiveResourcesInfo() {
    throw r("process.getActiveResourcesInfo");
  }
  exit() {
    throw r("process.exit");
  }
  reallyExit() {
    throw r("process.reallyExit");
  }
  kill() {
    throw r("process.kill");
  }
  abort() {
    throw r("process.abort");
  }
  dlopen() {
    throw r("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw r("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw r("process.loadEnvFile");
  }
  disconnect() {
    throw r("process.disconnect");
  }
  cpuUsage() {
    throw r("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw r("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw r("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw r("process.initgroups");
  }
  openStdin() {
    throw r("process.openStdin");
  }
  assert() {
    throw r("process.assert");
  }
  binding() {
    throw r("process.binding");
  }
  permission = { has: a2("process.permission.has") };
  report = { directory: "", filename: "", signal: "SIGUSR2", compact: false, reportOnFatalError: false, reportOnSignal: false, reportOnUncaughtException: false, getReport: a2("process.report.getReport"), writeReport: a2("process.report.writeReport") };
  finalization = { register: a2("process.finalization.register"), unregister: a2("process.finalization.unregister"), registerBeforeExit: a2("process.finalization.registerBeforeExit") };
  memoryUsage = Object.assign(() => ({ arrayBuffers: 0, rss: 0, external: 0, heapTotal: 0, heapUsed: 0 }), { rss: () => 0 });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
var u = /* @__PURE__ */ Object.create(null);
var b2 = globalThis.process;
var o4 = (t10) => globalThis.__env__ || b2?.env || (t10 ? u : globalThis);
var x5 = new Proxy(u, { get(t10, e8) {
  return o4()[e8] ?? u[e8];
}, has(t10, e8) {
  let s20 = o4();
  return e8 in s20 || e8 in u;
}, set(t10, e8, s20) {
  let i20 = o4(true);
  return i20[e8] = s20, true;
}, deleteProperty(t10, e8) {
  let s20 = o4(true);
  return delete s20[e8], true;
}, ownKeys() {
  let t10 = o4();
  return Object.keys(t10);
}, getOwnPropertyDescriptor(t10, e8) {
  let s20 = o4();
  if (e8 in s20) return { value: s20[e8], writable: true, enumerable: true, configurable: true };
} });
var w2 = Object.assign(function(t10) {
  let e8 = Date.now(), s20 = Math.trunc(e8 / 1e3), i20 = e8 % 1e3 * 1e6;
  if (t10) {
    let d13 = s20 - t10[0], n18 = i20 - t10[0];
    return n18 < 0 && (d13 = d13 - 1, n18 = 1e9 + n18), [d13, n18];
  }
  return [s20, i20];
}, { bigint: function() {
  return BigInt(Date.now() * 1e6);
} });
var E5 = globalThis.queueMicrotask ? (t10, ...e8) => {
  globalThis.queueMicrotask(t10.bind(void 0, ...e8));
} : k4();
function k4() {
  let t10 = [], e8 = false, s20, i20 = -1;
  function d13() {
    !e8 || !s20 || (e8 = false, s20.length > 0 ? t10 = [...s20, ...t10] : i20 = -1, t10.length > 0 && n18());
  }
  function n18() {
    if (e8) return;
    let c19 = setTimeout(d13);
    e8 = true;
    let l19 = t10.length;
    for (; l19; ) {
      for (s20 = t10, t10 = []; ++i20 < l19; ) s20 && s20[i20]();
      i20 = -1, l19 = t10.length;
    }
    s20 = void 0, e8 = false, clearTimeout(c19);
  }
  return (c19, ...l19) => {
    t10.push(c19.bind(void 0, ...l19)), t10.length === 1 && !e8 && setTimeout(n18);
  };
}
var h3 = new _6({ env: x5, hrtime: w2, nextTick: E5 });
var A4 = h3;
var { abort: O4, addListener: T6, allowedNodeEnvironmentFlags: S5, hasUncaughtExceptionCaptureCallback: N4, setUncaughtExceptionCaptureCallback: R4, loadEnvFile: I6, sourceMapsEnabled: B4, arch: j4, argv: D4, argv0: F4, chdir: $2, config: z4, connected: q4, constrainedMemory: W4, availableMemory: H4, cpuUsage: Q3, cwd: G4, debugPort: K4, dlopen: J4, disconnect: V3, emit: X4, emitWarning: Y3, env: Z3, eventNames: ee3, execArgv: te3, execPath: se3, exit: re2, finalization: ie3, features: ne3, getBuiltinModule: ae3, getActiveResourcesInfo: oe3, getMaxListeners: de3, hrtime: le3, kill: ue3, listeners: ce3, listenerCount: ge3, memoryUsage: pe3, nextTick: ve3, on: me3, off: he3, once: fe3, pid: _e3, platform: be2, ppid: xe2, prependListener: we2, prependOnceListener: Ee3, rawListeners: ke2, release: ye3, removeAllListeners: Me3, removeListener: Ce2, report: Le2, resourceUsage: Pe3, setMaxListeners: Ue2, setSourceMapsEnabled: Ae, stderr: Oe3, stdin: Te2, stdout: Se2, title: Ne2, umask: Re2, uptime: Ie2, version: Be2, versions: je3, domain: De2, initgroups: Fe2, moduleLoadList: $e2, reallyExit: ze2, openStdin: qe2, assert: We2, binding: He2, send: Qe2, exitCode: Ge2, channel: Ke2, getegid: Je2, geteuid: Ve2, getgid: Xe2, getgroups: Ye2, getuid: Ze2, setegid: et2, seteuid: tt2, setgid: st, setgroups: rt2, setuid: it2, permission: nt2, mainModule: at2, ref: ot2, unref: dt2, _events: lt2, _eventsCount: ut2, _exiting: ct2, _maxListeners: gt2, _debugEnd: pt, _debugProcess: vt2, _fatalException: mt2, _getActiveHandles: ht, _getActiveRequests: ft2, _kill: _t2, _preload_modules: bt2, _rawDebug: xt, _startProfilerIdleNotifier: wt2, _stopProfilerIdleNotifier: Et2, _tickCallback: kt2, _disconnect: yt2, _handleQueue: Mt2, _pendingMessage: Ct2, _channel: Lt2, _send: Pt2, _linkedBinding: Ut } = h3;

// vendor/neon/better-auth_1.6.23_es2022_dist_version.mjs
var o5 = "1.6.23";
var t = o5;

// vendor/neon/better-auth_1.6.23_es2022_dist_client_broadcast-channel.mjs
var n = Symbol.for("better-auth:broadcast-channel");
var r2 = () => Math.floor(Date.now() / 1e3);
var o6 = class {
  listeners = /* @__PURE__ */ new Set();
  name;
  constructor(e8 = "better-auth.message") {
    this.name = e8;
  }
  subscribe(e8) {
    return this.listeners.add(e8), () => {
      this.listeners.delete(e8);
    };
  }
  post(e8) {
    if (!(typeof window > "u")) try {
      localStorage.setItem(this.name, JSON.stringify({ ...e8, timestamp: r2() }));
    } catch {
    }
  }
  setup() {
    if (typeof window > "u" || typeof window.addEventListener > "u") return () => {
    };
    let e8 = (s20) => {
      if (s20.key !== this.name) return;
      let t10 = JSON.parse(s20.newValue ?? "{}");
      t10?.event !== "session" || !t10?.data || this.listeners.forEach((a16) => a16(t10));
    };
    return window.addEventListener("storage", e8), () => {
      window.removeEventListener("storage", e8);
    };
  }
};
function i4(e8 = "better-auth.message") {
  return globalThis[n] || (globalThis[n] = new o6(e8)), globalThis[n];
}

// vendor/neon/nanostores_1.5.1_es2022_nanostores.mjs
var P4 = Symbol("clean");
var a3 = [];
var u2 = 0;
var m3 = null;
var N5 = 4;
var v5 = globalThis.nanostoresGlobal ||= { epoch: 0 };
var w3 = () => {
  let e8;
  for (u2 = 0; u2 < a3.length; u2 += N5) try {
    a3[u2](a3[u2 + 1].value, a3[u2 + 2], a3[u2 + 3]);
  } catch (t10) {
    e8 = t10;
  }
  if (a3.length = 0, e8) throw e8;
};
var d2 = (e8) => {
  let t10 = [], r21 = { eq: Object.is, get() {
    return r21.lc || r21.listen(() => {
    })(), r21.value;
  }, init: e8, lc: 0, listen(n18) {
    return r21.lc = t10.push(n18), () => {
      for (let l19 = u2 + N5; l19 < a3.length; ) a3[l19] === n18 ? a3.splice(l19, N5) : l19 += N5;
      let o21 = t10.indexOf(n18);
      ~o21 && (t10.splice(o21, 1), --r21.lc || r21.off());
    };
  }, notify(n18, o21) {
    v5.epoch++;
    let l19 = !a3.length && !m3;
    for (let i20 of t10) m3?.has(i20) || (m3?.add(i20), a3.push(i20, r21, n18, m3 ? void 0 : o21));
    l19 && w3();
  }, off() {
  }, set(n18) {
    let o21 = r21.value;
    r21.eq(o21, n18) || (r21.value = n18, r21.notify(o21));
  }, subscribe(n18) {
    let o21 = r21.listen(n18);
    return n18(r21.value), o21;
  }, value: e8 };
  return r21;
};
var W5 = 2;
var z5 = 5;
var g4 = 6;
var E6 = 10;
var x6 = (e8, t10, r21, n18) => (e8.events = e8.events || {}, e8.events[r21 + E6] || (e8.events[r21 + E6] = n18((o21) => {
  e8.events[r21].reduceRight((l19, i20) => (i20(l19), l19), { shared: {}, ...o21 });
})), e8.events[r21] = e8.events[r21] || [], e8.events[r21].push(t10), () => {
  let o21 = e8.events[r21], l19 = o21.indexOf(t10);
  o21.splice(l19, 1), o21.length || (delete e8.events[r21], e8.events[r21 + E6](), delete e8.events[r21 + E6]);
});
var Z4 = (e8, t10) => x6(e8, t10, W5, (r21) => {
  let n18 = e8.set, o21 = e8.setKey;
  return e8.setKey && (e8.setKey = (l19, i20) => {
    let s20;
    if (r21({ abort: () => {
      s20 = true;
    }, changed: l19, newValue: { ...e8.value, [l19]: i20 } }), !s20) return o21(l19, i20);
  }), e8.set = (l19) => {
    let i20;
    if (r21({ abort: () => {
      i20 = true;
    }, newValue: l19 }), !i20) return n18(l19);
  }, () => {
    e8.set = n18, e8.setKey = o21;
  };
});
var R5 = 1e3;
var y3 = (e8, t10) => x6(e8, (n18) => {
  let o21 = t10(n18);
  o21 && e8.events[g4].push(o21);
}, z5, (n18) => {
  let o21 = e8.listen;
  e8.listen = (...i20) => (!e8.lc && !e8.active && (e8.active = true, n18()), o21(...i20));
  let l19 = e8.off;
  return e8.events[g4] = [], e8.off = () => {
    l19(), setTimeout(() => {
      if (e8.active && !e8.lc) {
        e8.active = false;
        for (let i20 of e8.events[g4]) i20();
        e8.events[g4] = [];
      }
    }, R5);
  }, () => {
    e8.listen = o21, e8.off = l19;
  };
});

// vendor/neon/better-auth_1.6.23_es2022_dist_client_equality.mjs
function i5(t10) {
  if (typeof t10 != "object" || t10 === null) return false;
  let e8 = Object.getPrototypeOf(t10);
  return e8 === Object.prototype || e8 === null;
}
function o7(t10, e8) {
  if (t10 === e8) return true;
  if (Array.isArray(t10) && Array.isArray(e8)) {
    if (t10.length !== e8.length) return false;
    for (let r21 = 0; r21 < t10.length; r21++) if (!o7(t10[r21], e8[r21])) return false;
    return true;
  }
  if (i5(t10) && i5(e8)) {
    let r21 = Object.keys(t10), n18 = Object.keys(e8);
    if (r21.length !== n18.length) return false;
    for (let f17 of r21) if (!(f17 in e8) || !o7(t10[f17], e8[f17])) return false;
    return true;
  }
  return false;
}
function s3(t10, e8) {
  return Z4(t10, ({ newValue: r21, abort: n18 }) => {
    e8(t10.value, r21) && n18();
  });
}

// vendor/neon/better-auth_1.6.23_es2022_dist_client_focus-manager.mjs
var t2 = Symbol.for("better-auth:focus-manager");
var n2 = class {
  listeners = /* @__PURE__ */ new Set();
  subscribe(e8) {
    return this.listeners.add(e8), () => {
      this.listeners.delete(e8);
    };
  }
  setFocused(e8) {
    this.listeners.forEach((i20) => i20(e8));
  }
  setup() {
    if (typeof window > "u" || typeof document > "u" || typeof window.addEventListener > "u") return () => {
    };
    let e8 = () => {
      document.visibilityState === "visible" && this.setFocused(true);
    };
    return document.addEventListener("visibilitychange", e8, false), () => {
      document.removeEventListener("visibilitychange", e8, false);
    };
  }
};
function s4() {
  return globalThis[t2] || (globalThis[t2] = new n2()), globalThis[t2];
}

// vendor/neon/better-auth_1.6.23_es2022_dist_client_online-manager.mjs
var i6 = Symbol.for("better-auth:online-manager");
var t3 = class {
  listeners = /* @__PURE__ */ new Set();
  isOnline = typeof navigator < "u" ? navigator.onLine : true;
  subscribe(e8) {
    return this.listeners.add(e8), () => {
      this.listeners.delete(e8);
    };
  }
  setOnline(e8) {
    this.isOnline = e8, this.listeners.forEach((n18) => n18(e8));
  }
  setup() {
    if (typeof window > "u" || typeof window.addEventListener > "u") return () => {
    };
    let e8 = () => this.setOnline(true), n18 = () => this.setOnline(false);
    return window.addEventListener("online", e8, false), window.addEventListener("offline", n18, false), () => {
      window.removeEventListener("online", e8, false), window.removeEventListener("offline", n18, false);
    };
  }
};
function s5() {
  return globalThis[i6] || (globalThis[i6] = new t3()), globalThis[i6];
}

// vendor/neon/better-auth_1.6.23_es2022_dist_client_parser.mjs
var _7 = { proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, protoShort: /"__proto__"\s*:/, constructorShort: /"constructor"\s*:/ };
var l2 = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
var I7 = { true: true, false: false, null: null, undefined: void 0, nan: NaN, infinity: Number.POSITIVE_INFINITY, "-infinity": Number.NEGATIVE_INFINITY };
var S6 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function E7(t10) {
  return t10 instanceof Date && !isNaN(t10.getTime());
}
function T7(t10) {
  let o21 = S6.exec(t10);
  if (!o21) return null;
  let [, i20, c19, f17, d13, s20, u18, n18, r21, e8, p21] = o21, a16 = new Date(Date.UTC(parseInt(i20, 10), parseInt(c19, 10) - 1, parseInt(f17, 10), parseInt(d13, 10), parseInt(s20, 10), parseInt(u18, 10), n18 ? parseInt(n18.padEnd(3, "0"), 10) : 0));
  if (r21) {
    let N17 = (parseInt(e8, 10) * 60 + parseInt(p21, 10)) * (r21 === "+" ? -1 : 1);
    a16.setUTCMinutes(a16.getUTCMinutes() + N17);
  }
  return E7(a16) ? a16 : null;
}
function m4(t10, o21 = {}) {
  let { strict: i20 = false, warnings: c19 = false, reviver: f17, parseDates: d13 = true } = o21;
  if (typeof t10 != "string") return t10;
  let s20 = t10.trim(), u18 = s20.toLowerCase();
  if (u18.length <= 9 && u18 in I7) return I7[u18];
  if (!l2.test(s20)) {
    if (i20) throw new SyntaxError("[better-json] Invalid JSON");
    return t10;
  }
  if (Object.entries(_7).some(([n18, r21]) => {
    let e8 = r21.test(s20);
    return e8 && c19 && console.warn(`[better-json] Detected potential prototype pollution attempt using ${n18} pattern`), e8;
  }) && i20) throw new Error("[better-json] Potential prototype pollution attempt detected");
  try {
    return JSON.parse(s20, (r21, e8) => {
      if (r21 === "__proto__" || r21 === "constructor" && e8 && typeof e8 == "object" && "prototype" in e8) {
        c19 && console.warn(`[better-json] Dropping "${r21}" key to prevent prototype pollution`);
        return;
      }
      if (d13 && typeof e8 == "string") {
        let p21 = T7(e8);
        if (p21) return p21;
      }
      return f17 ? f17(r21, e8) : e8;
    });
  } catch (n18) {
    if (i20) throw n18;
    return t10;
  }
}
function O5(t10, o21 = { strict: true }) {
  return m4(t10, o21);
}

// vendor/neon/better-auth_1.6.23_es2022_dist_client_query.mjs
var w4 = () => typeof window > "u";
function R6(r21, n18) {
  return o7(r21.data, n18.data) && r21.error === n18.error && r21.isPending === n18.isPending && r21.isRefetching === n18.isRefetching && r21.refetch === n18.refetch;
}
var A5 = (r21, n18, y15, c19) => {
  let e8 = d2({ data: null, error: null, isPending: true, isRefetching: false, refetch: (u18) => o21(u18) });
  s3(e8, R6);
  let o21 = async (u18) => new Promise((l19) => {
    let s20 = typeof c19 == "function" ? c19({ data: e8.get().data, error: e8.get().error, isPending: e8.get().isPending }) : c19;
    y15(n18, { ...s20, query: { ...s20?.query, ...u18?.query }, async onSuccess(t10) {
      let a16 = e8.get(), i20 = a16.data != null && t10.data != null && o7(a16.data, t10.data) ? a16.data : t10.data;
      e8.set({ data: i20, error: null, isPending: false, isRefetching: false, refetch: e8.value.refetch }), await s20?.onSuccess?.(t10);
    }, async onError(t10) {
      let { request: a16 } = t10, i20 = typeof a16.retry == "number" ? a16.retry : a16.retry?.attempts, g12 = a16.retryAttempt || 0;
      if (i20 && g12 < i20) return;
      let m16 = t10.error.status === 401;
      e8.set({ error: t10.error, data: m16 ? null : e8.get().data, isPending: false, isRefetching: false, refetch: e8.value.refetch }), await s20?.onError?.(t10);
    }, async onRequest(t10) {
      let a16 = e8.get();
      e8.set({ isPending: a16.data === null, data: a16.data, error: null, isRefetching: true, refetch: e8.value.refetch }), await s20?.onRequest?.(t10);
    } }).catch((t10) => {
      e8.set({ error: t10, data: e8.get().data, isPending: false, isRefetching: false, refetch: e8.value.refetch });
    }).finally(() => {
      l19(void 0);
    });
  });
  r21 = Array.isArray(r21) ? r21 : [r21];
  let f17 = false, d13 = [];
  for (let u18 of r21) {
    let l19 = u18.subscribe(async () => {
      w4() || (f17 ? await o21() : y3(e8, () => {
        let s20 = setTimeout(async () => {
          f17 || (f17 = true, await o21());
        }, 0);
        return () => {
          for (let t10 of d13) t10();
          clearTimeout(s20);
        };
      }));
    });
    d13.push(l19);
  }
  return e8;
};

// vendor/neon/better-auth_1.6.23_es2022_dist_client_session-refresh.mjs
var r3 = () => Math.floor(Date.now() / 1e3);
var R7 = 5;
function w5(l19) {
  let { fetchSession: n18, shouldPollSession: p21 = () => true, sessionSignal: b12, options: i20 = {} } = l19, u18 = i20.sessionOptions?.refetchInterval ?? 0, f17 = i20.sessionOptions?.refetchOnWindowFocus ?? true, d13 = i20.sessionOptions?.refetchWhenOffline ?? false, e8 = { isInitialized: false, lastSessionRequest: 0 }, S16 = () => d13 || s5().isOnline, t10 = (s20) => {
    if (S16()) {
      if (s20?.event === "storage") {
        n18();
        return;
      }
      if (s20?.event === "poll") {
        e8.lastSessionRequest = r3(), n18();
        return;
      }
      if (s20?.event === "visibilitychange") {
        if (r3() - e8.lastSessionRequest < R7) return;
        e8.lastSessionRequest = r3(), n18();
        return;
      }
      n18();
    }
  }, v13 = (s20) => {
    i4().post({ event: "session", data: { trigger: s20 }, clientId: Math.random().toString(36).substring(7) });
  }, g12 = () => {
    u18 && u18 > 0 && (e8.pollInterval = setInterval(() => {
      p21() && t10({ event: "poll" });
    }, u18 * 1e3));
  }, h17 = () => {
    e8.unsubscribeBroadcast = i4().subscribe(() => {
      t10({ event: "storage" });
    });
  }, O15 = () => {
    f17 && (e8.unsubscribeFocus = s4().subscribe(() => {
      t10({ event: "visibilitychange" });
    }));
  }, I15 = () => {
    e8.unsubscribeOnline = s5().subscribe((s20) => {
      s20 && t10({ event: "visibilitychange" });
    });
  }, F12 = () => {
    e8.unsubscribeSignal = b12.listen(() => {
      n18();
    });
  };
  return { init: () => {
    e8.isInitialized || (e8.isInitialized = true, g12(), h17(), O15(), I15(), F12(), e8.cleanupBroadcastSetup = i4().setup(), e8.cleanupFocusSetup = s4().setup(), e8.cleanupOnlineSetup = s5().setup());
  }, cleanup: () => {
    e8.isInitialized && (e8.pollInterval && (clearInterval(e8.pollInterval), e8.pollInterval = void 0), e8.unsubscribeBroadcast && (e8.unsubscribeBroadcast(), e8.unsubscribeBroadcast = void 0), e8.unsubscribeFocus && (e8.unsubscribeFocus(), e8.unsubscribeFocus = void 0), e8.unsubscribeOnline && (e8.unsubscribeOnline(), e8.unsubscribeOnline = void 0), e8.unsubscribeSignal && (e8.unsubscribeSignal(), e8.unsubscribeSignal = void 0), e8.cleanupBroadcastSetup && (e8.cleanupBroadcastSetup(), e8.cleanupBroadcastSetup = void 0), e8.cleanupFocusSetup && (e8.cleanupFocusSetup(), e8.cleanupFocusSetup = void 0), e8.cleanupOnlineSetup && (e8.cleanupOnlineSetup(), e8.cleanupOnlineSetup = void 0), e8.isInitialized = false, e8.lastSessionRequest = 0);
  }, triggerRefetch: t10, broadcastSessionUpdate: v13 };
}

// vendor/neon/_better-auth_core_1.6.23_es2022_dist_env_env-impl.mjs
var T8 = /* @__PURE__ */ Object.create(null);
var r4 = (n18) => A4?.env || globalThis.Deno?.env.toObject() || globalThis.__env__ || (n18 ? T8 : globalThis);
var s6 = new Proxy(T8, { get(n18, e8) {
  return r4()[e8] ?? T8[e8];
}, has(n18, e8) {
  return e8 in r4() || e8 in T8;
}, set(n18, e8, t10) {
  let u18 = r4(true);
  return u18[e8] = t10, true;
}, deleteProperty(n18, e8) {
  if (!e8) return false;
  let t10 = r4(true);
  return delete t10[e8], true;
}, ownKeys() {
  let n18 = r4(true);
  return Object.keys(n18);
} });
var o8 = s6.NODE_ENV ?? "";
function E8(n18, e8) {
  return typeof A4 < "u" && A4.env ? A4.env[n18] ?? e8 : typeof Deno < "u" ? Deno.env.get(n18) ?? e8 : typeof Bun < "u" ? Bun.env[n18] ?? e8 : e8;
}
var f3 = Object.freeze({ get BETTER_AUTH_SECRET() {
  return E8("BETTER_AUTH_SECRET");
}, get AUTH_SECRET() {
  return E8("AUTH_SECRET");
}, get BETTER_AUTH_TELEMETRY() {
  return E8("BETTER_AUTH_TELEMETRY");
}, get BETTER_AUTH_TELEMETRY_ID() {
  return E8("BETTER_AUTH_TELEMETRY_ID");
}, get NODE_ENV() {
  return E8("NODE_ENV", "development");
}, get PACKAGE_VERSION() {
  return E8("PACKAGE_VERSION", "0.0.0");
}, get BETTER_AUTH_TELEMETRY_ENDPOINT() {
  return E8("BETTER_AUTH_TELEMETRY_ENDPOINT", "");
} });

// vendor/neon/_better-auth_core_1.6.23_es2022_dist_env_color-depth.mjs
var o9 = 1;
var r5 = 4;
var n3 = 8;
var t4 = 24;
var c2 = { eterm: r5, cons25: r5, console: r5, cygwin: r5, dtterm: r5, gnome: r5, hurd: r5, jfbterm: r5, konsole: r5, kterm: r5, mlterm: r5, mosh: t4, putty: r5, st: r5, "rxvt-unicode-24bit": t4, terminator: t4, "xterm-kitty": t4 };
var E9 = new Map(Object.entries({ APPVEYOR: n3, BUILDKITE: n3, CIRCLECI: t4, DRONE: n3, GITEA_ACTIONS: t4, GITHUB_ACTIONS: t4, GITLAB_CI: n3, TRAVIS: n3 }));
var u3 = [/ansi/, /color/, /linux/, /direct/, /^con[0-9]*x[0-9]/, /^rxvt/, /^screen/, /^xterm/, /^vt100/, /^vt220/];
function _8() {
  if (E8("FORCE_COLOR") !== void 0) switch (E8("FORCE_COLOR")) {
    case "":
    case "1":
    case "true":
      return r5;
    case "2":
      return n3;
    case "3":
      return t4;
    default:
      return o9;
  }
  if (E8("NODE_DISABLE_COLORS") !== void 0 && E8("NODE_DISABLE_COLORS") !== "" || E8("NO_COLOR") !== void 0 && E8("NO_COLOR") !== "" || E8("TERM") === "dumb") return o9;
  if (E8("TMUX")) return t4;
  if ("TF_BUILD" in s6 && "AGENT_NAME" in s6) return r5;
  if ("CI" in s6) {
    for (let { 0: O15, 1: i20 } of E9) if (O15 in s6) return i20;
    return E8("CI_NAME") === "codeship" ? n3 : o9;
  }
  if ("TEAMCITY_VERSION" in s6) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.exec(E8("TEAMCITY_VERSION")) !== null ? r5 : o9;
  switch (E8("TERM_PROGRAM")) {
    case "iTerm.app":
      return !E8("TERM_PROGRAM_VERSION") || /^[0-2]\./.exec(E8("TERM_PROGRAM_VERSION")) !== null ? n3 : t4;
    case "HyperTerm":
    case "MacTerm":
      return t4;
    case "Apple_Terminal":
      return n3;
  }
  if (E8("COLORTERM") === "truecolor" || E8("COLORTERM") === "24bit") return t4;
  if (E8("TERM")) {
    if (/truecolor/.exec(E8("TERM")) !== null) return t4;
    if (/^xterm-256/.exec(E8("TERM")) !== null) return n3;
    let O15 = E8("TERM").toLowerCase();
    if (c2[O15]) return c2[O15];
    if (u3.some((i20) => i20.exec(O15) !== null)) return r5;
  }
  return E8("COLORTERM") ? r5 : o9;
}

// vendor/neon/_better-auth_core_1.6.23_es2022_dist_env_logger.mjs
var r6 = { reset: "\x1B[0m", bright: "\x1B[1m", dim: "\x1B[2m", undim: "\x1B[22m", underscore: "\x1B[4m", blink: "\x1B[5m", reverse: "\x1B[7m", hidden: "\x1B[8m", fg: { black: "\x1B[30m", red: "\x1B[31m", green: "\x1B[32m", yellow: "\x1B[33m", blue: "\x1B[34m", magenta: "\x1B[35m", cyan: "\x1B[36m", white: "\x1B[37m" }, bg: { black: "\x1B[40m", red: "\x1B[41m", green: "\x1B[42m", yellow: "\x1B[43m", blue: "\x1B[44m", magenta: "\x1B[45m", cyan: "\x1B[46m", white: "\x1B[47m" } };
var l3 = ["debug", "info", "success", "warn", "error"];
function a4(e8, o21) {
  return l3.indexOf(o21) >= l3.indexOf(e8);
}
var u4 = { info: r6.fg.blue, success: r6.fg.green, warn: r6.fg.yellow, error: r6.fg.red, debug: r6.fg.magenta };
var i7 = (e8, o21, s20) => {
  let m16 = (/* @__PURE__ */ new Date()).toISOString();
  return s20 ? `${r6.dim}${m16}${r6.reset} ${u4[e8]}${e8.toUpperCase()}${r6.reset} ${r6.bright}[Better Auth]:${r6.reset} ${o21}` : `${m16} ${e8.toUpperCase()} [Better Auth]: ${o21}`;
};
var f4 = (e8) => {
  let o21 = e8?.disabled !== true, s20 = e8?.level ?? "warn", m16 = e8?.disableColors !== void 0 ? !e8.disableColors : _8() !== 1, x16 = (t10, c19, n18 = []) => {
    if (!o21 || !a4(s20, t10)) return;
    let g12 = i7(t10, c19, m16);
    if (!e8 || typeof e8.log != "function") {
      t10 === "error" ? console.error(g12, ...n18) : t10 === "warn" ? console.warn(g12, ...n18) : console.log(g12, ...n18);
      return;
    }
    e8.log(t10 === "success" ? "info" : t10, c19, ...n18);
  };
  return { ...Object.fromEntries(l3.map((t10) => [t10, (...[c19, ...n18]) => x16(t10, c19, n18)])), get level() {
    return s20;
  } };
};
var b3 = f4();

// vendor/neon/better-call_1.3.7_es2022_error.mjs
function R9() {
  let E21 = Object.getOwnPropertyDescriptor(Error, "stackTraceLimit");
  return E21 === void 0 ? Object.isExtensible(Error) : Object.prototype.hasOwnProperty.call(E21, "writable") ? E21.writable : E21.set !== void 0;
}
function _9(E21) {
  let r21 = E21.split(`
    at `);
  return r21.length <= 1 ? E21 : (r21.splice(1, 1), r21.join(`
    at `));
}
function i9(E21, r21) {
  class e8 extends E21 {
    #E;
    constructor(...T21) {
      if (R9()) {
        let o21 = Error.stackTraceLimit;
        Error.stackTraceLimit = 0, super(...T21), Error.stackTraceLimit = o21;
      } else super(...T21);
      let s20 = new Error().stack;
      s20 && (this.#E = _9(s20.replace(/^Error/, this.name)));
    }
    get errorStack() {
      return this.#E;
    }
  }
  return Object.defineProperty(e8.prototype, "constructor", { get() {
    return r21;
  }, enumerable: false, configurable: true }), e8;
}
var A6 = { OK: 200, CREATED: 201, ACCEPTED: 202, NO_CONTENT: 204, MULTIPLE_CHOICES: 300, MOVED_PERMANENTLY: 301, FOUND: 302, SEE_OTHER: 303, NOT_MODIFIED: 304, TEMPORARY_REDIRECT: 307, BAD_REQUEST: 400, UNAUTHORIZED: 401, PAYMENT_REQUIRED: 402, FORBIDDEN: 403, NOT_FOUND: 404, METHOD_NOT_ALLOWED: 405, NOT_ACCEPTABLE: 406, PROXY_AUTHENTICATION_REQUIRED: 407, REQUEST_TIMEOUT: 408, CONFLICT: 409, GONE: 410, LENGTH_REQUIRED: 411, PRECONDITION_FAILED: 412, PAYLOAD_TOO_LARGE: 413, URI_TOO_LONG: 414, UNSUPPORTED_MEDIA_TYPE: 415, RANGE_NOT_SATISFIABLE: 416, EXPECTATION_FAILED: 417, "I'M_A_TEAPOT": 418, MISDIRECTED_REQUEST: 421, UNPROCESSABLE_ENTITY: 422, LOCKED: 423, FAILED_DEPENDENCY: 424, TOO_EARLY: 425, UPGRADE_REQUIRED: 426, PRECONDITION_REQUIRED: 428, TOO_MANY_REQUESTS: 429, REQUEST_HEADER_FIELDS_TOO_LARGE: 431, UNAVAILABLE_FOR_LEGAL_REASONS: 451, INTERNAL_SERVER_ERROR: 500, NOT_IMPLEMENTED: 501, BAD_GATEWAY: 502, SERVICE_UNAVAILABLE: 503, GATEWAY_TIMEOUT: 504, HTTP_VERSION_NOT_SUPPORTED: 505, VARIANT_ALSO_NEGOTIATES: 506, INSUFFICIENT_STORAGE: 507, LOOP_DETECTED: 508, NOT_EXTENDED: 510, NETWORK_AUTHENTICATION_REQUIRED: 511 };
var O6 = class extends Error {
  constructor(E21 = "INTERNAL_SERVER_ERROR", r21 = void 0, e8 = {}, t10 = typeof E21 == "number" ? E21 : A6[E21]) {
    super(r21?.message, r21?.cause ? { cause: r21.cause } : void 0), this.status = E21, this.body = r21, this.headers = e8, this.statusCode = t10, this.name = "APIError", this.status = E21, this.headers = e8, this.statusCode = t10, this.body = r21;
  }
};
var c4 = Symbol.for("better-call:api-error-headers");
var N6 = i9(O6, Error);

// vendor/neon/_better-auth_core_1.6.23_es2022_error.mjs
function o10(r21) {
  return Object.fromEntries(Object.entries(r21).map(([e8, _21]) => [e8, { code: e8, message: _21, toString: () => e8 }]));
}
var t5 = o10({ USER_NOT_FOUND: "User not found", FAILED_TO_CREATE_USER: "Failed to create user", FAILED_TO_CREATE_SESSION: "Failed to create session", FAILED_TO_UPDATE_USER: "Failed to update user", FAILED_TO_GET_SESSION: "Failed to get session", INVALID_PASSWORD: "Invalid password", INVALID_EMAIL: "Invalid email", INVALID_EMAIL_OR_PASSWORD: "Invalid email or password", INVALID_USER: "Invalid user", SOCIAL_ACCOUNT_ALREADY_LINKED: "Social account already linked", PROVIDER_NOT_FOUND: "Provider not found", INVALID_TOKEN: "Invalid token", TOKEN_EXPIRED: "Token expired", ID_TOKEN_NOT_SUPPORTED: "id_token not supported", FAILED_TO_GET_USER_INFO: "Failed to get user info", USER_EMAIL_NOT_FOUND: "User email not found", EMAIL_NOT_VERIFIED: "Email not verified", PASSWORD_TOO_SHORT: "Password too short", PASSWORD_TOO_LONG: "Password too long", USER_ALREADY_EXISTS: "User already exists.", USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.", EMAIL_CAN_NOT_BE_UPDATED: "Email can not be updated", CHANGE_EMAIL_DISABLED: "Change email is disabled", CREDENTIAL_ACCOUNT_NOT_FOUND: "Credential account not found", SESSION_EXPIRED: "Session expired. Re-authenticate to perform this action.", FAILED_TO_UNLINK_LAST_ACCOUNT: "You can't unlink your last account", ACCOUNT_NOT_FOUND: "Account not found", USER_ALREADY_HAS_PASSWORD: "User already has a password. Provide that to delete the account.", CROSS_SITE_NAVIGATION_LOGIN_BLOCKED: "Cross-site navigation login blocked. This request appears to be a CSRF attack.", VERIFICATION_EMAIL_NOT_ENABLED: "Verification email isn't enabled", EMAIL_ALREADY_VERIFIED: "Email is already verified", EMAIL_MISMATCH: "Email mismatch", SESSION_NOT_FRESH: "Session is not fresh", LINKED_ACCOUNT_ALREADY_EXISTS: "Linked account already exists", INVALID_ORIGIN: "Invalid origin", INVALID_CALLBACK_URL: "Invalid callbackURL", INVALID_REDIRECT_URL: "Invalid redirectURL", INVALID_ERROR_CALLBACK_URL: "Invalid errorCallbackURL", INVALID_NEW_USER_CALLBACK_URL: "Invalid newUserCallbackURL", MISSING_OR_NULL_ORIGIN: "Missing or null Origin", CALLBACK_URL_REQUIRED: "callbackURL is required", FAILED_TO_CREATE_VERIFICATION: "Unable to create verification", FIELD_NOT_ALLOWED: "Field not allowed to be set", ASYNC_VALIDATION_NOT_SUPPORTED: "Async validation is not supported", VALIDATION_ERROR: "Validation Error", MISSING_FIELD: "Field is required", METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED: "POST method requires deferSessionRefresh to be enabled in session config", BODY_MUST_BE_AN_OBJECT: "Body must be an object", PASSWORD_ALREADY_SET: "User already has a password set" });
var O7 = class extends Error {
  constructor(r21, e8) {
    super(r21, e8), this.name = "BetterAuthError", this.message = r21, this.stack = "";
  }
};

// vendor/neon/better-auth_1.6.23_es2022_dist_utils_url.mjs
var L3 = 47;
function w6(t10) {
  let r21 = t10.length;
  for (; r21 > 0 && t10.charCodeAt(r21 - 1) === L3; ) r21--;
  return r21 === t10.length ? t10 : t10.slice(0, r21);
}
function m6(t10) {
  try {
    return (w6(new URL(t10).pathname) || "/") !== "/";
  } catch {
    throw new O7(`Invalid base URL: ${t10}. Please provide a valid base URL.`);
  }
}
function A7(t10) {
  try {
    let r21 = new URL(t10);
    if (r21.protocol !== "http:" && r21.protocol !== "https:") throw new O7(`Invalid base URL: ${t10}. URL must include 'http://' or 'https://'`);
  } catch (r21) {
    throw r21 instanceof O7 ? r21 : new O7(`Invalid base URL: ${t10}. Please provide a valid base URL.`, { cause: r21 });
  }
}
function s7(t10, r21 = "/api/auth") {
  if (A7(t10), m6(t10)) return t10;
  let o21 = w6(t10);
  return !r21 || r21 === "/" ? o21 : (r21 = r21.startsWith("/") ? r21 : `/${r21}`, `${o21}${r21}`);
}
function c5(t10, r21) {
  return !t10 || t10.trim() === "" ? false : r21 === "proto" ? t10 === "http" || t10 === "https" : r21 === "host" ? [/\.\./, /\0/, /[\s]/, /^[.]/, /[<>'"]/, /javascript:/i, /file:/i, /data:/i].some((o21) => o21.test(t10)) ? false : /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(:[0-9]{1,5})?$/.test(t10) || /^(\d{1,3}\.){3}\d{1,3}(:[0-9]{1,5})?$/.test(t10) || /^\[[0-9a-fA-F:]+\](:[0-9]{1,5})?$/.test(t10) || /^localhost(:[0-9]{1,5})?$/i.test(t10) : false;
}
function h4(t10, r21, o21, e8, n18) {
  if (t10) return s7(t10, r21);
  if (e8 !== false) {
    let f17 = s6.BETTER_AUTH_URL || s6.NEXT_PUBLIC_BETTER_AUTH_URL || s6.PUBLIC_BETTER_AUTH_URL || s6.NUXT_PUBLIC_BETTER_AUTH_URL || s6.NUXT_PUBLIC_AUTH_URL || (s6.BASE_URL !== "/" ? s6.BASE_URL : void 0);
    if (f17) return s7(f17, r21);
  }
  let i20 = o21?.headers.get("x-forwarded-host"), d13 = o21?.headers.get("x-forwarded-proto");
  if (i20 && d13 && n18 && c5(d13, "proto") && c5(i20, "host")) try {
    return s7(`${d13}://${i20}`, r21);
  } catch {
  }
  if (o21) {
    let f17 = _10(o21.url);
    if (!f17) throw new O7("Could not get origin from request. Please provide a valid base URL.");
    return s7(f17, r21);
  }
  if (typeof window < "u" && window.location) return s7(window.location.origin, r21);
}
function _10(t10) {
  try {
    let r21 = new URL(t10);
    return r21.origin === "null" ? null : r21.origin;
  } catch {
    return null;
  }
}

// vendor/neon/_better-auth_core_1.6.23_es2022_utils_url.mjs
var n4 = ["javascript:", "data:", "vbscript:"];
function i10(a16) {
  let t10;
  try {
    t10 = new URL(a16);
  } catch {
    return true;
  }
  return !n4.includes(t10.protocol);
}

// vendor/neon/defu_6.1.7_es2022_defu.mjs
function e2(t10) {
  if (t10 === null || typeof t10 != "object") return false;
  let r21 = Object.getPrototypeOf(t10);
  return r21 !== null && r21 !== Object.prototype && Object.getPrototypeOf(r21) !== null || Symbol.iterator in t10 ? false : Symbol.toStringTag in t10 ? Object.prototype.toString.call(t10) === "[object Module]" : true;
}
function c6(t10, r21, o21 = ".", u18) {
  if (!e2(r21)) return c6(t10, {}, o21, u18);
  let i20 = { ...r21 };
  for (let n18 of Object.keys(t10)) {
    if (n18 === "__proto__" || n18 === "constructor") continue;
    let f17 = t10[n18];
    f17 != null && (u18 && u18(i20, n18, f17, o21) || (Array.isArray(f17) && Array.isArray(i20[n18]) ? i20[n18] = [...f17, ...i20[n18]] : e2(f17) && e2(i20[n18]) ? i20[n18] = c6(f17, i20[n18], (o21 ? `${o21}.` : "") + n18.toString(), u18) : i20[n18] = f17));
  }
  return i20;
}
function y4(t10) {
  return (...r21) => r21.reduce((o21, u18) => c6(o21, u18, "", t10), {});
}
var l4 = y4();
var s8 = y4((t10, r21, o21) => {
  if (t10[r21] !== void 0 && typeof o21 == "function") return t10[r21] = o21(t10[r21]), true;
});
var p = y4((t10, r21, o21) => {
  if (Array.isArray(t10[r21]) && typeof o21 == "function") return t10[r21] = o21(t10[r21]), true;
});

// vendor/neon/_better-fetch_fetch_1.3.1_es2022_fetch.mjs
var z6 = Object.defineProperty;
var G5 = Object.defineProperties;
var K5 = Object.getOwnPropertyDescriptors;
var $3 = Object.getOwnPropertySymbols;
var Q4 = Object.prototype.hasOwnProperty;
var X5 = Object.prototype.propertyIsEnumerable;
var k5 = (t10, e8, r21) => e8 in t10 ? z6(t10, e8, { enumerable: true, configurable: true, writable: true, value: r21 }) : t10[e8] = r21;
var w7 = (t10, e8) => {
  for (var r21 in e8 || (e8 = {})) Q4.call(e8, r21) && k5(t10, r21, e8[r21]);
  if ($3) for (var r21 of $3(e8)) X5.call(e8, r21) && k5(t10, r21, e8[r21]);
  return t10;
};
var R10 = (t10, e8) => G5(t10, K5(e8));
var Y4 = class extends Error {
  constructor(t10, e8, r21) {
    super(e8 || t10.toString(), { cause: r21 }), this.status = t10, this.statusText = e8, this.error = r21, Error.captureStackTrace(this, this.constructor);
  }
};
var Z5 = async (t10, e8) => {
  var r21, n18, o21, a16, f17, d13;
  let i20 = e8 || {}, s20 = { onRequest: [e8?.onRequest], onResponse: [e8?.onResponse], onSuccess: [e8?.onSuccess], onError: [e8?.onError], onRetry: [e8?.onRetry] };
  if (!e8 || !e8?.plugins) return { url: t10, options: i20, hooks: s20 };
  for (let u18 of e8?.plugins || []) {
    if (u18.init) {
      let b12 = await ((r21 = u18.init) == null ? void 0 : r21.call(u18, t10.toString(), e8));
      i20 = b12.options || i20, t10 = b12.url;
    }
    s20.onRequest.push((n18 = u18.hooks) == null ? void 0 : n18.onRequest), s20.onResponse.push((o21 = u18.hooks) == null ? void 0 : o21.onResponse), s20.onSuccess.push((a16 = u18.hooks) == null ? void 0 : a16.onSuccess), s20.onError.push((f17 = u18.hooks) == null ? void 0 : f17.onError), s20.onRetry.push((d13 = u18.hooks) == null ? void 0 : d13.onRetry);
  }
  return { url: t10, options: i20, hooks: s20 };
};
var q5 = class {
  constructor(t10) {
    this.options = t10;
  }
  shouldAttemptRetry(t10, e8) {
    return this.options.shouldRetry ? Promise.resolve(t10 < this.options.attempts && this.options.shouldRetry(e8)) : Promise.resolve(t10 < this.options.attempts);
  }
  getDelay() {
    return this.options.delay;
  }
};
var ee4 = class {
  constructor(t10) {
    this.options = t10;
  }
  shouldAttemptRetry(t10, e8) {
    return this.options.shouldRetry ? Promise.resolve(t10 < this.options.attempts && this.options.shouldRetry(e8)) : Promise.resolve(t10 < this.options.attempts);
  }
  getDelay(t10) {
    return Math.min(this.options.maxDelay, this.options.baseDelay * 2 ** t10);
  }
};
function te4(t10) {
  if (typeof t10 == "number") return new q5({ type: "linear", attempts: t10, delay: 1e3 });
  switch (t10.type) {
    case "linear":
      return new q5(t10);
    case "exponential":
      return new ee4(t10);
    default:
      throw new Error("Invalid retry strategy");
  }
}
var re3 = async (t10) => {
  let e8 = {}, r21 = async (n18) => typeof n18 == "function" ? await n18() : n18;
  if (t10?.auth) {
    if (t10.auth.type === "Bearer") {
      let n18 = await r21(t10.auth.token);
      if (!n18) return e8;
      e8.authorization = `Bearer ${n18}`;
    } else if (t10.auth.type === "Basic") {
      let [n18, o21] = await Promise.all([r21(t10.auth.username), r21(t10.auth.password)]);
      if (!n18 || !o21) return e8;
      e8.authorization = `Basic ${btoa(`${n18}:${o21}`)}`;
    } else if (t10.auth.type === "Custom") {
      let [n18, o21] = await Promise.all([r21(t10.auth.prefix), r21(t10.auth.value)]);
      if (!o21) return e8;
      e8.authorization = `${n18 ?? ""} ${o21}`;
    }
  }
  return e8;
};
var ne4 = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function ae4(t10) {
  let e8 = t10.headers.get("content-type"), r21 = /* @__PURE__ */ new Set(["image/svg", "application/xml", "application/xhtml", "application/html"]);
  if (!e8) return "json";
  let n18 = e8.split(";").shift() || "";
  return ne4.test(n18) ? "json" : r21.has(n18) || n18.startsWith("text/") ? "text" : "blob";
}
function se4(t10) {
  try {
    return JSON.parse(t10), true;
  } catch {
    return false;
  }
}
function N7(t10) {
  if (t10 === void 0) return false;
  let e8 = typeof t10;
  return e8 === "string" || e8 === "number" || e8 === "boolean" || e8 === null ? true : e8 !== "object" ? false : Array.isArray(t10) ? true : t10.buffer ? false : t10.constructor && t10.constructor.name === "Object" || typeof t10.toJSON == "function";
}
function C5(t10) {
  try {
    return JSON.parse(t10);
  } catch {
    return t10;
  }
}
function W6(t10) {
  return typeof t10 == "function";
}
function oe4(t10) {
  if (t10?.customFetchImpl) return t10.customFetchImpl;
  if (typeof globalThis < "u" && W6(globalThis.fetch)) return globalThis.fetch;
  if (typeof window < "u" && W6(window.fetch)) return window.fetch;
  throw new Error("No fetch implementation found");
}
function H5(...t10) {
  let e8 = {};
  for (let r21 of t10) if (r21) if (r21 instanceof Headers) r21.forEach((n18, o21) => {
    e8[o21] = n18;
  });
  else {
    let n18 = Array.isArray(r21) ? r21 : Object.entries(r21);
    for (let [o21, a16] of n18) a16 != null && (e8[o21] = a16);
  }
  return e8;
}
async function ie4(t10) {
  let e8 = new Headers(H5(t10?.headers, await re3(t10)));
  if (!e8.has("content-type")) {
    let r21 = le4(t10?.body);
    r21 && e8.set("content-type", r21);
  }
  return e8;
}
function le4(t10) {
  return N7(t10) ? "application/json" : null;
}
function ue4(t10) {
  let e8 = t10.get("content-type");
  return e8 ? e8.split(";")[0].trim().toLowerCase() : null;
}
function ce4(t10, e8) {
  let { body: r21 } = t10;
  return r21 ? !N7(r21) || typeof r21 == "string" ? r21 : ue4(e8) === "application/x-www-form-urlencoded" ? new URLSearchParams(r21).toString() : JSON.stringify(r21) : null;
}
function fe4(t10, e8) {
  var r21;
  if (e8?.method) return e8.method.toUpperCase();
  if (t10.startsWith("@")) {
    let n18 = (r21 = t10.split("@")[1]) == null ? void 0 : r21.split("/")[0];
    return j5.includes(n18) ? n18.toUpperCase() : e8?.body ? "POST" : "GET";
  }
  return e8?.body ? "POST" : "GET";
}
function de4(t10, e8) {
  let r21;
  return !t10?.signal && t10?.timeout && (r21 = setTimeout(() => e8?.abort(), t10?.timeout)), { abortTimeout: r21, clearTimeout: () => {
    r21 && clearTimeout(r21);
  } };
}
var he4 = class J5 extends Error {
  constructor(e8, r21) {
    super(r21 || JSON.stringify(e8, null, 2)), this.issues = e8, Object.setPrototypeOf(this, J5.prototype);
  }
};
async function T9(t10, e8) {
  let r21 = await t10["~standard"].validate(e8);
  if (r21.issues) throw new he4(r21.issues);
  return r21.value;
}
var j5 = ["get", "post", "put", "patch", "delete"];
var ye4 = (t10) => ({ id: "apply-schema", name: "Apply Schema", version: "1.0.0", async init(e8, r21) {
  var n18, o21, a16, f17;
  let d13 = ((o21 = (n18 = t10.plugins) == null ? void 0 : n18.find((i20) => {
    var s20;
    return (s20 = i20.schema) != null && s20.config ? e8.startsWith(i20.schema.config.baseURL || "") || e8.startsWith(i20.schema.config.prefix || "") : false;
  })) == null ? void 0 : o21.schema) || t10.schema;
  if (d13) {
    let i20 = e8;
    (a16 = d13.config) != null && a16.prefix && i20.startsWith(d13.config.prefix) && (i20 = i20.replace(d13.config.prefix, ""), d13.config.baseURL && (e8 = e8.replace(d13.config.prefix, d13.config.baseURL))), (f17 = d13.config) != null && f17.baseURL && i20.startsWith(d13.config.baseURL) && (i20 = i20.replace(d13.config.baseURL, "")), i20.startsWith("/") && i20.charAt(1) === "@" && (i20 = i20.substring(1));
    let s20 = d13.schema[i20];
    if (s20) {
      let u18 = r21?.headers;
      if (s20.headers && !r21?.disableValidation) {
        let l19 = {};
        if (r21?.headers) {
          if (r21.headers instanceof Headers) r21.headers.forEach((g12, S16) => {
            l19[S16.toLowerCase()] = g12;
          });
          else if (typeof r21.headers == "object") for (let [g12, S16] of Object.entries(r21.headers)) S16 != null && (l19[g12.toLowerCase()] = S16);
        }
        let p21 = await T9(s20.headers, l19), m16 = {};
        for (let [g12, S16] of Object.entries(p21)) m16[g12.toLowerCase()] = S16;
        u18 = m16;
      }
      let b12 = R10(w7({}, r21), { method: s20.method, output: s20.output, headers: u18 });
      return r21?.disableValidation || (b12 = R10(w7({}, b12), { body: s20.input ? await T9(s20.input, r21?.body) : r21?.body, params: s20.params ? await T9(s20.params, r21?.params) : r21?.params, query: s20.query ? await T9(s20.query, r21?.query) : r21?.query })), { url: e8, options: b12 };
    }
  }
  return { url: e8, options: r21 };
} });
var Pe4 = (t10) => {
  async function e8(r21, n18) {
    let o21 = R10(w7(w7({}, t10), n18), { headers: H5(t10?.headers, n18?.headers), plugins: [...t10?.plugins || [], ye4(t10 || {}), ...n18?.plugins || []] });
    if (t10?.catchAllError) try {
      return await x7(r21, o21);
    } catch (a16) {
      return { data: null, error: { status: 500, statusText: "Fetch Error", message: "Fetch related error. Captured by catchAllError option. See error property for more details.", error: a16 } };
    }
    return await x7(r21, o21);
  }
  return e8;
};
var pe4 = (t10) => t10 === "." || t10 === "..";
function ve4(t10, e8) {
  let r21 = t10;
  for (let [n18, o21] of e8) r21 = r21.replace(n18, o21);
  if (pe4(r21)) throw new TypeError("Path parameters cannot be reserved path segments");
  return encodeURIComponent(r21);
}
function me4(t10, e8) {
  let { baseURL: r21, params: n18, query: o21 } = e8 || { query: {}, params: {}, baseURL: "" }, a16 = t10.startsWith("http") ? t10.split("/").slice(0, 3).join("/") : r21 || "";
  if (t10.startsWith("@")) {
    let l19 = t10.toString().split("@")[1].split("/")[0];
    j5.includes(l19) && (t10 = t10.replace(`@${l19}/`, "/"));
  }
  a16.endsWith("/") || (a16 += "/");
  let [f17, d13] = t10.replace(a16, "").split("?"), i20 = new URLSearchParams(d13);
  for (let [l19, p21] of Object.entries(o21 || {})) {
    if (p21 == null) continue;
    let m16;
    if (typeof p21 == "string") m16 = p21;
    else if (Array.isArray(p21)) {
      for (let g12 of p21) i20.append(l19, g12);
      continue;
    } else m16 = JSON.stringify(p21);
    i20.set(l19, m16);
  }
  let s20 = /* @__PURE__ */ new Map();
  if (n18) if (Array.isArray(n18)) {
    let l19 = f17.split("/").filter((p21) => p21.startsWith(":"));
    for (let [p21, m16] of l19.entries()) {
      let g12 = n18[p21];
      s20.set(m16, String(g12));
    }
  } else for (let [l19, p21] of Object.entries(n18)) s20.set(`:${l19}`, String(p21));
  f17 = f17.split("/").map((l19) => ve4(l19, s20)).join("/"), f17 = f17.replace(/^\/+/, "");
  let u18 = i20.toString();
  return u18 = u18.length > 0 ? `?${u18}`.replace(/\+/g, "%20") : "", a16.startsWith("http") ? new URL(`${f17}${u18}`, a16) : `${a16}${f17}${u18}`;
}
var x7 = async (t10, e8) => {
  var r21, n18, o21, a16, f17, d13, i20, s20;
  let { hooks: u18, url: b12, options: l19 } = await Z5(t10, e8), p21 = oe4(l19), m16 = new AbortController(), g12 = (r21 = l19.signal) != null ? r21 : m16.signal, S16 = me4(b12, l19), L14 = await ie4(l19), D13 = ce4(l19, L14), M10 = fe4(b12, l19), h17 = R10(w7({}, l19), { url: S16, headers: L14, body: D13, method: M10, signal: g12 });
  for (let v13 of u18.onRequest) if (v13) {
    let y15 = await v13(h17);
    typeof y15 == "object" && y15 !== null && Object.assign(h17, y15);
  }
  ("pipeTo" in h17 && typeof h17.pipeTo == "function" || typeof ((n18 = e8?.body) == null ? void 0 : n18.pipe) == "function") && ("duplex" in h17 || (h17.duplex = "half"));
  let { clearTimeout: F12 } = de4(l19, m16), c19 = await p21(h17.url, h17);
  F12();
  let U10 = { response: c19, request: h17 };
  for (let v13 of u18.onResponse) if (v13) {
    let y15 = await v13(R10(w7({}, U10), { response: (o21 = e8?.hookOptions) != null && o21.cloneResponse ? c19.clone() : c19 }));
    y15 instanceof Response ? c19 = y15 : typeof y15 == "object" && y15 !== null && (c19 = y15.response);
  }
  if (c19.ok) {
    if (!(h17.method !== "HEAD")) return { data: "", error: null };
    let y15 = ae4(c19), P12 = { data: null, response: c19, request: h17 };
    if (y15 === "json" || y15 === "text") {
      let _21 = await c19.text(), V9 = (a16 = h17.jsonParser) != null ? a16 : C5;
      P12.data = await V9(_21);
    } else P12.data = await c19[y15]();
    h17?.output && h17.output && !h17.disableValidation && (P12.data = await T9(h17.output, P12.data));
    for (let _21 of u18.onSuccess) _21 && await _21(R10(w7({}, P12), { response: (f17 = e8?.hookOptions) != null && f17.cloneResponse ? c19.clone() : c19 }));
    return e8?.throw ? P12.data : { data: P12.data, error: null };
  }
  let B11 = (d13 = e8?.jsonParser) != null ? d13 : C5, O15 = await c19.text(), A19 = se4(O15), E21 = A19 ? await B11(O15) : null, I15 = { response: c19, responseText: O15, request: h17, error: R10(w7({}, E21), { status: c19.status, statusText: c19.statusText }) };
  for (let v13 of u18.onError) v13 && await v13(R10(w7({}, I15), { response: (i20 = e8?.hookOptions) != null && i20.cloneResponse ? c19.clone() : c19 }));
  if (e8?.retry) {
    let v13 = te4(e8.retry), y15 = (s20 = e8.retryAttempt) != null ? s20 : 0;
    if (await v13.shouldAttemptRetry(y15, c19)) {
      for (let _21 of u18.onRetry) _21 && await _21(U10);
      let P12 = v13.getDelay(y15);
      return await new Promise((_21) => setTimeout(_21, P12)), await x7(t10, R10(w7({}, e8), { retryAttempt: y15 + 1 }));
    }
  }
  if (e8?.throw) throw new Y4(c19.status, c19.statusText, A19 ? E21 : O15);
  return { data: null, error: R10(w7({}, E21), { status: c19.status, statusText: c19.statusText }) };
};

// vendor/neon/better-auth_1.6.23_es2022_dist_client_config.mjs
var y5 = { id: "redirect", name: "Redirect", hooks: { onSuccess(e8) {
  if (e8.data?.url && e8.data?.redirect && i10(e8.data.url) && typeof window < "u" && window.location && window.location) try {
    window.location.href = e8.data.url;
  } catch {
  }
} } };
var k6 = () => typeof window > "u";
function L4(e8) {
  return typeof e8 == "object" && e8 !== null && "data" in e8 && "error" in e8 ? e8 : { data: e8, error: null };
}
function q6(e8) {
  return !e8 || e8.session === null && e8.user === null ? null : e8;
}
function $4(e8, r21) {
  return o7(e8.data, r21.data) && e8.error === r21.error && e8.isPending === r21.isPending && e8.isRefetching === r21.isRefetching && e8.refetch === r21.refetch;
}
function w8(e8, r21) {
  let g12 = d2(false), a16, c19 = (o21) => S16(o21), n18 = d2({ data: null, error: null, isPending: true, isRefetching: false, refetch: c19 });
  s3(n18, $4);
  let h17 = (o21) => {
    if (a16 !== o21) return;
    let t10 = n18.get();
    a16 = void 0, !(!t10.isPending && !t10.isRefetching) && n18.set({ ...t10, isPending: false, isRefetching: false, refetch: c19 });
  }, S16 = async (o21) => {
    a16?.abort();
    let t10 = new AbortController();
    a16 = t10;
    let i20 = n18.get();
    n18.set({ ...i20, isPending: i20.data === null, isRefetching: true, error: null, refetch: c19 });
    try {
      let R20 = await e8("/get-session", { method: "GET", query: o21?.query, signal: t10.signal });
      if (t10.signal.aborted) {
        h17(t10);
        return;
      }
      let { data: u18, error: f17 } = L4(R20);
      if (u18?.needsRefresh) try {
        let m16 = await e8("/get-session", { method: "POST", signal: t10.signal });
        if (t10.signal.aborted) {
          h17(t10);
          return;
        }
        ({ data: u18, error: f17 } = L4(m16));
      } catch {
        if (t10.signal.aborted) {
          h17(t10);
          return;
        }
      }
      if (f17) {
        let m16 = n18.get(), P12 = f17?.status === 401;
        n18.set({ data: P12 ? null : m16.data, error: f17, isPending: false, isRefetching: false, refetch: c19 });
        return;
      }
      let p21 = q6(u18), d13 = n18.get(), l19 = d13.data != null && p21 != null && o7(d13.data, p21) ? d13.data : p21;
      n18.set({ data: l19, error: null, isPending: false, isRefetching: false, refetch: c19 });
    } catch (R20) {
      if (t10.signal.aborted) {
        h17(t10);
        return;
      }
      let u18 = n18.get();
      n18.set({ data: u18.data, error: R20, isPending: false, isRefetching: false, refetch: c19 });
    }
  }, U10 = () => {
  };
  return y3(n18, () => {
    let o21;
    k6() || (o21 = setTimeout(() => {
      S16();
    }, 0));
    let t10 = w5({ fetchSession: S16, shouldPollSession: () => n18.get().data != null, sessionSignal: g12, options: r21 });
    return t10.init(), U10 = t10.broadcastSessionUpdate, () => {
      o21 && clearTimeout(o21);
      let i20 = a16;
      i20?.abort(), i20 && h17(i20), t10.cleanup();
    };
  }), { session: n18, $sessionSignal: g12, broadcastSessionUpdate: (o21) => U10(o21) };
}
var D5 = (e8) => {
  if (typeof A4 > "u") return;
  let r21 = e8 ?? "/api/auth";
  if (A4.env.NEXT_PUBLIC_AUTH_URL) return A4.env.NEXT_PUBLIC_AUTH_URL;
  if (typeof window > "u") {
    if (A4.env.NEXTAUTH_URL) try {
      return A4.env.NEXTAUTH_URL;
    } catch {
    }
    if (A4.env.VERCEL_URL) try {
      let g12 = A4.env.VERCEL_URL.startsWith("http") ? "" : "https://";
      return `${new URL(`${g12}${A4.env.VERCEL_URL}`).origin}${r21}`;
    } catch {
    }
  }
};
var Z6 = (e8, r21) => {
  let g12 = "credentials" in Request.prototype, a16 = h4(e8?.baseURL, e8?.basePath, void 0, r21) ?? D5(e8?.basePath) ?? "/api/auth", c19 = e8?.plugins?.flatMap((s20) => s20.fetchPlugins).filter((s20) => s20 !== void 0) || [], n18 = { id: "lifecycle-hooks", name: "lifecycle-hooks", hooks: { onSuccess: e8?.fetchOptions?.onSuccess, onError: e8?.fetchOptions?.onError, onRequest: e8?.fetchOptions?.onRequest, onResponse: e8?.fetchOptions?.onResponse } }, { onSuccess: h17, onError: S16, onRequest: U10, onResponse: o21, ...t10 } = e8?.fetchOptions || {}, i20 = Pe4({ baseURL: a16, ...g12 ? { credentials: "include" } : {}, method: "GET", jsonParser(s20) {
    return s20 ? O5(s20, { strict: false }) : null;
  }, customFetchImpl: fetch, ...t10, plugins: [n18, ...t10.plugins || [], ...e8?.disableDefaultFetchPlugins ? [] : [y5], ...c19] }), { $sessionSignal: R20, session: u18, broadcastSessionUpdate: f17 } = w8(i20, e8), p21 = e8?.plugins || [], d13 = {}, l19 = { $sessionSignal: R20, session: u18 }, m16 = { "/sign-out": "POST", "/revoke-sessions": "POST", "/revoke-other-sessions": "POST", "/delete-user": "POST" }, P12 = [{ signal: "$sessionSignal", matcher(s20) {
    return s20 === "/sign-out" || s20 === "/update-user" || s20 === "/update-session" || s20 === "/sign-up/email" || s20 === "/sign-in/email" || s20 === "/delete-user" || s20 === "/verify-email" || s20 === "/revoke-sessions" || s20 === "/revoke-session" || s20 === "/revoke-other-sessions" || s20 === "/change-email" || s20 === "/change-password";
  }, callback(s20) {
    s20 === "/sign-out" ? f17("signout") : (s20 === "/update-user" || s20 === "/update-session") && f17("updateUser");
  } }];
  for (let s20 of p21) s20.getAtoms && Object.assign(l19, s20.getAtoms?.(i20)), s20.pathMethods && Object.assign(m16, s20.pathMethods), s20.atomListeners && P12.push(...s20.atomListeners);
  let b12 = { notify: (s20) => {
    l19[s20].set(!l19[s20].get());
  }, listen: (s20, T21) => {
    l19[s20].subscribe(T21);
  }, atoms: l19 };
  for (let s20 of p21) s20.getActions && (d13 = l4(s20.getActions?.(i20, b12, e8) ?? {}, d13));
  return { get baseURL() {
    return a16;
  }, pluginsActions: d13, pluginsAtoms: l19, pluginPathMethods: m16, atomListeners: P12, $fetch: i20, $store: b12 };
};

// vendor/neon/_better-auth_core_1.6.23_es2022_utils_string.mjs
function s9(e8) {
  return e8.charAt(0).toUpperCase() + e8.slice(1);
}
var r7 = /[\p{Ll}\d]+|\p{Lu}+(?!\p{Ll})|\p{Lu}[\p{Ll}\d]+|\p{Lo}+/gu;
var p2 = /['\u2019]/g;
function o11(e8) {
  return e8.replace(p2, "").match(r7) ?? [];
}
function c7(e8) {
  return o11(e8).map((t10) => t10.toLowerCase()).join("-");
}

// vendor/neon/better-auth_1.6.23_es2022_dist_client_proxy.mjs
function b4(n18) {
  return typeof n18 == "object" && n18 !== null && "get" in n18 && typeof n18.get == "function" && "lc" in n18 && typeof n18.lc == "number";
}
function w9(n18, a16, y15) {
  let u18 = a16[n18], { fetchOptions: r21, query: h17, ...c19 } = y15 || {};
  return u18 || (r21?.method ? r21.method : c19 && Object.keys(c19).length > 0 ? "POST" : "GET");
}
function E10(n18, a16, y15, u18, r21) {
  function h17(c19 = []) {
    return new Proxy(function() {
    }, { get(p21, e8) {
      if (typeof e8 != "string" || e8 === "then" || e8 === "catch" || e8 === "finally") return;
      let i20 = [...c19, e8], t10 = n18;
      for (let s20 of i20) if (t10 && typeof t10 == "object" && s20 in t10) t10 = t10[s20];
      else {
        t10 = void 0;
        break;
      }
      return typeof t10 == "function" || b4(t10) ? t10 : h17(i20);
    }, apply: async (p21, e8, i20) => {
      let t10 = "/" + c19.map(c7).join("/"), s20 = i20[0] || {}, P12 = i20[1] || {}, { query: O15, fetchOptions: q11, ...x16 } = s20, f17 = { ...P12, ...q11 }, m16 = w9(t10, y15, s20);
      return await a16(t10, { ...f17, body: m16 === "GET" ? void 0 : { ...x16, ...f17?.body || {} }, query: O15 || f17?.query, method: m16, async onSuccess(S16) {
        if (await f17?.onSuccess?.(S16), !r21 || f17.disableSignal) return;
        let d13 = r21.filter((o21) => o21.matcher(t10));
        if (!d13.length) return;
        let g12 = /* @__PURE__ */ new Set();
        for (let o21 of d13) {
          let l19 = u18[o21.signal];
          if (!l19) return;
          if (g12.has(o21.signal)) continue;
          g12.add(o21.signal);
          let _21 = l19.get();
          setTimeout(() => {
            l19.set(!_21);
          }, 10), o21.callback?.(t10);
        }
      } });
    } });
  }
  return h17();
}

// vendor/neon/better-auth_1.6.23_es2022_dist_client_vanilla.mjs
function y6(r21) {
  let { pluginPathMethods: i20, pluginsActions: n18, pluginsAtoms: t10, $fetch: e8, atomListeners: s20, $store: c19 } = Z6(r21), o21 = {};
  for (let [a16, m16] of Object.entries(t10)) o21[`use${s9(a16)}`] = m16;
  return E10({ ...n18, ...o21, $fetch: e8, $store: c19 }, e8, i20, t10, s20);
}

// vendor/neon/_better-auth_core_1.6.23_es2022_utils_error-codes.mjs
function n5(r21) {
  return Object.fromEntries(Object.entries(r21).map(([e8, t10]) => [e8, { code: e8, message: t10, toString: () => e8 }]));
}

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_admin_error-codes.mjs
var E11 = n5({ FAILED_TO_CREATE_USER: "Failed to create user", USER_ALREADY_EXISTS: "User already exists.", USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.", YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself", YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role", YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users", YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users", YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions", YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users", YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users", YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions", YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users", YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password", BANNED_USER: "You have been banned from this application", YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user", NO_DATA_TO_UPDATE: "No data to update", YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users", YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself", YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE: "You are not allowed to set a non-existent role value", YOU_CANNOT_IMPERSONATE_ADMINS: "You cannot impersonate admins", INVALID_ROLE_TYPE: "Invalid role type", YOU_ARE_NOT_ALLOWED_TO_SET_USERS_EMAIL: "You are not allowed to update users email", PASSWORD_CANNOT_BE_UPDATED_VIA_UPDATE_USER: "Password cannot be updated through update-user. Use the set-user-password endpoint instead" });

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_access_access.mjs
function R11(r21) {
  return { success: false, error: `You are not allowed to access resource: ${r21}` };
}
function h5(r21) {
  return { success: false, error: `unauthorized to access resource "${r21}"` };
}
function c8(r21) {
  return r21 === "OR" ? "OR" : "AND";
}
function i11(r21) {
  return Array.isArray(r21);
}
function A8(r21) {
  if (i11(r21)) return { actions: r21, connector: "AND" };
  if (!r21 || typeof r21 != "object") throw new O7("Invalid access control request");
  let { actions: e8, connector: n18 } = r21;
  return i11(e8) ? { actions: e8, connector: c8(n18) } : { actions: [], connector: c8(n18) };
}
function f5(r21, e8) {
  return typeof e8 == "string" && r21.includes(e8);
}
function z7(r21, { actions: e8, connector: n18 }) {
  return e8.length === 0 ? false : n18 === "OR" ? e8.some((t10) => f5(r21, t10)) : e8.every((t10) => f5(r21, t10));
}
function d3(r21) {
  return { authorize(e8, n18 = "AND") {
    let t10 = false;
    for (let [o21, a16] of Object.entries(e8)) {
      let s20 = r21[o21];
      if (!s20) {
        if (n18 === "AND") return R11(o21);
        continue;
      }
      let u18 = z7(s20, A8(a16));
      if (u18 && (t10 = true), u18 && n18 === "OR") return { success: true };
      if (!u18 && n18 === "AND") return h5(o21);
    }
    return t10 ? { success: true } : { success: false, error: "Not authorized" };
  }, statements: r21 };
}
function w10(r21) {
  return { newRole(e8) {
    return d3(e8);
  }, statements: r21 };
}

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_admin_access_statement.mjs
var t6 = { user: ["create", "list", "set-role", "ban", "impersonate", "impersonate-admins", "delete", "set-password", "set-email", "get", "update"], session: ["list", "revoke", "delete"] };
var e3 = w10(t6);
var o12 = e3.newRole({ user: ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "set-email", "get", "update"], session: ["list", "revoke", "delete"] });
var a5 = e3.newRole({ user: [], session: [] });
var n6 = { admin: o12, user: a5 };

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_admin_has-permission.mjs
var f6 = (s20) => {
  if (s20.userId && s20.options?.adminUserIds?.includes(s20.userId)) return true;
  if (!s20.permissions) return false;
  let e8 = (s20.role || s20.options?.defaultRole || "user").split(","), o21 = s20.options?.roles || n6;
  for (let r21 of e8) if (o21[r21]?.authorize(s20.permissions)?.success) return true;
  return false;
};

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_anonymous_error-codes.mjs
var E12 = n5({ INVALID_EMAIL_FORMAT: "Email was not generated in a valid format", FAILED_TO_CREATE_USER: "Failed to create user", COULD_NOT_CREATE_SESSION: "Could not create session", ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY: "Anonymous users cannot sign in again anonymously", FAILED_TO_DELETE_ANONYMOUS_USER: "Failed to delete anonymous user", FAILED_TO_DELETE_ANONYMOUS_USER_SESSIONS: "Failed to delete anonymous user sessions", USER_IS_NOT_ANONYMOUS: "User is not anonymous", DELETE_ANONYMOUS_USER_DISABLED: "Deleting anonymous users is disabled" });

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_email-otp_error-codes.mjs
var o13 = n5({ OTP_EXPIRED: "OTP expired", INVALID_OTP: "Invalid OTP", TOO_MANY_ATTEMPTS: "Too many attempts" });

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_generic-oauth_error-codes.mjs
var r8 = n5({ INVALID_OAUTH_CONFIGURATION: "Invalid OAuth configuration", TOKEN_URL_NOT_FOUND: "Invalid OAuth configuration. Token URL not found.", PROVIDER_CONFIG_NOT_FOUND: "No config found for provider", PROVIDER_ID_REQUIRED: "Provider ID is required", INVALID_OAUTH_CONFIG: "Invalid OAuth configuration.", SESSION_REQUIRED: "Session is required", ISSUER_MISMATCH: "OAuth issuer mismatch. The authorization server issuer does not match the expected value (RFC 9207).", ISSUER_MISSING: "OAuth issuer parameter missing. The authorization server did not include the required iss parameter (RFC 9207)." });

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_multi-session_error-codes.mjs
var e4 = n5({ INVALID_SESSION_TOKEN: "Invalid session token" });

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_oauth-popup_error-codes.mjs
var p3 = n5({ POPUP_SIGN_IN_FAILED: "Popup sign-in failed", POPUP_BLOCKED: "Sign-in popup was blocked by the browser", POPUP_CLOSED: "Sign-in popup was closed before completing", POPUP_TIMEOUT: "Sign-in popup timed out" });

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_organization_error-codes.mjs
var E13 = n5({ YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION: "You are not allowed to create a new organization", YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS: "You have reached the maximum number of organizations", ORGANIZATION_ALREADY_EXISTS: "Organization already exists", ORGANIZATION_SLUG_ALREADY_TAKEN: "Organization slug already taken", ORGANIZATION_NOT_FOUND: "Organization not found", USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION: "User is not a member of the organization", YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION: "You are not allowed to update this organization", YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION: "You are not allowed to delete this organization", NO_ACTIVE_ORGANIZATION: "No active organization", USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION: "User is already a member of this organization", MEMBER_NOT_FOUND: "Member not found", ROLE_NOT_FOUND: "Role not found", YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM: "You are not allowed to create a new team", TEAM_ALREADY_EXISTS: "Team already exists", TEAM_NOT_FOUND: "Team not found", YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER: "You cannot leave the organization as the only owner", YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER: "You cannot leave the organization without an owner", YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER: "You are not allowed to delete this member", YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION: "You are not allowed to invite users to this organization", USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION: "User is already invited to this organization", INVITATION_NOT_FOUND: "Invitation not found", YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION: "You are not the recipient of the invitation", EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION: "Email verification required before accepting or rejecting invitation", EMAIL_VERIFICATION_REQUIRED_FOR_INVITATION: "Email verification required to view or list invitations for the session email", YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION: "You are not allowed to cancel this invitation", INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION: "Inviter is no longer a member of the organization", YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE: "You are not allowed to invite a user with this role", FAILED_TO_RETRIEVE_INVITATION: "Failed to retrieve invitation", YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS: "You have reached the maximum number of teams", UNABLE_TO_REMOVE_LAST_TEAM: "Unable to remove last team", YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER: "You are not allowed to update this member", ORGANIZATION_MEMBERSHIP_LIMIT_REACHED: "Organization membership limit reached", YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to create teams in this organization", YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to delete teams in this organization", YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM: "You are not allowed to update this team", YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM: "You are not allowed to delete this team", INVITATION_LIMIT_REACHED: "Invitation limit reached", TEAM_MEMBER_LIMIT_REACHED: "Team member limit reached", USER_IS_NOT_A_MEMBER_OF_THE_TEAM: "User is not a member of the team", YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM: "You are not allowed to list the members of this team", YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM: "You do not have an active team", YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER: "You are not allowed to create a new member", YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER: "You are not allowed to remove a team member", YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION: "You are not allowed to access this organization as an owner", YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION: "You are not a member of this organization", MISSING_AC_INSTANCE: "Dynamic Access Control requires a pre-defined ac instance on the server auth plugin. Read server logs for more information", YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE: "You must be in an organization to create a role", YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE: "You are not allowed to create a role", YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE: "You are not allowed to update a role", YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE: "You are not allowed to delete a role", YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE: "You are not allowed to read a role", YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE: "You are not allowed to list a role", YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE: "You are not allowed to get a role", TOO_MANY_ROLES: "This organization has too many roles", INVALID_RESOURCE: "The provided permission includes an invalid resource", ROLE_NAME_IS_ALREADY_TAKEN: "That role name is already taken", CANNOT_DELETE_A_PRE_DEFINED_ROLE: "Cannot delete a pre-defined role", ROLE_IS_ASSIGNED_TO_MEMBERS: "Cannot delete a role that is assigned to members. Please reassign the members to a different role first", INVALID_TEAM_ID: "Team id contains a reserved character" });

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_organization_access_statement.mjs
var a6 = { organization: ["update", "delete"], member: ["create", "update", "delete"], invitation: ["create", "cancel"], team: ["create", "update", "delete"], ac: ["create", "read", "update", "delete"] };
var e5 = w10(a6);
var c9 = e5.newRole({ organization: ["update"], invitation: ["create", "cancel"], member: ["create", "update", "delete"], team: ["create", "update", "delete"], ac: ["create", "read", "update", "delete"] });
var n7 = e5.newRole({ organization: ["update", "delete"], member: ["create", "update", "delete"], invitation: ["create", "cancel"], team: ["create", "update", "delete"], ac: ["create", "read", "update", "delete"] });
var r9 = e5.newRole({ organization: [], member: [], invitation: [], team: [], ac: ["read"] });
var o14 = { admin: c9, owner: n7, member: r9 };

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_organization_permission.mjs
var a7 = (s20, o21) => {
  if (!s20.permissions) return false;
  let e8 = s20.role.split(","), r21 = s20.options.creatorRole || "owner", l19 = e8.includes(r21), t10 = s20.allowCreatorAllPermissions || false;
  if (l19 && t10) return true;
  for (let n18 of e8) if (o21[n18]?.authorize(s20.permissions)?.success) return true;
  return false;
};

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_phone-number_error-codes.mjs
var _11 = n5({ INVALID_PHONE_NUMBER: "Invalid phone number", PHONE_NUMBER_EXIST: "Phone number already exists", PHONE_NUMBER_NOT_EXIST: "phone number isn't registered", INVALID_PHONE_NUMBER_OR_PASSWORD: "Invalid phone number or password", UNEXPECTED_ERROR: "Unexpected error", OTP_NOT_FOUND: "OTP not found", OTP_EXPIRED: "OTP expired", INVALID_OTP: "Invalid OTP", PHONE_NUMBER_NOT_VERIFIED: "Phone number not verified", PHONE_NUMBER_CANNOT_BE_UPDATED: "Phone number cannot be updated", SEND_OTP_NOT_IMPLEMENTED: "sendOTP not implemented", TOO_MANY_ATTEMPTS: "Too many attempts" });

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_two-factor_error-code.mjs
var T10 = n5({ OTP_NOT_ENABLED: "OTP not enabled", OTP_HAS_EXPIRED: "OTP has expired", TOTP_NOT_ENABLED: "TOTP not enabled", TWO_FACTOR_NOT_ENABLED: "Two factor isn't enabled", BACKUP_CODES_NOT_ENABLED: "Backup codes aren't enabled", INVALID_BACKUP_CODE: "Invalid backup code", INVALID_CODE: "Invalid code", TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: "Too many attempts. Please request a new code.", ACCOUNT_TEMPORARILY_LOCKED: "Too many failed verification attempts. Your account is temporarily locked. Please try again later.", INVALID_TWO_FACTOR_COOKIE: "Invalid two factor cookie" });

// vendor/neon/better-auth_1.6.23_es2022_dist_plugins_username_error-codes.mjs
var r10 = n5({ INVALID_USERNAME_OR_PASSWORD: "Invalid username or password", EMAIL_NOT_VERIFIED: "Email not verified", UNEXPECTED_ERROR: "Unexpected error", USERNAME_IS_ALREADY_TAKEN: "Username is already taken. Please try another.", USERNAME_TOO_SHORT: "Username is too short", USERNAME_TOO_LONG: "Username is too long", INVALID_USERNAME: "Username is invalid", INVALID_DISPLAY_USERNAME: "Display username is invalid" });

// vendor/neon/better-auth_1.6.23_es2022_client_plugins.mjs
var Y5 = (e8) => {
  let r21 = { admin: o12, user: a5, ...e8?.roles };
  return { id: "admin-client", version: t, $InferServerPlugin: {}, getActions: () => ({ admin: { checkRolePermission: (o21) => f6({ role: o21.role, options: { ac: e8?.ac, roles: r21 }, permissions: o21.permissions }) } }), pathMethods: { "/admin/list-users": "GET", "/admin/impersonate-user": "POST", "/admin/stop-impersonating": "POST" }, atomListeners: [{ matcher: (o21) => o21 === "/admin/impersonate-user" || o21 === "/admin/stop-impersonating", signal: "$sessionSignal" }], $ERROR_CODES: E11 };
};
var ie5 = () => ({ id: "email-otp", version: t, $InferServerPlugin: {}, atomListeners: [{ matcher: (e8) => e8 === "/email-otp/verify-email" || e8 === "/sign-in/email-otp" || e8 === "/email-otp/request-email-change", signal: "$sessionSignal" }], $ERROR_CODES: o13 });
var me5 = (e8) => {
  let r21 = e8?.jwks?.jwksPath ?? "/jwks";
  return { id: "better-auth-client", version: t, $InferServerPlugin: {}, pathMethods: { [r21]: "GET" }, getActions: (o21) => ({ jwks: async (t10) => await o21(r21, { method: "GET", ...t10 }) }) };
};
var ge4 = () => ({ id: "magic-link", version: t, $InferServerPlugin: {} });
var we3 = 300 * 1e3;
var K6 = (e8) => a7(e8, e8.options.roles || o14);
var He3 = (e8) => {
  let r21 = d2(false), o21 = d2(false), t10 = d2(false), l19 = d2(false), d13 = { admin: c9, member: r9, owner: n7, ...e8?.roles };
  return { id: "organization", version: t, $InferServerPlugin: {}, getActions: (n18, u18, P12) => ({ $Infer: { ActiveOrganization: {}, Organization: {}, Invitation: {}, Member: {}, Team: {} }, organization: { checkRolePermission: (p21) => K6({ role: p21.role, options: { ac: e8?.ac, roles: d13 }, permissions: p21.permissions }) } }), getAtoms: (n18) => {
    let u18 = A5(r21, "/organization/list", n18, { method: "GET" });
    return { $listOrg: r21, $activeOrgSignal: o21, $activeMemberSignal: t10, $activeMemberRoleSignal: l19, activeOrganization: A5([o21], "/organization/get-full-organization", n18, () => ({ method: "GET" })), listOrganizations: u18, activeMember: A5([o21, t10], "/organization/get-active-member", n18, { method: "GET" }), activeMemberRole: A5([o21, l19], "/organization/get-active-member-role", n18, { method: "GET" }) };
  }, pathMethods: { "/organization/get-full-organization": "GET", "/organization/list-user-teams": "GET" }, atomListeners: [{ matcher(n18) {
    return n18 === "/organization/create" || n18 === "/organization/delete" || n18 === "/organization/update";
  }, signal: "$listOrg" }, { matcher(n18) {
    return n18 === "/sign-out" || n18.startsWith("/organization");
  }, signal: "$activeOrgSignal" }, { matcher(n18) {
    return n18.startsWith("/organization/set-active") || n18 === "/organization/create" || n18 === "/organization/delete" || n18 === "/organization/remove-member" || n18 === "/organization/leave" || n18 === "/organization/accept-invitation";
  }, signal: "$sessionSignal" }, { matcher(n18) {
    return n18.includes("/organization/update-member-role") || n18.startsWith("/organization/set-active");
  }, signal: "$activeMemberSignal" }, { matcher(n18) {
    return n18.includes("/organization/update-member-role") || n18.startsWith("/organization/set-active");
  }, signal: "$activeMemberRoleSignal" }], $ERROR_CODES: E13 };
};
var qe3 = () => ({ id: "phoneNumber", version: t, $InferServerPlugin: {}, atomListeners: [{ matcher(e8) {
  return e8 === "/phone-number/update" || e8 === "/phone-number/verify" || e8 === "/sign-in/phone-number";
}, signal: "$sessionSignal" }], $ERROR_CODES: _11 });

// vendor/neon/zod_4.3.6_es2022_v4_classic_external.mjs
var zod_4_3_6_es2022_v4_classic_external_exports = {};
__export(zod_4_3_6_es2022_v4_classic_external_exports, {
  $brand: () => Fr,
  $input: () => _13,
  $output: () => r11,
  NEVER: () => Lr,
  TimePrecision: () => Mo,
  ZodAny: () => ke5,
  ZodArray: () => Se5,
  ZodBase64: () => X9,
  ZodBase64URL: () => G9,
  ZodBigInt: () => Q8,
  ZodBigIntFormat: () => ee8,
  ZodBoolean: () => H9,
  ZodCIDRv4: () => V7,
  ZodCIDRv6: () => W10,
  ZodCUID: () => j10,
  ZodCUID2: () => A13,
  ZodCatch: () => Me6,
  ZodCodec: () => pe8,
  ZodCustom: () => b6,
  ZodCustomStringFormat: () => f9,
  ZodDate: () => $e5,
  ZodDefault: () => je5,
  ZodDiscriminatedUnion: () => ze5,
  ZodE164: () => K10,
  ZodEmail: () => U7,
  ZodEmoji: () => C9,
  ZodEnum: () => _16,
  ZodError: () => c12,
  ZodExactOptional: () => Ue5,
  ZodFile: () => De5,
  ZodFirstPartyTypeKind: () => v11,
  ZodFunction: () => Qe5,
  ZodGUID: () => y9,
  ZodIPv4: () => B8,
  ZodIPv6: () => M7,
  ZodISODate: () => c11,
  ZodISODateTime: () => i12,
  ZodISODuration: () => a9,
  ZodISOTime: () => n9,
  ZodIntersection: () => ve7,
  ZodIssueCode: () => B9,
  ZodJWT: () => Y9,
  ZodKSUID: () => R15,
  ZodLazy: () => Ye5,
  ZodLiteral: () => Te5,
  ZodMAC: () => ie8,
  ZodMap: () => Oe6,
  ZodNaN: () => We5,
  ZodNanoID: () => E16,
  ZodNever: () => fe8,
  ZodNonOptional: () => ue8,
  ZodNull: () => xe6,
  ZodNullable: () => Ee6,
  ZodNumber: () => q10,
  ZodNumberFormat: () => k9,
  ZodObject: () => P7,
  ZodOptional: () => ne8,
  ZodPipe: () => ae7,
  ZodPrefault: () => Le5,
  ZodPromise: () => He6,
  ZodReadonly: () => Xe5,
  ZodRealError: () => l8,
  ZodRecord: () => w16,
  ZodSet: () => Ie5,
  ZodString: () => J8,
  ZodStringFormat: () => l7,
  ZodSuccess: () => Be5,
  ZodSymbol: () => me8,
  ZodTemplateLiteral: () => Ke5,
  ZodTransform: () => Je5,
  ZodTuple: () => Ne5,
  ZodType: () => p7,
  ZodULID: () => L7,
  ZodURL: () => z10,
  ZodUUID: () => h8,
  ZodUndefined: () => he8,
  ZodUnion: () => N11,
  ZodUnknown: () => _e6,
  ZodVoid: () => ye8,
  ZodXID: () => F8,
  ZodXor: () => ge8,
  _ZodString: () => D9,
  _default: () => Ae4,
  _function: () => ir2,
  any: () => Ro2,
  array: () => v10,
  base64: () => vo2,
  base64url: () => Po2,
  bigint: () => Eo2,
  boolean: () => le8,
  catch: () => Ve5,
  check: () => sr2,
  cidrv4: () => go2,
  cidrv6: () => zo2,
  clone: () => l5,
  codec: () => ar2,
  coerce: () => S13,
  config: () => w15,
  core: () => zod_4_3_6_es2022_v4_core_exports,
  cuid: () => xo2,
  cuid2: () => Zo2,
  custom: () => lr2,
  date: () => Mo2,
  decode: () => d6,
  decodeAsync: () => f8,
  describe: () => mr2,
  discriminatedUnion: () => Yo2,
  e164: () => No2,
  email: () => to2,
  emoji: () => mo2,
  encode: () => a10,
  encodeAsync: () => p6,
  endsWith: () => Ss,
  enum: () => ce8,
  exactOptional: () => Ce5,
  file: () => cr2,
  flattenError: () => Dr,
  float32: () => Do2,
  float64: () => Jo2,
  formatError: () => Mr,
  fromJSONSchema: () => A14,
  function: () => ir2,
  getErrorMap: () => D10,
  globalRegistry: () => d5,
  gt: () => yr,
  gte: () => Pr,
  guid: () => no2,
  hash: () => To2,
  hex: () => Io2,
  hostname: () => Oo2,
  httpUrl: () => lo2,
  includes: () => Es,
  instanceof: () => xr2,
  int: () => T14,
  int32: () => Uo2,
  int64: () => jo2,
  intersection: () => Pe7,
  ipv4: () => yo2,
  ipv6: () => So2,
  iso: () => zod_4_3_6_es2022_v4_classic_iso_exports,
  json: () => kr2,
  jwt: () => wo2,
  keyof: () => Vo2,
  ksuid: () => fo,
  lazy: () => qe6,
  length: () => ks,
  literal: () => rr2,
  locales: () => zod_4_3_6_es2022_v4_locales_exports,
  looseObject: () => Go2,
  looseRecord: () => Ho2,
  lowercase: () => Ps,
  lt: () => Zr,
  lte: () => kr,
  mac: () => $o2,
  map: () => Qo2,
  maxLength: () => ws,
  maxSize: () => xs,
  meta: () => hr2,
  mime: () => Cs,
  minLength: () => Zs,
  minSize: () => $s,
  multipleOf: () => vs,
  nan: () => ur2,
  nanoid: () => ho,
  nativeEnum: () => or2,
  negative: () => _s,
  never: () => oe8,
  nonnegative: () => gs,
  nonoptional: () => Re4,
  nonpositive: () => zs,
  normalize: () => Rs,
  null: () => Ze5,
  nullable: () => S12,
  nullish: () => tr2,
  number: () => se9,
  object: () => Wo2,
  optional: () => $8,
  overwrite: () => N10,
  parse: () => s11,
  parseAsync: () => r12,
  partialRecord: () => qo2,
  pipe: () => g7,
  positive: () => ds,
  prefault: () => Fe5,
  preprocess: () => _r2,
  prettifyError: () => Vr,
  promise: () => dr2,
  property: () => Ts,
  readonly: () => Ge5,
  record: () => be6,
  refine: () => eo2,
  regex: () => ys,
  regexes: () => M6,
  registry: () => a8,
  safeDecode: () => y8,
  safeDecodeAsync: () => _15,
  safeEncode: () => x11,
  safeEncodeAsync: () => A12,
  safeParse: () => n10,
  safeParseAsync: () => t8,
  set: () => er2,
  setErrorMap: () => C10,
  size: () => bs,
  slugify: () => Fs,
  startsWith: () => Is,
  strictObject: () => Xo2,
  string: () => I11,
  stringFormat: () => bo2,
  stringbool: () => Zr2,
  success: () => nr2,
  superRefine: () => oo2,
  symbol: () => Lo2,
  templateLiteral: () => pr2,
  toJSONSchema: () => pe6,
  toLowerCase: () => Ns,
  toUpperCase: () => Ls,
  transform: () => te8,
  treeifyError: () => Ur,
  trim: () => Os,
  tuple: () => we6,
  uint32: () => Co2,
  uint64: () => Ao2,
  ulid: () => ko2,
  undefined: () => Fo2,
  union: () => re7,
  unknown: () => Z10,
  uppercase: () => As,
  url: () => so2,
  util: () => zod_4_3_6_es2022_v4_core_util_exports,
  uuid: () => uo2,
  uuidv4: () => ao2,
  uuidv6: () => po2,
  uuidv7: () => io2,
  void: () => Bo2,
  xid: () => _o2,
  xor: () => Ko2
});

// vendor/neon/zod_4.3.6_es2022_v4_core.mjs
var zod_4_3_6_es2022_v4_core_exports = {};
__export(zod_4_3_6_es2022_v4_core_exports, {
  $ZodAny: () => On,
  $ZodArray: () => Dn,
  $ZodAsyncError: () => A11,
  $ZodBase64: () => kn,
  $ZodBase64URL: () => yn,
  $ZodBigInt: () => vr,
  $ZodBigIntFormat: () => Sn,
  $ZodBoolean: () => wt4,
  $ZodCIDRv4: () => wn,
  $ZodCIDRv6: () => Zn,
  $ZodCUID: () => pn,
  $ZodCUID2: () => mn,
  $ZodCatch: () => oo,
  $ZodCheck: () => x10,
  $ZodCheckBigIntFormat: () => Ge4,
  $ZodCheckEndsWith: () => st3,
  $ZodCheckGreaterThan: () => Ie4,
  $ZodCheckIncludes: () => nt4,
  $ZodCheckLengthEquals: () => Qe4,
  $ZodCheckLessThan: () => Ee5,
  $ZodCheckLowerCase: () => tt4,
  $ZodCheckMaxLength: () => He5,
  $ZodCheckMaxSize: () => Je4,
  $ZodCheckMimeType: () => ut4,
  $ZodCheckMinLength: () => Xe4,
  $ZodCheckMinSize: () => Ye4,
  $ZodCheckMultipleOf: () => We4,
  $ZodCheckNumberFormat: () => Ke4,
  $ZodCheckOverwrite: () => ct4,
  $ZodCheckProperty: () => it4,
  $ZodCheckRegex: () => et4,
  $ZodCheckSizeEquals: () => qe5,
  $ZodCheckStartsWith: () => ot4,
  $ZodCheckStringFormat: () => R14,
  $ZodCheckUpperCase: () => rt4,
  $ZodCodec: () => Pt4,
  $ZodCustom: () => mo,
  $ZodCustomStringFormat: () => En,
  $ZodDate: () => jn,
  $ZodDefault: () => eo,
  $ZodDiscriminatedUnion: () => Vn,
  $ZodE164: () => Pn,
  $ZodEmail: () => un,
  $ZodEmoji: () => an,
  $ZodEncodeError: () => S10,
  $ZodEnum: () => Jn,
  $ZodError: () => Ne4,
  $ZodExactOptional: () => Xn,
  $ZodFile: () => qn,
  $ZodFunction: () => ao,
  $ZodGUID: () => on,
  $ZodIPv4: () => xn,
  $ZodIPv6: () => $n,
  $ZodISODate: () => zn,
  $ZodISODateTime: () => _n,
  $ZodISODuration: () => vn,
  $ZodISOTime: () => gn,
  $ZodIntersection: () => Bn,
  $ZodJWT: () => An,
  $ZodKSUID: () => dn,
  $ZodLazy: () => po,
  $ZodLiteral: () => Yn,
  $ZodMAC: () => bn,
  $ZodMap: () => Kn,
  $ZodNaN: () => so,
  $ZodNanoID: () => ln,
  $ZodNever: () => Ln,
  $ZodNonOptional: () => ro,
  $ZodNull: () => Rn,
  $ZodNullable: () => Qn,
  $ZodNumber: () => gr,
  $ZodNumberFormat: () => In,
  $ZodObject: () => xr,
  $ZodObjectJIT: () => Mn,
  $ZodOptional: () => br,
  $ZodPipe: () => io,
  $ZodPrefault: () => to,
  $ZodPromise: () => lo,
  $ZodReadonly: () => uo,
  $ZodRealError: () => Z9,
  $ZodRecord: () => Wn,
  $ZodRegistry: () => o15,
  $ZodSet: () => Gn,
  $ZodString: () => Te4,
  $ZodStringFormat: () => v9,
  $ZodSuccess: () => no,
  $ZodSymbol: () => Tn,
  $ZodTemplateLiteral: () => co,
  $ZodTransform: () => Hn,
  $ZodTuple: () => $r,
  $ZodType: () => _14,
  $ZodULID: () => fn,
  $ZodURL: () => cn,
  $ZodUUID: () => sn,
  $ZodUndefined: () => Cn,
  $ZodUnion: () => yt4,
  $ZodUnknown: () => Nn,
  $ZodVoid: () => Fn,
  $ZodXID: () => hn,
  $ZodXor: () => Un,
  $brand: () => Fr,
  $constructor: () => l6,
  $input: () => _13,
  $output: () => r11,
  Doc: () => U6,
  JSONSchema: () => Rr,
  JSONSchemaGenerator: () => Ce4,
  NEVER: () => Lr,
  TimePrecision: () => Mo,
  _any: () => cs,
  _array: () => js,
  _base64: () => Lo,
  _base64url: () => Fo,
  _bigint: () => ts,
  _boolean: () => Qo,
  _catch: () => oi,
  _check: () => Ar,
  _cidrv4: () => Oo,
  _cidrv6: () => No,
  _coercedBigint: () => rs,
  _coercedBoolean: () => es,
  _coercedDate: () => fs,
  _coercedNumber: () => Go,
  _coercedString: () => zo,
  _cuid: () => Po,
  _cuid2: () => Ao,
  _custom: () => li,
  _date: () => ms,
  _decode: () => Nt3,
  _decodeAsync: () => Ft2,
  _default: () => ti,
  _discriminatedUnion: () => Us,
  _e164: () => jo,
  _email: () => go,
  _emoji: () => ko,
  _encode: () => Ot3,
  _encodeAsync: () => Lt4,
  _endsWith: () => Ss,
  _enum: () => Js,
  _file: () => Hs,
  _float32: () => Yo,
  _float64: () => qo,
  _gt: () => yr,
  _gte: () => Pr,
  _guid: () => vo,
  _includes: () => Es,
  _int: () => Jo,
  _int32: () => Ho,
  _int64: () => ns,
  _intersection: () => Vs,
  _ipv4: () => To,
  _ipv6: () => Co,
  _isoDate: () => Vo,
  _isoDateTime: () => Uo,
  _isoDuration: () => Wo,
  _isoTime: () => Bo,
  _jwt: () => Do,
  _ksuid: () => So,
  _lazy: () => ci,
  _length: () => ks,
  _literal: () => qs,
  _lowercase: () => Ps,
  _lt: () => Zr,
  _lte: () => kr,
  _mac: () => Ro,
  _map: () => Ks,
  _max: () => kr,
  _maxLength: () => ws,
  _maxSize: () => xs,
  _mime: () => Cs,
  _min: () => Pr,
  _minLength: () => Zs,
  _minSize: () => $s,
  _multipleOf: () => vs,
  _nan: () => hs,
  _nanoid: () => yo,
  _nativeEnum: () => Ys,
  _negative: () => _s,
  _never: () => ls,
  _nonnegative: () => gs,
  _nonoptional: () => ri,
  _nonpositive: () => zs,
  _normalize: () => Rs,
  _null: () => us,
  _nullable: () => ei,
  _number: () => Ko,
  _optional: () => Qs,
  _overwrite: () => N10,
  _parse: () => Y8,
  _parseAsync: () => H8,
  _pipe: () => si,
  _positive: () => ds,
  _promise: () => ai,
  _property: () => Ts,
  _readonly: () => ii,
  _record: () => Ws,
  _refine: () => pi,
  _regex: () => ys,
  _safeDecode: () => Dt3,
  _safeDecodeAsync: () => Ut3,
  _safeEncode: () => jt2,
  _safeEncodeAsync: () => Mt4,
  _safeParse: () => Q7,
  _safeParseAsync: () => ee7,
  _set: () => Gs,
  _size: () => bs,
  _slugify: () => Fs,
  _startsWith: () => Is,
  _string: () => _o,
  _stringFormat: () => _i,
  _stringbool: () => di,
  _success: () => ni,
  _superRefine: () => mi,
  _symbol: () => ss,
  _templateLiteral: () => ui,
  _toLowerCase: () => Ns,
  _toUpperCase: () => Ls,
  _transform: () => Xs,
  _trim: () => Os,
  _tuple: () => Bs,
  _uint32: () => Xo,
  _uint64: () => os,
  _ulid: () => Eo,
  _undefined: () => is,
  _union: () => Ds,
  _unknown: () => as,
  _uppercase: () => As,
  _url: () => Zo,
  _uuid: () => xo,
  _uuidv4: () => $o,
  _uuidv6: () => bo,
  _uuidv7: () => wo,
  _void: () => ps,
  _xid: () => Io,
  _xor: () => Ms,
  clone: () => l5,
  config: () => w15,
  createStandardJSONSchemaMethod: () => S8,
  createToJSONSchemaMethod: () => j7,
  decode: () => Wr,
  decodeAsync: () => Gr,
  describe: () => fi,
  encode: () => Br,
  encodeAsync: () => Kr,
  extractDefs: () => $6,
  finalize: () => w13,
  flattenError: () => Dr,
  formatError: () => Mr,
  globalConfig: () => F7,
  globalRegistry: () => d5,
  initializeContext: () => O9,
  isValidBase64: () => bt4,
  isValidBase64URL: () => _r,
  isValidJWT: () => zr,
  locales: () => zod_4_3_6_es2022_v4_locales_exports,
  meta: () => hi,
  parse: () => q9,
  parseAsync: () => X8,
  prettifyError: () => Vr,
  process: () => g6,
  regexes: () => M6,
  registry: () => a8,
  safeDecode: () => Yr,
  safeDecodeAsync: () => Hr,
  safeEncode: () => Jr,
  safeEncodeAsync: () => qr,
  safeParse: () => Le4,
  safeParseAsync: () => Fe4,
  toDotPath: () => Ct4,
  toJSONSchema: () => pe6,
  treeifyError: () => Ur,
  util: () => zod_4_3_6_es2022_v4_core_util_exports,
  version: () => lt4
});

// vendor/neon/zod_4.3.6_es2022_v4_core_util.mjs
var zod_4_3_6_es2022_v4_core_util_exports = {};
__export(zod_4_3_6_es2022_v4_core_util_exports, {
  BIGINT_FORMAT_RANGES: () => Z7,
  Class: () => b5,
  NUMBER_FORMAT_RANGES: () => Y6,
  aborted: () => se5,
  allowsEval: () => G6,
  assert: () => z8,
  assertEqual: () => E14,
  assertIs: () => O8,
  assertNever: () => j6,
  assertNotEqual: () => k7,
  assignProp: () => p5,
  base64ToUint8Array: () => _12,
  base64urlToUint8Array: () => ge5,
  cached: () => x8,
  captureStackTrace: () => B5,
  cleanEnum: () => he5,
  cleanRegex: () => I8,
  clone: () => l5,
  cloneDef: () => C6,
  createTransparentProxy: () => J6,
  defineLazy: () => v7,
  esc: () => F5,
  escapeRegex: () => H6,
  extend: () => re4,
  finalizeIssue: () => fe5,
  floatSafeRemainder: () => T11,
  getElementAtPath: () => D6,
  getEnumValues: () => A9,
  getLengthableOrigin: () => pe5,
  getParsedType: () => K7,
  getSizableOrigin: () => ae5,
  hexToUint8Array: () => be3,
  isObject: () => y7,
  isPlainObject: () => h6,
  issue: () => de5,
  joinValues: () => S7,
  jsonStringifyReplacer: () => N8,
  merge: () => oe5,
  mergeDefs: () => f7,
  normalizeParams: () => W7,
  nullish: () => P5,
  numKeys: () => V4,
  objectClone: () => R12,
  omit: () => te5,
  optionalKeys: () => Q5,
  parsedType: () => le5,
  partial: () => ie6,
  pick: () => ee5,
  prefixIssues: () => ue5,
  primitiveTypes: () => X6,
  promiseAllObject: () => U4,
  propertyKeyTypes: () => q7,
  randomString: () => M4,
  required: () => ce5,
  safeExtend: () => ne5,
  shallowClone: () => L5,
  slugify: () => $5,
  stringifyPrimitive: () => w12,
  uint8ArrayToBase64: () => m8,
  uint8ArrayToBase64url: () => ye5,
  uint8ArrayToHex: () => xe3,
  unwrapMessage: () => d4
});
function E14(e8) {
  return e8;
}
function k7(e8) {
  return e8;
}
function O8(e8) {
}
function j6(e8) {
  throw new Error("Unexpected value in exhaustive check");
}
function z8(e8) {
}
function A9(e8) {
  let t10 = Object.values(e8).filter((n18) => typeof n18 == "number");
  return Object.entries(e8).filter(([n18, o21]) => t10.indexOf(+n18) === -1).map(([n18, o21]) => o21);
}
function S7(e8, t10 = "|") {
  return e8.map((r21) => w12(r21)).join(t10);
}
function N8(e8, t10) {
  return typeof t10 == "bigint" ? t10.toString() : t10;
}
function x8(e8) {
  return { get value() {
    {
      let r21 = e8();
      return Object.defineProperty(this, "value", { value: r21 }), r21;
    }
    throw new Error("cached value already set");
  } };
}
function P5(e8) {
  return e8 == null;
}
function I8(e8) {
  let t10 = e8.startsWith("^") ? 1 : 0, r21 = e8.endsWith("$") ? e8.length - 1 : e8.length;
  return e8.slice(t10, r21);
}
function T11(e8, t10) {
  let r21 = (e8.toString().split(".")[1] || "").length, n18 = t10.toString(), o21 = (n18.split(".")[1] || "").length;
  if (o21 === 0 && /\d?e-\d?/.test(n18)) {
    let a16 = n18.match(/\d?e-(\d?)/);
    a16?.[1] && (o21 = Number.parseInt(a16[1]));
  }
  let i20 = r21 > o21 ? r21 : o21, c19 = Number.parseInt(e8.toFixed(i20).replace(".", "")), s20 = Number.parseInt(t10.toFixed(i20).replace(".", ""));
  return c19 % s20 / 10 ** i20;
}
var g5 = Symbol("evaluating");
function v7(e8, t10, r21) {
  let n18;
  Object.defineProperty(e8, t10, { get() {
    if (n18 !== g5) return n18 === void 0 && (n18 = g5, n18 = r21()), n18;
  }, set(o21) {
    Object.defineProperty(e8, t10, { value: o21 });
  }, configurable: true });
}
function R12(e8) {
  return Object.create(Object.getPrototypeOf(e8), Object.getOwnPropertyDescriptors(e8));
}
function p5(e8, t10, r21) {
  Object.defineProperty(e8, t10, { value: r21, writable: true, enumerable: true, configurable: true });
}
function f7(...e8) {
  let t10 = {};
  for (let r21 of e8) {
    let n18 = Object.getOwnPropertyDescriptors(r21);
    Object.assign(t10, n18);
  }
  return Object.defineProperties({}, t10);
}
function C6(e8) {
  return f7(e8._zod.def);
}
function D6(e8, t10) {
  return t10 ? t10.reduce((r21, n18) => r21?.[n18], e8) : e8;
}
function U4(e8) {
  let t10 = Object.keys(e8), r21 = t10.map((n18) => e8[n18]);
  return Promise.all(r21).then((n18) => {
    let o21 = {};
    for (let i20 = 0; i20 < t10.length; i20++) o21[t10[i20]] = n18[i20];
    return o21;
  });
}
function M4(e8 = 10) {
  let t10 = "abcdefghijklmnopqrstuvwxyz", r21 = "";
  for (let n18 = 0; n18 < e8; n18++) r21 += t10[Math.floor(Math.random() * t10.length)];
  return r21;
}
function F5(e8) {
  return JSON.stringify(e8);
}
function $5(e8) {
  return e8.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var B5 = "captureStackTrace" in Error ? Error.captureStackTrace : (...e8) => {
};
function y7(e8) {
  return typeof e8 == "object" && e8 !== null && !Array.isArray(e8);
}
var G6 = x8(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return false;
  try {
    let e8 = Function;
    return new e8(""), true;
  } catch {
    return false;
  }
});
function h6(e8) {
  if (y7(e8) === false) return false;
  let t10 = e8.constructor;
  if (t10 === void 0 || typeof t10 != "function") return true;
  let r21 = t10.prototype;
  return !(y7(r21) === false || Object.prototype.hasOwnProperty.call(r21, "isPrototypeOf") === false);
}
function L5(e8) {
  return h6(e8) ? { ...e8 } : Array.isArray(e8) ? [...e8] : e8;
}
function V4(e8) {
  let t10 = 0;
  for (let r21 in e8) Object.prototype.hasOwnProperty.call(e8, r21) && t10++;
  return t10;
}
var K7 = (e8) => {
  let t10 = typeof e8;
  switch (t10) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(e8) ? "nan" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    case "object":
      return Array.isArray(e8) ? "array" : e8 === null ? "null" : e8.then && typeof e8.then == "function" && e8.catch && typeof e8.catch == "function" ? "promise" : typeof Map < "u" && e8 instanceof Map ? "map" : typeof Set < "u" && e8 instanceof Set ? "set" : typeof Date < "u" && e8 instanceof Date ? "date" : typeof File < "u" && e8 instanceof File ? "file" : "object";
    default:
      throw new Error(`Unknown data type: ${t10}`);
  }
};
var q7 = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
var X6 = /* @__PURE__ */ new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function H6(e8) {
  return e8.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function l5(e8, t10, r21) {
  let n18 = new e8._zod.constr(t10 ?? e8._zod.def);
  return (!t10 || r21?.parent) && (n18._zod.parent = e8), n18;
}
function W7(e8) {
  let t10 = e8;
  if (!t10) return {};
  if (typeof t10 == "string") return { error: () => t10 };
  if (t10?.message !== void 0) {
    if (t10?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
    t10.error = t10.message;
  }
  return delete t10.message, typeof t10.error == "string" ? { ...t10, error: () => t10.error } : t10;
}
function J6(e8) {
  let t10;
  return new Proxy({}, { get(r21, n18, o21) {
    return t10 ?? (t10 = e8()), Reflect.get(t10, n18, o21);
  }, set(r21, n18, o21, i20) {
    return t10 ?? (t10 = e8()), Reflect.set(t10, n18, o21, i20);
  }, has(r21, n18) {
    return t10 ?? (t10 = e8()), Reflect.has(t10, n18);
  }, deleteProperty(r21, n18) {
    return t10 ?? (t10 = e8()), Reflect.deleteProperty(t10, n18);
  }, ownKeys(r21) {
    return t10 ?? (t10 = e8()), Reflect.ownKeys(t10);
  }, getOwnPropertyDescriptor(r21, n18) {
    return t10 ?? (t10 = e8()), Reflect.getOwnPropertyDescriptor(t10, n18);
  }, defineProperty(r21, n18, o21) {
    return t10 ?? (t10 = e8()), Reflect.defineProperty(t10, n18, o21);
  } });
}
function w12(e8) {
  return typeof e8 == "bigint" ? e8.toString() + "n" : typeof e8 == "string" ? `"${e8}"` : `${e8}`;
}
function Q5(e8) {
  return Object.keys(e8).filter((t10) => e8[t10]._zod.optin === "optional" && e8[t10]._zod.optout === "optional");
}
var Y6 = { safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], int32: [-2147483648, 2147483647], uint32: [0, 4294967295], float32: [-34028234663852886e22, 34028234663852886e22], float64: [-Number.MAX_VALUE, Number.MAX_VALUE] };
var Z7 = { int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")], uint64: [BigInt(0), BigInt("18446744073709551615")] };
function ee5(e8, t10) {
  let r21 = e8._zod.def, n18 = r21.checks;
  if (n18 && n18.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
  let i20 = f7(e8._zod.def, { get shape() {
    let c19 = {};
    for (let s20 in t10) {
      if (!(s20 in r21.shape)) throw new Error(`Unrecognized key: "${s20}"`);
      t10[s20] && (c19[s20] = r21.shape[s20]);
    }
    return p5(this, "shape", c19), c19;
  }, checks: [] });
  return l5(e8, i20);
}
function te5(e8, t10) {
  let r21 = e8._zod.def, n18 = r21.checks;
  if (n18 && n18.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
  let i20 = f7(e8._zod.def, { get shape() {
    let c19 = { ...e8._zod.def.shape };
    for (let s20 in t10) {
      if (!(s20 in r21.shape)) throw new Error(`Unrecognized key: "${s20}"`);
      t10[s20] && delete c19[s20];
    }
    return p5(this, "shape", c19), c19;
  }, checks: [] });
  return l5(e8, i20);
}
function re4(e8, t10) {
  if (!h6(t10)) throw new Error("Invalid input to extend: expected a plain object");
  let r21 = e8._zod.def.checks;
  if (r21 && r21.length > 0) {
    let i20 = e8._zod.def.shape;
    for (let c19 in t10) if (Object.getOwnPropertyDescriptor(i20, c19) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  let o21 = f7(e8._zod.def, { get shape() {
    let i20 = { ...e8._zod.def.shape, ...t10 };
    return p5(this, "shape", i20), i20;
  } });
  return l5(e8, o21);
}
function ne5(e8, t10) {
  if (!h6(t10)) throw new Error("Invalid input to safeExtend: expected a plain object");
  let r21 = f7(e8._zod.def, { get shape() {
    let n18 = { ...e8._zod.def.shape, ...t10 };
    return p5(this, "shape", n18), n18;
  } });
  return l5(e8, r21);
}
function oe5(e8, t10) {
  let r21 = f7(e8._zod.def, { get shape() {
    let n18 = { ...e8._zod.def.shape, ...t10._zod.def.shape };
    return p5(this, "shape", n18), n18;
  }, get catchall() {
    return t10._zod.def.catchall;
  }, checks: [] });
  return l5(e8, r21);
}
function ie6(e8, t10, r21) {
  let o21 = t10._zod.def.checks;
  if (o21 && o21.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
  let c19 = f7(t10._zod.def, { get shape() {
    let s20 = t10._zod.def.shape, a16 = { ...s20 };
    if (r21) for (let u18 in r21) {
      if (!(u18 in s20)) throw new Error(`Unrecognized key: "${u18}"`);
      r21[u18] && (a16[u18] = e8 ? new e8({ type: "optional", innerType: s20[u18] }) : s20[u18]);
    }
    else for (let u18 in s20) a16[u18] = e8 ? new e8({ type: "optional", innerType: s20[u18] }) : s20[u18];
    return p5(this, "shape", a16), a16;
  }, checks: [] });
  return l5(t10, c19);
}
function ce5(e8, t10, r21) {
  let n18 = f7(t10._zod.def, { get shape() {
    let o21 = t10._zod.def.shape, i20 = { ...o21 };
    if (r21) for (let c19 in r21) {
      if (!(c19 in i20)) throw new Error(`Unrecognized key: "${c19}"`);
      r21[c19] && (i20[c19] = new e8({ type: "nonoptional", innerType: o21[c19] }));
    }
    else for (let c19 in o21) i20[c19] = new e8({ type: "nonoptional", innerType: o21[c19] });
    return p5(this, "shape", i20), i20;
  } });
  return l5(t10, n18);
}
function se5(e8, t10 = 0) {
  if (e8.aborted === true) return true;
  for (let r21 = t10; r21 < e8.issues.length; r21++) if (e8.issues[r21]?.continue !== true) return true;
  return false;
}
function ue5(e8, t10) {
  return t10.map((r21) => {
    var n18;
    return (n18 = r21).path ?? (n18.path = []), r21.path.unshift(e8), r21;
  });
}
function d4(e8) {
  return typeof e8 == "string" ? e8 : e8?.message;
}
function fe5(e8, t10, r21) {
  let n18 = { ...e8, path: e8.path ?? [] };
  if (!e8.message) {
    let o21 = d4(e8.inst?._zod.def?.error?.(e8)) ?? d4(t10?.error?.(e8)) ?? d4(r21.customError?.(e8)) ?? d4(r21.localeError?.(e8)) ?? "Invalid input";
    n18.message = o21;
  }
  return delete n18.inst, delete n18.continue, t10?.reportInput || delete n18.input, n18;
}
function ae5(e8) {
  return e8 instanceof Set ? "set" : e8 instanceof Map ? "map" : e8 instanceof File ? "file" : "unknown";
}
function pe5(e8) {
  return Array.isArray(e8) ? "array" : typeof e8 == "string" ? "string" : "unknown";
}
function le5(e8) {
  let t10 = typeof e8;
  switch (t10) {
    case "number":
      return Number.isNaN(e8) ? "nan" : "number";
    case "object": {
      if (e8 === null) return "null";
      if (Array.isArray(e8)) return "array";
      let r21 = e8;
      if (r21 && Object.getPrototypeOf(r21) !== Object.prototype && "constructor" in r21 && r21.constructor) return r21.constructor.name;
    }
  }
  return t10;
}
function de5(...e8) {
  let [t10, r21, n18] = e8;
  return typeof t10 == "string" ? { message: t10, code: "custom", input: r21, inst: n18 } : { ...t10 };
}
function he5(e8) {
  return Object.entries(e8).filter(([t10, r21]) => Number.isNaN(Number.parseInt(t10, 10))).map((t10) => t10[1]);
}
function _12(e8) {
  let t10 = atob(e8), r21 = new Uint8Array(t10.length);
  for (let n18 = 0; n18 < t10.length; n18++) r21[n18] = t10.charCodeAt(n18);
  return r21;
}
function m8(e8) {
  let t10 = "";
  for (let r21 = 0; r21 < e8.length; r21++) t10 += String.fromCharCode(e8[r21]);
  return btoa(t10);
}
function ge5(e8) {
  let t10 = e8.replace(/-/g, "+").replace(/_/g, "/"), r21 = "=".repeat((4 - t10.length % 4) % 4);
  return _12(t10 + r21);
}
function ye5(e8) {
  return m8(e8).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function be3(e8) {
  let t10 = e8.replace(/^0x/, "");
  if (t10.length % 2 !== 0) throw new Error("Invalid hex string length");
  let r21 = new Uint8Array(t10.length / 2);
  for (let n18 = 0; n18 < t10.length; n18 += 2) r21[n18 / 2] = Number.parseInt(t10.slice(n18, n18 + 2), 16);
  return r21;
}
function xe3(e8) {
  return Array.from(e8).map((t10) => t10.toString(16).padStart(2, "0")).join("");
}
var b5 = class {
  constructor(...t10) {
  }
};

// vendor/neon/zod_4.3.6_es2022_v4_locales.mjs
var zod_4_3_6_es2022_v4_locales_exports = {};
__export(zod_4_3_6_es2022_v4_locales_exports, {
  ar: () => be4,
  az: () => _e4,
  be: () => Ie3,
  bg: () => Se3,
  ca: () => Ue3,
  cs: () => De3,
  da: () => we4,
  de: () => Pe5,
  en: () => c10,
  eo: () => Te3,
  es: () => Ve3,
  fa: () => Je3,
  fi: () => Ge3,
  fr: () => Ae2,
  frCA: () => Ze3,
  he: () => Xe3,
  hu: () => qe4,
  hy: () => Ye3,
  id: () => He4,
  is: () => et3,
  it: () => nt3,
  ja: () => rt3,
  ka: () => ot3,
  kh: () => ut3,
  km: () => ce6,
  ko: () => ct3,
  lt: () => vt3,
  mk: () => ft3,
  ms: () => pt2,
  nl: () => bt3,
  no: () => _t3,
  ota: () => It2,
  pl: () => Ut2,
  ps: () => St2,
  pt: () => Dt2,
  ru: () => wt3,
  sl: () => Pt3,
  sv: () => Tt2,
  ta: () => Vt,
  th: () => Jt,
  tr: () => Gt,
  ua: () => At2,
  uk: () => me6,
  ur: () => Zt,
  uz: () => Xt,
  vi: () => qt2,
  yo: () => en,
  zhCN: () => Yt,
  zhTW: () => Ht
});

// vendor/neon/zod_4.3.6_es2022_v4_locales_en.mjs
var u5 = () => {
  let o21 = { string: { unit: "characters", verb: "to have" }, file: { unit: "bytes", verb: "to have" }, array: { unit: "items", verb: "to have" }, set: { unit: "items", verb: "to have" }, map: { unit: "entries", verb: "to have" } };
  function r21(e8) {
    return o21[e8] ?? null;
  }
  let d13 = { regex: "input", email: "email address", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datetime", date: "ISO date", time: "ISO time", duration: "ISO duration", ipv4: "IPv4 address", ipv6: "IPv6 address", mac: "MAC address", cidrv4: "IPv4 range", cidrv6: "IPv6 range", base64: "base64-encoded string", base64url: "base64url-encoded string", json_string: "JSON string", e164: "E.164 number", jwt: "JWT", template_literal: "input" }, a16 = { nan: "NaN" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = a16[e8.expected] ?? e8.expected, i20 = le5(e8.input), l19 = a16[i20] ?? i20;
        return `Invalid input: expected ${t10}, received ${l19}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Invalid input: expected ${w12(e8.values[0])}` : `Invalid option: expected one of ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", i20 = r21(e8.origin);
        return i20 ? `Too big: expected ${e8.origin ?? "value"} to have ${t10}${e8.maximum.toString()} ${i20.unit ?? "elements"}` : `Too big: expected ${e8.origin ?? "value"} to be ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", i20 = r21(e8.origin);
        return i20 ? `Too small: expected ${e8.origin} to have ${t10}${e8.minimum.toString()} ${i20.unit}` : `Too small: expected ${e8.origin} to be ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Invalid string: must start with "${t10.prefix}"` : t10.format === "ends_with" ? `Invalid string: must end with "${t10.suffix}"` : t10.format === "includes" ? `Invalid string: must include "${t10.includes}"` : t10.format === "regex" ? `Invalid string: must match pattern ${t10.pattern}` : `Invalid ${d13[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${e8.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${e8.keys.length > 1 ? "s" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${e8.origin}`;
      case "invalid_union":
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${e8.origin}`;
      default:
        return "Invalid input";
    }
  };
};
function c10() {
  return { localeError: u5() };
}

// vendor/neon/zod_4.3.6_es2022_v4_locales.mjs
var se6 = () => {
  let o21 = { string: { unit: "\u062D\u0631\u0641", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }, file: { unit: "\u0628\u0627\u064A\u062A", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }, array: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }, set: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0645\u062F\u062E\u0644", email: "\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A", url: "\u0631\u0627\u0628\u0637", emoji: "\u0625\u064A\u0645\u0648\u062C\u064A", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO", date: "\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO", time: "\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO", duration: "\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO", ipv4: "\u0639\u0646\u0648\u0627\u0646 IPv4", ipv6: "\u0639\u0646\u0648\u0627\u0646 IPv6", cidrv4: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4", cidrv6: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6", base64: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded", base64url: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded", json_string: "\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON", e164: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164", jwt: "JWT", template_literal: "\u0645\u062F\u062E\u0644" }, r21 = { nan: "NaN" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 instanceof ${e8.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${i20}` : `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${t10}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${w12(e8.values[0])}` : `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${e8.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${t10} ${e8.maximum.toString()} ${n18.unit ?? "\u0639\u0646\u0635\u0631"}` : `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${e8.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${t10} ${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${e8.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${t10} ${e8.minimum.toString()} ${n18.unit}` : `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${e8.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${t10} ${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${e8.prefix}"` : t10.format === "ends_with" ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${t10.suffix}"` : t10.format === "includes" ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${t10.includes}"` : t10.format === "regex" ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${t10.pattern}` : `${l19[t10.format] ?? e8.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
      }
      case "not_multiple_of":
        return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${e8.divisor}`;
      case "unrecognized_keys":
        return `\u0645\u0639\u0631\u0641${e8.keys.length > 1 ? "\u0627\u062A" : ""} \u063A\u0631\u064A\u0628${e8.keys.length > 1 ? "\u0629" : ""}: ${S7(e8.keys, "\u060C ")}`;
      case "invalid_key":
        return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${e8.origin}`;
      case "invalid_union":
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
      case "invalid_element":
        return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${e8.origin}`;
      default:
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
    }
  };
};
function be4() {
  return { localeError: se6() };
}
var ye6 = () => {
  let o21 = { string: { unit: "simvol", verb: "olmal\u0131d\u0131r" }, file: { unit: "bayt", verb: "olmal\u0131d\u0131r" }, array: { unit: "element", verb: "olmal\u0131d\u0131r" }, set: { unit: "element", verb: "olmal\u0131d\u0131r" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "input", email: "email address", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datetime", date: "ISO date", time: "ISO time", duration: "ISO duration", ipv4: "IPv4 address", ipv6: "IPv6 address", cidrv4: "IPv4 range", cidrv6: "IPv6 range", base64: "base64-encoded string", base64url: "base64url-encoded string", json_string: "JSON string", e164: "E.164 number", jwt: "JWT", template_literal: "input" }, r21 = { nan: "NaN" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n instanceof ${e8.expected}, daxil olan ${i20}` : `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${t10}, daxil olan ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${w12(e8.values[0])}` : `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${e8.origin ?? "d\u0259y\u0259r"} ${t10}${e8.maximum.toString()} ${n18.unit ?? "element"}` : `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${e8.origin ?? "d\u0259y\u0259r"} ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${e8.origin} ${t10}${e8.minimum.toString()} ${n18.unit}` : `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${e8.origin} ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Yanl\u0131\u015F m\u0259tn: "${t10.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r` : t10.format === "ends_with" ? `Yanl\u0131\u015F m\u0259tn: "${t10.suffix}" il\u0259 bitm\u0259lidir` : t10.format === "includes" ? `Yanl\u0131\u015F m\u0259tn: "${t10.includes}" daxil olmal\u0131d\u0131r` : t10.format === "regex" ? `Yanl\u0131\u015F m\u0259tn: ${t10.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r` : `Yanl\u0131\u015F ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Yanl\u0131\u015F \u0259d\u0259d: ${e8.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan a\xE7ar${e8.keys.length > 1 ? "lar" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `${e8.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
      case "invalid_union":
        return "Yanl\u0131\u015F d\u0259y\u0259r";
      case "invalid_element":
        return `${e8.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
      default:
        return "Yanl\u0131\u015F d\u0259y\u0259r";
    }
  };
};
function _e4() {
  return { localeError: ye6() };
}
function ve5(o21, a16, l19, r21) {
  let e8 = Math.abs(o21), t10 = e8 % 10, n18 = e8 % 100;
  return n18 >= 11 && n18 <= 19 ? r21 : t10 === 1 ? a16 : t10 >= 2 && t10 <= 4 ? l19 : r21;
}
var ke3 = () => {
  let o21 = { string: { unit: { one: "\u0441\u0456\u043C\u0432\u0430\u043B", few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B", many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E" }, verb: "\u043C\u0435\u0446\u044C" }, array: { unit: { one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442", few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B", many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E" }, verb: "\u043C\u0435\u0446\u044C" }, set: { unit: { one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442", few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B", many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E" }, verb: "\u043C\u0435\u0446\u044C" }, file: { unit: { one: "\u0431\u0430\u0439\u0442", few: "\u0431\u0430\u0439\u0442\u044B", many: "\u0431\u0430\u0439\u0442\u0430\u045E" }, verb: "\u043C\u0435\u0446\u044C" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0443\u0432\u043E\u0434", email: "email \u0430\u0434\u0440\u0430\u0441", url: "URL", emoji: "\u044D\u043C\u043E\u0434\u0437\u0456", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441", date: "ISO \u0434\u0430\u0442\u0430", time: "ISO \u0447\u0430\u0441", duration: "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C", ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441", ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441", cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D", cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D", base64: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64", base64url: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url", json_string: "JSON \u0440\u0430\u0434\u043E\u043A", e164: "\u043D\u0443\u043C\u0430\u0440 E.164", jwt: "JWT", template_literal: "\u0443\u0432\u043E\u0434" }, r21 = { nan: "NaN", number: "\u043B\u0456\u043A", array: "\u043C\u0430\u0441\u0456\u045E" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F instanceof ${e8.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${i20}` : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${t10}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${w12(e8.values[0])}` : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        if (n18) {
          let i20 = Number(e8.maximum), c19 = ve5(i20, n18.unit.one, n18.unit.few, n18.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${e8.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${n18.verb} ${t10}${e8.maximum.toString()} ${c19}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${e8.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        if (n18) {
          let i20 = Number(e8.minimum), c19 = ve5(i20, n18.unit.one, n18.unit.few, n18.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${e8.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${n18.verb} ${t10}${e8.minimum.toString()} ${c19}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${e8.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${t10.prefix}"` : t10.format === "ends_with" ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${t10.suffix}"` : t10.format === "includes" ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${t10.includes}"` : t10.format === "regex" ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${t10.pattern}` : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${e8.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${e8.keys.length > 1 ? "\u043A\u043B\u044E\u0447\u044B" : "\u043A\u043B\u044E\u0447"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${e8.origin}`;
      case "invalid_union":
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
      case "invalid_element":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${e8.origin}`;
      default:
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
    }
  };
};
function Ie3() {
  return { localeError: ke3() };
}
var xe4 = () => {
  let o21 = { string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }, file: { unit: "\u0431\u0430\u0439\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }, array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }, set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0432\u0445\u043E\u0434", email: "\u0438\u043C\u0435\u0439\u043B \u0430\u0434\u0440\u0435\u0441", url: "URL", emoji: "\u0435\u043C\u043E\u0434\u0436\u0438", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0432\u0440\u0435\u043C\u0435", date: "ISO \u0434\u0430\u0442\u0430", time: "ISO \u0432\u0440\u0435\u043C\u0435", duration: "ISO \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442", ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441", ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441", cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D", cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D", base64: "base64-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437", base64url: "base64url-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437", json_string: "JSON \u043D\u0438\u0437", e164: "E.164 \u043D\u043E\u043C\u0435\u0440", jwt: "JWT", template_literal: "\u0432\u0445\u043E\u0434" }, r21 = { nan: "NaN", number: "\u0447\u0438\u0441\u043B\u043E", array: "\u043C\u0430\u0441\u0438\u0432" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D instanceof ${e8.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${i20}` : `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${t10}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${w12(e8.values[0])}` : `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u043E\u043F\u0446\u0438\u044F: \u043E\u0447\u0430\u043A\u0432\u0430\u043D\u043E \u0435\u0434\u043D\u043E \u043E\u0442 ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${e8.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${t10}${e8.maximum.toString()} ${n18.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430"}` : `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${e8.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0431\u044A\u0434\u0435 ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${e8.origin} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${t10}${e8.minimum.toString()} ${n18.unit}` : `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${e8.origin} \u0434\u0430 \u0431\u044A\u0434\u0435 ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        if (t10.format === "starts_with") return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u0432\u0430 \u0441 "${t10.prefix}"`;
        if (t10.format === "ends_with") return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u0432\u044A\u0440\u0448\u0432\u0430 \u0441 "${t10.suffix}"`;
        if (t10.format === "includes") return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0432\u043A\u043B\u044E\u0447\u0432\u0430 "${t10.includes}"`;
        if (t10.format === "regex") return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0432\u043F\u0430\u0434\u0430 \u0441 ${t10.pattern}`;
        let n18 = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D";
        return t10.format === "emoji" && (n18 = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E"), t10.format === "datetime" && (n18 = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E"), t10.format === "date" && (n18 = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430"), t10.format === "time" && (n18 = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E"), t10.format === "duration" && (n18 = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430"), `${n18} ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0431\u044A\u0434\u0435 \u043A\u0440\u0430\u0442\u043D\u043E \u043D\u0430 ${e8.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0437\u043F\u043E\u0437\u043D\u0430\u0442${e8.keys.length > 1 ? "\u0438" : ""} \u043A\u043B\u044E\u0447${e8.keys.length > 1 ? "\u043E\u0432\u0435" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043A\u043B\u044E\u0447 \u0432 ${e8.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0432 ${e8.origin}`;
      default:
        return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
    }
  };
};
function Se3() {
  return { localeError: xe4() };
}
var he6 = () => {
  let o21 = { string: { unit: "car\xE0cters", verb: "contenir" }, file: { unit: "bytes", verb: "contenir" }, array: { unit: "elements", verb: "contenir" }, set: { unit: "elements", verb: "contenir" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "entrada", email: "adre\xE7a electr\xF2nica", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "data i hora ISO", date: "data ISO", time: "hora ISO", duration: "durada ISO", ipv4: "adre\xE7a IPv4", ipv6: "adre\xE7a IPv6", cidrv4: "rang IPv4", cidrv6: "rang IPv6", base64: "cadena codificada en base64", base64url: "cadena codificada en base64url", json_string: "cadena JSON", e164: "n\xFAmero E.164", jwt: "JWT", template_literal: "entrada" }, r21 = { nan: "NaN" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Tipus inv\xE0lid: s'esperava instanceof ${e8.expected}, s'ha rebut ${i20}` : `Tipus inv\xE0lid: s'esperava ${t10}, s'ha rebut ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Valor inv\xE0lid: s'esperava ${w12(e8.values[0])}` : `Opci\xF3 inv\xE0lida: s'esperava una de ${S7(e8.values, " o ")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "com a m\xE0xim" : "menys de", n18 = a16(e8.origin);
        return n18 ? `Massa gran: s'esperava que ${e8.origin ?? "el valor"} contingu\xE9s ${t10} ${e8.maximum.toString()} ${n18.unit ?? "elements"}` : `Massa gran: s'esperava que ${e8.origin ?? "el valor"} fos ${t10} ${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? "com a m\xEDnim" : "m\xE9s de", n18 = a16(e8.origin);
        return n18 ? `Massa petit: s'esperava que ${e8.origin} contingu\xE9s ${t10} ${e8.minimum.toString()} ${n18.unit}` : `Massa petit: s'esperava que ${e8.origin} fos ${t10} ${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Format inv\xE0lid: ha de comen\xE7ar amb "${t10.prefix}"` : t10.format === "ends_with" ? `Format inv\xE0lid: ha d'acabar amb "${t10.suffix}"` : t10.format === "includes" ? `Format inv\xE0lid: ha d'incloure "${t10.includes}"` : t10.format === "regex" ? `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${t10.pattern}` : `Format inv\xE0lid per a ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${e8.divisor}`;
      case "unrecognized_keys":
        return `Clau${e8.keys.length > 1 ? "s" : ""} no reconeguda${e8.keys.length > 1 ? "s" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Clau inv\xE0lida a ${e8.origin}`;
      case "invalid_union":
        return "Entrada inv\xE0lida";
      case "invalid_element":
        return `Element inv\xE0lid a ${e8.origin}`;
      default:
        return "Entrada inv\xE0lida";
    }
  };
};
function Ue3() {
  return { localeError: he6() };
}
var je4 = () => {
  let o21 = { string: { unit: "znak\u016F", verb: "m\xEDt" }, file: { unit: "bajt\u016F", verb: "m\xEDt" }, array: { unit: "prvk\u016F", verb: "m\xEDt" }, set: { unit: "prvk\u016F", verb: "m\xEDt" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "regul\xE1rn\xED v\xFDraz", email: "e-mailov\xE1 adresa", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "datum a \u010Das ve form\xE1tu ISO", date: "datum ve form\xE1tu ISO", time: "\u010Das ve form\xE1tu ISO", duration: "doba trv\xE1n\xED ISO", ipv4: "IPv4 adresa", ipv6: "IPv6 adresa", cidrv4: "rozsah IPv4", cidrv6: "rozsah IPv6", base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64", base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url", json_string: "\u0159et\u011Bzec ve form\xE1tu JSON", e164: "\u010D\xEDslo E.164", jwt: "JWT", template_literal: "vstup" }, r21 = { nan: "NaN", number: "\u010D\xEDslo", string: "\u0159et\u011Bzec", function: "funkce", array: "pole" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no instanceof ${e8.expected}, obdr\u017Eeno ${i20}` : `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${t10}, obdr\u017Eeno ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${w12(e8.values[0])}` : `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${e8.origin ?? "hodnota"} mus\xED m\xEDt ${t10}${e8.maximum.toString()} ${n18.unit ?? "prvk\u016F"}` : `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${e8.origin ?? "hodnota"} mus\xED b\xFDt ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${e8.origin ?? "hodnota"} mus\xED m\xEDt ${t10}${e8.minimum.toString()} ${n18.unit ?? "prvk\u016F"}` : `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${e8.origin ?? "hodnota"} mus\xED b\xFDt ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${t10.prefix}"` : t10.format === "ends_with" ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${t10.suffix}"` : t10.format === "includes" ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${t10.includes}"` : t10.format === "regex" ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${t10.pattern}` : `Neplatn\xFD form\xE1t ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${e8.divisor}`;
      case "unrecognized_keys":
        return `Nezn\xE1m\xE9 kl\xED\u010De: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Neplatn\xFD kl\xED\u010D v ${e8.origin}`;
      case "invalid_union":
        return "Neplatn\xFD vstup";
      case "invalid_element":
        return `Neplatn\xE1 hodnota v ${e8.origin}`;
      default:
        return "Neplatn\xFD vstup";
    }
  };
};
function De3() {
  return { localeError: je4() };
}
var ze3 = () => {
  let o21 = { string: { unit: "tegn", verb: "havde" }, file: { unit: "bytes", verb: "havde" }, array: { unit: "elementer", verb: "indeholdt" }, set: { unit: "elementer", verb: "indeholdt" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "input", email: "e-mailadresse", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO dato- og klokkesl\xE6t", date: "ISO-dato", time: "ISO-klokkesl\xE6t", duration: "ISO-varighed", ipv4: "IPv4-omr\xE5de", ipv6: "IPv6-omr\xE5de", cidrv4: "IPv4-spektrum", cidrv6: "IPv6-spektrum", base64: "base64-kodet streng", base64url: "base64url-kodet streng", json_string: "JSON-streng", e164: "E.164-nummer", jwt: "JWT", template_literal: "input" }, r21 = { nan: "NaN", string: "streng", number: "tal", boolean: "boolean", array: "liste", object: "objekt", set: "s\xE6t", file: "fil" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Ugyldigt input: forventede instanceof ${e8.expected}, fik ${i20}` : `Ugyldigt input: forventede ${t10}, fik ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Ugyldig v\xE6rdi: forventede ${w12(e8.values[0])}` : `Ugyldigt valg: forventede en af f\xF8lgende ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin), i20 = r21[e8.origin] ?? e8.origin;
        return n18 ? `For stor: forventede ${i20 ?? "value"} ${n18.verb} ${t10} ${e8.maximum.toString()} ${n18.unit ?? "elementer"}` : `For stor: forventede ${i20 ?? "value"} havde ${t10} ${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin), i20 = r21[e8.origin] ?? e8.origin;
        return n18 ? `For lille: forventede ${i20} ${n18.verb} ${t10} ${e8.minimum.toString()} ${n18.unit}` : `For lille: forventede ${i20} havde ${t10} ${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Ugyldig streng: skal starte med "${t10.prefix}"` : t10.format === "ends_with" ? `Ugyldig streng: skal ende med "${t10.suffix}"` : t10.format === "includes" ? `Ugyldig streng: skal indeholde "${t10.includes}"` : t10.format === "regex" ? `Ugyldig streng: skal matche m\xF8nsteret ${t10.pattern}` : `Ugyldig ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal v\xE6re deleligt med ${e8.divisor}`;
      case "unrecognized_keys":
        return `${e8.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8gle i ${e8.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig v\xE6rdi i ${e8.origin}`;
      default:
        return "Ugyldigt input";
    }
  };
};
function we4() {
  return { localeError: ze3() };
}
var Oe4 = () => {
  let o21 = { string: { unit: "Zeichen", verb: "zu haben" }, file: { unit: "Bytes", verb: "zu haben" }, array: { unit: "Elemente", verb: "zu haben" }, set: { unit: "Elemente", verb: "zu haben" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "Eingabe", email: "E-Mail-Adresse", url: "URL", emoji: "Emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO-Datum und -Uhrzeit", date: "ISO-Datum", time: "ISO-Uhrzeit", duration: "ISO-Dauer", ipv4: "IPv4-Adresse", ipv6: "IPv6-Adresse", cidrv4: "IPv4-Bereich", cidrv6: "IPv6-Bereich", base64: "Base64-codierter String", base64url: "Base64-URL-codierter String", json_string: "JSON-String", e164: "E.164-Nummer", jwt: "JWT", template_literal: "Eingabe" }, r21 = { nan: "NaN", number: "Zahl", array: "Array" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Ung\xFCltige Eingabe: erwartet instanceof ${e8.expected}, erhalten ${i20}` : `Ung\xFCltige Eingabe: erwartet ${t10}, erhalten ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Ung\xFCltige Eingabe: erwartet ${w12(e8.values[0])}` : `Ung\xFCltige Option: erwartet eine von ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Zu gro\xDF: erwartet, dass ${e8.origin ?? "Wert"} ${t10}${e8.maximum.toString()} ${n18.unit ?? "Elemente"} hat` : `Zu gro\xDF: erwartet, dass ${e8.origin ?? "Wert"} ${t10}${e8.maximum.toString()} ist`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Zu klein: erwartet, dass ${e8.origin} ${t10}${e8.minimum.toString()} ${n18.unit} hat` : `Zu klein: erwartet, dass ${e8.origin} ${t10}${e8.minimum.toString()} ist`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Ung\xFCltiger String: muss mit "${t10.prefix}" beginnen` : t10.format === "ends_with" ? `Ung\xFCltiger String: muss mit "${t10.suffix}" enden` : t10.format === "includes" ? `Ung\xFCltiger String: muss "${t10.includes}" enthalten` : t10.format === "regex" ? `Ung\xFCltiger String: muss dem Muster ${t10.pattern} entsprechen` : `Ung\xFCltig: ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Ung\xFCltige Zahl: muss ein Vielfaches von ${e8.divisor} sein`;
      case "unrecognized_keys":
        return `${e8.keys.length > 1 ? "Unbekannte Schl\xFCssel" : "Unbekannter Schl\xFCssel"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Ung\xFCltiger Schl\xFCssel in ${e8.origin}`;
      case "invalid_union":
        return "Ung\xFCltige Eingabe";
      case "invalid_element":
        return `Ung\xFCltiger Wert in ${e8.origin}`;
      default:
        return "Ung\xFCltige Eingabe";
    }
  };
};
function Pe5() {
  return { localeError: Oe4() };
}
var Ne3 = () => {
  let o21 = { string: { unit: "karaktrojn", verb: "havi" }, file: { unit: "bajtojn", verb: "havi" }, array: { unit: "elementojn", verb: "havi" }, set: { unit: "elementojn", verb: "havi" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "enigo", email: "retadreso", url: "URL", emoji: "emo\u011Dio", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO-datotempo", date: "ISO-dato", time: "ISO-tempo", duration: "ISO-da\u016Dro", ipv4: "IPv4-adreso", ipv6: "IPv6-adreso", cidrv4: "IPv4-rango", cidrv6: "IPv6-rango", base64: "64-ume kodita karaktraro", base64url: "URL-64-ume kodita karaktraro", json_string: "JSON-karaktraro", e164: "E.164-nombro", jwt: "JWT", template_literal: "enigo" }, r21 = { nan: "NaN", number: "nombro", array: "tabelo", null: "senvalora" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Nevalida enigo: atendi\u011Dis instanceof ${e8.expected}, ricevi\u011Dis ${i20}` : `Nevalida enigo: atendi\u011Dis ${t10}, ricevi\u011Dis ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Nevalida enigo: atendi\u011Dis ${w12(e8.values[0])}` : `Nevalida opcio: atendi\u011Dis unu el ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Tro granda: atendi\u011Dis ke ${e8.origin ?? "valoro"} havu ${t10}${e8.maximum.toString()} ${n18.unit ?? "elementojn"}` : `Tro granda: atendi\u011Dis ke ${e8.origin ?? "valoro"} havu ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Tro malgranda: atendi\u011Dis ke ${e8.origin} havu ${t10}${e8.minimum.toString()} ${n18.unit}` : `Tro malgranda: atendi\u011Dis ke ${e8.origin} estu ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Nevalida karaktraro: devas komenci\u011Di per "${t10.prefix}"` : t10.format === "ends_with" ? `Nevalida karaktraro: devas fini\u011Di per "${t10.suffix}"` : t10.format === "includes" ? `Nevalida karaktraro: devas inkluzivi "${t10.includes}"` : t10.format === "regex" ? `Nevalida karaktraro: devas kongrui kun la modelo ${t10.pattern}` : `Nevalida ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Nevalida nombro: devas esti oblo de ${e8.divisor}`;
      case "unrecognized_keys":
        return `Nekonata${e8.keys.length > 1 ? "j" : ""} \u015Dlosilo${e8.keys.length > 1 ? "j" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Nevalida \u015Dlosilo en ${e8.origin}`;
      case "invalid_union":
        return "Nevalida enigo";
      case "invalid_element":
        return `Nevalida valoro en ${e8.origin}`;
      default:
        return "Nevalida enigo";
    }
  };
};
function Te3() {
  return { localeError: Ne3() };
}
var Ee4 = () => {
  let o21 = { string: { unit: "caracteres", verb: "tener" }, file: { unit: "bytes", verb: "tener" }, array: { unit: "elementos", verb: "tener" }, set: { unit: "elementos", verb: "tener" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "entrada", email: "direcci\xF3n de correo electr\xF3nico", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "fecha y hora ISO", date: "fecha ISO", time: "hora ISO", duration: "duraci\xF3n ISO", ipv4: "direcci\xF3n IPv4", ipv6: "direcci\xF3n IPv6", cidrv4: "rango IPv4", cidrv6: "rango IPv6", base64: "cadena codificada en base64", base64url: "URL codificada en base64", json_string: "cadena JSON", e164: "n\xFAmero E.164", jwt: "JWT", template_literal: "entrada" }, r21 = { nan: "NaN", string: "texto", number: "n\xFAmero", boolean: "booleano", array: "arreglo", object: "objeto", set: "conjunto", file: "archivo", date: "fecha", bigint: "n\xFAmero grande", symbol: "s\xEDmbolo", undefined: "indefinido", null: "nulo", function: "funci\xF3n", map: "mapa", record: "registro", tuple: "tupla", enum: "enumeraci\xF3n", union: "uni\xF3n", literal: "literal", promise: "promesa", void: "vac\xEDo", never: "nunca", unknown: "desconocido", any: "cualquiera" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Entrada inv\xE1lida: se esperaba instanceof ${e8.expected}, recibido ${i20}` : `Entrada inv\xE1lida: se esperaba ${t10}, recibido ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Entrada inv\xE1lida: se esperaba ${w12(e8.values[0])}` : `Opci\xF3n inv\xE1lida: se esperaba una de ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin), i20 = r21[e8.origin] ?? e8.origin;
        return n18 ? `Demasiado grande: se esperaba que ${i20 ?? "valor"} tuviera ${t10}${e8.maximum.toString()} ${n18.unit ?? "elementos"}` : `Demasiado grande: se esperaba que ${i20 ?? "valor"} fuera ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin), i20 = r21[e8.origin] ?? e8.origin;
        return n18 ? `Demasiado peque\xF1o: se esperaba que ${i20} tuviera ${t10}${e8.minimum.toString()} ${n18.unit}` : `Demasiado peque\xF1o: se esperaba que ${i20} fuera ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Cadena inv\xE1lida: debe comenzar con "${t10.prefix}"` : t10.format === "ends_with" ? `Cadena inv\xE1lida: debe terminar en "${t10.suffix}"` : t10.format === "includes" ? `Cadena inv\xE1lida: debe incluir "${t10.includes}"` : t10.format === "regex" ? `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${t10.pattern}` : `Inv\xE1lido ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${e8.divisor}`;
      case "unrecognized_keys":
        return `Llave${e8.keys.length > 1 ? "s" : ""} desconocida${e8.keys.length > 1 ? "s" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Llave inv\xE1lida en ${r21[e8.origin] ?? e8.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido en ${r21[e8.origin] ?? e8.origin}`;
      default:
        return "Entrada inv\xE1lida";
    }
  };
};
function Ve3() {
  return { localeError: Ee4() };
}
var Le3 = () => {
  let o21 = { string: { unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }, file: { unit: "\u0628\u0627\u06CC\u062A", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }, array: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }, set: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0648\u0631\u0648\u062F\u06CC", email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644", url: "URL", emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648", date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648", time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648", duration: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648", ipv4: "IPv4 \u0622\u062F\u0631\u0633", ipv6: "IPv6 \u0622\u062F\u0631\u0633", cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647", cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647", base64: "base64-encoded \u0631\u0634\u062A\u0647", base64url: "base64url-encoded \u0631\u0634\u062A\u0647", json_string: "JSON \u0631\u0634\u062A\u0647", e164: "E.164 \u0639\u062F\u062F", jwt: "JWT", template_literal: "\u0648\u0631\u0648\u062F\u06CC" }, r21 = { nan: "NaN", number: "\u0639\u062F\u062F", array: "\u0622\u0631\u0627\u06CC\u0647" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A instanceof ${e8.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${i20} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F` : `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${t10} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${i20} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${w12(e8.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F` : `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${S7(e8.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${e8.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${t10}${e8.maximum.toString()} ${n18.unit ?? "\u0639\u0646\u0635\u0631"} \u0628\u0627\u0634\u062F` : `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${e8.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${t10}${e8.maximum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${e8.origin} \u0628\u0627\u06CC\u062F ${t10}${e8.minimum.toString()} ${n18.unit} \u0628\u0627\u0634\u062F` : `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${e8.origin} \u0628\u0627\u06CC\u062F ${t10}${e8.minimum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${t10.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F` : t10.format === "ends_with" ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${t10.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F` : t10.format === "includes" ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${t10.includes}" \u0628\u0627\u0634\u062F` : t10.format === "regex" ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${t10.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F` : `${l19[t10.format] ?? e8.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      }
      case "not_multiple_of":
        return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${e8.divisor} \u0628\u0627\u0634\u062F`;
      case "unrecognized_keys":
        return `\u06A9\u0644\u06CC\u062F${e8.keys.length > 1 ? "\u0647\u0627\u06CC" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${e8.origin}`;
      case "invalid_union":
        return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
      case "invalid_element":
        return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${e8.origin}`;
      default:
        return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
    }
  };
};
function Je3() {
  return { localeError: Le3() };
}
var Fe3 = () => {
  let o21 = { string: { unit: "merkki\xE4", subject: "merkkijonon" }, file: { unit: "tavua", subject: "tiedoston" }, array: { unit: "alkiota", subject: "listan" }, set: { unit: "alkiota", subject: "joukon" }, number: { unit: "", subject: "luvun" }, bigint: { unit: "", subject: "suuren kokonaisluvun" }, int: { unit: "", subject: "kokonaisluvun" }, date: { unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "s\xE4\xE4nn\xF6llinen lauseke", email: "s\xE4hk\xF6postiosoite", url: "URL-osoite", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO-aikaleima", date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4", time: "ISO-aika", duration: "ISO-kesto", ipv4: "IPv4-osoite", ipv6: "IPv6-osoite", cidrv4: "IPv4-alue", cidrv6: "IPv6-alue", base64: "base64-koodattu merkkijono", base64url: "base64url-koodattu merkkijono", json_string: "JSON-merkkijono", e164: "E.164-luku", jwt: "JWT", template_literal: "templaattimerkkijono" }, r21 = { nan: "NaN" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Virheellinen tyyppi: odotettiin instanceof ${e8.expected}, oli ${i20}` : `Virheellinen tyyppi: odotettiin ${t10}, oli ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Virheellinen sy\xF6te: t\xE4ytyy olla ${w12(e8.values[0])}` : `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Liian suuri: ${n18.subject} t\xE4ytyy olla ${t10}${e8.maximum.toString()} ${n18.unit}`.trim() : `Liian suuri: arvon t\xE4ytyy olla ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Liian pieni: ${n18.subject} t\xE4ytyy olla ${t10}${e8.minimum.toString()} ${n18.unit}`.trim() : `Liian pieni: arvon t\xE4ytyy olla ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${t10.prefix}"` : t10.format === "ends_with" ? `Virheellinen sy\xF6te: t\xE4ytyy loppua "${t10.suffix}"` : t10.format === "includes" ? `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${t10.includes}"` : t10.format === "regex" ? `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${t10.pattern}` : `Virheellinen ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: t\xE4ytyy olla luvun ${e8.divisor} monikerta`;
      case "unrecognized_keys":
        return `${e8.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return "Virheellinen sy\xF6te";
    }
  };
};
function Ge3() {
  return { localeError: Fe3() };
}
var Re3 = () => {
  let o21 = { string: { unit: "caract\xE8res", verb: "avoir" }, file: { unit: "octets", verb: "avoir" }, array: { unit: "\xE9l\xE9ments", verb: "avoir" }, set: { unit: "\xE9l\xE9ments", verb: "avoir" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "entr\xE9e", email: "adresse e-mail", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "date et heure ISO", date: "date ISO", time: "heure ISO", duration: "dur\xE9e ISO", ipv4: "adresse IPv4", ipv6: "adresse IPv6", cidrv4: "plage IPv4", cidrv6: "plage IPv6", base64: "cha\xEEne encod\xE9e en base64", base64url: "cha\xEEne encod\xE9e en base64url", json_string: "cha\xEEne JSON", e164: "num\xE9ro E.164", jwt: "JWT", template_literal: "entr\xE9e" }, r21 = { nan: "NaN", number: "nombre", array: "tableau" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Entr\xE9e invalide : instanceof ${e8.expected} attendu, ${i20} re\xE7u` : `Entr\xE9e invalide : ${t10} attendu, ${i20} re\xE7u`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Entr\xE9e invalide : ${w12(e8.values[0])} attendu` : `Option invalide : une valeur parmi ${S7(e8.values, "|")} attendue`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Trop grand : ${e8.origin ?? "valeur"} doit ${n18.verb} ${t10}${e8.maximum.toString()} ${n18.unit ?? "\xE9l\xE9ment(s)"}` : `Trop grand : ${e8.origin ?? "valeur"} doit \xEAtre ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Trop petit : ${e8.origin} doit ${n18.verb} ${t10}${e8.minimum.toString()} ${n18.unit}` : `Trop petit : ${e8.origin} doit \xEAtre ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Cha\xEEne invalide : doit commencer par "${t10.prefix}"` : t10.format === "ends_with" ? `Cha\xEEne invalide : doit se terminer par "${t10.suffix}"` : t10.format === "includes" ? `Cha\xEEne invalide : doit inclure "${t10.includes}"` : t10.format === "regex" ? `Cha\xEEne invalide : doit correspondre au mod\xE8le ${t10.pattern}` : `${l19[t10.format] ?? e8.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${e8.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${e8.keys.length > 1 ? "s" : ""} non reconnue${e8.keys.length > 1 ? "s" : ""} : ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${e8.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${e8.origin}`;
      default:
        return "Entr\xE9e invalide";
    }
  };
};
function Ae2() {
  return { localeError: Re3() };
}
var Ke3 = () => {
  let o21 = { string: { unit: "caract\xE8res", verb: "avoir" }, file: { unit: "octets", verb: "avoir" }, array: { unit: "\xE9l\xE9ments", verb: "avoir" }, set: { unit: "\xE9l\xE9ments", verb: "avoir" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "entr\xE9e", email: "adresse courriel", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "date-heure ISO", date: "date ISO", time: "heure ISO", duration: "dur\xE9e ISO", ipv4: "adresse IPv4", ipv6: "adresse IPv6", cidrv4: "plage IPv4", cidrv6: "plage IPv6", base64: "cha\xEEne encod\xE9e en base64", base64url: "cha\xEEne encod\xE9e en base64url", json_string: "cha\xEEne JSON", e164: "num\xE9ro E.164", jwt: "JWT", template_literal: "entr\xE9e" }, r21 = { nan: "NaN" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Entr\xE9e invalide : attendu instanceof ${e8.expected}, re\xE7u ${i20}` : `Entr\xE9e invalide : attendu ${t10}, re\xE7u ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Entr\xE9e invalide : attendu ${w12(e8.values[0])}` : `Option invalide : attendu l'une des valeurs suivantes ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "\u2264" : "<", n18 = a16(e8.origin);
        return n18 ? `Trop grand : attendu que ${e8.origin ?? "la valeur"} ait ${t10}${e8.maximum.toString()} ${n18.unit}` : `Trop grand : attendu que ${e8.origin ?? "la valeur"} soit ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? "\u2265" : ">", n18 = a16(e8.origin);
        return n18 ? `Trop petit : attendu que ${e8.origin} ait ${t10}${e8.minimum.toString()} ${n18.unit}` : `Trop petit : attendu que ${e8.origin} soit ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Cha\xEEne invalide : doit commencer par "${t10.prefix}"` : t10.format === "ends_with" ? `Cha\xEEne invalide : doit se terminer par "${t10.suffix}"` : t10.format === "includes" ? `Cha\xEEne invalide : doit inclure "${t10.includes}"` : t10.format === "regex" ? `Cha\xEEne invalide : doit correspondre au motif ${t10.pattern}` : `${l19[t10.format] ?? e8.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${e8.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${e8.keys.length > 1 ? "s" : ""} non reconnue${e8.keys.length > 1 ? "s" : ""} : ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${e8.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${e8.origin}`;
      default:
        return "Entr\xE9e invalide";
    }
  };
};
function Ze3() {
  return { localeError: Ke3() };
}
var We3 = () => {
  let o21 = { string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA", gender: "f" }, number: { label: "\u05DE\u05E1\u05E4\u05E8", gender: "m" }, boolean: { label: "\u05E2\u05E8\u05DA \u05D1\u05D5\u05DC\u05D9\u05D0\u05E0\u05D9", gender: "m" }, bigint: { label: "BigInt", gender: "m" }, date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA", gender: "m" }, array: { label: "\u05DE\u05E2\u05E8\u05DA", gender: "m" }, object: { label: "\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8", gender: "m" }, null: { label: "\u05E2\u05E8\u05DA \u05E8\u05D9\u05E7 (null)", gender: "m" }, undefined: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05DE\u05D5\u05D2\u05D3\u05E8 (undefined)", gender: "m" }, symbol: { label: "\u05E1\u05D9\u05DE\u05D1\u05D5\u05DC (Symbol)", gender: "m" }, function: { label: "\u05E4\u05D5\u05E0\u05E7\u05E6\u05D9\u05D4", gender: "f" }, map: { label: "\u05DE\u05E4\u05D4 (Map)", gender: "f" }, set: { label: "\u05E7\u05D1\u05D5\u05E6\u05D4 (Set)", gender: "f" }, file: { label: "\u05E7\u05D5\u05D1\u05E5", gender: "m" }, promise: { label: "Promise", gender: "m" }, NaN: { label: "NaN", gender: "m" }, unknown: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2", gender: "m" }, value: { label: "\u05E2\u05E8\u05DA", gender: "m" } }, a16 = { string: { unit: "\u05EA\u05D5\u05D5\u05D9\u05DD", shortLabel: "\u05E7\u05E6\u05E8", longLabel: "\u05D0\u05E8\u05D5\u05DA" }, file: { unit: "\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }, array: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }, set: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }, number: { unit: "", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" } }, l19 = (u18) => u18 ? o21[u18] : void 0, r21 = (u18) => {
    let d13 = l19(u18);
    return d13 ? d13.label : u18 ?? o21.unknown.label;
  }, e8 = (u18) => `\u05D4${r21(u18)}`, t10 = (u18) => (l19(u18)?.gender ?? "m") === "f" ? "\u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA" : "\u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA", n18 = (u18) => u18 ? a16[u18] ?? null : null, i20 = { regex: { label: "\u05E7\u05DC\u05D8", gender: "m" }, email: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", gender: "f" }, url: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA", gender: "f" }, emoji: { label: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9", gender: "m" }, uuid: { label: "UUID", gender: "m" }, nanoid: { label: "nanoid", gender: "m" }, guid: { label: "GUID", gender: "m" }, cuid: { label: "cuid", gender: "m" }, cuid2: { label: "cuid2", gender: "m" }, ulid: { label: "ULID", gender: "m" }, xid: { label: "XID", gender: "m" }, ksuid: { label: "KSUID", gender: "m" }, datetime: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO", gender: "m" }, date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA ISO", gender: "m" }, time: { label: "\u05D6\u05DE\u05DF ISO", gender: "m" }, duration: { label: "\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO", gender: "m" }, ipv4: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv4", gender: "f" }, ipv6: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv6", gender: "f" }, cidrv4: { label: "\u05D8\u05D5\u05D5\u05D7 IPv4", gender: "m" }, cidrv6: { label: "\u05D8\u05D5\u05D5\u05D7 IPv6", gender: "m" }, base64: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64", gender: "f" }, base64url: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA", gender: "f" }, json_string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON", gender: "f" }, e164: { label: "\u05DE\u05E1\u05E4\u05E8 E.164", gender: "m" }, jwt: { label: "JWT", gender: "m" }, ends_with: { label: "\u05E7\u05DC\u05D8", gender: "m" }, includes: { label: "\u05E7\u05DC\u05D8", gender: "m" }, lowercase: { label: "\u05E7\u05DC\u05D8", gender: "m" }, starts_with: { label: "\u05E7\u05DC\u05D8", gender: "m" }, uppercase: { label: "\u05E7\u05DC\u05D8", gender: "m" } }, c19 = { nan: "NaN" };
  return (u18) => {
    switch (u18.code) {
      case "invalid_type": {
        let d13 = u18.expected, m16 = c19[d13 ?? ""] ?? r21(d13), v13 = le5(u18.input), g12 = c19[v13] ?? o21[v13]?.label ?? v13;
        return /^[A-Z]/.test(u18.expected) ? `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA instanceof ${u18.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${g12}` : `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${m16}, \u05D4\u05EA\u05E7\u05D1\u05DC ${g12}`;
      }
      case "invalid_value": {
        if (u18.values.length === 1) return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${w12(u18.values[0])}`;
        let d13 = u18.values.map((g12) => w12(g12));
        if (u18.values.length === 2) return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${d13[0]} \u05D0\u05D5 ${d13[1]}`;
        let m16 = d13[d13.length - 1];
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${d13.slice(0, -1).join(", ")} \u05D0\u05D5 ${m16}`;
      }
      case "too_big": {
        let d13 = n18(u18.origin), m16 = e8(u18.origin ?? "value");
        if (u18.origin === "string") return `${d13?.longLabel ?? "\u05D0\u05E8\u05D5\u05DA"} \u05DE\u05D3\u05D9: ${m16} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${u18.maximum.toString()} ${d13?.unit ?? ""} ${u18.inclusive ? "\u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA" : "\u05DC\u05DB\u05DC \u05D4\u05D9\u05D5\u05EA\u05E8"}`.trim();
        if (u18.origin === "number") {
          let f17 = u18.inclusive ? `\u05E7\u05D8\u05DF \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${u18.maximum}` : `\u05E7\u05D8\u05DF \u05DE-${u18.maximum}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${m16} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${f17}`;
        }
        if (u18.origin === "array" || u18.origin === "set") {
          let f17 = u18.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA", de7 = u18.inclusive ? `${u18.maximum} ${d13?.unit ?? ""} \u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA` : `\u05E4\u05D7\u05D5\u05EA \u05DE-${u18.maximum} ${d13?.unit ?? ""}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${m16} ${f17} \u05DC\u05D4\u05DB\u05D9\u05DC ${de7}`.trim();
        }
        let v13 = u18.inclusive ? "<=" : "<", g12 = t10(u18.origin ?? "value");
        return d13?.unit ? `${d13.longLabel} \u05DE\u05D3\u05D9: ${m16} ${g12} ${v13}${u18.maximum.toString()} ${d13.unit}` : `${d13?.longLabel ?? "\u05D2\u05D3\u05D5\u05DC"} \u05DE\u05D3\u05D9: ${m16} ${g12} ${v13}${u18.maximum.toString()}`;
      }
      case "too_small": {
        let d13 = n18(u18.origin), m16 = e8(u18.origin ?? "value");
        if (u18.origin === "string") return `${d13?.shortLabel ?? "\u05E7\u05E6\u05E8"} \u05DE\u05D3\u05D9: ${m16} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${u18.minimum.toString()} ${d13?.unit ?? ""} ${u18.inclusive ? "\u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8" : "\u05DC\u05E4\u05D7\u05D5\u05EA"}`.trim();
        if (u18.origin === "number") {
          let f17 = u18.inclusive ? `\u05D2\u05D3\u05D5\u05DC \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${u18.minimum}` : `\u05D2\u05D3\u05D5\u05DC \u05DE-${u18.minimum}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${m16} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${f17}`;
        }
        if (u18.origin === "array" || u18.origin === "set") {
          let f17 = u18.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
          if (u18.minimum === 1 && u18.inclusive) {
            let pe10 = (u18.origin === "set", "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3");
            return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${m16} ${f17} \u05DC\u05D4\u05DB\u05D9\u05DC ${pe10}`;
          }
          let de7 = u18.inclusive ? `${u18.minimum} ${d13?.unit ?? ""} \u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8` : `\u05D9\u05D5\u05EA\u05E8 \u05DE-${u18.minimum} ${d13?.unit ?? ""}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${m16} ${f17} \u05DC\u05D4\u05DB\u05D9\u05DC ${de7}`.trim();
        }
        let v13 = u18.inclusive ? ">=" : ">", g12 = t10(u18.origin ?? "value");
        return d13?.unit ? `${d13.shortLabel} \u05DE\u05D3\u05D9: ${m16} ${g12} ${v13}${u18.minimum.toString()} ${d13.unit}` : `${d13?.shortLabel ?? "\u05E7\u05D8\u05DF"} \u05DE\u05D3\u05D9: ${m16} ${g12} ${v13}${u18.minimum.toString()}`;
      }
      case "invalid_format": {
        let d13 = u18;
        if (d13.format === "starts_with") return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1 "${d13.prefix}"`;
        if (d13.format === "ends_with") return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${d13.suffix}"`;
        if (d13.format === "includes") return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${d13.includes}"`;
        if (d13.format === "regex") return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${d13.pattern}`;
        let m16 = i20[d13.format], v13 = m16?.label ?? d13.format, f17 = (m16?.gender ?? "m") === "f" ? "\u05EA\u05E7\u05D9\u05E0\u05D4" : "\u05EA\u05E7\u05D9\u05DF";
        return `${v13} \u05DC\u05D0 ${f17}`;
      }
      case "not_multiple_of":
        return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${u18.divisor}`;
      case "unrecognized_keys":
        return `\u05DE\u05E4\u05EA\u05D7${u18.keys.length > 1 ? "\u05D5\u05EA" : ""} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${u18.keys.length > 1 ? "\u05D9\u05DD" : "\u05D4"}: ${S7(u18.keys, ", ")}`;
      case "invalid_key":
        return "\u05E9\u05D3\u05D4 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8";
      case "invalid_union":
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
      case "invalid_element":
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${e8(u18.origin ?? "array")}`;
      default:
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
    }
  };
};
function Xe3() {
  return { localeError: We3() };
}
var Ce3 = () => {
  let o21 = { string: { unit: "karakter", verb: "legyen" }, file: { unit: "byte", verb: "legyen" }, array: { unit: "elem", verb: "legyen" }, set: { unit: "elem", verb: "legyen" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "bemenet", email: "email c\xEDm", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO id\u0151b\xE9lyeg", date: "ISO d\xE1tum", time: "ISO id\u0151", duration: "ISO id\u0151intervallum", ipv4: "IPv4 c\xEDm", ipv6: "IPv6 c\xEDm", cidrv4: "IPv4 tartom\xE1ny", cidrv6: "IPv6 tartom\xE1ny", base64: "base64-k\xF3dolt string", base64url: "base64url-k\xF3dolt string", json_string: "JSON string", e164: "E.164 sz\xE1m", jwt: "JWT", template_literal: "bemenet" }, r21 = { nan: "NaN", number: "sz\xE1m", array: "t\xF6mb" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k instanceof ${e8.expected}, a kapott \xE9rt\xE9k ${i20}` : `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${t10}, a kapott \xE9rt\xE9k ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${w12(e8.values[0])}` : `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `T\xFAl nagy: ${e8.origin ?? "\xE9rt\xE9k"} m\xE9rete t\xFAl nagy ${t10}${e8.maximum.toString()} ${n18.unit ?? "elem"}` : `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${e8.origin ?? "\xE9rt\xE9k"} t\xFAl nagy: ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${e8.origin} m\xE9rete t\xFAl kicsi ${t10}${e8.minimum.toString()} ${n18.unit}` : `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${e8.origin} t\xFAl kicsi ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\xC9rv\xE9nytelen string: "${t10.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie` : t10.format === "ends_with" ? `\xC9rv\xE9nytelen string: "${t10.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie` : t10.format === "includes" ? `\xC9rv\xE9nytelen string: "${t10.includes}" \xE9rt\xE9ket kell tartalmaznia` : t10.format === "regex" ? `\xC9rv\xE9nytelen string: ${t10.pattern} mint\xE1nak kell megfelelnie` : `\xC9rv\xE9nytelen ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\xC9rv\xE9nytelen sz\xE1m: ${e8.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${e8.keys.length > 1 ? "s" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\xC9rv\xE9nytelen kulcs ${e8.origin}`;
      case "invalid_union":
        return "\xC9rv\xE9nytelen bemenet";
      case "invalid_element":
        return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${e8.origin}`;
      default:
        return "\xC9rv\xE9nytelen bemenet";
    }
  };
};
function qe4() {
  return { localeError: Ce3() };
}
function ge6(o21, a16, l19) {
  return Math.abs(o21) === 1 ? a16 : l19;
}
function le6(o21) {
  if (!o21) return "";
  let a16 = ["\u0561", "\u0565", "\u0568", "\u056B", "\u0578", "\u0578\u0582", "\u0585"], l19 = o21[o21.length - 1];
  return o21 + (a16.includes(l19) ? "\u0576" : "\u0568");
}
var Me4 = () => {
  let o21 = { string: { unit: { one: "\u0576\u0577\u0561\u0576", many: "\u0576\u0577\u0561\u0576\u0576\u0565\u0580" }, verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C" }, file: { unit: { one: "\u0562\u0561\u0575\u0569", many: "\u0562\u0561\u0575\u0569\u0565\u0580" }, verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C" }, array: { unit: { one: "\u057F\u0561\u0580\u0580", many: "\u057F\u0561\u0580\u0580\u0565\u0580" }, verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C" }, set: { unit: { one: "\u057F\u0561\u0580\u0580", many: "\u057F\u0561\u0580\u0580\u0565\u0580" }, verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0574\u0578\u0582\u057F\u0584", email: "\u0567\u056C. \u0570\u0561\u057D\u0581\u0565", url: "URL", emoji: "\u0567\u0574\u0578\u057B\u056B", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E \u0587 \u056A\u0561\u0574", date: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E", time: "ISO \u056A\u0561\u0574", duration: "ISO \u057F\u0587\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576", ipv4: "IPv4 \u0570\u0561\u057D\u0581\u0565", ipv6: "IPv6 \u0570\u0561\u057D\u0581\u0565", cidrv4: "IPv4 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584", cidrv6: "IPv6 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584", base64: "base64 \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572", base64url: "base64url \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572", json_string: "JSON \u057F\u0578\u0572", e164: "E.164 \u0570\u0561\u0574\u0561\u0580", jwt: "JWT", template_literal: "\u0574\u0578\u0582\u057F\u0584" }, r21 = { nan: "NaN", number: "\u0569\u056B\u057E", array: "\u0566\u0561\u0576\u0563\u057E\u0561\u056E" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 instanceof ${e8.expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${i20}` : `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${t10}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${w12(e8.values[1])}` : `\u054D\u056D\u0561\u056C \u057F\u0561\u0580\u0562\u0565\u0580\u0561\u056F\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 \u0570\u0565\u057F\u0587\u0575\u0561\u056C\u0576\u0565\u0580\u056B\u0581 \u0574\u0565\u056F\u0568\u055D ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        if (n18) {
          let i20 = Number(e8.maximum), c19 = ge6(i20, n18.unit.one, n18.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${le6(e8.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${t10}${e8.maximum.toString()} ${c19}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${le6(e8.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056C\u056B\u0576\u056B ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        if (n18) {
          let i20 = Number(e8.minimum), c19 = ge6(i20, n18.unit.one, n18.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${le6(e8.origin)} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${t10}${e8.minimum.toString()} ${c19}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${le6(e8.origin)} \u056C\u056B\u0576\u056B ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057D\u056F\u057D\u057E\u056B "${t10.prefix}"-\u0578\u057E` : t10.format === "ends_with" ? `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0561\u057E\u0561\u0580\u057F\u057E\u056B "${t10.suffix}"-\u0578\u057E` : t10.format === "includes" ? `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057A\u0561\u0580\u0578\u0582\u0576\u0561\u056F\u056B "${t10.includes}"` : t10.format === "regex" ? `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0570\u0561\u0574\u0561\u057A\u0561\u057F\u0561\u057D\u056D\u0561\u0576\u056B ${t10.pattern} \u0571\u0587\u0561\u0579\u0561\u0583\u056B\u0576` : `\u054D\u056D\u0561\u056C ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u054D\u056D\u0561\u056C \u0569\u056B\u057E\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0562\u0561\u0566\u0574\u0561\u057A\u0561\u057F\u056B\u056F \u056C\u056B\u0576\u056B ${e8.divisor}-\u056B`;
      case "unrecognized_keys":
        return `\u0549\u0573\u0561\u0576\u0561\u0579\u057E\u0561\u056E \u0562\u0561\u0576\u0561\u056C\u056B${e8.keys.length > 1 ? "\u0576\u0565\u0580" : ""}. ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\u054D\u056D\u0561\u056C \u0562\u0561\u0576\u0561\u056C\u056B ${le6(e8.origin)}-\u0578\u0582\u0574`;
      case "invalid_union":
        return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
      case "invalid_element":
        return `\u054D\u056D\u0561\u056C \u0561\u0580\u056A\u0565\u0584 ${le6(e8.origin)}-\u0578\u0582\u0574`;
      default:
        return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
    }
  };
};
function Ye3() {
  return { localeError: Me4() };
}
var Be3 = () => {
  let o21 = { string: { unit: "karakter", verb: "memiliki" }, file: { unit: "byte", verb: "memiliki" }, array: { unit: "item", verb: "memiliki" }, set: { unit: "item", verb: "memiliki" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "input", email: "alamat email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "tanggal dan waktu format ISO", date: "tanggal format ISO", time: "jam format ISO", duration: "durasi format ISO", ipv4: "alamat IPv4", ipv6: "alamat IPv6", cidrv4: "rentang alamat IPv4", cidrv6: "rentang alamat IPv6", base64: "string dengan enkode base64", base64url: "string dengan enkode base64url", json_string: "string JSON", e164: "angka E.164", jwt: "JWT", template_literal: "input" }, r21 = { nan: "NaN" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Input tidak valid: diharapkan instanceof ${e8.expected}, diterima ${i20}` : `Input tidak valid: diharapkan ${t10}, diterima ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Input tidak valid: diharapkan ${w12(e8.values[0])}` : `Pilihan tidak valid: diharapkan salah satu dari ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Terlalu besar: diharapkan ${e8.origin ?? "value"} memiliki ${t10}${e8.maximum.toString()} ${n18.unit ?? "elemen"}` : `Terlalu besar: diharapkan ${e8.origin ?? "value"} menjadi ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Terlalu kecil: diharapkan ${e8.origin} memiliki ${t10}${e8.minimum.toString()} ${n18.unit}` : `Terlalu kecil: diharapkan ${e8.origin} menjadi ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `String tidak valid: harus dimulai dengan "${t10.prefix}"` : t10.format === "ends_with" ? `String tidak valid: harus berakhir dengan "${t10.suffix}"` : t10.format === "includes" ? `String tidak valid: harus menyertakan "${t10.includes}"` : t10.format === "regex" ? `String tidak valid: harus sesuai pola ${t10.pattern}` : `${l19[t10.format] ?? e8.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${e8.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${e8.keys.length > 1 ? "s" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${e8.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${e8.origin}`;
      default:
        return "Input tidak valid";
    }
  };
};
function He4() {
  return { localeError: Be3() };
}
var Qe3 = () => {
  let o21 = { string: { unit: "stafi", verb: "a\xF0 hafa" }, file: { unit: "b\xE6ti", verb: "a\xF0 hafa" }, array: { unit: "hluti", verb: "a\xF0 hafa" }, set: { unit: "hluti", verb: "a\xF0 hafa" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "gildi", email: "netfang", url: "vefsl\xF3\xF0", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO dagsetning og t\xEDmi", date: "ISO dagsetning", time: "ISO t\xEDmi", duration: "ISO t\xEDmalengd", ipv4: "IPv4 address", ipv6: "IPv6 address", cidrv4: "IPv4 range", cidrv6: "IPv6 range", base64: "base64-encoded strengur", base64url: "base64url-encoded strengur", json_string: "JSON strengur", e164: "E.164 t\xF6lugildi", jwt: "JWT", template_literal: "gildi" }, r21 = { nan: "NaN", number: "n\xFAmer", array: "fylki" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Rangt gildi: \xDE\xFA sl\xF3st inn ${i20} \xFEar sem \xE1 a\xF0 vera instanceof ${e8.expected}` : `Rangt gildi: \xDE\xFA sl\xF3st inn ${i20} \xFEar sem \xE1 a\xF0 vera ${t10}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Rangt gildi: gert r\xE1\xF0 fyrir ${w12(e8.values[0])}` : `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${e8.origin ?? "gildi"} hafi ${t10}${e8.maximum.toString()} ${n18.unit ?? "hluti"}` : `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${e8.origin ?? "gildi"} s\xE9 ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${e8.origin} hafi ${t10}${e8.minimum.toString()} ${n18.unit}` : `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${e8.origin} s\xE9 ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${t10.prefix}"` : t10.format === "ends_with" ? `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${t10.suffix}"` : t10.format === "includes" ? `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${t10.includes}"` : t10.format === "regex" ? `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${t10.pattern}` : `Rangt ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${e8.divisor}`;
      case "unrecognized_keys":
        return `\xD3\xFEekkt ${e8.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Rangur lykill \xED ${e8.origin}`;
      case "invalid_union":
        return "Rangt gildi";
      case "invalid_element":
        return `Rangt gildi \xED ${e8.origin}`;
      default:
        return "Rangt gildi";
    }
  };
};
function et3() {
  return { localeError: Qe3() };
}
var tt3 = () => {
  let o21 = { string: { unit: "caratteri", verb: "avere" }, file: { unit: "byte", verb: "avere" }, array: { unit: "elementi", verb: "avere" }, set: { unit: "elementi", verb: "avere" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "input", email: "indirizzo email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "data e ora ISO", date: "data ISO", time: "ora ISO", duration: "durata ISO", ipv4: "indirizzo IPv4", ipv6: "indirizzo IPv6", cidrv4: "intervallo IPv4", cidrv6: "intervallo IPv6", base64: "stringa codificata in base64", base64url: "URL codificata in base64", json_string: "stringa JSON", e164: "numero E.164", jwt: "JWT", template_literal: "input" }, r21 = { nan: "NaN", number: "numero", array: "vettore" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Input non valido: atteso instanceof ${e8.expected}, ricevuto ${i20}` : `Input non valido: atteso ${t10}, ricevuto ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Input non valido: atteso ${w12(e8.values[0])}` : `Opzione non valida: atteso uno tra ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Troppo grande: ${e8.origin ?? "valore"} deve avere ${t10}${e8.maximum.toString()} ${n18.unit ?? "elementi"}` : `Troppo grande: ${e8.origin ?? "valore"} deve essere ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Troppo piccolo: ${e8.origin} deve avere ${t10}${e8.minimum.toString()} ${n18.unit}` : `Troppo piccolo: ${e8.origin} deve essere ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Stringa non valida: deve iniziare con "${t10.prefix}"` : t10.format === "ends_with" ? `Stringa non valida: deve terminare con "${t10.suffix}"` : t10.format === "includes" ? `Stringa non valida: deve includere "${t10.includes}"` : t10.format === "regex" ? `Stringa non valida: deve corrispondere al pattern ${t10.pattern}` : `Invalid ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${e8.divisor}`;
      case "unrecognized_keys":
        return `Chiav${e8.keys.length > 1 ? "i" : "e"} non riconosciut${e8.keys.length > 1 ? "e" : "a"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${e8.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${e8.origin}`;
      default:
        return "Input non valido";
    }
  };
};
function nt3() {
  return { localeError: tt3() };
}
var it3 = () => {
  let o21 = { string: { unit: "\u6587\u5B57", verb: "\u3067\u3042\u308B" }, file: { unit: "\u30D0\u30A4\u30C8", verb: "\u3067\u3042\u308B" }, array: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" }, set: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u5165\u529B\u5024", email: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9", url: "URL", emoji: "\u7D75\u6587\u5B57", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO\u65E5\u6642", date: "ISO\u65E5\u4ED8", time: "ISO\u6642\u523B", duration: "ISO\u671F\u9593", ipv4: "IPv4\u30A2\u30C9\u30EC\u30B9", ipv6: "IPv6\u30A2\u30C9\u30EC\u30B9", cidrv4: "IPv4\u7BC4\u56F2", cidrv6: "IPv6\u7BC4\u56F2", base64: "base64\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217", base64url: "base64url\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217", json_string: "JSON\u6587\u5B57\u5217", e164: "E.164\u756A\u53F7", jwt: "JWT", template_literal: "\u5165\u529B\u5024" }, r21 = { nan: "NaN", number: "\u6570\u5024", array: "\u914D\u5217" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u7121\u52B9\u306A\u5165\u529B: instanceof ${e8.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${i20}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F` : `\u7121\u52B9\u306A\u5165\u529B: ${t10}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${i20}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u7121\u52B9\u306A\u5165\u529B: ${w12(e8.values[0])}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F` : `\u7121\u52B9\u306A\u9078\u629E: ${S7(e8.values, "\u3001")}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "too_big": {
        let t10 = e8.inclusive ? "\u4EE5\u4E0B\u3067\u3042\u308B" : "\u3088\u308A\u5C0F\u3055\u3044", n18 = a16(e8.origin);
        return n18 ? `\u5927\u304D\u3059\u304E\u308B\u5024: ${e8.origin ?? "\u5024"}\u306F${e8.maximum.toString()}${n18.unit ?? "\u8981\u7D20"}${t10}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059` : `\u5927\u304D\u3059\u304E\u308B\u5024: ${e8.origin ?? "\u5024"}\u306F${e8.maximum.toString()}${t10}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? "\u4EE5\u4E0A\u3067\u3042\u308B" : "\u3088\u308A\u5927\u304D\u3044", n18 = a16(e8.origin);
        return n18 ? `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${e8.origin}\u306F${e8.minimum.toString()}${n18.unit}${t10}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059` : `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${e8.origin}\u306F${e8.minimum.toString()}${t10}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${t10.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059` : t10.format === "ends_with" ? `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${t10.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059` : t10.format === "includes" ? `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${t10.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059` : t10.format === "regex" ? `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${t10.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059` : `\u7121\u52B9\u306A${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u52B9\u306A\u6570\u5024: ${e8.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "unrecognized_keys":
        return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${e8.keys.length > 1 ? "\u7FA4" : ""}: ${S7(e8.keys, "\u3001")}`;
      case "invalid_key":
        return `${e8.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
      case "invalid_union":
        return "\u7121\u52B9\u306A\u5165\u529B";
      case "invalid_element":
        return `${e8.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
      default:
        return "\u7121\u52B9\u306A\u5165\u529B";
    }
  };
};
function rt3() {
  return { localeError: it3() };
}
var at3 = () => {
  let o21 = { string: { unit: "\u10E1\u10D8\u10DB\u10D1\u10DD\u10DA\u10DD", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }, file: { unit: "\u10D1\u10D0\u10D8\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }, array: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }, set: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0", email: "\u10D4\u10DA-\u10E4\u10DD\u10E1\u10E2\u10D8\u10E1 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8", url: "URL", emoji: "\u10D4\u10DB\u10DD\u10EF\u10D8", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8-\u10D3\u10E0\u10DD", date: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8", time: "\u10D3\u10E0\u10DD", duration: "\u10EE\u10D0\u10DC\u10D2\u10E0\u10EB\u10DA\u10D8\u10D5\u10DD\u10D1\u10D0", ipv4: "IPv4 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8", ipv6: "IPv6 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8", cidrv4: "IPv4 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8", cidrv6: "IPv6 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8", base64: "base64-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8", base64url: "base64url-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8", json_string: "JSON \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8", e164: "E.164 \u10DC\u10DD\u10DB\u10D4\u10E0\u10D8", jwt: "JWT", template_literal: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0" }, r21 = { nan: "NaN", number: "\u10E0\u10D8\u10EA\u10EE\u10D5\u10D8", string: "\u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8", boolean: "\u10D1\u10E3\u10DA\u10D4\u10D0\u10DC\u10D8", function: "\u10E4\u10E3\u10DC\u10E5\u10EA\u10D8\u10D0", array: "\u10DB\u10D0\u10E1\u10D8\u10D5\u10D8" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 instanceof ${e8.expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${i20}` : `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${t10}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${w12(e8.values[0])}` : `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D0\u10E0\u10D8\u10D0\u10DC\u10E2\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8\u10D0 \u10D4\u10E0\u10D7-\u10D4\u10E0\u10D7\u10D8 ${S7(e8.values, "|")}-\u10D3\u10D0\u10DC`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${e8.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} ${n18.verb} ${t10}${e8.maximum.toString()} ${n18.unit}` : `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${e8.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} \u10D8\u10E7\u10DD\u10E1 ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${e8.origin} ${n18.verb} ${t10}${e8.minimum.toString()} ${n18.unit}` : `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${e8.origin} \u10D8\u10E7\u10DD\u10E1 ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10EC\u10E7\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${t10.prefix}"-\u10D8\u10D7` : t10.format === "ends_with" ? `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10DB\u10D7\u10D0\u10D5\u10E0\u10D3\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${t10.suffix}"-\u10D8\u10D7` : t10.format === "includes" ? `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1 "${t10.includes}"-\u10E1` : t10.format === "regex" ? `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D4\u10E1\u10D0\u10D1\u10D0\u10DB\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 \u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10E1 ${t10.pattern}` : `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E0\u10D8\u10EA\u10EE\u10D5\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10E7\u10DD\u10E1 ${e8.divisor}-\u10D8\u10E1 \u10EF\u10D4\u10E0\u10D0\u10D3\u10D8`;
      case "unrecognized_keys":
        return `\u10E3\u10EA\u10DC\u10DD\u10D1\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1${e8.keys.length > 1 ? "\u10D4\u10D1\u10D8" : "\u10D8"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 ${e8.origin}-\u10E8\u10D8`;
      case "invalid_union":
        return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
      case "invalid_element":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0 ${e8.origin}-\u10E8\u10D8`;
      default:
        return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
    }
  };
};
function ot3() {
  return { localeError: at3() };
}
var lt3 = () => {
  let o21 = { string: { unit: "\u178F\u17BD\u17A2\u1780\u17D2\u179F\u179A", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }, file: { unit: "\u1794\u17C3", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }, array: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }, set: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B", email: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B", url: "URL", emoji: "\u179F\u1789\u17D2\u1789\u17B6\u17A2\u17B6\u179A\u1798\u17D2\u1798\u178E\u17CD", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 \u1793\u17B7\u1784\u1798\u17C9\u17C4\u1784 ISO", date: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 ISO", time: "\u1798\u17C9\u17C4\u1784 ISO", duration: "\u179A\u1799\u17C8\u1796\u17C1\u179B ISO", ipv4: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4", ipv6: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6", cidrv4: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4", cidrv6: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6", base64: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64", base64url: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64url", json_string: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A JSON", e164: "\u179B\u17C1\u1781 E.164", jwt: "JWT", template_literal: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B" }, r21 = { nan: "NaN", number: "\u179B\u17C1\u1781", array: "\u17A2\u17B6\u179A\u17C1 (Array)", null: "\u1782\u17D2\u1798\u17B6\u1793\u178F\u1798\u17D2\u179B\u17C3 (null)" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A instanceof ${e8.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${i20}` : `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${t10} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${w12(e8.values[0])}` : `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${e8.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${t10} ${e8.maximum.toString()} ${n18.unit ?? "\u1792\u17B6\u178F\u17BB"}` : `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${e8.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${t10} ${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${e8.origin} ${t10} ${e8.minimum.toString()} ${n18.unit}` : `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${e8.origin} ${t10} ${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${t10.prefix}"` : t10.format === "ends_with" ? `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${t10.suffix}"` : t10.format === "includes" ? `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${t10.includes}"` : t10.format === "regex" ? `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${t10.pattern}` : `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${e8.divisor}`;
      case "unrecognized_keys":
        return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${e8.origin}`;
      case "invalid_union":
        return "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C";
      case "invalid_element":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${e8.origin}`;
      default:
        return "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C";
    }
  };
};
function ce6() {
  return { localeError: lt3() };
}
function ut3() {
  return ce6();
}
var dt3 = () => {
  let o21 = { string: { unit: "\uBB38\uC790", verb: "to have" }, file: { unit: "\uBC14\uC774\uD2B8", verb: "to have" }, array: { unit: "\uAC1C", verb: "to have" }, set: { unit: "\uAC1C", verb: "to have" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\uC785\uB825", email: "\uC774\uBA54\uC77C \uC8FC\uC18C", url: "URL", emoji: "\uC774\uBAA8\uC9C0", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \uB0A0\uC9DC\uC2DC\uAC04", date: "ISO \uB0A0\uC9DC", time: "ISO \uC2DC\uAC04", duration: "ISO \uAE30\uAC04", ipv4: "IPv4 \uC8FC\uC18C", ipv6: "IPv6 \uC8FC\uC18C", cidrv4: "IPv4 \uBC94\uC704", cidrv6: "IPv6 \uBC94\uC704", base64: "base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4", base64url: "base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4", json_string: "JSON \uBB38\uC790\uC5F4", e164: "E.164 \uBC88\uD638", jwt: "JWT", template_literal: "\uC785\uB825" }, r21 = { nan: "NaN" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 instanceof ${e8.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${i20}\uC785\uB2C8\uB2E4` : `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${t10}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${i20}\uC785\uB2C8\uB2E4`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${w12(e8.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4` : `\uC798\uBABB\uB41C \uC635\uC158: ${S7(e8.values, "\uB610\uB294 ")} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "too_big": {
        let t10 = e8.inclusive ? "\uC774\uD558" : "\uBBF8\uB9CC", n18 = t10 === "\uBBF8\uB9CC" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4", i20 = a16(e8.origin), c19 = i20?.unit ?? "\uC694\uC18C";
        return i20 ? `${e8.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${e8.maximum.toString()}${c19} ${t10}${n18}` : `${e8.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${e8.maximum.toString()} ${t10}${n18}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? "\uC774\uC0C1" : "\uCD08\uACFC", n18 = t10 === "\uC774\uC0C1" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4", i20 = a16(e8.origin), c19 = i20?.unit ?? "\uC694\uC18C";
        return i20 ? `${e8.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${e8.minimum.toString()}${c19} ${t10}${n18}` : `${e8.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${e8.minimum.toString()} ${t10}${n18}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${t10.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4` : t10.format === "ends_with" ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${t10.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4` : t10.format === "includes" ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${t10.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4` : t10.format === "regex" ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${t10.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4` : `\uC798\uBABB\uB41C ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\uC798\uBABB\uB41C \uC22B\uC790: ${e8.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "unrecognized_keys":
        return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\uC798\uBABB\uB41C \uD0A4: ${e8.origin}`;
      case "invalid_union":
        return "\uC798\uBABB\uB41C \uC785\uB825";
      case "invalid_element":
        return `\uC798\uBABB\uB41C \uAC12: ${e8.origin}`;
      default:
        return "\uC798\uBABB\uB41C \uC785\uB825";
    }
  };
};
function ct3() {
  return { localeError: dt3() };
}
var ue6 = (o21) => o21.charAt(0).toUpperCase() + o21.slice(1);
function fe6(o21) {
  let a16 = Math.abs(o21), l19 = a16 % 10, r21 = a16 % 100;
  return r21 >= 11 && r21 <= 19 || l19 === 0 ? "many" : l19 === 1 ? "one" : "few";
}
var mt3 = () => {
  let o21 = { string: { unit: { one: "simbolis", few: "simboliai", many: "simboli\u0173" }, verb: { smaller: { inclusive: "turi b\u016Bti ne ilgesn\u0117 kaip", notInclusive: "turi b\u016Bti trumpesn\u0117 kaip" }, bigger: { inclusive: "turi b\u016Bti ne trumpesn\u0117 kaip", notInclusive: "turi b\u016Bti ilgesn\u0117 kaip" } } }, file: { unit: { one: "baitas", few: "baitai", many: "bait\u0173" }, verb: { smaller: { inclusive: "turi b\u016Bti ne didesnis kaip", notInclusive: "turi b\u016Bti ma\u017Eesnis kaip" }, bigger: { inclusive: "turi b\u016Bti ne ma\u017Eesnis kaip", notInclusive: "turi b\u016Bti didesnis kaip" } } }, array: { unit: { one: "element\u0105", few: "elementus", many: "element\u0173" }, verb: { smaller: { inclusive: "turi tur\u0117ti ne daugiau kaip", notInclusive: "turi tur\u0117ti ma\u017Eiau kaip" }, bigger: { inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip", notInclusive: "turi tur\u0117ti daugiau kaip" } } }, set: { unit: { one: "element\u0105", few: "elementus", many: "element\u0173" }, verb: { smaller: { inclusive: "turi tur\u0117ti ne daugiau kaip", notInclusive: "turi tur\u0117ti ma\u017Eiau kaip" }, bigger: { inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip", notInclusive: "turi tur\u0117ti daugiau kaip" } } } };
  function a16(e8, t10, n18, i20) {
    let c19 = o21[e8] ?? null;
    return c19 === null ? c19 : { unit: c19.unit[t10], verb: c19.verb[i20][n18 ? "inclusive" : "notInclusive"] };
  }
  let l19 = { regex: "\u012Fvestis", email: "el. pa\u0161to adresas", url: "URL", emoji: "jaustukas", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO data ir laikas", date: "ISO data", time: "ISO laikas", duration: "ISO trukm\u0117", ipv4: "IPv4 adresas", ipv6: "IPv6 adresas", cidrv4: "IPv4 tinklo prefiksas (CIDR)", cidrv6: "IPv6 tinklo prefiksas (CIDR)", base64: "base64 u\u017Ekoduota eilut\u0117", base64url: "base64url u\u017Ekoduota eilut\u0117", json_string: "JSON eilut\u0117", e164: "E.164 numeris", jwt: "JWT", template_literal: "\u012Fvestis" }, r21 = { nan: "NaN", number: "skai\u010Dius", bigint: "sveikasis skai\u010Dius", string: "eilut\u0117", boolean: "login\u0117 reik\u0161m\u0117", undefined: "neapibr\u0117\u017Eta reik\u0161m\u0117", function: "funkcija", symbol: "simbolis", array: "masyvas", object: "objektas", null: "nulin\u0117 reik\u0161m\u0117" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Gautas tipas ${i20}, o tik\u0117tasi - instanceof ${e8.expected}` : `Gautas tipas ${i20}, o tik\u0117tasi - ${t10}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Privalo b\u016Bti ${w12(e8.values[0])}` : `Privalo b\u016Bti vienas i\u0161 ${S7(e8.values, "|")} pasirinkim\u0173`;
      case "too_big": {
        let t10 = r21[e8.origin] ?? e8.origin, n18 = a16(e8.origin, fe6(Number(e8.maximum)), e8.inclusive ?? false, "smaller");
        if (n18?.verb) return `${ue6(t10 ?? e8.origin ?? "reik\u0161m\u0117")} ${n18.verb} ${e8.maximum.toString()} ${n18.unit ?? "element\u0173"}`;
        let i20 = e8.inclusive ? "ne didesnis kaip" : "ma\u017Eesnis kaip";
        return `${ue6(t10 ?? e8.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${i20} ${e8.maximum.toString()} ${n18?.unit}`;
      }
      case "too_small": {
        let t10 = r21[e8.origin] ?? e8.origin, n18 = a16(e8.origin, fe6(Number(e8.minimum)), e8.inclusive ?? false, "bigger");
        if (n18?.verb) return `${ue6(t10 ?? e8.origin ?? "reik\u0161m\u0117")} ${n18.verb} ${e8.minimum.toString()} ${n18.unit ?? "element\u0173"}`;
        let i20 = e8.inclusive ? "ne ma\u017Eesnis kaip" : "didesnis kaip";
        return `${ue6(t10 ?? e8.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${i20} ${e8.minimum.toString()} ${n18?.unit}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Eilut\u0117 privalo prasid\u0117ti "${t10.prefix}"` : t10.format === "ends_with" ? `Eilut\u0117 privalo pasibaigti "${t10.suffix}"` : t10.format === "includes" ? `Eilut\u0117 privalo \u012Ftraukti "${t10.includes}"` : t10.format === "regex" ? `Eilut\u0117 privalo atitikti ${t10.pattern}` : `Neteisingas ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Skai\u010Dius privalo b\u016Bti ${e8.divisor} kartotinis.`;
      case "unrecognized_keys":
        return `Neatpa\u017Eint${e8.keys.length > 1 ? "i" : "as"} rakt${e8.keys.length > 1 ? "ai" : "as"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return "Rastas klaidingas raktas";
      case "invalid_union":
        return "Klaidinga \u012Fvestis";
      case "invalid_element": {
        let t10 = r21[e8.origin] ?? e8.origin;
        return `${ue6(t10 ?? e8.origin ?? "reik\u0161m\u0117")} turi klaiding\u0105 \u012Fvest\u012F`;
      }
      default:
        return "Klaidinga \u012Fvestis";
    }
  };
};
function vt3() {
  return { localeError: mt3() };
}
var gt3 = () => {
  let o21 = { string: { unit: "\u0437\u043D\u0430\u0446\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }, file: { unit: "\u0431\u0430\u0458\u0442\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }, array: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }, set: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0432\u043D\u0435\u0441", email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0435-\u043F\u043E\u0448\u0442\u0430", url: "URL", emoji: "\u0435\u043C\u043E\u045F\u0438", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0434\u0430\u0442\u0443\u043C \u0438 \u0432\u0440\u0435\u043C\u0435", date: "ISO \u0434\u0430\u0442\u0443\u043C", time: "ISO \u0432\u0440\u0435\u043C\u0435", duration: "ISO \u0432\u0440\u0435\u043C\u0435\u0442\u0440\u0430\u0435\u045A\u0435", ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441\u0430", ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441\u0430", cidrv4: "IPv4 \u043E\u043F\u0441\u0435\u0433", cidrv6: "IPv6 \u043E\u043F\u0441\u0435\u0433", base64: "base64-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430", base64url: "base64url-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430", json_string: "JSON \u043D\u0438\u0437\u0430", e164: "E.164 \u0431\u0440\u043E\u0458", jwt: "JWT", template_literal: "\u0432\u043D\u0435\u0441" }, r21 = { nan: "NaN", number: "\u0431\u0440\u043E\u0458", array: "\u043D\u0438\u0437\u0430" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 instanceof ${e8.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${i20}` : `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${t10}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Invalid input: expected ${w12(e8.values[0])}` : `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${e8.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0438\u043C\u0430 ${t10}${e8.maximum.toString()} ${n18.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438"}` : `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${e8.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0431\u0438\u0434\u0435 ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${e8.origin} \u0434\u0430 \u0438\u043C\u0430 ${t10}${e8.minimum.toString()} ${n18.unit}` : `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${e8.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${t10.prefix}"` : t10.format === "ends_with" ? `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${t10.suffix}"` : t10.format === "includes" ? `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${t10.includes}"` : t10.format === "regex" ? `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${t10.pattern}` : `Invalid ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${e8.divisor}`;
      case "unrecognized_keys":
        return `${e8.keys.length > 1 ? "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D\u0438 \u043A\u043B\u0443\u0447\u0435\u0432\u0438" : "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D \u043A\u043B\u0443\u0447"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${e8.origin}`;
      case "invalid_union":
        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
      case "invalid_element":
        return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${e8.origin}`;
      default:
        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
    }
  };
};
function ft3() {
  return { localeError: gt3() };
}
var $t2 = () => {
  let o21 = { string: { unit: "aksara", verb: "mempunyai" }, file: { unit: "bait", verb: "mempunyai" }, array: { unit: "elemen", verb: "mempunyai" }, set: { unit: "elemen", verb: "mempunyai" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "input", email: "alamat e-mel", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "tarikh masa ISO", date: "tarikh ISO", time: "masa ISO", duration: "tempoh ISO", ipv4: "alamat IPv4", ipv6: "alamat IPv6", cidrv4: "julat IPv4", cidrv6: "julat IPv6", base64: "string dikodkan base64", base64url: "string dikodkan base64url", json_string: "string JSON", e164: "nombor E.164", jwt: "JWT", template_literal: "input" }, r21 = { nan: "NaN", number: "nombor" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Input tidak sah: dijangka instanceof ${e8.expected}, diterima ${i20}` : `Input tidak sah: dijangka ${t10}, diterima ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Input tidak sah: dijangka ${w12(e8.values[0])}` : `Pilihan tidak sah: dijangka salah satu daripada ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Terlalu besar: dijangka ${e8.origin ?? "nilai"} ${n18.verb} ${t10}${e8.maximum.toString()} ${n18.unit ?? "elemen"}` : `Terlalu besar: dijangka ${e8.origin ?? "nilai"} adalah ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Terlalu kecil: dijangka ${e8.origin} ${n18.verb} ${t10}${e8.minimum.toString()} ${n18.unit}` : `Terlalu kecil: dijangka ${e8.origin} adalah ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `String tidak sah: mesti bermula dengan "${t10.prefix}"` : t10.format === "ends_with" ? `String tidak sah: mesti berakhir dengan "${t10.suffix}"` : t10.format === "includes" ? `String tidak sah: mesti mengandungi "${t10.includes}"` : t10.format === "regex" ? `String tidak sah: mesti sepadan dengan corak ${t10.pattern}` : `${l19[t10.format] ?? e8.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${e8.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${e8.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${e8.origin}`;
      default:
        return "Input tidak sah";
    }
  };
};
function pt2() {
  return { localeError: $t2() };
}
var st2 = () => {
  let o21 = { string: { unit: "tekens", verb: "heeft" }, file: { unit: "bytes", verb: "heeft" }, array: { unit: "elementen", verb: "heeft" }, set: { unit: "elementen", verb: "heeft" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "invoer", email: "emailadres", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datum en tijd", date: "ISO datum", time: "ISO tijd", duration: "ISO duur", ipv4: "IPv4-adres", ipv6: "IPv6-adres", cidrv4: "IPv4-bereik", cidrv6: "IPv6-bereik", base64: "base64-gecodeerde tekst", base64url: "base64 URL-gecodeerde tekst", json_string: "JSON string", e164: "E.164-nummer", jwt: "JWT", template_literal: "invoer" }, r21 = { nan: "NaN", number: "getal" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Ongeldige invoer: verwacht instanceof ${e8.expected}, ontving ${i20}` : `Ongeldige invoer: verwacht ${t10}, ontving ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Ongeldige invoer: verwacht ${w12(e8.values[0])}` : `Ongeldige optie: verwacht \xE9\xE9n van ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin), i20 = e8.origin === "date" ? "laat" : e8.origin === "string" ? "lang" : "groot";
        return n18 ? `Te ${i20}: verwacht dat ${e8.origin ?? "waarde"} ${t10}${e8.maximum.toString()} ${n18.unit ?? "elementen"} ${n18.verb}` : `Te ${i20}: verwacht dat ${e8.origin ?? "waarde"} ${t10}${e8.maximum.toString()} is`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin), i20 = e8.origin === "date" ? "vroeg" : e8.origin === "string" ? "kort" : "klein";
        return n18 ? `Te ${i20}: verwacht dat ${e8.origin} ${t10}${e8.minimum.toString()} ${n18.unit} ${n18.verb}` : `Te ${i20}: verwacht dat ${e8.origin} ${t10}${e8.minimum.toString()} is`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Ongeldige tekst: moet met "${t10.prefix}" beginnen` : t10.format === "ends_with" ? `Ongeldige tekst: moet op "${t10.suffix}" eindigen` : t10.format === "includes" ? `Ongeldige tekst: moet "${t10.includes}" bevatten` : t10.format === "regex" ? `Ongeldige tekst: moet overeenkomen met patroon ${t10.pattern}` : `Ongeldig: ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${e8.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${e8.keys.length > 1 ? "s" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${e8.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${e8.origin}`;
      default:
        return "Ongeldige invoer";
    }
  };
};
function bt3() {
  return { localeError: st2() };
}
var yt3 = () => {
  let o21 = { string: { unit: "tegn", verb: "\xE5 ha" }, file: { unit: "bytes", verb: "\xE5 ha" }, array: { unit: "elementer", verb: "\xE5 inneholde" }, set: { unit: "elementer", verb: "\xE5 inneholde" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "input", email: "e-postadresse", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO dato- og klokkeslett", date: "ISO-dato", time: "ISO-klokkeslett", duration: "ISO-varighet", ipv4: "IPv4-omr\xE5de", ipv6: "IPv6-omr\xE5de", cidrv4: "IPv4-spekter", cidrv6: "IPv6-spekter", base64: "base64-enkodet streng", base64url: "base64url-enkodet streng", json_string: "JSON-streng", e164: "E.164-nummer", jwt: "JWT", template_literal: "input" }, r21 = { nan: "NaN", number: "tall", array: "liste" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Ugyldig input: forventet instanceof ${e8.expected}, fikk ${i20}` : `Ugyldig input: forventet ${t10}, fikk ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Ugyldig verdi: forventet ${w12(e8.values[0])}` : `Ugyldig valg: forventet en av ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `For stor(t): forventet ${e8.origin ?? "value"} til \xE5 ha ${t10}${e8.maximum.toString()} ${n18.unit ?? "elementer"}` : `For stor(t): forventet ${e8.origin ?? "value"} til \xE5 ha ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `For lite(n): forventet ${e8.origin} til \xE5 ha ${t10}${e8.minimum.toString()} ${n18.unit}` : `For lite(n): forventet ${e8.origin} til \xE5 ha ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Ugyldig streng: m\xE5 starte med "${t10.prefix}"` : t10.format === "ends_with" ? `Ugyldig streng: m\xE5 ende med "${t10.suffix}"` : t10.format === "includes" ? `Ugyldig streng: m\xE5 inneholde "${t10.includes}"` : t10.format === "regex" ? `Ugyldig streng: m\xE5 matche m\xF8nsteret ${t10.pattern}` : `Ugyldig ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${e8.divisor}`;
      case "unrecognized_keys":
        return `${e8.keys.length > 1 ? "Ukjente n\xF8kler" : "Ukjent n\xF8kkel"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8kkel i ${e8.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${e8.origin}`;
      default:
        return "Ugyldig input";
    }
  };
};
function _t3() {
  return { localeError: yt3() };
}
var kt3 = () => {
  let o21 = { string: { unit: "harf", verb: "olmal\u0131d\u0131r" }, file: { unit: "bayt", verb: "olmal\u0131d\u0131r" }, array: { unit: "unsur", verb: "olmal\u0131d\u0131r" }, set: { unit: "unsur", verb: "olmal\u0131d\u0131r" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "giren", email: "epostag\xE2h", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO heng\xE2m\u0131", date: "ISO tarihi", time: "ISO zaman\u0131", duration: "ISO m\xFCddeti", ipv4: "IPv4 ni\u015F\xE2n\u0131", ipv6: "IPv6 ni\u015F\xE2n\u0131", cidrv4: "IPv4 menzili", cidrv6: "IPv6 menzili", base64: "base64-\u015Fifreli metin", base64url: "base64url-\u015Fifreli metin", json_string: "JSON metin", e164: "E.164 say\u0131s\u0131", jwt: "JWT", template_literal: "giren" }, r21 = { nan: "NaN", number: "numara", array: "saf", null: "gayb" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `F\xE2sit giren: umulan instanceof ${e8.expected}, al\u0131nan ${i20}` : `F\xE2sit giren: umulan ${t10}, al\u0131nan ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `F\xE2sit giren: umulan ${w12(e8.values[0])}` : `F\xE2sit tercih: m\xFBteberler ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Fazla b\xFCy\xFCk: ${e8.origin ?? "value"}, ${t10}${e8.maximum.toString()} ${n18.unit ?? "elements"} sahip olmal\u0131yd\u0131.` : `Fazla b\xFCy\xFCk: ${e8.origin ?? "value"}, ${t10}${e8.maximum.toString()} olmal\u0131yd\u0131.`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Fazla k\xFC\xE7\xFCk: ${e8.origin}, ${t10}${e8.minimum.toString()} ${n18.unit} sahip olmal\u0131yd\u0131.` : `Fazla k\xFC\xE7\xFCk: ${e8.origin}, ${t10}${e8.minimum.toString()} olmal\u0131yd\u0131.`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `F\xE2sit metin: "${t10.prefix}" ile ba\u015Flamal\u0131.` : t10.format === "ends_with" ? `F\xE2sit metin: "${t10.suffix}" ile bitmeli.` : t10.format === "includes" ? `F\xE2sit metin: "${t10.includes}" ihtiv\xE2 etmeli.` : t10.format === "regex" ? `F\xE2sit metin: ${t10.pattern} nak\u015F\u0131na uymal\u0131.` : `F\xE2sit ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `F\xE2sit say\u0131: ${e8.divisor} kat\u0131 olmal\u0131yd\u0131.`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar ${e8.keys.length > 1 ? "s" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `${e8.origin} i\xE7in tan\u0131nmayan anahtar var.`;
      case "invalid_union":
        return "Giren tan\u0131namad\u0131.";
      case "invalid_element":
        return `${e8.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
      default:
        return "K\u0131ymet tan\u0131namad\u0131.";
    }
  };
};
function It2() {
  return { localeError: kt3() };
}
var xt2 = () => {
  let o21 = { string: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }, file: { unit: "\u0628\u0627\u06CC\u067C\u0633", verb: "\u0648\u0644\u0631\u064A" }, array: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }, set: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0648\u0631\u0648\u062F\u064A", email: "\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9", url: "\u06CC\u0648 \u0622\u0631 \u0627\u0644", emoji: "\u0627\u06CC\u0645\u0648\u062C\u064A", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A", date: "\u0646\u06D0\u067C\u0647", time: "\u0648\u062E\u062A", duration: "\u0645\u0648\u062F\u0647", ipv4: "\u062F IPv4 \u067E\u062A\u0647", ipv6: "\u062F IPv6 \u067E\u062A\u0647", cidrv4: "\u062F IPv4 \u0633\u0627\u062D\u0647", cidrv6: "\u062F IPv6 \u0633\u0627\u062D\u0647", base64: "base64-encoded \u0645\u062A\u0646", base64url: "base64url-encoded \u0645\u062A\u0646", json_string: "JSON \u0645\u062A\u0646", e164: "\u062F E.164 \u0634\u0645\u06D0\u0631\u0647", jwt: "JWT", template_literal: "\u0648\u0631\u0648\u062F\u064A" }, r21 = { nan: "NaN", number: "\u0639\u062F\u062F", array: "\u0627\u0631\u06D0" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F instanceof ${e8.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${i20} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648` : `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${t10} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${i20} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${w12(e8.values[0])} \u0648\u0627\u06CC` : `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${S7(e8.values, "|")} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${e8.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${t10}${e8.maximum.toString()} ${n18.unit ?? "\u0639\u0646\u0635\u0631\u0648\u0646\u0647"} \u0648\u0644\u0631\u064A` : `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${e8.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${t10}${e8.maximum.toString()} \u0648\u064A`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${e8.origin} \u0628\u0627\u06CC\u062F ${t10}${e8.minimum.toString()} ${n18.unit} \u0648\u0644\u0631\u064A` : `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${e8.origin} \u0628\u0627\u06CC\u062F ${t10}${e8.minimum.toString()} \u0648\u064A`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${t10.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A` : t10.format === "ends_with" ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${t10.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A` : t10.format === "includes" ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${t10.includes}" \u0648\u0644\u0631\u064A` : t10.format === "regex" ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${t10.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A` : `${l19[t10.format] ?? e8.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
      }
      case "not_multiple_of":
        return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${e8.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
      case "unrecognized_keys":
        return `\u0646\u0627\u0633\u0645 ${e8.keys.length > 1 ? "\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647" : "\u06A9\u0644\u06CC\u0689"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${e8.origin} \u06A9\u06D0`;
      case "invalid_union":
        return "\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A";
      case "invalid_element":
        return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${e8.origin} \u06A9\u06D0`;
      default:
        return "\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A";
    }
  };
};
function St2() {
  return { localeError: xt2() };
}
var ht2 = () => {
  let o21 = { string: { unit: "znak\xF3w", verb: "mie\u0107" }, file: { unit: "bajt\xF3w", verb: "mie\u0107" }, array: { unit: "element\xF3w", verb: "mie\u0107" }, set: { unit: "element\xF3w", verb: "mie\u0107" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "wyra\u017Cenie", email: "adres email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "data i godzina w formacie ISO", date: "data w formacie ISO", time: "godzina w formacie ISO", duration: "czas trwania ISO", ipv4: "adres IPv4", ipv6: "adres IPv6", cidrv4: "zakres IPv4", cidrv6: "zakres IPv6", base64: "ci\u0105g znak\xF3w zakodowany w formacie base64", base64url: "ci\u0105g znak\xF3w zakodowany w formacie base64url", json_string: "ci\u0105g znak\xF3w w formacie JSON", e164: "liczba E.164", jwt: "JWT", template_literal: "wej\u015Bcie" }, r21 = { nan: "NaN", number: "liczba", array: "tablica" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano instanceof ${e8.expected}, otrzymano ${i20}` : `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${t10}, otrzymano ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${w12(e8.values[0])}` : `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${e8.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${t10}${e8.maximum.toString()} ${n18.unit ?? "element\xF3w"}` : `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${e8.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${e8.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${t10}${e8.minimum.toString()} ${n18.unit ?? "element\xF3w"}` : `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${e8.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${t10.prefix}"` : t10.format === "ends_with" ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${t10.suffix}"` : t10.format === "includes" ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${t10.includes}"` : t10.format === "regex" ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${t10.pattern}` : `Nieprawid\u0142ow(y/a/e) ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${e8.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${e8.keys.length > 1 ? "s" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawid\u0142owy klucz w ${e8.origin}`;
      case "invalid_union":
        return "Nieprawid\u0142owe dane wej\u015Bciowe";
      case "invalid_element":
        return `Nieprawid\u0142owa warto\u015B\u0107 w ${e8.origin}`;
      default:
        return "Nieprawid\u0142owe dane wej\u015Bciowe";
    }
  };
};
function Ut2() {
  return { localeError: ht2() };
}
var jt = () => {
  let o21 = { string: { unit: "caracteres", verb: "ter" }, file: { unit: "bytes", verb: "ter" }, array: { unit: "itens", verb: "ter" }, set: { unit: "itens", verb: "ter" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "padr\xE3o", email: "endere\xE7o de e-mail", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "data e hora ISO", date: "data ISO", time: "hora ISO", duration: "dura\xE7\xE3o ISO", ipv4: "endere\xE7o IPv4", ipv6: "endere\xE7o IPv6", cidrv4: "faixa de IPv4", cidrv6: "faixa de IPv6", base64: "texto codificado em base64", base64url: "URL codificada em base64", json_string: "texto JSON", e164: "n\xFAmero E.164", jwt: "JWT", template_literal: "entrada" }, r21 = { nan: "NaN", number: "n\xFAmero", null: "nulo" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Tipo inv\xE1lido: esperado instanceof ${e8.expected}, recebido ${i20}` : `Tipo inv\xE1lido: esperado ${t10}, recebido ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Entrada inv\xE1lida: esperado ${w12(e8.values[0])}` : `Op\xE7\xE3o inv\xE1lida: esperada uma das ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Muito grande: esperado que ${e8.origin ?? "valor"} tivesse ${t10}${e8.maximum.toString()} ${n18.unit ?? "elementos"}` : `Muito grande: esperado que ${e8.origin ?? "valor"} fosse ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Muito pequeno: esperado que ${e8.origin} tivesse ${t10}${e8.minimum.toString()} ${n18.unit}` : `Muito pequeno: esperado que ${e8.origin} fosse ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Texto inv\xE1lido: deve come\xE7ar com "${t10.prefix}"` : t10.format === "ends_with" ? `Texto inv\xE1lido: deve terminar com "${t10.suffix}"` : t10.format === "includes" ? `Texto inv\xE1lido: deve incluir "${t10.includes}"` : t10.format === "regex" ? `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${t10.pattern}` : `${l19[t10.format] ?? e8.format} inv\xE1lido`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${e8.divisor}`;
      case "unrecognized_keys":
        return `Chave${e8.keys.length > 1 ? "s" : ""} desconhecida${e8.keys.length > 1 ? "s" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Chave inv\xE1lida em ${e8.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido em ${e8.origin}`;
      default:
        return "Campo inv\xE1lido";
    }
  };
};
function Dt2() {
  return { localeError: jt() };
}
function $e3(o21, a16, l19, r21) {
  let e8 = Math.abs(o21), t10 = e8 % 10, n18 = e8 % 100;
  return n18 >= 11 && n18 <= 19 ? r21 : t10 === 1 ? a16 : t10 >= 2 && t10 <= 4 ? l19 : r21;
}
var zt = () => {
  let o21 = { string: { unit: { one: "\u0441\u0438\u043C\u0432\u043E\u043B", few: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", many: "\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432" }, verb: "\u0438\u043C\u0435\u0442\u044C" }, file: { unit: { one: "\u0431\u0430\u0439\u0442", few: "\u0431\u0430\u0439\u0442\u0430", many: "\u0431\u0430\u0439\u0442" }, verb: "\u0438\u043C\u0435\u0442\u044C" }, array: { unit: { one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442", few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430", many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432" }, verb: "\u0438\u043C\u0435\u0442\u044C" }, set: { unit: { one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442", few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430", many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432" }, verb: "\u0438\u043C\u0435\u0442\u044C" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0432\u0432\u043E\u0434", email: "email \u0430\u0434\u0440\u0435\u0441", url: "URL", emoji: "\u044D\u043C\u043E\u0434\u0437\u0438", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F", date: "ISO \u0434\u0430\u0442\u0430", time: "ISO \u0432\u0440\u0435\u043C\u044F", duration: "ISO \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C", ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441", ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441", cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D", cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D", base64: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64", base64url: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64url", json_string: "JSON \u0441\u0442\u0440\u043E\u043A\u0430", e164: "\u043D\u043E\u043C\u0435\u0440 E.164", jwt: "JWT", template_literal: "\u0432\u0432\u043E\u0434" }, r21 = { nan: "NaN", number: "\u0447\u0438\u0441\u043B\u043E", array: "\u043C\u0430\u0441\u0441\u0438\u0432" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C instanceof ${e8.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${i20}` : `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${t10}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${w12(e8.values[0])}` : `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        if (n18) {
          let i20 = Number(e8.maximum), c19 = $e3(i20, n18.unit.one, n18.unit.few, n18.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${e8.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${t10}${e8.maximum.toString()} ${c19}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${e8.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        if (n18) {
          let i20 = Number(e8.minimum), c19 = $e3(i20, n18.unit.one, n18.unit.few, n18.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${e8.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${t10}${e8.minimum.toString()} ${c19}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${e8.origin} \u0431\u0443\u0434\u0435\u0442 ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${t10.prefix}"` : t10.format === "ends_with" ? `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${t10.suffix}"` : t10.format === "includes" ? `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${t10.includes}"` : t10.format === "regex" ? `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${t10.pattern}` : `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${e8.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${e8.keys.length > 1 ? "\u044B\u0435" : "\u044B\u0439"} \u043A\u043B\u044E\u0447${e8.keys.length > 1 ? "\u0438" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${e8.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${e8.origin}`;
      default:
        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
    }
  };
};
function wt3() {
  return { localeError: zt() };
}
var Ot2 = () => {
  let o21 = { string: { unit: "znakov", verb: "imeti" }, file: { unit: "bajtov", verb: "imeti" }, array: { unit: "elementov", verb: "imeti" }, set: { unit: "elementov", verb: "imeti" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "vnos", email: "e-po\u0161tni naslov", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datum in \u010Das", date: "ISO datum", time: "ISO \u010Das", duration: "ISO trajanje", ipv4: "IPv4 naslov", ipv6: "IPv6 naslov", cidrv4: "obseg IPv4", cidrv6: "obseg IPv6", base64: "base64 kodiran niz", base64url: "base64url kodiran niz", json_string: "JSON niz", e164: "E.164 \u0161tevilka", jwt: "JWT", template_literal: "vnos" }, r21 = { nan: "NaN", number: "\u0161tevilo", array: "tabela" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Neveljaven vnos: pri\u010Dakovano instanceof ${e8.expected}, prejeto ${i20}` : `Neveljaven vnos: pri\u010Dakovano ${t10}, prejeto ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Neveljaven vnos: pri\u010Dakovano ${w12(e8.values[0])}` : `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Preveliko: pri\u010Dakovano, da bo ${e8.origin ?? "vrednost"} imelo ${t10}${e8.maximum.toString()} ${n18.unit ?? "elementov"}` : `Preveliko: pri\u010Dakovano, da bo ${e8.origin ?? "vrednost"} ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Premajhno: pri\u010Dakovano, da bo ${e8.origin} imelo ${t10}${e8.minimum.toString()} ${n18.unit}` : `Premajhno: pri\u010Dakovano, da bo ${e8.origin} ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Neveljaven niz: mora se za\u010Deti z "${t10.prefix}"` : t10.format === "ends_with" ? `Neveljaven niz: mora se kon\u010Dati z "${t10.suffix}"` : t10.format === "includes" ? `Neveljaven niz: mora vsebovati "${t10.includes}"` : t10.format === "regex" ? `Neveljaven niz: mora ustrezati vzorcu ${t10.pattern}` : `Neveljaven ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${e8.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${e8.keys.length > 1 ? "i klju\u010Di" : " klju\u010D"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven klju\u010D v ${e8.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${e8.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function Pt3() {
  return { localeError: Ot2() };
}
var Nt2 = () => {
  let o21 = { string: { unit: "tecken", verb: "att ha" }, file: { unit: "bytes", verb: "att ha" }, array: { unit: "objekt", verb: "att inneh\xE5lla" }, set: { unit: "objekt", verb: "att inneh\xE5lla" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "regulj\xE4rt uttryck", email: "e-postadress", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO-datum och tid", date: "ISO-datum", time: "ISO-tid", duration: "ISO-varaktighet", ipv4: "IPv4-intervall", ipv6: "IPv6-intervall", cidrv4: "IPv4-spektrum", cidrv6: "IPv6-spektrum", base64: "base64-kodad str\xE4ng", base64url: "base64url-kodad str\xE4ng", json_string: "JSON-str\xE4ng", e164: "E.164-nummer", jwt: "JWT", template_literal: "mall-literal" }, r21 = { nan: "NaN", number: "antal", array: "lista" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Ogiltig inmatning: f\xF6rv\xE4ntat instanceof ${e8.expected}, fick ${i20}` : `Ogiltig inmatning: f\xF6rv\xE4ntat ${t10}, fick ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Ogiltig inmatning: f\xF6rv\xE4ntat ${w12(e8.values[0])}` : `Ogiltigt val: f\xF6rv\xE4ntade en av ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `F\xF6r stor(t): f\xF6rv\xE4ntade ${e8.origin ?? "v\xE4rdet"} att ha ${t10}${e8.maximum.toString()} ${n18.unit ?? "element"}` : `F\xF6r stor(t): f\xF6rv\xE4ntat ${e8.origin ?? "v\xE4rdet"} att ha ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `F\xF6r lite(t): f\xF6rv\xE4ntade ${e8.origin ?? "v\xE4rdet"} att ha ${t10}${e8.minimum.toString()} ${n18.unit}` : `F\xF6r lite(t): f\xF6rv\xE4ntade ${e8.origin ?? "v\xE4rdet"} att ha ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${t10.prefix}"` : t10.format === "ends_with" ? `Ogiltig str\xE4ng: m\xE5ste sluta med "${t10.suffix}"` : t10.format === "includes" ? `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${t10.includes}"` : t10.format === "regex" ? `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${t10.pattern}"` : `Ogiltig(t) ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: m\xE5ste vara en multipel av ${e8.divisor}`;
      case "unrecognized_keys":
        return `${e8.keys.length > 1 ? "Ok\xE4nda nycklar" : "Ok\xE4nd nyckel"}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${e8.origin ?? "v\xE4rdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt v\xE4rde i ${e8.origin ?? "v\xE4rdet"}`;
      default:
        return "Ogiltig input";
    }
  };
};
function Tt2() {
  return { localeError: Nt2() };
}
var Et3 = () => {
  let o21 = { string: { unit: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }, file: { unit: "\u0BAA\u0BC8\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }, array: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }, set: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1", email: "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0BA4\u0BC7\u0BA4\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD", date: "ISO \u0BA4\u0BC7\u0BA4\u0BBF", time: "ISO \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD", duration: "ISO \u0B95\u0BBE\u0BB2 \u0B85\u0BB3\u0BB5\u0BC1", ipv4: "IPv4 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF", ipv6: "IPv6 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF", cidrv4: "IPv4 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1", cidrv6: "IPv6 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1", base64: "base64-encoded \u0B9A\u0BB0\u0BAE\u0BCD", base64url: "base64url-encoded \u0B9A\u0BB0\u0BAE\u0BCD", json_string: "JSON \u0B9A\u0BB0\u0BAE\u0BCD", e164: "E.164 \u0B8E\u0BA3\u0BCD", jwt: "JWT", template_literal: "input" }, r21 = { nan: "NaN", number: "\u0B8E\u0BA3\u0BCD", array: "\u0B85\u0BA3\u0BBF", null: "\u0BB5\u0BC6\u0BB1\u0BC1\u0BAE\u0BC8" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 instanceof ${e8.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${i20}` : `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${t10}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${w12(e8.values[0])}` : `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${S7(e8.values, "|")} \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${e8.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${t10}${e8.maximum.toString()} ${n18.unit ?? "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD"} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD` : `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${e8.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${t10}${e8.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${e8.origin} ${t10}${e8.minimum.toString()} ${n18.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD` : `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${e8.origin} ${t10}${e8.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${t10.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD` : t10.format === "ends_with" ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${t10.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD` : t10.format === "includes" ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${t10.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD` : t10.format === "regex" ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${t10.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD` : `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${e8.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      case "unrecognized_keys":
        return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${e8.keys.length > 1 ? "\u0B95\u0BB3\u0BCD" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `${e8.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
      case "invalid_union":
        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
      case "invalid_element":
        return `${e8.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
      default:
        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
    }
  };
};
function Vt() {
  return { localeError: Et3() };
}
var Lt3 = () => {
  let o21 = { string: { unit: "\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }, file: { unit: "\u0E44\u0E1A\u0E15\u0E4C", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }, array: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }, set: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19", email: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E2D\u0E35\u0E40\u0E21\u0E25", url: "URL", emoji: "\u0E2D\u0E34\u0E42\u0E21\u0E08\u0E34", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO", date: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A ISO", time: "\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO", duration: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO", ipv4: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv4", ipv6: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv6", cidrv4: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv4", cidrv6: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv6", base64: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64", base64url: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A URL", json_string: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A JSON", e164: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 (E.164)", jwt: "\u0E42\u0E17\u0E40\u0E04\u0E19 JWT", template_literal: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19" }, r21 = { nan: "NaN", number: "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02", array: "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E23\u0E22\u0E4C (Array)", null: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32 (null)" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 instanceof ${e8.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${i20}` : `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${t10} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${w12(e8.values[0])}` : `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19" : "\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32", n18 = a16(e8.origin);
        return n18 ? `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${e8.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${t10} ${e8.maximum.toString()} ${n18.unit ?? "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"}` : `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${e8.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${t10} ${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? "\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22" : "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32", n18 = a16(e8.origin);
        return n18 ? `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${e8.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${t10} ${e8.minimum.toString()} ${n18.unit}` : `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${e8.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${t10} ${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${t10.prefix}"` : t10.format === "ends_with" ? `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${t10.suffix}"` : t10.format === "includes" ? `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${t10.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21` : t10.format === "regex" ? `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${t10.pattern}` : `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${e8.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
      case "unrecognized_keys":
        return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${e8.origin}`;
      case "invalid_union":
        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E22\u0E39\u0E40\u0E19\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E44\u0E27\u0E49";
      case "invalid_element":
        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${e8.origin}`;
      default:
        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07";
    }
  };
};
function Jt() {
  return { localeError: Lt3() };
}
var Ft = () => {
  let o21 = { string: { unit: "karakter", verb: "olmal\u0131" }, file: { unit: "bayt", verb: "olmal\u0131" }, array: { unit: "\xF6\u011Fe", verb: "olmal\u0131" }, set: { unit: "\xF6\u011Fe", verb: "olmal\u0131" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "girdi", email: "e-posta adresi", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO tarih ve saat", date: "ISO tarih", time: "ISO saat", duration: "ISO s\xFCre", ipv4: "IPv4 adresi", ipv6: "IPv6 adresi", cidrv4: "IPv4 aral\u0131\u011F\u0131", cidrv6: "IPv6 aral\u0131\u011F\u0131", base64: "base64 ile \u015Fifrelenmi\u015F metin", base64url: "base64url ile \u015Fifrelenmi\u015F metin", json_string: "JSON dizesi", e164: "E.164 say\u0131s\u0131", jwt: "JWT", template_literal: "\u015Eablon dizesi" }, r21 = { nan: "NaN" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Ge\xE7ersiz de\u011Fer: beklenen instanceof ${e8.expected}, al\u0131nan ${i20}` : `Ge\xE7ersiz de\u011Fer: beklenen ${t10}, al\u0131nan ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Ge\xE7ersiz de\u011Fer: beklenen ${w12(e8.values[0])}` : `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\xC7ok b\xFCy\xFCk: beklenen ${e8.origin ?? "de\u011Fer"} ${t10}${e8.maximum.toString()} ${n18.unit ?? "\xF6\u011Fe"}` : `\xC7ok b\xFCy\xFCk: beklenen ${e8.origin ?? "de\u011Fer"} ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\xC7ok k\xFC\xE7\xFCk: beklenen ${e8.origin} ${t10}${e8.minimum.toString()} ${n18.unit}` : `\xC7ok k\xFC\xE7\xFCk: beklenen ${e8.origin} ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Ge\xE7ersiz metin: "${t10.prefix}" ile ba\u015Flamal\u0131` : t10.format === "ends_with" ? `Ge\xE7ersiz metin: "${t10.suffix}" ile bitmeli` : t10.format === "includes" ? `Ge\xE7ersiz metin: "${t10.includes}" i\xE7ermeli` : t10.format === "regex" ? `Ge\xE7ersiz metin: ${t10.pattern} desenine uymal\u0131` : `Ge\xE7ersiz ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Ge\xE7ersiz say\u0131: ${e8.divisor} ile tam b\xF6l\xFCnebilmeli`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar${e8.keys.length > 1 ? "lar" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `${e8.origin} i\xE7inde ge\xE7ersiz anahtar`;
      case "invalid_union":
        return "Ge\xE7ersiz de\u011Fer";
      case "invalid_element":
        return `${e8.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
      default:
        return "Ge\xE7ersiz de\u011Fer";
    }
  };
};
function Gt() {
  return { localeError: Ft() };
}
var Rt2 = () => {
  let o21 = { string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }, file: { unit: "\u0431\u0430\u0439\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }, array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }, set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456", email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0457 \u043F\u043E\u0448\u0442\u0438", url: "URL", emoji: "\u0435\u043C\u043E\u0434\u0437\u0456", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u0434\u0430\u0442\u0430 \u0442\u0430 \u0447\u0430\u0441 ISO", date: "\u0434\u0430\u0442\u0430 ISO", time: "\u0447\u0430\u0441 ISO", duration: "\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C ISO", ipv4: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv4", ipv6: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv6", cidrv4: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv4", cidrv6: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv6", base64: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64", base64url: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64url", json_string: "\u0440\u044F\u0434\u043E\u043A JSON", e164: "\u043D\u043E\u043C\u0435\u0440 E.164", jwt: "JWT", template_literal: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456" }, r21 = { nan: "NaN", number: "\u0447\u0438\u0441\u043B\u043E", array: "\u043C\u0430\u0441\u0438\u0432" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F instanceof ${e8.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${i20}` : `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${t10}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${w12(e8.values[0])}` : `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${e8.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} ${n18.verb} ${t10}${e8.maximum.toString()} ${n18.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432"}` : `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${e8.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} \u0431\u0443\u0434\u0435 ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${e8.origin} ${n18.verb} ${t10}${e8.minimum.toString()} ${n18.unit}` : `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${e8.origin} \u0431\u0443\u0434\u0435 ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${t10.prefix}"` : t10.format === "ends_with" ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${t10.suffix}"` : t10.format === "includes" ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${t10.includes}"` : t10.format === "regex" ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${t10.pattern}` : `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${e8.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${e8.keys.length > 1 ? "\u0456" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${e8.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
      case "invalid_element":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${e8.origin}`;
      default:
        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
    }
  };
};
function me6() {
  return { localeError: Rt2() };
}
function At2() {
  return me6();
}
var Kt2 = () => {
  let o21 = { string: { unit: "\u062D\u0631\u0648\u0641", verb: "\u06C1\u0648\u0646\u0627" }, file: { unit: "\u0628\u0627\u0626\u0679\u0633", verb: "\u06C1\u0648\u0646\u0627" }, array: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" }, set: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0627\u0646 \u067E\u0679", email: "\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633", url: "\u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644", emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC", uuid: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC", uuidv4: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 4", uuidv6: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 6", nanoid: "\u0646\u06CC\u0646\u0648 \u0622\u0626\u06CC \u0688\u06CC", guid: "\u062C\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC", cuid: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC", cuid2: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC 2", ulid: "\u06CC\u0648 \u0627\u06CC\u0644 \u0622\u0626\u06CC \u0688\u06CC", xid: "\u0627\u06CC\u06A9\u0633 \u0622\u0626\u06CC \u0688\u06CC", ksuid: "\u06A9\u06D2 \u0627\u06CC\u0633 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC", datetime: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0688\u06CC\u0679 \u0679\u0627\u0626\u0645", date: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u062A\u0627\u0631\u06CC\u062E", time: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0648\u0642\u062A", duration: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0645\u062F\u062A", ipv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0627\u06CC\u0688\u0631\u06CC\u0633", ipv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0627\u06CC\u0688\u0631\u06CC\u0633", cidrv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0631\u06CC\u0646\u062C", cidrv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0631\u06CC\u0646\u062C", base64: "\u0628\u06CC\u0633 64 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF", base64url: "\u0628\u06CC\u0633 64 \u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF", json_string: "\u062C\u06D2 \u0627\u06CC\u0633 \u0627\u0648 \u0627\u06CC\u0646 \u0633\u0679\u0631\u0646\u06AF", e164: "\u0627\u06CC 164 \u0646\u0645\u0628\u0631", jwt: "\u062C\u06D2 \u0688\u0628\u0644\u06CC\u0648 \u0679\u06CC", template_literal: "\u0627\u0646 \u067E\u0679" }, r21 = { nan: "NaN", number: "\u0646\u0645\u0628\u0631", array: "\u0622\u0631\u06D2", null: "\u0646\u0644" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: instanceof ${e8.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${i20} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627` : `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${t10} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${i20} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${w12(e8.values[0])} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627` : `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${S7(e8.values, "|")} \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\u0628\u06C1\u062A \u0628\u0691\u0627: ${e8.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u06D2 ${t10}${e8.maximum.toString()} ${n18.unit ?? "\u0639\u0646\u0627\u0635\u0631"} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2` : `\u0628\u06C1\u062A \u0628\u0691\u0627: ${e8.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u0627 ${t10}${e8.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${e8.origin} \u06A9\u06D2 ${t10}${e8.minimum.toString()} ${n18.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2` : `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${e8.origin} \u06A9\u0627 ${t10}${e8.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${t10.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2` : t10.format === "ends_with" ? `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${t10.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2` : t10.format === "includes" ? `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${t10.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2` : t10.format === "regex" ? `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${t10.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2` : `\u063A\u0644\u0637 ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${e8.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
      case "unrecognized_keys":
        return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${e8.keys.length > 1 ? "\u0632" : ""}: ${S7(e8.keys, "\u060C ")}`;
      case "invalid_key":
        return `${e8.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
      case "invalid_union":
        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
      case "invalid_element":
        return `${e8.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
      default:
        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
    }
  };
};
function Zt() {
  return { localeError: Kt2() };
}
var Wt2 = () => {
  let o21 = { string: { unit: "belgi", verb: "bo\u2018lishi kerak" }, file: { unit: "bayt", verb: "bo\u2018lishi kerak" }, array: { unit: "element", verb: "bo\u2018lishi kerak" }, set: { unit: "element", verb: "bo\u2018lishi kerak" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "kirish", email: "elektron pochta manzili", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO sana va vaqti", date: "ISO sana", time: "ISO vaqt", duration: "ISO davomiylik", ipv4: "IPv4 manzil", ipv6: "IPv6 manzil", mac: "MAC manzil", cidrv4: "IPv4 diapazon", cidrv6: "IPv6 diapazon", base64: "base64 kodlangan satr", base64url: "base64url kodlangan satr", json_string: "JSON satr", e164: "E.164 raqam", jwt: "JWT", template_literal: "kirish" }, r21 = { nan: "NaN", number: "raqam", array: "massiv" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `Noto\u2018g\u2018ri kirish: kutilgan instanceof ${e8.expected}, qabul qilingan ${i20}` : `Noto\u2018g\u2018ri kirish: kutilgan ${t10}, qabul qilingan ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `Noto\u2018g\u2018ri kirish: kutilgan ${w12(e8.values[0])}` : `Noto\u2018g\u2018ri variant: quyidagilardan biri kutilgan ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Juda katta: kutilgan ${e8.origin ?? "qiymat"} ${t10}${e8.maximum.toString()} ${n18.unit} ${n18.verb}` : `Juda katta: kutilgan ${e8.origin ?? "qiymat"} ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Juda kichik: kutilgan ${e8.origin} ${t10}${e8.minimum.toString()} ${n18.unit} ${n18.verb}` : `Juda kichik: kutilgan ${e8.origin} ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Noto\u2018g\u2018ri satr: "${t10.prefix}" bilan boshlanishi kerak` : t10.format === "ends_with" ? `Noto\u2018g\u2018ri satr: "${t10.suffix}" bilan tugashi kerak` : t10.format === "includes" ? `Noto\u2018g\u2018ri satr: "${t10.includes}" ni o\u2018z ichiga olishi kerak` : t10.format === "regex" ? `Noto\u2018g\u2018ri satr: ${t10.pattern} shabloniga mos kelishi kerak` : `Noto\u2018g\u2018ri ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `Noto\u2018g\u2018ri raqam: ${e8.divisor} ning karralisi bo\u2018lishi kerak`;
      case "unrecognized_keys":
        return `Noma\u2019lum kalit${e8.keys.length > 1 ? "lar" : ""}: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `${e8.origin} dagi kalit noto\u2018g\u2018ri`;
      case "invalid_union":
        return "Noto\u2018g\u2018ri kirish";
      case "invalid_element":
        return `${e8.origin} da noto\u2018g\u2018ri qiymat`;
      default:
        return "Noto\u2018g\u2018ri kirish";
    }
  };
};
function Xt() {
  return { localeError: Wt2() };
}
var Ct3 = () => {
  let o21 = { string: { unit: "k\xFD t\u1EF1", verb: "c\xF3" }, file: { unit: "byte", verb: "c\xF3" }, array: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" }, set: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u0111\u1EA7u v\xE0o", email: "\u0111\u1ECBa ch\u1EC9 email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ng\xE0y gi\u1EDD ISO", date: "ng\xE0y ISO", time: "gi\u1EDD ISO", duration: "kho\u1EA3ng th\u1EDDi gian ISO", ipv4: "\u0111\u1ECBa ch\u1EC9 IPv4", ipv6: "\u0111\u1ECBa ch\u1EC9 IPv6", cidrv4: "d\u1EA3i IPv4", cidrv6: "d\u1EA3i IPv6", base64: "chu\u1ED7i m\xE3 h\xF3a base64", base64url: "chu\u1ED7i m\xE3 h\xF3a base64url", json_string: "chu\u1ED7i JSON", e164: "s\u1ED1 E.164", jwt: "JWT", template_literal: "\u0111\u1EA7u v\xE0o" }, r21 = { nan: "NaN", number: "s\u1ED1", array: "m\u1EA3ng" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i instanceof ${e8.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${i20}` : `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${t10}, nh\u1EADn \u0111\u01B0\u1EE3c ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${w12(e8.values[0])}` : `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${e8.origin ?? "gi\xE1 tr\u1ECB"} ${n18.verb} ${t10}${e8.maximum.toString()} ${n18.unit ?? "ph\u1EA7n t\u1EED"}` : `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${e8.origin ?? "gi\xE1 tr\u1ECB"} ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${e8.origin} ${n18.verb} ${t10}${e8.minimum.toString()} ${n18.unit}` : `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${e8.origin} ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${t10.prefix}"` : t10.format === "ends_with" ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${t10.suffix}"` : t10.format === "includes" ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${t10.includes}"` : t10.format === "regex" ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${t10.pattern}` : `${l19[t10.format] ?? e8.format} kh\xF4ng h\u1EE3p l\u1EC7`;
      }
      case "not_multiple_of":
        return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${e8.divisor}`;
      case "unrecognized_keys":
        return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${e8.origin}`;
      case "invalid_union":
        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
      case "invalid_element":
        return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${e8.origin}`;
      default:
        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
    }
  };
};
function qt2() {
  return { localeError: Ct3() };
}
var Mt3 = () => {
  let o21 = { string: { unit: "\u5B57\u7B26", verb: "\u5305\u542B" }, file: { unit: "\u5B57\u8282", verb: "\u5305\u542B" }, array: { unit: "\u9879", verb: "\u5305\u542B" }, set: { unit: "\u9879", verb: "\u5305\u542B" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u8F93\u5165", email: "\u7535\u5B50\u90AE\u4EF6", url: "URL", emoji: "\u8868\u60C5\u7B26\u53F7", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO\u65E5\u671F\u65F6\u95F4", date: "ISO\u65E5\u671F", time: "ISO\u65F6\u95F4", duration: "ISO\u65F6\u957F", ipv4: "IPv4\u5730\u5740", ipv6: "IPv6\u5730\u5740", cidrv4: "IPv4\u7F51\u6BB5", cidrv6: "IPv6\u7F51\u6BB5", base64: "base64\u7F16\u7801\u5B57\u7B26\u4E32", base64url: "base64url\u7F16\u7801\u5B57\u7B26\u4E32", json_string: "JSON\u5B57\u7B26\u4E32", e164: "E.164\u53F7\u7801", jwt: "JWT", template_literal: "\u8F93\u5165" }, r21 = { nan: "NaN", number: "\u6570\u5B57", array: "\u6570\u7EC4", null: "\u7A7A\u503C(null)" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B instanceof ${e8.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${i20}` : `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${t10}\uFF0C\u5B9E\u9645\u63A5\u6536 ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${w12(e8.values[0])}` : `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${e8.origin ?? "\u503C"} ${t10}${e8.maximum.toString()} ${n18.unit ?? "\u4E2A\u5143\u7D20"}` : `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${e8.origin ?? "\u503C"} ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${e8.origin} ${t10}${e8.minimum.toString()} ${n18.unit}` : `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${e8.origin} ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${t10.prefix}" \u5F00\u5934` : t10.format === "ends_with" ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${t10.suffix}" \u7ED3\u5C3E` : t10.format === "includes" ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${t10.includes}"` : t10.format === "regex" ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${t10.pattern}` : `\u65E0\u6548${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${e8.divisor} \u7684\u500D\u6570`;
      case "unrecognized_keys":
        return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `${e8.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
      case "invalid_union":
        return "\u65E0\u6548\u8F93\u5165";
      case "invalid_element":
        return `${e8.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
      default:
        return "\u65E0\u6548\u8F93\u5165";
    }
  };
};
function Yt() {
  return { localeError: Mt3() };
}
var Bt = () => {
  let o21 = { string: { unit: "\u5B57\u5143", verb: "\u64C1\u6709" }, file: { unit: "\u4F4D\u5143\u7D44", verb: "\u64C1\u6709" }, array: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" }, set: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u8F38\u5165", email: "\u90F5\u4EF6\u5730\u5740", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u65E5\u671F\u6642\u9593", date: "ISO \u65E5\u671F", time: "ISO \u6642\u9593", duration: "ISO \u671F\u9593", ipv4: "IPv4 \u4F4D\u5740", ipv6: "IPv6 \u4F4D\u5740", cidrv4: "IPv4 \u7BC4\u570D", cidrv6: "IPv6 \u7BC4\u570D", base64: "base64 \u7DE8\u78BC\u5B57\u4E32", base64url: "base64url \u7DE8\u78BC\u5B57\u4E32", json_string: "JSON \u5B57\u4E32", e164: "E.164 \u6578\u503C", jwt: "JWT", template_literal: "\u8F38\u5165" }, r21 = { nan: "NaN" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA instanceof ${e8.expected}\uFF0C\u4F46\u6536\u5230 ${i20}` : `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${t10}\uFF0C\u4F46\u6536\u5230 ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${w12(e8.values[0])}` : `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${e8.origin ?? "\u503C"} \u61C9\u70BA ${t10}${e8.maximum.toString()} ${n18.unit ?? "\u500B\u5143\u7D20"}` : `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${e8.origin ?? "\u503C"} \u61C9\u70BA ${t10}${e8.maximum.toString()}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${e8.origin} \u61C9\u70BA ${t10}${e8.minimum.toString()} ${n18.unit}` : `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${e8.origin} \u61C9\u70BA ${t10}${e8.minimum.toString()}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${t10.prefix}" \u958B\u982D` : t10.format === "ends_with" ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${t10.suffix}" \u7D50\u5C3E` : t10.format === "includes" ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${t10.includes}"` : t10.format === "regex" ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${t10.pattern}` : `\u7121\u6548\u7684 ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${e8.divisor} \u7684\u500D\u6578`;
      case "unrecognized_keys":
        return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${e8.keys.length > 1 ? "\u5011" : ""}\uFF1A${S7(e8.keys, "\u3001")}`;
      case "invalid_key":
        return `${e8.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
      case "invalid_union":
        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
      case "invalid_element":
        return `${e8.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
      default:
        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
    }
  };
};
function Ht() {
  return { localeError: Bt() };
}
var Qt = () => {
  let o21 = { string: { unit: "\xE0mi", verb: "n\xED" }, file: { unit: "bytes", verb: "n\xED" }, array: { unit: "nkan", verb: "n\xED" }, set: { unit: "nkan", verb: "n\xED" } };
  function a16(e8) {
    return o21[e8] ?? null;
  }
  let l19 = { regex: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9", email: "\xE0d\xEDr\u1EB9\u0301s\xEC \xECm\u1EB9\u0301l\xEC", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\xE0k\xF3k\xF2 ISO", date: "\u1ECDj\u1ECD\u0301 ISO", time: "\xE0k\xF3k\xF2 ISO", duration: "\xE0k\xF3k\xF2 t\xF3 p\xE9 ISO", ipv4: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv4", ipv6: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv6", cidrv4: "\xE0gb\xE8gb\xE8 IPv4", cidrv6: "\xE0gb\xE8gb\xE8 IPv6", base64: "\u1ECD\u0300r\u1ECD\u0300 t\xED a k\u1ECD\u0301 n\xED base64", base64url: "\u1ECD\u0300r\u1ECD\u0300 base64url", json_string: "\u1ECD\u0300r\u1ECD\u0300 JSON", e164: "n\u1ECD\u0301mb\xE0 E.164", jwt: "JWT", template_literal: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9" }, r21 = { nan: "NaN", number: "n\u1ECD\u0301mb\xE0", array: "akop\u1ECD" };
  return (e8) => {
    switch (e8.code) {
      case "invalid_type": {
        let t10 = r21[e8.expected] ?? e8.expected, n18 = le5(e8.input), i20 = r21[n18] ?? n18;
        return /^[A-Z]/.test(e8.expected) ? `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi instanceof ${e8.expected}, \xE0m\u1ECD\u0300 a r\xED ${i20}` : `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${t10}, \xE0m\u1ECD\u0300 a r\xED ${i20}`;
      }
      case "invalid_value":
        return e8.values.length === 1 ? `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${w12(e8.values[0])}` : `\xC0\u1E63\xE0y\xE0n a\u1E63\xEC\u1E63e: yan \u1ECD\u0300kan l\xE1ra ${S7(e8.values, "|")}`;
      case "too_big": {
        let t10 = e8.inclusive ? "<=" : "<", n18 = a16(e8.origin);
        return n18 ? `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${e8.origin ?? "iye"} ${n18.verb} ${t10}${e8.maximum} ${n18.unit}` : `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 ${t10}${e8.maximum}`;
      }
      case "too_small": {
        let t10 = e8.inclusive ? ">=" : ">", n18 = a16(e8.origin);
        return n18 ? `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${e8.origin} ${n18.verb} ${t10}${e8.minimum} ${n18.unit}` : `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 ${t10}${e8.minimum}`;
      }
      case "invalid_format": {
        let t10 = e8;
        return t10.format === "starts_with" ? `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\u1EB9\u0300r\u1EB9\u0300 p\u1EB9\u0300l\xFA "${t10.prefix}"` : t10.format === "ends_with" ? `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 par\xED p\u1EB9\u0300l\xFA "${t10.suffix}"` : t10.format === "includes" ? `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 n\xED "${t10.includes}"` : t10.format === "regex" ? `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\xE1 \xE0p\u1EB9\u1EB9r\u1EB9 mu ${t10.pattern}` : `A\u1E63\xEC\u1E63e: ${l19[t10.format] ?? e8.format}`;
      }
      case "not_multiple_of":
        return `N\u1ECD\u0301mb\xE0 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 j\u1EB9\u0301 \xE8y\xE0 p\xEDp\xEDn ti ${e8.divisor}`;
      case "unrecognized_keys":
        return `B\u1ECDt\xECn\xEC \xE0\xECm\u1ECD\u0300: ${S7(e8.keys, ", ")}`;
      case "invalid_key":
        return `B\u1ECDt\xECn\xEC a\u1E63\xEC\u1E63e n\xEDn\xFA ${e8.origin}`;
      case "invalid_union":
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
      case "invalid_element":
        return `Iye a\u1E63\xEC\u1E63e n\xEDn\xFA ${e8.origin}`;
      default:
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
    }
  };
};
function en() {
  return { localeError: Qt() };
}

// vendor/neon/zod_4.3.6_es2022_v4_core_registries.mjs
var n8;
var r11 = Symbol("ZodOutput");
var _13 = Symbol("ZodInput");
var o15 = class {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(t10, ...e8) {
    let i20 = e8[0];
    return this._map.set(t10, i20), i20 && typeof i20 == "object" && "id" in i20 && this._idmap.set(i20.id, t10), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(t10) {
    let e8 = this._map.get(t10);
    return e8 && typeof e8 == "object" && "id" in e8 && this._idmap.delete(e8.id), this._map.delete(t10), this;
  }
  get(t10) {
    let e8 = t10._zod.parent;
    if (e8) {
      let i20 = { ...this.get(e8) ?? {} };
      delete i20.id;
      let s20 = { ...i20, ...this._map.get(t10) };
      return Object.keys(s20).length ? s20 : void 0;
    }
    return this._map.get(t10);
  }
  has(t10) {
    return this._map.has(t10);
  }
};
function a8() {
  return new o15();
}
(n8 = globalThis).__zod_globalRegistry ?? (n8.__zod_globalRegistry = a8());
var d5 = globalThis.__zod_globalRegistry;

// vendor/neon/zod_4.3.6_es2022_v4_core_to-json-schema.mjs
function O9(e8) {
  let s20 = e8?.target ?? "draft-2020-12";
  return s20 === "draft-4" && (s20 = "draft-04"), s20 === "draft-7" && (s20 = "draft-07"), { processors: e8.processors ?? {}, metadataRegistry: e8?.metadata ?? d5, target: s20, unrepresentable: e8?.unrepresentable ?? "throw", override: e8?.override ?? (() => {
  }), io: e8?.io ?? "output", counter: 0, seen: /* @__PURE__ */ new Map(), cycles: e8?.cycles ?? "ref", reused: e8?.reused ?? "inline", external: e8?.external ?? void 0 };
}
function g6(e8, s20, n18 = { path: [], schemaPath: [] }) {
  var r21;
  let f17 = e8._zod.def, c19 = s20.seen.get(e8);
  if (c19) return c19.count++, n18.schemaPath.includes(e8) && (c19.cycle = n18.path), c19.schema;
  let t10 = { schema: {}, count: 1, cycle: void 0, path: n18.path };
  s20.seen.set(e8, t10);
  let o21 = e8._zod.toJSONSchema?.();
  if (o21) t10.schema = o21;
  else {
    let d13 = { ...n18, schemaPath: [...n18.schemaPath, e8], path: n18.path };
    if (e8._zod.processJSONSchema) e8._zod.processJSONSchema(s20, t10.schema, d13);
    else {
      let l19 = t10.schema, a16 = s20.processors[f17.type];
      if (!a16) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${f17.type}`);
      a16(e8, s20, l19, d13);
    }
    let p21 = e8._zod.parent;
    p21 && (t10.ref || (t10.ref = p21), g6(p21, s20, d13), s20.seen.get(p21).isParent = true);
  }
  let i20 = s20.metadataRegistry.get(e8);
  return i20 && Object.assign(t10.schema, i20), s20.io === "input" && u6(e8) && (delete t10.schema.examples, delete t10.schema.default), s20.io === "input" && t10.schema._prefault && ((r21 = t10.schema).default ?? (r21.default = t10.schema._prefault)), delete t10.schema._prefault, s20.seen.get(e8).schema;
}
function $6(e8, s20) {
  let n18 = e8.seen.get(s20);
  if (!n18) throw new Error("Unprocessed schema. This is a bug in Zod.");
  let r21 = /* @__PURE__ */ new Map();
  for (let t10 of e8.seen.entries()) {
    let o21 = e8.metadataRegistry.get(t10[0])?.id;
    if (o21) {
      let i20 = r21.get(o21);
      if (i20 && i20 !== t10[0]) throw new Error(`Duplicate schema id "${o21}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      r21.set(o21, t10[0]);
    }
  }
  let f17 = (t10) => {
    let o21 = e8.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e8.external) {
      let p21 = e8.external.registry.get(t10[0])?.id, l19 = e8.external.uri ?? ((m16) => m16);
      if (p21) return { ref: l19(p21) };
      let a16 = t10[1].defId ?? t10[1].schema.id ?? `schema${e8.counter++}`;
      return t10[1].defId = a16, { defId: a16, ref: `${l19("__shared")}#/${o21}/${a16}` };
    }
    if (t10[1] === n18) return { ref: "#" };
    let y15 = `#/${o21}/`, d13 = t10[1].schema.id ?? `__schema${e8.counter++}`;
    return { defId: d13, ref: y15 + d13 };
  }, c19 = (t10) => {
    if (t10[1].schema.$ref) return;
    let o21 = t10[1], { ref: i20, defId: y15 } = f17(t10);
    o21.def = { ...o21.schema }, y15 && (o21.defId = y15);
    let d13 = o21.schema;
    for (let p21 in d13) delete d13[p21];
    d13.$ref = i20;
  };
  if (e8.cycles === "throw") for (let t10 of e8.seen.entries()) {
    let o21 = t10[1];
    if (o21.cycle) throw new Error(`Cycle detected: #/${o21.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
  }
  for (let t10 of e8.seen.entries()) {
    let o21 = t10[1];
    if (s20 === t10[0]) {
      c19(t10);
      continue;
    }
    if (e8.external) {
      let y15 = e8.external.registry.get(t10[0])?.id;
      if (s20 !== t10[0] && y15) {
        c19(t10);
        continue;
      }
    }
    if (e8.metadataRegistry.get(t10[0])?.id) {
      c19(t10);
      continue;
    }
    if (o21.cycle) {
      c19(t10);
      continue;
    }
    if (o21.count > 1 && e8.reused === "ref") {
      c19(t10);
      continue;
    }
  }
}
function w13(e8, s20) {
  let n18 = e8.seen.get(s20);
  if (!n18) throw new Error("Unprocessed schema. This is a bug in Zod.");
  let r21 = (t10) => {
    let o21 = e8.seen.get(t10);
    if (o21.ref === null) return;
    let i20 = o21.def ?? o21.schema, y15 = { ...i20 }, d13 = o21.ref;
    if (o21.ref = null, d13) {
      r21(d13);
      let l19 = e8.seen.get(d13), a16 = l19.schema;
      if (a16.$ref && (e8.target === "draft-07" || e8.target === "draft-04" || e8.target === "openapi-3.0") ? (i20.allOf = i20.allOf ?? [], i20.allOf.push(a16)) : Object.assign(i20, a16), Object.assign(i20, y15), t10._zod.parent === d13) for (let h17 in i20) h17 === "$ref" || h17 === "allOf" || h17 in y15 || delete i20[h17];
      if (a16.$ref && l19.def) for (let h17 in i20) h17 === "$ref" || h17 === "allOf" || h17 in l19.def && JSON.stringify(i20[h17]) === JSON.stringify(l19.def[h17]) && delete i20[h17];
    }
    let p21 = t10._zod.parent;
    if (p21 && p21 !== d13) {
      r21(p21);
      let l19 = e8.seen.get(p21);
      if (l19?.schema.$ref && (i20.$ref = l19.schema.$ref, l19.def)) for (let a16 in i20) a16 === "$ref" || a16 === "allOf" || a16 in l19.def && JSON.stringify(i20[a16]) === JSON.stringify(l19.def[a16]) && delete i20[a16];
    }
    e8.override({ zodSchema: t10, jsonSchema: i20, path: o21.path ?? [] });
  };
  for (let t10 of [...e8.seen.entries()].reverse()) r21(t10[0]);
  let f17 = {};
  if (e8.target === "draft-2020-12" ? f17.$schema = "https://json-schema.org/draft/2020-12/schema" : e8.target === "draft-07" ? f17.$schema = "http://json-schema.org/draft-07/schema#" : e8.target === "draft-04" ? f17.$schema = "http://json-schema.org/draft-04/schema#" : e8.target, e8.external?.uri) {
    let t10 = e8.external.registry.get(s20)?.id;
    if (!t10) throw new Error("Schema is missing an `id` property");
    f17.$id = e8.external.uri(t10);
  }
  Object.assign(f17, n18.def ?? n18.schema);
  let c19 = e8.external?.defs ?? {};
  for (let t10 of e8.seen.entries()) {
    let o21 = t10[1];
    o21.def && o21.defId && (c19[o21.defId] = o21.def);
  }
  e8.external || Object.keys(c19).length > 0 && (e8.target === "draft-2020-12" ? f17.$defs = c19 : f17.definitions = c19);
  try {
    let t10 = JSON.parse(JSON.stringify(f17));
    return Object.defineProperty(t10, "~standard", { value: { ...s20["~standard"], jsonSchema: { input: S8(s20, "input", e8.processors), output: S8(s20, "output", e8.processors) } }, enumerable: false, writable: false }), t10;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function u6(e8, s20) {
  let n18 = s20 ?? { seen: /* @__PURE__ */ new Set() };
  if (n18.seen.has(e8)) return false;
  n18.seen.add(e8);
  let r21 = e8._zod.def;
  if (r21.type === "transform") return true;
  if (r21.type === "array") return u6(r21.element, n18);
  if (r21.type === "set") return u6(r21.valueType, n18);
  if (r21.type === "lazy") return u6(r21.getter(), n18);
  if (r21.type === "promise" || r21.type === "optional" || r21.type === "nonoptional" || r21.type === "nullable" || r21.type === "readonly" || r21.type === "default" || r21.type === "prefault") return u6(r21.innerType, n18);
  if (r21.type === "intersection") return u6(r21.left, n18) || u6(r21.right, n18);
  if (r21.type === "record" || r21.type === "map") return u6(r21.keyType, n18) || u6(r21.valueType, n18);
  if (r21.type === "pipe") return u6(r21.in, n18) || u6(r21.out, n18);
  if (r21.type === "object") {
    for (let f17 in r21.shape) if (u6(r21.shape[f17], n18)) return true;
    return false;
  }
  if (r21.type === "union") {
    for (let f17 of r21.options) if (u6(f17, n18)) return true;
    return false;
  }
  if (r21.type === "tuple") {
    for (let f17 of r21.items) if (u6(f17, n18)) return true;
    return !!(r21.rest && u6(r21.rest, n18));
  }
  return false;
}
var j7 = (e8, s20 = {}) => (n18) => {
  let r21 = O9({ ...n18, processors: s20 });
  return g6(e8, r21), $6(r21, e8), w13(r21, e8);
};
var S8 = (e8, s20, n18 = {}) => (r21) => {
  let { libraryOptions: f17, target: c19 } = r21 ?? {}, t10 = O9({ ...f17 ?? {}, target: c19, io: s20, processors: n18 });
  return g6(e8, t10), $6(t10, e8), w13(t10, e8);
};

// vendor/neon/zod_4.3.6_es2022_v4_core_json-schema-processors.mjs
var P6 = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" };
var x9 = (r21, t10, o21, s20) => {
  let e8 = o21;
  e8.type = "string";
  let { minimum: n18, maximum: i20, format: f17, patterns: a16, contentEncoding: p21 } = r21._zod.bag;
  if (typeof n18 == "number" && (e8.minLength = n18), typeof i20 == "number" && (e8.maxLength = i20), f17 && (e8.format = P6[f17] ?? f17, e8.format === "" && delete e8.format, f17 === "time" && delete e8.format), p21 && (e8.contentEncoding = p21), a16 && a16.size > 0) {
    let c19 = [...a16];
    c19.length === 1 ? e8.pattern = c19[0].source : c19.length > 1 && (e8.allOf = [...c19.map((m16) => ({ ...t10.target === "draft-07" || t10.target === "draft-04" || t10.target === "openapi-3.0" ? { type: "string" } : {}, pattern: m16.source }))]);
  }
};
var w14 = (r21, t10, o21, s20) => {
  let e8 = o21, { minimum: n18, maximum: i20, format: f17, multipleOf: a16, exclusiveMaximum: p21, exclusiveMinimum: c19 } = r21._zod.bag;
  typeof f17 == "string" && f17.includes("int") ? e8.type = "integer" : e8.type = "number", typeof c19 == "number" && (t10.target === "draft-04" || t10.target === "openapi-3.0" ? (e8.minimum = c19, e8.exclusiveMinimum = true) : e8.exclusiveMinimum = c19), typeof n18 == "number" && (e8.minimum = n18, typeof c19 == "number" && t10.target !== "draft-04" && (c19 >= n18 ? delete e8.minimum : delete e8.exclusiveMinimum)), typeof p21 == "number" && (t10.target === "draft-04" || t10.target === "openapi-3.0" ? (e8.maximum = p21, e8.exclusiveMaximum = true) : e8.exclusiveMaximum = p21), typeof i20 == "number" && (e8.maximum = i20, typeof p21 == "number" && t10.target !== "draft-04" && (p21 <= i20 ? delete e8.maximum : delete e8.exclusiveMaximum)), typeof a16 == "number" && (e8.multipleOf = a16);
};
var O10 = (r21, t10, o21, s20) => {
  o21.type = "boolean";
};
var S9 = (r21, t10, o21, s20) => {
  if (t10.unrepresentable === "throw") throw new Error("BigInt cannot be represented in JSON Schema");
};
var z9 = (r21, t10, o21, s20) => {
  if (t10.unrepresentable === "throw") throw new Error("Symbols cannot be represented in JSON Schema");
};
var v8 = (r21, t10, o21, s20) => {
  t10.target === "openapi-3.0" ? (o21.type = "string", o21.nullable = true, o21.enum = [null]) : o21.type = "null";
};
var T12 = (r21, t10, o21, s20) => {
  if (t10.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
};
var j8 = (r21, t10, o21, s20) => {
  if (t10.unrepresentable === "throw") throw new Error("Void cannot be represented in JSON Schema");
};
var N9 = (r21, t10, o21, s20) => {
  o21.not = {};
};
var E15 = (r21, t10, o21, s20) => {
};
var J7 = (r21, t10, o21, s20) => {
};
var I9 = (r21, t10, o21, s20) => {
  if (t10.unrepresentable === "throw") throw new Error("Date cannot be represented in JSON Schema");
};
var k8 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def, n18 = A9(e8.entries);
  n18.every((i20) => typeof i20 == "number") && (o21.type = "number"), n18.every((i20) => typeof i20 == "string") && (o21.type = "string"), o21.enum = n18;
};
var M5 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def, n18 = [];
  for (let i20 of e8.values) if (i20 === void 0) {
    if (t10.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
  } else if (typeof i20 == "bigint") {
    if (t10.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
    n18.push(Number(i20));
  } else n18.push(i20);
  if (n18.length !== 0) if (n18.length === 1) {
    let i20 = n18[0];
    o21.type = i20 === null ? "null" : typeof i20, t10.target === "draft-04" || t10.target === "openapi-3.0" ? o21.enum = [i20] : o21.const = i20;
  } else n18.every((i20) => typeof i20 == "number") && (o21.type = "number"), n18.every((i20) => typeof i20 == "string") && (o21.type = "string"), n18.every((i20) => typeof i20 == "boolean") && (o21.type = "boolean"), n18.every((i20) => i20 === null) && (o21.type = "null"), o21.enum = n18;
};
var V5 = (r21, t10, o21, s20) => {
  if (t10.unrepresentable === "throw") throw new Error("NaN cannot be represented in JSON Schema");
};
var L6 = (r21, t10, o21, s20) => {
  let e8 = o21, n18 = r21._zod.pattern;
  if (!n18) throw new Error("Pattern not found in template literal");
  e8.type = "string", e8.pattern = n18.source;
};
var B6 = (r21, t10, o21, s20) => {
  let e8 = o21, n18 = { type: "string", format: "binary", contentEncoding: "binary" }, { minimum: i20, maximum: f17, mime: a16 } = r21._zod.bag;
  i20 !== void 0 && (n18.minLength = i20), f17 !== void 0 && (n18.maxLength = f17), a16 ? a16.length === 1 ? (n18.contentMediaType = a16[0], Object.assign(e8, n18)) : (Object.assign(e8, n18), e8.anyOf = a16.map((p21) => ({ contentMediaType: p21 }))) : Object.assign(e8, n18);
};
var q8 = (r21, t10, o21, s20) => {
  o21.type = "boolean";
};
var D7 = (r21, t10, o21, s20) => {
  if (t10.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
};
var K8 = (r21, t10, o21, s20) => {
  if (t10.unrepresentable === "throw") throw new Error("Function types cannot be represented in JSON Schema");
};
var C7 = (r21, t10, o21, s20) => {
  if (t10.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
};
var A10 = (r21, t10, o21, s20) => {
  if (t10.unrepresentable === "throw") throw new Error("Map cannot be represented in JSON Schema");
};
var F6 = (r21, t10, o21, s20) => {
  if (t10.unrepresentable === "throw") throw new Error("Set cannot be represented in JSON Schema");
};
var U5 = (r21, t10, o21, s20) => {
  let e8 = o21, n18 = r21._zod.def, { minimum: i20, maximum: f17 } = r21._zod.bag;
  typeof i20 == "number" && (e8.minItems = i20), typeof f17 == "number" && (e8.maxItems = f17), e8.type = "array", e8.items = g6(n18.element, t10, { ...s20, path: [...s20.path, "items"] });
};
var $7 = (r21, t10, o21, s20) => {
  let e8 = o21, n18 = r21._zod.def;
  e8.type = "object", e8.properties = {};
  let i20 = n18.shape;
  for (let p21 in i20) e8.properties[p21] = g6(i20[p21], t10, { ...s20, path: [...s20.path, "properties", p21] });
  let f17 = new Set(Object.keys(i20)), a16 = new Set([...f17].filter((p21) => {
    let c19 = n18.shape[p21]._zod;
    return t10.io === "input" ? c19.optin === void 0 : c19.optout === void 0;
  }));
  a16.size > 0 && (e8.required = Array.from(a16)), n18.catchall?._zod.def.type === "never" ? e8.additionalProperties = false : n18.catchall ? n18.catchall && (e8.additionalProperties = g6(n18.catchall, t10, { ...s20, path: [...s20.path, "additionalProperties"] })) : t10.io === "output" && (e8.additionalProperties = false);
};
var G7 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def, n18 = e8.inclusive === false, i20 = e8.options.map((f17, a16) => g6(f17, t10, { ...s20, path: [...s20.path, n18 ? "oneOf" : "anyOf", a16] }));
  n18 ? o21.oneOf = i20 : o21.anyOf = i20;
};
var H7 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def, n18 = g6(e8.left, t10, { ...s20, path: [...s20.path, "allOf", 0] }), i20 = g6(e8.right, t10, { ...s20, path: [...s20.path, "allOf", 1] }), f17 = (p21) => "allOf" in p21 && Object.keys(p21).length === 1, a16 = [...f17(n18) ? n18.allOf : [n18], ...f17(i20) ? i20.allOf : [i20]];
  o21.allOf = a16;
};
var Q6 = (r21, t10, o21, s20) => {
  let e8 = o21, n18 = r21._zod.def;
  e8.type = "array";
  let i20 = t10.target === "draft-2020-12" ? "prefixItems" : "items", f17 = t10.target === "draft-2020-12" || t10.target === "openapi-3.0" ? "items" : "additionalItems", a16 = n18.items.map((_21, g12) => g6(_21, t10, { ...s20, path: [...s20.path, i20, g12] })), p21 = n18.rest ? g6(n18.rest, t10, { ...s20, path: [...s20.path, f17, ...t10.target === "openapi-3.0" ? [n18.items.length] : []] }) : null;
  t10.target === "draft-2020-12" ? (e8.prefixItems = a16, p21 && (e8.items = p21)) : t10.target === "openapi-3.0" ? (e8.items = { anyOf: a16 }, p21 && e8.items.anyOf.push(p21), e8.minItems = a16.length, p21 || (e8.maxItems = a16.length)) : (e8.items = a16, p21 && (e8.additionalItems = p21));
  let { minimum: c19, maximum: m16 } = r21._zod.bag;
  typeof c19 == "number" && (e8.minItems = c19), typeof m16 == "number" && (e8.maxItems = m16);
};
var R13 = (r21, t10, o21, s20) => {
  let e8 = o21, n18 = r21._zod.def;
  e8.type = "object";
  let i20 = n18.keyType, a16 = i20._zod.bag?.patterns;
  if (n18.mode === "loose" && a16 && a16.size > 0) {
    let c19 = g6(n18.valueType, t10, { ...s20, path: [...s20.path, "patternProperties", "*"] });
    e8.patternProperties = {};
    for (let m16 of a16) e8.patternProperties[m16.source] = c19;
  } else (t10.target === "draft-07" || t10.target === "draft-2020-12") && (e8.propertyNames = g6(n18.keyType, t10, { ...s20, path: [...s20.path, "propertyNames"] })), e8.additionalProperties = g6(n18.valueType, t10, { ...s20, path: [...s20.path, "additionalProperties"] });
  let p21 = i20._zod.values;
  if (p21) {
    let c19 = [...p21].filter((m16) => typeof m16 == "string" || typeof m16 == "number");
    c19.length > 0 && (e8.required = c19);
  }
};
var W8 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def, n18 = g6(e8.innerType, t10, s20), i20 = t10.seen.get(r21);
  t10.target === "openapi-3.0" ? (i20.ref = e8.innerType, o21.nullable = true) : o21.anyOf = [n18, { type: "null" }];
};
var X7 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def;
  g6(e8.innerType, t10, s20);
  let n18 = t10.seen.get(r21);
  n18.ref = e8.innerType;
};
var Y7 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def;
  g6(e8.innerType, t10, s20);
  let n18 = t10.seen.get(r21);
  n18.ref = e8.innerType, o21.default = JSON.parse(JSON.stringify(e8.defaultValue));
};
var Z8 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def;
  g6(e8.innerType, t10, s20);
  let n18 = t10.seen.get(r21);
  n18.ref = e8.innerType, t10.io === "input" && (o21._prefault = JSON.parse(JSON.stringify(e8.defaultValue)));
};
var ee6 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def;
  g6(e8.innerType, t10, s20);
  let n18 = t10.seen.get(r21);
  n18.ref = e8.innerType;
  let i20;
  try {
    i20 = e8.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  o21.default = i20;
};
var te6 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def, n18 = t10.io === "input" ? e8.in._zod.def.type === "transform" ? e8.out : e8.in : e8.out;
  g6(n18, t10, s20);
  let i20 = t10.seen.get(r21);
  i20.ref = n18;
};
var ne6 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def;
  g6(e8.innerType, t10, s20);
  let n18 = t10.seen.get(r21);
  n18.ref = e8.innerType, o21.readOnly = true;
};
var re5 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def;
  g6(e8.innerType, t10, s20);
  let n18 = t10.seen.get(r21);
  n18.ref = e8.innerType;
};
var oe6 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.def;
  g6(e8.innerType, t10, s20);
  let n18 = t10.seen.get(r21);
  n18.ref = e8.innerType;
};
var se7 = (r21, t10, o21, s20) => {
  let e8 = r21._zod.innerType;
  g6(e8, t10, s20);
  let n18 = t10.seen.get(r21);
  n18.ref = e8;
};
var h7 = { string: x9, number: w14, boolean: O10, bigint: S9, symbol: z9, null: v8, undefined: T12, void: j8, never: N9, any: E15, unknown: J7, date: I9, enum: k8, literal: M5, nan: V5, template_literal: L6, file: B6, success: q8, custom: D7, function: K8, transform: C7, map: A10, set: F6, array: U5, object: $7, union: G7, intersection: H7, tuple: Q6, record: R13, nullable: W8, nonoptional: X7, default: Y7, prefault: Z8, catch: ee6, pipe: te6, readonly: ne6, promise: re5, optional: oe6, lazy: se7 };
function pe6(r21, t10) {
  if ("_idmap" in r21) {
    let s20 = r21, e8 = O9({ ...t10, processors: h7 }), n18 = {};
    for (let a16 of s20._idmap.entries()) {
      let [p21, c19] = a16;
      g6(c19, e8);
    }
    let i20 = {}, f17 = { registry: s20, uri: t10?.uri, defs: n18 };
    e8.external = f17;
    for (let a16 of s20._idmap.entries()) {
      let [p21, c19] = a16;
      $6(e8, c19), i20[p21] = w13(e8, c19);
    }
    if (Object.keys(n18).length > 0) {
      let a16 = e8.target === "draft-2020-12" ? "$defs" : "definitions";
      i20.__shared = { [a16]: n18 };
    }
    return { schemas: i20 };
  }
  let o21 = O9({ ...t10, processors: h7 });
  return g6(r21, o21), $6(o21, r21), w13(o21, r21);
}

// vendor/neon/zod_4.3.6_es2022_v4_core.mjs
var St3 = Object.defineProperty;
var Tt3 = (t10, e8) => {
  for (var r21 in e8) St3(t10, r21, { get: e8[r21], enumerable: true });
};
var Lr = Object.freeze({ status: "aborted" });
function l6(t10, e8, r21) {
  function n18(u18, c19) {
    if (u18._zod || Object.defineProperty(u18, "_zod", { value: { def: c19, constr: i20, traits: /* @__PURE__ */ new Set() }, enumerable: false }), u18._zod.traits.has(t10)) return;
    u18._zod.traits.add(t10), e8(u18, c19);
    let m16 = i20.prototype, f17 = Object.keys(m16);
    for (let h17 = 0; h17 < f17.length; h17++) {
      let d13 = f17[h17];
      d13 in u18 || (u18[d13] = m16[d13].bind(u18));
    }
  }
  let o21 = r21?.Parent ?? Object;
  class s20 extends o21 {
  }
  Object.defineProperty(s20, "name", { value: t10 });
  function i20(u18) {
    var c19;
    let m16 = r21?.Parent ? new s20() : this;
    n18(m16, u18), (c19 = m16._zod).deferred ?? (c19.deferred = []);
    for (let f17 of m16._zod.deferred) f17();
    return m16;
  }
  return Object.defineProperty(i20, "init", { value: n18 }), Object.defineProperty(i20, Symbol.hasInstance, { value: (u18) => r21?.Parent && u18 instanceof r21.Parent ? true : u18?._zod?.traits?.has(t10) }), Object.defineProperty(i20, "name", { value: t10 }), i20;
}
var Fr = Symbol("zod_brand");
var A11 = class extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
};
var S10 = class extends Error {
  constructor(e8) {
    super(`Encountered unidirectional transform during encode: ${e8}`), this.name = "ZodEncodeError";
  }
};
var F7 = {};
function w15(t10) {
  return t10 && Object.assign(F7, t10), F7;
}
var Oe5 = (t10, e8) => {
  t10.name = "$ZodError", Object.defineProperty(t10, "_zod", { value: t10._zod, enumerable: false }), Object.defineProperty(t10, "issues", { value: e8, enumerable: false }), t10.message = JSON.stringify(e8, N8, 2), Object.defineProperty(t10, "toString", { value: () => t10.message, enumerable: false });
};
var Ne4 = l6("$ZodError", Oe5);
var Z9 = l6("$ZodError", Oe5, { Parent: Error });
function Dr(t10, e8 = (r21) => r21.message) {
  let r21 = {}, n18 = [];
  for (let o21 of t10.issues) o21.path.length > 0 ? (r21[o21.path[0]] = r21[o21.path[0]] || [], r21[o21.path[0]].push(e8(o21))) : n18.push(e8(o21));
  return { formErrors: n18, fieldErrors: r21 };
}
function Mr(t10, e8 = (r21) => r21.message) {
  let r21 = { _errors: [] }, n18 = (o21) => {
    for (let s20 of o21.issues) if (s20.code === "invalid_union" && s20.errors.length) s20.errors.map((i20) => n18({ issues: i20 }));
    else if (s20.code === "invalid_key") n18({ issues: s20.issues });
    else if (s20.code === "invalid_element") n18({ issues: s20.issues });
    else if (s20.path.length === 0) r21._errors.push(e8(s20));
    else {
      let i20 = r21, u18 = 0;
      for (; u18 < s20.path.length; ) {
        let c19 = s20.path[u18];
        u18 === s20.path.length - 1 ? (i20[c19] = i20[c19] || { _errors: [] }, i20[c19]._errors.push(e8(s20))) : i20[c19] = i20[c19] || { _errors: [] }, i20 = i20[c19], u18++;
      }
    }
  };
  return n18(t10), r21;
}
function Ur(t10, e8 = (r21) => r21.message) {
  let r21 = { errors: [] }, n18 = (o21, s20 = []) => {
    var i20, u18;
    for (let c19 of o21.issues) if (c19.code === "invalid_union" && c19.errors.length) c19.errors.map((m16) => n18({ issues: m16 }, c19.path));
    else if (c19.code === "invalid_key") n18({ issues: c19.issues }, c19.path);
    else if (c19.code === "invalid_element") n18({ issues: c19.issues }, c19.path);
    else {
      let m16 = [...s20, ...c19.path];
      if (m16.length === 0) {
        r21.errors.push(e8(c19));
        continue;
      }
      let f17 = r21, h17 = 0;
      for (; h17 < m16.length; ) {
        let d13 = m16[h17], z13 = h17 === m16.length - 1;
        typeof d13 == "string" ? (f17.properties ?? (f17.properties = {}), (i20 = f17.properties)[d13] ?? (i20[d13] = { errors: [] }), f17 = f17.properties[d13]) : (f17.items ?? (f17.items = []), (u18 = f17.items)[d13] ?? (u18[d13] = { errors: [] }), f17 = f17.items[d13]), z13 && f17.errors.push(e8(c19)), h17++;
      }
    }
  };
  return n18(t10), r21;
}
function Ct4(t10) {
  let e8 = [], r21 = t10.map((n18) => typeof n18 == "object" ? n18.key : n18);
  for (let n18 of r21) typeof n18 == "number" ? e8.push(`[${n18}]`) : typeof n18 == "symbol" ? e8.push(`[${JSON.stringify(String(n18))}]`) : /[^\w$]/.test(n18) ? e8.push(`[${JSON.stringify(n18)}]`) : (e8.length && e8.push("."), e8.push(n18));
  return e8.join("");
}
function Vr(t10) {
  let e8 = [], r21 = [...t10.issues].sort((n18, o21) => (n18.path ?? []).length - (o21.path ?? []).length);
  for (let n18 of r21) e8.push(`\u2716 ${n18.message}`), n18.path?.length && e8.push(`  \u2192 at ${Ct4(n18.path)}`);
  return e8.join(`
`);
}
var Y8 = (t10) => (e8, r21, n18, o21) => {
  let s20 = n18 ? Object.assign(n18, { async: false }) : { async: false }, i20 = e8._zod.run({ value: r21, issues: [] }, s20);
  if (i20 instanceof Promise) throw new A11();
  if (i20.issues.length) {
    let u18 = new (o21?.Err ?? t10)(i20.issues.map((c19) => fe5(c19, s20, w15())));
    throw B5(u18, o21?.callee), u18;
  }
  return i20.value;
};
var q9 = Y8(Z9);
var H8 = (t10) => async (e8, r21, n18, o21) => {
  let s20 = n18 ? Object.assign(n18, { async: true }) : { async: true }, i20 = e8._zod.run({ value: r21, issues: [] }, s20);
  if (i20 instanceof Promise && (i20 = await i20), i20.issues.length) {
    let u18 = new (o21?.Err ?? t10)(i20.issues.map((c19) => fe5(c19, s20, w15())));
    throw B5(u18, o21?.callee), u18;
  }
  return i20.value;
};
var X8 = H8(Z9);
var Q7 = (t10) => (e8, r21, n18) => {
  let o21 = n18 ? { ...n18, async: false } : { async: false }, s20 = e8._zod.run({ value: r21, issues: [] }, o21);
  if (s20 instanceof Promise) throw new A11();
  return s20.issues.length ? { success: false, error: new (t10 ?? Ne4)(s20.issues.map((i20) => fe5(i20, o21, w15()))) } : { success: true, data: s20.value };
};
var Le4 = Q7(Z9);
var ee7 = (t10) => async (e8, r21, n18) => {
  let o21 = n18 ? Object.assign(n18, { async: true }) : { async: true }, s20 = e8._zod.run({ value: r21, issues: [] }, o21);
  return s20 instanceof Promise && (s20 = await s20), s20.issues.length ? { success: false, error: new t10(s20.issues.map((i20) => fe5(i20, o21, w15()))) } : { success: true, data: s20.value };
};
var Fe4 = ee7(Z9);
var Ot3 = (t10) => (e8, r21, n18) => {
  let o21 = n18 ? Object.assign(n18, { direction: "backward" }) : { direction: "backward" };
  return Y8(t10)(e8, r21, o21);
};
var Br = Ot3(Z9);
var Nt3 = (t10) => (e8, r21, n18) => Y8(t10)(e8, r21, n18);
var Wr = Nt3(Z9);
var Lt4 = (t10) => async (e8, r21, n18) => {
  let o21 = n18 ? Object.assign(n18, { direction: "backward" }) : { direction: "backward" };
  return H8(t10)(e8, r21, o21);
};
var Kr = Lt4(Z9);
var Ft2 = (t10) => async (e8, r21, n18) => H8(t10)(e8, r21, n18);
var Gr = Ft2(Z9);
var jt2 = (t10) => (e8, r21, n18) => {
  let o21 = n18 ? Object.assign(n18, { direction: "backward" }) : { direction: "backward" };
  return Q7(t10)(e8, r21, o21);
};
var Jr = jt2(Z9);
var Dt3 = (t10) => (e8, r21, n18) => Q7(t10)(e8, r21, n18);
var Yr = Dt3(Z9);
var Mt4 = (t10) => async (e8, r21, n18) => {
  let o21 = n18 ? Object.assign(n18, { direction: "backward" }) : { direction: "backward" };
  return ee7(t10)(e8, r21, o21);
};
var qr = Mt4(Z9);
var Ut3 = (t10) => async (e8, r21, n18) => ee7(t10)(e8, r21, n18);
var Hr = Ut3(Z9);
var M6 = {};
Tt3(M6, { base64: () => _e5, base64url: () => j9, bigint: () => be5, boolean: () => Ze4, browserEmail: () => qt3, cidrv4: () => he7, cidrv6: () => de6, cuid: () => te7, cuid2: () => re6, date: () => ge7, datetime: () => xe5, domain: () => Qt2, duration: () => ue7, e164: () => ze4, email: () => ae6, emoji: () => le7, extendedDuration: () => Vt2, guid: () => ce7, hex: () => er, hostname: () => Xt2, html5Email: () => Gt2, idnEmail: () => Yt2, integer: () => we5, ipv4: () => pe7, ipv6: () => me7, ksuid: () => se8, lowercase: () => Pe6, mac: () => fe7, md5_base64: () => rr, md5_base64url: () => nr, md5_hex: () => tr, nanoid: () => ie7, null: () => ke4, number: () => D8, rfc5322Email: () => Jt2, sha1_base64: () => sr, sha1_base64url: () => ir, sha1_hex: () => or, sha256_base64: () => cr, sha256_base64url: () => ar, sha256_hex: () => ur, sha384_base64: () => pr, sha384_base64url: () => mr, sha384_hex: () => lr, sha512_base64: () => hr, sha512_base64url: () => dr, sha512_hex: () => fr, string: () => $e4, time: () => ve6, ulid: () => ne7, undefined: () => ye7, unicodeEmail: () => De4, uppercase: () => Ae3, uuid: () => I10, uuid4: () => Bt2, uuid6: () => Wt3, uuid7: () => Kt3, xid: () => oe7 });
var te7 = /^[cC][^\s-]{8,}$/;
var re6 = /^[0-9a-z]+$/;
var ne7 = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var oe7 = /^[0-9a-vA-V]{20}$/;
var se8 = /^[A-Za-z0-9]{27}$/;
var ie7 = /^[a-zA-Z0-9_-]{21}$/;
var ue7 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var Vt2 = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var ce7 = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var I10 = (t10) => t10 ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${t10}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
var Bt2 = I10(4);
var Wt3 = I10(6);
var Kt3 = I10(7);
var ae6 = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var Gt2 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var Jt2 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var De4 = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
var Yt2 = De4;
var qt3 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var Ht2 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function le7() {
  return new RegExp(Ht2, "u");
}
var pe7 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var me7 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var fe7 = (t10) => {
  let e8 = H6(t10 ?? ":");
  return new RegExp(`^(?:[0-9A-F]{2}${e8}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${e8}){5}[0-9a-f]{2}$`);
};
var he7 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var de6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var _e5 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var j9 = /^[A-Za-z0-9_-]*$/;
var Xt2 = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
var Qt2 = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
var ze4 = /^\+[1-9]\d{6,14}$/;
var Me5 = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
var ge7 = new RegExp(`^${Me5}$`);
function Ue4(t10) {
  let e8 = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof t10.precision == "number" ? t10.precision === -1 ? `${e8}` : t10.precision === 0 ? `${e8}:[0-5]\\d` : `${e8}:[0-5]\\d\\.\\d{${t10.precision}}` : `${e8}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function ve6(t10) {
  return new RegExp(`^${Ue4(t10)}$`);
}
function xe5(t10) {
  let e8 = Ue4({ precision: t10.precision }), r21 = ["Z"];
  t10.local && r21.push(""), t10.offset && r21.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  let n18 = `${e8}(?:${r21.join("|")})`;
  return new RegExp(`^${Me5}T(?:${n18})$`);
}
var $e4 = (t10) => {
  let e8 = t10 ? `[\\s\\S]{${t10?.minimum ?? 0},${t10?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${e8}$`);
};
var be5 = /^-?\d+n?$/;
var we5 = /^-?\d+$/;
var D8 = /^-?\d+(?:\.\d+)?$/;
var Ze4 = /^(?:true|false)$/i;
var ke4 = /^null$/i;
var ye7 = /^undefined$/i;
var Pe6 = /^[^A-Z]*$/;
var Ae3 = /^[^a-z]*$/;
var er = /^[0-9a-fA-F]*$/;
function T13(t10, e8) {
  return new RegExp(`^[A-Za-z0-9+/]{${t10}}${e8}$`);
}
function C8(t10) {
  return new RegExp(`^[A-Za-z0-9_-]{${t10}}$`);
}
var tr = /^[0-9a-fA-F]{32}$/;
var rr = T13(22, "==");
var nr = C8(22);
var or = /^[0-9a-fA-F]{40}$/;
var sr = T13(27, "=");
var ir = C8(27);
var ur = /^[0-9a-fA-F]{64}$/;
var cr = T13(43, "=");
var ar = C8(43);
var lr = /^[0-9a-fA-F]{96}$/;
var pr = T13(64, "");
var mr = C8(64);
var fr = /^[0-9a-fA-F]{128}$/;
var hr = T13(86, "==");
var dr = C8(86);
var x10 = l6("$ZodCheck", (t10, e8) => {
  var r21;
  t10._zod ?? (t10._zod = {}), t10._zod.def = e8, (r21 = t10._zod).onattach ?? (r21.onattach = []);
});
var Be4 = { number: "number", bigint: "bigint", object: "date" };
var Ee5 = l6("$ZodCheckLessThan", (t10, e8) => {
  x10.init(t10, e8);
  let r21 = Be4[typeof e8.value];
  t10._zod.onattach.push((n18) => {
    let o21 = n18._zod.bag, s20 = (e8.inclusive ? o21.maximum : o21.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    e8.value < s20 && (e8.inclusive ? o21.maximum = e8.value : o21.exclusiveMaximum = e8.value);
  }), t10._zod.check = (n18) => {
    (e8.inclusive ? n18.value <= e8.value : n18.value < e8.value) || n18.issues.push({ origin: r21, code: "too_big", maximum: typeof e8.value == "object" ? e8.value.getTime() : e8.value, input: n18.value, inclusive: e8.inclusive, inst: t10, continue: !e8.abort });
  };
});
var Ie4 = l6("$ZodCheckGreaterThan", (t10, e8) => {
  x10.init(t10, e8);
  let r21 = Be4[typeof e8.value];
  t10._zod.onattach.push((n18) => {
    let o21 = n18._zod.bag, s20 = (e8.inclusive ? o21.minimum : o21.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    e8.value > s20 && (e8.inclusive ? o21.minimum = e8.value : o21.exclusiveMinimum = e8.value);
  }), t10._zod.check = (n18) => {
    (e8.inclusive ? n18.value >= e8.value : n18.value > e8.value) || n18.issues.push({ origin: r21, code: "too_small", minimum: typeof e8.value == "object" ? e8.value.getTime() : e8.value, input: n18.value, inclusive: e8.inclusive, inst: t10, continue: !e8.abort });
  };
});
var We4 = l6("$ZodCheckMultipleOf", (t10, e8) => {
  x10.init(t10, e8), t10._zod.onattach.push((r21) => {
    var n18;
    (n18 = r21._zod.bag).multipleOf ?? (n18.multipleOf = e8.value);
  }), t10._zod.check = (r21) => {
    if (typeof r21.value != typeof e8.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof r21.value == "bigint" ? r21.value % e8.value === BigInt(0) : T11(r21.value, e8.value) === 0) || r21.issues.push({ origin: typeof r21.value, code: "not_multiple_of", divisor: e8.value, input: r21.value, inst: t10, continue: !e8.abort });
  };
});
var Ke4 = l6("$ZodCheckNumberFormat", (t10, e8) => {
  x10.init(t10, e8), e8.format = e8.format || "float64";
  let r21 = e8.format?.includes("int"), n18 = r21 ? "int" : "number", [o21, s20] = Y6[e8.format];
  t10._zod.onattach.push((i20) => {
    let u18 = i20._zod.bag;
    u18.format = e8.format, u18.minimum = o21, u18.maximum = s20, r21 && (u18.pattern = we5);
  }), t10._zod.check = (i20) => {
    let u18 = i20.value;
    if (r21) {
      if (!Number.isInteger(u18)) {
        i20.issues.push({ expected: n18, format: e8.format, code: "invalid_type", continue: false, input: u18, inst: t10 });
        return;
      }
      if (!Number.isSafeInteger(u18)) {
        u18 > 0 ? i20.issues.push({ input: u18, code: "too_big", maximum: Number.MAX_SAFE_INTEGER, note: "Integers must be within the safe integer range.", inst: t10, origin: n18, inclusive: true, continue: !e8.abort }) : i20.issues.push({ input: u18, code: "too_small", minimum: Number.MIN_SAFE_INTEGER, note: "Integers must be within the safe integer range.", inst: t10, origin: n18, inclusive: true, continue: !e8.abort });
        return;
      }
    }
    u18 < o21 && i20.issues.push({ origin: "number", input: u18, code: "too_small", minimum: o21, inclusive: true, inst: t10, continue: !e8.abort }), u18 > s20 && i20.issues.push({ origin: "number", input: u18, code: "too_big", maximum: s20, inclusive: true, inst: t10, continue: !e8.abort });
  };
});
var Ge4 = l6("$ZodCheckBigIntFormat", (t10, e8) => {
  x10.init(t10, e8);
  let [r21, n18] = Z7[e8.format];
  t10._zod.onattach.push((o21) => {
    let s20 = o21._zod.bag;
    s20.format = e8.format, s20.minimum = r21, s20.maximum = n18;
  }), t10._zod.check = (o21) => {
    let s20 = o21.value;
    s20 < r21 && o21.issues.push({ origin: "bigint", input: s20, code: "too_small", minimum: r21, inclusive: true, inst: t10, continue: !e8.abort }), s20 > n18 && o21.issues.push({ origin: "bigint", input: s20, code: "too_big", maximum: n18, inclusive: true, inst: t10, continue: !e8.abort });
  };
});
var Je4 = l6("$ZodCheckMaxSize", (t10, e8) => {
  var r21;
  x10.init(t10, e8), (r21 = t10._zod.def).when ?? (r21.when = (n18) => {
    let o21 = n18.value;
    return !P5(o21) && o21.size !== void 0;
  }), t10._zod.onattach.push((n18) => {
    let o21 = n18._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    e8.maximum < o21 && (n18._zod.bag.maximum = e8.maximum);
  }), t10._zod.check = (n18) => {
    let o21 = n18.value;
    o21.size <= e8.maximum || n18.issues.push({ origin: ae5(o21), code: "too_big", maximum: e8.maximum, inclusive: true, input: o21, inst: t10, continue: !e8.abort });
  };
});
var Ye4 = l6("$ZodCheckMinSize", (t10, e8) => {
  var r21;
  x10.init(t10, e8), (r21 = t10._zod.def).when ?? (r21.when = (n18) => {
    let o21 = n18.value;
    return !P5(o21) && o21.size !== void 0;
  }), t10._zod.onattach.push((n18) => {
    let o21 = n18._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    e8.minimum > o21 && (n18._zod.bag.minimum = e8.minimum);
  }), t10._zod.check = (n18) => {
    let o21 = n18.value;
    o21.size >= e8.minimum || n18.issues.push({ origin: ae5(o21), code: "too_small", minimum: e8.minimum, inclusive: true, input: o21, inst: t10, continue: !e8.abort });
  };
});
var qe5 = l6("$ZodCheckSizeEquals", (t10, e8) => {
  var r21;
  x10.init(t10, e8), (r21 = t10._zod.def).when ?? (r21.when = (n18) => {
    let o21 = n18.value;
    return !P5(o21) && o21.size !== void 0;
  }), t10._zod.onattach.push((n18) => {
    let o21 = n18._zod.bag;
    o21.minimum = e8.size, o21.maximum = e8.size, o21.size = e8.size;
  }), t10._zod.check = (n18) => {
    let o21 = n18.value, s20 = o21.size;
    if (s20 === e8.size) return;
    let i20 = s20 > e8.size;
    n18.issues.push({ origin: ae5(o21), ...i20 ? { code: "too_big", maximum: e8.size } : { code: "too_small", minimum: e8.size }, inclusive: true, exact: true, input: n18.value, inst: t10, continue: !e8.abort });
  };
});
var He5 = l6("$ZodCheckMaxLength", (t10, e8) => {
  var r21;
  x10.init(t10, e8), (r21 = t10._zod.def).when ?? (r21.when = (n18) => {
    let o21 = n18.value;
    return !P5(o21) && o21.length !== void 0;
  }), t10._zod.onattach.push((n18) => {
    let o21 = n18._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    e8.maximum < o21 && (n18._zod.bag.maximum = e8.maximum);
  }), t10._zod.check = (n18) => {
    let o21 = n18.value;
    if (o21.length <= e8.maximum) return;
    let i20 = pe5(o21);
    n18.issues.push({ origin: i20, code: "too_big", maximum: e8.maximum, inclusive: true, input: o21, inst: t10, continue: !e8.abort });
  };
});
var Xe4 = l6("$ZodCheckMinLength", (t10, e8) => {
  var r21;
  x10.init(t10, e8), (r21 = t10._zod.def).when ?? (r21.when = (n18) => {
    let o21 = n18.value;
    return !P5(o21) && o21.length !== void 0;
  }), t10._zod.onattach.push((n18) => {
    let o21 = n18._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    e8.minimum > o21 && (n18._zod.bag.minimum = e8.minimum);
  }), t10._zod.check = (n18) => {
    let o21 = n18.value;
    if (o21.length >= e8.minimum) return;
    let i20 = pe5(o21);
    n18.issues.push({ origin: i20, code: "too_small", minimum: e8.minimum, inclusive: true, input: o21, inst: t10, continue: !e8.abort });
  };
});
var Qe4 = l6("$ZodCheckLengthEquals", (t10, e8) => {
  var r21;
  x10.init(t10, e8), (r21 = t10._zod.def).when ?? (r21.when = (n18) => {
    let o21 = n18.value;
    return !P5(o21) && o21.length !== void 0;
  }), t10._zod.onattach.push((n18) => {
    let o21 = n18._zod.bag;
    o21.minimum = e8.length, o21.maximum = e8.length, o21.length = e8.length;
  }), t10._zod.check = (n18) => {
    let o21 = n18.value, s20 = o21.length;
    if (s20 === e8.length) return;
    let i20 = pe5(o21), u18 = s20 > e8.length;
    n18.issues.push({ origin: i20, ...u18 ? { code: "too_big", maximum: e8.length } : { code: "too_small", minimum: e8.length }, inclusive: true, exact: true, input: n18.value, inst: t10, continue: !e8.abort });
  };
});
var R14 = l6("$ZodCheckStringFormat", (t10, e8) => {
  var r21, n18;
  x10.init(t10, e8), t10._zod.onattach.push((o21) => {
    let s20 = o21._zod.bag;
    s20.format = e8.format, e8.pattern && (s20.patterns ?? (s20.patterns = /* @__PURE__ */ new Set()), s20.patterns.add(e8.pattern));
  }), e8.pattern ? (r21 = t10._zod).check ?? (r21.check = (o21) => {
    e8.pattern.lastIndex = 0, !e8.pattern.test(o21.value) && o21.issues.push({ origin: "string", code: "invalid_format", format: e8.format, input: o21.value, ...e8.pattern ? { pattern: e8.pattern.toString() } : {}, inst: t10, continue: !e8.abort });
  }) : (n18 = t10._zod).check ?? (n18.check = () => {
  });
});
var et4 = l6("$ZodCheckRegex", (t10, e8) => {
  R14.init(t10, e8), t10._zod.check = (r21) => {
    e8.pattern.lastIndex = 0, !e8.pattern.test(r21.value) && r21.issues.push({ origin: "string", code: "invalid_format", format: "regex", input: r21.value, pattern: e8.pattern.toString(), inst: t10, continue: !e8.abort });
  };
});
var tt4 = l6("$ZodCheckLowerCase", (t10, e8) => {
  e8.pattern ?? (e8.pattern = Pe6), R14.init(t10, e8);
});
var rt4 = l6("$ZodCheckUpperCase", (t10, e8) => {
  e8.pattern ?? (e8.pattern = Ae3), R14.init(t10, e8);
});
var nt4 = l6("$ZodCheckIncludes", (t10, e8) => {
  x10.init(t10, e8);
  let r21 = H6(e8.includes), n18 = new RegExp(typeof e8.position == "number" ? `^.{${e8.position}}${r21}` : r21);
  e8.pattern = n18, t10._zod.onattach.push((o21) => {
    let s20 = o21._zod.bag;
    s20.patterns ?? (s20.patterns = /* @__PURE__ */ new Set()), s20.patterns.add(n18);
  }), t10._zod.check = (o21) => {
    o21.value.includes(e8.includes, e8.position) || o21.issues.push({ origin: "string", code: "invalid_format", format: "includes", includes: e8.includes, input: o21.value, inst: t10, continue: !e8.abort });
  };
});
var ot4 = l6("$ZodCheckStartsWith", (t10, e8) => {
  x10.init(t10, e8);
  let r21 = new RegExp(`^${H6(e8.prefix)}.*`);
  e8.pattern ?? (e8.pattern = r21), t10._zod.onattach.push((n18) => {
    let o21 = n18._zod.bag;
    o21.patterns ?? (o21.patterns = /* @__PURE__ */ new Set()), o21.patterns.add(r21);
  }), t10._zod.check = (n18) => {
    n18.value.startsWith(e8.prefix) || n18.issues.push({ origin: "string", code: "invalid_format", format: "starts_with", prefix: e8.prefix, input: n18.value, inst: t10, continue: !e8.abort });
  };
});
var st3 = l6("$ZodCheckEndsWith", (t10, e8) => {
  x10.init(t10, e8);
  let r21 = new RegExp(`.*${H6(e8.suffix)}$`);
  e8.pattern ?? (e8.pattern = r21), t10._zod.onattach.push((n18) => {
    let o21 = n18._zod.bag;
    o21.patterns ?? (o21.patterns = /* @__PURE__ */ new Set()), o21.patterns.add(r21);
  }), t10._zod.check = (n18) => {
    n18.value.endsWith(e8.suffix) || n18.issues.push({ origin: "string", code: "invalid_format", format: "ends_with", suffix: e8.suffix, input: n18.value, inst: t10, continue: !e8.abort });
  };
});
function Ve4(t10, e8, r21) {
  t10.issues.length && e8.issues.push(...ue5(r21, t10.issues));
}
var it4 = l6("$ZodCheckProperty", (t10, e8) => {
  x10.init(t10, e8), t10._zod.check = (r21) => {
    let n18 = e8.schema._zod.run({ value: r21.value[e8.property], issues: [] }, {});
    if (n18 instanceof Promise) return n18.then((o21) => Ve4(o21, r21, e8.property));
    Ve4(n18, r21, e8.property);
  };
});
var ut4 = l6("$ZodCheckMimeType", (t10, e8) => {
  x10.init(t10, e8);
  let r21 = new Set(e8.mime);
  t10._zod.onattach.push((n18) => {
    n18._zod.bag.mime = e8.mime;
  }), t10._zod.check = (n18) => {
    r21.has(n18.value.type) || n18.issues.push({ code: "invalid_value", values: e8.mime, input: n18.value.type, inst: t10, continue: !e8.abort });
  };
});
var ct4 = l6("$ZodCheckOverwrite", (t10, e8) => {
  x10.init(t10, e8), t10._zod.check = (r21) => {
    r21.value = e8.tx(r21.value);
  };
});
var U6 = class {
  constructor(e8 = []) {
    this.content = [], this.indent = 0, this && (this.args = e8);
  }
  indented(e8) {
    this.indent += 1, e8(this), this.indent -= 1;
  }
  write(e8) {
    if (typeof e8 == "function") {
      e8(this, { execution: "sync" }), e8(this, { execution: "async" });
      return;
    }
    let n18 = e8.split(`
`).filter((i20) => i20), o21 = Math.min(...n18.map((i20) => i20.length - i20.trimStart().length)), s20 = n18.map((i20) => i20.slice(o21)).map((i20) => " ".repeat(this.indent * 2) + i20);
    for (let i20 of s20) this.content.push(i20);
  }
  compile() {
    let e8 = Function, r21 = this?.args, o21 = [...(this?.content ?? [""]).map((s20) => `  ${s20}`)];
    return new e8(...r21, o21.join(`
`));
  }
};
var lt4 = { major: 4, minor: 3, patch: 6 };
var _14 = l6("$ZodType", (t10, e8) => {
  var r21;
  t10 ?? (t10 = {}), t10._zod.def = e8, t10._zod.bag = t10._zod.bag || {}, t10._zod.version = lt4;
  let n18 = [...t10._zod.def.checks ?? []];
  t10._zod.traits.has("$ZodCheck") && n18.unshift(t10);
  for (let o21 of n18) for (let s20 of o21._zod.onattach) s20(t10);
  if (n18.length === 0) (r21 = t10._zod).deferred ?? (r21.deferred = []), t10._zod.deferred?.push(() => {
    t10._zod.run = t10._zod.parse;
  });
  else {
    let o21 = (i20, u18, c19) => {
      let m16 = se5(i20), f17;
      for (let h17 of u18) {
        if (h17._zod.def.when) {
          if (!h17._zod.def.when(i20)) continue;
        } else if (m16) continue;
        let d13 = i20.issues.length, z13 = h17._zod.check(i20);
        if (z13 instanceof Promise && c19?.async === false) throw new A11();
        if (f17 || z13 instanceof Promise) f17 = (f17 ?? Promise.resolve()).then(async () => {
          await z13, i20.issues.length !== d13 && (m16 || (m16 = se5(i20, d13)));
        });
        else {
          if (i20.issues.length === d13) continue;
          m16 || (m16 = se5(i20, d13));
        }
      }
      return f17 ? f17.then(() => i20) : i20;
    }, s20 = (i20, u18, c19) => {
      if (se5(i20)) return i20.aborted = true, i20;
      let m16 = o21(u18, n18, c19);
      if (m16 instanceof Promise) {
        if (c19.async === false) throw new A11();
        return m16.then((f17) => t10._zod.parse(f17, c19));
      }
      return t10._zod.parse(m16, c19);
    };
    t10._zod.run = (i20, u18) => {
      if (u18.skipChecks) return t10._zod.parse(i20, u18);
      if (u18.direction === "backward") {
        let m16 = t10._zod.parse({ value: i20.value, issues: [] }, { ...u18, skipChecks: true });
        return m16 instanceof Promise ? m16.then((f17) => s20(f17, i20, u18)) : s20(m16, i20, u18);
      }
      let c19 = t10._zod.parse(i20, u18);
      if (c19 instanceof Promise) {
        if (u18.async === false) throw new A11();
        return c19.then((m16) => o21(m16, n18, u18));
      }
      return o21(c19, n18, u18);
    };
  }
  v7(t10, "~standard", () => ({ validate: (o21) => {
    try {
      let s20 = Le4(t10, o21);
      return s20.success ? { value: s20.data } : { issues: s20.error?.issues };
    } catch {
      return Fe4(t10, o21).then((i20) => i20.success ? { value: i20.data } : { issues: i20.error?.issues });
    }
  }, vendor: "zod", version: 1 }));
});
var Te4 = l6("$ZodString", (t10, e8) => {
  _14.init(t10, e8), t10._zod.pattern = [...t10?._zod.bag?.patterns ?? []].pop() ?? $e4(t10._zod.bag), t10._zod.parse = (r21, n18) => {
    if (e8.coerce) try {
      r21.value = String(r21.value);
    } catch {
    }
    return typeof r21.value == "string" || r21.issues.push({ expected: "string", code: "invalid_type", input: r21.value, inst: t10 }), r21;
  };
});
var v9 = l6("$ZodStringFormat", (t10, e8) => {
  R14.init(t10, e8), Te4.init(t10, e8);
});
var on = l6("$ZodGUID", (t10, e8) => {
  e8.pattern ?? (e8.pattern = ce7), v9.init(t10, e8);
});
var sn = l6("$ZodUUID", (t10, e8) => {
  if (e8.version) {
    let n18 = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[e8.version];
    if (n18 === void 0) throw new Error(`Invalid UUID version: "${e8.version}"`);
    e8.pattern ?? (e8.pattern = I10(n18));
  } else e8.pattern ?? (e8.pattern = I10());
  v9.init(t10, e8);
});
var un = l6("$ZodEmail", (t10, e8) => {
  e8.pattern ?? (e8.pattern = ae6), v9.init(t10, e8);
});
var cn = l6("$ZodURL", (t10, e8) => {
  v9.init(t10, e8), t10._zod.check = (r21) => {
    try {
      let n18 = r21.value.trim(), o21 = new URL(n18);
      e8.hostname && (e8.hostname.lastIndex = 0, e8.hostname.test(o21.hostname) || r21.issues.push({ code: "invalid_format", format: "url", note: "Invalid hostname", pattern: e8.hostname.source, input: r21.value, inst: t10, continue: !e8.abort })), e8.protocol && (e8.protocol.lastIndex = 0, e8.protocol.test(o21.protocol.endsWith(":") ? o21.protocol.slice(0, -1) : o21.protocol) || r21.issues.push({ code: "invalid_format", format: "url", note: "Invalid protocol", pattern: e8.protocol.source, input: r21.value, inst: t10, continue: !e8.abort })), e8.normalize ? r21.value = o21.href : r21.value = n18;
      return;
    } catch {
      r21.issues.push({ code: "invalid_format", format: "url", input: r21.value, inst: t10, continue: !e8.abort });
    }
  };
});
var an = l6("$ZodEmoji", (t10, e8) => {
  e8.pattern ?? (e8.pattern = le7()), v9.init(t10, e8);
});
var ln = l6("$ZodNanoID", (t10, e8) => {
  e8.pattern ?? (e8.pattern = ie7), v9.init(t10, e8);
});
var pn = l6("$ZodCUID", (t10, e8) => {
  e8.pattern ?? (e8.pattern = te7), v9.init(t10, e8);
});
var mn = l6("$ZodCUID2", (t10, e8) => {
  e8.pattern ?? (e8.pattern = re6), v9.init(t10, e8);
});
var fn = l6("$ZodULID", (t10, e8) => {
  e8.pattern ?? (e8.pattern = ne7), v9.init(t10, e8);
});
var hn = l6("$ZodXID", (t10, e8) => {
  e8.pattern ?? (e8.pattern = oe7), v9.init(t10, e8);
});
var dn = l6("$ZodKSUID", (t10, e8) => {
  e8.pattern ?? (e8.pattern = se8), v9.init(t10, e8);
});
var _n = l6("$ZodISODateTime", (t10, e8) => {
  e8.pattern ?? (e8.pattern = xe5(e8)), v9.init(t10, e8);
});
var zn = l6("$ZodISODate", (t10, e8) => {
  e8.pattern ?? (e8.pattern = ge7), v9.init(t10, e8);
});
var gn = l6("$ZodISOTime", (t10, e8) => {
  e8.pattern ?? (e8.pattern = ve6(e8)), v9.init(t10, e8);
});
var vn = l6("$ZodISODuration", (t10, e8) => {
  e8.pattern ?? (e8.pattern = ue7), v9.init(t10, e8);
});
var xn = l6("$ZodIPv4", (t10, e8) => {
  e8.pattern ?? (e8.pattern = pe7), v9.init(t10, e8), t10._zod.bag.format = "ipv4";
});
var $n = l6("$ZodIPv6", (t10, e8) => {
  e8.pattern ?? (e8.pattern = me7), v9.init(t10, e8), t10._zod.bag.format = "ipv6", t10._zod.check = (r21) => {
    try {
      new URL(`http://[${r21.value}]`);
    } catch {
      r21.issues.push({ code: "invalid_format", format: "ipv6", input: r21.value, inst: t10, continue: !e8.abort });
    }
  };
});
var bn = l6("$ZodMAC", (t10, e8) => {
  e8.pattern ?? (e8.pattern = fe7(e8.delimiter)), v9.init(t10, e8), t10._zod.bag.format = "mac";
});
var wn = l6("$ZodCIDRv4", (t10, e8) => {
  e8.pattern ?? (e8.pattern = he7), v9.init(t10, e8);
});
var Zn = l6("$ZodCIDRv6", (t10, e8) => {
  e8.pattern ?? (e8.pattern = de6), v9.init(t10, e8), t10._zod.check = (r21) => {
    let n18 = r21.value.split("/");
    try {
      if (n18.length !== 2) throw new Error();
      let [o21, s20] = n18;
      if (!s20) throw new Error();
      let i20 = Number(s20);
      if (`${i20}` !== s20) throw new Error();
      if (i20 < 0 || i20 > 128) throw new Error();
      new URL(`http://[${o21}]`);
    } catch {
      r21.issues.push({ code: "invalid_format", format: "cidrv6", input: r21.value, inst: t10, continue: !e8.abort });
    }
  };
});
function bt4(t10) {
  if (t10 === "") return true;
  if (t10.length % 4 !== 0) return false;
  try {
    return atob(t10), true;
  } catch {
    return false;
  }
}
var kn = l6("$ZodBase64", (t10, e8) => {
  e8.pattern ?? (e8.pattern = _e5), v9.init(t10, e8), t10._zod.bag.contentEncoding = "base64", t10._zod.check = (r21) => {
    bt4(r21.value) || r21.issues.push({ code: "invalid_format", format: "base64", input: r21.value, inst: t10, continue: !e8.abort });
  };
});
function _r(t10) {
  if (!j9.test(t10)) return false;
  let e8 = t10.replace(/[-_]/g, (n18) => n18 === "-" ? "+" : "/"), r21 = e8.padEnd(Math.ceil(e8.length / 4) * 4, "=");
  return bt4(r21);
}
var yn = l6("$ZodBase64URL", (t10, e8) => {
  e8.pattern ?? (e8.pattern = j9), v9.init(t10, e8), t10._zod.bag.contentEncoding = "base64url", t10._zod.check = (r21) => {
    _r(r21.value) || r21.issues.push({ code: "invalid_format", format: "base64url", input: r21.value, inst: t10, continue: !e8.abort });
  };
});
var Pn = l6("$ZodE164", (t10, e8) => {
  e8.pattern ?? (e8.pattern = ze4), v9.init(t10, e8);
});
function zr(t10, e8 = null) {
  try {
    let r21 = t10.split(".");
    if (r21.length !== 3) return false;
    let [n18] = r21;
    if (!n18) return false;
    let o21 = JSON.parse(atob(n18));
    return !("typ" in o21 && o21?.typ !== "JWT" || !o21.alg || e8 && (!("alg" in o21) || o21.alg !== e8));
  } catch {
    return false;
  }
}
var An = l6("$ZodJWT", (t10, e8) => {
  v9.init(t10, e8), t10._zod.check = (r21) => {
    zr(r21.value, e8.alg) || r21.issues.push({ code: "invalid_format", format: "jwt", input: r21.value, inst: t10, continue: !e8.abort });
  };
});
var En = l6("$ZodCustomStringFormat", (t10, e8) => {
  v9.init(t10, e8), t10._zod.check = (r21) => {
    e8.fn(r21.value) || r21.issues.push({ code: "invalid_format", format: e8.format, input: r21.value, inst: t10, continue: !e8.abort });
  };
});
var gr = l6("$ZodNumber", (t10, e8) => {
  _14.init(t10, e8), t10._zod.pattern = t10._zod.bag.pattern ?? D8, t10._zod.parse = (r21, n18) => {
    if (e8.coerce) try {
      r21.value = Number(r21.value);
    } catch {
    }
    let o21 = r21.value;
    if (typeof o21 == "number" && !Number.isNaN(o21) && Number.isFinite(o21)) return r21;
    let s20 = typeof o21 == "number" ? Number.isNaN(o21) ? "NaN" : Number.isFinite(o21) ? void 0 : "Infinity" : void 0;
    return r21.issues.push({ expected: "number", code: "invalid_type", input: o21, inst: t10, ...s20 ? { received: s20 } : {} }), r21;
  };
});
var In = l6("$ZodNumberFormat", (t10, e8) => {
  Ke4.init(t10, e8), gr.init(t10, e8);
});
var wt4 = l6("$ZodBoolean", (t10, e8) => {
  _14.init(t10, e8), t10._zod.pattern = Ze4, t10._zod.parse = (r21, n18) => {
    if (e8.coerce) try {
      r21.value = !!r21.value;
    } catch {
    }
    let o21 = r21.value;
    return typeof o21 == "boolean" || r21.issues.push({ expected: "boolean", code: "invalid_type", input: o21, inst: t10 }), r21;
  };
});
var vr = l6("$ZodBigInt", (t10, e8) => {
  _14.init(t10, e8), t10._zod.pattern = be5, t10._zod.parse = (r21, n18) => {
    if (e8.coerce) try {
      r21.value = BigInt(r21.value);
    } catch {
    }
    return typeof r21.value == "bigint" || r21.issues.push({ expected: "bigint", code: "invalid_type", input: r21.value, inst: t10 }), r21;
  };
});
var Sn = l6("$ZodBigIntFormat", (t10, e8) => {
  Ge4.init(t10, e8), vr.init(t10, e8);
});
var Tn = l6("$ZodSymbol", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => {
    let o21 = r21.value;
    return typeof o21 == "symbol" || r21.issues.push({ expected: "symbol", code: "invalid_type", input: o21, inst: t10 }), r21;
  };
});
var Cn = l6("$ZodUndefined", (t10, e8) => {
  _14.init(t10, e8), t10._zod.pattern = ye7, t10._zod.values = /* @__PURE__ */ new Set([void 0]), t10._zod.optin = "optional", t10._zod.optout = "optional", t10._zod.parse = (r21, n18) => {
    let o21 = r21.value;
    return typeof o21 > "u" || r21.issues.push({ expected: "undefined", code: "invalid_type", input: o21, inst: t10 }), r21;
  };
});
var Rn = l6("$ZodNull", (t10, e8) => {
  _14.init(t10, e8), t10._zod.pattern = ke4, t10._zod.values = /* @__PURE__ */ new Set([null]), t10._zod.parse = (r21, n18) => {
    let o21 = r21.value;
    return o21 === null || r21.issues.push({ expected: "null", code: "invalid_type", input: o21, inst: t10 }), r21;
  };
});
var On = l6("$ZodAny", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21) => r21;
});
var Nn = l6("$ZodUnknown", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21) => r21;
});
var Ln = l6("$ZodNever", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => (r21.issues.push({ expected: "never", code: "invalid_type", input: r21.value, inst: t10 }), r21);
});
var Fn = l6("$ZodVoid", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => {
    let o21 = r21.value;
    return typeof o21 > "u" || r21.issues.push({ expected: "void", code: "invalid_type", input: o21, inst: t10 }), r21;
  };
});
var jn = l6("$ZodDate", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => {
    if (e8.coerce) try {
      r21.value = new Date(r21.value);
    } catch {
    }
    let o21 = r21.value, s20 = o21 instanceof Date;
    return s20 && !Number.isNaN(o21.getTime()) || r21.issues.push({ expected: "date", code: "invalid_type", input: o21, ...s20 ? { received: "Invalid Date" } : {}, inst: t10 }), r21;
  };
});
function pt3(t10, e8, r21) {
  t10.issues.length && e8.issues.push(...ue5(r21, t10.issues)), e8.value[r21] = t10.value;
}
var Dn = l6("$ZodArray", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => {
    let o21 = r21.value;
    if (!Array.isArray(o21)) return r21.issues.push({ expected: "array", code: "invalid_type", input: o21, inst: t10 }), r21;
    r21.value = Array(o21.length);
    let s20 = [];
    for (let i20 = 0; i20 < o21.length; i20++) {
      let u18 = o21[i20], c19 = e8.element._zod.run({ value: u18, issues: [] }, n18);
      c19 instanceof Promise ? s20.push(c19.then((m16) => pt3(m16, r21, i20))) : pt3(c19, r21, i20);
    }
    return s20.length ? Promise.all(s20).then(() => r21) : r21;
  };
});
function G8(t10, e8, r21, n18, o21) {
  if (t10.issues.length) {
    if (o21 && !(r21 in n18)) return;
    e8.issues.push(...ue5(r21, t10.issues));
  }
  t10.value === void 0 ? r21 in n18 && (e8.value[r21] = void 0) : e8.value[r21] = t10.value;
}
function Zt2(t10) {
  let e8 = Object.keys(t10.shape);
  for (let n18 of e8) if (!t10.shape?.[n18]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${n18}": expected a Zod schema`);
  let r21 = Q5(t10.shape);
  return { ...t10, keys: e8, keySet: new Set(e8), numKeys: e8.length, optionalKeys: new Set(r21) };
}
function kt4(t10, e8, r21, n18, o21, s20) {
  let i20 = [], u18 = o21.keySet, c19 = o21.catchall._zod, m16 = c19.def.type, f17 = c19.optout === "optional";
  for (let h17 in e8) {
    if (u18.has(h17)) continue;
    if (m16 === "never") {
      i20.push(h17);
      continue;
    }
    let d13 = c19.run({ value: e8[h17], issues: [] }, n18);
    d13 instanceof Promise ? t10.push(d13.then((z13) => G8(z13, r21, h17, e8, f17))) : G8(d13, r21, h17, e8, f17);
  }
  return i20.length && r21.issues.push({ code: "unrecognized_keys", keys: i20, input: e8, inst: s20 }), t10.length ? Promise.all(t10).then(() => r21) : r21;
}
var xr = l6("$ZodObject", (t10, e8) => {
  if (_14.init(t10, e8), !Object.getOwnPropertyDescriptor(e8, "shape")?.get) {
    let u18 = e8.shape;
    Object.defineProperty(e8, "shape", { get: () => {
      let c19 = { ...u18 };
      return Object.defineProperty(e8, "shape", { value: c19 }), c19;
    } });
  }
  let n18 = x8(() => Zt2(e8));
  v7(t10._zod, "propValues", () => {
    let u18 = e8.shape, c19 = {};
    for (let m16 in u18) {
      let f17 = u18[m16]._zod;
      if (f17.values) {
        c19[m16] ?? (c19[m16] = /* @__PURE__ */ new Set());
        for (let h17 of f17.values) c19[m16].add(h17);
      }
    }
    return c19;
  });
  let o21 = y7, s20 = e8.catchall, i20;
  t10._zod.parse = (u18, c19) => {
    i20 ?? (i20 = n18.value);
    let m16 = u18.value;
    if (!o21(m16)) return u18.issues.push({ expected: "object", code: "invalid_type", input: m16, inst: t10 }), u18;
    u18.value = {};
    let f17 = [], h17 = i20.shape;
    for (let d13 of i20.keys) {
      let z13 = h17[d13], $10 = z13._zod.optout === "optional", y15 = z13._zod.run({ value: m16[d13], issues: [] }, c19);
      y15 instanceof Promise ? f17.push(y15.then((L14) => G8(L14, u18, d13, m16, $10))) : G8(y15, u18, d13, m16, $10);
    }
    return s20 ? kt4(f17, m16, u18, c19, n18.value, t10) : f17.length ? Promise.all(f17).then(() => u18) : u18;
  };
});
var Mn = l6("$ZodObjectJIT", (t10, e8) => {
  xr.init(t10, e8);
  let r21 = t10._zod.parse, n18 = x8(() => Zt2(e8)), o21 = (d13) => {
    let z13 = new U6(["shape", "payload", "ctx"]), $10 = n18.value, y15 = (P12) => {
      let b12 = F5(P12);
      return `shape[${b12}]._zod.run({ value: input[${b12}], issues: [] }, ctx)`;
    };
    z13.write("const input = payload.value;");
    let L14 = /* @__PURE__ */ Object.create(null), At3 = 0;
    for (let P12 of $10.keys) L14[P12] = `key_${At3++}`;
    z13.write("const newResult = {};");
    for (let P12 of $10.keys) {
      let b12 = L14[P12], k13 = F5(P12), It3 = d13[P12]?._zod?.optout === "optional";
      z13.write(`const ${b12} = ${y15(P12)};`), It3 ? z13.write(`
        if (${b12}.issues.length) {
          if (${k13} in input) {
            payload.issues = payload.issues.concat(${b12}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k13}, ...iss.path] : [${k13}]
            })));
          }
        }
        
        if (${b12}.value === undefined) {
          if (${k13} in input) {
            newResult[${k13}] = undefined;
          }
        } else {
          newResult[${k13}] = ${b12}.value;
        }
        
      `) : z13.write(`
        if (${b12}.issues.length) {
          payload.issues = payload.issues.concat(${b12}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k13}, ...iss.path] : [${k13}]
          })));
        }
        
        if (${b12}.value === undefined) {
          if (${k13} in input) {
            newResult[${k13}] = undefined;
          }
        } else {
          newResult[${k13}] = ${b12}.value;
        }
        
      `);
    }
    z13.write("payload.value = newResult;"), z13.write("return payload;");
    let Et4 = z13.compile();
    return (P12, b12) => Et4(d13, P12, b12);
  }, s20, i20 = y7, u18 = !F7.jitless, m16 = u18 && G6.value, f17 = e8.catchall, h17;
  t10._zod.parse = (d13, z13) => {
    h17 ?? (h17 = n18.value);
    let $10 = d13.value;
    return i20($10) ? u18 && m16 && z13?.async === false && z13.jitless !== true ? (s20 || (s20 = o21(e8.shape)), d13 = s20(d13, z13), f17 ? kt4([], $10, d13, z13, h17, t10) : d13) : r21(d13, z13) : (d13.issues.push({ expected: "object", code: "invalid_type", input: $10, inst: t10 }), d13);
  };
});
function mt4(t10, e8, r21, n18) {
  for (let s20 of t10) if (s20.issues.length === 0) return e8.value = s20.value, e8;
  let o21 = t10.filter((s20) => !se5(s20));
  return o21.length === 1 ? (e8.value = o21[0].value, o21[0]) : (e8.issues.push({ code: "invalid_union", input: e8.value, inst: r21, errors: t10.map((s20) => s20.issues.map((i20) => fe5(i20, n18, w15()))) }), e8);
}
var yt4 = l6("$ZodUnion", (t10, e8) => {
  _14.init(t10, e8), v7(t10._zod, "optin", () => e8.options.some((o21) => o21._zod.optin === "optional") ? "optional" : void 0), v7(t10._zod, "optout", () => e8.options.some((o21) => o21._zod.optout === "optional") ? "optional" : void 0), v7(t10._zod, "values", () => {
    if (e8.options.every((o21) => o21._zod.values)) return new Set(e8.options.flatMap((o21) => Array.from(o21._zod.values)));
  }), v7(t10._zod, "pattern", () => {
    if (e8.options.every((o21) => o21._zod.pattern)) {
      let o21 = e8.options.map((s20) => s20._zod.pattern);
      return new RegExp(`^(${o21.map((s20) => I8(s20.source)).join("|")})$`);
    }
  });
  let r21 = e8.options.length === 1, n18 = e8.options[0]._zod.run;
  t10._zod.parse = (o21, s20) => {
    if (r21) return n18(o21, s20);
    let i20 = false, u18 = [];
    for (let c19 of e8.options) {
      let m16 = c19._zod.run({ value: o21.value, issues: [] }, s20);
      if (m16 instanceof Promise) u18.push(m16), i20 = true;
      else {
        if (m16.issues.length === 0) return m16;
        u18.push(m16);
      }
    }
    return i20 ? Promise.all(u18).then((c19) => mt4(c19, o21, t10, s20)) : mt4(u18, o21, t10, s20);
  };
});
function ft4(t10, e8, r21, n18) {
  let o21 = t10.filter((s20) => s20.issues.length === 0);
  return o21.length === 1 ? (e8.value = o21[0].value, e8) : (o21.length === 0 ? e8.issues.push({ code: "invalid_union", input: e8.value, inst: r21, errors: t10.map((s20) => s20.issues.map((i20) => fe5(i20, n18, w15()))) }) : e8.issues.push({ code: "invalid_union", input: e8.value, inst: r21, errors: [], inclusive: false }), e8);
}
var Un = l6("$ZodXor", (t10, e8) => {
  yt4.init(t10, e8), e8.inclusive = false;
  let r21 = e8.options.length === 1, n18 = e8.options[0]._zod.run;
  t10._zod.parse = (o21, s20) => {
    if (r21) return n18(o21, s20);
    let i20 = false, u18 = [];
    for (let c19 of e8.options) {
      let m16 = c19._zod.run({ value: o21.value, issues: [] }, s20);
      m16 instanceof Promise ? (u18.push(m16), i20 = true) : u18.push(m16);
    }
    return i20 ? Promise.all(u18).then((c19) => ft4(c19, o21, t10, s20)) : ft4(u18, o21, t10, s20);
  };
});
var Vn = l6("$ZodDiscriminatedUnion", (t10, e8) => {
  e8.inclusive = false, yt4.init(t10, e8);
  let r21 = t10._zod.parse;
  v7(t10._zod, "propValues", () => {
    let o21 = {};
    for (let s20 of e8.options) {
      let i20 = s20._zod.propValues;
      if (!i20 || Object.keys(i20).length === 0) throw new Error(`Invalid discriminated union option at index "${e8.options.indexOf(s20)}"`);
      for (let [u18, c19] of Object.entries(i20)) {
        o21[u18] || (o21[u18] = /* @__PURE__ */ new Set());
        for (let m16 of c19) o21[u18].add(m16);
      }
    }
    return o21;
  });
  let n18 = x8(() => {
    let o21 = e8.options, s20 = /* @__PURE__ */ new Map();
    for (let i20 of o21) {
      let u18 = i20._zod.propValues?.[e8.discriminator];
      if (!u18 || u18.size === 0) throw new Error(`Invalid discriminated union option at index "${e8.options.indexOf(i20)}"`);
      for (let c19 of u18) {
        if (s20.has(c19)) throw new Error(`Duplicate discriminator value "${String(c19)}"`);
        s20.set(c19, i20);
      }
    }
    return s20;
  });
  t10._zod.parse = (o21, s20) => {
    let i20 = o21.value;
    if (!y7(i20)) return o21.issues.push({ code: "invalid_type", expected: "object", input: i20, inst: t10 }), o21;
    let u18 = n18.value.get(i20?.[e8.discriminator]);
    return u18 ? u18._zod.run(o21, s20) : e8.unionFallback ? r21(o21, s20) : (o21.issues.push({ code: "invalid_union", errors: [], note: "No matching discriminator", discriminator: e8.discriminator, input: i20, path: [e8.discriminator], inst: t10 }), o21);
  };
});
var Bn = l6("$ZodIntersection", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => {
    let o21 = r21.value, s20 = e8.left._zod.run({ value: o21, issues: [] }, n18), i20 = e8.right._zod.run({ value: o21, issues: [] }, n18);
    return s20 instanceof Promise || i20 instanceof Promise ? Promise.all([s20, i20]).then(([c19, m16]) => ht3(r21, c19, m16)) : ht3(r21, s20, i20);
  };
});
function Se4(t10, e8) {
  if (t10 === e8) return { valid: true, data: t10 };
  if (t10 instanceof Date && e8 instanceof Date && +t10 == +e8) return { valid: true, data: t10 };
  if (h6(t10) && h6(e8)) {
    let r21 = Object.keys(e8), n18 = Object.keys(t10).filter((s20) => r21.indexOf(s20) !== -1), o21 = { ...t10, ...e8 };
    for (let s20 of n18) {
      let i20 = Se4(t10[s20], e8[s20]);
      if (!i20.valid) return { valid: false, mergeErrorPath: [s20, ...i20.mergeErrorPath] };
      o21[s20] = i20.data;
    }
    return { valid: true, data: o21 };
  }
  if (Array.isArray(t10) && Array.isArray(e8)) {
    if (t10.length !== e8.length) return { valid: false, mergeErrorPath: [] };
    let r21 = [];
    for (let n18 = 0; n18 < t10.length; n18++) {
      let o21 = t10[n18], s20 = e8[n18], i20 = Se4(o21, s20);
      if (!i20.valid) return { valid: false, mergeErrorPath: [n18, ...i20.mergeErrorPath] };
      r21.push(i20.data);
    }
    return { valid: true, data: r21 };
  }
  return { valid: false, mergeErrorPath: [] };
}
function ht3(t10, e8, r21) {
  let n18 = /* @__PURE__ */ new Map(), o21;
  for (let u18 of e8.issues) if (u18.code === "unrecognized_keys") {
    o21 ?? (o21 = u18);
    for (let c19 of u18.keys) n18.has(c19) || n18.set(c19, {}), n18.get(c19).l = true;
  } else t10.issues.push(u18);
  for (let u18 of r21.issues) if (u18.code === "unrecognized_keys") for (let c19 of u18.keys) n18.has(c19) || n18.set(c19, {}), n18.get(c19).r = true;
  else t10.issues.push(u18);
  let s20 = [...n18].filter(([, u18]) => u18.l && u18.r).map(([u18]) => u18);
  if (s20.length && o21 && t10.issues.push({ ...o21, keys: s20 }), se5(t10)) return t10;
  let i20 = Se4(e8.value, r21.value);
  if (!i20.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(i20.mergeErrorPath)}`);
  return t10.value = i20.data, t10;
}
var $r = l6("$ZodTuple", (t10, e8) => {
  _14.init(t10, e8);
  let r21 = e8.items;
  t10._zod.parse = (n18, o21) => {
    let s20 = n18.value;
    if (!Array.isArray(s20)) return n18.issues.push({ input: s20, inst: t10, expected: "tuple", code: "invalid_type" }), n18;
    n18.value = [];
    let i20 = [], u18 = [...r21].reverse().findIndex((f17) => f17._zod.optin !== "optional"), c19 = u18 === -1 ? 0 : r21.length - u18;
    if (!e8.rest) {
      let f17 = s20.length > r21.length, h17 = s20.length < c19 - 1;
      if (f17 || h17) return n18.issues.push({ ...f17 ? { code: "too_big", maximum: r21.length, inclusive: true } : { code: "too_small", minimum: r21.length }, input: s20, inst: t10, origin: "array" }), n18;
    }
    let m16 = -1;
    for (let f17 of r21) {
      if (m16++, m16 >= s20.length && m16 >= c19) continue;
      let h17 = f17._zod.run({ value: s20[m16], issues: [] }, o21);
      h17 instanceof Promise ? i20.push(h17.then((d13) => V6(d13, n18, m16))) : V6(h17, n18, m16);
    }
    if (e8.rest) {
      let f17 = s20.slice(r21.length);
      for (let h17 of f17) {
        m16++;
        let d13 = e8.rest._zod.run({ value: h17, issues: [] }, o21);
        d13 instanceof Promise ? i20.push(d13.then((z13) => V6(z13, n18, m16))) : V6(d13, n18, m16);
      }
    }
    return i20.length ? Promise.all(i20).then(() => n18) : n18;
  };
});
function V6(t10, e8, r21) {
  t10.issues.length && e8.issues.push(...ue5(r21, t10.issues)), e8.value[r21] = t10.value;
}
var Wn = l6("$ZodRecord", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => {
    let o21 = r21.value;
    if (!h6(o21)) return r21.issues.push({ expected: "record", code: "invalid_type", input: o21, inst: t10 }), r21;
    let s20 = [], i20 = e8.keyType._zod.values;
    if (i20) {
      r21.value = {};
      let u18 = /* @__PURE__ */ new Set();
      for (let m16 of i20) if (typeof m16 == "string" || typeof m16 == "number" || typeof m16 == "symbol") {
        u18.add(typeof m16 == "number" ? m16.toString() : m16);
        let f17 = e8.valueType._zod.run({ value: o21[m16], issues: [] }, n18);
        f17 instanceof Promise ? s20.push(f17.then((h17) => {
          h17.issues.length && r21.issues.push(...ue5(m16, h17.issues)), r21.value[m16] = h17.value;
        })) : (f17.issues.length && r21.issues.push(...ue5(m16, f17.issues)), r21.value[m16] = f17.value);
      }
      let c19;
      for (let m16 in o21) u18.has(m16) || (c19 = c19 ?? [], c19.push(m16));
      c19 && c19.length > 0 && r21.issues.push({ code: "unrecognized_keys", input: o21, inst: t10, keys: c19 });
    } else {
      r21.value = {};
      for (let u18 of Reflect.ownKeys(o21)) {
        if (u18 === "__proto__") continue;
        let c19 = e8.keyType._zod.run({ value: u18, issues: [] }, n18);
        if (c19 instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
        if (typeof u18 == "string" && D8.test(u18) && c19.issues.length) {
          let h17 = e8.keyType._zod.run({ value: Number(u18), issues: [] }, n18);
          if (h17 instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
          h17.issues.length === 0 && (c19 = h17);
        }
        if (c19.issues.length) {
          e8.mode === "loose" ? r21.value[u18] = o21[u18] : r21.issues.push({ code: "invalid_key", origin: "record", issues: c19.issues.map((h17) => fe5(h17, n18, w15())), input: u18, path: [u18], inst: t10 });
          continue;
        }
        let f17 = e8.valueType._zod.run({ value: o21[u18], issues: [] }, n18);
        f17 instanceof Promise ? s20.push(f17.then((h17) => {
          h17.issues.length && r21.issues.push(...ue5(u18, h17.issues)), r21.value[c19.value] = h17.value;
        })) : (f17.issues.length && r21.issues.push(...ue5(u18, f17.issues)), r21.value[c19.value] = f17.value);
      }
    }
    return s20.length ? Promise.all(s20).then(() => r21) : r21;
  };
});
var Kn = l6("$ZodMap", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => {
    let o21 = r21.value;
    if (!(o21 instanceof Map)) return r21.issues.push({ expected: "map", code: "invalid_type", input: o21, inst: t10 }), r21;
    let s20 = [];
    r21.value = /* @__PURE__ */ new Map();
    for (let [i20, u18] of o21) {
      let c19 = e8.keyType._zod.run({ value: i20, issues: [] }, n18), m16 = e8.valueType._zod.run({ value: u18, issues: [] }, n18);
      c19 instanceof Promise || m16 instanceof Promise ? s20.push(Promise.all([c19, m16]).then(([f17, h17]) => {
        dt4(f17, h17, r21, i20, o21, t10, n18);
      })) : dt4(c19, m16, r21, i20, o21, t10, n18);
    }
    return s20.length ? Promise.all(s20).then(() => r21) : r21;
  };
});
function dt4(t10, e8, r21, n18, o21, s20, i20) {
  t10.issues.length && (q7.has(typeof n18) ? r21.issues.push(...ue5(n18, t10.issues)) : r21.issues.push({ code: "invalid_key", origin: "map", input: o21, inst: s20, issues: t10.issues.map((u18) => fe5(u18, i20, w15())) })), e8.issues.length && (q7.has(typeof n18) ? r21.issues.push(...ue5(n18, e8.issues)) : r21.issues.push({ origin: "map", code: "invalid_element", input: o21, inst: s20, key: n18, issues: e8.issues.map((u18) => fe5(u18, i20, w15())) })), r21.value.set(t10.value, e8.value);
}
var Gn = l6("$ZodSet", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => {
    let o21 = r21.value;
    if (!(o21 instanceof Set)) return r21.issues.push({ input: o21, inst: t10, expected: "set", code: "invalid_type" }), r21;
    let s20 = [];
    r21.value = /* @__PURE__ */ new Set();
    for (let i20 of o21) {
      let u18 = e8.valueType._zod.run({ value: i20, issues: [] }, n18);
      u18 instanceof Promise ? s20.push(u18.then((c19) => _t4(c19, r21))) : _t4(u18, r21);
    }
    return s20.length ? Promise.all(s20).then(() => r21) : r21;
  };
});
function _t4(t10, e8) {
  t10.issues.length && e8.issues.push(...t10.issues), e8.value.add(t10.value);
}
var Jn = l6("$ZodEnum", (t10, e8) => {
  _14.init(t10, e8);
  let r21 = A9(e8.entries), n18 = new Set(r21);
  t10._zod.values = n18, t10._zod.pattern = new RegExp(`^(${r21.filter((o21) => q7.has(typeof o21)).map((o21) => typeof o21 == "string" ? H6(o21) : o21.toString()).join("|")})$`), t10._zod.parse = (o21, s20) => {
    let i20 = o21.value;
    return n18.has(i20) || o21.issues.push({ code: "invalid_value", values: r21, input: i20, inst: t10 }), o21;
  };
});
var Yn = l6("$ZodLiteral", (t10, e8) => {
  if (_14.init(t10, e8), e8.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
  let r21 = new Set(e8.values);
  t10._zod.values = r21, t10._zod.pattern = new RegExp(`^(${e8.values.map((n18) => typeof n18 == "string" ? H6(n18) : n18 ? H6(n18.toString()) : String(n18)).join("|")})$`), t10._zod.parse = (n18, o21) => {
    let s20 = n18.value;
    return r21.has(s20) || n18.issues.push({ code: "invalid_value", values: e8.values, input: s20, inst: t10 }), n18;
  };
});
var qn = l6("$ZodFile", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => {
    let o21 = r21.value;
    return o21 instanceof File || r21.issues.push({ expected: "file", code: "invalid_type", input: o21, inst: t10 }), r21;
  };
});
var Hn = l6("$ZodTransform", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => {
    if (n18.direction === "backward") throw new S10(t10.constructor.name);
    let o21 = e8.transform(r21.value, r21);
    if (n18.async) return (o21 instanceof Promise ? o21 : Promise.resolve(o21)).then((i20) => (r21.value = i20, r21));
    if (o21 instanceof Promise) throw new A11();
    return r21.value = o21, r21;
  };
});
function zt2(t10, e8) {
  return t10.issues.length && e8 === void 0 ? { issues: [], value: void 0 } : t10;
}
var br = l6("$ZodOptional", (t10, e8) => {
  _14.init(t10, e8), t10._zod.optin = "optional", t10._zod.optout = "optional", v7(t10._zod, "values", () => e8.innerType._zod.values ? /* @__PURE__ */ new Set([...e8.innerType._zod.values, void 0]) : void 0), v7(t10._zod, "pattern", () => {
    let r21 = e8.innerType._zod.pattern;
    return r21 ? new RegExp(`^(${I8(r21.source)})?$`) : void 0;
  }), t10._zod.parse = (r21, n18) => {
    if (e8.innerType._zod.optin === "optional") {
      let o21 = e8.innerType._zod.run(r21, n18);
      return o21 instanceof Promise ? o21.then((s20) => zt2(s20, r21.value)) : zt2(o21, r21.value);
    }
    return r21.value === void 0 ? r21 : e8.innerType._zod.run(r21, n18);
  };
});
var Xn = l6("$ZodExactOptional", (t10, e8) => {
  br.init(t10, e8), v7(t10._zod, "values", () => e8.innerType._zod.values), v7(t10._zod, "pattern", () => e8.innerType._zod.pattern), t10._zod.parse = (r21, n18) => e8.innerType._zod.run(r21, n18);
});
var Qn = l6("$ZodNullable", (t10, e8) => {
  _14.init(t10, e8), v7(t10._zod, "optin", () => e8.innerType._zod.optin), v7(t10._zod, "optout", () => e8.innerType._zod.optout), v7(t10._zod, "pattern", () => {
    let r21 = e8.innerType._zod.pattern;
    return r21 ? new RegExp(`^(${I8(r21.source)}|null)$`) : void 0;
  }), v7(t10._zod, "values", () => e8.innerType._zod.values ? /* @__PURE__ */ new Set([...e8.innerType._zod.values, null]) : void 0), t10._zod.parse = (r21, n18) => r21.value === null ? r21 : e8.innerType._zod.run(r21, n18);
});
var eo = l6("$ZodDefault", (t10, e8) => {
  _14.init(t10, e8), t10._zod.optin = "optional", v7(t10._zod, "values", () => e8.innerType._zod.values), t10._zod.parse = (r21, n18) => {
    if (n18.direction === "backward") return e8.innerType._zod.run(r21, n18);
    if (r21.value === void 0) return r21.value = e8.defaultValue, r21;
    let o21 = e8.innerType._zod.run(r21, n18);
    return o21 instanceof Promise ? o21.then((s20) => gt4(s20, e8)) : gt4(o21, e8);
  };
});
function gt4(t10, e8) {
  return t10.value === void 0 && (t10.value = e8.defaultValue), t10;
}
var to = l6("$ZodPrefault", (t10, e8) => {
  _14.init(t10, e8), t10._zod.optin = "optional", v7(t10._zod, "values", () => e8.innerType._zod.values), t10._zod.parse = (r21, n18) => (n18.direction === "backward" || r21.value === void 0 && (r21.value = e8.defaultValue), e8.innerType._zod.run(r21, n18));
});
var ro = l6("$ZodNonOptional", (t10, e8) => {
  _14.init(t10, e8), v7(t10._zod, "values", () => {
    let r21 = e8.innerType._zod.values;
    return r21 ? new Set([...r21].filter((n18) => n18 !== void 0)) : void 0;
  }), t10._zod.parse = (r21, n18) => {
    let o21 = e8.innerType._zod.run(r21, n18);
    return o21 instanceof Promise ? o21.then((s20) => vt4(s20, t10)) : vt4(o21, t10);
  };
});
function vt4(t10, e8) {
  return !t10.issues.length && t10.value === void 0 && t10.issues.push({ code: "invalid_type", expected: "nonoptional", input: t10.value, inst: e8 }), t10;
}
var no = l6("$ZodSuccess", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => {
    if (n18.direction === "backward") throw new S10("ZodSuccess");
    let o21 = e8.innerType._zod.run(r21, n18);
    return o21 instanceof Promise ? o21.then((s20) => (r21.value = s20.issues.length === 0, r21)) : (r21.value = o21.issues.length === 0, r21);
  };
});
var oo = l6("$ZodCatch", (t10, e8) => {
  _14.init(t10, e8), v7(t10._zod, "optin", () => e8.innerType._zod.optin), v7(t10._zod, "optout", () => e8.innerType._zod.optout), v7(t10._zod, "values", () => e8.innerType._zod.values), t10._zod.parse = (r21, n18) => {
    if (n18.direction === "backward") return e8.innerType._zod.run(r21, n18);
    let o21 = e8.innerType._zod.run(r21, n18);
    return o21 instanceof Promise ? o21.then((s20) => (r21.value = s20.value, s20.issues.length && (r21.value = e8.catchValue({ ...r21, error: { issues: s20.issues.map((i20) => fe5(i20, n18, w15())) }, input: r21.value }), r21.issues = []), r21)) : (r21.value = o21.value, o21.issues.length && (r21.value = e8.catchValue({ ...r21, error: { issues: o21.issues.map((s20) => fe5(s20, n18, w15())) }, input: r21.value }), r21.issues = []), r21);
  };
});
var so = l6("$ZodNaN", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => ((typeof r21.value != "number" || !Number.isNaN(r21.value)) && r21.issues.push({ input: r21.value, inst: t10, expected: "nan", code: "invalid_type" }), r21);
});
var io = l6("$ZodPipe", (t10, e8) => {
  _14.init(t10, e8), v7(t10._zod, "values", () => e8.in._zod.values), v7(t10._zod, "optin", () => e8.in._zod.optin), v7(t10._zod, "optout", () => e8.out._zod.optout), v7(t10._zod, "propValues", () => e8.in._zod.propValues), t10._zod.parse = (r21, n18) => {
    if (n18.direction === "backward") {
      let s20 = e8.out._zod.run(r21, n18);
      return s20 instanceof Promise ? s20.then((i20) => B7(i20, e8.in, n18)) : B7(s20, e8.in, n18);
    }
    let o21 = e8.in._zod.run(r21, n18);
    return o21 instanceof Promise ? o21.then((s20) => B7(s20, e8.out, n18)) : B7(o21, e8.out, n18);
  };
});
function B7(t10, e8, r21) {
  return t10.issues.length ? (t10.aborted = true, t10) : e8._zod.run({ value: t10.value, issues: t10.issues }, r21);
}
var Pt4 = l6("$ZodCodec", (t10, e8) => {
  _14.init(t10, e8), v7(t10._zod, "values", () => e8.in._zod.values), v7(t10._zod, "optin", () => e8.in._zod.optin), v7(t10._zod, "optout", () => e8.out._zod.optout), v7(t10._zod, "propValues", () => e8.in._zod.propValues), t10._zod.parse = (r21, n18) => {
    if ((n18.direction || "forward") === "forward") {
      let s20 = e8.in._zod.run(r21, n18);
      return s20 instanceof Promise ? s20.then((i20) => W9(i20, e8, n18)) : W9(s20, e8, n18);
    } else {
      let s20 = e8.out._zod.run(r21, n18);
      return s20 instanceof Promise ? s20.then((i20) => W9(i20, e8, n18)) : W9(s20, e8, n18);
    }
  };
});
function W9(t10, e8, r21) {
  if (t10.issues.length) return t10.aborted = true, t10;
  if ((r21.direction || "forward") === "forward") {
    let o21 = e8.transform(t10.value, t10);
    return o21 instanceof Promise ? o21.then((s20) => K9(t10, s20, e8.out, r21)) : K9(t10, o21, e8.out, r21);
  } else {
    let o21 = e8.reverseTransform(t10.value, t10);
    return o21 instanceof Promise ? o21.then((s20) => K9(t10, s20, e8.in, r21)) : K9(t10, o21, e8.in, r21);
  }
}
function K9(t10, e8, r21, n18) {
  return t10.issues.length ? (t10.aborted = true, t10) : r21._zod.run({ value: e8, issues: t10.issues }, n18);
}
var uo = l6("$ZodReadonly", (t10, e8) => {
  _14.init(t10, e8), v7(t10._zod, "propValues", () => e8.innerType._zod.propValues), v7(t10._zod, "values", () => e8.innerType._zod.values), v7(t10._zod, "optin", () => e8.innerType?._zod?.optin), v7(t10._zod, "optout", () => e8.innerType?._zod?.optout), t10._zod.parse = (r21, n18) => {
    if (n18.direction === "backward") return e8.innerType._zod.run(r21, n18);
    let o21 = e8.innerType._zod.run(r21, n18);
    return o21 instanceof Promise ? o21.then(xt3) : xt3(o21);
  };
});
function xt3(t10) {
  return t10.value = Object.freeze(t10.value), t10;
}
var co = l6("$ZodTemplateLiteral", (t10, e8) => {
  _14.init(t10, e8);
  let r21 = [];
  for (let n18 of e8.parts) if (typeof n18 == "object" && n18 !== null) {
    if (!n18._zod.pattern) throw new Error(`Invalid template literal part, no pattern found: ${[...n18._zod.traits].shift()}`);
    let o21 = n18._zod.pattern instanceof RegExp ? n18._zod.pattern.source : n18._zod.pattern;
    if (!o21) throw new Error(`Invalid template literal part: ${n18._zod.traits}`);
    let s20 = o21.startsWith("^") ? 1 : 0, i20 = o21.endsWith("$") ? o21.length - 1 : o21.length;
    r21.push(o21.slice(s20, i20));
  } else if (n18 === null || X6.has(typeof n18)) r21.push(H6(`${n18}`));
  else throw new Error(`Invalid template literal part: ${n18}`);
  t10._zod.pattern = new RegExp(`^${r21.join("")}$`), t10._zod.parse = (n18, o21) => typeof n18.value != "string" ? (n18.issues.push({ input: n18.value, inst: t10, expected: "string", code: "invalid_type" }), n18) : (t10._zod.pattern.lastIndex = 0, t10._zod.pattern.test(n18.value) || n18.issues.push({ input: n18.value, inst: t10, code: "invalid_format", format: e8.format ?? "template_literal", pattern: t10._zod.pattern.source }), n18);
});
var ao = l6("$ZodFunction", (t10, e8) => (_14.init(t10, e8), t10._def = e8, t10._zod.def = e8, t10.implement = (r21) => {
  if (typeof r21 != "function") throw new Error("implement() must be called with a function");
  return function(...n18) {
    let o21 = t10._def.input ? q9(t10._def.input, n18) : n18, s20 = Reflect.apply(r21, this, o21);
    return t10._def.output ? q9(t10._def.output, s20) : s20;
  };
}, t10.implementAsync = (r21) => {
  if (typeof r21 != "function") throw new Error("implementAsync() must be called with a function");
  return async function(...n18) {
    let o21 = t10._def.input ? await X8(t10._def.input, n18) : n18, s20 = await Reflect.apply(r21, this, o21);
    return t10._def.output ? await X8(t10._def.output, s20) : s20;
  };
}, t10._zod.parse = (r21, n18) => typeof r21.value != "function" ? (r21.issues.push({ code: "invalid_type", expected: "function", input: r21.value, inst: t10 }), r21) : (t10._def.output && t10._def.output._zod.def.type === "promise" ? r21.value = t10.implementAsync(r21.value) : r21.value = t10.implement(r21.value), r21), t10.input = (...r21) => {
  let n18 = t10.constructor;
  return Array.isArray(r21[0]) ? new n18({ type: "function", input: new $r({ type: "tuple", items: r21[0], rest: r21[1] }), output: t10._def.output }) : new n18({ type: "function", input: r21[0], output: t10._def.output });
}, t10.output = (r21) => {
  let n18 = t10.constructor;
  return new n18({ type: "function", input: t10._def.input, output: r21 });
}, t10));
var lo = l6("$ZodPromise", (t10, e8) => {
  _14.init(t10, e8), t10._zod.parse = (r21, n18) => Promise.resolve(r21.value).then((o21) => e8.innerType._zod.run({ value: o21, issues: [] }, n18));
});
var po = l6("$ZodLazy", (t10, e8) => {
  _14.init(t10, e8), v7(t10._zod, "innerType", () => e8.getter()), v7(t10._zod, "pattern", () => t10._zod.innerType?._zod?.pattern), v7(t10._zod, "propValues", () => t10._zod.innerType?._zod?.propValues), v7(t10._zod, "optin", () => t10._zod.innerType?._zod?.optin ?? void 0), v7(t10._zod, "optout", () => t10._zod.innerType?._zod?.optout ?? void 0), t10._zod.parse = (r21, n18) => t10._zod.innerType._zod.run(r21, n18);
});
var mo = l6("$ZodCustom", (t10, e8) => {
  x10.init(t10, e8), _14.init(t10, e8), t10._zod.parse = (r21, n18) => r21, t10._zod.check = (r21) => {
    let n18 = r21.value, o21 = e8.fn(n18);
    if (o21 instanceof Promise) return o21.then((s20) => $t3(s20, r21, n18, t10));
    $t3(o21, r21, n18, t10);
  };
});
function $t3(t10, e8, r21, n18) {
  if (!t10) {
    let o21 = { code: "custom", input: r21, inst: n18, path: [...n18._zod.def.path ?? []], continue: !n18._zod.def.abort };
    n18._zod.def.params && (o21.params = n18._zod.def.params), e8.issues.push(de5(o21));
  }
}
function _o(t10, e8) {
  return new t10({ type: "string", ...W7(e8) });
}
function zo(t10, e8) {
  return new t10({ type: "string", coerce: true, ...W7(e8) });
}
function go(t10, e8) {
  return new t10({ type: "string", format: "email", check: "string_format", abort: false, ...W7(e8) });
}
function vo(t10, e8) {
  return new t10({ type: "string", format: "guid", check: "string_format", abort: false, ...W7(e8) });
}
function xo(t10, e8) {
  return new t10({ type: "string", format: "uuid", check: "string_format", abort: false, ...W7(e8) });
}
function $o(t10, e8) {
  return new t10({ type: "string", format: "uuid", check: "string_format", abort: false, version: "v4", ...W7(e8) });
}
function bo(t10, e8) {
  return new t10({ type: "string", format: "uuid", check: "string_format", abort: false, version: "v6", ...W7(e8) });
}
function wo(t10, e8) {
  return new t10({ type: "string", format: "uuid", check: "string_format", abort: false, version: "v7", ...W7(e8) });
}
function Zo(t10, e8) {
  return new t10({ type: "string", format: "url", check: "string_format", abort: false, ...W7(e8) });
}
function ko(t10, e8) {
  return new t10({ type: "string", format: "emoji", check: "string_format", abort: false, ...W7(e8) });
}
function yo(t10, e8) {
  return new t10({ type: "string", format: "nanoid", check: "string_format", abort: false, ...W7(e8) });
}
function Po(t10, e8) {
  return new t10({ type: "string", format: "cuid", check: "string_format", abort: false, ...W7(e8) });
}
function Ao(t10, e8) {
  return new t10({ type: "string", format: "cuid2", check: "string_format", abort: false, ...W7(e8) });
}
function Eo(t10, e8) {
  return new t10({ type: "string", format: "ulid", check: "string_format", abort: false, ...W7(e8) });
}
function Io(t10, e8) {
  return new t10({ type: "string", format: "xid", check: "string_format", abort: false, ...W7(e8) });
}
function So(t10, e8) {
  return new t10({ type: "string", format: "ksuid", check: "string_format", abort: false, ...W7(e8) });
}
function To(t10, e8) {
  return new t10({ type: "string", format: "ipv4", check: "string_format", abort: false, ...W7(e8) });
}
function Co(t10, e8) {
  return new t10({ type: "string", format: "ipv6", check: "string_format", abort: false, ...W7(e8) });
}
function Ro(t10, e8) {
  return new t10({ type: "string", format: "mac", check: "string_format", abort: false, ...W7(e8) });
}
function Oo(t10, e8) {
  return new t10({ type: "string", format: "cidrv4", check: "string_format", abort: false, ...W7(e8) });
}
function No(t10, e8) {
  return new t10({ type: "string", format: "cidrv6", check: "string_format", abort: false, ...W7(e8) });
}
function Lo(t10, e8) {
  return new t10({ type: "string", format: "base64", check: "string_format", abort: false, ...W7(e8) });
}
function Fo(t10, e8) {
  return new t10({ type: "string", format: "base64url", check: "string_format", abort: false, ...W7(e8) });
}
function jo(t10, e8) {
  return new t10({ type: "string", format: "e164", check: "string_format", abort: false, ...W7(e8) });
}
function Do(t10, e8) {
  return new t10({ type: "string", format: "jwt", check: "string_format", abort: false, ...W7(e8) });
}
var Mo = { Any: null, Minute: -1, Second: 0, Millisecond: 3, Microsecond: 6 };
function Uo(t10, e8) {
  return new t10({ type: "string", format: "datetime", check: "string_format", offset: false, local: false, precision: null, ...W7(e8) });
}
function Vo(t10, e8) {
  return new t10({ type: "string", format: "date", check: "string_format", ...W7(e8) });
}
function Bo(t10, e8) {
  return new t10({ type: "string", format: "time", check: "string_format", precision: null, ...W7(e8) });
}
function Wo(t10, e8) {
  return new t10({ type: "string", format: "duration", check: "string_format", ...W7(e8) });
}
function Ko(t10, e8) {
  return new t10({ type: "number", checks: [], ...W7(e8) });
}
function Go(t10, e8) {
  return new t10({ type: "number", coerce: true, checks: [], ...W7(e8) });
}
function Jo(t10, e8) {
  return new t10({ type: "number", check: "number_format", abort: false, format: "safeint", ...W7(e8) });
}
function Yo(t10, e8) {
  return new t10({ type: "number", check: "number_format", abort: false, format: "float32", ...W7(e8) });
}
function qo(t10, e8) {
  return new t10({ type: "number", check: "number_format", abort: false, format: "float64", ...W7(e8) });
}
function Ho(t10, e8) {
  return new t10({ type: "number", check: "number_format", abort: false, format: "int32", ...W7(e8) });
}
function Xo(t10, e8) {
  return new t10({ type: "number", check: "number_format", abort: false, format: "uint32", ...W7(e8) });
}
function Qo(t10, e8) {
  return new t10({ type: "boolean", ...W7(e8) });
}
function es(t10, e8) {
  return new t10({ type: "boolean", coerce: true, ...W7(e8) });
}
function ts(t10, e8) {
  return new t10({ type: "bigint", ...W7(e8) });
}
function rs(t10, e8) {
  return new t10({ type: "bigint", coerce: true, ...W7(e8) });
}
function ns(t10, e8) {
  return new t10({ type: "bigint", check: "bigint_format", abort: false, format: "int64", ...W7(e8) });
}
function os(t10, e8) {
  return new t10({ type: "bigint", check: "bigint_format", abort: false, format: "uint64", ...W7(e8) });
}
function ss(t10, e8) {
  return new t10({ type: "symbol", ...W7(e8) });
}
function is(t10, e8) {
  return new t10({ type: "undefined", ...W7(e8) });
}
function us(t10, e8) {
  return new t10({ type: "null", ...W7(e8) });
}
function cs(t10) {
  return new t10({ type: "any" });
}
function as(t10) {
  return new t10({ type: "unknown" });
}
function ls(t10, e8) {
  return new t10({ type: "never", ...W7(e8) });
}
function ps(t10, e8) {
  return new t10({ type: "void", ...W7(e8) });
}
function ms(t10, e8) {
  return new t10({ type: "date", ...W7(e8) });
}
function fs(t10, e8) {
  return new t10({ type: "date", coerce: true, ...W7(e8) });
}
function hs(t10, e8) {
  return new t10({ type: "nan", ...W7(e8) });
}
function Zr(t10, e8) {
  return new Ee5({ check: "less_than", ...W7(e8), value: t10, inclusive: false });
}
function kr(t10, e8) {
  return new Ee5({ check: "less_than", ...W7(e8), value: t10, inclusive: true });
}
function yr(t10, e8) {
  return new Ie4({ check: "greater_than", ...W7(e8), value: t10, inclusive: false });
}
function Pr(t10, e8) {
  return new Ie4({ check: "greater_than", ...W7(e8), value: t10, inclusive: true });
}
function ds(t10) {
  return yr(0, t10);
}
function _s(t10) {
  return Zr(0, t10);
}
function zs(t10) {
  return kr(0, t10);
}
function gs(t10) {
  return Pr(0, t10);
}
function vs(t10, e8) {
  return new We4({ check: "multiple_of", ...W7(e8), value: t10 });
}
function xs(t10, e8) {
  return new Je4({ check: "max_size", ...W7(e8), maximum: t10 });
}
function $s(t10, e8) {
  return new Ye4({ check: "min_size", ...W7(e8), minimum: t10 });
}
function bs(t10, e8) {
  return new qe5({ check: "size_equals", ...W7(e8), size: t10 });
}
function ws(t10, e8) {
  return new He5({ check: "max_length", ...W7(e8), maximum: t10 });
}
function Zs(t10, e8) {
  return new Xe4({ check: "min_length", ...W7(e8), minimum: t10 });
}
function ks(t10, e8) {
  return new Qe4({ check: "length_equals", ...W7(e8), length: t10 });
}
function ys(t10, e8) {
  return new et4({ check: "string_format", format: "regex", ...W7(e8), pattern: t10 });
}
function Ps(t10) {
  return new tt4({ check: "string_format", format: "lowercase", ...W7(t10) });
}
function As(t10) {
  return new rt4({ check: "string_format", format: "uppercase", ...W7(t10) });
}
function Es(t10, e8) {
  return new nt4({ check: "string_format", format: "includes", ...W7(e8), includes: t10 });
}
function Is(t10, e8) {
  return new ot4({ check: "string_format", format: "starts_with", ...W7(e8), prefix: t10 });
}
function Ss(t10, e8) {
  return new st3({ check: "string_format", format: "ends_with", ...W7(e8), suffix: t10 });
}
function Ts(t10, e8, r21) {
  return new it4({ check: "property", property: t10, schema: e8, ...W7(r21) });
}
function Cs(t10, e8) {
  return new ut4({ check: "mime_type", mime: t10, ...W7(e8) });
}
function N10(t10) {
  return new ct4({ check: "overwrite", tx: t10 });
}
function Rs(t10) {
  return N10((e8) => e8.normalize(t10));
}
function Os() {
  return N10((t10) => t10.trim());
}
function Ns() {
  return N10((t10) => t10.toLowerCase());
}
function Ls() {
  return N10((t10) => t10.toUpperCase());
}
function Fs() {
  return N10((t10) => $5(t10));
}
function js(t10, e8, r21) {
  return new t10({ type: "array", element: e8, ...W7(r21) });
}
function Ds(t10, e8, r21) {
  return new t10({ type: "union", options: e8, ...W7(r21) });
}
function Ms(t10, e8, r21) {
  return new t10({ type: "union", options: e8, inclusive: false, ...W7(r21) });
}
function Us(t10, e8, r21, n18) {
  return new t10({ type: "union", options: r21, discriminator: e8, ...W7(n18) });
}
function Vs(t10, e8, r21) {
  return new t10({ type: "intersection", left: e8, right: r21 });
}
function Bs(t10, e8, r21, n18) {
  let o21 = r21 instanceof _14, s20 = o21 ? n18 : r21, i20 = o21 ? r21 : null;
  return new t10({ type: "tuple", items: e8, rest: i20, ...W7(s20) });
}
function Ws(t10, e8, r21, n18) {
  return new t10({ type: "record", keyType: e8, valueType: r21, ...W7(n18) });
}
function Ks(t10, e8, r21, n18) {
  return new t10({ type: "map", keyType: e8, valueType: r21, ...W7(n18) });
}
function Gs(t10, e8, r21) {
  return new t10({ type: "set", valueType: e8, ...W7(r21) });
}
function Js(t10, e8, r21) {
  let n18 = Array.isArray(e8) ? Object.fromEntries(e8.map((o21) => [o21, o21])) : e8;
  return new t10({ type: "enum", entries: n18, ...W7(r21) });
}
function Ys(t10, e8, r21) {
  return new t10({ type: "enum", entries: e8, ...W7(r21) });
}
function qs(t10, e8, r21) {
  return new t10({ type: "literal", values: Array.isArray(e8) ? e8 : [e8], ...W7(r21) });
}
function Hs(t10, e8) {
  return new t10({ type: "file", ...W7(e8) });
}
function Xs(t10, e8) {
  return new t10({ type: "transform", transform: e8 });
}
function Qs(t10, e8) {
  return new t10({ type: "optional", innerType: e8 });
}
function ei(t10, e8) {
  return new t10({ type: "nullable", innerType: e8 });
}
function ti(t10, e8, r21) {
  return new t10({ type: "default", innerType: e8, get defaultValue() {
    return typeof r21 == "function" ? r21() : L5(r21);
  } });
}
function ri(t10, e8, r21) {
  return new t10({ type: "nonoptional", innerType: e8, ...W7(r21) });
}
function ni(t10, e8) {
  return new t10({ type: "success", innerType: e8 });
}
function oi(t10, e8, r21) {
  return new t10({ type: "catch", innerType: e8, catchValue: typeof r21 == "function" ? r21 : () => r21 });
}
function si(t10, e8, r21) {
  return new t10({ type: "pipe", in: e8, out: r21 });
}
function ii(t10, e8) {
  return new t10({ type: "readonly", innerType: e8 });
}
function ui(t10, e8, r21) {
  return new t10({ type: "template_literal", parts: e8, ...W7(r21) });
}
function ci(t10, e8) {
  return new t10({ type: "lazy", getter: e8 });
}
function ai(t10, e8) {
  return new t10({ type: "promise", innerType: e8 });
}
function li(t10, e8, r21) {
  let n18 = W7(r21);
  return n18.abort ?? (n18.abort = true), new t10({ type: "custom", check: "custom", fn: e8, ...n18 });
}
function pi(t10, e8, r21) {
  return new t10({ type: "custom", check: "custom", fn: e8, ...W7(r21) });
}
function mi(t10) {
  let e8 = Ar((r21) => (r21.addIssue = (n18) => {
    if (typeof n18 == "string") r21.issues.push(de5(n18, r21.value, e8._zod.def));
    else {
      let o21 = n18;
      o21.fatal && (o21.continue = false), o21.code ?? (o21.code = "custom"), o21.input ?? (o21.input = r21.value), o21.inst ?? (o21.inst = e8), o21.continue ?? (o21.continue = !e8._zod.def.abort), r21.issues.push(de5(o21));
    }
  }, t10(r21.value, r21)));
  return e8;
}
function Ar(t10, e8) {
  let r21 = new x10({ check: "custom", ...W7(e8) });
  return r21._zod.check = t10, r21;
}
function fi(t10) {
  let e8 = new x10({ check: "describe" });
  return e8._zod.onattach = [(r21) => {
    let n18 = d5.get(r21) ?? {};
    d5.add(r21, { ...n18, description: t10 });
  }], e8._zod.check = () => {
  }, e8;
}
function hi(t10) {
  let e8 = new x10({ check: "meta" });
  return e8._zod.onattach = [(r21) => {
    let n18 = d5.get(r21) ?? {};
    d5.add(r21, { ...n18, ...t10 });
  }], e8._zod.check = () => {
  }, e8;
}
function di(t10, e8) {
  let r21 = W7(e8), n18 = r21.truthy ?? ["true", "1", "yes", "on", "y", "enabled"], o21 = r21.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  r21.case !== "sensitive" && (n18 = n18.map((z13) => typeof z13 == "string" ? z13.toLowerCase() : z13), o21 = o21.map((z13) => typeof z13 == "string" ? z13.toLowerCase() : z13));
  let s20 = new Set(n18), i20 = new Set(o21), u18 = t10.Codec ?? Pt4, c19 = t10.Boolean ?? wt4, m16 = t10.String ?? Te4, f17 = new m16({ type: "string", error: r21.error }), h17 = new c19({ type: "boolean", error: r21.error }), d13 = new u18({ type: "pipe", in: f17, out: h17, transform: ((z13, $10) => {
    let y15 = z13;
    return r21.case !== "sensitive" && (y15 = y15.toLowerCase()), s20.has(y15) ? true : i20.has(y15) ? false : ($10.issues.push({ code: "invalid_value", expected: "stringbool", values: [...s20, ...i20], input: $10.value, inst: d13, continue: false }), {});
  }), reverseTransform: ((z13, $10) => z13 === true ? n18[0] || "true" : o21[0] || "false"), error: r21.error });
  return d13;
}
function _i(t10, e8, r21, n18 = {}) {
  let o21 = W7(n18), s20 = { ...W7(n18), check: "string_format", type: "string", format: e8, fn: typeof r21 == "function" ? r21 : (u18) => r21.test(u18), ...o21 };
  return r21 instanceof RegExp && (s20.pattern = r21), new t10(s20);
}
var Ce4 = class {
  get metadataRegistry() {
    return this.ctx.metadataRegistry;
  }
  get target() {
    return this.ctx.target;
  }
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  get override() {
    return this.ctx.override;
  }
  get io() {
    return this.ctx.io;
  }
  get counter() {
    return this.ctx.counter;
  }
  set counter(e8) {
    this.ctx.counter = e8;
  }
  get seen() {
    return this.ctx.seen;
  }
  constructor(e8) {
    let r21 = e8?.target ?? "draft-2020-12";
    r21 === "draft-4" && (r21 = "draft-04"), r21 === "draft-7" && (r21 = "draft-07"), this.ctx = O9({ processors: h7, target: r21, ...e8?.metadata && { metadata: e8.metadata }, ...e8?.unrepresentable && { unrepresentable: e8.unrepresentable }, ...e8?.override && { override: e8.override }, ...e8?.io && { io: e8.io } });
  }
  process(e8, r21 = { path: [], schemaPath: [] }) {
    return g6(e8, this.ctx, r21);
  }
  emit(e8, r21) {
    r21 && (r21.cycles && (this.ctx.cycles = r21.cycles), r21.reused && (this.ctx.reused = r21.reused), r21.external && (this.ctx.external = r21.external)), $6(this.ctx, e8);
    let n18 = w13(this.ctx, e8), { "~standard": o21, ...s20 } = n18;
    return s20;
  }
};
var Rr = {};

// vendor/neon/zod_4.3.6_es2022_v4_classic_schemas.mjs
var zod_4_3_6_es2022_v4_classic_schemas_exports = {};
__export(zod_4_3_6_es2022_v4_classic_schemas_exports, {
  ZodAny: () => ke5,
  ZodArray: () => Se5,
  ZodBase64: () => X9,
  ZodBase64URL: () => G9,
  ZodBigInt: () => Q8,
  ZodBigIntFormat: () => ee8,
  ZodBoolean: () => H9,
  ZodCIDRv4: () => V7,
  ZodCIDRv6: () => W10,
  ZodCUID: () => j10,
  ZodCUID2: () => A13,
  ZodCatch: () => Me6,
  ZodCodec: () => pe8,
  ZodCustom: () => b6,
  ZodCustomStringFormat: () => f9,
  ZodDate: () => $e5,
  ZodDefault: () => je5,
  ZodDiscriminatedUnion: () => ze5,
  ZodE164: () => K10,
  ZodEmail: () => U7,
  ZodEmoji: () => C9,
  ZodEnum: () => _16,
  ZodExactOptional: () => Ue5,
  ZodFile: () => De5,
  ZodFunction: () => Qe5,
  ZodGUID: () => y9,
  ZodIPv4: () => B8,
  ZodIPv6: () => M7,
  ZodIntersection: () => ve7,
  ZodJWT: () => Y9,
  ZodKSUID: () => R15,
  ZodLazy: () => Ye5,
  ZodLiteral: () => Te5,
  ZodMAC: () => ie8,
  ZodMap: () => Oe6,
  ZodNaN: () => We5,
  ZodNanoID: () => E16,
  ZodNever: () => fe8,
  ZodNonOptional: () => ue8,
  ZodNull: () => xe6,
  ZodNullable: () => Ee6,
  ZodNumber: () => q10,
  ZodNumberFormat: () => k9,
  ZodObject: () => P7,
  ZodOptional: () => ne8,
  ZodPipe: () => ae7,
  ZodPrefault: () => Le5,
  ZodPromise: () => He6,
  ZodReadonly: () => Xe5,
  ZodRecord: () => w16,
  ZodSet: () => Ie5,
  ZodString: () => J8,
  ZodStringFormat: () => l7,
  ZodSuccess: () => Be5,
  ZodSymbol: () => me8,
  ZodTemplateLiteral: () => Ke5,
  ZodTransform: () => Je5,
  ZodTuple: () => Ne5,
  ZodType: () => p7,
  ZodULID: () => L7,
  ZodURL: () => z10,
  ZodUUID: () => h8,
  ZodUndefined: () => he8,
  ZodUnion: () => N11,
  ZodUnknown: () => _e6,
  ZodVoid: () => ye8,
  ZodXID: () => F8,
  ZodXor: () => ge8,
  _ZodString: () => D9,
  _default: () => Ae4,
  _function: () => ir2,
  any: () => Ro2,
  array: () => v10,
  base64: () => vo2,
  base64url: () => Po2,
  bigint: () => Eo2,
  boolean: () => le8,
  catch: () => Ve5,
  check: () => sr2,
  cidrv4: () => go2,
  cidrv6: () => zo2,
  codec: () => ar2,
  cuid: () => xo2,
  cuid2: () => Zo2,
  custom: () => lr2,
  date: () => Mo2,
  describe: () => mr2,
  discriminatedUnion: () => Yo2,
  e164: () => No2,
  email: () => to2,
  emoji: () => mo2,
  enum: () => ce8,
  exactOptional: () => Ce5,
  file: () => cr2,
  float32: () => Do2,
  float64: () => Jo2,
  function: () => ir2,
  guid: () => no2,
  hash: () => To2,
  hex: () => Io2,
  hostname: () => Oo2,
  httpUrl: () => lo2,
  instanceof: () => xr2,
  int: () => T14,
  int32: () => Uo2,
  int64: () => jo2,
  intersection: () => Pe7,
  ipv4: () => yo2,
  ipv6: () => So2,
  json: () => kr2,
  jwt: () => wo2,
  keyof: () => Vo2,
  ksuid: () => fo,
  lazy: () => qe6,
  literal: () => rr2,
  looseObject: () => Go2,
  looseRecord: () => Ho2,
  mac: () => $o2,
  map: () => Qo2,
  meta: () => hr2,
  nan: () => ur2,
  nanoid: () => ho,
  nativeEnum: () => or2,
  never: () => oe8,
  nonoptional: () => Re4,
  null: () => Ze5,
  nullable: () => S12,
  nullish: () => tr2,
  number: () => se9,
  object: () => Wo2,
  optional: () => $8,
  partialRecord: () => qo2,
  pipe: () => g7,
  prefault: () => Fe5,
  preprocess: () => _r2,
  promise: () => dr2,
  readonly: () => Ge5,
  record: () => be6,
  refine: () => eo2,
  set: () => er2,
  strictObject: () => Xo2,
  string: () => I11,
  stringFormat: () => bo2,
  stringbool: () => Zr2,
  success: () => nr2,
  superRefine: () => oo2,
  symbol: () => Lo2,
  templateLiteral: () => pr2,
  transform: () => te8,
  tuple: () => we6,
  uint32: () => Co2,
  uint64: () => Ao2,
  ulid: () => ko2,
  undefined: () => Fo2,
  union: () => re7,
  unknown: () => Z10,
  url: () => so2,
  uuid: () => uo2,
  uuidv4: () => ao2,
  uuidv6: () => po2,
  uuidv7: () => io2,
  void: () => Bo2,
  xid: () => _o2,
  xor: () => Ko2
});

// vendor/neon/zod_4.3.6_es2022_v4_classic_checks.mjs
var zod_4_3_6_es2022_v4_classic_checks_exports = {};
__export(zod_4_3_6_es2022_v4_classic_checks_exports, {
  endsWith: () => Ss,
  gt: () => yr,
  gte: () => Pr,
  includes: () => Es,
  length: () => ks,
  lowercase: () => Ps,
  lt: () => Zr,
  lte: () => kr,
  maxLength: () => ws,
  maxSize: () => xs,
  mime: () => Cs,
  minLength: () => Zs,
  minSize: () => $s,
  multipleOf: () => vs,
  negative: () => _s,
  nonnegative: () => gs,
  nonpositive: () => zs,
  normalize: () => Rs,
  overwrite: () => N10,
  positive: () => ds,
  property: () => Ts,
  regex: () => ys,
  size: () => bs,
  slugify: () => Fs,
  startsWith: () => Is,
  toLowerCase: () => Ns,
  toUpperCase: () => Ls,
  trim: () => Os,
  uppercase: () => As
});

// vendor/neon/zod_4.3.6_es2022_v4_classic_iso.mjs
var zod_4_3_6_es2022_v4_classic_iso_exports = {};
__export(zod_4_3_6_es2022_v4_classic_iso_exports, {
  ZodISODate: () => c11,
  ZodISODateTime: () => i12,
  ZodISODuration: () => a9,
  ZodISOTime: () => n9,
  date: () => s10,
  datetime: () => m9,
  duration: () => S11,
  time: () => u7
});
var i12 = l6("ZodISODateTime", (t10, r21) => {
  _n.init(t10, r21), l7.init(t10, r21);
});
function m9(t10) {
  return Uo(i12, t10);
}
var c11 = l6("ZodISODate", (t10, r21) => {
  zn.init(t10, r21), l7.init(t10, r21);
});
function s10(t10) {
  return Vo(c11, t10);
}
var n9 = l6("ZodISOTime", (t10, r21) => {
  gn.init(t10, r21), l7.init(t10, r21);
});
function u7(t10) {
  return Bo(n9, t10);
}
var a9 = l6("ZodISODuration", (t10, r21) => {
  vn.init(t10, r21), l7.init(t10, r21);
});
function S11(t10) {
  return Wo(a9, t10);
}

// vendor/neon/zod_4.3.6_es2022_v4_classic_errors.mjs
var t7 = (r21, a16) => {
  Ne4.init(r21, a16), r21.name = "ZodError", Object.defineProperties(r21, { format: { value: (e8) => Mr(r21, e8) }, flatten: { value: (e8) => Dr(r21, e8) }, addIssue: { value: (e8) => {
    r21.issues.push(e8), r21.message = JSON.stringify(r21.issues, N8, 2);
  } }, addIssues: { value: (e8) => {
    r21.issues.push(...e8), r21.message = JSON.stringify(r21.issues, N8, 2);
  } }, isEmpty: { get() {
    return r21.issues.length === 0;
  } } });
};
var c12 = l6("ZodError", t7);
var l8 = l6("ZodError", t7, { Parent: Error });

// vendor/neon/zod_4.3.6_es2022_v4_classic_parse.mjs
var s11 = Y8(l8);
var r12 = H8(l8);
var n10 = Q7(l8);
var t8 = ee7(l8);
var a10 = Ot3(l8);
var d6 = Nt3(l8);
var p6 = Lt4(l8);
var f8 = Ft2(l8);
var x11 = jt2(l8);
var y8 = Dt3(l8);
var A12 = Mt4(l8);
var _15 = Ut3(l8);

// vendor/neon/zod_4.3.6_es2022_v4_classic_schemas.mjs
var p7 = l6("ZodType", (e8, r21) => (_14.init(e8, r21), Object.assign(e8["~standard"], { jsonSchema: { input: S8(e8, "input"), output: S8(e8, "output") } }), e8.toJSONSchema = j7(e8, {}), e8.def = r21, e8.type = r21.type, Object.defineProperty(e8, "_def", { value: r21 }), e8.check = (...c19) => e8.clone(zod_4_3_6_es2022_v4_core_util_exports.mergeDefs(r21, { checks: [...r21.checks ?? [], ...c19.map((t10) => typeof t10 == "function" ? { _zod: { check: t10, def: { check: "custom" }, onattach: [] } } : t10)] }), { parent: true }), e8.with = e8.check, e8.clone = (c19, t10) => l5(e8, c19, t10), e8.brand = () => e8, e8.register = ((c19, t10) => (c19.add(e8, t10), e8)), e8.parse = (c19, t10) => s11(e8, c19, t10, { callee: e8.parse }), e8.safeParse = (c19, t10) => n10(e8, c19, t10), e8.parseAsync = async (c19, t10) => r12(e8, c19, t10, { callee: e8.parseAsync }), e8.safeParseAsync = async (c19, t10) => t8(e8, c19, t10), e8.spa = e8.safeParseAsync, e8.encode = (c19, t10) => a10(e8, c19, t10), e8.decode = (c19, t10) => d6(e8, c19, t10), e8.encodeAsync = async (c19, t10) => p6(e8, c19, t10), e8.decodeAsync = async (c19, t10) => f8(e8, c19, t10), e8.safeEncode = (c19, t10) => x11(e8, c19, t10), e8.safeDecode = (c19, t10) => y8(e8, c19, t10), e8.safeEncodeAsync = async (c19, t10) => A12(e8, c19, t10), e8.safeDecodeAsync = async (c19, t10) => _15(e8, c19, t10), e8.refine = (c19, t10) => e8.check(eo2(c19, t10)), e8.superRefine = (c19) => e8.check(oo2(c19)), e8.overwrite = (c19) => e8.check(N10(c19)), e8.optional = () => $8(e8), e8.exactOptional = () => Ce5(e8), e8.nullable = () => S12(e8), e8.nullish = () => $8(S12(e8)), e8.nonoptional = (c19) => Re4(e8, c19), e8.array = () => v10(e8), e8.or = (c19) => re7([e8, c19]), e8.and = (c19) => Pe7(e8, c19), e8.transform = (c19) => g7(e8, te8(c19)), e8.default = (c19) => Ae4(e8, c19), e8.prefault = (c19) => Fe5(e8, c19), e8.catch = (c19) => Ve5(e8, c19), e8.pipe = (c19) => g7(e8, c19), e8.readonly = () => Ge5(e8), e8.describe = (c19) => {
  let t10 = e8.clone();
  return d5.add(t10, { description: c19 }), t10;
}, Object.defineProperty(e8, "description", { get() {
  return d5.get(e8)?.description;
}, configurable: true }), e8.meta = (...c19) => {
  if (c19.length === 0) return d5.get(e8);
  let t10 = e8.clone();
  return d5.add(t10, c19[0]), t10;
}, e8.isOptional = () => e8.safeParse(void 0).success, e8.isNullable = () => e8.safeParse(null).success, e8.apply = (c19) => c19(e8), e8));
var D9 = l6("_ZodString", (e8, r21) => {
  Te4.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (t10, n18, s20) => x9(e8, t10, n18, s20);
  let c19 = e8._zod.bag;
  e8.format = c19.format ?? null, e8.minLength = c19.minimum ?? null, e8.maxLength = c19.maximum ?? null, e8.regex = (...t10) => e8.check(ys(...t10)), e8.includes = (...t10) => e8.check(Es(...t10)), e8.startsWith = (...t10) => e8.check(Is(...t10)), e8.endsWith = (...t10) => e8.check(Ss(...t10)), e8.min = (...t10) => e8.check(Zs(...t10)), e8.max = (...t10) => e8.check(ws(...t10)), e8.length = (...t10) => e8.check(ks(...t10)), e8.nonempty = (...t10) => e8.check(Zs(1, ...t10)), e8.lowercase = (t10) => e8.check(Ps(t10)), e8.uppercase = (t10) => e8.check(As(t10)), e8.trim = () => e8.check(Os()), e8.normalize = (...t10) => e8.check(Rs(...t10)), e8.toLowerCase = () => e8.check(Ns()), e8.toUpperCase = () => e8.check(Ls()), e8.slugify = () => e8.check(Fs());
});
var J8 = l6("ZodString", (e8, r21) => {
  Te4.init(e8, r21), D9.init(e8, r21), e8.email = (c19) => e8.check(go(U7, c19)), e8.url = (c19) => e8.check(Zo(z10, c19)), e8.jwt = (c19) => e8.check(Do(Y9, c19)), e8.emoji = (c19) => e8.check(ko(C9, c19)), e8.guid = (c19) => e8.check(vo(y9, c19)), e8.uuid = (c19) => e8.check(xo(h8, c19)), e8.uuidv4 = (c19) => e8.check($o(h8, c19)), e8.uuidv6 = (c19) => e8.check(bo(h8, c19)), e8.uuidv7 = (c19) => e8.check(wo(h8, c19)), e8.nanoid = (c19) => e8.check(yo(E16, c19)), e8.guid = (c19) => e8.check(vo(y9, c19)), e8.cuid = (c19) => e8.check(Po(j10, c19)), e8.cuid2 = (c19) => e8.check(Ao(A13, c19)), e8.ulid = (c19) => e8.check(Eo(L7, c19)), e8.base64 = (c19) => e8.check(Lo(X9, c19)), e8.base64url = (c19) => e8.check(Fo(G9, c19)), e8.xid = (c19) => e8.check(Io(F8, c19)), e8.ksuid = (c19) => e8.check(So(R15, c19)), e8.ipv4 = (c19) => e8.check(To(B8, c19)), e8.ipv6 = (c19) => e8.check(Co(M7, c19)), e8.cidrv4 = (c19) => e8.check(Oo(V7, c19)), e8.cidrv6 = (c19) => e8.check(No(W10, c19)), e8.e164 = (c19) => e8.check(jo(K10, c19)), e8.datetime = (c19) => e8.check(m9(c19)), e8.date = (c19) => e8.check(s10(c19)), e8.time = (c19) => e8.check(u7(c19)), e8.duration = (c19) => e8.check(S11(c19));
});
function I11(e8) {
  return _o(J8, e8);
}
var l7 = l6("ZodStringFormat", (e8, r21) => {
  v9.init(e8, r21), D9.init(e8, r21);
});
var U7 = l6("ZodEmail", (e8, r21) => {
  un.init(e8, r21), l7.init(e8, r21);
});
function to2(e8) {
  return go(U7, e8);
}
var y9 = l6("ZodGUID", (e8, r21) => {
  on.init(e8, r21), l7.init(e8, r21);
});
function no2(e8) {
  return vo(y9, e8);
}
var h8 = l6("ZodUUID", (e8, r21) => {
  sn.init(e8, r21), l7.init(e8, r21);
});
function uo2(e8) {
  return xo(h8, e8);
}
function ao2(e8) {
  return $o(h8, e8);
}
function po2(e8) {
  return bo(h8, e8);
}
function io2(e8) {
  return wo(h8, e8);
}
var z10 = l6("ZodURL", (e8, r21) => {
  cn.init(e8, r21), l7.init(e8, r21);
});
function so2(e8) {
  return Zo(z10, e8);
}
function lo2(e8) {
  return Zo(z10, { protocol: /^https?$/, hostname: M6.domain, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(e8) });
}
var C9 = l6("ZodEmoji", (e8, r21) => {
  an.init(e8, r21), l7.init(e8, r21);
});
function mo2(e8) {
  return ko(C9, e8);
}
var E16 = l6("ZodNanoID", (e8, r21) => {
  ln.init(e8, r21), l7.init(e8, r21);
});
function ho(e8) {
  return yo(E16, e8);
}
var j10 = l6("ZodCUID", (e8, r21) => {
  pn.init(e8, r21), l7.init(e8, r21);
});
function xo2(e8) {
  return Po(j10, e8);
}
var A13 = l6("ZodCUID2", (e8, r21) => {
  mn.init(e8, r21), l7.init(e8, r21);
});
function Zo2(e8) {
  return Ao(A13, e8);
}
var L7 = l6("ZodULID", (e8, r21) => {
  fn.init(e8, r21), l7.init(e8, r21);
});
function ko2(e8) {
  return Eo(L7, e8);
}
var F8 = l6("ZodXID", (e8, r21) => {
  hn.init(e8, r21), l7.init(e8, r21);
});
function _o2(e8) {
  return Io(F8, e8);
}
var R15 = l6("ZodKSUID", (e8, r21) => {
  dn.init(e8, r21), l7.init(e8, r21);
});
function fo(e8) {
  return So(R15, e8);
}
var B8 = l6("ZodIPv4", (e8, r21) => {
  xn.init(e8, r21), l7.init(e8, r21);
});
function yo2(e8) {
  return To(B8, e8);
}
var ie8 = l6("ZodMAC", (e8, r21) => {
  bn.init(e8, r21), l7.init(e8, r21);
});
function $o2(e8) {
  return Ro(ie8, e8);
}
var M7 = l6("ZodIPv6", (e8, r21) => {
  $n.init(e8, r21), l7.init(e8, r21);
});
function So2(e8) {
  return Co(M7, e8);
}
var V7 = l6("ZodCIDRv4", (e8, r21) => {
  wn.init(e8, r21), l7.init(e8, r21);
});
function go2(e8) {
  return Oo(V7, e8);
}
var W10 = l6("ZodCIDRv6", (e8, r21) => {
  Zn.init(e8, r21), l7.init(e8, r21);
});
function zo2(e8) {
  return No(W10, e8);
}
var X9 = l6("ZodBase64", (e8, r21) => {
  kn.init(e8, r21), l7.init(e8, r21);
});
function vo2(e8) {
  return Lo(X9, e8);
}
var G9 = l6("ZodBase64URL", (e8, r21) => {
  yn.init(e8, r21), l7.init(e8, r21);
});
function Po2(e8) {
  return Fo(G9, e8);
}
var K10 = l6("ZodE164", (e8, r21) => {
  Pn.init(e8, r21), l7.init(e8, r21);
});
function No2(e8) {
  return jo(K10, e8);
}
var Y9 = l6("ZodJWT", (e8, r21) => {
  An.init(e8, r21), l7.init(e8, r21);
});
function wo2(e8) {
  return Do(Y9, e8);
}
var f9 = l6("ZodCustomStringFormat", (e8, r21) => {
  En.init(e8, r21), l7.init(e8, r21);
});
function bo2(e8, r21, c19 = {}) {
  return _i(f9, e8, r21, c19);
}
function Oo2(e8) {
  return _i(f9, "hostname", M6.hostname, e8);
}
function Io2(e8) {
  return _i(f9, "hex", M6.hex, e8);
}
function To2(e8, r21) {
  let c19 = r21?.enc ?? "hex", t10 = `${e8}_${c19}`, n18 = M6[t10];
  if (!n18) throw new Error(`Unrecognized hash format: ${t10}`);
  return _i(f9, t10, n18, r21);
}
var q10 = l6("ZodNumber", (e8, r21) => {
  gr.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (t10, n18, s20) => w14(e8, t10, n18, s20), e8.gt = (t10, n18) => e8.check(yr(t10, n18)), e8.gte = (t10, n18) => e8.check(Pr(t10, n18)), e8.min = (t10, n18) => e8.check(Pr(t10, n18)), e8.lt = (t10, n18) => e8.check(Zr(t10, n18)), e8.lte = (t10, n18) => e8.check(kr(t10, n18)), e8.max = (t10, n18) => e8.check(kr(t10, n18)), e8.int = (t10) => e8.check(T14(t10)), e8.safe = (t10) => e8.check(T14(t10)), e8.positive = (t10) => e8.check(yr(0, t10)), e8.nonnegative = (t10) => e8.check(Pr(0, t10)), e8.negative = (t10) => e8.check(Zr(0, t10)), e8.nonpositive = (t10) => e8.check(kr(0, t10)), e8.multipleOf = (t10, n18) => e8.check(vs(t10, n18)), e8.step = (t10, n18) => e8.check(vs(t10, n18)), e8.finite = () => e8;
  let c19 = e8._zod.bag;
  e8.minValue = Math.max(c19.minimum ?? Number.NEGATIVE_INFINITY, c19.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e8.maxValue = Math.min(c19.maximum ?? Number.POSITIVE_INFINITY, c19.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e8.isInt = (c19.format ?? "").includes("int") || Number.isSafeInteger(c19.multipleOf ?? 0.5), e8.isFinite = true, e8.format = c19.format ?? null;
});
function se9(e8) {
  return Ko(q10, e8);
}
var k9 = l6("ZodNumberFormat", (e8, r21) => {
  In.init(e8, r21), q10.init(e8, r21);
});
function T14(e8) {
  return Jo(k9, e8);
}
function Do2(e8) {
  return Yo(k9, e8);
}
function Jo2(e8) {
  return qo(k9, e8);
}
function Uo2(e8) {
  return Ho(k9, e8);
}
function Co2(e8) {
  return Xo(k9, e8);
}
var H9 = l6("ZodBoolean", (e8, r21) => {
  wt4.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => O10(e8, c19, t10, n18);
});
function le8(e8) {
  return Qo(H9, e8);
}
var Q8 = l6("ZodBigInt", (e8, r21) => {
  vr.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (t10, n18, s20) => S9(e8, t10, n18, s20), e8.gte = (t10, n18) => e8.check(Pr(t10, n18)), e8.min = (t10, n18) => e8.check(Pr(t10, n18)), e8.gt = (t10, n18) => e8.check(yr(t10, n18)), e8.gte = (t10, n18) => e8.check(Pr(t10, n18)), e8.min = (t10, n18) => e8.check(Pr(t10, n18)), e8.lt = (t10, n18) => e8.check(Zr(t10, n18)), e8.lte = (t10, n18) => e8.check(kr(t10, n18)), e8.max = (t10, n18) => e8.check(kr(t10, n18)), e8.positive = (t10) => e8.check(yr(BigInt(0), t10)), e8.negative = (t10) => e8.check(Zr(BigInt(0), t10)), e8.nonpositive = (t10) => e8.check(kr(BigInt(0), t10)), e8.nonnegative = (t10) => e8.check(Pr(BigInt(0), t10)), e8.multipleOf = (t10, n18) => e8.check(vs(t10, n18));
  let c19 = e8._zod.bag;
  e8.minValue = c19.minimum ?? null, e8.maxValue = c19.maximum ?? null, e8.format = c19.format ?? null;
});
function Eo2(e8) {
  return ts(Q8, e8);
}
var ee8 = l6("ZodBigIntFormat", (e8, r21) => {
  Sn.init(e8, r21), Q8.init(e8, r21);
});
function jo2(e8) {
  return ns(ee8, e8);
}
function Ao2(e8) {
  return os(ee8, e8);
}
var me8 = l6("ZodSymbol", (e8, r21) => {
  Tn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => z9(e8, c19, t10, n18);
});
function Lo2(e8) {
  return ss(me8, e8);
}
var he8 = l6("ZodUndefined", (e8, r21) => {
  Cn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => T12(e8, c19, t10, n18);
});
function Fo2(e8) {
  return is(he8, e8);
}
var xe6 = l6("ZodNull", (e8, r21) => {
  Rn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => v8(e8, c19, t10, n18);
});
function Ze5(e8) {
  return us(xe6, e8);
}
var ke5 = l6("ZodAny", (e8, r21) => {
  On.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => E15(e8, c19, t10, n18);
});
function Ro2() {
  return cs(ke5);
}
var _e6 = l6("ZodUnknown", (e8, r21) => {
  Nn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => J7(e8, c19, t10, n18);
});
function Z10() {
  return as(_e6);
}
var fe8 = l6("ZodNever", (e8, r21) => {
  Ln.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => N9(e8, c19, t10, n18);
});
function oe8(e8) {
  return ls(fe8, e8);
}
var ye8 = l6("ZodVoid", (e8, r21) => {
  Fn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => j8(e8, c19, t10, n18);
});
function Bo2(e8) {
  return ps(ye8, e8);
}
var $e5 = l6("ZodDate", (e8, r21) => {
  jn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (t10, n18, s20) => I9(e8, t10, n18, s20), e8.min = (t10, n18) => e8.check(Pr(t10, n18)), e8.max = (t10, n18) => e8.check(kr(t10, n18));
  let c19 = e8._zod.bag;
  e8.minDate = c19.minimum ? new Date(c19.minimum) : null, e8.maxDate = c19.maximum ? new Date(c19.maximum) : null;
});
function Mo2(e8) {
  return ms($e5, e8);
}
var Se5 = l6("ZodArray", (e8, r21) => {
  Dn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => U5(e8, c19, t10, n18), e8.element = r21.element, e8.min = (c19, t10) => e8.check(Zs(c19, t10)), e8.nonempty = (c19) => e8.check(Zs(1, c19)), e8.max = (c19, t10) => e8.check(ws(c19, t10)), e8.length = (c19, t10) => e8.check(ks(c19, t10)), e8.unwrap = () => e8.element;
});
function v10(e8, r21) {
  return js(Se5, e8, r21);
}
function Vo2(e8) {
  let r21 = e8._zod.def.shape;
  return ce8(Object.keys(r21));
}
var P7 = l6("ZodObject", (e8, r21) => {
  Mn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => $7(e8, c19, t10, n18), zod_4_3_6_es2022_v4_core_util_exports.defineLazy(e8, "shape", () => r21.shape), e8.keyof = () => ce8(Object.keys(e8._zod.def.shape)), e8.catchall = (c19) => e8.clone({ ...e8._zod.def, catchall: c19 }), e8.passthrough = () => e8.clone({ ...e8._zod.def, catchall: Z10() }), e8.loose = () => e8.clone({ ...e8._zod.def, catchall: Z10() }), e8.strict = () => e8.clone({ ...e8._zod.def, catchall: oe8() }), e8.strip = () => e8.clone({ ...e8._zod.def, catchall: void 0 }), e8.extend = (c19) => zod_4_3_6_es2022_v4_core_util_exports.extend(e8, c19), e8.safeExtend = (c19) => zod_4_3_6_es2022_v4_core_util_exports.safeExtend(e8, c19), e8.merge = (c19) => zod_4_3_6_es2022_v4_core_util_exports.merge(e8, c19), e8.pick = (c19) => zod_4_3_6_es2022_v4_core_util_exports.pick(e8, c19), e8.omit = (c19) => zod_4_3_6_es2022_v4_core_util_exports.omit(e8, c19), e8.partial = (...c19) => zod_4_3_6_es2022_v4_core_util_exports.partial(ne8, e8, c19[0]), e8.required = (...c19) => zod_4_3_6_es2022_v4_core_util_exports.required(ue8, e8, c19[0]);
});
function Wo2(e8, r21) {
  let c19 = { type: "object", shape: e8 ?? {}, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(r21) };
  return new P7(c19);
}
function Xo2(e8, r21) {
  return new P7({ type: "object", shape: e8, catchall: oe8(), ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(r21) });
}
function Go2(e8, r21) {
  return new P7({ type: "object", shape: e8, catchall: Z10(), ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(r21) });
}
var N11 = l6("ZodUnion", (e8, r21) => {
  yt4.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => G7(e8, c19, t10, n18), e8.options = r21.options;
});
function re7(e8, r21) {
  return new N11({ type: "union", options: e8, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(r21) });
}
var ge8 = l6("ZodXor", (e8, r21) => {
  N11.init(e8, r21), Un.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => G7(e8, c19, t10, n18), e8.options = r21.options;
});
function Ko2(e8, r21) {
  return new ge8({ type: "union", options: e8, inclusive: false, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(r21) });
}
var ze5 = l6("ZodDiscriminatedUnion", (e8, r21) => {
  N11.init(e8, r21), Vn.init(e8, r21);
});
function Yo2(e8, r21, c19) {
  return new ze5({ type: "union", options: r21, discriminator: e8, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(c19) });
}
var ve7 = l6("ZodIntersection", (e8, r21) => {
  Bn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => H7(e8, c19, t10, n18);
});
function Pe7(e8, r21) {
  return new ve7({ type: "intersection", left: e8, right: r21 });
}
var Ne5 = l6("ZodTuple", (e8, r21) => {
  $r.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => Q6(e8, c19, t10, n18), e8.rest = (c19) => e8.clone({ ...e8._zod.def, rest: c19 });
});
function we6(e8, r21, c19) {
  let t10 = r21 instanceof _14, n18 = t10 ? c19 : r21, s20 = t10 ? r21 : null;
  return new Ne5({ type: "tuple", items: e8, rest: s20, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(n18) });
}
var w16 = l6("ZodRecord", (e8, r21) => {
  Wn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => R13(e8, c19, t10, n18), e8.keyType = r21.keyType, e8.valueType = r21.valueType;
});
function be6(e8, r21, c19) {
  return new w16({ type: "record", keyType: e8, valueType: r21, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(c19) });
}
function qo2(e8, r21, c19) {
  let t10 = l5(e8);
  return t10._zod.values = void 0, new w16({ type: "record", keyType: t10, valueType: r21, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(c19) });
}
function Ho2(e8, r21, c19) {
  return new w16({ type: "record", keyType: e8, valueType: r21, mode: "loose", ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(c19) });
}
var Oe6 = l6("ZodMap", (e8, r21) => {
  Kn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => A10(e8, c19, t10, n18), e8.keyType = r21.keyType, e8.valueType = r21.valueType, e8.min = (...c19) => e8.check($s(...c19)), e8.nonempty = (c19) => e8.check($s(1, c19)), e8.max = (...c19) => e8.check(xs(...c19)), e8.size = (...c19) => e8.check(bs(...c19));
});
function Qo2(e8, r21, c19) {
  return new Oe6({ type: "map", keyType: e8, valueType: r21, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(c19) });
}
var Ie5 = l6("ZodSet", (e8, r21) => {
  Gn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => F6(e8, c19, t10, n18), e8.min = (...c19) => e8.check($s(...c19)), e8.nonempty = (c19) => e8.check($s(1, c19)), e8.max = (...c19) => e8.check(xs(...c19)), e8.size = (...c19) => e8.check(bs(...c19));
});
function er2(e8, r21) {
  return new Ie5({ type: "set", valueType: e8, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(r21) });
}
var _16 = l6("ZodEnum", (e8, r21) => {
  Jn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (t10, n18, s20) => k8(e8, t10, n18, s20), e8.enum = r21.entries, e8.options = Object.values(r21.entries);
  let c19 = new Set(Object.keys(r21.entries));
  e8.extract = (t10, n18) => {
    let s20 = {};
    for (let m16 of t10) if (c19.has(m16)) s20[m16] = r21.entries[m16];
    else throw new Error(`Key ${m16} not found in enum`);
    return new _16({ ...r21, checks: [], ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(n18), entries: s20 });
  }, e8.exclude = (t10, n18) => {
    let s20 = { ...r21.entries };
    for (let m16 of t10) if (c19.has(m16)) delete s20[m16];
    else throw new Error(`Key ${m16} not found in enum`);
    return new _16({ ...r21, checks: [], ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(n18), entries: s20 });
  };
});
function ce8(e8, r21) {
  let c19 = Array.isArray(e8) ? Object.fromEntries(e8.map((t10) => [t10, t10])) : e8;
  return new _16({ type: "enum", entries: c19, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(r21) });
}
function or2(e8, r21) {
  return new _16({ type: "enum", entries: e8, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(r21) });
}
var Te5 = l6("ZodLiteral", (e8, r21) => {
  Yn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => M5(e8, c19, t10, n18), e8.values = new Set(r21.values), Object.defineProperty(e8, "value", { get() {
    if (r21.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
    return r21.values[0];
  } });
});
function rr2(e8, r21) {
  return new Te5({ type: "literal", values: Array.isArray(e8) ? e8 : [e8], ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(r21) });
}
var De5 = l6("ZodFile", (e8, r21) => {
  qn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => B6(e8, c19, t10, n18), e8.min = (c19, t10) => e8.check($s(c19, t10)), e8.max = (c19, t10) => e8.check(xs(c19, t10)), e8.mime = (c19, t10) => e8.check(Cs(Array.isArray(c19) ? c19 : [c19], t10));
});
function cr2(e8) {
  return Hs(De5, e8);
}
var Je5 = l6("ZodTransform", (e8, r21) => {
  Hn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => C7(e8, c19, t10, n18), e8._zod.parse = (c19, t10) => {
    if (t10.direction === "backward") throw new S10(e8.constructor.name);
    c19.addIssue = (s20) => {
      if (typeof s20 == "string") c19.issues.push(zod_4_3_6_es2022_v4_core_util_exports.issue(s20, c19.value, r21));
      else {
        let m16 = s20;
        m16.fatal && (m16.continue = false), m16.code ?? (m16.code = "custom"), m16.input ?? (m16.input = c19.value), m16.inst ?? (m16.inst = e8), c19.issues.push(zod_4_3_6_es2022_v4_core_util_exports.issue(m16));
      }
    };
    let n18 = r21.transform(c19.value, c19);
    return n18 instanceof Promise ? n18.then((s20) => (c19.value = s20, c19)) : (c19.value = n18, c19);
  };
});
function te8(e8) {
  return new Je5({ type: "transform", transform: e8 });
}
var ne8 = l6("ZodOptional", (e8, r21) => {
  br.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => oe6(e8, c19, t10, n18), e8.unwrap = () => e8._zod.def.innerType;
});
function $8(e8) {
  return new ne8({ type: "optional", innerType: e8 });
}
var Ue5 = l6("ZodExactOptional", (e8, r21) => {
  Xn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => oe6(e8, c19, t10, n18), e8.unwrap = () => e8._zod.def.innerType;
});
function Ce5(e8) {
  return new Ue5({ type: "optional", innerType: e8 });
}
var Ee6 = l6("ZodNullable", (e8, r21) => {
  Qn.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => W8(e8, c19, t10, n18), e8.unwrap = () => e8._zod.def.innerType;
});
function S12(e8) {
  return new Ee6({ type: "nullable", innerType: e8 });
}
function tr2(e8) {
  return $8(S12(e8));
}
var je5 = l6("ZodDefault", (e8, r21) => {
  eo.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => Y7(e8, c19, t10, n18), e8.unwrap = () => e8._zod.def.innerType, e8.removeDefault = e8.unwrap;
});
function Ae4(e8, r21) {
  return new je5({ type: "default", innerType: e8, get defaultValue() {
    return typeof r21 == "function" ? r21() : zod_4_3_6_es2022_v4_core_util_exports.shallowClone(r21);
  } });
}
var Le5 = l6("ZodPrefault", (e8, r21) => {
  to.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => Z8(e8, c19, t10, n18), e8.unwrap = () => e8._zod.def.innerType;
});
function Fe5(e8, r21) {
  return new Le5({ type: "prefault", innerType: e8, get defaultValue() {
    return typeof r21 == "function" ? r21() : zod_4_3_6_es2022_v4_core_util_exports.shallowClone(r21);
  } });
}
var ue8 = l6("ZodNonOptional", (e8, r21) => {
  ro.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => X7(e8, c19, t10, n18), e8.unwrap = () => e8._zod.def.innerType;
});
function Re4(e8, r21) {
  return new ue8({ type: "nonoptional", innerType: e8, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(r21) });
}
var Be5 = l6("ZodSuccess", (e8, r21) => {
  no.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => q8(e8, c19, t10, n18), e8.unwrap = () => e8._zod.def.innerType;
});
function nr2(e8) {
  return new Be5({ type: "success", innerType: e8 });
}
var Me6 = l6("ZodCatch", (e8, r21) => {
  oo.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => ee6(e8, c19, t10, n18), e8.unwrap = () => e8._zod.def.innerType, e8.removeCatch = e8.unwrap;
});
function Ve5(e8, r21) {
  return new Me6({ type: "catch", innerType: e8, catchValue: typeof r21 == "function" ? r21 : () => r21 });
}
var We5 = l6("ZodNaN", (e8, r21) => {
  so.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => V5(e8, c19, t10, n18);
});
function ur2(e8) {
  return hs(We5, e8);
}
var ae7 = l6("ZodPipe", (e8, r21) => {
  io.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => te6(e8, c19, t10, n18), e8.in = r21.in, e8.out = r21.out;
});
function g7(e8, r21) {
  return new ae7({ type: "pipe", in: e8, out: r21 });
}
var pe8 = l6("ZodCodec", (e8, r21) => {
  ae7.init(e8, r21), Pt4.init(e8, r21);
});
function ar2(e8, r21, c19) {
  return new pe8({ type: "pipe", in: e8, out: r21, transform: c19.decode, reverseTransform: c19.encode });
}
var Xe5 = l6("ZodReadonly", (e8, r21) => {
  uo.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => ne6(e8, c19, t10, n18), e8.unwrap = () => e8._zod.def.innerType;
});
function Ge5(e8) {
  return new Xe5({ type: "readonly", innerType: e8 });
}
var Ke5 = l6("ZodTemplateLiteral", (e8, r21) => {
  co.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => L6(e8, c19, t10, n18);
});
function pr2(e8, r21) {
  return new Ke5({ type: "template_literal", parts: e8, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(r21) });
}
var Ye5 = l6("ZodLazy", (e8, r21) => {
  po.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => se7(e8, c19, t10, n18), e8.unwrap = () => e8._zod.def.getter();
});
function qe6(e8) {
  return new Ye5({ type: "lazy", getter: e8 });
}
var He6 = l6("ZodPromise", (e8, r21) => {
  lo.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => re5(e8, c19, t10, n18), e8.unwrap = () => e8._zod.def.innerType;
});
function dr2(e8) {
  return new He6({ type: "promise", innerType: e8 });
}
var Qe5 = l6("ZodFunction", (e8, r21) => {
  ao.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => K8(e8, c19, t10, n18);
});
function ir2(e8) {
  return new Qe5({ type: "function", input: Array.isArray(e8?.input) ? we6(e8?.input) : e8?.input ?? v10(Z10()), output: e8?.output ?? Z10() });
}
var b6 = l6("ZodCustom", (e8, r21) => {
  mo.init(e8, r21), p7.init(e8, r21), e8._zod.processJSONSchema = (c19, t10, n18) => D7(e8, c19, t10, n18);
});
function sr2(e8) {
  let r21 = new x10({ check: "custom" });
  return r21._zod.check = e8, r21;
}
function lr2(e8, r21) {
  return li(b6, e8 ?? (() => true), r21);
}
function eo2(e8, r21 = {}) {
  return pi(b6, e8, r21);
}
function oo2(e8) {
  return mi(e8);
}
var mr2 = fi;
var hr2 = hi;
function xr2(e8, r21 = {}) {
  let c19 = new b6({ type: "custom", check: "custom", fn: (t10) => t10 instanceof e8, abort: true, ...zod_4_3_6_es2022_v4_core_util_exports.normalizeParams(r21) });
  return c19._zod.bag.Class = e8, c19._zod.check = (t10) => {
    t10.value instanceof e8 || t10.issues.push({ code: "invalid_type", expected: e8.name, input: t10.value, inst: c19, path: [...c19._zod.def.path ?? []] });
  }, c19;
}
var Zr2 = (...e8) => di({ Codec: pe8, Boolean: H9, String: J8 }, ...e8);
function kr2(e8) {
  let r21 = qe6(() => re7([I11(e8), se9(), le8(), Ze5(), v10(r21), be6(I11(), r21)]));
  return r21;
}
function _r2(e8, r21) {
  return g7(te8(e8), r21);
}

// vendor/neon/zod_4.3.6_es2022_v4_classic_external.mjs
var O11 = Object.defineProperty;
var I12 = (e8, o21) => {
  for (var s20 in o21) O11(e8, s20, { get: o21[s20], enumerable: true });
};
var B9 = { invalid_type: "invalid_type", too_big: "too_big", too_small: "too_small", invalid_format: "invalid_format", not_multiple_of: "not_multiple_of", unrecognized_keys: "unrecognized_keys", invalid_union: "invalid_union", invalid_key: "invalid_key", invalid_element: "invalid_element", invalid_value: "invalid_value", custom: "custom" };
function C10(e8) {
  w15({ customError: e8 });
}
function D10() {
  return w15().customError;
}
var v11;
v11 || (v11 = {});
var r13 = { ...zod_4_3_6_es2022_v4_classic_schemas_exports, ...zod_4_3_6_es2022_v4_classic_checks_exports, iso: zod_4_3_6_es2022_v4_classic_iso_exports };
var j11 = /* @__PURE__ */ new Set(["$schema", "$ref", "$defs", "definitions", "$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor", "type", "enum", "const", "anyOf", "oneOf", "allOf", "not", "properties", "required", "additionalProperties", "patternProperties", "propertyNames", "minProperties", "maxProperties", "items", "prefixItems", "additionalItems", "minItems", "maxItems", "uniqueItems", "contains", "minContains", "maxContains", "minLength", "maxLength", "pattern", "format", "minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum", "multipleOf", "description", "default", "contentEncoding", "contentMediaType", "contentSchema", "unevaluatedItems", "unevaluatedProperties", "if", "then", "else", "dependentSchemas", "dependentRequired", "nullable", "readOnly"]);
function P8(e8, o21) {
  let s20 = e8.$schema;
  return s20 === "https://json-schema.org/draft/2020-12/schema" ? "draft-2020-12" : s20 === "http://json-schema.org/draft-07/schema#" ? "draft-7" : s20 === "http://json-schema.org/draft-04/schema#" ? "draft-4" : o21 ?? "draft-2020-12";
}
function R16(e8, o21) {
  if (!e8.startsWith("#")) throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
  let s20 = e8.slice(1).split("/").filter(Boolean);
  if (s20.length === 0) return o21.rootSchema;
  let i20 = o21.version === "draft-2020-12" ? "$defs" : "definitions";
  if (s20[0] === i20) {
    let t10 = s20[1];
    if (!t10 || !o21.defs[t10]) throw new Error(`Reference not found: ${e8}`);
    return o21.defs[t10];
  }
  throw new Error(`Reference not found: ${e8}`);
}
function x12(e8, o21) {
  if (e8.not !== void 0) {
    if (typeof e8.not == "object" && Object.keys(e8.not).length === 0) return r13.never();
    throw new Error("not is not supported in Zod (except { not: {} } for never)");
  }
  if (e8.unevaluatedItems !== void 0) throw new Error("unevaluatedItems is not supported");
  if (e8.unevaluatedProperties !== void 0) throw new Error("unevaluatedProperties is not supported");
  if (e8.if !== void 0 || e8.then !== void 0 || e8.else !== void 0) throw new Error("Conditional schemas (if/then/else) are not supported");
  if (e8.dependentSchemas !== void 0 || e8.dependentRequired !== void 0) throw new Error("dependentSchemas and dependentRequired are not supported");
  if (e8.$ref) {
    let t10 = e8.$ref;
    if (o21.refs.has(t10)) return o21.refs.get(t10);
    if (o21.processing.has(t10)) return r13.lazy(() => {
      if (!o21.refs.has(t10)) throw new Error(`Circular reference not resolved: ${t10}`);
      return o21.refs.get(t10);
    });
    o21.processing.add(t10);
    let n18 = R16(t10, o21), a16 = u8(n18, o21);
    return o21.refs.set(t10, a16), o21.processing.delete(t10), a16;
  }
  if (e8.enum !== void 0) {
    let t10 = e8.enum;
    if (o21.version === "openapi-3.0" && e8.nullable === true && t10.length === 1 && t10[0] === null) return r13.null();
    if (t10.length === 0) return r13.never();
    if (t10.length === 1) return r13.literal(t10[0]);
    if (t10.every((a16) => typeof a16 == "string")) return r13.enum(t10);
    let n18 = t10.map((a16) => r13.literal(a16));
    return n18.length < 2 ? n18[0] : r13.union([n18[0], n18[1], ...n18.slice(2)]);
  }
  if (e8.const !== void 0) return r13.literal(e8.const);
  let s20 = e8.type;
  if (Array.isArray(s20)) {
    let t10 = s20.map((n18) => {
      let a16 = { ...e8, type: n18 };
      return x12(a16, o21);
    });
    return t10.length === 0 ? r13.never() : t10.length === 1 ? t10[0] : r13.union(t10);
  }
  if (!s20) return r13.any();
  let i20;
  switch (s20) {
    case "string": {
      let t10 = r13.string();
      if (e8.format) {
        let n18 = e8.format;
        n18 === "email" ? t10 = t10.check(r13.email()) : n18 === "uri" || n18 === "uri-reference" ? t10 = t10.check(r13.url()) : n18 === "uuid" || n18 === "guid" ? t10 = t10.check(r13.uuid()) : n18 === "date-time" ? t10 = t10.check(r13.iso.datetime()) : n18 === "date" ? t10 = t10.check(r13.iso.date()) : n18 === "time" ? t10 = t10.check(r13.iso.time()) : n18 === "duration" ? t10 = t10.check(r13.iso.duration()) : n18 === "ipv4" ? t10 = t10.check(r13.ipv4()) : n18 === "ipv6" ? t10 = t10.check(r13.ipv6()) : n18 === "mac" ? t10 = t10.check(r13.mac()) : n18 === "cidr" ? t10 = t10.check(r13.cidrv4()) : n18 === "cidr-v6" ? t10 = t10.check(r13.cidrv6()) : n18 === "base64" ? t10 = t10.check(r13.base64()) : n18 === "base64url" ? t10 = t10.check(r13.base64url()) : n18 === "e164" ? t10 = t10.check(r13.e164()) : n18 === "jwt" ? t10 = t10.check(r13.jwt()) : n18 === "emoji" ? t10 = t10.check(r13.emoji()) : n18 === "nanoid" ? t10 = t10.check(r13.nanoid()) : n18 === "cuid" ? t10 = t10.check(r13.cuid()) : n18 === "cuid2" ? t10 = t10.check(r13.cuid2()) : n18 === "ulid" ? t10 = t10.check(r13.ulid()) : n18 === "xid" ? t10 = t10.check(r13.xid()) : n18 === "ksuid" && (t10 = t10.check(r13.ksuid()));
      }
      typeof e8.minLength == "number" && (t10 = t10.min(e8.minLength)), typeof e8.maxLength == "number" && (t10 = t10.max(e8.maxLength)), e8.pattern && (t10 = t10.regex(new RegExp(e8.pattern))), i20 = t10;
      break;
    }
    case "number":
    case "integer": {
      let t10 = s20 === "integer" ? r13.number().int() : r13.number();
      typeof e8.minimum == "number" && (t10 = t10.min(e8.minimum)), typeof e8.maximum == "number" && (t10 = t10.max(e8.maximum)), typeof e8.exclusiveMinimum == "number" ? t10 = t10.gt(e8.exclusiveMinimum) : e8.exclusiveMinimum === true && typeof e8.minimum == "number" && (t10 = t10.gt(e8.minimum)), typeof e8.exclusiveMaximum == "number" ? t10 = t10.lt(e8.exclusiveMaximum) : e8.exclusiveMaximum === true && typeof e8.maximum == "number" && (t10 = t10.lt(e8.maximum)), typeof e8.multipleOf == "number" && (t10 = t10.multipleOf(e8.multipleOf)), i20 = t10;
      break;
    }
    case "boolean": {
      i20 = r13.boolean();
      break;
    }
    case "null": {
      i20 = r13.null();
      break;
    }
    case "object": {
      let t10 = {}, n18 = e8.properties || {}, a16 = new Set(e8.required || []);
      for (let [l19, d13] of Object.entries(n18)) {
        let y15 = u8(d13, o21);
        t10[l19] = a16.has(l19) ? y15 : y15.optional();
      }
      if (e8.propertyNames) {
        let l19 = u8(e8.propertyNames, o21), d13 = e8.additionalProperties && typeof e8.additionalProperties == "object" ? u8(e8.additionalProperties, o21) : r13.any();
        if (Object.keys(t10).length === 0) {
          i20 = r13.record(l19, d13);
          break;
        }
        let y15 = r13.object(t10).passthrough(), p21 = r13.looseRecord(l19, d13);
        i20 = r13.intersection(y15, p21);
        break;
      }
      if (e8.patternProperties) {
        let l19 = e8.patternProperties, d13 = Object.keys(l19), y15 = [];
        for (let g12 of d13) {
          let b12 = u8(l19[g12], o21), h17 = r13.string().regex(new RegExp(g12));
          y15.push(r13.looseRecord(h17, b12));
        }
        let p21 = [];
        if (Object.keys(t10).length > 0 && p21.push(r13.object(t10).passthrough()), p21.push(...y15), p21.length === 0) i20 = r13.object({}).passthrough();
        else if (p21.length === 1) i20 = p21[0];
        else {
          let g12 = r13.intersection(p21[0], p21[1]);
          for (let b12 = 2; b12 < p21.length; b12++) g12 = r13.intersection(g12, p21[b12]);
          i20 = g12;
        }
        break;
      }
      let f17 = r13.object(t10);
      e8.additionalProperties === false ? i20 = f17.strict() : typeof e8.additionalProperties == "object" ? i20 = f17.catchall(u8(e8.additionalProperties, o21)) : i20 = f17.passthrough();
      break;
    }
    case "array": {
      let t10 = e8.prefixItems, n18 = e8.items;
      if (t10 && Array.isArray(t10)) {
        let a16 = t10.map((l19) => u8(l19, o21)), f17 = n18 && typeof n18 == "object" && !Array.isArray(n18) ? u8(n18, o21) : void 0;
        f17 ? i20 = r13.tuple(a16).rest(f17) : i20 = r13.tuple(a16), typeof e8.minItems == "number" && (i20 = i20.check(r13.minLength(e8.minItems))), typeof e8.maxItems == "number" && (i20 = i20.check(r13.maxLength(e8.maxItems)));
      } else if (Array.isArray(n18)) {
        let a16 = n18.map((l19) => u8(l19, o21)), f17 = e8.additionalItems && typeof e8.additionalItems == "object" ? u8(e8.additionalItems, o21) : void 0;
        f17 ? i20 = r13.tuple(a16).rest(f17) : i20 = r13.tuple(a16), typeof e8.minItems == "number" && (i20 = i20.check(r13.minLength(e8.minItems))), typeof e8.maxItems == "number" && (i20 = i20.check(r13.maxLength(e8.maxItems)));
      } else if (n18 !== void 0) {
        let a16 = u8(n18, o21), f17 = r13.array(a16);
        typeof e8.minItems == "number" && (f17 = f17.min(e8.minItems)), typeof e8.maxItems == "number" && (f17 = f17.max(e8.maxItems)), i20 = f17;
      } else i20 = r13.array(r13.any());
      break;
    }
    default:
      throw new Error(`Unsupported type: ${s20}`);
  }
  return e8.description && (i20 = i20.describe(e8.description)), e8.default !== void 0 && (i20 = i20.default(e8.default)), i20;
}
function u8(e8, o21) {
  if (typeof e8 == "boolean") return e8 ? r13.any() : r13.never();
  let s20 = x12(e8, o21), i20 = e8.type || e8.enum !== void 0 || e8.const !== void 0;
  if (e8.anyOf && Array.isArray(e8.anyOf)) {
    let f17 = e8.anyOf.map((d13) => u8(d13, o21)), l19 = r13.union(f17);
    s20 = i20 ? r13.intersection(s20, l19) : l19;
  }
  if (e8.oneOf && Array.isArray(e8.oneOf)) {
    let f17 = e8.oneOf.map((d13) => u8(d13, o21)), l19 = r13.xor(f17);
    s20 = i20 ? r13.intersection(s20, l19) : l19;
  }
  if (e8.allOf && Array.isArray(e8.allOf)) if (e8.allOf.length === 0) s20 = i20 ? s20 : r13.any();
  else {
    let f17 = i20 ? s20 : u8(e8.allOf[0], o21), l19 = i20 ? 0 : 1;
    for (let d13 = l19; d13 < e8.allOf.length; d13++) f17 = r13.intersection(f17, u8(e8.allOf[d13], o21));
    s20 = f17;
  }
  e8.nullable === true && o21.version === "openapi-3.0" && (s20 = r13.nullable(s20)), e8.readOnly === true && (s20 = r13.readonly(s20));
  let t10 = {}, n18 = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
  for (let f17 of n18) f17 in e8 && (t10[f17] = e8[f17]);
  let a16 = ["contentEncoding", "contentMediaType", "contentSchema"];
  for (let f17 of a16) f17 in e8 && (t10[f17] = e8[f17]);
  for (let f17 of Object.keys(e8)) j11.has(f17) || (t10[f17] = e8[f17]);
  return Object.keys(t10).length > 0 && o21.registry.add(s20, t10), s20;
}
function A14(e8, o21) {
  if (typeof e8 == "boolean") return e8 ? r13.any() : r13.never();
  let s20 = P8(e8, o21?.defaultTarget), i20 = e8.$defs || e8.definitions || {}, t10 = { version: s20, defs: i20, refs: /* @__PURE__ */ new Map(), processing: /* @__PURE__ */ new Set(), rootSchema: e8, registry: o21?.registry ?? d5 };
  return u8(e8, t10);
}
var S13 = {};
I12(S13, { bigint: () => N12, boolean: () => L8, date: () => T15, number: () => Z11, string: () => M8 });
function M8(e8) {
  return zo(J8, e8);
}
function Z11(e8) {
  return Go(q10, e8);
}
function L8(e8) {
  return es(H9, e8);
}
function N12(e8) {
  return rs(Q8, e8);
}
function T15(e8) {
  return fs($e5, e8);
}
w15(c10());

// vendor/neon/zod_4.3.6_es2022_zod.mjs
var r14 = zod_4_3_6_es2022_v4_classic_external_exports;

// vendor/neon/_neondatabase_auth_0.5.0-beta_es2022_dist_adapter-core-CZ8saNEY.mjs
var j12 = class {
  inFlightRequests = /* @__PURE__ */ new Map();
  async deduplicate(e8, n18) {
    let t10 = this.inFlightRequests.get(e8);
    if (t10) return t10;
    let s20 = n18().finally(() => {
      this.inFlightRequests.delete(e8);
    });
    return this.inFlightRequests.set(e8, s20), s20;
  }
  clear(e8) {
    this.inFlightRequests.delete(e8);
  }
  clearAll() {
    this.inFlightRequests.clear();
  }
  has(e8) {
    return this.inFlightRequests.has(e8);
  }
  size() {
    return this.inFlightRequests.size;
  }
};
function K11(e8) {
  try {
    let n18 = e8.split(".");
    if (n18.length !== 3) return null;
    let t10 = JSON.parse(atob(n18[1])).exp;
    return typeof t10 == "number" ? t10 : null;
  } catch {
    return null;
  }
}
var v12 = class {
  cache = null;
  get() {
    return this.cache ? Date.now() > this.cache.expiresAt ? (this.cache = null, null) : this.cache.data : null;
  }
  set(e8, n18) {
    let t10 = this.calculateTTL(n18);
    this.cache = { data: e8, expiresAt: Date.now() + t10 };
  }
  clear() {
    this.cache = null;
  }
  has() {
    return this.get() !== null;
  }
  calculateTTL(e8) {
    if (!e8) return g2;
    let n18 = K11(e8);
    if (!n18) return g2;
    let t10 = Date.now(), s20 = n18 * 1e3 - t10 - A2;
    return Math.max(s20, 1e3);
  }
};
var V8 = class {
  cache = new v12();
  lastSessionData = null;
  invalidated = false;
  getCachedSession() {
    return this.invalidated ? null : this.cache.get();
  }
  setCachedSession(e8) {
    this.invalidated || (this.lastSessionData = this.cache.get(), this.cache.set(e8, e8.session.token));
  }
  invalidateSessionCache() {
    this.invalidated = true;
  }
  clearSessionCache() {
    this.cache.clear(), this.lastSessionData = null, this.invalidated = false;
  }
  wasTokenRefreshed(e8) {
    return !this.lastSessionData?.session?.token || !e8?.session?.token ? false : this.lastSessionData.session.token !== e8.session.token;
  }
};
var $9 = class {
  cache = new v12();
  getCachedResponse() {
    return this.cache.get();
  }
  setCachedResponse(e8) {
    this.cache.set(e8, e8.token);
  }
  clearCache() {
    this.cache.clear();
  }
  hasCachedResponse() {
    return this.cache.has();
  }
};
async function J9(e8) {
  return new Promise((s20, o21) => {
    let i20 = globalThis.open(e8, "neon_oauth_popup", "width=500,height=700,popup=yes");
    if (!i20 || i20.closed) {
      o21(new Error("Popup blocked. Please allow popups for this site."));
      return;
    }
    let r21 = setTimeout(() => {
      c19();
      try {
        i20.close();
      } catch {
      }
      o21(new Error("OAuth popup timed out. Please try again."));
    }, 12e4), u18 = setInterval(() => {
      try {
        i20.closed && (c19(), o21(new Error("OAuth popup was closed. Please try again.")));
      } catch {
      }
    }, 500);
    function c19() {
      clearTimeout(r21), clearInterval(u18), globalThis.removeEventListener("message", a16);
    }
    function a16(h17) {
      h17.origin === globalThis.location.origin && h17.data?.type === R2 && (c19(), s20({ verifier: h17.data.verifier || null }));
    }
    globalThis.addEventListener("message", a16);
  });
}
var T16 = () => globalThis.window !== void 0 && typeof document < "u";
var X10 = () => {
  if (!T16()) return false;
  try {
    return globalThis.self !== globalThis.top;
  } catch {
    return true;
  }
};
var U8 = "/token/anonymous";
var z11 = r14.object({ token: r14.string(), expires_at: r14.number() });
var W11 = () => ({ id: "anonymous-token", pathMethods: { [U8]: "GET" }, getActions: (e8) => ({ getAnonymousToken: async (n18) => await e8(U8, { method: "GET", ...n18 }) }) });
var R17 = crypto.randomUUID();
var F9 = new j12();
var l9 = new V8();
var N13 = new $9();
var f10 = { signUp: "/sign-up", signIn: "/sign-in", signOut: "/sign-out", updateUser: "/update-user", getSession: "/get-session", token: "/token", anonymousSignIn: "/sign-in/anonymous", anonymousToken: "/token/anonymous" };
async function Y10(e8, n18) {
  let t10 = JSON.parse(n18?.body || "{}"), s20 = t10.callbackURL || "/", o21 = new URL(F3, globalThis.location.origin);
  o21.searchParams.set(P2, "1"), o21.searchParams.set(T3, s20), t10.callbackURL = o21.toString(), t10.disableRedirect = true;
  let i20 = await fetch(e8, { ...n18, body: JSON.stringify(t10) }), r21 = await i20.json(), u18 = r21.url;
  if (!u18) throw new Error("Failed to get OAuth URL");
  let c19 = await J9(u18);
  if (!c19.verifier) throw new Error("OAuth completed but no session verifier received");
  let a16 = new URL(s20, globalThis.location.origin);
  return a16.searchParams.set(I3, c19.verifier), globalThis.location.href = a16.toString(), Response.json(r21, { status: i20.status });
}
var S14 = { signUp: { onRequest: () => {
}, onSuccess: (e8) => {
  if (m10(e8)) {
    let n18 = { session: e8.session, user: e8.user };
    l9.setCachedSession(n18), p8({ type: "SIGN_IN", data: n18 });
  }
} }, signIn: { beforeFetch: (e8, n18) => !(typeof e8 == "string" ? e8 : e8.toString()).includes("/sign-in/social") || !X10() ? null : Y10(e8, n18), onRequest: () => {
}, onSuccess: (e8) => {
  if (m10(e8)) {
    let n18 = { session: e8.session, user: e8.user };
    l9.setCachedSession(n18), p8({ type: "SIGN_IN", data: n18 });
  }
} }, signOut: { onRequest: () => {
  l9.invalidateSessionCache(), F9.clearAll();
}, onSuccess: () => {
  l9.clearSessionCache(), p8({ type: "SIGN_OUT" });
} }, updateUser: { onRequest: () => {
}, onSuccess: (e8) => {
  if (m10(e8)) {
    let n18 = { session: e8.session, user: e8.user };
    l9.setCachedSession(n18), p8({ type: "USER_UPDATE", data: n18 });
  } else l9.clearSessionCache(), p8({ type: "USER_UPDATE" });
} }, getSession: { beforeFetch: () => {
  if (T16() && new URLSearchParams(globalThis.window.location.search).has(I3)) return null;
  let e8 = l9.getCachedSession();
  return e8 ? Response.json(e8, { status: 200 }) : null;
}, onRequest: (e8) => {
  if (!T16()) return;
  let n18 = new URLSearchParams(globalThis.window.location.search).get(I3);
  if (n18) {
    let t10 = typeof e8.url == "string" ? new URL(e8.url) : e8.url;
    return t10.searchParams.set(I3, n18), { ...e8, url: t10 };
  }
}, onSuccess: (e8) => {
  if (m10(e8)) {
    let n18 = { session: e8.session, user: e8.user }, t10 = l9.wasTokenRefreshed(n18);
    if (l9.setCachedSession(n18), t10 && p8({ type: "TOKEN_REFRESH", data: n18 }), T16()) {
      let s20 = new URL(globalThis.window.location.href);
      s20.searchParams.get(I3) && (s20.searchParams.delete(I3), history.replaceState(history.state, "", s20.href));
    }
  }
} }, anonymousToken: { beforeFetch: () => {
  let e8 = N13.getCachedResponse();
  return e8 ? Response.json(e8, { status: 200 }) : null;
}, onRequest: () => {
}, onSuccess: (e8) => {
  let n18 = z11.safeParse(e8);
  n18.success && N13.setCachedResponse(n18.data);
} } };
async function p8(e8) {
  let n18 = Q9(e8), t10 = "data" in e8 ? e8.data : null, s20 = Z12(e8);
  s20 && i4().post({ event: "session", data: { trigger: s20 }, clientId: R17 }), i4().post({ event: "session", data: { trigger: n18, sessionData: t10 }, clientId: R17 });
}
function Q9(e8) {
  switch (e8.type) {
    case "SIGN_IN":
      return "SIGNED_IN";
    case "SIGN_OUT":
      return "SIGNED_OUT";
    case "TOKEN_REFRESH":
      return "TOKEN_REFRESHED";
    case "USER_UPDATE":
      return "USER_UPDATED";
  }
}
function Z12(e8) {
  switch (e8.type) {
    case "SIGN_OUT":
      return "signout";
    case "TOKEN_REFRESH":
      return null;
    case "USER_UPDATE":
      return "updateUser";
    case "SIGN_IN":
      return null;
  }
}
function m10(e8) {
  return !!(e8 && typeof e8 == "object" && "session" in e8 && "user" in e8 && e8.session !== null && e8.user !== null);
}
function E17(e8) {
  if (e8.includes("/sign-in/anonymous")) return "anonymousSignIn";
  if (e8.includes(f10.anonymousToken)) return "anonymousToken";
  if (e8.includes(f10.signIn)) return "signIn";
  if (e8.includes(f10.signUp)) return "signUp";
  if (e8.includes(f10.signOut)) return "signOut";
  if (e8.includes(f10.updateUser)) return "updateUser";
  if (e8.includes(f10.getSession) || e8.includes(f10.token)) return "getSession";
}
function ee9() {
  if (T16() && globalThis.opener && globalThis.opener !== globalThis) {
    let e8 = new URLSearchParams(globalThis.location.search);
    if (e8.has(P2)) {
      let n18 = e8.get(I3), t10 = e8.get(T3);
      globalThis.opener.postMessage({ type: R2, verifier: n18, originalCallback: t10 }, "*"), globalThis.close();
      return;
    }
  }
  i4().subscribe((e8) => {
    if (e8.clientId === R17) return;
    let n18 = e8.data?.trigger;
    (n18 === "signout" || n18 === "updateUser" || n18 === "getSession") && l9.clearSessionCache();
  });
}
var ne9 = "@neondatabase/auth";
var se10 = "0.5.0-beta";
var O12 = "X-Neon-Client-Info";
function g8(e8) {
  return e8 in globalThis;
}
function te9() {
  if (typeof A4 < "u" && A4.env && (A4.env.NEXT_RUNTIME || A4.env.__NEXT_PRIVATE_ORIGIN)) return "next";
  if (typeof globalThis.window < "u") {
    if (g8("__NEXT_DATA__")) return "next";
    if (g8("__remixContext")) return "remix";
    if (g8("__REACT_DEVTOOLS_GLOBAL_HOOK__")) return "react";
    if (g8("__VUE__")) return "vue";
    if (g8("Zone")) return "angular";
  }
}
function b7(e8, n18) {
  let t10 = { sdk: e8, version: n18, runtime: "unknown", runtimeVersion: "unknown", platform: "unknown", arch: "unknown" }, s20;
  typeof A4 < "u" && A4.versions?.node ? s20 = { ...t10, runtime: "node", runtimeVersion: A4.versions.node, platform: A4.platform, arch: A4.arch } : typeof Deno < "u" ? s20 = { ...t10, runtime: "deno", runtimeVersion: Deno.version?.deno ?? "unknown", platform: Deno.build?.os ?? "unknown", arch: Deno.build?.arch ?? "unknown" } : typeof Bun < "u" ? s20 = { ...t10, runtime: "bun", runtimeVersion: Bun.version ?? "unknown", platform: A4?.platform ?? "unknown", arch: A4?.arch ?? "unknown" } : typeof EdgeRuntime < "u" || typeof A4 < "u" && !A4.versions?.node && typeof globalThis.window > "u" && typeof document > "u" ? s20 = { ...t10, runtime: "edge" } : globalThis.window !== void 0 && typeof document < "u" ? s20 = { ...t10, runtime: "browser", runtimeVersion: "unknown", platform: "web", arch: "unknown" } : s20 = t10;
  let o21 = te9();
  return o21 && (s20.framework = o21), s20;
}
function oe9(e8, n18) {
  let t10 = JSON.stringify(b7(e8, n18));
  return function(o21, i20) {
    let r21 = new Headers(o21);
    if (r21.has(O12)) return r21;
    let u18 = i20 ? JSON.stringify(b7(i20.name, i20.version)) : t10;
    return r21.set(O12, u18), r21;
  };
}
var ie9 = oe9(ne9, se10);
var I13 = "X-Force-Fetch";
var ae8 = [me5(), Y5(), He3(), ie5(), ge4(), qe3(), W11()];
var he9 = class {
  betterAuthOptions;
  constructor(e8) {
    let n18 = e8.fetchOptions?.onSuccess, t10 = e8.fetchOptions?.onRequest;
    this.betterAuthOptions = { ...e8, plugins: ae8, fetchOptions: { ...e8.fetchOptions, throw: false, onRequest: (s20) => {
      let o21 = s20.url, i20 = E17(o21.toString());
      i20 && S14[i20].onRequest(s20), t10?.(s20);
    }, customFetchImpl: async (s20, o21) => {
      let i20 = ie9(o21?.headers);
      if (i20.has(I13)) {
        i20.delete(I13);
        let a16 = await fetch(s20, { ...o21, headers: i20 });
        if (!a16.ok) {
          let h17 = await a16.clone().json().catch(() => ({}));
          throw C3({ status: a16.status, statusText: a16.statusText, message: h17.message || `HTTP ${a16.status} ${a16.statusText}`, code: h17.code, body: h17 });
        }
        return a16;
      }
      let r21 = E17(s20.toString());
      if (r21) {
        let a16 = await S14[r21].beforeFetch?.(s20, o21);
        if (a16) return a16;
      }
      let u18 = `${o21?.method || "GET"}:${s20}:${o21?.body || ""}`, c19 = await F9.deduplicate(u18, () => fetch(s20, { ...o21, headers: i20 }));
      if (!c19.ok) {
        let a16 = await c19.clone().json().catch(() => ({}));
        throw C3({ status: c19.status, statusText: c19.statusText, message: a16.message || `HTTP ${c19.status} ${c19.statusText}`, code: a16.code, body: a16 });
      }
      return c19.clone();
    }, onSuccess: async (s20) => {
      let o21 = s20.response.headers.get("set-auth-jwt");
      o21 && (s20.data?.session ? s20.data.session.token = o21 : console.warn("[onSuccess] JWT found but no session data to inject into!"));
      let i20 = s20.request.url.toString(), r21 = s20.data, u18 = E17(i20);
      u18 && S14[u18].onSuccess(r21), await n18?.(s20);
    } } }, ee9();
  }
  async getJWTToken(e8) {
    let n18 = this.getBetterAuthInstance(), t10 = await n18.getSession();
    return t10.data?.session?.token ? t10.data.session.token : e8 ? (await n18.getAnonymousToken()).data?.token ?? null : null;
  }
};

// vendor/neon/jose_6.2.5_es2022_dist_webapi_lib_buffer_utils.mjs
var s12 = new TextEncoder();
var d7 = new TextDecoder();
var u9 = new TextDecoder("utf-8", { fatal: true });
var c13 = 2 ** 32;

// vendor/neon/jose_6.2.5_es2022_errors.mjs
var s13 = class extends Error {
  static code = "ERR_JOSE_GENERIC";
  code = "ERR_JOSE_GENERIC";
  constructor(t10, e8) {
    super(t10, e8), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
  }
};
var I14 = class extends s13 {
  static code = "ERR_JOSE_NOT_SUPPORTED";
  code = "ERR_JOSE_NOT_SUPPORTED";
};

// vendor/neon/jose_6.2.5_es2022_dist_webapi_lib_helpers.mjs
var p11 = Symbol();

// vendor/neon/jose_6.2.5_es2022_dist_webapi_lib_key.mjs
var h9 = Symbol();
var f11 = Symbol();
var m11 = Symbol();
var c14 = Symbol();

// vendor/neon/jose_6.2.5_es2022_dist_webapi_lib_key_descriptor.mjs
function c15(t10) {
  let n18 = { __proto__: null };
  for (let o21 of Object.keys(t10)) n18[o21] = { ...t10[o21], alg: o21 };
  return n18;
}

// vendor/neon/jose_6.2.5_es2022_dist_webapi_lib_jwe_algorithms.mjs
var S15 = { public: ["encrypt", "wrapKey"], private: ["decrypt", "unwrapKey"] };
var C11 = { public: [], private: ["deriveBits"] };
var c16 = { public: [], private: [] };
function r16(e8) {
  return { kty: ["RSA"], subtle: { name: "RSA-OAEP", hash: `SHA-${e8}` }, usages: S15, minModulusLength: 2048, keyOps: { encrypt: "wrapKey", decrypt: "unwrapKey" } };
}
function n13(e8) {
  return { kty: ["EC", "OKP"], subtle: { name: "ECDH" }, subtleFor: ({ kty: t10, crv: a16, asymmetricKeyType: d13 }) => {
    if (a16 === "X25519" || d13 === "x25519") return { name: "X25519" };
    if (t10 === "OKP") throw new I14('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    return { name: "ECDH", namedCurve: a16 };
  }, usages: C11, kwBits: e8, keyOps: { decrypt: "deriveBits" } };
}
function s14(e8) {
  return { kty: ["oct"], symmetric: true, subtle: { name: "AES-KW", length: e8 }, usages: c16, keyOps: { encrypt: "wrapKey", decrypt: "unwrapKey" } };
}
function u11(e8) {
  return { kty: ["oct"], symmetric: true, subtle: { name: "AES-GCM", length: e8 }, usages: c16, gcmkw: `A${e8}GCM`, keyOps: { encrypt: "encrypt", decrypt: "decrypt" } };
}
function p14(e8, t10) {
  return { kty: ["oct"], symmetric: true, subtle: { name: "PBKDF2" }, usages: c16, pbes2Hash: `SHA-${e8}`, kwBits: t10, keyOps: { encrypt: "deriveBits", decrypt: "deriveBits" } };
}
var m12 = c15({ dir: { kty: ["oct"], symmetric: true, subtle: { name: "AES-GCM" }, usages: c16, keyOps: { encrypt: "encrypt", decrypt: "decrypt" } }, "RSA-OAEP": r16(1), "RSA-OAEP-256": r16(256), "RSA-OAEP-384": r16(384), "RSA-OAEP-512": r16(512), "ECDH-ES": n13(), "ECDH-ES+A128KW": n13(128), "ECDH-ES+A192KW": n13(192), "ECDH-ES+A256KW": n13(256), A128KW: s14(128), A192KW: s14(192), A256KW: s14(256), A128GCMKW: u11(128), A192GCMKW: u11(192), A256GCMKW: u11(256), "PBES2-HS256+A128KW": p14(256, 128), "PBES2-HS384+A192KW": p14(384, 192), "PBES2-HS512+A256KW": p14(512, 256) });
var l11 = { public: [], private: [] };
var E18 = { encrypt: "encrypt", decrypt: "decrypt" };
function o16(e8) {
  return { kty: ["oct"], symmetric: true, subtle: { name: "AES-GCM", length: e8 }, usages: l11, keyOps: E18, cekBits: e8, ivBits: 96, cbc: false };
}
function y10(e8) {
  return { kty: ["oct"], symmetric: true, subtle: { name: "AES-CBC", length: e8 }, usages: l11, keyOps: E18, cekBits: e8, ivBits: 128, cbc: true };
}
var g9 = c15({ A128GCM: o16(128), A192GCM: o16(192), A256GCM: o16(256), "A128CBC-HS256": y10(256), "A192CBC-HS384": y10(384), "A256CBC-HS512": y10(512) });

// vendor/neon/jose_6.2.5_es2022_dist_webapi_lib_jws_algorithms.mjs
var n14 = { public: ["verify"], private: ["sign"] };
function o18(t10) {
  let S16 = { name: "HMAC", hash: `SHA-${t10}` };
  return { kty: ["oct"], symmetric: true, subtle: S16, operation: S16, usages: n14 };
}
function e7(t10, S16, i20) {
  let r21 = { name: t10, hash: `SHA-${S16}` };
  return { kty: ["RSA"], subtle: r21, operation: i20 ? { ...r21, saltLength: i20 } : r21, usages: n14, minModulusLength: 2048 };
}
function s16(t10, S16) {
  return { kty: ["EC"], crv: t10, subtle: { name: "ECDSA", namedCurve: t10 }, operation: { name: "ECDSA", hash: `SHA-${S16}` }, usages: n14 };
}
function a14() {
  let t10 = { name: "Ed25519" };
  return { kty: ["OKP"], crv: "Ed25519", subtle: t10, operation: t10, usages: n14 };
}
function u13(t10) {
  let S16 = { name: t10 };
  return { kty: ["AKP"], subtle: S16, operation: S16, usages: n14 };
}
var A15 = c15({ HS256: o18(256), HS384: o18(384), HS512: o18(512), RS256: e7("RSASSA-PKCS1-v1_5", 256), RS384: e7("RSASSA-PKCS1-v1_5", 384), RS512: e7("RSASSA-PKCS1-v1_5", 512), PS256: e7("RSA-PSS", 256, 32), PS384: e7("RSA-PSS", 384, 48), PS512: e7("RSA-PSS", 512, 64), ES256: s16("P-256", 256), ES384: s16("P-384", 384), ES512: s16("P-521", 512), EdDSA: a14(), Ed25519: a14(), "ML-DSA-44": u13("ML-DSA-44"), "ML-DSA-65": u13("ML-DSA-65"), "ML-DSA-87": u13("ML-DSA-87") });

// vendor/neon/jose_6.2.5_es2022_dist_webapi_lib_jwt_claims_set.mjs
var g10 = 60;
var D11 = g10 * 60;
var b9 = D11 * 24;
var M9 = b9 * 7;
var _18 = b9 * 365.25;

// vendor/neon/jose_6.2.5_es2022_jwks_remote.mjs
var o19;
(typeof navigator > "u" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) && (o19 = "jose/v6.2.5");
var m13 = Symbol();
var n16 = Symbol();

// vendor/neon/_neondatabase_auth_0.5.0-beta_es2022_dist_supabase-adapter-CKXlmI3i.mjs
var _19 = class extends he9 {
  _betterAuth;
  constructor(e8) {
    super(e8), this._betterAuth = y6(this.betterAuthOptions);
  }
  getBetterAuthInstance() {
    return this._betterAuth;
  }
};
function R19(e8) {
  return (t10, r21) => new _19({ baseURL: t10, ...e8, fetchOptions: { ...e8?.fetchOptions, headers: { ...e8?.fetchOptions?.headers, ...r21?.headers } } });
}

// vendor/neon/_neondatabase_auth_0.5.0-beta_es2022_dist_neon-auth-BLCDc-bu.mjs
function s19(n18, t10) {
  let o21 = t10?.adapter ?? R19(), { fetchOptions: r21 } = t10 ?? {}, e8 = o21(n18, r21), a16 = t10?.allowAnonymous ?? false;
  return typeof e8.initialize != "function" ? { getJWTToken: () => e8.getJWTToken(a16), adapter: e8.getBetterAuthInstance() } : { getJWTToken: () => e8.getJWTToken(a16), adapter: e8 };
}
function l17(n18, t10) {
  return s19(n18, t10).adapter;
}

// vendor/neon/_supabase_postgrest-js_2.79.0_es2022_postgrest-js.mjs
var require2 = (n18) => {
  const e8 = (m16) => typeof m16.default < "u" ? m16.default : m16, c19 = (m16) => Object.assign({ __esModule: true }, m16);
  switch (n18) {
    case "tslib":
      return c19(tslib_2_8_1_es2022_tslib_exports);
    default:
      console.error('module "' + n18 + '" not found');
      return null;
  }
};
var X12 = Object.create;
var F11 = Object.defineProperty;
var Y12 = Object.getOwnPropertyDescriptor;
var Z14 = Object.getOwnPropertyNames;
var ee11 = Object.getPrototypeOf;
var te11 = Object.prototype.hasOwnProperty;
var m14 = ((h17) => typeof require2 < "u" ? require2 : typeof Proxy < "u" ? new Proxy(h17, { get: (e8, t10) => (typeof require2 < "u" ? require2 : e8)[t10] }) : h17)(function(h17) {
  if (typeof require2 < "u") return require2.apply(this, arguments);
  throw Error('Dynamic require of "' + h17 + '" is not supported');
});
var p19 = (h17, e8) => () => (e8 || h17((e8 = { exports: {} }).exports, e8), e8.exports);
var se11 = (h17, e8, t10, s20) => {
  if (e8 && typeof e8 == "object" || typeof e8 == "function") for (let r21 of Z14(e8)) !te11.call(h17, r21) && r21 !== t10 && F11(h17, r21, { get: () => e8[r21], enumerable: !(s20 = Y12(e8, r21)) || s20.enumerable });
  return h17;
};
var re9 = (h17, e8, t10) => (t10 = h17 != null ? X12(ee11(h17)) : {}, se11(e8 || !h17 || !h17.__esModule ? F11(t10, "default", { value: h17, enumerable: true }) : t10, h17));
var b11 = p19((O15) => {
  "use strict";
  Object.defineProperty(O15, "__esModule", { value: true });
  var w25 = class extends Error {
    constructor(e8) {
      super(e8.message), this.name = "PostgrestError", this.details = e8.details, this.hint = e8.hint, this.code = e8.code;
    }
  };
  O15.default = w25;
});
var k11 = p19((x16) => {
  "use strict";
  Object.defineProperty(x16, "__esModule", { value: true });
  var ie11 = m14("tslib"), ae9 = ie11.__importDefault(b11()), q11 = class {
    constructor(e8) {
      var t10, s20;
      this.shouldThrowOnError = false, this.method = e8.method, this.url = e8.url, this.headers = new Headers(e8.headers), this.schema = e8.schema, this.body = e8.body, this.shouldThrowOnError = (t10 = e8.shouldThrowOnError) !== null && t10 !== void 0 ? t10 : false, this.signal = e8.signal, this.isMaybeSingle = (s20 = e8.isMaybeSingle) !== null && s20 !== void 0 ? s20 : false, e8.fetch ? this.fetch = e8.fetch : this.fetch = fetch;
    }
    throwOnError() {
      return this.shouldThrowOnError = true, this;
    }
    setHeader(e8, t10) {
      return this.headers = new Headers(this.headers), this.headers.set(e8, t10), this;
    }
    then(e8, t10) {
      this.schema === void 0 || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), this.method !== "GET" && this.method !== "HEAD" && this.headers.set("Content-Type", "application/json");
      let s20 = this.fetch, r21 = s20(this.url.toString(), { method: this.method, headers: this.headers, body: JSON.stringify(this.body), signal: this.signal }).then(async (i20) => {
        var a16, n18, l19, c19;
        let u18 = null, o21 = null, f17 = null, g12 = i20.status, $10 = i20.statusText;
        if (i20.ok) {
          if (this.method !== "HEAD") {
            let j13 = await i20.text();
            j13 === "" || (this.headers.get("Accept") === "text/csv" || this.headers.get("Accept") && (!((a16 = this.headers.get("Accept")) === null || a16 === void 0) && a16.includes("application/vnd.pgrst.plan+text")) ? o21 = j13 : o21 = JSON.parse(j13));
          }
          let _21 = (n18 = this.headers.get("Prefer")) === null || n18 === void 0 ? void 0 : n18.match(/count=(exact|planned|estimated)/), v13 = (l19 = i20.headers.get("content-range")) === null || l19 === void 0 ? void 0 : l19.split("/");
          _21 && v13 && v13.length > 1 && (f17 = parseInt(v13[1])), this.isMaybeSingle && this.method === "GET" && Array.isArray(o21) && (o21.length > 1 ? (u18 = { code: "PGRST116", details: `Results contain ${o21.length} rows, application/vnd.pgrst.object+json requires 1 row`, hint: null, message: "JSON object requested, multiple (or no) rows returned" }, o21 = null, f17 = null, g12 = 406, $10 = "Not Acceptable") : o21.length === 1 ? o21 = o21[0] : o21 = null);
        } else {
          let _21 = await i20.text();
          try {
            u18 = JSON.parse(_21), Array.isArray(u18) && i20.status === 404 && (o21 = [], u18 = null, g12 = 200, $10 = "OK");
          } catch {
            i20.status === 404 && _21 === "" ? (g12 = 204, $10 = "No Content") : u18 = { message: _21 };
          }
          if (u18 && this.isMaybeSingle && (!((c19 = u18?.details) === null || c19 === void 0) && c19.includes("0 rows")) && (u18 = null, g12 = 200, $10 = "OK"), u18 && this.shouldThrowOnError) throw new ae9.default(u18);
        }
        return { error: u18, data: o21, count: f17, status: g12, statusText: $10 };
      });
      return this.shouldThrowOnError || (r21 = r21.catch((i20) => {
        var a16, n18, l19;
        return { error: { message: `${(a16 = i20?.name) !== null && a16 !== void 0 ? a16 : "FetchError"}: ${i20?.message}`, details: `${(n18 = i20?.stack) !== null && n18 !== void 0 ? n18 : ""}`, hint: "", code: `${(l19 = i20?.code) !== null && l19 !== void 0 ? l19 : ""}` }, data: null, count: null, status: 0, statusText: "" };
      })), r21.then(e8, t10);
    }
    returns() {
      return this;
    }
    overrideTypes() {
      return this;
    }
  };
  x16.default = q11;
});
var T20 = p19((S16) => {
  "use strict";
  Object.defineProperty(S16, "__esModule", { value: true });
  var ne11 = m14("tslib"), he10 = ne11.__importDefault(k11()), B11 = class extends he10.default {
    select(e8) {
      let t10 = false, s20 = (e8 ?? "*").split("").map((r21) => /\s/.test(r21) && !t10 ? "" : (r21 === '"' && (t10 = !t10), r21)).join("");
      return this.url.searchParams.set("select", s20), this.headers.append("Prefer", "return=representation"), this;
    }
    order(e8, { ascending: t10 = true, nullsFirst: s20, foreignTable: r21, referencedTable: i20 = r21 } = {}) {
      let a16 = i20 ? `${i20}.order` : "order", n18 = this.url.searchParams.get(a16);
      return this.url.searchParams.set(a16, `${n18 ? `${n18},` : ""}${e8}.${t10 ? "asc" : "desc"}${s20 === void 0 ? "" : s20 ? ".nullsfirst" : ".nullslast"}`), this;
    }
    limit(e8, { foreignTable: t10, referencedTable: s20 = t10 } = {}) {
      let r21 = typeof s20 > "u" ? "limit" : `${s20}.limit`;
      return this.url.searchParams.set(r21, `${e8}`), this;
    }
    range(e8, t10, { foreignTable: s20, referencedTable: r21 = s20 } = {}) {
      let i20 = typeof r21 > "u" ? "offset" : `${r21}.offset`, a16 = typeof r21 > "u" ? "limit" : `${r21}.limit`;
      return this.url.searchParams.set(i20, `${e8}`), this.url.searchParams.set(a16, `${t10 - e8 + 1}`), this;
    }
    abortSignal(e8) {
      return this.signal = e8, this;
    }
    single() {
      return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
    }
    maybeSingle() {
      return this.method === "GET" ? this.headers.set("Accept", "application/json") : this.headers.set("Accept", "application/vnd.pgrst.object+json"), this.isMaybeSingle = true, this;
    }
    csv() {
      return this.headers.set("Accept", "text/csv"), this;
    }
    geojson() {
      return this.headers.set("Accept", "application/geo+json"), this;
    }
    explain({ analyze: e8 = false, verbose: t10 = false, settings: s20 = false, buffers: r21 = false, wal: i20 = false, format: a16 = "text" } = {}) {
      var n18;
      let l19 = [e8 ? "analyze" : null, t10 ? "verbose" : null, s20 ? "settings" : null, r21 ? "buffers" : null, i20 ? "wal" : null].filter(Boolean).join("|"), c19 = (n18 = this.headers.get("Accept")) !== null && n18 !== void 0 ? n18 : "application/json";
      return this.headers.set("Accept", `application/vnd.pgrst.plan+${a16}; for="${c19}"; options=${l19};`), a16 === "json" ? this : this;
    }
    rollback() {
      return this.headers.append("Prefer", "tx=rollback"), this;
    }
    returns() {
      return this;
    }
    maxAffected(e8) {
      return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${e8}`), this;
    }
  };
  S16.default = B11;
});
var A18 = p19((D13) => {
  "use strict";
  Object.defineProperty(D13, "__esModule", { value: true });
  var le9 = m14("tslib"), ue9 = le9.__importDefault(T20()), oe10 = new RegExp("[,()]"), E21 = class extends ue9.default {
    eq(e8, t10) {
      return this.url.searchParams.append(e8, `eq.${t10}`), this;
    }
    neq(e8, t10) {
      return this.url.searchParams.append(e8, `neq.${t10}`), this;
    }
    gt(e8, t10) {
      return this.url.searchParams.append(e8, `gt.${t10}`), this;
    }
    gte(e8, t10) {
      return this.url.searchParams.append(e8, `gte.${t10}`), this;
    }
    lt(e8, t10) {
      return this.url.searchParams.append(e8, `lt.${t10}`), this;
    }
    lte(e8, t10) {
      return this.url.searchParams.append(e8, `lte.${t10}`), this;
    }
    like(e8, t10) {
      return this.url.searchParams.append(e8, `like.${t10}`), this;
    }
    likeAllOf(e8, t10) {
      return this.url.searchParams.append(e8, `like(all).{${t10.join(",")}}`), this;
    }
    likeAnyOf(e8, t10) {
      return this.url.searchParams.append(e8, `like(any).{${t10.join(",")}}`), this;
    }
    ilike(e8, t10) {
      return this.url.searchParams.append(e8, `ilike.${t10}`), this;
    }
    ilikeAllOf(e8, t10) {
      return this.url.searchParams.append(e8, `ilike(all).{${t10.join(",")}}`), this;
    }
    ilikeAnyOf(e8, t10) {
      return this.url.searchParams.append(e8, `ilike(any).{${t10.join(",")}}`), this;
    }
    is(e8, t10) {
      return this.url.searchParams.append(e8, `is.${t10}`), this;
    }
    in(e8, t10) {
      let s20 = Array.from(new Set(t10)).map((r21) => typeof r21 == "string" && oe10.test(r21) ? `"${r21}"` : `${r21}`).join(",");
      return this.url.searchParams.append(e8, `in.(${s20})`), this;
    }
    contains(e8, t10) {
      return typeof t10 == "string" ? this.url.searchParams.append(e8, `cs.${t10}`) : Array.isArray(t10) ? this.url.searchParams.append(e8, `cs.{${t10.join(",")}}`) : this.url.searchParams.append(e8, `cs.${JSON.stringify(t10)}`), this;
    }
    containedBy(e8, t10) {
      return typeof t10 == "string" ? this.url.searchParams.append(e8, `cd.${t10}`) : Array.isArray(t10) ? this.url.searchParams.append(e8, `cd.{${t10.join(",")}}`) : this.url.searchParams.append(e8, `cd.${JSON.stringify(t10)}`), this;
    }
    rangeGt(e8, t10) {
      return this.url.searchParams.append(e8, `sr.${t10}`), this;
    }
    rangeGte(e8, t10) {
      return this.url.searchParams.append(e8, `nxl.${t10}`), this;
    }
    rangeLt(e8, t10) {
      return this.url.searchParams.append(e8, `sl.${t10}`), this;
    }
    rangeLte(e8, t10) {
      return this.url.searchParams.append(e8, `nxr.${t10}`), this;
    }
    rangeAdjacent(e8, t10) {
      return this.url.searchParams.append(e8, `adj.${t10}`), this;
    }
    overlaps(e8, t10) {
      return typeof t10 == "string" ? this.url.searchParams.append(e8, `ov.${t10}`) : this.url.searchParams.append(e8, `ov.{${t10.join(",")}}`), this;
    }
    textSearch(e8, t10, { config: s20, type: r21 } = {}) {
      let i20 = "";
      r21 === "plain" ? i20 = "pl" : r21 === "phrase" ? i20 = "ph" : r21 === "websearch" && (i20 = "w");
      let a16 = s20 === void 0 ? "" : `(${s20})`;
      return this.url.searchParams.append(e8, `${i20}fts${a16}.${t10}`), this;
    }
    match(e8) {
      return Object.entries(e8).forEach(([t10, s20]) => {
        this.url.searchParams.append(t10, `eq.${s20}`);
      }), this;
    }
    not(e8, t10, s20) {
      return this.url.searchParams.append(e8, `not.${t10}.${s20}`), this;
    }
    or(e8, { foreignTable: t10, referencedTable: s20 = t10 } = {}) {
      let r21 = s20 ? `${s20}.or` : "or";
      return this.url.searchParams.append(r21, `(${e8})`), this;
    }
    filter(e8, t10, s20) {
      return this.url.searchParams.append(e8, `${t10}.${s20}`), this;
    }
  };
  D13.default = E21;
});
var C12 = p19((M10) => {
  "use strict";
  Object.defineProperty(M10, "__esModule", { value: true });
  var de7 = m14("tslib"), y15 = de7.__importDefault(A18()), H11 = class {
    constructor(e8, { headers: t10 = {}, schema: s20, fetch: r21 }) {
      this.url = e8, this.headers = new Headers(t10), this.schema = s20, this.fetch = r21;
    }
    select(e8, t10) {
      let { head: s20 = false, count: r21 } = t10 ?? {}, i20 = s20 ? "HEAD" : "GET", a16 = false, n18 = (e8 ?? "*").split("").map((l19) => /\s/.test(l19) && !a16 ? "" : (l19 === '"' && (a16 = !a16), l19)).join("");
      return this.url.searchParams.set("select", n18), r21 && this.headers.append("Prefer", `count=${r21}`), new y15.default({ method: i20, url: this.url, headers: this.headers, schema: this.schema, fetch: this.fetch });
    }
    insert(e8, { count: t10, defaultToNull: s20 = true } = {}) {
      var r21;
      let i20 = "POST";
      if (t10 && this.headers.append("Prefer", `count=${t10}`), s20 || this.headers.append("Prefer", "missing=default"), Array.isArray(e8)) {
        let a16 = e8.reduce((n18, l19) => n18.concat(Object.keys(l19)), []);
        if (a16.length > 0) {
          let n18 = [...new Set(a16)].map((l19) => `"${l19}"`);
          this.url.searchParams.set("columns", n18.join(","));
        }
      }
      return new y15.default({ method: i20, url: this.url, headers: this.headers, schema: this.schema, body: e8, fetch: (r21 = this.fetch) !== null && r21 !== void 0 ? r21 : fetch });
    }
    upsert(e8, { onConflict: t10, ignoreDuplicates: s20 = false, count: r21, defaultToNull: i20 = true } = {}) {
      var a16;
      let n18 = "POST";
      if (this.headers.append("Prefer", `resolution=${s20 ? "ignore" : "merge"}-duplicates`), t10 !== void 0 && this.url.searchParams.set("on_conflict", t10), r21 && this.headers.append("Prefer", `count=${r21}`), i20 || this.headers.append("Prefer", "missing=default"), Array.isArray(e8)) {
        let l19 = e8.reduce((c19, u18) => c19.concat(Object.keys(u18)), []);
        if (l19.length > 0) {
          let c19 = [...new Set(l19)].map((u18) => `"${u18}"`);
          this.url.searchParams.set("columns", c19.join(","));
        }
      }
      return new y15.default({ method: n18, url: this.url, headers: this.headers, schema: this.schema, body: e8, fetch: (a16 = this.fetch) !== null && a16 !== void 0 ? a16 : fetch });
    }
    update(e8, { count: t10 } = {}) {
      var s20;
      let r21 = "PATCH";
      return t10 && this.headers.append("Prefer", `count=${t10}`), new y15.default({ method: r21, url: this.url, headers: this.headers, schema: this.schema, body: e8, fetch: (s20 = this.fetch) !== null && s20 !== void 0 ? s20 : fetch });
    }
    delete({ count: e8 } = {}) {
      var t10;
      let s20 = "DELETE";
      return e8 && this.headers.append("Prefer", `count=${e8}`), new y15.default({ method: s20, url: this.url, headers: this.headers, schema: this.schema, fetch: (t10 = this.fetch) !== null && t10 !== void 0 ? t10 : fetch });
    }
  };
  M10.default = H11;
});
var L13 = p19((R20) => {
  "use strict";
  Object.defineProperty(R20, "__esModule", { value: true });
  var J11 = m14("tslib"), ce9 = J11.__importDefault(C12()), fe9 = J11.__importDefault(A18()), N17 = class h17 {
    constructor(e8, { headers: t10 = {}, schema: s20, fetch: r21 } = {}) {
      this.url = e8, this.headers = new Headers(t10), this.schemaName = s20, this.fetch = r21;
    }
    from(e8) {
      let t10 = new URL(`${this.url}/${e8}`);
      return new ce9.default(t10, { headers: new Headers(this.headers), schema: this.schemaName, fetch: this.fetch });
    }
    schema(e8) {
      return new h17(this.url, { headers: this.headers, schema: e8, fetch: this.fetch });
    }
    rpc(e8, t10 = {}, { head: s20 = false, get: r21 = false, count: i20 } = {}) {
      var a16;
      let n18, l19 = new URL(`${this.url}/rpc/${e8}`), c19;
      s20 || r21 ? (n18 = s20 ? "HEAD" : "GET", Object.entries(t10).filter(([o21, f17]) => f17 !== void 0).map(([o21, f17]) => [o21, Array.isArray(f17) ? `{${f17.join(",")}}` : `${f17}`]).forEach(([o21, f17]) => {
        l19.searchParams.append(o21, f17);
      })) : (n18 = "POST", c19 = t10);
      let u18 = new Headers(this.headers);
      return i20 && u18.set("Prefer", `count=${i20}`), new fe9.default({ method: n18, url: l19, headers: u18, schema: this.schemaName, body: c19, fetch: (a16 = this.fetch) !== null && a16 !== void 0 ? a16 : fetch });
    }
  };
  R20.default = N17;
});
var W14 = p19((d13) => {
  "use strict";
  Object.defineProperty(d13, "__esModule", { value: true });
  d13.PostgrestError = d13.PostgrestBuilder = d13.PostgrestTransformBuilder = d13.PostgrestFilterBuilder = d13.PostgrestQueryBuilder = d13.PostgrestClient = void 0;
  var P12 = m14("tslib"), Q11 = P12.__importDefault(L13());
  d13.PostgrestClient = Q11.default;
  var K13 = P12.__importDefault(C12());
  d13.PostgrestQueryBuilder = K13.default;
  var U10 = P12.__importDefault(A18());
  d13.PostgrestFilterBuilder = U10.default;
  var z13 = P12.__importDefault(T20());
  d13.PostgrestTransformBuilder = z13.default;
  var I15 = P12.__importDefault(k11());
  d13.PostgrestBuilder = I15.default;
  var V9 = P12.__importDefault(b11());
  d13.PostgrestError = V9.default;
  d13.default = { PostgrestClient: Q11.default, PostgrestQueryBuilder: K13.default, PostgrestFilterBuilder: U10.default, PostgrestTransformBuilder: z13.default, PostgrestBuilder: I15.default, PostgrestError: V9.default };
});
var G13 = re9(W14(), 1);
var { PostgrestClient: pe9, PostgrestQueryBuilder: me9, PostgrestFilterBuilder: Pe8, PostgrestTransformBuilder: ge9, PostgrestBuilder: $e6, PostgrestError: _e7 } = G13.default || G13;

// vendor/neon/_neondatabase_postgrest-js_0.2.0-beta_es2022_postgrest-js.mjs
var k12 = class extends pe9 {
  constructor({ dataApiUrl: e8, options: o21 }) {
    super(e8, { headers: o21?.global?.headers, fetch: o21?.global?.fetch, schema: o21?.db?.schema });
  }
};
var l18 = "@neondatabase/postgrest-js";
var h16 = "0.2.0-beta";
var c18 = "X-Neon-Client-Info";
function u17(e8) {
  return e8 in globalThis;
}
function p20() {
  if (typeof A4 < "u" && A4.env && (A4.env.NEXT_RUNTIME || A4.env.__NEXT_PRIVATE_ORIGIN)) return "next";
  if (typeof globalThis.window < "u") {
    if (u17("__NEXT_DATA__")) return "next";
    if (u17("__remixContext")) return "remix";
    if (u17("__REACT_DEVTOOLS_GLOBAL_HOOK__")) return "react";
    if (u17("__VUE__")) return "vue";
    if (u17("Zone")) return "angular";
  }
}
function a15(e8, o21) {
  let r21 = { sdk: e8, version: o21, runtime: "unknown", runtimeVersion: "unknown", platform: "unknown", arch: "unknown" }, n18;
  typeof A4 < "u" && A4.versions?.node ? n18 = { ...r21, runtime: "node", runtimeVersion: A4.versions.node, platform: A4.platform, arch: A4.arch } : typeof Deno < "u" ? n18 = { ...r21, runtime: "deno", runtimeVersion: Deno.version?.deno ?? "unknown", platform: Deno.build?.os ?? "unknown", arch: Deno.build?.arch ?? "unknown" } : typeof Bun < "u" ? n18 = { ...r21, runtime: "bun", runtimeVersion: Bun.version ?? "unknown", platform: A4?.platform ?? "unknown", arch: A4?.arch ?? "unknown" } : typeof EdgeRuntime < "u" || typeof A4 < "u" && !A4.versions?.node && typeof globalThis.window > "u" && typeof document > "u" ? n18 = { ...r21, runtime: "edge" } : globalThis.window !== void 0 && typeof document < "u" ? n18 = { ...r21, runtime: "browser", runtimeVersion: "unknown", platform: "web", arch: "unknown" } : n18 = r21;
  let s20 = p20();
  return s20 && (n18.framework = s20), n18;
}
function m15(e8, o21) {
  let r21 = JSON.stringify(a15(e8, o21));
  return function(s20, i20) {
    let t10 = new Headers(s20);
    if (t10.has(c18)) return t10;
    let f17 = i20 ? JSON.stringify(a15(i20.name, i20.version)) : r21;
    return t10.set(c18, f17), t10;
  };
}
var w24 = m15(l18, h16);
var _20 = class extends Error {
  constructor(e8 = "Authentication required. A valid token is needed to access the resource.") {
    super(e8), this.name = "AuthRequiredError";
  }
};
function g11(e8, o21) {
  let r21 = o21 ?? fetch;
  return async (n18, s20) => {
    let i20 = await e8();
    if (!i20) throw new _20();
    let t10 = w24(s20?.headers);
    return t10.has("Authorization") || t10.set("Authorization", `Bearer ${i20}`), r21(n18, { ...s20, headers: t10 });
  };
}
export {
  R19 as BetterAuthVanillaAdapter,
  k12 as NeonPostgrestClient,
  l17 as createAuthClient,
  g11 as fetchWithToken
};
