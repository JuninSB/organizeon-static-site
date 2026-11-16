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
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
// node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function f(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: d(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
// node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var p = (e) => {
	let t = "", n = !1;
	for (let r of e) r === "-" || r === "_" || r <= " " ? n = t.length > 0 : (t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1);
	return t;
}, m = (e) => {
	let t = p(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, h = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), g = {
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
function _(e) {
	return e != null;
}
function v(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? g.width, a = e.size ?? e.height ?? g.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? h(...c) : h("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? g["stroke-width"]) * Number(e.size ?? e.width ?? g.width) / Number(t.size ?? t.width ?? g.width) : t.strokeWidth ?? g["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(g).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && _(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && _(t.width) && { [r("width")]: t.width },
			..."height" in t && _(t.height) && { [r("height")]: t.height },
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
function y(e, t = {}) {
	return v(e, {
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
var b = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, x = /* @__PURE__ */ c(u(), 1), S = (0, x.createContext)({}), C = () => (0, x.useContext)(S), w = (0, x.forwardRef)(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
	node: l,
	aliases: [],
	size: 24
}, ...d }, f) => {
	let { size: p = 24, strokeWidth: m = 2, absoluteStrokeWidth: g = !1, nonScalingStroke: _ = !1, color: v = "currentColor", className: S = "" } = C() ?? {}, w = !!c || b(d), [T, E, D = []] = y(u, {
		color: e ?? v,
		width: n ?? t ?? p,
		height: r ?? t ?? p,
		strokeWidth: i ?? m,
		absoluteStrokeWidth: a ?? g,
		nonScalingStroke: o ?? _,
		className: h(S, s),
		hasA11yProp: w,
		attributes: d
	});
	return (0, x.createElement)(T, {
		ref: f,
		...E
	}, [...D.map(([e, t]) => (0, x.createElement)(e, t)), ...Array.isArray(c) ? c : [c]]);
});
// node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function T(e, t = [], n = []) {
	let r = typeof e == "string" ? f(e, t, n) : e, i = (0, x.forwardRef)(({ className: e, ...t }, n) => (0, x.createElement)(w, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = m(r.name)), i;
}
// node_modules/lucide-react/dist/esm/icons/arrow-left.mjs
var E = {
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
E.node;
var D = T(E), O = {
	name: "check",
	size: 24,
	node: [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]
};
O.node;
var k = T(O), A = {
	name: "chevron-down",
	size: 24,
	node: [["path", {
		d: "m6 9 6 6 6-6",
		key: "qrunsl"
	}]]
};
A.node;
var j = T(A), M = {
	name: "chevron-up",
	size: 24,
	node: [["path", {
		d: "m18 15-6-6-6 6",
		key: "153udz"
	}]]
};
M.node;
var N = T(M), P = {
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
P.node;
var F = T(P), I = {
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
I.node;
var L = T(I), R = {
	name: "cloud",
	size: 24,
	node: [["path", {
		d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
		key: "p7xjir"
	}]]
};
R.node;
var z = T(R), ee = {
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
ee.node;
var B = T(ee), te = {
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
te.node;
var ne = T(te), re = {
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
re.node;
var ie = T(re), ae = {
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
ae.node;
var V = T(ae), oe = {
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
oe.node;
var H = T(oe), U = {
	name: "flame",
	size: 24,
	node: [["path", {
		d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
		key: "1slcih"
	}]]
};
U.node;
var se = T(U), ce = {
	name: "folder-open",
	size: 24,
	node: [["path", {
		d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
		key: "usdka0"
	}]]
};
ce.node;
var le = T(ce), ue = {
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
ue.node;
var de = T(ue), fe = {
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
fe.node;
var pe = T(fe), me = {
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
me.node;
var he = T(me), ge = {
	name: "loader-circle",
	size: 24,
	node: [["path", {
		d: "M21 12a9 9 0 1 1-6.219-8.56",
		key: "13zald"
	}]],
	aliases: ["loader-2"]
};
ge.node;
var _e = T(ge), ve = {
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
ve.node;
var ye = T(ve), be = {
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
be.node;
var xe = T(be), Se = {
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
Se.node;
var Ce = T(Se), we = {
	name: "moon",
	size: 24,
	node: [["path", {
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
		key: "kfwtm"
	}]]
};
we.node;
var Te = T(we), Ee = {
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
Ee.node;
var De = T(Ee), Oe = {
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
Oe.node;
var ke = T(Oe), Ae = {
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
Ae.node;
var je = T(Ae), Me = {
	name: "play",
	size: 24,
	node: [["path", {
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
		key: "10ikf1"
	}]]
};
Me.node;
var Ne = T(Me), Pe = {
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
Pe.node;
var Fe = T(Pe), Ie = {
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
Ie.node;
var Le = T(Ie), Re = {
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
Re.node;
var ze = T(Re), Be = {
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
Be.node;
var Ve = T(Be), He = {
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
He.node;
var Ue = T(He), We = {
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
We.node;
var Ge = T(We), Ke = {
	name: "shield",
	size: 24,
	node: [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}]]
};
Ke.node;
var qe = T(Ke), Je = {
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
Je.node;
var Ye = T(Je), Xe = {
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
Xe.node;
var Ze = T(Xe), Qe = {
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
Qe.node;
var $e = T(Qe), et = {
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
et.node;
var tt = T(et), nt = {
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
nt.node;
var rt = T(nt), it = {
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
it.node;
var at = T(it), ot = {
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
ot.node;
var st = T(ot), ct = {
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
ct.node;
var lt = T(ct), ut = {
	name: "zap",
	size: 24,
	node: [["path", {
		d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
		key: "1v7up4"
	}]]
};
ut.node;
var dt = T(ut);
// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function ft() {
	return typeof window < "u";
}
function pt(e) {
	return gt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function mt(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ht(e) {
	return ((gt(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function gt(e) {
	return ft() ? e instanceof Node || e instanceof mt(e).Node : !1;
}
function _t(e) {
	return ft() ? e instanceof Element || e instanceof mt(e).Element : !1;
}
function vt(e) {
	return ft() ? e instanceof HTMLElement || e instanceof mt(e).HTMLElement : !1;
}
function yt(e) {
	return !ft() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof mt(e).ShadowRoot;
}
function bt(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = jt(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function xt(e) {
	return /^(table|td|th)$/.test(pt(e));
}
function St(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Ct = /transform|translate|scale|rotate|perspective|filter/, wt = /paint|layout|strict|content/, Tt = (e) => !!e && e !== "none", Et;
function Dt(e) {
	let t = _t(e) ? jt(e) : e;
	return Tt(t.transform) || Tt(t.translate) || Tt(t.scale) || Tt(t.rotate) || Tt(t.perspective) || !kt() && (Tt(t.backdropFilter) || Tt(t.filter)) || Ct.test(t.willChange || "") || wt.test(t.contain || "");
}
function Ot(e) {
	let t = Nt(e);
	for (; vt(t) && !At(t);) {
		if (Dt(t)) return t;
		if (St(t)) return null;
		t = Nt(t);
	}
	return null;
}
function kt() {
	return Et ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Et;
}
function At(e) {
	return /^(html|body|#document)$/.test(pt(e));
}
function jt(e) {
	return mt(e).getComputedStyle(e);
}
function Mt(e) {
	return _t(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Nt(e) {
	if (pt(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || yt(e) && e.host || ht(e);
	return yt(t) ? t.host : t;
}
function Pt(e) {
	let t = Nt(e);
	return At(t) ? (e.ownerDocument || e).body : vt(t) && bt(t) ? t : Pt(t);
}
function Ft(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Pt(e), i = r === e.ownerDocument?.body, a = mt(r);
	if (i) {
		let e = It(a);
		return t.concat(a, a.visualViewport || [], bt(r) ? r : [], e && n ? Ft(e) : []);
	}
	return t.concat(r, Ft(r, [], n));
}
function It(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
// node_modules/@base-ui/utils/safeReact.mjs
var Lt = { ...x }, Rt = {};
function zt(e, t) {
	let n = x.useRef(Rt);
	return n.current === Rt && (n.current = e(t)), n;
}
// node_modules/@base-ui/utils/useStableCallback.mjs
var Bt = Lt.useInsertionEffect, Vt = Bt && Bt !== Lt.useLayoutEffect ? Bt : (e) => e();
function W(e) {
	let t = zt(Ht).current;
	return t.next = e, Vt(t.effect), t.trampoline;
}
function Ht() {
	let e = {
		next: void 0,
		callback: Ut,
		trampoline: (...t) => e.callback?.(...t),
		effect: () => {
			e.callback = e.next;
		}
	};
	return e;
}
function Ut() {}
var G = typeof document < "u" ? x.useLayoutEffect : () => {};
// node_modules/@base-ui/utils/mergeObjects.mjs
function Wt(e, t) {
	if (e && !t) return e;
	if (!e && t) return t;
	if (e || t) return {
		...e,
		...t
	};
}
// node_modules/@base-ui/react/merge-props/mergeProps.mjs
var Gt = {};
function Kt(e, t, n, r, i) {
	if (!n && !r && !i && !e) return Jt(t);
	let a = Jt(e);
	return t && (a = Yt(a, t)), n && (a = Yt(a, n)), r && (a = Yt(a, r)), i && (a = Yt(a, i)), a;
}
function qt(e) {
	if (e.length === 0) return Gt;
	if (e.length === 1) return Jt(e[0]);
	let t = Jt(e[0]);
	for (let n = 1; n < e.length; n += 1) t = Yt(t, e[n]);
	return t;
}
function Jt(e) {
	return $t(e) ? { ...e(Gt) } : Xt(e);
}
function Yt(e, t) {
	return $t(t) ? t(e) : Zt(e, t);
}
function Xt(e) {
	let t = { ...e };
	for (let e in t) {
		let n = t[e];
		Qt(e, n) && (t[e] = tn(n));
	}
	return t;
}
function Zt(e, t) {
	if (!t) return e;
	for (let n in t) {
		let r = t[n];
		switch (n) {
			case "style":
				e[n] = Wt(e.style, r);
				break;
			case "className":
				e[n] = rn(e.className, r);
				break;
			default: e[n] = Qt(n, r) ? en(e[n], r) : r;
		}
	}
	return e;
}
function Qt(e, t) {
	let n = e.charCodeAt(0), r = e.charCodeAt(1), i = e.charCodeAt(2);
	return n === 111 && r === 110 && i >= 65 && i <= 90 && (typeof t == "function" || t === void 0);
}
function $t(e) {
	return typeof e == "function";
}
function en(e, t) {
	return t ? e ? (...n) => {
		let r = n[0];
		if (an(r)) {
			let i = r;
			nn(i);
			let a = t(...n);
			return i.baseUIHandlerPrevented || e?.(...n), a;
		}
		let i = t(...n);
		return e?.(...n), i;
	} : tn(t) : e;
}
function tn(e) {
	return e && ((...t) => {
		let n = t[0];
		return an(n) && nn(n), e(...t);
	});
}
function nn(e) {
	return e.preventBaseUIHandler = () => {
		e.baseUIHandlerPrevented = !0;
	}, e;
}
function rn(e, t) {
	return t ? e ? t + " " + e : t : e;
}
function an(e) {
	return typeof e == "object" && !!e && "nativeEvent" in e;
}
// node_modules/@base-ui/utils/formatErrorMessage.mjs
function on(e, t) {
	return function(n, ...r) {
		let i = new URL(e);
		return i.searchParams.set("code", n.toString()), r.forEach((e) => i.searchParams.append("args[]", e)), `${t} error #${n}; visit ${i} for the full message.`;
	};
}
var sn = on("https://base-ui.com/production-error", "Base UI"), cn = /*#__PURE__*/ x.createContext(void 0);
function ln(e = !1) {
	let t = x.useContext(cn);
	if (t === void 0 && !e) throw Error(sn(16));
	return t;
}
// node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function un(e) {
	let { focusableWhenDisabled: t, disabled: n, composite: r = !1, tabIndex: i = 0, isNativeButton: a } = e, o = r && t !== !1, s = r && t === !1;
	return { props: x.useMemo(() => {
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
function dn(e) {
	return e?.ownerDocument || document;
}
// node_modules/@base-ui/react/utils/dispatchClickWithModifiers.mjs
function fn(e, t, { detail: n = 0, pointerType: r = "" } = {}) {
	e.dispatchEvent(new (mt(e)).PointerEvent("click", {
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
function pn(e = {}) {
	let { disabled: t = !1, focusableWhenDisabled: n, tabIndex: r = 0, native: i = !0, composite: a } = e, o = x.useRef(null), s = ln(!0), c = a ?? s !== void 0, { props: l } = un({
		focusableWhenDisabled: n,
		disabled: t,
		composite: c,
		tabIndex: r,
		isNativeButton: i
	}), u = x.useCallback(() => {
		let e = o.current;
		mn(e) && c && t && l.disabled === void 0 && e.disabled && (e.disabled = !1);
	}, [
		t,
		l.disabled,
		c
	]);
	return G(u, [u]), {
		getButtonProps: x.useCallback((e = {}) => {
			let { onClick: n, onMouseDown: r, onKeyUp: a, onKeyDown: o, onPointerDown: s, ...u } = e;
			return Kt({
				onClick(e) {
					t ? e.preventDefault() : n?.(e);
				},
				onMouseDown(e) {
					t || r?.(e);
				},
				onKeyDown(e) {
					if (t || (nn(e), o?.(e), e.baseUIHandlerPrevented)) return;
					let n = e.target === e.currentTarget, r = e.currentTarget, a = mn(r), s = !i && hn(r), l = n && (i ? a : !s), u = e.key === "Enter", d = e.key === " ", f = r.getAttribute("role"), p = f?.startsWith("menuitem") || f === "option" || f === "gridcell";
					if (n && c && d) {
						if (e.defaultPrevented && p) return;
						e.preventDefault(), (!i || a) && (e.preventBaseUIHandler(), fn(r, e));
					} else !l || i || !d && !u ? n && s && d && e.preventDefault() : e.defaultPrevented || (e.preventDefault(), u && (e.preventBaseUIHandler(), fn(r, e)));
				},
				onKeyUp(e) {
					t || (nn(e), a?.(e), e.target === e.currentTarget && i && c && mn(e.currentTarget) && e.key === " " ? e.preventDefault() : e.baseUIHandlerPrevented || e.target !== e.currentTarget || i || c || e.defaultPrevented || e.key !== " " || (e.preventBaseUIHandler(), fn(e.currentTarget, e)));
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
function mn(e) {
	return vt(e) && e.tagName === "BUTTON";
}
function hn(e) {
	return vt(e) && e.tagName === "A" && !!e.href;
}
// node_modules/@base-ui/utils/useMergedRefs.mjs
function gn(e, t, n, r) {
	let i = zt(vn).current;
	return yn(i, e, t, n, r) && xn(i, [
		e,
		t,
		n,
		r
	]), i.callback;
}
function _n(e) {
	let t = zt(vn).current;
	return bn(t, e) && xn(t, e), t.callback;
}
function vn() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function yn(e, t, n, r, i) {
	return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== i;
}
function bn(e, t) {
	return e.refs.length !== t.length || e.refs.some((e, n) => e !== t[n]);
}
function xn(e, t) {
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
var Sn = 19;
function Cn(e) {
	return Sn >= e;
}
// node_modules/@base-ui/utils/getReactElementRef.mjs
function wn(e) {
	if (!/*#__PURE__*/ x.isValidElement(e)) return null;
	let t = e, n = t.props;
	return (Cn(19) ? n?.ref : t.ref) ?? null;
}
// node_modules/@base-ui/utils/empty.mjs
function Tn() {}
var En = Object.freeze([]), Dn = Object.freeze({});
// node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function On(e, t) {
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
function kn(e, t) {
	return typeof e == "function" ? e(t) : e;
}
// node_modules/@base-ui/react/utils/resolveStyle.mjs
function An(e, t) {
	return typeof e == "function" ? e(t) : e;
}
// node_modules/@base-ui/react/internals/useRenderElement.mjs
function jn(e, t, n = {}) {
	let r = t.render;
	n.enabled !== !1 && (r = Fn(r));
	let i = Mn(t, n, r);
	if (n.enabled === !1) return null;
	let a = n.state ?? Dn;
	return In(e, r, i, a);
}
function Mn(e, t, n) {
	let { className: r, style: i } = e, { state: a = Dn, ref: o, props: s, stateAttributesMapping: c, enabled: l = !0 } = t, u = l ? kn(r, a) : void 0, d = l ? An(i, a) : void 0, f = l ? On(a, c) : Dn, p = l && s ? Nn(s) : void 0, m = l ? Wt(f, p) ?? {} : Dn;
	return typeof document < "u" && (l ? m.ref = Array.isArray(o) ? _n([
		m.ref,
		wn(n),
		...o
	]) : gn(m.ref, wn(n), o) : gn(null, null)), l ? (u !== void 0 && (m.className = rn(m.className, u)), d !== void 0 && (m.style = Wt(m.style, d)), m) : Dn;
}
function Nn(e) {
	return Array.isArray(e) ? qt(e) : Kt(void 0, e);
}
var Pn = Symbol.for("react.lazy");
function Fn(e) {
	if (e?.$$typeof !== Pn) return e;
	let t = x.Children.toArray(e)[0];
	return /*#__PURE__*/ x.isValidElement(t) ? t : e;
}
function In(e, t, n, r) {
	if (t) {
		if (typeof t == "function") return t(n, r);
		let e = Kt(n, t.props);
		return e.ref = n.ref, /*#__PURE__*/ x.cloneElement(t, e);
	}
	return Ln(e, n);
}
function Ln(e, t) {
	return e === "button" ? /*#__PURE__*/ (0, x.createElement)("button", {
		type: "button",
		...t,
		key: t.key
	}) : e === "img" ? /*#__PURE__*/ (0, x.createElement)("img", {
		alt: "",
		...t,
		key: t.key
	}) : /*#__PURE__*/ x.createElement(e, t);
}
// node_modules/@base-ui/react/button/Button.mjs
var Rn = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i = !1, focusableWhenDisabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { getButtonProps: l, buttonRef: u } = pn({
		disabled: i,
		focusableWhenDisabled: a,
		native: o
	});
	return jn("button", e, {
		state: { disabled: i },
		ref: [t, u],
		props: [c, l]
	});
});
// node_modules/clsx/dist/clsx.mjs
function zn(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = zn(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Bn() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = zn(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/class-variance-authority/dist/index.mjs
var Vn = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Hn = Bn, Un = (e, t) => (n) => {
	if (t?.variants == null) return Hn(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = Vn(t) || Vn(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return Hn(e, a, t?.compoundVariants?.reduce((e, t) => {
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
}, Wn = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, Gn = (e, t) => ({
	classGroupId: e,
	validator: t
}), Kn = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), qn = "-", Jn = [], Yn = "arbitrary..", Xn = (e) => {
	let t = $n(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return Qn(e);
			let n = e.split(qn);
			return Zn(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? Wn(i, t) : t : i || Jn;
			}
			return n[e] || Jn;
		}
	};
}, Zn = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = Zn(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(qn) : e.slice(t).join(qn), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, Qn = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? Yn + r : void 0;
})(), $n = (e) => {
	let { theme: t, classGroups: n } = e;
	return er(n, t);
}, er = (e, t) => {
	let n = Kn();
	for (let r in e) {
		let i = e[r];
		tr(i, n, r, t);
	}
	return n;
}, tr = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		nr(i, t, n, r);
	}
}, nr = (e, t, n, r) => {
	typeof e == "string" ? rr(e, t, n) : typeof e == "function" ? ir(e, t, n, r) : ar(e, t, n, r);
}, rr = (e, t, n) => {
	let r = e === "" ? t : or(t, e);
	r.classGroupId = n;
}, ir = (e, t, n, r) => {
	sr(e) ? tr(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(Gn(n, e)));
}, ar = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		tr(o, or(t, a), n, r);
	}
}, or = (e, t) => {
	let n = e, r = t.split(qn), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = Kn(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, sr = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, cr = (e) => {
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
}, lr = "!", ur = ":", dr = [], fr = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), pr = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === ur) {
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
		s.endsWith(lr) ? (c = s.slice(0, -1), l = !0) : s.startsWith(lr) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return fr(t, l, c, u);
	};
	if (t) {
		let e = t + ur, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : fr(dr, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, mr = (e) => {
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
}, hr = (e) => ({
	cache: cr(e.cacheSize),
	parseClassName: pr(e),
	sortModifiers: mr(e),
	postfixLookupClassGroupIds: gr(e),
	...Xn(e)
}), gr = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, _r = /\s+/, vr = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(_r), l = "";
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
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + lr : _, y = v + g;
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
}, yr = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = br(n)) && (i && (i += " "), i += r);
	return i;
}, br = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = br(e[r])) && (n && (n += " "), n += t);
	return n;
}, xr = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = hr(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = vr(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(yr(...e));
}, Sr = [], Cr = (e) => {
	let t = (t) => t[e] || Sr;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, wr = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Tr = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Er = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Dr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Or = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, kr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, Ar = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, jr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Mr = (e) => Er.test(e), K = (e) => !!e && !Number.isNaN(Number(e)), Nr = (e) => !!e && Number.isInteger(Number(e)), Pr = (e) => e.endsWith("%") && K(e.slice(0, -1)), Fr = (e) => Dr.test(e), Ir = () => !0, Lr = (e) => Or.test(e) && !kr.test(e), Rr = () => !1, zr = (e) => Ar.test(e), Br = (e) => jr.test(e), Vr = (e) => !q(e) && !J(e), Hr = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Ur = (e) => ii(e, ci, Rr), q = (e) => wr.test(e), Wr = (e) => ii(e, li, Lr), Gr = (e) => ii(e, ui, K), Kr = (e) => ii(e, fi, Ir), qr = (e) => ii(e, di, Rr), Jr = (e) => ii(e, oi, Rr), Yr = (e) => ii(e, si, Br), Xr = (e) => ii(e, pi, zr), J = (e) => Tr.test(e), Zr = (e) => ai(e, li), Qr = (e) => ai(e, di), $r = (e) => ai(e, oi), ei = (e) => ai(e, ci), ti = (e) => ai(e, si), ni = (e) => ai(e, pi, !0), ri = (e) => ai(e, fi, !0), ii = (e, t, n) => {
	let r = wr.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, ai = (e, t, n = !1) => {
	let r = Tr.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, oi = (e) => e === "position" || e === "percentage", si = (e) => e === "image" || e === "url", ci = (e) => e === "length" || e === "size" || e === "bg-size", li = (e) => e === "length", ui = (e) => e === "number", di = (e) => e === "family-name", fi = (e) => e === "number" || e === "weight", pi = (e) => e === "shadow", mi = /*#__PURE__*/ xr(() => {
	let e = Cr("color"), t = Cr("font"), n = Cr("text"), r = Cr("font-weight"), i = Cr("tracking"), a = Cr("leading"), o = Cr("breakpoint"), s = Cr("container"), c = Cr("spacing"), l = Cr("radius"), u = Cr("shadow"), d = Cr("inset-shadow"), f = Cr("text-shadow"), p = Cr("drop-shadow"), m = Cr("blur"), h = Cr("perspective"), g = Cr("aspect"), _ = Cr("ease"), v = Cr("animate"), y = () => [
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
		J,
		q
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
		J,
		q,
		c
	], T = () => [
		Mr,
		"full",
		"auto",
		...w()
	], E = () => [
		Nr,
		"none",
		"subgrid",
		J,
		q
	], D = () => [
		"auto",
		{ span: [
			"full",
			Nr,
			J,
			q
		] },
		Nr,
		J,
		q
	], O = () => [
		Nr,
		"auto",
		J,
		q
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		J,
		q
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
		Mr,
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
		Mr,
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
		Mr,
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
		J,
		q
	], L = () => [
		...b(),
		$r,
		Jr,
		{ position: [J, q] }
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
		ei,
		Ur,
		{ size: [J, q] }
	], ee = () => [
		Pr,
		Zr,
		Wr
	], B = () => [
		"",
		"none",
		"full",
		l,
		J,
		q
	], te = () => [
		"",
		K,
		Zr,
		Wr
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
	], ie = () => [
		K,
		Pr,
		$r,
		Jr
	], ae = () => [
		"",
		"none",
		m,
		J,
		q
	], V = () => [
		"none",
		K,
		J,
		q
	], oe = () => [
		"none",
		K,
		J,
		q
	], H = () => [
		K,
		J,
		q
	], U = () => [
		Mr,
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
			blur: [Fr],
			breakpoint: [Fr],
			color: [Ir],
			container: [Fr],
			"drop-shadow": [Fr],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Vr],
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
			"inset-shadow": [Fr],
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
			radius: [Fr],
			shadow: [Fr],
			spacing: ["px", K],
			text: [Fr],
			"text-shadow": [Fr],
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
				Mr,
				q,
				J,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				J,
				q
			] }],
			"container-named": [Hr],
			columns: [{ columns: [
				K,
				"auto",
				q,
				J,
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
				Nr,
				"auto",
				J,
				q
			] }],
			basis: [{ basis: [
				Mr,
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
				K,
				Mr,
				"auto",
				"initial",
				"none",
				q
			] }],
			grow: [{ grow: [
				"",
				K,
				J,
				q
			] }],
			shrink: [{ shrink: [
				"",
				K,
				J,
				q
			] }],
			order: [{ order: [
				Nr,
				"first",
				"last",
				"none",
				J,
				q
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
				Zr,
				Wr
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				ri,
				Kr
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
				Pr,
				q
			] }],
			"font-family": [{ font: [
				Qr,
				qr,
				t
			] }],
			"font-features": [{ "font-features": [q] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				J,
				q
			] }],
			"line-clamp": [{ "line-clamp": [
				K,
				"none",
				J,
				Gr
			] }],
			leading: [{ leading: [
				"none",
				a,
				...w()
			] }],
			"list-image": [{ "list-image": [
				"none",
				J,
				q
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				J,
				q
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
				K,
				"from-font",
				"auto",
				J,
				Wr
			] }],
			"text-decoration-color": [{ decoration: I() }],
			"underline-offset": [{ "underline-offset": [
				K,
				"auto",
				J,
				q
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
				Nr,
				J,
				q
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
				J,
				q
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
				J,
				q
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
						Nr,
						J,
						q
					],
					radial: [
						"",
						J,
						q
					],
					conic: [
						"",
						Nr,
						J,
						q
					]
				},
				ti,
				Yr
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
				K,
				J,
				q
			] }],
			"outline-w": [{ outline: [
				"",
				K,
				Zr,
				Wr
			] }],
			"outline-color": [{ outline: I() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				ni,
				Xr
			] }],
			"shadow-color": [{ shadow: I() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				ni,
				Xr
			] }],
			"inset-shadow-color": [{ "inset-shadow": I() }],
			"ring-w": [{ ring: te() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: I() }],
			"ring-offset-w": [{ "ring-offset": [K, Wr] }],
			"ring-offset-color": [{ "ring-offset": I() }],
			"inset-ring-w": [{ "inset-ring": te() }],
			"inset-ring-color": [{ "inset-ring": I() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				ni,
				Xr
			] }],
			"text-shadow-color": [{ "text-shadow": I() }],
			opacity: [{ opacity: [
				K,
				J,
				q
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
			"mask-image-linear-pos": [{ "mask-linear": [K] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": ie() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": ie() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": I() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": I() }],
			"mask-image-t-from-pos": [{ "mask-t-from": ie() }],
			"mask-image-t-to-pos": [{ "mask-t-to": ie() }],
			"mask-image-t-from-color": [{ "mask-t-from": I() }],
			"mask-image-t-to-color": [{ "mask-t-to": I() }],
			"mask-image-r-from-pos": [{ "mask-r-from": ie() }],
			"mask-image-r-to-pos": [{ "mask-r-to": ie() }],
			"mask-image-r-from-color": [{ "mask-r-from": I() }],
			"mask-image-r-to-color": [{ "mask-r-to": I() }],
			"mask-image-b-from-pos": [{ "mask-b-from": ie() }],
			"mask-image-b-to-pos": [{ "mask-b-to": ie() }],
			"mask-image-b-from-color": [{ "mask-b-from": I() }],
			"mask-image-b-to-color": [{ "mask-b-to": I() }],
			"mask-image-l-from-pos": [{ "mask-l-from": ie() }],
			"mask-image-l-to-pos": [{ "mask-l-to": ie() }],
			"mask-image-l-from-color": [{ "mask-l-from": I() }],
			"mask-image-l-to-color": [{ "mask-l-to": I() }],
			"mask-image-x-from-pos": [{ "mask-x-from": ie() }],
			"mask-image-x-to-pos": [{ "mask-x-to": ie() }],
			"mask-image-x-from-color": [{ "mask-x-from": I() }],
			"mask-image-x-to-color": [{ "mask-x-to": I() }],
			"mask-image-y-from-pos": [{ "mask-y-from": ie() }],
			"mask-image-y-to-pos": [{ "mask-y-to": ie() }],
			"mask-image-y-from-color": [{ "mask-y-from": I() }],
			"mask-image-y-to-color": [{ "mask-y-to": I() }],
			"mask-image-radial": [{ "mask-radial": [J, q] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": ie() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": ie() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": I() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": I() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [K] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": ie() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": ie() }],
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
				J,
				q
			] }],
			filter: [{ filter: [
				"",
				"none",
				J,
				q
			] }],
			blur: [{ blur: ae() }],
			brightness: [{ brightness: [
				K,
				J,
				q
			] }],
			contrast: [{ contrast: [
				K,
				J,
				q
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				ni,
				Xr
			] }],
			"drop-shadow-color": [{ "drop-shadow": I() }],
			grayscale: [{ grayscale: [
				"",
				K,
				J,
				q
			] }],
			"hue-rotate": [{ "hue-rotate": [
				K,
				J,
				q
			] }],
			invert: [{ invert: [
				"",
				K,
				J,
				q
			] }],
			saturate: [{ saturate: [
				K,
				J,
				q
			] }],
			sepia: [{ sepia: [
				"",
				K,
				J,
				q
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				J,
				q
			] }],
			"backdrop-blur": [{ "backdrop-blur": ae() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				K,
				J,
				q
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				K,
				J,
				q
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				K,
				J,
				q
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				K,
				J,
				q
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				K,
				J,
				q
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				K,
				J,
				q
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				K,
				J,
				q
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				K,
				J,
				q
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
				J,
				q
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				K,
				"initial",
				J,
				q
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				J,
				q
			] }],
			delay: [{ delay: [
				K,
				J,
				q
			] }],
			animate: [{ animate: [
				"none",
				v,
				J,
				q
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				J,
				q
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: V() }],
			"rotate-x": [{ "rotate-x": V() }],
			"rotate-y": [{ "rotate-y": V() }],
			"rotate-z": [{ "rotate-z": V() }],
			scale: [{ scale: oe() }],
			"scale-x": [{ "scale-x": oe() }],
			"scale-y": [{ "scale-y": oe() }],
			"scale-z": [{ "scale-z": oe() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: H() }],
			"skew-x": [{ "skew-x": H() }],
			"skew-y": [{ "skew-y": H() }],
			transform: [{ transform: [
				J,
				q,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: U() }],
			"translate-x": [{ "translate-x": U() }],
			"translate-y": [{ "translate-y": U() }],
			"translate-z": [{ "translate-z": U() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Nr,
				J,
				q
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
				J,
				q
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
				J,
				q
			] }],
			fill: [{ fill: ["none", ...I()] }],
			"stroke-w": [{ stroke: [
				K,
				Zr,
				Wr,
				Gr
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
function Y(...e) {
	return mi(Bn(e));
}
// node_modules/react/cjs/react-jsx-runtime.production.js
var hi = /* @__PURE__ */ o(((e) => {
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
})), X = (/* @__PURE__ */ o(((e, t) => {
	t.exports = hi();
})))(), gi = Un("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
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
function Z({ className: e, variant: t = "default", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, X.jsx)(Rn, {
		"data-slot": "button",
		className: Y(gi({
			variant: t,
			size: n,
			className: e
		})),
		...r
	});
}
// src/components/client/connection-status.tsx
function _i({ title: e, detail: t, percent: n, onClose: r }) {
	let i = n === 100;
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		role: "status",
		className: "w-full rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-sm",
		children: [/* @__PURE__ */ (0, X.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [
				i ? /* @__PURE__ */ (0, X.jsx)(F, { className: "mt-0.5 size-4 shrink-0" }) : /* @__PURE__ */ (0, X.jsx)(_e, { className: "mt-0.5 size-4 shrink-0 motion-safe:animate-spin" }),
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
				/* @__PURE__ */ (0, X.jsx)(Z, {
					size: "icon-sm",
					variant: "ghost",
					"aria-label": "Fechar notificação",
					onClick: r,
					children: /* @__PURE__ */ (0, X.jsx)(lt, {})
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
var vi = /* @__PURE__ */ o(((e) => {
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
})), yi = /* @__PURE__ */ o(((e, t) => {
	t.exports = vi();
})), bi = /* @__PURE__ */ o(((e) => {
	var t = u();
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
	function d(e, t) {
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
			var n = t.as, r = d(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
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
					var n = d(t.as, t.crossOrigin);
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
			var n = t.as, r = d(n, t.crossOrigin);
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
				var n = d(t.as, t.crossOrigin);
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
})), xi = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = bi();
})), Si = /* @__PURE__ */ o(((e) => {
	var t = yi(), n = u(), r = xi();
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
	function f(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = f(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function p(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && p(e.child, t, n, r, i, a)) return !0;
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
	var T = Object.assign, E = Symbol.for("react.element"), D = Symbol.for("react.transitional.element"), O = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), M = Symbol.for("react.consumer"), N = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), I = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), z = Symbol.for("react.activity"), ee = Symbol.for("react.legacy_hidden"), B = Symbol.for("react.memo_cache_sentinel"), te = Symbol.for("react.view_transition"), ne = Symbol.for("react.recoverable"), re = Symbol.iterator;
	function ie(e) {
		return typeof e != "object" || !e ? null : (e = re && e[re] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ae = Symbol.for("react.client.reference");
	function V(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ae ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case k: return "Fragment";
			case j: return "Profiler";
			case A: return "StrictMode";
			case F: return "Suspense";
			case I: return "SuspenseList";
			case z: return "Activity";
			case te: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case O: return "Portal";
			case N: return e.displayName || "Context";
			case M: return (e._context.displayName || "Context") + ".Consumer";
			case P:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case L: return t = e.displayName || null, t === null ? V(e.type) || "Memo" : t;
			case R:
				t = e._payload, e = e._init;
				try {
					return V(e(t));
				} catch {}
		}
		return null;
	}
	var oe = Array.isArray, H = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = {
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
		var e = U.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ch(e.type)) : e;
	}
	function pt(e, t) {
		var n = U.p;
		try {
			return U.p = e, t();
		} finally {
			U.p = n;
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
	function W(e, t, n) {
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
	function G(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Wt(e, t, n) {
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
	function Gt(e) {
		if (!e._valueTracker) {
			var t = G(e) ? "checked" : "value";
			e._valueTracker = Wt(e, t, "" + e[t]);
		}
	}
	function Kt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = G(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var qt = /[\n"\\]/g;
	function Jt(e) {
		return e.replace(qt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Yt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ut(t)) : e.value !== "" + Ut(t) && (e.value = "" + Ut(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Zt(e, Ut(n)) : o === "number" && e.value == t ? Zt(e, Ut(e.value)) : Zt(e, Ut(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Ut(s) : e.removeAttribute("name");
	}
	function Xt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Gt(e);
				return;
			}
			n = n == null ? "" : "" + Ut(n), t = t == null ? n : "" + Ut(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Gt(e);
	}
	function Zt(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function Qt(e, t, n, r) {
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
	function $t(e, t, n) {
		t != null && (t = "" + Ut(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + Ut(n);
	}
	function en(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (oe(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Ut(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Gt(e);
	}
	function tn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var nn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function rn(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || nn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function an(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", zt = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (rn(e, a, r), zt = !0);
		} else for (var o in t) t.hasOwnProperty(o) && rn(e, o, t[o]);
	}
	function on(e) {
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
	var sn = /* @__PURE__ */ new Map([
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
	]), cn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function ln(e) {
		return cn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function un() {}
	var dn = null;
	function fn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var pn = null, mn = null;
	function hn(e) {
		var t = Et(e);
		if (t && (e = t.stateNode)) {
			var n = e[gt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Yt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Jt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[gt] || null;
								if (!a) throw Error(i(90));
								Yt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Kt(r);
					}
					break a;
				case "textarea":
					$t(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Qt(e, !!n.multiple, t, !1);
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
			if (gn = !1, (pn !== null || mn !== null) && (Id(), pn && (t = pn, e = mn, mn = pn = null, hn(t), e))) for (t = 0; t < e.length; t++) hn(e[t]);
		}
	}
	function vn(e, t) {
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
	var yn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, bn = !1;
	if (yn) try {
		var xn = {};
		Object.defineProperty(xn, "passive", { get: function() {
			bn = !0;
		} }), window.addEventListener("test", xn, xn), window.removeEventListener("test", xn, xn);
	} catch {
		bn = !1;
	}
	var Sn = null, Cn = null, wn = null;
	function Tn() {
		if (wn) return wn;
		var e, t = Cn, n = t.length, r, i = "value" in Sn ? Sn.value : Sn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return wn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function En(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function Dn() {
		return !0;
	}
	function On() {
		return !1;
	}
	function kn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Dn : On, this.isPropagationStopped = On, this;
		}
		return T(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Dn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Dn);
			},
			persist: function() {},
			isPersistent: Dn
		}), t;
	}
	var An = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, jn = kn(An), Mn = T({}, An, {
		view: 0,
		detail: 0
	}), Nn = kn(Mn), Pn, Fn, In, Ln = T({}, Mn, {
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
		getModifierState: Jn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== In && (In && e.type === "mousemove" ? (Pn = e.screenX - In.screenX, Fn = e.screenY - In.screenY) : Fn = Pn = 0, In = e), Pn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Fn;
		}
	}), Rn = kn(Ln), zn = kn(T({}, Ln, { dataTransfer: 0 })), Bn = kn(T({}, Mn, { relatedTarget: 0 })), Vn = kn(T({}, An, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Hn = kn(T({}, An, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Un = kn(T({}, An, { data: 0 })), Wn = {
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
	}, Gn = {
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
	}, Kn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function qn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Kn[e]) ? !!t[e] : !1;
	}
	function Jn() {
		return qn;
	}
	var Yn = kn(T({}, Mn, {
		key: function(e) {
			if (e.key) {
				var t = Wn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = En(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Gn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Jn,
		charCode: function(e) {
			return e.type === "keypress" ? En(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? En(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Xn = kn(T({}, Ln, {
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
	})), Zn = kn(T({}, An, { submitter: 0 })), Qn = kn(T({}, Mn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Jn
	})), $n = kn(T({}, An, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), er = kn(T({}, Ln, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), tr = kn(T({}, An, {
		newState: 0,
		oldState: 0,
		source: 0
	})), nr = [
		9,
		13,
		27,
		32
	], rr = yn && "CompositionEvent" in window, ir = null;
	yn && "documentMode" in document && (ir = document.documentMode);
	var ar = yn && "TextEvent" in window && !ir, or = yn && (!rr || ir && 8 < ir && 11 >= ir), sr = " ", cr = !1;
	function lr(e, t) {
		switch (e) {
			case "keyup": return nr.indexOf(t.keyCode) !== -1;
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
		if (dr) return e === "compositionend" || !rr && lr(e, t) ? (e = Tn(), wn = Cn = Sn = null, dr = !1, e) : null;
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
		pn ? mn ? mn.push(r) : mn = [r] : pn = r, t = qf(t, "onChange"), 0 < t.length && (n = new jn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var _r = null, vr = null;
	function yr(e) {
		zf(e, 0);
	}
	function br(e) {
		if (Kt(Dt(e))) return e;
	}
	function xr(e, t) {
		if (e === "change") return t;
	}
	var Sr = !1;
	if (yn) {
		var Cr;
		if (yn) {
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
			gr(t, vr, e, fn(e)), _n(yr, t);
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
	var K = typeof Object.is == "function" ? Object.is : Mr;
	function Nr(e, t) {
		if (K(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Oe.call(t, i) || !K(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Pr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Fr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Ir(e, t) {
		var n = Fr(e);
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
			n = Fr(n);
		}
	}
	function Lr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Lr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Rr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Pr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Pr(e.document);
		}
		return t;
	}
	function zr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Br = yn && "documentMode" in document && 11 >= document.documentMode, Vr = null, Hr = null, Ur = null, q = !1;
	function Wr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		q || Vr == null || Vr !== Pr(r) || (r = Vr, "selectionStart" in r && zr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Ur && Nr(Ur, r) || (Ur = r, r = qf(Hr, "onSelect"), 0 < r.length && (t = new jn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Vr)));
	}
	function Gr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Kr = {
		animationend: Gr("Animation", "AnimationEnd"),
		animationiteration: Gr("Animation", "AnimationIteration"),
		animationstart: Gr("Animation", "AnimationStart"),
		transitionrun: Gr("Transition", "TransitionRun"),
		transitionstart: Gr("Transition", "TransitionStart"),
		transitioncancel: Gr("Transition", "TransitionCancel"),
		transitionend: Gr("Transition", "TransitionEnd")
	}, qr = {}, Jr = {};
	yn && (Jr = document.createElement("div").style, "AnimationEvent" in window || (delete Kr.animationend.animation, delete Kr.animationiteration.animation, delete Kr.animationstart.animation), "TransitionEvent" in window || delete Kr.transitionend.transition);
	function Yr(e) {
		if (qr[e]) return qr[e];
		if (!Kr[e]) return e;
		var t = Kr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Jr) return qr[e] = t[n];
		return e;
	}
	var Xr = Yr("animationend"), J = Yr("animationiteration"), Zr = Yr("animationstart"), Qr = Yr("transitionrun"), $r = Yr("transitionstart"), ei = Yr("transitioncancel"), ti = Yr("transitionend"), ni = /* @__PURE__ */ new Map(), ri = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	ri.push("scrollEnd");
	function ii(e, t) {
		ni.set(e, t), Nt(t, [e]);
	}
	var ai = 0;
	function oi(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = _d.identifierPrefix;
		var n = ai++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function si(e) {
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
			a !== 0 && X(n, i, a);
		}
	}
	function mi(e, t, n, r) {
		ui[di++] = e, ui[di++] = t, ui[di++] = n, ui[di++] = r, fi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Y(e, t, n, r) {
		return mi(e, t, n, r), gi(e);
	}
	function hi(e, t) {
		return mi(e, null, null, t), gi(e);
	}
	function X(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ge(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function gi(e) {
		if (50 < Ed) throw Ed = 0, Dd = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Z = {};
	function _i(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function vi(e, t, n, r) {
		return new _i(e, t, n, r);
	}
	function bi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Si(e, t) {
		var n = e.alternate;
		return n === null ? (n = vi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Ci(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function wi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") bi(r) && (s = 1);
		else if (typeof r == "string") s = qm(e, n, pe.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case z: return e = vi(31, n, t, a), e.elementType = z, e.lanes = o, e;
			case k: return Ti(n.children, a, o, t);
			case A:
				s = 8, a |= 24;
				break;
			case j: return e = vi(12, n, t, a | 2), e.elementType = j, e.lanes = o, e;
			case F: return e = vi(13, n, t, a), e.elementType = F, e.lanes = o, e;
			case I: return e = vi(19, n, t, a), e.elementType = I, e.lanes = o, e;
			case ee:
			case te: return e = a | 32, e = vi(30, n, t, e), e.elementType = te, e.lanes = o, e.stateNode = {
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
		return t = vi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function Ti(e, t, n, r) {
		return e = vi(7, e, r, t), e.lanes = n, e;
	}
	function Ei(e, t, n) {
		return e = vi(6, e, null, t), e.lanes = n, e;
	}
	function Di(e) {
		var t = vi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Oi(e, t, n) {
		return t = vi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var ki = /* @__PURE__ */ new WeakMap();
	function Ai(e, t) {
		if (typeof e == "object" && e) {
			var n = ki.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: De(t)
			}, ki.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: De(t)
		};
	}
	var ji = [], Mi = 0, Ni = null, Pi = 0, Fi = [], Ii = 0, Li = null, Ri = 1, zi = "";
	function Bi(e, t) {
		ji[Mi++] = Pi, ji[Mi++] = Ni, Ni = e, Pi = t;
	}
	function Vi(e, t, n) {
		Fi[Ii++] = Ri, Fi[Ii++] = zi, Fi[Ii++] = Li, Li = e;
		var r = Ri;
		e = zi;
		var i = 32 - Ge(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ge(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ri = 1 << 32 - Ge(t) + i | n << i | r, zi = a + e;
		} else Ri = 1 << a | n << i | r, zi = e;
	}
	function Hi(e) {
		e.return !== null && (Bi(e, 1), Vi(e, 1, 0));
	}
	function Ui(e) {
		for (; e === Ni;) Ni = ji[--Mi], ji[Mi] = null, Pi = ji[--Mi], ji[Mi] = null;
		for (; e === Li;) Li = Fi[--Ii], Fi[Ii] = null, zi = Fi[--Ii], Fi[Ii] = null, Ri = Fi[--Ii], Fi[Ii] = null;
	}
	function Wi(e, t) {
		Fi[Ii++] = Ri, Fi[Ii++] = zi, Fi[Ii++] = Li, Ri = t.id, zi = t.overflow, Li = e;
	}
	var Gi = null, Ki = null, qi = !1, Ji = null, Yi = !1, Xi = Error(i(519));
	function Zi(e) {
		throw ra(Ai(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Xi;
	}
	function Qi(e) {
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
				Bf("invalid", t), Xt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Bf("invalid", t);
				break;
			case "textarea": Bf("invalid", t), en(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || $f(t.textContent, n) ? (r.popover != null && (Bf("beforetoggle", t), Bf("toggle", t)), r.onScroll != null && Bf("scroll", t), r.onScrollEnd != null && Bf("scrollend", t), r.onClick != null && (t.onclick = un), t = !0) : t = !1, t || Zi(e, !0);
	}
	function $i(e) {
		for (Gi = e.return; Gi;) switch (Gi.tag) {
			case 5:
			case 31:
			case 13:
				Yi = !1;
				return;
			case 27:
			case 3:
				Yi = !0;
				return;
			default: Gi = Gi.return;
		}
	}
	function ea(e) {
		if (e !== Gi) return !1;
		if (!qi) return $i(e), qi = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || pp(e.type, e.memoizedProps)), n = !n), n && Ki && Zi(e), $i(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ki = dm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ki = dm(e);
		} else t === 27 ? (t = Ki, Sp(e.type) ? (e = um, um = null, Ki = e) : Ki = t) : Ki = Gi ? lm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function ta() {
		Ki = Gi = null, qi = !1;
	}
	function na() {
		var e = Ji;
		return e !== null && (ld === null ? ld = e : ld.push.apply(ld, e), Ji = null), e;
	}
	function ra(e) {
		Ji === null ? Ji = [e] : Ji.push(e);
	}
	var ia = ue(null), aa = null, oa = null;
	function sa(e, t, n) {
		fe(ia, t._currentValue), t._currentValue = n;
	}
	function ca(e) {
		e._currentValue = ia.current, de(ia);
	}
	function la(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ua(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), la(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), la(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), la(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
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
	function da(e, t, n, r) {
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
					K(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ge.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [sh] : e.push(sh));
			}
			a = a.return;
		}
		return e !== null && ua(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function fa(e) {
		for (e = e.firstContext; e !== null;) {
			if (!K(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function pa(e) {
		aa = e, oa = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function ma(e) {
		return ga(aa, e);
	}
	function ha(e, t) {
		return aa === null && pa(e), ga(e, t);
	}
	function ga(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, oa === null) {
			if (e === null) throw Error(i(308));
			oa = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else oa = oa.next = t;
		return n;
	}
	var _a = typeof AbortController < "u" ? AbortController : function() {
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
	}, va = t.unstable_scheduleCallback, ya = t.unstable_NormalPriority, ba = {
		$$typeof: N,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function xa() {
		return {
			controller: new _a(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Sa(e) {
		e.refCount--, e.refCount === 0 && va(ya, function() {
			e.controller.abort();
		});
	}
	function Ca(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var wa = null;
	function Ta(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var Ea = null, Da = 0, Oa = 0, ka = null;
	function Aa(e, t) {
		if (Ea === null) {
			var n = Ea = [];
			Da = 0, Oa = Mf(), ka = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return Da++, t.then(ja, ja), t;
	}
	function ja() {
		if (--Da === 0 && (wa = null, Ea !== null)) {
			ka !== null && (ka.status = "fulfilled");
			var e = Ea;
			Ea = null, Oa = 0, ka = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Ma(e, t) {
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
	var Na = H.S;
	H.S = function(e, t) {
		if (fd = Ne(), typeof t == "object" && t && typeof t.then == "function" && Aa(e, t), wa !== null) for (var n = vf; n !== null;) Ca(n, wa), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = vf; r !== null;) Ca(r, n), r = r.next;
			if (Oa !== 0) {
				r = wa, r === null && (r = wa = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Na !== null && Na(e, t);
	};
	var Pa = ue(null);
	function Fa() {
		var e = Pa.current;
		return e === null ? qu.pooledCache : e;
	}
	function Ia(e, t) {
		t === null ? fe(Pa, Pa.current) : fe(Pa, t.pool);
	}
	function La() {
		var e = Fa();
		return e === null ? null : {
			parent: ba._currentValue,
			pool: e
		};
	}
	var Ra = Error(i(460)), za = Error(i(474)), Ba = Error(i(542)), Va = { then: function() {} };
	function Ha(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ua(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(un, un), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, qa(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(un, un);
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
					case "rejected": throw e = t.reason, qa(e), e;
				}
				throw Ga = t, Ra;
		}
	}
	function Wa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Ga = e, Ra) : e;
		}
	}
	var Ga = null;
	function Ka() {
		if (Ga === null) throw Error(i(459));
		var e = Ga;
		return Ga = null, e;
	}
	function qa(e) {
		if (e === Ra || e === Ba) throw Error(i(483));
	}
	var Ja = null, Ya = 0;
	function Xa(e) {
		var t = Ya;
		return Ya += 1, Ja === null && (Ja = []), Ua(Ja, e, t);
	}
	function Za(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Qa(e, t) {
		throw t.$$typeof === E ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function $a(e) {
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
			return e = Si(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Ei(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === k ? (e = d(e, t, n.props.children, r, n.key), Za(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === R && Wa(i) === t.type) ? (t = a(t, n.props), Za(t, n), t.return = e, t) : (t = wi(n.type, n.key, n.props, null, e.mode, r), Za(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Oi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = Ti(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Ei("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case D: return n = wi(t.type, t.key, t.props, null, e.mode, n), Za(n, t), n.return = e, n;
					case O: return t = Oi(t, e.mode, n), t.return = e, t;
					case R: return t = Wa(t), f(e, t, n);
				}
				if (oe(t) || ie(t)) return t = Ti(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Xa(t), n);
				if (t.$$typeof === N) return f(e, ha(e, t), n);
				Qa(e, t);
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
					case R: return n = Wa(n), p(e, t, n, r);
				}
				if (oe(n) || ie(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Xa(n), r);
				if (n.$$typeof === N) return p(e, t, ha(e, n), r);
				Qa(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case D: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case O: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case R: return r = Wa(r), m(e, t, n, r, i);
				}
				if (oe(r) || ie(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Xa(r), i);
				if (r.$$typeof === N) return m(e, t, n, ha(t, r), i);
				Qa(t, r);
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
			if (h === s.length) return n(i, d), qi && Bi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return qi && Bi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), qi && Bi(i, h), l;
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
			if (v.done) return n(a, h), qi && Bi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return qi && Bi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), qi && Bi(a, g), u;
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
											n(e, r.sibling), c = a(r, o.props.children), Za(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === R && Wa(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Za(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === k ? (c = Ti(o.props.children, e.mode, c, o.key), Za(c, o), c.return = e, e = c) : (c = wi(o.type, o.key, o.props, null, e.mode, c), Za(c, o), c.return = e, e = c);
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
							c = Oi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case R: return o = Wa(o), _(e, r, o, c);
				}
				if (oe(o)) return h(e, r, o, c);
				if (ie(o)) {
					if (l = ie(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, Xa(o), c);
				if (o.$$typeof === N) return _(e, r, ha(e, o), c);
				Qa(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Ei(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ya = 0;
				var i = _(e, t, n, r);
				return Ja = null, i;
			} catch (t) {
				if (t === Ra || t === Ba) throw t;
				var a = vi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var eo = $a(!0), to = $a(!1), no = !1;
	function ro(e) {
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
	function io(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function ao(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function oo(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Ku & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = gi(e), X(e, null, n), t;
		}
		return mi(e, r, t, n), gi(e);
	}
	function so(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ct(e, n);
		}
	}
	function co(e, t) {
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
	var lo = !1;
	function uo() {
		if (lo) {
			var e = ka;
			if (e !== null) throw e;
		}
	}
	function fo(e, t, n, r) {
		lo = !1;
		var i = e.updateQueue;
		no = !1;
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
					f !== 0 && f === Oa && (lo = !0), u !== null && (u = u.next = {
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
							case 2: no = !0;
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
	function mo(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) po(n[e], t);
	}
	var ho = ue(null), go = ue(0);
	function _o(e, t) {
		e = td, fe(go, e), fe(ho, t), td = e | t.baseLanes;
	}
	function vo() {
		fe(go, td), fe(ho, ho.current);
	}
	function yo() {
		td = go.current, de(ho), de(go);
	}
	var bo = ue(null), xo = null;
	function So(e) {
		var t = e.alternate;
		fe(Do, Do.current & 1), fe(bo, e), xo === null && (t === null || ho.current !== null || t.memoizedState !== null) && (xo = e);
	}
	function Co(e) {
		fe(Do, Do.current), fe(bo, e), xo === null && (xo = e);
	}
	function wo(e) {
		e.tag === 22 ? (fe(Do, Do.current), fe(bo, e), xo === null && (xo = e)) : To();
	}
	function To() {
		fe(Do, Do.current), fe(bo, bo.current);
	}
	function Eo(e) {
		de(bo), xo === e && (xo = null), de(Do);
	}
	var Do = ue(0);
	function Q(e, t) {
		fe(bo, bo.current), fe(Do, t);
	}
	function Oo(e) {
		de(Do), de(bo), xo === e && (xo = null);
	}
	function ko(e) {
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
	var Ao = 0, jo = null, Mo = null, No = null, Po = !1, Fo = !1, Io = !1, Lo = 0, Ro = 0, zo = null, Bo = 0;
	function Vo() {
		throw Error(i(321));
	}
	function Ho(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!K(e[n], t[n])) return !1;
		return !0;
	}
	function Uo(e, t, n, r, i, a) {
		return Ao = a, jo = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, H.H = e === null || e.memoizedState === null ? ac : oc, Io = !1, a = n(r, i), Io = !1, Fo && (a = Go(t, n, r, i)), Wo(e), a;
	}
	function Wo(e) {
		H.H = ic;
		var t = Mo !== null && Mo.next !== null;
		if (Ao = 0, No = Mo = jo = null, Po = !1, Ro = 0, zo = null, t) throw Error(i(300));
		e === null || Cc || (e = e.dependencies, e !== null && fa(e) && (Cc = !0));
	}
	function Go(e, t, n, r) {
		jo = e;
		var a = 0;
		do {
			if (Fo && (zo = null), Ro = 0, Fo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, No = Mo = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			H.H = sc, o = t(n, r);
		} while (Fo);
		return o;
	}
	function Ko() {
		var e = H.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? $o(t) : t, e = e.useState()[0], (Mo === null ? null : Mo.memoizedState) !== e && (jo.flags |= 1024), t;
	}
	function qo() {
		var e = Lo !== 0;
		return Lo = 0, e;
	}
	function Jo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Yo(e) {
		if (Po) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Po = !1;
		}
		Ao = 0, No = Mo = jo = null, Fo = !1, Ro = Lo = 0, zo = null;
	}
	function Xo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return No === null ? jo.memoizedState = No = e : No = No.next = e, No;
	}
	function Zo() {
		if (Mo === null) {
			var e = jo.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = Mo.next;
		var t = No === null ? jo.memoizedState : No.next;
		if (t !== null) No = t, Mo = e;
		else {
			if (e === null) throw jo.alternate === null ? Error(i(467)) : Error(i(310));
			Mo = e, e = {
				memoizedState: Mo.memoizedState,
				baseState: Mo.baseState,
				baseQueue: Mo.baseQueue,
				queue: Mo.queue,
				next: null
			}, No === null ? jo.memoizedState = No = e : No = No.next = e;
		}
		return No;
	}
	function Qo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function $o(e) {
		var t = Ro;
		return Ro += 1, zo === null && (zo = []), e = Ua(zo, e, t), t = jo, (No === null ? t.memoizedState : No.next) === null && (t = t.alternate, H.H = t === null || t.memoizedState === null ? ac : oc), e;
	}
	function es(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return $o(e);
			if (e.$$typeof === ne) return;
			if (e.$$typeof === N) return ma(e);
		}
		throw Error(i(438, String(e)));
	}
	function ts(e) {
		var t = null, n = jo.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = jo.alternate;
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
		}, n === null && (n = Qo(), jo.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = B;
		return t.index++, n;
	}
	function ns(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function rs(e) {
		return $(Zo(), Mo, e);
	}
	function $(e, t, n) {
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
				if (f === u.lane ? (Ao & f) === f : (Yu & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Oa && (d = !0);
					else if ((Ao & p) === p) {
						u = u.next, p === Oa && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, jo.lanes |= p, rd |= p;
					f = u.action, Io && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, jo.lanes |= f, rd |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !K(o, e.memoizedState) && (Cc = !0, d && (n = ka, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function is(e) {
		var t = Zo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			K(o, t.memoizedState) || (Cc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function as(e, t, n) {
		var r = jo, a = Zo(), o = qi;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !K((Mo || a).memoizedState, n);
		if (s && (a.memoizedState = n, Cc = !0), a = a.queue, As(cs.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || No !== null && !!(No.memoizedState.tag & 1), Ts(e ? 9 : 8, { destroy: void 0 }, ss.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, qu === null) throw Error(i(349));
			o || Ao & 127 || os(r, t, n);
		}
		return n;
	}
	function os(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = jo.updateQueue, t === null ? (t = Qo(), jo.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function ss(e, t, n, r) {
		t.value = n, t.getSnapshot = r, ls(t) && us(e);
	}
	function cs(e, t, n) {
		return n(function() {
			ls(t) && us(e);
		});
	}
	function ls(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !K(e, n);
		} catch {
			return !0;
		}
	}
	function us(e) {
		var t = hi(e, 2);
		t !== null && jd(t, e, 2);
	}
	function ds(e) {
		var t = Xo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Io) {
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
			lastRenderedReducer: ns,
			lastRenderedState: e
		}, t;
	}
	function fs(e, t, n, r) {
		return e.baseState = n, $(e, Mo, typeof r == "function" ? r : ns);
	}
	function ps(e, t, n, r, a) {
		if (tc(e)) throw Error(i(485));
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
			H.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, ms(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function ms(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = H.T, o = {};
			o.types = a === null ? null : a.types, H.T = o;
			try {
				var s = n(i, r), c = H.S;
				c !== null && c(o, s), hs(e, t, s);
			} catch (n) {
				_s(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), H.T = a;
			}
		} else try {
			a = n(i, r), hs(e, t, a);
		} catch (n) {
			_s(e, t, n);
		}
	}
	function hs(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			gs(e, t, n);
		}, function(n) {
			return _s(e, t, n);
		}) : gs(e, t, n);
	}
	function gs(e, t, n) {
		t.status = "fulfilled", t.value = n, vs(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, ms(e, n)));
	}
	function _s(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, vs(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function vs(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function ys(e, t) {
		return t;
	}
	function bs(e, t) {
		if (qi) {
			var n = qu.formState;
			if (n !== null) {
				a: {
					var r = jo;
					if (qi) {
						if (Ki) {
							b: {
								for (var i = Ki, a = Yi; i.nodeType !== 8;) if (!a || (i = lm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Ki = lm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Zi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Xo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ys,
			lastRenderedState: t
		}, n.queue = r, n = Qs.bind(null, jo, r), r.dispatch = n, r = ds(!1), a = ec.bind(null, jo, !1, r.queue), r = Xo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = ps.bind(null, jo, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function xs(e) {
		return Ss(Zo(), Mo, e);
	}
	function Ss(e, t, n) {
		if (t = $(e, t, ys)[0], e = rs(ns)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = $o(t);
		} catch (e) {
			throw e === Ra ? Ba : e;
		}
		else r = t;
		t = Zo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (jo.flags |= 2048, Ts(9, { destroy: void 0 }, Cs.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Cs(e, t) {
		e.action = t;
	}
	function ws(e) {
		var t = Zo(), n = Mo;
		if (n !== null) return Ss(t, n, e);
		Zo(), t = t.memoizedState, n = Zo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Ts(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = jo.updateQueue, t === null && (t = Qo(), jo.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Es() {
		return Zo().memoizedState;
	}
	function Ds(e, t, n, r) {
		var i = Xo();
		jo.flags |= e, i.memoizedState = Ts(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Os(e, t, n, r) {
		var i = Zo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		Mo !== null && r !== null && Ho(r, Mo.memoizedState.deps) ? i.memoizedState = Ts(t, a, n, r) : (jo.flags |= e, i.memoizedState = Ts(1 | t, a, n, r));
	}
	function ks(e, t) {
		Ds(8390656, 8, e, t);
	}
	function As(e, t) {
		Os(2048, 8, e, t);
	}
	function js(e) {
		jo.flags |= 4;
		var t = jo.updateQueue;
		if (t === null) t = Qo(), jo.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Ms(e) {
		var t = Zo().memoizedState;
		return js({
			ref: t,
			nextImpl: e
		}), function() {
			if (Ku & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Ns(e, t) {
		return Os(4, 2, e, t);
	}
	function Ps(e, t) {
		return Os(4, 4, e, t);
	}
	function Fs(e, t) {
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
	function Is(e, t, n) {
		n = n == null ? null : n.concat([e]), Os(4, 4, Fs.bind(null, t, e), n);
	}
	function Ls() {}
	function Rs(e, t) {
		var n = Zo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Ho(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function zs(e, t) {
		var n = Zo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Ho(t, r[1])) return r[0];
		if (r = e(), Io) {
			We(!0);
			try {
				e();
			} finally {
				We(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Bs(e, t, n) {
		return n === void 0 || Ao & 1073741824 && !(Yu & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = kd(), jo.lanes |= e, rd |= e, n);
	}
	function Vs(e, t, n, r) {
		return K(n, t) ? n : ho.current === null ? !(Ao & 106) || Ao & 1073741824 && !(Yu & 261930) ? (Cc = !0, e.memoizedState = n) : (e = kd(), jo.lanes |= e, rd |= e, t) : (e = Bs(e, n, r), K(e, t) || (Cc = !0), e);
	}
	function Hs(e, t, n, r, i) {
		var a = U.p;
		U.p = a !== 0 && 8 > a ? a : 8;
		var o = H.T, s = {};
		s.types = o === null ? null : o.types, H.T = s, ec(e, !1, t, n);
		try {
			var c = i(), l = H.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? $s(e, t, Ma(c, r), Od(e)) : $s(e, t, r, Od(e));
		} catch (n) {
			$s(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Od());
		} finally {
			U.p = a, o !== null && s.types !== null && (o.types = s.types), H.T = o;
		}
	}
	function Us() {}
	function Ws(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Gs(e).queue;
		Hs(e, a, t, se, n === null ? Us : function() {
			return Ks(e), n(r);
		});
	}
	function Gs(e) {
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
				lastRenderedReducer: ns,
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
				lastRenderedReducer: ns,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Ks(e) {
		var t = Gs(e);
		t.next === null && (t = e.alternate.memoizedState), $s(e, t.next.queue, {}, Od());
	}
	function qs() {
		return ma(sh);
	}
	function Js() {
		return Zo().memoizedState;
	}
	function Ys() {
		return Zo().memoizedState;
	}
	function Xs(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Od();
					e = ao(n);
					var r = oo(t, e, n);
					r !== null && (jd(r, t, n), so(r, t, n)), t = { cache: xa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Zs(e, t, n) {
		var r = Od();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, tc(e) ? nc(t, n) : (n = Y(e, t, n, r), n !== null && (jd(n, e, r), rc(n, t, r)));
	}
	function Qs(e, t, n) {
		$s(e, t, n, Od());
	}
	function $s(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (tc(e)) nc(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, K(s, o)) return mi(e, t, i, 0), qu === null && pi(), !1;
			} catch {}
			if (n = Y(e, t, i, r), n !== null) return jd(n, e, r), rc(n, t, r), !0;
		}
		return !1;
	}
	function ec(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Mf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, tc(e)) {
			if (t) throw Error(i(479));
		} else t = Y(e, n, r, 2), t !== null && jd(t, e, 2);
	}
	function tc(e) {
		var t = e.alternate;
		return e === jo || t !== null && t === jo;
	}
	function nc(e, t) {
		Fo = Po = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function rc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ct(e, n);
		}
	}
	var ic = {
		readContext: ma,
		use: es,
		useCallback: Vo,
		useContext: Vo,
		useEffect: Vo,
		useImperativeHandle: Vo,
		useLayoutEffect: Vo,
		useInsertionEffect: Vo,
		useMemo: Vo,
		useReducer: Vo,
		useRef: Vo,
		useState: Vo,
		useDebugValue: Vo,
		useDeferredValue: Vo,
		useTransition: Vo,
		useSyncExternalStore: Vo,
		useId: Vo,
		useHostTransitionStatus: Vo,
		useFormState: Vo,
		useActionState: Vo,
		useOptimistic: Vo,
		useMemoCache: Vo,
		useCacheRefresh: Vo,
		useEffectEvent: Vo
	}, ac = {
		readContext: ma,
		use: es,
		useCallback: function(e, t) {
			return Xo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ma,
		useEffect: ks,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), Ds(4194308, 4, Fs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Ds(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			Ds(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Xo();
			t = t === void 0 ? null : t;
			var r = e();
			if (Io) {
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
			var r = Xo();
			if (n !== void 0) {
				var i = n(t);
				if (Io) {
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
			}, r.queue = e, e = e.dispatch = Zs.bind(null, jo, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Xo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = ds(e);
			var t = e.queue, n = Qs.bind(null, jo, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Ls,
		useDeferredValue: function(e, t) {
			return Bs(Xo(), e, t);
		},
		useTransition: function() {
			var e = ds(!1);
			return e = Hs.bind(null, jo, e.queue, !0, !1), Xo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = jo, a = Xo();
			if (qi) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), qu === null) throw Error(i(349));
				Yu & 127 || os(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ks(cs.bind(null, r, o, e), [e]), r.flags |= 2048, Ts(9, { destroy: void 0 }, ss.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Xo(), t = qu.identifierPrefix;
			if (qi) {
				var n = zi, r = Ri;
				n = (r & ~(1 << 32 - Ge(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Lo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Bo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: qs,
		useFormState: bs,
		useActionState: bs,
		useOptimistic: function(e) {
			var t = Xo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = ec.bind(null, jo, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: ts,
		useCacheRefresh: function() {
			return Xo().memoizedState = Xs.bind(null, jo);
		},
		useEffectEvent: function(e) {
			var t = Xo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Ku & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, oc = {
		readContext: ma,
		use: es,
		useCallback: Rs,
		useContext: ma,
		useEffect: As,
		useImperativeHandle: Is,
		useInsertionEffect: Ns,
		useLayoutEffect: Ps,
		useMemo: zs,
		useReducer: rs,
		useRef: Es,
		useState: function() {
			return rs(ns);
		},
		useDebugValue: Ls,
		useDeferredValue: function(e, t) {
			return Vs(Zo(), Mo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = rs(ns)[0], t = Zo().memoizedState;
			return [typeof e == "boolean" ? e : $o(e), t];
		},
		useSyncExternalStore: as,
		useId: Js,
		useHostTransitionStatus: qs,
		useFormState: xs,
		useActionState: xs,
		useOptimistic: function(e, t) {
			return fs(Zo(), Mo, e, t);
		},
		useMemoCache: ts,
		useCacheRefresh: Ys,
		useEffectEvent: Ms
	}, sc = {
		readContext: ma,
		use: es,
		useCallback: Rs,
		useContext: ma,
		useEffect: As,
		useImperativeHandle: Is,
		useInsertionEffect: Ns,
		useLayoutEffect: Ps,
		useMemo: zs,
		useReducer: is,
		useRef: Es,
		useState: function() {
			return is(ns);
		},
		useDebugValue: Ls,
		useDeferredValue: function(e, t) {
			var n = Zo();
			return Mo === null ? Bs(n, e, t) : Vs(n, Mo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = is(ns)[0], t = Zo().memoizedState;
			return [typeof e == "boolean" ? e : $o(e), t];
		},
		useSyncExternalStore: as,
		useId: Js,
		useHostTransitionStatus: qs,
		useFormState: ws,
		useActionState: ws,
		useOptimistic: function(e, t) {
			var n = Zo();
			return Mo === null ? (n.baseState = e, [e, n.queue.dispatch]) : fs(n, Mo, e, t);
		},
		useMemoCache: ts,
		useCacheRefresh: Ys,
		useEffectEvent: Ms
	};
	function cc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : T({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var lc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Od(), i = ao(r);
			i.payload = t, n != null && (i.callback = n), t = oo(e, i, r), t !== null && (jd(t, e, r), so(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Od(), i = ao(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = oo(e, i, r), t !== null && (jd(t, e, r), so(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Od(), r = ao(n);
			r.tag = 2, t != null && (r.callback = t), t = oo(e, r, n), t !== null && (jd(t, e, n), so(t, e, n));
		}
	};
	function uc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Nr(n, r) || !Nr(i, a) : !0;
	}
	function dc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && lc.enqueueReplaceState(t, t.state, null);
	}
	function fc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = T({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function pc(e) {
		li(e);
	}
	function mc(e) {
		console.error(e);
	}
	function hc(e) {
		li(e);
	}
	function gc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function _c(e, t, n) {
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
	function vc(e, t, n) {
		return n = ao(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			gc(e, t);
		}, n;
	}
	function yc(e) {
		return e = ao(e), e.tag = 3, e;
	}
	function bc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				_c(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			_c(t, n, r), typeof i != "function" && (hd === null ? hd = /* @__PURE__ */ new Set([this]) : hd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function xc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && da(t, n, a, !0), n = bo.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return xo === null ? Ud() : n.alternate === null && nd === 0 && (nd = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Va ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), ff(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Va ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), ff(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return ff(e, r, a), Ud(), !1;
		}
		if (qi) return t = bo.current, t === null ? (r !== Xi && (t = Error(i(423), { cause: r }), ra(Ai(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Ai(r, n), a = vc(e.stateNode, r, a), co(e, a), nd !== 4 && (nd = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Xi && (e = Error(i(422), { cause: r }), ra(Ai(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Ai(o, n), cd === null ? cd = [o] : cd.push(o), nd !== 4 && (nd = 2), t === null) return !0;
		r = Ai(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = vc(n.stateNode, r, e), co(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (hd === null || !hd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = yc(a), bc(a, e, n, r), co(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Sc = Error(i(461)), Cc = !1;
	function wc(e, t, n, r) {
		t.child = e === null ? to(t, null, n, r) : eo(t, e.child, n, r);
	}
	function Tc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return pa(t), r = Uo(e, t, n, o, a, i), s = qo(), e !== null && !Cc ? (Jo(e, t, i), $c(e, t, i)) : (qi && s && Hi(t), t.flags |= 1, wc(e, t, r, i), t.child);
	}
	function Ec(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !bi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, Dc(e, t, a, r, i)) : (e = wi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !el(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Nr : n, n(o, r) && e.ref === t.ref) return $c(e, t, i);
		}
		return t.flags |= 1, e = Si(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Dc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Nr(a, r) && e.ref === t.ref) {
				if (Cc = !1, t.pendingProps = r = a, el(e, i)) e.flags & 131072 && (Cc = !0);
				else return t.lanes = e.lanes, $c(e, t, i);
			}
		}
		return Fc(e, t, n, r, i);
	}
	function Oc(e, t, n, r) {
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
				return Ac(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Ia(t, a === null ? null : a.cachePool), a === null ? vo() : _o(t, a), wo(t);
			else return r = t.lanes = 536870912, Ac(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Ia(t, null), vo(), To()) : (Ia(t, a.cachePool), _o(t, a), To(), t.memoizedState = null);
		return wc(e, t, i, n), t.child;
	}
	function kc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Ac(e, t, n, r, i) {
		var a = Fa();
		return a = a === null ? null : {
			parent: ba._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Ia(t, null), vo(), wo(t), e !== null && da(e, t, r, !0), t.childLanes = i, null;
	}
	function jc(e, t) {
		return t = Wc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Mc(e, t, n) {
		return eo(t, e.child, null, n), e = jc(t, t.pendingProps), e.flags |= 2, Eo(t), t.memoizedState = null, e;
	}
	function Nc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (qi) {
				if (r.mode === "hidden") return e = jc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, kc(null, e);
				if (Co(t), (e = Ki) ? (e = am(e, Yi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Li === null ? null : {
						id: Ri,
						overflow: zi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Di(e), n.return = t, t.child = n, Gi = t, Ki = null)) : e = null, e === null) throw Zi(t);
				return t.lanes = 536870912, null;
			}
			return jc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Co(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Mc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Cc || da(e, t, n, !1), a = (n & e.childLanes) !== 0, Cc || a) {
				if (ho.current === null) {
					if (r = qu, r !== null && (s = lt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, hi(e, s), jd(r, e, s), Sc;
					Ud();
				}
				t = Mc(e, t, n);
			} else e = o.treeContext, Ki = lm(s.nextSibling), Gi = t, qi = !0, Ji = null, Yi = !1, e !== null && Wi(t, e), t = jc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Si(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Pc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Fc(e, t, n, r, i) {
		return pa(t), n = Uo(e, t, n, r, void 0, i), r = qo(), e !== null && !Cc ? (Jo(e, t, i), $c(e, t, i)) : (qi && r && Hi(t), t.flags |= 1, wc(e, t, n, i), t.child);
	}
	function Ic(e, t, n, r, i, a) {
		return pa(t), t.updateQueue = null, n = Go(t, r, n, i), Wo(e), r = qo(), e !== null && !Cc ? (Jo(e, t, a), $c(e, t, a)) : (qi && r && Hi(t), t.flags |= 1, wc(e, t, n, a), t.child);
	}
	function Lc(e, t, n, r, i) {
		if (pa(t), t.stateNode === null) {
			var a = Z, o = n.contextType;
			typeof o == "object" && o && (a = ma(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = lc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, ro(t), o = n.contextType, a.context = typeof o == "object" && o ? ma(o) : Z, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (cc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && lc.enqueueReplaceState(a, a.state, null), fo(t, r, a, i), uo(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = fc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Z, typeof u == "object" && u && (o = ma(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && dc(t, a, r, o), no = !1;
			var f = t.memoizedState;
			a.state = f, fo(t, r, a, i), uo(), l = t.memoizedState, s || f !== l || no ? (typeof d == "function" && (cc(t, n, d, r), l = t.memoizedState), (c = no || uc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, io(e, t), o = t.memoizedProps, u = fc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Z, typeof l == "object" && l && (c = ma(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && dc(t, a, r, c), no = !1, f = t.memoizedState, a.state = f, fo(t, r, a, i), uo();
			var p = t.memoizedState;
			o !== d || f !== p || no || e !== null && e.dependencies !== null && fa(e.dependencies) ? (typeof s == "function" && (cc(t, n, s, r), p = t.memoizedState), (u = no || uc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && fa(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Pc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = eo(t, e.child, null, i), t.child = eo(t, null, n, i)) : wc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = $c(e, t, i), e;
	}
	function Rc(e, t, n, r) {
		return ta(), t.flags |= 256, wc(e, t, n, r), t.child;
	}
	var zc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Bc(e) {
		return {
			baseLanes: e,
			cachePool: La()
		};
	}
	function Vc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= od), e;
	}
	function Hc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Do.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (qi) {
				if (i ? So(t) : To(), (e = Ki) ? (e = am(e, Yi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Li === null ? null : {
						id: Ri,
						overflow: zi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Di(e), n.return = t, t.child = n, Gi = t, Ki = null)) : e = null, e === null) throw Zi(t);
				return t.lanes = sm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (To(), i = t.mode, a = Wc({
				mode: "hidden",
				children: a
			}, i), r = Ti(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Bc(n), r.childLanes = Vc(e, o, n), t.memoizedState = zc, kc(null, r)) : (So(t), Uc(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return Kc(e, t, a, o, r, c, s, n);
		}
		return i ? (To(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Si(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = Ti(i, a, n, null), i.flags |= 2) : i = Si(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, kc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Bc(n) : (a = i.cachePool, a === null ? a = La() : (s = ba._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = Vc(e, o, n), t.memoizedState = zc, kc(e.child, r)) : (So(t), n = e.child, e = n.sibling, n = Si(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Uc(e, t) {
		return t = Wc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Wc(e, t) {
		return e = vi(22, e, null, t), e.lanes = 0, e;
	}
	function Gc(e, t, n) {
		return eo(t, e.child, null, n), e = Uc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Kc(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (So(t), t.flags &= -257, Gc(e, t, c)) : t.memoizedState === null ? (To(), o = a.fallback, s = t.mode, a = Wc({
			mode: "visible",
			children: a.children
		}, s), o = Ti(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, eo(t, e.child, null, c), a = t.child, a.memoizedState = Bc(c), a.childLanes = Vc(e, r, c), t.memoizedState = zc, kc(null, a)) : (To(), t.child = e.child, t.flags |= 128, null);
		if (So(t), sm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, ra({
				value: a,
				source: null,
				stack: null
			})), Gc(e, t, c);
		}
		if (Cc || da(e, t, c, !1), r = (c & e.childLanes) !== 0, Cc || r) {
			if (ho.current !== null) return Gc(e, t, c);
			if (r = qu, r !== null && (a = lt(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, hi(e, a), jd(r, e, a), Sc;
			return om(o) || Ud(), Gc(e, t, c);
		}
		return om(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, Ki = lm(o.nextSibling), Gi = t, qi = !0, Ji = null, Yi = !1, e !== null && Wi(t, e), t = Uc(t, a.children), t.flags |= 134221824, t);
	}
	function qc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), la(e.return, t, n);
	}
	function Jc(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && ko(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function Yc(e, t, n, r, i, a) {
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
	function Xc(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function Zc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Do.current;
		if (t.flags & 128) return Q(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, Q(t, o), i === "backwards" && e !== null ? (Xc(e), wc(e, t, r, n), Xc(e)) : wc(e, t, r, n), r = qi ? Pi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && qc(e, n, t);
			else if (e.tag === 19) qc(e, n, t);
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
				n = Jc(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, Xc(t)), Yc(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && ko(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Yc(t, !0, n, null, a, r);
				break;
			case "together":
				Yc(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = Jc(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Yc(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function Qc(e, t, n) {
		var r = t.pendingProps;
		return sa(t, t.type, r.value), wc(e, t, r.children, n), t.child;
	}
	function $c(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), rd |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (da(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Si(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Si(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function el(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && fa(e)));
	}
	function tl(e, t, n) {
		switch (t.tag) {
			case 3:
				_e(t, t.stateNode.containerInfo), sa(t, ba, e.memoizedState.cache), ta();
				break;
			case 27:
			case 5:
				ye(t);
				break;
			case 4:
				_e(t, t.stateNode.containerInfo);
				break;
			case 10:
				sa(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Co(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return So(t), t.flags |= 128, null;
					r = da(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? Hc(e, t, n) : (So(t), e = $c(e, t, n), e === null ? null : e.sibling);
				}
				So(t);
				break;
			case 19:
				if (t.flags & 128) return Zc(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (da(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Zc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Q(t, Do.current), r) break;
				return null;
			case 22: return t.lanes = 0, Oc(e, t, n, t.pendingProps);
			case 24: sa(t, ba, e.memoizedState.cache);
		}
		return $c(e, t, n);
	}
	function nl(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Cc = !0;
			else {
				if (!el(e, n) && !(t.flags & 128)) return Cc = !1, tl(e, t, n);
				Cc = !!(e.flags & 131072);
			}
		} else Cc = !1, qi && t.flags & 1048576 && Vi(t, Pi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Wa(t.elementType), t.type = e, typeof e == "function") bi(e) ? (r = fc(e, r), t.tag = 1, t = Lc(null, t, e, r, n)) : (t.tag = 0, t = Fc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === P) {
								t.tag = 11, t = Tc(null, t, e, r, n);
								break a;
							}
							if (a === L) {
								t.tag = 14, t = Ec(null, t, e, r, n);
								break a;
							}
							if (a === N) {
								t.tag = 10, t.type = e, t = Qc(null, t, n);
								break a;
							}
						}
						throw t = V(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Fc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = fc(r, t.pendingProps), Lc(e, t, r, a, n);
			case 3:
				a: {
					if (_e(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, io(e, t), fo(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, sa(t, ba, r), r !== o.cache && ua(t, [ba], n, !0), uo(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Rc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Ai(Error(i(424)), t), ra(a), t = Rc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Ki = lm(e.firstChild), Gi = t, qi = !0, Ji = null, Yi = !0, n = to(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (ta(), r === a) {
							t = $c(e, t, n);
							break a;
						}
						wc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Pc(e, t), e === null ? (n = Nm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : qi || (t.stateNode = fp(t.type, t.pendingProps, he.current, t)) : t.memoizedState = Nm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ye(t), e === null && qi && (r = t.stateNode = hm(t.type, t.pendingProps, he.current), Gi = t, Yi = !0, a = Ki, Sp(t.type) ? (um = a, Ki = lm(r.firstChild)) : Ki = a), wc(e, t, t.pendingProps.children, n), Pc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && qi && ((a = r = Ki) && (r = rm(r, t.type, t.pendingProps, Yi), r === null ? a = !1 : (t.stateNode = r, Gi = t, Ki = lm(r.firstChild), Yi = !1, a = !0)), a || Zi(t)), ye(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, pp(a, o) ? r = null : s !== null && pp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Uo(e, t, Ko, null, null, n), sh._currentValue = a), Pc(e, t), wc(e, t, r, n), t.child;
			case 6: return e === null && qi && ((e = n = Ki) && (n = im(n, t.pendingProps, Yi), n === null ? e = !1 : (t.stateNode = n, Gi = t, Ki = null, e = !0)), e || Zi(t)), null;
			case 13: return Hc(e, t, n);
			case 4: return _e(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = eo(t, null, r, n) : wc(e, t, r, n), t.child;
			case 11: return Tc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Pc(e, t), wc(e, t, r, n), t.child;
			case 8: return wc(e, t, t.pendingProps.children, n), t.child;
			case 12: return wc(e, t, t.pendingProps.children, n), t.child;
			case 10: return Qc(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, pa(t), a = ma(a), r = r(a), t.flags |= 1, wc(e, t, r, n), t.child;
			case 14: return Ec(e, t, t.type, t.pendingProps, n);
			case 15: return Dc(e, t, t.type, t.pendingProps, n);
			case 19: return Zc(e, t, n);
			case 31: return Nc(e, t, n);
			case 22: return Oc(e, t, n, t.pendingProps);
			case 24: return pa(t), r = ma(ba), e === null ? (a = Fa(), a === null && (a = qu, o = xa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, ro(t), sa(t, ba, a)) : ((e.lanes & n) !== 0 && (io(e, t), fo(t, null, null, n), uo()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, sa(t, ba, r), r !== a.cache && ua(t, [ba], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), sa(t, ba, r))), wc(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : qi && Hi(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Pc(e, t), wc(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function rl(e) {
		e.flags |= 4;
	}
	function il(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Jm(t, r) : Jm(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Bd()) e.flags |= 8192;
				else throw Ga = Va, za;
			}
		} else e.flags &= -16777217;
	}
	function al(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Ym(t)) {
			if (Bd()) e.flags |= 8192;
			else throw Ga = Va, za;
		}
	}
	function ol(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : rt(), e.lanes |= t, sd |= t);
	}
	function sl(e, t) {
		if (!qi) switch (e.tailMode) {
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
	function cl(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function ll(e, t, n) {
		var r = t.pendingProps;
		switch (Ui(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return cl(t), null;
			case 1: return cl(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ca(ba), ve(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ea(t) ? rl(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, na())), cl(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (rl(t), o === null ? (cl(t), il(t, a, null, r, n)) : (cl(t), al(t, o))) : o ? o === e.memoizedState ? (cl(t), t.flags &= -16777217) : (rl(t), cl(t), al(t, o)) : (e = e.memoizedProps, e !== r && rl(t), cl(t), il(t, a, e, r, n)), null;
			case 27:
				if (be(t), n = he.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && rl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return cl(t), t.subtreeFlags &= -33554433, null;
					}
					e = pe.current, ea(t) ? Qi(t, e) : (e = hm(a, r, n), t.stateNode = e, rl(t));
				}
				return cl(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (be(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && rl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return cl(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = pe.current, ea(t)) Qi(t, o);
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
						r && rl(t);
					}
				}
				return cl(t), t.subtreeFlags &= -33554433, il(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && rl(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = he.current, ea(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Gi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[ht] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || $f(e.nodeValue, n)), e || Zi(t, !0);
					} else e = lp(e).createTextNode(r), e[ht] = t, t.stateNode = e;
				}
				return cl(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ea(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[ht] = t;
						} else ta(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						cl(t), e = !1;
					} else n = na(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Eo(t), t) : (Eo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return cl(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ea(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[ht] = t;
						} else ta(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						cl(t), a = !1;
					} else a = na(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Eo(t), t) : (Eo(t), null);
				}
				return Eo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), ol(t, t.updateQueue), cl(t), null);
			case 4: return ve(), e === null && Uf(t.stateNode.containerInfo), t.flags |= 67108864, cl(t), null;
			case 10: return ca(t.type), cl(t), null;
			case 19:
				if (Oo(t), r = t.memoizedState, r === null) return cl(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) sl(r, !1);
					else {
						if (nd !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = ko(e), o !== null) {
								for (t.flags |= 128, sl(r, !1), e = o.updateQueue, t.updateQueue = e, ol(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Ci(n, e), n = n.sibling;
								return Q(t, Do.current & 1 | 2), qi && Bi(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Ne() > pd && (t.flags |= 128, a = !0, sl(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = ko(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, ol(t, e), sl(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !qi) return cl(t), null;
						} else 2 * Ne() - r.renderingStartTime > pd && n !== 536870912 && (t.flags |= 128, a = !0, sl(r, !1), t.lanes = 4194304);
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
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ne(), e.sibling = null, o = Do.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || qi ? Q(t, o) : (n = o, fe(bo, t), fe(Do, n), xo === null && (xo = t)), qi && Bi(t, r.treeForkCount), e;
				}
				return cl(t), null;
			case 22:
			case 23: return Eo(t), yo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (cl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : cl(t), n = t.updateQueue, n !== null && ol(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && de(Pa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ca(ba), cl(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, cl(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function ul(e, t) {
		switch (Ui(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return ca(ba), ve(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return be(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Eo(t), t.alternate === null) throw Error(i(340));
					ta();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Eo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					ta();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Oo(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return ve(), null;
			case 10: return ca(t.type), null;
			case 22:
			case 23: return Eo(t), yo(), e !== null && de(Pa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return ca(ba), null;
			case 25: return null;
			default: return null;
		}
	}
	function dl(e, t) {
		switch (Ui(t), t.tag) {
			case 3:
				ca(ba), ve();
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
				Oo(t);
				break;
			case 10:
				ca(t.type);
				break;
			case 22:
			case 23:
				Eo(t), yo(), e !== null && de(Pa);
				break;
			case 24: ca(ba);
		}
	}
	function fl(e, t) {
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
	function pl(e, t, n) {
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
	function ml(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				mo(t, n);
			} catch (t) {
				df(e, e.return, t);
			}
		}
	}
	function hl(e, t, n) {
		n.props = fc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			df(e, t, n);
		}
	}
	function gl(e, t) {
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
							p(e.child, !1, Qp, o, void 0, void 0), e.stateNode = o;
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
	function _l(e, t) {
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
	function vl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) em(e.stateNode, t[n]);
	}
	function yl(e) {
		for (var t = e.return; t !== null && (Sl(t) && em(e.stateNode, t.stateNode), !xl(t));) t = t.return;
	}
	function bl(e) {
		for (var t = e.return; t !== null && (Sl(t) && tm(e.stateNode, t.stateNode), !xl(t));) t = t.return;
	}
	function xl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function Sl(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function Cl(e) {
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
	function wl(e, t, n) {
		try {
			var r = e.stateNode;
			ip(r, e.type, n, t), r[gt] = t;
		} catch (t) {
			df(e, e.return, t);
		}
	}
	function Tl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Sp(e.type) || e.tag === 4;
	}
	function El(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Tl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Sp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Dl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = un)), vl(e, r), zt = !0;
		else if (i !== 4 && (i === 27 && (vl(e, r), r = null, Sp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Dl(e, t, n, r), e = e.sibling; e !== null;) Dl(e, t, n, r), e = e.sibling;
	}
	function Ol(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), vl(e, r), zt = !0;
		else if (i !== 4 && (i === 27 && (vl(e, r), r = null, Sp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Ol(e, t, n, r), e = e.sibling; e !== null;) Ol(e, t, n, r), e = e.sibling;
	}
	function kl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			np(t, r, n), t[ht] = e, t[gt] = n;
		} catch (t) {
			df(e, e.return, t);
		}
	}
	var Al = !1, jl = null;
	function Ml(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Al = !0);
	}
	var Nl = null;
	function Pl() {
		var e = Nl;
		return Nl = null, e;
	}
	var Fl = 0;
	function Il(e, t, n, r, i) {
		return Fl = 0, Ll(e.child, t, n, r, i);
	}
	function Ll(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Op(o);
					r.push(s), s.view && (a = !0);
				} else a || Op(o).view && (a = !0);
				Al = !0, Tp(o, Fl === 0 ? t : t + "_" + Fl, n), Fl++;
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
				t = ci(t.default, t.share), t !== "none" && (Il(e, n, t, null, !1) || Rl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Bl(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = oi(r, n), a = ci(r.default, n.paired ? r.share : r.enter);
			a === "none" ? zl(e) : Il(e, i, a, null, !1) ? (zl(e), n.paired || t || Ad(e, r.onEnter)) : Rl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Bl(e, t), e = e.sibling;
		else zl(e);
	}
	function Vl(e) {
		if (jl !== null && jl.size !== 0) {
			var t = jl;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = ci(n.default, n.share);
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
			var t = e.memoizedProps, n = oi(t, e.stateNode), r = jl === null ? void 0 : jl.get(n), i = ci(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Il(e, n, i, null, !1) ? r === void 0 ? Ad(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, jl.delete(n), Ad(e, t.onShare)) : Rl(e.child, !1)), jl !== null && Vl(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Hl(e), e = e.sibling;
		else jl !== null && Vl(e);
	}
	function Ul(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = oi(t, e.stateNode);
				t = ci(t.default, t.update), e.flags &= -5, t !== "none" && Il(e, n, t, e.memoizedState = [], !1);
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
				if (a !== null && Fl < a.length) {
					var l = a[Fl], u = Op(c);
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
				e.flags & 4 && Tp(c, Fl === 0 ? n : n + "_" + Fl, i), s && e.flags & 4 || (Nl === null && (Nl = []), Nl.push(c, Fl === 0 ? r : r + "_" + Fl, t.memoizedProps)), Fl++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : ql(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function Jl(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = oi(n, r), a = ci(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(kp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				Fl = 0, i = ql(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Ad(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && Jl(e, t);
			e = e.sibling;
		}
	}
	var Yl = !1, Xl = !1, Zl = !1, Ql = !1, $l = typeof WeakSet == "function" ? WeakSet : Set, eu = null, tu = !1, nu = !1, ru = !1, iu = !1;
	function au(e, t, n) {
		if (e = e.containerInfo, sp = gh, e = Rr(e), zr(e)) {
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
			if (e.alternate === null && e.flags & 2) n && Ml(e), ou(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && Hl(r), ou(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Ml(e), ou(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, eu = r) : (n && Ul(e), ou(n));
			}
		}
		jl = null;
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
							var s = fc(t.type, a);
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
					n && r !== null && (n = oi(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = ci(a.default, a.update), a !== "none" && Il(r, n, a, r.memoizedState = [], !0));
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
				Du(e, n), r & 4 && fl(5, n);
				break;
			case 1:
				if (Du(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						df(n, n.return, e);
					}
					else {
						var i = fc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							df(n, n.return, e);
						}
					}
				}
				r & 64 && ml(n), r & 512 && gl(n, n.return);
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
						mo(e, t);
					} catch (e) {
						df(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && kl(n);
			case 26:
			case 5:
				Du(e, n), t === null && r & 4 && Cl(n), r & 512 && gl(n, n.return);
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
				Du(e, n), r & 512 && gl(n, n.return);
				break;
			case 7: r & 512 && gl(n, n.return);
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
				Xl || _l(n, t), mu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Xl && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Xl || _l(n, t), bl(n);
				var r = fu, i = pu;
				Sp(n.type) && (fu = n.stateNode, pu = !1), mu(e, t, n), gm(n.stateNode, n.type, n.memoizedProps), fu = r, pu = i;
				break;
			case 5: Xl || _l(n, t), bl(n);
			case 6:
				if (n.tag === 6 && bl(n), r = fu, i = pu, fu = null, mu(e, t, n), fu = r, pu = i, fu !== null) {
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
				pl(2, n, t), Xl || pl(4, n, t), mu(e, t, n);
				break;
			case 1:
				Xl || (_l(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && hl(n, t, r)), mu(e, t, n);
				break;
			case 21:
				mu(e, t, n);
				break;
			case 22:
				Xl = (r = Xl) || n.memoizedState !== null, mu(e, t, n), Xl = r;
				break;
			case 30:
				_l(n, t), mu(e, t, n);
				break;
			case 7:
				Xl || _l(n, t), mu(e, t, n);
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
				bu(t, e, n), Cu(e), a & 4 && (pl(3, e, e.return), fl(3, e), pl(5, e, e.return));
				break;
			case 1:
				bu(t, e, n), Cu(e), a & 512 && (Xl || r === null || _l(r, r.return)), a & 64 && Yl && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = xu, bu(t, e, n), Cu(e), a & 512 && (Xl || r === null || _l(r, r.return)), a & 4) {
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
					} else a === n ? n === null && e.stateNode !== null && wl(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || Xl || t.parentNode.removeChild(t)) : a.count--, n === null ? Yl || Km(o, e.type, e.stateNode) : Bm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				bu(t, e, n), Cu(e), a & 512 && (Xl || r === null || _l(r, r.return)), r !== null && a & 4 && wl(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = Zl, Zl = !1, bu(t, e, n), Zl = o, Cu(e), a & 512 && (Xl || r === null || _l(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						tn(t, ""), zt = !0;
					} catch (t) {
						df(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, wl(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (Ql = !0);
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
				a & 512 && (Xl || r === null || _l(r, r.return)), a = Bt(), o = nu, s = (n & 335544064) === n, c = e.memoizedProps, nu = s && ci(c.default, c.update) !== "none", bu(t, e, n), Cu(e), s && r !== null && zt && (e.flags |= 4), nu = o, zt = a;
				break;
			case 21: break;
			case 7: a & 512 && (Xl || r === null || _l(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: bu(t, e, n), Cu(e);
		}
	}
	function Cu(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Tl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (Sl(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (xl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						Ol(e, El(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (tn(l, ""), n.flags &= -33), Ol(e, El(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						Dl(e, El(e), u, s);
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
				if (iu = tu = !1, Pl(), Tu(t, e), !tu && !ru) {
					if (e = Nl, e !== null) for (var r = 0; r < e.length; r += 3) {
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
				Nl = null;
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
				r = tu, i = Pl(), tu = !1, Tu(t, e), tu && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = oi(a, o), o = oi(n.memoizedProps, o);
				var s = ci(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, Fl = 0, t = ql(e, n, t, o, s, a, !0), Fl !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Ad(e, e.memoizedProps.onUpdate), Nl = i) : i !== null && (i.push.apply(i, Nl), Nl = i), tu = e.flags & 32 ? !0 : r;
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
					pl(4, n, n.return), Ou(n, r);
					break;
				case 1:
					_l(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && hl(n, n.return, i), Ou(n, r);
					break;
				case 27: r & 2 && gm(n.stateNode, n.type, n.memoizedProps);
				case 5:
					_l(n, n.return), n.tag !== 5 && n.tag !== 27 || bl(n), Ou(n, r);
					break;
				case 6:
					bl(n);
					break;
				case 26:
					_l(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || Xl || i.parentNode.removeChild(i), Ou(n, r);
					break;
				case 22:
					n.memoizedState === null && Ou(n, r);
					break;
				case 30:
					_l(n, n.return), Ou(n, r);
					break;
				case 7: _l(n, n.return);
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
					ku(i, a, n), fl(4, a);
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
					s && o & 64 && ml(a), gl(a, a.return);
					break;
				case 27: n & 2 && kl(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || yl(a), ku(i, a, n), s && r === null && o & 4 && Cl(a), gl(a, a.return);
					break;
				case 6:
					yl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || Yl || Km(bm(c.ownerDocument), a.type, c), ku(i, a, n), s && r === null && o & 4 && Cl(a), gl(a, a.return);
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
					a.memoizedState === null && ku(i, a, n), gl(a, a.return);
					break;
				case 30:
					ku(i, a, n), gl(a, a.return);
					break;
				case 7: gl(a, a.return);
				default: ku(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Au(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Sa(n));
	}
	function ju(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Sa(e));
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
				Mu(e, t, n, r), a & 2048 && fl(9, t);
				break;
			case 1:
				Mu(e, t, n, r);
				break;
			case 3:
				Mu(e, t, n, r), i && iu && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Sa(a)));
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
					Pu(a, o, s, c, i), fl(8, o);
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
					i.paired = null, jl === null && (jl = /* @__PURE__ */ new Map()), jl.set(r, i);
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
				Bu(e), e.flags & 2048 && pl(9, e, e.return);
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
					pl(8, t, t.return), Hu(t);
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
					pl(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Sa(n.memoizedState.cache);
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
			var t = ma(ba), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ma(ba).controller.signal;
		}
	}, Gu = typeof WeakMap == "function" ? WeakMap : Map, Ku = 0, qu = null, Ju = null, Yu = 0, Xu = 0, Zu = null, Qu = !1, $u = !1, ed = !1, td = 0, nd = 0, rd = 0, id = 0, ad = 0, od = 0, sd = 0, cd = null, ld = null, ud = !1, dd = 0, fd = 0, pd = Infinity, md = null, hd = null, gd = 0, _d = null, vd = null, yd = 0, bd = 0, xd = null, Sd = null, Cd = null, wd = null, Td = null, Ed = 0, Dd = null;
	function Od() {
		return Ku & 2 && Yu !== 0 ? Yu & -Yu : H.T === null ? ft() : Mf();
	}
	function kd() {
		if (od === 0) {
			if (!(Yu & 536870912) || qi) {
				var e = Xe;
				Xe <<= 1, !(Xe & 3932160) && (Xe = 262144), od = e;
			} else od = 536870912;
		}
		return e = bo.current, e !== null && (e.flags |= 32), od;
	}
	function Ad(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Pp(oi(e.memoizedProps, n))), wd === null && (wd = []), wd.push(t.bind(null, r));
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
			unsuspend: un
		}, jl = null, Ru(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = nh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? dd - Ne() : (a & 4194048) === a ? fd - Ne() : 0, m = eh(d, m), m !== null) ? (yd = a, e.cancelPendingCommit = m($d.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Fd(e, a, o, !l)) : $d(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Pd(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!K(a(), i)) return !1;
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
			else e = Ju, oa = aa = null, Yo(e), Ja = null, Ya = 0, e = Ju;
			for (; e !== null;) dl(e.alternate, e), e = e.return;
			Ju = null;
		}
	}
	function Rd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, _p(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), yd = 0, Ld(), qu = e, Ju = n = Si(e.current, null), Yu = t, Xu = 0, Zu = null, Qu = !1, $u = et(e, t), ed = !1, sd = od = ad = id = rd = nd = 0, ld = cd = null, ud = !1, td = tt(e, t), pi(), n;
	}
	function zd(e, t) {
		jo = null, H.H = ic, t === Ra || t === Ba ? (t = Ka(), Xu = 3) : t === za ? (t = Ka(), Xu = 4) : Xu = t === Sc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Zu = t, Ju === null && (nd = 1, gc(e, Ai(t, e.current)));
	}
	function Bd() {
		var e = bo.current;
		return e === null ? !0 : (Yu & 4194048) === Yu ? xo === null : (Yu & 62914560) === Yu || Yu & 536870912 ? e === xo : !1;
	}
	function Vd() {
		var e = H.H;
		return H.H = ic, e === null ? ic : e;
	}
	function Hd() {
		var e = H.A;
		return H.A = Wu, e;
	}
	function Ud() {
		nd = 4, Qu || (Yu & 4194048) !== Yu && bo.current !== null || ($u = !0), !(rd & 134217727) && !(id & 134217727) || qu === null || Fd(qu, Yu, od, !1);
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
							bo.current === null && (t = !0);
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
		return t && e.shellSuspendCounter++, oa = aa = null, Ku = r, H.H = i, H.A = a, Ju === null && (qu = null, Yu = 0, pi()), o;
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
							if (Ha(o)) {
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
							Ha(o) ? (Xu = 0, Zu = null, Yd(t)) : (Xu = 0, Zu = null, Xd(e, t, o, 7));
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
		return oa = aa = null, H.H = r, H.A = a, Ku = n, Ju === null ? (qu = null, Yu = 0, pi(), nd) : 0;
	}
	function qd() {
		for (; Ju !== null && !je();) Jd(Ju);
	}
	function Jd(e) {
		var t = nl(e.alternate, e, td);
		e.memoizedProps = e.pendingProps, t === null ? Zd(e) : Ju = t;
	}
	function Yd(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Ic(n, t, t.pendingProps, t.type, void 0, Yu);
				break;
			case 11:
				t = Ic(n, t, t.pendingProps, t.type.render, t.ref, Yu);
				break;
			case 5:
				Yo(t);
				var r = t;
				r === Gi && (qi ? ($i(r), r.tag === 5 && r.stateNode != null && (Ki = r.stateNode)) : ($i(r), qi = !0));
			default: dl(n, t), t = Ju = Ci(t, td), t = nl(n, t, td);
		}
		e.memoizedProps = e.pendingProps, t === null ? Zd(e) : Ju = t;
	}
	function Xd(e, t, n, r) {
		oa = aa = null, Yo(t), Ja = null, Ya = 0;
		var i = t.return;
		try {
			if (xc(e, i, t, n, Yu)) {
				nd = 1, gc(e, Ai(n, e.current)), Ju = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Ju = i, t;
			nd = 1, gc(e, Ai(n, e.current)), Ju = null;
			return;
		}
		t.flags & 32768 ? (qi || r === 1 ? e = !0 : $u || Yu & 536870912 ? e = !1 : (Qu = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = bo.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Qd(t, e)) : Zd(t);
	}
	function Zd(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Qd(t, Qu);
				return;
			}
			e = t.return;
			var n = ll(t.alternate, t, td);
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
			var n = ul(e.alternate, e);
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
		if (bd = s, s |= fi, ot(e, n, s, r, i, a), wd = null, (n & 335544064) === n ? (Td = Ta(e), r = 10262) : (Td = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, _f(Le, function() {
			return lf(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Al = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = H.T, H.T = null, i = U.p, U.p = 2, a = Ku, Ku |= 4;
			try {
				au(e, t, n);
			} finally {
				Ku = a, U.p = i, H.T = r;
			}
		}
		gd = 1, Al ? Cd = Mp(o, e.containerInfo, Td, rf, af, nf, of, lf, tf, null, null) : (rf(), af(), of());
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
				r = H.T, H.T = null;
				var i = U.p;
				U.p = 2;
				var a = Ku;
				Ku |= 4;
				try {
					nu = ru = !1, Su(t, e, n), n = cp;
					var o = Rr(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && Lr(s.ownerDocument.documentElement, s)) {
						if (c !== null && zr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Ir(s, h), v = Ir(s, g);
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
					Ku = a, U.p = i, H.T = r;
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
				n = H.T, H.T = null;
				var r = U.p;
				U.p = 2;
				var i = Ku;
				Ku |= 4;
				try {
					su(e, t.alternate, t);
				} finally {
					Ku = i, U.p = r, H.T = n;
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
				n = H.T, a = U.p, U.p = 2, H.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					H.T = n, U.p = a;
				}
			}
			if (i = wd, o = Td, Td = null, i !== null && (wd = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			yd & 3 && cf(), wf(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Dd ? Ed++ : (Ed = 0, Dd = t) : (Ed = 0, Dd = null), Tf(0, !1);
		}
	}
	function sf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Sa(t)));
	}
	function cf() {
		return Cd !== null && (Cd.skipTransition(), Cd = null), rf(), af(), of(), lf();
	}
	function lf() {
		if (gd !== 5) return !1;
		var e = _d, t = bd;
		bd = 0;
		var n = dt(yd), r = H.T, a = U.p;
		try {
			U.p = 32 > n ? 32 : n, H.T = null, n = xd, xd = null;
			var o = _d, s = yd;
			if (gd = 0, vd = _d = null, yd = 0, Ku & 6) throw Error(i(331));
			var c = Ku;
			if (Ku |= 4, Vu(o.current), Nu(o, o.current, s, n), Ku = c, Tf(0, !1), Ue && typeof Ue.onPostCommitFiberRoot == "function") try {
				Ue.onPostCommitFiberRoot(He, o);
			} catch {}
			return !0;
		} finally {
			U.p = a, H.T = r, sf(e, t);
		}
	}
	function uf(e, t, n) {
		t = Ai(n, t), t = vc(e.stateNode, t, 2), e = oo(e, t, 2), e !== null && (at(e, 2), wf(e));
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
					e = Ai(n, e), n = yc(2), r = oo(t, n, 2), r !== null && (bc(n, r, t, e), at(r, 2), wf(r));
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
		t === 0 && (t = rt()), e = hi(e, t), e !== null && (at(e, t), wf(e));
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
			var e = Oa;
			e === 0 && (e = Ye, Ye <<= 1, !(Ye & 261888) && (Ye = 256)), Cf = e;
		}
		return Cf;
	}
	function Nf(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ln(e);
	}
	function Pf(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Nf((i[gt] || null).action), o = r.submitter;
			o && (t = (t = o[gt] || null) ? Nf(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new jn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Cf !== 0) {
								var e = new FormData(i, o);
								Ws(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), Ws(n, {
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
	ii(Xr, "onAnimationEnd"), ii(J, "onAnimationIteration"), ii(Zr, "onAnimationStart"), ii("dblclick", "onDoubleClick"), ii("focusin", "onFocus"), ii("focusout", "onBlur"), ii(Qr, "onTransitionRun"), ii($r, "onTransitionStart"), ii(ei, "onTransitionCancel"), ii(ti, "onTransitionEnd"), Pt("onMouseEnter", ["mouseout", "mouseover"]), Pt("onMouseLeave", ["mouseout", "mouseover"]), Pt("onPointerEnter", ["pointerout", "pointerover"]), Pt("onPointerLeave", ["pointerout", "pointerover"]), Nt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Nt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Nt("onBeforeInput", [
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
		n = i.bind(null, t, n, e), i = void 0, !bn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
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
		_n(function() {
			var r = a, i = fn(n), s = [];
			a: {
				var c = ni.get(e);
				if (c !== void 0) {
					var l = jn, u = e;
					switch (e) {
						case "keypress": if (En(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Yn;
							break;
						case "focusin":
							u = "focus", l = Bn;
							break;
						case "focusout":
							u = "blur", l = Bn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Bn;
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
							l = Rn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = zn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Qn;
							break;
						case Xr:
						case J:
						case Zr:
							l = Vn;
							break;
						case ti:
							l = $n;
							break;
						case "scroll":
						case "scrollend":
							l = Nn;
							break;
						case "wheel":
							l = er;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Hn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Xn;
							break;
						case "submit":
							l = Zn;
							break;
						case "toggle":
						case "beforetoggle": l = tr;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = vn(m, p), g != null && d.push(Kf(m, g, h))), f) break;
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
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== dn && (u = n.relatedTarget || n.fromElement) && (Tt(u) || u[_t])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Tt(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Rn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Xn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Dt(c), h = l == null ? u : Dt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, Tt(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? w(c, l, Jf) : null, c !== null && Yf(s, u, c, d, !1), l !== null && f !== null && Yf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Dt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = xr;
					else if (hr(c)) {
						if (Sr) _ = jr;
						else {
							_ = kr;
							var v = Or;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && on(r.elementType) && (_ = xr) : _ = Ar;
					if (_ &&= _(e, r)) {
						gr(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Dt(r) : window, e) {
					case "focusin":
						(hr(v) || v.contentEditable === "true") && (Vr = v, Hr = r, Ur = null);
						break;
					case "focusout":
						Ur = Hr = Vr = null;
						break;
					case "mousedown":
						q = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						q = !1, Wr(s, n, i);
						break;
					case "selectionchange": if (Br) break;
					case "keydown":
					case "keyup": Wr(s, n, i);
				}
				var y;
				if (rr) b: {
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
				b && (or && n.locale !== "ko" && (dr || b !== "onCompositionStart" ? b === "onCompositionEnd" && dr && (y = Tn()) : (Sn = i, Cn = "value" in Sn ? Sn.value : Sn.textContent, dr = !0)), v = qf(r, b), 0 < v.length && (b = new Un(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = ur(n), y !== null && (b.data = y)))), (y = ar ? fr(e, n) : pr(e, n)) && (b = qf(r, "onBeforeInput"), 0 < b.length && (v = new Un("onBeforeInput", "beforeinput", null, n, i), s.push({
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
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = vn(e, n), i != null && r.unshift(Kf(e, i, a)), i = vn(e, t), i != null && r.push(Kf(e, i, a))), e.tag === 3) return r;
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
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = vn(n, a), l != null && o.unshift(Kf(n, l, c))) : i || (l = vn(n, a), l != null && o.push(Kf(n, l, c)))), n = n.return;
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
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || tn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && tn(e, "" + r);
				else return;
				break;
			case "className":
				W(e, "class", r);
				break;
			case "tabIndex":
				W(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				W(e, n, r);
				break;
			case "style":
				an(e, r, o);
				return;
			case "data": if (t !== "object") {
				W(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = ln(r), e.setAttribute(n, r);
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
				r = ln(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = un);
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
				n = ln(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				Vt(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = sn.get(n) || n, Vt(e, n, r);
			else return;
		}
		zt = !0;
	}
	function tp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				an(e, r, o);
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
				if (typeof r == "string") tn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") tn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && Bf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Bf("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = un);
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
				Xt(e, o, c, l, u, s, a, !1);
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
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Qt(e, !!r, n, !0) : Qt(e, !!r, t, !1);
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
				en(e, r, a, o);
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
			default: if (on(t)) {
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
				Yt(e, s, c, l, u, d, o, a);
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
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Qt(e, !!n, n ? [] : "", !1) : Qt(e, !!n, t, !0)) : Qt(e, !!n, p, !1);
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
				$t(e, p, m);
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
			default: if (on(t)) {
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
				}), p(this._fragmentFiber.child, !1, Ip, e, s, r);
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
			i = Rp(i.optionsOrUseCapture), p(this._fragmentFiber.child, !1, Lp, e, n, i), r.splice(t, 1), a !== null && a();
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
		p(this._fragmentFiber.child, !0, Vp, e, void 0, void 0);
	};
	function Vp(e, t) {
		return e.tag !== 6 && (e = v(e), pm(e, t));
	}
	Fp.prototype.focusLast = function(e) {
		var t = [];
		p(this._fragmentFiber.child, !0, Hp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Vp(t[n], e); n--);
	};
	function Hp(e, t) {
		return t.push(e), !1;
	}
	Fp.prototype.blur = function() {
		var e = m(this._fragmentFiber);
		e !== null && (e = v(e), e = lp(e).activeElement, e !== null && p(this._fragmentFiber.child, !1, Up, e, void 0, void 0));
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = v(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Fp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), p(this._fragmentFiber.child, !1, Wp, e, void 0, void 0);
	};
	function Wp(e, t) {
		return e.tag === 6 || (e = v(e), t.observe(e)), !1;
	}
	Fp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), p(this._fragmentFiber.child, !1, Gp, e, void 0, void 0);
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
		return p(this._fragmentFiber.child, !1, Yp, e, void 0, void 0), e;
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
		p(this._fragmentFiber.child, !1, Hp, n, void 0, void 0);
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
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = w(n, a, C), t === null ? t = !1 : (p(t, !0, x, a, n), a = y, y = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = w(r, a, C), t === null ? t = !1 : (p(t, !0, S, a, r), a = y, b = y = null, t = a !== null)), t) : !1;
	}
	function Zp(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Fp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		p(this._fragmentFiber.child, !1, Hp, t, void 0, void 0);
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
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === un && (e.onclick = null), wt(e);
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
	var xm = U.d;
	U.d = {
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
		t !== null && t.tag === 5 && t.type === "form" ? Ks(t) : xm.r(e);
	}
	var wm = typeof document > "u" ? null : document;
	function Tm(e, t, n) {
		var r = wm;
		if (r && typeof t == "string" && t) {
			var i = Jt(t);
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
			var i = "link[rel=\"preload\"][as=\"" + Jt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Jt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Jt(n.imageSizes) + "\"]")) : i += "[href=\"" + Jt(e) + "\"]";
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
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Jt(r) + "\"][href=\"" + Jt(e) + "\"]", a = i;
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
		return "href=\"" + Jt(e) + "\"";
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
		return "[src=\"" + Jt(e) + "\"]";
	}
	function zm(e) {
		return "script[async]" + e;
	}
	function Bm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Jt(n.href) + "\"]");
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
		return e = new ch(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = vi(3, null, null, t), e.current = a, a.stateNode = e, t = xa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, ro(a), e;
	}
	function uh(e) {
		return e ? (e = Z, e) : Z;
	}
	function dh(e, t, n, r, i, a) {
		i = uh(i), r.context === null ? r.context = i : r.pendingContext = i, r = ao(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = oo(e, r, t), n !== null && (jd(n, e, t), so(n, e, t));
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
			var t = hi(e, 67108864);
			t !== null && jd(t, e, 67108864), ph(e, 67108864);
		}
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Od();
			t = ut(t);
			var n = hi(e, t);
			n !== null && jd(n, e, t), ph(e, t);
		}
	}
	var gh = !0;
	function _h(e, t, n, r) {
		var i = H.T;
		H.T = null;
		var a = U.p;
		try {
			U.p = 2, yh(e, t, n, r);
		} finally {
			U.p = a, H.T = i;
		}
	}
	function vh(e, t, n, r) {
		var i = H.T;
		H.T = null;
		var a = U.p;
		try {
			U.p = 8, yh(e, t, n, r);
		} finally {
			U.p = a, H.T = i;
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
						case 13: s = hi(a, 2), s !== null && jd(s, a, 2), Id(), ph(a, 2);
					}
					if (a = bh(r), a === null && Gf(e, t, r, xh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Gf(e, t, r, null, n);
		}
	}
	function bh(e) {
		return e = fn(e), Sh(e);
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
				dn = r, n.target.dispatchEvent(r), dn = null;
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
				a !== null && (e.splice(t, 3), t -= 3, Ws(a, {
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
	U.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : f(e), e = e === null ? null : e.stateNode, e;
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
			He = Jh.inject(qh), Ue = Jh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = pc, s = mc, c = hc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = lh(e, 1, !1, null, null, n, r, null, o, s, c, Uh), e[_t] = t.current, Uf(e), new Wh(t);
	};
})), Ci = (/* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = Si();
})))(), wi = /* @__PURE__ */ c(xi(), 1);
function Ti(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var Ei = (e) => {
	switch (e) {
		case "success": return ki;
		case "info": return ji;
		case "warning": return Ai;
		case "error": return Mi;
		default: return null;
	}
}, Di = Array(12).fill(0), Oi = ({ visible: e, className: t }) => /*#__PURE__*/ x.createElement("div", {
	className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
	"data-visible": e
}, /*#__PURE__*/ x.createElement("div", { className: "sonner-spinner" }, Di.map((e, t) => /*#__PURE__*/ x.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${t}`
})))), ki = /*#__PURE__*/ x.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ x.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), Ai = /*#__PURE__*/ x.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ x.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), ji = /*#__PURE__*/ x.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ x.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), Mi = /*#__PURE__*/ x.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ x.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), Ni = /*#__PURE__*/ x.createElement("svg", {
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
}, /*#__PURE__*/ x.createElement("line", {
	x1: "18",
	y1: "6",
	x2: "6",
	y2: "18"
}), /*#__PURE__*/ x.createElement("line", {
	x1: "6",
	y1: "6",
	x2: "18",
	y2: "18"
})), Pi = () => {
	let [e, t] = x.useState(document.hidden);
	return x.useEffect(() => {
		let e = () => {
			t(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []), e;
}, Fi = 1, Ii = 100, Li = (e) => typeof e?.id == "number" || e?.id?.length > 0 ? e.id : Fi++, Ri = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), this.getActiveToasts().forEach((t) => e(t)), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e], this.trimHistory();
		}, this.trimHistory = () => {
			let e = this.toasts.length - Ii;
			e <= 0 || (this.toasts = this.toasts.filter((t) => e > 0 && this.dismissedToasts.has(t.id) ? (this.dismissedToasts.delete(t.id), e--, !1) : !0));
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = Li(e), i = this.pendingDismissals.get(r);
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
				if (a = ["resolve", e], x.isValidElement(e)) i = !1, this.create({
					id: n,
					type: "default",
					message: e
				});
				else if (Bi(e) && !e.ok) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(`HTTP error! status: ${e.status}`) : t.error, a = typeof t.description == "function" ? await t.description(`HTTP error! status: ${e.status}`) : t.description, o = typeof r == "object" && !x.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (e instanceof Error) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !x.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (t.success !== void 0) {
					i = !1;
					let r = typeof t.success == "function" ? await t.success(e) : t.success, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !x.isValidElement(r) ? r : { message: r };
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
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !x.isValidElement(r) ? r : { message: r };
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
			let n = Li(t);
			return this.create({
				...t,
				jsx: e(n),
				id: n,
				type: void 0
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set(), this.pendingDismissals = /* @__PURE__ */ new Map();
	}
}(), zi = (e, t) => Ri.message(e, t), Bi = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", Vi = Object.assign(zi, {
	success: Ri.success,
	info: Ri.info,
	warning: Ri.warning,
	error: Ri.error,
	custom: Ri.custom,
	message: Ri.message,
	promise: Ri.promise,
	dismiss: Ri.dismiss,
	loading: Ri.loading
}, {
	getHistory: () => Ri.toasts,
	getToasts: () => Ri.getActiveToasts()
});
Ti("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--normal-text);background:var(--normal-bg);border:1px solid var(--normal-border);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{-webkit-user-select:none;user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Hi(e) {
	return e.label !== void 0;
}
var Ui = 3, Wi = "24px", Gi = "16px", Ki = 4e3, qi = 356, Ji = 14, Yi = 45, Xi = 200;
function Zi(...e) {
	return e.filter(Boolean).join(" ");
}
function Qi(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var $i = (e) => {
	let { invert: t, toast: n, unstyled: r, interacting: i, setHeights: a, visibleToasts: o, heights: s, index: c, toasts: l, expanded: u, removeToast: d, defaultRichColors: f, closeButton: p, style: m, cancelButtonStyle: h, actionButtonStyle: g, className: _ = "", descriptionClassName: v = "", duration: y, position: b, gap: S, expandByDefault: C, classNames: w, icons: T, closeButtonAriaLabel: E = "Close toast" } = e, [D, O] = x.useState(null), [k, A] = x.useState(null), [j, M] = x.useState(!1), [N, P] = x.useState(!1), [F, I] = x.useState(!1), [L, R] = x.useState(!1), [z, ee] = x.useState(!1), [B, te] = x.useState(0), [ne, re] = x.useState(0), ie = x.useRef(n.duration || y || Ki), ae = x.useRef(null), V = x.useRef(null), oe = c === 0, H = c + 1 <= o, U = n.type, se = U ?? "default", ce = n.dismissible !== !1, le = n.className || "", ue = n.descriptionClassName || "", de = x.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]), fe = x.useMemo(() => n.closeButton ?? p, [n.closeButton, p]), pe = x.useMemo(() => n.duration || y || Ki, [n.duration, y]), me = x.useRef(0), he = x.useRef(0), ge = x.useRef(0), _e = x.useRef(null), [ve, ye] = b.split("-"), be = x.useMemo(() => s.reduce((e, t, n) => n >= de ? e : e + t.height, 0), [s, de]), xe = Pi(), Se = x.useMemo(() => e.swipeDirections ?? Qi(b), [e.swipeDirections, b]), Ce = n.invert || t, we = U === "loading";
	he.current = x.useMemo(() => de * S + be, [de, be]), x.useEffect(() => {
		ie.current = pe;
	}, [pe]), x.useEffect(() => {
		M(!0);
	}, []), x.useEffect(() => {
		let e = V.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return re(t), a((e) => [{
				toastId: n.id,
				height: t,
				position: n.position
			}, ...e]), () => a((e) => e.filter((e) => e.toastId !== n.id));
		}
	}, [a, n.id]), x.useLayoutEffect(() => {
		if (!j) return;
		let e = V.current, t = e.style.height;
		e.style.height = "auto";
		let r = e.getBoundingClientRect().height;
		e.style.height = t, re(r), a((e) => e.find((e) => e.toastId === n.id) ? e.map((e) => e.toastId === n.id ? {
			...e,
			height: r
		} : e) : [{
			toastId: n.id,
			height: r,
			position: n.position
		}, ...e]);
	}, [
		j,
		n.title,
		n.description,
		a,
		n.id,
		n.jsx,
		n.action,
		n.cancel
	]);
	let Te = x.useCallback(() => {
		P(!0), te(he.current), a((e) => e.filter((e) => e.toastId !== n.id)), setTimeout(() => {
			d(n);
		}, Xi);
	}, [
		n,
		d,
		a,
		he
	]);
	x.useEffect(() => {
		if (n.promise && U === "loading" || n.duration === Infinity || n.type === "loading") return;
		let e;
		return u || i || xe ? (() => {
			if (ge.current < me.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - me.current;
				ie.current -= e;
			}
			ge.current = (/* @__PURE__ */ new Date()).getTime();
		})() : ie.current !== Infinity && (me.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			n.onAutoClose == null || n.onAutoClose.call(n, n), Te();
		}, ie.current)), () => clearTimeout(e);
	}, [
		u,
		i,
		n,
		U,
		xe,
		Te
	]), x.useEffect(() => {
		n.delete && (Te(), n.onDismiss == null || n.onDismiss.call(n, n));
	}, [Te, n.delete]);
	function Ee() {
		return T?.loading ? /*#__PURE__*/ x.createElement("div", {
			className: Zi(w?.loader, n?.classNames?.loader, "sonner-loader"),
			"data-visible": U === "loading"
		}, T.loading) : /*#__PURE__*/ x.createElement(Oi, {
			className: Zi(w?.loader, n?.classNames?.loader),
			visible: U === "loading"
		});
	}
	let De = n.icon || T?.[U] || Ei(U);
	return /*#__PURE__*/ x.createElement("li", {
		tabIndex: 0,
		ref: V,
		className: Zi(_, le, w?.toast, n?.classNames?.toast, w?.[se], n?.classNames?.[se]),
		"data-sonner-toast": "",
		"data-rich-colors": n.richColors ?? f,
		"data-styled": !(n.jsx || n.unstyled || r),
		"data-mounted": j,
		"data-promise": !!n.promise,
		"data-swiped": z,
		"data-removed": N,
		"data-visible": H,
		"data-y-position": ve,
		"data-x-position": ye,
		"data-index": c,
		"data-front": oe,
		"data-swiping": F,
		"data-dismissible": ce,
		"data-type": U,
		"data-invert": Ce,
		"data-swipe-out": L,
		"data-swipe-direction": k,
		"data-expanded": !!(u || C && j),
		"data-testid": n.testId,
		style: {
			"--index": c,
			"--toasts-before": c,
			"--z-index": l.length - c,
			"--offset": `${N ? B : he.current}px`,
			"--initial-height": C ? "auto" : `${ne}px`,
			...m,
			...n.style
		},
		onDragEnd: () => {
			I(!1), O(null), _e.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && !we && ce && (ae.current = /* @__PURE__ */ new Date(), te(he.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (I(!0), _e.current = {
				x: e.clientX,
				y: e.clientY
			}));
		},
		onPointerUp: () => {
			if (L || !ce) return;
			_e.current = null;
			let e = Number(V.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(V.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), r = (/* @__PURE__ */ new Date()).getTime() - ae.current?.getTime(), i = D === "x" ? e : t, a = Math.abs(i) / r;
			if ((D === "x" ? Se.includes(e > 0 ? "right" : "left") : Se.includes(t > 0 ? "bottom" : "top")) && (Math.abs(i) >= Yi || a > .11)) te(he.current), n.onDismiss == null || n.onDismiss.call(n, n), A(D === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), Te(), R(!0);
			else {
				var o, s;
				(o = V.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = V.current) == null || s.style.setProperty("--swipe-amount-y", "0px"), ee(!1), I(!1), O(null);
			}
		},
		onPointerMove: (e) => {
			var t, n;
			if (!_e.current || !ce || window.getSelection()?.toString().length > 0) return;
			let r = e.clientY - _e.current.y, i = e.clientX - _e.current.x;
			!D && (Math.abs(i) > 1 || Math.abs(r) > 1) && O(Math.abs(i) > Math.abs(r) ? "x" : "y");
			let a = {
				x: 0,
				y: 0
			}, o = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (D === "y") {
				if (Se.includes("top") || Se.includes("bottom")) {
					if (Se.includes("top") && r < 0 || Se.includes("bottom") && r > 0) a.y = r;
					else {
						let e = r * o(r);
						a.y = Math.abs(e) < Math.abs(r) ? e : r;
					}
				}
			} else if (D === "x" && (Se.includes("left") || Se.includes("right"))) {
				if (Se.includes("left") && i < 0 || Se.includes("right") && i > 0) a.x = i;
				else {
					let e = i * o(i);
					a.x = Math.abs(e) < Math.abs(i) ? e : i;
				}
			}
			(Math.abs(a.x) > 0 || Math.abs(a.y) > 0) && ee(!0), (t = V.current) == null || t.style.setProperty("--swipe-amount-x", `${a.x}px`), (n = V.current) == null || n.style.setProperty("--swipe-amount-y", `${a.y}px`);
		}
	}, fe && !n.jsx && U !== "loading" ? /*#__PURE__*/ x.createElement("button", {
		"aria-label": E,
		"data-disabled": we,
		"data-close-button": !0,
		onClick: we || !ce ? () => {} : () => {
			Te(), n.onDismiss == null || n.onDismiss.call(n, n);
		},
		className: Zi(w?.closeButton, n?.classNames?.closeButton)
	}, T?.close ?? Ni) : null, (U || n.icon || n.promise) && n.icon !== null && (T?.[U] !== null || n.icon) ? /*#__PURE__*/ x.createElement("div", {
		"data-icon": "",
		className: Zi(w?.icon, n?.classNames?.icon)
	}, U === "loading" ? n.icon || Ee() : n.promise ? Ee() : null, U === "loading" ? null : De) : null, /*#__PURE__*/ x.createElement("div", {
		"data-content": "",
		className: Zi(w?.content, n?.classNames?.content)
	}, /*#__PURE__*/ x.createElement("div", {
		"data-title": "",
		className: Zi(w?.title, n?.classNames?.title)
	}, n.jsx ? n.jsx : typeof n.title == "function" ? n.title() : n.title), n.description ? /*#__PURE__*/ x.createElement("div", {
		"data-description": "",
		className: Zi(v, ue, w?.description, n?.classNames?.description)
	}, typeof n.description == "function" ? n.description() : n.description) : null), /*#__PURE__*/ x.isValidElement(n.cancel) ? n.cancel : n.cancel && Hi(n.cancel) ? /*#__PURE__*/ x.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: n.cancelButtonStyle || h,
		onClick: (e) => {
			Hi(n.cancel) && ce && (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), Te());
		},
		className: Zi(w?.cancelButton, n?.classNames?.cancelButton)
	}, n.cancel.label) : null, /*#__PURE__*/ x.isValidElement(n.action) ? n.action : n.action && Hi(n.action) ? /*#__PURE__*/ x.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: n.actionButtonStyle || g,
		onClick: (e) => {
			Hi(n.action) && (n.action.onClick == null || n.action.onClick.call(n.action, e), e.defaultPrevented || Te());
		},
		className: Zi(w?.actionButton, n?.classNames?.actionButton)
	}, n.action.label) : null);
};
function ea() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function ta(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? Gi : Wi;
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
var na = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { id: n, invert: r, position: i = "bottom-right", hotkey: a = ["altKey", "KeyT"], expand: o, closeButton: s, className: c, offset: l, mobileOffset: u, theme: d = "light", richColors: f, duration: p, style: m, visibleToasts: h = Ui, toastOptions: g, dir: _ = ea(), gap: v = Ji, icons: y, customAriaLabel: b, containerAriaLabel: S = "Notifications" } = e, [C, w] = x.useState([]), T = x.useMemo(() => n ? C.filter((e) => e.toasterId === n) : C.filter((e) => !e.toasterId), [C, n]), E = x.useMemo(() => Array.from(new Set([i].concat(T.filter((e) => e.position).map((e) => e.position)))), [T, i]), [D, O] = x.useState([]), [k, A] = x.useState(!1), [j, M] = x.useState(!1), [N, P] = x.useState(d === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : d), F = x.useRef(null), I = a.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = x.useRef(null), R = x.useRef(!1), z = x.useCallback((e) => {
		w((t) => (t.find((t) => t.id === e.id)?.delete || Ri.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return x.useEffect(() => Ri.subscribe((e) => {
		e.dismiss ? requestAnimationFrame(() => {
			w((t) => t.map((t) => t.id === e.id ? {
				...t,
				delete: !0
			} : t));
		}) : setTimeout(() => {
			wi.flushSync(() => {
				w((t) => {
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
	}), []), x.useEffect(() => {
		if (d !== "system") {
			P(d);
			return;
		}
		if (d === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? P("dark") : P("light")), typeof window > "u") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)");
		try {
			e.addEventListener("change", ({ matches: e }) => {
				P(e ? "dark" : "light");
			});
		} catch {
			e.addListener(({ matches: e }) => {
				try {
					P(e ? "dark" : "light");
				} catch (e) {
					console.error(e);
				}
			});
		}
	}, [d]), x.useEffect(() => {
		C.length <= 1 && A(!1);
	}, [C]), x.useEffect(() => {
		let e = (e) => {
			if (a.length > 0 && a.every((t) => e[t] || e.code === t)) {
				var t;
				A(!0), (t = F.current) == null || t.focus();
			}
			e.code === "Escape" && (document.activeElement === F.current || F.current?.contains(document.activeElement)) && A(!1);
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [a]), x.useEffect(() => {
		if (F.current) return () => {
			L.current && (L.current.focus({ preventScroll: !0 }), L.current = null, R.current = !1);
		};
	}, [F.current]), /*#__PURE__*/ x.createElement("section", {
		ref: t,
		"aria-label": b ?? `${S} ${I}`,
		tabIndex: -1,
		"aria-live": "polite",
		"aria-relevant": "additions text",
		"aria-atomic": "false",
		suppressHydrationWarning: !0,
		"data-react-aria-top-layer": !0
	}, E.map((t, n) => {
		let [i, a] = t.split("-");
		return T.length ? /*#__PURE__*/ x.createElement("ol", {
			key: t,
			dir: _ === "auto" ? ea() : _,
			tabIndex: -1,
			ref: F,
			className: c,
			"data-sonner-toaster": !0,
			"data-sonner-theme": N,
			"data-y-position": i,
			"data-x-position": a,
			style: {
				"--front-toast-height": `${D[0]?.height || 0}px`,
				"--width": `${qi}px`,
				"--gap": `${v}px`,
				...m,
				...ta(l, u)
			},
			onBlur: (e) => {
				R.current && !e.currentTarget.contains(e.relatedTarget) && (R.current = !1, L.current &&= (L.current.focus({ preventScroll: !0 }), null));
			},
			onFocus: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || R.current || (R.current = !0, L.current = e.relatedTarget);
			},
			onMouseEnter: () => A(!0),
			onMouseMove: () => A(!0),
			onMouseLeave: () => {
				j || A(!1);
			},
			onDragEnd: () => A(!1),
			onPointerDown: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || M(!0);
			},
			onPointerUp: () => M(!1)
		}, T.filter((e) => !e.position && n === 0 || e.position === t).map((n, i) => /*#__PURE__*/ x.createElement($i, {
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
			interacting: j,
			position: t,
			style: g?.style,
			unstyled: g?.unstyled,
			classNames: g?.classNames,
			cancelButtonStyle: g?.cancelButtonStyle,
			actionButtonStyle: g?.actionButtonStyle,
			closeButtonAriaLabel: g?.closeButtonAriaLabel,
			removeToast: z,
			toasts: T.filter((e) => e.position == n.position),
			heights: D.filter((e) => e.position == n.position),
			setHeights: O,
			expandByDefault: o,
			gap: v,
			expanded: k,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
}), ra = ({ ...e }) => /* @__PURE__ */ (0, X.jsx)(na, {
	theme: "dark",
	className: "toaster group",
	icons: {
		success: /* @__PURE__ */ (0, X.jsx)(F, { className: "size-4" }),
		info: /* @__PURE__ */ (0, X.jsx)(he, { className: "size-4" }),
		warning: /* @__PURE__ */ (0, X.jsx)(rt, { className: "size-4" }),
		error: /* @__PURE__ */ (0, X.jsx)(De, { className: "size-4" }),
		loading: /* @__PURE__ */ (0, X.jsx)(_e, { className: "size-4 animate-spin" })
	},
	style: {
		"--normal-bg": "rgb(var(--popover))",
		"--normal-text": "rgb(var(--popover-foreground))",
		"--normal-border": "rgb(var(--border))",
		"--border-radius": "var(--radius)"
	},
	toastOptions: { classNames: { toast: "cn-toast" } },
	...e
}), ia = /*#__PURE__*/ x.createContext(void 0);
function aa(e) {
	let t = x.useContext(ia);
	if (t === void 0 && !e) throw Error(sn(33));
	return t;
}
// node_modules/@base-ui/react/menu/root/MenuRootContext.mjs
var oa = /*#__PURE__*/ x.createContext(void 0);
function sa(e) {
	let t = x.useContext(oa);
	if (t === void 0 && !e) throw Error(sn(36));
	return t;
}
// node_modules/@base-ui/react/internals/TransitionStatusDataAttributes.mjs
var ca = "data-starting-style", la = "data-ending-style", ua = { [ca]: "" }, da = { [la]: "" }, fa = { transitionStatus(e) {
	return e === "starting" ? ua : e === "ending" ? da : null;
} }, pa = "data-open", ma = "data-closed", ha = "data-anchor-hidden", ga = "data-popup-open", _a = "data-pressed", va = { [ga]: "" }, ya = {
	[ga]: "",
	[_a]: ""
}, ba = { [pa]: "" }, xa = { [ma]: "" }, Sa = { [ha]: "" }, Ca = { open(e) {
	return e ? va : null;
} }, wa = { open(e) {
	return e ? ya : null;
} }, Ta = {
	open(e) {
		return e ? ba : xa;
	},
	anchorHidden(e) {
		return e ? Sa : null;
	}
}, Ea = {
	...Ta,
	...fa
}, Da = /*#__PURE__*/ x.createContext(void 0);
function Oa(e = !0) {
	let t = x.useContext(Da);
	if (t === void 0 && !e) throw Error(sn(25));
	return t;
}
// node_modules/@base-ui/react/internals/reason-parts.mjs
var ka = "none", Aa = "trigger-press", ja = "trigger-hover", Ma = "trigger-focus", Na = "outside-press", Pa = "item-press", Fa = "close-press", Ia = "focus-out", La = "escape-key", Ra = "list-navigation", za = "keyboard", Ba = "pointer", Va = "cancel-open", Ha = "sibling-open", Ua = "disabled", Wa = "missing", Ga = "initial", Ka = "imperative-action", qa = "window-resize";
// node_modules/@base-ui/utils/useControlled.mjs
function Ja({ controlled: e, default: t, name: n, state: r = "value" }) {
	let { current: i } = x.useRef(e !== void 0), [a, o] = x.useState(() => t);
	return [i && e !== void 0 ? e : a, x.useCallback((e) => {
		i || o(e);
	}, [])];
}
// node_modules/@base-ui/react/menu/filter-root/MenuFilterContext.mjs
var Ya = /*#__PURE__*/ x.createContext(null);
function Xa(e = "root") {
	let t = x.useContext(Ya), n = x.useContext(oa);
	return t === null || n === void 0 ? null : (e === "submenu-trigger" ? n.virtualFocus || n.parentVirtualFocus : n.virtualFocus) ? t : null;
}
var Za = {
	visible: !0,
	ref: null
};
function Qa() {
	return Za;
}
function $a(e, t, n = "root") {
	let r = Xa(n), i = ((n === "submenu-trigger" ? r?.useSubmenuTrigger : r?.useItem) ?? Qa)({
		label: e.label,
		children: e.children,
		render: e.render
	}), a = gn(t, i.ref);
	return {
		visible: i.visible,
		ref: a,
		props: i.props
	};
}
// node_modules/@base-ui/utils/platform/shared.mjs
function eo() {
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
var { userAgent: to, platform: no, maxTouchPoints: ro } = eo(), io = to.toLowerCase(), ao = no.toLowerCase(), oo = /^i(os$|p)/.test(ao) || ao === "macintel" && ro > 1, so = "android", co = ao === so || io.includes(so), lo = !oo && ao.startsWith("mac");
ao.startsWith("win"), !co && /^(linux|chrome os)/.test(ao);
var uo = lo || oo, fo = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none");
!fo && io.includes("firefox"), !fo && io.includes("chrom");
// node_modules/@base-ui/utils/platform/screen-reader.mjs
var po = uo, mo = /jsdom|happydom/.test(io);
// node_modules/@base-ui/react/menu/item/useMenuItemCommonProps.mjs
function ho(e) {
	e.preventDefault();
}
function go(e) {
	let { closeOnClick: t, highlighted: n, id: r, nodeId: i, store: a, typingRef: o, itemRef: s, itemMetadata: c } = e, l = sa(), u = Oa(!0), d = c.type === "submenu-trigger", f = d ? l.parentVirtualFocus : l.virtualFocus, p = (d && l.parent.type === "menu" ? l.parent.store : l.store).useState("webkitAriaSelected", n), { events: m } = a.useState("floatingTreeRoot"), h = a.useState("open"), g = u !== void 0, _ = !f && h && n ? 0 : -1;
	return x.useMemo(() => ({
		id: r,
		role: "menuitem",
		tabIndex: _,
		"aria-selected": p,
		onMouseDown: f ? ho : void 0,
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
				reason: Pa
			});
		},
		onMouseUp(e) {
			if (u) {
				let t = u.initialCursorPointRef.current;
				if (u.initialCursorPointRef.current = null, g && t && Math.abs(e.clientX - t.x) <= 1 && Math.abs(e.clientY - t.y) <= 1 || g && !lo && e.button === 2) return;
			}
			s.current && a.context.allowMouseUpTriggerRef.current && (!g || e.button === 2) && c.type === "regular-item" && fn(s.current, e, {
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
// node_modules/@base-ui/react/menu/item/useMenuItem.mjs
var _o = { type: "regular-item" };
function vo(e) {
	let { closeOnClick: t, disabled: n, highlighted: r, id: i, store: a, typingRef: o = a.context.typingRef, nativeButton: s, itemMetadata: c, nodeId: l } = e, u = x.useRef(null), { getButtonProps: d, buttonRef: f } = pn({
		disabled: n,
		focusableWhenDisabled: !0,
		native: s,
		composite: !0
	}), p = go({
		closeOnClick: t,
		highlighted: r,
		id: i,
		nodeId: l,
		store: a,
		typingRef: o,
		itemRef: u,
		itemMetadata: c
	}), m = x.useCallback((e) => Kt(p, { onMouseEnter(e) {
		c.type === "submenu-trigger" && c.setActive(e.nativeEvent);
	} }, e, d), [
		p,
		d,
		c
	]), h = gn(u, f);
	return x.useMemo(() => ({
		getItemProps: m,
		itemRef: h
	}), [m, h]);
}
// node_modules/@base-ui/react/internals/composite/list/CompositeListContext.mjs
var yo = /*#__PURE__*/ x.createContext({
	register: () => {},
	unregister: () => {},
	subscribeMapChange: () => () => {},
	nextIndexRef: { current: 0 }
});
function bo() {
	return x.useContext(yo);
}
// node_modules/@base-ui/react/internals/composite/list/useCompositeListItem.mjs
function xo(e = {}) {
	let { guess: t, label: n, metadata: r, textRef: i, index: a } = e, { register: o, unregister: s, subscribeMapChange: c, nextIndexRef: l } = bo(), u = x.useRef(-1), [d, f] = x.useState(a == null && t ? () => {
		if (u.current === -1) {
			let e = l.current;
			l.current += 1, u.current = e;
		}
		return u.current;
	} : -1), p = a ?? d, m = x.useRef(null), h = x.useCallback((e) => {
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
// node_modules/@base-ui/utils/useForcedRerendering.mjs
function So() {
	let [, e] = x.useState({});
	return x.useCallback(() => {
		e({});
	}, []);
}
// node_modules/@base-ui/utils/useId.mjs
var Co = 0;
function wo(e, t = "mui") {
	let n = x.useRef(void 0), r = So(), i = e ?? n.current;
	return x.useEffect(() => {
		n.current ?? (Co += 1, n.current = `${t}-${Co}`, e ?? r());
	}, [
		e,
		t,
		r
	]), i;
}
var To = Lt.useId;
function Eo(e, t) {
	if (To !== void 0) {
		let n = To();
		return e ?? (t ? `${t}-${n}` : n);
	}
	return wo(e, t);
}
// node_modules/@base-ui/react/internals/useBaseUiId.mjs
function Do(e) {
	return Eo(e, "base-ui");
}
// node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
function Q(e, t, n, r) {
	let i = !1, a = !1, o = r ?? Dn;
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
function Oo(e, t, n) {
	let r = n ?? Dn;
	return {
		reason: e,
		event: t ?? new Event("base-ui"),
		...r
	};
}
// node_modules/@base-ui/utils/useOnMount.mjs
function ko(e) {
	x.useEffect(e, En);
}
// node_modules/@base-ui/utils/useAnimationFrame.mjs
var Ao = null;
globalThis.requestAnimationFrame;
var jo = new class {
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
}(), Mo = class e {
	static create() {
		return new e();
	}
	static request(e) {
		return jo.request(e);
	}
	static cancel(e) {
		return jo.cancel(e);
	}
	currentId = Ao;
	request(e) {
		this.cancel(), this.currentId = jo.request(() => {
			this.currentId = Ao, e();
		});
	}
	cancel = () => {
		this.currentId !== Ao && (jo.cancel(this.currentId), this.currentId = Ao);
	};
	disposeEffect = () => this.cancel;
};
function No() {
	let e = zt(Mo.create).current;
	return ko(e.disposeEffect), e;
}
// node_modules/@base-ui/react/internals/useTransitionStatus.mjs
function Po(e, t = !1, n = !1, r = !1) {
	let [i, a] = x.useState(e && t ? "idle" : void 0), [o, s] = x.useState(e && !r);
	return e && !o && (s(!0), a("starting")), !e && o && i !== "ending" && !n && a("ending"), !e && !o && i === "ending" && a(void 0), G(() => {
		if (!e && o && i !== "ending" && n) {
			let e = Mo.request(() => {
				a("ending");
			});
			return () => {
				Mo.cancel(e);
			};
		}
	}, [
		e,
		o,
		i,
		n
	]), G(() => {
		if (!e || t || i === void 0) return;
		let n = Mo.request(() => {
			a(void 0);
		});
		return () => {
			Mo.cancel(n);
		};
	}, [
		t,
		e,
		i
	]), G(() => {
		if (!e || !t) return;
		e && o && i !== "idle" && a("starting");
		let n = Mo.request(() => {
			a("idle");
		});
		return () => {
			Mo.cancel(n);
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
function Fo(e) {
	return e == null ? e : "current" in e ? e.current : e;
}
// node_modules/@base-ui/react/utils/getFiniteAnimations.mjs
function Io(e, t) {
	return e.getAnimations(t).filter((e) => {
		let t = e.effect?.getTiming();
		return t?.duration !== Infinity && t?.iterations !== Infinity;
	});
}
// node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
var Lo = null;
function Ro(e) {
	if (!Lo) {
		let e = [];
		Lo = e, queueMicrotask(() => {
			Lo = null, wi.flushSync(() => {
				for (let t of e) t();
			});
		});
	}
	Lo.push(e);
}
function zo(e, t = !1, n = !1) {
	let r = No();
	return W((i, a = null) => {
		r.cancel();
		let o = Fo(e);
		if (o == null) return;
		let s = o, c = () => {
			n ? Ro(() => {
				a?.aborted || i();
			}) : wi.flushSync(i);
		};
		if (typeof s.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
			i();
			return;
		}
		function l() {
			Promise.all(Io(s).map((e) => e.finished.then(Tn))).then(() => {
				a?.aborted || c();
			}, () => {
				a?.aborted || (Io(s).some((e) => e.pending || e.playState !== "finished") ? l() : c());
			});
		}
		if (t) {
			let e = ca;
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
function Bo(e) {
	let { enabled: t = !0, open: n, ref: r, batch: i = !1, onComplete: a } = e, o = W(a), s = zo(r, n, i);
	x.useEffect(() => {
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
var Vo = /*#__PURE__*/ x.createContext(void 0);
function Ho() {
	let e = x.useContext(Vo);
	if (e === void 0) throw Error(sn(31));
	return e;
}
// node_modules/@base-ui/react/menu/group/MenuGroup.mjs
var Uo = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, [o, s] = x.useState(void 0), c = jn("div", e, {
		ref: t,
		props: {
			role: "group",
			"aria-labelledby": o,
			...a
		}
	});
	return /*#__PURE__*/ (0, X.jsx)(Vo.Provider, {
		value: s,
		children: c
	});
}), Wo = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let n = Xa()?.Group ?? Uo;
	return /*#__PURE__*/ (0, X.jsx)(n, {
		...e,
		ref: t
	});
}), Go = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = Do(a), c = Ho();
	return G(() => (c(s), () => {
		c((e) => e === s ? void 0 : e);
	}), [c, s]), jn("div", e, {
		ref: t,
		props: {
			id: s,
			"aria-hidden": !0,
			...o
		}
	});
}), Ko = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, label: a, nativeButton: o = !1, disabled: s = !1, closeOnClick: c = !0, style: l, ...u } = e, { store: d } = sa(), f = xo({
		guess: !0,
		label: a
	}), p = Do(i), m = d.useState("disabled"), h = d.useState("isActive", f.index), g = d.useState("floatingNodeId"), _ = d.useState("itemProps"), v = s || m, { getItemProps: y, itemRef: b } = vo({
		closeOnClick: c,
		disabled: v,
		highlighted: h,
		id: p,
		store: d,
		nativeButton: o,
		nodeId: g,
		itemMetadata: _o
	});
	return jn("div", e, {
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
}), qo = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let n = $a(e, t);
	return n.visible ? /*#__PURE__*/ (0, X.jsx)(Ko, {
		...e,
		ref: n.ref
	}) : null;
}), Jo = 0, Yo = class e {
	static create() {
		return new e();
	}
	currentId = Jo;
	start(e, t) {
		this.clear(), this.currentId = setTimeout(() => {
			this.currentId = Jo, t();
		}, e);
	}
	isStarted() {
		return this.currentId !== Jo;
	}
	clear = () => {
		this.currentId !== Jo && (clearTimeout(this.currentId), this.currentId = Jo);
	};
	disposeEffect = () => this.clear;
};
function Xo() {
	let e = zt(Yo.create).current;
	return ko(e.disposeEffect), e;
}
// node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function Zo(e) {
	e.preventDefault(), e.stopPropagation();
}
function Qo(e) {
	return "nativeEvent" in e;
}
function $o(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : co && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function es(e) {
	return mo ? !1 : !co && e.width === 0 && e.height === 0 || e.type === "pointerdown" && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" && (co || e.buttons === 0) || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
}
function ts(e, t) {
	let n = ["mouse", "pen"];
	return t || n.push("", void 0), n.includes(e);
}
function ns(e) {
	let t = e.type;
	return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
// node_modules/@base-ui/utils/shadowDom.mjs
function rs(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement != null;) t = t.shadowRoot.activeElement;
	return t;
}
function $(e, t) {
	if (!e || !t) return !1;
	let n = t.getRootNode?.();
	if (e.contains(t)) return !0;
	if (n && yt(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function is(e, t) {
	let n = e;
	for (; n;) {
		if (_t(n) && n.matches(t)) return n;
		n = n.assignedSlot ?? n.parentNode ?? (yt(n) ? n.host : null);
	}
	return null;
}
function as(e) {
	return "composedPath" in e ? e.composedPath()[0] ?? e.target : e.target;
}
// node_modules/@base-ui/react/floating-ui-react/utils/constants.mjs
var os = "data-base-ui-focusable", ss = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", cs = "ArrowLeft", ls = "ArrowRight", us = "ArrowUp", ds = "ArrowDown", fs = "data-trigger-disabled";
// node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function ps(e, t) {
	if (!_t(e)) return !1;
	let n = e;
	if (t.hasElement(n)) return !n.hasAttribute(fs);
	for (let [, e] of t.entries()) if ($(e, n)) return !e.hasAttribute(fs);
	return !1;
}
function ms(e, t) {
	if (t == null) return !1;
	if ("composedPath" in e) return e.composedPath().includes(t);
	let n = e;
	return n.target != null && t.contains(n.target);
}
function hs(e) {
	return e.matches("html,body");
}
function gs(e) {
	return vt(e) && e.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function _s(e) {
	return is(e, `button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${ss}`) != null;
}
function vs(e) {
	return e ? e.getAttribute("role") === "combobox" && gs(e) : !1;
}
function ys(e) {
	if (!e || mo) return !0;
	try {
		return e.matches(":focus-visible");
	} catch {
		return !0;
	}
}
function bs(e) {
	return e ? e.hasAttribute("data-base-ui-focusable") ? e : e.querySelector("[data-base-ui-focusable]") || e : null;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverShared.mjs
function xs(e, t) {
	return t != null && !ts(t) ? 0 : typeof e == "function" ? e() : e;
}
function Ss(e, t, n) {
	let r = xs(e, n);
	return typeof r == "number" ? r : r?.[t];
}
function Cs(e) {
	return typeof e == "function" ? e() : e;
}
function ws(e, t) {
	return t || e === "click" || e === "mousedown";
}
function Ts(e) {
	return e?.includes("mouse") && e !== "mousedown";
}
// node_modules/@base-ui/react/floating-ui-react/components/FloatingDelayGroup.mjs
var Es = /*#__PURE__*/ x.createContext({
	hasProvider: !1,
	timeoutMs: 0,
	delayRef: { current: 0 },
	initialDelayRef: { current: 0 },
	timeout: new Yo(),
	currentIdRef: { current: null },
	currentContextRef: { current: null }
});
function Ds(e, t) {
	e.current = t.current;
}
function Os(e) {
	let { children: t, delay: n, timeoutMs: r = 0 } = e, i = x.useRef(n), a = x.useRef(n), o = x.useRef(null), s = x.useRef(null), c = Xo();
	return G(() => {
		a.current = n, o.current ? i.current = {
			open: Ss(i.current, "open"),
			close: Ss(n, "close")
		} : i.current = n;
	}, [
		n,
		o,
		i,
		a
	]), /*#__PURE__*/ (0, X.jsx)(Es.Provider, {
		value: x.useMemo(() => ({
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
function ks(e, t = { open: !1 }) {
	let { open: n } = t, r = e.useState("floatingId"), { currentIdRef: i, delayRef: a, timeoutMs: o, initialDelayRef: s, currentContextRef: c, hasProvider: l, timeout: u } = x.useContext(Es), [d, f] = x.useState(!1), p = x.useRef(n);
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
			close: Ss(s.current, "close")
		}, o !== null && o !== r ? (f(!0), t?.setIsInstantPhase(!0), t?.onOpenChange(!1, Q(ka))) : (f(!1), t?.setIsInstantPhase(!1));
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
			i.current = null, Ds(a, s), u.clear();
		}
	}, [
		c,
		i,
		a,
		r,
		s,
		u
	]), x.useMemo(() => ({
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
function As(e, t, n, r) {
	return e.addEventListener(t, n, r), () => {
		e.removeEventListener(t, n, r);
	};
}
// node_modules/@base-ui/utils/mergeCleanups.mjs
function js(...e) {
	return () => {
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			n && n();
		}
	};
}
// node_modules/@base-ui/utils/useValueAsRef.mjs
function Ms(e) {
	let t = zt(Ns, e).current;
	return t.next = e, G(t.effect), t;
}
function Ns(e) {
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
var Ps = {
	clipPath: "inset(50%)",
	overflow: "hidden",
	whiteSpace: "nowrap",
	border: 0,
	padding: 0,
	width: 1,
	height: 1,
	margin: -1
}, Fs = {
	...Ps,
	position: "fixed",
	margin: 0,
	top: 0,
	left: 0
}, Is = {
	...Ps,
	position: "absolute"
}, Ls = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let [n, r] = x.useState();
	G(() => {
		po && fo && r("button");
	}, []);
	let i = {
		tabIndex: 0,
		role: n
	};
	return /*#__PURE__*/ (0, X.jsx)("span", {
		...e,
		ref: t,
		style: Fs,
		"aria-hidden": !n || void 0,
		...i,
		"data-base-ui-focus-guard": ""
	});
}), Rs = Math.min, zs = Math.max, Bs = Math.round, Vs = Math.floor, Hs = (e) => ({
	x: e,
	y: e
}), Us = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Ws(e, t, n) {
	return zs(e, Rs(t, n));
}
function Gs(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Ks(e) {
	return e.split("-")[0];
}
function qs(e) {
	return e.split("-")[1];
}
function Js(e) {
	return e === "x" ? "y" : "x";
}
function Ys(e) {
	return e === "y" ? "height" : "width";
}
function Xs(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Zs(e) {
	return Js(Xs(e));
}
function Qs(e, t, n) {
	n === void 0 && (n = !1);
	let r = qs(e), i = Zs(e), a = Ys(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = sc(o)), [o, sc(o)];
}
function $s(e) {
	let t = sc(e);
	return [
		ec(e),
		t,
		ec(t)
	];
}
function ec(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var tc = ["left", "right"], nc = ["right", "left"], rc = ["top", "bottom"], ic = ["bottom", "top"];
function ac(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? nc : tc : t ? tc : nc;
		case "left":
		case "right": return t ? rc : ic;
		default: return [];
	}
}
function oc(e, t, n, r) {
	let i = qs(e), a = ac(Ks(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(ec)))), a;
}
function sc(e) {
	let t = Ks(e);
	return Us[t] + e.slice(t.length);
}
function cc(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function lc(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : cc(e);
}
function uc(e) {
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
function dc(e, t) {
	return t < 0 || t >= e.length;
}
function fc(e, t) {
	return hc(e.current, { disabledIndices: t });
}
function pc(e, t) {
	return hc(e.current, {
		decrement: !0,
		startingIndex: e.current.length,
		disabledIndices: t
	});
}
function mc(e, t, n) {
	let { decrement: r, loopFocus: i, allowEscape: a, disabledIndices: o, minIndex: s, maxIndex: c } = n, l = () => hc(e, {
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
		index: dc(e, u) ? -1 : u,
		wrapped: d
	};
}
function hc(e, { startingIndex: t = -1, decrement: n = !1, disabledIndices: r, amount: i = 1 } = {}) {
	let a = t;
	do
		a += n ? -i : i;
	while (a >= 0 && a <= e.length - 1 && gc(e, a, r));
	return a;
}
function gc(e, t, n) {
	if (typeof n == "function" ? n(t) : n?.includes(t) ?? !1) return !0;
	let r = e[t];
	return r ? !vc(r) || r.matches(":disabled") ? !0 : !n && (r.hasAttribute("disabled") || r.getAttribute("aria-disabled") === "true") : !1;
}
function _c(e) {
	return e.visibility === "hidden" || e.visibility === "collapse";
}
function vc(e, t = e ? jt(e) : null) {
	return !e || !e.isConnected || !t || _c(t) ? !1 : typeof e.checkVisibility == "function" ? e.checkVisibility() : t.display !== "none" && t.display !== "contents";
}
// node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
var yc = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
function bc(e) {
	let t = e.assignedSlot;
	if (t) return t;
	if (e.parentElement) return e.parentElement;
	let n = e.getRootNode();
	return yt(n) ? n.host : null;
}
function xc(e) {
	for (let t of Array.from(e.children)) if (pt(t) === "summary") return t;
	return null;
}
function Sc(e, t) {
	let n = xc(t);
	return !!n && (e === n || $(n, e));
}
function Cc(e) {
	let t = e ? pt(e) : "";
	return e != null && e.matches(yc) && (t !== "summary" || e.parentElement != null && pt(e.parentElement) === "details" && xc(e.parentElement) === e) && (t !== "details" || xc(e) == null) && (t !== "input" || e.type !== "hidden");
}
function wc(e) {
	if (!Cc(e) || !e.isConnected || e.matches(":disabled")) return !1;
	for (let t = e; t; t = bc(t)) {
		let n = t !== e, r = pt(t) === "slot";
		if (t.hasAttribute("inert") || n && pt(t) === "details" && !t.open && !Sc(e, t) || t.hasAttribute("hidden") || !r && !Tc(t, n)) return !1;
	}
	return !0;
}
function Tc(e, t) {
	let n = jt(e);
	return t ? n.display !== "none" : vc(e, n);
}
function Ec(e) {
	let t = e.tabIndex;
	if (t < 0) {
		let t = pt(e);
		if (t === "details" || t === "audio" || t === "video" || vt(e) && e.isContentEditable) return 0;
	}
	return t;
}
function Dc(e) {
	if (pt(e) !== "input") return null;
	let t = e;
	return t.type === "radio" && t.name !== "" ? t : null;
}
function Oc(e, t) {
	let n = Dc(e);
	if (!n) return !0;
	let r = t.find((e) => {
		let t = Dc(e);
		return t?.name === n.name && t.form === n.form && t.checked;
	});
	return r ? r === n : t.find((e) => {
		let t = Dc(e);
		return t?.name === n.name && t.form === n.form;
	}) === n;
}
function kc(e) {
	if (vt(e) && pt(e) === "slot") {
		let t = e.assignedElements({ flatten: !0 });
		if (t.length > 0) return t;
	}
	return vt(e) && e.shadowRoot ? Array.from(e.shadowRoot.children) : Array.from(e.children);
}
function Ac(e, t) {
	kc(e).forEach((e) => {
		Cc(e) && t.push(e), Ac(e, t);
	});
}
function jc(e, t, n) {
	kc(e).forEach((e) => {
		vt(e) && e.matches(t) && n.push(e), jc(e, t, n);
	});
}
function Mc(e) {
	return wc(e) && Ec(e) >= 0;
}
function Nc(e) {
	let t = [];
	return Ac(e, t), t.filter(wc);
}
function Pc(e) {
	let t = Nc(e);
	return t.filter((e) => Ec(e) >= 0 && Oc(e, t));
}
function Fc(e, t) {
	let n = Pc(e), r = n.length;
	if (r === 0) return;
	let i = rs(dn(e)), a = n.indexOf(i);
	return n[a === -1 ? t === 1 ? 0 : r - 1 : a + t];
}
function Ic(e) {
	return Fc(dn(e).body, 1) || e;
}
function Lc(e) {
	return Fc(dn(e).body, -1) || e;
}
function Rc(e, t, n) {
	if (!e) return null;
	let r = [];
	Ac(dn(e).body, r);
	let i = r.indexOf(e);
	if (i === -1) return null;
	let a = r.filter(wc);
	for (let e = 1; e < r.length; e += 1) {
		let o = r[(i + t * e + r.length) % r.length];
		if (!$(n, o) && Mc(o) && Oc(o, a)) return o;
	}
	return r[i];
}
function zc(e, t) {
	let n = t || e.currentTarget, r = e.relatedTarget;
	return !r || !$(n, r);
}
function Bc(e) {
	Pc(e).forEach((e) => {
		e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
	});
}
function Vc(e) {
	let t = [];
	jc(e, "[data-tabindex]", t), t.forEach((e) => {
		let t = e.dataset.tabindex;
		delete e.dataset.tabindex, t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex");
	});
}
// node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function Hc(e, t, n = !0) {
	return e.filter((e) => e.parentId === t).flatMap((t) => [...!n || t.context?.open ? [t] : [], ...Hc(e, t.id, n)]);
}
function Uc(e, t) {
	let n = [], r = e.find((e) => e.id === t)?.parentId;
	for (; r;) {
		let t = e.find((e) => e.id === r);
		r = t?.parentId, t && (n = n.concat(t));
	}
	return n;
}
// node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function Wc(e) {
	return `data-base-ui-${e}`;
}
// node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs
var Gc = 0;
function Kc(e, t = {}) {
	let { preventScroll: n = !1, sync: r = !1, shouldFocus: i } = t;
	cancelAnimationFrame(Gc);
	function a() {
		(!i || i()) && e?.focus({ preventScroll: n });
	}
	if (r) return a(), Tn;
	let o = requestAnimationFrame(a);
	return Gc = o, () => {
		Gc === o && (cancelAnimationFrame(o), Gc = 0);
	};
}
// node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs
var qc = "data-base-ui-inert", Jc = /* @__PURE__ */ new WeakMap(), Yc = /* @__PURE__ */ new WeakSet(), Xc = /* @__PURE__ */ new WeakMap(), Zc = 0;
function Qc(e) {
	return e ? yt(e) ? e.host : Qc(e.parentNode) : null;
}
var $c = (e, t) => t.map((t) => {
	if (e.contains(t)) return t;
	let n = Qc(t);
	return e.contains(n) ? n : null;
}).filter((e) => e != null), el = (e) => {
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => {
		let n = e;
		for (; n && !t.has(n);) t.add(n), n = n.parentNode;
	}), t;
}, tl = (e, t, n) => {
	let r = [], i = (e) => {
		e && !n.has(e) && Array.from(e.children).forEach((e) => {
			pt(e) !== "script" && (t.has(e) ? i(e) : r.push(e));
		});
	};
	return i(e), r;
};
function nl(e, t, n, { mark: r = !0 }) {
	let i = $c(t, e), a = r ? tl(t, el(i), new Set(i)) : [], o = [], s = [];
	if (n) {
		let e = $c(t, Array.from(t.querySelectorAll("[aria-live]"))), n = i.concat(e);
		tl(t, el(n), new Set(n)).forEach((e) => {
			let t = e.getAttribute("aria-hidden"), n = t !== null && t !== "false", r = (Jc.get(e) || 0) + 1;
			Jc.set(e, r), o.push(e), r === 1 && n && Yc.add(e), n || e.setAttribute("aria-hidden", "true");
		});
	}
	return r && a.forEach((e) => {
		let t = (Xc.get(e) || 0) + 1;
		Xc.set(e, t), s.push(e), t === 1 && e.setAttribute(qc, "");
	}), Zc += 1, () => {
		o.forEach((e) => {
			let t = (Jc.get(e) || 0) - 1;
			Jc.set(e, t), t || (Yc.has(e) || e.removeAttribute("aria-hidden"), Yc.delete(e));
		}), r && s.forEach((e) => {
			let t = (Xc.get(e) || 0) - 1;
			Xc.set(e, t), t || e.removeAttribute(qc);
		}), --Zc, Zc || (Jc = /* @__PURE__ */ new WeakMap(), Yc = /* @__PURE__ */ new WeakSet(), Xc = /* @__PURE__ */ new WeakMap());
	};
}
function rl(e, t = {}) {
	let { ariaHidden: n = !1, mark: r = !0 } = t, i = dn(e[0]).body;
	return nl(e, i, n, { mark: r });
}
// node_modules/@base-ui/react/internals/constants.mjs
var il = { style: { transition: "none" } }, al = "data-base-ui-click-trigger", ol = { fallbackAxisSide: "none" }, sl = { fallbackAxisSide: "end" }, cl = {
	clipPath: "inset(50%)",
	position: "fixed",
	top: 0,
	left: 0
}, ll = /*#__PURE__*/ x.createContext(null), ul = () => x.useContext(ll), dl = Wc("portal");
function fl(e = {}) {
	let { ref: t, container: n, componentProps: r = Dn, elementProps: i } = e, a = Eo(), o = ul()?.portalNode, [s, c] = x.useState(null), [l, u] = x.useState(null), d = W((e) => {
		e !== null && u(e);
	}), f = x.useRef(null);
	G(() => {
		if (n === null) {
			f.current && (f.current = null, u(null), c(null));
			return;
		}
		let e = (n && (gt(n) ? n : n.current)) ?? o ?? document.body;
		e == null ? f.current && (f.current = null, u(null), c(null)) : f.current !== e && (f.current = e, u(null), c(e));
	}, [n, o]);
	let p = jn("div", r, {
		ref: [t, d],
		props: [{
			id: a,
			[dl]: ""
		}, i]
	}), m = s && p ? /*#__PURE__*/ wi.createPortal(p, s) : null;
	return {
		node: l,
		nodeId: /*#__PURE__*/ x.isValidElement(p) ? p.props.id : void 0,
		subtree: m
	};
}
var pl = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, children: a, container: o, portalOwnerRole: s, ...c } = e, { node: l, nodeId: u, subtree: d } = fl({
		container: o,
		ref: t,
		componentProps: e,
		elementProps: c
	}), f = x.useRef(null), p = x.useRef(null), m = x.useRef(null), h = x.useRef(null), [g, _] = x.useState(null), v = x.useRef(!1), y = g?.modal, b = g?.open, S = !!g && !g.modal && g.open && !!l;
	x.useEffect(() => {
		if (!l || y) return;
		function e(e) {
			l && e.relatedTarget && zc(e) && (e.type === "focusin" ? v.current &&= (Vc(l), !1) : (Bc(l), v.current = !0));
		}
		return js(As(l, "focusin", e, !0), As(l, "focusout", e, !0));
	}, [l, y]), G(() => {
		l && b === !0 && v.current && (Vc(l), v.current = !1);
	}, [b, l]);
	let C = x.useMemo(() => ({
		beforeOutsideRef: f,
		afterOutsideRef: p,
		beforeInsideRef: m,
		afterInsideRef: h,
		portalNode: l,
		setFocusManagerState: _
	}), [l]);
	return /*#__PURE__*/ (0, X.jsxs)(x.Fragment, { children: [d, /*#__PURE__*/ (0, X.jsxs)(ll.Provider, {
		value: C,
		children: [
			S && l && /*#__PURE__*/ (0, X.jsx)(Ls, {
				"data-type": "outside",
				ref: f,
				onFocus: (e) => {
					zc(e, l) ? m.current?.focus() : Lc(g ? g.domReference : null)?.focus();
				}
			}),
			S && l && /*#__PURE__*/ (0, X.jsx)("span", {
				role: s,
				"aria-owns": u,
				style: cl
			}),
			l && /*#__PURE__*/ wi.createPortal(a, l),
			S && l && /*#__PURE__*/ (0, X.jsx)(Ls, {
				"data-type": "outside",
				ref: p,
				onFocus: (e) => {
					zc(e, l) ? h.current?.focus() : (Ic(g ? g.domReference : null)?.focus(), g?.closeOnFocusOut && g?.onOpenChange(!1, Q("focus-out", e.nativeEvent)));
				}
			})
		]
	})] });
});
// node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function ml() {
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
var hl = class {
	nodesRef = { current: [] };
	events = ml();
	addNode(e) {
		this.nodesRef.current.push(e);
	}
	removeNode(e) {
		let t = this.nodesRef.current.findIndex((t) => t === e);
		t !== -1 && this.nodesRef.current.splice(t, 1);
	}
}, gl = /*#__PURE__*/ x.createContext(null), _l = /*#__PURE__*/ x.createContext(null), vl = () => x.useContext(gl)?.id || null, yl = (e) => {
	let t = x.useContext(_l);
	return e ?? t;
};
function bl(e) {
	let t = Eo(), n = yl(e), r = vl();
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
function xl(e) {
	let { children: t, id: n } = e, r = vl();
	return /*#__PURE__*/ (0, X.jsx)(gl.Provider, {
		value: x.useMemo(() => ({
			id: n,
			parentId: r
		}), [n, r]),
		children: t
	});
}
function Sl(e) {
	let { children: t, externalTree: n } = e, r = zt(() => n ?? new hl()).current;
	return /*#__PURE__*/ (0, X.jsx)(_l.Provider, {
		value: r,
		children: t
	});
}
// node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs
function Cl(e, t) {
	let n = mt(as(e));
	return e instanceof n.KeyboardEvent ? "keyboard" : e instanceof n.FocusEvent ? t || "keyboard" : "pointerType" in e ? e.pointerType || ($o(e) ? "keyboard" : t || "mouse") : "touches" in e ? "touch" : e instanceof n.MouseEvent ? t || (e.detail === 0 ? "keyboard" : "mouse") : "";
}
var wl = 20, Tl = [];
function El() {
	Tl = Tl.filter((e) => e.deref()?.isConnected);
}
function Dl(e) {
	El(), e && pt(e) !== "body" && (Tl.push(new WeakRef(e)), Tl.length > wl && (Tl = Tl.slice(-20)));
}
function Ol() {
	return El(), Tl[Tl.length - 1]?.deref();
}
function kl(e) {
	return e ? Mc(e) ? e : Pc(e)[0] || e : null;
}
function Al(e) {
	if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !e.getAttribute("role")?.includes("dialog")) return;
	let t = Nc(e).filter((e) => {
		let t = e.getAttribute("data-tabindex") || "";
		return Mc(e) || e.hasAttribute("data-tabindex") && !t.startsWith("-");
	}), n = e.getAttribute("tabindex");
	t.length === 0 ? n !== "0" && (e.setAttribute("tabindex", "0"), e.setAttribute("data-tabindex", "0")) : (n !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tabindex", "-1"));
}
function jl(e) {
	let { context: t, children: n, disabled: r = !1, initialFocus: i = !0, returnFocus: a = !0, explicitReturnFocus: o, restoreFocus: s = !1, modal: c = !0, closeOnFocusOut: l = !0, openInteractionType: u = "", nextFocusableElement: d, previousFocusableElement: f, beforeContentFocusGuardRef: p, externalTree: m, getInsideElements: h } = e, g = t.useState("open"), _ = t.useState("domReferenceElement"), v = t.useState("floatingElement"), { events: y, dataRef: b } = t.context, S = W(() => b.current.floatingContext?.nodeId), C = i === !1, w = vs(_) && C, T = Ms(i), E = Ms(a), D = Ms(o), O = Ms(u), k = Ms(g), A = yl(m), j = ul(), M = x.useRef(!1), N = x.useRef(!1), P = x.useRef(!1), F = x.useRef(null), I = x.useRef(""), L = x.useRef(""), R = x.useRef(null), z = x.useRef(null), ee = gn(R, p, j?.beforeInsideRef), B = gn(z, j?.afterInsideRef), te = Xo(), ne = Xo(), re = No(), ie = j != null, ae = bs(v), V = W((e = ae) => e ? Pc(e) : []), oe = W(() => h?.().filter((e) => e != null) ?? []);
	x.useEffect(() => {
		if (r || !c) return;
		function e(e) {
			e.key === "Tab" && $(ae, rs(dn(ae))) && V().length === 0 && !w && Zo(e);
		}
		return As(dn(ae), "keydown", e);
	}, [
		r,
		ae,
		c,
		w,
		V
	]), x.useEffect(() => {
		if (r || !g) return;
		let e = dn(ae);
		function t() {
			P.current = !1;
		}
		function n(e) {
			let t = as(e), n = oe(), r = $(v, t) || $(_, t) || $(j?.portalNode, t) || n.some((e) => e === t || $(e, t));
			P.current = !r, L.current = e.pointerType || "keyboard", is(t, "[data-base-ui-click-trigger]") && (N.current = !0, ne.start(0, () => {
				N.current = !1;
			}));
		}
		function i() {
			L.current = "keyboard";
		}
		return js(As(e, "pointerdown", n, !0), As(e, "pointerup", t, !0), As(e, "pointercancel", t, !0), As(e, "keydown", i, !0), t);
	}, [
		r,
		v,
		_,
		ae,
		g,
		j,
		ne,
		oe
	]), x.useEffect(() => {
		if (r || !l) return;
		let e = dn(ae);
		function n() {
			N.current = !0, ne.start(0, () => {
				N.current = !1;
			});
		}
		function i(e) {
			let t = as(e);
			Mc(t) && (F.current = t);
		}
		function a(n) {
			let r = n.relatedTarget, i = n.currentTarget, a = as(n);
			c && r == null && a != null && $(v, a) && Dl(a), queueMicrotask(() => {
				let o = S(), l = t.context.triggerElements, u = oe(), p = r?.hasAttribute(Wc("focus-guard")) && [
					R.current,
					z.current,
					j?.beforeInsideRef.current,
					j?.afterInsideRef.current,
					j?.beforeOutsideRef.current,
					j?.afterOutsideRef.current,
					Fo(f),
					Fo(d)
				].includes(r), m = !($(_, r) || $(v, r) || $(r, v) || $(j?.portalNode, r) || u.some((e) => e === r || $(e, r)) || l.hasMatchingElement((e) => $(e, r)) || p || A && (Hc(A.nodesRef.current, o).find((e) => $(e.context?.elements.floating, r) || $(e.context?.elements.domReference, r)) || Uc(A.nodesRef.current, o).find((e) => [e.context?.elements.floating, bs(e.context?.elements.floating)].includes(r) || e.context?.elements.domReference === r)));
				if (i === _ && ae && Al(ae), s && i !== _ && !vc(a) && rs(e) === e.body) {
					if (vt(ae) && (ae.focus(), s === "popup")) {
						re.request(() => {
							ae.focus();
						});
						return;
					}
					let e = V(), t = F.current, n = (t && e.includes(t) ? t : null) || e[e.length - 1] || ae;
					vt(n) && n.focus();
				}
				b.current.insideReactTree ? b.current.insideReactTree = !1 : (w || !c) && r && m && !N.current && (w || r !== Ol()) && (M.current = !0, t.setOpen(!1, Q(Ia, n)));
			});
		}
		function o() {
			P.current || (b.current.insideReactTree = !0, te.start(0, () => {
				b.current.insideReactTree = !1;
			}));
		}
		let u = vt(_) ? _ : null;
		if (v || u) return js(u && As(u, "focusout", a), u && As(u, "pointerdown", n), v && As(v, "focusin", i), v && As(v, "focusout", a), v && j && As(v, "focusout", o, !0));
	}, [
		r,
		_,
		v,
		ae,
		c,
		A,
		j,
		t,
		l,
		s,
		V,
		w,
		S,
		b,
		te,
		ne,
		re,
		d,
		f,
		oe
	]), x.useEffect(() => {
		if (r || !v || !g) return;
		let e = Array.from(j?.portalNode?.querySelectorAll(`[${Wc("portal")}]`) || []), t = (A ? Uc(A.nodesRef.current, S()) : []).find((e) => vs(e.context?.elements.domReference || null))?.context?.elements.domReference, n = rl([
			v,
			...e,
			R.current,
			z.current,
			j?.beforeOutsideRef.current,
			j?.afterOutsideRef.current,
			...oe(),
			t,
			Fo(f),
			Fo(d),
			w ? _ : null
		].filter((e) => e != null), {
			ariaHidden: c || w,
			mark: !1
		}), i = rl([v, ...e].filter((e) => e != null));
		return () => {
			i(), n();
		};
	}, [
		g,
		r,
		_,
		v,
		c,
		j,
		w,
		A,
		S,
		d,
		f,
		oe
	]), G(() => {
		if (!g || r || !vt(ae)) return;
		I.current = "", L.current = "";
		let e = dn(ae), t = rs(e);
		queueMicrotask(() => {
			let n = T.current, r = typeof n == "function" ? n(O.current || "") : n;
			if (r === void 0 || r === !1 || $(ae, t)) return;
			let i = null, a = () => (i ??= V(ae), i[0] || ae), o;
			o = r === !0 || r === null ? a() : Fo(r), o ||= a();
			let s = $(ae, rs(e)), c = b.current.openEvent, l = c?.type === "mousedown" && $o(c);
			Kc(o, {
				sync: l,
				preventScroll: o === ae,
				shouldFocus() {
					if (!k.current) return !1;
					if (s) return !0;
					let t = rs(e);
					return !(t !== o && $(ae, t));
				}
			});
		});
	}, [
		r,
		g,
		ae,
		V,
		T,
		O,
		k,
		b
	]);
	let H = x.useRef(null);
	G(() => {
		if (r || !ae) {
			H.current = null;
			return;
		}
		H.current &&= (H.current.cancelled = !0, null);
		let e = dn(ae), t = rs(e), n = O.current == null;
		Dl(t);
		function i(e) {
			if (e.open || (I.current = Cl(e.nativeEvent, L.current)), (e.reason === "focus-out" && e.triggerElement?.hasAttribute(Wc("focus-guard")) || e.reason === "trigger-hover" && e.nativeEvent.type === "mouseleave") && (M.current = !0), e.reason === "outside-press") {
				if (e.nested) M.current = !1;
				else if ($o(e.nativeEvent) || es(e.nativeEvent)) M.current = !1;
				else {
					let e = !1;
					dn(ae).createElement("div").focus({ get preventScroll() {
						return e = !0, !1;
					} }), e ? M.current = !1 : M.current = !0;
				}
			}
		}
		y.on("openchange", i);
		function a(e) {
			let r = E.current, i = typeof r == "function" ? r(e) : r;
			if (i === void 0 || i === !1) return null;
			i === null && (i = !0);
			let a = _?.isConnected ? _ : null, o = t?.isConnected && pt(t) !== "body" ? t : null, s = n ? o || a : a || o;
			return s ||= Ol() || null, typeof i == "boolean" ? s : Fo(i) || s || null;
		}
		return () => {
			y.off("openchange", i);
			let t = rs(e), n = oe(), r = $(v, t) || n.some((e) => e === t || $(e, t)) || A && Hc(A.nodesRef.current, S(), !1).some((e) => $(e.context?.elements.floating, t)), o = E.current, s = I.current, c = a(s), l = { cancelled: !1 };
			H.current = l, queueMicrotask(() => {
				H.current === l && (H.current = null);
				let n = kl(c), i = D.current ?? typeof o != "boolean";
				if (!l.cancelled && o && !M.current && vt(n) && (i || n === t || t === e.body || r)) {
					let e = { preventScroll: !0 };
					s === "keyboard" && (e.focusVisible = !0), n.focus(e);
				}
				M.current = !1;
			});
		};
	}, [
		r,
		v,
		ae,
		E,
		D,
		O,
		y,
		A,
		_,
		S,
		oe
	]), G(() => {
		if (!fo || g || !v) return;
		let e = rs(dn(v));
		vt(e) && gs(e) && $(v, e) && e.blur();
	}, [g, v]), G(() => {
		if (!r && j) return j.setFocusManagerState({
			modal: c,
			closeOnFocusOut: l,
			open: g,
			onOpenChange: t.setOpen,
			domReference: _
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
		_
	]), G(() => {
		if (!r && ae) return Al(ae), () => {
			queueMicrotask(El);
		};
	}, [r, ae]);
	let U = !r && (!c || !w) && (ie || c);
	return /*#__PURE__*/ (0, X.jsxs)(x.Fragment, { children: [
		U && /*#__PURE__*/ (0, X.jsx)(Ls, {
			"data-type": "inside",
			ref: ee,
			onFocus: (e) => {
				if (c) {
					let e = V();
					Kc(e[e.length - 1]);
				} else j?.portalNode && (M.current = !1, zc(e, j.portalNode) ? Ic(_)?.focus() : Fo(f ?? j.beforeOutsideRef)?.focus());
			}
		}),
		n,
		U && /*#__PURE__*/ (0, X.jsx)(Ls, {
			"data-type": "inside",
			ref: B,
			onFocus: (e) => {
				c ? Kc(V()[0]) : j?.portalNode && (l && (M.current = !0), zc(e, j.portalNode) ? Lc(_)?.focus() : Fo(d ?? j.afterOutsideRef)?.focus());
			}
		})
	] });
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs
function Ml(e, t = {}) {
	let { enabled: n = !0, event: r = "click", toggle: i = !0, ignoreMouse: a = !1, stickIfOpen: o = !0, touchOpenDelay: s = 0, reason: c = Aa } = t, l = e.context.dataRef, u = x.useRef(void 0), d = No(), f = Xo(), p = x.useMemo(() => {
		function t(t, n, r, i) {
			let a = Q(c, n, r);
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
				u.current = ts(e.pointerType, !0) && es(e.nativeEvent) ? "virtual" : e.pointerType;
			},
			onMouseDown(i) {
				let o = u.current, s = i.nativeEvent, c = e.select("open");
				if (i.button !== 0 || r === "click" || ts(o, !0) && a) return;
				let l = n(c, i.currentTarget, (e) => e === "click" || e === "mousedown"), f = as(s), p = gs(f);
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
				r === "mousedown" && o ? u.current = void 0 : ts(o, !0) && a || t(n(e.select("open"), i.currentTarget, (e) => e === "click" || e === "mousedown" || e === "keydown" || e === "keyup"), i.nativeEvent, i.currentTarget, o);
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
	return x.useMemo(() => n ? { reference: p } : Dn, [n, p]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useClientPoint.mjs
function Nl(e, t) {
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
function Pl(e) {
	return e != null && e.clientX != null;
}
function Fl(e, t = {}) {
	let { enabled: n = !0, axis: r = "both" } = t, i = e.useState("open"), a = e.useState("floatingElement"), o = e.useState("domReferenceElement"), s = e.context.dataRef, c = x.useRef(!1), l = x.useRef(null), [u, d] = x.useState(), [f, p] = x.useState([]), m = W((t) => {
		e.set("positionReference", t);
	}), h = W((t, n, i) => {
		c.current || (!s.current.openEvent || Pl(s.current.openEvent)) && e.set("positionReference", Nl(i ?? o, {
			x: t,
			y: n,
			axis: r,
			dataRef: s,
			pointerType: u
		}));
	}), g = W((e) => {
		i ? l.current || (h(e.clientX, e.clientY, e.currentTarget), p([])) : h(e.clientX, e.clientY, e.currentTarget);
	}), _ = ts(u) ? a : i;
	x.useEffect(() => {
		if (!n) {
			m(o);
			return;
		}
		if (!_) return;
		function e() {
			l.current?.(), l.current = null;
		}
		let t = mt(a);
		function r(t) {
			let n = as(t);
			$(a, n) ? e() : h(t.clientX, t.clientY);
		}
		return !s.current.openEvent || Pl(s.current.openEvent) ? l.current = As(t, "mousemove", r) : m(o), e;
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
	]), x.useEffect(() => () => {
		e.set("positionReference", null);
	}, [e]), x.useEffect(() => {
		n && !a && (c.current = !1);
	}, [n, a]), x.useEffect(() => {
		!n && i && (c.current = !0);
	}, [n, i]);
	let v = x.useMemo(() => {
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
	return x.useMemo(() => n ? {
		reference: v,
		trigger: v
	} : {}, [n, v]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs
function Il() {
	return !1;
}
function Ll(e) {
	return {
		escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? !1,
		outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? !0
	};
}
function Rl(e, t = {}) {
	let { enabled: n = !0, escapeKey: r = !0, outsidePress: i = !0, outsidePressEvent: a = "sloppy", referencePress: o = Il, bubbles: s, externalTree: c } = t, l = e.useState("open"), u = e.useState("floatingElement"), { dataRef: d, events: f } = e.context, p = yl(c), m = W(typeof i == "function" ? i : () => !1), h = typeof i == "function" ? m : i, g = h !== !1, _ = W(() => a), { escapeKey: v, outsidePress: y } = Ll(s), b = x.useRef(!1), S = x.useRef(!1), C = x.useRef(!1), w = x.useRef(!1), T = x.useRef(!1), E = x.useRef(""), D = x.useRef(null), O = Xo(), k = Xo(), A = Xo(), j = W(() => {
		k.clear(), d.current.insideReactTree = !1;
	}), M = W((e) => {
		let t = d.current.floatingContext?.nodeId;
		return (p ? Hc(p.nodesRef.current, t) : []).some((t) => t.context?.open && !t.context.dataRef.current[e]);
	}), N = W((t) => ms(t, e.select("floatingElement")) || ms(t, e.select("domReferenceElement"))), P = W((t) => {
		o() && e.setOpen(!1, Q(Aa, t.nativeEvent));
	}), F = W((t) => {
		if (!l || !n || !r || t.key !== "Escape") return;
		let i = Qo(t) ? t.nativeEvent : t;
		if (T.current || i.isComposing || !v && M("__escapeKeyBubbles")) return;
		let a = Q(La, i);
		e.setOpen(!1, a), a.isCanceled || t.preventDefault(), !v && !a.isPropagationAllowed && t.stopPropagation();
	}), I = W(() => {
		d.current.insideReactTree = !0, k.start(0, j);
	}), L = W((t) => {
		if (!l || !n || t.button !== 0) return;
		let r = as(t.nativeEvent);
		$(e.select("floatingElement"), r) && (b.current || (b.current = !0, S.current = !1));
	}), R = W((e) => {
		l && n && (e.defaultPrevented || e.nativeEvent.defaultPrevented) && b.current && (S.current = !0);
	});
	x.useEffect(() => {
		function e(e) {
			e.open || (w.current = !1);
		}
		return f.on("openchange", e), () => {
			f.off("openchange", e);
		};
	}, [f]), x.useEffect(() => j, [j]), x.useEffect(() => {
		if (!l || !n) return l || (w.current = !1, T.current = !1, E.current = "", D.current = null), j;
		d.current.__escapeKeyBubbles = v, d.current.__outsidePressBubbles = y;
		let t = new Yo(), i = dn(u);
		function a() {
			A.clear(), T.current = !0;
		}
		function o() {
			T.current = !0, A.start(fo ? 5 : 0, () => {
				T.current = !1;
			});
		}
		function s() {
			C.current = !0, t.start(0, () => {
				C.current = !1;
			});
		}
		function c() {
			b.current = !1, S.current = !1;
		}
		function f() {
			let e = E.current, t = e === "pen" || !e ? "mouse" : e, n = _(), r = typeof n == "function" ? n() : n;
			return typeof r == "string" ? r : r[t];
		}
		function m(e) {
			let t = f();
			return t === "intentional" && e.type !== "click" || t === "sloppy" && e.type === "click";
		}
		function x(e) {
			let t = d.current.floatingContext?.nodeId, n = p && Hc(p.nodesRef.current, t).some((t) => ms(e, t.context?.elements.floating));
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
			let r = as(n), i = `[${Wc("inert")}]`, a = _t(r) ? r.getRootNode() : null, o = Array.from((yt(a) ? a : dn(e.select("floatingElement"))).querySelectorAll(i)), s = e.context.triggerElements;
			if (r && (s.hasElement(r) || s.hasMatchingElement((e) => $(e, r)))) return;
			let c = _t(r) ? r : null;
			for (; c && !At(c);) {
				let e = Nt(c);
				if (At(e) || !_t(e)) break;
				c = e;
			}
			if (!(o.length && _t(r) && !hs(r) && !$(r, e.select("floatingElement")) && o.every((e) => !$(c, e)))) {
				if (vt(r) && !("touches" in n)) {
					let e = At(r), t = jt(r), i = /auto|scroll/, a = e || i.test(t.overflowX), o = e || i.test(t.overflowY), s = a && r.clientWidth > 0 && r.scrollWidth > r.clientWidth, c = o && r.clientHeight > 0 && r.scrollHeight > r.clientHeight, l = t.direction === "rtl", u = c && (l ? n.offsetX <= r.offsetWidth - r.clientWidth : n.offsetX > r.clientWidth), d = s && n.offsetY > r.clientHeight;
					if (u || d) return;
				}
				if (!x(n)) {
					if (f() === "intentional") {
						if (n.detail !== 0 && !$o(n) && !w.current) return;
						if (C.current) {
							t.clear(), C.current = !1;
							return;
						}
					}
					typeof h == "function" && !h(n) || M("__outsidePressBubbles") || (e.setOpen(!1, Q(Na, n)), j());
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
			let n = as(e);
			if (!n) return;
			let r = As(n, e.type, () => {
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
			if (e.type === "pointercancel" && (w.current = !1), !b.current) return;
			let n = S.current;
			c(), f() === "intentional" && (e.type === "pointercancel" ? n && s() : x(e) || (n ? s() : (typeof h != "function" || h(e)) && (t.clear(), C.current = !0, j())));
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
		function ne(e) {
			f() === "sloppy" && D.current && !N(e) && (D.current.dismissOnTouchEnd && k(e), O.clear(), D.current = null);
		}
		function re(e) {
			L(e, ne);
		}
		let ie = js(r && js(As(i, "keydown", F), As(i, "compositionstart", a), As(i, "compositionend", o)), g && js(As(i, "click", z, !0), As(i, "pointerdown", z, !0), As(i, "pointerup", ee, !0), As(i, "pointercancel", ee, !0), As(i, "mousedown", z, !0), As(i, "mouseup", ee, !0), As(i, "touchstart", R, {
			capture: !0,
			passive: !0
		}), As(i, "touchmove", te, {
			capture: !0,
			passive: !0
		}), As(i, "touchend", re, {
			capture: !0,
			passive: !0
		})));
		return () => {
			ie(), t.clear(), c(), C.current = !1;
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
		F,
		j,
		_,
		M,
		N,
		p,
		e,
		O,
		A
	]);
	let z = x.useMemo(() => ({
		onKeyDown: F,
		onPointerDown: P,
		onClick: P
	}), [F, P]), ee = x.useMemo(() => ({
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
	return x.useMemo(() => n ? {
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
function zl(e) {
	let { popupStore: t, treatPopupAsFloatingElement: n = !1, floatingRootContext: r, floatingId: i, nested: a, onOpenChange: o } = e, s = t.useState("open"), c = t.useState("activeTriggerElement"), l = t.useState(n ? "popupElement" : "positionerElement"), u = o;
	return t.useSyncedValue("floatingId", i), G(() => {
		let e = {
			open: s,
			floatingId: i,
			referenceElement: c,
			floatingElement: l
		};
		_t(c) && (e.domReferenceElement = c), r.state.positionReference === r.state.referenceElement && (e.positionReference = c), r.update(e);
	}, [
		s,
		i,
		c,
		l,
		r
	]), r.context.onOpenChange = u, r.context.nested = a, r;
}
// node_modules/@base-ui/react/internals/useUnmountAfterClose.mjs
function Bl(e) {
	let { open: t, ref: n, preventUnmountOnClose: r, setPreventUnmountOnClose: i, onUnmount: a, animateInitialOpen: o } = e, s = W(i), { mounted: c, setMounted: l, transitionStatus: u } = Po(t, !1, !1, o), d = !t && r;
	G(() => {
		t && s(!1);
	}, [t, s]);
	let f = x.useRef(c), p = x.useRef(!1), m = So(), h = () => {
		f.current = !1, l(!1), a();
	};
	G(() => {
		f.current = c, p.current && (p.current = !1, !t && c && h());
	});
	let g = W(() => {
		f.current && (t ? (p.current = !0, m()) : h());
	});
	return Bo({
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
var Vl = {
	tabIndex: -1,
	[os]: ""
};
function Hl(e) {
	return (t) => t !== "touch" || e.current;
}
function Ul(e, t = !1) {
	let n = Eo(), r = vl() != null, i = zt(() => e(n, r)).current;
	return zl({
		popupStore: i,
		treatPopupAsFloatingElement: t,
		floatingRootContext: i.state.floatingRootContext,
		floatingId: n,
		nested: r,
		onOpenChange: i.setOpen
	}), i;
}
function Wl({ handle: e, store: t }) {
	return G(() => e.attachStore(t), [e, t]), null;
}
function Gl(e) {
	let t = e.context.triggerElements.size;
	e.select("open") && e.state.triggerCount !== t && e.set("triggerCount", t);
}
function Kl(e, t) {
	let n = x.useRef(null);
	return W((r) => {
		let i = n.current;
		if (i !== null) {
			if (i.element === r && i.store === t && i.id === e) return;
			n.current = null;
			let a = i.store;
			a.context.triggerElements.getById(i.id) === i.element && (a.context.triggerElements.delete(i.id), Gl(a));
		}
		r !== null && e !== void 0 && (n.current = {
			store: t,
			id: e,
			element: r
		}, t.context.triggerElements.add(e, r), Gl(t));
	});
}
function ql(e, t, n, r = !1) {
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
function Jl(e) {
	let t = !1;
	return e.preventUnmountOnClose = () => {
		t = !0;
	}, () => t;
}
function Yl(e, t, n, r = {}) {
	let i = n.reason, a = i === ja, o = t && i === "trigger-focus", s = !t && (i === "trigger-press" || i === "escape-key"), c = Jl(n);
	if (e.context.onOpenChange?.(t, n), n.isCanceled) return;
	r.onBeforeDispatch?.(), e.state.floatingRootContext.dispatchOpenChange(t, n);
	let l = () => {
		let i = ql(e.state, t, n.trigger, c()), l = {
			...r.extraState,
			...i
		};
		o ? l.instantType = "focus" : s ? l.instantType = "dismiss" : a && (l.instantType = void 0), e.update(l);
	};
	a ? wi.flushSync(l) : l();
}
function Xl(e, t, n, r) {
	let i = n.useState("isMountedByTrigger", e), a = Kl(e, n), o = W((t) => {
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
function Zl(e, t = {}) {
	let { closeOnActiveTriggerUnmount: n = !1 } = t, r = x.useRef(null), i = e.useState("open");
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
				let t = Q(ka);
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
function Ql(e, t, n, r) {
	let { mounted: i, transitionStatus: a, forceUnmount: o } = Bl({
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
	return zt(() => (t.set("mounted", i), null)), t.useSyncedValues({
		mounted: i,
		transitionStatus: a
	}), {
		forceUnmount: o,
		transitionStatus: a
	};
}
function $l(e, t) {
	e.useSyncedValues(t), G(() => () => {
		e.update({
			activeTriggerProps: Dn,
			inactiveTriggerProps: Dn,
			popupProps: Dn
		});
	}, [e]);
}
function eu(e, t) {
	G(() => {
		!t && e.state.openMethod !== null && e.set("openMethod", null);
	}, [t, e]), G(() => () => {
		e.state.openMethod !== null && e.set("openMethod", null);
	}, [e]);
}
// node_modules/@base-ui/react/utils/popups/popupTriggerMap.mjs
var tu = class {
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
}, nu = /* @__PURE__ */ o(((e) => {
	var t = u();
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
	function d(e, t) {
		return t();
	}
	var f = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? d : c;
	e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? f : t.useSyncExternalStore;
})), ru = /* @__PURE__ */ o(((e, t) => {
	t.exports = nu();
})), iu = /* @__PURE__ */ o(((e) => {
	var t = u(), n = ru();
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
})), au = /* @__PURE__ */ o(((e, t) => {
	t.exports = iu();
})), ou = [], su = void 0;
function cu() {
	return su;
}
function lu(e) {
	ou.push(e);
}
function uu(e) {
	let t = (t, n) => {
		let r = zt(fu).current, i;
		try {
			su = r;
			for (let e of ou) e.before(r);
			i = e(t, n);
			for (let e of ou) e.after(r);
			r.didInitialize = !0;
		} finally {
			su = void 0;
		}
		return i;
	};
	return t.displayName = e.displayName || e.name, t;
}
function du(e) {
	return /*#__PURE__*/ x.forwardRef(uu(e));
}
function fu() {
	return { didInitialize: !1 };
}
// node_modules/@base-ui/utils/store/useStore.mjs
var pu = ru(), mu = au(), hu = Cn(19) ? vu : yu;
function gu(e, t, n, r, i) {
	return hu(e, t, n, r, i);
}
function _u(e, t, n, r, i) {
	let a = x.useCallback(() => t(e.getSnapshot(), n, r, i), [
		e,
		t,
		n,
		r,
		i
	]);
	return (0, pu.useSyncExternalStore)(e.subscribe, a, a);
}
lu({
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
		}), (0, pu.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot));
	}
});
function vu(e, t, n, r, i) {
	let a = cu();
	if (!a) return _u(e, t, n, r, i);
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
function yu(e, t, n, r, i) {
	return (0, mu.useSyncExternalStoreWithSelector)(e.subscribe, e.getSnapshot, e.getSnapshot, (e) => t(e, n, r, i));
}
// node_modules/@base-ui/utils/store/Store.mjs
var bu = class {
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
		return gu(this, e, t, n, r);
	}
}, xu = class extends bu {
	constructor(e, t = {}, n) {
		super(e), this.context = t, this.selectors = n;
	}
	useSyncedValue(e, t) {
		x.useDebugValue(e);
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
		let t = this;
		G(() => {
			t.update(e);
		}, [t, ...Object.values(e)]);
	}
	useControlledProp(e, t) {
		x.useDebugValue(e);
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
		return x.useDebugValue(e), gu(this, this.selectors[e], t, n, r);
	}
	useContextCallback(e, t) {
		x.useDebugValue(e);
		let n = W(t ?? Tn);
		this.context[e] = n;
	}
	useStateSetter(e) {
		let t = x.useRef(void 0);
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
}, Su = {
	open: (e) => e.open,
	transitionStatus: (e) => e.transitionStatus,
	domReferenceElement: (e) => e.domReferenceElement,
	referenceElement: (e) => e.positionReference ?? e.referenceElement,
	floatingElement: (e) => e.floatingElement,
	floatingId: (e) => e.floatingId
}, Cu = class extends xu {
	constructor(e) {
		let { syncOnly: t, nested: n, onOpenChange: r, triggerElements: i, ...a } = e;
		super({
			...a,
			positionReference: a.referenceElement,
			domReferenceElement: a.referenceElement
		}, {
			onOpenChange: r,
			dataRef: { current: {} },
			events: ml(),
			nested: n,
			triggerElements: i
		}, Su), this.syncOnly = t;
	}
	syncOpenEvent = (e, t) => {
		(!e || !this.state.open || t != null && ns(t)) && (this.context.dataRef.current.openEvent = e ? t : void 0);
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
function wu(e, t, n = !1) {
	return {
		open: !1,
		openProp: void 0,
		mounted: !1,
		transitionStatus: void 0,
		floatingRootContext: new Cu({
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
		activeTriggerProps: Dn,
		inactiveTriggerProps: Dn,
		popupProps: Dn
	};
}
var Tu = (e) => e.triggerIdProp ?? e.activeTriggerId, Eu = (e) => e.openProp ?? e.open, Du = (e) => (e.popupElement?.id ?? e.floatingId) || void 0;
function Ou(e, t) {
	return t !== void 0 && Eu(e) && Tu(e) === t;
}
function ku(e, t) {
	return Ou(e, t) ? !0 : t !== void 0 && Eu(e) && Tu(e) == null && !e.openedWithoutTrigger && e.triggerCount === 1;
}
var Au = {
	open: Eu,
	mounted: (e) => e.mounted,
	transitionStatus: (e) => Eu(e) && !e.mounted ? "starting" : e.transitionStatus,
	floatingRootContext: (e) => e.floatingRootContext,
	triggerCount: (e) => e.triggerCount,
	preventUnmountingOnClose: (e) => e.preventUnmountingOnClose,
	payload: (e) => e.payload,
	activeTriggerId: Tu,
	activeTriggerElement: (e) => e.mounted ? e.activeTriggerElement : null,
	popupId: Du,
	isTriggerActive: (e, t) => t !== void 0 && Tu(e) === t,
	isOpenedByTrigger: (e, t) => Ou(e, t),
	isMountedByTrigger: (e, t) => t !== void 0 && Tu(e) === t && e.mounted,
	triggerProps: (e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps,
	triggerPopupId: (e, t) => ku(e, t) ? Du(e) : void 0,
	popupProps: (e) => e.popupProps,
	popupElement: (e) => e.popupElement,
	positionerElement: (e) => e.positionerElement
};
// node_modules/@base-ui/react/utils/popups/usePopupHandleStore.mjs
function ju(e) {
	let t = x.useCallback((t) => e === void 0 ? Tn : e.subscribeStore(t), [e]), n = x.useCallback(() => e === void 0 ? void 0 : e.store, [e]);
	return (0, pu.useSyncExternalStore)(t, n, () => e?.serverStore);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function Mu(e) {
	let { open: t = !1, onOpenChange: n, elements: r = {} } = e, i = Eo(), a = vl() != null, o = zt(() => new Cu({
		open: t,
		transitionStatus: void 0,
		onOpenChange: n,
		referenceElement: r.reference ?? null,
		floatingElement: r.floating ?? null,
		triggerElements: new tu(),
		floatingId: i,
		syncOnly: !1,
		nested: a
	})).current;
	return G(() => {
		let e = {
			open: t,
			floatingId: i
		};
		r.reference !== void 0 && (e.referenceElement = r.reference, e.domReferenceElement = _t(r.reference) ? r.reference : null), r.floating !== void 0 && (e.floatingElement = r.floating), o.update(e);
	}, [
		t,
		i,
		r.reference,
		r.floating,
		o
	]), o.context.onOpenChange = n, o.context.nested = a, o;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useFocus.mjs
var Nu = lo && fo;
function Pu(e, t = {}) {
	let { enabled: n = !0, delay: r } = t, { events: i, dataRef: a } = e.context, o = x.useRef(!1), s = x.useRef(null), c = x.useRef(!0), l = Xo();
	x.useEffect(() => {
		let t = e.select("domReferenceElement");
		if (!n) return;
		let r = mt(t);
		function i() {
			let t = e.select("domReferenceElement");
			!e.select("open") && vt(t) && t === rs(dn(t)) && (o.current = !0, s.current = t);
		}
		function a() {
			c.current = !0;
		}
		function l() {
			c.current = !1;
		}
		return js(As(r, "blur", i), Nu && As(r, "keydown", a, !0), Nu && As(r, "pointerdown", l, !0));
	}, [e, n]), x.useEffect(() => {
		if (!n) return;
		function t(t) {
			if (t.reason === "trigger-press" || t.reason === "escape-key") {
				let t = e.select("domReferenceElement");
				_t(t) && (s.current = t, o.current = !0);
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
	let u = x.useMemo(() => {
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
				let a = as(n.nativeEvent);
				if (_t(a)) {
					if (Nu && !n.relatedTarget) {
						if (!c.current && !gs(a)) return;
					} else if (!ys(a)) return;
				}
				let u = ps(n.relatedTarget, e.context.triggerElements), { nativeEvent: d, currentTarget: f } = n;
				e.select("open") && u || !r ? e.setOpen(!0, Q(Ma, d, f)) : l.start(r, () => {
					o.current || e.setOpen(!0, Q(Ma, d, f));
				});
			},
			onBlur(n) {
				t();
				let r = n.relatedTarget, i = n.nativeEvent, o = _t(r) && r.hasAttribute(Wc("focus-guard")) && r.getAttribute("data-type") === "outside";
				l.start(0, () => {
					let t = e.select("domReferenceElement"), n = rs(dn(t));
					!r && n === t || $(a.current.floatingContext?.refs.floating.current, n) || $(t, n) || o || ps(r ?? n, e.context.triggerElements) || e.setOpen(!1, Q(Ma, i));
				});
			}
		};
	}, [
		a,
		r,
		e,
		l
	]);
	return x.useMemo(() => n ? {
		reference: u,
		trigger: u
	} : {}, [n, u]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverInteractionSharedState.mjs
var Fu = class e {
	pointerType = void 0;
	interactedInside = !1;
	handler = void 0;
	blockMouseMove = !0;
	performedPointerEventsMutation = !1;
	pointerEventsScopeElement = null;
	pointerEventsReferenceElement = null;
	pointerEventsFloatingElement = null;
	restTimeoutPending = !1;
	openChangeTimeout = new Yo();
	restTimeout = new Yo();
	handleCloseOptions = void 0;
	static create() {
		return new e();
	}
	dispose = () => {
		this.openChangeTimeout.clear(), this.restTimeout.clear();
	};
	disposeEffect = () => this.dispose;
}, Iu = /* @__PURE__ */ new WeakMap();
function Lu(e) {
	if (!e.performedPointerEventsMutation) return;
	let t = e.pointerEventsScopeElement;
	t && Iu.get(t) === e && (e.pointerEventsScopeElement?.style.removeProperty("pointer-events"), e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"), e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"), Iu.delete(t)), e.performedPointerEventsMutation = !1, e.pointerEventsScopeElement = null, e.pointerEventsReferenceElement = null, e.pointerEventsFloatingElement = null;
}
function Ru(e, t) {
	let { scopeElement: n, referenceElement: r, floatingElement: i } = t, a = Iu.get(n);
	a && a !== e && Lu(a), Lu(e), e.performedPointerEventsMutation = !0, e.pointerEventsScopeElement = n, e.pointerEventsReferenceElement = r, e.pointerEventsFloatingElement = i, Iu.set(n, e), n.style.pointerEvents = "none", r.style.pointerEvents = "auto", i.style.pointerEvents = "auto";
}
function zu(e) {
	let t = e.context.dataRef.current, n = zt(() => t.hoverInteractionState ?? Fu.create()).current;
	return t.hoverInteractionState ||= n, ko(t.hoverInteractionState.disposeEffect), t.hoverInteractionState;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs
function Bu(e, t = {}) {
	let { enabled: n = !0, closeDelay: r = 0, nodeId: i } = t, a = e.useState("open"), o = e.useState("floatingElement"), s = e.useState("domReferenceElement"), { dataRef: c } = e.context, l = yl(), u = vl(), d = zu(e), f = Xo(), p = W(() => ws(c.current.openEvent?.type, d.interactedInside)), m = W(() => Ts(c.current.openEvent?.type)), h = W(() => {
		Lu(d);
	});
	G(() => {
		a || (d.pointerType = void 0, d.restTimeoutPending = !1, d.interactedInside = !1, h());
	}, [
		a,
		d,
		h
	]), x.useEffect(() => h, [h]), G(() => {
		if (n && a && d.handleCloseOptions?.blockPointerEvents && m() && _t(s) && o) {
			let e = s, t = o, n = dn(o), r = l?.nodesRef.current.find((e) => e.id === u)?.context?.elements.floating;
			r && (r.style.pointerEvents = "");
			let i = d.pointerEventsScopeElement === t ? null : d.pointerEventsScopeElement, a = r === t ? null : r, c = d.handleCloseOptions?.getScope?.() ?? i ?? a ?? is(e, "[data-rootownerid]") ?? n.body;
			return Ru(d, {
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
	]), x.useEffect(() => {
		if (!n) return;
		function t() {
			return !!(l && u && Hc(l.nodesRef.current, u).length > 0);
		}
		function a(t) {
			let n = Ss(r, "close", d.pointerType), i = () => {
				e.setOpen(!1, Q(ja, t)), l?.events.emit("floating.closed", t);
			};
			n ? d.openChangeTimeout.start(n, i) : (d.openChangeTimeout.clear(), i());
		}
		function s(e) {
			let t = as(e);
			_s(t) ? d.interactedInside = is(t, "[aria-haspopup]") != null : d.interactedInside = !1;
		}
		function g() {
			d.openChangeTimeout.clear(), f.clear(), l?.events.off("floating.closed", v), h();
		}
		function _(n) {
			if (t() && l) {
				l.events.on("floating.closed", v);
				return;
			}
			if (ps(n.relatedTarget, e.context.triggerElements)) return;
			let r = c.current.floatingContext?.nodeId ?? i, o = n.relatedTarget;
			l && r && _t(o) && Hc(l.nodesRef.current, r, !1).some((e) => $(e.context?.elements.floating, o)) || (d.handler ? d.handler(n) : (h(), m() && !p() && a(n)));
		}
		function v(n) {
			l && u && !t() && f.start(0, () => {
				l.events.off("floating.closed", v), e.setOpen(!1, Q(ja, n)), l.events.emit("floating.closed", n);
			});
		}
		let y = o;
		return js(y && As(y, "mouseenter", g), y && As(y, "mouseleave", _), y && As(y, "pointerdown", s, !0), () => {
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
var Vu = { current: null };
function Hu(e, t = {}) {
	let { enabled: n = !0, delay: r = 0, handleClose: i = null, mouseOnly: a = !1, restMs: o = 0, move: s = !0, triggerElementRef: c = Vu, externalTree: l, isActiveTrigger: u = !0, getHandleCloseContext: d, isClosing: f, shouldOpen: p, guardStaleOpen: m = !1 } = t, { dataRef: h, events: g } = e.context, _ = yl(l), v = zu(e), y = x.useRef(!1), b = Ms(i), S = Ms(r), C = Ms(o), w = Ms(n), T = Ms(p), E = Ms(f), D = W(() => ws(h.current.openEvent?.type, v.interactedInside)), O = W(() => T.current?.() !== !1), k = W((t, n, r) => {
		let i = e.context.triggerElements;
		if (i.hasElement(n)) return !t || !$(t, n);
		if (!_t(r)) return !1;
		let a = r;
		return i.hasMatchingElement((e) => $(e, a)) && (!t || !$(t, a));
	}), A = W(() => {
		v.handler &&= (dn(e.select("domReferenceElement")).removeEventListener("mousemove", v.handler), void 0);
	}), j = W(() => {
		Lu(v);
	});
	return u && (v.handleCloseOptions = i?.__options), x.useEffect(() => A, [A]), x.useEffect(() => {
		if (!n) return;
		function e(e) {
			e.open ? y.current = !1 : (y.current = e.reason === ja, A(), v.openChangeTimeout.clear(), v.restTimeout.clear(), v.blockMouseMove = !0, v.restTimeoutPending = !1);
		}
		return g.on("openchange", e), () => {
			g.off("openchange", e);
		};
	}, [
		n,
		g,
		v,
		A
	]), x.useEffect(() => {
		if (!n) return;
		function t(t, n = !0) {
			let r = Ss(S.current, "close", v.pointerType);
			r ? v.openChangeTimeout.start(r, () => {
				e.setOpen(!1, Q(ja, t)), _?.events.emit("floating.closed", t);
			}) : n && (v.openChangeTimeout.clear(), e.setOpen(!1, Q(ja, t)), _?.events.emit("floating.closed", t));
		}
		let r = c.current ?? (u ? e.select("domReferenceElement") : null);
		if (!_t(r)) return;
		function i(t) {
			if (v.openChangeTimeout.clear(), v.blockMouseMove = !1, a && !ts(v.pointerType)) return;
			let n = Cs(C.current), r = Ss(S.current, "open", v.pointerType), i = as(t), o = t.currentTarget ?? null, s = e.select("domReferenceElement"), c = o;
			if (_t(i) && !e.context.triggerElements.hasElement(i)) {
				for (let t of e.context.triggerElements.elements()) if ($(t, i)) {
					c = t;
					break;
				}
			}
			_t(o) && _t(s) && !e.context.triggerElements.hasElement(o) && $(o, s) && (c = s);
			let l = c != null && k(s, c, i), u = e.select("open"), d = E.current?.() ?? e.select("transitionStatus") === "ending", f = !u && d && y.current, p = !l && _t(c) && _t(s) && $(s, c) && f, m = n > 0 && !r, h = l && (u || f) || p, g = !u || l;
			h ? O() && e.setOpen(!0, Q(ja, t, c)) : m || (r ? v.openChangeTimeout.start(r, () => {
				g && O() && e.setOpen(!0, Q(ja, t, c));
			}) : g && O() && e.setOpen(!0, Q(ja, t, c)));
		}
		function o(n) {
			if (D()) {
				j();
				return;
			}
			A();
			let r = dn(e.select("domReferenceElement"));
			v.restTimeout.clear(), v.restTimeoutPending = !1;
			let i = h.current.floatingContext ?? d?.();
			if (!ps(n.relatedTarget, e.context.triggerElements)) {
				if (b.current && i) {
					e.select("open") || v.openChangeTimeout.clear();
					let a = c.current;
					v.handler = b.current({
						...i,
						tree: _,
						x: n.clientX,
						y: n.clientY,
						onClose() {
							j(), A(), w.current && !D() && a === e.select("domReferenceElement") && t(n, !0);
						}
					}), r.addEventListener("mousemove", v.handler), v.handler(n);
				} else v.pointerType === "touch" && $(e.select("floatingElement"), n.relatedTarget) || t(n);
			}
		}
		function l(e) {
			$(r, e.relatedTarget) || (v.openChangeTimeout.clear(), v.restTimeout.clear(), v.restTimeoutPending = !1);
		}
		let f = m ? As(r, "mouseout", l) : void 0;
		return s ? js(As(r, "mousemove", i, { once: !0 }), As(r, "mouseenter", i), As(r, "mouseleave", o), f) : js(As(r, "mouseenter", i), As(r, "mouseleave", o), f);
	}, [
		A,
		j,
		h,
		S,
		e,
		n,
		b,
		v,
		u,
		k,
		D,
		a,
		s,
		C,
		c,
		_,
		w,
		d,
		E,
		O,
		m
	]), x.useMemo(() => {
		if (!n) return;
		function t(e) {
			v.pointerType = e.pointerType;
		}
		return {
			onPointerDown: t,
			onPointerEnter: t,
			onMouseMove(t) {
				let { nativeEvent: n } = t, r = t.currentTarget, i = e.select("domReferenceElement"), o = e.select("open"), s = k(i, r, t.target);
				if (a && !ts(v.pointerType)) return;
				if (o && s && v.handleCloseOptions?.blockPointerEvents) {
					let t = e.select("floatingElement");
					if (t) {
						let e = v.handleCloseOptions?.getScope?.() ?? r.ownerDocument.body;
						Ru(v, {
							scopeElement: e,
							referenceElement: r,
							floatingElement: t
						});
					}
				}
				let c = Cs(C.current);
				if (o && !s || c === 0 || !s && v.restTimeoutPending && t.movementX ** 2 + t.movementY ** 2 < 2) return;
				v.restTimeout.clear();
				function l() {
					if (v.restTimeoutPending = !1, D()) return;
					let t = e.select("open");
					!v.blockMouseMove && (!t || s) && O() && e.setOpen(!0, Q(ja, n, r));
				}
				v.pointerType === "touch" ? wi.flushSync(() => {
					l();
				}) : s && o ? l() : (v.restTimeoutPending = !0, v.restTimeout.start(c, l));
			}
		};
	}, [
		n,
		v,
		D,
		k,
		a,
		e,
		C,
		O
	]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useListNavigation.mjs
function Uu(e) {
	return fo && e.movementX === 0 && e.movementY === 0;
}
function Wu(e, t, n) {
	switch (e) {
		case "vertical": return t;
		case "horizontal": return n;
		default: return t || n;
	}
}
function Gu(e, t) {
	return Wu(t, e === "ArrowUp" || e === "ArrowDown", e === "ArrowLeft" || e === "ArrowRight");
}
function Ku(e, t, n) {
	return Wu(t, e === "ArrowDown", n ? e === "ArrowLeft" : e === "ArrowRight") || e === "Enter" || e === " " || e === "";
}
function qu(e, t, n) {
	return Wu(t, n ? e === cs : e === ls, e === ds);
}
function Ju(e, t, n, r) {
	return t === "both" || t === "horizontal" && r ? e === "Escape" : Wu(t, n ? e === ls : e === cs, e === us);
}
function Yu(e, t) {
	let { listRef: n, activeIndex: r, onNavigate: i = () => {}, enabled: a = !0, selectedIndex: o = null, allowEscape: s = !1, loopFocus: c = !1, nested: l = !1, rtl: u = !1, virtual: d = !1, focusItemOnOpen: f = "auto", focusItemOnHover: p = !0, openOnArrowKeyDown: m = !0, disabledIndices: h = void 0, orientation: g = "vertical", triggerOrientation: _ = g, parentOrientation: v, id: y, resetOnPointerLeave: b = !0, externalTree: S, nestedReturnFocusRef: C, grid: w } = t, T = w != null, E = e.useState("open"), D = e.useState("floatingElement"), O = e.useState("domReferenceElement"), k = e.context.dataRef, A = bs(D), j = vs(O), M = Ms(A), N = vl(), P = yl(S), F = x.useRef(f), I = x.useRef(o ?? -1), L = x.useRef(null), R = x.useRef(!0), z = W((e) => {
		i(I.current === -1 ? null : I.current, e);
	}), ee = x.useRef(!!D), B = x.useRef(E), te = x.useRef(!1), ne = x.useRef(!1), re = x.useRef(null), ie = Ms(h), ae = Ms(E), V = Ms(o), oe = Ms(b), H = No(), U = No(), se = W(() => {
		H.cancel();
		function e(e) {
			d || (re.current = Kc(e, {
				sync: te.current,
				preventScroll: !0
			}));
		}
		let t = n.current[I.current], r = ne.current;
		t && e(t), (te.current ? (e) => e() : (e) => H.request(e))(() => {
			let i = n.current[I.current] || t;
			i && (t || e(i), pe && (r || !R.current) && i.scrollIntoView?.({
				block: "nearest",
				inline: "nearest"
			}));
		});
	});
	G(() => {
		k.current.orientation = g;
	}, [k, g]), G(() => {
		E || (L.current = null), E && f === "auto" || (F.current = f);
	}, [E, f]), G(() => {
		a && (E && D ? (I.current = o ?? -1, F.current && o != null && (ne.current = !0, z())) : ee.current && (I.current = -1, z()));
	}, [
		a,
		E,
		D,
		o,
		z
	]), G(() => {
		if (a) {
			if (!E) te.current = !1;
			else if (D) {
				if (r == null) {
					if (te.current = !1, V.current != null) return;
					if (ee.current && (I.current = -1, se()), (!B.current || !ee.current) && F.current && (L.current != null || F.current === !0 && L.current == null)) {
						let e = 0, t = () => {
							n.current[0] == null ? (e < 2 && (e ? (e) => U.request(e) : queueMicrotask)(t), e += 1) : (I.current = L.current == null || Ku(L.current, _, u) || l ? fc(n) : pc(n), L.current = null, z());
						};
						t();
					}
				} else dc(n.current, r) || (I.current = r, se(), ne.current = !1);
			}
		}
	}, [
		a,
		E,
		D,
		r,
		V,
		l,
		n,
		_,
		u,
		z,
		se,
		U
	]), G(() => {
		if (!a || D || !P || d || !ee.current) return;
		let e = P.nodesRef.current, t = e.find((e) => e.id === N)?.context?.elements.floating, n = rs(dn(O ?? t ?? null)), r = e.some((e) => e.context && $(e.context.elements.floating, n));
		t && !r && R.current && t.focus({ preventScroll: !0 });
	}, [
		a,
		D,
		O,
		P,
		N,
		d
	]), G(() => {
		B.current = E, ee.current = !!D;
	});
	let ce = r != null, le = W((e) => {
		if (!ae.current) return;
		let t = n.current.indexOf(e.currentTarget);
		t !== -1 && (I.current !== t || r !== t) && (I.current = t, z(e));
	}), ue = W(() => v ?? P?.nodesRef.current.find((e) => e.id === N)?.context?.dataRef?.current.orientation), de = W(() => fc(n, ie.current)), fe = W((t) => {
		if (R.current = !1, te.current = !0, t.which === 229 || !ae.current && t.currentTarget === M.current) return;
		if (l && Ju(t.key, g, u, T)) {
			Gu(t.key, ue()) || Zo(t), e.setOpen(!1, Q(Ra, t.nativeEvent));
			let n = C?.current ?? O;
			vt(n) && n.focus();
			return;
		}
		r != null && r !== I.current && !dc(n.current, r) && (I.current = r);
		let i = I.current, a = fc(n, h), o = pc(n, h);
		if (j || (t.key === "Home" && (Zo(t), I.current = a, z(t)), t.key === "End" && (Zo(t), I.current = o, z(t))), w != null) {
			let e = w(t, I.current, n, g, c, u, h, a, o);
			if (e != null && e !== I.current && (I.current = e, z(t)), g === "both") return;
		}
		if (Gu(t.key, g)) {
			Zo(t);
			let e = rs(t.currentTarget.ownerDocument);
			if (E && !d && $(t.currentTarget, e) && !n.current.some((t) => t != null && $(t, e))) {
				I.current = Ku(t.key, g, u) ? a : o, z(t), r === I.current && se();
				return;
			}
			let { index: l, wrapped: f } = mc(n.current, i, {
				decrement: !Ku(t.key, g, u),
				loopFocus: c,
				allowEscape: s,
				disabledIndices: h,
				minIndex: a,
				maxIndex: o
			});
			f && (te.current = !1), I.current = l, z(t);
		}
	}), pe = x.useMemo(() => ({
		onFocus(e) {
			te.current = !0, le(e);
		},
		onClick({ currentTarget: e }) {
			d || e.focus({ preventScroll: !0 });
		},
		onMouseMove(e) {
			Uu(e) || (te.current = !0, ne.current = !1, p && le(e));
		},
		onPointerLeave(e) {
			if (!ae.current || !R.current || e.pointerType === "touch") return;
			te.current = !0;
			let t = e.relatedTarget;
			if (p && !n.current.includes(t) && oe.current && (re.current?.(), re.current = null, I.current = -1, z(e), !d)) {
				let e = M.current, t = rs(dn(e));
				e && $(e, t) && e.focus({ preventScroll: !0 });
			}
		}
	}), [
		le,
		ae,
		M,
		p,
		n,
		z,
		oe,
		d
	]), me = x.useMemo(() => d && E && ce && { "aria-activedescendant": `${y}-${r}` }, [
		d,
		E,
		ce,
		y,
		r
	]), he = x.useMemo(() => ({
		...j ? {} : me,
		onKeyDown(t) {
			if (t.key === "Tab" && t.shiftKey && E && !d) {
				let n = as(t.nativeEvent);
				if (n && !$(M.current, n)) return;
				Zo(t);
				let r = Q(Ia, t.nativeEvent);
				e.setOpen(!1, r);
				let i = C?.current ?? O;
				!r.isCanceled && vt(i) && i.focus();
			} else fe(t);
		},
		onPointerMove(e) {
			Uu(e) || (R.current = !0);
		}
	}), [
		me,
		fe,
		M,
		j,
		e,
		E,
		d,
		O,
		C
	]), ge = x.useMemo(() => {
		function t(t) {
			e.setOpen(!0, Q(Ra, t.nativeEvent, t.currentTarget));
		}
		function n(e) {
			f === "auto" && $o(e.nativeEvent) && (F.current = !d);
		}
		function r(e) {
			F.current = f, f === "auto" && es(e.nativeEvent) && (F.current = !0);
		}
		return {
			onKeyDown(n) {
				let r = e.select("open");
				R.current = !1;
				let i = n.key.startsWith("Arrow"), a = qu(n.key, ue(), u), o = Gu(n.key, r ? g : _), s = (l ? a : o) || n.key === "Enter" || n.key.trim() === "";
				if (d && r && (!l || gs(n.currentTarget))) return fe(n);
				if (r || m || !i) {
					if (s) {
						let e = Gu(n.key, ue());
						L.current = l && e ? null : n.key;
					}
					l ? a && (Zo(n), r ? (I.current = de(), z(n), d && M.current?.focus()) : t(n)) : o && (V.current != null && (I.current = V.current), Zo(n), !r && m ? t(n) : fe(n), r && z(n));
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
		fe,
		f,
		de,
		l,
		z,
		e,
		m,
		g,
		_,
		ue,
		u,
		V,
		d,
		M
	]), _e = x.useMemo(() => ({
		...me,
		...ge
	}), [me, ge]);
	return x.useMemo(() => a ? {
		reference: _e,
		floating: he,
		item: pe,
		trigger: ge
	} : {}, [
		a,
		_e,
		he,
		ge,
		pe
	]);
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useTypeahead.mjs
function Xu(e, t) {
	let { listRef: n, elementsRef: r, activeIndex: i, onMatch: a, disabledIndices: o, onTyping: s, enabled: c = !0, resetMs: l = 750, selectedIndex: u = null } = t, d = W(s), f = e.useState("open"), p = Xo(), m = x.useRef(""), h = x.useRef(u ?? i ?? -1), g = x.useRef(null), _ = W((e) => {
		function t(e) {
			return r?.current[e];
		}
		function s(e) {
			let n = t(e);
			return n && !vc(n) || n?.matches(":disabled") ? !1 : o == null || !gc(En, e, o);
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
		if (m.current.length > 0 && e.key === " " && (Zo(e), d?.(!0)), m.current.length > 0 && m.current[0] !== " " && c(_, m.current) === -1 && e.key !== " " && d?.(!1), _ == null || e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		f && e.key !== " " && (Zo(e), d?.(!0));
		let v = m.current === "";
		v && (h.current = u ?? i ?? -1), _.every((e, t) => e && s(t) ? e[0]?.toLowerCase() !== e[1]?.toLowerCase() : !0) && m.current === e.key && (m.current = "", h.current = g.current), m.current += e.key, p.start(l, () => {
			m.current = "", h.current = g.current, d?.(!1);
		});
		let y = ((v ? u ?? i ?? -1 : h.current) ?? 0) + 1, b = c(_, m.current, y);
		b === -1 ? e.key !== " " && (m.current = "", d?.(!1)) : (a?.(b, e), g.current = b);
	}), v = W((t) => {
		let n = t.relatedTarget, r = e.select("domReferenceElement"), i = e.select("floatingElement");
		$(r, n) || $(i, n) || (p.clear(), m.current = "", h.current = g.current, d?.(!1));
	});
	G(() => {
		(f || u === null) && (p.clear(), g.current = null, m.current !== "" && (m.current = "", d?.(!1)));
	}, [
		f,
		u,
		p,
		d
	]);
	let y = x.useMemo(() => ({
		onKeyDown: _,
		onBlur: v
	}), [_, v]);
	return x.useMemo(() => c ? {
		reference: y,
		floating: y
	} : {}, [c, y]);
}
// node_modules/@base-ui/react/floating-ui-react/safePolygon.mjs
var Zu = .1, Qu = Zu * Zu, $u = .5;
function ed(e, t, n, r, i, a) {
	return r >= t != a >= t && e <= (i - n) * (t - r) / (a - r) + n;
}
function td(e, t, n, r, i, a, o, s, c, l) {
	let u = !1;
	return ed(e, t, n, r, i, a) && (u = !u), ed(e, t, i, a, o, s) && (u = !u), ed(e, t, o, s, c, l) && (u = !u), ed(e, t, c, l, n, r) && (u = !u), u;
}
function nd(e, t, n) {
	return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
}
function rd(e, t, n, r, i, a) {
	return e >= Math.min(n, i) && e <= Math.max(n, i) && t >= Math.min(r, a) && t <= Math.max(r, a);
}
function id(e = {}) {
	let { blockPointerEvents: t = !1 } = e, n = new Yo(), r = ({ x: e, y: t, placement: r, elements: i, onClose: a, nodeId: o, tree: s }) => {
		let c = r?.split("-")[0], l = !1, u = null, d = null, f = typeof performance < "u" ? performance.now() : 0;
		function p(e, t) {
			let n = performance.now(), r = n - f;
			if (u === null || d === null || r === 0) return u = e, d = t, f = n, !1;
			let i = e - u, a = t - d, o = i * i + a * a, s = r * r * Qu;
			return u = e, d = t, f = n, o < s;
		}
		function m() {
			n.clear(), a();
		}
		return function(r) {
			n.clear();
			let a = i.domReference, u = i.floating;
			if (!a || !u || c == null || e == null || t == null) return;
			let { clientX: d, clientY: f } = r, h = as(r), g = r.type === "mouseleave", _ = $(u, h), v = $(a, h);
			if (_ && (l = !0, !g)) return;
			if (v && (l = !1, !g)) {
				l = !0;
				return;
			}
			if (g && _t(r.relatedTarget) && $(u, r.relatedTarget)) return;
			function y() {
				return !!(s && Hc(s.nodesRef.current, o).length > 0);
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
					j = rd(d, f, D, x.top + 1, O, S.bottom - 1);
					break;
				case "bottom":
					j = rd(d, f, D, S.top + 1, O, x.bottom - 1);
					break;
				case "left":
					j = rd(d, f, S.right - 1, A, x.left + 1, k);
					break;
				case "right": j = rd(d, f, x.right - 1, A, S.left + 1, k);
			}
			if (j) return;
			if (l && !nd(d, f, x) || !g && p(d, f)) {
				b();
				return;
			}
			let M = !1;
			switch (c) {
				case "top": {
					let n = T ? $u / 2 : $u * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t + $u + 1, o = C || T ? S.bottom - $u : S.top, s = C ? T ? S.bottom - $u : S.top : S.bottom - $u;
					M = td(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "bottom": {
					let n = T ? $u / 2 : $u * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t - $u, o = C || T ? S.top + $u : S.bottom, s = C ? T ? S.top + $u : S.bottom : S.top + $u;
					M = td(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "left": {
					let n = E ? $u / 2 : $u * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e + $u + 1, o = w || E ? S.right - $u : S.left, s = w ? E ? S.right - $u : S.left : S.right - $u;
					M = td(d, f, o, S.top, s, S.bottom, a, r, a, i);
					break;
				}
				case "right": {
					let n = E ? $u / 2 : $u * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e - $u, o = w || E ? S.left + $u : S.right, s = w ? E ? S.left + $u : S.right : S.left + $u;
					M = td(d, f, a, r, a, i, o, S.top, s, S.bottom);
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
function ad(e, t, n) {
	let { reference: r, floating: i } = e, a = Xs(t), o = Zs(t), s = Ys(o), c = Ks(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = qs(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function od(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Gs(t, e), p = lc(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = uc(await i.getClippingRect({
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
	}, y = uc(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var sd = 50, cd = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: od
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = ad(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < sd && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = ad(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, ld = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Gs(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Ks(r), _ = Xs(o), v = Ks(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [sc(o)] : $s(o)), x = p !== "none";
			!d && x && b.push(...oc(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Qs(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === Xs(t) || T.every((e) => Xs(e.placement) !== _ || e.overflows[0] > 0))) return {
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
								let t = Xs(e.placement);
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
}, ud = /*#__PURE__*/ new Set(["left", "top"]);
async function dd(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Ks(n), s = qs(n), c = Xs(n) === "y", l = ud.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Gs(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var fd = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await dd(t, e);
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
}, pd = function(e) {
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
			} }, ...l } = Gs(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = Xs(i), p = Js(f), m = u[p], h = u[f], g = (e, t) => Ws(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
}, md = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Gs(e, t), u = {
				x: n,
				y: r
			}, d = Xs(i), f = Js(d), p = u[f], m = u[d], h = Gs(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = ud.has(Ks(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, hd = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = Gs(e, t), c = await i.detectOverflow(t, s), l = Ks(n), u = qs(n), d = Xs(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = Rs(p - c[m], g), y = Rs(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * zs(c.left, c.right) : S = p - 2 * zs(c.top, c.bottom)), await o({
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
function gd(e) {
	let t = jt(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = vt(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Bs(n) !== a || Bs(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function _d(e) {
	return _t(e) ? e : e.contextElement;
}
function vd(e) {
	let t = _d(e);
	if (!vt(t)) return Hs(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = gd(t), o = (a ? Bs(n.width) : n.width) / r, s = (a ? Bs(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
var yd = /*#__PURE__*/ Hs(0);
function bd(e) {
	let t = mt(e);
	return !kt() || !t.visualViewport ? yd : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function xd(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === mt(e);
}
function Sd(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = _d(e), o = Hs(1);
	t && (r ? _t(r) && (o = vd(r)) : o = vd(e));
	let s = xd(a, n, r) ? bd(a) : Hs(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = mt(a), t = _t(r) ? mt(r) : r, n = e, i = It(n);
		for (; i && t !== n;) {
			let e = vd(i), t = i.getBoundingClientRect(), r = jt(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = mt(i), i = It(n);
		}
	}
	return uc({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Cd(e, t) {
	let n = Mt(e).scrollLeft;
	return t ? t.left + n : Sd(ht(e)).left + n;
}
function wd(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Cd(e, n),
		y: n.top + t.scrollTop
	};
}
function Td(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = ht(r), s = t ? St(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Hs(1), u = Hs(0), d = vt(r);
	if ((d || !a) && ((pt(r) !== "body" || bt(o)) && (c = Mt(r)), d)) {
		let e = Sd(r);
		l = vd(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? wd(o, c) : Hs(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Ed(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Dd(e) {
	let t = Mt(e), n = e.ownerDocument.body, r = zs(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = zs(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Cd(e), o = -t.scrollTop;
	return jt(n).direction === "rtl" && (a += zs(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Od = 25;
function kd(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = mt(e), a = ht(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !kt() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Cd(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Od && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Ad(e, t) {
	let n = Sd(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = vd(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function jd(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = kd(e, n, t);
	else if (t === "document") r = Dd(ht(e));
	else if (_t(t)) r = Ad(t, n);
	else {
		let n = bd(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return uc(r);
}
function Md(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Ft(e, [], !1).filter((e) => _t(e) && pt(e) !== "body"), i = null, a = jt(e).position === "fixed", o = a ? Nt(e) : e;
	for (; _t(o) && !At(o);) {
		let e = jt(o), t = Dt(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Nt(o);
	}
	return t.set(e, r), r;
}
function Nd(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? St(t) ? [] : Md(t, this._c) : [].concat(n), r], o = jd(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = jd(t, a[e], i);
		s = zs(n.top, s), c = Rs(n.right, c), l = Rs(n.bottom, l), u = zs(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Pd(e) {
	let { width: t, height: n } = gd(e);
	return {
		width: t,
		height: n
	};
}
function Fd(e, t, n) {
	let r = vt(t), i = ht(t), a = n === "fixed", o = Sd(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Hs(0);
	if ((r || !a) && ((pt(t) !== "body" || bt(i)) && (s = Mt(t)), r)) {
		let e = Sd(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Cd(i));
	let l = i && !r && !a ? wd(i, s) : Hs(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Id(e) {
	return jt(e).position === "static";
}
function Ld(e, t) {
	if (!vt(e) || jt(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return ht(e) === n && (n = n.ownerDocument.body), n;
}
function Rd(e, t) {
	let n = mt(e);
	if (St(e)) return n;
	if (!vt(e)) {
		let t = Nt(e);
		for (; t && !At(t);) {
			if (_t(t) && !Id(t)) return t;
			t = Nt(t);
		}
		return n;
	}
	let r = Ld(e, t);
	for (; r && xt(r) && Id(r);) r = Ld(r, t);
	return r && At(r) && Id(r) && !Dt(r) ? n : r || Ot(e) || n;
}
var zd = async function(e) {
	let t = this.getOffsetParent || Rd, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Fd(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Bd(e) {
	return jt(e).direction === "rtl";
}
var Vd = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Td,
	getDocumentElement: ht,
	getClippingRect: Nd,
	getOffsetParent: Rd,
	getElementRects: zd,
	getClientRects: Ed,
	getDimensions: Pd,
	getScale: vd,
	isElement: _t,
	isRTL: Bd
};
function Hd(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ud(e, t, n) {
	let r = null, i, a = ht(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Vs(d), h = Vs(a.clientWidth - (u + f)), g = Vs(a.clientHeight - (d + p)), _ = Vs(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: zs(0, Rs(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Hd(l, e.getBoundingClientRect())) return s();
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
	let c = mt(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Wd(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = _d(e), u = i || a ? [...l ? Ft(l) : [], ...t ? Ft(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Ud(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Sd(e) : null;
	c && g();
	function g() {
		let t = Sd(e);
		h && !Hd(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Gd = fd, Kd = pd, qd = ld, Jd = hd, Yd = md, Xd = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Vd,
		...i.platform,
		_c: r
	};
	return cd(e, t, {
		...i,
		platform: a
	});
}, Zd = typeof document < "u" ? x.useLayoutEffect : function() {};
function Qd(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Qd(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Qd(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function $d(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ef(e, t) {
	let n = $d(e);
	return Math.round(t * n) / n;
}
function tf(e) {
	let t = x.useRef(e);
	return Zd(() => {
		t.current = e;
	}), t;
}
function nf(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = x.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = x.useState(r);
	Qd(f, r) || p(r);
	let [m, h] = x.useState(null), [g, _] = x.useState(null), v = x.useCallback((e) => {
		e !== C.current && (C.current = e, h(e));
	}, []), y = x.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), b = a || m, S = o || g, C = x.useRef(null), w = x.useRef(null), T = x.useRef(u), E = c != null, D = tf(c), O = tf(i), k = tf(l), A = x.useCallback(() => {
		if (!C.current || !w.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		O.current && (e.platform = O.current), Xd(C.current, w.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: k.current !== !1
			};
			j.current && !Qd(T.current, t) && (T.current = t, wi.flushSync(() => {
				d(t);
			}));
		});
	}, [
		f,
		t,
		n,
		O,
		k
	]);
	Zd(() => {
		l === !1 && T.current.isPositioned && (T.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let j = x.useRef(!1);
	Zd(() => (j.current = !0, () => {
		j.current = !1;
	}), []), Zd(() => {
		if (b && (C.current = b), S && (w.current = S), b && S) {
			if (D.current) return D.current(b, S, A);
			A();
		}
	}, [
		b,
		S,
		A,
		D,
		E
	]);
	let M = x.useMemo(() => ({
		reference: C,
		floating: w,
		setReference: v,
		setFloating: y
	}), [v, y]), N = x.useMemo(() => ({
		reference: b,
		floating: S
	}), [b, S]), P = x.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!N.floating) return e;
		let t = ef(N.floating, u.x), r = ef(N.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...$d(N.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		N.floating,
		u.x,
		u.y
	]);
	return x.useMemo(() => ({
		...u,
		update: A,
		refs: M,
		elements: N,
		floatingStyles: P
	}), [
		u,
		A,
		M,
		N,
		P
	]);
}
var rf = (e, t) => {
	let n = Gd(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, af = (e, t) => {
	let n = Kd(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, of = (e, t) => ({
	fn: Yd(e).fn,
	options: [e, t]
}), sf = (e, t) => {
	let n = qd(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, cf = (e, t) => {
	let n = Jd(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, lf = /*#__PURE__*/ x.createContext(void 0);
function uf(e) {
	let t = x.useContext(lf);
	if (t === void 0 && !e) throw Error(sn(69));
	return t;
}
// node_modules/@base-ui/react/internals/composite/composite.mjs
var df = "ArrowUp", ff = "ArrowDown", pf = "ArrowLeft", mf = "ArrowRight", hf = /* @__PURE__ */ new Set([
	df,
	ff,
	pf,
	mf,
	"Home",
	"End"
]), gf = [
	"Shift",
	"Control",
	"Alt",
	"Meta"
];
function _f(e) {
	return vt(e) && e.tagName === "INPUT";
}
function vf(e) {
	return !!(_f(e) && e.selectionStart != null || vt(e) && e.tagName === "TEXTAREA");
}
function yf(e, t, n, r) {
	if (!e || !t || !t.scrollTo) return;
	let i = e.scrollLeft, a = e.scrollTop, o = e.clientWidth < e.scrollWidth, s = e.clientHeight < e.scrollHeight;
	if (o && r !== "vertical") {
		let r = bf(e, t, "left"), a = xf(e), o = xf(t);
		n === "ltr" && (r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight ? i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight : r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft && (i = r - o.scrollMarginLeft - a.scrollPaddingLeft)), n === "rtl" && (r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft ? i = r - o.scrollMarginLeft - a.scrollPaddingLeft : r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight && (i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight));
	}
	if (s && r !== "horizontal") {
		let n = bf(e, t, "top"), r = xf(e), i = xf(t);
		n - i.scrollMarginTop < e.scrollTop + r.scrollPaddingTop ? a = n - i.scrollMarginTop - r.scrollPaddingTop : n + t.offsetHeight + i.scrollMarginBottom > e.scrollTop + e.clientHeight - r.scrollPaddingBottom && (a = n + t.offsetHeight + i.scrollMarginBottom - e.clientHeight + r.scrollPaddingBottom);
	}
	e.scrollTo({
		left: i,
		top: a,
		behavior: "auto"
	});
}
function bf(e, t, n) {
	let r = n === "left" ? "offsetLeft" : "offsetTop", i = 0;
	for (; t.offsetParent && (i += t[r], t.offsetParent !== e);) t = t.offsetParent;
	return i;
}
function xf(e) {
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
function Sf(e) {
	return e === "starting" ? il : Dn;
}
// node_modules/@base-ui/react/menu/submenu-root/MenuSubmenuRootContext.mjs
var Cf = /*#__PURE__*/ x.createContext(void 0);
function wf() {
	return x.useContext(Cf);
}
// node_modules/@base-ui/react/internals/resolveRenderedId.mjs
function Tf(e, t) {
	let n = Fn(e.render);
	if (/*#__PURE__*/ x.isValidElement(n)) {
		let e = n.props;
		if (Object.hasOwn(e, "id")) return e.id ?? "";
	}
	return e.id ?? t;
}
function Ef(e, t, n) {
	let r = Tf(e, t), i = r === t ? void 0 : r;
	return [r, x.useCallback((e) => n?.(e ? i : void 0), [i, n])];
}
// node_modules/@base-ui/react/internals/resolvePopupLabel.mjs
function Df(e, t, n) {
	let r = Fn(e.render), i = /*#__PURE__*/ x.isValidElement(r) ? r.props : void 0, a = e["aria-label"] ?? i?.["aria-label"], o = e["aria-labelledby"] ?? i?.["aria-labelledby"];
	return o == null && !a && (o = t ? t.id || void 0 : n || void 0), o;
}
// node_modules/@base-ui/react/menu/popup/MenuPopup.mjs
var Of = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, id: o, initialFocus: s, ...c } = e, { store: l, defaultFloatingId: u, setRenderedFloatingId: d, virtualFocus: f, orientation: p } = sa(), m = wf(), { side: h, align: g } = aa(), _ = uf(!0) != null, v = l.useState("open"), y = l.useState("transitionStatus"), b = l.useState("popupProps"), S = l.useState("mounted"), C = l.useState("instantType"), w = l.useState("activeTriggerElement"), T = l.useState("parent"), E = l.useState("lastOpenChangeReason"), D = l.useState("rootId"), O = l.useState("floatingRootContext"), k = l.useState("floatingTreeRoot"), A = l.useState("closeDelay"), j = l.useState("hoverEnabled"), M = l.useState("disabled"), N = l.useState("openMethod"), P = l.useState("activeTriggerId"), F = l.useState("listElement"), [I, L] = Ef(e, u, d), R = Df(e, w, P), z = T.type === "menu" ? m : void 0, ee = T.type === "context-menu", B = s ?? T.type !== "menu";
	s === void 0 && F && T.type !== "menu" && (B = () => l.state.activeIndex === null && F), Bo({
		open: v,
		ref: l.context.popupRef,
		onComplete() {
			v && l.context.onOpenChangeComplete?.(!0);
		}
	}), x.useEffect(() => {
		function e(e) {
			l.setOpen(!1, Q(e.reason, e.domEvent));
		}
		return k.events.on("close", e), () => {
			k.events.off("close", e);
		};
	}, [k.events, l]), Bu(O, {
		enabled: j && !M && !ee && T.type !== "menubar",
		closeDelay: A
	});
	let te = l.useStateSetter("popupElement"), { parentVirtualFocusRef: ne, handleFocus: re } = (x.useContext(Ya)?.useParentHandoff ?? Af)(l, T, v, f), ie = jn("div", e, {
		state: {
			transitionStatus: y,
			side: h,
			align: g,
			open: v,
			nested: T.type === "menu",
			instant: C
		},
		ref: [
			t,
			l.context.popupRef,
			te,
			L
		],
		stateAttributesMapping: Ea,
		props: [
			b,
			{
				id: I,
				...F ? { role: "presentation" } : {
					role: "menu",
					"aria-orientation": p === "horizontal" ? "horizontal" : void 0,
					"aria-labelledby": R
				},
				onKeyDown(e) {
					z?.onPopupKeyDown?.(e), _ && hf.has(e.key) && e.stopPropagation();
				},
				onFocus: re
			},
			Sf(y),
			c,
			{ "data-rootownerid": D }
		]
	}), ae = T.type === void 0 || ee;
	(w || T.type === "menubar" && E !== "outside-press") && (ae = !0);
	let V = z?.getReturnElement ?? ne;
	return /*#__PURE__*/ (0, X.jsx)(jl, {
		context: O,
		openInteractionType: N,
		modal: ee,
		disabled: !S,
		returnFocus: a ?? V ?? ae,
		explicitReturnFocus: a === void 0 && V ? !1 : void 0,
		initialFocus: B,
		restoreFocus: !0,
		getInsideElements: T.type === void 0 ? () => [l.context.beforeTriggerFocusGuardRef.current] : void 0,
		externalTree: T.type === "menubar" ? void 0 : k,
		previousFocusableElement: w,
		nextFocusableElement: T.type === void 0 ? l.context.triggerFocusTargetRef : void 0,
		beforeContentFocusGuardRef: l.context.beforeContentFocusGuardRef,
		children: ie
	});
}), kf = {
	parentVirtualFocusRef: void 0,
	handleFocus: void 0
};
function Af() {
	return kf;
}
var jf = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let n = Xa()?.Popup ?? Of;
	return /*#__PURE__*/ (0, X.jsx)(n, {
		...e,
		ref: t
	});
}), Mf = /*#__PURE__*/ x.createContext(void 0);
function Nf() {
	let e = x.useContext(Mf);
	if (e === void 0) throw Error(sn(32));
	return e;
}
// node_modules/@base-ui/react/menu/portal/MenuPortal.mjs
var Pf = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i, parent: a } = sa();
	if (!(i.useState("mounted") || n)) return null;
	let o = a.type === "menu" || a.type === "menubar" ? "group" : void 0;
	return /*#__PURE__*/ (0, X.jsx)(Mf.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, X.jsx)(pl, {
			ref: t,
			...r,
			portalOwnerRole: o
		})
	});
});
// node_modules/@base-ui/utils/inertValue.mjs
function Ff(e) {
	return Cn(19) ? e : e ? "true" : void 0;
}
// node_modules/@base-ui/react/floating-ui-react/hooks/useFloating.mjs
function If(e) {
	let { nodeId: t, externalTree: n, rootContext: r } = e, i = r.useState("referenceElement"), a = r.useState("floatingElement"), o = r.useState("domReferenceElement"), s = r.useState("open"), c = r.useState("floatingId"), [l, u] = x.useState(null), d = x.useRef(null), f = yl(n), p = x.useMemo(() => ({
		reference: i,
		floating: a,
		domReference: o
	}), [
		i,
		a,
		o
	]), m = nf({
		...e,
		elements: {
			...p,
			...l && { reference: l }
		}
	}), h = x.useCallback((e) => {
		let t = _t(e) ? {
			getBoundingClientRect: () => e.getBoundingClientRect(),
			getClientRects: () => e.getClientRects(),
			contextElement: e
		} : e;
		u(t), m.refs.setReference(t);
	}, [m.refs]), g = x.useMemo(() => ({
		...m.refs,
		setPositionReference: h,
		domReference: d
	}), [m.refs, h]), _ = x.useMemo(() => ({
		...m.elements,
		domReference: o
	}), [m.elements, o]), v = x.useMemo(() => ({
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
	}), x.useMemo(() => ({
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
// node_modules/@base-ui/react/internals/direction-context/DirectionContext.mjs
var Lf = /*#__PURE__*/ x.createContext(void 0);
function Rf() {
	return x.useContext(Lf)?.direction ?? "ltr";
}
// node_modules/@base-ui/react/floating-ui-react/middleware/arrow.mjs
var zf = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = Gs(e, t) || {};
		if (l == null) return {};
		let d = lc(u), f = {
			x: n,
			y: r
		}, p = Zs(i), m = Ys(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = s.floating[y] || a.floating[m], C = b / 2 - x / 2, w = S / 2 - h[m] / 2 - 1, T = Math.min(d[_], w), E = Math.min(d[v], w), D = T, O = S - h[m] - E, k = S / 2 - h[m] / 2 + C, A = Ws(D, k, O), j = !c.arrow && qs(i) != null && k !== A && a.reference[m] / 2 - (k < D ? T : E) - h[m] / 2 < 0, M = j ? k < D ? k - D : k - O : 0;
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
}), Bf = (e, t) => {
	let { name: n, fn: r } = zf(e);
	return {
		name: n,
		fn: r,
		options: [e, t]
	};
}, Vf = {
	name: "hide",
	async fn(e) {
		let { width: t, height: n, x: r, y: i } = e.rects.reference, a = t === 0 && n === 0 && r === 0 && i === 0, o = await e.platform.detectOverflow(e, { elementContext: "reference" });
		return { data: { referenceHidden: o.top - n >= 0 || o.right - t >= 0 || o.bottom - n >= 0 || o.left - t >= 0 || a } };
	}
}, Hf = {
	sideX: "left",
	sideY: "top"
}, Uf = "--available-width", Wf = "--available-height", Gf = "--anchor-width", Kf = "--anchor-height", qf = "--transform-origin", Jf = Uf, Yf = Wf;
function Xf(e, t, n) {
	let r = e === "inline-start" || e === "inline-end";
	return {
		top: "top",
		right: r ? n ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: r ? n ? "inline-end" : "inline-start" : "left"
	}[t];
}
function Zf(e, t, n) {
	let { rects: r, placement: i } = e;
	return {
		side: Xf(t, Ks(i), n),
		align: qs(i) || "center",
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
function Qf(e) {
	return $f(e, If);
}
function $f(e, t) {
	let { anchor: n, positionMethod: r = "absolute", side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, collisionBoundary: c, collisionPadding: l = 5, sticky: u = !1, arrowPadding: d = 5, disableAnchorTracking: f = !1, inline: p, keepMounted: m = !1, floatingRootContext: h, mounted: g, collisionAvoidance: _, shift: v, nodeId: y, adaptiveOrigin: b, lazyFlip: S = !1, externalTree: C } = e, w = _.side || "flip", T = _.align || "flip", E = _.fallbackAxisSide || "end", D = v?.crossAxis ?? !1, O = v?.rootBoundary, k = typeof n == "function" ? n : void 0, A = W(k), j = k ? A : n, M = Ms(n), N = Ms(g), P = Rf() === "rtl", [F, I] = x.useState(null);
	!g && F !== null && I(null);
	let L = S === "placement", R = F ? Ks(F) : null, z = F && L ? qs(F) || "center" : null, ee = R || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": P ? "left" : "right",
		"inline-start": P ? "right" : "left"
	}[i], B = z || o, te = B === "center" ? ee : `${ee}-${B}`, ne = l;
	typeof ne == "number" ? ne = {
		top: ne,
		right: ne,
		bottom: ne,
		left: ne
	} : ne &&= {
		top: ne.top || 0,
		right: ne.right || 0,
		bottom: ne.bottom || 0,
		left: ne.left || 0
	};
	let re = +(i === "bottom"), ie = +(i === "top"), ae = +(i === "right"), V = +(i === "left"), oe = {
		boundary: c === "clipping-ancestors" ? "clippingAncestors" : c,
		padding: ne
	}, H = x.useRef(null), U = Ms(a), se = Ms(s), ce = typeof a == "function" ? 0 : a, le = typeof s == "function" ? 0 : s, ue = [];
	p && ue.push(p), ue.push(rf((e) => {
		let t = Zf(e, i, P), n = typeof U.current == "function" ? U.current(t) : U.current, r = typeof se.current == "function" ? se.current(t) : se.current;
		return {
			mainAxis: n,
			crossAxis: r,
			alignmentAxis: r
		};
	}, [
		ce,
		le,
		P,
		i
	]));
	let de = T === "none" && w !== "shift", fe = !de && (u || D || w === "shift"), pe = w === "none" ? null : sf({
		...oe,
		padding: {
			top: ne.top + 1 + re,
			right: ne.right + 1 + V,
			bottom: ne.bottom + 1 + ie,
			left: ne.left + 1 + ae
		},
		mainAxis: !D && w === "flip",
		crossAxis: T === "flip" && "alignment",
		fallbackAxisSideDirection: E
	}), me = de ? null : af({
		...oe,
		rootBoundary: O,
		mainAxis: T !== "none",
		crossAxis: fe,
		limiter: u || D ? void 0 : of((e) => {
			if (!H.current) return {};
			let { width: t, height: n } = H.current.getBoundingClientRect(), r = Xs(Ks(e.placement)), i = r === "y" ? t : n, a = r === "y" ? ne.left + ne.right : ne.top + ne.bottom;
			return { offset: i / 2 + a / 2 };
		})
	}, [
		oe,
		u,
		D,
		O,
		ne,
		T
	]);
	w === "shift" || T === "shift" || B === "center" ? ue.push(me, pe) : ue.push(pe, me), ue.push(cf({
		...oe,
		apply({ elements: { floating: e }, availableWidth: t, availableHeight: n, rects: r }) {
			if (!N.current) return;
			let i = e.style;
			i.setProperty(Jf, `${t}px`), i.setProperty(Yf, `${n}px`);
			let a = mt(e).devicePixelRatio || 1, { x: o, y: s, width: c, height: l } = r.reference, u = (Math.round((o + c) * a) - Math.round(o * a)) / a, d = (Math.round((s + l) * a) - Math.round(s * a)) / a;
			i.setProperty(Gf, `${u}px`), i.setProperty(Kf, `${d}px`);
		}
	}), Bf((e) => ({
		element: H.current || dn(e.elements.floating).createElement("div"),
		padding: H.current ? d : 0
	}), [d]), {
		name: "transformOrigin",
		fn(e) {
			let { elements: { floating: t }, middlewareData: n, placement: r, platform: o, rects: s, y: c } = e, l = Ks(r), u = qs(r), d = Xs(l) === "y", f = H.current, p = typeof a == "function" ? a(Zf(e, i, P)) : a, m;
			m = !f && u && Math.abs(d ? n.shift?.x || 0 : n.shift?.y || 0) <= 1 ? u === "start" === (d && o.isRTL?.(t) === !0) ? "100%" : "0%" : `${(d ? n.arrow?.x || 0 : n.arrow?.y || 0) + (d ? f?.clientWidth || 0 : f?.clientHeight || 0) / 2}px`;
			let h = l === "top" || l === "left" ? `calc(100% + ${p}px)` : `${-p}px`;
			return fe && d && Math.abs(n.shift?.y || 0) > p && (h = `${s.reference.y + s.reference.height / 2 - c}px`), t.style.setProperty(qf, d ? `${m} ${h}` : `${h} ${m}`), {};
		}
	}, Vf, b), G(() => {
		!g && h && h.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null,
			positionReference: null
		});
	}, [g, h]);
	let he = x.useMemo(() => ({
		ancestorScroll: !f,
		elementResize: !f && typeof ResizeObserver < "u",
		layoutShift: !f && typeof IntersectionObserver < "u"
	}), [f]), { refs: ge, elements: _e, x: ve, y: ye, middlewareData: be, update: xe, placement: Se, context: Ce, isPositioned: we, floatingStyles: Te } = t({
		rootContext: h,
		open: m ? g : void 0,
		placement: te,
		middleware: ue,
		strategy: r,
		whileElementsMounted: m ? void 0 : (...e) => Wd(...e, he),
		nodeId: y,
		externalTree: C
	}), { sideX: Ee, sideY: De } = be.adaptiveOrigin || Hf, Oe = we ? r : "fixed", ke = x.useMemo(() => {
		let e;
		return e = we ? b ? {
			position: Oe,
			[Ee]: ve,
			[De]: ye
		} : {
			...Te,
			position: Oe
		} : {
			position: Oe,
			top: 0,
			left: 0
		}, e[Jf] = "100vw", e[Yf] = "100vh", we || (e.opacity = 0), e;
	}, [
		b,
		Oe,
		Ee,
		ve,
		De,
		ye,
		Te,
		we
	]), Ae = x.useRef(null);
	G(() => {
		if (!g) return;
		let e = M.current, t = typeof e == "function" ? e() : e, n = (ep(t) ? t.current : t) || null;
		n !== Ae.current && (ge.setPositionReference(n), Ae.current = n);
	}, [
		g,
		ge,
		j,
		M
	]), x.useEffect(() => {
		if (!g) return;
		let e = M.current;
		typeof e != "function" && ep(e) && e.current !== Ae.current && (ge.setPositionReference(e.current), Ae.current = e.current);
	}, [
		g,
		ge,
		j,
		M
	]), x.useEffect(() => {
		if (m && g && _e.reference && _e.floating) return Wd(_e.reference, _e.floating, xe, he);
	}, [
		m,
		g,
		_e,
		xe,
		he
	]);
	let je = Ks(Se), Me = Xf(i, je, P), Ne = qs(Se) || "center", Pe = !!be.hide?.referenceHidden;
	G(() => {
		S && g && we && (je !== ee || L && Ne !== B) && I(Se);
	}, [
		S,
		L,
		g,
		we,
		Se,
		je,
		Ne,
		ee,
		B
	]);
	let Fe = x.useMemo(() => ({
		position: "absolute",
		top: be.arrow?.y,
		left: be.arrow?.x
	}), [be.arrow]), Ie = be.arrow?.centerOffset !== 0;
	return x.useMemo(() => ({
		positionerStyles: ke,
		arrowStyles: Fe,
		arrowRef: H,
		arrowUncentered: Ie,
		side: Me,
		align: Ne,
		physicalSide: je,
		anchorHidden: Pe,
		refs: ge,
		context: Ce,
		isPositioned: we,
		update: xe
	}), [
		ke,
		Fe,
		H,
		Ie,
		Me,
		Ne,
		je,
		Pe,
		ge,
		Ce,
		we,
		xe
	]);
}
function ep(e) {
	return e != null && "current" in e;
}
// node_modules/@base-ui/react/internals/composite/list/CompositeList.mjs
function tp(e) {
	let { children: t, elementsRef: n, labelsRef: r, onMapChange: i } = e, a = W(i), [, o] = x.useState(0), s = zt(rp).current, c = zt(np).current, l = x.useRef(0), u = x.useRef(!0), d = x.useRef(null), f = x.useRef(null), p = W(() => {
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
			if (!op(n)) return;
			let r = null;
			for (let n of e) if (n.isConnected) {
				if (r && sp(r, n) > 0) {
					t.disconnect(), p();
					return;
				}
				r = n;
			}
		});
		f.current = t;
		let n = /* @__PURE__ */ new Set();
		for (let t = 1; t < e.length; t += 1) {
			let r = ap(e[t - 1], e[t]);
			r && n.add(r);
		}
		n.forEach((e) => t.observe(e, { childList: !0 }));
	}
	let v = W(() => {
		let [e, t] = ip(c), n = g(e), r = d.current, i = !r || r.length !== e.length || e.some((e, t) => {
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
	})), b = x.useMemo(() => ({
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
	return /*#__PURE__*/ (0, X.jsx)(yo.Provider, {
		value: b,
		children: t
	});
}
function np() {
	return /* @__PURE__ */ new Map();
}
function rp() {
	return /* @__PURE__ */ new Set();
}
function ip(e) {
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
	return r.sort((e, t) => sp(e.element, t.element)), r.forEach((e) => {
		for (; t.has(i);) i += 1;
		e.index = i, n.push(e), i += 1;
	}), t.size > 0 && n.sort((e, t) => e.index - t.index), [n, r.map((e) => e.element)];
}
function ap(e, t) {
	let n = e.parentElement;
	for (; n && !n.contains(t);) n = n.parentElement;
	return n;
}
function op(e) {
	for (let t of e) for (let e = 0; e < t.removedNodes.length; e += 1) if (t.removedNodes[e].isConnected) return !0;
	return !1;
}
function sp(e, t) {
	return e.nextElementSibling === t ? -1 : t.nextElementSibling === e ? 1 : e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
// node_modules/@base-ui/react/utils/InternalBackdrop.mjs
var cp = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { cutout: n, ...r } = e, i;
	if (n) {
		let e = n.getBoundingClientRect();
		i = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${e.left}px ${e.top}px,${e.left}px ${e.bottom}px,${e.right}px ${e.bottom}px,${e.right}px ${e.top}px,${e.left}px ${e.top}px)`;
	}
	return /*#__PURE__*/ (0, X.jsx)("div", {
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
function lp(e) {
	let { store: t, domReference: n, positionerElement: r, open: i } = e, a = x.useRef(null), o = x.useRef(null), s = zo(r);
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
// node_modules/@base-ui/react/utils/usePositioner.mjs
function up(e, t, { styles: n, transitionStatus: r, props: i, refs: a, hidden: o, inert: s = !1 }) {
	let c = { ...n };
	return s && (c.pointerEvents = "none"), jn("div", e, {
		state: t,
		ref: a,
		props: [
			{
				role: "presentation",
				hidden: o,
				style: c
			},
			Sf(r),
			i
		],
		stateAttributesMapping: Ta
	});
}
// node_modules/@base-ui/utils/useScrollLock.mjs
var dp = {}, fp = {}, pp = "";
function mp(e, t) {
	return bt(e) ? e : t;
}
function hp(e, t, n) {
	return /hidden|clip/.test(e.getComputedStyle(mp(t, n)).overflowY);
}
function gp(e) {
	if (typeof document > "u") return !1;
	let t = dn(e);
	return mt(t).innerWidth - t.documentElement.clientWidth > 0;
}
function _p(e) {
	if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u") return !1;
	let t = dn(e), n = t.documentElement, r = t.body, i = mp(n, r), a = i.style.overflowY, o = n.style.scrollbarGutter;
	n.style.scrollbarGutter = "stable", i.style.overflowY = "scroll";
	let s = i.offsetWidth;
	i.style.overflowY = "hidden";
	let c = i.offsetWidth;
	return i.style.overflowY = a, n.style.scrollbarGutter = o, s === c;
}
function vp(e) {
	let t = dn(e), n = t.documentElement, r = t.body, i = mp(n, r), a = {
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
function yp(e) {
	let t = dn(e), n = t.documentElement, r = t.body, i = mt(n), a = 0, o = 0, s = !1, c = Mo.create();
	if (fo && (i.visualViewport?.scale ?? 1) !== 1) return () => {};
	function l() {
		let t = i.getComputedStyle(n), c = i.getComputedStyle(r), l = (t.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
		a = n.scrollTop, o = n.scrollLeft, dp = {
			scrollbarGutter: n.style.scrollbarGutter,
			overflowY: n.style.overflowY,
			overflowX: n.style.overflowX
		}, pp = n.style.scrollBehavior, fp = {
			position: r.style.position,
			height: r.style.height,
			width: r.style.width,
			boxSizing: r.style.boxSizing,
			overflowY: r.style.overflowY,
			overflowX: r.style.overflowX,
			scrollBehavior: r.style.scrollBehavior
		};
		let u = n.scrollHeight > n.clientHeight, d = n.scrollWidth > n.clientWidth, f = t.overflowY === "scroll" || c.overflowY === "scroll", p = t.overflowX === "scroll" || c.overflowX === "scroll", m = Math.max(0, i.innerWidth - r.clientWidth), h = Math.max(0, i.innerHeight - r.clientHeight), g = parseFloat(c.marginTop) + parseFloat(c.marginBottom), _ = parseFloat(c.marginLeft) + parseFloat(c.marginRight), v = mp(n, r);
		s = _p(e), s ? (n.style.scrollbarGutter = l, v.style.overflowY = "hidden", v.style.overflowX = "hidden") : (Object.assign(n.style, {
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
		Object.assign(n.style, dp), Object.assign(r.style, fp), s || (n.scrollTop = a, n.scrollLeft = o, n.removeAttribute("data-base-ui-scroll-locked"), n.style.scrollBehavior = pp);
	}
	function d() {
		u(), c.request(l);
	}
	l();
	let f = As(i, "resize", d);
	return () => {
		c.cancel(), u(), typeof i.removeEventListener == "function" && f();
	};
}
var bp = new class {
	lockCount = 0;
	restore = null;
	timeoutLock = Yo.create();
	timeoutUnlock = Yo.create();
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
		let t = dn(e), n = t.documentElement, r = t.body, i = mt(n);
		if (hp(i, n, r)) {
			let t = new i.MutationObserver(() => {
				hp(i, n, r) || (t.disconnect(), this.restore = null, this.lock(e));
			}), a = { attributes: !0 };
			t.observe(n, a), t.observe(r, a), this.restore = () => t.disconnect();
			return;
		}
		let a = oo || !gp(e);
		this.restore = a ? vp(e) : yp(e);
	}
}();
function xp(e = !0, t = null) {
	G(() => {
		if (e) return bp.acquire(t);
	}, [e, t]);
}
// node_modules/@base-ui/react/utils/useAnchoredPopupScrollLock.mjs
var Sp = 20;
function Cp(e, t, n, r) {
	let [i, a] = x.useState(!1);
	G(() => {
		if (!e || !t || n == null) {
			a(!1);
			return;
		}
		let r = dn(n).documentElement.clientWidth, i = n.offsetWidth;
		a(r > 0 && i > 0 && i >= r - Sp);
	}, [
		e,
		t,
		n
	]), xp(e && (!t || i), r);
}
// node_modules/@base-ui/react/menu/positioner/MenuPositioner.mjs
var wp = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o, align: s, sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = ol, style: g, ..._ } = e, { store: v, virtualFocus: y, syncHighlightedItem: b } = sa(), S = Nf(), C = Oa(!0), w = v.useState("parent"), T = v.useState("floatingRootContext"), E = v.useState("floatingTreeRoot"), D = v.useState("mounted"), O = v.useState("open"), k = v.useState("modal"), A = v.useState("openMethod"), j = v.useState("activeTriggerElement"), M = v.useState("transitionStatus"), N = v.useState("positionerElement"), P = v.useState("instantType"), F = v.useState("adaptiveOrigin"), I = v.useState("lastOpenChangeReason"), L = v.useState("floatingNodeId"), R = v.useState("floatingParentNodeId"), z = T.useState("domReferenceElement"), ee = n, B = c, te = l, ne = s, re = h;
	w.type === "context-menu" && (ee = n ?? w.context?.anchor, ne ??= "start", !o && ne !== "center" && (te = e.alignOffset ?? 2, B = e.sideOffset ?? -5));
	let ie = o, ae = ne;
	w.type === "menu" ? (ie ??= "inline-end", ae ??= "start", re = e.collisionAvoidance ?? sl) : w.type === "menubar" && (ie ??= w.context.orientation === "vertical" ? "inline-end" : "bottom", ae ??= "start");
	let V = w.type === "context-menu", oe = Qf({
		anchor: ee,
		floatingRootContext: T,
		positionMethod: C ? "fixed" : r,
		mounted: D,
		side: ie,
		sideOffset: B,
		align: ae,
		alignOffset: te,
		arrowPadding: V ? 0 : f,
		collisionBoundary: u,
		collisionPadding: d,
		sticky: p,
		nodeId: L,
		keepMounted: S,
		disableAnchorTracking: m,
		collisionAvoidance: re,
		shift: V ? {
			crossAxis: !("side" in re && re.side === "flip"),
			rootBoundary: "layoutViewport"
		} : void 0,
		externalTree: E,
		adaptiveOrigin: F,
		lazyFlip: y ? "placement" : !1
	});
	x.useEffect(() => {
		function e(e) {
			e.open && (e.parentNodeId === L && v.set("hoverEnabled", !1), e.nodeId !== L && e.parentNodeId === v.select("floatingParentNodeId") && v.setOpen(!1, Q(Ha)));
		}
		return E.events.on("menuopenchange", e), () => {
			E.events.off("menuopenchange", e);
		};
	}, [
		v,
		E.events,
		L
	]), x.useEffect(() => {
		if (v.select("floatingParentNodeId") == null) return;
		function e(e) {
			if (e.open || e.nodeId !== v.select("floatingParentNodeId")) return;
			let t = e.reason ?? "sibling-open";
			v.setOpen(!1, Q(t));
		}
		return E.events.on("menuopenchange", e), () => {
			E.events.off("menuopenchange", e);
		};
	}, [E.events, v]);
	let H = Xo();
	x.useEffect(() => {
		O || H.clear();
	}, [O, H]), x.useEffect(() => {
		function e(e) {
			if (O && e.nodeId === v.select("floatingParentNodeId")) {
				if (e.target && j && j !== e.target) {
					let e = v.select("closeDelay");
					e > 0 ? H.isStarted() || H.start(e, () => {
						v.setOpen(!1, Q(Ha));
					}) : v.setOpen(!1, Q(Ha));
				} else H.clear();
			}
		}
		return E.events.on("itemhover", e), () => {
			E.events.off("itemhover", e);
		};
	}, [
		E.events,
		O,
		j,
		v,
		H
	]), x.useEffect(() => {
		let e = {
			open: O,
			nodeId: L,
			parentNodeId: R,
			reason: v.select("lastOpenChangeReason")
		};
		E.events.emit("menuopenchange", e);
	}, [
		E.events,
		O,
		v,
		L,
		R
	]), lp({
		store: v,
		domReference: z,
		positionerElement: N,
		open: O
	});
	let U = {
		open: O,
		side: oe.side,
		align: oe.align,
		anchorHidden: oe.anchorHidden,
		nested: w.type === "menu",
		instant: P
	}, se = w.type === "menubar" && w.context.modal;
	Cp(O && (se || k && I !== "trigger-hover"), A === "touch", N, j);
	let ce = up(e, U, {
		styles: oe.positionerStyles,
		transitionStatus: M,
		props: _,
		refs: [t, v.useStateSetter("positionerElement")],
		hidden: !D,
		inert: !O
	}), le = D && w.type !== "menu" && (w.type !== "menubar" && k && I !== "trigger-hover" || w.type === "menubar" && w.context.modal), ue = null;
	return w.type === "menubar" ? ue = w.context.contentElement : w.type === void 0 && (ue = j), /*#__PURE__*/ (0, X.jsxs)(ia.Provider, {
		value: oe,
		children: [le && /*#__PURE__*/ (0, X.jsx)(cp, {
			ref: w.type === "context-menu" || w.type === "nested-context-menu" ? w.context.internalBackdropRef : null,
			inert: Ff(!O),
			cutout: ue
		}), /*#__PURE__*/ (0, X.jsx)(xl, {
			id: L,
			children: /*#__PURE__*/ (0, X.jsx)(tp, {
				elementsRef: v.context.itemDomElements,
				labelsRef: v.context.itemLabels,
				onMapChange: b,
				children: ce
			})
		})]
	});
}), Tp = /*#__PURE__*/ x.createContext(null);
function Ep(e) {
	let t = x.useContext(Tp);
	if (t === null && !e) throw Error(sn(5));
	return t;
}
// node_modules/@base-ui/utils/useEnhancedClickHandler.mjs
function Dp(e) {
	let t = x.useRef(""), n = x.useCallback((n) => {
		n.defaultPrevented || (t.current = n.pointerType, e(n, n.pointerType));
	}, [e]);
	return {
		onClick: x.useCallback((n) => {
			n.detail === 0 ? e(n, "keyboard") : ("pointerType" in n ? e(n, n.pointerType) : e(n, t.current), t.current = "");
		}, [e]),
		onPointerDown: n
	};
}
// node_modules/@base-ui/react/internals/useValueChanged.mjs
function Op(e, t) {
	let n = x.useRef(e), r = W(t);
	G(() => {
		n.current !== e && r(n.current), n.current = e;
	}, [e, r]);
}
// node_modules/@base-ui/react/utils/useOpenInteractionType.mjs
function kp(e, t) {
	let { onClick: n, onPointerDown: r } = Dp(W((n, r) => {
		(typeof e == "function" ? e() : e) || t(r || (oo ? "touch" : ""));
	}));
	return x.useMemo(() => ({
		onClick: n,
		onPointerDown: r
	}), [n, r]);
}
function Ap(e) {
	let [t, n] = x.useState(null), r = kp(e, n);
	return Op(e, (t) => {
		t && !e && n(null);
	}), x.useMemo(() => ({
		openMethod: t,
		triggerProps: r
	}), [t, r]);
}
// node_modules/@base-ui/react/utils/getHighlightReason.mjs
function jp(e) {
	return e == null ? ka : e.type.startsWith("key") ? za : e.type.startsWith("mouse") || e.type.startsWith("pointer") ? Ba : ka;
}
// node_modules/@base-ui/react/menu/store/MenuStore.mjs
var Mp = {
	...Au,
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
		let n = Au.triggerPopupId(e, t);
		return n ? e.listElement?.id || n : void 0;
	},
	filterTriggerProps: (e) => e.filterTriggerProps,
	inputProps: (e) => e.inputProps,
	webkitAriaSelected: (e, t) => fo && e.inputFocused && t ? !0 : void 0,
	highlightedItemId: (e) => e.highlightedItem?.id || void 0,
	isActive: (e, t) => e.activeIndex === t,
	hoverEnabled: (e) => e.hoverEnabled,
	instantType: (e) => e.instantType === "trigger-change" && !Au.open(e) ? void 0 : e.instantType,
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
}, Np = class extends xu {
	constructor(e, t, n = !1) {
		let r = new tu(), i = Fp(r, t, n, e);
		super(i, Pp(r), Mp), this.observe("parent", (e) => {
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
function Pp(e) {
	return {
		positionerRef: /*#__PURE__*/ x.createRef(),
		popupRef: /*#__PURE__*/ x.createRef(),
		typingRef: { current: !1 },
		itemDomElements: { current: [] },
		itemLabels: { current: [] },
		highlightReason: "none",
		highlightEvent: void 0,
		reportedItem: void 0,
		allowMouseUpTriggerRef: { current: !1 },
		virtualFocusRef: void 0,
		triggerFocusTargetRef: /*#__PURE__*/ x.createRef(),
		beforeTriggerFocusGuardRef: /*#__PURE__*/ x.createRef(),
		beforeContentFocusGuardRef: /*#__PURE__*/ x.createRef(),
		onOpenChangeComplete: void 0,
		triggerElements: e
	};
}
function Fp(e, t, n = !1, r) {
	return {
		...wu(e, t, n),
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
		filterTriggerProps: Dn,
		inputProps: Dn,
		inputFocused: !1,
		highlightedItem: void 0,
		hoverEnabled: !0,
		instantType: void 0,
		openChangeReason: null,
		floatingTreeRoot: new hl(),
		floatingNodeId: void 0,
		floatingParentNodeId: null,
		itemProps: Dn,
		keyboardEventRelay: void 0,
		closeDelay: 0,
		adaptiveOrigin: void 0,
		...r
	};
}
// node_modules/@base-ui/react/menu/filter-provider/MenuFilterProviderContext.mjs
var Ip = /*#__PURE__*/ x.createContext(null);
// node_modules/@base-ui/react/menu/utils/isKeyboardOpen.mjs
function Lp(e, t) {
	return (e === "trigger-press" || e === "item-press") && t?.detail === 0;
}
function Rp(e, t) {
	return e === "list-navigation" || Lp(e, t);
}
// node_modules/@base-ui/react/menu/root/MenuRoot.mjs
var zp = uu(function(e) {
	let { children: t, open: n, onOpenChange: r, onOpenChangeComplete: i, onItemHighlighted: a, defaultOpen: o = !1, disabled: s = !1, modal: c, loopFocus: l = !0, orientation: u = "vertical", actionsRef: d, closeParentOnEsc: f = !1, handle: p, triggerId: m, defaultTriggerId: h = null, highlightItemOnHover: g = !0, isSubmenu: _ = !1, virtualFocus: v = !1, virtualFocusRef: y, allowEscape: b = !0, resetOnPointerLeave: S = !0 } = e, C = Oa(!0), w = sa(!0), T = Ep(!0), E = w?.store, D = w?.virtualFocus ?? !1, O = x.useMemo(() => _ && E ? {
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
		_
	]), k = Do(), A = Do(), [j, M] = x.useState(void 0), N = (j ?? A) || void 0, P = vl(), F = O.type === "menu" ? O.store : void 0, I = (n ?? o) && F?.state.transitionStatus === "starting", L = zt(() => I ? F?.state.instantType : void 0).current, R = zt(() => {
		let e = new Np({
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
		return e.context.virtualFocusRef = y, e;
	}).current;
	R.useControlledProp("openProp", n), R.useControlledProp("triggerIdProp", m), R.useContextCallback("onOpenChangeComplete", i);
	let z = R.useState("floatingTreeRoot"), ee = bl(z), B = R.useState("open"), te = R.useState("activeTriggerElement"), ne = R.useState("positionerElement"), re = R.useState("hoverEnabled"), ie = R.useState("disabled"), ae = R.useState("lastOpenChangeReason"), V = R.useState("parent"), oe = R.useState("activeIndex"), H = R.useState("keyboardOpen"), U = R.useState("payload"), se = R.useState("floatingParentNodeId"), ce = x.useRef(null), le = x.useRef(V.type !== "context-menu"), ue = Xo(), de = x.useRef(!0), fe = Xo(), pe = se != null, { openMethod: me, triggerProps: he } = Ap(B);
	R.useSyncedValues({
		disabled: s,
		highlightItemOnHover: g,
		modal: V.type === void 0 ? c : void 0,
		openMethod: me,
		rootId: k
	}), Zl(R);
	let { forceUnmount: ge, transitionStatus: _e } = Ql(B, R, () => {
		R.set("allowMouseEnter", !1);
	}, I), ve = zo(R.context.popupRef);
	x.useEffect(() => {
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
	]), G(() => {
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
	]), x.useEffect(() => {
		B || (ce.current = null), V.type === "context-menu" && (B ? ue.start(500, () => {
			le.current = !0;
		}) : (ue.clear(), le.current = !1));
	}, [
		ue,
		B,
		V.type
	]), G(() => {
		!B && !re && R.set("hoverEnabled", !0);
	}, [
		B,
		re,
		R
	]);
	let ye = W((e, t) => {
		let n = t.reason;
		if (!e && !R.select("open") || B === e && t.trigger === te && ae === n) return;
		let i = Jl(t);
		if (!e && t.trigger == null && (t.trigger = te ?? void 0), r?.(e, t), t.isCanceled) return;
		R.state.floatingRootContext.dispatchOpenChange(e, t);
		let a = t.event;
		if (e === !1 && n !== "item-press" && a?.type === "click" && a.pointerType === "touch" && !de.current) return;
		e && n === "trigger-focus" ? (de.current = !1, fe.start(300, () => {
			de.current = !0;
		})) : (de.current = !0, fe.clear());
		let o = !e && (n === "escape-key" || n == null);
		ce.current = t.event;
		let s = ql(R.state, e, t.trigger, i());
		s.openChangeReason = n, s.keyboardOpen = e && Rp(n, a), s.instantType = V.type === "menubar" && (n === "trigger-focus" || n === "focus-out" || n === "trigger-hover" || n === "list-navigation" || n === "sibling-open") ? "group" : Lp(n, a) ? "click" : o ? "dismiss" : void 0, R.update(s);
	}), be = zl({
		popupStore: R,
		floatingRootContext: R.state.floatingRootContext,
		floatingId: N,
		nested: P != null,
		onOpenChange: ye
	}), xe = be.context.events;
	G(() => {
		let e = ({ open: e, eventDetails: t }) => ye(e, t);
		return xe.on("setOpen", e), () => {
			xe?.off("setOpen", e);
		};
	}, [xe, ye]), G(() => R.subscribeToParentMenu(), [R]);
	let Se = x.useCallback(() => {
		R.setOpen(!1, Q(Ka));
	}, [R]);
	x.useImperativeHandle(d, () => ({
		unmount: ge,
		close: Se
	}), [ge, Se]);
	let Ce;
	V.type === "context-menu" && (Ce = V.context), x.useImperativeHandle(Ce?.positionerRef, () => ne, [ne]), x.useImperativeHandle(Ce?.actionsRef, () => ({ setOpen: ye }), [ye]);
	let we = Rl(be, {
		enabled: !ie,
		bubbles: { escapeKey: f && V.type === "menu" },
		outsidePress() {
			return V.type !== "context-menu" || ce.current?.type === "contextmenu" || le.current;
		},
		externalTree: pe ? z : void 0
	}), Te = Rf(), Ee = Yu(be, {
		enabled: !ie,
		listRef: R.context.itemDomElements,
		activeIndex: oe,
		virtual: v,
		nested: V.type === "menubar" || !v && V.type !== void 0,
		parentOrientation: V.type === "menubar" ? V.context.orientation : void 0,
		loopFocus: l,
		focusItemOnOpen: v ? H : void 0,
		allowEscape: v && l && b,
		orientation: u,
		triggerOrientation: v ? "vertical" : u,
		rtl: Te === "rtl",
		disabledIndices: En,
		onNavigate(e, t) {
			R.setActiveIndex(e, jp(t), t?.nativeEvent);
		},
		openOnArrowKeyDown: V.type !== "context-menu" && !(v && _),
		externalTree: !v && pe ? z : void 0,
		nestedReturnFocusRef: F?.context.virtualFocusRef,
		focusItemOnHover: g,
		resetOnPointerLeave: S
	}), De = x.useCallback((e) => {
		R.context.typingRef.current = e;
	}, [R]), Oe = Xu(be, {
		enabled: !ie && !v,
		listRef: R.context.itemLabels,
		elementsRef: R.context.itemDomElements,
		activeIndex: oe,
		resetMs: 500,
		onMatch: (e, t) => {
			B && e !== oe && R.setActiveIndex(e, za, t.nativeEvent);
		},
		onTyping: De
	}), ke = W(a), Ae = x.useRef(-1), je = W(() => {
		let e = R.state.activeIndex, t = e === null ? void 0 : R.context.itemDomElements.current[e] ?? void 0;
		if (t?.isConnected === !1) return;
		let n = t === void 0 ? -1 : e;
		if (Ae.current === n && R.context.reportedItem === t) return;
		Ae.current = n, R.context.reportedItem = t, v && R.set("highlightedItem", t);
		let { highlightReason: r, highlightEvent: i } = R.context;
		R.context.highlightReason = ka, R.context.highlightEvent = void 0, a && ke(t, Oo(r, i, { label: t === void 0 ? void 0 : R.context.itemLabels.current[n] ?? void 0 }));
	});
	G(() => {
		je();
	}, [oe, je]);
	let Me = x.useMemo(() => {
		if (!v) return Ee.reference;
		if (!Ee.trigger) return Dn;
		let { onFocus: e, ...t } = Ee.trigger;
		return t;
	}, [
		v,
		Ee.reference,
		Ee.trigger
	]);
	R.useSyncedValue("inputProps", v ? Ee.reference ?? Dn : Dn);
	let Ne = x.useMemo(() => {
		let e = Kt(Oe.reference, Me, we.reference, { onMouseMove() {
			R.set("allowMouseEnter", !0);
		} }, he);
		return e["aria-haspopup"] = "menu", e["aria-expanded"] = B, e;
	}, [
		R,
		Oe.reference,
		Me,
		we.reference,
		he,
		B
	]), Pe = x.useMemo(() => {
		let e = Kt(Ee.trigger, we.trigger, he);
		return e["aria-haspopup"] = "menu", e["aria-expanded"] = !1, e;
	}, [
		Ee.trigger,
		we.trigger,
		he
	]);
	zt(() => (R.update({ inactiveTriggerProps: Pe }), null)), $l(R, {
		floatingRootContext: be,
		activeTriggerProps: Ne,
		inactiveTriggerProps: Pe,
		popupProps: x.useMemo(() => Kt(Vl, {
			onMouseMove() {
				R.set("allowMouseEnter", !0), V.type === "menu" && R.set("hoverEnabled", !1);
			},
			onClick() {
				R.select("hoverEnabled") && R.set("hoverEnabled", !1);
			},
			onKeyDown(e) {
				let t = R.select("keyboardEventRelay");
				t && !e.isPropagationStopped() && t(e);
			}
		}, Oe.floating, Ee.floating, we.floating), [
			V.type,
			R,
			Oe.floating,
			Ee.floating,
			we.floating
		]),
		itemProps: Ee.item ?? Dn
	});
	let Fe = x.useMemo(() => ({
		store: R,
		parent: O,
		orientation: u,
		loopFocus: l,
		allowEscape: b,
		defaultFloatingId: A,
		setRenderedFloatingId: M,
		virtualFocus: v,
		parentVirtualFocus: D,
		syncHighlightedItem: je
	}), [
		R,
		O,
		u,
		l,
		b,
		A,
		v,
		D,
		je
	]), Ie = typeof t == "function" ? t({ payload: U }) : t, Le = /*#__PURE__*/ (0, X.jsxs)(oa.Provider, {
		value: Fe,
		children: [p && /*#__PURE__*/ (0, X.jsx)(Wl, {
			handle: p,
			store: R
		}), Ie]
	});
	return (V.type === void 0 || V.type === "context-menu") && (Le = /*#__PURE__*/ (0, X.jsx)(Sl, {
		externalTree: z,
		children: Le
	})), Le;
});
function Bp(e) {
	let t = x.useContext(Ip);
	if (t === null) return /*#__PURE__*/ (0, X.jsx)(zp, { ...e });
	let n = t.Root;
	return /*#__PURE__*/ (0, X.jsx)(Ip.Provider, {
		value: null,
		children: /*#__PURE__*/ (0, X.jsx)(n, {
			...t.options,
			...e
		})
	});
}
// node_modules/@base-ui/react/utils/getPseudoElementBounds.mjs
var Vp = 5;
function Hp(e, t) {
	let n = Up(t);
	return e.clientX >= n.left - Vp && e.clientX <= n.right + Vp && e.clientY >= n.top - Vp && e.clientY <= n.bottom + Vp;
}
function Up(e) {
	let t = e.getBoundingClientRect(), n = mt(e);
	if (mo) return t;
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
function Wp(e = {}) {
	let { highlightItemOnHover: t, highlightedIndex: n, onHighlightedIndexChange: r } = ln(), { ref: i, index: a } = xo(e), o = n === a, s = x.useRef(null), c = gn(i, s);
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
function Gp(e) {
	let { render: t, className: n, style: r, state: i = Dn, props: a = En, refs: o = En, metadata: s, stateAttributesMapping: c, tag: l = "div", ...u } = e, { compositeProps: d, compositeRef: f } = Wp({ metadata: s });
	return jn(l, e, {
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
function Kp(e) {
	if (vt(e) && e.hasAttribute("data-rootownerid")) return e.getAttribute("data-rootownerid");
	if (!At(e)) return Kp(Nt(e));
}
// node_modules/@base-ui/react/utils/popups/useTriggerFocusGuards.mjs
function qp(e, t) {
	function n(n, r, i) {
		let a = n.currentTarget;
		wi.flushSync(() => {
			e.setOpen(!1, Q(Ia, n.nativeEvent, a));
		}), Rc(a.isConnected ? a : t.current, r, i)?.focus();
	}
	function r(t) {
		n(t, -1, e.select("positionerElement"));
	}
	function i(t) {
		let r = e.select("positionerElement");
		r && zc(t, r) ? e.context.beforeContentFocusGuardRef.current?.focus() : n(t, 1, r);
	}
	return {
		handlePreFocusGuardFocus: r,
		handleFocusTargetFocus: i
	};
}
// node_modules/@base-ui/react/utils/useMixedToggleClickHandler.mjs
function Jp(e) {
	let { enabled: t = !0, mouseDownAction: n, open: r } = e, i = x.useRef(!1);
	return x.useMemo(() => t ? {
		onMouseDown: (e) => {
			(n === "open" && !r || n === "close" && r) && (i.current = !0, dn(e.currentTarget).addEventListener("click", () => {
				i.current = !1;
			}, { once: !0 }));
		},
		onClick: (e) => {
			i.current && (i.current = !1, e.preventBaseUIHandler());
		}
	} : Dn, [
		t,
		n,
		r
	]);
}
// node_modules/@base-ui/react/menu/trigger/MenuTrigger.mjs
var Yp = du(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, openOnHover: c, delay: l = 100, closeDelay: u = 0, handle: d, payload: f, ...p } = e, m = sa(!0), h = ju(d) ?? m?.store;
	if (!h) throw Error(sn(85));
	let g = Do(s), _ = h.useState("isTriggerActive", g), v = h.useState("floatingRootContext"), y = h.useState("isOpenedByTrigger", g), b = h.useState("triggerControlsId", g), S = x.useRef(null), C = Zp(), w = ln(!0), T = yl(), E = x.useMemo(() => T ?? new hl(), [T]), { registerTrigger: D, isMountedByThisTrigger: O } = Xl(g, S, h, {
		payload: f,
		closeDelay: u,
		parent: C,
		floatingTreeRoot: E,
		floatingNodeId: bl(E),
		floatingParentNodeId: vl(),
		keyboardEventRelay: w?.relayKeyboardEvent
	}), k = C.type === "menubar", A = h.useState("disabled"), j = a || A || k && C.context.disabled, { getButtonProps: M, buttonRef: N } = pn({
		disabled: j,
		native: o
	});
	x.useEffect(() => {
		!y && C.type === void 0 && (h.context.allowMouseUpTriggerRef.current = !1);
	}, [
		h,
		y,
		C.type
	]);
	let P = x.useRef(null), F = Xo(), I = W((e) => {
		if (!P.current) return;
		F.clear(), h.context.allowMouseUpTriggerRef.current = !1;
		let t = e.target;
		$(P.current, t) || $(h.select("positionerElement"), t) || t === P.current || t != null && Kp(t) === h.select("rootId") || Hp(e, P.current) || E.events.emit("close", {
			domEvent: e,
			reason: Va
		});
	});
	x.useEffect(() => {
		let e = dn(P.current);
		if (y && h.select("lastOpenChangeReason") === "trigger-hover") return e.addEventListener("mouseup", I, { once: !0 }), () => {
			e.removeEventListener("mouseup", I);
		};
	}, [
		y,
		I,
		h
	]);
	let L = k && C.context.hasSubmenuOpen, R = Hu(v, {
		enabled: (c ?? L) && !j && (!k || L && !O),
		handleClose: id({ blockPointerEvents: !k }),
		mouseOnly: !0,
		move: !1,
		restMs: C.type === void 0 ? l : void 0,
		delay: { close: u },
		triggerElementRef: S,
		externalTree: E,
		isActiveTrigger: _,
		isClosing: () => h.select("transitionStatus") === "ending"
	}), z = Xp(y, h.select("lastOpenChangeReason")), ee = Ml(v, {
		enabled: !j,
		event: y && k ? "click" : "mousedown",
		toggle: !0,
		ignoreMouse: !1,
		stickIfOpen: C.type === void 0 && z
	}), B = Pu(v, { enabled: !j && L }), te = Jp({
		open: y,
		enabled: k,
		mouseDownAction: "open"
	}), ne = x.useMemo(() => Kt(B.reference, ee.reference), [B.reference, ee.reference]), re = h.useState("triggerProps", O), ie = h.useState("filterTriggerProps"), { handlePreFocusGuardFocus: ae, handleFocusTargetFocus: V } = qp(h, S), oe = {
		disabled: j,
		open: y
	}, H = [
		P,
		t,
		N,
		D,
		S
	], U = [
		ne,
		R ?? Dn,
		re,
		{
			"aria-haspopup": "menu",
			"aria-controls": b,
			id: g,
			onMouseDown: (e) => {
				h.select("open") || (F.start(200, () => {
					h.context.allowMouseUpTriggerRef.current = !0;
				}), dn(e.currentTarget).addEventListener("mouseup", I, { once: !0 }));
			}
		},
		ie,
		k ? { role: "menuitem" } : {},
		te,
		p,
		M
	], se = jn("button", e, {
		enabled: !k,
		stateAttributesMapping: wa,
		state: oe,
		ref: H,
		props: U
	});
	return k ? /*#__PURE__*/ (0, X.jsx)(Gp, {
		tag: "button",
		render: n,
		className: r,
		style: i,
		state: oe,
		refs: H,
		props: U,
		stateAttributesMapping: wa
	}) : y ? /*#__PURE__*/ (0, X.jsxs)(x.Fragment, { children: [
		/*#__PURE__*/ (0, X.jsx)(Ls, {
			ref: h.context.beforeTriggerFocusGuardRef,
			onFocus: ae
		}, `${g}-pre-focus-guard`),
		/*#__PURE__*/ (0, X.jsx)(x.Fragment, { children: se }, g),
		/*#__PURE__*/ (0, X.jsx)(Ls, {
			ref: h.context.triggerFocusTargetRef,
			onFocus: V
		}, `${g}-post-focus-guard`)
	] }) : /*#__PURE__*/ (0, X.jsx)(x.Fragment, { children: se }, g);
});
function Xp(e, t) {
	let n = Xo(), [r, i] = x.useState(!1);
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
function Zp() {
	let e = Ep(!0);
	return x.useMemo(() => e ? {
		type: "menubar",
		context: e
	} : { type: void 0 }, [e]);
}
// node_modules/@base-ui/utils/usePreviousValue.mjs
function Qp(e) {
	let [t, n] = x.useState({
		current: e,
		previous: null
	});
	return Object.is(e, t.current) || n({
		current: e,
		previous: t.current
	}), t.previous;
}
// node_modules/@base-ui/react/separator/Separator.mjs
var $p = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { className: n, render: r, orientation: i = "horizontal", style: a, ...o } = e;
	return jn("div", e, {
		state: { orientation: i },
		ref: t,
		props: [{
			role: "separator",
			"aria-orientation": i
		}, o]
	});
});
// node_modules/@base-ui/utils/isElementDisabled.mjs
function em(e) {
	return e == null || e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true";
}
// node_modules/@base-ui/react/internals/serializeValue.mjs
function tm(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
// node_modules/@base-ui/react/internals/resolveValueLabel.mjs
function nm(e) {
	return typeof e == "object" && !!e && Array.isArray(e.items);
}
function rm(e) {
	return nm(e?.[0]);
}
function im(e) {
	return rm(e) ? e.flatMap((e) => e.items) : e;
}
function am(e) {
	if (!Array.isArray(e)) return e != null && "null" in e;
	let t = e;
	if (rm(t)) {
		for (let e of t) for (let t of e.items) if (t && t.value == null && t.label != null) return !0;
		return !1;
	}
	for (let e of t) if (e && e.value == null && e.label != null) return !0;
	return !1;
}
function om(e, t) {
	if (t && e != null) return t(e) ?? "";
	if (e && typeof e == "object") {
		if ("label" in e && e.label != null) return String(e.label);
		if ("value" in e) return String(e.value);
	}
	return tm(e);
}
function sm(e, t) {
	return t && e != null ? t(e) ?? "" : e && typeof e == "object" && "value" in e && "label" in e ? tm(e.value) : tm(e);
}
function cm(e, t, n) {
	function r() {
		return om(e, n);
	}
	if (n && e != null) return n(e);
	if (e && typeof e == "object" && "label" in e && e.label != null) return e.label;
	if (t && !Array.isArray(t)) return (Object.hasOwn(t, e) ? t[e] : void 0) ?? r();
	if (Array.isArray(t)) {
		let n = im(t);
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
function lm(e, t, n) {
	return e.reduce((e, r, i) => (i > 0 && e.push(", "), e.push(/*#__PURE__*/ (0, X.jsx)(x.Fragment, { children: cm(r, t, n) }, i)), e), []);
}
// src/components/ui/portal-context.tsx
var um = (0, x.createContext)(null);
function dm({ container: e, children: t }) {
	return /* @__PURE__ */ (0, X.jsx)(um.Provider, {
		value: e,
		children: t
	});
}
function fm() {
	return (0, x.useContext)(um);
}
// src/components/ui/dropdown-menu.tsx
function pm({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(Bp, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function mm({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(Yp, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function hm({ align: e = "start", alignOffset: t = 0, side: n = "bottom", sideOffset: r = 4, className: i, ...a }) {
	let o = fm();
	return /* @__PURE__ */ (0, X.jsx)(Pf, {
		container: o ?? void 0,
		children: /* @__PURE__ */ (0, X.jsx)(wp, {
			className: "isolate z-50 outline-none",
			align: e,
			alignOffset: t,
			side: n,
			sideOffset: r,
			children: /* @__PURE__ */ (0, X.jsx)(jf, {
				"data-slot": "dropdown-menu-content",
				className: Y("z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-32 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", i),
				...a
			})
		})
	});
}
function gm({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(Wo, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function _m({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(Go, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: Y("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", e),
		...n
	});
}
function vm({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, X.jsx)(qo, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: Y("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", e),
		...r
	});
}
function ym({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)($p, {
		"data-slot": "dropdown-menu-separator",
		className: Y("-mx-1 my-1 h-px bg-border", e),
		...t
	});
}
// node_modules/@base-ui/react/use-render/useRender.mjs
function bm(e) {
	return jn(e.defaultTagName ?? "div", e, e);
}
// src/components/ui/badge.tsx
var xm = Un("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
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
function Sm({ className: e, variant: t = "default", render: n, ...r }) {
	return bm({
		defaultTagName: "span",
		props: Kt({ className: Y(xm({ variant: t }), e) }, r),
		render: n,
		state: {
			slot: "badge",
			variant: t
		}
	});
}
// src/components/ui/card.tsx
function Cm({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card",
		"data-size": t,
		className: Y("group/card flex flex-col gap-[var(--card-spacing)] overflow-hidden rounded-xl bg-card py-[var(--card-spacing)] text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:1rem] has-[data-slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:0.75rem] data-[size=sm]:has-[data-slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", e),
		...n
	});
}
function wm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-header",
		className: Y("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-[var(--card-spacing)] has-[data-slot=card-action]:grid-cols-[1fr_auto] has-[data-slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-[var(--card-spacing)]", e),
		...t
	});
}
function Tm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("h2", {
		"data-slot": "card-title",
		className: Y("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", e),
		...t
	});
}
function Em({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-description",
		className: Y("text-sm text-muted-foreground", e),
		...t
	});
}
function Dm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-content",
		className: Y("px-[var(--card-spacing)]", e),
		...t
	});
}
function Om({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-footer",
		className: Y("flex items-center rounded-b-xl border-t bg-muted/50 p-[var(--card-spacing)]", e),
		...t
	});
}
// node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs
var km = /*#__PURE__*/ x.createContext(void 0);
function Am(e) {
	let t = x.useContext(km);
	if (!e && t === void 0) throw Error(sn(27));
	return t;
}
// node_modules/@base-ui/react/dialog/backdrop/DialogBackdrop.mjs
var jm = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, forceRender: a = !1, ...o } = e, s = Am(), c = s.useState("open"), l = s.useState("nested"), u = s.useState("mounted");
	return jn("div", e, {
		state: {
			open: c,
			transitionStatus: s.useState("transitionStatus")
		},
		ref: [s.context.backdropRef, t],
		stateAttributesMapping: Ea,
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
}), Mm = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, ...s } = e, c = Am(), l = c.useState("open"), { getButtonProps: u, buttonRef: d } = pn({
		disabled: a,
		native: o
	}), f = { disabled: a };
	function p(e) {
		l && c.setOpen(!1, Q(Fa, e.nativeEvent));
	}
	return jn("button", e, {
		state: f,
		ref: [t, d],
		props: [
			{ onClick: p },
			s,
			u
		]
	});
}), Nm = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = Am(), c = Do(a);
	return s.useSyncedValueWithCleanup("descriptionElementId", c), jn("p", e, {
		ref: t,
		props: [{ id: c }, o]
	});
}), Pm = /*#__PURE__*/ x.createContext(void 0);
function Fm() {
	let e = x.useContext(Pm);
	if (e === void 0) throw Error(sn(26));
	return e;
}
// node_modules/@base-ui/react/dialog/popup/DialogPopupCssVars.mjs
var Im = "--nested-dialogs", Lm = "data-nested-dialog-open", Rm = {
	...Ta,
	...fa,
	nestedDialogOpen(e) {
		return e ? { [Lm]: "" } : null;
	}
}, zm = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, initialFocus: o, ...s } = e, c = Am(), l = c.useState("descriptionElementId"), u = c.useState("disablePointerDismissal"), d = c.useState("floatingRootContext"), f = c.useState("popupProps"), p = c.useState("modal"), m = c.useState("mounted"), h = c.useState("nested"), g = c.useState("nestedOpenDialogCount"), _ = c.useState("open"), v = c.useState("openMethod"), y = c.useState("titleElementId"), b = c.useState("transitionStatus"), x = c.useState("role"), S = d.useState("floatingId");
	Fm(), Bo({
		open: _,
		ref: c.context.popupRef,
		onComplete() {
			_ && c.context.onOpenChangeComplete?.(!0);
		}
	});
	let C = o === void 0 ? Hl(c.context.popupRef) : o, w = g > 0, T = c.useStateSetter("popupElement"), E = jn("div", e, {
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
				...Vl,
				hidden: !m,
				onKeyDown(e) {
					hf.has(e.key) && e.stopPropagation();
				},
				style: { [Im]: g }
			},
			s
		],
		ref: [
			t,
			c.context.popupRef,
			T
		],
		stateAttributesMapping: Rm
	});
	return /*#__PURE__*/ (0, X.jsx)(jl, {
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
}), Bm = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, i = Am(), a = i.useState("mounted"), o = i.useState("modal"), s = i.useState("open");
	return a || n ? /*#__PURE__*/ (0, X.jsx)(Pm.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, X.jsxs)(pl, {
			ref: t,
			...r,
			children: [a && o === !0 && /*#__PURE__*/ (0, X.jsx)(cp, {
				ref: i.context.internalBackdropRef,
				inert: Ff(!s)
			}), e.children]
		})
	}) : null;
});
// node_modules/@base-ui/react/dialog/root/useDialogRoot.mjs
function Vm({ store: e, parentContext: t, isDrawer: n }) {
	let r = e.useState("open"), i = e.useState("mounted"), a = e.useState("disablePointerDismissal"), o = e.useState("modal"), s = e.useState("popupElement"), c = e.useState("floatingRootContext"), [l, u] = x.useState(0), [d, f] = x.useState(0), p = l === 0, m = Rl(c, {
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
			let n = as(t);
			if (p && !a) {
				if (o) {
					let t = e.context.internalBackdropRef.current, r = e.context.backdropRef.current;
					return t || r ? t === n || r === n || $(n, s) && !n?.hasAttribute("data-base-ui-portal") : !0;
				}
				return !0;
			}
			return !1;
		},
		escapeKey: p
	});
	return xp(r && o === !0, s), e.useContextCallback("onNestedDialogOpen", (t, n) => {
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
	]), $l(e, {
		activeTriggerProps: m.reference,
		inactiveTriggerProps: m.trigger,
		popupProps: m.floating,
		nestedOpenDialogCount: l,
		nestedOpenDrawerCount: d
	}), null;
}
// node_modules/@base-ui/react/dialog/store/DialogStore.mjs
var Hm = {
	...Au,
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
}, Um = class extends xu {
	constructor(e, t, n) {
		let r = new tu(), i = Wm(e, r, t, n);
		super(i, Gm(r), Hm);
	}
	setOpen = (e, t) => {
		t.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", !0);
		}, !e && t.trigger == null && this.state.activeTriggerId != null && (t.trigger = this.state.activeTriggerElement ?? void 0), this.context.onOpenChange?.(e, t), t.isCanceled || (this.state.floatingRootContext.dispatchOpenChange(e, t), this.update(ql(this.state, e, t.trigger)));
	};
};
function Wm(e, t, n, r = !1) {
	return {
		...wu(t, n, r),
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
function Gm(e) {
	return {
		popupRef: /*#__PURE__*/ x.createRef(),
		backdropRef: /*#__PURE__*/ x.createRef(),
		internalBackdropRef: /*#__PURE__*/ x.createRef(),
		outsidePressEnabledRef: { current: !0 },
		triggerElements: e,
		onOpenChange: void 0,
		onOpenChangeComplete: void 0
	};
}
// node_modules/@base-ui/react/dialog/root/useRenderDialogRoot.mjs
function Km(e, t) {
	let { children: n, open: r, defaultOpen: i = !1, onOpenChange: a, onOpenChangeComplete: o, disablePointerDismissal: s = !1, modal: c = !0, actionsRef: l, handle: u, triggerId: d, defaultTriggerId: f = null } = t, p = e === "drawer", m = e === "alert-dialog", h = m ? !0 : c, g = m || s, _ = m ? "alertdialog" : "dialog", v = Am(!0), y = {
		modal: h,
		disablePointerDismissal: g,
		nested: v != null,
		role: _
	}, b = Ul((e, t) => new Um({
		open: i,
		openProp: r,
		activeTriggerId: f,
		triggerIdProp: d,
		...y
	}, e, t), !0);
	b.useControlledProp("openProp", r), b.useControlledProp("triggerIdProp", d), b.useSyncedValues(y), b.useContextCallback("onOpenChange", a), b.useContextCallback("onOpenChangeComplete", o);
	let S = b.useState("open"), C = b.useState("mounted"), w = b.useState("payload");
	eu(b, S), Zl(b);
	let { forceUnmount: T } = Ql(S, b);
	x.useImperativeHandle(l, () => ({
		unmount: T,
		close: () => b.setOpen(!1, Q(Ka))
	}), [T, b]);
	let E = S || C || u != null;
	return /*#__PURE__*/ (0, X.jsxs)(km.Provider, {
		value: b,
		children: [
			u && /*#__PURE__*/ (0, X.jsx)(Wl, {
				handle: u,
				store: b
			}),
			E && /*#__PURE__*/ (0, X.jsx)(Vm, {
				store: b,
				parentContext: v?.context,
				isDrawer: p
			}),
			typeof n == "function" ? n({ payload: w }) : n
		]
	});
}
// node_modules/@base-ui/react/dialog/root/DialogRoot.mjs
var qm = uu(function(e) {
	return Km("dialog", e);
}), Jm = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = Am(), c = Do(a);
	return s.useSyncedValueWithCleanup("titleElementId", c), jn("h2", e, {
		ref: t,
		props: [{ id: c }, o]
	});
}), Ym = du(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, payload: c, handle: l, ...u } = e, d = Am(!0), f = ju(l) ?? d;
	if (!f) throw Error(sn(79));
	let p = Do(s), m = f.useState("floatingRootContext"), h = f.useState("isOpenedByTrigger", p), g = f.useState("triggerPopupId", p), _ = x.useRef(null), { registerTrigger: v, isMountedByThisTrigger: y } = Xl(p, _, f, { payload: c }), { getButtonProps: b, buttonRef: S } = pn({
		disabled: a,
		native: o
	}), C = Ml(m), w = kp(() => f.select("open"), (e) => {
		f.set("openMethod", e);
	}), T = {
		disabled: a,
		open: h
	}, E = f.useState("triggerProps", y);
	return jn("button", e, {
		state: T,
		ref: [
			S,
			t,
			v,
			_
		],
		props: [
			C.reference,
			E,
			w,
			{
				[al]: "",
				id: p,
				"aria-haspopup": "dialog",
				"aria-expanded": h,
				"aria-controls": g
			},
			u,
			b
		],
		stateAttributesMapping: Ca
	});
});
// src/components/ui/dialog.tsx
function Xm({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(qm, {
		"data-slot": "dialog",
		...e
	});
}
function Zm({ container: e, ...t }) {
	let n = fm();
	return /* @__PURE__ */ (0, X.jsx)(Bm, {
		"data-slot": "dialog-portal",
		container: e ?? n ?? void 0,
		...t
	});
}
function Qm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(jm, {
		"data-slot": "dialog-overlay",
		className: Y("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", e),
		...t
	});
}
function $m({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ (0, X.jsxs)(Zm, { children: [/* @__PURE__ */ (0, X.jsx)(Qm, {}), /* @__PURE__ */ (0, X.jsxs)(zm, {
		"data-slot": "dialog-content",
		className: Y("fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...r,
		children: [t, n && /* @__PURE__ */ (0, X.jsxs)(Mm, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ (0, X.jsx)(Z, {
				variant: "ghost",
				className: "absolute top-2 right-2",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, X.jsx)(lt, {}), /* @__PURE__ */ (0, X.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function eh({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "dialog-header",
		className: Y("flex flex-col gap-2", e),
		...t
	});
}
function th({ className: e, showCloseButton: t = !1, children: n, ...r }) {
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		"data-slot": "dialog-footer",
		className: Y("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", e),
		...r,
		children: [n, t && /* @__PURE__ */ (0, X.jsx)(Mm, {
			render: /* @__PURE__ */ (0, X.jsx)(Z, { variant: "outline" }),
			children: "Close"
		})]
	});
}
function nh({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(Jm, {
		"data-slot": "dialog-title",
		className: Y("font-heading text-base leading-none font-medium", e),
		...t
	});
}
function rh({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(Nm, {
		"data-slot": "dialog-description",
		className: Y("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", e),
		...t
	});
}
// node_modules/@base-ui/react/field/control/FieldControlDataAttributes.mjs
var ih = "data-valid", ah = "data-invalid", oh = {
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
}, sh = {
	disabled: !1,
	valid: null,
	touched: !1,
	dirty: !1,
	filled: !1,
	focused: !1
}, ch = { valid(e) {
	return e === null ? null : e ? { [ih]: "" } : { [ah]: "" };
} }, lh = {
	invalid: void 0,
	name: void 0,
	validityData: {
		state: oh,
		errors: [],
		error: "",
		value: "",
		initialValue: null
	},
	setValidityData: Tn,
	disabled: void 0,
	setTouched: Tn,
	setDirty: Tn,
	setFilled: Tn,
	setFocused: Tn,
	focusOwnerRef: { current: void 0 },
	validationMode: "onSubmit",
	shouldValidateOnChange: () => !1,
	state: sh,
	registerFieldControl: Tn,
	validation: {
		getValidationProps: (e, t = Dn) => t,
		inputRef: { current: null },
		registeredInputs: /* @__PURE__ */ new Map(),
		registerInput: Tn,
		getInputControl: () => null,
		commit: async () => {},
		change: Tn
	}
}, uh = /*#__PURE__*/ x.createContext(lh);
function dh(e = !0) {
	let t = x.useContext(uh);
	if (t.setValidityData === Tn && !e) throw Error(sn(28));
	return t;
}
// node_modules/@base-ui/react/internals/form-context/FormContext.mjs
var fh = /*#__PURE__*/ x.createContext({
	elementRef: { current: null },
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: Tn,
	validationMode: "onSubmit",
	submitCountRef: { current: 0 }
});
function ph() {
	return x.useContext(fh);
}
// node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
var mh = /*#__PURE__*/ x.createContext({
	controlId: void 0,
	registerControlId: Tn,
	resetControlId: Tn,
	labelId: void 0,
	setLabelId: Tn,
	messageIds: [],
	setMessageIds: Tn,
	getDescriptionProps: (e) => e
});
function hh() {
	return x.useContext(mh);
}
// node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function gh(e = {}) {
	let { id: t, enabled: n = !0 } = e, { controlId: r, registerControlId: i, resetControlId: a } = hh(), o = Do(), s = zt(() => Symbol()), c = x.useRef(!1), l = x.useRef(!1), u = W(() => {
		c.current && i !== Tn && (c.current = !1, i(s.current, void 0));
	});
	return G(() => {
		if (!n || i === Tn) {
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
// node_modules/@base-ui/react/internals/field-root-context/useSetFieldFocused.mjs
function _h(e, t, n) {
	let { setFocused: r, focusOwnerRef: i } = dh(), a = W((t) => {
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
// node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function vh(e, t, n, r, i = !0, a) {
	let { registerFieldControl: o } = dh(), s = zt(() => Symbol());
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
// node_modules/@base-ui/react/field/control/FieldControl.mjs
var yh = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, name: a, value: o, disabled: s = !1, onValueChange: c, defaultValue: l, autoFocus: u = !1, style: d, ...f } = e, { state: p, name: m, disabled: h, setTouched: g, setDirty: _, validityData: v, setFilled: y, validationMode: b, validation: S } = dh(), { clearErrors: C, elementRef: w, submitCountRef: T } = ph(), E = h || s, D = m ?? a, O = {
		...p,
		disabled: E
	}, { labelId: k } = hh(), A = gh({ id: i }), j = o !== void 0, M = o == null ? void 0 : String(o), N = W(() => S.inputRef.current?.value);
	vh(S.inputRef, A, M, N, !E, a), G(() => {
		let e = M ?? S.inputRef.current?.value;
		e !== void 0 && y(e !== "");
	}, [
		M,
		l,
		S.inputRef,
		y
	]), Op(M, () => {
		M !== void 0 && (C(D), _(M !== (v.initialValue ?? "")), S.change(M));
	});
	let P = x.useRef(null), F = _h(E, P), I = Xo();
	return jn("input", e, {
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
					let t = e.currentTarget.value, n = Q(ka, e.nativeEvent);
					c?.(t, n), j || (_(t !== (v.initialValue ?? "")), y(t !== ""), !e.nativeEvent.defaultPrevented && !n.isCanceled && (C(D), S.change(t)));
				},
				onFocus() {
					F(!0);
				},
				onBlur(e) {
					if (g(!0), F(!1), b === "onBlur") {
						let t = e.currentTarget.value;
						S.commit(t), j && queueMicrotask(() => {
							let e = S.inputRef.current?.value;
							e !== void 0 && e !== t && e !== (v.initialValue ?? "") && S.commit(e);
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
		stateAttributesMapping: ch
	});
}), bh = /*#__PURE__*/ x.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, X.jsx)(yh, {
		ref: t,
		...e
	});
});
// src/components/ui/input.tsx
function xh({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(bh, {
		type: t,
		"data-slot": "input",
		className: Y("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", e),
		...n
	});
}
// node_modules/@base-ui/utils/useOnFirstRender.mjs
function Sh(e) {
	let t = x.useRef(!0);
	t.current && (t.current = !1, e());
}
// node_modules/@base-ui/react/select/root/SelectRootContext.mjs
var Ch = /*#__PURE__*/ x.createContext(void 0), wh = /*#__PURE__*/ x.createContext(void 0);
function Th() {
	let e = x.useContext(Ch);
	if (e === void 0) throw Error(sn(60));
	return e;
}
function Eh() {
	let e = x.useContext(wh);
	if (e === void 0) throw Error(sn(61));
	return e;
}
// node_modules/@base-ui/utils/areArraysEqual.mjs
function Dh(e, t, n = Object.is) {
	let { length: r } = e;
	if (r !== t.length) return !1;
	for (let i = 0; i < r; i += 1) if (!n(e[i], t[i])) return !1;
	return !0;
}
// node_modules/@base-ui/react/internals/itemEquality.mjs
var Oh = (e, t) => Object.is(e, t);
function kh(e, t, n) {
	return e == null || t == null ? Object.is(e, t) : n(e, t);
}
function Ah(e, t, n) {
	return Array.isArray(e) && Array.isArray(t) ? !Dh(e, t, (e, t) => kh(e, t, n)) : e !== t;
}
function jh(e, t, n) {
	return e ? e.some((e) => e !== void 0 && kh(t, e, n)) : !1;
}
function Mh(e, t, n) {
	return e ? e.findIndex((e) => e !== void 0 && kh(e, t, n)) : -1;
}
function Nh(e, t) {
	if (t !== Oh) return (n) => jh(e, n, t);
	let n = new Set(e);
	return n.delete(void 0), (t) => n.has(t) && (t !== 0 || e.some((e) => Object.is(t, e)));
}
function Ph(e, t, n, r) {
	let i = r && Array.isArray(t) ? e.findIndex(Nh(t, n)) : Mh(e, t, n);
	return i === -1 ? null : i;
}
function Fh(e, t, n, r, i, a) {
	return jh(r, t, i) ? a != null && e > a && jh(r, n[a], i) ? a : e : e === a ? Ph(n, r, i, !0) : a;
}
function Ih(e, t, n) {
	return e.filter((e) => !kh(t, e, n));
}
// node_modules/@base-ui/react/select/store.mjs
var Lh = {
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
		return t == null ? !1 : n && Array.isArray(t) ? t.length > 0 : sm(t, r) !== "";
	},
	hasNullItemLabel: (e, t) => t ? am(e.items) : !1,
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
		return e.multiple ? Array.isArray(r) && r.some((e) => kh(t, e, n)) : kh(t, r, n);
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
function Rh(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
	return Math.max(t, Math.min(e, n));
}
function zh(e, t) {
	return Math.max(0, e - t);
}
function Bh(e, t) {
	if (t <= 0) return 0;
	let n = Rh(e, 0, t), r = n, i = t - n, a = r <= 1, o = i <= 1;
	return a && o ? r <= i ? 0 : t : a ? 0 : o ? t : n;
}
// node_modules/@base-ui/react/select/root/SelectRoot.mjs
function Vh(e) {
	let { id: t, value: n, defaultValue: r = null, onValueChange: i, open: a, defaultOpen: o = !1, onOpenChange: s, name: c, form: l, autoComplete: u, disabled: d = !1, readOnly: f = !1, required: p = !1, modal: m = !0, actionsRef: h, inputRef: g, onOpenChangeComplete: _, items: v, multiple: y = !1, itemToStringLabel: b, itemToStringValue: S, isItemEqualToValue: C = Oh, highlightItemOnHover: w = !0, children: T } = e, { clearErrors: E } = ph(), { setDirty: D, setTouched: O, setFocused: k, validityData: A, setFilled: j, name: M, disabled: N, validation: P, validationMode: F } = dh(), I = gh({ id: t }), L = N || d, R = M ?? c, [z, ee] = Ja({
		controlled: n,
		default: y ? r ?? En : r,
		name: "Select",
		state: "value"
	}), [B, te] = Ja({
		controlled: a,
		default: o,
		name: "Select",
		state: "open"
	}), ne = x.useRef([]), re = x.useRef([]), ie = x.useRef(null), ae = x.useRef(null), V = x.useRef(0), oe = x.useRef(null), H = x.useRef([]), U = x.useRef(!1), se = x.useRef(null), ce = x.useRef(null), le = x.useRef({
		allowSelectedMouseUp: !1,
		allowUnselectedMouseUp: !1,
		dragY: 0
	}), ue = x.useRef(!1), de = x.useRef(z), { openMethod: fe, triggerProps: pe } = Ap(B), me = zt(() => new xu({
		id: I,
		labelId: void 0,
		modal: m,
		multiple: y,
		disabled: L,
		readOnly: f,
		required: p,
		highlightItemOnHover: w,
		itemToStringLabel: b,
		itemToStringValue: S,
		isItemEqualToValue: C,
		value: z,
		open: B,
		mounted: B,
		transitionStatus: void 0,
		items: v,
		forceMount: !1,
		openMethod: null,
		activeIndex: null,
		selectedIndex: null,
		popupProps: Dn,
		triggerProps: Dn,
		itemRoot: {
			props: Dn,
			multiple: y,
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
		setValue: Tn,
		setOpen: Tn,
		handleScrollArrowVisibility: Tn,
		onOpenChangeComplete: Tn,
		listRef: ne,
		popupRef: ie,
		scrollHandlerRef: ae,
		scrollArrowsMountedCountRef: V,
		valueRef: oe,
		valuesRef: H,
		labelsRef: re,
		typingRef: U,
		selectionRef: le,
		firstItemTextRef: se,
		selectedItemTextRef: ce,
		alignItemWithTriggerActiveRef: ue,
		initialValueRef: de
	}, Lh)).current, [he, ge] = x.useState(!1), { mounted: _e, transitionStatus: ve, forceUnmount: ye } = Bl({
		open: B,
		ref: ie,
		preventUnmountOnClose: he,
		setPreventUnmountOnClose: ge,
		onUnmount() {
			me.update({
				activeIndex: null,
				openMethod: null,
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			}), _?.(!1);
		}
	}), be = me.useState("activeIndex"), xe = me.useState("selectedIndex"), Se = me.useState("triggerElement"), Ce = me.useState("positionerElement"), we = Qp(fe), Te = fe ?? we, Ee = x.useMemo(() => y ? "" : sm(z, S), [
		y,
		z,
		S
	]), De = x.useMemo(() => y && Array.isArray(z) ? z.map((e) => sm(e, S)) : sm(z, S), [
		y,
		z,
		S
	]);
	vh(Ms(Se), I, z, W(() => De), !L, c);
	let Oe = y ? Array.isArray(z) && z.length > 0 : z != null && Ee !== "";
	G(() => {
		j(Oe);
	}, [Oe, j]), G(function() {
		let e = Ph(H.current, z, C, y);
		e === null && (ce.current = null), B || me.set("selectedIndex", e);
	}, [
		y,
		B,
		z,
		C,
		me
	]), Op(z, () => {
		E(R), D(Ah(z, A.initialValue, C)), P.change(z);
	});
	let ke = W((e, t) => {
		let n = t, r = Jl(n);
		s?.(e, n), t.isCanceled || (e || ge(r()), te(e), e || t.reason !== "focus-out" && t.reason !== "outside-press" || (O(!0), k(!1), F === "onBlur" && P.commit(z)));
	});
	x.useImperativeHandle(h, () => ({
		unmount: ye,
		close: () => {
			me.state.open && ke(!1, Q(Ka));
		}
	}), [
		ye,
		ke,
		me
	]);
	let Ae = W((e, t) => {
		i?.(e, t), t.isCanceled || ee(e);
	}), je = W((e) => {
		let t = zh(e.scrollHeight, e.clientHeight), n = Bh(e.scrollTop, t), r = n > 0, i = n < t;
		me.set("scrollUpArrowVisible", r), me.set("scrollDownArrowVisible", i);
	}), Me = Mu({
		open: B,
		onOpenChange: ke,
		elements: {
			reference: Se,
			floating: Ce
		}
	}), Ne = Ml(Me, {
		enabled: !L,
		event: "mousedown"
	}), Pe = Rl(Me), Fe = Yu(Me, {
		enabled: !L,
		listRef: ne,
		activeIndex: be,
		selectedIndex: xe,
		disabledIndices: En,
		onNavigate(e) {
			(e !== null || B) && me.set("activeIndex", e);
		},
		focusItemOnHover: w
	}), Ie = Xu(Me, {
		enabled: !L && (B || !f && !y),
		listRef: re,
		activeIndex: be,
		selectedIndex: xe,
		disabledIndices: (e) => em(ne.current[e]),
		onMatch(e) {
			B ? me.set("activeIndex", e) : Ae(H.current[e], Q(ka));
		},
		onTyping(e) {
			U.current = e;
		}
	}), Le = x.useMemo(() => Kt(Ie.reference, Fe.reference, Pe.reference, Ne.reference, pe), [
		Ne.reference,
		Ie.reference,
		Fe.reference,
		Pe.reference,
		pe
	]), Re = x.useMemo(() => Kt(Vl, Ie.floating, Fe.floating, Pe.floating), [
		Ie.floating,
		Fe.floating,
		Pe.floating
	]), ze = Fe.item ?? Dn, Be = x.useMemo(() => ({
		props: ze,
		multiple: y,
		disabled: L,
		readOnly: f,
		isItemEqualToValue: C
	}), [
		ze,
		y,
		L,
		f,
		C
	]);
	me.useContextCallback("setValue", Ae), me.useContextCallback("setOpen", ke), me.useContextCallback("handleScrollArrowVisibility", je), me.useContextCallback("onOpenChangeComplete", _), Sh(() => {
		me.update({
			popupProps: Re,
			triggerProps: Le,
			itemRoot: Be
		});
	}), me.useSyncedValues({
		id: I,
		modal: m,
		multiple: y,
		disabled: L,
		readOnly: f,
		required: p,
		highlightItemOnHover: w,
		value: z,
		open: B,
		mounted: _e,
		transitionStatus: ve,
		popupProps: Re,
		triggerProps: Le,
		itemRoot: Be,
		items: v,
		itemToStringLabel: b,
		itemToStringValue: S,
		isItemEqualToValue: C,
		openMethod: Te
	});
	let Ve = gn(g, P.inputRef), He = y ? void 0 : R, Ue = x.useMemo(() => !y || !Array.isArray(z) || !R ? null : z.map((e) => {
		let t = sm(e, S);
		return /*#__PURE__*/ (0, X.jsx)("input", {
			type: "hidden",
			form: l,
			name: R,
			value: t,
			disabled: L
		}, t);
	}), [
		y,
		z,
		l,
		R,
		S,
		L
	]);
	return /*#__PURE__*/ (0, X.jsxs)(Ch.Provider, {
		value: me,
		children: [
			/*#__PURE__*/ (0, X.jsx)(wh.Provider, {
				value: Me,
				children: T
			}),
			/*#__PURE__*/ (0, X.jsx)("input", {
				...P.getValidationProps(L, {
					onFocus() {
						me.state.triggerElement?.focus({ focusVisible: !0 });
					},
					onChange(e) {
						if (e.nativeEvent.defaultPrevented || L || f) return;
						let t = e.currentTarget.value, n = Q(ka, e.nativeEvent);
						function r() {
							if (y) return;
							let e = t.toLowerCase(), r = H.current.findIndex((t) => sm(t, S).toLowerCase() === e || om(t, b).toLowerCase() === e);
							r === -1 && (r = H.current.findIndex((t, n) => {
								let r = re.current[n];
								return r != null && r.toLowerCase() === e;
							}));
							let i = H.current[r];
							i != null && Ae(i, n);
						}
						me.set("forceMount", !0), queueMicrotask(r);
					}
				}),
				id: I && He == null ? `${I}-hidden-input` : void 0,
				form: l,
				name: He,
				autoComplete: u,
				value: Ee,
				disabled: L,
				required: p && !(y && Oe),
				readOnly: f,
				ref: Ve,
				style: R ? Is : Fs,
				tabIndex: -1,
				"aria-hidden": !0,
				suppressHydrationWarning: !0
			}),
			Ue
		]
	});
}
// node_modules/@base-ui/react/utils/resolveAriaLabelledBy.mjs
function Hh(e, t) {
	return e ?? t;
}
var Uh = "data-popup-side", Wh = 400, Gh = {
	...wa,
	...ch,
	popupSide: (e) => e ? { [Uh]: e } : null,
	value: () => null
}, Kh = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, disabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { setTouched: l, validationMode: u, validation: d, state: f, disabled: p } = dh(), { labelId: m } = hh(), h = Th(), g = h.useState("readOnly"), _ = h.useState("required"), v = h.useState("disabled"), y = p || v || a, b = h.useState("open"), S = h.useState("mounted"), C = h.useState("value"), w = h.useState("triggerProps"), T = h.useState("positionerElement"), E = h.useState("listElement"), D = h.useState("popupSide"), O = h.useState("id"), k = h.useState("labelId"), A = h.useState("hasSelectedValue"), j = S && T ? D : null, M = i ?? O, N = Hh(m, k);
	gh({ id: i });
	let P = Ms(T), F = x.useRef(null), I = _h(y, F), { getButtonProps: L, buttonRef: R } = pn({
		disabled: y,
		native: o
	}), z = h.useStateSetter("triggerElement"), ee = Xo(), B = Xo(), te = Xo();
	x.useEffect(() => {
		if (b) return te.start(Wh, () => {
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
		b,
		h,
		B,
		te
	]);
	let ne = Kt(w, {
		id: M,
		role: "combobox",
		"aria-expanded": b,
		"aria-haspopup": "listbox",
		"aria-controls": b ? E?.id ?? bs(T)?.id : void 0,
		"aria-labelledby": N,
		"aria-readonly": g || void 0,
		"aria-required": _ || void 0,
		tabIndex: y ? -1 : 0,
		onFocus(e) {
			I(!0), b && h.context.alignItemWithTriggerActiveRef.current && h.context.setOpen(!1, Q(ka, e.nativeEvent)), ee.start(0, () => {
				h.set("forceMount", !0);
			});
		},
		onBlur(e) {
			$(T, e.relatedTarget) || (l(!0), I(!1), u === "onBlur" && d.commit(C));
		},
		onMouseDown(e) {
			if (b) return;
			let t = dn(e.currentTarget);
			function n(e) {
				if (!F.current) return;
				let t = e.target;
				$(F.current, t) || $(P.current, t) || Hp(e, F.current) || h.context.setOpen(!1, Q(Va, e));
			}
			B.start(0, () => {
				t.addEventListener("mouseup", n, { once: !0 });
			});
		}
	}, c, L), re = d.getValidationProps(y, ne);
	re.role = "combobox";
	let ie = {
		...f,
		open: b,
		disabled: y,
		value: C,
		readOnly: g,
		popupSide: j,
		placeholder: !A
	};
	return jn("button", e, {
		ref: [
			t,
			F,
			R,
			z
		],
		state: ie,
		stateAttributesMapping: Gh,
		props: re
	});
}), qh = { value: () => null }, Jh = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { className: n, render: r, children: i, placeholder: a, style: o, ...s } = e, c = Th(), l = c.useState("value"), u = c.useState("items"), d = c.useState("itemToStringLabel"), f = c.useState("hasSelectedValue"), p = !f && a != null && i == null, m = c.useState("hasNullItemLabel", p), h = {
		value: l,
		placeholder: !f
	}, g = null;
	return g = typeof i == "function" ? i(l) : i ?? (p && !m ? a : Array.isArray(l) ? lm(l, u, d) : cm(l, u, d)), jn("span", e, {
		state: h,
		ref: [t, c.context.valueRef],
		props: [{ children: g }, s],
		stateAttributesMapping: qh
	});
}), Yh = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e;
	return jn("span", e, {
		state: { open: Th().useState("open") },
		ref: t,
		props: [{
			"aria-hidden": !0,
			children: "▼"
		}, a],
		stateAttributesMapping: Ca
	});
}), Xh = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let n = Th(), r = n.useState("mounted"), i = n.useState("forceMount");
	return r || i ? /*#__PURE__*/ (0, X.jsx)(pl, {
		ref: t,
		...e
	}) : null;
}), Zh = /*#__PURE__*/ x.createContext(void 0);
function Qh() {
	let e = x.useContext(Zh);
	if (!e) throw Error(sn(59));
	return e;
}
// node_modules/@base-ui/react/select/popup/utils.mjs
function $h(e, t) {
	e && Object.assign(e.style, t);
}
var eg = {
	position: "relative",
	maxHeight: "100%",
	overflowX: "hidden",
	overflowY: "auto"
}, tg = { position: "fixed" }, ng = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { anchor: n, className: r, render: i, positionMethod: a, side: o, align: s, sideOffset: c, alignOffset: l, collisionBoundary: u = "clipping-ancestors", collisionPadding: d, arrowPadding: f, sticky: p, disableAnchorTracking: m, alignItemWithTrigger: h = !0, collisionAvoidance: g = ol, style: _, ...v } = e, y = Th(), b = Eh(), S = y.useState("open"), C = y.useState("mounted"), w = y.useState("modal"), T = y.useState("value"), E = y.useState("openMethod"), D = y.useState("positionerElement"), O = y.useState("triggerElement"), k = y.useState("isItemEqualToValue"), A = y.useState("transitionStatus"), j = x.useRef(null), M = x.useRef(null), [N, P] = x.useState(h), F = C && N && E !== "touch";
	!C && N !== h && P(h), x.useImperativeHandle(y.context.alignItemWithTriggerActiveRef, () => F), Cp((F || w) && S, E === "touch", D, O);
	let I = Qf({
		anchor: n,
		floatingRootContext: b,
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
	}), L = F ? "none" : I.side, R = F ? tg : I.positionerStyles, z = {
		open: S,
		side: L,
		align: I.align,
		anchorHidden: I.anchorHidden
	};
	G(() => {
		y.set("popupSide", I.side);
	}, [y, I.side]);
	let ee = up(e, z, {
		styles: R,
		transitionStatus: A,
		props: v,
		refs: [t, y.useStateSetter("positionerElement")],
		hidden: !C,
		inert: !S
	}), B = x.useRef(0), te = W((e) => {
		if (y.context.valuesRef.current.length === 0) return;
		let t = B.current;
		B.current = e.size;
		let n = Q(ka);
		if (t !== 0 && !y.state.multiple && T !== null && Mh(y.context.valuesRef.current, T, k) === -1) {
			let e = y.context.initialValueRef.current, t = e != null && Mh(y.context.valuesRef.current, e, k) !== -1 ? e : null;
			y.context.setValue(t, n), t === null && (y.set("selectedIndex", null), y.context.selectedItemTextRef.current = null);
		}
		if (t !== 0 && y.state.multiple && Array.isArray(T)) {
			let e = T.filter((e) => Mh(y.context.valuesRef.current, e, k) !== -1);
			e.length !== T.length && (y.context.setValue(e, n), e.length === 0 && (y.set("selectedIndex", null), y.context.selectedItemTextRef.current = null));
		}
		if (S && F) {
			y.update({
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			});
			let e = { height: "" };
			$h(D, e), $h(y.context.popupRef.current, e);
		}
	}), ne = x.useMemo(() => ({
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
	return /*#__PURE__*/ (0, X.jsx)(tp, {
		elementsRef: y.context.listRef,
		labelsRef: y.context.labelsRef,
		onMapChange: te,
		children: /*#__PURE__*/ (0, X.jsxs)(Zh.Provider, {
			value: ne,
			children: [C && w && /*#__PURE__*/ (0, X.jsx)(cp, {
				inert: Ff(!S),
				cutout: O
			}), ee]
		})
	});
}), rg = "base-ui-disable-scrollbar", ig = {
	className: rg,
	getElement(e) {
		return /*#__PURE__*/ (0, X.jsx)("style", {
			nonce: e,
			href: rg,
			precedence: "base-ui:low",
			children: `.${rg}{scrollbar-width:none}.${rg}::-webkit-scrollbar{display:none}`
		});
	}
}, ag = /*#__PURE__*/ x.createContext(void 0), og = { disableStyleElements: !1 };
function sg() {
	return x.useContext(ag) ?? og;
}
// node_modules/@base-ui/react/select/positioner/SelectPositionerCssVars.mjs
var cg = "--transform-origin", lg = {
	...Ta,
	...fa
}, ug = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, ...o } = e, s = Th(), c = s.useState("multiple"), l = s.useState("readOnly"), u = s.useState("highlightItemOnHover"), d = Eh(), { side: f, align: p, alignItemWithTriggerActive: m, isPositioned: h, setControlledAlignItemWithTrigger: g } = Qh(), _ = uf(!0) != null, v = Rf(), { nonce: y, disableStyleElements: b } = sg(), S = s.useState("id"), C = s.useState("open"), w = s.useState("openMethod"), T = s.useState("mounted"), E = s.useState("popupProps"), D = s.useState("transitionStatus"), O = s.useState("triggerElement"), k = s.useState("positionerElement"), A = s.useState("listElement"), j = x.useRef(!1), M = x.useRef(!1), N = x.useRef({}), P = No(), F = W((e) => {
		if (!k || !s.context.popupRef.current || !M.current) return;
		let t = k.style.top === "0px", n = k.style.bottom === "0px";
		if (j.current || !m || !t && !n) {
			s.context.handleScrollArrowVisibility(e);
			return;
		}
		let r = pg(k), i = mg(k.getBoundingClientRect().height, "y", r), a = dn(k), o = mt(k), c = o.getComputedStyle(k), l = parseFloat(c.marginTop), u = parseFloat(c.marginBottom), d = dg(o.getComputedStyle(s.context.popupRef.current)), f = Math.min(a.documentElement.clientHeight - l - u, d), p = e.scrollTop, h = fg(e), g = null, _ = (e) => {
			k.style.height = `${e}px`;
		}, v = t ? h - p : p, y = Math.min(i + v, f);
		if (v <= 1) {
			let n = Rh(v, 0, f - i);
			n > 0 && _(i + n), e.scrollTop = t ? h : 0, f - (i + n) <= 1 && (j.current = !0), s.context.handleScrollArrowVisibility(e);
			return;
		}
		f - y > 1 ? g = t ? Infinity : 0 : n && p < h && (g = p - (v - (i + v - f)));
		let b = Math.ceil(y);
		if (b !== 0 && _(b), g != null) {
			let t = Rh(g, 0, fg(e));
			Math.abs(e.scrollTop - t) > 1 && (e.scrollTop = t);
		}
		b >= f - 1 && (j.current = !0), s.context.handleScrollArrowVisibility(e);
	});
	x.useImperativeHandle(s.context.scrollHandlerRef, () => F, [F]), Bo({
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
	G(() => {
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
	}, [s, k]), G(() => {
		C || m || (M.current = !1, j.current = !1, $h(k, N.current));
	}, [
		C,
		m,
		k
	]), G(() => {
		let e = s.context.popupRef.current;
		if (!C || !O || !k || !e || m && !h || s.state.transitionStatus === "ending") return;
		if (M.current = !0, e.style.removeProperty(cg), !m) {
			P.request(() => s.context.handleScrollArrowVisibility(A || e));
			return;
		}
		let t = _g(e);
		try {
			let t = s.context.selectedItemTextRef.current;
			t?.isConnected || (t = !s.select("hasSelectedValue") && s.context.firstItemTextRef.current?.isConnected ? s.context.firstItemTextRef.current : null);
			let n = s.context.valueRef.current, r = mt(k), i = r.getComputedStyle(k), a = r.getComputedStyle(e), o = dn(O), c = pg(O), l = hg(O.getBoundingClientRect(), c), d = hg(k.getBoundingClientRect(), c), f = l.height, p = A || e, m = p.scrollHeight, h = parseFloat(a.borderBottomWidth), _ = parseFloat(i.marginTop) || 10, y = parseFloat(i.marginBottom) || 10, b = parseFloat(i.minHeight) || 100, x = dg(a), S = o.documentElement.clientHeight - _ - y, C = o.documentElement.clientWidth, w = S - l.bottom + f, T, E = v === "rtl" ? l.right - d.width : l.left, D = 0;
			if (t && n) {
				let e = hg(n.getBoundingClientRect(), c);
				T = hg(t.getBoundingClientRect(), c), E = d.left + (v === "rtl" ? e.right - T.right : e.left - T.left);
				let r = e.top - l.top + e.height / 2;
				D = T.top - d.top + T.height / 2 - r;
			}
			let M = w + D + y + h, P = Math.min(S, M), F = S - _ - y, I = M - P, L = C - 5;
			k.style.left = `${Rh(E, 5, L - d.width)}px`, k.style.height = `${P}px`, k.style.maxHeight = "none", k.style.marginTop = `${_}px`, k.style.marginBottom = `${y}px`, e.style.height = "100%";
			let R = fg(p), z = I >= R - 1;
			z && (P = Math.min(S, d.height) - (I - R));
			let ee = l.top < 20 || l.bottom > S - 20 || Math.ceil(P) + 1 < Math.min(m, b), B = (r.visualViewport?.scale ?? 1) !== 1 && fo;
			if (ee || B) {
				$h(k, N.current), g(!1);
				return;
			}
			let te = Math.max(b, P);
			if (z) {
				let e = Math.max(0, S - M);
				k.style.top = d.height >= F ? "0" : `${e}px`, k.style.height = `${P}px`, p.scrollTop = fg(p);
			} else k.style.bottom = "0", p.scrollTop = I;
			if (T) {
				let t = d.top, n = d.height, r = T.top + T.height / 2, i = Rh(n > 0 ? (r - t) / n * 100 : 50, 0, 100);
				e.style.setProperty(cg, `50% ${i}%`);
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
		v,
		h
	]), x.useEffect(() => {
		if (!m || !k || !C) return;
		let e = mt(k);
		function t(e) {
			s.context.setOpen(!1, Q(qa, e));
		}
		return As(e, "resize", t);
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
			_ && hf.has(e.key) && e.stopPropagation();
		},
		onScroll(e) {
			A || F(e.currentTarget);
		},
		...m && { style: A ? { height: "100%" } : eg },
		className: !A && m ? ig.className : void 0
	}, R = jn("div", e, {
		ref: [t, s.context.popupRef],
		state: I,
		stateAttributesMapping: lg,
		props: [
			E,
			L,
			Sf(D),
			o
		]
	});
	return /*#__PURE__*/ (0, X.jsxs)(x.Fragment, { children: [!b && ig.getElement(y), /*#__PURE__*/ (0, X.jsx)(jl, {
		context: d,
		modal: !1,
		disabled: !T,
		openInteractionType: w,
		returnFocus: a,
		restoreFocus: !0,
		children: R
	})] });
});
function dg(e) {
	let t = e.maxHeight;
	return t.endsWith("px") && parseFloat(t) || Infinity;
}
function fg(e) {
	return zh(e.scrollHeight, e.clientHeight);
}
function pg(e) {
	return Vd.getScale(e);
}
function mg(e, t, n) {
	return e / n[t];
}
function hg(e, t) {
	return uc({
		x: mg(e.x, "x", t),
		y: mg(e.y, "y", t),
		width: mg(e.width, "x", t),
		height: mg(e.height, "y", t)
	});
}
var gg = [
	["transform", "none"],
	["scale", "1"],
	["translate", "0 0"]
];
function _g(e) {
	let { style: t } = e, n = {};
	for (let [e, r] of gg) n[e] = t.getPropertyValue(e), t.setProperty(e, r, "important");
	return () => {
		for (let [e] of gg) {
			let r = n[e];
			r ? t.setProperty(e, r) : t.removeProperty(e);
		}
	};
}
// node_modules/@base-ui/react/select/list/SelectList.mjs
var vg = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = Th(), s = o.useState("multiple"), c = o.useState("readOnly"), { alignItemWithTriggerActive: l } = Qh(), u = o.useState("hasScrollArrows"), d = o.useState("openMethod"), f = {
		id: `${o.useState("id")}-list`,
		role: "listbox",
		"aria-multiselectable": s || void 0,
		"aria-readonly": c || void 0,
		onScroll(e) {
			o.context.scrollHandlerRef.current?.(e.currentTarget);
		},
		...l && { style: eg },
		className: u && d !== "touch" ? ig.className : void 0
	};
	return jn("div", e, {
		ref: [t, o.useStateSetter("listElement")],
		props: [f, a]
	});
}), yg = /*#__PURE__*/ x.createContext(void 0);
function bg() {
	let e = x.useContext(yg);
	if (!e) throw Error(sn(57));
	return e;
}
// node_modules/@base-ui/react/select/item/SelectItem.mjs
var xg = /*#__PURE__*/ x.memo(/*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, value: a = null, label: o, disabled: s = !1, nativeButton: c = !1, ...l } = e, u = x.useRef(null), d = xo({
		guess: !0,
		label: o,
		textRef: u
	}), f = Th(), { props: p, multiple: m, disabled: h, readOnly: g, isItemEqualToValue: _ } = f.useState("itemRoot"), v = h || s, y = f.useState("isActive", d.index), b = f.useState("open"), S = f.useState("isSelected", a), C = f.useState("isSelectedByFocus", d.index), w = d.index, T = x.useRef(null);
	G(() => {
		let e = f.context.valuesRef.current;
		return e[w] = a, () => {
			delete e[w];
		};
	}, [
		w,
		a,
		f
	]), G(() => {
		let e = f.state.value, t = f.state.selectedIndex, n = t, r;
		m && Array.isArray(e) ? (n = Fh(w, a, f.context.valuesRef.current, e, _, t), r = n === w, w === t && !r && (f.context.selectedItemTextRef.current = null)) : (r = e !== void 0 && kh(a, e, _), r && (n = w)), f.set("selectedIndex", n), r && u.current && (f.context.selectedItemTextRef.current = u.current);
	}, [
		w,
		m,
		_,
		f,
		a
	]);
	let E = x.useRef("mouse"), D = x.useRef(!1), { getButtonProps: O, buttonRef: k } = pn({
		disabled: v,
		focusableWhenDisabled: !0,
		native: c,
		composite: !0
	}), A = {
		disabled: v,
		selected: S,
		highlighted: y
	};
	function j(e) {
		if (h || g) return;
		let t = f.state.value;
		if (m) {
			let n = Array.isArray(t) ? t : [], r = S ? Ih(n, a, _) : [...n, a];
			f.context.setValue(r, Q(Pa, e));
		} else f.context.setValue(a, Q(Pa, e)), f.context.setOpen(!1, Q(Pa, e));
	}
	function M() {
		f.context.selectionRef.current.dragY = 0;
	}
	let N = {
		role: "option",
		"aria-selected": S,
		tabIndex: b && y ? 0 : -1,
		onKeyDown(e) {
			f.set("activeIndex", w), e.key === " " && f.context.typingRef.current && e.preventDefault();
		},
		onClick(e) {
			let t = E.current !== "touch", n = e.nativeEvent.pointerType, r = t && $o(e.nativeEvent) && (n !== void 0 || y), i = t && !r && !D.current;
			D.current = !1, v || i || j(e.nativeEvent);
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
			if (M(), v || E.current === "touch" || D.current) return;
			let e = !f.context.selectionRef.current.allowSelectedMouseUp && S, t = !f.context.selectionRef.current.allowUnselectedMouseUp && !S;
			e || t || (D.current = !0, T.current?.click(), D.current = !1);
		}
	}, P = jn("div", e, {
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
	}), F = x.useMemo(() => ({
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
	return /*#__PURE__*/ (0, X.jsx)(yg.Provider, {
		value: F,
		children: P
	});
})), Sg = /*#__PURE__*/ x.memo(/*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, keepMounted: a, selected: o, ...s } = e, c = x.useRef(null), { transitionStatus: l, setMounted: u } = Po(o), d = jn("span", e, {
		ref: [t, c],
		state: {
			selected: o,
			transitionStatus: l
		},
		props: [{
			"aria-hidden": !0,
			children: "✔️"
		}, s],
		stateAttributesMapping: fa
	});
	return Bo({
		batch: !0,
		enabled: !o,
		open: o,
		ref: c,
		onComplete() {
			o || u(!1);
		}
	}), d;
})), Cg = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { selected: n } = bg();
	return e.keepMounted || n ? /*#__PURE__*/ (0, X.jsx)(Sg, {
		...e,
		selected: n,
		ref: t
	}) : null;
}), wg = /*#__PURE__*/ x.memo(/*#__PURE__*/ x.forwardRef(function(e, t) {
	let { index: n, textRef: r, selectedByFocus: i } = bg(), a = Th(), { render: o, className: s, style: c, ...l } = e;
	return jn("div", e, {
		ref: [
			x.useCallback((e) => {
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
})), Tg = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, direction: a, keepMounted: o, ...s } = e, c = a === "up", l = Th(), { side: u, scrollDownArrowRef: d, scrollUpArrowRef: f } = Qh(), p = c ? "scrollUpArrowVisible" : "scrollDownArrowVisible", m = l.useState(p), h = l.useState("openMethod"), g = m && h !== "touch", _ = Xo(), v = c ? f : d, { mounted: y, transitionStatus: b, setMounted: x } = Po(g);
	G(() => (l.context.scrollArrowsMountedCountRef.current += 1, l.set("hasScrollArrows", !0), () => {
		l.context.scrollArrowsMountedCountRef.current = Math.max(0, l.context.scrollArrowsMountedCountRef.current - 1), l.context.scrollArrowsMountedCountRef.current === 0 && l.set("hasScrollArrows", !1);
	}), [l]), Bo({
		open: g,
		ref: v,
		onComplete() {
			g || x(!1);
		}
	});
	let S = jn("div", e, {
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
					let n = zh(e.scrollHeight, e.clientHeight), r = Bh(e.scrollTop, n), i = r === (c ? 0 : n), a = l.context.listRef.current;
					if (r !== e.scrollTop && (e.scrollTop = r), i) _.clear();
					else {
						if (a.length > 0) {
							let t = v.current?.offsetHeight || 0;
							e.scrollTop = Eg(a, c, r, e.clientHeight, t, n);
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
		stateAttributesMapping: fa
	});
	return y || o ? S : null;
});
function Eg(e, t, n, r, i, a) {
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
		return o < t && s ? Bh(s.offsetTop - i, a) : 0;
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
	return c > o && l ? Bh(l.offsetTop + l.offsetHeight - r + i, a) : a;
}
// node_modules/@base-ui/react/select/scroll-down-arrow/SelectScrollDownArrow.mjs
var Dg = /*#__PURE__*/ x.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, X.jsx)(Tg, {
		...e,
		ref: t,
		direction: "down"
	});
}), Og = /*#__PURE__*/ x.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, X.jsx)(Tg, {
		...e,
		ref: t,
		direction: "up"
	});
}), kg = Vh;
function Ag({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(Jh, {
		"data-slot": "select-value",
		className: Y("flex flex-1 text-left", e),
		...t
	});
}
function jg({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, X.jsxs)(Kh, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: Y("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...r,
		children: [n, /* @__PURE__ */ (0, X.jsx)(Yh, { render: /* @__PURE__ */ (0, X.jsx)(j, { className: "pointer-events-none size-4 text-muted-foreground" }) })]
	});
}
function Mg({ className: e, children: t, side: n = "bottom", sideOffset: r = 4, align: i = "center", alignOffset: a = 0, alignItemWithTrigger: o = !0, ...s }) {
	let c = fm();
	return /* @__PURE__ */ (0, X.jsx)(Xh, {
		container: c ?? void 0,
		children: /* @__PURE__ */ (0, X.jsx)(ng, {
			side: n,
			sideOffset: r,
			align: i,
			alignOffset: a,
			alignItemWithTrigger: o,
			className: "isolate z-50",
			children: /* @__PURE__ */ (0, X.jsxs)(ug, {
				"data-slot": "select-content",
				"data-align-trigger": o,
				className: Y("relative isolate z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-36 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...s,
				children: [
					/* @__PURE__ */ (0, X.jsx)(Pg, {}),
					/* @__PURE__ */ (0, X.jsx)(vg, { children: t }),
					/* @__PURE__ */ (0, X.jsx)(Fg, {})
				]
			})
		})
	});
}
function Ng({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, X.jsxs)(xg, {
		"data-slot": "select-item",
		className: Y("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, X.jsx)(wg, {
			className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
			children: t
		}), /* @__PURE__ */ (0, X.jsx)(Cg, {
			render: /* @__PURE__ */ (0, X.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ (0, X.jsx)(k, { className: "pointer-events-none" })
		})]
	});
}
function Pg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(Og, {
		"data-slot": "select-scroll-up-button",
		className: Y("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, X.jsx)(N, {})
	});
}
function Fg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(Dg, {
		"data-slot": "select-scroll-down-button",
		className: Y("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, X.jsx)(j, {})
	});
}
// src/components/ui/sheet.tsx
function Ig({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(qm, {
		"data-slot": "sheet",
		...e
	});
}
function Lg({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(Ym, {
		"data-slot": "sheet-trigger",
		...e
	});
}
function Rg({ container: e, ...t }) {
	let n = fm();
	return /* @__PURE__ */ (0, X.jsx)(Bm, {
		"data-slot": "sheet-portal",
		container: e ?? n ?? void 0,
		...t
	});
}
function zg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(jm, {
		"data-slot": "sheet-overlay",
		className: Y("fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs", e),
		...t
	});
}
function Bg({ className: e, children: t, side: n = "right", showCloseButton: r = !0, ...i }) {
	return /* @__PURE__ */ (0, X.jsxs)(Rg, { children: [/* @__PURE__ */ (0, X.jsx)(zg, {}), /* @__PURE__ */ (0, X.jsxs)(zm, {
		"data-slot": "sheet-content",
		"data-side": n,
		className: Y("d3-sheet-content fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm", e),
		...i,
		children: [t, r && /* @__PURE__ */ (0, X.jsxs)(Mm, {
			"data-slot": "sheet-close",
			render: /* @__PURE__ */ (0, X.jsx)(Z, {
				variant: "ghost",
				className: "absolute top-3 right-3",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, X.jsx)(lt, {}), /* @__PURE__ */ (0, X.jsx)("span", {
				className: "sr-only",
				children: "Fechar navegação"
			})]
		})]
	})] });
}
function Vg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sheet-header",
		className: Y("flex flex-col gap-0.5 p-4", e),
		...t
	});
}
function Hg({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(Jm, {
		"data-slot": "sheet-title",
		className: Y("font-heading text-base font-medium text-foreground", e),
		...t
	});
}
function Ug({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(Nm, {
		"data-slot": "sheet-description",
		className: Y("text-sm text-muted-foreground", e),
		...t
	});
}
// node_modules/@base-ui/react/tabs/root/TabsRootContext.mjs
var Wg = /*#__PURE__*/ x.createContext(void 0);
function Gg() {
	let e = x.useContext(Wg);
	if (e === void 0) throw Error(sn(64));
	return e;
}
// node_modules/@base-ui/react/tabs/root/TabsRootDataAttributes.mjs
var Kg = "data-activation-direction", qg = { tabActivationDirection: (e) => ({ [Kg]: e }) }, Jg = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { className: n, defaultValue: r = 0, onValueChange: i, orientation: a = "horizontal", render: o, value: s, style: c, ...l } = e, u = e.defaultValue !== void 0, d = x.useRef([]), [f, p] = x.useState(() => /* @__PURE__ */ new Map()), [m, h] = Ja({
		controlled: s,
		default: r,
		name: "Tabs",
		state: "value"
	}), g = s !== void 0, [_, v] = x.useState(() => /* @__PURE__ */ new Map()), y = x.useRef(void 0), b = x.useCallback((e) => Yg(_, e), [_]), [S, C] = x.useState(() => ({
		previousValue: m,
		tabActivationDirection: "none"
	})), { previousValue: w, tabActivationDirection: T } = S, E = T, D = !1;
	w !== m && (E = Xg(w, m, a, _), D = w != null && m != null && b(m) == null);
	let O = D ? w : m, k = w !== O || T !== E;
	G(() => {
		k && C({
			previousValue: O,
			tabActivationDirection: E
		});
	}, [
		O,
		k,
		E
	]);
	let A = W((e, t) => {
		t.activationDirection = Xg(m, e, a, _), i?.(e, t), t.isCanceled || h(() => e);
	}), j = W((e, t) => {
		i?.(e, Q(t, void 0, void 0, { activationDirection: "none" }));
	}), M = W((e, t) => (p((n) => {
		let r = new Map(n);
		return r.set(e, t), r;
	}), () => {
		p((n) => {
			if (n.get(e) !== t) return n;
			let r = new Map(n);
			return r.delete(e), r;
		});
	})), N = x.useCallback((e) => f.get(e), [f]), P = x.useCallback((e) => {
		for (let t of _.values()) if (e === t.value) return t.id;
	}, [_]), F = x.useMemo(() => ({
		getTabElementBySelectedValue: b,
		getTabIdByPanelValue: P,
		getTabPanelIdByValue: N,
		onValueChange: A,
		orientation: a,
		registerMountedTabPanel: M,
		setTabMap: v,
		tabActivationDirection: E,
		value: m
	}), [
		b,
		P,
		N,
		A,
		a,
		M,
		v,
		E,
		m
	]), I = x.useMemo(() => {
		for (let e of _.values()) if (e.value === m) return e;
	}, [_, m]), L = x.useMemo(() => {
		for (let e of _.values()) if (!e.disabled) return e.value;
	}, [_]), R = x.useRef(!u), z = x.useRef(r), ee = x.useRef(u), B = x.useRef(!1);
	G(() => {
		if (g) return;
		function e(e, t) {
			h(() => e), C({
				previousValue: e,
				tabActivationDirection: "none"
			}), j(e, t), R.current = !1;
		}
		if (_.size === 0) {
			B.current && m !== null && !y.current?.isConnected && e(null, Wa);
			return;
		}
		B.current = !0, y.current = _.keys().next().value;
		let t = I?.disabled, n = I == null && m !== null;
		if (!t && m === z.current && (ee.current = !1), ee.current && t && m === z.current) return;
		let r = R.current;
		if (t || n) {
			let n = L ?? null;
			if (m === n) {
				R.current = !1;
				return;
			}
			let i = Wa;
			r ? i = Ga : t && (i = Ua), e(n, i);
		} else r && I != null && (j(m, Ga), R.current = !1);
	}, [
		L,
		g,
		j,
		I,
		h,
		_,
		m
	]);
	let te = jn("div", e, {
		state: {
			orientation: a,
			tabActivationDirection: E
		},
		ref: t,
		props: l,
		stateAttributesMapping: qg
	});
	return /*#__PURE__*/ (0, X.jsx)(Wg.Provider, {
		value: F,
		children: /*#__PURE__*/ (0, X.jsx)(tp, {
			elementsRef: d,
			children: te
		})
	});
});
function Yg(e, t) {
	for (let [n, r] of e.entries()) if (t === r.value) return n;
	return null;
}
function Xg(e, t, n, r) {
	if (e == null || t == null) return "none";
	let [i, a, o] = n === "horizontal" ? [
		"left",
		"left",
		"right"
	] : [
		"top",
		"up",
		"down"
	], s = Yg(r, e), c = Yg(r, t);
	if (s == null || c == null) return s !== c && (typeof e == "number" || typeof e == "string") && typeof e == typeof t ? t > e ? o : a : "none";
	let l = s.getBoundingClientRect()[i], u = c.getBoundingClientRect()[i];
	return u < l ? a : u > l ? o : "none";
}
// node_modules/@base-ui/react/internals/composite/constants.mjs
var Zg = "data-composite-item-active", Qg = /*#__PURE__*/ x.createContext(void 0);
function $g() {
	let e = x.useContext(Qg);
	if (e === void 0) throw Error(sn(65));
	return e;
}
// node_modules/@base-ui/react/tabs/tab/TabsTab.mjs
var e_ = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { className: n, disabled: r = !1, render: i, value: a, id: o, nativeButton: s = !0, style: c, ...l } = e, { value: u, getTabPanelIdByValue: d, onValueChange: f, orientation: p, tabActivationDirection: m } = Gg(), { activateOnFocus: h, registerTabResizeObserverElement: g, tabsListElement: _ } = $g(), { highlightedIndex: v, onHighlightedIndexChange: y } = ln(), b = Do(o), { compositeProps: S, compositeRef: C, index: w } = Wp({ metadata: x.useMemo(() => ({
		disabled: r,
		id: b,
		value: a
	}), [
		r,
		b,
		a
	]) }), T = a === u, E = x.useRef(!1), D = x.useRef(null), O = W((e) => {
		D.current?.(), D.current = e ? g(e) : null;
	});
	G(() => {
		if (E.current) {
			E.current = !1;
			return;
		}
		if (!(T && w > -1 && v !== w)) return;
		let e = _;
		if (e != null) {
			let t = rs(dn(e));
			if (t && $(e, t)) return;
		}
		r || y(w);
	}, [
		T,
		w,
		v,
		y,
		r,
		_
	]);
	let { getButtonProps: k, buttonRef: A } = pn({
		disabled: r,
		native: s,
		focusableWhenDisabled: !0
	}), j = d(a), M = x.useRef(!1), N = x.useRef(!1);
	function P(e) {
		f(a, Q(ka, e.nativeEvent, void 0, { activationDirection: "none" }));
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
		let t = dn(e.currentTarget);
		function n() {
			M.current = !1, N.current = !1, t.removeEventListener("pointerup", n), t.removeEventListener("pointercancel", n);
		}
		t.addEventListener("pointerup", n), t.addEventListener("pointercancel", n);
	}
	return jn("button", e, {
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
				id: b,
				onClick: F,
				onFocus: I,
				onPointerDown: L,
				[Zg]: T ? "" : void 0,
				onKeyDownCapture() {
					E.current = !0;
				}
			},
			l,
			k
		],
		stateAttributesMapping: qg
	});
}), t_ = "data-index", n_ = {
	...qg,
	...fa
}, r_ = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { className: n, value: r, render: i, keepMounted: a = !1, style: o, ...s } = e, { value: c, getTabIdByPanelValue: l, orientation: u, tabActivationDirection: d, registerMountedTabPanel: f } = Gg(), p = Do(), { ref: m, index: h } = xo(), g = r === c, { mounted: _, transitionStatus: v, setMounted: y } = Po(g), b = !_, S = l(r), C = {
		hidden: b,
		orientation: u,
		tabActivationDirection: d,
		transitionStatus: v
	}, w = x.useRef(null), T = jn("div", e, {
		state: C,
		ref: [
			t,
			m,
			w
		],
		props: [{
			"aria-labelledby": S,
			hidden: b,
			id: p,
			role: "tabpanel",
			tabIndex: g ? 0 : -1,
			inert: Ff(!g),
			[t_]: h
		}, s],
		stateAttributesMapping: n_
	});
	return Bo({
		open: g,
		ref: w,
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
	]), a || _ ? T : null;
});
// node_modules/@base-ui/react/internals/composite/root/useCompositeRoot.mjs
function i_(e) {
	let { loopFocus: t = !0, orientation: n = "both", grid: r, onLoop: i, direction: a, highlightedIndex: o, onHighlightedIndexChange: s, rootRef: c, enableHomeAndEndKeys: l = !1, stopEventPropagation: u, disabledIndices: d, modifierKeys: f = En } = e, [p, m] = x.useState(0), h = r != null, g = x.useRef(null), _ = gn(g, c), v = x.useRef([]), y = x.useRef(!1), b = x.useRef(null), S = o ?? p, C = W((e, t = !1) => {
		if (b.current = v.current[e] ?? null, (s ?? m)(e), t) {
			let t = v.current[e];
			yf(g.current, t, a, n);
		}
	}), w = W((e) => {
		if (e.size === 0) return;
		if (y.current) {
			let e = v.current, t = e.indexOf(b.current);
			if (t === -1) {
				let t = e[S];
				!t || gc(e, S, d) ? C(a_(e, d)) : b.current = t;
			} else t !== S && C(t);
			return;
		}
		y.current = !0;
		let t = Array.from(e.keys()), r = t.find((e) => e?.hasAttribute("data-composite-item-active")) ?? null, i = r ? e.get(r)?.index ?? -1 : -1;
		if (i !== -1) C(i);
		else if (gc(t, S, d)) {
			let e = hc(t, { disabledIndices: d });
			dc(t, e) || C(e);
		}
		yf(g.current, r, a, n);
	});
	G(() => {
		if (d == null || o != null || !y.current) return;
		let e = v.current;
		if (gc(e, S, d)) {
			let t = hc(e, { disabledIndices: d });
			dc(e, t) || C(t);
		}
	}, [
		d,
		o,
		S,
		v,
		C
	]);
	let T = W((e, t, n) => i ? i(e, t, n, v) : n), E = W((e) => {
		let o = e.key === "Home" || e.key === "End";
		if (!hf.has(e.key) || !l && o || o_(e, f) || !g.current) return;
		let s = a === "rtl", c = s ? pf : mf, p = s ? mf : pf, m = n === "vertical" ? ff : c, _ = n === "vertical" ? df : p, y = as(e.nativeEvent);
		if (y != null && vf(y) && !em(y)) {
			let t = y.selectionStart, n = y.selectionEnd, r = y.value;
			if (t == null || e.shiftKey || t !== n || e.key !== _ && t < r.length || e.key !== m && t > 0) return;
		}
		let b = S, x = fc(v, d), w = pc(v, d);
		r != null && (b = r({
			disabledIndices: d,
			elementsRef: v,
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
		l && (e.key === "Home" ? b = x : e.key === "End" && (b = w)), b === S && (E || D) && (t && b === w && E ? (b = x, i && (b = i(e, S, b, v))) : t && b === x && D ? (b = w, i && (b = i(e, S, b, v))) : b = hc(v.current, {
			startingIndex: b,
			decrement: D,
			disabledIndices: d
		})), b !== S && !dc(v.current, b) && (u && e.stopPropagation(), (h || o || E || D) && e.preventDefault(), C(b, !0), queueMicrotask(() => {
			v.current[b]?.focus();
		}));
	});
	return {
		props: {
			ref: _,
			onFocus(e) {
				let t = g.current, n = as(e.nativeEvent);
				t && n != null && vf(n) && n.setSelectionRange(0, n.value.length);
			},
			onKeyDown: E
		},
		highlightedIndex: S,
		onHighlightedIndexChange: C,
		elementsRef: v,
		onMapChange: w,
		relayKeyboardEvent: E
	};
}
function a_(e, t) {
	let n = -1;
	for (let r = 0; r < e.length; r += 1) {
		let i = e[r];
		if (i && !gc(e, r, t)) {
			if (i.hasAttribute("data-composite-item-active")) return r;
			n === -1 && (n = r);
		}
	}
	return Math.max(n, 0);
}
function o_(e, t) {
	for (let n of gf) if (!t.includes(n) && e.getModifierState(n)) return !0;
	return !1;
}
// node_modules/@base-ui/react/internals/composite/root/CompositeRoot.mjs
function s_(e) {
	let { render: t, className: n, style: r, refs: i = En, props: a = En, state: o = Dn, stateAttributesMapping: s, highlightedIndex: c, onHighlightedIndexChange: l, orientation: u, grid: d, loopFocus: f, onLoop: p, enableHomeAndEndKeys: m, onMapChange: h, stopEventPropagation: g = !0, rootRef: _, disabledIndices: v, modifierKeys: y, highlightItemOnHover: b = !1, tag: S = "div", ...C } = e, { props: w, highlightedIndex: T, onHighlightedIndexChange: E, elementsRef: D, onMapChange: O, relayKeyboardEvent: k } = i_({
		grid: d,
		loopFocus: f,
		onLoop: p,
		orientation: u,
		highlightedIndex: c,
		onHighlightedIndexChange: l,
		rootRef: _,
		stopEventPropagation: g,
		enableHomeAndEndKeys: m,
		direction: Rf(),
		disabledIndices: v,
		modifierKeys: y
	}), A = jn(S, e, {
		state: o,
		ref: i,
		props: [
			w,
			...a,
			C
		],
		stateAttributesMapping: s
	}), j = x.useMemo(() => ({
		highlightedIndex: T,
		onHighlightedIndexChange: E,
		highlightItemOnHover: b,
		relayKeyboardEvent: k
	}), [
		T,
		E,
		b,
		k
	]);
	return /*#__PURE__*/ (0, X.jsx)(cn.Provider, {
		value: j,
		children: /*#__PURE__*/ (0, X.jsx)(tp, {
			elementsRef: D,
			onMapChange: (e) => {
				h?.(e), O(e);
			},
			children: A
		})
	});
}
// node_modules/@base-ui/react/tabs/list/TabsList.mjs
var c_ = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { activateOnFocus: n = !1, className: r, loopFocus: i = !0, render: a, style: o, ...s } = e, { orientation: c, setTabMap: l, tabActivationDirection: u } = Gg(), [d, f] = x.useState(0), [p, m] = x.useState(null), h = x.useRef(/* @__PURE__ */ new Set()), g = x.useRef(/* @__PURE__ */ new Set()), _ = x.useRef(null);
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
	}, S = {
		"aria-orientation": c === "vertical" ? "vertical" : void 0,
		role: "tablist"
	}, C = x.useMemo(() => ({
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
	return /*#__PURE__*/ (0, X.jsx)(Qg.Provider, {
		value: C,
		children: /*#__PURE__*/ (0, X.jsx)(s_, {
			render: a,
			className: r,
			style: o,
			state: b,
			refs: [t, m],
			props: [S, s],
			stateAttributesMapping: qg,
			highlightedIndex: d,
			enableHomeAndEndKeys: !0,
			loopFocus: i,
			orientation: c,
			onHighlightedIndexChange: f,
			onMapChange: l,
			disabledIndices: En
		})
	});
});
// src/components/ui/tabs.tsx
function l_({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(Jg, {
		"data-slot": "tabs",
		"data-orientation": t,
		className: Y("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", e),
		...n
	});
}
var u_ = Un("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-muted",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function d_({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(c_, {
		"data-slot": "tabs-list",
		"data-variant": t,
		className: Y(u_({ variant: t }), e),
		...n
	});
}
function f_({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(e_, {
		"data-slot": "tabs-trigger",
		className: Y("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-[active]:shadow-sm group-data-[variant=line]/tabs-list:data-[active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent", "data-[active]:bg-background data-[active]:text-foreground dark:data-[active]:border-input dark:data-[active]:bg-input/30 dark:data-[active]:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[active]:after:opacity-100", e),
		...t
	});
}
function p_({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(r_, {
		"data-slot": "tabs-content",
		className: Y("d3-tabs-panel flex-1 text-sm outline-none", e),
		...t
	});
}
// src/components/client/surfaces.tsx
function m_({ initialMessage: e = "", onSubmit: t, onGuest: n }) {
	let [r, i] = (0, x.useState)("login"), [a, o] = (0, x.useState)(""), [s, c] = (0, x.useState)(""), [l, u] = (0, x.useState)(""), [d, f] = (0, x.useState)(e), [p, m] = (0, x.useState)(!1);
	return (0, x.useEffect)(() => f(e), [e]), /* @__PURE__ */ (0, X.jsx)("main", {
		className: "fixed inset-0 z-[2147483647] grid min-h-svh place-items-center overflow-y-auto bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, X.jsxs)(Cm, {
			className: "w-full max-w-[380px] animate-ui-enter border-border bg-card shadow-none",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(wm, {
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
						children: [/* @__PURE__ */ (0, X.jsx)(Tm, {
							className: "text-xl",
							children: r === "register" ? "Criar conta" : r === "code" ? "Entrar com código" : "Entrar no OrganizeOn"
						}), /* @__PURE__ */ (0, X.jsx)(Em, { children: "Autentique-se para acessar seus jogos e configurações." })]
					})]
				}),
				/* @__PURE__ */ (0, X.jsxs)(Dm, { children: [/* @__PURE__ */ (0, X.jsxs)(l_, {
					value: r,
					onValueChange: (e) => {
						i(e), f("");
					},
					children: [/* @__PURE__ */ (0, X.jsxs)(d_, {
						className: "grid h-9 w-full grid-cols-3 bg-muted/70",
						children: [
							/* @__PURE__ */ (0, X.jsx)(f_, {
								value: "login",
								children: "Entrar"
							}),
							/* @__PURE__ */ (0, X.jsx)(f_, {
								value: "register",
								children: "Criar conta"
							}),
							/* @__PURE__ */ (0, X.jsx)(f_, {
								value: "code",
								children: "Código"
							})
						]
					}), /* @__PURE__ */ (0, X.jsx)(p_, {
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
									children: ["Código de login", /* @__PURE__ */ (0, X.jsx)(xh, {
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
									children: ["Usuário", /* @__PURE__ */ (0, X.jsx)(xh, {
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
									children: ["Senha", /* @__PURE__ */ (0, X.jsx)(xh, {
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
								/* @__PURE__ */ (0, X.jsx)(Z, {
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
					children: [/* @__PURE__ */ (0, X.jsx)(Z, {
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
				/* @__PURE__ */ (0, X.jsxs)(Om, {
					className: "gap-2 border-t border-border pt-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, X.jsx)(Ge, { className: "size-4 shrink-0" }), "Acesse com sua conta OrganizeOn."]
				})
			]
		})
	});
}
function h_(e) {
	return e < 1024 ? `${e} B` : e < 1024 ** 2 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1024 ** 2).toFixed(1)} MB`;
}
function g_(e) {
	let [t, n] = (0, x.useState)(null), [r, i] = (0, x.useState)([]), [a, o] = (0, x.useState)(""), [s, c] = (0, x.useState)(null), [l, u] = (0, x.useState)(""), [d, f] = (0, x.useState)(null), [p, m] = (0, x.useState)("backup"), h = async () => {
		u("");
		try {
			n(await e.getStatus());
		} catch (e) {
			u(e instanceof Error ? e.message : "Falha ao consultar o backup.");
		}
	};
	(0, x.useEffect)(() => {
		h(), e.getGames().then(i).catch(() => u("Não foi possível carregar a lista de jogos."));
	}, []);
	let g = async (e, t) => {
		c(e), u("");
		try {
			await t(), await h(), Vi.success("Ação concluída");
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
					children: [/* @__PURE__ */ (0, X.jsx)(Z, {
						variant: "outline",
						size: "icon",
						"aria-label": "Voltar",
						onClick: e.onClose,
						children: /* @__PURE__ */ (0, X.jsx)(D, {})
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
				/* @__PURE__ */ (0, X.jsxs)(l_, {
					value: p,
					onValueChange: m,
					children: [
						/* @__PURE__ */ (0, X.jsxs)(d_, {
							className: "grid h-9 w-full grid-cols-3 sm:w-auto sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, X.jsx)(f_, {
									value: "backup",
									children: "Backup"
								}),
								/* @__PURE__ */ (0, X.jsx)(f_, {
									value: "progress",
									children: "Progressos"
								}),
								/* @__PURE__ */ (0, X.jsx)(f_, {
									value: "preferences",
									children: "Preferências"
								})
							]
						}),
						/* @__PURE__ */ (0, X.jsx)(p_, {
							value: "backup",
							className: "mt-4",
							children: /* @__PURE__ */ (0, X.jsxs)(Cm, { children: [/* @__PURE__ */ (0, X.jsxs)(wm, {
								className: "flex-row items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsxs)(Tm, {
									className: "flex items-center gap-2 text-base",
									children: [/* @__PURE__ */ (0, X.jsx)(z, { className: "size-4 text-muted-foreground" }), "Backup na nuvem"]
								}), /* @__PURE__ */ (0, X.jsx)(Em, {
									className: "mt-1",
									children: "Sincronize preferências e dados da conta."
								})] }), /* @__PURE__ */ (0, X.jsx)(Sm, {
									variant: t?.enabled ? "default" : "secondary",
									children: t ? t.enabled ? "Ativo" : "Desativado" : "Consultando"
								})]
							}), /* @__PURE__ */ (0, X.jsxs)(Dm, {
								className: "grid gap-4",
								children: [/* @__PURE__ */ (0, X.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3 border-t pt-4 text-sm",
									children: [/* @__PURE__ */ (0, X.jsx)("span", {
										className: "text-muted-foreground",
										children: "Armazenamento utilizado"
									}), /* @__PURE__ */ (0, X.jsxs)("strong", {
										className: "font-mono text-xs sm:text-sm",
										children: [
											t ? h_(t.size || 0) : "—",
											" / ",
											h_(_)
										]
									})]
								}), /* @__PURE__ */ (0, X.jsxs)("div", {
									className: "grid grid-cols-1 gap-2 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, X.jsx)(Z, {
											onClick: () => void g("toggle", () => e.toggleBackup(!t?.enabled)),
											disabled: s !== null || !t,
											children: s === "toggle" ? "Atualizando…" : t?.enabled ? "Desativar backup" : "Ativar backup"
										}),
										/* @__PURE__ */ (0, X.jsx)(Z, {
											variant: "outline",
											onClick: () => void g("save", e.saveBackup),
											disabled: s !== null,
											children: s === "save" ? "Salvando…" : "Salvar agora"
										}),
										/* @__PURE__ */ (0, X.jsx)(Z, {
											variant: "outline",
											onClick: () => void g("restore", e.restoreBackup),
											disabled: s !== null,
											children: s === "restore" ? "Restaurando…" : "Restaurar backup"
										})
									]
								})]
							})] })
						}),
						/* @__PURE__ */ (0, X.jsx)(p_, {
							value: "progress",
							className: "mt-4",
							children: /* @__PURE__ */ (0, X.jsxs)(Cm, { children: [/* @__PURE__ */ (0, X.jsxs)(wm, { children: [/* @__PURE__ */ (0, X.jsxs)(Tm, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, X.jsx)(de, { className: "size-4 text-muted-foreground" }), "Progresso dos jogos"]
							}), /* @__PURE__ */ (0, X.jsx)(Em, { children: "Os arquivos dos jogos continuam no navegador. Estas ações removem apenas os saves." })] }), /* @__PURE__ */ (0, X.jsxs)(Dm, {
								className: "grid gap-3",
								children: [
									/* @__PURE__ */ (0, X.jsx)(Z, {
										variant: "destructive",
										className: "w-full sm:w-fit",
										onClick: () => f("clear-all"),
										children: "Apagar todos os progressos"
									}),
									/* @__PURE__ */ (0, X.jsxs)("div", {
										className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]",
										children: [/* @__PURE__ */ (0, X.jsxs)(kg, {
											value: a,
											onValueChange: (e) => o(e ?? ""),
											children: [/* @__PURE__ */ (0, X.jsx)(jg, {
												className: "w-full",
												children: /* @__PURE__ */ (0, X.jsx)(Ag, { placeholder: "Escolha um jogo" })
											}), /* @__PURE__ */ (0, X.jsx)(Mg, { children: r.map((e) => /* @__PURE__ */ (0, X.jsxs)(Ng, {
												value: e.id,
												children: [
													e.name,
													" — ",
													e.id
												]
											}, e.id)) })]
										}), /* @__PURE__ */ (0, X.jsx)(Z, {
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
						/* @__PURE__ */ (0, X.jsx)(p_, {
							value: "preferences",
							className: "mt-4",
							children: /* @__PURE__ */ (0, X.jsxs)(Cm, { children: [/* @__PURE__ */ (0, X.jsxs)(wm, { children: [/* @__PURE__ */ (0, X.jsxs)(Tm, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, X.jsx)(Ue, { className: "size-4 text-muted-foreground" }), "Preferências locais"]
							}), /* @__PURE__ */ (0, X.jsx)(Em, { children: "Tema, proxy, identidade do navegador e teclas ficam salvos neste dispositivo." })] }), /* @__PURE__ */ (0, X.jsx)(Dm, { children: /* @__PURE__ */ (0, X.jsx)(Z, {
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
				/* @__PURE__ */ (0, X.jsx)(Xm, {
					open: d !== null,
					onOpenChange: (e) => !e && f(null),
					children: /* @__PURE__ */ (0, X.jsxs)($m, { children: [/* @__PURE__ */ (0, X.jsxs)(eh, { children: [/* @__PURE__ */ (0, X.jsx)(nh, { children: "Confirmar exclusão" }), /* @__PURE__ */ (0, X.jsx)(rh, { children: d === "clear-all" ? "Apagar todos os saves de jogos deste perfil?" : d === "clear-game" ? `Apagar o save de ${a}?` : "Apagar as preferências locais deste dispositivo?" })] }), /* @__PURE__ */ (0, X.jsxs)(th, { children: [/* @__PURE__ */ (0, X.jsx)(Z, {
						variant: "outline",
						onClick: () => f(null),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, X.jsx)(Z, {
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
function __(e) {
	let [t, n] = (0, x.useState)(e.currentId);
	return /* @__PURE__ */ (0, X.jsx)(Xm, {
		open: !0,
		onOpenChange: (t) => {
			t || e.onClose();
		},
		children: /* @__PURE__ */ (0, X.jsxs)($m, {
			className: "max-h-[min(86svh,760px)] overflow-y-auto sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(eh, { children: [/* @__PURE__ */ (0, X.jsx)(nh, { children: "Servidor proxy" }), /* @__PURE__ */ (0, X.jsxs)(rh, { children: [e.guestMode ? "Convidados usam apenas servidores públicos externos." : "Escolha o servidor WISP usado pelo cliente.", " A medição representa a abertura do WebSocket neste dispositivo."] })] }),
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
											children: [r.name, r.beta && /* @__PURE__ */ (0, X.jsx)(Sm, {
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
											children: [/* @__PURE__ */ (0, X.jsx)(Ye, { className: `size-3 ${i.state === "online" ? "text-emerald-500" : i.state === "offline" ? "text-destructive" : ""}` }), i.label]
										})
									]
								}),
								a && /* @__PURE__ */ (0, X.jsx)(k, { className: "size-4 text-foreground" })
							]
						}, r.id);
					})
				}),
				/* @__PURE__ */ (0, X.jsx)("p", {
					className: "rounded-md border bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground",
					children: "Servidores beta são operados por terceiros. O tráfego de navegação pode não passar pelo backend OrganizeOn."
				}),
				/* @__PURE__ */ (0, X.jsxs)(th, { children: [/* @__PURE__ */ (0, X.jsx)(Z, {
					variant: "outline",
					onClick: e.onClose,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, X.jsx)(Z, {
					onClick: () => e.onApply(t),
					children: "Aplicar e reiniciar"
				})] })
			]
		})
	});
}
var v_ = {
	owner: "Owner",
	ultra_admin: "Ultra Admin",
	admin: "Administrador",
	user: "Usuário",
	guest: "Convidado"
};
function y_(e) {
	let [t, n] = (0, x.useState)(!1), [r, i] = (0, x.useState)(!1), a = [
		{
			id: "home",
			label: "Início",
			icon: pe
		},
		{
			id: "games",
			label: "Jogos",
			icon: de
		},
		{
			id: "settings",
			label: "Configurações",
			icon: Ue
		},
		...e.guest ? [] : [{
			id: "data",
			label: "Dados",
			icon: z
		}],
		{
			id: "proxy",
			label: "Servidor proxy",
			icon: Ye
		},
		...e.canOpenDashboard ? [{
			id: "dashboard",
			label: "Dashboard",
			icon: qe
		}] : []
	];
	return /* @__PURE__ */ (0, X.jsxs)(Ig, {
		open: r,
		onOpenChange: i,
		children: [
			/* @__PURE__ */ (0, X.jsx)(Lg, {
				render: /* @__PURE__ */ (0, X.jsx)(Z, {
					variant: "outline",
					size: "icon",
					className: "pointer-events-auto fixed left-3 top-3 z-40",
					"aria-label": "Abrir menu"
				}),
				children: /* @__PURE__ */ (0, X.jsx)(Ce, {})
			}),
			/* @__PURE__ */ (0, X.jsxs)(Bg, {
				side: "left",
				className: "w-[min(88vw,320px)] border-border bg-popover p-3",
				children: [
					/* @__PURE__ */ (0, X.jsxs)(Vg, {
						className: "border-b px-2 pb-4 text-left",
						children: [/* @__PURE__ */ (0, X.jsxs)(Hg, {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, X.jsx)("img", {
								className: "size-7",
								src: "https://organizeon.com.br/d3/assets/organizeon-icon.png",
								alt: ""
							}), "OrganizeOn"]
						}), /* @__PURE__ */ (0, X.jsx)(Ug, { children: "Workspace" })]
					}),
					/* @__PURE__ */ (0, X.jsx)("nav", {
						className: "grid gap-1",
						"aria-label": "Navegação da conta",
						children: a.map(({ id: t, label: n, icon: r }) => /* @__PURE__ */ (0, X.jsxs)(Z, {
							variant: "ghost",
							className: "justify-start",
							onClick: () => {
								i(!1), e.onNavigate(t);
							},
							children: [
								/* @__PURE__ */ (0, X.jsx)(r, { className: "size-4 text-muted-foreground" }),
								n,
								t === "proxy" && /* @__PURE__ */ (0, X.jsx)(Sm, {
									variant: "secondary",
									className: "ml-auto",
									children: e.proxyLabel
								})
							]
						}, t))
					}),
					/* @__PURE__ */ (0, X.jsx)("div", {
						className: "mt-auto border-t pt-3",
						children: /* @__PURE__ */ (0, X.jsxs)(pm, { children: [/* @__PURE__ */ (0, X.jsxs)(mm, {
							render: /* @__PURE__ */ (0, X.jsx)(Z, {
								variant: "ghost",
								className: "h-12 w-full justify-start",
								"aria-label": `Perfil de ${e.username}`
							}),
							children: [
								/* @__PURE__ */ (0, X.jsx)(st, { className: "size-4" }),
								/* @__PURE__ */ (0, X.jsxs)("span", {
									className: "grid flex-1 text-left",
									children: [/* @__PURE__ */ (0, X.jsx)("span", {
										className: "text-sm",
										children: e.username
									}), /* @__PURE__ */ (0, X.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: v_[e.role] || "Usuário"
									})]
								}),
								/* @__PURE__ */ (0, X.jsx)(N, { className: "size-4" })
							]
						}), /* @__PURE__ */ (0, X.jsxs)(hm, {
							side: "top",
							align: "start",
							className: "w-64",
							children: [
								/* @__PURE__ */ (0, X.jsx)(gm, { children: /* @__PURE__ */ (0, X.jsxs)(_m, { children: [
									e.username,
									" · ",
									v_[e.role] || "Usuário"
								] }) }),
								/* @__PURE__ */ (0, X.jsx)(ym, {}),
								/* @__PURE__ */ (0, X.jsxs)(vm, {
									onClick: () => n(!0),
									className: "text-destructive",
									children: [/* @__PURE__ */ (0, X.jsx)(ye, {}), "Sair da conta"]
								})
							]
						})] })
					})
				]
			}),
			/* @__PURE__ */ (0, X.jsx)(Xm, {
				open: t,
				onOpenChange: n,
				children: /* @__PURE__ */ (0, X.jsxs)($m, {
					className: "sm:max-w-sm",
					children: [/* @__PURE__ */ (0, X.jsxs)(eh, { children: [/* @__PURE__ */ (0, X.jsx)(nh, { children: "Encerrar sessão?" }), /* @__PURE__ */ (0, X.jsx)(rh, { children: e.guest ? "Deseja sair do modo convidado?" : "Deseja realmente sair desta conta?" })] }), /* @__PURE__ */ (0, X.jsxs)(th, { children: [/* @__PURE__ */ (0, X.jsx)(Z, {
						variant: "outline",
						onClick: () => n(!1),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, X.jsx)(Z, {
						variant: "destructive",
						onClick: () => e.onNavigate("logout"),
						children: "Sair"
					})] })]
				})
			})
		]
	});
}
function b_(e) {
	let { type: t, ...n } = e, r = (0, x.useMemo)(() => t === "login" ? /* @__PURE__ */ (0, X.jsx)(m_, { ...n }) : t === "data" ? /* @__PURE__ */ (0, X.jsx)(g_, { ...n }) : t === "proxy" ? /* @__PURE__ */ (0, X.jsx)(__, { ...n }) : /* @__PURE__ */ (0, X.jsx)(y_, { ...n }), [t, n]);
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: t === "account" ? "organizeon-ui organizeon-overlay-root dark text-foreground" : "organizeon-ui dark min-h-svh bg-background text-foreground",
		children: r
	});
}
// node_modules/@base-ui/react/tooltip/root/TooltipRootContext.mjs
var x_ = /*#__PURE__*/ x.createContext(void 0);
function S_(e) {
	let t = x.useContext(x_);
	if (t === void 0 && !e) throw Error(sn(72));
	return t;
}
// node_modules/@base-ui/react/tooltip/store/TooltipStore.mjs
var C_ = {
	...Au,
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
}, w_ = class extends xu {
	constructor(e, t, n) {
		let r = new tu();
		super(T_(e, r, t, n), E_(r), C_);
	}
	setOpen = (e, t) => {
		Yl(this, e, t, { extraState: { openChangeReason: t.reason } });
	};
	cancelPendingOpen(e) {
		this.state.floatingRootContext.dispatchOpenChange(!1, Q(Aa, e));
	}
};
function T_(e, t, n, r = !1) {
	return {
		...wu(t, n, r),
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
function E_(e) {
	return {
		popupRef: /*#__PURE__*/ x.createRef(),
		onOpenChange: void 0,
		onOpenChangeComplete: void 0,
		triggerElements: e
	};
}
// node_modules/@base-ui/react/tooltip/root/TooltipRoot.mjs
var D_ = uu(function(e) {
	let { disabled: t = !1, defaultOpen: n = !1, open: r, disableHoverablePopup: i = !1, trackCursorAxis: a = "none", actionsRef: o, onOpenChange: s, onOpenChangeComplete: c, handle: l, triggerId: u, defaultTriggerId: d = null, children: f } = e, p = Ul((e, t) => new w_({
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
	}), Zl(p, { closeOnActiveTriggerUnmount: !0 });
	let { forceUnmount: y, transitionStatus: b } = Ql(h, p), S = p.useState("isInstantPhase"), C = p.useState("instantType"), w = p.useState("lastOpenChangeReason"), T = x.useRef(null);
	G(() => {
		m && t && p.setOpen(!1, Q(Ua));
	}, [
		m,
		t,
		p
	]), G(() => {
		b === "ending" && w === "none" || b !== "ending" && S ? (C !== "delay" && (T.current = C), p.set("instantType", "delay")) : T.current !== null && (p.set("instantType", T.current), T.current = null);
	}, [
		b,
		S,
		w,
		C,
		p
	]), G(() => {
		h && (g ?? p.set("payload", void 0));
	}, [
		p,
		g,
		h
	]), x.useImperativeHandle(o, () => ({
		unmount: y,
		close: () => p.setOpen(!1, Q(Ka))
	}), [y, p]);
	let E = h || _ || !t && a !== "none";
	return /*#__PURE__*/ (0, X.jsxs)(x_.Provider, {
		value: p,
		children: [
			l && /*#__PURE__*/ (0, X.jsx)(Wl, {
				handle: l,
				store: p
			}),
			E && /*#__PURE__*/ (0, X.jsx)(O_, {
				store: p,
				disabled: t,
				trackCursorAxis: a
			}),
			typeof f == "function" ? f({ payload: v }) : f
		]
	});
});
function O_({ store: e, disabled: t, trackCursorAxis: n }) {
	let r = e.useState("floatingRootContext"), i = Rl(r, {
		enabled: !t,
		referencePress: () => e.select("closeOnClick")
	}), a = Fl(r, {
		enabled: !t && n !== "none",
		axis: n === "none" ? void 0 : n
	}), o = x.useMemo(() => Kt(a.reference, i.reference), [a.reference, i.reference]);
	return $l(e, {
		activeTriggerProps: o,
		inactiveTriggerProps: o,
		popupProps: i.floating ?? Dn
	}), null;
}
// node_modules/@base-ui/react/tooltip/provider/TooltipProviderContext.mjs
var k_ = /*#__PURE__*/ x.createContext(void 0);
function A_() {
	return x.useContext(k_);
}
// node_modules/@base-ui/react/tooltip/trigger/TooltipTrigger.mjs
var j_ = "data-base-ui-tooltip-trigger";
function M_(e) {
	let t = as(e);
	return _t(t) ? t : null;
}
var N_ = du(function(e, t) {
	let { render: n, className: r, style: i, handle: a, payload: o, disabled: s, delay: c, closeOnClick: l = !0, closeDelay: u, id: d, ...f } = e, p = S_(!0), m = ju(a) ?? p;
	if (!m) throw Error(sn(82));
	let h = Do(d), g = m.useState("isTriggerActive", h), _ = m.useState("isOpenedByTrigger", h), v = m.useState("floatingRootContext"), y = x.useRef(null), b = u ?? 0, { registerTrigger: S, isMountedByThisTrigger: C } = Xl(h, y, m, {
		payload: o,
		closeOnClick: l,
		closeDelay: b
	}), w = A_(), { activeIdRef: T, delayRef: E, isInstantPhase: D, hasProvider: O } = ks(v, { open: _ }), k = zu(v);
	m.useSyncedValue("isInstantPhase", D);
	let A = m.useState("disabled"), j = s ?? A, M = Ms(j), N = m.useState("trackCursorAxis"), P = m.useState("disableHoverablePopup"), F = x.useRef(!1), I = Xo(), L = x.useRef(void 0);
	function R() {
		return O && T.current != null ? 0 : c ?? w ?? 600;
	}
	function z(e) {
		let t = y.current;
		if (!t || !e) return !1;
		let n = is(e, `[${j_}]`);
		return n !== null && n !== t && $(t, n);
	}
	function ee(e) {
		let t = z(e);
		return F.current = t, t && (k.openChangeTimeout.clear(), k.restTimeout.clear(), k.restTimeoutPending = !1, I.clear()), t;
	}
	let B = Hu(v, {
		enabled: !j,
		mouseOnly: !0,
		move: !1,
		handleClose: !P && N !== "both" ? id() : null,
		restMs: R,
		delay() {
			return u == null && O ? { close: Ss(E.current, "close") } : { close: b };
		},
		triggerElementRef: y,
		isActiveTrigger: g,
		isClosing: () => m.select("transitionStatus") === "ending",
		shouldOpen() {
			return !F.current;
		}
	}), te = Pu(v, { enabled: !j }).reference, ne = (e) => {
		let t = F.current, n = M_(e), r = ee(n), i = y.current, a = i && n && $(i, n);
		if (r && m.select("open") && m.select("lastOpenChangeReason") === "trigger-hover") m.setOpen(!1, Q(ja, e));
		else if (t && !r && a && !M.current && !m.select("open") && i && ts(L.current)) {
			let t = () => {
				F.current || M.current || m.select("open") || m.setOpen(!0, Q(ja, e, i));
			}, n = R();
			n === 0 ? (I.clear(), t()) : I.start(n, t);
		}
	}, re = m.useState("appliedTriggerProps", C || N !== "none");
	return jn("button", e, {
		state: { open: _ },
		ref: [
			t,
			S,
			y
		],
		props: [
			B,
			te,
			re,
			{
				onMouseOver(e) {
					ne(e.nativeEvent);
				},
				onFocus(e) {
					z(M_(e.nativeEvent)) && e.preventBaseUIHandler();
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
				[fs]: j ? "" : void 0,
				[j_]: j ? void 0 : ""
			},
			f
		],
		stateAttributesMapping: Ca
	});
}), P_ = /*#__PURE__*/ x.createContext(void 0);
function F_() {
	let e = x.useContext(P_);
	if (e === void 0) throw Error(sn(70));
	return e;
}
// node_modules/@base-ui/react/utils/FloatingPortalLite.mjs
var I_ = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { children: n, container: r, className: i, render: a, style: o, ...s } = e, { node: c, subtree: l } = fl({
		container: r,
		ref: t,
		componentProps: e,
		elementProps: s
	});
	return !l && !c ? null : /*#__PURE__*/ (0, X.jsxs)(x.Fragment, { children: [l, c && /*#__PURE__*/ wi.createPortal(n, c)] });
}), L_ = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e;
	return S_().useState("mounted") || n ? /*#__PURE__*/ (0, X.jsx)(P_.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, X.jsx)(I_, {
			ref: t,
			...r
		})
	}) : null;
}), R_ = /*#__PURE__*/ x.createContext(void 0);
function z_() {
	let e = x.useContext(R_);
	if (e === void 0) throw Error(sn(71));
	return e;
}
// node_modules/@base-ui/react/tooltip/positioner/TooltipPositioner.mjs
var B_ = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, anchor: i, positionMethod: a = "absolute", side: o = "top", align: s = "center", sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = sl, style: g, ..._ } = e, v = S_(), y = F_(), b = v.useState("open"), S = v.useState("mounted"), C = v.useState("trackCursorAxis"), w = v.useState("disableHoverablePopup"), T = v.useState("floatingRootContext"), E = v.useState("instantType"), D = v.useState("transitionStatus"), O = Qf({
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
		keepMounted: y,
		collisionAvoidance: h,
		adaptiveOrigin: v.useState("adaptiveOrigin")
	}), k = up(e, x.useMemo(() => ({
		open: b,
		side: O.side,
		align: O.align,
		anchorHidden: O.anchorHidden,
		instant: C === "none" ? E : "tracking-cursor"
	}), [
		b,
		O.side,
		O.align,
		O.anchorHidden,
		C,
		E
	]), {
		styles: O.positionerStyles,
		transitionStatus: D,
		props: _,
		refs: [t, v.useStateSetter("positionerElement")],
		hidden: !S,
		inert: !b || C === "both" || w
	});
	return /*#__PURE__*/ (0, X.jsx)(R_.Provider, {
		value: O,
		children: k
	});
}), V_ = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = S_(), { side: s, align: c } = z_(), l = o.useState("open"), u = o.useState("instantType"), d = o.useState("transitionStatus"), f = o.useState("popupProps"), p = o.useState("floatingRootContext"), m = o.useState("disabled"), h = o.useState("closeDelay");
	Bo({
		open: l,
		ref: o.context.popupRef,
		onComplete() {
			l && o.context.onOpenChangeComplete?.(!0);
		}
	}), Bu(p, {
		enabled: !m,
		closeDelay: h
	});
	let g = o.useStateSetter("popupElement");
	return jn("div", e, {
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
			Vl,
			f,
			Sf(d),
			a
		],
		stateAttributesMapping: Ea
	});
}), H_ = /*#__PURE__*/ x.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = S_(), { arrowRef: s, side: c, align: l, arrowUncentered: u, arrowStyles: d } = z_();
	return jn("div", e, {
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
		stateAttributesMapping: Ta
	});
}), U_ = function(e) {
	let { delay: t, closeDelay: n, timeout: r = 400 } = e, i = x.useMemo(() => ({
		open: t,
		close: n
	}), [t, n]);
	return /*#__PURE__*/ (0, X.jsx)(k_.Provider, {
		value: t,
		children: /*#__PURE__*/ (0, X.jsx)(Os, {
			delay: i,
			timeoutMs: r,
			children: e.children
		})
	});
};
// src/components/ui/tooltip.tsx
function W_({ delay: e = 0, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(U_, {
		"data-slot": "tooltip-provider",
		delay: e,
		...t
	});
}
function G_({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(D_, {
		"data-slot": "tooltip",
		...e
	});
}
function K_({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(N_, {
		"data-slot": "tooltip-trigger",
		...e
	});
}
function q_({ className: e, side: t = "top", sideOffset: n = 4, align: r = "center", alignOffset: i = 0, children: a, ...o }) {
	let s = fm();
	return /* @__PURE__ */ (0, X.jsx)(L_, {
		container: s ?? void 0,
		children: /* @__PURE__ */ (0, X.jsx)(B_, {
			align: r,
			alignOffset: i,
			side: t,
			sideOffset: n,
			className: "isolate z-50",
			children: /* @__PURE__ */ (0, X.jsxs)(V_, {
				"data-slot": "tooltip-content",
				className: Y("z-50 inline-flex w-fit max-w-xs origin-[var(--transform-origin)] items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...o,
				children: [a, /* @__PURE__ */ (0, X.jsx)(H_, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })]
			})
		})
	});
}
// src/components/client/game-card.tsx
function J_({ game: e }) {
	let t = e.type === "flash" ? "Flash · Ruffle" : e.type === "external-download" ? "HTML offline" : e.type === "remote" ? "Multiplayer" : "HTML5";
	return /* @__PURE__ */ (0, X.jsxs)(Cm, {
		className: "h-full overflow-hidden rounded-lg border-border bg-card p-0 shadow-none transition-colors hover:border-zinc-600",
		children: [/* @__PURE__ */ (0, X.jsx)("img", {
			className: "aspect-[16/10] w-full bg-muted object-cover",
			src: e.cover,
			alt: `Capa de ${e.name}`,
			loading: "lazy"
		}), /* @__PURE__ */ (0, X.jsxs)(Dm, {
			className: "grid gap-3 p-3.5 sm:p-4",
			children: [
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "flex flex-wrap gap-1.5",
					children: [
						/* @__PURE__ */ (0, X.jsxs)(Sm, {
							variant: "secondary",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, X.jsx)(de, { className: "size-3" }), t]
						}),
						e.platforms.map((e) => /* @__PURE__ */ (0, X.jsx)(Sm, {
							variant: "outline",
							children: e
						}, e)),
						e.mobileWarning && /* @__PURE__ */ (0, X.jsx)(Sm, {
							variant: "outline",
							children: "Melhor com teclado"
						}),
						e.trending && /* @__PURE__ */ (0, X.jsxs)(Sm, {
							variant: "outline",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, X.jsx)(se, { className: "size-3" }), "Em alta"]
						})
					]
				}),
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "flex min-w-0 items-start gap-2",
					children: [/* @__PURE__ */ (0, X.jsx)("h2", {
						className: "min-w-0 flex-1 text-base font-semibold leading-5 tracking-tight",
						children: e.name
					}), /* @__PURE__ */ (0, X.jsx)(Sm, {
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
						/* @__PURE__ */ (0, X.jsxs)(Z, {
							className: "action min-w-0 flex-1",
							type: "button",
							disabled: !0,
							onClick: e.onAction,
							children: [e.type === "external-download" ? /* @__PURE__ */ (0, X.jsx)(ne, {}) : e.type === "remote" ? /* @__PURE__ */ (0, X.jsx)(Fe, {}) : /* @__PURE__ */ (0, X.jsx)(Ne, {}), /* @__PURE__ */ (0, X.jsx)("span", {
								"data-action-label": !0,
								children: "Verificando…"
							})]
						}),
						e.relayUrl && /* @__PURE__ */ (0, X.jsx)(Z, {
							className: "credits",
							variant: "outline",
							type: "button",
							title: e.relaySupport || "Relay multiplayer",
							onClick: e.onRelay,
							children: "Copiar relay"
						}),
						e.hasCredits && /* @__PURE__ */ (0, X.jsxs)(Z, {
							className: "credits",
							variant: "outline",
							type: "button",
							onClick: e.onCredits,
							children: [/* @__PURE__ */ (0, X.jsx)(V, {}), "Créditos"]
						}),
						/* @__PURE__ */ (0, X.jsx)(Z, {
							className: "remove",
							variant: "destructive",
							size: "icon",
							type: "button",
							title: "Apagar jogo do cache",
							"aria-label": `Apagar ${e.name} do cache`,
							hidden: !0,
							onClick: e.onRemove,
							children: /* @__PURE__ */ (0, X.jsx)(tt, {})
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
// src/components/client/catalog-toolbar.tsx
function Y_({ count: e, categories: t, onBack: n, onQueryChange: r, onFilterChange: i }) {
	let [a, o] = (0, x.useState)("all"), s = [
		{
			id: "all",
			label: "Todos",
			icon: de
		},
		{
			id: "trending",
			label: "Em alta",
			icon: se
		},
		{
			id: "flash",
			label: "Flash",
			icon: dt
		},
		{
			id: "pc",
			label: "PC",
			icon: null
		},
		{
			id: "mobile",
			label: "Celular",
			icon: Ze
		},
		...t.map((e) => ({
			id: `category:${e}`,
			label: e,
			icon: null
		}))
	];
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "mx-auto grid w-full max-w-[1180px] gap-5 px-4 pb-5 pt-5 sm:px-6 sm:pt-7",
		children: [/* @__PURE__ */ (0, X.jsxs)("header", {
			className: "flex min-w-0 flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, X.jsx)(Z, {
					variant: "outline",
					size: "icon",
					"aria-label": "Voltar ao OrganizeOn",
					onClick: n,
					children: /* @__PURE__ */ (0, X.jsx)(D, {})
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
					children: [/* @__PURE__ */ (0, X.jsx)(Ve, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, X.jsx)(xh, {
						className: "pl-9",
						type: "search",
						"aria-label": "Pesquisar jogos",
						placeholder: `Pesquisar em ${e || "…"} jogos`,
						onChange: (e) => r(e.target.value)
					})]
				})
			]
		}), /* @__PURE__ */ (0, X.jsx)(l_, {
			value: a,
			onValueChange: (e) => {
				let t = e || "all";
				o(t), i(t);
			},
			children: /* @__PURE__ */ (0, X.jsx)(d_, {
				"aria-label": "Filtrar jogos",
				className: "h-auto max-w-full justify-start gap-1 overflow-x-auto bg-transparent p-0",
				children: s.map(({ id: e, label: t, icon: n }) => /* @__PURE__ */ (0, X.jsxs)(f_, {
					value: e,
					className: "min-h-8 shrink-0 gap-1.5 border border-transparent px-2.5 text-xs data-[active]:border-border data-[active]:bg-muted data-[active]:text-foreground",
					children: [n && /* @__PURE__ */ (0, X.jsx)(n, { className: "size-3.5" }), t]
				}, e))
			})
		})]
	});
}
// src/components/client/game-dialogs.tsx
function X_({ title: e, description: t, confirmLabel: n = "Continuar", onCancel: r, onConfirm: i }) {
	return /* @__PURE__ */ (0, X.jsx)(Xm, {
		open: !0,
		onOpenChange: (e) => !e && r(),
		children: /* @__PURE__ */ (0, X.jsxs)($m, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, X.jsxs)(eh, { children: [
				/* @__PURE__ */ (0, X.jsx)("div", {
					className: "grid size-9 place-items-center rounded-md border bg-muted",
					children: /* @__PURE__ */ (0, X.jsx)(rt, { className: "size-4 text-muted-foreground" })
				}),
				/* @__PURE__ */ (0, X.jsx)(nh, { children: e }),
				/* @__PURE__ */ (0, X.jsx)(rh, { children: t })
			] }), /* @__PURE__ */ (0, X.jsxs)(th, { children: [/* @__PURE__ */ (0, X.jsx)(Z, {
				variant: "outline",
				onClick: r,
				children: "Cancelar"
			}), /* @__PURE__ */ (0, X.jsx)(Z, {
				onClick: i,
				children: n
			})] })]
		})
	});
}
function Z_({ game: e, onClose: t }) {
	return /* @__PURE__ */ (0, X.jsx)(Xm, {
		open: !0,
		onOpenChange: (e) => !e && t(),
		children: /* @__PURE__ */ (0, X.jsxs)($m, {
			className: "max-h-[85svh] overflow-y-auto sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(eh, { children: [/* @__PURE__ */ (0, X.jsxs)(nh, { children: ["Créditos · ", e.name] }), /* @__PURE__ */ (0, X.jsx)(rh, { children: "Créditos e licença deste jogo." })] }),
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
				/* @__PURE__ */ (0, X.jsx)(th, { children: /* @__PURE__ */ (0, X.jsx)(Z, {
					onClick: t,
					children: "Fechar"
				}) })
			]
		})
	});
}
function Q_({ name: e, definitions: t, selectedKeys: n, defaultKeys: r, isTetris: i, initialLeftHanded: a, onClose: o, onSave: s, onFullscreen: c }) {
	let [l, u] = (0, x.useState)(() => new Set(n)), [d, f] = (0, x.useState)(a);
	function p(e, t) {
		u((n) => {
			let r = new Set(n);
			return t ? r.add(e) : r.delete(e), r;
		});
	}
	function m() {
		u(new Set(r)), f(!1);
	}
	return /* @__PURE__ */ (0, X.jsx)(Xm, {
		open: !0,
		onOpenChange: (e) => !e && o(),
		children: /* @__PURE__ */ (0, X.jsxs)($m, {
			className: "max-h-[min(85svh,720px)] overflow-y-auto sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(eh, { children: [/* @__PURE__ */ (0, X.jsxs)(nh, { children: ["Teclas · ", e] }), /* @__PURE__ */ (0, X.jsx)(rh, { children: "Ative as teclas usadas pelo jogo. A seleção fica salva neste aparelho." })] }),
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
						/* @__PURE__ */ (0, X.jsxs)(Z, {
							variant: "outline",
							onClick: c,
							children: [/* @__PURE__ */ (0, X.jsx)(xe, {}), "Tela cheia"]
						})
					]
				}),
				/* @__PURE__ */ (0, X.jsxs)(th, {
					className: "flex-col-reverse sm:flex-row",
					children: [/* @__PURE__ */ (0, X.jsxs)(Z, {
						type: "button",
						variant: "outline",
						onClick: m,
						children: [/* @__PURE__ */ (0, X.jsx)(ze, {}), "Restaurar padrão"]
					}), /* @__PURE__ */ (0, X.jsx)(Z, {
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
function $_({ title: e, description: t, label: n, value: r, options: i, applyLabel: a = "Aplicar", onApply: o }) {
	let [s, c] = (0, x.useState)(r), l = s !== r, u = i.find((e) => e.value === s)?.description;
	return /* @__PURE__ */ (0, X.jsxs)(Cm, {
		className: "w-full animate-ui-enter",
		children: [/* @__PURE__ */ (0, X.jsxs)(wm, {
			className: "gap-1.5 pb-0 sm:flex sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, X.jsx)(Tm, { children: e }), /* @__PURE__ */ (0, X.jsx)(Em, {
					className: "mt-1 max-w-3xl leading-relaxed",
					children: t
				})]
			}), /* @__PURE__ */ (0, X.jsxs)("div", {
				className: "grid w-full gap-2 sm:w-auto sm:min-w-52 sm:grid-cols-[minmax(9rem,1fr)_auto]",
				children: [/* @__PURE__ */ (0, X.jsxs)(kg, {
					value: s,
					onValueChange: (e) => e && c(e),
					children: [/* @__PURE__ */ (0, X.jsx)(jg, {
						"aria-label": n,
						className: "h-9 w-full",
						children: /* @__PURE__ */ (0, X.jsx)(Ag, {})
					}), /* @__PURE__ */ (0, X.jsx)(Mg, { children: i.map((e) => /* @__PURE__ */ (0, X.jsx)(Ng, {
						value: e.value,
						children: e.label
					}, e.value)) })]
				}), /* @__PURE__ */ (0, X.jsxs)(Z, {
					size: "sm",
					disabled: !l,
					onClick: () => o(s),
					children: [l ? /* @__PURE__ */ (0, X.jsx)(k, { "data-icon": "inline-start" }) : null, a]
				})]
			})]
		}), u ? /* @__PURE__ */ (0, X.jsx)(Dm, {
			className: "pt-2 text-xs text-muted-foreground",
			children: u
		}) : null]
	});
}
// src/components/client/d2-login.tsx
function ev({ onSubmit: e }) {
	let [t, n] = (0, x.useState)(""), [r, i] = (0, x.useState)(""), [a, o] = (0, x.useState)(""), [s, c] = (0, x.useState)(!1);
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
		children: /* @__PURE__ */ (0, X.jsxs)(Cm, {
			className: "w-full max-w-[380px] border-border bg-card shadow-none animate-ui-enter",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(wm, {
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
						children: [/* @__PURE__ */ (0, X.jsx)(Tm, {
							className: "text-xl",
							children: "Entrar no painel"
						}), /* @__PURE__ */ (0, X.jsx)(Em, { children: "Autentique-se para acessar o conteúdo do Endpoint 2." })]
					})]
				}),
				/* @__PURE__ */ (0, X.jsx)(Dm, { children: /* @__PURE__ */ (0, X.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: (e) => void l(e),
					children: [
						/* @__PURE__ */ (0, X.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Usuário", /* @__PURE__ */ (0, X.jsx)(xh, {
								autoComplete: "username",
								value: t,
								onChange: (e) => n(e.target.value),
								required: !0,
								disabled: s
							})]
						}),
						/* @__PURE__ */ (0, X.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Senha", /* @__PURE__ */ (0, X.jsx)(xh, {
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
						/* @__PURE__ */ (0, X.jsxs)(Z, {
							type: "submit",
							className: "h-10 w-full",
							disabled: s || !t || !r,
							children: [s && /* @__PURE__ */ (0, X.jsx)(_e, { className: "animate-spin" }), s ? "Entrando…" : "Entrar"]
						})
					]
				}) }),
				/* @__PURE__ */ (0, X.jsxs)(Om, {
					className: "gap-2 border-t border-border pt-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, X.jsx)(Ge, { className: "size-4" }), "Acesse com sua conta OrganizeOn."]
				})
			]
		})
	});
}
// src/hooks/use-service-theme.ts
function tv(e) {
	let t = (0, x.useRef)(null), [n, r] = (0, x.useState)(() => {
		try {
			return localStorage.getItem(e) === "light" ? "light" : "dark";
		} catch {
			return "dark";
		}
	});
	return (0, x.useLayoutEffect)(() => {
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
var nv = 768;
function rv() {
	let [e, t] = x.useState(void 0);
	return x.useEffect(() => {
		let e = window.matchMedia("(max-width: 767px)"), n = () => {
			t(window.innerWidth < nv);
		};
		return e.addEventListener("change", n), t(window.innerWidth < nv), () => e.removeEventListener("change", n);
	}, []), !!e;
}
// src/components/ui/separator.tsx
function iv({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)($p, {
		"data-slot": "separator",
		orientation: t,
		className: Y("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", e),
		...n
	});
}
// src/components/ui/sidebar.tsx
var av = "sidebar_state", ov = 604800, sv = "16rem", cv = "18rem", lv = "3rem", uv = "b", dv = x.createContext(null);
function fv() {
	let e = x.useContext(dv);
	if (!e) throw Error("useSidebar must be used within a SidebarProvider.");
	return e;
}
function pv({ defaultOpen: e = !0, open: t, onOpenChange: n, className: r, style: i, children: a, ...o }) {
	let s = rv(), [c, l] = x.useState(!1), [u, d] = x.useState(e), f = t ?? u, p = x.useCallback((e) => {
		let t = typeof e == "function" ? e(f) : e;
		n ? n(t) : d(t), document.cookie = `${av}=${t}; path=/; max-age=${ov}`;
	}, [n, f]), m = x.useCallback(() => s ? l((e) => !e) : p((e) => !e), [
		s,
		p,
		l
	]);
	x.useEffect(() => {
		let e = (e) => {
			e.key === uv && (e.metaKey || e.ctrlKey) && (e.preventDefault(), m());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [m]);
	let h = f ? "expanded" : "collapsed", g = x.useMemo(() => ({
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
	return /* @__PURE__ */ (0, X.jsx)(dv.Provider, {
		value: g,
		children: /* @__PURE__ */ (0, X.jsx)("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": sv,
				"--sidebar-width-icon": lv,
				...i
			},
			className: Y("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", r),
			...o,
			children: a
		})
	});
}
function mv({ side: e = "left", variant: t = "sidebar", collapsible: n = "offcanvas", className: r, children: i, dir: a, ...o }) {
	let { isMobile: s, state: c, openMobile: l, setOpenMobile: u } = fv();
	return n === "none" ? /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar",
		className: Y("flex h-full w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground", r),
		...o,
		children: i
	}) : s ? /* @__PURE__ */ (0, X.jsx)(Ig, {
		open: l,
		onOpenChange: u,
		...o,
		children: /* @__PURE__ */ (0, X.jsxs)(Bg, {
			dir: a,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-[var(--sidebar-width)] bg-sidebar p-0 text-sidebar-foreground",
			style: { "--sidebar-width": cv },
			side: e,
			children: [/* @__PURE__ */ (0, X.jsxs)(Vg, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, X.jsx)(Hg, { children: "Navegação" }), /* @__PURE__ */ (0, X.jsx)(Ug, { children: "Navegue entre as páginas da aplicação." })]
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
			className: Y("relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon) + 1rem)]" : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]")
		}), /* @__PURE__ */ (0, X.jsx)("div", {
			"data-slot": "sidebar-container",
			"data-side": e,
			className: Y("fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", t === "floating" || t === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon) + 1rem + 2px)]" : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l", r),
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
function hv({ className: e, onClick: t, ...n }) {
	let { toggleSidebar: r } = fv();
	return /* @__PURE__ */ (0, X.jsxs)(Z, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon-sm",
		className: Y(e),
		onClick: (e) => {
			t?.(e), r();
		},
		...n,
		children: [/* @__PURE__ */ (0, X.jsx)(ke, {}), /* @__PURE__ */ (0, X.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function gv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("main", {
		"data-slot": "sidebar-inset",
		className: Y("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", e),
		...t
	});
}
function _v({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: Y("flex flex-col gap-2 p-2", e),
		...t
	});
}
function vv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: Y("flex flex-col gap-2 p-2", e),
		...t
	});
}
function yv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(iv, {
		"data-slot": "sidebar-separator",
		"data-sidebar": "separator",
		className: Y("mx-2 w-auto bg-sidebar-border", e),
		...t
	});
}
function bv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: Y("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", e),
		...t
	});
}
function xv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: Y("relative flex w-full min-w-0 flex-col p-2", e),
		...t
	});
}
function Sv({ className: e, render: t, ...n }) {
	return bm({
		defaultTagName: "div",
		props: Kt({ className: Y("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-none transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", e) }, n),
		render: t,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label"
		}
	});
}
function Cv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: Y("flex w-full min-w-0 flex-col gap-0", e),
		...t
	});
}
function wv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: Y("group/menu-item relative", e),
		...t
	});
}
var Tv = Un("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-none transition-[width,height,padding] group-has-[data-sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
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
function Ev({ render: e, isActive: t = !1, variant: n = "default", size: r = "default", tooltip: i, className: a, ...o }) {
	let { isMobile: s, state: c } = fv(), l = bm({
		defaultTagName: "button",
		props: Kt({ className: Y(Tv({
			variant: n,
			size: r
		}), a) }, o),
		render: i ? /* @__PURE__ */ (0, X.jsx)(K_, { render: e }) : e,
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size: r,
			active: t
		}
	});
	return i ? (typeof i == "string" && (i = { children: i }), /* @__PURE__ */ (0, X.jsxs)(G_, { children: [l, /* @__PURE__ */ (0, X.jsx)(q_, {
		side: "right",
		align: "center",
		hidden: c !== "collapsed" || s,
		...i
	})] })) : l;
}
// src/components/layout/rotating-icon.tsx
function Dv({ icon: e, active: t }) {
	let [n, r] = (0, x.useState)(t);
	return (0, x.useEffect)(() => {
		t && r(!0);
	}, [t]), /* @__PURE__ */ (0, X.jsx)(e, {
		"aria-hidden": "true",
		className: n ? "motion-safe:animate-spin" : void 0,
		onAnimationIteration: () => {
			t || r(!1);
		}
	});
}
// src/components/layout/service-shell.tsx
var Ov = {
	owner: "Owner",
	ultra_admin: "Ultra admin",
	super_admin: "Super admin",
	admin: "Admin",
	user: "Usuário"
};
function kv() {
	let { setOpenMobile: e } = fv();
	return /* @__PURE__ */ (0, X.jsx)(Cv, { children: /* @__PURE__ */ (0, X.jsx)(wv, { children: /* @__PURE__ */ (0, X.jsxs)(Ev, {
		isActive: !0,
		tooltip: "Meus arquivos",
		onClick: () => e(!1),
		children: [/* @__PURE__ */ (0, X.jsx)(H, {}), /* @__PURE__ */ (0, X.jsx)("span", { children: "Meus arquivos" })]
	}) }) });
}
function Av({ children: e, username: t, role: n, logout: r, refresh: i, refreshing: a }) {
	let { rootRef: o, theme: s, toggleTheme: c } = tv("d2-theme");
	return /* @__PURE__ */ (0, X.jsx)("div", {
		ref: o,
		className: "contents",
		children: /* @__PURE__ */ (0, X.jsx)(W_, { children: /* @__PURE__ */ (0, X.jsxs)(pv, {
			defaultOpen: !0,
			children: [/* @__PURE__ */ (0, X.jsxs)(mv, {
				collapsible: "icon",
				children: [
					/* @__PURE__ */ (0, X.jsx)(_v, {
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
					/* @__PURE__ */ (0, X.jsx)(yv, {}),
					/* @__PURE__ */ (0, X.jsx)(bv, { children: /* @__PURE__ */ (0, X.jsxs)(xv, { children: [/* @__PURE__ */ (0, X.jsx)(Sv, { children: "Workspace" }), /* @__PURE__ */ (0, X.jsx)(kv, {})] }) }),
					/* @__PURE__ */ (0, X.jsx)(vv, {
						className: "px-2 pb-3",
						children: /* @__PURE__ */ (0, X.jsxs)(pm, { children: [/* @__PURE__ */ (0, X.jsxs)(mm, {
							render: /* @__PURE__ */ (0, X.jsx)(Ev, {
								size: "lg",
								className: "h-12 justify-start",
								"aria-label": `Perfil de ${t}`
							}),
							children: [
								/* @__PURE__ */ (0, X.jsx)("span", {
									className: "grid size-8 shrink-0 place-items-center rounded-md border border-sidebar-border bg-sidebar-accent text-sidebar-foreground",
									children: /* @__PURE__ */ (0, X.jsx)(st, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, X.jsxs)("span", {
									className: "grid min-w-0 flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden",
									children: [/* @__PURE__ */ (0, X.jsx)("span", {
										className: "truncate font-medium",
										children: t
									}), /* @__PURE__ */ (0, X.jsx)("span", {
										className: "truncate text-muted-foreground",
										children: Ov[n] || n
									})]
								}),
								/* @__PURE__ */ (0, X.jsx)(N, { className: "ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" })
							]
						}), /* @__PURE__ */ (0, X.jsxs)(hm, {
							side: "top",
							align: "start",
							className: "w-64",
							children: [
								/* @__PURE__ */ (0, X.jsx)(gm, { children: /* @__PURE__ */ (0, X.jsx)(_m, {
									className: "px-2 py-2",
									children: /* @__PURE__ */ (0, X.jsxs)("span", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, X.jsx)("span", {
											className: "grid size-8 place-items-center rounded-md border border-border bg-muted",
											children: /* @__PURE__ */ (0, X.jsx)(L, { className: "size-4" })
										}), /* @__PURE__ */ (0, X.jsxs)("span", {
											className: "grid min-w-0",
											children: [/* @__PURE__ */ (0, X.jsx)("span", {
												className: "truncate text-sm font-medium text-foreground",
												children: t
											}), /* @__PURE__ */ (0, X.jsx)("span", {
												className: "truncate text-xs text-muted-foreground",
												children: Ov[n] || n
											})]
										})]
									})
								}) }),
								/* @__PURE__ */ (0, X.jsx)(ym, {}),
								/* @__PURE__ */ (0, X.jsxs)(vm, {
									onClick: r,
									className: "text-destructive",
									children: [/* @__PURE__ */ (0, X.jsx)(ye, {}), "Sair da conta"]
								})
							]
						})] })
					})
				]
			}), /* @__PURE__ */ (0, X.jsxs)(gv, {
				className: "min-h-svh min-w-0",
				children: [/* @__PURE__ */ (0, X.jsxs)("header", {
					className: "sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, X.jsx)(hv, { "aria-label": "Abrir ou recolher navegação" }),
						/* @__PURE__ */ (0, X.jsx)("span", {
							className: "flex-1 text-sm font-medium",
							children: "Meus arquivos"
						}),
						/* @__PURE__ */ (0, X.jsx)(Z, {
							variant: "ghost",
							size: "icon",
							onClick: c,
							"aria-label": s === "dark" ? "Ativar tema claro" : "Ativar tema escuro",
							children: s === "dark" ? /* @__PURE__ */ (0, X.jsx)($e, {}) : /* @__PURE__ */ (0, X.jsx)(Te, {})
						}),
						/* @__PURE__ */ (0, X.jsx)(Z, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Atualizar",
							disabled: a,
							onClick: i,
							children: /* @__PURE__ */ (0, X.jsx)(Dv, {
								icon: Le,
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
// src/components/client/d2-dashboard.tsx
function jv({ username: e, role: t, request: n, upload: r, logout: i }) {
	let a = (0, x.useRef)(null), [o, s] = (0, x.useState)([]), [c, l] = (0, x.useState)(null), [u, d] = (0, x.useState)(null), [f, p] = (0, x.useState)(""), [m, h] = (0, x.useState)(!1), [g, _] = (0, x.useState)(null), [v, y] = (0, x.useState)(null);
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
	(0, x.useEffect)(() => {
		b();
	}, []);
	async function S() {
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
	async function C(e) {
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
	async function w(e) {
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
	async function T(e) {
		try {
			await n(`/files/${encodeURIComponent(e.id)}`, { method: "DELETE" }), y(null), await b();
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
	return /* @__PURE__ */ (0, X.jsxs)(Av, {
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
			/* @__PURE__ */ (0, X.jsxs)(Cm, { children: [/* @__PURE__ */ (0, X.jsxs)(wm, { children: [/* @__PURE__ */ (0, X.jsx)(Tm, { children: "Adicionar arquivo" }), /* @__PURE__ */ (0, X.jsx)(Em, { children: "Selecione um arquivo ou crie um texto." })] }), /* @__PURE__ */ (0, X.jsxs)(Dm, {
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
						children: [/* @__PURE__ */ (0, X.jsxs)(Z, {
							variant: "outline",
							onClick: () => a.current?.click(),
							disabled: u !== null,
							children: [/* @__PURE__ */ (0, X.jsx)(le, {}), "Selecionar arquivo"]
						}), /* @__PURE__ */ (0, X.jsx)("span", {
							className: "w-full min-w-0 break-words text-sm text-muted-foreground sm:w-auto sm:flex-1",
							children: c?.name || "Nenhum arquivo selecionado"
						})]
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, X.jsxs)(Z, {
							disabled: !c || u !== null,
							onClick: () => void S(),
							children: [/* @__PURE__ */ (0, X.jsx)(at, {}), "Enviar arquivo"]
						}), /* @__PURE__ */ (0, X.jsxs)(Z, {
							variant: "outline",
							onClick: () => _({
								name: "script.txt",
								content: ""
							}),
							children: [/* @__PURE__ */ (0, X.jsx)(ie, {}), "Novo texto"]
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
			g && /* @__PURE__ */ (0, X.jsxs)(Cm, { children: [/* @__PURE__ */ (0, X.jsx)(wm, { children: /* @__PURE__ */ (0, X.jsx)(Tm, { children: g.id ? "Editar texto" : "Novo texto" }) }), /* @__PURE__ */ (0, X.jsx)(Dm, { children: /* @__PURE__ */ (0, X.jsxs)("form", {
				className: "grid gap-3",
				onSubmit: (e) => void w(e),
				children: [
					/* @__PURE__ */ (0, X.jsx)(xh, {
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
						children: [/* @__PURE__ */ (0, X.jsx)(Z, {
							type: "submit",
							children: "Salvar texto"
						}), /* @__PURE__ */ (0, X.jsx)(Z, {
							type: "button",
							variant: "outline",
							onClick: () => _(null),
							children: "Fechar"
						})]
					})
				]
			}) })] }),
			/* @__PURE__ */ (0, X.jsxs)(Cm, { children: [/* @__PURE__ */ (0, X.jsxs)(wm, { children: [/* @__PURE__ */ (0, X.jsx)(Tm, { children: "Arquivos" }), /* @__PURE__ */ (0, X.jsx)(Em, { children: o.length ? `${o.length} arquivo(s)` : "Nenhum arquivo ainda." })] }), /* @__PURE__ */ (0, X.jsx)(Dm, {
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
							e.contentType?.startsWith("text/") && /* @__PURE__ */ (0, X.jsxs)(Z, {
								variant: "outline",
								size: "sm",
								onClick: () => void C(e),
								children: [/* @__PURE__ */ (0, X.jsx)(je, {}), "Editar"]
							}),
							/* @__PURE__ */ (0, X.jsxs)(Z, {
								variant: "outline",
								size: "sm",
								onClick: () => void E(e),
								children: [/* @__PURE__ */ (0, X.jsx)(B, {}), "Copiar link"]
							}),
							/* @__PURE__ */ (0, X.jsxs)(Z, {
								variant: "destructive",
								size: "sm",
								onClick: () => y(e),
								children: [/* @__PURE__ */ (0, X.jsx)(tt, {}), "Apagar"]
							})
						]
					})]
				}, e.id))
			})] }),
			/* @__PURE__ */ (0, X.jsx)(Xm, {
				open: !!v,
				onOpenChange: (e) => {
					e || y(null);
				},
				children: /* @__PURE__ */ (0, X.jsxs)($m, { children: [/* @__PURE__ */ (0, X.jsxs)(eh, { children: [/* @__PURE__ */ (0, X.jsx)(nh, { children: "Apagar arquivo?" }), /* @__PURE__ */ (0, X.jsx)(rh, { children: v?.name })] }), /* @__PURE__ */ (0, X.jsxs)(th, { children: [/* @__PURE__ */ (0, X.jsx)(Z, {
					variant: "outline",
					onClick: () => y(null),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, X.jsx)(Z, {
					variant: "destructive",
					onClick: () => {
						v && T(v);
					},
					children: "Apagar"
				})] })] })
			})
		]
	});
}
// src/client/bridge.tsx
var Mv = /* @__PURE__ */ new WeakMap(), Nv = /* @__PURE__ */ new WeakMap(), Pv = /* @__PURE__ */ new WeakMap();
function Fv(e, t) {
	let n = t?.getRootNode(), r = n instanceof ShadowRoot ? n : document;
	if (r.querySelector("link[data-organizeon-ui=\"client\"]")) return;
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = e, i.dataset.organizeonUi = "client", r instanceof ShadowRoot ? r.append(i) : document.head.append(i);
}
function Iv(e, t, n) {
	Nv.get(e)?.unmount(), Fv(n, e);
	let r = (0, Ci.createRoot)(e);
	(0, wi.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui dark min-h-full",
		children: /* @__PURE__ */ (0, X.jsx)(J_, { game: t })
	}))), Nv.set(e, r);
}
function Lv(e) {
	Nv.get(e)?.unmount(), Nv.delete(e);
}
function Rv(e, t, n) {
	Fv(n, e);
	let r = (0, Ci.createRoot)(e), i = (e) => (0, wi.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui organizeon-inline-ui dark",
		children: /* @__PURE__ */ (0, X.jsx)(Y_, { ...e })
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
function zv(e, t, n) {
	Pv.get(e)?.unmount(), Fv(n, e);
	let r = (0, Ci.createRoot)(e);
	(0, wi.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui organizeon-inline-ui dark",
		children: /* @__PURE__ */ (0, X.jsx)($_, { ...t })
	}))), Pv.set(e, r);
}
function Bv(e) {
	Pv.get(e)?.unmount(), Pv.delete(e);
}
function Vv(e, t, n) {
	e.classList.add("organizeon-ui", "organizeon-overlay-root", "dark"), Fv(n, e);
	let r = (0, Ci.createRoot)(e);
	return (0, wi.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui dark",
		children: /* @__PURE__ */ (0, X.jsx)(dm, {
			container: e,
			children: t
		})
	}))), () => r.unmount();
}
function Hv(e, t, n, r) {
	return Vv(e, /* @__PURE__ */ (0, X.jsx)(Z_, {
		game: t,
		onClose: n
	}), r);
}
function Uv(e, t, n) {
	return Vv(e, /* @__PURE__ */ (0, X.jsx)(Q_, { ...t }), n);
}
function Wv(e, t, n = "Confirmar ação", r = "Continuar") {
	return new Promise((i) => {
		let a = document.createElement("div");
		a.className = "organizeon-ui dark", document.body.append(a), Fv(t, a);
		let o = (0, Ci.createRoot)(a), s = !1, c = (e) => {
			s || (s = !0, o.unmount(), a.remove(), i(e));
		};
		(0, wi.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(dm, {
			container: a,
			children: /* @__PURE__ */ (0, X.jsx)(X_, {
				title: n,
				description: e,
				confirmLabel: r,
				onCancel: () => c(!1),
				onConfirm: () => c(!0)
			})
		})));
	});
}
function Gv(e, t, n) {
	Mv.get(e)?.root.unmount();
	let r = e.shadowRoot ?? e.attachShadow({ mode: "open" });
	r.replaceChildren();
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = n, r.append(i);
	let a = document.createElement("div");
	a.className = t.type === "account" ? "organizeon-ui organizeon-overlay-root dark" : "organizeon-ui dark", r.append(a);
	let o = (0, Ci.createRoot)(a);
	return o.render(/* @__PURE__ */ (0, X.jsx)(dm, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(W_, { children: /* @__PURE__ */ (0, X.jsx)(b_, { ...t }) })
	})), Mv.set(e, {
		root: o,
		shadow: r,
		container: a
	}), () => {
		let t = Mv.get(e);
		t && (t.root.unmount(), t.shadow.replaceChildren(), Mv.delete(e));
	};
}
function Kv(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui organizeon-overlay-root dark", r.append(i, a);
	let o = (0, Ci.createRoot)(a);
	return (0, wi.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(dm, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(b_, { ...t })
	}))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function qv(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui dark", r.append(i, a);
	let o = (0, Ci.createRoot)(a);
	return (0, wi.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(ev, { onSubmit: t }))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function Jv(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui dark", r.append(i, a);
	let o = (0, Ci.createRoot)(a);
	return (0, wi.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(dm, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(jv, { ...t })
	}))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function Yv(e, t) {
	Mv.get(e)?.root.unmount();
	let n = e.shadowRoot ?? e.attachShadow({ mode: "open" });
	n.replaceChildren();
	let r = document.createElement("link");
	r.rel = "stylesheet", r.href = t, n.append(r);
	let i = document.createElement("div");
	i.className = "organizeon-ui organizeon-overlay-root dark", n.append(i);
	let a = (0, Ci.createRoot)(i);
	return a.render(/* @__PURE__ */ (0, X.jsx)(dm, {
		container: i,
		children: /* @__PURE__ */ (0, X.jsx)(ra, {
			position: "bottom-right",
			theme: "dark",
			closeButton: !0,
			richColors: !1
		})
	})), Mv.set(e, {
		root: a,
		shadow: n,
		container: i
	}), () => {
		a.unmount(), n.replaceChildren(), Mv.delete(e);
	};
}
function Xv(e, t = "info", n) {
	Vi[t](e, n ? { id: n } : void 0);
}
function Zv(e) {
	Vi.dismiss(e);
}
function Qv(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui dark", r.append(i, a);
	let o = (0, Ci.createRoot)(a), s = (e) => (0, wi.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(dm, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(W_, { children: /* @__PURE__ */ (0, X.jsx)(b_, { ...e }) })
	})));
	return s(t), {
		update: s,
		unmount: () => {
			o.unmount(), r.replaceChildren();
		}
	};
}
function $v(e, t, n, r) {
	Vi.custom((r) => /* @__PURE__ */ (0, X.jsx)(_i, {
		title: e,
		detail: t,
		percent: n,
		onClose: () => Vi.dismiss(r)
	}), {
		id: "connection-status",
		duration: r > 0 ? r : Infinity
	});
}
export { Wv as confirmClientAction, Zv as dismissClientToast, Rv as mountCatalogToolbar, Vv as mountClientDialog, Gv as mountClientSurface, Yv as mountClientToaster, Jv as mountD2Dashboard, qv as mountD2Login, Iv as mountGameCard, Uv as mountGameControlSettingsDialog, Hv as mountGameCreditsDialog, Kv as mountNavigation, zv as mountPreferenceCard, Qv as mountReactiveSurface, Xv as showClientToast, $v as showConnectionToast, Lv as unmountGameCard, Bv as unmountPreferenceCard };
