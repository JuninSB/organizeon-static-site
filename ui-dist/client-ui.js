// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), c = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, l = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, u = (n, r, o) => (o = n == null ? {} : e(i(n)), l(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n));
// src/lib/style-ready.ts
function d(e, t) {
	let n = !0, r = () => {
		n && t();
	};
	return e.sheet ? r() : e.addEventListener("load", r, { once: !0 }), () => {
		n = !1, e.removeEventListener("load", r);
	};
}
// node_modules/react/cjs/react.production.js
var f = /* @__PURE__ */ s(((e) => {
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
	function ee(e) {
		var t = T.T;
		if (t !== null) {
			var n = t.types;
			n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
		} else R(ee.bind(null, e));
	}
	var z = {
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
	e.Activity = f, e.Children = z, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = x, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = T, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return T.H.useMemoCache(e);
		}
	}, e.addTransitionType = ee, e.cache = function(e) {
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
})), p = /* @__PURE__ */ s(((e, t) => {
	t.exports = f();
})), m, h = o((() => {
	m = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}));
// node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function g(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: m(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
var _ = o((() => {
	h();
})), v, y = o((() => {
	v = (e) => {
		let t = "", n = !1;
		for (let r of e) r === "-" || r === "_" || r <= " " ? n = t.length > 0 : (t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1);
		return t;
	};
})), b, x = o((() => {
	y(), b = (e) => {
		let t = v(e);
		return t.charAt(0).toUpperCase() + t.slice(1);
	};
})), S, C = o((() => {
	S = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim();
})), w, T = o((() => {
	w = {
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
}));
// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
function E(e) {
	return e != null;
}
function D(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? w.width, a = e.size ?? e.height ?? w.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? S(...c) : S("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? w["stroke-width"]) * Number(e.size ?? e.width ?? w.width) / Number(t.size ?? t.width ?? w.width) : t.strokeWidth ?? w["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(w).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && E(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && E(t.width) && { [r("width")]: t.width },
			..."height" in t && E(t.height) && { [r("height")]: t.height },
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
var O = o((() => {
	T(), C();
}));
// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
function k(e, t = {}) {
	return D(e, {
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
var A = o((() => {
	O();
})), j, M = o((() => {
	j = (e) => {
		for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
		return !1;
	};
})), N, P, F, I = o((() => {
	N = /* @__PURE__ */ u(p(), 1), P = (0, N.createContext)({}), F = () => (0, N.useContext)(P);
})), L, R, ee = o((() => {
	L = /* @__PURE__ */ u(p(), 1), C(), A(), M(), I(), R = (0, L.forwardRef)(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
		node: l,
		aliases: [],
		size: 24
	}, ...d }, f) => {
		let { size: p = 24, strokeWidth: m = 2, absoluteStrokeWidth: h = !1, nonScalingStroke: g = !1, color: _ = "currentColor", className: v = "" } = F() ?? {}, y = !!c || j(d), [b, x, C = []] = k(u, {
			color: e ?? _,
			width: n ?? t ?? p,
			height: r ?? t ?? p,
			strokeWidth: i ?? m,
			absoluteStrokeWidth: a ?? h,
			nonScalingStroke: o ?? g,
			className: S(v, s),
			hasA11yProp: y,
			attributes: d
		});
		return (0, L.createElement)(b, {
			ref: f,
			...x
		}, [...C.map(([e, t]) => (0, L.createElement)(e, t)), ...Array.isArray(c) ? c : [c]]);
	});
}));
// node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function z(e, t = [], n = []) {
	let r = typeof e == "string" ? g(e, t, n) : e, i = (0, te.forwardRef)(({ className: e, ...t }, n) => (0, te.createElement)(R, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = b(r.name)), i;
}
var te, B = o((() => {
	te = /* @__PURE__ */ u(p(), 1), _(), x(), ee();
})), ne, re, V = o((() => {
	B(), ne = {
		name: "arrow-left",
		size: 24,
		node: [["path", {
			d: "m12 19-7-7 7-7",
			key: "1l729n"
		}], ["path", {
			d: "M19 12H5",
			key: "x3x0zl"
		}]]
	}, ne.node, re = z(ne);
})), H, ie, ae = o((() => {
	B(), H = {
		name: "check",
		size: 24,
		node: [["path", {
			d: "M20 6 9 17l-5-5",
			key: "1gmf2c"
		}]]
	}, H.node, ie = z(H);
})), U, oe, se = o((() => {
	B(), U = {
		name: "chevron-down",
		size: 24,
		node: [["path", {
			d: "m6 9 6 6 6-6",
			key: "qrunsl"
		}]]
	}, U.node, oe = z(U);
})), ce, le, ue = o((() => {
	B(), ce = {
		name: "chevron-up",
		size: 24,
		node: [["path", {
			d: "m18 15-6-6-6 6",
			key: "153udz"
		}]]
	}, ce.node, le = z(ce);
})), de, fe, pe = o((() => {
	B(), de = {
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
	}, de.node, fe = z(de);
})), me, he, ge = o((() => {
	B(), me = {
		name: "cloud",
		size: 24,
		node: [["path", {
			d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
			key: "p7xjir"
		}]]
	}, me.node, he = z(me);
})), _e, ve, ye = o((() => {
	B(), _e = {
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
	}, _e.node, ve = z(_e);
})), be, xe, Se = o((() => {
	B(), be = {
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
	}, be.node, xe = z(be);
})), Ce, we, Te = o((() => {
	B(), Ce = {
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
	}, Ce.node, we = z(Ce);
})), Ee, De, Oe = o((() => {
	B(), Ee = {
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
	}, Ee.node, De = z(Ee);
})), ke, Ae, je = o((() => {
	B(), ke = {
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
	}, ke.node, Ae = z(ke);
})), Me, Ne, Pe = o((() => {
	B(), Me = {
		name: "flame",
		size: 24,
		node: [["path", {
			d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
			key: "1slcih"
		}]]
	}, Me.node, Ne = z(Me);
})), Fe, Ie, Le = o((() => {
	B(), Fe = {
		name: "folder-open",
		size: 24,
		node: [["path", {
			d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
			key: "usdka0"
		}]]
	}, Fe.node, Ie = z(Fe);
})), Re, ze, Be = o((() => {
	B(), Re = {
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
	}, Re.node, ze = z(Re);
})), Ve, He, Ue = o((() => {
	B(), Ve = {
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
	}, Ve.node, He = z(Ve);
})), We, Ge, Ke = o((() => {
	B(), We = {
		name: "image-plus",
		size: 24,
		node: [
			["path", {
				d: "M16 5h6",
				key: "1vod17"
			}],
			["path", {
				d: "M19 2v6",
				key: "4bpg5p"
			}],
			["path", {
				d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",
				key: "1ue2ih"
			}],
			["path", {
				d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
				key: "1xmnt7"
			}],
			["circle", {
				cx: "9",
				cy: "9",
				r: "2",
				key: "af1f0g"
			}]
		]
	}, We.node, Ge = z(We);
})), qe, Je, Ye = o((() => {
	B(), qe = {
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
	}, qe.node, Je = z(qe);
})), Xe, Ze, Qe = o((() => {
	B(), Xe = {
		name: "key-round",
		size: 24,
		node: [["path", {
			d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
			key: "1s6t7t"
		}], ["circle", {
			cx: "16.5",
			cy: "7.5",
			r: ".5",
			fill: "currentColor",
			key: "w0ekpg"
		}]]
	}, Xe.node, Ze = z(Xe);
})), $e, et, tt = o((() => {
	B(), $e = {
		name: "loader-circle",
		size: 24,
		node: [["path", {
			d: "M21 12a9 9 0 1 1-6.219-8.56",
			key: "13zald"
		}]],
		aliases: ["loader-2"]
	}, $e.node, et = z($e);
})), nt, rt, it = o((() => {
	B(), nt = {
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
	}, nt.node, rt = z(nt);
})), at, ot, st = o((() => {
	B(), at = {
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
	}, at.node, ot = z(at);
})), ct, lt, ut = o((() => {
	B(), ct = {
		name: "moon",
		size: 24,
		node: [["path", {
			d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
			key: "kfwtm"
		}]]
	}, ct.node, lt = z(ct);
})), dt, ft, pt = o((() => {
	B(), dt = {
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
	}, dt.node, ft = z(dt);
})), mt, ht, gt = o((() => {
	B(), mt = {
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
	}, mt.node, ht = z(mt);
})), _t, vt, yt = o((() => {
	B(), _t = {
		name: "pencil",
		size: 24,
		node: [["path", {
			d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
			key: "1a8usu"
		}], ["path", {
			d: "m15 5 4 4",
			key: "1mk7zo"
		}]]
	}, _t.node, vt = z(_t);
})), bt, xt, St = o((() => {
	B(), bt = {
		name: "play",
		size: 24,
		node: [["path", {
			d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
			key: "10ikf1"
		}]]
	}, bt.node, xt = z(bt);
})), Ct, wt, Tt = o((() => {
	B(), Ct = {
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
	}, Ct.node, wt = z(Ct);
})), Et, Dt, Ot = o((() => {
	B(), Et = {
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
	}, Et.node, Dt = z(Et);
})), kt, At, jt = o((() => {
	B(), kt = {
		name: "rotate-ccw",
		size: 24,
		node: [["path", {
			d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
			key: "1357e3"
		}], ["path", {
			d: "M3 3v5h5",
			key: "1xhq8a"
		}]]
	}, kt.node, At = z(kt);
})), Mt, Nt, Pt = o((() => {
	B(), Mt = {
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
	}, Mt.node, Nt = z(Mt);
})), Ft, It, Lt = o((() => {
	B(), Ft = {
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
	}, Ft.node, It = z(Ft);
})), Rt, zt, Bt = o((() => {
	B(), Rt = {
		name: "shield-check",
		size: 24,
		node: [["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}], ["path", {
			d: "m9 12 2 2 4-4",
			key: "dzmm74"
		}]]
	}, Rt.node, zt = z(Rt);
})), Vt, Ht, Ut = o((() => {
	B(), Vt = {
		name: "shield",
		size: 24,
		node: [["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}]]
	}, Vt.node, Ht = z(Vt);
})), Wt, Gt, Kt = o((() => {
	B(), Wt = {
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
	}, Wt.node, Gt = z(Wt);
})), qt, Jt, Yt = o((() => {
	B(), qt = {
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
	}, qt.node, Jt = z(qt);
})), Xt, Zt, Qt = o((() => {
	B(), Xt = {
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
	}, Xt.node, Zt = z(Xt);
})), $t, en, tn = o((() => {
	B(), $t = {
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
	}, $t.node, en = z($t);
})), nn, rn, an = o((() => {
	B(), nn = {
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
	}, nn.node, rn = z(nn);
})), on, sn, cn = o((() => {
	B(), on = {
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
	}, on.node, sn = z(on);
})), ln, un, dn = o((() => {
	B(), ln = {
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
	}, ln.node, un = z(ln);
})), fn, pn, mn = o((() => {
	B(), fn = {
		name: "x",
		size: 24,
		node: [["path", {
			d: "M18 6 6 18",
			key: "1bl5f8"
		}], ["path", {
			d: "m6 6 12 12",
			key: "d8bk6v"
		}]]
	}, fn.node, pn = z(fn);
})), hn, gn, _n = o((() => {
	B(), hn = {
		name: "zap",
		size: 24,
		node: [["path", {
			d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
			key: "1v7up4"
		}]]
	}, hn.node, gn = z(hn);
})), vn = o((() => {
	B(), V(), ae(), se(), ue(), pe(), ge(), ye(), Se(), Te(), Oe(), je(), Pe(), Le(), Be(), Ue(), Ke(), Ye(), Qe(), tt(), it(), st(), ut(), pt(), gt(), yt(), St(), Tt(), Ot(), jt(), Pt(), Lt(), Bt(), Ut(), Kt(), Yt(), Qt(), tn(), an(), cn(), dn(), mn(), _n(), I(), ee();
}));
// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function yn() {
	return typeof window < "u";
}
function bn(e) {
	return Cn(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function xn(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Sn(e) {
	return ((Cn(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Cn(e) {
	return yn() ? e instanceof Node || e instanceof xn(e).Node : !1;
}
function wn(e) {
	return yn() ? e instanceof Element || e instanceof xn(e).Element : !1;
}
function Tn(e) {
	return yn() ? e instanceof HTMLElement || e instanceof xn(e).HTMLElement : !1;
}
function En(e) {
	return !yn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof xn(e).ShadowRoot;
}
function Dn(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Pn(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function On(e) {
	return /^(table|td|th)$/.test(bn(e));
}
function kn(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
function An(e) {
	let t = wn(e) ? Pn(e) : e;
	return Hn(t.transform) || Hn(t.translate) || Hn(t.scale) || Hn(t.rotate) || Hn(t.perspective) || !Mn() && (Hn(t.backdropFilter) || Hn(t.filter)) || Bn.test(t.willChange || "") || Vn.test(t.contain || "");
}
function jn(e) {
	let t = In(e);
	for (; Tn(t) && !Nn(t);) {
		if (An(t)) return t;
		if (kn(t)) return null;
		t = In(t);
	}
	return null;
}
function Mn() {
	return Un ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Un;
}
function Nn(e) {
	return /^(html|body|#document)$/.test(bn(e));
}
function Pn(e) {
	return xn(e).getComputedStyle(e);
}
function Fn(e) {
	return wn(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function In(e) {
	if (bn(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || En(e) && e.host || Sn(e);
	return En(t) ? t.host : t;
}
function Ln(e) {
	let t = In(e);
	return Nn(t) ? (e.ownerDocument || e).body : Tn(t) && Dn(t) ? t : Ln(t);
}
function Rn(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Ln(e), i = r === e.ownerDocument?.body, a = xn(r);
	if (i) {
		let e = zn(a);
		return t.concat(a, a.visualViewport || [], Dn(r) ? r : [], e && n ? Rn(e) : []);
	}
	return t.concat(r, Rn(r, [], n));
}
function zn(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
var Bn, Vn, Hn, Un, Wn = o((() => {
	Bn = /transform|translate|scale|rotate|perspective|filter/, Vn = /paint|layout|strict|content/, Hn = (e) => !!e && e !== "none";
})), Gn, Kn, qn = o((() => {
	Gn = /* @__PURE__ */ u(p(), 1), Kn = { ...Gn };
}));
// node_modules/@base-ui/utils/useRefWithInit.mjs
function Jn(e, t) {
	let n = Yn.useRef(Xn);
	return n.current === Xn && (n.current = e(t)), n;
}
var Yn, Xn, Zn = o((() => {
	Yn = /* @__PURE__ */ u(p(), 1), Xn = {};
}));
// node_modules/@base-ui/utils/useStableCallback.mjs
function W(e) {
	let t = Jn(Qn).current;
	return t.next = e, tr(t.effect), t.trampoline;
}
function Qn() {
	let e = {
		next: void 0,
		callback: $n,
		trampoline: (...t) => e.callback?.(...t),
		effect: () => {
			e.callback = e.next;
		}
	};
	return e;
}
function $n() {}
var er, tr, nr = o((() => {
	qn(), Zn(), er = Kn.useInsertionEffect, tr = er && er !== Kn.useLayoutEffect ? er : (e) => e();
})), rr, ir, G, ar = o((() => {
	rr = /* @__PURE__ */ u(p(), 1), ir = () => {}, G = typeof document < "u" ? rr.useLayoutEffect : ir;
}));
// node_modules/@base-ui/utils/mergeObjects.mjs
function or(e, t) {
	if (e && !t) return e;
	if (!e && t) return t;
	if (e || t) return {
		...e,
		...t
	};
}
var sr = o((() => {}));
// node_modules/@base-ui/react/merge-props/mergeProps.mjs
function cr(e, t, n, r, i) {
	if (!n && !r && !i && !e) return ur(t);
	let a = ur(e);
	return t && (a = dr(a, t)), n && (a = dr(a, n)), r && (a = dr(a, r)), i && (a = dr(a, i)), a;
}
function lr(e) {
	if (e.length === 0) return xr;
	if (e.length === 1) return ur(e[0]);
	let t = ur(e[0]);
	for (let n = 1; n < e.length; n += 1) t = dr(t, e[n]);
	return t;
}
function ur(e) {
	return hr(e) ? { ...e(xr) } : fr(e);
}
function dr(e, t) {
	return hr(t) ? t(e) : pr(e, t);
}
function fr(e) {
	let t = { ...e };
	for (let e in t) {
		let n = t[e];
		mr(e, n) && (t[e] = _r(n));
	}
	return t;
}
function pr(e, t) {
	if (!t) return e;
	for (let n in t) {
		let r = t[n];
		switch (n) {
			case "style":
				e[n] = or(e.style, r);
				break;
			case "className":
				e[n] = yr(e.className, r);
				break;
			default: e[n] = mr(n, r) ? gr(e[n], r) : r;
		}
	}
	return e;
}
function mr(e, t) {
	let n = e.charCodeAt(0), r = e.charCodeAt(1), i = e.charCodeAt(2);
	return n === 111 && r === 110 && i >= 65 && i <= 90 && (typeof t == "function" || t === void 0);
}
function hr(e) {
	return typeof e == "function";
}
function gr(e, t) {
	return t ? e ? (...n) => {
		let r = n[0];
		if (br(r)) {
			let i = r;
			vr(i);
			let a = t(...n);
			return i.baseUIHandlerPrevented || e?.(...n), a;
		}
		let i = t(...n);
		return e?.(...n), i;
	} : _r(t) : e;
}
function _r(e) {
	return e && ((...t) => {
		let n = t[0];
		return br(n) && vr(n), e(...t);
	});
}
function vr(e) {
	return e.preventBaseUIHandler = () => {
		e.baseUIHandlerPrevented = !0;
	}, e;
}
function yr(e, t) {
	return t ? e ? t + " " + e : t : e;
}
function br(e) {
	return typeof e == "object" && !!e && "nativeEvent" in e;
}
var xr, Sr = o((() => {
	sr(), xr = {};
})), Cr = o((() => {
	Sr();
}));
// node_modules/@base-ui/utils/formatErrorMessage.mjs
function wr(e, t) {
	return function(n, ...r) {
		let i = new URL(e);
		return i.searchParams.set("code", n.toString()), r.forEach((e) => i.searchParams.append("args[]", e)), `${t} error #${n}; visit ${i} for the full message.`;
	};
}
var Tr, Er = o((() => {
	Tr = wr("https://base-ui.com/production-error", "Base UI");
}));
// node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs
function Dr(e = !1) {
	let t = Or.useContext(kr);
	if (t === void 0 && !e) throw Error(Tr(16));
	return t;
}
var Or, kr, Ar = o((() => {
	Er(), Or = /* @__PURE__ */ u(p(), 1), kr = /*#__PURE__*/ Or.createContext(void 0);
}));
// node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function jr(e) {
	let { focusableWhenDisabled: t, disabled: n, composite: r = !1, tabIndex: i = 0, isNativeButton: a } = e, o = r && t !== !1, s = r && t === !1;
	return { props: Mr.useMemo(() => {
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
var Mr, Nr = o((() => {
	Mr = /* @__PURE__ */ u(p(), 1);
}));
// node_modules/@base-ui/utils/owner.mjs
function Pr(e) {
	return e?.ownerDocument || document;
}
var Fr = o((() => {
	Wn();
}));
// node_modules/@base-ui/react/utils/dispatchClickWithModifiers.mjs
function Ir(e, t, { detail: n = 0, pointerType: r = "" } = {}) {
	e.dispatchEvent(new (xn(e)).PointerEvent("click", {
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
var Lr = o((() => {
	Fr();
}));
// node_modules/@base-ui/react/internals/use-button/useButton.mjs
function Rr(e = {}) {
	let { disabled: t = !1, focusableWhenDisabled: n, tabIndex: r = 0, native: i = !0, composite: a } = e, o = Vr.useRef(null), s = Dr(!0), c = a ?? s !== void 0, { props: l } = jr({
		focusableWhenDisabled: n,
		disabled: t,
		composite: c,
		tabIndex: r,
		isNativeButton: i
	}), u = Vr.useCallback(() => {
		let e = o.current;
		zr(e) && c && t && l.disabled === void 0 && e.disabled && (e.disabled = !1);
	}, [
		t,
		l.disabled,
		c
	]);
	return G(u, [u]), {
		getButtonProps: Vr.useCallback((e = {}) => {
			let { onClick: n, onMouseDown: r, onKeyUp: a, onKeyDown: o, onPointerDown: s, ...u } = e;
			return cr({
				onClick(e) {
					t ? e.preventDefault() : n?.(e);
				},
				onMouseDown(e) {
					t || r?.(e);
				},
				onKeyDown(e) {
					if (t || (vr(e), o?.(e), e.baseUIHandlerPrevented)) return;
					let n = e.target === e.currentTarget, r = e.currentTarget, a = zr(r), s = !i && Br(r), l = n && (i ? a : !s), u = e.key === "Enter", d = e.key === " ", f = r.getAttribute("role"), p = f?.startsWith("menuitem") || f === "option" || f === "gridcell";
					if (n && c && d) {
						if (e.defaultPrevented && p) return;
						e.preventDefault(), (!i || a) && (e.preventBaseUIHandler(), Ir(r, e));
					} else !l || i || !d && !u ? n && s && d && e.preventDefault() : e.defaultPrevented || (e.preventDefault(), u && (e.preventBaseUIHandler(), Ir(r, e)));
				},
				onKeyUp(e) {
					t || (vr(e), a?.(e), e.target === e.currentTarget && i && c && zr(e.currentTarget) && e.key === " " ? e.preventDefault() : e.baseUIHandlerPrevented || e.target !== e.currentTarget || i || c || e.defaultPrevented || e.key !== " " || (e.preventBaseUIHandler(), Ir(e.currentTarget, e)));
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
		buttonRef: W((e) => {
			o.current = e, u();
		})
	};
}
function zr(e) {
	return Tn(e) && e.tagName === "BUTTON";
}
function Br(e) {
	return Tn(e) && e.tagName === "A" && !!e.href;
}
var Vr, Hr = o((() => {
	Vr = /* @__PURE__ */ u(p(), 1), Wn(), nr(), ar(), Cr(), Ar(), Nr(), Lr();
}));
// node_modules/@base-ui/utils/useMergedRefs.mjs
function Ur(e, t, n, r) {
	let i = Jn(Gr).current;
	return Kr(i, e, t, n, r) && Jr(i, [
		e,
		t,
		n,
		r
	]), i.callback;
}
function Wr(e) {
	let t = Jn(Gr).current;
	return qr(t, e) && Jr(t, e), t.callback;
}
function Gr() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function Kr(e, t, n, r, i) {
	return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== i;
}
function qr(e, t) {
	return e.refs.length !== t.length || e.refs.some((e, n) => e !== t[n]);
}
function Jr(e, t) {
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
var Yr = o((() => {
	Zn();
}));
// node_modules/@base-ui/utils/reactVersion.mjs
function Xr(e) {
	return Zr >= e;
}
var Zr, Qr = o((() => {
	p(), Zr = 19;
}));
// node_modules/@base-ui/utils/getReactElementRef.mjs
function $r(e) {
	if (!/*#__PURE__*/ ei.isValidElement(e)) return null;
	let t = e, n = t.props;
	return (Xr(19) ? n?.ref : t.ref) ?? null;
}
var ei, ti = o((() => {
	ei = /* @__PURE__ */ u(p(), 1), Qr();
}));
// node_modules/@base-ui/utils/empty.mjs
function ni() {}
var ri, ii, ai = o((() => {
	ri = Object.freeze([]), ii = Object.freeze({});
}));
// node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function oi(e, t) {
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
var si = o((() => {}));
// node_modules/@base-ui/react/utils/resolveClassName.mjs
function ci(e, t) {
	return typeof e == "function" ? e(t) : e;
}
var li = o((() => {}));
// node_modules/@base-ui/react/utils/resolveStyle.mjs
function ui(e, t) {
	return typeof e == "function" ? e(t) : e;
}
var di = o((() => {}));
// node_modules/@base-ui/react/internals/useRenderElement.mjs
function fi(e, t, n = {}) {
	let r = t.render;
	n.enabled !== !1 && (r = hi(r));
	let i = pi(t, n, r);
	if (n.enabled === !1) return null;
	let a = n.state ?? ii;
	return gi(e, r, i, a);
}
function pi(e, t, n) {
	let { className: r, style: i } = e, { state: a = ii, ref: o, props: s, stateAttributesMapping: c, enabled: l = !0 } = t, u = l ? ci(r, a) : void 0, d = l ? ui(i, a) : void 0, f = l ? oi(a, c) : ii, p = l && s ? mi(s) : void 0, m = l ? or(f, p) ?? {} : ii;
	return typeof document < "u" && (l ? m.ref = Array.isArray(o) ? Wr([
		m.ref,
		$r(n),
		...o
	]) : Ur(m.ref, $r(n), o) : Ur(null, null)), l ? (u !== void 0 && (m.className = yr(m.className, u)), d !== void 0 && (m.style = or(m.style, d)), m) : ii;
}
function mi(e) {
	return Array.isArray(e) ? lr(e) : cr(void 0, e);
}
function hi(e) {
	if (e?.$$typeof !== bi) return e;
	let t = vi.Children.toArray(e)[0];
	return /*#__PURE__*/ vi.isValidElement(t) ? t : e;
}
function gi(e, t, n, r) {
	if (t) {
		if (typeof t == "function") return t(n, r);
		let e = cr(n, t.props);
		return e.ref = n.ref, /*#__PURE__*/ vi.cloneElement(t, e);
	}
	return _i(e, n);
}
function _i(e, t) {
	return e === "button" ? /*#__PURE__*/ (0, yi.createElement)("button", {
		type: "button",
		...t,
		key: t.key
	}) : e === "img" ? /*#__PURE__*/ (0, yi.createElement)("img", {
		alt: "",
		...t,
		key: t.key
	}) : /*#__PURE__*/ vi.createElement(e, t);
}
var vi, yi, bi, xi = o((() => {
	vi = /* @__PURE__ */ u(p(), 1), Yr(), ti(), sr(), ai(), si(), li(), di(), Cr(), yi = /* @__PURE__ */ u(p(), 1), bi = Symbol.for("react.lazy");
})), Si, Ci, wi = o((() => {
	Si = /* @__PURE__ */ u(p(), 1), Hr(), xi(), Ci = /*#__PURE__*/ Si.forwardRef(function(e, t) {
		let { render: n, className: r, disabled: i = !1, focusableWhenDisabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { getButtonProps: l, buttonRef: u } = Rr({
			disabled: i,
			focusableWhenDisabled: a,
			native: o
		});
		return fi("button", e, {
			state: { disabled: i },
			ref: [t, u],
			props: [c, l]
		});
	});
})), Ti = o((() => {
	wi();
}));
// node_modules/clsx/dist/clsx.mjs
function Ei(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Ei(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Di() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Ei(e)) && (r && (r += " "), r += t);
	return r;
}
var Oi = o((() => {})), ki, Ai, ji, Mi = o((() => {
	Oi(), ki = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ai = Di, ji = (e, t) => (n) => {
		if (t?.variants == null) return Ai(e, n?.class, n?.className);
		let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
			let t = n?.[e], a = i?.[e];
			if (t === null) return null;
			let o = ki(t) || ki(a);
			return r[e][o];
		}), o = n && Object.entries(n).reduce((e, t) => {
			let [n, r] = t;
			return r === void 0 || (e[n] = r), e;
		}, {}), s = t?.compoundVariants?.reduce((e, t) => {
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
		}, []);
		return Ai(e, a, s, n?.class, n?.className);
	};
})), Ni, Pi, Fi, Ii, Li, Ri, zi, Bi, Vi, Hi, Ui, Wi, Gi, Ki, qi, Ji, Yi, Xi, Zi, Qi, $i, ea, ta, na, ra, ia, aa, oa, sa, ca, la, ua, da, fa, pa, ma, ha, ga, _a, va, ya, ba, xa, Sa, Ca, wa, Ta, Ea, Da, Oa, ka, Aa, ja, Ma, Na, K, Pa, Fa, Ia, La, Ra, za, Ba, q, Va, Ha, Ua, Wa, Ga, Ka, qa, Ja, Ya, Xa, Za, Qa, $a, eo, to, no, ro, io, ao, oo = o((() => {
	Ni = (e, t) => {
		let n = Array(e.length + t.length);
		for (let t = 0; t < e.length; t++) n[t] = e[t];
		for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
		return n;
	}, Pi = (e, t) => ({
		classGroupId: e,
		validator: t
	}), Fi = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
		nextPart: e,
		validators: t,
		classGroupId: n
	}), Ii = "-", Li = [], Ri = "arbitrary..", zi = (e) => {
		let t = Hi(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
		return {
			getClassGroupId: (e) => {
				if (e.startsWith("[") && e.endsWith("]")) return Vi(e);
				let n = e.split(Ii), r = +(n[0] === "" && n.length > 1);
				return Bi(n, r, t);
			},
			getConflictingClassGroupIds: (e, t) => {
				if (t) {
					let t = r[e], i = n[e];
					return t ? i ? Ni(i, t) : t : i || Li;
				}
				return n[e] || Li;
			}
		};
	}, Bi = (e, t, n) => {
		if (e.length - t === 0) return n.classGroupId;
		let r = e[t], i = n.nextPart.get(r);
		if (i) {
			let n = Bi(e, t + 1, i);
			if (n) return n;
		}
		let a = n.validators;
		if (a === null) return;
		let o = t === 0 ? e.join(Ii) : e.slice(t).join(Ii), s = a.length;
		for (let e = 0; e < s; e++) {
			let t = a[e];
			if (t.validator(o)) return t.classGroupId;
		}
	}, Vi = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
		let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
		return r ? Ri + r : void 0;
	})(), Hi = (e) => {
		let { theme: t, classGroups: n } = e;
		return Ui(n, t);
	}, Ui = (e, t) => {
		let n = Fi();
		for (let r in e) {
			let i = e[r];
			Wi(i, n, r, t);
		}
		return n;
	}, Wi = (e, t, n, r) => {
		let i = e.length;
		for (let a = 0; a < i; a++) {
			let i = e[a];
			Gi(i, t, n, r);
		}
	}, Gi = (e, t, n, r) => {
		typeof e == "string" ? Ki(e, t, n) : typeof e == "function" ? qi(e, t, n, r) : Ji(e, t, n, r);
	}, Ki = (e, t, n) => {
		let r = e === "" ? t : Yi(t, e);
		r.classGroupId = n;
	}, qi = (e, t, n, r) => {
		Xi(e) ? Wi(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(Pi(n, e)));
	}, Ji = (e, t, n, r) => {
		let i = Object.entries(e), a = i.length;
		for (let e = 0; e < a; e++) {
			let [a, o] = i[e];
			Wi(o, Yi(t, a), n, r);
		}
	}, Yi = (e, t) => {
		let n = e, r = t.split(Ii), i = r.length;
		for (let e = 0; e < i; e++) {
			let t = r[e], i = n.nextPart.get(t);
			i || (i = Fi(), n.nextPart.set(t, i)), n = i;
		}
		return n;
	}, Xi = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Zi = (e) => {
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
	}, Qi = "!", $i = ":", ea = [], ta = (e, t, n, r, i) => ({
		modifiers: e,
		hasImportantModifier: t,
		baseClassName: n,
		maybePostfixModifierPosition: r,
		isExternal: i
	}), na = (e) => {
		let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
			let t = [], n = 0, r = 0, i = 0, a, o = e.length;
			for (let s = 0; s < o; s++) {
				let o = e[s];
				if (n === 0 && r === 0) {
					if (o === $i) {
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
			s.endsWith(Qi) ? (c = s.slice(0, -1), l = !0) : s.startsWith(Qi) && (c = s.slice(1), l = !0);
			let u = a && a > i ? a - i : void 0;
			return ta(t, l, c, u);
		};
		if (t) {
			let e = t + $i, n = r;
			r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : ta(ea, !1, t, void 0, !0);
		}
		if (n) {
			let e = r;
			r = (t) => n({
				className: t,
				parseClassName: e
			});
		}
		return r;
	}, ra = (e) => {
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
	}, ia = (e) => ({
		cache: Zi(e.cacheSize),
		parseClassName: na(e),
		sortModifiers: ra(e),
		postfixLookupClassGroupIds: aa(e),
		...zi(e)
	}), aa = (e) => {
		let t = Object.create(null), n = e.postfixLookupClassGroups;
		if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
		return t;
	}, oa = /\s+/, sa = (e, t) => {
		let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(oa), l = "";
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
			let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + Qi : _, y = v + g;
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
	}, ca = (...e) => {
		let t = 0, n, r, i = "";
		for (; t < e.length;) (n = e[t++]) && (r = la(n)) && (i && (i += " "), i += r);
		return i;
	}, la = (e) => {
		if (typeof e == "string") return e;
		let t, n = "";
		for (let r = 0; r < e.length; r++) e[r] && (t = la(e[r])) && (n && (n += " "), n += t);
		return n;
	}, ua = (e, ...t) => {
		let n, r, i, a, o = (o) => {
			let c = t.reduce((e, t) => t(e), e());
			return n = ia(c), r = n.cache.get, i = n.cache.set, a = s, s(o);
		}, s = (e) => {
			let t = r(e);
			if (t) return t;
			let a = sa(e, n);
			return i(e, a), a;
		};
		return a = o, (...e) => a(ca(...e));
	}, da = [], fa = (e) => {
		let t = (t) => t[e] || da;
		return t.isThemeGetter = !0, t.themeKey = e, t;
	}, pa = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ma = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ha = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, ga = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, _a = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, va = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, ya = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ba = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, xa = (e) => ha.test(e), Sa = (e) => !!e && !Number.isNaN(Number(e)), Ca = (e) => !!e && Number.isInteger(Number(e)), wa = (e) => e.endsWith("%") && Sa(e.slice(0, -1)), Ta = (e) => ga.test(e), Ea = () => !0, Da = (e) => _a.test(e) && !va.test(e), Oa = () => !1, ka = (e) => ya.test(e), Aa = (e) => ba.test(e), ja = (e) => !K(e) && !q(e), Ma = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Na = (e) => Ja(e, Qa, Oa), K = (e) => pa.test(e), Pa = (e) => Ja(e, $a, Da), Fa = (e) => Ja(e, eo, Sa), Ia = (e) => Ja(e, no, Ea), La = (e) => Ja(e, to, Oa), Ra = (e) => Ja(e, Xa, Oa), za = (e) => Ja(e, Za, Aa), Ba = (e) => Ja(e, ro, ka), q = (e) => ma.test(e), Va = (e) => Ya(e, $a), Ha = (e) => Ya(e, to), Ua = (e) => Ya(e, Xa), Wa = (e) => Ya(e, Qa), Ga = (e) => Ya(e, Za), Ka = (e) => Ya(e, ro, !0), qa = (e) => Ya(e, no, !0), Ja = (e, t, n) => {
		let r = pa.exec(e);
		return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
	}, Ya = (e, t, n = !1) => {
		let r = ma.exec(e);
		return r ? r[1] ? t(r[1]) : n : !1;
	}, Xa = (e) => e === "position" || e === "percentage", Za = (e) => e === "image" || e === "url", Qa = (e) => e === "length" || e === "size" || e === "bg-size", $a = (e) => e === "length", eo = (e) => e === "number", to = (e) => e === "family-name", no = (e) => e === "number" || e === "weight", ro = (e) => e === "shadow", io = () => {
		let e = fa("color"), t = fa("font"), n = fa("text"), r = fa("font-weight"), i = fa("tracking"), a = fa("leading"), o = fa("breakpoint"), s = fa("container"), c = fa("spacing"), l = fa("radius"), u = fa("shadow"), d = fa("inset-shadow"), f = fa("text-shadow"), p = fa("drop-shadow"), m = fa("blur"), h = fa("perspective"), g = fa("aspect"), _ = fa("ease"), v = fa("animate"), y = () => [
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
			q,
			K
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
			q,
			K,
			c
		], T = () => [
			xa,
			"full",
			"auto",
			...w()
		], E = () => [
			Ca,
			"none",
			"subgrid",
			q,
			K
		], D = () => [
			"auto",
			{ span: [
				"full",
				Ca,
				q,
				K
			] },
			Ca,
			q,
			K
		], O = () => [
			Ca,
			"auto",
			q,
			K
		], k = () => [
			"auto",
			"min",
			"max",
			"fr",
			q,
			K
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
			xa,
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
			xa,
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
			xa,
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
			q,
			K
		], L = () => [
			...b(),
			Ua,
			Ra,
			{ position: [q, K] }
		], R = () => ["no-repeat", { repeat: [
			"",
			"x",
			"y",
			"space",
			"round"
		] }], ee = () => [
			"auto",
			"cover",
			"contain",
			Wa,
			Na,
			{ size: [q, K] }
		], z = () => [
			wa,
			Va,
			Pa
		], te = () => [
			"",
			"none",
			"full",
			l,
			q,
			K
		], B = () => [
			"",
			Sa,
			Va,
			Pa
		], ne = () => [
			"solid",
			"dashed",
			"dotted",
			"double"
		], re = () => [
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
		], V = () => [
			Sa,
			wa,
			Ua,
			Ra
		], H = () => [
			"",
			"none",
			m,
			q,
			K
		], ie = () => [
			"none",
			Sa,
			q,
			K
		], ae = () => [
			"none",
			Sa,
			q,
			K
		], U = () => [
			Sa,
			q,
			K
		], oe = () => [
			xa,
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
				blur: [Ta],
				breakpoint: [Ta],
				color: [Ea],
				container: [Ta],
				"drop-shadow": [Ta],
				ease: [
					"in",
					"out",
					"in-out"
				],
				font: [ja],
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
				"inset-shadow": [Ta],
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
				radius: [Ta],
				shadow: [Ta],
				spacing: ["px", Sa],
				text: [Ta],
				"text-shadow": [Ta],
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
					xa,
					K,
					q,
					g
				] }],
				container: ["container"],
				"container-type": [{ "@container": [
					"",
					"normal",
					"size",
					q,
					K
				] }],
				"container-named": [Ma],
				columns: [{ columns: [
					Sa,
					"auto",
					K,
					q,
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
					Ca,
					"auto",
					q,
					K
				] }],
				basis: [{ basis: [
					xa,
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
					Sa,
					xa,
					"auto",
					"initial",
					"none",
					K
				] }],
				grow: [{ grow: [
					"",
					Sa,
					q,
					K
				] }],
				shrink: [{ shrink: [
					"",
					Sa,
					q,
					K
				] }],
				order: [{ order: [
					Ca,
					"first",
					"last",
					"none",
					q,
					K
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
					Va,
					Pa
				] }],
				"font-smoothing": ["antialiased", "subpixel-antialiased"],
				"font-style": ["italic", "not-italic"],
				"font-weight": [{ font: [
					r,
					qa,
					Ia
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
					wa,
					K
				] }],
				"font-family": [{ font: [
					Ha,
					La,
					t
				] }],
				"font-features": [{ "font-features": [K] }],
				"fvn-normal": ["normal-nums"],
				"fvn-ordinal": ["ordinal"],
				"fvn-slashed-zero": ["slashed-zero"],
				"fvn-figure": ["lining-nums", "oldstyle-nums"],
				"fvn-spacing": ["proportional-nums", "tabular-nums"],
				"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
				tracking: [{ tracking: [
					i,
					q,
					K
				] }],
				"line-clamp": [{ "line-clamp": [
					Sa,
					"none",
					q,
					Fa
				] }],
				leading: [{ leading: [
					"none",
					a,
					...w()
				] }],
				"list-image": [{ "list-image": [
					"none",
					q,
					K
				] }],
				"list-style-position": [{ list: ["inside", "outside"] }],
				"list-style-type": [{ list: [
					"disc",
					"decimal",
					"none",
					q,
					K
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
				"text-decoration-style": [{ decoration: [...ne(), "wavy"] }],
				"text-decoration-thickness": [{ decoration: [
					Sa,
					"from-font",
					"auto",
					q,
					Pa
				] }],
				"text-decoration-color": [{ decoration: I() }],
				"underline-offset": [{ "underline-offset": [
					Sa,
					"auto",
					q,
					K
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
					Ca,
					q,
					K
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
					q,
					K
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
					q,
					K
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
				"bg-size": [{ bg: ee() }],
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
							Ca,
							q,
							K
						],
						radial: [
							"",
							q,
							K
						],
						conic: [
							"",
							Ca,
							q,
							K
						]
					},
					Ga,
					za
				] }],
				"bg-color": [{ bg: I() }],
				"gradient-from-pos": [{ from: z() }],
				"gradient-via-pos": [{ via: z() }],
				"gradient-to-pos": [{ to: z() }],
				"gradient-from": [{ from: I() }],
				"gradient-via": [{ via: I() }],
				"gradient-to": [{ to: I() }],
				rounded: [{ rounded: te() }],
				"rounded-s": [{ "rounded-s": te() }],
				"rounded-e": [{ "rounded-e": te() }],
				"rounded-t": [{ "rounded-t": te() }],
				"rounded-r": [{ "rounded-r": te() }],
				"rounded-b": [{ "rounded-b": te() }],
				"rounded-l": [{ "rounded-l": te() }],
				"rounded-ss": [{ "rounded-ss": te() }],
				"rounded-se": [{ "rounded-se": te() }],
				"rounded-ee": [{ "rounded-ee": te() }],
				"rounded-es": [{ "rounded-es": te() }],
				"rounded-tl": [{ "rounded-tl": te() }],
				"rounded-tr": [{ "rounded-tr": te() }],
				"rounded-br": [{ "rounded-br": te() }],
				"rounded-bl": [{ "rounded-bl": te() }],
				"border-w": [{ border: B() }],
				"border-w-x": [{ "border-x": B() }],
				"border-w-y": [{ "border-y": B() }],
				"border-w-s": [{ "border-s": B() }],
				"border-w-e": [{ "border-e": B() }],
				"border-w-bs": [{ "border-bs": B() }],
				"border-w-be": [{ "border-be": B() }],
				"border-w-t": [{ "border-t": B() }],
				"border-w-r": [{ "border-r": B() }],
				"border-w-b": [{ "border-b": B() }],
				"border-w-l": [{ "border-l": B() }],
				"divide-x": [{ "divide-x": B() }],
				"divide-x-reverse": ["divide-x-reverse"],
				"divide-y": [{ "divide-y": B() }],
				"divide-y-reverse": ["divide-y-reverse"],
				"border-style": [{ border: [
					...ne(),
					"hidden",
					"none"
				] }],
				"divide-style": [{ divide: [
					...ne(),
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
					...ne(),
					"none",
					"hidden"
				] }],
				"outline-offset": [{ "outline-offset": [
					Sa,
					q,
					K
				] }],
				"outline-w": [{ outline: [
					"",
					Sa,
					Va,
					Pa
				] }],
				"outline-color": [{ outline: I() }],
				shadow: [{ shadow: [
					"",
					"inner",
					"none",
					u,
					Ka,
					Ba
				] }],
				"shadow-color": [{ shadow: I() }],
				"inset-shadow": [{ "inset-shadow": [
					"none",
					d,
					Ka,
					Ba
				] }],
				"inset-shadow-color": [{ "inset-shadow": I() }],
				"ring-w": [{ ring: B() }],
				"ring-w-inset": ["ring-inset"],
				"ring-color": [{ ring: I() }],
				"ring-offset-w": [{ "ring-offset": [Sa, Pa] }],
				"ring-offset-color": [{ "ring-offset": I() }],
				"inset-ring-w": [{ "inset-ring": B() }],
				"inset-ring-color": [{ "inset-ring": I() }],
				"text-shadow": [{ "text-shadow": [
					"none",
					f,
					Ka,
					Ba
				] }],
				"text-shadow-color": [{ "text-shadow": I() }],
				opacity: [{ opacity: [
					Sa,
					q,
					K
				] }],
				"mix-blend": [{ "mix-blend": [
					...re(),
					"plus-darker",
					"plus-lighter"
				] }],
				"bg-blend": [{ "bg-blend": re() }],
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
				"mask-image-linear-pos": [{ "mask-linear": [Sa] }],
				"mask-image-linear-from-pos": [{ "mask-linear-from": V() }],
				"mask-image-linear-to-pos": [{ "mask-linear-to": V() }],
				"mask-image-linear-from-color": [{ "mask-linear-from": I() }],
				"mask-image-linear-to-color": [{ "mask-linear-to": I() }],
				"mask-image-t-from-pos": [{ "mask-t-from": V() }],
				"mask-image-t-to-pos": [{ "mask-t-to": V() }],
				"mask-image-t-from-color": [{ "mask-t-from": I() }],
				"mask-image-t-to-color": [{ "mask-t-to": I() }],
				"mask-image-r-from-pos": [{ "mask-r-from": V() }],
				"mask-image-r-to-pos": [{ "mask-r-to": V() }],
				"mask-image-r-from-color": [{ "mask-r-from": I() }],
				"mask-image-r-to-color": [{ "mask-r-to": I() }],
				"mask-image-b-from-pos": [{ "mask-b-from": V() }],
				"mask-image-b-to-pos": [{ "mask-b-to": V() }],
				"mask-image-b-from-color": [{ "mask-b-from": I() }],
				"mask-image-b-to-color": [{ "mask-b-to": I() }],
				"mask-image-l-from-pos": [{ "mask-l-from": V() }],
				"mask-image-l-to-pos": [{ "mask-l-to": V() }],
				"mask-image-l-from-color": [{ "mask-l-from": I() }],
				"mask-image-l-to-color": [{ "mask-l-to": I() }],
				"mask-image-x-from-pos": [{ "mask-x-from": V() }],
				"mask-image-x-to-pos": [{ "mask-x-to": V() }],
				"mask-image-x-from-color": [{ "mask-x-from": I() }],
				"mask-image-x-to-color": [{ "mask-x-to": I() }],
				"mask-image-y-from-pos": [{ "mask-y-from": V() }],
				"mask-image-y-to-pos": [{ "mask-y-to": V() }],
				"mask-image-y-from-color": [{ "mask-y-from": I() }],
				"mask-image-y-to-color": [{ "mask-y-to": I() }],
				"mask-image-radial": [{ "mask-radial": [q, K] }],
				"mask-image-radial-from-pos": [{ "mask-radial-from": V() }],
				"mask-image-radial-to-pos": [{ "mask-radial-to": V() }],
				"mask-image-radial-from-color": [{ "mask-radial-from": I() }],
				"mask-image-radial-to-color": [{ "mask-radial-to": I() }],
				"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
				"mask-image-radial-size": [{ "mask-radial": [{
					closest: ["side", "corner"],
					farthest: ["side", "corner"]
				}] }],
				"mask-image-radial-pos": [{ "mask-radial-at": b() }],
				"mask-image-conic-pos": [{ "mask-conic": [Sa] }],
				"mask-image-conic-from-pos": [{ "mask-conic-from": V() }],
				"mask-image-conic-to-pos": [{ "mask-conic-to": V() }],
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
				"mask-size": [{ mask: ee() }],
				"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
				"mask-image": [{ mask: [
					"none",
					q,
					K
				] }],
				filter: [{ filter: [
					"",
					"none",
					q,
					K
				] }],
				blur: [{ blur: H() }],
				brightness: [{ brightness: [
					Sa,
					q,
					K
				] }],
				contrast: [{ contrast: [
					Sa,
					q,
					K
				] }],
				"drop-shadow": [{ "drop-shadow": [
					"",
					"none",
					p,
					Ka,
					Ba
				] }],
				"drop-shadow-color": [{ "drop-shadow": I() }],
				grayscale: [{ grayscale: [
					"",
					Sa,
					q,
					K
				] }],
				"hue-rotate": [{ "hue-rotate": [
					Sa,
					q,
					K
				] }],
				invert: [{ invert: [
					"",
					Sa,
					q,
					K
				] }],
				saturate: [{ saturate: [
					Sa,
					q,
					K
				] }],
				sepia: [{ sepia: [
					"",
					Sa,
					q,
					K
				] }],
				"backdrop-filter": [{ "backdrop-filter": [
					"",
					"none",
					q,
					K
				] }],
				"backdrop-blur": [{ "backdrop-blur": H() }],
				"backdrop-brightness": [{ "backdrop-brightness": [
					Sa,
					q,
					K
				] }],
				"backdrop-contrast": [{ "backdrop-contrast": [
					Sa,
					q,
					K
				] }],
				"backdrop-grayscale": [{ "backdrop-grayscale": [
					"",
					Sa,
					q,
					K
				] }],
				"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
					Sa,
					q,
					K
				] }],
				"backdrop-invert": [{ "backdrop-invert": [
					"",
					Sa,
					q,
					K
				] }],
				"backdrop-opacity": [{ "backdrop-opacity": [
					Sa,
					q,
					K
				] }],
				"backdrop-saturate": [{ "backdrop-saturate": [
					Sa,
					q,
					K
				] }],
				"backdrop-sepia": [{ "backdrop-sepia": [
					"",
					Sa,
					q,
					K
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
					q,
					K
				] }],
				"transition-behavior": [{ transition: ["normal", "discrete"] }],
				duration: [{ duration: [
					Sa,
					"initial",
					q,
					K
				] }],
				ease: [{ ease: [
					"linear",
					"initial",
					_,
					q,
					K
				] }],
				delay: [{ delay: [
					Sa,
					q,
					K
				] }],
				animate: [{ animate: [
					"none",
					v,
					q,
					K
				] }],
				backface: [{ backface: ["hidden", "visible"] }],
				perspective: [{ perspective: [
					h,
					q,
					K
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
				skew: [{ skew: U() }],
				"skew-x": [{ "skew-x": U() }],
				"skew-y": [{ "skew-y": U() }],
				transform: [{ transform: [
					q,
					K,
					"",
					"none",
					"gpu",
					"cpu"
				] }],
				"transform-origin": [{ origin: x() }],
				"transform-style": [{ transform: ["3d", "flat"] }],
				translate: [{ translate: oe() }],
				"translate-x": [{ "translate-x": oe() }],
				"translate-y": [{ "translate-y": oe() }],
				"translate-z": [{ "translate-z": oe() }],
				"translate-none": ["translate-none"],
				zoom: [{ zoom: [
					Ca,
					q,
					K
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
					q,
					K
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
					q,
					K
				] }],
				fill: [{ fill: ["none", ...I()] }],
				"stroke-w": [{ stroke: [
					Sa,
					Va,
					Pa,
					Fa
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
	}, ao = /*#__PURE__*/ ua(io);
}));
// src/lib/utils.ts
function J(...e) {
	return ao(Di(e));
}
var so = o((() => {
	Oi(), oo();
})), co = /* @__PURE__ */ s(((e) => {
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
})), lo = /* @__PURE__ */ s(((e, t) => {
	t.exports = co();
}));
// src/components/ui/button.tsx
function Y({ className: e, variant: t = "default", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, uo.jsx)(Ci, {
		"data-slot": "button",
		className: J(fo({
			variant: t,
			size: n,
			className: e
		})),
		...r
	});
}
var uo, fo, po = o((() => {
	Ti(), Mi(), so(), uo = lo(), fo = ji("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
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
}));
vn(), po();
var X = lo();
function mo({ title: e, detail: t, percent: n, onClose: r }) {
	let i = n === 100;
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		role: "status",
		className: "w-full rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-sm",
		children: [/* @__PURE__ */ (0, X.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [
				i ? /* @__PURE__ */ (0, X.jsx)(fe, { className: "mt-0.5 size-4 shrink-0" }) : /* @__PURE__ */ (0, X.jsx)(et, { className: "mt-0.5 size-4 shrink-0 motion-safe:animate-spin" }),
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, X.jsx)("p", {
						className: "text-sm font-medium",
						children: e
					}), t && /* @__PURE__ */ (0, X.jsx)("p", {
						className: "mt-1 text-xs leading-relaxed text-muted-foreground",
						children: t
					})]
				}),
				/* @__PURE__ */ (0, X.jsx)(Y, {
					size: "icon-sm",
					variant: "ghost",
					"aria-label": "Fechar notificação",
					onClick: r,
					children: /* @__PURE__ */ (0, X.jsx)(pn, {})
				})
			]
		}), n !== null && !i && /* @__PURE__ */ (0, X.jsx)("div", {
			role: "progressbar",
			"aria-label": "Carregamento",
			"aria-valuenow": n,
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			className: "mt-3 h-1 overflow-hidden rounded-full bg-muted",
			children: /* @__PURE__ */ (0, X.jsx)("div", {
				className: "h-full bg-primary transition-[width] duration-150",
				style: { width: `${n}%` }
			})
		})]
	});
}
// node_modules/scheduler/cjs/scheduler.production.js
var ho = /* @__PURE__ */ s(((e) => {
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
})), go = /* @__PURE__ */ s(((e, t) => {
	t.exports = ho();
})), _o = /* @__PURE__ */ s(((e) => {
	var t = p();
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
})), vo = /* @__PURE__ */ s(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = _o();
})), yo = /* @__PURE__ */ s(((e) => {
	var t = go(), n = p(), r = vo();
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
	function u(e) {
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
	function d(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = d(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function f(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && f(e.child, t, n, r, i, a)) return !0;
			e = e.sibling;
		}
		return !1;
	}
	function m(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function h(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function g(e) {
		var t = [null, null], n = m(e);
		return n === null || _(t, e, n.child, { foundSelf: !1 }), t;
	}
	function _(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && _(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function v(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var y = null, b = null;
	function x(e, t, n) {
		return e === n || e === t && (y = e, !0);
	}
	function S(e, t, n) {
		return e === n ? (b = e, !1) : e === t && (b !== null && (y = e), !0);
	}
	function C(e) {
		if (e === null) return null;
		do
			e = e === null ? null : e.return;
		while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
		return e || null;
	}
	function w(e, t, n) {
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
	var T = Object.assign, E = Symbol.for("react.element"), D = Symbol.for("react.transitional.element"), O = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), M = Symbol.for("react.consumer"), N = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), I = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), ee = Symbol.for("react.activity"), z = Symbol.for("react.legacy_hidden"), te = Symbol.for("react.memo_cache_sentinel"), B = Symbol.for("react.view_transition"), ne = Symbol.for("react.recoverable"), re = Symbol.iterator;
	function V(e) {
		return typeof e != "object" || !e ? null : (e = re && e[re] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var H = Symbol.for("react.client.reference");
	function ie(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === H ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case k: return "Fragment";
			case j: return "Profiler";
			case A: return "StrictMode";
			case F: return "Suspense";
			case I: return "SuspenseList";
			case ee: return "Activity";
			case B: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case O: return "Portal";
			case N: return e.displayName || "Context";
			case M: return (e._context.displayName || "Context") + ".Consumer";
			case P:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case L: return t = e.displayName || null, t === null ? ie(e.type) || "Memo" : t;
			case R:
				t = e._payload, e = e._init;
				try {
					return ie(e(t));
				} catch {}
		}
		return null;
	}
	var ae = Array.isArray, U = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, oe = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, ce = [], le = -1;
	function ue(e) {
		return { current: e };
	}
	function de(e) {
		0 > le || (e.current = ce[le], ce[le] = null, le--);
	}
	function fe(e, t) {
		le++, ce[le] = e.current, e.current = t;
	}
	var pe = ue(null), me = ue(null), he = ue(null), ge = ue(null);
	function _e(e, t) {
		switch (fe(he, t), fe(me, e), fe(pe, null), t.nodeType) {
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
		de(pe), fe(pe, e);
	}
	function ve() {
		de(pe), de(me), de(he);
	}
	function ye(e) {
		var t = e.memoizedState;
		t !== null && (sh._currentValue = t.memoizedState, fe(ge, e)), t = pe.current;
		var n = dp(t, e.type);
		t !== n && (fe(me, e), fe(pe, n));
	}
	function be(e) {
		me.current === e && (de(pe), de(me)), ge.current === e && (de(ge), sh._currentValue = se);
	}
	var xe, Se;
	function Ce(e) {
		if (xe === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			xe = t && t[1] || "", Se = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + xe + e + Se;
	}
	var we = !1;
	function Te(e, t) {
		if (!e || we) return "";
		we = !0;
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
			we = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ce(n) : "";
	}
	function Ee(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Ce(e.type);
			case 16: return Ce("Lazy");
			case 13: return e.child !== t && t !== null ? Ce("Suspense Fallback") : Ce("Suspense");
			case 19: return Ce("SuspenseList");
			case 0:
			case 15: return Te(e.type, !1);
			case 11: return Te(e.type.render, !1);
			case 1: return Te(e.type, !0);
			case 31: return Ce("Activity");
			case 30: return Ce("ViewTransition");
			default: return "";
		}
	}
	function De(e) {
		try {
			var t = "", n = null;
			do
				t += Ee(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Oe = Object.prototype.hasOwnProperty, ke = t.unstable_scheduleCallback, Ae = t.unstable_cancelCallback, je = t.unstable_shouldYield, Me = t.unstable_requestPaint, Ne = t.unstable_now, Pe = t.unstable_getCurrentPriorityLevel, Fe = t.unstable_ImmediatePriority, Ie = t.unstable_UserBlockingPriority, Le = t.unstable_NormalPriority, Re = t.unstable_LowPriority, ze = t.unstable_IdlePriority, Be = t.log, Ve = t.unstable_setDisableYieldValue, He = null, Ue = null;
	function We(e) {
		if (typeof Be == "function" && Ve(e), Ue && typeof Ue.setStrictMode == "function") try {
			Ue.setStrictMode(He, e);
		} catch {}
	}
	var Ge = Math.clz32 ? Math.clz32 : Je, Ke = Math.log, qe = Math.LN2;
	function Je(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ke(e) / qe | 0) | 0;
	}
	var Ye = 256, Xe = 262144, Ze = 4194304;
	function Qe(e) {
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
	function $e(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Qe(n))) : i = Qe(o) : i = Qe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Qe(n))) : i = Qe(o)) : i = Qe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function et(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function tt(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - Ge(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function nt(e, t) {
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
	function rt() {
		var e = Ze;
		return Ze <<= 1, !(Ze & 62914560) && (Ze = 4194304), e;
	}
	function it(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function at(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function ot(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ge(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && st(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function st(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ge(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function ct(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ge(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function lt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : ut(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function ut(e) {
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
	function dt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function ft() {
		var e = oe.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ch(e.type)) : e;
	}
	function pt(e, t) {
		var n = oe.p;
		try {
			return oe.p = e, t();
		} finally {
			oe.p = n;
		}
	}
	var mt = Math.random().toString(36).slice(2), ht = "__reactFiber$" + mt, gt = "__reactProps$" + mt, _t = "__reactContainer$" + mt, vt = "__reactEvents$" + mt, yt = "__reactListeners$" + mt, bt = "__reactHandles$" + mt, xt = "__reactResources$" + mt, St = "__reactMarker$" + mt, Ct = "__reactLoad$" + mt;
	function wt(e) {
		delete e[ht], delete e[gt], delete e[yt], delete e[bt];
	}
	function Tt(e) {
		var t;
		if (t = e[ht]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[_t] || n[ht]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = fm(e); e !== null;) {
					if (n = e[ht]) return n;
					e = fm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Et(e) {
		if (e = e[ht] || e[_t]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Dt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Ot(e) {
		var t = e[xt];
		return t ||= e[xt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function kt(e) {
		e[St] = !0;
	}
	function At(e) {
		e[Ct] = void 0;
	}
	var jt = /* @__PURE__ */ new Set(), Mt = {};
	function Nt(e, t) {
		Pt(e, t), Pt(e + "Capture", t);
	}
	function Pt(e, t) {
		for (Mt[e] = t, e = 0; e < t.length; e++) jt.add(t[e]);
	}
	var Ft = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), It = {}, Lt = {};
	function Rt(e) {
		return Oe.call(Lt, e) ? !0 : Oe.call(It, e) ? !1 : Ft.test(e) ? Lt[e] = !0 : (It[e] = !0, !1);
	}
	var zt = !1;
	function Bt() {
		var e = zt;
		return zt = !1, e;
	}
	function Vt(e, t, n) {
		if (Rt(t)) {
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
	function Ht(e, t, n) {
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
	function Ut(e, t, n, r) {
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
	function Wt(e) {
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
	function Gt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Kt(e, t, n) {
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
	function qt(e) {
		if (!e._valueTracker) {
			var t = Gt(e) ? "checked" : "value";
			e._valueTracker = Kt(e, t, "" + e[t]);
		}
	}
	function Jt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Gt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var Yt = /[\n"\\]/g;
	function Xt(e) {
		return e.replace(Yt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Zt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Wt(t)) : e.value !== "" + Wt(t) && (e.value = "" + Wt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : $t(e, Wt(n)) : o === "number" && e.value == t ? $t(e, Wt(e.value)) : $t(e, Wt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Wt(s) : e.removeAttribute("name");
	}
	function Qt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				qt(e);
				return;
			}
			n = n == null ? "" : "" + Wt(n), t = t == null ? n : "" + Wt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), qt(e);
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
			for (n = "" + Wt(n), t = null, i = 0; i < e.length; i++) {
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
		t != null && (t = "" + Wt(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + Wt(n);
	}
	function nn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ae(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Wt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), qt(e);
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
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", zt = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (on(e, a, r), zt = !0);
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
		var t = Et(e);
		if (t && (e = t.stateNode)) {
			var n = e[gt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Zt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Xt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[gt] || null;
								if (!a) throw Error(i(90));
								Zt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Jt(r);
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
			if (vn = !1, (hn !== null || gn !== null) && (Id(), hn && (t = hn, e = gn, gn = hn = null, _n(t), e))) for (t = 0; t < e.length; t++) _n(e[t]);
		}
	}
	function bn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[gt] || null;
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
		return T(t.prototype, {
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
	}, Nn = jn(Mn), Pn = T({}, Mn, {
		view: 0,
		detail: 0
	}), Fn = jn(Pn), In, Ln, Rn, zn = T({}, Pn, {
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
	}), Bn = jn(zn), Vn = jn(T({}, zn, { dataTransfer: 0 })), Hn = jn(T({}, Pn, { relatedTarget: 0 })), Un = jn(T({}, Mn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Wn = jn(T({}, Mn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Gn = jn(T({}, Mn, { data: 0 })), Kn = {
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
	var Zn = jn(T({}, Pn, {
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
	})), W = jn(T({}, zn, {
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
	})), Qn = jn(T({}, Mn, { submitter: 0 })), $n = jn(T({}, Pn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Xn
	})), er = jn(T({}, Mn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), tr = jn(T({}, zn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), nr = jn(T({}, Mn, {
		newState: 0,
		oldState: 0,
		source: 0
	})), rr = [
		9,
		13,
		27,
		32
	], ir = xn && "CompositionEvent" in window, G = null;
	xn && "documentMode" in document && (G = document.documentMode);
	var ar = xn && "TextEvent" in window && !G, or = xn && (!ir || G && 8 < G && 11 >= G), sr = " ", cr = !1;
	function lr(e, t) {
		switch (e) {
			case "keyup": return rr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function ur(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var dr = !1;
	function fr(e, t) {
		switch (e) {
			case "compositionend": return ur(t);
			case "keypress": return t.which === 32 ? (cr = !0, sr) : null;
			case "textInput": return e = t.data, e === sr && cr ? null : e;
			default: return null;
		}
	}
	function pr(e, t) {
		if (dr) return e === "compositionend" || !ir && lr(e, t) ? (e = Dn(), En = Tn = wn = null, dr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return or && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var mr = {
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
	function hr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!mr[e.type] : t === "textarea";
	}
	function gr(e, t, n, r) {
		hn ? gn ? gn.push(r) : gn = [r] : hn = r, t = qf(t, "onChange"), 0 < t.length && (n = new Nn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var _r = null, vr = null;
	function yr(e) {
		zf(e, 0);
	}
	function br(e) {
		if (Jt(Dt(e))) return e;
	}
	function xr(e, t) {
		if (e === "change") return t;
	}
	var Sr = !1;
	if (xn) {
		var Cr;
		if (xn) {
			var wr = "oninput" in document;
			if (!wr) {
				var Tr = document.createElement("div");
				Tr.setAttribute("oninput", "return;"), wr = typeof Tr.oninput == "function";
			}
			Cr = wr;
		} else Cr = !1;
		Sr = Cr && (!document.documentMode || 9 < document.documentMode);
	}
	function Er() {
		_r && (_r.detachEvent("onpropertychange", Dr), vr = _r = null);
	}
	function Dr(e) {
		if (e.propertyName === "value" && br(vr)) {
			var t = [];
			gr(t, vr, e, mn(e)), yn(yr, t);
		}
	}
	function Or(e, t, n) {
		e === "focusin" ? (Er(), _r = t, vr = n, _r.attachEvent("onpropertychange", Dr)) : e === "focusout" && Er();
	}
	function kr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return br(vr);
	}
	function Ar(e, t) {
		if (e === "click") return br(t);
	}
	function jr(e, t) {
		if (e === "input" || e === "change") return br(t);
	}
	function Mr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Nr = typeof Object.is == "function" ? Object.is : Mr;
	function Pr(e, t) {
		if (Nr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Oe.call(t, i) || !Nr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Fr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Ir(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Lr(e, t) {
		var n = Ir(e);
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
			n = Ir(n);
		}
	}
	function Rr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Rr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function zr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Fr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Fr(e.document);
		}
		return t;
	}
	function Br(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Vr = xn && "documentMode" in document && 11 >= document.documentMode, Hr = null, Ur = null, Wr = null, Gr = !1;
	function Kr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Gr || Hr == null || Hr !== Fr(r) || (r = Hr, "selectionStart" in r && Br(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Wr && Pr(Wr, r) || (Wr = r, r = qf(Ur, "onSelect"), 0 < r.length && (t = new Nn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Hr)));
	}
	function qr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Jr = {
		animationend: qr("Animation", "AnimationEnd"),
		animationiteration: qr("Animation", "AnimationIteration"),
		animationstart: qr("Animation", "AnimationStart"),
		transitionrun: qr("Transition", "TransitionRun"),
		transitionstart: qr("Transition", "TransitionStart"),
		transitioncancel: qr("Transition", "TransitionCancel"),
		transitionend: qr("Transition", "TransitionEnd")
	}, Yr = {}, Xr = {};
	xn && (Xr = document.createElement("div").style, "AnimationEvent" in window || (delete Jr.animationend.animation, delete Jr.animationiteration.animation, delete Jr.animationstart.animation), "TransitionEvent" in window || delete Jr.transitionend.transition);
	function Zr(e) {
		if (Yr[e]) return Yr[e];
		if (!Jr[e]) return e;
		var t = Jr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Xr) return Yr[e] = t[n];
		return e;
	}
	var Qr = Zr("animationend"), $r = Zr("animationiteration"), ei = Zr("animationstart"), ti = Zr("transitionrun"), ni = Zr("transitionstart"), ri = Zr("transitioncancel"), ii = Zr("transitionend"), ai = /* @__PURE__ */ new Map(), oi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	oi.push("scrollEnd");
	function si(e, t) {
		ai.set(e, t), Nt(t, [e]);
	}
	var ci = 0;
	function li(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = _d.identifierPrefix;
		var n = ci++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function ui(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Td;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function di(e, t) {
		return e = ui(e), t = ui(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
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
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ge(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function xi(e) {
		if (50 < Ed) throw Ed = 0, Dd = null, Error(i(185));
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
		else if (typeof r == "string") s = qm(e, n, pe.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case ee: return e = wi(31, n, t, a), e.elementType = ee, e.lanes = o, e;
			case k: return ki(n.children, a, o, t);
			case A:
				s = 8, a |= 24;
				break;
			case j: return e = wi(12, n, t, a | 2), e.elementType = j, e.lanes = o, e;
			case F: return e = wi(13, n, t, a), e.elementType = F, e.lanes = o, e;
			case I: return e = wi(19, n, t, a), e.elementType = I, e.lanes = o, e;
			case z:
			case B: return e = a | 32, e = wi(30, n, t, e), e.elementType = B, e.lanes = o, e.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, e;
			default:
				if (typeof r == "object" && r) switch (r.$$typeof) {
					case N:
						s = 10;
						break a;
					case M:
						s = 9;
						break a;
					case P:
						s = 11;
						break a;
					case L:
						s = 14;
						break a;
					case R:
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
				stack: De(t)
			}, Ni.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: De(t)
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
		var i = 32 - Ge(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ge(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Hi = 1 << 32 - Ge(t) + i | n << i | r, Ui = a + e;
		} else Hi = 1 << a | n << i | r, Ui = e;
	}
	function Ki(e) {
		e.return !== null && (Wi(e, 1), Gi(e, 1, 0));
	}
	function qi(e) {
		for (; e === Li;) Li = Fi[--Ii], Fi[Ii] = null, Ri = Fi[--Ii], Fi[Ii] = null;
		for (; e === Vi;) Vi = zi[--Bi], zi[Bi] = null, Ui = zi[--Bi], zi[Bi] = null, Hi = zi[--Bi], zi[Bi] = null;
	}
	function Ji(e, t) {
		zi[Bi++] = Hi, zi[Bi++] = Ui, zi[Bi++] = Vi, Hi = t.id, Ui = t.overflow, Vi = e;
	}
	var Yi = null, Xi = null, Zi = !1, Qi = null, $i = !1, ea = Error(i(519));
	function ta(e) {
		throw sa(Pi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), ea;
	}
	function na(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[ht] = e, t[gt] = r, n) {
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
				Bf("invalid", t), Qt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Bf("invalid", t);
				break;
			case "textarea": Bf("invalid", t), nn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || $f(t.textContent, n) ? (r.popover != null && (Bf("beforetoggle", t), Bf("toggle", t)), r.onScroll != null && Bf("scroll", t), r.onScrollEnd != null && Bf("scrollend", t), r.onClick != null && (t.onclick = fn), t = !0) : t = !1, t || ta(e, !0);
	}
	function ra(e) {
		for (Yi = e.return; Yi;) switch (Yi.tag) {
			case 5:
			case 31:
			case 13:
				$i = !1;
				return;
			case 27:
			case 3:
				$i = !0;
				return;
			default: Yi = Yi.return;
		}
	}
	function ia(e) {
		if (e !== Yi) return !1;
		if (!Zi) return ra(e), Zi = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || pp(e.type, e.memoizedProps)), n = !n), n && Xi && ta(e), ra(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Xi = dm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Xi = dm(e);
		} else t === 27 ? (t = Xi, Sp(e.type) ? (e = um, um = null, Xi = e) : Xi = t) : Xi = Yi ? lm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function aa() {
		Xi = Yi = null, Zi = !1;
	}
	function oa() {
		var e = Qi;
		return e !== null && (ld === null ? ld = e : ld.push.apply(ld, e), Qi = null), e;
	}
	function sa(e) {
		Qi === null ? Qi = [e] : Qi.push(e);
	}
	var ca = ue(null), la = null, ua = null;
	function da(e, t, n) {
		fe(ca, t._currentValue), t._currentValue = n;
	}
	function fa(e) {
		e._currentValue = ca.current, de(ca);
	}
	function pa(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ma(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), pa(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), pa(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), pa(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
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
	function ha(e, t, n, r) {
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
					Nr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ge.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [sh] : e.push(sh));
			}
			a = a.return;
		}
		return e !== null && ma(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function ga(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Nr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function _a(e) {
		la = e, ua = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function va(e) {
		return ba(la, e);
	}
	function ya(e, t) {
		return la === null && _a(e), ba(e, t);
	}
	function ba(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, ua === null) {
			if (e === null) throw Error(i(308));
			ua = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else ua = ua.next = t;
		return n;
	}
	var xa = typeof AbortController < "u" ? AbortController : function() {
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
	}, Sa = t.unstable_scheduleCallback, Ca = t.unstable_NormalPriority, wa = {
		$$typeof: N,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Ta() {
		return {
			controller: new xa(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Ea(e) {
		e.refCount--, e.refCount === 0 && Sa(Ca, function() {
			e.controller.abort();
		});
	}
	function Da(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var Oa = null;
	function ka(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var Aa = null, ja = 0, Ma = 0, Na = null;
	function K(e, t) {
		if (Aa === null) {
			var n = Aa = [];
			ja = 0, Ma = Mf(), Na = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ja++, t.then(Pa, Pa), t;
	}
	function Pa() {
		if (--ja === 0 && (Oa = null, Aa !== null)) {
			Na !== null && (Na.status = "fulfilled");
			var e = Aa;
			Aa = null, Ma = 0, Na = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Fa(e, t) {
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
	var Ia = U.S;
	U.S = function(e, t) {
		if (fd = Ne(), typeof t == "object" && t && typeof t.then == "function" && K(e, t), Oa !== null) for (var n = vf; n !== null;) Da(n, Oa), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = vf; r !== null;) Da(r, n), r = r.next;
			if (Ma !== 0) {
				r = Oa, r === null && (r = Oa = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Ia !== null && Ia(e, t);
	};
	var La = ue(null);
	function Ra() {
		var e = La.current;
		return e === null ? qu.pooledCache : e;
	}
	function za(e, t) {
		t === null ? fe(La, La.current) : fe(La, t.pool);
	}
	function Ba() {
		var e = Ra();
		return e === null ? null : {
			parent: wa._currentValue,
			pool: e
		};
	}
	var q = Error(i(460)), Va = Error(i(474)), Ha = Error(i(542)), Ua = { then: function() {} };
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
					if (e = qu, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
				throw qa = t, q;
		}
	}
	function Ka(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (qa = e, q) : e;
		}
	}
	var qa = null;
	function Ja() {
		if (qa === null) throw Error(i(459));
		var e = qa;
		return qa = null, e;
	}
	function Ya(e) {
		if (e === q || e === Ha) throw Error(i(483));
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
		throw t.$$typeof === E ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
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
			return i === k ? (e = d(e, t, n.props.children, r, n.key), $a(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === R && Ka(i) === t.type) ? (t = a(t, n.props), $a(t, n), t.return = e, t) : (t = Oi(n.type, n.key, n.props, null, e.mode, r), $a(t, n), t.return = e, t);
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
					case D: return n = Oi(t.type, t.key, t.props, null, e.mode, n), $a(n, t), n.return = e, n;
					case O: return t = Mi(t, e.mode, n), t.return = e, t;
					case R: return t = Ka(t), f(e, t, n);
				}
				if (ae(t) || V(t)) return t = ki(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Qa(t), n);
				if (t.$$typeof === N) return f(e, ya(e, t), n);
				eo(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case D: return n.key === i ? l(e, t, n, r) : null;
					case O: return n.key === i ? u(e, t, n, r) : null;
					case R: return n = Ka(n), p(e, t, n, r);
				}
				if (ae(n) || V(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Qa(n), r);
				if (n.$$typeof === N) return p(e, t, ya(e, n), r);
				eo(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case D: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case O: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case R: return r = Ka(r), m(e, t, n, r, i);
				}
				if (ae(r) || V(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Qa(r), i);
				if (r.$$typeof === N) return m(e, t, n, ya(t, r), i);
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
			if (h === s.length) return n(i, d), Zi && Wi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return Zi && Wi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), Zi && Wi(i, h), l;
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
			if (v.done) return n(a, h), Zi && Wi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return Zi && Wi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), Zi && Wi(a, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === k && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case D:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === k) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), $a(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === R && Ka(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), $a(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === k ? (c = ki(o.props.children, e.mode, c, o.key), $a(c, o), c.return = e, e = c) : (c = Oi(o.type, o.key, o.props, null, e.mode, c), $a(c, o), c.return = e, e = c);
						}
						return s(e);
					case O:
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
					case R: return o = Ka(o), _(e, r, o, c);
				}
				if (ae(o)) return h(e, r, o, c);
				if (V(o)) {
					if (l = V(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, Qa(o), c);
				if (o.$$typeof === N) return _(e, r, ya(e, o), c);
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
				if (t === q || t === Ha) throw t;
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
	function J(e) {
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
		if (r = r.shared, Ku & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = xi(e), bi(e, null, n), t;
		}
		return _i(e, r, t, n), xi(e);
	}
	function co(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ct(e, n);
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
	var Y = !1;
	function uo() {
		if (Y) {
			var e = Na;
			if (e !== null) throw e;
		}
	}
	function fo(e, t, n, r) {
		Y = !1;
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
				if (p ? (Yu & f) === f : (r & f) === f) {
					f !== 0 && f === Ma && (Y = !0), u !== null && (u = u.next = {
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
								d = T({}, d, f);
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), rd |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function po(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function X(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) po(n[e], t);
	}
	var mo = ue(null), ho = ue(0);
	function _o(e, t) {
		e = td, fe(ho, e), fe(mo, t), td = e | t.baseLanes;
	}
	function yo() {
		fe(ho, td), fe(mo, mo.current);
	}
	function bo() {
		td = ho.current, de(mo), de(ho);
	}
	var Z = ue(null), xo = null;
	function So(e) {
		var t = e.alternate;
		fe(Do, Do.current & 1), fe(Z, e), xo === null && (t === null || mo.current !== null || t.memoizedState !== null) && (xo = e);
	}
	function Co(e) {
		fe(Do, Do.current), fe(Z, e), xo === null && (xo = e);
	}
	function wo(e) {
		e.tag === 22 ? (fe(Do, Do.current), fe(Z, e), xo === null && (xo = e)) : To();
	}
	function To() {
		fe(Do, Do.current), fe(Z, Z.current);
	}
	function Eo(e) {
		de(Z), xo === e && (xo = null), de(Do);
	}
	var Do = ue(0);
	function Oo(e, t) {
		fe(Z, Z.current), fe(Do, t);
	}
	function ko(e) {
		de(Do), de(Z), xo === e && (xo = null);
	}
	function Ao(e) {
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
	var jo = 0, Mo = null, No = null, Po = null, Fo = !1, Io = !1, Lo = !1, Ro = 0, zo = 0, Bo = null, Vo = 0;
	function Ho() {
		throw Error(i(321));
	}
	function Uo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Nr(e[n], t[n])) return !1;
		return !0;
	}
	function Wo(e, t, n, r, i, a) {
		return jo = a, Mo = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = e === null || e.memoizedState === null ? sc : cc, Lo = !1, a = n(r, i), Lo = !1, Io && (a = Ko(t, n, r, i)), Go(e), a;
	}
	function Go(e) {
		U.H = oc;
		var t = No !== null && No.next !== null;
		if (jo = 0, Po = No = Mo = null, Fo = !1, zo = 0, Bo = null, t) throw Error(i(300));
		e === null || Tc || (e = e.dependencies, e !== null && ga(e) && (Tc = !0));
	}
	function Ko(e, t, n, r) {
		Mo = e;
		var a = 0;
		do {
			if (Io && (Bo = null), zo = 0, Io = !1, 25 <= a) throw Error(i(301));
			if (a += 1, Po = No = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			U.H = lc, o = t(n, r);
		} while (Io);
		return o;
	}
	function qo() {
		var e = U.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? es(t) : t, e = e.useState()[0], (No === null ? null : No.memoizedState) !== e && (Mo.flags |= 1024), t;
	}
	function Jo() {
		var e = Ro !== 0;
		return Ro = 0, e;
	}
	function Yo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Xo(e) {
		if (Fo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Fo = !1;
		}
		jo = 0, Po = No = Mo = null, Io = !1, zo = Ro = 0, Bo = null;
	}
	function Zo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Po === null ? Mo.memoizedState = Po = e : Po = Po.next = e, Po;
	}
	function Qo() {
		if (No === null) {
			var e = Mo.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = No.next;
		var t = Po === null ? Mo.memoizedState : Po.next;
		if (t !== null) Po = t, No = e;
		else {
			if (e === null) throw Mo.alternate === null ? Error(i(467)) : Error(i(310));
			No = e, e = {
				memoizedState: No.memoizedState,
				baseState: No.baseState,
				baseQueue: No.baseQueue,
				queue: No.queue,
				next: null
			}, Po === null ? Mo.memoizedState = Po = e : Po = Po.next = e;
		}
		return Po;
	}
	function $o() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function es(e) {
		var t = zo;
		return zo += 1, Bo === null && (Bo = []), e = Ga(Bo, e, t), t = Mo, (Po === null ? t.memoizedState : Po.next) === null && (t = t.alternate, U.H = t === null || t.memoizedState === null ? sc : cc), e;
	}
	function ts(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return es(e);
			if (e.$$typeof === ne) return;
			if (e.$$typeof === N) return va(e);
		}
		throw Error(i(438, String(e)));
	}
	function ns(e) {
		var t = null, n = Mo.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = Mo.alternate;
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
		}, n === null && (n = $o(), Mo.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = te;
		return t.index++, n;
	}
	function rs(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function is(e) {
		return as(Qo(), No, e);
	}
	function as(e, t, n) {
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
				if (f === u.lane ? (jo & f) === f : (Yu & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Ma && (d = !0);
					else if ((jo & p) === p) {
						u = u.next, p === Ma && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, Mo.lanes |= p, rd |= p;
					f = u.action, Lo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, Mo.lanes |= f, rd |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Nr(o, e.memoizedState) && (Tc = !0, d && (n = Na, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function os(e) {
		var t = Qo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Nr(o, t.memoizedState) || (Tc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function ss(e, t, n) {
		var r = Mo, a = Qo(), o = Zi;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Nr((No || a).memoizedState, n);
		if (s && (a.memoizedState = n, Tc = !0), a = a.queue, Ms(us.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Po !== null && !!(Po.memoizedState.tag & 1), Ds(e ? 9 : 8, { destroy: void 0 }, ls.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, qu === null) throw Error(i(349));
			o || jo & 127 || cs(r, t, n);
		}
		return n;
	}
	function cs(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = Mo.updateQueue, t === null ? (t = $o(), Mo.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function ls(e, t, n, r) {
		t.value = n, t.getSnapshot = r, ds(t) && fs(e);
	}
	function us(e, t, n) {
		return n(function() {
			ds(t) && fs(e);
		});
	}
	function ds(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Nr(e, n);
		} catch {
			return !0;
		}
	}
	function fs(e) {
		var t = yi(e, 2);
		t !== null && jd(t, e, 2);
	}
	function ps(e) {
		var t = Zo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Lo) {
				We(!0);
				try {
					n();
				} finally {
					We(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: rs,
			lastRenderedState: e
		}, t;
	}
	function ms(e, t, n, r) {
		return e.baseState = n, as(e, No, typeof r == "function" ? r : rs);
	}
	function hs(e, t, n, r, a) {
		if (rc(e)) throw Error(i(485));
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
			U.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, gs(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function gs(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = U.T, o = {};
			o.types = a === null ? null : a.types, U.T = o;
			try {
				var s = n(i, r), c = U.S;
				c !== null && c(o, s), _s(e, t, s);
			} catch (n) {
				ys(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), U.T = a;
			}
		} else try {
			a = n(i, r), _s(e, t, a);
		} catch (n) {
			ys(e, t, n);
		}
	}
	function _s(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			vs(e, t, n);
		}, function(n) {
			return ys(e, t, n);
		}) : vs(e, t, n);
	}
	function vs(e, t, n) {
		t.status = "fulfilled", t.value = n, bs(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, gs(e, n)));
	}
	function ys(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, bs(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function bs(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function xs(e, t) {
		return t;
	}
	function Ss(e, t) {
		if (Zi) {
			var n = qu.formState;
			if (n !== null) {
				a: {
					var r = Mo;
					if (Zi) {
						if (Xi) {
							b: {
								for (var i = Xi, a = $i; i.nodeType !== 8;) if (!a || (i = lm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Xi = lm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						ta(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Zo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: xs,
			lastRenderedState: t
		}, n.queue = r, n = ec.bind(null, Mo, r), r.dispatch = n, r = ps(!1), a = nc.bind(null, Mo, !1, r.queue), r = Zo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = hs.bind(null, Mo, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Cs(e) {
		return ws(Qo(), No, e);
	}
	function ws(e, t, n) {
		if (t = as(e, t, xs)[0], e = is(rs)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = es(t);
		} catch (e) {
			throw e === q ? Ha : e;
		}
		else r = t;
		t = Qo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (Mo.flags |= 2048, Ds(9, { destroy: void 0 }, Ts.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Ts(e, t) {
		e.action = t;
	}
	function Es(e) {
		var t = Qo(), n = No;
		if (n !== null) return ws(t, n, e);
		Qo(), t = t.memoizedState, n = Qo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Ds(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = Mo.updateQueue, t === null && (t = $o(), Mo.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Os() {
		return Qo().memoizedState;
	}
	function ks(e, t, n, r) {
		var i = Zo();
		Mo.flags |= e, i.memoizedState = Ds(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function As(e, t, n, r) {
		var i = Qo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		No !== null && r !== null && Uo(r, No.memoizedState.deps) ? i.memoizedState = Ds(t, a, n, r) : (Mo.flags |= e, i.memoizedState = Ds(1 | t, a, n, r));
	}
	function js(e, t) {
		ks(8390656, 8, e, t);
	}
	function Ms(e, t) {
		As(2048, 8, e, t);
	}
	function Ns(e) {
		Mo.flags |= 4;
		var t = Mo.updateQueue;
		if (t === null) t = $o(), Mo.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Ps(e) {
		var t = Qo().memoizedState;
		return Ns({
			ref: t,
			nextImpl: e
		}), function() {
			if (Ku & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Fs(e, t) {
		return As(4, 2, e, t);
	}
	function Is(e, t) {
		return As(4, 4, e, t);
	}
	function Ls(e, t) {
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
	function Rs(e, t, n) {
		n = n == null ? null : n.concat([e]), As(4, 4, Ls.bind(null, t, e), n);
	}
	function zs() {}
	function Bs(e, t) {
		var n = Qo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Uo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Vs(e, t) {
		var n = Qo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Uo(t, r[1])) return r[0];
		if (r = e(), Lo) {
			We(!0);
			try {
				e();
			} finally {
				We(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Hs(e, t, n) {
		return n === void 0 || jo & 1073741824 && !(Yu & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = kd(), Mo.lanes |= e, rd |= e, n);
	}
	function Us(e, t, n, r) {
		return Nr(n, t) ? n : mo.current === null ? !(jo & 106) || jo & 1073741824 && !(Yu & 261930) ? (Tc = !0, e.memoizedState = n) : (e = kd(), Mo.lanes |= e, rd |= e, t) : (e = Hs(e, n, r), Nr(e, t) || (Tc = !0), e);
	}
	function Ws(e, t, n, r, i) {
		var a = oe.p;
		oe.p = a !== 0 && 8 > a ? a : 8;
		var o = U.T, s = {};
		s.types = o === null ? null : o.types, U.T = s, nc(e, !1, t, n);
		try {
			var c = i(), l = U.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? tc(e, t, Fa(c, r), Od(e)) : tc(e, t, r, Od(e));
		} catch (n) {
			tc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Od());
		} finally {
			oe.p = a, o !== null && s.types !== null && (o.types = s.types), U.T = o;
		}
	}
	function Gs() {}
	function Ks(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = qs(e).queue;
		Ws(e, a, t, se, n === null ? Gs : function() {
			return Js(e), n(r);
		});
	}
	function qs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: se,
			baseState: se,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: rs,
				lastRenderedState: se
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
				lastRenderedReducer: rs,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Js(e) {
		var t = qs(e);
		t.next === null && (t = e.alternate.memoizedState), tc(e, t.next.queue, {}, Od());
	}
	function Ys() {
		return va(sh);
	}
	function Xs() {
		return Qo().memoizedState;
	}
	function Zs() {
		return Qo().memoizedState;
	}
	function Qs(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Od();
					e = J(n);
					var r = so(t, e, n);
					r !== null && (jd(r, t, n), co(r, t, n)), t = { cache: Ta() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function $s(e, t, n) {
		var r = Od();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, rc(e) ? ic(t, n) : (n = vi(e, t, n, r), n !== null && (jd(n, e, r), ac(n, t, r)));
	}
	function ec(e, t, n) {
		tc(e, t, n, Od());
	}
	function tc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (rc(e)) ic(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Nr(s, o)) return _i(e, t, i, 0), qu === null && gi(), !1;
			} catch {}
			if (n = vi(e, t, i, r), n !== null) return jd(n, e, r), ac(n, t, r), !0;
		}
		return !1;
	}
	function nc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Mf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, rc(e)) {
			if (t) throw Error(i(479));
		} else t = vi(e, n, r, 2), t !== null && jd(t, e, 2);
	}
	function rc(e) {
		var t = e.alternate;
		return e === Mo || t !== null && t === Mo;
	}
	function ic(e, t) {
		Io = Fo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function ac(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ct(e, n);
		}
	}
	var oc = {
		readContext: va,
		use: ts,
		useCallback: Ho,
		useContext: Ho,
		useEffect: Ho,
		useImperativeHandle: Ho,
		useLayoutEffect: Ho,
		useInsertionEffect: Ho,
		useMemo: Ho,
		useReducer: Ho,
		useRef: Ho,
		useState: Ho,
		useDebugValue: Ho,
		useDeferredValue: Ho,
		useTransition: Ho,
		useSyncExternalStore: Ho,
		useId: Ho,
		useHostTransitionStatus: Ho,
		useFormState: Ho,
		useActionState: Ho,
		useOptimistic: Ho,
		useMemoCache: Ho,
		useCacheRefresh: Ho,
		useEffectEvent: Ho
	}, sc = {
		readContext: va,
		use: ts,
		useCallback: function(e, t) {
			return Zo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: va,
		useEffect: js,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ks(4194308, 4, Ls.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ks(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ks(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Zo();
			t = t === void 0 ? null : t;
			var r = e();
			if (Lo) {
				We(!0);
				try {
					e();
				} finally {
					We(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Zo();
			if (n !== void 0) {
				var i = n(t);
				if (Lo) {
					We(!0);
					try {
						n(t);
					} finally {
						We(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = $s.bind(null, Mo, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Zo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = ps(e);
			var t = e.queue, n = ec.bind(null, Mo, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: zs,
		useDeferredValue: function(e, t) {
			return Hs(Zo(), e, t);
		},
		useTransition: function() {
			var e = ps(!1);
			return e = Ws.bind(null, Mo, e.queue, !0, !1), Zo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = Mo, a = Zo();
			if (Zi) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), qu === null) throw Error(i(349));
				Yu & 127 || cs(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, js(us.bind(null, r, o, e), [e]), r.flags |= 2048, Ds(9, { destroy: void 0 }, ls.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Zo(), t = qu.identifierPrefix;
			if (Zi) {
				var n = Ui, r = Hi;
				n = (r & ~(1 << 32 - Ge(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Ro++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Vo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ys,
		useFormState: Ss,
		useActionState: Ss,
		useOptimistic: function(e) {
			var t = Zo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = nc.bind(null, Mo, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: ns,
		useCacheRefresh: function() {
			return Zo().memoizedState = Qs.bind(null, Mo);
		},
		useEffectEvent: function(e) {
			var t = Zo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Ku & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, cc = {
		readContext: va,
		use: ts,
		useCallback: Bs,
		useContext: va,
		useEffect: Ms,
		useImperativeHandle: Rs,
		useInsertionEffect: Fs,
		useLayoutEffect: Is,
		useMemo: Vs,
		useReducer: is,
		useRef: Os,
		useState: function() {
			return is(rs);
		},
		useDebugValue: zs,
		useDeferredValue: function(e, t) {
			return Us(Qo(), No.memoizedState, e, t);
		},
		useTransition: function() {
			var e = is(rs)[0], t = Qo().memoizedState;
			return [typeof e == "boolean" ? e : es(e), t];
		},
		useSyncExternalStore: ss,
		useId: Xs,
		useHostTransitionStatus: Ys,
		useFormState: Cs,
		useActionState: Cs,
		useOptimistic: function(e, t) {
			return ms(Qo(), No, e, t);
		},
		useMemoCache: ns,
		useCacheRefresh: Zs,
		useEffectEvent: Ps
	}, lc = {
		readContext: va,
		use: ts,
		useCallback: Bs,
		useContext: va,
		useEffect: Ms,
		useImperativeHandle: Rs,
		useInsertionEffect: Fs,
		useLayoutEffect: Is,
		useMemo: Vs,
		useReducer: os,
		useRef: Os,
		useState: function() {
			return os(rs);
		},
		useDebugValue: zs,
		useDeferredValue: function(e, t) {
			var n = Qo();
			return No === null ? Hs(n, e, t) : Us(n, No.memoizedState, e, t);
		},
		useTransition: function() {
			var e = os(rs)[0], t = Qo().memoizedState;
			return [typeof e == "boolean" ? e : es(e), t];
		},
		useSyncExternalStore: ss,
		useId: Xs,
		useHostTransitionStatus: Ys,
		useFormState: Es,
		useActionState: Es,
		useOptimistic: function(e, t) {
			var n = Qo();
			return No === null ? (n.baseState = e, [e, n.queue.dispatch]) : ms(n, No, e, t);
		},
		useMemoCache: ns,
		useCacheRefresh: Zs,
		useEffectEvent: Ps
	};
	function uc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : T({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var dc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Od(), i = J(r);
			i.payload = t, n != null && (i.callback = n), t = so(e, i, r), t !== null && (jd(t, e, r), co(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Od(), i = J(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = so(e, i, r), t !== null && (jd(t, e, r), co(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Od(), r = J(n);
			r.tag = 2, t != null && (r.callback = t), t = so(e, r, n), t !== null && (jd(t, e, n), co(t, e, n));
		}
	};
	function fc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Pr(n, r) || !Pr(i, a) : !0;
	}
	function pc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && dc.enqueueReplaceState(t, t.state, null);
	}
	function mc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = T({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function hc(e) {
		fi(e);
	}
	function gc(e) {
		console.error(e);
	}
	function _c(e) {
		fi(e);
	}
	function vc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function yc(e, t, n) {
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
	function bc(e, t, n) {
		return n = J(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			vc(e, t);
		}, n;
	}
	function xc(e) {
		return e = J(e), e.tag = 3, e;
	}
	function Sc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				yc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			yc(t, n, r), typeof i != "function" && (hd === null ? hd = /* @__PURE__ */ new Set([this]) : hd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Cc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ha(t, n, a, !0), n = Z.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return xo === null ? Ud() : n.alternate === null && nd === 0 && (nd = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Ua ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), ff(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Ua ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), ff(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return ff(e, r, a), Ud(), !1;
		}
		if (Zi) return t = Z.current, t === null ? (r !== ea && (t = Error(i(423), { cause: r }), sa(Pi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Pi(r, n), a = bc(e.stateNode, r, a), lo(e, a), nd !== 4 && (nd = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== ea && (e = Error(i(422), { cause: r }), sa(Pi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Pi(o, n), cd === null ? cd = [o] : cd.push(o), nd !== 4 && (nd = 2), t === null) return !0;
		r = Pi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = bc(n.stateNode, r, e), lo(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (hd === null || !hd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = xc(a), Sc(a, e, n, r), lo(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var wc = Error(i(461)), Tc = !1;
	function Ec(e, t, n, r) {
		t.child = e === null ? ro(t, null, n, r) : no(t, e.child, n, r);
	}
	function Dc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return _a(t), r = Wo(e, t, n, o, a, i), s = Jo(), e !== null && !Tc ? (Yo(e, t, i), tl(e, t, i)) : (Zi && s && Ki(t), t.flags |= 1, Ec(e, t, r, i), t.child);
	}
	function Oc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Ti(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, kc(e, t, a, r, i)) : (e = Oi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Q(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Pr : n, n(o, r) && e.ref === t.ref) return tl(e, t, i);
		}
		return t.flags |= 1, e = Ei(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function kc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Pr(a, r) && e.ref === t.ref) {
				if (Tc = !1, t.pendingProps = r = a, Q(e, i)) e.flags & 131072 && (Tc = !0);
				else return t.lanes = e.lanes, tl(e, t, i);
			}
		}
		return Lc(e, t, n, r, i);
	}
	function Ac(e, t, n, r) {
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
				return Mc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && za(t, a === null ? null : a.cachePool), a === null ? yo() : _o(t, a), wo(t);
			else return r = t.lanes = 536870912, Mc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && za(t, null), yo(), To()) : (za(t, a.cachePool), _o(t, a), To(), t.memoizedState = null);
		return Ec(e, t, i, n), t.child;
	}
	function jc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Mc(e, t, n, r, i) {
		var a = Ra();
		return a = a === null ? null : {
			parent: wa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && za(t, null), yo(), wo(t), e !== null && ha(e, t, r, !0), t.childLanes = i, null;
	}
	function Nc(e, t) {
		return t = Kc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Pc(e, t, n) {
		return no(t, e.child, null, n), e = Nc(t, t.pendingProps), e.flags |= 2, Eo(t), t.memoizedState = null, e;
	}
	function Fc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (Zi) {
				if (r.mode === "hidden") return e = Nc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, jc(null, e);
				if (Co(t), (e = Xi) ? (e = am(e, $i), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Vi === null ? null : {
						id: Hi,
						overflow: Ui
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ji(e), n.return = t, t.child = n, Yi = t, Xi = null)) : e = null, e === null) throw ta(t);
				return t.lanes = 536870912, null;
			}
			return Nc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Co(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Pc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Tc || ha(e, t, n, !1), a = (n & e.childLanes) !== 0, Tc || a) {
				if (mo.current === null) {
					if (r = qu, r !== null && (s = lt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, yi(e, s), jd(r, e, s), wc;
					Ud();
				}
				t = Pc(e, t, n);
			} else e = o.treeContext, Xi = lm(s.nextSibling), Yi = t, Zi = !0, Qi = null, $i = !1, e !== null && Ji(t, e), t = Nc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Ei(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Ic(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Lc(e, t, n, r, i) {
		return _a(t), n = Wo(e, t, n, r, void 0, i), r = Jo(), e !== null && !Tc ? (Yo(e, t, i), tl(e, t, i)) : (Zi && r && Ki(t), t.flags |= 1, Ec(e, t, n, i), t.child);
	}
	function Rc(e, t, n, r, i, a) {
		return _a(t), t.updateQueue = null, n = Ko(t, r, n, i), Go(e), r = Jo(), e !== null && !Tc ? (Yo(e, t, a), tl(e, t, a)) : (Zi && r && Ki(t), t.flags |= 1, Ec(e, t, n, a), t.child);
	}
	function zc(e, t, n, r, i) {
		if (_a(t), t.stateNode === null) {
			var a = Si, o = n.contextType;
			typeof o == "object" && o && (a = va(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = dc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, ao(t), o = n.contextType, a.context = typeof o == "object" && o ? va(o) : Si, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (uc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && dc.enqueueReplaceState(a, a.state, null), fo(t, r, a, i), uo(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = mc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Si, typeof u == "object" && u && (o = va(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && pc(t, a, r, o), io = !1;
			var f = t.memoizedState;
			a.state = f, fo(t, r, a, i), uo(), l = t.memoizedState, s || f !== l || io ? (typeof d == "function" && (uc(t, n, d, r), l = t.memoizedState), (c = io || fc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, oo(e, t), o = t.memoizedProps, u = mc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Si, typeof l == "object" && l && (c = va(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && pc(t, a, r, c), io = !1, f = t.memoizedState, a.state = f, fo(t, r, a, i), uo();
			var p = t.memoizedState;
			o !== d || f !== p || io || e !== null && e.dependencies !== null && ga(e.dependencies) ? (typeof s == "function" && (uc(t, n, s, r), p = t.memoizedState), (u = io || fc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && ga(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Ic(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = no(t, e.child, null, i), t.child = no(t, null, n, i)) : Ec(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = tl(e, t, i), e;
	}
	function Bc(e, t, n, r) {
		return aa(), t.flags |= 256, Ec(e, t, n, r), t.child;
	}
	var Vc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Hc(e) {
		return {
			baseLanes: e,
			cachePool: Ba()
		};
	}
	function Uc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= od), e;
	}
	function Wc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Do.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (Zi) {
				if (i ? So(t) : To(), (e = Xi) ? (e = am(e, $i), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Vi === null ? null : {
						id: Hi,
						overflow: Ui
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ji(e), n.return = t, t.child = n, Yi = t, Xi = null)) : e = null, e === null) throw ta(t);
				return t.lanes = sm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (To(), i = t.mode, a = Kc({
				mode: "hidden",
				children: a
			}, i), r = ki(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Hc(n), r.childLanes = Uc(e, o, n), t.memoizedState = Vc, jc(null, r)) : (So(t), Gc(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return Jc(e, t, a, o, r, c, s, n);
		}
		return i ? (To(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Ei(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = ki(i, a, n, null), i.flags |= 2) : i = Ei(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, jc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Hc(n) : (a = i.cachePool, a === null ? a = Ba() : (s = wa._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = Uc(e, o, n), t.memoizedState = Vc, jc(e.child, r)) : (So(t), n = e.child, e = n.sibling, n = Ei(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Gc(e, t) {
		return t = Kc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Kc(e, t) {
		return e = wi(22, e, null, t), e.lanes = 0, e;
	}
	function qc(e, t, n) {
		return no(t, e.child, null, n), e = Gc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Jc(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (So(t), t.flags &= -257, qc(e, t, c)) : t.memoizedState === null ? (To(), o = a.fallback, s = t.mode, a = Kc({
			mode: "visible",
			children: a.children
		}, s), o = ki(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, no(t, e.child, null, c), a = t.child, a.memoizedState = Hc(c), a.childLanes = Uc(e, r, c), t.memoizedState = Vc, jc(null, a)) : (To(), t.child = e.child, t.flags |= 128, null);
		if (So(t), sm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, sa({
				value: a,
				source: null,
				stack: null
			})), qc(e, t, c);
		}
		if (Tc || ha(e, t, c, !1), r = (c & e.childLanes) !== 0, Tc || r) {
			if (mo.current !== null) return qc(e, t, c);
			if (r = qu, r !== null && (a = lt(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, yi(e, a), jd(r, e, a), wc;
			return om(o) || Ud(), qc(e, t, c);
		}
		return om(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, Xi = lm(o.nextSibling), Yi = t, Zi = !0, Qi = null, $i = !1, e !== null && Ji(t, e), t = Gc(t, a.children), t.flags |= 134221824, t);
	}
	function Yc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), pa(e.return, t, n);
	}
	function Xc(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && Ao(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function Zc(e, t, n, r, i, a) {
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
	function Qc(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function $c(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Do.current;
		if (t.flags & 128) return Oo(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, Oo(t, o), i === "backwards" && e !== null ? (Qc(e), Ec(e, t, r, n), Qc(e)) : Ec(e, t, r, n), r = Zi ? Ri : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Yc(e, n, t);
			else if (e.tag === 19) Yc(e, n, t);
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
				n = Xc(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, Qc(t)), Zc(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Ao(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Zc(t, !0, n, null, a, r);
				break;
			case "together":
				Zc(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = Xc(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Zc(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function el(e, t, n) {
		var r = t.pendingProps;
		return da(t, t.type, r.value), Ec(e, t, r.children, n), t.child;
	}
	function tl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), rd |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (ha(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Ei(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Ei(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Q(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && ga(e)));
	}
	function nl(e, t, n) {
		switch (t.tag) {
			case 3:
				_e(t, t.stateNode.containerInfo), da(t, wa, e.memoizedState.cache), aa();
				break;
			case 27:
			case 5:
				ye(t);
				break;
			case 4:
				_e(t, t.stateNode.containerInfo);
				break;
			case 10:
				da(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Co(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return So(t), t.flags |= 128, null;
					r = ha(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? Wc(e, t, n) : (So(t), e = tl(e, t, n), e === null ? null : e.sibling);
				}
				So(t);
				break;
			case 19:
				if (t.flags & 128) return $c(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (ha(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return $c(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Oo(t, Do.current), r) break;
				return null;
			case 22: return t.lanes = 0, Ac(e, t, n, t.pendingProps);
			case 24: da(t, wa, e.memoizedState.cache);
		}
		return tl(e, t, n);
	}
	function rl(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Tc = !0;
			else {
				if (!Q(e, n) && !(t.flags & 128)) return Tc = !1, nl(e, t, n);
				Tc = !!(e.flags & 131072);
			}
		} else Tc = !1, Zi && t.flags & 1048576 && Gi(t, Ri, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ka(t.elementType), t.type = e, typeof e == "function") Ti(e) ? (r = mc(e, r), t.tag = 1, t = zc(null, t, e, r, n)) : (t.tag = 0, t = Lc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === P) {
								t.tag = 11, t = Dc(null, t, e, r, n);
								break a;
							}
							if (a === L) {
								t.tag = 14, t = Oc(null, t, e, r, n);
								break a;
							}
							if (a === N) {
								t.tag = 10, t.type = e, t = el(null, t, n);
								break a;
							}
						}
						throw t = ie(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Lc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = mc(r, t.pendingProps), zc(e, t, r, a, n);
			case 3:
				a: {
					if (_e(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, oo(e, t), fo(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, da(t, wa, r), r !== o.cache && ma(t, [wa], n, !0), uo(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Bc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Pi(Error(i(424)), t), sa(a), t = Bc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Xi = lm(e.firstChild), Yi = t, Zi = !0, Qi = null, $i = !0, n = ro(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (aa(), r === a) {
							t = tl(e, t, n);
							break a;
						}
						Ec(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Ic(e, t), e === null ? (n = Nm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Zi || (t.stateNode = fp(t.type, t.pendingProps, he.current, t)) : t.memoizedState = Nm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ye(t), e === null && Zi && (r = t.stateNode = hm(t.type, t.pendingProps, he.current), Yi = t, $i = !0, a = Xi, Sp(t.type) ? (um = a, Xi = lm(r.firstChild)) : Xi = a), Ec(e, t, t.pendingProps.children, n), Ic(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && Zi && ((a = r = Xi) && (r = rm(r, t.type, t.pendingProps, $i), r === null ? a = !1 : (t.stateNode = r, Yi = t, Xi = lm(r.firstChild), $i = !1, a = !0)), a || ta(t)), ye(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, pp(a, o) ? r = null : s !== null && pp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Wo(e, t, qo, null, null, n), sh._currentValue = a), Ic(e, t), Ec(e, t, r, n), t.child;
			case 6: return e === null && Zi && ((e = n = Xi) && (n = im(n, t.pendingProps, $i), n === null ? e = !1 : (t.stateNode = n, Yi = t, Xi = null, e = !0)), e || ta(t)), null;
			case 13: return Wc(e, t, n);
			case 4: return _e(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = no(t, null, r, n) : Ec(e, t, r, n), t.child;
			case 11: return Dc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Ic(e, t), Ec(e, t, r, n), t.child;
			case 8: return Ec(e, t, t.pendingProps.children, n), t.child;
			case 12: return Ec(e, t, t.pendingProps.children, n), t.child;
			case 10: return el(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, _a(t), a = va(a), r = r(a), t.flags |= 1, Ec(e, t, r, n), t.child;
			case 14: return Oc(e, t, t.type, t.pendingProps, n);
			case 15: return kc(e, t, t.type, t.pendingProps, n);
			case 19: return $c(e, t, n);
			case 31: return Fc(e, t, n);
			case 22: return Ac(e, t, n, t.pendingProps);
			case 24: return _a(t), r = va(wa), e === null ? (a = Ra(), a === null && (a = qu, o = Ta(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, ao(t), da(t, wa, a)) : ((e.lanes & n) !== 0 && (oo(e, t), fo(t, null, null, n), uo()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, da(t, wa, r), r !== a.cache && ma(t, [wa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), da(t, wa, r))), Ec(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : Zi && Ki(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Ic(e, t), Ec(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function il(e) {
		e.flags |= 4;
	}
	function al(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Jm(t, r) : Jm(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Bd()) e.flags |= 8192;
				else throw qa = Ua, Va;
			}
		} else e.flags &= -16777217;
	}
	function ol(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Ym(t)) {
			if (Bd()) e.flags |= 8192;
			else throw qa = Ua, Va;
		}
	}
	function sl(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : rt(), e.lanes |= t, sd |= t);
	}
	function cl(e, t) {
		if (!Zi) switch (e.tailMode) {
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
	function ll(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function ul(e, t, n) {
		var r = t.pendingProps;
		switch (qi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return ll(t), null;
			case 1: return ll(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), fa(wa), ve(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ia(t) ? il(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, oa())), ll(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (il(t), o === null ? (ll(t), al(t, a, null, r, n)) : (ll(t), ol(t, o))) : o ? o === e.memoizedState ? (ll(t), t.flags &= -16777217) : (il(t), ll(t), ol(t, o)) : (e = e.memoizedProps, e !== r && il(t), ll(t), al(t, a, e, r, n)), null;
			case 27:
				if (be(t), n = he.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && il(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return ll(t), t.subtreeFlags &= -33554433, null;
					}
					e = pe.current, ia(t) ? na(t, e) : (e = hm(a, r, n), t.stateNode = e, il(t));
				}
				return ll(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (be(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && il(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return ll(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = pe.current, ia(t)) na(t, o);
					else {
						var s = lp(he.current);
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
						o[ht] = t, o[gt] = r;
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
						r && il(t);
					}
				}
				return ll(t), t.subtreeFlags &= -33554433, al(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && il(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = he.current, ia(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Yi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[ht] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || $f(e.nodeValue, n)), e || ta(t, !0);
					} else e = lp(e).createTextNode(r), e[ht] = t, t.stateNode = e;
				}
				return ll(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ia(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[ht] = t;
						} else aa(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						ll(t), e = !1;
					} else n = oa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Eo(t), t) : (Eo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return ll(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ia(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[ht] = t;
						} else aa(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						ll(t), a = !1;
					} else a = oa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Eo(t), t) : (Eo(t), null);
				}
				return Eo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), sl(t, t.updateQueue), ll(t), null);
			case 4: return ve(), e === null && Uf(t.stateNode.containerInfo), t.flags |= 67108864, ll(t), null;
			case 10: return fa(t.type), ll(t), null;
			case 19:
				if (ko(t), r = t.memoizedState, r === null) return ll(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) cl(r, !1);
					else {
						if (nd !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = Ao(e), o !== null) {
								for (t.flags |= 128, cl(r, !1), e = o.updateQueue, t.updateQueue = e, sl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Di(n, e), n = n.sibling;
								return Oo(t, Do.current & 1 | 2), Zi && Wi(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Ne() > pd && (t.flags |= 128, a = !0, cl(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = Ao(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, sl(t, e), cl(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !Zi) return ll(t), null;
						} else 2 * Ne() - r.renderingStartTime > pd && n !== 536870912 && (t.flags |= 128, a = !0, cl(r, !1), t.lanes = 4194304);
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
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ne(), e.sibling = null, o = Do.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || Zi ? Oo(t, o) : (n = o, fe(Z, t), fe(Do, n), xo === null && (xo = t)), Zi && Wi(t, r.treeForkCount), e;
				}
				return ll(t), null;
			case 22:
			case 23: return Eo(t), bo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (ll(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ll(t), n = t.updateQueue, n !== null && sl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && de(La), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), fa(wa), ll(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, ll(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function dl(e, t) {
		switch (qi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return fa(wa), ve(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return be(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Eo(t), t.alternate === null) throw Error(i(340));
					aa();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Eo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					aa();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return ko(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return ve(), null;
			case 10: return fa(t.type), null;
			case 22:
			case 23: return Eo(t), bo(), e !== null && de(La), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return fa(wa), null;
			case 25: return null;
			default: return null;
		}
	}
	function fl(e, t) {
		switch (qi(t), t.tag) {
			case 3:
				fa(wa), ve();
				break;
			case 26:
			case 27:
			case 5:
				be(t);
				break;
			case 4:
				ve();
				break;
			case 31:
				t.memoizedState !== null && Eo(t);
				break;
			case 13:
				Eo(t);
				break;
			case 19:
				ko(t);
				break;
			case 10:
				fa(t.type);
				break;
			case 22:
			case 23:
				Eo(t), bo(), e !== null && de(La);
				break;
			case 24: fa(wa);
		}
	}
	function pl(e, t) {
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
			df(t, t.return, e);
		}
	}
	function ml(e, t, n) {
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
								df(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			df(t, t.return, e);
		}
	}
	function hl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				X(t, n);
			} catch (t) {
				df(e, e.return, t);
			}
		}
	}
	function gl(e, t, n) {
		n.props = mc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			df(e, t, n);
		}
	}
	function _l(e, t) {
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
						var i = e.stateNode, a = li(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Pp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Fp(e);
							f(e.child, !1, Qp, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			df(e, t, n);
		}
	}
	function vl(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				df(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				df(e, t, n);
			}
			else n.current = null;
		}
	}
	function yl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) em(e.stateNode, t[n]);
	}
	function bl(e) {
		for (var t = e.return; t !== null && (Cl(t) && em(e.stateNode, t.stateNode), !Sl(t));) t = t.return;
	}
	function xl(e) {
		for (var t = e.return; t !== null && (Cl(t) && tm(e.stateNode, t.stateNode), !Sl(t));) t = t.return;
	}
	function Sl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function Cl(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function wl(e) {
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
			df(e, e.return, t);
		}
	}
	function Tl(e, t, n) {
		try {
			var r = e.stateNode;
			ip(r, e.type, n, t), r[gt] = t;
		} catch (t) {
			df(e, e.return, t);
		}
	}
	function El(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Sp(e.type) || e.tag === 4;
	}
	function Dl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || El(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Sp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Ol(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = fn)), yl(e, r), zt = !0;
		else if (i !== 4 && (i === 27 && (yl(e, r), r = null, Sp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Ol(e, t, n, r), e = e.sibling; e !== null;) Ol(e, t, n, r), e = e.sibling;
	}
	function kl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), yl(e, r), zt = !0;
		else if (i !== 4 && (i === 27 && (yl(e, r), r = null, Sp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (kl(e, t, n, r), e = e.sibling; e !== null;) kl(e, t, n, r), e = e.sibling;
	}
	function Al(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			np(t, r, n), t[ht] = e, t[gt] = n;
		} catch (t) {
			df(e, e.return, t);
		}
	}
	var jl = !1, Ml = null;
	function Nl(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (jl = !0);
	}
	var Pl = null;
	function Fl() {
		var e = Pl;
		return Pl = null, e;
	}
	var $ = 0;
	function Il(e, t, n, r, i) {
		return $ = 0, Ll(e.child, t, n, r, i);
	}
	function Ll(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Op(o);
					r.push(s), s.view && (a = !0);
				} else a || Op(o).view && (a = !0);
				jl = !0, Tp(o, $ === 0 ? t : t + "_" + $, n), $++;
			} else e.tag === 22 && e.memoizedState !== null || e.tag === 30 && i || Ll(e.child, t, n, r, i) && (a = !0);
			e = e.sibling;
		}
		return a;
	}
	function Rl(e, t) {
		for (; e !== null;) e.tag === 5 ? Ep(e.stateNode, e.memoizedProps) : e.tag === 22 && e.memoizedState !== null || e.tag === 30 && t || Rl(e.child, t), e = e.sibling;
	}
	function zl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (zl(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = di(t.default, t.share), t !== "none" && (Il(e, n, t, null, !1) || Rl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Bl(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = li(r, n), a = di(r.default, n.paired ? r.share : r.enter);
			a === "none" ? zl(e) : Il(e, i, a, null, !1) ? (zl(e), n.paired || t || Ad(e, r.onEnter)) : Rl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Bl(e, t), e = e.sibling;
		else zl(e);
	}
	function Vl(e) {
		if (Ml !== null && Ml.size !== 0) {
			var t = Ml;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = di(n.default, n.share);
								if (a !== "none" && (Il(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Ad(e, n.onShare)) : Rl(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					Vl(e);
				}
				e = e.sibling;
			}
		}
	}
	function Hl(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = li(t, e.stateNode), r = Ml === null ? void 0 : Ml.get(n), i = di(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Il(e, n, i, null, !1) ? r === void 0 ? Ad(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Ml.delete(n), Ad(e, t.onShare)) : Rl(e.child, !1)), Ml !== null && Vl(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Hl(e), e = e.sibling;
		else Ml !== null && Vl(e);
	}
	function Ul(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = li(t, e.stateNode);
				t = di(t.default, t.update), e.flags &= -5, t !== "none" && Il(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && Ul(e);
			e = e.sibling;
		}
	}
	function Wl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, Rl(e.child, !1));
				}
				Wl(e);
			}
			e = e.sibling;
		}
	}
	function Gl(e) {
		if (e.tag === 30) e.stateNode.paired = null, Rl(e.child, !1), Wl(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Gl(e), e = e.sibling;
		else Wl(e);
	}
	function Kl(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? Rl(e.child, !1) : e.subtreeFlags & 33554432 && Kl(e), e = e.sibling;
	}
	function ql(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && $ < a.length) {
					var l = a[$], u = Op(c);
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
				e.flags & 4 && Tp(c, $ === 0 ? n : n + "_" + $, i), s && e.flags & 4 || (Pl === null && (Pl = []), Pl.push(c, $ === 0 ? r : r + "_" + $, t.memoizedProps)), $++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : ql(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function Jl(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = li(n, r), a = di(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(kp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				$ = 0, i = ql(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Ad(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && Jl(e, t);
			e = e.sibling;
		}
	}
	var Yl = !1, Xl = !1, Zl = !1, Ql = !1, $l = typeof WeakSet == "function" ? WeakSet : Set, eu = null, tu = !1, nu = !1, ru = !1, iu = !1;
	function au(e, t, n) {
		if (e = e.containerInfo, sp = gh, e = zr(e), Br(e)) {
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
		}, gh = !1, n = (n & 335544064) === n, eu = t, t = n ? 9270 : 1024; eu !== null;) {
			if (e = eu, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && Hl(r[a]);
			if (e.alternate === null && e.flags & 2) n && Nl(e), ou(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && Hl(r), ou(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Nl(e), ou(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, eu = r) : (n && Ul(e), ou(n));
			}
		}
		Ml = null;
	}
	function ou(e) {
		for (; eu !== null;) {
			var t = eu, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = mc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							df(t, t.return, e);
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
					n && r !== null && (n = li(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = di(a.default, a.update), a !== "none" && Il(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, eu = r;
				break;
			}
			eu = t.return;
		}
	}
	function su(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Du(e, n), r & 4 && pl(5, n);
				break;
			case 1:
				if (Du(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						df(n, n.return, e);
					}
					else {
						var i = mc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							df(n, n.return, e);
						}
					}
				}
				r & 64 && hl(n), r & 512 && _l(n, n.return);
				break;
			case 3:
				if (Du(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						X(e, t);
					} catch (e) {
						df(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Al(n);
			case 26:
			case 5:
				Du(e, n), t === null && r & 4 && wl(n), r & 512 && _l(n, n.return);
				break;
			case 12:
				Du(e, n);
				break;
			case 31:
				Du(e, n), r & 4 && gu(e, n);
				break;
			case 13:
				Du(e, n), r & 4 && _u(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = hf.bind(null, n), cm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Yl, !r) {
					var a = t !== null && t.memoizedState !== null || Xl;
					t = Yl, i = Xl, Yl = r, (Xl = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), ku(e, n, r)) : Du(e, n), Yl = t, Xl = i;
				}
				break;
			case 30:
				Du(e, n), r & 512 && _l(n, n.return);
				break;
			case 7: r & 512 && _l(n, n.return);
			default: Du(e, n);
		}
	}
	function cu(e, t) {
		for (e = e.child; e !== null;) lu(e, t), e = e.sibling;
	}
	function lu(e, t) {
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
					df(e, e.return, t);
				}
				uu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, zt = !0;
				} catch (t) {
					df(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? wp(s, !0) : wp(e.stateNode, !1);
				} catch (t) {
					df(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && cu(e, t);
				break;
			default: cu(e, t);
		}
	}
	function uu(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						lu(n, r);
						break a;
					case 22:
						n.memoizedState === null && uu(n, r);
						break a;
					default: uu(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function du(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, du(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && wt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var fu = null, pu = !1;
	function mu(e, t, n) {
		for (n = n.child; n !== null;) hu(e, t, n), n = n.sibling;
	}
	function hu(e, t, n) {
		if (Ue && typeof Ue.onCommitFiberUnmount == "function") try {
			Ue.onCommitFiberUnmount(He, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Xl || vl(n, t), mu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Xl && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Xl || vl(n, t), xl(n);
				var r = fu, i = pu;
				Sp(n.type) && (fu = n.stateNode, pu = !1), mu(e, t, n), gm(n.stateNode, n.type, n.memoizedProps), fu = r, pu = i;
				break;
			case 5: Xl || vl(n, t), xl(n);
			case 6:
				if (n.tag === 6 && xl(n), r = fu, i = pu, fu = null, mu(e, t, n), fu = r, pu = i, fu !== null) {
					if (pu) try {
						(fu.nodeType === 9 ? fu.body : fu.nodeName === "HTML" ? fu.ownerDocument.body : fu).removeChild(n.stateNode), zt = !0;
					} catch (e) {
						df(n, t, e);
					}
					else try {
						fu.removeChild(n.stateNode), zt = !0;
					} catch (e) {
						df(n, t, e);
					}
				}
				break;
			case 18:
				fu !== null && (pu ? (e = fu, Cp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Hh(e)) : Cp(fu, n.stateNode));
				break;
			case 4:
				r = fu, i = pu, fu = n.stateNode.containerInfo, pu = !0, mu(e, t, n), fu = r, pu = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				ml(2, n, t), Xl || ml(4, n, t), mu(e, t, n);
				break;
			case 1:
				Xl || (vl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && gl(n, t, r)), mu(e, t, n);
				break;
			case 21:
				mu(e, t, n);
				break;
			case 22:
				Xl = (r = Xl) || n.memoizedState !== null, mu(e, t, n), Xl = r;
				break;
			case 30:
				vl(n, t), mu(e, t, n);
				break;
			case 7:
				Xl || vl(n, t), mu(e, t, n);
				break;
			default: mu(e, t, n);
		}
	}
	function gu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Hh(e);
			} catch (e) {
				df(t, t.return, e);
			}
		}
	}
	function _u(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Hh(e);
		} catch (e) {
			df(t, t.return, e);
		}
	}
	function vu(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new $l()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new $l()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function yu(e, t) {
		var n = vu(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = gf.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function bu(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Sp(l.type)) {
							fu = l.stateNode, pu = !1;
							break a;
						}
						break;
					case 5:
						fu = l.stateNode, pu = !1;
						break a;
					case 3:
					case 4:
						fu = l.stateNode.containerInfo, pu = !0;
						break a;
				}
				l = l.return;
			}
			if (fu === null) throw Error(i(160));
			hu(s, c, o), fu = null, pu = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Su(t, e, n), t = t.sibling;
	}
	var xu = null;
	function Su(e, t, n) {
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
				bu(t, e, n), Cu(e), a & 4 && (ml(3, e, e.return), pl(3, e), ml(5, e, e.return));
				break;
			case 1:
				bu(t, e, n), Cu(e), a & 512 && (Xl || r === null || vl(r, r.return)), a & 64 && Yl && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = xu, bu(t, e, n), Cu(e), a & 512 && (Xl || r === null || vl(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (Yl) e.stateNode = fp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[St] || r[ht] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), np(r, t, n), r[ht] = e, kt(r), t = r;
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
										r[ht] = e, kt(r), t = r;
									}
									e.stateNode = t;
								}
							} else Yl || Km(o, e.type, e.stateNode);
						} else e.stateNode = Bm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Tl(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || Xl || t.parentNode.removeChild(t)) : a.count--, n === null ? Yl || Km(o, e.type, e.stateNode) : Bm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				bu(t, e, n), Cu(e), a & 512 && (Xl || r === null || vl(r, r.return)), r !== null && a & 4 && Tl(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = Zl, Zl = !1, bu(t, e, n), Zl = o, Cu(e), a & 512 && (Xl || r === null || vl(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						rn(t, ""), zt = !0;
					} catch (t) {
						df(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Tl(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (Ql = !0);
				break;
			case 6:
				if (bu(t, e, n), Cu(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, zt = !0;
					} catch (t) {
						df(e, e.return, t);
					}
				}
				break;
			case 3:
				if (zt = !1, Wm = null, o = xu, xu = bm(t.containerInfo), bu(t, e, n), xu = o, Cu(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Hh(t.containerInfo);
				} catch (t) {
					df(e, e.return, t);
				}
				Ql && (Ql = !1, wu(e)), zt = !1;
				break;
			case 4:
				a = Zl, Zl = Yl, r = Bt(), o = xu, xu = bm(e.stateNode.containerInfo), bu(t, e, n), Cu(e), xu = o, zt && nu && (ru = !0), zt = r, Zl = a;
				break;
			case 12:
				bu(t, e, n), Cu(e);
				break;
			case 31:
				bu(t, e, n), Cu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, yu(e, t)));
				break;
			case 13:
				bu(t, e, n), Cu(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (dd = Ne()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, yu(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = Yl, l = Xl, u = Zl;
				Yl = c || o, Zl = u || o, Xl = l || s, bu(t, e, n), Xl = l, Zl = u, Yl = c, Cu(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || Yl || Xl || (t = s || Xl, n = Yl, r = Xl, Yl = o || Yl, Xl = t, Ou(e, 2), Yl = n, Xl = r), !o && Zl || cu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, yu(e, n))));
				break;
			case 19:
				bu(t, e, n), Cu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, yu(e, t)));
				break;
			case 30:
				a & 512 && (Xl || r === null || vl(r, r.return)), a = Bt(), o = nu, s = (n & 335544064) === n, c = e.memoizedProps, nu = s && di(c.default, c.update) !== "none", bu(t, e, n), Cu(e), s && r !== null && zt && (e.flags |= 4), nu = o, zt = a;
				break;
			case 21: break;
			case 7: a & 512 && (Xl || r === null || vl(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: bu(t, e, n), Cu(e);
		}
	}
	function Cu(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (El(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (Cl(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Sl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						kl(e, Dl(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (rn(l, ""), n.flags &= -33), kl(e, Dl(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						Ol(e, Dl(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				df(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function wu(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			wu(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gh = !0, t.reset(), gh = !1), e = e.sibling;
		}
	}
	function Tu(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Eu(t, e), t = t.sibling;
		else Jl(t, !1);
	}
	function Eu(e, t) {
		var n = e.alternate;
		if (n === null) Bl(e, !1);
		else switch (e.tag) {
			case 3:
				if (iu = tu = !1, Fl(), Tu(t, e), !tu && !ru) {
					if (e = Pl, e !== null) for (var r = 0; r < e.length; r += 3) {
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
					})), iu = !0;
				}
				Pl = null;
				break;
			case 5:
				Tu(t, e);
				break;
			case 4:
				r = tu, tu = !1, Tu(t, e), tu && (ru = !0), tu = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? Tu(t, e) : Bl(e, !1));
				break;
			case 30:
				r = tu, i = Fl(), tu = !1, Tu(t, e), tu && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = li(a, o), o = li(n.memoizedProps, o);
				var s = di(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, $ = 0, t = ql(e, n, t, o, s, a, !0), $ !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Ad(e, e.memoizedProps.onUpdate), Pl = i) : i !== null && (i.push.apply(i, Pl), Pl = i), tu = e.flags & 32 ? !0 : r;
				break;
			default: Tu(t, e);
		}
	}
	function Du(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) su(e, t.alternate, t), t = t.sibling;
	}
	function Ou(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					ml(4, n, n.return), Ou(n, r);
					break;
				case 1:
					vl(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && gl(n, n.return, i), Ou(n, r);
					break;
				case 27: r & 2 && gm(n.stateNode, n.type, n.memoizedProps);
				case 5:
					vl(n, n.return), n.tag !== 5 && n.tag !== 27 || xl(n), Ou(n, r);
					break;
				case 6:
					xl(n);
					break;
				case 26:
					vl(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || Xl || i.parentNode.removeChild(i), Ou(n, r);
					break;
				case 22:
					n.memoizedState === null && Ou(n, r);
					break;
				case 30:
					vl(n, n.return), Ou(n, r);
					break;
				case 7: vl(n, n.return);
				default: Ou(n, r);
			}
			e = e.sibling;
		}
	}
	function ku(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					ku(i, a, n), pl(4, a);
					break;
				case 1:
					if (ku(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						df(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) po(l[i], c);
						} catch (e) {
							df(r, r.return, e);
						}
					}
					s && o & 64 && hl(a), _l(a, a.return);
					break;
				case 27: n & 2 && Al(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || bl(a), ku(i, a, n), s && r === null && o & 4 && wl(a), _l(a, a.return);
					break;
				case 6:
					bl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || Yl || Km(bm(c.ownerDocument), a.type, c), ku(i, a, n), s && r === null && o & 4 && wl(a), _l(a, a.return);
					break;
				case 12:
					ku(i, a, n);
					break;
				case 31:
					ku(i, a, n), s && o & 4 && gu(i, a);
					break;
				case 13:
					ku(i, a, n), s && o & 4 && _u(i, a);
					break;
				case 22:
					a.memoizedState === null && ku(i, a, n), _l(a, a.return);
					break;
				case 30:
					ku(i, a, n), _l(a, a.return);
					break;
				case 7: _l(a, a.return);
				default: ku(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Au(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Ea(n));
	}
	function ju(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ea(e));
	}
	function Mu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Nu(e, t, n, r), t = t.sibling;
		else i && Kl(t);
	}
	function Nu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && Gl(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Mu(e, t, n, r), a & 2048 && pl(9, t);
				break;
			case 1:
				Mu(e, t, n, r);
				break;
			case 3:
				Mu(e, t, n, r), i && iu && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Ea(a)));
				break;
			case 12:
				if (a & 2048) {
					Mu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						df(t, t.return, e);
					}
				} else Mu(e, t, n, r);
				break;
			case 31:
				Mu(e, t, n, r);
				break;
			case 13:
				Mu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && Gl(t), o._visibility & 2 ? Mu(e, t, n, r) : (o._visibility |= 2, Pu(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && Gl(s), o._visibility & 2 ? Mu(e, t, n, r) : Fu(e, t)), a & 2048 && Au(s, t);
				break;
			case 24:
				Mu(e, t, n, r), a & 2048 && ju(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Rl(a.child, !0), Rl(t.child, !0))), Mu(e, t, n, r);
				break;
			default: Mu(e, t, n, r);
		}
	}
	function Pu(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Pu(a, o, s, c, i), pl(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Pu(a, o, s, c, i)) : u._visibility & 2 ? Pu(a, o, s, c, i) : Fu(a, o), i && l & 2048 && Au(o.alternate, o);
					break;
				case 24:
					Pu(a, o, s, c, i), i && l & 2048 && ju(o.alternate, o);
					break;
				default: Pu(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Fu(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Fu(n, r), i & 2048 && Au(r.alternate, r);
					break;
				case 24:
					Fu(n, r), i & 2048 && ju(r.alternate, r);
					break;
				default: Fu(n, r);
			}
			t = t.sibling;
		}
	}
	var Iu = 8192;
	function Lu(e, t, n) {
		if (e.subtreeFlags & Iu) for (e = e.child; e !== null;) Ru(e, t, n), e = e.sibling;
	}
	function Ru(e, t, n) {
		switch (e.tag) {
			case 26:
				Lu(e, t, n), e.flags & Iu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Zm(n, e)) : Qm(n, xu, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Lu(e, t, n), e.flags & Iu && (e = e.stateNode, (t & 335544128) === t && Zm(n, e));
				break;
			case 3:
			case 4:
				var r = xu;
				xu = bm(e.stateNode.containerInfo), Lu(e, t, n), xu = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Iu, Iu = 16777216, Lu(e, t, n), Iu = r) : Lu(e, t, n));
				break;
			case 30:
				if ((e.flags & Iu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Ml === null && (Ml = /* @__PURE__ */ new Map()), Ml.set(r, i);
				}
				Lu(e, t, n);
				break;
			default: Lu(e, t, n);
		}
	}
	function zu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Bu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				eu = r, Uu(r, e);
			}
			zu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Vu(e), e = e.sibling;
	}
	function Vu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Bu(e), e.flags & 2048 && ml(9, e, e.return);
				break;
			case 3:
				Bu(e);
				break;
			case 12:
				Bu(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Hu(e)) : Bu(e);
				break;
			default: Bu(e);
		}
	}
	function Hu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				eu = r, Uu(r, e);
			}
			zu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					ml(8, t, t.return), Hu(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Hu(t));
					break;
				default: Hu(t);
			}
			e = e.sibling;
		}
	}
	function Uu(e, t) {
		for (; eu !== null;) {
			var n = eu;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					ml(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Ea(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, eu = r;
			else a: for (n = e; eu !== null;) {
				r = eu;
				var i = r.sibling, a = r.return;
				if (du(r), r === n) {
					eu = null;
					break a;
				}
				if (i !== null) {
					i.return = a, eu = i;
					break a;
				}
				eu = a;
			}
		}
	}
	var Wu = {
		getCacheForType: function(e) {
			var t = va(wa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return va(wa).controller.signal;
		}
	}, Gu = typeof WeakMap == "function" ? WeakMap : Map, Ku = 0, qu = null, Ju = null, Yu = 0, Xu = 0, Zu = null, Qu = !1, $u = !1, ed = !1, td = 0, nd = 0, rd = 0, id = 0, ad = 0, od = 0, sd = 0, cd = null, ld = null, ud = !1, dd = 0, fd = 0, pd = Infinity, md = null, hd = null, gd = 0, _d = null, vd = null, yd = 0, bd = 0, xd = null, Sd = null, Cd = null, wd = null, Td = null, Ed = 0, Dd = null;
	function Od() {
		return Ku & 2 && Yu !== 0 ? Yu & -Yu : U.T === null ? ft() : Mf();
	}
	function kd() {
		if (od === 0) {
			if (!(Yu & 536870912) || Zi) {
				var e = Xe;
				Xe <<= 1, !(Xe & 3932160) && (Xe = 262144), od = e;
			} else od = 536870912;
		}
		return e = Z.current, e !== null && (e.flags |= 32), od;
	}
	function Ad(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Pp(li(e.memoizedProps, n))), wd === null && (wd = []), wd.push(t.bind(null, r));
		}
	}
	function jd(e, t, n) {
		(e === qu && (Xu === 2 || Xu === 9) || e.cancelPendingCommit !== null) && (Rd(e, 0), Fd(e, Yu, od, !1)), at(e, n), Ku & 2 && e === qu || (e === qu && (!(Ku & 2) && (id |= n), nd === 4 && Fd(e, Yu, od, !1)), wf(e));
	}
	function Md(e, t, n) {
		if (Ku & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || et(e, t), a = r ? Kd(e, t) : Wd(e, t, !0), o = r;
		do {
			if (a === 0) {
				$u && !r && Fd(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Pd(n)) a = Wd(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = cd;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Rd(c, s).flags |= 256), s = Wd(c, s, !1), s !== 2 && s !== 6) {
								if (ed && !l) {
									c.errorRecoveryDisabledLanes |= o, id |= o, a = 4;
									break a;
								}
								o = ld, ld = a, o !== null && (ld === null ? ld = o : ld.push.apply(ld, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Rd(e, 0), Fd(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Fd(r, t, od, !Qu);
							break a;
						case 2:
							ld = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = dd + 300 - Ne(), 10 < a)) {
						if (Fd(r, t, od, !Qu), $e(r, 0, !0) !== 0) break a;
						yd = t, r.timeoutHandle = gp(Nd.bind(null, r, n, ld, md, ud, t, od, id, sd, Qu, o, "Throttled", -0, 0), a);
						break a;
					}
					Nd(r, n, ld, md, ud, t, od, id, sd, Qu, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		wf(e);
	}
	function Nd(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
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
		}, Ml = null, Ru(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = nh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? dd - Ne() : (a & 4194048) === a ? fd - Ne() : 0, m = eh(d, m), m !== null) ? (yd = a, e.cancelPendingCommit = m($d.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Fd(e, a, o, !l)) : $d(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Pd(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Nr(a(), i)) return !1;
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
	function Fd(e, t, n, r) {
		t = tt(e, t), t &= ~ad, t &= ~id, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ge(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && st(e, n, t);
	}
	function Id() {
		return Ku & 6 ? !0 : (Tf(0, !1), !1);
	}
	function Ld() {
		if (Ju !== null) {
			if (Xu === 0) var e = Ju.return;
			else e = Ju, ua = la = null, Xo(e), Xa = null, Za = 0, e = Ju;
			for (; e !== null;) fl(e.alternate, e), e = e.return;
			Ju = null;
		}
	}
	function Rd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, _p(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), yd = 0, Ld(), qu = e, Ju = n = Ei(e.current, null), Yu = t, Xu = 0, Zu = null, Qu = !1, $u = et(e, t), ed = !1, sd = od = ad = id = rd = nd = 0, ld = cd = null, ud = !1, td = tt(e, t), gi(), n;
	}
	function zd(e, t) {
		Mo = null, U.H = oc, t === q || t === Ha ? (t = Ja(), Xu = 3) : t === Va ? (t = Ja(), Xu = 4) : Xu = t === wc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Zu = t, Ju === null && (nd = 1, vc(e, Pi(t, e.current)));
	}
	function Bd() {
		var e = Z.current;
		return e === null ? !0 : (Yu & 4194048) === Yu ? xo === null : (Yu & 62914560) === Yu || Yu & 536870912 ? e === xo : !1;
	}
	function Vd() {
		var e = U.H;
		return U.H = oc, e === null ? oc : e;
	}
	function Hd() {
		var e = U.A;
		return U.A = Wu, e;
	}
	function Ud() {
		nd = 4, Qu || (Yu & 4194048) !== Yu && Z.current !== null || ($u = !0), !(rd & 134217727) && !(id & 134217727) || qu === null || Fd(qu, Yu, od, !1);
	}
	function Wd(e, t, n) {
		var r = Ku;
		Ku |= 2;
		var i = Vd(), a = Hd();
		(qu !== e || Yu !== t) && (md = null, Rd(e, t)), t = !1;
		var o = nd;
		a: do
			try {
				if (Xu !== 0 && Ju !== null) {
					var s = Ju, c = Zu;
					switch (Xu) {
						case 8:
							Ld(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Z.current === null && (t = !0);
							var l = Xu;
							if (Xu = 0, Zu = null, Xd(e, s, c, l), n && $u) {
								o = 0;
								break a;
							}
							break;
						default: l = Xu, Xu = 0, Zu = null, Xd(e, s, c, l);
					}
				}
				Gd(), o = nd;
				break;
			} catch (t) {
				zd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, ua = la = null, Ku = r, U.H = i, U.A = a, Ju === null && (qu = null, Yu = 0, gi()), o;
	}
	function Gd() {
		for (; Ju !== null;) Jd(Ju);
	}
	function Kd(e, t) {
		var n = Ku;
		Ku |= 2;
		var r = Vd(), a = Hd();
		qu !== e || Yu !== t ? (md = null, pd = Ne() + 500, Rd(e, t)) : $u = et(e, t);
		a: do
			try {
				if (Xu !== 0 && Ju !== null) {
					t = Ju;
					var o = Zu;
					b: switch (Xu) {
						case 1:
							Xu = 0, Zu = null, Xd(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Wa(o)) {
								Xu = 0, Zu = null, Yd(t);
								break;
							}
							t = function() {
								Xu !== 2 && Xu !== 9 || qu !== e || (Xu = 7), wf(e);
							}, o.then(t, t);
							break a;
						case 3:
							Xu = 7;
							break a;
						case 4:
							Xu = 5;
							break a;
						case 7:
							Wa(o) ? (Xu = 0, Zu = null, Yd(t)) : (Xu = 0, Zu = null, Xd(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Ju.tag) {
								case 26: s = Ju.memoizedState;
								case 5:
								case 27:
									var c = Ju;
									if (s ? Ym(s) : c.stateNode.complete) {
										Xu = 0, Zu = null;
										var l = c.sibling;
										if (l !== null) Ju = l;
										else {
											var u = c.return;
											u === null ? Ju = null : (Ju = u, Zd(u));
										}
										break b;
									}
							}
							Xu = 0, Zu = null, Xd(e, t, o, 5);
							break;
						case 6:
							Xu = 0, Zu = null, Xd(e, t, o, 6);
							break;
						case 8:
							Ld(), nd = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				qd();
				break;
			} catch (t) {
				zd(e, t);
			}
		while (1);
		return ua = la = null, U.H = r, U.A = a, Ku = n, Ju === null ? (qu = null, Yu = 0, gi(), nd) : 0;
	}
	function qd() {
		for (; Ju !== null && !je();) Jd(Ju);
	}
	function Jd(e) {
		var t = rl(e.alternate, e, td);
		e.memoizedProps = e.pendingProps, t === null ? Zd(e) : Ju = t;
	}
	function Yd(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Rc(n, t, t.pendingProps, t.type, void 0, Yu);
				break;
			case 11:
				t = Rc(n, t, t.pendingProps, t.type.render, t.ref, Yu);
				break;
			case 5:
				Xo(t);
				var r = t;
				r === Yi && (Zi ? (ra(r), r.tag === 5 && r.stateNode != null && (Xi = r.stateNode)) : (ra(r), Zi = !0));
			default: fl(n, t), t = Ju = Di(t, td), t = rl(n, t, td);
		}
		e.memoizedProps = e.pendingProps, t === null ? Zd(e) : Ju = t;
	}
	function Xd(e, t, n, r) {
		ua = la = null, Xo(t), Xa = null, Za = 0;
		var i = t.return;
		try {
			if (Cc(e, i, t, n, Yu)) {
				nd = 1, vc(e, Pi(n, e.current)), Ju = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Ju = i, t;
			nd = 1, vc(e, Pi(n, e.current)), Ju = null;
			return;
		}
		t.flags & 32768 ? (Zi || r === 1 ? e = !0 : $u || Yu & 536870912 ? e = !1 : (Qu = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Z.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Qd(t, e)) : Zd(t);
	}
	function Zd(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Qd(t, Qu);
				return;
			}
			e = t.return;
			var n = ul(t.alternate, t, td);
			if (n !== null) {
				Ju = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Ju = t;
				return;
			}
			Ju = t = e;
		} while (t !== null);
		nd === 0 && (nd = 5);
	}
	function Qd(e, t) {
		do {
			var n = dl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Ju = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Ju = e;
				return;
			}
			Ju = e = n;
		} while (e !== null);
		nd = 6, Ju = null;
	}
	function $d(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			cf();
		while (gd !== 0);
		if (Ku & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === qu && (Ju = qu = null, Yu = 0), vd = t, _d = e, yd = n, xd = a, Sd = r, ef(e, t, n, s, c, l, f);
		}
	}
	function ef(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (bd = s, s |= hi, ot(e, n, s, r, i, a), wd = null, (n & 335544064) === n ? (Td = ka(e), r = 10262) : (Td = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, _f(Le, function() {
			return lf(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), jl = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = U.T, U.T = null, i = oe.p, oe.p = 2, a = Ku, Ku |= 4;
			try {
				au(e, t, n);
			} finally {
				Ku = a, oe.p = i, U.T = r;
			}
		}
		gd = 1, jl ? Cd = Mp(o, e.containerInfo, Td, rf, af, nf, of, lf, tf, null, null) : (rf(), af(), of());
	}
	function tf(e) {
		if (gd !== 0) {
			var t = _d.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function nf() {
		gd === 3 && (gd = 0, Eu(vd, _d), gd = 4);
	}
	function rf() {
		if (gd === 1) {
			gd = 0;
			var e = _d, t = vd, n = yd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = U.T, U.T = null;
				var i = oe.p;
				oe.p = 2;
				var a = Ku;
				Ku |= 4;
				try {
					nu = ru = !1, Su(t, e, n), n = cp;
					var o = zr(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && Rr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Br(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Lr(s, h), v = Lr(s, g);
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
					Ku = a, oe.p = i, U.T = r;
				}
			}
			e.current = t, gd = 2;
		}
	}
	function af() {
		if (gd === 2) {
			gd = 0;
			var e = _d, t = vd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = U.T, U.T = null;
				var r = oe.p;
				oe.p = 2;
				var i = Ku;
				Ku |= 4;
				try {
					su(e, t.alternate, t);
				} finally {
					Ku = i, oe.p = r, U.T = n;
				}
			}
			gd = 3;
		}
	}
	function of() {
		if (gd === 4 || gd === 3) {
			gd = 0;
			var e = Cd;
			Cd = null, Me();
			var t = _d, n = vd, r = yd, i = Sd, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? gd = 5 : (gd = 0, vd = _d = null, sf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (hd = null), dt(r), n = n.stateNode, Ue && typeof Ue.onCommitFiberRoot == "function") try {
				Ue.onCommitFiberRoot(He, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = U.T, a = oe.p, oe.p = 2, U.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					U.T = n, oe.p = a;
				}
			}
			if (i = wd, o = Td, Td = null, i !== null && (wd = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			yd & 3 && cf(), wf(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Dd ? Ed++ : (Ed = 0, Dd = t) : (Ed = 0, Dd = null), Tf(0, !1);
		}
	}
	function sf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ea(t)));
	}
	function cf() {
		return Cd !== null && (Cd.skipTransition(), Cd = null), rf(), af(), of(), lf();
	}
	function lf() {
		if (gd !== 5) return !1;
		var e = _d, t = bd;
		bd = 0;
		var n = dt(yd), r = U.T, a = oe.p;
		try {
			oe.p = 32 > n ? 32 : n, U.T = null, n = xd, xd = null;
			var o = _d, s = yd;
			if (gd = 0, vd = _d = null, yd = 0, Ku & 6) throw Error(i(331));
			var c = Ku;
			if (Ku |= 4, Vu(o.current), Nu(o, o.current, s, n), Ku = c, Tf(0, !1), Ue && typeof Ue.onPostCommitFiberRoot == "function") try {
				Ue.onPostCommitFiberRoot(He, o);
			} catch {}
			return !0;
		} finally {
			oe.p = a, U.T = r, sf(e, t);
		}
	}
	function uf(e, t, n) {
		t = Pi(n, t), t = bc(e.stateNode, t, 2), e = so(e, t, 2), e !== null && (at(e, 2), wf(e));
	}
	function df(e, t, n) {
		if (e.tag === 3) uf(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				uf(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (hd === null || !hd.has(r))) {
					e = Pi(n, e), n = xc(2), r = so(t, n, 2), r !== null && (Sc(n, r, t, e), at(r, 2), wf(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function ff(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Gu();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (ed = !0, i.add(n), e = pf.bind(null, e, t, n), t.then(e, e));
	}
	function pf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, qu === e && (Yu & n) === n && (nd === 4 || nd === 3 && (Yu & 62914560) === Yu && 300 > Ne() - dd ? Ku & 2 ? ad |= n : Rd(e, 0) : ad |= n, sd === Yu && (sd = 0)), wf(e);
	}
	function mf(e, t) {
		t === 0 && (t = rt()), e = yi(e, t), e !== null && (at(e, t), wf(e));
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
		return ke(e, t);
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
								a = (1 << 31 - Ge(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Af(r, a));
						} else a = Yu, a = $e(r, r === qu ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || et(r, a) || (n = !0, Af(r, a));
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
		for (var t = Ne(), n = null, r = vf; r !== null;) {
			var i = r.next, a = Of(r, t);
			a === 0 ? (r.next = null, n === null ? vf = i : n.next = i, i === null && (yf = n)) : (n = r, (e !== 0 || a & 3) && (xf = !0)), r = i;
		}
		gd !== 0 && gd !== 5 || Tf(e, !1), Cf !== 0 && (Cf = 0);
	}
	function Of(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ge(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = nt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = qu, n = Yu, n = $e(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Xu === 2 || Xu === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ae(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || et(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ae(r), dt(n)) {
				case 2:
				case 8:
					n = Ie;
					break;
				case 32:
					n = Le;
					break;
				case 268435456:
					n = ze;
					break;
				default: n = Le;
			}
			return r = kf.bind(null, e), n = ke(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Ae(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function kf(e, t) {
		if (gd !== 0 && gd !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (cf() && e.callbackNode !== n) return null;
		var r = Yu;
		return r = $e(e, e === qu ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Md(e, r, t), Of(e, Ne()), e.callbackNode != null && e.callbackNode === n ? kf.bind(null, e) : null);
	}
	function Af(e, t) {
		if (cf()) return null;
		Md(e, t, !0);
	}
	function jf() {
		bp(function() {
			Ku & 6 ? ke(Fe, Ef) : Df();
		});
	}
	function Mf() {
		if (Cf === 0) {
			var e = Ma;
			e === 0 && (e = Ye, Ye <<= 1, !(Ye & 261888) && (Ye = 256)), Cf = e;
		}
		return Cf;
	}
	function Nf(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : dn(e);
	}
	function Pf(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Nf((i[gt] || null).action), o = r.submitter;
			o && (t = (t = o[gt] || null) ? Nf(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Nn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Cf !== 0) {
								var e = new FormData(i, o);
								Ks(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), Ks(n, {
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
	for (var Ff = 0; Ff < oi.length; Ff++) {
		var If = oi[Ff];
		si(If.toLowerCase(), "on" + (If[0].toUpperCase() + If.slice(1)));
	}
	si(Qr, "onAnimationEnd"), si($r, "onAnimationIteration"), si(ei, "onAnimationStart"), si("dblclick", "onDoubleClick"), si("focusin", "onFocus"), si("focusout", "onBlur"), si(ti, "onTransitionRun"), si(ni, "onTransitionStart"), si(ri, "onTransitionCancel"), si(ii, "onTransitionEnd"), Pt("onMouseEnter", ["mouseout", "mouseover"]), Pt("onMouseLeave", ["mouseout", "mouseover"]), Pt("onPointerEnter", ["pointerout", "pointerover"]), Pt("onPointerLeave", ["pointerout", "pointerover"]), Nt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Nt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Nt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Nt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Nt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Nt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
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
	function Bf(e, t) {
		var n = t[vt];
		n === void 0 && (n = t[vt] = /* @__PURE__ */ new Set());
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
			e[Hf] = !0, jt.forEach(function(t) {
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
		n = i.bind(null, t, n, e), i = void 0, !Sn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
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
					if (s = Tt(c), s === null) return;
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
				var c = ai.get(e);
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
							l = $n;
							break;
						case Qr:
						case $r:
						case ei:
							l = Un;
							break;
						case ii:
							l = er;
							break;
						case "scroll":
						case "scrollend":
							l = Fn;
							break;
						case "wheel":
							l = tr;
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
							l = W;
							break;
						case "submit":
							l = Qn;
							break;
						case "toggle":
						case "beforetoggle": l = nr;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = bn(m, p), g != null && d.push(Kf(m, g, h))), f) break;
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
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== pn && (u = n.relatedTarget || n.fromElement) && (Tt(u) || u[_t])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Tt(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Bn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = W, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Dt(c), h = l == null ? u : Dt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, Tt(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? w(c, l, Jf) : null, c !== null && Yf(s, u, c, d, !1), l !== null && f !== null && Yf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Dt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = xr;
					else if (hr(c)) {
						if (Sr) _ = jr;
						else {
							_ = kr;
							var v = Or;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && cn(r.elementType) && (_ = xr) : _ = Ar;
					if (_ &&= _(e, r)) {
						gr(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Dt(r) : window, e) {
					case "focusin":
						(hr(v) || v.contentEditable === "true") && (Hr = v, Ur = r, Wr = null);
						break;
					case "focusout":
						Wr = Ur = Hr = null;
						break;
					case "mousedown":
						Gr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Gr = !1, Kr(s, n, i);
						break;
					case "selectionchange": if (Vr) break;
					case "keydown":
					case "keyup": Kr(s, n, i);
				}
				var y;
				if (ir) b: {
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
				else dr ? lr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (or && n.locale !== "ko" && (dr || b !== "onCompositionStart" ? b === "onCompositionEnd" && dr && (y = Dn()) : (wn = i, Tn = "value" in wn ? wn.value : wn.textContent, dr = !0)), v = qf(r, b), 0 < v.length && (b = new Gn(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = ur(n), y !== null && (b.data = y)))), (y = ar ? fr(e, n) : pr(e, n)) && (b = qf(r, "onBeforeInput"), 0 < b.length && (v = new Gn("onBeforeInput", "beforeinput", null, n, i), s.push({
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
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = bn(e, n), i != null && r.unshift(Kf(e, i, a)), i = bn(e, t), i != null && r.push(Kf(e, i, a))), e.tag === 3) return r;
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
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = bn(n, a), l != null && o.unshift(Kf(n, l, c))) : i || (l = bn(n, a), l != null && o.push(Kf(n, l, c)))), n = n.return;
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
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || rn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && rn(e, "" + r);
				else return;
				break;
			case "className":
				Ht(e, "class", r);
				break;
			case "tabIndex":
				Ht(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Ht(e, n, r);
				break;
			case "style":
				sn(e, r, o);
				return;
			case "data": if (t !== "object") {
				Ht(e, "data", r);
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
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && ep(e, t, "name", a.name, a, null), ep(e, t, "formEncType", a.formEncType, a, null), ep(e, t, "formMethod", a.formMethod, a, null), ep(e, t, "formTarget", a.formTarget, a, null)) : (ep(e, t, "encType", a.encType, a, null), ep(e, t, "method", a.method, a, null), ep(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = dn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = fn);
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
				Bf("beforetoggle", e), Bf("toggle", e), Vt(e, "popover", r);
				break;
			case "xlinkActuate":
				Ut(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Ut(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Ut(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Ut(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Ut(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Ut(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Ut(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Ut(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Ut(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Vt(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = ln.get(n) || n, Vt(e, n, r);
			else return;
		}
		zt = !0;
	}
	function tp(e, t, n, r, a, o) {
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
				r != null && Bf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Bf("scrollend", e);
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
				if (!Mt.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[gt] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					zt = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Vt(e, n, r);
				}
				return;
		}
		zt = !0;
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
				Qt(e, o, c, l, u, s, a, !1);
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
				t = o, n = s, e.multiple = !!r, t == null ? n != null && en(e, !!r, n, !0) : en(e, !!r, t, !1);
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
				nn(e, r, a, o);
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
			default: if (cn(t)) {
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
							m !== f && (zt = !0), o = m;
							break;
						case "name":
							m !== f && (zt = !0), a = m;
							break;
						case "checked":
							m !== f && (zt = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (zt = !0), d = m;
							break;
						case "value":
							m !== f && (zt = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (zt = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && ep(e, t, p, m, r, f);
					}
				}
				Zt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || ep(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (zt = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (zt = !0), c = o;
						break;
					case "multiple": o !== l && (zt = !0), s = o;
					default: o !== l && ep(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? en(e, !!n, n ? [] : "", !1) : en(e, !!n, t, !0)) : en(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: ep(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (zt = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (zt = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && ep(e, t, s, a, r, o);
				}
				tn(e, p, m);
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
						p !== m && (zt = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
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
			default: if (cn(t)) {
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
		return n = lp(n).createElement(e), n[ht] = r, n[gt] = t, np(n, e, t), kt(n), n;
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
						a[St] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
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
		return t = typeof t == "number" ? { duration: t } : T({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
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
				}), f(this._fragmentFiber.child, !1, Ip, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Ip(e, t, n, r) {
		return v(e).addEventListener(t, n, r), !1;
	}
	Fp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Bp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Rp(i.optionsOrUseCapture), f(this._fragmentFiber.child, !1, Lp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Lp(e, t, n, r) {
		return v(e).removeEventListener(t, n, r), !1;
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
		var t = m(this._fragmentFiber);
		if (t === null) return !0;
		t = v(t);
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
		f(this._fragmentFiber.child, !0, Vp, e, void 0, void 0);
	};
	function Vp(e, t) {
		return e.tag !== 6 && (e = v(e), pm(e, t));
	}
	Fp.prototype.focusLast = function(e) {
		var t = [];
		f(this._fragmentFiber.child, !0, Hp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Vp(t[n], e); n--);
	};
	function Hp(e, t) {
		return t.push(e), !1;
	}
	Fp.prototype.blur = function() {
		var e = m(this._fragmentFiber);
		e !== null && (e = v(e), e = lp(e).activeElement, e !== null && f(this._fragmentFiber.child, !1, Up, e, void 0, void 0));
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = v(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Fp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), f(this._fragmentFiber.child, !1, Wp, e, void 0, void 0);
	};
	function Wp(e, t) {
		return e.tag === 6 || (e = v(e), t.observe(e)), !1;
	}
	Fp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), f(this._fragmentFiber.child, !1, Gp, e, void 0, void 0);
			for (var n = t = 0; n < Kp.length; n++) {
				var r = Kp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : Kp[t++] = r;
			}
			Kp.length = t;
		}
	};
	function Gp(e, t) {
		return e.tag === 6 || (e = v(e), t.unobserve(e)), !1;
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
		return f(this._fragmentFiber.child, !1, Yp, e, void 0, void 0), e;
	};
	function Yp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = v(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Fp.prototype.getRootNode = function(e) {
		var t = m(this._fragmentFiber);
		return t === null ? this : v(t).getRootNode(e);
	}, Fp.prototype.compareDocumentPosition = function(e) {
		var t = m(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		f(this._fragmentFiber.child, !1, Hp, n, void 0, void 0);
		var r = v(t);
		if (n.length === 0) {
			if (n = r, h(this._fragmentFiber)) {
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
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = g(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = v(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = v(n[0]), i = v(n[n.length - 1]);
		var a = h(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Xp(e, t, n, r, i) {
		var a = Tt(i);
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
				for (a = t, t = m(t); a !== null;) {
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
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = w(n, a, C), t === null ? t = !1 : (f(t, !0, x, a, n), a = y, y = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = w(r, a, C), t === null ? t = !1 : (f(t, !0, S, a, r), a = y, b = y = null, t = a !== null)), t) : !1;
	}
	function Zp(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Fp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		f(this._fragmentFiber.child, !1, Hp, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = g(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || m(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = v(r), Zp(e, n);
				return;
			}
			if (r = v(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = v(a), Zp(a, n)) : v(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function Qp(e, t) {
		return e = v(e), $p(e, t), !1;
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
					nm(n), wt(n);
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
			} else if (!e[St]) switch (t) {
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
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === fn && (e.onclick = null), wt(e);
	}
	function _m(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		wt(e);
	}
	var vm = /* @__PURE__ */ new Map(), ym = /* @__PURE__ */ new Set();
	function bm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var xm = oe.d;
	oe.d = {
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
		var e = xm.f(), t = Id();
		return e || t;
	}
	function Cm(e) {
		var t = Et(e);
		t !== null && t.tag === 5 && t.type === "form" ? Js(t) : xm.r(e);
	}
	var wm = typeof document > "u" ? null : document;
	function Tm(e, t, n) {
		var r = wm;
		if (r && typeof t == "string" && t) {
			var i = Xt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), ym.has(i) || (ym.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), np(t, "link", e), kt(t), r.head.appendChild(t)));
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
			var i = "link[rel=\"preload\"][as=\"" + Xt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Xt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Xt(n.imageSizes) + "\"]")) : i += "[href=\"" + Xt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Pm(e);
					break;
				case "script": a = Rm(e);
			}
			if (!(vm.has(a) || (e = T({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), vm.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Fm(a)) || t === "script" && r.querySelector(zm(a))))) {
				var o = r.createElement("link");
				np(o, "link", e), t === "style" && (o[Ct] = !0, o.onload = o.onerror = function() {
					At(o);
				}), kt(o), r.head.appendChild(o);
			}
		}
	}
	function km(e, t) {
		xm.m(e, t);
		var n = wm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Xt(r) + "\"][href=\"" + Xt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Rm(e);
			}
			if (!vm.has(a) && (e = T({
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
				r = n.createElement("link"), np(r, "link", e), kt(r), n.head.appendChild(r);
			}
		}
	}
	function Am(e, t, n) {
		xm.S(e, t, n);
		var r = wm;
		if (r && e) {
			var i = Ot(r).hoistableStyles, a = Pm(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Fm(a))) s.loading = 5;
				else {
					e = T({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = vm.get(a)) && Hm(e, n);
					var c = o = r.createElement("link");
					kt(c), np(c, "link", e), c._p = new Promise(function(e, t) {
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
			var r = Ot(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = T({
				src: e,
				async: !0
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), kt(a), np(a, "link", e), n.head.appendChild(a)), a = {
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
			var r = Ot(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = T({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), kt(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nm(e, t, n, r) {
		var a = (a = he.current) ? bm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Pm(n.href), t = Ot(a).hoistableStyles, r = t.get(n), r || (r = {
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
					var o = Ot(a).hoistableStyles, s = o.get(e);
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
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Rm(n), t = Ot(a).hoistableScripts, r = t.get(n), r || (r = {
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
		return "href=\"" + Xt(e) + "\"";
	}
	function Fm(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Im(e) {
		return T({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Lm(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[Ct]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[Ct] = !0, t.onload = t.onerror = At.bind(null, t), np(t, "link", n), kt(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function Rm(e) {
		return "[src=\"" + Xt(e) + "\"]";
	}
	function zm(e) {
		return "script[async]" + e;
	}
	function Bm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Xt(n.href) + "\"]");
				if (r) return t.instance = r, kt(r), r;
				var a = T({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), kt(r), np(r, "style", a), Vm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Pm(n.href);
				var o = e.querySelector(Fm(a));
				if (o) return t.state.loading |= 4, t.instance = o, kt(o), o;
				r = Im(n), (a = vm.get(a)) && Hm(r, a), o = (e.ownerDocument || e).createElement("link"), kt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), np(o, "link", r), t.state.loading |= 4, Vm(o, n.precedence, e), t.instance = o;
			case "script": return o = Rm(n.src), (a = e.querySelector(zm(o))) ? (t.instance = a, kt(a), a) : (r = n, (a = vm.get(o)) && (r = T({}, n), Um(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), kt(a), np(a, "link", r), e.head.appendChild(a), t.instance = a);
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
			if (!(a[St] || a[ht] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = nh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, kt(a);
					return;
				}
				a = t.ownerDocument || t, r = Im(r), (i = vm.get(i)) && Hm(r, i), a = a.createElement("link"), kt(a);
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
		$$typeof: N,
		Provider: null,
		Consumer: null,
		_currentValue: se,
		_currentValue2: se,
		_threadCount: 0
	};
	function ch(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = it(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = it(0), this.hiddenUpdates = it(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function lh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ch(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = wi(3, null, null, t), e.current = a, a.stateNode = e, t = Ta(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, ao(a), e;
	}
	function uh(e) {
		return e ? (e = Si, e) : Si;
	}
	function dh(e, t, n, r, i, a) {
		i = uh(i), r.context === null ? r.context = i : r.pendingContext = i, r = J(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = so(e, r, t), n !== null && (jd(n, e, t), co(n, e, t));
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
			t !== null && jd(t, e, 67108864), ph(e, 67108864);
		}
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Od();
			t = ut(t);
			var n = yi(e, t);
			n !== null && jd(n, e, t), ph(e, t);
		}
	}
	var gh = !0;
	function _h(e, t, n, r) {
		var i = U.T;
		U.T = null;
		var a = oe.p;
		try {
			oe.p = 2, yh(e, t, n, r);
		} finally {
			oe.p = a, U.T = i;
		}
	}
	function vh(e, t, n, r) {
		var i = U.T;
		U.T = null;
		var a = oe.p;
		try {
			oe.p = 8, yh(e, t, n, r);
		} finally {
			oe.p = a, U.T = i;
		}
	}
	function yh(e, t, n, r) {
		if (gh) {
			var i = bh(r);
			if (i === null) Gf(e, t, r, xh, n), Mh(e, r);
			else if (Ph(i, e, t, n, r)) r.stopPropagation();
			else if (Mh(e, r), t & 4 && -1 < jh.indexOf(e)) {
				for (; i !== null;) {
					var a = Et(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Qe(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ge(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									wf(a), !(Ku & 6) && (pd = Ne() + 500, Tf(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = yi(a, 2), s !== null && jd(s, a, 2), Id(), ph(a, 2);
					}
					if (a = bh(r), a === null && Gf(e, t, r, xh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Gf(e, t, r, null, n);
		}
	}
	function bh(e) {
		return e = mn(e), Sh(e);
	}
	var xh = null;
	function Sh(e) {
		if (xh = null, e = Tt(e), e !== null) {
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
			case "message": switch (Pe()) {
				case Fe: return 2;
				case Ie: return 8;
				case Le:
				case Re: return 32;
				case ze: return 268435456;
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
		}, t !== null && (t = Et(t), t !== null && mh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = Tt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, pt(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, pt(e.priority, function() {
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
			} else return t = Et(n), t !== null && mh(t), e.blockedOn = n, !1;
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
				var a = Et(n);
				a !== null && (e.splice(t, 3), t -= 3, Ks(a, {
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
			var i = n[r], a = n[r + 1], o = i[gt] || null;
			if (typeof a == "function") o || Vh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[gt] || null) s = o.formAction;
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
		dh(n, Od(), e, t, null, null);
	}, Gh.prototype.unmount = Wh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			dh(e.current, 2, null, e, null, null), Id(), t[_t] = null;
		}
	};
	function Gh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = ft();
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
	oe.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : d(e), e = e === null ? null : e.stateNode, e;
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
			He = Jh.inject(qh), Ue = Jh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = hc, s = gc, c = _c;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = lh(e, 1, !1, null, null, n, r, null, o, s, c, Uh), e[_t] = t.current, Uf(e), new Wh(t);
	};
})), bo = (/* @__PURE__ */ s(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = yo();
})))(), Z = /* @__PURE__ */ u(p(), 1), xo = /* @__PURE__ */ u(vo(), 1);
function So(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var Co = (e) => {
	switch (e) {
		case "success": return Eo;
		case "info": return Oo;
		case "warning": return Do;
		case "error": return ko;
		default: return null;
	}
}, wo = Array(12).fill(0), To = ({ visible: e, className: t }) => /*#__PURE__*/ Z.createElement("div", {
	className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
	"data-visible": e
}, /*#__PURE__*/ Z.createElement("div", { className: "sonner-spinner" }, wo.map((e, t) => /*#__PURE__*/ Z.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${t}`
})))), Eo = /*#__PURE__*/ Z.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ Z.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), Do = /*#__PURE__*/ Z.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ Z.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), Oo = /*#__PURE__*/ Z.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ Z.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), ko = /*#__PURE__*/ Z.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ Z.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), Ao = /*#__PURE__*/ Z.createElement("svg", {
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
}, /*#__PURE__*/ Z.createElement("line", {
	x1: "18",
	y1: "6",
	x2: "6",
	y2: "18"
}), /*#__PURE__*/ Z.createElement("line", {
	x1: "6",
	y1: "6",
	x2: "18",
	y2: "18"
})), jo = () => {
	let [e, t] = Z.useState(document.hidden);
	return Z.useEffect(() => {
		let e = () => {
			t(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []), e;
}, Mo = 1, No = 100, Po = (e) => typeof e?.id == "number" || e?.id?.length > 0 ? e.id : Mo++, Fo = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), this.getActiveToasts().forEach((t) => e(t)), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e], this.trimHistory();
		}, this.trimHistory = () => {
			let e = this.toasts.length - No;
			e <= 0 || (this.toasts = this.toasts.filter((t) => e > 0 && this.dismissedToasts.has(t.id) ? (this.dismissedToasts.delete(t.id), e--, !1) : !0));
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = Po(e), i = this.pendingDismissals.get(r);
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
				if (a = ["resolve", e], Z.isValidElement(e)) i = !1, this.create({
					id: n,
					type: "default",
					message: e
				});
				else if (Lo(e) && !e.ok) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(`HTTP error! status: ${e.status}`) : t.error, a = typeof t.description == "function" ? await t.description(`HTTP error! status: ${e.status}`) : t.description, o = typeof r == "object" && !Z.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (e instanceof Error) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !Z.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (t.success !== void 0) {
					i = !1;
					let r = typeof t.success == "function" ? await t.success(e) : t.success, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !Z.isValidElement(r) ? r : { message: r };
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
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !Z.isValidElement(r) ? r : { message: r };
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
			let n = Po(t);
			return this.create({
				...t,
				jsx: e(n),
				id: n,
				type: void 0
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set(), this.pendingDismissals = /* @__PURE__ */ new Map();
	}
}(), Io = (e, t) => Fo.message(e, t), Lo = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", Ro = Object.assign(Io, {
	success: Fo.success,
	info: Fo.info,
	warning: Fo.warning,
	error: Fo.error,
	custom: Fo.custom,
	message: Fo.message,
	promise: Fo.promise,
	dismiss: Fo.dismiss,
	loading: Fo.loading
}, {
	getHistory: () => Fo.toasts,
	getToasts: () => Fo.getActiveToasts()
});
So("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--normal-text);background:var(--normal-bg);border:1px solid var(--normal-border);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{-webkit-user-select:none;user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function zo(e) {
	return e.label !== void 0;
}
var Bo = 3, Vo = "24px", Ho = "16px", Uo = 4e3, Wo = 356, Go = 14, Ko = 45, qo = 200;
function Jo(...e) {
	return e.filter(Boolean).join(" ");
}
function Yo(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var Xo = (e) => {
	let { invert: t, toast: n, unstyled: r, interacting: i, setHeights: a, visibleToasts: o, heights: s, index: c, toasts: l, expanded: u, removeToast: d, defaultRichColors: f, closeButton: p, style: m, cancelButtonStyle: h, actionButtonStyle: g, className: _ = "", descriptionClassName: v = "", duration: y, position: b, gap: x, expandByDefault: S, classNames: C, icons: w, closeButtonAriaLabel: T = "Close toast" } = e, [E, D] = Z.useState(null), [O, k] = Z.useState(null), [A, j] = Z.useState(!1), [M, N] = Z.useState(!1), [P, F] = Z.useState(!1), [I, L] = Z.useState(!1), [R, ee] = Z.useState(!1), [z, te] = Z.useState(0), [B, ne] = Z.useState(0), re = Z.useRef(n.duration || y || Uo), V = Z.useRef(null), H = Z.useRef(null), ie = c === 0, ae = c + 1 <= o, U = n.type, oe = U ?? "default", se = n.dismissible !== !1, ce = n.className || "", le = n.descriptionClassName || "", ue = Z.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]), de = Z.useMemo(() => n.closeButton ?? p, [n.closeButton, p]), fe = Z.useMemo(() => n.duration || y || Uo, [n.duration, y]), pe = Z.useRef(0), me = Z.useRef(0), he = Z.useRef(0), ge = Z.useRef(null), [_e, ve] = b.split("-"), ye = Z.useMemo(() => s.reduce((e, t, n) => n >= ue ? e : e + t.height, 0), [s, ue]), be = jo(), xe = Z.useMemo(() => e.swipeDirections ?? Yo(b), [e.swipeDirections, b]), Se = n.invert || t, Ce = U === "loading";
	me.current = Z.useMemo(() => ue * x + ye, [ue, ye]), Z.useEffect(() => {
		re.current = fe;
	}, [fe]), Z.useEffect(() => {
		j(!0);
	}, []), Z.useEffect(() => {
		let e = H.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return ne(t), a((e) => [{
				toastId: n.id,
				height: t,
				position: n.position
			}, ...e]), () => a((e) => e.filter((e) => e.toastId !== n.id));
		}
	}, [a, n.id]), Z.useLayoutEffect(() => {
		if (!A) return;
		let e = H.current, t = e.style.height;
		e.style.height = "auto";
		let r = e.getBoundingClientRect().height;
		e.style.height = t, ne(r), a((e) => e.find((e) => e.toastId === n.id) ? e.map((e) => e.toastId === n.id ? {
			...e,
			height: r
		} : e) : [{
			toastId: n.id,
			height: r,
			position: n.position
		}, ...e]);
	}, [
		A,
		n.title,
		n.description,
		a,
		n.id,
		n.jsx,
		n.action,
		n.cancel
	]);
	let we = Z.useCallback(() => {
		N(!0), te(me.current), a((e) => e.filter((e) => e.toastId !== n.id)), setTimeout(() => {
			d(n);
		}, qo);
	}, [
		n,
		d,
		a,
		me
	]);
	Z.useEffect(() => {
		if (n.promise && U === "loading" || n.duration === Infinity || n.type === "loading") return;
		let e;
		return u || i || be ? (() => {
			if (he.current < pe.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - pe.current;
				re.current -= e;
			}
			he.current = (/* @__PURE__ */ new Date()).getTime();
		})() : re.current !== Infinity && (pe.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			n.onAutoClose == null || n.onAutoClose.call(n, n), we();
		}, re.current)), () => clearTimeout(e);
	}, [
		u,
		i,
		n,
		U,
		be,
		we
	]), Z.useEffect(() => {
		n.delete && (we(), n.onDismiss == null || n.onDismiss.call(n, n));
	}, [we, n.delete]);
	function Te() {
		return w?.loading ? /*#__PURE__*/ Z.createElement("div", {
			className: Jo(C?.loader, n?.classNames?.loader, "sonner-loader"),
			"data-visible": U === "loading"
		}, w.loading) : /*#__PURE__*/ Z.createElement(To, {
			className: Jo(C?.loader, n?.classNames?.loader),
			visible: U === "loading"
		});
	}
	let Ee = n.icon || w?.[U] || Co(U);
	return /*#__PURE__*/ Z.createElement("li", {
		tabIndex: 0,
		ref: H,
		className: Jo(_, ce, C?.toast, n?.classNames?.toast, C?.[oe], n?.classNames?.[oe]),
		"data-sonner-toast": "",
		"data-rich-colors": n.richColors ?? f,
		"data-styled": !(n.jsx || n.unstyled || r),
		"data-mounted": A,
		"data-promise": !!n.promise,
		"data-swiped": R,
		"data-removed": M,
		"data-visible": ae,
		"data-y-position": _e,
		"data-x-position": ve,
		"data-index": c,
		"data-front": ie,
		"data-swiping": P,
		"data-dismissible": se,
		"data-type": U,
		"data-invert": Se,
		"data-swipe-out": I,
		"data-swipe-direction": O,
		"data-expanded": !!(u || S && A),
		"data-testid": n.testId,
		style: {
			"--index": c,
			"--toasts-before": c,
			"--z-index": l.length - c,
			"--offset": `${M ? z : me.current}px`,
			"--initial-height": S ? "auto" : `${B}px`,
			...m,
			...n.style
		},
		onDragEnd: () => {
			F(!1), D(null), ge.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && !Ce && se && (V.current = /* @__PURE__ */ new Date(), te(me.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (F(!0), ge.current = {
				x: e.clientX,
				y: e.clientY
			}));
		},
		onPointerUp: () => {
			if (I || !se) return;
			ge.current = null;
			let e = Number(H.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(H.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), r = (/* @__PURE__ */ new Date()).getTime() - V.current?.getTime(), i = E === "x" ? e : t, a = Math.abs(i) / r;
			if ((E === "x" ? xe.includes(e > 0 ? "right" : "left") : xe.includes(t > 0 ? "bottom" : "top")) && (Math.abs(i) >= Ko || a > .11)) te(me.current), n.onDismiss == null || n.onDismiss.call(n, n), k(E === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), we(), L(!0);
			else {
				var o, s;
				(o = H.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = H.current) == null || s.style.setProperty("--swipe-amount-y", "0px"), ee(!1), F(!1), D(null);
			}
		},
		onPointerMove: (e) => {
			var t, n;
			if (!ge.current || !se || window.getSelection()?.toString().length > 0) return;
			let r = e.clientY - ge.current.y, i = e.clientX - ge.current.x;
			!E && (Math.abs(i) > 1 || Math.abs(r) > 1) && D(Math.abs(i) > Math.abs(r) ? "x" : "y");
			let a = {
				x: 0,
				y: 0
			}, o = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (E === "y") {
				if (xe.includes("top") || xe.includes("bottom")) {
					if (xe.includes("top") && r < 0 || xe.includes("bottom") && r > 0) a.y = r;
					else {
						let e = r * o(r);
						a.y = Math.abs(e) < Math.abs(r) ? e : r;
					}
				}
			} else if (E === "x" && (xe.includes("left") || xe.includes("right"))) {
				if (xe.includes("left") && i < 0 || xe.includes("right") && i > 0) a.x = i;
				else {
					let e = i * o(i);
					a.x = Math.abs(e) < Math.abs(i) ? e : i;
				}
			}
			(Math.abs(a.x) > 0 || Math.abs(a.y) > 0) && ee(!0), (t = H.current) == null || t.style.setProperty("--swipe-amount-x", `${a.x}px`), (n = H.current) == null || n.style.setProperty("--swipe-amount-y", `${a.y}px`);
		}
	}, de && !n.jsx && U !== "loading" ? /*#__PURE__*/ Z.createElement("button", {
		"aria-label": T,
		"data-disabled": Ce,
		"data-close-button": !0,
		onClick: Ce || !se ? () => {} : () => {
			we(), n.onDismiss == null || n.onDismiss.call(n, n);
		},
		className: Jo(C?.closeButton, n?.classNames?.closeButton)
	}, w?.close ?? Ao) : null, (U || n.icon || n.promise) && n.icon !== null && (w?.[U] !== null || n.icon) ? /*#__PURE__*/ Z.createElement("div", {
		"data-icon": "",
		className: Jo(C?.icon, n?.classNames?.icon)
	}, U === "loading" ? n.icon || Te() : n.promise ? Te() : null, U === "loading" ? null : Ee) : null, /*#__PURE__*/ Z.createElement("div", {
		"data-content": "",
		className: Jo(C?.content, n?.classNames?.content)
	}, /*#__PURE__*/ Z.createElement("div", {
		"data-title": "",
		className: Jo(C?.title, n?.classNames?.title)
	}, n.jsx ? n.jsx : typeof n.title == "function" ? n.title() : n.title), n.description ? /*#__PURE__*/ Z.createElement("div", {
		"data-description": "",
		className: Jo(v, le, C?.description, n?.classNames?.description)
	}, typeof n.description == "function" ? n.description() : n.description) : null), /*#__PURE__*/ Z.isValidElement(n.cancel) ? n.cancel : n.cancel && zo(n.cancel) ? /*#__PURE__*/ Z.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: n.cancelButtonStyle || h,
		onClick: (e) => {
			zo(n.cancel) && se && (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), we());
		},
		className: Jo(C?.cancelButton, n?.classNames?.cancelButton)
	}, n.cancel.label) : null, /*#__PURE__*/ Z.isValidElement(n.action) ? n.action : n.action && zo(n.action) ? /*#__PURE__*/ Z.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: n.actionButtonStyle || g,
		onClick: (e) => {
			zo(n.action) && (n.action.onClick == null || n.action.onClick.call(n.action, e), e.defaultPrevented || we());
		},
		className: Jo(C?.actionButton, n?.classNames?.actionButton)
	}, n.action.label) : null);
};
function Zo() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function Qo(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? Ho : Vo;
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
var $o = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { id: n, invert: r, position: i = "bottom-right", hotkey: a = ["altKey", "KeyT"], expand: o, closeButton: s, className: c, offset: l, mobileOffset: u, theme: d = "light", richColors: f, duration: p, style: m, visibleToasts: h = Bo, toastOptions: g, dir: _ = Zo(), gap: v = Go, icons: y, customAriaLabel: b, containerAriaLabel: x = "Notifications" } = e, [S, C] = Z.useState([]), w = Z.useMemo(() => n ? S.filter((e) => e.toasterId === n) : S.filter((e) => !e.toasterId), [S, n]), T = Z.useMemo(() => Array.from(new Set([i].concat(w.filter((e) => e.position).map((e) => e.position)))), [w, i]), [E, D] = Z.useState([]), [O, k] = Z.useState(!1), [A, j] = Z.useState(!1), [M, N] = Z.useState(d === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : d), P = Z.useRef(null), F = a.join("+").replace(/Key/g, "").replace(/Digit/g, ""), I = Z.useRef(null), L = Z.useRef(!1), R = Z.useCallback((e) => {
		C((t) => (t.find((t) => t.id === e.id)?.delete || Fo.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return Z.useEffect(() => Fo.subscribe((e) => {
		e.dismiss ? requestAnimationFrame(() => {
			C((t) => t.map((t) => t.id === e.id ? {
				...t,
				delete: !0
			} : t));
		}) : setTimeout(() => {
			xo.flushSync(() => {
				C((t) => {
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
	}), []), Z.useEffect(() => {
		if (d !== "system") {
			N(d);
			return;
		}
		if (d === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? N("dark") : N("light")), typeof window > "u") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)");
		try {
			e.addEventListener("change", ({ matches: e }) => {
				N(e ? "dark" : "light");
			});
		} catch {
			e.addListener(({ matches: e }) => {
				try {
					N(e ? "dark" : "light");
				} catch (e) {
					console.error(e);
				}
			});
		}
	}, [d]), Z.useEffect(() => {
		S.length <= 1 && k(!1);
	}, [S]), Z.useEffect(() => {
		let e = (e) => {
			if (a.length > 0 && a.every((t) => e[t] || e.code === t)) {
				var t;
				k(!0), (t = P.current) == null || t.focus();
			}
			e.code === "Escape" && (document.activeElement === P.current || P.current?.contains(document.activeElement)) && k(!1);
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [a]), Z.useEffect(() => {
		if (P.current) return () => {
			I.current && (I.current.focus({ preventScroll: !0 }), I.current = null, L.current = !1);
		};
	}, [P.current]), /*#__PURE__*/ Z.createElement("section", {
		ref: t,
		"aria-label": b ?? `${x} ${F}`,
		tabIndex: -1,
		"aria-live": "polite",
		"aria-relevant": "additions text",
		"aria-atomic": "false",
		suppressHydrationWarning: !0,
		"data-react-aria-top-layer": !0
	}, T.map((t, n) => {
		let [i, a] = t.split("-");
		return w.length ? /*#__PURE__*/ Z.createElement("ol", {
			key: t,
			dir: _ === "auto" ? Zo() : _,
			tabIndex: -1,
			ref: P,
			className: c,
			"data-sonner-toaster": !0,
			"data-sonner-theme": M,
			"data-y-position": i,
			"data-x-position": a,
			style: {
				"--front-toast-height": `${E[0]?.height || 0}px`,
				"--width": `${Wo}px`,
				"--gap": `${v}px`,
				...m,
				...Qo(l, u)
			},
			onBlur: (e) => {
				L.current && !e.currentTarget.contains(e.relatedTarget) && (L.current = !1, I.current &&= (I.current.focus({ preventScroll: !0 }), null));
			},
			onFocus: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || L.current || (L.current = !0, I.current = e.relatedTarget);
			},
			onMouseEnter: () => k(!0),
			onMouseMove: () => k(!0),
			onMouseLeave: () => {
				A || k(!1);
			},
			onDragEnd: () => k(!1),
			onPointerDown: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || j(!0);
			},
			onPointerUp: () => j(!1)
		}, w.filter((e) => !e.position && n === 0 || e.position === t).map((n, i) => /*#__PURE__*/ Z.createElement(Xo, {
			key: n.id,
			icons: y,
			index: i,
			toast: n,
			defaultRichColors: f,
			duration: g?.duration ?? p,
			className: g?.className,
			descriptionClassName: g?.descriptionClassName,
			invert: r,
			visibleToasts: h,
			closeButton: g?.closeButton ?? s,
			interacting: A,
			position: t,
			style: g?.style,
			unstyled: g?.unstyled,
			classNames: g?.classNames,
			cancelButtonStyle: g?.cancelButtonStyle,
			actionButtonStyle: g?.actionButtonStyle,
			closeButtonAriaLabel: g?.closeButtonAriaLabel,
			removeToast: R,
			toasts: w.filter((e) => e.position == n.position),
			heights: E.filter((e) => e.position == n.position),
			setHeights: D,
			expandByDefault: o,
			gap: v,
			expanded: O,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
});
// src/components/ui/sonner.tsx
vn();
var es = ({ ...e }) => /* @__PURE__ */ (0, X.jsx)($o, {
	theme: "dark",
	className: "toaster group",
	icons: {
		success: /* @__PURE__ */ (0, X.jsx)(fe, { className: "size-4" }),
		info: /* @__PURE__ */ (0, X.jsx)(Je, { className: "size-4" }),
		warning: /* @__PURE__ */ (0, X.jsx)(rn, { className: "size-4" }),
		error: /* @__PURE__ */ (0, X.jsx)(ft, { className: "size-4" }),
		loading: /* @__PURE__ */ (0, X.jsx)(et, { className: "size-4 animate-spin" })
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
// node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs
function ts(e) {
	let t = ns.useContext(rs);
	if (!e && t === void 0) throw Error(Tr(27));
	return t;
}
var ns, rs, is = o((() => {
	Er(), ns = /* @__PURE__ */ u(p(), 1), rs = /*#__PURE__*/ ns.createContext(void 0);
})), as, os, ss = o((() => {
	as = "data-starting-style", os = "data-ending-style";
})), cs, ls, us, ds = o((() => {
	ss(), cs = { [as]: "" }, ls = { [os]: "" }, us = { transitionStatus(e) {
		return e === "starting" ? cs : e === "ending" ? ls : null;
	} };
})), fs, ps, ms, hs = o((() => {
	ss(), fs = "data-open", ps = "data-closed", ms = "data-anchor-hidden";
})), gs, _s, vs = o((() => {
	gs = "data-popup-open", _s = "data-pressed";
})), ys, bs, xs, Ss, Cs, ws, Ts, Es, Ds, Os = o((() => {
	ds(), hs(), vs(), ys = { [gs]: "" }, bs = {
		[gs]: "",
		[_s]: ""
	}, xs = { [fs]: "" }, Ss = { [ps]: "" }, Cs = { [ms]: "" }, ws = { open(e) {
		return e ? ys : null;
	} }, Ts = { open(e) {
		return e ? bs : null;
	} }, Es = {
		open(e) {
			return e ? xs : Ss;
		},
		anchorHidden(e) {
			return e ? Cs : null;
		}
	}, Ds = {
		...Es,
		...us
	};
})), ks, As, js = o((() => {
	ks = /* @__PURE__ */ u(p(), 1), is(), xi(), Os(), As = /*#__PURE__*/ ks.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, forceRender: a = !1, ...o } = e, s = ts(), c = s.useState("open"), l = s.useState("nested"), u = s.useState("mounted");
		return fi("div", e, {
			state: {
				open: c,
				transitionStatus: s.useState("transitionStatus")
			},
			ref: [s.context.backdropRef, t],
			stateAttributesMapping: Ds,
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
	});
})), Ms = o((() => {
	Hr();
}));
// node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
function Ns(e, t, n, r) {
	let i = !1, a = !1, o = r ?? ii;
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
function Ps(e, t, n) {
	let r = n ?? ii;
	return {
		reason: e,
		event: t ?? new Event("base-ui"),
		...r
	};
}
var Fs = o((() => {
	ai();
})), Is, Ls, Rs, zs, Bs, Vs, Hs, Us, Ws, Gs, Ks, qs, Js, Ys, Xs, Zs, Qs, $s, ec, tc = o((() => {
	Is = "none", Ls = "trigger-press", Rs = "trigger-hover", zs = "trigger-focus", Bs = "outside-press", Vs = "item-press", Hs = "close-press", Us = "focus-out", Ws = "escape-key", Gs = "list-navigation", Ks = "keyboard", qs = "pointer", Js = "cancel-open", Ys = "sibling-open", Xs = "disabled", Zs = "missing", Qs = "initial", $s = "imperative-action", ec = "window-resize";
})), nc = o((() => {
	tc();
})), rc, ic, ac = o((() => {
	rc = /* @__PURE__ */ u(p(), 1), is(), xi(), Ms(), Fs(), nc(), ic = /*#__PURE__*/ rc.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, ...s } = e, c = ts(), l = c.useState("open"), { getButtonProps: u, buttonRef: d } = Rr({
			disabled: a,
			native: o
		}), f = { disabled: a };
		function p(e) {
			l && c.setOpen(!1, Ns(Hs, e.nativeEvent));
		}
		return fi("button", e, {
			state: f,
			ref: [t, d],
			props: [
				{ onClick: p },
				s,
				u
			]
		});
	});
}));
// node_modules/@base-ui/utils/useForcedRerendering.mjs
function oc() {
	let [, e] = sc.useState({});
	return sc.useCallback(() => {
		e({});
	}, []);
}
var sc, cc = o((() => {
	sc = /* @__PURE__ */ u(p(), 1);
}));
// node_modules/@base-ui/utils/useId.mjs
function lc(e, t = "mui") {
	let n = dc.useRef(void 0), r = oc(), i = e ?? n.current;
	return dc.useEffect(() => {
		n.current ?? (fc += 1, n.current = `${t}-${fc}`, e ?? r());
	}, [
		e,
		t,
		r
	]), i;
}
function uc(e, t) {
	if (pc !== void 0) {
		let n = pc();
		return e ?? (t ? `${t}-${n}` : n);
	}
	return lc(e, t);
}
var dc, fc, pc, mc = o((() => {
	dc = /* @__PURE__ */ u(p(), 1), qn(), cc(), fc = 0, pc = Kn.useId;
}));
// node_modules/@base-ui/react/internals/useBaseUiId.mjs
function hc(e) {
	return uc(e, "base-ui");
}
var gc = o((() => {
	mc();
})), _c, vc, yc = o((() => {
	_c = /* @__PURE__ */ u(p(), 1), is(), xi(), gc(), vc = /*#__PURE__*/ _c.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, id: a, ...o } = e, s = ts(), c = hc(a);
		return s.useSyncedValueWithCleanup("descriptionElementId", c), fi("p", e, {
			ref: t,
			props: [{ id: c }, o]
		});
	});
}));
// node_modules/@base-ui/utils/useOnMount.mjs
function bc(e) {
	xc.useEffect(e, ri);
}
var xc, Sc = o((() => {
	xc = /* @__PURE__ */ u(p(), 1), ai();
}));
// node_modules/@base-ui/utils/useTimeout.mjs
function Cc() {
	let e = Jn(Tc.create).current;
	return bc(e.disposeEffect), e;
}
var wc, Tc, Ec = o((() => {
	Zn(), Sc(), wc = 0, Tc = class e {
		static create() {
			return new e();
		}
		currentId = wc;
		start(e, t) {
			this.clear(), this.currentId = setTimeout(() => {
				this.currentId = wc, t();
			}, e);
		}
		isStarted() {
			return this.currentId !== wc;
		}
		clear = () => {
			this.currentId !== wc && (clearTimeout(this.currentId), this.currentId = wc);
		};
		disposeEffect = () => this.clear;
	};
}));
// node_modules/@base-ui/utils/platform/shared.mjs
function Dc() {
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
var Oc, kc, Ac, jc, Mc, Nc = o((() => {
	({userAgent: Oc, platform: kc, maxTouchPoints: Ac} = Dc()), jc = Oc.toLowerCase(), Mc = kc.toLowerCase();
})), Pc, Fc, Ic, Lc, Rc, zc = o((() => {
	Nc(), Pc = /^i(os$|p)/.test(Mc) || Mc === "macintel" && Ac > 1, Fc = "android", Ic = Mc === Fc || jc.includes(Fc), Lc = !Pc && Mc.startsWith("mac"), Mc.startsWith("win"), !Ic && /^(linux|chrome os)/.test(Mc), Rc = Lc || Pc;
})), Bc, Vc = o((() => {
	Nc(), Bc = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none"), !Bc && jc.includes("firefox"), !Bc && jc.includes("chrom");
})), Hc, Uc = o((() => {
	zc(), Hc = Rc;
})), Wc, Gc = o((() => {
	Nc(), Wc = /jsdom|happydom/.test(jc);
})), Kc = o((() => {
	zc(), Vc(), Uc(), Gc();
})), qc = o((() => {
	Kc();
}));
// node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function Jc(e) {
	e.preventDefault(), e.stopPropagation();
}
function Yc(e) {
	return "nativeEvent" in e;
}
function Xc(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : Ic && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Zc(e) {
	return Wc ? !1 : !Ic && e.width === 0 && e.height === 0 || e.type === "pointerdown" && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" && (Ic || e.buttons === 0) || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
}
function Qc(e, t) {
	let n = ["mouse", "pen"];
	return t || n.push("", void 0), n.includes(e);
}
function $c(e) {
	let t = e.type;
	return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
var el = o((() => {
	qc();
}));
// node_modules/@base-ui/utils/shadowDom.mjs
function tl(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement != null;) t = t.shadowRoot.activeElement;
	return t;
}
function Q(e, t) {
	if (!e || !t) return !1;
	let n = t.getRootNode?.();
	if (e.contains(t)) return !0;
	if (n && En(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function nl(e, t) {
	let n = e;
	for (; n;) {
		if (wn(n) && n.matches(t)) return n;
		n = n.assignedSlot ?? n.parentNode ?? (En(n) ? n.host : null);
	}
	return null;
}
function rl(e) {
	return "composedPath" in e ? e.composedPath()[0] ?? e.target : e.target;
}
var il = o((() => {
	Wn();
})), al, ol, sl, cl, ll, ul, dl = o((() => {
	al = "data-base-ui-focusable", ol = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", sl = "ArrowLeft", cl = "ArrowRight", ll = "ArrowUp", ul = "ArrowDown";
})), fl, pl = o((() => {
	Os(), fl = "data-trigger-disabled";
}));
// node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function ml(e, t) {
	if (!wn(e)) return !1;
	let n = e;
	if (t.hasElement(n)) return !n.hasAttribute(fl);
	for (let [, e] of t.entries()) if (Q(e, n)) return !e.hasAttribute(fl);
	return !1;
}
function hl(e, t) {
	if (t == null) return !1;
	if ("composedPath" in e) return e.composedPath().includes(t);
	let n = e;
	return n.target != null && t.contains(n.target);
}
function gl(e) {
	return e.matches("html,body");
}
function _l(e) {
	return Tn(e) && e.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function vl(e) {
	return nl(e, `button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${ol}`) != null;
}
function yl(e) {
	return e ? e.getAttribute("role") === "combobox" && _l(e) : !1;
}
function bl(e) {
	if (!e || Wc) return !0;
	try {
		return e.matches(":focus-visible");
	} catch {
		return !0;
	}
}
function xl(e) {
	return e ? e.hasAttribute("data-base-ui-focusable") ? e : e.querySelector("[data-base-ui-focusable]") || e : null;
}
var Sl = o((() => {
	Wn(), qc(), il(), dl(), pl();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverShared.mjs
function Cl(e, t) {
	return t != null && !Qc(t) ? 0 : typeof e == "function" ? e() : e;
}
function wl(e, t, n) {
	let r = Cl(e, n);
	return typeof r == "number" ? r : r?.[t];
}
function Tl(e) {
	return typeof e == "function" ? e() : e;
}
function El(e, t) {
	return t || e === "click" || e === "mousedown";
}
function Dl(e) {
	return e?.includes("mouse") && e !== "mousedown";
}
var Ol = o((() => {
	el(), Sl();
}));
// node_modules/@base-ui/react/floating-ui-react/components/FloatingDelayGroup.mjs
function kl(e, t) {
	e.current = t.current;
}
function Al(e) {
	let { children: t, delay: n, timeoutMs: r = 0 } = e, i = Ml.useRef(n), a = Ml.useRef(n), o = Ml.useRef(null), s = Ml.useRef(null), c = Cc();
	return G(() => {
		a.current = n, o.current ? i.current = {
			open: wl(i.current, "open"),
			close: wl(n, "close")
		} : i.current = n;
	}, [
		n,
		o,
		i,
		a
	]), /*#__PURE__*/ (0, Nl.jsx)(Pl.Provider, {
		value: Ml.useMemo(() => ({
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
function jl(e, t = { open: !1 }) {
	let { open: n } = t, r = e.useState("floatingId"), { currentIdRef: i, delayRef: a, timeoutMs: o, initialDelayRef: s, currentContextRef: c, hasProvider: l, timeout: u } = Ml.useContext(Pl), [d, f] = Ml.useState(!1), p = Ml.useRef(n);
	return G(() => {
		p.current = n;
	}, [n]), G(() => {
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
	]), G(() => {
		if (!n) return;
		let t = c.current, o = i.current;
		u.clear(), c.current = {
			onOpenChange: e.setOpen,
			setIsInstantPhase: f
		}, i.current = r, a.current = {
			open: 0,
			close: wl(s.current, "close")
		}, o !== null && o !== r ? (f(!0), t?.setIsInstantPhase(!0), t?.onOpenChange(!1, Ns(Is))) : (f(!1), t?.setIsInstantPhase(!1));
	}, [
		n,
		r,
		e,
		i,
		a,
		s,
		c,
		u
	]), G(() => () => {
		if (i.current === r) {
			if (c.current = null, !p.current) return;
			i.current = null, kl(a, s), u.clear();
		}
	}, [
		c,
		i,
		a,
		r,
		s,
		u
	]), Ml.useMemo(() => ({
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
var Ml, Nl, Pl, Fl = o((() => {
	Ml = /* @__PURE__ */ u(p(), 1), Ec(), ar(), Ol(), Fs(), nc(), Nl = lo(), Pl = /*#__PURE__*/ Ml.createContext({
		hasProvider: !1,
		timeoutMs: 0,
		delayRef: { current: 0 },
		initialDelayRef: { current: 0 },
		timeout: new Tc(),
		currentIdRef: { current: null },
		currentContextRef: { current: null }
	});
}));
// node_modules/@base-ui/utils/addEventListener.mjs
function $(e, t, n, r) {
	return e.addEventListener(t, n, r), () => {
		e.removeEventListener(t, n, r);
	};
}
var Il = o((() => {}));
// node_modules/@base-ui/utils/mergeCleanups.mjs
function Ll(...e) {
	return () => {
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			n && n();
		}
	};
}
var Rl = o((() => {}));
// node_modules/@base-ui/utils/useValueAsRef.mjs
function zl(e) {
	let t = Jn(Bl, e).current;
	return t.next = e, G(t.effect), t;
}
function Bl(e) {
	let t = {
		current: e,
		next: e,
		effect: () => {
			t.current = t.next;
		}
	};
	return t;
}
var Vl = o((() => {
	ar(), Zn();
}));
// node_modules/@base-ui/utils/useAnimationFrame.mjs
function Hl() {
	let e = Jn(Kl.create).current;
	return bc(e.disposeEffect), e;
}
var Ul, Wl, Gl, Kl, ql = o((() => {
	Zn(), Sc(), Ul = null, globalThis.requestAnimationFrame, Wl = class {
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
	}, Gl = new Wl(), Kl = class e {
		static create() {
			return new e();
		}
		static request(e) {
			return Gl.request(e);
		}
		static cancel(e) {
			return Gl.cancel(e);
		}
		currentId = Ul;
		request(e) {
			this.cancel(), this.currentId = Gl.request(() => {
				this.currentId = Ul, e();
			});
		}
		cancel = () => {
			this.currentId !== Ul && (Gl.cancel(this.currentId), this.currentId = Ul);
		};
		disposeEffect = () => this.cancel;
	};
})), Jl, Yl, Xl, Zl = o((() => {
	Jl = {
		clipPath: "inset(50%)",
		overflow: "hidden",
		whiteSpace: "nowrap",
		border: 0,
		padding: 0,
		width: 1,
		height: 1,
		margin: -1
	}, Yl = {
		...Jl,
		position: "fixed",
		margin: 0,
		top: 0,
		left: 0
	}, Xl = {
		...Jl,
		position: "absolute"
	};
})), Ql, $l, eu, tu = o((() => {
	Ql = /* @__PURE__ */ u(p(), 1), ar(), qc(), Zl(), $l = lo(), eu = /*#__PURE__*/ Ql.forwardRef(function(e, t) {
		let [n, r] = Ql.useState();
		G(() => {
			Hc && Bc && r("button");
		}, []);
		let i = {
			tabIndex: 0,
			role: n
		};
		return /*#__PURE__*/ (0, $l.jsx)("span", {
			...e,
			ref: t,
			style: Yl,
			"aria-hidden": !n || void 0,
			...i,
			"data-base-ui-focus-guard": ""
		});
	});
}));
// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
function nu(e, t, n) {
	return bu(e, yu(t, n));
}
function ru(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function iu(e) {
	return e.split("-")[0];
}
function au(e) {
	return e.split("-")[1];
}
function ou(e) {
	return e === "x" ? "y" : "x";
}
function su(e) {
	return e === "y" ? "height" : "width";
}
function cu(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function lu(e) {
	return ou(cu(e));
}
function uu(e, t, n) {
	n === void 0 && (n = !1);
	let r = au(e), i = lu(e), a = su(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = hu(o)), [o, hu(o)];
}
function du(e) {
	let t = hu(e);
	return [
		fu(e),
		t,
		fu(t)
	];
}
function fu(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
function pu(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Eu : Tu : t ? Tu : Eu;
		case "left":
		case "right": return t ? Du : Ou;
		default: return [];
	}
}
function mu(e, t, n, r) {
	let i = au(e), a = pu(iu(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(fu)))), a;
}
function hu(e) {
	let t = iu(e);
	return wu[t] + e.slice(t.length);
}
function gu(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function _u(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : gu(e);
}
function vu(e) {
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
var yu, bu, xu, Su, Cu, wu, Tu, Eu, Du, Ou, ku = o((() => {
	yu = Math.min, bu = Math.max, xu = Math.round, Su = Math.floor, Cu = (e) => ({
		x: e,
		y: e
	}), wu = {
		left: "right",
		right: "left",
		bottom: "top",
		top: "bottom"
	}, Tu = ["left", "right"], Eu = ["right", "left"], Du = ["top", "bottom"], Ou = ["bottom", "top"];
}));
// node_modules/@base-ui/react/floating-ui-react/utils/composite.mjs
function Au(e, t) {
	return t < 0 || t >= e.length;
}
function ju(e, t) {
	return Pu(e.current, { disabledIndices: t });
}
function Mu(e, t) {
	return Pu(e.current, {
		decrement: !0,
		startingIndex: e.current.length,
		disabledIndices: t
	});
}
function Nu(e, t, n) {
	let { decrement: r, loopFocus: i, allowEscape: a, disabledIndices: o, minIndex: s, maxIndex: c } = n, l = () => Pu(e, {
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
		index: Au(e, u) ? -1 : u,
		wrapped: d
	};
}
function Pu(e, { startingIndex: t = -1, decrement: n = !1, disabledIndices: r, amount: i = 1 } = {}) {
	let a = t;
	do
		a += n ? -i : i;
	while (a >= 0 && a <= e.length - 1 && Fu(e, a, r));
	return a;
}
function Fu(e, t, n) {
	if (typeof n == "function" ? n(t) : n?.includes(t) ?? !1) return !0;
	let r = e[t];
	return r ? !Lu(r) || r.matches(":disabled") ? !0 : !n && (r.hasAttribute("disabled") || r.getAttribute("aria-disabled") === "true") : !1;
}
function Iu(e) {
	return e.visibility === "hidden" || e.visibility === "collapse";
}
function Lu(e, t = e ? Pn(e) : null) {
	return !e || !e.isConnected || !t || Iu(t) ? !1 : typeof e.checkVisibility == "function" ? e.checkVisibility() : t.display !== "none" && t.display !== "contents";
}
var Ru = o((() => {
	Wn();
}));
// node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
function zu(e) {
	let t = e.assignedSlot;
	if (t) return t;
	if (e.parentElement) return e.parentElement;
	let n = e.getRootNode();
	return En(n) ? n.host : null;
}
function Bu(e) {
	for (let t of Array.from(e.children)) if (bn(t) === "summary") return t;
	return null;
}
function Vu(e, t) {
	let n = Bu(t);
	return !!n && (e === n || Q(n, e));
}
function Hu(e) {
	let t = e ? bn(e) : "";
	return e != null && e.matches(sd) && (t !== "summary" || e.parentElement != null && bn(e.parentElement) === "details" && Bu(e.parentElement) === e) && (t !== "details" || Bu(e) == null) && (t !== "input" || e.type !== "hidden");
}
function Uu(e) {
	if (!Hu(e) || !e.isConnected || e.matches(":disabled")) return !1;
	for (let t = e; t; t = zu(t)) {
		let n = t !== e, r = bn(t) === "slot";
		if (t.hasAttribute("inert") || n && bn(t) === "details" && !t.open && !Vu(e, t) || t.hasAttribute("hidden") || !r && !Wu(t, n)) return !1;
	}
	return !0;
}
function Wu(e, t) {
	let n = Pn(e);
	return t ? n.display !== "none" : Lu(e, n);
}
function Gu(e) {
	let t = e.tabIndex;
	if (t < 0) {
		let t = bn(e);
		if (t === "details" || t === "audio" || t === "video" || Tn(e) && e.isContentEditable) return 0;
	}
	return t;
}
function Ku(e) {
	if (bn(e) !== "input") return null;
	let t = e;
	return t.type === "radio" && t.name !== "" ? t : null;
}
function qu(e, t) {
	let n = Ku(e);
	if (!n) return !0;
	let r = t.find((e) => {
		let t = Ku(e);
		return t?.name === n.name && t.form === n.form && t.checked;
	});
	return r ? r === n : t.find((e) => {
		let t = Ku(e);
		return t?.name === n.name && t.form === n.form;
	}) === n;
}
function Ju(e) {
	if (Tn(e) && bn(e) === "slot") {
		let t = e.assignedElements({ flatten: !0 });
		if (t.length > 0) return t;
	}
	return Tn(e) && e.shadowRoot ? Array.from(e.shadowRoot.children) : Array.from(e.children);
}
function Yu(e, t) {
	Ju(e).forEach((e) => {
		Hu(e) && t.push(e), Yu(e, t);
	});
}
function Xu(e, t, n) {
	Ju(e).forEach((e) => {
		Tn(e) && e.matches(t) && n.push(e), Xu(e, t, n);
	});
}
function Zu(e) {
	return Uu(e) && Gu(e) >= 0;
}
function Qu(e) {
	let t = [];
	return Yu(e, t), t.filter(Uu);
}
function $u(e) {
	let t = Qu(e);
	return t.filter((e) => Gu(e) >= 0 && qu(e, t));
}
function ed(e, t) {
	let n = $u(e), r = n.length;
	if (r === 0) return;
	let i = tl(Pr(e)), a = n.indexOf(i);
	return n[a === -1 ? t === 1 ? 0 : r - 1 : a + t];
}
function td(e) {
	return ed(Pr(e).body, 1) || e;
}
function nd(e) {
	return ed(Pr(e).body, -1) || e;
}
function rd(e, t, n) {
	if (!e) return null;
	let r = [];
	Yu(Pr(e).body, r);
	let i = r.indexOf(e);
	if (i === -1) return null;
	let a = r.filter(Uu);
	for (let e = 1; e < r.length; e += 1) {
		let o = r[(i + t * e + r.length) % r.length];
		if (!Q(n, o) && Zu(o) && qu(o, a)) return o;
	}
	return r[i];
}
function id(e, t) {
	let n = t || e.currentTarget, r = e.relatedTarget;
	return !r || !Q(n, r);
}
function ad(e) {
	$u(e).forEach((e) => {
		e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
	});
}
function od(e) {
	let t = [];
	Xu(e, "[data-tabindex]", t), t.forEach((e) => {
		let t = e.dataset.tabindex;
		delete e.dataset.tabindex, t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex");
	});
}
var sd, cd = o((() => {
	Wn(), Fr(), Sl(), Ru(), sd = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
}));
// node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function ld(e, t, n = !0) {
	return e.filter((e) => e.parentId === t).flatMap((t) => [...!n || t.context?.open ? [t] : [], ...ld(e, t.id, n)]);
}
function ud(e, t) {
	let n = [], r = e.find((e) => e.id === t)?.parentId;
	for (; r;) {
		let t = e.find((e) => e.id === r);
		r = t?.parentId, t && (n = n.concat(t));
	}
	return n;
}
var dd = o((() => {}));
// node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function fd(e) {
	return `data-base-ui-${e}`;
}
var pd = o((() => {}));
// node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs
function md(e, t = {}) {
	let { preventScroll: n = !1, sync: r = !1, shouldFocus: i } = t;
	cancelAnimationFrame(hd);
	function a() {
		(!i || i()) && e?.focus({ preventScroll: n });
	}
	if (r) return a(), ni;
	let o = requestAnimationFrame(a);
	return hd = o, () => {
		hd === o && (cancelAnimationFrame(o), hd = 0);
	};
}
var hd, gd = o((() => {
	ai(), hd = 0;
}));
// node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs
function _d(e) {
	return e ? En(e) ? e.host : _d(e.parentNode) : null;
}
function vd(e, t, n, { mark: r = !0 }) {
	let i = Td(t, e), a = r ? Dd(t, Ed(i), new Set(i)) : [], o = [], s = [];
	if (n) {
		let e = Td(t, Array.from(t.querySelectorAll("[aria-live]"))), n = i.concat(e);
		Dd(t, Ed(n), new Set(n)).forEach((e) => {
			let t = e.getAttribute("aria-hidden"), n = t !== null && t !== "false", r = (xd.get(e) || 0) + 1;
			xd.set(e, r), o.push(e), r === 1 && n && Sd.add(e), n || e.setAttribute("aria-hidden", "true");
		});
	}
	return r && a.forEach((e) => {
		let t = (Cd.get(e) || 0) + 1;
		Cd.set(e, t), s.push(e), t === 1 && e.setAttribute(bd, "");
	}), wd += 1, () => {
		o.forEach((e) => {
			let t = (xd.get(e) || 0) - 1;
			xd.set(e, t), t || (Sd.has(e) || e.removeAttribute("aria-hidden"), Sd.delete(e));
		}), r && s.forEach((e) => {
			let t = (Cd.get(e) || 0) - 1;
			Cd.set(e, t), t || e.removeAttribute(bd);
		}), --wd, wd || (xd = /* @__PURE__ */ new WeakMap(), Sd = /* @__PURE__ */ new WeakSet(), Cd = /* @__PURE__ */ new WeakMap());
	};
}
function yd(e, t = {}) {
	let { ariaHidden: n = !1, mark: r = !0 } = t, i = Pr(e[0]).body;
	return vd(e, i, n, { mark: r });
}
var bd, xd, Sd, Cd, wd, Td, Ed, Dd, Od = o((() => {
	Wn(), Fr(), bd = "data-base-ui-inert", xd = /* @__PURE__ */ new WeakMap(), Sd = /* @__PURE__ */ new WeakSet(), Cd = /* @__PURE__ */ new WeakMap(), wd = 0, Td = (e, t) => t.map((t) => {
		if (e.contains(t)) return t;
		let n = _d(t);
		return e.contains(n) ? n : null;
	}).filter((e) => e != null), Ed = (e) => {
		let t = /* @__PURE__ */ new Set();
		return e.forEach((e) => {
			let n = e;
			for (; n && !t.has(n);) t.add(n), n = n.parentNode;
		}), t;
	}, Dd = (e, t, n) => {
		let r = [], i = (e) => {
			e && !n.has(e) && Array.from(e.children).forEach((e) => {
				bn(e) !== "script" && (t.has(e) ? i(e) : r.push(e));
			});
		};
		return i(e), r;
	};
})), kd, Ad, jd, Md, Nd = o((() => {
	kd = { style: { transition: "none" } }, Ad = { fallbackAxisSide: "none" }, jd = { fallbackAxisSide: "end" }, Md = {
		clipPath: "inset(50%)",
		position: "fixed",
		top: 0,
		left: 0
	};
}));
// node_modules/@base-ui/react/floating-ui-react/components/FloatingPortal.mjs
function Pd(e = {}) {
	let { ref: t, container: n, componentProps: r = ii, elementProps: i } = e, a = uc(), o = zd()?.portalNode, [s, c] = Fd.useState(null), [l, u] = Fd.useState(null), d = W((e) => {
		e !== null && u(e);
	}), f = Fd.useRef(null);
	G(() => {
		if (n === null) {
			f.current && (f.current = null, u(null), c(null));
			return;
		}
		let e = (n && (Cn(n) ? n : n.current)) ?? o ?? document.body;
		e == null ? f.current && (f.current = null, u(null), c(null)) : f.current !== e && (f.current = e, u(null), c(e));
	}, [n, o]);
	let p = fi("div", r, {
		ref: [t, d],
		props: [{
			id: a,
			[Bd]: ""
		}, i]
	}), m = s && p ? /*#__PURE__*/ Id.createPortal(p, s) : null;
	return {
		node: l,
		nodeId: /*#__PURE__*/ Fd.isValidElement(p) ? p.props.id : void 0,
		subtree: m
	};
}
var Fd, Id, Ld, Rd, zd, Bd, Vd, Hd = o((() => {
	Fd = /* @__PURE__ */ u(p(), 1), Id = /* @__PURE__ */ u(vo(), 1), Wn(), Il(), Rl(), mc(), ar(), nr(), ai(), tu(), cd(), Fs(), nc(), pd(), xi(), Nd(), Ld = lo(), Rd = /*#__PURE__*/ Fd.createContext(null), zd = () => Fd.useContext(Rd), Bd = fd("portal"), Vd = /*#__PURE__*/ Fd.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, children: a, container: o, portalOwnerRole: s, ...c } = e, { node: l, nodeId: u, subtree: d } = Pd({
			container: o,
			ref: t,
			componentProps: e,
			elementProps: c
		}), f = Fd.useRef(null), p = Fd.useRef(null), m = Fd.useRef(null), h = Fd.useRef(null), [g, _] = Fd.useState(null), v = Fd.useRef(!1), y = g?.modal, b = g?.open, x = !!g && !g.modal && g.open && !!l;
		Fd.useEffect(() => {
			if (!l || y) return;
			function e(e) {
				l && e.relatedTarget && id(e) && (e.type === "focusin" ? v.current &&= (od(l), !1) : (ad(l), v.current = !0));
			}
			return Ll($(l, "focusin", e, !0), $(l, "focusout", e, !0));
		}, [l, y]), G(() => {
			l && b === !0 && v.current && (od(l), v.current = !1);
		}, [b, l]);
		let S = Fd.useMemo(() => ({
			beforeOutsideRef: f,
			afterOutsideRef: p,
			beforeInsideRef: m,
			afterInsideRef: h,
			portalNode: l,
			setFocusManagerState: _
		}), [l]);
		return /*#__PURE__*/ (0, Ld.jsxs)(Fd.Fragment, { children: [d, /*#__PURE__*/ (0, Ld.jsxs)(Rd.Provider, {
			value: S,
			children: [
				x && l && /*#__PURE__*/ (0, Ld.jsx)(eu, {
					"data-type": "outside",
					ref: f,
					onFocus: (e) => {
						id(e, l) ? m.current?.focus() : nd(g ? g.domReference : null)?.focus();
					}
				}),
				x && l && /*#__PURE__*/ (0, Ld.jsx)("span", {
					role: s,
					"aria-owns": u,
					style: Md
				}),
				l && /*#__PURE__*/ Id.createPortal(a, l),
				x && l && /*#__PURE__*/ (0, Ld.jsx)(eu, {
					"data-type": "outside",
					ref: p,
					onFocus: (e) => {
						id(e, l) ? h.current?.focus() : (td(g ? g.domReference : null)?.focus(), g?.closeOnFocusOut && g?.onOpenChange(!1, Ns("focus-out", e.nativeEvent)));
					}
				})
			]
		})] });
	});
}));
// node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function Ud() {
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
var Wd = o((() => {})), Gd, Kd = o((() => {
	Wd(), Gd = class {
		nodesRef = { current: [] };
		events = Ud();
		addNode(e) {
			this.nodesRef.current.push(e);
		}
		removeNode(e) {
			let t = this.nodesRef.current.findIndex((t) => t === e);
			t !== -1 && this.nodesRef.current.splice(t, 1);
		}
	};
}));
// node_modules/@base-ui/react/floating-ui-react/components/FloatingTree.mjs
function qd(e) {
	let t = uc(), n = tf(e), r = ef();
	return G(() => {
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
function Jd(e) {
	let { children: t, id: n } = e, r = ef();
	return /*#__PURE__*/ (0, Zd.jsx)(Qd.Provider, {
		value: Xd.useMemo(() => ({
			id: n,
			parentId: r
		}), [n, r]),
		children: t
	});
}
function Yd(e) {
	let { children: t, externalTree: n } = e, r = Jn(() => n ?? new Gd()).current;
	return /*#__PURE__*/ (0, Zd.jsx)($d.Provider, {
		value: r,
		children: t
	});
}
var Xd, Zd, Qd, $d, ef, tf, nf = o((() => {
	Xd = /* @__PURE__ */ u(p(), 1), mc(), ar(), Zn(), Kd(), Zd = lo(), Qd = /*#__PURE__*/ Xd.createContext(null), $d = /*#__PURE__*/ Xd.createContext(null), ef = () => Xd.useContext(Qd)?.id || null, tf = (e) => {
		let t = Xd.useContext($d);
		return e ?? t;
	};
}));
// node_modules/@base-ui/react/utils/resolveRef.mjs
function rf(e) {
	return e == null ? e : "current" in e ? e.current : e;
}
var af = o((() => {}));
// node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs
function of(e, t) {
	let n = xn(rl(e));
	return e instanceof n.KeyboardEvent ? "keyboard" : e instanceof n.FocusEvent ? t || "keyboard" : "pointerType" in e ? e.pointerType || (Xc(e) ? "keyboard" : t || "mouse") : "touches" in e ? "touch" : e instanceof n.MouseEvent ? t || (e.detail === 0 ? "keyboard" : "mouse") : "";
}
function sf() {
	gf = gf.filter((e) => e.deref()?.isConnected);
}
function cf(e) {
	sf(), e && bn(e) !== "body" && (gf.push(new WeakRef(e)), gf.length > hf && (gf = gf.slice(-20)));
}
function lf() {
	return sf(), gf[gf.length - 1]?.deref();
}
function uf(e) {
	return e ? Zu(e) ? e : $u(e)[0] || e : null;
}
function df(e) {
	if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !e.getAttribute("role")?.includes("dialog")) return;
	let t = Qu(e).filter((e) => {
		let t = e.getAttribute("data-tabindex") || "";
		return Zu(e) || e.hasAttribute("data-tabindex") && !t.startsWith("-");
	}), n = e.getAttribute("tabindex");
	t.length === 0 ? n !== "0" && (e.setAttribute("tabindex", "0"), e.setAttribute("data-tabindex", "0")) : (n !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tabindex", "-1"));
}
function ff(e) {
	let { context: t, children: n, disabled: r = !1, initialFocus: i = !0, returnFocus: a = !0, explicitReturnFocus: o, restoreFocus: s = !1, modal: c = !0, closeOnFocusOut: l = !0, openInteractionType: u = "", nextFocusableElement: d, previousFocusableElement: f, beforeContentFocusGuardRef: p, externalTree: m, getInsideElements: h } = e, g = t.useState("open"), _ = t.useState("domReferenceElement"), v = t.useState("floatingElement"), { events: y, dataRef: b } = t.context, x = W(() => b.current.floatingContext?.nodeId), S = i === !1, C = yl(_) && S, w = zl(i), T = zl(a), E = zl(o), D = zl(u), O = zl(g), k = tf(m), A = zd(), j = pf.useRef(!1), M = pf.useRef(!1), N = pf.useRef(!1), P = pf.useRef(null), F = pf.useRef(""), I = pf.useRef(""), L = pf.useRef(null), R = pf.useRef(null), ee = Ur(L, p, A?.beforeInsideRef), z = Ur(R, A?.afterInsideRef), te = Cc(), B = Cc(), ne = Hl(), re = A != null, V = xl(v), H = W((e = V) => e ? $u(e) : []), ie = W(() => h?.().filter((e) => e != null) ?? []);
	pf.useEffect(() => {
		if (r || !c) return;
		function e(e) {
			e.key === "Tab" && Q(V, tl(Pr(V))) && H().length === 0 && !C && Jc(e);
		}
		return $(Pr(V), "keydown", e);
	}, [
		r,
		V,
		c,
		C,
		H
	]), pf.useEffect(() => {
		if (r || !g) return;
		let e = Pr(V);
		function t() {
			N.current = !1;
		}
		function n(e) {
			let t = rl(e), n = ie(), r = Q(v, t) || Q(_, t) || Q(A?.portalNode, t) || n.some((e) => e === t || Q(e, t));
			N.current = !r, I.current = e.pointerType || "keyboard", nl(t, "[data-base-ui-click-trigger]") && (M.current = !0, B.start(0, () => {
				M.current = !1;
			}));
		}
		function i() {
			I.current = "keyboard";
		}
		return Ll($(e, "pointerdown", n, !0), $(e, "pointerup", t, !0), $(e, "pointercancel", t, !0), $(e, "keydown", i, !0), t);
	}, [
		r,
		v,
		_,
		V,
		g,
		A,
		B,
		ie
	]), pf.useEffect(() => {
		if (r || !l) return;
		let e = Pr(V);
		function n() {
			M.current = !0, B.start(0, () => {
				M.current = !1;
			});
		}
		function i(e) {
			let t = rl(e);
			Zu(t) && (P.current = t);
		}
		function a(n) {
			let r = n.relatedTarget, i = n.currentTarget, a = rl(n);
			c && r == null && a != null && Q(v, a) && cf(a), queueMicrotask(() => {
				let o = x(), l = t.context.triggerElements, u = ie(), p = r?.hasAttribute(fd("focus-guard")) && [
					L.current,
					R.current,
					A?.beforeInsideRef.current,
					A?.afterInsideRef.current,
					A?.beforeOutsideRef.current,
					A?.afterOutsideRef.current,
					rf(f),
					rf(d)
				].includes(r), m = !(Q(_, r) || Q(v, r) || Q(r, v) || Q(A?.portalNode, r) || u.some((e) => e === r || Q(e, r)) || l.hasMatchingElement((e) => Q(e, r)) || p || k && (ld(k.nodesRef.current, o).find((e) => Q(e.context?.elements.floating, r) || Q(e.context?.elements.domReference, r)) || ud(k.nodesRef.current, o).find((e) => [e.context?.elements.floating, xl(e.context?.elements.floating)].includes(r) || e.context?.elements.domReference === r)));
				if (i === _ && V && df(V), s && i !== _ && !Lu(a) && tl(e) === e.body) {
					if (Tn(V) && (V.focus(), s === "popup")) {
						ne.request(() => {
							V.focus();
						});
						return;
					}
					let e = H(), t = P.current, n = (t && e.includes(t) ? t : null) || e[e.length - 1] || V;
					Tn(n) && n.focus();
				}
				b.current.insideReactTree ? b.current.insideReactTree = !1 : (C || !c) && r && m && !M.current && (C || r !== lf()) && (j.current = !0, t.setOpen(!1, Ns(Us, n)));
			});
		}
		function o() {
			N.current || (b.current.insideReactTree = !0, te.start(0, () => {
				b.current.insideReactTree = !1;
			}));
		}
		let u = Tn(_) ? _ : null;
		if (v || u) return Ll(u && $(u, "focusout", a), u && $(u, "pointerdown", n), v && $(v, "focusin", i), v && $(v, "focusout", a), v && A && $(v, "focusout", o, !0));
	}, [
		r,
		_,
		v,
		V,
		c,
		k,
		A,
		t,
		l,
		s,
		H,
		C,
		x,
		b,
		te,
		B,
		ne,
		d,
		f,
		ie
	]), pf.useEffect(() => {
		if (r || !v || !g) return;
		let e = Array.from(A?.portalNode?.querySelectorAll(`[${fd("portal")}]`) || []), t = (k ? ud(k.nodesRef.current, x()) : []).find((e) => yl(e.context?.elements.domReference || null))?.context?.elements.domReference, n = yd([
			v,
			...e,
			L.current,
			R.current,
			A?.beforeOutsideRef.current,
			A?.afterOutsideRef.current,
			...ie(),
			t,
			rf(f),
			rf(d),
			C ? _ : null
		].filter((e) => e != null), {
			ariaHidden: c || C,
			mark: !1
		}), i = yd([v, ...e].filter((e) => e != null));
		return () => {
			i(), n();
		};
	}, [
		g,
		r,
		_,
		v,
		c,
		A,
		C,
		k,
		x,
		d,
		f,
		ie
	]), G(() => {
		if (!g || r || !Tn(V)) return;
		F.current = "", I.current = "";
		let e = Pr(V), t = tl(e);
		queueMicrotask(() => {
			let n = w.current, r = typeof n == "function" ? n(D.current || "") : n;
			if (r === void 0 || r === !1 || Q(V, t)) return;
			let i = null, a = () => (i ??= H(V), i[0] || V), o;
			o = r === !0 || r === null ? a() : rf(r), o ||= a();
			let s = Q(V, tl(e)), c = b.current.openEvent, l = c?.type === "mousedown" && Xc(c);
			md(o, {
				sync: l,
				preventScroll: o === V,
				shouldFocus() {
					if (!O.current) return !1;
					if (s) return !0;
					let t = tl(e);
					return !(t !== o && Q(V, t));
				}
			});
		});
	}, [
		r,
		g,
		V,
		H,
		w,
		D,
		O,
		b
	]);
	let ae = pf.useRef(null);
	G(() => {
		if (r || !V) {
			ae.current = null;
			return;
		}
		ae.current &&= (ae.current.cancelled = !0, null);
		let e = Pr(V), t = tl(e), n = D.current == null;
		cf(t);
		function i(e) {
			if (e.open || (F.current = of(e.nativeEvent, I.current)), (e.reason === "focus-out" && e.triggerElement?.hasAttribute(fd("focus-guard")) || e.reason === "trigger-hover" && e.nativeEvent.type === "mouseleave") && (j.current = !0), e.reason === "outside-press") {
				if (e.nested) j.current = !1;
				else if (Xc(e.nativeEvent) || Zc(e.nativeEvent)) j.current = !1;
				else {
					let e = !1;
					Pr(V).createElement("div").focus({ get preventScroll() {
						return e = !0, !1;
					} }), e ? j.current = !1 : j.current = !0;
				}
			}
		}
		y.on("openchange", i);
		function a(e) {
			let r = T.current, i = typeof r == "function" ? r(e) : r;
			if (i === void 0 || i === !1) return null;
			i === null && (i = !0);
			let a = _?.isConnected ? _ : null, o = t?.isConnected && bn(t) !== "body" ? t : null, s = n ? o || a : a || o;
			return s ||= lf() || null, typeof i == "boolean" ? s : rf(i) || s || null;
		}
		return () => {
			y.off("openchange", i);
			let t = tl(e), n = ie(), r = Q(v, t) || n.some((e) => e === t || Q(e, t)) || k && ld(k.nodesRef.current, x(), !1).some((e) => Q(e.context?.elements.floating, t)), o = T.current, s = F.current, c = a(s), l = { cancelled: !1 };
			ae.current = l, queueMicrotask(() => {
				ae.current === l && (ae.current = null);
				let n = uf(c), i = E.current ?? typeof o != "boolean";
				if (!l.cancelled && o && !j.current && Tn(n) && (i || n === t || t === e.body || r)) {
					let e = { preventScroll: !0 };
					s === "keyboard" && (e.focusVisible = !0), n.focus(e);
				}
				j.current = !1;
			});
		};
	}, [
		r,
		v,
		V,
		T,
		E,
		D,
		y,
		k,
		_,
		x,
		ie
	]), G(() => {
		if (!Bc || g || !v) return;
		let e = tl(Pr(v));
		Tn(e) && _l(e) && Q(v, e) && e.blur();
	}, [g, v]), G(() => {
		if (!r && A) return A.setFocusManagerState({
			modal: c,
			closeOnFocusOut: l,
			open: g,
			onOpenChange: t.setOpen,
			domReference: _
		}), () => {
			A.setFocusManagerState(null);
		};
	}, [
		r,
		A,
		c,
		g,
		t,
		l,
		_
	]), G(() => {
		if (!r && V) return df(V), () => {
			queueMicrotask(sf);
		};
	}, [r, V]);
	let U = !r && (!c || !C) && (re || c);
	return /*#__PURE__*/ (0, mf.jsxs)(pf.Fragment, { children: [
		U && /*#__PURE__*/ (0, mf.jsx)(eu, {
			"data-type": "inside",
			ref: ee,
			onFocus: (e) => {
				if (c) {
					let e = H();
					md(e[e.length - 1]);
				} else A?.portalNode && (j.current = !1, id(e, A.portalNode) ? td(_)?.focus() : rf(f ?? A.beforeOutsideRef)?.focus());
			}
		}),
		n,
		U && /*#__PURE__*/ (0, mf.jsx)(eu, {
			"data-type": "inside",
			ref: z,
			onFocus: (e) => {
				c ? md(H()[0]) : A?.portalNode && (l && (j.current = !0), id(e, A.portalNode) ? nd(_)?.focus() : rf(d ?? A.afterOutsideRef)?.focus());
			}
		})
	] });
}
var pf, mf, hf, gf, _f = o((() => {
	pf = /* @__PURE__ */ u(p(), 1), Wn(), Il(), Rl(), Yr(), Vl(), nr(), ar(), Ec(), qc(), ql(), Fr(), tu(), Sl(), el(), cd(), dd(), Ru(), Fs(), nc(), pd(), gd(), Od(), Hd(), nf(), Nd(), af(), mf = lo(), hf = 20, gf = [];
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs
function vf(e, t = {}) {
	let { enabled: n = !0, event: r = "click", toggle: i = !0, ignoreMouse: a = !1, stickIfOpen: o = !0, touchOpenDelay: s = 0, reason: c = Ls } = t, l = e.context.dataRef, u = yf.useRef(void 0), d = Hl(), f = Cc(), p = yf.useMemo(() => {
		function t(t, n, r, i) {
			let a = Ns(c, n, r);
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
				u.current = Qc(e.pointerType, !0) && Zc(e.nativeEvent) ? "virtual" : e.pointerType;
			},
			onMouseDown(i) {
				let o = u.current, s = i.nativeEvent, c = e.select("open");
				if (i.button !== 0 || r === "click" || Qc(o, !0) && a) return;
				let l = n(c, i.currentTarget, (e) => e === "click" || e === "mousedown"), f = rl(s), p = _l(f);
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
				r === "mousedown" && o ? u.current = void 0 : Qc(o, !0) && a || t(n(e.select("open"), i.currentTarget, (e) => e === "click" || e === "mousedown" || e === "keydown" || e === "keyup"), i.nativeEvent, i.currentTarget, o);
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
	return yf.useMemo(() => n ? { reference: p } : ii, [n, p]);
}
var yf, bf = o((() => {
	yf = /* @__PURE__ */ u(p(), 1), ql(), Ec(), ai(), Sl(), el(), Fs(), nc();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useClientPoint.mjs
function xf(e, t) {
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
function Sf(e) {
	return e != null && e.clientX != null;
}
function Cf(e, t = {}) {
	let { enabled: n = !0, axis: r = "both" } = t, i = e.useState("open"), a = e.useState("floatingElement"), o = e.useState("domReferenceElement"), s = e.context.dataRef, c = wf.useRef(!1), l = wf.useRef(null), [u, d] = wf.useState(), [f, p] = wf.useState([]), m = W((t) => {
		e.set("positionReference", t);
	}), h = W((t, n, i) => {
		c.current || (!s.current.openEvent || Sf(s.current.openEvent)) && e.set("positionReference", xf(i ?? o, {
			x: t,
			y: n,
			axis: r,
			dataRef: s,
			pointerType: u
		}));
	}), g = W((e) => {
		i ? l.current || (h(e.clientX, e.clientY, e.currentTarget), p([])) : h(e.clientX, e.clientY, e.currentTarget);
	}), _ = Qc(u) ? a : i;
	wf.useEffect(() => {
		if (!n) {
			m(o);
			return;
		}
		if (!_) return;
		function e() {
			l.current?.(), l.current = null;
		}
		let t = xn(a);
		function r(t) {
			let n = rl(t);
			Q(a, n) ? e() : h(t.clientX, t.clientY);
		}
		return !s.current.openEvent || Sf(s.current.openEvent) ? l.current = $(t, "mousemove", r) : m(o), e;
	}, [
		_,
		n,
		a,
		s,
		o,
		e,
		h,
		m,
		f
	]), wf.useEffect(() => () => {
		e.set("positionReference", null);
	}, [e]), wf.useEffect(() => {
		n && !a && (c.current = !1);
	}, [n, a]), wf.useEffect(() => {
		!n && i && (c.current = !0);
	}, [n, i]);
	let v = wf.useMemo(() => {
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
	return wf.useMemo(() => n ? {
		reference: v,
		trigger: v
	} : {}, [n, v]);
}
var wf, Tf = o((() => {
	wf = /* @__PURE__ */ u(p(), 1), Il(), nr(), Wn(), Sl(), el();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs
function Ef() {
	return !1;
}
function Df(e) {
	return {
		escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? !1,
		outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? !0
	};
}
function Of(e, t = {}) {
	let { enabled: n = !0, escapeKey: r = !0, outsidePress: i = !0, outsidePressEvent: a = "sloppy", referencePress: o = Ef, bubbles: s, externalTree: c } = t, l = e.useState("open"), u = e.useState("floatingElement"), { dataRef: d, events: f } = e.context, p = tf(c), m = W(typeof i == "function" ? i : () => !1), h = typeof i == "function" ? m : i, g = h !== !1, _ = W(() => a), { escapeKey: v, outsidePress: y } = Df(s), b = kf.useRef(!1), x = kf.useRef(!1), S = kf.useRef(!1), C = kf.useRef(!1), w = kf.useRef(!1), T = kf.useRef(""), E = kf.useRef(null), D = Cc(), O = Cc(), k = Cc(), A = W(() => {
		O.clear(), d.current.insideReactTree = !1;
	}), j = W((e) => {
		let t = d.current.floatingContext?.nodeId;
		return (p ? ld(p.nodesRef.current, t) : []).some((t) => t.context?.open && !t.context.dataRef.current[e]);
	}), M = W((t) => hl(t, e.select("floatingElement")) || hl(t, e.select("domReferenceElement"))), N = W((t) => {
		o() && e.setOpen(!1, Ns(Ls, t.nativeEvent));
	}), P = W((t) => {
		if (!l || !n || !r || t.key !== "Escape") return;
		let i = Yc(t) ? t.nativeEvent : t;
		if (w.current || i.isComposing || !v && j("__escapeKeyBubbles")) return;
		let a = Ns(Ws, i);
		e.setOpen(!1, a), a.isCanceled || t.preventDefault(), !v && !a.isPropagationAllowed && t.stopPropagation();
	}), F = W(() => {
		d.current.insideReactTree = !0, O.start(0, A);
	}), I = W((t) => {
		if (!l || !n || t.button !== 0) return;
		let r = rl(t.nativeEvent);
		Q(e.select("floatingElement"), r) && (b.current || (b.current = !0, x.current = !1));
	}), L = W((e) => {
		l && n && (e.defaultPrevented || e.nativeEvent.defaultPrevented) && b.current && (x.current = !0);
	});
	kf.useEffect(() => {
		function e(e) {
			e.open || (C.current = !1);
		}
		return f.on("openchange", e), () => {
			f.off("openchange", e);
		};
	}, [f]), kf.useEffect(() => A, [A]), kf.useEffect(() => {
		if (!l || !n) return l || (C.current = !1, w.current = !1, T.current = "", E.current = null), A;
		d.current.__escapeKeyBubbles = v, d.current.__outsidePressBubbles = y;
		let t = new Tc(), i = Pr(u);
		function a() {
			k.clear(), w.current = !0;
		}
		function o() {
			w.current = !0, k.start(Bc ? 5 : 0, () => {
				w.current = !1;
			});
		}
		function s() {
			S.current = !0, t.start(0, () => {
				S.current = !1;
			});
		}
		function c() {
			b.current = !1, x.current = !1;
		}
		function f() {
			let e = T.current, t = e === "pen" || !e ? "mouse" : e, n = _(), r = typeof n == "function" ? n() : n;
			return typeof r == "string" ? r : r[t];
		}
		function m(e) {
			let t = f();
			return t === "intentional" && e.type !== "click" || t === "sloppy" && e.type === "click";
		}
		function O(e) {
			let t = d.current.floatingContext?.nodeId, n = p && ld(p.nodesRef.current, t).some((t) => hl(e, t.context?.elements.floating));
			return M(e) || n;
		}
		function N(n) {
			if (m(n)) {
				n.type !== "click" && !M(n) && (t.clear(), S.current = !1), A();
				return;
			}
			if (d.current.insideReactTree) {
				A();
				return;
			}
			let r = rl(n), i = `[${fd("inert")}]`, a = wn(r) ? r.getRootNode() : null, o = Array.from((En(a) ? a : Pr(e.select("floatingElement"))).querySelectorAll(i)), s = e.context.triggerElements;
			if (r && (s.hasElement(r) || s.hasMatchingElement((e) => Q(e, r)))) return;
			let c = wn(r) ? r : null;
			for (; c && !Nn(c);) {
				let e = In(c);
				if (Nn(e) || !wn(e)) break;
				c = e;
			}
			if (!(o.length && wn(r) && !gl(r) && !Q(r, e.select("floatingElement")) && o.every((e) => !Q(c, e)))) {
				if (Tn(r) && !("touches" in n)) {
					let e = Nn(r), t = Pn(r), i = /auto|scroll/, a = e || i.test(t.overflowX), o = e || i.test(t.overflowY), s = a && r.clientWidth > 0 && r.scrollWidth > r.clientWidth, c = o && r.clientHeight > 0 && r.scrollHeight > r.clientHeight, l = t.direction === "rtl", u = c && (l ? n.offsetX <= r.offsetWidth - r.clientWidth : n.offsetX > r.clientWidth), d = s && n.offsetY > r.clientHeight;
					if (u || d) return;
				}
				if (!O(n)) {
					if (f() === "intentional") {
						if (n.detail !== 0 && !Xc(n) && !C.current) return;
						if (S.current) {
							t.clear(), S.current = !1;
							return;
						}
					}
					typeof h == "function" && !h(n) || j("__outsidePressBubbles") || (e.setOpen(!1, Ns(Bs, n)), A());
				}
			}
		}
		function F(t) {
			f() === "sloppy" && t.pointerType !== "touch" && e.select("open") && n && !M(t) && N(t);
		}
		function I(t) {
			if (f() !== "sloppy" || !e.select("open") || !n || M(t)) return;
			let r = t.touches[0];
			r && (E.current = {
				startTime: Date.now(),
				startX: r.clientX,
				startY: r.clientY,
				dismissOnTouchEnd: !1,
				dismissOnMouseDown: !0
			}, D.start(1e3, () => {
				E.current && (E.current.dismissOnTouchEnd = !1, E.current.dismissOnMouseDown = !1);
			}));
		}
		function L(e, t) {
			let n = rl(e);
			if (!n) return;
			let r = $(n, e.type, () => {
				t(e), r();
			});
		}
		function R(e) {
			T.current = "touch", L(e, I);
		}
		function ee(e) {
			D.clear(), e.type === "pointerdown" && (e.button === 0 && (C.current = !0), T.current = e.pointerType), (e.type !== "mousedown" || !E.current || E.current.dismissOnMouseDown) && L(e, (e) => {
				e.type === "pointerdown" ? F(e) : N(e);
			});
		}
		function z(e) {
			if (e.type === "pointercancel" && (C.current = !1), !b.current) return;
			let n = x.current;
			c(), f() === "intentional" && (e.type === "pointercancel" ? n && s() : O(e) || (n ? s() : (typeof h != "function" || h(e)) && (t.clear(), S.current = !0, A())));
		}
		function te(e) {
			if (f() !== "sloppy" || !E.current || M(e)) return;
			let t = e.touches[0];
			if (!t) return;
			let n = Math.abs(t.clientX - E.current.startX), r = Math.abs(t.clientY - E.current.startY), i = Math.sqrt(n * n + r * r);
			i > 5 && (E.current.dismissOnTouchEnd = !0), i > 10 && (N(e), D.clear(), E.current = null);
		}
		function B(e) {
			L(e, te);
		}
		function ne(e) {
			f() === "sloppy" && E.current && !M(e) && (E.current.dismissOnTouchEnd && N(e), D.clear(), E.current = null);
		}
		function re(e) {
			L(e, ne);
		}
		let V = Ll(r && Ll($(i, "keydown", P), $(i, "compositionstart", a), $(i, "compositionend", o)), g && Ll($(i, "click", ee, !0), $(i, "pointerdown", ee, !0), $(i, "pointerup", z, !0), $(i, "pointercancel", z, !0), $(i, "mousedown", ee, !0), $(i, "mouseup", z, !0), $(i, "touchstart", R, {
			capture: !0,
			passive: !0
		}), $(i, "touchmove", B, {
			capture: !0,
			passive: !0
		}), $(i, "touchend", re, {
			capture: !0,
			passive: !0
		})));
		return () => {
			V(), t.clear(), c(), S.current = !1;
		};
	}, [
		d,
		u,
		r,
		g,
		h,
		l,
		n,
		v,
		y,
		P,
		A,
		_,
		j,
		M,
		p,
		e,
		D,
		k
	]);
	let R = kf.useMemo(() => ({
		onKeyDown: P,
		onPointerDown: N,
		onClick: N
	}), [P, N]), ee = kf.useMemo(() => ({
		onKeyDown: P,
		onPointerDown: L,
		onMouseDown: L,
		onClickCapture: F,
		onMouseDownCapture(e) {
			F(), I(e);
		},
		onPointerDownCapture(e) {
			F(), I(e);
		},
		onMouseUpCapture: F,
		onTouchEndCapture: F,
		onTouchMoveCapture: F
	}), [
		P,
		F,
		I,
		L
	]);
	return kf.useMemo(() => n ? {
		reference: R,
		floating: ee,
		trigger: R
	} : {}, [
		n,
		R,
		ee
	]);
}
var kf, Af = o((() => {
	kf = /* @__PURE__ */ u(p(), 1), Il(), Rl(), Fr(), nr(), Ec(), Wn(), qc(), nf(), Fs(), nc(), pd(), Sl(), el(), dd();
})), jf = o((() => {})), Mf = o((() => {}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useSyncedFloatingRootContext.mjs
function Nf(e) {
	let { popupStore: t, treatPopupAsFloatingElement: n = !1, floatingRootContext: r, floatingId: i, nested: a, onOpenChange: o } = e, s = t.useState("open"), c = t.useState("activeTriggerElement"), l = t.useState(n ? "popupElement" : "positionerElement"), u = o;
	return t.useSyncedValue("floatingId", i), G(() => {
		let e = {
			open: s,
			floatingId: i,
			referenceElement: c,
			floatingElement: l
		};
		wn(c) && (e.domReferenceElement = c), r.state.positionReference === r.state.referenceElement && (e.positionReference = c), r.update(e);
	}, [
		s,
		i,
		c,
		l,
		r
	]), r.context.onOpenChange = u, r.context.nested = a, r;
}
var Pf = o((() => {
	ar(), Wn();
}));
// node_modules/@base-ui/react/internals/useTransitionStatus.mjs
function Ff(e, t = !1, n = !1, r = !1) {
	let [i, a] = If.useState(e && t ? "idle" : void 0), [o, s] = If.useState(e && !r);
	return e && !o && (s(!0), a("starting")), !e && o && i !== "ending" && !n && a("ending"), !e && !o && i === "ending" && a(void 0), G(() => {
		if (!e && o && i !== "ending" && n) {
			let e = Kl.request(() => {
				a("ending");
			});
			return () => {
				Kl.cancel(e);
			};
		}
	}, [
		e,
		o,
		i,
		n
	]), G(() => {
		if (!e || t || i === void 0) return;
		let n = Kl.request(() => {
			a(void 0);
		});
		return () => {
			Kl.cancel(n);
		};
	}, [
		t,
		e,
		i
	]), G(() => {
		if (!e || !t) return;
		e && o && i !== "idle" && a("starting");
		let n = Kl.request(() => {
			a("idle");
		});
		return () => {
			Kl.cancel(n);
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
var If, Lf = o((() => {
	If = /* @__PURE__ */ u(p(), 1), ar(), ql();
}));
// node_modules/@base-ui/react/utils/getFiniteAnimations.mjs
function Rf(e, t) {
	return e.getAnimations(t).filter((e) => {
		let t = e.effect?.getTiming();
		return t?.duration !== Infinity && t?.iterations !== Infinity;
	});
}
var zf = o((() => {}));
// node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
function Bf(e) {
	if (!Uf) {
		let e = [];
		Uf = e, queueMicrotask(() => {
			Uf = null, Hf.flushSync(() => {
				for (let t of e) t();
			});
		});
	}
	Uf.push(e);
}
function Vf(e, t = !1, n = !1) {
	let r = Hl();
	return W((i, a = null) => {
		r.cancel();
		let o = rf(e);
		if (o == null) return;
		let s = o, c = () => {
			n ? Bf(() => {
				a?.aborted || i();
			}) : Hf.flushSync(i);
		};
		if (typeof s.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
			i();
			return;
		}
		function l() {
			Promise.all(Rf(s).map((e) => e.finished.then(ni))).then(() => {
				a?.aborted || c();
			}, () => {
				a?.aborted || (Rf(s).some((e) => e.pending || e.playState !== "finished") ? l() : c());
			});
		}
		if (t) {
			let e = as;
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
var Hf, Uf, Wf = o((() => {
	Hf = /* @__PURE__ */ u(vo(), 1), ql(), nr(), ai(), af(), zf(), ss(), Uf = null;
}));
// node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs
function Gf(e) {
	let { enabled: t = !0, open: n, ref: r, batch: i = !1, onComplete: a } = e, o = W(a), s = Vf(r, n, i);
	Kf.useEffect(() => {
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
var Kf, qf = o((() => {
	Kf = /* @__PURE__ */ u(p(), 1), nr(), Wf();
}));
// node_modules/@base-ui/react/internals/useUnmountAfterClose.mjs
function Jf(e) {
	let { open: t, ref: n, preventUnmountOnClose: r, setPreventUnmountOnClose: i, onUnmount: a, animateInitialOpen: o } = e, s = W(i), { mounted: c, setMounted: l, transitionStatus: u } = Ff(t, !1, !1, o), d = !t && r;
	G(() => {
		t && s(!1);
	}, [t, s]);
	let f = Yf.useRef(c), p = Yf.useRef(!1), m = oc(), h = () => {
		f.current = !1, l(!1), a();
	};
	G(() => {
		f.current = c, p.current && (p.current = !1, !t && c && h());
	});
	let g = W(() => {
		f.current && (t ? (p.current = !0, m()) : h());
	});
	return Gf({
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
var Yf, Xf = o((() => {
	Yf = /* @__PURE__ */ u(p(), 1), nr(), ar(), cc(), Lf(), qf();
}));
// node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs
function Zf(e) {
	return (t) => t !== "touch" || e.current;
}
function Qf(e, t = !1) {
	let n = uc(), r = ef() != null, i = Jn(() => e(n, r)).current;
	return Nf({
		popupStore: i,
		treatPopupAsFloatingElement: t,
		floatingRootContext: i.state.floatingRootContext,
		floatingId: n,
		nested: r,
		onOpenChange: i.setOpen
	}), i;
}
function $f({ handle: e, store: t }) {
	return G(() => e.attachStore(t), [e, t]), null;
}
function ep(e) {
	let t = e.context.triggerElements.size;
	e.select("open") && e.state.triggerCount !== t && e.set("triggerCount", t);
}
function tp(e, t) {
	let n = up.useRef(null);
	return W((r) => {
		let i = n.current;
		if (i !== null) {
			if (i.element === r && i.store === t && i.id === e) return;
			n.current = null;
			let a = i.store;
			a.context.triggerElements.getById(i.id) === i.element && (a.context.triggerElements.delete(i.id), ep(a));
		}
		r !== null && e !== void 0 && (n.current = {
			store: t,
			id: e,
			element: r
		}, t.context.triggerElements.add(e, r), ep(t));
	});
}
function np(e, t, n, r = !1) {
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
function rp(e) {
	let t = !1;
	return e.preventUnmountOnClose = () => {
		t = !0;
	}, () => t;
}
function ip(e, t, n, r = {}) {
	let i = n.reason, a = i === Rs, o = t && i === "trigger-focus", s = !t && (i === "trigger-press" || i === "escape-key"), c = rp(n);
	if (e.context.onOpenChange?.(t, n), n.isCanceled) return;
	r.onBeforeDispatch?.(), e.state.floatingRootContext.dispatchOpenChange(t, n);
	let l = () => {
		let i = np(e.state, t, n.trigger, c()), l = {
			...r.extraState,
			...i
		};
		o ? l.instantType = "focus" : s ? l.instantType = "dismiss" : a && (l.instantType = void 0), e.update(l);
	};
	a ? dp.flushSync(l) : l();
}
function ap(e, t, n, r) {
	let i = n.useState("isMountedByTrigger", e), a = tp(e, n), o = W((t) => {
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
	}), s = W((e) => {
		a(e), e && o(e);
	});
	return G(() => (s(t.current), () => s(null)), [
		s,
		t,
		n,
		e
	]), G(() => {
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
function op(e, t = {}) {
	let { closeOnActiveTriggerUnmount: n = !1 } = t, r = up.useRef(null), i = e.useState("open"), a = e.useState("triggerCount"), o = e.useState("activeTriggerId"), s = e.useState("activeTriggerElement");
	G(() => {
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
				let t = Ns(Is);
				e.setOpen(!1, t), t.isCanceled || e.update({
					activeTriggerId: null,
					activeTriggerElement: null
				});
			}
		});
	}, [
		i,
		e,
		a,
		o,
		s,
		n
	]);
}
function sp(e, t, n, r) {
	let { mounted: i, transitionStatus: a, forceUnmount: o } = Jf({
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
	return Jn(() => (t.set("mounted", i), null)), t.useSyncedValues({
		mounted: i,
		transitionStatus: a
	}), {
		forceUnmount: o,
		transitionStatus: a
	};
}
function cp(e, t) {
	e.useSyncedValues(t), G(() => () => {
		e.update({
			activeTriggerProps: ii,
			inactiveTriggerProps: ii,
			popupProps: ii
		});
	}, [e]);
}
function lp(e, t) {
	G(() => {
		!t && e.state.openMethod !== null && e.set("openMethod", null);
	}, [t, e]), G(() => () => {
		e.state.openMethod !== null && e.set("openMethod", null);
	}, [e]);
}
var up, dp, fp, pp = o((() => {
	up = /* @__PURE__ */ u(p(), 1), dp = /* @__PURE__ */ u(vo(), 1), ai(), mc(), nr(), ar(), Zn(), dl(), nf(), Pf(), Xf(), Fs(), nc(), fp = {
		tabIndex: -1,
		[al]: ""
	};
})), mp, hp = o((() => {
	mp = class {
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
	};
})), gp = o((() => {})), _p = o((() => {})), vp = /* @__PURE__ */ s(((e) => {
	var t = p();
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
})), yp = /* @__PURE__ */ s(((e, t) => {
	t.exports = vp();
})), bp = /* @__PURE__ */ s(((e) => {
	var t = p(), n = yp();
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
})), xp = /* @__PURE__ */ s(((e, t) => {
	t.exports = bp();
}));
// node_modules/@base-ui/utils/fastHooks.mjs
function Sp() {
	return kp;
}
function Cp(e) {
	Op.push(e);
}
function wp(e) {
	let t = (t, n) => {
		let r = Jn(Ep).current, i;
		try {
			kp = r;
			for (let e of Op) e.before(r);
			i = e(t, n);
			for (let e of Op) e.after(r);
			r.didInitialize = !0;
		} finally {
			kp = void 0;
		}
		return i;
	};
	return t.displayName = e.displayName || e.name, t;
}
function Tp(e) {
	return /*#__PURE__*/ Dp.forwardRef(wp(e));
}
function Ep() {
	return { didInitialize: !1 };
}
var Dp, Op, kp, Ap = o((() => {
	Dp = /* @__PURE__ */ u(p(), 1), Zn(), Op = [], kp = void 0;
}));
// node_modules/@base-ui/utils/store/useStore.mjs
function jp(e, t, n, r, i) {
	return Rp(e, t, n, r, i);
}
function Mp(e, t, n, r, i) {
	let a = Fp.useCallback(() => t(e.getSnapshot(), n, r, i), [
		e,
		t,
		n,
		r,
		i
	]);
	return (0, Ip.useSyncExternalStore)(e.subscribe, a, a);
}
function Np(e, t, n, r, i) {
	let a = Sp();
	if (!a) return Mp(e, t, n, r, i);
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
function Pp(e, t, n, r, i) {
	return (0, Lp.useSyncExternalStoreWithSelector)(e.subscribe, e.getSnapshot, e.getSnapshot, (e) => t(e, n, r, i));
}
var Fp, Ip, Lp, Rp, zp = o((() => {
	Fp = /* @__PURE__ */ u(p(), 1), Ip = yp(), Lp = xp(), Qr(), Ap(), Rp = Xr(19) ? Np : Pp, Cp({
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
			}), (0, Ip.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot));
		}
	});
})), Bp, Vp = o((() => {
	zp(), Bp = class {
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
			return jp(this, e, t, n, r);
		}
	};
})), Hp, Up, Wp = o((() => {
	Hp = /* @__PURE__ */ u(p(), 1), Vp(), zp(), nr(), ar(), ai(), Up = class extends Bp {
		constructor(e, t = {}, n) {
			super(e), this.context = t, this.selectors = n;
		}
		useSyncedValue(e, t) {
			Hp.useDebugValue(e);
			let n = this;
			G(() => {
				n.state[e] !== t && n.set(e, t);
			}, [
				n,
				e,
				t
			]);
		}
		useSyncedValueWithCleanup(e, t) {
			let n = this;
			G(() => (n.state[e] !== t && n.set(e, t), () => {
				n.set(e, void 0);
			}), [
				n,
				e,
				t
			]);
		}
		useSyncedValues(e) {
			let t = this, n = Object.values(e);
			G(() => {
				t.update(e);
			}, [t, ...n]);
		}
		useControlledProp(e, t) {
			Hp.useDebugValue(e);
			let n = this, r = t !== void 0;
			G(() => {
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
			return Hp.useDebugValue(e), jp(this, this.selectors[e], t, n, r);
		}
		useContextCallback(e, t) {
			Hp.useDebugValue(e);
			let n = W(t ?? ni);
			this.context[e] = n;
		}
		useStateSetter(e) {
			let t = Hp.useRef(void 0);
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
	};
})), Gp = o((() => {
	p(), vo(), yp(), lo();
})), Kp = o((() => {
	gp(), _p(), zp(), Vp(), Wp(), Gp();
})), qp = o((() => {
	Sl(), dd(), el(), Ru(), cd();
})), Jp, Yp, Xp = o((() => {
	Kp(), Wd(), qp(), Jp = {
		open: (e) => e.open,
		transitionStatus: (e) => e.transitionStatus,
		domReferenceElement: (e) => e.domReferenceElement,
		referenceElement: (e) => e.positionReference ?? e.referenceElement,
		floatingElement: (e) => e.floatingElement,
		floatingId: (e) => e.floatingId
	}, Yp = class extends Up {
		constructor(e) {
			let { syncOnly: t, nested: n, onOpenChange: r, triggerElements: i, ...a } = e;
			super({
				...a,
				positionReference: a.referenceElement,
				domReferenceElement: a.referenceElement
			}, {
				onOpenChange: r,
				dataRef: { current: {} },
				events: Ud(),
				nested: n,
				triggerElements: i
			}, Jp), this.syncOnly = t;
		}
		syncOpenEvent = (e, t) => {
			(!e || !this.state.open || t != null && $c(t)) && (this.context.dataRef.current.openEvent = e ? t : void 0);
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
}));
// node_modules/@base-ui/react/utils/popups/store.mjs
function Zp(e, t, n = !1) {
	return {
		open: !1,
		openProp: void 0,
		mounted: !1,
		transitionStatus: void 0,
		floatingRootContext: new Yp({
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
		activeTriggerProps: ii,
		inactiveTriggerProps: ii,
		popupProps: ii
	};
}
function Qp(e, t) {
	return t !== void 0 && tm(e) && em(e) === t;
}
function $p(e, t) {
	return Qp(e, t) ? !0 : t !== void 0 && tm(e) && em(e) == null && !e.openedWithoutTrigger && e.triggerCount === 1;
}
var em, tm, nm, rm, im = o((() => {
	ai(), Xp(), em = (e) => e.triggerIdProp ?? e.activeTriggerId, tm = (e) => e.openProp ?? e.open, nm = (e) => (e.popupElement?.id ?? e.floatingId) || void 0, rm = {
		open: tm,
		mounted: (e) => e.mounted,
		transitionStatus: (e) => tm(e) && !e.mounted ? "starting" : e.transitionStatus,
		floatingRootContext: (e) => e.floatingRootContext,
		triggerCount: (e) => e.triggerCount,
		preventUnmountingOnClose: (e) => e.preventUnmountingOnClose,
		payload: (e) => e.payload,
		activeTriggerId: em,
		activeTriggerElement: (e) => e.mounted ? e.activeTriggerElement : null,
		popupId: nm,
		isTriggerActive: (e, t) => t !== void 0 && em(e) === t,
		isOpenedByTrigger: (e, t) => Qp(e, t),
		isMountedByTrigger: (e, t) => t !== void 0 && em(e) === t && e.mounted,
		triggerProps: (e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps,
		triggerPopupId: (e, t) => $p(e, t) ? nm(e) : void 0,
		popupProps: (e) => e.popupProps,
		popupElement: (e) => e.popupElement,
		positionerElement: (e) => e.positionerElement
	};
}));
// node_modules/@base-ui/react/utils/popups/usePopupHandleStore.mjs
function am(e) {
	let t = om.useCallback((t) => e === void 0 ? ni : e.subscribeStore(t), [e]), n = om.useCallback(() => e === void 0 ? void 0 : e.store, [e]);
	return (0, sm.useSyncExternalStore)(t, n, () => e?.serverStore);
}
var om, sm, cm = o((() => {
	om = /* @__PURE__ */ u(p(), 1), sm = yp(), ai();
})), lm = o((() => {
	jf(), Mf(), pp(), hp(), im(), cm();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function um(e) {
	let { open: t = !1, onOpenChange: n, elements: r = {} } = e, i = uc(), a = ef() != null, o = Jn(() => new Yp({
		open: t,
		transitionStatus: void 0,
		onOpenChange: n,
		referenceElement: r.reference ?? null,
		floatingElement: r.floating ?? null,
		triggerElements: new mp(),
		floatingId: i,
		syncOnly: !1,
		nested: a
	})).current;
	return G(() => {
		let e = {
			open: t,
			floatingId: i
		};
		r.reference !== void 0 && (e.referenceElement = r.reference, e.domReferenceElement = wn(r.reference) ? r.reference : null), r.floating !== void 0 && (e.floatingElement = r.floating), o.update(e);
	}, [
		t,
		i,
		r.reference,
		r.floating,
		o
	]), o.context.onOpenChange = n, o.context.nested = a, o;
}
var dm = o((() => {
	Wn(), mc(), ar(), Zn(), lm(), nf(), Xp();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useFocus.mjs
function fm(e, t = {}) {
	let { enabled: n = !0, delay: r } = t, { events: i, dataRef: a } = e.context, o = pm.useRef(!1), s = pm.useRef(null), c = pm.useRef(!0), l = Cc();
	pm.useEffect(() => {
		let t = e.select("domReferenceElement");
		if (!n) return;
		let r = xn(t);
		function i() {
			let t = e.select("domReferenceElement");
			!e.select("open") && Tn(t) && t === tl(Pr(t)) && (o.current = !0, s.current = t);
		}
		function a() {
			c.current = !0;
		}
		function l() {
			c.current = !1;
		}
		return Ll($(r, "blur", i), mm && $(r, "keydown", a, !0), mm && $(r, "pointerdown", l, !0));
	}, [e, n]), pm.useEffect(() => {
		if (!n) return;
		function t(t) {
			if (t.reason === "trigger-press" || t.reason === "escape-key") {
				let t = e.select("domReferenceElement");
				wn(t) && (s.current = t, o.current = !0);
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
	let u = pm.useMemo(() => {
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
				let a = rl(n.nativeEvent);
				if (wn(a)) {
					if (mm && !n.relatedTarget) {
						if (!c.current && !_l(a)) return;
					} else if (!bl(a)) return;
				}
				let u = ml(n.relatedTarget, e.context.triggerElements), { nativeEvent: d, currentTarget: f } = n;
				e.select("open") && u || !r ? e.setOpen(!0, Ns(zs, d, f)) : l.start(r, () => {
					o.current || e.setOpen(!0, Ns(zs, d, f));
				});
			},
			onBlur(n) {
				t();
				let r = n.relatedTarget, i = n.nativeEvent, o = wn(r) && r.hasAttribute(fd("focus-guard")) && r.getAttribute("data-type") === "outside";
				l.start(0, () => {
					let t = e.select("domReferenceElement"), n = tl(Pr(t));
					!r && n === t || Q(a.current.floatingContext?.refs.floating.current, n) || Q(t, n) || o || ml(r ?? n, e.context.triggerElements) || e.setOpen(!1, Ns(zs, i));
				});
			}
		};
	}, [
		a,
		r,
		e,
		l
	]);
	return pm.useMemo(() => n ? {
		reference: u,
		trigger: u
	} : {}, [n, u]);
}
var pm, mm, hm = o((() => {
	pm = /* @__PURE__ */ u(p(), 1), Il(), qc(), Rl(), Fr(), Ec(), Wn(), pd(), Sl(), Fs(), nc(), mm = Lc && Bc;
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverInteractionSharedState.mjs
function gm(e) {
	if (!e.performedPointerEventsMutation) return;
	let t = e.pointerEventsScopeElement;
	t && bm.get(t) === e && (e.pointerEventsScopeElement?.style.removeProperty("pointer-events"), e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"), e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"), bm.delete(t)), e.performedPointerEventsMutation = !1, e.pointerEventsScopeElement = null, e.pointerEventsReferenceElement = null, e.pointerEventsFloatingElement = null;
}
function _m(e, t) {
	let { scopeElement: n, referenceElement: r, floatingElement: i } = t, a = bm.get(n);
	a && a !== e && gm(a), gm(e), e.performedPointerEventsMutation = !0, e.pointerEventsScopeElement = n, e.pointerEventsReferenceElement = r, e.pointerEventsFloatingElement = i, bm.set(n, e), n.style.pointerEvents = "none", r.style.pointerEvents = "auto", i.style.pointerEvents = "auto";
}
function vm(e) {
	let t = e.context.dataRef.current, n = Jn(() => t.hoverInteractionState ?? ym.create()).current;
	return t.hoverInteractionState ||= n, bc(t.hoverInteractionState.disposeEffect), t.hoverInteractionState;
}
var ym, bm, xm = o((() => {
	Sc(), Zn(), Ec(), qp(), ym = class e {
		pointerType = void 0;
		interactedInside = !1;
		handler = void 0;
		blockMouseMove = !0;
		performedPointerEventsMutation = !1;
		pointerEventsScopeElement = null;
		pointerEventsReferenceElement = null;
		pointerEventsFloatingElement = null;
		restTimeoutPending = !1;
		openChangeTimeout = new Tc();
		restTimeout = new Tc();
		handleCloseOptions = void 0;
		static create() {
			return new e();
		}
		dispose = () => {
			this.openChangeTimeout.clear(), this.restTimeout.clear();
		};
		disposeEffect = () => this.dispose;
	}, bm = /* @__PURE__ */ new WeakMap();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs
function Sm(e, t = {}) {
	let { enabled: n = !0, closeDelay: r = 0, nodeId: i } = t, a = e.useState("open"), o = e.useState("floatingElement"), s = e.useState("domReferenceElement"), { dataRef: c } = e.context, l = tf(), u = ef(), d = vm(e), f = Cc(), p = W(() => El(c.current.openEvent?.type, d.interactedInside)), m = W(() => Dl(c.current.openEvent?.type)), h = W(() => {
		gm(d);
	});
	G(() => {
		a || (d.pointerType = void 0, d.restTimeoutPending = !1, d.interactedInside = !1, h());
	}, [
		a,
		d,
		h
	]), Cm.useEffect(() => h, [h]), G(() => {
		if (n && a && d.handleCloseOptions?.blockPointerEvents && m() && wn(s) && o) {
			let e = s, t = o, n = Pr(o), r = l?.nodesRef.current.find((e) => e.id === u)?.context?.elements.floating;
			r && (r.style.pointerEvents = "");
			let i = d.pointerEventsScopeElement === t ? null : d.pointerEventsScopeElement, a = r === t ? null : r, c = d.handleCloseOptions?.getScope?.() ?? i ?? a ?? nl(e, "[data-rootownerid]") ?? n.body;
			return _m(d, {
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
	]), Cm.useEffect(() => {
		if (!n) return;
		function t() {
			return !!(l && u && ld(l.nodesRef.current, u).length > 0);
		}
		function a(t) {
			let n = wl(r, "close", d.pointerType), i = () => {
				e.setOpen(!1, Ns(Rs, t)), l?.events.emit("floating.closed", t);
			};
			n ? d.openChangeTimeout.start(n, i) : (d.openChangeTimeout.clear(), i());
		}
		function s(e) {
			let t = rl(e);
			vl(t) ? d.interactedInside = nl(t, "[aria-haspopup]") != null : d.interactedInside = !1;
		}
		function g() {
			d.openChangeTimeout.clear(), f.clear(), l?.events.off("floating.closed", v), h();
		}
		function _(n) {
			if (t() && l) {
				l.events.on("floating.closed", v);
				return;
			}
			if (ml(n.relatedTarget, e.context.triggerElements)) return;
			let r = c.current.floatingContext?.nodeId ?? i, o = n.relatedTarget;
			l && r && wn(o) && ld(l.nodesRef.current, r, !1).some((e) => Q(e.context?.elements.floating, o)) || (d.handler ? d.handler(n) : (h(), m() && !p() && a(n)));
		}
		function v(n) {
			l && u && !t() && f.start(0, () => {
				l.events.off("floating.closed", v), e.setOpen(!1, Ns(Rs, n)), l.events.emit("floating.closed", n);
			});
		}
		let y = o;
		return Ll(y && $(y, "mouseenter", g), y && $(y, "mouseleave", _), y && $(y, "pointerdown", s, !0), () => {
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
var Cm, wm = o((() => {
	Cm = /* @__PURE__ */ u(p(), 1), Il(), Rl(), ar(), Fr(), nr(), Ec(), Wn(), Fs(), nc(), nf(), Sl(), dd(), xm(), Ol();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverReferenceInteraction.mjs
function Tm(e, t = {}) {
	let { enabled: n = !0, delay: r = 0, handleClose: i = null, mouseOnly: a = !1, restMs: o = 0, move: s = !0, triggerElementRef: c = Om, externalTree: l, isActiveTrigger: u = !0, getHandleCloseContext: d, isClosing: f, shouldOpen: p, guardStaleOpen: m = !1 } = t, { dataRef: h, events: g } = e.context, _ = tf(l), v = vm(e), y = Em.useRef(!1), b = zl(i), x = zl(r), S = zl(o), C = zl(n), w = zl(p), T = zl(f), E = W(() => El(h.current.openEvent?.type, v.interactedInside)), D = W(() => w.current?.() !== !1), O = W((t, n, r) => {
		let i = e.context.triggerElements;
		if (i.hasElement(n)) return !t || !Q(t, n);
		if (!wn(r)) return !1;
		let a = r;
		return i.hasMatchingElement((e) => Q(e, a)) && (!t || !Q(t, a));
	}), k = W(() => {
		v.handler &&= (Pr(e.select("domReferenceElement")).removeEventListener("mousemove", v.handler), void 0);
	}), A = W(() => {
		gm(v);
	});
	return u && (v.handleCloseOptions = i?.__options), Em.useEffect(() => k, [k]), Em.useEffect(() => {
		if (!n) return;
		function e(e) {
			e.open ? y.current = !1 : (y.current = e.reason === Rs, k(), v.openChangeTimeout.clear(), v.restTimeout.clear(), v.blockMouseMove = !0, v.restTimeoutPending = !1);
		}
		return g.on("openchange", e), () => {
			g.off("openchange", e);
		};
	}, [
		n,
		g,
		v,
		k
	]), Em.useEffect(() => {
		if (!n) return;
		function t(t, n = !0) {
			let r = wl(x.current, "close", v.pointerType);
			r ? v.openChangeTimeout.start(r, () => {
				e.setOpen(!1, Ns(Rs, t)), _?.events.emit("floating.closed", t);
			}) : n && (v.openChangeTimeout.clear(), e.setOpen(!1, Ns(Rs, t)), _?.events.emit("floating.closed", t));
		}
		let r = c.current ?? (u ? e.select("domReferenceElement") : null);
		if (!wn(r)) return;
		function i(t) {
			if (v.openChangeTimeout.clear(), v.blockMouseMove = !1, a && !Qc(v.pointerType)) return;
			let n = Tl(S.current), r = wl(x.current, "open", v.pointerType), i = rl(t), o = t.currentTarget ?? null, s = e.select("domReferenceElement"), c = o;
			if (wn(i) && !e.context.triggerElements.hasElement(i)) {
				for (let t of e.context.triggerElements.elements()) if (Q(t, i)) {
					c = t;
					break;
				}
			}
			wn(o) && wn(s) && !e.context.triggerElements.hasElement(o) && Q(o, s) && (c = s);
			let l = c != null && O(s, c, i), u = e.select("open"), d = T.current?.() ?? e.select("transitionStatus") === "ending", f = !u && d && y.current, p = !l && wn(c) && wn(s) && Q(s, c) && f, m = n > 0 && !r, h = l && (u || f) || p, g = !u || l;
			h ? D() && e.setOpen(!0, Ns(Rs, t, c)) : m || (r ? v.openChangeTimeout.start(r, () => {
				g && D() && e.setOpen(!0, Ns(Rs, t, c));
			}) : g && D() && e.setOpen(!0, Ns(Rs, t, c)));
		}
		function o(n) {
			if (E()) {
				A();
				return;
			}
			k();
			let r = Pr(e.select("domReferenceElement"));
			v.restTimeout.clear(), v.restTimeoutPending = !1;
			let i = h.current.floatingContext ?? d?.();
			if (!ml(n.relatedTarget, e.context.triggerElements)) {
				if (b.current && i) {
					e.select("open") || v.openChangeTimeout.clear();
					let a = c.current;
					v.handler = b.current({
						...i,
						tree: _,
						x: n.clientX,
						y: n.clientY,
						onClose() {
							A(), k(), C.current && !E() && a === e.select("domReferenceElement") && t(n, !0);
						}
					}), r.addEventListener("mousemove", v.handler), v.handler(n);
				} else v.pointerType === "touch" && Q(e.select("floatingElement"), n.relatedTarget) || t(n);
			}
		}
		function l(e) {
			Q(r, e.relatedTarget) || (v.openChangeTimeout.clear(), v.restTimeout.clear(), v.restTimeoutPending = !1);
		}
		let f = m ? $(r, "mouseout", l) : void 0;
		return s ? Ll($(r, "mousemove", i, { once: !0 }), $(r, "mouseenter", i), $(r, "mouseleave", o), f) : Ll($(r, "mouseenter", i), $(r, "mouseleave", o), f);
	}, [
		k,
		A,
		h,
		x,
		e,
		n,
		b,
		v,
		u,
		O,
		E,
		a,
		s,
		S,
		c,
		_,
		C,
		d,
		T,
		D,
		m
	]), Em.useMemo(() => {
		if (!n) return;
		function t(e) {
			v.pointerType = e.pointerType;
		}
		return {
			onPointerDown: t,
			onPointerEnter: t,
			onMouseMove(t) {
				let { nativeEvent: n } = t, r = t.currentTarget, i = e.select("domReferenceElement"), o = e.select("open"), s = O(i, r, t.target);
				if (a && !Qc(v.pointerType)) return;
				if (o && s && v.handleCloseOptions?.blockPointerEvents) {
					let t = e.select("floatingElement");
					if (t) {
						let e = v.handleCloseOptions?.getScope?.() ?? r.ownerDocument.body;
						_m(v, {
							scopeElement: e,
							referenceElement: r,
							floatingElement: t
						});
					}
				}
				let c = Tl(S.current);
				if (o && !s || c === 0 || !s && v.restTimeoutPending && t.movementX ** 2 + t.movementY ** 2 < 2) return;
				v.restTimeout.clear();
				function l() {
					if (v.restTimeoutPending = !1, E()) return;
					let t = e.select("open");
					!v.blockMouseMove && (!t || s) && D() && e.setOpen(!0, Ns(Rs, n, r));
				}
				v.pointerType === "touch" ? Dm.flushSync(() => {
					l();
				}) : s && o ? l() : (v.restTimeoutPending = !0, v.restTimeout.start(c, l));
			}
		};
	}, [
		n,
		v,
		E,
		O,
		a,
		e,
		S,
		D
	]);
}
var Em, Dm, Om, km = o((() => {
	Em = /* @__PURE__ */ u(p(), 1), Dm = /* @__PURE__ */ u(vo(), 1), Il(), Rl(), Fr(), nr(), Vl(), Wn(), Fs(), nc(), nf(), Sl(), el(), xm(), Ol(), Om = { current: null };
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useListNavigation.mjs
function Am(e) {
	return Bc && e.movementX === 0 && e.movementY === 0;
}
function jm(e, t, n) {
	switch (e) {
		case "vertical": return t;
		case "horizontal": return n;
		default: return t || n;
	}
}
function Mm(e, t) {
	return jm(t, e === "ArrowUp" || e === "ArrowDown", e === "ArrowLeft" || e === "ArrowRight");
}
function Nm(e, t, n) {
	return jm(t, e === "ArrowDown", n ? e === "ArrowLeft" : e === "ArrowRight") || e === "Enter" || e === " " || e === "";
}
function Pm(e, t, n) {
	return jm(t, n ? e === sl : e === cl, e === ul);
}
function Fm(e, t, n, r) {
	return t === "both" || t === "horizontal" && r ? e === "Escape" : jm(t, n ? e === cl : e === sl, e === ll);
}
function Im(e, t) {
	let { listRef: n, activeIndex: r, onNavigate: i = () => {}, enabled: a = !0, selectedIndex: o = null, allowEscape: s = !1, loopFocus: c = !1, nested: l = !1, rtl: u = !1, virtual: d = !1, focusItemOnOpen: f = "auto", focusItemOnHover: p = !0, openOnArrowKeyDown: m = !0, disabledIndices: h = void 0, orientation: g = "vertical", triggerOrientation: _ = g, parentOrientation: v, id: y, resetOnPointerLeave: b = !0, externalTree: x, nestedReturnFocusRef: S, grid: C } = t, w = C != null, T = e.useState("open"), E = e.useState("floatingElement"), D = e.useState("domReferenceElement"), O = e.context.dataRef, k = xl(E), A = yl(D), j = zl(k), M = ef(), N = tf(x), P = Lm.useRef(f), F = Lm.useRef(o ?? -1), I = Lm.useRef(null), L = Lm.useRef(!0), R = W((e) => {
		i(F.current === -1 ? null : F.current, e);
	}), ee = Lm.useRef(!!E), z = Lm.useRef(T), te = Lm.useRef(!1), B = Lm.useRef(!1), ne = Lm.useRef(null), re = zl(h), V = zl(T), H = zl(o), ie = zl(b), ae = Hl(), U = Hl(), oe = W(() => {
		ae.cancel();
		function e(e) {
			d || (ne.current = md(e, {
				sync: te.current,
				preventScroll: !0
			}));
		}
		let t = n.current[F.current], r = B.current;
		t && e(t), (te.current ? (e) => e() : (e) => ae.request(e))(() => {
			let i = n.current[F.current] || t;
			i && (t || e(i), fe && (r || !L.current) && i.scrollIntoView?.({
				block: "nearest",
				inline: "nearest"
			}));
		});
	});
	G(() => {
		O.current.orientation = g;
	}, [O, g]), G(() => {
		T || (I.current = null), T && f === "auto" || (P.current = f);
	}, [T, f]), G(() => {
		a && (T && E ? (F.current = o ?? -1, P.current && o != null && (B.current = !0, R())) : ee.current && (F.current = -1, R()));
	}, [
		a,
		T,
		E,
		o,
		R
	]), G(() => {
		if (a) {
			if (!T) te.current = !1;
			else if (E) {
				if (r == null) {
					if (te.current = !1, H.current != null) return;
					if (ee.current && (F.current = -1, oe()), (!z.current || !ee.current) && P.current && (I.current != null || P.current === !0 && I.current == null)) {
						let e = 0, t = () => {
							n.current[0] == null ? (e < 2 && (e ? (e) => U.request(e) : queueMicrotask)(t), e += 1) : (F.current = I.current == null || Nm(I.current, _, u) || l ? ju(n) : Mu(n), I.current = null, R());
						};
						t();
					}
				} else Au(n.current, r) || (F.current = r, oe(), B.current = !1);
			}
		}
	}, [
		a,
		T,
		E,
		r,
		H,
		l,
		n,
		_,
		u,
		R,
		oe,
		U
	]), G(() => {
		if (!a || E || !N || d || !ee.current) return;
		let e = N.nodesRef.current, t = e.find((e) => e.id === M)?.context?.elements.floating, n = tl(Pr(D ?? t ?? null)), r = e.some((e) => e.context && Q(e.context.elements.floating, n));
		t && !r && L.current && t.focus({ preventScroll: !0 });
	}, [
		a,
		E,
		D,
		N,
		M,
		d
	]), G(() => {
		z.current = T, ee.current = !!E;
	});
	let se = r != null, ce = W((e) => {
		if (!V.current) return;
		let t = n.current.indexOf(e.currentTarget);
		t !== -1 && (F.current !== t || r !== t) && (F.current = t, R(e));
	}), le = W(() => v ?? N?.nodesRef.current.find((e) => e.id === M)?.context?.dataRef?.current.orientation), ue = W(() => ju(n, re.current)), de = W((t) => {
		if (L.current = !1, te.current = !0, t.which === 229 || !V.current && t.currentTarget === j.current) return;
		if (l && Fm(t.key, g, u, w)) {
			Mm(t.key, le()) || Jc(t), e.setOpen(!1, Ns(Gs, t.nativeEvent));
			let n = S?.current ?? D;
			Tn(n) && n.focus();
			return;
		}
		r != null && r !== F.current && !Au(n.current, r) && (F.current = r);
		let i = F.current, a = ju(n, h), o = Mu(n, h);
		if (A || (t.key === "Home" && (Jc(t), F.current = a, R(t)), t.key === "End" && (Jc(t), F.current = o, R(t))), C != null) {
			let e = C(t, F.current, n, g, c, u, h, a, o);
			if (e != null && e !== F.current && (F.current = e, R(t)), g === "both") return;
		}
		if (Mm(t.key, g)) {
			Jc(t);
			let e = tl(t.currentTarget.ownerDocument);
			if (T && !d && Q(t.currentTarget, e) && !n.current.some((t) => t != null && Q(t, e))) {
				F.current = Nm(t.key, g, u) ? a : o, R(t), r === F.current && oe();
				return;
			}
			let { index: l, wrapped: f } = Nu(n.current, i, {
				decrement: !Nm(t.key, g, u),
				loopFocus: c,
				allowEscape: s,
				disabledIndices: h,
				minIndex: a,
				maxIndex: o
			});
			f && (te.current = !1), F.current = l, R(t);
		}
	}), fe = Lm.useMemo(() => ({
		onFocus(e) {
			te.current = !0, ce(e);
		},
		onClick({ currentTarget: e }) {
			d || e.focus({ preventScroll: !0 });
		},
		onMouseMove(e) {
			Am(e) || (te.current = !0, B.current = !1, p && ce(e));
		},
		onPointerLeave(e) {
			if (!V.current || !L.current || e.pointerType === "touch") return;
			te.current = !0;
			let t = e.relatedTarget;
			if (p && !n.current.includes(t) && ie.current && (ne.current?.(), ne.current = null, F.current = -1, R(e), !d)) {
				let e = j.current, t = tl(Pr(e));
				e && Q(e, t) && e.focus({ preventScroll: !0 });
			}
		}
	}), [
		ce,
		V,
		j,
		p,
		n,
		R,
		ie,
		d
	]), pe = Lm.useMemo(() => d && T && se && { "aria-activedescendant": `${y}-${r}` }, [
		d,
		T,
		se,
		y,
		r
	]), me = Lm.useMemo(() => ({
		...A ? {} : pe,
		onKeyDown(t) {
			if (t.key === "Tab" && t.shiftKey && T && !d) {
				let n = rl(t.nativeEvent);
				if (n && !Q(j.current, n)) return;
				Jc(t);
				let r = Ns(Us, t.nativeEvent);
				e.setOpen(!1, r);
				let i = S?.current ?? D;
				!r.isCanceled && Tn(i) && i.focus();
			} else de(t);
		},
		onPointerMove(e) {
			Am(e) || (L.current = !0);
		}
	}), [
		pe,
		de,
		j,
		A,
		e,
		T,
		d,
		D,
		S
	]), he = Lm.useMemo(() => {
		function t(t) {
			e.setOpen(!0, Ns(Gs, t.nativeEvent, t.currentTarget));
		}
		function n(e) {
			f === "auto" && Xc(e.nativeEvent) && (P.current = !d);
		}
		function r(e) {
			P.current = f, f === "auto" && Zc(e.nativeEvent) && (P.current = !0);
		}
		return {
			onKeyDown(n) {
				let r = e.select("open");
				L.current = !1;
				let i = n.key.startsWith("Arrow"), a = Pm(n.key, le(), u), o = Mm(n.key, r ? g : _), s = (l ? a : o) || n.key === "Enter" || n.key.trim() === "";
				if (d && r && (!l || _l(n.currentTarget))) return de(n);
				if (r || m || !i) {
					if (s) {
						let e = Mm(n.key, le());
						I.current = l && e ? null : n.key;
					}
					l ? a && (Jc(n), r ? (F.current = ue(), R(n), d && j.current?.focus()) : t(n)) : o && (H.current != null && (F.current = H.current), Jc(n), !r && m ? t(n) : de(n), r && R(n));
				}
			},
			onFocus(t) {
				t.target === t.currentTarget && e.select("open") && !d && (F.current = -1, R(t));
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
		R,
		e,
		m,
		g,
		_,
		le,
		u,
		H,
		d,
		j
	]), ge = Lm.useMemo(() => ({
		...pe,
		...he
	}), [pe, he]);
	return Lm.useMemo(() => a ? {
		reference: ge,
		floating: me,
		item: fe,
		trigger: he
	} : {}, [
		a,
		ge,
		me,
		he,
		fe
	]);
}
var Lm, Rm = o((() => {
	Lm = /* @__PURE__ */ u(p(), 1), ql(), ar(), Fr(), nr(), Vl(), qc(), Wn(), Fs(), nc(), nf(), Ru(), dl(), Sl(), gd(), el();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useTypeahead.mjs
function zm(e, t) {
	let { listRef: n, elementsRef: r, activeIndex: i, onMatch: a, disabledIndices: o, onTyping: s, enabled: c = !0, resetMs: l = 750, selectedIndex: u = null } = t, d = W(s), f = e.useState("open"), p = Cc(), m = Bm.useRef(""), h = Bm.useRef(u ?? i ?? -1), g = Bm.useRef(null), _ = W((e) => {
		function t(e) {
			return r?.current[e];
		}
		function s(e) {
			let n = t(e);
			return n && !Lu(n) || n?.matches(":disabled") ? !1 : o == null || !Fu(ri, e, o);
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
		if (m.current.length > 0 && e.key === " " && (Jc(e), d?.(!0)), m.current.length > 0 && m.current[0] !== " " && c(_, m.current) === -1 && e.key !== " " && d?.(!1), _ == null || e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		f && e.key !== " " && (Jc(e), d?.(!0));
		let v = m.current === "";
		v && (h.current = u ?? i ?? -1), _.every((e, t) => e && s(t) ? e[0]?.toLowerCase() !== e[1]?.toLowerCase() : !0) && m.current === e.key && (m.current = "", h.current = g.current), m.current += e.key, p.start(l, () => {
			m.current = "", h.current = g.current, d?.(!1);
		});
		let y = ((v ? u ?? i ?? -1 : h.current) ?? 0) + 1, b = c(_, m.current, y);
		b === -1 ? e.key !== " " && (m.current = "", d?.(!1)) : (a?.(b, e), g.current = b);
	}), v = W((t) => {
		let n = t.relatedTarget, r = e.select("domReferenceElement"), i = e.select("floatingElement");
		Q(r, n) || Q(i, n) || (p.clear(), m.current = "", h.current = g.current, d?.(!1));
	});
	G(() => {
		(f || u === null) && (p.clear(), g.current = null, m.current !== "" && (m.current = "", d?.(!1)));
	}, [
		f,
		u,
		p,
		d
	]);
	let y = Bm.useMemo(() => ({
		onKeyDown: _,
		onBlur: v
	}), [_, v]);
	return Bm.useMemo(() => c ? {
		reference: y,
		floating: y
	} : {}, [c, y]);
}
var Bm, Vm = o((() => {
	Bm = /* @__PURE__ */ u(p(), 1), ar(), nr(), Ec(), ai(), Ru(), Sl(), el();
}));
// node_modules/@base-ui/react/floating-ui-react/safePolygon.mjs
function Hm(e, t, n, r, i, a) {
	return r >= t != a >= t && e <= (i - n) * (t - r) / (a - r) + n;
}
function Um(e, t, n, r, i, a, o, s, c, l) {
	let u = !1;
	return Hm(e, t, n, r, i, a) && (u = !u), Hm(e, t, i, a, o, s) && (u = !u), Hm(e, t, o, s, c, l) && (u = !u), Hm(e, t, c, l, n, r) && (u = !u), u;
}
function Wm(e, t, n) {
	return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
}
function Gm(e, t, n, r, i, a) {
	return e >= Math.min(n, i) && e <= Math.max(n, i) && t >= Math.min(r, a) && t <= Math.max(r, a);
}
function Km(e = {}) {
	let { blockPointerEvents: t = !1 } = e, n = new Tc(), r = ({ x: e, y: t, placement: r, elements: i, onClose: a, nodeId: o, tree: s }) => {
		let c = r?.split("-")[0], l = !1, u = null, d = null, f = typeof performance < "u" ? performance.now() : 0;
		function p(e, t) {
			let n = performance.now(), r = n - f;
			if (u === null || d === null || r === 0) return u = e, d = t, f = n, !1;
			let i = e - u, a = t - d, o = i * i + a * a, s = r * r * Jm;
			return u = e, d = t, f = n, o < s;
		}
		function m() {
			n.clear(), a();
		}
		return function(r) {
			n.clear();
			let a = i.domReference, u = i.floating;
			if (!a || !u || c == null || e == null || t == null) return;
			let { clientX: d, clientY: f } = r, h = rl(r), g = r.type === "mouseleave", _ = Q(u, h), v = Q(a, h);
			if (_ && (l = !0, !g)) return;
			if (v && (l = !1, !g)) {
				l = !0;
				return;
			}
			if (g && wn(r.relatedTarget) && Q(u, r.relatedTarget)) return;
			function y() {
				return !!(s && ld(s.nodesRef.current, o).length > 0);
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
					j = Gm(d, f, D, x.top + 1, O, S.bottom - 1);
					break;
				case "bottom":
					j = Gm(d, f, D, S.top + 1, O, x.bottom - 1);
					break;
				case "left":
					j = Gm(d, f, S.right - 1, A, x.left + 1, k);
					break;
				case "right": j = Gm(d, f, x.right - 1, A, S.left + 1, k);
			}
			if (j) return;
			if (l && !Wm(d, f, x) || !g && p(d, f)) {
				b();
				return;
			}
			let M = !1;
			switch (c) {
				case "top": {
					let n = T ? Ym / 2 : Ym * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t + Ym + 1, o = C || T ? S.bottom - Ym : S.top, s = C ? T ? S.bottom - Ym : S.top : S.bottom - Ym;
					M = Um(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "bottom": {
					let n = T ? Ym / 2 : Ym * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t - Ym, o = C || T ? S.top + Ym : S.bottom, s = C ? T ? S.top + Ym : S.bottom : S.top + Ym;
					M = Um(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "left": {
					let n = E ? Ym / 2 : Ym * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e + Ym + 1, o = w || E ? S.right - Ym : S.left, s = w ? E ? S.right - Ym : S.left : S.right - Ym;
					M = Um(d, f, o, S.top, s, S.bottom, a, r, a, i);
					break;
				}
				case "right": {
					let n = E ? Ym / 2 : Ym * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e - Ym, o = w || E ? S.left + Ym : S.right, s = w ? E ? S.left + Ym : S.right : S.left + Ym;
					M = Um(d, f, a, r, a, i, o, S.top, s, S.bottom);
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
var qm, Jm, Ym, Xm = o((() => {
	Wn(), Ec(), Sl(), dd(), qm = .1, Jm = qm * qm, Ym = .5;
}));
// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Zm(e, t, n) {
	let { reference: r, floating: i } = e, a = cu(t), o = lu(t), s = su(o), c = iu(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = au(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Qm(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = ru(t, e), p = _u(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = vu(await i.getClippingRect({
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
	}, y = vu(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
async function $m(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = iu(n), s = au(n), c = cu(n) === "y", l = rh.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = ru(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var eh, th, nh, rh, ih, ah, oh, sh, ch = o((() => {
	ku(), eh = 50, th = async (e, t, n) => {
		let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
			...o,
			detectOverflow: Qm
		}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}), { x: u, y: d } = Zm(l, r, c), f = r, p = 0, m = {};
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
			}, x && p < eh && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
				reference: e,
				floating: t,
				strategy: i
			}) : x.rects), {x: u, y: d} = Zm(l, f, c)), n = -1);
		}
		return {
			x: u,
			y: d,
			placement: f,
			strategy: i,
			middlewareData: m
		};
	}, nh = function(e) {
		return e === void 0 && (e = {}), {
			name: "flip",
			options: e,
			async fn(t) {
				var n;
				let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = ru(e, t);
				if ((n = i.arrow) != null && n.alignmentOffset) return {};
				let g = iu(r), _ = cu(o), v = iu(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [hu(o)] : du(o)), x = p !== "none";
				!d && x && b.push(...mu(o, m, p, y));
				let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
				if (l && w.push(C[g]), u) {
					let e = uu(r, a, y);
					w.push(C[e[0]], C[e[1]]);
				}
				if (T = [...T, {
					placement: r,
					overflows: w
				}], !w.every((e) => e <= 0)) {
					let e = (i.flip?.index || 0) + 1, t = S[e];
					if (t && (u !== "alignment" || _ === cu(t) || T.every((e) => cu(e.placement) !== _ || e.overflows[0] > 0))) return {
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
									let t = cu(e.placement);
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
	}, rh = /*#__PURE__*/ new Set(["left", "top"]), ih = function(e) {
		return e === void 0 && (e = 0), {
			name: "offset",
			options: e,
			async fn(t) {
				var n;
				let { x: r, y: i, placement: a, middlewareData: o } = t, s = await $m(t, e);
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
	}, ah = function(e) {
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
				} }, ...l } = ru(e, t), u = {
					x: n,
					y: r
				}, d = await a.detectOverflow(t, l), f = cu(i), p = ou(f), m = u[p], h = u[f], g = (e, t) => nu(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
	}, oh = function(e) {
		return e === void 0 && (e = {}), {
			options: e,
			fn(t) {
				let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = ru(e, t), u = {
					x: n,
					y: r
				}, d = cu(i), f = ou(d), p = u[f], m = u[d], h = ru(s, t), g = typeof h == "number" ? {
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
					let e = f === "y" ? "width" : "height", t = rh.has(iu(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
					m < n ? m = n : m > r && (m = r);
				}
				return {
					[f]: p,
					[d]: m
				};
			}
		};
	}, sh = function(e) {
		return e === void 0 && (e = {}), {
			name: "size",
			options: e,
			async fn(t) {
				let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = ru(e, t), c = await i.detectOverflow(t, s), l = iu(n), u = au(n), d = cu(n) === "y", { width: f, height: p } = r.floating, m, h;
				l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
				let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = yu(p - c[m], g), y = yu(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
				b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * bu(c.left, c.right) : S = p - 2 * bu(c.top, c.bottom)), await o({
					...t,
					availableWidth: C,
					availableHeight: S
				});
				let w = await i.getDimensions(a.floating);
				return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
			}
		};
	};
}));
// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function lh(e) {
	let t = Pn(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Tn(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = xu(n) !== a || xu(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function uh(e) {
	return wn(e) ? e : e.contextElement;
}
function dh(e) {
	let t = uh(e);
	if (!Tn(t)) return Cu(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = lh(t), o = (a ? xu(n.width) : n.width) / r, s = (a ? xu(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
function fh(e) {
	let t = xn(e);
	return !Mn() || !t.visualViewport ? Ph : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function ph(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === xn(e);
}
function mh(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = uh(e), o = Cu(1);
	t && (r ? wn(r) && (o = dh(r)) : o = dh(e));
	let s = ph(a, n, r) ? fh(a) : Cu(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = xn(a), t = wn(r) ? xn(r) : r, n = e, i = zn(n);
		for (; i && t !== n;) {
			let e = dh(i), t = i.getBoundingClientRect(), r = Pn(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = xn(i), i = zn(n);
		}
	}
	return vu({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function hh(e, t) {
	let n = Fn(e).scrollLeft;
	return t ? t.left + n : mh(Sn(e)).left + n;
}
function gh(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - hh(e, n),
		y: n.top + t.scrollTop
	};
}
function _h(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Sn(r), s = t ? kn(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Cu(1), u = Cu(0), d = Tn(r);
	if ((d || !a) && ((bn(r) !== "body" || Dn(o)) && (c = Fn(r)), d)) {
		let e = mh(r);
		l = dh(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? gh(o, c) : Cu(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function vh(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function yh(e) {
	let t = Fn(e), n = e.ownerDocument.body, r = bu(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = bu(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + hh(e), o = -t.scrollTop;
	return Pn(n).direction === "rtl" && (a += bu(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
function bh(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = xn(e), a = Sn(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Mn() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (hh(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Fh && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function xh(e, t) {
	let n = mh(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = dh(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Sh(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = bh(e, n, t);
	else if (t === "document") r = yh(Sn(e));
	else if (wn(t)) r = xh(t, n);
	else {
		let n = fh(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return vu(r);
}
function Ch(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Rn(e, [], !1).filter((e) => wn(e) && bn(e) !== "body"), i = null, a = Pn(e).position === "fixed", o = a ? In(e) : e;
	for (; wn(o) && !Nn(o);) {
		let e = Pn(o), t = An(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = In(o);
	}
	return t.set(e, r), r;
}
function wh(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? kn(t) ? [] : Ch(t, this._c) : [].concat(n), r], o = Sh(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Sh(t, a[e], i);
		s = bu(n.top, s), c = yu(n.right, c), l = yu(n.bottom, l), u = bu(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Th(e) {
	let { width: t, height: n } = lh(e);
	return {
		width: t,
		height: n
	};
}
function Eh(e, t, n) {
	let r = Tn(t), i = Sn(t), a = n === "fixed", o = mh(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Cu(0);
	if ((r || !a) && ((bn(t) !== "body" || Dn(i)) && (s = Fn(t)), r)) {
		let e = mh(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = hh(i));
	let l = i && !r && !a ? gh(i, s) : Cu(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Dh(e) {
	return Pn(e).position === "static";
}
function Oh(e, t) {
	if (!Tn(e) || Pn(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Sn(e) === n && (n = n.ownerDocument.body), n;
}
function kh(e, t) {
	let n = xn(e);
	if (kn(e)) return n;
	if (!Tn(e)) {
		let t = In(e);
		for (; t && !Nn(t);) {
			if (wn(t) && !Dh(t)) return t;
			t = In(t);
		}
		return n;
	}
	let r = Oh(e, t);
	for (; r && On(r) && Dh(r);) r = Oh(r, t);
	return r && Nn(r) && Dh(r) && !An(r) ? n : r || jn(e) || n;
}
function Ah(e) {
	return Pn(e).direction === "rtl";
}
function jh(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Mh(e, t, n) {
	let r = null, i, a = Sn(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Su(d), h = Su(a.clientWidth - (u + f)), g = Su(a.clientHeight - (d + p)), _ = Su(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: bu(0, yu(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!jh(l, e.getBoundingClientRect())) return s();
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
	let c = xn(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Nh(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = uh(e), u = i || a ? [...l ? Rn(l) : [], ...t ? Rn(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Mh(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? mh(e) : null;
	c && g();
	function g() {
		let t = mh(e);
		h && !jh(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Ph, Fh, Ih, Lh, Rh, zh, Bh, Vh, Hh, Uh, Wh = o((() => {
	ch(), ku(), Wn(), Ph = /*#__PURE__*/ Cu(0), Fh = 25, Ih = async function(e) {
		let t = this.getOffsetParent || kh, n = this.getDimensions, r = await n(e.floating);
		return {
			reference: Eh(e.reference, await t(e.floating), e.strategy),
			floating: {
				x: 0,
				y: 0,
				width: r.width,
				height: r.height
			}
		};
	}, Lh = {
		convertOffsetParentRelativeRectToViewportRelativeRect: _h,
		getDocumentElement: Sn,
		getClippingRect: wh,
		getOffsetParent: kh,
		getElementRects: Ih,
		getClientRects: vh,
		getDimensions: Th,
		getScale: dh,
		isElement: wn,
		isRTL: Ah
	}, Rh = ih, zh = ah, Bh = nh, Vh = sh, Hh = oh, Uh = (e, t, n) => {
		let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
			...Lh,
			...i.platform,
			_c: r
		};
		return th(e, t, {
			...i,
			platform: a
		});
	};
}));
// node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
function Gh(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Gh(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Gh(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Kh(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function qh(e, t) {
	let n = Kh(e);
	return Math.round(t * n) / n;
}
function Jh(e) {
	let t = Xh.useRef(e);
	return $h(() => {
		t.current = e;
	}), t;
}
function Yh(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = Xh.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = Xh.useState(r);
	Gh(f, r) || p(r);
	let [m, h] = Xh.useState(null), [g, _] = Xh.useState(null), v = Xh.useCallback((e) => {
		e !== S.current && (S.current = e, h(e));
	}, []), y = Xh.useCallback((e) => {
		e !== C.current && (C.current = e, _(e));
	}, []), b = a || m, x = o || g, S = Xh.useRef(null), C = Xh.useRef(null), w = Xh.useRef(u), T = c != null, E = Jh(c), D = Jh(i), O = Jh(l), k = Xh.useCallback(() => {
		if (!S.current || !C.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		D.current && (e.platform = D.current), Uh(S.current, C.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: O.current !== !1
			};
			A.current && !Gh(w.current, t) && (w.current = t, Qh.flushSync(() => {
				d(t);
			}));
		});
	}, [
		f,
		t,
		n,
		D,
		O
	]);
	$h(() => {
		l === !1 && w.current.isPositioned && (w.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let A = Xh.useRef(!1);
	$h(() => (A.current = !0, () => {
		A.current = !1;
	}), []), $h(() => {
		if (b && (S.current = b), x && (C.current = x), b && x) {
			if (E.current) return E.current(b, x, k);
			k();
		}
	}, [
		b,
		x,
		k,
		E,
		T
	]);
	let j = Xh.useMemo(() => ({
		reference: S,
		floating: C,
		setReference: v,
		setFloating: y
	}), [v, y]), M = Xh.useMemo(() => ({
		reference: b,
		floating: x
	}), [b, x]), N = Xh.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!M.floating) return e;
		let t = qh(M.floating, u.x), r = qh(M.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...Kh(M.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		M.floating,
		u.x,
		u.y
	]);
	return Xh.useMemo(() => ({
		...u,
		update: k,
		refs: j,
		elements: M,
		floatingStyles: N
	}), [
		u,
		k,
		j,
		M,
		N
	]);
}
var Xh, Zh, Qh, $h, eg, tg, ng, rg, ig, ag = o((() => {
	Wh(), Xh = /* @__PURE__ */ u(p(), 1), Zh = /* @__PURE__ */ u(p(), 1), Qh = /* @__PURE__ */ u(vo(), 1), $h = typeof document < "u" ? Zh.useLayoutEffect : function() {}, eg = (e, t) => {
		let n = Rh(e);
		return {
			name: n.name,
			fn: n.fn,
			options: [e, t]
		};
	}, tg = (e, t) => {
		let n = zh(e);
		return {
			name: n.name,
			fn: n.fn,
			options: [e, t]
		};
	}, ng = (e, t) => ({
		fn: Hh(e).fn,
		options: [e, t]
	}), rg = (e, t) => {
		let n = Bh(e);
		return {
			name: n.name,
			fn: n.fn,
			options: [e, t]
		};
	}, ig = (e, t) => {
		let n = Vh(e);
		return {
			name: n.name,
			fn: n.fn,
			options: [e, t]
		};
	};
})), og = o((() => {
	Fl(), _f(), Hd(), nf(), Kd(), bf(), Tf(), Af(), dm(), Pf(), hm(), wm(), km(), Rm(), Vm(), Xm(), ag();
}));
// node_modules/@base-ui/react/dialog/portal/DialogPortalContext.mjs
function sg() {
	let e = cg.useContext(lg);
	if (e === void 0) throw Error(Tr(26));
	return e;
}
var cg, lg, ug = o((() => {
	Er(), cg = /* @__PURE__ */ u(p(), 1), lg = /*#__PURE__*/ cg.createContext(void 0);
}));
// node_modules/@base-ui/react/internals/composite/composite.mjs
function dg(e) {
	return Tn(e) && e.tagName === "INPUT";
}
function fg(e) {
	return !!(dg(e) && e.selectionStart != null || Tn(e) && e.tagName === "TEXTAREA");
}
function pg(e, t, n, r) {
	if (!e || !t || !t.scrollTo) return;
	let i = e.scrollLeft, a = e.scrollTop, o = e.clientWidth < e.scrollWidth, s = e.clientHeight < e.scrollHeight;
	if (o && r !== "vertical") {
		let r = mg(e, t, "left"), a = hg(e), o = hg(t);
		n === "ltr" && (r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight ? i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight : r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft && (i = r - o.scrollMarginLeft - a.scrollPaddingLeft)), n === "rtl" && (r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft ? i = r - o.scrollMarginLeft - a.scrollPaddingLeft : r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight && (i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight));
	}
	if (s && r !== "horizontal") {
		let n = mg(e, t, "top"), r = hg(e), i = hg(t);
		n - i.scrollMarginTop < e.scrollTop + r.scrollPaddingTop ? a = n - i.scrollMarginTop - r.scrollPaddingTop : n + t.offsetHeight + i.scrollMarginBottom > e.scrollTop + e.clientHeight - r.scrollPaddingBottom && (a = n + t.offsetHeight + i.scrollMarginBottom - e.clientHeight + r.scrollPaddingBottom);
	}
	e.scrollTo({
		left: i,
		top: a,
		behavior: "auto"
	});
}
function mg(e, t, n) {
	let r = n === "left" ? "offsetLeft" : "offsetTop", i = 0;
	for (; t.offsetParent && (i += t[r], t.offsetParent !== e);) t = t.offsetParent;
	return i;
}
function hg(e) {
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
var gg, _g, vg, yg, bg, xg, Sg, Cg, wg = o((() => {
	Wn(), qp(), gg = "ArrowUp", _g = "ArrowDown", vg = "ArrowLeft", yg = "ArrowRight", bg = "Home", xg = /* @__PURE__ */ new Set([
		gg,
		_g,
		vg,
		yg,
		bg,
		"End"
	]), Sg = "Shift", Cg = [
		Sg,
		"Control",
		"Alt",
		"Meta"
	];
})), Tg, Eg = o((() => {
	Tg = "--nested-dialogs";
})), Dg, Og = o((() => {
	Os(), Dg = "data-nested-dialog-open";
})), kg, Ag = o((() => {
	ds(), Os(), Og(), kg = {
		...Es,
		...us,
		nestedDialogOpen(e) {
			return e ? { [Dg]: "" } : null;
		}
	};
})), jg, Mg, Ng, Pg = o((() => {
	jg = /* @__PURE__ */ u(p(), 1), og(), is(), xi(), ug(), qf(), wg(), lm(), Eg(), Ag(), Mg = lo(), Ng = /*#__PURE__*/ jg.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, finalFocus: a, initialFocus: o, ...s } = e, c = ts(), l = c.useState("descriptionElementId"), u = c.useState("disablePointerDismissal"), d = c.useState("floatingRootContext"), f = c.useState("popupProps"), p = c.useState("modal"), m = c.useState("mounted"), h = c.useState("nested"), g = c.useState("nestedOpenDialogCount"), _ = c.useState("open"), v = c.useState("openMethod"), y = c.useState("titleElementId"), b = c.useState("transitionStatus"), x = c.useState("role"), S = d.useState("floatingId");
		sg(), Gf({
			open: _,
			ref: c.context.popupRef,
			onComplete() {
				_ && c.context.onOpenChangeComplete?.(!0);
			}
		});
		let C = o === void 0 ? Zf(c.context.popupRef) : o, w = g > 0, T = c.useStateSetter("popupElement"), E = fi("div", e, {
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
					...fp,
					hidden: !m,
					onKeyDown(e) {
						xg.has(e.key) && e.stopPropagation();
					},
					style: { [Tg]: g }
				},
				s
			],
			ref: [
				t,
				c.context.popupRef,
				T
			],
			stateAttributesMapping: kg
		});
		return /*#__PURE__*/ (0, Mg.jsx)(ff, {
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
	});
}));
// node_modules/@base-ui/utils/inertValue.mjs
function Fg(e) {
	return Xr(19) ? e : e ? "true" : void 0;
}
var Ig = o((() => {
	Qr();
})), Lg, Rg, zg, Bg = o((() => {
	Lg = /* @__PURE__ */ u(p(), 1), Rg = lo(), zg = /*#__PURE__*/ Lg.forwardRef(function(e, t) {
		let { cutout: n, ...r } = e, i;
		if (n) {
			let e = n.getBoundingClientRect();
			i = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${e.left}px ${e.top}px,${e.left}px ${e.bottom}px,${e.right}px ${e.bottom}px,${e.right}px ${e.top}px,${e.left}px ${e.top}px)`;
		}
		return /*#__PURE__*/ (0, Rg.jsx)("div", {
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
})), Vg, Hg, Ug, Wg = o((() => {
	Vg = /* @__PURE__ */ u(p(), 1), Ig(), og(), is(), ug(), Bg(), Hg = lo(), Ug = /*#__PURE__*/ Vg.forwardRef(function(e, t) {
		let { keepMounted: n = !1, ...r } = e, i = ts(), a = i.useState("mounted"), o = i.useState("modal"), s = i.useState("open");
		return a || n ? /*#__PURE__*/ (0, Hg.jsx)(lg.Provider, {
			value: n,
			children: /*#__PURE__*/ (0, Hg.jsxs)(Vd, {
				ref: t,
				...r,
				children: [a && o === !0 && /*#__PURE__*/ (0, Hg.jsx)(zg, {
					ref: i.context.internalBackdropRef,
					inert: Fg(!s)
				}), e.children]
			})
		}) : null;
	});
}));
// node_modules/@base-ui/utils/useScrollLock.mjs
function Gg(e, t) {
	return Dn(e) ? e : t;
}
function Kg(e, t, n) {
	return /hidden|clip/.test(e.getComputedStyle(Gg(t, n)).overflowY);
}
function qg(e) {
	if (typeof document > "u") return !1;
	let t = Pr(e);
	return xn(t).innerWidth - t.documentElement.clientWidth > 0;
}
function Jg(e) {
	if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u") return !1;
	let t = Pr(e), n = t.documentElement, r = t.body, i = Gg(n, r), a = i.style.overflowY, o = n.style.scrollbarGutter;
	n.style.scrollbarGutter = "stable", i.style.overflowY = "scroll";
	let s = i.offsetWidth;
	i.style.overflowY = "hidden";
	let c = i.offsetWidth;
	return i.style.overflowY = a, n.style.scrollbarGutter = o, s === c;
}
function Yg(e) {
	let t = Pr(e), n = t.documentElement, r = t.body, i = Gg(n, r), a = {
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
function Xg(e) {
	let t = Pr(e), n = t.documentElement, r = t.body, i = xn(n), a = 0, o = 0, s = !1, c = Kl.create();
	if (Bc && (i.visualViewport?.scale ?? 1) !== 1) return () => {};
	function l() {
		let t = i.getComputedStyle(n), c = i.getComputedStyle(r), l = (t.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
		a = n.scrollTop, o = n.scrollLeft, Qg = {
			scrollbarGutter: n.style.scrollbarGutter,
			overflowY: n.style.overflowY,
			overflowX: n.style.overflowX
		}, e_ = n.style.scrollBehavior, $g = {
			position: r.style.position,
			height: r.style.height,
			width: r.style.width,
			boxSizing: r.style.boxSizing,
			overflowY: r.style.overflowY,
			overflowX: r.style.overflowX,
			scrollBehavior: r.style.scrollBehavior
		};
		let u = n.scrollHeight > n.clientHeight, d = n.scrollWidth > n.clientWidth, f = t.overflowY === "scroll" || c.overflowY === "scroll", p = t.overflowX === "scroll" || c.overflowX === "scroll", m = Math.max(0, i.innerWidth - r.clientWidth), h = Math.max(0, i.innerHeight - r.clientHeight), g = parseFloat(c.marginTop) + parseFloat(c.marginBottom), _ = parseFloat(c.marginLeft) + parseFloat(c.marginRight), v = Gg(n, r);
		s = Jg(e), s ? (n.style.scrollbarGutter = l, v.style.overflowY = "hidden", v.style.overflowX = "hidden") : (Object.assign(n.style, {
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
		Object.assign(n.style, Qg), Object.assign(r.style, $g), s || (n.scrollTop = a, n.scrollLeft = o, n.removeAttribute("data-base-ui-scroll-locked"), n.style.scrollBehavior = e_);
	}
	function d() {
		u(), c.request(l);
	}
	l();
	let f = $(i, "resize", d);
	return () => {
		c.cancel(), u(), typeof i.removeEventListener == "function" && f();
	};
}
function Zg(e = !0, t = null) {
	G(() => {
		if (e) return n_.acquire(t);
	}, [e, t]);
}
var Qg, $g, e_, t_, n_, r_ = o((() => {
	Wn(), Il(), qc(), Fr(), ar(), Ec(), ql(), Qg = {}, $g = {}, e_ = "", t_ = class {
		lockCount = 0;
		restore = null;
		timeoutLock = Tc.create();
		timeoutUnlock = Tc.create();
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
			let t = Pr(e), n = t.documentElement, r = t.body, i = xn(n);
			if (Kg(i, n, r)) {
				let t = new i.MutationObserver(() => {
					Kg(i, n, r) || (t.disconnect(), this.restore = null, this.lock(e));
				}), a = { attributes: !0 };
				t.observe(n, a), t.observe(r, a), this.restore = () => t.disconnect();
				return;
			}
			let a = Pc || !qg(e);
			this.restore = a ? Yg(e) : Xg(e);
		}
	}, n_ = new t_();
}));
// node_modules/@base-ui/react/dialog/root/useDialogRoot.mjs
function i_({ store: e, parentContext: t, isDrawer: n }) {
	let r = e.useState("open"), i = e.useState("mounted"), a = e.useState("disablePointerDismissal"), o = e.useState("modal"), s = e.useState("popupElement"), c = e.useState("floatingRootContext"), [l, u] = a_.useState(0), [d, f] = a_.useState(0), p = l === 0, m = Of(c, {
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
			let n = rl(t);
			if (p && !a) {
				if (o) {
					let t = e.context.internalBackdropRef.current, r = e.context.backdropRef.current;
					return t || r ? t === n || r === n || Q(n, s) && !n?.hasAttribute("data-base-ui-portal") : !0;
				}
				return !0;
			}
			return !1;
		},
		escapeKey: p
	});
	return Zg(r && o === !0, s), e.useContextCallback("onNestedDialogOpen", (t, n) => {
		(e.select("open") || e.select("mounted")) && (u(t), f(n));
	}), G(() => {
		!r && !i && (u(0), f(0));
	}, [r, i]), G(() => (t?.onNestedDialogOpen && r && t.onNestedDialogOpen(l + 1, d + +!!n), () => {
		t?.onNestedDialogOpen && r && t.onNestedDialogOpen(0, 0);
	}), [
		n,
		r,
		l,
		d,
		t
	]), cp(e, {
		activeTriggerProps: m.reference,
		inactiveTriggerProps: m.trigger,
		popupProps: m.floating,
		nestedOpenDialogCount: l,
		nestedOpenDrawerCount: d
	}), null;
}
var a_, o_ = o((() => {
	a_ = /* @__PURE__ */ u(p(), 1), ar(), r_(), og(), qp(), lm();
}));
// node_modules/@base-ui/react/dialog/store/DialogStore.mjs
function s_(e, t, n, r = !1) {
	return {
		...Zp(t, n, r),
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
function c_(e) {
	return {
		popupRef: /*#__PURE__*/ l_.createRef(),
		backdropRef: /*#__PURE__*/ l_.createRef(),
		internalBackdropRef: /*#__PURE__*/ l_.createRef(),
		outsidePressEnabledRef: { current: !0 },
		triggerElements: e,
		onOpenChange: void 0,
		onOpenChangeComplete: void 0
	};
}
var l_, u_, d_, f_ = o((() => {
	l_ = /* @__PURE__ */ u(p(), 1), Kp(), lm(), u_ = {
		...rm,
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
	}, d_ = class extends Up {
		constructor(e, t, n) {
			let r = new mp(), i = s_(e, r, t, n);
			super(i, c_(r), u_);
		}
		setOpen = (e, t) => {
			t.preventUnmountOnClose = () => {
				this.set("preventUnmountingOnClose", !0);
			}, !e && t.trigger == null && this.state.activeTriggerId != null && (t.trigger = this.state.activeTriggerElement ?? void 0), this.context.onOpenChange?.(e, t), t.isCanceled || (this.state.floatingRootContext.dispatchOpenChange(e, t), this.update(np(this.state, e, t.trigger)));
		};
	};
}));
// node_modules/@base-ui/react/dialog/root/useRenderDialogRoot.mjs
function p_(e, t) {
	let { children: n, open: r, defaultOpen: i = !1, onOpenChange: a, onOpenChangeComplete: o, disablePointerDismissal: s = !1, modal: c = !0, actionsRef: l, handle: u, triggerId: d, defaultTriggerId: f = null } = t, p = e === "drawer", m = e === "alert-dialog", h = m ? !0 : c, g = m || s, _ = m ? "alertdialog" : "dialog", v = ts(!0), y = {
		modal: h,
		disablePointerDismissal: g,
		nested: v != null,
		role: _
	}, b = Qf((e, t) => new d_({
		open: i,
		openProp: r,
		activeTriggerId: f,
		triggerIdProp: d,
		...y
	}, e, t), !0);
	b.useControlledProp("openProp", r), b.useControlledProp("triggerIdProp", d), b.useSyncedValues(y), b.useContextCallback("onOpenChange", a), b.useContextCallback("onOpenChangeComplete", o);
	let x = b.useState("open"), S = b.useState("mounted"), C = b.useState("payload");
	lp(b, x), op(b);
	let { forceUnmount: w } = sp(x, b);
	m_.useImperativeHandle(l, () => ({
		unmount: w,
		close: () => b.setOpen(!1, Ns($s))
	}), [w, b]);
	let T = x || S || u != null;
	return /*#__PURE__*/ (0, h_.jsxs)(rs.Provider, {
		value: b,
		children: [
			u && /*#__PURE__*/ (0, h_.jsx)($f, {
				handle: u,
				store: b
			}),
			T && /*#__PURE__*/ (0, h_.jsx)(i_, {
				store: b,
				parentContext: v?.context,
				isDrawer: p
			}),
			typeof n == "function" ? n({ payload: C }) : n
		]
	});
}
var m_, h_, g_ = o((() => {
	m_ = /* @__PURE__ */ u(p(), 1), o_(), is(), f_(), Fs(), nc(), lm(), h_ = lo();
})), __, v_ = o((() => {
	Ap(), g_(), __ = wp(function(e) {
		return p_("dialog", e);
	});
})), y_, b_, x_ = o((() => {
	y_ = /* @__PURE__ */ u(p(), 1), is(), xi(), gc(), b_ = /*#__PURE__*/ y_.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, id: a, ...o } = e, s = ts(), c = hc(a);
		return s.useSyncedValueWithCleanup("titleElementId", c), fi("h2", e, {
			ref: t,
			props: [{ id: c }, o]
		});
	});
}));
// node_modules/@base-ui/utils/useEnhancedClickHandler.mjs
function S_(e) {
	let t = C_.useRef(""), n = C_.useCallback((n) => {
		n.defaultPrevented || (t.current = n.pointerType, e(n, n.pointerType));
	}, [e]);
	return {
		onClick: C_.useCallback((n) => {
			n.detail === 0 ? e(n, "keyboard") : ("pointerType" in n ? e(n, n.pointerType) : e(n, t.current), t.current = "");
		}, [e]),
		onPointerDown: n
	};
}
var C_, w_ = o((() => {
	C_ = /* @__PURE__ */ u(p(), 1);
}));
// node_modules/@base-ui/react/internals/useValueChanged.mjs
function T_(e, t) {
	let n = E_.useRef(e), r = W(t);
	G(() => {
		n.current !== e && r(n.current), n.current = e;
	}, [e, r]);
}
var E_, D_ = o((() => {
	E_ = /* @__PURE__ */ u(p(), 1), ar(), nr();
}));
// node_modules/@base-ui/react/utils/useOpenInteractionType.mjs
function O_(e, t) {
	let { onClick: n, onPointerDown: r } = S_(W((n, r) => {
		(typeof e == "function" ? e() : e) || t(r || (Pc ? "touch" : ""));
	}));
	return A_.useMemo(() => ({
		onClick: n,
		onPointerDown: r
	}), [n, r]);
}
function k_(e) {
	let [t, n] = A_.useState(null), r = O_(e, n);
	return T_(e, (t) => {
		t && !e && n(null);
	}), A_.useMemo(() => ({
		openMethod: t,
		triggerProps: r
	}), [t, r]);
}
var A_, j_ = o((() => {
	A_ = /* @__PURE__ */ u(p(), 1), nr(), w_(), qc(), D_();
})), M_ = o((() => {
	js(), ac(), yc(), Pg(), Wg(), v_(), xi(), is(), ug(), Ag(), x_(), Er(), Ap(), Hr(), Os(), Nd(), lm(), gc(), og(), j_(), f_(), Fs(), nc(), Mf();
})), N_ = o((() => {
	M_(), Os(), Eg(), Og();
}));
// src/components/ui/portal-context.tsx
function P_({ container: e, children: t }) {
	return /* @__PURE__ */ (0, L_.jsx)(R_.Provider, {
		value: e,
		children: t
	});
}
function F_() {
	return (0, I_.useContext)(R_);
}
var I_, L_, R_, z_ = o((() => {
	I_ = /* @__PURE__ */ u(p(), 1), L_ = lo(), R_ = (0, I_.createContext)(null);
}));
// src/components/ui/dialog.tsx
function B_({ ...e }) {
	return /* @__PURE__ */ (0, J_.jsx)(__, {
		"data-slot": "dialog",
		...e
	});
}
function V_({ container: e, ...t }) {
	let n = F_();
	return /* @__PURE__ */ (0, J_.jsx)(Ug, {
		"data-slot": "dialog-portal",
		container: e ?? n ?? void 0,
		...t
	});
}
function H_({ className: e, ...t }) {
	return /* @__PURE__ */ (0, J_.jsx)(As, {
		"data-slot": "dialog-overlay",
		className: J("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", e),
		...t
	});
}
function U_({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ (0, J_.jsxs)(V_, { children: [/* @__PURE__ */ (0, J_.jsx)(H_, {}), /* @__PURE__ */ (0, J_.jsxs)(Ng, {
		"data-slot": "dialog-content",
		className: J("oo-dialog-popup fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...r,
		children: [t, n && /* @__PURE__ */ (0, J_.jsxs)(ic, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ (0, J_.jsx)(Y, {
				variant: "ghost",
				className: "absolute top-2 right-2",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, J_.jsx)(pn, {}), /* @__PURE__ */ (0, J_.jsx)("span", {
				className: "sr-only",
				children: "Fechar diálogo"
			})]
		})]
	})] });
}
function W_({ className: e, ...t }) {
	return /* @__PURE__ */ (0, J_.jsx)("div", {
		"data-slot": "dialog-header",
		className: J("flex flex-col gap-2", e),
		...t
	});
}
function G_({ className: e, showCloseButton: t = !1, children: n, ...r }) {
	return /* @__PURE__ */ (0, J_.jsxs)("div", {
		"data-slot": "dialog-footer",
		className: J("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", e),
		...r,
		children: [n, t && /* @__PURE__ */ (0, J_.jsx)(ic, {
			render: /* @__PURE__ */ (0, J_.jsx)(Y, { variant: "outline" }),
			children: "Close"
		})]
	});
}
function K_({ className: e, ...t }) {
	return /* @__PURE__ */ (0, J_.jsx)(b_, {
		"data-slot": "dialog-title",
		className: J("font-heading text-base leading-none font-medium", e),
		...t
	});
}
function q_({ className: e, ...t }) {
	return /* @__PURE__ */ (0, J_.jsx)(vc, {
		"data-slot": "dialog-description",
		className: J("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", e),
		...t
	});
}
var J_, Y_ = o((() => {
	p(), N_(), so(), z_(), po(), vn(), J_ = lo();
}));
po(), Y_();
var X_ = class extends Z.Component {
	state = { failed: !1 };
	static getDerivedStateFromError() {
		return { failed: !0 };
	}
	render() {
		return this.state.failed ? /* @__PURE__ */ (0, X.jsx)(B_, {
			open: !0,
			onOpenChange: (e) => {
				e || this.props.onClose();
			},
			children: /* @__PURE__ */ (0, X.jsxs)(U_, { children: [/* @__PURE__ */ (0, X.jsxs)(W_, { children: [/* @__PURE__ */ (0, X.jsx)(K_, { children: "Perfil indisponível" }), /* @__PURE__ */ (0, X.jsx)(q_, { children: "Não foi possível abrir o perfil. Feche e tente novamente." })] }), /* @__PURE__ */ (0, X.jsx)(Y, {
				onClick: this.props.onClose,
				children: "Fechar"
			})] })
		}) : this.props.children;
	}
};
// node_modules/@base-ui/react/use-render/useRender.mjs
xi();
function Z_(e) {
	return fi(e.defaultTagName ?? "div", e, e);
}
// src/hooks/use-mobile.ts
var Q_ = 768;
function $_() {
	let [e, t] = Z.useState(void 0);
	return Z.useEffect(() => {
		let e = window.matchMedia("(max-width: 767px)"), n = () => {
			t(window.innerWidth < Q_);
		};
		return e.addEventListener("change", n), t(window.innerWidth < Q_), () => e.removeEventListener("change", n);
	}, []), !!e;
}
// node_modules/@base-ui/react/internals/noop.mjs
var ev = o((() => {
	ai();
})), tv, nv, rv = o((() => {
	tv = "data-valid", nv = "data-invalid";
})), iv, av, ov, sv, cv = o((() => {
	rv(), iv = {
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
	}, av = {
		valid: null,
		touched: !1,
		dirty: !1,
		filled: !1,
		focused: !1
	}, ov = {
		disabled: !1,
		...av
	}, sv = { valid(e) {
		return e === null ? null : e ? { [tv]: "" } : { [nv]: "" };
	} };
}));
// node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
function lv(e = !0) {
	let t = uv.useContext(fv);
	if (t.setValidityData === ni && !e) throw Error(Tr(28));
	return t;
}
var uv, dv, fv, pv = o((() => {
	Er(), uv = /* @__PURE__ */ u(p(), 1), ai(), ev(), cv(), dv = {
		invalid: void 0,
		name: void 0,
		validityData: {
			state: iv,
			errors: [],
			error: "",
			value: "",
			initialValue: null
		},
		setValidityData: ni,
		disabled: void 0,
		setTouched: ni,
		setDirty: ni,
		setFilled: ni,
		setFocused: ni,
		focusOwnerRef: { current: void 0 },
		validationMode: "onSubmit",
		shouldValidateOnChange: () => !1,
		state: ov,
		registerFieldControl: ni,
		validation: {
			getValidationProps: (e, t = ii) => t,
			inputRef: { current: null },
			registeredInputs: /* @__PURE__ */ new Map(),
			registerInput: ni,
			getInputControl: () => null,
			commit: async () => {},
			change: ni
		}
	}, fv = /*#__PURE__*/ uv.createContext(dv);
}));
// node_modules/@base-ui/react/internals/form-context/FormContext.mjs
function mv() {
	return hv.useContext(gv);
}
var hv, gv, _v = o((() => {
	hv = /* @__PURE__ */ u(p(), 1), ev(), gv = /*#__PURE__*/ hv.createContext({
		elementRef: { current: null },
		formRef: { current: { fields: /* @__PURE__ */ new Map() } },
		errors: {},
		clearErrors: ni,
		validationMode: "onSubmit",
		submitCountRef: { current: 0 }
	});
}));
// node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
function vv() {
	return yv.useContext(bv);
}
var yv, bv, xv = o((() => {
	yv = /* @__PURE__ */ u(p(), 1), ev(), bv = /*#__PURE__*/ yv.createContext({
		controlId: void 0,
		registerControlId: ni,
		resetControlId: ni,
		labelId: void 0,
		setLabelId: ni,
		messageIds: [],
		setMessageIds: ni,
		getDescriptionProps: (e) => e
	});
}));
// node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function Sv(e = {}) {
	let { id: t, enabled: n = !0 } = e, { controlId: r, registerControlId: i, resetControlId: a } = vv(), o = hc(), s = Jn(() => Symbol()), c = Cv.useRef(!1), l = Cv.useRef(!1), u = W(() => {
		c.current && i !== ni && (c.current = !1, i(s.current, void 0));
	});
	return G(() => {
		if (!n || i === ni) {
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
	]), G(() => u, [u]), (n ? r : void 0) ?? t ?? o;
}
var Cv, wv = o((() => {
	Cv = /* @__PURE__ */ u(p(), 1), ar(), nr(), Zn(), ev(), gc(), xv();
}));
// node_modules/@base-ui/react/internals/field-root-context/useSetFieldFocused.mjs
function Tv(e, t, n) {
	let { setFocused: r, focusOwnerRef: i } = lv(), a = W((t) => {
		(t ? !e : i.current === a) && (i.current = t && a, n?.(t), r(t));
	});
	return G(() => {
		let e = t.current;
		return e?.getRootNode()?.activeElement === e && a(!0), () => a(!1);
	}, [
		e,
		t,
		a
	]), a;
}
var Ev = o((() => {
	ar(), nr(), pv();
}));
// node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function Dv(e, t, n, r, i = !0, a) {
	let { registerFieldControl: o } = lv(), s = Jn(() => Symbol());
	G(() => {
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
	]), G(() => {
		let e = s.current;
		return () => {
			o(e, void 0);
		};
	}, [o, s]);
}
var Ov = o((() => {
	ar(), Zn(), pv();
})), kv, Av, jv = o((() => {
	kv = /* @__PURE__ */ u(p(), 1), ar(), nr(), Ec(), pv(), Ev(), Ov(), _v(), xv(), wv(), cv(), xi(), D_(), Fs(), nc(), Av = /*#__PURE__*/ kv.forwardRef(function(e, t) {
		let { render: n, className: r, id: i, name: a, value: o, disabled: s = !1, onValueChange: c, defaultValue: l, autoFocus: u = !1, style: d, ...f } = e, { state: p, name: m, disabled: h, setTouched: g, setDirty: _, validityData: v, setFilled: y, validationMode: b, validation: x } = lv(), { clearErrors: S, elementRef: C, submitCountRef: w } = mv(), T = h || s, E = m ?? a, D = {
			...p,
			disabled: T
		}, { labelId: O } = vv(), k = Sv({ id: i }), A = o !== void 0, j = o == null ? void 0 : String(o), M = W(() => x.inputRef.current?.value);
		Dv(x.inputRef, k, j, M, !T, a), G(() => {
			let e = j ?? x.inputRef.current?.value;
			e !== void 0 && y(e !== "");
		}, [
			j,
			l,
			x.inputRef,
			y
		]), T_(j, () => {
			j !== void 0 && (S(E), _(j !== (v.initialValue ?? "")), x.change(j));
		});
		let N = kv.useRef(null), P = Tv(T, N), F = Cc();
		return fi("input", e, {
			ref: [t, N],
			state: D,
			props: [
				{
					id: k,
					disabled: T,
					name: E,
					ref: x.inputRef,
					"aria-labelledby": O,
					autoFocus: u,
					...A ? { value: o } : { defaultValue: l },
					onChange(e) {
						let t = e.currentTarget.value, n = Ns(Is, e.nativeEvent);
						c?.(t, n), A || (_(t !== (v.initialValue ?? "")), y(t !== ""), !e.nativeEvent.defaultPrevented && !n.isCanceled && (S(E), x.change(t)));
					},
					onFocus() {
						P(!0);
					},
					onBlur(e) {
						if (g(!0), P(!1), b === "onBlur") {
							let t = e.currentTarget.value;
							x.commit(t), A && queueMicrotask(() => {
								let e = x.inputRef.current?.value;
								e !== void 0 && e !== t && e !== (v.initialValue ?? "") && x.commit(e);
							});
						}
					},
					onKeyDown(e) {
						if (e.currentTarget.tagName === "INPUT" && e.key === "Enter") {
							g(!0);
							let t = e.currentTarget.value, n = e.currentTarget.form;
							if (n && n === C.current && !e.defaultPrevented) {
								let t = e.currentTarget, n = w.current;
								F.start(0, () => {
									w.current === n && x.commit(t.value);
								});
							} else x.commit(t);
						}
					}
				},
				f,
				(e) => x.getValidationProps(T, e)
			],
			stateAttributesMapping: sv
		});
	});
})), Mv = o((() => {
	ar(), nr(), pv(), cv(), Er(), _v(), Zn(), gc(), xv(), wv(), Wn(), Fr(), qp(), xi(), ai(), Ec(), Cr(), qn(), qf(), ds(), Lf(), jv();
})), Nv = o((() => {
	Mv(), ds(), rv();
})), Pv, Fv, Iv, Lv = o((() => {
	Pv = /* @__PURE__ */ u(p(), 1), Nv(), Fv = lo(), Iv = /*#__PURE__*/ Pv.forwardRef(function(e, t) {
		return /*#__PURE__*/ (0, Fv.jsx)(Av, {
			ref: t,
			...e
		});
	});
})), Rv = o((() => {
	Lv();
}));
// src/components/ui/input.tsx
function zv({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ (0, Bv.jsx)(Iv, {
		type: t,
		"data-slot": "input",
		className: J("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", e),
		...n
	});
}
var Bv, Vv = o((() => {
	p(), Rv(), so(), Bv = lo();
}));
// node_modules/@base-ui/react/separator/Separator.mjs
xi();
var Hv = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { className: n, render: r, orientation: i = "horizontal", style: a, ...o } = e;
	return fi("div", e, {
		state: { orientation: i },
		ref: t,
		props: [{
			role: "separator",
			"aria-orientation": i
		}, o]
	});
});
Vv(), so();
function Uv({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(Hv, {
		"data-slot": "separator",
		orientation: t,
		className: J("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", e),
		...n
	});
}
N_(), so(), z_(), po(), vn();
function Wv({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(__, {
		"data-slot": "sheet",
		...e
	});
}
function Gv({ container: e, ...t }) {
	let n = F_();
	return /* @__PURE__ */ (0, X.jsx)(Ug, {
		"data-slot": "sheet-portal",
		container: e ?? n ?? void 0,
		...t
	});
}
function Kv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(As, {
		"data-slot": "sheet-overlay",
		className: J("fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs", e),
		...t
	});
}
function qv({ className: e, children: t, side: n = "right", showCloseButton: r = !0, ...i }) {
	return /* @__PURE__ */ (0, X.jsxs)(Gv, { children: [/* @__PURE__ */ (0, X.jsx)(Kv, {}), /* @__PURE__ */ (0, X.jsxs)(Ng, {
		"data-slot": "sheet-content",
		"data-side": n,
		className: J("d3-sheet-content fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm", e),
		...i,
		children: [t, r && /* @__PURE__ */ (0, X.jsxs)(ic, {
			"data-slot": "sheet-close",
			render: /* @__PURE__ */ (0, X.jsx)(Y, {
				variant: "ghost",
				className: "absolute top-3 right-3",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, X.jsx)(pn, {}), /* @__PURE__ */ (0, X.jsx)("span", {
				className: "sr-only",
				children: "Fechar navegação"
			})]
		})]
	})] });
}
function Jv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sheet-header",
		className: J("flex flex-col gap-0.5 p-4", e),
		...t
	});
}
function Yv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(b_, {
		"data-slot": "sheet-title",
		className: J("font-heading text-base font-medium text-foreground", e),
		...t
	});
}
function Xv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(vc, {
		"data-slot": "sheet-description",
		className: J("text-sm text-muted-foreground", e),
		...t
	});
}
// node_modules/@base-ui/react/tooltip/root/TooltipRootContext.mjs
Er();
var Zv = /*#__PURE__*/ Z.createContext(void 0);
function Qv(e) {
	let t = Z.useContext(Zv);
	if (t === void 0 && !e) throw Error(Tr(72));
	return t;
}
Kp(), Fs(), nc(), lm();
var $v = {
	...rm,
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
}, ey = class extends Up {
	constructor(e, t, n) {
		let r = new mp();
		super(ty(e, r, t, n), ny(r), $v);
	}
	setOpen = (e, t) => {
		ip(this, e, t, { extraState: { openChangeReason: t.reason } });
	};
	cancelPendingOpen(e) {
		this.state.floatingRootContext.dispatchOpenChange(!1, Ns(Ls, e));
	}
};
function ty(e, t, n, r = !1) {
	return {
		...Zp(t, n, r),
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
function ny(e) {
	return {
		popupRef: /*#__PURE__*/ Z.createRef(),
		onOpenChange: void 0,
		onOpenChangeComplete: void 0,
		triggerElements: e
	};
}
Ap(), ai(), ar(), og(), Fs(), lm(), Cr(), nc();
var ry = wp(function(e) {
	let { disabled: t = !1, defaultOpen: n = !1, open: r, disableHoverablePopup: i = !1, trackCursorAxis: a = "none", actionsRef: o, onOpenChange: s, onOpenChangeComplete: c, handle: l, triggerId: u, defaultTriggerId: d = null, children: f } = e, p = Qf((e, t) => new ey({
		open: n,
		openProp: r,
		activeTriggerId: d,
		triggerIdProp: u
	}, e, t));
	p.useControlledProp("openProp", r), p.useControlledProp("triggerIdProp", u), p.useContextCallback("onOpenChange", s), p.useContextCallback("onOpenChangeComplete", c);
	let m = p.useState("open"), h = !t && m, g = p.useState("activeTriggerId"), _ = p.useState("mounted"), v = p.useState("payload");
	p.useSyncedValues({
		trackCursorAxis: a,
		disableHoverablePopup: i,
		disabled: t
	}), op(p, { closeOnActiveTriggerUnmount: !0 });
	let { forceUnmount: y, transitionStatus: b } = sp(h, p), x = p.useState("isInstantPhase"), S = p.useState("instantType"), C = p.useState("lastOpenChangeReason"), w = Z.useRef(null);
	G(() => {
		m && t && p.setOpen(!1, Ns(Xs));
	}, [
		m,
		t,
		p
	]), G(() => {
		b === "ending" && C === "none" || b !== "ending" && x ? (S !== "delay" && (w.current = S), p.set("instantType", "delay")) : w.current !== null && (p.set("instantType", w.current), w.current = null);
	}, [
		b,
		x,
		C,
		S,
		p
	]), G(() => {
		h && (g ?? p.set("payload", void 0));
	}, [
		p,
		g,
		h
	]), Z.useImperativeHandle(o, () => ({
		unmount: y,
		close: () => p.setOpen(!1, Ns($s))
	}), [y, p]);
	let T = h || _ || !t && a !== "none";
	return /*#__PURE__*/ (0, X.jsxs)(Zv.Provider, {
		value: p,
		children: [
			l && /*#__PURE__*/ (0, X.jsx)($f, {
				handle: l,
				store: p
			}),
			T && /*#__PURE__*/ (0, X.jsx)(iy, {
				store: p,
				disabled: t,
				trackCursorAxis: a
			}),
			typeof f == "function" ? f({ payload: v }) : f
		]
	});
});
function iy({ store: e, disabled: t, trackCursorAxis: n }) {
	let r = e.useState("floatingRootContext"), i = Of(r, {
		enabled: !t,
		referencePress: () => e.select("closeOnClick")
	}), a = Cf(r, {
		enabled: !t && n !== "none",
		axis: n === "none" ? void 0 : n
	}), o = Z.useMemo(() => cr(a.reference, i.reference), [a.reference, i.reference]);
	return cp(e, {
		activeTriggerProps: o,
		inactiveTriggerProps: o,
		popupProps: i.floating ?? ii
	}), null;
}
// node_modules/@base-ui/react/tooltip/provider/TooltipProviderContext.mjs
var ay = /*#__PURE__*/ Z.createContext(void 0);
function oy() {
	return Z.useContext(ay);
}
Er(), Wn(), Ap(), Ec(), Vl(), Os(), xi(), lm(), gc(), og(), Sl(), el(), Fs(), nc(), xm(), Ol(), pl();
var sy = "data-base-ui-tooltip-trigger";
function cy(e) {
	let t = rl(e);
	return wn(t) ? t : null;
}
var ly = Tp(function(e, t) {
	let { render: n, className: r, style: i, handle: a, payload: o, disabled: s, delay: c, closeOnClick: l = !0, closeDelay: u, id: d, ...f } = e, p = Qv(!0), m = am(a) ?? p;
	if (!m) throw Error(Tr(82));
	let h = hc(d), g = m.useState("isTriggerActive", h), _ = m.useState("isOpenedByTrigger", h), v = m.useState("floatingRootContext"), y = Z.useRef(null), b = u ?? 0, { registerTrigger: x, isMountedByThisTrigger: S } = ap(h, y, m, {
		payload: o,
		closeOnClick: l,
		closeDelay: b
	}), C = oy(), { activeIdRef: w, delayRef: T, isInstantPhase: E, hasProvider: D } = jl(v, { open: _ }), O = vm(v);
	m.useSyncedValue("isInstantPhase", E);
	let k = m.useState("disabled"), A = s ?? k, j = zl(A), M = m.useState("trackCursorAxis"), N = m.useState("disableHoverablePopup"), P = Z.useRef(!1), F = Cc(), I = Z.useRef(void 0);
	function L() {
		return D && w.current != null ? 0 : c ?? C ?? 600;
	}
	function R(e) {
		let t = y.current;
		if (!t || !e) return !1;
		let n = nl(e, `[${sy}]`);
		return n !== null && n !== t && Q(t, n);
	}
	function ee(e) {
		let t = R(e);
		return P.current = t, t && (O.openChangeTimeout.clear(), O.restTimeout.clear(), O.restTimeoutPending = !1, F.clear()), t;
	}
	let z = Tm(v, {
		enabled: !A,
		mouseOnly: !0,
		move: !1,
		handleClose: !N && M !== "both" ? Km() : null,
		restMs: L,
		delay() {
			return u == null && D ? { close: wl(T.current, "close") } : { close: b };
		},
		triggerElementRef: y,
		isActiveTrigger: g,
		isClosing: () => m.select("transitionStatus") === "ending",
		shouldOpen() {
			return !P.current;
		}
	}), te = fm(v, { enabled: !A }).reference, B = (e) => {
		let t = P.current, n = cy(e), r = ee(n), i = y.current, a = i && n && Q(i, n);
		if (r && m.select("open") && m.select("lastOpenChangeReason") === "trigger-hover") m.setOpen(!1, Ns(Rs, e));
		else if (t && !r && a && !j.current && !m.select("open") && i && Qc(I.current)) {
			let t = () => {
				P.current || j.current || m.select("open") || m.setOpen(!0, Ns(Rs, e, i));
			}, n = L();
			n === 0 ? (F.clear(), t()) : F.start(n, t);
		}
	}, ne = m.useState("appliedTriggerProps", S || M !== "none");
	return fi("button", e, {
		state: { open: _ },
		ref: [
			t,
			x,
			y
		],
		props: [
			z,
			te,
			ne,
			{
				onMouseOver(e) {
					B(e.nativeEvent);
				},
				onFocus(e) {
					R(cy(e.nativeEvent)) && e.preventBaseUIHandler();
				},
				onMouseLeave() {
					P.current = !1, F.clear(), I.current = void 0;
				},
				onPointerEnter(e) {
					I.current = e.pointerType;
				},
				onPointerDown(e) {
					I.current = e.pointerType, m.set("closeOnClick", l), l && !m.select("open") && m.cancelPendingOpen(e.nativeEvent);
				},
				onClick(e) {
					l && !m.select("open") && m.cancelPendingOpen(e.nativeEvent);
				},
				id: h,
				[fl]: A ? "" : void 0,
				[sy]: A ? void 0 : ""
			},
			f
		],
		stateAttributesMapping: ws
	});
});
// node_modules/@base-ui/react/tooltip/portal/TooltipPortalContext.mjs
Er();
var uy = /*#__PURE__*/ Z.createContext(void 0);
function dy() {
	let e = Z.useContext(uy);
	if (e === void 0) throw Error(Tr(70));
	return e;
}
// node_modules/@base-ui/react/utils/FloatingPortalLite.mjs
Hd();
var fy = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { children: n, container: r, className: i, render: a, style: o, ...s } = e, { node: c, subtree: l } = Pd({
		container: r,
		ref: t,
		componentProps: e,
		elementProps: s
	});
	return !l && !c ? null : /*#__PURE__*/ (0, X.jsxs)(Z.Fragment, { children: [l, c && /*#__PURE__*/ xo.createPortal(n, c)] });
}), py = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e;
	return Qv().useState("mounted") || n ? /*#__PURE__*/ (0, X.jsx)(uy.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, X.jsx)(fy, {
			ref: t,
			...r
		})
	}) : null;
});
// node_modules/@base-ui/react/tooltip/positioner/TooltipPositionerContext.mjs
Er();
var my = /*#__PURE__*/ Z.createContext(void 0);
function hy() {
	let e = Z.useContext(my);
	if (e === void 0) throw Error(Tr(71));
	return e;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useFloating.mjs
function gy(e) {
	let { nodeId: t, externalTree: n, rootContext: r } = e, i = r.useState("referenceElement"), a = r.useState("floatingElement"), o = r.useState("domReferenceElement"), s = r.useState("open"), c = r.useState("floatingId"), [l, u] = _y.useState(null), d = _y.useRef(null), f = tf(n), p = _y.useMemo(() => ({
		reference: i,
		floating: a,
		domReference: o
	}), [
		i,
		a,
		o
	]), m = Yh({
		...e,
		elements: {
			...p,
			...l && { reference: l }
		}
	}), h = _y.useCallback((e) => {
		let t = wn(e) ? {
			getBoundingClientRect: () => e.getBoundingClientRect(),
			getClientRects: () => e.getClientRects(),
			contextElement: e
		} : e;
		u(t), m.refs.setReference(t);
	}, [m.refs]), g = _y.useMemo(() => ({
		...m.refs,
		setPositionReference: h,
		domReference: d
	}), [m.refs, h]), _ = _y.useMemo(() => ({
		...m.elements,
		domReference: o
	}), [m.elements, o]), v = _y.useMemo(() => ({
		...m,
		dataRef: r.context.dataRef,
		open: s,
		onOpenChange: r.setOpen,
		events: r.context.events,
		floatingId: c,
		refs: g,
		elements: _,
		nodeId: t,
		rootStore: r
	}), [
		m,
		g,
		_,
		t,
		r,
		s,
		c
	]);
	return G(() => {
		o && (d.current = o);
	}, [o]), G(() => {
		r.context.dataRef.current.floatingContext = v;
		let e = f?.nodesRef.current.find((e) => e.id === t);
		e && (e.context = v);
	}), _y.useMemo(() => ({
		...m,
		context: v,
		refs: g,
		elements: _,
		rootStore: r
	}), [
		m,
		g,
		_,
		v,
		r
	]);
}
var _y, vy = o((() => {
	_y = /* @__PURE__ */ u(p(), 1), ar(), ag(), Wn(), nf();
}));
// node_modules/@base-ui/react/internals/direction-context/DirectionContext.mjs
function yy() {
	return by.useContext(xy)?.direction ?? "ltr";
}
var by, xy, Sy = o((() => {
	by = /* @__PURE__ */ u(p(), 1), xy = /*#__PURE__*/ by.createContext(void 0);
})), Cy, wy, Ty = o((() => {
	ku(), Cy = (e) => ({
		name: "arrow",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = ru(e, t) || {};
			if (l == null) return {};
			let d = _u(u), f = {
				x: n,
				y: r
			}, p = lu(i), m = su(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = s.floating[y] || a.floating[m], C = b / 2 - x / 2, w = S / 2 - h[m] / 2 - 1, T = Math.min(d[_], w), E = Math.min(d[v], w), D = T, O = S - h[m] - E, k = S / 2 - h[m] / 2 + C, A = nu(D, k, O), j = !c.arrow && au(i) != null && k !== A && a.reference[m] / 2 - (k < D ? T : E) - h[m] / 2 < 0, M = j ? k < D ? k - D : k - O : 0;
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
	}), wy = (e, t) => {
		let { name: n, fn: r } = Cy(e);
		return {
			name: n,
			fn: r,
			options: [e, t]
		};
	};
})), Ey, Dy = o((() => {
	Ey = {
		name: "hide",
		async fn(e) {
			let { width: t, height: n, x: r, y: i } = e.rects.reference, a = t === 0 && n === 0 && r === 0 && i === 0, o = await e.platform.detectOverflow(e, { elementContext: "reference" });
			return { data: { referenceHidden: o.top - n >= 0 || o.right - t >= 0 || o.bottom - n >= 0 || o.left - t >= 0 || a } };
		}
	};
})), Oy, ky = o((() => {
	Oy = {
		sideX: "left",
		sideY: "top"
	};
})), Ay, jy, My, Ny, Py, Fy = o((() => {
	Ay = "--available-width", jy = "--available-height", My = "--anchor-width", Ny = "--anchor-height", Py = "--transform-origin";
}));
// node_modules/@base-ui/react/internals/useAnchorPositioning.mjs
function Iy(e, t, n) {
	let r = e === "inline-start" || e === "inline-end";
	return {
		top: "top",
		right: r ? n ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: r ? n ? "inline-end" : "inline-start" : "left"
	}[t];
}
function Ly(e, t, n) {
	let { rects: r, placement: i } = e;
	return {
		side: Iy(t, iu(i), n),
		align: au(i) || "center",
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
function Ry(e) {
	return zy(e, gy);
}
function zy(e, t) {
	let { anchor: n, positionMethod: r = "absolute", side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, collisionBoundary: c, collisionPadding: l = 5, sticky: u = !1, arrowPadding: d = 5, disableAnchorTracking: f = !1, inline: p, keepMounted: m = !1, floatingRootContext: h, mounted: g, collisionAvoidance: _, shift: v, nodeId: y, adaptiveOrigin: b, lazyFlip: x = !1, externalTree: S } = e, C = _.side || "flip", w = _.align || "flip", T = _.fallbackAxisSide || "end", E = v?.crossAxis ?? !1, D = v?.rootBoundary, O = typeof n == "function" ? n : void 0, k = W(O), A = O ? k : n, j = zl(n), M = zl(g), N = yy() === "rtl", [P, F] = Vy.useState(null);
	!g && P !== null && F(null);
	let I = x === "placement", L = P ? iu(P) : null, R = P && I ? au(P) || "center" : null, ee = L || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": N ? "left" : "right",
		"inline-start": N ? "right" : "left"
	}[i], z = R || o, te = z === "center" ? ee : `${ee}-${z}`, B = l;
	typeof B == "number" ? B = {
		top: B,
		right: B,
		bottom: B,
		left: B
	} : B &&= {
		top: B.top || 0,
		right: B.right || 0,
		bottom: B.bottom || 0,
		left: B.left || 0
	};
	let ne = +(i === "bottom"), re = +(i === "top"), V = +(i === "right"), H = +(i === "left"), ie = {
		boundary: c === "clipping-ancestors" ? "clippingAncestors" : c,
		padding: B
	}, ae = Vy.useRef(null), U = zl(a), oe = zl(s), se = typeof a == "function" ? 0 : a, ce = typeof s == "function" ? 0 : s, le = [];
	p && le.push(p), le.push(eg((e) => {
		let t = Ly(e, i, N), n = typeof U.current == "function" ? U.current(t) : U.current, r = typeof oe.current == "function" ? oe.current(t) : oe.current;
		return {
			mainAxis: n,
			crossAxis: r,
			alignmentAxis: r
		};
	}, [
		se,
		ce,
		N,
		i
	]));
	let ue = w === "none" && C !== "shift", de = !ue && (u || E || C === "shift"), fe = C === "none" ? null : rg({
		...ie,
		padding: {
			top: B.top + 1 + ne,
			right: B.right + 1 + H,
			bottom: B.bottom + 1 + re,
			left: B.left + 1 + V
		},
		mainAxis: !E && C === "flip",
		crossAxis: w === "flip" && "alignment",
		fallbackAxisSideDirection: T
	}), pe = ue ? null : tg({
		...ie,
		rootBoundary: D,
		mainAxis: w !== "none",
		crossAxis: de,
		limiter: u || E ? void 0 : ng((e) => {
			if (!ae.current) return {};
			let { width: t, height: n } = ae.current.getBoundingClientRect(), r = cu(iu(e.placement)), i = r === "y" ? t : n, a = r === "y" ? B.left + B.right : B.top + B.bottom;
			return { offset: i / 2 + a / 2 };
		})
	}, [
		ie,
		u,
		E,
		D,
		B,
		w
	]);
	C === "shift" || w === "shift" || z === "center" ? le.push(pe, fe) : le.push(fe, pe), le.push(ig({
		...ie,
		apply({ elements: { floating: e }, availableWidth: t, availableHeight: n, rects: r }) {
			if (!M.current) return;
			let i = e.style;
			i.setProperty(Hy, `${t}px`), i.setProperty(Uy, `${n}px`);
			let a = xn(e).devicePixelRatio || 1, { x: o, y: s, width: c, height: l } = r.reference, u = (Math.round((o + c) * a) - Math.round(o * a)) / a, d = (Math.round((s + l) * a) - Math.round(s * a)) / a;
			i.setProperty(My, `${u}px`), i.setProperty(Ny, `${d}px`);
		}
	}), wy((e) => ({
		element: ae.current || Pr(e.elements.floating).createElement("div"),
		padding: ae.current ? d : 0
	}), [d]), {
		name: "transformOrigin",
		fn(e) {
			let { elements: { floating: t }, middlewareData: n, placement: r, platform: o, rects: s, y: c } = e, l = iu(r), u = au(r), d = cu(l) === "y", f = ae.current, p = typeof a == "function" ? a(Ly(e, i, N)) : a, m;
			m = !f && u && Math.abs(d ? n.shift?.x || 0 : n.shift?.y || 0) <= 1 ? u === "start" === (d && o.isRTL?.(t) === !0) ? "100%" : "0%" : `${(d ? n.arrow?.x || 0 : n.arrow?.y || 0) + (d ? f?.clientWidth || 0 : f?.clientHeight || 0) / 2}px`;
			let h = l === "top" || l === "left" ? `calc(100% + ${p}px)` : `${-p}px`;
			return de && d && Math.abs(n.shift?.y || 0) > p && (h = `${s.reference.y + s.reference.height / 2 - c}px`), t.style.setProperty(Py, d ? `${m} ${h}` : `${h} ${m}`), {};
		}
	}, Ey, b), G(() => {
		!g && h && h.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null,
			positionReference: null
		});
	}, [g, h]);
	let me = Vy.useMemo(() => ({
		ancestorScroll: !f,
		elementResize: !f && typeof ResizeObserver < "u",
		layoutShift: !f && typeof IntersectionObserver < "u"
	}), [f]), { refs: he, elements: ge, x: _e, y: ve, middlewareData: ye, update: be, placement: xe, context: Se, isPositioned: Ce, floatingStyles: we } = t({
		rootContext: h,
		open: m ? g : void 0,
		placement: te,
		middleware: le,
		strategy: r,
		whileElementsMounted: m ? void 0 : (...e) => Nh(...e, me),
		nodeId: y,
		externalTree: S
	}), { sideX: Te, sideY: Ee } = ye.adaptiveOrigin || Oy, De = Ce ? r : "fixed", Oe = Vy.useMemo(() => {
		let e;
		return e = Ce ? b ? {
			position: De,
			[Te]: _e,
			[Ee]: ve
		} : {
			...we,
			position: De
		} : {
			position: De,
			top: 0,
			left: 0
		}, e[Hy] = "100vw", e[Uy] = "100vh", Ce || (e.opacity = 0), e;
	}, [
		b,
		De,
		Te,
		_e,
		Ee,
		ve,
		we,
		Ce
	]), ke = Vy.useRef(null);
	G(() => {
		if (!g) return;
		let e = j.current, t = typeof e == "function" ? e() : e, n = (By(t) ? t.current : t) || null;
		n !== ke.current && (he.setPositionReference(n), ke.current = n);
	}, [
		g,
		he,
		A,
		j
	]), Vy.useEffect(() => {
		if (!g) return;
		let e = j.current;
		typeof e != "function" && By(e) && e.current !== ke.current && (he.setPositionReference(e.current), ke.current = e.current);
	}, [
		g,
		he,
		A,
		j
	]), Vy.useEffect(() => {
		if (m && g && ge.reference && ge.floating) return Nh(ge.reference, ge.floating, be, me);
	}, [
		m,
		g,
		ge,
		be,
		me
	]);
	let Ae = iu(xe), je = Iy(i, Ae, N), Me = au(xe) || "center", Ne = !!ye.hide?.referenceHidden;
	G(() => {
		x && g && Ce && (Ae !== ee || I && Me !== z) && F(xe);
	}, [
		x,
		I,
		g,
		Ce,
		xe,
		Ae,
		Me,
		ee,
		z
	]);
	let Pe = Vy.useMemo(() => ({
		position: "absolute",
		top: ye.arrow?.y,
		left: ye.arrow?.x
	}), [ye.arrow]), Fe = ye.arrow?.centerOffset !== 0;
	return Vy.useMemo(() => ({
		positionerStyles: Oe,
		arrowStyles: Pe,
		arrowRef: ae,
		arrowUncentered: Fe,
		side: je,
		align: Me,
		physicalSide: Ae,
		anchorHidden: Ne,
		refs: he,
		context: Se,
		isPositioned: Ce,
		update: be
	}), [
		Oe,
		Pe,
		ae,
		Fe,
		je,
		Me,
		Ae,
		Ne,
		he,
		Se,
		Ce,
		be
	]);
}
function By(e) {
	return e != null && "current" in e;
}
var Vy, Hy, Uy, Wy = o((() => {
	Vy = /* @__PURE__ */ u(p(), 1), ku(), Fr(), ar(), Vl(), nr(), og(), vy(), Sy(), Ty(), Dy(), ky(), Fy(), Hy = Ay, Uy = jy;
}));
// node_modules/@base-ui/react/internals/getDisabledMountTransitionStyles.mjs
function Gy(e) {
	return e === "starting" ? kd : ii;
}
var Ky = o((() => {
	ai(), Nd();
}));
// node_modules/@base-ui/react/utils/usePositioner.mjs
function qy(e, t, { styles: n, transitionStatus: r, props: i, refs: a, hidden: o, inert: s = !1 }) {
	let c = { ...n };
	return s && (c.pointerEvents = "none"), fi("div", e, {
		state: t,
		ref: a,
		props: [
			{
				role: "presentation",
				hidden: o,
				style: c
			},
			Gy(r),
			i
		],
		stateAttributesMapping: Es
	});
}
var Jy = o((() => {
	Os(), xi(), Ky();
}));
Wy(), Nd(), Jy();
var Yy = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, anchor: i, positionMethod: a = "absolute", side: o = "top", align: s = "center", sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = jd, style: g, ..._ } = e, v = Qv(), y = dy(), b = v.useState("open"), x = v.useState("mounted"), S = v.useState("trackCursorAxis"), C = v.useState("disableHoverablePopup"), w = v.useState("floatingRootContext"), T = v.useState("instantType"), E = v.useState("transitionStatus"), D = Ry({
		anchor: i,
		positionMethod: a,
		floatingRootContext: w,
		mounted: x,
		side: o,
		sideOffset: c,
		align: s,
		alignOffset: l,
		collisionBoundary: u,
		collisionPadding: d,
		sticky: p,
		arrowPadding: f,
		disableAnchorTracking: m,
		keepMounted: y,
		collisionAvoidance: h,
		adaptiveOrigin: v.useState("adaptiveOrigin")
	}), O = qy(e, Z.useMemo(() => ({
		open: b,
		side: D.side,
		align: D.align,
		anchorHidden: D.anchorHidden,
		instant: S === "none" ? T : "tracking-cursor"
	}), [
		b,
		D.side,
		D.align,
		D.anchorHidden,
		S,
		T
	]), {
		styles: D.positionerStyles,
		transitionStatus: E,
		props: _,
		refs: [t, v.useStateSetter("positionerElement")],
		hidden: !x,
		inert: !b || S === "both" || C
	});
	return /*#__PURE__*/ (0, X.jsx)(my.Provider, {
		value: D,
		children: O
	});
});
Os(), qf(), xi(), Ky(), og(), lm();
var Xy = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = Qv(), { side: s, align: c } = hy(), l = o.useState("open"), u = o.useState("instantType"), d = o.useState("transitionStatus"), f = o.useState("popupProps"), p = o.useState("floatingRootContext"), m = o.useState("disabled"), h = o.useState("closeDelay");
	Gf({
		open: l,
		ref: o.context.popupRef,
		onComplete() {
			l && o.context.onOpenChangeComplete?.(!0);
		}
	}), Sm(p, {
		enabled: !m,
		closeDelay: h
	});
	let g = o.useStateSetter("popupElement");
	return fi("div", e, {
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
			fp,
			f,
			Gy(d),
			a
		],
		stateAttributesMapping: Ds
	});
});
Os(), xi();
var Zy = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = Qv(), { arrowRef: s, side: c, align: l, arrowUncentered: u, arrowStyles: d } = hy();
	return fi("div", e, {
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
		stateAttributesMapping: Es
	});
});
// node_modules/@base-ui/react/tooltip/provider/TooltipProvider.mjs
og();
var Qy = function(e) {
	let { delay: t, closeDelay: n, timeout: r = 400 } = e, i = Z.useMemo(() => ({
		open: t,
		close: n
	}), [t, n]);
	return /*#__PURE__*/ (0, X.jsx)(ay.Provider, {
		value: t,
		children: /*#__PURE__*/ (0, X.jsx)(Al, {
			delay: i,
			timeoutMs: r,
			children: e.children
		})
	});
};
// node_modules/@base-ui/utils/usePreviousValue.mjs
function $y(e) {
	let [t, n] = eb.useState({
		current: e,
		previous: null
	});
	return Object.is(e, t.current) || n({
		current: e,
		previous: t.current
	}), t.previous;
}
var eb, tb = o((() => {
	eb = /* @__PURE__ */ u(p(), 1);
}));
so(), z_();
function nb({ delay: e = 0, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(Qy, {
		"data-slot": "tooltip-provider",
		delay: e,
		...t
	});
}
function rb({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(ry, {
		"data-slot": "tooltip",
		...e
	});
}
function ib({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(ly, {
		"data-slot": "tooltip-trigger",
		...e
	});
}
function ab({ className: e, side: t = "top", sideOffset: n = 4, align: r = "center", alignOffset: i = 0, children: a, ...o }) {
	let s = F_();
	return /* @__PURE__ */ (0, X.jsx)(py, {
		container: s ?? void 0,
		children: /* @__PURE__ */ (0, X.jsx)(Yy, {
			align: r,
			alignOffset: i,
			side: t,
			sideOffset: n,
			className: "isolate z-50",
			children: /* @__PURE__ */ (0, X.jsxs)(Xy, {
				"data-slot": "tooltip-content",
				className: J("z-50 inline-flex w-fit max-w-xs origin-[var(--transform-origin)] items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...o,
				children: [a, /* @__PURE__ */ (0, X.jsx)(Zy, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })]
			})
		})
	});
}
Cr(), Mi(), so(), po(), vn();
var ob = "sidebar_state", sb = 604800, cb = "16rem", lb = "18rem", ub = "3rem", db = "b", fb = Z.createContext(null);
function pb() {
	let e = Z.useContext(fb);
	if (!e) throw Error("useSidebar must be used within a SidebarProvider.");
	return e;
}
function mb({ defaultOpen: e = !0, open: t, onOpenChange: n, className: r, style: i, children: a, ...o }) {
	let s = $_(), [c, l] = Z.useState(!1), [u, d] = Z.useState(e), f = t ?? u, p = Z.useCallback((e) => {
		let t = typeof e == "function" ? e(f) : e;
		n ? n(t) : d(t), document.cookie = `${ob}=${t}; path=/; max-age=${sb}`;
	}, [n, f]), m = Z.useCallback(() => s ? l((e) => !e) : p((e) => !e), [
		s,
		p,
		l
	]);
	Z.useEffect(() => {
		let e = (e) => {
			e.key === db && (e.metaKey || e.ctrlKey) && (e.preventDefault(), m());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [m]);
	let h = f ? "expanded" : "collapsed", g = Z.useMemo(() => ({
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
	return /* @__PURE__ */ (0, X.jsx)(fb.Provider, {
		value: g,
		children: /* @__PURE__ */ (0, X.jsx)("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": cb,
				"--sidebar-width-icon": ub,
				...i
			},
			className: J("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", r),
			...o,
			children: a
		})
	});
}
function hb({ side: e = "left", variant: t = "sidebar", collapsible: n = "offcanvas", className: r, children: i, dir: a, ...o }) {
	let { isMobile: s, state: c, openMobile: l, setOpenMobile: u } = pb();
	return n === "none" ? /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar",
		className: J("flex h-full w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground", r),
		...o,
		children: i
	}) : s ? /* @__PURE__ */ (0, X.jsx)(Wv, {
		open: l,
		onOpenChange: u,
		...o,
		children: /* @__PURE__ */ (0, X.jsxs)(qv, {
			dir: a,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-[var(--sidebar-width)] bg-sidebar p-0 text-sidebar-foreground",
			style: { "--sidebar-width": lb },
			side: e,
			children: [/* @__PURE__ */ (0, X.jsxs)(Jv, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, X.jsx)(Yv, { children: "Navegação" }), /* @__PURE__ */ (0, X.jsx)(Xv, { children: "Navegue entre as páginas da aplicação." })]
			}), /* @__PURE__ */ (0, X.jsx)("div", {
				className: "flex h-full w-full flex-col",
				children: i
			})]
		})
	}) : /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": c,
		"data-collapsible": c === "collapsed" ? n : "",
		"data-variant": t,
		"data-side": e,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ (0, X.jsx)("div", {
			"data-slot": "sidebar-gap",
			className: J("relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon) + 1rem)]" : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]")
		}), /* @__PURE__ */ (0, X.jsx)("div", {
			"data-slot": "sidebar-container",
			"data-side": e,
			className: J("fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", t === "floating" || t === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon) + 1rem + 2px)]" : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l", r),
			...o,
			children: /* @__PURE__ */ (0, X.jsx)("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
				children: i
			})
		})]
	});
}
function gb({ className: e, onClick: t, ...n }) {
	let { toggleSidebar: r } = pb();
	return /* @__PURE__ */ (0, X.jsxs)(Y, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon-sm",
		className: J(e),
		onClick: (e) => {
			t?.(e), r();
		},
		...n,
		children: [/* @__PURE__ */ (0, X.jsx)(ht, {}), /* @__PURE__ */ (0, X.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function _b({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("main", {
		"data-slot": "sidebar-inset",
		className: J("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", e),
		...t
	});
}
function vb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: J("flex flex-col gap-2 p-2", e),
		...t
	});
}
function yb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: J("flex flex-col gap-2 p-2", e),
		...t
	});
}
function bb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(Uv, {
		"data-slot": "sidebar-separator",
		"data-sidebar": "separator",
		className: J("mx-2 w-auto bg-sidebar-border", e),
		...t
	});
}
function xb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: J("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", e),
		...t
	});
}
function Sb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: J("relative flex w-full min-w-0 flex-col p-2", e),
		...t
	});
}
function Cb({ className: e, render: t, ...n }) {
	return Z_({
		defaultTagName: "div",
		props: cr({ className: J("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-none transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", e) }, n),
		render: t,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label"
		}
	});
}
function wb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: J("flex w-full min-w-0 flex-col gap-0", e),
		...t
	});
}
function Tb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: J("group/menu-item relative", e),
		...t
	});
}
var Eb = ji("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-none transition-[width,height,padding] group-has-[data-sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
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
function Db({ render: e, isActive: t = !1, variant: n = "default", size: r = "default", tooltip: i, className: a, ...o }) {
	let { isMobile: s, state: c } = pb(), l = Z_({
		defaultTagName: "button",
		props: cr({ className: J(Eb({
			variant: n,
			size: r
		}), a) }, o),
		render: i ? /* @__PURE__ */ (0, X.jsx)(ib, { render: e }) : e,
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size: r,
			active: t
		}
	});
	return i ? (typeof i == "string" && (i = { children: i }), /* @__PURE__ */ (0, X.jsxs)(rb, { children: [l, /* @__PURE__ */ (0, X.jsx)(ab, {
		side: "right",
		align: "center",
		hidden: c !== "collapsed" || s,
		...i
	})] })) : l;
}
// node_modules/@base-ui/react/menu/positioner/MenuPositionerContext.mjs
Er();
var Ob = /*#__PURE__*/ Z.createContext(void 0);
function kb(e) {
	let t = Z.useContext(Ob);
	if (t === void 0 && !e) throw Error(Tr(33));
	return t;
}
// node_modules/@base-ui/react/menu/root/MenuRootContext.mjs
Er();
var Ab = /*#__PURE__*/ Z.createContext(void 0);
function jb(e) {
	let t = Z.useContext(Ab);
	if (t === void 0 && !e) throw Error(Tr(36));
	return t;
}
// node_modules/@base-ui/react/context-menu/root/ContextMenuRootContext.mjs
Er();
var Mb = /*#__PURE__*/ Z.createContext(void 0);
function Nb(e = !0) {
	let t = Z.useContext(Mb);
	if (t === void 0 && !e) throw Error(Tr(25));
	return t;
}
// node_modules/@base-ui/utils/useControlled.mjs
function Pb({ controlled: e, default: t, name: n, state: r = "value" }) {
	let { current: i } = Fb.useRef(e !== void 0), [a, o] = Fb.useState(() => t);
	return [i && e !== void 0 ? e : a, Fb.useCallback((e) => {
		i || o(e);
	}, [])];
}
var Fb, Ib = o((() => {
	Fb = /* @__PURE__ */ u(p(), 1);
}));
// node_modules/@base-ui/react/menu/filter-root/MenuFilterContext.mjs
Yr();
var Lb = /*#__PURE__*/ Z.createContext(null);
function Rb(e = "root") {
	let t = Z.useContext(Lb), n = Z.useContext(Ab);
	return t === null || n === void 0 ? null : (e === "submenu-trigger" ? n.virtualFocus || n.parentVirtualFocus : n.virtualFocus) ? t : null;
}
var zb = {
	visible: !0,
	ref: null
};
function Bb() {
	return zb;
}
function Vb(e, t, n = "root") {
	let r = Rb(n), i = ((n === "submenu-trigger" ? r?.useSubmenuTrigger : r?.useItem) ?? Bb)({
		label: e.label,
		children: e.children,
		render: e.render
	}), a = Ur(t, i.ref);
	return {
		visible: i.visible,
		ref: a,
		props: i.props
	};
}
qc(), nc(), Lr();
function Hb(e) {
	e.preventDefault();
}
function Ub(e) {
	let { closeOnClick: t, highlighted: n, id: r, nodeId: i, store: a, typingRef: o, itemRef: s, itemMetadata: c } = e, l = jb(), u = Nb(!0), d = c.type === "submenu-trigger", f = d ? l.parentVirtualFocus : l.virtualFocus, p = (d && l.parent.type === "menu" ? l.parent.store : l.store).useState("webkitAriaSelected", n), { events: m } = a.useState("floatingTreeRoot"), h = a.useState("open"), g = u !== void 0, _ = !f && h && n ? 0 : -1;
	return Z.useMemo(() => ({
		id: r,
		role: "menuitem",
		tabIndex: _,
		"aria-selected": p,
		onMouseDown: f ? Hb : void 0,
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
				reason: Vs
			});
		},
		onMouseUp(e) {
			if (u) {
				let t = u.initialCursorPointRef.current;
				if (u.initialCursorPointRef.current = null, g && t && Math.abs(e.clientX - t.x) <= 1 && Math.abs(e.clientY - t.y) <= 1 || g && !Lc && e.button === 2) return;
			}
			s.current && a.context.allowMouseUpTriggerRef.current && (!g || e.button === 2) && c.type === "regular-item" && Ir(s.current, e, {
				detail: 1,
				pointerType: "mouse"
			});
		}
	}), [
		t,
		_,
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
Yr(), Ms(), Cr();
var Wb = { type: "regular-item" };
function Gb(e) {
	let { closeOnClick: t, disabled: n, highlighted: r, id: i, store: a, typingRef: o = a.context.typingRef, nativeButton: s, itemMetadata: c, nodeId: l } = e, u = Z.useRef(null), { getButtonProps: d, buttonRef: f } = Rr({
		disabled: n,
		focusableWhenDisabled: !0,
		native: s,
		composite: !0
	}), p = Ub({
		closeOnClick: t,
		highlighted: r,
		id: i,
		nodeId: l,
		store: a,
		typingRef: o,
		itemRef: u,
		itemMetadata: c
	}), m = Z.useCallback((e) => cr(p, { onMouseEnter(e) {
		c.type === "submenu-trigger" && c.setActive(e.nativeEvent);
	} }, e, d), [
		p,
		d,
		c
	]), h = Ur(u, f);
	return Z.useMemo(() => ({
		getItemProps: m,
		itemRef: h
	}), [m, h]);
}
// node_modules/@base-ui/react/internals/composite/list/CompositeListContext.mjs
function Kb() {
	return qb.useContext(Jb);
}
var qb, Jb, Yb = o((() => {
	qb = /* @__PURE__ */ u(p(), 1), Jb = /*#__PURE__*/ qb.createContext({
		register: () => {},
		unregister: () => {},
		subscribeMapChange: () => () => {},
		nextIndexRef: { current: 0 }
	});
}));
// node_modules/@base-ui/react/internals/composite/list/useCompositeListItem.mjs
function Xb(e = {}) {
	let { guess: t, label: n, metadata: r, textRef: i, index: a } = e, { register: o, unregister: s, subscribeMapChange: c, nextIndexRef: l } = Kb(), u = Zb.useRef(-1), [d, f] = Zb.useState(a == null && t ? () => {
		if (u.current === -1) {
			let e = l.current;
			l.current += 1, u.current = e;
		}
		return u.current;
	} : -1), p = a ?? d, m = Zb.useRef(null), h = Zb.useCallback((e) => {
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
	return G(() => {
		if (a == null) return c((e) => {
			let t = m.current ? e.get(m.current)?.index : null;
			t != null && f(t);
		});
	}, [a, c]), {
		ref: h,
		index: p
	};
}
var Zb, Qb = o((() => {
	Zb = /* @__PURE__ */ u(p(), 1), ar(), Yb();
}));
// node_modules/@base-ui/react/menu/group/MenuGroupContext.mjs
Er();
var $b = /*#__PURE__*/ Z.createContext(void 0);
function ex() {
	let e = Z.useContext($b);
	if (e === void 0) throw Error(Tr(31));
	return e;
}
// node_modules/@base-ui/react/menu/group/MenuGroup.mjs
xi();
var tx = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, [o, s] = Z.useState(void 0), c = fi("div", e, {
		ref: t,
		props: {
			role: "group",
			"aria-labelledby": o,
			...a
		}
	});
	return /*#__PURE__*/ (0, X.jsx)($b.Provider, {
		value: s,
		children: c
	});
}), nx = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let n = Rb()?.Group ?? tx;
	return /*#__PURE__*/ (0, X.jsx)(n, {
		...e,
		ref: t
	});
});
ar(), xi(), gc();
var rx = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = hc(a), c = ex();
	return G(() => (c(s), () => {
		c((e) => e === s ? void 0 : e);
	}), [c, s]), fi("div", e, {
		ref: t,
		props: {
			id: s,
			"aria-hidden": !0,
			...o
		}
	});
});
xi(), gc(), Qb();
var ix = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, label: a, nativeButton: o = !1, disabled: s = !1, closeOnClick: c = !0, style: l, ...u } = e, { store: d } = jb(), f = Xb({
		guess: !0,
		label: a
	}), p = hc(i), m = d.useState("disabled"), h = d.useState("isActive", f.index), g = d.useState("floatingNodeId"), _ = d.useState("itemProps"), v = s || m, { getItemProps: y, itemRef: b } = Gb({
		closeOnClick: c,
		disabled: v,
		highlighted: h,
		id: p,
		store: d,
		nativeButton: o,
		nodeId: g,
		itemMetadata: Wb
	});
	return fi("div", e, {
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
}), ax = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let n = Vb(e, t);
	return n.visible ? /*#__PURE__*/ (0, X.jsx)(ix, {
		...e,
		ref: n.ref
	}) : null;
});
// node_modules/@base-ui/react/toolbar/root/ToolbarRootContext.mjs
function ox(e) {
	let t = sx.useContext(cx);
	if (t === void 0 && !e) throw Error(Tr(69));
	return t;
}
var sx, cx, lx = o((() => {
	Er(), sx = /* @__PURE__ */ u(p(), 1), cx = /*#__PURE__*/ sx.createContext(void 0);
})), ux = /*#__PURE__*/ Z.createContext(void 0);
function dx() {
	return Z.useContext(ux);
}
// node_modules/@base-ui/react/internals/resolveRenderedId.mjs
xi();
function fx(e, t) {
	let n = hi(e.render);
	if (/*#__PURE__*/ Z.isValidElement(n)) {
		let e = n.props;
		if (Object.hasOwn(e, "id")) return e.id ?? "";
	}
	return e.id ?? t;
}
function px(e, t, n) {
	let r = fx(e, t), i = r === t ? void 0 : r;
	return [r, Z.useCallback((e) => n?.(e ? i : void 0), [i, n])];
}
// node_modules/@base-ui/react/internals/resolvePopupLabel.mjs
xi();
function mx(e, t, n) {
	let r = hi(e.render), i = /*#__PURE__*/ Z.isValidElement(r) ? r.props : void 0, a = e["aria-label"] ?? i?.["aria-label"], o = e["aria-labelledby"] ?? i?.["aria-labelledby"];
	return o == null && !a && (o = t ? t.id || void 0 : n || void 0), o;
}
og(), xi(), Os(), qf(), Fs(), nc(), lx(), wg(), Ky();
var hx = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, id: o, initialFocus: s, ...c } = e, { store: l, defaultFloatingId: u, setRenderedFloatingId: d, virtualFocus: f, orientation: p } = jb(), m = dx(), { side: h, align: g } = kb(), _ = ox(!0) != null, v = l.useState("open"), y = l.useState("transitionStatus"), b = l.useState("popupProps"), x = l.useState("mounted"), S = l.useState("instantType"), C = l.useState("activeTriggerElement"), w = l.useState("parent"), T = l.useState("lastOpenChangeReason"), E = l.useState("rootId"), D = l.useState("floatingRootContext"), O = l.useState("floatingTreeRoot"), k = l.useState("closeDelay"), A = l.useState("hoverEnabled"), j = l.useState("disabled"), M = l.useState("openMethod"), N = l.useState("activeTriggerId"), P = l.useState("listElement"), [F, I] = px(e, u, d), L = mx(e, C, N), R = w.type === "menu" ? m : void 0, ee = w.type === "context-menu", z = s ?? w.type !== "menu";
	s === void 0 && P && w.type !== "menu" && (z = () => l.state.activeIndex === null && P), Gf({
		open: v,
		ref: l.context.popupRef,
		onComplete() {
			v && l.context.onOpenChangeComplete?.(!0);
		}
	}), Z.useEffect(() => {
		function e(e) {
			l.setOpen(!1, Ns(e.reason, e.domEvent));
		}
		return O.events.on("close", e), () => {
			O.events.off("close", e);
		};
	}, [O.events, l]), Sm(D, {
		enabled: A && !j && !ee && w.type !== "menubar",
		closeDelay: k
	});
	let te = l.useStateSetter("popupElement"), { parentVirtualFocusRef: B, handleFocus: ne } = (Z.useContext(Lb)?.useParentHandoff ?? _x)(l, w, v, f), re = fi("div", e, {
		state: {
			transitionStatus: y,
			side: h,
			align: g,
			open: v,
			nested: w.type === "menu",
			instant: S
		},
		ref: [
			t,
			l.context.popupRef,
			te,
			I
		],
		stateAttributesMapping: Ds,
		props: [
			b,
			{
				id: F,
				...P ? { role: "presentation" } : {
					role: "menu",
					"aria-orientation": p === "horizontal" ? "horizontal" : void 0,
					"aria-labelledby": L
				},
				onKeyDown(e) {
					R?.onPopupKeyDown?.(e), _ && xg.has(e.key) && e.stopPropagation();
				},
				onFocus: ne
			},
			Gy(y),
			c,
			{ "data-rootownerid": E }
		]
	}), V = w.type === void 0 || ee;
	(C || w.type === "menubar" && T !== "outside-press") && (V = !0);
	let H = R?.getReturnElement ?? B;
	return /*#__PURE__*/ (0, X.jsx)(ff, {
		context: D,
		openInteractionType: M,
		modal: ee,
		disabled: !x,
		returnFocus: a ?? H ?? V,
		explicitReturnFocus: a === void 0 && H ? !1 : void 0,
		initialFocus: z,
		restoreFocus: !0,
		getInsideElements: w.type === void 0 ? () => [l.context.beforeTriggerFocusGuardRef.current] : void 0,
		externalTree: w.type === "menubar" ? void 0 : O,
		previousFocusableElement: C,
		nextFocusableElement: w.type === void 0 ? l.context.triggerFocusTargetRef : void 0,
		beforeContentFocusGuardRef: l.context.beforeContentFocusGuardRef,
		children: re
	});
}), gx = {
	parentVirtualFocusRef: void 0,
	handleFocus: void 0
};
function _x() {
	return gx;
}
var vx = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let n = Rb()?.Popup ?? hx;
	return /*#__PURE__*/ (0, X.jsx)(n, {
		...e,
		ref: t
	});
});
// node_modules/@base-ui/react/menu/portal/MenuPortalContext.mjs
Er();
var yx = /*#__PURE__*/ Z.createContext(void 0);
function bx() {
	let e = Z.useContext(yx);
	if (e === void 0) throw Error(Tr(32));
	return e;
}
// node_modules/@base-ui/react/menu/portal/MenuPortal.mjs
og();
var xx = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i, parent: a } = jb();
	if (!(i.useState("mounted") || n)) return null;
	let o = a.type === "menu" || a.type === "menubar" ? "group" : void 0;
	return /*#__PURE__*/ (0, X.jsx)(yx.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, X.jsx)(Vd, {
			ref: t,
			...r,
			portalOwnerRole: o
		})
	});
});
// node_modules/@base-ui/react/internals/composite/list/CompositeList.mjs
function Sx(e) {
	let { children: t, elementsRef: n, labelsRef: r, onMapChange: i } = e, a = W(i), [, o] = kx.useState(0), s = Jn(wx).current, c = Jn(Cx).current, l = kx.useRef(0), u = kx.useRef(!0), d = kx.useRef(null), f = kx.useRef(null), p = W(() => {
		u.current || (u.current = !0, o((e) => e + 1));
	}), m = W((e, t) => {
		c.set(e, t), p();
	}), h = W((e) => {
		c.delete(e), p();
	}), g = W((e) => {
		let t = /* @__PURE__ */ new Map();
		return n.current.length = 0, r && (r.current.length = 0), e.forEach((e) => {
			t.set(e.element, {
				...e.registration.metadata ?? {},
				index: e.index
			}), n.current[e.index] = e.element, r && (r.current[e.index] = e.registration.label === void 0 ? e.registration.textRef?.current?.textContent ?? e.element.textContent : e.registration.label);
		}), l.current = n.current.length, t;
	});
	function _(e) {
		if (f.current?.disconnect(), f.current = null, typeof MutationObserver != "function" || e.length < 2) return;
		let t = new MutationObserver((n) => {
			if (!Dx(n)) return;
			let r = null;
			for (let n of e) if (n.isConnected) {
				if (r && Ox(r, n) > 0) {
					t.disconnect(), p();
					return;
				}
				r = n;
			}
		});
		f.current = t;
		let n = /* @__PURE__ */ new Set();
		for (let t = 1; t < e.length; t += 1) {
			let r = Ex(e[t - 1], e[t]);
			r && n.add(r);
		}
		n.forEach((e) => t.observe(e, { childList: !0 }));
	}
	let v = W(() => {
		let [e, t] = Tx(c), n = g(e), r = d.current, i = !r || r.length !== e.length || e.some((e, t) => {
			let n = r[t];
			return e.index !== n.index || e.element !== n.element || e.registration.index !== n.registration.index || e.registration.metadata !== n.registration.metadata;
		});
		_(t), d.current = e, u.current = !1, i && (s.forEach((e) => e(n)), a(n));
	});
	G(() => (!u.current && d.current && g(d.current), () => {
		n.current = [], r && (r.current = []);
	}), [
		n,
		r,
		g
	]), G(() => {
		u.current && v();
	}), G(() => () => {
		f.current?.disconnect(), u.current = !0;
	}, []);
	let y = W((e) => (s.add(e), () => {
		s.delete(e);
	})), b = kx.useMemo(() => ({
		register: m,
		unregister: h,
		subscribeMapChange: y,
		nextIndexRef: l
	}), [
		m,
		h,
		y,
		l
	]);
	return /*#__PURE__*/ (0, Ax.jsx)(Jb.Provider, {
		value: b,
		children: t
	});
}
function Cx() {
	return /* @__PURE__ */ new Map();
}
function wx() {
	return /* @__PURE__ */ new Set();
}
function Tx(e) {
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
	return r.sort((e, t) => Ox(e.element, t.element)), r.forEach((e) => {
		for (; t.has(i);) i += 1;
		e.index = i, n.push(e), i += 1;
	}), t.size > 0 && n.sort((e, t) => e.index - t.index), [n, r.map((e) => e.element)];
}
function Ex(e, t) {
	let n = e.parentElement;
	for (; n && !n.contains(t);) n = n.parentElement;
	return n;
}
function Dx(e) {
	for (let t of e) for (let e = 0; e < t.removedNodes.length; e += 1) if (t.removedNodes[e].isConnected) return !0;
	return !1;
}
function Ox(e, t) {
	return e.nextElementSibling === t ? -1 : t.nextElementSibling === e ? 1 : e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
var kx, Ax, jx = o((() => {
	kx = /* @__PURE__ */ u(p(), 1), Zn(), nr(), ar(), Yb(), Ax = lo();
}));
ar(), Wf();
function Mx(e) {
	let { store: t, domReference: n, positionerElement: r, open: i } = e, a = Z.useRef(null), o = Z.useRef(null), s = Vf(r);
	G(() => {
		i || (o.current?.abort(), o.current = null, t.state.instantType === "trigger-change" && t.set("instantType", void 0));
	}, [i, t]), G(() => {
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
// node_modules/@base-ui/react/utils/useAnchoredPopupScrollLock.mjs
function Nx(e, t, n, r) {
	let [i, a] = Px.useState(!1);
	G(() => {
		if (!e || !t || n == null) {
			a(!1);
			return;
		}
		let r = Pr(n).documentElement.clientWidth, i = n.offsetWidth;
		a(r > 0 && i > 0 && i >= r - Fx);
	}, [
		e,
		t,
		n
	]), Zg(e && (!t || i), r);
}
var Px, Fx, Ix = o((() => {
	Px = /* @__PURE__ */ u(p(), 1), Fr(), r_(), ar(), Fx = 20;
}));
Ig(), Ec(), og(), Wy(), jx(), Bg(), Nd(), Fs(), nc(), Jy(), Ix();
var Lx = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o, align: s, sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = Ad, style: g, ..._ } = e, { store: v, virtualFocus: y, syncHighlightedItem: b } = jb(), x = bx(), S = Nb(!0), C = v.useState("parent"), w = v.useState("floatingRootContext"), T = v.useState("floatingTreeRoot"), E = v.useState("mounted"), D = v.useState("open"), O = v.useState("modal"), k = v.useState("openMethod"), A = v.useState("activeTriggerElement"), j = v.useState("transitionStatus"), M = v.useState("positionerElement"), N = v.useState("instantType"), P = v.useState("adaptiveOrigin"), F = v.useState("lastOpenChangeReason"), I = v.useState("floatingNodeId"), L = v.useState("floatingParentNodeId"), R = w.useState("domReferenceElement"), ee = n, z = c, te = l, B = s, ne = h;
	C.type === "context-menu" && (ee = n ?? C.context?.anchor, B ??= "start", !o && B !== "center" && (te = e.alignOffset ?? 2, z = e.sideOffset ?? -5));
	let re = o, V = B;
	C.type === "menu" ? (re ??= "inline-end", V ??= "start", ne = e.collisionAvoidance ?? jd) : C.type === "menubar" && (re ??= C.context.orientation === "vertical" ? "inline-end" : "bottom", V ??= "start");
	let H = C.type === "context-menu", ie = Ry({
		anchor: ee,
		floatingRootContext: w,
		positionMethod: S ? "fixed" : r,
		mounted: E,
		side: re,
		sideOffset: z,
		align: V,
		alignOffset: te,
		arrowPadding: H ? 0 : f,
		collisionBoundary: u,
		collisionPadding: d,
		sticky: p,
		nodeId: I,
		keepMounted: x,
		disableAnchorTracking: m,
		collisionAvoidance: ne,
		shift: H ? {
			crossAxis: !("side" in ne && ne.side === "flip"),
			rootBoundary: "layoutViewport"
		} : void 0,
		externalTree: T,
		adaptiveOrigin: P,
		lazyFlip: y ? "placement" : !1
	});
	Z.useEffect(() => {
		function e(e) {
			e.open && (e.parentNodeId === I && v.set("hoverEnabled", !1), e.nodeId !== I && e.parentNodeId === v.select("floatingParentNodeId") && v.setOpen(!1, Ns(Ys)));
		}
		return T.events.on("menuopenchange", e), () => {
			T.events.off("menuopenchange", e);
		};
	}, [
		v,
		T.events,
		I
	]), Z.useEffect(() => {
		if (v.select("floatingParentNodeId") == null) return;
		function e(e) {
			if (e.open || e.nodeId !== v.select("floatingParentNodeId")) return;
			let t = e.reason ?? "sibling-open";
			v.setOpen(!1, Ns(t));
		}
		return T.events.on("menuopenchange", e), () => {
			T.events.off("menuopenchange", e);
		};
	}, [T.events, v]);
	let ae = Cc();
	Z.useEffect(() => {
		D || ae.clear();
	}, [D, ae]), Z.useEffect(() => {
		function e(e) {
			if (D && e.nodeId === v.select("floatingParentNodeId")) {
				if (e.target && A && A !== e.target) {
					let e = v.select("closeDelay");
					e > 0 ? ae.isStarted() || ae.start(e, () => {
						v.setOpen(!1, Ns(Ys));
					}) : v.setOpen(!1, Ns(Ys));
				} else ae.clear();
			}
		}
		return T.events.on("itemhover", e), () => {
			T.events.off("itemhover", e);
		};
	}, [
		T.events,
		D,
		A,
		v,
		ae
	]), Z.useEffect(() => {
		let e = {
			open: D,
			nodeId: I,
			parentNodeId: L,
			reason: v.select("lastOpenChangeReason")
		};
		T.events.emit("menuopenchange", e);
	}, [
		T.events,
		D,
		v,
		I,
		L
	]), Mx({
		store: v,
		domReference: R,
		positionerElement: M,
		open: D
	});
	let U = {
		open: D,
		side: ie.side,
		align: ie.align,
		anchorHidden: ie.anchorHidden,
		nested: C.type === "menu",
		instant: N
	}, oe = C.type === "menubar" && C.context.modal;
	Nx(D && (oe || O && F !== "trigger-hover"), k === "touch", M, A);
	let se = qy(e, U, {
		styles: ie.positionerStyles,
		transitionStatus: j,
		props: _,
		refs: [t, v.useStateSetter("positionerElement")],
		hidden: !E,
		inert: !D
	}), ce = E && C.type !== "menu" && (C.type !== "menubar" && O && F !== "trigger-hover" || C.type === "menubar" && C.context.modal), le = null;
	return C.type === "menubar" ? le = C.context.contentElement : C.type === void 0 && (le = A), /*#__PURE__*/ (0, X.jsxs)(Ob.Provider, {
		value: ie,
		children: [ce && /*#__PURE__*/ (0, X.jsx)(zg, {
			ref: C.type === "context-menu" || C.type === "nested-context-menu" ? C.context.internalBackdropRef : null,
			inert: Fg(!D),
			cutout: le
		}), /*#__PURE__*/ (0, X.jsx)(Jd, {
			id: I,
			children: /*#__PURE__*/ (0, X.jsx)(Sx, {
				elementsRef: v.context.itemDomElements,
				labelsRef: v.context.itemLabels,
				onMapChange: b,
				children: se
			})
		})]
	});
});
// node_modules/@base-ui/react/menubar/MenubarContext.mjs
Er();
var Rx = /*#__PURE__*/ Z.createContext(null);
function zx(e) {
	let t = Z.useContext(Rx);
	if (t === null && !e) throw Error(Tr(5));
	return t;
}
// node_modules/@base-ui/react/utils/getHighlightReason.mjs
nc();
function Bx(e) {
	return e == null ? Is : e.type.startsWith("key") ? Ks : e.type.startsWith("mouse") || e.type.startsWith("pointer") ? qs : Is;
}
Kp(), ai(), qc(), Kd(), lm();
var Vx = {
	...rm,
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
		let n = rm.triggerPopupId(e, t);
		return n ? e.listElement?.id || n : void 0;
	},
	filterTriggerProps: (e) => e.filterTriggerProps,
	inputProps: (e) => e.inputProps,
	webkitAriaSelected: (e, t) => Bc && e.inputFocused && t ? !0 : void 0,
	highlightedItemId: (e) => e.highlightedItem?.id || void 0,
	isActive: (e, t) => e.activeIndex === t,
	hoverEnabled: (e) => e.hoverEnabled,
	instantType: (e) => e.instantType === "trigger-change" && !rm.open(e) ? void 0 : e.instantType,
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
}, Hx = class extends Up {
	constructor(e, t, n = !1) {
		let r = new mp(), i = Wx(r, t, n, e);
		super(i, Ux(r), Vx), this.observe("parent", (e) => {
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
function Ux(e) {
	return {
		positionerRef: /*#__PURE__*/ Z.createRef(),
		popupRef: /*#__PURE__*/ Z.createRef(),
		typingRef: { current: !1 },
		itemDomElements: { current: [] },
		itemLabels: { current: [] },
		highlightReason: "none",
		highlightEvent: void 0,
		reportedItem: void 0,
		allowMouseUpTriggerRef: { current: !1 },
		virtualFocusRef: void 0,
		triggerFocusTargetRef: /*#__PURE__*/ Z.createRef(),
		beforeTriggerFocusGuardRef: /*#__PURE__*/ Z.createRef(),
		beforeContentFocusGuardRef: /*#__PURE__*/ Z.createRef(),
		onOpenChangeComplete: void 0,
		triggerElements: e
	};
}
function Wx(e, t, n = !1, r) {
	return {
		...Zp(e, t, n),
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
		filterTriggerProps: ii,
		inputProps: ii,
		inputFocused: !1,
		highlightedItem: void 0,
		hoverEnabled: !0,
		instantType: void 0,
		openChangeReason: null,
		floatingTreeRoot: new Gd(),
		floatingNodeId: void 0,
		floatingParentNodeId: null,
		itemProps: ii,
		keyboardEventRelay: void 0,
		closeDelay: 0,
		adaptiveOrigin: void 0,
		...r
	};
}
// node_modules/@base-ui/react/menu/filter-provider/MenuFilterProviderContext.mjs
var Gx = /*#__PURE__*/ Z.createContext(null);
// node_modules/@base-ui/react/menu/utils/isKeyboardOpen.mjs
nc();
function Kx(e, t) {
	return (e === "trigger-press" || e === "item-press") && t?.detail === 0;
}
function qx(e, t) {
	return e === "list-navigation" || Kx(e, t);
}
Ec(), nr(), ar(), Zn(), ai(), Ap(), og(), Nd(), Sy(), j_(), Fs(), nc(), Cr(), Wf(), lm(), gc();
var Jx = wp(function(e) {
	let { children: t, open: n, onOpenChange: r, onOpenChangeComplete: i, onItemHighlighted: a, defaultOpen: o = !1, disabled: s = !1, modal: c, loopFocus: l = !0, orientation: u = "vertical", actionsRef: d, closeParentOnEsc: f = !1, handle: p, triggerId: m, defaultTriggerId: h = null, highlightItemOnHover: g = !0, isSubmenu: _ = !1, virtualFocus: v = !1, virtualFocusRef: y, allowEscape: b = !0, resetOnPointerLeave: x = !0 } = e, S = Nb(!0), C = jb(!0), w = zx(!0), T = C?.store, E = C?.virtualFocus ?? !1, D = Z.useMemo(() => _ && T ? {
		type: "menu",
		store: T
	} : w ? {
		type: "menubar",
		context: w
	} : S && !T ? {
		type: "context-menu",
		context: S
	} : { type: void 0 }, [
		S,
		T,
		w,
		_
	]), O = hc(), k = hc(), [A, j] = Z.useState(void 0), M = (A ?? k) || void 0, N = ef(), P = D.type === "menu" ? D.store : void 0, F = (n ?? o) && P?.state.transitionStatus === "starting", I = Jn(() => F ? P?.state.instantType : void 0).current, L = Jn(() => {
		let e = new Hx({
			open: o,
			openProp: n,
			activeTriggerId: h,
			triggerIdProp: m,
			parent: D,
			disabled: s,
			highlightItemOnHover: g,
			modal: D.type === void 0 ? c : void 0,
			rootId: O,
			instantType: I
		}, M, N != null);
		return e.context.virtualFocusRef = y, e;
	}).current;
	L.useControlledProp("openProp", n), L.useControlledProp("triggerIdProp", m), L.useContextCallback("onOpenChangeComplete", i);
	let R = L.useState("floatingTreeRoot"), ee = qd(R), z = L.useState("open"), te = L.useState("activeTriggerElement"), B = L.useState("positionerElement"), ne = L.useState("hoverEnabled"), re = L.useState("disabled"), V = L.useState("lastOpenChangeReason"), H = L.useState("parent"), ie = L.useState("activeIndex"), ae = L.useState("keyboardOpen"), U = L.useState("payload"), oe = L.useState("floatingParentNodeId"), se = Z.useRef(null), ce = Z.useRef(H.type !== "context-menu"), le = Cc(), ue = Z.useRef(!0), de = Cc(), fe = oe != null, { openMethod: pe, triggerProps: me } = k_(z);
	L.useSyncedValues({
		disabled: s,
		highlightItemOnHover: g,
		modal: H.type === void 0 ? c : void 0,
		openMethod: pe,
		rootId: O
	}), op(L);
	let { forceUnmount: he, transitionStatus: ge } = sp(z, L, () => {
		L.set("allowMouseEnter", !1);
	}, F), _e = Vf(L.context.popupRef);
	Z.useEffect(() => {
		if (I === void 0) return;
		let e = () => {
			L.state.instantType === I && L.set("instantType", void 0);
		};
		if (!z) {
			e();
			return;
		}
		if (ge !== void 0) return;
		if (L.context.popupRef.current == null) {
			e();
			return;
		}
		let t = new AbortController();
		return _e(e, t.signal), () => {
			t.abort();
		};
	}, [
		I,
		z,
		ge,
		_e,
		L
	]), G(() => {
		S && !C ? L.update({
			parent: {
				type: "context-menu",
				context: S
			},
			floatingNodeId: ee,
			floatingParentNodeId: N
		}) : (C || !L.select("activeTriggerElement")) && L.update({
			floatingNodeId: ee,
			floatingParentNodeId: N
		});
	}, [
		S,
		C,
		ee,
		N,
		te,
		L
	]), Z.useEffect(() => {
		z || (se.current = null), H.type === "context-menu" && (z ? le.start(500, () => {
			ce.current = !0;
		}) : (le.clear(), ce.current = !1));
	}, [
		le,
		z,
		H.type
	]), G(() => {
		!z && !ne && L.set("hoverEnabled", !0);
	}, [
		z,
		ne,
		L
	]);
	let ve = W((e, t) => {
		let n = t.reason;
		if (!e && !L.select("open") || z === e && t.trigger === te && V === n) return;
		let i = rp(t);
		if (!e && t.trigger == null && (t.trigger = te ?? void 0), r?.(e, t), t.isCanceled) return;
		L.state.floatingRootContext.dispatchOpenChange(e, t);
		let a = t.event;
		if (e === !1 && n !== "item-press" && a?.type === "click" && a.pointerType === "touch" && !ue.current) return;
		e && n === "trigger-focus" ? (ue.current = !1, de.start(300, () => {
			ue.current = !0;
		})) : (ue.current = !0, de.clear());
		let o = !e && (n === "escape-key" || n == null);
		se.current = t.event;
		let s = np(L.state, e, t.trigger, i());
		s.openChangeReason = n, s.keyboardOpen = e && qx(n, a), s.instantType = H.type === "menubar" && (n === "trigger-focus" || n === "focus-out" || n === "trigger-hover" || n === "list-navigation" || n === "sibling-open") ? "group" : Kx(n, a) ? "click" : o ? "dismiss" : void 0, L.update(s);
	}), ye = Nf({
		popupStore: L,
		floatingRootContext: L.state.floatingRootContext,
		floatingId: M,
		nested: N != null,
		onOpenChange: ve
	}), be = ye.context.events;
	G(() => {
		let e = ({ open: e, eventDetails: t }) => ve(e, t);
		return be.on("setOpen", e), () => {
			be?.off("setOpen", e);
		};
	}, [be, ve]), G(() => L.subscribeToParentMenu(), [L]);
	let xe = Z.useCallback(() => {
		L.setOpen(!1, Ns($s));
	}, [L]);
	Z.useImperativeHandle(d, () => ({
		unmount: he,
		close: xe
	}), [he, xe]);
	let Se;
	H.type === "context-menu" && (Se = H.context), Z.useImperativeHandle(Se?.positionerRef, () => B, [B]), Z.useImperativeHandle(Se?.actionsRef, () => ({ setOpen: ve }), [ve]);
	let Ce = Of(ye, {
		enabled: !re,
		bubbles: { escapeKey: f && H.type === "menu" },
		outsidePress() {
			return H.type !== "context-menu" || se.current?.type === "contextmenu" || ce.current;
		},
		externalTree: fe ? R : void 0
	}), we = yy(), Te = Im(ye, {
		enabled: !re,
		listRef: L.context.itemDomElements,
		activeIndex: ie,
		virtual: v,
		nested: H.type === "menubar" || !v && H.type !== void 0,
		parentOrientation: H.type === "menubar" ? H.context.orientation : void 0,
		loopFocus: l,
		focusItemOnOpen: v ? ae : void 0,
		allowEscape: v && l && b,
		orientation: u,
		triggerOrientation: v ? "vertical" : u,
		rtl: we === "rtl",
		disabledIndices: ri,
		onNavigate(e, t) {
			L.setActiveIndex(e, Bx(t), t?.nativeEvent);
		},
		openOnArrowKeyDown: H.type !== "context-menu" && !(v && _),
		externalTree: !v && fe ? R : void 0,
		nestedReturnFocusRef: P?.context.virtualFocusRef,
		focusItemOnHover: g,
		resetOnPointerLeave: x
	}), Ee = Z.useCallback((e) => {
		L.context.typingRef.current = e;
	}, [L]), De = zm(ye, {
		enabled: !re && !v,
		listRef: L.context.itemLabels,
		elementsRef: L.context.itemDomElements,
		activeIndex: ie,
		resetMs: 500,
		onMatch: (e, t) => {
			z && e !== ie && L.setActiveIndex(e, Ks, t.nativeEvent);
		},
		onTyping: Ee
	}), Oe = W(a), ke = Z.useRef(-1), Ae = W(() => {
		let e = L.state.activeIndex, t = e === null ? void 0 : L.context.itemDomElements.current[e] ?? void 0;
		if (t?.isConnected === !1) return;
		let n = t === void 0 ? -1 : e;
		if (ke.current === n && L.context.reportedItem === t) return;
		ke.current = n, L.context.reportedItem = t, v && L.set("highlightedItem", t);
		let { highlightReason: r, highlightEvent: i } = L.context;
		L.context.highlightReason = Is, L.context.highlightEvent = void 0, a && Oe(t, Ps(r, i, { label: t === void 0 ? void 0 : L.context.itemLabels.current[n] ?? void 0 }));
	});
	G(() => {
		Ae();
	}, [ie, Ae]);
	let je = Z.useMemo(() => {
		if (!v) return Te.reference;
		if (!Te.trigger) return ii;
		let { onFocus: e, ...t } = Te.trigger;
		return t;
	}, [
		v,
		Te.reference,
		Te.trigger
	]);
	L.useSyncedValue("inputProps", v ? Te.reference ?? ii : ii);
	let Me = Z.useMemo(() => {
		let e = cr(De.reference, je, Ce.reference, { onMouseMove() {
			L.set("allowMouseEnter", !0);
		} }, me);
		return e["aria-haspopup"] = "menu", e["aria-expanded"] = z, e;
	}, [
		L,
		De.reference,
		je,
		Ce.reference,
		me,
		z
	]), Ne = Z.useMemo(() => {
		let e = cr(Te.trigger, Ce.trigger, me);
		return e["aria-haspopup"] = "menu", e["aria-expanded"] = !1, e;
	}, [
		Te.trigger,
		Ce.trigger,
		me
	]);
	Jn(() => (L.update({ inactiveTriggerProps: Ne }), null)), cp(L, {
		floatingRootContext: ye,
		activeTriggerProps: Me,
		inactiveTriggerProps: Ne,
		popupProps: Z.useMemo(() => cr(fp, {
			onMouseMove() {
				L.set("allowMouseEnter", !0), H.type === "menu" && L.set("hoverEnabled", !1);
			},
			onClick() {
				L.select("hoverEnabled") && L.set("hoverEnabled", !1);
			},
			onKeyDown(e) {
				let t = L.select("keyboardEventRelay");
				t && !e.isPropagationStopped() && t(e);
			}
		}, De.floating, Te.floating, Ce.floating), [
			H.type,
			L,
			De.floating,
			Te.floating,
			Ce.floating
		]),
		itemProps: Te.item ?? ii
	});
	let Pe = Z.useMemo(() => ({
		store: L,
		parent: D,
		orientation: u,
		loopFocus: l,
		allowEscape: b,
		defaultFloatingId: k,
		setRenderedFloatingId: j,
		virtualFocus: v,
		parentVirtualFocus: E,
		syncHighlightedItem: Ae
	}), [
		L,
		D,
		u,
		l,
		b,
		k,
		v,
		E,
		Ae
	]), Fe = typeof t == "function" ? t({ payload: U }) : t, Ie = /*#__PURE__*/ (0, X.jsxs)(Ab.Provider, {
		value: Pe,
		children: [p && /*#__PURE__*/ (0, X.jsx)($f, {
			handle: p,
			store: L
		}), Fe]
	});
	return (H.type === void 0 || H.type === "context-menu") && (Ie = /*#__PURE__*/ (0, X.jsx)(Yd, {
		externalTree: R,
		children: Ie
	})), Ie;
});
function Yx(e) {
	let t = Z.useContext(Gx);
	if (t === null) return /*#__PURE__*/ (0, X.jsx)(Jx, { ...e });
	let n = t.Root;
	return /*#__PURE__*/ (0, X.jsx)(Gx.Provider, {
		value: null,
		children: /*#__PURE__*/ (0, X.jsx)(n, {
			...t.options,
			...e
		})
	});
}
// node_modules/@base-ui/react/utils/getPseudoElementBounds.mjs
function Xx(e, t) {
	let n = Zx(t);
	return e.clientX >= n.left - Qx && e.clientX <= n.right + Qx && e.clientY >= n.top - Qx && e.clientY <= n.bottom + Qx;
}
function Zx(e) {
	let t = e.getBoundingClientRect(), n = xn(e);
	if (Wc) return t;
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
var Qx, $x = o((() => {
	Fr(), qc(), Qx = 5;
}));
Yr(), Ar(), Qb();
function eS(e = {}) {
	let { highlightItemOnHover: t, highlightedIndex: n, onHighlightedIndexChange: r } = Dr(), { ref: i, index: a } = Xb(e), o = n === a, s = Z.useRef(null), c = Ur(i, s);
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
ai(), xi();
function tS(e) {
	let { render: t, className: n, style: r, state: i = ii, props: a = ri, refs: o = ri, metadata: s, stateAttributesMapping: c, tag: l = "div", ...u } = e, { compositeProps: d, compositeRef: f } = eS({ metadata: s });
	return fi(l, e, {
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
Wn();
function nS(e) {
	if (Tn(e) && e.hasAttribute("data-rootownerid")) return e.getAttribute("data-rootownerid");
	if (!Nn(e)) return nS(In(e));
}
qp(), Fs(), nc();
function rS(e, t) {
	function n(n, r, i) {
		let a = n.currentTarget;
		xo.flushSync(() => {
			e.setOpen(!1, Ns(Us, n.nativeEvent, a));
		}), rd(a.isConnected ? a : t.current, r, i)?.focus();
	}
	function r(t) {
		n(t, -1, e.select("positionerElement"));
	}
	function i(t) {
		let r = e.select("positionerElement");
		r && id(t, r) ? e.context.beforeContentFocusGuardRef.current?.focus() : n(t, 1, r);
	}
	return {
		handlePreFocusGuardFocus: r,
		handleFocusTargetFocus: i
	};
}
Fr(), ai();
function iS(e) {
	let { enabled: t = !0, mouseDownAction: n, open: r } = e, i = Z.useRef(!1);
	return Z.useMemo(() => t ? {
		onMouseDown: (e) => {
			(n === "open" && !r || n === "close" && r) && (i.current = !0, Pr(e.currentTarget).addEventListener("click", () => {
				i.current = !1;
			}, { once: !0 }));
		},
		onClick: (e) => {
			i.current && (i.current = !1, e.preventBaseUIHandler());
		}
	} : ii, [
		t,
		n,
		r
	]);
}
Er(), Ec(), Fr(), Ap(), nr(), ar(), ai(), og(), Kd(), qp(), Os(), xi(), Hr(), $x(), Ar(), lm(), gc(), nc(), Nd(), tu(), Cr();
var aS = Tp(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, openOnHover: c, delay: l = 100, closeDelay: u = 0, handle: d, payload: f, ...p } = e, m = jb(!0), h = am(d) ?? m?.store;
	if (!h) throw Error(Tr(85));
	let g = hc(s), _ = h.useState("isTriggerActive", g), v = h.useState("floatingRootContext"), y = h.useState("isOpenedByTrigger", g), b = h.useState("triggerControlsId", g), x = Z.useRef(null), S = sS(), C = Dr(!0), w = tf(), T = Z.useMemo(() => w ?? new Gd(), [w]), { registerTrigger: E, isMountedByThisTrigger: D } = ap(g, x, h, {
		payload: f,
		closeDelay: u,
		parent: S,
		floatingTreeRoot: T,
		floatingNodeId: qd(T),
		floatingParentNodeId: ef(),
		keyboardEventRelay: C?.relayKeyboardEvent
	}), O = S.type === "menubar", k = h.useState("disabled"), A = a || k || O && S.context.disabled, { getButtonProps: j, buttonRef: M } = Rr({
		disabled: A,
		native: o
	});
	Z.useEffect(() => {
		!y && S.type === void 0 && (h.context.allowMouseUpTriggerRef.current = !1);
	}, [
		h,
		y,
		S.type
	]);
	let N = Z.useRef(null), P = Cc(), F = W((e) => {
		if (!N.current) return;
		P.clear(), h.context.allowMouseUpTriggerRef.current = !1;
		let t = e.target;
		Q(N.current, t) || Q(h.select("positionerElement"), t) || t === N.current || t != null && nS(t) === h.select("rootId") || Xx(e, N.current) || T.events.emit("close", {
			domEvent: e,
			reason: Js
		});
	});
	Z.useEffect(() => {
		let e = Pr(N.current);
		if (y && h.select("lastOpenChangeReason") === "trigger-hover") return e.addEventListener("mouseup", F, { once: !0 }), () => {
			e.removeEventListener("mouseup", F);
		};
	}, [
		y,
		F,
		h
	]);
	let I = O && S.context.hasSubmenuOpen, L = Tm(v, {
		enabled: (c ?? I) && !A && (!O || I && !D),
		handleClose: Km({ blockPointerEvents: !O }),
		mouseOnly: !0,
		move: !1,
		restMs: S.type === void 0 ? l : void 0,
		delay: { close: u },
		triggerElementRef: x,
		externalTree: T,
		isActiveTrigger: _,
		isClosing: () => h.select("transitionStatus") === "ending"
	}), R = oS(y, h.select("lastOpenChangeReason")), ee = vf(v, {
		enabled: !A,
		event: y && O ? "click" : "mousedown",
		toggle: !0,
		ignoreMouse: !1,
		stickIfOpen: S.type === void 0 && R
	}), z = fm(v, { enabled: !A && I }), te = iS({
		open: y,
		enabled: O,
		mouseDownAction: "open"
	}), B = Z.useMemo(() => cr(z.reference, ee.reference), [z.reference, ee.reference]), ne = h.useState("triggerProps", D), re = h.useState("filterTriggerProps"), { handlePreFocusGuardFocus: V, handleFocusTargetFocus: H } = rS(h, x), ie = {
		disabled: A,
		open: y
	}, ae = [
		N,
		t,
		M,
		E,
		x
	], U = [
		B,
		L ?? ii,
		ne,
		{
			"aria-haspopup": "menu",
			"aria-controls": b,
			id: g,
			onMouseDown: (e) => {
				h.select("open") || (P.start(200, () => {
					h.context.allowMouseUpTriggerRef.current = !0;
				}), Pr(e.currentTarget).addEventListener("mouseup", F, { once: !0 }));
			}
		},
		re,
		O ? { role: "menuitem" } : {},
		te,
		p,
		j
	], oe = fi("button", e, {
		enabled: !O,
		stateAttributesMapping: Ts,
		state: ie,
		ref: ae,
		props: U
	});
	return O ? /*#__PURE__*/ (0, X.jsx)(tS, {
		tag: "button",
		render: n,
		className: r,
		style: i,
		state: ie,
		refs: ae,
		props: U,
		stateAttributesMapping: Ts
	}) : y ? /*#__PURE__*/ (0, X.jsxs)(Z.Fragment, { children: [
		/*#__PURE__*/ (0, X.jsx)(eu, {
			ref: h.context.beforeTriggerFocusGuardRef,
			onFocus: V
		}, `${g}-pre-focus-guard`),
		/*#__PURE__*/ (0, X.jsx)(Z.Fragment, { children: oe }, g),
		/*#__PURE__*/ (0, X.jsx)(eu, {
			ref: h.context.triggerFocusTargetRef,
			onFocus: H
		}, `${g}-post-focus-guard`)
	] }) : /*#__PURE__*/ (0, X.jsx)(Z.Fragment, { children: oe }, g);
});
function oS(e, t) {
	let n = Cc(), [r, i] = Z.useState(!1);
	return G(() => {
		e && t === "trigger-hover" ? (i(!0), n.start(500, () => {
			i(!1);
		})) : e || (n.clear(), i(!1));
	}, [
		e,
		t,
		n
	]), r;
}
function sS() {
	let e = zx(!0);
	return Z.useMemo(() => e ? {
		type: "menubar",
		context: e
	} : { type: void 0 }, [e]);
}
// node_modules/@base-ui/utils/isElementDisabled.mjs
function cS(e) {
	return e == null || e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true";
}
var lS = o((() => {}));
// node_modules/@base-ui/react/internals/serializeValue.mjs
function uS(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
var dS = o((() => {}));
// node_modules/@base-ui/react/internals/resolveValueLabel.mjs
function fS(e) {
	return typeof e == "object" && !!e && Array.isArray(e.items);
}
function pS(e) {
	return fS(e?.[0]);
}
function mS(e) {
	return pS(e) ? e.flatMap((e) => e.items) : e;
}
function hS(e) {
	if (!Array.isArray(e)) return e != null && "null" in e;
	let t = e;
	if (pS(t)) {
		for (let e of t) for (let t of e.items) if (t && t.value == null && t.label != null) return !0;
		return !1;
	}
	for (let e of t) if (e && e.value == null && e.label != null) return !0;
	return !1;
}
function gS(e, t) {
	if (t && e != null) return t(e) ?? "";
	if (e && typeof e == "object") {
		if ("label" in e && e.label != null) return String(e.label);
		if ("value" in e) return String(e.value);
	}
	return uS(e);
}
function _S(e, t) {
	return t && e != null ? t(e) ?? "" : e && typeof e == "object" && "value" in e && "label" in e ? uS(e.value) : uS(e);
}
function vS(e, t, n) {
	function r() {
		return gS(e, n);
	}
	if (n && e != null) return n(e);
	if (e && typeof e == "object" && "label" in e && e.label != null) return e.label;
	if (t && !Array.isArray(t)) return (Object.hasOwn(t, e) ? t[e] : void 0) ?? r();
	if (Array.isArray(t)) {
		let n = mS(t);
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
function yS(e, t, n) {
	return e.reduce((e, r, i) => (i > 0 && e.push(", "), e.push(/*#__PURE__*/ (0, xS.jsx)(bS.Fragment, { children: vS(r, t, n) }, i)), e), []);
}
var bS, xS, SS = o((() => {
	bS = /* @__PURE__ */ u(p(), 1), dS(), xS = lo();
}));
so(), z_();
function CS({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(Yx, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function wS({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(aS, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function TS({ align: e = "start", alignOffset: t = 0, side: n = "bottom", sideOffset: r = 4, className: i, ...a }) {
	let o = F_();
	return /* @__PURE__ */ (0, X.jsx)(xx, {
		container: o ?? void 0,
		children: /* @__PURE__ */ (0, X.jsx)(Lx, {
			className: "isolate z-50 outline-none",
			align: e,
			alignOffset: t,
			side: n,
			sideOffset: r,
			children: /* @__PURE__ */ (0, X.jsx)(vx, {
				"data-slot": "dropdown-menu-content",
				className: J("z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-32 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", i),
				...a
			})
		})
	});
}
function ES({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(nx, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function DS({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(rx, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: J("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", e),
		...n
	});
}
function OS({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, X.jsx)(ax, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: J("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", e),
		...r
	});
}
function kS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(Hv, {
		"data-slot": "dropdown-menu-separator",
		className: J("-mx-1 my-1 h-px bg-border", e),
		...t
	});
}
// src/services/profile-service.ts
function AS(e) {
	if (/^\/d[23](\/|$)/.test(location.pathname)) return location.pathname.slice(0, 3) + "/api/" + e;
	let t = window.__ORGANIZEON_CONFIG__;
	return (t?.apiOrigin || "https://api.organizeon.com.br") + (t?.apiPrefix || "/827e7h3heuw823eh") + "/account/" + e;
}
async function jS(e, t = {}) {
	let n = new Headers(t.headers);
	n.set("Accept", "application/json"), t.body && n.set("Content-Type", "application/json");
	let r = localStorage.getItem("organizeon-access-token");
	r && !/^\/d[23](\/|$)/.test(location.pathname) && n.set("Authorization", "Bearer " + r);
	let i = await fetch(AS(e), {
		...t,
		headers: n,
		signal: AbortSignal.timeout(1e4),
		credentials: "include",
		cache: "no-store"
	}), a = await i.json().catch(() => ({}));
	if (!i.ok) throw Error({
		invalid_profile: "Confira o nome, a descrição e a foto do perfil.",
		invalid_current_password: "A senha atual está incorreta.",
		invalid_password: "A nova senha deve ter pelo menos 8 caracteres.",
		password_confirmation_mismatch: "As novas senhas não coincidem.",
		too_many_attempts: "Muitas tentativas. Aguarde antes de tentar novamente.",
		unauthorized: "Sua sessão expirou. Entre novamente.",
		request_too_large: "A foto excede o tamanho permitido."
	}[a.error] || "Não foi possível salvar. Tente novamente.");
	return a;
}
function MS() {
	if (/^\/d[23](\/|$)/.test(location.pathname)) {
		location.replace(location.pathname.slice(0, 3) + "/login");
		return;
	}
	if (window.parent !== window) {
		window.parent.postMessage({
			type: "organizeon:open-main",
			loggedOut: !0
		}, "*");
		return;
	}
	let e = window.organizeonAuth;
	e ? e.logout() : location.replace(new URL("./", document.baseURI).href);
}
var NS, PS, FS = o((() => {
	NS = (e) => ({
		displayName: e,
		nameColor: "#FAFAFA",
		bio: "",
		avatarShape: "circle",
		avatar: null
	}), PS = {
		get: async () => (await jS("profile")).profile,
		save: async (e) => (await jS("profile", {
			method: "PATCH",
			body: JSON.stringify(e)
		})).profile,
		password: async (e) => {
			await jS("password", {
				method: "POST",
				body: JSON.stringify(e)
			});
		}
	};
}));
// src/stores/profile-store.ts
function IS(e) {
	let t = HS.get(e);
	return t || (t = {
		profile: NS(e),
		listeners: /* @__PURE__ */ new Set(),
		pending: null,
		revision: 0
	}, HS.set(e, t)), t;
}
function LS(e, t) {
	let n = IS(e);
	n.profile = t;
	for (let e of n.listeners) e();
}
async function RS(e) {
	let t = IS(e);
	if (!t.pending) {
		let n = t.revision;
		t.pending = PS.get().then((r) => {
			r && t.revision === n && LS(e, r);
		}).catch(() => {}).finally(() => {
			t.pending = null;
		});
	}
	return t.pending;
}
function zS(e, t) {
	IS(e).revision++, LS(e, t), US?.postMessage({ username: e });
}
function BS(e, t = !0) {
	let n = IS(e), r = (0, VS.useSyncExternalStore)((e) => (n.listeners.add(e), () => {
		n.listeners.delete(e);
	}), () => n.profile);
	return (0, VS.useEffect)(() => {
		if (!t) return;
		RS(e);
		let n = () => {
			document.hidden || RS(e);
		};
		window.addEventListener("focus", n);
		let r = setInterval(n, 6e4);
		return () => {
			clearInterval(r), window.removeEventListener("focus", n);
		};
	}, [e, t]), r;
}
var VS, HS, US, WS = o((() => {
	VS = /* @__PURE__ */ u(p(), 1), FS(), HS = /* @__PURE__ */ new Map();
	try {
		US = new BroadcastChannel("organizeon-profile"), US.onmessage = ({ data: e }) => {
			typeof e?.username == "string" && HS.has(e.username) && RS(e.username);
		};
	} catch {}
}));
// src/features/profile/profile-avatar.tsx
function GS(e) {
	return e === "circle" ? "50%" : e === "rounded" ? "20%" : "0";
}
function KS({ profile: e, className: t = "size-8" }) {
	return /* @__PURE__ */ (0, qS.jsx)("span", {
		className: `grid shrink-0 place-items-center overflow-hidden border border-border bg-muted ${t}`,
		style: { borderRadius: GS(e.avatarShape) },
		children: e.avatar ? /* @__PURE__ */ (0, qS.jsx)("img", {
			src: e.avatar,
			alt: "",
			className: "size-full object-cover"
		}) : /* @__PURE__ */ (0, qS.jsx)(un, { className: "size-4 text-muted-foreground" })
	});
}
var qS, JS = o((() => {
	vn(), qS = lo();
}));
// node_modules/@base-ui/utils/useOnFirstRender.mjs
function YS(e) {
	let t = XS.useRef(!0);
	t.current && (t.current = !1, e());
}
var XS, ZS = o((() => {
	XS = /* @__PURE__ */ u(p(), 1);
}));
// node_modules/@base-ui/react/select/root/SelectRootContext.mjs
function QS() {
	let e = eC.useContext(tC);
	if (e === void 0) throw Error(Tr(60));
	return e;
}
function $S() {
	let e = eC.useContext(nC);
	if (e === void 0) throw Error(Tr(61));
	return e;
}
var eC, tC, nC, rC = o((() => {
	Er(), eC = /* @__PURE__ */ u(p(), 1), tC = /*#__PURE__*/ eC.createContext(void 0), nC = /*#__PURE__*/ eC.createContext(void 0);
}));
// node_modules/@base-ui/utils/areArraysEqual.mjs
function iC(e, t, n = Object.is) {
	let { length: r } = e;
	if (r !== t.length) return !1;
	for (let i = 0; i < r; i += 1) if (!n(e[i], t[i])) return !1;
	return !0;
}
var aC = o((() => {}));
// node_modules/@base-ui/react/internals/itemEquality.mjs
function oC(e, t, n) {
	return e == null || t == null ? Object.is(e, t) : n(e, t);
}
function sC(e, t, n) {
	return Array.isArray(e) && Array.isArray(t) ? !iC(e, t, (e, t) => oC(e, t, n)) : e !== t;
}
function cC(e, t, n) {
	return e ? e.some((e) => e !== void 0 && oC(t, e, n)) : !1;
}
function lC(e, t, n) {
	return e ? e.findIndex((e) => e !== void 0 && oC(e, t, n)) : -1;
}
function uC(e, t) {
	if (t !== mC) return (n) => cC(e, n, t);
	let n = new Set(e);
	return n.delete(void 0), (t) => n.has(t) && (t !== 0 || e.some((e) => Object.is(t, e)));
}
function dC(e, t, n, r) {
	let i = r && Array.isArray(t) ? e.findIndex(uC(t, n)) : lC(e, t, n);
	return i === -1 ? null : i;
}
function fC(e, t, n, r, i, a) {
	return cC(r, t, i) ? a != null && e > a && cC(r, n[a], i) ? a : e : e === a ? dC(n, r, i, !0) : a;
}
function pC(e, t, n) {
	return e.filter((e) => !oC(t, e, n));
}
var mC, hC = o((() => {
	aC(), mC = (e, t) => Object.is(e, t);
})), gC, _C = o((() => {
	hC(), SS(), gC = {
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
			return t == null ? !1 : n && Array.isArray(t) ? t.length > 0 : _S(t, r) !== "";
		},
		hasNullItemLabel: (e, t) => t ? hS(e.items) : !1,
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
			return e.multiple ? Array.isArray(r) && r.some((e) => oC(t, e, n)) : oC(t, r, n);
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
}));
// node_modules/@base-ui/utils/clamp.mjs
function vC(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
	return Math.max(t, Math.min(e, n));
}
var yC = o((() => {}));
// node_modules/@base-ui/react/utils/scrollEdges.mjs
function bC(e, t) {
	return Math.max(0, e - t);
}
function xC(e, t) {
	if (t <= 0) return 0;
	let n = vC(e, 0, t), r = n, i = t - n, a = r <= 1, o = i <= 1;
	return a && o ? r <= i ? 0 : t : a ? 0 : o ? t : n;
}
var SC = o((() => {
	yC();
}));
// node_modules/@base-ui/react/select/root/SelectRoot.mjs
function CC(e) {
	let { id: t, value: n, defaultValue: r = null, onValueChange: i, open: a, defaultOpen: o = !1, onOpenChange: s, name: c, form: l, autoComplete: u, disabled: d = !1, readOnly: f = !1, required: p = !1, modal: m = !0, actionsRef: h, inputRef: g, onOpenChangeComplete: _, items: v, multiple: y = !1, itemToStringLabel: b, itemToStringValue: x, isItemEqualToValue: S = mC, highlightItemOnHover: C = !0, children: w } = e, { clearErrors: T } = mv(), { setDirty: E, setTouched: D, setFocused: O, validityData: k, setFilled: A, name: j, disabled: M, validation: N, validationMode: P } = lv(), F = Sv({ id: t }), I = M || d, L = j ?? c, [R, ee] = Pb({
		controlled: n,
		default: y ? r ?? ri : r,
		name: "Select",
		state: "value"
	}), [z, te] = Pb({
		controlled: a,
		default: o,
		name: "Select",
		state: "open"
	}), B = wC.useRef([]), ne = wC.useRef([]), re = wC.useRef(null), V = wC.useRef(null), H = wC.useRef(0), ie = wC.useRef(null), ae = wC.useRef([]), U = wC.useRef(!1), oe = wC.useRef(null), se = wC.useRef(null), ce = wC.useRef({
		allowSelectedMouseUp: !1,
		allowUnselectedMouseUp: !1,
		dragY: 0
	}), le = wC.useRef(!1), ue = wC.useRef(R), { openMethod: de, triggerProps: fe } = k_(z), pe = Jn(() => new Up({
		id: F,
		labelId: void 0,
		modal: m,
		multiple: y,
		disabled: I,
		readOnly: f,
		required: p,
		highlightItemOnHover: C,
		itemToStringLabel: b,
		itemToStringValue: x,
		isItemEqualToValue: S,
		value: R,
		open: z,
		mounted: z,
		transitionStatus: void 0,
		items: v,
		forceMount: !1,
		openMethod: null,
		activeIndex: null,
		selectedIndex: null,
		popupProps: ii,
		triggerProps: ii,
		itemRoot: {
			props: ii,
			multiple: y,
			disabled: I,
			readOnly: f,
			isItemEqualToValue: S
		},
		triggerElement: null,
		positionerElement: null,
		listElement: null,
		popupSide: null,
		scrollUpArrowVisible: !1,
		scrollDownArrowVisible: !1,
		hasScrollArrows: !1
	}, {
		setValue: ni,
		setOpen: ni,
		handleScrollArrowVisibility: ni,
		onOpenChangeComplete: ni,
		listRef: B,
		popupRef: re,
		scrollHandlerRef: V,
		scrollArrowsMountedCountRef: H,
		valueRef: ie,
		valuesRef: ae,
		labelsRef: ne,
		typingRef: U,
		selectionRef: ce,
		firstItemTextRef: oe,
		selectedItemTextRef: se,
		alignItemWithTriggerActiveRef: le,
		initialValueRef: ue
	}, gC)).current, [me, he] = wC.useState(!1), { mounted: ge, transitionStatus: _e, forceUnmount: ve } = Jf({
		open: z,
		ref: re,
		preventUnmountOnClose: me,
		setPreventUnmountOnClose: he,
		onUnmount() {
			pe.update({
				activeIndex: null,
				openMethod: null,
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			}), _?.(!1);
		}
	}), ye = pe.useState("activeIndex"), be = pe.useState("selectedIndex"), xe = pe.useState("triggerElement"), Se = pe.useState("positionerElement"), Ce = $y(de), we = de ?? Ce, Te = wC.useMemo(() => y ? "" : _S(R, x), [
		y,
		R,
		x
	]), Ee = wC.useMemo(() => y && Array.isArray(R) ? R.map((e) => _S(e, x)) : _S(R, x), [
		y,
		R,
		x
	]);
	Dv(zl(xe), F, R, W(() => Ee), !I, c);
	let De = y ? Array.isArray(R) && R.length > 0 : R != null && Te !== "";
	G(() => {
		A(De);
	}, [De, A]), G(function() {
		let e = dC(ae.current, R, S, y);
		e === null && (se.current = null), z || pe.set("selectedIndex", e);
	}, [
		y,
		z,
		R,
		S,
		pe
	]), T_(R, () => {
		T(L), E(sC(R, k.initialValue, S)), N.change(R);
	});
	let Oe = W((e, t) => {
		let n = t, r = rp(n);
		s?.(e, n), t.isCanceled || (e || he(r()), te(e), e || t.reason !== "focus-out" && t.reason !== "outside-press" || (D(!0), O(!1), P === "onBlur" && N.commit(R)));
	});
	wC.useImperativeHandle(h, () => ({
		unmount: ve,
		close: () => {
			pe.state.open && Oe(!1, Ns($s));
		}
	}), [
		ve,
		Oe,
		pe
	]);
	let ke = W((e, t) => {
		i?.(e, t), t.isCanceled || ee(e);
	}), Ae = W((e) => {
		let t = bC(e.scrollHeight, e.clientHeight), n = xC(e.scrollTop, t), r = n > 0, i = n < t;
		pe.set("scrollUpArrowVisible", r), pe.set("scrollDownArrowVisible", i);
	}), je = um({
		open: z,
		onOpenChange: Oe,
		elements: {
			reference: xe,
			floating: Se
		}
	}), Me = vf(je, {
		enabled: !I,
		event: "mousedown"
	}), Ne = Of(je), Pe = Im(je, {
		enabled: !I,
		listRef: B,
		activeIndex: ye,
		selectedIndex: be,
		disabledIndices: ri,
		onNavigate(e) {
			(e !== null || z) && pe.set("activeIndex", e);
		},
		focusItemOnHover: C
	}), Fe = zm(je, {
		enabled: !I && (z || !f && !y),
		listRef: ne,
		activeIndex: ye,
		selectedIndex: be,
		disabledIndices: (e) => cS(B.current[e]),
		onMatch(e) {
			z ? pe.set("activeIndex", e) : ke(ae.current[e], Ns(Is));
		},
		onTyping(e) {
			U.current = e;
		}
	}), Ie = wC.useMemo(() => cr(Fe.reference, Pe.reference, Ne.reference, Me.reference, fe), [
		Me.reference,
		Fe.reference,
		Pe.reference,
		Ne.reference,
		fe
	]), Le = wC.useMemo(() => cr(fp, Fe.floating, Pe.floating, Ne.floating), [
		Fe.floating,
		Pe.floating,
		Ne.floating
	]), Re = Pe.item ?? ii, ze = wC.useMemo(() => ({
		props: Re,
		multiple: y,
		disabled: I,
		readOnly: f,
		isItemEqualToValue: S
	}), [
		Re,
		y,
		I,
		f,
		S
	]);
	pe.useContextCallback("setValue", ke), pe.useContextCallback("setOpen", Oe), pe.useContextCallback("handleScrollArrowVisibility", Ae), pe.useContextCallback("onOpenChangeComplete", _), YS(() => {
		pe.update({
			popupProps: Le,
			triggerProps: Ie,
			itemRoot: ze
		});
	}), pe.useSyncedValues({
		id: F,
		modal: m,
		multiple: y,
		disabled: I,
		readOnly: f,
		required: p,
		highlightItemOnHover: C,
		value: R,
		open: z,
		mounted: ge,
		transitionStatus: _e,
		popupProps: Le,
		triggerProps: Ie,
		itemRoot: ze,
		items: v,
		itemToStringLabel: b,
		itemToStringValue: x,
		isItemEqualToValue: S,
		openMethod: we
	});
	let Be = Ur(g, N.inputRef), Ve = y ? void 0 : L, He = wC.useMemo(() => !y || !Array.isArray(R) || !L ? null : R.map((e) => {
		let t = _S(e, x);
		return /*#__PURE__*/ (0, TC.jsx)("input", {
			type: "hidden",
			form: l,
			name: L,
			value: t,
			disabled: I
		}, t);
	}), [
		y,
		R,
		l,
		L,
		x,
		I
	]);
	return /*#__PURE__*/ (0, TC.jsxs)(tC.Provider, {
		value: pe,
		children: [
			/*#__PURE__*/ (0, TC.jsx)(nC.Provider, {
				value: je,
				children: w
			}),
			/*#__PURE__*/ (0, TC.jsx)("input", {
				...N.getValidationProps(I, {
					onFocus() {
						pe.state.triggerElement?.focus({ focusVisible: !0 });
					},
					onChange(e) {
						if (e.nativeEvent.defaultPrevented || I || f) return;
						let t = e.currentTarget.value, n = Ns(Is, e.nativeEvent);
						function r() {
							if (y) return;
							let e = t.toLowerCase(), r = ae.current.findIndex((t) => _S(t, x).toLowerCase() === e || gS(t, b).toLowerCase() === e);
							r === -1 && (r = ae.current.findIndex((t, n) => {
								let r = ne.current[n];
								return r != null && r.toLowerCase() === e;
							}));
							let i = ae.current[r];
							i != null && ke(i, n);
						}
						pe.set("forceMount", !0), queueMicrotask(r);
					}
				}),
				id: F && Ve == null ? `${F}-hidden-input` : void 0,
				form: l,
				name: Ve,
				autoComplete: u,
				value: Te,
				disabled: I,
				required: p && !(y && De),
				readOnly: f,
				ref: Be,
				style: L ? Xl : Yl,
				tabIndex: -1,
				"aria-hidden": !0,
				suppressHydrationWarning: !0
			}),
			He
		]
	});
}
var wC, TC, EC = o((() => {
	wC = /* @__PURE__ */ u(p(), 1), Zl(), Yr(), Zn(), ZS(), tb(), lS(), Ib(), ar(), nr(), Vl(), Kp(), ai(), og(), rC(), pv(), Ov(), wv(), Xf(), _C(), Fs(), nc(), pp(), _v(), SS(), hC(), D_(), j_(), SC(), lm(), Cr(), ev(), TC = lo();
}));
// node_modules/@base-ui/react/utils/resolveAriaLabelledBy.mjs
function DC(e, t) {
	return e ?? t;
}
var OC = o((() => {})), kC, AC = o((() => {
	Os(), kC = "data-popup-side";
})), jC, MC, NC, PC, FC = o((() => {
	jC = /* @__PURE__ */ u(p(), 1), Fr(), Ec(), Vl(), rC(), pv(), Ev(), xv(), Os(), cv(), xi(), $x(), qp(), Cr(), Ms(), Fs(), nc(), wv(), OC(), AC(), MC = 400, NC = {
		...Ts,
		...sv,
		popupSide: (e) => e ? { [kC]: e } : null,
		value: () => null
	}, PC = /*#__PURE__*/ jC.forwardRef(function(e, t) {
		let { render: n, className: r, id: i, disabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { setTouched: l, validationMode: u, validation: d, state: f, disabled: p } = lv(), { labelId: m } = vv(), h = QS(), g = h.useState("readOnly"), _ = h.useState("required"), v = h.useState("disabled"), y = p || v || a, b = h.useState("open"), x = h.useState("mounted"), S = h.useState("value"), C = h.useState("triggerProps"), w = h.useState("positionerElement"), T = h.useState("listElement"), E = h.useState("popupSide"), D = h.useState("id"), O = h.useState("labelId"), k = h.useState("hasSelectedValue"), A = x && w ? E : null, j = i ?? D, M = DC(m, O);
		Sv({ id: i });
		let N = zl(w), P = jC.useRef(null), F = Tv(y, P), { getButtonProps: I, buttonRef: L } = Rr({
			disabled: y,
			native: o
		}), R = h.useStateSetter("triggerElement"), ee = Cc(), z = Cc(), te = Cc();
		jC.useEffect(() => {
			if (b) return te.start(MC, () => {
				h.context.selectionRef.current.allowUnselectedMouseUp = !0, h.context.selectionRef.current.allowSelectedMouseUp = !0;
			}), () => {
				te.clear();
			};
			h.context.selectionRef.current = {
				allowSelectedMouseUp: !1,
				allowUnselectedMouseUp: !1,
				dragY: 0
			}, z.clear();
		}, [
			b,
			h,
			z,
			te
		]);
		let B = cr(C, {
			id: j,
			role: "combobox",
			"aria-expanded": b,
			"aria-haspopup": "listbox",
			"aria-controls": b ? T?.id ?? xl(w)?.id : void 0,
			"aria-labelledby": M,
			"aria-readonly": g || void 0,
			"aria-required": _ || void 0,
			tabIndex: y ? -1 : 0,
			onFocus(e) {
				F(!0), b && h.context.alignItemWithTriggerActiveRef.current && h.context.setOpen(!1, Ns(Is, e.nativeEvent)), ee.start(0, () => {
					h.set("forceMount", !0);
				});
			},
			onBlur(e) {
				Q(w, e.relatedTarget) || (l(!0), F(!1), u === "onBlur" && d.commit(S));
			},
			onMouseDown(e) {
				if (b) return;
				let t = Pr(e.currentTarget);
				function n(e) {
					if (!P.current) return;
					let t = e.target;
					Q(P.current, t) || Q(N.current, t) || Xx(e, P.current) || h.context.setOpen(!1, Ns(Js, e));
				}
				z.start(0, () => {
					t.addEventListener("mouseup", n, { once: !0 });
				});
			}
		}, c, I), ne = d.getValidationProps(y, B);
		ne.role = "combobox";
		let re = {
			...f,
			open: b,
			disabled: y,
			value: S,
			readOnly: g,
			popupSide: A,
			placeholder: !k
		};
		return fi("button", e, {
			ref: [
				t,
				P,
				L,
				R
			],
			state: re,
			stateAttributesMapping: NC,
			props: ne
		});
	});
})), IC, LC, RC, zC = o((() => {
	IC = /* @__PURE__ */ u(p(), 1), xi(), rC(), SS(), LC = { value: () => null }, RC = /*#__PURE__*/ IC.forwardRef(function(e, t) {
		let { className: n, render: r, children: i, placeholder: a, style: o, ...s } = e, c = QS(), l = c.useState("value"), u = c.useState("items"), d = c.useState("itemToStringLabel"), f = c.useState("hasSelectedValue"), p = !f && a != null && i == null, m = c.useState("hasNullItemLabel", p), h = {
			value: l,
			placeholder: !f
		}, g = null;
		return g = typeof i == "function" ? i(l) : i ?? (p && !m ? a : Array.isArray(l) ? yS(l, u, d) : vS(l, u, d)), fi("span", e, {
			state: h,
			ref: [t, c.context.valueRef],
			props: [{ children: g }, s],
			stateAttributesMapping: LC
		});
	});
})), BC, VC, HC = o((() => {
	BC = /* @__PURE__ */ u(p(), 1), xi(), rC(), Os(), VC = /*#__PURE__*/ BC.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, ...a } = e;
		return fi("span", e, {
			state: { open: QS().useState("open") },
			ref: t,
			props: [{
				"aria-hidden": !0,
				children: "▼"
			}, a],
			stateAttributesMapping: ws
		});
	});
})), UC, WC, GC, KC = o((() => {
	UC = /* @__PURE__ */ u(p(), 1), og(), rC(), WC = lo(), GC = /*#__PURE__*/ UC.forwardRef(function(e, t) {
		let n = QS(), r = n.useState("mounted"), i = n.useState("forceMount");
		return r || i ? /*#__PURE__*/ (0, WC.jsx)(Vd, {
			ref: t,
			...e
		}) : null;
	});
}));
// node_modules/@base-ui/react/select/positioner/SelectPositionerContext.mjs
function qC() {
	let e = JC.useContext(YC);
	if (!e) throw Error(Tr(59));
	return e;
}
var JC, YC, XC = o((() => {
	Er(), JC = /* @__PURE__ */ u(p(), 1), YC = /*#__PURE__*/ JC.createContext(void 0);
}));
// node_modules/@base-ui/react/select/popup/utils.mjs
function ZC(e, t) {
	e && Object.assign(e.style, t);
}
var QC, $C = o((() => {
	QC = {
		position: "relative",
		maxHeight: "100%",
		overflowX: "hidden",
		overflowY: "auto"
	};
})), ew, tw, nw, rw, iw = o((() => {
	ew = /* @__PURE__ */ u(p(), 1), Ig(), ar(), nr(), rC(), jx(), Wy(), XC(), Bg(), Nd(), $C(), Fs(), nc(), hC(), Jy(), Ix(), tw = lo(), nw = { position: "fixed" }, rw = /*#__PURE__*/ ew.forwardRef(function(e, t) {
		let { anchor: n, className: r, render: i, positionMethod: a, side: o, align: s, sideOffset: c, alignOffset: l, collisionBoundary: u = "clipping-ancestors", collisionPadding: d, arrowPadding: f, sticky: p, disableAnchorTracking: m, alignItemWithTrigger: h = !0, collisionAvoidance: g = Ad, style: _, ...v } = e, y = QS(), b = $S(), x = y.useState("open"), S = y.useState("mounted"), C = y.useState("modal"), w = y.useState("value"), T = y.useState("openMethod"), E = y.useState("positionerElement"), D = y.useState("triggerElement"), O = y.useState("isItemEqualToValue"), k = y.useState("transitionStatus"), A = ew.useRef(null), j = ew.useRef(null), [M, N] = ew.useState(h), P = S && M && T !== "touch";
		!S && M !== h && N(h), ew.useImperativeHandle(y.context.alignItemWithTriggerActiveRef, () => P), Nx((P || C) && x, T === "touch", E, D);
		let F = Ry({
			anchor: n,
			floatingRootContext: b,
			positionMethod: a,
			mounted: S,
			side: o,
			sideOffset: c,
			align: s,
			alignOffset: l,
			arrowPadding: f,
			collisionBoundary: u,
			collisionPadding: d,
			sticky: p,
			disableAnchorTracking: m ?? P,
			collisionAvoidance: g,
			keepMounted: !0
		}), I = P ? "none" : F.side, L = P ? nw : F.positionerStyles, R = {
			open: x,
			side: I,
			align: F.align,
			anchorHidden: F.anchorHidden
		};
		G(() => {
			y.set("popupSide", F.side);
		}, [y, F.side]);
		let ee = qy(e, R, {
			styles: L,
			transitionStatus: k,
			props: v,
			refs: [t, y.useStateSetter("positionerElement")],
			hidden: !S,
			inert: !x
		}), z = ew.useRef(0), te = W((e) => {
			if (y.context.valuesRef.current.length === 0) return;
			let t = z.current;
			z.current = e.size;
			let n = Ns(Is);
			if (t !== 0 && !y.state.multiple && w !== null && lC(y.context.valuesRef.current, w, O) === -1) {
				let e = y.context.initialValueRef.current, t = e != null && lC(y.context.valuesRef.current, e, O) !== -1 ? e : null;
				y.context.setValue(t, n), t === null && (y.set("selectedIndex", null), y.context.selectedItemTextRef.current = null);
			}
			if (t !== 0 && y.state.multiple && Array.isArray(w)) {
				let e = w.filter((e) => lC(y.context.valuesRef.current, e, O) !== -1);
				e.length !== w.length && (y.context.setValue(e, n), e.length === 0 && (y.set("selectedIndex", null), y.context.selectedItemTextRef.current = null));
			}
			if (x && P) {
				y.update({
					scrollUpArrowVisible: !1,
					scrollDownArrowVisible: !1
				});
				let e = { height: "" };
				ZC(E, e), ZC(y.context.popupRef.current, e);
			}
		}), B = ew.useMemo(() => ({
			...F,
			side: I,
			alignItemWithTriggerActive: P,
			setControlledAlignItemWithTrigger: N,
			scrollUpArrowRef: A,
			scrollDownArrowRef: j
		}), [
			F,
			I,
			P,
			N
		]);
		return /*#__PURE__*/ (0, tw.jsx)(Sx, {
			elementsRef: y.context.listRef,
			labelsRef: y.context.labelsRef,
			onMapChange: te,
			children: /*#__PURE__*/ (0, tw.jsxs)(YC.Provider, {
				value: B,
				children: [S && C && /*#__PURE__*/ (0, tw.jsx)(zg, {
					inert: Fg(!x),
					cutout: D
				}), ee]
			})
		});
	});
})), aw, ow, sw, cw = o((() => {
	aw = lo(), ow = "base-ui-disable-scrollbar", sw = {
		className: ow,
		getElement(e) {
			return /*#__PURE__*/ (0, aw.jsx)("style", {
				nonce: e,
				href: ow,
				precedence: "base-ui:low",
				children: `.${ow}{scrollbar-width:none}.${ow}::-webkit-scrollbar{display:none}`
			});
		}
	};
}));
// node_modules/@base-ui/react/internals/csp-context/CSPContext.mjs
function lw() {
	return uw.useContext(dw) ?? fw;
}
var uw, dw, fw, pw = o((() => {
	uw = /* @__PURE__ */ u(p(), 1), dw = /*#__PURE__*/ uw.createContext(void 0), fw = { disableStyleElements: !1 };
})), mw, hw = o((() => {
	mw = "--transform-origin";
}));
// node_modules/@base-ui/react/select/popup/SelectPopup.mjs
function gw(e) {
	let t = e.maxHeight;
	return t.endsWith("px") && parseFloat(t) || Infinity;
}
function _w(e) {
	return bC(e.scrollHeight, e.clientHeight);
}
function vw(e) {
	return Lh.getScale(e);
}
function yw(e, t, n) {
	return e / n[t];
}
function bw(e, t) {
	return vu({
		x: yw(e.x, "x", t),
		y: yw(e.y, "y", t),
		width: yw(e.width, "x", t),
		height: yw(e.height, "y", t)
	});
}
function xw(e) {
	let { style: t } = e, n = {};
	for (let [e, r] of Ew) n[e] = t.getPropertyValue(e), t.setProperty(e, r, "important");
	return () => {
		for (let [e] of Ew) {
			let r = n[e];
			r ? t.setProperty(e, r) : t.removeProperty(e);
		}
	};
}
var Sw, Cw, ww, Tw, Ew, Dw = o((() => {
	Sw = /* @__PURE__ */ u(p(), 1), ku(), Il(), qc(), nr(), Fr(), ar(), ql(), yC(), og(), rC(), Os(), XC(), cw(), ds(), qf(), xi(), $C(), Fs(), nc(), lx(), wg(), Ky(), SC(), pw(), Sy(), hw(), Cw = lo(), ww = {
		...Es,
		...us
	}, Tw = /*#__PURE__*/ Sw.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, finalFocus: a, ...o } = e, s = QS(), c = s.useState("multiple"), l = s.useState("readOnly"), u = s.useState("highlightItemOnHover"), d = $S(), { side: f, align: p, alignItemWithTriggerActive: m, isPositioned: h, setControlledAlignItemWithTrigger: g } = qC(), _ = ox(!0) != null, v = yy(), { nonce: y, disableStyleElements: b } = lw(), x = s.useState("id"), S = s.useState("open"), C = s.useState("openMethod"), w = s.useState("mounted"), T = s.useState("popupProps"), E = s.useState("transitionStatus"), D = s.useState("triggerElement"), O = s.useState("positionerElement"), k = s.useState("listElement"), A = Sw.useRef(!1), j = Sw.useRef(!1), M = Sw.useRef({}), N = Hl(), P = W((e) => {
			if (!O || !s.context.popupRef.current || !j.current) return;
			let t = O.style.top === "0px", n = O.style.bottom === "0px";
			if (A.current || !m || !t && !n) {
				s.context.handleScrollArrowVisibility(e);
				return;
			}
			let r = vw(O), i = yw(O.getBoundingClientRect().height, "y", r), a = Pr(O), o = xn(O), c = o.getComputedStyle(O), l = parseFloat(c.marginTop), u = parseFloat(c.marginBottom), d = gw(o.getComputedStyle(s.context.popupRef.current)), f = Math.min(a.documentElement.clientHeight - l - u, d), p = e.scrollTop, h = _w(e), g = null, _ = (e) => {
				O.style.height = `${e}px`;
			}, v = t ? h - p : p, y = Math.min(i + v, f);
			if (v <= 1) {
				let n = vC(v, 0, f - i);
				n > 0 && _(i + n), e.scrollTop = t ? h : 0, f - (i + n) <= 1 && (A.current = !0), s.context.handleScrollArrowVisibility(e);
				return;
			}
			f - y > 1 ? g = t ? Infinity : 0 : n && p < h && (g = p - (v - (i + v - f)));
			let b = Math.ceil(y);
			if (b !== 0 && _(b), g != null) {
				let t = vC(g, 0, _w(e));
				Math.abs(e.scrollTop - t) > 1 && (e.scrollTop = t);
			}
			b >= f - 1 && (A.current = !0), s.context.handleScrollArrowVisibility(e);
		});
		Sw.useImperativeHandle(s.context.scrollHandlerRef, () => P, [P]), Gf({
			open: S,
			ref: s.context.popupRef,
			onComplete() {
				S && s.context.onOpenChangeComplete(!0);
			}
		});
		let F = {
			open: S,
			transitionStatus: E,
			side: f,
			align: p
		};
		G(() => {
			O && s.context.popupRef.current && !Object.keys(M.current).length && (M.current = {
				top: O.style.top || "0",
				left: O.style.left || "0",
				right: O.style.right,
				height: O.style.height,
				bottom: O.style.bottom,
				minHeight: O.style.minHeight,
				maxHeight: O.style.maxHeight,
				marginTop: O.style.marginTop,
				marginBottom: O.style.marginBottom
			});
		}, [s, O]), G(() => {
			S || m || (j.current = !1, A.current = !1, ZC(O, M.current));
		}, [
			S,
			m,
			O
		]), G(() => {
			let e = s.context.popupRef.current;
			if (!S || !D || !O || !e || m && !h || s.state.transitionStatus === "ending") return;
			if (j.current = !0, e.style.removeProperty(mw), !m) {
				N.request(() => s.context.handleScrollArrowVisibility(k || e));
				return;
			}
			let t = xw(e);
			try {
				let t = s.context.selectedItemTextRef.current;
				t?.isConnected || (t = !s.select("hasSelectedValue") && s.context.firstItemTextRef.current?.isConnected ? s.context.firstItemTextRef.current : null);
				let n = s.context.valueRef.current, r = xn(O), i = r.getComputedStyle(O), a = r.getComputedStyle(e), o = Pr(D), c = vw(D), l = bw(D.getBoundingClientRect(), c), d = bw(O.getBoundingClientRect(), c), f = l.height, p = k || e, m = p.scrollHeight, h = parseFloat(a.borderBottomWidth), _ = parseFloat(i.marginTop) || 10, y = parseFloat(i.marginBottom) || 10, b = parseFloat(i.minHeight) || 100, x = gw(a), S = o.documentElement.clientHeight - _ - y, C = o.documentElement.clientWidth, w = S - l.bottom + f, T, E = v === "rtl" ? l.right - d.width : l.left, j = 0;
				if (t && n) {
					let e = bw(n.getBoundingClientRect(), c);
					T = bw(t.getBoundingClientRect(), c), E = d.left + (v === "rtl" ? e.right - T.right : e.left - T.left);
					let r = e.top - l.top + e.height / 2;
					j = T.top - d.top + T.height / 2 - r;
				}
				let N = w + j + y + h, P = Math.min(S, N), F = S - _ - y, I = N - P, L = C - 5;
				O.style.left = `${vC(E, 5, L - d.width)}px`, O.style.height = `${P}px`, O.style.maxHeight = "none", O.style.marginTop = `${_}px`, O.style.marginBottom = `${y}px`, e.style.height = "100%";
				let R = _w(p), ee = I >= R - 1;
				ee && (P = Math.min(S, d.height) - (I - R));
				let z = l.top < 20 || l.bottom > S - 20 || Math.ceil(P) + 1 < Math.min(m, b), te = (r.visualViewport?.scale ?? 1) !== 1 && Bc;
				if (z || te) {
					ZC(O, M.current), g(!1);
					return;
				}
				let B = Math.max(b, P);
				if (ee) {
					let e = Math.max(0, S - N);
					O.style.top = d.height >= F ? "0" : `${e}px`, O.style.height = `${P}px`, p.scrollTop = _w(p);
				} else O.style.bottom = "0", p.scrollTop = I;
				if (T) {
					let t = d.top, n = d.height, r = T.top + T.height / 2, i = vC(n > 0 ? (r - t) / n * 100 : 50, 0, 100);
					e.style.setProperty(mw, `50% ${i}%`);
				}
				(B === S || P >= x) && (A.current = !0), s.context.handleScrollArrowVisibility(p), u && s.state.selectedIndex === null && s.state.activeIndex === null && s.context.listRef.current[0] != null && s.set("activeIndex", 0);
			} finally {
				t();
			}
		}, [
			s,
			S,
			O,
			D,
			m,
			g,
			N,
			k,
			u,
			v,
			h
		]), Sw.useEffect(() => {
			if (!m || !O || !S) return;
			let e = xn(O);
			function t(e) {
				s.context.setOpen(!1, Ns(ec, e));
			}
			return $(e, "resize", t);
		}, [
			s,
			m,
			O,
			S
		]);
		let I = {
			...k ? { role: "presentation" } : {
				role: "listbox",
				"aria-multiselectable": c || void 0,
				"aria-readonly": l || void 0,
				id: `${x}-list`
			},
			onKeyDown(e) {
				_ && xg.has(e.key) && e.stopPropagation();
			},
			onScroll(e) {
				k || P(e.currentTarget);
			},
			...m && { style: k ? { height: "100%" } : QC },
			className: !k && m ? sw.className : void 0
		}, L = fi("div", e, {
			ref: [t, s.context.popupRef],
			state: F,
			stateAttributesMapping: ww,
			props: [
				T,
				I,
				Gy(E),
				o
			]
		});
		return /*#__PURE__*/ (0, Cw.jsxs)(Sw.Fragment, { children: [!b && sw.getElement(y), /*#__PURE__*/ (0, Cw.jsx)(ff, {
			context: d,
			modal: !1,
			disabled: !w,
			openInteractionType: C,
			returnFocus: a,
			restoreFocus: !0,
			children: L
		})] });
	}), Ew = [
		["transform", "none"],
		["scale", "1"],
		["translate", "0 0"]
	];
})), Ow, kw, Aw = o((() => {
	Ow = /* @__PURE__ */ u(p(), 1), rC(), XC(), xi(), cw(), $C(), kw = /*#__PURE__*/ Ow.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, ...a } = e, o = QS(), s = o.useState("multiple"), c = o.useState("readOnly"), { alignItemWithTriggerActive: l } = qC(), u = o.useState("hasScrollArrows"), d = o.useState("openMethod"), f = {
			id: `${o.useState("id")}-list`,
			role: "listbox",
			"aria-multiselectable": s || void 0,
			"aria-readonly": c || void 0,
			onScroll(e) {
				o.context.scrollHandlerRef.current?.(e.currentTarget);
			},
			...l && { style: QC },
			className: u && d !== "touch" ? sw.className : void 0
		};
		return fi("div", e, {
			ref: [t, o.useStateSetter("listElement")],
			props: [f, a]
		});
	});
}));
// node_modules/@base-ui/react/select/item/SelectItemContext.mjs
function jw() {
	let e = Mw.useContext(Nw);
	if (!e) throw Error(Tr(57));
	return e;
}
var Mw, Nw, Pw = o((() => {
	Er(), Mw = /* @__PURE__ */ u(p(), 1), Nw = /*#__PURE__*/ Mw.createContext(void 0);
})), Fw, Iw, Lw, Rw = o((() => {
	Fw = /* @__PURE__ */ u(p(), 1), ar(), rC(), Qb(), xi(), Pw(), Ms(), Fs(), nc(), hC(), el(), Iw = lo(), Lw = /*#__PURE__*/ Fw.memo(/*#__PURE__*/ Fw.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, value: a = null, label: o, disabled: s = !1, nativeButton: c = !1, ...l } = e, u = Fw.useRef(null), d = Xb({
			guess: !0,
			label: o,
			textRef: u
		}), f = QS(), { props: p, multiple: m, disabled: h, readOnly: g, isItemEqualToValue: _ } = f.useState("itemRoot"), v = h || s, y = f.useState("isActive", d.index), b = f.useState("open"), x = f.useState("isSelected", a), S = f.useState("isSelectedByFocus", d.index), C = d.index, w = Fw.useRef(null);
		G(() => {
			let e = f.context.valuesRef.current;
			return e[C] = a, () => {
				delete e[C];
			};
		}, [
			C,
			a,
			f
		]), G(() => {
			let e = f.state.value, t = f.state.selectedIndex, n = t, r;
			m && Array.isArray(e) ? (n = fC(C, a, f.context.valuesRef.current, e, _, t), r = n === C, C === t && !r && (f.context.selectedItemTextRef.current = null)) : (r = e !== void 0 && oC(a, e, _), r && (n = C)), f.set("selectedIndex", n), r && u.current && (f.context.selectedItemTextRef.current = u.current);
		}, [
			C,
			m,
			_,
			f,
			a
		]);
		let T = Fw.useRef("mouse"), E = Fw.useRef(!1), { getButtonProps: D, buttonRef: O } = Rr({
			disabled: v,
			focusableWhenDisabled: !0,
			native: c,
			composite: !0
		}), k = {
			disabled: v,
			selected: x,
			highlighted: y
		};
		function A(e) {
			if (h || g) return;
			let t = f.state.value;
			if (m) {
				let n = Array.isArray(t) ? t : [], r = x ? pC(n, a, _) : [...n, a];
				f.context.setValue(r, Ns(Vs, e));
			} else f.context.setValue(a, Ns(Vs, e)), f.context.setOpen(!1, Ns(Vs, e));
		}
		function j() {
			f.context.selectionRef.current.dragY = 0;
		}
		let M = {
			role: "option",
			"aria-selected": x,
			tabIndex: b && y ? 0 : -1,
			onKeyDown(e) {
				f.set("activeIndex", C), e.key === " " && f.context.typingRef.current && e.preventDefault();
			},
			onClick(e) {
				let t = T.current !== "touch", n = e.nativeEvent.pointerType, r = t && Xc(e.nativeEvent) && (n !== void 0 || y), i = t && !r && !E.current;
				E.current = !1, v || i || A(e.nativeEvent);
			},
			onPointerEnter(e) {
				T.current = e.pointerType;
			},
			onPointerMove(e) {
				if (e.pointerType === "mouse" && e.buttons === 1) {
					let t = f.context.selectionRef.current;
					t.dragY += e.movementY, t.dragY ** 2 >= 64 && (t.allowUnselectedMouseUp = !0);
				}
			},
			onPointerDown(e) {
				T.current = e.pointerType, E.current = !0, j();
			},
			onMouseUp() {
				if (j(), v || T.current === "touch" || E.current) return;
				let e = !f.context.selectionRef.current.allowSelectedMouseUp && x, t = !f.context.selectionRef.current.allowUnselectedMouseUp && !x;
				e || t || (E.current = !0, w.current?.click(), E.current = !1);
			}
		}, N = fi("div", e, {
			ref: [
				O,
				t,
				d.ref,
				w
			],
			state: k,
			props: [
				p,
				M,
				l,
				D
			]
		}), P = Fw.useMemo(() => ({
			selected: x,
			index: C,
			textRef: u,
			selectedByFocus: S
		}), [
			x,
			C,
			u,
			S
		]);
		return /*#__PURE__*/ (0, Iw.jsx)(Nw.Provider, {
			value: P,
			children: N
		});
	}));
})), zw, Bw, Vw = o((() => {
	zw = /* @__PURE__ */ u(p(), 1), Lf(), qf(), xi(), ds(), Bw = /*#__PURE__*/ zw.memo(/*#__PURE__*/ zw.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, keepMounted: a, selected: o, ...s } = e, c = zw.useRef(null), { transitionStatus: l, setMounted: u } = Ff(o), d = fi("span", e, {
			ref: [t, c],
			state: {
				selected: o,
				transitionStatus: l
			},
			props: [{
				"aria-hidden": !0,
				children: "✔️"
			}, s],
			stateAttributesMapping: us
		});
		return Gf({
			batch: !0,
			enabled: !o,
			open: o,
			ref: c,
			onComplete() {
				o || u(!1);
			}
		}), d;
	}));
})), Hw, Uw, Ww, Gw = o((() => {
	Hw = /* @__PURE__ */ u(p(), 1), Pw(), Vw(), Uw = lo(), Ww = /*#__PURE__*/ Hw.forwardRef(function(e, t) {
		let { selected: n } = jw();
		return e.keepMounted || n ? /*#__PURE__*/ (0, Uw.jsx)(Bw, {
			...e,
			selected: n,
			ref: t
		}) : null;
	});
})), Kw, qw, Jw = o((() => {
	Kw = /* @__PURE__ */ u(p(), 1), rC(), Pw(), xi(), qw = /*#__PURE__*/ Kw.memo(/*#__PURE__*/ Kw.forwardRef(function(e, t) {
		let { index: n, textRef: r, selectedByFocus: i } = jw(), a = QS(), { render: o, className: s, style: c, ...l } = e;
		return fi("div", e, {
			ref: [
				Kw.useCallback((e) => {
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
	}));
}));
// node_modules/@base-ui/react/select/scroll-arrow/SelectScrollArrow.mjs
function Yw(e, t, n, r, i, a) {
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
		return o < t && s ? xC(s.offsetTop - i, a) : 0;
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
	return c > o && l ? xC(l.offsetTop + l.offsetHeight - r + i, a) : a;
}
var Xw, Zw, Qw = o((() => {
	Xw = /* @__PURE__ */ u(p(), 1), Ec(), ar(), rC(), XC(), Lf(), qf(), xi(), ds(), SC(), Zw = /*#__PURE__*/ Xw.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, direction: a, keepMounted: o, ...s } = e, c = a === "up", l = QS(), { side: u, scrollDownArrowRef: d, scrollUpArrowRef: f } = qC(), p = c ? "scrollUpArrowVisible" : "scrollDownArrowVisible", m = l.useState(p), h = l.useState("openMethod"), g = m && h !== "touch", _ = Cc(), v = c ? f : d, { mounted: y, transitionStatus: b, setMounted: x } = Ff(g);
		G(() => (l.context.scrollArrowsMountedCountRef.current += 1, l.set("hasScrollArrows", !0), () => {
			l.context.scrollArrowsMountedCountRef.current = Math.max(0, l.context.scrollArrowsMountedCountRef.current - 1), l.context.scrollArrowsMountedCountRef.current === 0 && l.set("hasScrollArrows", !1);
		}), [l]), Gf({
			open: g,
			ref: v,
			onComplete() {
				g || x(!1);
			}
		});
		let S = fi("div", e, {
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
						let n = bC(e.scrollHeight, e.clientHeight), r = xC(e.scrollTop, n), i = r === (c ? 0 : n), a = l.context.listRef.current;
						if (r !== e.scrollTop && (e.scrollTop = r), i) _.clear();
						else {
							if (a.length > 0) {
								let t = v.current?.offsetHeight || 0;
								e.scrollTop = Yw(a, c, r, e.clientHeight, t, n);
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
			stateAttributesMapping: us
		});
		return y || o ? S : null;
	});
})), $w, eT, tT, nT = o((() => {
	$w = /* @__PURE__ */ u(p(), 1), Qw(), eT = lo(), tT = /*#__PURE__*/ $w.forwardRef(function(e, t) {
		return /*#__PURE__*/ (0, eT.jsx)(Zw, {
			...e,
			ref: t,
			direction: "down"
		});
	});
})), rT, iT, aT, oT = o((() => {
	rT = /* @__PURE__ */ u(p(), 1), Qw(), iT = lo(), aT = /*#__PURE__*/ rT.forwardRef(function(e, t) {
		return /*#__PURE__*/ (0, iT.jsx)(Zw, {
			...e,
			ref: t,
			direction: "up"
		});
	});
})), sT = o((() => {
	EC(), xi(), pv(), cv(), Wn(), Fr(), nr(), qp(), ar(), gc(), xv(), rC(), FC(), zC(), HC(), KC(), Os(), ds(), iw(), Dw(), Aw(), Rw(), Gw(), Jw(), XC(), nT(), oT(), Er();
})), cT = o((() => {
	sT(), AC(), Os(), hw(), ds();
}));
// src/components/ui/select.tsx
function lT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, hT.jsx)(RC, {
		"data-slot": "select-value",
		className: J("flex flex-1 text-left", e),
		...t
	});
}
function uT({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, hT.jsxs)(PC, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: J("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...r,
		children: [n, /* @__PURE__ */ (0, hT.jsx)(VC, { render: /* @__PURE__ */ (0, hT.jsx)(oe, { className: "pointer-events-none size-4 text-muted-foreground" }) })]
	});
}
function dT({ className: e, children: t, side: n = "bottom", sideOffset: r = 4, align: i = "center", alignOffset: a = 0, alignItemWithTrigger: o = !0, ...s }) {
	let c = F_();
	return /* @__PURE__ */ (0, hT.jsx)(GC, {
		container: c ?? void 0,
		children: /* @__PURE__ */ (0, hT.jsx)(rw, {
			side: n,
			sideOffset: r,
			align: i,
			alignOffset: a,
			alignItemWithTrigger: o,
			className: "isolate z-50",
			children: /* @__PURE__ */ (0, hT.jsxs)(Tw, {
				"data-slot": "select-content",
				"data-align-trigger": o,
				className: J("relative isolate z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-36 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...s,
				children: [
					/* @__PURE__ */ (0, hT.jsx)(pT, {}),
					/* @__PURE__ */ (0, hT.jsx)(kw, { children: t }),
					/* @__PURE__ */ (0, hT.jsx)(mT, {})
				]
			})
		})
	});
}
function fT({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, hT.jsxs)(Lw, {
		"data-slot": "select-item",
		className: J("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, hT.jsx)(qw, {
			className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
			children: t
		}), /* @__PURE__ */ (0, hT.jsx)(Ww, {
			render: /* @__PURE__ */ (0, hT.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ (0, hT.jsx)(ie, { className: "pointer-events-none" })
		})]
	});
}
function pT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, hT.jsx)(aT, {
		"data-slot": "select-scroll-up-button",
		className: J("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, hT.jsx)(le, {})
	});
}
function mT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, hT.jsx)(tT, {
		"data-slot": "select-scroll-down-button",
		className: J("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, hT.jsx)(oe, {})
	});
}
var hT, gT, _T = o((() => {
	p(), cT(), so(), z_(), vn(), hT = lo(), gT = CC;
}));
// src/components/admin/password-dialog.tsx
function vT({ request: e, onClose: t }) {
	let [n, r] = (0, yT.useState)(!1), [i, a] = (0, yT.useState)("");
	return /* @__PURE__ */ (0, bT.jsx)(B_, {
		open: !0,
		onOpenChange: (e) => {
			!e && !n && t(!1);
		},
		children: /* @__PURE__ */ (0, bT.jsxs)(U_, {
			className: "sm:max-w-md",
			onKeyDown: (e) => {
				n && e.key === "Escape" && e.preventDefault();
			},
			children: [/* @__PURE__ */ (0, bT.jsxs)(W_, { children: [/* @__PURE__ */ (0, bT.jsx)(K_, { children: "Alterar senha" }), /* @__PURE__ */ (0, bT.jsx)(q_, { children: e.self ? "Atualize sua senha. Será necessário entrar novamente." : `Defina uma nova senha para ${e.username}.` })] }), /* @__PURE__ */ (0, bT.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: async (i) => {
					if (i.preventDefault(), n) return;
					let o = i.currentTarget, s = new FormData(o), c = {
						currentPassword: String(s.get("currentPassword") || ""),
						newPassword: String(s.get("newPassword") || ""),
						confirmPassword: String(s.get("confirmPassword") || "")
					};
					if (c.newPassword !== c.confirmPassword) a("As novas senhas não coincidem.");
					else {
						r(!0), a("");
						try {
							await e.submit(c), o.reset(), t(!0);
						} catch (e) {
							a(e instanceof Error ? e.message : "Não foi possível alterar a senha.");
						} finally {
							r(!1);
						}
					}
				},
				children: [
					/* @__PURE__ */ (0, bT.jsx)("input", {
						hidden: !0,
						readOnly: !0,
						autoComplete: "username",
						value: e.username
					}),
					e.self && /* @__PURE__ */ (0, bT.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Senha atual", /* @__PURE__ */ (0, bT.jsx)(zv, {
							name: "currentPassword",
							type: "password",
							autoComplete: "current-password",
							required: !0,
							disabled: n
						})]
					}),
					/* @__PURE__ */ (0, bT.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Nova senha", /* @__PURE__ */ (0, bT.jsx)(zv, {
							name: "newPassword",
							type: "password",
							minLength: 8,
							autoComplete: "new-password",
							required: !0,
							disabled: n
						})]
					}),
					/* @__PURE__ */ (0, bT.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Confirmar nova senha", /* @__PURE__ */ (0, bT.jsx)(zv, {
							name: "confirmPassword",
							type: "password",
							minLength: 8,
							autoComplete: "new-password",
							required: !0,
							disabled: n
						})]
					}),
					i && /* @__PURE__ */ (0, bT.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: i
					}),
					/* @__PURE__ */ (0, bT.jsxs)(G_, { children: [/* @__PURE__ */ (0, bT.jsx)(Y, {
						type: "button",
						variant: "outline",
						disabled: n,
						onClick: () => t(!1),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, bT.jsx)(Y, {
						type: "submit",
						disabled: n,
						children: n ? "Salvando…" : "Salvar senha"
					})] })
				]
			})]
		})
	});
}
var yT, bT, xT = o((() => {
	yT = /* @__PURE__ */ u(p(), 1), po(), Vv(), Y_(), bT = lo();
}));
// src/features/profile/avatar-editor.tsx
function ST({ file: e, shape: t, onSave: n, onCancel: r }) {
	let i = (0, CT.useRef)(null), [a, o] = (0, CT.useState)(null), [s, c] = (0, CT.useState)(1), [l, u] = (0, CT.useState)({
		x: 0,
		y: 0
	}), [d, f] = (0, CT.useState)(""), p = (0, CT.useRef)(null);
	return (0, CT.useEffect)(() => {
		let t = URL.createObjectURL(e), n = new Image();
		return n.onload = () => {
			n.naturalWidth * n.naturalHeight > 24e6 ? f("Escolha uma imagem de até 24 megapixels.") : o(n);
		}, n.onerror = () => f("Não foi possível abrir esta imagem."), n.src = t, () => URL.revokeObjectURL(t);
	}, [e]), (0, CT.useEffect)(() => {
		if (!a || !i.current) return;
		let e = i.current.getContext("2d");
		if (!e) return;
		let t = Math.min(a.naturalWidth, a.naturalHeight) / s, n = (a.naturalWidth - t) * (1 + l.x) / 2, r = (a.naturalHeight - t) * (1 + l.y) / 2;
		e.fillStyle = "#111113", e.fillRect(0, 0, 256, 256), e.drawImage(a, n, r, t, t, 0, 0, 256, 256);
	}, [
		a,
		s,
		l
	]), /* @__PURE__ */ (0, wT.jsxs)("div", {
		className: "grid gap-3 rounded-lg border p-4",
		children: [
			/* @__PURE__ */ (0, wT.jsx)("p", {
				className: "text-sm font-medium",
				children: "Recortar foto"
			}),
			/* @__PURE__ */ (0, wT.jsx)("canvas", {
				ref: i,
				width: 256,
				height: 256,
				"aria-label": "Prévia do recorte",
				className: "mx-auto aspect-square w-full max-w-56 touch-none bg-muted",
				style: { borderRadius: GS(t) },
				onPointerDown: (e) => {
					p.current = {
						x: e.clientX,
						y: e.clientY,
						pan: l
					}, e.currentTarget.setPointerCapture(e.pointerId);
				},
				onPointerMove: (e) => {
					if (p.current) {
						let t = p.current;
						u({
							x: Math.max(-1, Math.min(1, t.pan.x - (e.clientX - t.x) / 100)),
							y: Math.max(-1, Math.min(1, t.pan.y - (e.clientY - t.y) / 100))
						});
					}
				},
				onPointerUp: () => {
					p.current = null;
				},
				onPointerCancel: () => {
					p.current = null;
				}
			}),
			d && /* @__PURE__ */ (0, wT.jsx)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: d
			}),
			/* @__PURE__ */ (0, wT.jsxs)("label", {
				className: "grid gap-1 text-xs",
				children: ["Zoom", /* @__PURE__ */ (0, wT.jsx)("input", {
					"aria-label": "Zoom do recorte",
					type: "range",
					min: 1,
					max: 3,
					step: .01,
					value: s,
					onChange: (e) => c(Number(e.target.value))
				})]
			}),
			/* @__PURE__ */ (0, wT.jsx)("div", {
				className: "grid grid-cols-2 gap-3",
				children: ["x", "y"].map((e) => /* @__PURE__ */ (0, wT.jsxs)("label", {
					className: "grid gap-1 text-xs",
					children: [e === "x" ? "Horizontal" : "Vertical", /* @__PURE__ */ (0, wT.jsx)("input", {
						"aria-label": e === "x" ? "Posição horizontal" : "Posição vertical",
						type: "range",
						min: -1,
						max: 1,
						step: .01,
						value: l[e],
						onChange: (t) => u({
							...l,
							[e]: Number(t.target.value)
						})
					})]
				}, e))
			}),
			/* @__PURE__ */ (0, wT.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, wT.jsx)(Y, {
					type: "button",
					variant: "outline",
					onClick: r,
					children: "Cancelar recorte"
				}), /* @__PURE__ */ (0, wT.jsx)(Y, {
					type: "button",
					disabled: !a || !!d,
					onClick: () => {
						i.current && n(i.current.toDataURL("image/jpeg", .86));
					},
					children: "Usar recorte"
				})]
			})
		]
	});
}
var CT, wT, TT = o((() => {
	CT = /* @__PURE__ */ u(p(), 1), po(), JS(), wT = lo();
})), ET = /* @__PURE__ */ c({ default: () => DT });
function DT({ username: e, role: t, profile: n, onClose: r, onLogout: i }) {
	let [a, o] = (0, OT.useState)(n), [s, c] = (0, OT.useState)(!1), [l, u] = (0, OT.useState)(""), [d, f] = (0, OT.useState)(null), [p, m] = (0, OT.useState)(!1), h = (0, OT.useRef)(null);
	return /* @__PURE__ */ (0, kT.jsxs)(kT.Fragment, { children: [/* @__PURE__ */ (0, kT.jsx)(B_, {
		open: !0,
		onOpenChange: (e) => {
			!e && !s && r();
		},
		children: /* @__PURE__ */ (0, kT.jsxs)(U_, {
			className: "max-h-[90svh] overflow-y-auto sm:max-w-lg",
			children: [/* @__PURE__ */ (0, kT.jsxs)(W_, { children: [/* @__PURE__ */ (0, kT.jsx)(K_, { children: "Meu perfil" }), /* @__PURE__ */ (0, kT.jsxs)(q_, { children: [
				"@",
				e,
				" · ",
				t
			] })] }), /* @__PURE__ */ (0, kT.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: async (t) => {
					if (t.preventDefault(), !(s || d)) {
						c(!0), u("");
						try {
							zS(e, await PS.save(a)), r();
						} catch (e) {
							u(e instanceof Error ? e.message : "Não foi possível salvar.");
						} finally {
							c(!1);
						}
					}
				},
				children: [
					/* @__PURE__ */ (0, kT.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, kT.jsx)(KS, {
							profile: a,
							className: "size-16"
						}), /* @__PURE__ */ (0, kT.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, kT.jsx)("input", {
									ref: h,
									type: "file",
									accept: "image/png,image/jpeg,image/webp",
									className: "sr-only",
									"aria-label": "Selecionar foto de perfil",
									onChange: (e) => {
										let t = e.target.files?.[0];
										e.target.value = "", t && (t.size > 5242880 || ![
											"image/png",
											"image/jpeg",
											"image/webp"
										].includes(t.type) ? u("Escolha uma imagem PNG, JPEG ou WebP de até 5 MB.") : (u(""), f(t)));
									}
								}),
								/* @__PURE__ */ (0, kT.jsxs)(Y, {
									type: "button",
									variant: "outline",
									disabled: s,
									onClick: () => h.current?.click(),
									children: [/* @__PURE__ */ (0, kT.jsx)(Ge, { className: "size-4" }), "Alterar foto"]
								}),
								a.avatar && /* @__PURE__ */ (0, kT.jsx)(Y, {
									type: "button",
									variant: "ghost",
									disabled: s,
									onClick: () => o({
										...a,
										avatar: null
									}),
									children: "Remover"
								})
							]
						})]
					}),
					d && /* @__PURE__ */ (0, kT.jsx)(ST, {
						file: d,
						shape: a.avatarShape,
						onCancel: () => f(null),
						onSave: (e) => {
							o({
								...a,
								avatar: e
							}), f(null);
						}
					}, d.name + d.lastModified),
					/* @__PURE__ */ (0, kT.jsxs)("label", {
						className: "grid gap-1.5 text-sm",
						children: ["Nome de exibição", /* @__PURE__ */ (0, kT.jsx)(zv, {
							required: !0,
							maxLength: 40,
							value: a.displayName,
							disabled: s,
							onChange: (e) => o({
								...a,
								displayName: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, kT.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, kT.jsxs)("label", {
							className: "grid gap-1.5 text-sm",
							children: ["Cor do nome", /* @__PURE__ */ (0, kT.jsx)("input", {
								type: "color",
								"aria-label": "Cor do nome",
								value: a.nameColor,
								disabled: s,
								onChange: (e) => o({
									...a,
									nameColor: e.target.value
								}),
								className: "h-9 w-full rounded-md border border-input bg-background p-1"
							})]
						}), /* @__PURE__ */ (0, kT.jsxs)("label", {
							className: "grid gap-1.5 text-sm",
							children: ["Formato da foto", /* @__PURE__ */ (0, kT.jsxs)(gT, {
								value: a.avatarShape,
								disabled: s,
								onValueChange: (e) => {
									e && o({
										...a,
										avatarShape: e
									});
								},
								children: [/* @__PURE__ */ (0, kT.jsx)(uT, {
									className: "w-full",
									children: /* @__PURE__ */ (0, kT.jsx)(lT, { children: {
										circle: "Círculo",
										square: "Quadrado",
										rounded: "Cantos arredondados"
									}[a.avatarShape] })
								}), /* @__PURE__ */ (0, kT.jsxs)(dT, { children: [
									/* @__PURE__ */ (0, kT.jsx)(fT, {
										value: "circle",
										children: "Círculo"
									}),
									/* @__PURE__ */ (0, kT.jsx)(fT, {
										value: "square",
										children: "Quadrado"
									}),
									/* @__PURE__ */ (0, kT.jsx)(fT, {
										value: "rounded",
										children: "Cantos arredondados"
									})
								] })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, kT.jsxs)("label", {
						className: "grid gap-1.5 text-sm",
						children: [
							"Descrição",
							/* @__PURE__ */ (0, kT.jsx)("textarea", {
								"aria-label": "Descrição",
								maxLength: 280,
								rows: 3,
								value: a.bio,
								disabled: s,
								onChange: (e) => o({
									...a,
									bio: e.target.value
								}),
								className: "min-h-20 resize-y rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							}),
							/* @__PURE__ */ (0, kT.jsxs)("span", {
								className: "text-right text-xs text-muted-foreground",
								children: [a.bio.length, "/280"]
							})
						]
					}),
					/* @__PURE__ */ (0, kT.jsxs)("div", {
						className: "rounded-md border p-3",
						children: [/* @__PURE__ */ (0, kT.jsx)("p", {
							className: "text-sm font-medium",
							style: { color: a.nameColor },
							children: a.displayName || e
						}), /* @__PURE__ */ (0, kT.jsx)("p", {
							className: "mt-1 whitespace-pre-wrap break-words text-xs text-muted-foreground",
							children: a.bio || "Seu perfil OrganizeOn"
						})]
					}),
					l && /* @__PURE__ */ (0, kT.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: l
					}),
					/* @__PURE__ */ (0, kT.jsxs)(G_, { children: [/* @__PURE__ */ (0, kT.jsx)(Y, {
						type: "button",
						variant: "outline",
						disabled: s,
						onClick: r,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, kT.jsx)(Y, {
						type: "submit",
						disabled: s || !!d,
						children: s ? "Salvando…" : "Salvar perfil"
					})] }),
					/* @__PURE__ */ (0, kT.jsxs)("div", {
						className: "flex flex-wrap gap-2 border-t pt-4",
						children: [/* @__PURE__ */ (0, kT.jsxs)(Y, {
							type: "button",
							variant: "outline",
							disabled: s,
							onClick: () => m(!0),
							children: [/* @__PURE__ */ (0, kT.jsx)(Ze, { className: "size-4" }), "Alterar senha"]
						}), i && /* @__PURE__ */ (0, kT.jsxs)(Y, {
							type: "button",
							variant: "ghost",
							disabled: s,
							onClick: () => {
								r(), i();
							},
							children: [/* @__PURE__ */ (0, kT.jsx)(rt, { className: "size-4" }), "Sair da conta"]
						})]
					})
				]
			})]
		})
	}), p && /* @__PURE__ */ (0, kT.jsx)(vT, {
		request: {
			username: e,
			self: !0,
			submit: PS.password
		},
		onClose: (e) => {
			m(!1), e && (r(), MS());
		}
	})] });
}
var OT, kT, AT = o((() => {
	OT = /* @__PURE__ */ u(p(), 1), vn(), po(), Vv(), Y_(), _T(), xT(), FS(), WS(), JS(), TT(), kT = lo();
}));
vn(), WS(), JS();
var jT = (0, Z.lazy)(() => Promise.resolve().then(() => (AT(), ET))), MT = {
	owner: "Owner",
	ultra_admin: "Ultra admin",
	super_admin: "Super admin",
	admin: "Admin",
	user: "Usuário",
	guest: "Convidado"
};
function NT({ username: e, role: t, onLogout: n }) {
	let [r, i] = (0, Z.useState)(!1), a = BS(e, t !== "guest"), o = MT[t] || t, s = /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)(KS, { profile: a }), /* @__PURE__ */ (0, X.jsxs)("span", {
		className: "grid min-w-0 flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden",
		children: [/* @__PURE__ */ (0, X.jsx)("span", {
			className: "truncate font-medium",
			style: { color: a.nameColor },
			children: a.displayName
		}), /* @__PURE__ */ (0, X.jsx)("span", {
			className: "truncate text-muted-foreground",
			children: o
		})]
	})] });
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsxs)(CS, { children: [/* @__PURE__ */ (0, X.jsxs)(wS, {
		render: /* @__PURE__ */ (0, X.jsx)(Db, {
			size: "lg",
			className: "h-12 justify-start",
			"aria-label": `Perfil de ${e}`
		}),
		children: [s, /* @__PURE__ */ (0, X.jsx)(le, { className: "ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" })]
	}), /* @__PURE__ */ (0, X.jsxs)(TS, {
		side: "top",
		align: "start",
		className: "w-64",
		children: [
			/* @__PURE__ */ (0, X.jsx)(ES, { children: /* @__PURE__ */ (0, X.jsx)(DS, {
				className: "px-2 py-2",
				children: /* @__PURE__ */ (0, X.jsxs)("span", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, X.jsx)(KS, { profile: a }), /* @__PURE__ */ (0, X.jsxs)("span", {
						className: "grid min-w-0",
						children: [/* @__PURE__ */ (0, X.jsx)("span", {
							className: "truncate text-sm font-medium",
							style: { color: a.nameColor },
							children: a.displayName
						}), /* @__PURE__ */ (0, X.jsxs)("span", {
							className: "truncate text-xs text-muted-foreground",
							children: [
								"@",
								e,
								" · ",
								o
							]
						})]
					})]
				})
			}) }),
			/* @__PURE__ */ (0, X.jsx)(kS, {}),
			/* @__PURE__ */ (0, X.jsxs)(OS, {
				disabled: t === "guest",
				onClick: () => {
					RS(e).then(() => i(!0));
				},
				children: [/* @__PURE__ */ (0, X.jsx)(un, {}), "Perfil"]
			}),
			t === "guest" && n && /* @__PURE__ */ (0, X.jsx)(OS, {
				onClick: n,
				children: "Sair do modo convidado"
			})
		]
	})] }), r && /* @__PURE__ */ (0, X.jsx)(X_, {
		onClose: () => i(!1),
		children: /* @__PURE__ */ (0, X.jsx)(Z.Suspense, {
			fallback: /* @__PURE__ */ (0, X.jsx)("p", {
				role: "status",
				className: "fixed bottom-4 right-4 rounded-md border bg-popover p-3 text-sm",
				children: "Carregando perfil…"
			}),
			children: /* @__PURE__ */ (0, X.jsx)(jT, {
				username: e,
				role: o,
				profile: a,
				onClose: () => i(!1),
				onLogout: n
			})
		})
	})] });
}
Cr(), Mi(), so();
var PT = ji("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
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
function FT({ className: e, variant: t = "default", render: n, ...r }) {
	return Z_({
		defaultTagName: "span",
		props: cr({ className: J(PT({ variant: t }), e) }, r),
		render: n,
		state: {
			slot: "badge",
			variant: t
		}
	});
}
vn(), po(), Y_();
function IT({ account: e, confirmLogout: t }) {
	let { setOpen: n, setOpenMobile: r } = pb(), i = () => {
		n(!1), r(!1);
	}, a = [
		{
			id: "home",
			label: "Início",
			icon: He
		},
		{
			id: "games",
			label: "Jogos",
			icon: ze
		},
		{
			id: "settings",
			label: "Configurações",
			icon: It
		},
		...e.guest ? [] : [{
			id: "data",
			label: "Dados",
			icon: he
		}],
		{
			id: "proxy",
			label: "Servidor proxy",
			icon: Gt
		},
		...e.canOpenDashboard ? [{
			id: "dashboard",
			label: "Dashboard",
			icon: Ht
		}] : []
	];
	return /* @__PURE__ */ (0, X.jsxs)(hb, {
		collapsible: "offcanvas",
		className: "pointer-events-auto",
		children: [
			/* @__PURE__ */ (0, X.jsx)(vb, {
				className: "px-3 pb-3 pt-4",
				children: /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "flex min-h-10 items-center gap-2.5 px-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, X.jsx)("img", {
						className: "size-7 shrink-0",
						src: "https://organizeon.com.br/d3/assets/organizeon-icon.png",
						alt: ""
					}), /* @__PURE__ */ (0, X.jsx)("span", { children: "OrganizeOn" })]
				})
			}),
			/* @__PURE__ */ (0, X.jsx)(bb, {}),
			/* @__PURE__ */ (0, X.jsx)(xb, { children: /* @__PURE__ */ (0, X.jsxs)(Sb, { children: [/* @__PURE__ */ (0, X.jsx)(Cb, { children: "Workspace" }), /* @__PURE__ */ (0, X.jsx)(wb, { children: a.map(({ id: t, label: n, icon: r }) => /* @__PURE__ */ (0, X.jsx)(Tb, { children: /* @__PURE__ */ (0, X.jsxs)(Db, {
				tooltip: n,
				onClick: () => {
					i(), e.onNavigate(t);
				},
				children: [
					/* @__PURE__ */ (0, X.jsx)(r, {}),
					/* @__PURE__ */ (0, X.jsx)("span", { children: n }),
					t === "proxy" && /* @__PURE__ */ (0, X.jsx)(FT, {
						variant: "secondary",
						className: "ml-auto text-[10px]",
						children: e.proxyLabel
					})
				]
			}) }, t)) })] }) }),
			/* @__PURE__ */ (0, X.jsx)(yb, {
				className: "px-2 pb-3",
				children: /* @__PURE__ */ (0, X.jsx)(NT, {
					username: e.username,
					role: e.role,
					onLogout: () => {
						i(), t();
					}
				})
			})
		]
	});
}
function LT(e) {
	let [t, n] = (0, Z.useState)(!1);
	return /* @__PURE__ */ (0, X.jsxs)(mb, {
		defaultOpen: !1,
		className: "pointer-events-none min-h-0",
		children: [
			/* @__PURE__ */ (0, X.jsx)(IT, {
				account: e,
				confirmLogout: () => n(!0)
			}),
			/* @__PURE__ */ (0, X.jsx)(gb, {
				className: "pointer-events-auto fixed left-3 top-3 z-40 border bg-background",
				"aria-label": "Abrir menu"
			}),
			/* @__PURE__ */ (0, X.jsx)(B_, {
				open: t,
				onOpenChange: n,
				children: /* @__PURE__ */ (0, X.jsxs)(U_, {
					className: "sm:max-w-sm",
					children: [/* @__PURE__ */ (0, X.jsxs)(W_, { children: [/* @__PURE__ */ (0, X.jsx)(K_, { children: "Encerrar sessão?" }), /* @__PURE__ */ (0, X.jsx)(q_, { children: e.guest ? "Deseja sair do modo convidado?" : "Deseja realmente sair desta conta?" })] }), /* @__PURE__ */ (0, X.jsxs)(G_, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
						variant: "outline",
						onClick: () => n(!1),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, X.jsx)(Y, {
						variant: "destructive",
						onClick: () => e.onNavigate("logout"),
						children: "Sair"
					})] })]
				})
			})
		]
	});
}
// src/components/ui/card.tsx
so();
function RT({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card",
		"data-size": t,
		className: J("group/card flex flex-col gap-[var(--card-spacing)] overflow-hidden rounded-xl bg-card py-[var(--card-spacing)] text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:1rem] has-[data-slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:0.75rem] data-[size=sm]:has-[data-slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", e),
		...n
	});
}
function zT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-header",
		className: J("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-[var(--card-spacing)] has-[data-slot=card-action]:grid-cols-[1fr_auto] has-[data-slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-[var(--card-spacing)]", e),
		...t
	});
}
function BT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("h2", {
		"data-slot": "card-title",
		className: J("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", e),
		...t
	});
}
function VT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-description",
		className: J("text-sm text-muted-foreground", e),
		...t
	});
}
function HT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-content",
		className: J("px-[var(--card-spacing)]", e),
		...t
	});
}
function UT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-footer",
		className: J("flex items-center rounded-b-xl border-t bg-muted/50 p-[var(--card-spacing)]", e),
		...t
	});
}
// node_modules/@base-ui/react/tabs/root/TabsRootContext.mjs
Er();
var WT = /*#__PURE__*/ Z.createContext(void 0);
function GT() {
	let e = Z.useContext(WT);
	if (e === void 0) throw Error(Tr(64));
	return e;
}
// node_modules/@base-ui/react/tabs/root/TabsRootDataAttributes.mjs
var KT = "data-activation-direction", qT = { tabActivationDirection: (e) => ({ [KT]: e }) };
Ib(), ar(), nr(), xi(), jx(), Fs(), nc();
var JT = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { className: n, defaultValue: r = 0, onValueChange: i, orientation: a = "horizontal", render: o, value: s, style: c, ...l } = e, u = e.defaultValue !== void 0, d = Z.useRef([]), [f, p] = Z.useState(() => /* @__PURE__ */ new Map()), [m, h] = Pb({
		controlled: s,
		default: r,
		name: "Tabs",
		state: "value"
	}), g = s !== void 0, [_, v] = Z.useState(() => /* @__PURE__ */ new Map()), y = Z.useRef(void 0), b = Z.useCallback((e) => YT(_, e), [_]), [x, S] = Z.useState(() => ({
		previousValue: m,
		tabActivationDirection: "none"
	})), { previousValue: C, tabActivationDirection: w } = x, T = w, E = !1;
	C !== m && (T = XT(C, m, a, _), E = C != null && m != null && b(m) == null);
	let D = E ? C : m, O = C !== D || w !== T;
	G(() => {
		O && S({
			previousValue: D,
			tabActivationDirection: T
		});
	}, [
		D,
		O,
		T
	]);
	let k = W((e, t) => {
		t.activationDirection = XT(m, e, a, _), i?.(e, t), t.isCanceled || h(() => e);
	}), A = W((e, t) => {
		i?.(e, Ns(t, void 0, void 0, { activationDirection: "none" }));
	}), j = W((e, t) => (p((n) => {
		let r = new Map(n);
		return r.set(e, t), r;
	}), () => {
		p((n) => {
			if (n.get(e) !== t) return n;
			let r = new Map(n);
			return r.delete(e), r;
		});
	})), M = Z.useCallback((e) => f.get(e), [f]), N = Z.useCallback((e) => {
		for (let t of _.values()) if (e === t.value) return t.id;
	}, [_]), P = Z.useMemo(() => ({
		getTabElementBySelectedValue: b,
		getTabIdByPanelValue: N,
		getTabPanelIdByValue: M,
		onValueChange: k,
		orientation: a,
		registerMountedTabPanel: j,
		setTabMap: v,
		tabActivationDirection: T,
		value: m
	}), [
		b,
		N,
		M,
		k,
		a,
		j,
		v,
		T,
		m
	]), F = Z.useMemo(() => {
		for (let e of _.values()) if (e.value === m) return e;
	}, [_, m]), I = Z.useMemo(() => {
		for (let e of _.values()) if (!e.disabled) return e.value;
	}, [_]), L = Z.useRef(!u), R = Z.useRef(r), ee = Z.useRef(u), z = Z.useRef(!1);
	G(() => {
		if (g) return;
		function e(e, t) {
			h(() => e), S({
				previousValue: e,
				tabActivationDirection: "none"
			}), A(e, t), L.current = !1;
		}
		if (_.size === 0) {
			z.current && m !== null && !y.current?.isConnected && e(null, Zs);
			return;
		}
		z.current = !0, y.current = _.keys().next().value;
		let t = F?.disabled, n = F == null && m !== null;
		if (!t && m === R.current && (ee.current = !1), ee.current && t && m === R.current) return;
		let r = L.current;
		if (t || n) {
			let n = I ?? null;
			if (m === n) {
				L.current = !1;
				return;
			}
			let i = Zs;
			r ? i = Qs : t && (i = Xs), e(n, i);
		} else r && F != null && (A(m, Qs), L.current = !1);
	}, [
		I,
		g,
		A,
		F,
		h,
		_,
		m
	]);
	let te = fi("div", e, {
		state: {
			orientation: a,
			tabActivationDirection: T
		},
		ref: t,
		props: l,
		stateAttributesMapping: qT
	});
	return /*#__PURE__*/ (0, X.jsx)(WT.Provider, {
		value: P,
		children: /*#__PURE__*/ (0, X.jsx)(Sx, {
			elementsRef: d,
			children: te
		})
	});
});
function YT(e, t) {
	for (let [n, r] of e.entries()) if (t === r.value) return n;
	return null;
}
function XT(e, t, n, r) {
	if (e == null || t == null) return "none";
	let [i, a, o] = n === "horizontal" ? [
		"left",
		"left",
		"right"
	] : [
		"top",
		"up",
		"down"
	], s = YT(r, e), c = YT(r, t);
	if (s == null || c == null) return s !== c && (typeof e == "number" || typeof e == "string") && typeof e == typeof t ? t > e ? o : a : "none";
	let l = s.getBoundingClientRect()[i], u = c.getBoundingClientRect()[i];
	return u < l ? a : u > l ? o : "none";
}
// node_modules/@base-ui/react/internals/composite/constants.mjs
var ZT = "data-composite-item-active";
// node_modules/@base-ui/react/tabs/list/TabsListContext.mjs
Er();
var QT = /*#__PURE__*/ Z.createContext(void 0);
function $T() {
	let e = Z.useContext(QT);
	if (e === void 0) throw Error(Tr(65));
	return e;
}
Fr(), ar(), nr(), gc(), xi(), Ms(), Ar(), Fs(), nc(), qp();
var eE = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { className: n, disabled: r = !1, render: i, value: a, id: o, nativeButton: s = !0, style: c, ...l } = e, { value: u, getTabPanelIdByValue: d, onValueChange: f, orientation: p, tabActivationDirection: m } = GT(), { activateOnFocus: h, registerTabResizeObserverElement: g, tabsListElement: _ } = $T(), { highlightedIndex: v, onHighlightedIndexChange: y } = Dr(), b = hc(o), { compositeProps: x, compositeRef: S, index: C } = eS({ metadata: Z.useMemo(() => ({
		disabled: r,
		id: b,
		value: a
	}), [
		r,
		b,
		a
	]) }), w = a === u, T = Z.useRef(!1), E = Z.useRef(null), D = W((e) => {
		E.current?.(), E.current = e ? g(e) : null;
	});
	G(() => {
		if (T.current) {
			T.current = !1;
			return;
		}
		if (!(w && C > -1 && v !== C)) return;
		let e = _;
		if (e != null) {
			let t = tl(Pr(e));
			if (t && Q(e, t)) return;
		}
		r || y(C);
	}, [
		w,
		C,
		v,
		y,
		r,
		_
	]);
	let { getButtonProps: O, buttonRef: k } = Rr({
		disabled: r,
		native: s,
		focusableWhenDisabled: !0
	}), A = d(a), j = Z.useRef(!1), M = Z.useRef(!1);
	function N(e) {
		f(a, Ns(Is, e.nativeEvent, void 0, { activationDirection: "none" }));
	}
	function P(e) {
		w || r || N(e);
	}
	function F(e) {
		w || r || h && (!j.current || M.current) && N(e);
	}
	function I(e) {
		if (w || r) return;
		j.current = !0, M.current = e.button === 0;
		let t = Pr(e.currentTarget);
		function n() {
			j.current = !1, M.current = !1, t.removeEventListener("pointerup", n), t.removeEventListener("pointercancel", n);
		}
		t.addEventListener("pointerup", n), t.addEventListener("pointercancel", n);
	}
	return fi("button", e, {
		state: {
			disabled: r,
			active: w,
			orientation: p,
			tabActivationDirection: m
		},
		ref: [
			t,
			k,
			S,
			D
		],
		props: [
			x,
			{
				role: "tab",
				"aria-controls": A,
				"aria-selected": w,
				id: b,
				onClick: P,
				onFocus: F,
				onPointerDown: I,
				[ZT]: w ? "" : void 0,
				onKeyDownCapture() {
					T.current = !0;
				}
			},
			l,
			O
		],
		stateAttributesMapping: qT
	});
});
// node_modules/@base-ui/react/tabs/panel/TabsPanelDataAttributes.mjs
ds();
var tE = "data-index";
Ig(), ar(), gc(), ds(), qf(), Lf(), xi(), Qb();
var nE = {
	...qT,
	...us
}, rE = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { className: n, value: r, render: i, keepMounted: a = !1, style: o, ...s } = e, { value: c, getTabIdByPanelValue: l, orientation: u, tabActivationDirection: d, registerMountedTabPanel: f } = GT(), p = hc(), { ref: m, index: h } = Xb(), g = r === c, { mounted: _, transitionStatus: v, setMounted: y } = Ff(g), b = !_, x = l(r), S = {
		hidden: b,
		orientation: u,
		tabActivationDirection: d,
		transitionStatus: v
	}, C = Z.useRef(null), w = fi("div", e, {
		state: S,
		ref: [
			t,
			m,
			C
		],
		props: [{
			"aria-labelledby": x,
			hidden: b,
			id: p,
			role: "tabpanel",
			tabIndex: g ? 0 : -1,
			inert: Fg(!g),
			[tE]: h
		}, s],
		stateAttributesMapping: nE
	});
	return Gf({
		open: g,
		ref: C,
		onComplete() {
			g || y(!1);
		}
	}), G(() => {
		if (!(p == null || b && !a)) return f(r, p);
	}, [
		b,
		a,
		r,
		p,
		f
	]), a || _ ? w : null;
});
lS(), nr(), Yr(), ar(), ai(), wg(), qp();
function iE(e) {
	let { loopFocus: t = !0, orientation: n = "both", grid: r, onLoop: i, direction: a, highlightedIndex: o, onHighlightedIndexChange: s, rootRef: c, enableHomeAndEndKeys: l = !1, stopEventPropagation: u, disabledIndices: d, modifierKeys: f = ri } = e, [p, m] = Z.useState(0), h = r != null, g = Z.useRef(null), _ = Ur(g, c), v = Z.useRef([]), y = Z.useRef(!1), b = Z.useRef(null), x = o ?? p, S = W((e, t = !1) => {
		if (b.current = v.current[e] ?? null, (s ?? m)(e), t) {
			let t = v.current[e];
			pg(g.current, t, a, n);
		}
	}), C = W((e) => {
		if (e.size === 0) return;
		if (y.current) {
			let e = v.current, t = e.indexOf(b.current);
			if (t === -1) {
				let t = e[x];
				!t || Fu(e, x, d) ? S(aE(e, d)) : b.current = t;
			} else t !== x && S(t);
			return;
		}
		y.current = !0;
		let t = Array.from(e.keys()), r = t.find((e) => e?.hasAttribute("data-composite-item-active")) ?? null, i = r ? e.get(r)?.index ?? -1 : -1;
		if (i !== -1) S(i);
		else if (Fu(t, x, d)) {
			let e = Pu(t, { disabledIndices: d });
			Au(t, e) || S(e);
		}
		pg(g.current, r, a, n);
	});
	G(() => {
		if (d == null || o != null || !y.current) return;
		let e = v.current;
		if (Fu(e, x, d)) {
			let t = Pu(e, { disabledIndices: d });
			Au(e, t) || S(t);
		}
	}, [
		d,
		o,
		x,
		v,
		S
	]);
	let w = W((e, t, n) => i ? i(e, t, n, v) : n), T = W((e) => {
		let o = e.key === "Home" || e.key === "End";
		if (!xg.has(e.key) || !l && o || oE(e, f) || !g.current) return;
		let s = a === "rtl", c = s ? vg : yg, p = s ? yg : vg, m = n === "vertical" ? _g : c, _ = n === "vertical" ? gg : p, y = rl(e.nativeEvent);
		if (y != null && fg(y) && !cS(y)) {
			let t = y.selectionStart, n = y.selectionEnd, r = y.value;
			if (t == null || e.shiftKey || t !== n || e.key !== _ && t < r.length || e.key !== m && t > 0) return;
		}
		let b = x, C = ju(v, d), T = Mu(v, d);
		r != null && (b = r({
			disabledIndices: d,
			elementsRef: v,
			event: e,
			highlightedIndex: x,
			loopFocus: t,
			maxIndex: T,
			minIndex: C,
			onLoop: w,
			orientation: n,
			rtl: s
		}));
		let E = n !== "vertical" && e.key === c || n !== "horizontal" && e.key === "ArrowDown", D = n !== "vertical" && e.key === p || n !== "horizontal" && e.key === "ArrowUp";
		l && (e.key === "Home" ? b = C : e.key === "End" && (b = T)), b === x && (E || D) && (t && b === T && E ? (b = C, i && (b = i(e, x, b, v))) : t && b === C && D ? (b = T, i && (b = i(e, x, b, v))) : b = Pu(v.current, {
			startingIndex: b,
			decrement: D,
			disabledIndices: d
		})), b !== x && !Au(v.current, b) && (u && e.stopPropagation(), (h || o || E || D) && e.preventDefault(), S(b, !0), queueMicrotask(() => {
			v.current[b]?.focus();
		}));
	});
	return {
		props: {
			ref: _,
			onFocus(e) {
				let t = g.current, n = rl(e.nativeEvent);
				t && n != null && fg(n) && n.setSelectionRange(0, n.value.length);
			},
			onKeyDown: T
		},
		highlightedIndex: x,
		onHighlightedIndexChange: S,
		elementsRef: v,
		onMapChange: C,
		relayKeyboardEvent: T
	};
}
function aE(e, t) {
	let n = -1;
	for (let r = 0; r < e.length; r += 1) {
		let i = e[r];
		if (i && !Fu(e, r, t)) {
			if (i.hasAttribute("data-composite-item-active")) return r;
			n === -1 && (n = r);
		}
	}
	return Math.max(n, 0);
}
function oE(e, t) {
	for (let n of Cg) if (!t.includes(n) && e.getModifierState(n)) return !0;
	return !1;
}
ai(), jx(), Ar(), xi(), Sy();
function sE(e) {
	let { render: t, className: n, style: r, refs: i = ri, props: a = ri, state: o = ii, stateAttributesMapping: s, highlightedIndex: c, onHighlightedIndexChange: l, orientation: u, grid: d, loopFocus: f, onLoop: p, enableHomeAndEndKeys: m, onMapChange: h, stopEventPropagation: g = !0, rootRef: _, disabledIndices: v, modifierKeys: y, highlightItemOnHover: b = !1, tag: x = "div", ...S } = e, { props: C, highlightedIndex: w, onHighlightedIndexChange: T, elementsRef: E, onMapChange: D, relayKeyboardEvent: O } = iE({
		grid: d,
		loopFocus: f,
		onLoop: p,
		orientation: u,
		highlightedIndex: c,
		onHighlightedIndexChange: l,
		rootRef: _,
		stopEventPropagation: g,
		enableHomeAndEndKeys: m,
		direction: yy(),
		disabledIndices: v,
		modifierKeys: y
	}), k = fi(x, e, {
		state: o,
		ref: i,
		props: [
			C,
			...a,
			S
		],
		stateAttributesMapping: s
	}), A = Z.useMemo(() => ({
		highlightedIndex: w,
		onHighlightedIndexChange: T,
		highlightItemOnHover: b,
		relayKeyboardEvent: O
	}), [
		w,
		T,
		b,
		O
	]);
	return /*#__PURE__*/ (0, X.jsx)(kr.Provider, {
		value: A,
		children: /*#__PURE__*/ (0, X.jsx)(Sx, {
			elementsRef: E,
			onMapChange: (e) => {
				h?.(e), D(e);
			},
			children: k
		})
	});
}
nr(), ar(), ai();
var cE = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { activateOnFocus: n = !1, className: r, loopFocus: i = !0, render: a, style: o, ...s } = e, { orientation: c, setTabMap: l, tabActivationDirection: u } = GT(), [d, f] = Z.useState(0), [p, m] = Z.useState(null), h = Z.useRef(/* @__PURE__ */ new Set()), g = Z.useRef(/* @__PURE__ */ new Set()), _ = Z.useRef(null);
	G(() => {
		if (typeof ResizeObserver > "u") return;
		let e = new ResizeObserver(() => {
			h.current.forEach((e) => {
				e();
			});
		});
		return _.current = e, p && e.observe(p), g.current.forEach((t) => {
			e.observe(t);
		}), () => {
			e.disconnect(), _.current = null;
		};
	}, [p]);
	let v = W((e) => (h.current.add(e), () => {
		h.current.delete(e);
	})), y = W((e) => (g.current.add(e), _.current?.observe(e), () => {
		g.current.delete(e), _.current?.unobserve(e);
	})), b = {
		orientation: c,
		tabActivationDirection: u
	}, x = {
		"aria-orientation": c === "vertical" ? "vertical" : void 0,
		role: "tablist"
	}, S = Z.useMemo(() => ({
		activateOnFocus: n,
		registerIndicatorUpdateListener: v,
		registerTabResizeObserverElement: y,
		tabsListElement: p
	}), [
		n,
		v,
		y,
		p
	]);
	return /*#__PURE__*/ (0, X.jsx)(QT.Provider, {
		value: S,
		children: /*#__PURE__*/ (0, X.jsx)(sE, {
			render: a,
			className: r,
			style: o,
			state: b,
			refs: [t, m],
			props: [x, s],
			stateAttributesMapping: qT,
			highlightedIndex: d,
			enableHomeAndEndKeys: !0,
			loopFocus: i,
			orientation: c,
			onHighlightedIndexChange: f,
			onMapChange: l,
			disabledIndices: ri
		})
	});
});
Mi(), so();
function lE({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(JT, {
		"data-slot": "tabs",
		"data-orientation": t,
		className: J("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", e),
		...n
	});
}
var uE = ji("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-muted",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function dE({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(cE, {
		"data-slot": "tabs-list",
		"data-variant": t,
		className: J(uE({ variant: t }), e),
		...n
	});
}
function fE({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(eE, {
		"data-slot": "tabs-trigger",
		className: J("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-[active]:shadow-sm group-data-[variant=line]/tabs-list:data-[active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent", "data-[active]:bg-background data-[active]:text-foreground dark:data-[active]:border-input dark:data-[active]:bg-input/30 dark:data-[active]:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[active]:after:opacity-100", e),
		...t
	});
}
function pE({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(rE, {
		"data-slot": "tabs-content",
		className: J("d3-tabs-panel flex-1 text-sm outline-none", e),
		...t
	});
}
vn(), po(), Y_(), Vv(), _T();
function mE({ initialMessage: e = "", onSubmit: t, onGuest: n }) {
	let [r, i] = (0, Z.useState)("login"), [a, o] = (0, Z.useState)(""), [s, c] = (0, Z.useState)(""), [l, u] = (0, Z.useState)(""), [d, f] = (0, Z.useState)(e), [p, m] = (0, Z.useState)(!1);
	return (0, Z.useEffect)(() => f(e), [e]), /* @__PURE__ */ (0, X.jsx)("main", {
		className: "fixed inset-0 z-[2147483647] grid min-h-svh place-items-center overflow-y-auto bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, X.jsxs)(RT, {
			className: "w-full max-w-[380px] animate-ui-enter border-border bg-card shadow-none",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(zT, {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, X.jsx)("img", {
							className: "size-10 object-contain",
							src: "https://organizeon.com.br/d3/assets/organizeon-icon.png",
							alt: ""
						}), /* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("p", {
							className: "text-sm font-semibold",
							children: "OrganizeOn"
						}), /* @__PURE__ */ (0, X.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Cliente"
						})] })]
					}), /* @__PURE__ */ (0, X.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, X.jsx)(BT, {
							className: "text-xl",
							children: r === "register" ? "Criar conta" : r === "code" ? "Entrar com código" : "Entrar no OrganizeOn"
						}), /* @__PURE__ */ (0, X.jsx)(VT, { children: "Autentique-se para acessar seus jogos e configurações." })]
					})]
				}),
				/* @__PURE__ */ (0, X.jsxs)(HT, { children: [/* @__PURE__ */ (0, X.jsxs)(lE, {
					value: r,
					onValueChange: (e) => {
						i(e), f("");
					},
					children: [/* @__PURE__ */ (0, X.jsxs)(dE, {
						className: "grid h-9 w-full grid-cols-3 bg-muted/70",
						children: [
							/* @__PURE__ */ (0, X.jsx)(fE, {
								value: "login",
								children: "Entrar"
							}),
							/* @__PURE__ */ (0, X.jsx)(fE, {
								value: "register",
								children: "Criar conta"
							}),
							/* @__PURE__ */ (0, X.jsx)(fE, {
								value: "code",
								children: "Código"
							})
						]
					}), /* @__PURE__ */ (0, X.jsx)(pE, {
						value: r,
						className: "mt-4",
						children: /* @__PURE__ */ (0, X.jsxs)("form", {
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
								r === "code" ? /* @__PURE__ */ (0, X.jsxs)("label", {
									className: "grid gap-1.5 text-sm font-medium",
									htmlFor: "organizeon-code",
									children: ["Código de login", /* @__PURE__ */ (0, X.jsx)(zv, {
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
								}) : /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsxs)("label", {
									className: "grid gap-1.5 text-sm font-medium",
									htmlFor: "organizeon-username",
									children: ["Usuário", /* @__PURE__ */ (0, X.jsx)(zv, {
										id: "organizeon-username",
										name: "username",
										autoComplete: "username",
										minLength: 3,
										maxLength: 32,
										required: !0,
										value: a,
										onChange: (e) => o(e.target.value)
									})]
								}), /* @__PURE__ */ (0, X.jsxs)("label", {
									className: "grid gap-1.5 text-sm font-medium",
									htmlFor: "organizeon-password",
									children: ["Senha", /* @__PURE__ */ (0, X.jsx)(zv, {
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
								r === "register" && /* @__PURE__ */ (0, X.jsx)("p", {
									className: "text-xs leading-relaxed text-muted-foreground",
									children: "Contas novas começam sem permissões administrativas."
								}),
								d && /* @__PURE__ */ (0, X.jsx)("p", {
									className: "rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
									role: "alert",
									children: d
								}),
								/* @__PURE__ */ (0, X.jsx)(Y, {
									type: "submit",
									className: "mt-1 h-10 w-full",
									disabled: p || (r === "code" ? !l : !a || !s),
									"aria-busy": p,
									children: p ? "Autenticando…" : r === "register" ? "Criar conta" : "Entrar"
								})
							]
						})
					})]
				}), /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "mt-4 border-t pt-4",
					children: [/* @__PURE__ */ (0, X.jsx)(Y, {
						variant: "outline",
						className: "w-full",
						onClick: () => void n(),
						disabled: p,
						children: "Continuar como convidado"
					}), /* @__PURE__ */ (0, X.jsx)("p", {
						className: "mt-2 text-center text-xs text-muted-foreground",
						children: "Acesso convidado com recursos limitados"
					})]
				})] }),
				/* @__PURE__ */ (0, X.jsxs)(UT, {
					className: "gap-2 border-t border-border pt-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, X.jsx)(zt, { className: "size-4 shrink-0" }), "Acesse com sua conta OrganizeOn."]
				})
			]
		})
	});
}
function hE(e) {
	return e < 1024 ? `${e} B` : e < 1024 ** 2 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1024 ** 2).toFixed(1)} MB`;
}
function gE(e) {
	let [t, n] = (0, Z.useState)(null), [r, i] = (0, Z.useState)([]), [a, o] = (0, Z.useState)(""), [s, c] = (0, Z.useState)(null), [l, u] = (0, Z.useState)(""), [d, f] = (0, Z.useState)(null), [p, m] = (0, Z.useState)("backup"), h = async () => {
		u("");
		try {
			n(await e.getStatus());
		} catch (e) {
			u(e instanceof Error ? e.message : "Falha ao consultar o backup.");
		}
	};
	(0, Z.useEffect)(() => {
		h(), e.getGames().then(i).catch(() => u("Não foi possível carregar a lista de jogos."));
	}, []);
	let g = async (e, t) => {
		c(e), u("");
		try {
			await t(), await h(), Ro.success("Ação concluída");
		} catch (e) {
			u(e instanceof Error ? e.message : "A ação falhou.");
		} finally {
			c(null), f(null);
		}
	}, _ = t?.limit || 268435456;
	return /* @__PURE__ */ (0, X.jsx)("main", {
		className: "fixed inset-0 z-[2147483646] overflow-y-auto bg-background px-4 pb-8 pt-[max(16px,env(safe-area-inset-top))] text-foreground sm:px-6",
		children: /* @__PURE__ */ (0, X.jsxs)("div", {
			className: "mx-auto w-full max-w-3xl",
			children: [
				/* @__PURE__ */ (0, X.jsxs)("header", {
					className: "mb-5 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, X.jsx)(Y, {
						variant: "outline",
						size: "icon",
						"aria-label": "Voltar",
						onClick: e.onClose,
						children: /* @__PURE__ */ (0, X.jsx)(re, {})
					}), /* @__PURE__ */ (0, X.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, X.jsx)("h1", {
							className: "text-xl font-semibold tracking-tight",
							children: "Dados"
						}), /* @__PURE__ */ (0, X.jsxs)("p", {
							className: "truncate text-sm text-muted-foreground",
							children: ["Conta ", e.username]
						})]
					})]
				}),
				/* @__PURE__ */ (0, X.jsxs)(lE, {
					value: p,
					onValueChange: m,
					children: [
						/* @__PURE__ */ (0, X.jsxs)(dE, {
							className: "grid h-9 w-full grid-cols-3 sm:w-auto sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, X.jsx)(fE, {
									value: "backup",
									children: "Backup"
								}),
								/* @__PURE__ */ (0, X.jsx)(fE, {
									value: "progress",
									children: "Progressos"
								}),
								/* @__PURE__ */ (0, X.jsx)(fE, {
									value: "preferences",
									children: "Preferências"
								})
							]
						}),
						/* @__PURE__ */ (0, X.jsx)(pE, {
							value: "backup",
							className: "mt-4",
							children: /* @__PURE__ */ (0, X.jsxs)(RT, { children: [/* @__PURE__ */ (0, X.jsxs)(zT, {
								className: "flex-row items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsxs)(BT, {
									className: "flex items-center gap-2 text-base",
									children: [/* @__PURE__ */ (0, X.jsx)(he, { className: "size-4 text-muted-foreground" }), "Backup na nuvem"]
								}), /* @__PURE__ */ (0, X.jsx)(VT, {
									className: "mt-1",
									children: "Sincronize preferências e dados da conta."
								})] }), /* @__PURE__ */ (0, X.jsx)(FT, {
									variant: t?.enabled ? "default" : "secondary",
									children: t ? t.enabled ? "Ativo" : "Desativado" : "Consultando"
								})]
							}), /* @__PURE__ */ (0, X.jsxs)(HT, {
								className: "grid gap-4",
								children: [/* @__PURE__ */ (0, X.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3 border-t pt-4 text-sm",
									children: [/* @__PURE__ */ (0, X.jsx)("span", {
										className: "text-muted-foreground",
										children: "Armazenamento utilizado"
									}), /* @__PURE__ */ (0, X.jsxs)("strong", {
										className: "font-mono text-xs sm:text-sm",
										children: [
											t ? hE(t.size || 0) : "—",
											" / ",
											hE(_)
										]
									})]
								}), /* @__PURE__ */ (0, X.jsxs)("div", {
									className: "grid grid-cols-1 gap-2 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, X.jsx)(Y, {
											onClick: () => void g("toggle", () => e.toggleBackup(!t?.enabled)),
											disabled: s !== null || !t,
											children: s === "toggle" ? "Atualizando…" : t?.enabled ? "Desativar backup" : "Ativar backup"
										}),
										/* @__PURE__ */ (0, X.jsx)(Y, {
											variant: "outline",
											onClick: () => void g("save", e.saveBackup),
											disabled: s !== null,
											children: s === "save" ? "Salvando…" : "Salvar agora"
										}),
										/* @__PURE__ */ (0, X.jsx)(Y, {
											variant: "outline",
											onClick: () => void g("restore", e.restoreBackup),
											disabled: s !== null,
											children: s === "restore" ? "Restaurando…" : "Restaurar backup"
										})
									]
								})]
							})] })
						}),
						/* @__PURE__ */ (0, X.jsx)(pE, {
							value: "progress",
							className: "mt-4",
							children: /* @__PURE__ */ (0, X.jsxs)(RT, { children: [/* @__PURE__ */ (0, X.jsxs)(zT, { children: [/* @__PURE__ */ (0, X.jsxs)(BT, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, X.jsx)(ze, { className: "size-4 text-muted-foreground" }), "Progresso dos jogos"]
							}), /* @__PURE__ */ (0, X.jsx)(VT, { children: "Os arquivos dos jogos continuam no navegador. Estas ações removem apenas os saves." })] }), /* @__PURE__ */ (0, X.jsxs)(HT, {
								className: "grid gap-3",
								children: [
									/* @__PURE__ */ (0, X.jsx)(Y, {
										variant: "destructive",
										className: "w-full sm:w-fit",
										onClick: () => f("clear-all"),
										children: "Apagar todos os progressos"
									}),
									/* @__PURE__ */ (0, X.jsxs)("div", {
										className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]",
										children: [/* @__PURE__ */ (0, X.jsxs)(gT, {
											value: a,
											onValueChange: (e) => o(e ?? ""),
											children: [/* @__PURE__ */ (0, X.jsx)(uT, {
												className: "w-full",
												children: /* @__PURE__ */ (0, X.jsx)(lT, { placeholder: "Escolha um jogo" })
											}), /* @__PURE__ */ (0, X.jsx)(dT, { children: r.map((e) => /* @__PURE__ */ (0, X.jsxs)(fT, {
												value: e.id,
												children: [
													e.name,
													" — ",
													e.id
												]
											}, e.id)) })]
										}), /* @__PURE__ */ (0, X.jsx)(Y, {
											variant: "destructive",
											disabled: !a,
											onClick: () => f("clear-game"),
											children: "Apagar jogo"
										})]
									}),
									/* @__PURE__ */ (0, X.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "O identificador exibido depois do nome é o jogo selecionado."
									})
								]
							})] })
						}),
						/* @__PURE__ */ (0, X.jsx)(pE, {
							value: "preferences",
							className: "mt-4",
							children: /* @__PURE__ */ (0, X.jsxs)(RT, { children: [/* @__PURE__ */ (0, X.jsxs)(zT, { children: [/* @__PURE__ */ (0, X.jsxs)(BT, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, X.jsx)(It, { className: "size-4 text-muted-foreground" }), "Preferências locais"]
							}), /* @__PURE__ */ (0, X.jsx)(VT, { children: "Tema, proxy, identidade do navegador e teclas ficam salvos neste dispositivo." })] }), /* @__PURE__ */ (0, X.jsx)(HT, { children: /* @__PURE__ */ (0, X.jsx)(Y, {
								variant: "destructive",
								onClick: () => f("clear-preferences"),
								children: "Apagar preferências locais"
							}) })] })
						})
					]
				}),
				l && /* @__PURE__ */ (0, X.jsx)("p", {
					className: "mt-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
					role: "alert",
					children: l
				}),
				/* @__PURE__ */ (0, X.jsx)(B_, {
					open: d !== null,
					onOpenChange: (e) => !e && f(null),
					children: /* @__PURE__ */ (0, X.jsxs)(U_, { children: [/* @__PURE__ */ (0, X.jsxs)(W_, { children: [/* @__PURE__ */ (0, X.jsx)(K_, { children: "Confirmar exclusão" }), /* @__PURE__ */ (0, X.jsx)(q_, { children: d === "clear-all" ? "Apagar todos os saves de jogos deste perfil?" : d === "clear-game" ? `Apagar o save de ${a}?` : "Apagar as preferências locais deste dispositivo?" })] }), /* @__PURE__ */ (0, X.jsxs)(G_, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
						variant: "outline",
						onClick: () => f(null),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, X.jsx)(Y, {
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
function _E(e) {
	let [t, n] = (0, Z.useState)(e.currentId);
	return /* @__PURE__ */ (0, X.jsx)(B_, {
		open: !0,
		onOpenChange: (t) => {
			t || e.onClose();
		},
		children: /* @__PURE__ */ (0, X.jsxs)(U_, {
			className: "max-h-[min(86svh,760px)] overflow-y-auto sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(W_, { children: [/* @__PURE__ */ (0, X.jsx)(K_, { children: "Servidor proxy" }), /* @__PURE__ */ (0, X.jsxs)(q_, { children: [e.guestMode ? "Convidados usam apenas servidores públicos externos." : "Escolha o servidor WISP usado pelo cliente.", " A medição representa a abertura do WebSocket neste dispositivo."] })] }),
				/* @__PURE__ */ (0, X.jsx)("div", {
					className: "grid gap-2",
					role: "radiogroup",
					"aria-label": "Servidor proxy",
					children: e.options.map((r) => {
						let i = e.latency[r.id] ?? {
							label: "Medindo conexão…",
							state: "pending"
						}, a = t === r.id;
						return /* @__PURE__ */ (0, X.jsxs)("button", {
							type: "button",
							role: "radio",
							"aria-checked": a,
							"data-proxy-id": r.id,
							onClick: () => n(r.id),
							className: `group flex min-h-16 w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${a ? "border-foreground bg-accent" : "border-border bg-background hover:bg-muted"}`,
							children: [
								/* @__PURE__ */ (0, X.jsx)("span", {
									className: `mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border ${a ? "border-foreground" : "border-muted-foreground/50"}`,
									children: a && /* @__PURE__ */ (0, X.jsx)("span", { className: "size-2 rounded-full bg-foreground" })
								}),
								/* @__PURE__ */ (0, X.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, X.jsxs)("span", {
											className: "flex items-center gap-2 font-medium",
											children: [r.name, r.beta && /* @__PURE__ */ (0, X.jsx)(FT, {
												variant: "outline",
												className: "text-[10px]",
												children: "BETA"
											})]
										}),
										/* @__PURE__ */ (0, X.jsx)("span", {
											className: "mt-1 block text-sm text-muted-foreground",
											children: r.description
										}),
										/* @__PURE__ */ (0, X.jsxs)("span", {
											className: `connection ${i.state} mt-2 flex items-center gap-1.5 text-xs text-muted-foreground`,
											children: [/* @__PURE__ */ (0, X.jsx)(Gt, { className: `size-3 ${i.state === "online" ? "text-emerald-500" : i.state === "offline" ? "text-destructive" : ""}` }), i.label]
										})
									]
								}),
								a && /* @__PURE__ */ (0, X.jsx)(ie, { className: "size-4 text-foreground" })
							]
						}, r.id);
					})
				}),
				/* @__PURE__ */ (0, X.jsx)("p", {
					className: "rounded-md border bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground",
					children: "Servidores beta são operados por terceiros. O tráfego de navegação pode não passar pelo backend OrganizeOn."
				}),
				/* @__PURE__ */ (0, X.jsxs)(G_, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
					variant: "outline",
					onClick: e.onClose,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, X.jsx)(Y, {
					onClick: () => e.onApply(t),
					children: "Aplicar e reiniciar"
				})] })
			]
		})
	});
}
function vE(e) {
	let { type: t, ...n } = e, r = (0, Z.useMemo)(() => t === "login" ? /* @__PURE__ */ (0, X.jsx)(mE, { ...n }) : t === "data" ? /* @__PURE__ */ (0, X.jsx)(gE, { ...n }) : t === "proxy" ? /* @__PURE__ */ (0, X.jsx)(_E, { ...n }) : /* @__PURE__ */ (0, X.jsx)(LT, { ...n }), [t, n]);
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: t === "account" ? "organizeon-ui organizeon-overlay-root dark text-foreground" : "organizeon-ui dark min-h-svh bg-background text-foreground",
		children: r
	});
}
vn(), po();
function yE({ game: e }) {
	let t = e.type === "flash" ? "Flash · Ruffle" : e.type === "external-download" ? "HTML offline" : e.type === "remote" ? "Multiplayer" : "HTML5";
	return /* @__PURE__ */ (0, X.jsxs)(RT, {
		className: "h-full overflow-hidden rounded-lg border-border bg-card p-0 shadow-none transition-colors hover:border-zinc-600",
		children: [/* @__PURE__ */ (0, X.jsx)("img", {
			className: "aspect-[16/10] w-full bg-muted object-cover",
			src: e.cover,
			alt: `Capa de ${e.name}`,
			loading: "lazy"
		}), /* @__PURE__ */ (0, X.jsxs)(HT, {
			className: "grid gap-3 p-3.5 sm:p-4",
			children: [
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "flex flex-wrap gap-1.5",
					children: [
						/* @__PURE__ */ (0, X.jsxs)(FT, {
							variant: "secondary",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, X.jsx)(ze, { className: "size-3" }), t]
						}),
						e.platforms.map((e) => /* @__PURE__ */ (0, X.jsx)(FT, {
							variant: "outline",
							children: e
						}, e)),
						e.mobileWarning && /* @__PURE__ */ (0, X.jsx)(FT, {
							variant: "outline",
							children: "Melhor com teclado"
						}),
						e.trending && /* @__PURE__ */ (0, X.jsxs)(FT, {
							variant: "outline",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, X.jsx)(Ne, { className: "size-3" }), "Em alta"]
						})
					]
				}),
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "flex min-w-0 items-start gap-2",
					children: [/* @__PURE__ */ (0, X.jsx)("h2", {
						className: "min-w-0 flex-1 text-base font-semibold leading-5 tracking-tight",
						children: e.name
					}), /* @__PURE__ */ (0, X.jsx)(FT, {
						variant: "outline",
						className: "shrink-0 font-mono text-[10px]",
						children: e.sizeLabel
					})]
				}),
				/* @__PURE__ */ (0, X.jsx)("p", {
					className: "min-h-10 text-xs leading-relaxed text-muted-foreground",
					children: e.description
				}),
				/* @__PURE__ */ (0, X.jsx)("p", {
					className: "min-h-4 text-[10px] leading-relaxed text-muted-foreground",
					children: e.attribution
				}),
				/* @__PURE__ */ (0, X.jsx)("div", {
					className: "game-stats flex min-h-4 flex-wrap gap-3 text-[10px] text-muted-foreground",
					"aria-label": "Estatísticas do jogo"
				}),
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, X.jsxs)(Y, {
							className: "action min-w-0 flex-1",
							type: "button",
							disabled: !0,
							onClick: e.onAction,
							children: [e.type === "external-download" ? /* @__PURE__ */ (0, X.jsx)(xe, {}) : e.type === "remote" ? /* @__PURE__ */ (0, X.jsx)(wt, {}) : /* @__PURE__ */ (0, X.jsx)(xt, {}), /* @__PURE__ */ (0, X.jsx)("span", {
								"data-action-label": !0,
								children: "Verificando…"
							})]
						}),
						e.relayUrl && /* @__PURE__ */ (0, X.jsx)(Y, {
							className: "credits",
							variant: "outline",
							type: "button",
							title: e.relaySupport || "Relay multiplayer",
							onClick: e.onRelay,
							children: "Copiar relay"
						}),
						e.hasCredits && /* @__PURE__ */ (0, X.jsxs)(Y, {
							className: "credits",
							variant: "outline",
							type: "button",
							onClick: e.onCredits,
							children: [/* @__PURE__ */ (0, X.jsx)(De, {}), "Créditos"]
						}),
						/* @__PURE__ */ (0, X.jsx)(Y, {
							className: "remove",
							variant: "destructive",
							size: "icon",
							type: "button",
							title: "Apagar jogo do cache",
							"aria-label": `Apagar ${e.name} do cache`,
							hidden: !0,
							onClick: e.onRemove,
							children: /* @__PURE__ */ (0, X.jsx)(en, {})
						})
					]
				}),
				/* @__PURE__ */ (0, X.jsx)("div", {
					className: "progress h-1.5 overflow-hidden rounded-full bg-muted",
					hidden: !0,
					children: /* @__PURE__ */ (0, X.jsx)("span", { className: "block h-full w-0 rounded-full bg-primary transition-[width] duration-100" })
				})
			]
		})]
	});
}
vn(), po(), Vv();
function bE({ count: e, categories: t, onBack: n, onQueryChange: r, onFilterChange: i }) {
	let [a, o] = (0, Z.useState)("all"), s = [
		{
			id: "all",
			label: "Todos",
			icon: ze
		},
		{
			id: "trending",
			label: "Em alta",
			icon: Ne
		},
		{
			id: "flash",
			label: "Flash",
			icon: gn
		},
		{
			id: "pc",
			label: "PC",
			icon: null
		},
		{
			id: "mobile",
			label: "Celular",
			icon: Jt
		},
		...t.map((e) => ({
			id: `category:${e}`,
			label: e,
			icon: null
		}))
	];
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "mx-auto grid min-w-0 w-full max-w-[1180px] gap-5 px-4 pb-5 pt-5 sm:px-6 sm:pt-7",
		children: [/* @__PURE__ */ (0, X.jsxs)("header", {
			className: "flex min-w-0 flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, X.jsx)(Y, {
					variant: "outline",
					size: "icon",
					"aria-label": "Voltar ao OrganizeOn",
					onClick: n,
					children: /* @__PURE__ */ (0, X.jsx)(re, {})
				}),
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, X.jsx)("h1", {
						className: "text-xl font-semibold tracking-tight",
						children: "Jogos"
					}), /* @__PURE__ */ (0, X.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: e ? `${e.toLocaleString("pt-BR")} jogos · baixe uma vez e jogue do cache` : "Carregando catálogo…"
					})]
				}),
				/* @__PURE__ */ (0, X.jsxs)("label", {
					className: "relative w-full sm:w-72",
					children: [/* @__PURE__ */ (0, X.jsx)(Nt, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, X.jsx)(zv, {
						className: "pl-9",
						type: "search",
						"aria-label": "Pesquisar jogos",
						placeholder: `Pesquisar em ${e || "…"} jogos`,
						onChange: (e) => r(e.target.value)
					})]
				})
			]
		}), /* @__PURE__ */ (0, X.jsx)(lE, {
			className: "min-w-0 w-full overflow-hidden",
			value: a,
			onValueChange: (e) => {
				let t = e || "all";
				o(t), i(t);
			},
			children: /* @__PURE__ */ (0, X.jsx)("div", {
				role: "region",
				"aria-label": "Categorias de jogos",
				tabIndex: 0,
				className: "min-w-0 w-full overflow-x-auto overscroll-x-contain touch-pan-x pb-1",
				children: /* @__PURE__ */ (0, X.jsx)(dE, {
					"aria-label": "Filtrar jogos",
					className: "h-auto w-max max-w-none flex-nowrap justify-start gap-1 bg-transparent p-0",
					children: s.map(({ id: e, label: t, icon: n }) => /* @__PURE__ */ (0, X.jsxs)(fE, {
						value: e,
						className: "min-h-8 flex-none gap-1.5 border border-transparent px-2.5 text-xs data-[active]:border-border data-[active]:bg-muted data-[active]:text-foreground",
						children: [n && /* @__PURE__ */ (0, X.jsx)(n, { className: "size-3.5" }), t]
					}, e))
				})
			})
		})]
	});
}
vn(), po(), Y_();
function xE({ title: e, description: t, confirmLabel: n = "Continuar", onCancel: r, onConfirm: i }) {
	return /* @__PURE__ */ (0, X.jsx)(B_, {
		open: !0,
		onOpenChange: (e) => !e && r(),
		children: /* @__PURE__ */ (0, X.jsxs)(U_, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, X.jsxs)(W_, { children: [
				/* @__PURE__ */ (0, X.jsx)("div", {
					className: "grid size-9 place-items-center rounded-md border bg-muted",
					children: /* @__PURE__ */ (0, X.jsx)(rn, { className: "size-4 text-muted-foreground" })
				}),
				/* @__PURE__ */ (0, X.jsx)(K_, { children: e }),
				/* @__PURE__ */ (0, X.jsx)(q_, { children: t })
			] }), /* @__PURE__ */ (0, X.jsxs)(G_, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
				variant: "outline",
				onClick: r,
				children: "Cancelar"
			}), /* @__PURE__ */ (0, X.jsx)(Y, {
				onClick: i,
				children: n
			})] })]
		})
	});
}
function SE({ game: e, onClose: t }) {
	return /* @__PURE__ */ (0, X.jsx)(B_, {
		open: !0,
		onOpenChange: (e) => !e && t(),
		children: /* @__PURE__ */ (0, X.jsxs)(U_, {
			className: "max-h-[85svh] overflow-y-auto sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(W_, { children: [/* @__PURE__ */ (0, X.jsxs)(K_, { children: ["Créditos · ", e.name] }), /* @__PURE__ */ (0, X.jsx)(q_, { children: "Créditos e licença deste jogo." })] }),
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "grid gap-2 text-sm text-muted-foreground",
					children: [
						e.attribution && /* @__PURE__ */ (0, X.jsx)("p", { children: e.attribution }),
						e.copyright && /* @__PURE__ */ (0, X.jsx)("p", { children: e.copyright }),
						e.license && /* @__PURE__ */ (0, X.jsxs)("p", { children: ["Licença: ", e.license] }),
						e.source && /* @__PURE__ */ (0, X.jsx)("p", { children: /* @__PURE__ */ (0, X.jsx)("a", {
							className: "text-foreground underline underline-offset-4",
							href: e.source,
							target: "_blank",
							rel: "noopener noreferrer",
							children: e.sourceLabel || "Abrir código-fonte e licença"
						}) })
					]
				}),
				/* @__PURE__ */ (0, X.jsx)(G_, { children: /* @__PURE__ */ (0, X.jsx)(Y, {
					onClick: t,
					children: "Fechar"
				}) })
			]
		})
	});
}
function CE({ name: e, definitions: t, selectedKeys: n, defaultKeys: r, isTetris: i, initialLeftHanded: a, onClose: o, onSave: s, onFullscreen: c }) {
	let [l, u] = (0, Z.useState)(() => new Set(n)), [d, f] = (0, Z.useState)(a);
	function p(e, t) {
		u((n) => {
			let r = new Set(n);
			return t ? r.add(e) : r.delete(e), r;
		});
	}
	function m() {
		u(new Set(r)), f(!1);
	}
	return /* @__PURE__ */ (0, X.jsx)(B_, {
		open: !0,
		onOpenChange: (e) => !e && o(),
		children: /* @__PURE__ */ (0, X.jsxs)(U_, {
			className: "max-h-[min(85svh,720px)] overflow-y-auto sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(W_, { children: [/* @__PURE__ */ (0, X.jsxs)(K_, { children: ["Teclas · ", e] }), /* @__PURE__ */ (0, X.jsx)(q_, { children: "Ative as teclas usadas pelo jogo. A seleção fica salva neste aparelho." })] }),
				/* @__PURE__ */ (0, X.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, X.jsx)("legend", {
					className: "mb-2 text-sm font-medium",
					children: "Teclas disponíveis"
				}), /* @__PURE__ */ (0, X.jsx)("div", {
					className: "grid grid-cols-3 gap-2 sm:grid-cols-4",
					children: t.map((e) => /* @__PURE__ */ (0, X.jsxs)("label", {
						className: "flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm transition-colors hover:bg-muted",
						children: [/* @__PURE__ */ (0, X.jsx)("input", {
							type: "checkbox",
							className: "size-4 accent-primary",
							checked: l.has(e.code) || l.has(e.label) || !!(e.key && l.has(e.key)),
							onChange: (t) => p(e.code, t.target.checked)
						}), /* @__PURE__ */ (0, X.jsx)("span", { children: e.label })]
					}, e.code))
				})] }),
				i && /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "grid gap-2 border-t pt-3",
					children: [
						/* @__PURE__ */ (0, X.jsx)("p", {
							className: "text-sm font-medium",
							children: "Opções do Tetris"
						}),
						/* @__PURE__ */ (0, X.jsxs)("label", {
							className: "flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm",
							children: [/* @__PURE__ */ (0, X.jsx)("input", {
								type: "checkbox",
								className: "size-4 accent-primary",
								checked: d,
								onChange: (e) => f(e.target.checked)
							}), /* @__PURE__ */ (0, X.jsx)("span", { children: "Sou canhoto (ações à esquerda)" })]
						}),
						/* @__PURE__ */ (0, X.jsxs)(Y, {
							variant: "outline",
							onClick: c,
							children: [/* @__PURE__ */ (0, X.jsx)(ot, {}), "Tela cheia"]
						})
					]
				}),
				/* @__PURE__ */ (0, X.jsxs)(G_, {
					className: "flex-col-reverse sm:flex-row",
					children: [/* @__PURE__ */ (0, X.jsxs)(Y, {
						type: "button",
						variant: "outline",
						onClick: m,
						children: [/* @__PURE__ */ (0, X.jsx)(At, {}), "Restaurar padrão"]
					}), /* @__PURE__ */ (0, X.jsx)(Y, {
						type: "button",
						onClick: () => s([...l], d),
						children: "Salvar"
					})]
				})
			]
		})
	});
}
vn(), po(), _T();
function wE({ title: e, description: t, label: n, value: r, options: i, applyLabel: a = "Aplicar", onApply: o }) {
	let [s, c] = (0, Z.useState)(r), l = s !== r, u = i.find((e) => e.value === s)?.description;
	return /* @__PURE__ */ (0, X.jsxs)(RT, {
		className: "w-full animate-ui-enter",
		children: [/* @__PURE__ */ (0, X.jsxs)(zT, {
			className: "gap-1.5 pb-0 sm:flex sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, X.jsx)(BT, { children: e }), /* @__PURE__ */ (0, X.jsx)(VT, {
					className: "mt-1 max-w-3xl leading-relaxed",
					children: t
				})]
			}), /* @__PURE__ */ (0, X.jsxs)("div", {
				className: "grid w-full gap-2 sm:w-auto sm:min-w-52 sm:grid-cols-[minmax(9rem,1fr)_auto]",
				children: [/* @__PURE__ */ (0, X.jsxs)(gT, {
					value: s,
					onValueChange: (e) => e && c(e),
					children: [/* @__PURE__ */ (0, X.jsx)(uT, {
						"aria-label": n,
						className: "h-9 w-full",
						children: /* @__PURE__ */ (0, X.jsx)(lT, {})
					}), /* @__PURE__ */ (0, X.jsx)(dT, { children: i.map((e) => /* @__PURE__ */ (0, X.jsx)(fT, {
						value: e.value,
						children: e.label
					}, e.value)) })]
				}), /* @__PURE__ */ (0, X.jsxs)(Y, {
					size: "sm",
					disabled: !l,
					onClick: () => o(s),
					children: [l ? /* @__PURE__ */ (0, X.jsx)(ie, { "data-icon": "inline-start" }) : null, a]
				})]
			})]
		}), u ? /* @__PURE__ */ (0, X.jsx)(HT, {
			className: "pt-2 text-xs text-muted-foreground",
			children: u
		}) : null]
	});
}
vn(), po(), Vv();
function TE({ onSubmit: e }) {
	let [t, n] = (0, Z.useState)(""), [r, i] = (0, Z.useState)(""), [a, o] = (0, Z.useState)(""), [s, c] = (0, Z.useState)(!1);
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
	return /* @__PURE__ */ (0, X.jsx)("main", {
		className: "grid min-h-svh place-items-center px-4 py-10",
		children: /* @__PURE__ */ (0, X.jsxs)(RT, {
			className: "w-full max-w-[380px] border-border bg-card shadow-none animate-ui-enter",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(zT, {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, X.jsx)("img", {
							className: "size-10 object-contain",
							src: "https://organizeon.com.br/d3/assets/organizeon-icon.png",
							alt: ""
						}), /* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsxs)("p", {
							className: "text-sm font-semibold",
							children: ["OrganizeOn ", /* @__PURE__ */ (0, X.jsx)("span", {
								className: "font-normal text-muted-foreground",
								children: "D2"
							})]
						}), /* @__PURE__ */ (0, X.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Painel de arquivos"
						})] })]
					}), /* @__PURE__ */ (0, X.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, X.jsx)(BT, {
							className: "text-xl",
							children: "Entrar no painel"
						}), /* @__PURE__ */ (0, X.jsx)(VT, { children: "Autentique-se para acessar o conteúdo do Endpoint 2." })]
					})]
				}),
				/* @__PURE__ */ (0, X.jsx)(HT, { children: /* @__PURE__ */ (0, X.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: (e) => void l(e),
					children: [
						/* @__PURE__ */ (0, X.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Usuário", /* @__PURE__ */ (0, X.jsx)(zv, {
								autoComplete: "username",
								value: t,
								onChange: (e) => n(e.target.value),
								required: !0,
								disabled: s
							})]
						}),
						/* @__PURE__ */ (0, X.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Senha", /* @__PURE__ */ (0, X.jsx)(zv, {
								type: "password",
								autoComplete: "current-password",
								value: r,
								onChange: (e) => i(e.target.value),
								required: !0,
								disabled: s
							})]
						}),
						a && /* @__PURE__ */ (0, X.jsx)("p", {
							role: "alert",
							className: "text-sm text-destructive",
							children: a
						}),
						/* @__PURE__ */ (0, X.jsxs)(Y, {
							type: "submit",
							className: "h-10 w-full",
							disabled: s || !t || !r,
							children: [s && /* @__PURE__ */ (0, X.jsx)(et, { className: "animate-spin" }), s ? "Entrando…" : "Entrar"]
						})
					]
				}) }),
				/* @__PURE__ */ (0, X.jsxs)(UT, {
					className: "gap-2 border-t border-border pt-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, X.jsx)(zt, { className: "size-4" }), "Acesse com sua conta OrganizeOn."]
				})
			]
		})
	});
}
// src/hooks/use-service-theme.ts
function EE(e) {
	let t = (0, Z.useRef)(null), [n, r] = (0, Z.useState)(() => {
		try {
			return localStorage.getItem(e) === "light" ? "light" : "dark";
		} catch {
			return "dark";
		}
	});
	return (0, Z.useLayoutEffect)(() => {
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
// src/components/layout/rotating-icon.tsx
function DE({ icon: e, active: t }) {
	let [n, r] = (0, Z.useState)(t);
	return (0, Z.useEffect)(() => {
		t && r(!0);
	}, [t]), /* @__PURE__ */ (0, X.jsx)(e, {
		"aria-hidden": "true",
		className: n ? "motion-safe:animate-spin" : void 0,
		onAnimationIteration: () => {
			t || r(!1);
		}
	});
}
vn(), po();
function OE() {
	let { setOpenMobile: e } = pb();
	return /* @__PURE__ */ (0, X.jsx)(wb, { children: /* @__PURE__ */ (0, X.jsx)(Tb, { children: /* @__PURE__ */ (0, X.jsxs)(Db, {
		isActive: !0,
		tooltip: "Meus arquivos",
		onClick: () => e(!1),
		children: [/* @__PURE__ */ (0, X.jsx)(Ae, {}), /* @__PURE__ */ (0, X.jsx)("span", { children: "Meus arquivos" })]
	}) }) });
}
function kE({ children: e, username: t, role: n, logout: r, refresh: i, refreshing: a }) {
	let { rootRef: o, theme: s, toggleTheme: c } = EE("d2-theme");
	return /* @__PURE__ */ (0, X.jsx)("div", {
		ref: o,
		className: "contents",
		children: /* @__PURE__ */ (0, X.jsx)(nb, { children: /* @__PURE__ */ (0, X.jsxs)(mb, {
			defaultOpen: !0,
			children: [/* @__PURE__ */ (0, X.jsxs)(hb, {
				collapsible: "icon",
				children: [
					/* @__PURE__ */ (0, X.jsx)(vb, {
						className: "px-3 pb-3 pt-4",
						children: /* @__PURE__ */ (0, X.jsxs)("a", {
							href: "#/dashboard",
							className: "flex min-h-10 items-center gap-2.5 rounded-md px-2 text-sm font-semibold",
							children: [/* @__PURE__ */ (0, X.jsx)("img", {
								className: "size-7 shrink-0",
								src: s === "dark" ? "https://organizeon.com.br/d3/assets/organizeon-icon.png" : "https://organizeon.com.br/d3/assets/organizeon_icon_black_128.png",
								alt: ""
							}), /* @__PURE__ */ (0, X.jsxs)("span", {
								className: "truncate",
								children: ["OrganizeOn ", /* @__PURE__ */ (0, X.jsx)("span", {
									className: "font-normal text-muted-foreground",
									children: "D2"
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, X.jsx)(bb, {}),
					/* @__PURE__ */ (0, X.jsx)(xb, { children: /* @__PURE__ */ (0, X.jsxs)(Sb, { children: [/* @__PURE__ */ (0, X.jsx)(Cb, { children: "Workspace" }), /* @__PURE__ */ (0, X.jsx)(OE, {})] }) }),
					/* @__PURE__ */ (0, X.jsx)(yb, {
						className: "px-2 pb-3",
						children: /* @__PURE__ */ (0, X.jsx)(NT, {
							username: t,
							role: n,
							onLogout: r
						})
					})
				]
			}), /* @__PURE__ */ (0, X.jsxs)(_b, {
				className: "min-h-svh min-w-0",
				children: [/* @__PURE__ */ (0, X.jsxs)("header", {
					className: "sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, X.jsx)(gb, { "aria-label": "Abrir ou recolher navegação" }),
						/* @__PURE__ */ (0, X.jsx)("span", {
							className: "flex-1 text-sm font-medium",
							children: "Meus arquivos"
						}),
						/* @__PURE__ */ (0, X.jsx)(Y, {
							variant: "ghost",
							size: "icon",
							onClick: c,
							"aria-label": s === "dark" ? "Ativar tema claro" : "Ativar tema escuro",
							children: s === "dark" ? /* @__PURE__ */ (0, X.jsx)(Zt, {}) : /* @__PURE__ */ (0, X.jsx)(lt, {})
						}),
						/* @__PURE__ */ (0, X.jsx)(Y, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Atualizar",
							disabled: a,
							onClick: i,
							children: /* @__PURE__ */ (0, X.jsx)(DE, {
								icon: Dt,
								active: a
							})
						})
					]
				}), /* @__PURE__ */ (0, X.jsx)("main", {
					className: "mx-auto grid w-full max-w-5xl gap-5 px-4 py-6 sm:px-6 sm:py-8",
					children: e
				})]
			})]
		}) })
	});
}
vn(), po(), Vv(), Y_();
function AE({ username: e, role: t, request: n, upload: r, logout: i }) {
	let a = (0, Z.useRef)(null), [o, s] = (0, Z.useState)([]), [c, l] = (0, Z.useState)(null), [u, d] = (0, Z.useState)(null), [f, p] = (0, Z.useState)(""), [m, h] = (0, Z.useState)(!1), [g, _] = (0, Z.useState)(null), [v, y] = (0, Z.useState)(null);
	async function b() {
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
	(0, Z.useEffect)(() => {
		b();
	}, []);
	async function x() {
		if (c) {
			p(""), d(0);
			try {
				await r(c, d), l(null), p("Arquivo enviado."), await b();
			} catch (e) {
				p(e instanceof Error ? e.message : "Falha no envio.");
			} finally {
				d(null);
			}
		}
	}
	async function S(e) {
		try {
			let t = await n(`/files/${encodeURIComponent(e.id)}`);
			_({
				id: e.id,
				name: t.file.name,
				content: t.content || ""
			});
		} catch (e) {
			p(e instanceof Error ? e.message : "Falha ao abrir arquivo.");
		}
	}
	async function C(e) {
		if (e.preventDefault(), g) try {
			await n(g.id ? `/files/${encodeURIComponent(g.id)}` : "/files", {
				method: g.id ? "PUT" : "POST",
				headers: {
					"Content-Type": "text/plain;charset=utf-8",
					...g.id ? {} : { "X-File-Name": encodeURIComponent(g.name.trim() || "script.txt") }
				},
				body: g.content
			}), _(null), p("Texto salvo."), await b();
		} catch (e) {
			p(e instanceof Error ? e.message : "Falha ao salvar.");
		}
	}
	async function w(e) {
		try {
			await n(`/files/${encodeURIComponent(e.id)}`, { method: "DELETE" }), y(null), await b();
		} catch (e) {
			p(e instanceof Error ? e.message : "Falha ao apagar.");
		}
	}
	async function T(e) {
		try {
			await navigator.clipboard.writeText(`https://organizeon.com.br/d2/files/${encodeURIComponent(e.name)}`), p("Link público copiado.");
		} catch {
			p("Não foi possível copiar o link.");
		}
	}
	return /* @__PURE__ */ (0, X.jsxs)(kE, {
		username: e,
		role: t,
		logout: i,
		refresh: () => void b(),
		refreshing: m,
		children: [
			/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Meus arquivos"
			}), /* @__PURE__ */ (0, X.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Gerencie arquivos e textos da sua conta."
			})] }),
			/* @__PURE__ */ (0, X.jsxs)(RT, { children: [/* @__PURE__ */ (0, X.jsxs)(zT, { children: [/* @__PURE__ */ (0, X.jsx)(BT, { children: "Adicionar arquivo" }), /* @__PURE__ */ (0, X.jsx)(VT, { children: "Selecione um arquivo ou crie um texto." })] }), /* @__PURE__ */ (0, X.jsxs)(HT, {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, X.jsx)("input", {
						ref: a,
						type: "file",
						className: "sr-only",
						"aria-label": "Selecionar arquivo",
						onChange: (e) => l(e.target.files?.[0] ?? null)
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "flex min-w-0 flex-wrap items-center gap-3 rounded-lg border border-dashed p-4",
						children: [/* @__PURE__ */ (0, X.jsxs)(Y, {
							variant: "outline",
							onClick: () => a.current?.click(),
							disabled: u !== null,
							children: [/* @__PURE__ */ (0, X.jsx)(Ie, {}), "Selecionar arquivo"]
						}), /* @__PURE__ */ (0, X.jsx)("span", {
							className: "w-full min-w-0 break-words text-sm text-muted-foreground sm:w-auto sm:flex-1",
							children: c?.name || "Nenhum arquivo selecionado"
						})]
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, X.jsxs)(Y, {
							disabled: !c || u !== null,
							onClick: () => void x(),
							children: [/* @__PURE__ */ (0, X.jsx)(sn, {}), "Enviar arquivo"]
						}), /* @__PURE__ */ (0, X.jsxs)(Y, {
							variant: "outline",
							onClick: () => _({
								name: "script.txt",
								content: ""
							}),
							children: [/* @__PURE__ */ (0, X.jsx)(we, {}), "Novo texto"]
						})]
					}),
					u !== null && /* @__PURE__ */ (0, X.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, X.jsxs)("div", {
							className: "flex justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, X.jsx)("span", { children: "Enviando arquivo" }), /* @__PURE__ */ (0, X.jsxs)("span", { children: [Math.round(u), "%"] })]
						}), /* @__PURE__ */ (0, X.jsx)("div", {
							role: "progressbar",
							"aria-valuemin": 0,
							"aria-valuemax": 100,
							"aria-valuenow": u,
							"aria-label": "Progresso do upload",
							className: "h-1.5 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, X.jsx)("div", {
								className: "h-full bg-primary transition-[width] duration-150 motion-reduce:transition-none",
								style: { width: `${u}%` }
							})
						})]
					})
				]
			})] }),
			f && /* @__PURE__ */ (0, X.jsx)("p", {
				role: "status",
				className: "text-sm text-muted-foreground",
				children: f
			}),
			g && /* @__PURE__ */ (0, X.jsxs)(RT, { children: [/* @__PURE__ */ (0, X.jsx)(zT, { children: /* @__PURE__ */ (0, X.jsx)(BT, { children: g.id ? "Editar texto" : "Novo texto" }) }), /* @__PURE__ */ (0, X.jsx)(HT, { children: /* @__PURE__ */ (0, X.jsxs)("form", {
				className: "grid gap-3",
				onSubmit: (e) => void C(e),
				children: [
					/* @__PURE__ */ (0, X.jsx)(zv, {
						"aria-label": "Nome do arquivo",
						value: g.name,
						disabled: !!g.id,
						onChange: (e) => _({
							...g,
							name: e.target.value
						})
					}),
					/* @__PURE__ */ (0, X.jsx)("textarea", {
						"aria-label": "Conteúdo",
						className: "min-h-52 w-full rounded-lg border bg-background p-3 font-mono text-sm",
						value: g.content,
						onChange: (e) => _({
							...g,
							content: e.target.value
						})
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, X.jsx)(Y, {
							type: "submit",
							children: "Salvar texto"
						}), /* @__PURE__ */ (0, X.jsx)(Y, {
							type: "button",
							variant: "outline",
							onClick: () => _(null),
							children: "Fechar"
						})]
					})
				]
			}) })] }),
			/* @__PURE__ */ (0, X.jsxs)(RT, { children: [/* @__PURE__ */ (0, X.jsxs)(zT, { children: [/* @__PURE__ */ (0, X.jsx)(BT, { children: "Arquivos" }), /* @__PURE__ */ (0, X.jsx)(VT, { children: o.length ? `${o.length} arquivo(s)` : "Nenhum arquivo ainda." })] }), /* @__PURE__ */ (0, X.jsx)(HT, {
				className: "grid gap-3",
				children: o.map((e) => /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "grid gap-3 border-t pt-3",
					children: [/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, X.jsx)("p", {
							className: "break-all font-medium",
							children: e.name
						}), /* @__PURE__ */ (0, X.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								(e.size / 1024).toFixed(1),
								" KB · ",
								new Date(e.updatedAt).toLocaleString("pt-BR")
							]
						})]
					}), /* @__PURE__ */ (0, X.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							e.contentType?.startsWith("text/") && /* @__PURE__ */ (0, X.jsxs)(Y, {
								variant: "outline",
								size: "sm",
								onClick: () => void S(e),
								children: [/* @__PURE__ */ (0, X.jsx)(vt, {}), "Editar"]
							}),
							/* @__PURE__ */ (0, X.jsxs)(Y, {
								variant: "outline",
								size: "sm",
								onClick: () => void T(e),
								children: [/* @__PURE__ */ (0, X.jsx)(ve, {}), "Copiar link"]
							}),
							/* @__PURE__ */ (0, X.jsxs)(Y, {
								variant: "destructive",
								size: "sm",
								onClick: () => y(e),
								children: [/* @__PURE__ */ (0, X.jsx)(en, {}), "Apagar"]
							})
						]
					})]
				}, e.id))
			})] }),
			/* @__PURE__ */ (0, X.jsx)(B_, {
				open: !!v,
				onOpenChange: (e) => {
					e || y(null);
				},
				children: /* @__PURE__ */ (0, X.jsxs)(U_, { children: [/* @__PURE__ */ (0, X.jsxs)(W_, { children: [/* @__PURE__ */ (0, X.jsx)(K_, { children: "Apagar arquivo?" }), /* @__PURE__ */ (0, X.jsx)(q_, { children: v?.name })] }), /* @__PURE__ */ (0, X.jsxs)(G_, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
					variant: "outline",
					onClick: () => y(null),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, X.jsx)(Y, {
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
z_();
var jE = /* @__PURE__ */ new WeakMap(), ME = /* @__PURE__ */ new WeakMap(), NE = /* @__PURE__ */ new WeakMap();
function PE(e, t) {
	let n = t?.getRootNode(), r = n instanceof ShadowRoot ? n : document, i = r.querySelector("link[data-organizeon-ui=\"client\"]");
	if (i) return i;
	let a = document.createElement("link");
	return a.rel = "stylesheet", a.href = e, a.dataset.organizeonUi = "client", r instanceof ShadowRoot ? r.append(a) : document.head.append(a), a;
}
function FE(e, t, n) {
	ME.get(e)?.unmount(), PE(n, e);
	let r = (0, bo.createRoot)(e);
	(0, xo.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui dark min-h-full",
		children: /* @__PURE__ */ (0, X.jsx)(yE, { game: t })
	}))), ME.set(e, r);
}
function IE(e) {
	ME.get(e)?.unmount(), ME.delete(e);
}
function LE(e, t, n) {
	PE(n, e);
	let r = (0, bo.createRoot)(e), i = (e) => (0, xo.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui organizeon-inline-ui dark",
		children: /* @__PURE__ */ (0, X.jsx)(bE, { ...e })
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
function RE(e, t, n) {
	NE.get(e)?.unmount(), PE(n, e);
	let r = (0, bo.createRoot)(e);
	(0, xo.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui organizeon-inline-ui dark",
		children: /* @__PURE__ */ (0, X.jsx)(wE, { ...t })
	}))), NE.set(e, r);
}
function zE(e) {
	NE.get(e)?.unmount(), NE.delete(e);
}
function BE(e, t, n) {
	e.classList.add("organizeon-ui", "organizeon-overlay-root", "dark");
	let r = PE(n, e), i = (0, bo.createRoot)(e), a = d(r, () => (0, xo.flushSync)(() => i.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui dark",
		children: /* @__PURE__ */ (0, X.jsx)(P_, {
			container: e,
			children: t
		})
	}))));
	return () => {
		a(), i.unmount();
	};
}
function VE(e, t, n, r) {
	return BE(e, /* @__PURE__ */ (0, X.jsx)(SE, {
		game: t,
		onClose: n
	}), r);
}
function HE(e, t, n) {
	return BE(e, /* @__PURE__ */ (0, X.jsx)(CE, { ...t }), n);
}
function UE(e, t, n = "Confirmar ação", r = "Continuar") {
	return new Promise((i) => {
		let a = document.createElement("div");
		a.className = "organizeon-ui dark", document.body.append(a), PE(t, a);
		let o = (0, bo.createRoot)(a), s = !1, c = (e) => {
			s || (s = !0, o.unmount(), a.remove(), i(e));
		};
		(0, xo.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(P_, {
			container: a,
			children: /* @__PURE__ */ (0, X.jsx)(xE, {
				title: n,
				description: e,
				confirmLabel: r,
				onCancel: () => c(!1),
				onConfirm: () => c(!0)
			})
		})));
	});
}
function WE(e, t, n) {
	jE.get(e)?.root.unmount();
	let r = e.shadowRoot ?? e.attachShadow({ mode: "open" });
	r.replaceChildren();
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = n, r.append(i);
	let a = document.createElement("div");
	a.className = t.type === "account" ? "organizeon-ui organizeon-overlay-root dark" : "organizeon-ui dark", r.append(a);
	let o = (0, bo.createRoot)(a);
	return o.render(/* @__PURE__ */ (0, X.jsx)(P_, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(nb, { children: /* @__PURE__ */ (0, X.jsx)(vE, { ...t }) })
	})), jE.set(e, {
		root: o,
		shadow: r,
		container: a
	}), () => {
		let t = jE.get(e);
		t && (t.root.unmount(), t.shadow.replaceChildren(), jE.delete(e));
	};
}
function GE(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui organizeon-overlay-root dark", r.append(i, a);
	let o = (0, bo.createRoot)(a), s = d(i, () => (0, xo.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(P_, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(nb, { children: /* @__PURE__ */ (0, X.jsx)(vE, { ...t }) })
	}))));
	return () => {
		s(), o.unmount(), r.replaceChildren();
	};
}
function KE(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui dark", r.append(i, a);
	let o = (0, bo.createRoot)(a);
	return (0, xo.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(TE, { onSubmit: t }))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function qE(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui dark", r.append(i, a);
	let o = (0, bo.createRoot)(a);
	return (0, xo.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(P_, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(AE, { ...t })
	}))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function JE(e, t) {
	jE.get(e)?.root.unmount();
	let n = e.shadowRoot ?? e.attachShadow({ mode: "open" });
	n.replaceChildren();
	let r = document.createElement("link");
	r.rel = "stylesheet", r.href = t, n.append(r);
	let i = document.createElement("div");
	i.className = "organizeon-ui organizeon-overlay-root dark", n.append(i);
	let a = (0, bo.createRoot)(i);
	return a.render(/* @__PURE__ */ (0, X.jsx)(P_, {
		container: i,
		children: /* @__PURE__ */ (0, X.jsx)(es, {
			position: "bottom-right",
			theme: "dark",
			closeButton: !0,
			richColors: !1
		})
	})), jE.set(e, {
		root: a,
		shadow: n,
		container: i
	}), () => {
		a.unmount(), n.replaceChildren(), jE.delete(e);
	};
}
function YE(e, t = "info", n) {
	Ro[t](e, n ? { id: n } : void 0);
}
function XE(e) {
	Ro.dismiss(e);
}
function ZE(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.textContent = "Carregando interface…", a.style.cssText = "display:grid;place-items:center;min-height:100svh;background:#09090b;color:#a1a1aa;font:14px system-ui";
	let o = document.createElement("div");
	o.className = "organizeon-ui dark", r.append(i, a, o);
	let s = (0, bo.createRoot)(o), c = !1, l = t, u = (e) => {
		l = e, c && (0, xo.flushSync)(() => s.render(/* @__PURE__ */ (0, X.jsx)(P_, {
			container: o,
			children: /* @__PURE__ */ (0, X.jsx)(nb, { children: /* @__PURE__ */ (0, X.jsx)(vE, { ...l }) })
		})));
	}, f = d(i, () => {
		c = !0, a.remove(), u(l);
	});
	return i.addEventListener("error", () => {
		a.textContent = "Não foi possível carregar os estilos da interface.";
	}, { once: !0 }), {
		update: u,
		unmount: () => {
			f(), s.unmount(), r.replaceChildren();
		}
	};
}
function QE(e, t, n, r) {
	Ro.custom((r) => /* @__PURE__ */ (0, X.jsx)(mo, {
		title: e,
		detail: t,
		percent: n,
		onClose: () => Ro.dismiss(r)
	}), {
		id: "connection-status",
		duration: r > 0 ? r : Infinity
	});
}
export { UE as confirmClientAction, XE as dismissClientToast, LE as mountCatalogToolbar, BE as mountClientDialog, WE as mountClientSurface, JE as mountClientToaster, qE as mountD2Dashboard, KE as mountD2Login, FE as mountGameCard, HE as mountGameControlSettingsDialog, VE as mountGameCreditsDialog, GE as mountNavigation, RE as mountPreferenceCard, ZE as mountReactiveSurface, YE as showClientToast, QE as showConnectionToast, IE as unmountGameCard, zE as unmountPreferenceCard };
