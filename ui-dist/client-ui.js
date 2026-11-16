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
	var ee = {
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
	e.Activity = f, e.Children = ee, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = x, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = T, e.__COMPILER_RUNTIME = {
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
	var D = Object.assign, O = Symbol.for("react.element"), k = Symbol.for("react.transitional.element"), A = Symbol.for("react.portal"), j = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), P = Symbol.for("react.consumer"), F = Symbol.for("react.context"), I = Symbol.for("react.forward_ref"), L = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), z = Symbol.for("react.memo"), ee = Symbol.for("react.lazy"), B = Symbol.for("react.activity"), te = Symbol.for("react.legacy_hidden"), V = Symbol.for("react.memo_cache_sentinel"), ne = Symbol.for("react.view_transition"), re = Symbol.for("react.recoverable"), ie = Symbol.iterator;
	function ae(e) {
		return typeof e != "object" || !e ? null : (e = ie && e[ie] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var oe = Symbol.for("react.client.reference");
	function se(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === oe ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case j: return "Fragment";
			case N: return "Profiler";
			case M: return "StrictMode";
			case L: return "Suspense";
			case R: return "SuspenseList";
			case B: return "Activity";
			case ne: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case A: return "Portal";
			case F: return e.displayName || "Context";
			case P: return (e._context.displayName || "Context") + ".Consumer";
			case I:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case z: return t = e.displayName || null, t === null ? se(e.type) || "Memo" : t;
			case ee:
				t = e._payload, e = e._init;
				try {
					return se(e(t));
				} catch {}
		}
		return null;
	}
	var ce = Array.isArray, H = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, le = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ue = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, de = [], fe = -1;
	function pe(e) {
		return { current: e };
	}
	function me(e) {
		0 > fe || (e.current = de[fe], de[fe] = null, fe--);
	}
	function U(e, t) {
		fe++, de[fe] = e.current, e.current = t;
	}
	var he = pe(null), ge = pe(null), _e = pe(null), ve = pe(null);
	function ye(e, t) {
		switch (U(_e, t), U(ge, e), U(he, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? mp(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = mp(t), e = hp(t, e);
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
		me(he), U(he, e);
	}
	function W() {
		me(he), me(ge), me(_e);
	}
	function be(e) {
		var t = e.memoizedState;
		t !== null && (sh._currentValue = t.memoizedState, U(ve, e)), t = he.current;
		var n = hp(t, e.type);
		t !== n && (U(ge, e), U(he, n));
	}
	function xe(e) {
		ge.current === e && (me(he), me(ge)), ve.current === e && (me(ve), sh._currentValue = ue);
	}
	var Se, Ce;
	function we(e) {
		if (Se === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Se = t && t[1] || "", Ce = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Se + e + Ce;
	}
	var Te = !1;
	function Ee(e, t) {
		if (!e || Te) return "";
		Te = !0;
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
			Te = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? we(n) : "";
	}
	function De(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return we(e.type);
			case 16: return we("Lazy");
			case 13: return e.child !== t && t !== null ? we("Suspense Fallback") : we("Suspense");
			case 19: return we("SuspenseList");
			case 0:
			case 15: return Ee(e.type, !1);
			case 11: return Ee(e.type.render, !1);
			case 1: return Ee(e.type, !0);
			case 31: return we("Activity");
			case 30: return we("ViewTransition");
			default: return "";
		}
	}
	function Oe(e) {
		try {
			var t = "", n = null;
			do
				t += De(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var ke = Object.prototype.hasOwnProperty, Ae = t.unstable_scheduleCallback, je = t.unstable_cancelCallback, Me = t.unstable_shouldYield, Ne = t.unstable_requestPaint, Pe = t.unstable_now, Fe = t.unstable_getCurrentPriorityLevel, Ie = t.unstable_ImmediatePriority, Le = t.unstable_UserBlockingPriority, Re = t.unstable_NormalPriority, ze = t.unstable_LowPriority, Be = t.unstable_IdlePriority, Ve = t.log, He = t.unstable_setDisableYieldValue, Ue = null, We = null;
	function Ge(e) {
		if (typeof Ve == "function" && He(e), We && typeof We.setStrictMode == "function") try {
			We.setStrictMode(Ue, e);
		} catch {}
	}
	var Ke = Math.clz32 ? Math.clz32 : Ye, qe = Math.log, Je = Math.LN2;
	function Ye(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (qe(e) / Je | 0) | 0;
	}
	var Xe = 256, Ze = 262144, Qe = 4194304;
	function $e(e) {
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
	function et(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = $e(n))) : i = $e(o) : i = $e(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = $e(n))) : i = $e(o)) : i = $e(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function tt(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function nt(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - Ke(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function rt(e, t) {
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
	function it() {
		var e = Qe;
		return Qe <<= 1, !(Qe & 62914560) && (Qe = 4194304), e;
	}
	function at(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function ot(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function st(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ke(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && ct(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function ct(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ke(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function lt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ke(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function ut(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : dt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function dt(e) {
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
	function ft(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function pt() {
		var e = le.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ch(e.type)) : e;
	}
	function mt(e, t) {
		var n = le.p;
		try {
			return le.p = e, t();
		} finally {
			le.p = n;
		}
	}
	var ht = Math.random().toString(36).slice(2), gt = "__reactFiber$" + ht, _t = "__reactProps$" + ht, vt = "__reactContainer$" + ht, yt = "__reactEvents$" + ht, bt = "__reactListeners$" + ht, xt = "__reactHandles$" + ht, St = "__reactResources$" + ht, Ct = "__reactMarker$" + ht, wt = "__reactLoad$" + ht;
	function Tt(e) {
		delete e[gt], delete e[_t], delete e[bt], delete e[xt];
	}
	function Et(e) {
		var t;
		if (t = e[gt]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[vt] || n[gt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = pm(e); e !== null;) {
					if (n = e[gt]) return n;
					e = pm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Dt(e) {
		if (e = e[gt] || e[vt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Ot(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function kt(e) {
		var t = e[St];
		return t ||= e[St] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function At(e) {
		e[Ct] = !0;
	}
	function jt(e) {
		e[wt] = void 0;
	}
	var Mt = /* @__PURE__ */ new Set(), Nt = {};
	function Pt(e, t) {
		Ft(e, t), Ft(e + "Capture", t);
	}
	function Ft(e, t) {
		for (Nt[e] = t, e = 0; e < t.length; e++) Mt.add(t[e]);
	}
	var It = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Lt = {}, Rt = {};
	function zt(e) {
		return ke.call(Rt, e) ? !0 : ke.call(Lt, e) ? !1 : It.test(e) ? Rt[e] = !0 : (Lt[e] = !0, !1);
	}
	var Bt = !1;
	function Vt() {
		var e = Bt;
		return Bt = !1, e;
	}
	function Ht(e, t, n) {
		if (zt(t)) {
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
	function Ut(e, t, n) {
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
	function Wt(e, t, n, r) {
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
	function Gt(e) {
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
	function Kt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function qt(e, t, n) {
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
	function Jt(e) {
		if (!e._valueTracker) {
			var t = Kt(e) ? "checked" : "value";
			e._valueTracker = qt(e, t, "" + e[t]);
		}
	}
	function Yt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Kt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var Xt = /[\n"\\]/g;
	function G(e) {
		return e.replace(Xt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Zt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Gt(t)) : e.value !== "" + Gt(t) && (e.value = "" + Gt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : $t(e, Gt(n)) : o === "number" && e.value == t ? $t(e, Gt(e.value)) : $t(e, Gt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Gt(s) : e.removeAttribute("name");
	}
	function Qt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Jt(e);
				return;
			}
			n = n == null ? "" : "" + Gt(n), t = t == null ? n : "" + Gt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Jt(e);
	}
	function $t(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function en(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Gt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function tn(e, t, n) {
		t != null && (t = "" + Gt(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + Gt(n);
	}
	function nn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ce(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Gt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Jt(e);
	}
	function rn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var an = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function on(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || an.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function sn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", Bt = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (on(e, a, r), Bt = !0);
		} else for (var o in t) t.hasOwnProperty(o) && on(e, o, t[o]);
	}
	function cn(e) {
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
	var ln = /* @__PURE__ */ new Map([
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
	]), un = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function dn(e) {
		return un.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function fn() {}
	var pn = null;
	function mn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var hn = null, gn = null;
	function _n(e) {
		var t = Dt(e);
		if (t && (e = t.stateNode)) {
			var n = e[_t] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Zt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + G("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[_t] || null;
								if (!a) throw Error(i(90));
								Zt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Yt(r);
					}
					break a;
				case "textarea":
					tn(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && en(e, !!n.multiple, t, !1);
			}
		}
	}
	var vn = !1;
	function yn(e, t, n) {
		if (vn) return e(t, n);
		vn = !0;
		try {
			return e(t);
		} finally {
			if (vn = !1, (hn !== null || gn !== null) && (Bd(), hn && (t = hn, e = gn, gn = hn = null, _n(t), e))) for (t = 0; t < e.length; t++) _n(e[t]);
		}
	}
	function bn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[_t] || null;
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
	var xn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Sn = !1;
	if (xn) try {
		var Cn = {};
		Object.defineProperty(Cn, "passive", { get: function() {
			Sn = !0;
		} }), window.addEventListener("test", Cn, Cn), window.removeEventListener("test", Cn, Cn);
	} catch {
		Sn = !1;
	}
	var wn = null, Tn = null, En = null;
	function Dn() {
		if (En) return En;
		var e, t = Tn, n = t.length, r, i = "value" in wn ? wn.value : wn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return En = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function On(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function kn() {
		return !0;
	}
	function An() {
		return !1;
	}
	function jn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? kn : An, this.isPropagationStopped = An, this;
		}
		return D(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = kn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = kn);
			},
			persist: function() {},
			isPersistent: kn
		}), t;
	}
	var Mn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Nn = jn(Mn), Pn = D({}, Mn, {
		view: 0,
		detail: 0
	}), Fn = jn(Pn), In, Ln, Rn, zn = D({}, Pn, {
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
		getModifierState: Xn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Rn && (Rn && e.type === "mousemove" ? (In = e.screenX - Rn.screenX, Ln = e.screenY - Rn.screenY) : Ln = In = 0, Rn = e), In);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Ln;
		}
	}), Bn = jn(zn), Vn = jn(D({}, zn, { dataTransfer: 0 })), Hn = jn(D({}, Pn, { relatedTarget: 0 })), Un = jn(D({}, Mn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Wn = jn(D({}, Mn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Gn = jn(D({}, Mn, { data: 0 })), Kn = {
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
	}, qn = {
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
	}, Jn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Yn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Jn[e]) ? !!t[e] : !1;
	}
	function Xn() {
		return Yn;
	}
	var Zn = jn(D({}, Pn, {
		key: function(e) {
			if (e.key) {
				var t = Kn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = On(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? qn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Xn,
		charCode: function(e) {
			return e.type === "keypress" ? On(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? On(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Qn = jn(D({}, zn, {
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
	})), $n = jn(D({}, Mn, { submitter: 0 })), er = jn(D({}, Pn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Xn
	})), tr = jn(D({}, Mn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), nr = jn(D({}, zn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), rr = jn(D({}, Mn, {
		newState: 0,
		oldState: 0,
		source: 0
	})), ir = [
		9,
		13,
		27,
		32
	], ar = xn && "CompositionEvent" in window, or = null;
	xn && "documentMode" in document && (or = document.documentMode);
	var sr = xn && "TextEvent" in window && !or, cr = xn && (!ar || or && 8 < or && 11 >= or), lr = " ", ur = !1;
	function dr(e, t) {
		switch (e) {
			case "keyup": return ir.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function fr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var pr = !1;
	function mr(e, t) {
		switch (e) {
			case "compositionend": return fr(t);
			case "keypress": return t.which === 32 ? (ur = !0, lr) : null;
			case "textInput": return e = t.data, e === lr && ur ? null : e;
			default: return null;
		}
	}
	function hr(e, t) {
		if (pr) return e === "compositionend" || !ar && dr(e, t) ? (e = Dn(), En = Tn = wn = null, pr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return cr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var gr = {
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
	function _r(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!gr[e.type] : t === "textarea";
	}
	function vr(e, t, n, r) {
		hn ? gn ? gn.push(r) : gn = [r] : hn = r, t = Zf(t, "onChange"), 0 < t.length && (n = new Nn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var yr = null, br = null;
	function xr(e) {
		Uf(e, 0);
	}
	function Sr(e) {
		if (Yt(Ot(e))) return e;
	}
	function Cr(e, t) {
		if (e === "change") return t;
	}
	var wr = !1;
	if (xn) {
		var Tr;
		if (xn) {
			var Er = "oninput" in document;
			if (!Er) {
				var Dr = document.createElement("div");
				Dr.setAttribute("oninput", "return;"), Er = typeof Dr.oninput == "function";
			}
			Tr = Er;
		} else Tr = !1;
		wr = Tr && (!document.documentMode || 9 < document.documentMode);
	}
	function Or() {
		yr && (yr.detachEvent("onpropertychange", kr), br = yr = null);
	}
	function kr(e) {
		if (e.propertyName === "value" && Sr(br)) {
			var t = [];
			vr(t, br, e, mn(e)), yn(xr, t);
		}
	}
	function Ar(e, t, n) {
		e === "focusin" ? (Or(), yr = t, br = n, yr.attachEvent("onpropertychange", kr)) : e === "focusout" && Or();
	}
	function jr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Sr(br);
	}
	function Mr(e, t) {
		if (e === "click") return Sr(t);
	}
	function Nr(e, t) {
		if (e === "input" || e === "change") return Sr(t);
	}
	function Pr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Fr = typeof Object.is == "function" ? Object.is : Pr;
	function Ir(e, t) {
		if (Fr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!ke.call(t, i) || !Fr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Lr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Rr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function zr(e, t) {
		var n = Rr(e);
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
			n = Rr(n);
		}
	}
	function Br(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Br(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Vr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Lr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Lr(e.document);
		}
		return t;
	}
	function Hr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Ur = xn && "documentMode" in document && 11 >= document.documentMode, Wr = null, Gr = null, Kr = null, qr = !1;
	function Jr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		qr || Wr == null || Wr !== Lr(r) || (r = Wr, "selectionStart" in r && Hr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Kr && Ir(Kr, r) || (Kr = r, r = Zf(Gr, "onSelect"), 0 < r.length && (t = new Nn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Wr)));
	}
	function Yr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Xr = {
		animationend: Yr("Animation", "AnimationEnd"),
		animationiteration: Yr("Animation", "AnimationIteration"),
		animationstart: Yr("Animation", "AnimationStart"),
		transitionrun: Yr("Transition", "TransitionRun"),
		transitionstart: Yr("Transition", "TransitionStart"),
		transitioncancel: Yr("Transition", "TransitionCancel"),
		transitionend: Yr("Transition", "TransitionEnd")
	}, Zr = {}, Qr = {};
	xn && (Qr = document.createElement("div").style, "AnimationEvent" in window || (delete Xr.animationend.animation, delete Xr.animationiteration.animation, delete Xr.animationstart.animation), "TransitionEvent" in window || delete Xr.transitionend.transition);
	function $r(e) {
		if (Zr[e]) return Zr[e];
		if (!Xr[e]) return e;
		var t = Xr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Qr) return Zr[e] = t[n];
		return e;
	}
	var ei = $r("animationend"), ti = $r("animationiteration"), ni = $r("animationstart"), ri = $r("transitionrun"), ii = $r("transitionstart"), ai = $r("transitioncancel"), oi = $r("transitionend"), si = /* @__PURE__ */ new Map(), ci = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	ci.push("scrollEnd");
	function li(e, t) {
		si.set(e, t), Pt(t, [e]);
	}
	var K = 0;
	function ui(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = xd.identifierPrefix;
		var n = K++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function di(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = kd;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function q(e, t) {
		return e = di(e), t = di(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var fi = typeof reportError == "function" ? reportError : function(e) {
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
	}, pi = [], mi = 0, hi = 0;
	function gi() {
		for (var e = mi, t = hi = mi = 0; t < e;) {
			var n = pi[t];
			pi[t++] = null;
			var r = pi[t];
			pi[t++] = null;
			var i = pi[t];
			pi[t++] = null;
			var a = pi[t];
			if (pi[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && bi(n, i, a);
		}
	}
	function _i(e, t, n, r) {
		pi[mi++] = e, pi[mi++] = t, pi[mi++] = n, pi[mi++] = r, hi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function vi(e, t, n, r) {
		return _i(e, t, n, r), xi(e);
	}
	function yi(e, t) {
		return _i(e, null, null, t), xi(e);
	}
	function bi(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ke(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function xi(e) {
		if (50 < Ad) throw Ad = 0, jd = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Si = {};
	function Ci(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function wi(e, t, n, r) {
		return new Ci(e, t, n, r);
	}
	function Ti(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Ei(e, t) {
		var n = e.alternate;
		return n === null ? (n = wi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Di(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Oi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Ti(r) && (s = 1);
		else if (typeof r == "string") s = qm(e, n, he.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case B: return e = wi(31, n, t, a), e.elementType = B, e.lanes = o, e;
			case j: return ki(n.children, a, o, t);
			case M:
				s = 8, a |= 24;
				break;
			case N: return e = wi(12, n, t, a | 2), e.elementType = N, e.lanes = o, e;
			case L: return e = wi(13, n, t, a), e.elementType = L, e.lanes = o, e;
			case R: return e = wi(19, n, t, a), e.elementType = R, e.lanes = o, e;
			case te:
			case ne: return e = a | 32, e = wi(30, n, t, e), e.elementType = ne, e.lanes = o, e.stateNode = {
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
					case ee:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = wi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ki(e, t, n, r) {
		return e = wi(7, e, r, t), e.lanes = n, e;
	}
	function Ai(e, t, n) {
		return e = wi(6, e, null, t), e.lanes = n, e;
	}
	function ji(e) {
		var t = wi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Mi(e, t, n) {
		return t = wi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Ni = /* @__PURE__ */ new WeakMap();
	function Pi(e, t) {
		if (typeof e == "object" && e) {
			var n = Ni.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Oe(t)
			}, Ni.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Oe(t)
		};
	}
	var Fi = [], Ii = 0, Li = null, Ri = 0, zi = [], Bi = 0, Vi = null, Hi = 1, Ui = "";
	function Wi(e, t) {
		Fi[Ii++] = Ri, Fi[Ii++] = Li, Li = e, Ri = t;
	}
	function Gi(e, t, n) {
		zi[Bi++] = Hi, zi[Bi++] = Ui, zi[Bi++] = Vi, Vi = e;
		var r = Hi;
		e = Ui;
		var i = 32 - Ke(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ke(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Hi = 1 << 32 - Ke(t) + i | n << i | r, Ui = a + e;
		} else Hi = 1 << a | n << i | r, Ui = e;
	}
	function Ki(e) {
		e.return !== null && (Wi(e, 1), Gi(e, 1, 0));
	}
	function J(e) {
		for (; e === Li;) Li = Fi[--Ii], Fi[Ii] = null, Ri = Fi[--Ii], Fi[Ii] = null;
		for (; e === Vi;) Vi = zi[--Bi], zi[Bi] = null, Ui = zi[--Bi], zi[Bi] = null, Hi = zi[--Bi], zi[Bi] = null;
	}
	function qi(e, t) {
		zi[Bi++] = Hi, zi[Bi++] = Ui, zi[Bi++] = Vi, Hi = t.id, Ui = t.overflow, Vi = e;
	}
	var Ji = null, Yi = null, Xi = !1, Zi = null, Qi = !1, $i = Error(i(519));
	function ea(e) {
		throw oa(Pi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), $i;
	}
	function ta(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[gt] = e, t[_t] = r, n) {
			case "dialog":
				Wf("cancel", t), Wf("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Wf("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Vf.length; n++) Wf(Vf[n], t);
				break;
			case "source":
				Wf("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Wf("error", t), Wf("load", t);
				break;
			case "details":
				Wf("toggle", t);
				break;
			case "input":
				Wf("invalid", t), Qt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Wf("invalid", t);
				break;
			case "textarea": Wf("invalid", t), nn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || rp(t.textContent, n) ? (r.popover != null && (Wf("beforetoggle", t), Wf("toggle", t)), r.onScroll != null && Wf("scroll", t), r.onScrollEnd != null && Wf("scrollend", t), r.onClick != null && (t.onclick = fn), t = !0) : t = !1, t || ea(e, !0);
	}
	function na(e) {
		for (Ji = e.return; Ji;) switch (Ji.tag) {
			case 5:
			case 31:
			case 13:
				Qi = !1;
				return;
			case 27:
			case 3:
				Qi = !0;
				return;
			default: Ji = Ji.return;
		}
	}
	function ra(e) {
		if (e !== Ji) return !1;
		if (!Xi) return na(e), Xi = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || _p(e.type, e.memoizedProps)), n = !n), n && Yi && ea(e), na(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Yi = fm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Yi = fm(e);
		} else t === 27 ? (t = Yi, Ep(e.type) ? (e = dm, dm = null, Yi = e) : Yi = t) : Yi = Ji ? um(e.stateNode.nextSibling) : null;
		return !0;
	}
	function ia() {
		Yi = Ji = null, Xi = !1;
	}
	function aa() {
		var e = Zi;
		return e !== null && (pd === null ? pd = e : pd.push.apply(pd, e), Zi = null), e;
	}
	function oa(e) {
		Zi === null ? Zi = [e] : Zi.push(e);
	}
	var sa = pe(null), ca = null, la = null;
	function ua(e, t, n) {
		U(sa, t._currentValue), t._currentValue = n;
	}
	function da(e) {
		e._currentValue = sa.current, me(sa);
	}
	function fa(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function pa(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), fa(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), fa(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), fa(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
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
	function ma(e, t, n, r) {
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
					Fr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ve.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [sh] : e.push(sh));
			}
			a = a.return;
		}
		return e !== null && pa(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function ha(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Fr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function ga(e) {
		ca = e, la = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function _a(e) {
		return ya(ca, e);
	}
	function va(e, t) {
		return ca === null && ga(e), ya(e, t);
	}
	function ya(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, la === null) {
			if (e === null) throw Error(i(308));
			la = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else la = la.next = t;
		return n;
	}
	var ba = typeof AbortController < "u" ? AbortController : function() {
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
	}, xa = t.unstable_scheduleCallback, Sa = t.unstable_NormalPriority, Y = {
		$$typeof: F,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Ca() {
		return {
			controller: new ba(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function wa(e) {
		e.refCount--, e.refCount === 0 && xa(Sa, function() {
			e.controller.abort();
		});
	}
	function Ta(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var Ea = null;
	function Da(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var Oa = null, ka = 0, Aa = 0, ja = null;
	function Ma(e, t) {
		if (Oa === null) {
			var n = Oa = [];
			ka = 0, Aa = If(), ja = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ka++, t.then(Na, Na), t;
	}
	function Na() {
		if (--ka === 0 && (Ea = null, Oa !== null)) {
			ja !== null && (ja.status = "fulfilled");
			var e = Oa;
			Oa = null, Aa = 0, ja = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Pa(e, t) {
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
	var Fa = H.S;
	H.S = function(e, t) {
		if (gd = Pe(), typeof t == "object" && t && typeof t.then == "function" && Ma(e, t), Ea !== null) for (var n = Sf; n !== null;) Ta(n, Ea), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = Sf; r !== null;) Ta(r, n), r = r.next;
			if (Aa !== 0) {
				r = Ea, r === null && (r = Ea = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Fa !== null && Fa(e, t);
	};
	var Ia = pe(null);
	function La() {
		var e = Ia.current;
		return e === null ? Zu.pooledCache : e;
	}
	function Ra(e, t) {
		t === null ? U(Ia, Ia.current) : U(Ia, t.pool);
	}
	function za() {
		var e = La();
		return e === null ? null : {
			parent: Y._currentValue,
			pool: e
		};
	}
	var Ba = Error(i(460)), Va = Error(i(474)), Ha = Error(i(542)), Ua = { then: function() {} };
	function Wa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ga(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(fn, fn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ya(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(fn, fn);
				else {
					if (e = Zu, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
					case "rejected": throw e = t.reason, Ya(e), e;
				}
				throw qa = t, Ba;
		}
	}
	function Ka(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (qa = e, Ba) : e;
		}
	}
	var qa = null;
	function Ja() {
		if (qa === null) throw Error(i(459));
		var e = qa;
		return qa = null, e;
	}
	function Ya(e) {
		if (e === Ba || e === Ha) throw Error(i(483));
	}
	var Xa = null, Za = 0;
	function Qa(e) {
		var t = Za;
		return Za += 1, Xa === null && (Xa = []), Ga(Xa, e, t);
	}
	function $a(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function eo(e, t) {
		throw t.$$typeof === O ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function to(e) {
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
			return e = Ei(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Ai(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === j ? (e = d(e, t, n.props.children, r, n.key), $a(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === ee && Ka(i) === t.type) ? (t = a(t, n.props), $a(t, n), t.return = e, t) : (t = Oi(n.type, n.key, n.props, null, e.mode, r), $a(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Mi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ki(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Ai("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case k: return n = Oi(t.type, t.key, t.props, null, e.mode, n), $a(n, t), n.return = e, n;
					case A: return t = Mi(t, e.mode, n), t.return = e, t;
					case ee: return t = Ka(t), f(e, t, n);
				}
				if (ce(t) || ae(t)) return t = ki(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Qa(t), n);
				if (t.$$typeof === F) return f(e, va(e, t), n);
				eo(e, t);
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
					case ee: return n = Ka(n), p(e, t, n, r);
				}
				if (ce(n) || ae(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Qa(n), r);
				if (n.$$typeof === F) return p(e, t, va(e, n), r);
				eo(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case k: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case A: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case ee: return r = Ka(r), m(e, t, n, r, i);
				}
				if (ce(r) || ae(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Qa(r), i);
				if (r.$$typeof === F) return m(e, t, n, va(t, r), i);
				eo(t, r);
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
			if (h === s.length) return n(i, d), Xi && Wi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return Xi && Wi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), Xi && Wi(i, h), l;
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
			if (v.done) return n(a, h), Xi && Wi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return Xi && Wi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), Xi && Wi(a, g), u;
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
											n(e, r.sibling), c = a(r, o.props.children), $a(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === ee && Ka(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), $a(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === j ? (c = ki(o.props.children, e.mode, c, o.key), $a(c, o), c.return = e, e = c) : (c = Oi(o.type, o.key, o.props, null, e.mode, c), $a(c, o), c.return = e, e = c);
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
							c = Mi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case ee: return o = Ka(o), _(e, r, o, c);
				}
				if (ce(o)) return h(e, r, o, c);
				if (ae(o)) {
					if (l = ae(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, Qa(o), c);
				if (o.$$typeof === F) return _(e, r, va(e, o), c);
				eo(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Ai(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Za = 0;
				var i = _(e, t, n, r);
				return Xa = null, i;
			} catch (t) {
				if (t === Ba || t === Ha) throw t;
				var a = wi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var no = to(!0), ro = to(!1), io = !1;
	function ao(e) {
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
	function oo(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function so(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function co(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Xu & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = xi(e), bi(e, null, n), t;
		}
		return _i(e, r, t, n), xi(e);
	}
	function lo(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, lt(e, n);
		}
	}
	function uo(e, t) {
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
	var fo = !1;
	function po() {
		if (fo) {
			var e = ja;
			if (e !== null) throw e;
		}
	}
	function mo(e, t, n, r) {
		fo = !1;
		var i = e.updateQueue;
		io = !1;
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
				if (p ? ($u & f) === f : (r & f) === f) {
					f !== 0 && f === Aa && (fo = !0), u !== null && (u = u.next = {
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
							case 2: io = !0;
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), sd |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function ho(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function go(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) ho(n[e], t);
	}
	var _o = pe(null), vo = pe(0);
	function yo(e, t) {
		e = ad, U(vo, e), U(_o, t), ad = e | t.baseLanes;
	}
	function bo() {
		U(vo, ad), U(_o, _o.current);
	}
	function xo() {
		ad = vo.current, me(_o), me(vo);
	}
	var So = pe(null), Co = null;
	function wo(e) {
		var t = e.alternate;
		U(ko, ko.current & 1), U(So, e), Co === null && (t === null || _o.current !== null || t.memoizedState !== null) && (Co = e);
	}
	function To(e) {
		U(ko, ko.current), U(So, e), Co === null && (Co = e);
	}
	function Eo(e) {
		e.tag === 22 ? (U(ko, ko.current), U(So, e), Co === null && (Co = e)) : Do();
	}
	function Do() {
		U(ko, ko.current), U(So, So.current);
	}
	function Oo(e) {
		me(So), Co === e && (Co = null), me(ko);
	}
	var ko = pe(0);
	function Ao(e, t) {
		U(So, So.current), U(ko, t);
	}
	function jo(e) {
		me(ko), me(So), Co === e && (Co = null);
	}
	function Mo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || sm(n) || cm(n))) return t;
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
	var No = 0, Po = null, Fo = null, Io = null, Lo = !1, Ro = !1, zo = !1, Bo = 0, Vo = 0, Ho = null, Uo = 0;
	function Wo() {
		throw Error(i(321));
	}
	function Go(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Fr(e[n], t[n])) return !1;
		return !0;
	}
	function Ko(e, t, n, r, i, a) {
		return No = a, Po = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, H.H = e === null || e.memoizedState === null ? lc : uc, zo = !1, a = n(r, i), zo = !1, Ro && (a = Jo(t, n, r, i)), qo(e), a;
	}
	function qo(e) {
		H.H = cc;
		var t = Fo !== null && Fo.next !== null;
		if (No = 0, Io = Fo = Po = null, Lo = !1, Vo = 0, Ho = null, t) throw Error(i(300));
		e === null || Dc || (e = e.dependencies, e !== null && ha(e) && (Dc = !0));
	}
	function Jo(e, t, n, r) {
		Po = e;
		var a = 0;
		do {
			if (Ro && (Ho = null), Vo = 0, Ro = !1, 25 <= a) throw Error(i(301));
			if (a += 1, Io = Fo = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			H.H = dc, o = t(n, r);
		} while (Ro);
		return o;
	}
	function Yo() {
		var e = H.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? ns(t) : t, e = e.useState()[0], (Fo === null ? null : Fo.memoizedState) !== e && (Po.flags |= 1024), t;
	}
	function Xo() {
		var e = Bo !== 0;
		return Bo = 0, e;
	}
	function Zo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Qo(e) {
		if (Lo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Lo = !1;
		}
		No = 0, Io = Fo = Po = null, Ro = !1, Vo = Bo = 0, Ho = null;
	}
	function $o() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Io === null ? Po.memoizedState = Io = e : Io = Io.next = e, Io;
	}
	function es() {
		if (Fo === null) {
			var e = Po.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = Fo.next;
		var t = Io === null ? Po.memoizedState : Io.next;
		if (t !== null) Io = t, Fo = e;
		else {
			if (e === null) throw Po.alternate === null ? Error(i(467)) : Error(i(310));
			Fo = e, e = {
				memoizedState: Fo.memoizedState,
				baseState: Fo.baseState,
				baseQueue: Fo.baseQueue,
				queue: Fo.queue,
				next: null
			}, Io === null ? Po.memoizedState = Io = e : Io = Io.next = e;
		}
		return Io;
	}
	function ts() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function ns(e) {
		var t = Vo;
		return Vo += 1, Ho === null && (Ho = []), e = Ga(Ho, e, t), t = Po, (Io === null ? t.memoizedState : Io.next) === null && (t = t.alternate, H.H = t === null || t.memoizedState === null ? lc : uc), e;
	}
	function rs(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ns(e);
			if (e.$$typeof === re) return;
			if (e.$$typeof === F) return _a(e);
		}
		throw Error(i(438, String(e)));
	}
	function is(e) {
		var t = null, n = Po.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = Po.alternate;
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
		}, n === null && (n = ts(), Po.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = V;
		return t.index++, n;
	}
	function as(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function os(e) {
		return ss(es(), Fo, e);
	}
	function ss(e, t, n) {
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
				if (f === u.lane ? (No & f) === f : ($u & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Aa && (d = !0);
					else if ((No & p) === p) {
						u = u.next, p === Aa && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, Po.lanes |= p, sd |= p;
					f = u.action, zo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, Po.lanes |= f, sd |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Fr(o, e.memoizedState) && (Dc = !0, d && (n = ja, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function cs(e) {
		var t = es(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Fr(o, t.memoizedState) || (Dc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function ls(e, t, n) {
		var r = Po, a = es(), o = Xi;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Fr((Fo || a).memoizedState, n);
		if (s && (a.memoizedState = n, Dc = !0), a = a.queue, Ps(fs.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Io !== null && !!(Io.memoizedState.tag & 1), ks(e ? 9 : 8, { destroy: void 0 }, ds.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, Zu === null) throw Error(i(349));
			o || No & 127 || us(r, t, n);
		}
		return n;
	}
	function us(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = Po.updateQueue, t === null ? (t = ts(), Po.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function ds(e, t, n, r) {
		t.value = n, t.getSnapshot = r, ps(t) && ms(e);
	}
	function fs(e, t, n) {
		return n(function() {
			ps(t) && ms(e);
		});
	}
	function ps(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Fr(e, n);
		} catch {
			return !0;
		}
	}
	function ms(e) {
		var t = yi(e, 2);
		t !== null && Fd(t, e, 2);
	}
	function hs(e) {
		var t = $o();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), zo) {
				Ge(!0);
				try {
					n();
				} finally {
					Ge(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: as,
			lastRenderedState: e
		}, t;
	}
	function gs(e, t, n, r) {
		return e.baseState = n, ss(e, Fo, typeof r == "function" ? r : as);
	}
	function _s(e, t, n, r, a) {
		if (ac(e)) throw Error(i(485));
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
			H.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, vs(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function vs(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = H.T, o = {};
			o.types = a === null ? null : a.types, H.T = o;
			try {
				var s = n(i, r), c = H.S;
				c !== null && c(o, s), ys(e, t, s);
			} catch (n) {
				xs(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), H.T = a;
			}
		} else try {
			a = n(i, r), ys(e, t, a);
		} catch (n) {
			xs(e, t, n);
		}
	}
	function ys(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			bs(e, t, n);
		}, function(n) {
			return xs(e, t, n);
		}) : bs(e, t, n);
	}
	function bs(e, t, n) {
		t.status = "fulfilled", t.value = n, Ss(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, vs(e, n)));
	}
	function xs(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Ss(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Ss(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Cs(e, t) {
		return t;
	}
	function ws(e, t) {
		if (Xi) {
			var n = Zu.formState;
			if (n !== null) {
				a: {
					var r = Po;
					if (Xi) {
						if (Yi) {
							b: {
								for (var i = Yi, a = Qi; i.nodeType !== 8;) if (!a || (i = um(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Yi = um(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						ea(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = $o(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Cs,
			lastRenderedState: t
		}, n.queue = r, n = nc.bind(null, Po, r), r.dispatch = n, r = hs(!1), a = ic.bind(null, Po, !1, r.queue), r = $o(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = _s.bind(null, Po, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Ts(e) {
		return Es(es(), Fo, e);
	}
	function Es(e, t, n) {
		if (t = ss(e, t, Cs)[0], e = os(as)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ns(t);
		} catch (e) {
			throw e === Ba ? Ha : e;
		}
		else r = t;
		t = es();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (Po.flags |= 2048, ks(9, { destroy: void 0 }, Ds.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Ds(e, t) {
		e.action = t;
	}
	function Os(e) {
		var t = es(), n = Fo;
		if (n !== null) return Es(t, n, e);
		es(), t = t.memoizedState, n = es();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function ks(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = Po.updateQueue, t === null && (t = ts(), Po.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function As() {
		return es().memoizedState;
	}
	function js(e, t, n, r) {
		var i = $o();
		Po.flags |= e, i.memoizedState = ks(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Ms(e, t, n, r) {
		var i = es();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		Fo !== null && r !== null && Go(r, Fo.memoizedState.deps) ? i.memoizedState = ks(t, a, n, r) : (Po.flags |= e, i.memoizedState = ks(1 | t, a, n, r));
	}
	function Ns(e, t) {
		js(8390656, 8, e, t);
	}
	function Ps(e, t) {
		Ms(2048, 8, e, t);
	}
	function Fs(e) {
		Po.flags |= 4;
		var t = Po.updateQueue;
		if (t === null) t = ts(), Po.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Is(e) {
		var t = es().memoizedState;
		return Fs({
			ref: t,
			nextImpl: e
		}), function() {
			if (Xu & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Ls(e, t) {
		return Ms(4, 2, e, t);
	}
	function Rs(e, t) {
		return Ms(4, 4, e, t);
	}
	function zs(e, t) {
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
	function Bs(e, t, n) {
		n = n == null ? null : n.concat([e]), Ms(4, 4, zs.bind(null, t, e), n);
	}
	function Vs() {}
	function Hs(e, t) {
		var n = es();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Go(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Us(e, t) {
		var n = es();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Go(t, r[1])) return r[0];
		if (r = e(), zo) {
			Ge(!0);
			try {
				e();
			} finally {
				Ge(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Ws(e, t, n) {
		return n === void 0 || No & 1073741824 && !($u & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Nd(), Po.lanes |= e, sd |= e, n);
	}
	function Gs(e, t, n, r) {
		return Fr(n, t) ? n : _o.current === null ? !(No & 106) || No & 1073741824 && !($u & 261930) ? (Dc = !0, e.memoizedState = n) : (e = Nd(), Po.lanes |= e, sd |= e, t) : (e = Ws(e, n, r), Fr(e, t) || (Dc = !0), e);
	}
	function Ks(e, t, n, r, i) {
		var a = le.p;
		le.p = a !== 0 && 8 > a ? a : 8;
		var o = H.T, s = {};
		s.types = o === null ? null : o.types, H.T = s, ic(e, !1, t, n);
		try {
			var c = i(), l = H.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? rc(e, t, Pa(c, r), Md(e)) : rc(e, t, r, Md(e));
		} catch (n) {
			rc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Md());
		} finally {
			le.p = a, o !== null && s.types !== null && (o.types = s.types), H.T = o;
		}
	}
	function qs() {}
	function Js(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Ys(e).queue;
		Ks(e, a, t, ue, n === null ? qs : function() {
			return Xs(e), n(r);
		});
	}
	function Ys(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ue,
			baseState: ue,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: as,
				lastRenderedState: ue
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
				lastRenderedReducer: as,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Xs(e) {
		var t = Ys(e);
		t.next === null && (t = e.alternate.memoizedState), rc(e, t.next.queue, {}, Md());
	}
	function Zs() {
		return _a(sh);
	}
	function Qs() {
		return es().memoizedState;
	}
	function $s() {
		return es().memoizedState;
	}
	function ec(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Md();
					e = so(n);
					var r = co(t, e, n);
					r !== null && (Fd(r, t, n), lo(r, t, n)), t = { cache: Ca() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function tc(e, t, n) {
		var r = Md();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ac(e) ? oc(t, n) : (n = vi(e, t, n, r), n !== null && (Fd(n, e, r), sc(n, t, r)));
	}
	function nc(e, t, n) {
		rc(e, t, n, Md());
	}
	function rc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (ac(e)) oc(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Fr(s, o)) return _i(e, t, i, 0), Zu === null && gi(), !1;
			} catch {}
			if (n = vi(e, t, i, r), n !== null) return Fd(n, e, r), sc(n, t, r), !0;
		}
		return !1;
	}
	function ic(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: If(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ac(e)) {
			if (t) throw Error(i(479));
		} else t = vi(e, n, r, 2), t !== null && Fd(t, e, 2);
	}
	function ac(e) {
		var t = e.alternate;
		return e === Po || t !== null && t === Po;
	}
	function oc(e, t) {
		Ro = Lo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function sc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, lt(e, n);
		}
	}
	var cc = {
		readContext: _a,
		use: rs,
		useCallback: Wo,
		useContext: Wo,
		useEffect: Wo,
		useImperativeHandle: Wo,
		useLayoutEffect: Wo,
		useInsertionEffect: Wo,
		useMemo: Wo,
		useReducer: Wo,
		useRef: Wo,
		useState: Wo,
		useDebugValue: Wo,
		useDeferredValue: Wo,
		useTransition: Wo,
		useSyncExternalStore: Wo,
		useId: Wo,
		useHostTransitionStatus: Wo,
		useFormState: Wo,
		useActionState: Wo,
		useOptimistic: Wo,
		useMemoCache: Wo,
		useCacheRefresh: Wo,
		useEffectEvent: Wo
	}, lc = {
		readContext: _a,
		use: rs,
		useCallback: function(e, t) {
			return $o().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: _a,
		useEffect: Ns,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), js(4194308, 4, zs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return js(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			js(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = $o();
			t = t === void 0 ? null : t;
			var r = e();
			if (zo) {
				Ge(!0);
				try {
					e();
				} finally {
					Ge(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = $o();
			if (n !== void 0) {
				var i = n(t);
				if (zo) {
					Ge(!0);
					try {
						n(t);
					} finally {
						Ge(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = tc.bind(null, Po, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = $o();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = hs(e);
			var t = e.queue, n = nc.bind(null, Po, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Vs,
		useDeferredValue: function(e, t) {
			return Ws($o(), e, t);
		},
		useTransition: function() {
			var e = hs(!1);
			return e = Ks.bind(null, Po, e.queue, !0, !1), $o().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = Po, a = $o();
			if (Xi) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Zu === null) throw Error(i(349));
				$u & 127 || us(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Ns(fs.bind(null, r, o, e), [e]), r.flags |= 2048, ks(9, { destroy: void 0 }, ds.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = $o(), t = Zu.identifierPrefix;
			if (Xi) {
				var n = Ui, r = Hi;
				n = (r & ~(1 << 32 - Ke(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Bo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Uo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Zs,
		useFormState: ws,
		useActionState: ws,
		useOptimistic: function(e) {
			var t = $o();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = ic.bind(null, Po, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: is,
		useCacheRefresh: function() {
			return $o().memoizedState = ec.bind(null, Po);
		},
		useEffectEvent: function(e) {
			var t = $o(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Xu & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, uc = {
		readContext: _a,
		use: rs,
		useCallback: Hs,
		useContext: _a,
		useEffect: Ps,
		useImperativeHandle: Bs,
		useInsertionEffect: Ls,
		useLayoutEffect: Rs,
		useMemo: Us,
		useReducer: os,
		useRef: As,
		useState: function() {
			return os(as);
		},
		useDebugValue: Vs,
		useDeferredValue: function(e, t) {
			return Gs(es(), Fo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = os(as)[0], t = es().memoizedState;
			return [typeof e == "boolean" ? e : ns(e), t];
		},
		useSyncExternalStore: ls,
		useId: Qs,
		useHostTransitionStatus: Zs,
		useFormState: Ts,
		useActionState: Ts,
		useOptimistic: function(e, t) {
			return gs(es(), Fo, e, t);
		},
		useMemoCache: is,
		useCacheRefresh: $s,
		useEffectEvent: Is
	}, dc = {
		readContext: _a,
		use: rs,
		useCallback: Hs,
		useContext: _a,
		useEffect: Ps,
		useImperativeHandle: Bs,
		useInsertionEffect: Ls,
		useLayoutEffect: Rs,
		useMemo: Us,
		useReducer: cs,
		useRef: As,
		useState: function() {
			return cs(as);
		},
		useDebugValue: Vs,
		useDeferredValue: function(e, t) {
			var n = es();
			return Fo === null ? Ws(n, e, t) : Gs(n, Fo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = cs(as)[0], t = es().memoizedState;
			return [typeof e == "boolean" ? e : ns(e), t];
		},
		useSyncExternalStore: ls,
		useId: Qs,
		useHostTransitionStatus: Zs,
		useFormState: Os,
		useActionState: Os,
		useOptimistic: function(e, t) {
			var n = es();
			return Fo === null ? (n.baseState = e, [e, n.queue.dispatch]) : gs(n, Fo, e, t);
		},
		useMemoCache: is,
		useCacheRefresh: $s,
		useEffectEvent: Is
	};
	function fc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : D({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var pc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Md(), i = so(r);
			i.payload = t, n != null && (i.callback = n), t = co(e, i, r), t !== null && (Fd(t, e, r), lo(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Md(), i = so(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = co(e, i, r), t !== null && (Fd(t, e, r), lo(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Md(), r = so(n);
			r.tag = 2, t != null && (r.callback = t), t = co(e, r, n), t !== null && (Fd(t, e, n), lo(t, e, n));
		}
	};
	function mc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Ir(n, r) || !Ir(i, a) : !0;
	}
	function hc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && pc.enqueueReplaceState(t, t.state, null);
	}
	function gc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = D({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function _c(e) {
		fi(e);
	}
	function vc(e) {
		console.error(e);
	}
	function yc(e) {
		fi(e);
	}
	function bc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function xc(e, t, n) {
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
	function Sc(e, t, n) {
		return n = so(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			bc(e, t);
		}, n;
	}
	function Cc(e) {
		return e = so(e), e.tag = 3, e;
	}
	function wc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				xc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			xc(t, n, r), typeof i != "function" && (yd === null ? yd = /* @__PURE__ */ new Set([this]) : yd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Tc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ma(t, n, a, !0), n = So.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return Co === null ? qd() : n.alternate === null && od === 0 && (od = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Ua ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), gf(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Ua ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), gf(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return gf(e, r, a), qd(), !1;
		}
		if (Xi) return t = So.current, t === null ? (r !== $i && (t = Error(i(423), { cause: r }), oa(Pi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Pi(r, n), a = Sc(e.stateNode, r, a), uo(e, a), od !== 4 && (od = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== $i && (e = Error(i(422), { cause: r }), oa(Pi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Pi(o, n), fd === null ? fd = [o] : fd.push(o), od !== 4 && (od = 2), t === null) return !0;
		r = Pi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Sc(n.stateNode, r, e), uo(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (yd === null || !yd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Cc(a), wc(a, e, n, r), uo(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Ec = Error(i(461)), Dc = !1;
	function Oc(e, t, n, r) {
		t.child = e === null ? ro(t, null, n, r) : no(t, e.child, n, r);
	}
	function kc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ga(t), r = Ko(e, t, n, o, a, i), s = Xo(), e !== null && !Dc ? (Zo(e, t, i), rl(e, t, i)) : (Xi && s && Ki(t), t.flags |= 1, Oc(e, t, r, i), t.child);
	}
	function Ac(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Ti(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, jc(e, t, a, r, i)) : (e = Oi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !il(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Ir : n, n(o, r) && e.ref === t.ref) return rl(e, t, i);
		}
		return t.flags |= 1, e = Ei(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function jc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Ir(a, r) && e.ref === t.ref) {
				if (Dc = !1, t.pendingProps = r = a, il(e, i)) e.flags & 131072 && (Dc = !0);
				else return t.lanes = e.lanes, rl(e, t, i);
			}
		}
		return zc(e, t, n, r, i);
	}
	function Mc(e, t, n, r) {
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
				return Pc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Ra(t, a === null ? null : a.cachePool), a === null ? bo() : yo(t, a), Eo(t);
			else return r = t.lanes = 536870912, Pc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Ra(t, null), bo(), Do()) : (Ra(t, a.cachePool), yo(t, a), Do(), t.memoizedState = null);
		return Oc(e, t, i, n), t.child;
	}
	function Nc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Pc(e, t, n, r, i) {
		var a = La();
		return a = a === null ? null : {
			parent: Y._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Ra(t, null), bo(), Eo(t), e !== null && ma(e, t, r, !0), t.childLanes = i, null;
	}
	function Fc(e, t) {
		return t = Jc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Ic(e, t, n) {
		return no(t, e.child, null, n), e = Fc(t, t.pendingProps), e.flags |= 2, Oo(t), t.memoizedState = null, e;
	}
	function Lc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (Xi) {
				if (r.mode === "hidden") return e = Fc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, Nc(null, e);
				if (To(t), (e = Yi) ? (e = om(e, Qi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Vi === null ? null : {
						id: Hi,
						overflow: Ui
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ji(e), n.return = t, t.child = n, Ji = t, Yi = null)) : e = null, e === null) throw ea(t);
				return t.lanes = 536870912, null;
			}
			return Fc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (To(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Ic(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Dc || ma(e, t, n, !1), a = (n & e.childLanes) !== 0, Dc || a) {
				if (_o.current === null) {
					if (r = Zu, r !== null && (s = ut(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, yi(e, s), Fd(r, e, s), Ec;
					qd();
				}
				t = Ic(e, t, n);
			} else e = o.treeContext, Yi = um(s.nextSibling), Ji = t, Xi = !0, Zi = null, Qi = !1, e !== null && qi(t, e), t = Fc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Ei(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Rc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function zc(e, t, n, r, i) {
		return ga(t), n = Ko(e, t, n, r, void 0, i), r = Xo(), e !== null && !Dc ? (Zo(e, t, i), rl(e, t, i)) : (Xi && r && Ki(t), t.flags |= 1, Oc(e, t, n, i), t.child);
	}
	function Bc(e, t, n, r, i, a) {
		return ga(t), t.updateQueue = null, n = Jo(t, r, n, i), qo(e), r = Xo(), e !== null && !Dc ? (Zo(e, t, a), rl(e, t, a)) : (Xi && r && Ki(t), t.flags |= 1, Oc(e, t, n, a), t.child);
	}
	function Vc(e, t, n, r, i) {
		if (ga(t), t.stateNode === null) {
			var a = Si, o = n.contextType;
			typeof o == "object" && o && (a = _a(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = pc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, ao(t), o = n.contextType, a.context = typeof o == "object" && o ? _a(o) : Si, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (fc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && pc.enqueueReplaceState(a, a.state, null), mo(t, r, a, i), po(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = gc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Si, typeof u == "object" && u && (o = _a(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && hc(t, a, r, o), io = !1;
			var f = t.memoizedState;
			a.state = f, mo(t, r, a, i), po(), l = t.memoizedState, s || f !== l || io ? (typeof d == "function" && (fc(t, n, d, r), l = t.memoizedState), (c = io || mc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, oo(e, t), o = t.memoizedProps, u = gc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Si, typeof l == "object" && l && (c = _a(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && hc(t, a, r, c), io = !1, f = t.memoizedState, a.state = f, mo(t, r, a, i), po();
			var p = t.memoizedState;
			o !== d || f !== p || io || e !== null && e.dependencies !== null && ha(e.dependencies) ? (typeof s == "function" && (fc(t, n, s, r), p = t.memoizedState), (u = io || mc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && ha(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Rc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = no(t, e.child, null, i), t.child = no(t, null, n, i)) : Oc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = rl(e, t, i), e;
	}
	function Hc(e, t, n, r) {
		return ia(), t.flags |= 256, Oc(e, t, n, r), t.child;
	}
	var Uc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Wc(e) {
		return {
			baseLanes: e,
			cachePool: za()
		};
	}
	function Gc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= ud), e;
	}
	function Kc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(ko.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (Xi) {
				if (i ? wo(t) : Do(), (e = Yi) ? (e = om(e, Qi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Vi === null ? null : {
						id: Hi,
						overflow: Ui
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ji(e), n.return = t, t.child = n, Ji = t, Yi = null)) : e = null, e === null) throw ea(t);
				return t.lanes = cm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Do(), i = t.mode, a = Jc({
				mode: "hidden",
				children: a
			}, i), r = ki(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Wc(n), r.childLanes = Gc(e, o, n), t.memoizedState = Uc, Nc(null, r)) : (wo(t), qc(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return Xc(e, t, a, o, r, c, s, n);
		}
		return i ? (Do(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Ei(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = ki(i, a, n, null), i.flags |= 2) : i = Ei(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Nc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Wc(n) : (a = i.cachePool, a === null ? a = za() : (s = Y._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = Gc(e, o, n), t.memoizedState = Uc, Nc(e.child, r)) : (wo(t), n = e.child, e = n.sibling, n = Ei(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function qc(e, t) {
		return t = Jc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Jc(e, t) {
		return e = wi(22, e, null, t), e.lanes = 0, e;
	}
	function Yc(e, t, n) {
		return no(t, e.child, null, n), e = qc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Xc(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (wo(t), t.flags &= -257, Yc(e, t, c)) : t.memoizedState === null ? (Do(), o = a.fallback, s = t.mode, a = Jc({
			mode: "visible",
			children: a.children
		}, s), o = ki(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, no(t, e.child, null, c), a = t.child, a.memoizedState = Wc(c), a.childLanes = Gc(e, r, c), t.memoizedState = Uc, Nc(null, a)) : (Do(), t.child = e.child, t.flags |= 128, null);
		if (wo(t), cm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, oa({
				value: a,
				source: null,
				stack: null
			})), Yc(e, t, c);
		}
		if (Dc || ma(e, t, c, !1), r = (c & e.childLanes) !== 0, Dc || r) {
			if (_o.current !== null) return Yc(e, t, c);
			if (r = Zu, r !== null && (a = ut(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, yi(e, a), Fd(r, e, a), Ec;
			return sm(o) || qd(), Yc(e, t, c);
		}
		return sm(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, Yi = um(o.nextSibling), Ji = t, Xi = !0, Zi = null, Qi = !1, e !== null && qi(t, e), t = qc(t, a.children), t.flags |= 134221824, t);
	}
	function Zc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), fa(e.return, t, n);
	}
	function Qc(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && Mo(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function $c(e, t, n, r, i, a) {
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
	function el(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function tl(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = ko.current;
		if (t.flags & 128) return Ao(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, Ao(t, o), i === "backwards" && e !== null ? (el(e), Oc(e, t, r, n), el(e)) : Oc(e, t, r, n), r = Xi ? Ri : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Zc(e, n, t);
			else if (e.tag === 19) Zc(e, n, t);
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
				n = Qc(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, el(t)), $c(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Mo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				$c(t, !0, n, null, a, r);
				break;
			case "together":
				$c(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = Qc(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), $c(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function nl(e, t, n) {
		var r = t.pendingProps;
		return ua(t, t.type, r.value), Oc(e, t, r.children, n), t.child;
	}
	function rl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), sd |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (ma(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Ei(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Ei(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function il(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && ha(e)));
	}
	function al(e, t, n) {
		switch (t.tag) {
			case 3:
				ye(t, t.stateNode.containerInfo), ua(t, Y, e.memoizedState.cache), ia();
				break;
			case 27:
			case 5:
				be(t);
				break;
			case 4:
				ye(t, t.stateNode.containerInfo);
				break;
			case 10:
				ua(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, To(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return wo(t), t.flags |= 128, null;
					r = ma(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? Kc(e, t, n) : (wo(t), e = rl(e, t, n), e === null ? null : e.sibling);
				}
				wo(t);
				break;
			case 19:
				if (t.flags & 128) return tl(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (ma(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return tl(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Ao(t, ko.current), r) break;
				return null;
			case 22: return t.lanes = 0, Mc(e, t, n, t.pendingProps);
			case 24: ua(t, Y, e.memoizedState.cache);
		}
		return rl(e, t, n);
	}
	function ol(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Dc = !0;
			else {
				if (!il(e, n) && !(t.flags & 128)) return Dc = !1, al(e, t, n);
				Dc = !!(e.flags & 131072);
			}
		} else Dc = !1, Xi && t.flags & 1048576 && Gi(t, Ri, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ka(t.elementType), t.type = e, typeof e == "function") Ti(e) ? (r = gc(e, r), t.tag = 1, t = Vc(null, t, e, r, n)) : (t.tag = 0, t = zc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === I) {
								t.tag = 11, t = kc(null, t, e, r, n);
								break a;
							}
							if (a === z) {
								t.tag = 14, t = Ac(null, t, e, r, n);
								break a;
							}
							if (a === F) {
								t.tag = 10, t.type = e, t = nl(null, t, n);
								break a;
							}
						}
						throw t = se(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return zc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = gc(r, t.pendingProps), Vc(e, t, r, a, n);
			case 3:
				a: {
					if (ye(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, oo(e, t), mo(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ua(t, Y, r), r !== o.cache && pa(t, [Y], n, !0), po(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Hc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Pi(Error(i(424)), t), oa(a), t = Hc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Yi = um(e.firstChild), Ji = t, Xi = !0, Zi = null, Qi = !0, n = ro(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (ia(), r === a) {
							t = rl(e, t, n);
							break a;
						}
						Oc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Rc(e, t), e === null ? (n = Nm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Xi || (t.stateNode = gp(t.type, t.pendingProps, _e.current, t)) : t.memoizedState = Nm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return be(t), e === null && Xi && (r = t.stateNode = gm(t.type, t.pendingProps, _e.current), Ji = t, Qi = !0, a = Yi, Ep(t.type) ? (dm = a, Yi = um(r.firstChild)) : Yi = a), Oc(e, t, t.pendingProps.children, n), Rc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && Xi && ((a = r = Yi) && (r = im(r, t.type, t.pendingProps, Qi), r === null ? a = !1 : (t.stateNode = r, Ji = t, Yi = um(r.firstChild), Qi = !1, a = !0)), a || ea(t)), be(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, _p(a, o) ? r = null : s !== null && _p(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Ko(e, t, Yo, null, null, n), sh._currentValue = a), Rc(e, t), Oc(e, t, r, n), t.child;
			case 6: return e === null && Xi && ((e = n = Yi) && (n = am(n, t.pendingProps, Qi), n === null ? e = !1 : (t.stateNode = n, Ji = t, Yi = null, e = !0)), e || ea(t)), null;
			case 13: return Kc(e, t, n);
			case 4: return ye(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = no(t, null, r, n) : Oc(e, t, r, n), t.child;
			case 11: return kc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Rc(e, t), Oc(e, t, r, n), t.child;
			case 8: return Oc(e, t, t.pendingProps.children, n), t.child;
			case 12: return Oc(e, t, t.pendingProps.children, n), t.child;
			case 10: return nl(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, ga(t), a = _a(a), r = r(a), t.flags |= 1, Oc(e, t, r, n), t.child;
			case 14: return Ac(e, t, t.type, t.pendingProps, n);
			case 15: return jc(e, t, t.type, t.pendingProps, n);
			case 19: return tl(e, t, n);
			case 31: return Lc(e, t, n);
			case 22: return Mc(e, t, n, t.pendingProps);
			case 24: return ga(t), r = _a(Y), e === null ? (a = La(), a === null && (a = Zu, o = Ca(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, ao(t), ua(t, Y, a)) : ((e.lanes & n) !== 0 && (oo(e, t), mo(t, null, null, n), po()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ua(t, Y, r), r !== a.cache && pa(t, [Y], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ua(t, Y, r))), Oc(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : Xi && Ki(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Rc(e, t), Oc(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function sl(e) {
		e.flags |= 4;
	}
	function cl(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Jm(t, r) : Jm(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Wd()) e.flags |= 8192;
				else throw qa = Ua, Va;
			}
		} else e.flags &= -16777217;
	}
	function ll(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Ym(t)) {
			if (Wd()) e.flags |= 8192;
			else throw qa = Ua, Va;
		}
	}
	function ul(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : it(), e.lanes |= t, dd |= t);
	}
	function dl(e, t) {
		if (!Xi) switch (e.tailMode) {
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
	function fl(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function pl(e, t, n) {
		var r = t.pendingProps;
		switch (J(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return fl(t), null;
			case 1: return fl(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), da(Y), W(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ra(t) ? sl(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, aa())), fl(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (sl(t), o === null ? (fl(t), cl(t, a, null, r, n)) : (fl(t), ll(t, o))) : o ? o === e.memoizedState ? (fl(t), t.flags &= -16777217) : (sl(t), fl(t), ll(t, o)) : (e = e.memoizedProps, e !== r && sl(t), fl(t), cl(t, a, e, r, n)), null;
			case 27:
				if (xe(t), n = _e.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && sl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return fl(t), t.subtreeFlags &= -33554433, null;
					}
					e = he.current, ra(t) ? ta(t, e) : (e = gm(a, r, n), t.stateNode = e, sl(t));
				}
				return fl(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (xe(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && sl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return fl(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = he.current, ra(t)) ta(t, o);
					else {
						var s = pp(_e.current);
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
						o[gt] = t, o[_t] = r;
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
						a: switch (op(o, a, r), a) {
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
						r && sl(t);
					}
				}
				return fl(t), t.subtreeFlags &= -33554433, cl(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && sl(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = _e.current, ra(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Ji, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[gt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || rp(e.nodeValue, n)), e || ea(t, !0);
					} else e = pp(e).createTextNode(r), e[gt] = t, t.stateNode = e;
				}
				return fl(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ra(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[gt] = t;
						} else ia(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						fl(t), e = !1;
					} else n = aa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Oo(t), t) : (Oo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return fl(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ra(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[gt] = t;
						} else ia(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						fl(t), a = !1;
					} else a = aa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Oo(t), t) : (Oo(t), null);
				}
				return Oo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), ul(t, t.updateQueue), fl(t), null);
			case 4: return W(), e === null && qf(t.stateNode.containerInfo), t.flags |= 67108864, fl(t), null;
			case 10: return da(t.type), fl(t), null;
			case 19:
				if (jo(t), r = t.memoizedState, r === null) return fl(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) dl(r, !1);
					else {
						if (od !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = Mo(e), o !== null) {
								for (t.flags |= 128, dl(r, !1), e = o.updateQueue, t.updateQueue = e, ul(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Di(n, e), n = n.sibling;
								return Ao(t, ko.current & 1 | 2), Xi && Wi(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Pe() > _d && (t.flags |= 128, a = !0, dl(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = Mo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, ul(t, e), dl(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !Xi) return fl(t), null;
						} else 2 * Pe() - r.renderingStartTime > _d && n !== 536870912 && (t.flags |= 128, a = !0, dl(r, !1), t.lanes = 4194304);
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
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Pe(), e.sibling = null, o = ko.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || Xi ? Ao(t, o) : (n = o, U(So, t), U(ko, n), Co === null && (Co = t)), Xi && Wi(t, r.treeForkCount), e;
				}
				return fl(t), null;
			case 22:
			case 23: return Oo(t), xo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (fl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : fl(t), n = t.updateQueue, n !== null && ul(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && me(Ia), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), da(Y), fl(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, fl(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function ml(e, t) {
		switch (J(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return da(Y), W(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return xe(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Oo(t), t.alternate === null) throw Error(i(340));
					ia();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Oo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					ia();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return jo(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return W(), null;
			case 10: return da(t.type), null;
			case 22:
			case 23: return Oo(t), xo(), e !== null && me(Ia), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return da(Y), null;
			case 25: return null;
			default: return null;
		}
	}
	function hl(e, t) {
		switch (J(t), t.tag) {
			case 3:
				da(Y), W();
				break;
			case 26:
			case 27:
			case 5:
				xe(t);
				break;
			case 4:
				W();
				break;
			case 31:
				t.memoizedState !== null && Oo(t);
				break;
			case 13:
				Oo(t);
				break;
			case 19:
				jo(t);
				break;
			case 10:
				da(t.type);
				break;
			case 22:
			case 23:
				Oo(t), xo(), e !== null && me(Ia);
				break;
			case 24: da(Y);
		}
	}
	function gl(e, t) {
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
			hf(t, t.return, e);
		}
	}
	function _l(e, t, n) {
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
								hf(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			hf(t, t.return, e);
		}
	}
	function vl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				go(t, n);
			} catch (t) {
				hf(e, e.return, t);
			}
		}
	}
	function yl(e, t, n) {
		n.props = gc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			hf(e, t, n);
		}
	}
	function bl(e, t) {
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
						var i = e.stateNode, a = ui(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Lp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Rp(e);
							h(e.child, !1, em, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			hf(e, t, n);
		}
	}
	function xl(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				hf(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				hf(e, t, n);
			}
			else n.current = null;
		}
	}
	function Sl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) nm(e.stateNode, t[n]);
	}
	function Cl(e) {
		for (var t = e.return; t !== null && (El(t) && nm(e.stateNode, t.stateNode), !Tl(t));) t = t.return;
	}
	function wl(e) {
		for (var t = e.return; t !== null && (El(t) && rm(e.stateNode, t.stateNode), !Tl(t));) t = t.return;
	}
	function Tl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function El(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function Dl(e) {
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
			hf(e, e.return, t);
		}
	}
	function Ol(e, t, n) {
		try {
			var r = e.stateNode;
			cp(r, e.type, n, t), r[_t] = t;
		} catch (t) {
			hf(e, e.return, t);
		}
	}
	function kl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ep(e.type) || e.tag === 4;
	}
	function Al(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || kl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Ep(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function jl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = fn)), Sl(e, r), Bt = !0;
		else if (i !== 4 && (i === 27 && (Sl(e, r), r = null, Ep(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (jl(e, t, n, r), e = e.sibling; e !== null;) jl(e, t, n, r), e = e.sibling;
	}
	function Ml(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), Sl(e, r), Bt = !0;
		else if (i !== 4 && (i === 27 && (Sl(e, r), r = null, Ep(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Ml(e, t, n, r), e = e.sibling; e !== null;) Ml(e, t, n, r), e = e.sibling;
	}
	function Nl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			op(t, r, n), t[gt] = e, t[_t] = n;
		} catch (t) {
			hf(e, e.return, t);
		}
	}
	var Pl = !1, Fl = null;
	function Il(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Pl = !0);
	}
	var Ll = null;
	function Rl() {
		var e = Ll;
		return Ll = null, e;
	}
	var zl = 0;
	function Bl(e, t, n, r, i) {
		return zl = 0, Vl(e.child, t, n, r, i);
	}
	function Vl(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Mp(o);
					r.push(s), s.view && (a = !0);
				} else a || Mp(o).view && (a = !0);
				Pl = !0, kp(o, zl === 0 ? t : t + "_" + zl, n), zl++;
			} else e.tag === 22 && e.memoizedState !== null || e.tag === 30 && i || Vl(e.child, t, n, r, i) && (a = !0);
			e = e.sibling;
		}
		return a;
	}
	function Hl(e, t) {
		for (; e !== null;) e.tag === 5 ? Ap(e.stateNode, e.memoizedProps) : e.tag === 22 && e.memoizedState !== null || e.tag === 30 && t || Hl(e.child, t), e = e.sibling;
	}
	function Ul(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (Ul(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = q(t.default, t.share), t !== "none" && (Bl(e, n, t, null, !1) || Hl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Wl(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = ui(r, n), a = q(r.default, n.paired ? r.share : r.enter);
			a === "none" ? Ul(e) : Bl(e, i, a, null, !1) ? (Ul(e), n.paired || t || Pd(e, r.onEnter)) : Hl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Wl(e, t), e = e.sibling;
		else Ul(e);
	}
	function Gl(e) {
		if (Fl !== null && Fl.size !== 0) {
			var t = Fl;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = q(n.default, n.share);
								if (a !== "none" && (Bl(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Pd(e, n.onShare)) : Hl(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					Gl(e);
				}
				e = e.sibling;
			}
		}
	}
	function Kl(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = ui(t, e.stateNode), r = Fl === null ? void 0 : Fl.get(n), i = q(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Bl(e, n, i, null, !1) ? r === void 0 ? Pd(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Fl.delete(n), Pd(e, t.onShare)) : Hl(e.child, !1)), Fl !== null && Gl(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Kl(e), e = e.sibling;
		else Fl !== null && Gl(e);
	}
	function ql(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = ui(t, e.stateNode);
				t = q(t.default, t.update), e.flags &= -5, t !== "none" && Bl(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && ql(e);
			e = e.sibling;
		}
	}
	function Jl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, Hl(e.child, !1));
				}
				Jl(e);
			}
			e = e.sibling;
		}
	}
	function Yl(e) {
		if (e.tag === 30) e.stateNode.paired = null, Hl(e.child, !1), Jl(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Yl(e), e = e.sibling;
		else Jl(e);
	}
	function Xl(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? Hl(e.child, !1) : e.subtreeFlags & 33554432 && Xl(e), e = e.sibling;
	}
	function Zl(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && zl < a.length) {
					var l = a[zl], u = Mp(c);
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
				e.flags & 4 && kp(c, zl === 0 ? n : n + "_" + zl, i), s && e.flags & 4 || (Ll === null && (Ll = []), Ll.push(c, zl === 0 ? r : r + "_" + zl, t.memoizedProps)), zl++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : Zl(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function Ql(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = ui(n, r), a = q(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(X);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				zl = 0, i = Zl(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Pd(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && Ql(e, t);
			e = e.sibling;
		}
	}
	var $l = !1, eu = !1, tu = !1, nu = !1, ru = typeof WeakSet == "function" ? WeakSet : Set, iu = null, au = !1, ou = !1, su = !1, cu = !1;
	function lu(e, t, n) {
		if (e = e.containerInfo, dp = gh, e = Vr(e), Hr(e)) {
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
		for (fp = {
			focusedElem: e,
			selectionRange: r
		}, gh = !1, n = (n & 335544064) === n, iu = t, t = n ? 9270 : 1024; iu !== null;) {
			if (e = iu, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && Kl(r[a]);
			if (e.alternate === null && e.flags & 2) n && Il(e), uu(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && Kl(r), uu(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Il(e), uu(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, iu = r) : (n && ql(e), uu(n));
			}
		}
		Fl = null;
	}
	function uu(e) {
		for (; iu !== null;) {
			var t = iu, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = gc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							hf(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) Q(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								Q(r);
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
					n && r !== null && (n = ui(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = q(a.default, a.update), a !== "none" && Bl(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, iu = r;
				break;
			}
			iu = t.return;
		}
	}
	function du(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				ju(e, n), r & 4 && gl(5, n);
				break;
			case 1:
				if (ju(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						hf(n, n.return, e);
					}
					else {
						var i = gc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							hf(n, n.return, e);
						}
					}
				}
				r & 64 && vl(n), r & 512 && bl(n, n.return);
				break;
			case 3:
				if (ju(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						go(e, t);
					} catch (e) {
						hf(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Nl(n);
			case 26:
			case 5:
				ju(e, n), t === null && r & 4 && Dl(n), r & 512 && bl(n, n.return);
				break;
			case 12:
				ju(e, n);
				break;
			case 31:
				ju(e, n), r & 4 && bu(e, n);
				break;
			case 13:
				ju(e, n), r & 4 && xu(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = yf.bind(null, n), lm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || $l, !r) {
					var a = t !== null && t.memoizedState !== null || eu;
					t = $l, i = eu, $l = r, (eu = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), Nu(e, n, r)) : ju(e, n), $l = t, eu = i;
				}
				break;
			case 30:
				ju(e, n), r & 512 && bl(n, n.return);
				break;
			case 7: r & 512 && bl(n, n.return);
			default: ju(e, n);
		}
	}
	function fu(e, t) {
		for (e = e.child; e !== null;) pu(e, t), e = e.sibling;
	}
	function pu(e, t) {
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
					hf(e, e.return, t);
				}
				mu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, Bt = !0;
				} catch (t) {
					hf(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? Op(s, !0) : Op(e.stateNode, !1);
				} catch (t) {
					hf(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && fu(e, t);
				break;
			default: fu(e, t);
		}
	}
	function mu(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						pu(n, r);
						break a;
					case 22:
						n.memoizedState === null && mu(n, r);
						break a;
					default: mu(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function hu(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, hu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Tt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var gu = null, _u = !1;
	function vu(e, t, n) {
		for (n = n.child; n !== null;) yu(e, t, n), n = n.sibling;
	}
	function yu(e, t, n) {
		if (We && typeof We.onCommitFiberUnmount == "function") try {
			We.onCommitFiberUnmount(Ue, n);
		} catch {}
		switch (n.tag) {
			case 26:
				eu || xl(n, t), vu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !eu && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				eu || xl(n, t), wl(n);
				var r = gu, i = _u;
				Ep(n.type) && (gu = n.stateNode, _u = !1), vu(e, t, n), _m(n.stateNode, n.type, n.memoizedProps), gu = r, _u = i;
				break;
			case 5: eu || xl(n, t), wl(n);
			case 6:
				if (n.tag === 6 && wl(n), r = gu, i = _u, gu = null, vu(e, t, n), gu = r, _u = i, gu !== null) {
					if (_u) try {
						(gu.nodeType === 9 ? gu.body : gu.nodeName === "HTML" ? gu.ownerDocument.body : gu).removeChild(n.stateNode), Bt = !0;
					} catch (e) {
						hf(n, t, e);
					}
					else try {
						gu.removeChild(n.stateNode), Bt = !0;
					} catch (e) {
						hf(n, t, e);
					}
				}
				break;
			case 18:
				gu !== null && (_u ? (e = gu, Dp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Hh(e)) : Dp(gu, n.stateNode));
				break;
			case 4:
				r = gu, i = _u, gu = n.stateNode.containerInfo, _u = !0, vu(e, t, n), gu = r, _u = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				_l(2, n, t), eu || _l(4, n, t), vu(e, t, n);
				break;
			case 1:
				eu || (xl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && yl(n, t, r)), vu(e, t, n);
				break;
			case 21:
				vu(e, t, n);
				break;
			case 22:
				eu = (r = eu) || n.memoizedState !== null, vu(e, t, n), eu = r;
				break;
			case 30:
				xl(n, t), vu(e, t, n);
				break;
			case 7:
				eu || xl(n, t), vu(e, t, n);
				break;
			default: vu(e, t, n);
		}
	}
	function bu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Hh(e);
			} catch (e) {
				hf(t, t.return, e);
			}
		}
	}
	function xu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Hh(e);
		} catch (e) {
			hf(t, t.return, e);
		}
	}
	function Su(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new ru()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new ru()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function Cu(e, t) {
		var n = Su(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = bf.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function wu(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Ep(l.type)) {
							gu = l.stateNode, _u = !1;
							break a;
						}
						break;
					case 5:
						gu = l.stateNode, _u = !1;
						break a;
					case 3:
					case 4:
						gu = l.stateNode.containerInfo, _u = !0;
						break a;
				}
				l = l.return;
			}
			if (gu === null) throw Error(i(160));
			yu(s, c, o), gu = null, _u = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Eu(t, e, n), t = t.sibling;
	}
	var Tu = null;
	function Eu(e, t, n) {
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
				wu(t, e, n), Du(e), a & 4 && (_l(3, e, e.return), gl(3, e), _l(5, e, e.return));
				break;
			case 1:
				wu(t, e, n), Du(e), a & 512 && (eu || r === null || xl(r, r.return)), a & 64 && $l && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = Tu, wu(t, e, n), Du(e), a & 512 && (eu || r === null || xl(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if ($l) e.stateNode = gp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[Ct] || r[gt] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), op(r, t, n), r[gt] = e, At(r), t = r;
												break a;
											case "link":
												if (o = Gm("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), op(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = Gm("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), op(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[gt] = e, At(r), t = r;
									}
									e.stateNode = t;
								}
							} else $l || Km(o, e.type, e.stateNode);
						} else e.stateNode = Bm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Ol(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || eu || t.parentNode.removeChild(t)) : a.count--, n === null ? $l || Km(o, e.type, e.stateNode) : Bm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				wu(t, e, n), Du(e), a & 512 && (eu || r === null || xl(r, r.return)), r !== null && a & 4 && Ol(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = tu, tu = !1, wu(t, e, n), tu = o, Du(e), a & 512 && (eu || r === null || xl(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						rn(t, ""), Bt = !0;
					} catch (t) {
						hf(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Ol(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (nu = !0);
				break;
			case 6:
				if (wu(t, e, n), Du(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, Bt = !0;
					} catch (t) {
						hf(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bt = !1, Wm = null, o = Tu, Tu = xm(t.containerInfo), wu(t, e, n), Tu = o, Du(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Hh(t.containerInfo);
				} catch (t) {
					hf(e, e.return, t);
				}
				nu && (nu = !1, Ou(e)), Bt = !1;
				break;
			case 4:
				a = tu, tu = $l, r = Vt(), o = Tu, Tu = xm(e.stateNode.containerInfo), wu(t, e, n), Du(e), Tu = o, Bt && ou && (su = !0), Bt = r, tu = a;
				break;
			case 12:
				wu(t, e, n), Du(e);
				break;
			case 31:
				wu(t, e, n), Du(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Cu(e, t)));
				break;
			case 13:
				wu(t, e, n), Du(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (hd = Pe()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Cu(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = $l, l = eu, u = tu;
				$l = c || o, tu = u || o, eu = l || s, wu(t, e, n), eu = l, tu = u, $l = c, Du(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || $l || eu || (t = s || eu, n = $l, r = eu, $l = o || $l, eu = t, Mu(e, 2), $l = n, eu = r), !o && tu || fu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Cu(e, n))));
				break;
			case 19:
				wu(t, e, n), Du(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Cu(e, t)));
				break;
			case 30:
				a & 512 && (eu || r === null || xl(r, r.return)), a = Vt(), o = ou, s = (n & 335544064) === n, c = e.memoizedProps, ou = s && q(c.default, c.update) !== "none", wu(t, e, n), Du(e), s && r !== null && Bt && (e.flags |= 4), ou = o, Bt = a;
				break;
			case 21: break;
			case 7: a & 512 && (eu || r === null || xl(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: wu(t, e, n), Du(e);
		}
	}
	function Du(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (kl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (El(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Tl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						Ml(e, Al(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (rn(l, ""), n.flags &= -33), Ml(e, Al(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						jl(e, Al(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				hf(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Ou(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Ou(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gh = !0, t.reset(), gh = !1), e = e.sibling;
		}
	}
	function ku(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Au(t, e), t = t.sibling;
		else Ql(t, !1);
	}
	function Au(e, t) {
		var n = e.alternate;
		if (n === null) Wl(e, !1);
		else switch (e.tag) {
			case 3:
				if (cu = au = !1, Rl(), ku(t, e), !au && !su) {
					if (e = Ll, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Ap(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
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
					})), cu = !0;
				}
				Ll = null;
				break;
			case 5:
				ku(t, e);
				break;
			case 4:
				r = au, au = !1, ku(t, e), au && (su = !0), au = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? ku(t, e) : Wl(e, !1));
				break;
			case 30:
				r = au, i = Rl(), au = !1, ku(t, e), au && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = ui(a, o), o = ui(n.memoizedProps, o);
				var s = q(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, zl = 0, t = Zl(e, n, t, o, s, a, !0), zl !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Pd(e, e.memoizedProps.onUpdate), Ll = i) : i !== null && (i.push.apply(i, Ll), Ll = i), au = e.flags & 32 ? !0 : r;
				break;
			default: ku(t, e);
		}
	}
	function ju(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) du(e, t.alternate, t), t = t.sibling;
	}
	function Mu(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					_l(4, n, n.return), Mu(n, r);
					break;
				case 1:
					xl(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && yl(n, n.return, i), Mu(n, r);
					break;
				case 27: r & 2 && _m(n.stateNode, n.type, n.memoizedProps);
				case 5:
					xl(n, n.return), n.tag !== 5 && n.tag !== 27 || wl(n), Mu(n, r);
					break;
				case 6:
					wl(n);
					break;
				case 26:
					xl(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || eu || i.parentNode.removeChild(i), Mu(n, r);
					break;
				case 22:
					n.memoizedState === null && Mu(n, r);
					break;
				case 30:
					xl(n, n.return), Mu(n, r);
					break;
				case 7: xl(n, n.return);
				default: Mu(n, r);
			}
			e = e.sibling;
		}
	}
	function Nu(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Nu(i, a, n), gl(4, a);
					break;
				case 1:
					if (Nu(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						hf(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) ho(l[i], c);
						} catch (e) {
							hf(r, r.return, e);
						}
					}
					s && o & 64 && vl(a), bl(a, a.return);
					break;
				case 27: n & 2 && Nl(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || Cl(a), Nu(i, a, n), s && r === null && o & 4 && Dl(a), bl(a, a.return);
					break;
				case 6:
					Cl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || $l || Km(xm(c.ownerDocument), a.type, c), Nu(i, a, n), s && r === null && o & 4 && Dl(a), bl(a, a.return);
					break;
				case 12:
					Nu(i, a, n);
					break;
				case 31:
					Nu(i, a, n), s && o & 4 && bu(i, a);
					break;
				case 13:
					Nu(i, a, n), s && o & 4 && xu(i, a);
					break;
				case 22:
					a.memoizedState === null && Nu(i, a, n), bl(a, a.return);
					break;
				case 30:
					Nu(i, a, n), bl(a, a.return);
					break;
				case 7: bl(a, a.return);
				default: Nu(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Pu(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && wa(n));
	}
	function Fu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && wa(e));
	}
	function Iu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Lu(e, t, n, r), t = t.sibling;
		else i && Xl(t);
	}
	function Lu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && Yl(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Iu(e, t, n, r), a & 2048 && gl(9, t);
				break;
			case 1:
				Iu(e, t, n, r);
				break;
			case 3:
				Iu(e, t, n, r), i && cu && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && wa(a)));
				break;
			case 12:
				if (a & 2048) {
					Iu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						hf(t, t.return, e);
					}
				} else Iu(e, t, n, r);
				break;
			case 31:
				Iu(e, t, n, r);
				break;
			case 13:
				Iu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && Yl(t), o._visibility & 2 ? Iu(e, t, n, r) : (o._visibility |= 2, Ru(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && Yl(s), o._visibility & 2 ? Iu(e, t, n, r) : zu(e, t)), a & 2048 && Pu(s, t);
				break;
			case 24:
				Iu(e, t, n, r), a & 2048 && Fu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Hl(a.child, !0), Hl(t.child, !0))), Iu(e, t, n, r);
				break;
			default: Iu(e, t, n, r);
		}
	}
	function Ru(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Ru(a, o, s, c, i), gl(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Ru(a, o, s, c, i)) : u._visibility & 2 ? Ru(a, o, s, c, i) : zu(a, o), i && l & 2048 && Pu(o.alternate, o);
					break;
				case 24:
					Ru(a, o, s, c, i), i && l & 2048 && Fu(o.alternate, o);
					break;
				default: Ru(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function zu(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					zu(n, r), i & 2048 && Pu(r.alternate, r);
					break;
				case 24:
					zu(n, r), i & 2048 && Fu(r.alternate, r);
					break;
				default: zu(n, r);
			}
			t = t.sibling;
		}
	}
	var Bu = 8192;
	function Vu(e, t, n) {
		if (e.subtreeFlags & Bu) for (e = e.child; e !== null;) Hu(e, t, n), e = e.sibling;
	}
	function Hu(e, t, n) {
		switch (e.tag) {
			case 26:
				Vu(e, t, n), e.flags & Bu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Zm(n, e)) : Qm(n, Tu, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Vu(e, t, n), e.flags & Bu && (e = e.stateNode, (t & 335544128) === t && Zm(n, e));
				break;
			case 3:
			case 4:
				var r = Tu;
				Tu = xm(e.stateNode.containerInfo), Vu(e, t, n), Tu = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Bu, Bu = 16777216, Vu(e, t, n), Bu = r) : Vu(e, t, n));
				break;
			case 30:
				if ((e.flags & Bu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Fl === null && (Fl = /* @__PURE__ */ new Map()), Fl.set(r, i);
				}
				Vu(e, t, n);
				break;
			default: Vu(e, t, n);
		}
	}
	function Uu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Wu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				iu = r, qu(r, e);
			}
			Uu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Gu(e), e = e.sibling;
	}
	function Gu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Wu(e), e.flags & 2048 && _l(9, e, e.return);
				break;
			case 3:
				Wu(e);
				break;
			case 12:
				Wu(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ku(e)) : Wu(e);
				break;
			default: Wu(e);
		}
	}
	function Ku(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				iu = r, qu(r, e);
			}
			Uu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					_l(8, t, t.return), Ku(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Ku(t));
					break;
				default: Ku(t);
			}
			e = e.sibling;
		}
	}
	function qu(e, t) {
		for (; iu !== null;) {
			var n = iu;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					_l(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: wa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, iu = r;
			else a: for (n = e; iu !== null;) {
				r = iu;
				var i = r.sibling, a = r.return;
				if (hu(r), r === n) {
					iu = null;
					break a;
				}
				if (i !== null) {
					i.return = a, iu = i;
					break a;
				}
				iu = a;
			}
		}
	}
	var Ju = {
		getCacheForType: function(e) {
			var t = _a(Y), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return _a(Y).controller.signal;
		}
	}, Yu = typeof WeakMap == "function" ? WeakMap : Map, Xu = 0, Zu = null, Qu = null, $u = 0, ed = 0, td = null, nd = !1, rd = !1, id = !1, ad = 0, od = 0, sd = 0, cd = 0, ld = 0, ud = 0, dd = 0, fd = null, pd = null, md = !1, hd = 0, gd = 0, _d = Infinity, vd = null, yd = null, bd = 0, xd = null, Sd = null, Cd = 0, wd = 0, Td = null, Ed = null, Dd = null, Od = null, kd = null, Ad = 0, jd = null;
	function Md() {
		return Xu & 2 && $u !== 0 ? $u & -$u : H.T === null ? pt() : If();
	}
	function Nd() {
		if (ud === 0) {
			if (!($u & 536870912) || Xi) {
				var e = Ze;
				Ze <<= 1, !(Ze & 3932160) && (Ze = 262144), ud = e;
			} else ud = 536870912;
		}
		return e = So.current, e !== null && (e.flags |= 32), ud;
	}
	function Pd(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Lp(ui(e.memoizedProps, n))), Od === null && (Od = []), Od.push(t.bind(null, r));
		}
	}
	function Fd(e, t, n) {
		(e === Zu && (ed === 2 || ed === 9) || e.cancelPendingCommit !== null) && (Hd(e, 0), zd(e, $u, ud, !1)), ot(e, n), Xu & 2 && e === Zu || (e === Zu && (!(Xu & 2) && (cd |= n), od === 4 && zd(e, $u, ud, !1)), Of(e));
	}
	function Id(e, t, n) {
		if (Xu & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || tt(e, t), a = r ? Xd(e, t) : Jd(e, t, !0), o = r;
		do {
			if (a === 0) {
				rd && !r && zd(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Rd(n)) a = Jd(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = fd;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Hd(c, s).flags |= 256), s = Jd(c, s, !1), s !== 2 && s !== 6) {
								if (id && !l) {
									c.errorRecoveryDisabledLanes |= o, cd |= o, a = 4;
									break a;
								}
								o = pd, pd = a, o !== null && (pd === null ? pd = o : pd.push.apply(pd, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Hd(e, 0), zd(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							zd(r, t, ud, !nd);
							break a;
						case 2:
							pd = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = hd + 300 - Pe(), 10 < a)) {
						if (zd(r, t, ud, !nd), et(r, 0, !0) !== 0) break a;
						Cd = t, r.timeoutHandle = bp(Ld.bind(null, r, n, pd, vd, md, t, ud, cd, dd, nd, o, "Throttled", -0, 0), a);
						break a;
					}
					Ld(r, n, pd, vd, md, t, ud, cd, dd, nd, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		Of(e);
	}
	function Ld(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
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
			unsuspend: fn
		}, Fl = null, Hu(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = nh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? hd - Pe() : (a & 4194048) === a ? gd - Pe() : 0, m = eh(d, m), m !== null) ? (Cd = a, e.cancelPendingCommit = m(rf.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), zd(e, a, o, !l)) : rf(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Rd(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Fr(a(), i)) return !1;
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
	function zd(e, t, n, r) {
		t = nt(e, t), t &= ~ld, t &= ~cd, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ke(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && ct(e, n, t);
	}
	function Bd() {
		return Xu & 6 ? !0 : (kf(0, !1), !1);
	}
	function Vd() {
		if (Qu !== null) {
			if (ed === 0) var e = Qu.return;
			else e = Qu, la = ca = null, Qo(e), Xa = null, Za = 0, e = Qu;
			for (; e !== null;) hl(e.alternate, e), e = e.return;
			Qu = null;
		}
	}
	function Hd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, xp(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Cd = 0, Vd(), Zu = e, Qu = n = Ei(e.current, null), $u = t, ed = 0, td = null, nd = !1, rd = tt(e, t), id = !1, dd = ud = ld = cd = sd = od = 0, pd = fd = null, md = !1, ad = nt(e, t), gi(), n;
	}
	function Ud(e, t) {
		Po = null, H.H = cc, t === Ba || t === Ha ? (t = Ja(), ed = 3) : t === Va ? (t = Ja(), ed = 4) : ed = t === Ec ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, td = t, Qu === null && (od = 1, bc(e, Pi(t, e.current)));
	}
	function Wd() {
		var e = So.current;
		return e === null ? !0 : ($u & 4194048) === $u ? Co === null : ($u & 62914560) === $u || $u & 536870912 ? e === Co : !1;
	}
	function Gd() {
		var e = H.H;
		return H.H = cc, e === null ? cc : e;
	}
	function Kd() {
		var e = H.A;
		return H.A = Ju, e;
	}
	function qd() {
		od = 4, nd || ($u & 4194048) !== $u && So.current !== null || (rd = !0), !(sd & 134217727) && !(cd & 134217727) || Zu === null || zd(Zu, $u, ud, !1);
	}
	function Jd(e, t, n) {
		var r = Xu;
		Xu |= 2;
		var i = Gd(), a = Kd();
		(Zu !== e || $u !== t) && (vd = null, Hd(e, t)), t = !1;
		var o = od;
		a: do
			try {
				if (ed !== 0 && Qu !== null) {
					var s = Qu, c = td;
					switch (ed) {
						case 8:
							Vd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							So.current === null && (t = !0);
							var l = ed;
							if (ed = 0, td = null, ef(e, s, c, l), n && rd) {
								o = 0;
								break a;
							}
							break;
						default: l = ed, ed = 0, td = null, ef(e, s, c, l);
					}
				}
				Yd(), o = od;
				break;
			} catch (t) {
				Ud(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, la = ca = null, Xu = r, H.H = i, H.A = a, Qu === null && (Zu = null, $u = 0, gi()), o;
	}
	function Yd() {
		for (; Qu !== null;) Qd(Qu);
	}
	function Xd(e, t) {
		var n = Xu;
		Xu |= 2;
		var r = Gd(), a = Kd();
		Zu !== e || $u !== t ? (vd = null, _d = Pe() + 500, Hd(e, t)) : rd = tt(e, t);
		a: do
			try {
				if (ed !== 0 && Qu !== null) {
					t = Qu;
					var o = td;
					b: switch (ed) {
						case 1:
							ed = 0, td = null, ef(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Wa(o)) {
								ed = 0, td = null, $d(t);
								break;
							}
							t = function() {
								ed !== 2 && ed !== 9 || Zu !== e || (ed = 7), Of(e);
							}, o.then(t, t);
							break a;
						case 3:
							ed = 7;
							break a;
						case 4:
							ed = 5;
							break a;
						case 7:
							Wa(o) ? (ed = 0, td = null, $d(t)) : (ed = 0, td = null, ef(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Qu.tag) {
								case 26: s = Qu.memoizedState;
								case 5:
								case 27:
									var c = Qu;
									if (s ? Ym(s) : c.stateNode.complete) {
										ed = 0, td = null;
										var l = c.sibling;
										if (l !== null) Qu = l;
										else {
											var u = c.return;
											u === null ? Qu = null : (Qu = u, tf(u));
										}
										break b;
									}
							}
							ed = 0, td = null, ef(e, t, o, 5);
							break;
						case 6:
							ed = 0, td = null, ef(e, t, o, 6);
							break;
						case 8:
							Vd(), od = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Zd();
				break;
			} catch (t) {
				Ud(e, t);
			}
		while (1);
		return la = ca = null, H.H = r, H.A = a, Xu = n, Qu === null ? (Zu = null, $u = 0, gi(), od) : 0;
	}
	function Zd() {
		for (; Qu !== null && !Me();) Qd(Qu);
	}
	function Qd(e) {
		var t = ol(e.alternate, e, ad);
		e.memoizedProps = e.pendingProps, t === null ? tf(e) : Qu = t;
	}
	function $d(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Bc(n, t, t.pendingProps, t.type, void 0, $u);
				break;
			case 11:
				t = Bc(n, t, t.pendingProps, t.type.render, t.ref, $u);
				break;
			case 5:
				Qo(t);
				var r = t;
				r === Ji && (Xi ? (na(r), r.tag === 5 && r.stateNode != null && (Yi = r.stateNode)) : (na(r), Xi = !0));
			default: hl(n, t), t = Qu = Di(t, ad), t = ol(n, t, ad);
		}
		e.memoizedProps = e.pendingProps, t === null ? tf(e) : Qu = t;
	}
	function ef(e, t, n, r) {
		la = ca = null, Qo(t), Xa = null, Za = 0;
		var i = t.return;
		try {
			if (Tc(e, i, t, n, $u)) {
				od = 1, bc(e, Pi(n, e.current)), Qu = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Qu = i, t;
			od = 1, bc(e, Pi(n, e.current)), Qu = null;
			return;
		}
		t.flags & 32768 ? (Xi || r === 1 ? e = !0 : rd || $u & 536870912 ? e = !1 : (nd = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = So.current, r !== null && r.tag === 13 && (r.flags |= 16384))), nf(t, e)) : tf(t);
	}
	function tf(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				nf(t, nd);
				return;
			}
			e = t.return;
			var n = pl(t.alternate, t, ad);
			if (n !== null) {
				Qu = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Qu = t;
				return;
			}
			Qu = t = e;
		} while (t !== null);
		od === 0 && (od = 5);
	}
	function nf(e, t) {
		do {
			var n = ml(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Qu = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Qu = e;
				return;
			}
			Qu = e = n;
		} while (e !== null);
		od = 6, Qu = null;
	}
	function rf(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			ff();
		while (bd !== 0);
		if (Xu & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === Zu && (Qu = Zu = null, $u = 0), Sd = t, xd = e, Cd = n, Td = a, Ed = r, af(e, t, n, s, c, l, f);
		}
	}
	function af(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (wd = s, s |= hi, st(e, n, s, r, i, a), Od = null, (n & 335544064) === n ? (kd = Da(e), r = 10262) : (kd = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, xf(Re, function() {
			return pf(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Pl = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = H.T, H.T = null, i = le.p, le.p = 2, a = Xu, Xu |= 4;
			try {
				lu(e, t, n);
			} finally {
				Xu = a, le.p = i, H.T = r;
			}
		}
		bd = 1, Pl ? Dd = Fp(o, e.containerInfo, kd, cf, lf, sf, uf, pf, of, null, null) : (cf(), lf(), uf());
	}
	function of(e) {
		if (bd !== 0) {
			var t = xd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function sf() {
		bd === 3 && (bd = 0, Au(Sd, xd), bd = 4);
	}
	function cf() {
		if (bd === 1) {
			bd = 0;
			var e = xd, t = Sd, n = Cd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = H.T, H.T = null;
				var i = le.p;
				le.p = 2;
				var a = Xu;
				Xu |= 4;
				try {
					ou = su = !1, Eu(t, e, n), n = fp;
					var o = Vr(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && Br(s.ownerDocument.documentElement, s)) {
						if (c !== null && Hr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = zr(s, h), v = zr(s, g);
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
					gh = !!dp, fp = dp = null;
				} finally {
					Xu = a, le.p = i, H.T = r;
				}
			}
			e.current = t, bd = 2;
		}
	}
	function lf() {
		if (bd === 2) {
			bd = 0;
			var e = xd, t = Sd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = H.T, H.T = null;
				var r = le.p;
				le.p = 2;
				var i = Xu;
				Xu |= 4;
				try {
					du(e, t.alternate, t);
				} finally {
					Xu = i, le.p = r, H.T = n;
				}
			}
			bd = 3;
		}
	}
	function uf() {
		if (bd === 4 || bd === 3) {
			bd = 0;
			var e = Dd;
			Dd = null, Ne();
			var t = xd, n = Sd, r = Cd, i = Ed, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? bd = 5 : (bd = 0, Sd = xd = null, df(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (yd = null), ft(r), n = n.stateNode, We && typeof We.onCommitFiberRoot == "function") try {
				We.onCommitFiberRoot(Ue, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = H.T, a = le.p, le.p = 2, H.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					H.T = n, le.p = a;
				}
			}
			if (i = Od, o = kd, kd = null, i !== null && (Od = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			Cd & 3 && ff(), Of(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === jd ? Ad++ : (Ad = 0, jd = t) : (Ad = 0, jd = null), kf(0, !1);
		}
	}
	function df(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, wa(t)));
	}
	function ff() {
		return Dd !== null && (Dd.skipTransition(), Dd = null), cf(), lf(), uf(), pf();
	}
	function pf() {
		if (bd !== 5) return !1;
		var e = xd, t = wd;
		wd = 0;
		var n = ft(Cd), r = H.T, a = le.p;
		try {
			le.p = 32 > n ? 32 : n, H.T = null, n = Td, Td = null;
			var o = xd, s = Cd;
			if (bd = 0, Sd = xd = null, Cd = 0, Xu & 6) throw Error(i(331));
			var c = Xu;
			if (Xu |= 4, Gu(o.current), Lu(o, o.current, s, n), Xu = c, kf(0, !1), We && typeof We.onPostCommitFiberRoot == "function") try {
				We.onPostCommitFiberRoot(Ue, o);
			} catch {}
			return !0;
		} finally {
			le.p = a, H.T = r, df(e, t);
		}
	}
	function mf(e, t, n) {
		t = Pi(n, t), t = Sc(e.stateNode, t, 2), e = co(e, t, 2), e !== null && (ot(e, 2), Of(e));
	}
	function hf(e, t, n) {
		if (e.tag === 3) mf(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				mf(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (yd === null || !yd.has(r))) {
					e = Pi(n, e), n = Cc(2), r = co(t, n, 2), r !== null && (wc(n, r, t, e), ot(r, 2), Of(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function gf(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Yu();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (id = !0, i.add(n), e = _f.bind(null, e, t, n), t.then(e, e));
	}
	function _f(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Zu === e && ($u & n) === n && (od === 4 || od === 3 && ($u & 62914560) === $u && 300 > Pe() - hd ? Xu & 2 ? ld |= n : Hd(e, 0) : ld |= n, dd === $u && (dd = 0)), Of(e);
	}
	function vf(e, t) {
		t === 0 && (t = it()), e = yi(e, t), e !== null && (ot(e, t), Of(e));
	}
	function yf(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), vf(e, n);
	}
	function bf(e, t) {
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
		r !== null && r.delete(t), vf(e, n);
	}
	function xf(e, t) {
		return Ae(e, t);
	}
	var Sf = null, Cf = null, wf = !1, Tf = !1, Ef = !1, Df = 0;
	function Of(e) {
		e !== Cf && e.next === null && (Cf === null ? Sf = Cf = e : Cf = Cf.next = e), Tf = !0, wf || (wf = !0, Ff());
	}
	function kf(e, t) {
		if (!Ef && Tf) {
			Ef = !0;
			do
				for (var n = !1, r = Sf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - Ke(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Pf(r, a));
						} else a = $u, a = et(r, r === Zu ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || tt(r, a) || (n = !0, Pf(r, a));
					}
					r = r.next;
				}
			while (n);
			Ef = !1;
		}
	}
	function Af() {
		jf();
	}
	function jf() {
		Tf = wf = !1;
		var e = 0;
		Df !== 0 && yp() && (e = Df);
		for (var t = Pe(), n = null, r = Sf; r !== null;) {
			var i = r.next, a = Mf(r, t);
			a === 0 ? (r.next = null, n === null ? Sf = i : n.next = i, i === null && (Cf = n)) : (n = r, (e !== 0 || a & 3) && (Tf = !0)), r = i;
		}
		bd !== 0 && bd !== 5 || kf(e, !1), Df !== 0 && (Df = 0);
	}
	function Mf(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ke(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = rt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Zu, n = $u, n = et(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (ed === 2 || ed === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && je(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || tt(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && je(r), ft(n)) {
				case 2:
				case 8:
					n = Le;
					break;
				case 32:
					n = Re;
					break;
				case 268435456:
					n = Be;
					break;
				default: n = Re;
			}
			return r = Nf.bind(null, e), n = Ae(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && je(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function Nf(e, t) {
		if (bd !== 0 && bd !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (ff() && e.callbackNode !== n) return null;
		var r = $u;
		return r = et(e, e === Zu ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Id(e, r, t), Mf(e, Pe()), e.callbackNode != null && e.callbackNode === n ? Nf.bind(null, e) : null);
	}
	function Pf(e, t) {
		if (ff()) return null;
		Id(e, t, !0);
	}
	function Ff() {
		wp(function() {
			Xu & 6 ? Ae(Ie, Af) : jf();
		});
	}
	function If() {
		if (Df === 0) {
			var e = Aa;
			e === 0 && (e = Xe, Xe <<= 1, !(Xe & 261888) && (Xe = 256)), Df = e;
		}
		return Df;
	}
	function Lf(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : dn(e);
	}
	function Rf(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Lf((i[_t] || null).action), o = r.submitter;
			o && (t = (t = o[_t] || null) ? Lf(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Nn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Df !== 0) {
								var e = new FormData(i, o);
								Js(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), Js(n, {
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
	for (var zf = 0; zf < ci.length; zf++) {
		var Bf = ci[zf];
		li(Bf.toLowerCase(), "on" + (Bf[0].toUpperCase() + Bf.slice(1)));
	}
	li(ei, "onAnimationEnd"), li(ti, "onAnimationIteration"), li(ni, "onAnimationStart"), li("dblclick", "onDoubleClick"), li("focusin", "onFocus"), li("focusout", "onBlur"), li(ri, "onTransitionRun"), li(ii, "onTransitionStart"), li(ai, "onTransitionCancel"), li(oi, "onTransitionEnd"), Ft("onMouseEnter", ["mouseout", "mouseover"]), Ft("onMouseLeave", ["mouseout", "mouseover"]), Ft("onPointerEnter", ["pointerout", "pointerover"]), Ft("onPointerLeave", ["pointerout", "pointerover"]), Pt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Pt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Pt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Pt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Pt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Pt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Vf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Hf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vf));
	function Uf(e, t) {
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
						fi(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						fi(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Wf(e, t) {
		var n = t[yt];
		n === void 0 && (n = t[yt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Jf(t, e, 2, !1), n.add(r));
	}
	function Gf(e, t, n) {
		var r = 0;
		t && (r |= 4), Jf(n, e, r, t);
	}
	var Kf = "_reactListening" + Math.random().toString(36).slice(2);
	function qf(e) {
		if (!e[Kf]) {
			e[Kf] = !0, Mt.forEach(function(t) {
				t !== "selectionchange" && (Hf.has(t) || Gf(t, !1, e), Gf(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Kf] || (t[Kf] = !0, Gf("selectionchange", !1, t));
		}
	}
	function Jf(e, t, n, r) {
		switch (Ch(t)) {
			case 2:
				var i = _h;
				break;
			case 8:
				i = vh;
				break;
			default: i = yh;
		}
		n = i.bind(null, t, n, e), i = void 0, !Sn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Yf(e, t, n, r, i) {
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
					if (s = Et(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		yn(function() {
			var r = a, i = mn(n), s = [];
			a: {
				var c = si.get(e);
				if (c !== void 0) {
					var l = Nn, u = e;
					switch (e) {
						case "keypress": if (On(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Zn;
							break;
						case "focusin":
							u = "focus", l = Hn;
							break;
						case "focusout":
							u = "blur", l = Hn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Hn;
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
							l = Bn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Vn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = er;
							break;
						case ei:
						case ti:
						case ni:
							l = Un;
							break;
						case oi:
							l = tr;
							break;
						case "scroll":
						case "scrollend":
							l = Fn;
							break;
						case "wheel":
							l = nr;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Wn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Qn;
							break;
						case "submit":
							l = $n;
							break;
						case "toggle":
						case "beforetoggle": l = rr;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = bn(m, p), g != null && d.push(Xf(m, g, h))), f) break;
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
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== pn && (u = n.relatedTarget || n.fromElement) && (Et(u) || u[vt])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Et(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Bn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Qn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Ot(c), h = l == null ? u : Ot(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, Et(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? E(c, l, Qf) : null, c !== null && $f(s, u, c, d, !1), l !== null && f !== null && $f(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Ot(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = Cr;
					else if (_r(c)) {
						if (wr) _ = Nr;
						else {
							_ = jr;
							var v = Ar;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && cn(r.elementType) && (_ = Cr) : _ = Mr;
					if (_ &&= _(e, r)) {
						vr(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Ot(r) : window, e) {
					case "focusin":
						(_r(v) || v.contentEditable === "true") && (Wr = v, Gr = r, Kr = null);
						break;
					case "focusout":
						Kr = Gr = Wr = null;
						break;
					case "mousedown":
						qr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						qr = !1, Jr(s, n, i);
						break;
					case "selectionchange": if (Ur) break;
					case "keydown":
					case "keyup": Jr(s, n, i);
				}
				var y;
				if (ar) b: {
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
				else pr ? dr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (cr && n.locale !== "ko" && (pr || b !== "onCompositionStart" ? b === "onCompositionEnd" && pr && (y = Dn()) : (wn = i, Tn = "value" in wn ? wn.value : wn.textContent, pr = !0)), v = Zf(r, b), 0 < v.length && (b = new Gn(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = fr(n), y !== null && (b.data = y)))), (y = sr ? mr(e, n) : hr(e, n)) && (b = Zf(r, "onBeforeInput"), 0 < b.length && (v = new Gn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), Rf(s, e, r, n, i);
			}
			Uf(s, t);
		});
	}
	function Xf(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Zf(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = bn(e, n), i != null && r.unshift(Xf(e, i, a)), i = bn(e, t), i != null && r.push(Xf(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Qf(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function $f(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = bn(n, a), l != null && o.unshift(Xf(n, l, c))) : i || (l = bn(n, a), l != null && o.push(Xf(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var ep = /\r\n?/g, tp = /\u0000|\uFFFD/g;
	function np(e) {
		return (typeof e == "string" ? e : "" + e).replace(ep, "\n").replace(tp, "");
	}
	function rp(e, t) {
		return t = np(t), np(e) === t;
	}
	function ip(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || rn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && rn(e, "" + r);
				else return;
				break;
			case "className":
				Ut(e, "class", r);
				break;
			case "tabIndex":
				Ut(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Ut(e, n, r);
				break;
			case "style":
				sn(e, r, o);
				return;
			case "data": if (t !== "object") {
				Ut(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = dn(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && ip(e, t, "name", a.name, a, null), ip(e, t, "formEncType", a.formEncType, a, null), ip(e, t, "formMethod", a.formMethod, a, null), ip(e, t, "formTarget", a.formTarget, a, null)) : (ip(e, t, "encType", a.encType, a, null), ip(e, t, "method", a.method, a, null), ip(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = dn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = fn);
				return;
			case "onScroll":
				r != null && Wf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Wf("scrollend", e);
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
				n = dn(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				Wf("beforetoggle", e), Wf("toggle", e), Ht(e, "popover", r);
				break;
			case "xlinkActuate":
				Wt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Wt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Wt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Wt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Wt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Wt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Wt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Wt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Wt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Ht(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = ln.get(n) || n, Ht(e, n, r);
			else return;
		}
		Bt = !0;
	}
	function ap(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				sn(e, r, o);
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
				if (typeof r == "string") rn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") rn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && Wf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Wf("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = fn);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!Nt.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[_t] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					Bt = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Ht(e, n, r);
				}
				return;
		}
		Bt = !0;
	}
	function op(e, t, n) {
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
				Wf("error", e), Wf("load", e);
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
						default: ip(e, t, o, s, n, null);
					}
				}
				a && ip(e, t, "srcSet", n.srcSet, n, null), r && ip(e, t, "src", n.src, n, null);
				return;
			case "input":
				Wf("invalid", e);
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
						default: ip(e, t, r, d, n, null);
					}
				}
				Qt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Wf("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: ip(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && en(e, !!r, n, !0) : en(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Wf("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
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
					default: ip(e, t, s, c, n, null);
				}
				nn(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: ip(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Wf("beforetoggle", e), Wf("toggle", e), Wf("cancel", e), Wf("close", e);
				break;
			case "iframe":
			case "object":
				Wf("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Vf.length; r++) Wf(Vf[r], e);
				break;
			case "image":
				Wf("error", e), Wf("load", e);
				break;
			case "details":
				Wf("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Wf("error", e), Wf("load", e);
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
					default: ip(e, t, u, r, n, null);
				}
				return;
			default: if (cn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && ap(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && ip(e, t, c, r, n, null));
	}
	var sp = {};
	function cp(e, t, n, r) {
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
						default: r.hasOwnProperty(m) || ip(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (Bt = !0), o = m;
							break;
						case "name":
							m !== f && (Bt = !0), a = m;
							break;
						case "checked":
							m !== f && (Bt = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (Bt = !0), d = m;
							break;
						case "value":
							m !== f && (Bt = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (Bt = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && ip(e, t, p, m, r, f);
					}
				}
				Zt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || ip(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (Bt = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (Bt = !0), c = o;
						break;
					case "multiple": o !== l && (Bt = !0), s = o;
					default: o !== l && ip(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? en(e, !!n, n ? [] : "", !1) : en(e, !!n, t, !0)) : en(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: ip(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (Bt = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (Bt = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && ip(e, t, s, a, r, o);
				}
				tn(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: ip(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (Bt = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: ip(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && ip(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: ip(e, t, u, p, r, m);
				}
				return;
			default: if (cn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && ap(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || ap(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && ip(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || ip(e, t, f, p, r, m);
	}
	function lp(e) {
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
	function up() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && lp(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && lp(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var dp = null, fp = null;
	function pp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function mp(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function hp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function gp(e, t, n, r) {
		return n = pp(n).createElement(e), n[gt] = r, n[_t] = t, op(n, e, t), At(n), n;
	}
	function _p(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var vp = null;
	function yp() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== vp && (vp = e, !0) : (vp = null, !1);
	}
	var bp = typeof setTimeout == "function" ? setTimeout : void 0, xp = typeof clearTimeout == "function" ? clearTimeout : void 0, Sp = typeof Promise == "function" ? Promise : void 0, Cp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : bp, wp = typeof queueMicrotask == "function" ? queueMicrotask : Sp === void 0 ? bp : function(e) {
		return Sp.resolve(null).then(e).catch(Tp);
	};
	function Tp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Ep(e) {
		return e === "head";
	}
	function Dp(e, t) {
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
				else if (n === "html") vm(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, vm(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[Ct] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && vm(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Hh(t);
	}
	function Op(e, t) {
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
	function kp(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Ap(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function jp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function Mp(e) {
		return jp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function X(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return jp(t, n, e);
	}
	function Np(e) {
		return e.documentElement.clientHeight;
	}
	function Pp(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Fp(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Np(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += Xm(f), u > $m) {
									s.length = o;
									break;
								}
								f = new Promise(Pp.bind(f)), s.push(f);
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
	function Ip(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Ip.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : D({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Ip.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Ip.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Lp(e) {
		return {
			name: e,
			group: new Ip("group", e),
			imagePair: new Ip("image-pair", e),
			old: new Ip("old", e),
			new: new Ip("new", e)
		};
	}
	function Rp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Rp.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (Hp(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = Bp(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), h(this._fragmentFiber.child, !1, zp, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function zp(e, t, n, r) {
		return b(e).addEventListener(t, n, r), !1;
	}
	Rp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Hp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Bp(i.optionsOrUseCapture), h(this._fragmentFiber.child, !1, Z, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Z(e, t, n, r) {
		return b(e).removeEventListener(t, n, r), !1;
	}
	function Bp(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function Vp(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function Hp(e, t, n, r) {
		if (e.length === 0) return -1;
		r = Vp(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && Vp(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Rp.prototype.dispatchEvent = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return !0;
		t = b(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, Bp(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, Bp(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Rp.prototype.focus = function(e) {
		h(this._fragmentFiber.child, !0, Up, e, void 0, void 0);
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = b(e), mm(e, t));
	}
	Rp.prototype.focusLast = function(e) {
		var t = [];
		h(this._fragmentFiber.child, !0, Wp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Up(t[n], e); n--);
	};
	function Wp(e, t) {
		return t.push(e), !1;
	}
	Rp.prototype.blur = function() {
		var e = g(this._fragmentFiber);
		e !== null && (e = b(e), e = pp(e).activeElement, e !== null && h(this._fragmentFiber.child, !1, Gp, e, void 0, void 0));
	};
	function Gp(e, t) {
		return e.tag !== 6 && (e = b(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Rp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), h(this._fragmentFiber.child, !1, Kp, e, void 0, void 0);
	};
	function Kp(e, t) {
		return e.tag === 6 || (e = b(e), t.observe(e)), !1;
	}
	Rp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), h(this._fragmentFiber.child, !1, qp, e, void 0, void 0);
			for (var n = t = 0; n < Jp.length; n++) {
				var r = Jp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : Jp[t++] = r;
			}
			Jp.length = t;
		}
	};
	function qp(e, t) {
		return e.tag === 6 || (e = b(e), t.unobserve(e)), !1;
	}
	var Jp = [], Yp = !1;
	function Xp(e, t, n) {
		Jp.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), Yp || (Yp = !0, hm(function() {
			Yp = !1;
			var e = Jp;
			Jp = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Rp.prototype.getClientRects = function() {
		var e = [];
		return h(this._fragmentFiber.child, !1, Zp, e, void 0, void 0), e;
	};
	function Zp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = b(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Rp.prototype.getRootNode = function(e) {
		var t = g(this._fragmentFiber);
		return t === null ? this : b(t).getRootNode(e);
	}, Rp.prototype.compareDocumentPosition = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		h(this._fragmentFiber.child, !1, Wp, n, void 0, void 0);
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
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Qp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Qp(e, t, n, r, i) {
		var a = Et(i);
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
	function $p(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Rp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		h(this._fragmentFiber.child, !1, Wp, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = v(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || g(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = b(r), $p(e, n);
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
			a.tag === 6 ? (a = b(a), $p(a, n)) : b(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function em(e, t) {
		return e = b(e), tm(e, t), !1;
	}
	function tm(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function nm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, Bp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < Jp.length; i++) {
				var a = Jp[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (Jp[r++] = a);
			}
			Jp.length = r, n.observe(e);
		}), tm(e, t));
	}
	function rm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, Bp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? Xp(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function Q(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					Q(n), Tt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function im(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[Ct]) switch (t) {
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
			if (e = um(e.nextSibling), e === null) break;
		}
		return null;
	}
	function am(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = um(e.nextSibling), e === null)) return null;
		return e;
	}
	function om(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = um(e.nextSibling), e === null)) return null;
		return e;
	}
	function sm(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function cm(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function lm(e, t) {
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
	function um(e) {
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
	var dm = null;
	function fm(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return um(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function pm(e) {
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
	function mm(e, t) {
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
	function hm(e) {
		Cp(function() {
			Cp(function(t) {
				return e(t);
			});
		});
	}
	function gm(e, t, n) {
		switch (t = pp(n), e) {
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
	function _m(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && ip(e, t, r, null, sp, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === fn && (e.onclick = null), Tt(e);
	}
	function vm(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		Tt(e);
	}
	var ym = /* @__PURE__ */ new Map(), bm = /* @__PURE__ */ new Set();
	function xm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var $ = le.d;
	le.d = {
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
		var e = $.f(), t = Bd();
		return e || t;
	}
	function Cm(e) {
		var t = Dt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Xs(t) : $.r(e);
	}
	var wm = typeof document > "u" ? null : document;
	function Tm(e, t, n) {
		var r = wm;
		if (r && typeof t == "string" && t) {
			var i = G(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), bm.has(i) || (bm.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), op(t, "link", e), At(t), r.head.appendChild(t)));
		}
	}
	function Em(e) {
		$.D(e), Tm("dns-prefetch", e, null);
	}
	function Dm(e, t) {
		$.C(e, t), Tm("preconnect", e, t);
	}
	function Om(e, t, n) {
		$.L(e, t, n);
		var r = wm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + G(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + G(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + G(n.imageSizes) + "\"]")) : i += "[href=\"" + G(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Pm(e);
					break;
				case "script": a = Rm(e);
			}
			if (!(ym.has(a) || (e = D({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), ym.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Fm(a)) || t === "script" && r.querySelector(zm(a))))) {
				var o = r.createElement("link");
				op(o, "link", e), t === "style" && (o[wt] = !0, o.onload = o.onerror = function() {
					jt(o);
				}), At(o), r.head.appendChild(o);
			}
		}
	}
	function km(e, t) {
		$.m(e, t);
		var n = wm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + G(r) + "\"][href=\"" + G(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Rm(e);
			}
			if (!ym.has(a) && (e = D({
				rel: "modulepreload",
				href: e
			}, t), ym.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(zm(a))) return;
				}
				r = n.createElement("link"), op(r, "link", e), At(r), n.head.appendChild(r);
			}
		}
	}
	function Am(e, t, n) {
		$.S(e, t, n);
		var r = wm;
		if (r && e) {
			var i = kt(r).hoistableStyles, a = Pm(e);
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
					}, n), (n = ym.get(a)) && Hm(e, n);
					var c = o = r.createElement("link");
					At(c), op(c, "link", e), c._p = new Promise(function(e, t) {
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
		$.X(e, t);
		var n = wm;
		if (n && e) {
			var r = kt(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = D({
				src: e,
				async: !0
			}, t), (t = ym.get(i)) && Um(e, t), a = n.createElement("script"), At(a), op(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Mm(e, t) {
		$.M(e, t);
		var n = wm;
		if (n && e) {
			var r = kt(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = D({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = ym.get(i)) && Um(e, t), a = n.createElement("script"), At(a), op(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nm(e, t, n, r) {
		var a = (a = _e.current) ? xm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Pm(n.href), t = kt(a).hoistableStyles, r = t.get(n), r || (r = {
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
					var o = kt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Fm(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = ym.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, ym.set(e, o)), Lm(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Rm(n), t = kt(a).hoistableScripts, r = t.get(n), r || (r = {
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
		return "href=\"" + G(e) + "\"";
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
			if (!0 !== t[wt]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[wt] = !0, t.onload = t.onerror = jt.bind(null, t), op(t, "link", n), At(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function Rm(e) {
		return "[src=\"" + G(e) + "\"]";
	}
	function zm(e) {
		return "script[async]" + e;
	}
	function Bm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + G(n.href) + "\"]");
				if (r) return t.instance = r, At(r), r;
				var a = D({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), At(r), op(r, "style", a), Vm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Pm(n.href);
				var o = e.querySelector(Fm(a));
				if (o) return t.state.loading |= 4, t.instance = o, At(o), o;
				r = Im(n), (a = ym.get(a)) && Hm(r, a), o = (e.ownerDocument || e).createElement("link"), At(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), op(o, "link", r), t.state.loading |= 4, Vm(o, n.precedence, e), t.instance = o;
			case "script": return o = Rm(n.src), (a = e.querySelector(zm(o))) ? (t.instance = a, At(a), a) : (r = n, (a = ym.get(o)) && (r = D({}, n), Um(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), At(a), op(a, "link", r), e.head.appendChild(a), t.instance = a);
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
			if (!(a[Ct] || a[gt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = nh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, At(a);
					return;
				}
				a = t.ownerDocument || t, r = Im(r), (i = ym.get(i)) && Hm(r, i), a = a.createElement("link"), At(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), op(a, "link", r), n.instance = a;
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
			0 < e.imgBytes && $m === 0 && ($m = 62500 * up());
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
		_currentValue: ue,
		_currentValue2: ue,
		_threadCount: 0
	};
	function ch(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = at(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = at(0), this.hiddenUpdates = at(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function lh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ch(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = wi(3, null, null, t), e.current = a, a.stateNode = e, t = Ca(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, ao(a), e;
	}
	function uh(e) {
		return e ? (e = Si, e) : Si;
	}
	function dh(e, t, n, r, i, a) {
		i = uh(i), r.context === null ? r.context = i : r.pendingContext = i, r = so(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = co(e, r, t), n !== null && (Fd(n, e, t), lo(n, e, t));
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
			var t = yi(e, 67108864);
			t !== null && Fd(t, e, 67108864), ph(e, 67108864);
		}
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Md();
			t = dt(t);
			var n = yi(e, t);
			n !== null && Fd(n, e, t), ph(e, t);
		}
	}
	var gh = !0;
	function _h(e, t, n, r) {
		var i = H.T;
		H.T = null;
		var a = le.p;
		try {
			le.p = 2, yh(e, t, n, r);
		} finally {
			le.p = a, H.T = i;
		}
	}
	function vh(e, t, n, r) {
		var i = H.T;
		H.T = null;
		var a = le.p;
		try {
			le.p = 8, yh(e, t, n, r);
		} finally {
			le.p = a, H.T = i;
		}
	}
	function yh(e, t, n, r) {
		if (gh) {
			var i = bh(r);
			if (i === null) Yf(e, t, r, xh, n), Mh(e, r);
			else if (Ph(i, e, t, n, r)) r.stopPropagation();
			else if (Mh(e, r), t & 4 && -1 < jh.indexOf(e)) {
				for (; i !== null;) {
					var a = Dt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = $e(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ke(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									Of(a), !(Xu & 6) && (_d = Pe() + 500, kf(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = yi(a, 2), s !== null && Fd(s, a, 2), Bd(), ph(a, 2);
					}
					if (a = bh(r), a === null && Yf(e, t, r, xh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Yf(e, t, r, null, n);
		}
	}
	function bh(e) {
		return e = mn(e), Sh(e);
	}
	var xh = null;
	function Sh(e) {
		if (xh = null, e = Et(e), e !== null) {
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
			case "message": switch (Fe()) {
				case Ie: return 2;
				case Le: return 8;
				case Re:
				case ze: return 32;
				case Be: return 268435456;
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
		}, t !== null && (t = Dt(t), t !== null && mh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = Et(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, mt(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, mt(e.priority, function() {
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
				pn = r, n.target.dispatchEvent(r), pn = null;
			} else return t = Dt(n), t !== null && mh(t), e.blockedOn = n, !1;
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
				var a = Dt(n);
				a !== null && (e.splice(t, 3), t -= 3, Js(a, {
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
			var i = n[r], a = n[r + 1], o = i[_t] || null;
			if (typeof a == "function") o || Vh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[_t] || null) s = o.formAction;
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
		dh(n, Md(), e, t, null, null);
	}, Gh.prototype.unmount = Wh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			dh(e.current, 2, null, e, null, null), Bd(), t[vt] = null;
		}
	};
	function Gh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = pt();
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
	le.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var qh = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: H,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Jh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Jh.isDisabled && Jh.supportsFiber) try {
			Ue = Jh.inject(qh), We = Jh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = _c, s = vc, c = yc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = lh(e, 1, !1, null, null, n, r, null, o, s, c, Uh), e[vt] = t.current, qf(e), new Wh(t);
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
var L = 3, R = "24px", z = "16px", ee = 4e3, B = 356, te = 14, V = 45, ne = 200;
function re(...e) {
	return e.filter(Boolean).join(" ");
}
function ie(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var ae = (e) => {
	let { invert: t, toast: n, unstyled: r, interacting: i, setHeights: a, visibleToasts: o, heights: s, index: c, toasts: l, expanded: u, removeToast: d, defaultRichColors: f, closeButton: p, style: m, cancelButtonStyle: h, actionButtonStyle: g, className: v = "", descriptionClassName: y = "", duration: x, position: C, gap: w, expandByDefault: T, classNames: E, icons: k, closeButtonAriaLabel: A = "Close toast" } = e, [j, M] = _.useState(null), [N, P] = _.useState(null), [F, L] = _.useState(!1), [R, z] = _.useState(!1), [B, te] = _.useState(!1), [ae, oe] = _.useState(!1), [se, ce] = _.useState(!1), [H, le] = _.useState(0), [ue, de] = _.useState(0), fe = _.useRef(n.duration || x || ee), pe = _.useRef(null), me = _.useRef(null), U = c === 0, he = c + 1 <= o, ge = n.type, _e = ge ?? "default", ve = n.dismissible !== !1, ye = n.className || "", W = n.descriptionClassName || "", be = _.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]), xe = _.useMemo(() => n.closeButton ?? p, [n.closeButton, p]), Se = _.useMemo(() => n.duration || x || ee, [n.duration, x]), Ce = _.useRef(0), we = _.useRef(0), Te = _.useRef(0), Ee = _.useRef(null), [De, Oe] = C.split("-"), ke = _.useMemo(() => s.reduce((e, t, n) => n >= be ? e : e + t.height, 0), [s, be]), Ae = O(), je = _.useMemo(() => e.swipeDirections ?? ie(C), [e.swipeDirections, C]), Me = n.invert || t, Ne = ge === "loading";
	we.current = _.useMemo(() => be * w + ke, [be, ke]), _.useEffect(() => {
		fe.current = Se;
	}, [Se]), _.useEffect(() => {
		L(!0);
	}, []), _.useEffect(() => {
		let e = me.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return de(t), a((e) => [{
				toastId: n.id,
				height: t,
				position: n.position
			}, ...e]), () => a((e) => e.filter((e) => e.toastId !== n.id));
		}
	}, [a, n.id]), _.useLayoutEffect(() => {
		if (!F) return;
		let e = me.current, t = e.style.height;
		e.style.height = "auto";
		let r = e.getBoundingClientRect().height;
		e.style.height = t, de(r), a((e) => e.find((e) => e.toastId === n.id) ? e.map((e) => e.toastId === n.id ? {
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
	let Pe = _.useCallback(() => {
		z(!0), le(we.current), a((e) => e.filter((e) => e.toastId !== n.id)), setTimeout(() => {
			d(n);
		}, ne);
	}, [
		n,
		d,
		a,
		we
	]);
	_.useEffect(() => {
		if (n.promise && ge === "loading" || n.duration === Infinity || n.type === "loading") return;
		let e;
		return u || i || Ae ? (() => {
			if (Te.current < Ce.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - Ce.current;
				fe.current -= e;
			}
			Te.current = (/* @__PURE__ */ new Date()).getTime();
		})() : fe.current !== Infinity && (Ce.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			n.onAutoClose == null || n.onAutoClose.call(n, n), Pe();
		}, fe.current)), () => clearTimeout(e);
	}, [
		u,
		i,
		n,
		ge,
		Ae,
		Pe
	]), _.useEffect(() => {
		n.delete && (Pe(), n.onDismiss == null || n.onDismiss.call(n, n));
	}, [Pe, n.delete]);
	function Fe() {
		return k?.loading ? /*#__PURE__*/ _.createElement("div", {
			className: re(E?.loader, n?.classNames?.loader, "sonner-loader"),
			"data-visible": ge === "loading"
		}, k.loading) : /*#__PURE__*/ _.createElement(S, {
			className: re(E?.loader, n?.classNames?.loader),
			visible: ge === "loading"
		});
	}
	let Ie = n.icon || k?.[ge] || b(ge);
	return /*#__PURE__*/ _.createElement("li", {
		tabIndex: 0,
		ref: me,
		className: re(v, ye, E?.toast, n?.classNames?.toast, E?.[_e], n?.classNames?.[_e]),
		"data-sonner-toast": "",
		"data-rich-colors": n.richColors ?? f,
		"data-styled": !(n.jsx || n.unstyled || r),
		"data-mounted": F,
		"data-promise": !!n.promise,
		"data-swiped": se,
		"data-removed": R,
		"data-visible": he,
		"data-y-position": De,
		"data-x-position": Oe,
		"data-index": c,
		"data-front": U,
		"data-swiping": B,
		"data-dismissible": ve,
		"data-type": ge,
		"data-invert": Me,
		"data-swipe-out": ae,
		"data-swipe-direction": N,
		"data-expanded": !!(u || T && F),
		"data-testid": n.testId,
		style: {
			"--index": c,
			"--toasts-before": c,
			"--z-index": l.length - c,
			"--offset": `${R ? H : we.current}px`,
			"--initial-height": T ? "auto" : `${ue}px`,
			...m,
			...n.style
		},
		onDragEnd: () => {
			te(!1), M(null), Ee.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && !Ne && ve && (pe.current = /* @__PURE__ */ new Date(), le(we.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (te(!0), Ee.current = {
				x: e.clientX,
				y: e.clientY
			}));
		},
		onPointerUp: () => {
			if (ae || !ve) return;
			Ee.current = null;
			let e = Number(me.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(me.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), r = (/* @__PURE__ */ new Date()).getTime() - pe.current?.getTime(), i = j === "x" ? e : t, a = Math.abs(i) / r;
			if ((j === "x" ? je.includes(e > 0 ? "right" : "left") : je.includes(t > 0 ? "bottom" : "top")) && (Math.abs(i) >= V || a > .11)) le(we.current), n.onDismiss == null || n.onDismiss.call(n, n), P(j === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), Pe(), oe(!0);
			else {
				var o, s;
				(o = me.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = me.current) == null || s.style.setProperty("--swipe-amount-y", "0px"), ce(!1), te(!1), M(null);
			}
		},
		onPointerMove: (e) => {
			var t, n;
			if (!Ee.current || !ve || window.getSelection()?.toString().length > 0) return;
			let r = e.clientY - Ee.current.y, i = e.clientX - Ee.current.x;
			!j && (Math.abs(i) > 1 || Math.abs(r) > 1) && M(Math.abs(i) > Math.abs(r) ? "x" : "y");
			let a = {
				x: 0,
				y: 0
			}, o = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (j === "y") {
				if (je.includes("top") || je.includes("bottom")) {
					if (je.includes("top") && r < 0 || je.includes("bottom") && r > 0) a.y = r;
					else {
						let e = r * o(r);
						a.y = Math.abs(e) < Math.abs(r) ? e : r;
					}
				}
			} else if (j === "x" && (je.includes("left") || je.includes("right"))) {
				if (je.includes("left") && i < 0 || je.includes("right") && i > 0) a.x = i;
				else {
					let e = i * o(i);
					a.x = Math.abs(e) < Math.abs(i) ? e : i;
				}
			}
			(Math.abs(a.x) > 0 || Math.abs(a.y) > 0) && ce(!0), (t = me.current) == null || t.style.setProperty("--swipe-amount-x", `${a.x}px`), (n = me.current) == null || n.style.setProperty("--swipe-amount-y", `${a.y}px`);
		}
	}, xe && !n.jsx && ge !== "loading" ? /*#__PURE__*/ _.createElement("button", {
		"aria-label": A,
		"data-disabled": Ne,
		"data-close-button": !0,
		onClick: Ne || !ve ? () => {} : () => {
			Pe(), n.onDismiss == null || n.onDismiss.call(n, n);
		},
		className: re(E?.closeButton, n?.classNames?.closeButton)
	}, k?.close ?? D) : null, (ge || n.icon || n.promise) && n.icon !== null && (k?.[ge] !== null || n.icon) ? /*#__PURE__*/ _.createElement("div", {
		"data-icon": "",
		className: re(E?.icon, n?.classNames?.icon)
	}, ge === "loading" ? n.icon || Fe() : n.promise ? Fe() : null, ge === "loading" ? null : Ie) : null, /*#__PURE__*/ _.createElement("div", {
		"data-content": "",
		className: re(E?.content, n?.classNames?.content)
	}, /*#__PURE__*/ _.createElement("div", {
		"data-title": "",
		className: re(E?.title, n?.classNames?.title)
	}, n.jsx ? n.jsx : typeof n.title == "function" ? n.title() : n.title), n.description ? /*#__PURE__*/ _.createElement("div", {
		"data-description": "",
		className: re(y, W, E?.description, n?.classNames?.description)
	}, typeof n.description == "function" ? n.description() : n.description) : null), /*#__PURE__*/ _.isValidElement(n.cancel) ? n.cancel : n.cancel && I(n.cancel) ? /*#__PURE__*/ _.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: n.cancelButtonStyle || h,
		onClick: (e) => {
			I(n.cancel) && ve && (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), Pe());
		},
		className: re(E?.cancelButton, n?.classNames?.cancelButton)
	}, n.cancel.label) : null, /*#__PURE__*/ _.isValidElement(n.action) ? n.action : n.action && I(n.action) ? /*#__PURE__*/ _.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: n.actionButtonStyle || g,
		onClick: (e) => {
			I(n.action) && (n.action.onClick == null || n.action.onClick.call(n.action, e), e.defaultPrevented || Pe());
		},
		className: re(E?.actionButton, n?.classNames?.actionButton)
	}, n.action.label) : null);
};
function oe() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function se(e, t) {
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
var ce = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { id: n, invert: r, position: i = "bottom-right", hotkey: a = ["altKey", "KeyT"], expand: o, closeButton: s, className: c, offset: l, mobileOffset: u, theme: d = "light", richColors: f, duration: p, style: m, visibleToasts: h = L, toastOptions: g, dir: y = oe(), gap: b = te, icons: x, customAriaLabel: S, containerAriaLabel: C = "Notifications" } = e, [w, T] = _.useState([]), E = _.useMemo(() => n ? w.filter((e) => e.toasterId === n) : w.filter((e) => !e.toasterId), [w, n]), D = _.useMemo(() => Array.from(new Set([i].concat(E.filter((e) => e.position).map((e) => e.position)))), [E, i]), [O, k] = _.useState([]), [A, j] = _.useState(!1), [N, P] = _.useState(!1), [F, I] = _.useState(d === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : d), R = _.useRef(null), z = a.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ee = _.useRef(null), V = _.useRef(!1), ne = _.useCallback((e) => {
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
			ee.current && (ee.current.focus({ preventScroll: !0 }), ee.current = null, V.current = !1);
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
			dir: y === "auto" ? oe() : y,
			tabIndex: -1,
			ref: R,
			className: c,
			"data-sonner-toaster": !0,
			"data-sonner-theme": F,
			"data-y-position": i,
			"data-x-position": a,
			style: {
				"--front-toast-height": `${O[0]?.height || 0}px`,
				"--width": `${B}px`,
				"--gap": `${b}px`,
				...m,
				...se(l, u)
			},
			onBlur: (e) => {
				V.current && !e.currentTarget.contains(e.relatedTarget) && (V.current = !1, ee.current &&= (ee.current.focus({ preventScroll: !0 }), null));
			},
			onFocus: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || V.current || (V.current = !0, ee.current = e.relatedTarget);
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
		}, E.filter((e) => !e.position && n === 0 || e.position === t).map((n, i) => /*#__PURE__*/ _.createElement(ae, {
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
			removeToast: ne,
			toasts: E.filter((e) => e.position == n.position),
			heights: O.filter((e) => e.position == n.position),
			setHeights: k,
			expandByDefault: o,
			gap: b,
			expanded: A,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
}), H = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
// node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function le(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: H(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
// node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var ue = (e) => {
	let t = "", n = !1;
	for (let r of e) r === "-" || r === "_" || r <= " " ? n = t.length > 0 : (t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1);
	return t;
}, de = (e) => {
	let t = ue(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, fe = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), pe = {
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
function me(e) {
	return e != null;
}
function U(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? pe.width, a = e.size ?? e.height ?? pe.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? fe(...c) : fe("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? pe["stroke-width"]) * Number(e.size ?? e.width ?? pe.width) / Number(t.size ?? t.width ?? pe.width) : t.strokeWidth ?? pe["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(pe).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && me(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && me(t.width) && { [r("width")]: t.width },
			..."height" in t && me(t.height) && { [r("height")]: t.height },
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
function he(e, t = {}) {
	return U(e, {
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
var ge = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, _e = (0, _.createContext)({}), ve = () => (0, _.useContext)(_e), ye = (0, _.forwardRef)(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
	node: l,
	aliases: [],
	size: 24
}, ...d }, f) => {
	let { size: p = 24, strokeWidth: m = 2, absoluteStrokeWidth: h = !1, nonScalingStroke: g = !1, color: v = "currentColor", className: y = "" } = ve() ?? {}, b = !!c || ge(d), [x, S, C = []] = he(u, {
		color: e ?? v,
		width: n ?? t ?? p,
		height: r ?? t ?? p,
		strokeWidth: i ?? m,
		absoluteStrokeWidth: a ?? h,
		nonScalingStroke: o ?? g,
		className: fe(y, s),
		hasA11yProp: b,
		attributes: d
	});
	return (0, _.createElement)(x, {
		ref: f,
		...S
	}, [...C.map(([e, t]) => (0, _.createElement)(e, t)), ...Array.isArray(c) ? c : [c]]);
});
// node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function W(e, t = [], n = []) {
	let r = typeof e == "string" ? le(e, t, n) : e, i = (0, _.forwardRef)(({ className: e, ...t }, n) => (0, _.createElement)(ye, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = de(r.name)), i;
}
// node_modules/lucide-react/dist/esm/icons/arrow-left.mjs
var be = {
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
be.node;
var xe = W(be), Se = {
	name: "check",
	size: 24,
	node: [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]
};
Se.node;
var Ce = W(Se), we = {
	name: "chevron-down",
	size: 24,
	node: [["path", {
		d: "m6 9 6 6 6-6",
		key: "qrunsl"
	}]]
};
we.node;
var Te = W(we), Ee = {
	name: "chevron-up",
	size: 24,
	node: [["path", {
		d: "m18 15-6-6-6 6",
		key: "153udz"
	}]]
};
Ee.node;
var De = W(Ee), Oe = {
	name: "circle-check",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "m16 9-5.5 5.5L8 12",
		key: "xofnsj"
	}]],
	aliases: ["check-circle-2"]
};
Oe.node;
var ke = W(Oe), Ae = {
	name: "circle-user-round",
	size: 24,
	node: [
		["path", {
			d: "M17.925 20.056a6 6 0 0 0-11.851.001",
			key: "z69sun"
		}],
		["circle", {
			cx: "12",
			cy: "11",
			r: "4",
			key: "1gt34v"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}]
	],
	aliases: ["user-circle-2"]
};
Ae.node;
var je = W(Ae), Me = {
	name: "cloud",
	size: 24,
	node: [["path", {
		d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
		key: "p7xjir"
	}]]
};
Me.node;
var Ne = W(Me), Pe = {
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
Pe.node;
var Fe = W(Pe), Ie = {
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
Ie.node;
var Le = W(Ie), Re = {
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
Re.node;
var ze = W(Re), Be = {
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
Be.node;
var Ve = W(Be), He = {
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
He.node;
var Ue = W(He), We = {
	name: "flame",
	size: 24,
	node: [["path", {
		d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
		key: "1slcih"
	}]]
};
We.node;
var Ge = W(We), Ke = {
	name: "folder-open",
	size: 24,
	node: [["path", {
		d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
		key: "usdka0"
	}]]
};
Ke.node;
var qe = W(Ke), Je = {
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
Je.node;
var Ye = W(Je), Xe = {
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
Xe.node;
var Ze = W(Xe), Qe = {
	name: "info",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 16v-4",
			key: "1dtifu"
		}],
		["path", {
			d: "M12 8h.01",
			key: "e9boi3"
		}]
	]
};
Qe.node;
var $e = W(Qe), et = {
	name: "loader-circle",
	size: 24,
	node: [["path", {
		d: "M21 12a9 9 0 1 1-6.219-8.56",
		key: "13zald"
	}]],
	aliases: ["loader-2"]
};
et.node;
var tt = W(et), nt = {
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
nt.node;
var rt = W(nt), it = {
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
it.node;
var at = W(it), ot = {
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
ot.node;
var st = W(ot), ct = {
	name: "moon",
	size: 24,
	node: [["path", {
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
		key: "kfwtm"
	}]]
};
ct.node;
var lt = W(ct), ut = {
	name: "octagon-x",
	size: 24,
	node: [
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
			key: "2d38gg"
		}],
		["path", {
			d: "m9 9 6 6",
			key: "z0biqf"
		}]
	],
	aliases: ["x-octagon"]
};
ut.node;
var dt = W(ut), ft = {
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
ft.node;
var pt = W(ft), mt = {
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
mt.node;
var ht = W(mt), gt = {
	name: "play",
	size: 24,
	node: [["path", {
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
		key: "10ikf1"
	}]]
};
gt.node;
var _t = W(gt), vt = {
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
vt.node;
var yt = W(vt), bt = {
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
bt.node;
var xt = W(bt), St = {
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
St.node;
var Ct = W(St), wt = {
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
wt.node;
var Tt = W(wt), Et = {
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
Et.node;
var Dt = W(Et), Ot = {
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
Ot.node;
var kt = W(Ot), At = {
	name: "shield",
	size: 24,
	node: [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}]]
};
At.node;
var jt = W(At), Mt = {
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
Mt.node;
var Nt = W(Mt), Pt = {
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
Pt.node;
var Ft = W(Pt), It = {
	name: "sun",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "4",
			key: "4exip2"
		}],
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}],
		["path", {
			d: "M12 20v2",
			key: "1lh1kg"
		}],
		["path", {
			d: "m4.93 4.93 1.41 1.41",
			key: "149t6j"
		}],
		["path", {
			d: "m17.66 17.66 1.41 1.41",
			key: "ptbguv"
		}],
		["path", {
			d: "M2 12h2",
			key: "1t8f8n"
		}],
		["path", {
			d: "M20 12h2",
			key: "1q8mjw"
		}],
		["path", {
			d: "m6.34 17.66-1.41 1.41",
			key: "1m8zz5"
		}],
		["path", {
			d: "m19.07 4.93-1.41 1.41",
			key: "1shlcs"
		}]
	]
};
It.node;
var Lt = W(It), Rt = {
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
Rt.node;
var zt = W(Rt), Bt = {
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
Bt.node;
var Vt = W(Bt), Ht = {
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
Ht.node;
var Ut = W(Ht), Wt = {
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
Wt.node;
var Gt = W(Wt), Kt = {
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
Kt.node;
var qt = W(Kt), Jt = {
	name: "zap",
	size: 24,
	node: [["path", {
		d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
		key: "1v7up4"
	}]]
};
Jt.node;
var Yt = W(Jt), Xt = /* @__PURE__ */ o(((e) => {
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
})), G = (/* @__PURE__ */ o(((e, t) => {
	t.exports = Xt();
})))(), Zt = ({ ...e }) => /* @__PURE__ */ (0, G.jsx)(ce, {
	theme: "dark",
	className: "toaster group",
	icons: {
		success: /* @__PURE__ */ (0, G.jsx)(ke, { className: "size-4" }),
		info: /* @__PURE__ */ (0, G.jsx)($e, { className: "size-4" }),
		warning: /* @__PURE__ */ (0, G.jsx)(Vt, { className: "size-4" }),
		error: /* @__PURE__ */ (0, G.jsx)(dt, { className: "size-4" }),
		loading: /* @__PURE__ */ (0, G.jsx)(tt, { className: "size-4 animate-spin" })
	},
	style: {
		"--normal-bg": "rgb(var(--popover))",
		"--normal-text": "rgb(var(--popover-foreground))",
		"--normal-border": "rgb(var(--border))",
		"--border-radius": "var(--radius)"
	},
	toastOptions: { classNames: { toast: "cn-toast" } },
	...e
});
// node_modules/@base-ui/utils/formatErrorMessage.mjs
function Qt(e, t) {
	return function(n, ...r) {
		let i = new URL(e);
		return i.searchParams.set("code", n.toString()), r.forEach((e) => i.searchParams.append("args[]", e)), `${t} error #${n}; visit ${i} for the full message.`;
	};
}
var $t = Qt("https://base-ui.com/production-error", "Base UI"), en = /*#__PURE__*/ _.createContext(void 0);
function tn(e) {
	let t = _.useContext(en);
	if (t === void 0 && !e) throw Error($t(33));
	return t;
}
// node_modules/@base-ui/react/menu/root/MenuRootContext.mjs
var nn = /*#__PURE__*/ _.createContext(void 0);
function rn(e) {
	let t = _.useContext(nn);
	if (t === void 0 && !e) throw Error($t(36));
	return t;
}
// node_modules/@base-ui/utils/useRefWithInit.mjs
var an = {};
function on(e, t) {
	let n = _.useRef(an);
	return n.current === an && (n.current = e(t)), n;
}
// node_modules/@base-ui/utils/useMergedRefs.mjs
function sn(e, t, n, r) {
	let i = on(ln).current;
	return un(i, e, t, n, r) && fn(i, [
		e,
		t,
		n,
		r
	]), i.callback;
}
function cn(e) {
	let t = on(ln).current;
	return dn(t, e) && fn(t, e), t.callback;
}
function ln() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function un(e, t, n, r, i) {
	return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== i;
}
function dn(e, t) {
	return e.refs.length !== t.length || e.refs.some((e, n) => e !== t[n]);
}
function fn(e, t) {
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
var pn = 19;
function mn(e) {
	return pn >= e;
}
// node_modules/@base-ui/utils/getReactElementRef.mjs
function hn(e) {
	if (!/*#__PURE__*/ _.isValidElement(e)) return null;
	let t = e, n = t.props;
	return (mn(19) ? n?.ref : t.ref) ?? null;
}
// node_modules/@base-ui/utils/mergeObjects.mjs
function gn(e, t) {
	if (e && !t) return e;
	if (!e && t) return t;
	if (e || t) return {
		...e,
		...t
	};
}
// node_modules/@base-ui/utils/empty.mjs
function _n() {}
var vn = Object.freeze([]), yn = Object.freeze({});
// node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function bn(e, t) {
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
function xn(e, t) {
	return typeof e == "function" ? e(t) : e;
}
// node_modules/@base-ui/react/utils/resolveStyle.mjs
function Sn(e, t) {
	return typeof e == "function" ? e(t) : e;
}
// node_modules/@base-ui/react/merge-props/mergeProps.mjs
var Cn = {};
function wn(e, t, n, r, i) {
	if (!n && !r && !i && !e) return En(t);
	let a = En(e);
	return t && (a = Dn(a, t)), n && (a = Dn(a, n)), r && (a = Dn(a, r)), i && (a = Dn(a, i)), a;
}
function Tn(e) {
	if (e.length === 0) return Cn;
	if (e.length === 1) return En(e[0]);
	let t = En(e[0]);
	for (let n = 1; n < e.length; n += 1) t = Dn(t, e[n]);
	return t;
}
function En(e) {
	return jn(e) ? { ...e(Cn) } : On(e);
}
function Dn(e, t) {
	return jn(t) ? t(e) : kn(e, t);
}
function On(e) {
	let t = { ...e };
	for (let e in t) {
		let n = t[e];
		An(e, n) && (t[e] = Nn(n));
	}
	return t;
}
function kn(e, t) {
	if (!t) return e;
	for (let n in t) {
		let r = t[n];
		switch (n) {
			case "style":
				e[n] = gn(e.style, r);
				break;
			case "className":
				e[n] = Fn(e.className, r);
				break;
			default: e[n] = An(n, r) ? Mn(e[n], r) : r;
		}
	}
	return e;
}
function An(e, t) {
	let n = e.charCodeAt(0), r = e.charCodeAt(1), i = e.charCodeAt(2);
	return n === 111 && r === 110 && i >= 65 && i <= 90 && (typeof t == "function" || t === void 0);
}
function jn(e) {
	return typeof e == "function";
}
function Mn(e, t) {
	return t ? e ? (...n) => {
		let r = n[0];
		if (In(r)) {
			let i = r;
			Pn(i);
			let a = t(...n);
			return i.baseUIHandlerPrevented || e?.(...n), a;
		}
		let i = t(...n);
		return e?.(...n), i;
	} : Nn(t) : e;
}
function Nn(e) {
	return e && ((...t) => {
		let n = t[0];
		return In(n) && Pn(n), e(...t);
	});
}
function Pn(e) {
	return e.preventBaseUIHandler = () => {
		e.baseUIHandlerPrevented = !0;
	}, e;
}
function Fn(e, t) {
	return t ? e ? t + " " + e : t : e;
}
function In(e) {
	return typeof e == "object" && !!e && "nativeEvent" in e;
}
// node_modules/@base-ui/react/internals/useRenderElement.mjs
function Ln(e, t, n = {}) {
	let r = t.render;
	n.enabled !== !1 && (r = Vn(r));
	let i = Rn(t, n, r);
	if (n.enabled === !1) return null;
	let a = n.state ?? yn;
	return Hn(e, r, i, a);
}
function Rn(e, t, n) {
	let { className: r, style: i } = e, { state: a = yn, ref: o, props: s, stateAttributesMapping: c, enabled: l = !0 } = t, u = l ? xn(r, a) : void 0, d = l ? Sn(i, a) : void 0, f = l ? bn(a, c) : yn, p = l && s ? zn(s) : void 0, m = l ? gn(f, p) ?? {} : yn;
	return typeof document < "u" && (l ? m.ref = Array.isArray(o) ? cn([
		m.ref,
		hn(n),
		...o
	]) : sn(m.ref, hn(n), o) : sn(null, null)), l ? (u !== void 0 && (m.className = Fn(m.className, u)), d !== void 0 && (m.style = gn(m.style, d)), m) : yn;
}
function zn(e) {
	return Array.isArray(e) ? Tn(e) : wn(void 0, e);
}
var Bn = Symbol.for("react.lazy");
function Vn(e) {
	if (e?.$$typeof !== Bn) return e;
	let t = _.Children.toArray(e)[0];
	return /*#__PURE__*/ _.isValidElement(t) ? t : e;
}
function Hn(e, t, n, r) {
	if (t) {
		if (typeof t == "function") return t(n, r);
		let e = wn(n, t.props);
		return e.ref = n.ref, /*#__PURE__*/ _.cloneElement(t, e);
	}
	return Un(e, n);
}
function Un(e, t) {
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
var Wn = "data-starting-style", Gn = "data-ending-style", Kn = { [Wn]: "" }, qn = { [Gn]: "" }, Jn = { transitionStatus(e) {
	return e === "starting" ? Kn : e === "ending" ? qn : null;
} }, Yn = "data-open", Xn = "data-closed", Zn = "data-anchor-hidden", Qn = "data-popup-open", $n = "data-pressed", er = { [Qn]: "" }, tr = {
	[Qn]: "",
	[$n]: ""
}, nr = { [Yn]: "" }, rr = { [Xn]: "" }, ir = { [Zn]: "" }, ar = { open(e) {
	return e ? er : null;
} }, or = { open(e) {
	return e ? tr : null;
} }, sr = {
	open(e) {
		return e ? nr : rr;
	},
	anchorHidden(e) {
		return e ? ir : null;
	}
}, cr = {
	...sr,
	...Jn
}, lr = /*#__PURE__*/ _.createContext(void 0);
function ur(e = !0) {
	let t = _.useContext(lr);
	if (t === void 0 && !e) throw Error($t(25));
	return t;
}
// node_modules/@base-ui/react/internals/reason-parts.mjs
var dr = "none", fr = "trigger-press", pr = "trigger-hover", mr = "trigger-focus", hr = "outside-press", gr = "item-press", _r = "close-press", vr = "focus-out", yr = "escape-key", br = "list-navigation", xr = "keyboard", Sr = "pointer", Cr = "cancel-open", wr = "sibling-open", Tr = "disabled", Er = "missing", Dr = "initial", Or = "imperative-action", kr = "window-resize";
// node_modules/@base-ui/utils/useControlled.mjs
function Ar({ controlled: e, default: t, name: n, state: r = "value" }) {
	let { current: i } = _.useRef(e !== void 0), [a, o] = _.useState(() => t);
	return [i && e !== void 0 ? e : a, _.useCallback((e) => {
		i || o(e);
	}, [])];
}
// node_modules/@base-ui/react/menu/filter-root/MenuFilterContext.mjs
var jr = /*#__PURE__*/ _.createContext(null);
function Mr(e = "root") {
	let t = _.useContext(jr), n = _.useContext(nn);
	return t === null || n === void 0 ? null : (e === "submenu-trigger" ? n.virtualFocus || n.parentVirtualFocus : n.virtualFocus) ? t : null;
}
var Nr = {
	visible: !0,
	ref: null
};
function Pr() {
	return Nr;
}
function Fr(e, t, n = "root") {
	let r = Mr(n), i = ((n === "submenu-trigger" ? r?.useSubmenuTrigger : r?.useItem) ?? Pr)({
		label: e.label,
		children: e.children,
		render: e.render
	}), a = sn(t, i.ref);
	return {
		visible: i.visible,
		ref: a,
		props: i.props
	};
}
// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Ir() {
	return typeof window < "u";
}
function Lr(e) {
	return Br(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Rr(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function zr(e) {
	return ((Br(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Br(e) {
	return Ir() ? e instanceof Node || e instanceof Rr(e).Node : !1;
}
function Vr(e) {
	return Ir() ? e instanceof Element || e instanceof Rr(e).Element : !1;
}
function Hr(e) {
	return Ir() ? e instanceof HTMLElement || e instanceof Rr(e).HTMLElement : !1;
}
function Ur(e) {
	return !Ir() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Rr(e).ShadowRoot;
}
function Wr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = ti(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Gr(e) {
	return /^(table|td|th)$/.test(Lr(e));
}
function Kr(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var qr = /transform|translate|scale|rotate|perspective|filter/, Jr = /paint|layout|strict|content/, Yr = (e) => !!e && e !== "none", Xr;
function Zr(e) {
	let t = Vr(e) ? ti(e) : e;
	return Yr(t.transform) || Yr(t.translate) || Yr(t.scale) || Yr(t.rotate) || Yr(t.perspective) || !$r() && (Yr(t.backdropFilter) || Yr(t.filter)) || qr.test(t.willChange || "") || Jr.test(t.contain || "");
}
function Qr(e) {
	let t = ri(e);
	for (; Hr(t) && !ei(t);) {
		if (Zr(t)) return t;
		if (Kr(t)) return null;
		t = ri(t);
	}
	return null;
}
function $r() {
	return Xr ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Xr;
}
function ei(e) {
	return /^(html|body|#document)$/.test(Lr(e));
}
function ti(e) {
	return Rr(e).getComputedStyle(e);
}
function ni(e) {
	return Vr(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function ri(e) {
	if (Lr(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Ur(e) && e.host || zr(e);
	return Ur(t) ? t.host : t;
}
function ii(e) {
	let t = ri(e);
	return ei(t) ? (e.ownerDocument || e).body : Hr(t) && Wr(t) ? t : ii(t);
}
function ai(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = ii(e), i = r === e.ownerDocument?.body, a = Rr(r);
	if (i) {
		let e = oi(a);
		return t.concat(a, a.visualViewport || [], Wr(r) ? r : [], e && n ? ai(e) : []);
	}
	return t.concat(r, ai(r, [], n));
}
function oi(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
// node_modules/@base-ui/utils/safeReact.mjs
var si = { ..._ }, ci = si.useInsertionEffect, li = ci && ci !== si.useLayoutEffect ? ci : (e) => e();
function K(e) {
	let t = on(ui).current;
	return t.next = e, li(t.effect), t.trampoline;
}
function ui() {
	let e = {
		next: void 0,
		callback: di,
		trampoline: (...t) => e.callback?.(...t),
		effect: () => {
			e.callback = e.next;
		}
	};
	return e;
}
function di() {}
var q = typeof document < "u" ? _.useLayoutEffect : () => {}, fi = /*#__PURE__*/ _.createContext(void 0);
function pi(e = !1) {
	let t = _.useContext(fi);
	if (t === void 0 && !e) throw Error($t(16));
	return t;
}
// node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function mi(e) {
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
function hi(e) {
	return e?.ownerDocument || document;
}
// node_modules/@base-ui/react/utils/dispatchClickWithModifiers.mjs
function gi(e, t, { detail: n = 0, pointerType: r = "" } = {}) {
	e.dispatchEvent(new (Rr(e)).PointerEvent("click", {
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
function _i(e = {}) {
	let { disabled: t = !1, focusableWhenDisabled: n, tabIndex: r = 0, native: i = !0, composite: a } = e, o = _.useRef(null), s = pi(!0), c = a ?? s !== void 0, { props: l } = mi({
		focusableWhenDisabled: n,
		disabled: t,
		composite: c,
		tabIndex: r,
		isNativeButton: i
	}), u = _.useCallback(() => {
		let e = o.current;
		vi(e) && c && t && l.disabled === void 0 && e.disabled && (e.disabled = !1);
	}, [
		t,
		l.disabled,
		c
	]);
	return q(u, [u]), {
		getButtonProps: _.useCallback((e = {}) => {
			let { onClick: n, onMouseDown: r, onKeyUp: a, onKeyDown: o, onPointerDown: s, ...u } = e;
			return wn({
				onClick(e) {
					t ? e.preventDefault() : n?.(e);
				},
				onMouseDown(e) {
					t || r?.(e);
				},
				onKeyDown(e) {
					if (t || (Pn(e), o?.(e), e.baseUIHandlerPrevented)) return;
					let n = e.target === e.currentTarget, r = e.currentTarget, a = vi(r), s = !i && yi(r), l = n && (i ? a : !s), u = e.key === "Enter", d = e.key === " ", f = r.getAttribute("role"), p = f?.startsWith("menuitem") || f === "option" || f === "gridcell";
					if (n && c && d) {
						if (e.defaultPrevented && p) return;
						e.preventDefault(), (!i || a) && (e.preventBaseUIHandler(), gi(r, e));
					} else !l || i || !d && !u ? n && s && d && e.preventDefault() : e.defaultPrevented || (e.preventDefault(), u && (e.preventBaseUIHandler(), gi(r, e)));
				},
				onKeyUp(e) {
					t || (Pn(e), a?.(e), e.target === e.currentTarget && i && c && vi(e.currentTarget) && e.key === " " ? e.preventDefault() : e.baseUIHandlerPrevented || e.target !== e.currentTarget || i || c || e.defaultPrevented || e.key !== " " || (e.preventBaseUIHandler(), gi(e.currentTarget, e)));
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
		buttonRef: K((e) => {
			o.current = e, u();
		})
	};
}
function vi(e) {
	return Hr(e) && e.tagName === "BUTTON";
}
function yi(e) {
	return Hr(e) && e.tagName === "A" && !!e.href;
}
// node_modules/@base-ui/utils/platform/shared.mjs
function bi() {
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
var { userAgent: xi, platform: Si, maxTouchPoints: Ci } = bi(), wi = xi.toLowerCase(), Ti = Si.toLowerCase(), Ei = /^i(os$|p)/.test(Ti) || Ti === "macintel" && Ci > 1, Di = "android", Oi = Ti === Di || wi.includes(Di), ki = !Ei && Ti.startsWith("mac");
Ti.startsWith("win"), !Oi && /^(linux|chrome os)/.test(Ti);
var Ai = ki || Ei, ji = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none");
!ji && wi.includes("firefox"), !ji && wi.includes("chrom");
// node_modules/@base-ui/utils/platform/screen-reader.mjs
var Mi = Ai, Ni = /jsdom|happydom/.test(wi);
// node_modules/@base-ui/react/menu/item/useMenuItemCommonProps.mjs
function Pi(e) {
	e.preventDefault();
}
function Fi(e) {
	let { closeOnClick: t, highlighted: n, id: r, nodeId: i, store: a, typingRef: o, itemRef: s, itemMetadata: c } = e, l = rn(), u = ur(!0), d = c.type === "submenu-trigger", f = d ? l.parentVirtualFocus : l.virtualFocus, p = (d && l.parent.type === "menu" ? l.parent.store : l.store).useState("webkitAriaSelected", n), { events: m } = a.useState("floatingTreeRoot"), h = a.useState("open"), g = u !== void 0, v = !f && h && n ? 0 : -1;
	return _.useMemo(() => ({
		id: r,
		role: "menuitem",
		tabIndex: v,
		"aria-selected": p,
		onMouseDown: f ? Pi : void 0,
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
				reason: gr
			});
		},
		onMouseUp(e) {
			if (u) {
				let t = u.initialCursorPointRef.current;
				if (u.initialCursorPointRef.current = null, g && t && Math.abs(e.clientX - t.x) <= 1 && Math.abs(e.clientY - t.y) <= 1 || g && !ki && e.button === 2) return;
			}
			s.current && a.context.allowMouseUpTriggerRef.current && (!g || e.button === 2) && c.type === "regular-item" && gi(s.current, e, {
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
var Ii = { type: "regular-item" };
function Li(e) {
	let { closeOnClick: t, disabled: n, highlighted: r, id: i, store: a, typingRef: o = a.context.typingRef, nativeButton: s, itemMetadata: c, nodeId: l } = e, u = _.useRef(null), { getButtonProps: d, buttonRef: f } = _i({
		disabled: n,
		focusableWhenDisabled: !0,
		native: s,
		composite: !0
	}), p = Fi({
		closeOnClick: t,
		highlighted: r,
		id: i,
		nodeId: l,
		store: a,
		typingRef: o,
		itemRef: u,
		itemMetadata: c
	}), m = _.useCallback((e) => wn(p, { onMouseEnter(e) {
		c.type === "submenu-trigger" && c.setActive(e.nativeEvent);
	} }, e, d), [
		p,
		d,
		c
	]), h = sn(u, f);
	return _.useMemo(() => ({
		getItemProps: m,
		itemRef: h
	}), [m, h]);
}
// node_modules/@base-ui/react/internals/composite/list/CompositeListContext.mjs
var Ri = /*#__PURE__*/ _.createContext({
	register: () => {},
	unregister: () => {},
	subscribeMapChange: () => () => {},
	nextIndexRef: { current: 0 }
});
function zi() {
	return _.useContext(Ri);
}
// node_modules/@base-ui/react/internals/composite/list/useCompositeListItem.mjs
function Bi(e = {}) {
	let { guess: t, label: n, metadata: r, textRef: i, index: a } = e, { register: o, unregister: s, subscribeMapChange: c, nextIndexRef: l } = zi(), u = _.useRef(-1), [d, f] = _.useState(a == null && t ? () => {
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
	return q(() => {
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
function Vi() {
	let [, e] = _.useState({});
	return _.useCallback(() => {
		e({});
	}, []);
}
// node_modules/@base-ui/utils/useId.mjs
var Hi = 0;
function Ui(e, t = "mui") {
	let n = _.useRef(void 0), r = Vi(), i = e ?? n.current;
	return _.useEffect(() => {
		n.current ?? (Hi += 1, n.current = `${t}-${Hi}`, e ?? r());
	}, [
		e,
		t,
		r
	]), i;
}
var Wi = si.useId;
function Gi(e, t) {
	if (Wi !== void 0) {
		let n = Wi();
		return e ?? (t ? `${t}-${n}` : n);
	}
	return Ui(e, t);
}
// node_modules/@base-ui/react/internals/useBaseUiId.mjs
function Ki(e) {
	return Gi(e, "base-ui");
}
// node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
function J(e, t, n, r) {
	let i = !1, a = !1, o = r ?? yn;
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
function qi(e, t, n) {
	let r = n ?? yn;
	return {
		reason: e,
		event: t ?? new Event("base-ui"),
		...r
	};
}
// node_modules/@base-ui/utils/useOnMount.mjs
function Ji(e) {
	_.useEffect(e, vn);
}
// node_modules/@base-ui/utils/useAnimationFrame.mjs
var Yi = null;
globalThis.requestAnimationFrame;
var Xi = new class {
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
}(), Zi = class e {
	static create() {
		return new e();
	}
	static request(e) {
		return Xi.request(e);
	}
	static cancel(e) {
		return Xi.cancel(e);
	}
	currentId = Yi;
	request(e) {
		this.cancel(), this.currentId = Xi.request(() => {
			this.currentId = Yi, e();
		});
	}
	cancel = () => {
		this.currentId !== Yi && (Xi.cancel(this.currentId), this.currentId = Yi);
	};
	disposeEffect = () => this.cancel;
};
function Qi() {
	let e = on(Zi.create).current;
	return Ji(e.disposeEffect), e;
}
// node_modules/@base-ui/react/internals/useTransitionStatus.mjs
function $i(e, t = !1, n = !1, r = !1) {
	let [i, a] = _.useState(e && t ? "idle" : void 0), [o, s] = _.useState(e && !r);
	return e && !o && (s(!0), a("starting")), !e && o && i !== "ending" && !n && a("ending"), !e && !o && i === "ending" && a(void 0), q(() => {
		if (!e && o && i !== "ending" && n) {
			let e = Zi.request(() => {
				a("ending");
			});
			return () => {
				Zi.cancel(e);
			};
		}
	}, [
		e,
		o,
		i,
		n
	]), q(() => {
		if (!e || t || i === void 0) return;
		let n = Zi.request(() => {
			a(void 0);
		});
		return () => {
			Zi.cancel(n);
		};
	}, [
		t,
		e,
		i
	]), q(() => {
		if (!e || !t) return;
		e && o && i !== "idle" && a("starting");
		let n = Zi.request(() => {
			a("idle");
		});
		return () => {
			Zi.cancel(n);
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
function ea(e) {
	return e == null ? e : "current" in e ? e.current : e;
}
// node_modules/@base-ui/react/utils/getFiniteAnimations.mjs
function ta(e, t) {
	return e.getAnimations(t).filter((e) => {
		let t = e.effect?.getTiming();
		return t?.duration !== Infinity && t?.iterations !== Infinity;
	});
}
// node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
var na = null;
function ra(e) {
	if (!na) {
		let e = [];
		na = e, queueMicrotask(() => {
			na = null, v.flushSync(() => {
				for (let t of e) t();
			});
		});
	}
	na.push(e);
}
function ia(e, t = !1, n = !1) {
	let r = Qi();
	return K((i, a = null) => {
		r.cancel();
		let o = ea(e);
		if (o == null) return;
		let s = o, c = () => {
			n ? ra(() => {
				a?.aborted || i();
			}) : v.flushSync(i);
		};
		if (typeof s.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
			i();
			return;
		}
		function l() {
			Promise.all(ta(s).map((e) => e.finished.then(_n))).then(() => {
				a?.aborted || c();
			}, () => {
				a?.aborted || (ta(s).some((e) => e.pending || e.playState !== "finished") ? l() : c());
			});
		}
		if (t) {
			let e = Wn;
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
function aa(e) {
	let { enabled: t = !0, open: n, ref: r, batch: i = !1, onComplete: a } = e, o = K(a), s = ia(r, n, i);
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
var oa = /*#__PURE__*/ _.createContext(void 0);
function sa() {
	let e = _.useContext(oa);
	if (e === void 0) throw Error($t(31));
	return e;
}
// node_modules/@base-ui/react/menu/group/MenuGroup.mjs
var ca = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, [o, s] = _.useState(void 0), c = Ln("div", e, {
		ref: t,
		props: {
			role: "group",
			"aria-labelledby": o,
			...a
		}
	});
	return /*#__PURE__*/ (0, G.jsx)(oa.Provider, {
		value: s,
		children: c
	});
}), la = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let n = Mr()?.Group ?? ca;
	return /*#__PURE__*/ (0, G.jsx)(n, {
		...e,
		ref: t
	});
}), ua = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = Ki(a), c = sa();
	return q(() => (c(s), () => {
		c((e) => e === s ? void 0 : e);
	}), [c, s]), Ln("div", e, {
		ref: t,
		props: {
			id: s,
			"aria-hidden": !0,
			...o
		}
	});
}), da = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, label: a, nativeButton: o = !1, disabled: s = !1, closeOnClick: c = !0, style: l, ...u } = e, { store: d } = rn(), f = Bi({
		guess: !0,
		label: a
	}), p = Ki(i), m = d.useState("disabled"), h = d.useState("isActive", f.index), g = d.useState("floatingNodeId"), _ = d.useState("itemProps"), v = s || m, { getItemProps: y, itemRef: b } = Li({
		closeOnClick: c,
		disabled: v,
		highlighted: h,
		id: p,
		store: d,
		nativeButton: o,
		nodeId: g,
		itemMetadata: Ii
	});
	return Ln("div", e, {
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
}), fa = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let n = Fr(e, t);
	return n.visible ? /*#__PURE__*/ (0, G.jsx)(da, {
		...e,
		ref: n.ref
	}) : null;
}), pa = 0, ma = class e {
	static create() {
		return new e();
	}
	currentId = pa;
	start(e, t) {
		this.clear(), this.currentId = setTimeout(() => {
			this.currentId = pa, t();
		}, e);
	}
	isStarted() {
		return this.currentId !== pa;
	}
	clear = () => {
		this.currentId !== pa && (clearTimeout(this.currentId), this.currentId = pa);
	};
	disposeEffect = () => this.clear;
};
function ha() {
	let e = on(ma.create).current;
	return Ji(e.disposeEffect), e;
}
// node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function ga(e) {
	e.preventDefault(), e.stopPropagation();
}
function _a(e) {
	return "nativeEvent" in e;
}
function va(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : Oi && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function ya(e) {
	return Ni ? !1 : !Oi && e.width === 0 && e.height === 0 || e.type === "pointerdown" && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" && (Oi || e.buttons === 0) || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
}
function ba(e, t) {
	let n = ["mouse", "pen"];
	return t || n.push("", void 0), n.includes(e);
}
function xa(e) {
	let t = e.type;
	return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
// node_modules/@base-ui/utils/shadowDom.mjs
function Sa(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement != null;) t = t.shadowRoot.activeElement;
	return t;
}
function Y(e, t) {
	if (!e || !t) return !1;
	let n = t.getRootNode?.();
	if (e.contains(t)) return !0;
	if (n && Ur(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function Ca(e, t) {
	let n = e;
	for (; n;) {
		if (Vr(n) && n.matches(t)) return n;
		n = n.assignedSlot ?? n.parentNode ?? (Ur(n) ? n.host : null);
	}
	return null;
}
function wa(e) {
	return "composedPath" in e ? e.composedPath()[0] ?? e.target : e.target;
}
// node_modules/@base-ui/react/floating-ui-react/utils/constants.mjs
var Ta = "data-base-ui-focusable", Ea = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", Da = "ArrowLeft", Oa = "ArrowRight", ka = "ArrowUp", Aa = "ArrowDown", ja = "data-trigger-disabled";
// node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function Ma(e, t) {
	if (!Vr(e)) return !1;
	let n = e;
	if (t.hasElement(n)) return !n.hasAttribute(ja);
	for (let [, e] of t.entries()) if (Y(e, n)) return !e.hasAttribute(ja);
	return !1;
}
function Na(e, t) {
	if (t == null) return !1;
	if ("composedPath" in e) return e.composedPath().includes(t);
	let n = e;
	return n.target != null && t.contains(n.target);
}
function Pa(e) {
	return e.matches("html,body");
}
function Fa(e) {
	return Hr(e) && e.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function Ia(e) {
	return Ca(e, `button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${Ea}`) != null;
}
function La(e) {
	return e ? e.getAttribute("role") === "combobox" && Fa(e) : !1;
}
function Ra(e) {
	if (!e || Ni) return !0;
	try {
		return e.matches(":focus-visible");
	} catch {
		return !0;
	}
}
function za(e) {
	return e ? e.hasAttribute("data-base-ui-focusable") ? e : e.querySelector("[data-base-ui-focusable]") || e : null;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverShared.mjs
function Ba(e, t) {
	return t != null && !ba(t) ? 0 : typeof e == "function" ? e() : e;
}
function Va(e, t, n) {
	let r = Ba(e, n);
	return typeof r == "number" ? r : r?.[t];
}
function Ha(e) {
	return typeof e == "function" ? e() : e;
}
function Ua(e, t) {
	return t || e === "click" || e === "mousedown";
}
function Wa(e) {
	return e?.includes("mouse") && e !== "mousedown";
}
// node_modules/@base-ui/react/floating-ui-react/components/FloatingDelayGroup.mjs
var Ga = /*#__PURE__*/ _.createContext({
	hasProvider: !1,
	timeoutMs: 0,
	delayRef: { current: 0 },
	initialDelayRef: { current: 0 },
	timeout: new ma(),
	currentIdRef: { current: null },
	currentContextRef: { current: null }
});
function Ka(e, t) {
	e.current = t.current;
}
function qa(e) {
	let { children: t, delay: n, timeoutMs: r = 0 } = e, i = _.useRef(n), a = _.useRef(n), o = _.useRef(null), s = _.useRef(null), c = ha();
	return q(() => {
		a.current = n, o.current ? i.current = {
			open: Va(i.current, "open"),
			close: Va(n, "close")
		} : i.current = n;
	}, [
		n,
		o,
		i,
		a
	]), /*#__PURE__*/ (0, G.jsx)(Ga.Provider, {
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
function Ja(e, t = { open: !1 }) {
	let { open: n } = t, r = e.useState("floatingId"), { currentIdRef: i, delayRef: a, timeoutMs: o, initialDelayRef: s, currentContextRef: c, hasProvider: l, timeout: u } = _.useContext(Ga), [d, f] = _.useState(!1), p = _.useRef(n);
	return q(() => {
		p.current = n;
	}, [n]), q(() => {
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
	]), q(() => {
		if (!n) return;
		let t = c.current, o = i.current;
		u.clear(), c.current = {
			onOpenChange: e.setOpen,
			setIsInstantPhase: f
		}, i.current = r, a.current = {
			open: 0,
			close: Va(s.current, "close")
		}, o !== null && o !== r ? (f(!0), t?.setIsInstantPhase(!0), t?.onOpenChange(!1, J(dr))) : (f(!1), t?.setIsInstantPhase(!1));
	}, [
		n,
		r,
		e,
		i,
		a,
		s,
		c,
		u
	]), q(() => () => {
		if (i.current === r) {
			if (c.current = null, !p.current) return;
			i.current = null, Ka(a, s), u.clear();
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
function Ya(e, t, n, r) {
	return e.addEventListener(t, n, r), () => {
		e.removeEventListener(t, n, r);
	};
}
// node_modules/@base-ui/utils/mergeCleanups.mjs
function Xa(...e) {
	return () => {
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			n && n();
		}
	};
}
// node_modules/@base-ui/utils/useValueAsRef.mjs
function Za(e) {
	let t = on(Qa, e).current;
	return t.next = e, q(t.effect), t;
}
function Qa(e) {
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
var $a = {
	clipPath: "inset(50%)",
	overflow: "hidden",
	whiteSpace: "nowrap",
	border: 0,
	padding: 0,
	width: 1,
	height: 1,
	margin: -1
}, eo = {
	...$a,
	position: "fixed",
	margin: 0,
	top: 0,
	left: 0
}, to = {
	...$a,
	position: "absolute"
}, no = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let [n, r] = _.useState();
	q(() => {
		Mi && ji && r("button");
	}, []);
	let i = {
		tabIndex: 0,
		role: n
	};
	return /*#__PURE__*/ (0, G.jsx)("span", {
		...e,
		ref: t,
		style: eo,
		"aria-hidden": !n || void 0,
		...i,
		"data-base-ui-focus-guard": ""
	});
}), ro = Math.min, io = Math.max, ao = Math.round, oo = Math.floor, so = (e) => ({
	x: e,
	y: e
}), co = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function lo(e, t, n) {
	return io(e, ro(t, n));
}
function uo(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function fo(e) {
	return e.split("-")[0];
}
function po(e) {
	return e.split("-")[1];
}
function mo(e) {
	return e === "x" ? "y" : "x";
}
function ho(e) {
	return e === "y" ? "height" : "width";
}
function go(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function _o(e) {
	return mo(go(e));
}
function vo(e, t, n) {
	n === void 0 && (n = !1);
	let r = po(e), i = _o(e), a = ho(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Do(o)), [o, Do(o)];
}
function yo(e) {
	let t = Do(e);
	return [
		bo(e),
		t,
		bo(t)
	];
}
function bo(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var xo = ["left", "right"], So = ["right", "left"], Co = ["top", "bottom"], wo = ["bottom", "top"];
function To(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? So : xo : t ? xo : So;
		case "left":
		case "right": return t ? Co : wo;
		default: return [];
	}
}
function Eo(e, t, n, r) {
	let i = po(e), a = To(fo(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(bo)))), a;
}
function Do(e) {
	let t = fo(e);
	return co[t] + e.slice(t.length);
}
function Oo(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function ko(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Oo(e);
}
function Ao(e) {
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
function jo(e, t) {
	return t < 0 || t >= e.length;
}
function Mo(e, t) {
	return Fo(e.current, { disabledIndices: t });
}
function No(e, t) {
	return Fo(e.current, {
		decrement: !0,
		startingIndex: e.current.length,
		disabledIndices: t
	});
}
function Po(e, t, n) {
	let { decrement: r, loopFocus: i, allowEscape: a, disabledIndices: o, minIndex: s, maxIndex: c } = n, l = () => Fo(e, {
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
		index: jo(e, u) ? -1 : u,
		wrapped: d
	};
}
function Fo(e, { startingIndex: t = -1, decrement: n = !1, disabledIndices: r, amount: i = 1 } = {}) {
	let a = t;
	do
		a += n ? -i : i;
	while (a >= 0 && a <= e.length - 1 && Io(e, a, r));
	return a;
}
function Io(e, t, n) {
	if (typeof n == "function" ? n(t) : n?.includes(t) ?? !1) return !0;
	let r = e[t];
	return r ? !Ro(r) || r.matches(":disabled") ? !0 : !n && (r.hasAttribute("disabled") || r.getAttribute("aria-disabled") === "true") : !1;
}
function Lo(e) {
	return e.visibility === "hidden" || e.visibility === "collapse";
}
function Ro(e, t = e ? ti(e) : null) {
	return !e || !e.isConnected || !t || Lo(t) ? !1 : typeof e.checkVisibility == "function" ? e.checkVisibility() : t.display !== "none" && t.display !== "contents";
}
// node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
var zo = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
function Bo(e) {
	let t = e.assignedSlot;
	if (t) return t;
	if (e.parentElement) return e.parentElement;
	let n = e.getRootNode();
	return Ur(n) ? n.host : null;
}
function Vo(e) {
	for (let t of Array.from(e.children)) if (Lr(t) === "summary") return t;
	return null;
}
function Ho(e, t) {
	let n = Vo(t);
	return !!n && (e === n || Y(n, e));
}
function Uo(e) {
	let t = e ? Lr(e) : "";
	return e != null && e.matches(zo) && (t !== "summary" || e.parentElement != null && Lr(e.parentElement) === "details" && Vo(e.parentElement) === e) && (t !== "details" || Vo(e) == null) && (t !== "input" || e.type !== "hidden");
}
function Wo(e) {
	if (!Uo(e) || !e.isConnected || e.matches(":disabled")) return !1;
	for (let t = e; t; t = Bo(t)) {
		let n = t !== e, r = Lr(t) === "slot";
		if (t.hasAttribute("inert") || n && Lr(t) === "details" && !t.open && !Ho(e, t) || t.hasAttribute("hidden") || !r && !Go(t, n)) return !1;
	}
	return !0;
}
function Go(e, t) {
	let n = ti(e);
	return t ? n.display !== "none" : Ro(e, n);
}
function Ko(e) {
	let t = e.tabIndex;
	if (t < 0) {
		let t = Lr(e);
		if (t === "details" || t === "audio" || t === "video" || Hr(e) && e.isContentEditable) return 0;
	}
	return t;
}
function qo(e) {
	if (Lr(e) !== "input") return null;
	let t = e;
	return t.type === "radio" && t.name !== "" ? t : null;
}
function Jo(e, t) {
	let n = qo(e);
	if (!n) return !0;
	let r = t.find((e) => {
		let t = qo(e);
		return t?.name === n.name && t.form === n.form && t.checked;
	});
	return r ? r === n : t.find((e) => {
		let t = qo(e);
		return t?.name === n.name && t.form === n.form;
	}) === n;
}
function Yo(e) {
	if (Hr(e) && Lr(e) === "slot") {
		let t = e.assignedElements({ flatten: !0 });
		if (t.length > 0) return t;
	}
	return Hr(e) && e.shadowRoot ? Array.from(e.shadowRoot.children) : Array.from(e.children);
}
function Xo(e, t) {
	Yo(e).forEach((e) => {
		Uo(e) && t.push(e), Xo(e, t);
	});
}
function Zo(e, t, n) {
	Yo(e).forEach((e) => {
		Hr(e) && e.matches(t) && n.push(e), Zo(e, t, n);
	});
}
function Qo(e) {
	return Wo(e) && Ko(e) >= 0;
}
function $o(e) {
	let t = [];
	return Xo(e, t), t.filter(Wo);
}
function es(e) {
	let t = $o(e);
	return t.filter((e) => Ko(e) >= 0 && Jo(e, t));
}
function ts(e, t) {
	let n = es(e), r = n.length;
	if (r === 0) return;
	let i = Sa(hi(e)), a = n.indexOf(i);
	return n[a === -1 ? t === 1 ? 0 : r - 1 : a + t];
}
function ns(e) {
	return ts(hi(e).body, 1) || e;
}
function rs(e) {
	return ts(hi(e).body, -1) || e;
}
function is(e, t, n) {
	if (!e) return null;
	let r = [];
	Xo(hi(e).body, r);
	let i = r.indexOf(e);
	if (i === -1) return null;
	let a = r.filter(Wo);
	for (let e = 1; e < r.length; e += 1) {
		let o = r[(i + t * e + r.length) % r.length];
		if (!Y(n, o) && Qo(o) && Jo(o, a)) return o;
	}
	return r[i];
}
function as(e, t) {
	let n = t || e.currentTarget, r = e.relatedTarget;
	return !r || !Y(n, r);
}
function os(e) {
	es(e).forEach((e) => {
		e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
	});
}
function ss(e) {
	let t = [];
	Zo(e, "[data-tabindex]", t), t.forEach((e) => {
		let t = e.dataset.tabindex;
		delete e.dataset.tabindex, t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex");
	});
}
// node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function cs(e, t, n = !0) {
	return e.filter((e) => e.parentId === t).flatMap((t) => [...!n || t.context?.open ? [t] : [], ...cs(e, t.id, n)]);
}
function ls(e, t) {
	let n = [], r = e.find((e) => e.id === t)?.parentId;
	for (; r;) {
		let t = e.find((e) => e.id === r);
		r = t?.parentId, t && (n = n.concat(t));
	}
	return n;
}
// node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function us(e) {
	return `data-base-ui-${e}`;
}
// node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs
var ds = 0;
function fs(e, t = {}) {
	let { preventScroll: n = !1, sync: r = !1, shouldFocus: i } = t;
	cancelAnimationFrame(ds);
	function a() {
		(!i || i()) && e?.focus({ preventScroll: n });
	}
	if (r) return a(), _n;
	let o = requestAnimationFrame(a);
	return ds = o, () => {
		ds === o && (cancelAnimationFrame(o), ds = 0);
	};
}
// node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs
var ps = "data-base-ui-inert", ms = /* @__PURE__ */ new WeakMap(), hs = /* @__PURE__ */ new WeakSet(), gs = /* @__PURE__ */ new WeakMap(), _s = 0;
function vs(e) {
	return e ? Ur(e) ? e.host : vs(e.parentNode) : null;
}
var ys = (e, t) => t.map((t) => {
	if (e.contains(t)) return t;
	let n = vs(t);
	return e.contains(n) ? n : null;
}).filter((e) => e != null), bs = (e) => {
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => {
		let n = e;
		for (; n && !t.has(n);) t.add(n), n = n.parentNode;
	}), t;
}, xs = (e, t, n) => {
	let r = [], i = (e) => {
		e && !n.has(e) && Array.from(e.children).forEach((e) => {
			Lr(e) !== "script" && (t.has(e) ? i(e) : r.push(e));
		});
	};
	return i(e), r;
};
function Ss(e, t, n, { mark: r = !0 }) {
	let i = ys(t, e), a = r ? xs(t, bs(i), new Set(i)) : [], o = [], s = [];
	if (n) {
		let e = ys(t, Array.from(t.querySelectorAll("[aria-live]"))), n = i.concat(e);
		xs(t, bs(n), new Set(n)).forEach((e) => {
			let t = e.getAttribute("aria-hidden"), n = t !== null && t !== "false", r = (ms.get(e) || 0) + 1;
			ms.set(e, r), o.push(e), r === 1 && n && hs.add(e), n || e.setAttribute("aria-hidden", "true");
		});
	}
	return r && a.forEach((e) => {
		let t = (gs.get(e) || 0) + 1;
		gs.set(e, t), s.push(e), t === 1 && e.setAttribute(ps, "");
	}), _s += 1, () => {
		o.forEach((e) => {
			let t = (ms.get(e) || 0) - 1;
			ms.set(e, t), t || (hs.has(e) || e.removeAttribute("aria-hidden"), hs.delete(e));
		}), r && s.forEach((e) => {
			let t = (gs.get(e) || 0) - 1;
			gs.set(e, t), t || e.removeAttribute(ps);
		}), --_s, _s || (ms = /* @__PURE__ */ new WeakMap(), hs = /* @__PURE__ */ new WeakSet(), gs = /* @__PURE__ */ new WeakMap());
	};
}
function Cs(e, t = {}) {
	let { ariaHidden: n = !1, mark: r = !0 } = t, i = hi(e[0]).body;
	return Ss(e, i, n, { mark: r });
}
// node_modules/@base-ui/react/internals/constants.mjs
var ws = { style: { transition: "none" } }, Ts = "data-base-ui-click-trigger", Es = { fallbackAxisSide: "none" }, Ds = { fallbackAxisSide: "end" }, Os = {
	clipPath: "inset(50%)",
	position: "fixed",
	top: 0,
	left: 0
}, ks = /*#__PURE__*/ _.createContext(null), As = () => _.useContext(ks), js = us("portal");
function Ms(e = {}) {
	let { ref: t, container: n, componentProps: r = yn, elementProps: i } = e, a = Gi(), o = As()?.portalNode, [s, c] = _.useState(null), [l, u] = _.useState(null), d = K((e) => {
		e !== null && u(e);
	}), f = _.useRef(null);
	q(() => {
		if (n === null) {
			f.current && (f.current = null, u(null), c(null));
			return;
		}
		let e = (n && (Br(n) ? n : n.current)) ?? o ?? document.body;
		e == null ? f.current && (f.current = null, u(null), c(null)) : f.current !== e && (f.current = e, u(null), c(e));
	}, [n, o]);
	let p = Ln("div", r, {
		ref: [t, d],
		props: [{
			id: a,
			[js]: ""
		}, i]
	}), m = s && p ? /*#__PURE__*/ v.createPortal(p, s) : null;
	return {
		node: l,
		nodeId: /*#__PURE__*/ _.isValidElement(p) ? p.props.id : void 0,
		subtree: m
	};
}
var Ns = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, children: a, container: o, portalOwnerRole: s, ...c } = e, { node: l, nodeId: u, subtree: d } = Ms({
		container: o,
		ref: t,
		componentProps: e,
		elementProps: c
	}), f = _.useRef(null), p = _.useRef(null), m = _.useRef(null), h = _.useRef(null), [g, y] = _.useState(null), b = _.useRef(!1), x = g?.modal, S = g?.open, C = !!g && !g.modal && g.open && !!l;
	_.useEffect(() => {
		if (!l || x) return;
		function e(e) {
			l && e.relatedTarget && as(e) && (e.type === "focusin" ? b.current &&= (ss(l), !1) : (os(l), b.current = !0));
		}
		return Xa(Ya(l, "focusin", e, !0), Ya(l, "focusout", e, !0));
	}, [l, x]), q(() => {
		l && S === !0 && b.current && (ss(l), b.current = !1);
	}, [S, l]);
	let w = _.useMemo(() => ({
		beforeOutsideRef: f,
		afterOutsideRef: p,
		beforeInsideRef: m,
		afterInsideRef: h,
		portalNode: l,
		setFocusManagerState: y
	}), [l]);
	return /*#__PURE__*/ (0, G.jsxs)(_.Fragment, { children: [d, /*#__PURE__*/ (0, G.jsxs)(ks.Provider, {
		value: w,
		children: [
			C && l && /*#__PURE__*/ (0, G.jsx)(no, {
				"data-type": "outside",
				ref: f,
				onFocus: (e) => {
					as(e, l) ? m.current?.focus() : rs(g ? g.domReference : null)?.focus();
				}
			}),
			C && l && /*#__PURE__*/ (0, G.jsx)("span", {
				role: s,
				"aria-owns": u,
				style: Os
			}),
			l && /*#__PURE__*/ v.createPortal(a, l),
			C && l && /*#__PURE__*/ (0, G.jsx)(no, {
				"data-type": "outside",
				ref: p,
				onFocus: (e) => {
					as(e, l) ? h.current?.focus() : (ns(g ? g.domReference : null)?.focus(), g?.closeOnFocusOut && g?.onOpenChange(!1, J("focus-out", e.nativeEvent)));
				}
			})
		]
	})] });
});
// node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function Ps() {
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
var Fs = class {
	nodesRef = { current: [] };
	events = Ps();
	addNode(e) {
		this.nodesRef.current.push(e);
	}
	removeNode(e) {
		let t = this.nodesRef.current.findIndex((t) => t === e);
		t !== -1 && this.nodesRef.current.splice(t, 1);
	}
}, Is = /*#__PURE__*/ _.createContext(null), Ls = /*#__PURE__*/ _.createContext(null), Rs = () => _.useContext(Is)?.id || null, zs = (e) => {
	let t = _.useContext(Ls);
	return e ?? t;
};
function Bs(e) {
	let t = Gi(), n = zs(e), r = Rs();
	return q(() => {
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
function Vs(e) {
	let { children: t, id: n } = e, r = Rs();
	return /*#__PURE__*/ (0, G.jsx)(Is.Provider, {
		value: _.useMemo(() => ({
			id: n,
			parentId: r
		}), [n, r]),
		children: t
	});
}
function Hs(e) {
	let { children: t, externalTree: n } = e, r = on(() => n ?? new Fs()).current;
	return /*#__PURE__*/ (0, G.jsx)(Ls.Provider, {
		value: r,
		children: t
	});
}
// node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs
function Us(e, t) {
	let n = Rr(wa(e));
	return e instanceof n.KeyboardEvent ? "keyboard" : e instanceof n.FocusEvent ? t || "keyboard" : "pointerType" in e ? e.pointerType || (va(e) ? "keyboard" : t || "mouse") : "touches" in e ? "touch" : e instanceof n.MouseEvent ? t || (e.detail === 0 ? "keyboard" : "mouse") : "";
}
var Ws = 20, Gs = [];
function Ks() {
	Gs = Gs.filter((e) => e.deref()?.isConnected);
}
function qs(e) {
	Ks(), e && Lr(e) !== "body" && (Gs.push(new WeakRef(e)), Gs.length > Ws && (Gs = Gs.slice(-20)));
}
function Js() {
	return Ks(), Gs[Gs.length - 1]?.deref();
}
function Ys(e) {
	return e ? Qo(e) ? e : es(e)[0] || e : null;
}
function Xs(e) {
	if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !e.getAttribute("role")?.includes("dialog")) return;
	let t = $o(e).filter((e) => {
		let t = e.getAttribute("data-tabindex") || "";
		return Qo(e) || e.hasAttribute("data-tabindex") && !t.startsWith("-");
	}), n = e.getAttribute("tabindex");
	t.length === 0 ? n !== "0" && (e.setAttribute("tabindex", "0"), e.setAttribute("data-tabindex", "0")) : (n !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tabindex", "-1"));
}
function Zs(e) {
	let { context: t, children: n, disabled: r = !1, initialFocus: i = !0, returnFocus: a = !0, explicitReturnFocus: o, restoreFocus: s = !1, modal: c = !0, closeOnFocusOut: l = !0, openInteractionType: u = "", nextFocusableElement: d, previousFocusableElement: f, beforeContentFocusGuardRef: p, externalTree: m, getInsideElements: h } = e, g = t.useState("open"), v = t.useState("domReferenceElement"), y = t.useState("floatingElement"), { events: b, dataRef: x } = t.context, S = K(() => x.current.floatingContext?.nodeId), C = i === !1, w = La(v) && C, T = Za(i), E = Za(a), D = Za(o), O = Za(u), k = Za(g), A = zs(m), j = As(), M = _.useRef(!1), N = _.useRef(!1), P = _.useRef(!1), F = _.useRef(null), I = _.useRef(""), L = _.useRef(""), R = _.useRef(null), z = _.useRef(null), ee = sn(R, p, j?.beforeInsideRef), B = sn(z, j?.afterInsideRef), te = ha(), V = ha(), ne = Qi(), re = j != null, ie = za(y), ae = K((e = ie) => e ? es(e) : []), oe = K(() => h?.().filter((e) => e != null) ?? []);
	_.useEffect(() => {
		if (r || !c) return;
		function e(e) {
			e.key === "Tab" && Y(ie, Sa(hi(ie))) && ae().length === 0 && !w && ga(e);
		}
		return Ya(hi(ie), "keydown", e);
	}, [
		r,
		ie,
		c,
		w,
		ae
	]), _.useEffect(() => {
		if (r || !g) return;
		let e = hi(ie);
		function t() {
			P.current = !1;
		}
		function n(e) {
			let t = wa(e), n = oe(), r = Y(y, t) || Y(v, t) || Y(j?.portalNode, t) || n.some((e) => e === t || Y(e, t));
			P.current = !r, L.current = e.pointerType || "keyboard", Ca(t, "[data-base-ui-click-trigger]") && (N.current = !0, V.start(0, () => {
				N.current = !1;
			}));
		}
		function i() {
			L.current = "keyboard";
		}
		return Xa(Ya(e, "pointerdown", n, !0), Ya(e, "pointerup", t, !0), Ya(e, "pointercancel", t, !0), Ya(e, "keydown", i, !0), t);
	}, [
		r,
		y,
		v,
		ie,
		g,
		j,
		V,
		oe
	]), _.useEffect(() => {
		if (r || !l) return;
		let e = hi(ie);
		function n() {
			N.current = !0, V.start(0, () => {
				N.current = !1;
			});
		}
		function i(e) {
			let t = wa(e);
			Qo(t) && (F.current = t);
		}
		function a(n) {
			let r = n.relatedTarget, i = n.currentTarget, a = wa(n);
			c && r == null && a != null && Y(y, a) && qs(a), queueMicrotask(() => {
				let o = S(), l = t.context.triggerElements, u = oe(), p = r?.hasAttribute(us("focus-guard")) && [
					R.current,
					z.current,
					j?.beforeInsideRef.current,
					j?.afterInsideRef.current,
					j?.beforeOutsideRef.current,
					j?.afterOutsideRef.current,
					ea(f),
					ea(d)
				].includes(r), m = !(Y(v, r) || Y(y, r) || Y(r, y) || Y(j?.portalNode, r) || u.some((e) => e === r || Y(e, r)) || l.hasMatchingElement((e) => Y(e, r)) || p || A && (cs(A.nodesRef.current, o).find((e) => Y(e.context?.elements.floating, r) || Y(e.context?.elements.domReference, r)) || ls(A.nodesRef.current, o).find((e) => [e.context?.elements.floating, za(e.context?.elements.floating)].includes(r) || e.context?.elements.domReference === r)));
				if (i === v && ie && Xs(ie), s && i !== v && !Ro(a) && Sa(e) === e.body) {
					if (Hr(ie) && (ie.focus(), s === "popup")) {
						ne.request(() => {
							ie.focus();
						});
						return;
					}
					let e = ae(), t = F.current, n = (t && e.includes(t) ? t : null) || e[e.length - 1] || ie;
					Hr(n) && n.focus();
				}
				x.current.insideReactTree ? x.current.insideReactTree = !1 : (w || !c) && r && m && !N.current && (w || r !== Js()) && (M.current = !0, t.setOpen(!1, J(vr, n)));
			});
		}
		function o() {
			P.current || (x.current.insideReactTree = !0, te.start(0, () => {
				x.current.insideReactTree = !1;
			}));
		}
		let u = Hr(v) ? v : null;
		if (y || u) return Xa(u && Ya(u, "focusout", a), u && Ya(u, "pointerdown", n), y && Ya(y, "focusin", i), y && Ya(y, "focusout", a), y && j && Ya(y, "focusout", o, !0));
	}, [
		r,
		v,
		y,
		ie,
		c,
		A,
		j,
		t,
		l,
		s,
		ae,
		w,
		S,
		x,
		te,
		V,
		ne,
		d,
		f,
		oe
	]), _.useEffect(() => {
		if (r || !y || !g) return;
		let e = Array.from(j?.portalNode?.querySelectorAll(`[${us("portal")}]`) || []), t = (A ? ls(A.nodesRef.current, S()) : []).find((e) => La(e.context?.elements.domReference || null))?.context?.elements.domReference, n = Cs([
			y,
			...e,
			R.current,
			z.current,
			j?.beforeOutsideRef.current,
			j?.afterOutsideRef.current,
			...oe(),
			t,
			ea(f),
			ea(d),
			w ? v : null
		].filter((e) => e != null), {
			ariaHidden: c || w,
			mark: !1
		}), i = Cs([y, ...e].filter((e) => e != null));
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
		oe
	]), q(() => {
		if (!g || r || !Hr(ie)) return;
		I.current = "", L.current = "";
		let e = hi(ie), t = Sa(e);
		queueMicrotask(() => {
			let n = T.current, r = typeof n == "function" ? n(O.current || "") : n;
			if (r === void 0 || r === !1 || Y(ie, t)) return;
			let i = null, a = () => (i ??= ae(ie), i[0] || ie), o;
			o = r === !0 || r === null ? a() : ea(r), o ||= a();
			let s = Y(ie, Sa(e)), c = x.current.openEvent, l = c?.type === "mousedown" && va(c);
			fs(o, {
				sync: l,
				preventScroll: o === ie,
				shouldFocus() {
					if (!k.current) return !1;
					if (s) return !0;
					let t = Sa(e);
					return !(t !== o && Y(ie, t));
				}
			});
		});
	}, [
		r,
		g,
		ie,
		ae,
		T,
		O,
		k,
		x
	]);
	let se = _.useRef(null);
	q(() => {
		if (r || !ie) {
			se.current = null;
			return;
		}
		se.current &&= (se.current.cancelled = !0, null);
		let e = hi(ie), t = Sa(e), n = O.current == null;
		qs(t);
		function i(e) {
			if (e.open || (I.current = Us(e.nativeEvent, L.current)), (e.reason === "focus-out" && e.triggerElement?.hasAttribute(us("focus-guard")) || e.reason === "trigger-hover" && e.nativeEvent.type === "mouseleave") && (M.current = !0), e.reason === "outside-press") {
				if (e.nested) M.current = !1;
				else if (va(e.nativeEvent) || ya(e.nativeEvent)) M.current = !1;
				else {
					let e = !1;
					hi(ie).createElement("div").focus({ get preventScroll() {
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
			let a = v?.isConnected ? v : null, o = t?.isConnected && Lr(t) !== "body" ? t : null, s = n ? o || a : a || o;
			return s ||= Js() || null, typeof i == "boolean" ? s : ea(i) || s || null;
		}
		return () => {
			b.off("openchange", i);
			let t = Sa(e), n = oe(), r = Y(y, t) || n.some((e) => e === t || Y(e, t)) || A && cs(A.nodesRef.current, S(), !1).some((e) => Y(e.context?.elements.floating, t)), o = E.current, s = I.current, c = a(s), l = { cancelled: !1 };
			se.current = l, queueMicrotask(() => {
				se.current === l && (se.current = null);
				let n = Ys(c), i = D.current ?? typeof o != "boolean";
				if (!l.cancelled && o && !M.current && Hr(n) && (i || n === t || t === e.body || r)) {
					let e = { preventScroll: !0 };
					s === "keyboard" && (e.focusVisible = !0), n.focus(e);
				}
				M.current = !1;
			});
		};
	}, [
		r,
		y,
		ie,
		E,
		D,
		O,
		b,
		A,
		v,
		S,
		oe
	]), q(() => {
		if (!ji || g || !y) return;
		let e = Sa(hi(y));
		Hr(e) && Fa(e) && Y(y, e) && e.blur();
	}, [g, y]), q(() => {
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
	]), q(() => {
		if (!r && ie) return Xs(ie), () => {
			queueMicrotask(Ks);
		};
	}, [r, ie]);
	let ce = !r && (!c || !w) && (re || c);
	return /*#__PURE__*/ (0, G.jsxs)(_.Fragment, { children: [
		ce && /*#__PURE__*/ (0, G.jsx)(no, {
			"data-type": "inside",
			ref: ee,
			onFocus: (e) => {
				if (c) {
					let e = ae();
					fs(e[e.length - 1]);
				} else j?.portalNode && (M.current = !1, as(e, j.portalNode) ? ns(v)?.focus() : ea(f ?? j.beforeOutsideRef)?.focus());
			}
		}),
		n,
		ce && /*#__PURE__*/ (0, G.jsx)(no, {
			"data-type": "inside",
			ref: B,
			onFocus: (e) => {
				c ? fs(ae()[0]) : j?.portalNode && (l && (M.current = !0), as(e, j.portalNode) ? rs(v)?.focus() : ea(d ?? j.afterOutsideRef)?.focus());
			}
		})
	] });
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs
function Qs(e, t = {}) {
	let { enabled: n = !0, event: r = "click", toggle: i = !0, ignoreMouse: a = !1, stickIfOpen: o = !0, touchOpenDelay: s = 0, reason: c = fr } = t, l = e.context.dataRef, u = _.useRef(void 0), d = Qi(), f = ha(), p = _.useMemo(() => {
		function t(t, n, r, i) {
			let a = J(c, n, r);
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
				u.current = ba(e.pointerType, !0) && ya(e.nativeEvent) ? "virtual" : e.pointerType;
			},
			onMouseDown(i) {
				let o = u.current, s = i.nativeEvent, c = e.select("open");
				if (i.button !== 0 || r === "click" || ba(o, !0) && a) return;
				let l = n(c, i.currentTarget, (e) => e === "click" || e === "mousedown"), f = wa(s), p = Fa(f);
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
				r === "mousedown" && o ? u.current = void 0 : ba(o, !0) && a || t(n(e.select("open"), i.currentTarget, (e) => e === "click" || e === "mousedown" || e === "keydown" || e === "keyup"), i.nativeEvent, i.currentTarget, o);
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
	return _.useMemo(() => n ? { reference: p } : yn, [n, p]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useClientPoint.mjs
function $s(e, t) {
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
function ec(e) {
	return e != null && e.clientX != null;
}
function tc(e, t = {}) {
	let { enabled: n = !0, axis: r = "both" } = t, i = e.useState("open"), a = e.useState("floatingElement"), o = e.useState("domReferenceElement"), s = e.context.dataRef, c = _.useRef(!1), l = _.useRef(null), [u, d] = _.useState(), [f, p] = _.useState([]), m = K((t) => {
		e.set("positionReference", t);
	}), h = K((t, n, i) => {
		c.current || (!s.current.openEvent || ec(s.current.openEvent)) && e.set("positionReference", $s(i ?? o, {
			x: t,
			y: n,
			axis: r,
			dataRef: s,
			pointerType: u
		}));
	}), g = K((e) => {
		i ? l.current || (h(e.clientX, e.clientY, e.currentTarget), p([])) : h(e.clientX, e.clientY, e.currentTarget);
	}), v = ba(u) ? a : i;
	_.useEffect(() => {
		if (!n) {
			m(o);
			return;
		}
		if (!v) return;
		function e() {
			l.current?.(), l.current = null;
		}
		let t = Rr(a);
		function r(t) {
			let n = wa(t);
			Y(a, n) ? e() : h(t.clientX, t.clientY);
		}
		return !s.current.openEvent || ec(s.current.openEvent) ? l.current = Ya(t, "mousemove", r) : m(o), e;
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
function nc() {
	return !1;
}
function rc(e) {
	return {
		escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? !1,
		outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? !0
	};
}
function ic(e, t = {}) {
	let { enabled: n = !0, escapeKey: r = !0, outsidePress: i = !0, outsidePressEvent: a = "sloppy", referencePress: o = nc, bubbles: s, externalTree: c } = t, l = e.useState("open"), u = e.useState("floatingElement"), { dataRef: d, events: f } = e.context, p = zs(c), m = K(typeof i == "function" ? i : () => !1), h = typeof i == "function" ? m : i, g = h !== !1, v = K(() => a), { escapeKey: y, outsidePress: b } = rc(s), x = _.useRef(!1), S = _.useRef(!1), C = _.useRef(!1), w = _.useRef(!1), T = _.useRef(!1), E = _.useRef(""), D = _.useRef(null), O = ha(), k = ha(), A = ha(), j = K(() => {
		k.clear(), d.current.insideReactTree = !1;
	}), M = K((e) => {
		let t = d.current.floatingContext?.nodeId;
		return (p ? cs(p.nodesRef.current, t) : []).some((t) => t.context?.open && !t.context.dataRef.current[e]);
	}), N = K((t) => Na(t, e.select("floatingElement")) || Na(t, e.select("domReferenceElement"))), P = K((t) => {
		o() && e.setOpen(!1, J(fr, t.nativeEvent));
	}), F = K((t) => {
		if (!l || !n || !r || t.key !== "Escape") return;
		let i = _a(t) ? t.nativeEvent : t;
		if (T.current || i.isComposing || !y && M("__escapeKeyBubbles")) return;
		let a = J(yr, i);
		e.setOpen(!1, a), a.isCanceled || t.preventDefault(), !y && !a.isPropagationAllowed && t.stopPropagation();
	}), I = K(() => {
		d.current.insideReactTree = !0, k.start(0, j);
	}), L = K((t) => {
		if (!l || !n || t.button !== 0) return;
		let r = wa(t.nativeEvent);
		Y(e.select("floatingElement"), r) && (x.current || (x.current = !0, S.current = !1));
	}), R = K((e) => {
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
		let t = new ma(), i = hi(u);
		function a() {
			A.clear(), T.current = !0;
		}
		function o() {
			T.current = !0, A.start(ji ? 5 : 0, () => {
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
			let t = d.current.floatingContext?.nodeId, n = p && cs(p.nodesRef.current, t).some((t) => Na(e, t.context?.elements.floating));
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
			let r = wa(n), i = `[${us("inert")}]`, a = Vr(r) ? r.getRootNode() : null, o = Array.from((Ur(a) ? a : hi(e.select("floatingElement"))).querySelectorAll(i)), s = e.context.triggerElements;
			if (r && (s.hasElement(r) || s.hasMatchingElement((e) => Y(e, r)))) return;
			let c = Vr(r) ? r : null;
			for (; c && !ei(c);) {
				let e = ri(c);
				if (ei(e) || !Vr(e)) break;
				c = e;
			}
			if (!(o.length && Vr(r) && !Pa(r) && !Y(r, e.select("floatingElement")) && o.every((e) => !Y(c, e)))) {
				if (Hr(r) && !("touches" in n)) {
					let e = ei(r), t = ti(r), i = /auto|scroll/, a = e || i.test(t.overflowX), o = e || i.test(t.overflowY), s = a && r.clientWidth > 0 && r.scrollWidth > r.clientWidth, c = o && r.clientHeight > 0 && r.scrollHeight > r.clientHeight, l = t.direction === "rtl", u = c && (l ? n.offsetX <= r.offsetWidth - r.clientWidth : n.offsetX > r.clientWidth), d = s && n.offsetY > r.clientHeight;
					if (u || d) return;
				}
				if (!_(n)) {
					if (f() === "intentional") {
						if (n.detail !== 0 && !va(n) && !w.current) return;
						if (C.current) {
							t.clear(), C.current = !1;
							return;
						}
					}
					typeof h == "function" && !h(n) || M("__outsidePressBubbles") || (e.setOpen(!1, J(hr, n)), j());
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
			let n = wa(e);
			if (!n) return;
			let r = Ya(n, e.type, () => {
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
		function ee(e) {
			if (e.type === "pointercancel" && (w.current = !1), !x.current) return;
			let n = S.current;
			c(), f() === "intentional" && (e.type === "pointercancel" ? n && s() : _(e) || (n ? s() : (typeof h != "function" || h(e)) && (t.clear(), C.current = !0, j())));
		}
		function B(e) {
			if (f() !== "sloppy" || !D.current || N(e)) return;
			let t = e.touches[0];
			if (!t) return;
			let n = Math.abs(t.clientX - D.current.startX), r = Math.abs(t.clientY - D.current.startY), i = Math.sqrt(n * n + r * r);
			i > 5 && (D.current.dismissOnTouchEnd = !0), i > 10 && (k(e), O.clear(), D.current = null);
		}
		function te(e) {
			L(e, B);
		}
		function V(e) {
			f() === "sloppy" && D.current && !N(e) && (D.current.dismissOnTouchEnd && k(e), O.clear(), D.current = null);
		}
		function ne(e) {
			L(e, V);
		}
		let re = Xa(r && Xa(Ya(i, "keydown", F), Ya(i, "compositionstart", a), Ya(i, "compositionend", o)), g && Xa(Ya(i, "click", z, !0), Ya(i, "pointerdown", z, !0), Ya(i, "pointerup", ee, !0), Ya(i, "pointercancel", ee, !0), Ya(i, "mousedown", z, !0), Ya(i, "mouseup", ee, !0), Ya(i, "touchstart", R, {
			capture: !0,
			passive: !0
		}), Ya(i, "touchmove", te, {
			capture: !0,
			passive: !0
		}), Ya(i, "touchend", ne, {
			capture: !0,
			passive: !0
		})));
		return () => {
			re(), t.clear(), c(), C.current = !1;
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
	}), [F, P]), ee = _.useMemo(() => ({
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
		floating: ee,
		trigger: z
	} : {}, [
		n,
		z,
		ee
	]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useSyncedFloatingRootContext.mjs
function ac(e) {
	let { popupStore: t, treatPopupAsFloatingElement: n = !1, floatingRootContext: r, floatingId: i, nested: a, onOpenChange: o } = e, s = t.useState("open"), c = t.useState("activeTriggerElement"), l = t.useState(n ? "popupElement" : "positionerElement"), u = o;
	return t.useSyncedValue("floatingId", i), q(() => {
		let e = {
			open: s,
			floatingId: i,
			referenceElement: c,
			floatingElement: l
		};
		Vr(c) && (e.domReferenceElement = c), r.state.positionReference === r.state.referenceElement && (e.positionReference = c), r.update(e);
	}, [
		s,
		i,
		c,
		l,
		r
	]), r.context.onOpenChange = u, r.context.nested = a, r;
}
// node_modules/@base-ui/react/internals/useUnmountAfterClose.mjs
function oc(e) {
	let { open: t, ref: n, preventUnmountOnClose: r, setPreventUnmountOnClose: i, onUnmount: a, animateInitialOpen: o } = e, s = K(i), { mounted: c, setMounted: l, transitionStatus: u } = $i(t, !1, !1, o), d = !t && r;
	q(() => {
		t && s(!1);
	}, [t, s]);
	let f = _.useRef(c), p = _.useRef(!1), m = Vi(), h = () => {
		f.current = !1, l(!1), a();
	};
	q(() => {
		f.current = c, p.current && (p.current = !1, !t && c && h());
	});
	let g = K(() => {
		f.current && (t ? (p.current = !0, m()) : h());
	});
	return aa({
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
var sc = {
	tabIndex: -1,
	[Ta]: ""
};
function cc(e) {
	return (t) => t !== "touch" || e.current;
}
function lc(e, t = !1) {
	let n = Gi(), r = Rs() != null, i = on(() => e(n, r)).current;
	return ac({
		popupStore: i,
		treatPopupAsFloatingElement: t,
		floatingRootContext: i.state.floatingRootContext,
		floatingId: n,
		nested: r,
		onOpenChange: i.setOpen
	}), i;
}
function uc({ handle: e, store: t }) {
	return q(() => e.attachStore(t), [e, t]), null;
}
function dc(e) {
	let t = e.context.triggerElements.size;
	e.select("open") && e.state.triggerCount !== t && e.set("triggerCount", t);
}
function fc(e, t) {
	let n = _.useRef(null);
	return K((r) => {
		let i = n.current;
		if (i !== null) {
			if (i.element === r && i.store === t && i.id === e) return;
			n.current = null;
			let a = i.store;
			a.context.triggerElements.getById(i.id) === i.element && (a.context.triggerElements.delete(i.id), dc(a));
		}
		r !== null && e !== void 0 && (n.current = {
			store: t,
			id: e,
			element: r
		}, t.context.triggerElements.add(e, r), dc(t));
	});
}
function pc(e, t, n, r = !1) {
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
function mc(e) {
	let t = !1;
	return e.preventUnmountOnClose = () => {
		t = !0;
	}, () => t;
}
function hc(e, t, n, r = {}) {
	let i = n.reason, a = i === pr, o = t && i === "trigger-focus", s = !t && (i === "trigger-press" || i === "escape-key"), c = mc(n);
	if (e.context.onOpenChange?.(t, n), n.isCanceled) return;
	r.onBeforeDispatch?.(), e.state.floatingRootContext.dispatchOpenChange(t, n);
	let l = () => {
		let i = pc(e.state, t, n.trigger, c()), l = {
			...r.extraState,
			...i
		};
		o ? l.instantType = "focus" : s ? l.instantType = "dismiss" : a && (l.instantType = void 0), e.update(l);
	};
	a ? v.flushSync(l) : l();
}
function gc(e, t, n, r) {
	let i = n.useState("isMountedByTrigger", e), a = fc(e, n), o = K((t) => {
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
	}), s = K((e) => {
		a(e), e && o(e);
	});
	return q(() => (s(t.current), () => s(null)), [
		s,
		t,
		n,
		e
	]), q(() => {
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
function _c(e, t = {}) {
	let { closeOnActiveTriggerUnmount: n = !1 } = t, r = _.useRef(null), i = e.useState("open");
	q(() => {
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
				let t = J(dr);
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
function vc(e, t, n, r) {
	let { mounted: i, transitionStatus: a, forceUnmount: o } = oc({
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
	return on(() => (t.set("mounted", i), null)), t.useSyncedValues({
		mounted: i,
		transitionStatus: a
	}), {
		forceUnmount: o,
		transitionStatus: a
	};
}
function yc(e, t) {
	e.useSyncedValues(t), q(() => () => {
		e.update({
			activeTriggerProps: yn,
			inactiveTriggerProps: yn,
			popupProps: yn
		});
	}, [e]);
}
function bc(e, t) {
	q(() => {
		!t && e.state.openMethod !== null && e.set("openMethod", null);
	}, [t, e]), q(() => () => {
		e.state.openMethod !== null && e.set("openMethod", null);
	}, [e]);
}
// node_modules/@base-ui/react/utils/popups/popupTriggerMap.mjs
var xc = class {
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
}, Sc = /* @__PURE__ */ o(((e) => {
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
})), Cc = /* @__PURE__ */ o(((e, t) => {
	t.exports = Sc();
})), wc = /* @__PURE__ */ o(((e) => {
	var t = f(), n = Cc();
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
})), Tc = /* @__PURE__ */ o(((e, t) => {
	t.exports = wc();
})), Ec = [], Dc = void 0;
function Oc() {
	return Dc;
}
function kc(e) {
	Ec.push(e);
}
function Ac(e) {
	let t = (t, n) => {
		let r = on(Mc).current, i;
		try {
			Dc = r;
			for (let e of Ec) e.before(r);
			i = e(t, n);
			for (let e of Ec) e.after(r);
			r.didInitialize = !0;
		} finally {
			Dc = void 0;
		}
		return i;
	};
	return t.displayName = e.displayName || e.name, t;
}
function jc(e) {
	return /*#__PURE__*/ _.forwardRef(Ac(e));
}
function Mc() {
	return { didInitialize: !1 };
}
// node_modules/@base-ui/utils/store/useStore.mjs
var Nc = Cc(), Pc = Tc(), Fc = mn(19) ? Rc : zc;
function Ic(e, t, n, r, i) {
	return Fc(e, t, n, r, i);
}
function Lc(e, t, n, r, i) {
	let a = _.useCallback(() => t(e.getSnapshot(), n, r, i), [
		e,
		t,
		n,
		r,
		i
	]);
	return (0, Nc.useSyncExternalStore)(e.subscribe, a, a);
}
kc({
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
		}), (0, Nc.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot));
	}
});
function Rc(e, t, n, r, i) {
	let a = Oc();
	if (!a) return Lc(e, t, n, r, i);
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
function zc(e, t, n, r, i) {
	return (0, Pc.useSyncExternalStoreWithSelector)(e.subscribe, e.getSnapshot, e.getSnapshot, (e) => t(e, n, r, i));
}
// node_modules/@base-ui/utils/store/Store.mjs
var Bc = class {
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
		return Ic(this, e, t, n, r);
	}
}, Vc = class extends Bc {
	constructor(e, t = {}, n) {
		super(e), this.context = t, this.selectors = n;
	}
	useSyncedValue(e, t) {
		_.useDebugValue(e);
		let n = this;
		q(() => {
			n.state[e] !== t && n.set(e, t);
		}, [
			n,
			e,
			t
		]);
	}
	useSyncedValueWithCleanup(e, t) {
		let n = this;
		q(() => (n.state[e] !== t && n.set(e, t), () => {
			n.set(e, void 0);
		}), [
			n,
			e,
			t
		]);
	}
	useSyncedValues(e) {
		let t = this;
		q(() => {
			t.update(e);
		}, [t, ...Object.values(e)]);
	}
	useControlledProp(e, t) {
		_.useDebugValue(e);
		let n = this, r = t !== void 0;
		q(() => {
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
		return _.useDebugValue(e), Ic(this, this.selectors[e], t, n, r);
	}
	useContextCallback(e, t) {
		_.useDebugValue(e);
		let n = K(t ?? _n);
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
}, Hc = {
	open: (e) => e.open,
	transitionStatus: (e) => e.transitionStatus,
	domReferenceElement: (e) => e.domReferenceElement,
	referenceElement: (e) => e.positionReference ?? e.referenceElement,
	floatingElement: (e) => e.floatingElement,
	floatingId: (e) => e.floatingId
}, Uc = class extends Vc {
	constructor(e) {
		let { syncOnly: t, nested: n, onOpenChange: r, triggerElements: i, ...a } = e;
		super({
			...a,
			positionReference: a.referenceElement,
			domReferenceElement: a.referenceElement
		}, {
			onOpenChange: r,
			dataRef: { current: {} },
			events: Ps(),
			nested: n,
			triggerElements: i
		}, Hc), this.syncOnly = t;
	}
	syncOpenEvent = (e, t) => {
		(!e || !this.state.open || t != null && xa(t)) && (this.context.dataRef.current.openEvent = e ? t : void 0);
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
function Wc(e, t, n = !1) {
	return {
		open: !1,
		openProp: void 0,
		mounted: !1,
		transitionStatus: void 0,
		floatingRootContext: new Uc({
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
		activeTriggerProps: yn,
		inactiveTriggerProps: yn,
		popupProps: yn
	};
}
var Gc = (e) => e.triggerIdProp ?? e.activeTriggerId, Kc = (e) => e.openProp ?? e.open, qc = (e) => (e.popupElement?.id ?? e.floatingId) || void 0;
function Jc(e, t) {
	return t !== void 0 && Kc(e) && Gc(e) === t;
}
function Yc(e, t) {
	return Jc(e, t) ? !0 : t !== void 0 && Kc(e) && Gc(e) == null && !e.openedWithoutTrigger && e.triggerCount === 1;
}
var Xc = {
	open: Kc,
	mounted: (e) => e.mounted,
	transitionStatus: (e) => Kc(e) && !e.mounted ? "starting" : e.transitionStatus,
	floatingRootContext: (e) => e.floatingRootContext,
	triggerCount: (e) => e.triggerCount,
	preventUnmountingOnClose: (e) => e.preventUnmountingOnClose,
	payload: (e) => e.payload,
	activeTriggerId: Gc,
	activeTriggerElement: (e) => e.mounted ? e.activeTriggerElement : null,
	popupId: qc,
	isTriggerActive: (e, t) => t !== void 0 && Gc(e) === t,
	isOpenedByTrigger: (e, t) => Jc(e, t),
	isMountedByTrigger: (e, t) => t !== void 0 && Gc(e) === t && e.mounted,
	triggerProps: (e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps,
	triggerPopupId: (e, t) => Yc(e, t) ? qc(e) : void 0,
	popupProps: (e) => e.popupProps,
	popupElement: (e) => e.popupElement,
	positionerElement: (e) => e.positionerElement
};
// node_modules/@base-ui/react/utils/popups/usePopupHandleStore.mjs
function Zc(e) {
	let t = _.useCallback((t) => e === void 0 ? _n : e.subscribeStore(t), [e]), n = _.useCallback(() => e === void 0 ? void 0 : e.store, [e]);
	return (0, Nc.useSyncExternalStore)(t, n, () => e?.serverStore);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function Qc(e) {
	let { open: t = !1, onOpenChange: n, elements: r = {} } = e, i = Gi(), a = Rs() != null, o = on(() => new Uc({
		open: t,
		transitionStatus: void 0,
		onOpenChange: n,
		referenceElement: r.reference ?? null,
		floatingElement: r.floating ?? null,
		triggerElements: new xc(),
		floatingId: i,
		syncOnly: !1,
		nested: a
	})).current;
	return q(() => {
		let e = {
			open: t,
			floatingId: i
		};
		r.reference !== void 0 && (e.referenceElement = r.reference, e.domReferenceElement = Vr(r.reference) ? r.reference : null), r.floating !== void 0 && (e.floatingElement = r.floating), o.update(e);
	}, [
		t,
		i,
		r.reference,
		r.floating,
		o
	]), o.context.onOpenChange = n, o.context.nested = a, o;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useFocus.mjs
var $c = ki && ji;
function el(e, t = {}) {
	let { enabled: n = !0, delay: r } = t, { events: i, dataRef: a } = e.context, o = _.useRef(!1), s = _.useRef(null), c = _.useRef(!0), l = ha();
	_.useEffect(() => {
		let t = e.select("domReferenceElement");
		if (!n) return;
		let r = Rr(t);
		function i() {
			let t = e.select("domReferenceElement");
			!e.select("open") && Hr(t) && t === Sa(hi(t)) && (o.current = !0, s.current = t);
		}
		function a() {
			c.current = !0;
		}
		function l() {
			c.current = !1;
		}
		return Xa(Ya(r, "blur", i), $c && Ya(r, "keydown", a, !0), $c && Ya(r, "pointerdown", l, !0));
	}, [e, n]), _.useEffect(() => {
		if (!n) return;
		function t(t) {
			if (t.reason === "trigger-press" || t.reason === "escape-key") {
				let t = e.select("domReferenceElement");
				Vr(t) && (s.current = t, o.current = !0);
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
				let a = wa(n.nativeEvent);
				if (Vr(a)) {
					if ($c && !n.relatedTarget) {
						if (!c.current && !Fa(a)) return;
					} else if (!Ra(a)) return;
				}
				let u = Ma(n.relatedTarget, e.context.triggerElements), { nativeEvent: d, currentTarget: f } = n;
				e.select("open") && u || !r ? e.setOpen(!0, J(mr, d, f)) : l.start(r, () => {
					o.current || e.setOpen(!0, J(mr, d, f));
				});
			},
			onBlur(n) {
				t();
				let r = n.relatedTarget, i = n.nativeEvent, o = Vr(r) && r.hasAttribute(us("focus-guard")) && r.getAttribute("data-type") === "outside";
				l.start(0, () => {
					let t = e.select("domReferenceElement"), n = Sa(hi(t));
					!r && n === t || Y(a.current.floatingContext?.refs.floating.current, n) || Y(t, n) || o || Ma(r ?? n, e.context.triggerElements) || e.setOpen(!1, J(mr, i));
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
var tl = class e {
	pointerType = void 0;
	interactedInside = !1;
	handler = void 0;
	blockMouseMove = !0;
	performedPointerEventsMutation = !1;
	pointerEventsScopeElement = null;
	pointerEventsReferenceElement = null;
	pointerEventsFloatingElement = null;
	restTimeoutPending = !1;
	openChangeTimeout = new ma();
	restTimeout = new ma();
	handleCloseOptions = void 0;
	static create() {
		return new e();
	}
	dispose = () => {
		this.openChangeTimeout.clear(), this.restTimeout.clear();
	};
	disposeEffect = () => this.dispose;
}, nl = /* @__PURE__ */ new WeakMap();
function rl(e) {
	if (!e.performedPointerEventsMutation) return;
	let t = e.pointerEventsScopeElement;
	t && nl.get(t) === e && (e.pointerEventsScopeElement?.style.removeProperty("pointer-events"), e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"), e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"), nl.delete(t)), e.performedPointerEventsMutation = !1, e.pointerEventsScopeElement = null, e.pointerEventsReferenceElement = null, e.pointerEventsFloatingElement = null;
}
function il(e, t) {
	let { scopeElement: n, referenceElement: r, floatingElement: i } = t, a = nl.get(n);
	a && a !== e && rl(a), rl(e), e.performedPointerEventsMutation = !0, e.pointerEventsScopeElement = n, e.pointerEventsReferenceElement = r, e.pointerEventsFloatingElement = i, nl.set(n, e), n.style.pointerEvents = "none", r.style.pointerEvents = "auto", i.style.pointerEvents = "auto";
}
function al(e) {
	let t = e.context.dataRef.current, n = on(() => t.hoverInteractionState ?? tl.create()).current;
	return t.hoverInteractionState ||= n, Ji(t.hoverInteractionState.disposeEffect), t.hoverInteractionState;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs
function ol(e, t = {}) {
	let { enabled: n = !0, closeDelay: r = 0, nodeId: i } = t, a = e.useState("open"), o = e.useState("floatingElement"), s = e.useState("domReferenceElement"), { dataRef: c } = e.context, l = zs(), u = Rs(), d = al(e), f = ha(), p = K(() => Ua(c.current.openEvent?.type, d.interactedInside)), m = K(() => Wa(c.current.openEvent?.type)), h = K(() => {
		rl(d);
	});
	q(() => {
		a || (d.pointerType = void 0, d.restTimeoutPending = !1, d.interactedInside = !1, h());
	}, [
		a,
		d,
		h
	]), _.useEffect(() => h, [h]), q(() => {
		if (n && a && d.handleCloseOptions?.blockPointerEvents && m() && Vr(s) && o) {
			let e = s, t = o, n = hi(o), r = l?.nodesRef.current.find((e) => e.id === u)?.context?.elements.floating;
			r && (r.style.pointerEvents = "");
			let i = d.pointerEventsScopeElement === t ? null : d.pointerEventsScopeElement, a = r === t ? null : r, c = d.handleCloseOptions?.getScope?.() ?? i ?? a ?? Ca(e, "[data-rootownerid]") ?? n.body;
			return il(d, {
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
			return !!(l && u && cs(l.nodesRef.current, u).length > 0);
		}
		function a(t) {
			let n = Va(r, "close", d.pointerType), i = () => {
				e.setOpen(!1, J(pr, t)), l?.events.emit("floating.closed", t);
			};
			n ? d.openChangeTimeout.start(n, i) : (d.openChangeTimeout.clear(), i());
		}
		function s(e) {
			let t = wa(e);
			Ia(t) ? d.interactedInside = Ca(t, "[aria-haspopup]") != null : d.interactedInside = !1;
		}
		function g() {
			d.openChangeTimeout.clear(), f.clear(), l?.events.off("floating.closed", v), h();
		}
		function _(n) {
			if (t() && l) {
				l.events.on("floating.closed", v);
				return;
			}
			if (Ma(n.relatedTarget, e.context.triggerElements)) return;
			let r = c.current.floatingContext?.nodeId ?? i, o = n.relatedTarget;
			l && r && Vr(o) && cs(l.nodesRef.current, r, !1).some((e) => Y(e.context?.elements.floating, o)) || (d.handler ? d.handler(n) : (h(), m() && !p() && a(n)));
		}
		function v(n) {
			l && u && !t() && f.start(0, () => {
				l.events.off("floating.closed", v), e.setOpen(!1, J(pr, n)), l.events.emit("floating.closed", n);
			});
		}
		let y = o;
		return Xa(y && Ya(y, "mouseenter", g), y && Ya(y, "mouseleave", _), y && Ya(y, "pointerdown", s, !0), () => {
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
var sl = { current: null };
function cl(e, t = {}) {
	let { enabled: n = !0, delay: r = 0, handleClose: i = null, mouseOnly: a = !1, restMs: o = 0, move: s = !0, triggerElementRef: c = sl, externalTree: l, isActiveTrigger: u = !0, getHandleCloseContext: d, isClosing: f, shouldOpen: p, guardStaleOpen: m = !1 } = t, { dataRef: h, events: g } = e.context, y = zs(l), b = al(e), x = _.useRef(!1), S = Za(i), C = Za(r), w = Za(o), T = Za(n), E = Za(p), D = Za(f), O = K(() => Ua(h.current.openEvent?.type, b.interactedInside)), k = K(() => E.current?.() !== !1), A = K((t, n, r) => {
		let i = e.context.triggerElements;
		if (i.hasElement(n)) return !t || !Y(t, n);
		if (!Vr(r)) return !1;
		let a = r;
		return i.hasMatchingElement((e) => Y(e, a)) && (!t || !Y(t, a));
	}), j = K(() => {
		b.handler &&= (hi(e.select("domReferenceElement")).removeEventListener("mousemove", b.handler), void 0);
	}), M = K(() => {
		rl(b);
	});
	return u && (b.handleCloseOptions = i?.__options), _.useEffect(() => j, [j]), _.useEffect(() => {
		if (!n) return;
		function e(e) {
			e.open ? x.current = !1 : (x.current = e.reason === pr, j(), b.openChangeTimeout.clear(), b.restTimeout.clear(), b.blockMouseMove = !0, b.restTimeoutPending = !1);
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
			let r = Va(C.current, "close", b.pointerType);
			r ? b.openChangeTimeout.start(r, () => {
				e.setOpen(!1, J(pr, t)), y?.events.emit("floating.closed", t);
			}) : n && (b.openChangeTimeout.clear(), e.setOpen(!1, J(pr, t)), y?.events.emit("floating.closed", t));
		}
		let r = c.current ?? (u ? e.select("domReferenceElement") : null);
		if (!Vr(r)) return;
		function i(t) {
			if (b.openChangeTimeout.clear(), b.blockMouseMove = !1, a && !ba(b.pointerType)) return;
			let n = Ha(w.current), r = Va(C.current, "open", b.pointerType), i = wa(t), o = t.currentTarget ?? null, s = e.select("domReferenceElement"), c = o;
			if (Vr(i) && !e.context.triggerElements.hasElement(i)) {
				for (let t of e.context.triggerElements.elements()) if (Y(t, i)) {
					c = t;
					break;
				}
			}
			Vr(o) && Vr(s) && !e.context.triggerElements.hasElement(o) && Y(o, s) && (c = s);
			let l = c != null && A(s, c, i), u = e.select("open"), d = D.current?.() ?? e.select("transitionStatus") === "ending", f = !u && d && x.current, p = !l && Vr(c) && Vr(s) && Y(s, c) && f, m = n > 0 && !r, h = l && (u || f) || p, g = !u || l;
			h ? k() && e.setOpen(!0, J(pr, t, c)) : m || (r ? b.openChangeTimeout.start(r, () => {
				g && k() && e.setOpen(!0, J(pr, t, c));
			}) : g && k() && e.setOpen(!0, J(pr, t, c)));
		}
		function o(n) {
			if (O()) {
				M();
				return;
			}
			j();
			let r = hi(e.select("domReferenceElement"));
			b.restTimeout.clear(), b.restTimeoutPending = !1;
			let i = h.current.floatingContext ?? d?.();
			if (!Ma(n.relatedTarget, e.context.triggerElements)) {
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
				} else b.pointerType === "touch" && Y(e.select("floatingElement"), n.relatedTarget) || t(n);
			}
		}
		function l(e) {
			Y(r, e.relatedTarget) || (b.openChangeTimeout.clear(), b.restTimeout.clear(), b.restTimeoutPending = !1);
		}
		let f = m ? Ya(r, "mouseout", l) : void 0;
		return s ? Xa(Ya(r, "mousemove", i, { once: !0 }), Ya(r, "mouseenter", i), Ya(r, "mouseleave", o), f) : Xa(Ya(r, "mouseenter", i), Ya(r, "mouseleave", o), f);
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
				if (a && !ba(b.pointerType)) return;
				if (o && s && b.handleCloseOptions?.blockPointerEvents) {
					let t = e.select("floatingElement");
					if (t) {
						let e = b.handleCloseOptions?.getScope?.() ?? r.ownerDocument.body;
						il(b, {
							scopeElement: e,
							referenceElement: r,
							floatingElement: t
						});
					}
				}
				let c = Ha(w.current);
				if (o && !s || c === 0 || !s && b.restTimeoutPending && t.movementX ** 2 + t.movementY ** 2 < 2) return;
				b.restTimeout.clear();
				function l() {
					if (b.restTimeoutPending = !1, O()) return;
					let t = e.select("open");
					!b.blockMouseMove && (!t || s) && k() && e.setOpen(!0, J(pr, n, r));
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
function ll(e) {
	return ji && e.movementX === 0 && e.movementY === 0;
}
function ul(e, t, n) {
	switch (e) {
		case "vertical": return t;
		case "horizontal": return n;
		default: return t || n;
	}
}
function dl(e, t) {
	return ul(t, e === "ArrowUp" || e === "ArrowDown", e === "ArrowLeft" || e === "ArrowRight");
}
function fl(e, t, n) {
	return ul(t, e === "ArrowDown", n ? e === "ArrowLeft" : e === "ArrowRight") || e === "Enter" || e === " " || e === "";
}
function pl(e, t, n) {
	return ul(t, n ? e === Da : e === Oa, e === Aa);
}
function ml(e, t, n, r) {
	return t === "both" || t === "horizontal" && r ? e === "Escape" : ul(t, n ? e === Oa : e === Da, e === ka);
}
function hl(e, t) {
	let { listRef: n, activeIndex: r, onNavigate: i = () => {}, enabled: a = !0, selectedIndex: o = null, allowEscape: s = !1, loopFocus: c = !1, nested: l = !1, rtl: u = !1, virtual: d = !1, focusItemOnOpen: f = "auto", focusItemOnHover: p = !0, openOnArrowKeyDown: m = !0, disabledIndices: h = void 0, orientation: g = "vertical", triggerOrientation: v = g, parentOrientation: y, id: b, resetOnPointerLeave: x = !0, externalTree: S, nestedReturnFocusRef: C, grid: w } = t, T = w != null, E = e.useState("open"), D = e.useState("floatingElement"), O = e.useState("domReferenceElement"), k = e.context.dataRef, A = za(D), j = La(O), M = Za(A), N = Rs(), P = zs(S), F = _.useRef(f), I = _.useRef(o ?? -1), L = _.useRef(null), R = _.useRef(!0), z = K((e) => {
		i(I.current === -1 ? null : I.current, e);
	}), ee = _.useRef(!!D), B = _.useRef(E), te = _.useRef(!1), V = _.useRef(!1), ne = _.useRef(null), re = Za(h), ie = Za(E), ae = Za(o), oe = Za(x), se = Qi(), ce = Qi(), H = K(() => {
		se.cancel();
		function e(e) {
			d || (ne.current = fs(e, {
				sync: te.current,
				preventScroll: !0
			}));
		}
		let t = n.current[I.current], r = V.current;
		t && e(t), (te.current ? (e) => e() : (e) => se.request(e))(() => {
			let i = n.current[I.current] || t;
			i && (t || e(i), me && (r || !R.current) && i.scrollIntoView?.({
				block: "nearest",
				inline: "nearest"
			}));
		});
	});
	q(() => {
		k.current.orientation = g;
	}, [k, g]), q(() => {
		E || (L.current = null), E && f === "auto" || (F.current = f);
	}, [E, f]), q(() => {
		a && (E && D ? (I.current = o ?? -1, F.current && o != null && (V.current = !0, z())) : ee.current && (I.current = -1, z()));
	}, [
		a,
		E,
		D,
		o,
		z
	]), q(() => {
		if (a) {
			if (!E) te.current = !1;
			else if (D) {
				if (r == null) {
					if (te.current = !1, ae.current != null) return;
					if (ee.current && (I.current = -1, H()), (!B.current || !ee.current) && F.current && (L.current != null || F.current === !0 && L.current == null)) {
						let e = 0, t = () => {
							n.current[0] == null ? (e < 2 && (e ? (e) => ce.request(e) : queueMicrotask)(t), e += 1) : (I.current = L.current == null || fl(L.current, v, u) || l ? Mo(n) : No(n), L.current = null, z());
						};
						t();
					}
				} else jo(n.current, r) || (I.current = r, H(), V.current = !1);
			}
		}
	}, [
		a,
		E,
		D,
		r,
		ae,
		l,
		n,
		v,
		u,
		z,
		H,
		ce
	]), q(() => {
		if (!a || D || !P || d || !ee.current) return;
		let e = P.nodesRef.current, t = e.find((e) => e.id === N)?.context?.elements.floating, n = Sa(hi(O ?? t ?? null)), r = e.some((e) => e.context && Y(e.context.elements.floating, n));
		t && !r && R.current && t.focus({ preventScroll: !0 });
	}, [
		a,
		D,
		O,
		P,
		N,
		d
	]), q(() => {
		B.current = E, ee.current = !!D;
	});
	let le = r != null, ue = K((e) => {
		if (!ie.current) return;
		let t = n.current.indexOf(e.currentTarget);
		t !== -1 && (I.current !== t || r !== t) && (I.current = t, z(e));
	}), de = K(() => y ?? P?.nodesRef.current.find((e) => e.id === N)?.context?.dataRef?.current.orientation), fe = K(() => Mo(n, re.current)), pe = K((t) => {
		if (R.current = !1, te.current = !0, t.which === 229 || !ie.current && t.currentTarget === M.current) return;
		if (l && ml(t.key, g, u, T)) {
			dl(t.key, de()) || ga(t), e.setOpen(!1, J(br, t.nativeEvent));
			let n = C?.current ?? O;
			Hr(n) && n.focus();
			return;
		}
		r != null && r !== I.current && !jo(n.current, r) && (I.current = r);
		let i = I.current, a = Mo(n, h), o = No(n, h);
		if (j || (t.key === "Home" && (ga(t), I.current = a, z(t)), t.key === "End" && (ga(t), I.current = o, z(t))), w != null) {
			let e = w(t, I.current, n, g, c, u, h, a, o);
			if (e != null && e !== I.current && (I.current = e, z(t)), g === "both") return;
		}
		if (dl(t.key, g)) {
			ga(t);
			let e = Sa(t.currentTarget.ownerDocument);
			if (E && !d && Y(t.currentTarget, e) && !n.current.some((t) => t != null && Y(t, e))) {
				I.current = fl(t.key, g, u) ? a : o, z(t), r === I.current && H();
				return;
			}
			let { index: l, wrapped: f } = Po(n.current, i, {
				decrement: !fl(t.key, g, u),
				loopFocus: c,
				allowEscape: s,
				disabledIndices: h,
				minIndex: a,
				maxIndex: o
			});
			f && (te.current = !1), I.current = l, z(t);
		}
	}), me = _.useMemo(() => ({
		onFocus(e) {
			te.current = !0, ue(e);
		},
		onClick({ currentTarget: e }) {
			d || e.focus({ preventScroll: !0 });
		},
		onMouseMove(e) {
			ll(e) || (te.current = !0, V.current = !1, p && ue(e));
		},
		onPointerLeave(e) {
			if (!ie.current || !R.current || e.pointerType === "touch") return;
			te.current = !0;
			let t = e.relatedTarget;
			if (p && !n.current.includes(t) && oe.current && (ne.current?.(), ne.current = null, I.current = -1, z(e), !d)) {
				let e = M.current, t = Sa(hi(e));
				e && Y(e, t) && e.focus({ preventScroll: !0 });
			}
		}
	}), [
		ue,
		ie,
		M,
		p,
		n,
		z,
		oe,
		d
	]), U = _.useMemo(() => d && E && le && { "aria-activedescendant": `${b}-${r}` }, [
		d,
		E,
		le,
		b,
		r
	]), he = _.useMemo(() => ({
		...j ? {} : U,
		onKeyDown(t) {
			if (t.key === "Tab" && t.shiftKey && E && !d) {
				let n = wa(t.nativeEvent);
				if (n && !Y(M.current, n)) return;
				ga(t);
				let r = J(vr, t.nativeEvent);
				e.setOpen(!1, r);
				let i = C?.current ?? O;
				!r.isCanceled && Hr(i) && i.focus();
			} else pe(t);
		},
		onPointerMove(e) {
			ll(e) || (R.current = !0);
		}
	}), [
		U,
		pe,
		M,
		j,
		e,
		E,
		d,
		O,
		C
	]), ge = _.useMemo(() => {
		function t(t) {
			e.setOpen(!0, J(br, t.nativeEvent, t.currentTarget));
		}
		function n(e) {
			f === "auto" && va(e.nativeEvent) && (F.current = !d);
		}
		function r(e) {
			F.current = f, f === "auto" && ya(e.nativeEvent) && (F.current = !0);
		}
		return {
			onKeyDown(n) {
				let r = e.select("open");
				R.current = !1;
				let i = n.key.startsWith("Arrow"), a = pl(n.key, de(), u), o = dl(n.key, r ? g : v), s = (l ? a : o) || n.key === "Enter" || n.key.trim() === "";
				if (d && r && (!l || Fa(n.currentTarget))) return pe(n);
				if (r || m || !i) {
					if (s) {
						let e = dl(n.key, de());
						L.current = l && e ? null : n.key;
					}
					l ? a && (ga(n), r ? (I.current = fe(), z(n), d && M.current?.focus()) : t(n)) : o && (ae.current != null && (I.current = ae.current), ga(n), !r && m ? t(n) : pe(n), r && z(n));
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
		pe,
		f,
		fe,
		l,
		z,
		e,
		m,
		g,
		v,
		de,
		u,
		ae,
		d,
		M
	]), _e = _.useMemo(() => ({
		...U,
		...ge
	}), [U, ge]);
	return _.useMemo(() => a ? {
		reference: _e,
		floating: he,
		item: me,
		trigger: ge
	} : {}, [
		a,
		_e,
		he,
		ge,
		me
	]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useTypeahead.mjs
function gl(e, t) {
	let { listRef: n, elementsRef: r, activeIndex: i, onMatch: a, disabledIndices: o, onTyping: s, enabled: c = !0, resetMs: l = 750, selectedIndex: u = null } = t, d = K(s), f = e.useState("open"), p = ha(), m = _.useRef(""), h = _.useRef(u ?? i ?? -1), g = _.useRef(null), v = K((e) => {
		function t(e) {
			return r?.current[e];
		}
		function s(e) {
			let n = t(e);
			return n && !Ro(n) || n?.matches(":disabled") ? !1 : o == null || !Io(vn, e, o);
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
		if (m.current.length > 0 && e.key === " " && (ga(e), d?.(!0)), m.current.length > 0 && m.current[0] !== " " && c(_, m.current) === -1 && e.key !== " " && d?.(!1), _ == null || e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		f && e.key !== " " && (ga(e), d?.(!0));
		let v = m.current === "";
		v && (h.current = u ?? i ?? -1), _.every((e, t) => e && s(t) ? e[0]?.toLowerCase() !== e[1]?.toLowerCase() : !0) && m.current === e.key && (m.current = "", h.current = g.current), m.current += e.key, p.start(l, () => {
			m.current = "", h.current = g.current, d?.(!1);
		});
		let y = ((v ? u ?? i ?? -1 : h.current) ?? 0) + 1, b = c(_, m.current, y);
		b === -1 ? e.key !== " " && (m.current = "", d?.(!1)) : (a?.(b, e), g.current = b);
	}), y = K((t) => {
		let n = t.relatedTarget, r = e.select("domReferenceElement"), i = e.select("floatingElement");
		Y(r, n) || Y(i, n) || (p.clear(), m.current = "", h.current = g.current, d?.(!1));
	});
	q(() => {
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
var _l = .1, vl = _l * _l, yl = .5;
function bl(e, t, n, r, i, a) {
	return r >= t != a >= t && e <= (i - n) * (t - r) / (a - r) + n;
}
function xl(e, t, n, r, i, a, o, s, c, l) {
	let u = !1;
	return bl(e, t, n, r, i, a) && (u = !u), bl(e, t, i, a, o, s) && (u = !u), bl(e, t, o, s, c, l) && (u = !u), bl(e, t, c, l, n, r) && (u = !u), u;
}
function Sl(e, t, n) {
	return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
}
function Cl(e, t, n, r, i, a) {
	return e >= Math.min(n, i) && e <= Math.max(n, i) && t >= Math.min(r, a) && t <= Math.max(r, a);
}
function wl(e = {}) {
	let { blockPointerEvents: t = !1 } = e, n = new ma(), r = ({ x: e, y: t, placement: r, elements: i, onClose: a, nodeId: o, tree: s }) => {
		let c = r?.split("-")[0], l = !1, u = null, d = null, f = typeof performance < "u" ? performance.now() : 0;
		function p(e, t) {
			let n = performance.now(), r = n - f;
			if (u === null || d === null || r === 0) return u = e, d = t, f = n, !1;
			let i = e - u, a = t - d, o = i * i + a * a, s = r * r * vl;
			return u = e, d = t, f = n, o < s;
		}
		function m() {
			n.clear(), a();
		}
		return function(r) {
			n.clear();
			let a = i.domReference, u = i.floating;
			if (!a || !u || c == null || e == null || t == null) return;
			let { clientX: d, clientY: f } = r, h = wa(r), g = r.type === "mouseleave", _ = Y(u, h), v = Y(a, h);
			if (_ && (l = !0, !g)) return;
			if (v && (l = !1, !g)) {
				l = !0;
				return;
			}
			if (g && Vr(r.relatedTarget) && Y(u, r.relatedTarget)) return;
			function y() {
				return !!(s && cs(s.nodesRef.current, o).length > 0);
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
					j = Cl(d, f, D, x.top + 1, O, S.bottom - 1);
					break;
				case "bottom":
					j = Cl(d, f, D, S.top + 1, O, x.bottom - 1);
					break;
				case "left":
					j = Cl(d, f, S.right - 1, A, x.left + 1, k);
					break;
				case "right": j = Cl(d, f, x.right - 1, A, S.left + 1, k);
			}
			if (j) return;
			if (l && !Sl(d, f, x) || !g && p(d, f)) {
				b();
				return;
			}
			let M = !1;
			switch (c) {
				case "top": {
					let n = T ? yl / 2 : yl * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t + yl + 1, o = C || T ? S.bottom - yl : S.top, s = C ? T ? S.bottom - yl : S.top : S.bottom - yl;
					M = xl(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "bottom": {
					let n = T ? yl / 2 : yl * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t - yl, o = C || T ? S.top + yl : S.bottom, s = C ? T ? S.top + yl : S.bottom : S.top + yl;
					M = xl(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "left": {
					let n = E ? yl / 2 : yl * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e + yl + 1, o = w || E ? S.right - yl : S.left, s = w ? E ? S.right - yl : S.left : S.right - yl;
					M = xl(d, f, o, S.top, s, S.bottom, a, r, a, i);
					break;
				}
				case "right": {
					let n = E ? yl / 2 : yl * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e - yl, o = w || E ? S.left + yl : S.right, s = w ? E ? S.left + yl : S.right : S.left + yl;
					M = xl(d, f, a, r, a, i, o, S.top, s, S.bottom);
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
function Tl(e, t, n) {
	let { reference: r, floating: i } = e, a = go(t), o = _o(t), s = ho(o), c = fo(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = po(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function El(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = uo(t, e), p = ko(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Ao(await i.getClippingRect({
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
	}, y = Ao(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var Dl = 50, Ol = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: El
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Tl(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < Dl && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Tl(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, kl = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = uo(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = fo(r), _ = go(o), v = fo(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Do(o)] : yo(o)), x = p !== "none";
			!d && x && b.push(...Eo(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = vo(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === go(t) || T.every((e) => go(e.placement) !== _ || e.overflows[0] > 0))) return {
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
								let t = go(e.placement);
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
}, Al = /*#__PURE__*/ new Set(["left", "top"]);
async function jl(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = fo(n), s = po(n), c = go(n) === "y", l = Al.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = uo(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var Ml = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await jl(t, e);
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
}, Nl = function(e) {
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
			} }, ...l } = uo(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = go(i), p = mo(f), m = u[p], h = u[f], g = (e, t) => lo(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
}, Pl = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = uo(e, t), u = {
				x: n,
				y: r
			}, d = go(i), f = mo(d), p = u[f], m = u[d], h = uo(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = Al.has(fo(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Fl = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = uo(e, t), c = await i.detectOverflow(t, s), l = fo(n), u = po(n), d = go(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = ro(p - c[m], g), y = ro(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * io(c.left, c.right) : S = p - 2 * io(c.top, c.bottom)), await o({
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
function Il(e) {
	let t = ti(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Hr(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = ao(n) !== a || ao(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Ll(e) {
	return Vr(e) ? e : e.contextElement;
}
function Rl(e) {
	let t = Ll(e);
	if (!Hr(t)) return so(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Il(t), o = (a ? ao(n.width) : n.width) / r, s = (a ? ao(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
var zl = /*#__PURE__*/ so(0);
function Bl(e) {
	let t = Rr(e);
	return !$r() || !t.visualViewport ? zl : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Vl(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Rr(e);
}
function Hl(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Ll(e), o = so(1);
	t && (r ? Vr(r) && (o = Rl(r)) : o = Rl(e));
	let s = Vl(a, n, r) ? Bl(a) : so(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Rr(a), t = Vr(r) ? Rr(r) : r, n = e, i = oi(n);
		for (; i && t !== n;) {
			let e = Rl(i), t = i.getBoundingClientRect(), r = ti(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Rr(i), i = oi(n);
		}
	}
	return Ao({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Ul(e, t) {
	let n = ni(e).scrollLeft;
	return t ? t.left + n : Hl(zr(e)).left + n;
}
function Wl(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Ul(e, n),
		y: n.top + t.scrollTop
	};
}
function Gl(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = zr(r), s = t ? Kr(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = so(1), u = so(0), d = Hr(r);
	if ((d || !a) && ((Lr(r) !== "body" || Wr(o)) && (c = ni(r)), d)) {
		let e = Hl(r);
		l = Rl(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Wl(o, c) : so(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Kl(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function ql(e) {
	let t = ni(e), n = e.ownerDocument.body, r = io(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = io(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Ul(e), o = -t.scrollTop;
	return ti(n).direction === "rtl" && (a += io(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Jl = 25;
function Yl(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Rr(e), a = zr(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !$r() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Ul(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Jl && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Xl(e, t) {
	let n = Hl(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Rl(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Zl(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Yl(e, n, t);
	else if (t === "document") r = ql(zr(e));
	else if (Vr(t)) r = Xl(t, n);
	else {
		let n = Bl(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Ao(r);
}
function Ql(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = ai(e, [], !1).filter((e) => Vr(e) && Lr(e) !== "body"), i = null, a = ti(e).position === "fixed", o = a ? ri(e) : e;
	for (; Vr(o) && !ei(o);) {
		let e = ti(o), t = Zr(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = ri(o);
	}
	return t.set(e, r), r;
}
function $l(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Kr(t) ? [] : Ql(t, this._c) : [].concat(n), r], o = Zl(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Zl(t, a[e], i);
		s = io(n.top, s), c = ro(n.right, c), l = ro(n.bottom, l), u = io(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function eu(e) {
	let { width: t, height: n } = Il(e);
	return {
		width: t,
		height: n
	};
}
function tu(e, t, n) {
	let r = Hr(t), i = zr(t), a = n === "fixed", o = Hl(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = so(0);
	if ((r || !a) && ((Lr(t) !== "body" || Wr(i)) && (s = ni(t)), r)) {
		let e = Hl(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Ul(i));
	let l = i && !r && !a ? Wl(i, s) : so(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function nu(e) {
	return ti(e).position === "static";
}
function ru(e, t) {
	if (!Hr(e) || ti(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return zr(e) === n && (n = n.ownerDocument.body), n;
}
function iu(e, t) {
	let n = Rr(e);
	if (Kr(e)) return n;
	if (!Hr(e)) {
		let t = ri(e);
		for (; t && !ei(t);) {
			if (Vr(t) && !nu(t)) return t;
			t = ri(t);
		}
		return n;
	}
	let r = ru(e, t);
	for (; r && Gr(r) && nu(r);) r = ru(r, t);
	return r && ei(r) && nu(r) && !Zr(r) ? n : r || Qr(e) || n;
}
var au = async function(e) {
	let t = this.getOffsetParent || iu, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: tu(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function ou(e) {
	return ti(e).direction === "rtl";
}
var su = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Gl,
	getDocumentElement: zr,
	getClippingRect: $l,
	getOffsetParent: iu,
	getElementRects: au,
	getClientRects: Kl,
	getDimensions: eu,
	getScale: Rl,
	isElement: Vr,
	isRTL: ou
};
function cu(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function lu(e, t, n) {
	let r = null, i, a = zr(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = oo(d), h = oo(a.clientWidth - (u + f)), g = oo(a.clientHeight - (d + p)), _ = oo(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: io(0, ro(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!cu(l, e.getBoundingClientRect())) return s();
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
	let c = Rr(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function uu(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Ll(e), u = i || a ? [...l ? ai(l) : [], ...t ? ai(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? lu(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Hl(e) : null;
	c && g();
	function g() {
		let t = Hl(e);
		h && !cu(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var du = Ml, fu = Nl, pu = kl, mu = Fl, hu = Pl, gu = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...su,
		...i.platform,
		_c: r
	};
	return Ol(e, t, {
		...i,
		platform: a
	});
}, _u = typeof document < "u" ? _.useLayoutEffect : function() {};
function vu(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!vu(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !vu(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function yu(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function bu(e, t) {
	let n = yu(e);
	return Math.round(t * n) / n;
}
function xu(e) {
	let t = _.useRef(e);
	return _u(() => {
		t.current = e;
	}), t;
}
function Su(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = _.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = _.useState(r);
	vu(f, r) || p(r);
	let [m, h] = _.useState(null), [g, y] = _.useState(null), b = _.useCallback((e) => {
		e !== w.current && (w.current = e, h(e));
	}, []), x = _.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = a || m, C = o || g, w = _.useRef(null), T = _.useRef(null), E = _.useRef(u), D = c != null, O = xu(c), k = xu(i), A = xu(l), j = _.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		k.current && (e.platform = k.current), gu(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !vu(E.current, t) && (E.current = t, v.flushSync(() => {
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
	_u(() => {
		l === !1 && E.current.isPositioned && (E.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let M = _.useRef(!1);
	_u(() => (M.current = !0, () => {
		M.current = !1;
	}), []), _u(() => {
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
		let t = bu(P.floating, u.x), r = bu(P.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...yu(P.floating) >= 1.5 && { willChange: "transform" }
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
var Cu = (e, t) => {
	let n = du(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, wu = (e, t) => {
	let n = fu(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Tu = (e, t) => ({
	fn: hu(e).fn,
	options: [e, t]
}), Eu = (e, t) => {
	let n = pu(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Du = (e, t) => {
	let n = mu(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Ou = /*#__PURE__*/ _.createContext(void 0);
function ku(e) {
	let t = _.useContext(Ou);
	if (t === void 0 && !e) throw Error($t(69));
	return t;
}
// node_modules/@base-ui/react/internals/composite/composite.mjs
var Au = "ArrowUp", ju = "ArrowDown", Mu = "ArrowLeft", Nu = "ArrowRight", Pu = /* @__PURE__ */ new Set([
	Au,
	ju,
	Mu,
	Nu,
	"Home",
	"End"
]), Fu = [
	"Shift",
	"Control",
	"Alt",
	"Meta"
];
function Iu(e) {
	return Hr(e) && e.tagName === "INPUT";
}
function Lu(e) {
	return !!(Iu(e) && e.selectionStart != null || Hr(e) && e.tagName === "TEXTAREA");
}
function Ru(e, t, n, r) {
	if (!e || !t || !t.scrollTo) return;
	let i = e.scrollLeft, a = e.scrollTop, o = e.clientWidth < e.scrollWidth, s = e.clientHeight < e.scrollHeight;
	if (o && r !== "vertical") {
		let r = zu(e, t, "left"), a = Bu(e), o = Bu(t);
		n === "ltr" && (r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight ? i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight : r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft && (i = r - o.scrollMarginLeft - a.scrollPaddingLeft)), n === "rtl" && (r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft ? i = r - o.scrollMarginLeft - a.scrollPaddingLeft : r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight && (i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight));
	}
	if (s && r !== "horizontal") {
		let n = zu(e, t, "top"), r = Bu(e), i = Bu(t);
		n - i.scrollMarginTop < e.scrollTop + r.scrollPaddingTop ? a = n - i.scrollMarginTop - r.scrollPaddingTop : n + t.offsetHeight + i.scrollMarginBottom > e.scrollTop + e.clientHeight - r.scrollPaddingBottom && (a = n + t.offsetHeight + i.scrollMarginBottom - e.clientHeight + r.scrollPaddingBottom);
	}
	e.scrollTo({
		left: i,
		top: a,
		behavior: "auto"
	});
}
function zu(e, t, n) {
	let r = n === "left" ? "offsetLeft" : "offsetTop", i = 0;
	for (; t.offsetParent && (i += t[r], t.offsetParent !== e);) t = t.offsetParent;
	return i;
}
function Bu(e) {
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
function Vu(e) {
	return e === "starting" ? ws : yn;
}
// node_modules/@base-ui/react/menu/submenu-root/MenuSubmenuRootContext.mjs
var Hu = /*#__PURE__*/ _.createContext(void 0);
function Uu() {
	return _.useContext(Hu);
}
// node_modules/@base-ui/react/internals/resolveRenderedId.mjs
function Wu(e, t) {
	let n = Vn(e.render);
	if (/*#__PURE__*/ _.isValidElement(n)) {
		let e = n.props;
		if (Object.hasOwn(e, "id")) return e.id ?? "";
	}
	return e.id ?? t;
}
function Gu(e, t, n) {
	let r = Wu(e, t), i = r === t ? void 0 : r;
	return [r, _.useCallback((e) => n?.(e ? i : void 0), [i, n])];
}
// node_modules/@base-ui/react/internals/resolvePopupLabel.mjs
function Ku(e, t, n) {
	let r = Vn(e.render), i = /*#__PURE__*/ _.isValidElement(r) ? r.props : void 0, a = e["aria-label"] ?? i?.["aria-label"], o = e["aria-labelledby"] ?? i?.["aria-labelledby"];
	return o == null && !a && (o = t ? t.id || void 0 : n || void 0), o;
}
// node_modules/@base-ui/react/menu/popup/MenuPopup.mjs
var qu = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, id: o, initialFocus: s, ...c } = e, { store: l, defaultFloatingId: u, setRenderedFloatingId: d, virtualFocus: f, orientation: p } = rn(), m = Uu(), { side: h, align: g } = tn(), v = ku(!0) != null, y = l.useState("open"), b = l.useState("transitionStatus"), x = l.useState("popupProps"), S = l.useState("mounted"), C = l.useState("instantType"), w = l.useState("activeTriggerElement"), T = l.useState("parent"), E = l.useState("lastOpenChangeReason"), D = l.useState("rootId"), O = l.useState("floatingRootContext"), k = l.useState("floatingTreeRoot"), A = l.useState("closeDelay"), j = l.useState("hoverEnabled"), M = l.useState("disabled"), N = l.useState("openMethod"), P = l.useState("activeTriggerId"), F = l.useState("listElement"), [I, L] = Gu(e, u, d), R = Ku(e, w, P), z = T.type === "menu" ? m : void 0, ee = T.type === "context-menu", B = s ?? T.type !== "menu";
	s === void 0 && F && T.type !== "menu" && (B = () => l.state.activeIndex === null && F), aa({
		open: y,
		ref: l.context.popupRef,
		onComplete() {
			y && l.context.onOpenChangeComplete?.(!0);
		}
	}), _.useEffect(() => {
		function e(e) {
			l.setOpen(!1, J(e.reason, e.domEvent));
		}
		return k.events.on("close", e), () => {
			k.events.off("close", e);
		};
	}, [k.events, l]), ol(O, {
		enabled: j && !M && !ee && T.type !== "menubar",
		closeDelay: A
	});
	let te = l.useStateSetter("popupElement"), { parentVirtualFocusRef: V, handleFocus: ne } = (_.useContext(jr)?.useParentHandoff ?? Yu)(l, T, y, f), re = Ln("div", e, {
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
			te,
			L
		],
		stateAttributesMapping: cr,
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
					z?.onPopupKeyDown?.(e), v && Pu.has(e.key) && e.stopPropagation();
				},
				onFocus: ne
			},
			Vu(b),
			c,
			{ "data-rootownerid": D }
		]
	}), ie = T.type === void 0 || ee;
	(w || T.type === "menubar" && E !== "outside-press") && (ie = !0);
	let ae = z?.getReturnElement ?? V;
	return /*#__PURE__*/ (0, G.jsx)(Zs, {
		context: O,
		openInteractionType: N,
		modal: ee,
		disabled: !S,
		returnFocus: a ?? ae ?? ie,
		explicitReturnFocus: a === void 0 && ae ? !1 : void 0,
		initialFocus: B,
		restoreFocus: !0,
		getInsideElements: T.type === void 0 ? () => [l.context.beforeTriggerFocusGuardRef.current] : void 0,
		externalTree: T.type === "menubar" ? void 0 : k,
		previousFocusableElement: w,
		nextFocusableElement: T.type === void 0 ? l.context.triggerFocusTargetRef : void 0,
		beforeContentFocusGuardRef: l.context.beforeContentFocusGuardRef,
		children: re
	});
}), Ju = {
	parentVirtualFocusRef: void 0,
	handleFocus: void 0
};
function Yu() {
	return Ju;
}
var Xu = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let n = Mr()?.Popup ?? qu;
	return /*#__PURE__*/ (0, G.jsx)(n, {
		...e,
		ref: t
	});
}), Zu = /*#__PURE__*/ _.createContext(void 0);
function Qu() {
	let e = _.useContext(Zu);
	if (e === void 0) throw Error($t(32));
	return e;
}
// node_modules/@base-ui/react/menu/portal/MenuPortal.mjs
var $u = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i, parent: a } = rn();
	if (!(i.useState("mounted") || n)) return null;
	let o = a.type === "menu" || a.type === "menubar" ? "group" : void 0;
	return /*#__PURE__*/ (0, G.jsx)(Zu.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, G.jsx)(Ns, {
			ref: t,
			...r,
			portalOwnerRole: o
		})
	});
});
// node_modules/@base-ui/utils/inertValue.mjs
function ed(e) {
	return mn(19) ? e : e ? "true" : void 0;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useFloating.mjs
function td(e) {
	let { nodeId: t, externalTree: n, rootContext: r } = e, i = r.useState("referenceElement"), a = r.useState("floatingElement"), o = r.useState("domReferenceElement"), s = r.useState("open"), c = r.useState("floatingId"), [l, u] = _.useState(null), d = _.useRef(null), f = zs(n), p = _.useMemo(() => ({
		reference: i,
		floating: a,
		domReference: o
	}), [
		i,
		a,
		o
	]), m = Su({
		...e,
		elements: {
			...p,
			...l && { reference: l }
		}
	}), h = _.useCallback((e) => {
		let t = Vr(e) ? {
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
	return q(() => {
		o && (d.current = o);
	}, [o]), q(() => {
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
var nd = /*#__PURE__*/ _.createContext(void 0);
function rd() {
	return _.useContext(nd)?.direction ?? "ltr";
}
// node_modules/@base-ui/react/floating-ui-react/middleware/arrow.mjs
var id = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = uo(e, t) || {};
		if (l == null) return {};
		let d = ko(u), f = {
			x: n,
			y: r
		}, p = _o(i), m = ho(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = s.floating[y] || a.floating[m], C = b / 2 - x / 2, w = S / 2 - h[m] / 2 - 1, T = Math.min(d[_], w), E = Math.min(d[v], w), D = T, O = S - h[m] - E, k = S / 2 - h[m] / 2 + C, A = lo(D, k, O), j = !c.arrow && po(i) != null && k !== A && a.reference[m] / 2 - (k < D ? T : E) - h[m] / 2 < 0, M = j ? k < D ? k - D : k - O : 0;
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
}), ad = (e, t) => {
	let { name: n, fn: r } = id(e);
	return {
		name: n,
		fn: r,
		options: [e, t]
	};
}, od = {
	name: "hide",
	async fn(e) {
		let { width: t, height: n, x: r, y: i } = e.rects.reference, a = t === 0 && n === 0 && r === 0 && i === 0, o = await e.platform.detectOverflow(e, { elementContext: "reference" });
		return { data: { referenceHidden: o.top - n >= 0 || o.right - t >= 0 || o.bottom - n >= 0 || o.left - t >= 0 || a } };
	}
}, sd = {
	sideX: "left",
	sideY: "top"
}, cd = "--available-width", ld = "--available-height", ud = "--anchor-width", dd = "--anchor-height", fd = "--transform-origin", pd = cd, md = ld;
function hd(e, t, n) {
	let r = e === "inline-start" || e === "inline-end";
	return {
		top: "top",
		right: r ? n ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: r ? n ? "inline-end" : "inline-start" : "left"
	}[t];
}
function gd(e, t, n) {
	let { rects: r, placement: i } = e;
	return {
		side: hd(t, fo(i), n),
		align: po(i) || "center",
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
function _d(e) {
	return vd(e, td);
}
function vd(e, t) {
	let { anchor: n, positionMethod: r = "absolute", side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, collisionBoundary: c, collisionPadding: l = 5, sticky: u = !1, arrowPadding: d = 5, disableAnchorTracking: f = !1, inline: p, keepMounted: m = !1, floatingRootContext: h, mounted: g, collisionAvoidance: v, shift: y, nodeId: b, adaptiveOrigin: x, lazyFlip: S = !1, externalTree: C } = e, w = v.side || "flip", T = v.align || "flip", E = v.fallbackAxisSide || "end", D = y?.crossAxis ?? !1, O = y?.rootBoundary, k = typeof n == "function" ? n : void 0, A = K(k), j = k ? A : n, M = Za(n), N = Za(g), P = rd() === "rtl", [F, I] = _.useState(null);
	!g && F !== null && I(null);
	let L = S === "placement", R = F ? fo(F) : null, z = F && L ? po(F) || "center" : null, ee = R || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": P ? "left" : "right",
		"inline-start": P ? "right" : "left"
	}[i], B = z || o, te = B === "center" ? ee : `${ee}-${B}`, V = l;
	typeof V == "number" ? V = {
		top: V,
		right: V,
		bottom: V,
		left: V
	} : V &&= {
		top: V.top || 0,
		right: V.right || 0,
		bottom: V.bottom || 0,
		left: V.left || 0
	};
	let ne = +(i === "bottom"), re = +(i === "top"), ie = +(i === "right"), ae = +(i === "left"), oe = {
		boundary: c === "clipping-ancestors" ? "clippingAncestors" : c,
		padding: V
	}, se = _.useRef(null), ce = Za(a), H = Za(s), le = typeof a == "function" ? 0 : a, ue = typeof s == "function" ? 0 : s, de = [];
	p && de.push(p), de.push(Cu((e) => {
		let t = gd(e, i, P), n = typeof ce.current == "function" ? ce.current(t) : ce.current, r = typeof H.current == "function" ? H.current(t) : H.current;
		return {
			mainAxis: n,
			crossAxis: r,
			alignmentAxis: r
		};
	}, [
		le,
		ue,
		P,
		i
	]));
	let fe = T === "none" && w !== "shift", pe = !fe && (u || D || w === "shift"), me = w === "none" ? null : Eu({
		...oe,
		padding: {
			top: V.top + 1 + ne,
			right: V.right + 1 + ae,
			bottom: V.bottom + 1 + re,
			left: V.left + 1 + ie
		},
		mainAxis: !D && w === "flip",
		crossAxis: T === "flip" && "alignment",
		fallbackAxisSideDirection: E
	}), U = fe ? null : wu({
		...oe,
		rootBoundary: O,
		mainAxis: T !== "none",
		crossAxis: pe,
		limiter: u || D ? void 0 : Tu((e) => {
			if (!se.current) return {};
			let { width: t, height: n } = se.current.getBoundingClientRect(), r = go(fo(e.placement)), i = r === "y" ? t : n, a = r === "y" ? V.left + V.right : V.top + V.bottom;
			return { offset: i / 2 + a / 2 };
		})
	}, [
		oe,
		u,
		D,
		O,
		V,
		T
	]);
	w === "shift" || T === "shift" || B === "center" ? de.push(U, me) : de.push(me, U), de.push(Du({
		...oe,
		apply({ elements: { floating: e }, availableWidth: t, availableHeight: n, rects: r }) {
			if (!N.current) return;
			let i = e.style;
			i.setProperty(pd, `${t}px`), i.setProperty(md, `${n}px`);
			let a = Rr(e).devicePixelRatio || 1, { x: o, y: s, width: c, height: l } = r.reference, u = (Math.round((o + c) * a) - Math.round(o * a)) / a, d = (Math.round((s + l) * a) - Math.round(s * a)) / a;
			i.setProperty(ud, `${u}px`), i.setProperty(dd, `${d}px`);
		}
	}), ad((e) => ({
		element: se.current || hi(e.elements.floating).createElement("div"),
		padding: se.current ? d : 0
	}), [d]), {
		name: "transformOrigin",
		fn(e) {
			let { elements: { floating: t }, middlewareData: n, placement: r, platform: o, rects: s, y: c } = e, l = fo(r), u = po(r), d = go(l) === "y", f = se.current, p = typeof a == "function" ? a(gd(e, i, P)) : a, m;
			m = !f && u && Math.abs(d ? n.shift?.x || 0 : n.shift?.y || 0) <= 1 ? u === "start" === (d && o.isRTL?.(t) === !0) ? "100%" : "0%" : `${(d ? n.arrow?.x || 0 : n.arrow?.y || 0) + (d ? f?.clientWidth || 0 : f?.clientHeight || 0) / 2}px`;
			let h = l === "top" || l === "left" ? `calc(100% + ${p}px)` : `${-p}px`;
			return pe && d && Math.abs(n.shift?.y || 0) > p && (h = `${s.reference.y + s.reference.height / 2 - c}px`), t.style.setProperty(fd, d ? `${m} ${h}` : `${h} ${m}`), {};
		}
	}, od, x), q(() => {
		!g && h && h.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null,
			positionReference: null
		});
	}, [g, h]);
	let he = _.useMemo(() => ({
		ancestorScroll: !f,
		elementResize: !f && typeof ResizeObserver < "u",
		layoutShift: !f && typeof IntersectionObserver < "u"
	}), [f]), { refs: ge, elements: _e, x: ve, y: ye, middlewareData: W, update: be, placement: xe, context: Se, isPositioned: Ce, floatingStyles: we } = t({
		rootContext: h,
		open: m ? g : void 0,
		placement: te,
		middleware: de,
		strategy: r,
		whileElementsMounted: m ? void 0 : (...e) => uu(...e, he),
		nodeId: b,
		externalTree: C
	}), { sideX: Te, sideY: Ee } = W.adaptiveOrigin || sd, De = Ce ? r : "fixed", Oe = _.useMemo(() => {
		let e;
		return e = Ce ? x ? {
			position: De,
			[Te]: ve,
			[Ee]: ye
		} : {
			...we,
			position: De
		} : {
			position: De,
			top: 0,
			left: 0
		}, e[pd] = "100vw", e[md] = "100vh", Ce || (e.opacity = 0), e;
	}, [
		x,
		De,
		Te,
		ve,
		Ee,
		ye,
		we,
		Ce
	]), ke = _.useRef(null);
	q(() => {
		if (!g) return;
		let e = M.current, t = typeof e == "function" ? e() : e, n = (yd(t) ? t.current : t) || null;
		n !== ke.current && (ge.setPositionReference(n), ke.current = n);
	}, [
		g,
		ge,
		j,
		M
	]), _.useEffect(() => {
		if (!g) return;
		let e = M.current;
		typeof e != "function" && yd(e) && e.current !== ke.current && (ge.setPositionReference(e.current), ke.current = e.current);
	}, [
		g,
		ge,
		j,
		M
	]), _.useEffect(() => {
		if (m && g && _e.reference && _e.floating) return uu(_e.reference, _e.floating, be, he);
	}, [
		m,
		g,
		_e,
		be,
		he
	]);
	let Ae = fo(xe), je = hd(i, Ae, P), Me = po(xe) || "center", Ne = !!W.hide?.referenceHidden;
	q(() => {
		S && g && Ce && (Ae !== ee || L && Me !== B) && I(xe);
	}, [
		S,
		L,
		g,
		Ce,
		xe,
		Ae,
		Me,
		ee,
		B
	]);
	let Pe = _.useMemo(() => ({
		position: "absolute",
		top: W.arrow?.y,
		left: W.arrow?.x
	}), [W.arrow]), Fe = W.arrow?.centerOffset !== 0;
	return _.useMemo(() => ({
		positionerStyles: Oe,
		arrowStyles: Pe,
		arrowRef: se,
		arrowUncentered: Fe,
		side: je,
		align: Me,
		physicalSide: Ae,
		anchorHidden: Ne,
		refs: ge,
		context: Se,
		isPositioned: Ce,
		update: be
	}), [
		Oe,
		Pe,
		se,
		Fe,
		je,
		Me,
		Ae,
		Ne,
		ge,
		Se,
		Ce,
		be
	]);
}
function yd(e) {
	return e != null && "current" in e;
}
// node_modules/@base-ui/react/internals/composite/list/CompositeList.mjs
function bd(e) {
	let { children: t, elementsRef: n, labelsRef: r, onMapChange: i } = e, a = K(i), [, o] = _.useState(0), s = on(Sd).current, c = on(xd).current, l = _.useRef(0), u = _.useRef(!0), d = _.useRef(null), f = _.useRef(null), p = K(() => {
		u.current || (u.current = !0, o((e) => e + 1));
	}), m = K((e, t) => {
		c.set(e, t), p();
	}), h = K((e) => {
		c.delete(e), p();
	}), g = K((e) => {
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
			if (!Td(n)) return;
			let r = null;
			for (let n of e) if (n.isConnected) {
				if (r && Ed(r, n) > 0) {
					t.disconnect(), p();
					return;
				}
				r = n;
			}
		});
		f.current = t;
		let n = /* @__PURE__ */ new Set();
		for (let t = 1; t < e.length; t += 1) {
			let r = wd(e[t - 1], e[t]);
			r && n.add(r);
		}
		n.forEach((e) => t.observe(e, { childList: !0 }));
	}
	let y = K(() => {
		let [e, t] = Cd(c), n = g(e), r = d.current, i = !r || r.length !== e.length || e.some((e, t) => {
			let n = r[t];
			return e.index !== n.index || e.element !== n.element || e.registration.index !== n.registration.index || e.registration.metadata !== n.registration.metadata;
		});
		v(t), d.current = e, u.current = !1, i && (s.forEach((e) => e(n)), a(n));
	});
	q(() => (!u.current && d.current && g(d.current), () => {
		n.current = [], r && (r.current = []);
	}), [
		n,
		r,
		g
	]), q(() => {
		u.current && y();
	}), q(() => () => {
		f.current?.disconnect(), u.current = !0;
	}, []);
	let b = K((e) => (s.add(e), () => {
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
	return /*#__PURE__*/ (0, G.jsx)(Ri.Provider, {
		value: x,
		children: t
	});
}
function xd() {
	return /* @__PURE__ */ new Map();
}
function Sd() {
	return /* @__PURE__ */ new Set();
}
function Cd(e) {
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
	return r.sort((e, t) => Ed(e.element, t.element)), r.forEach((e) => {
		for (; t.has(i);) i += 1;
		e.index = i, n.push(e), i += 1;
	}), t.size > 0 && n.sort((e, t) => e.index - t.index), [n, r.map((e) => e.element)];
}
function wd(e, t) {
	let n = e.parentElement;
	for (; n && !n.contains(t);) n = n.parentElement;
	return n;
}
function Td(e) {
	for (let t of e) for (let e = 0; e < t.removedNodes.length; e += 1) if (t.removedNodes[e].isConnected) return !0;
	return !1;
}
function Ed(e, t) {
	return e.nextElementSibling === t ? -1 : t.nextElementSibling === e ? 1 : e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
// node_modules/@base-ui/react/utils/InternalBackdrop.mjs
var Dd = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { cutout: n, ...r } = e, i;
	if (n) {
		let e = n.getBoundingClientRect();
		i = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${e.left}px ${e.top}px,${e.left}px ${e.bottom}px,${e.right}px ${e.bottom}px,${e.right}px ${e.top}px,${e.left}px ${e.top}px)`;
	}
	return /*#__PURE__*/ (0, G.jsx)("div", {
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
function Od(e) {
	let { store: t, domReference: n, positionerElement: r, open: i } = e, a = _.useRef(null), o = _.useRef(null), s = ia(r);
	q(() => {
		i || (o.current?.abort(), o.current = null, t.state.instantType === "trigger-change" && t.set("instantType", void 0));
	}, [i, t]), q(() => {
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
function kd(e, t, { styles: n, transitionStatus: r, props: i, refs: a, hidden: o, inert: s = !1 }) {
	let c = { ...n };
	return s && (c.pointerEvents = "none"), Ln("div", e, {
		state: t,
		ref: a,
		props: [
			{
				role: "presentation",
				hidden: o,
				style: c
			},
			Vu(r),
			i
		],
		stateAttributesMapping: sr
	});
}
// node_modules/@base-ui/utils/useScrollLock.mjs
var Ad = {}, jd = {}, Md = "";
function Nd(e, t) {
	return Wr(e) ? e : t;
}
function Pd(e, t, n) {
	return /hidden|clip/.test(e.getComputedStyle(Nd(t, n)).overflowY);
}
function Fd(e) {
	if (typeof document > "u") return !1;
	let t = hi(e);
	return Rr(t).innerWidth - t.documentElement.clientWidth > 0;
}
function Id(e) {
	if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u") return !1;
	let t = hi(e), n = t.documentElement, r = t.body, i = Nd(n, r), a = i.style.overflowY, o = n.style.scrollbarGutter;
	n.style.scrollbarGutter = "stable", i.style.overflowY = "scroll";
	let s = i.offsetWidth;
	i.style.overflowY = "hidden";
	let c = i.offsetWidth;
	return i.style.overflowY = a, n.style.scrollbarGutter = o, s === c;
}
function Ld(e) {
	let t = hi(e), n = t.documentElement, r = t.body, i = Nd(n, r), a = {
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
function Rd(e) {
	let t = hi(e), n = t.documentElement, r = t.body, i = Rr(n), a = 0, o = 0, s = !1, c = Zi.create();
	if (ji && (i.visualViewport?.scale ?? 1) !== 1) return () => {};
	function l() {
		let t = i.getComputedStyle(n), c = i.getComputedStyle(r), l = (t.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
		a = n.scrollTop, o = n.scrollLeft, Ad = {
			scrollbarGutter: n.style.scrollbarGutter,
			overflowY: n.style.overflowY,
			overflowX: n.style.overflowX
		}, Md = n.style.scrollBehavior, jd = {
			position: r.style.position,
			height: r.style.height,
			width: r.style.width,
			boxSizing: r.style.boxSizing,
			overflowY: r.style.overflowY,
			overflowX: r.style.overflowX,
			scrollBehavior: r.style.scrollBehavior
		};
		let u = n.scrollHeight > n.clientHeight, d = n.scrollWidth > n.clientWidth, f = t.overflowY === "scroll" || c.overflowY === "scroll", p = t.overflowX === "scroll" || c.overflowX === "scroll", m = Math.max(0, i.innerWidth - r.clientWidth), h = Math.max(0, i.innerHeight - r.clientHeight), g = parseFloat(c.marginTop) + parseFloat(c.marginBottom), _ = parseFloat(c.marginLeft) + parseFloat(c.marginRight), v = Nd(n, r);
		s = Id(e), s ? (n.style.scrollbarGutter = l, v.style.overflowY = "hidden", v.style.overflowX = "hidden") : (Object.assign(n.style, {
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
		Object.assign(n.style, Ad), Object.assign(r.style, jd), s || (n.scrollTop = a, n.scrollLeft = o, n.removeAttribute("data-base-ui-scroll-locked"), n.style.scrollBehavior = Md);
	}
	function d() {
		u(), c.request(l);
	}
	l();
	let f = Ya(i, "resize", d);
	return () => {
		c.cancel(), u(), typeof i.removeEventListener == "function" && f();
	};
}
var zd = new class {
	lockCount = 0;
	restore = null;
	timeoutLock = ma.create();
	timeoutUnlock = ma.create();
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
		let t = hi(e), n = t.documentElement, r = t.body, i = Rr(n);
		if (Pd(i, n, r)) {
			let t = new i.MutationObserver(() => {
				Pd(i, n, r) || (t.disconnect(), this.restore = null, this.lock(e));
			}), a = { attributes: !0 };
			t.observe(n, a), t.observe(r, a), this.restore = () => t.disconnect();
			return;
		}
		let a = Ei || !Fd(e);
		this.restore = a ? Ld(e) : Rd(e);
	}
}();
function Bd(e = !0, t = null) {
	q(() => {
		if (e) return zd.acquire(t);
	}, [e, t]);
}
// node_modules/@base-ui/react/utils/useAnchoredPopupScrollLock.mjs
var Vd = 20;
function Hd(e, t, n, r) {
	let [i, a] = _.useState(!1);
	q(() => {
		if (!e || !t || n == null) {
			a(!1);
			return;
		}
		let r = hi(n).documentElement.clientWidth, i = n.offsetWidth;
		a(r > 0 && i > 0 && i >= r - Vd);
	}, [
		e,
		t,
		n
	]), Bd(e && (!t || i), r);
}
// node_modules/@base-ui/react/menu/positioner/MenuPositioner.mjs
var Ud = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o, align: s, sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = Es, style: g, ...v } = e, { store: y, virtualFocus: b, syncHighlightedItem: x } = rn(), S = Qu(), C = ur(!0), w = y.useState("parent"), T = y.useState("floatingRootContext"), E = y.useState("floatingTreeRoot"), D = y.useState("mounted"), O = y.useState("open"), k = y.useState("modal"), A = y.useState("openMethod"), j = y.useState("activeTriggerElement"), M = y.useState("transitionStatus"), N = y.useState("positionerElement"), P = y.useState("instantType"), F = y.useState("adaptiveOrigin"), I = y.useState("lastOpenChangeReason"), L = y.useState("floatingNodeId"), R = y.useState("floatingParentNodeId"), z = T.useState("domReferenceElement"), ee = n, B = c, te = l, V = s, ne = h;
	w.type === "context-menu" && (ee = n ?? w.context?.anchor, V ??= "start", !o && V !== "center" && (te = e.alignOffset ?? 2, B = e.sideOffset ?? -5));
	let re = o, ie = V;
	w.type === "menu" ? (re ??= "inline-end", ie ??= "start", ne = e.collisionAvoidance ?? Ds) : w.type === "menubar" && (re ??= w.context.orientation === "vertical" ? "inline-end" : "bottom", ie ??= "start");
	let ae = w.type === "context-menu", oe = _d({
		anchor: ee,
		floatingRootContext: T,
		positionMethod: C ? "fixed" : r,
		mounted: D,
		side: re,
		sideOffset: B,
		align: ie,
		alignOffset: te,
		arrowPadding: ae ? 0 : f,
		collisionBoundary: u,
		collisionPadding: d,
		sticky: p,
		nodeId: L,
		keepMounted: S,
		disableAnchorTracking: m,
		collisionAvoidance: ne,
		shift: ae ? {
			crossAxis: !("side" in ne && ne.side === "flip"),
			rootBoundary: "layoutViewport"
		} : void 0,
		externalTree: E,
		adaptiveOrigin: F,
		lazyFlip: b ? "placement" : !1
	});
	_.useEffect(() => {
		function e(e) {
			e.open && (e.parentNodeId === L && y.set("hoverEnabled", !1), e.nodeId !== L && e.parentNodeId === y.select("floatingParentNodeId") && y.setOpen(!1, J(wr)));
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
			y.setOpen(!1, J(t));
		}
		return E.events.on("menuopenchange", e), () => {
			E.events.off("menuopenchange", e);
		};
	}, [E.events, y]);
	let se = ha();
	_.useEffect(() => {
		O || se.clear();
	}, [O, se]), _.useEffect(() => {
		function e(e) {
			if (O && e.nodeId === y.select("floatingParentNodeId")) {
				if (e.target && j && j !== e.target) {
					let e = y.select("closeDelay");
					e > 0 ? se.isStarted() || se.start(e, () => {
						y.setOpen(!1, J(wr));
					}) : y.setOpen(!1, J(wr));
				} else se.clear();
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
		se
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
	]), Od({
		store: y,
		domReference: z,
		positionerElement: N,
		open: O
	});
	let ce = {
		open: O,
		side: oe.side,
		align: oe.align,
		anchorHidden: oe.anchorHidden,
		nested: w.type === "menu",
		instant: P
	}, H = w.type === "menubar" && w.context.modal;
	Hd(O && (H || k && I !== "trigger-hover"), A === "touch", N, j);
	let le = kd(e, ce, {
		styles: oe.positionerStyles,
		transitionStatus: M,
		props: v,
		refs: [t, y.useStateSetter("positionerElement")],
		hidden: !D,
		inert: !O
	}), ue = D && w.type !== "menu" && (w.type !== "menubar" && k && I !== "trigger-hover" || w.type === "menubar" && w.context.modal), de = null;
	return w.type === "menubar" ? de = w.context.contentElement : w.type === void 0 && (de = j), /*#__PURE__*/ (0, G.jsxs)(en.Provider, {
		value: oe,
		children: [ue && /*#__PURE__*/ (0, G.jsx)(Dd, {
			ref: w.type === "context-menu" || w.type === "nested-context-menu" ? w.context.internalBackdropRef : null,
			inert: ed(!O),
			cutout: de
		}), /*#__PURE__*/ (0, G.jsx)(Vs, {
			id: L,
			children: /*#__PURE__*/ (0, G.jsx)(bd, {
				elementsRef: y.context.itemDomElements,
				labelsRef: y.context.itemLabels,
				onMapChange: x,
				children: le
			})
		})]
	});
}), Wd = /*#__PURE__*/ _.createContext(null);
function Gd(e) {
	let t = _.useContext(Wd);
	if (t === null && !e) throw Error($t(5));
	return t;
}
// node_modules/@base-ui/utils/useEnhancedClickHandler.mjs
function Kd(e) {
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
function qd(e, t) {
	let n = _.useRef(e), r = K(t);
	q(() => {
		n.current !== e && r(n.current), n.current = e;
	}, [e, r]);
}
// node_modules/@base-ui/react/utils/useOpenInteractionType.mjs
function Jd(e, t) {
	let { onClick: n, onPointerDown: r } = Kd(K((n, r) => {
		(typeof e == "function" ? e() : e) || t(r || (Ei ? "touch" : ""));
	}));
	return _.useMemo(() => ({
		onClick: n,
		onPointerDown: r
	}), [n, r]);
}
function Yd(e) {
	let [t, n] = _.useState(null), r = Jd(e, n);
	return qd(e, (t) => {
		t && !e && n(null);
	}), _.useMemo(() => ({
		openMethod: t,
		triggerProps: r
	}), [t, r]);
}
// node_modules/@base-ui/react/utils/getHighlightReason.mjs
function Xd(e) {
	return e == null ? dr : e.type.startsWith("key") ? xr : e.type.startsWith("mouse") || e.type.startsWith("pointer") ? Sr : dr;
}
// node_modules/@base-ui/react/menu/store/MenuStore.mjs
var Zd = {
	...Xc,
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
		let n = Xc.triggerPopupId(e, t);
		return n ? e.listElement?.id || n : void 0;
	},
	filterTriggerProps: (e) => e.filterTriggerProps,
	inputProps: (e) => e.inputProps,
	webkitAriaSelected: (e, t) => ji && e.inputFocused && t ? !0 : void 0,
	highlightedItemId: (e) => e.highlightedItem?.id || void 0,
	isActive: (e, t) => e.activeIndex === t,
	hoverEnabled: (e) => e.hoverEnabled,
	instantType: (e) => e.instantType === "trigger-change" && !Xc.open(e) ? void 0 : e.instantType,
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
}, Qd = class extends Vc {
	constructor(e, t, n = !1) {
		let r = new xc(), i = ef(r, t, n, e);
		super(i, $d(r), Zd), this.observe("parent", (e) => {
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
function $d(e) {
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
function ef(e, t, n = !1, r) {
	return {
		...Wc(e, t, n),
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
		filterTriggerProps: yn,
		inputProps: yn,
		inputFocused: !1,
		highlightedItem: void 0,
		hoverEnabled: !0,
		instantType: void 0,
		openChangeReason: null,
		floatingTreeRoot: new Fs(),
		floatingNodeId: void 0,
		floatingParentNodeId: null,
		itemProps: yn,
		keyboardEventRelay: void 0,
		closeDelay: 0,
		adaptiveOrigin: void 0,
		...r
	};
}
// node_modules/@base-ui/react/menu/filter-provider/MenuFilterProviderContext.mjs
var tf = /*#__PURE__*/ _.createContext(null);
// node_modules/@base-ui/react/menu/utils/isKeyboardOpen.mjs
function nf(e, t) {
	return (e === "trigger-press" || e === "item-press") && t?.detail === 0;
}
function rf(e, t) {
	return e === "list-navigation" || nf(e, t);
}
// node_modules/@base-ui/react/menu/root/MenuRoot.mjs
var af = Ac(function(e) {
	let { children: t, open: n, onOpenChange: r, onOpenChangeComplete: i, onItemHighlighted: a, defaultOpen: o = !1, disabled: s = !1, modal: c, loopFocus: l = !0, orientation: u = "vertical", actionsRef: d, closeParentOnEsc: f = !1, handle: p, triggerId: m, defaultTriggerId: h = null, highlightItemOnHover: g = !0, isSubmenu: v = !1, virtualFocus: y = !1, virtualFocusRef: b, allowEscape: x = !0, resetOnPointerLeave: S = !0 } = e, C = ur(!0), w = rn(!0), T = Gd(!0), E = w?.store, D = w?.virtualFocus ?? !1, O = _.useMemo(() => v && E ? {
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
	]), k = Ki(), A = Ki(), [j, M] = _.useState(void 0), N = (j ?? A) || void 0, P = Rs(), F = O.type === "menu" ? O.store : void 0, I = (n ?? o) && F?.state.transitionStatus === "starting", L = on(() => I ? F?.state.instantType : void 0).current, R = on(() => {
		let e = new Qd({
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
	let z = R.useState("floatingTreeRoot"), ee = Bs(z), B = R.useState("open"), te = R.useState("activeTriggerElement"), V = R.useState("positionerElement"), ne = R.useState("hoverEnabled"), re = R.useState("disabled"), ie = R.useState("lastOpenChangeReason"), ae = R.useState("parent"), oe = R.useState("activeIndex"), se = R.useState("keyboardOpen"), ce = R.useState("payload"), H = R.useState("floatingParentNodeId"), le = _.useRef(null), ue = _.useRef(ae.type !== "context-menu"), de = ha(), fe = _.useRef(!0), pe = ha(), me = H != null, { openMethod: U, triggerProps: he } = Yd(B);
	R.useSyncedValues({
		disabled: s,
		highlightItemOnHover: g,
		modal: ae.type === void 0 ? c : void 0,
		openMethod: U,
		rootId: k
	}), _c(R);
	let { forceUnmount: ge, transitionStatus: _e } = vc(B, R, () => {
		R.set("allowMouseEnter", !1);
	}, I), ve = ia(R.context.popupRef);
	_.useEffect(() => {
		if (L === void 0) return;
		let e = () => {
			R.state.instantType === L && R.set("instantType", void 0);
		};
		if (!B) {
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
		B,
		_e,
		ve,
		R
	]), q(() => {
		C && !w ? R.update({
			parent: {
				type: "context-menu",
				context: C
			},
			floatingNodeId: ee,
			floatingParentNodeId: P
		}) : (w || !R.select("activeTriggerElement")) && R.update({
			floatingNodeId: ee,
			floatingParentNodeId: P
		});
	}, [
		C,
		w,
		ee,
		P,
		te,
		R
	]), _.useEffect(() => {
		B || (le.current = null), ae.type === "context-menu" && (B ? de.start(500, () => {
			ue.current = !0;
		}) : (de.clear(), ue.current = !1));
	}, [
		de,
		B,
		ae.type
	]), q(() => {
		!B && !ne && R.set("hoverEnabled", !0);
	}, [
		B,
		ne,
		R
	]);
	let ye = K((e, t) => {
		let n = t.reason;
		if (!e && !R.select("open") || B === e && t.trigger === te && ie === n) return;
		let i = mc(t);
		if (!e && t.trigger == null && (t.trigger = te ?? void 0), r?.(e, t), t.isCanceled) return;
		R.state.floatingRootContext.dispatchOpenChange(e, t);
		let a = t.event;
		if (e === !1 && n !== "item-press" && a?.type === "click" && a.pointerType === "touch" && !fe.current) return;
		e && n === "trigger-focus" ? (fe.current = !1, pe.start(300, () => {
			fe.current = !0;
		})) : (fe.current = !0, pe.clear());
		let o = !e && (n === "escape-key" || n == null);
		le.current = t.event;
		let s = pc(R.state, e, t.trigger, i());
		s.openChangeReason = n, s.keyboardOpen = e && rf(n, a), s.instantType = ae.type === "menubar" && (n === "trigger-focus" || n === "focus-out" || n === "trigger-hover" || n === "list-navigation" || n === "sibling-open") ? "group" : nf(n, a) ? "click" : o ? "dismiss" : void 0, R.update(s);
	}), W = ac({
		popupStore: R,
		floatingRootContext: R.state.floatingRootContext,
		floatingId: N,
		nested: P != null,
		onOpenChange: ye
	}), be = W.context.events;
	q(() => {
		let e = ({ open: e, eventDetails: t }) => ye(e, t);
		return be.on("setOpen", e), () => {
			be?.off("setOpen", e);
		};
	}, [be, ye]), q(() => R.subscribeToParentMenu(), [R]);
	let xe = _.useCallback(() => {
		R.setOpen(!1, J(Or));
	}, [R]);
	_.useImperativeHandle(d, () => ({
		unmount: ge,
		close: xe
	}), [ge, xe]);
	let Se;
	ae.type === "context-menu" && (Se = ae.context), _.useImperativeHandle(Se?.positionerRef, () => V, [V]), _.useImperativeHandle(Se?.actionsRef, () => ({ setOpen: ye }), [ye]);
	let Ce = ic(W, {
		enabled: !re,
		bubbles: { escapeKey: f && ae.type === "menu" },
		outsidePress() {
			return ae.type !== "context-menu" || le.current?.type === "contextmenu" || ue.current;
		},
		externalTree: me ? z : void 0
	}), we = rd(), Te = hl(W, {
		enabled: !re,
		listRef: R.context.itemDomElements,
		activeIndex: oe,
		virtual: y,
		nested: ae.type === "menubar" || !y && ae.type !== void 0,
		parentOrientation: ae.type === "menubar" ? ae.context.orientation : void 0,
		loopFocus: l,
		focusItemOnOpen: y ? se : void 0,
		allowEscape: y && l && x,
		orientation: u,
		triggerOrientation: y ? "vertical" : u,
		rtl: we === "rtl",
		disabledIndices: vn,
		onNavigate(e, t) {
			R.setActiveIndex(e, Xd(t), t?.nativeEvent);
		},
		openOnArrowKeyDown: ae.type !== "context-menu" && !(y && v),
		externalTree: !y && me ? z : void 0,
		nestedReturnFocusRef: F?.context.virtualFocusRef,
		focusItemOnHover: g,
		resetOnPointerLeave: S
	}), Ee = _.useCallback((e) => {
		R.context.typingRef.current = e;
	}, [R]), De = gl(W, {
		enabled: !re && !y,
		listRef: R.context.itemLabels,
		elementsRef: R.context.itemDomElements,
		activeIndex: oe,
		resetMs: 500,
		onMatch: (e, t) => {
			B && e !== oe && R.setActiveIndex(e, xr, t.nativeEvent);
		},
		onTyping: Ee
	}), Oe = K(a), ke = _.useRef(-1), Ae = K(() => {
		let e = R.state.activeIndex, t = e === null ? void 0 : R.context.itemDomElements.current[e] ?? void 0;
		if (t?.isConnected === !1) return;
		let n = t === void 0 ? -1 : e;
		if (ke.current === n && R.context.reportedItem === t) return;
		ke.current = n, R.context.reportedItem = t, y && R.set("highlightedItem", t);
		let { highlightReason: r, highlightEvent: i } = R.context;
		R.context.highlightReason = dr, R.context.highlightEvent = void 0, a && Oe(t, qi(r, i, { label: t === void 0 ? void 0 : R.context.itemLabels.current[n] ?? void 0 }));
	});
	q(() => {
		Ae();
	}, [oe, Ae]);
	let je = _.useMemo(() => {
		if (!y) return Te.reference;
		if (!Te.trigger) return yn;
		let { onFocus: e, ...t } = Te.trigger;
		return t;
	}, [
		y,
		Te.reference,
		Te.trigger
	]);
	R.useSyncedValue("inputProps", y ? Te.reference ?? yn : yn);
	let Me = _.useMemo(() => {
		let e = wn(De.reference, je, Ce.reference, { onMouseMove() {
			R.set("allowMouseEnter", !0);
		} }, he);
		return e["aria-haspopup"] = "menu", e["aria-expanded"] = B, e;
	}, [
		R,
		De.reference,
		je,
		Ce.reference,
		he,
		B
	]), Ne = _.useMemo(() => {
		let e = wn(Te.trigger, Ce.trigger, he);
		return e["aria-haspopup"] = "menu", e["aria-expanded"] = !1, e;
	}, [
		Te.trigger,
		Ce.trigger,
		he
	]);
	on(() => (R.update({ inactiveTriggerProps: Ne }), null)), yc(R, {
		floatingRootContext: W,
		activeTriggerProps: Me,
		inactiveTriggerProps: Ne,
		popupProps: _.useMemo(() => wn(sc, {
			onMouseMove() {
				R.set("allowMouseEnter", !0), ae.type === "menu" && R.set("hoverEnabled", !1);
			},
			onClick() {
				R.select("hoverEnabled") && R.set("hoverEnabled", !1);
			},
			onKeyDown(e) {
				let t = R.select("keyboardEventRelay");
				t && !e.isPropagationStopped() && t(e);
			}
		}, De.floating, Te.floating, Ce.floating), [
			ae.type,
			R,
			De.floating,
			Te.floating,
			Ce.floating
		]),
		itemProps: Te.item ?? yn
	});
	let Pe = _.useMemo(() => ({
		store: R,
		parent: O,
		orientation: u,
		loopFocus: l,
		allowEscape: x,
		defaultFloatingId: A,
		setRenderedFloatingId: M,
		virtualFocus: y,
		parentVirtualFocus: D,
		syncHighlightedItem: Ae
	}), [
		R,
		O,
		u,
		l,
		x,
		A,
		y,
		D,
		Ae
	]), Fe = typeof t == "function" ? t({ payload: ce }) : t, Ie = /*#__PURE__*/ (0, G.jsxs)(nn.Provider, {
		value: Pe,
		children: [p && /*#__PURE__*/ (0, G.jsx)(uc, {
			handle: p,
			store: R
		}), Fe]
	});
	return (ae.type === void 0 || ae.type === "context-menu") && (Ie = /*#__PURE__*/ (0, G.jsx)(Hs, {
		externalTree: z,
		children: Ie
	})), Ie;
});
function of(e) {
	let t = _.useContext(tf);
	if (t === null) return /*#__PURE__*/ (0, G.jsx)(af, { ...e });
	let n = t.Root;
	return /*#__PURE__*/ (0, G.jsx)(tf.Provider, {
		value: null,
		children: /*#__PURE__*/ (0, G.jsx)(n, {
			...t.options,
			...e
		})
	});
}
// node_modules/@base-ui/react/utils/getPseudoElementBounds.mjs
var sf = 5;
function cf(e, t) {
	let n = lf(t);
	return e.clientX >= n.left - sf && e.clientX <= n.right + sf && e.clientY >= n.top - sf && e.clientY <= n.bottom + sf;
}
function lf(e) {
	let t = e.getBoundingClientRect(), n = Rr(e);
	if (Ni) return t;
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
function uf(e = {}) {
	let { highlightItemOnHover: t, highlightedIndex: n, onHighlightedIndexChange: r } = pi(), { ref: i, index: a } = Bi(e), o = n === a, s = _.useRef(null), c = sn(i, s);
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
function df(e) {
	let { render: t, className: n, style: r, state: i = yn, props: a = vn, refs: o = vn, metadata: s, stateAttributesMapping: c, tag: l = "div", ...u } = e, { compositeProps: d, compositeRef: f } = uf({ metadata: s });
	return Ln(l, e, {
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
function ff(e) {
	if (Hr(e) && e.hasAttribute("data-rootownerid")) return e.getAttribute("data-rootownerid");
	if (!ei(e)) return ff(ri(e));
}
// node_modules/@base-ui/react/utils/popups/useTriggerFocusGuards.mjs
function pf(e, t) {
	function n(n, r, i) {
		let a = n.currentTarget;
		v.flushSync(() => {
			e.setOpen(!1, J(vr, n.nativeEvent, a));
		}), is(a.isConnected ? a : t.current, r, i)?.focus();
	}
	function r(t) {
		n(t, -1, e.select("positionerElement"));
	}
	function i(t) {
		let r = e.select("positionerElement");
		r && as(t, r) ? e.context.beforeContentFocusGuardRef.current?.focus() : n(t, 1, r);
	}
	return {
		handlePreFocusGuardFocus: r,
		handleFocusTargetFocus: i
	};
}
// node_modules/@base-ui/react/utils/useMixedToggleClickHandler.mjs
function mf(e) {
	let { enabled: t = !0, mouseDownAction: n, open: r } = e, i = _.useRef(!1);
	return _.useMemo(() => t ? {
		onMouseDown: (e) => {
			(n === "open" && !r || n === "close" && r) && (i.current = !0, hi(e.currentTarget).addEventListener("click", () => {
				i.current = !1;
			}, { once: !0 }));
		},
		onClick: (e) => {
			i.current && (i.current = !1, e.preventBaseUIHandler());
		}
	} : yn, [
		t,
		n,
		r
	]);
}
// node_modules/@base-ui/react/menu/trigger/MenuTrigger.mjs
var hf = jc(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, openOnHover: c, delay: l = 100, closeDelay: u = 0, handle: d, payload: f, ...p } = e, m = rn(!0), h = Zc(d) ?? m?.store;
	if (!h) throw Error($t(85));
	let g = Ki(s), v = h.useState("isTriggerActive", g), y = h.useState("floatingRootContext"), b = h.useState("isOpenedByTrigger", g), x = h.useState("triggerControlsId", g), S = _.useRef(null), C = _f(), w = pi(!0), T = zs(), E = _.useMemo(() => T ?? new Fs(), [T]), { registerTrigger: D, isMountedByThisTrigger: O } = gc(g, S, h, {
		payload: f,
		closeDelay: u,
		parent: C,
		floatingTreeRoot: E,
		floatingNodeId: Bs(E),
		floatingParentNodeId: Rs(),
		keyboardEventRelay: w?.relayKeyboardEvent
	}), k = C.type === "menubar", A = h.useState("disabled"), j = a || A || k && C.context.disabled, { getButtonProps: M, buttonRef: N } = _i({
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
	let P = _.useRef(null), F = ha(), I = K((e) => {
		if (!P.current) return;
		F.clear(), h.context.allowMouseUpTriggerRef.current = !1;
		let t = e.target;
		Y(P.current, t) || Y(h.select("positionerElement"), t) || t === P.current || t != null && ff(t) === h.select("rootId") || cf(e, P.current) || E.events.emit("close", {
			domEvent: e,
			reason: Cr
		});
	});
	_.useEffect(() => {
		let e = hi(P.current);
		if (b && h.select("lastOpenChangeReason") === "trigger-hover") return e.addEventListener("mouseup", I, { once: !0 }), () => {
			e.removeEventListener("mouseup", I);
		};
	}, [
		b,
		I,
		h
	]);
	let L = k && C.context.hasSubmenuOpen, R = cl(y, {
		enabled: (c ?? L) && !j && (!k || L && !O),
		handleClose: wl({ blockPointerEvents: !k }),
		mouseOnly: !0,
		move: !1,
		restMs: C.type === void 0 ? l : void 0,
		delay: { close: u },
		triggerElementRef: S,
		externalTree: E,
		isActiveTrigger: v,
		isClosing: () => h.select("transitionStatus") === "ending"
	}), z = gf(b, h.select("lastOpenChangeReason")), ee = Qs(y, {
		enabled: !j,
		event: b && k ? "click" : "mousedown",
		toggle: !0,
		ignoreMouse: !1,
		stickIfOpen: C.type === void 0 && z
	}), B = el(y, { enabled: !j && L }), te = mf({
		open: b,
		enabled: k,
		mouseDownAction: "open"
	}), V = _.useMemo(() => wn(B.reference, ee.reference), [B.reference, ee.reference]), ne = h.useState("triggerProps", O), re = h.useState("filterTriggerProps"), { handlePreFocusGuardFocus: ie, handleFocusTargetFocus: ae } = pf(h, S), oe = {
		disabled: j,
		open: b
	}, se = [
		P,
		t,
		N,
		D,
		S
	], ce = [
		V,
		R ?? yn,
		ne,
		{
			"aria-haspopup": "menu",
			"aria-controls": x,
			id: g,
			onMouseDown: (e) => {
				h.select("open") || (F.start(200, () => {
					h.context.allowMouseUpTriggerRef.current = !0;
				}), hi(e.currentTarget).addEventListener("mouseup", I, { once: !0 }));
			}
		},
		re,
		k ? { role: "menuitem" } : {},
		te,
		p,
		M
	], H = Ln("button", e, {
		enabled: !k,
		stateAttributesMapping: or,
		state: oe,
		ref: se,
		props: ce
	});
	return k ? /*#__PURE__*/ (0, G.jsx)(df, {
		tag: "button",
		render: n,
		className: r,
		style: i,
		state: oe,
		refs: se,
		props: ce,
		stateAttributesMapping: or
	}) : b ? /*#__PURE__*/ (0, G.jsxs)(_.Fragment, { children: [
		/*#__PURE__*/ (0, G.jsx)(no, {
			ref: h.context.beforeTriggerFocusGuardRef,
			onFocus: ie
		}, `${g}-pre-focus-guard`),
		/*#__PURE__*/ (0, G.jsx)(_.Fragment, { children: H }, g),
		/*#__PURE__*/ (0, G.jsx)(no, {
			ref: h.context.triggerFocusTargetRef,
			onFocus: ae
		}, `${g}-post-focus-guard`)
	] }) : /*#__PURE__*/ (0, G.jsx)(_.Fragment, { children: H }, g);
});
function gf(e, t) {
	let n = ha(), [r, i] = _.useState(!1);
	return q(() => {
		e && t === "trigger-hover" ? (i(!0), n.start(500, () => {
			i(!1);
		})) : e || (n.clear(), i(!1));
	}, [
		e,
		t,
		n
	]), r;
}
function _f() {
	let e = Gd(!0);
	return _.useMemo(() => e ? {
		type: "menubar",
		context: e
	} : { type: void 0 }, [e]);
}
// node_modules/@base-ui/utils/usePreviousValue.mjs
function vf(e) {
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
var yf = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { className: n, render: r, orientation: i = "horizontal", style: a, ...o } = e;
	return Ln("div", e, {
		state: { orientation: i },
		ref: t,
		props: [{
			role: "separator",
			"aria-orientation": i
		}, o]
	});
});
// node_modules/@base-ui/utils/isElementDisabled.mjs
function bf(e) {
	return e == null || e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true";
}
// node_modules/@base-ui/react/internals/serializeValue.mjs
function xf(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
// node_modules/@base-ui/react/internals/resolveValueLabel.mjs
function Sf(e) {
	return typeof e == "object" && !!e && Array.isArray(e.items);
}
function Cf(e) {
	return Sf(e?.[0]);
}
function wf(e) {
	return Cf(e) ? e.flatMap((e) => e.items) : e;
}
function Tf(e) {
	if (!Array.isArray(e)) return e != null && "null" in e;
	let t = e;
	if (Cf(t)) {
		for (let e of t) for (let t of e.items) if (t && t.value == null && t.label != null) return !0;
		return !1;
	}
	for (let e of t) if (e && e.value == null && e.label != null) return !0;
	return !1;
}
function Ef(e, t) {
	if (t && e != null) return t(e) ?? "";
	if (e && typeof e == "object") {
		if ("label" in e && e.label != null) return String(e.label);
		if ("value" in e) return String(e.value);
	}
	return xf(e);
}
function Df(e, t) {
	return t && e != null ? t(e) ?? "" : e && typeof e == "object" && "value" in e && "label" in e ? xf(e.value) : xf(e);
}
function Of(e, t, n) {
	function r() {
		return Ef(e, n);
	}
	if (n && e != null) return n(e);
	if (e && typeof e == "object" && "label" in e && e.label != null) return e.label;
	if (t && !Array.isArray(t)) return (Object.hasOwn(t, e) ? t[e] : void 0) ?? r();
	if (Array.isArray(t)) {
		let n = wf(t);
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
function kf(e, t, n) {
	return e.reduce((e, r, i) => (i > 0 && e.push(", "), e.push(/*#__PURE__*/ (0, G.jsx)(_.Fragment, { children: Of(r, t, n) }, i)), e), []);
}
// node_modules/clsx/dist/clsx.mjs
function Af(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Af(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function jf() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Af(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/tailwind-merge/dist/bundle-mjs.mjs
var Mf = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, Nf = (e, t) => ({
	classGroupId: e,
	validator: t
}), Pf = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), Ff = "-", If = [], Lf = "arbitrary..", Rf = (e) => {
	let t = Vf(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return Bf(e);
			let n = e.split(Ff);
			return zf(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? Mf(i, t) : t : i || If;
			}
			return n[e] || If;
		}
	};
}, zf = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = zf(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(Ff) : e.slice(t).join(Ff), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, Bf = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? Lf + r : void 0;
})(), Vf = (e) => {
	let { theme: t, classGroups: n } = e;
	return Hf(n, t);
}, Hf = (e, t) => {
	let n = Pf();
	for (let r in e) {
		let i = e[r];
		Uf(i, n, r, t);
	}
	return n;
}, Uf = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		Wf(i, t, n, r);
	}
}, Wf = (e, t, n, r) => {
	typeof e == "string" ? Gf(e, t, n) : typeof e == "function" ? Kf(e, t, n, r) : qf(e, t, n, r);
}, Gf = (e, t, n) => {
	let r = e === "" ? t : Jf(t, e);
	r.classGroupId = n;
}, Kf = (e, t, n, r) => {
	Yf(e) ? Uf(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(Nf(n, e)));
}, qf = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		Uf(o, Jf(t, a), n, r);
	}
}, Jf = (e, t) => {
	let n = e, r = t.split(Ff), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = Pf(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, Yf = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Xf = (e) => {
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
}, Zf = "!", Qf = ":", $f = [], ep = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), tp = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === Qf) {
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
		s.endsWith(Zf) ? (c = s.slice(0, -1), l = !0) : s.startsWith(Zf) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return ep(t, l, c, u);
	};
	if (t) {
		let e = t + Qf, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : ep($f, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, np = (e) => {
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
}, rp = (e) => ({
	cache: Xf(e.cacheSize),
	parseClassName: tp(e),
	sortModifiers: np(e),
	postfixLookupClassGroupIds: ip(e),
	...Rf(e)
}), ip = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, ap = /\s+/, op = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(ap), l = "";
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
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + Zf : _, y = v + g;
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
}, sp = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = cp(n)) && (i && (i += " "), i += r);
	return i;
}, cp = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = cp(e[r])) && (n && (n += " "), n += t);
	return n;
}, lp = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = rp(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = op(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(sp(...e));
}, up = [], dp = (e) => {
	let t = (t) => t[e] || up;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, fp = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, pp = /^\((?:(\w[\w-]*):)?(.+)\)$/i, mp = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, hp = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, gp = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, _p = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, vp = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, yp = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, bp = (e) => mp.test(e), xp = (e) => !!e && !Number.isNaN(Number(e)), Sp = (e) => !!e && Number.isInteger(Number(e)), Cp = (e) => e.endsWith("%") && xp(e.slice(0, -1)), wp = (e) => hp.test(e), Tp = () => !0, Ep = (e) => gp.test(e) && !_p.test(e), Dp = () => !1, Op = (e) => vp.test(e), kp = (e) => yp.test(e), Ap = (e) => !X(e) && !Z(e), jp = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Mp = (e) => qp(e, Zp, Dp), X = (e) => fp.test(e), Np = (e) => qp(e, Qp, Ep), Pp = (e) => qp(e, $p, xp), Fp = (e) => qp(e, tm, Tp), Ip = (e) => qp(e, em, Dp), Lp = (e) => qp(e, Yp, Dp), Rp = (e) => qp(e, Xp, kp), zp = (e) => qp(e, nm, Op), Z = (e) => pp.test(e), Bp = (e) => Jp(e, Qp), Vp = (e) => Jp(e, em), Hp = (e) => Jp(e, Yp), Up = (e) => Jp(e, Zp), Wp = (e) => Jp(e, Xp), Gp = (e) => Jp(e, nm, !0), Kp = (e) => Jp(e, tm, !0), qp = (e, t, n) => {
	let r = fp.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Jp = (e, t, n = !1) => {
	let r = pp.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Yp = (e) => e === "position" || e === "percentage", Xp = (e) => e === "image" || e === "url", Zp = (e) => e === "length" || e === "size" || e === "bg-size", Qp = (e) => e === "length", $p = (e) => e === "number", em = (e) => e === "family-name", tm = (e) => e === "number" || e === "weight", nm = (e) => e === "shadow", rm = /*#__PURE__*/ lp(() => {
	let e = dp("color"), t = dp("font"), n = dp("text"), r = dp("font-weight"), i = dp("tracking"), a = dp("leading"), o = dp("breakpoint"), s = dp("container"), c = dp("spacing"), l = dp("radius"), u = dp("shadow"), d = dp("inset-shadow"), f = dp("text-shadow"), p = dp("drop-shadow"), m = dp("blur"), h = dp("perspective"), g = dp("aspect"), _ = dp("ease"), v = dp("animate"), y = () => [
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
		Z,
		X
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
		Z,
		X,
		c
	], T = () => [
		bp,
		"full",
		"auto",
		...w()
	], E = () => [
		Sp,
		"none",
		"subgrid",
		Z,
		X
	], D = () => [
		"auto",
		{ span: [
			"full",
			Sp,
			Z,
			X
		] },
		Sp,
		Z,
		X
	], O = () => [
		Sp,
		"auto",
		Z,
		X
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		Z,
		X
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
		bp,
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
		bp,
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
		bp,
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
		Z,
		X
	], L = () => [
		...b(),
		Hp,
		Lp,
		{ position: [Z, X] }
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
		Up,
		Mp,
		{ size: [Z, X] }
	], ee = () => [
		Cp,
		Bp,
		Np
	], B = () => [
		"",
		"none",
		"full",
		l,
		Z,
		X
	], te = () => [
		"",
		xp,
		Bp,
		Np
	], V = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], ne = () => [
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
	], re = () => [
		xp,
		Cp,
		Hp,
		Lp
	], ie = () => [
		"",
		"none",
		m,
		Z,
		X
	], ae = () => [
		"none",
		xp,
		Z,
		X
	], oe = () => [
		"none",
		xp,
		Z,
		X
	], se = () => [
		xp,
		Z,
		X
	], ce = () => [
		bp,
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
			blur: [wp],
			breakpoint: [wp],
			color: [Tp],
			container: [wp],
			"drop-shadow": [wp],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Ap],
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
			"inset-shadow": [wp],
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
			radius: [wp],
			shadow: [wp],
			spacing: ["px", xp],
			text: [wp],
			"text-shadow": [wp],
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
				bp,
				X,
				Z,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				Z,
				X
			] }],
			"container-named": [jp],
			columns: [{ columns: [
				xp,
				"auto",
				X,
				Z,
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
				Sp,
				"auto",
				Z,
				X
			] }],
			basis: [{ basis: [
				bp,
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
				xp,
				bp,
				"auto",
				"initial",
				"none",
				X
			] }],
			grow: [{ grow: [
				"",
				xp,
				Z,
				X
			] }],
			shrink: [{ shrink: [
				"",
				xp,
				Z,
				X
			] }],
			order: [{ order: [
				Sp,
				"first",
				"last",
				"none",
				Z,
				X
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
				Bp,
				Np
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Kp,
				Fp
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
				Cp,
				X
			] }],
			"font-family": [{ font: [
				Vp,
				Ip,
				t
			] }],
			"font-features": [{ "font-features": [X] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				Z,
				X
			] }],
			"line-clamp": [{ "line-clamp": [
				xp,
				"none",
				Z,
				Pp
			] }],
			leading: [{ leading: [
				"none",
				a,
				...w()
			] }],
			"list-image": [{ "list-image": [
				"none",
				Z,
				X
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				Z,
				X
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
			"text-decoration-style": [{ decoration: [...V(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				xp,
				"from-font",
				"auto",
				Z,
				Np
			] }],
			"text-decoration-color": [{ decoration: I() }],
			"underline-offset": [{ "underline-offset": [
				xp,
				"auto",
				Z,
				X
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
				Sp,
				Z,
				X
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
				Z,
				X
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
				Z,
				X
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
						Sp,
						Z,
						X
					],
					radial: [
						"",
						Z,
						X
					],
					conic: [
						"",
						Sp,
						Z,
						X
					]
				},
				Wp,
				Rp
			] }],
			"bg-color": [{ bg: I() }],
			"gradient-from-pos": [{ from: ee() }],
			"gradient-via-pos": [{ via: ee() }],
			"gradient-to-pos": [{ to: ee() }],
			"gradient-from": [{ from: I() }],
			"gradient-via": [{ via: I() }],
			"gradient-to": [{ to: I() }],
			rounded: [{ rounded: B() }],
			"rounded-s": [{ "rounded-s": B() }],
			"rounded-e": [{ "rounded-e": B() }],
			"rounded-t": [{ "rounded-t": B() }],
			"rounded-r": [{ "rounded-r": B() }],
			"rounded-b": [{ "rounded-b": B() }],
			"rounded-l": [{ "rounded-l": B() }],
			"rounded-ss": [{ "rounded-ss": B() }],
			"rounded-se": [{ "rounded-se": B() }],
			"rounded-ee": [{ "rounded-ee": B() }],
			"rounded-es": [{ "rounded-es": B() }],
			"rounded-tl": [{ "rounded-tl": B() }],
			"rounded-tr": [{ "rounded-tr": B() }],
			"rounded-br": [{ "rounded-br": B() }],
			"rounded-bl": [{ "rounded-bl": B() }],
			"border-w": [{ border: te() }],
			"border-w-x": [{ "border-x": te() }],
			"border-w-y": [{ "border-y": te() }],
			"border-w-s": [{ "border-s": te() }],
			"border-w-e": [{ "border-e": te() }],
			"border-w-bs": [{ "border-bs": te() }],
			"border-w-be": [{ "border-be": te() }],
			"border-w-t": [{ "border-t": te() }],
			"border-w-r": [{ "border-r": te() }],
			"border-w-b": [{ "border-b": te() }],
			"border-w-l": [{ "border-l": te() }],
			"divide-x": [{ "divide-x": te() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": te() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...V(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...V(),
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
				...V(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				xp,
				Z,
				X
			] }],
			"outline-w": [{ outline: [
				"",
				xp,
				Bp,
				Np
			] }],
			"outline-color": [{ outline: I() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				Gp,
				zp
			] }],
			"shadow-color": [{ shadow: I() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Gp,
				zp
			] }],
			"inset-shadow-color": [{ "inset-shadow": I() }],
			"ring-w": [{ ring: te() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: I() }],
			"ring-offset-w": [{ "ring-offset": [xp, Np] }],
			"ring-offset-color": [{ "ring-offset": I() }],
			"inset-ring-w": [{ "inset-ring": te() }],
			"inset-ring-color": [{ "inset-ring": I() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Gp,
				zp
			] }],
			"text-shadow-color": [{ "text-shadow": I() }],
			opacity: [{ opacity: [
				xp,
				Z,
				X
			] }],
			"mix-blend": [{ "mix-blend": [
				...ne(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": ne() }],
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
			"mask-image-linear-pos": [{ "mask-linear": [xp] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": re() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": re() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": I() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": I() }],
			"mask-image-t-from-pos": [{ "mask-t-from": re() }],
			"mask-image-t-to-pos": [{ "mask-t-to": re() }],
			"mask-image-t-from-color": [{ "mask-t-from": I() }],
			"mask-image-t-to-color": [{ "mask-t-to": I() }],
			"mask-image-r-from-pos": [{ "mask-r-from": re() }],
			"mask-image-r-to-pos": [{ "mask-r-to": re() }],
			"mask-image-r-from-color": [{ "mask-r-from": I() }],
			"mask-image-r-to-color": [{ "mask-r-to": I() }],
			"mask-image-b-from-pos": [{ "mask-b-from": re() }],
			"mask-image-b-to-pos": [{ "mask-b-to": re() }],
			"mask-image-b-from-color": [{ "mask-b-from": I() }],
			"mask-image-b-to-color": [{ "mask-b-to": I() }],
			"mask-image-l-from-pos": [{ "mask-l-from": re() }],
			"mask-image-l-to-pos": [{ "mask-l-to": re() }],
			"mask-image-l-from-color": [{ "mask-l-from": I() }],
			"mask-image-l-to-color": [{ "mask-l-to": I() }],
			"mask-image-x-from-pos": [{ "mask-x-from": re() }],
			"mask-image-x-to-pos": [{ "mask-x-to": re() }],
			"mask-image-x-from-color": [{ "mask-x-from": I() }],
			"mask-image-x-to-color": [{ "mask-x-to": I() }],
			"mask-image-y-from-pos": [{ "mask-y-from": re() }],
			"mask-image-y-to-pos": [{ "mask-y-to": re() }],
			"mask-image-y-from-color": [{ "mask-y-from": I() }],
			"mask-image-y-to-color": [{ "mask-y-to": I() }],
			"mask-image-radial": [{ "mask-radial": [Z, X] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": re() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": re() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": I() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": I() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [xp] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": re() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": re() }],
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
				Z,
				X
			] }],
			filter: [{ filter: [
				"",
				"none",
				Z,
				X
			] }],
			blur: [{ blur: ie() }],
			brightness: [{ brightness: [
				xp,
				Z,
				X
			] }],
			contrast: [{ contrast: [
				xp,
				Z,
				X
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				Gp,
				zp
			] }],
			"drop-shadow-color": [{ "drop-shadow": I() }],
			grayscale: [{ grayscale: [
				"",
				xp,
				Z,
				X
			] }],
			"hue-rotate": [{ "hue-rotate": [
				xp,
				Z,
				X
			] }],
			invert: [{ invert: [
				"",
				xp,
				Z,
				X
			] }],
			saturate: [{ saturate: [
				xp,
				Z,
				X
			] }],
			sepia: [{ sepia: [
				"",
				xp,
				Z,
				X
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				Z,
				X
			] }],
			"backdrop-blur": [{ "backdrop-blur": ie() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				xp,
				Z,
				X
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				xp,
				Z,
				X
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				xp,
				Z,
				X
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				xp,
				Z,
				X
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				xp,
				Z,
				X
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				xp,
				Z,
				X
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				xp,
				Z,
				X
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				xp,
				Z,
				X
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
				Z,
				X
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				xp,
				"initial",
				Z,
				X
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				Z,
				X
			] }],
			delay: [{ delay: [
				xp,
				Z,
				X
			] }],
			animate: [{ animate: [
				"none",
				v,
				Z,
				X
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				Z,
				X
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: ae() }],
			"rotate-x": [{ "rotate-x": ae() }],
			"rotate-y": [{ "rotate-y": ae() }],
			"rotate-z": [{ "rotate-z": ae() }],
			scale: [{ scale: oe() }],
			"scale-x": [{ "scale-x": oe() }],
			"scale-y": [{ "scale-y": oe() }],
			"scale-z": [{ "scale-z": oe() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: se() }],
			"skew-x": [{ "skew-x": se() }],
			"skew-y": [{ "skew-y": se() }],
			transform: [{ transform: [
				Z,
				X,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: ce() }],
			"translate-x": [{ "translate-x": ce() }],
			"translate-y": [{ "translate-y": ce() }],
			"translate-z": [{ "translate-z": ce() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Sp,
				Z,
				X
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
				Z,
				X
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
				Z,
				X
			] }],
			fill: [{ fill: ["none", ...I()] }],
			"stroke-w": [{ stroke: [
				xp,
				Bp,
				Np,
				Pp
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
function Q(...e) {
	return rm(jf(e));
}
// src/components/ui/portal-context.tsx
var im = (0, _.createContext)(null);
function am({ container: e, children: t }) {
	return /* @__PURE__ */ (0, G.jsx)(im.Provider, {
		value: e,
		children: t
	});
}
function om() {
	return (0, _.useContext)(im);
}
// src/components/ui/dropdown-menu.tsx
function sm({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(of, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function cm({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(hf, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function lm({ align: e = "start", alignOffset: t = 0, side: n = "bottom", sideOffset: r = 4, className: i, ...a }) {
	let o = om();
	return /* @__PURE__ */ (0, G.jsx)($u, {
		container: o ?? void 0,
		children: /* @__PURE__ */ (0, G.jsx)(Ud, {
			className: "isolate z-50 outline-none",
			align: e,
			alignOffset: t,
			side: n,
			sideOffset: r,
			children: /* @__PURE__ */ (0, G.jsx)(Xu, {
				"data-slot": "dropdown-menu-content",
				className: Q("z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-32 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", i),
				...a
			})
		})
	});
}
function um({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(la, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function dm({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, G.jsx)(ua, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: Q("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", e),
		...n
	});
}
function fm({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, G.jsx)(fa, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: Q("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", e),
		...r
	});
}
function pm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(yf, {
		"data-slot": "dropdown-menu-separator",
		className: Q("-mx-1 my-1 h-px bg-border", e),
		...t
	});
}
// node_modules/@base-ui/react/use-render/useRender.mjs
function mm(e) {
	return Ln(e.defaultTagName ?? "div", e, e);
}
// node_modules/class-variance-authority/dist/index.mjs
var hm = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, gm = jf, _m = (e, t) => (n) => {
	if (t?.variants == null) return gm(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = hm(t) || hm(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return gm(e, a, t?.compoundVariants?.reduce((e, t) => {
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
}, vm = _m("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
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
function ym({ className: e, variant: t = "default", render: n, ...r }) {
	return mm({
		defaultTagName: "span",
		props: wn({ className: Q(vm({ variant: t }), e) }, r),
		render: n,
		state: {
			slot: "badge",
			variant: t
		}
	});
}
// node_modules/@base-ui/react/button/Button.mjs
var bm = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i = !1, focusableWhenDisabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { getButtonProps: l, buttonRef: u } = _i({
		disabled: i,
		focusableWhenDisabled: a,
		native: o
	});
	return Ln("button", e, {
		state: { disabled: i },
		ref: [t, u],
		props: [c, l]
	});
}), xm = _m("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
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
function $({ className: e, variant: t = "default", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, G.jsx)(bm, {
		"data-slot": "button",
		className: Q(xm({
			variant: t,
			size: n,
			className: e
		})),
		...r
	});
}
// src/components/ui/card.tsx
function Sm({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, G.jsx)("div", {
		"data-slot": "card",
		"data-size": t,
		className: Q("group/card flex flex-col gap-[var(--card-spacing)] overflow-hidden rounded-xl bg-card py-[var(--card-spacing)] text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:1rem] has-[data-slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:0.75rem] data-[size=sm]:has-[data-slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", e),
		...n
	});
}
function Cm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("div", {
		"data-slot": "card-header",
		className: Q("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-[var(--card-spacing)] has-[data-slot=card-action]:grid-cols-[1fr_auto] has-[data-slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-[var(--card-spacing)]", e),
		...t
	});
}
function wm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("h2", {
		"data-slot": "card-title",
		className: Q("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", e),
		...t
	});
}
function Tm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("div", {
		"data-slot": "card-description",
		className: Q("text-sm text-muted-foreground", e),
		...t
	});
}
function Em({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("div", {
		"data-slot": "card-content",
		className: Q("px-[var(--card-spacing)]", e),
		...t
	});
}
function Dm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("div", {
		"data-slot": "card-footer",
		className: Q("flex items-center rounded-b-xl border-t bg-muted/50 p-[var(--card-spacing)]", e),
		...t
	});
}
// node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs
var Om = /*#__PURE__*/ _.createContext(void 0);
function km(e) {
	let t = _.useContext(Om);
	if (!e && t === void 0) throw Error($t(27));
	return t;
}
// node_modules/@base-ui/react/dialog/backdrop/DialogBackdrop.mjs
var Am = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, forceRender: a = !1, ...o } = e, s = km(), c = s.useState("open"), l = s.useState("nested"), u = s.useState("mounted");
	return Ln("div", e, {
		state: {
			open: c,
			transitionStatus: s.useState("transitionStatus")
		},
		ref: [s.context.backdropRef, t],
		stateAttributesMapping: cr,
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
}), jm = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, ...s } = e, c = km(), l = c.useState("open"), { getButtonProps: u, buttonRef: d } = _i({
		disabled: a,
		native: o
	}), f = { disabled: a };
	function p(e) {
		l && c.setOpen(!1, J(_r, e.nativeEvent));
	}
	return Ln("button", e, {
		state: f,
		ref: [t, d],
		props: [
			{ onClick: p },
			s,
			u
		]
	});
}), Mm = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = km(), c = Ki(a);
	return s.useSyncedValueWithCleanup("descriptionElementId", c), Ln("p", e, {
		ref: t,
		props: [{ id: c }, o]
	});
}), Nm = /*#__PURE__*/ _.createContext(void 0);
function Pm() {
	let e = _.useContext(Nm);
	if (e === void 0) throw Error($t(26));
	return e;
}
// node_modules/@base-ui/react/dialog/popup/DialogPopupCssVars.mjs
var Fm = "--nested-dialogs", Im = "data-nested-dialog-open", Lm = {
	...sr,
	...Jn,
	nestedDialogOpen(e) {
		return e ? { [Im]: "" } : null;
	}
}, Rm = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, initialFocus: o, ...s } = e, c = km(), l = c.useState("descriptionElementId"), u = c.useState("disablePointerDismissal"), d = c.useState("floatingRootContext"), f = c.useState("popupProps"), p = c.useState("modal"), m = c.useState("mounted"), h = c.useState("nested"), g = c.useState("nestedOpenDialogCount"), _ = c.useState("open"), v = c.useState("openMethod"), y = c.useState("titleElementId"), b = c.useState("transitionStatus"), x = c.useState("role"), S = d.useState("floatingId");
	Pm(), aa({
		open: _,
		ref: c.context.popupRef,
		onComplete() {
			_ && c.context.onOpenChangeComplete?.(!0);
		}
	});
	let C = o === void 0 ? cc(c.context.popupRef) : o, w = g > 0, T = c.useStateSetter("popupElement"), E = Ln("div", e, {
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
				...sc,
				hidden: !m,
				onKeyDown(e) {
					Pu.has(e.key) && e.stopPropagation();
				},
				style: { [Fm]: g }
			},
			s
		],
		ref: [
			t,
			c.context.popupRef,
			T
		],
		stateAttributesMapping: Lm
	});
	return /*#__PURE__*/ (0, G.jsx)(Zs, {
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
}), zm = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, i = km(), a = i.useState("mounted"), o = i.useState("modal"), s = i.useState("open");
	return a || n ? /*#__PURE__*/ (0, G.jsx)(Nm.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, G.jsxs)(Ns, {
			ref: t,
			...r,
			children: [a && o === !0 && /*#__PURE__*/ (0, G.jsx)(Dd, {
				ref: i.context.internalBackdropRef,
				inert: ed(!s)
			}), e.children]
		})
	}) : null;
});
// node_modules/@base-ui/react/dialog/root/useDialogRoot.mjs
function Bm({ store: e, parentContext: t, isDrawer: n }) {
	let r = e.useState("open"), i = e.useState("mounted"), a = e.useState("disablePointerDismissal"), o = e.useState("modal"), s = e.useState("popupElement"), c = e.useState("floatingRootContext"), [l, u] = _.useState(0), [d, f] = _.useState(0), p = l === 0, m = ic(c, {
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
			let n = wa(t);
			if (p && !a) {
				if (o) {
					let t = e.context.internalBackdropRef.current, r = e.context.backdropRef.current;
					return t || r ? t === n || r === n || Y(n, s) && !n?.hasAttribute("data-base-ui-portal") : !0;
				}
				return !0;
			}
			return !1;
		},
		escapeKey: p
	});
	return Bd(r && o === !0, s), e.useContextCallback("onNestedDialogOpen", (t, n) => {
		(e.select("open") || e.select("mounted")) && (u(t), f(n));
	}), q(() => {
		!r && !i && (u(0), f(0));
	}, [r, i]), q(() => (t?.onNestedDialogOpen && r && t.onNestedDialogOpen(l + 1, d + +!!n), () => {
		t?.onNestedDialogOpen && r && t.onNestedDialogOpen(0, 0);
	}), [
		n,
		r,
		l,
		d,
		t
	]), yc(e, {
		activeTriggerProps: m.reference,
		inactiveTriggerProps: m.trigger,
		popupProps: m.floating,
		nestedOpenDialogCount: l,
		nestedOpenDrawerCount: d
	}), null;
}
// node_modules/@base-ui/react/dialog/store/DialogStore.mjs
var Vm = {
	...Xc,
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
}, Hm = class extends Vc {
	constructor(e, t, n) {
		let r = new xc(), i = Um(e, r, t, n);
		super(i, Wm(r), Vm);
	}
	setOpen = (e, t) => {
		t.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", !0);
		}, !e && t.trigger == null && this.state.activeTriggerId != null && (t.trigger = this.state.activeTriggerElement ?? void 0), this.context.onOpenChange?.(e, t), t.isCanceled || (this.state.floatingRootContext.dispatchOpenChange(e, t), this.update(pc(this.state, e, t.trigger)));
	};
};
function Um(e, t, n, r = !1) {
	return {
		...Wc(t, n, r),
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
function Wm(e) {
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
function Gm(e, t) {
	let { children: n, open: r, defaultOpen: i = !1, onOpenChange: a, onOpenChangeComplete: o, disablePointerDismissal: s = !1, modal: c = !0, actionsRef: l, handle: u, triggerId: d, defaultTriggerId: f = null } = t, p = e === "drawer", m = e === "alert-dialog", h = m ? !0 : c, g = m || s, v = m ? "alertdialog" : "dialog", y = km(!0), b = {
		modal: h,
		disablePointerDismissal: g,
		nested: y != null,
		role: v
	}, x = lc((e, t) => new Hm({
		open: i,
		openProp: r,
		activeTriggerId: f,
		triggerIdProp: d,
		...b
	}, e, t), !0);
	x.useControlledProp("openProp", r), x.useControlledProp("triggerIdProp", d), x.useSyncedValues(b), x.useContextCallback("onOpenChange", a), x.useContextCallback("onOpenChangeComplete", o);
	let S = x.useState("open"), C = x.useState("mounted"), w = x.useState("payload");
	bc(x, S), _c(x);
	let { forceUnmount: T } = vc(S, x);
	_.useImperativeHandle(l, () => ({
		unmount: T,
		close: () => x.setOpen(!1, J(Or))
	}), [T, x]);
	let E = S || C || u != null;
	return /*#__PURE__*/ (0, G.jsxs)(Om.Provider, {
		value: x,
		children: [
			u && /*#__PURE__*/ (0, G.jsx)(uc, {
				handle: u,
				store: x
			}),
			E && /*#__PURE__*/ (0, G.jsx)(Bm, {
				store: x,
				parentContext: y?.context,
				isDrawer: p
			}),
			typeof n == "function" ? n({ payload: w }) : n
		]
	});
}
// node_modules/@base-ui/react/dialog/root/DialogRoot.mjs
var Km = Ac(function(e) {
	return Gm("dialog", e);
}), qm = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = km(), c = Ki(a);
	return s.useSyncedValueWithCleanup("titleElementId", c), Ln("h2", e, {
		ref: t,
		props: [{ id: c }, o]
	});
}), Jm = jc(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, payload: c, handle: l, ...u } = e, d = km(!0), f = Zc(l) ?? d;
	if (!f) throw Error($t(79));
	let p = Ki(s), m = f.useState("floatingRootContext"), h = f.useState("isOpenedByTrigger", p), g = f.useState("triggerPopupId", p), v = _.useRef(null), { registerTrigger: y, isMountedByThisTrigger: b } = gc(p, v, f, { payload: c }), { getButtonProps: x, buttonRef: S } = _i({
		disabled: a,
		native: o
	}), C = Qs(m), w = Jd(() => f.select("open"), (e) => {
		f.set("openMethod", e);
	}), T = {
		disabled: a,
		open: h
	}, E = f.useState("triggerProps", b);
	return Ln("button", e, {
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
				[Ts]: "",
				id: p,
				"aria-haspopup": "dialog",
				"aria-expanded": h,
				"aria-controls": g
			},
			u,
			x
		],
		stateAttributesMapping: ar
	});
});
// src/components/ui/dialog.tsx
function Ym({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(Km, {
		"data-slot": "dialog",
		...e
	});
}
function Xm({ container: e, ...t }) {
	let n = om();
	return /* @__PURE__ */ (0, G.jsx)(zm, {
		"data-slot": "dialog-portal",
		container: e ?? n ?? void 0,
		...t
	});
}
function Zm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(Am, {
		"data-slot": "dialog-overlay",
		className: Q("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", e),
		...t
	});
}
function Qm({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ (0, G.jsxs)(Xm, { children: [/* @__PURE__ */ (0, G.jsx)(Zm, {}), /* @__PURE__ */ (0, G.jsxs)(Rm, {
		"data-slot": "dialog-content",
		className: Q("fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...r,
		children: [t, n && /* @__PURE__ */ (0, G.jsxs)(jm, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ (0, G.jsx)($, {
				variant: "ghost",
				className: "absolute top-2 right-2",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, G.jsx)(qt, {}), /* @__PURE__ */ (0, G.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function $m({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("div", {
		"data-slot": "dialog-header",
		className: Q("flex flex-col gap-2", e),
		...t
	});
}
function eh({ className: e, showCloseButton: t = !1, children: n, ...r }) {
	return /* @__PURE__ */ (0, G.jsxs)("div", {
		"data-slot": "dialog-footer",
		className: Q("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", e),
		...r,
		children: [n, t && /* @__PURE__ */ (0, G.jsx)(jm, {
			render: /* @__PURE__ */ (0, G.jsx)($, { variant: "outline" }),
			children: "Close"
		})]
	});
}
function th({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(qm, {
		"data-slot": "dialog-title",
		className: Q("font-heading text-base leading-none font-medium", e),
		...t
	});
}
function nh({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(Mm, {
		"data-slot": "dialog-description",
		className: Q("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", e),
		...t
	});
}
// node_modules/@base-ui/react/field/control/FieldControlDataAttributes.mjs
var rh = "data-valid", ih = "data-invalid", ah = {
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
}, oh = {
	disabled: !1,
	valid: null,
	touched: !1,
	dirty: !1,
	filled: !1,
	focused: !1
}, sh = { valid(e) {
	return e === null ? null : e ? { [rh]: "" } : { [ih]: "" };
} }, ch = {
	invalid: void 0,
	name: void 0,
	validityData: {
		state: ah,
		errors: [],
		error: "",
		value: "",
		initialValue: null
	},
	setValidityData: _n,
	disabled: void 0,
	setTouched: _n,
	setDirty: _n,
	setFilled: _n,
	setFocused: _n,
	focusOwnerRef: { current: void 0 },
	validationMode: "onSubmit",
	shouldValidateOnChange: () => !1,
	state: oh,
	registerFieldControl: _n,
	validation: {
		getValidationProps: (e, t = yn) => t,
		inputRef: { current: null },
		registeredInputs: /* @__PURE__ */ new Map(),
		registerInput: _n,
		getInputControl: () => null,
		commit: async () => {},
		change: _n
	}
}, lh = /*#__PURE__*/ _.createContext(ch);
function uh(e = !0) {
	let t = _.useContext(lh);
	if (t.setValidityData === _n && !e) throw Error($t(28));
	return t;
}
// node_modules/@base-ui/react/internals/form-context/FormContext.mjs
var dh = /*#__PURE__*/ _.createContext({
	elementRef: { current: null },
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: _n,
	validationMode: "onSubmit",
	submitCountRef: { current: 0 }
});
function fh() {
	return _.useContext(dh);
}
// node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
var ph = /*#__PURE__*/ _.createContext({
	controlId: void 0,
	registerControlId: _n,
	resetControlId: _n,
	labelId: void 0,
	setLabelId: _n,
	messageIds: [],
	setMessageIds: _n,
	getDescriptionProps: (e) => e
});
function mh() {
	return _.useContext(ph);
}
// node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function hh(e = {}) {
	let { id: t, enabled: n = !0 } = e, { controlId: r, registerControlId: i, resetControlId: a } = mh(), o = Ki(), s = on(() => Symbol()), c = _.useRef(!1), l = _.useRef(!1), u = K(() => {
		c.current && i !== _n && (c.current = !1, i(s.current, void 0));
	});
	return q(() => {
		if (!n || i === _n) {
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
	]), q(() => u, [u]), (n ? r : void 0) ?? t ?? o;
}
// node_modules/@base-ui/react/internals/field-root-context/useSetFieldFocused.mjs
function gh(e, t, n) {
	let { setFocused: r, focusOwnerRef: i } = uh(), a = K((t) => {
		(t ? !e : i.current === a) && (i.current = t && a, n?.(t), r(t));
	});
	return q(() => {
		let e = t.current;
		return e?.getRootNode()?.activeElement === e && a(!0), () => a(!1);
	}, [
		e,
		t,
		a
	]), a;
}
// node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function _h(e, t, n, r, i = !0, a) {
	let { registerFieldControl: o } = uh(), s = on(() => Symbol());
	q(() => {
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
	]), q(() => {
		let e = s.current;
		return () => {
			o(e, void 0);
		};
	}, [o, s]);
}
// node_modules/@base-ui/react/field/control/FieldControl.mjs
var vh = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, name: a, value: o, disabled: s = !1, onValueChange: c, defaultValue: l, autoFocus: u = !1, style: d, ...f } = e, { state: p, name: m, disabled: h, setTouched: g, setDirty: v, validityData: y, setFilled: b, validationMode: x, validation: S } = uh(), { clearErrors: C, elementRef: w, submitCountRef: T } = fh(), E = h || s, D = m ?? a, O = {
		...p,
		disabled: E
	}, { labelId: k } = mh(), A = hh({ id: i }), j = o !== void 0, M = o == null ? void 0 : String(o), N = K(() => S.inputRef.current?.value);
	_h(S.inputRef, A, M, N, !E, a), q(() => {
		let e = M ?? S.inputRef.current?.value;
		e !== void 0 && b(e !== "");
	}, [
		M,
		l,
		S.inputRef,
		b
	]), qd(M, () => {
		M !== void 0 && (C(D), v(M !== (y.initialValue ?? "")), S.change(M));
	});
	let P = _.useRef(null), F = gh(E, P), I = ha();
	return Ln("input", e, {
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
					let t = e.currentTarget.value, n = J(dr, e.nativeEvent);
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
		stateAttributesMapping: sh
	});
}), yh = /*#__PURE__*/ _.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, G.jsx)(vh, {
		ref: t,
		...e
	});
});
// src/components/ui/input.tsx
function bh({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ (0, G.jsx)(yh, {
		type: t,
		"data-slot": "input",
		className: Q("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", e),
		...n
	});
}
// node_modules/@base-ui/utils/useOnFirstRender.mjs
function xh(e) {
	let t = _.useRef(!0);
	t.current && (t.current = !1, e());
}
// node_modules/@base-ui/react/select/root/SelectRootContext.mjs
var Sh = /*#__PURE__*/ _.createContext(void 0), Ch = /*#__PURE__*/ _.createContext(void 0);
function wh() {
	let e = _.useContext(Sh);
	if (e === void 0) throw Error($t(60));
	return e;
}
function Th() {
	let e = _.useContext(Ch);
	if (e === void 0) throw Error($t(61));
	return e;
}
// node_modules/@base-ui/utils/areArraysEqual.mjs
function Eh(e, t, n = Object.is) {
	let { length: r } = e;
	if (r !== t.length) return !1;
	for (let i = 0; i < r; i += 1) if (!n(e[i], t[i])) return !1;
	return !0;
}
// node_modules/@base-ui/react/internals/itemEquality.mjs
var Dh = (e, t) => Object.is(e, t);
function Oh(e, t, n) {
	return e == null || t == null ? Object.is(e, t) : n(e, t);
}
function kh(e, t, n) {
	return Array.isArray(e) && Array.isArray(t) ? !Eh(e, t, (e, t) => Oh(e, t, n)) : e !== t;
}
function Ah(e, t, n) {
	return e ? e.some((e) => e !== void 0 && Oh(t, e, n)) : !1;
}
function jh(e, t, n) {
	return e ? e.findIndex((e) => e !== void 0 && Oh(e, t, n)) : -1;
}
function Mh(e, t) {
	if (t !== Dh) return (n) => Ah(e, n, t);
	let n = new Set(e);
	return n.delete(void 0), (t) => n.has(t) && (t !== 0 || e.some((e) => Object.is(t, e)));
}
function Nh(e, t, n, r) {
	let i = r && Array.isArray(t) ? e.findIndex(Mh(t, n)) : jh(e, t, n);
	return i === -1 ? null : i;
}
function Ph(e, t, n, r, i, a) {
	return Ah(r, t, i) ? a != null && e > a && Ah(r, n[a], i) ? a : e : e === a ? Nh(n, r, i, !0) : a;
}
function Fh(e, t, n) {
	return e.filter((e) => !Oh(t, e, n));
}
// node_modules/@base-ui/react/select/store.mjs
var Ih = {
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
		return t == null ? !1 : n && Array.isArray(t) ? t.length > 0 : Df(t, r) !== "";
	},
	hasNullItemLabel: (e, t) => t ? Tf(e.items) : !1,
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
		return e.multiple ? Array.isArray(r) && r.some((e) => Oh(t, e, n)) : Oh(t, r, n);
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
function Lh(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
	return Math.max(t, Math.min(e, n));
}
function Rh(e, t) {
	return Math.max(0, e - t);
}
function zh(e, t) {
	if (t <= 0) return 0;
	let n = Lh(e, 0, t), r = n, i = t - n, a = r <= 1, o = i <= 1;
	return a && o ? r <= i ? 0 : t : a ? 0 : o ? t : n;
}
// node_modules/@base-ui/react/select/root/SelectRoot.mjs
function Bh(e) {
	let { id: t, value: n, defaultValue: r = null, onValueChange: i, open: a, defaultOpen: o = !1, onOpenChange: s, name: c, form: l, autoComplete: u, disabled: d = !1, readOnly: f = !1, required: p = !1, modal: m = !0, actionsRef: h, inputRef: g, onOpenChangeComplete: v, items: y, multiple: b = !1, itemToStringLabel: x, itemToStringValue: S, isItemEqualToValue: C = Dh, highlightItemOnHover: w = !0, children: T } = e, { clearErrors: E } = fh(), { setDirty: D, setTouched: O, setFocused: k, validityData: A, setFilled: j, name: M, disabled: N, validation: P, validationMode: F } = uh(), I = hh({ id: t }), L = N || d, R = M ?? c, [z, ee] = Ar({
		controlled: n,
		default: b ? r ?? vn : r,
		name: "Select",
		state: "value"
	}), [B, te] = Ar({
		controlled: a,
		default: o,
		name: "Select",
		state: "open"
	}), V = _.useRef([]), ne = _.useRef([]), re = _.useRef(null), ie = _.useRef(null), ae = _.useRef(0), oe = _.useRef(null), se = _.useRef([]), ce = _.useRef(!1), H = _.useRef(null), le = _.useRef(null), ue = _.useRef({
		allowSelectedMouseUp: !1,
		allowUnselectedMouseUp: !1,
		dragY: 0
	}), de = _.useRef(!1), fe = _.useRef(z), { openMethod: pe, triggerProps: me } = Yd(B), U = on(() => new Vc({
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
		open: B,
		mounted: B,
		transitionStatus: void 0,
		items: y,
		forceMount: !1,
		openMethod: null,
		activeIndex: null,
		selectedIndex: null,
		popupProps: yn,
		triggerProps: yn,
		itemRoot: {
			props: yn,
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
		setValue: _n,
		setOpen: _n,
		handleScrollArrowVisibility: _n,
		onOpenChangeComplete: _n,
		listRef: V,
		popupRef: re,
		scrollHandlerRef: ie,
		scrollArrowsMountedCountRef: ae,
		valueRef: oe,
		valuesRef: se,
		labelsRef: ne,
		typingRef: ce,
		selectionRef: ue,
		firstItemTextRef: H,
		selectedItemTextRef: le,
		alignItemWithTriggerActiveRef: de,
		initialValueRef: fe
	}, Ih)).current, [he, ge] = _.useState(!1), { mounted: _e, transitionStatus: ve, forceUnmount: ye } = oc({
		open: B,
		ref: re,
		preventUnmountOnClose: he,
		setPreventUnmountOnClose: ge,
		onUnmount() {
			U.update({
				activeIndex: null,
				openMethod: null,
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			}), v?.(!1);
		}
	}), W = U.useState("activeIndex"), be = U.useState("selectedIndex"), xe = U.useState("triggerElement"), Se = U.useState("positionerElement"), Ce = vf(pe), we = pe ?? Ce, Te = _.useMemo(() => b ? "" : Df(z, S), [
		b,
		z,
		S
	]), Ee = _.useMemo(() => b && Array.isArray(z) ? z.map((e) => Df(e, S)) : Df(z, S), [
		b,
		z,
		S
	]);
	_h(Za(xe), I, z, K(() => Ee), !L, c);
	let De = b ? Array.isArray(z) && z.length > 0 : z != null && Te !== "";
	q(() => {
		j(De);
	}, [De, j]), q(function() {
		let e = Nh(se.current, z, C, b);
		e === null && (le.current = null), B || U.set("selectedIndex", e);
	}, [
		b,
		B,
		z,
		C,
		U
	]), qd(z, () => {
		E(R), D(kh(z, A.initialValue, C)), P.change(z);
	});
	let Oe = K((e, t) => {
		let n = t, r = mc(n);
		s?.(e, n), t.isCanceled || (e || ge(r()), te(e), e || t.reason !== "focus-out" && t.reason !== "outside-press" || (O(!0), k(!1), F === "onBlur" && P.commit(z)));
	});
	_.useImperativeHandle(h, () => ({
		unmount: ye,
		close: () => {
			U.state.open && Oe(!1, J(Or));
		}
	}), [
		ye,
		Oe,
		U
	]);
	let ke = K((e, t) => {
		i?.(e, t), t.isCanceled || ee(e);
	}), Ae = K((e) => {
		let t = Rh(e.scrollHeight, e.clientHeight), n = zh(e.scrollTop, t), r = n > 0, i = n < t;
		U.set("scrollUpArrowVisible", r), U.set("scrollDownArrowVisible", i);
	}), je = Qc({
		open: B,
		onOpenChange: Oe,
		elements: {
			reference: xe,
			floating: Se
		}
	}), Me = Qs(je, {
		enabled: !L,
		event: "mousedown"
	}), Ne = ic(je), Pe = hl(je, {
		enabled: !L,
		listRef: V,
		activeIndex: W,
		selectedIndex: be,
		disabledIndices: vn,
		onNavigate(e) {
			(e !== null || B) && U.set("activeIndex", e);
		},
		focusItemOnHover: w
	}), Fe = gl(je, {
		enabled: !L && (B || !f && !b),
		listRef: ne,
		activeIndex: W,
		selectedIndex: be,
		disabledIndices: (e) => bf(V.current[e]),
		onMatch(e) {
			B ? U.set("activeIndex", e) : ke(se.current[e], J(dr));
		},
		onTyping(e) {
			ce.current = e;
		}
	}), Ie = _.useMemo(() => wn(Fe.reference, Pe.reference, Ne.reference, Me.reference, me), [
		Me.reference,
		Fe.reference,
		Pe.reference,
		Ne.reference,
		me
	]), Le = _.useMemo(() => wn(sc, Fe.floating, Pe.floating, Ne.floating), [
		Fe.floating,
		Pe.floating,
		Ne.floating
	]), Re = Pe.item ?? yn, ze = _.useMemo(() => ({
		props: Re,
		multiple: b,
		disabled: L,
		readOnly: f,
		isItemEqualToValue: C
	}), [
		Re,
		b,
		L,
		f,
		C
	]);
	U.useContextCallback("setValue", ke), U.useContextCallback("setOpen", Oe), U.useContextCallback("handleScrollArrowVisibility", Ae), U.useContextCallback("onOpenChangeComplete", v), xh(() => {
		U.update({
			popupProps: Le,
			triggerProps: Ie,
			itemRoot: ze
		});
	}), U.useSyncedValues({
		id: I,
		modal: m,
		multiple: b,
		disabled: L,
		readOnly: f,
		required: p,
		highlightItemOnHover: w,
		value: z,
		open: B,
		mounted: _e,
		transitionStatus: ve,
		popupProps: Le,
		triggerProps: Ie,
		itemRoot: ze,
		items: y,
		itemToStringLabel: x,
		itemToStringValue: S,
		isItemEqualToValue: C,
		openMethod: we
	});
	let Be = sn(g, P.inputRef), Ve = b ? void 0 : R, He = _.useMemo(() => !b || !Array.isArray(z) || !R ? null : z.map((e) => {
		let t = Df(e, S);
		return /*#__PURE__*/ (0, G.jsx)("input", {
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
	return /*#__PURE__*/ (0, G.jsxs)(Sh.Provider, {
		value: U,
		children: [
			/*#__PURE__*/ (0, G.jsx)(Ch.Provider, {
				value: je,
				children: T
			}),
			/*#__PURE__*/ (0, G.jsx)("input", {
				...P.getValidationProps(L, {
					onFocus() {
						U.state.triggerElement?.focus({ focusVisible: !0 });
					},
					onChange(e) {
						if (e.nativeEvent.defaultPrevented || L || f) return;
						let t = e.currentTarget.value, n = J(dr, e.nativeEvent);
						function r() {
							if (b) return;
							let e = t.toLowerCase(), r = se.current.findIndex((t) => Df(t, S).toLowerCase() === e || Ef(t, x).toLowerCase() === e);
							r === -1 && (r = se.current.findIndex((t, n) => {
								let r = ne.current[n];
								return r != null && r.toLowerCase() === e;
							}));
							let i = se.current[r];
							i != null && ke(i, n);
						}
						U.set("forceMount", !0), queueMicrotask(r);
					}
				}),
				id: I && Ve == null ? `${I}-hidden-input` : void 0,
				form: l,
				name: Ve,
				autoComplete: u,
				value: Te,
				disabled: L,
				required: p && !(b && De),
				readOnly: f,
				ref: Be,
				style: R ? to : eo,
				tabIndex: -1,
				"aria-hidden": !0,
				suppressHydrationWarning: !0
			}),
			He
		]
	});
}
// node_modules/@base-ui/react/utils/resolveAriaLabelledBy.mjs
function Vh(e, t) {
	return e ?? t;
}
var Hh = "data-popup-side", Uh = 400, Wh = {
	...or,
	...sh,
	popupSide: (e) => e ? { [Hh]: e } : null,
	value: () => null
}, Gh = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, disabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { setTouched: l, validationMode: u, validation: d, state: f, disabled: p } = uh(), { labelId: m } = mh(), h = wh(), g = h.useState("readOnly"), v = h.useState("required"), y = h.useState("disabled"), b = p || y || a, x = h.useState("open"), S = h.useState("mounted"), C = h.useState("value"), w = h.useState("triggerProps"), T = h.useState("positionerElement"), E = h.useState("listElement"), D = h.useState("popupSide"), O = h.useState("id"), k = h.useState("labelId"), A = h.useState("hasSelectedValue"), j = S && T ? D : null, M = i ?? O, N = Vh(m, k);
	hh({ id: i });
	let P = Za(T), F = _.useRef(null), I = gh(b, F), { getButtonProps: L, buttonRef: R } = _i({
		disabled: b,
		native: o
	}), z = h.useStateSetter("triggerElement"), ee = ha(), B = ha(), te = ha();
	_.useEffect(() => {
		if (x) return te.start(Uh, () => {
			h.context.selectionRef.current.allowUnselectedMouseUp = !0, h.context.selectionRef.current.allowSelectedMouseUp = !0;
		}), () => {
			te.clear();
		};
		h.context.selectionRef.current = {
			allowSelectedMouseUp: !1,
			allowUnselectedMouseUp: !1,
			dragY: 0
		}, B.clear();
	}, [
		x,
		h,
		B,
		te
	]);
	let V = wn(w, {
		id: M,
		role: "combobox",
		"aria-expanded": x,
		"aria-haspopup": "listbox",
		"aria-controls": x ? E?.id ?? za(T)?.id : void 0,
		"aria-labelledby": N,
		"aria-readonly": g || void 0,
		"aria-required": v || void 0,
		tabIndex: b ? -1 : 0,
		onFocus(e) {
			I(!0), x && h.context.alignItemWithTriggerActiveRef.current && h.context.setOpen(!1, J(dr, e.nativeEvent)), ee.start(0, () => {
				h.set("forceMount", !0);
			});
		},
		onBlur(e) {
			Y(T, e.relatedTarget) || (l(!0), I(!1), u === "onBlur" && d.commit(C));
		},
		onMouseDown(e) {
			if (x) return;
			let t = hi(e.currentTarget);
			function n(e) {
				if (!F.current) return;
				let t = e.target;
				Y(F.current, t) || Y(P.current, t) || cf(e, F.current) || h.context.setOpen(!1, J(Cr, e));
			}
			B.start(0, () => {
				t.addEventListener("mouseup", n, { once: !0 });
			});
		}
	}, c, L), ne = d.getValidationProps(b, V);
	ne.role = "combobox";
	let re = {
		...f,
		open: x,
		disabled: b,
		value: C,
		readOnly: g,
		popupSide: j,
		placeholder: !A
	};
	return Ln("button", e, {
		ref: [
			t,
			F,
			R,
			z
		],
		state: re,
		stateAttributesMapping: Wh,
		props: ne
	});
}), Kh = { value: () => null }, qh = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { className: n, render: r, children: i, placeholder: a, style: o, ...s } = e, c = wh(), l = c.useState("value"), u = c.useState("items"), d = c.useState("itemToStringLabel"), f = c.useState("hasSelectedValue"), p = !f && a != null && i == null, m = c.useState("hasNullItemLabel", p), h = {
		value: l,
		placeholder: !f
	}, g = null;
	return g = typeof i == "function" ? i(l) : i ?? (p && !m ? a : Array.isArray(l) ? kf(l, u, d) : Of(l, u, d)), Ln("span", e, {
		state: h,
		ref: [t, c.context.valueRef],
		props: [{ children: g }, s],
		stateAttributesMapping: Kh
	});
}), Jh = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e;
	return Ln("span", e, {
		state: { open: wh().useState("open") },
		ref: t,
		props: [{
			"aria-hidden": !0,
			children: "▼"
		}, a],
		stateAttributesMapping: ar
	});
}), Yh = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let n = wh(), r = n.useState("mounted"), i = n.useState("forceMount");
	return r || i ? /*#__PURE__*/ (0, G.jsx)(Ns, {
		ref: t,
		...e
	}) : null;
}), Xh = /*#__PURE__*/ _.createContext(void 0);
function Zh() {
	let e = _.useContext(Xh);
	if (!e) throw Error($t(59));
	return e;
}
// node_modules/@base-ui/react/select/popup/utils.mjs
function Qh(e, t) {
	e && Object.assign(e.style, t);
}
var $h = {
	position: "relative",
	maxHeight: "100%",
	overflowX: "hidden",
	overflowY: "auto"
}, eg = { position: "fixed" }, tg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { anchor: n, className: r, render: i, positionMethod: a, side: o, align: s, sideOffset: c, alignOffset: l, collisionBoundary: u = "clipping-ancestors", collisionPadding: d, arrowPadding: f, sticky: p, disableAnchorTracking: m, alignItemWithTrigger: h = !0, collisionAvoidance: g = Es, style: v, ...y } = e, b = wh(), x = Th(), S = b.useState("open"), C = b.useState("mounted"), w = b.useState("modal"), T = b.useState("value"), E = b.useState("openMethod"), D = b.useState("positionerElement"), O = b.useState("triggerElement"), k = b.useState("isItemEqualToValue"), A = b.useState("transitionStatus"), j = _.useRef(null), M = _.useRef(null), [N, P] = _.useState(h), F = C && N && E !== "touch";
	!C && N !== h && P(h), _.useImperativeHandle(b.context.alignItemWithTriggerActiveRef, () => F), Hd((F || w) && S, E === "touch", D, O);
	let I = _d({
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
	}), L = F ? "none" : I.side, R = F ? eg : I.positionerStyles, z = {
		open: S,
		side: L,
		align: I.align,
		anchorHidden: I.anchorHidden
	};
	q(() => {
		b.set("popupSide", I.side);
	}, [b, I.side]);
	let ee = kd(e, z, {
		styles: R,
		transitionStatus: A,
		props: y,
		refs: [t, b.useStateSetter("positionerElement")],
		hidden: !C,
		inert: !S
	}), B = _.useRef(0), te = K((e) => {
		if (b.context.valuesRef.current.length === 0) return;
		let t = B.current;
		B.current = e.size;
		let n = J(dr);
		if (t !== 0 && !b.state.multiple && T !== null && jh(b.context.valuesRef.current, T, k) === -1) {
			let e = b.context.initialValueRef.current, t = e != null && jh(b.context.valuesRef.current, e, k) !== -1 ? e : null;
			b.context.setValue(t, n), t === null && (b.set("selectedIndex", null), b.context.selectedItemTextRef.current = null);
		}
		if (t !== 0 && b.state.multiple && Array.isArray(T)) {
			let e = T.filter((e) => jh(b.context.valuesRef.current, e, k) !== -1);
			e.length !== T.length && (b.context.setValue(e, n), e.length === 0 && (b.set("selectedIndex", null), b.context.selectedItemTextRef.current = null));
		}
		if (S && F) {
			b.update({
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			});
			let e = { height: "" };
			Qh(D, e), Qh(b.context.popupRef.current, e);
		}
	}), V = _.useMemo(() => ({
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
	return /*#__PURE__*/ (0, G.jsx)(bd, {
		elementsRef: b.context.listRef,
		labelsRef: b.context.labelsRef,
		onMapChange: te,
		children: /*#__PURE__*/ (0, G.jsxs)(Xh.Provider, {
			value: V,
			children: [C && w && /*#__PURE__*/ (0, G.jsx)(Dd, {
				inert: ed(!S),
				cutout: O
			}), ee]
		})
	});
}), ng = "base-ui-disable-scrollbar", rg = {
	className: ng,
	getElement(e) {
		return /*#__PURE__*/ (0, G.jsx)("style", {
			nonce: e,
			href: ng,
			precedence: "base-ui:low",
			children: `.${ng}{scrollbar-width:none}.${ng}::-webkit-scrollbar{display:none}`
		});
	}
}, ig = /*#__PURE__*/ _.createContext(void 0), ag = { disableStyleElements: !1 };
function og() {
	return _.useContext(ig) ?? ag;
}
// node_modules/@base-ui/react/select/positioner/SelectPositionerCssVars.mjs
var sg = "--transform-origin", cg = {
	...sr,
	...Jn
}, lg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, ...o } = e, s = wh(), c = s.useState("multiple"), l = s.useState("readOnly"), u = s.useState("highlightItemOnHover"), d = Th(), { side: f, align: p, alignItemWithTriggerActive: m, isPositioned: h, setControlledAlignItemWithTrigger: g } = Zh(), v = ku(!0) != null, y = rd(), { nonce: b, disableStyleElements: x } = og(), S = s.useState("id"), C = s.useState("open"), w = s.useState("openMethod"), T = s.useState("mounted"), E = s.useState("popupProps"), D = s.useState("transitionStatus"), O = s.useState("triggerElement"), k = s.useState("positionerElement"), A = s.useState("listElement"), j = _.useRef(!1), M = _.useRef(!1), N = _.useRef({}), P = Qi(), F = K((e) => {
		if (!k || !s.context.popupRef.current || !M.current) return;
		let t = k.style.top === "0px", n = k.style.bottom === "0px";
		if (j.current || !m || !t && !n) {
			s.context.handleScrollArrowVisibility(e);
			return;
		}
		let r = fg(k), i = pg(k.getBoundingClientRect().height, "y", r), a = hi(k), o = Rr(k), c = o.getComputedStyle(k), l = parseFloat(c.marginTop), u = parseFloat(c.marginBottom), d = ug(o.getComputedStyle(s.context.popupRef.current)), f = Math.min(a.documentElement.clientHeight - l - u, d), p = e.scrollTop, h = dg(e), g = null, _ = (e) => {
			k.style.height = `${e}px`;
		}, v = t ? h - p : p, y = Math.min(i + v, f);
		if (v <= 1) {
			let n = Lh(v, 0, f - i);
			n > 0 && _(i + n), e.scrollTop = t ? h : 0, f - (i + n) <= 1 && (j.current = !0), s.context.handleScrollArrowVisibility(e);
			return;
		}
		f - y > 1 ? g = t ? Infinity : 0 : n && p < h && (g = p - (v - (i + v - f)));
		let b = Math.ceil(y);
		if (b !== 0 && _(b), g != null) {
			let t = Lh(g, 0, dg(e));
			Math.abs(e.scrollTop - t) > 1 && (e.scrollTop = t);
		}
		b >= f - 1 && (j.current = !0), s.context.handleScrollArrowVisibility(e);
	});
	_.useImperativeHandle(s.context.scrollHandlerRef, () => F, [F]), aa({
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
	q(() => {
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
	}, [s, k]), q(() => {
		C || m || (M.current = !1, j.current = !1, Qh(k, N.current));
	}, [
		C,
		m,
		k
	]), q(() => {
		let e = s.context.popupRef.current;
		if (!C || !O || !k || !e || m && !h || s.state.transitionStatus === "ending") return;
		if (M.current = !0, e.style.removeProperty(sg), !m) {
			P.request(() => s.context.handleScrollArrowVisibility(A || e));
			return;
		}
		let t = gg(e);
		try {
			let t = s.context.selectedItemTextRef.current;
			t?.isConnected || (t = !s.select("hasSelectedValue") && s.context.firstItemTextRef.current?.isConnected ? s.context.firstItemTextRef.current : null);
			let n = s.context.valueRef.current, r = Rr(k), i = r.getComputedStyle(k), a = r.getComputedStyle(e), o = hi(O), c = fg(O), l = mg(O.getBoundingClientRect(), c), d = mg(k.getBoundingClientRect(), c), f = l.height, p = A || e, m = p.scrollHeight, h = parseFloat(a.borderBottomWidth), _ = parseFloat(i.marginTop) || 10, v = parseFloat(i.marginBottom) || 10, b = parseFloat(i.minHeight) || 100, x = ug(a), S = o.documentElement.clientHeight - _ - v, C = o.documentElement.clientWidth, w = S - l.bottom + f, T, E = y === "rtl" ? l.right - d.width : l.left, D = 0;
			if (t && n) {
				let e = mg(n.getBoundingClientRect(), c);
				T = mg(t.getBoundingClientRect(), c), E = d.left + (y === "rtl" ? e.right - T.right : e.left - T.left);
				let r = e.top - l.top + e.height / 2;
				D = T.top - d.top + T.height / 2 - r;
			}
			let M = w + D + v + h, P = Math.min(S, M), F = S - _ - v, I = M - P, L = C - 5;
			k.style.left = `${Lh(E, 5, L - d.width)}px`, k.style.height = `${P}px`, k.style.maxHeight = "none", k.style.marginTop = `${_}px`, k.style.marginBottom = `${v}px`, e.style.height = "100%";
			let R = dg(p), z = I >= R - 1;
			z && (P = Math.min(S, d.height) - (I - R));
			let ee = l.top < 20 || l.bottom > S - 20 || Math.ceil(P) + 1 < Math.min(m, b), B = (r.visualViewport?.scale ?? 1) !== 1 && ji;
			if (ee || B) {
				Qh(k, N.current), g(!1);
				return;
			}
			let te = Math.max(b, P);
			if (z) {
				let e = Math.max(0, S - M);
				k.style.top = d.height >= F ? "0" : `${e}px`, k.style.height = `${P}px`, p.scrollTop = dg(p);
			} else k.style.bottom = "0", p.scrollTop = I;
			if (T) {
				let t = d.top, n = d.height, r = T.top + T.height / 2, i = Lh(n > 0 ? (r - t) / n * 100 : 50, 0, 100);
				e.style.setProperty(sg, `50% ${i}%`);
			}
			(te === S || P >= x) && (j.current = !0), s.context.handleScrollArrowVisibility(p), u && s.state.selectedIndex === null && s.state.activeIndex === null && s.context.listRef.current[0] != null && s.set("activeIndex", 0);
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
		let e = Rr(k);
		function t(e) {
			s.context.setOpen(!1, J(kr, e));
		}
		return Ya(e, "resize", t);
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
			v && Pu.has(e.key) && e.stopPropagation();
		},
		onScroll(e) {
			A || F(e.currentTarget);
		},
		...m && { style: A ? { height: "100%" } : $h },
		className: !A && m ? rg.className : void 0
	}, R = Ln("div", e, {
		ref: [t, s.context.popupRef],
		state: I,
		stateAttributesMapping: cg,
		props: [
			E,
			L,
			Vu(D),
			o
		]
	});
	return /*#__PURE__*/ (0, G.jsxs)(_.Fragment, { children: [!x && rg.getElement(b), /*#__PURE__*/ (0, G.jsx)(Zs, {
		context: d,
		modal: !1,
		disabled: !T,
		openInteractionType: w,
		returnFocus: a,
		restoreFocus: !0,
		children: R
	})] });
});
function ug(e) {
	let t = e.maxHeight;
	return t.endsWith("px") && parseFloat(t) || Infinity;
}
function dg(e) {
	return Rh(e.scrollHeight, e.clientHeight);
}
function fg(e) {
	return su.getScale(e);
}
function pg(e, t, n) {
	return e / n[t];
}
function mg(e, t) {
	return Ao({
		x: pg(e.x, "x", t),
		y: pg(e.y, "y", t),
		width: pg(e.width, "x", t),
		height: pg(e.height, "y", t)
	});
}
var hg = [
	["transform", "none"],
	["scale", "1"],
	["translate", "0 0"]
];
function gg(e) {
	let { style: t } = e, n = {};
	for (let [e, r] of hg) n[e] = t.getPropertyValue(e), t.setProperty(e, r, "important");
	return () => {
		for (let [e] of hg) {
			let r = n[e];
			r ? t.setProperty(e, r) : t.removeProperty(e);
		}
	};
}
// node_modules/@base-ui/react/select/list/SelectList.mjs
var _g = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = wh(), s = o.useState("multiple"), c = o.useState("readOnly"), { alignItemWithTriggerActive: l } = Zh(), u = o.useState("hasScrollArrows"), d = o.useState("openMethod"), f = {
		id: `${o.useState("id")}-list`,
		role: "listbox",
		"aria-multiselectable": s || void 0,
		"aria-readonly": c || void 0,
		onScroll(e) {
			o.context.scrollHandlerRef.current?.(e.currentTarget);
		},
		...l && { style: $h },
		className: u && d !== "touch" ? rg.className : void 0
	};
	return Ln("div", e, {
		ref: [t, o.useStateSetter("listElement")],
		props: [f, a]
	});
}), vg = /*#__PURE__*/ _.createContext(void 0);
function yg() {
	let e = _.useContext(vg);
	if (!e) throw Error($t(57));
	return e;
}
// node_modules/@base-ui/react/select/item/SelectItem.mjs
var bg = /*#__PURE__*/ _.memo(/*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, value: a = null, label: o, disabled: s = !1, nativeButton: c = !1, ...l } = e, u = _.useRef(null), d = Bi({
		guess: !0,
		label: o,
		textRef: u
	}), f = wh(), { props: p, multiple: m, disabled: h, readOnly: g, isItemEqualToValue: v } = f.useState("itemRoot"), y = h || s, b = f.useState("isActive", d.index), x = f.useState("open"), S = f.useState("isSelected", a), C = f.useState("isSelectedByFocus", d.index), w = d.index, T = _.useRef(null);
	q(() => {
		let e = f.context.valuesRef.current;
		return e[w] = a, () => {
			delete e[w];
		};
	}, [
		w,
		a,
		f
	]), q(() => {
		let e = f.state.value, t = f.state.selectedIndex, n = t, r;
		m && Array.isArray(e) ? (n = Ph(w, a, f.context.valuesRef.current, e, v, t), r = n === w, w === t && !r && (f.context.selectedItemTextRef.current = null)) : (r = e !== void 0 && Oh(a, e, v), r && (n = w)), f.set("selectedIndex", n), r && u.current && (f.context.selectedItemTextRef.current = u.current);
	}, [
		w,
		m,
		v,
		f,
		a
	]);
	let E = _.useRef("mouse"), D = _.useRef(!1), { getButtonProps: O, buttonRef: k } = _i({
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
			let n = Array.isArray(t) ? t : [], r = S ? Fh(n, a, v) : [...n, a];
			f.context.setValue(r, J(gr, e));
		} else f.context.setValue(a, J(gr, e)), f.context.setOpen(!1, J(gr, e));
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
			let t = E.current !== "touch", n = e.nativeEvent.pointerType, r = t && va(e.nativeEvent) && (n !== void 0 || b), i = t && !r && !D.current;
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
	}, P = Ln("div", e, {
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
	return /*#__PURE__*/ (0, G.jsx)(vg.Provider, {
		value: F,
		children: P
	});
})), xg = /*#__PURE__*/ _.memo(/*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, keepMounted: a, selected: o, ...s } = e, c = _.useRef(null), { transitionStatus: l, setMounted: u } = $i(o), d = Ln("span", e, {
		ref: [t, c],
		state: {
			selected: o,
			transitionStatus: l
		},
		props: [{
			"aria-hidden": !0,
			children: "✔️"
		}, s],
		stateAttributesMapping: Jn
	});
	return aa({
		batch: !0,
		enabled: !o,
		open: o,
		ref: c,
		onComplete() {
			o || u(!1);
		}
	}), d;
})), Sg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { selected: n } = yg();
	return e.keepMounted || n ? /*#__PURE__*/ (0, G.jsx)(xg, {
		...e,
		selected: n,
		ref: t
	}) : null;
}), Cg = /*#__PURE__*/ _.memo(/*#__PURE__*/ _.forwardRef(function(e, t) {
	let { index: n, textRef: r, selectedByFocus: i } = yg(), a = wh(), { render: o, className: s, style: c, ...l } = e;
	return Ln("div", e, {
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
})), wg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, direction: a, keepMounted: o, ...s } = e, c = a === "up", l = wh(), { side: u, scrollDownArrowRef: d, scrollUpArrowRef: f } = Zh(), p = c ? "scrollUpArrowVisible" : "scrollDownArrowVisible", m = l.useState(p), h = l.useState("openMethod"), g = m && h !== "touch", _ = ha(), v = c ? f : d, { mounted: y, transitionStatus: b, setMounted: x } = $i(g);
	q(() => (l.context.scrollArrowsMountedCountRef.current += 1, l.set("hasScrollArrows", !0), () => {
		l.context.scrollArrowsMountedCountRef.current = Math.max(0, l.context.scrollArrowsMountedCountRef.current - 1), l.context.scrollArrowsMountedCountRef.current === 0 && l.set("hasScrollArrows", !1);
	}), [l]), aa({
		open: g,
		ref: v,
		onComplete() {
			g || x(!1);
		}
	});
	let S = Ln("div", e, {
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
					let n = Rh(e.scrollHeight, e.clientHeight), r = zh(e.scrollTop, n), i = r === (c ? 0 : n), a = l.context.listRef.current;
					if (r !== e.scrollTop && (e.scrollTop = r), i) _.clear();
					else {
						if (a.length > 0) {
							let t = v.current?.offsetHeight || 0;
							e.scrollTop = Tg(a, c, r, e.clientHeight, t, n);
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
		stateAttributesMapping: Jn
	});
	return y || o ? S : null;
});
function Tg(e, t, n, r, i, a) {
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
		return o < t && s ? zh(s.offsetTop - i, a) : 0;
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
	return c > o && l ? zh(l.offsetTop + l.offsetHeight - r + i, a) : a;
}
// node_modules/@base-ui/react/select/scroll-down-arrow/SelectScrollDownArrow.mjs
var Eg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, G.jsx)(wg, {
		...e,
		ref: t,
		direction: "down"
	});
}), Dg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, G.jsx)(wg, {
		...e,
		ref: t,
		direction: "up"
	});
}), Og = Bh;
function kg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(qh, {
		"data-slot": "select-value",
		className: Q("flex flex-1 text-left", e),
		...t
	});
}
function Ag({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, G.jsxs)(Gh, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: Q("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...r,
		children: [n, /* @__PURE__ */ (0, G.jsx)(Jh, { render: /* @__PURE__ */ (0, G.jsx)(Te, { className: "pointer-events-none size-4 text-muted-foreground" }) })]
	});
}
function jg({ className: e, children: t, side: n = "bottom", sideOffset: r = 4, align: i = "center", alignOffset: a = 0, alignItemWithTrigger: o = !0, ...s }) {
	let c = om();
	return /* @__PURE__ */ (0, G.jsx)(Yh, {
		container: c ?? void 0,
		children: /* @__PURE__ */ (0, G.jsx)(tg, {
			side: n,
			sideOffset: r,
			align: i,
			alignOffset: a,
			alignItemWithTrigger: o,
			className: "isolate z-50",
			children: /* @__PURE__ */ (0, G.jsxs)(lg, {
				"data-slot": "select-content",
				"data-align-trigger": o,
				className: Q("relative isolate z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-36 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...s,
				children: [
					/* @__PURE__ */ (0, G.jsx)(Ng, {}),
					/* @__PURE__ */ (0, G.jsx)(_g, { children: t }),
					/* @__PURE__ */ (0, G.jsx)(Pg, {})
				]
			})
		})
	});
}
function Mg({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, G.jsxs)(bg, {
		"data-slot": "select-item",
		className: Q("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, G.jsx)(Cg, {
			className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
			children: t
		}), /* @__PURE__ */ (0, G.jsx)(Sg, {
			render: /* @__PURE__ */ (0, G.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ (0, G.jsx)(Ce, { className: "pointer-events-none" })
		})]
	});
}
function Ng({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(Dg, {
		"data-slot": "select-scroll-up-button",
		className: Q("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, G.jsx)(De, {})
	});
}
function Pg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(Eg, {
		"data-slot": "select-scroll-down-button",
		className: Q("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, G.jsx)(Te, {})
	});
}
// src/components/ui/sheet.tsx
function Fg({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(Km, {
		"data-slot": "sheet",
		...e
	});
}
function Ig({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(Jm, {
		"data-slot": "sheet-trigger",
		...e
	});
}
function Lg({ container: e, ...t }) {
	let n = om();
	return /* @__PURE__ */ (0, G.jsx)(zm, {
		"data-slot": "sheet-portal",
		container: e ?? n ?? void 0,
		...t
	});
}
function Rg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(Am, {
		"data-slot": "sheet-overlay",
		className: Q("fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs", e),
		...t
	});
}
function zg({ className: e, children: t, side: n = "right", showCloseButton: r = !0, ...i }) {
	return /* @__PURE__ */ (0, G.jsxs)(Lg, { children: [/* @__PURE__ */ (0, G.jsx)(Rg, {}), /* @__PURE__ */ (0, G.jsxs)(Rm, {
		"data-slot": "sheet-content",
		"data-side": n,
		className: Q("d3-sheet-content fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm", e),
		...i,
		children: [t, r && /* @__PURE__ */ (0, G.jsxs)(jm, {
			"data-slot": "sheet-close",
			render: /* @__PURE__ */ (0, G.jsx)($, {
				variant: "ghost",
				className: "absolute top-3 right-3",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, G.jsx)(qt, {}), /* @__PURE__ */ (0, G.jsx)("span", {
				className: "sr-only",
				children: "Fechar navegação"
			})]
		})]
	})] });
}
function Bg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("div", {
		"data-slot": "sheet-header",
		className: Q("flex flex-col gap-0.5 p-4", e),
		...t
	});
}
function Vg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(qm, {
		"data-slot": "sheet-title",
		className: Q("font-heading text-base font-medium text-foreground", e),
		...t
	});
}
function Hg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(Mm, {
		"data-slot": "sheet-description",
		className: Q("text-sm text-muted-foreground", e),
		...t
	});
}
// node_modules/@base-ui/react/tabs/root/TabsRootContext.mjs
var Ug = /*#__PURE__*/ _.createContext(void 0);
function Wg() {
	let e = _.useContext(Ug);
	if (e === void 0) throw Error($t(64));
	return e;
}
// node_modules/@base-ui/react/tabs/root/TabsRootDataAttributes.mjs
var Gg = "data-activation-direction", Kg = { tabActivationDirection: (e) => ({ [Gg]: e }) }, qg = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { className: n, defaultValue: r = 0, onValueChange: i, orientation: a = "horizontal", render: o, value: s, style: c, ...l } = e, u = e.defaultValue !== void 0, d = _.useRef([]), [f, p] = _.useState(() => /* @__PURE__ */ new Map()), [m, h] = Ar({
		controlled: s,
		default: r,
		name: "Tabs",
		state: "value"
	}), g = s !== void 0, [v, y] = _.useState(() => /* @__PURE__ */ new Map()), b = _.useRef(void 0), x = _.useCallback((e) => Jg(v, e), [v]), [S, C] = _.useState(() => ({
		previousValue: m,
		tabActivationDirection: "none"
	})), { previousValue: w, tabActivationDirection: T } = S, E = T, D = !1;
	w !== m && (E = Yg(w, m, a, v), D = w != null && m != null && x(m) == null);
	let O = D ? w : m, k = w !== O || T !== E;
	q(() => {
		k && C({
			previousValue: O,
			tabActivationDirection: E
		});
	}, [
		O,
		k,
		E
	]);
	let A = K((e, t) => {
		t.activationDirection = Yg(m, e, a, v), i?.(e, t), t.isCanceled || h(() => e);
	}), j = K((e, t) => {
		i?.(e, J(t, void 0, void 0, { activationDirection: "none" }));
	}), M = K((e, t) => (p((n) => {
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
	}, [v]), R = _.useRef(!u), z = _.useRef(r), ee = _.useRef(u), B = _.useRef(!1);
	q(() => {
		if (g) return;
		function e(e, t) {
			h(() => e), C({
				previousValue: e,
				tabActivationDirection: "none"
			}), j(e, t), R.current = !1;
		}
		if (v.size === 0) {
			B.current && m !== null && !b.current?.isConnected && e(null, Er);
			return;
		}
		B.current = !0, b.current = v.keys().next().value;
		let t = I?.disabled, n = I == null && m !== null;
		if (!t && m === z.current && (ee.current = !1), ee.current && t && m === z.current) return;
		let r = R.current;
		if (t || n) {
			let n = L ?? null;
			if (m === n) {
				R.current = !1;
				return;
			}
			let i = Er;
			r ? i = Dr : t && (i = Tr), e(n, i);
		} else r && I != null && (j(m, Dr), R.current = !1);
	}, [
		L,
		g,
		j,
		I,
		h,
		v,
		m
	]);
	let te = Ln("div", e, {
		state: {
			orientation: a,
			tabActivationDirection: E
		},
		ref: t,
		props: l,
		stateAttributesMapping: Kg
	});
	return /*#__PURE__*/ (0, G.jsx)(Ug.Provider, {
		value: F,
		children: /*#__PURE__*/ (0, G.jsx)(bd, {
			elementsRef: d,
			children: te
		})
	});
});
function Jg(e, t) {
	for (let [n, r] of e.entries()) if (t === r.value) return n;
	return null;
}
function Yg(e, t, n, r) {
	if (e == null || t == null) return "none";
	let [i, a, o] = n === "horizontal" ? [
		"left",
		"left",
		"right"
	] : [
		"top",
		"up",
		"down"
	], s = Jg(r, e), c = Jg(r, t);
	if (s == null || c == null) return s !== c && (typeof e == "number" || typeof e == "string") && typeof e == typeof t ? t > e ? o : a : "none";
	let l = s.getBoundingClientRect()[i], u = c.getBoundingClientRect()[i];
	return u < l ? a : u > l ? o : "none";
}
// node_modules/@base-ui/react/internals/composite/constants.mjs
var Xg = "data-composite-item-active", Zg = /*#__PURE__*/ _.createContext(void 0);
function Qg() {
	let e = _.useContext(Zg);
	if (e === void 0) throw Error($t(65));
	return e;
}
// node_modules/@base-ui/react/tabs/tab/TabsTab.mjs
var $g = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { className: n, disabled: r = !1, render: i, value: a, id: o, nativeButton: s = !0, style: c, ...l } = e, { value: u, getTabPanelIdByValue: d, onValueChange: f, orientation: p, tabActivationDirection: m } = Wg(), { activateOnFocus: h, registerTabResizeObserverElement: g, tabsListElement: v } = Qg(), { highlightedIndex: y, onHighlightedIndexChange: b } = pi(), x = Ki(o), { compositeProps: S, compositeRef: C, index: w } = uf({ metadata: _.useMemo(() => ({
		disabled: r,
		id: x,
		value: a
	}), [
		r,
		x,
		a
	]) }), T = a === u, E = _.useRef(!1), D = _.useRef(null), O = K((e) => {
		D.current?.(), D.current = e ? g(e) : null;
	});
	q(() => {
		if (E.current) {
			E.current = !1;
			return;
		}
		if (!(T && w > -1 && y !== w)) return;
		let e = v;
		if (e != null) {
			let t = Sa(hi(e));
			if (t && Y(e, t)) return;
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
	let { getButtonProps: k, buttonRef: A } = _i({
		disabled: r,
		native: s,
		focusableWhenDisabled: !0
	}), j = d(a), M = _.useRef(!1), N = _.useRef(!1);
	function P(e) {
		f(a, J(dr, e.nativeEvent, void 0, { activationDirection: "none" }));
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
		let t = hi(e.currentTarget);
		function n() {
			M.current = !1, N.current = !1, t.removeEventListener("pointerup", n), t.removeEventListener("pointercancel", n);
		}
		t.addEventListener("pointerup", n), t.addEventListener("pointercancel", n);
	}
	return Ln("button", e, {
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
				[Xg]: T ? "" : void 0,
				onKeyDownCapture() {
					E.current = !0;
				}
			},
			l,
			k
		],
		stateAttributesMapping: Kg
	});
}), e_ = "data-index", t_ = {
	...Kg,
	...Jn
}, n_ = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { className: n, value: r, render: i, keepMounted: a = !1, style: o, ...s } = e, { value: c, getTabIdByPanelValue: l, orientation: u, tabActivationDirection: d, registerMountedTabPanel: f } = Wg(), p = Ki(), { ref: m, index: h } = Bi(), g = r === c, { mounted: v, transitionStatus: y, setMounted: b } = $i(g), x = !v, S = l(r), C = {
		hidden: x,
		orientation: u,
		tabActivationDirection: d,
		transitionStatus: y
	}, w = _.useRef(null), T = Ln("div", e, {
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
			inert: ed(!g),
			[e_]: h
		}, s],
		stateAttributesMapping: t_
	});
	return aa({
		open: g,
		ref: w,
		onComplete() {
			g || b(!1);
		}
	}), q(() => {
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
function r_(e) {
	let { loopFocus: t = !0, orientation: n = "both", grid: r, onLoop: i, direction: a, highlightedIndex: o, onHighlightedIndexChange: s, rootRef: c, enableHomeAndEndKeys: l = !1, stopEventPropagation: u, disabledIndices: d, modifierKeys: f = vn } = e, [p, m] = _.useState(0), h = r != null, g = _.useRef(null), v = sn(g, c), y = _.useRef([]), b = _.useRef(!1), x = _.useRef(null), S = o ?? p, C = K((e, t = !1) => {
		if (x.current = y.current[e] ?? null, (s ?? m)(e), t) {
			let t = y.current[e];
			Ru(g.current, t, a, n);
		}
	}), w = K((e) => {
		if (e.size === 0) return;
		if (b.current) {
			let e = y.current, t = e.indexOf(x.current);
			if (t === -1) {
				let t = e[S];
				!t || Io(e, S, d) ? C(i_(e, d)) : x.current = t;
			} else t !== S && C(t);
			return;
		}
		b.current = !0;
		let t = Array.from(e.keys()), r = t.find((e) => e?.hasAttribute("data-composite-item-active")) ?? null, i = r ? e.get(r)?.index ?? -1 : -1;
		if (i !== -1) C(i);
		else if (Io(t, S, d)) {
			let e = Fo(t, { disabledIndices: d });
			jo(t, e) || C(e);
		}
		Ru(g.current, r, a, n);
	});
	q(() => {
		if (d == null || o != null || !b.current) return;
		let e = y.current;
		if (Io(e, S, d)) {
			let t = Fo(e, { disabledIndices: d });
			jo(e, t) || C(t);
		}
	}, [
		d,
		o,
		S,
		y,
		C
	]);
	let T = K((e, t, n) => i ? i(e, t, n, y) : n), E = K((e) => {
		let o = e.key === "Home" || e.key === "End";
		if (!Pu.has(e.key) || !l && o || a_(e, f) || !g.current) return;
		let s = a === "rtl", c = s ? Mu : Nu, p = s ? Nu : Mu, m = n === "vertical" ? ju : c, _ = n === "vertical" ? Au : p, v = wa(e.nativeEvent);
		if (v != null && Lu(v) && !bf(v)) {
			let t = v.selectionStart, n = v.selectionEnd, r = v.value;
			if (t == null || e.shiftKey || t !== n || e.key !== _ && t < r.length || e.key !== m && t > 0) return;
		}
		let b = S, x = Mo(y, d), w = No(y, d);
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
		l && (e.key === "Home" ? b = x : e.key === "End" && (b = w)), b === S && (E || D) && (t && b === w && E ? (b = x, i && (b = i(e, S, b, y))) : t && b === x && D ? (b = w, i && (b = i(e, S, b, y))) : b = Fo(y.current, {
			startingIndex: b,
			decrement: D,
			disabledIndices: d
		})), b !== S && !jo(y.current, b) && (u && e.stopPropagation(), (h || o || E || D) && e.preventDefault(), C(b, !0), queueMicrotask(() => {
			y.current[b]?.focus();
		}));
	});
	return {
		props: {
			ref: v,
			onFocus(e) {
				let t = g.current, n = wa(e.nativeEvent);
				t && n != null && Lu(n) && n.setSelectionRange(0, n.value.length);
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
function i_(e, t) {
	let n = -1;
	for (let r = 0; r < e.length; r += 1) {
		let i = e[r];
		if (i && !Io(e, r, t)) {
			if (i.hasAttribute("data-composite-item-active")) return r;
			n === -1 && (n = r);
		}
	}
	return Math.max(n, 0);
}
function a_(e, t) {
	for (let n of Fu) if (!t.includes(n) && e.getModifierState(n)) return !0;
	return !1;
}
// node_modules/@base-ui/react/internals/composite/root/CompositeRoot.mjs
function o_(e) {
	let { render: t, className: n, style: r, refs: i = vn, props: a = vn, state: o = yn, stateAttributesMapping: s, highlightedIndex: c, onHighlightedIndexChange: l, orientation: u, grid: d, loopFocus: f, onLoop: p, enableHomeAndEndKeys: m, onMapChange: h, stopEventPropagation: g = !0, rootRef: v, disabledIndices: y, modifierKeys: b, highlightItemOnHover: x = !1, tag: S = "div", ...C } = e, { props: w, highlightedIndex: T, onHighlightedIndexChange: E, elementsRef: D, onMapChange: O, relayKeyboardEvent: k } = r_({
		grid: d,
		loopFocus: f,
		onLoop: p,
		orientation: u,
		highlightedIndex: c,
		onHighlightedIndexChange: l,
		rootRef: v,
		stopEventPropagation: g,
		enableHomeAndEndKeys: m,
		direction: rd(),
		disabledIndices: y,
		modifierKeys: b
	}), A = Ln(S, e, {
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
	return /*#__PURE__*/ (0, G.jsx)(fi.Provider, {
		value: j,
		children: /*#__PURE__*/ (0, G.jsx)(bd, {
			elementsRef: D,
			onMapChange: (e) => {
				h?.(e), O(e);
			},
			children: A
		})
	});
}
// node_modules/@base-ui/react/tabs/list/TabsList.mjs
var s_ = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { activateOnFocus: n = !1, className: r, loopFocus: i = !0, render: a, style: o, ...s } = e, { orientation: c, setTabMap: l, tabActivationDirection: u } = Wg(), [d, f] = _.useState(0), [p, m] = _.useState(null), h = _.useRef(/* @__PURE__ */ new Set()), g = _.useRef(/* @__PURE__ */ new Set()), v = _.useRef(null);
	q(() => {
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
	let y = K((e) => (h.current.add(e), () => {
		h.current.delete(e);
	})), b = K((e) => (g.current.add(e), v.current?.observe(e), () => {
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
	return /*#__PURE__*/ (0, G.jsx)(Zg.Provider, {
		value: C,
		children: /*#__PURE__*/ (0, G.jsx)(o_, {
			render: a,
			className: r,
			style: o,
			state: x,
			refs: [t, m],
			props: [S, s],
			stateAttributesMapping: Kg,
			highlightedIndex: d,
			enableHomeAndEndKeys: !0,
			loopFocus: i,
			orientation: c,
			onHighlightedIndexChange: f,
			onMapChange: l,
			disabledIndices: vn
		})
	});
});
// src/components/ui/tabs.tsx
function c_({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, G.jsx)(qg, {
		"data-slot": "tabs",
		"data-orientation": t,
		className: Q("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", e),
		...n
	});
}
var l_ = _m("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-muted",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function u_({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ (0, G.jsx)(s_, {
		"data-slot": "tabs-list",
		"data-variant": t,
		className: Q(l_({ variant: t }), e),
		...n
	});
}
function d_({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)($g, {
		"data-slot": "tabs-trigger",
		className: Q("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-[active]:shadow-sm group-data-[variant=line]/tabs-list:data-[active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent", "data-[active]:bg-background data-[active]:text-foreground dark:data-[active]:border-input dark:data-[active]:bg-input/30 dark:data-[active]:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[active]:after:opacity-100", e),
		...t
	});
}
function f_({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(n_, {
		"data-slot": "tabs-content",
		className: Q("d3-tabs-panel flex-1 text-sm outline-none", e),
		...t
	});
}
// src/components/client/surfaces.tsx
function p_({ initialMessage: e = "", onSubmit: t, onGuest: n }) {
	let [r, i] = (0, _.useState)("login"), [a, o] = (0, _.useState)(""), [s, c] = (0, _.useState)(""), [l, u] = (0, _.useState)(""), [d, f] = (0, _.useState)(e), [p, m] = (0, _.useState)(!1);
	return (0, _.useEffect)(() => f(e), [e]), /* @__PURE__ */ (0, G.jsx)("main", {
		className: "fixed inset-0 z-[2147483647] grid min-h-svh place-items-center overflow-y-auto bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, G.jsxs)(Sm, {
			className: "w-full max-w-[380px] animate-ui-enter border-border bg-card shadow-none",
			children: [
				/* @__PURE__ */ (0, G.jsxs)(Cm, {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, G.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, G.jsx)("img", {
							className: "size-10 object-contain",
							src: "https://organizeon.com.br/d3/assets/organizeon-icon.png",
							alt: ""
						}), /* @__PURE__ */ (0, G.jsxs)("div", { children: [/* @__PURE__ */ (0, G.jsx)("p", {
							className: "text-sm font-semibold",
							children: "OrganizeOn"
						}), /* @__PURE__ */ (0, G.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Cliente"
						})] })]
					}), /* @__PURE__ */ (0, G.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, G.jsx)(wm, {
							className: "text-xl",
							children: r === "register" ? "Criar conta" : r === "code" ? "Entrar com código" : "Entrar no OrganizeOn"
						}), /* @__PURE__ */ (0, G.jsx)(Tm, { children: "Autentique-se para acessar seus jogos e configurações." })]
					})]
				}),
				/* @__PURE__ */ (0, G.jsxs)(Em, { children: [/* @__PURE__ */ (0, G.jsxs)(c_, {
					value: r,
					onValueChange: (e) => {
						i(e), f("");
					},
					children: [/* @__PURE__ */ (0, G.jsxs)(u_, {
						className: "grid h-9 w-full grid-cols-3 bg-muted/70",
						children: [
							/* @__PURE__ */ (0, G.jsx)(d_, {
								value: "login",
								children: "Entrar"
							}),
							/* @__PURE__ */ (0, G.jsx)(d_, {
								value: "register",
								children: "Criar conta"
							}),
							/* @__PURE__ */ (0, G.jsx)(d_, {
								value: "code",
								children: "Código"
							})
						]
					}), /* @__PURE__ */ (0, G.jsx)(f_, {
						value: r,
						className: "mt-4",
						children: /* @__PURE__ */ (0, G.jsxs)("form", {
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
								r === "code" ? /* @__PURE__ */ (0, G.jsxs)("label", {
									className: "grid gap-1.5 text-sm font-medium",
									htmlFor: "organizeon-code",
									children: ["Código de login", /* @__PURE__ */ (0, G.jsx)(bh, {
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
								}) : /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [/* @__PURE__ */ (0, G.jsxs)("label", {
									className: "grid gap-1.5 text-sm font-medium",
									htmlFor: "organizeon-username",
									children: ["Usuário", /* @__PURE__ */ (0, G.jsx)(bh, {
										id: "organizeon-username",
										name: "username",
										autoComplete: "username",
										minLength: 3,
										maxLength: 32,
										required: !0,
										value: a,
										onChange: (e) => o(e.target.value)
									})]
								}), /* @__PURE__ */ (0, G.jsxs)("label", {
									className: "grid gap-1.5 text-sm font-medium",
									htmlFor: "organizeon-password",
									children: ["Senha", /* @__PURE__ */ (0, G.jsx)(bh, {
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
								r === "register" && /* @__PURE__ */ (0, G.jsx)("p", {
									className: "text-xs leading-relaxed text-muted-foreground",
									children: "Contas novas começam sem permissões administrativas."
								}),
								d && /* @__PURE__ */ (0, G.jsx)("p", {
									className: "rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
									role: "alert",
									children: d
								}),
								/* @__PURE__ */ (0, G.jsx)($, {
									type: "submit",
									className: "mt-1 h-10 w-full",
									disabled: p || (r === "code" ? !l : !a || !s),
									"aria-busy": p,
									children: p ? "Autenticando…" : r === "register" ? "Criar conta" : "Entrar"
								})
							]
						})
					})]
				}), /* @__PURE__ */ (0, G.jsxs)("div", {
					className: "mt-4 border-t pt-4",
					children: [/* @__PURE__ */ (0, G.jsx)($, {
						variant: "outline",
						className: "w-full",
						onClick: () => void n(),
						disabled: p,
						children: "Continuar como convidado"
					}), /* @__PURE__ */ (0, G.jsx)("p", {
						className: "mt-2 text-center text-xs text-muted-foreground",
						children: "Acesso convidado com recursos limitados"
					})]
				})] }),
				/* @__PURE__ */ (0, G.jsxs)(Dm, {
					className: "gap-2 border-t border-border pt-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, G.jsx)(kt, { className: "size-4 shrink-0" }), "Acesse com sua conta OrganizeOn."]
				})
			]
		})
	});
}
function m_(e) {
	return e < 1024 ? `${e} B` : e < 1024 ** 2 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1024 ** 2).toFixed(1)} MB`;
}
function h_(e) {
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
	return /* @__PURE__ */ (0, G.jsx)("main", {
		className: "fixed inset-0 z-[2147483646] overflow-y-auto bg-background px-4 pb-8 pt-[max(16px,env(safe-area-inset-top))] text-foreground sm:px-6",
		children: /* @__PURE__ */ (0, G.jsxs)("div", {
			className: "mx-auto w-full max-w-3xl",
			children: [
				/* @__PURE__ */ (0, G.jsxs)("header", {
					className: "mb-5 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, G.jsx)($, {
						variant: "outline",
						size: "icon",
						"aria-label": "Voltar",
						onClick: e.onClose,
						children: /* @__PURE__ */ (0, G.jsx)(xe, {})
					}), /* @__PURE__ */ (0, G.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, G.jsx)("h1", {
							className: "text-xl font-semibold tracking-tight",
							children: "Dados"
						}), /* @__PURE__ */ (0, G.jsxs)("p", {
							className: "truncate text-sm text-muted-foreground",
							children: ["Conta ", e.username]
						})]
					})]
				}),
				/* @__PURE__ */ (0, G.jsxs)(c_, {
					value: p,
					onValueChange: m,
					children: [
						/* @__PURE__ */ (0, G.jsxs)(u_, {
							className: "grid h-9 w-full grid-cols-3 sm:w-auto sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, G.jsx)(d_, {
									value: "backup",
									children: "Backup"
								}),
								/* @__PURE__ */ (0, G.jsx)(d_, {
									value: "progress",
									children: "Progressos"
								}),
								/* @__PURE__ */ (0, G.jsx)(d_, {
									value: "preferences",
									children: "Preferências"
								})
							]
						}),
						/* @__PURE__ */ (0, G.jsx)(f_, {
							value: "backup",
							className: "mt-4",
							children: /* @__PURE__ */ (0, G.jsxs)(Sm, { children: [/* @__PURE__ */ (0, G.jsxs)(Cm, {
								className: "flex-row items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, G.jsxs)("div", { children: [/* @__PURE__ */ (0, G.jsxs)(wm, {
									className: "flex items-center gap-2 text-base",
									children: [/* @__PURE__ */ (0, G.jsx)(Ne, { className: "size-4 text-muted-foreground" }), "Backup na nuvem"]
								}), /* @__PURE__ */ (0, G.jsx)(Tm, {
									className: "mt-1",
									children: "Sincronize preferências e dados da conta."
								})] }), /* @__PURE__ */ (0, G.jsx)(ym, {
									variant: t?.enabled ? "default" : "secondary",
									children: t ? t.enabled ? "Ativo" : "Desativado" : "Consultando"
								})]
							}), /* @__PURE__ */ (0, G.jsxs)(Em, {
								className: "grid gap-4",
								children: [/* @__PURE__ */ (0, G.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3 border-t pt-4 text-sm",
									children: [/* @__PURE__ */ (0, G.jsx)("span", {
										className: "text-muted-foreground",
										children: "Armazenamento utilizado"
									}), /* @__PURE__ */ (0, G.jsxs)("strong", {
										className: "font-mono text-xs sm:text-sm",
										children: [
											t ? m_(t.size || 0) : "—",
											" / ",
											m_(v)
										]
									})]
								}), /* @__PURE__ */ (0, G.jsxs)("div", {
									className: "grid grid-cols-1 gap-2 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, G.jsx)($, {
											onClick: () => void g("toggle", () => e.toggleBackup(!t?.enabled)),
											disabled: s !== null || !t,
											children: s === "toggle" ? "Atualizando…" : t?.enabled ? "Desativar backup" : "Ativar backup"
										}),
										/* @__PURE__ */ (0, G.jsx)($, {
											variant: "outline",
											onClick: () => void g("save", e.saveBackup),
											disabled: s !== null,
											children: s === "save" ? "Salvando…" : "Salvar agora"
										}),
										/* @__PURE__ */ (0, G.jsx)($, {
											variant: "outline",
											onClick: () => void g("restore", e.restoreBackup),
											disabled: s !== null,
											children: s === "restore" ? "Restaurando…" : "Restaurar backup"
										})
									]
								})]
							})] })
						}),
						/* @__PURE__ */ (0, G.jsx)(f_, {
							value: "progress",
							className: "mt-4",
							children: /* @__PURE__ */ (0, G.jsxs)(Sm, { children: [/* @__PURE__ */ (0, G.jsxs)(Cm, { children: [/* @__PURE__ */ (0, G.jsxs)(wm, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, G.jsx)(Ye, { className: "size-4 text-muted-foreground" }), "Progresso dos jogos"]
							}), /* @__PURE__ */ (0, G.jsx)(Tm, { children: "Os arquivos dos jogos continuam no navegador. Estas ações removem apenas os saves." })] }), /* @__PURE__ */ (0, G.jsxs)(Em, {
								className: "grid gap-3",
								children: [
									/* @__PURE__ */ (0, G.jsx)($, {
										variant: "destructive",
										className: "w-full sm:w-fit",
										onClick: () => f("clear-all"),
										children: "Apagar todos os progressos"
									}),
									/* @__PURE__ */ (0, G.jsxs)("div", {
										className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]",
										children: [/* @__PURE__ */ (0, G.jsxs)(Og, {
											value: a,
											onValueChange: (e) => o(e ?? ""),
											children: [/* @__PURE__ */ (0, G.jsx)(Ag, {
												className: "w-full",
												children: /* @__PURE__ */ (0, G.jsx)(kg, { placeholder: "Escolha um jogo" })
											}), /* @__PURE__ */ (0, G.jsx)(jg, { children: r.map((e) => /* @__PURE__ */ (0, G.jsxs)(Mg, {
												value: e.id,
												children: [
													e.name,
													" — ",
													e.id
												]
											}, e.id)) })]
										}), /* @__PURE__ */ (0, G.jsx)($, {
											variant: "destructive",
											disabled: !a,
											onClick: () => f("clear-game"),
											children: "Apagar jogo"
										})]
									}),
									/* @__PURE__ */ (0, G.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "O identificador exibido depois do nome é o jogo selecionado."
									})
								]
							})] })
						}),
						/* @__PURE__ */ (0, G.jsx)(f_, {
							value: "preferences",
							className: "mt-4",
							children: /* @__PURE__ */ (0, G.jsxs)(Sm, { children: [/* @__PURE__ */ (0, G.jsxs)(Cm, { children: [/* @__PURE__ */ (0, G.jsxs)(wm, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, G.jsx)(Dt, { className: "size-4 text-muted-foreground" }), "Preferências locais"]
							}), /* @__PURE__ */ (0, G.jsx)(Tm, { children: "Tema, proxy, identidade do navegador e teclas ficam salvos neste dispositivo." })] }), /* @__PURE__ */ (0, G.jsx)(Em, { children: /* @__PURE__ */ (0, G.jsx)($, {
								variant: "destructive",
								onClick: () => f("clear-preferences"),
								children: "Apagar preferências locais"
							}) })] })
						})
					]
				}),
				l && /* @__PURE__ */ (0, G.jsx)("p", {
					className: "mt-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
					role: "alert",
					children: l
				}),
				/* @__PURE__ */ (0, G.jsx)(Ym, {
					open: d !== null,
					onOpenChange: (e) => !e && f(null),
					children: /* @__PURE__ */ (0, G.jsxs)(Qm, { children: [/* @__PURE__ */ (0, G.jsxs)($m, { children: [/* @__PURE__ */ (0, G.jsx)(th, { children: "Confirmar exclusão" }), /* @__PURE__ */ (0, G.jsx)(nh, { children: d === "clear-all" ? "Apagar todos os saves de jogos deste perfil?" : d === "clear-game" ? `Apagar o save de ${a}?` : "Apagar as preferências locais deste dispositivo?" })] }), /* @__PURE__ */ (0, G.jsxs)(eh, { children: [/* @__PURE__ */ (0, G.jsx)($, {
						variant: "outline",
						onClick: () => f(null),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, G.jsx)($, {
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
function g_(e) {
	let [t, n] = (0, _.useState)(e.currentId);
	return /* @__PURE__ */ (0, G.jsx)(Ym, {
		open: !0,
		onOpenChange: (t) => {
			t || e.onClose();
		},
		children: /* @__PURE__ */ (0, G.jsxs)(Qm, {
			className: "max-h-[min(86svh,760px)] overflow-y-auto sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, G.jsxs)($m, { children: [/* @__PURE__ */ (0, G.jsx)(th, { children: "Servidor proxy" }), /* @__PURE__ */ (0, G.jsxs)(nh, { children: [e.guestMode ? "Convidados usam apenas servidores públicos externos." : "Escolha o servidor WISP usado pelo cliente.", " A medição representa a abertura do WebSocket neste dispositivo."] })] }),
				/* @__PURE__ */ (0, G.jsx)("div", {
					className: "grid gap-2",
					role: "radiogroup",
					"aria-label": "Servidor proxy",
					children: e.options.map((r) => {
						let i = e.latency[r.id] ?? {
							label: "Medindo conexão…",
							state: "pending"
						}, a = t === r.id;
						return /* @__PURE__ */ (0, G.jsxs)("button", {
							type: "button",
							role: "radio",
							"aria-checked": a,
							"data-proxy-id": r.id,
							onClick: () => n(r.id),
							className: `group flex min-h-16 w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${a ? "border-foreground bg-accent" : "border-border bg-background hover:bg-muted"}`,
							children: [
								/* @__PURE__ */ (0, G.jsx)("span", {
									className: `mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border ${a ? "border-foreground" : "border-muted-foreground/50"}`,
									children: a && /* @__PURE__ */ (0, G.jsx)("span", { className: "size-2 rounded-full bg-foreground" })
								}),
								/* @__PURE__ */ (0, G.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, G.jsxs)("span", {
											className: "flex items-center gap-2 font-medium",
											children: [r.name, r.beta && /* @__PURE__ */ (0, G.jsx)(ym, {
												variant: "outline",
												className: "text-[10px]",
												children: "BETA"
											})]
										}),
										/* @__PURE__ */ (0, G.jsx)("span", {
											className: "mt-1 block text-sm text-muted-foreground",
											children: r.description
										}),
										/* @__PURE__ */ (0, G.jsxs)("span", {
											className: `connection ${i.state} mt-2 flex items-center gap-1.5 text-xs text-muted-foreground`,
											children: [/* @__PURE__ */ (0, G.jsx)(Nt, { className: `size-3 ${i.state === "online" ? "text-emerald-500" : i.state === "offline" ? "text-destructive" : ""}` }), i.label]
										})
									]
								}),
								a && /* @__PURE__ */ (0, G.jsx)(Ce, { className: "size-4 text-foreground" })
							]
						}, r.id);
					})
				}),
				/* @__PURE__ */ (0, G.jsx)("p", {
					className: "rounded-md border bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground",
					children: "Servidores beta são operados por terceiros. O tráfego de navegação pode não passar pelo backend OrganizeOn."
				}),
				/* @__PURE__ */ (0, G.jsxs)(eh, { children: [/* @__PURE__ */ (0, G.jsx)($, {
					variant: "outline",
					onClick: e.onClose,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, G.jsx)($, {
					onClick: () => e.onApply(t),
					children: "Aplicar e reiniciar"
				})] })
			]
		})
	});
}
var __ = {
	owner: "Owner",
	ultra_admin: "Ultra Admin",
	admin: "Administrador",
	user: "Usuário",
	guest: "Convidado"
};
function v_(e) {
	let [t, n] = (0, _.useState)(!1), [r, i] = (0, _.useState)(!1), a = [
		{
			id: "home",
			label: "Início",
			icon: Ze
		},
		{
			id: "games",
			label: "Jogos",
			icon: Ye
		},
		{
			id: "settings",
			label: "Configurações",
			icon: Dt
		},
		...e.guest ? [] : [{
			id: "data",
			label: "Dados",
			icon: Ne
		}],
		{
			id: "proxy",
			label: "Servidor proxy",
			icon: Nt
		},
		...e.canOpenDashboard ? [{
			id: "dashboard",
			label: "Dashboard",
			icon: jt
		}] : []
	];
	return /* @__PURE__ */ (0, G.jsxs)(Fg, {
		open: r,
		onOpenChange: i,
		children: [
			/* @__PURE__ */ (0, G.jsx)(Ig, {
				render: /* @__PURE__ */ (0, G.jsx)($, {
					variant: "outline",
					size: "icon",
					className: "pointer-events-auto fixed left-3 top-3 z-40",
					"aria-label": "Abrir menu"
				}),
				children: /* @__PURE__ */ (0, G.jsx)(st, {})
			}),
			/* @__PURE__ */ (0, G.jsxs)(zg, {
				side: "left",
				className: "w-[min(88vw,320px)] border-border bg-popover p-3",
				children: [
					/* @__PURE__ */ (0, G.jsxs)(Bg, {
						className: "border-b px-2 pb-4 text-left",
						children: [/* @__PURE__ */ (0, G.jsxs)(Vg, {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, G.jsx)("img", {
								className: "size-7",
								src: "https://organizeon.com.br/d3/assets/organizeon-icon.png",
								alt: ""
							}), "OrganizeOn"]
						}), /* @__PURE__ */ (0, G.jsx)(Hg, { children: "Workspace" })]
					}),
					/* @__PURE__ */ (0, G.jsx)("nav", {
						className: "grid gap-1",
						"aria-label": "Navegação da conta",
						children: a.map(({ id: t, label: n, icon: r }) => /* @__PURE__ */ (0, G.jsxs)($, {
							variant: "ghost",
							className: "justify-start",
							onClick: () => {
								i(!1), e.onNavigate(t);
							},
							children: [
								/* @__PURE__ */ (0, G.jsx)(r, { className: "size-4 text-muted-foreground" }),
								n,
								t === "proxy" && /* @__PURE__ */ (0, G.jsx)(ym, {
									variant: "secondary",
									className: "ml-auto",
									children: e.proxyLabel
								})
							]
						}, t))
					}),
					/* @__PURE__ */ (0, G.jsx)("div", {
						className: "mt-auto border-t pt-3",
						children: /* @__PURE__ */ (0, G.jsxs)(sm, { children: [/* @__PURE__ */ (0, G.jsxs)(cm, {
							render: /* @__PURE__ */ (0, G.jsx)($, {
								variant: "ghost",
								className: "h-12 w-full justify-start",
								"aria-label": `Perfil de ${e.username}`
							}),
							children: [
								/* @__PURE__ */ (0, G.jsx)(Gt, { className: "size-4" }),
								/* @__PURE__ */ (0, G.jsxs)("span", {
									className: "grid flex-1 text-left",
									children: [/* @__PURE__ */ (0, G.jsx)("span", {
										className: "text-sm",
										children: e.username
									}), /* @__PURE__ */ (0, G.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: __[e.role] || "Usuário"
									})]
								}),
								/* @__PURE__ */ (0, G.jsx)(De, { className: "size-4" })
							]
						}), /* @__PURE__ */ (0, G.jsxs)(lm, {
							side: "top",
							align: "start",
							className: "w-64",
							children: [
								/* @__PURE__ */ (0, G.jsx)(um, { children: /* @__PURE__ */ (0, G.jsxs)(dm, { children: [
									e.username,
									" · ",
									__[e.role] || "Usuário"
								] }) }),
								/* @__PURE__ */ (0, G.jsx)(pm, {}),
								/* @__PURE__ */ (0, G.jsxs)(fm, {
									onClick: () => n(!0),
									className: "text-destructive",
									children: [/* @__PURE__ */ (0, G.jsx)(rt, {}), "Sair da conta"]
								})
							]
						})] })
					})
				]
			}),
			/* @__PURE__ */ (0, G.jsx)(Ym, {
				open: t,
				onOpenChange: n,
				children: /* @__PURE__ */ (0, G.jsxs)(Qm, {
					className: "sm:max-w-sm",
					children: [/* @__PURE__ */ (0, G.jsxs)($m, { children: [/* @__PURE__ */ (0, G.jsx)(th, { children: "Encerrar sessão?" }), /* @__PURE__ */ (0, G.jsx)(nh, { children: e.guest ? "Deseja sair do modo convidado?" : "Deseja realmente sair desta conta?" })] }), /* @__PURE__ */ (0, G.jsxs)(eh, { children: [/* @__PURE__ */ (0, G.jsx)($, {
						variant: "outline",
						onClick: () => n(!1),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, G.jsx)($, {
						variant: "destructive",
						onClick: () => e.onNavigate("logout"),
						children: "Sair"
					})] })]
				})
			})
		]
	});
}
function y_(e) {
	let { type: t, ...n } = e, r = (0, _.useMemo)(() => t === "login" ? /* @__PURE__ */ (0, G.jsx)(p_, { ...n }) : t === "data" ? /* @__PURE__ */ (0, G.jsx)(h_, { ...n }) : t === "proxy" ? /* @__PURE__ */ (0, G.jsx)(g_, { ...n }) : /* @__PURE__ */ (0, G.jsx)(v_, { ...n }), [t, n]);
	return /* @__PURE__ */ (0, G.jsx)("div", {
		className: t === "account" ? "organizeon-ui organizeon-overlay-root dark text-foreground" : "organizeon-ui dark min-h-svh bg-background text-foreground",
		children: r
	});
}
// node_modules/@base-ui/react/tooltip/root/TooltipRootContext.mjs
var b_ = /*#__PURE__*/ _.createContext(void 0);
function x_(e) {
	let t = _.useContext(b_);
	if (t === void 0 && !e) throw Error($t(72));
	return t;
}
// node_modules/@base-ui/react/tooltip/store/TooltipStore.mjs
var S_ = {
	...Xc,
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
}, C_ = class extends Vc {
	constructor(e, t, n) {
		let r = new xc();
		super(w_(e, r, t, n), T_(r), S_);
	}
	setOpen = (e, t) => {
		hc(this, e, t, { extraState: { openChangeReason: t.reason } });
	};
	cancelPendingOpen(e) {
		this.state.floatingRootContext.dispatchOpenChange(!1, J(fr, e));
	}
};
function w_(e, t, n, r = !1) {
	return {
		...Wc(t, n, r),
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
function T_(e) {
	return {
		popupRef: /*#__PURE__*/ _.createRef(),
		onOpenChange: void 0,
		onOpenChangeComplete: void 0,
		triggerElements: e
	};
}
// node_modules/@base-ui/react/tooltip/root/TooltipRoot.mjs
var E_ = Ac(function(e) {
	let { disabled: t = !1, defaultOpen: n = !1, open: r, disableHoverablePopup: i = !1, trackCursorAxis: a = "none", actionsRef: o, onOpenChange: s, onOpenChangeComplete: c, handle: l, triggerId: u, defaultTriggerId: d = null, children: f } = e, p = lc((e, t) => new C_({
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
	}), _c(p, { closeOnActiveTriggerUnmount: !0 });
	let { forceUnmount: b, transitionStatus: x } = vc(h, p), S = p.useState("isInstantPhase"), C = p.useState("instantType"), w = p.useState("lastOpenChangeReason"), T = _.useRef(null);
	q(() => {
		m && t && p.setOpen(!1, J(Tr));
	}, [
		m,
		t,
		p
	]), q(() => {
		x === "ending" && w === "none" || x !== "ending" && S ? (C !== "delay" && (T.current = C), p.set("instantType", "delay")) : T.current !== null && (p.set("instantType", T.current), T.current = null);
	}, [
		x,
		S,
		w,
		C,
		p
	]), q(() => {
		h && (g ?? p.set("payload", void 0));
	}, [
		p,
		g,
		h
	]), _.useImperativeHandle(o, () => ({
		unmount: b,
		close: () => p.setOpen(!1, J(Or))
	}), [b, p]);
	let E = h || v || !t && a !== "none";
	return /*#__PURE__*/ (0, G.jsxs)(b_.Provider, {
		value: p,
		children: [
			l && /*#__PURE__*/ (0, G.jsx)(uc, {
				handle: l,
				store: p
			}),
			E && /*#__PURE__*/ (0, G.jsx)(D_, {
				store: p,
				disabled: t,
				trackCursorAxis: a
			}),
			typeof f == "function" ? f({ payload: y }) : f
		]
	});
});
function D_({ store: e, disabled: t, trackCursorAxis: n }) {
	let r = e.useState("floatingRootContext"), i = ic(r, {
		enabled: !t,
		referencePress: () => e.select("closeOnClick")
	}), a = tc(r, {
		enabled: !t && n !== "none",
		axis: n === "none" ? void 0 : n
	}), o = _.useMemo(() => wn(a.reference, i.reference), [a.reference, i.reference]);
	return yc(e, {
		activeTriggerProps: o,
		inactiveTriggerProps: o,
		popupProps: i.floating ?? yn
	}), null;
}
// node_modules/@base-ui/react/tooltip/provider/TooltipProviderContext.mjs
var O_ = /*#__PURE__*/ _.createContext(void 0);
function k_() {
	return _.useContext(O_);
}
// node_modules/@base-ui/react/tooltip/trigger/TooltipTrigger.mjs
var A_ = "data-base-ui-tooltip-trigger";
function j_(e) {
	let t = wa(e);
	return Vr(t) ? t : null;
}
var M_ = jc(function(e, t) {
	let { render: n, className: r, style: i, handle: a, payload: o, disabled: s, delay: c, closeOnClick: l = !0, closeDelay: u, id: d, ...f } = e, p = x_(!0), m = Zc(a) ?? p;
	if (!m) throw Error($t(82));
	let h = Ki(d), g = m.useState("isTriggerActive", h), v = m.useState("isOpenedByTrigger", h), y = m.useState("floatingRootContext"), b = _.useRef(null), x = u ?? 0, { registerTrigger: S, isMountedByThisTrigger: C } = gc(h, b, m, {
		payload: o,
		closeOnClick: l,
		closeDelay: x
	}), w = k_(), { activeIdRef: T, delayRef: E, isInstantPhase: D, hasProvider: O } = Ja(y, { open: v }), k = al(y);
	m.useSyncedValue("isInstantPhase", D);
	let A = m.useState("disabled"), j = s ?? A, M = Za(j), N = m.useState("trackCursorAxis"), P = m.useState("disableHoverablePopup"), F = _.useRef(!1), I = ha(), L = _.useRef(void 0);
	function R() {
		return O && T.current != null ? 0 : c ?? w ?? 600;
	}
	function z(e) {
		let t = b.current;
		if (!t || !e) return !1;
		let n = Ca(e, `[${A_}]`);
		return n !== null && n !== t && Y(t, n);
	}
	function ee(e) {
		let t = z(e);
		return F.current = t, t && (k.openChangeTimeout.clear(), k.restTimeout.clear(), k.restTimeoutPending = !1, I.clear()), t;
	}
	let B = cl(y, {
		enabled: !j,
		mouseOnly: !0,
		move: !1,
		handleClose: !P && N !== "both" ? wl() : null,
		restMs: R,
		delay() {
			return u == null && O ? { close: Va(E.current, "close") } : { close: x };
		},
		triggerElementRef: b,
		isActiveTrigger: g,
		isClosing: () => m.select("transitionStatus") === "ending",
		shouldOpen() {
			return !F.current;
		}
	}), te = el(y, { enabled: !j }).reference, V = (e) => {
		let t = F.current, n = j_(e), r = ee(n), i = b.current, a = i && n && Y(i, n);
		if (r && m.select("open") && m.select("lastOpenChangeReason") === "trigger-hover") m.setOpen(!1, J(pr, e));
		else if (t && !r && a && !M.current && !m.select("open") && i && ba(L.current)) {
			let t = () => {
				F.current || M.current || m.select("open") || m.setOpen(!0, J(pr, e, i));
			}, n = R();
			n === 0 ? (I.clear(), t()) : I.start(n, t);
		}
	}, ne = m.useState("appliedTriggerProps", C || N !== "none");
	return Ln("button", e, {
		state: { open: v },
		ref: [
			t,
			S,
			b
		],
		props: [
			B,
			te,
			ne,
			{
				onMouseOver(e) {
					V(e.nativeEvent);
				},
				onFocus(e) {
					z(j_(e.nativeEvent)) && e.preventBaseUIHandler();
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
				[ja]: j ? "" : void 0,
				[A_]: j ? void 0 : ""
			},
			f
		],
		stateAttributesMapping: ar
	});
}), N_ = /*#__PURE__*/ _.createContext(void 0);
function P_() {
	let e = _.useContext(N_);
	if (e === void 0) throw Error($t(70));
	return e;
}
// node_modules/@base-ui/react/utils/FloatingPortalLite.mjs
var F_ = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { children: n, container: r, className: i, render: a, style: o, ...s } = e, { node: c, subtree: l } = Ms({
		container: r,
		ref: t,
		componentProps: e,
		elementProps: s
	});
	return !l && !c ? null : /*#__PURE__*/ (0, G.jsxs)(_.Fragment, { children: [l, c && /*#__PURE__*/ v.createPortal(n, c)] });
}), I_ = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e;
	return x_().useState("mounted") || n ? /*#__PURE__*/ (0, G.jsx)(N_.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, G.jsx)(F_, {
			ref: t,
			...r
		})
	}) : null;
}), L_ = /*#__PURE__*/ _.createContext(void 0);
function R_() {
	let e = _.useContext(L_);
	if (e === void 0) throw Error($t(71));
	return e;
}
// node_modules/@base-ui/react/tooltip/positioner/TooltipPositioner.mjs
var z_ = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, anchor: i, positionMethod: a = "absolute", side: o = "top", align: s = "center", sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = Ds, style: g, ...v } = e, y = x_(), b = P_(), x = y.useState("open"), S = y.useState("mounted"), C = y.useState("trackCursorAxis"), w = y.useState("disableHoverablePopup"), T = y.useState("floatingRootContext"), E = y.useState("instantType"), D = y.useState("transitionStatus"), O = _d({
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
	}), k = kd(e, _.useMemo(() => ({
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
	return /*#__PURE__*/ (0, G.jsx)(L_.Provider, {
		value: O,
		children: k
	});
}), B_ = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = x_(), { side: s, align: c } = R_(), l = o.useState("open"), u = o.useState("instantType"), d = o.useState("transitionStatus"), f = o.useState("popupProps"), p = o.useState("floatingRootContext"), m = o.useState("disabled"), h = o.useState("closeDelay");
	aa({
		open: l,
		ref: o.context.popupRef,
		onComplete() {
			l && o.context.onOpenChangeComplete?.(!0);
		}
	}), ol(p, {
		enabled: !m,
		closeDelay: h
	});
	let g = o.useStateSetter("popupElement");
	return Ln("div", e, {
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
			sc,
			f,
			Vu(d),
			a
		],
		stateAttributesMapping: cr
	});
}), V_ = /*#__PURE__*/ _.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = x_(), { arrowRef: s, side: c, align: l, arrowUncentered: u, arrowStyles: d } = R_();
	return Ln("div", e, {
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
		stateAttributesMapping: sr
	});
}), H_ = function(e) {
	let { delay: t, closeDelay: n, timeout: r = 400 } = e, i = _.useMemo(() => ({
		open: t,
		close: n
	}), [t, n]);
	return /*#__PURE__*/ (0, G.jsx)(O_.Provider, {
		value: t,
		children: /*#__PURE__*/ (0, G.jsx)(qa, {
			delay: i,
			timeoutMs: r,
			children: e.children
		})
	});
};
// src/components/ui/tooltip.tsx
function U_({ delay: e = 0, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(H_, {
		"data-slot": "tooltip-provider",
		delay: e,
		...t
	});
}
function W_({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(E_, {
		"data-slot": "tooltip",
		...e
	});
}
function G_({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(M_, {
		"data-slot": "tooltip-trigger",
		...e
	});
}
function K_({ className: e, side: t = "top", sideOffset: n = 4, align: r = "center", alignOffset: i = 0, children: a, ...o }) {
	let s = om();
	return /* @__PURE__ */ (0, G.jsx)(I_, {
		container: s ?? void 0,
		children: /* @__PURE__ */ (0, G.jsx)(z_, {
			align: r,
			alignOffset: i,
			side: t,
			sideOffset: n,
			className: "isolate z-50",
			children: /* @__PURE__ */ (0, G.jsxs)(B_, {
				"data-slot": "tooltip-content",
				className: Q("z-50 inline-flex w-fit max-w-xs origin-[var(--transform-origin)] items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...o,
				children: [a, /* @__PURE__ */ (0, G.jsx)(V_, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })]
			})
		})
	});
}
// src/components/client/game-card.tsx
function q_({ game: e }) {
	let t = e.type === "flash" ? "Flash · Ruffle" : e.type === "external-download" ? "HTML offline" : e.type === "remote" ? "Multiplayer" : "HTML5";
	return /* @__PURE__ */ (0, G.jsxs)(Sm, {
		className: "h-full overflow-hidden rounded-lg border-border bg-card p-0 shadow-none transition-colors hover:border-zinc-600",
		children: [/* @__PURE__ */ (0, G.jsx)("img", {
			className: "aspect-[16/10] w-full bg-muted object-cover",
			src: e.cover,
			alt: `Capa de ${e.name}`,
			loading: "lazy"
		}), /* @__PURE__ */ (0, G.jsxs)(Em, {
			className: "grid gap-3 p-3.5 sm:p-4",
			children: [
				/* @__PURE__ */ (0, G.jsxs)("div", {
					className: "flex flex-wrap gap-1.5",
					children: [
						/* @__PURE__ */ (0, G.jsxs)(ym, {
							variant: "secondary",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, G.jsx)(Ye, { className: "size-3" }), t]
						}),
						e.platforms.map((e) => /* @__PURE__ */ (0, G.jsx)(ym, {
							variant: "outline",
							children: e
						}, e)),
						e.mobileWarning && /* @__PURE__ */ (0, G.jsx)(ym, {
							variant: "outline",
							children: "Melhor com teclado"
						}),
						e.trending && /* @__PURE__ */ (0, G.jsxs)(ym, {
							variant: "outline",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, G.jsx)(Ge, { className: "size-3" }), "Em alta"]
						})
					]
				}),
				/* @__PURE__ */ (0, G.jsxs)("div", {
					className: "flex min-w-0 items-start gap-2",
					children: [/* @__PURE__ */ (0, G.jsx)("h2", {
						className: "min-w-0 flex-1 text-base font-semibold leading-5 tracking-tight",
						children: e.name
					}), /* @__PURE__ */ (0, G.jsx)(ym, {
						variant: "outline",
						className: "shrink-0 font-mono text-[10px]",
						children: e.sizeLabel
					})]
				}),
				/* @__PURE__ */ (0, G.jsx)("p", {
					className: "min-h-10 text-xs leading-relaxed text-muted-foreground",
					children: e.description
				}),
				/* @__PURE__ */ (0, G.jsx)("p", {
					className: "min-h-4 text-[10px] leading-relaxed text-muted-foreground",
					children: e.attribution
				}),
				/* @__PURE__ */ (0, G.jsx)("div", {
					className: "game-stats flex min-h-4 flex-wrap gap-3 text-[10px] text-muted-foreground",
					"aria-label": "Estatísticas do jogo"
				}),
				/* @__PURE__ */ (0, G.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, G.jsxs)($, {
							className: "action min-w-0 flex-1",
							type: "button",
							disabled: !0,
							children: [e.type === "external-download" ? /* @__PURE__ */ (0, G.jsx)(Le, {}) : e.type === "remote" ? /* @__PURE__ */ (0, G.jsx)(yt, {}) : /* @__PURE__ */ (0, G.jsx)(_t, {}), /* @__PURE__ */ (0, G.jsx)("span", {
								"data-action-label": !0,
								children: "Verificando…"
							})]
						}),
						e.relayUrl && /* @__PURE__ */ (0, G.jsx)($, {
							className: "credits",
							variant: "outline",
							type: "button",
							title: e.relaySupport || "Relay multiplayer",
							onClick: e.onRelay,
							children: "Copiar relay"
						}),
						e.hasCredits && /* @__PURE__ */ (0, G.jsxs)($, {
							className: "credits",
							variant: "outline",
							type: "button",
							onClick: e.onCredits,
							children: [/* @__PURE__ */ (0, G.jsx)(Ve, {}), "Créditos"]
						}),
						/* @__PURE__ */ (0, G.jsx)($, {
							className: "remove",
							variant: "destructive",
							size: "icon",
							type: "button",
							title: "Apagar jogo do cache",
							"aria-label": `Apagar ${e.name} do cache`,
							hidden: !0,
							onClick: e.onRemove,
							children: /* @__PURE__ */ (0, G.jsx)(zt, {})
						})
					]
				}),
				/* @__PURE__ */ (0, G.jsx)("div", {
					className: "progress h-1.5 overflow-hidden rounded-full bg-muted",
					hidden: !0,
					children: /* @__PURE__ */ (0, G.jsx)("span", { className: "block h-full w-0 rounded-full bg-primary transition-[width] duration-100" })
				})
			]
		})]
	});
}
// src/components/client/catalog-toolbar.tsx
function J_({ count: e, categories: t, onBack: n, onQueryChange: r, onFilterChange: i }) {
	let [a, o] = (0, _.useState)("all"), s = [
		{
			id: "all",
			label: "Todos",
			icon: Ye
		},
		{
			id: "trending",
			label: "Em alta",
			icon: Ge
		},
		{
			id: "flash",
			label: "Flash",
			icon: Yt
		},
		{
			id: "pc",
			label: "PC",
			icon: null
		},
		{
			id: "mobile",
			label: "Celular",
			icon: Ft
		},
		...t.map((e) => ({
			id: `category:${e}`,
			label: e,
			icon: null
		}))
	];
	return /* @__PURE__ */ (0, G.jsxs)("div", {
		className: "mx-auto grid w-full max-w-[1180px] gap-5 px-4 pb-5 pt-5 sm:px-6 sm:pt-7",
		children: [/* @__PURE__ */ (0, G.jsxs)("header", {
			className: "flex min-w-0 flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, G.jsx)($, {
					variant: "outline",
					size: "icon",
					"aria-label": "Voltar ao OrganizeOn",
					onClick: n,
					children: /* @__PURE__ */ (0, G.jsx)(xe, {})
				}),
				/* @__PURE__ */ (0, G.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, G.jsx)("h1", {
						className: "text-xl font-semibold tracking-tight",
						children: "Jogos"
					}), /* @__PURE__ */ (0, G.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: e ? `${e.toLocaleString("pt-BR")} jogos · baixe uma vez e jogue do cache` : "Carregando catálogo…"
					})]
				}),
				/* @__PURE__ */ (0, G.jsxs)("label", {
					className: "relative w-full sm:w-72",
					children: [/* @__PURE__ */ (0, G.jsx)(Tt, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, G.jsx)(bh, {
						className: "pl-9",
						type: "search",
						"aria-label": "Pesquisar jogos",
						placeholder: `Pesquisar em ${e || "…"} jogos`,
						onChange: (e) => r(e.target.value)
					})]
				})
			]
		}), /* @__PURE__ */ (0, G.jsx)(c_, {
			value: a,
			onValueChange: (e) => {
				let t = e || "all";
				o(t), i(t);
			},
			children: /* @__PURE__ */ (0, G.jsx)(u_, {
				"aria-label": "Filtrar jogos",
				className: "h-auto max-w-full justify-start gap-1 overflow-x-auto bg-transparent p-0",
				children: s.map(({ id: e, label: t, icon: n }) => /* @__PURE__ */ (0, G.jsxs)(d_, {
					value: e,
					className: "min-h-8 shrink-0 gap-1.5 border border-transparent px-2.5 text-xs data-[active]:border-border data-[active]:bg-muted data-[active]:text-foreground",
					children: [n && /* @__PURE__ */ (0, G.jsx)(n, { className: "size-3.5" }), t]
				}, e))
			})
		})]
	});
}
// src/components/client/game-dialogs.tsx
function Y_({ title: e, description: t, confirmLabel: n = "Continuar", onCancel: r, onConfirm: i }) {
	return /* @__PURE__ */ (0, G.jsx)(Ym, {
		open: !0,
		onOpenChange: (e) => !e && r(),
		children: /* @__PURE__ */ (0, G.jsxs)(Qm, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, G.jsxs)($m, { children: [
				/* @__PURE__ */ (0, G.jsx)("div", {
					className: "grid size-9 place-items-center rounded-md border bg-muted",
					children: /* @__PURE__ */ (0, G.jsx)(Vt, { className: "size-4 text-muted-foreground" })
				}),
				/* @__PURE__ */ (0, G.jsx)(th, { children: e }),
				/* @__PURE__ */ (0, G.jsx)(nh, { children: t })
			] }), /* @__PURE__ */ (0, G.jsxs)(eh, { children: [/* @__PURE__ */ (0, G.jsx)($, {
				variant: "outline",
				onClick: r,
				children: "Cancelar"
			}), /* @__PURE__ */ (0, G.jsx)($, {
				onClick: i,
				children: n
			})] })]
		})
	});
}
function X_({ game: e, onClose: t }) {
	return /* @__PURE__ */ (0, G.jsx)(Ym, {
		open: !0,
		onOpenChange: (e) => !e && t(),
		children: /* @__PURE__ */ (0, G.jsxs)(Qm, {
			className: "max-h-[85svh] overflow-y-auto sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, G.jsxs)($m, { children: [/* @__PURE__ */ (0, G.jsxs)(th, { children: ["Créditos · ", e.name] }), /* @__PURE__ */ (0, G.jsx)(nh, { children: "Créditos e licença deste jogo." })] }),
				/* @__PURE__ */ (0, G.jsxs)("div", {
					className: "grid gap-2 text-sm text-muted-foreground",
					children: [
						e.attribution && /* @__PURE__ */ (0, G.jsx)("p", { children: e.attribution }),
						e.copyright && /* @__PURE__ */ (0, G.jsx)("p", { children: e.copyright }),
						e.license && /* @__PURE__ */ (0, G.jsxs)("p", { children: ["Licença: ", e.license] }),
						e.source && /* @__PURE__ */ (0, G.jsx)("p", { children: /* @__PURE__ */ (0, G.jsx)("a", {
							className: "text-foreground underline underline-offset-4",
							href: e.source,
							target: "_blank",
							rel: "noopener noreferrer",
							children: e.sourceLabel || "Abrir código-fonte e licença"
						}) })
					]
				}),
				/* @__PURE__ */ (0, G.jsx)(eh, { children: /* @__PURE__ */ (0, G.jsx)($, {
					onClick: t,
					children: "Fechar"
				}) })
			]
		})
	});
}
function Z_({ name: e, definitions: t, selectedKeys: n, defaultKeys: r, isTetris: i, initialLeftHanded: a, onClose: o, onSave: s, onFullscreen: c }) {
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
	return /* @__PURE__ */ (0, G.jsx)(Ym, {
		open: !0,
		onOpenChange: (e) => !e && o(),
		children: /* @__PURE__ */ (0, G.jsxs)(Qm, {
			className: "max-h-[min(85svh,720px)] overflow-y-auto sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, G.jsxs)($m, { children: [/* @__PURE__ */ (0, G.jsxs)(th, { children: ["Teclas · ", e] }), /* @__PURE__ */ (0, G.jsx)(nh, { children: "Ative as teclas usadas pelo jogo. A seleção fica salva neste aparelho." })] }),
				/* @__PURE__ */ (0, G.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, G.jsx)("legend", {
					className: "mb-2 text-sm font-medium",
					children: "Teclas disponíveis"
				}), /* @__PURE__ */ (0, G.jsx)("div", {
					className: "grid grid-cols-3 gap-2 sm:grid-cols-4",
					children: t.map((e) => /* @__PURE__ */ (0, G.jsxs)("label", {
						className: "flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm transition-colors hover:bg-muted",
						children: [/* @__PURE__ */ (0, G.jsx)("input", {
							type: "checkbox",
							className: "size-4 accent-primary",
							checked: l.has(e.code) || l.has(e.label) || !!(e.key && l.has(e.key)),
							onChange: (t) => p(e.code, t.target.checked)
						}), /* @__PURE__ */ (0, G.jsx)("span", { children: e.label })]
					}, e.code))
				})] }),
				i && /* @__PURE__ */ (0, G.jsxs)("div", {
					className: "grid gap-2 border-t pt-3",
					children: [
						/* @__PURE__ */ (0, G.jsx)("p", {
							className: "text-sm font-medium",
							children: "Opções do Tetris"
						}),
						/* @__PURE__ */ (0, G.jsxs)("label", {
							className: "flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm",
							children: [/* @__PURE__ */ (0, G.jsx)("input", {
								type: "checkbox",
								className: "size-4 accent-primary",
								checked: d,
								onChange: (e) => f(e.target.checked)
							}), /* @__PURE__ */ (0, G.jsx)("span", { children: "Sou canhoto (ações à esquerda)" })]
						}),
						/* @__PURE__ */ (0, G.jsxs)($, {
							variant: "outline",
							onClick: c,
							children: [/* @__PURE__ */ (0, G.jsx)(at, {}), "Tela cheia"]
						})
					]
				}),
				/* @__PURE__ */ (0, G.jsxs)(eh, {
					className: "flex-col-reverse sm:flex-row",
					children: [/* @__PURE__ */ (0, G.jsxs)($, {
						type: "button",
						variant: "outline",
						onClick: m,
						children: [/* @__PURE__ */ (0, G.jsx)(Ct, {}), "Restaurar padrão"]
					}), /* @__PURE__ */ (0, G.jsx)($, {
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
function Q_({ title: e, description: t, label: n, value: r, options: i, applyLabel: a = "Aplicar", onApply: o }) {
	let [s, c] = (0, _.useState)(r), l = s !== r, u = i.find((e) => e.value === s)?.description;
	return /* @__PURE__ */ (0, G.jsxs)(Sm, {
		className: "w-full animate-ui-enter",
		children: [/* @__PURE__ */ (0, G.jsxs)(Cm, {
			className: "gap-1.5 pb-0 sm:flex sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ (0, G.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, G.jsx)(wm, { children: e }), /* @__PURE__ */ (0, G.jsx)(Tm, {
					className: "mt-1 max-w-3xl leading-relaxed",
					children: t
				})]
			}), /* @__PURE__ */ (0, G.jsxs)("div", {
				className: "grid w-full gap-2 sm:w-auto sm:min-w-52 sm:grid-cols-[minmax(9rem,1fr)_auto]",
				children: [/* @__PURE__ */ (0, G.jsxs)(Og, {
					value: s,
					onValueChange: (e) => e && c(e),
					children: [/* @__PURE__ */ (0, G.jsx)(Ag, {
						"aria-label": n,
						className: "h-9 w-full",
						children: /* @__PURE__ */ (0, G.jsx)(kg, {})
					}), /* @__PURE__ */ (0, G.jsx)(jg, { children: i.map((e) => /* @__PURE__ */ (0, G.jsx)(Mg, {
						value: e.value,
						children: e.label
					}, e.value)) })]
				}), /* @__PURE__ */ (0, G.jsxs)($, {
					size: "sm",
					disabled: !l,
					onClick: () => o(s),
					children: [l ? /* @__PURE__ */ (0, G.jsx)(Ce, { "data-icon": "inline-start" }) : null, a]
				})]
			})]
		}), u ? /* @__PURE__ */ (0, G.jsx)(Em, {
			className: "pt-2 text-xs text-muted-foreground",
			children: u
		}) : null]
	});
}
// src/components/client/d2-login.tsx
function $_({ onSubmit: e }) {
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
	return /* @__PURE__ */ (0, G.jsx)("main", {
		className: "grid min-h-svh place-items-center px-4 py-10",
		children: /* @__PURE__ */ (0, G.jsxs)(Sm, {
			className: "w-full max-w-[380px] border-border bg-card shadow-none animate-ui-enter",
			children: [
				/* @__PURE__ */ (0, G.jsxs)(Cm, {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, G.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, G.jsx)("img", {
							className: "size-10 object-contain",
							src: "https://organizeon.com.br/d3/assets/organizeon-icon.png",
							alt: ""
						}), /* @__PURE__ */ (0, G.jsxs)("div", { children: [/* @__PURE__ */ (0, G.jsxs)("p", {
							className: "text-sm font-semibold",
							children: ["OrganizeOn ", /* @__PURE__ */ (0, G.jsx)("span", {
								className: "font-normal text-muted-foreground",
								children: "D2"
							})]
						}), /* @__PURE__ */ (0, G.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Painel de arquivos"
						})] })]
					}), /* @__PURE__ */ (0, G.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, G.jsx)(wm, {
							className: "text-xl",
							children: "Entrar no painel"
						}), /* @__PURE__ */ (0, G.jsx)(Tm, { children: "Autentique-se para acessar o conteúdo do Endpoint 2." })]
					})]
				}),
				/* @__PURE__ */ (0, G.jsx)(Em, { children: /* @__PURE__ */ (0, G.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: (e) => void l(e),
					children: [
						/* @__PURE__ */ (0, G.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Usuário", /* @__PURE__ */ (0, G.jsx)(bh, {
								autoComplete: "username",
								value: t,
								onChange: (e) => n(e.target.value),
								required: !0,
								disabled: s
							})]
						}),
						/* @__PURE__ */ (0, G.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Senha", /* @__PURE__ */ (0, G.jsx)(bh, {
								type: "password",
								autoComplete: "current-password",
								value: r,
								onChange: (e) => i(e.target.value),
								required: !0,
								disabled: s
							})]
						}),
						a && /* @__PURE__ */ (0, G.jsx)("p", {
							role: "alert",
							className: "text-sm text-destructive",
							children: a
						}),
						/* @__PURE__ */ (0, G.jsxs)($, {
							type: "submit",
							className: "h-10 w-full",
							disabled: s || !t || !r,
							children: [s && /* @__PURE__ */ (0, G.jsx)(tt, { className: "animate-spin" }), s ? "Entrando…" : "Entrar"]
						})
					]
				}) }),
				/* @__PURE__ */ (0, G.jsxs)(Dm, {
					className: "gap-2 border-t border-border pt-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, G.jsx)(kt, { className: "size-4" }), "Acesse com sua conta OrganizeOn."]
				})
			]
		})
	});
}
// src/hooks/use-service-theme.ts
function ev(e) {
	let t = (0, _.useRef)(null), [n, r] = (0, _.useState)(() => {
		try {
			return localStorage.getItem(e) === "light" ? "light" : "dark";
		} catch {
			return "dark";
		}
	});
	return (0, _.useLayoutEffect)(() => {
		let r = t.current?.closest(".organizeon-ui");
		if (r) {
			r.classList.toggle("light", n === "light"), r.classList.toggle("dark", n === "dark");
			try {
				localStorage.setItem(e, n);
			} catch {}
		}
	}, [e, n]), {
		rootRef: t,
		theme: n,
		toggleTheme: () => r((e) => e === "dark" ? "light" : "dark")
	};
}
// src/hooks/use-mobile.ts
var tv = 768;
function nv() {
	let [e, t] = _.useState(void 0);
	return _.useEffect(() => {
		let e = window.matchMedia("(max-width: 767px)"), n = () => {
			t(window.innerWidth < tv);
		};
		return e.addEventListener("change", n), t(window.innerWidth < tv), () => e.removeEventListener("change", n);
	}, []), !!e;
}
// src/components/ui/separator.tsx
function rv({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, G.jsx)(yf, {
		"data-slot": "separator",
		orientation: t,
		className: Q("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", e),
		...n
	});
}
// src/components/ui/sidebar.tsx
var iv = "sidebar_state", av = 604800, ov = "16rem", sv = "18rem", cv = "3rem", lv = "b", uv = _.createContext(null);
function dv() {
	let e = _.useContext(uv);
	if (!e) throw Error("useSidebar must be used within a SidebarProvider.");
	return e;
}
function fv({ defaultOpen: e = !0, open: t, onOpenChange: n, className: r, style: i, children: a, ...o }) {
	let s = nv(), [c, l] = _.useState(!1), [u, d] = _.useState(e), f = t ?? u, p = _.useCallback((e) => {
		let t = typeof e == "function" ? e(f) : e;
		n ? n(t) : d(t), document.cookie = `${iv}=${t}; path=/; max-age=${av}`;
	}, [n, f]), m = _.useCallback(() => s ? l((e) => !e) : p((e) => !e), [
		s,
		p,
		l
	]);
	_.useEffect(() => {
		let e = (e) => {
			e.key === lv && (e.metaKey || e.ctrlKey) && (e.preventDefault(), m());
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
	return /* @__PURE__ */ (0, G.jsx)(uv.Provider, {
		value: g,
		children: /* @__PURE__ */ (0, G.jsx)("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": ov,
				"--sidebar-width-icon": cv,
				...i
			},
			className: Q("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", r),
			...o,
			children: a
		})
	});
}
function pv({ side: e = "left", variant: t = "sidebar", collapsible: n = "offcanvas", className: r, children: i, dir: a, ...o }) {
	let { isMobile: s, state: c, openMobile: l, setOpenMobile: u } = dv();
	return n === "none" ? /* @__PURE__ */ (0, G.jsx)("div", {
		"data-slot": "sidebar",
		className: Q("flex h-full w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground", r),
		...o,
		children: i
	}) : s ? /* @__PURE__ */ (0, G.jsx)(Fg, {
		open: l,
		onOpenChange: u,
		...o,
		children: /* @__PURE__ */ (0, G.jsxs)(zg, {
			dir: a,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-[var(--sidebar-width)] bg-sidebar p-0 text-sidebar-foreground",
			style: { "--sidebar-width": sv },
			side: e,
			children: [/* @__PURE__ */ (0, G.jsxs)(Bg, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, G.jsx)(Vg, { children: "Navegação" }), /* @__PURE__ */ (0, G.jsx)(Hg, { children: "Navegue entre as páginas da aplicação." })]
			}), /* @__PURE__ */ (0, G.jsx)("div", {
				className: "flex h-full w-full flex-col",
				children: i
			})]
		})
	}) : /* @__PURE__ */ (0, G.jsxs)("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": c,
		"data-collapsible": c === "collapsed" ? n : "",
		"data-variant": t,
		"data-side": e,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ (0, G.jsx)("div", {
			"data-slot": "sidebar-gap",
			className: Q("relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon) + 1rem)]" : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]")
		}), /* @__PURE__ */ (0, G.jsx)("div", {
			"data-slot": "sidebar-container",
			"data-side": e,
			className: Q("fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", t === "floating" || t === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon) + 1rem + 2px)]" : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l", r),
			...o,
			children: /* @__PURE__ */ (0, G.jsx)("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
				children: i
			})
		})]
	});
}
function mv({ className: e, onClick: t, ...n }) {
	let { toggleSidebar: r } = dv();
	return /* @__PURE__ */ (0, G.jsxs)($, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon-sm",
		className: Q(e),
		onClick: (e) => {
			t?.(e), r();
		},
		...n,
		children: [/* @__PURE__ */ (0, G.jsx)(pt, {}), /* @__PURE__ */ (0, G.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function hv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("main", {
		"data-slot": "sidebar-inset",
		className: Q("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", e),
		...t
	});
}
function gv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: Q("flex flex-col gap-2 p-2", e),
		...t
	});
}
function _v({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: Q("flex flex-col gap-2 p-2", e),
		...t
	});
}
function vv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(rv, {
		"data-slot": "sidebar-separator",
		"data-sidebar": "separator",
		className: Q("mx-2 w-auto bg-sidebar-border", e),
		...t
	});
}
function yv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: Q("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", e),
		...t
	});
}
function bv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: Q("relative flex w-full min-w-0 flex-col p-2", e),
		...t
	});
}
function xv({ className: e, render: t, ...n }) {
	return mm({
		defaultTagName: "div",
		props: wn({ className: Q("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-none transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", e) }, n),
		render: t,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label"
		}
	});
}
function Sv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: Q("flex w-full min-w-0 flex-col gap-0", e),
		...t
	});
}
function Cv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: Q("group/menu-item relative", e),
		...t
	});
}
var wv = _m("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-none transition-[width,height,padding] group-has-[data-sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
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
function Tv({ render: e, isActive: t = !1, variant: n = "default", size: r = "default", tooltip: i, className: a, ...o }) {
	let { isMobile: s, state: c } = dv(), l = mm({
		defaultTagName: "button",
		props: wn({ className: Q(wv({
			variant: n,
			size: r
		}), a) }, o),
		render: i ? /* @__PURE__ */ (0, G.jsx)(G_, { render: e }) : e,
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size: r,
			active: t
		}
	});
	return i ? (typeof i == "string" && (i = { children: i }), /* @__PURE__ */ (0, G.jsxs)(W_, { children: [l, /* @__PURE__ */ (0, G.jsx)(K_, {
		side: "right",
		align: "center",
		hidden: c !== "collapsed" || s,
		...i
	})] })) : l;
}
// src/components/layout/rotating-icon.tsx
function Ev({ icon: e, active: t }) {
	let [n, r] = (0, _.useState)(t);
	return (0, _.useEffect)(() => {
		t && r(!0);
	}, [t]), /* @__PURE__ */ (0, G.jsx)(e, {
		"aria-hidden": "true",
		className: n ? "motion-safe:animate-spin" : void 0,
		onAnimationIteration: () => {
			t || r(!1);
		}
	});
}
// src/components/layout/service-shell.tsx
var Dv = {
	owner: "Owner",
	ultra_admin: "Ultra admin",
	super_admin: "Super admin",
	admin: "Admin",
	user: "Usuário"
};
function Ov() {
	let { setOpenMobile: e } = dv();
	return /* @__PURE__ */ (0, G.jsx)(Sv, { children: /* @__PURE__ */ (0, G.jsx)(Cv, { children: /* @__PURE__ */ (0, G.jsxs)(Tv, {
		isActive: !0,
		tooltip: "Meus arquivos",
		onClick: () => e(!1),
		children: [/* @__PURE__ */ (0, G.jsx)(Ue, {}), /* @__PURE__ */ (0, G.jsx)("span", { children: "Meus arquivos" })]
	}) }) });
}
function kv({ children: e, username: t, role: n, logout: r, refresh: i, refreshing: a }) {
	let { rootRef: o, theme: s, toggleTheme: c } = ev("d2-theme");
	return /* @__PURE__ */ (0, G.jsx)("div", {
		ref: o,
		className: "contents",
		children: /* @__PURE__ */ (0, G.jsx)(U_, { children: /* @__PURE__ */ (0, G.jsxs)(fv, {
			defaultOpen: !0,
			children: [/* @__PURE__ */ (0, G.jsxs)(pv, {
				collapsible: "icon",
				children: [
					/* @__PURE__ */ (0, G.jsx)(gv, {
						className: "px-3 pb-3 pt-4",
						children: /* @__PURE__ */ (0, G.jsxs)("a", {
							href: "#/dashboard",
							className: "flex min-h-10 items-center gap-2.5 rounded-md px-2 text-sm font-semibold",
							children: [/* @__PURE__ */ (0, G.jsx)("img", {
								className: "size-7 shrink-0",
								src: s === "dark" ? "https://organizeon.com.br/d3/assets/organizeon-icon.png" : "https://organizeon.com.br/d3/assets/organizeon_icon_black_128.png",
								alt: ""
							}), /* @__PURE__ */ (0, G.jsxs)("span", {
								className: "truncate",
								children: ["OrganizeOn ", /* @__PURE__ */ (0, G.jsx)("span", {
									className: "font-normal text-muted-foreground",
									children: "D2"
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, G.jsx)(vv, {}),
					/* @__PURE__ */ (0, G.jsx)(yv, { children: /* @__PURE__ */ (0, G.jsxs)(bv, { children: [/* @__PURE__ */ (0, G.jsx)(xv, { children: "Workspace" }), /* @__PURE__ */ (0, G.jsx)(Ov, {})] }) }),
					/* @__PURE__ */ (0, G.jsx)(_v, {
						className: "px-2 pb-3",
						children: /* @__PURE__ */ (0, G.jsxs)(sm, { children: [/* @__PURE__ */ (0, G.jsxs)(cm, {
							render: /* @__PURE__ */ (0, G.jsx)(Tv, {
								size: "lg",
								className: "h-12 justify-start",
								"aria-label": `Perfil de ${t}`
							}),
							children: [
								/* @__PURE__ */ (0, G.jsx)("span", {
									className: "grid size-8 shrink-0 place-items-center rounded-md border border-sidebar-border bg-sidebar-accent text-sidebar-foreground",
									children: /* @__PURE__ */ (0, G.jsx)(Gt, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, G.jsxs)("span", {
									className: "grid min-w-0 flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden",
									children: [/* @__PURE__ */ (0, G.jsx)("span", {
										className: "truncate font-medium",
										children: t
									}), /* @__PURE__ */ (0, G.jsx)("span", {
										className: "truncate text-muted-foreground",
										children: Dv[n] || n
									})]
								}),
								/* @__PURE__ */ (0, G.jsx)(De, { className: "ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" })
							]
						}), /* @__PURE__ */ (0, G.jsxs)(lm, {
							side: "top",
							align: "start",
							className: "w-64",
							children: [
								/* @__PURE__ */ (0, G.jsx)(um, { children: /* @__PURE__ */ (0, G.jsx)(dm, {
									className: "px-2 py-2",
									children: /* @__PURE__ */ (0, G.jsxs)("span", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, G.jsx)("span", {
											className: "grid size-8 place-items-center rounded-md border border-border bg-muted",
											children: /* @__PURE__ */ (0, G.jsx)(je, { className: "size-4" })
										}), /* @__PURE__ */ (0, G.jsxs)("span", {
											className: "grid min-w-0",
											children: [/* @__PURE__ */ (0, G.jsx)("span", {
												className: "truncate text-sm font-medium text-foreground",
												children: t
											}), /* @__PURE__ */ (0, G.jsx)("span", {
												className: "truncate text-xs text-muted-foreground",
												children: Dv[n] || n
											})]
										})]
									})
								}) }),
								/* @__PURE__ */ (0, G.jsx)(pm, {}),
								/* @__PURE__ */ (0, G.jsxs)(fm, {
									onClick: r,
									className: "text-destructive",
									children: [/* @__PURE__ */ (0, G.jsx)(rt, {}), "Sair da conta"]
								})
							]
						})] })
					})
				]
			}), /* @__PURE__ */ (0, G.jsxs)(hv, {
				className: "min-h-svh min-w-0",
				children: [/* @__PURE__ */ (0, G.jsxs)("header", {
					className: "sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, G.jsx)(mv, { "aria-label": "Abrir ou recolher navegação" }),
						/* @__PURE__ */ (0, G.jsx)("span", {
							className: "flex-1 text-sm font-medium",
							children: "Meus arquivos"
						}),
						/* @__PURE__ */ (0, G.jsx)($, {
							variant: "ghost",
							size: "icon",
							onClick: c,
							"aria-label": s === "dark" ? "Ativar tema claro" : "Ativar tema escuro",
							children: s === "dark" ? /* @__PURE__ */ (0, G.jsx)(Lt, {}) : /* @__PURE__ */ (0, G.jsx)(lt, {})
						}),
						/* @__PURE__ */ (0, G.jsx)($, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Atualizar",
							disabled: a,
							onClick: i,
							children: /* @__PURE__ */ (0, G.jsx)(Ev, {
								icon: xt,
								active: a
							})
						})
					]
				}), /* @__PURE__ */ (0, G.jsx)("main", {
					className: "mx-auto grid w-full max-w-5xl gap-5 px-4 py-6 sm:px-6 sm:py-8",
					children: e
				})]
			})]
		}) })
	});
}
// src/components/client/d2-dashboard.tsx
function Av({ username: e, role: t, request: n, upload: r, logout: i }) {
	let a = (0, _.useRef)(null), [o, s] = (0, _.useState)([]), [c, l] = (0, _.useState)(null), [u, d] = (0, _.useState)(null), [f, p] = (0, _.useState)(""), [m, h] = (0, _.useState)(!1), [g, v] = (0, _.useState)(null), [y, b] = (0, _.useState)(null);
	async function x() {
		h(!0);
		try {
			let e = await n("/files");
			s(e.files);
		} catch (e) {
			p(e instanceof Error ? e.message : "Falha ao carregar arquivos.");
		} finally {
			h(!1);
		}
	}
	(0, _.useEffect)(() => {
		x();
	}, []);
	async function S() {
		if (c) {
			p(""), d(0);
			try {
				await r(c, d), l(null), p("Arquivo enviado."), await x();
			} catch (e) {
				p(e instanceof Error ? e.message : "Falha no envio.");
			} finally {
				d(null);
			}
		}
	}
	async function C(e) {
		try {
			let t = await n(`/files/${encodeURIComponent(e.id)}`);
			v({
				id: e.id,
				name: t.file.name,
				content: t.content || ""
			});
		} catch (e) {
			p(e instanceof Error ? e.message : "Falha ao abrir arquivo.");
		}
	}
	async function w(e) {
		if (e.preventDefault(), g) try {
			await n(g.id ? `/files/${encodeURIComponent(g.id)}` : "/files", {
				method: g.id ? "PUT" : "POST",
				headers: {
					"Content-Type": "text/plain;charset=utf-8",
					...g.id ? {} : { "X-File-Name": encodeURIComponent(g.name.trim() || "script.txt") }
				},
				body: g.content
			}), v(null), p("Texto salvo."), await x();
		} catch (e) {
			p(e instanceof Error ? e.message : "Falha ao salvar.");
		}
	}
	async function T(e) {
		try {
			await n(`/files/${encodeURIComponent(e.id)}`, { method: "DELETE" }), b(null), await x();
		} catch (e) {
			p(e instanceof Error ? e.message : "Falha ao apagar.");
		}
	}
	async function E(e) {
		try {
			await navigator.clipboard.writeText(`https://organizeon.com.br/d2/files/${encodeURIComponent(e.name)}`), p("Link público copiado.");
		} catch {
			p("Não foi possível copiar o link.");
		}
	}
	return /* @__PURE__ */ (0, G.jsxs)(kv, {
		username: e,
		role: t,
		logout: i,
		refresh: () => void x(),
		refreshing: m,
		children: [
			/* @__PURE__ */ (0, G.jsxs)("div", { children: [/* @__PURE__ */ (0, G.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Meus arquivos"
			}), /* @__PURE__ */ (0, G.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Gerencie arquivos e textos da sua conta."
			})] }),
			/* @__PURE__ */ (0, G.jsxs)(Sm, { children: [/* @__PURE__ */ (0, G.jsxs)(Cm, { children: [/* @__PURE__ */ (0, G.jsx)(wm, { children: "Adicionar arquivo" }), /* @__PURE__ */ (0, G.jsx)(Tm, { children: "Selecione um arquivo ou crie um texto." })] }), /* @__PURE__ */ (0, G.jsxs)(Em, {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, G.jsx)("input", {
						ref: a,
						type: "file",
						className: "sr-only",
						"aria-label": "Selecionar arquivo",
						onChange: (e) => l(e.target.files?.[0] ?? null)
					}),
					/* @__PURE__ */ (0, G.jsxs)("div", {
						className: "flex min-w-0 flex-wrap items-center gap-3 rounded-lg border border-dashed p-4",
						children: [/* @__PURE__ */ (0, G.jsxs)($, {
							variant: "outline",
							onClick: () => a.current?.click(),
							disabled: u !== null,
							children: [/* @__PURE__ */ (0, G.jsx)(qe, {}), "Selecionar arquivo"]
						}), /* @__PURE__ */ (0, G.jsx)("span", {
							className: "w-full min-w-0 break-words text-sm text-muted-foreground sm:w-auto sm:flex-1",
							children: c?.name || "Nenhum arquivo selecionado"
						})]
					}),
					/* @__PURE__ */ (0, G.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, G.jsxs)($, {
							disabled: !c || u !== null,
							onClick: () => void S(),
							children: [/* @__PURE__ */ (0, G.jsx)(Ut, {}), "Enviar arquivo"]
						}), /* @__PURE__ */ (0, G.jsxs)($, {
							variant: "outline",
							onClick: () => v({
								name: "script.txt",
								content: ""
							}),
							children: [/* @__PURE__ */ (0, G.jsx)(ze, {}), "Novo texto"]
						})]
					}),
					u !== null && /* @__PURE__ */ (0, G.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, G.jsxs)("div", {
							className: "flex justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, G.jsx)("span", { children: "Enviando arquivo" }), /* @__PURE__ */ (0, G.jsxs)("span", { children: [Math.round(u), "%"] })]
						}), /* @__PURE__ */ (0, G.jsx)("div", {
							role: "progressbar",
							"aria-valuemin": 0,
							"aria-valuemax": 100,
							"aria-valuenow": u,
							"aria-label": "Progresso do upload",
							className: "h-1.5 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, G.jsx)("div", {
								className: "h-full bg-primary transition-[width] duration-150 motion-reduce:transition-none",
								style: { width: `${u}%` }
							})
						})]
					})
				]
			})] }),
			f && /* @__PURE__ */ (0, G.jsx)("p", {
				role: "status",
				className: "text-sm text-muted-foreground",
				children: f
			}),
			g && /* @__PURE__ */ (0, G.jsxs)(Sm, { children: [/* @__PURE__ */ (0, G.jsx)(Cm, { children: /* @__PURE__ */ (0, G.jsx)(wm, { children: g.id ? "Editar texto" : "Novo texto" }) }), /* @__PURE__ */ (0, G.jsx)(Em, { children: /* @__PURE__ */ (0, G.jsxs)("form", {
				className: "grid gap-3",
				onSubmit: (e) => void w(e),
				children: [
					/* @__PURE__ */ (0, G.jsx)(bh, {
						"aria-label": "Nome do arquivo",
						value: g.name,
						disabled: !!g.id,
						onChange: (e) => v({
							...g,
							name: e.target.value
						})
					}),
					/* @__PURE__ */ (0, G.jsx)("textarea", {
						"aria-label": "Conteúdo",
						className: "min-h-52 w-full rounded-lg border bg-background p-3 font-mono text-sm",
						value: g.content,
						onChange: (e) => v({
							...g,
							content: e.target.value
						})
					}),
					/* @__PURE__ */ (0, G.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, G.jsx)($, {
							type: "submit",
							children: "Salvar texto"
						}), /* @__PURE__ */ (0, G.jsx)($, {
							type: "button",
							variant: "outline",
							onClick: () => v(null),
							children: "Fechar"
						})]
					})
				]
			}) })] }),
			/* @__PURE__ */ (0, G.jsxs)(Sm, { children: [/* @__PURE__ */ (0, G.jsxs)(Cm, { children: [/* @__PURE__ */ (0, G.jsx)(wm, { children: "Arquivos" }), /* @__PURE__ */ (0, G.jsx)(Tm, { children: o.length ? `${o.length} arquivo(s)` : "Nenhum arquivo ainda." })] }), /* @__PURE__ */ (0, G.jsx)(Em, {
				className: "grid gap-3",
				children: o.map((e) => /* @__PURE__ */ (0, G.jsxs)("div", {
					className: "grid gap-3 border-t pt-3",
					children: [/* @__PURE__ */ (0, G.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, G.jsx)("p", {
							className: "break-all font-medium",
							children: e.name
						}), /* @__PURE__ */ (0, G.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								(e.size / 1024).toFixed(1),
								" KB · ",
								new Date(e.updatedAt).toLocaleString("pt-BR")
							]
						})]
					}), /* @__PURE__ */ (0, G.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							e.contentType?.startsWith("text/") && /* @__PURE__ */ (0, G.jsxs)($, {
								variant: "outline",
								size: "sm",
								onClick: () => void C(e),
								children: [/* @__PURE__ */ (0, G.jsx)(ht, {}), "Editar"]
							}),
							/* @__PURE__ */ (0, G.jsxs)($, {
								variant: "outline",
								size: "sm",
								onClick: () => void E(e),
								children: [/* @__PURE__ */ (0, G.jsx)(Fe, {}), "Copiar link"]
							}),
							/* @__PURE__ */ (0, G.jsxs)($, {
								variant: "destructive",
								size: "sm",
								onClick: () => b(e),
								children: [/* @__PURE__ */ (0, G.jsx)(zt, {}), "Apagar"]
							})
						]
					})]
				}, e.id))
			})] }),
			/* @__PURE__ */ (0, G.jsx)(Ym, {
				open: !!y,
				onOpenChange: (e) => {
					e || b(null);
				},
				children: /* @__PURE__ */ (0, G.jsxs)(Qm, { children: [/* @__PURE__ */ (0, G.jsxs)($m, { children: [/* @__PURE__ */ (0, G.jsx)(th, { children: "Apagar arquivo?" }), /* @__PURE__ */ (0, G.jsx)(nh, { children: y?.name })] }), /* @__PURE__ */ (0, G.jsxs)(eh, { children: [/* @__PURE__ */ (0, G.jsx)($, {
					variant: "outline",
					onClick: () => b(null),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, G.jsx)($, {
					variant: "destructive",
					onClick: () => {
						y && T(y);
					},
					children: "Apagar"
				})] })] })
			})
		]
	});
}
// src/client/bridge.tsx
var jv = /* @__PURE__ */ new WeakMap(), Mv = /* @__PURE__ */ new WeakMap(), Nv = /* @__PURE__ */ new WeakMap();
function Pv(e) {
	if (document.querySelector("link[data-organizeon-ui=\"client\"]")) return;
	let t = document.createElement("link");
	t.rel = "stylesheet", t.href = e, t.dataset.organizeonUi = "client", document.head.append(t);
}
function Fv(e, t, n) {
	Mv.get(e)?.unmount(), Pv(n);
	let r = (0, g.createRoot)(e);
	(0, v.flushSync)(() => r.render(/* @__PURE__ */ (0, G.jsx)("div", {
		className: "organizeon-ui dark min-h-full",
		children: /* @__PURE__ */ (0, G.jsx)(q_, { game: t })
	}))), Mv.set(e, r);
}
function Iv(e) {
	Mv.get(e)?.unmount(), Mv.delete(e);
}
function Lv(e, t, n) {
	Pv(n);
	let r = (0, g.createRoot)(e), i = (e) => (0, v.flushSync)(() => r.render(/* @__PURE__ */ (0, G.jsx)("div", {
		className: "organizeon-ui dark",
		children: /* @__PURE__ */ (0, G.jsx)(J_, { ...e })
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
function Rv(e, t, n) {
	Nv.get(e)?.unmount(), Pv(n);
	let r = (0, g.createRoot)(e);
	(0, v.flushSync)(() => r.render(/* @__PURE__ */ (0, G.jsx)("div", {
		className: "organizeon-ui organizeon-inline-ui dark",
		children: /* @__PURE__ */ (0, G.jsx)(Q_, { ...t })
	}))), Nv.set(e, r);
}
function zv(e) {
	Nv.get(e)?.unmount(), Nv.delete(e);
}
function Bv(e, t, n) {
	Pv(n);
	let r = (0, g.createRoot)(e);
	return (0, v.flushSync)(() => r.render(/* @__PURE__ */ (0, G.jsx)("div", {
		className: "organizeon-ui dark",
		children: /* @__PURE__ */ (0, G.jsx)(am, {
			container: e,
			children: t
		})
	}))), () => r.unmount();
}
function Vv(e, t, n, r) {
	return Bv(e, /* @__PURE__ */ (0, G.jsx)(X_, {
		game: t,
		onClose: n
	}), r);
}
function Hv(e, t, n) {
	return Bv(e, /* @__PURE__ */ (0, G.jsx)(Z_, { ...t }), n);
}
function Uv(e, t, n = "Confirmar ação", r = "Continuar") {
	return new Promise((i) => {
		let a = document.createElement("div");
		a.className = "organizeon-ui dark", document.body.append(a), Pv(t);
		let o = (0, g.createRoot)(a), s = !1, c = (e) => {
			s || (s = !0, o.unmount(), a.remove(), i(e));
		};
		(0, v.flushSync)(() => o.render(/* @__PURE__ */ (0, G.jsx)(am, {
			container: a,
			children: /* @__PURE__ */ (0, G.jsx)(Y_, {
				title: n,
				description: e,
				confirmLabel: r,
				onCancel: () => c(!1),
				onConfirm: () => c(!0)
			})
		})));
	});
}
function Wv(e, t, n) {
	jv.get(e)?.root.unmount();
	let r = e.shadowRoot ?? e.attachShadow({ mode: "open" });
	r.replaceChildren();
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = n, r.append(i);
	let a = document.createElement("div");
	a.className = t.type === "account" ? "organizeon-ui organizeon-overlay-root dark" : "organizeon-ui dark", r.append(a);
	let o = (0, g.createRoot)(a);
	return o.render(/* @__PURE__ */ (0, G.jsx)(am, {
		container: r,
		children: /* @__PURE__ */ (0, G.jsx)(U_, { children: /* @__PURE__ */ (0, G.jsx)(y_, { ...t }) })
	})), jv.set(e, {
		root: o,
		shadow: r,
		container: a
	}), () => {
		let t = jv.get(e);
		t && (t.root.unmount(), t.shadow.replaceChildren(), jv.delete(e));
	};
}
function Gv(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui organizeon-overlay-root dark", r.append(i, a);
	let o = (0, g.createRoot)(a);
	return (0, v.flushSync)(() => o.render(/* @__PURE__ */ (0, G.jsx)(am, {
		container: a,
		children: /* @__PURE__ */ (0, G.jsx)(y_, { ...t })
	}))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function Kv(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui dark", r.append(i, a);
	let o = (0, g.createRoot)(a);
	return (0, v.flushSync)(() => o.render(/* @__PURE__ */ (0, G.jsx)($_, { onSubmit: t }))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function qv(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui dark", r.append(i, a);
	let o = (0, g.createRoot)(a);
	return (0, v.flushSync)(() => o.render(/* @__PURE__ */ (0, G.jsx)(am, {
		container: a,
		children: /* @__PURE__ */ (0, G.jsx)(Av, { ...t })
	}))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function Jv(e, t) {
	jv.get(e)?.root.unmount();
	let n = e.shadowRoot ?? e.attachShadow({ mode: "open" });
	n.replaceChildren();
	let r = document.createElement("link");
	r.rel = "stylesheet", r.href = t, n.append(r);
	let i = document.createElement("div");
	i.className = "organizeon-ui organizeon-overlay-root dark", n.append(i);
	let a = (0, g.createRoot)(i);
	return a.render(/* @__PURE__ */ (0, G.jsx)(am, {
		container: n,
		children: /* @__PURE__ */ (0, G.jsx)(Zt, {
			position: "bottom-right",
			theme: "dark",
			closeButton: !0,
			richColors: !1
		})
	})), jv.set(e, {
		root: a,
		shadow: n,
		container: i
	}), () => {
		a.unmount(), n.replaceChildren(), jv.delete(e);
	};
}
function Yv(e, t = "info", n) {
	F[t](e, n ? { id: n } : void 0);
}
function Xv(e) {
	F.dismiss(e);
}
export { Uv as confirmClientAction, Xv as dismissClientToast, Lv as mountCatalogToolbar, Bv as mountClientDialog, Wv as mountClientSurface, Jv as mountClientToaster, qv as mountD2Dashboard, Kv as mountD2Login, Fv as mountGameCard, Hv as mountGameControlSettingsDialog, Vv as mountGameCreditsDialog, Gv as mountNavigation, Rv as mountPreferenceCard, Yv as showClientToast, Iv as unmountGameCard, zv as unmountPreferenceCard };
