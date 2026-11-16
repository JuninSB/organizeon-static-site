// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, S || (S = !0, O());
			else {
				var t = n(l);
				t !== null && j(x, t.startTime - e);
			}
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function D() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && j(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? O() : S = !1;
			}
		}
	}
	var O;
	if (typeof y == "function") O = function() {
		y(D);
	};
	else if (typeof MessageChannel < "u") {
		var k = new MessageChannel(), A = k.port2;
		k.port1.onmessage = D, O = function() {
			A.postMessage(null);
		};
	} else O = function() {
		_(D, 0);
	};
	function j(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, j(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.for("react.view_transition"), m = Symbol.iterator;
	function h(e) {
		return typeof e != "object" || !e ? null : (e = m && e[m] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var g = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, _ = Object.assign, v = {};
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	y.prototype.isReactComponent = {}, y.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, y.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function b() {}
	b.prototype = y.prototype;
	function x(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	var S = x.prototype = new b();
	S.constructor = x, _(S, y.prototype), S.isPureReactComponent = !0;
	var C = Array.isArray;
	function w() {}
	var T = {
		H: null,
		A: null,
		T: null,
		S: null
	}, E = Object.prototype.hasOwnProperty;
	function D(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function O(e, t) {
		return D(e.type, t, e.props);
	}
	function k(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function A(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var j = /\/+/g;
	function M(e, t) {
		return typeof e == "object" && e && e.key != null ? A("" + e.key) : t.toString(36);
	}
	function N(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(w, w) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function P(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, P(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + M(e, 0) : a, C(o) ? (i = "", c != null && (i = c.replace(j, "$&/") + "/"), P(o, r, i, "", function(e) {
			return e;
		})) : o != null && (k(o) && (o = O(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(j, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (C(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + M(a, u), c += P(a, r, i, s, o);
		else if (u = h(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + M(a, u++), c += P(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return P(N(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function F(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return P(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function I(e) {
		if (e._status === -1) {
			var t = e._result, n = t();
			n.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t, n.status === void 0 && (n.status = "fulfilled", n.value = t));
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t, n.status === void 0 && (n.status = "rejected", n.reason = t));
			}), e._status === -1 && (e._status = 0, e._result = n);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var L = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function R(e) {
		var t = T.T, n = {};
		n.types = t === null ? null : t.types, T.T = n;
		try {
			var r = e(), i = T.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(w, L);
		} catch (e) {
			L(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), T.T = t;
		}
	}
	function z(e) {
		var t = T.T;
		if (t !== null) {
			var n = t.types;
			n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
		} else R(z.bind(null, e));
	}
	var B = {
		map: F,
		forEach: function(e, t, n) {
			F(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return F(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return F(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!k(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = B, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = x, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = T, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return T.H.useMemoCache(e);
		}
	}, e.addTransitionType = z, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = _({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !E.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return D(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) E.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return D(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = k, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: I
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = R, e.unstable_useCacheRefresh = function() {
		return T.H.useCacheRefresh();
	}, e.use = function(e) {
		return T.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return T.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return T.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return T.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return T.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return T.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return T.H.useEffectEvent(e);
	}, e.useId = function() {
		return T.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return T.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return T.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return T.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return T.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return T.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return T.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return T.H.useRef(e);
	}, e.useState = function(e) {
		return T.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return T.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return T.H.useTransition();
	}, e.version = "19.3.1";
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = f();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal"), o = Symbol.for("react.recoverable"), s = Symbol.for("react.optimistic_key");
	function c(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : r === s ? s : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var l = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function u(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.browser = function(e) {
		return {
			$$typeof: o,
			_reason: e
		};
	}, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return c(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = l.T, n = i.p;
		try {
			if (l.T = null, i.p = 2, e) return e();
		} finally {
			l.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = u(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0,
						fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = u(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return l.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return l.H.useHostTransitionStatus();
	}, e.version = "19.3.1";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = u(), n = f(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
		for (; t.return;) t = t.return;
		return t.tag === 3 ? e : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function h(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && h(e.child, t, n, r, i, a)) return !0;
			e = e.sibling;
		}
		return !1;
	}
	function g(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function _(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function v(e) {
		var t = [null, null], n = g(e);
		return n === null || y(t, e, n.child, { foundSelf: !1 }), t;
	}
	function y(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && y(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function b(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var x = null, S = null;
	function C(e, t, n) {
		return e === n || e === t && (x = e, !0);
	}
	function w(e, t, n) {
		return e === n ? (S = e, !1) : e === t && (S !== null && (x = e), !0);
	}
	function T(e) {
		if (e === null) return null;
		do
			e = e === null ? null : e.return;
		while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
		return e || null;
	}
	function E(e, t, n) {
		for (var r = 0, i = e; i; i = n(i)) r++;
		i = 0;
		for (var a = t; a; a = n(a)) i++;
		for (; 0 < r - i;) e = n(e), r--;
		for (; 0 < i - r;) t = n(t), i--;
		for (; r--;) {
			if (e === t || t !== null && e === t.alternate) return e;
			e = n(e), t = n(t);
		}
		return null;
	}
	var D = Object.assign, O = Symbol.for("react.element"), k = Symbol.for("react.transitional.element"), A = Symbol.for("react.portal"), j = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), P = Symbol.for("react.consumer"), F = Symbol.for("react.context"), I = Symbol.for("react.forward_ref"), L = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), z = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), V = Symbol.for("react.activity"), ee = Symbol.for("react.legacy_hidden"), H = Symbol.for("react.memo_cache_sentinel"), te = Symbol.for("react.view_transition"), ne = Symbol.for("react.recoverable"), re = Symbol.iterator;
	function ie(e) {
		return typeof e != "object" || !e ? null : (e = re && e[re] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ae = Symbol.for("react.client.reference");
	function oe(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ae ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case j: return "Fragment";
			case N: return "Profiler";
			case M: return "StrictMode";
			case L: return "Suspense";
			case R: return "SuspenseList";
			case V: return "Activity";
			case te: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case A: return "Portal";
			case F: return e.displayName || "Context";
			case P: return (e._context.displayName || "Context") + ".Consumer";
			case I:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case z: return t = e.displayName || null, t === null ? oe(e.type) || "Memo" : t;
			case B:
				t = e._payload, e = e._init;
				try {
					return oe(e(t));
				} catch {}
		}
		return null;
	}
	var se = Array.isArray, U = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ce = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, le = [], ue = -1;
	function de(e) {
		return { current: e };
	}
	function fe(e) {
		0 > ue || (e.current = le[ue], le[ue] = null, ue--);
	}
	function G(e, t) {
		ue++, le[ue] = e.current, e.current = t;
	}
	var pe = de(null), K = de(null), me = de(null), he = de(null);
	function ge(e, t) {
		switch (G(me, t), G(K, e), G(pe, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? up(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = up(t), e = dp(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		fe(pe), G(pe, e);
	}
	function _e() {
		fe(pe), fe(K), fe(me);
	}
	function ve(e) {
		var t = e.memoizedState;
		t !== null && (sh._currentValue = t.memoizedState, G(he, e)), t = pe.current;
		var n = dp(t, e.type);
		t !== n && (G(K, e), G(pe, n));
	}
	function ye(e) {
		K.current === e && (fe(pe), fe(K)), he.current === e && (fe(he), sh._currentValue = ce);
	}
	var be, xe;
	function Se(e) {
		if (be === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			be = t && t[1] || "", xe = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + be + e + xe;
	}
	var Ce = !1;
	function we(e, t) {
		if (!e || Ce) return "";
		Ce = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							n = !1;
							try {
								var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
								Object.defineProperty(e.prototype, "props", {
									configurable: !0,
									set: function() {
										throw Error();
									}
								}), n = !0, new e();
							} finally {
								n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
							}
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Ce = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Se(n) : "";
	}
	function Te(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Se(e.type);
			case 16: return Se("Lazy");
			case 13: return e.child !== t && t !== null ? Se("Suspense Fallback") : Se("Suspense");
			case 19: return Se("SuspenseList");
			case 0:
			case 15: return we(e.type, !1);
			case 11: return we(e.type.render, !1);
			case 1: return we(e.type, !0);
			case 31: return Se("Activity");
			case 30: return Se("ViewTransition");
			default: return "";
		}
	}
	function Ee(e) {
		try {
			var t = "", n = null;
			do
				t += Te(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var De = Object.prototype.hasOwnProperty, Oe = t.unstable_scheduleCallback, ke = t.unstable_cancelCallback, Ae = t.unstable_shouldYield, je = t.unstable_requestPaint, Me = t.unstable_now, Ne = t.unstable_getCurrentPriorityLevel, Pe = t.unstable_ImmediatePriority, Fe = t.unstable_UserBlockingPriority, Ie = t.unstable_NormalPriority, Le = t.unstable_LowPriority, Re = t.unstable_IdlePriority, ze = t.log, Be = t.unstable_setDisableYieldValue, Ve = null, He = null;
	function Ue(e) {
		if (typeof ze == "function" && Be(e), He && typeof He.setStrictMode == "function") try {
			He.setStrictMode(Ve, e);
		} catch {}
	}
	var We = Math.clz32 ? Math.clz32 : qe, Ge = Math.log, Ke = Math.LN2;
	function qe(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ge(e) / Ke | 0) | 0;
	}
	var Je = 256, Ye = 262144, Xe = 4194304;
	function Ze(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & -e;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Qe(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ze(n))) : i = Ze(o) : i = Ze(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ze(n))) : i = Ze(o)) : i = Ze(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function $e(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function et(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - We(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function tt(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function nt() {
		var e = Xe;
		return Xe <<= 1, !(Xe & 62914560) && (Xe = 4194304), e;
	}
	function rt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function it(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function at(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - We(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && ot(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function ot(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - We(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function st(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - We(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function ct(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : lt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function lt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function ut(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function dt() {
		var e = W.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ch(e.type)) : e;
	}
	function ft(e, t) {
		var n = W.p;
		try {
			return W.p = e, t();
		} finally {
			W.p = n;
		}
	}
	var pt = Math.random().toString(36).slice(2), mt = "__reactFiber$" + pt, ht = "__reactProps$" + pt, gt = "__reactContainer$" + pt, _t = "__reactEvents$" + pt, vt = "__reactListeners$" + pt, yt = "__reactHandles$" + pt, bt = "__reactResources$" + pt, xt = "__reactMarker$" + pt, St = "__reactLoad$" + pt;
	function Ct(e) {
		delete e[mt], delete e[ht], delete e[vt], delete e[yt];
	}
	function wt(e) {
		var t;
		if (t = e[mt]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[gt] || n[mt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = fm(e); e !== null;) {
					if (n = e[mt]) return n;
					e = fm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Tt(e) {
		if (e = e[mt] || e[gt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Et(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Dt(e) {
		var t = e[bt];
		return t ||= e[bt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Ot(e) {
		e[xt] = !0;
	}
	function kt(e) {
		e[St] = void 0;
	}
	var At = /* @__PURE__ */ new Set(), jt = {};
	function Mt(e, t) {
		Nt(e, t), Nt(e + "Capture", t);
	}
	function Nt(e, t) {
		for (jt[e] = t, e = 0; e < t.length; e++) At.add(t[e]);
	}
	var Pt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ft = {}, It = {};
	function Lt(e) {
		return De.call(It, e) ? !0 : De.call(Ft, e) ? !1 : Pt.test(e) ? It[e] = !0 : (Ft[e] = !0, !1);
	}
	var Rt = !1;
	function zt() {
		var e = Rt;
		return Rt = !1, e;
	}
	function Bt(e, t, n) {
		if (Lt(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, n);
			}
		}
	}
	function Vt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, n);
		}
	}
	function Ht(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, r);
		}
	}
	function Ut(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Wt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Gt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Kt(e) {
		if (!e._valueTracker) {
			var t = Wt(e) ? "checked" : "value";
			e._valueTracker = Gt(e, t, "" + e[t]);
		}
	}
	function qt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Wt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var Jt = /[\n"\\]/g;
	function Yt(e) {
		return e.replace(Jt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Xt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ut(t)) : e.value !== "" + Ut(t) && (e.value = "" + Ut(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Qt(e, Ut(n)) : o === "number" && e.value == t ? Qt(e, Ut(e.value)) : Qt(e, Ut(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Ut(s) : e.removeAttribute("name");
	}
	function Zt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Kt(e);
				return;
			}
			n = n == null ? "" : "" + Ut(n), t = t == null ? n : "" + Ut(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Kt(e);
	}
	function Qt(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function $t(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Ut(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function en(e, t, n) {
		t != null && (t = "" + Ut(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + Ut(n);
	}
	function tn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (se(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Ut(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Kt(e);
	}
	function nn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var rn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function an(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || rn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function on(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", Rt = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (an(e, a, r), Rt = !0);
		} else for (var o in t) t.hasOwnProperty(o) && an(e, o, t[o]);
	}
	function sn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var cn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["maskType", "mask-type"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), ln = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function un(e) {
		return ln.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function dn() {}
	var fn = null;
	function pn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var mn = null, hn = null;
	function q(e) {
		var t = Tt(e);
		if (t && (e = t.stateNode)) {
			var n = e[ht] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Xt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Yt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[ht] || null;
								if (!a) throw Error(i(90));
								Xt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && qt(r);
					}
					break a;
				case "textarea":
					en(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && $t(e, !!n.multiple, t, !1);
			}
		}
	}
	var gn = !1;
	function _n(e, t, n) {
		if (gn) return e(t, n);
		gn = !0;
		try {
			return e(t);
		} finally {
			if (gn = !1, (mn !== null || hn !== null) && (zd(), mn && (t = mn, e = hn, hn = mn = null, q(t), e))) for (t = 0; t < e.length; t++) q(e[t]);
		}
	}
	function J(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[ht] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var vn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, yn = !1;
	if (vn) try {
		var bn = {};
		Object.defineProperty(bn, "passive", { get: function() {
			yn = !0;
		} }), window.addEventListener("test", bn, bn), window.removeEventListener("test", bn, bn);
	} catch {
		yn = !1;
	}
	var xn = null, Sn = null, Cn = null;
	function wn() {
		if (Cn) return Cn;
		var e, t = Sn, n = t.length, r, i = "value" in xn ? xn.value : xn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Cn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Tn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function En() {
		return !0;
	}
	function Dn() {
		return !1;
	}
	function On(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? En : Dn, this.isPropagationStopped = Dn, this;
		}
		return D(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = En);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = En);
			},
			persist: function() {},
			isPersistent: En
		}), t;
	}
	var kn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, An = On(kn), jn = D({}, kn, {
		view: 0,
		detail: 0
	}), Mn = On(jn), Nn, Pn, Fn, In = D({}, jn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: qn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Fn && (Fn && e.type === "mousemove" ? (Nn = e.screenX - Fn.screenX, Pn = e.screenY - Fn.screenY) : Pn = Nn = 0, Fn = e), Nn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Pn;
		}
	}), Ln = On(In), Rn = On(D({}, In, { dataTransfer: 0 })), zn = On(D({}, jn, { relatedTarget: 0 })), Bn = On(D({}, kn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Vn = On(D({}, kn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Hn = On(D({}, kn, { data: 0 })), Un = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Wn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Gn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Kn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Gn[e]) ? !!t[e] : !1;
	}
	function qn() {
		return Kn;
	}
	var Jn = On(D({}, jn, {
		key: function(e) {
			if (e.key) {
				var t = Un[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Tn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Wn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: qn,
		charCode: function(e) {
			return e.type === "keypress" ? Tn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Tn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Yn = On(D({}, In, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Xn = On(D({}, kn, { submitter: 0 })), Zn = On(D({}, jn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: qn
	})), Qn = On(D({}, kn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), $n = On(D({}, In, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), er = On(D({}, kn, {
		newState: 0,
		oldState: 0,
		source: 0
	})), tr = [
		9,
		13,
		27,
		32
	], nr = vn && "CompositionEvent" in window, rr = null;
	vn && "documentMode" in document && (rr = document.documentMode);
	var ir = vn && "TextEvent" in window && !rr, ar = vn && (!nr || rr && 8 < rr && 11 >= rr), or = " ", sr = !1;
	function cr(e, t) {
		switch (e) {
			case "keyup": return tr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function lr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var ur = !1;
	function dr(e, t) {
		switch (e) {
			case "compositionend": return lr(t);
			case "keypress": return t.which === 32 ? (sr = !0, or) : null;
			case "textInput": return e = t.data, e === or && sr ? null : e;
			default: return null;
		}
	}
	function fr(e, t) {
		if (ur) return e === "compositionend" || !nr && cr(e, t) ? (e = wn(), Cn = Sn = xn = null, ur = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return ar && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var pr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function mr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!pr[e.type] : t === "textarea";
	}
	function hr(e, t, n, r) {
		mn ? hn ? hn.push(r) : hn = [r] : mn = r, t = qf(t, "onChange"), 0 < t.length && (n = new An("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var gr = null, Y = null;
	function _r(e) {
		zf(e, 0);
	}
	function vr(e) {
		if (qt(Et(e))) return e;
	}
	function yr(e, t) {
		if (e === "change") return t;
	}
	var br = !1;
	if (vn) {
		var xr;
		if (vn) {
			var Sr = "oninput" in document;
			if (!Sr) {
				var Cr = document.createElement("div");
				Cr.setAttribute("oninput", "return;"), Sr = typeof Cr.oninput == "function";
			}
			xr = Sr;
		} else xr = !1;
		br = xr && (!document.documentMode || 9 < document.documentMode);
	}
	function wr() {
		gr && (gr.detachEvent("onpropertychange", Tr), Y = gr = null);
	}
	function Tr(e) {
		if (e.propertyName === "value" && vr(Y)) {
			var t = [];
			hr(t, Y, e, pn(e)), _n(_r, t);
		}
	}
	function Er(e, t, n) {
		e === "focusin" ? (wr(), gr = t, Y = n, gr.attachEvent("onpropertychange", Tr)) : e === "focusout" && wr();
	}
	function Dr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return vr(Y);
	}
	function Or(e, t) {
		if (e === "click") return vr(t);
	}
	function kr(e, t) {
		if (e === "input" || e === "change") return vr(t);
	}
	function Ar(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var jr = typeof Object.is == "function" ? Object.is : Ar;
	function X(e, t) {
		if (jr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!De.call(t, i) || !jr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Mr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Nr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Pr(e, t) {
		var n = Nr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Nr(n);
		}
	}
	function Fr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Fr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Ir(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Mr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Mr(e.document);
		}
		return t;
	}
	function Lr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Rr = vn && "documentMode" in document && 11 >= document.documentMode, zr = null, Br = null, Vr = null, Hr = !1;
	function Ur(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Hr || zr == null || zr !== Mr(r) || (r = zr, "selectionStart" in r && Lr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Vr && X(Vr, r) || (Vr = r, r = qf(Br, "onSelect"), 0 < r.length && (t = new An("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = zr)));
	}
	function Wr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Gr = {
		animationend: Wr("Animation", "AnimationEnd"),
		animationiteration: Wr("Animation", "AnimationIteration"),
		animationstart: Wr("Animation", "AnimationStart"),
		transitionrun: Wr("Transition", "TransitionRun"),
		transitionstart: Wr("Transition", "TransitionStart"),
		transitioncancel: Wr("Transition", "TransitionCancel"),
		transitionend: Wr("Transition", "TransitionEnd")
	}, Kr = {}, qr = {};
	vn && (qr = document.createElement("div").style, "AnimationEvent" in window || (delete Gr.animationend.animation, delete Gr.animationiteration.animation, delete Gr.animationstart.animation), "TransitionEvent" in window || delete Gr.transitionend.transition);
	function Jr(e) {
		if (Kr[e]) return Kr[e];
		if (!Gr[e]) return e;
		var t = Gr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in qr) return Kr[e] = t[n];
		return e;
	}
	var Yr = Jr("animationend"), Xr = Jr("animationiteration"), Zr = Jr("animationstart"), Qr = Jr("transitionrun"), $r = Jr("transitionstart"), ei = Jr("transitioncancel"), ti = Jr("transitionend"), ni = /* @__PURE__ */ new Map(), ri = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	ri.push("scrollEnd");
	function ii(e, t) {
		ni.set(e, t), Mt(t, [e]);
	}
	var ai = 0;
	function oi(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = bd.identifierPrefix;
		var n = ai++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function si(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Od;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function ci(e, t) {
		return e = si(e), t = si(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var li = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, ui = [], di = 0, fi = 0;
	function pi() {
		for (var e = di, t = fi = di = 0; t < e;) {
			var n = ui[t];
			ui[t++] = null;
			var r = ui[t];
			ui[t++] = null;
			var i = ui[t];
			ui[t++] = null;
			var a = ui[t];
			if (ui[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && _i(n, i, a);
		}
	}
	function mi(e, t, n, r) {
		ui[di++] = e, ui[di++] = t, ui[di++] = n, ui[di++] = r, fi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function hi(e, t, n, r) {
		return mi(e, t, n, r), vi(e);
	}
	function gi(e, t) {
		return mi(e, null, null, t), vi(e);
	}
	function _i(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - We(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function vi(e) {
		if (50 < kd) throw kd = 0, Ad = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var yi = {};
	function bi(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function xi(e, t, n, r) {
		return new bi(e, t, n, r);
	}
	function Si(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Ci(e, t) {
		var n = e.alternate;
		return n === null ? (n = xi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function wi(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Ti(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Si(r) && (s = 1);
		else if (typeof r == "string") s = qm(e, n, pe.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case V: return e = xi(31, n, t, a), e.elementType = V, e.lanes = o, e;
			case j: return Ei(n.children, a, o, t);
			case M:
				s = 8, a |= 24;
				break;
			case N: return e = xi(12, n, t, a | 2), e.elementType = N, e.lanes = o, e;
			case L: return e = xi(13, n, t, a), e.elementType = L, e.lanes = o, e;
			case R: return e = xi(19, n, t, a), e.elementType = R, e.lanes = o, e;
			case ee:
			case te: return e = a | 32, e = xi(30, n, t, e), e.elementType = te, e.lanes = o, e.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, e;
			default:
				if (typeof r == "object" && r) switch (r.$$typeof) {
					case F:
						s = 10;
						break a;
					case P:
						s = 9;
						break a;
					case I:
						s = 11;
						break a;
					case z:
						s = 14;
						break a;
					case B:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = xi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function Ei(e, t, n, r) {
		return e = xi(7, e, r, t), e.lanes = n, e;
	}
	function Di(e, t, n) {
		return e = xi(6, e, null, t), e.lanes = n, e;
	}
	function Oi(e) {
		var t = xi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function ki(e, t, n) {
		return t = xi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Ai = /* @__PURE__ */ new WeakMap();
	function ji(e, t) {
		if (typeof e == "object" && e) {
			var n = Ai.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Ee(t)
			}, Ai.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Ee(t)
		};
	}
	var Mi = [], Ni = 0, Pi = null, Fi = 0, Ii = [], Li = 0, Ri = null, zi = 1, Bi = "";
	function Vi(e, t) {
		Mi[Ni++] = Fi, Mi[Ni++] = Pi, Pi = e, Fi = t;
	}
	function Hi(e, t, n) {
		Ii[Li++] = zi, Ii[Li++] = Bi, Ii[Li++] = Ri, Ri = e;
		var r = zi;
		e = Bi;
		var i = 32 - We(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - We(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, zi = 1 << 32 - We(t) + i | n << i | r, Bi = a + e;
		} else zi = 1 << a | n << i | r, Bi = e;
	}
	function Ui(e) {
		e.return !== null && (Vi(e, 1), Hi(e, 1, 0));
	}
	function Wi(e) {
		for (; e === Pi;) Pi = Mi[--Ni], Mi[Ni] = null, Fi = Mi[--Ni], Mi[Ni] = null;
		for (; e === Ri;) Ri = Ii[--Li], Ii[Li] = null, Bi = Ii[--Li], Ii[Li] = null, zi = Ii[--Li], Ii[Li] = null;
	}
	function Gi(e, t) {
		Ii[Li++] = zi, Ii[Li++] = Bi, Ii[Li++] = Ri, zi = t.id, Bi = t.overflow, Ri = e;
	}
	var Ki = null, qi = null, Ji = !1, Yi = null, Xi = !1, Zi = Error(i(519));
	function Qi(e) {
		throw ia(ji(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Zi;
	}
	function $i(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[mt] = e, t[ht] = r, n) {
			case "dialog":
				Bf("cancel", t), Bf("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Bf("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Lf.length; n++) Bf(Lf[n], t);
				break;
			case "source":
				Bf("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Bf("error", t), Bf("load", t);
				break;
			case "details":
				Bf("toggle", t);
				break;
			case "input":
				Bf("invalid", t), Zt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Bf("invalid", t);
				break;
			case "textarea": Bf("invalid", t), tn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || $f(t.textContent, n) ? (r.popover != null && (Bf("beforetoggle", t), Bf("toggle", t)), r.onScroll != null && Bf("scroll", t), r.onScrollEnd != null && Bf("scrollend", t), r.onClick != null && (t.onclick = dn), t = !0) : t = !1, t || Qi(e, !0);
	}
	function ea(e) {
		for (Ki = e.return; Ki;) switch (Ki.tag) {
			case 5:
			case 31:
			case 13:
				Xi = !1;
				return;
			case 27:
			case 3:
				Xi = !0;
				return;
			default: Ki = Ki.return;
		}
	}
	function ta(e) {
		if (e !== Ki) return !1;
		if (!Ji) return ea(e), Ji = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || pp(e.type, e.memoizedProps)), n = !n), n && qi && Qi(e), ea(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			qi = dm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			qi = dm(e);
		} else t === 27 ? (t = qi, Sp(e.type) ? (e = um, um = null, qi = e) : qi = t) : qi = Ki ? lm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function na() {
		qi = Ki = null, Ji = !1;
	}
	function ra() {
		var e = Yi;
		return e !== null && (fd === null ? fd = e : fd.push.apply(fd, e), Yi = null), e;
	}
	function ia(e) {
		Yi === null ? Yi = [e] : Yi.push(e);
	}
	var aa = de(null), oa = null, sa = null;
	function ca(e, t, n) {
		G(aa, t._currentValue), t._currentValue = n;
	}
	function la(e) {
		e._currentValue = aa.current, fe(aa);
	}
	function ua(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function da(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), ua(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), ua(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), ua(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function fa(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					jr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === he.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [sh] : e.push(sh));
			}
			a = a.return;
		}
		return e !== null && da(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function pa(e) {
		for (e = e.firstContext; e !== null;) {
			if (!jr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function ma(e) {
		oa = e, sa = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function ha(e) {
		return _a(oa, e);
	}
	function ga(e, t) {
		return oa === null && ma(e), _a(e, t);
	}
	function _a(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, sa === null) {
			if (e === null) throw Error(i(308));
			sa = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else sa = sa.next = t;
		return n;
	}
	var va = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ya = t.unstable_scheduleCallback, ba = t.unstable_NormalPriority, xa = {
		$$typeof: F,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Sa() {
		return {
			controller: new va(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Ca(e) {
		e.refCount--, e.refCount === 0 && ya(ba, function() {
			e.controller.abort();
		});
	}
	function wa(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var Ta = null;
	function Ea(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var Da = null, Oa = 0, ka = 0, Aa = null;
	function ja(e, t) {
		if (Da === null) {
			var n = Da = [];
			Oa = 0, ka = Mf(), Aa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return Oa++, t.then(Ma, Ma), t;
	}
	function Ma() {
		if (--Oa === 0 && (Ta = null, Da !== null)) {
			Aa !== null && (Aa.status = "fulfilled");
			var e = Da;
			Da = null, ka = 0, Aa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Na(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Pa = U.S;
	U.S = function(e, t) {
		if (hd = Me(), typeof t == "object" && t && typeof t.then == "function" && ja(e, t), Ta !== null) for (var n = vf; n !== null;) wa(n, Ta), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = vf; r !== null;) wa(r, n), r = r.next;
			if (ka !== 0) {
				r = Ta, r === null && (r = Ta = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Pa !== null && Pa(e, t);
	};
	var Fa = de(null);
	function Ia() {
		var e = Fa.current;
		return e === null ? Xu.pooledCache : e;
	}
	function La(e, t) {
		t === null ? G(Fa, Fa.current) : G(Fa, t.pool);
	}
	function Ra() {
		var e = Ia();
		return e === null ? null : {
			parent: xa._currentValue,
			pool: e
		};
	}
	var za = Error(i(460)), Ba = Error(i(474)), Va = Error(i(542)), Ha = { then: function() {} };
	function Ua(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Wa(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(dn, dn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ja(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(dn, dn);
				else {
					if (e = Xu, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Ja(e), e;
				}
				throw Ka = t, za;
		}
	}
	function Ga(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Ka = e, za) : e;
		}
	}
	var Ka = null;
	function qa() {
		if (Ka === null) throw Error(i(459));
		var e = Ka;
		return Ka = null, e;
	}
	function Ja(e) {
		if (e === za || e === Va) throw Error(i(483));
	}
	var Ya = null, Xa = 0;
	function Za(e) {
		var t = Xa;
		return Xa += 1, Ya === null && (Ya = []), Wa(Ya, e, t);
	}
	function Qa(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function $a(e, t) {
		throw t.$$typeof === O ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function eo(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Ci(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Di(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === j ? (e = d(e, t, n.props.children, r, n.key), Qa(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === B && Ga(i) === t.type) ? (t = a(t, n.props), Qa(t, n), t.return = e, t) : (t = Ti(n.type, n.key, n.props, null, e.mode, r), Qa(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ki(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = Ei(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Di("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case k: return n = Ti(t.type, t.key, t.props, null, e.mode, n), Qa(n, t), n.return = e, n;
					case A: return t = ki(t, e.mode, n), t.return = e, t;
					case B: return t = Ga(t), f(e, t, n);
				}
				if (se(t) || ie(t)) return t = Ei(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Za(t), n);
				if (t.$$typeof === F) return f(e, ga(e, t), n);
				$a(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case k: return n.key === i ? l(e, t, n, r) : null;
					case A: return n.key === i ? u(e, t, n, r) : null;
					case B: return n = Ga(n), p(e, t, n, r);
				}
				if (se(n) || ie(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Za(n), r);
				if (n.$$typeof === F) return p(e, t, ga(e, n), r);
				$a(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case k: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case A: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case B: return r = Ga(r), m(e, t, n, r, i);
				}
				if (se(r) || ie(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Za(r), i);
				if (r.$$typeof === F) return m(e, t, n, ga(t, r), i);
				$a(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), Ji && Vi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return Ji && Vi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), Ji && Vi(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), Ji && Vi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return Ji && Vi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), Ji && Vi(a, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === j && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case k:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === j) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), Qa(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === B && Ga(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Qa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === j ? (c = Ei(o.props.children, e.mode, c, o.key), Qa(c, o), c.return = e, e = c) : (c = Ti(o.type, o.key, o.props, null, e.mode, c), Qa(c, o), c.return = e, e = c);
						}
						return s(e);
					case A:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = ki(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case B: return o = Ga(o), _(e, r, o, c);
				}
				if (se(o)) return h(e, r, o, c);
				if (ie(o)) {
					if (l = ie(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, Za(o), c);
				if (o.$$typeof === F) return _(e, r, ga(e, o), c);
				$a(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Di(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Xa = 0;
				var i = _(e, t, n, r);
				return Ya = null, i;
			} catch (t) {
				if (t === za || t === Va) throw t;
				var a = xi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var to = eo(!0), no = eo(!1), ro = !1;
	function io(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function ao(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function oo(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function so(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Yu & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = vi(e), _i(e, null, n), t;
		}
		return mi(e, r, t, n), vi(e);
	}
	function co(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, st(e, n);
		}
	}
	function lo(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var uo = !1;
	function fo() {
		if (uo) {
			var e = Aa;
			if (e !== null) throw e;
		}
	}
	function po(e, t, n, r) {
		uo = !1;
		var i = e.updateQueue;
		ro = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Qu & f) === f : (r & f) === f) {
					f !== 0 && f === ka && (uo = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var g = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(g, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(g, d, f) : m, f == null) break a;
								d = D({}, d, f);
								break a;
							case 2: ro = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), od |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function mo(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function ho(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) mo(n[e], t);
	}
	var go = de(null), _o = de(0);
	function vo(e, t) {
		e = id, G(_o, e), G(go, t), id = e | t.baseLanes;
	}
	function yo() {
		G(_o, id), G(go, go.current);
	}
	function bo() {
		id = _o.current, fe(go), fe(_o);
	}
	var xo = de(null), So = null;
	function Co(e) {
		var t = e.alternate;
		G(Oo, Oo.current & 1), G(xo, e), So === null && (t === null || go.current !== null || t.memoizedState !== null) && (So = e);
	}
	function wo(e) {
		G(Oo, Oo.current), G(xo, e), So === null && (So = e);
	}
	function To(e) {
		e.tag === 22 ? (G(Oo, Oo.current), G(xo, e), So === null && (So = e)) : Eo();
	}
	function Eo() {
		G(Oo, Oo.current), G(xo, xo.current);
	}
	function Do(e) {
		fe(xo), So === e && (So = null), fe(Oo);
	}
	var Oo = de(0);
	function ko(e, t) {
		G(xo, xo.current), G(Oo, t);
	}
	function Ao(e) {
		fe(Oo), fe(xo), So === e && (So = null);
	}
	function jo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || om(n) || sm(n))) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var Mo = 0, No = null, Po = null, Fo = null, Io = !1, Lo = !1, Ro = !1, zo = 0, Bo = 0, Vo = null, Ho = 0;
	function Uo() {
		throw Error(i(321));
	}
	function Wo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!jr(e[n], t[n])) return !1;
		return !0;
	}
	function Go(e, t, n, r, i, a) {
		return Mo = a, No = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = e === null || e.memoizedState === null ? cc : lc, Ro = !1, a = n(r, i), Ro = !1, Lo && (a = qo(t, n, r, i)), Ko(e), a;
	}
	function Ko(e) {
		U.H = sc;
		var t = Po !== null && Po.next !== null;
		if (Mo = 0, Fo = Po = No = null, Io = !1, Bo = 0, Vo = null, t) throw Error(i(300));
		e === null || Ec || (e = e.dependencies, e !== null && pa(e) && (Ec = !0));
	}
	function qo(e, t, n, r) {
		No = e;
		var a = 0;
		do {
			if (Lo && (Vo = null), Bo = 0, Lo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, Fo = Po = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			U.H = uc, o = t(n, r);
		} while (Lo);
		return o;
	}
	function Jo() {
		var e = U.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? ts(t) : t, e = e.useState()[0], (Po === null ? null : Po.memoizedState) !== e && (No.flags |= 1024), t;
	}
	function Yo() {
		var e = zo !== 0;
		return zo = 0, e;
	}
	function Xo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Zo(e) {
		if (Io) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Io = !1;
		}
		Mo = 0, Fo = Po = No = null, Lo = !1, Bo = zo = 0, Vo = null;
	}
	function Qo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Fo === null ? No.memoizedState = Fo = e : Fo = Fo.next = e, Fo;
	}
	function $o() {
		if (Po === null) {
			var e = No.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = Po.next;
		var t = Fo === null ? No.memoizedState : Fo.next;
		if (t !== null) Fo = t, Po = e;
		else {
			if (e === null) throw No.alternate === null ? Error(i(467)) : Error(i(310));
			Po = e, e = {
				memoizedState: Po.memoizedState,
				baseState: Po.baseState,
				baseQueue: Po.baseQueue,
				queue: Po.queue,
				next: null
			}, Fo === null ? No.memoizedState = Fo = e : Fo = Fo.next = e;
		}
		return Fo;
	}
	function es() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function ts(e) {
		var t = Bo;
		return Bo += 1, Vo === null && (Vo = []), e = Wa(Vo, e, t), t = No, (Fo === null ? t.memoizedState : Fo.next) === null && (t = t.alternate, U.H = t === null || t.memoizedState === null ? cc : lc), e;
	}
	function ns(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ts(e);
			if (e.$$typeof === ne) return;
			if (e.$$typeof === F) return ha(e);
		}
		throw Error(i(438, String(e)));
	}
	function rs(e) {
		var t = null, n = No.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = No.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = es(), No.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = H;
		return t.index++, n;
	}
	function is(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function as(e) {
		return os($o(), Po, e);
	}
	function os(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (Mo & f) === f : (Qu & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ka && (d = !0);
					else if ((Mo & p) === p) {
						u = u.next, p === ka && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, No.lanes |= p, od |= p;
					f = u.action, Ro && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, No.lanes |= f, od |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !jr(o, e.memoizedState) && (Ec = !0, d && (n = Aa, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function ss(e) {
		var t = $o(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			jr(o, t.memoizedState) || (Ec = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function cs(e, t, n) {
		var r = No, a = $o(), o = Ji;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !jr((Po || a).memoizedState, n);
		if (s && (a.memoizedState = n, Ec = !0), a = a.queue, Ns(ds.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Fo !== null && !!(Fo.memoizedState.tag & 1), Os(e ? 9 : 8, { destroy: void 0 }, us.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, Xu === null) throw Error(i(349));
			o || Mo & 127 || ls(r, t, n);
		}
		return n;
	}
	function ls(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = No.updateQueue, t === null ? (t = es(), No.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function us(e, t, n, r) {
		t.value = n, t.getSnapshot = r, fs(t) && ps(e);
	}
	function ds(e, t, n) {
		return n(function() {
			fs(t) && ps(e);
		});
	}
	function fs(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !jr(e, n);
		} catch {
			return !0;
		}
	}
	function ps(e) {
		var t = gi(e, 2);
		t !== null && Pd(t, e, 2);
	}
	function ms(e) {
		var t = Qo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Ro) {
				Ue(!0);
				try {
					n();
				} finally {
					Ue(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: is,
			lastRenderedState: e
		}, t;
	}
	function hs(e, t, n, r) {
		return e.baseState = n, os(e, Po, typeof r == "function" ? r : is);
	}
	function gs(e, t, n, r, a) {
		if (ic(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			U.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, _s(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function _s(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = U.T, o = {};
			o.types = a === null ? null : a.types, U.T = o;
			try {
				var s = n(i, r), c = U.S;
				c !== null && c(o, s), vs(e, t, s);
			} catch (n) {
				bs(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), U.T = a;
			}
		} else try {
			a = n(i, r), vs(e, t, a);
		} catch (n) {
			bs(e, t, n);
		}
	}
	function vs(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			ys(e, t, n);
		}, function(n) {
			return bs(e, t, n);
		}) : ys(e, t, n);
	}
	function ys(e, t, n) {
		t.status = "fulfilled", t.value = n, xs(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, _s(e, n)));
	}
	function bs(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, xs(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function xs(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Ss(e, t) {
		return t;
	}
	function Cs(e, t) {
		if (Ji) {
			var n = Xu.formState;
			if (n !== null) {
				a: {
					var r = No;
					if (Ji) {
						if (qi) {
							b: {
								for (var i = qi, a = Xi; i.nodeType !== 8;) if (!a || (i = lm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								qi = lm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Qi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Qo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ss,
			lastRenderedState: t
		}, n.queue = r, n = tc.bind(null, No, r), r.dispatch = n, r = ms(!1), a = rc.bind(null, No, !1, r.queue), r = Qo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = gs.bind(null, No, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function ws(e) {
		return Ts($o(), Po, e);
	}
	function Ts(e, t, n) {
		if (t = os(e, t, Ss)[0], e = as(is)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ts(t);
		} catch (e) {
			throw e === za ? Va : e;
		}
		else r = t;
		t = $o();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (No.flags |= 2048, Os(9, { destroy: void 0 }, Es.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Es(e, t) {
		e.action = t;
	}
	function Ds(e) {
		var t = $o(), n = Po;
		if (n !== null) return Ts(t, n, e);
		$o(), t = t.memoizedState, n = $o();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Os(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = No.updateQueue, t === null && (t = es(), No.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ks() {
		return $o().memoizedState;
	}
	function As(e, t, n, r) {
		var i = Qo();
		No.flags |= e, i.memoizedState = Os(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function js(e, t, n, r) {
		var i = $o();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		Po !== null && r !== null && Wo(r, Po.memoizedState.deps) ? i.memoizedState = Os(t, a, n, r) : (No.flags |= e, i.memoizedState = Os(1 | t, a, n, r));
	}
	function Ms(e, t) {
		As(8390656, 8, e, t);
	}
	function Ns(e, t) {
		js(2048, 8, e, t);
	}
	function Ps(e) {
		No.flags |= 4;
		var t = No.updateQueue;
		if (t === null) t = es(), No.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Fs(e) {
		var t = $o().memoizedState;
		return Ps({
			ref: t,
			nextImpl: e
		}), function() {
			if (Yu & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Is(e, t) {
		return js(4, 2, e, t);
	}
	function Ls(e, t) {
		return js(4, 4, e, t);
	}
	function Rs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function zs(e, t, n) {
		n = n == null ? null : n.concat([e]), js(4, 4, Rs.bind(null, t, e), n);
	}
	function Bs() {}
	function Vs(e, t) {
		var n = $o();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Wo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Hs(e, t) {
		var n = $o();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Wo(t, r[1])) return r[0];
		if (r = e(), Ro) {
			Ue(!0);
			try {
				e();
			} finally {
				Ue(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Us(e, t, n) {
		return n === void 0 || Mo & 1073741824 && !(Qu & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Md(), No.lanes |= e, od |= e, n);
	}
	function Ws(e, t, n, r) {
		return jr(n, t) ? n : go.current === null ? !(Mo & 106) || Mo & 1073741824 && !(Qu & 261930) ? (Ec = !0, e.memoizedState = n) : (e = Md(), No.lanes |= e, od |= e, t) : (e = Us(e, n, r), jr(e, t) || (Ec = !0), e);
	}
	function Gs(e, t, n, r, i) {
		var a = W.p;
		W.p = a !== 0 && 8 > a ? a : 8;
		var o = U.T, s = {};
		s.types = o === null ? null : o.types, U.T = s, rc(e, !1, t, n);
		try {
			var c = i(), l = U.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? nc(e, t, Na(c, r), jd(e)) : nc(e, t, r, jd(e));
		} catch (n) {
			nc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, jd());
		} finally {
			W.p = a, o !== null && s.types !== null && (o.types = s.types), U.T = o;
		}
	}
	function Ks() {}
	function qs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Js(e).queue;
		Gs(e, a, t, ce, n === null ? Ks : function() {
			return Ys(e), n(r);
		});
	}
	function Js(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ce,
			baseState: ce,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: is,
				lastRenderedState: ce
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: is,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Ys(e) {
		var t = Js(e);
		t.next === null && (t = e.alternate.memoizedState), nc(e, t.next.queue, {}, jd());
	}
	function Xs() {
		return ha(sh);
	}
	function Zs() {
		return $o().memoizedState;
	}
	function Qs() {
		return $o().memoizedState;
	}
	function $s(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = jd();
					e = oo(n);
					var r = so(t, e, n);
					r !== null && (Pd(r, t, n), co(r, t, n)), t = { cache: Sa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function ec(e, t, n) {
		var r = jd();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ic(e) ? ac(t, n) : (n = hi(e, t, n, r), n !== null && (Pd(n, e, r), oc(n, t, r)));
	}
	function tc(e, t, n) {
		nc(e, t, n, jd());
	}
	function nc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (ic(e)) ac(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, jr(s, o)) return mi(e, t, i, 0), Xu === null && pi(), !1;
			} catch {}
			if (n = hi(e, t, i, r), n !== null) return Pd(n, e, r), oc(n, t, r), !0;
		}
		return !1;
	}
	function rc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Mf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ic(e)) {
			if (t) throw Error(i(479));
		} else t = hi(e, n, r, 2), t !== null && Pd(t, e, 2);
	}
	function ic(e) {
		var t = e.alternate;
		return e === No || t !== null && t === No;
	}
	function ac(e, t) {
		Lo = Io = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function oc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, st(e, n);
		}
	}
	var sc = {
		readContext: ha,
		use: ns,
		useCallback: Uo,
		useContext: Uo,
		useEffect: Uo,
		useImperativeHandle: Uo,
		useLayoutEffect: Uo,
		useInsertionEffect: Uo,
		useMemo: Uo,
		useReducer: Uo,
		useRef: Uo,
		useState: Uo,
		useDebugValue: Uo,
		useDeferredValue: Uo,
		useTransition: Uo,
		useSyncExternalStore: Uo,
		useId: Uo,
		useHostTransitionStatus: Uo,
		useFormState: Uo,
		useActionState: Uo,
		useOptimistic: Uo,
		useMemoCache: Uo,
		useCacheRefresh: Uo,
		useEffectEvent: Uo
	}, cc = {
		readContext: ha,
		use: ns,
		useCallback: function(e, t) {
			return Qo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ha,
		useEffect: Ms,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), As(4194308, 4, Rs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return As(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			As(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Qo();
			t = t === void 0 ? null : t;
			var r = e();
			if (Ro) {
				Ue(!0);
				try {
					e();
				} finally {
					Ue(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Qo();
			if (n !== void 0) {
				var i = n(t);
				if (Ro) {
					Ue(!0);
					try {
						n(t);
					} finally {
						Ue(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = ec.bind(null, No, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Qo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = ms(e);
			var t = e.queue, n = tc.bind(null, No, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Bs,
		useDeferredValue: function(e, t) {
			return Us(Qo(), e, t);
		},
		useTransition: function() {
			var e = ms(!1);
			return e = Gs.bind(null, No, e.queue, !0, !1), Qo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = No, a = Qo();
			if (Ji) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Xu === null) throw Error(i(349));
				Qu & 127 || ls(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Ms(ds.bind(null, r, o, e), [e]), r.flags |= 2048, Os(9, { destroy: void 0 }, us.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Qo(), t = Xu.identifierPrefix;
			if (Ji) {
				var n = Bi, r = zi;
				n = (r & ~(1 << 32 - We(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = zo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Ho++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Xs,
		useFormState: Cs,
		useActionState: Cs,
		useOptimistic: function(e) {
			var t = Qo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = rc.bind(null, No, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: rs,
		useCacheRefresh: function() {
			return Qo().memoizedState = $s.bind(null, No);
		},
		useEffectEvent: function(e) {
			var t = Qo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Yu & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, lc = {
		readContext: ha,
		use: ns,
		useCallback: Vs,
		useContext: ha,
		useEffect: Ns,
		useImperativeHandle: zs,
		useInsertionEffect: Is,
		useLayoutEffect: Ls,
		useMemo: Hs,
		useReducer: as,
		useRef: ks,
		useState: function() {
			return as(is);
		},
		useDebugValue: Bs,
		useDeferredValue: function(e, t) {
			return Ws($o(), Po.memoizedState, e, t);
		},
		useTransition: function() {
			var e = as(is)[0], t = $o().memoizedState;
			return [typeof e == "boolean" ? e : ts(e), t];
		},
		useSyncExternalStore: cs,
		useId: Zs,
		useHostTransitionStatus: Xs,
		useFormState: ws,
		useActionState: ws,
		useOptimistic: function(e, t) {
			return hs($o(), Po, e, t);
		},
		useMemoCache: rs,
		useCacheRefresh: Qs,
		useEffectEvent: Fs
	}, uc = {
		readContext: ha,
		use: ns,
		useCallback: Vs,
		useContext: ha,
		useEffect: Ns,
		useImperativeHandle: zs,
		useInsertionEffect: Is,
		useLayoutEffect: Ls,
		useMemo: Hs,
		useReducer: ss,
		useRef: ks,
		useState: function() {
			return ss(is);
		},
		useDebugValue: Bs,
		useDeferredValue: function(e, t) {
			var n = $o();
			return Po === null ? Us(n, e, t) : Ws(n, Po.memoizedState, e, t);
		},
		useTransition: function() {
			var e = ss(is)[0], t = $o().memoizedState;
			return [typeof e == "boolean" ? e : ts(e), t];
		},
		useSyncExternalStore: cs,
		useId: Zs,
		useHostTransitionStatus: Xs,
		useFormState: Ds,
		useActionState: Ds,
		useOptimistic: function(e, t) {
			var n = $o();
			return Po === null ? (n.baseState = e, [e, n.queue.dispatch]) : hs(n, Po, e, t);
		},
		useMemoCache: rs,
		useCacheRefresh: Qs,
		useEffectEvent: Fs
	};
	function dc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : D({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var fc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = jd(), i = oo(r);
			i.payload = t, n != null && (i.callback = n), t = so(e, i, r), t !== null && (Pd(t, e, r), co(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = jd(), i = oo(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = so(e, i, r), t !== null && (Pd(t, e, r), co(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = jd(), r = oo(n);
			r.tag = 2, t != null && (r.callback = t), t = so(e, r, n), t !== null && (Pd(t, e, n), co(t, e, n));
		}
	};
	function pc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !X(n, r) || !X(i, a) : !0;
	}
	function mc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && fc.enqueueReplaceState(t, t.state, null);
	}
	function hc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = D({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function gc(e) {
		li(e);
	}
	function _c(e) {
		console.error(e);
	}
	function vc(e) {
		li(e);
	}
	function yc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function bc(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function xc(e, t, n) {
		return n = oo(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			yc(e, t);
		}, n;
	}
	function Sc(e) {
		return e = oo(e), e.tag = 3, e;
	}
	function Cc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				bc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			bc(t, n, r), typeof i != "function" && (vd === null ? vd = /* @__PURE__ */ new Set([this]) : vd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function wc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && fa(t, n, a, !0), n = xo.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return So === null ? Gd() : n.alternate === null && ad === 0 && (ad = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Ha ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), $(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Ha ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), $(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return $(e, r, a), Gd(), !1;
		}
		if (Ji) return t = xo.current, t === null ? (r !== Zi && (t = Error(i(423), { cause: r }), ia(ji(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = ji(r, n), a = xc(e.stateNode, r, a), lo(e, a), ad !== 4 && (ad = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Zi && (e = Error(i(422), { cause: r }), ia(ji(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = ji(o, n), dd === null ? dd = [o] : dd.push(o), ad !== 4 && (ad = 2), t === null) return !0;
		r = ji(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = xc(n.stateNode, r, e), lo(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (vd === null || !vd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Sc(a), Cc(a, e, n, r), lo(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Tc = Error(i(461)), Ec = !1;
	function Dc(e, t, n, r) {
		t.child = e === null ? no(t, null, n, r) : to(t, e.child, n, r);
	}
	function Oc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ma(t), r = Go(e, t, n, o, a, i), s = Yo(), e !== null && !Ec ? (Xo(e, t, i), nl(e, t, i)) : (Ji && s && Ui(t), t.flags |= 1, Dc(e, t, r, i), t.child);
	}
	function kc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Si(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, Ac(e, t, a, r, i)) : (e = Ti(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !rl(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? X : n, n(o, r) && e.ref === t.ref) return nl(e, t, i);
		}
		return t.flags |= 1, e = Ci(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Ac(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (X(a, r) && e.ref === t.ref) {
				if (Ec = !1, t.pendingProps = r = a, rl(e, i)) e.flags & 131072 && (Ec = !0);
				else return t.lanes = e.lanes, nl(e, t, i);
			}
		}
		return Rc(e, t, n, r, i);
	}
	function jc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return Nc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && La(t, a === null ? null : a.cachePool), a === null ? yo() : vo(t, a), To(t);
			else return r = t.lanes = 536870912, Nc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && La(t, null), yo(), Eo()) : (La(t, a.cachePool), vo(t, a), Eo(), t.memoizedState = null);
		return Dc(e, t, i, n), t.child;
	}
	function Mc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Nc(e, t, n, r, i) {
		var a = Ia();
		return a = a === null ? null : {
			parent: xa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && La(t, null), yo(), To(t), e !== null && fa(e, t, r, !0), t.childLanes = i, null;
	}
	function Pc(e, t) {
		return t = qc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Fc(e, t, n) {
		return to(t, e.child, null, n), e = Pc(t, t.pendingProps), e.flags |= 2, Do(t), t.memoizedState = null, e;
	}
	function Ic(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (Ji) {
				if (r.mode === "hidden") return e = Pc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, Mc(null, e);
				if (wo(t), (e = qi) ? (e = am(e, Xi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ri === null ? null : {
						id: zi,
						overflow: Bi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Oi(e), n.return = t, t.child = n, Ki = t, qi = null)) : e = null, e === null) throw Qi(t);
				return t.lanes = 536870912, null;
			}
			return Pc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (wo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Fc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Ec || fa(e, t, n, !1), a = (n & e.childLanes) !== 0, Ec || a) {
				if (go.current === null) {
					if (r = Xu, r !== null && (s = ct(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, gi(e, s), Pd(r, e, s), Tc;
					Gd();
				}
				t = Fc(e, t, n);
			} else e = o.treeContext, qi = lm(s.nextSibling), Ki = t, Ji = !0, Yi = null, Xi = !1, e !== null && Gi(t, e), t = Pc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Ci(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Lc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Rc(e, t, n, r, i) {
		return ma(t), n = Go(e, t, n, r, void 0, i), r = Yo(), e !== null && !Ec ? (Xo(e, t, i), nl(e, t, i)) : (Ji && r && Ui(t), t.flags |= 1, Dc(e, t, n, i), t.child);
	}
	function zc(e, t, n, r, i, a) {
		return ma(t), t.updateQueue = null, n = qo(t, r, n, i), Ko(e), r = Yo(), e !== null && !Ec ? (Xo(e, t, a), nl(e, t, a)) : (Ji && r && Ui(t), t.flags |= 1, Dc(e, t, n, a), t.child);
	}
	function Bc(e, t, n, r, i) {
		if (ma(t), t.stateNode === null) {
			var a = yi, o = n.contextType;
			typeof o == "object" && o && (a = ha(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = fc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, io(t), o = n.contextType, a.context = typeof o == "object" && o ? ha(o) : yi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (dc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && fc.enqueueReplaceState(a, a.state, null), po(t, r, a, i), fo(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = hc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = yi, typeof u == "object" && u && (o = ha(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && mc(t, a, r, o), ro = !1;
			var f = t.memoizedState;
			a.state = f, po(t, r, a, i), fo(), l = t.memoizedState, s || f !== l || ro ? (typeof d == "function" && (dc(t, n, d, r), l = t.memoizedState), (c = ro || pc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, ao(e, t), o = t.memoizedProps, u = hc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = yi, typeof l == "object" && l && (c = ha(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && mc(t, a, r, c), ro = !1, f = t.memoizedState, a.state = f, po(t, r, a, i), fo();
			var p = t.memoizedState;
			o !== d || f !== p || ro || e !== null && e.dependencies !== null && pa(e.dependencies) ? (typeof s == "function" && (dc(t, n, s, r), p = t.memoizedState), (u = ro || pc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && pa(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Lc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = to(t, e.child, null, i), t.child = to(t, null, n, i)) : Dc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = nl(e, t, i), e;
	}
	function Vc(e, t, n, r) {
		return na(), t.flags |= 256, Dc(e, t, n, r), t.child;
	}
	var Hc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Uc(e) {
		return {
			baseLanes: e,
			cachePool: Ra()
		};
	}
	function Wc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= ld), e;
	}
	function Gc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Oo.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (Ji) {
				if (i ? Co(t) : Eo(), (e = qi) ? (e = am(e, Xi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ri === null ? null : {
						id: zi,
						overflow: Bi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Oi(e), n.return = t, t.child = n, Ki = t, qi = null)) : e = null, e === null) throw Qi(t);
				return t.lanes = sm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Eo(), i = t.mode, a = qc({
				mode: "hidden",
				children: a
			}, i), r = Ei(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Uc(n), r.childLanes = Wc(e, o, n), t.memoizedState = Hc, Mc(null, r)) : (Co(t), Kc(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return Yc(e, t, a, o, r, c, s, n);
		}
		return i ? (Eo(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Ci(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = Ei(i, a, n, null), i.flags |= 2) : i = Ci(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Mc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Uc(n) : (a = i.cachePool, a === null ? a = Ra() : (s = xa._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = Wc(e, o, n), t.memoizedState = Hc, Mc(e.child, r)) : (Co(t), n = e.child, e = n.sibling, n = Ci(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Kc(e, t) {
		return t = qc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function qc(e, t) {
		return e = xi(22, e, null, t), e.lanes = 0, e;
	}
	function Jc(e, t, n) {
		return to(t, e.child, null, n), e = Kc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Yc(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (Co(t), t.flags &= -257, Jc(e, t, c)) : t.memoizedState === null ? (Eo(), o = a.fallback, s = t.mode, a = qc({
			mode: "visible",
			children: a.children
		}, s), o = Ei(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, to(t, e.child, null, c), a = t.child, a.memoizedState = Uc(c), a.childLanes = Wc(e, r, c), t.memoizedState = Hc, Mc(null, a)) : (Eo(), t.child = e.child, t.flags |= 128, null);
		if (Co(t), sm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, ia({
				value: a,
				source: null,
				stack: null
			})), Jc(e, t, c);
		}
		if (Ec || fa(e, t, c, !1), r = (c & e.childLanes) !== 0, Ec || r) {
			if (go.current !== null) return Jc(e, t, c);
			if (r = Xu, r !== null && (a = ct(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, gi(e, a), Pd(r, e, a), Tc;
			return om(o) || Gd(), Jc(e, t, c);
		}
		return om(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, qi = lm(o.nextSibling), Ki = t, Ji = !0, Yi = null, Xi = !1, e !== null && Gi(t, e), t = Kc(t, a.children), t.flags |= 134221824, t);
	}
	function Xc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), ua(e.return, t, n);
	}
	function Zc(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && jo(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function Qc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function $c(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function el(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Oo.current;
		if (t.flags & 128) return ko(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, ko(t, o), i === "backwards" && e !== null ? ($c(e), Dc(e, t, r, n), $c(e)) : Dc(e, t, r, n), r = Ji ? Fi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Xc(e, n, t);
			else if (e.tag === 19) Xc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "backwards":
				n = Zc(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, $c(t)), Qc(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && jo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Qc(t, !0, n, null, a, r);
				break;
			case "together":
				Qc(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = Zc(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Qc(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function tl(e, t, n) {
		var r = t.pendingProps;
		return ca(t, t.type, r.value), Dc(e, t, r.children, n), t.child;
	}
	function nl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), od |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (fa(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Ci(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Ci(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function rl(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && pa(e)));
	}
	function il(e, t, n) {
		switch (t.tag) {
			case 3:
				ge(t, t.stateNode.containerInfo), ca(t, xa, e.memoizedState.cache), na();
				break;
			case 27:
			case 5:
				ve(t);
				break;
			case 4:
				ge(t, t.stateNode.containerInfo);
				break;
			case 10:
				ca(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, wo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return Co(t), t.flags |= 128, null;
					r = fa(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? Gc(e, t, n) : (Co(t), e = nl(e, t, n), e === null ? null : e.sibling);
				}
				Co(t);
				break;
			case 19:
				if (t.flags & 128) return el(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (fa(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return el(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ko(t, Oo.current), r) break;
				return null;
			case 22: return t.lanes = 0, jc(e, t, n, t.pendingProps);
			case 24: ca(t, xa, e.memoizedState.cache);
		}
		return nl(e, t, n);
	}
	function al(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Ec = !0;
			else {
				if (!rl(e, n) && !(t.flags & 128)) return Ec = !1, il(e, t, n);
				Ec = !!(e.flags & 131072);
			}
		} else Ec = !1, Ji && t.flags & 1048576 && Hi(t, Fi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ga(t.elementType), t.type = e, typeof e == "function") Si(e) ? (r = hc(e, r), t.tag = 1, t = Bc(null, t, e, r, n)) : (t.tag = 0, t = Rc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === I) {
								t.tag = 11, t = Oc(null, t, e, r, n);
								break a;
							}
							if (a === z) {
								t.tag = 14, t = kc(null, t, e, r, n);
								break a;
							}
							if (a === F) {
								t.tag = 10, t.type = e, t = tl(null, t, n);
								break a;
							}
						}
						throw t = oe(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Rc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = hc(r, t.pendingProps), Bc(e, t, r, a, n);
			case 3:
				a: {
					if (ge(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, ao(e, t), po(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ca(t, xa, r), r !== o.cache && da(t, [xa], n, !0), fo(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Vc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = ji(Error(i(424)), t), ia(a), t = Vc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (qi = lm(e.firstChild), Ki = t, Ji = !0, Yi = null, Xi = !0, n = no(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (na(), r === a) {
							t = nl(e, t, n);
							break a;
						}
						Dc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Lc(e, t), e === null ? (n = Nm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Ji || (t.stateNode = fp(t.type, t.pendingProps, me.current, t)) : t.memoizedState = Nm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ve(t), e === null && Ji && (r = t.stateNode = hm(t.type, t.pendingProps, me.current), Ki = t, Xi = !0, a = qi, Sp(t.type) ? (um = a, qi = lm(r.firstChild)) : qi = a), Dc(e, t, t.pendingProps.children, n), Lc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && Ji && ((a = r = qi) && (r = rm(r, t.type, t.pendingProps, Xi), r === null ? a = !1 : (t.stateNode = r, Ki = t, qi = lm(r.firstChild), Xi = !1, a = !0)), a || Qi(t)), ve(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, pp(a, o) ? r = null : s !== null && pp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Go(e, t, Jo, null, null, n), sh._currentValue = a), Lc(e, t), Dc(e, t, r, n), t.child;
			case 6: return e === null && Ji && ((e = n = qi) && (n = im(n, t.pendingProps, Xi), n === null ? e = !1 : (t.stateNode = n, Ki = t, qi = null, e = !0)), e || Qi(t)), null;
			case 13: return Gc(e, t, n);
			case 4: return ge(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = to(t, null, r, n) : Dc(e, t, r, n), t.child;
			case 11: return Oc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Lc(e, t), Dc(e, t, r, n), t.child;
			case 8: return Dc(e, t, t.pendingProps.children, n), t.child;
			case 12: return Dc(e, t, t.pendingProps.children, n), t.child;
			case 10: return tl(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, ma(t), a = ha(a), r = r(a), t.flags |= 1, Dc(e, t, r, n), t.child;
			case 14: return kc(e, t, t.type, t.pendingProps, n);
			case 15: return Ac(e, t, t.type, t.pendingProps, n);
			case 19: return el(e, t, n);
			case 31: return Ic(e, t, n);
			case 22: return jc(e, t, n, t.pendingProps);
			case 24: return ma(t), r = ha(xa), e === null ? (a = Ia(), a === null && (a = Xu, o = Sa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, io(t), ca(t, xa, a)) : ((e.lanes & n) !== 0 && (ao(e, t), po(t, null, null, n), fo()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ca(t, xa, r), r !== a.cache && da(t, [xa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ca(t, xa, r))), Dc(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : Ji && Ui(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Lc(e, t), Dc(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function ol(e) {
		e.flags |= 4;
	}
	function sl(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Jm(t, r) : Jm(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Hd()) e.flags |= 8192;
				else throw Ka = Ha, Ba;
			}
		} else e.flags &= -16777217;
	}
	function cl(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Ym(t)) {
			if (Hd()) e.flags |= 8192;
			else throw Ka = Ha, Ba;
		}
	}
	function ll(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : nt(), e.lanes |= t, ud |= t);
	}
	function ul(e, t) {
		if (!Ji) switch (e.tailMode) {
			case "visible": break;
			case "collapsed":
				for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
				break;
			default:
				for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
		}
	}
	function dl(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function fl(e, t, n) {
		var r = t.pendingProps;
		switch (Wi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return dl(t), null;
			case 1: return dl(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), la(xa), _e(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ta(t) ? ol(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ra())), dl(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (ol(t), o === null ? (dl(t), sl(t, a, null, r, n)) : (dl(t), cl(t, o))) : o ? o === e.memoizedState ? (dl(t), t.flags &= -16777217) : (ol(t), dl(t), cl(t, o)) : (e = e.memoizedProps, e !== r && ol(t), dl(t), sl(t, a, e, r, n)), null;
			case 27:
				if (ye(t), n = me.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && ol(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return dl(t), t.subtreeFlags &= -33554433, null;
					}
					e = pe.current, ta(t) ? $i(t, e) : (e = hm(a, r, n), t.stateNode = e, ol(t));
				}
				return dl(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (ye(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && ol(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return dl(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = pe.current, ta(t)) $i(t, o);
					else {
						var s = lp(me.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[mt] = t, o[ht] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (np(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && ol(t);
					}
				}
				return dl(t), t.subtreeFlags &= -33554433, sl(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && ol(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = me.current, ta(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Ki, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[mt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || $f(e.nodeValue, n)), e || Qi(t, !0);
					} else e = lp(e).createTextNode(r), e[mt] = t, t.stateNode = e;
				}
				return dl(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ta(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[mt] = t;
						} else na(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						dl(t), e = !1;
					} else n = ra(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Do(t), t) : (Do(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return dl(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ta(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[mt] = t;
						} else na(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						dl(t), a = !1;
					} else a = ra(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Do(t), t) : (Do(t), null);
				}
				return Do(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), ll(t, t.updateQueue), dl(t), null);
			case 4: return _e(), e === null && Uf(t.stateNode.containerInfo), t.flags |= 67108864, dl(t), null;
			case 10: return la(t.type), dl(t), null;
			case 19:
				if (Ao(t), r = t.memoizedState, r === null) return dl(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) ul(r, !1);
					else {
						if (ad !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = jo(e), o !== null) {
								for (t.flags |= 128, ul(r, !1), e = o.updateQueue, t.updateQueue = e, ll(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) wi(n, e), n = n.sibling;
								return ko(t, Oo.current & 1 | 2), Ji && Vi(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Me() > gd && (t.flags |= 128, a = !0, ul(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = jo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, ll(t, e), ul(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !Ji) return dl(t), null;
						} else 2 * Me() - r.renderingStartTime > gd && n !== 536870912 && (t.flags |= 128, a = !0, ul(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				if (r.tail !== null) {
					e = r.tail;
					a: {
						for (n = e; n !== null;) {
							if (n.alternate !== null) {
								n = !1;
								break a;
							}
							n = n.sibling;
						}
						n = !0;
					}
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Me(), e.sibling = null, o = Oo.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || Ji ? ko(t, o) : (n = o, G(xo, t), G(Oo, n), So === null && (So = t)), Ji && Vi(t, r.treeForkCount), e;
				}
				return dl(t), null;
			case 22:
			case 23: return Do(t), bo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (dl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : dl(t), n = t.updateQueue, n !== null && ll(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && fe(Fa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), la(xa), dl(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, dl(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function pl(e, t) {
		switch (Wi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return la(xa), _e(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ye(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Do(t), t.alternate === null) throw Error(i(340));
					na();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Do(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					na();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Ao(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return _e(), null;
			case 10: return la(t.type), null;
			case 22:
			case 23: return Do(t), bo(), e !== null && fe(Fa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return la(xa), null;
			case 25: return null;
			default: return null;
		}
	}
	function ml(e, t) {
		switch (Wi(t), t.tag) {
			case 3:
				la(xa), _e();
				break;
			case 26:
			case 27:
			case 5:
				ye(t);
				break;
			case 4:
				_e();
				break;
			case 31:
				t.memoizedState !== null && Do(t);
				break;
			case 13:
				Do(t);
				break;
			case 19:
				Ao(t);
				break;
			case 10:
				la(t.type);
				break;
			case 22:
			case 23:
				Do(t), bo(), e !== null && fe(Fa);
				break;
			case 24: la(xa);
		}
	}
	function hl(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			ff(t, t.return, e);
		}
	}
	function gl(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								ff(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			ff(t, t.return, e);
		}
	}
	function _l(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				ho(t, n);
			} catch (t) {
				ff(e, e.return, t);
			}
		}
	}
	function vl(e, t, n) {
		n.props = hc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			ff(e, t, n);
		}
	}
	function yl(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						var i = e.stateNode, a = oi(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Pp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Fp(e);
							h(e.child, !1, Qp, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			ff(e, t, n);
		}
	}
	function bl(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				ff(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				ff(e, t, n);
			}
			else n.current = null;
		}
	}
	function xl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) em(e.stateNode, t[n]);
	}
	function Sl(e) {
		for (var t = e.return; t !== null && (Tl(t) && em(e.stateNode, t.stateNode), !wl(t));) t = t.return;
	}
	function Cl(e) {
		for (var t = e.return; t !== null && (Tl(t) && tm(e.stateNode, t.stateNode), !wl(t));) t = t.return;
	}
	function wl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function Tl(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function El(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			ff(e, e.return, t);
		}
	}
	function Dl(e, t, n) {
		try {
			var r = e.stateNode;
			ip(r, e.type, n, t), r[ht] = t;
		} catch (t) {
			ff(e, e.return, t);
		}
	}
	function Ol(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Sp(e.type) || e.tag === 4;
	}
	function kl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Ol(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Sp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Al(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = dn)), xl(e, r), Rt = !0;
		else if (i !== 4 && (i === 27 && (xl(e, r), r = null, Sp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Al(e, t, n, r), e = e.sibling; e !== null;) Al(e, t, n, r), e = e.sibling;
	}
	function jl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), xl(e, r), Rt = !0;
		else if (i !== 4 && (i === 27 && (xl(e, r), r = null, Sp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (jl(e, t, n, r), e = e.sibling; e !== null;) jl(e, t, n, r), e = e.sibling;
	}
	function Ml(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			np(t, r, n), t[mt] = e, t[ht] = n;
		} catch (t) {
			ff(e, e.return, t);
		}
	}
	var Nl = !1, Pl = null;
	function Fl(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Nl = !0);
	}
	var Il = null;
	function Ll() {
		var e = Il;
		return Il = null, e;
	}
	var Rl = 0;
	function zl(e, t, n, r, i) {
		return Rl = 0, Bl(e.child, t, n, r, i);
	}
	function Bl(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Op(o);
					r.push(s), s.view && (a = !0);
				} else a || Op(o).view && (a = !0);
				Nl = !0, Tp(o, Rl === 0 ? t : t + "_" + Rl, n), Rl++;
			} else e.tag === 22 && e.memoizedState !== null || e.tag === 30 && i || Bl(e.child, t, n, r, i) && (a = !0);
			e = e.sibling;
		}
		return a;
	}
	function Vl(e, t) {
		for (; e !== null;) e.tag === 5 ? Ep(e.stateNode, e.memoizedProps) : e.tag === 22 && e.memoizedState !== null || e.tag === 30 && t || Vl(e.child, t), e = e.sibling;
	}
	function Hl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (Hl(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = ci(t.default, t.share), t !== "none" && (zl(e, n, t, null, !1) || Vl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Ul(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = oi(r, n), a = ci(r.default, n.paired ? r.share : r.enter);
			a === "none" ? Hl(e) : zl(e, i, a, null, !1) ? (Hl(e), n.paired || t || Nd(e, r.onEnter)) : Vl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Ul(e, t), e = e.sibling;
		else Hl(e);
	}
	function Wl(e) {
		if (Pl !== null && Pl.size !== 0) {
			var t = Pl;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = ci(n.default, n.share);
								if (a !== "none" && (zl(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Nd(e, n.onShare)) : Vl(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					Wl(e);
				}
				e = e.sibling;
			}
		}
	}
	function Gl(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = oi(t, e.stateNode), r = Pl === null ? void 0 : Pl.get(n), i = ci(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (zl(e, n, i, null, !1) ? r === void 0 ? Nd(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Pl.delete(n), Nd(e, t.onShare)) : Vl(e.child, !1)), Pl !== null && Wl(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Gl(e), e = e.sibling;
		else Pl !== null && Wl(e);
	}
	function Kl(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = oi(t, e.stateNode);
				t = ci(t.default, t.update), e.flags &= -5, t !== "none" && zl(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && Kl(e);
			e = e.sibling;
		}
	}
	function ql(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, Vl(e.child, !1));
				}
				ql(e);
			}
			e = e.sibling;
		}
	}
	function Jl(e) {
		if (e.tag === 30) e.stateNode.paired = null, Vl(e.child, !1), ql(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Jl(e), e = e.sibling;
		else ql(e);
	}
	function Yl(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? Vl(e.child, !1) : e.subtreeFlags & 33554432 && Yl(e), e = e.sibling;
	}
	function Xl(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && Rl < a.length) {
					var l = a[Rl], u = Op(c);
					(l.view || u.view) && (s = !0);
					var d;
					if (d = !(e.flags & 4)) {
						if (u.clip) d = !0;
						else {
							d = l.rect;
							var f = u.rect;
							d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
						}
					}
					d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
				} else e.flags |= 32;
				e.flags & 4 && Tp(c, Rl === 0 ? n : n + "_" + Rl, i), s && e.flags & 4 || (Il === null && (Il = []), Il.push(c, Rl === 0 ? r : r + "_" + Rl, t.memoizedProps)), Rl++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : Xl(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function Zl(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = oi(n, r), a = ci(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(kp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				Rl = 0, i = Xl(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Nd(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && Zl(e, t);
			e = e.sibling;
		}
	}
	var Ql = !1, $l = !1, eu = !1, tu = !1, nu = typeof WeakSet == "function" ? WeakSet : Set, ru = null, iu = !1, au = !1, ou = !1, su = !1;
	function cu(e, t, n) {
		if (e = e.containerInfo, sp = gh, e = Ir(e), Lr(e)) {
			if ("selectionStart" in e) var r = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				r = (r = e.ownerDocument) && r.defaultView || window;
				var i = r.getSelection && r.getSelection();
				if (i && i.rangeCount !== 0) {
					r = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						r.nodeType, o.nodeType;
					} catch {
						r = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					r = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else r = null;
			}
			r ||= {
				start: 0,
				end: 0
			};
		} else r = null;
		for (cp = {
			focusedElem: e,
			selectionRange: r
		}, gh = !1, n = (n & 335544064) === n, ru = t, t = n ? 9270 : 1024; ru !== null;) {
			if (e = ru, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && Gl(r[a]);
			if (e.alternate === null && e.flags & 2) n && Fl(e), lu(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && Gl(r), lu(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Fl(e), lu(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, ru = r) : (n && Kl(e), lu(n));
			}
		}
		Pl = null;
	}
	function lu(e) {
		for (; ru !== null;) {
			var t = ru, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = hc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							ff(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) nm(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								nm(r);
								break;
							default: r.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				case 30:
					n && r !== null && (n = oi(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = ci(a.default, a.update), a !== "none" && zl(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, ru = r;
				break;
			}
			ru = t.return;
		}
	}
	function uu(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Au(e, n), r & 4 && hl(5, n);
				break;
			case 1:
				if (Au(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						ff(n, n.return, e);
					}
					else {
						var i = hc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							ff(n, n.return, e);
						}
					}
				}
				r & 64 && _l(n), r & 512 && yl(n, n.return);
				break;
			case 3:
				if (Au(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						ho(e, t);
					} catch (e) {
						ff(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Ml(n);
			case 26:
			case 5:
				Au(e, n), t === null && r & 4 && El(n), r & 512 && yl(n, n.return);
				break;
			case 12:
				Au(e, n);
				break;
			case 31:
				Au(e, n), r & 4 && yu(e, n);
				break;
			case 13:
				Au(e, n), r & 4 && bu(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = hf.bind(null, n), cm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Ql, !r) {
					var a = t !== null && t.memoizedState !== null || $l;
					t = Ql, i = $l, Ql = r, ($l = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), Mu(e, n, r)) : Au(e, n), Ql = t, $l = i;
				}
				break;
			case 30:
				Au(e, n), r & 512 && yl(n, n.return);
				break;
			case 7: r & 512 && yl(n, n.return);
			default: Au(e, n);
		}
	}
	function du(e, t) {
		for (e = e.child; e !== null;) fu(e, t), e = e.sibling;
	}
	function fu(e, t) {
		switch (e.tag) {
			case 5:
			case 26:
				try {
					var n = e.stateNode;
					if (t) {
						var r = n.style;
						typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
					} else {
						var i = e.stateNode, a = e.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null;
						i.style.display = o == null || typeof o == "boolean" ? "" : ("" + o).trim();
					}
				} catch (t) {
					ff(e, e.return, t);
				}
				pu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, Rt = !0;
				} catch (t) {
					ff(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? wp(s, !0) : wp(e.stateNode, !1);
				} catch (t) {
					ff(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && du(e, t);
				break;
			default: du(e, t);
		}
	}
	function pu(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						fu(n, r);
						break a;
					case 22:
						n.memoizedState === null && pu(n, r);
						break a;
					default: pu(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function mu(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, mu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ct(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var hu = null, gu = !1;
	function _u(e, t, n) {
		for (n = n.child; n !== null;) vu(e, t, n), n = n.sibling;
	}
	function vu(e, t, n) {
		if (He && typeof He.onCommitFiberUnmount == "function") try {
			He.onCommitFiberUnmount(Ve, n);
		} catch {}
		switch (n.tag) {
			case 26:
				$l || bl(n, t), _u(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !$l && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				$l || bl(n, t), Cl(n);
				var r = hu, i = gu;
				Sp(n.type) && (hu = n.stateNode, gu = !1), _u(e, t, n), gm(n.stateNode, n.type, n.memoizedProps), hu = r, gu = i;
				break;
			case 5: $l || bl(n, t), Cl(n);
			case 6:
				if (n.tag === 6 && Cl(n), r = hu, i = gu, hu = null, _u(e, t, n), hu = r, gu = i, hu !== null) {
					if (gu) try {
						(hu.nodeType === 9 ? hu.body : hu.nodeName === "HTML" ? hu.ownerDocument.body : hu).removeChild(n.stateNode), Rt = !0;
					} catch (e) {
						ff(n, t, e);
					}
					else try {
						hu.removeChild(n.stateNode), Rt = !0;
					} catch (e) {
						ff(n, t, e);
					}
				}
				break;
			case 18:
				hu !== null && (gu ? (e = hu, Cp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Hh(e)) : Cp(hu, n.stateNode));
				break;
			case 4:
				r = hu, i = gu, hu = n.stateNode.containerInfo, gu = !0, _u(e, t, n), hu = r, gu = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				gl(2, n, t), $l || gl(4, n, t), _u(e, t, n);
				break;
			case 1:
				$l || (bl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && vl(n, t, r)), _u(e, t, n);
				break;
			case 21:
				_u(e, t, n);
				break;
			case 22:
				$l = (r = $l) || n.memoizedState !== null, _u(e, t, n), $l = r;
				break;
			case 30:
				bl(n, t), _u(e, t, n);
				break;
			case 7:
				$l || bl(n, t), _u(e, t, n);
				break;
			default: _u(e, t, n);
		}
	}
	function yu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Hh(e);
			} catch (e) {
				ff(t, t.return, e);
			}
		}
	}
	function bu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Hh(e);
		} catch (e) {
			ff(t, t.return, e);
		}
	}
	function xu(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new nu()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new nu()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function Su(e, t) {
		var n = xu(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = gf.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Cu(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Sp(l.type)) {
							hu = l.stateNode, gu = !1;
							break a;
						}
						break;
					case 5:
						hu = l.stateNode, gu = !1;
						break a;
					case 3:
					case 4:
						hu = l.stateNode.containerInfo, gu = !0;
						break a;
				}
				l = l.return;
			}
			if (hu === null) throw Error(i(160));
			vu(s, c, o), hu = null, gu = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Tu(t, e, n), t = t.sibling;
	}
	var wu = null;
	function Tu(e, t, n) {
		var r = e.alternate, a = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (a & 4 && (r = e.updateQueue, r = r === null ? null : r.events, r !== null)) for (var o = 0; o < r.length; o++) {
					var s = r[o];
					s.ref.impl = s.nextImpl;
				}
				Cu(t, e, n), Eu(e), a & 4 && (gl(3, e, e.return), hl(3, e), gl(5, e, e.return));
				break;
			case 1:
				Cu(t, e, n), Eu(e), a & 512 && ($l || r === null || bl(r, r.return)), a & 64 && Ql && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = wu, Cu(t, e, n), Eu(e), a & 512 && ($l || r === null || bl(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (Ql) e.stateNode = fp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[xt] || r[mt] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), np(r, t, n), r[mt] = e, Ot(r), t = r;
												break a;
											case "link":
												if (o = Gm("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = Gm("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[mt] = e, Ot(r), t = r;
									}
									e.stateNode = t;
								}
							} else Ql || Km(o, e.type, e.stateNode);
						} else e.stateNode = Bm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Dl(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || $l || t.parentNode.removeChild(t)) : a.count--, n === null ? Ql || Km(o, e.type, e.stateNode) : Bm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				Cu(t, e, n), Eu(e), a & 512 && ($l || r === null || bl(r, r.return)), r !== null && a & 4 && Dl(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = eu, eu = !1, Cu(t, e, n), eu = o, Eu(e), a & 512 && ($l || r === null || bl(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						nn(t, ""), Rt = !0;
					} catch (t) {
						ff(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Dl(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (tu = !0);
				break;
			case 6:
				if (Cu(t, e, n), Eu(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, Rt = !0;
					} catch (t) {
						ff(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Rt = !1, Wm = null, o = wu, wu = bm(t.containerInfo), Cu(t, e, n), wu = o, Eu(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Hh(t.containerInfo);
				} catch (t) {
					ff(e, e.return, t);
				}
				tu && (tu = !1, Du(e)), Rt = !1;
				break;
			case 4:
				a = eu, eu = Ql, r = zt(), o = wu, wu = bm(e.stateNode.containerInfo), Cu(t, e, n), Eu(e), wu = o, Rt && au && (ou = !0), Rt = r, eu = a;
				break;
			case 12:
				Cu(t, e, n), Eu(e);
				break;
			case 31:
				Cu(t, e, n), Eu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Su(e, t)));
				break;
			case 13:
				Cu(t, e, n), Eu(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (md = Me()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Su(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = Ql, l = $l, u = eu;
				Ql = c || o, eu = u || o, $l = l || s, Cu(t, e, n), $l = l, eu = u, Ql = c, Eu(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || Ql || $l || (t = s || $l, n = Ql, r = $l, Ql = o || Ql, $l = t, ju(e, 2), Ql = n, $l = r), !o && eu || du(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Su(e, n))));
				break;
			case 19:
				Cu(t, e, n), Eu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Su(e, t)));
				break;
			case 30:
				a & 512 && ($l || r === null || bl(r, r.return)), a = zt(), o = au, s = (n & 335544064) === n, c = e.memoizedProps, au = s && ci(c.default, c.update) !== "none", Cu(t, e, n), Eu(e), s && r !== null && Rt && (e.flags |= 4), au = o, Rt = a;
				break;
			case 21: break;
			case 7: a & 512 && ($l || r === null || bl(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: Cu(t, e, n), Eu(e);
		}
	}
	function Eu(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Ol(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (Tl(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (wl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						jl(e, kl(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (nn(l, ""), n.flags &= -33), jl(e, kl(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						Al(e, kl(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				ff(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Du(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Du(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gh = !0, t.reset(), gh = !1), e = e.sibling;
		}
	}
	function Ou(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) ku(t, e), t = t.sibling;
		else Zl(t, !1);
	}
	function ku(e, t) {
		var n = e.alternate;
		if (n === null) Ul(e, !1);
		else switch (e.tag) {
			case 3:
				if (su = iu = !1, Ll(), Ou(t, e), !iu && !ou) {
					if (e = Il, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Ep(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(" + i + ")"
						});
					}
					e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
						opacity: [0, 0],
						pointerEvents: ["none", "none"]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition-group(root)"
					}), e.animate({
						width: [0, 0],
						height: [0, 0]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition"
					})), su = !0;
				}
				Il = null;
				break;
			case 5:
				Ou(t, e);
				break;
			case 4:
				r = iu, iu = !1, Ou(t, e), iu && (ou = !0), iu = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? Ou(t, e) : Ul(e, !1));
				break;
			case 30:
				r = iu, i = Ll(), iu = !1, Ou(t, e), iu && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = oi(a, o), o = oi(n.memoizedProps, o);
				var s = ci(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, Rl = 0, t = Xl(e, n, t, o, s, a, !0), Rl !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Nd(e, e.memoizedProps.onUpdate), Il = i) : i !== null && (i.push.apply(i, Il), Il = i), iu = e.flags & 32 ? !0 : r;
				break;
			default: Ou(t, e);
		}
	}
	function Au(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) uu(e, t.alternate, t), t = t.sibling;
	}
	function ju(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					gl(4, n, n.return), ju(n, r);
					break;
				case 1:
					bl(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && vl(n, n.return, i), ju(n, r);
					break;
				case 27: r & 2 && gm(n.stateNode, n.type, n.memoizedProps);
				case 5:
					bl(n, n.return), n.tag !== 5 && n.tag !== 27 || Cl(n), ju(n, r);
					break;
				case 6:
					Cl(n);
					break;
				case 26:
					bl(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || $l || i.parentNode.removeChild(i), ju(n, r);
					break;
				case 22:
					n.memoizedState === null && ju(n, r);
					break;
				case 30:
					bl(n, n.return), ju(n, r);
					break;
				case 7: bl(n, n.return);
				default: ju(n, r);
			}
			e = e.sibling;
		}
	}
	function Mu(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Mu(i, a, n), hl(4, a);
					break;
				case 1:
					if (Mu(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						ff(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) mo(l[i], c);
						} catch (e) {
							ff(r, r.return, e);
						}
					}
					s && o & 64 && _l(a), yl(a, a.return);
					break;
				case 27: n & 2 && Ml(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || Sl(a), Mu(i, a, n), s && r === null && o & 4 && El(a), yl(a, a.return);
					break;
				case 6:
					Sl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || Ql || Km(bm(c.ownerDocument), a.type, c), Mu(i, a, n), s && r === null && o & 4 && El(a), yl(a, a.return);
					break;
				case 12:
					Mu(i, a, n);
					break;
				case 31:
					Mu(i, a, n), s && o & 4 && yu(i, a);
					break;
				case 13:
					Mu(i, a, n), s && o & 4 && bu(i, a);
					break;
				case 22:
					a.memoizedState === null && Mu(i, a, n), yl(a, a.return);
					break;
				case 30:
					Mu(i, a, n), yl(a, a.return);
					break;
				case 7: yl(a, a.return);
				default: Mu(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Nu(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Ca(n));
	}
	function Pu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ca(e));
	}
	function Fu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Iu(e, t, n, r), t = t.sibling;
		else i && Yl(t);
	}
	function Iu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && Jl(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Fu(e, t, n, r), a & 2048 && hl(9, t);
				break;
			case 1:
				Fu(e, t, n, r);
				break;
			case 3:
				Fu(e, t, n, r), i && su && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Ca(a)));
				break;
			case 12:
				if (a & 2048) {
					Fu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						ff(t, t.return, e);
					}
				} else Fu(e, t, n, r);
				break;
			case 31:
				Fu(e, t, n, r);
				break;
			case 13:
				Fu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && Jl(t), o._visibility & 2 ? Fu(e, t, n, r) : (o._visibility |= 2, Lu(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && Jl(s), o._visibility & 2 ? Fu(e, t, n, r) : Ru(e, t)), a & 2048 && Nu(s, t);
				break;
			case 24:
				Fu(e, t, n, r), a & 2048 && Pu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Vl(a.child, !0), Vl(t.child, !0))), Fu(e, t, n, r);
				break;
			default: Fu(e, t, n, r);
		}
	}
	function Lu(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Lu(a, o, s, c, i), hl(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Lu(a, o, s, c, i)) : u._visibility & 2 ? Lu(a, o, s, c, i) : Ru(a, o), i && l & 2048 && Nu(o.alternate, o);
					break;
				case 24:
					Lu(a, o, s, c, i), i && l & 2048 && Pu(o.alternate, o);
					break;
				default: Lu(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Ru(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Ru(n, r), i & 2048 && Nu(r.alternate, r);
					break;
				case 24:
					Ru(n, r), i & 2048 && Pu(r.alternate, r);
					break;
				default: Ru(n, r);
			}
			t = t.sibling;
		}
	}
	var zu = 8192;
	function Bu(e, t, n) {
		if (e.subtreeFlags & zu) for (e = e.child; e !== null;) Vu(e, t, n), e = e.sibling;
	}
	function Vu(e, t, n) {
		switch (e.tag) {
			case 26:
				Bu(e, t, n), e.flags & zu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Zm(n, e)) : Qm(n, wu, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Bu(e, t, n), e.flags & zu && (e = e.stateNode, (t & 335544128) === t && Zm(n, e));
				break;
			case 3:
			case 4:
				var r = wu;
				wu = bm(e.stateNode.containerInfo), Bu(e, t, n), wu = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = zu, zu = 16777216, Bu(e, t, n), zu = r) : Bu(e, t, n));
				break;
			case 30:
				if ((e.flags & zu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Pl === null && (Pl = /* @__PURE__ */ new Map()), Pl.set(r, i);
				}
				Bu(e, t, n);
				break;
			default: Bu(e, t, n);
		}
	}
	function Hu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Uu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				ru = r, Ku(r, e);
			}
			Hu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Wu(e), e = e.sibling;
	}
	function Wu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Uu(e), e.flags & 2048 && gl(9, e, e.return);
				break;
			case 3:
				Uu(e);
				break;
			case 12:
				Uu(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Gu(e)) : Uu(e);
				break;
			default: Uu(e);
		}
	}
	function Gu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				ru = r, Ku(r, e);
			}
			Hu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					gl(8, t, t.return), Gu(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Gu(t));
					break;
				default: Gu(t);
			}
			e = e.sibling;
		}
	}
	function Ku(e, t) {
		for (; ru !== null;) {
			var n = ru;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					gl(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Ca(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, ru = r;
			else a: for (n = e; ru !== null;) {
				r = ru;
				var i = r.sibling, a = r.return;
				if (mu(r), r === n) {
					ru = null;
					break a;
				}
				if (i !== null) {
					i.return = a, ru = i;
					break a;
				}
				ru = a;
			}
		}
	}
	var qu = {
		getCacheForType: function(e) {
			var t = ha(xa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ha(xa).controller.signal;
		}
	}, Ju = typeof WeakMap == "function" ? WeakMap : Map, Yu = 0, Xu = null, Zu = null, Qu = 0, $u = 0, ed = null, td = !1, nd = !1, rd = !1, id = 0, ad = 0, od = 0, sd = 0, cd = 0, ld = 0, ud = 0, dd = null, fd = null, pd = !1, md = 0, hd = 0, gd = Infinity, _d = null, vd = null, yd = 0, bd = null, xd = null, Sd = 0, Cd = 0, wd = null, Td = null, Ed = null, Dd = null, Od = null, kd = 0, Ad = null;
	function jd() {
		return Yu & 2 && Qu !== 0 ? Qu & -Qu : U.T === null ? dt() : Mf();
	}
	function Md() {
		if (ld === 0) {
			if (!(Qu & 536870912) || Ji) {
				var e = Ye;
				Ye <<= 1, !(Ye & 3932160) && (Ye = 262144), ld = e;
			} else ld = 536870912;
		}
		return e = xo.current, e !== null && (e.flags |= 32), ld;
	}
	function Nd(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Pp(oi(e.memoizedProps, n))), Dd === null && (Dd = []), Dd.push(t.bind(null, r));
		}
	}
	function Pd(e, t, n) {
		(e === Xu && ($u === 2 || $u === 9) || e.cancelPendingCommit !== null) && (Z(e, 0), Rd(e, Qu, ld, !1)), it(e, n), Yu & 2 && e === Xu || (e === Xu && (!(Yu & 2) && (sd |= n), ad === 4 && Rd(e, Qu, ld, !1)), wf(e));
	}
	function Fd(e, t, n) {
		if (Yu & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || $e(e, t), a = r ? Q(e, t) : Kd(e, t, !0), o = r;
		do {
			if (a === 0) {
				nd && !r && Rd(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Ld(n)) a = Kd(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = dd;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Z(c, s).flags |= 256), s = Kd(c, s, !1), s !== 2 && s !== 6) {
								if (rd && !l) {
									c.errorRecoveryDisabledLanes |= o, sd |= o, a = 4;
									break a;
								}
								o = fd, fd = a, o !== null && (fd === null ? fd = o : fd.push.apply(fd, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Z(e, 0), Rd(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Rd(r, t, ld, !td);
							break a;
						case 2:
							fd = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = md + 300 - Me(), 10 < a)) {
						if (Rd(r, t, ld, !td), Qe(r, 0, !0) !== 0) break a;
						Sd = t, r.timeoutHandle = gp(Id.bind(null, r, n, fd, _d, pd, t, ld, sd, ud, td, o, "Throttled", -0, 0), a);
						break a;
					}
					Id(r, n, fd, _d, pd, t, ld, sd, ud, td, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		wf(e);
	}
	function Id(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.timeoutHandle = -1;
		var m = t.subtreeFlags, h = (a & 335544064) === a;
		d = null, (h || m & 8192 || (m & 16785408) == 16785408) && (d = {
			stylesheets: null,
			count: 0,
			imgCount: 0,
			imgBytes: 0,
			suspenseyImages: [],
			waitingForImages: !0,
			waitingForViewTransition: !1,
			unsuspend: dn
		}, Pl = null, Vu(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = nh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? md - Me() : (a & 4194048) === a ? hd - Me() : 0, m = eh(d, m), m !== null) ? (Sd = a, e.cancelPendingCommit = m(ef.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Rd(e, a, o, !l)) : ef(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Ld(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!jr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Rd(e, t, n, r) {
		t = et(e, t), t &= ~cd, t &= ~sd, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - We(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && ot(e, n, t);
	}
	function zd() {
		return Yu & 6 ? !0 : (Tf(0, !1), !1);
	}
	function Bd() {
		if (Zu !== null) {
			if ($u === 0) var e = Zu.return;
			else e = Zu, sa = oa = null, Zo(e), Ya = null, Xa = 0, e = Zu;
			for (; e !== null;) ml(e.alternate, e), e = e.return;
			Zu = null;
		}
	}
	function Z(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, _p(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Sd = 0, Bd(), Xu = e, Zu = n = Ci(e.current, null), Qu = t, $u = 0, ed = null, td = !1, nd = $e(e, t), rd = !1, ud = ld = cd = sd = od = ad = 0, fd = dd = null, pd = !1, id = et(e, t), pi(), n;
	}
	function Vd(e, t) {
		No = null, U.H = sc, t === za || t === Va ? (t = qa(), $u = 3) : t === Ba ? (t = qa(), $u = 4) : $u = t === Tc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, ed = t, Zu === null && (ad = 1, yc(e, ji(t, e.current)));
	}
	function Hd() {
		var e = xo.current;
		return e === null ? !0 : (Qu & 4194048) === Qu ? So === null : (Qu & 62914560) === Qu || Qu & 536870912 ? e === So : !1;
	}
	function Ud() {
		var e = U.H;
		return U.H = sc, e === null ? sc : e;
	}
	function Wd() {
		var e = U.A;
		return U.A = qu, e;
	}
	function Gd() {
		ad = 4, td || (Qu & 4194048) !== Qu && xo.current !== null || (nd = !0), !(od & 134217727) && !(sd & 134217727) || Xu === null || Rd(Xu, Qu, ld, !1);
	}
	function Kd(e, t, n) {
		var r = Yu;
		Yu |= 2;
		var i = Ud(), a = Wd();
		(Xu !== e || Qu !== t) && (_d = null, Z(e, t)), t = !1;
		var o = ad;
		a: do
			try {
				if ($u !== 0 && Zu !== null) {
					var s = Zu, c = ed;
					switch ($u) {
						case 8:
							Bd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							xo.current === null && (t = !0);
							var l = $u;
							if ($u = 0, ed = null, Zd(e, s, c, l), n && nd) {
								o = 0;
								break a;
							}
							break;
						default: l = $u, $u = 0, ed = null, Zd(e, s, c, l);
					}
				}
				qd(), o = ad;
				break;
			} catch (t) {
				Vd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, sa = oa = null, Yu = r, U.H = i, U.A = a, Zu === null && (Xu = null, Qu = 0, pi()), o;
	}
	function qd() {
		for (; Zu !== null;) Yd(Zu);
	}
	function Q(e, t) {
		var n = Yu;
		Yu |= 2;
		var r = Ud(), a = Wd();
		Xu !== e || Qu !== t ? (_d = null, gd = Me() + 500, Z(e, t)) : nd = $e(e, t);
		a: do
			try {
				if ($u !== 0 && Zu !== null) {
					t = Zu;
					var o = ed;
					b: switch ($u) {
						case 1:
							$u = 0, ed = null, Zd(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Ua(o)) {
								$u = 0, ed = null, Xd(t);
								break;
							}
							t = function() {
								$u !== 2 && $u !== 9 || Xu !== e || ($u = 7), wf(e);
							}, o.then(t, t);
							break a;
						case 3:
							$u = 7;
							break a;
						case 4:
							$u = 5;
							break a;
						case 7:
							Ua(o) ? ($u = 0, ed = null, Xd(t)) : ($u = 0, ed = null, Zd(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Zu.tag) {
								case 26: s = Zu.memoizedState;
								case 5:
								case 27:
									var c = Zu;
									if (s ? Ym(s) : c.stateNode.complete) {
										$u = 0, ed = null;
										var l = c.sibling;
										if (l !== null) Zu = l;
										else {
											var u = c.return;
											u === null ? Zu = null : (Zu = u, Qd(u));
										}
										break b;
									}
							}
							$u = 0, ed = null, Zd(e, t, o, 5);
							break;
						case 6:
							$u = 0, ed = null, Zd(e, t, o, 6);
							break;
						case 8:
							Bd(), ad = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Jd();
				break;
			} catch (t) {
				Vd(e, t);
			}
		while (1);
		return sa = oa = null, U.H = r, U.A = a, Yu = n, Zu === null ? (Xu = null, Qu = 0, pi(), ad) : 0;
	}
	function Jd() {
		for (; Zu !== null && !Ae();) Yd(Zu);
	}
	function Yd(e) {
		var t = al(e.alternate, e, id);
		e.memoizedProps = e.pendingProps, t === null ? Qd(e) : Zu = t;
	}
	function Xd(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = zc(n, t, t.pendingProps, t.type, void 0, Qu);
				break;
			case 11:
				t = zc(n, t, t.pendingProps, t.type.render, t.ref, Qu);
				break;
			case 5:
				Zo(t);
				var r = t;
				r === Ki && (Ji ? (ea(r), r.tag === 5 && r.stateNode != null && (qi = r.stateNode)) : (ea(r), Ji = !0));
			default: ml(n, t), t = Zu = wi(t, id), t = al(n, t, id);
		}
		e.memoizedProps = e.pendingProps, t === null ? Qd(e) : Zu = t;
	}
	function Zd(e, t, n, r) {
		sa = oa = null, Zo(t), Ya = null, Xa = 0;
		var i = t.return;
		try {
			if (wc(e, i, t, n, Qu)) {
				ad = 1, yc(e, ji(n, e.current)), Zu = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Zu = i, t;
			ad = 1, yc(e, ji(n, e.current)), Zu = null;
			return;
		}
		t.flags & 32768 ? (Ji || r === 1 ? e = !0 : nd || Qu & 536870912 ? e = !1 : (td = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = xo.current, r !== null && r.tag === 13 && (r.flags |= 16384))), $d(t, e)) : Qd(t);
	}
	function Qd(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				$d(t, td);
				return;
			}
			e = t.return;
			var n = fl(t.alternate, t, id);
			if (n !== null) {
				Zu = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Zu = t;
				return;
			}
			Zu = t = e;
		} while (t !== null);
		ad === 0 && (ad = 5);
	}
	function $d(e, t) {
		do {
			var n = pl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Zu = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Zu = e;
				return;
			}
			Zu = e = n;
		} while (e !== null);
		ad = 6, Zu = null;
	}
	function ef(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			lf();
		while (yd !== 0);
		if (Yu & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === Xu && (Zu = Xu = null, Qu = 0), xd = t, bd = e, Sd = n, wd = a, Td = r, tf(e, t, n, s, c, l, f);
		}
	}
	function tf(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (Cd = s, s |= fi, at(e, n, s, r, i, a), Dd = null, (n & 335544064) === n ? (Od = Ea(e), r = 10262) : (Od = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, _f(Ie, function() {
			return uf(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Nl = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = U.T, U.T = null, i = W.p, W.p = 2, a = Yu, Yu |= 4;
			try {
				cu(e, t, n);
			} finally {
				Yu = a, W.p = i, U.T = r;
			}
		}
		yd = 1, Nl ? Ed = Mp(o, e.containerInfo, Od, af, of, rf, sf, uf, nf, null, null) : (af(), of(), sf());
	}
	function nf(e) {
		if (yd !== 0) {
			var t = bd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function rf() {
		yd === 3 && (yd = 0, ku(xd, bd), yd = 4);
	}
	function af() {
		if (yd === 1) {
			yd = 0;
			var e = bd, t = xd, n = Sd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = U.T, U.T = null;
				var i = W.p;
				W.p = 2;
				var a = Yu;
				Yu |= 4;
				try {
					au = ou = !1, Tu(t, e, n), n = cp;
					var o = Ir(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && Fr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Lr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Pr(s, h), v = Pr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					gh = !!sp, cp = sp = null;
				} finally {
					Yu = a, W.p = i, U.T = r;
				}
			}
			e.current = t, yd = 2;
		}
	}
	function of() {
		if (yd === 2) {
			yd = 0;
			var e = bd, t = xd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = U.T, U.T = null;
				var r = W.p;
				W.p = 2;
				var i = Yu;
				Yu |= 4;
				try {
					uu(e, t.alternate, t);
				} finally {
					Yu = i, W.p = r, U.T = n;
				}
			}
			yd = 3;
		}
	}
	function sf() {
		if (yd === 4 || yd === 3) {
			yd = 0;
			var e = Ed;
			Ed = null, je();
			var t = bd, n = xd, r = Sd, i = Td, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? yd = 5 : (yd = 0, xd = bd = null, cf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (vd = null), ut(r), n = n.stateNode, He && typeof He.onCommitFiberRoot == "function") try {
				He.onCommitFiberRoot(Ve, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = U.T, a = W.p, W.p = 2, U.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					U.T = n, W.p = a;
				}
			}
			if (i = Dd, o = Od, Od = null, i !== null && (Dd = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			Sd & 3 && lf(), wf(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Ad ? kd++ : (kd = 0, Ad = t) : (kd = 0, Ad = null), Tf(0, !1);
		}
	}
	function cf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ca(t)));
	}
	function lf() {
		return Ed !== null && (Ed.skipTransition(), Ed = null), af(), of(), sf(), uf();
	}
	function uf() {
		if (yd !== 5) return !1;
		var e = bd, t = Cd;
		Cd = 0;
		var n = ut(Sd), r = U.T, a = W.p;
		try {
			W.p = 32 > n ? 32 : n, U.T = null, n = wd, wd = null;
			var o = bd, s = Sd;
			if (yd = 0, xd = bd = null, Sd = 0, Yu & 6) throw Error(i(331));
			var c = Yu;
			if (Yu |= 4, Wu(o.current), Iu(o, o.current, s, n), Yu = c, Tf(0, !1), He && typeof He.onPostCommitFiberRoot == "function") try {
				He.onPostCommitFiberRoot(Ve, o);
			} catch {}
			return !0;
		} finally {
			W.p = a, U.T = r, cf(e, t);
		}
	}
	function df(e, t, n) {
		t = ji(n, t), t = xc(e.stateNode, t, 2), e = so(e, t, 2), e !== null && (it(e, 2), wf(e));
	}
	function ff(e, t, n) {
		if (e.tag === 3) df(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				df(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (vd === null || !vd.has(r))) {
					e = ji(n, e), n = Sc(2), r = so(t, n, 2), r !== null && (Cc(n, r, t, e), it(r, 2), wf(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function $(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Ju();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (rd = !0, i.add(n), e = pf.bind(null, e, t, n), t.then(e, e));
	}
	function pf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Xu === e && (Qu & n) === n && (ad === 4 || ad === 3 && (Qu & 62914560) === Qu && 300 > Me() - md ? Yu & 2 ? cd |= n : Z(e, 0) : cd |= n, ud === Qu && (ud = 0)), wf(e);
	}
	function mf(e, t) {
		t === 0 && (t = nt()), e = gi(e, t), e !== null && (it(e, t), wf(e));
	}
	function hf(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), mf(e, n);
	}
	function gf(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), mf(e, n);
	}
	function _f(e, t) {
		return Oe(e, t);
	}
	var vf = null, yf = null, bf = !1, xf = !1, Sf = !1, Cf = 0;
	function wf(e) {
		e !== yf && e.next === null && (yf === null ? vf = yf = e : yf = yf.next = e), xf = !0, bf || (bf = !0, jf());
	}
	function Tf(e, t) {
		if (!Sf && xf) {
			Sf = !0;
			do
				for (var n = !1, r = vf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - We(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Af(r, a));
						} else a = Qu, a = Qe(r, r === Xu ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || $e(r, a) || (n = !0, Af(r, a));
					}
					r = r.next;
				}
			while (n);
			Sf = !1;
		}
	}
	function Ef() {
		Df();
	}
	function Df() {
		xf = bf = !1;
		var e = 0;
		Cf !== 0 && hp() && (e = Cf);
		for (var t = Me(), n = null, r = vf; r !== null;) {
			var i = r.next, a = Of(r, t);
			a === 0 ? (r.next = null, n === null ? vf = i : n.next = i, i === null && (yf = n)) : (n = r, (e !== 0 || a & 3) && (xf = !0)), r = i;
		}
		yd !== 0 && yd !== 5 || Tf(e, !1), Cf !== 0 && (Cf = 0);
	}
	function Of(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - We(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = tt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Xu, n = Qu, n = Qe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && ($u === 2 || $u === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && ke(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || $e(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && ke(r), ut(n)) {
				case 2:
				case 8:
					n = Fe;
					break;
				case 32:
					n = Ie;
					break;
				case 268435456:
					n = Re;
					break;
				default: n = Ie;
			}
			return r = kf.bind(null, e), n = Oe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && ke(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function kf(e, t) {
		if (yd !== 0 && yd !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (lf() && e.callbackNode !== n) return null;
		var r = Qu;
		return r = Qe(e, e === Xu ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Fd(e, r, t), Of(e, Me()), e.callbackNode != null && e.callbackNode === n ? kf.bind(null, e) : null);
	}
	function Af(e, t) {
		if (lf()) return null;
		Fd(e, t, !0);
	}
	function jf() {
		bp(function() {
			Yu & 6 ? Oe(Pe, Ef) : Df();
		});
	}
	function Mf() {
		if (Cf === 0) {
			var e = ka;
			e === 0 && (e = Je, Je <<= 1, !(Je & 261888) && (Je = 256)), Cf = e;
		}
		return Cf;
	}
	function Nf(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : un(e);
	}
	function Pf(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Nf((i[ht] || null).action), o = r.submitter;
			o && (t = (t = o[ht] || null) ? Nf(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new An("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Cf !== 0) {
								var e = new FormData(i, o);
								qs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), qs(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var Ff = 0; Ff < ri.length; Ff++) {
		var If = ri[Ff];
		ii(If.toLowerCase(), "on" + (If[0].toUpperCase() + If.slice(1)));
	}
	ii(Yr, "onAnimationEnd"), ii(Xr, "onAnimationIteration"), ii(Zr, "onAnimationStart"), ii("dblclick", "onDoubleClick"), ii("focusin", "onFocus"), ii("focusout", "onBlur"), ii(Qr, "onTransitionRun"), ii($r, "onTransitionStart"), ii(ei, "onTransitionCancel"), ii(ti, "onTransitionEnd"), Nt("onMouseEnter", ["mouseout", "mouseover"]), Nt("onMouseLeave", ["mouseout", "mouseover"]), Nt("onPointerEnter", ["pointerout", "pointerover"]), Nt("onPointerLeave", ["pointerout", "pointerover"]), Mt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Mt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Mt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Mt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Mt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Mt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Rf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Lf));
	function zf(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						li(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						li(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Bf(e, t) {
		var n = t[_t];
		n === void 0 && (n = t[_t] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Wf(t, e, 2, !1), n.add(r));
	}
	function Vf(e, t, n) {
		var r = 0;
		t && (r |= 4), Wf(n, e, r, t);
	}
	var Hf = "_reactListening" + Math.random().toString(36).slice(2);
	function Uf(e) {
		if (!e[Hf]) {
			e[Hf] = !0, At.forEach(function(t) {
				t !== "selectionchange" && (Rf.has(t) || Vf(t, !1, e), Vf(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Hf] || (t[Hf] = !0, Vf("selectionchange", !1, t));
		}
	}
	function Wf(e, t, n, r) {
		switch (Ch(t)) {
			case 2:
				var i = _h;
				break;
			case 8:
				i = vh;
				break;
			default: i = yh;
		}
		n = i.bind(null, t, n, e), i = void 0, !yn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Gf(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = wt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		_n(function() {
			var r = a, i = pn(n), s = [];
			a: {
				var c = ni.get(e);
				if (c !== void 0) {
					var l = An, u = e;
					switch (e) {
						case "keypress": if (Tn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Jn;
							break;
						case "focusin":
							u = "focus", l = zn;
							break;
						case "focusout":
							u = "blur", l = zn;
							break;
						case "beforeblur":
						case "afterblur":
							l = zn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Ln;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Rn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Zn;
							break;
						case Yr:
						case Xr:
						case Zr:
							l = Bn;
							break;
						case ti:
							l = Qn;
							break;
						case "scroll":
						case "scrollend":
							l = Mn;
							break;
						case "wheel":
							l = $n;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Vn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Yn;
							break;
						case "submit":
							l = Xn;
							break;
						case "toggle":
						case "beforetoggle": l = er;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = J(m, p), g != null && d.push(Kf(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== fn && (u = n.relatedTarget || n.fromElement) && (wt(u) || u[gt])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? wt(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Ln, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Yn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Et(c), h = l == null ? u : Et(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, wt(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? E(c, l, Jf) : null, c !== null && Yf(s, u, c, d, !1), l !== null && f !== null && Yf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Et(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = yr;
					else if (mr(c)) {
						if (br) _ = kr;
						else {
							_ = Dr;
							var v = Er;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && sn(r.elementType) && (_ = yr) : _ = Or;
					if (_ &&= _(e, r)) {
						hr(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Et(r) : window, e) {
					case "focusin":
						(mr(v) || v.contentEditable === "true") && (zr = v, Br = r, Vr = null);
						break;
					case "focusout":
						Vr = Br = zr = null;
						break;
					case "mousedown":
						Hr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Hr = !1, Ur(s, n, i);
						break;
					case "selectionchange": if (Rr) break;
					case "keydown":
					case "keyup": Ur(s, n, i);
				}
				var y;
				if (nr) b: {
					switch (e) {
						case "compositionstart":
							var b = "onCompositionStart";
							break b;
						case "compositionend":
							b = "onCompositionEnd";
							break b;
						case "compositionupdate":
							b = "onCompositionUpdate";
							break b;
					}
					b = void 0;
				}
				else ur ? cr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (ar && n.locale !== "ko" && (ur || b !== "onCompositionStart" ? b === "onCompositionEnd" && ur && (y = wn()) : (xn = i, Sn = "value" in xn ? xn.value : xn.textContent, ur = !0)), v = qf(r, b), 0 < v.length && (b = new Hn(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = lr(n), y !== null && (b.data = y)))), (y = ir ? dr(e, n) : fr(e, n)) && (b = qf(r, "onBeforeInput"), 0 < b.length && (v = new Hn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), Pf(s, e, r, n, i);
			}
			zf(s, t);
		});
	}
	function Kf(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function qf(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = J(e, n), i != null && r.unshift(Kf(e, i, a)), i = J(e, t), i != null && r.push(Kf(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Jf(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Yf(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = J(n, a), l != null && o.unshift(Kf(n, l, c))) : i || (l = J(n, a), l != null && o.push(Kf(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Xf = /\r\n?/g, Zf = /\u0000|\uFFFD/g;
	function Qf(e) {
		return (typeof e == "string" ? e : "" + e).replace(Xf, "\n").replace(Zf, "");
	}
	function $f(e, t) {
		return t = Qf(t), Qf(e) === t;
	}
	function ep(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || nn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && nn(e, "" + r);
				else return;
				break;
			case "className":
				Vt(e, "class", r);
				break;
			case "tabIndex":
				Vt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Vt(e, n, r);
				break;
			case "style":
				on(e, r, o);
				return;
			case "data": if (t !== "object") {
				Vt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = un(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && ep(e, t, "name", a.name, a, null), ep(e, t, "formEncType", a.formEncType, a, null), ep(e, t, "formMethod", a.formMethod, a, null), ep(e, t, "formTarget", a.formTarget, a, null)) : (ep(e, t, "encType", a.encType, a, null), ep(e, t, "method", a.method, a, null), ep(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = un(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = dn);
				return;
			case "onScroll":
				r != null && Bf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Bf("scrollend", e);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = un(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "credentialless":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Bf("beforetoggle", e), Bf("toggle", e), Bt(e, "popover", r);
				break;
			case "xlinkActuate":
				Ht(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Ht(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Ht(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Ht(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Ht(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Ht(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Ht(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Ht(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Ht(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Bt(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = cn.get(n) || n, Bt(e, n, r);
			else return;
		}
		Rt = !0;
	}
	function tp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				on(e, r, o);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "children":
				if (typeof r == "string") nn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") nn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && Bf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Bf("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = dn);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!jt.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[ht] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					Rt = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Bt(e, n, r);
				}
				return;
		}
		Rt = !0;
	}
	function np(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Bf("error", e), Bf("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: ep(e, t, o, s, n, null);
					}
				}
				a && ep(e, t, "srcSet", n.srcSet, n, null), r && ep(e, t, "src", n.src, n, null);
				return;
			case "input":
				Bf("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: ep(e, t, r, d, n, null);
					}
				}
				Zt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Bf("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: ep(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && $t(e, !!r, n, !0) : $t(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Bf("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: ep(e, t, s, c, n, null);
				}
				tn(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: ep(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Bf("beforetoggle", e), Bf("toggle", e), Bf("cancel", e), Bf("close", e);
				break;
			case "iframe":
			case "object":
				Bf("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Lf.length; r++) Bf(Lf[r], e);
				break;
			case "image":
				Bf("error", e), Bf("load", e);
				break;
			case "details":
				Bf("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Bf("error", e), Bf("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: ep(e, t, u, r, n, null);
				}
				return;
			default: if (sn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && tp(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && ep(e, t, c, r, n, null));
	}
	var rp = {};
	function ip(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || ep(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (Rt = !0), o = m;
							break;
						case "name":
							m !== f && (Rt = !0), a = m;
							break;
						case "checked":
							m !== f && (Rt = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (Rt = !0), d = m;
							break;
						case "value":
							m !== f && (Rt = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (Rt = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && ep(e, t, p, m, r, f);
					}
				}
				Xt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || ep(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (Rt = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (Rt = !0), c = o;
						break;
					case "multiple": o !== l && (Rt = !0), s = o;
					default: o !== l && ep(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? $t(e, !!n, n ? [] : "", !1) : $t(e, !!n, t, !0)) : $t(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: ep(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (Rt = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (Rt = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && ep(e, t, s, a, r, o);
				}
				en(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: ep(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (Rt = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: ep(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && ep(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: ep(e, t, u, p, r, m);
				}
				return;
			default: if (sn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && tp(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || tp(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && ep(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || ep(e, t, f, p, r, m);
	}
	function ap(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function op() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && ap(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && ap(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var sp = null, cp = null;
	function lp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function up(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function dp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function fp(e, t, n, r) {
		return n = lp(n).createElement(e), n[mt] = r, n[ht] = t, np(n, e, t), Ot(n), n;
	}
	function pp(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var mp = null;
	function hp() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== mp && (mp = e, !0) : (mp = null, !1);
	}
	var gp = typeof setTimeout == "function" ? setTimeout : void 0, _p = typeof clearTimeout == "function" ? clearTimeout : void 0, vp = typeof Promise == "function" ? Promise : void 0, yp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : gp, bp = typeof queueMicrotask == "function" ? queueMicrotask : vp === void 0 ? gp : function(e) {
		return vp.resolve(null).then(e).catch(xp);
	};
	function xp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Sp(e) {
		return e === "head";
	}
	function Cp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Hh(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") _m(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, _m(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[xt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && _m(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Hh(t);
	}
	function wp(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function Tp(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Ep(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function Dp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function Op(e) {
		return Dp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function kp(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return Dp(t, n, e);
	}
	function Ap(e) {
		return e.documentElement.clientHeight;
	}
	function jp(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Mp(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Ap(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += Xm(f), u > $m) {
									s.length = o;
									break;
								}
								f = new Promise(jp.bind(f)), s.push(f);
							}
						}
					}
					if (0 < s.length) return t = Promise.race([Promise.all(s), new Promise(function(e) {
						return setTimeout(e, 500);
					})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
					if (i(), n) return n.finished.then(a, a);
					a();
				},
				types: n
			});
			l.__reactViewTransition = u;
			var d = [];
			return u.ready.then(function() {
				for (var e = l.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
					var n = e[t], r = n.effect, i = r.pseudoElement;
					if (i != null && i.startsWith("::view-transition")) {
						d.push(n), n = r.getKeyframes();
						for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
							var u = n[c], f = u.width;
							if (i === void 0) i = f;
							else if (i !== f) {
								s = !1;
								break;
							}
							if (f = u.height, a === void 0) a = f;
							else if (a !== f) {
								s = !1;
								break;
							}
							delete u.width, delete u.height, u.transform === "none" && delete u.transform;
						}
						s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
					}
				}
				o();
			}, function(e) {
				l.__reactViewTransition === u && (l.__reactViewTransition = null);
				try {
					if (typeof e == "object" && e) switch (e.name) {
						case "InvalidStateError": (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") && (e = null);
					}
					e !== null && c(e);
				} finally {
					r(), i(), o();
				}
			}), u.finished.finally(function() {
				for (var e = 0; e < d.length; e++) d[e].cancel();
				l.__reactViewTransition === u && (l.__reactViewTransition = null), s();
			}), u;
		} catch {
			return r(), i(), o(), null;
		}
	}
	function Np(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Np.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : D({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Np.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Np.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Pp(e) {
		return {
			name: e,
			group: new Np("group", e),
			imagePair: new Np("image-pair", e),
			old: new Np("old", e),
			new: new Np("new", e)
		};
	}
	function Fp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Fp.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (Bp(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = Rp(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), h(this._fragmentFiber.child, !1, Ip, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Ip(e, t, n, r) {
		return b(e).addEventListener(t, n, r), !1;
	}
	Fp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Bp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Rp(i.optionsOrUseCapture), h(this._fragmentFiber.child, !1, Lp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Lp(e, t, n, r) {
		return b(e).removeEventListener(t, n, r), !1;
	}
	function Rp(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function zp(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function Bp(e, t, n, r) {
		if (e.length === 0) return -1;
		r = zp(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && zp(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Fp.prototype.dispatchEvent = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return !0;
		t = b(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Fp.prototype.focus = function(e) {
		h(this._fragmentFiber.child, !0, Vp, e, void 0, void 0);
	};
	function Vp(e, t) {
		return e.tag !== 6 && (e = b(e), pm(e, t));
	}
	Fp.prototype.focusLast = function(e) {
		var t = [];
		h(this._fragmentFiber.child, !0, Hp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Vp(t[n], e); n--);
	};
	function Hp(e, t) {
		return t.push(e), !1;
	}
	Fp.prototype.blur = function() {
		var e = g(this._fragmentFiber);
		e !== null && (e = b(e), e = lp(e).activeElement, e !== null && h(this._fragmentFiber.child, !1, Up, e, void 0, void 0));
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = b(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Fp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), h(this._fragmentFiber.child, !1, Wp, e, void 0, void 0);
	};
	function Wp(e, t) {
		return e.tag === 6 || (e = b(e), t.observe(e)), !1;
	}
	Fp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), h(this._fragmentFiber.child, !1, Gp, e, void 0, void 0);
			for (var n = t = 0; n < Kp.length; n++) {
				var r = Kp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : Kp[t++] = r;
			}
			Kp.length = t;
		}
	};
	function Gp(e, t) {
		return e.tag === 6 || (e = b(e), t.unobserve(e)), !1;
	}
	var Kp = [], qp = !1;
	function Jp(e, t, n) {
		Kp.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), qp || (qp = !0, mm(function() {
			qp = !1;
			var e = Kp;
			Kp = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Fp.prototype.getClientRects = function() {
		var e = [];
		return h(this._fragmentFiber.child, !1, Yp, e, void 0, void 0), e;
	};
	function Yp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = b(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Fp.prototype.getRootNode = function(e) {
		var t = g(this._fragmentFiber);
		return t === null ? this : b(t).getRootNode(e);
	}, Fp.prototype.compareDocumentPosition = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		h(this._fragmentFiber.child, !1, Hp, n, void 0, void 0);
		var r = b(t);
		if (n.length === 0) {
			if (n = r, _(this._fragmentFiber)) {
				a: {
					for (t = this._fragmentFiber.return; t !== null;) {
						if (t.tag === 4) {
							t = t.stateNode.containerInfo;
							break a;
						}
						if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
						t = t.return;
					}
					t = null;
				}
				t != null && (n = t);
			}
			t = this._fragmentFiber;
			var i = r = n.compareDocumentPosition(e);
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = v(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = b(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = b(n[0]), i = b(n[n.length - 1]);
		var a = _(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Xp(e, t, n, r, i) {
		var a = wt(i);
		if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
			if (n = !!a) a: {
				for (; a !== null;) {
					if (a.tag === 7 && (a === t || a.alternate === t)) {
						n = !0;
						break a;
					}
					a = a.return;
				}
				n = !1;
			}
			return n;
		}
		if (e & Node.DOCUMENT_POSITION_CONTAINS) {
			if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
			a: {
				for (a = t, t = g(t); a !== null;) {
					if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
						a = !0;
						break a;
					}
					a = a.return;
				}
				a = !1;
			}
			return a;
		}
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = E(n, a, T), t === null ? t = !1 : (h(t, !0, C, a, n), a = x, x = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = E(r, a, T), t === null ? t = !1 : (h(t, !0, w, a, r), a = x, S = x = null, t = a !== null)), t) : !1;
	}
	function Zp(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Fp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		h(this._fragmentFiber.child, !1, Hp, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = v(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || g(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = b(r), Zp(e, n);
				return;
			}
			if (r = b(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = b(a), Zp(a, n)) : b(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function Qp(e, t) {
		return e = b(e), $p(e, t), !1;
	}
	function $p(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function em(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < Kp.length; i++) {
				var a = Kp[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (Kp[r++] = a);
			}
			Kp.length = r, n.observe(e);
		}), $p(e, t));
	}
	function tm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? Jp(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function nm(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					nm(n), Ct(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function rm(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[xt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = lm(e.nextSibling), e === null) break;
		}
		return null;
	}
	function im(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function am(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function om(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function sm(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function cm(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function lm(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var um = null;
	function dm(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return lm(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function fm(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function pm(e, t) {
		function n() {
			r = !0;
		}
		if (e.ownerDocument.activeElement === e) return !0;
		var r = !1;
		try {
			e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
		} finally {
			e.ownerDocument.removeEventListener("focus", n, !0);
		}
		return r;
	}
	function mm(e) {
		yp(function() {
			yp(function(t) {
				return e(t);
			});
		});
	}
	function hm(e, t, n) {
		switch (t = lp(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function gm(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && ep(e, t, r, null, rp, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === dn && (e.onclick = null), Ct(e);
	}
	function _m(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		Ct(e);
	}
	var vm = /* @__PURE__ */ new Map(), ym = /* @__PURE__ */ new Set();
	function bm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var xm = W.d;
	W.d = {
		f: Sm,
		r: Cm,
		D: Em,
		C: Dm,
		L: Om,
		m: km,
		X: jm,
		S: Am,
		M: Mm
	};
	function Sm() {
		var e = xm.f(), t = zd();
		return e || t;
	}
	function Cm(e) {
		var t = Tt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Ys(t) : xm.r(e);
	}
	var wm = typeof document > "u" ? null : document;
	function Tm(e, t, n) {
		var r = wm;
		if (r && typeof t == "string" && t) {
			var i = Yt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), ym.has(i) || (ym.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), np(t, "link", e), Ot(t), r.head.appendChild(t)));
		}
	}
	function Em(e) {
		xm.D(e), Tm("dns-prefetch", e, null);
	}
	function Dm(e, t) {
		xm.C(e, t), Tm("preconnect", e, t);
	}
	function Om(e, t, n) {
		xm.L(e, t, n);
		var r = wm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Yt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Yt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Yt(n.imageSizes) + "\"]")) : i += "[href=\"" + Yt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Pm(e);
					break;
				case "script": a = Rm(e);
			}
			if (!(vm.has(a) || (e = D({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), vm.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Fm(a)) || t === "script" && r.querySelector(zm(a))))) {
				var o = r.createElement("link");
				np(o, "link", e), t === "style" && (o[St] = !0, o.onload = o.onerror = function() {
					kt(o);
				}), Ot(o), r.head.appendChild(o);
			}
		}
	}
	function km(e, t) {
		xm.m(e, t);
		var n = wm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Yt(r) + "\"][href=\"" + Yt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Rm(e);
			}
			if (!vm.has(a) && (e = D({
				rel: "modulepreload",
				href: e
			}, t), vm.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(zm(a))) return;
				}
				r = n.createElement("link"), np(r, "link", e), Ot(r), n.head.appendChild(r);
			}
		}
	}
	function Am(e, t, n) {
		xm.S(e, t, n);
		var r = wm;
		if (r && e) {
			var i = Dt(r).hoistableStyles, a = Pm(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Fm(a))) s.loading = 5;
				else {
					e = D({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = vm.get(a)) && Hm(e, n);
					var c = o = r.createElement("link");
					Ot(c), np(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Vm(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function jm(e, t) {
		xm.X(e, t);
		var n = wm;
		if (n && e) {
			var r = Dt(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = D({
				src: e,
				async: !0
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), Ot(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Mm(e, t) {
		xm.M(e, t);
		var n = wm;
		if (n && e) {
			var r = Dt(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = D({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), Ot(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nm(e, t, n, r) {
		var a = (a = me.current) ? bm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Pm(n.href), t = Dt(a).hoistableStyles, r = t.get(n), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Pm(n.href);
					var o = Dt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Fm(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = vm.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, vm.set(e, o)), Lm(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Rm(n), t = Dt(a).hoistableScripts, r = t.get(n), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Pm(e) {
		return "href=\"" + Yt(e) + "\"";
	}
	function Fm(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Im(e) {
		return D({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Lm(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[St]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[St] = !0, t.onload = t.onerror = kt.bind(null, t), np(t, "link", n), Ot(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function Rm(e) {
		return "[src=\"" + Yt(e) + "\"]";
	}
	function zm(e) {
		return "script[async]" + e;
	}
	function Bm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Yt(n.href) + "\"]");
				if (r) return t.instance = r, Ot(r), r;
				var a = D({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Ot(r), np(r, "style", a), Vm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Pm(n.href);
				var o = e.querySelector(Fm(a));
				if (o) return t.state.loading |= 4, t.instance = o, Ot(o), o;
				r = Im(n), (a = vm.get(a)) && Hm(r, a), o = (e.ownerDocument || e).createElement("link"), Ot(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), np(o, "link", r), t.state.loading |= 4, Vm(o, n.precedence, e), t.instance = o;
			case "script": return o = Rm(n.src), (a = e.querySelector(zm(o))) ? (t.instance = a, Ot(a), a) : (r = n, (a = vm.get(o)) && (r = D({}, n), Um(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Ot(a), np(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Vm(r, n.precedence, e));
		return t.instance;
	}
	function Vm(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Hm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Um(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Wm = null;
	function Gm(e, t, n) {
		if (Wm === null) {
			var r = /* @__PURE__ */ new Map(), i = Wm = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Wm, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[xt] || a[mt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Km(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function qm(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Jm(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function Ym(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Xm(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function Zm(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Xm(t), e.suspenseyImages.push(t)), e = rh.bind(e), t.decode().then(e, e));
	}
	function Qm(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Pm(r.href), a = t.querySelector(Fm(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = nh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Ot(a);
					return;
				}
				a = t.ownerDocument || t, r = Im(r), (i = vm.get(i)) && Hm(r, i), a = a.createElement("link"), Ot(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), np(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = nh.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var $m = 0;
	function eh(e, t) {
		return e.stylesheets && e.count === 0 && ah(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && ah(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && $m === 0 && ($m = 62500 * op());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ah(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > $m ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function th(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) ah(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function nh() {
		this.count--, th(this);
	}
	function rh() {
		this.imgCount--, th(this);
	}
	var ih = null;
	function ah(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ih = /* @__PURE__ */ new Map(), t.forEach(oh, e), ih = null, nh.call(e));
	}
	function oh(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ih.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ih.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = nh.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var sh = {
		$$typeof: F,
		Provider: null,
		Consumer: null,
		_currentValue: ce,
		_currentValue2: ce,
		_threadCount: 0
	};
	function ch(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = rt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = rt(0), this.hiddenUpdates = rt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function lh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ch(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = xi(3, null, null, t), e.current = a, a.stateNode = e, t = Sa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, io(a), e;
	}
	function uh(e) {
		return e ? (e = yi, e) : yi;
	}
	function dh(e, t, n, r, i, a) {
		i = uh(i), r.context === null ? r.context = i : r.pendingContext = i, r = oo(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = so(e, r, t), n !== null && (Pd(n, e, t), co(n, e, t));
	}
	function fh(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ph(e, t) {
		fh(e, t), (e = e.alternate) && fh(e, t);
	}
	function mh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = gi(e, 67108864);
			t !== null && Pd(t, e, 67108864), ph(e, 67108864);
		}
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = jd();
			t = lt(t);
			var n = gi(e, t);
			n !== null && Pd(n, e, t), ph(e, t);
		}
	}
	var gh = !0;
	function _h(e, t, n, r) {
		var i = U.T;
		U.T = null;
		var a = W.p;
		try {
			W.p = 2, yh(e, t, n, r);
		} finally {
			W.p = a, U.T = i;
		}
	}
	function vh(e, t, n, r) {
		var i = U.T;
		U.T = null;
		var a = W.p;
		try {
			W.p = 8, yh(e, t, n, r);
		} finally {
			W.p = a, U.T = i;
		}
	}
	function yh(e, t, n, r) {
		if (gh) {
			var i = bh(r);
			if (i === null) Gf(e, t, r, xh, n), Mh(e, r);
			else if (Ph(i, e, t, n, r)) r.stopPropagation();
			else if (Mh(e, r), t & 4 && -1 < jh.indexOf(e)) {
				for (; i !== null;) {
					var a = Tt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ze(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - We(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									wf(a), !(Yu & 6) && (gd = Me() + 500, Tf(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = gi(a, 2), s !== null && Pd(s, a, 2), zd(), ph(a, 2);
					}
					if (a = bh(r), a === null && Gf(e, t, r, xh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Gf(e, t, r, null, n);
		}
	}
	function bh(e) {
		return e = pn(e), Sh(e);
	}
	var xh = null;
	function Sh(e) {
		if (xh = null, e = wt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return xh = e, null;
	}
	function Ch(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "fullscreenerror":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "resize":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Ne()) {
				case Pe: return 2;
				case Fe: return 8;
				case Ie:
				case Le: return 32;
				case Re: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var wh = !1, Th = null, Eh = null, Dh = null, Oh = /* @__PURE__ */ new Map(), kh = /* @__PURE__ */ new Map(), Ah = [], jh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Mh(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Th = null;
				break;
			case "dragenter":
			case "dragleave":
				Eh = null;
				break;
			case "mouseover":
			case "mouseout":
				Dh = null;
				break;
			case "pointerover":
			case "pointerout":
				Oh.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": kh.delete(t.pointerId);
		}
	}
	function Nh(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Tt(t), t !== null && mh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ph(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Th = Nh(Th, e, t, n, r, i), !0;
			case "dragenter": return Eh = Nh(Eh, e, t, n, r, i), !0;
			case "mouseover": return Dh = Nh(Dh, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Oh.set(a, Nh(Oh.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, kh.set(a, Nh(kh.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Fh(e) {
		var t = wt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ft(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ft(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Ih(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = bh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				fn = r, n.target.dispatchEvent(r), fn = null;
			} else return t = Tt(n), t !== null && mh(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Lh(e, t, n) {
		Ih(e) && n.delete(t);
	}
	function Rh() {
		wh = !1, Th !== null && Ih(Th) && (Th = null), Eh !== null && Ih(Eh) && (Eh = null), Dh !== null && Ih(Dh) && (Dh = null), Oh.forEach(Lh), kh.forEach(Lh);
	}
	function zh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, wh || (wh = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Rh)));
	}
	var Bh = null;
	function Vh(e) {
		Bh !== e && (Bh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Bh === e && (Bh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Sh(r || n) === null) continue;
					break;
				}
				var a = Tt(n);
				a !== null && (e.splice(t, 3), t -= 3, qs(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Hh(e) {
		function t(t) {
			return zh(t, e);
		}
		Th !== null && zh(Th, e), Eh !== null && zh(Eh, e), Dh !== null && zh(Dh, e), Oh.forEach(t), kh.forEach(t);
		for (var n = 0; n < Ah.length; n++) {
			var r = Ah[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Ah.length && (n = Ah[0], n.blockedOn === null);) Fh(n), n.blockedOn === null && Ah.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[ht] || null;
			if (typeof a == "function") o || Vh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[ht] || null) s = o.formAction;
					else if (Sh(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Vh(n);
			}
		}
	}
	function Uh() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Wh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.render = Wh.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		dh(n, jd(), e, t, null, null);
	}, Gh.prototype.unmount = Wh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			dh(e.current, 2, null, e, null, null), zd(), t[gt] = null;
		}
	};
	function Gh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = dt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Ah.length && t !== 0 && t < Ah[n].priority; n++);
			Ah.splice(n, 0, e), n === 0 && Fh(e);
		}
	};
	var Kh = n.version;
	if (Kh !== "19.3.1") throw Error(i(527, Kh, "19.3.1"));
	W.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var qh = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: U,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Jh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Jh.isDisabled && Jh.supportsFiber) try {
			Ve = Jh.inject(qh), He = Jh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = gc, s = _c, c = vc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = lh(e, 1, !1, null, null, n, r, null, o, s, c, Uh), e[gt] = t.current, Uf(e), new Wh(t);
	};
})), g = (/* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})))(), _ = /* @__PURE__ */ c(f(), 1), v = /* @__PURE__ */ c(m(), 1);
function y(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var b = (e) => {
	switch (e) {
		case "success": return C;
		case "info": return T;
		case "warning": return w;
		case "error": return E;
		default: return null;
	}
}, x = Array(12).fill(0), S = ({ visible: e, className: t }) => /*#__PURE__*/ _.createElement("div", {
	className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
	"data-visible": e
}, /*#__PURE__*/ _.createElement("div", { className: "sonner-spinner" }, x.map((e, t) => /*#__PURE__*/ _.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${t}`
})))), C = /*#__PURE__*/ _.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ _.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), w = /*#__PURE__*/ _.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ _.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), T = /*#__PURE__*/ _.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ _.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), E = /*#__PURE__*/ _.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ _.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), D = /*#__PURE__*/ _.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "12",
	height: "12",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.5",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true"
}, /*#__PURE__*/ _.createElement("line", {
	x1: "18",
	y1: "6",
	x2: "6",
	y2: "18"
}), /*#__PURE__*/ _.createElement("line", {
	x1: "6",
	y1: "6",
	x2: "18",
	y2: "18"
})), O = () => {
	let [e, t] = _.useState(document.hidden);
	return _.useEffect(() => {
		let e = () => {
			t(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []), e;
}, k = 1, A = 100, j = (e) => typeof e?.id == "number" || e?.id?.length > 0 ? e.id : k++, M = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), this.getActiveToasts().forEach((t) => e(t)), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e], this.trimHistory();
		}, this.trimHistory = () => {
			let e = this.toasts.length - A;
			e <= 0 || (this.toasts = this.toasts.filter((t) => e > 0 && this.dismissedToasts.has(t.id) ? (this.dismissedToasts.delete(t.id), e--, !1) : !0));
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = j(e), i = this.pendingDismissals.get(r);
			i !== void 0 && (cancelAnimationFrame(i), this.pendingDismissals.delete(r), this.dismissedToasts.delete(r));
			let a = this.dismissedToasts.has(r), o = e.dismissible === void 0 || e.dismissible;
			return a && (this.dismissedToasts.delete(r), this.toasts = this.toasts.filter((e) => e.id !== r)), !a && this.toasts.find((e) => e.id === r) ? this.toasts = this.toasts.map((n) => n.id === r ? (this.publish({
				...n,
				...e,
				id: r,
				title: t
			}), {
				...n,
				...e,
				id: r,
				dismissible: o,
				title: t
			}) : n) : this.addToast({
				title: t,
				...n,
				dismissible: o,
				id: r
			}), r;
		}, this.dismiss = (e) => {
			if (e == null) return this.getActiveToasts().forEach((e) => {
				this.dismissedToasts.add(e.id), this.subscribers.forEach((t) => t({
					id: e.id,
					dismiss: !0
				}));
			}), e;
			this.dismissedToasts.add(e);
			let t = this.pendingDismissals.get(e);
			return t !== void 0 && cancelAnimationFrame(t), this.pendingDismissals.set(e, requestAnimationFrame(() => {
				this.pendingDismissals.delete(e), this.subscribers.forEach((t) => t({
					id: e,
					dismiss: !0
				}));
			})), e;
		}, this.message = (e, t) => this.create({
			...t,
			message: e,
			type: void 0
		}), this.error = (e, t) => this.create({
			...t,
			message: e,
			type: "error"
		}), this.success = (e, t) => this.create({
			...t,
			type: "success",
			message: e
		}), this.info = (e, t) => this.create({
			...t,
			type: "info",
			message: e
		}), this.warning = (e, t) => this.create({
			...t,
			type: "warning",
			message: e
		}), this.loading = (e, t) => this.create({
			...t,
			type: "loading",
			message: e
		}), this.promise = (e, t) => {
			if (!t) return;
			let n;
			t.loading !== void 0 && (n = this.create({
				...t,
				promise: e,
				type: "loading",
				message: t.loading,
				description: typeof t.description == "function" ? void 0 : t.description
			}));
			let r = Promise.resolve(e instanceof Function ? e() : e), i = n !== void 0, a, o = r.then(async (e) => {
				if (a = ["resolve", e], _.isValidElement(e)) i = !1, this.create({
					id: n,
					type: "default",
					message: e
				});
				else if (P(e) && !e.ok) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(`HTTP error! status: ${e.status}`) : t.error, a = typeof t.description == "function" ? await t.description(`HTTP error! status: ${e.status}`) : t.description, o = typeof r == "object" && !_.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (e instanceof Error) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !_.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (t.success !== void 0) {
					i = !1;
					let r = typeof t.success == "function" ? await t.success(e) : t.success, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !_.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "success",
						description: a,
						...o
					});
				}
			}).catch(async (e) => {
				if (a = ["reject", e], t.error !== void 0) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !_.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				}
			}).finally(() => {
				i && (this.dismiss(n), n = void 0), t.finally == null || t.finally.call(t);
			}), s = () => new Promise((e, t) => o.then(() => a[0] === "reject" ? t(a[1]) : e(a[1])).catch(t));
			return typeof n != "string" && typeof n != "number" ? { unwrap: s } : Object.assign(n, { unwrap: s });
		}, this.custom = (e, t) => {
			let n = j(t);
			return this.create({
				...t,
				jsx: e(n),
				id: n,
				type: void 0
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set(), this.pendingDismissals = /* @__PURE__ */ new Map();
	}
}(), N = (e, t) => M.message(e, t), P = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", F = Object.assign(N, {
	success: M.success,
	info: M.info,
	warning: M.warning,
	error: M.error,
	custom: M.custom,
	message: M.message,
	promise: M.promise,
	dismiss: M.dismiss,
	loading: M.loading
}, {
	getHistory: () => M.toasts,
	getToasts: () => M.getActiveToasts()
});
y("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--normal-text);background:var(--normal-bg);border:1px solid var(--normal-border);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{-webkit-user-select:none;user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function I(e) {
	return e.label !== void 0;
}
var L = 3, R = "24px", z = "16px", B = 4e3, V = 356, ee = 14, H = 45, te = 200;
function ne(...e) {
	return e.filter(Boolean).join(" ");
}
function re(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var ie = (e) => {
	let { invert: t, toast: n, unstyled: r, interacting: i, setHeights: a, visibleToasts: o, heights: s, index: c, toasts: l, expanded: u, removeToast: d, defaultRichColors: f, closeButton: p, style: m, cancelButtonStyle: h, actionButtonStyle: g, className: v = "", descriptionClassName: y = "", duration: x, position: C, gap: w, expandByDefault: T, classNames: E, icons: k, closeButtonAriaLabel: A = "Close toast" } = e, [j, M] = _.useState(null), [N, P] = _.useState(null), [F, L] = _.useState(!1), [R, z] = _.useState(!1), [V, ee] = _.useState(!1), [ie, ae] = _.useState(!1), [oe, se] = _.useState(!1), [U, W] = _.useState(0), [ce, le] = _.useState(0), ue = _.useRef(n.duration || x || B), de = _.useRef(null), fe = _.useRef(null), G = c === 0, pe = c + 1 <= o, K = n.type, me = K ?? "default", he = n.dismissible !== !1, ge = n.className || "", _e = n.descriptionClassName || "", ve = _.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]), ye = _.useMemo(() => n.closeButton ?? p, [n.closeButton, p]), be = _.useMemo(() => n.duration || x || B, [n.duration, x]), xe = _.useRef(0), Se = _.useRef(0), Ce = _.useRef(0), we = _.useRef(null), [Te, Ee] = C.split("-"), De = _.useMemo(() => s.reduce((e, t, n) => n >= ve ? e : e + t.height, 0), [s, ve]), Oe = O(), ke = _.useMemo(() => e.swipeDirections ?? re(C), [e.swipeDirections, C]), Ae = n.invert || t, je = K === "loading";
	Se.current = _.useMemo(() => ve * w + De, [ve, De]), _.useEffect(() => {
		ue.current = be;
	}, [be]), _.useEffect(() => {
		L(!0);
	}, []), _.useEffect(() => {
		let e = fe.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return le(t), a((e) => [{
				toastId: n.id,
				height: t,
				position: n.position
			}, ...e]), () => a((e) => e.filter((e) => e.toastId !== n.id));
		}
	}, [a, n.id]), _.useLayoutEffect(() => {
		if (!F) return;
		let e = fe.current, t = e.style.height;
		e.style.height = "auto";
		let r = e.getBoundingClientRect().height;
		e.style.height = t, le(r), a((e) => e.find((e) => e.toastId === n.id) ? e.map((e) => e.toastId === n.id ? {
			...e,
			height: r
		} : e) : [{
			toastId: n.id,
			height: r,
			position: n.position
		}, ...e]);
	}, [
		F,
		n.title,
		n.description,
		a,
		n.id,
		n.jsx,
		n.action,
		n.cancel
	]);
	let Me = _.useCallback(() => {
		z(!0), W(Se.current), a((e) => e.filter((e) => e.toastId !== n.id)), setTimeout(() => {
			d(n);
		}, te);
	}, [
		n,
		d,
		a,
		Se
	]);
	_.useEffect(() => {
		if (n.promise && K === "loading" || n.duration === Infinity || n.type === "loading") return;
		let e;
		return u || i || Oe ? (() => {
			if (Ce.current < xe.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - xe.current;
				ue.current -= e;
			}
			Ce.current = (/* @__PURE__ */ new Date()).getTime();
		})() : ue.current !== Infinity && (xe.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			n.onAutoClose == null || n.onAutoClose.call(n, n), Me();
		}, ue.current)), () => clearTimeout(e);
	}, [
		u,
		i,
		n,
		K,
		Oe,
		Me
	]), _.useEffect(() => {
		n.delete && (Me(), n.onDismiss == null || n.onDismiss.call(n, n));
	}, [Me, n.delete]);
	function Ne() {
		return k?.loading ? /*#__PURE__*/ _.createElement("div", {
			className: ne(E?.loader, n?.classNames?.loader, "sonner-loader"),
			"data-visible": K === "loading"
		}, k.loading) : /*#__PURE__*/ _.createElement(S, {
			className: ne(E?.loader, n?.classNames?.loader),
			visible: K === "loading"
		});
	}
	let Pe = n.icon || k?.[K] || b(K);
	return /*#__PURE__*/ _.createElement("li", {
		tabIndex: 0,
		ref: fe,
		className: ne(v, ge, E?.toast, n?.classNames?.toast, E?.[me], n?.classNames?.[me]),
		"data-sonner-toast": "",
		"data-rich-colors": n.richColors ?? f,
		"data-styled": !(n.jsx || n.unstyled || r),
		"data-mounted": F,
		"data-promise": !!n.promise,
		"data-swiped": oe,
		"data-removed": R,
		"data-visible": pe,
		"data-y-position": Te,
		"data-x-position": Ee,
		"data-index": c,
		"data-front": G,
		"data-swiping": V,
		"data-dismissible": he,
		"data-type": K,
		"data-invert": Ae,
		"data-swipe-out": ie,
		"data-swipe-direction": N,
		"data-expanded": !!(u || T && F),
		"data-testid": n.testId,
		style: {
			"--index": c,
			"--toasts-before": c,
			"--z-index": l.length - c,
			"--offset": `${R ? U : Se.current}px`,
			"--initial-height": T ? "auto" : `${ce}px`,
			...m,
			...n.style
		},
		onDragEnd: () => {
			ee(!1), M(null), we.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && !je && he && (de.current = /* @__PURE__ */ new Date(), W(Se.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (ee(!0), we.current = {
				x: e.clientX,
				y: e.clientY
			}));
		},
		onPointerUp: () => {
			if (ie || !he) return;
			we.current = null;
			let e = Number(fe.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(fe.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), r = (/* @__PURE__ */ new Date()).getTime() - de.current?.getTime(), i = j === "x" ? e : t, a = Math.abs(i) / r;
			if ((j === "x" ? ke.includes(e > 0 ? "right" : "left") : ke.includes(t > 0 ? "bottom" : "top")) && (Math.abs(i) >= H || a > .11)) W(Se.current), n.onDismiss == null || n.onDismiss.call(n, n), P(j === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), Me(), ae(!0);
			else {
				var o, s;
				(o = fe.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = fe.current) == null || s.style.setProperty("--swipe-amount-y", "0px"), se(!1), ee(!1), M(null);
			}
		},
		onPointerMove: (e) => {
			var t, n;
			if (!we.current || !he || window.getSelection()?.toString().length > 0) return;
			let r = e.clientY - we.current.y, i = e.clientX - we.current.x;
			!j && (Math.abs(i) > 1 || Math.abs(r) > 1) && M(Math.abs(i) > Math.abs(r) ? "x" : "y");
			let a = {
				x: 0,
				y: 0
			}, o = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (j === "y") {
				if (ke.includes("top") || ke.includes("bottom")) {
					if (ke.includes("top") && r < 0 || ke.includes("bottom") && r > 0) a.y = r;
					else {
						let e = r * o(r);
						a.y = Math.abs(e) < Math.abs(r) ? e : r;
					}
				}
			} else if (j === "x" && (ke.includes("left") || ke.includes("right"))) {
				if (ke.includes("left") && i < 0 || ke.includes("right") && i > 0) a.x = i;
				else {
					let e = i * o(i);
					a.x = Math.abs(e) < Math.abs(i) ? e : i;
				}
			}
			(Math.abs(a.x) > 0 || Math.abs(a.y) > 0) && se(!0), (t = fe.current) == null || t.style.setProperty("--swipe-amount-x", `${a.x}px`), (n = fe.current) == null || n.style.setProperty("--swipe-amount-y", `${a.y}px`);
		}
	}, ye && !n.jsx && K !== "loading" ? /*#__PURE__*/ _.createElement("button", {
		"aria-label": A,
		"data-disabled": je,
		"data-close-button": !0,
		onClick: je || !he ? () => {} : () => {
			Me(), n.onDismiss == null || n.onDismiss.call(n, n);
		},
		className: ne(E?.closeButton, n?.classNames?.closeButton)
	}, k?.close ?? D) : null, (K || n.icon || n.promise) && n.icon !== null && (k?.[K] !== null || n.icon) ? /*#__PURE__*/ _.createElement("div", {
		"data-icon": "",
		className: ne(E?.icon, n?.classNames?.icon)
	}, K === "loading" ? n.icon || Ne() : n.promise ? Ne() : null, K === "loading" ? null : Pe) : null, /*#__PURE__*/ _.createElement("div", {
		"data-content": "",
		className: ne(E?.content, n?.classNames?.content)
	}, /*#__PURE__*/ _.createElement("div", {
		"data-title": "",
		className: ne(E?.title, n?.classNames?.title)
	}, n.jsx ? n.jsx : typeof n.title == "function" ? n.title() : n.title), n.description ? /*#__PURE__*/ _.createElement("div", {
		"data-description": "",
		className: ne(y, _e, E?.description, n?.classNames?.description)
	}, typeof n.description == "function" ? n.description() : n.description) : null), /*#__PURE__*/ _.isValidElement(n.cancel) ? n.cancel : n.cancel && I(n.cancel) ? /*#__PURE__*/ _.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: n.cancelButtonStyle || h,
		onClick: (e) => {
			I(n.cancel) && he && (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), Me());
		},
		className: ne(E?.cancelButton, n?.classNames?.cancelButton)
	}, n.cancel.label) : null, /*#__PURE__*/ _.isValidElement(n.action) ? n.action : n.action && I(n.action) ? /*#__PURE__*/ _.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: n.actionButtonStyle || g,
		onClick: (e) => {
			I(n.action) && (n.action.onClick == null || n.action.onClick.call(n.action, e), e.defaultPrevented || Me());
		},
		className: ne(E?.actionButton, n?.classNames?.actionButton)
	}, n.action.label) : null);
};
function ae() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function oe(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? z : R;
		function o(e) {
			[
				"top",
				"right",
				"bottom",
				"left"
			].forEach((t) => {
				n[`${i}-${t}`] = typeof e == "number" ? `${e}px` : e;
			});
		}
		typeof e == "number" || typeof e == "string" ? o(e) : typeof e == "object" ? [
			"top",
			"right",
			"bottom",
			"left"
		].forEach((t) => {
			e[t] === void 0 ? n[`${i}-${t}`] = a : n[`${i}-${t}`] = typeof e[t] == "number" ? `${e[t]}px` : e[t];
		}) : o(a);
	}), n;
}
var se = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { id: n, invert: r, position: i = "bottom-right", hotkey: a = ["altKey", "KeyT"], expand: o, closeButton: s, className: c, offset: l, mobileOffset: u, theme: d = "light", richColors: f, duration: p, style: m, visibleToasts: h = L, toastOptions: g, dir: y = ae(), gap: b = ee, icons: x, customAriaLabel: S, containerAriaLabel: C = "Notifications" } = e, [w, T] = _.useState([]), E = _.useMemo(() => n ? w.filter((e) => e.toasterId === n) : w.filter((e) => !e.toasterId), [w, n]), D = _.useMemo(() => Array.from(new Set([i].concat(E.filter((e) => e.position).map((e) => e.position)))), [E, i]), [O, k] = _.useState([]), [A, j] = _.useState(!1), [N, P] = _.useState(!1), [F, I] = _.useState(d === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : d), R = _.useRef(null), z = a.join("+").replace(/Key/g, "").replace(/Digit/g, ""), B = _.useRef(null), H = _.useRef(!1), te = _.useCallback((e) => {
		T((t) => (t.find((t) => t.id === e.id)?.delete || M.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return _.useEffect(() => M.subscribe((e) => {
		e.dismiss ? requestAnimationFrame(() => {
			T((t) => t.map((t) => t.id === e.id ? {
				...t,
				delete: !0
			} : t));
		}) : setTimeout(() => {
			v.flushSync(() => {
				T((t) => {
					let n = t.findIndex((t) => t.id === e.id);
					return n === -1 ? [e, ...t] : [
						...t.slice(0, n),
						{
							...t[n],
							...e
						},
						...t.slice(n + 1)
					];
				});
			});
		});
	}), []), _.useEffect(() => {
		if (d !== "system") {
			I(d);
			return;
		}
		if (d === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? I("dark") : I("light")), typeof window > "u") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)");
		try {
			e.addEventListener("change", ({ matches: e }) => {
				I(e ? "dark" : "light");
			});
		} catch {
			e.addListener(({ matches: e }) => {
				try {
					I(e ? "dark" : "light");
				} catch (e) {
					console.error(e);
				}
			});
		}
	}, [d]), _.useEffect(() => {
		w.length <= 1 && j(!1);
	}, [w]), _.useEffect(() => {
		let e = (e) => {
			if (a.length > 0 && a.every((t) => e[t] || e.code === t)) {
				var t;
				j(!0), (t = R.current) == null || t.focus();
			}
			e.code === "Escape" && (document.activeElement === R.current || R.current?.contains(document.activeElement)) && j(!1);
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [a]), _.useEffect(() => {
		if (R.current) return () => {
			B.current && (B.current.focus({ preventScroll: !0 }), B.current = null, H.current = !1);
		};
	}, [R.current]), /*#__PURE__*/ _.createElement("section", {
		ref: t,
		"aria-label": S ?? `${C} ${z}`,
		tabIndex: -1,
		"aria-live": "polite",
		"aria-relevant": "additions text",
		"aria-atomic": "false",
		suppressHydrationWarning: !0,
		"data-react-aria-top-layer": !0
	}, D.map((t, n) => {
		let [i, a] = t.split("-");
		return E.length ? /*#__PURE__*/ _.createElement("ol", {
			key: t,
			dir: y === "auto" ? ae() : y,
			tabIndex: -1,
			ref: R,
			className: c,
			"data-sonner-toaster": !0,
			"data-sonner-theme": F,
			"data-y-position": i,
			"data-x-position": a,
			style: {
				"--front-toast-height": `${O[0]?.height || 0}px`,
				"--width": `${V}px`,
				"--gap": `${b}px`,
				...m,
				...oe(l, u)
			},
			onBlur: (e) => {
				H.current && !e.currentTarget.contains(e.relatedTarget) && (H.current = !1, B.current &&= (B.current.focus({ preventScroll: !0 }), null));
			},
			onFocus: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || H.current || (H.current = !0, B.current = e.relatedTarget);
			},
			onMouseEnter: () => j(!0),
			onMouseMove: () => j(!0),
			onMouseLeave: () => {
				N || j(!1);
			},
			onDragEnd: () => j(!1),
			onPointerDown: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || P(!0);
			},
			onPointerUp: () => P(!1)
		}, E.filter((e) => !e.position && n === 0 || e.position === t).map((n, i) => /*#__PURE__*/ _.createElement(ie, {
			key: n.id,
			icons: x,
			index: i,
			toast: n,
			defaultRichColors: f,
			duration: g?.duration ?? p,
			className: g?.className,
			descriptionClassName: g?.descriptionClassName,
			invert: r,
			visibleToasts: h,
			closeButton: g?.closeButton ?? s,
			interacting: N,
			position: t,
			style: g?.style,
			unstyled: g?.unstyled,
			classNames: g?.classNames,
			cancelButtonStyle: g?.cancelButtonStyle,
			actionButtonStyle: g?.actionButtonStyle,
			closeButtonAriaLabel: g?.closeButtonAriaLabel,
			removeToast: te,
			toasts: E.filter((e) => e.position == n.position),
			heights: O.filter((e) => e.position == n.position),
			setHeights: k,
			expandByDefault: o,
			gap: b,
			expanded: A,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
});
// node_modules/@base-ui/utils/formatErrorMessage.mjs
function U(e, t) {
	return function(n, ...r) {
		let i = new URL(e);
		return i.searchParams.set("code", n.toString()), r.forEach((e) => i.searchParams.append("args[]", e)), `${t} error #${n}; visit ${i} for the full message.`;
	};
}
var W = U("https://base-ui.com/production-error", "Base UI"), ce = /*#__PURE__*/ _.createContext(void 0);
function le(e) {
	let t = _.useContext(ce);
	if (t === void 0 && !e) throw Error(W(33));
	return t;
}
// node_modules/@base-ui/react/menu/root/MenuRootContext.mjs
var ue = /*#__PURE__*/ _.createContext(void 0);
function de(e) {
	let t = _.useContext(ue);
	if (t === void 0 && !e) throw Error(W(36));
	return t;
}
// node_modules/@base-ui/utils/useRefWithInit.mjs
var fe = {};
function G(e, t) {
	let n = _.useRef(fe);
	return n.current === fe && (n.current = e(t)), n;
}
// node_modules/@base-ui/utils/useMergedRefs.mjs
function pe(e, t, n, r) {
	let i = G(me).current;
	return he(i, e, t, n, r) && _e(i, [
		e,
		t,
		n,
		r
	]), i.callback;
}
function K(e) {
	let t = G(me).current;
	return ge(t, e) && _e(t, e), t.callback;
}
function me() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function he(e, t, n, r, i) {
	return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== i;
}
function ge(e, t) {
	return e.refs.length !== t.length || e.refs.some((e, n) => e !== t[n]);
}
function _e(e, t) {
	e.refs = t, e.callback = t.every((e) => e == null) ? null : (n) => {
		if (e.cleanup &&= (e.cleanup(), null), n != null) {
			let r = Array(t.length).fill(null);
			for (let e = 0; e < t.length; e += 1) {
				let i = t[e];
				if (i != null) switch (typeof i) {
					case "function": {
						let t = i(n);
						typeof t == "function" && (r[e] = t);
						break;
					}
					case "object": i.current = n;
				}
			}
			e.cleanup = () => {
				for (let e = 0; e < t.length; e += 1) {
					let n = t[e];
					if (n != null) switch (typeof n) {
						case "function": {
							let t = r[e];
							typeof t == "function" ? t() : n(null);
							break;
						}
						case "object": n.current = null;
					}
				}
			};
		}
	};
}
// node_modules/@base-ui/utils/reactVersion.mjs
var ve = 19;
function ye(e) {
	return ve >= e;
}
// node_modules/@base-ui/utils/getReactElementRef.mjs
function be(e) {
	if (!/*#__PURE__*/ _.isValidElement(e)) return null;
	let t = e, n = t.props;
	return (ye(19) ? n?.ref : t.ref) ?? null;
}
// node_modules/@base-ui/utils/mergeObjects.mjs
function xe(e, t) {
	if (e && !t) return e;
	if (!e && t) return t;
	if (e || t) return {
		...e,
		...t
	};
}
// node_modules/@base-ui/utils/empty.mjs
function Se() {}
var Ce = Object.freeze([]), we = Object.freeze({});
// node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function Te(e, t) {
	let n = {};
	for (let r in e) {
		let i = e[r];
		if (t?.hasOwnProperty(r)) {
			let e = t[r](i);
			e != null && Object.assign(n, e);
		} else i === !0 ? n[`data-${r.toLowerCase()}`] = "" : i && (n[`data-${r.toLowerCase()}`] = i.toString());
	}
	return n;
}
// node_modules/@base-ui/react/utils/resolveClassName.mjs
function Ee(e, t) {
	return typeof e == "function" ? e(t) : e;
}
// node_modules/@base-ui/react/utils/resolveStyle.mjs
function De(e, t) {
	return typeof e == "function" ? e(t) : e;
}
// node_modules/@base-ui/react/merge-props/mergeProps.mjs
var Oe = {};
function ke(e, t, n, r, i) {
	if (!n && !r && !i && !e) return je(t);
	let a = je(e);
	return t && (a = Me(a, t)), n && (a = Me(a, n)), r && (a = Me(a, r)), i && (a = Me(a, i)), a;
}
function Ae(e) {
	if (e.length === 0) return Oe;
	if (e.length === 1) return je(e[0]);
	let t = je(e[0]);
	for (let n = 1; n < e.length; n += 1) t = Me(t, e[n]);
	return t;
}
function je(e) {
	return Ie(e) ? { ...e(Oe) } : Ne(e);
}
function Me(e, t) {
	return Ie(t) ? t(e) : Pe(e, t);
}
function Ne(e) {
	let t = { ...e };
	for (let e in t) {
		let n = t[e];
		Fe(e, n) && (t[e] = Re(n));
	}
	return t;
}
function Pe(e, t) {
	if (!t) return e;
	for (let n in t) {
		let r = t[n];
		switch (n) {
			case "style":
				e[n] = xe(e.style, r);
				break;
			case "className":
				e[n] = Be(e.className, r);
				break;
			default: e[n] = Fe(n, r) ? Le(e[n], r) : r;
		}
	}
	return e;
}
function Fe(e, t) {
	let n = e.charCodeAt(0), r = e.charCodeAt(1), i = e.charCodeAt(2);
	return n === 111 && r === 110 && i >= 65 && i <= 90 && (typeof t == "function" || t === void 0);
}
function Ie(e) {
	return typeof e == "function";
}
function Le(e, t) {
	return t ? e ? (...n) => {
		let r = n[0];
		if (Ve(r)) {
			let i = r;
			ze(i);
			let a = t(...n);
			return i.baseUIHandlerPrevented || e?.(...n), a;
		}
		let i = t(...n);
		return e?.(...n), i;
	} : Re(t) : e;
}
function Re(e) {
	return e && ((...t) => {
		let n = t[0];
		return Ve(n) && ze(n), e(...t);
	});
}
function ze(e) {
	return e.preventBaseUIHandler = () => {
		e.baseUIHandlerPrevented = !0;
	}, e;
}
function Be(e, t) {
	return t ? e ? t + " " + e : t : e;
}
function Ve(e) {
	return typeof e == "object" && !!e && "nativeEvent" in e;
}
// node_modules/@base-ui/react/internals/useRenderElement.mjs
function He(e, t, n = {}) {
	let r = t.render;
	n.enabled !== !1 && (r = Ke(r));
	let i = Ue(t, n, r);
	if (n.enabled === !1) return null;
	let a = n.state ?? we;
	return qe(e, r, i, a);
}
function Ue(e, t, n) {
	let { className: r, style: i } = e, { state: a = we, ref: o, props: s, stateAttributesMapping: c, enabled: l = !0 } = t, u = l ? Ee(r, a) : void 0, d = l ? De(i, a) : void 0, f = l ? Te(a, c) : we, p = l && s ? We(s) : void 0, m = l ? xe(f, p) ?? {} : we;
	return typeof document < "u" && (l ? m.ref = Array.isArray(o) ? K([
		m.ref,
		be(n),
		...o
	]) : pe(m.ref, be(n), o) : pe(null, null)), l ? (u !== void 0 && (m.className = Be(m.className, u)), d !== void 0 && (m.style = xe(m.style, d)), m) : we;
}
function We(e) {
	return Array.isArray(e) ? Ae(e) : ke(void 0, e);
}
var Ge = Symbol.for("react.lazy");
function Ke(e) {
	if (e?.$$typeof !== Ge) return e;
	let t = _.Children.toArray(e)[0];
	return /*#__PURE__*/ _.isValidElement(t) ? t : e;
}
function qe(e, t, n, r) {
	if (t) {
		if (typeof t == "function") return t(n, r);
		let e = ke(n, t.props);
		return e.ref = n.ref, /*#__PURE__*/ _.cloneElement(t, e);
	}
	return Je(e, n);
}
function Je(e, t) {
	return e === "button" ? /*#__PURE__*/ (0, _.createElement)("button", {
		type: "button",
		...t,
		key: t.key
	}) : e === "img" ? /*#__PURE__*/ (0, _.createElement)("img", {
		alt: "",
		...t,
		key: t.key
	}) : /*#__PURE__*/ _.createElement(e, t);
}
// node_modules/@base-ui/react/internals/TransitionStatusDataAttributes.mjs
var Ye = "data-starting-style", Xe = "data-ending-style", Ze = { [Ye]: "" }, Qe = { [Xe]: "" }, $e = { transitionStatus(e) {
	return e === "starting" ? Ze : e === "ending" ? Qe : null;
} }, et = "data-open", tt = "data-closed", nt = "data-anchor-hidden", rt = "data-popup-open", it = "data-pressed", at = { [rt]: "" }, ot = {
	[rt]: "",
	[it]: ""
}, st = { [et]: "" }, ct = { [tt]: "" }, lt = { [nt]: "" }, ut = { open(e) {
	return e ? at : null;
} }, dt = { open(e) {
	return e ? ot : null;
} }, ft = {
	open(e) {
		return e ? st : ct;
	},
	anchorHidden(e) {
		return e ? lt : null;
	}
}, pt = {
	...ft,
	...$e
}, mt = /*#__PURE__*/ _.createContext(void 0);
function ht(e = !0) {
	let t = _.useContext(mt);
	if (t === void 0 && !e) throw Error(W(25));
	return t;
}
// node_modules/@base-ui/react/internals/reason-parts.mjs
var gt = "none", _t = "trigger-press", vt = "trigger-hover", yt = "trigger-focus", bt = "outside-press", xt = "item-press", St = "close-press", Ct = "focus-out", wt = "escape-key", Tt = "list-navigation", Et = "keyboard", Dt = "pointer", Ot = "cancel-open", kt = "sibling-open", At = "disabled", jt = "missing", Mt = "initial", Nt = "imperative-action", Pt = "window-resize";
// node_modules/@base-ui/utils/useControlled.mjs
function Ft({ controlled: e, default: t, name: n, state: r = "value" }) {
	let { current: i } = _.useRef(e !== void 0), [a, o] = _.useState(() => t);
	return [i && e !== void 0 ? e : a, _.useCallback((e) => {
		i || o(e);
	}, [])];
}
// node_modules/@base-ui/react/menu/filter-root/MenuFilterContext.mjs
var It = /*#__PURE__*/ _.createContext(null);
function Lt(e = "root") {
	let t = _.useContext(It), n = _.useContext(ue);
	return t === null || n === void 0 ? null : (e === "submenu-trigger" ? n.virtualFocus || n.parentVirtualFocus : n.virtualFocus) ? t : null;
}
var Rt = {
	visible: !0,
	ref: null
};
function zt() {
	return Rt;
}
function Bt(e, t, n = "root") {
	let r = Lt(n), i = ((n === "submenu-trigger" ? r?.useSubmenuTrigger : r?.useItem) ?? zt)({
		label: e.label,
		children: e.children,
		render: e.render
	}), a = pe(t, i.ref);
	return {
		visible: i.visible,
		ref: a,
		props: i.props
	};
}
// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Vt() {
	return typeof window < "u";
}
function Ht(e) {
	return Gt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ut(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Wt(e) {
	return ((Gt(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Gt(e) {
	return Vt() ? e instanceof Node || e instanceof Ut(e).Node : !1;
}
function Kt(e) {
	return Vt() ? e instanceof Element || e instanceof Ut(e).Element : !1;
}
function qt(e) {
	return Vt() ? e instanceof HTMLElement || e instanceof Ut(e).HTMLElement : !1;
}
function Jt(e) {
	return !Vt() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ut(e).ShadowRoot;
}
function Yt(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = sn(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Xt(e) {
	return /^(table|td|th)$/.test(Ht(e));
}
function Zt(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Qt = /transform|translate|scale|rotate|perspective|filter/, $t = /paint|layout|strict|content/, en = (e) => !!e && e !== "none", tn;
function nn(e) {
	let t = Kt(e) ? sn(e) : e;
	return en(t.transform) || en(t.translate) || en(t.scale) || en(t.rotate) || en(t.perspective) || !an() && (en(t.backdropFilter) || en(t.filter)) || Qt.test(t.willChange || "") || $t.test(t.contain || "");
}
function rn(e) {
	let t = ln(e);
	for (; qt(t) && !on(t);) {
		if (nn(t)) return t;
		if (Zt(t)) return null;
		t = ln(t);
	}
	return null;
}
function an() {
	return tn ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), tn;
}
function on(e) {
	return /^(html|body|#document)$/.test(Ht(e));
}
function sn(e) {
	return Ut(e).getComputedStyle(e);
}
function cn(e) {
	return Kt(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function ln(e) {
	if (Ht(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Jt(e) && e.host || Wt(e);
	return Jt(t) ? t.host : t;
}
function un(e) {
	let t = ln(e);
	return on(t) ? (e.ownerDocument || e).body : qt(t) && Yt(t) ? t : un(t);
}
function dn(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = un(e), i = r === e.ownerDocument?.body, a = Ut(r);
	if (i) {
		let e = fn(a);
		return t.concat(a, a.visualViewport || [], Yt(r) ? r : [], e && n ? dn(e) : []);
	}
	return t.concat(r, dn(r, [], n));
}
function fn(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
// node_modules/@base-ui/utils/safeReact.mjs
var pn = { ..._ }, mn = pn.useInsertionEffect, hn = mn && mn !== pn.useLayoutEffect ? mn : (e) => e();
function q(e) {
	let t = G(gn).current;
	return t.next = e, hn(t.effect), t.trampoline;
}
function gn() {
	let e = {
		next: void 0,
		callback: _n,
		trampoline: (...t) => e.callback?.(...t),
		effect: () => {
			e.callback = e.next;
		}
	};
	return e;
}
function _n() {}
var J = typeof document < "u" ? _.useLayoutEffect : () => {}, vn = /*#__PURE__*/ _.createContext(void 0);
function yn(e = !1) {
	let t = _.useContext(vn);
	if (t === void 0 && !e) throw Error(W(16));
	return t;
}
// node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function bn(e) {
	let { focusableWhenDisabled: t, disabled: n, composite: r = !1, tabIndex: i = 0, isNativeButton: a } = e, o = r && t !== !1, s = r && t === !1;
	return { props: _.useMemo(() => {
		let e = { onKeyDown(e) {
			n && t && e.key !== "Tab" && e.preventDefault();
		} };
		return r || (e.tabIndex = i, !a && n && (e.tabIndex = t ? i : -1)), (a && (t || o) || !a && n) && (e["aria-disabled"] = n), a && (!t || s) && (e.disabled = n), e;
	}, [
		r,
		n,
		t,
		o,
		s,
		a,
		i
	]) };
}
// node_modules/@base-ui/utils/owner.mjs
function xn(e) {
	return e?.ownerDocument || document;
}
// node_modules/@base-ui/react/utils/dispatchClickWithModifiers.mjs
function Sn(e, t, { detail: n = 0, pointerType: r = "" } = {}) {
	e.dispatchEvent(new (Ut(e)).PointerEvent("click", {
		bubbles: !0,
		cancelable: !0,
		composed: !0,
		detail: n,
		pointerType: r,
		shiftKey: t.shiftKey,
		ctrlKey: t.ctrlKey,
		altKey: t.altKey,
		metaKey: t.metaKey
	}));
}
// node_modules/@base-ui/react/internals/use-button/useButton.mjs
function Cn(e = {}) {
	let { disabled: t = !1, focusableWhenDisabled: n, tabIndex: r = 0, native: i = !0, composite: a } = e, o = _.useRef(null), s = yn(!0), c = a ?? s !== void 0, { props: l } = bn({
		focusableWhenDisabled: n,
		disabled: t,
		composite: c,
		tabIndex: r,
		isNativeButton: i
	}), u = _.useCallback(() => {
		let e = o.current;
		wn(e) && c && t && l.disabled === void 0 && e.disabled && (e.disabled = !1);
	}, [
		t,
		l.disabled,
		c
	]);
	return J(u, [u]), {
		getButtonProps: _.useCallback((e = {}) => {
			let { onClick: n, onMouseDown: r, onKeyUp: a, onKeyDown: o, onPointerDown: s, ...u } = e;
			return ke({
				onClick(e) {
					t ? e.preventDefault() : n?.(e);
				},
				onMouseDown(e) {
					t || r?.(e);
				},
				onKeyDown(e) {
					if (t || (ze(e), o?.(e), e.baseUIHandlerPrevented)) return;
					let n = e.target === e.currentTarget, r = e.currentTarget, a = wn(r), s = !i && Tn(r), l = n && (i ? a : !s), u = e.key === "Enter", d = e.key === " ", f = r.getAttribute("role"), p = f?.startsWith("menuitem") || f === "option" || f === "gridcell";
					if (n && c && d) {
						if (e.defaultPrevented && p) return;
						e.preventDefault(), (!i || a) && (e.preventBaseUIHandler(), Sn(r, e));
					} else !l || i || !d && !u ? n && s && d && e.preventDefault() : e.defaultPrevented || (e.preventDefault(), u && (e.preventBaseUIHandler(), Sn(r, e)));
				},
				onKeyUp(e) {
					t || (ze(e), a?.(e), e.target === e.currentTarget && i && c && wn(e.currentTarget) && e.key === " " ? e.preventDefault() : e.baseUIHandlerPrevented || e.target !== e.currentTarget || i || c || e.defaultPrevented || e.key !== " " || (e.preventBaseUIHandler(), Sn(e.currentTarget, e)));
				},
				onPointerDown(e) {
					t ? e.preventDefault() : s?.(e);
				}
			}, i ? { type: "button" } : { role: "button" }, l, u);
		}, [
			t,
			l,
			c,
			i
		]),
		buttonRef: q((e) => {
			o.current = e, u();
		})
	};
}
function wn(e) {
	return qt(e) && e.tagName === "BUTTON";
}
function Tn(e) {
	return qt(e) && e.tagName === "A" && !!e.href;
}
// node_modules/@base-ui/utils/platform/shared.mjs
function En() {
	return typeof navigator > "u" ? {
		userAgent: "",
		platform: "",
		maxTouchPoints: 0
	} : {
		userAgent: navigator.userAgent,
		platform: navigator.platform ?? "",
		maxTouchPoints: navigator.maxTouchPoints ?? 0
	};
}
var { userAgent: Dn, platform: On, maxTouchPoints: kn } = En(), An = Dn.toLowerCase(), jn = On.toLowerCase(), Mn = /^i(os$|p)/.test(jn) || jn === "macintel" && kn > 1, Nn = "android", Pn = jn === Nn || An.includes(Nn), Fn = !Mn && jn.startsWith("mac");
jn.startsWith("win"), !Pn && /^(linux|chrome os)/.test(jn);
var In = Fn || Mn, Ln = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none");
!Ln && An.includes("firefox"), !Ln && An.includes("chrom");
// node_modules/@base-ui/utils/platform/screen-reader.mjs
var Rn = In, zn = /jsdom|happydom/.test(An);
// node_modules/@base-ui/react/menu/item/useMenuItemCommonProps.mjs
function Bn(e) {
	e.preventDefault();
}
function Vn(e) {
	let { closeOnClick: t, highlighted: n, id: r, nodeId: i, store: a, typingRef: o, itemRef: s, itemMetadata: c } = e, l = de(), u = ht(!0), d = c.type === "submenu-trigger", f = d ? l.parentVirtualFocus : l.virtualFocus, p = (d && l.parent.type === "menu" ? l.parent.store : l.store).useState("webkitAriaSelected", n), { events: m } = a.useState("floatingTreeRoot"), h = a.useState("open"), g = u !== void 0, v = !f && h && n ? 0 : -1;
	return _.useMemo(() => ({
		id: r,
		role: "menuitem",
		tabIndex: v,
		"aria-selected": p,
		onMouseDown: f ? Bn : void 0,
		onKeyDown(e) {
			e.key === " " && o?.current && e.preventDefault();
		},
		onMouseMove(e) {
			i && m.emit("itemhover", {
				nodeId: i,
				target: e.currentTarget
			});
		},
		onClick(e) {
			t && m.emit("close", {
				domEvent: e.nativeEvent,
				reason: xt
			});
		},
		onMouseUp(e) {
			if (u) {
				let t = u.initialCursorPointRef.current;
				if (u.initialCursorPointRef.current = null, g && t && Math.abs(e.clientX - t.x) <= 1 && Math.abs(e.clientY - t.y) <= 1 || g && !Fn && e.button === 2) return;
			}
			s.current && a.context.allowMouseUpTriggerRef.current && (!g || e.button === 2) && c.type === "regular-item" && Sn(s.current, e, {
				detail: 1,
				pointerType: "mouse"
			});
		}
	}), [
		t,
		v,
		r,
		m,
		i,
		a.context.allowMouseUpTriggerRef,
		o,
		s,
		u,
		g,
		c.type,
		p,
		f
	]);
}
// node_modules/@base-ui/react/menu/item/useMenuItem.mjs
var Hn = { type: "regular-item" };
function Un(e) {
	let { closeOnClick: t, disabled: n, highlighted: r, id: i, store: a, typingRef: o = a.context.typingRef, nativeButton: s, itemMetadata: c, nodeId: l } = e, u = _.useRef(null), { getButtonProps: d, buttonRef: f } = Cn({
		disabled: n,
		focusableWhenDisabled: !0,
		native: s,
		composite: !0
	}), p = Vn({
		closeOnClick: t,
		highlighted: r,
		id: i,
		nodeId: l,
		store: a,
		typingRef: o,
		itemRef: u,
		itemMetadata: c
	}), m = _.useCallback((e) => ke(p, { onMouseEnter(e) {
		c.type === "submenu-trigger" && c.setActive(e.nativeEvent);
	} }, e, d), [
		p,
		d,
		c
	]), h = pe(u, f);
	return _.useMemo(() => ({
		getItemProps: m,
		itemRef: h
	}), [m, h]);
}
// node_modules/@base-ui/react/internals/composite/list/CompositeListContext.mjs
var Wn = /*#__PURE__*/ _.createContext({
	register: () => {},
	unregister: () => {},
	subscribeMapChange: () => () => {},
	nextIndexRef: { current: 0 }
});
function Gn() {
	return _.useContext(Wn);
}
// node_modules/@base-ui/react/internals/composite/list/useCompositeListItem.mjs
function Kn(e = {}) {
	let { guess: t, label: n, metadata: r, textRef: i, index: a } = e, { register: o, unregister: s, subscribeMapChange: c, nextIndexRef: l } = Gn(), u = _.useRef(-1), [d, f] = _.useState(a == null && t ? () => {
		if (u.current === -1) {
			let e = l.current;
			l.current += 1, u.current = e;
		}
		return u.current;
	} : -1), p = a ?? d, m = _.useRef(null), h = _.useCallback((e) => {
		let t = m.current;
		t && s(t), m.current = e, e && o(e, {
			metadata: r ?? null,
			index: a ?? null,
			label: n,
			textRef: i
		});
	}, [
		a,
		o,
		s,
		r,
		n,
		i
	]);
	return J(() => {
		if (a == null) return c((e) => {
			let t = m.current ? e.get(m.current)?.index : null;
			t != null && f(t);
		});
	}, [a, c]), {
		ref: h,
		index: p
	};
}
// node_modules/@base-ui/utils/useForcedRerendering.mjs
function qn() {
	let [, e] = _.useState({});
	return _.useCallback(() => {
		e({});
	}, []);
}
// node_modules/@base-ui/utils/useId.mjs
var Jn = 0;
function Yn(e, t = "mui") {
	let n = _.useRef(void 0), r = qn(), i = e ?? n.current;
	return _.useEffect(() => {
		n.current ?? (Jn += 1, n.current = `${t}-${Jn}`, e ?? r());
	}, [
		e,
		t,
		r
	]), i;
}
var Xn = pn.useId;
function Zn(e, t) {
	if (Xn !== void 0) {
		let n = Xn();
		return e ?? (t ? `${t}-${n}` : n);
	}
	return Yn(e, t);
}
// node_modules/@base-ui/react/internals/useBaseUiId.mjs
function Qn(e) {
	return Zn(e, "base-ui");
}
// node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
function $n(e, t, n, r) {
	let i = !1, a = !1, o = r ?? we;
	return {
		reason: e,
		event: t ?? new Event("base-ui"),
		cancel() {
			i = !0;
		},
		allowPropagation() {
			a = !0;
		},
		get isCanceled() {
			return i;
		},
		get isPropagationAllowed() {
			return a;
		},
		trigger: n,
		...o
	};
}
function er(e, t, n) {
	let r = n ?? we;
	return {
		reason: e,
		event: t ?? new Event("base-ui"),
		...r
	};
}
// node_modules/react/cjs/react-jsx-runtime.production.js
var tr = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), nr = /* @__PURE__ */ o(((e, t) => {
	t.exports = tr();
}));
// node_modules/@base-ui/utils/useOnMount.mjs
function rr(e) {
	_.useEffect(e, Ce);
}
// node_modules/@base-ui/utils/useAnimationFrame.mjs
var ir = null;
globalThis.requestAnimationFrame;
var ar = new class {
	callbacks = [];
	callbacksCount = 0;
	nextId = 1;
	startId = 1;
	isScheduled = !1;
	tick = (e) => {
		this.isScheduled = !1;
		let t = this.callbacks, n = this.callbacksCount;
		if (this.callbacks = [], this.callbacksCount = 0, this.startId = this.nextId, n > 0) for (let n = 0; n < t.length; n += 1) t[n]?.(e);
	};
	request(e) {
		let t = this.nextId;
		return this.nextId += 1, this.callbacks.push(e), this.callbacksCount += 1, this.isScheduled ||= (requestAnimationFrame(this.tick), !0), t;
	}
	cancel(e) {
		let t = e - this.startId;
		t < 0 || t >= this.callbacks.length || this.callbacks[t] !== null && (this.callbacks[t] = null, --this.callbacksCount);
	}
}(), or = class e {
	static create() {
		return new e();
	}
	static request(e) {
		return ar.request(e);
	}
	static cancel(e) {
		return ar.cancel(e);
	}
	currentId = ir;
	request(e) {
		this.cancel(), this.currentId = ar.request(() => {
			this.currentId = ir, e();
		});
	}
	cancel = () => {
		this.currentId !== ir && (ar.cancel(this.currentId), this.currentId = ir);
	};
	disposeEffect = () => this.cancel;
};
function sr() {
	let e = G(or.create).current;
	return rr(e.disposeEffect), e;
}
// node_modules/@base-ui/react/internals/useTransitionStatus.mjs
function cr(e, t = !1, n = !1, r = !1) {
	let [i, a] = _.useState(e && t ? "idle" : void 0), [o, s] = _.useState(e && !r);
	return e && !o && (s(!0), a("starting")), !e && o && i !== "ending" && !n && a("ending"), !e && !o && i === "ending" && a(void 0), J(() => {
		if (!e && o && i !== "ending" && n) {
			let e = or.request(() => {
				a("ending");
			});
			return () => {
				or.cancel(e);
			};
		}
	}, [
		e,
		o,
		i,
		n
	]), J(() => {
		if (!e || t || i === void 0) return;
		let n = or.request(() => {
			a(void 0);
		});
		return () => {
			or.cancel(n);
		};
	}, [
		t,
		e,
		i
	]), J(() => {
		if (!e || !t) return;
		e && o && i !== "idle" && a("starting");
		let n = or.request(() => {
			a("idle");
		});
		return () => {
			or.cancel(n);
		};
	}, [
		t,
		e,
		o,
		i
	]), {
		mounted: o,
		setMounted: s,
		transitionStatus: i
	};
}
// node_modules/@base-ui/react/utils/resolveRef.mjs
function lr(e) {
	return e == null ? e : "current" in e ? e.current : e;
}
// node_modules/@base-ui/react/utils/getFiniteAnimations.mjs
function ur(e, t) {
	return e.getAnimations(t).filter((e) => {
		let t = e.effect?.getTiming();
		return t?.duration !== Infinity && t?.iterations !== Infinity;
	});
}
// node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
var dr = null;
function fr(e) {
	if (!dr) {
		let e = [];
		dr = e, queueMicrotask(() => {
			dr = null, v.flushSync(() => {
				for (let t of e) t();
			});
		});
	}
	dr.push(e);
}
function pr(e, t = !1, n = !1) {
	let r = sr();
	return q((i, a = null) => {
		r.cancel();
		let o = lr(e);
		if (o == null) return;
		let s = o, c = () => {
			n ? fr(() => {
				a?.aborted || i();
			}) : v.flushSync(i);
		};
		if (typeof s.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
			i();
			return;
		}
		function l() {
			Promise.all(ur(s).map((e) => e.finished.then(Se))).then(() => {
				a?.aborted || c();
			}, () => {
				a?.aborted || (ur(s).some((e) => e.pending || e.playState !== "finished") ? l() : c());
			});
		}
		if (t) {
			let e = Ye;
			if (!s.hasAttribute(e)) {
				r.request(l);
				return;
			}
			let t = new MutationObserver(() => {
				s.hasAttribute(e) || (t.disconnect(), l());
			});
			t.observe(s, {
				attributes: !0,
				attributeFilter: [e]
			}), a?.addEventListener("abort", () => t.disconnect(), { once: !0 });
		} else r.request(l);
	});
}
// node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs
function mr(e) {
	let { enabled: t = !0, open: n, ref: r, batch: i = !1, onComplete: a } = e, o = q(a), s = pr(r, n, i);
	_.useEffect(() => {
		if (!t) return;
		let e = new AbortController();
		return s(o, e.signal), () => {
			e.abort();
		};
	}, [
		t,
		n,
		o,
		s
	]);
}
// node_modules/@base-ui/react/menu/group/MenuGroupContext.mjs
var hr = /*#__PURE__*/ _.createContext(void 0);
function gr() {
	let e = _.useContext(hr);
	if (e === void 0) throw Error(W(31));
	return e;
}
// node_modules/@base-ui/react/menu/group/MenuGroup.mjs
var Y = nr(), _r = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, [o, s] = _.useState(void 0), c = He("div", e, {
		ref: t,
		props: {
			role: "group",
			"aria-labelledby": o,
			...a
		}
	});
	return /*#__PURE__*/ (0, Y.jsx)(hr.Provider, {
		value: s,
		children: c
	});
}), vr = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let n = Lt()?.Group ?? _r;
	return /*#__PURE__*/ (0, Y.jsx)(n, {
		...e,
		ref: t
	});
}), yr = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = Qn(a), c = gr();
	return J(() => (c(s), () => {
		c((e) => e === s ? void 0 : e);
	}), [c, s]), He("div", e, {
		ref: t,
		props: {
			id: s,
			"aria-hidden": !0,
			...o
		}
	});
}), br = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, label: a, nativeButton: o = !1, disabled: s = !1, closeOnClick: c = !0, style: l, ...u } = e, { store: d } = de(), f = Kn({
		guess: !0,
		label: a
	}), p = Qn(i), m = d.useState("disabled"), h = d.useState("isActive", f.index), g = d.useState("floatingNodeId"), _ = d.useState("itemProps"), v = s || m, { getItemProps: y, itemRef: b } = Un({
		closeOnClick: c,
		disabled: v,
		highlighted: h,
		id: p,
		store: d,
		nativeButton: o,
		nodeId: g,
		itemMetadata: Hn
	});
	return He("div", e, {
		state: {
			disabled: v,
			highlighted: h
		},
		props: [
			_,
			u,
			y
		],
		ref: [
			b,
			t,
			f.ref
		]
	});
}), xr = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let n = Bt(e, t);
	return n.visible ? /*#__PURE__*/ (0, Y.jsx)(br, {
		...e,
		ref: n.ref
	}) : null;
}), Sr = 0, Cr = class e {
	static create() {
		return new e();
	}
	currentId = Sr;
	start(e, t) {
		this.clear(), this.currentId = setTimeout(() => {
			this.currentId = Sr, t();
		}, e);
	}
	isStarted() {
		return this.currentId !== Sr;
	}
	clear = () => {
		this.currentId !== Sr && (clearTimeout(this.currentId), this.currentId = Sr);
	};
	disposeEffect = () => this.clear;
};
function wr() {
	let e = G(Cr.create).current;
	return rr(e.disposeEffect), e;
}
// node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function Tr(e) {
	e.preventDefault(), e.stopPropagation();
}
function Er(e) {
	return "nativeEvent" in e;
}
function Dr(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : Pn && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Or(e) {
	return zn ? !1 : !Pn && e.width === 0 && e.height === 0 || e.type === "pointerdown" && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" && (Pn || e.buttons === 0) || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
}
function kr(e, t) {
	let n = ["mouse", "pen"];
	return t || n.push("", void 0), n.includes(e);
}
function Ar(e) {
	let t = e.type;
	return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
// node_modules/@base-ui/utils/shadowDom.mjs
function jr(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement != null;) t = t.shadowRoot.activeElement;
	return t;
}
function X(e, t) {
	if (!e || !t) return !1;
	let n = t.getRootNode?.();
	if (e.contains(t)) return !0;
	if (n && Jt(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function Mr(e, t) {
	let n = e;
	for (; n;) {
		if (Kt(n) && n.matches(t)) return n;
		n = n.assignedSlot ?? n.parentNode ?? (Jt(n) ? n.host : null);
	}
	return null;
}
function Nr(e) {
	return "composedPath" in e ? e.composedPath()[0] ?? e.target : e.target;
}
// node_modules/@base-ui/react/floating-ui-react/utils/constants.mjs
var Pr = "data-base-ui-focusable", Fr = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", Ir = "ArrowLeft", Lr = "ArrowRight", Rr = "ArrowUp", zr = "ArrowDown", Br = "data-trigger-disabled";
// node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function Vr(e, t) {
	if (!Kt(e)) return !1;
	let n = e;
	if (t.hasElement(n)) return !n.hasAttribute(Br);
	for (let [, e] of t.entries()) if (X(e, n)) return !e.hasAttribute(Br);
	return !1;
}
function Hr(e, t) {
	if (t == null) return !1;
	if ("composedPath" in e) return e.composedPath().includes(t);
	let n = e;
	return n.target != null && t.contains(n.target);
}
function Ur(e) {
	return e.matches("html,body");
}
function Wr(e) {
	return qt(e) && e.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function Gr(e) {
	return Mr(e, `button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${Fr}`) != null;
}
function Kr(e) {
	return e ? e.getAttribute("role") === "combobox" && Wr(e) : !1;
}
function qr(e) {
	if (!e || zn) return !0;
	try {
		return e.matches(":focus-visible");
	} catch {
		return !0;
	}
}
function Jr(e) {
	return e ? e.hasAttribute("data-base-ui-focusable") ? e : e.querySelector("[data-base-ui-focusable]") || e : null;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverShared.mjs
function Yr(e, t) {
	return t != null && !kr(t) ? 0 : typeof e == "function" ? e() : e;
}
function Xr(e, t, n) {
	let r = Yr(e, n);
	return typeof r == "number" ? r : r?.[t];
}
function Zr(e) {
	return typeof e == "function" ? e() : e;
}
function Qr(e, t) {
	return t || e === "click" || e === "mousedown";
}
function $r(e) {
	return e?.includes("mouse") && e !== "mousedown";
}
// node_modules/@base-ui/react/floating-ui-react/components/FloatingDelayGroup.mjs
var ei = /*#__PURE__*/ _.createContext({
	hasProvider: !1,
	timeoutMs: 0,
	delayRef: { current: 0 },
	initialDelayRef: { current: 0 },
	timeout: new Cr(),
	currentIdRef: { current: null },
	currentContextRef: { current: null }
});
function ti(e, t) {
	e.current = t.current;
}
function ni(e) {
	let { children: t, delay: n, timeoutMs: r = 0 } = e, i = _.useRef(n), a = _.useRef(n), o = _.useRef(null), s = _.useRef(null), c = wr();
	return J(() => {
		a.current = n, o.current ? i.current = {
			open: Xr(i.current, "open"),
			close: Xr(n, "close")
		} : i.current = n;
	}, [
		n,
		o,
		i,
		a
	]), /*#__PURE__*/ (0, Y.jsx)(ei.Provider, {
		value: _.useMemo(() => ({
			hasProvider: !0,
			delayRef: i,
			initialDelayRef: a,
			currentIdRef: o,
			timeoutMs: r,
			currentContextRef: s,
			timeout: c
		}), [r, c]),
		children: t
	});
}
function ri(e, t = { open: !1 }) {
	let { open: n } = t, r = e.useState("floatingId"), { currentIdRef: i, delayRef: a, timeoutMs: o, initialDelayRef: s, currentContextRef: c, hasProvider: l, timeout: u } = _.useContext(ei), [d, f] = _.useState(!1), p = _.useRef(n);
	return J(() => {
		p.current = n;
	}, [n]), J(() => {
		function t() {
			c.current?.setIsInstantPhase(!1), i.current = null, c.current = null, a.current = s.current, u.clear();
		}
		if (i.current && !n && i.current === r) {
			if (f(!1), o) {
				let n = r;
				return u.start(o, () => {
					e.select("open") || i.current && i.current !== n || t();
				}), () => {
					(p.current || i.current !== n) && u.clear();
				};
			}
			t();
		}
	}, [
		n,
		r,
		i,
		a,
		o,
		s,
		c,
		u,
		e
	]), J(() => {
		if (!n) return;
		let t = c.current, o = i.current;
		u.clear(), c.current = {
			onOpenChange: e.setOpen,
			setIsInstantPhase: f
		}, i.current = r, a.current = {
			open: 0,
			close: Xr(s.current, "close")
		}, o !== null && o !== r ? (f(!0), t?.setIsInstantPhase(!0), t?.onOpenChange(!1, $n(gt))) : (f(!1), t?.setIsInstantPhase(!1));
	}, [
		n,
		r,
		e,
		i,
		a,
		s,
		c,
		u
	]), J(() => () => {
		if (i.current === r) {
			if (c.current = null, !p.current) return;
			i.current = null, ti(a, s), u.clear();
		}
	}, [
		c,
		i,
		a,
		r,
		s,
		u
	]), _.useMemo(() => ({
		activeIdRef: i,
		hasProvider: l,
		delayRef: a,
		isInstantPhase: d
	}), [
		i,
		l,
		a,
		d
	]);
}
// node_modules/@base-ui/utils/addEventListener.mjs
function ii(e, t, n, r) {
	return e.addEventListener(t, n, r), () => {
		e.removeEventListener(t, n, r);
	};
}
// node_modules/@base-ui/utils/mergeCleanups.mjs
function ai(...e) {
	return () => {
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			n && n();
		}
	};
}
// node_modules/@base-ui/utils/useValueAsRef.mjs
function oi(e) {
	let t = G(si, e).current;
	return t.next = e, J(t.effect), t;
}
function si(e) {
	let t = {
		current: e,
		next: e,
		effect: () => {
			t.current = t.next;
		}
	};
	return t;
}
// node_modules/@base-ui/utils/visuallyHidden.mjs
var ci = {
	clipPath: "inset(50%)",
	overflow: "hidden",
	whiteSpace: "nowrap",
	border: 0,
	padding: 0,
	width: 1,
	height: 1,
	margin: -1
}, li = {
	...ci,
	position: "fixed",
	margin: 0,
	top: 0,
	left: 0
}, ui = {
	...ci,
	position: "absolute"
}, di = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let [n, r] = _.useState();
	J(() => {
		Rn && Ln && r("button");
	}, []);
	let i = {
		tabIndex: 0,
		role: n
	};
	return /*#__PURE__*/ (0, Y.jsx)("span", {
		...e,
		ref: t,
		style: li,
		"aria-hidden": !n || void 0,
		...i,
		"data-base-ui-focus-guard": ""
	});
}), fi = Math.min, pi = Math.max, mi = Math.round, hi = Math.floor, gi = (e) => ({
	x: e,
	y: e
}), _i = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function vi(e, t, n) {
	return pi(e, fi(t, n));
}
function yi(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function bi(e) {
	return e.split("-")[0];
}
function xi(e) {
	return e.split("-")[1];
}
function Si(e) {
	return e === "x" ? "y" : "x";
}
function Ci(e) {
	return e === "y" ? "height" : "width";
}
function wi(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Ti(e) {
	return Si(wi(e));
}
function Ei(e, t, n) {
	n === void 0 && (n = !1);
	let r = xi(e), i = Ti(e), a = Ci(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Fi(o)), [o, Fi(o)];
}
function Di(e) {
	let t = Fi(e);
	return [
		Oi(e),
		t,
		Oi(t)
	];
}
function Oi(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var ki = ["left", "right"], Ai = ["right", "left"], ji = ["top", "bottom"], Mi = ["bottom", "top"];
function Ni(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Ai : ki : t ? ki : Ai;
		case "left":
		case "right": return t ? ji : Mi;
		default: return [];
	}
}
function Pi(e, t, n, r) {
	let i = xi(e), a = Ni(bi(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Oi)))), a;
}
function Fi(e) {
	let t = bi(e);
	return _i[t] + e.slice(t.length);
}
function Ii(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Li(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Ii(e);
}
function Ri(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
// node_modules/@base-ui/react/floating-ui-react/utils/composite.mjs
function zi(e, t) {
	return t < 0 || t >= e.length;
}
function Bi(e, t) {
	return Ui(e.current, { disabledIndices: t });
}
function Vi(e, t) {
	return Ui(e.current, {
		decrement: !0,
		startingIndex: e.current.length,
		disabledIndices: t
	});
}
function Hi(e, t, n) {
	let { decrement: r, loopFocus: i, allowEscape: a, disabledIndices: o, minIndex: s, maxIndex: c } = n, l = () => Ui(e, {
		startingIndex: t,
		decrement: r,
		disabledIndices: o
	}), u, d = !1;
	if (!i) u = r ? Math.max(s, l()) : Math.min(c, l());
	else if (r ? t <= s : t >= c) {
		let n = r ? -1 : e.length;
		a && t !== n ? u = -1 : (u = r ? c : s, d = !0);
	} else u = l();
	return {
		index: zi(e, u) ? -1 : u,
		wrapped: d
	};
}
function Ui(e, { startingIndex: t = -1, decrement: n = !1, disabledIndices: r, amount: i = 1 } = {}) {
	let a = t;
	do
		a += n ? -i : i;
	while (a >= 0 && a <= e.length - 1 && Wi(e, a, r));
	return a;
}
function Wi(e, t, n) {
	if (typeof n == "function" ? n(t) : n?.includes(t) ?? !1) return !0;
	let r = e[t];
	return r ? !Ki(r) || r.matches(":disabled") ? !0 : !n && (r.hasAttribute("disabled") || r.getAttribute("aria-disabled") === "true") : !1;
}
function Gi(e) {
	return e.visibility === "hidden" || e.visibility === "collapse";
}
function Ki(e, t = e ? sn(e) : null) {
	return !e || !e.isConnected || !t || Gi(t) ? !1 : typeof e.checkVisibility == "function" ? e.checkVisibility() : t.display !== "none" && t.display !== "contents";
}
// node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
var qi = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
function Ji(e) {
	let t = e.assignedSlot;
	if (t) return t;
	if (e.parentElement) return e.parentElement;
	let n = e.getRootNode();
	return Jt(n) ? n.host : null;
}
function Yi(e) {
	for (let t of Array.from(e.children)) if (Ht(t) === "summary") return t;
	return null;
}
function Xi(e, t) {
	let n = Yi(t);
	return !!n && (e === n || X(n, e));
}
function Zi(e) {
	let t = e ? Ht(e) : "";
	return e != null && e.matches(qi) && (t !== "summary" || e.parentElement != null && Ht(e.parentElement) === "details" && Yi(e.parentElement) === e) && (t !== "details" || Yi(e) == null) && (t !== "input" || e.type !== "hidden");
}
function Qi(e) {
	if (!Zi(e) || !e.isConnected || e.matches(":disabled")) return !1;
	for (let t = e; t; t = Ji(t)) {
		let n = t !== e, r = Ht(t) === "slot";
		if (t.hasAttribute("inert") || n && Ht(t) === "details" && !t.open && !Xi(e, t) || t.hasAttribute("hidden") || !r && !$i(t, n)) return !1;
	}
	return !0;
}
function $i(e, t) {
	let n = sn(e);
	return t ? n.display !== "none" : Ki(e, n);
}
function ea(e) {
	let t = e.tabIndex;
	if (t < 0) {
		let t = Ht(e);
		if (t === "details" || t === "audio" || t === "video" || qt(e) && e.isContentEditable) return 0;
	}
	return t;
}
function ta(e) {
	if (Ht(e) !== "input") return null;
	let t = e;
	return t.type === "radio" && t.name !== "" ? t : null;
}
function na(e, t) {
	let n = ta(e);
	if (!n) return !0;
	let r = t.find((e) => {
		let t = ta(e);
		return t?.name === n.name && t.form === n.form && t.checked;
	});
	return r ? r === n : t.find((e) => {
		let t = ta(e);
		return t?.name === n.name && t.form === n.form;
	}) === n;
}
function ra(e) {
	if (qt(e) && Ht(e) === "slot") {
		let t = e.assignedElements({ flatten: !0 });
		if (t.length > 0) return t;
	}
	return qt(e) && e.shadowRoot ? Array.from(e.shadowRoot.children) : Array.from(e.children);
}
function ia(e, t) {
	ra(e).forEach((e) => {
		Zi(e) && t.push(e), ia(e, t);
	});
}
function aa(e, t, n) {
	ra(e).forEach((e) => {
		qt(e) && e.matches(t) && n.push(e), aa(e, t, n);
	});
}
function oa(e) {
	return Qi(e) && ea(e) >= 0;
}
function sa(e) {
	let t = [];
	return ia(e, t), t.filter(Qi);
}
function ca(e) {
	let t = sa(e);
	return t.filter((e) => ea(e) >= 0 && na(e, t));
}
function la(e, t) {
	let n = ca(e), r = n.length;
	if (r === 0) return;
	let i = jr(xn(e)), a = n.indexOf(i);
	return n[a === -1 ? t === 1 ? 0 : r - 1 : a + t];
}
function ua(e) {
	return la(xn(e).body, 1) || e;
}
function da(e) {
	return la(xn(e).body, -1) || e;
}
function fa(e, t, n) {
	if (!e) return null;
	let r = [];
	ia(xn(e).body, r);
	let i = r.indexOf(e);
	if (i === -1) return null;
	let a = r.filter(Qi);
	for (let e = 1; e < r.length; e += 1) {
		let o = r[(i + t * e + r.length) % r.length];
		if (!X(n, o) && oa(o) && na(o, a)) return o;
	}
	return r[i];
}
function pa(e, t) {
	let n = t || e.currentTarget, r = e.relatedTarget;
	return !r || !X(n, r);
}
function ma(e) {
	ca(e).forEach((e) => {
		e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
	});
}
function ha(e) {
	let t = [];
	aa(e, "[data-tabindex]", t), t.forEach((e) => {
		let t = e.dataset.tabindex;
		delete e.dataset.tabindex, t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex");
	});
}
// node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function ga(e, t, n = !0) {
	return e.filter((e) => e.parentId === t).flatMap((t) => [...!n || t.context?.open ? [t] : [], ...ga(e, t.id, n)]);
}
function _a(e, t) {
	let n = [], r = e.find((e) => e.id === t)?.parentId;
	for (; r;) {
		let t = e.find((e) => e.id === r);
		r = t?.parentId, t && (n = n.concat(t));
	}
	return n;
}
// node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function va(e) {
	return `data-base-ui-${e}`;
}
// node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs
var ya = 0;
function ba(e, t = {}) {
	let { preventScroll: n = !1, sync: r = !1, shouldFocus: i } = t;
	cancelAnimationFrame(ya);
	function a() {
		(!i || i()) && e?.focus({ preventScroll: n });
	}
	if (r) return a(), Se;
	let o = requestAnimationFrame(a);
	return ya = o, () => {
		ya === o && (cancelAnimationFrame(o), ya = 0);
	};
}
// node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs
var xa = "data-base-ui-inert", Sa = /* @__PURE__ */ new WeakMap(), Ca = /* @__PURE__ */ new WeakSet(), wa = /* @__PURE__ */ new WeakMap(), Ta = 0;
function Ea(e) {
	return e ? Jt(e) ? e.host : Ea(e.parentNode) : null;
}
var Da = (e, t) => t.map((t) => {
	if (e.contains(t)) return t;
	let n = Ea(t);
	return e.contains(n) ? n : null;
}).filter((e) => e != null), Oa = (e) => {
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => {
		let n = e;
		for (; n && !t.has(n);) t.add(n), n = n.parentNode;
	}), t;
}, ka = (e, t, n) => {
	let r = [], i = (e) => {
		e && !n.has(e) && Array.from(e.children).forEach((e) => {
			Ht(e) !== "script" && (t.has(e) ? i(e) : r.push(e));
		});
	};
	return i(e), r;
};
function Aa(e, t, n, { mark: r = !0 }) {
	let i = Da(t, e), a = r ? ka(t, Oa(i), new Set(i)) : [], o = [], s = [];
	if (n) {
		let e = Da(t, Array.from(t.querySelectorAll("[aria-live]"))), n = i.concat(e);
		ka(t, Oa(n), new Set(n)).forEach((e) => {
			let t = e.getAttribute("aria-hidden"), n = t !== null && t !== "false", r = (Sa.get(e) || 0) + 1;
			Sa.set(e, r), o.push(e), r === 1 && n && Ca.add(e), n || e.setAttribute("aria-hidden", "true");
		});
	}
	return r && a.forEach((e) => {
		let t = (wa.get(e) || 0) + 1;
		wa.set(e, t), s.push(e), t === 1 && e.setAttribute(xa, "");
	}), Ta += 1, () => {
		o.forEach((e) => {
			let t = (Sa.get(e) || 0) - 1;
			Sa.set(e, t), t || (Ca.has(e) || e.removeAttribute("aria-hidden"), Ca.delete(e));
		}), r && s.forEach((e) => {
			let t = (wa.get(e) || 0) - 1;
			wa.set(e, t), t || e.removeAttribute(xa);
		}), --Ta, Ta || (Sa = /* @__PURE__ */ new WeakMap(), Ca = /* @__PURE__ */ new WeakSet(), wa = /* @__PURE__ */ new WeakMap());
	};
}
function ja(e, t = {}) {
	let { ariaHidden: n = !1, mark: r = !0 } = t, i = xn(e[0]).body;
	return Aa(e, i, n, { mark: r });
}
// node_modules/@base-ui/react/internals/constants.mjs
var Ma = { style: { transition: "none" } }, Na = "data-base-ui-click-trigger", Pa = { fallbackAxisSide: "none" }, Fa = { fallbackAxisSide: "end" }, Ia = {
	clipPath: "inset(50%)",
	position: "fixed",
	top: 0,
	left: 0
}, La = /*#__PURE__*/ _.createContext(null), Ra = () => _.useContext(La), za = va("portal");
function Ba(e = {}) {
	let { ref: t, container: n, componentProps: r = we, elementProps: i } = e, a = Zn(), o = Ra()?.portalNode, [s, c] = _.useState(null), [l, u] = _.useState(null), d = q((e) => {
		e !== null && u(e);
	}), f = _.useRef(null);
	J(() => {
		if (n === null) {
			f.current && (f.current = null, u(null), c(null));
			return;
		}
		let e = (n && (Gt(n) ? n : n.current)) ?? o ?? document.body;
		e == null ? f.current && (f.current = null, u(null), c(null)) : f.current !== e && (f.current = e, u(null), c(e));
	}, [n, o]);
	let p = He("div", r, {
		ref: [t, d],
		props: [{
			id: a,
			[za]: ""
		}, i]
	}), m = s && p ? /*#__PURE__*/ v.createPortal(p, s) : null;
	return {
		node: l,
		nodeId: /*#__PURE__*/ _.isValidElement(p) ? p.props.id : void 0,
		subtree: m
	};
}
var Va = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, children: a, container: o, portalOwnerRole: s, ...c } = e, { node: l, nodeId: u, subtree: d } = Ba({
		container: o,
		ref: t,
		componentProps: e,
		elementProps: c
	}), f = _.useRef(null), p = _.useRef(null), m = _.useRef(null), h = _.useRef(null), [g, y] = _.useState(null), b = _.useRef(!1), x = g?.modal, S = g?.open, C = !!g && !g.modal && g.open && !!l;
	_.useEffect(() => {
		if (!l || x) return;
		function e(e) {
			l && e.relatedTarget && pa(e) && (e.type === "focusin" ? b.current &&= (ha(l), !1) : (ma(l), b.current = !0));
		}
		return ai(ii(l, "focusin", e, !0), ii(l, "focusout", e, !0));
	}, [l, x]), J(() => {
		l && S === !0 && b.current && (ha(l), b.current = !1);
	}, [S, l]);
	let w = _.useMemo(() => ({
		beforeOutsideRef: f,
		afterOutsideRef: p,
		beforeInsideRef: m,
		afterInsideRef: h,
		portalNode: l,
		setFocusManagerState: y
	}), [l]);
	return /*#__PURE__*/ (0, Y.jsxs)(_.Fragment, { children: [d, /*#__PURE__*/ (0, Y.jsxs)(La.Provider, {
		value: w,
		children: [
			C && l && /*#__PURE__*/ (0, Y.jsx)(di, {
				"data-type": "outside",
				ref: f,
				onFocus: (e) => {
					pa(e, l) ? m.current?.focus() : da(g ? g.domReference : null)?.focus();
				}
			}),
			C && l && /*#__PURE__*/ (0, Y.jsx)("span", {
				role: s,
				"aria-owns": u,
				style: Ia
			}),
			l && /*#__PURE__*/ v.createPortal(a, l),
			C && l && /*#__PURE__*/ (0, Y.jsx)(di, {
				"data-type": "outside",
				ref: p,
				onFocus: (e) => {
					pa(e, l) ? h.current?.focus() : (ua(g ? g.domReference : null)?.focus(), g?.closeOnFocusOut && g?.onOpenChange(!1, $n("focus-out", e.nativeEvent)));
				}
			})
		]
	})] });
});
// node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function Ha() {
	let e = /* @__PURE__ */ new Map();
	return {
		emit(t, n) {
			e.get(t)?.forEach((e) => e(n));
		},
		on(t, n) {
			e.has(t) || e.set(t, /* @__PURE__ */ new Set()), e.get(t).add(n);
		},
		off(t, n) {
			e.get(t)?.delete(n);
		}
	};
}
// node_modules/@base-ui/react/floating-ui-react/components/FloatingTreeStore.mjs
var Ua = class {
	nodesRef = { current: [] };
	events = Ha();
	addNode(e) {
		this.nodesRef.current.push(e);
	}
	removeNode(e) {
		let t = this.nodesRef.current.findIndex((t) => t === e);
		t !== -1 && this.nodesRef.current.splice(t, 1);
	}
}, Wa = /*#__PURE__*/ _.createContext(null), Ga = /*#__PURE__*/ _.createContext(null), Ka = () => _.useContext(Wa)?.id || null, qa = (e) => {
	let t = _.useContext(Ga);
	return e ?? t;
};
function Ja(e) {
	let t = Zn(), n = qa(e), r = Ka();
	return J(() => {
		if (!t) return;
		let e = {
			id: t,
			parentId: r
		};
		return n?.addNode(e), () => {
			n?.removeNode(e);
		};
	}, [
		n,
		t,
		r
	]), t;
}
function Ya(e) {
	let { children: t, id: n } = e, r = Ka();
	return /*#__PURE__*/ (0, Y.jsx)(Wa.Provider, {
		value: _.useMemo(() => ({
			id: n,
			parentId: r
		}), [n, r]),
		children: t
	});
}
function Xa(e) {
	let { children: t, externalTree: n } = e, r = G(() => n ?? new Ua()).current;
	return /*#__PURE__*/ (0, Y.jsx)(Ga.Provider, {
		value: r,
		children: t
	});
}
// node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs
function Za(e, t) {
	let n = Ut(Nr(e));
	return e instanceof n.KeyboardEvent ? "keyboard" : e instanceof n.FocusEvent ? t || "keyboard" : "pointerType" in e ? e.pointerType || (Dr(e) ? "keyboard" : t || "mouse") : "touches" in e ? "touch" : e instanceof n.MouseEvent ? t || (e.detail === 0 ? "keyboard" : "mouse") : "";
}
var Qa = 20, $a = [];
function eo() {
	$a = $a.filter((e) => e.deref()?.isConnected);
}
function to(e) {
	eo(), e && Ht(e) !== "body" && ($a.push(new WeakRef(e)), $a.length > Qa && ($a = $a.slice(-20)));
}
function no() {
	return eo(), $a[$a.length - 1]?.deref();
}
function ro(e) {
	return e ? oa(e) ? e : ca(e)[0] || e : null;
}
function io(e) {
	if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !e.getAttribute("role")?.includes("dialog")) return;
	let t = sa(e).filter((e) => {
		let t = e.getAttribute("data-tabindex") || "";
		return oa(e) || e.hasAttribute("data-tabindex") && !t.startsWith("-");
	}), n = e.getAttribute("tabindex");
	t.length === 0 ? n !== "0" && (e.setAttribute("tabindex", "0"), e.setAttribute("data-tabindex", "0")) : (n !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tabindex", "-1"));
}
function ao(e) {
	let { context: t, children: n, disabled: r = !1, initialFocus: i = !0, returnFocus: a = !0, explicitReturnFocus: o, restoreFocus: s = !1, modal: c = !0, closeOnFocusOut: l = !0, openInteractionType: u = "", nextFocusableElement: d, previousFocusableElement: f, beforeContentFocusGuardRef: p, externalTree: m, getInsideElements: h } = e, g = t.useState("open"), v = t.useState("domReferenceElement"), y = t.useState("floatingElement"), { events: b, dataRef: x } = t.context, S = q(() => x.current.floatingContext?.nodeId), C = i === !1, w = Kr(v) && C, T = oi(i), E = oi(a), D = oi(o), O = oi(u), k = oi(g), A = qa(m), j = Ra(), M = _.useRef(!1), N = _.useRef(!1), P = _.useRef(!1), F = _.useRef(null), I = _.useRef(""), L = _.useRef(""), R = _.useRef(null), z = _.useRef(null), B = pe(R, p, j?.beforeInsideRef), V = pe(z, j?.afterInsideRef), ee = wr(), H = wr(), te = sr(), ne = j != null, re = Jr(y), ie = q((e = re) => e ? ca(e) : []), ae = q(() => h?.().filter((e) => e != null) ?? []);
	_.useEffect(() => {
		if (r || !c) return;
		function e(e) {
			e.key === "Tab" && X(re, jr(xn(re))) && ie().length === 0 && !w && Tr(e);
		}
		return ii(xn(re), "keydown", e);
	}, [
		r,
		re,
		c,
		w,
		ie
	]), _.useEffect(() => {
		if (r || !g) return;
		let e = xn(re);
		function t() {
			P.current = !1;
		}
		function n(e) {
			let t = Nr(e), n = ae(), r = X(y, t) || X(v, t) || X(j?.portalNode, t) || n.some((e) => e === t || X(e, t));
			P.current = !r, L.current = e.pointerType || "keyboard", Mr(t, "[data-base-ui-click-trigger]") && (N.current = !0, H.start(0, () => {
				N.current = !1;
			}));
		}
		function i() {
			L.current = "keyboard";
		}
		return ai(ii(e, "pointerdown", n, !0), ii(e, "pointerup", t, !0), ii(e, "pointercancel", t, !0), ii(e, "keydown", i, !0), t);
	}, [
		r,
		y,
		v,
		re,
		g,
		j,
		H,
		ae
	]), _.useEffect(() => {
		if (r || !l) return;
		let e = xn(re);
		function n() {
			N.current = !0, H.start(0, () => {
				N.current = !1;
			});
		}
		function i(e) {
			let t = Nr(e);
			oa(t) && (F.current = t);
		}
		function a(n) {
			let r = n.relatedTarget, i = n.currentTarget, a = Nr(n);
			c && r == null && a != null && X(y, a) && to(a), queueMicrotask(() => {
				let o = S(), l = t.context.triggerElements, u = ae(), p = r?.hasAttribute(va("focus-guard")) && [
					R.current,
					z.current,
					j?.beforeInsideRef.current,
					j?.afterInsideRef.current,
					j?.beforeOutsideRef.current,
					j?.afterOutsideRef.current,
					lr(f),
					lr(d)
				].includes(r), m = !(X(v, r) || X(y, r) || X(r, y) || X(j?.portalNode, r) || u.some((e) => e === r || X(e, r)) || l.hasMatchingElement((e) => X(e, r)) || p || A && (ga(A.nodesRef.current, o).find((e) => X(e.context?.elements.floating, r) || X(e.context?.elements.domReference, r)) || _a(A.nodesRef.current, o).find((e) => [e.context?.elements.floating, Jr(e.context?.elements.floating)].includes(r) || e.context?.elements.domReference === r)));
				if (i === v && re && io(re), s && i !== v && !Ki(a) && jr(e) === e.body) {
					if (qt(re) && (re.focus(), s === "popup")) {
						te.request(() => {
							re.focus();
						});
						return;
					}
					let e = ie(), t = F.current, n = (t && e.includes(t) ? t : null) || e[e.length - 1] || re;
					qt(n) && n.focus();
				}
				x.current.insideReactTree ? x.current.insideReactTree = !1 : (w || !c) && r && m && !N.current && (w || r !== no()) && (M.current = !0, t.setOpen(!1, $n(Ct, n)));
			});
		}
		function o() {
			P.current || (x.current.insideReactTree = !0, ee.start(0, () => {
				x.current.insideReactTree = !1;
			}));
		}
		let u = qt(v) ? v : null;
		if (y || u) return ai(u && ii(u, "focusout", a), u && ii(u, "pointerdown", n), y && ii(y, "focusin", i), y && ii(y, "focusout", a), y && j && ii(y, "focusout", o, !0));
	}, [
		r,
		v,
		y,
		re,
		c,
		A,
		j,
		t,
		l,
		s,
		ie,
		w,
		S,
		x,
		ee,
		H,
		te,
		d,
		f,
		ae
	]), _.useEffect(() => {
		if (r || !y || !g) return;
		let e = Array.from(j?.portalNode?.querySelectorAll(`[${va("portal")}]`) || []), t = (A ? _a(A.nodesRef.current, S()) : []).find((e) => Kr(e.context?.elements.domReference || null))?.context?.elements.domReference, n = ja([
			y,
			...e,
			R.current,
			z.current,
			j?.beforeOutsideRef.current,
			j?.afterOutsideRef.current,
			...ae(),
			t,
			lr(f),
			lr(d),
			w ? v : null
		].filter((e) => e != null), {
			ariaHidden: c || w,
			mark: !1
		}), i = ja([y, ...e].filter((e) => e != null));
		return () => {
			i(), n();
		};
	}, [
		g,
		r,
		v,
		y,
		c,
		j,
		w,
		A,
		S,
		d,
		f,
		ae
	]), J(() => {
		if (!g || r || !qt(re)) return;
		I.current = "", L.current = "";
		let e = xn(re), t = jr(e);
		queueMicrotask(() => {
			let n = T.current, r = typeof n == "function" ? n(O.current || "") : n;
			if (r === void 0 || r === !1 || X(re, t)) return;
			let i = null, a = () => (i ??= ie(re), i[0] || re), o;
			o = r === !0 || r === null ? a() : lr(r), o ||= a();
			let s = X(re, jr(e)), c = x.current.openEvent, l = c?.type === "mousedown" && Dr(c);
			ba(o, {
				sync: l,
				preventScroll: o === re,
				shouldFocus() {
					if (!k.current) return !1;
					if (s) return !0;
					let t = jr(e);
					return !(t !== o && X(re, t));
				}
			});
		});
	}, [
		r,
		g,
		re,
		ie,
		T,
		O,
		k,
		x
	]);
	let oe = _.useRef(null);
	J(() => {
		if (r || !re) {
			oe.current = null;
			return;
		}
		oe.current &&= (oe.current.cancelled = !0, null);
		let e = xn(re), t = jr(e), n = O.current == null;
		to(t);
		function i(e) {
			if (e.open || (I.current = Za(e.nativeEvent, L.current)), (e.reason === "focus-out" && e.triggerElement?.hasAttribute(va("focus-guard")) || e.reason === "trigger-hover" && e.nativeEvent.type === "mouseleave") && (M.current = !0), e.reason === "outside-press") {
				if (e.nested) M.current = !1;
				else if (Dr(e.nativeEvent) || Or(e.nativeEvent)) M.current = !1;
				else {
					let e = !1;
					xn(re).createElement("div").focus({ get preventScroll() {
						return e = !0, !1;
					} }), e ? M.current = !1 : M.current = !0;
				}
			}
		}
		b.on("openchange", i);
		function a(e) {
			let r = E.current, i = typeof r == "function" ? r(e) : r;
			if (i === void 0 || i === !1) return null;
			i === null && (i = !0);
			let a = v?.isConnected ? v : null, o = t?.isConnected && Ht(t) !== "body" ? t : null, s = n ? o || a : a || o;
			return s ||= no() || null, typeof i == "boolean" ? s : lr(i) || s || null;
		}
		return () => {
			b.off("openchange", i);
			let t = jr(e), n = ae(), r = X(y, t) || n.some((e) => e === t || X(e, t)) || A && ga(A.nodesRef.current, S(), !1).some((e) => X(e.context?.elements.floating, t)), o = E.current, s = I.current, c = a(s), l = { cancelled: !1 };
			oe.current = l, queueMicrotask(() => {
				oe.current === l && (oe.current = null);
				let n = ro(c), i = D.current ?? typeof o != "boolean";
				if (!l.cancelled && o && !M.current && qt(n) && (i || n === t || t === e.body || r)) {
					let e = { preventScroll: !0 };
					s === "keyboard" && (e.focusVisible = !0), n.focus(e);
				}
				M.current = !1;
			});
		};
	}, [
		r,
		y,
		re,
		E,
		D,
		O,
		b,
		A,
		v,
		S,
		ae
	]), J(() => {
		if (!Ln || g || !y) return;
		let e = jr(xn(y));
		qt(e) && Wr(e) && X(y, e) && e.blur();
	}, [g, y]), J(() => {
		if (!r && j) return j.setFocusManagerState({
			modal: c,
			closeOnFocusOut: l,
			open: g,
			onOpenChange: t.setOpen,
			domReference: v
		}), () => {
			j.setFocusManagerState(null);
		};
	}, [
		r,
		j,
		c,
		g,
		t,
		l,
		v
	]), J(() => {
		if (!r && re) return io(re), () => {
			queueMicrotask(eo);
		};
	}, [r, re]);
	let se = !r && (!c || !w) && (ne || c);
	return /*#__PURE__*/ (0, Y.jsxs)(_.Fragment, { children: [
		se && /*#__PURE__*/ (0, Y.jsx)(di, {
			"data-type": "inside",
			ref: B,
			onFocus: (e) => {
				if (c) {
					let e = ie();
					ba(e[e.length - 1]);
				} else j?.portalNode && (M.current = !1, pa(e, j.portalNode) ? ua(v)?.focus() : lr(f ?? j.beforeOutsideRef)?.focus());
			}
		}),
		n,
		se && /*#__PURE__*/ (0, Y.jsx)(di, {
			"data-type": "inside",
			ref: V,
			onFocus: (e) => {
				c ? ba(ie()[0]) : j?.portalNode && (l && (M.current = !0), pa(e, j.portalNode) ? da(v)?.focus() : lr(d ?? j.afterOutsideRef)?.focus());
			}
		})
	] });
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs
function oo(e, t = {}) {
	let { enabled: n = !0, event: r = "click", toggle: i = !0, ignoreMouse: a = !1, stickIfOpen: o = !0, touchOpenDelay: s = 0, reason: c = _t } = t, l = e.context.dataRef, u = _.useRef(void 0), d = sr(), f = wr(), p = _.useMemo(() => {
		function t(t, n, r, i) {
			let a = $n(c, n, r);
			t && i === "touch" && s > 0 ? f.start(s, () => {
				e.setOpen(!0, a);
			}) : e.setOpen(t, a);
		}
		function n(t, n, r) {
			let a = l.current.openEvent, s = e.select("domReferenceElement") !== n;
			return t && s || !t || !i ? !0 : a && (typeof o == "function" ? o() : o) ? !r(a.type) : !1;
		}
		return {
			onPointerDown(e) {
				u.current = kr(e.pointerType, !0) && Or(e.nativeEvent) ? "virtual" : e.pointerType;
			},
			onMouseDown(i) {
				let o = u.current, s = i.nativeEvent, c = e.select("open");
				if (i.button !== 0 || r === "click" || kr(o, !0) && a) return;
				let l = n(c, i.currentTarget, (e) => e === "click" || e === "mousedown"), f = Nr(s), p = Wr(f);
				if (p || o === "virtual") {
					t(l, s, p ? f : i.currentTarget, o);
					return;
				}
				let m = i.currentTarget;
				d.request(() => {
					t(l, s, m, o);
				});
			},
			onClick(i) {
				if (r === "mousedown-only") return;
				let o = u.current;
				r === "mousedown" && o ? u.current = void 0 : kr(o, !0) && a || t(n(e.select("open"), i.currentTarget, (e) => e === "click" || e === "mousedown" || e === "keydown" || e === "keyup"), i.nativeEvent, i.currentTarget, o);
			},
			onKeyDown() {
				u.current = void 0;
			}
		};
	}, [
		l,
		r,
		a,
		c,
		e,
		o,
		i,
		d,
		f,
		s
	]);
	return _.useMemo(() => n ? { reference: p } : we, [n, p]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useClientPoint.mjs
function so(e, t) {
	let n = null, r = null, i = !1;
	return {
		contextElement: e || void 0,
		getBoundingClientRect() {
			let a = e?.getBoundingClientRect() || {
				width: 0,
				height: 0,
				x: 0,
				y: 0
			}, o = t.axis === "x" || t.axis === "both", s = t.axis === "y" || t.axis === "both", c = ["mouseenter", "mousemove"].includes(t.dataRef.current.openEvent?.type || "") && t.pointerType !== "touch", l = t.axis === "y" ? a.width : 0, u = t.axis === "x" ? a.height : 0, d = a.x, f = a.y;
			return n == null && t.x && o && (n = a.x - t.x), r == null && t.y && s && (r = a.y - t.y), d -= n || 0, f -= r || 0, (!i || c) && (d = o && t.x != null ? t.x : d, f = s && t.y != null ? t.y : f), i = !0, {
				width: l,
				height: u,
				x: d,
				y: f,
				top: f,
				right: d + l,
				bottom: f + u,
				left: d
			};
		}
	};
}
function co(e) {
	return e != null && e.clientX != null;
}
function lo(e, t = {}) {
	let { enabled: n = !0, axis: r = "both" } = t, i = e.useState("open"), a = e.useState("floatingElement"), o = e.useState("domReferenceElement"), s = e.context.dataRef, c = _.useRef(!1), l = _.useRef(null), [u, d] = _.useState(), [f, p] = _.useState([]), m = q((t) => {
		e.set("positionReference", t);
	}), h = q((t, n, i) => {
		c.current || (!s.current.openEvent || co(s.current.openEvent)) && e.set("positionReference", so(i ?? o, {
			x: t,
			y: n,
			axis: r,
			dataRef: s,
			pointerType: u
		}));
	}), g = q((e) => {
		i ? l.current || (h(e.clientX, e.clientY, e.currentTarget), p([])) : h(e.clientX, e.clientY, e.currentTarget);
	}), v = kr(u) ? a : i;
	_.useEffect(() => {
		if (!n) {
			m(o);
			return;
		}
		if (!v) return;
		function e() {
			l.current?.(), l.current = null;
		}
		let t = Ut(a);
		function r(t) {
			let n = Nr(t);
			X(a, n) ? e() : h(t.clientX, t.clientY);
		}
		return !s.current.openEvent || co(s.current.openEvent) ? l.current = ii(t, "mousemove", r) : m(o), e;
	}, [
		v,
		n,
		a,
		s,
		o,
		e,
		h,
		m,
		f
	]), _.useEffect(() => () => {
		e.set("positionReference", null);
	}, [e]), _.useEffect(() => {
		n && !a && (c.current = !1);
	}, [n, a]), _.useEffect(() => {
		!n && i && (c.current = !0);
	}, [n, i]);
	let y = _.useMemo(() => {
		function e(e) {
			d(e.pointerType);
		}
		return {
			onPointerDown: e,
			onPointerEnter: e,
			onMouseMove: g,
			onMouseEnter: g
		};
	}, [g]);
	return _.useMemo(() => n ? {
		reference: y,
		trigger: y
	} : {}, [n, y]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs
function uo() {
	return !1;
}
function fo(e) {
	return {
		escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? !1,
		outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? !0
	};
}
function po(e, t = {}) {
	let { enabled: n = !0, escapeKey: r = !0, outsidePress: i = !0, outsidePressEvent: a = "sloppy", referencePress: o = uo, bubbles: s, externalTree: c } = t, l = e.useState("open"), u = e.useState("floatingElement"), { dataRef: d, events: f } = e.context, p = qa(c), m = q(typeof i == "function" ? i : () => !1), h = typeof i == "function" ? m : i, g = h !== !1, v = q(() => a), { escapeKey: y, outsidePress: b } = fo(s), x = _.useRef(!1), S = _.useRef(!1), C = _.useRef(!1), w = _.useRef(!1), T = _.useRef(!1), E = _.useRef(""), D = _.useRef(null), O = wr(), k = wr(), A = wr(), j = q(() => {
		k.clear(), d.current.insideReactTree = !1;
	}), M = q((e) => {
		let t = d.current.floatingContext?.nodeId;
		return (p ? ga(p.nodesRef.current, t) : []).some((t) => t.context?.open && !t.context.dataRef.current[e]);
	}), N = q((t) => Hr(t, e.select("floatingElement")) || Hr(t, e.select("domReferenceElement"))), P = q((t) => {
		o() && e.setOpen(!1, $n(_t, t.nativeEvent));
	}), F = q((t) => {
		if (!l || !n || !r || t.key !== "Escape") return;
		let i = Er(t) ? t.nativeEvent : t;
		if (T.current || i.isComposing || !y && M("__escapeKeyBubbles")) return;
		let a = $n(wt, i);
		e.setOpen(!1, a), a.isCanceled || t.preventDefault(), !y && !a.isPropagationAllowed && t.stopPropagation();
	}), I = q(() => {
		d.current.insideReactTree = !0, k.start(0, j);
	}), L = q((t) => {
		if (!l || !n || t.button !== 0) return;
		let r = Nr(t.nativeEvent);
		X(e.select("floatingElement"), r) && (x.current || (x.current = !0, S.current = !1));
	}), R = q((e) => {
		l && n && (e.defaultPrevented || e.nativeEvent.defaultPrevented) && x.current && (S.current = !0);
	});
	_.useEffect(() => {
		function e(e) {
			e.open || (w.current = !1);
		}
		return f.on("openchange", e), () => {
			f.off("openchange", e);
		};
	}, [f]), _.useEffect(() => j, [j]), _.useEffect(() => {
		if (!l || !n) return l || (w.current = !1, T.current = !1, E.current = "", D.current = null), j;
		d.current.__escapeKeyBubbles = y, d.current.__outsidePressBubbles = b;
		let t = new Cr(), i = xn(u);
		function a() {
			A.clear(), T.current = !0;
		}
		function o() {
			T.current = !0, A.start(Ln ? 5 : 0, () => {
				T.current = !1;
			});
		}
		function s() {
			C.current = !0, t.start(0, () => {
				C.current = !1;
			});
		}
		function c() {
			x.current = !1, S.current = !1;
		}
		function f() {
			let e = E.current, t = e === "pen" || !e ? "mouse" : e, n = v(), r = typeof n == "function" ? n() : n;
			return typeof r == "string" ? r : r[t];
		}
		function m(e) {
			let t = f();
			return t === "intentional" && e.type !== "click" || t === "sloppy" && e.type === "click";
		}
		function _(e) {
			let t = d.current.floatingContext?.nodeId, n = p && ga(p.nodesRef.current, t).some((t) => Hr(e, t.context?.elements.floating));
			return N(e) || n;
		}
		function k(n) {
			if (m(n)) {
				n.type !== "click" && !N(n) && (t.clear(), C.current = !1), j();
				return;
			}
			if (d.current.insideReactTree) {
				j();
				return;
			}
			let r = Nr(n), i = `[${va("inert")}]`, a = Kt(r) ? r.getRootNode() : null, o = Array.from((Jt(a) ? a : xn(e.select("floatingElement"))).querySelectorAll(i)), s = e.context.triggerElements;
			if (r && (s.hasElement(r) || s.hasMatchingElement((e) => X(e, r)))) return;
			let c = Kt(r) ? r : null;
			for (; c && !on(c);) {
				let e = ln(c);
				if (on(e) || !Kt(e)) break;
				c = e;
			}
			if (!(o.length && Kt(r) && !Ur(r) && !X(r, e.select("floatingElement")) && o.every((e) => !X(c, e)))) {
				if (qt(r) && !("touches" in n)) {
					let e = on(r), t = sn(r), i = /auto|scroll/, a = e || i.test(t.overflowX), o = e || i.test(t.overflowY), s = a && r.clientWidth > 0 && r.scrollWidth > r.clientWidth, c = o && r.clientHeight > 0 && r.scrollHeight > r.clientHeight, l = t.direction === "rtl", u = c && (l ? n.offsetX <= r.offsetWidth - r.clientWidth : n.offsetX > r.clientWidth), d = s && n.offsetY > r.clientHeight;
					if (u || d) return;
				}
				if (!_(n)) {
					if (f() === "intentional") {
						if (n.detail !== 0 && !Dr(n) && !w.current) return;
						if (C.current) {
							t.clear(), C.current = !1;
							return;
						}
					}
					typeof h == "function" && !h(n) || M("__outsidePressBubbles") || (e.setOpen(!1, $n(bt, n)), j());
				}
			}
		}
		function P(t) {
			f() === "sloppy" && t.pointerType !== "touch" && e.select("open") && n && !N(t) && k(t);
		}
		function I(t) {
			if (f() !== "sloppy" || !e.select("open") || !n || N(t)) return;
			let r = t.touches[0];
			r && (D.current = {
				startTime: Date.now(),
				startX: r.clientX,
				startY: r.clientY,
				dismissOnTouchEnd: !1,
				dismissOnMouseDown: !0
			}, O.start(1e3, () => {
				D.current && (D.current.dismissOnTouchEnd = !1, D.current.dismissOnMouseDown = !1);
			}));
		}
		function L(e, t) {
			let n = Nr(e);
			if (!n) return;
			let r = ii(n, e.type, () => {
				t(e), r();
			});
		}
		function R(e) {
			E.current = "touch", L(e, I);
		}
		function z(e) {
			O.clear(), e.type === "pointerdown" && (e.button === 0 && (w.current = !0), E.current = e.pointerType), (e.type !== "mousedown" || !D.current || D.current.dismissOnMouseDown) && L(e, (e) => {
				e.type === "pointerdown" ? P(e) : k(e);
			});
		}
		function B(e) {
			if (e.type === "pointercancel" && (w.current = !1), !x.current) return;
			let n = S.current;
			c(), f() === "intentional" && (e.type === "pointercancel" ? n && s() : _(e) || (n ? s() : (typeof h != "function" || h(e)) && (t.clear(), C.current = !0, j())));
		}
		function V(e) {
			if (f() !== "sloppy" || !D.current || N(e)) return;
			let t = e.touches[0];
			if (!t) return;
			let n = Math.abs(t.clientX - D.current.startX), r = Math.abs(t.clientY - D.current.startY), i = Math.sqrt(n * n + r * r);
			i > 5 && (D.current.dismissOnTouchEnd = !0), i > 10 && (k(e), O.clear(), D.current = null);
		}
		function ee(e) {
			L(e, V);
		}
		function H(e) {
			f() === "sloppy" && D.current && !N(e) && (D.current.dismissOnTouchEnd && k(e), O.clear(), D.current = null);
		}
		function te(e) {
			L(e, H);
		}
		let ne = ai(r && ai(ii(i, "keydown", F), ii(i, "compositionstart", a), ii(i, "compositionend", o)), g && ai(ii(i, "click", z, !0), ii(i, "pointerdown", z, !0), ii(i, "pointerup", B, !0), ii(i, "pointercancel", B, !0), ii(i, "mousedown", z, !0), ii(i, "mouseup", B, !0), ii(i, "touchstart", R, {
			capture: !0,
			passive: !0
		}), ii(i, "touchmove", ee, {
			capture: !0,
			passive: !0
		}), ii(i, "touchend", te, {
			capture: !0,
			passive: !0
		})));
		return () => {
			ne(), t.clear(), c(), C.current = !1;
		};
	}, [
		d,
		u,
		r,
		g,
		h,
		l,
		n,
		y,
		b,
		F,
		j,
		v,
		M,
		N,
		p,
		e,
		O,
		A
	]);
	let z = _.useMemo(() => ({
		onKeyDown: F,
		onPointerDown: P,
		onClick: P
	}), [F, P]), B = _.useMemo(() => ({
		onKeyDown: F,
		onPointerDown: R,
		onMouseDown: R,
		onClickCapture: I,
		onMouseDownCapture(e) {
			I(), L(e);
		},
		onPointerDownCapture(e) {
			I(), L(e);
		},
		onMouseUpCapture: I,
		onTouchEndCapture: I,
		onTouchMoveCapture: I
	}), [
		F,
		I,
		L,
		R
	]);
	return _.useMemo(() => n ? {
		reference: z,
		floating: B,
		trigger: z
	} : {}, [
		n,
		z,
		B
	]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useSyncedFloatingRootContext.mjs
function mo(e) {
	let { popupStore: t, treatPopupAsFloatingElement: n = !1, floatingRootContext: r, floatingId: i, nested: a, onOpenChange: o } = e, s = t.useState("open"), c = t.useState("activeTriggerElement"), l = t.useState(n ? "popupElement" : "positionerElement"), u = o;
	return t.useSyncedValue("floatingId", i), J(() => {
		let e = {
			open: s,
			floatingId: i,
			referenceElement: c,
			floatingElement: l
		};
		Kt(c) && (e.domReferenceElement = c), r.state.positionReference === r.state.referenceElement && (e.positionReference = c), r.update(e);
	}, [
		s,
		i,
		c,
		l,
		r
	]), r.context.onOpenChange = u, r.context.nested = a, r;
}
// node_modules/@base-ui/react/internals/useUnmountAfterClose.mjs
function ho(e) {
	let { open: t, ref: n, preventUnmountOnClose: r, setPreventUnmountOnClose: i, onUnmount: a, animateInitialOpen: o } = e, s = q(i), { mounted: c, setMounted: l, transitionStatus: u } = cr(t, !1, !1, o), d = !t && r;
	J(() => {
		t && s(!1);
	}, [t, s]);
	let f = _.useRef(c), p = _.useRef(!1), m = qn(), h = () => {
		f.current = !1, l(!1), a();
	};
	J(() => {
		f.current = c, p.current && (p.current = !1, !t && c && h());
	});
	let g = q(() => {
		f.current && (t ? (p.current = !0, m()) : h());
	});
	return mr({
		enabled: c && !t && !d,
		open: t,
		ref: n,
		onComplete() {
			t || g();
		}
	}), {
		mounted: c,
		transitionStatus: u,
		preventUnmountingOnClose: d,
		forceUnmount: g
	};
}
// node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs
var go = {
	tabIndex: -1,
	[Pr]: ""
};
function _o(e) {
	return (t) => t !== "touch" || e.current;
}
function vo(e, t = !1) {
	let n = Zn(), r = Ka() != null, i = G(() => e(n, r)).current;
	return mo({
		popupStore: i,
		treatPopupAsFloatingElement: t,
		floatingRootContext: i.state.floatingRootContext,
		floatingId: n,
		nested: r,
		onOpenChange: i.setOpen
	}), i;
}
function yo({ handle: e, store: t }) {
	return J(() => e.attachStore(t), [e, t]), null;
}
function bo(e) {
	let t = e.context.triggerElements.size;
	e.select("open") && e.state.triggerCount !== t && e.set("triggerCount", t);
}
function xo(e, t) {
	let n = _.useRef(null);
	return q((r) => {
		let i = n.current;
		if (i !== null) {
			if (i.element === r && i.store === t && i.id === e) return;
			n.current = null;
			let a = i.store;
			a.context.triggerElements.getById(i.id) === i.element && (a.context.triggerElements.delete(i.id), bo(a));
		}
		r !== null && e !== void 0 && (n.current = {
			store: t,
			id: e,
			element: r
		}, t.context.triggerElements.add(e, r), bo(t));
	});
}
function So(e, t, n, r = !1) {
	let i = e.preventUnmountingOnClose;
	t ? i = !1 : r && (i = !0);
	let a = n?.id ?? null, o = e.activeTriggerId, s = e.activeTriggerElement;
	return (a || t) && (o = a, s = n ?? null), {
		open: t,
		preventUnmountingOnClose: i,
		activeTriggerId: o,
		activeTriggerElement: s,
		openedWithoutTrigger: t ? n == null : e.openedWithoutTrigger
	};
}
function Co(e) {
	let t = !1;
	return e.preventUnmountOnClose = () => {
		t = !0;
	}, () => t;
}
function wo(e, t, n, r = {}) {
	let i = n.reason, a = i === vt, o = t && i === "trigger-focus", s = !t && (i === "trigger-press" || i === "escape-key"), c = Co(n);
	if (e.context.onOpenChange?.(t, n), n.isCanceled) return;
	r.onBeforeDispatch?.(), e.state.floatingRootContext.dispatchOpenChange(t, n);
	let l = () => {
		let i = So(e.state, t, n.trigger, c()), l = {
			...r.extraState,
			...i
		};
		o ? l.instantType = "focus" : s ? l.instantType = "dismiss" : a && (l.instantType = void 0), e.update(l);
	};
	a ? v.flushSync(l) : l();
}
function To(e, t, n, r) {
	let i = n.useState("isMountedByTrigger", e), a = xo(e, n), o = q((t) => {
		let i = n.select("open"), a = n.select("activeTriggerId");
		if (a === e) {
			let e = {
				activeTriggerElement: t,
				...i ? r : null
			};
			n.update(e);
		} else if (a == null && i && !n.state.openedWithoutTrigger) {
			let i = {
				activeTriggerId: e ?? null,
				activeTriggerElement: t,
				...r
			};
			n.update(i);
		}
	}), s = q((e) => {
		a(e), e && o(e);
	});
	return J(() => (s(t.current), () => s(null)), [
		s,
		t,
		n,
		e
	]), J(() => {
		if (i) {
			let e = {
				activeTriggerElement: t.current,
				...r
			};
			n.update(e);
		}
	}, [
		i,
		n,
		t,
		...Object.values(r)
	]), {
		registerTrigger: s,
		isMountedByThisTrigger: i
	};
}
function Eo(e, t = {}) {
	let { closeOnActiveTriggerUnmount: n = !1 } = t, r = _.useRef(null), i = e.useState("open");
	J(() => {
		if (!i) {
			r.current = null, e.state.triggerCount !== 0 && e.set("triggerCount", 0), e.state.openedWithoutTrigger && e.set("openedWithoutTrigger", !1);
			return;
		}
		let t = e.context.triggerElements.size, a = {};
		e.state.triggerCount !== t && (a.triggerCount = t);
		let o = e.select("activeTriggerId"), s = null;
		if (o) {
			let t = e.context.triggerElements.getById(o);
			if (t) r.current = o, t !== e.state.activeTriggerElement && (a.activeTriggerElement = t);
			else {
				for (let [t, n] of e.context.triggerElements.entries()) if (n === e.state.activeTriggerElement) {
					a.activeTriggerId = t, a.activeTriggerElement = n, r.current = t;
					break;
				}
				a.activeTriggerId === void 0 && (r.current === o ? s = o : r.current = null);
			}
		} else r.current = null;
		if (!s && !o && !e.state.openedWithoutTrigger && t === 1) {
			let t = e.context.triggerElements.entries().next();
			if (!t.done) {
				let [e, n] = t.value;
				a.activeTriggerId = e, a.activeTriggerElement = n, r.current = e;
			}
		}
		(a.triggerCount !== void 0 || a.activeTriggerId !== void 0 || a.activeTriggerElement !== void 0) && e.update(a), s && n && queueMicrotask(() => {
			if (e.select("open") && e.select("activeTriggerId") === s && !e.context.triggerElements.getById(s)) {
				let t = $n(gt);
				e.setOpen(!1, t), t.isCanceled || e.update({
					activeTriggerId: null,
					activeTriggerElement: null
				});
			}
		});
	}, [
		i,
		e,
		e.useState("triggerCount"),
		e.useState("activeTriggerId"),
		e.useState("activeTriggerElement"),
		n
	]);
}
function Do(e, t, n, r) {
	let { mounted: i, transitionStatus: a, forceUnmount: o } = ho({
		open: e,
		ref: t.context.popupRef,
		preventUnmountOnClose: t.useState("preventUnmountingOnClose"),
		setPreventUnmountOnClose: (e) => t.set("preventUnmountingOnClose", e),
		animateInitialOpen: r,
		onUnmount() {
			t.update({
				activeTriggerId: null,
				activeTriggerElement: null,
				mounted: !1,
				preventUnmountingOnClose: !1
			}), n?.(), t.context.onOpenChangeComplete?.(!1);
		}
	});
	return G(() => (t.set("mounted", i), null)), t.useSyncedValues({
		mounted: i,
		transitionStatus: a
	}), {
		forceUnmount: o,
		transitionStatus: a
	};
}
function Oo(e, t) {
	e.useSyncedValues(t), J(() => () => {
		e.update({
			activeTriggerProps: we,
			inactiveTriggerProps: we,
			popupProps: we
		});
	}, [e]);
}
function ko(e, t) {
	J(() => {
		!t && e.state.openMethod !== null && e.set("openMethod", null);
	}, [t, e]), J(() => () => {
		e.state.openMethod !== null && e.set("openMethod", null);
	}, [e]);
}
// node_modules/@base-ui/react/utils/popups/popupTriggerMap.mjs
var Ao = class {
	idMap = /* @__PURE__ */ new Map();
	add(e, t) {
		this.idMap.set(e, t);
	}
	delete(e) {
		this.idMap.delete(e);
	}
	hasElement(e) {
		for (let t of this.idMap.values()) if (t === e) return !0;
		return !1;
	}
	hasMatchingElement(e) {
		for (let t of this.idMap.values()) if (e(t)) return !0;
		return !1;
	}
	getById(e) {
		return this.idMap.get(e);
	}
	entries() {
		return this.idMap.entries();
	}
	elements() {
		return this.idMap.values();
	}
	get size() {
		return this.idMap.size;
	}
}, jo = /* @__PURE__ */ o(((e) => {
	var t = f();
	function n(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var r = typeof Object.is == "function" ? Object.is : n, i = t.useState, a = t.useEffect, o = t.useLayoutEffect, s = t.useDebugValue;
	function c(e, t) {
		var n = t(), r = i({ inst: {
			value: n,
			getSnapshot: t
		} }), c = r[0].inst, u = r[1];
		return o(function() {
			c.value = n, c.getSnapshot = t, l(c) && u({ inst: c });
		}, [
			e,
			n,
			t
		]), a(function() {
			return l(c) && u({ inst: c }), e(function() {
				l(c) && u({ inst: c });
			});
		}, [e]), s(n), n;
	}
	function l(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !r(e, n);
		} catch {
			return !0;
		}
	}
	function u(e, t) {
		return t();
	}
	var d = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? u : c;
	e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? d : t.useSyncExternalStore;
})), Mo = /* @__PURE__ */ o(((e, t) => {
	t.exports = jo();
})), No = /* @__PURE__ */ o(((e) => {
	var t = f(), n = Mo();
	function r(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var i = typeof Object.is == "function" ? Object.is : r, a = n.useSyncExternalStore, o = t.useRef, s = t.useEffect, c = t.useMemo, l = t.useDebugValue;
	e.useSyncExternalStoreWithSelector = function(e, t, n, r, u) {
		var d = o(null);
		if (d.current === null) {
			var f = {
				hasValue: !1,
				value: null
			};
			d.current = f;
		} else f = d.current;
		d = c(function() {
			function e(e) {
				if (!a) {
					if (a = !0, o = e, e = r(e), u !== void 0 && f.hasValue) {
						var t = f.value;
						if (u(t, e)) return s = t;
					}
					return s = e;
				}
				if (t = s, i(o, e)) return t;
				var n = r(e);
				return u !== void 0 && u(t, n) ? (o = e, t) : (o = e, s = n);
			}
			var a = !1, o, s, c = n === void 0 ? null : n;
			return [function() {
				return e(t());
			}, c === null ? void 0 : function() {
				return e(c());
			}];
		}, [
			t,
			n,
			r,
			u
		]);
		var p = a(e, d[0], d[1]);
		return s(function() {
			f.hasValue = !0, f.value = p;
		}, [p]), l(p), p;
	};
})), Po = /* @__PURE__ */ o(((e, t) => {
	t.exports = No();
})), Fo = [], Io = void 0;
function Lo() {
	return Io;
}
function Ro(e) {
	Fo.push(e);
}
function zo(e) {
	let t = (t, n) => {
		let r = G(Vo).current, i;
		try {
			Io = r;
			for (let e of Fo) e.before(r);
			i = e(t, n);
			for (let e of Fo) e.after(r);
			r.didInitialize = !0;
		} finally {
			Io = void 0;
		}
		return i;
	};
	return t.displayName = e.displayName || e.name, t;
}
function Bo(e) {
	return /*#__PURE__*/ _.forwardRef(zo(e));
}
function Vo() {
	return { didInitialize: !1 };
}
// node_modules/@base-ui/utils/store/useStore.mjs
var Ho = Mo(), Uo = Po(), Wo = ye(19) ? qo : Jo;
function Go(e, t, n, r, i) {
	return Wo(e, t, n, r, i);
}
function Ko(e, t, n, r, i) {
	let a = _.useCallback(() => t(e.getSnapshot(), n, r, i), [
		e,
		t,
		n,
		r,
		i
	]);
	return (0, Ho.useSyncExternalStore)(e.subscribe, a, a);
}
Ro({
	before(e) {
		e.syncIndex = 0, e.didInitialize || (e.syncTick = 1, e.syncHooks = [], e.didChangeStore = !0, e.getSnapshot = () => {
			let t = !1;
			for (let n = 0; n < e.syncHooks.length; n += 1) {
				let r = e.syncHooks[n], i = r.selector(r.store.state, r.a1, r.a2, r.a3);
				Object.is(r.value, i) || (t = !0, r.value = i);
			}
			return t && (e.syncTick += 1), e.syncTick;
		});
	},
	after(e) {
		e.syncHooks.length > 0 && (e.didChangeStore && (e.didChangeStore = !1, e.subscribe = (t) => {
			let n = /* @__PURE__ */ new Set();
			for (let t of e.syncHooks) n.add(t.store);
			let r = [];
			for (let e of n) r.push(e.subscribe(t));
			return () => {
				for (let e of r) e();
			};
		}), (0, Ho.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot));
	}
});
function qo(e, t, n, r, i) {
	let a = Lo();
	if (!a) return Ko(e, t, n, r, i);
	let o = a.syncIndex;
	a.syncIndex += 1;
	let s;
	return a.didInitialize ? (s = a.syncHooks[o], s.store === e && s.selector === t && Object.is(s.a1, n) && Object.is(s.a2, r) && Object.is(s.a3, i) || (s.store !== e && (a.didChangeStore = !0), s.store = e, s.selector = t, s.a1 = n, s.a2 = r, s.a3 = i, s.value = t(e.getSnapshot(), n, r, i))) : (s = {
		store: e,
		selector: t,
		a1: n,
		a2: r,
		a3: i,
		value: t(e.getSnapshot(), n, r, i)
	}, a.syncHooks.push(s)), s.value;
}
function Jo(e, t, n, r, i) {
	return (0, Uo.useSyncExternalStoreWithSelector)(e.subscribe, e.getSnapshot, e.getSnapshot, (e) => t(e, n, r, i));
}
// node_modules/@base-ui/utils/store/Store.mjs
var Yo = class {
	static create(e) {
		return new this(e);
	}
	constructor(e) {
		this.state = e, this.listeners = /* @__PURE__ */ new Set(), this.updateTick = 0;
	}
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	getSnapshot = () => this.state;
	setState(e) {
		if (this.state === e) return;
		this.state = e, this.updateTick += 1;
		let t = this.updateTick;
		for (let n of this.listeners) {
			if (t !== this.updateTick) return;
			n(e);
		}
	}
	update(e) {
		for (let t in e) if (!Object.is(this.state[t], e[t])) {
			this.setState({
				...this.state,
				...e
			});
			return;
		}
	}
	set(e, t) {
		Object.is(this.state[e], t) || this.setState({
			...this.state,
			[e]: t
		});
	}
	notifyAll() {
		let e = { ...this.state };
		this.setState(e);
	}
	use(e, t, n, r) {
		return Go(this, e, t, n, r);
	}
}, Xo = class extends Yo {
	constructor(e, t = {}, n) {
		super(e), this.context = t, this.selectors = n;
	}
	useSyncedValue(e, t) {
		_.useDebugValue(e);
		let n = this;
		J(() => {
			n.state[e] !== t && n.set(e, t);
		}, [
			n,
			e,
			t
		]);
	}
	useSyncedValueWithCleanup(e, t) {
		let n = this;
		J(() => (n.state[e] !== t && n.set(e, t), () => {
			n.set(e, void 0);
		}), [
			n,
			e,
			t
		]);
	}
	useSyncedValues(e) {
		let t = this;
		J(() => {
			t.update(e);
		}, [t, ...Object.values(e)]);
	}
	useControlledProp(e, t) {
		_.useDebugValue(e);
		let n = this, r = t !== void 0;
		J(() => {
			r && !Object.is(n.state[e], t) && n.setState({
				...n.state,
				[e]: t
			});
		}, [
			n,
			e,
			t,
			r
		]);
	}
	select(e, t, n, r) {
		let i = this.selectors[e];
		return i(this.state, t, n, r);
	}
	useState(e, t, n, r) {
		return _.useDebugValue(e), Go(this, this.selectors[e], t, n, r);
	}
	useContextCallback(e, t) {
		_.useDebugValue(e);
		let n = q(t ?? Se);
		this.context[e] = n;
	}
	useStateSetter(e) {
		let t = _.useRef(void 0);
		return t.current === void 0 && (t.current = (t) => {
			this.set(e, t);
		}), t.current;
	}
	observe(e, t) {
		let n;
		n = typeof e == "function" ? e : this.selectors[e];
		let r = n(this.state);
		return t(r, r, this), this.subscribe((e) => {
			let i = n(e);
			if (!Object.is(r, i)) {
				let e = r;
				r = i, t(i, e, this);
			}
		});
	}
}, Zo = {
	open: (e) => e.open,
	transitionStatus: (e) => e.transitionStatus,
	domReferenceElement: (e) => e.domReferenceElement,
	referenceElement: (e) => e.positionReference ?? e.referenceElement,
	floatingElement: (e) => e.floatingElement,
	floatingId: (e) => e.floatingId
}, Qo = class extends Xo {
	constructor(e) {
		let { syncOnly: t, nested: n, onOpenChange: r, triggerElements: i, ...a } = e;
		super({
			...a,
			positionReference: a.referenceElement,
			domReferenceElement: a.referenceElement
		}, {
			onOpenChange: r,
			dataRef: { current: {} },
			events: Ha(),
			nested: n,
			triggerElements: i
		}, Zo), this.syncOnly = t;
	}
	syncOpenEvent = (e, t) => {
		(!e || !this.state.open || t != null && Ar(t)) && (this.context.dataRef.current.openEvent = e ? t : void 0);
	};
	dispatchOpenChange = (e, t) => {
		this.syncOpenEvent(e, t.event);
		let n = {
			open: e,
			reason: t.reason,
			nativeEvent: t.event,
			nested: this.context.nested,
			triggerElement: t.trigger
		};
		this.context.events.emit("openchange", n);
	};
	setOpen = (e, t) => {
		this.syncOnly || this.dispatchOpenChange(e, t), this.context.onOpenChange?.(e, t);
	};
};
// node_modules/@base-ui/react/utils/popups/store.mjs
function $o(e, t, n = !1) {
	return {
		open: !1,
		openProp: void 0,
		mounted: !1,
		transitionStatus: void 0,
		floatingRootContext: new Qo({
			open: !1,
			transitionStatus: void 0,
			floatingElement: null,
			referenceElement: null,
			triggerElements: e,
			floatingId: t,
			syncOnly: !0,
			nested: n,
			onOpenChange: void 0
		}),
		floatingId: t,
		triggerCount: 0,
		preventUnmountingOnClose: !1,
		payload: void 0,
		activeTriggerId: null,
		activeTriggerElement: null,
		openedWithoutTrigger: !1,
		triggerIdProp: void 0,
		popupElement: null,
		positionerElement: null,
		activeTriggerProps: we,
		inactiveTriggerProps: we,
		popupProps: we
	};
}
var es = (e) => e.triggerIdProp ?? e.activeTriggerId, ts = (e) => e.openProp ?? e.open, ns = (e) => (e.popupElement?.id ?? e.floatingId) || void 0;
function rs(e, t) {
	return t !== void 0 && ts(e) && es(e) === t;
}
function is(e, t) {
	return rs(e, t) ? !0 : t !== void 0 && ts(e) && es(e) == null && !e.openedWithoutTrigger && e.triggerCount === 1;
}
var as = {
	open: ts,
	mounted: (e) => e.mounted,
	transitionStatus: (e) => ts(e) && !e.mounted ? "starting" : e.transitionStatus,
	floatingRootContext: (e) => e.floatingRootContext,
	triggerCount: (e) => e.triggerCount,
	preventUnmountingOnClose: (e) => e.preventUnmountingOnClose,
	payload: (e) => e.payload,
	activeTriggerId: es,
	activeTriggerElement: (e) => e.mounted ? e.activeTriggerElement : null,
	popupId: ns,
	isTriggerActive: (e, t) => t !== void 0 && es(e) === t,
	isOpenedByTrigger: (e, t) => rs(e, t),
	isMountedByTrigger: (e, t) => t !== void 0 && es(e) === t && e.mounted,
	triggerProps: (e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps,
	triggerPopupId: (e, t) => is(e, t) ? ns(e) : void 0,
	popupProps: (e) => e.popupProps,
	popupElement: (e) => e.popupElement,
	positionerElement: (e) => e.positionerElement
};
// node_modules/@base-ui/react/utils/popups/usePopupHandleStore.mjs
function os(e) {
	let t = _.useCallback((t) => e === void 0 ? Se : e.subscribeStore(t), [e]), n = _.useCallback(() => e === void 0 ? void 0 : e.store, [e]);
	return (0, Ho.useSyncExternalStore)(t, n, () => e?.serverStore);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function ss(e) {
	let { open: t = !1, onOpenChange: n, elements: r = {} } = e, i = Zn(), a = Ka() != null, o = G(() => new Qo({
		open: t,
		transitionStatus: void 0,
		onOpenChange: n,
		referenceElement: r.reference ?? null,
		floatingElement: r.floating ?? null,
		triggerElements: new Ao(),
		floatingId: i,
		syncOnly: !1,
		nested: a
	})).current;
	return J(() => {
		let e = {
			open: t,
			floatingId: i
		};
		r.reference !== void 0 && (e.referenceElement = r.reference, e.domReferenceElement = Kt(r.reference) ? r.reference : null), r.floating !== void 0 && (e.floatingElement = r.floating), o.update(e);
	}, [
		t,
		i,
		r.reference,
		r.floating,
		o
	]), o.context.onOpenChange = n, o.context.nested = a, o;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useFocus.mjs
var cs = Fn && Ln;
function ls(e, t = {}) {
	let { enabled: n = !0, delay: r } = t, { events: i, dataRef: a } = e.context, o = _.useRef(!1), s = _.useRef(null), c = _.useRef(!0), l = wr();
	_.useEffect(() => {
		let t = e.select("domReferenceElement");
		if (!n) return;
		let r = Ut(t);
		function i() {
			let t = e.select("domReferenceElement");
			!e.select("open") && qt(t) && t === jr(xn(t)) && (o.current = !0, s.current = t);
		}
		function a() {
			c.current = !0;
		}
		function l() {
			c.current = !1;
		}
		return ai(ii(r, "blur", i), cs && ii(r, "keydown", a, !0), cs && ii(r, "pointerdown", l, !0));
	}, [e, n]), _.useEffect(() => {
		if (!n) return;
		function t(t) {
			if (t.reason === "trigger-press" || t.reason === "escape-key") {
				let t = e.select("domReferenceElement");
				Kt(t) && (s.current = t, o.current = !0);
			}
		}
		return i.on("openchange", t), () => {
			i.off("openchange", t);
		};
	}, [
		i,
		n,
		e
	]);
	let u = _.useMemo(() => {
		function t() {
			o.current = !1, s.current = null;
		}
		return {
			onMouseLeave() {
				t();
			},
			onFocus(n) {
				let i = n.currentTarget;
				if (o.current) {
					if (s.current === i) return;
					t();
				}
				let a = Nr(n.nativeEvent);
				if (Kt(a)) {
					if (cs && !n.relatedTarget) {
						if (!c.current && !Wr(a)) return;
					} else if (!qr(a)) return;
				}
				let u = Vr(n.relatedTarget, e.context.triggerElements), { nativeEvent: d, currentTarget: f } = n;
				e.select("open") && u || !r ? e.setOpen(!0, $n(yt, d, f)) : l.start(r, () => {
					o.current || e.setOpen(!0, $n(yt, d, f));
				});
			},
			onBlur(n) {
				t();
				let r = n.relatedTarget, i = n.nativeEvent, o = Kt(r) && r.hasAttribute(va("focus-guard")) && r.getAttribute("data-type") === "outside";
				l.start(0, () => {
					let t = e.select("domReferenceElement"), n = jr(xn(t));
					!r && n === t || X(a.current.floatingContext?.refs.floating.current, n) || X(t, n) || o || Vr(r ?? n, e.context.triggerElements) || e.setOpen(!1, $n(yt, i));
				});
			}
		};
	}, [
		a,
		r,
		e,
		l
	]);
	return _.useMemo(() => n ? {
		reference: u,
		trigger: u
	} : {}, [n, u]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverInteractionSharedState.mjs
var us = class e {
	pointerType = void 0;
	interactedInside = !1;
	handler = void 0;
	blockMouseMove = !0;
	performedPointerEventsMutation = !1;
	pointerEventsScopeElement = null;
	pointerEventsReferenceElement = null;
	pointerEventsFloatingElement = null;
	restTimeoutPending = !1;
	openChangeTimeout = new Cr();
	restTimeout = new Cr();
	handleCloseOptions = void 0;
	static create() {
		return new e();
	}
	dispose = () => {
		this.openChangeTimeout.clear(), this.restTimeout.clear();
	};
	disposeEffect = () => this.dispose;
}, ds = /* @__PURE__ */ new WeakMap();
function fs(e) {
	if (!e.performedPointerEventsMutation) return;
	let t = e.pointerEventsScopeElement;
	t && ds.get(t) === e && (e.pointerEventsScopeElement?.style.removeProperty("pointer-events"), e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"), e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"), ds.delete(t)), e.performedPointerEventsMutation = !1, e.pointerEventsScopeElement = null, e.pointerEventsReferenceElement = null, e.pointerEventsFloatingElement = null;
}
function ps(e, t) {
	let { scopeElement: n, referenceElement: r, floatingElement: i } = t, a = ds.get(n);
	a && a !== e && fs(a), fs(e), e.performedPointerEventsMutation = !0, e.pointerEventsScopeElement = n, e.pointerEventsReferenceElement = r, e.pointerEventsFloatingElement = i, ds.set(n, e), n.style.pointerEvents = "none", r.style.pointerEvents = "auto", i.style.pointerEvents = "auto";
}
function ms(e) {
	let t = e.context.dataRef.current, n = G(() => t.hoverInteractionState ?? us.create()).current;
	return t.hoverInteractionState ||= n, rr(t.hoverInteractionState.disposeEffect), t.hoverInteractionState;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs
function hs(e, t = {}) {
	let { enabled: n = !0, closeDelay: r = 0, nodeId: i } = t, a = e.useState("open"), o = e.useState("floatingElement"), s = e.useState("domReferenceElement"), { dataRef: c } = e.context, l = qa(), u = Ka(), d = ms(e), f = wr(), p = q(() => Qr(c.current.openEvent?.type, d.interactedInside)), m = q(() => $r(c.current.openEvent?.type)), h = q(() => {
		fs(d);
	});
	J(() => {
		a || (d.pointerType = void 0, d.restTimeoutPending = !1, d.interactedInside = !1, h());
	}, [
		a,
		d,
		h
	]), _.useEffect(() => h, [h]), J(() => {
		if (n && a && d.handleCloseOptions?.blockPointerEvents && m() && Kt(s) && o) {
			let e = s, t = o, n = xn(o), r = l?.nodesRef.current.find((e) => e.id === u)?.context?.elements.floating;
			r && (r.style.pointerEvents = "");
			let i = d.pointerEventsScopeElement === t ? null : d.pointerEventsScopeElement, a = r === t ? null : r, c = d.handleCloseOptions?.getScope?.() ?? i ?? a ?? Mr(e, "[data-rootownerid]") ?? n.body;
			return ps(d, {
				scopeElement: c,
				referenceElement: e,
				floatingElement: t
			}), () => {
				h();
			};
		}
	}, [
		n,
		a,
		s,
		o,
		d,
		m,
		l,
		u,
		h
	]), _.useEffect(() => {
		if (!n) return;
		function t() {
			return !!(l && u && ga(l.nodesRef.current, u).length > 0);
		}
		function a(t) {
			let n = Xr(r, "close", d.pointerType), i = () => {
				e.setOpen(!1, $n(vt, t)), l?.events.emit("floating.closed", t);
			};
			n ? d.openChangeTimeout.start(n, i) : (d.openChangeTimeout.clear(), i());
		}
		function s(e) {
			let t = Nr(e);
			Gr(t) ? d.interactedInside = Mr(t, "[aria-haspopup]") != null : d.interactedInside = !1;
		}
		function g() {
			d.openChangeTimeout.clear(), f.clear(), l?.events.off("floating.closed", v), h();
		}
		function _(n) {
			if (t() && l) {
				l.events.on("floating.closed", v);
				return;
			}
			if (Vr(n.relatedTarget, e.context.triggerElements)) return;
			let r = c.current.floatingContext?.nodeId ?? i, o = n.relatedTarget;
			l && r && Kt(o) && ga(l.nodesRef.current, r, !1).some((e) => X(e.context?.elements.floating, o)) || (d.handler ? d.handler(n) : (h(), m() && !p() && a(n)));
		}
		function v(n) {
			l && u && !t() && f.start(0, () => {
				l.events.off("floating.closed", v), e.setOpen(!1, $n(vt, n)), l.events.emit("floating.closed", n);
			});
		}
		let y = o;
		return ai(y && ii(y, "mouseenter", g), y && ii(y, "mouseleave", _), y && ii(y, "pointerdown", s, !0), () => {
			l?.events.off("floating.closed", v);
		});
	}, [
		n,
		o,
		e,
		c,
		r,
		i,
		m,
		p,
		h,
		d,
		l,
		u,
		f
	]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverReferenceInteraction.mjs
var gs = { current: null };
function _s(e, t = {}) {
	let { enabled: n = !0, delay: r = 0, handleClose: i = null, mouseOnly: a = !1, restMs: o = 0, move: s = !0, triggerElementRef: c = gs, externalTree: l, isActiveTrigger: u = !0, getHandleCloseContext: d, isClosing: f, shouldOpen: p, guardStaleOpen: m = !1 } = t, { dataRef: h, events: g } = e.context, y = qa(l), b = ms(e), x = _.useRef(!1), S = oi(i), C = oi(r), w = oi(o), T = oi(n), E = oi(p), D = oi(f), O = q(() => Qr(h.current.openEvent?.type, b.interactedInside)), k = q(() => E.current?.() !== !1), A = q((t, n, r) => {
		let i = e.context.triggerElements;
		if (i.hasElement(n)) return !t || !X(t, n);
		if (!Kt(r)) return !1;
		let a = r;
		return i.hasMatchingElement((e) => X(e, a)) && (!t || !X(t, a));
	}), j = q(() => {
		b.handler &&= (xn(e.select("domReferenceElement")).removeEventListener("mousemove", b.handler), void 0);
	}), M = q(() => {
		fs(b);
	});
	return u && (b.handleCloseOptions = i?.__options), _.useEffect(() => j, [j]), _.useEffect(() => {
		if (!n) return;
		function e(e) {
			e.open ? x.current = !1 : (x.current = e.reason === vt, j(), b.openChangeTimeout.clear(), b.restTimeout.clear(), b.blockMouseMove = !0, b.restTimeoutPending = !1);
		}
		return g.on("openchange", e), () => {
			g.off("openchange", e);
		};
	}, [
		n,
		g,
		b,
		j
	]), _.useEffect(() => {
		if (!n) return;
		function t(t, n = !0) {
			let r = Xr(C.current, "close", b.pointerType);
			r ? b.openChangeTimeout.start(r, () => {
				e.setOpen(!1, $n(vt, t)), y?.events.emit("floating.closed", t);
			}) : n && (b.openChangeTimeout.clear(), e.setOpen(!1, $n(vt, t)), y?.events.emit("floating.closed", t));
		}
		let r = c.current ?? (u ? e.select("domReferenceElement") : null);
		if (!Kt(r)) return;
		function i(t) {
			if (b.openChangeTimeout.clear(), b.blockMouseMove = !1, a && !kr(b.pointerType)) return;
			let n = Zr(w.current), r = Xr(C.current, "open", b.pointerType), i = Nr(t), o = t.currentTarget ?? null, s = e.select("domReferenceElement"), c = o;
			if (Kt(i) && !e.context.triggerElements.hasElement(i)) {
				for (let t of e.context.triggerElements.elements()) if (X(t, i)) {
					c = t;
					break;
				}
			}
			Kt(o) && Kt(s) && !e.context.triggerElements.hasElement(o) && X(o, s) && (c = s);
			let l = c != null && A(s, c, i), u = e.select("open"), d = D.current?.() ?? e.select("transitionStatus") === "ending", f = !u && d && x.current, p = !l && Kt(c) && Kt(s) && X(s, c) && f, m = n > 0 && !r, h = l && (u || f) || p, g = !u || l;
			h ? k() && e.setOpen(!0, $n(vt, t, c)) : m || (r ? b.openChangeTimeout.start(r, () => {
				g && k() && e.setOpen(!0, $n(vt, t, c));
			}) : g && k() && e.setOpen(!0, $n(vt, t, c)));
		}
		function o(n) {
			if (O()) {
				M();
				return;
			}
			j();
			let r = xn(e.select("domReferenceElement"));
			b.restTimeout.clear(), b.restTimeoutPending = !1;
			let i = h.current.floatingContext ?? d?.();
			if (!Vr(n.relatedTarget, e.context.triggerElements)) {
				if (S.current && i) {
					e.select("open") || b.openChangeTimeout.clear();
					let a = c.current;
					b.handler = S.current({
						...i,
						tree: y,
						x: n.clientX,
						y: n.clientY,
						onClose() {
							M(), j(), T.current && !O() && a === e.select("domReferenceElement") && t(n, !0);
						}
					}), r.addEventListener("mousemove", b.handler), b.handler(n);
				} else b.pointerType === "touch" && X(e.select("floatingElement"), n.relatedTarget) || t(n);
			}
		}
		function l(e) {
			X(r, e.relatedTarget) || (b.openChangeTimeout.clear(), b.restTimeout.clear(), b.restTimeoutPending = !1);
		}
		let f = m ? ii(r, "mouseout", l) : void 0;
		return s ? ai(ii(r, "mousemove", i, { once: !0 }), ii(r, "mouseenter", i), ii(r, "mouseleave", o), f) : ai(ii(r, "mouseenter", i), ii(r, "mouseleave", o), f);
	}, [
		j,
		M,
		h,
		C,
		e,
		n,
		S,
		b,
		u,
		A,
		O,
		a,
		s,
		w,
		c,
		y,
		T,
		d,
		D,
		k,
		m
	]), _.useMemo(() => {
		if (!n) return;
		function t(e) {
			b.pointerType = e.pointerType;
		}
		return {
			onPointerDown: t,
			onPointerEnter: t,
			onMouseMove(t) {
				let { nativeEvent: n } = t, r = t.currentTarget, i = e.select("domReferenceElement"), o = e.select("open"), s = A(i, r, t.target);
				if (a && !kr(b.pointerType)) return;
				if (o && s && b.handleCloseOptions?.blockPointerEvents) {
					let t = e.select("floatingElement");
					if (t) {
						let e = b.handleCloseOptions?.getScope?.() ?? r.ownerDocument.body;
						ps(b, {
							scopeElement: e,
							referenceElement: r,
							floatingElement: t
						});
					}
				}
				let c = Zr(w.current);
				if (o && !s || c === 0 || !s && b.restTimeoutPending && t.movementX ** 2 + t.movementY ** 2 < 2) return;
				b.restTimeout.clear();
				function l() {
					if (b.restTimeoutPending = !1, O()) return;
					let t = e.select("open");
					!b.blockMouseMove && (!t || s) && k() && e.setOpen(!0, $n(vt, n, r));
				}
				b.pointerType === "touch" ? v.flushSync(() => {
					l();
				}) : s && o ? l() : (b.restTimeoutPending = !0, b.restTimeout.start(c, l));
			}
		};
	}, [
		n,
		b,
		O,
		A,
		a,
		e,
		w,
		k
	]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useListNavigation.mjs
function vs(e) {
	return Ln && e.movementX === 0 && e.movementY === 0;
}
function ys(e, t, n) {
	switch (e) {
		case "vertical": return t;
		case "horizontal": return n;
		default: return t || n;
	}
}
function bs(e, t) {
	return ys(t, e === "ArrowUp" || e === "ArrowDown", e === "ArrowLeft" || e === "ArrowRight");
}
function xs(e, t, n) {
	return ys(t, e === "ArrowDown", n ? e === "ArrowLeft" : e === "ArrowRight") || e === "Enter" || e === " " || e === "";
}
function Ss(e, t, n) {
	return ys(t, n ? e === Ir : e === Lr, e === zr);
}
function Cs(e, t, n, r) {
	return t === "both" || t === "horizontal" && r ? e === "Escape" : ys(t, n ? e === Lr : e === Ir, e === Rr);
}
function ws(e, t) {
	let { listRef: n, activeIndex: r, onNavigate: i = () => {}, enabled: a = !0, selectedIndex: o = null, allowEscape: s = !1, loopFocus: c = !1, nested: l = !1, rtl: u = !1, virtual: d = !1, focusItemOnOpen: f = "auto", focusItemOnHover: p = !0, openOnArrowKeyDown: m = !0, disabledIndices: h = void 0, orientation: g = "vertical", triggerOrientation: v = g, parentOrientation: y, id: b, resetOnPointerLeave: x = !0, externalTree: S, nestedReturnFocusRef: C, grid: w } = t, T = w != null, E = e.useState("open"), D = e.useState("floatingElement"), O = e.useState("domReferenceElement"), k = e.context.dataRef, A = Jr(D), j = Kr(O), M = oi(A), N = Ka(), P = qa(S), F = _.useRef(f), I = _.useRef(o ?? -1), L = _.useRef(null), R = _.useRef(!0), z = q((e) => {
		i(I.current === -1 ? null : I.current, e);
	}), B = _.useRef(!!D), V = _.useRef(E), ee = _.useRef(!1), H = _.useRef(!1), te = _.useRef(null), ne = oi(h), re = oi(E), ie = oi(o), ae = oi(x), oe = sr(), se = sr(), U = q(() => {
		oe.cancel();
		function e(e) {
			d || (te.current = ba(e, {
				sync: ee.current,
				preventScroll: !0
			}));
		}
		let t = n.current[I.current], r = H.current;
		t && e(t), (ee.current ? (e) => e() : (e) => oe.request(e))(() => {
			let i = n.current[I.current] || t;
			i && (t || e(i), fe && (r || !R.current) && i.scrollIntoView?.({
				block: "nearest",
				inline: "nearest"
			}));
		});
	});
	J(() => {
		k.current.orientation = g;
	}, [k, g]), J(() => {
		E || (L.current = null), E && f === "auto" || (F.current = f);
	}, [E, f]), J(() => {
		a && (E && D ? (I.current = o ?? -1, F.current && o != null && (H.current = !0, z())) : B.current && (I.current = -1, z()));
	}, [
		a,
		E,
		D,
		o,
		z
	]), J(() => {
		if (a) {
			if (!E) ee.current = !1;
			else if (D) {
				if (r == null) {
					if (ee.current = !1, ie.current != null) return;
					if (B.current && (I.current = -1, U()), (!V.current || !B.current) && F.current && (L.current != null || F.current === !0 && L.current == null)) {
						let e = 0, t = () => {
							n.current[0] == null ? (e < 2 && (e ? (e) => se.request(e) : queueMicrotask)(t), e += 1) : (I.current = L.current == null || xs(L.current, v, u) || l ? Bi(n) : Vi(n), L.current = null, z());
						};
						t();
					}
				} else zi(n.current, r) || (I.current = r, U(), H.current = !1);
			}
		}
	}, [
		a,
		E,
		D,
		r,
		ie,
		l,
		n,
		v,
		u,
		z,
		U,
		se
	]), J(() => {
		if (!a || D || !P || d || !B.current) return;
		let e = P.nodesRef.current, t = e.find((e) => e.id === N)?.context?.elements.floating, n = jr(xn(O ?? t ?? null)), r = e.some((e) => e.context && X(e.context.elements.floating, n));
		t && !r && R.current && t.focus({ preventScroll: !0 });
	}, [
		a,
		D,
		O,
		P,
		N,
		d
	]), J(() => {
		V.current = E, B.current = !!D;
	});
	let W = r != null, ce = q((e) => {
		if (!re.current) return;
		let t = n.current.indexOf(e.currentTarget);
		t !== -1 && (I.current !== t || r !== t) && (I.current = t, z(e));
	}), le = q(() => y ?? P?.nodesRef.current.find((e) => e.id === N)?.context?.dataRef?.current.orientation), ue = q(() => Bi(n, ne.current)), de = q((t) => {
		if (R.current = !1, ee.current = !0, t.which === 229 || !re.current && t.currentTarget === M.current) return;
		if (l && Cs(t.key, g, u, T)) {
			bs(t.key, le()) || Tr(t), e.setOpen(!1, $n(Tt, t.nativeEvent));
			let n = C?.current ?? O;
			qt(n) && n.focus();
			return;
		}
		r != null && r !== I.current && !zi(n.current, r) && (I.current = r);
		let i = I.current, a = Bi(n, h), o = Vi(n, h);
		if (j || (t.key === "Home" && (Tr(t), I.current = a, z(t)), t.key === "End" && (Tr(t), I.current = o, z(t))), w != null) {
			let e = w(t, I.current, n, g, c, u, h, a, o);
			if (e != null && e !== I.current && (I.current = e, z(t)), g === "both") return;
		}
		if (bs(t.key, g)) {
			Tr(t);
			let e = jr(t.currentTarget.ownerDocument);
			if (E && !d && X(t.currentTarget, e) && !n.current.some((t) => t != null && X(t, e))) {
				I.current = xs(t.key, g, u) ? a : o, z(t), r === I.current && U();
				return;
			}
			let { index: l, wrapped: f } = Hi(n.current, i, {
				decrement: !xs(t.key, g, u),
				loopFocus: c,
				allowEscape: s,
				disabledIndices: h,
				minIndex: a,
				maxIndex: o
			});
			f && (ee.current = !1), I.current = l, z(t);
		}
	}), fe = _.useMemo(() => ({
		onFocus(e) {
			ee.current = !0, ce(e);
		},
		onClick({ currentTarget: e }) {
			d || e.focus({ preventScroll: !0 });
		},
		onMouseMove(e) {
			vs(e) || (ee.current = !0, H.current = !1, p && ce(e));
		},
		onPointerLeave(e) {
			if (!re.current || !R.current || e.pointerType === "touch") return;
			ee.current = !0;
			let t = e.relatedTarget;
			if (p && !n.current.includes(t) && ae.current && (te.current?.(), te.current = null, I.current = -1, z(e), !d)) {
				let e = M.current, t = jr(xn(e));
				e && X(e, t) && e.focus({ preventScroll: !0 });
			}
		}
	}), [
		ce,
		re,
		M,
		p,
		n,
		z,
		ae,
		d
	]), G = _.useMemo(() => d && E && W && { "aria-activedescendant": `${b}-${r}` }, [
		d,
		E,
		W,
		b,
		r
	]), pe = _.useMemo(() => ({
		...j ? {} : G,
		onKeyDown(t) {
			if (t.key === "Tab" && t.shiftKey && E && !d) {
				let n = Nr(t.nativeEvent);
				if (n && !X(M.current, n)) return;
				Tr(t);
				let r = $n(Ct, t.nativeEvent);
				e.setOpen(!1, r);
				let i = C?.current ?? O;
				!r.isCanceled && qt(i) && i.focus();
			} else de(t);
		},
		onPointerMove(e) {
			vs(e) || (R.current = !0);
		}
	}), [
		G,
		de,
		M,
		j,
		e,
		E,
		d,
		O,
		C
	]), K = _.useMemo(() => {
		function t(t) {
			e.setOpen(!0, $n(Tt, t.nativeEvent, t.currentTarget));
		}
		function n(e) {
			f === "auto" && Dr(e.nativeEvent) && (F.current = !d);
		}
		function r(e) {
			F.current = f, f === "auto" && Or(e.nativeEvent) && (F.current = !0);
		}
		return {
			onKeyDown(n) {
				let r = e.select("open");
				R.current = !1;
				let i = n.key.startsWith("Arrow"), a = Ss(n.key, le(), u), o = bs(n.key, r ? g : v), s = (l ? a : o) || n.key === "Enter" || n.key.trim() === "";
				if (d && r && (!l || Wr(n.currentTarget))) return de(n);
				if (r || m || !i) {
					if (s) {
						let e = bs(n.key, le());
						L.current = l && e ? null : n.key;
					}
					l ? a && (Tr(n), r ? (I.current = ue(), z(n), d && M.current?.focus()) : t(n)) : o && (ie.current != null && (I.current = ie.current), Tr(n), !r && m ? t(n) : de(n), r && z(n));
				}
			},
			onFocus(t) {
				t.target === t.currentTarget && e.select("open") && !d && (I.current = -1, z(t));
			},
			onPointerDown: r,
			onPointerEnter: r,
			onMouseDown: n,
			onClick: n
		};
	}, [
		de,
		f,
		ue,
		l,
		z,
		e,
		m,
		g,
		v,
		le,
		u,
		ie,
		d,
		M
	]), me = _.useMemo(() => ({
		...G,
		...K
	}), [G, K]);
	return _.useMemo(() => a ? {
		reference: me,
		floating: pe,
		item: fe,
		trigger: K
	} : {}, [
		a,
		me,
		pe,
		K,
		fe
	]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useTypeahead.mjs
function Ts(e, t) {
	let { listRef: n, elementsRef: r, activeIndex: i, onMatch: a, disabledIndices: o, onTyping: s, enabled: c = !0, resetMs: l = 750, selectedIndex: u = null } = t, d = q(s), f = e.useState("open"), p = wr(), m = _.useRef(""), h = _.useRef(u ?? i ?? -1), g = _.useRef(null), v = q((e) => {
		function t(e) {
			return r?.current[e];
		}
		function s(e) {
			let n = t(e);
			return n && !Ki(n) || n?.matches(":disabled") ? !1 : o == null || !Wi(Ce, e, o);
		}
		function c(e, t, n = 0) {
			if (e.length === 0) return -1;
			let r = (n % e.length + e.length) % e.length, i = t.toLowerCase();
			for (let t = 0; t < e.length; t += 1) {
				let n = (r + t) % e.length;
				if (e[n]?.toLowerCase().startsWith(i) && s(n)) return n;
			}
			return -1;
		}
		let _ = n.current;
		if (m.current.length > 0 && e.key === " " && (Tr(e), d?.(!0)), m.current.length > 0 && m.current[0] !== " " && c(_, m.current) === -1 && e.key !== " " && d?.(!1), _ == null || e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		f && e.key !== " " && (Tr(e), d?.(!0));
		let v = m.current === "";
		v && (h.current = u ?? i ?? -1), _.every((e, t) => e && s(t) ? e[0]?.toLowerCase() !== e[1]?.toLowerCase() : !0) && m.current === e.key && (m.current = "", h.current = g.current), m.current += e.key, p.start(l, () => {
			m.current = "", h.current = g.current, d?.(!1);
		});
		let y = ((v ? u ?? i ?? -1 : h.current) ?? 0) + 1, b = c(_, m.current, y);
		b === -1 ? e.key !== " " && (m.current = "", d?.(!1)) : (a?.(b, e), g.current = b);
	}), y = q((t) => {
		let n = t.relatedTarget, r = e.select("domReferenceElement"), i = e.select("floatingElement");
		X(r, n) || X(i, n) || (p.clear(), m.current = "", h.current = g.current, d?.(!1));
	});
	J(() => {
		(f || u === null) && (p.clear(), g.current = null, m.current !== "" && (m.current = "", d?.(!1)));
	}, [
		f,
		u,
		p,
		d
	]);
	let b = _.useMemo(() => ({
		onKeyDown: v,
		onBlur: y
	}), [v, y]);
	return _.useMemo(() => c ? {
		reference: b,
		floating: b
	} : {}, [c, b]);
}
// node_modules/@base-ui/react/floating-ui-react/safePolygon.mjs
var Es = .1, Ds = Es * Es, Os = .5;
function ks(e, t, n, r, i, a) {
	return r >= t != a >= t && e <= (i - n) * (t - r) / (a - r) + n;
}
function As(e, t, n, r, i, a, o, s, c, l) {
	let u = !1;
	return ks(e, t, n, r, i, a) && (u = !u), ks(e, t, i, a, o, s) && (u = !u), ks(e, t, o, s, c, l) && (u = !u), ks(e, t, c, l, n, r) && (u = !u), u;
}
function js(e, t, n) {
	return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
}
function Ms(e, t, n, r, i, a) {
	return e >= Math.min(n, i) && e <= Math.max(n, i) && t >= Math.min(r, a) && t <= Math.max(r, a);
}
function Ns(e = {}) {
	let { blockPointerEvents: t = !1 } = e, n = new Cr(), r = ({ x: e, y: t, placement: r, elements: i, onClose: a, nodeId: o, tree: s }) => {
		let c = r?.split("-")[0], l = !1, u = null, d = null, f = typeof performance < "u" ? performance.now() : 0;
		function p(e, t) {
			let n = performance.now(), r = n - f;
			if (u === null || d === null || r === 0) return u = e, d = t, f = n, !1;
			let i = e - u, a = t - d, o = i * i + a * a, s = r * r * Ds;
			return u = e, d = t, f = n, o < s;
		}
		function m() {
			n.clear(), a();
		}
		return function(r) {
			n.clear();
			let a = i.domReference, u = i.floating;
			if (!a || !u || c == null || e == null || t == null) return;
			let { clientX: d, clientY: f } = r, h = Nr(r), g = r.type === "mouseleave", _ = X(u, h), v = X(a, h);
			if (_ && (l = !0, !g)) return;
			if (v && (l = !1, !g)) {
				l = !0;
				return;
			}
			if (g && Kt(r.relatedTarget) && X(u, r.relatedTarget)) return;
			function y() {
				return !!(s && ga(s.nodesRef.current, o).length > 0);
			}
			function b() {
				y() || m();
			}
			if (y()) return;
			let x = a.getBoundingClientRect(), S = u.getBoundingClientRect(), C = e > S.right - S.width / 2, w = t > S.bottom - S.height / 2, T = S.width > x.width, E = S.height > x.height, D = (T ? x : S).left, O = (T ? x : S).right, k = (E ? x : S).top, A = (E ? x : S).bottom;
			if (c === "top" && t >= x.bottom - 1 || c === "bottom" && t <= x.top + 1 || c === "left" && e >= x.right - 1 || c === "right" && e <= x.left + 1) {
				b();
				return;
			}
			let j = !1;
			switch (c) {
				case "top":
					j = Ms(d, f, D, x.top + 1, O, S.bottom - 1);
					break;
				case "bottom":
					j = Ms(d, f, D, S.top + 1, O, x.bottom - 1);
					break;
				case "left":
					j = Ms(d, f, S.right - 1, A, x.left + 1, k);
					break;
				case "right": j = Ms(d, f, x.right - 1, A, S.left + 1, k);
			}
			if (j) return;
			if (l && !js(d, f, x) || !g && p(d, f)) {
				b();
				return;
			}
			let M = !1;
			switch (c) {
				case "top": {
					let n = T ? Os / 2 : Os * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t + Os + 1, o = C || T ? S.bottom - Os : S.top, s = C ? T ? S.bottom - Os : S.top : S.bottom - Os;
					M = As(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "bottom": {
					let n = T ? Os / 2 : Os * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t - Os, o = C || T ? S.top + Os : S.bottom, s = C ? T ? S.top + Os : S.bottom : S.top + Os;
					M = As(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "left": {
					let n = E ? Os / 2 : Os * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e + Os + 1, o = w || E ? S.right - Os : S.left, s = w ? E ? S.right - Os : S.left : S.right - Os;
					M = As(d, f, o, S.top, s, S.bottom, a, r, a, i);
					break;
				}
				case "right": {
					let n = E ? Os / 2 : Os * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e - Os, o = w || E ? S.left + Os : S.right, s = w ? E ? S.left + Os : S.right : S.left + Os;
					M = As(d, f, a, r, a, i, o, S.top, s, S.bottom);
					break;
				}
			}
			M ? l || n.start(40, b) : b();
		};
	};
	return r.__options = {
		...e,
		blockPointerEvents: t
	}, r;
}
// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Ps(e, t, n) {
	let { reference: r, floating: i } = e, a = wi(t), o = Ti(t), s = Ci(o), c = bi(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = xi(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Fs(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = yi(t, e), p = Li(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Ri(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = Ri(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Is = 50, Ls = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Fs
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Ps(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Is && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Ps(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Rs = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = yi(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = bi(r), _ = wi(o), v = bi(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Fi(o)] : Di(o)), x = p !== "none";
			!d && x && b.push(...Pi(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Ei(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === wi(t) || T.every((e) => wi(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = wi(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
}, zs = /*#__PURE__*/ new Set(["left", "top"]);
async function Bs(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = bi(n), s = xi(n), c = wi(n) === "y", l = zs.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = yi(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Vs = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Bs(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Hs = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = yi(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = wi(i), p = Si(f), m = u[p], h = u[f], g = (e, t) => vi(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, Us = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = yi(e, t), u = {
				x: n,
				y: r
			}, d = wi(i), f = Si(d), p = u[f], m = u[d], h = yi(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = zs.has(bi(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Ws = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = yi(e, t), c = await i.detectOverflow(t, s), l = bi(n), u = xi(n), d = wi(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = fi(p - c[m], g), y = fi(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * pi(c.left, c.right) : S = p - 2 * pi(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Gs(e) {
	let t = sn(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = qt(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = mi(n) !== a || mi(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Ks(e) {
	return Kt(e) ? e : e.contextElement;
}
function qs(e) {
	let t = Ks(e);
	if (!qt(t)) return gi(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Gs(t), o = (a ? mi(n.width) : n.width) / r, s = (a ? mi(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
var Js = /*#__PURE__*/ gi(0);
function Ys(e) {
	let t = Ut(e);
	return !an() || !t.visualViewport ? Js : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Xs(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Ut(e);
}
function Zs(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Ks(e), o = gi(1);
	t && (r ? Kt(r) && (o = qs(r)) : o = qs(e));
	let s = Xs(a, n, r) ? Ys(a) : gi(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Ut(a), t = Kt(r) ? Ut(r) : r, n = e, i = fn(n);
		for (; i && t !== n;) {
			let e = qs(i), t = i.getBoundingClientRect(), r = sn(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Ut(i), i = fn(n);
		}
	}
	return Ri({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Qs(e, t) {
	let n = cn(e).scrollLeft;
	return t ? t.left + n : Zs(Wt(e)).left + n;
}
function $s(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Qs(e, n),
		y: n.top + t.scrollTop
	};
}
function ec(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Wt(r), s = t ? Zt(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = gi(1), u = gi(0), d = qt(r);
	if ((d || !a) && ((Ht(r) !== "body" || Yt(o)) && (c = cn(r)), d)) {
		let e = Zs(r);
		l = qs(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? $s(o, c) : gi(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function tc(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function nc(e) {
	let t = cn(e), n = e.ownerDocument.body, r = pi(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = pi(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Qs(e), o = -t.scrollTop;
	return sn(n).direction === "rtl" && (a += pi(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var rc = 25;
function ic(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Ut(e), a = Wt(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !an() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Qs(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= rc && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function ac(e, t) {
	let n = Zs(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = qs(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function oc(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = ic(e, n, t);
	else if (t === "document") r = nc(Wt(e));
	else if (Kt(t)) r = ac(t, n);
	else {
		let n = Ys(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Ri(r);
}
function sc(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = dn(e, [], !1).filter((e) => Kt(e) && Ht(e) !== "body"), i = null, a = sn(e).position === "fixed", o = a ? ln(e) : e;
	for (; Kt(o) && !on(o);) {
		let e = sn(o), t = nn(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = ln(o);
	}
	return t.set(e, r), r;
}
function cc(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Zt(t) ? [] : sc(t, this._c) : [].concat(n), r], o = oc(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = oc(t, a[e], i);
		s = pi(n.top, s), c = fi(n.right, c), l = fi(n.bottom, l), u = pi(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function lc(e) {
	let { width: t, height: n } = Gs(e);
	return {
		width: t,
		height: n
	};
}
function uc(e, t, n) {
	let r = qt(t), i = Wt(t), a = n === "fixed", o = Zs(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = gi(0);
	if ((r || !a) && ((Ht(t) !== "body" || Yt(i)) && (s = cn(t)), r)) {
		let e = Zs(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Qs(i));
	let l = i && !r && !a ? $s(i, s) : gi(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function dc(e) {
	return sn(e).position === "static";
}
function fc(e, t) {
	if (!qt(e) || sn(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Wt(e) === n && (n = n.ownerDocument.body), n;
}
function pc(e, t) {
	let n = Ut(e);
	if (Zt(e)) return n;
	if (!qt(e)) {
		let t = ln(e);
		for (; t && !on(t);) {
			if (Kt(t) && !dc(t)) return t;
			t = ln(t);
		}
		return n;
	}
	let r = fc(e, t);
	for (; r && Xt(r) && dc(r);) r = fc(r, t);
	return r && on(r) && dc(r) && !nn(r) ? n : r || rn(e) || n;
}
var mc = async function(e) {
	let t = this.getOffsetParent || pc, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: uc(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function hc(e) {
	return sn(e).direction === "rtl";
}
var gc = {
	convertOffsetParentRelativeRectToViewportRelativeRect: ec,
	getDocumentElement: Wt,
	getClippingRect: cc,
	getOffsetParent: pc,
	getElementRects: mc,
	getClientRects: tc,
	getDimensions: lc,
	getScale: qs,
	isElement: Kt,
	isRTL: hc
};
function _c(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function vc(e, t, n) {
	let r = null, i, a = Wt(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = hi(d), h = hi(a.clientWidth - (u + f)), g = hi(a.clientHeight - (d + p)), _ = hi(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: pi(0, fi(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!_c(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = Ut(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function yc(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Ks(e), u = i || a ? [...l ? dn(l) : [], ...t ? dn(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? vc(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Zs(e) : null;
	c && g();
	function g() {
		let t = Zs(e);
		h && !_c(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var bc = Vs, xc = Hs, Sc = Rs, Cc = Ws, wc = Us, Tc = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...gc,
		...i.platform,
		_c: r
	};
	return Ls(e, t, {
		...i,
		platform: a
	});
}, Ec = typeof document < "u" ? _.useLayoutEffect : function() {};
function Dc(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Dc(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Dc(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Oc(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function kc(e, t) {
	let n = Oc(e);
	return Math.round(t * n) / n;
}
function Ac(e) {
	let t = _.useRef(e);
	return Ec(() => {
		t.current = e;
	}), t;
}
function jc(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = _.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = _.useState(r);
	Dc(f, r) || p(r);
	let [m, h] = _.useState(null), [g, y] = _.useState(null), b = _.useCallback((e) => {
		e !== w.current && (w.current = e, h(e));
	}, []), x = _.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = a || m, C = o || g, w = _.useRef(null), T = _.useRef(null), E = _.useRef(u), D = c != null, O = Ac(c), k = Ac(i), A = Ac(l), j = _.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		k.current && (e.platform = k.current), Tc(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !Dc(E.current, t) && (E.current = t, v.flushSync(() => {
				d(t);
			}));
		});
	}, [
		f,
		t,
		n,
		k,
		A
	]);
	Ec(() => {
		l === !1 && E.current.isPositioned && (E.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let M = _.useRef(!1);
	Ec(() => (M.current = !0, () => {
		M.current = !1;
	}), []), Ec(() => {
		if (S && (w.current = S), C && (T.current = C), S && C) {
			if (O.current) return O.current(S, C, j);
			j();
		}
	}, [
		S,
		C,
		j,
		O,
		D
	]);
	let N = _.useMemo(() => ({
		reference: w,
		floating: T,
		setReference: b,
		setFloating: x
	}), [b, x]), P = _.useMemo(() => ({
		reference: S,
		floating: C
	}), [S, C]), F = _.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!P.floating) return e;
		let t = kc(P.floating, u.x), r = kc(P.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...Oc(P.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		P.floating,
		u.x,
		u.y
	]);
	return _.useMemo(() => ({
		...u,
		update: j,
		refs: N,
		elements: P,
		floatingStyles: F
	}), [
		u,
		j,
		N,
		P,
		F
	]);
}
var Mc = (e, t) => {
	let n = bc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Nc = (e, t) => {
	let n = xc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Pc = (e, t) => ({
	fn: wc(e).fn,
	options: [e, t]
}), Fc = (e, t) => {
	let n = Sc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Ic = (e, t) => {
	let n = Cc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Lc = /*#__PURE__*/ _.createContext(void 0);
function Rc(e) {
	let t = _.useContext(Lc);
	if (t === void 0 && !e) throw Error(W(69));
	return t;
}
// node_modules/@base-ui/react/internals/composite/composite.mjs
var zc = "ArrowUp", Bc = "ArrowDown", Vc = "ArrowLeft", Hc = "ArrowRight", Uc = /* @__PURE__ */ new Set([
	zc,
	Bc,
	Vc,
	Hc,
	"Home",
	"End"
]), Wc = [
	"Shift",
	"Control",
	"Alt",
	"Meta"
];
function Gc(e) {
	return qt(e) && e.tagName === "INPUT";
}
function Kc(e) {
	return !!(Gc(e) && e.selectionStart != null || qt(e) && e.tagName === "TEXTAREA");
}
function qc(e, t, n, r) {
	if (!e || !t || !t.scrollTo) return;
	let i = e.scrollLeft, a = e.scrollTop, o = e.clientWidth < e.scrollWidth, s = e.clientHeight < e.scrollHeight;
	if (o && r !== "vertical") {
		let r = Jc(e, t, "left"), a = Yc(e), o = Yc(t);
		n === "ltr" && (r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight ? i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight : r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft && (i = r - o.scrollMarginLeft - a.scrollPaddingLeft)), n === "rtl" && (r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft ? i = r - o.scrollMarginLeft - a.scrollPaddingLeft : r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight && (i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight));
	}
	if (s && r !== "horizontal") {
		let n = Jc(e, t, "top"), r = Yc(e), i = Yc(t);
		n - i.scrollMarginTop < e.scrollTop + r.scrollPaddingTop ? a = n - i.scrollMarginTop - r.scrollPaddingTop : n + t.offsetHeight + i.scrollMarginBottom > e.scrollTop + e.clientHeight - r.scrollPaddingBottom && (a = n + t.offsetHeight + i.scrollMarginBottom - e.clientHeight + r.scrollPaddingBottom);
	}
	e.scrollTo({
		left: i,
		top: a,
		behavior: "auto"
	});
}
function Jc(e, t, n) {
	let r = n === "left" ? "offsetLeft" : "offsetTop", i = 0;
	for (; t.offsetParent && (i += t[r], t.offsetParent !== e);) t = t.offsetParent;
	return i;
}
function Yc(e) {
	let t = getComputedStyle(e);
	return {
		scrollMarginTop: parseFloat(t.scrollMarginTop) || 0,
		scrollMarginRight: parseFloat(t.scrollMarginRight) || 0,
		scrollMarginBottom: parseFloat(t.scrollMarginBottom) || 0,
		scrollMarginLeft: parseFloat(t.scrollMarginLeft) || 0,
		scrollPaddingTop: parseFloat(t.scrollPaddingTop) || 0,
		scrollPaddingRight: parseFloat(t.scrollPaddingRight) || 0,
		scrollPaddingBottom: parseFloat(t.scrollPaddingBottom) || 0,
		scrollPaddingLeft: parseFloat(t.scrollPaddingLeft) || 0
	};
}
// node_modules/@base-ui/react/internals/getDisabledMountTransitionStyles.mjs
function Xc(e) {
	return e === "starting" ? Ma : we;
}
// node_modules/@base-ui/react/menu/submenu-root/MenuSubmenuRootContext.mjs
var Zc = /*#__PURE__*/ _.createContext(void 0);
function Qc() {
	return _.useContext(Zc);
}
// node_modules/@base-ui/react/internals/resolveRenderedId.mjs
function $c(e, t) {
	let n = Ke(e.render);
	if (/*#__PURE__*/ _.isValidElement(n)) {
		let e = n.props;
		if (Object.hasOwn(e, "id")) return e.id ?? "";
	}
	return e.id ?? t;
}
function el(e, t, n) {
	let r = $c(e, t), i = r === t ? void 0 : r;
	return [r, _.useCallback((e) => n?.(e ? i : void 0), [i, n])];
}
// node_modules/@base-ui/react/internals/resolvePopupLabel.mjs
function tl(e, t, n) {
	let r = Ke(e.render), i = /*#__PURE__*/ _.isValidElement(r) ? r.props : void 0, a = e["aria-label"] ?? i?.["aria-label"], o = e["aria-labelledby"] ?? i?.["aria-labelledby"];
	return o == null && !a && (o = t ? t.id || void 0 : n || void 0), o;
}
// node_modules/@base-ui/react/menu/popup/MenuPopup.mjs
var nl = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, id: o, initialFocus: s, ...c } = e, { store: l, defaultFloatingId: u, setRenderedFloatingId: d, virtualFocus: f, orientation: p } = de(), m = Qc(), { side: h, align: g } = le(), v = Rc(!0) != null, y = l.useState("open"), b = l.useState("transitionStatus"), x = l.useState("popupProps"), S = l.useState("mounted"), C = l.useState("instantType"), w = l.useState("activeTriggerElement"), T = l.useState("parent"), E = l.useState("lastOpenChangeReason"), D = l.useState("rootId"), O = l.useState("floatingRootContext"), k = l.useState("floatingTreeRoot"), A = l.useState("closeDelay"), j = l.useState("hoverEnabled"), M = l.useState("disabled"), N = l.useState("openMethod"), P = l.useState("activeTriggerId"), F = l.useState("listElement"), [I, L] = el(e, u, d), R = tl(e, w, P), z = T.type === "menu" ? m : void 0, B = T.type === "context-menu", V = s ?? T.type !== "menu";
	s === void 0 && F && T.type !== "menu" && (V = () => l.state.activeIndex === null && F), mr({
		open: y,
		ref: l.context.popupRef,
		onComplete() {
			y && l.context.onOpenChangeComplete?.(!0);
		}
	}), _.useEffect(() => {
		function e(e) {
			l.setOpen(!1, $n(e.reason, e.domEvent));
		}
		return k.events.on("close", e), () => {
			k.events.off("close", e);
		};
	}, [k.events, l]), hs(O, {
		enabled: j && !M && !B && T.type !== "menubar",
		closeDelay: A
	});
	let ee = l.useStateSetter("popupElement"), { parentVirtualFocusRef: H, handleFocus: te } = (_.useContext(It)?.useParentHandoff ?? il)(l, T, y, f), ne = He("div", e, {
		state: {
			transitionStatus: b,
			side: h,
			align: g,
			open: y,
			nested: T.type === "menu",
			instant: C
		},
		ref: [
			t,
			l.context.popupRef,
			ee,
			L
		],
		stateAttributesMapping: pt,
		props: [
			x,
			{
				id: I,
				...F ? { role: "presentation" } : {
					role: "menu",
					"aria-orientation": p === "horizontal" ? "horizontal" : void 0,
					"aria-labelledby": R
				},
				onKeyDown(e) {
					z?.onPopupKeyDown?.(e), v && Uc.has(e.key) && e.stopPropagation();
				},
				onFocus: te
			},
			Xc(b),
			c,
			{ "data-rootownerid": D }
		]
	}), re = T.type === void 0 || B;
	(w || T.type === "menubar" && E !== "outside-press") && (re = !0);
	let ie = z?.getReturnElement ?? H;
	return /*#__PURE__*/ (0, Y.jsx)(ao, {
		context: O,
		openInteractionType: N,
		modal: B,
		disabled: !S,
		returnFocus: a ?? ie ?? re,
		explicitReturnFocus: a === void 0 && ie ? !1 : void 0,
		initialFocus: V,
		restoreFocus: !0,
		getInsideElements: T.type === void 0 ? () => [l.context.beforeTriggerFocusGuardRef.current] : void 0,
		externalTree: T.type === "menubar" ? void 0 : k,
		previousFocusableElement: w,
		nextFocusableElement: T.type === void 0 ? l.context.triggerFocusTargetRef : void 0,
		beforeContentFocusGuardRef: l.context.beforeContentFocusGuardRef,
		children: ne
	});
}), rl = {
	parentVirtualFocusRef: void 0,
	handleFocus: void 0
};
function il() {
	return rl;
}
var al = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let n = Lt()?.Popup ?? nl;
	return /*#__PURE__*/ (0, Y.jsx)(n, {
		...e,
		ref: t
	});
}), ol = /*#__PURE__*/ _.createContext(void 0);
function sl() {
	let e = _.useContext(ol);
	if (e === void 0) throw Error(W(32));
	return e;
}
// node_modules/@base-ui/react/menu/portal/MenuPortal.mjs
var cl = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i, parent: a } = de();
	if (!(i.useState("mounted") || n)) return null;
	let o = a.type === "menu" || a.type === "menubar" ? "group" : void 0;
	return /*#__PURE__*/ (0, Y.jsx)(ol.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, Y.jsx)(Va, {
			ref: t,
			...r,
			portalOwnerRole: o
		})
	});
});
// node_modules/@base-ui/utils/inertValue.mjs
function ll(e) {
	return ye(19) ? e : e ? "true" : void 0;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useFloating.mjs
function ul(e) {
	let { nodeId: t, externalTree: n, rootContext: r } = e, i = r.useState("referenceElement"), a = r.useState("floatingElement"), o = r.useState("domReferenceElement"), s = r.useState("open"), c = r.useState("floatingId"), [l, u] = _.useState(null), d = _.useRef(null), f = qa(n), p = _.useMemo(() => ({
		reference: i,
		floating: a,
		domReference: o
	}), [
		i,
		a,
		o
	]), m = jc({
		...e,
		elements: {
			...p,
			...l && { reference: l }
		}
	}), h = _.useCallback((e) => {
		let t = Kt(e) ? {
			getBoundingClientRect: () => e.getBoundingClientRect(),
			getClientRects: () => e.getClientRects(),
			contextElement: e
		} : e;
		u(t), m.refs.setReference(t);
	}, [m.refs]), g = _.useMemo(() => ({
		...m.refs,
		setPositionReference: h,
		domReference: d
	}), [m.refs, h]), v = _.useMemo(() => ({
		...m.elements,
		domReference: o
	}), [m.elements, o]), y = _.useMemo(() => ({
		...m,
		dataRef: r.context.dataRef,
		open: s,
		onOpenChange: r.setOpen,
		events: r.context.events,
		floatingId: c,
		refs: g,
		elements: v,
		nodeId: t,
		rootStore: r
	}), [
		m,
		g,
		v,
		t,
		r,
		s,
		c
	]);
	return J(() => {
		o && (d.current = o);
	}, [o]), J(() => {
		r.context.dataRef.current.floatingContext = y;
		let e = f?.nodesRef.current.find((e) => e.id === t);
		e && (e.context = y);
	}), _.useMemo(() => ({
		...m,
		context: y,
		refs: g,
		elements: v,
		rootStore: r
	}), [
		m,
		g,
		v,
		y,
		r
	]);
}
// node_modules/@base-ui/react/internals/direction-context/DirectionContext.mjs
var dl = /*#__PURE__*/ _.createContext(void 0);
function fl() {
	return _.useContext(dl)?.direction ?? "ltr";
}
// node_modules/@base-ui/react/floating-ui-react/middleware/arrow.mjs
var pl = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = yi(e, t) || {};
		if (l == null) return {};
		let d = Li(u), f = {
			x: n,
			y: r
		}, p = Ti(i), m = Ci(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = s.floating[y] || a.floating[m], C = b / 2 - x / 2, w = S / 2 - h[m] / 2 - 1, T = Math.min(d[_], w), E = Math.min(d[v], w), D = T, O = S - h[m] - E, k = S / 2 - h[m] / 2 + C, A = vi(D, k, O), j = !c.arrow && xi(i) != null && k !== A && a.reference[m] / 2 - (k < D ? T : E) - h[m] / 2 < 0, M = j ? k < D ? k - D : k - O : 0;
		return {
			[p]: f[p] + M,
			data: {
				[p]: A,
				centerOffset: k - A - M,
				...j && { alignmentOffset: M }
			},
			reset: j
		};
	}
}), ml = (e, t) => {
	let { name: n, fn: r } = pl(e);
	return {
		name: n,
		fn: r,
		options: [e, t]
	};
}, hl = {
	name: "hide",
	async fn(e) {
		let { width: t, height: n, x: r, y: i } = e.rects.reference, a = t === 0 && n === 0 && r === 0 && i === 0, o = await e.platform.detectOverflow(e, { elementContext: "reference" });
		return { data: { referenceHidden: o.top - n >= 0 || o.right - t >= 0 || o.bottom - n >= 0 || o.left - t >= 0 || a } };
	}
}, gl = {
	sideX: "left",
	sideY: "top"
}, _l = "--available-width", vl = "--available-height", yl = "--anchor-width", bl = "--anchor-height", xl = "--transform-origin", Sl = _l, Cl = vl;
function wl(e, t, n) {
	let r = e === "inline-start" || e === "inline-end";
	return {
		top: "top",
		right: r ? n ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: r ? n ? "inline-end" : "inline-start" : "left"
	}[t];
}
function Tl(e, t, n) {
	let { rects: r, placement: i } = e;
	return {
		side: wl(t, bi(i), n),
		align: xi(i) || "center",
		anchor: {
			width: r.reference.width,
			height: r.reference.height
		},
		positioner: {
			width: r.floating.width,
			height: r.floating.height
		}
	};
}
function El(e) {
	return Dl(e, ul);
}
function Dl(e, t) {
	let { anchor: n, positionMethod: r = "absolute", side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, collisionBoundary: c, collisionPadding: l = 5, sticky: u = !1, arrowPadding: d = 5, disableAnchorTracking: f = !1, inline: p, keepMounted: m = !1, floatingRootContext: h, mounted: g, collisionAvoidance: v, shift: y, nodeId: b, adaptiveOrigin: x, lazyFlip: S = !1, externalTree: C } = e, w = v.side || "flip", T = v.align || "flip", E = v.fallbackAxisSide || "end", D = y?.crossAxis ?? !1, O = y?.rootBoundary, k = typeof n == "function" ? n : void 0, A = q(k), j = k ? A : n, M = oi(n), N = oi(g), P = fl() === "rtl", [F, I] = _.useState(null);
	!g && F !== null && I(null);
	let L = S === "placement", R = F ? bi(F) : null, z = F && L ? xi(F) || "center" : null, B = R || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": P ? "left" : "right",
		"inline-start": P ? "right" : "left"
	}[i], V = z || o, ee = V === "center" ? B : `${B}-${V}`, H = l;
	typeof H == "number" ? H = {
		top: H,
		right: H,
		bottom: H,
		left: H
	} : H &&= {
		top: H.top || 0,
		right: H.right || 0,
		bottom: H.bottom || 0,
		left: H.left || 0
	};
	let te = +(i === "bottom"), ne = +(i === "top"), re = +(i === "right"), ie = +(i === "left"), ae = {
		boundary: c === "clipping-ancestors" ? "clippingAncestors" : c,
		padding: H
	}, oe = _.useRef(null), se = oi(a), U = oi(s), W = typeof a == "function" ? 0 : a, ce = typeof s == "function" ? 0 : s, le = [];
	p && le.push(p), le.push(Mc((e) => {
		let t = Tl(e, i, P), n = typeof se.current == "function" ? se.current(t) : se.current, r = typeof U.current == "function" ? U.current(t) : U.current;
		return {
			mainAxis: n,
			crossAxis: r,
			alignmentAxis: r
		};
	}, [
		W,
		ce,
		P,
		i
	]));
	let ue = T === "none" && w !== "shift", de = !ue && (u || D || w === "shift"), fe = w === "none" ? null : Fc({
		...ae,
		padding: {
			top: H.top + 1 + te,
			right: H.right + 1 + ie,
			bottom: H.bottom + 1 + ne,
			left: H.left + 1 + re
		},
		mainAxis: !D && w === "flip",
		crossAxis: T === "flip" && "alignment",
		fallbackAxisSideDirection: E
	}), G = ue ? null : Nc({
		...ae,
		rootBoundary: O,
		mainAxis: T !== "none",
		crossAxis: de,
		limiter: u || D ? void 0 : Pc((e) => {
			if (!oe.current) return {};
			let { width: t, height: n } = oe.current.getBoundingClientRect(), r = wi(bi(e.placement)), i = r === "y" ? t : n, a = r === "y" ? H.left + H.right : H.top + H.bottom;
			return { offset: i / 2 + a / 2 };
		})
	}, [
		ae,
		u,
		D,
		O,
		H,
		T
	]);
	w === "shift" || T === "shift" || V === "center" ? le.push(G, fe) : le.push(fe, G), le.push(Ic({
		...ae,
		apply({ elements: { floating: e }, availableWidth: t, availableHeight: n, rects: r }) {
			if (!N.current) return;
			let i = e.style;
			i.setProperty(Sl, `${t}px`), i.setProperty(Cl, `${n}px`);
			let a = Ut(e).devicePixelRatio || 1, { x: o, y: s, width: c, height: l } = r.reference, u = (Math.round((o + c) * a) - Math.round(o * a)) / a, d = (Math.round((s + l) * a) - Math.round(s * a)) / a;
			i.setProperty(yl, `${u}px`), i.setProperty(bl, `${d}px`);
		}
	}), ml((e) => ({
		element: oe.current || xn(e.elements.floating).createElement("div"),
		padding: oe.current ? d : 0
	}), [d]), {
		name: "transformOrigin",
		fn(e) {
			let { elements: { floating: t }, middlewareData: n, placement: r, platform: o, rects: s, y: c } = e, l = bi(r), u = xi(r), d = wi(l) === "y", f = oe.current, p = typeof a == "function" ? a(Tl(e, i, P)) : a, m;
			m = !f && u && Math.abs(d ? n.shift?.x || 0 : n.shift?.y || 0) <= 1 ? u === "start" === (d && o.isRTL?.(t) === !0) ? "100%" : "0%" : `${(d ? n.arrow?.x || 0 : n.arrow?.y || 0) + (d ? f?.clientWidth || 0 : f?.clientHeight || 0) / 2}px`;
			let h = l === "top" || l === "left" ? `calc(100% + ${p}px)` : `${-p}px`;
			return de && d && Math.abs(n.shift?.y || 0) > p && (h = `${s.reference.y + s.reference.height / 2 - c}px`), t.style.setProperty(xl, d ? `${m} ${h}` : `${h} ${m}`), {};
		}
	}, hl, x), J(() => {
		!g && h && h.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null,
			positionReference: null
		});
	}, [g, h]);
	let pe = _.useMemo(() => ({
		ancestorScroll: !f,
		elementResize: !f && typeof ResizeObserver < "u",
		layoutShift: !f && typeof IntersectionObserver < "u"
	}), [f]), { refs: K, elements: me, x: he, y: ge, middlewareData: _e, update: ve, placement: ye, context: be, isPositioned: xe, floatingStyles: Se } = t({
		rootContext: h,
		open: m ? g : void 0,
		placement: ee,
		middleware: le,
		strategy: r,
		whileElementsMounted: m ? void 0 : (...e) => yc(...e, pe),
		nodeId: b,
		externalTree: C
	}), { sideX: Ce, sideY: we } = _e.adaptiveOrigin || gl, Te = xe ? r : "fixed", Ee = _.useMemo(() => {
		let e;
		return e = xe ? x ? {
			position: Te,
			[Ce]: he,
			[we]: ge
		} : {
			...Se,
			position: Te
		} : {
			position: Te,
			top: 0,
			left: 0
		}, e[Sl] = "100vw", e[Cl] = "100vh", xe || (e.opacity = 0), e;
	}, [
		x,
		Te,
		Ce,
		he,
		we,
		ge,
		Se,
		xe
	]), De = _.useRef(null);
	J(() => {
		if (!g) return;
		let e = M.current, t = typeof e == "function" ? e() : e, n = (Ol(t) ? t.current : t) || null;
		n !== De.current && (K.setPositionReference(n), De.current = n);
	}, [
		g,
		K,
		j,
		M
	]), _.useEffect(() => {
		if (!g) return;
		let e = M.current;
		typeof e != "function" && Ol(e) && e.current !== De.current && (K.setPositionReference(e.current), De.current = e.current);
	}, [
		g,
		K,
		j,
		M
	]), _.useEffect(() => {
		if (m && g && me.reference && me.floating) return yc(me.reference, me.floating, ve, pe);
	}, [
		m,
		g,
		me,
		ve,
		pe
	]);
	let Oe = bi(ye), ke = wl(i, Oe, P), Ae = xi(ye) || "center", je = !!_e.hide?.referenceHidden;
	J(() => {
		S && g && xe && (Oe !== B || L && Ae !== V) && I(ye);
	}, [
		S,
		L,
		g,
		xe,
		ye,
		Oe,
		Ae,
		B,
		V
	]);
	let Me = _.useMemo(() => ({
		position: "absolute",
		top: _e.arrow?.y,
		left: _e.arrow?.x
	}), [_e.arrow]), Ne = _e.arrow?.centerOffset !== 0;
	return _.useMemo(() => ({
		positionerStyles: Ee,
		arrowStyles: Me,
		arrowRef: oe,
		arrowUncentered: Ne,
		side: ke,
		align: Ae,
		physicalSide: Oe,
		anchorHidden: je,
		refs: K,
		context: be,
		isPositioned: xe,
		update: ve
	}), [
		Ee,
		Me,
		oe,
		Ne,
		ke,
		Ae,
		Oe,
		je,
		K,
		be,
		xe,
		ve
	]);
}
function Ol(e) {
	return e != null && "current" in e;
}
// node_modules/@base-ui/react/internals/composite/list/CompositeList.mjs
function kl(e) {
	let { children: t, elementsRef: n, labelsRef: r, onMapChange: i } = e, a = q(i), [, o] = _.useState(0), s = G(jl).current, c = G(Al).current, l = _.useRef(0), u = _.useRef(!0), d = _.useRef(null), f = _.useRef(null), p = q(() => {
		u.current || (u.current = !0, o((e) => e + 1));
	}), m = q((e, t) => {
		c.set(e, t), p();
	}), h = q((e) => {
		c.delete(e), p();
	}), g = q((e) => {
		let t = /* @__PURE__ */ new Map();
		return n.current.length = 0, r && (r.current.length = 0), e.forEach((e) => {
			t.set(e.element, {
				...e.registration.metadata ?? {},
				index: e.index
			}), n.current[e.index] = e.element, r && (r.current[e.index] = e.registration.label === void 0 ? e.registration.textRef?.current?.textContent ?? e.element.textContent : e.registration.label);
		}), l.current = n.current.length, t;
	});
	function v(e) {
		if (f.current?.disconnect(), f.current = null, typeof MutationObserver != "function" || e.length < 2) return;
		let t = new MutationObserver((n) => {
			if (!Pl(n)) return;
			let r = null;
			for (let n of e) if (n.isConnected) {
				if (r && Fl(r, n) > 0) {
					t.disconnect(), p();
					return;
				}
				r = n;
			}
		});
		f.current = t;
		let n = /* @__PURE__ */ new Set();
		for (let t = 1; t < e.length; t += 1) {
			let r = Nl(e[t - 1], e[t]);
			r && n.add(r);
		}
		n.forEach((e) => t.observe(e, { childList: !0 }));
	}
	let y = q(() => {
		let [e, t] = Ml(c), n = g(e), r = d.current, i = !r || r.length !== e.length || e.some((e, t) => {
			let n = r[t];
			return e.index !== n.index || e.element !== n.element || e.registration.index !== n.registration.index || e.registration.metadata !== n.registration.metadata;
		});
		v(t), d.current = e, u.current = !1, i && (s.forEach((e) => e(n)), a(n));
	});
	J(() => (!u.current && d.current && g(d.current), () => {
		n.current = [], r && (r.current = []);
	}), [
		n,
		r,
		g
	]), J(() => {
		u.current && y();
	}), J(() => () => {
		f.current?.disconnect(), u.current = !0;
	}, []);
	let b = q((e) => (s.add(e), () => {
		s.delete(e);
	})), x = _.useMemo(() => ({
		register: m,
		unregister: h,
		subscribeMapChange: b,
		nextIndexRef: l
	}), [
		m,
		h,
		b,
		l
	]);
	return /*#__PURE__*/ (0, Y.jsx)(Wn.Provider, {
		value: x,
		children: t
	});
}
function Al() {
	return /* @__PURE__ */ new Map();
}
function jl() {
	return /* @__PURE__ */ new Set();
}
function Ml(e) {
	let t = /* @__PURE__ */ new Set(), n = [], r = [];
	e.forEach((e, i) => {
		if (!i.isConnected) return;
		let a = e.index, o = {
			index: a ?? -1,
			element: i,
			registration: e
		};
		a === null ? r.push(o) : a >= 0 && (t.add(a), n.push(o));
	});
	let i = 0;
	return r.sort((e, t) => Fl(e.element, t.element)), r.forEach((e) => {
		for (; t.has(i);) i += 1;
		e.index = i, n.push(e), i += 1;
	}), t.size > 0 && n.sort((e, t) => e.index - t.index), [n, r.map((e) => e.element)];
}
function Nl(e, t) {
	let n = e.parentElement;
	for (; n && !n.contains(t);) n = n.parentElement;
	return n;
}
function Pl(e) {
	for (let t of e) for (let e = 0; e < t.removedNodes.length; e += 1) if (t.removedNodes[e].isConnected) return !0;
	return !1;
}
function Fl(e, t) {
	return e.nextElementSibling === t ? -1 : t.nextElementSibling === e ? 1 : e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
// node_modules/@base-ui/react/utils/InternalBackdrop.mjs
var Il = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { cutout: n, ...r } = e, i;
	if (n) {
		let e = n.getBoundingClientRect();
		i = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${e.left}px ${e.top}px,${e.left}px ${e.bottom}px,${e.right}px ${e.bottom}px,${e.right}px ${e.top}px,${e.left}px ${e.top}px)`;
	}
	return /*#__PURE__*/ (0, Y.jsx)("div", {
		ref: t,
		role: "presentation",
		"data-base-ui-inert": "",
		...r,
		style: {
			position: "fixed",
			inset: 0,
			userSelect: "none",
			WebkitUserSelect: "none",
			clipPath: i
		}
	});
});
// node_modules/@base-ui/react/internals/useTriggerSwitchTransition.mjs
function Ll(e) {
	let { store: t, domReference: n, positionerElement: r, open: i } = e, a = _.useRef(null), o = _.useRef(null), s = pr(r);
	J(() => {
		i || (o.current?.abort(), o.current = null, t.state.instantType === "trigger-change" && t.set("instantType", void 0));
	}, [i, t]), J(() => {
		let e = n, r = a.current;
		if (e && (a.current = e), !r || !e || e === r || !t.select("open")) return;
		t.set("instantType", void 0);
		let i = new AbortController();
		return o.current = i, s(() => {
			t.select("open") && t.set("instantType", "trigger-change");
		}, i.signal), () => {
			i.abort();
		};
	}, [
		n,
		s,
		t
	]);
}
// node_modules/@base-ui/react/utils/usePositioner.mjs
function Rl(e, t, { styles: n, transitionStatus: r, props: i, refs: a, hidden: o, inert: s = !1 }) {
	let c = { ...n };
	return s && (c.pointerEvents = "none"), He("div", e, {
		state: t,
		ref: a,
		props: [
			{
				role: "presentation",
				hidden: o,
				style: c
			},
			Xc(r),
			i
		],
		stateAttributesMapping: ft
	});
}
// node_modules/@base-ui/utils/useScrollLock.mjs
var zl = {}, Bl = {}, Vl = "";
function Hl(e, t) {
	return Yt(e) ? e : t;
}
function Ul(e, t, n) {
	return /hidden|clip/.test(e.getComputedStyle(Hl(t, n)).overflowY);
}
function Wl(e) {
	if (typeof document > "u") return !1;
	let t = xn(e);
	return Ut(t).innerWidth - t.documentElement.clientWidth > 0;
}
function Gl(e) {
	if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u") return !1;
	let t = xn(e), n = t.documentElement, r = t.body, i = Hl(n, r), a = i.style.overflowY, o = n.style.scrollbarGutter;
	n.style.scrollbarGutter = "stable", i.style.overflowY = "scroll";
	let s = i.offsetWidth;
	i.style.overflowY = "hidden";
	let c = i.offsetWidth;
	return i.style.overflowY = a, n.style.scrollbarGutter = o, s === c;
}
function Kl(e) {
	let t = xn(e), n = t.documentElement, r = t.body, i = Hl(n, r), a = {
		overflowY: i.style.overflowY,
		overflowX: i.style.overflowX
	};
	return Object.assign(i.style, {
		overflowY: "hidden",
		overflowX: "hidden"
	}), () => {
		Object.assign(i.style, a);
	};
}
function ql(e) {
	let t = xn(e), n = t.documentElement, r = t.body, i = Ut(n), a = 0, o = 0, s = !1, c = or.create();
	if (Ln && (i.visualViewport?.scale ?? 1) !== 1) return () => {};
	function l() {
		let t = i.getComputedStyle(n), c = i.getComputedStyle(r), l = (t.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
		a = n.scrollTop, o = n.scrollLeft, zl = {
			scrollbarGutter: n.style.scrollbarGutter,
			overflowY: n.style.overflowY,
			overflowX: n.style.overflowX
		}, Vl = n.style.scrollBehavior, Bl = {
			position: r.style.position,
			height: r.style.height,
			width: r.style.width,
			boxSizing: r.style.boxSizing,
			overflowY: r.style.overflowY,
			overflowX: r.style.overflowX,
			scrollBehavior: r.style.scrollBehavior
		};
		let u = n.scrollHeight > n.clientHeight, d = n.scrollWidth > n.clientWidth, f = t.overflowY === "scroll" || c.overflowY === "scroll", p = t.overflowX === "scroll" || c.overflowX === "scroll", m = Math.max(0, i.innerWidth - r.clientWidth), h = Math.max(0, i.innerHeight - r.clientHeight), g = parseFloat(c.marginTop) + parseFloat(c.marginBottom), _ = parseFloat(c.marginLeft) + parseFloat(c.marginRight), v = Hl(n, r);
		s = Gl(e), s ? (n.style.scrollbarGutter = l, v.style.overflowY = "hidden", v.style.overflowX = "hidden") : (Object.assign(n.style, {
			scrollbarGutter: l,
			overflowY: "hidden",
			overflowX: "hidden"
		}), (u || f) && (n.style.overflowY = "scroll"), (d || p) && (n.style.overflowX = "scroll"), Object.assign(r.style, {
			position: "relative",
			height: g || h ? `calc(100dvh - ${g + h}px)` : "100dvh",
			width: _ || m ? `calc(100vw - ${_ + m}px)` : "100vw",
			boxSizing: "border-box",
			overflowY: "hidden",
			overflowX: "hidden",
			scrollBehavior: "unset"
		}), r.scrollTop = a, r.scrollLeft = o, n.setAttribute("data-base-ui-scroll-locked", ""), n.style.scrollBehavior = "unset");
	}
	function u() {
		Object.assign(n.style, zl), Object.assign(r.style, Bl), s || (n.scrollTop = a, n.scrollLeft = o, n.removeAttribute("data-base-ui-scroll-locked"), n.style.scrollBehavior = Vl);
	}
	function d() {
		u(), c.request(l);
	}
	l();
	let f = ii(i, "resize", d);
	return () => {
		c.cancel(), u(), typeof i.removeEventListener == "function" && f();
	};
}
var Jl = new class {
	lockCount = 0;
	restore = null;
	timeoutLock = Cr.create();
	timeoutUnlock = Cr.create();
	acquire(e) {
		return this.lockCount += 1, this.lockCount === 1 && this.restore === null && this.timeoutLock.start(0, () => this.lock(e)), this.release;
	}
	release = () => {
		--this.lockCount, this.lockCount === 0 && this.restore && this.timeoutUnlock.start(0, this.unlock);
	};
	unlock = () => {
		this.lockCount === 0 && this.restore && (this.restore?.(), this.restore = null);
	};
	lock(e) {
		if (this.lockCount === 0 || this.restore !== null) return;
		let t = xn(e), n = t.documentElement, r = t.body, i = Ut(n);
		if (Ul(i, n, r)) {
			let t = new i.MutationObserver(() => {
				Ul(i, n, r) || (t.disconnect(), this.restore = null, this.lock(e));
			}), a = { attributes: !0 };
			t.observe(n, a), t.observe(r, a), this.restore = () => t.disconnect();
			return;
		}
		let a = Mn || !Wl(e);
		this.restore = a ? Kl(e) : ql(e);
	}
}();
function Yl(e = !0, t = null) {
	J(() => {
		if (e) return Jl.acquire(t);
	}, [e, t]);
}
// node_modules/@base-ui/react/utils/useAnchoredPopupScrollLock.mjs
var Xl = 20;
function Zl(e, t, n, r) {
	let [i, a] = _.useState(!1);
	J(() => {
		if (!e || !t || n == null) {
			a(!1);
			return;
		}
		let r = xn(n).documentElement.clientWidth, i = n.offsetWidth;
		a(r > 0 && i > 0 && i >= r - Xl);
	}, [
		e,
		t,
		n
	]), Yl(e && (!t || i), r);
}
// node_modules/@base-ui/react/menu/positioner/MenuPositioner.mjs
var Ql = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o, align: s, sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = Pa, style: g, ...v } = e, { store: y, virtualFocus: b, syncHighlightedItem: x } = de(), S = sl(), C = ht(!0), w = y.useState("parent"), T = y.useState("floatingRootContext"), E = y.useState("floatingTreeRoot"), D = y.useState("mounted"), O = y.useState("open"), k = y.useState("modal"), A = y.useState("openMethod"), j = y.useState("activeTriggerElement"), M = y.useState("transitionStatus"), N = y.useState("positionerElement"), P = y.useState("instantType"), F = y.useState("adaptiveOrigin"), I = y.useState("lastOpenChangeReason"), L = y.useState("floatingNodeId"), R = y.useState("floatingParentNodeId"), z = T.useState("domReferenceElement"), B = n, V = c, ee = l, H = s, te = h;
	w.type === "context-menu" && (B = n ?? w.context?.anchor, H ??= "start", !o && H !== "center" && (ee = e.alignOffset ?? 2, V = e.sideOffset ?? -5));
	let ne = o, re = H;
	w.type === "menu" ? (ne ??= "inline-end", re ??= "start", te = e.collisionAvoidance ?? Fa) : w.type === "menubar" && (ne ??= w.context.orientation === "vertical" ? "inline-end" : "bottom", re ??= "start");
	let ie = w.type === "context-menu", ae = El({
		anchor: B,
		floatingRootContext: T,
		positionMethod: C ? "fixed" : r,
		mounted: D,
		side: ne,
		sideOffset: V,
		align: re,
		alignOffset: ee,
		arrowPadding: ie ? 0 : f,
		collisionBoundary: u,
		collisionPadding: d,
		sticky: p,
		nodeId: L,
		keepMounted: S,
		disableAnchorTracking: m,
		collisionAvoidance: te,
		shift: ie ? {
			crossAxis: !("side" in te && te.side === "flip"),
			rootBoundary: "layoutViewport"
		} : void 0,
		externalTree: E,
		adaptiveOrigin: F,
		lazyFlip: b ? "placement" : !1
	});
	_.useEffect(() => {
		function e(e) {
			e.open && (e.parentNodeId === L && y.set("hoverEnabled", !1), e.nodeId !== L && e.parentNodeId === y.select("floatingParentNodeId") && y.setOpen(!1, $n(kt)));
		}
		return E.events.on("menuopenchange", e), () => {
			E.events.off("menuopenchange", e);
		};
	}, [
		y,
		E.events,
		L
	]), _.useEffect(() => {
		if (y.select("floatingParentNodeId") == null) return;
		function e(e) {
			if (e.open || e.nodeId !== y.select("floatingParentNodeId")) return;
			let t = e.reason ?? "sibling-open";
			y.setOpen(!1, $n(t));
		}
		return E.events.on("menuopenchange", e), () => {
			E.events.off("menuopenchange", e);
		};
	}, [E.events, y]);
	let oe = wr();
	_.useEffect(() => {
		O || oe.clear();
	}, [O, oe]), _.useEffect(() => {
		function e(e) {
			if (O && e.nodeId === y.select("floatingParentNodeId")) {
				if (e.target && j && j !== e.target) {
					let e = y.select("closeDelay");
					e > 0 ? oe.isStarted() || oe.start(e, () => {
						y.setOpen(!1, $n(kt));
					}) : y.setOpen(!1, $n(kt));
				} else oe.clear();
			}
		}
		return E.events.on("itemhover", e), () => {
			E.events.off("itemhover", e);
		};
	}, [
		E.events,
		O,
		j,
		y,
		oe
	]), _.useEffect(() => {
		let e = {
			open: O,
			nodeId: L,
			parentNodeId: R,
			reason: y.select("lastOpenChangeReason")
		};
		E.events.emit("menuopenchange", e);
	}, [
		E.events,
		O,
		y,
		L,
		R
	]), Ll({
		store: y,
		domReference: z,
		positionerElement: N,
		open: O
	});
	let se = {
		open: O,
		side: ae.side,
		align: ae.align,
		anchorHidden: ae.anchorHidden,
		nested: w.type === "menu",
		instant: P
	}, U = w.type === "menubar" && w.context.modal;
	Zl(O && (U || k && I !== "trigger-hover"), A === "touch", N, j);
	let W = Rl(e, se, {
		styles: ae.positionerStyles,
		transitionStatus: M,
		props: v,
		refs: [t, y.useStateSetter("positionerElement")],
		hidden: !D,
		inert: !O
	}), le = D && w.type !== "menu" && (w.type !== "menubar" && k && I !== "trigger-hover" || w.type === "menubar" && w.context.modal), ue = null;
	return w.type === "menubar" ? ue = w.context.contentElement : w.type === void 0 && (ue = j), /*#__PURE__*/ (0, Y.jsxs)(ce.Provider, {
		value: ae,
		children: [le && /*#__PURE__*/ (0, Y.jsx)(Il, {
			ref: w.type === "context-menu" || w.type === "nested-context-menu" ? w.context.internalBackdropRef : null,
			inert: ll(!O),
			cutout: ue
		}), /*#__PURE__*/ (0, Y.jsx)(Ya, {
			id: L,
			children: /*#__PURE__*/ (0, Y.jsx)(kl, {
				elementsRef: y.context.itemDomElements,
				labelsRef: y.context.itemLabels,
				onMapChange: x,
				children: W
			})
		})]
	});
}), $l = /*#__PURE__*/ _.createContext(null);
function eu(e) {
	let t = _.useContext($l);
	if (t === null && !e) throw Error(W(5));
	return t;
}
// node_modules/@base-ui/utils/useEnhancedClickHandler.mjs
function tu(e) {
	let t = _.useRef(""), n = _.useCallback((n) => {
		n.defaultPrevented || (t.current = n.pointerType, e(n, n.pointerType));
	}, [e]);
	return {
		onClick: _.useCallback((n) => {
			n.detail === 0 ? e(n, "keyboard") : ("pointerType" in n ? e(n, n.pointerType) : e(n, t.current), t.current = "");
		}, [e]),
		onPointerDown: n
	};
}
// node_modules/@base-ui/react/internals/useValueChanged.mjs
function nu(e, t) {
	let n = _.useRef(e), r = q(t);
	J(() => {
		n.current !== e && r(n.current), n.current = e;
	}, [e, r]);
}
// node_modules/@base-ui/react/utils/useOpenInteractionType.mjs
function ru(e, t) {
	let { onClick: n, onPointerDown: r } = tu(q((n, r) => {
		(typeof e == "function" ? e() : e) || t(r || (Mn ? "touch" : ""));
	}));
	return _.useMemo(() => ({
		onClick: n,
		onPointerDown: r
	}), [n, r]);
}
function iu(e) {
	let [t, n] = _.useState(null), r = ru(e, n);
	return nu(e, (t) => {
		t && !e && n(null);
	}), _.useMemo(() => ({
		openMethod: t,
		triggerProps: r
	}), [t, r]);
}
// node_modules/@base-ui/react/utils/getHighlightReason.mjs
function au(e) {
	return e == null ? gt : e.type.startsWith("key") ? Et : e.type.startsWith("mouse") || e.type.startsWith("pointer") ? Dt : gt;
}
// node_modules/@base-ui/react/menu/store/MenuStore.mjs
var ou = {
	...as,
	disabled: (e) => e.parent.type === "menubar" && e.parent.context.disabled || e.disabled,
	modal: (e) => (e.parent.type === void 0 || e.parent.type === "context-menu") && (e.modal ?? !0),
	openMethod: (e) => e.openMethod,
	keyboardOpen: (e) => e.keyboardOpen,
	allowMouseEnter: (e) => e.allowMouseEnter,
	highlightItemOnHover: (e) => e.highlightItemOnHover,
	parent: (e) => e.parent,
	rootId: (e) => e.parent.type === "menu" ? e.parent.store.select("rootId") : e.parent.type === void 0 ? e.rootId : e.parent.context.rootId,
	activeIndex: (e) => e.activeIndex,
	listElement: (e) => e.listElement,
	triggerControlsId: (e, t) => {
		let n = as.triggerPopupId(e, t);
		return n ? e.listElement?.id || n : void 0;
	},
	filterTriggerProps: (e) => e.filterTriggerProps,
	inputProps: (e) => e.inputProps,
	webkitAriaSelected: (e, t) => Ln && e.inputFocused && t ? !0 : void 0,
	highlightedItemId: (e) => e.highlightedItem?.id || void 0,
	isActive: (e, t) => e.activeIndex === t,
	hoverEnabled: (e) => e.hoverEnabled,
	instantType: (e) => e.instantType === "trigger-change" && !as.open(e) ? void 0 : e.instantType,
	lastOpenChangeReason: (e) => e.openChangeReason,
	floatingTreeRoot: (e) => e.parent.type === "menu" ? e.parent.store.select("floatingTreeRoot") : e.floatingTreeRoot,
	floatingNodeId: (e) => e.floatingNodeId,
	floatingParentNodeId: (e) => e.floatingParentNodeId,
	itemProps: (e) => e.itemProps,
	closeDelay: (e) => e.closeDelay,
	adaptiveOrigin: (e) => e.adaptiveOrigin,
	keyboardEventRelay: (e) => {
		if (e.keyboardEventRelay) return e.keyboardEventRelay;
		if (e.parent.type === "menu") return e.parent.store.select("keyboardEventRelay");
	}
}, su = class extends Xo {
	constructor(e, t, n = !1) {
		let r = new Ao(), i = lu(r, t, n, e);
		super(i, cu(r), ou), this.observe("parent", (e) => {
			e.type === "menu" ? this.context.allowMouseUpTriggerRef = e.store.context.allowMouseUpTriggerRef : e.type !== void 0 && (this.context.allowMouseUpTriggerRef = e.context.allowMouseUpTriggerRef);
		});
	}
	subscribeToParentMenu() {
		let e = this.state.parent;
		if (e.type !== "menu") return;
		let t = e.store.select("rootId"), n = e.store.select("floatingTreeRoot"), r = e.store.select("keyboardEventRelay");
		return e.store.subscribe(() => {
			let i = e.store.select("rootId"), a = e.store.select("floatingTreeRoot"), o = e.store.select("keyboardEventRelay");
			(t !== i || n !== a || r !== o) && (t = i, n = a, r = o, this.notifyAll());
		});
	}
	setOpen(e, t) {
		this.state.floatingRootContext.context.events.emit("setOpen", {
			open: e,
			eventDetails: t
		});
	}
	setActiveIndex(e, t, n) {
		if (this.state.activeIndex !== e) {
			let r = (e === null ? void 0 : this.context.itemDomElements.current[e]) === this.context.reportedItem;
			this.context.highlightReason = r ? "none" : t, this.context.highlightEvent = r ? void 0 : n;
		}
		this.set("activeIndex", e);
	}
	highlightItem(e, t, n) {
		let r = this.context.itemDomElements.current.indexOf(e);
		r > -1 && this.setActiveIndex(r, t, n);
	}
};
function cu(e) {
	return {
		positionerRef: /*#__PURE__*/ _.createRef(),
		popupRef: /*#__PURE__*/ _.createRef(),
		typingRef: { current: !1 },
		itemDomElements: { current: [] },
		itemLabels: { current: [] },
		highlightReason: "none",
		highlightEvent: void 0,
		reportedItem: void 0,
		allowMouseUpTriggerRef: { current: !1 },
		virtualFocusRef: void 0,
		triggerFocusTargetRef: /*#__PURE__*/ _.createRef(),
		beforeTriggerFocusGuardRef: /*#__PURE__*/ _.createRef(),
		beforeContentFocusGuardRef: /*#__PURE__*/ _.createRef(),
		onOpenChangeComplete: void 0,
		triggerElements: e
	};
}
function lu(e, t, n = !1, r) {
	return {
		...$o(e, t, n),
		disabled: !1,
		modal: !0,
		openMethod: null,
		keyboardOpen: !1,
		allowMouseEnter: !1,
		highlightItemOnHover: !0,
		parent: { type: void 0 },
		rootId: void 0,
		activeIndex: null,
		listElement: null,
		filterTriggerProps: we,
		inputProps: we,
		inputFocused: !1,
		highlightedItem: void 0,
		hoverEnabled: !0,
		instantType: void 0,
		openChangeReason: null,
		floatingTreeRoot: new Ua(),
		floatingNodeId: void 0,
		floatingParentNodeId: null,
		itemProps: we,
		keyboardEventRelay: void 0,
		closeDelay: 0,
		adaptiveOrigin: void 0,
		...r
	};
}
// node_modules/@base-ui/react/menu/filter-provider/MenuFilterProviderContext.mjs
var uu = /*#__PURE__*/ _.createContext(null);
// node_modules/@base-ui/react/menu/utils/isKeyboardOpen.mjs
function du(e, t) {
	return (e === "trigger-press" || e === "item-press") && t?.detail === 0;
}
function fu(e, t) {
	return e === "list-navigation" || du(e, t);
}
// node_modules/@base-ui/react/menu/root/MenuRoot.mjs
var pu = zo(function(e) {
	let { children: t, open: n, onOpenChange: r, onOpenChangeComplete: i, onItemHighlighted: a, defaultOpen: o = !1, disabled: s = !1, modal: c, loopFocus: l = !0, orientation: u = "vertical", actionsRef: d, closeParentOnEsc: f = !1, handle: p, triggerId: m, defaultTriggerId: h = null, highlightItemOnHover: g = !0, isSubmenu: v = !1, virtualFocus: y = !1, virtualFocusRef: b, allowEscape: x = !0, resetOnPointerLeave: S = !0 } = e, C = ht(!0), w = de(!0), T = eu(!0), E = w?.store, D = w?.virtualFocus ?? !1, O = _.useMemo(() => v && E ? {
		type: "menu",
		store: E
	} : T ? {
		type: "menubar",
		context: T
	} : C && !E ? {
		type: "context-menu",
		context: C
	} : { type: void 0 }, [
		C,
		E,
		T,
		v
	]), k = Qn(), A = Qn(), [j, M] = _.useState(void 0), N = (j ?? A) || void 0, P = Ka(), F = O.type === "menu" ? O.store : void 0, I = (n ?? o) && F?.state.transitionStatus === "starting", L = G(() => I ? F?.state.instantType : void 0).current, R = G(() => {
		let e = new su({
			open: o,
			openProp: n,
			activeTriggerId: h,
			triggerIdProp: m,
			parent: O,
			disabled: s,
			highlightItemOnHover: g,
			modal: O.type === void 0 ? c : void 0,
			rootId: k,
			instantType: L
		}, N, P != null);
		return e.context.virtualFocusRef = b, e;
	}).current;
	R.useControlledProp("openProp", n), R.useControlledProp("triggerIdProp", m), R.useContextCallback("onOpenChangeComplete", i);
	let z = R.useState("floatingTreeRoot"), B = Ja(z), V = R.useState("open"), ee = R.useState("activeTriggerElement"), H = R.useState("positionerElement"), te = R.useState("hoverEnabled"), ne = R.useState("disabled"), re = R.useState("lastOpenChangeReason"), ie = R.useState("parent"), ae = R.useState("activeIndex"), oe = R.useState("keyboardOpen"), se = R.useState("payload"), U = R.useState("floatingParentNodeId"), W = _.useRef(null), ce = _.useRef(ie.type !== "context-menu"), le = wr(), fe = _.useRef(!0), pe = wr(), K = U != null, { openMethod: me, triggerProps: he } = iu(V);
	R.useSyncedValues({
		disabled: s,
		highlightItemOnHover: g,
		modal: ie.type === void 0 ? c : void 0,
		openMethod: me,
		rootId: k
	}), Eo(R);
	let { forceUnmount: ge, transitionStatus: _e } = Do(V, R, () => {
		R.set("allowMouseEnter", !1);
	}, I), ve = pr(R.context.popupRef);
	_.useEffect(() => {
		if (L === void 0) return;
		let e = () => {
			R.state.instantType === L && R.set("instantType", void 0);
		};
		if (!V) {
			e();
			return;
		}
		if (_e !== void 0) return;
		if (R.context.popupRef.current == null) {
			e();
			return;
		}
		let t = new AbortController();
		return ve(e, t.signal), () => {
			t.abort();
		};
	}, [
		L,
		V,
		_e,
		ve,
		R
	]), J(() => {
		C && !w ? R.update({
			parent: {
				type: "context-menu",
				context: C
			},
			floatingNodeId: B,
			floatingParentNodeId: P
		}) : (w || !R.select("activeTriggerElement")) && R.update({
			floatingNodeId: B,
			floatingParentNodeId: P
		});
	}, [
		C,
		w,
		B,
		P,
		ee,
		R
	]), _.useEffect(() => {
		V || (W.current = null), ie.type === "context-menu" && (V ? le.start(500, () => {
			ce.current = !0;
		}) : (le.clear(), ce.current = !1));
	}, [
		le,
		V,
		ie.type
	]), J(() => {
		!V && !te && R.set("hoverEnabled", !0);
	}, [
		V,
		te,
		R
	]);
	let ye = q((e, t) => {
		let n = t.reason;
		if (!e && !R.select("open") || V === e && t.trigger === ee && re === n) return;
		let i = Co(t);
		if (!e && t.trigger == null && (t.trigger = ee ?? void 0), r?.(e, t), t.isCanceled) return;
		R.state.floatingRootContext.dispatchOpenChange(e, t);
		let a = t.event;
		if (e === !1 && n !== "item-press" && a?.type === "click" && a.pointerType === "touch" && !fe.current) return;
		e && n === "trigger-focus" ? (fe.current = !1, pe.start(300, () => {
			fe.current = !0;
		})) : (fe.current = !0, pe.clear());
		let o = !e && (n === "escape-key" || n == null);
		W.current = t.event;
		let s = So(R.state, e, t.trigger, i());
		s.openChangeReason = n, s.keyboardOpen = e && fu(n, a), s.instantType = ie.type === "menubar" && (n === "trigger-focus" || n === "focus-out" || n === "trigger-hover" || n === "list-navigation" || n === "sibling-open") ? "group" : du(n, a) ? "click" : o ? "dismiss" : void 0, R.update(s);
	}), be = mo({
		popupStore: R,
		floatingRootContext: R.state.floatingRootContext,
		floatingId: N,
		nested: P != null,
		onOpenChange: ye
	}), xe = be.context.events;
	J(() => {
		let e = ({ open: e, eventDetails: t }) => ye(e, t);
		return xe.on("setOpen", e), () => {
			xe?.off("setOpen", e);
		};
	}, [xe, ye]), J(() => R.subscribeToParentMenu(), [R]);
	let Se = _.useCallback(() => {
		R.setOpen(!1, $n(Nt));
	}, [R]);
	_.useImperativeHandle(d, () => ({
		unmount: ge,
		close: Se
	}), [ge, Se]);
	let Te;
	ie.type === "context-menu" && (Te = ie.context), _.useImperativeHandle(Te?.positionerRef, () => H, [H]), _.useImperativeHandle(Te?.actionsRef, () => ({ setOpen: ye }), [ye]);
	let Ee = po(be, {
		enabled: !ne,
		bubbles: { escapeKey: f && ie.type === "menu" },
		outsidePress() {
			return ie.type !== "context-menu" || W.current?.type === "contextmenu" || ce.current;
		},
		externalTree: K ? z : void 0
	}), De = fl(), Oe = ws(be, {
		enabled: !ne,
		listRef: R.context.itemDomElements,
		activeIndex: ae,
		virtual: y,
		nested: ie.type === "menubar" || !y && ie.type !== void 0,
		parentOrientation: ie.type === "menubar" ? ie.context.orientation : void 0,
		loopFocus: l,
		focusItemOnOpen: y ? oe : void 0,
		allowEscape: y && l && x,
		orientation: u,
		triggerOrientation: y ? "vertical" : u,
		rtl: De === "rtl",
		disabledIndices: Ce,
		onNavigate(e, t) {
			R.setActiveIndex(e, au(t), t?.nativeEvent);
		},
		openOnArrowKeyDown: ie.type !== "context-menu" && !(y && v),
		externalTree: !y && K ? z : void 0,
		nestedReturnFocusRef: F?.context.virtualFocusRef,
		focusItemOnHover: g,
		resetOnPointerLeave: S
	}), Ae = _.useCallback((e) => {
		R.context.typingRef.current = e;
	}, [R]), je = Ts(be, {
		enabled: !ne && !y,
		listRef: R.context.itemLabels,
		elementsRef: R.context.itemDomElements,
		activeIndex: ae,
		resetMs: 500,
		onMatch: (e, t) => {
			V && e !== ae && R.setActiveIndex(e, Et, t.nativeEvent);
		},
		onTyping: Ae
	}), Me = q(a), Ne = _.useRef(-1), Pe = q(() => {
		let e = R.state.activeIndex, t = e === null ? void 0 : R.context.itemDomElements.current[e] ?? void 0;
		if (t?.isConnected === !1) return;
		let n = t === void 0 ? -1 : e;
		if (Ne.current === n && R.context.reportedItem === t) return;
		Ne.current = n, R.context.reportedItem = t, y && R.set("highlightedItem", t);
		let { highlightReason: r, highlightEvent: i } = R.context;
		R.context.highlightReason = gt, R.context.highlightEvent = void 0, a && Me(t, er(r, i, { label: t === void 0 ? void 0 : R.context.itemLabels.current[n] ?? void 0 }));
	});
	J(() => {
		Pe();
	}, [ae, Pe]);
	let Fe = _.useMemo(() => {
		if (!y) return Oe.reference;
		if (!Oe.trigger) return we;
		let { onFocus: e, ...t } = Oe.trigger;
		return t;
	}, [
		y,
		Oe.reference,
		Oe.trigger
	]);
	R.useSyncedValue("inputProps", y ? Oe.reference ?? we : we);
	let Ie = _.useMemo(() => {
		let e = ke(je.reference, Fe, Ee.reference, { onMouseMove() {
			R.set("allowMouseEnter", !0);
		} }, he);
		return e["aria-haspopup"] = "menu", e["aria-expanded"] = V, e;
	}, [
		R,
		je.reference,
		Fe,
		Ee.reference,
		he,
		V
	]), Le = _.useMemo(() => {
		let e = ke(Oe.trigger, Ee.trigger, he);
		return e["aria-haspopup"] = "menu", e["aria-expanded"] = !1, e;
	}, [
		Oe.trigger,
		Ee.trigger,
		he
	]);
	G(() => (R.update({ inactiveTriggerProps: Le }), null)), Oo(R, {
		floatingRootContext: be,
		activeTriggerProps: Ie,
		inactiveTriggerProps: Le,
		popupProps: _.useMemo(() => ke(go, {
			onMouseMove() {
				R.set("allowMouseEnter", !0), ie.type === "menu" && R.set("hoverEnabled", !1);
			},
			onClick() {
				R.select("hoverEnabled") && R.set("hoverEnabled", !1);
			},
			onKeyDown(e) {
				let t = R.select("keyboardEventRelay");
				t && !e.isPropagationStopped() && t(e);
			}
		}, je.floating, Oe.floating, Ee.floating), [
			ie.type,
			R,
			je.floating,
			Oe.floating,
			Ee.floating
		]),
		itemProps: Oe.item ?? we
	});
	let Re = _.useMemo(() => ({
		store: R,
		parent: O,
		orientation: u,
		loopFocus: l,
		allowEscape: x,
		defaultFloatingId: A,
		setRenderedFloatingId: M,
		virtualFocus: y,
		parentVirtualFocus: D,
		syncHighlightedItem: Pe
	}), [
		R,
		O,
		u,
		l,
		x,
		A,
		y,
		D,
		Pe
	]), ze = typeof t == "function" ? t({ payload: se }) : t, Be = /*#__PURE__*/ (0, Y.jsxs)(ue.Provider, {
		value: Re,
		children: [p && /*#__PURE__*/ (0, Y.jsx)(yo, {
			handle: p,
			store: R
		}), ze]
	});
	return (ie.type === void 0 || ie.type === "context-menu") && (Be = /*#__PURE__*/ (0, Y.jsx)(Xa, {
		externalTree: z,
		children: Be
	})), Be;
});
function mu(e) {
	let t = _.useContext(uu);
	if (t === null) return /*#__PURE__*/ (0, Y.jsx)(pu, { ...e });
	let n = t.Root;
	return /*#__PURE__*/ (0, Y.jsx)(uu.Provider, {
		value: null,
		children: /*#__PURE__*/ (0, Y.jsx)(n, {
			...t.options,
			...e
		})
	});
}
// node_modules/@base-ui/react/utils/getPseudoElementBounds.mjs
var hu = 5;
function gu(e, t) {
	let n = _u(t);
	return e.clientX >= n.left - hu && e.clientX <= n.right + hu && e.clientY >= n.top - hu && e.clientY <= n.bottom + hu;
}
function _u(e) {
	let t = e.getBoundingClientRect(), n = Ut(e);
	if (zn) return t;
	let r = n.getComputedStyle(e, "::before"), i = n.getComputedStyle(e, "::after");
	if (r.content === "none" && i.content === "none") return t;
	let a = parseFloat(r.width) || 0, o = parseFloat(r.height) || 0, s = parseFloat(i.width) || 0, c = parseFloat(i.height) || 0, l = Math.max(t.width, a, s), u = Math.max(t.height, o, c), d = l - t.width, f = u - t.height;
	return {
		left: t.left - d / 2,
		right: t.right + d / 2,
		top: t.top - f / 2,
		bottom: t.bottom + f / 2
	};
}
// node_modules/@base-ui/react/internals/composite/item/useCompositeItem.mjs
function vu(e = {}) {
	let { highlightItemOnHover: t, highlightedIndex: n, onHighlightedIndexChange: r } = yn(), { ref: i, index: a } = Kn(e), o = n === a, s = _.useRef(null), c = pe(i, s);
	return {
		compositeProps: {
			tabIndex: o ? 0 : -1,
			onFocus() {
				r(a);
			},
			onMouseMove() {
				let e = s.current;
				if (!t || !e) return;
				let n = e.hasAttribute("disabled") || e.ariaDisabled === "true";
				!o && !n && e.focus();
			}
		},
		compositeRef: c,
		index: a
	};
}
// node_modules/@base-ui/react/internals/composite/item/CompositeItem.mjs
function yu(e) {
	let { render: t, className: n, style: r, state: i = we, props: a = Ce, refs: o = Ce, metadata: s, stateAttributesMapping: c, tag: l = "div", ...u } = e, { compositeProps: d, compositeRef: f } = vu({ metadata: s });
	return He(l, e, {
		state: i,
		ref: [f, ...o],
		props: [
			d,
			...a,
			u
		],
		stateAttributesMapping: c
	});
}
// node_modules/@base-ui/react/menu/utils/findRootOwnerId.mjs
function bu(e) {
	if (qt(e) && e.hasAttribute("data-rootownerid")) return e.getAttribute("data-rootownerid");
	if (!on(e)) return bu(ln(e));
}
// node_modules/@base-ui/react/utils/popups/useTriggerFocusGuards.mjs
function xu(e, t) {
	function n(n, r, i) {
		let a = n.currentTarget;
		v.flushSync(() => {
			e.setOpen(!1, $n(Ct, n.nativeEvent, a));
		}), fa(a.isConnected ? a : t.current, r, i)?.focus();
	}
	function r(t) {
		n(t, -1, e.select("positionerElement"));
	}
	function i(t) {
		let r = e.select("positionerElement");
		r && pa(t, r) ? e.context.beforeContentFocusGuardRef.current?.focus() : n(t, 1, r);
	}
	return {
		handlePreFocusGuardFocus: r,
		handleFocusTargetFocus: i
	};
}
// node_modules/@base-ui/react/utils/useMixedToggleClickHandler.mjs
function Su(e) {
	let { enabled: t = !0, mouseDownAction: n, open: r } = e, i = _.useRef(!1);
	return _.useMemo(() => t ? {
		onMouseDown: (e) => {
			(n === "open" && !r || n === "close" && r) && (i.current = !0, xn(e.currentTarget).addEventListener("click", () => {
				i.current = !1;
			}, { once: !0 }));
		},
		onClick: (e) => {
			i.current && (i.current = !1, e.preventBaseUIHandler());
		}
	} : we, [
		t,
		n,
		r
	]);
}
// node_modules/@base-ui/react/menu/trigger/MenuTrigger.mjs
var Cu = Bo(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, openOnHover: c, delay: l = 100, closeDelay: u = 0, handle: d, payload: f, ...p } = e, m = de(!0), h = os(d) ?? m?.store;
	if (!h) throw Error(W(85));
	let g = Qn(s), v = h.useState("isTriggerActive", g), y = h.useState("floatingRootContext"), b = h.useState("isOpenedByTrigger", g), x = h.useState("triggerControlsId", g), S = _.useRef(null), C = Tu(), w = yn(!0), T = qa(), E = _.useMemo(() => T ?? new Ua(), [T]), { registerTrigger: D, isMountedByThisTrigger: O } = To(g, S, h, {
		payload: f,
		closeDelay: u,
		parent: C,
		floatingTreeRoot: E,
		floatingNodeId: Ja(E),
		floatingParentNodeId: Ka(),
		keyboardEventRelay: w?.relayKeyboardEvent
	}), k = C.type === "menubar", A = h.useState("disabled"), j = a || A || k && C.context.disabled, { getButtonProps: M, buttonRef: N } = Cn({
		disabled: j,
		native: o
	});
	_.useEffect(() => {
		!b && C.type === void 0 && (h.context.allowMouseUpTriggerRef.current = !1);
	}, [
		h,
		b,
		C.type
	]);
	let P = _.useRef(null), F = wr(), I = q((e) => {
		if (!P.current) return;
		F.clear(), h.context.allowMouseUpTriggerRef.current = !1;
		let t = e.target;
		X(P.current, t) || X(h.select("positionerElement"), t) || t === P.current || t != null && bu(t) === h.select("rootId") || gu(e, P.current) || E.events.emit("close", {
			domEvent: e,
			reason: Ot
		});
	});
	_.useEffect(() => {
		let e = xn(P.current);
		if (b && h.select("lastOpenChangeReason") === "trigger-hover") return e.addEventListener("mouseup", I, { once: !0 }), () => {
			e.removeEventListener("mouseup", I);
		};
	}, [
		b,
		I,
		h
	]);
	let L = k && C.context.hasSubmenuOpen, R = _s(y, {
		enabled: (c ?? L) && !j && (!k || L && !O),
		handleClose: Ns({ blockPointerEvents: !k }),
		mouseOnly: !0,
		move: !1,
		restMs: C.type === void 0 ? l : void 0,
		delay: { close: u },
		triggerElementRef: S,
		externalTree: E,
		isActiveTrigger: v,
		isClosing: () => h.select("transitionStatus") === "ending"
	}), z = wu(b, h.select("lastOpenChangeReason")), B = oo(y, {
		enabled: !j,
		event: b && k ? "click" : "mousedown",
		toggle: !0,
		ignoreMouse: !1,
		stickIfOpen: C.type === void 0 && z
	}), V = ls(y, { enabled: !j && L }), ee = Su({
		open: b,
		enabled: k,
		mouseDownAction: "open"
	}), H = _.useMemo(() => ke(V.reference, B.reference), [V.reference, B.reference]), te = h.useState("triggerProps", O), ne = h.useState("filterTriggerProps"), { handlePreFocusGuardFocus: re, handleFocusTargetFocus: ie } = xu(h, S), ae = {
		disabled: j,
		open: b
	}, oe = [
		P,
		t,
		N,
		D,
		S
	], se = [
		H,
		R ?? we,
		te,
		{
			"aria-haspopup": "menu",
			"aria-controls": x,
			id: g,
			onMouseDown: (e) => {
				h.select("open") || (F.start(200, () => {
					h.context.allowMouseUpTriggerRef.current = !0;
				}), xn(e.currentTarget).addEventListener("mouseup", I, { once: !0 }));
			}
		},
		ne,
		k ? { role: "menuitem" } : {},
		ee,
		p,
		M
	], U = He("button", e, {
		enabled: !k,
		stateAttributesMapping: dt,
		state: ae,
		ref: oe,
		props: se
	});
	return k ? /*#__PURE__*/ (0, Y.jsx)(yu, {
		tag: "button",
		render: n,
		className: r,
		style: i,
		state: ae,
		refs: oe,
		props: se,
		stateAttributesMapping: dt
	}) : b ? /*#__PURE__*/ (0, Y.jsxs)(_.Fragment, { children: [
		/*#__PURE__*/ (0, Y.jsx)(di, {
			ref: h.context.beforeTriggerFocusGuardRef,
			onFocus: re
		}, `${g}-pre-focus-guard`),
		/*#__PURE__*/ (0, Y.jsx)(_.Fragment, { children: U }, g),
		/*#__PURE__*/ (0, Y.jsx)(di, {
			ref: h.context.triggerFocusTargetRef,
			onFocus: ie
		}, `${g}-post-focus-guard`)
	] }) : /*#__PURE__*/ (0, Y.jsx)(_.Fragment, { children: U }, g);
});
function wu(e, t) {
	let n = wr(), [r, i] = _.useState(!1);
	return J(() => {
		e && t === "trigger-hover" ? (i(!0), n.start(500, () => {
			i(!1);
		})) : e || (n.clear(), i(!1));
	}, [
		e,
		t,
		n
	]), r;
}
function Tu() {
	let e = eu(!0);
	return _.useMemo(() => e ? {
		type: "menubar",
		context: e
	} : { type: void 0 }, [e]);
}
// node_modules/@base-ui/utils/usePreviousValue.mjs
function Eu(e) {
	let [t, n] = _.useState({
		current: e,
		previous: null
	});
	return Object.is(e, t.current) || n({
		current: e,
		previous: t.current
	}), t.previous;
}
// node_modules/@base-ui/react/separator/Separator.mjs
var Du = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { className: n, render: r, orientation: i = "horizontal", style: a, ...o } = e;
	return He("div", e, {
		state: { orientation: i },
		ref: t,
		props: [{
			role: "separator",
			"aria-orientation": i
		}, o]
	});
});
// node_modules/@base-ui/utils/isElementDisabled.mjs
function Ou(e) {
	return e == null || e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true";
}
// node_modules/@base-ui/react/internals/serializeValue.mjs
function ku(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
// node_modules/@base-ui/react/internals/resolveValueLabel.mjs
function Au(e) {
	return typeof e == "object" && !!e && Array.isArray(e.items);
}
function ju(e) {
	return Au(e?.[0]);
}
function Mu(e) {
	return ju(e) ? e.flatMap((e) => e.items) : e;
}
function Nu(e) {
	if (!Array.isArray(e)) return e != null && "null" in e;
	let t = e;
	if (ju(t)) {
		for (let e of t) for (let t of e.items) if (t && t.value == null && t.label != null) return !0;
		return !1;
	}
	for (let e of t) if (e && e.value == null && e.label != null) return !0;
	return !1;
}
function Pu(e, t) {
	if (t && e != null) return t(e) ?? "";
	if (e && typeof e == "object") {
		if ("label" in e && e.label != null) return String(e.label);
		if ("value" in e) return String(e.value);
	}
	return ku(e);
}
function Fu(e, t) {
	return t && e != null ? t(e) ?? "" : e && typeof e == "object" && "value" in e && "label" in e ? ku(e.value) : ku(e);
}
function Iu(e, t, n) {
	function r() {
		return Pu(e, n);
	}
	if (n && e != null) return n(e);
	if (e && typeof e == "object" && "label" in e && e.label != null) return e.label;
	if (t && !Array.isArray(t)) return (Object.hasOwn(t, e) ? t[e] : void 0) ?? r();
	if (Array.isArray(t)) {
		let n = Mu(t);
		if (typeof e != "object" || !e) {
			let t = n.find((t) => t.value === e);
			return t && t.label != null ? t.label : r();
		}
		if ("value" in e) {
			let t = n.find((t) => t && t.value === e.value);
			if (t && t.label != null) return t.label;
		}
	}
	return r();
}
function Lu(e, t, n) {
	return e.reduce((e, r, i) => (i > 0 && e.push(", "), e.push(/*#__PURE__*/ (0, Y.jsx)(_.Fragment, { children: Iu(r, t, n) }, i)), e), []);
}
// node_modules/clsx/dist/clsx.mjs
function Ru(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Ru(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function zu() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Ru(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/tailwind-merge/dist/bundle-mjs.mjs
var Bu = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, Vu = (e, t) => ({
	classGroupId: e,
	validator: t
}), Hu = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), Uu = "-", Wu = [], Gu = "arbitrary..", Ku = (e) => {
	let t = Yu(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return Ju(e);
			let n = e.split(Uu);
			return qu(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? Bu(i, t) : t : i || Wu;
			}
			return n[e] || Wu;
		}
	};
}, qu = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = qu(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(Uu) : e.slice(t).join(Uu), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, Ju = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? Gu + r : void 0;
})(), Yu = (e) => {
	let { theme: t, classGroups: n } = e;
	return Xu(n, t);
}, Xu = (e, t) => {
	let n = Hu();
	for (let r in e) {
		let i = e[r];
		Zu(i, n, r, t);
	}
	return n;
}, Zu = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		Qu(i, t, n, r);
	}
}, Qu = (e, t, n, r) => {
	typeof e == "string" ? $u(e, t, n) : typeof e == "function" ? ed(e, t, n, r) : td(e, t, n, r);
}, $u = (e, t, n) => {
	let r = e === "" ? t : nd(t, e);
	r.classGroupId = n;
}, ed = (e, t, n, r) => {
	rd(e) ? Zu(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(Vu(n, e)));
}, td = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		Zu(o, nd(t, a), n, r);
	}
}, nd = (e, t) => {
	let n = e, r = t.split(Uu), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = Hu(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, rd = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, id = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, ad = "!", od = ":", sd = [], cd = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), ld = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === od) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(ad) ? (c = s.slice(0, -1), l = !0) : s.startsWith(ad) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return cd(t, l, c, u);
	};
	if (t) {
		let e = t + od, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : cd(sd, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, ud = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, dd = (e) => ({
	cache: id(e.cacheSize),
	parseClassName: ld(e),
	sortModifiers: ud(e),
	postfixLookupClassGroupIds: fd(e),
	...Ku(e)
}), fd = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, pd = /\s+/, md = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(pd), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h || (g = r(p), !g)) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + ad : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, hd = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = gd(n)) && (i && (i += " "), i += r);
	return i;
}, gd = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = gd(e[r])) && (n && (n += " "), n += t);
	return n;
}, _d = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = dd(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = md(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(hd(...e));
}, vd = [], yd = (e) => {
	let t = (t) => t[e] || vd;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, bd = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, xd = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Sd = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Cd = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, wd = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Td = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, Ed = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Dd = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Od = (e) => Sd.test(e), kd = (e) => !!e && !Number.isNaN(Number(e)), Ad = (e) => !!e && Number.isInteger(Number(e)), jd = (e) => e.endsWith("%") && kd(e.slice(0, -1)), Md = (e) => Cd.test(e), Nd = () => !0, Pd = (e) => wd.test(e) && !Td.test(e), Fd = () => !1, Id = (e) => Ed.test(e), Ld = (e) => Dd.test(e), Rd = (e) => !Z(e) && !Q(e), zd = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Bd = (e) => tf(e, of, Fd), Z = (e) => bd.test(e), Vd = (e) => tf(e, sf, Pd), Hd = (e) => tf(e, cf, kd), Ud = (e) => tf(e, uf, Nd), Wd = (e) => tf(e, lf, Fd), Gd = (e) => tf(e, rf, Fd), Kd = (e) => tf(e, af, Ld), qd = (e) => tf(e, df, Id), Q = (e) => xd.test(e), Jd = (e) => nf(e, sf), Yd = (e) => nf(e, lf), Xd = (e) => nf(e, rf), Zd = (e) => nf(e, of), Qd = (e) => nf(e, af), $d = (e) => nf(e, df, !0), ef = (e) => nf(e, uf, !0), tf = (e, t, n) => {
	let r = bd.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, nf = (e, t, n = !1) => {
	let r = xd.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, rf = (e) => e === "position" || e === "percentage", af = (e) => e === "image" || e === "url", of = (e) => e === "length" || e === "size" || e === "bg-size", sf = (e) => e === "length", cf = (e) => e === "number", lf = (e) => e === "family-name", uf = (e) => e === "number" || e === "weight", df = (e) => e === "shadow", ff = /*#__PURE__*/ _d(() => {
	let e = yd("color"), t = yd("font"), n = yd("text"), r = yd("font-weight"), i = yd("tracking"), a = yd("leading"), o = yd("breakpoint"), s = yd("container"), c = yd("spacing"), l = yd("radius"), u = yd("shadow"), d = yd("inset-shadow"), f = yd("text-shadow"), p = yd("drop-shadow"), m = yd("blur"), h = yd("perspective"), g = yd("aspect"), _ = yd("ease"), v = yd("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		Q,
		Z
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		Q,
		Z,
		c
	], T = () => [
		Od,
		"full",
		"auto",
		...w()
	], E = () => [
		Ad,
		"none",
		"subgrid",
		Q,
		Z
	], D = () => [
		"auto",
		{ span: [
			"full",
			Ad,
			Q,
			Z
		] },
		Ad,
		Q,
		Z
	], O = () => [
		Ad,
		"auto",
		Q,
		Z
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		Q,
		Z
	], A = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], j = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], M = () => ["auto", ...w()], N = () => [
		Od,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], P = () => [
		s,
		Od,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], F = () => [
		Od,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], I = () => [
		e,
		Q,
		Z
	], L = () => [
		...b(),
		Xd,
		Gd,
		{ position: [Q, Z] }
	], R = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], z = () => [
		"auto",
		"cover",
		"contain",
		Zd,
		Bd,
		{ size: [Q, Z] }
	], B = () => [
		jd,
		Jd,
		Vd
	], V = () => [
		"",
		"none",
		"full",
		l,
		Q,
		Z
	], ee = () => [
		"",
		kd,
		Jd,
		Vd
	], H = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], te = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], ne = () => [
		kd,
		jd,
		Xd,
		Gd
	], re = () => [
		"",
		"none",
		m,
		Q,
		Z
	], ie = () => [
		"none",
		kd,
		Q,
		Z
	], ae = () => [
		"none",
		kd,
		Q,
		Z
	], oe = () => [
		kd,
		Q,
		Z
	], se = () => [
		Od,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [Md],
			breakpoint: [Md],
			color: [Nd],
			container: [Md],
			"drop-shadow": [Md],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Rd],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [Md],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [Md],
			shadow: [Md],
			spacing: ["px", kd],
			text: [Md],
			"text-shadow": [Md],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				Od,
				Z,
				Q,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				Q,
				Z
			] }],
			"container-named": [zd],
			columns: [{ columns: [
				kd,
				"auto",
				Z,
				Q,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				Ad,
				"auto",
				Q,
				Z
			] }],
			basis: [{ basis: [
				Od,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				kd,
				Od,
				"auto",
				"initial",
				"none",
				Z
			] }],
			grow: [{ grow: [
				"",
				kd,
				Q,
				Z
			] }],
			shrink: [{ shrink: [
				"",
				kd,
				Q,
				Z
			] }],
			order: [{ order: [
				Ad,
				"first",
				"last",
				"none",
				Q,
				Z
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": O() }],
			"col-end": [{ "col-end": O() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": O() }],
			"row-end": [{ "row-end": O() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": k() }],
			"auto-rows": [{ "auto-rows": k() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...A(), "normal"] }],
			"justify-items": [{ "justify-items": [...j(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...j()] }],
			"align-content": [{ content: ["normal", ...A()] }],
			"align-items": [{ items: [...j(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...j(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": A() }],
			"place-items": [{ "place-items": [...j(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...j()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: M() }],
			mx: [{ mx: M() }],
			my: [{ my: M() }],
			ms: [{ ms: M() }],
			me: [{ me: M() }],
			mbs: [{ mbs: M() }],
			mbe: [{ mbe: M() }],
			mt: [{ mt: M() }],
			mr: [{ mr: M() }],
			mb: [{ mb: M() }],
			ml: [{ ml: M() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: N() }],
			"inline-size": [{ inline: ["auto", ...P()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...P()] }],
			"max-inline-size": [{ "max-inline": ["none", ...P()] }],
			"block-size": [{ block: ["auto", ...F()] }],
			"min-block-size": [{ "min-block": ["auto", ...F()] }],
			"max-block-size": [{ "max-block": ["none", ...F()] }],
			w: [{ w: [
				s,
				"screen",
				...N()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...N()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...N()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...N()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...N()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...N()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				Jd,
				Vd
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				ef,
				Ud
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				jd,
				Z
			] }],
			"font-family": [{ font: [
				Yd,
				Wd,
				t
			] }],
			"font-features": [{ "font-features": [Z] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				Q,
				Z
			] }],
			"line-clamp": [{ "line-clamp": [
				kd,
				"none",
				Q,
				Hd
			] }],
			leading: [{ leading: [
				"none",
				a,
				...w()
			] }],
			"list-image": [{ "list-image": [
				"none",
				Q,
				Z
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				Q,
				Z
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: I() }],
			"text-color": [{ text: I() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...H(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				kd,
				"from-font",
				"auto",
				Q,
				Vd
			] }],
			"text-decoration-color": [{ decoration: I() }],
			"underline-offset": [{ "underline-offset": [
				kd,
				"auto",
				Q,
				Z
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				Ad,
				Q,
				Z
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				Q,
				Z
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				Q,
				Z
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: L() }],
			"bg-repeat": [{ bg: R() }],
			"bg-size": [{ bg: z() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						Ad,
						Q,
						Z
					],
					radial: [
						"",
						Q,
						Z
					],
					conic: [
						"",
						Ad,
						Q,
						Z
					]
				},
				Qd,
				Kd
			] }],
			"bg-color": [{ bg: I() }],
			"gradient-from-pos": [{ from: B() }],
			"gradient-via-pos": [{ via: B() }],
			"gradient-to-pos": [{ to: B() }],
			"gradient-from": [{ from: I() }],
			"gradient-via": [{ via: I() }],
			"gradient-to": [{ to: I() }],
			rounded: [{ rounded: V() }],
			"rounded-s": [{ "rounded-s": V() }],
			"rounded-e": [{ "rounded-e": V() }],
			"rounded-t": [{ "rounded-t": V() }],
			"rounded-r": [{ "rounded-r": V() }],
			"rounded-b": [{ "rounded-b": V() }],
			"rounded-l": [{ "rounded-l": V() }],
			"rounded-ss": [{ "rounded-ss": V() }],
			"rounded-se": [{ "rounded-se": V() }],
			"rounded-ee": [{ "rounded-ee": V() }],
			"rounded-es": [{ "rounded-es": V() }],
			"rounded-tl": [{ "rounded-tl": V() }],
			"rounded-tr": [{ "rounded-tr": V() }],
			"rounded-br": [{ "rounded-br": V() }],
			"rounded-bl": [{ "rounded-bl": V() }],
			"border-w": [{ border: ee() }],
			"border-w-x": [{ "border-x": ee() }],
			"border-w-y": [{ "border-y": ee() }],
			"border-w-s": [{ "border-s": ee() }],
			"border-w-e": [{ "border-e": ee() }],
			"border-w-bs": [{ "border-bs": ee() }],
			"border-w-be": [{ "border-be": ee() }],
			"border-w-t": [{ "border-t": ee() }],
			"border-w-r": [{ "border-r": ee() }],
			"border-w-b": [{ "border-b": ee() }],
			"border-w-l": [{ "border-l": ee() }],
			"divide-x": [{ "divide-x": ee() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": ee() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...H(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...H(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: I() }],
			"border-color-x": [{ "border-x": I() }],
			"border-color-y": [{ "border-y": I() }],
			"border-color-s": [{ "border-s": I() }],
			"border-color-e": [{ "border-e": I() }],
			"border-color-bs": [{ "border-bs": I() }],
			"border-color-be": [{ "border-be": I() }],
			"border-color-t": [{ "border-t": I() }],
			"border-color-r": [{ "border-r": I() }],
			"border-color-b": [{ "border-b": I() }],
			"border-color-l": [{ "border-l": I() }],
			"divide-color": [{ divide: I() }],
			"outline-style": [{ outline: [
				...H(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				kd,
				Q,
				Z
			] }],
			"outline-w": [{ outline: [
				"",
				kd,
				Jd,
				Vd
			] }],
			"outline-color": [{ outline: I() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				$d,
				qd
			] }],
			"shadow-color": [{ shadow: I() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				$d,
				qd
			] }],
			"inset-shadow-color": [{ "inset-shadow": I() }],
			"ring-w": [{ ring: ee() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: I() }],
			"ring-offset-w": [{ "ring-offset": [kd, Vd] }],
			"ring-offset-color": [{ "ring-offset": I() }],
			"inset-ring-w": [{ "inset-ring": ee() }],
			"inset-ring-color": [{ "inset-ring": I() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				$d,
				qd
			] }],
			"text-shadow-color": [{ "text-shadow": I() }],
			opacity: [{ opacity: [
				kd,
				Q,
				Z
			] }],
			"mix-blend": [{ "mix-blend": [
				...te(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": te() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [kd] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": ne() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": ne() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": I() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": I() }],
			"mask-image-t-from-pos": [{ "mask-t-from": ne() }],
			"mask-image-t-to-pos": [{ "mask-t-to": ne() }],
			"mask-image-t-from-color": [{ "mask-t-from": I() }],
			"mask-image-t-to-color": [{ "mask-t-to": I() }],
			"mask-image-r-from-pos": [{ "mask-r-from": ne() }],
			"mask-image-r-to-pos": [{ "mask-r-to": ne() }],
			"mask-image-r-from-color": [{ "mask-r-from": I() }],
			"mask-image-r-to-color": [{ "mask-r-to": I() }],
			"mask-image-b-from-pos": [{ "mask-b-from": ne() }],
			"mask-image-b-to-pos": [{ "mask-b-to": ne() }],
			"mask-image-b-from-color": [{ "mask-b-from": I() }],
			"mask-image-b-to-color": [{ "mask-b-to": I() }],
			"mask-image-l-from-pos": [{ "mask-l-from": ne() }],
			"mask-image-l-to-pos": [{ "mask-l-to": ne() }],
			"mask-image-l-from-color": [{ "mask-l-from": I() }],
			"mask-image-l-to-color": [{ "mask-l-to": I() }],
			"mask-image-x-from-pos": [{ "mask-x-from": ne() }],
			"mask-image-x-to-pos": [{ "mask-x-to": ne() }],
			"mask-image-x-from-color": [{ "mask-x-from": I() }],
			"mask-image-x-to-color": [{ "mask-x-to": I() }],
			"mask-image-y-from-pos": [{ "mask-y-from": ne() }],
			"mask-image-y-to-pos": [{ "mask-y-to": ne() }],
			"mask-image-y-from-color": [{ "mask-y-from": I() }],
			"mask-image-y-to-color": [{ "mask-y-to": I() }],
			"mask-image-radial": [{ "mask-radial": [Q, Z] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": ne() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": ne() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": I() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": I() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [kd] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": ne() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": ne() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": I() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": I() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: L() }],
			"mask-repeat": [{ mask: R() }],
			"mask-size": [{ mask: z() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				Q,
				Z
			] }],
			filter: [{ filter: [
				"",
				"none",
				Q,
				Z
			] }],
			blur: [{ blur: re() }],
			brightness: [{ brightness: [
				kd,
				Q,
				Z
			] }],
			contrast: [{ contrast: [
				kd,
				Q,
				Z
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				$d,
				qd
			] }],
			"drop-shadow-color": [{ "drop-shadow": I() }],
			grayscale: [{ grayscale: [
				"",
				kd,
				Q,
				Z
			] }],
			"hue-rotate": [{ "hue-rotate": [
				kd,
				Q,
				Z
			] }],
			invert: [{ invert: [
				"",
				kd,
				Q,
				Z
			] }],
			saturate: [{ saturate: [
				kd,
				Q,
				Z
			] }],
			sepia: [{ sepia: [
				"",
				kd,
				Q,
				Z
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				Q,
				Z
			] }],
			"backdrop-blur": [{ "backdrop-blur": re() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				kd,
				Q,
				Z
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				kd,
				Q,
				Z
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				kd,
				Q,
				Z
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				kd,
				Q,
				Z
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				kd,
				Q,
				Z
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				kd,
				Q,
				Z
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				kd,
				Q,
				Z
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				kd,
				Q,
				Z
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				Q,
				Z
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				kd,
				"initial",
				Q,
				Z
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				Q,
				Z
			] }],
			delay: [{ delay: [
				kd,
				Q,
				Z
			] }],
			animate: [{ animate: [
				"none",
				v,
				Q,
				Z
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				Q,
				Z
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: ie() }],
			"rotate-x": [{ "rotate-x": ie() }],
			"rotate-y": [{ "rotate-y": ie() }],
			"rotate-z": [{ "rotate-z": ie() }],
			scale: [{ scale: ae() }],
			"scale-x": [{ "scale-x": ae() }],
			"scale-y": [{ "scale-y": ae() }],
			"scale-z": [{ "scale-z": ae() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: oe() }],
			"skew-x": [{ "skew-x": oe() }],
			"skew-y": [{ "skew-y": oe() }],
			transform: [{ transform: [
				Q,
				Z,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: se() }],
			"translate-x": [{ "translate-x": se() }],
			"translate-y": [{ "translate-y": se() }],
			"translate-z": [{ "translate-z": se() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Ad,
				Q,
				Z
			] }],
			accent: [{ accent: I() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: I() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				Q,
				Z
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": I() }],
			"scrollbar-track-color": [{ "scrollbar-track": I() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				Q,
				Z
			] }],
			fill: [{ fill: ["none", ...I()] }],
			"stroke-w": [{ stroke: [
				kd,
				Jd,
				Vd,
				Hd
			] }],
			stroke: [{ stroke: ["none", ...I()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": [
				"start",
				"end",
				"right",
				"left"
			],
			"inset-y": [
				"inset-bs",
				"inset-be",
				"top",
				"bottom"
			],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: [
				"ps",
				"pe",
				"pr",
				"pl"
			],
			py: [
				"pbs",
				"pbe",
				"pt",
				"pb"
			],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: [
				"ms",
				"me",
				"mr",
				"ml"
			],
			my: [
				"mbs",
				"mbe",
				"mt",
				"mb"
			],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": [
				"border-w-s",
				"border-w-e",
				"border-w-r",
				"border-w-l"
			],
			"border-w-y": [
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-b"
			],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": [
				"border-color-s",
				"border-color-e",
				"border-color-r",
				"border-color-l"
			],
			"border-color-y": [
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-b"
			],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": [
				"scroll-ms",
				"scroll-me",
				"scroll-mr",
				"scroll-ml"
			],
			"scroll-my": [
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mb"
			],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": [
				"scroll-ps",
				"scroll-pe",
				"scroll-pr",
				"scroll-pl"
			],
			"scroll-py": [
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pb"
			],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
// src/lib/utils.ts
function $(...e) {
	return ff(zu(e));
}
// src/components/ui/portal-context.tsx
var pf = (0, _.createContext)(null);
function mf({ container: e, children: t }) {
	return /* @__PURE__ */ (0, Y.jsx)(pf.Provider, {
		value: e,
		children: t
	});
}
function hf() {
	return (0, _.useContext)(pf);
}
// node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var gf = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
// node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function _f(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: gf(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
// node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var vf = (e) => {
	let t = "", n = !1;
	for (let r of e) r === "-" || r === "_" || r <= " " ? n = t.length > 0 : (t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1);
	return t;
}, yf = (e) => {
	let t = vf(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, bf = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), xf = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
function Sf(e) {
	return e != null;
}
function Cf(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? xf.width, a = e.size ?? e.height ?? xf.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? bf(...c) : bf("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? xf["stroke-width"]) * Number(e.size ?? e.width ?? xf.width) / Number(t.size ?? t.width ?? xf.width) : t.strokeWidth ?? xf["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(xf).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && Sf(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && Sf(t.width) && { [r("width")]: t.width },
			..."height" in t && Sf(t.height) && { [r("height")]: t.height },
			[r("stroke-width")]: u,
			...l && { [r("class")]: l },
			[r("viewBox")]: `0 0 ${i} ${a}`,
			...t.hasA11yProp === !1 ? { [r("aria-hidden")]: "true" } : {},
			..."attributes" in t && t.attributes
		},
		e.node.map((e) => {
			let [n, i, a] = e, o = t.nonScalingStroke ? {
				[r("vector-effect")]: "non-scaling-stroke",
				...i
			} : i;
			return a ? [
				n,
				o,
				a
			] : [n, o];
		})
	];
}
// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
function wf(e, t = {}) {
	return Cf(e, {
		...t,
		attributeNames: {
			...t.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
// node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
var Tf = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, Ef = (0, _.createContext)({}), Df = () => (0, _.useContext)(Ef), Of = (0, _.forwardRef)(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
	node: l,
	aliases: [],
	size: 24
}, ...d }, f) => {
	let { size: p = 24, strokeWidth: m = 2, absoluteStrokeWidth: h = !1, nonScalingStroke: g = !1, color: v = "currentColor", className: y = "" } = Df() ?? {}, b = !!c || Tf(d), [x, S, C = []] = wf(u, {
		color: e ?? v,
		width: n ?? t ?? p,
		height: r ?? t ?? p,
		strokeWidth: i ?? m,
		absoluteStrokeWidth: a ?? h,
		nonScalingStroke: o ?? g,
		className: bf(y, s),
		hasA11yProp: b,
		attributes: d
	});
	return (0, _.createElement)(x, {
		ref: f,
		...S
	}, [...C.map(([e, t]) => (0, _.createElement)(e, t)), ...Array.isArray(c) ? c : [c]]);
});
// node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function kf(e, t = [], n = []) {
	let r = typeof e == "string" ? _f(e, t, n) : e, i = (0, _.forwardRef)(({ className: e, ...t }, n) => (0, _.createElement)(Of, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = yf(r.name)), i;
}
// node_modules/lucide-react/dist/esm/icons/arrow-left.mjs
var Af = {
	name: "arrow-left",
	size: 24,
	node: [["path", {
		d: "m12 19-7-7 7-7",
		key: "1l729n"
	}], ["path", {
		d: "M19 12H5",
		key: "x3x0zl"
	}]]
};
Af.node;
var jf = kf(Af), Mf = {
	name: "check",
	size: 24,
	node: [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]
};
Mf.node;
var Nf = kf(Mf), Pf = {
	name: "chevron-down",
	size: 24,
	node: [["path", {
		d: "m6 9 6 6 6-6",
		key: "qrunsl"
	}]]
};
Pf.node;
var Ff = kf(Pf), If = {
	name: "chevron-up",
	size: 24,
	node: [["path", {
		d: "m18 15-6-6-6 6",
		key: "153udz"
	}]]
};
If.node;
var Lf = kf(If), Rf = {
	name: "cloud",
	size: 24,
	node: [["path", {
		d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
		key: "p7xjir"
	}]]
};
Rf.node;
var zf = kf(Rf), Bf = {
	name: "copy",
	size: 24,
	node: [["rect", {
		width: "14",
		height: "14",
		x: "8",
		y: "8",
		rx: "2",
		ry: "2",
		key: "17jyea"
	}], ["path", {
		d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
		key: "zix9uf"
	}]]
};
Bf.node;
var Vf = kf(Bf), Hf = {
	name: "download",
	size: 24,
	node: [
		["path", {
			d: "M12 15V3",
			key: "m9g1x1"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}],
		["path", {
			d: "m7 10 5 5 5-5",
			key: "brsn70"
		}]
	]
};
Hf.node;
var Uf = kf(Hf), Wf = {
	name: "file-plus-corner",
	size: 24,
	node: [
		["path", {
			d: "M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35",
			key: "17jvcc"
		}],
		["path", {
			d: "M14 2v5a1 1 0 0 0 1 1h5",
			key: "wfsgrz"
		}],
		["path", {
			d: "M14 19h6",
			key: "bvotb8"
		}],
		["path", {
			d: "M17 16v6",
			key: "18yu1i"
		}]
	],
	aliases: ["file-plus-2"]
};
Wf.node;
var Gf = kf(Wf), Kf = {
	name: "file-text",
	size: 24,
	node: [
		["path", {
			d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
			key: "1oefj6"
		}],
		["path", {
			d: "M14 2v5a1 1 0 0 0 1 1h5",
			key: "wfsgrz"
		}],
		["path", {
			d: "M10 9H8",
			key: "b1mrlr"
		}],
		["path", {
			d: "M16 13H8",
			key: "t4e002"
		}],
		["path", {
			d: "M16 17H8",
			key: "z1uh3a"
		}]
	]
};
Kf.node;
var qf = kf(Kf), Jf = {
	name: "files",
	size: 24,
	node: [
		["path", {
			d: "M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8",
			key: "14sh0y"
		}],
		["path", {
			d: "M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z",
			key: "1970lx"
		}],
		["path", {
			d: "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1",
			key: "l4dndm"
		}]
	]
};
Jf.node;
var Yf = kf(Jf), Xf = {
	name: "flame",
	size: 24,
	node: [["path", {
		d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
		key: "1slcih"
	}]]
};
Xf.node;
var Zf = kf(Xf), Qf = {
	name: "gamepad-2",
	size: 24,
	node: [
		["line", {
			x1: "6",
			x2: "10",
			y1: "11",
			y2: "11",
			key: "1gktln"
		}],
		["line", {
			x1: "8",
			x2: "8",
			y1: "9",
			y2: "13",
			key: "qnk9ow"
		}],
		["line", {
			x1: "15",
			x2: "15.01",
			y1: "12",
			y2: "12",
			key: "krot7o"
		}],
		["line", {
			x1: "18",
			x2: "18.01",
			y1: "10",
			y2: "10",
			key: "1lcuu1"
		}],
		["path", {
			d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
			key: "mfqc10"
		}]
	]
};
Qf.node;
var $f = kf(Qf), ep = {
	name: "house",
	size: 24,
	node: [["path", {
		d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
		key: "5wwlr5"
	}], ["path", {
		d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
		key: "r6nss1"
	}]],
	aliases: ["home"]
};
ep.node;
var tp = kf(ep), np = {
	name: "loader-circle",
	size: 24,
	node: [["path", {
		d: "M21 12a9 9 0 1 1-6.219-8.56",
		key: "13zald"
	}]],
	aliases: ["loader-2"]
};
np.node;
var rp = kf(np), ip = {
	name: "log-out",
	size: 24,
	node: [
		["path", {
			d: "m16 17 5-5-5-5",
			key: "1bji2h"
		}],
		["path", {
			d: "M21 12H9",
			key: "dn1m92"
		}],
		["path", {
			d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
			key: "1uf3rs"
		}]
	]
};
ip.node;
var ap = kf(ip), op = {
	name: "maximize-2",
	size: 24,
	node: [
		["path", {
			d: "M15 3h6v6",
			key: "1q9fwt"
		}],
		["path", {
			d: "m21 3-7 7",
			key: "1l2asr"
		}],
		["path", {
			d: "m3 21 7-7",
			key: "tjx5ai"
		}],
		["path", {
			d: "M9 21H3v-6",
			key: "wtvkvv"
		}]
	]
};
op.node;
var sp = kf(op), cp = {
	name: "menu",
	size: 24,
	node: [
		["path", {
			d: "M4 5h16",
			key: "1tepv9"
		}],
		["path", {
			d: "M4 12h16",
			key: "1lakjw"
		}],
		["path", {
			d: "M4 19h16",
			key: "1djgab"
		}]
	]
};
cp.node;
var lp = kf(cp), up = {
	name: "panel-left",
	size: 24,
	node: [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M9 3v18",
		key: "fh3hqa"
	}]],
	aliases: ["sidebar"]
};
up.node;
var dp = kf(up), fp = {
	name: "pencil",
	size: 24,
	node: [["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}], ["path", {
		d: "m15 5 4 4",
		key: "1mk7zo"
	}]]
};
fp.node;
var pp = kf(fp), mp = {
	name: "play",
	size: 24,
	node: [["path", {
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
		key: "10ikf1"
	}]]
};
mp.node;
var hp = kf(mp), gp = {
	name: "radio",
	size: 24,
	node: [
		["path", {
			d: "M16.247 7.761a6 6 0 0 1 0 8.478",
			key: "1fwjs5"
		}],
		["path", {
			d: "M19.075 4.933a10 10 0 0 1 0 14.134",
			key: "ehdyv1"
		}],
		["path", {
			d: "M4.925 19.067a10 10 0 0 1 0-14.134",
			key: "1q22gi"
		}],
		["path", {
			d: "M7.753 16.239a6 6 0 0 1 0-8.478",
			key: "r2q7qm"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}]
	]
};
gp.node;
var _p = kf(gp), vp = {
	name: "refresh-cw",
	size: 24,
	node: [
		["path", {
			d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
			key: "v9h5vc"
		}],
		["path", {
			d: "M21 3v5h-5",
			key: "1q7to0"
		}],
		["path", {
			d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
			key: "3uifl3"
		}],
		["path", {
			d: "M8 16H3v5",
			key: "1cv678"
		}]
	]
};
vp.node;
var yp = kf(vp), bp = {
	name: "rotate-ccw",
	size: 24,
	node: [["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}], ["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}]]
};
bp.node;
var xp = kf(bp), Sp = {
	name: "search",
	size: 24,
	node: [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]
};
Sp.node;
var Cp = kf(Sp), wp = {
	name: "settings-2",
	size: 24,
	node: [
		["path", {
			d: "M14 17H5",
			key: "gfn3mx"
		}],
		["path", {
			d: "M19 7h-9",
			key: "6i9tg"
		}],
		["circle", {
			cx: "17",
			cy: "17",
			r: "3",
			key: "18b49y"
		}],
		["circle", {
			cx: "7",
			cy: "7",
			r: "3",
			key: "dfmy0x"
		}]
	]
};
wp.node;
var Tp = kf(wp), Ep = {
	name: "shield-check",
	size: 24,
	node: [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}], ["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}]]
};
Ep.node;
var Dp = kf(Ep), Op = {
	name: "shield",
	size: 24,
	node: [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}]]
};
Op.node;
var kp = kf(Op), Ap = {
	name: "signal",
	size: 24,
	node: [
		["path", {
			d: "M2 20h.01",
			key: "4haj6o"
		}],
		["path", {
			d: "M7 20v-4",
			key: "j294jx"
		}],
		["path", {
			d: "M12 20v-8",
			key: "i3yub9"
		}],
		["path", {
			d: "M17 20V8",
			key: "1tkaf5"
		}],
		["path", {
			d: "M22 4v16",
			key: "sih9yq"
		}]
	]
};
Ap.node;
var jp = kf(Ap), Mp = {
	name: "smartphone",
	size: 24,
	node: [["rect", {
		width: "14",
		height: "20",
		x: "5",
		y: "2",
		rx: "2",
		ry: "2",
		key: "1yt0o3"
	}], ["path", {
		d: "M12 18h.01",
		key: "mhygvu"
	}]]
};
Mp.node;
var Np = kf(Mp), Pp = {
	name: "trash",
	size: 24,
	node: [
		["path", {
			d: "M10 11v6",
			key: "nco0om"
		}],
		["path", {
			d: "M14 11v6",
			key: "outv1u"
		}],
		["path", {
			d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
			key: "miytrc"
		}],
		["path", {
			d: "M3 6h18",
			key: "d0wm0j"
		}],
		["path", {
			d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
			key: "e791ji"
		}]
	],
	aliases: ["trash-2"]
};
Pp.node;
var Fp = kf(Pp), Ip = {
	name: "triangle-exclamation-point",
	size: 24,
	node: [
		["path", {
			d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
			key: "wmoenq"
		}],
		["path", {
			d: "M12 9v4",
			key: "juzpu7"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	],
	aliases: ["alert-triangle", "triangle-alert"]
};
Ip.node;
var Lp = kf(Ip), Rp = {
	name: "upload",
	size: 24,
	node: [
		["path", {
			d: "M12 3v12",
			key: "1x0j5s"
		}],
		["path", {
			d: "m17 8-5-5-5 5",
			key: "7q97r8"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}]
	]
};
Rp.node;
var zp = kf(Rp), Bp = {
	name: "user-round",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "8",
		r: "5",
		key: "1hypcn"
	}], ["path", {
		d: "M20 21a8 8 0 0 0-16 0",
		key: "rfgkzh"
	}]],
	aliases: ["user-2"]
};
Bp.node;
var Vp = kf(Bp), Hp = {
	name: "x",
	size: 24,
	node: [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]
};
Hp.node;
var Up = kf(Hp), Wp = {
	name: "zap",
	size: 24,
	node: [["path", {
		d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
		key: "1v7up4"
	}]]
};
Wp.node;
var Gp = kf(Wp);
// src/components/ui/dropdown-menu.tsx
function Kp({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(mu, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function qp({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Cu, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function Jp({ align: e = "start", alignOffset: t = 0, side: n = "bottom", sideOffset: r = 4, className: i, ...a }) {
	let o = hf();
	return /* @__PURE__ */ (0, Y.jsx)(cl, {
		container: o ?? void 0,
		children: /* @__PURE__ */ (0, Y.jsx)(Ql, {
			className: "isolate z-50 outline-none",
			align: e,
			alignOffset: t,
			side: n,
			sideOffset: r,
			children: /* @__PURE__ */ (0, Y.jsx)(al, {
				"data-slot": "dropdown-menu-content",
				className: $("z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-32 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", i),
				...a
			})
		})
	});
}
function Yp({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(vr, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function Xp({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(yr, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: $("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", e),
		...n
	});
}
function Zp({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, Y.jsx)(xr, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: $("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", e),
		...r
	});
}
function Qp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Du, {
		"data-slot": "dropdown-menu-separator",
		className: $("-mx-1 my-1 h-px bg-border", e),
		...t
	});
}
// node_modules/@base-ui/react/use-render/useRender.mjs
function $p(e) {
	return He(e.defaultTagName ?? "div", e, e);
}
// node_modules/class-variance-authority/dist/index.mjs
var em = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, tm = zu, nm = (e, t) => (n) => {
	if (t?.variants == null) return tm(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = em(t) || em(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return tm(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, rm = nm("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
		secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
		destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
		outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
		ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
		link: "text-primary underline-offset-4 hover:underline"
	} },
	defaultVariants: { variant: "default" }
});
function im({ className: e, variant: t = "default", render: n, ...r }) {
	return $p({
		defaultTagName: "span",
		props: ke({ className: $(rm({ variant: t }), e) }, r),
		render: n,
		state: {
			slot: "badge",
			variant: t
		}
	});
}
// node_modules/@base-ui/react/button/Button.mjs
var am = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i = !1, focusableWhenDisabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { getButtonProps: l, buttonRef: u } = Cn({
		disabled: i,
		focusableWhenDisabled: a,
		native: o
	});
	return He("button", e, {
		state: { disabled: i },
		ref: [t, u],
		props: [c, l]
	});
}), om = nm("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/80",
			outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			icon: "size-8",
			"icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function sm({ className: e, variant: t = "default", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, Y.jsx)(am, {
		"data-slot": "button",
		className: $(om({
			variant: t,
			size: n,
			className: e
		})),
		...r
	});
}
// src/components/ui/card.tsx
function cm({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card",
		"data-size": t,
		className: $("group/card flex flex-col gap-[var(--card-spacing)] overflow-hidden rounded-xl bg-card py-[var(--card-spacing)] text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:1rem] has-[data-slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:0.75rem] data-[size=sm]:has-[data-slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", e),
		...n
	});
}
function lm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-header",
		className: $("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-[var(--card-spacing)] has-[data-slot=card-action]:grid-cols-[1fr_auto] has-[data-slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-[var(--card-spacing)]", e),
		...t
	});
}
function um({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("h2", {
		"data-slot": "card-title",
		className: $("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", e),
		...t
	});
}
function dm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-description",
		className: $("text-sm text-muted-foreground", e),
		...t
	});
}
function fm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-content",
		className: $("px-[var(--card-spacing)]", e),
		...t
	});
}
function pm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-footer",
		className: $("flex items-center rounded-b-xl border-t bg-muted/50 p-[var(--card-spacing)]", e),
		...t
	});
}
// node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs
var mm = /*#__PURE__*/ _.createContext(void 0);
function hm(e) {
	let t = _.useContext(mm);
	if (!e && t === void 0) throw Error(W(27));
	return t;
}
// node_modules/@base-ui/react/dialog/backdrop/DialogBackdrop.mjs
var gm = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, forceRender: a = !1, ...o } = e, s = hm(), c = s.useState("open"), l = s.useState("nested"), u = s.useState("mounted");
	return He("div", e, {
		state: {
			open: c,
			transitionStatus: s.useState("transitionStatus")
		},
		ref: [s.context.backdropRef, t],
		stateAttributesMapping: pt,
		props: [{
			role: "presentation",
			hidden: !u,
			style: {
				userSelect: "none",
				WebkitUserSelect: "none"
			}
		}, o],
		enabled: a || !l
	});
}), _m = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, ...s } = e, c = hm(), l = c.useState("open"), { getButtonProps: u, buttonRef: d } = Cn({
		disabled: a,
		native: o
	}), f = { disabled: a };
	function p(e) {
		l && c.setOpen(!1, $n(St, e.nativeEvent));
	}
	return He("button", e, {
		state: f,
		ref: [t, d],
		props: [
			{ onClick: p },
			s,
			u
		]
	});
}), vm = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = hm(), c = Qn(a);
	return s.useSyncedValueWithCleanup("descriptionElementId", c), He("p", e, {
		ref: t,
		props: [{ id: c }, o]
	});
}), ym = /*#__PURE__*/ _.createContext(void 0);
function bm() {
	let e = _.useContext(ym);
	if (e === void 0) throw Error(W(26));
	return e;
}
// node_modules/@base-ui/react/dialog/popup/DialogPopupCssVars.mjs
var xm = "--nested-dialogs", Sm = "data-nested-dialog-open", Cm = {
	...ft,
	...$e,
	nestedDialogOpen(e) {
		return e ? { [Sm]: "" } : null;
	}
}, wm = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, initialFocus: o, ...s } = e, c = hm(), l = c.useState("descriptionElementId"), u = c.useState("disablePointerDismissal"), d = c.useState("floatingRootContext"), f = c.useState("popupProps"), p = c.useState("modal"), m = c.useState("mounted"), h = c.useState("nested"), g = c.useState("nestedOpenDialogCount"), _ = c.useState("open"), v = c.useState("openMethod"), y = c.useState("titleElementId"), b = c.useState("transitionStatus"), x = c.useState("role"), S = d.useState("floatingId");
	bm(), mr({
		open: _,
		ref: c.context.popupRef,
		onComplete() {
			_ && c.context.onOpenChangeComplete?.(!0);
		}
	});
	let C = o === void 0 ? _o(c.context.popupRef) : o, w = g > 0, T = c.useStateSetter("popupElement"), E = He("div", e, {
		state: {
			open: _,
			nested: h,
			transitionStatus: b,
			nestedDialogOpen: w
		},
		props: [
			f,
			{
				id: S,
				"aria-labelledby": y,
				"aria-describedby": l,
				role: x,
				...go,
				hidden: !m,
				onKeyDown(e) {
					Uc.has(e.key) && e.stopPropagation();
				},
				style: { [xm]: g }
			},
			s
		],
		ref: [
			t,
			c.context.popupRef,
			T
		],
		stateAttributesMapping: Cm
	});
	return /*#__PURE__*/ (0, Y.jsx)(ao, {
		context: d,
		openInteractionType: v,
		disabled: !m,
		closeOnFocusOut: !u,
		initialFocus: C,
		returnFocus: a,
		modal: p !== !1,
		restoreFocus: "popup",
		children: E
	});
}), Tm = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, i = hm(), a = i.useState("mounted"), o = i.useState("modal"), s = i.useState("open");
	return a || n ? /*#__PURE__*/ (0, Y.jsx)(ym.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, Y.jsxs)(Va, {
			ref: t,
			...r,
			children: [a && o === !0 && /*#__PURE__*/ (0, Y.jsx)(Il, {
				ref: i.context.internalBackdropRef,
				inert: ll(!s)
			}), e.children]
		})
	}) : null;
});
// node_modules/@base-ui/react/dialog/root/useDialogRoot.mjs
function Em({ store: e, parentContext: t, isDrawer: n }) {
	let r = e.useState("open"), i = e.useState("mounted"), a = e.useState("disablePointerDismissal"), o = e.useState("modal"), s = e.useState("popupElement"), c = e.useState("floatingRootContext"), [l, u] = _.useState(0), [d, f] = _.useState(0), p = l === 0, m = po(c, {
		outsidePressEvent() {
			return e.context.internalBackdropRef.current || e.context.backdropRef.current ? "intentional" : {
				mouse: o === "trap-focus" ? "sloppy" : "intentional",
				touch: "sloppy"
			};
		},
		outsidePress(t) {
			if (!e.context.outsidePressEnabledRef.current || "button" in t && t.button !== 0) return !1;
			if ("touches" in t) {
				if (t.type === "touchend") {
					if (t.changedTouches.length !== 1 || t.touches.length !== 0) return !1;
				} else if (t.touches.length !== 1) return !1;
			}
			let n = Nr(t);
			if (p && !a) {
				if (o) {
					let t = e.context.internalBackdropRef.current, r = e.context.backdropRef.current;
					return t || r ? t === n || r === n || X(n, s) && !n?.hasAttribute("data-base-ui-portal") : !0;
				}
				return !0;
			}
			return !1;
		},
		escapeKey: p
	});
	return Yl(r && o === !0, s), e.useContextCallback("onNestedDialogOpen", (t, n) => {
		(e.select("open") || e.select("mounted")) && (u(t), f(n));
	}), J(() => {
		!r && !i && (u(0), f(0));
	}, [r, i]), J(() => (t?.onNestedDialogOpen && r && t.onNestedDialogOpen(l + 1, d + +!!n), () => {
		t?.onNestedDialogOpen && r && t.onNestedDialogOpen(0, 0);
	}), [
		n,
		r,
		l,
		d,
		t
	]), Oo(e, {
		activeTriggerProps: m.reference,
		inactiveTriggerProps: m.trigger,
		popupProps: m.floating,
		nestedOpenDialogCount: l,
		nestedOpenDrawerCount: d
	}), null;
}
// node_modules/@base-ui/react/dialog/store/DialogStore.mjs
var Dm = {
	...as,
	modal: (e) => e.modal,
	nested: (e) => e.nested,
	nestedOpenDialogCount: (e) => e.nestedOpenDialogCount,
	nestedOpenDrawerCount: (e) => e.nestedOpenDrawerCount,
	disablePointerDismissal: (e) => e.disablePointerDismissal,
	openMethod: (e) => e.openMethod,
	descriptionElementId: (e) => e.descriptionElementId,
	titleElementId: (e) => e.titleElementId,
	viewportElement: (e) => e.viewportElement,
	role: (e) => e.role
}, Om = class extends Xo {
	constructor(e, t, n) {
		let r = new Ao(), i = km(e, r, t, n);
		super(i, Am(r), Dm);
	}
	setOpen = (e, t) => {
		t.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", !0);
		}, !e && t.trigger == null && this.state.activeTriggerId != null && (t.trigger = this.state.activeTriggerElement ?? void 0), this.context.onOpenChange?.(e, t), t.isCanceled || (this.state.floatingRootContext.dispatchOpenChange(e, t), this.update(So(this.state, e, t.trigger)));
	};
};
function km(e, t, n, r = !1) {
	return {
		...$o(t, n, r),
		modal: !0,
		disablePointerDismissal: !1,
		viewportElement: null,
		descriptionElementId: void 0,
		titleElementId: void 0,
		openMethod: null,
		nested: !1,
		nestedOpenDialogCount: 0,
		nestedOpenDrawerCount: 0,
		role: "dialog",
		...e
	};
}
function Am(e) {
	return {
		popupRef: /*#__PURE__*/ _.createRef(),
		backdropRef: /*#__PURE__*/ _.createRef(),
		internalBackdropRef: /*#__PURE__*/ _.createRef(),
		outsidePressEnabledRef: { current: !0 },
		triggerElements: e,
		onOpenChange: void 0,
		onOpenChangeComplete: void 0
	};
}
// node_modules/@base-ui/react/dialog/root/useRenderDialogRoot.mjs
function jm(e, t) {
	let { children: n, open: r, defaultOpen: i = !1, onOpenChange: a, onOpenChangeComplete: o, disablePointerDismissal: s = !1, modal: c = !0, actionsRef: l, handle: u, triggerId: d, defaultTriggerId: f = null } = t, p = e === "drawer", m = e === "alert-dialog", h = m ? !0 : c, g = m || s, v = m ? "alertdialog" : "dialog", y = hm(!0), b = {
		modal: h,
		disablePointerDismissal: g,
		nested: y != null,
		role: v
	}, x = vo((e, t) => new Om({
		open: i,
		openProp: r,
		activeTriggerId: f,
		triggerIdProp: d,
		...b
	}, e, t), !0);
	x.useControlledProp("openProp", r), x.useControlledProp("triggerIdProp", d), x.useSyncedValues(b), x.useContextCallback("onOpenChange", a), x.useContextCallback("onOpenChangeComplete", o);
	let S = x.useState("open"), C = x.useState("mounted"), w = x.useState("payload");
	ko(x, S), Eo(x);
	let { forceUnmount: T } = Do(S, x);
	_.useImperativeHandle(l, () => ({
		unmount: T,
		close: () => x.setOpen(!1, $n(Nt))
	}), [T, x]);
	let E = S || C || u != null;
	return /*#__PURE__*/ (0, Y.jsxs)(mm.Provider, {
		value: x,
		children: [
			u && /*#__PURE__*/ (0, Y.jsx)(yo, {
				handle: u,
				store: x
			}),
			E && /*#__PURE__*/ (0, Y.jsx)(Em, {
				store: x,
				parentContext: y?.context,
				isDrawer: p
			}),
			typeof n == "function" ? n({ payload: w }) : n
		]
	});
}
// node_modules/@base-ui/react/dialog/root/DialogRoot.mjs
var Mm = zo(function(e) {
	return jm("dialog", e);
}), Nm = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = hm(), c = Qn(a);
	return s.useSyncedValueWithCleanup("titleElementId", c), He("h2", e, {
		ref: t,
		props: [{ id: c }, o]
	});
}), Pm = Bo(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, payload: c, handle: l, ...u } = e, d = hm(!0), f = os(l) ?? d;
	if (!f) throw Error(W(79));
	let p = Qn(s), m = f.useState("floatingRootContext"), h = f.useState("isOpenedByTrigger", p), g = f.useState("triggerPopupId", p), v = _.useRef(null), { registerTrigger: y, isMountedByThisTrigger: b } = To(p, v, f, { payload: c }), { getButtonProps: x, buttonRef: S } = Cn({
		disabled: a,
		native: o
	}), C = oo(m), w = ru(() => f.select("open"), (e) => {
		f.set("openMethod", e);
	}), T = {
		disabled: a,
		open: h
	}, E = f.useState("triggerProps", b);
	return He("button", e, {
		state: T,
		ref: [
			S,
			t,
			y,
			v
		],
		props: [
			C.reference,
			E,
			w,
			{
				[Na]: "",
				id: p,
				"aria-haspopup": "dialog",
				"aria-expanded": h,
				"aria-controls": g
			},
			u,
			x
		],
		stateAttributesMapping: ut
	});
});
// src/components/ui/dialog.tsx
function Fm({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Mm, {
		"data-slot": "dialog",
		...e
	});
}
function Im({ container: e, ...t }) {
	let n = hf();
	return /* @__PURE__ */ (0, Y.jsx)(Tm, {
		"data-slot": "dialog-portal",
		container: e ?? n ?? void 0,
		...t
	});
}
function Lm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(gm, {
		"data-slot": "dialog-overlay",
		className: $("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", e),
		...t
	});
}
function Rm({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ (0, Y.jsxs)(Im, { children: [/* @__PURE__ */ (0, Y.jsx)(Lm, {}), /* @__PURE__ */ (0, Y.jsxs)(wm, {
		"data-slot": "dialog-content",
		className: $("fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...r,
		children: [t, n && /* @__PURE__ */ (0, Y.jsxs)(_m, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ (0, Y.jsx)(sm, {
				variant: "ghost",
				className: "absolute top-2 right-2",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, Y.jsx)(Up, {}), /* @__PURE__ */ (0, Y.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function zm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "dialog-header",
		className: $("flex flex-col gap-2", e),
		...t
	});
}
function Bm({ className: e, showCloseButton: t = !1, children: n, ...r }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		"data-slot": "dialog-footer",
		className: $("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", e),
		...r,
		children: [n, t && /* @__PURE__ */ (0, Y.jsx)(_m, {
			render: /* @__PURE__ */ (0, Y.jsx)(sm, { variant: "outline" }),
			children: "Close"
		})]
	});
}
function Vm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Nm, {
		"data-slot": "dialog-title",
		className: $("font-heading text-base leading-none font-medium", e),
		...t
	});
}
function Hm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(vm, {
		"data-slot": "dialog-description",
		className: $("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", e),
		...t
	});
}
// node_modules/@base-ui/react/field/control/FieldControlDataAttributes.mjs
var Um = "data-valid", Wm = "data-invalid", Gm = {
	badInput: !1,
	customError: !1,
	patternMismatch: !1,
	rangeOverflow: !1,
	rangeUnderflow: !1,
	stepMismatch: !1,
	tooLong: !1,
	tooShort: !1,
	typeMismatch: !1,
	valid: null,
	valueMissing: !1
}, Km = {
	disabled: !1,
	valid: null,
	touched: !1,
	dirty: !1,
	filled: !1,
	focused: !1
}, qm = { valid(e) {
	return e === null ? null : e ? { [Um]: "" } : { [Wm]: "" };
} }, Jm = {
	invalid: void 0,
	name: void 0,
	validityData: {
		state: Gm,
		errors: [],
		error: "",
		value: "",
		initialValue: null
	},
	setValidityData: Se,
	disabled: void 0,
	setTouched: Se,
	setDirty: Se,
	setFilled: Se,
	setFocused: Se,
	focusOwnerRef: { current: void 0 },
	validationMode: "onSubmit",
	shouldValidateOnChange: () => !1,
	state: Km,
	registerFieldControl: Se,
	validation: {
		getValidationProps: (e, t = we) => t,
		inputRef: { current: null },
		registeredInputs: /* @__PURE__ */ new Map(),
		registerInput: Se,
		getInputControl: () => null,
		commit: async () => {},
		change: Se
	}
}, Ym = /*#__PURE__*/ _.createContext(Jm);
function Xm(e = !0) {
	let t = _.useContext(Ym);
	if (t.setValidityData === Se && !e) throw Error(W(28));
	return t;
}
// node_modules/@base-ui/react/internals/form-context/FormContext.mjs
var Zm = /*#__PURE__*/ _.createContext({
	elementRef: { current: null },
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: Se,
	validationMode: "onSubmit",
	submitCountRef: { current: 0 }
});
function Qm() {
	return _.useContext(Zm);
}
// node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
var $m = /*#__PURE__*/ _.createContext({
	controlId: void 0,
	registerControlId: Se,
	resetControlId: Se,
	labelId: void 0,
	setLabelId: Se,
	messageIds: [],
	setMessageIds: Se,
	getDescriptionProps: (e) => e
});
function eh() {
	return _.useContext($m);
}
// node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function th(e = {}) {
	let { id: t, enabled: n = !0 } = e, { controlId: r, registerControlId: i, resetControlId: a } = eh(), o = Qn(), s = G(() => Symbol()), c = _.useRef(!1), l = _.useRef(!1), u = q(() => {
		c.current && i !== Se && (c.current = !1, i(s.current, void 0));
	});
	return J(() => {
		if (!n || i === Se) {
			u();
			return;
		}
		let e;
		if (t !== void 0) l.current = !0, e = t;
		else if (l.current) e = o;
		else {
			a();
			return;
		}
		e === void 0 ? u() : (c.current = !0, i(s.current, e));
	}, [
		t,
		n,
		i,
		a,
		o,
		s,
		u
	]), J(() => u, [u]), (n ? r : void 0) ?? t ?? o;
}
// node_modules/@base-ui/react/internals/field-root-context/useSetFieldFocused.mjs
function nh(e, t, n) {
	let { setFocused: r, focusOwnerRef: i } = Xm(), a = q((t) => {
		(t ? !e : i.current === a) && (i.current = t && a, n?.(t), r(t));
	});
	return J(() => {
		let e = t.current;
		return e?.getRootNode()?.activeElement === e && a(!0), () => a(!1);
	}, [
		e,
		t,
		a
	]), a;
}
// node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function rh(e, t, n, r, i = !0, a) {
	let { registerFieldControl: o } = Xm(), s = G(() => Symbol());
	J(() => {
		let c = s.current;
		i ? o(c, {
			controlRef: e,
			getValue: r,
			id: t,
			name: a,
			value: n
		}) : o(c, void 0);
	}, [
		e,
		i,
		r,
		t,
		a,
		o,
		s,
		n
	]), J(() => {
		let e = s.current;
		return () => {
			o(e, void 0);
		};
	}, [o, s]);
}
// node_modules/@base-ui/react/field/control/FieldControl.mjs
var ih = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, name: a, value: o, disabled: s = !1, onValueChange: c, defaultValue: l, autoFocus: u = !1, style: d, ...f } = e, { state: p, name: m, disabled: h, setTouched: g, setDirty: v, validityData: y, setFilled: b, validationMode: x, validation: S } = Xm(), { clearErrors: C, elementRef: w, submitCountRef: T } = Qm(), E = h || s, D = m ?? a, O = {
		...p,
		disabled: E
	}, { labelId: k } = eh(), A = th({ id: i }), j = o !== void 0, M = o == null ? void 0 : String(o), N = q(() => S.inputRef.current?.value);
	rh(S.inputRef, A, M, N, !E, a), J(() => {
		let e = M ?? S.inputRef.current?.value;
		e !== void 0 && b(e !== "");
	}, [
		M,
		l,
		S.inputRef,
		b
	]), nu(M, () => {
		M !== void 0 && (C(D), v(M !== (y.initialValue ?? "")), S.change(M));
	});
	let P = _.useRef(null), F = nh(E, P), I = wr();
	return He("input", e, {
		ref: [t, P],
		state: O,
		props: [
			{
				id: A,
				disabled: E,
				name: D,
				ref: S.inputRef,
				"aria-labelledby": k,
				autoFocus: u,
				...j ? { value: o } : { defaultValue: l },
				onChange(e) {
					let t = e.currentTarget.value, n = $n(gt, e.nativeEvent);
					c?.(t, n), j || (v(t !== (y.initialValue ?? "")), b(t !== ""), !e.nativeEvent.defaultPrevented && !n.isCanceled && (C(D), S.change(t)));
				},
				onFocus() {
					F(!0);
				},
				onBlur(e) {
					if (g(!0), F(!1), x === "onBlur") {
						let t = e.currentTarget.value;
						S.commit(t), j && queueMicrotask(() => {
							let e = S.inputRef.current?.value;
							e !== void 0 && e !== t && e !== (y.initialValue ?? "") && S.commit(e);
						});
					}
				},
				onKeyDown(e) {
					if (e.currentTarget.tagName === "INPUT" && e.key === "Enter") {
						g(!0);
						let t = e.currentTarget.value, n = e.currentTarget.form;
						if (n && n === w.current && !e.defaultPrevented) {
							let t = e.currentTarget, n = T.current;
							I.start(0, () => {
								T.current === n && S.commit(t.value);
							});
						} else S.commit(t);
					}
				}
			},
			f,
			(e) => S.getValidationProps(E, e)
		],
		stateAttributesMapping: qm
	});
}), ah = /*#__PURE__*/ _.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, Y.jsx)(ih, {
		ref: t,
		...e
	});
});
// src/components/ui/input.tsx
function oh({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(ah, {
		type: t,
		"data-slot": "input",
		className: $("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", e),
		...n
	});
}
// node_modules/@base-ui/utils/useOnFirstRender.mjs
function sh(e) {
	let t = _.useRef(!0);
	t.current && (t.current = !1, e());
}
// node_modules/@base-ui/react/select/root/SelectRootContext.mjs
var ch = /*#__PURE__*/ _.createContext(void 0), lh = /*#__PURE__*/ _.createContext(void 0);
function uh() {
	let e = _.useContext(ch);
	if (e === void 0) throw Error(W(60));
	return e;
}
function dh() {
	let e = _.useContext(lh);
	if (e === void 0) throw Error(W(61));
	return e;
}
// node_modules/@base-ui/utils/areArraysEqual.mjs
function fh(e, t, n = Object.is) {
	let { length: r } = e;
	if (r !== t.length) return !1;
	for (let i = 0; i < r; i += 1) if (!n(e[i], t[i])) return !1;
	return !0;
}
// node_modules/@base-ui/react/internals/itemEquality.mjs
var ph = (e, t) => Object.is(e, t);
function mh(e, t, n) {
	return e == null || t == null ? Object.is(e, t) : n(e, t);
}
function hh(e, t, n) {
	return Array.isArray(e) && Array.isArray(t) ? !fh(e, t, (e, t) => mh(e, t, n)) : e !== t;
}
function gh(e, t, n) {
	return e ? e.some((e) => e !== void 0 && mh(t, e, n)) : !1;
}
function _h(e, t, n) {
	return e ? e.findIndex((e) => e !== void 0 && mh(e, t, n)) : -1;
}
function vh(e, t) {
	if (t !== ph) return (n) => gh(e, n, t);
	let n = new Set(e);
	return n.delete(void 0), (t) => n.has(t) && (t !== 0 || e.some((e) => Object.is(t, e)));
}
function yh(e, t, n, r) {
	let i = r && Array.isArray(t) ? e.findIndex(vh(t, n)) : _h(e, t, n);
	return i === -1 ? null : i;
}
function bh(e, t, n, r, i, a) {
	return gh(r, t, i) ? a != null && e > a && gh(r, n[a], i) ? a : e : e === a ? yh(n, r, i, !0) : a;
}
function xh(e, t, n) {
	return e.filter((e) => !mh(t, e, n));
}
// node_modules/@base-ui/react/select/store.mjs
var Sh = {
	id: (e) => e.id,
	labelId: (e) => e.labelId,
	modal: (e) => e.modal,
	multiple: (e) => e.multiple,
	disabled: (e) => e.disabled,
	readOnly: (e) => e.readOnly,
	required: (e) => e.required,
	highlightItemOnHover: (e) => e.highlightItemOnHover,
	items: (e) => e.items,
	itemToStringLabel: (e) => e.itemToStringLabel,
	isItemEqualToValue: (e) => e.isItemEqualToValue,
	value: (e) => e.value,
	hasSelectedValue: (e) => {
		let { value: t, multiple: n, itemToStringValue: r } = e;
		return t == null ? !1 : n && Array.isArray(t) ? t.length > 0 : Fu(t, r) !== "";
	},
	hasNullItemLabel: (e, t) => t ? Nu(e.items) : !1,
	open: (e) => e.open,
	mounted: (e) => e.mounted,
	forceMount: (e) => e.forceMount,
	transitionStatus: (e) => e.transitionStatus,
	openMethod: (e) => e.openMethod,
	activeIndex: (e) => e.activeIndex,
	selectedIndex: (e) => e.selectedIndex,
	isActive: (e, t) => e.activeIndex === t,
	isSelected: (e, t) => {
		let n = e.isItemEqualToValue, r = e.value;
		return e.multiple ? Array.isArray(r) && r.some((e) => mh(t, e, n)) : mh(t, r, n);
	},
	isSelectedByFocus: (e, t) => e.selectedIndex === t,
	popupProps: (e) => e.popupProps,
	triggerProps: (e) => e.triggerProps,
	itemRoot: (e) => e.itemRoot,
	triggerElement: (e) => e.triggerElement,
	positionerElement: (e) => e.positionerElement,
	listElement: (e) => e.listElement,
	popupSide: (e) => e.popupSide,
	scrollUpArrowVisible: (e) => e.scrollUpArrowVisible,
	scrollDownArrowVisible: (e) => e.scrollDownArrowVisible,
	hasScrollArrows: (e) => e.hasScrollArrows
};
// node_modules/@base-ui/utils/clamp.mjs
function Ch(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
	return Math.max(t, Math.min(e, n));
}
function wh(e, t) {
	return Math.max(0, e - t);
}
function Th(e, t) {
	if (t <= 0) return 0;
	let n = Ch(e, 0, t), r = n, i = t - n, a = r <= 1, o = i <= 1;
	return a && o ? r <= i ? 0 : t : a ? 0 : o ? t : n;
}
// node_modules/@base-ui/react/select/root/SelectRoot.mjs
function Eh(e) {
	let { id: t, value: n, defaultValue: r = null, onValueChange: i, open: a, defaultOpen: o = !1, onOpenChange: s, name: c, form: l, autoComplete: u, disabled: d = !1, readOnly: f = !1, required: p = !1, modal: m = !0, actionsRef: h, inputRef: g, onOpenChangeComplete: v, items: y, multiple: b = !1, itemToStringLabel: x, itemToStringValue: S, isItemEqualToValue: C = ph, highlightItemOnHover: w = !0, children: T } = e, { clearErrors: E } = Qm(), { setDirty: D, setTouched: O, setFocused: k, validityData: A, setFilled: j, name: M, disabled: N, validation: P, validationMode: F } = Xm(), I = th({ id: t }), L = N || d, R = M ?? c, [z, B] = Ft({
		controlled: n,
		default: b ? r ?? Ce : r,
		name: "Select",
		state: "value"
	}), [V, ee] = Ft({
		controlled: a,
		default: o,
		name: "Select",
		state: "open"
	}), H = _.useRef([]), te = _.useRef([]), ne = _.useRef(null), re = _.useRef(null), ie = _.useRef(0), ae = _.useRef(null), oe = _.useRef([]), se = _.useRef(!1), U = _.useRef(null), W = _.useRef(null), ce = _.useRef({
		allowSelectedMouseUp: !1,
		allowUnselectedMouseUp: !1,
		dragY: 0
	}), le = _.useRef(!1), ue = _.useRef(z), { openMethod: de, triggerProps: fe } = iu(V), K = G(() => new Xo({
		id: I,
		labelId: void 0,
		modal: m,
		multiple: b,
		disabled: L,
		readOnly: f,
		required: p,
		highlightItemOnHover: w,
		itemToStringLabel: x,
		itemToStringValue: S,
		isItemEqualToValue: C,
		value: z,
		open: V,
		mounted: V,
		transitionStatus: void 0,
		items: y,
		forceMount: !1,
		openMethod: null,
		activeIndex: null,
		selectedIndex: null,
		popupProps: we,
		triggerProps: we,
		itemRoot: {
			props: we,
			multiple: b,
			disabled: L,
			readOnly: f,
			isItemEqualToValue: C
		},
		triggerElement: null,
		positionerElement: null,
		listElement: null,
		popupSide: null,
		scrollUpArrowVisible: !1,
		scrollDownArrowVisible: !1,
		hasScrollArrows: !1
	}, {
		setValue: Se,
		setOpen: Se,
		handleScrollArrowVisibility: Se,
		onOpenChangeComplete: Se,
		listRef: H,
		popupRef: ne,
		scrollHandlerRef: re,
		scrollArrowsMountedCountRef: ie,
		valueRef: ae,
		valuesRef: oe,
		labelsRef: te,
		typingRef: se,
		selectionRef: ce,
		firstItemTextRef: U,
		selectedItemTextRef: W,
		alignItemWithTriggerActiveRef: le,
		initialValueRef: ue
	}, Sh)).current, [me, he] = _.useState(!1), { mounted: ge, transitionStatus: _e, forceUnmount: ve } = ho({
		open: V,
		ref: ne,
		preventUnmountOnClose: me,
		setPreventUnmountOnClose: he,
		onUnmount() {
			K.update({
				activeIndex: null,
				openMethod: null,
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			}), v?.(!1);
		}
	}), ye = K.useState("activeIndex"), be = K.useState("selectedIndex"), xe = K.useState("triggerElement"), Te = K.useState("positionerElement"), Ee = Eu(de), De = de ?? Ee, Oe = _.useMemo(() => b ? "" : Fu(z, S), [
		b,
		z,
		S
	]), Ae = _.useMemo(() => b && Array.isArray(z) ? z.map((e) => Fu(e, S)) : Fu(z, S), [
		b,
		z,
		S
	]);
	rh(oi(xe), I, z, q(() => Ae), !L, c);
	let je = b ? Array.isArray(z) && z.length > 0 : z != null && Oe !== "";
	J(() => {
		j(je);
	}, [je, j]), J(function() {
		let e = yh(oe.current, z, C, b);
		e === null && (W.current = null), V || K.set("selectedIndex", e);
	}, [
		b,
		V,
		z,
		C,
		K
	]), nu(z, () => {
		E(R), D(hh(z, A.initialValue, C)), P.change(z);
	});
	let Me = q((e, t) => {
		let n = t, r = Co(n);
		s?.(e, n), t.isCanceled || (e || he(r()), ee(e), e || t.reason !== "focus-out" && t.reason !== "outside-press" || (O(!0), k(!1), F === "onBlur" && P.commit(z)));
	});
	_.useImperativeHandle(h, () => ({
		unmount: ve,
		close: () => {
			K.state.open && Me(!1, $n(Nt));
		}
	}), [
		ve,
		Me,
		K
	]);
	let Ne = q((e, t) => {
		i?.(e, t), t.isCanceled || B(e);
	}), Pe = q((e) => {
		let t = wh(e.scrollHeight, e.clientHeight), n = Th(e.scrollTop, t), r = n > 0, i = n < t;
		K.set("scrollUpArrowVisible", r), K.set("scrollDownArrowVisible", i);
	}), Fe = ss({
		open: V,
		onOpenChange: Me,
		elements: {
			reference: xe,
			floating: Te
		}
	}), Ie = oo(Fe, {
		enabled: !L,
		event: "mousedown"
	}), Le = po(Fe), Re = ws(Fe, {
		enabled: !L,
		listRef: H,
		activeIndex: ye,
		selectedIndex: be,
		disabledIndices: Ce,
		onNavigate(e) {
			(e !== null || V) && K.set("activeIndex", e);
		},
		focusItemOnHover: w
	}), ze = Ts(Fe, {
		enabled: !L && (V || !f && !b),
		listRef: te,
		activeIndex: ye,
		selectedIndex: be,
		disabledIndices: (e) => Ou(H.current[e]),
		onMatch(e) {
			V ? K.set("activeIndex", e) : Ne(oe.current[e], $n(gt));
		},
		onTyping(e) {
			se.current = e;
		}
	}), Be = _.useMemo(() => ke(ze.reference, Re.reference, Le.reference, Ie.reference, fe), [
		Ie.reference,
		ze.reference,
		Re.reference,
		Le.reference,
		fe
	]), Ve = _.useMemo(() => ke(go, ze.floating, Re.floating, Le.floating), [
		ze.floating,
		Re.floating,
		Le.floating
	]), He = Re.item ?? we, Ue = _.useMemo(() => ({
		props: He,
		multiple: b,
		disabled: L,
		readOnly: f,
		isItemEqualToValue: C
	}), [
		He,
		b,
		L,
		f,
		C
	]);
	K.useContextCallback("setValue", Ne), K.useContextCallback("setOpen", Me), K.useContextCallback("handleScrollArrowVisibility", Pe), K.useContextCallback("onOpenChangeComplete", v), sh(() => {
		K.update({
			popupProps: Ve,
			triggerProps: Be,
			itemRoot: Ue
		});
	}), K.useSyncedValues({
		id: I,
		modal: m,
		multiple: b,
		disabled: L,
		readOnly: f,
		required: p,
		highlightItemOnHover: w,
		value: z,
		open: V,
		mounted: ge,
		transitionStatus: _e,
		popupProps: Ve,
		triggerProps: Be,
		itemRoot: Ue,
		items: y,
		itemToStringLabel: x,
		itemToStringValue: S,
		isItemEqualToValue: C,
		openMethod: De
	});
	let We = pe(g, P.inputRef), Ge = b ? void 0 : R, Ke = _.useMemo(() => !b || !Array.isArray(z) || !R ? null : z.map((e) => {
		let t = Fu(e, S);
		return /*#__PURE__*/ (0, Y.jsx)("input", {
			type: "hidden",
			form: l,
			name: R,
			value: t,
			disabled: L
		}, t);
	}), [
		b,
		z,
		l,
		R,
		S,
		L
	]);
	return /*#__PURE__*/ (0, Y.jsxs)(ch.Provider, {
		value: K,
		children: [
			/*#__PURE__*/ (0, Y.jsx)(lh.Provider, {
				value: Fe,
				children: T
			}),
			/*#__PURE__*/ (0, Y.jsx)("input", {
				...P.getValidationProps(L, {
					onFocus() {
						K.state.triggerElement?.focus({ focusVisible: !0 });
					},
					onChange(e) {
						if (e.nativeEvent.defaultPrevented || L || f) return;
						let t = e.currentTarget.value, n = $n(gt, e.nativeEvent);
						function r() {
							if (b) return;
							let e = t.toLowerCase(), r = oe.current.findIndex((t) => Fu(t, S).toLowerCase() === e || Pu(t, x).toLowerCase() === e);
							r === -1 && (r = oe.current.findIndex((t, n) => {
								let r = te.current[n];
								return r != null && r.toLowerCase() === e;
							}));
							let i = oe.current[r];
							i != null && Ne(i, n);
						}
						K.set("forceMount", !0), queueMicrotask(r);
					}
				}),
				id: I && Ge == null ? `${I}-hidden-input` : void 0,
				form: l,
				name: Ge,
				autoComplete: u,
				value: Oe,
				disabled: L,
				required: p && !(b && je),
				readOnly: f,
				ref: We,
				style: R ? ui : li,
				tabIndex: -1,
				"aria-hidden": !0,
				suppressHydrationWarning: !0
			}),
			Ke
		]
	});
}
// node_modules/@base-ui/react/utils/resolveAriaLabelledBy.mjs
function Dh(e, t) {
	return e ?? t;
}
var Oh = "data-popup-side", kh = 400, Ah = {
	...dt,
	...qm,
	popupSide: (e) => e ? { [Oh]: e } : null,
	value: () => null
}, jh = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, disabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { setTouched: l, validationMode: u, validation: d, state: f, disabled: p } = Xm(), { labelId: m } = eh(), h = uh(), g = h.useState("readOnly"), v = h.useState("required"), y = h.useState("disabled"), b = p || y || a, x = h.useState("open"), S = h.useState("mounted"), C = h.useState("value"), w = h.useState("triggerProps"), T = h.useState("positionerElement"), E = h.useState("listElement"), D = h.useState("popupSide"), O = h.useState("id"), k = h.useState("labelId"), A = h.useState("hasSelectedValue"), j = S && T ? D : null, M = i ?? O, N = Dh(m, k);
	th({ id: i });
	let P = oi(T), F = _.useRef(null), I = nh(b, F), { getButtonProps: L, buttonRef: R } = Cn({
		disabled: b,
		native: o
	}), z = h.useStateSetter("triggerElement"), B = wr(), V = wr(), ee = wr();
	_.useEffect(() => {
		if (x) return ee.start(kh, () => {
			h.context.selectionRef.current.allowUnselectedMouseUp = !0, h.context.selectionRef.current.allowSelectedMouseUp = !0;
		}), () => {
			ee.clear();
		};
		h.context.selectionRef.current = {
			allowSelectedMouseUp: !1,
			allowUnselectedMouseUp: !1,
			dragY: 0
		}, V.clear();
	}, [
		x,
		h,
		V,
		ee
	]);
	let H = ke(w, {
		id: M,
		role: "combobox",
		"aria-expanded": x,
		"aria-haspopup": "listbox",
		"aria-controls": x ? E?.id ?? Jr(T)?.id : void 0,
		"aria-labelledby": N,
		"aria-readonly": g || void 0,
		"aria-required": v || void 0,
		tabIndex: b ? -1 : 0,
		onFocus(e) {
			I(!0), x && h.context.alignItemWithTriggerActiveRef.current && h.context.setOpen(!1, $n(gt, e.nativeEvent)), B.start(0, () => {
				h.set("forceMount", !0);
			});
		},
		onBlur(e) {
			X(T, e.relatedTarget) || (l(!0), I(!1), u === "onBlur" && d.commit(C));
		},
		onMouseDown(e) {
			if (x) return;
			let t = xn(e.currentTarget);
			function n(e) {
				if (!F.current) return;
				let t = e.target;
				X(F.current, t) || X(P.current, t) || gu(e, F.current) || h.context.setOpen(!1, $n(Ot, e));
			}
			V.start(0, () => {
				t.addEventListener("mouseup", n, { once: !0 });
			});
		}
	}, c, L), te = d.getValidationProps(b, H);
	te.role = "combobox";
	let ne = {
		...f,
		open: x,
		disabled: b,
		value: C,
		readOnly: g,
		popupSide: j,
		placeholder: !A
	};
	return He("button", e, {
		ref: [
			t,
			F,
			R,
			z
		],
		state: ne,
		stateAttributesMapping: Ah,
		props: te
	});
}), Mh = { value: () => null }, Nh = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { className: n, render: r, children: i, placeholder: a, style: o, ...s } = e, c = uh(), l = c.useState("value"), u = c.useState("items"), d = c.useState("itemToStringLabel"), f = c.useState("hasSelectedValue"), p = !f && a != null && i == null, m = c.useState("hasNullItemLabel", p), h = {
		value: l,
		placeholder: !f
	}, g = null;
	return g = typeof i == "function" ? i(l) : i ?? (p && !m ? a : Array.isArray(l) ? Lu(l, u, d) : Iu(l, u, d)), He("span", e, {
		state: h,
		ref: [t, c.context.valueRef],
		props: [{ children: g }, s],
		stateAttributesMapping: Mh
	});
}), Ph = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e;
	return He("span", e, {
		state: { open: uh().useState("open") },
		ref: t,
		props: [{
			"aria-hidden": !0,
			children: "▼"
		}, a],
		stateAttributesMapping: ut
	});
}), Fh = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let n = uh(), r = n.useState("mounted"), i = n.useState("forceMount");
	return r || i ? /*#__PURE__*/ (0, Y.jsx)(Va, {
		ref: t,
		...e
	}) : null;
}), Ih = /*#__PURE__*/ _.createContext(void 0);
function Lh() {
	let e = _.useContext(Ih);
	if (!e) throw Error(W(59));
	return e;
}
// node_modules/@base-ui/react/select/popup/utils.mjs
function Rh(e, t) {
	e && Object.assign(e.style, t);
}
var zh = {
	position: "relative",
	maxHeight: "100%",
	overflowX: "hidden",
	overflowY: "auto"
}, Bh = { position: "fixed" }, Vh = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { anchor: n, className: r, render: i, positionMethod: a, side: o, align: s, sideOffset: c, alignOffset: l, collisionBoundary: u = "clipping-ancestors", collisionPadding: d, arrowPadding: f, sticky: p, disableAnchorTracking: m, alignItemWithTrigger: h = !0, collisionAvoidance: g = Pa, style: v, ...y } = e, b = uh(), x = dh(), S = b.useState("open"), C = b.useState("mounted"), w = b.useState("modal"), T = b.useState("value"), E = b.useState("openMethod"), D = b.useState("positionerElement"), O = b.useState("triggerElement"), k = b.useState("isItemEqualToValue"), A = b.useState("transitionStatus"), j = _.useRef(null), M = _.useRef(null), [N, P] = _.useState(h), F = C && N && E !== "touch";
	!C && N !== h && P(h), _.useImperativeHandle(b.context.alignItemWithTriggerActiveRef, () => F), Zl((F || w) && S, E === "touch", D, O);
	let I = El({
		anchor: n,
		floatingRootContext: x,
		positionMethod: a,
		mounted: C,
		side: o,
		sideOffset: c,
		align: s,
		alignOffset: l,
		arrowPadding: f,
		collisionBoundary: u,
		collisionPadding: d,
		sticky: p,
		disableAnchorTracking: m ?? F,
		collisionAvoidance: g,
		keepMounted: !0
	}), L = F ? "none" : I.side, R = F ? Bh : I.positionerStyles, z = {
		open: S,
		side: L,
		align: I.align,
		anchorHidden: I.anchorHidden
	};
	J(() => {
		b.set("popupSide", I.side);
	}, [b, I.side]);
	let B = Rl(e, z, {
		styles: R,
		transitionStatus: A,
		props: y,
		refs: [t, b.useStateSetter("positionerElement")],
		hidden: !C,
		inert: !S
	}), V = _.useRef(0), ee = q((e) => {
		if (b.context.valuesRef.current.length === 0) return;
		let t = V.current;
		V.current = e.size;
		let n = $n(gt);
		if (t !== 0 && !b.state.multiple && T !== null && _h(b.context.valuesRef.current, T, k) === -1) {
			let e = b.context.initialValueRef.current, t = e != null && _h(b.context.valuesRef.current, e, k) !== -1 ? e : null;
			b.context.setValue(t, n), t === null && (b.set("selectedIndex", null), b.context.selectedItemTextRef.current = null);
		}
		if (t !== 0 && b.state.multiple && Array.isArray(T)) {
			let e = T.filter((e) => _h(b.context.valuesRef.current, e, k) !== -1);
			e.length !== T.length && (b.context.setValue(e, n), e.length === 0 && (b.set("selectedIndex", null), b.context.selectedItemTextRef.current = null));
		}
		if (S && F) {
			b.update({
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			});
			let e = { height: "" };
			Rh(D, e), Rh(b.context.popupRef.current, e);
		}
	}), H = _.useMemo(() => ({
		...I,
		side: L,
		alignItemWithTriggerActive: F,
		setControlledAlignItemWithTrigger: P,
		scrollUpArrowRef: j,
		scrollDownArrowRef: M
	}), [
		I,
		L,
		F,
		P
	]);
	return /*#__PURE__*/ (0, Y.jsx)(kl, {
		elementsRef: b.context.listRef,
		labelsRef: b.context.labelsRef,
		onMapChange: ee,
		children: /*#__PURE__*/ (0, Y.jsxs)(Ih.Provider, {
			value: H,
			children: [C && w && /*#__PURE__*/ (0, Y.jsx)(Il, {
				inert: ll(!S),
				cutout: O
			}), B]
		})
	});
}), Hh = "base-ui-disable-scrollbar", Uh = {
	className: Hh,
	getElement(e) {
		return /*#__PURE__*/ (0, Y.jsx)("style", {
			nonce: e,
			href: Hh,
			precedence: "base-ui:low",
			children: `.${Hh}{scrollbar-width:none}.${Hh}::-webkit-scrollbar{display:none}`
		});
	}
}, Wh = /*#__PURE__*/ _.createContext(void 0), Gh = { disableStyleElements: !1 };
function Kh() {
	return _.useContext(Wh) ?? Gh;
}
// node_modules/@base-ui/react/select/positioner/SelectPositionerCssVars.mjs
var qh = "--transform-origin", Jh = {
	...ft,
	...$e
}, Yh = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, ...o } = e, s = uh(), c = s.useState("multiple"), l = s.useState("readOnly"), u = s.useState("highlightItemOnHover"), d = dh(), { side: f, align: p, alignItemWithTriggerActive: m, isPositioned: h, setControlledAlignItemWithTrigger: g } = Lh(), v = Rc(!0) != null, y = fl(), { nonce: b, disableStyleElements: x } = Kh(), S = s.useState("id"), C = s.useState("open"), w = s.useState("openMethod"), T = s.useState("mounted"), E = s.useState("popupProps"), D = s.useState("transitionStatus"), O = s.useState("triggerElement"), k = s.useState("positionerElement"), A = s.useState("listElement"), j = _.useRef(!1), M = _.useRef(!1), N = _.useRef({}), P = sr(), F = q((e) => {
		if (!k || !s.context.popupRef.current || !M.current) return;
		let t = k.style.top === "0px", n = k.style.bottom === "0px";
		if (j.current || !m || !t && !n) {
			s.context.handleScrollArrowVisibility(e);
			return;
		}
		let r = Qh(k), i = $h(k.getBoundingClientRect().height, "y", r), a = xn(k), o = Ut(k), c = o.getComputedStyle(k), l = parseFloat(c.marginTop), u = parseFloat(c.marginBottom), d = Xh(o.getComputedStyle(s.context.popupRef.current)), f = Math.min(a.documentElement.clientHeight - l - u, d), p = e.scrollTop, h = Zh(e), g = null, _ = (e) => {
			k.style.height = `${e}px`;
		}, v = t ? h - p : p, y = Math.min(i + v, f);
		if (v <= 1) {
			let n = Ch(v, 0, f - i);
			n > 0 && _(i + n), e.scrollTop = t ? h : 0, f - (i + n) <= 1 && (j.current = !0), s.context.handleScrollArrowVisibility(e);
			return;
		}
		f - y > 1 ? g = t ? Infinity : 0 : n && p < h && (g = p - (v - (i + v - f)));
		let b = Math.ceil(y);
		if (b !== 0 && _(b), g != null) {
			let t = Ch(g, 0, Zh(e));
			Math.abs(e.scrollTop - t) > 1 && (e.scrollTop = t);
		}
		b >= f - 1 && (j.current = !0), s.context.handleScrollArrowVisibility(e);
	});
	_.useImperativeHandle(s.context.scrollHandlerRef, () => F, [F]), mr({
		open: C,
		ref: s.context.popupRef,
		onComplete() {
			C && s.context.onOpenChangeComplete(!0);
		}
	});
	let I = {
		open: C,
		transitionStatus: D,
		side: f,
		align: p
	};
	J(() => {
		k && s.context.popupRef.current && !Object.keys(N.current).length && (N.current = {
			top: k.style.top || "0",
			left: k.style.left || "0",
			right: k.style.right,
			height: k.style.height,
			bottom: k.style.bottom,
			minHeight: k.style.minHeight,
			maxHeight: k.style.maxHeight,
			marginTop: k.style.marginTop,
			marginBottom: k.style.marginBottom
		});
	}, [s, k]), J(() => {
		C || m || (M.current = !1, j.current = !1, Rh(k, N.current));
	}, [
		C,
		m,
		k
	]), J(() => {
		let e = s.context.popupRef.current;
		if (!C || !O || !k || !e || m && !h || s.state.transitionStatus === "ending") return;
		if (M.current = !0, e.style.removeProperty(qh), !m) {
			P.request(() => s.context.handleScrollArrowVisibility(A || e));
			return;
		}
		let t = ng(e);
		try {
			let t = s.context.selectedItemTextRef.current;
			t?.isConnected || (t = !s.select("hasSelectedValue") && s.context.firstItemTextRef.current?.isConnected ? s.context.firstItemTextRef.current : null);
			let n = s.context.valueRef.current, r = Ut(k), i = r.getComputedStyle(k), a = r.getComputedStyle(e), o = xn(O), c = Qh(O), l = eg(O.getBoundingClientRect(), c), d = eg(k.getBoundingClientRect(), c), f = l.height, p = A || e, m = p.scrollHeight, h = parseFloat(a.borderBottomWidth), _ = parseFloat(i.marginTop) || 10, v = parseFloat(i.marginBottom) || 10, b = parseFloat(i.minHeight) || 100, x = Xh(a), S = o.documentElement.clientHeight - _ - v, C = o.documentElement.clientWidth, w = S - l.bottom + f, T, E = y === "rtl" ? l.right - d.width : l.left, D = 0;
			if (t && n) {
				let e = eg(n.getBoundingClientRect(), c);
				T = eg(t.getBoundingClientRect(), c), E = d.left + (y === "rtl" ? e.right - T.right : e.left - T.left);
				let r = e.top - l.top + e.height / 2;
				D = T.top - d.top + T.height / 2 - r;
			}
			let M = w + D + v + h, P = Math.min(S, M), F = S - _ - v, I = M - P, L = C - 5;
			k.style.left = `${Ch(E, 5, L - d.width)}px`, k.style.height = `${P}px`, k.style.maxHeight = "none", k.style.marginTop = `${_}px`, k.style.marginBottom = `${v}px`, e.style.height = "100%";
			let R = Zh(p), z = I >= R - 1;
			z && (P = Math.min(S, d.height) - (I - R));
			let B = l.top < 20 || l.bottom > S - 20 || Math.ceil(P) + 1 < Math.min(m, b), V = (r.visualViewport?.scale ?? 1) !== 1 && Ln;
			if (B || V) {
				Rh(k, N.current), g(!1);
				return;
			}
			let ee = Math.max(b, P);
			if (z) {
				let e = Math.max(0, S - M);
				k.style.top = d.height >= F ? "0" : `${e}px`, k.style.height = `${P}px`, p.scrollTop = Zh(p);
			} else k.style.bottom = "0", p.scrollTop = I;
			if (T) {
				let t = d.top, n = d.height, r = T.top + T.height / 2, i = Ch(n > 0 ? (r - t) / n * 100 : 50, 0, 100);
				e.style.setProperty(qh, `50% ${i}%`);
			}
			(ee === S || P >= x) && (j.current = !0), s.context.handleScrollArrowVisibility(p), u && s.state.selectedIndex === null && s.state.activeIndex === null && s.context.listRef.current[0] != null && s.set("activeIndex", 0);
		} finally {
			t();
		}
	}, [
		s,
		C,
		k,
		O,
		m,
		g,
		P,
		A,
		u,
		y,
		h
	]), _.useEffect(() => {
		if (!m || !k || !C) return;
		let e = Ut(k);
		function t(e) {
			s.context.setOpen(!1, $n(Pt, e));
		}
		return ii(e, "resize", t);
	}, [
		s,
		m,
		k,
		C
	]);
	let L = {
		...A ? { role: "presentation" } : {
			role: "listbox",
			"aria-multiselectable": c || void 0,
			"aria-readonly": l || void 0,
			id: `${S}-list`
		},
		onKeyDown(e) {
			v && Uc.has(e.key) && e.stopPropagation();
		},
		onScroll(e) {
			A || F(e.currentTarget);
		},
		...m && { style: A ? { height: "100%" } : zh },
		className: !A && m ? Uh.className : void 0
	}, R = He("div", e, {
		ref: [t, s.context.popupRef],
		state: I,
		stateAttributesMapping: Jh,
		props: [
			E,
			L,
			Xc(D),
			o
		]
	});
	return /*#__PURE__*/ (0, Y.jsxs)(_.Fragment, { children: [!x && Uh.getElement(b), /*#__PURE__*/ (0, Y.jsx)(ao, {
		context: d,
		modal: !1,
		disabled: !T,
		openInteractionType: w,
		returnFocus: a,
		restoreFocus: !0,
		children: R
	})] });
});
function Xh(e) {
	let t = e.maxHeight;
	return t.endsWith("px") && parseFloat(t) || Infinity;
}
function Zh(e) {
	return wh(e.scrollHeight, e.clientHeight);
}
function Qh(e) {
	return gc.getScale(e);
}
function $h(e, t, n) {
	return e / n[t];
}
function eg(e, t) {
	return Ri({
		x: $h(e.x, "x", t),
		y: $h(e.y, "y", t),
		width: $h(e.width, "x", t),
		height: $h(e.height, "y", t)
	});
}
var tg = [
	["transform", "none"],
	["scale", "1"],
	["translate", "0 0"]
];
function ng(e) {
	let { style: t } = e, n = {};
	for (let [e, r] of tg) n[e] = t.getPropertyValue(e), t.setProperty(e, r, "important");
	return () => {
		for (let [e] of tg) {
			let r = n[e];
			r ? t.setProperty(e, r) : t.removeProperty(e);
		}
	};
}
// node_modules/@base-ui/react/select/list/SelectList.mjs
var rg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = uh(), s = o.useState("multiple"), c = o.useState("readOnly"), { alignItemWithTriggerActive: l } = Lh(), u = o.useState("hasScrollArrows"), d = o.useState("openMethod"), f = {
		id: `${o.useState("id")}-list`,
		role: "listbox",
		"aria-multiselectable": s || void 0,
		"aria-readonly": c || void 0,
		onScroll(e) {
			o.context.scrollHandlerRef.current?.(e.currentTarget);
		},
		...l && { style: zh },
		className: u && d !== "touch" ? Uh.className : void 0
	};
	return He("div", e, {
		ref: [t, o.useStateSetter("listElement")],
		props: [f, a]
	});
}), ig = /*#__PURE__*/ _.createContext(void 0);
function ag() {
	let e = _.useContext(ig);
	if (!e) throw Error(W(57));
	return e;
}
// node_modules/@base-ui/react/select/item/SelectItem.mjs
var og = /*#__PURE__*/ _.memo(/*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, value: a = null, label: o, disabled: s = !1, nativeButton: c = !1, ...l } = e, u = _.useRef(null), d = Kn({
		guess: !0,
		label: o,
		textRef: u
	}), f = uh(), { props: p, multiple: m, disabled: h, readOnly: g, isItemEqualToValue: v } = f.useState("itemRoot"), y = h || s, b = f.useState("isActive", d.index), x = f.useState("open"), S = f.useState("isSelected", a), C = f.useState("isSelectedByFocus", d.index), w = d.index, T = _.useRef(null);
	J(() => {
		let e = f.context.valuesRef.current;
		return e[w] = a, () => {
			delete e[w];
		};
	}, [
		w,
		a,
		f
	]), J(() => {
		let e = f.state.value, t = f.state.selectedIndex, n = t, r;
		m && Array.isArray(e) ? (n = bh(w, a, f.context.valuesRef.current, e, v, t), r = n === w, w === t && !r && (f.context.selectedItemTextRef.current = null)) : (r = e !== void 0 && mh(a, e, v), r && (n = w)), f.set("selectedIndex", n), r && u.current && (f.context.selectedItemTextRef.current = u.current);
	}, [
		w,
		m,
		v,
		f,
		a
	]);
	let E = _.useRef("mouse"), D = _.useRef(!1), { getButtonProps: O, buttonRef: k } = Cn({
		disabled: y,
		focusableWhenDisabled: !0,
		native: c,
		composite: !0
	}), A = {
		disabled: y,
		selected: S,
		highlighted: b
	};
	function j(e) {
		if (h || g) return;
		let t = f.state.value;
		if (m) {
			let n = Array.isArray(t) ? t : [], r = S ? xh(n, a, v) : [...n, a];
			f.context.setValue(r, $n(xt, e));
		} else f.context.setValue(a, $n(xt, e)), f.context.setOpen(!1, $n(xt, e));
	}
	function M() {
		f.context.selectionRef.current.dragY = 0;
	}
	let N = {
		role: "option",
		"aria-selected": S,
		tabIndex: x && b ? 0 : -1,
		onKeyDown(e) {
			f.set("activeIndex", w), e.key === " " && f.context.typingRef.current && e.preventDefault();
		},
		onClick(e) {
			let t = E.current !== "touch", n = e.nativeEvent.pointerType, r = t && Dr(e.nativeEvent) && (n !== void 0 || b), i = t && !r && !D.current;
			D.current = !1, y || i || j(e.nativeEvent);
		},
		onPointerEnter(e) {
			E.current = e.pointerType;
		},
		onPointerMove(e) {
			if (e.pointerType === "mouse" && e.buttons === 1) {
				let t = f.context.selectionRef.current;
				t.dragY += e.movementY, t.dragY ** 2 >= 64 && (t.allowUnselectedMouseUp = !0);
			}
		},
		onPointerDown(e) {
			E.current = e.pointerType, D.current = !0, M();
		},
		onMouseUp() {
			if (M(), y || E.current === "touch" || D.current) return;
			let e = !f.context.selectionRef.current.allowSelectedMouseUp && S, t = !f.context.selectionRef.current.allowUnselectedMouseUp && !S;
			e || t || (D.current = !0, T.current?.click(), D.current = !1);
		}
	}, P = He("div", e, {
		ref: [
			k,
			t,
			d.ref,
			T
		],
		state: A,
		props: [
			p,
			N,
			l,
			O
		]
	}), F = _.useMemo(() => ({
		selected: S,
		index: w,
		textRef: u,
		selectedByFocus: C
	}), [
		S,
		w,
		u,
		C
	]);
	return /*#__PURE__*/ (0, Y.jsx)(ig.Provider, {
		value: F,
		children: P
	});
})), sg = /*#__PURE__*/ _.memo(/*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, keepMounted: a, selected: o, ...s } = e, c = _.useRef(null), { transitionStatus: l, setMounted: u } = cr(o), d = He("span", e, {
		ref: [t, c],
		state: {
			selected: o,
			transitionStatus: l
		},
		props: [{
			"aria-hidden": !0,
			children: "✔️"
		}, s],
		stateAttributesMapping: $e
	});
	return mr({
		batch: !0,
		enabled: !o,
		open: o,
		ref: c,
		onComplete() {
			o || u(!1);
		}
	}), d;
})), cg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { selected: n } = ag();
	return e.keepMounted || n ? /*#__PURE__*/ (0, Y.jsx)(sg, {
		...e,
		selected: n,
		ref: t
	}) : null;
}), lg = /*#__PURE__*/ _.memo(/*#__PURE__*/ _.forwardRef(function(e, t) {
	let { index: n, textRef: r, selectedByFocus: i } = ag(), a = uh(), { render: o, className: s, style: c, ...l } = e;
	return He("div", e, {
		ref: [
			_.useCallback((e) => {
				e && (n === 0 && (a.context.firstItemTextRef.current = e), i && (a.context.selectedItemTextRef.current = e));
			}, [
				a,
				n,
				i
			]),
			t,
			r
		],
		props: l
	});
})), ug = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, direction: a, keepMounted: o, ...s } = e, c = a === "up", l = uh(), { side: u, scrollDownArrowRef: d, scrollUpArrowRef: f } = Lh(), p = c ? "scrollUpArrowVisible" : "scrollDownArrowVisible", m = l.useState(p), h = l.useState("openMethod"), g = m && h !== "touch", _ = wr(), v = c ? f : d, { mounted: y, transitionStatus: b, setMounted: x } = cr(g);
	J(() => (l.context.scrollArrowsMountedCountRef.current += 1, l.set("hasScrollArrows", !0), () => {
		l.context.scrollArrowsMountedCountRef.current = Math.max(0, l.context.scrollArrowsMountedCountRef.current - 1), l.context.scrollArrowsMountedCountRef.current === 0 && l.set("hasScrollArrows", !1);
	}), [l]), mr({
		open: g,
		ref: v,
		onComplete() {
			g || x(!1);
		}
	});
	let S = He("div", e, {
		ref: [t, v],
		state: {
			direction: a,
			visible: g,
			side: u,
			transitionStatus: b
		},
		props: [{
			"aria-hidden": !0,
			children: c ? "▲" : "▼",
			style: { position: "absolute" },
			onMouseMove(e) {
				if (e.movementX === 0 && e.movementY === 0 || _.isStarted()) return;
				l.set("activeIndex", null);
				function t() {
					let e = l.state.listElement ?? l.context.popupRef.current;
					if (!e) return;
					l.set("activeIndex", null), l.context.handleScrollArrowVisibility(e);
					let n = wh(e.scrollHeight, e.clientHeight), r = Th(e.scrollTop, n), i = r === (c ? 0 : n), a = l.context.listRef.current;
					if (r !== e.scrollTop && (e.scrollTop = r), i) _.clear();
					else {
						if (a.length > 0) {
							let t = v.current?.offsetHeight || 0;
							e.scrollTop = dg(a, c, r, e.clientHeight, t, n);
						}
						_.start(40, t);
					}
				}
				_.start(40, t);
			},
			onMouseLeave() {
				_.clear();
			}
		}, s],
		stateAttributesMapping: $e
	});
	return y || o ? S : null;
});
function dg(e, t, n, r, i, a) {
	if (t) {
		let t = 0, r = n + i - 1;
		for (let n = 0; n < e.length; n += 1) {
			let i = e[n];
			if (i && i.offsetTop >= r) {
				t = n;
				break;
			}
		}
		let o = Math.max(0, t - 1), s = e[o];
		return o < t && s ? Th(s.offsetTop - i, a) : 0;
	}
	let o = e.length - 1, s = n + r - i + 1;
	for (let t = 0; t < e.length; t += 1) {
		let n = e[t];
		if (n && n.offsetTop + n.offsetHeight > s) {
			o = Math.max(0, t - 1);
			break;
		}
	}
	let c = Math.min(e.length - 1, o + 1), l = e[c];
	return c > o && l ? Th(l.offsetTop + l.offsetHeight - r + i, a) : a;
}
// node_modules/@base-ui/react/select/scroll-down-arrow/SelectScrollDownArrow.mjs
var fg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, Y.jsx)(ug, {
		...e,
		ref: t,
		direction: "down"
	});
}), pg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, Y.jsx)(ug, {
		...e,
		ref: t,
		direction: "up"
	});
}), mg = Eh;
function hg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Nh, {
		"data-slot": "select-value",
		className: $("flex flex-1 text-left", e),
		...t
	});
}
function gg({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, Y.jsxs)(jh, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: $("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...r,
		children: [n, /* @__PURE__ */ (0, Y.jsx)(Ph, { render: /* @__PURE__ */ (0, Y.jsx)(Ff, { className: "pointer-events-none size-4 text-muted-foreground" }) })]
	});
}
function _g({ className: e, children: t, side: n = "bottom", sideOffset: r = 4, align: i = "center", alignOffset: a = 0, alignItemWithTrigger: o = !0, ...s }) {
	let c = hf();
	return /* @__PURE__ */ (0, Y.jsx)(Fh, {
		container: c ?? void 0,
		children: /* @__PURE__ */ (0, Y.jsx)(Vh, {
			side: n,
			sideOffset: r,
			align: i,
			alignOffset: a,
			alignItemWithTrigger: o,
			className: "isolate z-50",
			children: /* @__PURE__ */ (0, Y.jsxs)(Yh, {
				"data-slot": "select-content",
				"data-align-trigger": o,
				className: $("relative isolate z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-36 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...s,
				children: [
					/* @__PURE__ */ (0, Y.jsx)(yg, {}),
					/* @__PURE__ */ (0, Y.jsx)(rg, { children: t }),
					/* @__PURE__ */ (0, Y.jsx)(bg, {})
				]
			})
		})
	});
}
function vg({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsxs)(og, {
		"data-slot": "select-item",
		className: $("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, Y.jsx)(lg, {
			className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
			children: t
		}), /* @__PURE__ */ (0, Y.jsx)(cg, {
			render: /* @__PURE__ */ (0, Y.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ (0, Y.jsx)(Nf, { className: "pointer-events-none" })
		})]
	});
}
function yg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(pg, {
		"data-slot": "select-scroll-up-button",
		className: $("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)(Lf, {})
	});
}
function bg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(fg, {
		"data-slot": "select-scroll-down-button",
		className: $("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)(Ff, {})
	});
}
// src/components/ui/sheet.tsx
function xg({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Mm, {
		"data-slot": "sheet",
		...e
	});
}
function Sg({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Pm, {
		"data-slot": "sheet-trigger",
		...e
	});
}
function Cg({ container: e, ...t }) {
	let n = hf();
	return /* @__PURE__ */ (0, Y.jsx)(Tm, {
		"data-slot": "sheet-portal",
		container: e ?? n ?? void 0,
		...t
	});
}
function wg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(gm, {
		"data-slot": "sheet-overlay",
		className: $("fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs", e),
		...t
	});
}
function Tg({ className: e, children: t, side: n = "right", showCloseButton: r = !0, ...i }) {
	return /* @__PURE__ */ (0, Y.jsxs)(Cg, { children: [/* @__PURE__ */ (0, Y.jsx)(wg, {}), /* @__PURE__ */ (0, Y.jsxs)(wm, {
		"data-slot": "sheet-content",
		"data-side": n,
		className: $("d3-sheet-content fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm", e),
		...i,
		children: [t, r && /* @__PURE__ */ (0, Y.jsxs)(_m, {
			"data-slot": "sheet-close",
			render: /* @__PURE__ */ (0, Y.jsx)(sm, {
				variant: "ghost",
				className: "absolute top-3 right-3",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, Y.jsx)(Up, {}), /* @__PURE__ */ (0, Y.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function Eg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "sheet-header",
		className: $("flex flex-col gap-0.5 p-4", e),
		...t
	});
}
function Dg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Nm, {
		"data-slot": "sheet-title",
		className: $("font-heading text-base font-medium text-foreground", e),
		...t
	});
}
function Og({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(vm, {
		"data-slot": "sheet-description",
		className: $("text-sm text-muted-foreground", e),
		...t
	});
}
// node_modules/@base-ui/react/tabs/root/TabsRootContext.mjs
var kg = /*#__PURE__*/ _.createContext(void 0);
function Ag() {
	let e = _.useContext(kg);
	if (e === void 0) throw Error(W(64));
	return e;
}
// node_modules/@base-ui/react/tabs/root/TabsRootDataAttributes.mjs
var jg = "data-activation-direction", Mg = { tabActivationDirection: (e) => ({ [jg]: e }) }, Ng = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { className: n, defaultValue: r = 0, onValueChange: i, orientation: a = "horizontal", render: o, value: s, style: c, ...l } = e, u = e.defaultValue !== void 0, d = _.useRef([]), [f, p] = _.useState(() => /* @__PURE__ */ new Map()), [m, h] = Ft({
		controlled: s,
		default: r,
		name: "Tabs",
		state: "value"
	}), g = s !== void 0, [v, y] = _.useState(() => /* @__PURE__ */ new Map()), b = _.useRef(void 0), x = _.useCallback((e) => Pg(v, e), [v]), [S, C] = _.useState(() => ({
		previousValue: m,
		tabActivationDirection: "none"
	})), { previousValue: w, tabActivationDirection: T } = S, E = T, D = !1;
	w !== m && (E = Fg(w, m, a, v), D = w != null && m != null && x(m) == null);
	let O = D ? w : m, k = w !== O || T !== E;
	J(() => {
		k && C({
			previousValue: O,
			tabActivationDirection: E
		});
	}, [
		O,
		k,
		E
	]);
	let A = q((e, t) => {
		t.activationDirection = Fg(m, e, a, v), i?.(e, t), t.isCanceled || h(() => e);
	}), j = q((e, t) => {
		i?.(e, $n(t, void 0, void 0, { activationDirection: "none" }));
	}), M = q((e, t) => (p((n) => {
		let r = new Map(n);
		return r.set(e, t), r;
	}), () => {
		p((n) => {
			if (n.get(e) !== t) return n;
			let r = new Map(n);
			return r.delete(e), r;
		});
	})), N = _.useCallback((e) => f.get(e), [f]), P = _.useCallback((e) => {
		for (let t of v.values()) if (e === t.value) return t.id;
	}, [v]), F = _.useMemo(() => ({
		getTabElementBySelectedValue: x,
		getTabIdByPanelValue: P,
		getTabPanelIdByValue: N,
		onValueChange: A,
		orientation: a,
		registerMountedTabPanel: M,
		setTabMap: y,
		tabActivationDirection: E,
		value: m
	}), [
		x,
		P,
		N,
		A,
		a,
		M,
		y,
		E,
		m
	]), I = _.useMemo(() => {
		for (let e of v.values()) if (e.value === m) return e;
	}, [v, m]), L = _.useMemo(() => {
		for (let e of v.values()) if (!e.disabled) return e.value;
	}, [v]), R = _.useRef(!u), z = _.useRef(r), B = _.useRef(u), V = _.useRef(!1);
	J(() => {
		if (g) return;
		function e(e, t) {
			h(() => e), C({
				previousValue: e,
				tabActivationDirection: "none"
			}), j(e, t), R.current = !1;
		}
		if (v.size === 0) {
			V.current && m !== null && !b.current?.isConnected && e(null, jt);
			return;
		}
		V.current = !0, b.current = v.keys().next().value;
		let t = I?.disabled, n = I == null && m !== null;
		if (!t && m === z.current && (B.current = !1), B.current && t && m === z.current) return;
		let r = R.current;
		if (t || n) {
			let n = L ?? null;
			if (m === n) {
				R.current = !1;
				return;
			}
			let i = jt;
			r ? i = Mt : t && (i = At), e(n, i);
		} else r && I != null && (j(m, Mt), R.current = !1);
	}, [
		L,
		g,
		j,
		I,
		h,
		v,
		m
	]);
	let ee = He("div", e, {
		state: {
			orientation: a,
			tabActivationDirection: E
		},
		ref: t,
		props: l,
		stateAttributesMapping: Mg
	});
	return /*#__PURE__*/ (0, Y.jsx)(kg.Provider, {
		value: F,
		children: /*#__PURE__*/ (0, Y.jsx)(kl, {
			elementsRef: d,
			children: ee
		})
	});
});
function Pg(e, t) {
	for (let [n, r] of e.entries()) if (t === r.value) return n;
	return null;
}
function Fg(e, t, n, r) {
	if (e == null || t == null) return "none";
	let [i, a, o] = n === "horizontal" ? [
		"left",
		"left",
		"right"
	] : [
		"top",
		"up",
		"down"
	], s = Pg(r, e), c = Pg(r, t);
	if (s == null || c == null) return s !== c && (typeof e == "number" || typeof e == "string") && typeof e == typeof t ? t > e ? o : a : "none";
	let l = s.getBoundingClientRect()[i], u = c.getBoundingClientRect()[i];
	return u < l ? a : u > l ? o : "none";
}
// node_modules/@base-ui/react/internals/composite/constants.mjs
var Ig = "data-composite-item-active", Lg = /*#__PURE__*/ _.createContext(void 0);
function Rg() {
	let e = _.useContext(Lg);
	if (e === void 0) throw Error(W(65));
	return e;
}
// node_modules/@base-ui/react/tabs/tab/TabsTab.mjs
var zg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { className: n, disabled: r = !1, render: i, value: a, id: o, nativeButton: s = !0, style: c, ...l } = e, { value: u, getTabPanelIdByValue: d, onValueChange: f, orientation: p, tabActivationDirection: m } = Ag(), { activateOnFocus: h, registerTabResizeObserverElement: g, tabsListElement: v } = Rg(), { highlightedIndex: y, onHighlightedIndexChange: b } = yn(), x = Qn(o), { compositeProps: S, compositeRef: C, index: w } = vu({ metadata: _.useMemo(() => ({
		disabled: r,
		id: x,
		value: a
	}), [
		r,
		x,
		a
	]) }), T = a === u, E = _.useRef(!1), D = _.useRef(null), O = q((e) => {
		D.current?.(), D.current = e ? g(e) : null;
	});
	J(() => {
		if (E.current) {
			E.current = !1;
			return;
		}
		if (!(T && w > -1 && y !== w)) return;
		let e = v;
		if (e != null) {
			let t = jr(xn(e));
			if (t && X(e, t)) return;
		}
		r || b(w);
	}, [
		T,
		w,
		y,
		b,
		r,
		v
	]);
	let { getButtonProps: k, buttonRef: A } = Cn({
		disabled: r,
		native: s,
		focusableWhenDisabled: !0
	}), j = d(a), M = _.useRef(!1), N = _.useRef(!1);
	function P(e) {
		f(a, $n(gt, e.nativeEvent, void 0, { activationDirection: "none" }));
	}
	function F(e) {
		T || r || P(e);
	}
	function I(e) {
		T || r || h && (!M.current || N.current) && P(e);
	}
	function L(e) {
		if (T || r) return;
		M.current = !0, N.current = e.button === 0;
		let t = xn(e.currentTarget);
		function n() {
			M.current = !1, N.current = !1, t.removeEventListener("pointerup", n), t.removeEventListener("pointercancel", n);
		}
		t.addEventListener("pointerup", n), t.addEventListener("pointercancel", n);
	}
	return He("button", e, {
		state: {
			disabled: r,
			active: T,
			orientation: p,
			tabActivationDirection: m
		},
		ref: [
			t,
			A,
			C,
			O
		],
		props: [
			S,
			{
				role: "tab",
				"aria-controls": j,
				"aria-selected": T,
				id: x,
				onClick: F,
				onFocus: I,
				onPointerDown: L,
				[Ig]: T ? "" : void 0,
				onKeyDownCapture() {
					E.current = !0;
				}
			},
			l,
			k
		],
		stateAttributesMapping: Mg
	});
}), Bg = "data-index", Vg = {
	...Mg,
	...$e
}, Hg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { className: n, value: r, render: i, keepMounted: a = !1, style: o, ...s } = e, { value: c, getTabIdByPanelValue: l, orientation: u, tabActivationDirection: d, registerMountedTabPanel: f } = Ag(), p = Qn(), { ref: m, index: h } = Kn(), g = r === c, { mounted: v, transitionStatus: y, setMounted: b } = cr(g), x = !v, S = l(r), C = {
		hidden: x,
		orientation: u,
		tabActivationDirection: d,
		transitionStatus: y
	}, w = _.useRef(null), T = He("div", e, {
		state: C,
		ref: [
			t,
			m,
			w
		],
		props: [{
			"aria-labelledby": S,
			hidden: x,
			id: p,
			role: "tabpanel",
			tabIndex: g ? 0 : -1,
			inert: ll(!g),
			[Bg]: h
		}, s],
		stateAttributesMapping: Vg
	});
	return mr({
		open: g,
		ref: w,
		onComplete() {
			g || b(!1);
		}
	}), J(() => {
		if (!(p == null || x && !a)) return f(r, p);
	}, [
		x,
		a,
		r,
		p,
		f
	]), a || v ? T : null;
});
// node_modules/@base-ui/react/internals/composite/root/useCompositeRoot.mjs
function Ug(e) {
	let { loopFocus: t = !0, orientation: n = "both", grid: r, onLoop: i, direction: a, highlightedIndex: o, onHighlightedIndexChange: s, rootRef: c, enableHomeAndEndKeys: l = !1, stopEventPropagation: u, disabledIndices: d, modifierKeys: f = Ce } = e, [p, m] = _.useState(0), h = r != null, g = _.useRef(null), v = pe(g, c), y = _.useRef([]), b = _.useRef(!1), x = _.useRef(null), S = o ?? p, C = q((e, t = !1) => {
		if (x.current = y.current[e] ?? null, (s ?? m)(e), t) {
			let t = y.current[e];
			qc(g.current, t, a, n);
		}
	}), w = q((e) => {
		if (e.size === 0) return;
		if (b.current) {
			let e = y.current, t = e.indexOf(x.current);
			if (t === -1) {
				let t = e[S];
				!t || Wi(e, S, d) ? C(Wg(e, d)) : x.current = t;
			} else t !== S && C(t);
			return;
		}
		b.current = !0;
		let t = Array.from(e.keys()), r = t.find((e) => e?.hasAttribute("data-composite-item-active")) ?? null, i = r ? e.get(r)?.index ?? -1 : -1;
		if (i !== -1) C(i);
		else if (Wi(t, S, d)) {
			let e = Ui(t, { disabledIndices: d });
			zi(t, e) || C(e);
		}
		qc(g.current, r, a, n);
	});
	J(() => {
		if (d == null || o != null || !b.current) return;
		let e = y.current;
		if (Wi(e, S, d)) {
			let t = Ui(e, { disabledIndices: d });
			zi(e, t) || C(t);
		}
	}, [
		d,
		o,
		S,
		y,
		C
	]);
	let T = q((e, t, n) => i ? i(e, t, n, y) : n), E = q((e) => {
		let o = e.key === "Home" || e.key === "End";
		if (!Uc.has(e.key) || !l && o || Gg(e, f) || !g.current) return;
		let s = a === "rtl", c = s ? Vc : Hc, p = s ? Hc : Vc, m = n === "vertical" ? Bc : c, _ = n === "vertical" ? zc : p, v = Nr(e.nativeEvent);
		if (v != null && Kc(v) && !Ou(v)) {
			let t = v.selectionStart, n = v.selectionEnd, r = v.value;
			if (t == null || e.shiftKey || t !== n || e.key !== _ && t < r.length || e.key !== m && t > 0) return;
		}
		let b = S, x = Bi(y, d), w = Vi(y, d);
		r != null && (b = r({
			disabledIndices: d,
			elementsRef: y,
			event: e,
			highlightedIndex: S,
			loopFocus: t,
			maxIndex: w,
			minIndex: x,
			onLoop: T,
			orientation: n,
			rtl: s
		}));
		let E = n !== "vertical" && e.key === c || n !== "horizontal" && e.key === "ArrowDown", D = n !== "vertical" && e.key === p || n !== "horizontal" && e.key === "ArrowUp";
		l && (e.key === "Home" ? b = x : e.key === "End" && (b = w)), b === S && (E || D) && (t && b === w && E ? (b = x, i && (b = i(e, S, b, y))) : t && b === x && D ? (b = w, i && (b = i(e, S, b, y))) : b = Ui(y.current, {
			startingIndex: b,
			decrement: D,
			disabledIndices: d
		})), b !== S && !zi(y.current, b) && (u && e.stopPropagation(), (h || o || E || D) && e.preventDefault(), C(b, !0), queueMicrotask(() => {
			y.current[b]?.focus();
		}));
	});
	return {
		props: {
			ref: v,
			onFocus(e) {
				let t = g.current, n = Nr(e.nativeEvent);
				t && n != null && Kc(n) && n.setSelectionRange(0, n.value.length);
			},
			onKeyDown: E
		},
		highlightedIndex: S,
		onHighlightedIndexChange: C,
		elementsRef: y,
		onMapChange: w,
		relayKeyboardEvent: E
	};
}
function Wg(e, t) {
	let n = -1;
	for (let r = 0; r < e.length; r += 1) {
		let i = e[r];
		if (i && !Wi(e, r, t)) {
			if (i.hasAttribute("data-composite-item-active")) return r;
			n === -1 && (n = r);
		}
	}
	return Math.max(n, 0);
}
function Gg(e, t) {
	for (let n of Wc) if (!t.includes(n) && e.getModifierState(n)) return !0;
	return !1;
}
// node_modules/@base-ui/react/internals/composite/root/CompositeRoot.mjs
function Kg(e) {
	let { render: t, className: n, style: r, refs: i = Ce, props: a = Ce, state: o = we, stateAttributesMapping: s, highlightedIndex: c, onHighlightedIndexChange: l, orientation: u, grid: d, loopFocus: f, onLoop: p, enableHomeAndEndKeys: m, onMapChange: h, stopEventPropagation: g = !0, rootRef: v, disabledIndices: y, modifierKeys: b, highlightItemOnHover: x = !1, tag: S = "div", ...C } = e, { props: w, highlightedIndex: T, onHighlightedIndexChange: E, elementsRef: D, onMapChange: O, relayKeyboardEvent: k } = Ug({
		grid: d,
		loopFocus: f,
		onLoop: p,
		orientation: u,
		highlightedIndex: c,
		onHighlightedIndexChange: l,
		rootRef: v,
		stopEventPropagation: g,
		enableHomeAndEndKeys: m,
		direction: fl(),
		disabledIndices: y,
		modifierKeys: b
	}), A = He(S, e, {
		state: o,
		ref: i,
		props: [
			w,
			...a,
			C
		],
		stateAttributesMapping: s
	}), j = _.useMemo(() => ({
		highlightedIndex: T,
		onHighlightedIndexChange: E,
		highlightItemOnHover: x,
		relayKeyboardEvent: k
	}), [
		T,
		E,
		x,
		k
	]);
	return /*#__PURE__*/ (0, Y.jsx)(vn.Provider, {
		value: j,
		children: /*#__PURE__*/ (0, Y.jsx)(kl, {
			elementsRef: D,
			onMapChange: (e) => {
				h?.(e), O(e);
			},
			children: A
		})
	});
}
// node_modules/@base-ui/react/tabs/list/TabsList.mjs
var qg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { activateOnFocus: n = !1, className: r, loopFocus: i = !0, render: a, style: o, ...s } = e, { orientation: c, setTabMap: l, tabActivationDirection: u } = Ag(), [d, f] = _.useState(0), [p, m] = _.useState(null), h = _.useRef(/* @__PURE__ */ new Set()), g = _.useRef(/* @__PURE__ */ new Set()), v = _.useRef(null);
	J(() => {
		if (typeof ResizeObserver > "u") return;
		let e = new ResizeObserver(() => {
			h.current.forEach((e) => {
				e();
			});
		});
		return v.current = e, p && e.observe(p), g.current.forEach((t) => {
			e.observe(t);
		}), () => {
			e.disconnect(), v.current = null;
		};
	}, [p]);
	let y = q((e) => (h.current.add(e), () => {
		h.current.delete(e);
	})), b = q((e) => (g.current.add(e), v.current?.observe(e), () => {
		g.current.delete(e), v.current?.unobserve(e);
	})), x = {
		orientation: c,
		tabActivationDirection: u
	}, S = {
		"aria-orientation": c === "vertical" ? "vertical" : void 0,
		role: "tablist"
	}, C = _.useMemo(() => ({
		activateOnFocus: n,
		registerIndicatorUpdateListener: y,
		registerTabResizeObserverElement: b,
		tabsListElement: p
	}), [
		n,
		y,
		b,
		p
	]);
	return /*#__PURE__*/ (0, Y.jsx)(Lg.Provider, {
		value: C,
		children: /*#__PURE__*/ (0, Y.jsx)(Kg, {
			render: a,
			className: r,
			style: o,
			state: x,
			refs: [t, m],
			props: [S, s],
			stateAttributesMapping: Mg,
			highlightedIndex: d,
			enableHomeAndEndKeys: !0,
			loopFocus: i,
			orientation: c,
			onHighlightedIndexChange: f,
			onMapChange: l,
			disabledIndices: Ce
		})
	});
});
// src/components/ui/tabs.tsx
function Jg({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(Ng, {
		"data-slot": "tabs",
		"data-orientation": t,
		className: $("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", e),
		...n
	});
}
var Yg = nm("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-muted",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function Xg({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(qg, {
		"data-slot": "tabs-list",
		"data-variant": t,
		className: $(Yg({ variant: t }), e),
		...n
	});
}
function Zg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(zg, {
		"data-slot": "tabs-trigger",
		className: $("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-[active]:shadow-sm group-data-[variant=line]/tabs-list:data-[active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent", "data-[active]:bg-background data-[active]:text-foreground dark:data-[active]:border-input dark:data-[active]:bg-input/30 dark:data-[active]:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[active]:after:opacity-100", e),
		...t
	});
}
function Qg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Hg, {
		"data-slot": "tabs-content",
		className: $("d3-tabs-panel flex-1 text-sm outline-none", e),
		...t
	});
}
// src/components/client/surfaces.tsx
function $g({ initialMessage: e = "", onSubmit: t, onGuest: n }) {
	let [r, i] = (0, _.useState)("login"), [a, o] = (0, _.useState)(""), [s, c] = (0, _.useState)(""), [l, u] = (0, _.useState)(""), [d, f] = (0, _.useState)(e), [p, m] = (0, _.useState)(!1);
	return (0, _.useEffect)(() => f(e), [e]), /* @__PURE__ */ (0, Y.jsx)("main", {
		className: "fixed inset-0 z-[2147483647] grid min-h-svh place-items-center overflow-y-auto bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, Y.jsxs)(cm, {
			className: "w-full max-w-[380px] animate-ui-enter border-border bg-card shadow-none",
			children: [
				/* @__PURE__ */ (0, Y.jsxs)(lm, {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, Y.jsx)("img", {
							className: "size-10 object-contain",
							src: "https://organizeon.com.br/d3/assets/organizeon-icon.png",
							alt: ""
						}), /* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsx)("p", {
							className: "text-sm font-semibold",
							children: "OrganizeOn"
						}), /* @__PURE__ */ (0, Y.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Cliente"
						})] })]
					}), /* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, Y.jsx)(um, {
							className: "text-xl",
							children: r === "register" ? "Criar conta" : r === "code" ? "Entrar com código" : "Entrar no OrganizeOn"
						}), /* @__PURE__ */ (0, Y.jsx)(dm, { children: "Autentique-se para acessar seus jogos e configurações." })]
					})]
				}),
				/* @__PURE__ */ (0, Y.jsxs)(fm, { children: [/* @__PURE__ */ (0, Y.jsxs)(Jg, {
					value: r,
					onValueChange: (e) => {
						i(e), f("");
					},
					children: [/* @__PURE__ */ (0, Y.jsxs)(Xg, {
						className: "grid h-9 w-full grid-cols-3 bg-muted/70",
						children: [
							/* @__PURE__ */ (0, Y.jsx)(Zg, {
								value: "login",
								children: "Entrar"
							}),
							/* @__PURE__ */ (0, Y.jsx)(Zg, {
								value: "register",
								children: "Criar conta"
							}),
							/* @__PURE__ */ (0, Y.jsx)(Zg, {
								value: "code",
								children: "Código"
							})
						]
					}), /* @__PURE__ */ (0, Y.jsx)(Qg, {
						value: r,
						className: "mt-4",
						children: /* @__PURE__ */ (0, Y.jsxs)("form", {
							className: "grid gap-3",
							onSubmit: async (e) => {
								e.preventDefault(), m(!0), f("");
								try {
									await t({
										mode: r,
										username: a,
										password: s,
										loginCode: l
									});
								} catch (e) {
									f(e instanceof Error ? e.message : "Não foi possível conectar ao servidor.");
								} finally {
									m(!1);
								}
							},
							autoComplete: "on",
							children: [
								r === "code" ? /* @__PURE__ */ (0, Y.jsxs)("label", {
									className: "grid gap-1.5 text-sm font-medium",
									htmlFor: "organizeon-code",
									children: ["Código de login", /* @__PURE__ */ (0, Y.jsx)(oh, {
										id: "organizeon-code",
										className: "text-center font-mono tracking-[.3em]",
										name: "loginCode",
										autoComplete: "one-time-code",
										maxLength: 6,
										pattern: "[A-Za-z0-9]{6}",
										required: !0,
										value: l,
										onChange: (e) => u(e.target.value.toUpperCase())
									})]
								}) : /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsxs)("label", {
									className: "grid gap-1.5 text-sm font-medium",
									htmlFor: "organizeon-username",
									children: ["Usuário", /* @__PURE__ */ (0, Y.jsx)(oh, {
										id: "organizeon-username",
										name: "username",
										autoComplete: "username",
										minLength: 3,
										maxLength: 32,
										required: !0,
										value: a,
										onChange: (e) => o(e.target.value)
									})]
								}), /* @__PURE__ */ (0, Y.jsxs)("label", {
									className: "grid gap-1.5 text-sm font-medium",
									htmlFor: "organizeon-password",
									children: ["Senha", /* @__PURE__ */ (0, Y.jsx)(oh, {
										id: "organizeon-password",
										name: "password",
										type: "password",
										autoComplete: r === "register" ? "new-password" : "current-password",
										minLength: r === "register" ? 8 : void 0,
										required: !0,
										value: s,
										onChange: (e) => c(e.target.value)
									})]
								})] }),
								r === "register" && /* @__PURE__ */ (0, Y.jsx)("p", {
									className: "text-xs leading-relaxed text-muted-foreground",
									children: "Contas novas começam sem permissões administrativas."
								}),
								d && /* @__PURE__ */ (0, Y.jsx)("p", {
									className: "rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
									role: "alert",
									children: d
								}),
								/* @__PURE__ */ (0, Y.jsx)(sm, {
									type: "submit",
									className: "mt-1 h-10 w-full",
									disabled: p || (r === "code" ? !l : !a || !s),
									"aria-busy": p,
									children: p ? "Autenticando…" : r === "register" ? "Criar conta" : "Entrar"
								})
							]
						})
					})]
				}), /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "mt-4 border-t pt-4",
					children: [/* @__PURE__ */ (0, Y.jsx)(sm, {
						variant: "outline",
						className: "w-full",
						onClick: () => void n(),
						disabled: p,
						children: "Continuar como convidado"
					}), /* @__PURE__ */ (0, Y.jsx)("p", {
						className: "mt-2 text-center text-xs text-muted-foreground",
						children: "Acesso convidado com recursos limitados"
					})]
				})] }),
				/* @__PURE__ */ (0, Y.jsxs)(pm, {
					className: "gap-2 border-t border-border pt-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, Y.jsx)(Dp, { className: "size-4 shrink-0" }), "Acesse com sua conta OrganizeOn."]
				})
			]
		})
	});
}
function e_(e) {
	return e < 1024 ? `${e} B` : e < 1024 ** 2 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1024 ** 2).toFixed(1)} MB`;
}
function t_(e) {
	let [t, n] = (0, _.useState)(null), [r, i] = (0, _.useState)([]), [a, o] = (0, _.useState)(""), [s, c] = (0, _.useState)(null), [l, u] = (0, _.useState)(""), [d, f] = (0, _.useState)(null), [p, m] = (0, _.useState)("backup"), h = async () => {
		u("");
		try {
			n(await e.getStatus());
		} catch (e) {
			u(e instanceof Error ? e.message : "Falha ao consultar o backup.");
		}
	};
	(0, _.useEffect)(() => {
		h(), e.getGames().then(i).catch(() => u("Não foi possível carregar a lista de jogos."));
	}, []);
	let g = async (e, t) => {
		c(e), u("");
		try {
			await t(), await h(), F.success("Ação concluída");
		} catch (e) {
			u(e instanceof Error ? e.message : "A ação falhou.");
		} finally {
			c(null), f(null);
		}
	}, v = t?.limit || 268435456;
	return /* @__PURE__ */ (0, Y.jsx)("main", {
		className: "fixed inset-0 z-[2147483646] overflow-y-auto bg-background px-4 pb-8 pt-[max(16px,env(safe-area-inset-top))] text-foreground sm:px-6",
		children: /* @__PURE__ */ (0, Y.jsxs)("div", {
			className: "mx-auto w-full max-w-3xl",
			children: [
				/* @__PURE__ */ (0, Y.jsxs)("header", {
					className: "mb-5 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, Y.jsx)(sm, {
						variant: "outline",
						size: "icon",
						"aria-label": "Voltar",
						onClick: e.onClose,
						children: /* @__PURE__ */ (0, Y.jsx)(jf, {})
					}), /* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, Y.jsx)("h1", {
							className: "text-xl font-semibold tracking-tight",
							children: "Dados"
						}), /* @__PURE__ */ (0, Y.jsxs)("p", {
							className: "truncate text-sm text-muted-foreground",
							children: ["Conta ", e.username]
						})]
					})]
				}),
				/* @__PURE__ */ (0, Y.jsxs)(Jg, {
					value: p,
					onValueChange: m,
					children: [
						/* @__PURE__ */ (0, Y.jsxs)(Xg, {
							className: "grid h-9 w-full grid-cols-3 sm:w-auto sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, Y.jsx)(Zg, {
									value: "backup",
									children: "Backup"
								}),
								/* @__PURE__ */ (0, Y.jsx)(Zg, {
									value: "progress",
									children: "Progressos"
								}),
								/* @__PURE__ */ (0, Y.jsx)(Zg, {
									value: "preferences",
									children: "Preferências"
								})
							]
						}),
						/* @__PURE__ */ (0, Y.jsx)(Qg, {
							value: "backup",
							className: "mt-4",
							children: /* @__PURE__ */ (0, Y.jsxs)(cm, { children: [/* @__PURE__ */ (0, Y.jsxs)(lm, {
								className: "flex-row items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsxs)(um, {
									className: "flex items-center gap-2 text-base",
									children: [/* @__PURE__ */ (0, Y.jsx)(zf, { className: "size-4 text-muted-foreground" }), "Backup na nuvem"]
								}), /* @__PURE__ */ (0, Y.jsx)(dm, {
									className: "mt-1",
									children: "Sincronize preferências e dados da conta."
								})] }), /* @__PURE__ */ (0, Y.jsx)(im, {
									variant: t?.enabled ? "default" : "secondary",
									children: t ? t.enabled ? "Ativo" : "Desativado" : "Consultando"
								})]
							}), /* @__PURE__ */ (0, Y.jsxs)(fm, {
								className: "grid gap-4",
								children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3 border-t pt-4 text-sm",
									children: [/* @__PURE__ */ (0, Y.jsx)("span", {
										className: "text-muted-foreground",
										children: "Armazenamento utilizado"
									}), /* @__PURE__ */ (0, Y.jsxs)("strong", {
										className: "font-mono text-xs sm:text-sm",
										children: [
											t ? e_(t.size || 0) : "—",
											" / ",
											e_(v)
										]
									})]
								}), /* @__PURE__ */ (0, Y.jsxs)("div", {
									className: "grid grid-cols-1 gap-2 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, Y.jsx)(sm, {
											onClick: () => void g("toggle", () => e.toggleBackup(!t?.enabled)),
											disabled: s !== null || !t,
											children: s === "toggle" ? "Atualizando…" : t?.enabled ? "Desativar backup" : "Ativar backup"
										}),
										/* @__PURE__ */ (0, Y.jsx)(sm, {
											variant: "outline",
											onClick: () => void g("save", e.saveBackup),
											disabled: s !== null,
											children: s === "save" ? "Salvando…" : "Salvar agora"
										}),
										/* @__PURE__ */ (0, Y.jsx)(sm, {
											variant: "outline",
											onClick: () => void g("restore", e.restoreBackup),
											disabled: s !== null,
											children: s === "restore" ? "Restaurando…" : "Restaurar backup"
										})
									]
								})]
							})] })
						}),
						/* @__PURE__ */ (0, Y.jsx)(Qg, {
							value: "progress",
							className: "mt-4",
							children: /* @__PURE__ */ (0, Y.jsxs)(cm, { children: [/* @__PURE__ */ (0, Y.jsxs)(lm, { children: [/* @__PURE__ */ (0, Y.jsxs)(um, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, Y.jsx)($f, { className: "size-4 text-muted-foreground" }), "Progresso dos jogos"]
							}), /* @__PURE__ */ (0, Y.jsx)(dm, { children: "Os arquivos dos jogos continuam no navegador. Estas ações removem apenas os saves." })] }), /* @__PURE__ */ (0, Y.jsxs)(fm, {
								className: "grid gap-3",
								children: [
									/* @__PURE__ */ (0, Y.jsx)(sm, {
										variant: "destructive",
										className: "w-full sm:w-fit",
										onClick: () => f("clear-all"),
										children: "Apagar todos os progressos"
									}),
									/* @__PURE__ */ (0, Y.jsxs)("div", {
										className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]",
										children: [/* @__PURE__ */ (0, Y.jsxs)(mg, {
											value: a,
											onValueChange: (e) => o(e ?? ""),
											children: [/* @__PURE__ */ (0, Y.jsx)(gg, {
												className: "w-full",
												children: /* @__PURE__ */ (0, Y.jsx)(hg, { placeholder: "Escolha um jogo" })
											}), /* @__PURE__ */ (0, Y.jsx)(_g, { children: r.map((e) => /* @__PURE__ */ (0, Y.jsxs)(vg, {
												value: e.id,
												children: [
													e.name,
													" — ",
													e.id
												]
											}, e.id)) })]
										}), /* @__PURE__ */ (0, Y.jsx)(sm, {
											variant: "destructive",
											disabled: !a,
											onClick: () => f("clear-game"),
											children: "Apagar jogo"
										})]
									}),
									/* @__PURE__ */ (0, Y.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "O identificador exibido depois do nome é o jogo selecionado."
									})
								]
							})] })
						}),
						/* @__PURE__ */ (0, Y.jsx)(Qg, {
							value: "preferences",
							className: "mt-4",
							children: /* @__PURE__ */ (0, Y.jsxs)(cm, { children: [/* @__PURE__ */ (0, Y.jsxs)(lm, { children: [/* @__PURE__ */ (0, Y.jsxs)(um, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, Y.jsx)(Tp, { className: "size-4 text-muted-foreground" }), "Preferências locais"]
							}), /* @__PURE__ */ (0, Y.jsx)(dm, { children: "Tema, proxy, identidade do navegador e teclas ficam salvos neste dispositivo." })] }), /* @__PURE__ */ (0, Y.jsx)(fm, { children: /* @__PURE__ */ (0, Y.jsx)(sm, {
								variant: "destructive",
								onClick: () => f("clear-preferences"),
								children: "Apagar preferências locais"
							}) })] })
						})
					]
				}),
				l && /* @__PURE__ */ (0, Y.jsx)("p", {
					className: "mt-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
					role: "alert",
					children: l
				}),
				/* @__PURE__ */ (0, Y.jsx)(Fm, {
					open: d !== null,
					onOpenChange: (e) => !e && f(null),
					children: /* @__PURE__ */ (0, Y.jsxs)(Rm, { children: [/* @__PURE__ */ (0, Y.jsxs)(zm, { children: [/* @__PURE__ */ (0, Y.jsx)(Vm, { children: "Confirmar exclusão" }), /* @__PURE__ */ (0, Y.jsx)(Hm, { children: d === "clear-all" ? "Apagar todos os saves de jogos deste perfil?" : d === "clear-game" ? `Apagar o save de ${a}?` : "Apagar as preferências locais deste dispositivo?" })] }), /* @__PURE__ */ (0, Y.jsxs)(Bm, { children: [/* @__PURE__ */ (0, Y.jsx)(sm, {
						variant: "outline",
						onClick: () => f(null),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, Y.jsx)(sm, {
						variant: "destructive",
						disabled: s !== null,
						onClick: () => d === "clear-all" ? void g("clear-all", e.clearAllProgress) : d === "clear-game" ? void g("clear-game", () => e.clearGameProgress(a)) : void g("clear-preferences", async () => e.clearPreferences()),
						children: "Apagar"
					})] })] })
				})
			]
		})
	});
}
function n_(e) {
	let [t, n] = (0, _.useState)(e.currentId);
	return /* @__PURE__ */ (0, Y.jsx)(Fm, {
		open: !0,
		onOpenChange: (t) => {
			t || e.onClose();
		},
		children: /* @__PURE__ */ (0, Y.jsxs)(Rm, {
			className: "max-h-[min(86svh,760px)] overflow-y-auto sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, Y.jsxs)(zm, { children: [/* @__PURE__ */ (0, Y.jsx)(Vm, { children: "Servidor proxy" }), /* @__PURE__ */ (0, Y.jsxs)(Hm, { children: [e.guestMode ? "Convidados usam apenas servidores públicos externos." : "Escolha o servidor WISP usado pelo cliente.", " A medição representa a abertura do WebSocket neste dispositivo."] })] }),
				/* @__PURE__ */ (0, Y.jsx)("div", {
					className: "grid gap-2",
					role: "radiogroup",
					"aria-label": "Servidor proxy",
					children: e.options.map((r) => {
						let i = e.latency[r.id] ?? {
							label: "Medindo conexão…",
							state: "pending"
						}, a = t === r.id;
						return /* @__PURE__ */ (0, Y.jsxs)("button", {
							type: "button",
							role: "radio",
							"aria-checked": a,
							"data-proxy-id": r.id,
							onClick: () => n(r.id),
							className: `group flex min-h-16 w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${a ? "border-foreground bg-accent" : "border-border bg-background hover:bg-muted"}`,
							children: [
								/* @__PURE__ */ (0, Y.jsx)("span", {
									className: `mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border ${a ? "border-foreground" : "border-muted-foreground/50"}`,
									children: a && /* @__PURE__ */ (0, Y.jsx)("span", { className: "size-2 rounded-full bg-foreground" })
								}),
								/* @__PURE__ */ (0, Y.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, Y.jsxs)("span", {
											className: "flex items-center gap-2 font-medium",
											children: [r.name, r.beta && /* @__PURE__ */ (0, Y.jsx)(im, {
												variant: "outline",
												className: "text-[10px]",
												children: "BETA"
											})]
										}),
										/* @__PURE__ */ (0, Y.jsx)("span", {
											className: "mt-1 block text-sm text-muted-foreground",
											children: r.description
										}),
										/* @__PURE__ */ (0, Y.jsxs)("span", {
											className: `connection ${i.state} mt-2 flex items-center gap-1.5 text-xs text-muted-foreground`,
											children: [/* @__PURE__ */ (0, Y.jsx)(jp, { className: `size-3 ${i.state === "online" ? "text-emerald-500" : i.state === "offline" ? "text-destructive" : ""}` }), i.label]
										})
									]
								}),
								a && /* @__PURE__ */ (0, Y.jsx)(Nf, { className: "size-4 text-foreground" })
							]
						}, r.id);
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)("p", {
					className: "rounded-md border bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground",
					children: "Servidores beta são operados por terceiros. O tráfego de navegação pode não passar pelo backend OrganizeOn."
				}),
				/* @__PURE__ */ (0, Y.jsxs)(Bm, { children: [/* @__PURE__ */ (0, Y.jsx)(sm, {
					variant: "outline",
					onClick: e.onClose,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, Y.jsx)(sm, {
					onClick: () => e.onApply(t),
					children: "Aplicar e reiniciar"
				})] })
			]
		})
	});
}
var r_ = {
	owner: "Owner",
	ultra_admin: "Ultra Admin",
	admin: "Administrador",
	user: "Usuário",
	guest: "Convidado"
};
function i_(e) {
	let [t, n] = (0, _.useState)(!1), [r, i] = (0, _.useState)(!1), a = [
		{
			id: "home",
			label: "Início",
			icon: tp
		},
		{
			id: "games",
			label: "Jogos",
			icon: $f
		},
		{
			id: "settings",
			label: "Configurações",
			icon: Tp
		},
		...e.guest ? [] : [{
			id: "data",
			label: "Dados",
			icon: zf
		}],
		{
			id: "proxy",
			label: "Servidor proxy",
			icon: jp
		},
		...e.canOpenDashboard ? [{
			id: "dashboard",
			label: "Dashboard",
			icon: kp
		}] : []
	];
	return /* @__PURE__ */ (0, Y.jsxs)(xg, {
		open: r,
		onOpenChange: i,
		children: [
			/* @__PURE__ */ (0, Y.jsx)(Sg, {
				render: /* @__PURE__ */ (0, Y.jsx)(sm, {
					variant: "outline",
					size: "icon",
					className: "pointer-events-auto fixed left-3 top-3 z-40",
					"aria-label": "Abrir menu"
				}),
				children: /* @__PURE__ */ (0, Y.jsx)(lp, {})
			}),
			/* @__PURE__ */ (0, Y.jsxs)(Tg, {
				side: "left",
				className: "w-[min(88vw,320px)] border-border bg-popover p-3",
				children: [
					/* @__PURE__ */ (0, Y.jsxs)(Eg, {
						className: "border-b px-2 pb-4 text-left",
						children: [/* @__PURE__ */ (0, Y.jsxs)(Dg, {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, Y.jsx)("img", {
								className: "size-7",
								src: "https://organizeon.com.br/d3/assets/organizeon-icon.png",
								alt: ""
							}), "OrganizeOn"]
						}), /* @__PURE__ */ (0, Y.jsx)(Og, { children: "Workspace" })]
					}),
					/* @__PURE__ */ (0, Y.jsx)("nav", {
						className: "grid gap-1",
						"aria-label": "Navegação da conta",
						children: a.map(({ id: t, label: n, icon: r }) => /* @__PURE__ */ (0, Y.jsxs)(sm, {
							variant: "ghost",
							className: "justify-start",
							onClick: () => {
								i(!1), e.onNavigate(t);
							},
							children: [
								/* @__PURE__ */ (0, Y.jsx)(r, { className: "size-4 text-muted-foreground" }),
								n,
								t === "proxy" && /* @__PURE__ */ (0, Y.jsx)(im, {
									variant: "secondary",
									className: "ml-auto",
									children: e.proxyLabel
								})
							]
						}, t))
					}),
					/* @__PURE__ */ (0, Y.jsx)("div", {
						className: "mt-auto border-t pt-3",
						children: /* @__PURE__ */ (0, Y.jsxs)(Kp, { children: [/* @__PURE__ */ (0, Y.jsxs)(qp, {
							render: /* @__PURE__ */ (0, Y.jsx)(sm, {
								variant: "ghost",
								className: "h-12 w-full justify-start",
								"aria-label": `Perfil de ${e.username}`
							}),
							children: [
								/* @__PURE__ */ (0, Y.jsx)(Vp, { className: "size-4" }),
								/* @__PURE__ */ (0, Y.jsxs)("span", {
									className: "grid flex-1 text-left",
									children: [/* @__PURE__ */ (0, Y.jsx)("span", {
										className: "text-sm",
										children: e.username
									}), /* @__PURE__ */ (0, Y.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: r_[e.role] || "Usuário"
									})]
								}),
								/* @__PURE__ */ (0, Y.jsx)(Lf, { className: "size-4" })
							]
						}), /* @__PURE__ */ (0, Y.jsxs)(Jp, {
							side: "top",
							align: "start",
							className: "w-64",
							children: [
								/* @__PURE__ */ (0, Y.jsx)(Yp, { children: /* @__PURE__ */ (0, Y.jsxs)(Xp, { children: [
									e.username,
									" · ",
									r_[e.role] || "Usuário"
								] }) }),
								/* @__PURE__ */ (0, Y.jsx)(Qp, {}),
								/* @__PURE__ */ (0, Y.jsxs)(Zp, {
									onClick: () => n(!0),
									className: "text-destructive",
									children: [/* @__PURE__ */ (0, Y.jsx)(ap, {}), "Sair da conta"]
								})
							]
						})] })
					})
				]
			}),
			/* @__PURE__ */ (0, Y.jsx)(Fm, {
				open: t,
				onOpenChange: n,
				children: /* @__PURE__ */ (0, Y.jsxs)(Rm, {
					className: "sm:max-w-sm",
					children: [/* @__PURE__ */ (0, Y.jsxs)(zm, { children: [/* @__PURE__ */ (0, Y.jsx)(Vm, { children: "Encerrar sessão?" }), /* @__PURE__ */ (0, Y.jsx)(Hm, { children: e.guest ? "Deseja sair do modo convidado?" : "Deseja realmente sair desta conta?" })] }), /* @__PURE__ */ (0, Y.jsxs)(Bm, { children: [/* @__PURE__ */ (0, Y.jsx)(sm, {
						variant: "outline",
						onClick: () => n(!1),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, Y.jsx)(sm, {
						variant: "destructive",
						onClick: () => e.onNavigate("logout"),
						children: "Sair"
					})] })]
				})
			})
		]
	});
}
function a_(e) {
	let { type: t, ...n } = e, r = (0, _.useMemo)(() => t === "login" ? /* @__PURE__ */ (0, Y.jsx)($g, { ...n }) : t === "data" ? /* @__PURE__ */ (0, Y.jsx)(t_, { ...n }) : t === "proxy" ? /* @__PURE__ */ (0, Y.jsx)(n_, { ...n }) : /* @__PURE__ */ (0, Y.jsx)(i_, { ...n }), [t, n]);
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: t === "account" ? "organizeon-ui organizeon-overlay-root dark text-foreground" : "organizeon-ui dark min-h-svh bg-background text-foreground",
		children: r
	});
}
// node_modules/@base-ui/react/tooltip/root/TooltipRootContext.mjs
var o_ = /*#__PURE__*/ _.createContext(void 0);
function s_(e) {
	let t = _.useContext(o_);
	if (t === void 0 && !e) throw Error(W(72));
	return t;
}
// node_modules/@base-ui/react/tooltip/store/TooltipStore.mjs
var c_ = {
	...as,
	disabled: (e) => e.disabled,
	instantType: (e) => e.instantType,
	isInstantPhase: (e) => e.isInstantPhase,
	trackCursorAxis: (e) => e.trackCursorAxis,
	disableHoverablePopup: (e) => e.disableHoverablePopup,
	lastOpenChangeReason: (e) => e.openChangeReason,
	closeOnClick: (e) => e.closeOnClick,
	appliedTriggerProps: (e, t) => t ? e.activeTriggerProps : void 0,
	closeDelay: (e) => e.closeDelay,
	adaptiveOrigin: (e) => e.adaptiveOrigin
}, l_ = class extends Xo {
	constructor(e, t, n) {
		let r = new Ao();
		super(u_(e, r, t, n), d_(r), c_);
	}
	setOpen = (e, t) => {
		wo(this, e, t, { extraState: { openChangeReason: t.reason } });
	};
	cancelPendingOpen(e) {
		this.state.floatingRootContext.dispatchOpenChange(!1, $n(_t, e));
	}
};
function u_(e, t, n, r = !1) {
	return {
		...$o(t, n, r),
		disabled: !1,
		instantType: void 0,
		isInstantPhase: !1,
		trackCursorAxis: "none",
		disableHoverablePopup: !1,
		openChangeReason: null,
		closeOnClick: !0,
		closeDelay: 0,
		adaptiveOrigin: void 0,
		...e
	};
}
function d_(e) {
	return {
		popupRef: /*#__PURE__*/ _.createRef(),
		onOpenChange: void 0,
		onOpenChangeComplete: void 0,
		triggerElements: e
	};
}
// node_modules/@base-ui/react/tooltip/root/TooltipRoot.mjs
var f_ = zo(function(e) {
	let { disabled: t = !1, defaultOpen: n = !1, open: r, disableHoverablePopup: i = !1, trackCursorAxis: a = "none", actionsRef: o, onOpenChange: s, onOpenChangeComplete: c, handle: l, triggerId: u, defaultTriggerId: d = null, children: f } = e, p = vo((e, t) => new l_({
		open: n,
		openProp: r,
		activeTriggerId: d,
		triggerIdProp: u
	}, e, t));
	p.useControlledProp("openProp", r), p.useControlledProp("triggerIdProp", u), p.useContextCallback("onOpenChange", s), p.useContextCallback("onOpenChangeComplete", c);
	let m = p.useState("open"), h = !t && m, g = p.useState("activeTriggerId"), v = p.useState("mounted"), y = p.useState("payload");
	p.useSyncedValues({
		trackCursorAxis: a,
		disableHoverablePopup: i,
		disabled: t
	}), Eo(p, { closeOnActiveTriggerUnmount: !0 });
	let { forceUnmount: b, transitionStatus: x } = Do(h, p), S = p.useState("isInstantPhase"), C = p.useState("instantType"), w = p.useState("lastOpenChangeReason"), T = _.useRef(null);
	J(() => {
		m && t && p.setOpen(!1, $n(At));
	}, [
		m,
		t,
		p
	]), J(() => {
		x === "ending" && w === "none" || x !== "ending" && S ? (C !== "delay" && (T.current = C), p.set("instantType", "delay")) : T.current !== null && (p.set("instantType", T.current), T.current = null);
	}, [
		x,
		S,
		w,
		C,
		p
	]), J(() => {
		h && (g ?? p.set("payload", void 0));
	}, [
		p,
		g,
		h
	]), _.useImperativeHandle(o, () => ({
		unmount: b,
		close: () => p.setOpen(!1, $n(Nt))
	}), [b, p]);
	let E = h || v || !t && a !== "none";
	return /*#__PURE__*/ (0, Y.jsxs)(o_.Provider, {
		value: p,
		children: [
			l && /*#__PURE__*/ (0, Y.jsx)(yo, {
				handle: l,
				store: p
			}),
			E && /*#__PURE__*/ (0, Y.jsx)(p_, {
				store: p,
				disabled: t,
				trackCursorAxis: a
			}),
			typeof f == "function" ? f({ payload: y }) : f
		]
	});
});
function p_({ store: e, disabled: t, trackCursorAxis: n }) {
	let r = e.useState("floatingRootContext"), i = po(r, {
		enabled: !t,
		referencePress: () => e.select("closeOnClick")
	}), a = lo(r, {
		enabled: !t && n !== "none",
		axis: n === "none" ? void 0 : n
	}), o = _.useMemo(() => ke(a.reference, i.reference), [a.reference, i.reference]);
	return Oo(e, {
		activeTriggerProps: o,
		inactiveTriggerProps: o,
		popupProps: i.floating ?? we
	}), null;
}
// node_modules/@base-ui/react/tooltip/provider/TooltipProviderContext.mjs
var m_ = /*#__PURE__*/ _.createContext(void 0);
function h_() {
	return _.useContext(m_);
}
// node_modules/@base-ui/react/tooltip/trigger/TooltipTrigger.mjs
var g_ = "data-base-ui-tooltip-trigger";
function __(e) {
	let t = Nr(e);
	return Kt(t) ? t : null;
}
var v_ = Bo(function(e, t) {
	let { render: n, className: r, style: i, handle: a, payload: o, disabled: s, delay: c, closeOnClick: l = !0, closeDelay: u, id: d, ...f } = e, p = s_(!0), m = os(a) ?? p;
	if (!m) throw Error(W(82));
	let h = Qn(d), g = m.useState("isTriggerActive", h), v = m.useState("isOpenedByTrigger", h), y = m.useState("floatingRootContext"), b = _.useRef(null), x = u ?? 0, { registerTrigger: S, isMountedByThisTrigger: C } = To(h, b, m, {
		payload: o,
		closeOnClick: l,
		closeDelay: x
	}), w = h_(), { activeIdRef: T, delayRef: E, isInstantPhase: D, hasProvider: O } = ri(y, { open: v }), k = ms(y);
	m.useSyncedValue("isInstantPhase", D);
	let A = m.useState("disabled"), j = s ?? A, M = oi(j), N = m.useState("trackCursorAxis"), P = m.useState("disableHoverablePopup"), F = _.useRef(!1), I = wr(), L = _.useRef(void 0);
	function R() {
		return O && T.current != null ? 0 : c ?? w ?? 600;
	}
	function z(e) {
		let t = b.current;
		if (!t || !e) return !1;
		let n = Mr(e, `[${g_}]`);
		return n !== null && n !== t && X(t, n);
	}
	function B(e) {
		let t = z(e);
		return F.current = t, t && (k.openChangeTimeout.clear(), k.restTimeout.clear(), k.restTimeoutPending = !1, I.clear()), t;
	}
	let V = _s(y, {
		enabled: !j,
		mouseOnly: !0,
		move: !1,
		handleClose: !P && N !== "both" ? Ns() : null,
		restMs: R,
		delay() {
			return u == null && O ? { close: Xr(E.current, "close") } : { close: x };
		},
		triggerElementRef: b,
		isActiveTrigger: g,
		isClosing: () => m.select("transitionStatus") === "ending",
		shouldOpen() {
			return !F.current;
		}
	}), ee = ls(y, { enabled: !j }).reference, H = (e) => {
		let t = F.current, n = __(e), r = B(n), i = b.current, a = i && n && X(i, n);
		if (r && m.select("open") && m.select("lastOpenChangeReason") === "trigger-hover") m.setOpen(!1, $n(vt, e));
		else if (t && !r && a && !M.current && !m.select("open") && i && kr(L.current)) {
			let t = () => {
				F.current || M.current || m.select("open") || m.setOpen(!0, $n(vt, e, i));
			}, n = R();
			n === 0 ? (I.clear(), t()) : I.start(n, t);
		}
	}, te = m.useState("appliedTriggerProps", C || N !== "none");
	return He("button", e, {
		state: { open: v },
		ref: [
			t,
			S,
			b
		],
		props: [
			V,
			ee,
			te,
			{
				onMouseOver(e) {
					H(e.nativeEvent);
				},
				onFocus(e) {
					z(__(e.nativeEvent)) && e.preventBaseUIHandler();
				},
				onMouseLeave() {
					F.current = !1, I.clear(), L.current = void 0;
				},
				onPointerEnter(e) {
					L.current = e.pointerType;
				},
				onPointerDown(e) {
					L.current = e.pointerType, m.set("closeOnClick", l), l && !m.select("open") && m.cancelPendingOpen(e.nativeEvent);
				},
				onClick(e) {
					l && !m.select("open") && m.cancelPendingOpen(e.nativeEvent);
				},
				id: h,
				[Br]: j ? "" : void 0,
				[g_]: j ? void 0 : ""
			},
			f
		],
		stateAttributesMapping: ut
	});
}), y_ = /*#__PURE__*/ _.createContext(void 0);
function b_() {
	let e = _.useContext(y_);
	if (e === void 0) throw Error(W(70));
	return e;
}
// node_modules/@base-ui/react/utils/FloatingPortalLite.mjs
var x_ = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { children: n, container: r, className: i, render: a, style: o, ...s } = e, { node: c, subtree: l } = Ba({
		container: r,
		ref: t,
		componentProps: e,
		elementProps: s
	});
	return !l && !c ? null : /*#__PURE__*/ (0, Y.jsxs)(_.Fragment, { children: [l, c && /*#__PURE__*/ v.createPortal(n, c)] });
}), S_ = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e;
	return s_().useState("mounted") || n ? /*#__PURE__*/ (0, Y.jsx)(y_.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, Y.jsx)(x_, {
			ref: t,
			...r
		})
	}) : null;
}), C_ = /*#__PURE__*/ _.createContext(void 0);
function w_() {
	let e = _.useContext(C_);
	if (e === void 0) throw Error(W(71));
	return e;
}
// node_modules/@base-ui/react/tooltip/positioner/TooltipPositioner.mjs
var T_ = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, anchor: i, positionMethod: a = "absolute", side: o = "top", align: s = "center", sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = Fa, style: g, ...v } = e, y = s_(), b = b_(), x = y.useState("open"), S = y.useState("mounted"), C = y.useState("trackCursorAxis"), w = y.useState("disableHoverablePopup"), T = y.useState("floatingRootContext"), E = y.useState("instantType"), D = y.useState("transitionStatus"), O = El({
		anchor: i,
		positionMethod: a,
		floatingRootContext: T,
		mounted: S,
		side: o,
		sideOffset: c,
		align: s,
		alignOffset: l,
		collisionBoundary: u,
		collisionPadding: d,
		sticky: p,
		arrowPadding: f,
		disableAnchorTracking: m,
		keepMounted: b,
		collisionAvoidance: h,
		adaptiveOrigin: y.useState("adaptiveOrigin")
	}), k = Rl(e, _.useMemo(() => ({
		open: x,
		side: O.side,
		align: O.align,
		anchorHidden: O.anchorHidden,
		instant: C === "none" ? E : "tracking-cursor"
	}), [
		x,
		O.side,
		O.align,
		O.anchorHidden,
		C,
		E
	]), {
		styles: O.positionerStyles,
		transitionStatus: D,
		props: v,
		refs: [t, y.useStateSetter("positionerElement")],
		hidden: !S,
		inert: !x || C === "both" || w
	});
	return /*#__PURE__*/ (0, Y.jsx)(C_.Provider, {
		value: O,
		children: k
	});
}), E_ = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = s_(), { side: s, align: c } = w_(), l = o.useState("open"), u = o.useState("instantType"), d = o.useState("transitionStatus"), f = o.useState("popupProps"), p = o.useState("floatingRootContext"), m = o.useState("disabled"), h = o.useState("closeDelay");
	mr({
		open: l,
		ref: o.context.popupRef,
		onComplete() {
			l && o.context.onOpenChangeComplete?.(!0);
		}
	}), hs(p, {
		enabled: !m,
		closeDelay: h
	});
	let g = o.useStateSetter("popupElement");
	return He("div", e, {
		state: {
			open: l,
			side: s,
			align: c,
			instant: u,
			transitionStatus: d
		},
		ref: [
			t,
			o.context.popupRef,
			g
		],
		props: [
			go,
			f,
			Xc(d),
			a
		],
		stateAttributesMapping: pt
	});
}), D_ = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = s_(), { arrowRef: s, side: c, align: l, arrowUncentered: u, arrowStyles: d } = w_();
	return He("div", e, {
		state: {
			open: o.useState("open"),
			side: c,
			align: l,
			uncentered: u,
			instant: o.useState("instantType")
		},
		ref: [t, s],
		props: [{
			style: d,
			"aria-hidden": !0
		}, a],
		stateAttributesMapping: ft
	});
}), O_ = function(e) {
	let { delay: t, closeDelay: n, timeout: r = 400 } = e, i = _.useMemo(() => ({
		open: t,
		close: n
	}), [t, n]);
	return /*#__PURE__*/ (0, Y.jsx)(m_.Provider, {
		value: t,
		children: /*#__PURE__*/ (0, Y.jsx)(ni, {
			delay: i,
			timeoutMs: r,
			children: e.children
		})
	});
};
// src/components/ui/tooltip.tsx
function k_({ delay: e = 0, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(O_, {
		"data-slot": "tooltip-provider",
		delay: e,
		...t
	});
}
function A_({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(f_, {
		"data-slot": "tooltip",
		...e
	});
}
function j_({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(v_, {
		"data-slot": "tooltip-trigger",
		...e
	});
}
function M_({ className: e, side: t = "top", sideOffset: n = 4, align: r = "center", alignOffset: i = 0, children: a, ...o }) {
	let s = hf();
	return /* @__PURE__ */ (0, Y.jsx)(S_, {
		container: s ?? void 0,
		children: /* @__PURE__ */ (0, Y.jsx)(T_, {
			align: r,
			alignOffset: i,
			side: t,
			sideOffset: n,
			className: "isolate z-50",
			children: /* @__PURE__ */ (0, Y.jsxs)(E_, {
				"data-slot": "tooltip-content",
				className: $("z-50 inline-flex w-fit max-w-xs origin-[var(--transform-origin)] items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...o,
				children: [a, /* @__PURE__ */ (0, Y.jsx)(D_, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })]
			})
		})
	});
}
// src/components/client/game-card.tsx
function N_({ game: e }) {
	let t = e.type === "flash" ? "Flash · Ruffle" : e.type === "external-download" ? "HTML offline" : e.type === "remote" ? "Multiplayer" : "HTML5";
	return /* @__PURE__ */ (0, Y.jsxs)(cm, {
		className: "h-full overflow-hidden rounded-lg border-border bg-card p-0 shadow-none transition-colors hover:border-zinc-600",
		children: [/* @__PURE__ */ (0, Y.jsx)("img", {
			className: "aspect-[16/10] w-full bg-muted object-cover",
			src: e.cover,
			alt: `Capa de ${e.name}`,
			loading: "lazy"
		}), /* @__PURE__ */ (0, Y.jsxs)(fm, {
			className: "grid gap-3 p-3.5 sm:p-4",
			children: [
				/* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "flex flex-wrap gap-1.5",
					children: [
						/* @__PURE__ */ (0, Y.jsxs)(im, {
							variant: "secondary",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, Y.jsx)($f, { className: "size-3" }), t]
						}),
						e.platforms.map((e) => /* @__PURE__ */ (0, Y.jsx)(im, {
							variant: "outline",
							children: e
						}, e)),
						e.mobileWarning && /* @__PURE__ */ (0, Y.jsx)(im, {
							variant: "outline",
							children: "Melhor com teclado"
						}),
						e.trending && /* @__PURE__ */ (0, Y.jsxs)(im, {
							variant: "outline",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, Y.jsx)(Zf, { className: "size-3" }), "Em alta"]
						})
					]
				}),
				/* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "flex min-w-0 items-start gap-2",
					children: [/* @__PURE__ */ (0, Y.jsx)("h2", {
						className: "min-w-0 flex-1 text-base font-semibold leading-5 tracking-tight",
						children: e.name
					}), /* @__PURE__ */ (0, Y.jsx)(im, {
						variant: "outline",
						className: "shrink-0 font-mono text-[10px]",
						children: e.sizeLabel
					})]
				}),
				/* @__PURE__ */ (0, Y.jsx)("p", {
					className: "min-h-10 text-xs leading-relaxed text-muted-foreground",
					children: e.description
				}),
				/* @__PURE__ */ (0, Y.jsx)("p", {
					className: "min-h-4 text-[10px] leading-relaxed text-muted-foreground",
					children: e.attribution
				}),
				/* @__PURE__ */ (0, Y.jsx)("div", {
					className: "game-stats flex min-h-4 flex-wrap gap-3 text-[10px] text-muted-foreground",
					"aria-label": "Estatísticas do jogo"
				}),
				/* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, Y.jsxs)(sm, {
							className: "action min-w-0 flex-1",
							type: "button",
							disabled: !0,
							children: [e.type === "external-download" ? /* @__PURE__ */ (0, Y.jsx)(Uf, {}) : e.type === "remote" ? /* @__PURE__ */ (0, Y.jsx)(_p, {}) : /* @__PURE__ */ (0, Y.jsx)(hp, {}), /* @__PURE__ */ (0, Y.jsx)("span", {
								"data-action-label": !0,
								children: "Verificando…"
							})]
						}),
						e.relayUrl && /* @__PURE__ */ (0, Y.jsx)(sm, {
							className: "credits",
							variant: "outline",
							type: "button",
							title: e.relaySupport || "Relay multiplayer",
							onClick: e.onRelay,
							children: "Copiar relay"
						}),
						e.hasCredits && /* @__PURE__ */ (0, Y.jsxs)(sm, {
							className: "credits",
							variant: "outline",
							type: "button",
							onClick: e.onCredits,
							children: [/* @__PURE__ */ (0, Y.jsx)(qf, {}), "Créditos"]
						}),
						/* @__PURE__ */ (0, Y.jsx)(sm, {
							className: "remove",
							variant: "destructive",
							size: "icon",
							type: "button",
							title: "Apagar jogo do cache",
							"aria-label": `Apagar ${e.name} do cache`,
							hidden: !0,
							onClick: e.onRemove,
							children: /* @__PURE__ */ (0, Y.jsx)(Fp, {})
						})
					]
				}),
				/* @__PURE__ */ (0, Y.jsx)("div", {
					className: "progress h-1.5 overflow-hidden rounded-full bg-muted",
					hidden: !0,
					children: /* @__PURE__ */ (0, Y.jsx)("span", { className: "block h-full w-0 rounded-full bg-primary transition-[width] duration-100" })
				})
			]
		})]
	});
}
// src/components/client/catalog-toolbar.tsx
function P_({ count: e, categories: t, onBack: n, onQueryChange: r, onFilterChange: i }) {
	let [a, o] = (0, _.useState)("all"), s = [
		{
			id: "all",
			label: "Todos",
			icon: $f
		},
		{
			id: "trending",
			label: "Em alta",
			icon: Zf
		},
		{
			id: "flash",
			label: "Flash",
			icon: Gp
		},
		{
			id: "pc",
			label: "PC",
			icon: null
		},
		{
			id: "mobile",
			label: "Celular",
			icon: Np
		},
		...t.map((e) => ({
			id: `category:${e}`,
			label: e,
			icon: null
		}))
	];
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "mx-auto grid w-full max-w-[1180px] gap-5 px-4 pb-5 pt-5 sm:px-6 sm:pt-7",
		children: [/* @__PURE__ */ (0, Y.jsxs)("header", {
			className: "flex min-w-0 flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, Y.jsx)(sm, {
					variant: "outline",
					size: "icon",
					"aria-label": "Voltar ao OrganizeOn",
					onClick: n,
					children: /* @__PURE__ */ (0, Y.jsx)(jf, {})
				}),
				/* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, Y.jsx)("h1", {
						className: "text-xl font-semibold tracking-tight",
						children: "Jogos"
					}), /* @__PURE__ */ (0, Y.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: e ? `${e.toLocaleString("pt-BR")} jogos · baixe uma vez e jogue do cache` : "Carregando catálogo…"
					})]
				}),
				/* @__PURE__ */ (0, Y.jsxs)("label", {
					className: "relative w-full sm:w-72",
					children: [/* @__PURE__ */ (0, Y.jsx)(Cp, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, Y.jsx)(oh, {
						className: "pl-9",
						type: "search",
						"aria-label": "Pesquisar jogos",
						placeholder: `Pesquisar em ${e || "…"} jogos`,
						onChange: (e) => r(e.target.value)
					})]
				})
			]
		}), /* @__PURE__ */ (0, Y.jsx)(Jg, {
			value: a,
			onValueChange: (e) => {
				let t = e || "all";
				o(t), i(t);
			},
			children: /* @__PURE__ */ (0, Y.jsx)(Xg, {
				"aria-label": "Filtrar jogos",
				className: "h-auto max-w-full justify-start gap-1 overflow-x-auto bg-transparent p-0",
				children: s.map(({ id: e, label: t, icon: n }) => /* @__PURE__ */ (0, Y.jsxs)(Zg, {
					value: e,
					className: "min-h-8 shrink-0 gap-1.5 border border-transparent px-2.5 text-xs data-[active]:border-border data-[active]:bg-muted data-[active]:text-foreground",
					children: [n && /* @__PURE__ */ (0, Y.jsx)(n, { className: "size-3.5" }), t]
				}, e))
			})
		})]
	});
}
// src/components/client/game-dialogs.tsx
function F_({ title: e, description: t, confirmLabel: n = "Continuar", onCancel: r, onConfirm: i }) {
	return /* @__PURE__ */ (0, Y.jsx)(Fm, {
		open: !0,
		onOpenChange: (e) => !e && r(),
		children: /* @__PURE__ */ (0, Y.jsxs)(Rm, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, Y.jsxs)(zm, { children: [
				/* @__PURE__ */ (0, Y.jsx)("div", {
					className: "grid size-9 place-items-center rounded-md border bg-muted",
					children: /* @__PURE__ */ (0, Y.jsx)(Lp, { className: "size-4 text-muted-foreground" })
				}),
				/* @__PURE__ */ (0, Y.jsx)(Vm, { children: e }),
				/* @__PURE__ */ (0, Y.jsx)(Hm, { children: t })
			] }), /* @__PURE__ */ (0, Y.jsxs)(Bm, { children: [/* @__PURE__ */ (0, Y.jsx)(sm, {
				variant: "outline",
				onClick: r,
				children: "Cancelar"
			}), /* @__PURE__ */ (0, Y.jsx)(sm, {
				onClick: i,
				children: n
			})] })]
		})
	});
}
function I_({ game: e, onClose: t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Fm, {
		open: !0,
		onOpenChange: (e) => !e && t(),
		children: /* @__PURE__ */ (0, Y.jsxs)(Rm, {
			className: "max-h-[85svh] overflow-y-auto sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, Y.jsxs)(zm, { children: [/* @__PURE__ */ (0, Y.jsxs)(Vm, { children: ["Créditos · ", e.name] }), /* @__PURE__ */ (0, Y.jsx)(Hm, { children: "Créditos e licença deste jogo." })] }),
				/* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "grid gap-2 text-sm text-muted-foreground",
					children: [
						e.attribution && /* @__PURE__ */ (0, Y.jsx)("p", { children: e.attribution }),
						e.copyright && /* @__PURE__ */ (0, Y.jsx)("p", { children: e.copyright }),
						e.license && /* @__PURE__ */ (0, Y.jsxs)("p", { children: ["Licença: ", e.license] }),
						e.source && /* @__PURE__ */ (0, Y.jsx)("p", { children: /* @__PURE__ */ (0, Y.jsx)("a", {
							className: "text-foreground underline underline-offset-4",
							href: e.source,
							target: "_blank",
							rel: "noopener noreferrer",
							children: e.sourceLabel || "Abrir código-fonte e licença"
						}) })
					]
				}),
				/* @__PURE__ */ (0, Y.jsx)(Bm, { children: /* @__PURE__ */ (0, Y.jsx)(sm, {
					onClick: t,
					children: "Fechar"
				}) })
			]
		})
	});
}
function L_({ name: e, definitions: t, selectedKeys: n, defaultKeys: r, isTetris: i, initialLeftHanded: a, onClose: o, onSave: s, onFullscreen: c }) {
	let [l, u] = (0, _.useState)(() => new Set(n)), [d, f] = (0, _.useState)(a);
	function p(e, t) {
		u((n) => {
			let r = new Set(n);
			return t ? r.add(e) : r.delete(e), r;
		});
	}
	function m() {
		u(new Set(r)), f(!1);
	}
	return /* @__PURE__ */ (0, Y.jsx)(Fm, {
		open: !0,
		onOpenChange: (e) => !e && o(),
		children: /* @__PURE__ */ (0, Y.jsxs)(Rm, {
			className: "max-h-[min(85svh,720px)] overflow-y-auto sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, Y.jsxs)(zm, { children: [/* @__PURE__ */ (0, Y.jsxs)(Vm, { children: ["Teclas · ", e] }), /* @__PURE__ */ (0, Y.jsx)(Hm, { children: "Ative as teclas usadas pelo jogo. A seleção fica salva neste aparelho." })] }),
				/* @__PURE__ */ (0, Y.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, Y.jsx)("legend", {
					className: "mb-2 text-sm font-medium",
					children: "Teclas disponíveis"
				}), /* @__PURE__ */ (0, Y.jsx)("div", {
					className: "grid grid-cols-3 gap-2 sm:grid-cols-4",
					children: t.map((e) => /* @__PURE__ */ (0, Y.jsxs)("label", {
						className: "flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm transition-colors hover:bg-muted",
						children: [/* @__PURE__ */ (0, Y.jsx)("input", {
							type: "checkbox",
							className: "size-4 accent-primary",
							checked: l.has(e.code) || l.has(e.label) || !!(e.key && l.has(e.key)),
							onChange: (t) => p(e.code, t.target.checked)
						}), /* @__PURE__ */ (0, Y.jsx)("span", { children: e.label })]
					}, e.code))
				})] }),
				i && /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "grid gap-2 border-t pt-3",
					children: [
						/* @__PURE__ */ (0, Y.jsx)("p", {
							className: "text-sm font-medium",
							children: "Opções do Tetris"
						}),
						/* @__PURE__ */ (0, Y.jsxs)("label", {
							className: "flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm",
							children: [/* @__PURE__ */ (0, Y.jsx)("input", {
								type: "checkbox",
								className: "size-4 accent-primary",
								checked: d,
								onChange: (e) => f(e.target.checked)
							}), /* @__PURE__ */ (0, Y.jsx)("span", { children: "Sou canhoto (ações à esquerda)" })]
						}),
						/* @__PURE__ */ (0, Y.jsxs)(sm, {
							variant: "outline",
							onClick: c,
							children: [/* @__PURE__ */ (0, Y.jsx)(sp, {}), "Tela cheia"]
						})
					]
				}),
				/* @__PURE__ */ (0, Y.jsxs)(Bm, {
					className: "flex-col-reverse sm:flex-row",
					children: [/* @__PURE__ */ (0, Y.jsxs)(sm, {
						type: "button",
						variant: "outline",
						onClick: m,
						children: [/* @__PURE__ */ (0, Y.jsx)(xp, {}), "Restaurar padrão"]
					}), /* @__PURE__ */ (0, Y.jsx)(sm, {
						type: "button",
						onClick: () => s([...l], d),
						children: "Salvar"
					})]
				})
			]
		})
	});
}
// src/components/client/preference-card.tsx
function R_({ title: e, description: t, label: n, value: r, options: i, applyLabel: a = "Aplicar", onApply: o }) {
	let [s, c] = (0, _.useState)(r), l = s !== r, u = i.find((e) => e.value === s)?.description;
	return /* @__PURE__ */ (0, Y.jsxs)(cm, {
		className: "w-full animate-ui-enter",
		children: [/* @__PURE__ */ (0, Y.jsxs)(lm, {
			className: "gap-1.5 pb-0 sm:flex sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, Y.jsx)(um, { children: e }), /* @__PURE__ */ (0, Y.jsx)(dm, {
					className: "mt-1 max-w-3xl leading-relaxed",
					children: t
				})]
			}), /* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "grid w-full gap-2 sm:w-auto sm:min-w-52 sm:grid-cols-[minmax(9rem,1fr)_auto]",
				children: [/* @__PURE__ */ (0, Y.jsxs)(mg, {
					value: s,
					onValueChange: (e) => e && c(e),
					children: [/* @__PURE__ */ (0, Y.jsx)(gg, {
						"aria-label": n,
						className: "h-9 w-full",
						children: /* @__PURE__ */ (0, Y.jsx)(hg, {})
					}), /* @__PURE__ */ (0, Y.jsx)(_g, { children: i.map((e) => /* @__PURE__ */ (0, Y.jsx)(vg, {
						value: e.value,
						children: e.label
					}, e.value)) })]
				}), /* @__PURE__ */ (0, Y.jsxs)(sm, {
					size: "sm",
					disabled: !l,
					onClick: () => o(s),
					children: [l ? /* @__PURE__ */ (0, Y.jsx)(Nf, { "data-icon": "inline-start" }) : null, a]
				})]
			})]
		}), u ? /* @__PURE__ */ (0, Y.jsx)(fm, {
			className: "pt-2 text-xs text-muted-foreground",
			children: u
		}) : null]
	});
}
// src/components/client/d2-login.tsx
function z_({ onSubmit: e }) {
	let [t, n] = (0, _.useState)(""), [r, i] = (0, _.useState)(""), [a, o] = (0, _.useState)(""), [s, c] = (0, _.useState)(!1);
	async function l(n) {
		n.preventDefault(), o(""), c(!0);
		try {
			await e(t, r), i("");
		} catch (e) {
			o(e instanceof Error ? e.message : "Não foi possível entrar.");
		} finally {
			c(!1);
		}
	}
	return /* @__PURE__ */ (0, Y.jsx)("main", {
		className: "grid min-h-svh place-items-center px-4 py-10",
		children: /* @__PURE__ */ (0, Y.jsxs)(cm, {
			className: "w-full max-w-[380px] border-border bg-card shadow-none animate-ui-enter",
			children: [
				/* @__PURE__ */ (0, Y.jsxs)(lm, {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, Y.jsx)("img", {
							className: "size-10 object-contain",
							src: "https://organizeon.com.br/d3/assets/organizeon-icon.png",
							alt: ""
						}), /* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsxs)("p", {
							className: "text-sm font-semibold",
							children: ["OrganizeOn ", /* @__PURE__ */ (0, Y.jsx)("span", {
								className: "font-normal text-muted-foreground",
								children: "D2"
							})]
						}), /* @__PURE__ */ (0, Y.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Painel de arquivos"
						})] })]
					}), /* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, Y.jsx)(um, {
							className: "text-xl",
							children: "Entrar no painel"
						}), /* @__PURE__ */ (0, Y.jsx)(dm, { children: "Autentique-se para acessar o conteúdo do Endpoint 2." })]
					})]
				}),
				/* @__PURE__ */ (0, Y.jsx)(fm, { children: /* @__PURE__ */ (0, Y.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: (e) => void l(e),
					children: [
						/* @__PURE__ */ (0, Y.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Usuário", /* @__PURE__ */ (0, Y.jsx)(oh, {
								autoComplete: "username",
								value: t,
								onChange: (e) => n(e.target.value),
								required: !0,
								disabled: s
							})]
						}),
						/* @__PURE__ */ (0, Y.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Senha", /* @__PURE__ */ (0, Y.jsx)(oh, {
								type: "password",
								autoComplete: "current-password",
								value: r,
								onChange: (e) => i(e.target.value),
								required: !0,
								disabled: s
							})]
						}),
						a && /* @__PURE__ */ (0, Y.jsx)("p", {
							role: "alert",
							className: "text-sm text-destructive",
							children: a
						}),
						/* @__PURE__ */ (0, Y.jsxs)(sm, {
							type: "submit",
							className: "h-10 w-full",
							disabled: s || !t || !r,
							children: [s && /* @__PURE__ */ (0, Y.jsx)(rp, { className: "animate-spin" }), s ? "Entrando…" : "Entrar"]
						})
					]
				}) }),
				/* @__PURE__ */ (0, Y.jsxs)(pm, {
					className: "gap-2 border-t border-border pt-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, Y.jsx)(Dp, { className: "size-4" }), "Acesse com sua conta OrganizeOn."]
				})
			]
		})
	});
}
// src/hooks/use-mobile.ts
var B_ = 768;
function V_() {
	let [e, t] = _.useState(void 0);
	return _.useEffect(() => {
		let e = window.matchMedia("(max-width: 767px)"), n = () => {
			t(window.innerWidth < B_);
		};
		return e.addEventListener("change", n), t(window.innerWidth < B_), () => e.removeEventListener("change", n);
	}, []), !!e;
}
// src/components/ui/separator.tsx
function H_({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(Du, {
		"data-slot": "separator",
		orientation: t,
		className: $("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", e),
		...n
	});
}
// src/components/ui/sidebar.tsx
var U_ = "sidebar_state", W_ = 604800, G_ = "16rem", K_ = "18rem", q_ = "3rem", J_ = "b", Y_ = _.createContext(null);
function X_() {
	let e = _.useContext(Y_);
	if (!e) throw Error("useSidebar must be used within a SidebarProvider.");
	return e;
}
function Z_({ defaultOpen: e = !0, open: t, onOpenChange: n, className: r, style: i, children: a, ...o }) {
	let s = V_(), [c, l] = _.useState(!1), [u, d] = _.useState(e), f = t ?? u, p = _.useCallback((e) => {
		let t = typeof e == "function" ? e(f) : e;
		n ? n(t) : d(t), document.cookie = `${U_}=${t}; path=/; max-age=${W_}`;
	}, [n, f]), m = _.useCallback(() => s ? l((e) => !e) : p((e) => !e), [
		s,
		p,
		l
	]);
	_.useEffect(() => {
		let e = (e) => {
			e.key === J_ && (e.metaKey || e.ctrlKey) && (e.preventDefault(), m());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [m]);
	let h = f ? "expanded" : "collapsed", g = _.useMemo(() => ({
		state: h,
		open: f,
		setOpen: p,
		isMobile: s,
		openMobile: c,
		setOpenMobile: l,
		toggleSidebar: m
	}), [
		h,
		f,
		p,
		s,
		c,
		l,
		m
	]);
	return /* @__PURE__ */ (0, Y.jsx)(Y_.Provider, {
		value: g,
		children: /* @__PURE__ */ (0, Y.jsx)("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": G_,
				"--sidebar-width-icon": q_,
				...i
			},
			className: $("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", r),
			...o,
			children: a
		})
	});
}
function Q_({ side: e = "left", variant: t = "sidebar", collapsible: n = "offcanvas", className: r, children: i, dir: a, ...o }) {
	let { isMobile: s, state: c, openMobile: l, setOpenMobile: u } = X_();
	return n === "none" ? /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "sidebar",
		className: $("flex h-full w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground", r),
		...o,
		children: i
	}) : s ? /* @__PURE__ */ (0, Y.jsx)(xg, {
		open: l,
		onOpenChange: u,
		...o,
		children: /* @__PURE__ */ (0, Y.jsxs)(Tg, {
			dir: a,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-[var(--sidebar-width)] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": K_ },
			side: e,
			children: [/* @__PURE__ */ (0, Y.jsxs)(Eg, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, Y.jsx)(Dg, { children: "Sidebar" }), /* @__PURE__ */ (0, Y.jsx)(Og, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "flex h-full w-full flex-col",
				children: i
			})]
		})
	}) : /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": c,
		"data-collapsible": c === "collapsed" ? n : "",
		"data-variant": t,
		"data-side": e,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ (0, Y.jsx)("div", {
			"data-slot": "sidebar-gap",
			className: $("relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon) + 1rem)]" : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]")
		}), /* @__PURE__ */ (0, Y.jsx)("div", {
			"data-slot": "sidebar-container",
			"data-side": e,
			className: $("fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", t === "floating" || t === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon) + 1rem + 2px)]" : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l", r),
			...o,
			children: /* @__PURE__ */ (0, Y.jsx)("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
				children: i
			})
		})]
	});
}
function $_({ className: e, onClick: t, ...n }) {
	let { toggleSidebar: r } = X_();
	return /* @__PURE__ */ (0, Y.jsxs)(sm, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon-sm",
		className: $(e),
		onClick: (e) => {
			t?.(e), r();
		},
		...n,
		children: [/* @__PURE__ */ (0, Y.jsx)(dp, {}), /* @__PURE__ */ (0, Y.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function ev({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("main", {
		"data-slot": "sidebar-inset",
		className: $("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", e),
		...t
	});
}
function tv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: $("flex flex-col gap-2 p-2", e),
		...t
	});
}
function nv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: $("flex flex-col gap-2 p-2", e),
		...t
	});
}
function rv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(H_, {
		"data-slot": "sidebar-separator",
		"data-sidebar": "separator",
		className: $("mx-2 w-auto bg-sidebar-border", e),
		...t
	});
}
function iv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: $("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", e),
		...t
	});
}
function av({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: $("relative flex w-full min-w-0 flex-col p-2", e),
		...t
	});
}
function ov({ className: e, render: t, ...n }) {
	return $p({
		defaultTagName: "div",
		props: ke({ className: $("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-none transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", e) }, n),
		render: t,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label"
		}
	});
}
function sv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: $("flex w-full min-w-0 flex-col gap-0", e),
		...t
	});
}
function cv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: $("group/menu-item relative", e),
		...t
	});
}
var lv = nm("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-none transition-[width,height,padding] group-has-[data-sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function uv({ render: e, isActive: t = !1, variant: n = "default", size: r = "default", tooltip: i, className: a, ...o }) {
	let { isMobile: s, state: c } = X_(), l = $p({
		defaultTagName: "button",
		props: ke({ className: $(lv({
			variant: n,
			size: r
		}), a) }, o),
		render: i ? /* @__PURE__ */ (0, Y.jsx)(j_, { render: e }) : e,
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size: r,
			active: t
		}
	});
	return i ? (typeof i == "string" && (i = { children: i }), /* @__PURE__ */ (0, Y.jsxs)(A_, { children: [l, /* @__PURE__ */ (0, Y.jsx)(M_, {
		side: "right",
		align: "center",
		hidden: c !== "collapsed" || s,
		...i
	})] })) : l;
}
// src/components/layout/rotating-icon.tsx
function dv({ icon: e, active: t }) {
	let [n, r] = (0, _.useState)(t);
	return (0, _.useEffect)(() => {
		t && r(!0);
	}, [t]), /* @__PURE__ */ (0, Y.jsx)(e, {
		"aria-hidden": "true",
		className: n ? "motion-safe:animate-spin" : void 0,
		onAnimationIteration: () => {
			t || r(!1);
		}
	});
}
// src/components/layout/service-shell.tsx
var fv = {
	owner: "Owner",
	ultra_admin: "Ultra admin",
	super_admin: "Super admin",
	admin: "Admin",
	user: "Usuário"
};
function pv() {
	let { setOpenMobile: e } = X_();
	return /* @__PURE__ */ (0, Y.jsx)(sv, { children: /* @__PURE__ */ (0, Y.jsx)(cv, { children: /* @__PURE__ */ (0, Y.jsxs)(uv, {
		isActive: !0,
		tooltip: "Meus arquivos",
		onClick: () => e(!1),
		children: [/* @__PURE__ */ (0, Y.jsx)(Yf, {}), /* @__PURE__ */ (0, Y.jsx)("span", { children: "Meus arquivos" })]
	}) }) });
}
function mv({ children: e, username: t, role: n, logout: r, refresh: i, refreshing: a }) {
	return /* @__PURE__ */ (0, Y.jsx)(k_, { children: /* @__PURE__ */ (0, Y.jsxs)(Z_, {
		defaultOpen: !0,
		children: [/* @__PURE__ */ (0, Y.jsxs)(Q_, {
			collapsible: "icon",
			children: [
				/* @__PURE__ */ (0, Y.jsx)(tv, {
					className: "px-3 pb-3 pt-4",
					children: /* @__PURE__ */ (0, Y.jsxs)("a", {
						href: "#/dashboard",
						className: "flex min-h-10 items-center gap-2.5 rounded-md px-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, Y.jsx)("img", {
							className: "size-7 shrink-0",
							src: "https://organizeon.com.br/d3/assets/organizeon-icon.png",
							alt: ""
						}), /* @__PURE__ */ (0, Y.jsxs)("span", {
							className: "truncate",
							children: ["OrganizeOn ", /* @__PURE__ */ (0, Y.jsx)("span", {
								className: "font-normal text-muted-foreground",
								children: "D2"
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)(rv, {}),
				/* @__PURE__ */ (0, Y.jsx)(iv, { children: /* @__PURE__ */ (0, Y.jsxs)(av, { children: [/* @__PURE__ */ (0, Y.jsx)(ov, { children: "Workspace" }), /* @__PURE__ */ (0, Y.jsx)(pv, {})] }) }),
				/* @__PURE__ */ (0, Y.jsx)(nv, {
					className: "px-2 pb-3",
					children: /* @__PURE__ */ (0, Y.jsxs)(Kp, { children: [/* @__PURE__ */ (0, Y.jsxs)(qp, {
						render: /* @__PURE__ */ (0, Y.jsx)(uv, {
							size: "lg",
							"aria-label": `Perfil de ${t}`
						}),
						children: [
							/* @__PURE__ */ (0, Y.jsx)(Vp, {}),
							/* @__PURE__ */ (0, Y.jsxs)("span", {
								className: "grid flex-1 text-left text-xs",
								children: [/* @__PURE__ */ (0, Y.jsx)("span", { children: t }), /* @__PURE__ */ (0, Y.jsx)("span", {
									className: "text-muted-foreground",
									children: fv[n] || n
								})]
							}),
							/* @__PURE__ */ (0, Y.jsx)(Lf, {})
						]
					}), /* @__PURE__ */ (0, Y.jsxs)(Jp, {
						side: "top",
						align: "start",
						className: "w-64",
						children: [
							/* @__PURE__ */ (0, Y.jsx)(Yp, { children: /* @__PURE__ */ (0, Y.jsxs)(Xp, { children: [
								t,
								" · ",
								fv[n] || n
							] }) }),
							/* @__PURE__ */ (0, Y.jsx)(Qp, {}),
							/* @__PURE__ */ (0, Y.jsxs)(Zp, {
								onClick: r,
								className: "text-destructive",
								children: [/* @__PURE__ */ (0, Y.jsx)(ap, {}), "Sair da conta"]
							})
						]
					})] })
				})
			]
		}), /* @__PURE__ */ (0, Y.jsxs)(ev, {
			className: "min-h-svh min-w-0",
			children: [/* @__PURE__ */ (0, Y.jsxs)("header", {
				className: "sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, Y.jsx)($_, { "aria-label": "Abrir ou recolher navegação" }),
					/* @__PURE__ */ (0, Y.jsx)("span", {
						className: "flex-1 text-sm font-medium",
						children: "Meus arquivos"
					}),
					/* @__PURE__ */ (0, Y.jsx)(sm, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Atualizar",
						disabled: a,
						onClick: i,
						children: /* @__PURE__ */ (0, Y.jsx)(dv, {
							icon: yp,
							active: a
						})
					})
				]
			}), /* @__PURE__ */ (0, Y.jsx)("main", {
				className: "mx-auto grid w-full max-w-5xl gap-5 px-4 py-6 sm:px-6 sm:py-8",
				children: e
			})]
		})]
	}) });
}
// src/components/client/d2-dashboard.tsx
function hv({ username: e, role: t, request: n, upload: r, logout: i }) {
	let [a, o] = (0, _.useState)([]), [s, c] = (0, _.useState)(null), [l, u] = (0, _.useState)(null), [d, f] = (0, _.useState)(""), [p, m] = (0, _.useState)(!1), [h, g] = (0, _.useState)(null), [v, y] = (0, _.useState)(null);
	async function b() {
		m(!0);
		try {
			let e = await n("/files");
			o(e.files);
		} catch (e) {
			f(e instanceof Error ? e.message : "Falha ao carregar arquivos.");
		} finally {
			m(!1);
		}
	}
	(0, _.useEffect)(() => {
		b();
	}, []);
	async function x() {
		if (s) {
			f(""), u(0);
			try {
				await r(s, u), c(null), f("Arquivo enviado."), await b();
			} catch (e) {
				f(e instanceof Error ? e.message : "Falha no envio.");
			} finally {
				u(null);
			}
		}
	}
	async function S(e) {
		try {
			let t = await n(`/files/${encodeURIComponent(e.id)}`);
			g({
				id: e.id,
				name: t.file.name,
				content: t.content || ""
			});
		} catch (e) {
			f(e instanceof Error ? e.message : "Falha ao abrir arquivo.");
		}
	}
	async function C(e) {
		if (e.preventDefault(), h) try {
			await n(h.id ? `/files/${encodeURIComponent(h.id)}` : "/files", {
				method: h.id ? "PUT" : "POST",
				headers: {
					"Content-Type": "text/plain;charset=utf-8",
					...h.id ? {} : { "X-File-Name": encodeURIComponent(h.name.trim() || "script.txt") }
				},
				body: h.content
			}), g(null), f("Texto salvo."), await b();
		} catch (e) {
			f(e instanceof Error ? e.message : "Falha ao salvar.");
		}
	}
	async function w(e) {
		try {
			await n(`/files/${encodeURIComponent(e.id)}`, { method: "DELETE" }), y(null), await b();
		} catch (e) {
			f(e instanceof Error ? e.message : "Falha ao apagar.");
		}
	}
	async function T(e) {
		try {
			await navigator.clipboard.writeText(`https://organizeon.com.br/d2/files/${encodeURIComponent(e.name)}`), f("Link público copiado.");
		} catch {
			f("Não foi possível copiar o link.");
		}
	}
	return /* @__PURE__ */ (0, Y.jsxs)(mv, {
		username: e,
		role: t,
		logout: i,
		refresh: () => void b(),
		refreshing: p,
		children: [
			/* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Meus arquivos"
			}), /* @__PURE__ */ (0, Y.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Gerencie arquivos e textos da sua conta."
			})] }),
			/* @__PURE__ */ (0, Y.jsxs)(cm, { children: [/* @__PURE__ */ (0, Y.jsxs)(lm, { children: [/* @__PURE__ */ (0, Y.jsx)(um, { children: "Adicionar arquivo" }), /* @__PURE__ */ (0, Y.jsx)(dm, { children: "Selecione um arquivo ou crie um texto." })] }), /* @__PURE__ */ (0, Y.jsxs)(fm, {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, Y.jsx)(oh, {
						type: "file",
						onChange: (e) => c(e.target.files?.[0] ?? null)
					}),
					/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, Y.jsxs)(sm, {
							disabled: !s || l !== null,
							onClick: () => void x(),
							children: [/* @__PURE__ */ (0, Y.jsx)(zp, {}), "Enviar arquivo"]
						}), /* @__PURE__ */ (0, Y.jsxs)(sm, {
							variant: "outline",
							onClick: () => g({
								name: "script.txt",
								content: ""
							}),
							children: [/* @__PURE__ */ (0, Y.jsx)(Gf, {}), "Novo texto"]
						})]
					}),
					l !== null && /* @__PURE__ */ (0, Y.jsx)("progress", {
						className: "w-full",
						value: l,
						max: 100,
						"aria-label": "Progresso do upload"
					})
				]
			})] }),
			d && /* @__PURE__ */ (0, Y.jsx)("p", {
				role: "status",
				className: "text-sm text-muted-foreground",
				children: d
			}),
			h && /* @__PURE__ */ (0, Y.jsxs)(cm, { children: [/* @__PURE__ */ (0, Y.jsx)(lm, { children: /* @__PURE__ */ (0, Y.jsx)(um, { children: h.id ? "Editar texto" : "Novo texto" }) }), /* @__PURE__ */ (0, Y.jsx)(fm, { children: /* @__PURE__ */ (0, Y.jsxs)("form", {
				className: "grid gap-3",
				onSubmit: (e) => void C(e),
				children: [
					/* @__PURE__ */ (0, Y.jsx)(oh, {
						"aria-label": "Nome do arquivo",
						value: h.name,
						disabled: !!h.id,
						onChange: (e) => g({
							...h,
							name: e.target.value
						})
					}),
					/* @__PURE__ */ (0, Y.jsx)("textarea", {
						"aria-label": "Conteúdo",
						className: "min-h-52 w-full rounded-lg border bg-background p-3 font-mono text-sm",
						value: h.content,
						onChange: (e) => g({
							...h,
							content: e.target.value
						})
					}),
					/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, Y.jsx)(sm, {
							type: "submit",
							children: "Salvar texto"
						}), /* @__PURE__ */ (0, Y.jsx)(sm, {
							type: "button",
							variant: "outline",
							onClick: () => g(null),
							children: "Fechar"
						})]
					})
				]
			}) })] }),
			/* @__PURE__ */ (0, Y.jsxs)(cm, { children: [/* @__PURE__ */ (0, Y.jsxs)(lm, { children: [/* @__PURE__ */ (0, Y.jsx)(um, { children: "Arquivos" }), /* @__PURE__ */ (0, Y.jsx)(dm, { children: a.length ? `${a.length} arquivo(s)` : "Nenhum arquivo ainda." })] }), /* @__PURE__ */ (0, Y.jsx)(fm, {
				className: "grid gap-3",
				children: a.map((e) => /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "grid gap-3 border-t pt-3",
					children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, Y.jsx)("p", {
							className: "break-all font-medium",
							children: e.name
						}), /* @__PURE__ */ (0, Y.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								(e.size / 1024).toFixed(1),
								" KB · ",
								new Date(e.updatedAt).toLocaleString("pt-BR")
							]
						})]
					}), /* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							e.contentType?.startsWith("text/") && /* @__PURE__ */ (0, Y.jsxs)(sm, {
								variant: "outline",
								size: "sm",
								onClick: () => void S(e),
								children: [/* @__PURE__ */ (0, Y.jsx)(pp, {}), "Editar"]
							}),
							/* @__PURE__ */ (0, Y.jsxs)(sm, {
								variant: "outline",
								size: "sm",
								onClick: () => void T(e),
								children: [/* @__PURE__ */ (0, Y.jsx)(Vf, {}), "Copiar link"]
							}),
							/* @__PURE__ */ (0, Y.jsxs)(sm, {
								variant: "destructive",
								size: "sm",
								onClick: () => y(e),
								children: [/* @__PURE__ */ (0, Y.jsx)(Fp, {}), "Apagar"]
							})
						]
					})]
				}, e.id))
			})] }),
			/* @__PURE__ */ (0, Y.jsx)(Fm, {
				open: !!v,
				onOpenChange: (e) => {
					e || y(null);
				},
				children: /* @__PURE__ */ (0, Y.jsxs)(Rm, { children: [/* @__PURE__ */ (0, Y.jsxs)(zm, { children: [/* @__PURE__ */ (0, Y.jsx)(Vm, { children: "Apagar arquivo?" }), /* @__PURE__ */ (0, Y.jsx)(Hm, { children: v?.name })] }), /* @__PURE__ */ (0, Y.jsxs)(Bm, { children: [/* @__PURE__ */ (0, Y.jsx)(sm, {
					variant: "outline",
					onClick: () => y(null),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, Y.jsx)(sm, {
					variant: "destructive",
					onClick: () => {
						v && w(v);
					},
					children: "Apagar"
				})] })] })
			})
		]
	});
}
// src/client/bridge.tsx
var gv = /* @__PURE__ */ new WeakMap(), _v = /* @__PURE__ */ new WeakMap(), vv = /* @__PURE__ */ new WeakMap();
function yv(e) {
	if (document.querySelector("link[data-organizeon-ui=\"client\"]")) return;
	let t = document.createElement("link");
	t.rel = "stylesheet", t.href = e, t.dataset.organizeonUi = "client", document.head.append(t);
}
function bv(e, t, n) {
	_v.get(e)?.unmount(), yv(n);
	let r = (0, g.createRoot)(e);
	(0, v.flushSync)(() => r.render(/* @__PURE__ */ (0, Y.jsx)("div", {
		className: "organizeon-ui dark min-h-full",
		children: /* @__PURE__ */ (0, Y.jsx)(N_, { game: t })
	}))), _v.set(e, r);
}
function xv(e) {
	_v.get(e)?.unmount(), _v.delete(e);
}
function Sv(e, t, n) {
	yv(n);
	let r = (0, g.createRoot)(e), i = (e) => (0, v.flushSync)(() => r.render(/* @__PURE__ */ (0, Y.jsx)("div", {
		className: "organizeon-ui dark",
		children: /* @__PURE__ */ (0, Y.jsx)(P_, { ...e })
	})));
	return i(t), {
		update: (e, n) => i({
			...t,
			count: e,
			categories: n
		}),
		unmount: () => r.unmount()
	};
}
function Cv(e, t, n) {
	vv.get(e)?.unmount(), yv(n);
	let r = (0, g.createRoot)(e);
	(0, v.flushSync)(() => r.render(/* @__PURE__ */ (0, Y.jsx)("div", {
		className: "organizeon-ui organizeon-inline-ui dark",
		children: /* @__PURE__ */ (0, Y.jsx)(R_, { ...t })
	}))), vv.set(e, r);
}
function wv(e) {
	vv.get(e)?.unmount(), vv.delete(e);
}
function Tv(e, t, n) {
	yv(n);
	let r = (0, g.createRoot)(e);
	return (0, v.flushSync)(() => r.render(/* @__PURE__ */ (0, Y.jsx)("div", {
		className: "organizeon-ui dark",
		children: /* @__PURE__ */ (0, Y.jsx)(mf, {
			container: e,
			children: t
		})
	}))), () => r.unmount();
}
function Ev(e, t, n, r) {
	return Tv(e, /* @__PURE__ */ (0, Y.jsx)(I_, {
		game: t,
		onClose: n
	}), r);
}
function Dv(e, t, n) {
	return Tv(e, /* @__PURE__ */ (0, Y.jsx)(L_, { ...t }), n);
}
function Ov(e, t, n = "Confirmar ação", r = "Continuar") {
	return new Promise((i) => {
		let a = document.createElement("div");
		a.className = "organizeon-ui dark", document.body.append(a), yv(t);
		let o = (0, g.createRoot)(a), s = !1, c = (e) => {
			s || (s = !0, o.unmount(), a.remove(), i(e));
		};
		(0, v.flushSync)(() => o.render(/* @__PURE__ */ (0, Y.jsx)(mf, {
			container: a,
			children: /* @__PURE__ */ (0, Y.jsx)(F_, {
				title: n,
				description: e,
				confirmLabel: r,
				onCancel: () => c(!1),
				onConfirm: () => c(!0)
			})
		})));
	});
}
function kv(e, t, n) {
	gv.get(e)?.root.unmount();
	let r = e.shadowRoot ?? e.attachShadow({ mode: "open" });
	r.replaceChildren();
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = n, r.append(i);
	let a = document.createElement("div");
	a.className = t.type === "account" ? "organizeon-ui organizeon-overlay-root dark" : "organizeon-ui dark", r.append(a);
	let o = (0, g.createRoot)(a);
	return o.render(/* @__PURE__ */ (0, Y.jsx)(mf, {
		container: r,
		children: /* @__PURE__ */ (0, Y.jsx)(k_, { children: /* @__PURE__ */ (0, Y.jsx)(a_, { ...t }) })
	})), gv.set(e, {
		root: o,
		shadow: r,
		container: a
	}), () => {
		let t = gv.get(e);
		t && (t.root.unmount(), t.shadow.replaceChildren(), gv.delete(e));
	};
}
function Av(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui organizeon-overlay-root dark", r.append(i, a);
	let o = (0, g.createRoot)(a);
	return (0, v.flushSync)(() => o.render(/* @__PURE__ */ (0, Y.jsx)(mf, {
		container: a,
		children: /* @__PURE__ */ (0, Y.jsx)(a_, { ...t })
	}))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function jv(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui dark", r.append(i, a);
	let o = (0, g.createRoot)(a);
	return (0, v.flushSync)(() => o.render(/* @__PURE__ */ (0, Y.jsx)(z_, { onSubmit: t }))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function Mv(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui dark", r.append(i, a);
	let o = (0, g.createRoot)(a);
	return (0, v.flushSync)(() => o.render(/* @__PURE__ */ (0, Y.jsx)(mf, {
		container: a,
		children: /* @__PURE__ */ (0, Y.jsx)(hv, { ...t })
	}))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function Nv(e, t) {
	gv.get(e)?.root.unmount();
	let n = e.shadowRoot ?? e.attachShadow({ mode: "open" });
	n.replaceChildren();
	let r = document.createElement("link");
	r.rel = "stylesheet", r.href = t, n.append(r);
	let i = document.createElement("div");
	i.className = "organizeon-ui organizeon-overlay-root dark", n.append(i);
	let a = (0, g.createRoot)(i);
	return a.render(/* @__PURE__ */ (0, Y.jsx)(mf, {
		container: n,
		children: /* @__PURE__ */ (0, Y.jsx)(se, {
			position: "bottom-right",
			theme: "dark",
			closeButton: !0
		})
	})), gv.set(e, {
		root: a,
		shadow: n,
		container: i
	}), () => {
		a.unmount(), n.replaceChildren(), gv.delete(e);
	};
}
function Pv(e, t = "info", n) {
	F[t](e, n ? { id: n } : void 0);
}
function Fv(e) {
	F.dismiss(e);
}
export { Ov as confirmClientAction, Fv as dismissClientToast, Sv as mountCatalogToolbar, Tv as mountClientDialog, kv as mountClientSurface, Nv as mountClientToaster, Mv as mountD2Dashboard, jv as mountD2Login, bv as mountGameCard, Dv as mountGameControlSettingsDialog, Ev as mountGameCreditsDialog, Av as mountNavigation, Cv as mountPreferenceCard, Pv as showClientToast, xv as unmountGameCard, wv as unmountPreferenceCard };
