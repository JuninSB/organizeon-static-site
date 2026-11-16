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
// src/services/account-api.ts
function d(e) {
	return m = e, () => {
		m === e && (m = void 0);
	};
}
function f(e) {
	if (/^\/d[23](\/|$)/.test(location.pathname)) {
		let t = location.pathname.slice(0, 3) + "/api";
		if (e.startsWith("/account/")) return t + e.slice(8);
		if (e === "/dm" || e.startsWith("/dm/")) return t + e;
	}
	let t = window.__ORGANIZEON_CONFIG__;
	return (t?.apiOrigin || "https://api.organizeon.com.br") + (t?.apiPrefix || "/827e7h3heuw823eh") + e;
}
async function p(e, t = {}) {
	let n = new Headers(t.headers);
	if (n.set("Accept", "application/json"), t.body && n.set("Content-Type", "application/json"), m) try {
		return await m(e, {
			...t,
			headers: n
		});
	} catch (e) {
		if (e instanceof g) throw e;
		let t = e instanceof Error ? e.message : "";
		throw h[t] ? new g(t === "unauthorized" ? 401 : 400, t) : /sessão expirada/i.test(t) ? new g(401, "unauthorized") : new g(0, "network_error");
	}
	let r = localStorage.getItem("organizeon-access-token");
	r && !/^\/d[23](\/|$)/.test(location.pathname) && n.set("Authorization", "Bearer " + r);
	let i;
	try {
		i = await fetch(f(e), {
			...t,
			headers: n,
			signal: t.signal || AbortSignal.timeout(15e3),
			credentials: "include",
			cache: "no-store"
		});
	} catch {
		throw new g(0, "network_error");
	}
	let a = await i.json().catch(() => null);
	if (!i.ok) throw new g(i.status, a?.error || "request_failed");
	if (a === null) throw new g(i.status, "invalid_response");
	return a;
}
var m, h, g, _ = o((() => {
	h = {
		unauthorized: "Sua sessão expirou. Entre novamente.",
		authentication_required: "Sua sessão expirou. Entre novamente.",
		invalid_profile: "Confira o nome, a descrição e a foto do perfil.",
		invalid_current_password: "A senha atual está incorreta.",
		invalid_password: "A nova senha deve ter pelo menos 8 caracteres.",
		password_confirmation_mismatch: "As novas senhas não coincidem.",
		too_many_attempts: "Muitas tentativas. Aguarde antes de tentar novamente.",
		request_too_large: "O arquivo excede o tamanho permitido.",
		dm_user_not_found: "Conta não encontrada. Confira o @usuário.",
		dm_self_request: "Escolha outra conta para iniciar uma conversa.",
		dm_request_pending: "Aguarde a solicitação ser aceita.",
		dm_request_processed: "Esta solicitação já foi respondida.",
		dm_request_cooldown: "Aguarde 24 horas para enviar outra solicitação a esta conta.",
		dm_sending_unavailable: "Esta conversa não está disponível para envio.",
		dm_conversation_not_found: "Conversa não encontrada.",
		dm_message_not_found: "Esta mensagem não está mais disponível.",
		dm_rate_limited: "Aguarde um momento antes de tentar novamente.",
		dm_file_too_large: "Cada arquivo pode ter até 8 MB.",
		dm_media_quota: "Você atingiu o limite de mídia das DMs.",
		dm_storage_full: "O armazenamento de mídia está cheio.",
		dm_invalid_message: "Confira o texto e os anexos da mensagem.",
		dm_invalid_attachment: "Não foi possível usar este anexo.",
		dm_empty_message: "Escreva uma mensagem ou adicione um arquivo.",
		dm_operation_failed: "Não foi possível concluir. Tente novamente.",
		forbidden: "Você não tem acesso a esta ação."
	}, g = class extends Error {
		status;
		code;
		constructor(e, t) {
			super(h[t] || "Não foi possível concluir. Tente novamente."), this.status = e, this.code = t;
		}
	};
}));
// src/lib/style-ready.ts
_();
function v(e, t) {
	let n = !0, r = () => {
		n && t();
	};
	return e.sheet ? r() : e.addEventListener("load", r, { once: !0 }), () => {
		n = !1, e.removeEventListener("load", r);
	};
}
// node_modules/react/cjs/react.production.js
var y = /* @__PURE__ */ s(((e) => {
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
})), b = /* @__PURE__ */ s(((e, t) => {
	t.exports = y();
})), x, S = o((() => {
	x = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}));
// node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function C(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: x(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
var w = o((() => {
	S();
})), T, E = o((() => {
	T = (e) => {
		let t = "", n = !1;
		for (let r of e) r === "-" || r === "_" || r <= " " ? n = t.length > 0 : (t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1);
		return t;
	};
})), D, O = o((() => {
	E(), D = (e) => {
		let t = T(e);
		return t.charAt(0).toUpperCase() + t.slice(1);
	};
})), k, A = o((() => {
	k = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim();
})), j, M = o((() => {
	j = {
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
function N(e) {
	return e != null;
}
function P(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? j.width, a = e.size ?? e.height ?? j.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? k(...c) : k("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? j["stroke-width"]) * Number(e.size ?? e.width ?? j.width) / Number(t.size ?? t.width ?? j.width) : t.strokeWidth ?? j["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(j).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && N(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && N(t.width) && { [r("width")]: t.width },
			..."height" in t && N(t.height) && { [r("height")]: t.height },
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
var F = o((() => {
	M(), A();
}));
// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
function I(e, t = {}) {
	return P(e, {
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
var L = o((() => {
	F();
})), R, ee = o((() => {
	R = (e) => {
		for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
		return !1;
	};
})), z, B, V, te = o((() => {
	z = /* @__PURE__ */ u(b(), 1), B = (0, z.createContext)({}), V = () => (0, z.useContext)(B);
})), ne, H, re = o((() => {
	ne = /* @__PURE__ */ u(b(), 1), A(), L(), ee(), te(), H = (0, ne.forwardRef)(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
		node: l,
		aliases: [],
		size: 24
	}, ...d }, f) => {
		let { size: p = 24, strokeWidth: m = 2, absoluteStrokeWidth: h = !1, nonScalingStroke: g = !1, color: _ = "currentColor", className: v = "" } = V() ?? {}, y = !!c || R(d), [b, x, S = []] = I(u, {
			color: e ?? _,
			width: n ?? t ?? p,
			height: r ?? t ?? p,
			strokeWidth: i ?? m,
			absoluteStrokeWidth: a ?? h,
			nonScalingStroke: o ?? g,
			className: k(v, s),
			hasA11yProp: y,
			attributes: d
		});
		return (0, ne.createElement)(b, {
			ref: f,
			...x
		}, [...S.map(([e, t]) => (0, ne.createElement)(e, t)), ...Array.isArray(c) ? c : [c]]);
	});
}));
// node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function U(e, t = [], n = []) {
	let r = typeof e == "string" ? C(e, t, n) : e, i = (0, ie.forwardRef)(({ className: e, ...t }, n) => (0, ie.createElement)(H, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = D(r.name)), i;
}
var ie, W = o((() => {
	ie = /* @__PURE__ */ u(b(), 1), w(), O(), re();
})), ae, oe, se = o((() => {
	W(), ae = {
		name: "archive",
		size: 24,
		node: [
			["rect", {
				width: "20",
				height: "5",
				x: "2",
				y: "3",
				rx: "1",
				key: "1wp1u1"
			}],
			["path", {
				d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
				key: "1s80jp"
			}],
			["path", {
				d: "M10 12h4",
				key: "a56b0p"
			}]
		]
	}, ae.node, oe = U(ae);
})), ce, le, ue = o((() => {
	W(), ce = {
		name: "arrow-left",
		size: 24,
		node: [["path", {
			d: "m12 19-7-7 7-7",
			key: "1l729n"
		}], ["path", {
			d: "M19 12H5",
			key: "x3x0zl"
		}]]
	}, ce.node, le = U(ce);
})), de, fe, pe = o((() => {
	W(), de = {
		name: "bell-off",
		size: 24,
		node: [
			["path", {
				d: "M10.268 21a2 2 0 0 0 3.464 0",
				key: "vwvbt9"
			}],
			["path", {
				d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
				key: "178tsu"
			}],
			["path", {
				d: "m2 2 20 20",
				key: "1ooewy"
			}],
			["path", {
				d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05",
				key: "1hqiys"
			}]
		]
	}, de.node, fe = U(de);
})), me, he, ge = o((() => {
	W(), me = {
		name: "bell",
		size: 24,
		node: [["path", {
			d: "M10.268 21a2 2 0 0 0 3.464 0",
			key: "vwvbt9"
		}], ["path", {
			d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
			key: "11g9vi"
		}]]
	}, me.node, he = U(me);
})), _e, ve, ye = o((() => {
	W(), _e = {
		name: "bookmark",
		size: 24,
		node: [["path", {
			d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
			key: "oz39mx"
		}]]
	}, _e.node, ve = U(_e);
})), be, xe, Se = o((() => {
	W(), be = {
		name: "check-check",
		size: 24,
		node: [["path", {
			d: "M18 6 7 17l-5-5",
			key: "116fxf"
		}], ["path", {
			d: "m22 10-7.5 7.5L13 16",
			key: "ke71qq"
		}]]
	}, be.node, xe = U(be);
})), Ce, we, Te = o((() => {
	W(), Ce = {
		name: "check",
		size: 24,
		node: [["path", {
			d: "M20 6 9 17l-5-5",
			key: "1gmf2c"
		}]]
	}, Ce.node, we = U(Ce);
})), Ee, De, Oe = o((() => {
	W(), Ee = {
		name: "chevron-down",
		size: 24,
		node: [["path", {
			d: "m6 9 6 6 6-6",
			key: "qrunsl"
		}]]
	}, Ee.node, De = U(Ee);
})), ke, Ae, je = o((() => {
	W(), ke = {
		name: "chevron-up",
		size: 24,
		node: [["path", {
			d: "m18 15-6-6-6 6",
			key: "153udz"
		}]]
	}, ke.node, Ae = U(ke);
})), Me, Ne, Pe = o((() => {
	W(), Me = {
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
	}, Me.node, Ne = U(Me);
})), Fe, Ie, Le = o((() => {
	W(), Fe = {
		name: "cloud",
		size: 24,
		node: [["path", {
			d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
			key: "p7xjir"
		}]]
	}, Fe.node, Ie = U(Fe);
})), Re, ze, Be = o((() => {
	W(), Re = {
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
	}, Re.node, ze = U(Re);
})), Ve, He, Ue = o((() => {
	W(), Ve = {
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
	}, Ve.node, He = U(Ve);
})), We, Ge, Ke = o((() => {
	W(), We = {
		name: "ellipsis",
		size: 24,
		node: [
			["circle", {
				cx: "12",
				cy: "12",
				r: "1",
				key: "41hilf"
			}],
			["circle", {
				cx: "19",
				cy: "12",
				r: "1",
				key: "1wjl8i"
			}],
			["circle", {
				cx: "5",
				cy: "12",
				r: "1",
				key: "1pcz8c"
			}]
		],
		aliases: ["more-horizontal"]
	}, We.node, Ge = U(We);
})), qe, Je, Ye = o((() => {
	W(), qe = {
		name: "face-slightly-smiling",
		size: 24,
		node: [
			["path", {
				d: "M15 10V9",
				key: "4dkmfx"
			}],
			["path", {
				d: "M16.472 15a6 6 0 01-8.943 0",
				key: "7qomzy"
			}],
			["path", {
				d: "M9 10V9",
				key: "1lazqi"
			}],
			["circle", {
				cx: "12",
				cy: "12",
				r: "10",
				key: "1mglay"
			}]
		],
		aliases: ["smile"]
	}, qe.node, Je = U(qe);
})), Xe, Ze, Qe = o((() => {
	W(), Xe = {
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
	}, Xe.node, Ze = U(Xe);
})), $e, et, tt = o((() => {
	W(), $e = {
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
	}, $e.node, et = U($e);
})), nt, rt, it = o((() => {
	W(), nt = {
		name: "file",
		size: 24,
		node: [["path", {
			d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
			key: "1oefj6"
		}], ["path", {
			d: "M14 2v5a1 1 0 0 0 1 1h5",
			key: "wfsgrz"
		}]]
	}, nt.node, rt = U(nt);
})), at, ot, st = o((() => {
	W(), at = {
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
	}, at.node, ot = U(at);
})), ct, lt, ut = o((() => {
	W(), ct = {
		name: "flame",
		size: 24,
		node: [["path", {
			d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
			key: "1slcih"
		}]]
	}, ct.node, lt = U(ct);
})), dt, ft, pt = o((() => {
	W(), dt = {
		name: "folder-open",
		size: 24,
		node: [["path", {
			d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
			key: "usdka0"
		}]]
	}, dt.node, ft = U(dt);
})), mt, ht, gt = o((() => {
	W(), mt = {
		name: "forward",
		size: 24,
		node: [["path", {
			d: "m15 17 5-5-5-5",
			key: "nf172w"
		}], ["path", {
			d: "M4 18v-2a4 4 0 0 1 4-4h12",
			key: "jmiej9"
		}]]
	}, mt.node, ht = U(mt);
})), _t, vt, yt = o((() => {
	W(), _t = {
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
	}, _t.node, vt = U(_t);
})), bt, xt, St = o((() => {
	W(), bt = {
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
	}, bt.node, xt = U(bt);
})), Ct, wt, Tt = o((() => {
	W(), Ct = {
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
	}, Ct.node, wt = U(Ct);
})), Et, Dt, Ot = o((() => {
	W(), Et = {
		name: "inbox",
		size: 24,
		node: [["polyline", {
			points: "22 12 16 12 14 15 10 15 8 12 2 12",
			key: "o97t9d"
		}], ["path", {
			d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
			key: "oot6mr"
		}]]
	}, Et.node, Dt = U(Et);
})), kt, At, jt = o((() => {
	W(), kt = {
		name: "image",
		size: 24,
		node: [
			["rect", {
				width: "18",
				height: "18",
				x: "3",
				y: "3",
				rx: "2",
				ry: "2",
				key: "1m3agn"
			}],
			["circle", {
				cx: "9",
				cy: "9",
				r: "2",
				key: "af1f0g"
			}],
			["path", {
				d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
				key: "1xmnt7"
			}]
		]
	}, kt.node, At = U(kt);
})), Mt, Nt, Pt = o((() => {
	W(), Mt = {
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
	}, Mt.node, Nt = U(Mt);
})), Ft, It, Lt = o((() => {
	W(), Ft = {
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
	}, Ft.node, It = U(Ft);
})), Rt, zt, Bt = o((() => {
	W(), Rt = {
		name: "loader-circle",
		size: 24,
		node: [["path", {
			d: "M21 12a9 9 0 1 1-6.219-8.56",
			key: "13zald"
		}]],
		aliases: ["loader-2"]
	}, Rt.node, zt = U(Rt);
})), Vt, Ht, Ut = o((() => {
	W(), Vt = {
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
	}, Vt.node, Ht = U(Vt);
})), Wt, Gt, Kt = o((() => {
	W(), Wt = {
		name: "mail",
		size: 24,
		node: [["path", {
			d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
			key: "132q7q"
		}], ["rect", {
			x: "2",
			y: "4",
			width: "20",
			height: "16",
			rx: "2",
			key: "izxlao"
		}]]
	}, Wt.node, Gt = U(Wt);
})), qt, Jt, Yt = o((() => {
	W(), qt = {
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
	}, qt.node, Jt = U(qt);
})), Xt, Zt, Qt = o((() => {
	W(), Xt = {
		name: "message-circle-plus",
		size: 24,
		node: [
			["path", {
				d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
				key: "1sd12s"
			}],
			["path", {
				d: "M8 12h8",
				key: "1wcyev"
			}],
			["path", {
				d: "M12 8v8",
				key: "napkw2"
			}]
		]
	}, Xt.node, Zt = U(Xt);
})), $t, en, tn = o((() => {
	W(), $t = {
		name: "message-circle",
		size: 24,
		node: [["path", {
			d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
			key: "1sd12s"
		}]]
	}, $t.node, en = U($t);
})), nn, rn, an = o((() => {
	W(), nn = {
		name: "moon",
		size: 24,
		node: [["path", {
			d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
			key: "kfwtm"
		}]]
	}, nn.node, rn = U(nn);
})), on, sn, cn = o((() => {
	W(), on = {
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
	}, on.node, sn = U(on);
})), ln, un, dn = o((() => {
	W(), ln = {
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
	}, ln.node, un = U(ln);
})), fn, pn, mn = o((() => {
	W(), fn = {
		name: "paperclip",
		size: 24,
		node: [["path", {
			d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
			key: "1miecu"
		}]]
	}, fn.node, pn = U(fn);
})), hn, gn, _n = o((() => {
	W(), hn = {
		name: "pencil",
		size: 24,
		node: [["path", {
			d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
			key: "1a8usu"
		}], ["path", {
			d: "m15 5 4 4",
			key: "1mk7zo"
		}]]
	}, hn.node, gn = U(hn);
})), vn, yn, bn = o((() => {
	W(), vn = {
		name: "pin",
		size: 24,
		node: [["path", {
			d: "M12 17v5",
			key: "bb1du9"
		}], ["path", {
			d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
			key: "1nkz8b"
		}]]
	}, vn.node, yn = U(vn);
})), xn, Sn, Cn = o((() => {
	W(), xn = {
		name: "play",
		size: 24,
		node: [["path", {
			d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
			key: "10ikf1"
		}]]
	}, xn.node, Sn = U(xn);
})), wn, Tn, En = o((() => {
	W(), wn = {
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
	}, wn.node, Tn = U(wn);
})), Dn, On, kn = o((() => {
	W(), Dn = {
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
	}, Dn.node, On = U(Dn);
})), An, jn, Mn = o((() => {
	W(), An = {
		name: "reply",
		size: 24,
		node: [["path", {
			d: "M20 18v-2a4 4 0 0 0-4-4H4",
			key: "5vmcpk"
		}], ["path", {
			d: "m9 17-5-5 5-5",
			key: "nvlc11"
		}]]
	}, An.node, jn = U(An);
})), Nn, Pn, Fn = o((() => {
	W(), Nn = {
		name: "rotate-ccw",
		size: 24,
		node: [["path", {
			d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
			key: "1357e3"
		}], ["path", {
			d: "M3 3v5h5",
			key: "1xhq8a"
		}]]
	}, Nn.node, Pn = U(Nn);
})), In, Ln, Rn = o((() => {
	W(), In = {
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
	}, In.node, Ln = U(In);
})), zn, Bn, Vn = o((() => {
	W(), zn = {
		name: "send",
		size: 24,
		node: [["path", {
			d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
			key: "1ffxy3"
		}], ["path", {
			d: "m21.854 2.147-10.94 10.939",
			key: "12cjpa"
		}]]
	}, zn.node, Bn = U(zn);
})), Hn, Un, Wn = o((() => {
	W(), Hn = {
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
	}, Hn.node, Un = U(Hn);
})), Gn, Kn, qn = o((() => {
	W(), Gn = {
		name: "shield-ban",
		size: 24,
		node: [["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}], ["path", {
			d: "m4.243 5.21 14.39 12.472",
			key: "1c9a7c"
		}]]
	}, Gn.node, Kn = U(Gn);
})), Jn, Yn, Xn = o((() => {
	W(), Jn = {
		name: "shield-check",
		size: 24,
		node: [["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}], ["path", {
			d: "m9 12 2 2 4-4",
			key: "dzmm74"
		}]]
	}, Jn.node, Yn = U(Jn);
})), Zn, Qn, $n = o((() => {
	W(), Zn = {
		name: "shield",
		size: 24,
		node: [["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}]]
	}, Zn.node, Qn = U(Zn);
})), er, tr, nr = o((() => {
	W(), er = {
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
	}, er.node, tr = U(er);
})), rr, ir, ar = o((() => {
	W(), rr = {
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
	}, rr.node, ir = U(rr);
})), or, sr, cr = o((() => {
	W(), or = {
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
	}, or.node, sr = U(or);
})), lr, ur, dr = o((() => {
	W(), lr = {
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
	}, lr.node, ur = U(lr);
})), fr, pr, mr = o((() => {
	W(), fr = {
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
	}, fr.node, pr = U(fr);
})), hr, gr, _r = o((() => {
	W(), hr = {
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
	}, hr.node, gr = U(hr);
})), vr, yr, br = o((() => {
	W(), vr = {
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
	}, vr.node, yr = U(vr);
})), xr, Sr, Cr = o((() => {
	W(), xr = {
		name: "x",
		size: 24,
		node: [["path", {
			d: "M18 6 6 18",
			key: "1bl5f8"
		}], ["path", {
			d: "m6 6 12 12",
			key: "d8bk6v"
		}]]
	}, xr.node, Sr = U(xr);
})), wr, Tr, Er = o((() => {
	W(), wr = {
		name: "zap",
		size: 24,
		node: [["path", {
			d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
			key: "1v7up4"
		}]]
	}, wr.node, Tr = U(wr);
})), Dr = o((() => {
	W(), se(), ue(), pe(), ge(), ye(), Se(), Te(), Oe(), je(), Pe(), Le(), Be(), Ue(), Ke(), Ye(), Qe(), tt(), it(), st(), ut(), pt(), gt(), yt(), St(), Tt(), Ot(), jt(), Pt(), Lt(), Bt(), Ut(), Kt(), Yt(), Qt(), tn(), an(), cn(), dn(), mn(), _n(), bn(), Cn(), En(), kn(), Mn(), Fn(), Rn(), Vn(), Wn(), qn(), Xn(), $n(), nr(), ar(), cr(), dr(), mr(), _r(), br(), Cr(), Er(), te(), re();
}));
// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Or() {
	return typeof window < "u";
}
function kr(e) {
	return Mr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ar(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function jr(e) {
	return ((Mr(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Mr(e) {
	return Or() ? e instanceof Node || e instanceof Ar(e).Node : !1;
}
function Nr(e) {
	return Or() ? e instanceof Element || e instanceof Ar(e).Element : !1;
}
function Pr(e) {
	return Or() ? e instanceof HTMLElement || e instanceof Ar(e).HTMLElement : !1;
}
function Fr(e) {
	return !Or() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ar(e).ShadowRoot;
}
function Ir(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Ur(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Lr(e) {
	return /^(table|td|th)$/.test(kr(e));
}
function Rr(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
function zr(e) {
	let t = Nr(e) ? Ur(e) : e;
	return Zr(t.transform) || Zr(t.translate) || Zr(t.scale) || Zr(t.rotate) || Zr(t.perspective) || !Vr() && (Zr(t.backdropFilter) || Zr(t.filter)) || Yr.test(t.willChange || "") || Xr.test(t.contain || "");
}
function Br(e) {
	let t = Gr(e);
	for (; Pr(t) && !Hr(t);) {
		if (zr(t)) return t;
		if (Rr(t)) return null;
		t = Gr(t);
	}
	return null;
}
function Vr() {
	return Qr ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Qr;
}
function Hr(e) {
	return /^(html|body|#document)$/.test(kr(e));
}
function Ur(e) {
	return Ar(e).getComputedStyle(e);
}
function Wr(e) {
	return Nr(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Gr(e) {
	if (kr(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Fr(e) && e.host || jr(e);
	return Fr(t) ? t.host : t;
}
function Kr(e) {
	let t = Gr(e);
	return Hr(t) ? (e.ownerDocument || e).body : Pr(t) && Ir(t) ? t : Kr(t);
}
function qr(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Kr(e), i = r === e.ownerDocument?.body, a = Ar(r);
	if (i) {
		let e = Jr(a);
		return t.concat(a, a.visualViewport || [], Ir(r) ? r : [], e && n ? qr(e) : []);
	}
	return t.concat(r, qr(r, [], n));
}
function Jr(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
var Yr, Xr, Zr, Qr, $r = o((() => {
	Yr = /transform|translate|scale|rotate|perspective|filter/, Xr = /paint|layout|strict|content/, Zr = (e) => !!e && e !== "none";
})), ei, ti, ni = o((() => {
	ei = /* @__PURE__ */ u(b(), 1), ti = { ...ei };
}));
// node_modules/@base-ui/utils/useRefWithInit.mjs
function ri(e, t) {
	let n = ii.useRef(ai);
	return n.current === ai && (n.current = e(t)), n;
}
var ii, ai, oi = o((() => {
	ii = /* @__PURE__ */ u(b(), 1), ai = {};
}));
// node_modules/@base-ui/utils/useStableCallback.mjs
function G(e) {
	let t = ri(si).current;
	return t.next = e, ui(t.effect), t.trampoline;
}
function si() {
	let e = {
		next: void 0,
		callback: ci,
		trampoline: (...t) => e.callback?.(...t),
		effect: () => {
			e.callback = e.next;
		}
	};
	return e;
}
function ci() {}
var li, ui, di = o((() => {
	ni(), oi(), li = ti.useInsertionEffect, ui = li && li !== ti.useLayoutEffect ? li : (e) => e();
})), fi, pi, K, mi = o((() => {
	fi = /* @__PURE__ */ u(b(), 1), pi = () => {}, K = typeof document < "u" ? fi.useLayoutEffect : pi;
}));
// node_modules/@base-ui/utils/mergeObjects.mjs
function hi(e, t) {
	if (e && !t) return e;
	if (!e && t) return t;
	if (e || t) return {
		...e,
		...t
	};
}
var gi = o((() => {}));
// node_modules/@base-ui/react/merge-props/mergeProps.mjs
function _i(e, t, n, r, i) {
	if (!n && !r && !i && !e) return yi(t);
	let a = yi(e);
	return t && (a = bi(a, t)), n && (a = bi(a, n)), r && (a = bi(a, r)), i && (a = bi(a, i)), a;
}
function vi(e) {
	if (e.length === 0) return Ai;
	if (e.length === 1) return yi(e[0]);
	let t = yi(e[0]);
	for (let n = 1; n < e.length; n += 1) t = bi(t, e[n]);
	return t;
}
function yi(e) {
	return wi(e) ? { ...e(Ai) } : xi(e);
}
function bi(e, t) {
	return wi(t) ? t(e) : Si(e, t);
}
function xi(e) {
	let t = { ...e };
	for (let e in t) {
		let n = t[e];
		Ci(e, n) && (t[e] = Ei(n));
	}
	return t;
}
function Si(e, t) {
	if (!t) return e;
	for (let n in t) {
		let r = t[n];
		switch (n) {
			case "style":
				e[n] = hi(e.style, r);
				break;
			case "className":
				e[n] = Oi(e.className, r);
				break;
			default: e[n] = Ci(n, r) ? Ti(e[n], r) : r;
		}
	}
	return e;
}
function Ci(e, t) {
	let n = e.charCodeAt(0), r = e.charCodeAt(1), i = e.charCodeAt(2);
	return n === 111 && r === 110 && i >= 65 && i <= 90 && (typeof t == "function" || t === void 0);
}
function wi(e) {
	return typeof e == "function";
}
function Ti(e, t) {
	return t ? e ? (...n) => {
		let r = n[0];
		if (ki(r)) {
			let i = r;
			Di(i);
			let a = t(...n);
			return i.baseUIHandlerPrevented || e?.(...n), a;
		}
		let i = t(...n);
		return e?.(...n), i;
	} : Ei(t) : e;
}
function Ei(e) {
	return e && ((...t) => {
		let n = t[0];
		return ki(n) && Di(n), e(...t);
	});
}
function Di(e) {
	return e.preventBaseUIHandler = () => {
		e.baseUIHandlerPrevented = !0;
	}, e;
}
function Oi(e, t) {
	return t ? e ? t + " " + e : t : e;
}
function ki(e) {
	return typeof e == "object" && !!e && "nativeEvent" in e;
}
var Ai, ji = o((() => {
	gi(), Ai = {};
})), Mi = o((() => {
	ji();
}));
// node_modules/@base-ui/utils/formatErrorMessage.mjs
function Ni(e, t) {
	return function(n, ...r) {
		let i = new URL(e);
		return i.searchParams.set("code", n.toString()), r.forEach((e) => i.searchParams.append("args[]", e)), `${t} error #${n}; visit ${i} for the full message.`;
	};
}
var Pi, Fi = o((() => {
	Pi = Ni("https://base-ui.com/production-error", "Base UI");
}));
// node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs
function Ii(e = !1) {
	let t = Li.useContext(Ri);
	if (t === void 0 && !e) throw Error(Pi(16));
	return t;
}
var Li, Ri, zi = o((() => {
	Fi(), Li = /* @__PURE__ */ u(b(), 1), Ri = /*#__PURE__*/ Li.createContext(void 0);
}));
// node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function Bi(e) {
	let { focusableWhenDisabled: t, disabled: n, composite: r = !1, tabIndex: i = 0, isNativeButton: a } = e, o = r && t !== !1, s = r && t === !1;
	return { props: Vi.useMemo(() => {
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
var Vi, Hi = o((() => {
	Vi = /* @__PURE__ */ u(b(), 1);
}));
// node_modules/@base-ui/utils/owner.mjs
function Ui(e) {
	return e?.ownerDocument || document;
}
var Wi = o((() => {
	$r();
}));
// node_modules/@base-ui/react/utils/dispatchClickWithModifiers.mjs
function Gi(e, t, { detail: n = 0, pointerType: r = "" } = {}) {
	e.dispatchEvent(new (Ar(e)).PointerEvent("click", {
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
var Ki = o((() => {
	Wi();
}));
// node_modules/@base-ui/react/internals/use-button/useButton.mjs
function qi(e = {}) {
	let { disabled: t = !1, focusableWhenDisabled: n, tabIndex: r = 0, native: i = !0, composite: a } = e, o = Xi.useRef(null), s = Ii(!0), c = a ?? s !== void 0, { props: l } = Bi({
		focusableWhenDisabled: n,
		disabled: t,
		composite: c,
		tabIndex: r,
		isNativeButton: i
	}), u = Xi.useCallback(() => {
		let e = o.current;
		Ji(e) && c && t && l.disabled === void 0 && e.disabled && (e.disabled = !1);
	}, [
		t,
		l.disabled,
		c
	]);
	return K(u, [u]), {
		getButtonProps: Xi.useCallback((e = {}) => {
			let { onClick: n, onMouseDown: r, onKeyUp: a, onKeyDown: o, onPointerDown: s, ...u } = e;
			return _i({
				onClick(e) {
					t ? e.preventDefault() : n?.(e);
				},
				onMouseDown(e) {
					t || r?.(e);
				},
				onKeyDown(e) {
					if (t || (Di(e), o?.(e), e.baseUIHandlerPrevented)) return;
					let n = e.target === e.currentTarget, r = e.currentTarget, a = Ji(r), s = !i && Yi(r), l = n && (i ? a : !s), u = e.key === "Enter", d = e.key === " ", f = r.getAttribute("role"), p = f?.startsWith("menuitem") || f === "option" || f === "gridcell";
					if (n && c && d) {
						if (e.defaultPrevented && p) return;
						e.preventDefault(), (!i || a) && (e.preventBaseUIHandler(), Gi(r, e));
					} else !l || i || !d && !u ? n && s && d && e.preventDefault() : e.defaultPrevented || (e.preventDefault(), u && (e.preventBaseUIHandler(), Gi(r, e)));
				},
				onKeyUp(e) {
					t || (Di(e), a?.(e), e.target === e.currentTarget && i && c && Ji(e.currentTarget) && e.key === " " ? e.preventDefault() : e.baseUIHandlerPrevented || e.target !== e.currentTarget || i || c || e.defaultPrevented || e.key !== " " || (e.preventBaseUIHandler(), Gi(e.currentTarget, e)));
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
		buttonRef: G((e) => {
			o.current = e, u();
		})
	};
}
function Ji(e) {
	return Pr(e) && e.tagName === "BUTTON";
}
function Yi(e) {
	return Pr(e) && e.tagName === "A" && !!e.href;
}
var Xi, Zi = o((() => {
	Xi = /* @__PURE__ */ u(b(), 1), $r(), di(), mi(), Mi(), zi(), Hi(), Ki();
}));
// node_modules/@base-ui/utils/useMergedRefs.mjs
function Qi(e, t, n, r) {
	let i = ri(ea).current;
	return ta(i, e, t, n, r) && ra(i, [
		e,
		t,
		n,
		r
	]), i.callback;
}
function $i(e) {
	let t = ri(ea).current;
	return na(t, e) && ra(t, e), t.callback;
}
function ea() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function ta(e, t, n, r, i) {
	return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== i;
}
function na(e, t) {
	return e.refs.length !== t.length || e.refs.some((e, n) => e !== t[n]);
}
function ra(e, t) {
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
var ia = o((() => {
	oi();
}));
// node_modules/@base-ui/utils/reactVersion.mjs
function aa(e) {
	return oa >= e;
}
var oa, sa = o((() => {
	b(), oa = 19;
}));
// node_modules/@base-ui/utils/getReactElementRef.mjs
function ca(e) {
	if (!/*#__PURE__*/ la.isValidElement(e)) return null;
	let t = e, n = t.props;
	return (aa(19) ? n?.ref : t.ref) ?? null;
}
var la, ua = o((() => {
	la = /* @__PURE__ */ u(b(), 1), sa();
}));
// node_modules/@base-ui/utils/empty.mjs
function da() {}
var fa, pa, ma = o((() => {
	fa = Object.freeze([]), pa = Object.freeze({});
}));
// node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function ha(e, t) {
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
var ga = o((() => {}));
// node_modules/@base-ui/react/utils/resolveClassName.mjs
function _a(e, t) {
	return typeof e == "function" ? e(t) : e;
}
var va = o((() => {}));
// node_modules/@base-ui/react/utils/resolveStyle.mjs
function ya(e, t) {
	return typeof e == "function" ? e(t) : e;
}
var ba = o((() => {}));
// node_modules/@base-ui/react/internals/useRenderElement.mjs
function xa(e, t, n = {}) {
	let r = t.render;
	n.enabled !== !1 && (r = wa(r));
	let i = Sa(t, n, r);
	if (n.enabled === !1) return null;
	let a = n.state ?? pa;
	return Ta(e, r, i, a);
}
function Sa(e, t, n) {
	let { className: r, style: i } = e, { state: a = pa, ref: o, props: s, stateAttributesMapping: c, enabled: l = !0 } = t, u = l ? _a(r, a) : void 0, d = l ? ya(i, a) : void 0, f = l ? ha(a, c) : pa, p = l && s ? Ca(s) : void 0, m = l ? hi(f, p) ?? {} : pa;
	return typeof document < "u" && (l ? m.ref = Array.isArray(o) ? $i([
		m.ref,
		ca(n),
		...o
	]) : Qi(m.ref, ca(n), o) : Qi(null, null)), l ? (u !== void 0 && (m.className = Oi(m.className, u)), d !== void 0 && (m.style = hi(m.style, d)), m) : pa;
}
function Ca(e) {
	return Array.isArray(e) ? vi(e) : _i(void 0, e);
}
function wa(e) {
	if (e?.$$typeof !== ka) return e;
	let t = Da.Children.toArray(e)[0];
	return /*#__PURE__*/ Da.isValidElement(t) ? t : e;
}
function Ta(e, t, n, r) {
	if (t) {
		if (typeof t == "function") return t(n, r);
		let e = _i(n, t.props);
		return e.ref = n.ref, /*#__PURE__*/ Da.cloneElement(t, e);
	}
	return Ea(e, n);
}
function Ea(e, t) {
	return e === "button" ? /*#__PURE__*/ (0, Oa.createElement)("button", {
		type: "button",
		...t,
		key: t.key
	}) : e === "img" ? /*#__PURE__*/ (0, Oa.createElement)("img", {
		alt: "",
		...t,
		key: t.key
	}) : /*#__PURE__*/ Da.createElement(e, t);
}
var Da, Oa, ka, Aa = o((() => {
	Da = /* @__PURE__ */ u(b(), 1), ia(), ua(), gi(), ma(), ga(), va(), ba(), Mi(), Oa = /* @__PURE__ */ u(b(), 1), ka = Symbol.for("react.lazy");
})), ja, Ma, Na = o((() => {
	ja = /* @__PURE__ */ u(b(), 1), Zi(), Aa(), Ma = /*#__PURE__*/ ja.forwardRef(function(e, t) {
		let { render: n, className: r, disabled: i = !1, focusableWhenDisabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { getButtonProps: l, buttonRef: u } = qi({
			disabled: i,
			focusableWhenDisabled: a,
			native: o
		});
		return xa("button", e, {
			state: { disabled: i },
			ref: [t, u],
			props: [c, l]
		});
	});
})), Pa = o((() => {
	Na();
}));
// node_modules/clsx/dist/clsx.mjs
function Fa(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Fa(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Ia() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Fa(e)) && (r && (r += " "), r += t);
	return r;
}
var La = o((() => {})), Ra, za, Ba, Va = o((() => {
	La(), Ra = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, za = Ia, Ba = (e, t) => (n) => {
		if (t?.variants == null) return za(e, n?.class, n?.className);
		let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
			let t = n?.[e], a = i?.[e];
			if (t === null) return null;
			let o = Ra(t) || Ra(a);
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
		return za(e, a, s, n?.class, n?.className);
	};
})), Ha, Ua, Wa, Ga, Ka, qa, Ja, Ya, Xa, Za, Qa, $a, eo, to, no, ro, io, ao, oo, so, co, lo, uo, fo, po, mo, ho, go, _o, vo, yo, bo, xo, So, Co, wo, To, Eo, Do, Oo, ko, Ao, jo, Mo, No, Po, Fo, Io, Lo, Ro, zo, Bo, Vo, Ho, Uo, q, Wo, Go, Ko, qo, Jo, Yo, Xo, J, Zo, Qo, $o, es, ts, ns, rs, is, as, os, ss, cs, ls, us, ds, fs, ps, ms, hs, gs = o((() => {
	Ha = (e, t) => {
		let n = Array(e.length + t.length);
		for (let t = 0; t < e.length; t++) n[t] = e[t];
		for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
		return n;
	}, Ua = (e, t) => ({
		classGroupId: e,
		validator: t
	}), Wa = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
		nextPart: e,
		validators: t,
		classGroupId: n
	}), Ga = "-", Ka = [], qa = "arbitrary..", Ja = (e) => {
		let t = Za(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
		return {
			getClassGroupId: (e) => {
				if (e.startsWith("[") && e.endsWith("]")) return Xa(e);
				let n = e.split(Ga), r = +(n[0] === "" && n.length > 1);
				return Ya(n, r, t);
			},
			getConflictingClassGroupIds: (e, t) => {
				if (t) {
					let t = r[e], i = n[e];
					return t ? i ? Ha(i, t) : t : i || Ka;
				}
				return n[e] || Ka;
			}
		};
	}, Ya = (e, t, n) => {
		if (e.length - t === 0) return n.classGroupId;
		let r = e[t], i = n.nextPart.get(r);
		if (i) {
			let n = Ya(e, t + 1, i);
			if (n) return n;
		}
		let a = n.validators;
		if (a === null) return;
		let o = t === 0 ? e.join(Ga) : e.slice(t).join(Ga), s = a.length;
		for (let e = 0; e < s; e++) {
			let t = a[e];
			if (t.validator(o)) return t.classGroupId;
		}
	}, Xa = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
		let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
		return r ? qa + r : void 0;
	})(), Za = (e) => {
		let { theme: t, classGroups: n } = e;
		return Qa(n, t);
	}, Qa = (e, t) => {
		let n = Wa();
		for (let r in e) {
			let i = e[r];
			$a(i, n, r, t);
		}
		return n;
	}, $a = (e, t, n, r) => {
		let i = e.length;
		for (let a = 0; a < i; a++) {
			let i = e[a];
			eo(i, t, n, r);
		}
	}, eo = (e, t, n, r) => {
		typeof e == "string" ? to(e, t, n) : typeof e == "function" ? no(e, t, n, r) : ro(e, t, n, r);
	}, to = (e, t, n) => {
		let r = e === "" ? t : io(t, e);
		r.classGroupId = n;
	}, no = (e, t, n, r) => {
		ao(e) ? $a(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(Ua(n, e)));
	}, ro = (e, t, n, r) => {
		let i = Object.entries(e), a = i.length;
		for (let e = 0; e < a; e++) {
			let [a, o] = i[e];
			$a(o, io(t, a), n, r);
		}
	}, io = (e, t) => {
		let n = e, r = t.split(Ga), i = r.length;
		for (let e = 0; e < i; e++) {
			let t = r[e], i = n.nextPart.get(t);
			i || (i = Wa(), n.nextPart.set(t, i)), n = i;
		}
		return n;
	}, ao = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, oo = (e) => {
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
	}, so = "!", co = ":", lo = [], uo = (e, t, n, r, i) => ({
		modifiers: e,
		hasImportantModifier: t,
		baseClassName: n,
		maybePostfixModifierPosition: r,
		isExternal: i
	}), fo = (e) => {
		let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
			let t = [], n = 0, r = 0, i = 0, a, o = e.length;
			for (let s = 0; s < o; s++) {
				let o = e[s];
				if (n === 0 && r === 0) {
					if (o === co) {
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
			s.endsWith(so) ? (c = s.slice(0, -1), l = !0) : s.startsWith(so) && (c = s.slice(1), l = !0);
			let u = a && a > i ? a - i : void 0;
			return uo(t, l, c, u);
		};
		if (t) {
			let e = t + co, n = r;
			r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : uo(lo, !1, t, void 0, !0);
		}
		if (n) {
			let e = r;
			r = (t) => n({
				className: t,
				parseClassName: e
			});
		}
		return r;
	}, po = (e) => {
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
	}, mo = (e) => ({
		cache: oo(e.cacheSize),
		parseClassName: fo(e),
		sortModifiers: po(e),
		postfixLookupClassGroupIds: ho(e),
		...Ja(e)
	}), ho = (e) => {
		let t = Object.create(null), n = e.postfixLookupClassGroups;
		if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
		return t;
	}, go = /\s+/, _o = (e, t) => {
		let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(go), l = "";
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
			let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + so : _, y = v + g;
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
	}, vo = (...e) => {
		let t = 0, n, r, i = "";
		for (; t < e.length;) (n = e[t++]) && (r = yo(n)) && (i && (i += " "), i += r);
		return i;
	}, yo = (e) => {
		if (typeof e == "string") return e;
		let t, n = "";
		for (let r = 0; r < e.length; r++) e[r] && (t = yo(e[r])) && (n && (n += " "), n += t);
		return n;
	}, bo = (e, ...t) => {
		let n, r, i, a, o = (o) => {
			let c = t.reduce((e, t) => t(e), e());
			return n = mo(c), r = n.cache.get, i = n.cache.set, a = s, s(o);
		}, s = (e) => {
			let t = r(e);
			if (t) return t;
			let a = _o(e, n);
			return i(e, a), a;
		};
		return a = o, (...e) => a(vo(...e));
	}, xo = [], So = (e) => {
		let t = (t) => t[e] || xo;
		return t.isThemeGetter = !0, t.themeKey = e, t;
	}, Co = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, wo = /^\((?:(\w[\w-]*):)?(.+)\)$/i, To = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Eo = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Do = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Oo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, ko = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ao = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, jo = (e) => To.test(e), Mo = (e) => !!e && !Number.isNaN(Number(e)), No = (e) => !!e && Number.isInteger(Number(e)), Po = (e) => e.endsWith("%") && Mo(e.slice(0, -1)), Fo = (e) => Eo.test(e), Io = () => !0, Lo = (e) => Do.test(e) && !Oo.test(e), Ro = () => !1, zo = (e) => ko.test(e), Bo = (e) => Ao.test(e), Vo = (e) => !q(e) && !J(e), Ho = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Uo = (e) => is(e, cs, Ro), q = (e) => Co.test(e), Wo = (e) => is(e, ls, Lo), Go = (e) => is(e, us, Mo), Ko = (e) => is(e, fs, Io), qo = (e) => is(e, ds, Ro), Jo = (e) => is(e, os, Ro), Yo = (e) => is(e, ss, Bo), Xo = (e) => is(e, ps, zo), J = (e) => wo.test(e), Zo = (e) => as(e, ls), Qo = (e) => as(e, ds), $o = (e) => as(e, os), es = (e) => as(e, cs), ts = (e) => as(e, ss), ns = (e) => as(e, ps, !0), rs = (e) => as(e, fs, !0), is = (e, t, n) => {
		let r = Co.exec(e);
		return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
	}, as = (e, t, n = !1) => {
		let r = wo.exec(e);
		return r ? r[1] ? t(r[1]) : n : !1;
	}, os = (e) => e === "position" || e === "percentage", ss = (e) => e === "image" || e === "url", cs = (e) => e === "length" || e === "size" || e === "bg-size", ls = (e) => e === "length", us = (e) => e === "number", ds = (e) => e === "family-name", fs = (e) => e === "number" || e === "weight", ps = (e) => e === "shadow", ms = () => {
		let e = So("color"), t = So("font"), n = So("text"), r = So("font-weight"), i = So("tracking"), a = So("leading"), o = So("breakpoint"), s = So("container"), c = So("spacing"), l = So("radius"), u = So("shadow"), d = So("inset-shadow"), f = So("text-shadow"), p = So("drop-shadow"), m = So("blur"), h = So("perspective"), g = So("aspect"), _ = So("ease"), v = So("animate"), y = () => [
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
			jo,
			"full",
			"auto",
			...w()
		], E = () => [
			No,
			"none",
			"subgrid",
			J,
			q
		], D = () => [
			"auto",
			{ span: [
				"full",
				No,
				J,
				q
			] },
			No,
			J,
			q
		], O = () => [
			No,
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
			jo,
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
			jo,
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
			jo,
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
			$o,
			Jo,
			{ position: [J, q] }
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
			es,
			Uo,
			{ size: [J, q] }
		], z = () => [
			Po,
			Zo,
			Wo
		], B = () => [
			"",
			"none",
			"full",
			l,
			J,
			q
		], V = () => [
			"",
			Mo,
			Zo,
			Wo
		], te = () => [
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
		], H = () => [
			Mo,
			Po,
			$o,
			Jo
		], re = () => [
			"",
			"none",
			m,
			J,
			q
		], U = () => [
			"none",
			Mo,
			J,
			q
		], ie = () => [
			"none",
			Mo,
			J,
			q
		], W = () => [
			Mo,
			J,
			q
		], ae = () => [
			jo,
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
				blur: [Fo],
				breakpoint: [Fo],
				color: [Io],
				container: [Fo],
				"drop-shadow": [Fo],
				ease: [
					"in",
					"out",
					"in-out"
				],
				font: [Vo],
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
				"inset-shadow": [Fo],
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
				radius: [Fo],
				shadow: [Fo],
				spacing: ["px", Mo],
				text: [Fo],
				"text-shadow": [Fo],
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
					jo,
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
				"container-named": [Ho],
				columns: [{ columns: [
					Mo,
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
					No,
					"auto",
					J,
					q
				] }],
				basis: [{ basis: [
					jo,
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
					Mo,
					jo,
					"auto",
					"initial",
					"none",
					q
				] }],
				grow: [{ grow: [
					"",
					Mo,
					J,
					q
				] }],
				shrink: [{ shrink: [
					"",
					Mo,
					J,
					q
				] }],
				order: [{ order: [
					No,
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
					Zo,
					Wo
				] }],
				"font-smoothing": ["antialiased", "subpixel-antialiased"],
				"font-style": ["italic", "not-italic"],
				"font-weight": [{ font: [
					r,
					rs,
					Ko
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
					Po,
					q
				] }],
				"font-family": [{ font: [
					Qo,
					qo,
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
					Mo,
					"none",
					J,
					Go
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
				"text-decoration-style": [{ decoration: [...te(), "wavy"] }],
				"text-decoration-thickness": [{ decoration: [
					Mo,
					"from-font",
					"auto",
					J,
					Wo
				] }],
				"text-decoration-color": [{ decoration: I() }],
				"underline-offset": [{ "underline-offset": [
					Mo,
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
					No,
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
							No,
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
							No,
							J,
							q
						]
					},
					ts,
					Yo
				] }],
				"bg-color": [{ bg: I() }],
				"gradient-from-pos": [{ from: z() }],
				"gradient-via-pos": [{ via: z() }],
				"gradient-to-pos": [{ to: z() }],
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
				"border-w": [{ border: V() }],
				"border-w-x": [{ "border-x": V() }],
				"border-w-y": [{ "border-y": V() }],
				"border-w-s": [{ "border-s": V() }],
				"border-w-e": [{ "border-e": V() }],
				"border-w-bs": [{ "border-bs": V() }],
				"border-w-be": [{ "border-be": V() }],
				"border-w-t": [{ "border-t": V() }],
				"border-w-r": [{ "border-r": V() }],
				"border-w-b": [{ "border-b": V() }],
				"border-w-l": [{ "border-l": V() }],
				"divide-x": [{ "divide-x": V() }],
				"divide-x-reverse": ["divide-x-reverse"],
				"divide-y": [{ "divide-y": V() }],
				"divide-y-reverse": ["divide-y-reverse"],
				"border-style": [{ border: [
					...te(),
					"hidden",
					"none"
				] }],
				"divide-style": [{ divide: [
					...te(),
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
					...te(),
					"none",
					"hidden"
				] }],
				"outline-offset": [{ "outline-offset": [
					Mo,
					J,
					q
				] }],
				"outline-w": [{ outline: [
					"",
					Mo,
					Zo,
					Wo
				] }],
				"outline-color": [{ outline: I() }],
				shadow: [{ shadow: [
					"",
					"inner",
					"none",
					u,
					ns,
					Xo
				] }],
				"shadow-color": [{ shadow: I() }],
				"inset-shadow": [{ "inset-shadow": [
					"none",
					d,
					ns,
					Xo
				] }],
				"inset-shadow-color": [{ "inset-shadow": I() }],
				"ring-w": [{ ring: V() }],
				"ring-w-inset": ["ring-inset"],
				"ring-color": [{ ring: I() }],
				"ring-offset-w": [{ "ring-offset": [Mo, Wo] }],
				"ring-offset-color": [{ "ring-offset": I() }],
				"inset-ring-w": [{ "inset-ring": V() }],
				"inset-ring-color": [{ "inset-ring": I() }],
				"text-shadow": [{ "text-shadow": [
					"none",
					f,
					ns,
					Xo
				] }],
				"text-shadow-color": [{ "text-shadow": I() }],
				opacity: [{ opacity: [
					Mo,
					J,
					q
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
				"mask-image-linear-pos": [{ "mask-linear": [Mo] }],
				"mask-image-linear-from-pos": [{ "mask-linear-from": H() }],
				"mask-image-linear-to-pos": [{ "mask-linear-to": H() }],
				"mask-image-linear-from-color": [{ "mask-linear-from": I() }],
				"mask-image-linear-to-color": [{ "mask-linear-to": I() }],
				"mask-image-t-from-pos": [{ "mask-t-from": H() }],
				"mask-image-t-to-pos": [{ "mask-t-to": H() }],
				"mask-image-t-from-color": [{ "mask-t-from": I() }],
				"mask-image-t-to-color": [{ "mask-t-to": I() }],
				"mask-image-r-from-pos": [{ "mask-r-from": H() }],
				"mask-image-r-to-pos": [{ "mask-r-to": H() }],
				"mask-image-r-from-color": [{ "mask-r-from": I() }],
				"mask-image-r-to-color": [{ "mask-r-to": I() }],
				"mask-image-b-from-pos": [{ "mask-b-from": H() }],
				"mask-image-b-to-pos": [{ "mask-b-to": H() }],
				"mask-image-b-from-color": [{ "mask-b-from": I() }],
				"mask-image-b-to-color": [{ "mask-b-to": I() }],
				"mask-image-l-from-pos": [{ "mask-l-from": H() }],
				"mask-image-l-to-pos": [{ "mask-l-to": H() }],
				"mask-image-l-from-color": [{ "mask-l-from": I() }],
				"mask-image-l-to-color": [{ "mask-l-to": I() }],
				"mask-image-x-from-pos": [{ "mask-x-from": H() }],
				"mask-image-x-to-pos": [{ "mask-x-to": H() }],
				"mask-image-x-from-color": [{ "mask-x-from": I() }],
				"mask-image-x-to-color": [{ "mask-x-to": I() }],
				"mask-image-y-from-pos": [{ "mask-y-from": H() }],
				"mask-image-y-to-pos": [{ "mask-y-to": H() }],
				"mask-image-y-from-color": [{ "mask-y-from": I() }],
				"mask-image-y-to-color": [{ "mask-y-to": I() }],
				"mask-image-radial": [{ "mask-radial": [J, q] }],
				"mask-image-radial-from-pos": [{ "mask-radial-from": H() }],
				"mask-image-radial-to-pos": [{ "mask-radial-to": H() }],
				"mask-image-radial-from-color": [{ "mask-radial-from": I() }],
				"mask-image-radial-to-color": [{ "mask-radial-to": I() }],
				"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
				"mask-image-radial-size": [{ "mask-radial": [{
					closest: ["side", "corner"],
					farthest: ["side", "corner"]
				}] }],
				"mask-image-radial-pos": [{ "mask-radial-at": b() }],
				"mask-image-conic-pos": [{ "mask-conic": [Mo] }],
				"mask-image-conic-from-pos": [{ "mask-conic-from": H() }],
				"mask-image-conic-to-pos": [{ "mask-conic-to": H() }],
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
					J,
					q
				] }],
				filter: [{ filter: [
					"",
					"none",
					J,
					q
				] }],
				blur: [{ blur: re() }],
				brightness: [{ brightness: [
					Mo,
					J,
					q
				] }],
				contrast: [{ contrast: [
					Mo,
					J,
					q
				] }],
				"drop-shadow": [{ "drop-shadow": [
					"",
					"none",
					p,
					ns,
					Xo
				] }],
				"drop-shadow-color": [{ "drop-shadow": I() }],
				grayscale: [{ grayscale: [
					"",
					Mo,
					J,
					q
				] }],
				"hue-rotate": [{ "hue-rotate": [
					Mo,
					J,
					q
				] }],
				invert: [{ invert: [
					"",
					Mo,
					J,
					q
				] }],
				saturate: [{ saturate: [
					Mo,
					J,
					q
				] }],
				sepia: [{ sepia: [
					"",
					Mo,
					J,
					q
				] }],
				"backdrop-filter": [{ "backdrop-filter": [
					"",
					"none",
					J,
					q
				] }],
				"backdrop-blur": [{ "backdrop-blur": re() }],
				"backdrop-brightness": [{ "backdrop-brightness": [
					Mo,
					J,
					q
				] }],
				"backdrop-contrast": [{ "backdrop-contrast": [
					Mo,
					J,
					q
				] }],
				"backdrop-grayscale": [{ "backdrop-grayscale": [
					"",
					Mo,
					J,
					q
				] }],
				"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
					Mo,
					J,
					q
				] }],
				"backdrop-invert": [{ "backdrop-invert": [
					"",
					Mo,
					J,
					q
				] }],
				"backdrop-opacity": [{ "backdrop-opacity": [
					Mo,
					J,
					q
				] }],
				"backdrop-saturate": [{ "backdrop-saturate": [
					Mo,
					J,
					q
				] }],
				"backdrop-sepia": [{ "backdrop-sepia": [
					"",
					Mo,
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
					Mo,
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
					Mo,
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
				rotate: [{ rotate: U() }],
				"rotate-x": [{ "rotate-x": U() }],
				"rotate-y": [{ "rotate-y": U() }],
				"rotate-z": [{ "rotate-z": U() }],
				scale: [{ scale: ie() }],
				"scale-x": [{ "scale-x": ie() }],
				"scale-y": [{ "scale-y": ie() }],
				"scale-z": [{ "scale-z": ie() }],
				"scale-3d": ["scale-3d"],
				skew: [{ skew: W() }],
				"skew-x": [{ "skew-x": W() }],
				"skew-y": [{ "skew-y": W() }],
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
				translate: [{ translate: ae() }],
				"translate-x": [{ "translate-x": ae() }],
				"translate-y": [{ "translate-y": ae() }],
				"translate-z": [{ "translate-z": ae() }],
				"translate-none": ["translate-none"],
				zoom: [{ zoom: [
					No,
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
					Mo,
					Zo,
					Wo,
					Go
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
	}, hs = /*#__PURE__*/ bo(ms);
}));
// src/lib/utils.ts
function _s(...e) {
	return hs(Ia(e));
}
var vs = o((() => {
	La(), gs();
})), ys = /* @__PURE__ */ s(((e) => {
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
})), bs = /* @__PURE__ */ s(((e, t) => {
	t.exports = ys();
}));
// src/components/ui/button.tsx
function Y({ className: e, variant: t = "default", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, xs.jsx)(Ma, {
		"data-slot": "button",
		className: _s(Ss({
			variant: t,
			size: n,
			className: e
		})),
		...r
	});
}
var xs, Ss, Cs = o((() => {
	Pa(), Va(), vs(), xs = bs(), Ss = Ba("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
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
Dr(), Cs();
var X = bs();
function ws({ title: e, detail: t, percent: n, onClose: r }) {
	let i = n === 100;
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		role: "status",
		className: "w-full rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-sm",
		children: [/* @__PURE__ */ (0, X.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [
				i ? /* @__PURE__ */ (0, X.jsx)(Ne, { className: "mt-0.5 size-4 shrink-0" }) : /* @__PURE__ */ (0, X.jsx)(zt, { className: "mt-0.5 size-4 shrink-0 motion-safe:animate-spin" }),
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
					children: /* @__PURE__ */ (0, X.jsx)(Sr, {})
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
var Ts = /* @__PURE__ */ s(((e) => {
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
})), Es = /* @__PURE__ */ s(((e, t) => {
	t.exports = Ts();
})), Ds = /* @__PURE__ */ s(((e) => {
	var t = b();
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
})), Os = /* @__PURE__ */ s(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = Ds();
})), ks = /* @__PURE__ */ s(((e) => {
	var t = Es(), n = b(), r = Os();
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
	function p(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function m(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function h(e) {
		var t = [null, null], n = p(e);
		return n === null || g(t, e, n.child, { foundSelf: !1 }), t;
	}
	function g(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && g(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function _(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var v = null, y = null;
	function x(e, t, n) {
		return e === n || e === t && (v = e, !0);
	}
	function S(e, t, n) {
		return e === n ? (y = e, !1) : e === t && (y !== null && (v = e), !0);
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
	var T = Object.assign, E = Symbol.for("react.element"), D = Symbol.for("react.transitional.element"), O = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), M = Symbol.for("react.consumer"), N = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), I = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), ee = Symbol.for("react.activity"), z = Symbol.for("react.legacy_hidden"), B = Symbol.for("react.memo_cache_sentinel"), V = Symbol.for("react.view_transition"), te = Symbol.for("react.recoverable"), ne = Symbol.iterator;
	function H(e) {
		return typeof e != "object" || !e ? null : (e = ne && e[ne] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var re = Symbol.for("react.client.reference");
	function U(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === re ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case k: return "Fragment";
			case j: return "Profiler";
			case A: return "StrictMode";
			case F: return "Suspense";
			case I: return "SuspenseList";
			case ee: return "Activity";
			case V: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case O: return "Portal";
			case N: return e.displayName || "Context";
			case M: return (e._context.displayName || "Context") + ".Consumer";
			case P:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case L: return t = e.displayName || null, t === null ? U(e.type) || "Memo" : t;
			case R:
				t = e._payload, e = e._init;
				try {
					return U(e(t));
				} catch {}
		}
		return null;
	}
	var ie = Array.isArray, W = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ae = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, oe = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, se = [], ce = -1;
	function le(e) {
		return { current: e };
	}
	function ue(e) {
		0 > ce || (e.current = se[ce], se[ce] = null, ce--);
	}
	function de(e, t) {
		ce++, se[ce] = e.current, e.current = t;
	}
	var fe = le(null), pe = le(null), me = le(null), he = le(null);
	function ge(e, t) {
		switch (de(me, t), de(pe, e), de(fe, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? fp(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = fp(t), e = pp(t, e);
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
		ue(fe), de(fe, e);
	}
	function _e() {
		ue(fe), ue(pe), ue(me);
	}
	function ve(e) {
		var t = e.memoizedState;
		t !== null && (lh._currentValue = t.memoizedState, de(he, e)), t = fe.current;
		var n = pp(t, e.type);
		t !== n && (de(pe, e), de(fe, n));
	}
	function ye(e) {
		pe.current === e && (ue(fe), ue(pe)), he.current === e && (ue(he), lh._currentValue = oe);
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
		var e = ae.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Th(e.type)) : e;
	}
	function ft(e, t) {
		var n = ae.p;
		try {
			return ae.p = e, t();
		} finally {
			ae.p = n;
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
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = mm(e); e !== null;) {
					if (n = e[mt]) return n;
					e = mm(e);
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
				if (ie(r)) {
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
	function gn(e) {
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
	var _n = !1;
	function vn(e, t, n) {
		if (_n) return e(t, n);
		_n = !0;
		try {
			return e(t);
		} finally {
			if (_n = !1, (mn !== null || hn !== null) && (Rd(), mn && (t = mn, e = hn, hn = mn = null, gn(t), e))) for (t = 0; t < e.length; t++) gn(e[t]);
		}
	}
	function yn(e, t) {
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
	var bn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, xn = !1;
	if (bn) try {
		var Sn = {};
		Object.defineProperty(Sn, "passive", { get: function() {
			xn = !0;
		} }), window.addEventListener("test", Sn, Sn), window.removeEventListener("test", Sn, Sn);
	} catch {
		xn = !1;
	}
	var Cn = null, wn = null, Tn = null;
	function En() {
		if (Tn) return Tn;
		var e, t = wn, n = t.length, r, i = "value" in Cn ? Cn.value : Cn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Tn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Dn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function On() {
		return !0;
	}
	function kn() {
		return !1;
	}
	function An(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? On : kn, this.isPropagationStopped = kn, this;
		}
		return T(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = On);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = On);
			},
			persist: function() {},
			isPersistent: On
		}), t;
	}
	var jn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Mn = An(jn), Nn = T({}, jn, {
		view: 0,
		detail: 0
	}), Pn = An(Nn), Fn, In, Ln, Rn = T({}, Nn, {
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
		getModifierState: Yn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Ln && (Ln && e.type === "mousemove" ? (Fn = e.screenX - Ln.screenX, In = e.screenY - Ln.screenY) : In = Fn = 0, Ln = e), Fn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : In;
		}
	}), zn = An(Rn), Bn = An(T({}, Rn, { dataTransfer: 0 })), Vn = An(T({}, Nn, { relatedTarget: 0 })), Hn = An(T({}, jn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Un = An(T({}, jn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Wn = An(T({}, jn, { data: 0 })), Gn = {
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
	}, Kn = {
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
	}, qn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Jn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = qn[e]) ? !!t[e] : !1;
	}
	function Yn() {
		return Jn;
	}
	var Xn = An(T({}, Nn, {
		key: function(e) {
			if (e.key) {
				var t = Gn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Dn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Kn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Yn,
		charCode: function(e) {
			return e.type === "keypress" ? Dn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Dn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Zn = An(T({}, Rn, {
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
	})), Qn = An(T({}, jn, { submitter: 0 })), $n = An(T({}, Nn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Yn
	})), er = An(T({}, jn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), tr = An(T({}, Rn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), nr = An(T({}, jn, {
		newState: 0,
		oldState: 0,
		source: 0
	})), rr = [
		9,
		13,
		27,
		32
	], ir = bn && "CompositionEvent" in window, ar = null;
	bn && "documentMode" in document && (ar = document.documentMode);
	var or = bn && "TextEvent" in window && !ar, sr = bn && (!ir || ar && 8 < ar && 11 >= ar), cr = " ", lr = !1;
	function ur(e, t) {
		switch (e) {
			case "keyup": return rr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function dr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var fr = !1;
	function pr(e, t) {
		switch (e) {
			case "compositionend": return dr(t);
			case "keypress": return t.which === 32 ? (lr = !0, cr) : null;
			case "textInput": return e = t.data, e === cr && lr ? null : e;
			default: return null;
		}
	}
	function mr(e, t) {
		if (fr) return e === "compositionend" || !ir && ur(e, t) ? (e = En(), Tn = wn = Cn = null, fr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return sr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var hr = {
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
	function gr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!hr[e.type] : t === "textarea";
	}
	function _r(e, t, n, r) {
		mn ? hn ? hn.push(r) : hn = [r] : mn = r, t = Yf(t, "onChange"), 0 < t.length && (n = new Mn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var vr = null, yr = null;
	function br(e) {
		Vf(e, 0);
	}
	function xr(e) {
		if (qt(Et(e))) return e;
	}
	function Sr(e, t) {
		if (e === "change") return t;
	}
	var Cr = !1;
	if (bn) {
		var wr;
		if (bn) {
			var Tr = "oninput" in document;
			if (!Tr) {
				var Er = document.createElement("div");
				Er.setAttribute("oninput", "return;"), Tr = typeof Er.oninput == "function";
			}
			wr = Tr;
		} else wr = !1;
		Cr = wr && (!document.documentMode || 9 < document.documentMode);
	}
	function Dr() {
		vr && (vr.detachEvent("onpropertychange", Or), yr = vr = null);
	}
	function Or(e) {
		if (e.propertyName === "value" && xr(yr)) {
			var t = [];
			_r(t, yr, e, pn(e)), vn(br, t);
		}
	}
	function kr(e, t, n) {
		e === "focusin" ? (Dr(), vr = t, yr = n, vr.attachEvent("onpropertychange", Or)) : e === "focusout" && Dr();
	}
	function Ar(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return xr(yr);
	}
	function jr(e, t) {
		if (e === "click") return xr(t);
	}
	function Mr(e, t) {
		if (e === "input" || e === "change") return xr(t);
	}
	function Nr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Pr = typeof Object.is == "function" ? Object.is : Nr;
	function Fr(e, t) {
		if (Pr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!De.call(t, i) || !Pr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Ir(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Lr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Rr(e, t) {
		var n = Lr(e);
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
			n = Lr(n);
		}
	}
	function zr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? zr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Br(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Ir(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Ir(e.document);
		}
		return t;
	}
	function Vr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Hr = bn && "documentMode" in document && 11 >= document.documentMode, Ur = null, Wr = null, Gr = null, Kr = !1;
	function qr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Kr || Ur == null || Ur !== Ir(r) || (r = Ur, "selectionStart" in r && Vr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Gr && Fr(Gr, r) || (Gr = r, r = Yf(Wr, "onSelect"), 0 < r.length && (t = new Mn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Ur)));
	}
	function Jr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Yr = {
		animationend: Jr("Animation", "AnimationEnd"),
		animationiteration: Jr("Animation", "AnimationIteration"),
		animationstart: Jr("Animation", "AnimationStart"),
		transitionrun: Jr("Transition", "TransitionRun"),
		transitionstart: Jr("Transition", "TransitionStart"),
		transitioncancel: Jr("Transition", "TransitionCancel"),
		transitionend: Jr("Transition", "TransitionEnd")
	}, Xr = {}, Zr = {};
	bn && (Zr = document.createElement("div").style, "AnimationEvent" in window || (delete Yr.animationend.animation, delete Yr.animationiteration.animation, delete Yr.animationstart.animation), "TransitionEvent" in window || delete Yr.transitionend.transition);
	function Qr(e) {
		if (Xr[e]) return Xr[e];
		if (!Yr[e]) return e;
		var t = Yr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Zr) return Xr[e] = t[n];
		return e;
	}
	var $r = Qr("animationend"), ei = Qr("animationiteration"), ti = Qr("animationstart"), ni = Qr("transitionrun"), ri = Qr("transitionstart"), ii = Qr("transitioncancel"), ai = Qr("transitionend"), oi = /* @__PURE__ */ new Map(), G = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	G.push("scrollEnd");
	function si(e, t) {
		oi.set(e, t), Mt(t, [e]);
	}
	var ci = 0;
	function li(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = yd.identifierPrefix;
		var n = ci++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function ui(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Dd;
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
	}, pi = [], K = 0, mi = 0;
	function hi() {
		for (var e = K, t = mi = K = 0; t < e;) {
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
			a !== 0 && yi(n, i, a);
		}
	}
	function gi(e, t, n, r) {
		pi[K++] = e, pi[K++] = t, pi[K++] = n, pi[K++] = r, mi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function _i(e, t, n, r) {
		return gi(e, t, n, r), bi(e);
	}
	function vi(e, t) {
		return gi(e, null, null, t), bi(e);
	}
	function yi(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - We(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function bi(e) {
		if (50 < Od) throw Od = 0, kd = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var xi = {};
	function Si(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Ci(e, t, n, r) {
		return new Si(e, t, n, r);
	}
	function wi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Ti(e, t) {
		var n = e.alternate;
		return n === null ? (n = Ci(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Ei(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Di(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") wi(r) && (s = 1);
		else if (typeof r == "string") s = Ym(e, n, fe.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case ee: return e = Ci(31, n, t, a), e.elementType = ee, e.lanes = o, e;
			case k: return Oi(n.children, a, o, t);
			case A:
				s = 8, a |= 24;
				break;
			case j: return e = Ci(12, n, t, a | 2), e.elementType = j, e.lanes = o, e;
			case F: return e = Ci(13, n, t, a), e.elementType = F, e.lanes = o, e;
			case I: return e = Ci(19, n, t, a), e.elementType = I, e.lanes = o, e;
			case z:
			case V: return e = a | 32, e = Ci(30, n, t, e), e.elementType = V, e.lanes = o, e.stateNode = {
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
		return t = Ci(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function Oi(e, t, n, r) {
		return e = Ci(7, e, r, t), e.lanes = n, e;
	}
	function ki(e, t, n) {
		return e = Ci(6, e, null, t), e.lanes = n, e;
	}
	function Ai(e) {
		var t = Ci(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function ji(e, t, n) {
		return t = Ci(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Mi = /* @__PURE__ */ new WeakMap();
	function Ni(e, t) {
		if (typeof e == "object" && e) {
			var n = Mi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Ee(t)
			}, Mi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Ee(t)
		};
	}
	var Pi = [], Fi = 0, Ii = null, Li = 0, Ri = [], zi = 0, Bi = null, Vi = 1, Hi = "";
	function Ui(e, t) {
		Pi[Fi++] = Li, Pi[Fi++] = Ii, Ii = e, Li = t;
	}
	function Wi(e, t, n) {
		Ri[zi++] = Vi, Ri[zi++] = Hi, Ri[zi++] = Bi, Bi = e;
		var r = Vi;
		e = Hi;
		var i = 32 - We(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - We(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Vi = 1 << 32 - We(t) + i | n << i | r, Hi = a + e;
		} else Vi = 1 << a | n << i | r, Hi = e;
	}
	function Gi(e) {
		e.return !== null && (Ui(e, 1), Wi(e, 1, 0));
	}
	function Ki(e) {
		for (; e === Ii;) Ii = Pi[--Fi], Pi[Fi] = null, Li = Pi[--Fi], Pi[Fi] = null;
		for (; e === Bi;) Bi = Ri[--zi], Ri[zi] = null, Hi = Ri[--zi], Ri[zi] = null, Vi = Ri[--zi], Ri[zi] = null;
	}
	function qi(e, t) {
		Ri[zi++] = Vi, Ri[zi++] = Hi, Ri[zi++] = Bi, Vi = t.id, Hi = t.overflow, Bi = e;
	}
	var Ji = null, Yi = null, Xi = !1, Zi = null, Qi = !1, $i = Error(i(519));
	function ea(e) {
		throw oa(Ni(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), $i;
	}
	function ta(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[mt] = e, t[ht] = r, n) {
			case "dialog":
				Hf("cancel", t), Hf("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Hf("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < zf.length; n++) Hf(zf[n], t);
				break;
			case "source":
				Hf("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Hf("error", t), Hf("load", t);
				break;
			case "details":
				Hf("toggle", t);
				break;
			case "input":
				Hf("invalid", t), Zt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Hf("invalid", t);
				break;
			case "textarea": Hf("invalid", t), tn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || tp(t.textContent, n) ? (r.popover != null && (Hf("beforetoggle", t), Hf("toggle", t)), r.onScroll != null && Hf("scroll", t), r.onScrollEnd != null && Hf("scrollend", t), r.onClick != null && (t.onclick = dn), t = !0) : t = !1, t || ea(e, !0);
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
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || hp(e.type, e.memoizedProps)), n = !n), n && Yi && ea(e), na(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Yi = pm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Yi = pm(e);
		} else t === 27 ? (t = Yi, wp(e.type) ? (e = fm, fm = null, Yi = e) : Yi = t) : Yi = Ji ? dm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function ia() {
		Yi = Ji = null, Xi = !1;
	}
	function aa() {
		var e = Zi;
		return e !== null && (dd === null ? dd = e : dd.push.apply(dd, e), Zi = null), e;
	}
	function oa(e) {
		Zi === null ? Zi = [e] : Zi.push(e);
	}
	var sa = le(null), ca = null, la = null;
	function ua(e, t, n) {
		de(sa, t._currentValue), t._currentValue = n;
	}
	function da(e) {
		e._currentValue = sa.current, ue(sa);
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
					Pr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === he.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [lh] : e.push(lh));
			}
			a = a.return;
		}
		return e !== null && pa(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function ha(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Pr(e.context._currentValue, e.memoizedValue)) return !0;
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
	}, xa = t.unstable_scheduleCallback, Sa = t.unstable_NormalPriority, Ca = {
		$$typeof: N,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function wa() {
		return {
			controller: new ba(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Ta(e) {
		e.refCount--, e.refCount === 0 && xa(Sa, function() {
			e.controller.abort();
		});
	}
	function Ea(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var Da = null;
	function Oa(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var ka = null, Aa = 0, ja = 0, Ma = null;
	function Na(e, t) {
		if (ka === null) {
			var n = ka = [];
			Aa = 0, ja = Pf(), Ma = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return Aa++, t.then(Pa, Pa), t;
	}
	function Pa() {
		if (--Aa === 0 && (Da = null, ka !== null)) {
			Ma !== null && (Ma.status = "fulfilled");
			var e = ka;
			ka = null, ja = 0, Ma = null;
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
	var Ia = W.S;
	W.S = function(e, t) {
		if (md = Me(), typeof t == "object" && t && typeof t.then == "function" && Na(e, t), Da !== null) for (var n = bf; n !== null;) Ea(n, Da), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = bf; r !== null;) Ea(r, n), r = r.next;
			if (ja !== 0) {
				r = Da, r === null && (r = Da = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Ia !== null && Ia(e, t);
	};
	var La = le(null);
	function Ra() {
		var e = La.current;
		return e === null ? Yu.pooledCache : e;
	}
	function za(e, t) {
		t === null ? de(La, La.current) : de(La, t.pool);
	}
	function Ba() {
		var e = Ra();
		return e === null ? null : {
			parent: Ca._currentValue,
			pool: e
		};
	}
	var Va = Error(i(460)), Ha = Error(i(474)), Ua = Error(i(542)), Wa = { then: function() {} };
	function Ga(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ka(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(dn, dn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Xa(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(dn, dn);
				else {
					if (e = Yu, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
					case "rejected": throw e = t.reason, Xa(e), e;
				}
				throw Ja = t, Va;
		}
	}
	function qa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Ja = e, Va) : e;
		}
	}
	var Ja = null;
	function Ya() {
		if (Ja === null) throw Error(i(459));
		var e = Ja;
		return Ja = null, e;
	}
	function Xa(e) {
		if (e === Va || e === Ua) throw Error(i(483));
	}
	var Za = null, Qa = 0;
	function $a(e) {
		var t = Qa;
		return Qa += 1, Za === null && (Za = []), Ka(Za, e, t);
	}
	function eo(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function to(e, t) {
		throw t.$$typeof === E ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function no(e) {
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
			return e = Ti(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ki(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === k ? (e = d(e, t, n.props.children, r, n.key), eo(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === R && qa(i) === t.type) ? (t = a(t, n.props), eo(t, n), t.return = e, t) : (t = Di(n.type, n.key, n.props, null, e.mode, r), eo(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ji(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = Oi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ki("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case D: return n = Di(t.type, t.key, t.props, null, e.mode, n), eo(n, t), n.return = e, n;
					case O: return t = ji(t, e.mode, n), t.return = e, t;
					case R: return t = qa(t), f(e, t, n);
				}
				if (ie(t) || H(t)) return t = Oi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, $a(t), n);
				if (t.$$typeof === N) return f(e, va(e, t), n);
				to(e, t);
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
					case R: return n = qa(n), p(e, t, n, r);
				}
				if (ie(n) || H(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, $a(n), r);
				if (n.$$typeof === N) return p(e, t, va(e, n), r);
				to(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case D: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case O: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case R: return r = qa(r), m(e, t, n, r, i);
				}
				if (ie(r) || H(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, $a(r), i);
				if (r.$$typeof === N) return m(e, t, n, va(t, r), i);
				to(t, r);
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
			if (h === s.length) return n(i, d), Xi && Ui(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return Xi && Ui(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), Xi && Ui(i, h), l;
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
			if (v.done) return n(a, h), Xi && Ui(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return Xi && Ui(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), Xi && Ui(a, g), u;
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
											n(e, r.sibling), c = a(r, o.props.children), eo(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === R && qa(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), eo(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === k ? (c = Oi(o.props.children, e.mode, c, o.key), eo(c, o), c.return = e, e = c) : (c = Di(o.type, o.key, o.props, null, e.mode, c), eo(c, o), c.return = e, e = c);
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
							c = ji(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case R: return o = qa(o), _(e, r, o, c);
				}
				if (ie(o)) return h(e, r, o, c);
				if (H(o)) {
					if (l = H(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, $a(o), c);
				if (o.$$typeof === N) return _(e, r, va(e, o), c);
				to(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ki(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Qa = 0;
				var i = _(e, t, n, r);
				return Za = null, i;
			} catch (t) {
				if (t === Va || t === Ua) throw t;
				var a = Ci(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var ro = no(!0), io = no(!1), ao = !1;
	function oo(e) {
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
	function so(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function co(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function lo(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Ju & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = bi(e), yi(e, null, n), t;
		}
		return gi(e, r, t, n), bi(e);
	}
	function uo(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, st(e, n);
		}
	}
	function fo(e, t) {
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
	var po = !1;
	function mo() {
		if (po) {
			var e = Ma;
			if (e !== null) throw e;
		}
	}
	function ho(e, t, n, r) {
		po = !1;
		var i = e.updateQueue;
		ao = !1;
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
				if (p ? (Zu & f) === f : (r & f) === f) {
					f !== 0 && f === ja && (po = !0), u !== null && (u = u.next = {
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
							case 2: ao = !0;
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), ad |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function go(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function _o(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) go(n[e], t);
	}
	var vo = le(null), yo = le(0);
	function bo(e, t) {
		e = rd, de(yo, e), de(vo, t), rd = e | t.baseLanes;
	}
	function xo() {
		de(yo, rd), de(vo, vo.current);
	}
	function So() {
		rd = yo.current, ue(vo), ue(yo);
	}
	var Co = le(null), wo = null;
	function To(e) {
		var t = e.alternate;
		de(Ao, Ao.current & 1), de(Co, e), wo === null && (t === null || vo.current !== null || t.memoizedState !== null) && (wo = e);
	}
	function Eo(e) {
		de(Ao, Ao.current), de(Co, e), wo === null && (wo = e);
	}
	function Do(e) {
		e.tag === 22 ? (de(Ao, Ao.current), de(Co, e), wo === null && (wo = e)) : Oo();
	}
	function Oo() {
		de(Ao, Ao.current), de(Co, Co.current);
	}
	function ko(e) {
		ue(Co), wo === e && (wo = null), ue(Ao);
	}
	var Ao = le(0);
	function jo(e, t) {
		de(Co, Co.current), de(Ao, t);
	}
	function Mo(e) {
		ue(Ao), ue(Co), wo === e && (wo = null);
	}
	function No(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || cm(n) || lm(n))) return t;
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
	var Po = 0, Fo = null, Io = null, Lo = null, Ro = !1, zo = !1, Bo = !1, Vo = 0, Ho = 0, Uo = null, q = 0;
	function Wo() {
		throw Error(i(321));
	}
	function Go(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Pr(e[n], t[n])) return !1;
		return !0;
	}
	function Ko(e, t, n, r, i, a) {
		return Po = a, Fo = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, W.H = e === null || e.memoizedState === null ? sc : cc, Bo = !1, a = n(r, i), Bo = !1, zo && (a = Jo(t, n, r, i)), qo(e), a;
	}
	function qo(e) {
		W.H = oc;
		var t = Io !== null && Io.next !== null;
		if (Po = 0, Lo = Io = Fo = null, Ro = !1, Ho = 0, Uo = null, t) throw Error(i(300));
		e === null || Tc || (e = e.dependencies, e !== null && ha(e) && (Tc = !0));
	}
	function Jo(e, t, n, r) {
		Fo = e;
		var a = 0;
		do {
			if (zo && (Uo = null), Ho = 0, zo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, Lo = Io = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			W.H = lc, o = t(n, r);
		} while (zo);
		return o;
	}
	function Yo() {
		var e = W.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? ts(t) : t, e = e.useState()[0], (Io === null ? null : Io.memoizedState) !== e && (Fo.flags |= 1024), t;
	}
	function Xo() {
		var e = Vo !== 0;
		return Vo = 0, e;
	}
	function J(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Zo(e) {
		if (Ro) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Ro = !1;
		}
		Po = 0, Lo = Io = Fo = null, zo = !1, Ho = Vo = 0, Uo = null;
	}
	function Qo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Lo === null ? Fo.memoizedState = Lo = e : Lo = Lo.next = e, Lo;
	}
	function $o() {
		if (Io === null) {
			var e = Fo.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = Io.next;
		var t = Lo === null ? Fo.memoizedState : Lo.next;
		if (t !== null) Lo = t, Io = e;
		else {
			if (e === null) throw Fo.alternate === null ? Error(i(467)) : Error(i(310));
			Io = e, e = {
				memoizedState: Io.memoizedState,
				baseState: Io.baseState,
				baseQueue: Io.baseQueue,
				queue: Io.queue,
				next: null
			}, Lo === null ? Fo.memoizedState = Lo = e : Lo = Lo.next = e;
		}
		return Lo;
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
		var t = Ho;
		return Ho += 1, Uo === null && (Uo = []), e = Ka(Uo, e, t), t = Fo, (Lo === null ? t.memoizedState : Lo.next) === null && (t = t.alternate, W.H = t === null || t.memoizedState === null ? sc : cc), e;
	}
	function ns(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ts(e);
			if (e.$$typeof === te) return;
			if (e.$$typeof === N) return _a(e);
		}
		throw Error(i(438, String(e)));
	}
	function rs(e) {
		var t = null, n = Fo.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = Fo.alternate;
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
		}, n === null && (n = es(), Fo.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = B;
		return t.index++, n;
	}
	function is(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function as(e) {
		return os($o(), Io, e);
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
				if (f === u.lane ? (Po & f) === f : (Zu & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ja && (d = !0);
					else if ((Po & p) === p) {
						u = u.next, p === ja && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, Fo.lanes |= p, ad |= p;
					f = u.action, Bo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, Fo.lanes |= f, ad |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Pr(o, e.memoizedState) && (Tc = !0, d && (n = Ma, n !== null))) throw n;
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
			Pr(o, t.memoizedState) || (Tc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function cs(e, t, n) {
		var r = Fo, a = $o(), o = Xi;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Pr((Io || a).memoizedState, n);
		if (s && (a.memoizedState = n, Tc = !0), a = a.queue, Ms(ds.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Lo !== null && !!(Lo.memoizedState.tag & 1), Ds(e ? 9 : 8, { destroy: void 0 }, us.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, Yu === null) throw Error(i(349));
			o || Po & 127 || ls(r, t, n);
		}
		return n;
	}
	function ls(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = Fo.updateQueue, t === null ? (t = es(), Fo.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
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
			return !Pr(e, n);
		} catch {
			return !0;
		}
	}
	function ps(e) {
		var t = vi(e, 2);
		t !== null && Nd(t, e, 2);
	}
	function ms(e) {
		var t = Qo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Bo) {
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
		return e.baseState = n, os(e, Io, typeof r == "function" ? r : is);
	}
	function gs(e, t, n, r, a) {
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
			W.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, _s(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function _s(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = W.T, o = {};
			o.types = a === null ? null : a.types, W.T = o;
			try {
				var s = n(i, r), c = W.S;
				c !== null && c(o, s), vs(e, t, s);
			} catch (n) {
				bs(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), W.T = a;
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
		t.status = "fulfilled", t.value = n, Y(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, _s(e, n)));
	}
	function bs(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Y(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Y(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function xs(e, t) {
		return t;
	}
	function Ss(e, t) {
		if (Xi) {
			var n = Yu.formState;
			if (n !== null) {
				a: {
					var r = Fo;
					if (Xi) {
						if (Yi) {
							b: {
								for (var i = Yi, a = Qi; i.nodeType !== 8;) if (!a || (i = dm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Yi = dm(i.nextSibling), r = i.data === "F!";
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
		return n = Qo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: xs,
			lastRenderedState: t
		}, n.queue = r, n = ec.bind(null, Fo, r), r.dispatch = n, r = ms(!1), a = nc.bind(null, Fo, !1, r.queue), r = Qo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = gs.bind(null, Fo, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Cs(e) {
		return X($o(), Io, e);
	}
	function X(e, t, n) {
		if (t = os(e, t, xs)[0], e = as(is)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ts(t);
		} catch (e) {
			throw e === Va ? Ua : e;
		}
		else r = t;
		t = $o();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (Fo.flags |= 2048, Ds(9, { destroy: void 0 }, ws.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ws(e, t) {
		e.action = t;
	}
	function Ts(e) {
		var t = $o(), n = Io;
		if (n !== null) return X(t, n, e);
		$o(), t = t.memoizedState, n = $o();
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
		}, t = Fo.updateQueue, t === null && (t = es(), Fo.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ks() {
		return $o().memoizedState;
	}
	function As(e, t, n, r) {
		var i = Qo();
		Fo.flags |= e, i.memoizedState = Ds(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Z(e, t, n, r) {
		var i = $o();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		Io !== null && r !== null && Go(r, Io.memoizedState.deps) ? i.memoizedState = Ds(t, a, n, r) : (Fo.flags |= e, i.memoizedState = Ds(1 | t, a, n, r));
	}
	function js(e, t) {
		As(8390656, 8, e, t);
	}
	function Ms(e, t) {
		Z(2048, 8, e, t);
	}
	function Ns(e) {
		Fo.flags |= 4;
		var t = Fo.updateQueue;
		if (t === null) t = es(), Fo.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Ps(e) {
		var t = $o().memoizedState;
		return Ns({
			ref: t,
			nextImpl: e
		}), function() {
			if (Ju & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Fs(e, t) {
		return Z(4, 2, e, t);
	}
	function Is(e, t) {
		return Z(4, 4, e, t);
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
		n = n == null ? null : n.concat([e]), Z(4, 4, Ls.bind(null, t, e), n);
	}
	function zs() {}
	function Bs(e, t) {
		var n = $o();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Go(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Vs(e, t) {
		var n = $o();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Go(t, r[1])) return r[0];
		if (r = e(), Bo) {
			Ue(!0);
			try {
				e();
			} finally {
				Ue(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Hs(e, t, n) {
		return n === void 0 || Po & 1073741824 && !(Zu & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = jd(), Fo.lanes |= e, ad |= e, n);
	}
	function Us(e, t, n, r) {
		return Pr(n, t) ? n : vo.current === null ? !(Po & 106) || Po & 1073741824 && !(Zu & 261930) ? (Tc = !0, e.memoizedState = n) : (e = jd(), Fo.lanes |= e, ad |= e, t) : (e = Hs(e, n, r), Pr(e, t) || (Tc = !0), e);
	}
	function Ws(e, t, n, r, i) {
		var a = ae.p;
		ae.p = a !== 0 && 8 > a ? a : 8;
		var o = W.T, s = {};
		s.types = o === null ? null : o.types, W.T = s, nc(e, !1, t, n);
		try {
			var c = i(), l = W.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? tc(e, t, Fa(c, r), Ad(e)) : tc(e, t, r, Ad(e));
		} catch (n) {
			tc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Ad());
		} finally {
			ae.p = a, o !== null && s.types !== null && (o.types = s.types), W.T = o;
		}
	}
	function Gs() {}
	function Ks(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = qs(e).queue;
		Ws(e, a, t, oe, n === null ? Gs : function() {
			return Js(e), n(r);
		});
	}
	function qs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: oe,
			baseState: oe,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: is,
				lastRenderedState: oe
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
	function Js(e) {
		var t = qs(e);
		t.next === null && (t = e.alternate.memoizedState), tc(e, t.next.queue, {}, Ad());
	}
	function Ys() {
		return _a(lh);
	}
	function Xs() {
		return $o().memoizedState;
	}
	function Zs() {
		return $o().memoizedState;
	}
	function Qs(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Ad();
					e = co(n);
					var r = lo(t, e, n);
					r !== null && (Nd(r, t, n), uo(r, t, n)), t = { cache: wa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function $s(e, t, n) {
		var r = Ad();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, rc(e) ? ic(t, n) : (n = _i(e, t, n, r), n !== null && (Nd(n, e, r), ac(n, t, r)));
	}
	function ec(e, t, n) {
		tc(e, t, n, Ad());
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
				if (i.hasEagerState = !0, i.eagerState = s, Pr(s, o)) return gi(e, t, i, 0), Yu === null && hi(), !1;
			} catch {}
			if (n = _i(e, t, i, r), n !== null) return Nd(n, e, r), ac(n, t, r), !0;
		}
		return !1;
	}
	function nc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Pf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, rc(e)) {
			if (t) throw Error(i(479));
		} else t = _i(e, n, r, 2), t !== null && Nd(t, e, 2);
	}
	function rc(e) {
		var t = e.alternate;
		return e === Fo || t !== null && t === Fo;
	}
	function ic(e, t) {
		zo = Ro = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function ac(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, st(e, n);
		}
	}
	var oc = {
		readContext: _a,
		use: ns,
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
	}, sc = {
		readContext: _a,
		use: ns,
		useCallback: function(e, t) {
			return Qo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: _a,
		useEffect: js,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), As(4194308, 4, Ls.bind(null, t, e), n);
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
			if (Bo) {
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
				if (Bo) {
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
			}, r.queue = e, e = e.dispatch = $s.bind(null, Fo, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Qo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = ms(e);
			var t = e.queue, n = ec.bind(null, Fo, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: zs,
		useDeferredValue: function(e, t) {
			return Hs(Qo(), e, t);
		},
		useTransition: function() {
			var e = ms(!1);
			return e = Ws.bind(null, Fo, e.queue, !0, !1), Qo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = Fo, a = Qo();
			if (Xi) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Yu === null) throw Error(i(349));
				Zu & 127 || ls(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, js(ds.bind(null, r, o, e), [e]), r.flags |= 2048, Ds(9, { destroy: void 0 }, us.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Qo(), t = Yu.identifierPrefix;
			if (Xi) {
				var n = Hi, r = Vi;
				n = (r & ~(1 << 32 - We(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Vo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = q++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ys,
		useFormState: Ss,
		useActionState: Ss,
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
			return t.queue = n, t = nc.bind(null, Fo, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: rs,
		useCacheRefresh: function() {
			return Qo().memoizedState = Qs.bind(null, Fo);
		},
		useEffectEvent: function(e) {
			var t = Qo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Ju & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, cc = {
		readContext: _a,
		use: ns,
		useCallback: Bs,
		useContext: _a,
		useEffect: Ms,
		useImperativeHandle: Rs,
		useInsertionEffect: Fs,
		useLayoutEffect: Is,
		useMemo: Vs,
		useReducer: as,
		useRef: ks,
		useState: function() {
			return as(is);
		},
		useDebugValue: zs,
		useDeferredValue: function(e, t) {
			return Us($o(), Io.memoizedState, e, t);
		},
		useTransition: function() {
			var e = as(is)[0], t = $o().memoizedState;
			return [typeof e == "boolean" ? e : ts(e), t];
		},
		useSyncExternalStore: cs,
		useId: Xs,
		useHostTransitionStatus: Ys,
		useFormState: Cs,
		useActionState: Cs,
		useOptimistic: function(e, t) {
			return hs($o(), Io, e, t);
		},
		useMemoCache: rs,
		useCacheRefresh: Zs,
		useEffectEvent: Ps
	}, lc = {
		readContext: _a,
		use: ns,
		useCallback: Bs,
		useContext: _a,
		useEffect: Ms,
		useImperativeHandle: Rs,
		useInsertionEffect: Fs,
		useLayoutEffect: Is,
		useMemo: Vs,
		useReducer: ss,
		useRef: ks,
		useState: function() {
			return ss(is);
		},
		useDebugValue: zs,
		useDeferredValue: function(e, t) {
			var n = $o();
			return Io === null ? Hs(n, e, t) : Us(n, Io.memoizedState, e, t);
		},
		useTransition: function() {
			var e = ss(is)[0], t = $o().memoizedState;
			return [typeof e == "boolean" ? e : ts(e), t];
		},
		useSyncExternalStore: cs,
		useId: Xs,
		useHostTransitionStatus: Ys,
		useFormState: Ts,
		useActionState: Ts,
		useOptimistic: function(e, t) {
			var n = $o();
			return Io === null ? (n.baseState = e, [e, n.queue.dispatch]) : hs(n, Io, e, t);
		},
		useMemoCache: rs,
		useCacheRefresh: Zs,
		useEffectEvent: Ps
	};
	function uc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : T({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var dc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Ad(), i = co(r);
			i.payload = t, n != null && (i.callback = n), t = lo(e, i, r), t !== null && (Nd(t, e, r), uo(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Ad(), i = co(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = lo(e, i, r), t !== null && (Nd(t, e, r), uo(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Ad(), r = co(n);
			r.tag = 2, t != null && (r.callback = t), t = lo(e, r, n), t !== null && (Nd(t, e, n), uo(t, e, n));
		}
	};
	function fc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Fr(n, r) || !Fr(i, a) : !0;
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
		return n = co(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			vc(e, t);
		}, n;
	}
	function xc(e) {
		return e = co(e), e.tag = 3, e;
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
			yc(t, n, r), typeof i != "function" && (_d === null ? _d = /* @__PURE__ */ new Set([this]) : _d.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Cc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ma(t, n, a, !0), n = Co.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return wo === null ? Gd() : n.alternate === null && id === 0 && (id = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Wa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), mf(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Wa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), mf(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return mf(e, r, a), Gd(), !1;
		}
		if (Xi) return t = Co.current, t === null ? (r !== $i && (t = Error(i(423), { cause: r }), oa(Ni(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Ni(r, n), a = bc(e.stateNode, r, a), fo(e, a), id !== 4 && (id = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== $i && (e = Error(i(422), { cause: r }), oa(Ni(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Ni(o, n), ud === null ? ud = [o] : ud.push(o), id !== 4 && (id = 2), t === null) return !0;
		r = Ni(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = bc(n.stateNode, r, e), fo(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (_d === null || !_d.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = xc(a), Sc(a, e, n, r), fo(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var wc = Error(i(461)), Tc = !1;
	function Ec(e, t, n, r) {
		t.child = e === null ? io(t, null, n, r) : ro(t, e.child, n, r);
	}
	function Dc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ga(t), r = Ko(e, t, n, o, a, i), s = Xo(), e !== null && !Tc ? (J(e, t, i), tl(e, t, i)) : (Xi && s && Gi(t), t.flags |= 1, Ec(e, t, r, i), t.child);
	}
	function Oc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !wi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, kc(e, t, a, r, i)) : (e = Di(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !nl(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Fr : n, n(o, r) && e.ref === t.ref) return tl(e, t, i);
		}
		return t.flags |= 1, e = Ti(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function kc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Fr(a, r) && e.ref === t.ref) {
				if (Tc = !1, t.pendingProps = r = a, nl(e, i)) e.flags & 131072 && (Tc = !0);
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
			}, e !== null && za(t, a === null ? null : a.cachePool), a === null ? xo() : bo(t, a), Do(t);
			else return r = t.lanes = 536870912, Mc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && za(t, null), xo(), Oo()) : (za(t, a.cachePool), bo(t, a), Oo(), t.memoizedState = null);
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
			parent: Ca._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && za(t, null), xo(), Do(t), e !== null && ma(e, t, r, !0), t.childLanes = i, null;
	}
	function Nc(e, t) {
		return t = Kc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Pc(e, t, n) {
		return ro(t, e.child, null, n), e = Nc(t, t.pendingProps), e.flags |= 2, ko(t), t.memoizedState = null, e;
	}
	function Fc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (Xi) {
				if (r.mode === "hidden") return e = Nc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, jc(null, e);
				if (Eo(t), (e = Yi) ? (e = sm(e, Qi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Bi === null ? null : {
						id: Vi,
						overflow: Hi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ai(e), n.return = t, t.child = n, Ji = t, Yi = null)) : e = null, e === null) throw ea(t);
				return t.lanes = 536870912, null;
			}
			return Nc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Eo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Pc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Tc || ma(e, t, n, !1), a = (n & e.childLanes) !== 0, Tc || a) {
				if (vo.current === null) {
					if (r = Yu, r !== null && (s = ct(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, vi(e, s), Nd(r, e, s), wc;
					Gd();
				}
				t = Pc(e, t, n);
			} else e = o.treeContext, Yi = dm(s.nextSibling), Ji = t, Xi = !0, Zi = null, Qi = !1, e !== null && qi(t, e), t = Nc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Ti(e.child, {
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
		return ga(t), n = Ko(e, t, n, r, void 0, i), r = Xo(), e !== null && !Tc ? (J(e, t, i), tl(e, t, i)) : (Xi && r && Gi(t), t.flags |= 1, Ec(e, t, n, i), t.child);
	}
	function Rc(e, t, n, r, i, a) {
		return ga(t), t.updateQueue = null, n = Jo(t, r, n, i), qo(e), r = Xo(), e !== null && !Tc ? (J(e, t, a), tl(e, t, a)) : (Xi && r && Gi(t), t.flags |= 1, Ec(e, t, n, a), t.child);
	}
	function zc(e, t, n, r, i) {
		if (ga(t), t.stateNode === null) {
			var a = xi, o = n.contextType;
			typeof o == "object" && o && (a = _a(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = dc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, oo(t), o = n.contextType, a.context = typeof o == "object" && o ? _a(o) : xi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (uc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && dc.enqueueReplaceState(a, a.state, null), ho(t, r, a, i), mo(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = mc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = xi, typeof u == "object" && u && (o = _a(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && pc(t, a, r, o), ao = !1;
			var f = t.memoizedState;
			a.state = f, ho(t, r, a, i), mo(), l = t.memoizedState, s || f !== l || ao ? (typeof d == "function" && (uc(t, n, d, r), l = t.memoizedState), (c = ao || fc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, so(e, t), o = t.memoizedProps, u = mc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = xi, typeof l == "object" && l && (c = _a(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && pc(t, a, r, c), ao = !1, f = t.memoizedState, a.state = f, ho(t, r, a, i), mo();
			var p = t.memoizedState;
			o !== d || f !== p || ao || e !== null && e.dependencies !== null && ha(e.dependencies) ? (typeof s == "function" && (uc(t, n, s, r), p = t.memoizedState), (u = ao || fc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && ha(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Ic(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = ro(t, e.child, null, i), t.child = ro(t, null, n, i)) : Ec(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = tl(e, t, i), e;
	}
	function Bc(e, t, n, r) {
		return ia(), t.flags |= 256, Ec(e, t, n, r), t.child;
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
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= cd), e;
	}
	function Wc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Ao.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (Xi) {
				if (i ? To(t) : Oo(), (e = Yi) ? (e = sm(e, Qi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Bi === null ? null : {
						id: Vi,
						overflow: Hi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ai(e), n.return = t, t.child = n, Ji = t, Yi = null)) : e = null, e === null) throw ea(t);
				return t.lanes = lm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Oo(), i = t.mode, a = Kc({
				mode: "hidden",
				children: a
			}, i), r = Oi(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Hc(n), r.childLanes = Uc(e, o, n), t.memoizedState = Vc, jc(null, r)) : (To(t), Gc(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return Jc(e, t, a, o, r, c, s, n);
		}
		return i ? (Oo(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Ti(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = Oi(i, a, n, null), i.flags |= 2) : i = Ti(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, jc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Hc(n) : (a = i.cachePool, a === null ? a = Ba() : (s = Ca._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = Uc(e, o, n), t.memoizedState = Vc, jc(e.child, r)) : (To(t), n = e.child, e = n.sibling, n = Ti(n, {
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
		return e = Ci(22, e, null, t), e.lanes = 0, e;
	}
	function qc(e, t, n) {
		return ro(t, e.child, null, n), e = Gc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Jc(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (To(t), t.flags &= -257, qc(e, t, c)) : t.memoizedState === null ? (Oo(), o = a.fallback, s = t.mode, a = Kc({
			mode: "visible",
			children: a.children
		}, s), o = Oi(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, ro(t, e.child, null, c), a = t.child, a.memoizedState = Hc(c), a.childLanes = Uc(e, r, c), t.memoizedState = Vc, jc(null, a)) : (Oo(), t.child = e.child, t.flags |= 128, null);
		if (To(t), lm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, oa({
				value: a,
				source: null,
				stack: null
			})), qc(e, t, c);
		}
		if (Tc || ma(e, t, c, !1), r = (c & e.childLanes) !== 0, Tc || r) {
			if (vo.current !== null) return qc(e, t, c);
			if (r = Yu, r !== null && (a = ct(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, vi(e, a), Nd(r, e, a), wc;
			return cm(o) || Gd(), qc(e, t, c);
		}
		return cm(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, Yi = dm(o.nextSibling), Ji = t, Xi = !0, Zi = null, Qi = !1, e !== null && qi(t, e), t = Gc(t, a.children), t.flags |= 134221824, t);
	}
	function Yc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), fa(e.return, t, n);
	}
	function Xc(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && No(n) === null && (t = e), e = e.sibling;
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
		var o = Ao.current;
		if (t.flags & 128) return jo(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, jo(t, o), i === "backwards" && e !== null ? (Qc(e), Ec(e, t, r, n), Qc(e)) : Ec(e, t, r, n), r = Xi ? Li : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
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
					if (e = i.alternate, e !== null && No(e) === null) {
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
		return ua(t, t.type, r.value), Ec(e, t, r.children, n), t.child;
	}
	function tl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), ad |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (ma(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Ti(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Ti(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function nl(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && ha(e)));
	}
	function rl(e, t, n) {
		switch (t.tag) {
			case 3:
				ge(t, t.stateNode.containerInfo), ua(t, Ca, e.memoizedState.cache), ia();
				break;
			case 27:
			case 5:
				ve(t);
				break;
			case 4:
				ge(t, t.stateNode.containerInfo);
				break;
			case 10:
				ua(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Eo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return To(t), t.flags |= 128, null;
					r = ma(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? Wc(e, t, n) : (To(t), e = tl(e, t, n), e === null ? null : e.sibling);
				}
				To(t);
				break;
			case 19:
				if (t.flags & 128) return $c(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (ma(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return $c(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), jo(t, Ao.current), r) break;
				return null;
			case 22: return t.lanes = 0, Ac(e, t, n, t.pendingProps);
			case 24: ua(t, Ca, e.memoizedState.cache);
		}
		return tl(e, t, n);
	}
	function il(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Tc = !0;
			else {
				if (!nl(e, n) && !(t.flags & 128)) return Tc = !1, rl(e, t, n);
				Tc = !!(e.flags & 131072);
			}
		} else Tc = !1, Xi && t.flags & 1048576 && Wi(t, Li, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = qa(t.elementType), t.type = e, typeof e == "function") wi(e) ? (r = mc(e, r), t.tag = 1, t = zc(null, t, e, r, n)) : (t.tag = 0, t = Lc(null, t, e, r, n));
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
						throw t = U(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Lc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = mc(r, t.pendingProps), zc(e, t, r, a, n);
			case 3:
				a: {
					if (ge(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, so(e, t), ho(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ua(t, Ca, r), r !== o.cache && pa(t, [Ca], n, !0), mo(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Bc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Ni(Error(i(424)), t), oa(a), t = Bc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Yi = dm(e.firstChild), Ji = t, Xi = !0, Zi = null, Qi = !0, n = io(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (ia(), r === a) {
							t = tl(e, t, n);
							break a;
						}
						Ec(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Ic(e, t), e === null ? (n = Fm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Xi || (t.stateNode = mp(t.type, t.pendingProps, me.current, t)) : t.memoizedState = Fm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ve(t), e === null && Xi && (r = t.stateNode = _m(t.type, t.pendingProps, me.current), Ji = t, Qi = !0, a = Yi, wp(t.type) ? (fm = a, Yi = dm(r.firstChild)) : Yi = a), Ec(e, t, t.pendingProps.children, n), Ic(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && Xi && ((a = r = Yi) && (r = am(r, t.type, t.pendingProps, Qi), r === null ? a = !1 : (t.stateNode = r, Ji = t, Yi = dm(r.firstChild), Qi = !1, a = !0)), a || ea(t)), ve(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, hp(a, o) ? r = null : s !== null && hp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Ko(e, t, Yo, null, null, n), lh._currentValue = a), Ic(e, t), Ec(e, t, r, n), t.child;
			case 6: return e === null && Xi && ((e = n = Yi) && (n = om(n, t.pendingProps, Qi), n === null ? e = !1 : (t.stateNode = n, Ji = t, Yi = null, e = !0)), e || ea(t)), null;
			case 13: return Wc(e, t, n);
			case 4: return ge(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ro(t, null, r, n) : Ec(e, t, r, n), t.child;
			case 11: return Dc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Ic(e, t), Ec(e, t, r, n), t.child;
			case 8: return Ec(e, t, t.pendingProps.children, n), t.child;
			case 12: return Ec(e, t, t.pendingProps.children, n), t.child;
			case 10: return el(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, ga(t), a = _a(a), r = r(a), t.flags |= 1, Ec(e, t, r, n), t.child;
			case 14: return Oc(e, t, t.type, t.pendingProps, n);
			case 15: return kc(e, t, t.type, t.pendingProps, n);
			case 19: return $c(e, t, n);
			case 31: return Fc(e, t, n);
			case 22: return Ac(e, t, n, t.pendingProps);
			case 24: return ga(t), r = _a(Ca), e === null ? (a = Ra(), a === null && (a = Yu, o = wa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, oo(t), ua(t, Ca, a)) : ((e.lanes & n) !== 0 && (so(e, t), ho(t, null, null, n), mo()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ua(t, Ca, r), r !== a.cache && pa(t, [Ca], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ua(t, Ca, r))), Ec(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : Xi && Gi(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Ic(e, t), Ec(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function al(e) {
		e.flags |= 4;
	}
	function ol(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Xm(t, r) : Xm(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Hd()) e.flags |= 8192;
				else throw Ja = Wa, Ha;
			}
		} else e.flags &= -16777217;
	}
	function sl(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Zm(t)) {
			if (Hd()) e.flags |= 8192;
			else throw Ja = Wa, Ha;
		}
	}
	function cl(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : nt(), e.lanes |= t, ld |= t);
	}
	function ll(e, t) {
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
	function ul(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function dl(e, t, n) {
		var r = t.pendingProps;
		switch (Ki(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return ul(t), null;
			case 1: return ul(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), da(Ca), _e(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ra(t) ? al(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, aa())), ul(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (al(t), o === null ? (ul(t), ol(t, a, null, r, n)) : (ul(t), sl(t, o))) : o ? o === e.memoizedState ? (ul(t), t.flags &= -16777217) : (al(t), ul(t), sl(t, o)) : (e = e.memoizedProps, e !== r && al(t), ul(t), ol(t, a, e, r, n)), null;
			case 27:
				if (ye(t), n = me.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && al(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return ul(t), t.subtreeFlags &= -33554433, null;
					}
					e = fe.current, ra(t) ? ta(t, e) : (e = _m(a, r, n), t.stateNode = e, al(t));
				}
				return ul(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (ye(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && al(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return ul(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = fe.current, ra(t)) ta(t, o);
					else {
						var s = dp(me.current);
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
						a: switch (ip(o, a, r), a) {
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
						r && al(t);
					}
				}
				return ul(t), t.subtreeFlags &= -33554433, ol(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && al(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = me.current, ra(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Ji, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[mt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || tp(e.nodeValue, n)), e || ea(t, !0);
					} else e = dp(e).createTextNode(r), e[mt] = t, t.stateNode = e;
				}
				return ul(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ra(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[mt] = t;
						} else ia(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						ul(t), e = !1;
					} else n = aa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (ko(t), t) : (ko(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return ul(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ra(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[mt] = t;
						} else ia(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						ul(t), a = !1;
					} else a = aa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (ko(t), t) : (ko(t), null);
				}
				return ko(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), cl(t, t.updateQueue), ul(t), null);
			case 4: return _e(), e === null && Gf(t.stateNode.containerInfo), t.flags |= 67108864, ul(t), null;
			case 10: return da(t.type), ul(t), null;
			case 19:
				if (Mo(t), r = t.memoizedState, r === null) return ul(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) ll(r, !1);
					else {
						if (id !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = No(e), o !== null) {
								for (t.flags |= 128, ll(r, !1), e = o.updateQueue, t.updateQueue = e, cl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Ei(n, e), n = n.sibling;
								return jo(t, Ao.current & 1 | 2), Xi && Ui(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Me() > hd && (t.flags |= 128, a = !0, ll(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = No(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, cl(t, e), ll(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !Xi) return ul(t), null;
						} else 2 * Me() - r.renderingStartTime > hd && n !== 536870912 && (t.flags |= 128, a = !0, ll(r, !1), t.lanes = 4194304);
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
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Me(), e.sibling = null, o = Ao.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || Xi ? jo(t, o) : (n = o, de(Co, t), de(Ao, n), wo === null && (wo = t)), Xi && Ui(t, r.treeForkCount), e;
				}
				return ul(t), null;
			case 22:
			case 23: return ko(t), So(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (ul(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ul(t), n = t.updateQueue, n !== null && cl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && ue(La), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), da(Ca), ul(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, ul(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function fl(e, t) {
		switch (Ki(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return da(Ca), _e(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ye(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (ko(t), t.alternate === null) throw Error(i(340));
					ia();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (ko(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					ia();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Mo(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return _e(), null;
			case 10: return da(t.type), null;
			case 22:
			case 23: return ko(t), So(), e !== null && ue(La), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return da(Ca), null;
			case 25: return null;
			default: return null;
		}
	}
	function pl(e, t) {
		switch (Ki(t), t.tag) {
			case 3:
				da(Ca), _e();
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
				t.memoizedState !== null && ko(t);
				break;
			case 13:
				ko(t);
				break;
			case 19:
				Mo(t);
				break;
			case 10:
				da(t.type);
				break;
			case 22:
			case 23:
				ko(t), So(), e !== null && ue(La);
				break;
			case 24: da(Ca);
		}
	}
	function ml(e, t) {
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
			pf(t, t.return, e);
		}
	}
	function hl(e, t, n) {
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
								pf(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			pf(t, t.return, e);
		}
	}
	function gl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				_o(t, n);
			} catch (t) {
				pf(e, e.return, t);
			}
		}
	}
	function _l(e, t, n) {
		n.props = mc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			pf(e, t, n);
		}
	}
	function vl(e, t) {
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
						(i.ref === null || i.ref.name !== a) && (i.ref = Ip(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Lp(e);
							f(e.child, !1, em, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			pf(e, t, n);
		}
	}
	function yl(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				pf(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				pf(e, t, n);
			}
			else n.current = null;
		}
	}
	function bl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) nm(e.stateNode, t[n]);
	}
	function xl(e) {
		for (var t = e.return; t !== null && (wl(t) && nm(e.stateNode, t.stateNode), !Cl(t));) t = t.return;
	}
	function Sl(e) {
		for (var t = e.return; t !== null && (wl(t) && rm(e.stateNode, t.stateNode), !Cl(t));) t = t.return;
	}
	function Cl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function wl(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function Tl(e) {
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
			pf(e, e.return, t);
		}
	}
	function El(e, t, n) {
		try {
			var r = e.stateNode;
			op(r, e.type, n, t), r[ht] = t;
		} catch (t) {
			pf(e, e.return, t);
		}
	}
	function Dl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && wp(e.type) || e.tag === 4;
	}
	function Ol(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Dl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && wp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function kl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = dn)), bl(e, r), Rt = !0;
		else if (i !== 4 && (i === 27 && (bl(e, r), r = null, wp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (kl(e, t, n, r), e = e.sibling; e !== null;) kl(e, t, n, r), e = e.sibling;
	}
	function Al(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), bl(e, r), Rt = !0;
		else if (i !== 4 && (i === 27 && (bl(e, r), r = null, wp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Al(e, t, n, r), e = e.sibling; e !== null;) Al(e, t, n, r), e = e.sibling;
	}
	function jl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			ip(t, r, n), t[mt] = e, t[ht] = n;
		} catch (t) {
			pf(e, e.return, t);
		}
	}
	var Ml = !1, Nl = null;
	function Pl(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Ml = !0);
	}
	var Fl = null;
	function Il() {
		var e = Fl;
		return Fl = null, e;
	}
	var Ll = 0;
	function Rl(e, t, n, r, i) {
		return Ll = 0, zl(e.child, t, n, r, i);
	}
	function zl(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Ap(o);
					r.push(s), s.view && (a = !0);
				} else a || Ap(o).view && (a = !0);
				Ml = !0, Dp(o, Ll === 0 ? t : t + "_" + Ll, n), Ll++;
			} else e.tag === 22 && e.memoizedState !== null || e.tag === 30 && i || zl(e.child, t, n, r, i) && (a = !0);
			e = e.sibling;
		}
		return a;
	}
	function Bl(e, t) {
		for (; e !== null;) e.tag === 5 ? Op(e.stateNode, e.memoizedProps) : e.tag === 22 && e.memoizedState !== null || e.tag === 30 && t || Bl(e.child, t), e = e.sibling;
	}
	function Vl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (Vl(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = di(t.default, t.share), t !== "none" && (Rl(e, n, t, null, !1) || Bl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Hl(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = li(r, n), a = di(r.default, n.paired ? r.share : r.enter);
			a === "none" ? Vl(e) : Rl(e, i, a, null, !1) ? (Vl(e), n.paired || t || Md(e, r.onEnter)) : Bl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Hl(e, t), e = e.sibling;
		else Vl(e);
	}
	function Ul(e) {
		if (Nl !== null && Nl.size !== 0) {
			var t = Nl;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = di(n.default, n.share);
								if (a !== "none" && (Rl(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Md(e, n.onShare)) : Bl(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					Ul(e);
				}
				e = e.sibling;
			}
		}
	}
	function Wl(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = li(t, e.stateNode), r = Nl === null ? void 0 : Nl.get(n), i = di(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Rl(e, n, i, null, !1) ? r === void 0 ? Md(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Nl.delete(n), Md(e, t.onShare)) : Bl(e.child, !1)), Nl !== null && Ul(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Wl(e), e = e.sibling;
		else Nl !== null && Ul(e);
	}
	function Gl(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = li(t, e.stateNode);
				t = di(t.default, t.update), e.flags &= -5, t !== "none" && Rl(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && Gl(e);
			e = e.sibling;
		}
	}
	function Kl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, Bl(e.child, !1));
				}
				Kl(e);
			}
			e = e.sibling;
		}
	}
	function ql(e) {
		if (e.tag === 30) e.stateNode.paired = null, Bl(e.child, !1), Kl(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) ql(e), e = e.sibling;
		else Kl(e);
	}
	function Jl(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? Bl(e.child, !1) : e.subtreeFlags & 33554432 && Jl(e), e = e.sibling;
	}
	function Yl(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && Ll < a.length) {
					var l = a[Ll], u = Ap(c);
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
				e.flags & 4 && Dp(c, Ll === 0 ? n : n + "_" + Ll, i), s && e.flags & 4 || (Fl === null && (Fl = []), Fl.push(c, Ll === 0 ? r : r + "_" + Ll, t.memoizedProps)), Ll++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : Yl(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function Xl(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = li(n, r), a = di(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(jp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				Ll = 0, i = Yl(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Md(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && Xl(e, t);
			e = e.sibling;
		}
	}
	var Zl = !1, Ql = !1, $l = !1, eu = !1, tu = typeof WeakSet == "function" ? WeakSet : Set, nu = null, ru = !1, iu = !1, au = !1, ou = !1;
	function su(e, t, n) {
		if (e = e.containerInfo, lp = vh, e = Br(e), Vr(e)) {
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
		for (up = {
			focusedElem: e,
			selectionRange: r
		}, vh = !1, n = (n & 335544064) === n, nu = t, t = n ? 9270 : 1024; nu !== null;) {
			if (e = nu, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && Wl(r[a]);
			if (e.alternate === null && e.flags & 2) n && Pl(e), cu(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && Wl(r), cu(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Pl(e), cu(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, nu = r) : (n && Gl(e), cu(n));
			}
		}
		Nl = null;
	}
	function cu(e) {
		for (; nu !== null;) {
			var t = nu, n = e, r = t.alternate, a = t.flags;
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
							pf(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) im(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								im(r);
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
					n && r !== null && (n = li(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = di(a.default, a.update), a !== "none" && Rl(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, nu = r;
				break;
			}
			nu = t.return;
		}
	}
	function lu(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				ku(e, n), r & 4 && ml(5, n);
				break;
			case 1:
				if (ku(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						pf(n, n.return, e);
					}
					else {
						var i = mc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							pf(n, n.return, e);
						}
					}
				}
				r & 64 && gl(n), r & 512 && vl(n, n.return);
				break;
			case 3:
				if (ku(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						_o(e, t);
					} catch (e) {
						pf(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && jl(n);
			case 26:
			case 5:
				ku(e, n), t === null && r & 4 && Tl(n), r & 512 && vl(n, n.return);
				break;
			case 12:
				ku(e, n);
				break;
			case 31:
				ku(e, n), r & 4 && vu(e, n);
				break;
			case 13:
				ku(e, n), r & 4 && yu(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = _f.bind(null, n), um(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Zl, !r) {
					var a = t !== null && t.memoizedState !== null || Ql;
					t = Zl, i = Ql, Zl = r, (Ql = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), ju(e, n, r)) : ku(e, n), Zl = t, Ql = i;
				}
				break;
			case 30:
				ku(e, n), r & 512 && vl(n, n.return);
				break;
			case 7: r & 512 && vl(n, n.return);
			default: ku(e, n);
		}
	}
	function uu(e, t) {
		for (e = e.child; e !== null;) du(e, t), e = e.sibling;
	}
	function du(e, t) {
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
					pf(e, e.return, t);
				}
				fu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, Rt = !0;
				} catch (t) {
					pf(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? Ep(s, !0) : Ep(e.stateNode, !1);
				} catch (t) {
					pf(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && uu(e, t);
				break;
			default: uu(e, t);
		}
	}
	function fu(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						du(n, r);
						break a;
					case 22:
						n.memoizedState === null && fu(n, r);
						break a;
					default: fu(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function pu(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, pu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ct(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var mu = null, hu = !1;
	function gu(e, t, n) {
		for (n = n.child; n !== null;) _u(e, t, n), n = n.sibling;
	}
	function _u(e, t, n) {
		if (He && typeof He.onCommitFiberUnmount == "function") try {
			He.onCommitFiberUnmount(Ve, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Ql || yl(n, t), gu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Ql && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Ql || yl(n, t), Sl(n);
				var r = mu, i = hu;
				wp(n.type) && (mu = n.stateNode, hu = !1), gu(e, t, n), vm(n.stateNode, n.type, n.memoizedProps), mu = r, hu = i;
				break;
			case 5: Ql || yl(n, t), Sl(n);
			case 6:
				if (n.tag === 6 && Sl(n), r = mu, i = hu, mu = null, gu(e, t, n), mu = r, hu = i, mu !== null) {
					if (hu) try {
						(mu.nodeType === 9 ? mu.body : mu.nodeName === "HTML" ? mu.ownerDocument.body : mu).removeChild(n.stateNode), Rt = !0;
					} catch (e) {
						pf(n, t, e);
					}
					else try {
						mu.removeChild(n.stateNode), Rt = !0;
					} catch (e) {
						pf(n, t, e);
					}
				}
				break;
			case 18:
				mu !== null && (hu ? (e = mu, Tp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Wh(e)) : Tp(mu, n.stateNode));
				break;
			case 4:
				r = mu, i = hu, mu = n.stateNode.containerInfo, hu = !0, gu(e, t, n), mu = r, hu = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				hl(2, n, t), Ql || hl(4, n, t), gu(e, t, n);
				break;
			case 1:
				Ql || (yl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && _l(n, t, r)), gu(e, t, n);
				break;
			case 21:
				gu(e, t, n);
				break;
			case 22:
				Ql = (r = Ql) || n.memoizedState !== null, gu(e, t, n), Ql = r;
				break;
			case 30:
				yl(n, t), gu(e, t, n);
				break;
			case 7:
				Ql || yl(n, t), gu(e, t, n);
				break;
			default: gu(e, t, n);
		}
	}
	function vu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Wh(e);
			} catch (e) {
				pf(t, t.return, e);
			}
		}
	}
	function yu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Wh(e);
		} catch (e) {
			pf(t, t.return, e);
		}
	}
	function bu(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new tu()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new tu()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function xu(e, t) {
		var n = bu(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = vf.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Su(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (wp(l.type)) {
							mu = l.stateNode, hu = !1;
							break a;
						}
						break;
					case 5:
						mu = l.stateNode, hu = !1;
						break a;
					case 3:
					case 4:
						mu = l.stateNode.containerInfo, hu = !0;
						break a;
				}
				l = l.return;
			}
			if (mu === null) throw Error(i(160));
			_u(s, c, o), mu = null, hu = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) wu(t, e, n), t = t.sibling;
	}
	var Cu = null;
	function wu(e, t, n) {
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
				Su(t, e, n), Tu(e), a & 4 && (hl(3, e, e.return), ml(3, e), hl(5, e, e.return));
				break;
			case 1:
				Su(t, e, n), Tu(e), a & 512 && (Ql || r === null || yl(r, r.return)), a & 64 && Zl && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = Cu, Su(t, e, n), Tu(e), a & 512 && (Ql || r === null || yl(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (Zl) e.stateNode = mp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[xt] || r[mt] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), ip(r, t, n), r[mt] = e, Ot(r), t = r;
												break a;
											case "link":
												if (o = qm("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), ip(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = qm("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), ip(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[mt] = e, Ot(r), t = r;
									}
									e.stateNode = t;
								}
							} else Zl || Jm(o, e.type, e.stateNode);
						} else e.stateNode = Hm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && El(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || Ql || t.parentNode.removeChild(t)) : a.count--, n === null ? Zl || Jm(o, e.type, e.stateNode) : Hm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				Su(t, e, n), Tu(e), a & 512 && (Ql || r === null || yl(r, r.return)), r !== null && a & 4 && El(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = $l, $l = !1, Su(t, e, n), $l = o, Tu(e), a & 512 && (Ql || r === null || yl(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						nn(t, ""), Rt = !0;
					} catch (t) {
						pf(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, El(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (eu = !0);
				break;
			case 6:
				if (Su(t, e, n), Tu(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, Rt = !0;
					} catch (t) {
						pf(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Rt = !1, Km = null, o = Cu, Cu = Sm(t.containerInfo), Su(t, e, n), Cu = o, Tu(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Wh(t.containerInfo);
				} catch (t) {
					pf(e, e.return, t);
				}
				eu && (eu = !1, Eu(e)), Rt = !1;
				break;
			case 4:
				a = $l, $l = Zl, r = zt(), o = Cu, Cu = Sm(e.stateNode.containerInfo), Su(t, e, n), Tu(e), Cu = o, Rt && iu && (au = !0), Rt = r, $l = a;
				break;
			case 12:
				Su(t, e, n), Tu(e);
				break;
			case 31:
				Su(t, e, n), Tu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, xu(e, t)));
				break;
			case 13:
				Su(t, e, n), Tu(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (pd = Me()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, xu(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = Zl, l = Ql, u = $l;
				Zl = c || o, $l = u || o, Ql = l || s, Su(t, e, n), Ql = l, $l = u, Zl = c, Tu(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || Zl || Ql || (t = s || Ql, n = Zl, r = Ql, Zl = o || Zl, Ql = t, Au(e, 2), Zl = n, Ql = r), !o && $l || uu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, xu(e, n))));
				break;
			case 19:
				Su(t, e, n), Tu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, xu(e, t)));
				break;
			case 30:
				a & 512 && (Ql || r === null || yl(r, r.return)), a = zt(), o = iu, s = (n & 335544064) === n, c = e.memoizedProps, iu = s && di(c.default, c.update) !== "none", Su(t, e, n), Tu(e), s && r !== null && Rt && (e.flags |= 4), iu = o, Rt = a;
				break;
			case 21: break;
			case 7: a & 512 && (Ql || r === null || yl(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: Su(t, e, n), Tu(e);
		}
	}
	function Tu(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Dl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (wl(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Cl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						Al(e, Ol(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (nn(l, ""), n.flags &= -33), Al(e, Ol(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						kl(e, Ol(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				pf(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Eu(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Eu(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, vh = !0, t.reset(), vh = !1), e = e.sibling;
		}
	}
	function Du(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Ou(t, e), t = t.sibling;
		else Xl(t, !1);
	}
	function Ou(e, t) {
		var n = e.alternate;
		if (n === null) Hl(e, !1);
		else switch (e.tag) {
			case 3:
				if (ou = ru = !1, Il(), Du(t, e), !ru && !au) {
					if (e = Fl, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Op(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
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
					})), ou = !0;
				}
				Fl = null;
				break;
			case 5:
				Du(t, e);
				break;
			case 4:
				r = ru, ru = !1, Du(t, e), ru && (au = !0), ru = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? Du(t, e) : Hl(e, !1));
				break;
			case 30:
				r = ru, i = Il(), ru = !1, Du(t, e), ru && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = li(a, o), o = li(n.memoizedProps, o);
				var s = di(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, Ll = 0, t = Yl(e, n, t, o, s, a, !0), Ll !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Md(e, e.memoizedProps.onUpdate), Fl = i) : i !== null && (i.push.apply(i, Fl), Fl = i), ru = e.flags & 32 ? !0 : r;
				break;
			default: Du(t, e);
		}
	}
	function ku(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) lu(e, t.alternate, t), t = t.sibling;
	}
	function Au(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					hl(4, n, n.return), Au(n, r);
					break;
				case 1:
					yl(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && _l(n, n.return, i), Au(n, r);
					break;
				case 27: r & 2 && vm(n.stateNode, n.type, n.memoizedProps);
				case 5:
					yl(n, n.return), n.tag !== 5 && n.tag !== 27 || Sl(n), Au(n, r);
					break;
				case 6:
					Sl(n);
					break;
				case 26:
					yl(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || Ql || i.parentNode.removeChild(i), Au(n, r);
					break;
				case 22:
					n.memoizedState === null && Au(n, r);
					break;
				case 30:
					yl(n, n.return), Au(n, r);
					break;
				case 7: yl(n, n.return);
				default: Au(n, r);
			}
			e = e.sibling;
		}
	}
	function ju(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					ju(i, a, n), ml(4, a);
					break;
				case 1:
					if (ju(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						pf(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) go(l[i], c);
						} catch (e) {
							pf(r, r.return, e);
						}
					}
					s && o & 64 && gl(a), vl(a, a.return);
					break;
				case 27: n & 2 && jl(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || xl(a), ju(i, a, n), s && r === null && o & 4 && Tl(a), vl(a, a.return);
					break;
				case 6:
					xl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || Zl || Jm(Sm(c.ownerDocument), a.type, c), ju(i, a, n), s && r === null && o & 4 && Tl(a), vl(a, a.return);
					break;
				case 12:
					ju(i, a, n);
					break;
				case 31:
					ju(i, a, n), s && o & 4 && vu(i, a);
					break;
				case 13:
					ju(i, a, n), s && o & 4 && yu(i, a);
					break;
				case 22:
					a.memoizedState === null && ju(i, a, n), vl(a, a.return);
					break;
				case 30:
					ju(i, a, n), vl(a, a.return);
					break;
				case 7: vl(a, a.return);
				default: ju(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Mu(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Ta(n));
	}
	function Nu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ta(e));
	}
	function Pu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Fu(e, t, n, r), t = t.sibling;
		else i && Jl(t);
	}
	function Fu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && ql(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Pu(e, t, n, r), a & 2048 && ml(9, t);
				break;
			case 1:
				Pu(e, t, n, r);
				break;
			case 3:
				Pu(e, t, n, r), i && ou && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Ta(a)));
				break;
			case 12:
				if (a & 2048) {
					Pu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						pf(t, t.return, e);
					}
				} else Pu(e, t, n, r);
				break;
			case 31:
				Pu(e, t, n, r);
				break;
			case 13:
				Pu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && ql(t), o._visibility & 2 ? Pu(e, t, n, r) : (o._visibility |= 2, Iu(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && ql(s), o._visibility & 2 ? Pu(e, t, n, r) : Lu(e, t)), a & 2048 && Mu(s, t);
				break;
			case 24:
				Pu(e, t, n, r), a & 2048 && Nu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Bl(a.child, !0), Bl(t.child, !0))), Pu(e, t, n, r);
				break;
			default: Pu(e, t, n, r);
		}
	}
	function Iu(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Iu(a, o, s, c, i), ml(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Iu(a, o, s, c, i)) : u._visibility & 2 ? Iu(a, o, s, c, i) : Lu(a, o), i && l & 2048 && Mu(o.alternate, o);
					break;
				case 24:
					Iu(a, o, s, c, i), i && l & 2048 && Nu(o.alternate, o);
					break;
				default: Iu(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Lu(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Lu(n, r), i & 2048 && Mu(r.alternate, r);
					break;
				case 24:
					Lu(n, r), i & 2048 && Nu(r.alternate, r);
					break;
				default: Lu(n, r);
			}
			t = t.sibling;
		}
	}
	var Ru = 8192;
	function zu(e, t, n) {
		if (e.subtreeFlags & Ru) for (e = e.child; e !== null;) Bu(e, t, n), e = e.sibling;
	}
	function Bu(e, t, n) {
		switch (e.tag) {
			case 26:
				zu(e, t, n), e.flags & Ru && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && $m(n, e)) : eh(n, Cu, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				zu(e, t, n), e.flags & Ru && (e = e.stateNode, (t & 335544128) === t && $m(n, e));
				break;
			case 3:
			case 4:
				var r = Cu;
				Cu = Sm(e.stateNode.containerInfo), zu(e, t, n), Cu = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ru, Ru = 16777216, zu(e, t, n), Ru = r) : zu(e, t, n));
				break;
			case 30:
				if ((e.flags & Ru) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Nl === null && (Nl = /* @__PURE__ */ new Map()), Nl.set(r, i);
				}
				zu(e, t, n);
				break;
			default: zu(e, t, n);
		}
	}
	function Vu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Hu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				nu = r, Gu(r, e);
			}
			Vu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Uu(e), e = e.sibling;
	}
	function Uu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Hu(e), e.flags & 2048 && hl(9, e, e.return);
				break;
			case 3:
				Hu(e);
				break;
			case 12:
				Hu(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Wu(e)) : Hu(e);
				break;
			default: Hu(e);
		}
	}
	function Wu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				nu = r, Gu(r, e);
			}
			Vu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					hl(8, t, t.return), Wu(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Wu(t));
					break;
				default: Wu(t);
			}
			e = e.sibling;
		}
	}
	function Gu(e, t) {
		for (; nu !== null;) {
			var n = nu;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					hl(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Ta(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, nu = r;
			else a: for (n = e; nu !== null;) {
				r = nu;
				var i = r.sibling, a = r.return;
				if (pu(r), r === n) {
					nu = null;
					break a;
				}
				if (i !== null) {
					i.return = a, nu = i;
					break a;
				}
				nu = a;
			}
		}
	}
	var Ku = {
		getCacheForType: function(e) {
			var t = _a(Ca), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return _a(Ca).controller.signal;
		}
	}, qu = typeof WeakMap == "function" ? WeakMap : Map, Ju = 0, Yu = null, Xu = null, Zu = 0, Qu = 0, $u = null, ed = !1, td = !1, nd = !1, rd = 0, id = 0, ad = 0, od = 0, sd = 0, cd = 0, ld = 0, ud = null, dd = null, fd = !1, pd = 0, md = 0, hd = Infinity, gd = null, _d = null, vd = 0, yd = null, bd = null, xd = 0, Sd = 0, Cd = null, wd = null, Td = null, Ed = null, Dd = null, Od = 0, kd = null;
	function Ad() {
		return Ju & 2 && Zu !== 0 ? Zu & -Zu : W.T === null ? dt() : Pf();
	}
	function jd() {
		if (cd === 0) {
			if (!(Zu & 536870912) || Xi) {
				var e = Ye;
				Ye <<= 1, !(Ye & 3932160) && (Ye = 262144), cd = e;
			} else cd = 536870912;
		}
		return e = Co.current, e !== null && (e.flags |= 32), cd;
	}
	function Md(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Ip(li(e.memoizedProps, n))), Ed === null && (Ed = []), Ed.push(t.bind(null, r));
		}
	}
	function Nd(e, t, n) {
		(e === Yu && (Qu === 2 || Qu === 9) || e.cancelPendingCommit !== null) && (Bd(e, 0), Ld(e, Zu, cd, !1)), it(e, n), Ju & 2 && e === Yu || (e === Yu && (!(Ju & 2) && (od |= n), id === 4 && Ld(e, Zu, cd, !1)), Ef(e));
	}
	function Pd(e, t, n) {
		if (Ju & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || $e(e, t), a = r ? Jd(e, t) : Kd(e, t, !0), o = r;
		do {
			if (a === 0) {
				td && !r && Ld(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Id(n)) a = Kd(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = ud;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Bd(c, s).flags |= 256), s = Kd(c, s, !1), s !== 2 && s !== 6) {
								if (nd && !l) {
									c.errorRecoveryDisabledLanes |= o, od |= o, a = 4;
									break a;
								}
								o = dd, dd = a, o !== null && (dd === null ? dd = o : dd.push.apply(dd, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Bd(e, 0), Ld(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Ld(r, t, cd, !ed);
							break a;
						case 2:
							dd = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = pd + 300 - Me(), 10 < a)) {
						if (Ld(r, t, cd, !ed), Qe(r, 0, !0) !== 0) break a;
						xd = t, r.timeoutHandle = vp(Fd.bind(null, r, n, dd, gd, fd, t, cd, od, ld, ed, o, "Throttled", -0, 0), a);
						break a;
					}
					Fd(r, n, dd, gd, fd, t, cd, od, ld, ed, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		Ef(e);
	}
	function Fd(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
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
		}, Nl = null, Bu(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = ih.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? pd - Me() : (a & 4194048) === a ? md - Me() : 0, m = nh(d, m), m !== null) ? (xd = a, e.cancelPendingCommit = m(tf.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Ld(e, a, o, !l)) : tf(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Id(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Pr(a(), i)) return !1;
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
	function Ld(e, t, n, r) {
		t = et(e, t), t &= ~sd, t &= ~od, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - We(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && ot(e, n, t);
	}
	function Rd() {
		return Ju & 6 ? !0 : (Df(0, !1), !1);
	}
	function zd() {
		if (Xu !== null) {
			if (Qu === 0) var e = Xu.return;
			else e = Xu, la = ca = null, Zo(e), Za = null, Qa = 0, e = Xu;
			for (; e !== null;) pl(e.alternate, e), e = e.return;
			Xu = null;
		}
	}
	function Bd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, yp(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), xd = 0, zd(), Yu = e, Xu = n = Ti(e.current, null), Zu = t, Qu = 0, $u = null, ed = !1, td = $e(e, t), nd = !1, ld = cd = sd = od = ad = id = 0, dd = ud = null, fd = !1, rd = et(e, t), hi(), n;
	}
	function Vd(e, t) {
		Fo = null, W.H = oc, t === Va || t === Ua ? (t = Ya(), Qu = 3) : t === Ha ? (t = Ya(), Qu = 4) : Qu = t === wc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, $u = t, Xu === null && (id = 1, vc(e, Ni(t, e.current)));
	}
	function Hd() {
		var e = Co.current;
		return e === null ? !0 : (Zu & 4194048) === Zu ? wo === null : (Zu & 62914560) === Zu || Zu & 536870912 ? e === wo : !1;
	}
	function Ud() {
		var e = W.H;
		return W.H = oc, e === null ? oc : e;
	}
	function Wd() {
		var e = W.A;
		return W.A = Ku, e;
	}
	function Gd() {
		id = 4, ed || (Zu & 4194048) !== Zu && Co.current !== null || (td = !0), !(ad & 134217727) && !(od & 134217727) || Yu === null || Ld(Yu, Zu, cd, !1);
	}
	function Kd(e, t, n) {
		var r = Ju;
		Ju |= 2;
		var i = Ud(), a = Wd();
		(Yu !== e || Zu !== t) && (gd = null, Bd(e, t)), t = !1;
		var o = id;
		a: do
			try {
				if (Qu !== 0 && Xu !== null) {
					var s = Xu, c = $u;
					switch (Qu) {
						case 8:
							zd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Co.current === null && (t = !0);
							var l = Qu;
							if (Qu = 0, $u = null, Qd(e, s, c, l), n && td) {
								o = 0;
								break a;
							}
							break;
						default: l = Qu, Qu = 0, $u = null, Qd(e, s, c, l);
					}
				}
				qd(), o = id;
				break;
			} catch (t) {
				Vd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, la = ca = null, Ju = r, W.H = i, W.A = a, Xu === null && (Yu = null, Zu = 0, hi()), o;
	}
	function qd() {
		for (; Xu !== null;) Xd(Xu);
	}
	function Jd(e, t) {
		var n = Ju;
		Ju |= 2;
		var r = Ud(), a = Wd();
		Yu !== e || Zu !== t ? (gd = null, hd = Me() + 500, Bd(e, t)) : td = $e(e, t);
		a: do
			try {
				if (Qu !== 0 && Xu !== null) {
					t = Xu;
					var o = $u;
					b: switch (Qu) {
						case 1:
							Qu = 0, $u = null, Qd(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Ga(o)) {
								Qu = 0, $u = null, Zd(t);
								break;
							}
							t = function() {
								Qu !== 2 && Qu !== 9 || Yu !== e || (Qu = 7), Ef(e);
							}, o.then(t, t);
							break a;
						case 3:
							Qu = 7;
							break a;
						case 4:
							Qu = 5;
							break a;
						case 7:
							Ga(o) ? (Qu = 0, $u = null, Zd(t)) : (Qu = 0, $u = null, Qd(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Xu.tag) {
								case 26: s = Xu.memoizedState;
								case 5:
								case 27:
									var c = Xu;
									if (s ? Zm(s) : c.stateNode.complete) {
										Qu = 0, $u = null;
										var l = c.sibling;
										if (l !== null) Xu = l;
										else {
											var u = c.return;
											u === null ? Xu = null : (Xu = u, $d(u));
										}
										break b;
									}
							}
							Qu = 0, $u = null, Qd(e, t, o, 5);
							break;
						case 6:
							Qu = 0, $u = null, Qd(e, t, o, 6);
							break;
						case 8:
							zd(), id = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Yd();
				break;
			} catch (t) {
				Vd(e, t);
			}
		while (1);
		return la = ca = null, W.H = r, W.A = a, Ju = n, Xu === null ? (Yu = null, Zu = 0, hi(), id) : 0;
	}
	function Yd() {
		for (; Xu !== null && !Ae();) Xd(Xu);
	}
	function Xd(e) {
		var t = il(e.alternate, e, rd);
		e.memoizedProps = e.pendingProps, t === null ? $d(e) : Xu = t;
	}
	function Zd(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Rc(n, t, t.pendingProps, t.type, void 0, Zu);
				break;
			case 11:
				t = Rc(n, t, t.pendingProps, t.type.render, t.ref, Zu);
				break;
			case 5:
				Zo(t);
				var r = t;
				r === Ji && (Xi ? (na(r), r.tag === 5 && r.stateNode != null && (Yi = r.stateNode)) : (na(r), Xi = !0));
			default: pl(n, t), t = Xu = Ei(t, rd), t = il(n, t, rd);
		}
		e.memoizedProps = e.pendingProps, t === null ? $d(e) : Xu = t;
	}
	function Qd(e, t, n, r) {
		la = ca = null, Zo(t), Za = null, Qa = 0;
		var i = t.return;
		try {
			if (Cc(e, i, t, n, Zu)) {
				id = 1, vc(e, Ni(n, e.current)), Xu = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Xu = i, t;
			id = 1, vc(e, Ni(n, e.current)), Xu = null;
			return;
		}
		t.flags & 32768 ? (Xi || r === 1 ? e = !0 : td || Zu & 536870912 ? e = !1 : (ed = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Co.current, r !== null && r.tag === 13 && (r.flags |= 16384))), ef(t, e)) : $d(t);
	}
	function $d(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				ef(t, ed);
				return;
			}
			e = t.return;
			var n = dl(t.alternate, t, rd);
			if (n !== null) {
				Xu = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Xu = t;
				return;
			}
			Xu = t = e;
		} while (t !== null);
		id === 0 && (id = 5);
	}
	function ef(e, t) {
		do {
			var n = fl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Xu = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Xu = e;
				return;
			}
			Xu = e = n;
		} while (e !== null);
		id = 6, Xu = null;
	}
	function tf(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			uf();
		while (vd !== 0);
		if (Ju & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === Yu && (Xu = Yu = null, Zu = 0), bd = t, yd = e, xd = n, Cd = a, wd = r, nf(e, t, n, s, c, l, f);
		}
	}
	function nf(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (Sd = s, s |= mi, at(e, n, s, r, i, a), Ed = null, (n & 335544064) === n ? (Dd = Oa(e), r = 10262) : (Dd = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, yf(Ie, function() {
			return df(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Ml = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = W.T, W.T = null, i = ae.p, ae.p = 2, a = Ju, Ju |= 4;
			try {
				su(e, t, n);
			} finally {
				Ju = a, ae.p = i, W.T = r;
			}
		}
		vd = 1, Ml ? Td = Pp(o, e.containerInfo, Dd, of, sf, af, cf, df, rf, null, null) : (of(), sf(), cf());
	}
	function rf(e) {
		if (vd !== 0) {
			var t = yd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function af() {
		vd === 3 && (vd = 0, Ou(bd, yd), vd = 4);
	}
	function of() {
		if (vd === 1) {
			vd = 0;
			var e = yd, t = bd, n = xd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = W.T, W.T = null;
				var i = ae.p;
				ae.p = 2;
				var a = Ju;
				Ju |= 4;
				try {
					iu = au = !1, wu(t, e, n), n = up;
					var o = Br(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && zr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Vr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Rr(s, h), v = Rr(s, g);
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
					vh = !!lp, up = lp = null;
				} finally {
					Ju = a, ae.p = i, W.T = r;
				}
			}
			e.current = t, vd = 2;
		}
	}
	function sf() {
		if (vd === 2) {
			vd = 0;
			var e = yd, t = bd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = W.T, W.T = null;
				var r = ae.p;
				ae.p = 2;
				var i = Ju;
				Ju |= 4;
				try {
					lu(e, t.alternate, t);
				} finally {
					Ju = i, ae.p = r, W.T = n;
				}
			}
			vd = 3;
		}
	}
	function cf() {
		if (vd === 4 || vd === 3) {
			vd = 0;
			var e = Td;
			Td = null, je();
			var t = yd, n = bd, r = xd, i = wd, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? vd = 5 : (vd = 0, bd = yd = null, lf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (_d = null), ut(r), n = n.stateNode, He && typeof He.onCommitFiberRoot == "function") try {
				He.onCommitFiberRoot(Ve, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = W.T, a = ae.p, ae.p = 2, W.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					W.T = n, ae.p = a;
				}
			}
			if (i = Ed, o = Dd, Dd = null, i !== null && (Ed = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			xd & 3 && uf(), Ef(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === kd ? Od++ : (Od = 0, kd = t) : (Od = 0, kd = null), Df(0, !1);
		}
	}
	function lf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ta(t)));
	}
	function uf() {
		return Td !== null && (Td.skipTransition(), Td = null), of(), sf(), cf(), df();
	}
	function df() {
		if (vd !== 5) return !1;
		var e = yd, t = Sd;
		Sd = 0;
		var n = ut(xd), r = W.T, a = ae.p;
		try {
			ae.p = 32 > n ? 32 : n, W.T = null, n = Cd, Cd = null;
			var o = yd, s = xd;
			if (vd = 0, bd = yd = null, xd = 0, Ju & 6) throw Error(i(331));
			var c = Ju;
			if (Ju |= 4, Uu(o.current), Fu(o, o.current, s, n), Ju = c, Df(0, !1), He && typeof He.onPostCommitFiberRoot == "function") try {
				He.onPostCommitFiberRoot(Ve, o);
			} catch {}
			return !0;
		} finally {
			ae.p = a, W.T = r, lf(e, t);
		}
	}
	function ff(e, t, n) {
		t = Ni(n, t), t = bc(e.stateNode, t, 2), e = lo(e, t, 2), e !== null && (it(e, 2), Ef(e));
	}
	function pf(e, t, n) {
		if (e.tag === 3) ff(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				ff(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (_d === null || !_d.has(r))) {
					e = Ni(n, e), n = xc(2), r = lo(t, n, 2), r !== null && (Sc(n, r, t, e), it(r, 2), Ef(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function mf(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new qu();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (nd = !0, i.add(n), e = hf.bind(null, e, t, n), t.then(e, e));
	}
	function hf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Yu === e && (Zu & n) === n && (id === 4 || id === 3 && (Zu & 62914560) === Zu && 300 > Me() - pd ? Ju & 2 ? sd |= n : Bd(e, 0) : sd |= n, ld === Zu && (ld = 0)), Ef(e);
	}
	function gf(e, t) {
		t === 0 && (t = nt()), e = vi(e, t), e !== null && (it(e, t), Ef(e));
	}
	function _f(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), gf(e, n);
	}
	function vf(e, t) {
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
		r !== null && r.delete(t), gf(e, n);
	}
	function yf(e, t) {
		return Oe(e, t);
	}
	var bf = null, xf = null, Sf = !1, Cf = !1, wf = !1, Tf = 0;
	function Ef(e) {
		e !== xf && e.next === null && (xf === null ? bf = xf = e : xf = xf.next = e), Cf = !0, Sf || (Sf = !0, Nf());
	}
	function Df(e, t) {
		if (!wf && Cf) {
			wf = !0;
			do
				for (var n = !1, r = bf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - We(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Mf(r, a));
						} else a = Zu, a = Qe(r, r === Yu ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || $e(r, a) || (n = !0, Mf(r, a));
					}
					r = r.next;
				}
			while (n);
			wf = !1;
		}
	}
	function Of() {
		kf();
	}
	function kf() {
		Cf = Sf = !1;
		var e = 0;
		Tf !== 0 && _p() && (e = Tf);
		for (var t = Me(), n = null, r = bf; r !== null;) {
			var i = r.next, a = Af(r, t);
			a === 0 ? (r.next = null, n === null ? bf = i : n.next = i, i === null && (xf = n)) : (n = r, (e !== 0 || a & 3) && (Cf = !0)), r = i;
		}
		vd !== 0 && vd !== 5 || Df(e, !1), Tf !== 0 && (Tf = 0);
	}
	function Af(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - We(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = tt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Yu, n = Zu, n = Qe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Qu === 2 || Qu === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && ke(r), e.callbackNode = null, e.callbackPriority = 0;
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
			return r = jf.bind(null, e), n = Oe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && ke(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function jf(e, t) {
		if (vd !== 0 && vd !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (uf() && e.callbackNode !== n) return null;
		var r = Zu;
		return r = Qe(e, e === Yu ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Pd(e, r, t), Af(e, Me()), e.callbackNode != null && e.callbackNode === n ? jf.bind(null, e) : null);
	}
	function Mf(e, t) {
		if (uf()) return null;
		Pd(e, t, !0);
	}
	function Nf() {
		Sp(function() {
			Ju & 6 ? Oe(Pe, Of) : kf();
		});
	}
	function Pf() {
		if (Tf === 0) {
			var e = ja;
			e === 0 && (e = Je, Je <<= 1, !(Je & 261888) && (Je = 256)), Tf = e;
		}
		return Tf;
	}
	function Ff(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : un(e);
	}
	function If(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Ff((i[ht] || null).action), o = r.submitter;
			o && (t = (t = o[ht] || null) ? Ff(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Mn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Tf !== 0) {
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
	for (var Lf = 0; Lf < G.length; Lf++) {
		var Rf = G[Lf];
		si(Rf.toLowerCase(), "on" + (Rf[0].toUpperCase() + Rf.slice(1)));
	}
	si($r, "onAnimationEnd"), si(ei, "onAnimationIteration"), si(ti, "onAnimationStart"), si("dblclick", "onDoubleClick"), si("focusin", "onFocus"), si("focusout", "onBlur"), si(ni, "onTransitionRun"), si(ri, "onTransitionStart"), si(ii, "onTransitionCancel"), si(ai, "onTransitionEnd"), Nt("onMouseEnter", ["mouseout", "mouseover"]), Nt("onMouseLeave", ["mouseout", "mouseover"]), Nt("onPointerEnter", ["pointerout", "pointerover"]), Nt("onPointerLeave", ["pointerout", "pointerover"]), Mt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Mt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Mt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Mt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Mt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Mt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var zf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Bf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zf));
	function Vf(e, t) {
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
	function Hf(e, t) {
		var n = t[_t];
		n === void 0 && (n = t[_t] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Kf(t, e, 2, !1), n.add(r));
	}
	function Uf(e, t, n) {
		var r = 0;
		t && (r |= 4), Kf(n, e, r, t);
	}
	var Wf = "_reactListening" + Math.random().toString(36).slice(2);
	function Gf(e) {
		if (!e[Wf]) {
			e[Wf] = !0, At.forEach(function(t) {
				t !== "selectionchange" && (Bf.has(t) || Uf(t, !1, e), Uf(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Wf] || (t[Wf] = !0, Uf("selectionchange", !1, t));
		}
	}
	function Kf(e, t, n, r) {
		switch (Th(t)) {
			case 2:
				var i = yh;
				break;
			case 8:
				i = bh;
				break;
			default: i = xh;
		}
		n = i.bind(null, t, n, e), i = void 0, !xn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function qf(e, t, n, r, i) {
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
		vn(function() {
			var r = a, i = pn(n), s = [];
			a: {
				var c = oi.get(e);
				if (c !== void 0) {
					var l = Mn, u = e;
					switch (e) {
						case "keypress": if (Dn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Xn;
							break;
						case "focusin":
							u = "focus", l = Vn;
							break;
						case "focusout":
							u = "blur", l = Vn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Vn;
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
							l = zn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Bn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = $n;
							break;
						case $r:
						case ei:
						case ti:
							l = Hn;
							break;
						case ai:
							l = er;
							break;
						case "scroll":
						case "scrollend":
							l = Pn;
							break;
						case "wheel":
							l = tr;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Un;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Zn;
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
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = yn(m, p), g != null && d.push(Jf(m, g, h))), f) break;
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
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? wt(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = zn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Zn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Et(c), h = l == null ? u : Et(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, wt(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? w(c, l, Xf) : null, c !== null && Zf(s, u, c, d, !1), l !== null && f !== null && Zf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Et(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = Sr;
					else if (gr(c)) {
						if (Cr) _ = Mr;
						else {
							_ = Ar;
							var v = kr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && sn(r.elementType) && (_ = Sr) : _ = jr;
					if (_ &&= _(e, r)) {
						_r(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Et(r) : window, e) {
					case "focusin":
						(gr(v) || v.contentEditable === "true") && (Ur = v, Wr = r, Gr = null);
						break;
					case "focusout":
						Gr = Wr = Ur = null;
						break;
					case "mousedown":
						Kr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Kr = !1, qr(s, n, i);
						break;
					case "selectionchange": if (Hr) break;
					case "keydown":
					case "keyup": qr(s, n, i);
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
				else fr ? ur(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (sr && n.locale !== "ko" && (fr || b !== "onCompositionStart" ? b === "onCompositionEnd" && fr && (y = En()) : (Cn = i, wn = "value" in Cn ? Cn.value : Cn.textContent, fr = !0)), v = Yf(r, b), 0 < v.length && (b = new Wn(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = dr(n), y !== null && (b.data = y)))), (y = or ? pr(e, n) : mr(e, n)) && (b = Yf(r, "onBeforeInput"), 0 < b.length && (v = new Wn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), If(s, e, r, n, i);
			}
			Vf(s, t);
		});
	}
	function Jf(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Yf(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = yn(e, n), i != null && r.unshift(Jf(e, i, a)), i = yn(e, t), i != null && r.push(Jf(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Xf(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Zf(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = yn(n, a), l != null && o.unshift(Jf(n, l, c))) : i || (l = yn(n, a), l != null && o.push(Jf(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Qf = /\r\n?/g, $f = /\u0000|\uFFFD/g;
	function ep(e) {
		return (typeof e == "string" ? e : "" + e).replace(Qf, "\n").replace($f, "");
	}
	function tp(e, t) {
		return t = ep(t), ep(e) === t;
	}
	function np(e, t, n, r, a, o) {
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
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && np(e, t, "name", a.name, a, null), np(e, t, "formEncType", a.formEncType, a, null), np(e, t, "formMethod", a.formMethod, a, null), np(e, t, "formTarget", a.formTarget, a, null)) : (np(e, t, "encType", a.encType, a, null), np(e, t, "method", a.method, a, null), np(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = un(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = dn);
				return;
			case "onScroll":
				r != null && Hf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Hf("scrollend", e);
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
				Hf("beforetoggle", e), Hf("toggle", e), Bt(e, "popover", r);
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
	function rp(e, t, n, r, a, o) {
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
				r != null && Hf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Hf("scrollend", e);
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
	function ip(e, t, n) {
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
				Hf("error", e), Hf("load", e);
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
						default: np(e, t, o, s, n, null);
					}
				}
				a && np(e, t, "srcSet", n.srcSet, n, null), r && np(e, t, "src", n.src, n, null);
				return;
			case "input":
				Hf("invalid", e);
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
						default: np(e, t, r, d, n, null);
					}
				}
				Zt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Hf("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: np(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && $t(e, !!r, n, !0) : $t(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Hf("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
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
					default: np(e, t, s, c, n, null);
				}
				tn(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: np(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Hf("beforetoggle", e), Hf("toggle", e), Hf("cancel", e), Hf("close", e);
				break;
			case "iframe":
			case "object":
				Hf("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < zf.length; r++) Hf(zf[r], e);
				break;
			case "image":
				Hf("error", e), Hf("load", e);
				break;
			case "details":
				Hf("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Hf("error", e), Hf("load", e);
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
					default: np(e, t, u, r, n, null);
				}
				return;
			default: if (sn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && rp(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && np(e, t, c, r, n, null));
	}
	var ap = {};
	function op(e, t, n, r) {
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
						default: r.hasOwnProperty(m) || np(e, t, m, null, r, f);
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
						default: m !== f && np(e, t, p, m, r, f);
					}
				}
				Xt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || np(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (Rt = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (Rt = !0), c = o;
						break;
					case "multiple": o !== l && (Rt = !0), s = o;
					default: o !== l && np(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? $t(e, !!n, n ? [] : "", !1) : $t(e, !!n, t, !0)) : $t(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: np(e, t, c, null, r, a);
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
					default: a !== o && np(e, t, s, a, r, o);
				}
				en(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: np(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (Rt = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: np(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && np(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: np(e, t, u, p, r, m);
				}
				return;
			default: if (sn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && rp(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || rp(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && np(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || np(e, t, f, p, r, m);
	}
	function sp(e) {
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
	function cp() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && sp(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && sp(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var lp = null, up = null;
	function dp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function fp(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function pp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function mp(e, t, n, r) {
		return n = dp(n).createElement(e), n[mt] = r, n[ht] = t, ip(n, e, t), Ot(n), n;
	}
	function hp(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var gp = null;
	function _p() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== gp && (gp = e, !0) : (gp = null, !1);
	}
	var vp = typeof setTimeout == "function" ? setTimeout : void 0, yp = typeof clearTimeout == "function" ? clearTimeout : void 0, bp = typeof Promise == "function" ? Promise : void 0, xp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : vp, Sp = typeof queueMicrotask == "function" ? queueMicrotask : bp === void 0 ? vp : function(e) {
		return bp.resolve(null).then(e).catch(Cp);
	};
	function Cp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function wp(e) {
		return e === "head";
	}
	function Tp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Wh(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") ym(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, ym(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[xt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && ym(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Wh(t);
	}
	function Ep(e, t) {
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
	function Dp(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Op(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function kp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function Ap(e) {
		return kp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function jp(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return kp(t, n, e);
	}
	function Mp(e) {
		return e.documentElement.clientHeight;
	}
	function Np(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Pp(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Mp(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += Qm(f), u > th) {
									s.length = o;
									break;
								}
								f = new Promise(Np.bind(f)), s.push(f);
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
	function Fp(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Fp.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : T({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Fp.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Fp.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Ip(e) {
		return {
			name: e,
			group: new Fp("group", e),
			imagePair: new Fp("image-pair", e),
			old: new Fp("old", e),
			new: new Fp("new", e)
		};
	}
	function Lp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Lp.prototype.addEventListener = function(e, t, n) {
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
				}), f(this._fragmentFiber.child, !1, Rp, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Rp(e, t, n, r) {
		return _(e).addEventListener(t, n, r), !1;
	}
	Lp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Hp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Bp(i.optionsOrUseCapture), f(this._fragmentFiber.child, !1, zp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function zp(e, t, n, r) {
		return _(e).removeEventListener(t, n, r), !1;
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
	Lp.prototype.dispatchEvent = function(e) {
		var t = p(this._fragmentFiber);
		if (t === null) return !0;
		t = _(t);
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
	}, Lp.prototype.focus = function(e) {
		f(this._fragmentFiber.child, !0, Up, e, void 0, void 0);
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = _(e), hm(e, t));
	}
	Lp.prototype.focusLast = function(e) {
		var t = [];
		f(this._fragmentFiber.child, !0, Wp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Up(t[n], e); n--);
	};
	function Wp(e, t) {
		return t.push(e), !1;
	}
	Lp.prototype.blur = function() {
		var e = p(this._fragmentFiber);
		e !== null && (e = _(e), e = dp(e).activeElement, e !== null && f(this._fragmentFiber.child, !1, Gp, e, void 0, void 0));
	};
	function Gp(e, t) {
		return e.tag !== 6 && (e = _(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Lp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), f(this._fragmentFiber.child, !1, Kp, e, void 0, void 0);
	};
	function Kp(e, t) {
		return e.tag === 6 || (e = _(e), t.observe(e)), !1;
	}
	Lp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), f(this._fragmentFiber.child, !1, qp, e, void 0, void 0);
			for (var n = t = 0; n < Jp.length; n++) {
				var r = Jp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : Jp[t++] = r;
			}
			Jp.length = t;
		}
	};
	function qp(e, t) {
		return e.tag === 6 || (e = _(e), t.unobserve(e)), !1;
	}
	var Jp = [], Yp = !1;
	function Xp(e, t, n) {
		Jp.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), Yp || (Yp = !0, gm(function() {
			Yp = !1;
			var e = Jp;
			Jp = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Lp.prototype.getClientRects = function() {
		var e = [];
		return f(this._fragmentFiber.child, !1, Zp, e, void 0, void 0), e;
	};
	function Zp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = _(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Lp.prototype.getRootNode = function(e) {
		var t = p(this._fragmentFiber);
		return t === null ? this : _(t).getRootNode(e);
	}, Lp.prototype.compareDocumentPosition = function(e) {
		var t = p(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		f(this._fragmentFiber.child, !1, Wp, n, void 0, void 0);
		var r = _(t);
		if (n.length === 0) {
			if (n = r, m(this._fragmentFiber)) {
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
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = h(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = _(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = _(n[0]), i = _(n[n.length - 1]);
		var a = m(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Qp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Qp(e, t, n, r, i) {
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
				for (a = t, t = p(t); a !== null;) {
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
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = w(n, a, C), t === null ? t = !1 : (f(t, !0, x, a, n), a = v, v = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = w(r, a, C), t === null ? t = !1 : (f(t, !0, S, a, r), a = v, y = v = null, t = a !== null)), t) : !1;
	}
	function $p(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Lp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		f(this._fragmentFiber.child, !1, Wp, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = h(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || p(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = _(r), $p(e, n);
				return;
			}
			if (r = _(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = _(a), $p(a, n)) : _(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function em(e, t) {
		return e = _(e), tm(e, t), !1;
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
	function im(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					im(n), Ct(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function am(e, t, n, r) {
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
			if (e = dm(e.nextSibling), e === null) break;
		}
		return null;
	}
	function om(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = dm(e.nextSibling), e === null)) return null;
		return e;
	}
	function sm(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = dm(e.nextSibling), e === null)) return null;
		return e;
	}
	function cm(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function lm(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function um(e, t) {
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
	function dm(e) {
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
	var fm = null;
	function pm(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return dm(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function mm(e) {
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
	function hm(e, t) {
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
	function gm(e) {
		xp(function() {
			xp(function(t) {
				return e(t);
			});
		});
	}
	function _m(e, t, n) {
		switch (t = dp(n), e) {
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
	function vm(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && np(e, t, r, null, ap, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === dn && (e.onclick = null), Ct(e);
	}
	function ym(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		Ct(e);
	}
	var bm = /* @__PURE__ */ new Map(), xm = /* @__PURE__ */ new Set();
	function Sm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var Cm = ae.d;
	ae.d = {
		f: wm,
		r: Tm,
		D: Om,
		C: km,
		L: Am,
		m: jm,
		X: Nm,
		S: Mm,
		M: Pm
	};
	function wm() {
		var e = Cm.f(), t = Rd();
		return e || t;
	}
	function Tm(e) {
		var t = Tt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Js(t) : Cm.r(e);
	}
	var Em = typeof document > "u" ? null : document;
	function Dm(e, t, n) {
		var r = Em;
		if (r && typeof t == "string" && t) {
			var i = Yt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), xm.has(i) || (xm.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), ip(t, "link", e), Ot(t), r.head.appendChild(t)));
		}
	}
	function Om(e) {
		Cm.D(e), Dm("dns-prefetch", e, null);
	}
	function km(e, t) {
		Cm.C(e, t), Dm("preconnect", e, t);
	}
	function Am(e, t, n) {
		Cm.L(e, t, n);
		var r = Em;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Yt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Yt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Yt(n.imageSizes) + "\"]")) : i += "[href=\"" + Yt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Im(e);
					break;
				case "script": a = Bm(e);
			}
			if (!(bm.has(a) || (e = T({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), bm.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Lm(a)) || t === "script" && r.querySelector(Vm(a))))) {
				var o = r.createElement("link");
				ip(o, "link", e), t === "style" && (o[St] = !0, o.onload = o.onerror = function() {
					kt(o);
				}), Ot(o), r.head.appendChild(o);
			}
		}
	}
	function jm(e, t) {
		Cm.m(e, t);
		var n = Em;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Yt(r) + "\"][href=\"" + Yt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Bm(e);
			}
			if (!bm.has(a) && (e = T({
				rel: "modulepreload",
				href: e
			}, t), bm.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Vm(a))) return;
				}
				r = n.createElement("link"), ip(r, "link", e), Ot(r), n.head.appendChild(r);
			}
		}
	}
	function Mm(e, t, n) {
		Cm.S(e, t, n);
		var r = Em;
		if (r && e) {
			var i = Dt(r).hoistableStyles, a = Im(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Lm(a))) s.loading = 5;
				else {
					e = T({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = bm.get(a)) && Wm(e, n);
					var c = o = r.createElement("link");
					Ot(c), ip(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Um(o, t, r);
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
	function Nm(e, t) {
		Cm.X(e, t);
		var n = Em;
		if (n && e) {
			var r = Dt(n).hoistableScripts, i = Bm(e), a = r.get(i);
			a || (a = n.querySelector(Vm(i)), a || (e = T({
				src: e,
				async: !0
			}, t), (t = bm.get(i)) && Gm(e, t), a = n.createElement("script"), Ot(a), ip(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Pm(e, t) {
		Cm.M(e, t);
		var n = Em;
		if (n && e) {
			var r = Dt(n).hoistableScripts, i = Bm(e), a = r.get(i);
			a || (a = n.querySelector(Vm(i)), a || (e = T({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = bm.get(i)) && Gm(e, t), a = n.createElement("script"), Ot(a), ip(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Fm(e, t, n, r) {
		var a = (a = me.current) ? Sm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Im(n.href), t = Dt(a).hoistableStyles, r = t.get(n), r || (r = {
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
					e = Im(n.href);
					var o = Dt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Lm(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = bm.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, bm.set(e, o)), zm(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Bm(n), t = Dt(a).hoistableScripts, r = t.get(n), r || (r = {
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
	function Im(e) {
		return "href=\"" + Yt(e) + "\"";
	}
	function Lm(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Rm(e) {
		return T({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function zm(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[St]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[St] = !0, t.onload = t.onerror = kt.bind(null, t), ip(t, "link", n), Ot(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function Bm(e) {
		return "[src=\"" + Yt(e) + "\"]";
	}
	function Vm(e) {
		return "script[async]" + e;
	}
	function Hm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Yt(n.href) + "\"]");
				if (r) return t.instance = r, Ot(r), r;
				var a = T({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Ot(r), ip(r, "style", a), Um(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Im(n.href);
				var o = e.querySelector(Lm(a));
				if (o) return t.state.loading |= 4, t.instance = o, Ot(o), o;
				r = Rm(n), (a = bm.get(a)) && Wm(r, a), o = (e.ownerDocument || e).createElement("link"), Ot(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), ip(o, "link", r), t.state.loading |= 4, Um(o, n.precedence, e), t.instance = o;
			case "script": return o = Bm(n.src), (a = e.querySelector(Vm(o))) ? (t.instance = a, Ot(a), a) : (r = n, (a = bm.get(o)) && (r = T({}, n), Gm(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Ot(a), ip(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Um(r, n.precedence, e));
		return t.instance;
	}
	function Um(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Wm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Gm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Km = null;
	function qm(e, t, n) {
		if (Km === null) {
			var r = /* @__PURE__ */ new Map(), i = Km = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Km, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
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
	function Jm(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Ym(e, t, n) {
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
	function Xm(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function Zm(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Qm(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function $m(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Qm(t), e.suspenseyImages.push(t)), e = ah.bind(e), t.decode().then(e, e));
	}
	function eh(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Im(r.href), a = t.querySelector(Lm(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = ih.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Ot(a);
					return;
				}
				a = t.ownerDocument || t, r = Rm(r), (i = bm.get(i)) && Wm(r, i), a = a.createElement("link"), Ot(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), ip(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = ih.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var th = 0;
	function nh(e, t) {
		return e.stylesheets && e.count === 0 && sh(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && sh(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && th === 0 && (th = 62500 * cp());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && sh(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > th ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function rh(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) sh(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function ih() {
		this.count--, rh(this);
	}
	function ah() {
		this.imgCount--, rh(this);
	}
	var oh = null;
	function sh(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, oh = /* @__PURE__ */ new Map(), t.forEach(ch, e), oh = null, ih.call(e));
	}
	function ch(e, t) {
		if (!(t.state.loading & 4)) {
			var n = oh.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), oh.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = ih.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var lh = {
		$$typeof: N,
		Provider: null,
		Consumer: null,
		_currentValue: oe,
		_currentValue2: oe,
		_threadCount: 0
	};
	function uh(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = rt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = rt(0), this.hiddenUpdates = rt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function dh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new uh(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Ci(3, null, null, t), e.current = a, a.stateNode = e, t = wa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, oo(a), e;
	}
	function fh(e) {
		return e ? (e = xi, e) : xi;
	}
	function ph(e, t, n, r, i, a) {
		i = fh(i), r.context === null ? r.context = i : r.pendingContext = i, r = co(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = lo(e, r, t), n !== null && (Nd(n, e, t), uo(n, e, t));
	}
	function mh(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function hh(e, t) {
		mh(e, t), (e = e.alternate) && mh(e, t);
	}
	function gh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = vi(e, 67108864);
			t !== null && Nd(t, e, 67108864), hh(e, 67108864);
		}
	}
	function _h(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Ad();
			t = lt(t);
			var n = vi(e, t);
			n !== null && Nd(n, e, t), hh(e, t);
		}
	}
	var vh = !0;
	function yh(e, t, n, r) {
		var i = W.T;
		W.T = null;
		var a = ae.p;
		try {
			ae.p = 2, xh(e, t, n, r);
		} finally {
			ae.p = a, W.T = i;
		}
	}
	function bh(e, t, n, r) {
		var i = W.T;
		W.T = null;
		var a = ae.p;
		try {
			ae.p = 8, xh(e, t, n, r);
		} finally {
			ae.p = a, W.T = i;
		}
	}
	function xh(e, t, n, r) {
		if (vh) {
			var i = Sh(r);
			if (i === null) qf(e, t, r, Ch, n), Ph(e, r);
			else if (Ih(i, e, t, n, r)) r.stopPropagation();
			else if (Ph(e, r), t & 4 && -1 < Nh.indexOf(e)) {
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
									Ef(a), !(Ju & 6) && (hd = Me() + 500, Df(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = vi(a, 2), s !== null && Nd(s, a, 2), Rd(), hh(a, 2);
					}
					if (a = Sh(r), a === null && qf(e, t, r, Ch, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else qf(e, t, r, null, n);
		}
	}
	function Sh(e) {
		return e = pn(e), wh(e);
	}
	var Ch = null;
	function wh(e) {
		if (Ch = null, e = wt(e), e !== null) {
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
		return Ch = e, null;
	}
	function Th(e) {
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
	var Eh = !1, Dh = null, Oh = null, kh = null, Ah = /* @__PURE__ */ new Map(), jh = /* @__PURE__ */ new Map(), Mh = [], Nh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Ph(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Dh = null;
				break;
			case "dragenter":
			case "dragleave":
				Oh = null;
				break;
			case "mouseover":
			case "mouseout":
				kh = null;
				break;
			case "pointerover":
			case "pointerout":
				Ah.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": jh.delete(t.pointerId);
		}
	}
	function Fh(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Tt(t), t !== null && gh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ih(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Dh = Fh(Dh, e, t, n, r, i), !0;
			case "dragenter": return Oh = Fh(Oh, e, t, n, r, i), !0;
			case "mouseover": return kh = Fh(kh, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Ah.set(a, Fh(Ah.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, jh.set(a, Fh(jh.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Lh(e) {
		var t = wt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ft(e.priority, function() {
							_h(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ft(e.priority, function() {
							_h(n);
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
	function Rh(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = Sh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				fn = r, n.target.dispatchEvent(r), fn = null;
			} else return t = Tt(n), t !== null && gh(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function zh(e, t, n) {
		Rh(e) && n.delete(t);
	}
	function Bh() {
		Eh = !1, Dh !== null && Rh(Dh) && (Dh = null), Oh !== null && Rh(Oh) && (Oh = null), kh !== null && Rh(kh) && (kh = null), Ah.forEach(zh), jh.forEach(zh);
	}
	function Vh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, Eh || (Eh = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Bh)));
	}
	var Hh = null;
	function Uh(e) {
		Hh !== e && (Hh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Hh === e && (Hh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (wh(r || n) === null) continue;
					break;
				}
				var a = Tt(n);
				a !== null && (e.splice(t, 3), t -= 3, Ks(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Wh(e) {
		function t(t) {
			return Vh(t, e);
		}
		Dh !== null && Vh(Dh, e), Oh !== null && Vh(Oh, e), kh !== null && Vh(kh, e), Ah.forEach(t), jh.forEach(t);
		for (var n = 0; n < Mh.length; n++) {
			var r = Mh[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Mh.length && (n = Mh[0], n.blockedOn === null);) Lh(n), n.blockedOn === null && Mh.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[ht] || null;
			if (typeof a == "function") o || Uh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[ht] || null) s = o.formAction;
					else if (wh(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Uh(n);
			}
		}
	}
	function Gh() {
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
	function Kh(e) {
		this._internalRoot = e;
	}
	qh.prototype.render = Kh.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		ph(n, Ad(), e, t, null, null);
	}, qh.prototype.unmount = Kh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			ph(e.current, 2, null, e, null, null), Rd(), t[gt] = null;
		}
	};
	function qh(e) {
		this._internalRoot = e;
	}
	qh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = dt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Mh.length && t !== 0 && t < Mh[n].priority; n++);
			Mh.splice(n, 0, e), n === 0 && Lh(e);
		}
	};
	var Jh = n.version;
	if (Jh !== "19.3.1") throw Error(i(527, Jh, "19.3.1"));
	ae.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : d(e), e = e === null ? null : e.stateNode, e;
	};
	var Yh = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: W,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Xh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Xh.isDisabled && Xh.supportsFiber) try {
			Ve = Xh.inject(Yh), He = Xh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = hc, s = gc, c = _c;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = dh(e, 1, !1, null, null, n, r, null, o, s, c, Gh), e[gt] = t.current, Gf(e), new Kh(t);
	};
})), As = (/* @__PURE__ */ s(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = ks();
})))(), Z = /* @__PURE__ */ u(b(), 1), js = /* @__PURE__ */ u(Os(), 1);
function Ms(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var Ns = (e) => {
	switch (e) {
		case "success": return Is;
		case "info": return Rs;
		case "warning": return Ls;
		case "error": return zs;
		default: return null;
	}
}, Ps = Array(12).fill(0), Fs = ({ visible: e, className: t }) => /*#__PURE__*/ Z.createElement("div", {
	className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
	"data-visible": e
}, /*#__PURE__*/ Z.createElement("div", { className: "sonner-spinner" }, Ps.map((e, t) => /*#__PURE__*/ Z.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${t}`
})))), Is = /*#__PURE__*/ Z.createElement("svg", {
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
})), Ls = /*#__PURE__*/ Z.createElement("svg", {
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
})), Rs = /*#__PURE__*/ Z.createElement("svg", {
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
})), zs = /*#__PURE__*/ Z.createElement("svg", {
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
})), Bs = /*#__PURE__*/ Z.createElement("svg", {
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
})), Vs = () => {
	let [e, t] = Z.useState(document.hidden);
	return Z.useEffect(() => {
		let e = () => {
			t(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []), e;
}, Hs = 1, Us = 100, Ws = (e) => typeof e?.id == "number" || e?.id?.length > 0 ? e.id : Hs++, Gs = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), this.getActiveToasts().forEach((t) => e(t)), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e], this.trimHistory();
		}, this.trimHistory = () => {
			let e = this.toasts.length - Us;
			e <= 0 || (this.toasts = this.toasts.filter((t) => e > 0 && this.dismissedToasts.has(t.id) ? (this.dismissedToasts.delete(t.id), e--, !1) : !0));
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = Ws(e), i = this.pendingDismissals.get(r);
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
				else if (qs(e) && !e.ok) {
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
			let n = Ws(t);
			return this.create({
				...t,
				jsx: e(n),
				id: n,
				type: void 0
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set(), this.pendingDismissals = /* @__PURE__ */ new Map();
	}
}(), Ks = (e, t) => Gs.message(e, t), qs = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", Js = Object.assign(Ks, {
	success: Gs.success,
	info: Gs.info,
	warning: Gs.warning,
	error: Gs.error,
	custom: Gs.custom,
	message: Gs.message,
	promise: Gs.promise,
	dismiss: Gs.dismiss,
	loading: Gs.loading
}, {
	getHistory: () => Gs.toasts,
	getToasts: () => Gs.getActiveToasts()
});
Ms("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--normal-text);background:var(--normal-bg);border:1px solid var(--normal-border);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{-webkit-user-select:none;user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Ys(e) {
	return e.label !== void 0;
}
var Xs = 3, Zs = "24px", Qs = "16px", $s = 4e3, ec = 356, tc = 14, nc = 45, rc = 200;
function ic(...e) {
	return e.filter(Boolean).join(" ");
}
function ac(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var oc = (e) => {
	let { invert: t, toast: n, unstyled: r, interacting: i, setHeights: a, visibleToasts: o, heights: s, index: c, toasts: l, expanded: u, removeToast: d, defaultRichColors: f, closeButton: p, style: m, cancelButtonStyle: h, actionButtonStyle: g, className: _ = "", descriptionClassName: v = "", duration: y, position: b, gap: x, expandByDefault: S, classNames: C, icons: w, closeButtonAriaLabel: T = "Close toast" } = e, [E, D] = Z.useState(null), [O, k] = Z.useState(null), [A, j] = Z.useState(!1), [M, N] = Z.useState(!1), [P, F] = Z.useState(!1), [I, L] = Z.useState(!1), [R, ee] = Z.useState(!1), [z, B] = Z.useState(0), [V, te] = Z.useState(0), ne = Z.useRef(n.duration || y || $s), H = Z.useRef(null), re = Z.useRef(null), U = c === 0, ie = c + 1 <= o, W = n.type, ae = W ?? "default", oe = n.dismissible !== !1, se = n.className || "", ce = n.descriptionClassName || "", le = Z.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]), ue = Z.useMemo(() => n.closeButton ?? p, [n.closeButton, p]), de = Z.useMemo(() => n.duration || y || $s, [n.duration, y]), fe = Z.useRef(0), pe = Z.useRef(0), me = Z.useRef(0), he = Z.useRef(null), [ge, _e] = b.split("-"), ve = Z.useMemo(() => s.reduce((e, t, n) => n >= le ? e : e + t.height, 0), [s, le]), ye = Vs(), be = Z.useMemo(() => e.swipeDirections ?? ac(b), [e.swipeDirections, b]), xe = n.invert || t, Se = W === "loading";
	pe.current = Z.useMemo(() => le * x + ve, [le, ve]), Z.useEffect(() => {
		ne.current = de;
	}, [de]), Z.useEffect(() => {
		j(!0);
	}, []), Z.useEffect(() => {
		let e = re.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return te(t), a((e) => [{
				toastId: n.id,
				height: t,
				position: n.position
			}, ...e]), () => a((e) => e.filter((e) => e.toastId !== n.id));
		}
	}, [a, n.id]), Z.useLayoutEffect(() => {
		if (!A) return;
		let e = re.current, t = e.style.height;
		e.style.height = "auto";
		let r = e.getBoundingClientRect().height;
		e.style.height = t, te(r), a((e) => e.find((e) => e.toastId === n.id) ? e.map((e) => e.toastId === n.id ? {
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
	let Ce = Z.useCallback(() => {
		N(!0), B(pe.current), a((e) => e.filter((e) => e.toastId !== n.id)), setTimeout(() => {
			d(n);
		}, rc);
	}, [
		n,
		d,
		a,
		pe
	]);
	Z.useEffect(() => {
		if (n.promise && W === "loading" || n.duration === Infinity || n.type === "loading") return;
		let e;
		return u || i || ye ? (() => {
			if (me.current < fe.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - fe.current;
				ne.current -= e;
			}
			me.current = (/* @__PURE__ */ new Date()).getTime();
		})() : ne.current !== Infinity && (fe.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			n.onAutoClose == null || n.onAutoClose.call(n, n), Ce();
		}, ne.current)), () => clearTimeout(e);
	}, [
		u,
		i,
		n,
		W,
		ye,
		Ce
	]), Z.useEffect(() => {
		n.delete && (Ce(), n.onDismiss == null || n.onDismiss.call(n, n));
	}, [Ce, n.delete]);
	function we() {
		return w?.loading ? /*#__PURE__*/ Z.createElement("div", {
			className: ic(C?.loader, n?.classNames?.loader, "sonner-loader"),
			"data-visible": W === "loading"
		}, w.loading) : /*#__PURE__*/ Z.createElement(Fs, {
			className: ic(C?.loader, n?.classNames?.loader),
			visible: W === "loading"
		});
	}
	let Te = n.icon || w?.[W] || Ns(W);
	return /*#__PURE__*/ Z.createElement("li", {
		tabIndex: 0,
		ref: re,
		className: ic(_, se, C?.toast, n?.classNames?.toast, C?.[ae], n?.classNames?.[ae]),
		"data-sonner-toast": "",
		"data-rich-colors": n.richColors ?? f,
		"data-styled": !(n.jsx || n.unstyled || r),
		"data-mounted": A,
		"data-promise": !!n.promise,
		"data-swiped": R,
		"data-removed": M,
		"data-visible": ie,
		"data-y-position": ge,
		"data-x-position": _e,
		"data-index": c,
		"data-front": U,
		"data-swiping": P,
		"data-dismissible": oe,
		"data-type": W,
		"data-invert": xe,
		"data-swipe-out": I,
		"data-swipe-direction": O,
		"data-expanded": !!(u || S && A),
		"data-testid": n.testId,
		style: {
			"--index": c,
			"--toasts-before": c,
			"--z-index": l.length - c,
			"--offset": `${M ? z : pe.current}px`,
			"--initial-height": S ? "auto" : `${V}px`,
			...m,
			...n.style
		},
		onDragEnd: () => {
			F(!1), D(null), he.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && !Se && oe && (H.current = /* @__PURE__ */ new Date(), B(pe.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (F(!0), he.current = {
				x: e.clientX,
				y: e.clientY
			}));
		},
		onPointerUp: () => {
			if (I || !oe) return;
			he.current = null;
			let e = Number(re.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(re.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), r = (/* @__PURE__ */ new Date()).getTime() - H.current?.getTime(), i = E === "x" ? e : t, a = Math.abs(i) / r;
			if ((E === "x" ? be.includes(e > 0 ? "right" : "left") : be.includes(t > 0 ? "bottom" : "top")) && (Math.abs(i) >= nc || a > .11)) B(pe.current), n.onDismiss == null || n.onDismiss.call(n, n), k(E === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), Ce(), L(!0);
			else {
				var o, s;
				(o = re.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = re.current) == null || s.style.setProperty("--swipe-amount-y", "0px"), ee(!1), F(!1), D(null);
			}
		},
		onPointerMove: (e) => {
			var t, n;
			if (!he.current || !oe || window.getSelection()?.toString().length > 0) return;
			let r = e.clientY - he.current.y, i = e.clientX - he.current.x;
			!E && (Math.abs(i) > 1 || Math.abs(r) > 1) && D(Math.abs(i) > Math.abs(r) ? "x" : "y");
			let a = {
				x: 0,
				y: 0
			}, o = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (E === "y") {
				if (be.includes("top") || be.includes("bottom")) {
					if (be.includes("top") && r < 0 || be.includes("bottom") && r > 0) a.y = r;
					else {
						let e = r * o(r);
						a.y = Math.abs(e) < Math.abs(r) ? e : r;
					}
				}
			} else if (E === "x" && (be.includes("left") || be.includes("right"))) {
				if (be.includes("left") && i < 0 || be.includes("right") && i > 0) a.x = i;
				else {
					let e = i * o(i);
					a.x = Math.abs(e) < Math.abs(i) ? e : i;
				}
			}
			(Math.abs(a.x) > 0 || Math.abs(a.y) > 0) && ee(!0), (t = re.current) == null || t.style.setProperty("--swipe-amount-x", `${a.x}px`), (n = re.current) == null || n.style.setProperty("--swipe-amount-y", `${a.y}px`);
		}
	}, ue && !n.jsx && W !== "loading" ? /*#__PURE__*/ Z.createElement("button", {
		"aria-label": T,
		"data-disabled": Se,
		"data-close-button": !0,
		onClick: Se || !oe ? () => {} : () => {
			Ce(), n.onDismiss == null || n.onDismiss.call(n, n);
		},
		className: ic(C?.closeButton, n?.classNames?.closeButton)
	}, w?.close ?? Bs) : null, (W || n.icon || n.promise) && n.icon !== null && (w?.[W] !== null || n.icon) ? /*#__PURE__*/ Z.createElement("div", {
		"data-icon": "",
		className: ic(C?.icon, n?.classNames?.icon)
	}, W === "loading" ? n.icon || we() : n.promise ? we() : null, W === "loading" ? null : Te) : null, /*#__PURE__*/ Z.createElement("div", {
		"data-content": "",
		className: ic(C?.content, n?.classNames?.content)
	}, /*#__PURE__*/ Z.createElement("div", {
		"data-title": "",
		className: ic(C?.title, n?.classNames?.title)
	}, n.jsx ? n.jsx : typeof n.title == "function" ? n.title() : n.title), n.description ? /*#__PURE__*/ Z.createElement("div", {
		"data-description": "",
		className: ic(v, ce, C?.description, n?.classNames?.description)
	}, typeof n.description == "function" ? n.description() : n.description) : null), /*#__PURE__*/ Z.isValidElement(n.cancel) ? n.cancel : n.cancel && Ys(n.cancel) ? /*#__PURE__*/ Z.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: n.cancelButtonStyle || h,
		onClick: (e) => {
			Ys(n.cancel) && oe && (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), Ce());
		},
		className: ic(C?.cancelButton, n?.classNames?.cancelButton)
	}, n.cancel.label) : null, /*#__PURE__*/ Z.isValidElement(n.action) ? n.action : n.action && Ys(n.action) ? /*#__PURE__*/ Z.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: n.actionButtonStyle || g,
		onClick: (e) => {
			Ys(n.action) && (n.action.onClick == null || n.action.onClick.call(n.action, e), e.defaultPrevented || Ce());
		},
		className: ic(C?.actionButton, n?.classNames?.actionButton)
	}, n.action.label) : null);
};
function sc() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function cc(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? Qs : Zs;
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
var lc = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { id: n, invert: r, position: i = "bottom-right", hotkey: a = ["altKey", "KeyT"], expand: o, closeButton: s, className: c, offset: l, mobileOffset: u, theme: d = "light", richColors: f, duration: p, style: m, visibleToasts: h = Xs, toastOptions: g, dir: _ = sc(), gap: v = tc, icons: y, customAriaLabel: b, containerAriaLabel: x = "Notifications" } = e, [S, C] = Z.useState([]), w = Z.useMemo(() => n ? S.filter((e) => e.toasterId === n) : S.filter((e) => !e.toasterId), [S, n]), T = Z.useMemo(() => Array.from(new Set([i].concat(w.filter((e) => e.position).map((e) => e.position)))), [w, i]), [E, D] = Z.useState([]), [O, k] = Z.useState(!1), [A, j] = Z.useState(!1), [M, N] = Z.useState(d === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : d), P = Z.useRef(null), F = a.join("+").replace(/Key/g, "").replace(/Digit/g, ""), I = Z.useRef(null), L = Z.useRef(!1), R = Z.useCallback((e) => {
		C((t) => (t.find((t) => t.id === e.id)?.delete || Gs.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return Z.useEffect(() => Gs.subscribe((e) => {
		e.dismiss ? requestAnimationFrame(() => {
			C((t) => t.map((t) => t.id === e.id ? {
				...t,
				delete: !0
			} : t));
		}) : setTimeout(() => {
			js.flushSync(() => {
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
			dir: _ === "auto" ? sc() : _,
			tabIndex: -1,
			ref: P,
			className: c,
			"data-sonner-toaster": !0,
			"data-sonner-theme": M,
			"data-y-position": i,
			"data-x-position": a,
			style: {
				"--front-toast-height": `${E[0]?.height || 0}px`,
				"--width": `${ec}px`,
				"--gap": `${v}px`,
				...m,
				...cc(l, u)
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
		}, w.filter((e) => !e.position && n === 0 || e.position === t).map((n, i) => /*#__PURE__*/ Z.createElement(oc, {
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
Dr();
var uc = ({ ...e }) => /* @__PURE__ */ (0, X.jsx)(lc, {
	theme: "dark",
	className: "toaster group",
	icons: {
		success: /* @__PURE__ */ (0, X.jsx)(Ne, { className: "size-4" }),
		info: /* @__PURE__ */ (0, X.jsx)(Nt, { className: "size-4" }),
		warning: /* @__PURE__ */ (0, X.jsx)(pr, { className: "size-4" }),
		error: /* @__PURE__ */ (0, X.jsx)(sn, { className: "size-4" }),
		loading: /* @__PURE__ */ (0, X.jsx)(zt, { className: "size-4 animate-spin" })
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
function dc(e) {
	let t = fc.useContext(pc);
	if (!e && t === void 0) throw Error(Pi(27));
	return t;
}
var fc, pc, mc = o((() => {
	Fi(), fc = /* @__PURE__ */ u(b(), 1), pc = /*#__PURE__*/ fc.createContext(void 0);
})), hc, gc, _c = o((() => {
	hc = "data-starting-style", gc = "data-ending-style";
})), vc, yc, bc, xc = o((() => {
	_c(), vc = { [hc]: "" }, yc = { [gc]: "" }, bc = { transitionStatus(e) {
		return e === "starting" ? vc : e === "ending" ? yc : null;
	} };
})), Sc, Cc, wc, Tc = o((() => {
	_c(), Sc = "data-open", Cc = "data-closed", wc = "data-anchor-hidden";
})), Ec, Dc, Oc = o((() => {
	Ec = "data-popup-open", Dc = "data-pressed";
})), kc, Ac, jc, Mc, Nc, Pc, Fc, Ic, Lc, Rc = o((() => {
	xc(), Tc(), Oc(), kc = { [Ec]: "" }, Ac = {
		[Ec]: "",
		[Dc]: ""
	}, jc = { [Sc]: "" }, Mc = { [Cc]: "" }, Nc = { [wc]: "" }, Pc = { open(e) {
		return e ? kc : null;
	} }, Fc = { open(e) {
		return e ? Ac : null;
	} }, Ic = {
		open(e) {
			return e ? jc : Mc;
		},
		anchorHidden(e) {
			return e ? Nc : null;
		}
	}, Lc = {
		...Ic,
		...bc
	};
})), zc, Bc, Vc = o((() => {
	zc = /* @__PURE__ */ u(b(), 1), mc(), Aa(), Rc(), Bc = /*#__PURE__*/ zc.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, forceRender: a = !1, ...o } = e, s = dc(), c = s.useState("open"), l = s.useState("nested"), u = s.useState("mounted");
		return xa("div", e, {
			state: {
				open: c,
				transitionStatus: s.useState("transitionStatus")
			},
			ref: [s.context.backdropRef, t],
			stateAttributesMapping: Lc,
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
})), Hc = o((() => {
	Zi();
}));
// node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
function Uc(e, t, n, r) {
	let i = !1, a = !1, o = r ?? pa;
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
function Wc(e, t, n) {
	let r = n ?? pa;
	return {
		reason: e,
		event: t ?? new Event("base-ui"),
		...r
	};
}
var Gc = o((() => {
	ma();
})), Kc, qc, Jc, Yc, Xc, Zc, Qc, $c, el, tl, nl, rl, il, al, ol, sl, cl, ll, ul, dl = o((() => {
	Kc = "none", qc = "trigger-press", Jc = "trigger-hover", Yc = "trigger-focus", Xc = "outside-press", Zc = "item-press", Qc = "close-press", $c = "focus-out", el = "escape-key", tl = "list-navigation", nl = "keyboard", rl = "pointer", il = "cancel-open", al = "sibling-open", ol = "disabled", sl = "missing", cl = "initial", ll = "imperative-action", ul = "window-resize";
})), fl = o((() => {
	dl();
})), pl, ml, hl = o((() => {
	pl = /* @__PURE__ */ u(b(), 1), mc(), Aa(), Hc(), Gc(), fl(), ml = /*#__PURE__*/ pl.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, ...s } = e, c = dc(), l = c.useState("open"), { getButtonProps: u, buttonRef: d } = qi({
			disabled: a,
			native: o
		}), f = { disabled: a };
		function p(e) {
			l && c.setOpen(!1, Uc(Qc, e.nativeEvent));
		}
		return xa("button", e, {
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
function gl() {
	let [, e] = _l.useState({});
	return _l.useCallback(() => {
		e({});
	}, []);
}
var _l, vl = o((() => {
	_l = /* @__PURE__ */ u(b(), 1);
}));
// node_modules/@base-ui/utils/useId.mjs
function yl(e, t = "mui") {
	let n = xl.useRef(void 0), r = gl(), i = e ?? n.current;
	return xl.useEffect(() => {
		n.current ?? (Sl += 1, n.current = `${t}-${Sl}`, e ?? r());
	}, [
		e,
		t,
		r
	]), i;
}
function bl(e, t) {
	if (Cl !== void 0) {
		let n = Cl();
		return e ?? (t ? `${t}-${n}` : n);
	}
	return yl(e, t);
}
var xl, Sl, Cl, wl = o((() => {
	xl = /* @__PURE__ */ u(b(), 1), ni(), vl(), Sl = 0, Cl = ti.useId;
}));
// node_modules/@base-ui/react/internals/useBaseUiId.mjs
function Tl(e) {
	return bl(e, "base-ui");
}
var El = o((() => {
	wl();
})), Dl, Ol, kl = o((() => {
	Dl = /* @__PURE__ */ u(b(), 1), mc(), Aa(), El(), Ol = /*#__PURE__*/ Dl.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, id: a, ...o } = e, s = dc(), c = Tl(a);
		return s.useSyncedValueWithCleanup("descriptionElementId", c), xa("p", e, {
			ref: t,
			props: [{ id: c }, o]
		});
	});
}));
// node_modules/@base-ui/utils/useOnMount.mjs
function Al(e) {
	jl.useEffect(e, fa);
}
var jl, Ml = o((() => {
	jl = /* @__PURE__ */ u(b(), 1), ma();
}));
// node_modules/@base-ui/utils/useTimeout.mjs
function Nl() {
	let e = ri(Fl.create).current;
	return Al(e.disposeEffect), e;
}
var Pl, Fl, Il = o((() => {
	oi(), Ml(), Pl = 0, Fl = class e {
		static create() {
			return new e();
		}
		currentId = Pl;
		start(e, t) {
			this.clear(), this.currentId = setTimeout(() => {
				this.currentId = Pl, t();
			}, e);
		}
		isStarted() {
			return this.currentId !== Pl;
		}
		clear = () => {
			this.currentId !== Pl && (clearTimeout(this.currentId), this.currentId = Pl);
		};
		disposeEffect = () => this.clear;
	};
}));
// node_modules/@base-ui/utils/platform/shared.mjs
function Ll() {
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
var Rl, zl, Bl, Vl, Hl, Ul = o((() => {
	({userAgent: Rl, platform: zl, maxTouchPoints: Bl} = Ll()), Vl = Rl.toLowerCase(), Hl = zl.toLowerCase();
})), Wl, Gl, Kl, ql, Jl, Yl = o((() => {
	Ul(), Wl = /^i(os$|p)/.test(Hl) || Hl === "macintel" && Bl > 1, Gl = "android", Kl = Hl === Gl || Vl.includes(Gl), ql = !Wl && Hl.startsWith("mac"), Hl.startsWith("win"), !Kl && /^(linux|chrome os)/.test(Hl), Jl = ql || Wl;
})), Xl, Zl = o((() => {
	Ul(), Xl = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none"), !Xl && Vl.includes("firefox"), !Xl && Vl.includes("chrom");
})), Ql, $l = o((() => {
	Yl(), Ql = Jl;
})), eu, tu = o((() => {
	Ul(), eu = /jsdom|happydom/.test(Vl);
})), nu = o((() => {
	Yl(), Zl(), $l(), tu();
})), ru = o((() => {
	nu();
}));
// node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function iu(e) {
	e.preventDefault(), e.stopPropagation();
}
function au(e) {
	return "nativeEvent" in e;
}
function ou(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : Kl && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function su(e) {
	return eu ? !1 : !Kl && e.width === 0 && e.height === 0 || e.type === "pointerdown" && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" && (Kl || e.buttons === 0) || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
}
function cu(e, t) {
	let n = ["mouse", "pen"];
	return t || n.push("", void 0), n.includes(e);
}
function lu(e) {
	let t = e.type;
	return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
var uu = o((() => {
	ru();
}));
// node_modules/@base-ui/utils/shadowDom.mjs
function du(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement != null;) t = t.shadowRoot.activeElement;
	return t;
}
function fu(e, t) {
	if (!e || !t) return !1;
	let n = t.getRootNode?.();
	if (e.contains(t)) return !0;
	if (n && Fr(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function pu(e, t) {
	let n = e;
	for (; n;) {
		if (Nr(n) && n.matches(t)) return n;
		n = n.assignedSlot ?? n.parentNode ?? (Fr(n) ? n.host : null);
	}
	return null;
}
function mu(e) {
	return "composedPath" in e ? e.composedPath()[0] ?? e.target : e.target;
}
var hu = o((() => {
	$r();
})), gu, _u, vu, yu, bu, xu, Su = o((() => {
	gu = "data-base-ui-focusable", _u = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", vu = "ArrowLeft", yu = "ArrowRight", bu = "ArrowUp", xu = "ArrowDown";
})), Cu, wu = o((() => {
	Rc(), Cu = "data-trigger-disabled";
}));
// node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function Tu(e, t) {
	if (!Nr(e)) return !1;
	let n = e;
	if (t.hasElement(n)) return !n.hasAttribute(Cu);
	for (let [, e] of t.entries()) if (fu(e, n)) return !e.hasAttribute(Cu);
	return !1;
}
function Eu(e, t) {
	if (t == null) return !1;
	if ("composedPath" in e) return e.composedPath().includes(t);
	let n = e;
	return n.target != null && t.contains(n.target);
}
function Du(e) {
	return e.matches("html,body");
}
function Ou(e) {
	return Pr(e) && e.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function ku(e) {
	return pu(e, `button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${_u}`) != null;
}
function Au(e) {
	return e ? e.getAttribute("role") === "combobox" && Ou(e) : !1;
}
function ju(e) {
	if (!e || eu) return !0;
	try {
		return e.matches(":focus-visible");
	} catch {
		return !0;
	}
}
function Mu(e) {
	return e ? e.hasAttribute("data-base-ui-focusable") ? e : e.querySelector("[data-base-ui-focusable]") || e : null;
}
var Nu = o((() => {
	$r(), ru(), hu(), Su(), wu();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverShared.mjs
function Pu(e, t) {
	return t != null && !cu(t) ? 0 : typeof e == "function" ? e() : e;
}
function Fu(e, t, n) {
	let r = Pu(e, n);
	return typeof r == "number" ? r : r?.[t];
}
function Iu(e) {
	return typeof e == "function" ? e() : e;
}
function Lu(e, t) {
	return t || e === "click" || e === "mousedown";
}
function Ru(e) {
	return e?.includes("mouse") && e !== "mousedown";
}
var zu = o((() => {
	uu(), Nu();
}));
// node_modules/@base-ui/react/floating-ui-react/components/FloatingDelayGroup.mjs
function Bu(e, t) {
	e.current = t.current;
}
function Vu(e) {
	let { children: t, delay: n, timeoutMs: r = 0 } = e, i = Uu.useRef(n), a = Uu.useRef(n), o = Uu.useRef(null), s = Uu.useRef(null), c = Nl();
	return K(() => {
		a.current = n, o.current ? i.current = {
			open: Fu(i.current, "open"),
			close: Fu(n, "close")
		} : i.current = n;
	}, [
		n,
		o,
		i,
		a
	]), /*#__PURE__*/ (0, Wu.jsx)(Gu.Provider, {
		value: Uu.useMemo(() => ({
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
function Hu(e, t = { open: !1 }) {
	let { open: n } = t, r = e.useState("floatingId"), { currentIdRef: i, delayRef: a, timeoutMs: o, initialDelayRef: s, currentContextRef: c, hasProvider: l, timeout: u } = Uu.useContext(Gu), [d, f] = Uu.useState(!1), p = Uu.useRef(n);
	return K(() => {
		p.current = n;
	}, [n]), K(() => {
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
	]), K(() => {
		if (!n) return;
		let t = c.current, o = i.current;
		u.clear(), c.current = {
			onOpenChange: e.setOpen,
			setIsInstantPhase: f
		}, i.current = r, a.current = {
			open: 0,
			close: Fu(s.current, "close")
		}, o !== null && o !== r ? (f(!0), t?.setIsInstantPhase(!0), t?.onOpenChange(!1, Uc(Kc))) : (f(!1), t?.setIsInstantPhase(!1));
	}, [
		n,
		r,
		e,
		i,
		a,
		s,
		c,
		u
	]), K(() => () => {
		if (i.current === r) {
			if (c.current = null, !p.current) return;
			i.current = null, Bu(a, s), u.clear();
		}
	}, [
		c,
		i,
		a,
		r,
		s,
		u
	]), Uu.useMemo(() => ({
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
var Uu, Wu, Gu, Ku = o((() => {
	Uu = /* @__PURE__ */ u(b(), 1), Il(), mi(), zu(), Gc(), fl(), Wu = bs(), Gu = /*#__PURE__*/ Uu.createContext({
		hasProvider: !1,
		timeoutMs: 0,
		delayRef: { current: 0 },
		initialDelayRef: { current: 0 },
		timeout: new Fl(),
		currentIdRef: { current: null },
		currentContextRef: { current: null }
	});
}));
// node_modules/@base-ui/utils/addEventListener.mjs
function qu(e, t, n, r) {
	return e.addEventListener(t, n, r), () => {
		e.removeEventListener(t, n, r);
	};
}
var Ju = o((() => {}));
// node_modules/@base-ui/utils/mergeCleanups.mjs
function Yu(...e) {
	return () => {
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			n && n();
		}
	};
}
var Xu = o((() => {}));
// node_modules/@base-ui/utils/useValueAsRef.mjs
function Zu(e) {
	let t = ri(Qu, e).current;
	return t.next = e, K(t.effect), t;
}
function Qu(e) {
	let t = {
		current: e,
		next: e,
		effect: () => {
			t.current = t.next;
		}
	};
	return t;
}
var $u = o((() => {
	mi(), oi();
}));
// node_modules/@base-ui/utils/useAnimationFrame.mjs
function ed() {
	let e = ri(id.create).current;
	return Al(e.disposeEffect), e;
}
var td, nd, rd, id, ad = o((() => {
	oi(), Ml(), td = null, globalThis.requestAnimationFrame, nd = class {
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
	}, rd = new nd(), id = class e {
		static create() {
			return new e();
		}
		static request(e) {
			return rd.request(e);
		}
		static cancel(e) {
			return rd.cancel(e);
		}
		currentId = td;
		request(e) {
			this.cancel(), this.currentId = rd.request(() => {
				this.currentId = td, e();
			});
		}
		cancel = () => {
			this.currentId !== td && (rd.cancel(this.currentId), this.currentId = td);
		};
		disposeEffect = () => this.cancel;
	};
})), od, sd, cd, ld = o((() => {
	od = {
		clipPath: "inset(50%)",
		overflow: "hidden",
		whiteSpace: "nowrap",
		border: 0,
		padding: 0,
		width: 1,
		height: 1,
		margin: -1
	}, sd = {
		...od,
		position: "fixed",
		margin: 0,
		top: 0,
		left: 0
	}, cd = {
		...od,
		position: "absolute"
	};
})), ud, dd, fd, pd = o((() => {
	ud = /* @__PURE__ */ u(b(), 1), mi(), ru(), ld(), dd = bs(), fd = /*#__PURE__*/ ud.forwardRef(function(e, t) {
		let [n, r] = ud.useState();
		K(() => {
			Ql && Xl && r("button");
		}, []);
		let i = {
			tabIndex: 0,
			role: n
		};
		return /*#__PURE__*/ (0, dd.jsx)("span", {
			...e,
			ref: t,
			style: sd,
			"aria-hidden": !n || void 0,
			...i,
			"data-base-ui-focus-guard": ""
		});
	});
}));
// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
function md(e, t, n) {
	return Md(e, jd(t, n));
}
function hd(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function gd(e) {
	return e.split("-")[0];
}
function _d(e) {
	return e.split("-")[1];
}
function vd(e) {
	return e === "x" ? "y" : "x";
}
function yd(e) {
	return e === "y" ? "height" : "width";
}
function bd(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function xd(e) {
	return vd(bd(e));
}
function Sd(e, t, n) {
	n === void 0 && (n = !1);
	let r = _d(e), i = xd(e), a = yd(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Dd(o)), [o, Dd(o)];
}
function Cd(e) {
	let t = Dd(e);
	return [
		wd(e),
		t,
		wd(t)
	];
}
function wd(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
function Td(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Rd : Ld : t ? Ld : Rd;
		case "left":
		case "right": return t ? zd : Bd;
		default: return [];
	}
}
function Ed(e, t, n, r) {
	let i = _d(e), a = Td(gd(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(wd)))), a;
}
function Dd(e) {
	let t = gd(e);
	return Id[t] + e.slice(t.length);
}
function Od(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function kd(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Od(e);
}
function Ad(e) {
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
var jd, Md, Nd, Pd, Fd, Id, Ld, Rd, zd, Bd, Vd = o((() => {
	jd = Math.min, Md = Math.max, Nd = Math.round, Pd = Math.floor, Fd = (e) => ({
		x: e,
		y: e
	}), Id = {
		left: "right",
		right: "left",
		bottom: "top",
		top: "bottom"
	}, Ld = ["left", "right"], Rd = ["right", "left"], zd = ["top", "bottom"], Bd = ["bottom", "top"];
}));
// node_modules/@base-ui/react/floating-ui-react/utils/composite.mjs
function Hd(e, t) {
	return t < 0 || t >= e.length;
}
function Ud(e, t) {
	return Kd(e.current, { disabledIndices: t });
}
function Wd(e, t) {
	return Kd(e.current, {
		decrement: !0,
		startingIndex: e.current.length,
		disabledIndices: t
	});
}
function Gd(e, t, n) {
	let { decrement: r, loopFocus: i, allowEscape: a, disabledIndices: o, minIndex: s, maxIndex: c } = n, l = () => Kd(e, {
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
		index: Hd(e, u) ? -1 : u,
		wrapped: d
	};
}
function Kd(e, { startingIndex: t = -1, decrement: n = !1, disabledIndices: r, amount: i = 1 } = {}) {
	let a = t;
	do
		a += n ? -i : i;
	while (a >= 0 && a <= e.length - 1 && qd(e, a, r));
	return a;
}
function qd(e, t, n) {
	if (typeof n == "function" ? n(t) : n?.includes(t) ?? !1) return !0;
	let r = e[t];
	return r ? !Yd(r) || r.matches(":disabled") ? !0 : !n && (r.hasAttribute("disabled") || r.getAttribute("aria-disabled") === "true") : !1;
}
function Jd(e) {
	return e.visibility === "hidden" || e.visibility === "collapse";
}
function Yd(e, t = e ? Ur(e) : null) {
	return !e || !e.isConnected || !t || Jd(t) ? !1 : typeof e.checkVisibility == "function" ? e.checkVisibility() : t.display !== "none" && t.display !== "contents";
}
var Xd = o((() => {
	$r();
}));
// node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
function Zd(e) {
	let t = e.assignedSlot;
	if (t) return t;
	if (e.parentElement) return e.parentElement;
	let n = e.getRootNode();
	return Fr(n) ? n.host : null;
}
function Qd(e) {
	for (let t of Array.from(e.children)) if (kr(t) === "summary") return t;
	return null;
}
function $d(e, t) {
	let n = Qd(t);
	return !!n && (e === n || fu(n, e));
}
function ef(e) {
	let t = e ? kr(e) : "";
	return e != null && e.matches(bf) && (t !== "summary" || e.parentElement != null && kr(e.parentElement) === "details" && Qd(e.parentElement) === e) && (t !== "details" || Qd(e) == null) && (t !== "input" || e.type !== "hidden");
}
function tf(e) {
	if (!ef(e) || !e.isConnected || e.matches(":disabled")) return !1;
	for (let t = e; t; t = Zd(t)) {
		let n = t !== e, r = kr(t) === "slot";
		if (t.hasAttribute("inert") || n && kr(t) === "details" && !t.open && !$d(e, t) || t.hasAttribute("hidden") || !r && !nf(t, n)) return !1;
	}
	return !0;
}
function nf(e, t) {
	let n = Ur(e);
	return t ? n.display !== "none" : Yd(e, n);
}
function rf(e) {
	let t = e.tabIndex;
	if (t < 0) {
		let t = kr(e);
		if (t === "details" || t === "audio" || t === "video" || Pr(e) && e.isContentEditable) return 0;
	}
	return t;
}
function af(e) {
	if (kr(e) !== "input") return null;
	let t = e;
	return t.type === "radio" && t.name !== "" ? t : null;
}
function of(e, t) {
	let n = af(e);
	if (!n) return !0;
	let r = t.find((e) => {
		let t = af(e);
		return t?.name === n.name && t.form === n.form && t.checked;
	});
	return r ? r === n : t.find((e) => {
		let t = af(e);
		return t?.name === n.name && t.form === n.form;
	}) === n;
}
function sf(e) {
	if (Pr(e) && kr(e) === "slot") {
		let t = e.assignedElements({ flatten: !0 });
		if (t.length > 0) return t;
	}
	return Pr(e) && e.shadowRoot ? Array.from(e.shadowRoot.children) : Array.from(e.children);
}
function cf(e, t) {
	sf(e).forEach((e) => {
		ef(e) && t.push(e), cf(e, t);
	});
}
function lf(e, t, n) {
	sf(e).forEach((e) => {
		Pr(e) && e.matches(t) && n.push(e), lf(e, t, n);
	});
}
function uf(e) {
	return tf(e) && rf(e) >= 0;
}
function df(e) {
	let t = [];
	return cf(e, t), t.filter(tf);
}
function ff(e) {
	let t = df(e);
	return t.filter((e) => rf(e) >= 0 && of(e, t));
}
function pf(e, t) {
	let n = ff(e), r = n.length;
	if (r === 0) return;
	let i = du(Ui(e)), a = n.indexOf(i);
	return n[a === -1 ? t === 1 ? 0 : r - 1 : a + t];
}
function mf(e) {
	return pf(Ui(e).body, 1) || e;
}
function hf(e) {
	return pf(Ui(e).body, -1) || e;
}
function gf(e, t, n) {
	if (!e) return null;
	let r = [];
	cf(Ui(e).body, r);
	let i = r.indexOf(e);
	if (i === -1) return null;
	let a = r.filter(tf);
	for (let e = 1; e < r.length; e += 1) {
		let o = r[(i + t * e + r.length) % r.length];
		if (!fu(n, o) && uf(o) && of(o, a)) return o;
	}
	return r[i];
}
function _f(e, t) {
	let n = t || e.currentTarget, r = e.relatedTarget;
	return !r || !fu(n, r);
}
function vf(e) {
	ff(e).forEach((e) => {
		e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
	});
}
function yf(e) {
	let t = [];
	lf(e, "[data-tabindex]", t), t.forEach((e) => {
		let t = e.dataset.tabindex;
		delete e.dataset.tabindex, t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex");
	});
}
var bf, xf = o((() => {
	$r(), Wi(), Nu(), Xd(), bf = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
}));
// node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function Sf(e, t, n = !0) {
	return e.filter((e) => e.parentId === t).flatMap((t) => [...!n || t.context?.open ? [t] : [], ...Sf(e, t.id, n)]);
}
function Cf(e, t) {
	let n = [], r = e.find((e) => e.id === t)?.parentId;
	for (; r;) {
		let t = e.find((e) => e.id === r);
		r = t?.parentId, t && (n = n.concat(t));
	}
	return n;
}
var wf = o((() => {}));
// node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function Tf(e) {
	return `data-base-ui-${e}`;
}
var Ef = o((() => {}));
// node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs
function Df(e, t = {}) {
	let { preventScroll: n = !1, sync: r = !1, shouldFocus: i } = t;
	cancelAnimationFrame(Of);
	function a() {
		(!i || i()) && e?.focus({ preventScroll: n });
	}
	if (r) return a(), da;
	let o = requestAnimationFrame(a);
	return Of = o, () => {
		Of === o && (cancelAnimationFrame(o), Of = 0);
	};
}
var Of, kf = o((() => {
	ma(), Of = 0;
}));
// node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs
function Af(e) {
	return e ? Fr(e) ? e.host : Af(e.parentNode) : null;
}
function jf(e, t, n, { mark: r = !0 }) {
	let i = Rf(t, e), a = r ? Bf(t, zf(i), new Set(i)) : [], o = [], s = [];
	if (n) {
		let e = Rf(t, Array.from(t.querySelectorAll("[aria-live]"))), n = i.concat(e);
		Bf(t, zf(n), new Set(n)).forEach((e) => {
			let t = e.getAttribute("aria-hidden"), n = t !== null && t !== "false", r = (Pf.get(e) || 0) + 1;
			Pf.set(e, r), o.push(e), r === 1 && n && Ff.add(e), n || e.setAttribute("aria-hidden", "true");
		});
	}
	return r && a.forEach((e) => {
		let t = (If.get(e) || 0) + 1;
		If.set(e, t), s.push(e), t === 1 && e.setAttribute(Nf, "");
	}), Lf += 1, () => {
		o.forEach((e) => {
			let t = (Pf.get(e) || 0) - 1;
			Pf.set(e, t), t || (Ff.has(e) || e.removeAttribute("aria-hidden"), Ff.delete(e));
		}), r && s.forEach((e) => {
			let t = (If.get(e) || 0) - 1;
			If.set(e, t), t || e.removeAttribute(Nf);
		}), --Lf, Lf || (Pf = /* @__PURE__ */ new WeakMap(), Ff = /* @__PURE__ */ new WeakSet(), If = /* @__PURE__ */ new WeakMap());
	};
}
function Mf(e, t = {}) {
	let { ariaHidden: n = !1, mark: r = !0 } = t, i = Ui(e[0]).body;
	return jf(e, i, n, { mark: r });
}
var Nf, Pf, Ff, If, Lf, Rf, zf, Bf, Vf = o((() => {
	$r(), Wi(), Nf = "data-base-ui-inert", Pf = /* @__PURE__ */ new WeakMap(), Ff = /* @__PURE__ */ new WeakSet(), If = /* @__PURE__ */ new WeakMap(), Lf = 0, Rf = (e, t) => t.map((t) => {
		if (e.contains(t)) return t;
		let n = Af(t);
		return e.contains(n) ? n : null;
	}).filter((e) => e != null), zf = (e) => {
		let t = /* @__PURE__ */ new Set();
		return e.forEach((e) => {
			let n = e;
			for (; n && !t.has(n);) t.add(n), n = n.parentNode;
		}), t;
	}, Bf = (e, t, n) => {
		let r = [], i = (e) => {
			e && !n.has(e) && Array.from(e.children).forEach((e) => {
				kr(e) !== "script" && (t.has(e) ? i(e) : r.push(e));
			});
		};
		return i(e), r;
	};
})), Hf, Uf, Wf, Gf, Kf, qf = o((() => {
	Hf = { style: { transition: "none" } }, Uf = "data-base-ui-click-trigger", Wf = { fallbackAxisSide: "none" }, Gf = { fallbackAxisSide: "end" }, Kf = {
		clipPath: "inset(50%)",
		position: "fixed",
		top: 0,
		left: 0
	};
}));
// node_modules/@base-ui/react/floating-ui-react/components/FloatingPortal.mjs
function Jf(e = {}) {
	let { ref: t, container: n, componentProps: r = pa, elementProps: i } = e, a = bl(), o = $f()?.portalNode, [s, c] = Yf.useState(null), [l, u] = Yf.useState(null), d = G((e) => {
		e !== null && u(e);
	}), f = Yf.useRef(null);
	K(() => {
		if (n === null) {
			f.current && (f.current = null, u(null), c(null));
			return;
		}
		let e = (n && (Mr(n) ? n : n.current)) ?? o ?? document.body;
		e == null ? f.current && (f.current = null, u(null), c(null)) : f.current !== e && (f.current = e, u(null), c(e));
	}, [n, o]);
	let p = xa("div", r, {
		ref: [t, d],
		props: [{
			id: a,
			[ep]: ""
		}, i]
	}), m = s && p ? /*#__PURE__*/ Xf.createPortal(p, s) : null;
	return {
		node: l,
		nodeId: /*#__PURE__*/ Yf.isValidElement(p) ? p.props.id : void 0,
		subtree: m
	};
}
var Yf, Xf, Zf, Qf, $f, ep, tp, np = o((() => {
	Yf = /* @__PURE__ */ u(b(), 1), Xf = /* @__PURE__ */ u(Os(), 1), $r(), Ju(), Xu(), wl(), mi(), di(), ma(), pd(), xf(), Gc(), fl(), Ef(), Aa(), qf(), Zf = bs(), Qf = /*#__PURE__*/ Yf.createContext(null), $f = () => Yf.useContext(Qf), ep = Tf("portal"), tp = /*#__PURE__*/ Yf.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, children: a, container: o, portalOwnerRole: s, ...c } = e, { node: l, nodeId: u, subtree: d } = Jf({
			container: o,
			ref: t,
			componentProps: e,
			elementProps: c
		}), f = Yf.useRef(null), p = Yf.useRef(null), m = Yf.useRef(null), h = Yf.useRef(null), [g, _] = Yf.useState(null), v = Yf.useRef(!1), y = g?.modal, b = g?.open, x = !!g && !g.modal && g.open && !!l;
		Yf.useEffect(() => {
			if (!l || y) return;
			function e(e) {
				l && e.relatedTarget && _f(e) && (e.type === "focusin" ? v.current &&= (yf(l), !1) : (vf(l), v.current = !0));
			}
			return Yu(qu(l, "focusin", e, !0), qu(l, "focusout", e, !0));
		}, [l, y]), K(() => {
			l && b === !0 && v.current && (yf(l), v.current = !1);
		}, [b, l]);
		let S = Yf.useMemo(() => ({
			beforeOutsideRef: f,
			afterOutsideRef: p,
			beforeInsideRef: m,
			afterInsideRef: h,
			portalNode: l,
			setFocusManagerState: _
		}), [l]);
		return /*#__PURE__*/ (0, Zf.jsxs)(Yf.Fragment, { children: [d, /*#__PURE__*/ (0, Zf.jsxs)(Qf.Provider, {
			value: S,
			children: [
				x && l && /*#__PURE__*/ (0, Zf.jsx)(fd, {
					"data-type": "outside",
					ref: f,
					onFocus: (e) => {
						_f(e, l) ? m.current?.focus() : hf(g ? g.domReference : null)?.focus();
					}
				}),
				x && l && /*#__PURE__*/ (0, Zf.jsx)("span", {
					role: s,
					"aria-owns": u,
					style: Kf
				}),
				l && /*#__PURE__*/ Xf.createPortal(a, l),
				x && l && /*#__PURE__*/ (0, Zf.jsx)(fd, {
					"data-type": "outside",
					ref: p,
					onFocus: (e) => {
						_f(e, l) ? h.current?.focus() : (mf(g ? g.domReference : null)?.focus(), g?.closeOnFocusOut && g?.onOpenChange(!1, Uc("focus-out", e.nativeEvent)));
					}
				})
			]
		})] });
	});
}));
// node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function rp() {
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
var ip = o((() => {})), ap, op = o((() => {
	ip(), ap = class {
		nodesRef = { current: [] };
		events = rp();
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
function sp(e) {
	let t = bl(), n = hp(e), r = mp();
	return K(() => {
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
function cp(e) {
	let { children: t, id: n } = e, r = mp();
	return /*#__PURE__*/ (0, dp.jsx)(fp.Provider, {
		value: up.useMemo(() => ({
			id: n,
			parentId: r
		}), [n, r]),
		children: t
	});
}
function lp(e) {
	let { children: t, externalTree: n } = e, r = ri(() => n ?? new ap()).current;
	return /*#__PURE__*/ (0, dp.jsx)(pp.Provider, {
		value: r,
		children: t
	});
}
var up, dp, fp, pp, mp, hp, gp = o((() => {
	up = /* @__PURE__ */ u(b(), 1), wl(), mi(), oi(), op(), dp = bs(), fp = /*#__PURE__*/ up.createContext(null), pp = /*#__PURE__*/ up.createContext(null), mp = () => up.useContext(fp)?.id || null, hp = (e) => {
		let t = up.useContext(pp);
		return e ?? t;
	};
}));
// node_modules/@base-ui/react/utils/resolveRef.mjs
function _p(e) {
	return e == null ? e : "current" in e ? e.current : e;
}
var vp = o((() => {}));
// node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs
function yp(e, t) {
	let n = Ar(mu(e));
	return e instanceof n.KeyboardEvent ? "keyboard" : e instanceof n.FocusEvent ? t || "keyboard" : "pointerType" in e ? e.pointerType || (ou(e) ? "keyboard" : t || "mouse") : "touches" in e ? "touch" : e instanceof n.MouseEvent ? t || (e.detail === 0 ? "keyboard" : "mouse") : "";
}
function bp() {
	kp = kp.filter((e) => e.deref()?.isConnected);
}
function xp(e) {
	bp(), e && kr(e) !== "body" && (kp.push(new WeakRef(e)), kp.length > Op && (kp = kp.slice(-20)));
}
function Sp() {
	return bp(), kp[kp.length - 1]?.deref();
}
function Cp(e) {
	return e ? uf(e) ? e : ff(e)[0] || e : null;
}
function wp(e) {
	if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !e.getAttribute("role")?.includes("dialog")) return;
	let t = df(e).filter((e) => {
		let t = e.getAttribute("data-tabindex") || "";
		return uf(e) || e.hasAttribute("data-tabindex") && !t.startsWith("-");
	}), n = e.getAttribute("tabindex");
	t.length === 0 ? n !== "0" && (e.setAttribute("tabindex", "0"), e.setAttribute("data-tabindex", "0")) : (n !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tabindex", "-1"));
}
function Tp(e) {
	let { context: t, children: n, disabled: r = !1, initialFocus: i = !0, returnFocus: a = !0, explicitReturnFocus: o, restoreFocus: s = !1, modal: c = !0, closeOnFocusOut: l = !0, openInteractionType: u = "", nextFocusableElement: d, previousFocusableElement: f, beforeContentFocusGuardRef: p, externalTree: m, getInsideElements: h } = e, g = t.useState("open"), _ = t.useState("domReferenceElement"), v = t.useState("floatingElement"), { events: y, dataRef: b } = t.context, x = G(() => b.current.floatingContext?.nodeId), S = i === !1, C = Au(_) && S, w = Zu(i), T = Zu(a), E = Zu(o), D = Zu(u), O = Zu(g), k = hp(m), A = $f(), j = Ep.useRef(!1), M = Ep.useRef(!1), N = Ep.useRef(!1), P = Ep.useRef(null), F = Ep.useRef(""), I = Ep.useRef(""), L = Ep.useRef(null), R = Ep.useRef(null), ee = Qi(L, p, A?.beforeInsideRef), z = Qi(R, A?.afterInsideRef), B = Nl(), V = Nl(), te = ed(), ne = A != null, H = Mu(v), re = G((e = H) => e ? ff(e) : []), U = G(() => h?.().filter((e) => e != null) ?? []);
	Ep.useEffect(() => {
		if (r || !c) return;
		function e(e) {
			e.key === "Tab" && fu(H, du(Ui(H))) && re().length === 0 && !C && iu(e);
		}
		return qu(Ui(H), "keydown", e);
	}, [
		r,
		H,
		c,
		C,
		re
	]), Ep.useEffect(() => {
		if (r || !g) return;
		let e = Ui(H);
		function t() {
			N.current = !1;
		}
		function n(e) {
			let t = mu(e), n = U(), r = fu(v, t) || fu(_, t) || fu(A?.portalNode, t) || n.some((e) => e === t || fu(e, t));
			N.current = !r, I.current = e.pointerType || "keyboard", pu(t, "[data-base-ui-click-trigger]") && (M.current = !0, V.start(0, () => {
				M.current = !1;
			}));
		}
		function i() {
			I.current = "keyboard";
		}
		return Yu(qu(e, "pointerdown", n, !0), qu(e, "pointerup", t, !0), qu(e, "pointercancel", t, !0), qu(e, "keydown", i, !0), t);
	}, [
		r,
		v,
		_,
		H,
		g,
		A,
		V,
		U
	]), Ep.useEffect(() => {
		if (r || !l) return;
		let e = Ui(H);
		function n() {
			M.current = !0, V.start(0, () => {
				M.current = !1;
			});
		}
		function i(e) {
			let t = mu(e);
			uf(t) && (P.current = t);
		}
		function a(n) {
			let r = n.relatedTarget, i = n.currentTarget, a = mu(n);
			c && r == null && a != null && fu(v, a) && xp(a), queueMicrotask(() => {
				let o = x(), l = t.context.triggerElements, u = U(), p = r?.hasAttribute(Tf("focus-guard")) && [
					L.current,
					R.current,
					A?.beforeInsideRef.current,
					A?.afterInsideRef.current,
					A?.beforeOutsideRef.current,
					A?.afterOutsideRef.current,
					_p(f),
					_p(d)
				].includes(r), m = !(fu(_, r) || fu(v, r) || fu(r, v) || fu(A?.portalNode, r) || u.some((e) => e === r || fu(e, r)) || l.hasMatchingElement((e) => fu(e, r)) || p || k && (Sf(k.nodesRef.current, o).find((e) => fu(e.context?.elements.floating, r) || fu(e.context?.elements.domReference, r)) || Cf(k.nodesRef.current, o).find((e) => [e.context?.elements.floating, Mu(e.context?.elements.floating)].includes(r) || e.context?.elements.domReference === r)));
				if (i === _ && H && wp(H), s && i !== _ && !Yd(a) && du(e) === e.body) {
					if (Pr(H) && (H.focus(), s === "popup")) {
						te.request(() => {
							H.focus();
						});
						return;
					}
					let e = re(), t = P.current, n = (t && e.includes(t) ? t : null) || e[e.length - 1] || H;
					Pr(n) && n.focus();
				}
				b.current.insideReactTree ? b.current.insideReactTree = !1 : (C || !c) && r && m && !M.current && (C || r !== Sp()) && (j.current = !0, t.setOpen(!1, Uc($c, n)));
			});
		}
		function o() {
			N.current || (b.current.insideReactTree = !0, B.start(0, () => {
				b.current.insideReactTree = !1;
			}));
		}
		let u = Pr(_) ? _ : null;
		if (v || u) return Yu(u && qu(u, "focusout", a), u && qu(u, "pointerdown", n), v && qu(v, "focusin", i), v && qu(v, "focusout", a), v && A && qu(v, "focusout", o, !0));
	}, [
		r,
		_,
		v,
		H,
		c,
		k,
		A,
		t,
		l,
		s,
		re,
		C,
		x,
		b,
		B,
		V,
		te,
		d,
		f,
		U
	]), Ep.useEffect(() => {
		if (r || !v || !g) return;
		let e = Array.from(A?.portalNode?.querySelectorAll(`[${Tf("portal")}]`) || []), t = (k ? Cf(k.nodesRef.current, x()) : []).find((e) => Au(e.context?.elements.domReference || null))?.context?.elements.domReference, n = Mf([
			v,
			...e,
			L.current,
			R.current,
			A?.beforeOutsideRef.current,
			A?.afterOutsideRef.current,
			...U(),
			t,
			_p(f),
			_p(d),
			C ? _ : null
		].filter((e) => e != null), {
			ariaHidden: c || C,
			mark: !1
		}), i = Mf([v, ...e].filter((e) => e != null));
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
		U
	]), K(() => {
		if (!g || r || !Pr(H)) return;
		F.current = "", I.current = "";
		let e = Ui(H), t = du(e);
		queueMicrotask(() => {
			let n = w.current, r = typeof n == "function" ? n(D.current || "") : n;
			if (r === void 0 || r === !1 || fu(H, t)) return;
			let i = null, a = () => (i ??= re(H), i[0] || H), o;
			o = r === !0 || r === null ? a() : _p(r), o ||= a();
			let s = fu(H, du(e)), c = b.current.openEvent, l = c?.type === "mousedown" && ou(c);
			Df(o, {
				sync: l,
				preventScroll: o === H,
				shouldFocus() {
					if (!O.current) return !1;
					if (s) return !0;
					let t = du(e);
					return !(t !== o && fu(H, t));
				}
			});
		});
	}, [
		r,
		g,
		H,
		re,
		w,
		D,
		O,
		b
	]);
	let ie = Ep.useRef(null);
	K(() => {
		if (r || !H) {
			ie.current = null;
			return;
		}
		ie.current &&= (ie.current.cancelled = !0, null);
		let e = Ui(H), t = du(e), n = D.current == null;
		xp(t);
		function i(e) {
			if (e.open || (F.current = yp(e.nativeEvent, I.current)), (e.reason === "focus-out" && e.triggerElement?.hasAttribute(Tf("focus-guard")) || e.reason === "trigger-hover" && e.nativeEvent.type === "mouseleave") && (j.current = !0), e.reason === "outside-press") {
				if (e.nested) j.current = !1;
				else if (ou(e.nativeEvent) || su(e.nativeEvent)) j.current = !1;
				else {
					let e = !1;
					Ui(H).createElement("div").focus({ get preventScroll() {
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
			let a = _?.isConnected ? _ : null, o = t?.isConnected && kr(t) !== "body" ? t : null, s = n ? o || a : a || o;
			return s ||= Sp() || null, typeof i == "boolean" ? s : _p(i) || s || null;
		}
		return () => {
			y.off("openchange", i);
			let t = du(e), n = U(), r = fu(v, t) || n.some((e) => e === t || fu(e, t)) || k && Sf(k.nodesRef.current, x(), !1).some((e) => fu(e.context?.elements.floating, t)), o = T.current, s = F.current, c = a(s), l = { cancelled: !1 };
			ie.current = l, queueMicrotask(() => {
				ie.current === l && (ie.current = null);
				let n = Cp(c), i = E.current ?? typeof o != "boolean";
				if (!l.cancelled && o && !j.current && Pr(n) && (i || n === t || t === e.body || r)) {
					let e = { preventScroll: !0 };
					s === "keyboard" && (e.focusVisible = !0), n.focus(e);
				}
				j.current = !1;
			});
		};
	}, [
		r,
		v,
		H,
		T,
		E,
		D,
		y,
		k,
		_,
		x,
		U
	]), K(() => {
		if (!Xl || g || !v) return;
		let e = du(Ui(v));
		Pr(e) && Ou(e) && fu(v, e) && e.blur();
	}, [g, v]), K(() => {
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
	]), K(() => {
		if (!r && H) return wp(H), () => {
			queueMicrotask(bp);
		};
	}, [r, H]);
	let W = !r && (!c || !C) && (ne || c);
	return /*#__PURE__*/ (0, Dp.jsxs)(Ep.Fragment, { children: [
		W && /*#__PURE__*/ (0, Dp.jsx)(fd, {
			"data-type": "inside",
			ref: ee,
			onFocus: (e) => {
				if (c) {
					let e = re();
					Df(e[e.length - 1]);
				} else A?.portalNode && (j.current = !1, _f(e, A.portalNode) ? mf(_)?.focus() : _p(f ?? A.beforeOutsideRef)?.focus());
			}
		}),
		n,
		W && /*#__PURE__*/ (0, Dp.jsx)(fd, {
			"data-type": "inside",
			ref: z,
			onFocus: (e) => {
				c ? Df(re()[0]) : A?.portalNode && (l && (j.current = !0), _f(e, A.portalNode) ? hf(_)?.focus() : _p(d ?? A.afterOutsideRef)?.focus());
			}
		})
	] });
}
var Ep, Dp, Op, kp, Ap = o((() => {
	Ep = /* @__PURE__ */ u(b(), 1), $r(), Ju(), Xu(), ia(), $u(), di(), mi(), Il(), ru(), ad(), Wi(), pd(), Nu(), uu(), xf(), wf(), Xd(), Gc(), fl(), Ef(), kf(), Vf(), np(), gp(), qf(), vp(), Dp = bs(), Op = 20, kp = [];
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs
function jp(e, t = {}) {
	let { enabled: n = !0, event: r = "click", toggle: i = !0, ignoreMouse: a = !1, stickIfOpen: o = !0, touchOpenDelay: s = 0, reason: c = qc } = t, l = e.context.dataRef, u = Mp.useRef(void 0), d = ed(), f = Nl(), p = Mp.useMemo(() => {
		function t(t, n, r, i) {
			let a = Uc(c, n, r);
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
				u.current = cu(e.pointerType, !0) && su(e.nativeEvent) ? "virtual" : e.pointerType;
			},
			onMouseDown(i) {
				let o = u.current, s = i.nativeEvent, c = e.select("open");
				if (i.button !== 0 || r === "click" || cu(o, !0) && a) return;
				let l = n(c, i.currentTarget, (e) => e === "click" || e === "mousedown"), f = mu(s), p = Ou(f);
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
				r === "mousedown" && o ? u.current = void 0 : cu(o, !0) && a || t(n(e.select("open"), i.currentTarget, (e) => e === "click" || e === "mousedown" || e === "keydown" || e === "keyup"), i.nativeEvent, i.currentTarget, o);
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
	return Mp.useMemo(() => n ? { reference: p } : pa, [n, p]);
}
var Mp, Np = o((() => {
	Mp = /* @__PURE__ */ u(b(), 1), ad(), Il(), ma(), Nu(), uu(), Gc(), fl();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useClientPoint.mjs
function Pp(e, t) {
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
function Fp(e) {
	return e != null && e.clientX != null;
}
function Ip(e, t = {}) {
	let { enabled: n = !0, axis: r = "both" } = t, i = e.useState("open"), a = e.useState("floatingElement"), o = e.useState("domReferenceElement"), s = e.context.dataRef, c = Lp.useRef(!1), l = Lp.useRef(null), [u, d] = Lp.useState(), [f, p] = Lp.useState([]), m = G((t) => {
		e.set("positionReference", t);
	}), h = G((t, n, i) => {
		c.current || (!s.current.openEvent || Fp(s.current.openEvent)) && e.set("positionReference", Pp(i ?? o, {
			x: t,
			y: n,
			axis: r,
			dataRef: s,
			pointerType: u
		}));
	}), g = G((e) => {
		i ? l.current || (h(e.clientX, e.clientY, e.currentTarget), p([])) : h(e.clientX, e.clientY, e.currentTarget);
	}), _ = cu(u) ? a : i;
	Lp.useEffect(() => {
		if (!n) {
			m(o);
			return;
		}
		if (!_) return;
		function e() {
			l.current?.(), l.current = null;
		}
		let t = Ar(a);
		function r(t) {
			let n = mu(t);
			fu(a, n) ? e() : h(t.clientX, t.clientY);
		}
		return !s.current.openEvent || Fp(s.current.openEvent) ? l.current = qu(t, "mousemove", r) : m(o), e;
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
	]), Lp.useEffect(() => () => {
		e.set("positionReference", null);
	}, [e]), Lp.useEffect(() => {
		n && !a && (c.current = !1);
	}, [n, a]), Lp.useEffect(() => {
		!n && i && (c.current = !0);
	}, [n, i]);
	let v = Lp.useMemo(() => {
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
	return Lp.useMemo(() => n ? {
		reference: v,
		trigger: v
	} : {}, [n, v]);
}
var Lp, Rp = o((() => {
	Lp = /* @__PURE__ */ u(b(), 1), Ju(), di(), $r(), Nu(), uu();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs
function zp() {
	return !1;
}
function Bp(e) {
	return {
		escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? !1,
		outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? !0
	};
}
function Vp(e, t = {}) {
	let { enabled: n = !0, escapeKey: r = !0, outsidePress: i = !0, outsidePressEvent: a = "sloppy", referencePress: o = zp, bubbles: s, externalTree: c } = t, l = e.useState("open"), u = e.useState("floatingElement"), { dataRef: d, events: f } = e.context, p = hp(c), m = G(typeof i == "function" ? i : () => !1), h = typeof i == "function" ? m : i, g = h !== !1, _ = G(() => a), { escapeKey: v, outsidePress: y } = Bp(s), b = Hp.useRef(!1), x = Hp.useRef(!1), S = Hp.useRef(!1), C = Hp.useRef(!1), w = Hp.useRef(!1), T = Hp.useRef(""), E = Hp.useRef(null), D = Nl(), O = Nl(), k = Nl(), A = G(() => {
		O.clear(), d.current.insideReactTree = !1;
	}), j = G((e) => {
		let t = d.current.floatingContext?.nodeId;
		return (p ? Sf(p.nodesRef.current, t) : []).some((t) => t.context?.open && !t.context.dataRef.current[e]);
	}), M = G((t) => Eu(t, e.select("floatingElement")) || Eu(t, e.select("domReferenceElement"))), N = G((t) => {
		o() && e.setOpen(!1, Uc(qc, t.nativeEvent));
	}), P = G((t) => {
		if (!l || !n || !r || t.key !== "Escape") return;
		let i = au(t) ? t.nativeEvent : t;
		if (w.current || i.isComposing || !v && j("__escapeKeyBubbles")) return;
		let a = Uc(el, i);
		e.setOpen(!1, a), a.isCanceled || t.preventDefault(), !v && !a.isPropagationAllowed && t.stopPropagation();
	}), F = G(() => {
		d.current.insideReactTree = !0, O.start(0, A);
	}), I = G((t) => {
		if (!l || !n || t.button !== 0) return;
		let r = mu(t.nativeEvent);
		fu(e.select("floatingElement"), r) && (b.current || (b.current = !0, x.current = !1));
	}), L = G((e) => {
		l && n && (e.defaultPrevented || e.nativeEvent.defaultPrevented) && b.current && (x.current = !0);
	});
	Hp.useEffect(() => {
		function e(e) {
			e.open || (C.current = !1);
		}
		return f.on("openchange", e), () => {
			f.off("openchange", e);
		};
	}, [f]), Hp.useEffect(() => A, [A]), Hp.useEffect(() => {
		if (!l || !n) return l || (C.current = !1, w.current = !1, T.current = "", E.current = null), A;
		d.current.__escapeKeyBubbles = v, d.current.__outsidePressBubbles = y;
		let t = new Fl(), i = Ui(u);
		function a() {
			k.clear(), w.current = !0;
		}
		function o() {
			w.current = !0, k.start(Xl ? 5 : 0, () => {
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
			let t = d.current.floatingContext?.nodeId, n = p && Sf(p.nodesRef.current, t).some((t) => Eu(e, t.context?.elements.floating));
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
			let r = mu(n), i = `[${Tf("inert")}]`, a = Nr(r) ? r.getRootNode() : null, o = Array.from((Fr(a) ? a : Ui(e.select("floatingElement"))).querySelectorAll(i)), s = e.context.triggerElements;
			if (r && (s.hasElement(r) || s.hasMatchingElement((e) => fu(e, r)))) return;
			let c = Nr(r) ? r : null;
			for (; c && !Hr(c);) {
				let e = Gr(c);
				if (Hr(e) || !Nr(e)) break;
				c = e;
			}
			if (!(o.length && Nr(r) && !Du(r) && !fu(r, e.select("floatingElement")) && o.every((e) => !fu(c, e)))) {
				if (Pr(r) && !("touches" in n)) {
					let e = Hr(r), t = Ur(r), i = /auto|scroll/, a = e || i.test(t.overflowX), o = e || i.test(t.overflowY), s = a && r.clientWidth > 0 && r.scrollWidth > r.clientWidth, c = o && r.clientHeight > 0 && r.scrollHeight > r.clientHeight, l = t.direction === "rtl", u = c && (l ? n.offsetX <= r.offsetWidth - r.clientWidth : n.offsetX > r.clientWidth), d = s && n.offsetY > r.clientHeight;
					if (u || d) return;
				}
				if (!O(n)) {
					if (f() === "intentional") {
						if (n.detail !== 0 && !ou(n) && !C.current) return;
						if (S.current) {
							t.clear(), S.current = !1;
							return;
						}
					}
					typeof h == "function" && !h(n) || j("__outsidePressBubbles") || (e.setOpen(!1, Uc(Xc, n)), A());
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
			let n = mu(e);
			if (!n) return;
			let r = qu(n, e.type, () => {
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
		function B(e) {
			if (f() !== "sloppy" || !E.current || M(e)) return;
			let t = e.touches[0];
			if (!t) return;
			let n = Math.abs(t.clientX - E.current.startX), r = Math.abs(t.clientY - E.current.startY), i = Math.sqrt(n * n + r * r);
			i > 5 && (E.current.dismissOnTouchEnd = !0), i > 10 && (N(e), D.clear(), E.current = null);
		}
		function V(e) {
			L(e, B);
		}
		function te(e) {
			f() === "sloppy" && E.current && !M(e) && (E.current.dismissOnTouchEnd && N(e), D.clear(), E.current = null);
		}
		function ne(e) {
			L(e, te);
		}
		let H = Yu(r && Yu(qu(i, "keydown", P), qu(i, "compositionstart", a), qu(i, "compositionend", o)), g && Yu(qu(i, "click", ee, !0), qu(i, "pointerdown", ee, !0), qu(i, "pointerup", z, !0), qu(i, "pointercancel", z, !0), qu(i, "mousedown", ee, !0), qu(i, "mouseup", z, !0), qu(i, "touchstart", R, {
			capture: !0,
			passive: !0
		}), qu(i, "touchmove", V, {
			capture: !0,
			passive: !0
		}), qu(i, "touchend", ne, {
			capture: !0,
			passive: !0
		})));
		return () => {
			H(), t.clear(), c(), S.current = !1;
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
	let R = Hp.useMemo(() => ({
		onKeyDown: P,
		onPointerDown: N,
		onClick: N
	}), [P, N]), ee = Hp.useMemo(() => ({
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
	return Hp.useMemo(() => n ? {
		reference: R,
		floating: ee,
		trigger: R
	} : {}, [
		n,
		R,
		ee
	]);
}
var Hp, Up = o((() => {
	Hp = /* @__PURE__ */ u(b(), 1), Ju(), Xu(), Wi(), di(), Il(), $r(), ru(), gp(), Gc(), fl(), Ef(), Nu(), uu(), wf();
})), Wp = o((() => {})), Gp = o((() => {}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useSyncedFloatingRootContext.mjs
function Kp(e) {
	let { popupStore: t, treatPopupAsFloatingElement: n = !1, floatingRootContext: r, floatingId: i, nested: a, onOpenChange: o } = e, s = t.useState("open"), c = t.useState("activeTriggerElement"), l = t.useState(n ? "popupElement" : "positionerElement"), u = o;
	return t.useSyncedValue("floatingId", i), K(() => {
		let e = {
			open: s,
			floatingId: i,
			referenceElement: c,
			floatingElement: l
		};
		Nr(c) && (e.domReferenceElement = c), r.state.positionReference === r.state.referenceElement && (e.positionReference = c), r.update(e);
	}, [
		s,
		i,
		c,
		l,
		r
	]), r.context.onOpenChange = u, r.context.nested = a, r;
}
var qp = o((() => {
	mi(), $r();
}));
// node_modules/@base-ui/react/internals/useTransitionStatus.mjs
function Jp(e, t = !1, n = !1, r = !1) {
	let [i, a] = Yp.useState(e && t ? "idle" : void 0), [o, s] = Yp.useState(e && !r);
	return e && !o && (s(!0), a("starting")), !e && o && i !== "ending" && !n && a("ending"), !e && !o && i === "ending" && a(void 0), K(() => {
		if (!e && o && i !== "ending" && n) {
			let e = id.request(() => {
				a("ending");
			});
			return () => {
				id.cancel(e);
			};
		}
	}, [
		e,
		o,
		i,
		n
	]), K(() => {
		if (!e || t || i === void 0) return;
		let n = id.request(() => {
			a(void 0);
		});
		return () => {
			id.cancel(n);
		};
	}, [
		t,
		e,
		i
	]), K(() => {
		if (!e || !t) return;
		e && o && i !== "idle" && a("starting");
		let n = id.request(() => {
			a("idle");
		});
		return () => {
			id.cancel(n);
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
var Yp, Xp = o((() => {
	Yp = /* @__PURE__ */ u(b(), 1), mi(), ad();
}));
// node_modules/@base-ui/react/utils/getFiniteAnimations.mjs
function Zp(e, t) {
	return e.getAnimations(t).filter((e) => {
		let t = e.effect?.getTiming();
		return t?.duration !== Infinity && t?.iterations !== Infinity;
	});
}
var Qp = o((() => {}));
// node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
function $p(e) {
	if (!nm) {
		let e = [];
		nm = e, queueMicrotask(() => {
			nm = null, tm.flushSync(() => {
				for (let t of e) t();
			});
		});
	}
	nm.push(e);
}
function em(e, t = !1, n = !1) {
	let r = ed();
	return G((i, a = null) => {
		r.cancel();
		let o = _p(e);
		if (o == null) return;
		let s = o, c = () => {
			n ? $p(() => {
				a?.aborted || i();
			}) : tm.flushSync(i);
		};
		if (typeof s.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
			i();
			return;
		}
		function l() {
			Promise.all(Zp(s).map((e) => e.finished.then(da))).then(() => {
				a?.aborted || c();
			}, () => {
				a?.aborted || (Zp(s).some((e) => e.pending || e.playState !== "finished") ? l() : c());
			});
		}
		if (t) {
			let e = hc;
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
var tm, nm, rm = o((() => {
	tm = /* @__PURE__ */ u(Os(), 1), ad(), di(), ma(), vp(), Qp(), _c(), nm = null;
}));
// node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs
function im(e) {
	let { enabled: t = !0, open: n, ref: r, batch: i = !1, onComplete: a } = e, o = G(a), s = em(r, n, i);
	am.useEffect(() => {
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
var am, om = o((() => {
	am = /* @__PURE__ */ u(b(), 1), di(), rm();
}));
// node_modules/@base-ui/react/internals/useUnmountAfterClose.mjs
function sm(e) {
	let { open: t, ref: n, preventUnmountOnClose: r, setPreventUnmountOnClose: i, onUnmount: a, animateInitialOpen: o } = e, s = G(i), { mounted: c, setMounted: l, transitionStatus: u } = Jp(t, !1, !1, o), d = !t && r;
	K(() => {
		t && s(!1);
	}, [t, s]);
	let f = cm.useRef(c), p = cm.useRef(!1), m = gl(), h = () => {
		f.current = !1, l(!1), a();
	};
	K(() => {
		f.current = c, p.current && (p.current = !1, !t && c && h());
	});
	let g = G(() => {
		f.current && (t ? (p.current = !0, m()) : h());
	});
	return im({
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
var cm, lm = o((() => {
	cm = /* @__PURE__ */ u(b(), 1), di(), mi(), vl(), Xp(), om();
}));
// node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs
function um(e) {
	return (t) => t !== "touch" || e.current;
}
function dm(e, t = !1) {
	let n = bl(), r = mp() != null, i = ri(() => e(n, r)).current;
	return Kp({
		popupStore: i,
		treatPopupAsFloatingElement: t,
		floatingRootContext: i.state.floatingRootContext,
		floatingId: n,
		nested: r,
		onOpenChange: i.setOpen
	}), i;
}
function fm({ handle: e, store: t }) {
	return K(() => e.attachStore(t), [e, t]), null;
}
function pm(e) {
	let t = e.context.triggerElements.size;
	e.select("open") && e.state.triggerCount !== t && e.set("triggerCount", t);
}
function mm(e, t) {
	let n = Cm.useRef(null);
	return G((r) => {
		let i = n.current;
		if (i !== null) {
			if (i.element === r && i.store === t && i.id === e) return;
			n.current = null;
			let a = i.store;
			a.context.triggerElements.getById(i.id) === i.element && (a.context.triggerElements.delete(i.id), pm(a));
		}
		r !== null && e !== void 0 && (n.current = {
			store: t,
			id: e,
			element: r
		}, t.context.triggerElements.add(e, r), pm(t));
	});
}
function hm(e, t, n, r = !1) {
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
function gm(e) {
	let t = !1;
	return e.preventUnmountOnClose = () => {
		t = !0;
	}, () => t;
}
function _m(e, t, n, r = {}) {
	let i = n.reason, a = i === Jc, o = t && i === "trigger-focus", s = !t && (i === "trigger-press" || i === "escape-key"), c = gm(n);
	if (e.context.onOpenChange?.(t, n), n.isCanceled) return;
	r.onBeforeDispatch?.(), e.state.floatingRootContext.dispatchOpenChange(t, n);
	let l = () => {
		let i = hm(e.state, t, n.trigger, c()), l = {
			...r.extraState,
			...i
		};
		o ? l.instantType = "focus" : s ? l.instantType = "dismiss" : a && (l.instantType = void 0), e.update(l);
	};
	a ? wm.flushSync(l) : l();
}
function vm(e, t, n, r) {
	let i = n.useState("isMountedByTrigger", e), a = mm(e, n), o = G((t) => {
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
	}), s = G((e) => {
		a(e), e && o(e);
	});
	return K(() => (s(t.current), () => s(null)), [
		s,
		t,
		n,
		e
	]), K(() => {
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
function ym(e, t = {}) {
	let { closeOnActiveTriggerUnmount: n = !1 } = t, r = Cm.useRef(null), i = e.useState("open"), a = e.useState("triggerCount"), o = e.useState("activeTriggerId"), s = e.useState("activeTriggerElement");
	K(() => {
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
				let t = Uc(Kc);
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
function bm(e, t, n, r) {
	let { mounted: i, transitionStatus: a, forceUnmount: o } = sm({
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
	return ri(() => (t.set("mounted", i), null)), t.useSyncedValues({
		mounted: i,
		transitionStatus: a
	}), {
		forceUnmount: o,
		transitionStatus: a
	};
}
function xm(e, t) {
	e.useSyncedValues(t), K(() => () => {
		e.update({
			activeTriggerProps: pa,
			inactiveTriggerProps: pa,
			popupProps: pa
		});
	}, [e]);
}
function Sm(e, t) {
	K(() => {
		!t && e.state.openMethod !== null && e.set("openMethod", null);
	}, [t, e]), K(() => () => {
		e.state.openMethod !== null && e.set("openMethod", null);
	}, [e]);
}
var Cm, wm, Tm, Em = o((() => {
	Cm = /* @__PURE__ */ u(b(), 1), wm = /* @__PURE__ */ u(Os(), 1), ma(), wl(), di(), mi(), oi(), Su(), gp(), qp(), lm(), Gc(), fl(), Tm = {
		tabIndex: -1,
		[gu]: ""
	};
})), Dm, Om = o((() => {
	Dm = class {
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
})), km = o((() => {})), Am = o((() => {})), jm = /* @__PURE__ */ s(((e) => {
	var t = b();
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
})), Mm = /* @__PURE__ */ s(((e, t) => {
	t.exports = jm();
})), Nm = /* @__PURE__ */ s(((e) => {
	var t = b(), n = Mm();
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
})), Pm = /* @__PURE__ */ s(((e, t) => {
	t.exports = Nm();
}));
// node_modules/@base-ui/utils/fastHooks.mjs
function Fm() {
	return Hm;
}
function Im(e) {
	Vm.push(e);
}
function Lm(e) {
	let t = (t, n) => {
		let r = ri(zm).current, i;
		try {
			Hm = r;
			for (let e of Vm) e.before(r);
			i = e(t, n);
			for (let e of Vm) e.after(r);
			r.didInitialize = !0;
		} finally {
			Hm = void 0;
		}
		return i;
	};
	return t.displayName = e.displayName || e.name, t;
}
function Rm(e) {
	return /*#__PURE__*/ Bm.forwardRef(Lm(e));
}
function zm() {
	return { didInitialize: !1 };
}
var Bm, Vm, Hm, Um = o((() => {
	Bm = /* @__PURE__ */ u(b(), 1), oi(), Vm = [], Hm = void 0;
}));
// node_modules/@base-ui/utils/store/useStore.mjs
function Wm(e, t, n, r, i) {
	return Zm(e, t, n, r, i);
}
function Gm(e, t, n, r, i) {
	let a = Jm.useCallback(() => t(e.getSnapshot(), n, r, i), [
		e,
		t,
		n,
		r,
		i
	]);
	return (0, Ym.useSyncExternalStore)(e.subscribe, a, a);
}
function Km(e, t, n, r, i) {
	let a = Fm();
	if (!a) return Gm(e, t, n, r, i);
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
function qm(e, t, n, r, i) {
	return (0, Xm.useSyncExternalStoreWithSelector)(e.subscribe, e.getSnapshot, e.getSnapshot, (e) => t(e, n, r, i));
}
var Jm, Ym, Xm, Zm, Qm = o((() => {
	Jm = /* @__PURE__ */ u(b(), 1), Ym = Mm(), Xm = Pm(), sa(), Um(), Zm = aa(19) ? Km : qm, Im({
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
			}), (0, Ym.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot));
		}
	});
})), $m, eh = o((() => {
	Qm(), $m = class {
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
			return Wm(this, e, t, n, r);
		}
	};
})), th, nh, rh = o((() => {
	th = /* @__PURE__ */ u(b(), 1), eh(), Qm(), di(), mi(), ma(), nh = class extends $m {
		constructor(e, t = {}, n) {
			super(e), this.context = t, this.selectors = n;
		}
		useSyncedValue(e, t) {
			th.useDebugValue(e);
			let n = this;
			K(() => {
				n.state[e] !== t && n.set(e, t);
			}, [
				n,
				e,
				t
			]);
		}
		useSyncedValueWithCleanup(e, t) {
			let n = this;
			K(() => (n.state[e] !== t && n.set(e, t), () => {
				n.set(e, void 0);
			}), [
				n,
				e,
				t
			]);
		}
		useSyncedValues(e) {
			let t = this, n = Object.values(e);
			K(() => {
				t.update(e);
			}, [t, ...n]);
		}
		useControlledProp(e, t) {
			th.useDebugValue(e);
			let n = this, r = t !== void 0;
			K(() => {
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
			return th.useDebugValue(e), Wm(this, this.selectors[e], t, n, r);
		}
		useContextCallback(e, t) {
			th.useDebugValue(e);
			let n = G(t ?? da);
			this.context[e] = n;
		}
		useStateSetter(e) {
			let t = th.useRef(void 0);
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
})), ih = o((() => {
	b(), Os(), Mm(), bs();
})), ah = o((() => {
	km(), Am(), Qm(), eh(), rh(), ih();
})), oh = o((() => {
	Nu(), wf(), uu(), Xd(), xf();
})), sh, ch, lh = o((() => {
	ah(), ip(), oh(), sh = {
		open: (e) => e.open,
		transitionStatus: (e) => e.transitionStatus,
		domReferenceElement: (e) => e.domReferenceElement,
		referenceElement: (e) => e.positionReference ?? e.referenceElement,
		floatingElement: (e) => e.floatingElement,
		floatingId: (e) => e.floatingId
	}, ch = class extends nh {
		constructor(e) {
			let { syncOnly: t, nested: n, onOpenChange: r, triggerElements: i, ...a } = e;
			super({
				...a,
				positionReference: a.referenceElement,
				domReferenceElement: a.referenceElement
			}, {
				onOpenChange: r,
				dataRef: { current: {} },
				events: rp(),
				nested: n,
				triggerElements: i
			}, sh), this.syncOnly = t;
		}
		syncOpenEvent = (e, t) => {
			(!e || !this.state.open || t != null && lu(t)) && (this.context.dataRef.current.openEvent = e ? t : void 0);
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
function uh(e, t, n = !1) {
	return {
		open: !1,
		openProp: void 0,
		mounted: !1,
		transitionStatus: void 0,
		floatingRootContext: new ch({
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
		activeTriggerProps: pa,
		inactiveTriggerProps: pa,
		popupProps: pa
	};
}
function dh(e, t) {
	return t !== void 0 && mh(e) && ph(e) === t;
}
function fh(e, t) {
	return dh(e, t) ? !0 : t !== void 0 && mh(e) && ph(e) == null && !e.openedWithoutTrigger && e.triggerCount === 1;
}
var ph, mh, hh, gh, _h = o((() => {
	ma(), lh(), ph = (e) => e.triggerIdProp ?? e.activeTriggerId, mh = (e) => e.openProp ?? e.open, hh = (e) => (e.popupElement?.id ?? e.floatingId) || void 0, gh = {
		open: mh,
		mounted: (e) => e.mounted,
		transitionStatus: (e) => mh(e) && !e.mounted ? "starting" : e.transitionStatus,
		floatingRootContext: (e) => e.floatingRootContext,
		triggerCount: (e) => e.triggerCount,
		preventUnmountingOnClose: (e) => e.preventUnmountingOnClose,
		payload: (e) => e.payload,
		activeTriggerId: ph,
		activeTriggerElement: (e) => e.mounted ? e.activeTriggerElement : null,
		popupId: hh,
		isTriggerActive: (e, t) => t !== void 0 && ph(e) === t,
		isOpenedByTrigger: (e, t) => dh(e, t),
		isMountedByTrigger: (e, t) => t !== void 0 && ph(e) === t && e.mounted,
		triggerProps: (e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps,
		triggerPopupId: (e, t) => fh(e, t) ? hh(e) : void 0,
		popupProps: (e) => e.popupProps,
		popupElement: (e) => e.popupElement,
		positionerElement: (e) => e.positionerElement
	};
}));
// node_modules/@base-ui/react/utils/popups/usePopupHandleStore.mjs
function vh(e) {
	let t = yh.useCallback((t) => e === void 0 ? da : e.subscribeStore(t), [e]), n = yh.useCallback(() => e === void 0 ? void 0 : e.store, [e]);
	return (0, bh.useSyncExternalStore)(t, n, () => e?.serverStore);
}
var yh, bh, xh = o((() => {
	yh = /* @__PURE__ */ u(b(), 1), bh = Mm(), ma();
})), Sh = o((() => {
	Wp(), Gp(), Em(), Om(), _h(), xh();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function Ch(e) {
	let { open: t = !1, onOpenChange: n, elements: r = {} } = e, i = bl(), a = mp() != null, o = ri(() => new ch({
		open: t,
		transitionStatus: void 0,
		onOpenChange: n,
		referenceElement: r.reference ?? null,
		floatingElement: r.floating ?? null,
		triggerElements: new Dm(),
		floatingId: i,
		syncOnly: !1,
		nested: a
	})).current;
	return K(() => {
		let e = {
			open: t,
			floatingId: i
		};
		r.reference !== void 0 && (e.referenceElement = r.reference, e.domReferenceElement = Nr(r.reference) ? r.reference : null), r.floating !== void 0 && (e.floatingElement = r.floating), o.update(e);
	}, [
		t,
		i,
		r.reference,
		r.floating,
		o
	]), o.context.onOpenChange = n, o.context.nested = a, o;
}
var wh = o((() => {
	$r(), wl(), mi(), oi(), Sh(), gp(), lh();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useFocus.mjs
function Th(e, t = {}) {
	let { enabled: n = !0, delay: r } = t, { events: i, dataRef: a } = e.context, o = Eh.useRef(!1), s = Eh.useRef(null), c = Eh.useRef(!0), l = Nl();
	Eh.useEffect(() => {
		let t = e.select("domReferenceElement");
		if (!n) return;
		let r = Ar(t);
		function i() {
			let t = e.select("domReferenceElement");
			!e.select("open") && Pr(t) && t === du(Ui(t)) && (o.current = !0, s.current = t);
		}
		function a() {
			c.current = !0;
		}
		function l() {
			c.current = !1;
		}
		return Yu(qu(r, "blur", i), Dh && qu(r, "keydown", a, !0), Dh && qu(r, "pointerdown", l, !0));
	}, [e, n]), Eh.useEffect(() => {
		if (!n) return;
		function t(t) {
			if (t.reason === "trigger-press" || t.reason === "escape-key") {
				let t = e.select("domReferenceElement");
				Nr(t) && (s.current = t, o.current = !0);
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
	let u = Eh.useMemo(() => {
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
				let a = mu(n.nativeEvent);
				if (Nr(a)) {
					if (Dh && !n.relatedTarget) {
						if (!c.current && !Ou(a)) return;
					} else if (!ju(a)) return;
				}
				let u = Tu(n.relatedTarget, e.context.triggerElements), { nativeEvent: d, currentTarget: f } = n;
				e.select("open") && u || !r ? e.setOpen(!0, Uc(Yc, d, f)) : l.start(r, () => {
					o.current || e.setOpen(!0, Uc(Yc, d, f));
				});
			},
			onBlur(n) {
				t();
				let r = n.relatedTarget, i = n.nativeEvent, o = Nr(r) && r.hasAttribute(Tf("focus-guard")) && r.getAttribute("data-type") === "outside";
				l.start(0, () => {
					let t = e.select("domReferenceElement"), n = du(Ui(t));
					!r && n === t || fu(a.current.floatingContext?.refs.floating.current, n) || fu(t, n) || o || Tu(r ?? n, e.context.triggerElements) || e.setOpen(!1, Uc(Yc, i));
				});
			}
		};
	}, [
		a,
		r,
		e,
		l
	]);
	return Eh.useMemo(() => n ? {
		reference: u,
		trigger: u
	} : {}, [n, u]);
}
var Eh, Dh, Oh = o((() => {
	Eh = /* @__PURE__ */ u(b(), 1), Ju(), ru(), Xu(), Wi(), Il(), $r(), Ef(), Nu(), Gc(), fl(), Dh = ql && Xl;
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverInteractionSharedState.mjs
function kh(e) {
	if (!e.performedPointerEventsMutation) return;
	let t = e.pointerEventsScopeElement;
	t && Nh.get(t) === e && (e.pointerEventsScopeElement?.style.removeProperty("pointer-events"), e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"), e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"), Nh.delete(t)), e.performedPointerEventsMutation = !1, e.pointerEventsScopeElement = null, e.pointerEventsReferenceElement = null, e.pointerEventsFloatingElement = null;
}
function Ah(e, t) {
	let { scopeElement: n, referenceElement: r, floatingElement: i } = t, a = Nh.get(n);
	a && a !== e && kh(a), kh(e), e.performedPointerEventsMutation = !0, e.pointerEventsScopeElement = n, e.pointerEventsReferenceElement = r, e.pointerEventsFloatingElement = i, Nh.set(n, e), n.style.pointerEvents = "none", r.style.pointerEvents = "auto", i.style.pointerEvents = "auto";
}
function jh(e) {
	let t = e.context.dataRef.current, n = ri(() => t.hoverInteractionState ?? Mh.create()).current;
	return t.hoverInteractionState ||= n, Al(t.hoverInteractionState.disposeEffect), t.hoverInteractionState;
}
var Mh, Nh, Ph = o((() => {
	Ml(), oi(), Il(), oh(), Mh = class e {
		pointerType = void 0;
		interactedInside = !1;
		handler = void 0;
		blockMouseMove = !0;
		performedPointerEventsMutation = !1;
		pointerEventsScopeElement = null;
		pointerEventsReferenceElement = null;
		pointerEventsFloatingElement = null;
		restTimeoutPending = !1;
		openChangeTimeout = new Fl();
		restTimeout = new Fl();
		handleCloseOptions = void 0;
		static create() {
			return new e();
		}
		dispose = () => {
			this.openChangeTimeout.clear(), this.restTimeout.clear();
		};
		disposeEffect = () => this.dispose;
	}, Nh = /* @__PURE__ */ new WeakMap();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs
function Fh(e, t = {}) {
	let { enabled: n = !0, closeDelay: r = 0, nodeId: i } = t, a = e.useState("open"), o = e.useState("floatingElement"), s = e.useState("domReferenceElement"), { dataRef: c } = e.context, l = hp(), u = mp(), d = jh(e), f = Nl(), p = G(() => Lu(c.current.openEvent?.type, d.interactedInside)), m = G(() => Ru(c.current.openEvent?.type)), h = G(() => {
		kh(d);
	});
	K(() => {
		a || (d.pointerType = void 0, d.restTimeoutPending = !1, d.interactedInside = !1, h());
	}, [
		a,
		d,
		h
	]), Ih.useEffect(() => h, [h]), K(() => {
		if (n && a && d.handleCloseOptions?.blockPointerEvents && m() && Nr(s) && o) {
			let e = s, t = o, n = Ui(o), r = l?.nodesRef.current.find((e) => e.id === u)?.context?.elements.floating;
			r && (r.style.pointerEvents = "");
			let i = d.pointerEventsScopeElement === t ? null : d.pointerEventsScopeElement, a = r === t ? null : r, c = d.handleCloseOptions?.getScope?.() ?? i ?? a ?? pu(e, "[data-rootownerid]") ?? n.body;
			return Ah(d, {
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
	]), Ih.useEffect(() => {
		if (!n) return;
		function t() {
			return !!(l && u && Sf(l.nodesRef.current, u).length > 0);
		}
		function a(t) {
			let n = Fu(r, "close", d.pointerType), i = () => {
				e.setOpen(!1, Uc(Jc, t)), l?.events.emit("floating.closed", t);
			};
			n ? d.openChangeTimeout.start(n, i) : (d.openChangeTimeout.clear(), i());
		}
		function s(e) {
			let t = mu(e);
			ku(t) ? d.interactedInside = pu(t, "[aria-haspopup]") != null : d.interactedInside = !1;
		}
		function g() {
			d.openChangeTimeout.clear(), f.clear(), l?.events.off("floating.closed", v), h();
		}
		function _(n) {
			if (t() && l) {
				l.events.on("floating.closed", v);
				return;
			}
			if (Tu(n.relatedTarget, e.context.triggerElements)) return;
			let r = c.current.floatingContext?.nodeId ?? i, o = n.relatedTarget;
			l && r && Nr(o) && Sf(l.nodesRef.current, r, !1).some((e) => fu(e.context?.elements.floating, o)) || (d.handler ? d.handler(n) : (h(), m() && !p() && a(n)));
		}
		function v(n) {
			l && u && !t() && f.start(0, () => {
				l.events.off("floating.closed", v), e.setOpen(!1, Uc(Jc, n)), l.events.emit("floating.closed", n);
			});
		}
		let y = o;
		return Yu(y && qu(y, "mouseenter", g), y && qu(y, "mouseleave", _), y && qu(y, "pointerdown", s, !0), () => {
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
var Ih, Lh = o((() => {
	Ih = /* @__PURE__ */ u(b(), 1), Ju(), Xu(), mi(), Wi(), di(), Il(), $r(), Gc(), fl(), gp(), Nu(), wf(), Ph(), zu();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverReferenceInteraction.mjs
function Rh(e, t = {}) {
	let { enabled: n = !0, delay: r = 0, handleClose: i = null, mouseOnly: a = !1, restMs: o = 0, move: s = !0, triggerElementRef: c = Vh, externalTree: l, isActiveTrigger: u = !0, getHandleCloseContext: d, isClosing: f, shouldOpen: p, guardStaleOpen: m = !1 } = t, { dataRef: h, events: g } = e.context, _ = hp(l), v = jh(e), y = zh.useRef(!1), b = Zu(i), x = Zu(r), S = Zu(o), C = Zu(n), w = Zu(p), T = Zu(f), E = G(() => Lu(h.current.openEvent?.type, v.interactedInside)), D = G(() => w.current?.() !== !1), O = G((t, n, r) => {
		let i = e.context.triggerElements;
		if (i.hasElement(n)) return !t || !fu(t, n);
		if (!Nr(r)) return !1;
		let a = r;
		return i.hasMatchingElement((e) => fu(e, a)) && (!t || !fu(t, a));
	}), k = G(() => {
		v.handler &&= (Ui(e.select("domReferenceElement")).removeEventListener("mousemove", v.handler), void 0);
	}), A = G(() => {
		kh(v);
	});
	return u && (v.handleCloseOptions = i?.__options), zh.useEffect(() => k, [k]), zh.useEffect(() => {
		if (!n) return;
		function e(e) {
			e.open ? y.current = !1 : (y.current = e.reason === Jc, k(), v.openChangeTimeout.clear(), v.restTimeout.clear(), v.blockMouseMove = !0, v.restTimeoutPending = !1);
		}
		return g.on("openchange", e), () => {
			g.off("openchange", e);
		};
	}, [
		n,
		g,
		v,
		k
	]), zh.useEffect(() => {
		if (!n) return;
		function t(t, n = !0) {
			let r = Fu(x.current, "close", v.pointerType);
			r ? v.openChangeTimeout.start(r, () => {
				e.setOpen(!1, Uc(Jc, t)), _?.events.emit("floating.closed", t);
			}) : n && (v.openChangeTimeout.clear(), e.setOpen(!1, Uc(Jc, t)), _?.events.emit("floating.closed", t));
		}
		let r = c.current ?? (u ? e.select("domReferenceElement") : null);
		if (!Nr(r)) return;
		function i(t) {
			if (v.openChangeTimeout.clear(), v.blockMouseMove = !1, a && !cu(v.pointerType)) return;
			let n = Iu(S.current), r = Fu(x.current, "open", v.pointerType), i = mu(t), o = t.currentTarget ?? null, s = e.select("domReferenceElement"), c = o;
			if (Nr(i) && !e.context.triggerElements.hasElement(i)) {
				for (let t of e.context.triggerElements.elements()) if (fu(t, i)) {
					c = t;
					break;
				}
			}
			Nr(o) && Nr(s) && !e.context.triggerElements.hasElement(o) && fu(o, s) && (c = s);
			let l = c != null && O(s, c, i), u = e.select("open"), d = T.current?.() ?? e.select("transitionStatus") === "ending", f = !u && d && y.current, p = !l && Nr(c) && Nr(s) && fu(s, c) && f, m = n > 0 && !r, h = l && (u || f) || p, g = !u || l;
			h ? D() && e.setOpen(!0, Uc(Jc, t, c)) : m || (r ? v.openChangeTimeout.start(r, () => {
				g && D() && e.setOpen(!0, Uc(Jc, t, c));
			}) : g && D() && e.setOpen(!0, Uc(Jc, t, c)));
		}
		function o(n) {
			if (E()) {
				A();
				return;
			}
			k();
			let r = Ui(e.select("domReferenceElement"));
			v.restTimeout.clear(), v.restTimeoutPending = !1;
			let i = h.current.floatingContext ?? d?.();
			if (!Tu(n.relatedTarget, e.context.triggerElements)) {
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
				} else v.pointerType === "touch" && fu(e.select("floatingElement"), n.relatedTarget) || t(n);
			}
		}
		function l(e) {
			fu(r, e.relatedTarget) || (v.openChangeTimeout.clear(), v.restTimeout.clear(), v.restTimeoutPending = !1);
		}
		let f = m ? qu(r, "mouseout", l) : void 0;
		return s ? Yu(qu(r, "mousemove", i, { once: !0 }), qu(r, "mouseenter", i), qu(r, "mouseleave", o), f) : Yu(qu(r, "mouseenter", i), qu(r, "mouseleave", o), f);
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
	]), zh.useMemo(() => {
		if (!n) return;
		function t(e) {
			v.pointerType = e.pointerType;
		}
		return {
			onPointerDown: t,
			onPointerEnter: t,
			onMouseMove(t) {
				let { nativeEvent: n } = t, r = t.currentTarget, i = e.select("domReferenceElement"), o = e.select("open"), s = O(i, r, t.target);
				if (a && !cu(v.pointerType)) return;
				if (o && s && v.handleCloseOptions?.blockPointerEvents) {
					let t = e.select("floatingElement");
					if (t) {
						let e = v.handleCloseOptions?.getScope?.() ?? r.ownerDocument.body;
						Ah(v, {
							scopeElement: e,
							referenceElement: r,
							floatingElement: t
						});
					}
				}
				let c = Iu(S.current);
				if (o && !s || c === 0 || !s && v.restTimeoutPending && t.movementX ** 2 + t.movementY ** 2 < 2) return;
				v.restTimeout.clear();
				function l() {
					if (v.restTimeoutPending = !1, E()) return;
					let t = e.select("open");
					!v.blockMouseMove && (!t || s) && D() && e.setOpen(!0, Uc(Jc, n, r));
				}
				v.pointerType === "touch" ? Bh.flushSync(() => {
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
var zh, Bh, Vh, Hh = o((() => {
	zh = /* @__PURE__ */ u(b(), 1), Bh = /* @__PURE__ */ u(Os(), 1), Ju(), Xu(), Wi(), di(), $u(), $r(), Gc(), fl(), gp(), Nu(), uu(), Ph(), zu(), Vh = { current: null };
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useListNavigation.mjs
function Uh(e) {
	return Xl && e.movementX === 0 && e.movementY === 0;
}
function Wh(e, t, n) {
	switch (e) {
		case "vertical": return t;
		case "horizontal": return n;
		default: return t || n;
	}
}
function Gh(e, t) {
	return Wh(t, e === "ArrowUp" || e === "ArrowDown", e === "ArrowLeft" || e === "ArrowRight");
}
function Kh(e, t, n) {
	return Wh(t, e === "ArrowDown", n ? e === "ArrowLeft" : e === "ArrowRight") || e === "Enter" || e === " " || e === "";
}
function qh(e, t, n) {
	return Wh(t, n ? e === vu : e === yu, e === xu);
}
function Jh(e, t, n, r) {
	return t === "both" || t === "horizontal" && r ? e === "Escape" : Wh(t, n ? e === yu : e === vu, e === bu);
}
function Yh(e, t) {
	let { listRef: n, activeIndex: r, onNavigate: i = () => {}, enabled: a = !0, selectedIndex: o = null, allowEscape: s = !1, loopFocus: c = !1, nested: l = !1, rtl: u = !1, virtual: d = !1, focusItemOnOpen: f = "auto", focusItemOnHover: p = !0, openOnArrowKeyDown: m = !0, disabledIndices: h = void 0, orientation: g = "vertical", triggerOrientation: _ = g, parentOrientation: v, id: y, resetOnPointerLeave: b = !0, externalTree: x, nestedReturnFocusRef: S, grid: C } = t, w = C != null, T = e.useState("open"), E = e.useState("floatingElement"), D = e.useState("domReferenceElement"), O = e.context.dataRef, k = Mu(E), A = Au(D), j = Zu(k), M = mp(), N = hp(x), P = Xh.useRef(f), F = Xh.useRef(o ?? -1), I = Xh.useRef(null), L = Xh.useRef(!0), R = G((e) => {
		i(F.current === -1 ? null : F.current, e);
	}), ee = Xh.useRef(!!E), z = Xh.useRef(T), B = Xh.useRef(!1), V = Xh.useRef(!1), te = Xh.useRef(null), ne = Zu(h), H = Zu(T), re = Zu(o), U = Zu(b), ie = ed(), W = ed(), ae = G(() => {
		ie.cancel();
		function e(e) {
			d || (te.current = Df(e, {
				sync: B.current,
				preventScroll: !0
			}));
		}
		let t = n.current[F.current], r = V.current;
		t && e(t), (B.current ? (e) => e() : (e) => ie.request(e))(() => {
			let i = n.current[F.current] || t;
			i && (t || e(i), de && (r || !L.current) && i.scrollIntoView?.({
				block: "nearest",
				inline: "nearest"
			}));
		});
	});
	K(() => {
		O.current.orientation = g;
	}, [O, g]), K(() => {
		T || (I.current = null), T && f === "auto" || (P.current = f);
	}, [T, f]), K(() => {
		a && (T && E ? (F.current = o ?? -1, P.current && o != null && (V.current = !0, R())) : ee.current && (F.current = -1, R()));
	}, [
		a,
		T,
		E,
		o,
		R
	]), K(() => {
		if (a) {
			if (!T) B.current = !1;
			else if (E) {
				if (r == null) {
					if (B.current = !1, re.current != null) return;
					if (ee.current && (F.current = -1, ae()), (!z.current || !ee.current) && P.current && (I.current != null || P.current === !0 && I.current == null)) {
						let e = 0, t = () => {
							n.current[0] == null ? (e < 2 && (e ? (e) => W.request(e) : queueMicrotask)(t), e += 1) : (F.current = I.current == null || Kh(I.current, _, u) || l ? Ud(n) : Wd(n), I.current = null, R());
						};
						t();
					}
				} else Hd(n.current, r) || (F.current = r, ae(), V.current = !1);
			}
		}
	}, [
		a,
		T,
		E,
		r,
		re,
		l,
		n,
		_,
		u,
		R,
		ae,
		W
	]), K(() => {
		if (!a || E || !N || d || !ee.current) return;
		let e = N.nodesRef.current, t = e.find((e) => e.id === M)?.context?.elements.floating, n = du(Ui(D ?? t ?? null)), r = e.some((e) => e.context && fu(e.context.elements.floating, n));
		t && !r && L.current && t.focus({ preventScroll: !0 });
	}, [
		a,
		E,
		D,
		N,
		M,
		d
	]), K(() => {
		z.current = T, ee.current = !!E;
	});
	let oe = r != null, se = G((e) => {
		if (!H.current) return;
		let t = n.current.indexOf(e.currentTarget);
		t !== -1 && (F.current !== t || r !== t) && (F.current = t, R(e));
	}), ce = G(() => v ?? N?.nodesRef.current.find((e) => e.id === M)?.context?.dataRef?.current.orientation), le = G(() => Ud(n, ne.current)), ue = G((t) => {
		if (L.current = !1, B.current = !0, t.which === 229 || !H.current && t.currentTarget === j.current) return;
		if (l && Jh(t.key, g, u, w)) {
			Gh(t.key, ce()) || iu(t), e.setOpen(!1, Uc(tl, t.nativeEvent));
			let n = S?.current ?? D;
			Pr(n) && n.focus();
			return;
		}
		r != null && r !== F.current && !Hd(n.current, r) && (F.current = r);
		let i = F.current, a = Ud(n, h), o = Wd(n, h);
		if (A || (t.key === "Home" && (iu(t), F.current = a, R(t)), t.key === "End" && (iu(t), F.current = o, R(t))), C != null) {
			let e = C(t, F.current, n, g, c, u, h, a, o);
			if (e != null && e !== F.current && (F.current = e, R(t)), g === "both") return;
		}
		if (Gh(t.key, g)) {
			iu(t);
			let e = du(t.currentTarget.ownerDocument);
			if (T && !d && fu(t.currentTarget, e) && !n.current.some((t) => t != null && fu(t, e))) {
				F.current = Kh(t.key, g, u) ? a : o, R(t), r === F.current && ae();
				return;
			}
			let { index: l, wrapped: f } = Gd(n.current, i, {
				decrement: !Kh(t.key, g, u),
				loopFocus: c,
				allowEscape: s,
				disabledIndices: h,
				minIndex: a,
				maxIndex: o
			});
			f && (B.current = !1), F.current = l, R(t);
		}
	}), de = Xh.useMemo(() => ({
		onFocus(e) {
			B.current = !0, se(e);
		},
		onClick({ currentTarget: e }) {
			d || e.focus({ preventScroll: !0 });
		},
		onMouseMove(e) {
			Uh(e) || (B.current = !0, V.current = !1, p && se(e));
		},
		onPointerLeave(e) {
			if (!H.current || !L.current || e.pointerType === "touch") return;
			B.current = !0;
			let t = e.relatedTarget;
			if (p && !n.current.includes(t) && U.current && (te.current?.(), te.current = null, F.current = -1, R(e), !d)) {
				let e = j.current, t = du(Ui(e));
				e && fu(e, t) && e.focus({ preventScroll: !0 });
			}
		}
	}), [
		se,
		H,
		j,
		p,
		n,
		R,
		U,
		d
	]), fe = Xh.useMemo(() => d && T && oe && { "aria-activedescendant": `${y}-${r}` }, [
		d,
		T,
		oe,
		y,
		r
	]), pe = Xh.useMemo(() => ({
		...A ? {} : fe,
		onKeyDown(t) {
			if (t.key === "Tab" && t.shiftKey && T && !d) {
				let n = mu(t.nativeEvent);
				if (n && !fu(j.current, n)) return;
				iu(t);
				let r = Uc($c, t.nativeEvent);
				e.setOpen(!1, r);
				let i = S?.current ?? D;
				!r.isCanceled && Pr(i) && i.focus();
			} else ue(t);
		},
		onPointerMove(e) {
			Uh(e) || (L.current = !0);
		}
	}), [
		fe,
		ue,
		j,
		A,
		e,
		T,
		d,
		D,
		S
	]), me = Xh.useMemo(() => {
		function t(t) {
			e.setOpen(!0, Uc(tl, t.nativeEvent, t.currentTarget));
		}
		function n(e) {
			f === "auto" && ou(e.nativeEvent) && (P.current = !d);
		}
		function r(e) {
			P.current = f, f === "auto" && su(e.nativeEvent) && (P.current = !0);
		}
		return {
			onKeyDown(n) {
				let r = e.select("open");
				L.current = !1;
				let i = n.key.startsWith("Arrow"), a = qh(n.key, ce(), u), o = Gh(n.key, r ? g : _), s = (l ? a : o) || n.key === "Enter" || n.key.trim() === "";
				if (d && r && (!l || Ou(n.currentTarget))) return ue(n);
				if (r || m || !i) {
					if (s) {
						let e = Gh(n.key, ce());
						I.current = l && e ? null : n.key;
					}
					l ? a && (iu(n), r ? (F.current = le(), R(n), d && j.current?.focus()) : t(n)) : o && (re.current != null && (F.current = re.current), iu(n), !r && m ? t(n) : ue(n), r && R(n));
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
		ue,
		f,
		le,
		l,
		R,
		e,
		m,
		g,
		_,
		ce,
		u,
		re,
		d,
		j
	]), he = Xh.useMemo(() => ({
		...fe,
		...me
	}), [fe, me]);
	return Xh.useMemo(() => a ? {
		reference: he,
		floating: pe,
		item: de,
		trigger: me
	} : {}, [
		a,
		he,
		pe,
		me,
		de
	]);
}
var Xh, Zh = o((() => {
	Xh = /* @__PURE__ */ u(b(), 1), ad(), mi(), Wi(), di(), $u(), ru(), $r(), Gc(), fl(), gp(), Xd(), Su(), Nu(), kf(), uu();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useTypeahead.mjs
function Qh(e, t) {
	let { listRef: n, elementsRef: r, activeIndex: i, onMatch: a, disabledIndices: o, onTyping: s, enabled: c = !0, resetMs: l = 750, selectedIndex: u = null } = t, d = G(s), f = e.useState("open"), p = Nl(), m = $h.useRef(""), h = $h.useRef(u ?? i ?? -1), g = $h.useRef(null), _ = G((e) => {
		function t(e) {
			return r?.current[e];
		}
		function s(e) {
			let n = t(e);
			return n && !Yd(n) || n?.matches(":disabled") ? !1 : o == null || !qd(fa, e, o);
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
		if (m.current.length > 0 && e.key === " " && (iu(e), d?.(!0)), m.current.length > 0 && m.current[0] !== " " && c(_, m.current) === -1 && e.key !== " " && d?.(!1), _ == null || e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		f && e.key !== " " && (iu(e), d?.(!0));
		let v = m.current === "";
		v && (h.current = u ?? i ?? -1), _.every((e, t) => e && s(t) ? e[0]?.toLowerCase() !== e[1]?.toLowerCase() : !0) && m.current === e.key && (m.current = "", h.current = g.current), m.current += e.key, p.start(l, () => {
			m.current = "", h.current = g.current, d?.(!1);
		});
		let y = ((v ? u ?? i ?? -1 : h.current) ?? 0) + 1, b = c(_, m.current, y);
		b === -1 ? e.key !== " " && (m.current = "", d?.(!1)) : (a?.(b, e), g.current = b);
	}), v = G((t) => {
		let n = t.relatedTarget, r = e.select("domReferenceElement"), i = e.select("floatingElement");
		fu(r, n) || fu(i, n) || (p.clear(), m.current = "", h.current = g.current, d?.(!1));
	});
	K(() => {
		(f || u === null) && (p.clear(), g.current = null, m.current !== "" && (m.current = "", d?.(!1)));
	}, [
		f,
		u,
		p,
		d
	]);
	let y = $h.useMemo(() => ({
		onKeyDown: _,
		onBlur: v
	}), [_, v]);
	return $h.useMemo(() => c ? {
		reference: y,
		floating: y
	} : {}, [c, y]);
}
var $h, eg = o((() => {
	$h = /* @__PURE__ */ u(b(), 1), mi(), di(), Il(), ma(), Xd(), Nu(), uu();
}));
// node_modules/@base-ui/react/floating-ui-react/safePolygon.mjs
function tg(e, t, n, r, i, a) {
	return r >= t != a >= t && e <= (i - n) * (t - r) / (a - r) + n;
}
function ng(e, t, n, r, i, a, o, s, c, l) {
	let u = !1;
	return tg(e, t, n, r, i, a) && (u = !u), tg(e, t, i, a, o, s) && (u = !u), tg(e, t, o, s, c, l) && (u = !u), tg(e, t, c, l, n, r) && (u = !u), u;
}
function rg(e, t, n) {
	return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
}
function ig(e, t, n, r, i, a) {
	return e >= Math.min(n, i) && e <= Math.max(n, i) && t >= Math.min(r, a) && t <= Math.max(r, a);
}
function ag(e = {}) {
	let { blockPointerEvents: t = !1 } = e, n = new Fl(), r = ({ x: e, y: t, placement: r, elements: i, onClose: a, nodeId: o, tree: s }) => {
		let c = r?.split("-")[0], l = !1, u = null, d = null, f = typeof performance < "u" ? performance.now() : 0;
		function p(e, t) {
			let n = performance.now(), r = n - f;
			if (u === null || d === null || r === 0) return u = e, d = t, f = n, !1;
			let i = e - u, a = t - d, o = i * i + a * a, s = r * r * sg;
			return u = e, d = t, f = n, o < s;
		}
		function m() {
			n.clear(), a();
		}
		return function(r) {
			n.clear();
			let a = i.domReference, u = i.floating;
			if (!a || !u || c == null || e == null || t == null) return;
			let { clientX: d, clientY: f } = r, h = mu(r), g = r.type === "mouseleave", _ = fu(u, h), v = fu(a, h);
			if (_ && (l = !0, !g)) return;
			if (v && (l = !1, !g)) {
				l = !0;
				return;
			}
			if (g && Nr(r.relatedTarget) && fu(u, r.relatedTarget)) return;
			function y() {
				return !!(s && Sf(s.nodesRef.current, o).length > 0);
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
					j = ig(d, f, D, x.top + 1, O, S.bottom - 1);
					break;
				case "bottom":
					j = ig(d, f, D, S.top + 1, O, x.bottom - 1);
					break;
				case "left":
					j = ig(d, f, S.right - 1, A, x.left + 1, k);
					break;
				case "right": j = ig(d, f, x.right - 1, A, S.left + 1, k);
			}
			if (j) return;
			if (l && !rg(d, f, x) || !g && p(d, f)) {
				b();
				return;
			}
			let M = !1;
			switch (c) {
				case "top": {
					let n = T ? cg / 2 : cg * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t + cg + 1, o = C || T ? S.bottom - cg : S.top, s = C ? T ? S.bottom - cg : S.top : S.bottom - cg;
					M = ng(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "bottom": {
					let n = T ? cg / 2 : cg * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t - cg, o = C || T ? S.top + cg : S.bottom, s = C ? T ? S.top + cg : S.bottom : S.top + cg;
					M = ng(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "left": {
					let n = E ? cg / 2 : cg * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e + cg + 1, o = w || E ? S.right - cg : S.left, s = w ? E ? S.right - cg : S.left : S.right - cg;
					M = ng(d, f, o, S.top, s, S.bottom, a, r, a, i);
					break;
				}
				case "right": {
					let n = E ? cg / 2 : cg * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e - cg, o = w || E ? S.left + cg : S.right, s = w ? E ? S.left + cg : S.right : S.left + cg;
					M = ng(d, f, a, r, a, i, o, S.top, s, S.bottom);
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
var og, sg, cg, lg = o((() => {
	$r(), Il(), Nu(), wf(), og = .1, sg = og * og, cg = .5;
}));
// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function ug(e, t, n) {
	let { reference: r, floating: i } = e, a = bd(t), o = xd(t), s = yd(o), c = gd(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = _d(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function dg(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = hd(t, e), p = kd(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Ad(await i.getClippingRect({
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
	}, y = Ad(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
async function fg(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = gd(n), s = _d(n), c = bd(n) === "y", l = gg.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = hd(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var pg, mg, hg, gg, _g, vg, yg, bg, xg = o((() => {
	Vd(), pg = 50, mg = async (e, t, n) => {
		let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
			...o,
			detectOverflow: dg
		}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}), { x: u, y: d } = ug(l, r, c), f = r, p = 0, m = {};
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
			}, x && p < pg && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
				reference: e,
				floating: t,
				strategy: i
			}) : x.rects), {x: u, y: d} = ug(l, f, c)), n = -1);
		}
		return {
			x: u,
			y: d,
			placement: f,
			strategy: i,
			middlewareData: m
		};
	}, hg = function(e) {
		return e === void 0 && (e = {}), {
			name: "flip",
			options: e,
			async fn(t) {
				var n;
				let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = hd(e, t);
				if ((n = i.arrow) != null && n.alignmentOffset) return {};
				let g = gd(r), _ = bd(o), v = gd(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Dd(o)] : Cd(o)), x = p !== "none";
				!d && x && b.push(...Ed(o, m, p, y));
				let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
				if (l && w.push(C[g]), u) {
					let e = Sd(r, a, y);
					w.push(C[e[0]], C[e[1]]);
				}
				if (T = [...T, {
					placement: r,
					overflows: w
				}], !w.every((e) => e <= 0)) {
					let e = (i.flip?.index || 0) + 1, t = S[e];
					if (t && (u !== "alignment" || _ === bd(t) || T.every((e) => bd(e.placement) !== _ || e.overflows[0] > 0))) return {
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
									let t = bd(e.placement);
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
	}, gg = /*#__PURE__*/ new Set(["left", "top"]), _g = function(e) {
		return e === void 0 && (e = 0), {
			name: "offset",
			options: e,
			async fn(t) {
				var n;
				let { x: r, y: i, placement: a, middlewareData: o } = t, s = await fg(t, e);
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
	}, vg = function(e) {
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
				} }, ...l } = hd(e, t), u = {
					x: n,
					y: r
				}, d = await a.detectOverflow(t, l), f = bd(i), p = vd(f), m = u[p], h = u[f], g = (e, t) => md(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
	}, yg = function(e) {
		return e === void 0 && (e = {}), {
			options: e,
			fn(t) {
				let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = hd(e, t), u = {
					x: n,
					y: r
				}, d = bd(i), f = vd(d), p = u[f], m = u[d], h = hd(s, t), g = typeof h == "number" ? {
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
					let e = f === "y" ? "width" : "height", t = gg.has(gd(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
					m < n ? m = n : m > r && (m = r);
				}
				return {
					[f]: p,
					[d]: m
				};
			}
		};
	}, bg = function(e) {
		return e === void 0 && (e = {}), {
			name: "size",
			options: e,
			async fn(t) {
				let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = hd(e, t), c = await i.detectOverflow(t, s), l = gd(n), u = _d(n), d = bd(n) === "y", { width: f, height: p } = r.floating, m, h;
				l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
				let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = jd(p - c[m], g), y = jd(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
				b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * Md(c.left, c.right) : S = p - 2 * Md(c.top, c.bottom)), await o({
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
function Sg(e) {
	let t = Ur(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Pr(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Nd(n) !== a || Nd(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Cg(e) {
	return Nr(e) ? e : e.contextElement;
}
function wg(e) {
	let t = Cg(e);
	if (!Pr(t)) return Fd(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Sg(t), o = (a ? Nd(n.width) : n.width) / r, s = (a ? Nd(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
function Tg(e) {
	let t = Ar(e);
	return !Vr() || !t.visualViewport ? qg : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Eg(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Ar(e);
}
function Dg(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Cg(e), o = Fd(1);
	t && (r ? Nr(r) && (o = wg(r)) : o = wg(e));
	let s = Eg(a, n, r) ? Tg(a) : Fd(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Ar(a), t = Nr(r) ? Ar(r) : r, n = e, i = Jr(n);
		for (; i && t !== n;) {
			let e = wg(i), t = i.getBoundingClientRect(), r = Ur(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Ar(i), i = Jr(n);
		}
	}
	return Ad({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Og(e, t) {
	let n = Wr(e).scrollLeft;
	return t ? t.left + n : Dg(jr(e)).left + n;
}
function kg(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Og(e, n),
		y: n.top + t.scrollTop
	};
}
function Ag(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = jr(r), s = t ? Rr(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Fd(1), u = Fd(0), d = Pr(r);
	if ((d || !a) && ((kr(r) !== "body" || Ir(o)) && (c = Wr(r)), d)) {
		let e = Dg(r);
		l = wg(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? kg(o, c) : Fd(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function jg(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Mg(e) {
	let t = Wr(e), n = e.ownerDocument.body, r = Md(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = Md(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Og(e), o = -t.scrollTop;
	return Ur(n).direction === "rtl" && (a += Md(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
function Ng(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Ar(e), a = jr(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Vr() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Og(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Jg && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Pg(e, t) {
	let n = Dg(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = wg(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Fg(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Ng(e, n, t);
	else if (t === "document") r = Mg(jr(e));
	else if (Nr(t)) r = Pg(t, n);
	else {
		let n = Tg(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Ad(r);
}
function Ig(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = qr(e, [], !1).filter((e) => Nr(e) && kr(e) !== "body"), i = null, a = Ur(e).position === "fixed", o = a ? Gr(e) : e;
	for (; Nr(o) && !Hr(o);) {
		let e = Ur(o), t = zr(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Gr(o);
	}
	return t.set(e, r), r;
}
function Lg(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Rr(t) ? [] : Ig(t, this._c) : [].concat(n), r], o = Fg(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Fg(t, a[e], i);
		s = Md(n.top, s), c = jd(n.right, c), l = jd(n.bottom, l), u = Md(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Rg(e) {
	let { width: t, height: n } = Sg(e);
	return {
		width: t,
		height: n
	};
}
function zg(e, t, n) {
	let r = Pr(t), i = jr(t), a = n === "fixed", o = Dg(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Fd(0);
	if ((r || !a) && ((kr(t) !== "body" || Ir(i)) && (s = Wr(t)), r)) {
		let e = Dg(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Og(i));
	let l = i && !r && !a ? kg(i, s) : Fd(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Bg(e) {
	return Ur(e).position === "static";
}
function Vg(e, t) {
	if (!Pr(e) || Ur(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return jr(e) === n && (n = n.ownerDocument.body), n;
}
function Hg(e, t) {
	let n = Ar(e);
	if (Rr(e)) return n;
	if (!Pr(e)) {
		let t = Gr(e);
		for (; t && !Hr(t);) {
			if (Nr(t) && !Bg(t)) return t;
			t = Gr(t);
		}
		return n;
	}
	let r = Vg(e, t);
	for (; r && Lr(r) && Bg(r);) r = Vg(r, t);
	return r && Hr(r) && Bg(r) && !zr(r) ? n : r || Br(e) || n;
}
function Ug(e) {
	return Ur(e).direction === "rtl";
}
function Wg(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Gg(e, t, n) {
	let r = null, i, a = jr(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Pd(d), h = Pd(a.clientWidth - (u + f)), g = Pd(a.clientHeight - (d + p)), _ = Pd(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Md(0, jd(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Wg(l, e.getBoundingClientRect())) return s();
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
	let c = Ar(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Kg(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Cg(e), u = i || a ? [...l ? qr(l) : [], ...t ? qr(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Gg(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Dg(e) : null;
	c && g();
	function g() {
		let t = Dg(e);
		h && !Wg(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var qg, Jg, Yg, Xg, Zg, Qg, $g, e_, t_, n_, r_ = o((() => {
	xg(), Vd(), $r(), qg = /*#__PURE__*/ Fd(0), Jg = 25, Yg = async function(e) {
		let t = this.getOffsetParent || Hg, n = this.getDimensions, r = await n(e.floating);
		return {
			reference: zg(e.reference, await t(e.floating), e.strategy),
			floating: {
				x: 0,
				y: 0,
				width: r.width,
				height: r.height
			}
		};
	}, Xg = {
		convertOffsetParentRelativeRectToViewportRelativeRect: Ag,
		getDocumentElement: jr,
		getClippingRect: Lg,
		getOffsetParent: Hg,
		getElementRects: Yg,
		getClientRects: jg,
		getDimensions: Rg,
		getScale: wg,
		isElement: Nr,
		isRTL: Ug
	}, Zg = _g, Qg = vg, $g = hg, e_ = bg, t_ = yg, n_ = (e, t, n) => {
		let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
			...Xg,
			...i.platform,
			_c: r
		};
		return mg(e, t, {
			...i,
			platform: a
		});
	};
}));
// node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
function i_(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!i_(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !i_(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function a_(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function o_(e, t) {
	let n = a_(e);
	return Math.round(t * n) / n;
}
function s_(e) {
	let t = l_.useRef(e);
	return f_(() => {
		t.current = e;
	}), t;
}
function c_(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = l_.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = l_.useState(r);
	i_(f, r) || p(r);
	let [m, h] = l_.useState(null), [g, _] = l_.useState(null), v = l_.useCallback((e) => {
		e !== S.current && (S.current = e, h(e));
	}, []), y = l_.useCallback((e) => {
		e !== C.current && (C.current = e, _(e));
	}, []), b = a || m, x = o || g, S = l_.useRef(null), C = l_.useRef(null), w = l_.useRef(u), T = c != null, E = s_(c), D = s_(i), O = s_(l), k = l_.useCallback(() => {
		if (!S.current || !C.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		D.current && (e.platform = D.current), n_(S.current, C.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: O.current !== !1
			};
			A.current && !i_(w.current, t) && (w.current = t, d_.flushSync(() => {
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
	f_(() => {
		l === !1 && w.current.isPositioned && (w.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let A = l_.useRef(!1);
	f_(() => (A.current = !0, () => {
		A.current = !1;
	}), []), f_(() => {
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
	let j = l_.useMemo(() => ({
		reference: S,
		floating: C,
		setReference: v,
		setFloating: y
	}), [v, y]), M = l_.useMemo(() => ({
		reference: b,
		floating: x
	}), [b, x]), N = l_.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!M.floating) return e;
		let t = o_(M.floating, u.x), r = o_(M.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...a_(M.floating) >= 1.5 && { willChange: "transform" }
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
	return l_.useMemo(() => ({
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
var l_, u_, d_, f_, p_, m_, h_, g_, __, v_ = o((() => {
	r_(), l_ = /* @__PURE__ */ u(b(), 1), u_ = /* @__PURE__ */ u(b(), 1), d_ = /* @__PURE__ */ u(Os(), 1), f_ = typeof document < "u" ? u_.useLayoutEffect : function() {}, p_ = (e, t) => {
		let n = Zg(e);
		return {
			name: n.name,
			fn: n.fn,
			options: [e, t]
		};
	}, m_ = (e, t) => {
		let n = Qg(e);
		return {
			name: n.name,
			fn: n.fn,
			options: [e, t]
		};
	}, h_ = (e, t) => ({
		fn: t_(e).fn,
		options: [e, t]
	}), g_ = (e, t) => {
		let n = $g(e);
		return {
			name: n.name,
			fn: n.fn,
			options: [e, t]
		};
	}, __ = (e, t) => {
		let n = e_(e);
		return {
			name: n.name,
			fn: n.fn,
			options: [e, t]
		};
	};
})), y_ = o((() => {
	Ku(), Ap(), np(), gp(), op(), Np(), Rp(), Up(), wh(), qp(), Oh(), Lh(), Hh(), Zh(), eg(), lg(), v_();
}));
// node_modules/@base-ui/react/dialog/portal/DialogPortalContext.mjs
function b_() {
	let e = x_.useContext(S_);
	if (e === void 0) throw Error(Pi(26));
	return e;
}
var x_, S_, C_ = o((() => {
	Fi(), x_ = /* @__PURE__ */ u(b(), 1), S_ = /*#__PURE__*/ x_.createContext(void 0);
}));
// node_modules/@base-ui/react/internals/composite/composite.mjs
function w_(e) {
	return Pr(e) && e.tagName === "INPUT";
}
function T_(e) {
	return !!(w_(e) && e.selectionStart != null || Pr(e) && e.tagName === "TEXTAREA");
}
function E_(e, t, n, r) {
	if (!e || !t || !t.scrollTo) return;
	let i = e.scrollLeft, a = e.scrollTop, o = e.clientWidth < e.scrollWidth, s = e.clientHeight < e.scrollHeight;
	if (o && r !== "vertical") {
		let r = D_(e, t, "left"), a = O_(e), o = O_(t);
		n === "ltr" && (r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight ? i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight : r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft && (i = r - o.scrollMarginLeft - a.scrollPaddingLeft)), n === "rtl" && (r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft ? i = r - o.scrollMarginLeft - a.scrollPaddingLeft : r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight && (i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight));
	}
	if (s && r !== "horizontal") {
		let n = D_(e, t, "top"), r = O_(e), i = O_(t);
		n - i.scrollMarginTop < e.scrollTop + r.scrollPaddingTop ? a = n - i.scrollMarginTop - r.scrollPaddingTop : n + t.offsetHeight + i.scrollMarginBottom > e.scrollTop + e.clientHeight - r.scrollPaddingBottom && (a = n + t.offsetHeight + i.scrollMarginBottom - e.clientHeight + r.scrollPaddingBottom);
	}
	e.scrollTo({
		left: i,
		top: a,
		behavior: "auto"
	});
}
function D_(e, t, n) {
	let r = n === "left" ? "offsetLeft" : "offsetTop", i = 0;
	for (; t.offsetParent && (i += t[r], t.offsetParent !== e);) t = t.offsetParent;
	return i;
}
function O_(e) {
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
var k_, A_, j_, M_, N_, P_, F_, I_, L_ = o((() => {
	$r(), oh(), k_ = "ArrowUp", A_ = "ArrowDown", j_ = "ArrowLeft", M_ = "ArrowRight", N_ = "Home", P_ = /* @__PURE__ */ new Set([
		k_,
		A_,
		j_,
		M_,
		N_,
		"End"
	]), F_ = "Shift", I_ = [
		F_,
		"Control",
		"Alt",
		"Meta"
	];
})), R_, z_ = o((() => {
	R_ = "--nested-dialogs";
})), B_, V_ = o((() => {
	Rc(), B_ = "data-nested-dialog-open";
})), H_, U_ = o((() => {
	xc(), Rc(), V_(), H_ = {
		...Ic,
		...bc,
		nestedDialogOpen(e) {
			return e ? { [B_]: "" } : null;
		}
	};
})), W_, G_, K_, q_ = o((() => {
	W_ = /* @__PURE__ */ u(b(), 1), y_(), mc(), Aa(), C_(), om(), L_(), Sh(), z_(), U_(), G_ = bs(), K_ = /*#__PURE__*/ W_.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, finalFocus: a, initialFocus: o, ...s } = e, c = dc(), l = c.useState("descriptionElementId"), u = c.useState("disablePointerDismissal"), d = c.useState("floatingRootContext"), f = c.useState("popupProps"), p = c.useState("modal"), m = c.useState("mounted"), h = c.useState("nested"), g = c.useState("nestedOpenDialogCount"), _ = c.useState("open"), v = c.useState("openMethod"), y = c.useState("titleElementId"), b = c.useState("transitionStatus"), x = c.useState("role"), S = d.useState("floatingId");
		b_(), im({
			open: _,
			ref: c.context.popupRef,
			onComplete() {
				_ && c.context.onOpenChangeComplete?.(!0);
			}
		});
		let C = o === void 0 ? um(c.context.popupRef) : o, w = g > 0, T = c.useStateSetter("popupElement"), E = xa("div", e, {
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
					...Tm,
					hidden: !m,
					onKeyDown(e) {
						P_.has(e.key) && e.stopPropagation();
					},
					style: { [R_]: g }
				},
				s
			],
			ref: [
				t,
				c.context.popupRef,
				T
			],
			stateAttributesMapping: H_
		});
		return /*#__PURE__*/ (0, G_.jsx)(Tp, {
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
function J_(e) {
	return aa(19) ? e : e ? "true" : void 0;
}
var Y_ = o((() => {
	sa();
})), X_, Z_, Q_, $_ = o((() => {
	X_ = /* @__PURE__ */ u(b(), 1), Z_ = bs(), Q_ = /*#__PURE__*/ X_.forwardRef(function(e, t) {
		let { cutout: n, ...r } = e, i;
		if (n) {
			let e = n.getBoundingClientRect();
			i = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${e.left}px ${e.top}px,${e.left}px ${e.bottom}px,${e.right}px ${e.bottom}px,${e.right}px ${e.top}px,${e.left}px ${e.top}px)`;
		}
		return /*#__PURE__*/ (0, Z_.jsx)("div", {
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
})), ev, tv, nv, rv = o((() => {
	ev = /* @__PURE__ */ u(b(), 1), Y_(), y_(), mc(), C_(), $_(), tv = bs(), nv = /*#__PURE__*/ ev.forwardRef(function(e, t) {
		let { keepMounted: n = !1, ...r } = e, i = dc(), a = i.useState("mounted"), o = i.useState("modal"), s = i.useState("open");
		return a || n ? /*#__PURE__*/ (0, tv.jsx)(S_.Provider, {
			value: n,
			children: /*#__PURE__*/ (0, tv.jsxs)(tp, {
				ref: t,
				...r,
				children: [a && o === !0 && /*#__PURE__*/ (0, tv.jsx)(Q_, {
					ref: i.context.internalBackdropRef,
					inert: J_(!s)
				}), e.children]
			})
		}) : null;
	});
}));
// node_modules/@base-ui/utils/useScrollLock.mjs
function iv(e, t) {
	return Ir(e) ? e : t;
}
function av(e, t, n) {
	return /hidden|clip/.test(e.getComputedStyle(iv(t, n)).overflowY);
}
function ov(e) {
	if (typeof document > "u") return !1;
	let t = Ui(e);
	return Ar(t).innerWidth - t.documentElement.clientWidth > 0;
}
function sv(e) {
	if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u") return !1;
	let t = Ui(e), n = t.documentElement, r = t.body, i = iv(n, r), a = i.style.overflowY, o = n.style.scrollbarGutter;
	n.style.scrollbarGutter = "stable", i.style.overflowY = "scroll";
	let s = i.offsetWidth;
	i.style.overflowY = "hidden";
	let c = i.offsetWidth;
	return i.style.overflowY = a, n.style.scrollbarGutter = o, s === c;
}
function cv(e) {
	let t = Ui(e), n = t.documentElement, r = t.body, i = iv(n, r), a = {
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
function lv(e) {
	let t = Ui(e), n = t.documentElement, r = t.body, i = Ar(n), a = 0, o = 0, s = !1, c = id.create();
	if (Xl && (i.visualViewport?.scale ?? 1) !== 1) return () => {};
	function l() {
		let t = i.getComputedStyle(n), c = i.getComputedStyle(r), l = (t.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
		a = n.scrollTop, o = n.scrollLeft, dv = {
			scrollbarGutter: n.style.scrollbarGutter,
			overflowY: n.style.overflowY,
			overflowX: n.style.overflowX
		}, pv = n.style.scrollBehavior, fv = {
			position: r.style.position,
			height: r.style.height,
			width: r.style.width,
			boxSizing: r.style.boxSizing,
			overflowY: r.style.overflowY,
			overflowX: r.style.overflowX,
			scrollBehavior: r.style.scrollBehavior
		};
		let u = n.scrollHeight > n.clientHeight, d = n.scrollWidth > n.clientWidth, f = t.overflowY === "scroll" || c.overflowY === "scroll", p = t.overflowX === "scroll" || c.overflowX === "scroll", m = Math.max(0, i.innerWidth - r.clientWidth), h = Math.max(0, i.innerHeight - r.clientHeight), g = parseFloat(c.marginTop) + parseFloat(c.marginBottom), _ = parseFloat(c.marginLeft) + parseFloat(c.marginRight), v = iv(n, r);
		s = sv(e), s ? (n.style.scrollbarGutter = l, v.style.overflowY = "hidden", v.style.overflowX = "hidden") : (Object.assign(n.style, {
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
		Object.assign(n.style, dv), Object.assign(r.style, fv), s || (n.scrollTop = a, n.scrollLeft = o, n.removeAttribute("data-base-ui-scroll-locked"), n.style.scrollBehavior = pv);
	}
	function d() {
		u(), c.request(l);
	}
	l();
	let f = qu(i, "resize", d);
	return () => {
		c.cancel(), u(), typeof i.removeEventListener == "function" && f();
	};
}
function uv(e = !0, t = null) {
	K(() => {
		if (e) return hv.acquire(t);
	}, [e, t]);
}
var dv, fv, pv, mv, hv, gv = o((() => {
	$r(), Ju(), ru(), Wi(), mi(), Il(), ad(), dv = {}, fv = {}, pv = "", mv = class {
		lockCount = 0;
		restore = null;
		timeoutLock = Fl.create();
		timeoutUnlock = Fl.create();
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
			let t = Ui(e), n = t.documentElement, r = t.body, i = Ar(n);
			if (av(i, n, r)) {
				let t = new i.MutationObserver(() => {
					av(i, n, r) || (t.disconnect(), this.restore = null, this.lock(e));
				}), a = { attributes: !0 };
				t.observe(n, a), t.observe(r, a), this.restore = () => t.disconnect();
				return;
			}
			let a = Wl || !ov(e);
			this.restore = a ? cv(e) : lv(e);
		}
	}, hv = new mv();
}));
// node_modules/@base-ui/react/dialog/root/useDialogRoot.mjs
function _v({ store: e, parentContext: t, isDrawer: n }) {
	let r = e.useState("open"), i = e.useState("mounted"), a = e.useState("disablePointerDismissal"), o = e.useState("modal"), s = e.useState("popupElement"), c = e.useState("floatingRootContext"), [l, u] = vv.useState(0), [d, f] = vv.useState(0), p = l === 0, m = Vp(c, {
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
			let n = mu(t);
			if (p && !a) {
				if (o) {
					let t = e.context.internalBackdropRef.current, r = e.context.backdropRef.current;
					return t || r ? t === n || r === n || fu(n, s) && !n?.hasAttribute("data-base-ui-portal") : !0;
				}
				return !0;
			}
			return !1;
		},
		escapeKey: p
	});
	return uv(r && o === !0, s), e.useContextCallback("onNestedDialogOpen", (t, n) => {
		(e.select("open") || e.select("mounted")) && (u(t), f(n));
	}), K(() => {
		!r && !i && (u(0), f(0));
	}, [r, i]), K(() => (t?.onNestedDialogOpen && r && t.onNestedDialogOpen(l + 1, d + +!!n), () => {
		t?.onNestedDialogOpen && r && t.onNestedDialogOpen(0, 0);
	}), [
		n,
		r,
		l,
		d,
		t
	]), xm(e, {
		activeTriggerProps: m.reference,
		inactiveTriggerProps: m.trigger,
		popupProps: m.floating,
		nestedOpenDialogCount: l,
		nestedOpenDrawerCount: d
	}), null;
}
var vv, yv = o((() => {
	vv = /* @__PURE__ */ u(b(), 1), mi(), gv(), y_(), oh(), Sh();
}));
// node_modules/@base-ui/react/dialog/store/DialogStore.mjs
function bv(e, t, n, r = !1) {
	return {
		...uh(t, n, r),
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
function xv(e) {
	return {
		popupRef: /*#__PURE__*/ Sv.createRef(),
		backdropRef: /*#__PURE__*/ Sv.createRef(),
		internalBackdropRef: /*#__PURE__*/ Sv.createRef(),
		outsidePressEnabledRef: { current: !0 },
		triggerElements: e,
		onOpenChange: void 0,
		onOpenChangeComplete: void 0
	};
}
var Sv, Cv, wv, Tv = o((() => {
	Sv = /* @__PURE__ */ u(b(), 1), ah(), Sh(), Cv = {
		...gh,
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
	}, wv = class extends nh {
		constructor(e, t, n) {
			let r = new Dm(), i = bv(e, r, t, n);
			super(i, xv(r), Cv);
		}
		setOpen = (e, t) => {
			t.preventUnmountOnClose = () => {
				this.set("preventUnmountingOnClose", !0);
			}, !e && t.trigger == null && this.state.activeTriggerId != null && (t.trigger = this.state.activeTriggerElement ?? void 0), this.context.onOpenChange?.(e, t), t.isCanceled || (this.state.floatingRootContext.dispatchOpenChange(e, t), this.update(hm(this.state, e, t.trigger)));
		};
	};
}));
// node_modules/@base-ui/react/dialog/root/useRenderDialogRoot.mjs
function Ev(e, t) {
	let { children: n, open: r, defaultOpen: i = !1, onOpenChange: a, onOpenChangeComplete: o, disablePointerDismissal: s = !1, modal: c = !0, actionsRef: l, handle: u, triggerId: d, defaultTriggerId: f = null } = t, p = e === "drawer", m = e === "alert-dialog", h = m ? !0 : c, g = m || s, _ = m ? "alertdialog" : "dialog", v = dc(!0), y = {
		modal: h,
		disablePointerDismissal: g,
		nested: v != null,
		role: _
	}, b = dm((e, t) => new wv({
		open: i,
		openProp: r,
		activeTriggerId: f,
		triggerIdProp: d,
		...y
	}, e, t), !0);
	b.useControlledProp("openProp", r), b.useControlledProp("triggerIdProp", d), b.useSyncedValues(y), b.useContextCallback("onOpenChange", a), b.useContextCallback("onOpenChangeComplete", o);
	let x = b.useState("open"), S = b.useState("mounted"), C = b.useState("payload");
	Sm(b, x), ym(b);
	let { forceUnmount: w } = bm(x, b);
	Dv.useImperativeHandle(l, () => ({
		unmount: w,
		close: () => b.setOpen(!1, Uc(ll))
	}), [w, b]);
	let T = x || S || u != null;
	return /*#__PURE__*/ (0, Ov.jsxs)(pc.Provider, {
		value: b,
		children: [
			u && /*#__PURE__*/ (0, Ov.jsx)(fm, {
				handle: u,
				store: b
			}),
			T && /*#__PURE__*/ (0, Ov.jsx)(_v, {
				store: b,
				parentContext: v?.context,
				isDrawer: p
			}),
			typeof n == "function" ? n({ payload: C }) : n
		]
	});
}
var Dv, Ov, kv = o((() => {
	Dv = /* @__PURE__ */ u(b(), 1), yv(), mc(), Tv(), Gc(), fl(), Sh(), Ov = bs();
})), Av, jv = o((() => {
	Um(), kv(), Av = Lm(function(e) {
		return Ev("dialog", e);
	});
})), Mv, Nv, Pv = o((() => {
	Mv = /* @__PURE__ */ u(b(), 1), mc(), Aa(), El(), Nv = /*#__PURE__*/ Mv.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, id: a, ...o } = e, s = dc(), c = Tl(a);
		return s.useSyncedValueWithCleanup("titleElementId", c), xa("h2", e, {
			ref: t,
			props: [{ id: c }, o]
		});
	});
}));
// node_modules/@base-ui/utils/useEnhancedClickHandler.mjs
function Fv(e) {
	let t = Iv.useRef(""), n = Iv.useCallback((n) => {
		n.defaultPrevented || (t.current = n.pointerType, e(n, n.pointerType));
	}, [e]);
	return {
		onClick: Iv.useCallback((n) => {
			n.detail === 0 ? e(n, "keyboard") : ("pointerType" in n ? e(n, n.pointerType) : e(n, t.current), t.current = "");
		}, [e]),
		onPointerDown: n
	};
}
var Iv, Lv = o((() => {
	Iv = /* @__PURE__ */ u(b(), 1);
}));
// node_modules/@base-ui/react/internals/useValueChanged.mjs
function Rv(e, t) {
	let n = zv.useRef(e), r = G(t);
	K(() => {
		n.current !== e && r(n.current), n.current = e;
	}, [e, r]);
}
var zv, Bv = o((() => {
	zv = /* @__PURE__ */ u(b(), 1), mi(), di();
}));
// node_modules/@base-ui/react/utils/useOpenInteractionType.mjs
function Vv(e, t) {
	let { onClick: n, onPointerDown: r } = Fv(G((n, r) => {
		(typeof e == "function" ? e() : e) || t(r || (Wl ? "touch" : ""));
	}));
	return Uv.useMemo(() => ({
		onClick: n,
		onPointerDown: r
	}), [n, r]);
}
function Hv(e) {
	let [t, n] = Uv.useState(null), r = Vv(e, n);
	return Rv(e, (t) => {
		t && !e && n(null);
	}), Uv.useMemo(() => ({
		openMethod: t,
		triggerProps: r
	}), [t, r]);
}
var Uv, Wv = o((() => {
	Uv = /* @__PURE__ */ u(b(), 1), di(), Lv(), ru(), Bv();
})), Gv = o((() => {
	Vc(), hl(), kl(), q_(), rv(), jv(), Aa(), mc(), C_(), U_(), Pv(), Fi(), Um(), Zi(), Rc(), qf(), Sh(), El(), y_(), Wv(), Tv(), Gc(), fl(), Gp();
})), Kv = o((() => {
	Gv(), Rc(), z_(), V_();
}));
// src/components/ui/portal-context.tsx
function qv({ container: e, children: t }) {
	return /* @__PURE__ */ (0, Xv.jsx)(Zv.Provider, {
		value: e,
		children: t
	});
}
function Jv() {
	return (0, Yv.useContext)(Zv);
}
var Yv, Xv, Zv, Qv = o((() => {
	Yv = /* @__PURE__ */ u(b(), 1), Xv = bs(), Zv = (0, Yv.createContext)(null);
}));
// src/components/ui/dialog.tsx
function $v({ ...e }) {
	return /* @__PURE__ */ (0, sy.jsx)(Av, {
		"data-slot": "dialog",
		...e
	});
}
function ey({ container: e, ...t }) {
	let n = Jv();
	return /* @__PURE__ */ (0, sy.jsx)(nv, {
		"data-slot": "dialog-portal",
		container: e ?? n ?? void 0,
		...t
	});
}
function ty({ className: e, ...t }) {
	return /* @__PURE__ */ (0, sy.jsx)(Bc, {
		"data-slot": "dialog-overlay",
		className: _s("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", e),
		...t
	});
}
function ny({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ (0, sy.jsxs)(ey, { children: [/* @__PURE__ */ (0, sy.jsx)(ty, {}), /* @__PURE__ */ (0, sy.jsxs)(K_, {
		"data-slot": "dialog-content",
		className: _s("oo-dialog-popup fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...r,
		children: [t, n && /* @__PURE__ */ (0, sy.jsxs)(ml, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ (0, sy.jsx)(Y, {
				variant: "ghost",
				className: "absolute top-2 right-2",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, sy.jsx)(Sr, {}), /* @__PURE__ */ (0, sy.jsx)("span", {
				className: "sr-only",
				children: "Fechar diálogo"
			})]
		})]
	})] });
}
function ry({ className: e, ...t }) {
	return /* @__PURE__ */ (0, sy.jsx)("div", {
		"data-slot": "dialog-header",
		className: _s("flex flex-col gap-2", e),
		...t
	});
}
function iy({ className: e, showCloseButton: t = !1, children: n, ...r }) {
	return /* @__PURE__ */ (0, sy.jsxs)("div", {
		"data-slot": "dialog-footer",
		className: _s("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", e),
		...r,
		children: [n, t && /* @__PURE__ */ (0, sy.jsx)(ml, {
			render: /* @__PURE__ */ (0, sy.jsx)(Y, { variant: "outline" }),
			children: "Close"
		})]
	});
}
function ay({ className: e, ...t }) {
	return /* @__PURE__ */ (0, sy.jsx)(Nv, {
		"data-slot": "dialog-title",
		className: _s("font-heading text-base leading-none font-medium", e),
		...t
	});
}
function oy({ className: e, ...t }) {
	return /* @__PURE__ */ (0, sy.jsx)(Ol, {
		"data-slot": "dialog-description",
		className: _s("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", e),
		...t
	});
}
var sy, cy = o((() => {
	b(), Kv(), vs(), Qv(), Cs(), Dr(), sy = bs();
}));
Cs(), cy();
var ly = class extends Z.Component {
	state = { failed: !1 };
	static getDerivedStateFromError() {
		return { failed: !0 };
	}
	render() {
		return this.state.failed ? /* @__PURE__ */ (0, X.jsx)($v, {
			open: !0,
			onOpenChange: (e) => {
				e || this.props.onClose();
			},
			children: /* @__PURE__ */ (0, X.jsxs)(ny, { children: [/* @__PURE__ */ (0, X.jsxs)(ry, { children: [/* @__PURE__ */ (0, X.jsx)(ay, { children: "Perfil indisponível" }), /* @__PURE__ */ (0, X.jsx)(oy, { children: "Não foi possível abrir o perfil. Feche e tente novamente." })] }), /* @__PURE__ */ (0, X.jsx)(Y, {
				onClick: this.props.onClose,
				children: "Fechar"
			})] })
		}) : this.props.children;
	}
}, uy, dy, fy = o((() => {
	uy = encodeURIComponent, dy = {
		inbox: (e) => p("/dm/inbox?active=" + (document.hidden ? "0" : "1") + (e === null ? "" : "&after=" + e)),
		request: (e) => p("/dm/requests", {
			method: "POST",
			body: JSON.stringify({ username: e })
		}),
		respond: (e, t) => p("/dm/conversations/" + uy(e) + "/request", {
			method: "POST",
			body: JSON.stringify({ action: t })
		}),
		messages: (e, t = {}) => {
			let n = new URLSearchParams();
			for (let [e, r] of Object.entries(t)) r !== void 0 && r !== "" && n.set(e, String(r));
			return p("/dm/conversations/" + uy(e) + "/messages?" + n);
		},
		send: (e, t) => p("/dm/conversations/" + uy(e) + "/messages", {
			method: "POST",
			body: JSON.stringify(t)
		}),
		message: (e) => p("/dm/messages/" + uy(e)),
		edit: (e, t) => p("/dm/messages/" + uy(e), {
			method: "PATCH",
			body: JSON.stringify({ content: t })
		}),
		remove: (e) => p("/dm/messages/" + uy(e), { method: "DELETE" }),
		action: (e, t, n) => p("/dm/messages/" + uy(e) + "/actions", {
			method: "POST",
			body: JSON.stringify({
				action: t,
				value: n
			})
		}),
		read: (e, t) => p("/dm/conversations/" + uy(e) + "/read", {
			method: "POST",
			body: JSON.stringify({ seq: t })
		}),
		typing: (e, t) => p("/dm/conversations/" + uy(e) + "/typing", {
			method: "POST",
			body: JSON.stringify({ active: t })
		}),
		conversation: (e, t) => p("/dm/conversations/" + uy(e), {
			method: "PATCH",
			body: JSON.stringify(t)
		}),
		settings: (e) => p("/dm/settings", {
			method: "PATCH",
			body: JSON.stringify(e)
		}),
		block: (e, t) => p("/dm/people/" + uy(e) + "/block", {
			method: "POST",
			body: JSON.stringify({ blocked: t })
		}),
		person: (e) => p("/dm/people/" + uy(e)),
		claim: (e) => p("/dm/notifications/claim", {
			method: "POST",
			body: JSON.stringify({ seq: e })
		}),
		upload: async (e, t) => {
			if (t.size > 8388608) throw Error("Cada arquivo pode ter até 8 MB.");
			let n = await new Promise((e, n) => {
				let r = new FileReader();
				r.onload = () => e(String(r.result).split(",")[1]), r.onerror = () => n(Error("Não foi possível ler o arquivo.")), r.readAsDataURL(t);
			});
			return p("/dm/conversations/" + uy(e) + "/attachments", {
				method: "POST",
				body: JSON.stringify({
					name: t.name,
					mime: t.type || "application/octet-stream",
					data: n
				})
			});
		},
		attachment: (e) => p("/dm/attachments/" + uy(e)),
		discardAttachment: (e) => p("/dm/attachments/" + uy(e), { method: "DELETE" })
	};
}));
// src/utils/unique-id.ts
function py() {
	return typeof crypto.randomUUID == "function" ? crypto.randomUUID() : Array.from(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16)), (e) => e.toString(16).padStart(2, "0")).join("");
}
var my = o((() => {}));
// src/stores/messages-store.ts
function hy(e, t) {
	Ny({ threads: {
		...Cy.threads,
		[e]: {
			...Cy.threads[e] || jy(),
			...t
		}
	} });
}
async function gy() {
	Fy ||= new AudioContext(), await Fy.resume();
}
function _y() {
	try {
		if (Fy?.state !== "running") return;
		let e = Fy.createOscillator(), t = Fy.createGain();
		e.frequency.value = 660, t.gain.setValueAtTime(.025, Fy.currentTime), t.gain.exponentialRampToValueAtTime(.001, Fy.currentTime + .12), e.connect(t), t.connect(Fy.destination), e.start(), e.stop(Fy.currentTime + .12);
	} catch {}
}
function vy(e) {
	let t = Cy.threads[e.conversationId];
	t && hy(e.conversationId, { messages: Py(t.messages, [e]) });
}
async function yy() {
	if (Dy || !Cy.username || !Ty) return;
	Ey && clearTimeout(Ey), Dy = !0;
	let e = wy, t = Oy;
	try {
		let n = await dy.inbox(ky);
		if (e !== wy) return;
		if (!Array.isArray(n.conversations) || !Array.isArray(n.requests) || n.me?.username !== Cy.username) throw Error("As mensagens estão temporariamente indisponíveis.");
		if (t !== Oy) return;
		ky = n.cursor, Ny({
			inbox: n,
			connected: !0,
			updatedAt: Date.now(),
			error: ""
		});
		let r = Cy.selectedId;
		if (Cy.open && r && !document.hidden) {
			let i = Cy.threads[r] || jy(), a = await dy.messages(r, i.messages.length ? { after: i.messages.at(-1).seq } : {});
			if (e !== wy || t !== Oy) return;
			let o = Py(i.messages, a.messages), s = new Set(n.events.filter((e) => e.conversationId === r && [
				"edited",
				"deleted",
				"changed"
			].includes(e.kind)).map((e) => e.messageId).filter((e) => !!e));
			for (let t of s) if (o.some((e) => e.id === t)) try {
				let n = await dy.message(t);
				if (e !== wy) return;
				o = Py(o, [n.message]);
			} catch {}
			hy(r, {
				messages: o,
				hasMore: i.messages.length ? i.hasMore : a.hasMore,
				typing: a.typing,
				error: ""
			});
			let c = o.at(-1);
			if (a.conversation.unread && c && document.hasFocus()) {
				if (await dy.read(r, c.seq), e !== wy) return;
				Ny({ inbox: {
					...n,
					conversations: n.conversations.map((e) => e.id === r ? {
						...a.conversation,
						unread: 0
					} : e)
				} });
			}
		}
		let i = n.settings.desktop && typeof Notification < "u" && Notification.permission === "granted";
		if (n.settings.notifications && (!document.hidden && document.hasFocus() || i)) for (let t of n.events.filter((e) => !e.claimed && ["message", "request"].includes(e.kind)).slice(-3)) {
			if (Cy.open && t.conversationId === Cy.selectedId && !document.hidden && document.hasFocus()) continue;
			let r = await dy.claim(t.seq);
			if (e !== wy) return;
			if (!r.claimed || !r.conversation) continue;
			let a = r.conversation.peer, o = r.kind === "request" ? "Quer iniciar uma conversa com você." : n.settings.previews ? r.message?.content || "Enviou um arquivo." : "Nova mensagem direta.";
			if (document.hidden && i) {
				let e = new Notification(a.profile.displayName, {
					body: o,
					icon: a.profile.avatar || void 0,
					tag: "organizeon-dm-" + t.seq
				});
				e.onclick = () => {
					window.focus(), Q.open(t.conversationId), e.close();
				};
			} else Ny({ notices: [...Cy.notices, {
				id: t.seq,
				conversationId: t.conversationId,
				person: a,
				text: o,
				kind: r.kind || "message"
			}].slice(-3) }), n.settings.sound && _y();
		}
	} catch (t) {
		e === wy && (t instanceof g && t.status === 401 ? (ky = null, Ny({
			inbox: null,
			threads: {},
			notices: [],
			connected: !1,
			error: t.message
		})) : Ny({
			connected: !1,
			error: t instanceof Error ? t.message : "Não foi possível conectar às mensagens."
		}));
	} finally {
		e === wy && (Dy = !1, Ty && (Ey = setTimeout(() => void yy(), document.hidden ? 2e4 : Cy.open ? 1800 : 5e3)));
	}
}
function by() {
	return (0, xy.useSyncExternalStore)(Q.subscribe, Q.get, Q.get);
}
var xy, Sy, Cy, wy, Ty, Ey, Dy, Oy, ky, Ay, jy, My, Ny, Py, Fy, Q, Iy = o((() => {
	xy = /* @__PURE__ */ u(b(), 1), _(), fy(), my(), Sy = () => ({
		username: null,
		inbox: null,
		connected: !1,
		updatedAt: 0,
		error: "",
		open: !1,
		selectedId: null,
		view: "inbox",
		threads: {},
		drafts: {},
		notices: []
	}), Cy = Sy(), wy = 0, Ty = 0, Dy = !1, Oy = 0, ky = null, Ay = /* @__PURE__ */ new Set(), jy = () => ({
		messages: [],
		hasMore: !1,
		typing: !1,
		loading: !1,
		error: ""
	}), My = () => ({
		text: "",
		reply: null,
		attachments: [],
		retry: null
	}), Ny = (e) => {
		Cy = {
			...Cy,
			...e
		};
		for (let e of Ay) e();
	}, Py = (e, t) => [...new Map([...e, ...t].map((e) => [e.id, e])).values()].sort((e, t) => e.seq - t.seq).slice(-240), Fy = null, Q = {
		get: () => Cy,
		subscribe: (e) => (Ay.add(e), () => {
			Ay.delete(e);
		}),
		start(e) {
			Cy.username !== e && (wy++, Ey && clearTimeout(Ey), Cy = {
				...Sy(),
				username: e
			}, ky = null, Dy = !1, Ty = 0, Oy = 0);
			let t = wy;
			return Ty++, yy(), () => {
				t === wy && --Ty <= 0 && (wy++, Ey && clearTimeout(Ey), Dy = !1, ky = null, Ny(Sy()));
			};
		},
		open(e) {
			let t = e || Cy.selectedId, n = "inbox";
			e && Cy.inbox?.requests.some((t) => t.id === e) && (t = null, n = "requests"), Ny({
				open: !0,
				selectedId: t,
				view: n
			}), t && Q.load(t), yy();
		},
		close() {
			Ny({ open: !1 });
		},
		back() {
			Cy.selectedId ? Ny({
				selectedId: null,
				view: "inbox"
			}) : Cy.view === "inbox" ? Ny({ open: !1 }) : Ny({ view: "inbox" });
		},
		view(e) {
			Ny({
				view: e,
				selectedId: null
			});
		},
		select(e) {
			Ny({
				selectedId: e,
				view: "inbox"
			}), Q.load(e);
		},
		draft(e) {
			return Cy.drafts[e] || My();
		},
		setDraft(e, t) {
			Ny({ drafts: {
				...Cy.drafts,
				[e]: {
					...Q.draft(e),
					...t
				}
			} });
		},
		dismissNotice(e) {
			Ny({ notices: Cy.notices.filter((t) => t.id !== e) });
		},
		async refresh() {
			Oy++, Ey && clearTimeout(Ey), Dy ? Ey = setTimeout(() => void yy(), 200) : await yy();
		},
		async load(e, t = !1) {
			let n = Cy.threads[e] || jy();
			if (n.loading) return;
			let r = wy;
			hy(e, {
				loading: !0,
				error: ""
			});
			try {
				let i = await dy.messages(e, t && n.messages.length ? { before: n.messages[0].seq } : {});
				if (r !== wy) return;
				hy(e, {
					messages: Py(n.messages, i.messages),
					hasMore: i.hasMore,
					typing: i.typing,
					loading: !1
				});
			} catch (t) {
				r === wy && hy(e, {
					error: t instanceof Error ? t.message : "Não foi possível carregar.",
					loading: !1
				});
			}
		},
		async send(e) {
			let t = Q.draft(e);
			if (!t.text.trim() && !t.attachments.length) return;
			let n = JSON.stringify({
				text: t.text,
				reply: t.reply?.id,
				attachments: t.attachments.map((e) => e.id)
			}), r = t.retry?.fingerprint === n ? t.retry.nonce : py();
			Q.setDraft(e, { retry: {
				fingerprint: n,
				nonce: r
			} });
			let i = wy, a = await dy.send(e, {
				content: t.text,
				replyId: t.reply?.id,
				attachmentIds: t.attachments.map((e) => e.id),
				nonce: r
			});
			i === wy && (vy(a.message), Q.setDraft(e, {
				text: "",
				reply: null,
				attachments: [],
				retry: null
			}), await Q.refresh());
		},
		async upload(e, t) {
			let n = wy;
			if (Q.draft(e).attachments.length >= 4) throw Error("Você pode adicionar até quatro arquivos.");
			let r = await dy.upload(e, t);
			n === wy && Q.setDraft(e, { attachments: [...Q.draft(e).attachments, r.attachment].slice(0, 4) });
		},
		async removeAttachment(e, t) {
			await dy.discardAttachment(t), Q.setDraft(e, { attachments: Q.draft(e).attachments.filter((e) => e.id !== t) });
		},
		async request(e) {
			let t = await dy.request(e);
			await Q.refresh(), t.status === "accepted" ? Q.select(t.id) : Q.view("requests");
		},
		async respond(e, t) {
			await dy.respond(e, t), await Q.refresh(), t === "accept" && Q.select(e);
		},
		async settings(e) {
			let t = await dy.settings(e);
			Oy++, Cy.inbox && Ny({ inbox: {
				...Cy.inbox,
				settings: t.settings
			} });
		},
		async action(e, t, n) {
			await dy.action(e.id, t, n), t === "unread" ? Ny({
				selectedId: null,
				view: "inbox"
			}) : vy((await dy.message(e.id)).message), await Q.refresh();
		},
		async edit(e, t) {
			vy((await dy.edit(e.id, t)).message), await Q.refresh();
		},
		async remove(e) {
			await dy.remove(e.id), vy((await dy.message(e.id)).message), await Q.refresh();
		},
		async forward(e, t) {
			vy((await dy.send(t, {
				forwardId: e.id,
				nonce: py()
			})).message), await Q.refresh(), Q.select(t);
		},
		async conversation(e, t) {
			await dy.conversation(e, t), t.archived && Cy.selectedId === e && Ny({ selectedId: null }), await Q.refresh();
		},
		async block(e, t) {
			await dy.block(e.username, t), await Q.refresh();
		}
	}, typeof window < "u" && (window.addEventListener("focus", () => void Q.refresh()), document.addEventListener("visibilitychange", () => {
		document.hidden || Q.refresh();
	}));
}));
// src/features/profile/profile-avatar.tsx
function Ly(e) {
	return e === "circle" ? "50%" : e === "rounded" ? "20%" : "0";
}
function Ry({ profile: e, className: t = "size-8" }) {
	return /* @__PURE__ */ (0, zy.jsx)("span", {
		className: `grid shrink-0 place-items-center overflow-hidden border border-border bg-muted ${t}`,
		style: { borderRadius: Ly(e.avatarShape) },
		children: e.avatar ? /* @__PURE__ */ (0, zy.jsx)("img", {
			src: e.avatar,
			alt: "",
			className: "size-full object-cover"
		}) : /* @__PURE__ */ (0, zy.jsx)(yr, { className: "size-4 text-muted-foreground" })
	});
}
var zy, By = o((() => {
	Dr(), zy = bs();
}));
Dr(), Qv(), Cs(), By(), Iy();
function Vy({ notice: e }) {
	let [t, n] = (0, Z.useState)(!1);
	(0, Z.useEffect)(() => {
		let e = requestAnimationFrame(() => n(!0)), t = setTimeout(() => r(), 9e3);
		return () => {
			cancelAnimationFrame(e), clearTimeout(t);
		};
	}, [e.id]);
	function r() {
		n(!1), setTimeout(() => Q.dismissNotice(e.id), 150);
	}
	return /* @__PURE__ */ (0, X.jsx)("div", {
		role: "status",
		className: `pointer-events-auto rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-sm transition-[opacity,transform] duration-150 motion-reduce:transition-none ${t ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`,
		children: /* @__PURE__ */ (0, X.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [
				/* @__PURE__ */ (0, X.jsx)(Ry, {
					profile: e.person.profile,
					className: "size-9"
				}),
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, X.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: e.person.profile.displayName
						}),
						/* @__PURE__ */ (0, X.jsx)("p", {
							className: "mt-1 line-clamp-2 break-words text-xs text-muted-foreground",
							children: e.text
						}),
						/* @__PURE__ */ (0, X.jsx)(Y, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "mt-2",
							onClick: () => {
								Q.open(e.conversationId), r();
							},
							children: "Abrir"
						})
					]
				}),
				/* @__PURE__ */ (0, X.jsx)(Y, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					"aria-label": `Fechar notificação de ${e.person.profile.displayName}`,
					onClick: r,
					children: /* @__PURE__ */ (0, X.jsx)(Sr, { className: "size-4" })
				})
			]
		})
	});
}
function Hy() {
	let { notices: e } = by(), t = Jv();
	return e.length ? (0, js.createPortal)(/* @__PURE__ */ (0, X.jsx)("div", {
		"aria-label": "Notificações de mensagens",
		className: "pointer-events-none fixed right-4 top-4 z-50 grid w-[min(22rem,calc(100vw-2rem))] gap-2",
		children: e.map((e) => /* @__PURE__ */ (0, X.jsx)(Vy, { notice: e }, e.id))
	}), t || document.body) : null;
}
// node_modules/@base-ui/react/internals/noop.mjs
var Uy = o((() => {
	ma();
})), Wy, Gy, Ky = o((() => {
	Wy = "data-valid", Gy = "data-invalid";
})), qy, Jy, Yy, Xy, Zy = o((() => {
	Ky(), qy = {
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
	}, Jy = {
		valid: null,
		touched: !1,
		dirty: !1,
		filled: !1,
		focused: !1
	}, Yy = {
		disabled: !1,
		...Jy
	}, Xy = { valid(e) {
		return e === null ? null : e ? { [Wy]: "" } : { [Gy]: "" };
	} };
}));
// node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
function Qy(e = !0) {
	let t = $y.useContext(tb);
	if (t.setValidityData === da && !e) throw Error(Pi(28));
	return t;
}
var $y, eb, tb, nb = o((() => {
	Fi(), $y = /* @__PURE__ */ u(b(), 1), ma(), Uy(), Zy(), eb = {
		invalid: void 0,
		name: void 0,
		validityData: {
			state: qy,
			errors: [],
			error: "",
			value: "",
			initialValue: null
		},
		setValidityData: da,
		disabled: void 0,
		setTouched: da,
		setDirty: da,
		setFilled: da,
		setFocused: da,
		focusOwnerRef: { current: void 0 },
		validationMode: "onSubmit",
		shouldValidateOnChange: () => !1,
		state: Yy,
		registerFieldControl: da,
		validation: {
			getValidationProps: (e, t = pa) => t,
			inputRef: { current: null },
			registeredInputs: /* @__PURE__ */ new Map(),
			registerInput: da,
			getInputControl: () => null,
			commit: async () => {},
			change: da
		}
	}, tb = /*#__PURE__*/ $y.createContext(eb);
}));
// node_modules/@base-ui/react/internals/form-context/FormContext.mjs
function rb() {
	return ib.useContext(ab);
}
var ib, ab, ob = o((() => {
	ib = /* @__PURE__ */ u(b(), 1), Uy(), ab = /*#__PURE__*/ ib.createContext({
		elementRef: { current: null },
		formRef: { current: { fields: /* @__PURE__ */ new Map() } },
		errors: {},
		clearErrors: da,
		validationMode: "onSubmit",
		submitCountRef: { current: 0 }
	});
}));
// node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
function sb() {
	return cb.useContext(lb);
}
var cb, lb, ub = o((() => {
	cb = /* @__PURE__ */ u(b(), 1), Uy(), lb = /*#__PURE__*/ cb.createContext({
		controlId: void 0,
		registerControlId: da,
		resetControlId: da,
		labelId: void 0,
		setLabelId: da,
		messageIds: [],
		setMessageIds: da,
		getDescriptionProps: (e) => e
	});
}));
// node_modules/@base-ui/react/internals/labelable-provider/useAriaLabelledBy.mjs
function db(e, t, n, r = !0, i, a) {
	let [o, s] = mb.useState(), c = Tl(i ? `${i}-label` : void 0), l = !!a?.trim(), u = e ?? (l ? void 0 : t) ?? o;
	return K(() => {
		let i = e || t || l || !r ? void 0 : fb(n.current, c);
		o !== i && s(i);
	}), u;
}
function fb(e, t) {
	let n = pb(e);
	if (n) return !n.id && t && (n.id = t), n.id || void 0;
}
function pb(e) {
	if (!e) return;
	let t = e.parentElement;
	if (t && t.tagName === "LABEL") return t;
	let n = e.id;
	if (n) {
		let t = e.nextElementSibling;
		if (t && t.htmlFor === n) return t;
	}
	let r = e.labels;
	return r && r[0];
}
var mb, hb = o((() => {
	mb = /* @__PURE__ */ u(b(), 1), mi(), El();
}));
// node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function gb(e = {}) {
	let { id: t, enabled: n = !0 } = e, { controlId: r, registerControlId: i, resetControlId: a } = sb(), o = Tl(), s = ri(() => Symbol()), c = _b.useRef(!1), l = _b.useRef(!1), u = G(() => {
		c.current && i !== da && (c.current = !1, i(s.current, void 0));
	});
	return K(() => {
		if (!n || i === da) {
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
	]), K(() => u, [u]), (n ? r : void 0) ?? t ?? o;
}
var _b, vb = o((() => {
	_b = /* @__PURE__ */ u(b(), 1), mi(), di(), oi(), Uy(), El(), ub();
}));
// node_modules/@base-ui/react/field/item/FieldItemContext.mjs
function yb() {
	return bb.useContext(xb);
}
var bb, xb, Sb = o((() => {
	bb = /* @__PURE__ */ u(b(), 1), xb = /*#__PURE__*/ bb.createContext({ disabled: !1 });
}));
// node_modules/@base-ui/react/internals/field-root-context/useSetFieldFocused.mjs
function Cb(e, t, n) {
	let { setFocused: r, focusOwnerRef: i } = Qy(), a = G((t) => {
		(t ? !e : i.current === a) && (i.current = t && a, n?.(t), r(t));
	});
	return K(() => {
		let e = t.current;
		return e?.getRootNode()?.activeElement === e && a(!0), () => a(!1);
	}, [
		e,
		t,
		a
	]), a;
}
var wb = o((() => {
	mi(), di(), nb();
}));
// node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function Tb(e, t, n, r, i = !0, a) {
	let { registerFieldControl: o } = Qy(), s = ri(() => Symbol());
	K(() => {
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
	]), K(() => {
		let e = s.current;
		return () => {
			o(e, void 0);
		};
	}, [o, s]);
}
var Eb = o((() => {
	mi(), oi(), nb();
})), Db, Ob, kb = o((() => {
	Db = /* @__PURE__ */ u(b(), 1), mi(), di(), Il(), nb(), wb(), Eb(), ob(), ub(), vb(), Zy(), Aa(), Bv(), Gc(), fl(), Ob = /*#__PURE__*/ Db.forwardRef(function(e, t) {
		let { render: n, className: r, id: i, name: a, value: o, disabled: s = !1, onValueChange: c, defaultValue: l, autoFocus: u = !1, style: d, ...f } = e, { state: p, name: m, disabled: h, setTouched: g, setDirty: _, validityData: v, setFilled: y, validationMode: b, validation: x } = Qy(), { clearErrors: S, elementRef: C, submitCountRef: w } = rb(), T = h || s, E = m ?? a, D = {
			...p,
			disabled: T
		}, { labelId: O } = sb(), k = gb({ id: i }), A = o !== void 0, j = o == null ? void 0 : String(o), M = G(() => x.inputRef.current?.value);
		Tb(x.inputRef, k, j, M, !T, a), K(() => {
			let e = j ?? x.inputRef.current?.value;
			e !== void 0 && y(e !== "");
		}, [
			j,
			l,
			x.inputRef,
			y
		]), Rv(j, () => {
			j !== void 0 && (S(E), _(j !== (v.initialValue ?? "")), x.change(j));
		});
		let N = Db.useRef(null), P = Cb(T, N), F = Nl();
		return xa("input", e, {
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
						let t = e.currentTarget.value, n = Uc(Kc, e.nativeEvent);
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
			stateAttributesMapping: Xy
		});
	});
})), Ab = o((() => {
	mi(), di(), nb(), Zy(), Fi(), ob(), oi(), El(), ub(), hb(), vb(), $r(), Wi(), oh(), Aa(), ma(), Il(), Mi(), ni(), Sb(), om(), xc(), Xp(), kb();
})), jb = o((() => {
	Ab(), xc(), Ky();
})), Mb, Nb, Pb, Fb = o((() => {
	Mb = /* @__PURE__ */ u(b(), 1), jb(), Nb = bs(), Pb = /*#__PURE__*/ Mb.forwardRef(function(e, t) {
		return /*#__PURE__*/ (0, Nb.jsx)(Ob, {
			ref: t,
			...e
		});
	});
})), Ib = o((() => {
	Fb();
}));
// src/components/ui/input.tsx
function Lb({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ (0, Rb.jsx)(Pb, {
		type: t,
		"data-slot": "input",
		className: _s("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", e),
		...n
	});
}
var Rb, zb = o((() => {
	b(), Ib(), vs(), Rb = bs();
}));
// node_modules/@base-ui/react/use-render/useRender.mjs
function Bb(e) {
	return xa(e.defaultTagName ?? "div", e, e);
}
var Vb = o((() => {
	Aa();
})), Hb = o((() => {
	Vb();
}));
// src/components/ui/badge.tsx
function Ub({ className: e, variant: t = "default", render: n, ...r }) {
	return Bb({
		defaultTagName: "span",
		props: _i({ className: _s(Wb({ variant: t }), e) }, r),
		render: n,
		state: {
			slot: "badge",
			variant: t
		}
	});
}
var Wb, Gb = o((() => {
	Mi(), Hb(), Va(), vs(), Wb = Ba("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
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
}));
// src/services/profile-service.ts
function Kb() {
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
var qb, Jb, Yb = o((() => {
	_(), qb = (e) => ({
		displayName: e,
		nameColor: "#FAFAFA",
		bio: "",
		avatarShape: "circle",
		avatar: null
	}), Jb = {
		get: async () => (await p("/account/profile")).profile,
		save: async (e) => (await p("/account/profile", {
			method: "PATCH",
			body: JSON.stringify(e)
		})).profile,
		password: async (e) => {
			await p("/account/password", {
				method: "POST",
				body: JSON.stringify(e)
			});
		}
	};
}));
// src/stores/profile-store.ts
function Xb(e) {
	let t = nx.get(e);
	return t || (t = {
		profile: qb(e),
		listeners: /* @__PURE__ */ new Set(),
		pending: null,
		revision: 0
	}, nx.set(e, t)), t;
}
function Zb(e, t) {
	let n = Xb(e);
	n.profile = t;
	for (let e of n.listeners) e();
}
async function Qb(e) {
	let t = Xb(e);
	if (!t.pending) {
		let n = t.revision;
		t.pending = Jb.get().then((r) => {
			r && t.revision === n && Zb(e, r);
		}).catch(() => {}).finally(() => {
			t.pending = null;
		});
	}
	return t.pending;
}
function $b(e, t) {
	Xb(e).revision++, Zb(e, t), rx?.postMessage({ username: e });
}
function ex(e, t = !0) {
	let n = Xb(e), r = (0, tx.useSyncExternalStore)((e) => (n.listeners.add(e), () => {
		n.listeners.delete(e);
	}), () => n.profile);
	return (0, tx.useEffect)(() => {
		if (!t) return;
		Qb(e);
		let n = () => {
			document.hidden || Qb(e);
		};
		window.addEventListener("focus", n);
		let r = setInterval(n, 6e4);
		return () => {
			clearInterval(r), window.removeEventListener("focus", n);
		};
	}, [e, t]), r;
}
var tx, nx, rx, ix = o((() => {
	tx = /* @__PURE__ */ u(b(), 1), Yb(), nx = /* @__PURE__ */ new Map();
	try {
		rx = new BroadcastChannel("organizeon-profile"), rx.onmessage = ({ data: e }) => {
			typeof e?.username == "string" && nx.has(e.username) && Qb(e.username);
		};
	} catch {}
})), ax, ox = o((() => {
	ax = {
		owner: "Owner",
		ultra_admin: "Ultra admin",
		super_admin: "Super admin",
		admin: "Admin",
		user: "Usuário",
		guest: "Convidado"
	};
}));
// src/components/ui/skeleton.tsx
function sx({ className: e, ...t }) {
	return /* @__PURE__ */ (0, cx.jsx)("div", {
		"data-slot": "skeleton",
		className: _s("animate-pulse rounded-md bg-muted", e),
		...t
	});
}
var cx, lx = o((() => {
	vs(), cx = bs();
}));
// node_modules/@base-ui/react/menu/positioner/MenuPositionerContext.mjs
function ux(e) {
	let t = dx.useContext(fx);
	if (t === void 0 && !e) throw Error(Pi(33));
	return t;
}
var dx, fx, px = o((() => {
	Fi(), dx = /* @__PURE__ */ u(b(), 1), fx = /*#__PURE__*/ dx.createContext(void 0);
}));
// node_modules/@base-ui/react/menu/root/MenuRootContext.mjs
function mx(e) {
	let t = hx.useContext(gx);
	if (t === void 0 && !e) throw Error(Pi(36));
	return t;
}
var hx, gx, _x = o((() => {
	Fi(), hx = /* @__PURE__ */ u(b(), 1), gx = /*#__PURE__*/ hx.createContext(void 0);
}));
// node_modules/@base-ui/react/context-menu/root/ContextMenuRootContext.mjs
function vx(e = !0) {
	let t = yx.useContext(bx);
	if (t === void 0 && !e) throw Error(Pi(25));
	return t;
}
var yx, bx, xx = o((() => {
	Fi(), yx = /* @__PURE__ */ u(b(), 1), bx = /*#__PURE__*/ yx.createContext(void 0);
}));
// node_modules/@base-ui/utils/useControlled.mjs
function Sx({ controlled: e, default: t, name: n, state: r = "value" }) {
	let { current: i } = Cx.useRef(e !== void 0), [a, o] = Cx.useState(() => t);
	return [i && e !== void 0 ? e : a, Cx.useCallback((e) => {
		i || o(e);
	}, [])];
}
var Cx, wx = o((() => {
	Cx = /* @__PURE__ */ u(b(), 1);
}));
// node_modules/@base-ui/react/menu/filter-root/MenuFilterContext.mjs
function Tx(e = "root") {
	let t = Ox.useContext(kx), n = Ox.useContext(gx);
	return t === null || n === void 0 ? null : (e === "submenu-trigger" ? n.virtualFocus || n.parentVirtualFocus : n.virtualFocus) ? t : null;
}
function Ex() {
	return Ax;
}
function Dx(e, t, n = "root") {
	let r = Tx(n), i = ((n === "submenu-trigger" ? r?.useSubmenuTrigger : r?.useItem) ?? Ex)({
		label: e.label,
		children: e.children,
		render: e.render
	}), a = Qi(t, i.ref);
	return {
		visible: i.visible,
		ref: a,
		props: i.props
	};
}
var Ox, kx, Ax, jx = o((() => {
	Ox = /* @__PURE__ */ u(b(), 1), ia(), _x(), kx = /*#__PURE__*/ Ox.createContext(null), Ax = {
		visible: !0,
		ref: null
	};
}));
// node_modules/@base-ui/react/menu/item/useMenuItemCommonProps.mjs
function Mx(e) {
	e.preventDefault();
}
function Nx(e) {
	let { closeOnClick: t, highlighted: n, id: r, nodeId: i, store: a, typingRef: o, itemRef: s, itemMetadata: c } = e, l = mx(), u = vx(!0), d = c.type === "submenu-trigger", f = d ? l.parentVirtualFocus : l.virtualFocus, p = (d && l.parent.type === "menu" ? l.parent.store : l.store).useState("webkitAriaSelected", n), { events: m } = a.useState("floatingTreeRoot"), h = a.useState("open"), g = u !== void 0, _ = !f && h && n ? 0 : -1;
	return Px.useMemo(() => ({
		id: r,
		role: "menuitem",
		tabIndex: _,
		"aria-selected": p,
		onMouseDown: f ? Mx : void 0,
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
				reason: Zc
			});
		},
		onMouseUp(e) {
			if (u) {
				let t = u.initialCursorPointRef.current;
				if (u.initialCursorPointRef.current = null, g && t && Math.abs(e.clientX - t.x) <= 1 && Math.abs(e.clientY - t.y) <= 1 || g && !ql && e.button === 2) return;
			}
			s.current && a.context.allowMouseUpTriggerRef.current && (!g || e.button === 2) && c.type === "regular-item" && Gi(s.current, e, {
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
var Px, Fx = o((() => {
	Px = /* @__PURE__ */ u(b(), 1), ru(), fl(), xx(), _x(), Ki();
}));
// node_modules/@base-ui/react/menu/item/useMenuItem.mjs
function Ix(e) {
	let { closeOnClick: t, disabled: n, highlighted: r, id: i, store: a, typingRef: o = a.context.typingRef, nativeButton: s, itemMetadata: c, nodeId: l } = e, u = Lx.useRef(null), { getButtonProps: d, buttonRef: f } = qi({
		disabled: n,
		focusableWhenDisabled: !0,
		native: s,
		composite: !0
	}), p = Nx({
		closeOnClick: t,
		highlighted: r,
		id: i,
		nodeId: l,
		store: a,
		typingRef: o,
		itemRef: u,
		itemMetadata: c
	}), m = Lx.useCallback((e) => _i(p, { onMouseEnter(e) {
		c.type === "submenu-trigger" && c.setActive(e.nativeEvent);
	} }, e, d), [
		p,
		d,
		c
	]), h = Qi(u, f);
	return Lx.useMemo(() => ({
		getItemProps: m,
		itemRef: h
	}), [m, h]);
}
var Lx, Rx, zx = o((() => {
	Lx = /* @__PURE__ */ u(b(), 1), ia(), Hc(), Mi(), Fx(), Rx = { type: "regular-item" };
}));
// node_modules/@base-ui/react/internals/composite/list/CompositeListContext.mjs
function Bx() {
	return Vx.useContext(Hx);
}
var Vx, Hx, Ux = o((() => {
	Vx = /* @__PURE__ */ u(b(), 1), Hx = /*#__PURE__*/ Vx.createContext({
		register: () => {},
		unregister: () => {},
		subscribeMapChange: () => () => {},
		nextIndexRef: { current: 0 }
	});
}));
// node_modules/@base-ui/react/internals/composite/list/useCompositeListItem.mjs
function Wx(e = {}) {
	let { guess: t, label: n, metadata: r, textRef: i, index: a } = e, { register: o, unregister: s, subscribeMapChange: c, nextIndexRef: l } = Bx(), u = Gx.useRef(-1), [d, f] = Gx.useState(a == null && t ? () => {
		if (u.current === -1) {
			let e = l.current;
			l.current += 1, u.current = e;
		}
		return u.current;
	} : -1), p = a ?? d, m = Gx.useRef(null), h = Gx.useCallback((e) => {
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
	return K(() => {
		if (a == null) return c((e) => {
			let t = m.current ? e.get(m.current)?.index : null;
			t != null && f(t);
		});
	}, [a, c]), {
		ref: h,
		index: p
	};
}
var Gx, Kx = o((() => {
	Gx = /* @__PURE__ */ u(b(), 1), mi(), Ux();
}));
// node_modules/@base-ui/react/menu/group/MenuGroupContext.mjs
function qx() {
	let e = Jx.useContext(Yx);
	if (e === void 0) throw Error(Pi(31));
	return e;
}
var Jx, Yx, Xx = o((() => {
	Fi(), Jx = /* @__PURE__ */ u(b(), 1), Yx = /*#__PURE__*/ Jx.createContext(void 0);
})), Zx, Qx, $x, eS, tS = o((() => {
	Zx = /* @__PURE__ */ u(b(), 1), jx(), Aa(), Xx(), Qx = bs(), $x = /*#__PURE__*/ Zx.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, ...a } = e, [o, s] = Zx.useState(void 0), c = xa("div", e, {
			ref: t,
			props: {
				role: "group",
				"aria-labelledby": o,
				...a
			}
		});
		return /*#__PURE__*/ (0, Qx.jsx)(Yx.Provider, {
			value: s,
			children: c
		});
	}), eS = /*#__PURE__*/ Zx.forwardRef(function(e, t) {
		let n = Tx()?.Group ?? $x;
		return /*#__PURE__*/ (0, Qx.jsx)(n, {
			...e,
			ref: t
		});
	});
})), nS, rS, iS = o((() => {
	nS = /* @__PURE__ */ u(b(), 1), mi(), Aa(), El(), Xx(), rS = /*#__PURE__*/ nS.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, id: a, ...o } = e, s = Tl(a), c = qx();
		return K(() => (c(s), () => {
			c((e) => e === s ? void 0 : e);
		}), [c, s]), xa("div", e, {
			ref: t,
			props: {
				id: s,
				"aria-hidden": !0,
				...o
			}
		});
	});
})), aS, oS, sS, cS, lS = o((() => {
	aS = /* @__PURE__ */ u(b(), 1), jx(), zx(), _x(), Aa(), El(), Kx(), oS = bs(), sS = /*#__PURE__*/ aS.forwardRef(function(e, t) {
		let { render: n, className: r, id: i, label: a, nativeButton: o = !1, disabled: s = !1, closeOnClick: c = !0, style: l, ...u } = e, { store: d } = mx(), f = Wx({
			guess: !0,
			label: a
		}), p = Tl(i), m = d.useState("disabled"), h = d.useState("isActive", f.index), g = d.useState("floatingNodeId"), _ = d.useState("itemProps"), v = s || m, { getItemProps: y, itemRef: b } = Ix({
			closeOnClick: c,
			disabled: v,
			highlighted: h,
			id: p,
			store: d,
			nativeButton: o,
			nodeId: g,
			itemMetadata: Rx
		});
		return xa("div", e, {
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
	}), cS = /*#__PURE__*/ aS.forwardRef(function(e, t) {
		let n = Dx(e, t);
		return n.visible ? /*#__PURE__*/ (0, oS.jsx)(sS, {
			...e,
			ref: n.ref
		}) : null;
	});
}));
// node_modules/@base-ui/react/toolbar/root/ToolbarRootContext.mjs
function uS(e) {
	let t = dS.useContext(fS);
	if (t === void 0 && !e) throw Error(Pi(69));
	return t;
}
var dS, fS, pS = o((() => {
	Fi(), dS = /* @__PURE__ */ u(b(), 1), fS = /*#__PURE__*/ dS.createContext(void 0);
}));
// node_modules/@base-ui/react/internals/getDisabledMountTransitionStyles.mjs
function mS(e) {
	return e === "starting" ? Hf : pa;
}
var hS = o((() => {
	ma(), qf();
}));
// node_modules/@base-ui/react/menu/submenu-root/MenuSubmenuRootContext.mjs
function gS() {
	return _S.useContext(vS);
}
var _S, vS, yS = o((() => {
	_S = /* @__PURE__ */ u(b(), 1), vS = /*#__PURE__*/ _S.createContext(void 0);
}));
// node_modules/@base-ui/react/internals/resolveRenderedId.mjs
function bS(e, t) {
	let n = wa(e.render);
	if (/*#__PURE__*/ SS.isValidElement(n)) {
		let e = n.props;
		if (Object.hasOwn(e, "id")) return e.id ?? "";
	}
	return e.id ?? t;
}
function xS(e, t, n) {
	let r = bS(e, t), i = r === t ? void 0 : r;
	return [r, SS.useCallback((e) => n?.(e ? i : void 0), [i, n])];
}
var SS, CS = o((() => {
	SS = /* @__PURE__ */ u(b(), 1), Aa();
}));
// node_modules/@base-ui/react/internals/resolvePopupLabel.mjs
function wS(e, t, n) {
	let r = wa(e.render), i = /*#__PURE__*/ TS.isValidElement(r) ? r.props : void 0, a = e["aria-label"] ?? i?.["aria-label"], o = e["aria-labelledby"] ?? i?.["aria-labelledby"];
	return o == null && !a && (o = t ? t.id || void 0 : n || void 0), o;
}
var TS, ES = o((() => {
	TS = /* @__PURE__ */ u(b(), 1), Aa();
}));
// node_modules/@base-ui/react/menu/popup/MenuPopup.mjs
function DS() {
	return jS;
}
var OS, kS, AS, jS, MS, NS = o((() => {
	OS = /* @__PURE__ */ u(b(), 1), y_(), _x(), px(), Aa(), Rc(), om(), Gc(), fl(), pS(), L_(), hS(), yS(), CS(), ES(), jx(), kS = bs(), AS = /*#__PURE__*/ OS.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, finalFocus: a, id: o, initialFocus: s, ...c } = e, { store: l, defaultFloatingId: u, setRenderedFloatingId: d, virtualFocus: f, orientation: p } = mx(), m = gS(), { side: h, align: g } = ux(), _ = uS(!0) != null, v = l.useState("open"), y = l.useState("transitionStatus"), b = l.useState("popupProps"), x = l.useState("mounted"), S = l.useState("instantType"), C = l.useState("activeTriggerElement"), w = l.useState("parent"), T = l.useState("lastOpenChangeReason"), E = l.useState("rootId"), D = l.useState("floatingRootContext"), O = l.useState("floatingTreeRoot"), k = l.useState("closeDelay"), A = l.useState("hoverEnabled"), j = l.useState("disabled"), M = l.useState("openMethod"), N = l.useState("activeTriggerId"), P = l.useState("listElement"), [F, I] = xS(e, u, d), L = wS(e, C, N), R = w.type === "menu" ? m : void 0, ee = w.type === "context-menu", z = s ?? w.type !== "menu";
		s === void 0 && P && w.type !== "menu" && (z = () => l.state.activeIndex === null && P), im({
			open: v,
			ref: l.context.popupRef,
			onComplete() {
				v && l.context.onOpenChangeComplete?.(!0);
			}
		}), OS.useEffect(() => {
			function e(e) {
				l.setOpen(!1, Uc(e.reason, e.domEvent));
			}
			return O.events.on("close", e), () => {
				O.events.off("close", e);
			};
		}, [O.events, l]), Fh(D, {
			enabled: A && !j && !ee && w.type !== "menubar",
			closeDelay: k
		});
		let B = l.useStateSetter("popupElement"), { parentVirtualFocusRef: V, handleFocus: te } = (OS.useContext(kx)?.useParentHandoff ?? DS)(l, w, v, f), ne = xa("div", e, {
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
				B,
				I
			],
			stateAttributesMapping: Lc,
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
						R?.onPopupKeyDown?.(e), _ && P_.has(e.key) && e.stopPropagation();
					},
					onFocus: te
				},
				mS(y),
				c,
				{ "data-rootownerid": E }
			]
		}), H = w.type === void 0 || ee;
		(C || w.type === "menubar" && T !== "outside-press") && (H = !0);
		let re = R?.getReturnElement ?? V;
		return /*#__PURE__*/ (0, kS.jsx)(Tp, {
			context: D,
			openInteractionType: M,
			modal: ee,
			disabled: !x,
			returnFocus: a ?? re ?? H,
			explicitReturnFocus: a === void 0 && re ? !1 : void 0,
			initialFocus: z,
			restoreFocus: !0,
			getInsideElements: w.type === void 0 ? () => [l.context.beforeTriggerFocusGuardRef.current] : void 0,
			externalTree: w.type === "menubar" ? void 0 : O,
			previousFocusableElement: C,
			nextFocusableElement: w.type === void 0 ? l.context.triggerFocusTargetRef : void 0,
			beforeContentFocusGuardRef: l.context.beforeContentFocusGuardRef,
			children: ne
		});
	}), jS = {
		parentVirtualFocusRef: void 0,
		handleFocus: void 0
	}, MS = /*#__PURE__*/ OS.forwardRef(function(e, t) {
		let n = Tx()?.Popup ?? AS;
		return /*#__PURE__*/ (0, kS.jsx)(n, {
			...e,
			ref: t
		});
	});
}));
// node_modules/@base-ui/react/menu/portal/MenuPortalContext.mjs
function PS() {
	let e = FS.useContext(IS);
	if (e === void 0) throw Error(Pi(32));
	return e;
}
var FS, IS, LS = o((() => {
	Fi(), FS = /* @__PURE__ */ u(b(), 1), IS = /*#__PURE__*/ FS.createContext(void 0);
})), RS, zS, BS, VS = o((() => {
	RS = /* @__PURE__ */ u(b(), 1), y_(), _x(), LS(), zS = bs(), BS = /*#__PURE__*/ RS.forwardRef(function(e, t) {
		let { keepMounted: n = !1, ...r } = e, { store: i, parent: a } = mx();
		if (!(i.useState("mounted") || n)) return null;
		let o = a.type === "menu" || a.type === "menubar" ? "group" : void 0;
		return /*#__PURE__*/ (0, zS.jsx)(IS.Provider, {
			value: n,
			children: /*#__PURE__*/ (0, zS.jsx)(tp, {
				ref: t,
				...r,
				portalOwnerRole: o
			})
		});
	});
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useFloating.mjs
function HS(e) {
	let { nodeId: t, externalTree: n, rootContext: r } = e, i = r.useState("referenceElement"), a = r.useState("floatingElement"), o = r.useState("domReferenceElement"), s = r.useState("open"), c = r.useState("floatingId"), [l, u] = US.useState(null), d = US.useRef(null), f = hp(n), p = US.useMemo(() => ({
		reference: i,
		floating: a,
		domReference: o
	}), [
		i,
		a,
		o
	]), m = c_({
		...e,
		elements: {
			...p,
			...l && { reference: l }
		}
	}), h = US.useCallback((e) => {
		let t = Nr(e) ? {
			getBoundingClientRect: () => e.getBoundingClientRect(),
			getClientRects: () => e.getClientRects(),
			contextElement: e
		} : e;
		u(t), m.refs.setReference(t);
	}, [m.refs]), g = US.useMemo(() => ({
		...m.refs,
		setPositionReference: h,
		domReference: d
	}), [m.refs, h]), _ = US.useMemo(() => ({
		...m.elements,
		domReference: o
	}), [m.elements, o]), v = US.useMemo(() => ({
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
	return K(() => {
		o && (d.current = o);
	}, [o]), K(() => {
		r.context.dataRef.current.floatingContext = v;
		let e = f?.nodesRef.current.find((e) => e.id === t);
		e && (e.context = v);
	}), US.useMemo(() => ({
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
var US, WS = o((() => {
	US = /* @__PURE__ */ u(b(), 1), mi(), v_(), $r(), gp();
}));
// node_modules/@base-ui/react/internals/direction-context/DirectionContext.mjs
function GS() {
	return KS.useContext(qS)?.direction ?? "ltr";
}
var KS, qS, JS = o((() => {
	KS = /* @__PURE__ */ u(b(), 1), qS = /*#__PURE__*/ KS.createContext(void 0);
})), YS, XS, ZS = o((() => {
	Vd(), YS = (e) => ({
		name: "arrow",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = hd(e, t) || {};
			if (l == null) return {};
			let d = kd(u), f = {
				x: n,
				y: r
			}, p = xd(i), m = yd(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = s.floating[y] || a.floating[m], C = b / 2 - x / 2, w = S / 2 - h[m] / 2 - 1, T = Math.min(d[_], w), E = Math.min(d[v], w), D = T, O = S - h[m] - E, k = S / 2 - h[m] / 2 + C, A = md(D, k, O), j = !c.arrow && _d(i) != null && k !== A && a.reference[m] / 2 - (k < D ? T : E) - h[m] / 2 < 0, M = j ? k < D ? k - D : k - O : 0;
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
	}), XS = (e, t) => {
		let { name: n, fn: r } = YS(e);
		return {
			name: n,
			fn: r,
			options: [e, t]
		};
	};
})), QS, $S = o((() => {
	QS = {
		name: "hide",
		async fn(e) {
			let { width: t, height: n, x: r, y: i } = e.rects.reference, a = t === 0 && n === 0 && r === 0 && i === 0, o = await e.platform.detectOverflow(e, { elementContext: "reference" });
			return { data: { referenceHidden: o.top - n >= 0 || o.right - t >= 0 || o.bottom - n >= 0 || o.left - t >= 0 || a } };
		}
	};
})), eC, tC = o((() => {
	eC = {
		sideX: "left",
		sideY: "top"
	};
})), nC, rC, iC, aC, oC, sC = o((() => {
	nC = "--available-width", rC = "--available-height", iC = "--anchor-width", aC = "--anchor-height", oC = "--transform-origin";
}));
// node_modules/@base-ui/react/internals/useAnchorPositioning.mjs
function cC(e, t, n) {
	let r = e === "inline-start" || e === "inline-end";
	return {
		top: "top",
		right: r ? n ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: r ? n ? "inline-end" : "inline-start" : "left"
	}[t];
}
function lC(e, t, n) {
	let { rects: r, placement: i } = e;
	return {
		side: cC(t, gd(i), n),
		align: _d(i) || "center",
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
function uC(e) {
	return dC(e, HS);
}
function dC(e, t) {
	let { anchor: n, positionMethod: r = "absolute", side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, collisionBoundary: c, collisionPadding: l = 5, sticky: u = !1, arrowPadding: d = 5, disableAnchorTracking: f = !1, inline: p, keepMounted: m = !1, floatingRootContext: h, mounted: g, collisionAvoidance: _, shift: v, nodeId: y, adaptiveOrigin: b, lazyFlip: x = !1, externalTree: S } = e, C = _.side || "flip", w = _.align || "flip", T = _.fallbackAxisSide || "end", E = v?.crossAxis ?? !1, D = v?.rootBoundary, O = typeof n == "function" ? n : void 0, k = G(O), A = O ? k : n, j = Zu(n), M = Zu(g), N = GS() === "rtl", [P, F] = pC.useState(null);
	!g && P !== null && F(null);
	let I = x === "placement", L = P ? gd(P) : null, R = P && I ? _d(P) || "center" : null, ee = L || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": N ? "left" : "right",
		"inline-start": N ? "right" : "left"
	}[i], z = R || o, B = z === "center" ? ee : `${ee}-${z}`, V = l;
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
	let te = +(i === "bottom"), ne = +(i === "top"), H = +(i === "right"), re = +(i === "left"), U = {
		boundary: c === "clipping-ancestors" ? "clippingAncestors" : c,
		padding: V
	}, ie = pC.useRef(null), W = Zu(a), ae = Zu(s), oe = typeof a == "function" ? 0 : a, se = typeof s == "function" ? 0 : s, ce = [];
	p && ce.push(p), ce.push(p_((e) => {
		let t = lC(e, i, N), n = typeof W.current == "function" ? W.current(t) : W.current, r = typeof ae.current == "function" ? ae.current(t) : ae.current;
		return {
			mainAxis: n,
			crossAxis: r,
			alignmentAxis: r
		};
	}, [
		oe,
		se,
		N,
		i
	]));
	let le = w === "none" && C !== "shift", ue = !le && (u || E || C === "shift"), de = C === "none" ? null : g_({
		...U,
		padding: {
			top: V.top + 1 + te,
			right: V.right + 1 + re,
			bottom: V.bottom + 1 + ne,
			left: V.left + 1 + H
		},
		mainAxis: !E && C === "flip",
		crossAxis: w === "flip" && "alignment",
		fallbackAxisSideDirection: T
	}), fe = le ? null : m_({
		...U,
		rootBoundary: D,
		mainAxis: w !== "none",
		crossAxis: ue,
		limiter: u || E ? void 0 : h_((e) => {
			if (!ie.current) return {};
			let { width: t, height: n } = ie.current.getBoundingClientRect(), r = bd(gd(e.placement)), i = r === "y" ? t : n, a = r === "y" ? V.left + V.right : V.top + V.bottom;
			return { offset: i / 2 + a / 2 };
		})
	}, [
		U,
		u,
		E,
		D,
		V,
		w
	]);
	C === "shift" || w === "shift" || z === "center" ? ce.push(fe, de) : ce.push(de, fe), ce.push(__({
		...U,
		apply({ elements: { floating: e }, availableWidth: t, availableHeight: n, rects: r }) {
			if (!M.current) return;
			let i = e.style;
			i.setProperty(mC, `${t}px`), i.setProperty(hC, `${n}px`);
			let a = Ar(e).devicePixelRatio || 1, { x: o, y: s, width: c, height: l } = r.reference, u = (Math.round((o + c) * a) - Math.round(o * a)) / a, d = (Math.round((s + l) * a) - Math.round(s * a)) / a;
			i.setProperty(iC, `${u}px`), i.setProperty(aC, `${d}px`);
		}
	}), XS((e) => ({
		element: ie.current || Ui(e.elements.floating).createElement("div"),
		padding: ie.current ? d : 0
	}), [d]), {
		name: "transformOrigin",
		fn(e) {
			let { elements: { floating: t }, middlewareData: n, placement: r, platform: o, rects: s, y: c } = e, l = gd(r), u = _d(r), d = bd(l) === "y", f = ie.current, p = typeof a == "function" ? a(lC(e, i, N)) : a, m;
			m = !f && u && Math.abs(d ? n.shift?.x || 0 : n.shift?.y || 0) <= 1 ? u === "start" === (d && o.isRTL?.(t) === !0) ? "100%" : "0%" : `${(d ? n.arrow?.x || 0 : n.arrow?.y || 0) + (d ? f?.clientWidth || 0 : f?.clientHeight || 0) / 2}px`;
			let h = l === "top" || l === "left" ? `calc(100% + ${p}px)` : `${-p}px`;
			return ue && d && Math.abs(n.shift?.y || 0) > p && (h = `${s.reference.y + s.reference.height / 2 - c}px`), t.style.setProperty(oC, d ? `${m} ${h}` : `${h} ${m}`), {};
		}
	}, QS, b), K(() => {
		!g && h && h.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null,
			positionReference: null
		});
	}, [g, h]);
	let pe = pC.useMemo(() => ({
		ancestorScroll: !f,
		elementResize: !f && typeof ResizeObserver < "u",
		layoutShift: !f && typeof IntersectionObserver < "u"
	}), [f]), { refs: me, elements: he, x: ge, y: _e, middlewareData: ve, update: ye, placement: be, context: xe, isPositioned: Se, floatingStyles: Ce } = t({
		rootContext: h,
		open: m ? g : void 0,
		placement: B,
		middleware: ce,
		strategy: r,
		whileElementsMounted: m ? void 0 : (...e) => Kg(...e, pe),
		nodeId: y,
		externalTree: S
	}), { sideX: we, sideY: Te } = ve.adaptiveOrigin || eC, Ee = Se ? r : "fixed", De = pC.useMemo(() => {
		let e;
		return e = Se ? b ? {
			position: Ee,
			[we]: ge,
			[Te]: _e
		} : {
			...Ce,
			position: Ee
		} : {
			position: Ee,
			top: 0,
			left: 0
		}, e[mC] = "100vw", e[hC] = "100vh", Se || (e.opacity = 0), e;
	}, [
		b,
		Ee,
		we,
		ge,
		Te,
		_e,
		Ce,
		Se
	]), Oe = pC.useRef(null);
	K(() => {
		if (!g) return;
		let e = j.current, t = typeof e == "function" ? e() : e, n = (fC(t) ? t.current : t) || null;
		n !== Oe.current && (me.setPositionReference(n), Oe.current = n);
	}, [
		g,
		me,
		A,
		j
	]), pC.useEffect(() => {
		if (!g) return;
		let e = j.current;
		typeof e != "function" && fC(e) && e.current !== Oe.current && (me.setPositionReference(e.current), Oe.current = e.current);
	}, [
		g,
		me,
		A,
		j
	]), pC.useEffect(() => {
		if (m && g && he.reference && he.floating) return Kg(he.reference, he.floating, ye, pe);
	}, [
		m,
		g,
		he,
		ye,
		pe
	]);
	let ke = gd(be), Ae = cC(i, ke, N), je = _d(be) || "center", Me = !!ve.hide?.referenceHidden;
	K(() => {
		x && g && Se && (ke !== ee || I && je !== z) && F(be);
	}, [
		x,
		I,
		g,
		Se,
		be,
		ke,
		je,
		ee,
		z
	]);
	let Ne = pC.useMemo(() => ({
		position: "absolute",
		top: ve.arrow?.y,
		left: ve.arrow?.x
	}), [ve.arrow]), Pe = ve.arrow?.centerOffset !== 0;
	return pC.useMemo(() => ({
		positionerStyles: De,
		arrowStyles: Ne,
		arrowRef: ie,
		arrowUncentered: Pe,
		side: Ae,
		align: je,
		physicalSide: ke,
		anchorHidden: Me,
		refs: me,
		context: xe,
		isPositioned: Se,
		update: ye
	}), [
		De,
		Ne,
		ie,
		Pe,
		Ae,
		je,
		ke,
		Me,
		me,
		xe,
		Se,
		ye
	]);
}
function fC(e) {
	return e != null && "current" in e;
}
var pC, mC, hC, gC = o((() => {
	pC = /* @__PURE__ */ u(b(), 1), Vd(), Wi(), mi(), $u(), di(), y_(), WS(), JS(), ZS(), $S(), tC(), sC(), mC = nC, hC = rC;
}));
// node_modules/@base-ui/react/internals/composite/list/CompositeList.mjs
function _C(e) {
	let { children: t, elementsRef: n, labelsRef: r, onMapChange: i } = e, a = G(i), [, o] = wC.useState(0), s = ri(yC).current, c = ri(vC).current, l = wC.useRef(0), u = wC.useRef(!0), d = wC.useRef(null), f = wC.useRef(null), p = G(() => {
		u.current || (u.current = !0, o((e) => e + 1));
	}), m = G((e, t) => {
		c.set(e, t), p();
	}), h = G((e) => {
		c.delete(e), p();
	}), g = G((e) => {
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
			if (!SC(n)) return;
			let r = null;
			for (let n of e) if (n.isConnected) {
				if (r && CC(r, n) > 0) {
					t.disconnect(), p();
					return;
				}
				r = n;
			}
		});
		f.current = t;
		let n = /* @__PURE__ */ new Set();
		for (let t = 1; t < e.length; t += 1) {
			let r = xC(e[t - 1], e[t]);
			r && n.add(r);
		}
		n.forEach((e) => t.observe(e, { childList: !0 }));
	}
	let v = G(() => {
		let [e, t] = bC(c), n = g(e), r = d.current, i = !r || r.length !== e.length || e.some((e, t) => {
			let n = r[t];
			return e.index !== n.index || e.element !== n.element || e.registration.index !== n.registration.index || e.registration.metadata !== n.registration.metadata;
		});
		_(t), d.current = e, u.current = !1, i && (s.forEach((e) => e(n)), a(n));
	});
	K(() => (!u.current && d.current && g(d.current), () => {
		n.current = [], r && (r.current = []);
	}), [
		n,
		r,
		g
	]), K(() => {
		u.current && v();
	}), K(() => () => {
		f.current?.disconnect(), u.current = !0;
	}, []);
	let y = G((e) => (s.add(e), () => {
		s.delete(e);
	})), b = wC.useMemo(() => ({
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
	return /*#__PURE__*/ (0, TC.jsx)(Hx.Provider, {
		value: b,
		children: t
	});
}
function vC() {
	return /* @__PURE__ */ new Map();
}
function yC() {
	return /* @__PURE__ */ new Set();
}
function bC(e) {
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
	return r.sort((e, t) => CC(e.element, t.element)), r.forEach((e) => {
		for (; t.has(i);) i += 1;
		e.index = i, n.push(e), i += 1;
	}), t.size > 0 && n.sort((e, t) => e.index - t.index), [n, r.map((e) => e.element)];
}
function xC(e, t) {
	let n = e.parentElement;
	for (; n && !n.contains(t);) n = n.parentElement;
	return n;
}
function SC(e) {
	for (let t of e) for (let e = 0; e < t.removedNodes.length; e += 1) if (t.removedNodes[e].isConnected) return !0;
	return !1;
}
function CC(e, t) {
	return e.nextElementSibling === t ? -1 : t.nextElementSibling === e ? 1 : e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
var wC, TC, EC = o((() => {
	wC = /* @__PURE__ */ u(b(), 1), oi(), di(), mi(), Ux(), TC = bs();
}));
// node_modules/@base-ui/react/internals/useTriggerSwitchTransition.mjs
function DC(e) {
	let { store: t, domReference: n, positionerElement: r, open: i } = e, a = OC.useRef(null), o = OC.useRef(null), s = em(r);
	K(() => {
		i || (o.current?.abort(), o.current = null, t.state.instantType === "trigger-change" && t.set("instantType", void 0));
	}, [i, t]), K(() => {
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
var OC, kC = o((() => {
	OC = /* @__PURE__ */ u(b(), 1), mi(), rm();
}));
// node_modules/@base-ui/react/utils/usePositioner.mjs
function AC(e, t, { styles: n, transitionStatus: r, props: i, refs: a, hidden: o, inert: s = !1 }) {
	let c = { ...n };
	return s && (c.pointerEvents = "none"), xa("div", e, {
		state: t,
		ref: a,
		props: [
			{
				role: "presentation",
				hidden: o,
				style: c
			},
			mS(r),
			i
		],
		stateAttributesMapping: Ic
	});
}
var jC = o((() => {
	Rc(), Aa(), hS();
}));
// node_modules/@base-ui/react/utils/useAnchoredPopupScrollLock.mjs
function MC(e, t, n, r) {
	let [i, a] = NC.useState(!1);
	K(() => {
		if (!e || !t || n == null) {
			a(!1);
			return;
		}
		let r = Ui(n).documentElement.clientWidth, i = n.offsetWidth;
		a(r > 0 && i > 0 && i >= r - PC);
	}, [
		e,
		t,
		n
	]), uv(e && (!t || i), r);
}
var NC, PC, FC = o((() => {
	NC = /* @__PURE__ */ u(b(), 1), Wi(), gv(), mi(), PC = 20;
})), IC, LC, RC, zC = o((() => {
	IC = /* @__PURE__ */ u(b(), 1), Y_(), Il(), y_(), px(), _x(), gC(), EC(), $_(), LS(), qf(), xx(), Gc(), fl(), kC(), jC(), FC(), LC = bs(), RC = /*#__PURE__*/ IC.forwardRef(function(e, t) {
		let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o, align: s, sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = Wf, style: g, ..._ } = e, { store: v, virtualFocus: y, syncHighlightedItem: b } = mx(), x = PS(), S = vx(!0), C = v.useState("parent"), w = v.useState("floatingRootContext"), T = v.useState("floatingTreeRoot"), E = v.useState("mounted"), D = v.useState("open"), O = v.useState("modal"), k = v.useState("openMethod"), A = v.useState("activeTriggerElement"), j = v.useState("transitionStatus"), M = v.useState("positionerElement"), N = v.useState("instantType"), P = v.useState("adaptiveOrigin"), F = v.useState("lastOpenChangeReason"), I = v.useState("floatingNodeId"), L = v.useState("floatingParentNodeId"), R = w.useState("domReferenceElement"), ee = n, z = c, B = l, V = s, te = h;
		C.type === "context-menu" && (ee = n ?? C.context?.anchor, V ??= "start", !o && V !== "center" && (B = e.alignOffset ?? 2, z = e.sideOffset ?? -5));
		let ne = o, H = V;
		C.type === "menu" ? (ne ??= "inline-end", H ??= "start", te = e.collisionAvoidance ?? Gf) : C.type === "menubar" && (ne ??= C.context.orientation === "vertical" ? "inline-end" : "bottom", H ??= "start");
		let re = C.type === "context-menu", U = uC({
			anchor: ee,
			floatingRootContext: w,
			positionMethod: S ? "fixed" : r,
			mounted: E,
			side: ne,
			sideOffset: z,
			align: H,
			alignOffset: B,
			arrowPadding: re ? 0 : f,
			collisionBoundary: u,
			collisionPadding: d,
			sticky: p,
			nodeId: I,
			keepMounted: x,
			disableAnchorTracking: m,
			collisionAvoidance: te,
			shift: re ? {
				crossAxis: !("side" in te && te.side === "flip"),
				rootBoundary: "layoutViewport"
			} : void 0,
			externalTree: T,
			adaptiveOrigin: P,
			lazyFlip: y ? "placement" : !1
		});
		IC.useEffect(() => {
			function e(e) {
				e.open && (e.parentNodeId === I && v.set("hoverEnabled", !1), e.nodeId !== I && e.parentNodeId === v.select("floatingParentNodeId") && v.setOpen(!1, Uc(al)));
			}
			return T.events.on("menuopenchange", e), () => {
				T.events.off("menuopenchange", e);
			};
		}, [
			v,
			T.events,
			I
		]), IC.useEffect(() => {
			if (v.select("floatingParentNodeId") == null) return;
			function e(e) {
				if (e.open || e.nodeId !== v.select("floatingParentNodeId")) return;
				let t = e.reason ?? "sibling-open";
				v.setOpen(!1, Uc(t));
			}
			return T.events.on("menuopenchange", e), () => {
				T.events.off("menuopenchange", e);
			};
		}, [T.events, v]);
		let ie = Nl();
		IC.useEffect(() => {
			D || ie.clear();
		}, [D, ie]), IC.useEffect(() => {
			function e(e) {
				if (D && e.nodeId === v.select("floatingParentNodeId")) {
					if (e.target && A && A !== e.target) {
						let e = v.select("closeDelay");
						e > 0 ? ie.isStarted() || ie.start(e, () => {
							v.setOpen(!1, Uc(al));
						}) : v.setOpen(!1, Uc(al));
					} else ie.clear();
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
			ie
		]), IC.useEffect(() => {
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
		]), DC({
			store: v,
			domReference: R,
			positionerElement: M,
			open: D
		});
		let W = {
			open: D,
			side: U.side,
			align: U.align,
			anchorHidden: U.anchorHidden,
			nested: C.type === "menu",
			instant: N
		}, ae = C.type === "menubar" && C.context.modal;
		MC(D && (ae || O && F !== "trigger-hover"), k === "touch", M, A);
		let oe = AC(e, W, {
			styles: U.positionerStyles,
			transitionStatus: j,
			props: _,
			refs: [t, v.useStateSetter("positionerElement")],
			hidden: !E,
			inert: !D
		}), se = E && C.type !== "menu" && (C.type !== "menubar" && O && F !== "trigger-hover" || C.type === "menubar" && C.context.modal), ce = null;
		return C.type === "menubar" ? ce = C.context.contentElement : C.type === void 0 && (ce = A), /*#__PURE__*/ (0, LC.jsxs)(fx.Provider, {
			value: U,
			children: [se && /*#__PURE__*/ (0, LC.jsx)(Q_, {
				ref: C.type === "context-menu" || C.type === "nested-context-menu" ? C.context.internalBackdropRef : null,
				inert: J_(!D),
				cutout: ce
			}), /*#__PURE__*/ (0, LC.jsx)(cp, {
				id: I,
				children: /*#__PURE__*/ (0, LC.jsx)(_C, {
					elementsRef: v.context.itemDomElements,
					labelsRef: v.context.itemLabels,
					onMapChange: b,
					children: oe
				})
			})]
		});
	});
}));
// node_modules/@base-ui/react/menubar/MenubarContext.mjs
function BC(e) {
	let t = VC.useContext(HC);
	if (t === null && !e) throw Error(Pi(5));
	return t;
}
var VC, HC, UC = o((() => {
	Fi(), VC = /* @__PURE__ */ u(b(), 1), HC = /*#__PURE__*/ VC.createContext(null);
}));
// node_modules/@base-ui/react/utils/getHighlightReason.mjs
function WC(e) {
	return e == null ? Kc : e.type.startsWith("key") ? nl : e.type.startsWith("mouse") || e.type.startsWith("pointer") ? rl : Kc;
}
var GC = o((() => {
	fl();
}));
// node_modules/@base-ui/react/menu/store/MenuStore.mjs
function KC(e) {
	return {
		positionerRef: /*#__PURE__*/ JC.createRef(),
		popupRef: /*#__PURE__*/ JC.createRef(),
		typingRef: { current: !1 },
		itemDomElements: { current: [] },
		itemLabels: { current: [] },
		highlightReason: "none",
		highlightEvent: void 0,
		reportedItem: void 0,
		allowMouseUpTriggerRef: { current: !1 },
		virtualFocusRef: void 0,
		triggerFocusTargetRef: /*#__PURE__*/ JC.createRef(),
		beforeTriggerFocusGuardRef: /*#__PURE__*/ JC.createRef(),
		beforeContentFocusGuardRef: /*#__PURE__*/ JC.createRef(),
		onOpenChangeComplete: void 0,
		triggerElements: e
	};
}
function qC(e, t, n = !1, r) {
	return {
		...uh(e, t, n),
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
		filterTriggerProps: pa,
		inputProps: pa,
		inputFocused: !1,
		highlightedItem: void 0,
		hoverEnabled: !0,
		instantType: void 0,
		openChangeReason: null,
		floatingTreeRoot: new ap(),
		floatingNodeId: void 0,
		floatingParentNodeId: null,
		itemProps: pa,
		keyboardEventRelay: void 0,
		closeDelay: 0,
		adaptiveOrigin: void 0,
		...r
	};
}
var JC, YC, XC, ZC = o((() => {
	JC = /* @__PURE__ */ u(b(), 1), ah(), ma(), ru(), op(), Sh(), YC = {
		...gh,
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
			let n = gh.triggerPopupId(e, t);
			return n ? e.listElement?.id || n : void 0;
		},
		filterTriggerProps: (e) => e.filterTriggerProps,
		inputProps: (e) => e.inputProps,
		webkitAriaSelected: (e, t) => Xl && e.inputFocused && t ? !0 : void 0,
		highlightedItemId: (e) => e.highlightedItem?.id || void 0,
		isActive: (e, t) => e.activeIndex === t,
		hoverEnabled: (e) => e.hoverEnabled,
		instantType: (e) => e.instantType === "trigger-change" && !gh.open(e) ? void 0 : e.instantType,
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
	}, XC = class extends nh {
		constructor(e, t, n = !1) {
			let r = new Dm(), i = qC(r, t, n, e);
			super(i, KC(r), YC), this.observe("parent", (e) => {
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
})), QC, $C, ew = o((() => {
	QC = /* @__PURE__ */ u(b(), 1), $C = /*#__PURE__*/ QC.createContext(null);
}));
// node_modules/@base-ui/react/menu/utils/isKeyboardOpen.mjs
function tw(e, t) {
	return (e === "trigger-press" || e === "item-press") && t?.detail === 0;
}
function nw(e, t) {
	return e === "list-navigation" || tw(e, t);
}
var rw = o((() => {
	fl();
}));
// node_modules/@base-ui/react/menu/root/MenuRoot.mjs
function iw(e) {
	let t = aw.useContext($C);
	if (t === null) return /*#__PURE__*/ (0, ow.jsx)(sw, { ...e });
	let n = t.Root;
	return /*#__PURE__*/ (0, ow.jsx)($C.Provider, {
		value: null,
		children: /*#__PURE__*/ (0, ow.jsx)(n, {
			...t.options,
			...e
		})
	});
}
var aw, ow, sw, cw = o((() => {
	aw = /* @__PURE__ */ u(b(), 1), Il(), di(), mi(), oi(), ma(), Um(), y_(), _x(), UC(), qf(), JS(), Wv(), Gc(), fl(), GC(), xx(), Mi(), rm(), ZC(), Sh(), El(), ew(), rw(), ow = bs(), sw = Lm(function(e) {
		let { children: t, open: n, onOpenChange: r, onOpenChangeComplete: i, onItemHighlighted: a, defaultOpen: o = !1, disabled: s = !1, modal: c, loopFocus: l = !0, orientation: u = "vertical", actionsRef: d, closeParentOnEsc: f = !1, handle: p, triggerId: m, defaultTriggerId: h = null, highlightItemOnHover: g = !0, isSubmenu: _ = !1, virtualFocus: v = !1, virtualFocusRef: y, allowEscape: b = !0, resetOnPointerLeave: x = !0 } = e, S = vx(!0), C = mx(!0), w = BC(!0), T = C?.store, E = C?.virtualFocus ?? !1, D = aw.useMemo(() => _ && T ? {
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
		]), O = Tl(), k = Tl(), [A, j] = aw.useState(void 0), M = (A ?? k) || void 0, N = mp(), P = D.type === "menu" ? D.store : void 0, F = (n ?? o) && P?.state.transitionStatus === "starting", I = ri(() => F ? P?.state.instantType : void 0).current, L = ri(() => {
			let e = new XC({
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
		let R = L.useState("floatingTreeRoot"), ee = sp(R), z = L.useState("open"), B = L.useState("activeTriggerElement"), V = L.useState("positionerElement"), te = L.useState("hoverEnabled"), ne = L.useState("disabled"), H = L.useState("lastOpenChangeReason"), re = L.useState("parent"), U = L.useState("activeIndex"), ie = L.useState("keyboardOpen"), W = L.useState("payload"), ae = L.useState("floatingParentNodeId"), oe = aw.useRef(null), se = aw.useRef(re.type !== "context-menu"), ce = Nl(), le = aw.useRef(!0), ue = Nl(), de = ae != null, { openMethod: fe, triggerProps: pe } = Hv(z);
		L.useSyncedValues({
			disabled: s,
			highlightItemOnHover: g,
			modal: re.type === void 0 ? c : void 0,
			openMethod: fe,
			rootId: O
		}), ym(L);
		let { forceUnmount: me, transitionStatus: he } = bm(z, L, () => {
			L.set("allowMouseEnter", !1);
		}, F), ge = em(L.context.popupRef);
		aw.useEffect(() => {
			if (I === void 0) return;
			let e = () => {
				L.state.instantType === I && L.set("instantType", void 0);
			};
			if (!z) {
				e();
				return;
			}
			if (he !== void 0) return;
			if (L.context.popupRef.current == null) {
				e();
				return;
			}
			let t = new AbortController();
			return ge(e, t.signal), () => {
				t.abort();
			};
		}, [
			I,
			z,
			he,
			ge,
			L
		]), K(() => {
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
			B,
			L
		]), aw.useEffect(() => {
			z || (oe.current = null), re.type === "context-menu" && (z ? ce.start(500, () => {
				se.current = !0;
			}) : (ce.clear(), se.current = !1));
		}, [
			ce,
			z,
			re.type
		]), K(() => {
			!z && !te && L.set("hoverEnabled", !0);
		}, [
			z,
			te,
			L
		]);
		let _e = G((e, t) => {
			let n = t.reason;
			if (!e && !L.select("open") || z === e && t.trigger === B && H === n) return;
			let i = gm(t);
			if (!e && t.trigger == null && (t.trigger = B ?? void 0), r?.(e, t), t.isCanceled) return;
			L.state.floatingRootContext.dispatchOpenChange(e, t);
			let a = t.event;
			if (e === !1 && n !== "item-press" && a?.type === "click" && a.pointerType === "touch" && !le.current) return;
			e && n === "trigger-focus" ? (le.current = !1, ue.start(300, () => {
				le.current = !0;
			})) : (le.current = !0, ue.clear());
			let o = !e && (n === "escape-key" || n == null);
			oe.current = t.event;
			let s = hm(L.state, e, t.trigger, i());
			s.openChangeReason = n, s.keyboardOpen = e && nw(n, a), s.instantType = re.type === "menubar" && (n === "trigger-focus" || n === "focus-out" || n === "trigger-hover" || n === "list-navigation" || n === "sibling-open") ? "group" : tw(n, a) ? "click" : o ? "dismiss" : void 0, L.update(s);
		}), ve = Kp({
			popupStore: L,
			floatingRootContext: L.state.floatingRootContext,
			floatingId: M,
			nested: N != null,
			onOpenChange: _e
		}), ye = ve.context.events;
		K(() => {
			let e = ({ open: e, eventDetails: t }) => _e(e, t);
			return ye.on("setOpen", e), () => {
				ye?.off("setOpen", e);
			};
		}, [ye, _e]), K(() => L.subscribeToParentMenu(), [L]);
		let be = aw.useCallback(() => {
			L.setOpen(!1, Uc(ll));
		}, [L]);
		aw.useImperativeHandle(d, () => ({
			unmount: me,
			close: be
		}), [me, be]);
		let xe;
		re.type === "context-menu" && (xe = re.context), aw.useImperativeHandle(xe?.positionerRef, () => V, [V]), aw.useImperativeHandle(xe?.actionsRef, () => ({ setOpen: _e }), [_e]);
		let Se = Vp(ve, {
			enabled: !ne,
			bubbles: { escapeKey: f && re.type === "menu" },
			outsidePress() {
				return re.type !== "context-menu" || oe.current?.type === "contextmenu" || se.current;
			},
			externalTree: de ? R : void 0
		}), Ce = GS(), we = Yh(ve, {
			enabled: !ne,
			listRef: L.context.itemDomElements,
			activeIndex: U,
			virtual: v,
			nested: re.type === "menubar" || !v && re.type !== void 0,
			parentOrientation: re.type === "menubar" ? re.context.orientation : void 0,
			loopFocus: l,
			focusItemOnOpen: v ? ie : void 0,
			allowEscape: v && l && b,
			orientation: u,
			triggerOrientation: v ? "vertical" : u,
			rtl: Ce === "rtl",
			disabledIndices: fa,
			onNavigate(e, t) {
				L.setActiveIndex(e, WC(t), t?.nativeEvent);
			},
			openOnArrowKeyDown: re.type !== "context-menu" && !(v && _),
			externalTree: !v && de ? R : void 0,
			nestedReturnFocusRef: P?.context.virtualFocusRef,
			focusItemOnHover: g,
			resetOnPointerLeave: x
		}), Te = aw.useCallback((e) => {
			L.context.typingRef.current = e;
		}, [L]), Ee = Qh(ve, {
			enabled: !ne && !v,
			listRef: L.context.itemLabels,
			elementsRef: L.context.itemDomElements,
			activeIndex: U,
			resetMs: 500,
			onMatch: (e, t) => {
				z && e !== U && L.setActiveIndex(e, nl, t.nativeEvent);
			},
			onTyping: Te
		}), De = G(a), Oe = aw.useRef(-1), ke = G(() => {
			let e = L.state.activeIndex, t = e === null ? void 0 : L.context.itemDomElements.current[e] ?? void 0;
			if (t?.isConnected === !1) return;
			let n = t === void 0 ? -1 : e;
			if (Oe.current === n && L.context.reportedItem === t) return;
			Oe.current = n, L.context.reportedItem = t, v && L.set("highlightedItem", t);
			let { highlightReason: r, highlightEvent: i } = L.context;
			L.context.highlightReason = Kc, L.context.highlightEvent = void 0, a && De(t, Wc(r, i, { label: t === void 0 ? void 0 : L.context.itemLabels.current[n] ?? void 0 }));
		});
		K(() => {
			ke();
		}, [U, ke]);
		let Ae = aw.useMemo(() => {
			if (!v) return we.reference;
			if (!we.trigger) return pa;
			let { onFocus: e, ...t } = we.trigger;
			return t;
		}, [
			v,
			we.reference,
			we.trigger
		]);
		L.useSyncedValue("inputProps", v ? we.reference ?? pa : pa);
		let je = aw.useMemo(() => {
			let e = _i(Ee.reference, Ae, Se.reference, { onMouseMove() {
				L.set("allowMouseEnter", !0);
			} }, pe);
			return e["aria-haspopup"] = "menu", e["aria-expanded"] = z, e;
		}, [
			L,
			Ee.reference,
			Ae,
			Se.reference,
			pe,
			z
		]), Me = aw.useMemo(() => {
			let e = _i(we.trigger, Se.trigger, pe);
			return e["aria-haspopup"] = "menu", e["aria-expanded"] = !1, e;
		}, [
			we.trigger,
			Se.trigger,
			pe
		]);
		ri(() => (L.update({ inactiveTriggerProps: Me }), null)), xm(L, {
			floatingRootContext: ve,
			activeTriggerProps: je,
			inactiveTriggerProps: Me,
			popupProps: aw.useMemo(() => _i(Tm, {
				onMouseMove() {
					L.set("allowMouseEnter", !0), re.type === "menu" && L.set("hoverEnabled", !1);
				},
				onClick() {
					L.select("hoverEnabled") && L.set("hoverEnabled", !1);
				},
				onKeyDown(e) {
					let t = L.select("keyboardEventRelay");
					t && !e.isPropagationStopped() && t(e);
				}
			}, Ee.floating, we.floating, Se.floating), [
				re.type,
				L,
				Ee.floating,
				we.floating,
				Se.floating
			]),
			itemProps: we.item ?? pa
		});
		let Ne = aw.useMemo(() => ({
			store: L,
			parent: D,
			orientation: u,
			loopFocus: l,
			allowEscape: b,
			defaultFloatingId: k,
			setRenderedFloatingId: j,
			virtualFocus: v,
			parentVirtualFocus: E,
			syncHighlightedItem: ke
		}), [
			L,
			D,
			u,
			l,
			b,
			k,
			v,
			E,
			ke
		]), Pe = typeof t == "function" ? t({ payload: W }) : t, Fe = /*#__PURE__*/ (0, ow.jsxs)(gx.Provider, {
			value: Ne,
			children: [p && /*#__PURE__*/ (0, ow.jsx)(fm, {
				handle: p,
				store: L
			}), Pe]
		});
		return (re.type === void 0 || re.type === "context-menu") && (Fe = /*#__PURE__*/ (0, ow.jsx)(lp, {
			externalTree: R,
			children: Fe
		})), Fe;
	});
}));
// node_modules/@base-ui/react/utils/getPseudoElementBounds.mjs
function lw(e, t) {
	let n = uw(t);
	return e.clientX >= n.left - dw && e.clientX <= n.right + dw && e.clientY >= n.top - dw && e.clientY <= n.bottom + dw;
}
function uw(e) {
	let t = e.getBoundingClientRect(), n = Ar(e);
	if (eu) return t;
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
var dw, fw = o((() => {
	Wi(), ru(), dw = 5;
}));
// node_modules/@base-ui/react/internals/composite/item/useCompositeItem.mjs
function pw(e = {}) {
	let { highlightItemOnHover: t, highlightedIndex: n, onHighlightedIndexChange: r } = Ii(), { ref: i, index: a } = Wx(e), o = n === a, s = mw.useRef(null), c = Qi(i, s);
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
var mw, hw = o((() => {
	mw = /* @__PURE__ */ u(b(), 1), ia(), zi(), Kx();
}));
// node_modules/@base-ui/react/internals/composite/item/CompositeItem.mjs
function gw(e) {
	let { render: t, className: n, style: r, state: i = pa, props: a = fa, refs: o = fa, metadata: s, stateAttributesMapping: c, tag: l = "div", ...u } = e, { compositeProps: d, compositeRef: f } = pw({ metadata: s });
	return xa(l, e, {
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
var _w = o((() => {
	ma(), Aa(), hw();
}));
// node_modules/@base-ui/react/menu/utils/findRootOwnerId.mjs
function vw(e) {
	if (Pr(e) && e.hasAttribute("data-rootownerid")) return e.getAttribute("data-rootownerid");
	if (!Hr(e)) return vw(Gr(e));
}
var yw = o((() => {
	$r();
}));
// node_modules/@base-ui/react/utils/popups/useTriggerFocusGuards.mjs
function bw(e, t) {
	function n(n, r, i) {
		let a = n.currentTarget;
		xw.flushSync(() => {
			e.setOpen(!1, Uc($c, n.nativeEvent, a));
		}), gf(a.isConnected ? a : t.current, r, i)?.focus();
	}
	function r(t) {
		n(t, -1, e.select("positionerElement"));
	}
	function i(t) {
		let r = e.select("positionerElement");
		r && _f(t, r) ? e.context.beforeContentFocusGuardRef.current?.focus() : n(t, 1, r);
	}
	return {
		handlePreFocusGuardFocus: r,
		handleFocusTargetFocus: i
	};
}
var xw, Sw = o((() => {
	xw = /* @__PURE__ */ u(Os(), 1), oh(), Gc(), fl();
}));
// node_modules/@base-ui/react/utils/useMixedToggleClickHandler.mjs
function Cw(e) {
	let { enabled: t = !0, mouseDownAction: n, open: r } = e, i = ww.useRef(!1);
	return ww.useMemo(() => t ? {
		onMouseDown: (e) => {
			(n === "open" && !r || n === "close" && r) && (i.current = !0, Ui(e.currentTarget).addEventListener("click", () => {
				i.current = !1;
			}, { once: !0 }));
		},
		onClick: (e) => {
			i.current && (i.current = !1, e.preventBaseUIHandler());
		}
	} : pa, [
		t,
		n,
		r
	]);
}
var ww, Tw = o((() => {
	ww = /* @__PURE__ */ u(b(), 1), Wi(), ma();
}));
// node_modules/@base-ui/react/menu/trigger/MenuTrigger.mjs
function Ew(e, t) {
	let n = Nl(), [r, i] = Ow.useState(!1);
	return K(() => {
		e && t === "trigger-hover" ? (i(!0), n.start(500, () => {
			i(!1);
		})) : e || (n.clear(), i(!1));
	}, [
		e,
		t,
		n
	]), r;
}
function Dw() {
	let e = BC(!0);
	return Ow.useMemo(() => e ? {
		type: "menubar",
		context: e
	} : { type: void 0 }, [e]);
}
var Ow, kw, Aw, jw = o((() => {
	Fi(), Ow = /* @__PURE__ */ u(b(), 1), Il(), Wi(), Um(), di(), mi(), ma(), y_(), op(), oh(), _x(), Rc(), Aa(), Zi(), fw(), _w(), zi(), yw(), Sh(), Sw(), El(), fl(), Tw(), UC(), qf(), pd(), Mi(), kw = bs(), Aw = Rm(function(e, t) {
		let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, openOnHover: c, delay: l = 100, closeDelay: u = 0, handle: d, payload: f, ...p } = e, m = mx(!0), h = vh(d) ?? m?.store;
		if (!h) throw Error(Pi(85));
		let g = Tl(s), _ = h.useState("isTriggerActive", g), v = h.useState("floatingRootContext"), y = h.useState("isOpenedByTrigger", g), b = h.useState("triggerControlsId", g), x = Ow.useRef(null), S = Dw(), C = Ii(!0), w = hp(), T = Ow.useMemo(() => w ?? new ap(), [w]), { registerTrigger: E, isMountedByThisTrigger: D } = vm(g, x, h, {
			payload: f,
			closeDelay: u,
			parent: S,
			floatingTreeRoot: T,
			floatingNodeId: sp(T),
			floatingParentNodeId: mp(),
			keyboardEventRelay: C?.relayKeyboardEvent
		}), O = S.type === "menubar", k = h.useState("disabled"), A = a || k || O && S.context.disabled, { getButtonProps: j, buttonRef: M } = qi({
			disabled: A,
			native: o
		});
		Ow.useEffect(() => {
			!y && S.type === void 0 && (h.context.allowMouseUpTriggerRef.current = !1);
		}, [
			h,
			y,
			S.type
		]);
		let N = Ow.useRef(null), P = Nl(), F = G((e) => {
			if (!N.current) return;
			P.clear(), h.context.allowMouseUpTriggerRef.current = !1;
			let t = e.target;
			fu(N.current, t) || fu(h.select("positionerElement"), t) || t === N.current || t != null && vw(t) === h.select("rootId") || lw(e, N.current) || T.events.emit("close", {
				domEvent: e,
				reason: il
			});
		});
		Ow.useEffect(() => {
			let e = Ui(N.current);
			if (y && h.select("lastOpenChangeReason") === "trigger-hover") return e.addEventListener("mouseup", F, { once: !0 }), () => {
				e.removeEventListener("mouseup", F);
			};
		}, [
			y,
			F,
			h
		]);
		let I = O && S.context.hasSubmenuOpen, L = Rh(v, {
			enabled: (c ?? I) && !A && (!O || I && !D),
			handleClose: ag({ blockPointerEvents: !O }),
			mouseOnly: !0,
			move: !1,
			restMs: S.type === void 0 ? l : void 0,
			delay: { close: u },
			triggerElementRef: x,
			externalTree: T,
			isActiveTrigger: _,
			isClosing: () => h.select("transitionStatus") === "ending"
		}), R = Ew(y, h.select("lastOpenChangeReason")), ee = jp(v, {
			enabled: !A,
			event: y && O ? "click" : "mousedown",
			toggle: !0,
			ignoreMouse: !1,
			stickIfOpen: S.type === void 0 && R
		}), z = Th(v, { enabled: !A && I }), B = Cw({
			open: y,
			enabled: O,
			mouseDownAction: "open"
		}), V = Ow.useMemo(() => _i(z.reference, ee.reference), [z.reference, ee.reference]), te = h.useState("triggerProps", D), ne = h.useState("filterTriggerProps"), { handlePreFocusGuardFocus: H, handleFocusTargetFocus: re } = bw(h, x), U = {
			disabled: A,
			open: y
		}, ie = [
			N,
			t,
			M,
			E,
			x
		], W = [
			V,
			L ?? pa,
			te,
			{
				"aria-haspopup": "menu",
				"aria-controls": b,
				id: g,
				onMouseDown: (e) => {
					h.select("open") || (P.start(200, () => {
						h.context.allowMouseUpTriggerRef.current = !0;
					}), Ui(e.currentTarget).addEventListener("mouseup", F, { once: !0 }));
				}
			},
			ne,
			O ? { role: "menuitem" } : {},
			B,
			p,
			j
		], ae = xa("button", e, {
			enabled: !O,
			stateAttributesMapping: Fc,
			state: U,
			ref: ie,
			props: W
		});
		return O ? /*#__PURE__*/ (0, kw.jsx)(gw, {
			tag: "button",
			render: n,
			className: r,
			style: i,
			state: U,
			refs: ie,
			props: W,
			stateAttributesMapping: Fc
		}) : y ? /*#__PURE__*/ (0, kw.jsxs)(Ow.Fragment, { children: [
			/*#__PURE__*/ (0, kw.jsx)(fd, {
				ref: h.context.beforeTriggerFocusGuardRef,
				onFocus: H
			}, `${g}-pre-focus-guard`),
			/*#__PURE__*/ (0, kw.jsx)(Ow.Fragment, { children: ae }, g),
			/*#__PURE__*/ (0, kw.jsx)(fd, {
				ref: h.context.triggerFocusTargetRef,
				onFocus: re
			}, `${g}-post-focus-guard`)
		] }) : /*#__PURE__*/ (0, kw.jsx)(Ow.Fragment, { children: ae }, g);
	});
}));
// node_modules/@base-ui/utils/usePreviousValue.mjs
function Mw(e) {
	let [t, n] = Nw.useState({
		current: e,
		previous: null
	});
	return Object.is(e, t.current) || n({
		current: e,
		previous: t.current
	}), t.previous;
}
var Nw, Pw = o((() => {
	Nw = /* @__PURE__ */ u(b(), 1);
})), Fw, Iw, Lw = o((() => {
	Fw = /* @__PURE__ */ u(b(), 1), Aa(), Iw = /*#__PURE__*/ Fw.forwardRef(function(e, t) {
		let { className: n, render: r, orientation: i = "horizontal", style: a, ...o } = e;
		return xa("div", e, {
			state: { orientation: i },
			ref: t,
			props: [{
				role: "separator",
				"aria-orientation": i
			}, o]
		});
	});
}));
// node_modules/@base-ui/utils/isElementDisabled.mjs
function Rw(e) {
	return e == null || e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true";
}
var zw = o((() => {}));
// node_modules/@base-ui/react/internals/serializeValue.mjs
function Bw(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
var Vw = o((() => {}));
// node_modules/@base-ui/react/internals/resolveValueLabel.mjs
function Hw(e) {
	return typeof e == "object" && !!e && Array.isArray(e.items);
}
function Uw(e) {
	return Hw(e?.[0]);
}
function Ww(e) {
	return Uw(e) ? e.flatMap((e) => e.items) : e;
}
function Gw(e) {
	if (!Array.isArray(e)) return e != null && "null" in e;
	let t = e;
	if (Uw(t)) {
		for (let e of t) for (let t of e.items) if (t && t.value == null && t.label != null) return !0;
		return !1;
	}
	for (let e of t) if (e && e.value == null && e.label != null) return !0;
	return !1;
}
function Kw(e, t) {
	if (t && e != null) return t(e) ?? "";
	if (e && typeof e == "object") {
		if ("label" in e && e.label != null) return String(e.label);
		if ("value" in e) return String(e.value);
	}
	return Bw(e);
}
function qw(e, t) {
	return t && e != null ? t(e) ?? "" : e && typeof e == "object" && "value" in e && "label" in e ? Bw(e.value) : Bw(e);
}
function Jw(e, t, n) {
	function r() {
		return Kw(e, n);
	}
	if (n && e != null) return n(e);
	if (e && typeof e == "object" && "label" in e && e.label != null) return e.label;
	if (t && !Array.isArray(t)) return (Object.hasOwn(t, e) ? t[e] : void 0) ?? r();
	if (Array.isArray(t)) {
		let n = Ww(t);
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
function Yw(e, t, n) {
	return e.reduce((e, r, i) => (i > 0 && e.push(", "), e.push(/*#__PURE__*/ (0, Zw.jsx)(Xw.Fragment, { children: Jw(r, t, n) }, i)), e), []);
}
var Xw, Zw, Qw = o((() => {
	Xw = /* @__PURE__ */ u(b(), 1), Vw(), Zw = bs();
})), $w = o((() => {
	px(), _x(), Aa(), Rc(), xx(), fl(), wx(), ma(), jx(), Fi(), zx(), Kx(), El(), xc(), Gc(), Xp(), om(), tS(), iS(), lS(), Fx(), Hc(), Mi(), NS(), VS(), zC(), di(), Xx(), cw(), yS(), ew(), jw(), Y_(), ad(), Pw(), mi(), Wi(), rm(), Vd(), $r(), sC(), JS(), tC(), Lw(), ni(), ru(), hu(), y_(), Sh(), ZC(), Gp(), oi(), UC(), uu(), Qw(), ah(), oh(), Zh(), CS(), Xd(), Ki(), Ux(), ES(), $u(), Lv(), rw(), ia(), Il();
})), eT = o((() => {
	$w(), Rc(), xc();
}));
// src/components/ui/dropdown-menu.tsx
function tT({ ...e }) {
	return /* @__PURE__ */ (0, cT.jsx)(iw, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function nT({ ...e }) {
	return /* @__PURE__ */ (0, cT.jsx)(Aw, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function rT({ align: e = "start", alignOffset: t = 0, side: n = "bottom", sideOffset: r = 4, className: i, ...a }) {
	let o = Jv();
	return /* @__PURE__ */ (0, cT.jsx)(BS, {
		container: o ?? void 0,
		children: /* @__PURE__ */ (0, cT.jsx)(RC, {
			className: "isolate z-50 outline-none",
			align: e,
			alignOffset: t,
			side: n,
			sideOffset: r,
			children: /* @__PURE__ */ (0, cT.jsx)(MS, {
				"data-slot": "dropdown-menu-content",
				className: _s("z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-32 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", i),
				...a
			})
		})
	});
}
function iT({ ...e }) {
	return /* @__PURE__ */ (0, cT.jsx)(eS, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function aT({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, cT.jsx)(rS, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: _s("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", e),
		...n
	});
}
function oT({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, cT.jsx)(cS, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: _s("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", e),
		...r
	});
}
function sT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, cT.jsx)(Iw, {
		"data-slot": "dropdown-menu-separator",
		className: _s("-mx-1 my-1 h-px bg-border", e),
		...t
	});
}
var cT, lT = o((() => {
	b(), eT(), vs(), Qv(), cT = bs();
}));
// src/features/messages/use-message-gestures.ts
function uT({ reply: e, actions: t }) {
	let n = (0, dT.useRef)(null), r = (0, dT.useRef)(null), [i, a] = (0, dT.useState)(0);
	(0, dT.useEffect)(() => () => {
		r.current && clearTimeout(r.current);
	}, []);
	let o = () => {
		r.current && clearTimeout(r.current), r.current = null;
	}, s = () => {
		o(), n.current = null, a(0);
	};
	return {
		offset: i,
		handlers: {
			onPointerDown: (e) => {
				e.pointerType === "mouse" || e.target.closest("button,a,input,textarea,video,audio") || (n.current = {
					x: e.clientX,
					y: e.clientY,
					horizontal: !1,
					long: !1
				}, o(), r.current = setTimeout(() => {
					n.current && (n.current.long = !0, t());
				}, 500));
			},
			onPointerMove: (e) => {
				let t = n.current;
				if (!t) return;
				let r = e.clientX - t.x, i = e.clientY - t.y;
				(Math.abs(r) > 10 || Math.abs(i) > 10) && o(), r < 0 && Math.abs(r) > Math.abs(i) * 1.5 && (t.horizontal = !0, a(Math.max(-56, r)));
			},
			onPointerUp: (t) => {
				let r = n.current;
				r && !r.long && r.horizontal && t.clientX - r.x < -48 && Math.abs(t.clientY - r.y) < 36 && (t.stopPropagation(), e()), s();
			},
			onPointerCancel: s,
			onContextMenu: (e) => {
				e.target.closest("a,video,audio") || (e.preventDefault(), o(), t());
			}
		}
	};
}
var dT, fT = o((() => {
	dT = /* @__PURE__ */ u(b(), 1);
}));
// src/features/messages/message-media.tsx
function pT(e) {
	return e >= 1048576 ? (e / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(e / 1024)) + " KB";
}
function mT({ attachment: e }) {
	let [t, n] = (0, hT.useState)(null), [r, i] = (0, hT.useState)(!1), [a, o] = (0, hT.useState)("");
	(0, hT.useEffect)(() => () => {
		t && URL.revokeObjectURL(t);
	}, [t]);
	let s = e.mime.split("/")[0], c = [
		"image",
		"video",
		"audio"
	].includes(s);
	async function l() {
		if (!r) {
			i(!0), o("");
			try {
				let t = await dy.attachment(e.id), r = atob(t.attachment.data), i = new Uint8Array(r.length);
				for (let e = 0; e < r.length; e++) i[e] = r.charCodeAt(e);
				let a = URL.createObjectURL(new Blob([i], { type: e.mime }));
				if (c) n(a);
				else {
					let t = document.createElement("a");
					t.href = a, t.download = e.name, t.click(), setTimeout(() => URL.revokeObjectURL(a), 6e4);
				}
			} catch (e) {
				o(e instanceof Error ? e.message : "Não foi possível abrir o arquivo.");
			} finally {
				i(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, gT.jsxs)("div", {
		className: "mt-2 w-fit max-w-full rounded-md border border-border bg-muted/40 p-2",
		"data-no-swipe": !0,
		children: [t ? s === "image" ? /* @__PURE__ */ (0, gT.jsx)("img", {
			src: t,
			alt: e.name,
			loading: "lazy",
			className: "max-h-72 max-w-full rounded object-contain"
		}) : s === "video" ? /* @__PURE__ */ (0, gT.jsx)("video", {
			controls: !0,
			src: t,
			className: "max-h-72 max-w-full rounded"
		}) : /* @__PURE__ */ (0, gT.jsx)("audio", {
			controls: !0,
			src: t,
			className: "max-w-full"
		}) : /* @__PURE__ */ (0, gT.jsxs)(Y, {
			type: "button",
			variant: "ghost",
			disabled: r,
			onClick: () => void l(),
			className: "h-auto max-w-full justify-start py-2",
			children: [
				r ? /* @__PURE__ */ (0, gT.jsx)(zt, { className: "size-4 animate-spin" }) : c ? s === "image" ? /* @__PURE__ */ (0, gT.jsx)(At, { className: "size-4" }) : /* @__PURE__ */ (0, gT.jsx)(Sn, { className: "size-4" }) : /* @__PURE__ */ (0, gT.jsx)(rt, { className: "size-4" }),
				/* @__PURE__ */ (0, gT.jsxs)("span", {
					className: "min-w-0 text-left",
					children: [/* @__PURE__ */ (0, gT.jsx)("span", {
						className: "block max-w-52 truncate text-xs",
						children: e.name
					}), /* @__PURE__ */ (0, gT.jsxs)("span", {
						className: "text-[10px] text-muted-foreground",
						children: [
							pT(e.size),
							" ·",
							" ",
							c ? "Carregar mídia" : "Baixar arquivo"
						]
					})]
				}),
				!c && /* @__PURE__ */ (0, gT.jsx)(He, { className: "size-3" })
			]
		}), a && /* @__PURE__ */ (0, gT.jsx)("p", {
			role: "alert",
			className: "mt-1 max-w-60 text-xs text-destructive",
			children: a
		})]
	});
}
var hT, gT, _T = o((() => {
	hT = /* @__PURE__ */ u(b(), 1), Dr(), Cs(), fy(), gT = bs();
}));
// src/features/messages/message-row.tsx
function vT({ text: e }) {
	return /* @__PURE__ */ (0, xT.jsx)(xT.Fragment, { children: e.split(/(https?:\/\/[^\s]+|@[A-Za-z0-9_.-]{3,32})/g).map((e, t) => /^https?:\/\//.test(e) ? /* @__PURE__ */ (0, xT.jsx)("a", {
		href: e,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "break-all text-primary underline underline-offset-2",
		children: e
	}, t) : /^@[A-Za-z0-9_.-]+$/.test(e) ? /* @__PURE__ */ (0, xT.jsx)("span", {
		className: "rounded bg-accent px-0.5 font-medium text-accent-foreground",
		children: e
	}, t) : e) });
}
function yT({ message: e, person: t, own: n, read: r, onReply: i, onActions: a, onMention: o, onProfile: s, onReact: c, quickReaction: l }) {
	let u = () => {
		e.deleted || a(e);
	}, d = uT({
		reply: () => {
			e.deleted || i(e);
		},
		actions: u
	}), [f, p] = (0, bT.useState)(!1);
	return /* @__PURE__ */ (0, xT.jsxs)("article", {
		...d.handlers,
		"data-message-id": e.id,
		className: "group relative flex min-w-0 gap-2.5 rounded-md px-2 py-2 hover:bg-muted/40",
		onMouseEnter: () => p(!0),
		onMouseLeave: () => p(!1),
		onDoubleClick: (t) => {
			t.target.closest("button,a,input,textarea,video,audio") || e.deleted || c(e, l);
		},
		style: {
			transform: d.offset ? `translateX(${d.offset}px)` : void 0,
			touchAction: "pan-y",
			transition: d.offset ? "none" : "transform 150ms ease"
		},
		children: [
			/* @__PURE__ */ (0, xT.jsx)(Y, {
				type: "button",
				variant: "ghost",
				size: "icon",
				className: "mt-0.5 size-9 shrink-0 rounded-full p-0",
				"aria-label": `Abrir perfil de ${t.profile.displayName}`,
				onClick: () => s(t),
				children: /* @__PURE__ */ (0, xT.jsx)(Ry, {
					profile: t.profile,
					className: "size-9"
				})
			}),
			/* @__PURE__ */ (0, xT.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					e.reply && /* @__PURE__ */ (0, xT.jsxs)("div", {
						className: "mb-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, xT.jsx)(jn, { className: "size-3 shrink-0" }),
							/* @__PURE__ */ (0, xT.jsxs)("span", {
								className: "shrink-0",
								children: ["@", e.reply.username]
							}),
							/* @__PURE__ */ (0, xT.jsx)("span", {
								className: "truncate",
								children: e.reply.content || "Arquivo"
							})
						]
					}),
					/* @__PURE__ */ (0, xT.jsxs)("div", {
						className: "flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5 pr-6",
						children: [
							/* @__PURE__ */ (0, xT.jsx)("button", {
								type: "button",
								className: "max-w-full truncate rounded text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								style: { color: t.profile.nameColor.toUpperCase() === "#FAFAFA" ? void 0 : t.profile.nameColor },
								onClick: () => o(t.username),
								children: t.profile.displayName
							}),
							/* @__PURE__ */ (0, xT.jsx)("time", {
								dateTime: e.createdAt,
								className: "text-[10px] text-muted-foreground",
								title: new Date(e.createdAt).toLocaleString("pt-BR"),
								children: new Date(e.createdAt).toLocaleTimeString("pt-BR", {
									hour: "2-digit",
									minute: "2-digit"
								})
							}),
							e.editedAt && !e.deleted && /* @__PURE__ */ (0, xT.jsx)("span", {
								className: "text-[10px] text-muted-foreground",
								children: "editada"
							}),
							e.pinned && /* @__PURE__ */ (0, xT.jsx)(yn, {
								"aria-label": "Mensagem fixada",
								className: "size-3 text-muted-foreground"
							}),
							e.bookmarked && /* @__PURE__ */ (0, xT.jsx)(ve, {
								"aria-label": "Mensagem salva",
								className: "size-3 text-muted-foreground"
							})
						]
					}),
					e.forwarded && !e.deleted && /* @__PURE__ */ (0, xT.jsx)("p", {
						className: "mt-0.5 text-[10px] text-muted-foreground",
						children: "Encaminhada"
					}),
					/* @__PURE__ */ (0, xT.jsx)("p", {
						className: `mt-0.5 whitespace-pre-wrap break-words text-sm leading-relaxed ${e.deleted ? "italic text-muted-foreground" : ""}`,
						children: e.deleted ? "Mensagem apagada" : /* @__PURE__ */ (0, xT.jsx)(vT, { text: e.content })
					}),
					!e.deleted && e.attachments.map((e) => /* @__PURE__ */ (0, xT.jsx)(mT, { attachment: e }, e.id)),
					!e.deleted && e.reactions.length > 0 && /* @__PURE__ */ (0, xT.jsx)("div", {
						className: "mt-1.5 flex flex-wrap gap-1",
						children: e.reactions.map((t) => /* @__PURE__ */ (0, xT.jsxs)("button", {
							type: "button",
							"aria-label": `Reagir com ${t.emoji}, ${t.count}`,
							"aria-pressed": t.mine,
							onClick: () => c(e, t.emoji),
							className: `rounded-md border px-2 py-0.5 text-xs transition-colors ${t.mine ? "border-primary bg-accent" : "border-border bg-muted hover:bg-accent"}`,
							children: [
								t.emoji,
								" ",
								/* @__PURE__ */ (0, xT.jsx)("span", {
									className: "tabular-nums",
									children: t.count
								})
							]
						}, t.emoji))
					}),
					n && !e.deleted && /* @__PURE__ */ (0, xT.jsxs)("p", {
						className: "mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground",
						children: [r && /* @__PURE__ */ (0, xT.jsx)(xe, { className: "size-3" }), r ? "Lida" : "Enviada"]
					})
				]
			}),
			!e.deleted && /* @__PURE__ */ (0, xT.jsx)(Y, {
				type: "button",
				size: "icon-sm",
				variant: "ghost",
				"aria-label": "Ações da mensagem",
				className: `absolute right-1 top-1 ${f ? "" : "sm:opacity-0 sm:group-focus-within:opacity-100"}`,
				onClick: u,
				children: /* @__PURE__ */ (0, xT.jsx)(Ge, { className: "size-4" })
			})
		]
	});
}
var bT, xT, ST = o((() => {
	bT = /* @__PURE__ */ u(b(), 1), Dr(), Cs(), By(), fT(), _T(), xT = bs();
}));
// node_modules/@base-ui/react/popover/root/PopoverRootContext.mjs
function CT(e) {
	let t = wT.useContext(TT);
	if (t === void 0 && !e) throw Error(Pi(47));
	return t;
}
var wT, TT, ET = o((() => {
	Fi(), wT = /* @__PURE__ */ u(b(), 1), TT = /*#__PURE__*/ wT.createContext(void 0);
}));
// node_modules/@base-ui/react/popover/store/PopoverStore.mjs
function DT(e, t, n, r = !1) {
	let i = {
		...uh(t, n, r),
		disabled: !1,
		modal: !1,
		focusManagerModal: !1,
		instantType: void 0,
		openMethod: null,
		openChangeReason: null,
		titleElementId: void 0,
		descriptionElementId: void 0,
		openOnHover: !1,
		closeDelay: 0,
		adaptiveOrigin: void 0,
		...e
	};
	return i.open && e?.mounted === void 0 && (i.mounted = !0), i;
}
function OT(e) {
	return {
		popupRef: /*#__PURE__*/ kT.createRef(),
		onOpenChange: void 0,
		onOpenChangeComplete: void 0,
		triggerFocusTargetRef: /*#__PURE__*/ kT.createRef(),
		beforeTriggerFocusGuardRef: /*#__PURE__*/ kT.createRef(),
		beforeContentFocusGuardRef: /*#__PURE__*/ kT.createRef(),
		stickIfOpenTimeout: new Fl(),
		stickIfOpen: !0,
		triggerElements: e
	};
}
var kT, AT, jT, MT, NT = o((() => {
	kT = /* @__PURE__ */ u(b(), 1), AT = /* @__PURE__ */ u(Os(), 1), ah(), Il(), fl(), Sh(), qf(), jT = {
		...gh,
		disabled: (e) => e.disabled,
		instantType: (e) => e.instantType === "trigger-change" && !gh.open(e) ? void 0 : e.instantType,
		openMethod: (e) => e.openMethod,
		openChangeReason: (e) => e.openChangeReason,
		isPressOpenedByTrigger: (e, t) => e.openChangeReason === "trigger-press" && gh.isOpenedByTrigger(e, t),
		isTouchPressOpen: (e, t) => t && e.openMethod === "touch" && e.openChangeReason === "trigger-press",
		hasTriggerFocusGuards: (e, t) => gh.isOpenedByTrigger(e, t) && !e.focusManagerModal,
		modal: (e) => e.modal,
		titleElementId: (e) => e.titleElementId,
		descriptionElementId: (e) => e.descriptionElementId,
		openOnHover: (e) => e.openOnHover,
		closeDelay: (e) => e.closeDelay,
		adaptiveOrigin: (e) => e.adaptiveOrigin
	}, MT = class extends nh {
		constructor(e, t, n) {
			let r = new Dm();
			super(DT(e, r, t, n), OT(r), jT);
		}
		setOpen = (e, t) => {
			let n = t.reason === Jc, r = t.reason === "trigger-press" && t.event.detail === 0, i = !e && (t.reason === "escape-key" || t.reason == null), a = gm(t), o = this.select("activeTriggerId");
			if (!e && t.reason === "close-press" && t.trigger == null && o != null && (t.trigger = this.context.triggerElements.getById(o) ?? this.select("activeTriggerElement") ?? void 0), this.context.onOpenChange?.(e, t), t.isCanceled) return;
			this.state.floatingRootContext.dispatchOpenChange(e, t);
			let s = () => {
				let n = hm(this.state, e, t.trigger, a());
				n.openChangeReason = t.reason, this.update(n);
			};
			n ? (this.context.stickIfOpen = !0, this.context.stickIfOpenTimeout.start(500, () => {
				this.context.stickIfOpen = !1;
			}), AT.flushSync(s)) : s();
			let c;
			r ? c = "click" : i ? c = "dismiss" : t.reason === "focus-out" && (c = "focus"), this.set("instantType", c);
		};
	};
}));
// node_modules/@base-ui/react/popover/root/PopoverRoot.mjs
function PT(e) {
	return CT(!0) ? /*#__PURE__*/ (0, RT.jsx)(zT, { props: e }) : /*#__PURE__*/ (0, RT.jsx)(lp, { children: /*#__PURE__*/ (0, RT.jsx)(zT, { props: e }) });
}
function FT(e, t) {
	let n = dm((e, n) => new MT(t, e, n));
	return LT.useEffect(() => n.context.stickIfOpenTimeout.disposeEffect(), [n]), n;
}
function IT({ store: e, modal: t }) {
	let n = Vp(e.useState("floatingRootContext"), { outsidePressEvent: {
		mouse: t === "trap-focus" ? "sloppy" : "intentional",
		touch: "sloppy"
	} }), r = n.reference, i = n.floating;
	return xm(e, {
		activeTriggerProps: r,
		inactiveTriggerProps: r,
		popupProps: i
	}), null;
}
var LT, RT, zT, BT = o((() => {
	LT = /* @__PURE__ */ u(b(), 1), Um(), y_(), ET(), NT(), Gc(), fl(), Sh(), RT = bs(), zT = Lm(function({ props: e }) {
		let { children: t, open: n, defaultOpen: r = !1, onOpenChange: i, onOpenChangeComplete: a, modal: o = !1, handle: s, triggerId: c, defaultTriggerId: l = null } = e, u = FT(s, {
			modal: o,
			open: r,
			openProp: n,
			activeTriggerId: l,
			triggerIdProp: c
		});
		u.useControlledProp("openProp", n), u.useControlledProp("triggerIdProp", c);
		let d = u.useState("open"), f = u.useState("mounted"), p = u.useState("payload");
		u.useContextCallback("onOpenChange", i), u.useContextCallback("onOpenChangeComplete", a), Sm(u, d), ym(u);
		let { forceUnmount: m } = bm(d, u, () => {
			u.context.stickIfOpen = !0, u.set("openChangeReason", null);
		});
		u.useSyncedValues({ modal: o }), LT.useEffect(() => {
			d || u.context.stickIfOpenTimeout.clear();
		}, [u, d]), LT.useImperativeHandle(e.actionsRef, () => ({
			unmount: m,
			close: () => u.setOpen(!1, Uc(ll))
		}), [m, u]);
		let h = d || f || s != null;
		return /*#__PURE__*/ (0, RT.jsxs)(TT.Provider, {
			value: u,
			children: [
				s && /*#__PURE__*/ (0, RT.jsx)(fm, {
					handle: s,
					store: u
				}),
				h && /*#__PURE__*/ (0, RT.jsx)(IT, {
					store: u,
					modal: o
				}),
				typeof t == "function" ? t({ payload: p }) : t
			]
		});
	});
})), VT = o((() => {})), HT, UT, WT, GT = o((() => {
	Fi(), HT = /* @__PURE__ */ u(b(), 1), di(), Um(), ET(), Zi(), Rc(), Aa(), qf(), y_(), VT(), El(), pd(), Sh(), Sw(), Wv(), UT = bs(), WT = Rm(function(e, t) {
		let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, handle: s, payload: c, openOnHover: l = !1, delay: u = 300, closeDelay: d = 0, id: f, ...p } = e, m = CT(!0), h = vh(s) ?? m;
		if (!h) throw Error(Pi(74));
		let g = Tl(f), _ = h.useState("isTriggerActive", g), v = h.useState("floatingRootContext"), y = h.useState("isOpenedByTrigger", g), b = h.useState("triggerPopupId", g), x = HT.useRef(null), { registerTrigger: S, isMountedByThisTrigger: C } = vm(g, x, h, {
			payload: c,
			disabled: a,
			openOnHover: l,
			closeDelay: d
		}), w = h.useState("isPressOpenedByTrigger", g), T = h.useState("isTouchPressOpen", l), E = h.useState("hasTriggerFocusGuards", g), D = Rh(v, {
			enabled: !a && l && !T,
			mouseOnly: !0,
			move: !1,
			handleClose: ag(),
			restMs: u,
			delay: { close: d },
			triggerElementRef: x,
			isActiveTrigger: _,
			isClosing: () => h.select("transitionStatus") === "ending"
		}), O = jp(v, { stickIfOpen: G(() => h.context.stickIfOpen) }), k = Vv(() => h.select("open"), (e) => {
			h.set("openMethod", e);
		}), A = h.useState("triggerProps", C), { getButtonProps: j, buttonRef: M } = qi({
			disabled: a,
			native: o
		}), N = { open(e) {
			return w ? Fc.open(e) : Pc.open(e);
		} }, { handlePreFocusGuardFocus: P, handleFocusTargetFocus: F } = bw(h, x), I = xa("button", e, {
			state: {
				disabled: a,
				open: y
			},
			ref: [
				M,
				t,
				S,
				x
			],
			props: [
				O.reference,
				D,
				A,
				k,
				{
					[Uf]: "",
					id: g,
					"aria-haspopup": "dialog",
					"aria-expanded": y,
					"aria-controls": b
				},
				p,
				j
			],
			stateAttributesMapping: N
		}), L = /*#__PURE__*/ (0, UT.jsx)(HT.Fragment, { children: I }, g);
		return E ? /*#__PURE__*/ (0, UT.jsxs)(HT.Fragment, { children: [
			/*#__PURE__*/ (0, UT.jsx)(fd, {
				ref: h.context.beforeTriggerFocusGuardRef,
				onFocus: P
			}),
			L,
			/*#__PURE__*/ (0, UT.jsx)(fd, {
				ref: h.context.triggerFocusTargetRef,
				onFocus: F
			})
		] }) : L;
	});
}));
// node_modules/@base-ui/react/popover/portal/PopoverPortalContext.mjs
function KT() {
	let e = qT.useContext(JT);
	if (e === void 0) throw Error(Pi(45));
	return e;
}
var qT, JT, YT = o((() => {
	Fi(), qT = /* @__PURE__ */ u(b(), 1), JT = /*#__PURE__*/ qT.createContext(void 0);
})), XT, ZT, QT, $T = o((() => {
	XT = /* @__PURE__ */ u(b(), 1), y_(), ET(), YT(), ZT = bs(), QT = /*#__PURE__*/ XT.forwardRef(function(e, t) {
		let { keepMounted: n = !1, ...r } = e;
		return CT().useState("mounted") || n ? /*#__PURE__*/ (0, ZT.jsx)(JT.Provider, {
			value: n,
			children: /*#__PURE__*/ (0, ZT.jsx)(tp, {
				ref: t,
				...r
			})
		}) : null;
	});
}));
// node_modules/@base-ui/react/popover/positioner/PopoverPositionerContext.mjs
function eE() {
	let e = tE.useContext(nE);
	if (!e) throw Error(Pi(46));
	return e;
}
var tE, nE, rE = o((() => {
	Fi(), tE = /* @__PURE__ */ u(b(), 1), nE = /*#__PURE__*/ tE.createContext(void 0);
})), iE, aE, oE, sE = o((() => {
	iE = /* @__PURE__ */ u(b(), 1), Y_(), y_(), ET(), rE(), gC(), YT(), $_(), fl(), qf(), kC(), jC(), FC(), aE = bs(), oE = /*#__PURE__*/ iE.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, anchor: a, positionMethod: o, side: s, align: c, sideOffset: l, alignOffset: u, collisionBoundary: d = "clipping-ancestors", collisionPadding: f, arrowPadding: p, sticky: m, disableAnchorTracking: h = !1, collisionAvoidance: g = Gf, ..._ } = e, v = CT(), y = KT(), b = sp(), x = v.useState("floatingRootContext"), S = v.useState("mounted"), C = v.useState("open"), w = v.useState("openChangeReason"), T = v.useState("activeTriggerElement"), E = v.useState("modal"), D = v.useState("openMethod"), O = v.useState("positionerElement"), k = v.useState("instantType"), A = v.useState("transitionStatus"), j = uC({
			anchor: a,
			floatingRootContext: x,
			positionMethod: o,
			mounted: S,
			side: s,
			sideOffset: l,
			align: c,
			alignOffset: u,
			arrowPadding: p,
			collisionBoundary: d,
			collisionPadding: f,
			sticky: m,
			disableAnchorTracking: h,
			keepMounted: y,
			nodeId: b,
			collisionAvoidance: g,
			adaptiveOrigin: v.useState("adaptiveOrigin")
		});
		DC({
			store: v,
			domReference: x.useState("domReferenceElement"),
			positionerElement: O,
			open: C
		});
		let M = E === !0 && w !== "trigger-hover";
		MC(C && M, D === "touch", O, T);
		let N = v.useStateSetter("positionerElement"), P = AC(e, {
			open: C,
			side: j.side,
			align: j.align,
			anchorHidden: j.anchorHidden,
			instant: k
		}, {
			styles: j.positionerStyles,
			transitionStatus: A,
			props: _,
			refs: [t, N],
			hidden: !S,
			inert: !C
		});
		return /*#__PURE__*/ (0, aE.jsxs)(nE.Provider, {
			value: j,
			children: [S && M && /*#__PURE__*/ (0, aE.jsx)(Q_, {
				inert: J_(!C),
				cutout: T
			}), /*#__PURE__*/ (0, aE.jsx)(cp, {
				id: b,
				children: P
			})]
		});
	});
}));
// node_modules/@base-ui/react/utils/closePart.mjs
function cE() {
	let [e, t] = lE.useState(0), n = G(() => (t((e) => e + 1), () => {
		t((e) => Math.max(0, e - 1));
	}));
	return {
		context: lE.useMemo(() => ({ register: n }), [n]),
		hasClosePart: e > 0
	};
}
var lE, uE, dE = o((() => {
	lE = /* @__PURE__ */ u(b(), 1), di(), uE = /*#__PURE__*/ lE.createContext(void 0);
})), fE, pE, mE, hE = o((() => {
	fE = /* @__PURE__ */ u(b(), 1), $r(), y_(), ET(), rE(), Rc(), om(), Aa(), fl(), L_(), pS(), hS(), dE(), Sh(), pE = bs(), mE = /*#__PURE__*/ fE.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, initialFocus: a, finalFocus: o, ...s } = e, c = CT(), l = eE(), u = uS(!0) != null, { context: d, hasClosePart: f } = cE(), p = c.useState("open"), m = c.useState("openMethod"), h = c.useState("instantType"), g = c.useState("transitionStatus"), _ = c.useState("popupProps"), v = c.useState("titleElementId"), y = c.useState("descriptionElementId"), b = c.useState("modal"), x = c.useState("mounted"), S = c.useState("openChangeReason"), C = c.useState("activeTriggerElement"), w = c.useState("floatingRootContext"), T = w.useState("floatingId"), E = c.useState("disabled"), D = c.useState("openOnHover"), O = c.useState("closeDelay");
		im({
			open: p,
			ref: c.context.popupRef,
			onComplete() {
				p && c.context.onOpenChangeComplete?.(!0);
			}
		}), Fh(w, {
			enabled: D && !E,
			closeDelay: O
		});
		let k = a === void 0 ? um(c.context.popupRef) : a, A = b !== !1 && f;
		c.useSyncedValue("focusManagerModal", A);
		let j = c.useStateSetter("popupElement"), M = xa("div", e, {
			state: {
				open: p,
				side: l.side,
				align: l.align,
				instant: h,
				transitionStatus: g
			},
			ref: [
				t,
				c.context.popupRef,
				j
			],
			props: [
				_,
				{
					id: T,
					role: "dialog",
					...Tm,
					"aria-labelledby": v,
					"aria-describedby": y,
					onKeyDown(e) {
						u && P_.has(e.key) && e.stopPropagation();
					}
				},
				mS(g),
				s
			],
			stateAttributesMapping: Lc
		});
		return /*#__PURE__*/ (0, pE.jsx)(Tp, {
			context: w,
			openInteractionType: m,
			modal: A,
			disabled: !x || S === "trigger-hover",
			initialFocus: k,
			returnFocus: o,
			restoreFocus: "popup",
			getInsideElements: () => [c.context.beforeTriggerFocusGuardRef.current],
			previousFocusableElement: Pr(C) ? C : void 0,
			nextFocusableElement: c.context.triggerFocusTargetRef,
			beforeContentFocusGuardRef: c.context.beforeContentFocusGuardRef,
			children: /*#__PURE__*/ (0, pE.jsx)(uE.Provider, {
				value: d,
				children: M
			})
		});
	});
})), gE = o((() => {
	BT(), GT(), $T(), sE(), hE(), rE(), ET(), Rc(), Aa(), fl(), El(), Hc(), Gc(), dE(), Y_(), ad(), Pw(), mi(), di(), Wi(), rm(), ma(), Vd(), $r(), sC(), JS(), tC(), NT(), Gp();
})), _E = o((() => {
	gE(), Rc();
}));
// src/components/ui/popover.tsx
function vE({ className: e, align: t = "center", side: n = "top", sideOffset: r = 6, ...i }) {
	let a = Jv();
	return /* @__PURE__ */ (0, yE.jsx)(QT, {
		container: a ?? void 0,
		children: /* @__PURE__ */ (0, yE.jsx)(oE, {
			align: t,
			side: n,
			sideOffset: r,
			className: "isolate z-50 outline-none",
			children: /* @__PURE__ */ (0, yE.jsx)(mE, {
				"data-slot": "popover-content",
				className: _s("pointer-events-auto max-h-[var(--available-height)] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-lg border border-border bg-popover p-3 text-sm text-popover-foreground shadow-sm outline-none transition-[opacity,transform] duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none", e),
				...i
			})
		})
	});
}
var yE, bE, xE, SE = o((() => {
	_E(), vs(), Qv(), yE = bs(), bE = PT, xE = WT;
})), CE, wE, TE, EE, DE = o((() => {
	CE = /* @__PURE__ */ u(b(), 1), Dr(), Cs(), SE(), zb(), Iy(), fy(), wE = bs(), TE = [
		["😀", "feliz"],
		["😂", "risada"],
		["🙂", "sorriso"],
		["❤️", "coração"],
		["👍", "positivo"],
		["👎", "negativo"],
		["🎉", "festa"],
		["🔥", "fogo"],
		["👀", "olhos"],
		["😢", "triste"],
		["😭", "choro"],
		["💀", "caveira"],
		["✅", "confirmado"],
		["🤔", "pensando"],
		["😎", "legal"],
		["🙏", "obrigado"],
		["✨", "brilho"],
		["🚀", "foguete"],
		["💜", "coração roxo"],
		["🇧🇷", "brasil"],
		["👋", "oi"],
		["😊", "sorriso"],
		["🎮", "jogo"],
		["💬", "mensagem"]
	], EE = (0, CE.forwardRef)(function({ conversation: e, editing: t, onEditDone: n }, r) {
		let i = by().drafts[e.id] || Q.draft(e.id), a = (0, CE.useRef)(null), o = (0, CE.useRef)(null), s = (0, CE.useRef)(0), [c, l] = (0, CE.useState)(!1), [u, d] = (0, CE.useState)(!1), [f, p] = (0, CE.useState)(""), [m, h] = (0, CE.useState)(t?.content || ""), [g, _] = (0, CE.useState)(""), v = t ? m : i.text;
		(0, CE.useLayoutEffect)(() => {
			a.current && (a.current.style.height = "auto", a.current.style.height = Math.min(120, Math.max(40, a.current.scrollHeight)) + "px");
		}, [v]);
		function y(n) {
			t ? h(n) : Q.setDraft(e.id, { text: n }), n && Date.now() - s.current > 2500 ? (s.current = Date.now(), dy.typing(e.id, !0).catch(() => {})) : n || dy.typing(e.id, !1).catch(() => {});
		}
		function b(n) {
			let r = a.current, i = t ? m : Q.draft(e.id).text, o = r?.selectionStart ?? i.length, s = r?.selectionEnd ?? o;
			y((i.slice(0, o) + n + i.slice(s)).slice(0, 4e3)), requestAnimationFrame(() => {
				r?.focus(), r?.setSelectionRange(o + n.length, o + n.length);
			});
		}
		(0, CE.useImperativeHandle)(r, () => ({
			mention: (e) => b("@" + e + " "),
			focus: () => a.current?.focus()
		}));
		async function x() {
			if (!(c || u || !e.canSend)) {
				l(!0), p("");
				try {
					t ? (await Q.edit(t, m), n()) : await Q.send(e.id), a.current?.focus();
				} catch (e) {
					p(e instanceof Error ? e.message : "Não foi possível enviar.");
				} finally {
					l(!1);
				}
			}
		}
		return /* @__PURE__ */ (0, wE.jsxs)("div", {
			className: "shrink-0 border-t border-border bg-background px-3 pb-3 pt-2",
			"data-no-swipe": !0,
			children: [
				(i.reply || t) && /* @__PURE__ */ (0, wE.jsxs)("div", {
					className: "mb-2 flex min-w-0 items-center gap-2 text-xs text-muted-foreground",
					children: [
						t ? /* @__PURE__ */ (0, wE.jsx)(gn, { className: "size-3" }) : /* @__PURE__ */ (0, wE.jsx)(jn, { className: "size-3" }),
						/* @__PURE__ */ (0, wE.jsx)("span", {
							className: "min-w-0 flex-1 truncate",
							children: t ? "Editando mensagem" : `Respondendo a @${i.reply.sender.username}: ${i.reply.content || "Arquivo"}`
						}),
						/* @__PURE__ */ (0, wE.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon-xs",
							"aria-label": t ? "Cancelar edição" : "Cancelar resposta",
							onClick: () => {
								t ? n() : Q.setDraft(e.id, { reply: null });
							},
							children: /* @__PURE__ */ (0, wE.jsx)(Sr, { className: "size-3" })
						})
					]
				}),
				i.attachments.length > 0 && !t && /* @__PURE__ */ (0, wE.jsx)("div", {
					className: "mb-2 flex flex-wrap gap-1.5",
					children: i.attachments.map((t) => /* @__PURE__ */ (0, wE.jsxs)("div", {
						className: "flex max-w-full items-center gap-1 rounded-md border border-border bg-muted pl-2 text-xs",
						children: [/* @__PURE__ */ (0, wE.jsx)("span", {
							className: "max-w-36 truncate",
							children: t.name
						}), /* @__PURE__ */ (0, wE.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon-xs",
							"aria-label": `Remover anexo ${t.name}`,
							onClick: () => void Q.removeAttachment(e.id, t.id).catch((e) => p(e.message)),
							children: /* @__PURE__ */ (0, wE.jsx)(Sr, { className: "size-3" })
						})]
					}, t.id))
				}),
				/* @__PURE__ */ (0, wE.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault(), x();
					},
					className: "flex items-end gap-1 rounded-lg border border-input bg-muted/40 p-1.5 focus-within:ring-1 focus-within:ring-ring",
					children: [
						/* @__PURE__ */ (0, wE.jsx)("input", {
							ref: o,
							type: "file",
							className: "sr-only",
							multiple: !0,
							"aria-label": "Anexar arquivos à mensagem",
							onChange: async (t) => {
								let n = Array.from(t.target.files || []);
								t.target.value = "", d(!0), p("");
								try {
									for (let t of n) await Q.upload(e.id, t);
								} catch (e) {
									p(e instanceof Error ? e.message : "Não foi possível anexar.");
								} finally {
									d(!1);
								}
							}
						}),
						/* @__PURE__ */ (0, wE.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon",
							disabled: c || u || !e.canSend || !!t,
							"aria-label": "Adicionar arquivo",
							onClick: () => o.current?.click(),
							children: u ? /* @__PURE__ */ (0, wE.jsx)(zt, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, wE.jsx)(pn, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, wE.jsx)("textarea", {
							ref: a,
							rows: 1,
							maxLength: 4e3,
							value: v,
							disabled: c || !e.canSend,
							"aria-label": "Mensagem direta",
							placeholder: e.canSend ? `Mensagem para @${e.peer.username}` : "Envio indisponível nesta conversa",
							onChange: (e) => y(e.target.value),
							onKeyDown: (r) => {
								r.key === "Enter" && !r.shiftKey && !r.nativeEvent.isComposing ? (r.preventDefault(), x()) : r.key === "Escape" && (t || i.reply) && (r.preventDefault(), r.stopPropagation(), t ? n() : Q.setDraft(e.id, { reply: null }));
							},
							className: "max-h-32 min-h-10 min-w-0 flex-1 resize-none bg-transparent px-1 py-2 text-sm leading-5 outline-none disabled:opacity-50"
						}),
						/* @__PURE__ */ (0, wE.jsxs)(bE, { children: [/* @__PURE__ */ (0, wE.jsx)(xE, {
							render: /* @__PURE__ */ (0, wE.jsx)(Y, {
								type: "button",
								variant: "ghost",
								size: "icon",
								"aria-label": "Escolher emoji",
								disabled: !e.canSend
							}),
							children: /* @__PURE__ */ (0, wE.jsx)(Je, { className: "size-4" })
						}), /* @__PURE__ */ (0, wE.jsxs)(vE, {
							className: "w-72 p-3",
							align: "end",
							children: [/* @__PURE__ */ (0, wE.jsx)(Lb, {
								"aria-label": "Pesquisar emoji",
								placeholder: "Pesquisar emoji…",
								value: g,
								onChange: (e) => _(e.target.value)
							}), /* @__PURE__ */ (0, wE.jsx)("div", {
								className: "mt-2 grid max-h-48 grid-cols-6 gap-1 overflow-y-auto",
								children: TE.filter(([e, t]) => t.includes(g.toLowerCase()) || e.includes(g)).map(([e, t]) => /* @__PURE__ */ (0, wE.jsx)(Y, {
									type: "button",
									variant: "ghost",
									size: "icon",
									className: "text-xl",
									"aria-label": `Inserir ${t}`,
									onClick: () => b(e),
									children: e
								}, e))
							})]
						})] }),
						/* @__PURE__ */ (0, wE.jsx)(Y, {
							type: "submit",
							size: "icon",
							disabled: c || u || !e.canSend || !v.trim() && !i.attachments.length,
							"aria-label": t ? "Salvar mensagem" : "Enviar mensagem",
							children: c ? /* @__PURE__ */ (0, wE.jsx)(zt, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, wE.jsx)(Bn, { className: "size-4" })
						})
					]
				}),
				f && /* @__PURE__ */ (0, wE.jsx)("p", {
					role: "alert",
					className: "mt-2 text-xs text-destructive",
					children: f
				})
			]
		});
	});
}));
// src/components/ui/sheet.tsx
function OE({ ...e }) {
	return /* @__PURE__ */ (0, FE.jsx)(Av, {
		"data-slot": "sheet",
		...e
	});
}
function kE({ container: e, ...t }) {
	let n = Jv();
	return /* @__PURE__ */ (0, FE.jsx)(nv, {
		"data-slot": "sheet-portal",
		container: e ?? n ?? void 0,
		...t
	});
}
function AE({ className: e, ...t }) {
	return /* @__PURE__ */ (0, FE.jsx)(Bc, {
		"data-slot": "sheet-overlay",
		className: _s("fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs", e),
		...t
	});
}
function jE({ className: e, children: t, side: n = "right", showCloseButton: r = !0, ...i }) {
	return /* @__PURE__ */ (0, FE.jsxs)(kE, { children: [/* @__PURE__ */ (0, FE.jsx)(AE, {}), /* @__PURE__ */ (0, FE.jsxs)(K_, {
		"data-slot": "sheet-content",
		"data-side": n,
		className: _s("d3-sheet-content fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm", e),
		...i,
		children: [t, r && /* @__PURE__ */ (0, FE.jsxs)(ml, {
			"data-slot": "sheet-close",
			render: /* @__PURE__ */ (0, FE.jsx)(Y, {
				variant: "ghost",
				className: "absolute top-3 right-3",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, FE.jsx)(Sr, {}), /* @__PURE__ */ (0, FE.jsx)("span", {
				className: "sr-only",
				children: "Fechar navegação"
			})]
		})]
	})] });
}
function ME({ className: e, ...t }) {
	return /* @__PURE__ */ (0, FE.jsx)("div", {
		"data-slot": "sheet-header",
		className: _s("flex flex-col gap-0.5 p-4", e),
		...t
	});
}
function NE({ className: e, ...t }) {
	return /* @__PURE__ */ (0, FE.jsx)(Nv, {
		"data-slot": "sheet-title",
		className: _s("font-heading text-base font-medium text-foreground", e),
		...t
	});
}
function PE({ className: e, ...t }) {
	return /* @__PURE__ */ (0, FE.jsx)(Ol, {
		"data-slot": "sheet-description",
		className: _s("text-sm text-muted-foreground", e),
		...t
	});
}
var FE, IE = o((() => {
	b(), Kv(), vs(), Qv(), Cs(), Dr(), FE = bs();
})), LE, RE = o((() => {
	LE = [
		"👍",
		"❤️",
		"😂",
		"🎉",
		"🔥",
		"👀",
		"👎",
		"😢",
		"✅",
		"🇧🇷",
		"💀",
		"🙂"
	];
}));
// src/features/messages/message-actions.tsx
function zE({ message: e, own: t, onClose: n, onAction: r, onReact: i }) {
	let a = [
		{
			id: "reply",
			label: "Responder",
			icon: jn
		},
		{
			id: "forward",
			label: "Encaminhar",
			icon: ht
		},
		{
			id: "copy",
			label: "Copiar texto",
			icon: ze
		},
		{
			id: "unread",
			label: "Marcar como não lida",
			icon: Gt
		},
		{
			id: "pin",
			label: e?.pinned ? "Desafixar mensagem" : "Fixar mensagem",
			icon: yn
		},
		{
			id: "bookmark",
			label: e?.bookmarked ? "Remover dos salvos" : "Salvar mensagem",
			icon: ve
		},
		...t ? [{
			id: "edit",
			label: "Editar mensagem",
			icon: gn
		}, {
			id: "remove",
			label: "Apagar mensagem",
			icon: ur
		}] : []
	];
	return /* @__PURE__ */ (0, BE.jsx)(OE, {
		open: !!e,
		onOpenChange: (e) => {
			e || n();
		},
		children: /* @__PURE__ */ (0, BE.jsxs)(jE, {
			side: "bottom",
			showCloseButton: !1,
			className: "mx-auto max-h-[85svh] w-full max-w-lg overflow-y-auto rounded-t-xl p-4",
			children: [
				/* @__PURE__ */ (0, BE.jsx)("div", { className: "mx-auto h-1 w-10 rounded-full bg-border" }),
				/* @__PURE__ */ (0, BE.jsxs)(ME, {
					className: "p-0",
					children: [/* @__PURE__ */ (0, BE.jsx)(NE, { children: "Ações da mensagem" }), /* @__PURE__ */ (0, BE.jsx)(PE, {
						className: "sr-only",
						children: "Responda, reaja ou gerencie esta mensagem."
					})]
				}),
				/* @__PURE__ */ (0, BE.jsx)("div", {
					className: "grid grid-cols-6 gap-1",
					children: LE.slice(0, 6).map((t) => /* @__PURE__ */ (0, BE.jsx)(Y, {
						type: "button",
						variant: "outline",
						className: "h-11 text-xl",
						"aria-label": `Reagir com ${t}`,
						onClick: () => {
							e && i(e, t), n();
						},
						children: t
					}, t))
				}),
				/* @__PURE__ */ (0, BE.jsx)("div", {
					className: "grid gap-1 rounded-lg border border-border p-1",
					children: a.map(({ id: t, label: i, icon: a }) => /* @__PURE__ */ (0, BE.jsxs)(Y, {
						type: "button",
						variant: "ghost",
						className: `h-10 justify-start ${t === "remove" ? "text-destructive" : ""}`,
						onClick: () => {
							e && r(t, e), n();
						},
						children: [/* @__PURE__ */ (0, BE.jsx)(a, { className: "size-4" }), i]
					}, t))
				}),
				/* @__PURE__ */ (0, BE.jsx)(Y, {
					type: "button",
					variant: "outline",
					onClick: n,
					children: "Fechar"
				})
			]
		})
	});
}
var BE, VE = o((() => {
	Dr(), Cs(), IE(), RE(), BE = bs();
}));
// src/features/messages/message-thread.tsx
function HE({ conversation: e, onProfile: t }) {
	let n = by(), r = n.threads[e.id], [i, a] = (0, UE.useState)(null), [o, s] = (0, UE.useState)(null), [c, l] = (0, UE.useState)(null), [u, d] = (0, UE.useState)(null), [f, p] = (0, UE.useState)(""), [m, h] = (0, UE.useState)(!1), [g, _] = (0, UE.useState)(""), [v, y] = (0, UE.useState)(""), [b, x] = (0, UE.useState)(""), [S, C] = (0, UE.useState)("all"), [w, T] = (0, UE.useState)(null), [E, D] = (0, UE.useState)(!1), O = (0, UE.useRef)(null), k = (0, UE.useRef)(null), A = (0, UE.useRef)(!0);
	(0, UE.useEffect)(() => {
		let e = setTimeout(() => x(v.trim()), 250);
		return () => clearTimeout(e);
	}, [v]), (0, UE.useEffect)(() => {
		let t = !0;
		if (!b && S === "all") T(null);
		else return D(!0), dy.messages(e.id, {
			search: b,
			filter: S
		}).then((e) => {
			t && T(e.messages);
		}).catch((e) => {
			t && _(e.message);
		}).finally(() => {
			t && D(!1);
		}), () => {
			t = !1;
		};
	}, [
		e.id,
		b,
		S,
		n.inbox?.cursor
	]);
	let j = w || r?.messages || [];
	(0, UE.useLayoutEffect)(() => {
		A.current && k.current && (k.current.scrollTop = k.current.scrollHeight);
	}, [j.length, j.at(-1)?.id]);
	async function M(e) {
		_("");
		try {
			await e();
		} catch (e) {
			_(e instanceof Error ? e.message : "Não foi possível concluir.");
		}
	}
	function N(t) {
		e.canSend && (s(null), Q.setDraft(e.id, { reply: t }), O.current?.focus());
	}
	function P(e, t) {
		e === "reply" ? N(t) : e === "edit" ? (s(t), O.current?.focus()) : e === "remove" ? l(t) : e === "forward" ? (p(""), d(t)) : M(e === "copy" ? () => navigator.clipboard.writeText(t.content) : () => Q.action(t, e));
	}
	let F = n.inbox?.me;
	return F ? /* @__PURE__ */ (0, $.jsxs)("section", {
		className: "flex h-full min-h-0 min-w-0 flex-col",
		"aria-label": `Conversa com ${e.peer.profile.displayName}`,
		children: [
			/* @__PURE__ */ (0, $.jsxs)("header", {
				className: "flex shrink-0 items-center gap-2 border-b border-border px-3 py-2",
				children: [
					/* @__PURE__ */ (0, $.jsx)("button", {
						type: "button",
						"aria-label": `Abrir perfil de ${e.peer.profile.displayName}`,
						onClick: () => t(e.peer),
						children: /* @__PURE__ */ (0, $.jsx)(Ry, {
							profile: e.peer.profile,
							className: "size-8"
						})
					}),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, $.jsx)("button", {
							type: "button",
							className: "max-w-full truncate text-left text-sm font-medium hover:underline",
							onClick: () => O.current?.mention(e.peer.username),
							children: e.peer.profile.displayName
						}), /* @__PURE__ */ (0, $.jsxs)("p", {
							className: "truncate text-[10px] text-muted-foreground",
							children: [e.peer.online ? "Online" : "@" + e.peer.username, e.muted ? " · silenciada" : ""]
						})]
					}),
					/* @__PURE__ */ (0, $.jsxs)(tT, { children: [/* @__PURE__ */ (0, $.jsx)(nT, {
						render: /* @__PURE__ */ (0, $.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Opções da conversa"
						}),
						children: /* @__PURE__ */ (0, $.jsx)(Ge, { className: "size-4" })
					}), /* @__PURE__ */ (0, $.jsxs)(rT, {
						align: "end",
						children: [
							/* @__PURE__ */ (0, $.jsxs)(oT, {
								onClick: () => void M(() => Q.conversation(e.id, { muted: !e.muted })),
								children: [e.muted ? /* @__PURE__ */ (0, $.jsx)(he, {}) : /* @__PURE__ */ (0, $.jsx)(fe, {}), e.muted ? "Ativar notificações" : "Silenciar conversa"]
							}),
							/* @__PURE__ */ (0, $.jsxs)(oT, {
								onClick: () => void M(() => Q.conversation(e.id, { archived: !0 })),
								children: [/* @__PURE__ */ (0, $.jsx)(oe, {}), "Fechar conversa"]
							}),
							/* @__PURE__ */ (0, $.jsxs)(oT, {
								onClick: () => void M(() => Q.block(e.peer, !e.blockedByMe)),
								children: [e.blockedByMe ? /* @__PURE__ */ (0, $.jsx)(Yn, {}) : /* @__PURE__ */ (0, $.jsx)(Kn, {}), e.blockedByMe ? "Desbloquear conta" : "Bloquear conta"]
							})
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "shrink-0 border-b border-border px-3 py-2",
				children: [/* @__PURE__ */ (0, $.jsxs)("label", {
					className: "flex min-w-0 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, $.jsx)(Ln, { className: "size-4 shrink-0 text-muted-foreground" }),
						/* @__PURE__ */ (0, $.jsx)(Lb, {
							"aria-label": "Pesquisar nesta conversa",
							className: "h-8",
							placeholder: "Pesquisar nesta conversa…",
							value: v,
							onChange: (e) => y(e.target.value)
						}),
						v && /* @__PURE__ */ (0, $.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon-sm",
							"aria-label": "Limpar pesquisa",
							onClick: () => y(""),
							children: /* @__PURE__ */ (0, $.jsx)(Sr, { className: "size-3" })
						})
					]
				}), /* @__PURE__ */ (0, $.jsx)("nav", {
					"aria-label": "Filtrar mensagens",
					className: "mt-2 overflow-x-auto touch-pan-x",
					children: /* @__PURE__ */ (0, $.jsx)("div", {
						className: "flex w-max min-w-full gap-1",
						children: WE.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(Y, {
							type: "button",
							variant: S === e ? "secondary" : "ghost",
							size: "sm",
							"aria-pressed": S === e,
							onClick: () => {
								A.current = !0, C(e);
							},
							children: t
						}, e))
					})
				})]
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				ref: k,
				className: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 py-2",
				onScroll: () => {
					let e = k.current;
					e && (A.current = e.scrollHeight - e.scrollTop - e.clientHeight < 100);
				},
				"aria-label": "Histórico de mensagens",
				children: [
					!w && !b && S === "all" && r?.hasMore && /* @__PURE__ */ (0, $.jsx)("div", {
						className: "px-3 pb-3 text-center",
						children: /* @__PURE__ */ (0, $.jsxs)(Y, {
							type: "button",
							variant: "ghost",
							size: "sm",
							disabled: r.loading,
							onClick: () => {
								let t = k.current, n = t?.scrollHeight || 0;
								A.current = !1, Q.load(e.id, !0).then(() => requestAnimationFrame(() => {
									t && (t.scrollTop += t.scrollHeight - n);
								}));
							},
							children: [r.loading ? /* @__PURE__ */ (0, $.jsx)(zt, { className: "size-3 animate-spin" }) : /* @__PURE__ */ (0, $.jsx)(De, { className: "size-3 rotate-180" }), "Carregar mensagens anteriores"]
						})
					}),
					E && /* @__PURE__ */ (0, $.jsx)("p", {
						role: "status",
						className: "px-4 py-2 text-xs text-muted-foreground",
						children: "Pesquisando…"
					}),
					r?.loading && !r.messages.length ? /* @__PURE__ */ (0, $.jsx)("div", {
						className: "space-y-5 p-4",
						children: [
							0,
							1,
							2,
							3
						].map((e) => /* @__PURE__ */ (0, $.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, $.jsx)(sx, { className: "size-9 rounded-full" }), /* @__PURE__ */ (0, $.jsxs)("div", {
								className: "flex-1 space-y-2",
								children: [/* @__PURE__ */ (0, $.jsx)(sx, { className: "h-3 w-28" }), /* @__PURE__ */ (0, $.jsx)(sx, { className: "h-3 w-3/4" })]
							})]
						}, e))
					}) : j.length ? j.map((r, i) => {
						let o = new Date(r.createdAt).toLocaleDateString("pt-BR"), s = j[i - 1], c = r.sender.username === F.username ? F : e.peer;
						return /* @__PURE__ */ (0, $.jsxs)("div", { children: [(!s || new Date(s.createdAt).toLocaleDateString("pt-BR") !== o) && /* @__PURE__ */ (0, $.jsxs)("div", {
							className: "my-4 flex items-center gap-3 px-4 text-[10px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, $.jsx)("span", { className: "h-px flex-1 bg-border" }),
								/* @__PURE__ */ (0, $.jsx)("span", { children: o }),
								/* @__PURE__ */ (0, $.jsx)("span", { className: "h-px flex-1 bg-border" })
							]
						}), /* @__PURE__ */ (0, $.jsx)(yT, {
							message: r,
							person: c,
							own: r.sender.username === F.username,
							read: r.seq <= e.peerReadSeq,
							onReply: N,
							onActions: a,
							onMention: (e) => O.current?.mention(e),
							onProfile: t,
							onReact: (e, t) => void M(() => Q.action(e, "reaction", t)),
							quickReaction: n.inbox?.settings.quickReaction || "👍"
						})] }, r.id);
					}) : /* @__PURE__ */ (0, $.jsxs)("div", {
						className: "grid h-full min-h-40 place-content-center justify-items-center gap-3 px-6 text-center",
						children: [
							/* @__PURE__ */ (0, $.jsx)(Ry, {
								profile: e.peer.profile,
								className: "size-14"
							}),
							/* @__PURE__ */ (0, $.jsx)("h3", {
								className: "text-base font-semibold",
								children: e.peer.profile.displayName
							}),
							/* @__PURE__ */ (0, $.jsx)("p", {
								className: "max-w-xs text-sm text-muted-foreground",
								children: b || S !== "all" ? "Nenhuma mensagem encontrada." : "Este é o início da sua conversa direta."
							})
						]
					})
				]
			}),
			(g || r?.error) && /* @__PURE__ */ (0, $.jsx)("p", {
				role: "alert",
				className: "border-t border-border px-3 py-2 text-xs text-destructive",
				children: g || r?.error
			}),
			r?.typing && /* @__PURE__ */ (0, $.jsxs)("p", {
				role: "status",
				className: "shrink-0 px-4 pb-1 text-[10px] text-muted-foreground",
				children: [e.peer.profile.displayName, " está digitando…"]
			}),
			/* @__PURE__ */ (0, $.jsx)(EE, {
				ref: O,
				conversation: e,
				editing: o,
				onEditDone: () => s(null)
			}, o?.id || "composer"),
			/* @__PURE__ */ (0, $.jsx)(zE, {
				message: i,
				own: i?.sender.username === F.username,
				onClose: () => a(null),
				onAction: P,
				onReact: (e, t) => void M(() => Q.action(e, "reaction", t))
			}),
			/* @__PURE__ */ (0, $.jsx)($v, {
				open: !!c,
				onOpenChange: (e) => {
					!e && !m && l(null);
				},
				children: /* @__PURE__ */ (0, $.jsxs)(ny, { children: [/* @__PURE__ */ (0, $.jsxs)(ry, { children: [/* @__PURE__ */ (0, $.jsx)(ay, { children: "Apagar mensagem?" }), /* @__PURE__ */ (0, $.jsx)(oy, { children: "A mensagem será apagada para os participantes desta DM." })] }), /* @__PURE__ */ (0, $.jsxs)(iy, { children: [/* @__PURE__ */ (0, $.jsx)(Y, {
					type: "button",
					variant: "outline",
					disabled: m,
					onClick: () => l(null),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, $.jsx)(Y, {
					type: "button",
					variant: "destructive",
					disabled: m,
					onClick: async () => {
						if (c) {
							h(!0);
							try {
								await Q.remove(c), l(null);
							} catch (e) {
								_(e instanceof Error ? e.message : "Não foi possível apagar.");
							} finally {
								h(!1);
							}
						}
					},
					children: "Apagar"
				})] })] })
			}),
			/* @__PURE__ */ (0, $.jsx)($v, {
				open: !!u,
				onOpenChange: (e) => {
					!e && !m && d(null);
				},
				children: /* @__PURE__ */ (0, $.jsxs)(ny, { children: [
					/* @__PURE__ */ (0, $.jsxs)(ry, { children: [/* @__PURE__ */ (0, $.jsx)(ay, { children: "Encaminhar mensagem" }), /* @__PURE__ */ (0, $.jsx)(oy, { children: "Escolha outra conversa aceita." })] }),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "grid max-h-64 gap-1 overflow-y-auto",
						children: [n.inbox?.conversations.filter((t) => t.id !== e.id && t.canSend).map((e) => /* @__PURE__ */ (0, $.jsxs)(Y, {
							type: "button",
							variant: f === e.id ? "secondary" : "ghost",
							className: "h-12 justify-start",
							onClick: () => p(e.id),
							children: [/* @__PURE__ */ (0, $.jsx)(Ry, { profile: e.peer.profile }), /* @__PURE__ */ (0, $.jsx)("span", {
								className: "truncate",
								children: e.peer.profile.displayName
							})]
						}, e.id)), !n.inbox?.conversations.some((t) => t.id !== e.id && t.canSend) && /* @__PURE__ */ (0, $.jsx)("p", {
							className: "py-4 text-sm text-muted-foreground",
							children: "Nenhuma outra conversa aceita disponível."
						})]
					}),
					/* @__PURE__ */ (0, $.jsxs)(iy, { children: [/* @__PURE__ */ (0, $.jsx)(Y, {
						type: "button",
						variant: "outline",
						disabled: m,
						onClick: () => d(null),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, $.jsx)(Y, {
						type: "button",
						disabled: m || !f,
						onClick: async () => {
							if (u) {
								h(!0);
								try {
									await Q.forward(u, f), d(null);
								} catch (e) {
									_(e instanceof Error ? e.message : "Não foi possível encaminhar.");
								} finally {
									h(!1);
								}
							}
						},
						children: "Encaminhar"
					})] })
				] })
			})
		]
	}) : null;
}
var UE, $, WE, GE = o((() => {
	UE = /* @__PURE__ */ u(b(), 1), Dr(), Cs(), zb(), lx(), cy(), lT(), By(), Iy(), fy(), ST(), DE(), VE(), $ = bs(), WE = [
		["all", "Tudo"],
		["media", "Mídia"],
		["pinned", "Fixadas"],
		["links", "Links"],
		["files", "Arquivos"],
		["bookmarks", "Salvas"]
	];
}));
// node_modules/@base-ui/utils/getDefaultFormSubmitter.mjs
function KE(e) {
	if (!e) return null;
	for (let t of e.elements) {
		let e = t.tagName;
		if (e === "BUTTON" || e === "INPUT") {
			let e = t;
			if (e.type === "submit") return e;
		}
	}
	return null;
}
var qE = o((() => {})), JE, YE, XE = o((() => {
	JE = "data-checked", YE = "data-unchecked";
}));
// node_modules/@base-ui/react/checkbox/utils/getCheckboxStateAttributesMapping.mjs
function ZE(e) {
	return {
		checked(t) {
			return e.indeterminate ? {} : t ? { [JE]: "" } : { [YE]: "" };
		},
		...Xy
	};
}
var QE = o((() => {
	Zy(), XE();
}));
// node_modules/@base-ui/react/checkbox-group/CheckboxGroupContext.mjs
function $E() {
	return eD.useContext(tD);
}
var eD, tD, nD = o((() => {
	eD = /* @__PURE__ */ u(b(), 1), tD = /*#__PURE__*/ eD.createContext(void 0);
}));
// node_modules/@base-ui/react/checkbox/root/CheckboxRootContext.mjs
function rD() {
	let e = iD.useContext(aD);
	if (e === void 0) throw Error(Pi(14));
	return e;
}
var iD, aD, oD = o((() => {
	Fi(), iD = /* @__PURE__ */ u(b(), 1), aD = /*#__PURE__*/ iD.createContext(void 0);
})), sD, cD, lD, uD, dD = o((() => {
	sD = /* @__PURE__ */ u(b(), 1), ma(), wx(), mi(), ia(), ld(), Wi(), qE(), QE(), Ki(), Aa(), El(), Mi(), Zi(), nb(), wb(), Eb(), Sb(), ob(), ub(), hb(), vb(), nD(), oD(), Gc(), fl(), Bv(), cD = bs(), lD = "data-parent", uD = /*#__PURE__*/ sD.forwardRef(function(e, t) {
		let { checked: n, className: r, defaultChecked: i = !1, "aria-labelledby": a, disabled: o = !1, form: s, id: c, indeterminate: l = !1, inputRef: u, name: d, onCheckedChange: f, parent: p = !1, readOnly: m = !1, render: h, required: g = !1, uncheckedValue: _, value: v, nativeButton: y = !1, style: b, ...x } = e, { clearErrors: S } = rb(), { disabled: C, name: w, setDirty: T, setFilled: E, setTouched: D, state: O, validationMode: k, validityData: A, validation: j } = Qy(), M = yb(), { labelId: N, registerControlId: P, getDescriptionProps: F } = sb(), I = $E(), L = I?.allValues === void 0 ? void 0 : I.parent, R = L !== void 0, ee = C || M.disabled || I?.disabled || o, z = w ?? d, B = v ?? z, V = Tl(), te = I?.registerControlId !== P, ne = gb({
			id: c || void 0,
			enabled: te
		}), H = y ? ne : V, re = {};
		R && (p ? re = L.getParentProps() : B !== void 0 && (re = L.getChildProps(B)));
		let { checked: U = n, indeterminate: ie = l, onCheckedChange: W, ...ae } = re, oe = I?.value, se = sD.useRef(null), ce = Cb(ee, se), { getButtonProps: le, buttonRef: ue } = qi({
			disabled: ee,
			native: y
		}), de = I?.validation ?? j, [fe, pe] = Sx({
			controlled: B !== void 0 && oe !== void 0 && !p ? oe.includes(B) : U,
			default: i,
			name: "Checkbox",
			state: "checked"
		}), me = R ? !!U : fe, he = R && ie || l;
		Tb(se, V, fe, void 0, !I && !ee, d);
		let ge = L?.registerChildId, _e = sD.useRef(null), ve = de.registerInput, ye = I ? B : void 0, be = sD.useCallback((e) => ve(e, {
			controlRef: se,
			value: ye
		}), [ve, ye]), xe = Qi(u, _e, p ? void 0 : be), Se = db(a, N, _e, !y, ne, x["aria-label"]);
		K(() => {
			_e.current && (_e.current.indeterminate = he), I || E(fe);
		}, [
			fe,
			he,
			I,
			E
		]), Rv(fe, () => {
			I || (S(z), T(fe !== A.initialValue), de.change(fe));
		});
		let Ce = _i({
			checked: fe,
			disabled: ee,
			form: s,
			name: p ? void 0 : z,
			id: y ? void 0 : ne,
			required: g,
			ref: xe,
			style: z ? cd : sd,
			tabIndex: -1,
			type: "checkbox",
			"aria-hidden": !0,
			onChange(e) {
				if (e.nativeEvent.defaultPrevented) return;
				if (m) {
					e.preventDefault();
					return;
				}
				let t = e.currentTarget.checked, n = Uc(Kc, e.nativeEvent);
				if (f?.(t, n), !n.isCanceled && (W?.(t, n), !n.isCanceled && (pe(t), B !== void 0 && I !== void 0 && !p && !R))) {
					let e = t ? [...I.value, B] : I.value.filter((e) => e !== B);
					I.setValue(e, n);
				}
			},
			onClick(e) {
				e.stopPropagation();
			},
			onFocus() {
				se.current?.focus();
			}
		}, v === void 0 ? pa : { value: (I ? fe && v : v) || "" }, F, (e) => de.getValidationProps(ee, e));
		sD.useEffect(() => {
			if (!L || B === void 0) return;
			let e = L.disabledStatesRef.current;
			return e.set(B, ee), () => {
				e.delete(B);
			};
		}, [
			L,
			ee,
			B
		]);
		let we = sD.useMemo(() => ({
			...O,
			checked: me,
			disabled: ee,
			readOnly: m,
			required: g,
			indeterminate: he
		}), [
			O,
			me,
			ee,
			m,
			g,
			he
		]), Te = ZE(we), Ee = xa("span", e, {
			state: we,
			ref: [
				ue,
				se,
				t
			],
			props: [
				{
					id: H,
					role: "checkbox",
					"aria-checked": he ? "mixed" : me,
					"aria-readonly": m || void 0,
					"aria-required": g || void 0,
					"aria-labelledby": Se,
					[lD]: p ? "" : void 0,
					onFocus() {
						ce(!0);
					},
					onBlur() {
						let e = _e.current;
						e && (D(!0), ce(!1), k === "onBlur" && de.commit(I ? oe : e.checked));
					},
					onKeyDown(e) {
						if (e.key !== "Enter" || (e.preventBaseUIHandler(), e.defaultPrevented)) return;
						let t = _e.current?.form ?? null, n = e.currentTarget, r = e.nativeEvent, i = e.preventDefault, a = r.preventDefault, o = !1;
						e.preventDefault = () => {
							o = !0, i.call(e);
						}, r.preventDefault = () => {
							o = !0, a.call(r);
						}, a.call(r), Ar(n).queueMicrotask(() => {
							e.preventDefault = i, r.preventDefault = a, o || KE(t)?.click();
						});
					},
					onClick(e) {
						if (m || ee) return;
						e.preventDefault();
						let t = _e.current;
						t && Gi(t, e);
					}
				},
				x,
				ae,
				le,
				F,
				(e) => de.getValidationProps(ee, e)
			],
			stateAttributesMapping: Te
		}), De = Ee.props.id;
		return K(() => {
			if (ge && !p && B !== void 0 && De !== void 0) return ge(B, De);
		}, [
			ge,
			p,
			B,
			De
		]), /*#__PURE__*/ (0, cD.jsxs)(aD.Provider, {
			value: we,
			children: [
				Ee,
				!fe && !I && z && !p && _ !== void 0 && /*#__PURE__*/ (0, cD.jsx)("input", {
					type: "hidden",
					form: s,
					name: z,
					value: _,
					disabled: ee
				}),
				/*#__PURE__*/ (0, cD.jsx)("input", {
					...Ce,
					suppressHydrationWarning: !0
				})
			]
		});
	});
})), fD, pD, mD = o((() => {
	fD = /* @__PURE__ */ u(b(), 1), oD(), Aa(), QE(), om(), Xp(), xc(), pD = /*#__PURE__*/ fD.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, keepMounted: a = !1, ...o } = e, s = rD(), c = s.checked || s.indeterminate, { mounted: l, transitionStatus: u, setMounted: d } = Jp(c), f = fD.useRef(null), p = {
			...s,
			transitionStatus: u
		};
		im({
			batch: !0,
			enabled: !c,
			open: c,
			ref: f,
			onComplete() {
				c || d(!1);
			}
		});
		let m = {
			...ZE(s),
			...bc
		}, h = a || l, g = xa("span", e, {
			ref: [t, f],
			state: p,
			stateAttributesMapping: m,
			props: o
		});
		return h ? g : null;
	});
})), hD = o((() => {
	dD(), mD();
})), gD = o((() => {
	hD(), XE(), xc();
}));
// src/components/ui/checkbox.tsx
function _D({ className: e, ...t }) {
	return /* @__PURE__ */ (0, vD.jsx)(uD, {
		"data-slot": "checkbox",
		className: _s("inline-flex size-4 shrink-0 items-center justify-center rounded border border-input bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground", e),
		...t,
		children: /* @__PURE__ */ (0, vD.jsx)(pD, { children: /* @__PURE__ */ (0, vD.jsx)(we, { className: "size-3" }) })
	});
}
var vD, yD = o((() => {
	gD(), Dr(), vs(), vD = bs();
}));
// node_modules/@base-ui/utils/useOnFirstRender.mjs
function bD(e) {
	let t = xD.useRef(!0);
	t.current && (t.current = !1, e());
}
var xD, SD = o((() => {
	xD = /* @__PURE__ */ u(b(), 1);
}));
// node_modules/@base-ui/react/select/root/SelectRootContext.mjs
function CD() {
	let e = TD.useContext(ED);
	if (e === void 0) throw Error(Pi(60));
	return e;
}
function wD() {
	let e = TD.useContext(DD);
	if (e === void 0) throw Error(Pi(61));
	return e;
}
var TD, ED, DD, OD = o((() => {
	Fi(), TD = /* @__PURE__ */ u(b(), 1), ED = /*#__PURE__*/ TD.createContext(void 0), DD = /*#__PURE__*/ TD.createContext(void 0);
}));
// node_modules/@base-ui/utils/areArraysEqual.mjs
function kD(e, t, n = Object.is) {
	let { length: r } = e;
	if (r !== t.length) return !1;
	for (let i = 0; i < r; i += 1) if (!n(e[i], t[i])) return !1;
	return !0;
}
var AD = o((() => {}));
// node_modules/@base-ui/react/internals/itemEquality.mjs
function jD(e, t, n) {
	return e == null || t == null ? Object.is(e, t) : n(e, t);
}
function MD(e, t, n) {
	return Array.isArray(e) && Array.isArray(t) ? !kD(e, t, (e, t) => jD(e, t, n)) : e !== t;
}
function ND(e, t, n) {
	return e ? e.some((e) => e !== void 0 && jD(t, e, n)) : !1;
}
function PD(e, t, n) {
	return e ? e.findIndex((e) => e !== void 0 && jD(e, t, n)) : -1;
}
function FD(e, t) {
	if (t !== zD) return (n) => ND(e, n, t);
	let n = new Set(e);
	return n.delete(void 0), (t) => n.has(t) && (t !== 0 || e.some((e) => Object.is(t, e)));
}
function ID(e, t, n, r) {
	let i = r && Array.isArray(t) ? e.findIndex(FD(t, n)) : PD(e, t, n);
	return i === -1 ? null : i;
}
function LD(e, t, n, r, i, a) {
	return ND(r, t, i) ? a != null && e > a && ND(r, n[a], i) ? a : e : e === a ? ID(n, r, i, !0) : a;
}
function RD(e, t, n) {
	return e.filter((e) => !jD(t, e, n));
}
var zD, BD = o((() => {
	AD(), zD = (e, t) => Object.is(e, t);
})), VD, HD = o((() => {
	BD(), Qw(), VD = {
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
			return t == null ? !1 : n && Array.isArray(t) ? t.length > 0 : qw(t, r) !== "";
		},
		hasNullItemLabel: (e, t) => t ? Gw(e.items) : !1,
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
			return e.multiple ? Array.isArray(r) && r.some((e) => jD(t, e, n)) : jD(t, r, n);
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
function UD(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
	return Math.max(t, Math.min(e, n));
}
var WD = o((() => {}));
// node_modules/@base-ui/react/utils/scrollEdges.mjs
function GD(e, t) {
	return Math.max(0, e - t);
}
function KD(e, t) {
	if (t <= 0) return 0;
	let n = UD(e, 0, t), r = n, i = t - n, a = r <= 1, o = i <= 1;
	return a && o ? r <= i ? 0 : t : a ? 0 : o ? t : n;
}
var qD = o((() => {
	WD();
}));
// node_modules/@base-ui/react/select/root/SelectRoot.mjs
function JD(e) {
	let { id: t, value: n, defaultValue: r = null, onValueChange: i, open: a, defaultOpen: o = !1, onOpenChange: s, name: c, form: l, autoComplete: u, disabled: d = !1, readOnly: f = !1, required: p = !1, modal: m = !0, actionsRef: h, inputRef: g, onOpenChangeComplete: _, items: v, multiple: y = !1, itemToStringLabel: b, itemToStringValue: x, isItemEqualToValue: S = zD, highlightItemOnHover: C = !0, children: w } = e, { clearErrors: T } = rb(), { setDirty: E, setTouched: D, setFocused: O, validityData: k, setFilled: A, name: j, disabled: M, validation: N, validationMode: P } = Qy(), F = gb({ id: t }), I = M || d, L = j ?? c, [R, ee] = Sx({
		controlled: n,
		default: y ? r ?? fa : r,
		name: "Select",
		state: "value"
	}), [z, B] = Sx({
		controlled: a,
		default: o,
		name: "Select",
		state: "open"
	}), V = YD.useRef([]), te = YD.useRef([]), ne = YD.useRef(null), H = YD.useRef(null), re = YD.useRef(0), U = YD.useRef(null), ie = YD.useRef([]), W = YD.useRef(!1), ae = YD.useRef(null), oe = YD.useRef(null), se = YD.useRef({
		allowSelectedMouseUp: !1,
		allowUnselectedMouseUp: !1,
		dragY: 0
	}), ce = YD.useRef(!1), le = YD.useRef(R), { openMethod: ue, triggerProps: de } = Hv(z), fe = ri(() => new nh({
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
		popupProps: pa,
		triggerProps: pa,
		itemRoot: {
			props: pa,
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
		setValue: da,
		setOpen: da,
		handleScrollArrowVisibility: da,
		onOpenChangeComplete: da,
		listRef: V,
		popupRef: ne,
		scrollHandlerRef: H,
		scrollArrowsMountedCountRef: re,
		valueRef: U,
		valuesRef: ie,
		labelsRef: te,
		typingRef: W,
		selectionRef: se,
		firstItemTextRef: ae,
		selectedItemTextRef: oe,
		alignItemWithTriggerActiveRef: ce,
		initialValueRef: le
	}, VD)).current, [pe, me] = YD.useState(!1), { mounted: he, transitionStatus: ge, forceUnmount: _e } = sm({
		open: z,
		ref: ne,
		preventUnmountOnClose: pe,
		setPreventUnmountOnClose: me,
		onUnmount() {
			fe.update({
				activeIndex: null,
				openMethod: null,
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			}), _?.(!1);
		}
	}), ve = fe.useState("activeIndex"), ye = fe.useState("selectedIndex"), be = fe.useState("triggerElement"), xe = fe.useState("positionerElement"), Se = Mw(ue), Ce = ue ?? Se, we = YD.useMemo(() => y ? "" : qw(R, x), [
		y,
		R,
		x
	]), Te = YD.useMemo(() => y && Array.isArray(R) ? R.map((e) => qw(e, x)) : qw(R, x), [
		y,
		R,
		x
	]);
	Tb(Zu(be), F, R, G(() => Te), !I, c);
	let Ee = y ? Array.isArray(R) && R.length > 0 : R != null && we !== "";
	K(() => {
		A(Ee);
	}, [Ee, A]), K(function() {
		let e = ID(ie.current, R, S, y);
		e === null && (oe.current = null), z || fe.set("selectedIndex", e);
	}, [
		y,
		z,
		R,
		S,
		fe
	]), Rv(R, () => {
		T(L), E(MD(R, k.initialValue, S)), N.change(R);
	});
	let De = G((e, t) => {
		let n = t, r = gm(n);
		s?.(e, n), t.isCanceled || (e || me(r()), B(e), e || t.reason !== "focus-out" && t.reason !== "outside-press" || (D(!0), O(!1), P === "onBlur" && N.commit(R)));
	});
	YD.useImperativeHandle(h, () => ({
		unmount: _e,
		close: () => {
			fe.state.open && De(!1, Uc(ll));
		}
	}), [
		_e,
		De,
		fe
	]);
	let Oe = G((e, t) => {
		i?.(e, t), t.isCanceled || ee(e);
	}), ke = G((e) => {
		let t = GD(e.scrollHeight, e.clientHeight), n = KD(e.scrollTop, t), r = n > 0, i = n < t;
		fe.set("scrollUpArrowVisible", r), fe.set("scrollDownArrowVisible", i);
	}), Ae = Ch({
		open: z,
		onOpenChange: De,
		elements: {
			reference: be,
			floating: xe
		}
	}), je = jp(Ae, {
		enabled: !I,
		event: "mousedown"
	}), Me = Vp(Ae), Ne = Yh(Ae, {
		enabled: !I,
		listRef: V,
		activeIndex: ve,
		selectedIndex: ye,
		disabledIndices: fa,
		onNavigate(e) {
			(e !== null || z) && fe.set("activeIndex", e);
		},
		focusItemOnHover: C
	}), Pe = Qh(Ae, {
		enabled: !I && (z || !f && !y),
		listRef: te,
		activeIndex: ve,
		selectedIndex: ye,
		disabledIndices: (e) => Rw(V.current[e]),
		onMatch(e) {
			z ? fe.set("activeIndex", e) : Oe(ie.current[e], Uc(Kc));
		},
		onTyping(e) {
			W.current = e;
		}
	}), Fe = YD.useMemo(() => _i(Pe.reference, Ne.reference, Me.reference, je.reference, de), [
		je.reference,
		Pe.reference,
		Ne.reference,
		Me.reference,
		de
	]), Ie = YD.useMemo(() => _i(Tm, Pe.floating, Ne.floating, Me.floating), [
		Pe.floating,
		Ne.floating,
		Me.floating
	]), Le = Ne.item ?? pa, Re = YD.useMemo(() => ({
		props: Le,
		multiple: y,
		disabled: I,
		readOnly: f,
		isItemEqualToValue: S
	}), [
		Le,
		y,
		I,
		f,
		S
	]);
	fe.useContextCallback("setValue", Oe), fe.useContextCallback("setOpen", De), fe.useContextCallback("handleScrollArrowVisibility", ke), fe.useContextCallback("onOpenChangeComplete", _), bD(() => {
		fe.update({
			popupProps: Ie,
			triggerProps: Fe,
			itemRoot: Re
		});
	}), fe.useSyncedValues({
		id: F,
		modal: m,
		multiple: y,
		disabled: I,
		readOnly: f,
		required: p,
		highlightItemOnHover: C,
		value: R,
		open: z,
		mounted: he,
		transitionStatus: ge,
		popupProps: Ie,
		triggerProps: Fe,
		itemRoot: Re,
		items: v,
		itemToStringLabel: b,
		itemToStringValue: x,
		isItemEqualToValue: S,
		openMethod: Ce
	});
	let ze = Qi(g, N.inputRef), Be = y ? void 0 : L, Ve = YD.useMemo(() => !y || !Array.isArray(R) || !L ? null : R.map((e) => {
		let t = qw(e, x);
		return /*#__PURE__*/ (0, XD.jsx)("input", {
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
	return /*#__PURE__*/ (0, XD.jsxs)(ED.Provider, {
		value: fe,
		children: [
			/*#__PURE__*/ (0, XD.jsx)(DD.Provider, {
				value: Ae,
				children: w
			}),
			/*#__PURE__*/ (0, XD.jsx)("input", {
				...N.getValidationProps(I, {
					onFocus() {
						fe.state.triggerElement?.focus({ focusVisible: !0 });
					},
					onChange(e) {
						if (e.nativeEvent.defaultPrevented || I || f) return;
						let t = e.currentTarget.value, n = Uc(Kc, e.nativeEvent);
						function r() {
							if (y) return;
							let e = t.toLowerCase(), r = ie.current.findIndex((t) => qw(t, x).toLowerCase() === e || Kw(t, b).toLowerCase() === e);
							r === -1 && (r = ie.current.findIndex((t, n) => {
								let r = te.current[n];
								return r != null && r.toLowerCase() === e;
							}));
							let i = ie.current[r];
							i != null && Oe(i, n);
						}
						fe.set("forceMount", !0), queueMicrotask(r);
					}
				}),
				id: F && Be == null ? `${F}-hidden-input` : void 0,
				form: l,
				name: Be,
				autoComplete: u,
				value: we,
				disabled: I,
				required: p && !(y && Ee),
				readOnly: f,
				ref: ze,
				style: L ? cd : sd,
				tabIndex: -1,
				"aria-hidden": !0,
				suppressHydrationWarning: !0
			}),
			Ve
		]
	});
}
var YD, XD, ZD = o((() => {
	YD = /* @__PURE__ */ u(b(), 1), ld(), ia(), oi(), SD(), Pw(), zw(), wx(), mi(), di(), $u(), ah(), ma(), y_(), OD(), nb(), Eb(), vb(), lm(), HD(), Gc(), fl(), Em(), ob(), Qw(), BD(), Bv(), Wv(), qD(), Sh(), Mi(), Uy(), XD = bs();
}));
// node_modules/@base-ui/react/utils/resolveAriaLabelledBy.mjs
function QD(e, t) {
	return e ?? t;
}
var $D = o((() => {})), eO, tO = o((() => {
	Rc(), eO = "data-popup-side";
})), nO, rO, iO, aO, oO = o((() => {
	nO = /* @__PURE__ */ u(b(), 1), Wi(), Il(), $u(), OD(), nb(), wb(), ub(), Rc(), Zy(), Aa(), fw(), oh(), Mi(), Hc(), Gc(), fl(), vb(), $D(), tO(), rO = 400, iO = {
		...Fc,
		...Xy,
		popupSide: (e) => e ? { [eO]: e } : null,
		value: () => null
	}, aO = /*#__PURE__*/ nO.forwardRef(function(e, t) {
		let { render: n, className: r, id: i, disabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { setTouched: l, validationMode: u, validation: d, state: f, disabled: p } = Qy(), { labelId: m } = sb(), h = CD(), g = h.useState("readOnly"), _ = h.useState("required"), v = h.useState("disabled"), y = p || v || a, b = h.useState("open"), x = h.useState("mounted"), S = h.useState("value"), C = h.useState("triggerProps"), w = h.useState("positionerElement"), T = h.useState("listElement"), E = h.useState("popupSide"), D = h.useState("id"), O = h.useState("labelId"), k = h.useState("hasSelectedValue"), A = x && w ? E : null, j = i ?? D, M = QD(m, O);
		gb({ id: i });
		let N = Zu(w), P = nO.useRef(null), F = Cb(y, P), { getButtonProps: I, buttonRef: L } = qi({
			disabled: y,
			native: o
		}), R = h.useStateSetter("triggerElement"), ee = Nl(), z = Nl(), B = Nl();
		nO.useEffect(() => {
			if (b) return B.start(rO, () => {
				h.context.selectionRef.current.allowUnselectedMouseUp = !0, h.context.selectionRef.current.allowSelectedMouseUp = !0;
			}), () => {
				B.clear();
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
			B
		]);
		let V = _i(C, {
			id: j,
			role: "combobox",
			"aria-expanded": b,
			"aria-haspopup": "listbox",
			"aria-controls": b ? T?.id ?? Mu(w)?.id : void 0,
			"aria-labelledby": M,
			"aria-readonly": g || void 0,
			"aria-required": _ || void 0,
			tabIndex: y ? -1 : 0,
			onFocus(e) {
				F(!0), b && h.context.alignItemWithTriggerActiveRef.current && h.context.setOpen(!1, Uc(Kc, e.nativeEvent)), ee.start(0, () => {
					h.set("forceMount", !0);
				});
			},
			onBlur(e) {
				fu(w, e.relatedTarget) || (l(!0), F(!1), u === "onBlur" && d.commit(S));
			},
			onMouseDown(e) {
				if (b) return;
				let t = Ui(e.currentTarget);
				function n(e) {
					if (!P.current) return;
					let t = e.target;
					fu(P.current, t) || fu(N.current, t) || lw(e, P.current) || h.context.setOpen(!1, Uc(il, e));
				}
				z.start(0, () => {
					t.addEventListener("mouseup", n, { once: !0 });
				});
			}
		}, c, I), te = d.getValidationProps(y, V);
		te.role = "combobox";
		let ne = {
			...f,
			open: b,
			disabled: y,
			value: S,
			readOnly: g,
			popupSide: A,
			placeholder: !k
		};
		return xa("button", e, {
			ref: [
				t,
				P,
				L,
				R
			],
			state: ne,
			stateAttributesMapping: iO,
			props: te
		});
	});
})), sO, cO, lO, uO = o((() => {
	sO = /* @__PURE__ */ u(b(), 1), Aa(), OD(), Qw(), cO = { value: () => null }, lO = /*#__PURE__*/ sO.forwardRef(function(e, t) {
		let { className: n, render: r, children: i, placeholder: a, style: o, ...s } = e, c = CD(), l = c.useState("value"), u = c.useState("items"), d = c.useState("itemToStringLabel"), f = c.useState("hasSelectedValue"), p = !f && a != null && i == null, m = c.useState("hasNullItemLabel", p), h = {
			value: l,
			placeholder: !f
		}, g = null;
		return g = typeof i == "function" ? i(l) : i ?? (p && !m ? a : Array.isArray(l) ? Yw(l, u, d) : Jw(l, u, d)), xa("span", e, {
			state: h,
			ref: [t, c.context.valueRef],
			props: [{ children: g }, s],
			stateAttributesMapping: cO
		});
	});
})), dO, fO, pO = o((() => {
	dO = /* @__PURE__ */ u(b(), 1), Aa(), OD(), Rc(), fO = /*#__PURE__*/ dO.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, ...a } = e;
		return xa("span", e, {
			state: { open: CD().useState("open") },
			ref: t,
			props: [{
				"aria-hidden": !0,
				children: "▼"
			}, a],
			stateAttributesMapping: Pc
		});
	});
})), mO, hO, gO, _O = o((() => {
	mO = /* @__PURE__ */ u(b(), 1), y_(), OD(), hO = bs(), gO = /*#__PURE__*/ mO.forwardRef(function(e, t) {
		let n = CD(), r = n.useState("mounted"), i = n.useState("forceMount");
		return r || i ? /*#__PURE__*/ (0, hO.jsx)(tp, {
			ref: t,
			...e
		}) : null;
	});
}));
// node_modules/@base-ui/react/select/positioner/SelectPositionerContext.mjs
function vO() {
	let e = yO.useContext(bO);
	if (!e) throw Error(Pi(59));
	return e;
}
var yO, bO, xO = o((() => {
	Fi(), yO = /* @__PURE__ */ u(b(), 1), bO = /*#__PURE__*/ yO.createContext(void 0);
}));
// node_modules/@base-ui/react/select/popup/utils.mjs
function SO(e, t) {
	e && Object.assign(e.style, t);
}
var CO, wO = o((() => {
	CO = {
		position: "relative",
		maxHeight: "100%",
		overflowX: "hidden",
		overflowY: "auto"
	};
})), TO, EO, DO, OO, kO = o((() => {
	TO = /* @__PURE__ */ u(b(), 1), Y_(), mi(), di(), OD(), EC(), gC(), xO(), $_(), qf(), wO(), Gc(), fl(), BD(), jC(), FC(), EO = bs(), DO = { position: "fixed" }, OO = /*#__PURE__*/ TO.forwardRef(function(e, t) {
		let { anchor: n, className: r, render: i, positionMethod: a, side: o, align: s, sideOffset: c, alignOffset: l, collisionBoundary: u = "clipping-ancestors", collisionPadding: d, arrowPadding: f, sticky: p, disableAnchorTracking: m, alignItemWithTrigger: h = !0, collisionAvoidance: g = Wf, style: _, ...v } = e, y = CD(), b = wD(), x = y.useState("open"), S = y.useState("mounted"), C = y.useState("modal"), w = y.useState("value"), T = y.useState("openMethod"), E = y.useState("positionerElement"), D = y.useState("triggerElement"), O = y.useState("isItemEqualToValue"), k = y.useState("transitionStatus"), A = TO.useRef(null), j = TO.useRef(null), [M, N] = TO.useState(h), P = S && M && T !== "touch";
		!S && M !== h && N(h), TO.useImperativeHandle(y.context.alignItemWithTriggerActiveRef, () => P), MC((P || C) && x, T === "touch", E, D);
		let F = uC({
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
		}), I = P ? "none" : F.side, L = P ? DO : F.positionerStyles, R = {
			open: x,
			side: I,
			align: F.align,
			anchorHidden: F.anchorHidden
		};
		K(() => {
			y.set("popupSide", F.side);
		}, [y, F.side]);
		let ee = AC(e, R, {
			styles: L,
			transitionStatus: k,
			props: v,
			refs: [t, y.useStateSetter("positionerElement")],
			hidden: !S,
			inert: !x
		}), z = TO.useRef(0), B = G((e) => {
			if (y.context.valuesRef.current.length === 0) return;
			let t = z.current;
			z.current = e.size;
			let n = Uc(Kc);
			if (t !== 0 && !y.state.multiple && w !== null && PD(y.context.valuesRef.current, w, O) === -1) {
				let e = y.context.initialValueRef.current, t = e != null && PD(y.context.valuesRef.current, e, O) !== -1 ? e : null;
				y.context.setValue(t, n), t === null && (y.set("selectedIndex", null), y.context.selectedItemTextRef.current = null);
			}
			if (t !== 0 && y.state.multiple && Array.isArray(w)) {
				let e = w.filter((e) => PD(y.context.valuesRef.current, e, O) !== -1);
				e.length !== w.length && (y.context.setValue(e, n), e.length === 0 && (y.set("selectedIndex", null), y.context.selectedItemTextRef.current = null));
			}
			if (x && P) {
				y.update({
					scrollUpArrowVisible: !1,
					scrollDownArrowVisible: !1
				});
				let e = { height: "" };
				SO(E, e), SO(y.context.popupRef.current, e);
			}
		}), V = TO.useMemo(() => ({
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
		return /*#__PURE__*/ (0, EO.jsx)(_C, {
			elementsRef: y.context.listRef,
			labelsRef: y.context.labelsRef,
			onMapChange: B,
			children: /*#__PURE__*/ (0, EO.jsxs)(bO.Provider, {
				value: V,
				children: [S && C && /*#__PURE__*/ (0, EO.jsx)(Q_, {
					inert: J_(!x),
					cutout: D
				}), ee]
			})
		});
	});
})), AO, jO, MO, NO = o((() => {
	AO = bs(), jO = "base-ui-disable-scrollbar", MO = {
		className: jO,
		getElement(e) {
			return /*#__PURE__*/ (0, AO.jsx)("style", {
				nonce: e,
				href: jO,
				precedence: "base-ui:low",
				children: `.${jO}{scrollbar-width:none}.${jO}::-webkit-scrollbar{display:none}`
			});
		}
	};
}));
// node_modules/@base-ui/react/internals/csp-context/CSPContext.mjs
function PO() {
	return FO.useContext(IO) ?? LO;
}
var FO, IO, LO, RO = o((() => {
	FO = /* @__PURE__ */ u(b(), 1), IO = /*#__PURE__*/ FO.createContext(void 0), LO = { disableStyleElements: !1 };
})), zO, BO = o((() => {
	zO = "--transform-origin";
}));
// node_modules/@base-ui/react/select/popup/SelectPopup.mjs
function VO(e) {
	let t = e.maxHeight;
	return t.endsWith("px") && parseFloat(t) || Infinity;
}
function HO(e) {
	return GD(e.scrollHeight, e.clientHeight);
}
function UO(e) {
	return Xg.getScale(e);
}
function WO(e, t, n) {
	return e / n[t];
}
function GO(e, t) {
	return Ad({
		x: WO(e.x, "x", t),
		y: WO(e.y, "y", t),
		width: WO(e.width, "x", t),
		height: WO(e.height, "y", t)
	});
}
function KO(e) {
	let { style: t } = e, n = {};
	for (let [e, r] of ZO) n[e] = t.getPropertyValue(e), t.setProperty(e, r, "important");
	return () => {
		for (let [e] of ZO) {
			let r = n[e];
			r ? t.setProperty(e, r) : t.removeProperty(e);
		}
	};
}
var qO, JO, YO, XO, ZO, QO = o((() => {
	qO = /* @__PURE__ */ u(b(), 1), Vd(), Ju(), ru(), di(), Wi(), mi(), ad(), WD(), y_(), OD(), Rc(), xO(), NO(), xc(), om(), Aa(), wO(), Gc(), fl(), pS(), L_(), hS(), qD(), RO(), JS(), BO(), JO = bs(), YO = {
		...Ic,
		...bc
	}, XO = /*#__PURE__*/ qO.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, finalFocus: a, ...o } = e, s = CD(), c = s.useState("multiple"), l = s.useState("readOnly"), u = s.useState("highlightItemOnHover"), d = wD(), { side: f, align: p, alignItemWithTriggerActive: m, isPositioned: h, setControlledAlignItemWithTrigger: g } = vO(), _ = uS(!0) != null, v = GS(), { nonce: y, disableStyleElements: b } = PO(), x = s.useState("id"), S = s.useState("open"), C = s.useState("openMethod"), w = s.useState("mounted"), T = s.useState("popupProps"), E = s.useState("transitionStatus"), D = s.useState("triggerElement"), O = s.useState("positionerElement"), k = s.useState("listElement"), A = qO.useRef(!1), j = qO.useRef(!1), M = qO.useRef({}), N = ed(), P = G((e) => {
			if (!O || !s.context.popupRef.current || !j.current) return;
			let t = O.style.top === "0px", n = O.style.bottom === "0px";
			if (A.current || !m || !t && !n) {
				s.context.handleScrollArrowVisibility(e);
				return;
			}
			let r = UO(O), i = WO(O.getBoundingClientRect().height, "y", r), a = Ui(O), o = Ar(O), c = o.getComputedStyle(O), l = parseFloat(c.marginTop), u = parseFloat(c.marginBottom), d = VO(o.getComputedStyle(s.context.popupRef.current)), f = Math.min(a.documentElement.clientHeight - l - u, d), p = e.scrollTop, h = HO(e), g = null, _ = (e) => {
				O.style.height = `${e}px`;
			}, v = t ? h - p : p, y = Math.min(i + v, f);
			if (v <= 1) {
				let n = UD(v, 0, f - i);
				n > 0 && _(i + n), e.scrollTop = t ? h : 0, f - (i + n) <= 1 && (A.current = !0), s.context.handleScrollArrowVisibility(e);
				return;
			}
			f - y > 1 ? g = t ? Infinity : 0 : n && p < h && (g = p - (v - (i + v - f)));
			let b = Math.ceil(y);
			if (b !== 0 && _(b), g != null) {
				let t = UD(g, 0, HO(e));
				Math.abs(e.scrollTop - t) > 1 && (e.scrollTop = t);
			}
			b >= f - 1 && (A.current = !0), s.context.handleScrollArrowVisibility(e);
		});
		qO.useImperativeHandle(s.context.scrollHandlerRef, () => P, [P]), im({
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
		K(() => {
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
		}, [s, O]), K(() => {
			S || m || (j.current = !1, A.current = !1, SO(O, M.current));
		}, [
			S,
			m,
			O
		]), K(() => {
			let e = s.context.popupRef.current;
			if (!S || !D || !O || !e || m && !h || s.state.transitionStatus === "ending") return;
			if (j.current = !0, e.style.removeProperty(zO), !m) {
				N.request(() => s.context.handleScrollArrowVisibility(k || e));
				return;
			}
			let t = KO(e);
			try {
				let t = s.context.selectedItemTextRef.current;
				t?.isConnected || (t = !s.select("hasSelectedValue") && s.context.firstItemTextRef.current?.isConnected ? s.context.firstItemTextRef.current : null);
				let n = s.context.valueRef.current, r = Ar(O), i = r.getComputedStyle(O), a = r.getComputedStyle(e), o = Ui(D), c = UO(D), l = GO(D.getBoundingClientRect(), c), d = GO(O.getBoundingClientRect(), c), f = l.height, p = k || e, m = p.scrollHeight, h = parseFloat(a.borderBottomWidth), _ = parseFloat(i.marginTop) || 10, y = parseFloat(i.marginBottom) || 10, b = parseFloat(i.minHeight) || 100, x = VO(a), S = o.documentElement.clientHeight - _ - y, C = o.documentElement.clientWidth, w = S - l.bottom + f, T, E = v === "rtl" ? l.right - d.width : l.left, j = 0;
				if (t && n) {
					let e = GO(n.getBoundingClientRect(), c);
					T = GO(t.getBoundingClientRect(), c), E = d.left + (v === "rtl" ? e.right - T.right : e.left - T.left);
					let r = e.top - l.top + e.height / 2;
					j = T.top - d.top + T.height / 2 - r;
				}
				let N = w + j + y + h, P = Math.min(S, N), F = S - _ - y, I = N - P, L = C - 5;
				O.style.left = `${UD(E, 5, L - d.width)}px`, O.style.height = `${P}px`, O.style.maxHeight = "none", O.style.marginTop = `${_}px`, O.style.marginBottom = `${y}px`, e.style.height = "100%";
				let R = HO(p), ee = I >= R - 1;
				ee && (P = Math.min(S, d.height) - (I - R));
				let z = l.top < 20 || l.bottom > S - 20 || Math.ceil(P) + 1 < Math.min(m, b), B = (r.visualViewport?.scale ?? 1) !== 1 && Xl;
				if (z || B) {
					SO(O, M.current), g(!1);
					return;
				}
				let V = Math.max(b, P);
				if (ee) {
					let e = Math.max(0, S - N);
					O.style.top = d.height >= F ? "0" : `${e}px`, O.style.height = `${P}px`, p.scrollTop = HO(p);
				} else O.style.bottom = "0", p.scrollTop = I;
				if (T) {
					let t = d.top, n = d.height, r = T.top + T.height / 2, i = UD(n > 0 ? (r - t) / n * 100 : 50, 0, 100);
					e.style.setProperty(zO, `50% ${i}%`);
				}
				(V === S || P >= x) && (A.current = !0), s.context.handleScrollArrowVisibility(p), u && s.state.selectedIndex === null && s.state.activeIndex === null && s.context.listRef.current[0] != null && s.set("activeIndex", 0);
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
		]), qO.useEffect(() => {
			if (!m || !O || !S) return;
			let e = Ar(O);
			function t(e) {
				s.context.setOpen(!1, Uc(ul, e));
			}
			return qu(e, "resize", t);
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
				_ && P_.has(e.key) && e.stopPropagation();
			},
			onScroll(e) {
				k || P(e.currentTarget);
			},
			...m && { style: k ? { height: "100%" } : CO },
			className: !k && m ? MO.className : void 0
		}, L = xa("div", e, {
			ref: [t, s.context.popupRef],
			state: F,
			stateAttributesMapping: YO,
			props: [
				T,
				I,
				mS(E),
				o
			]
		});
		return /*#__PURE__*/ (0, JO.jsxs)(qO.Fragment, { children: [!b && MO.getElement(y), /*#__PURE__*/ (0, JO.jsx)(Tp, {
			context: d,
			modal: !1,
			disabled: !w,
			openInteractionType: C,
			returnFocus: a,
			restoreFocus: !0,
			children: L
		})] });
	}), ZO = [
		["transform", "none"],
		["scale", "1"],
		["translate", "0 0"]
	];
})), $O, ek, tk = o((() => {
	$O = /* @__PURE__ */ u(b(), 1), OD(), xO(), Aa(), NO(), wO(), ek = /*#__PURE__*/ $O.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, ...a } = e, o = CD(), s = o.useState("multiple"), c = o.useState("readOnly"), { alignItemWithTriggerActive: l } = vO(), u = o.useState("hasScrollArrows"), d = o.useState("openMethod"), f = {
			id: `${o.useState("id")}-list`,
			role: "listbox",
			"aria-multiselectable": s || void 0,
			"aria-readonly": c || void 0,
			onScroll(e) {
				o.context.scrollHandlerRef.current?.(e.currentTarget);
			},
			...l && { style: CO },
			className: u && d !== "touch" ? MO.className : void 0
		};
		return xa("div", e, {
			ref: [t, o.useStateSetter("listElement")],
			props: [f, a]
		});
	});
}));
// node_modules/@base-ui/react/select/item/SelectItemContext.mjs
function nk() {
	let e = rk.useContext(ik);
	if (!e) throw Error(Pi(57));
	return e;
}
var rk, ik, ak = o((() => {
	Fi(), rk = /* @__PURE__ */ u(b(), 1), ik = /*#__PURE__*/ rk.createContext(void 0);
})), ok, sk, ck, lk = o((() => {
	ok = /* @__PURE__ */ u(b(), 1), mi(), OD(), Kx(), Aa(), ak(), Hc(), Gc(), fl(), BD(), uu(), sk = bs(), ck = /*#__PURE__*/ ok.memo(/*#__PURE__*/ ok.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, value: a = null, label: o, disabled: s = !1, nativeButton: c = !1, ...l } = e, u = ok.useRef(null), d = Wx({
			guess: !0,
			label: o,
			textRef: u
		}), f = CD(), { props: p, multiple: m, disabled: h, readOnly: g, isItemEqualToValue: _ } = f.useState("itemRoot"), v = h || s, y = f.useState("isActive", d.index), b = f.useState("open"), x = f.useState("isSelected", a), S = f.useState("isSelectedByFocus", d.index), C = d.index, w = ok.useRef(null);
		K(() => {
			let e = f.context.valuesRef.current;
			return e[C] = a, () => {
				delete e[C];
			};
		}, [
			C,
			a,
			f
		]), K(() => {
			let e = f.state.value, t = f.state.selectedIndex, n = t, r;
			m && Array.isArray(e) ? (n = LD(C, a, f.context.valuesRef.current, e, _, t), r = n === C, C === t && !r && (f.context.selectedItemTextRef.current = null)) : (r = e !== void 0 && jD(a, e, _), r && (n = C)), f.set("selectedIndex", n), r && u.current && (f.context.selectedItemTextRef.current = u.current);
		}, [
			C,
			m,
			_,
			f,
			a
		]);
		let T = ok.useRef("mouse"), E = ok.useRef(!1), { getButtonProps: D, buttonRef: O } = qi({
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
				let n = Array.isArray(t) ? t : [], r = x ? RD(n, a, _) : [...n, a];
				f.context.setValue(r, Uc(Zc, e));
			} else f.context.setValue(a, Uc(Zc, e)), f.context.setOpen(!1, Uc(Zc, e));
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
				let t = T.current !== "touch", n = e.nativeEvent.pointerType, r = t && ou(e.nativeEvent) && (n !== void 0 || y), i = t && !r && !E.current;
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
		}, N = xa("div", e, {
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
		}), P = ok.useMemo(() => ({
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
		return /*#__PURE__*/ (0, sk.jsx)(ik.Provider, {
			value: P,
			children: N
		});
	}));
})), uk, dk, fk = o((() => {
	uk = /* @__PURE__ */ u(b(), 1), Xp(), om(), Aa(), xc(), dk = /*#__PURE__*/ uk.memo(/*#__PURE__*/ uk.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, keepMounted: a, selected: o, ...s } = e, c = uk.useRef(null), { transitionStatus: l, setMounted: u } = Jp(o), d = xa("span", e, {
			ref: [t, c],
			state: {
				selected: o,
				transitionStatus: l
			},
			props: [{
				"aria-hidden": !0,
				children: "✔️"
			}, s],
			stateAttributesMapping: bc
		});
		return im({
			batch: !0,
			enabled: !o,
			open: o,
			ref: c,
			onComplete() {
				o || u(!1);
			}
		}), d;
	}));
})), pk, mk, hk, gk = o((() => {
	pk = /* @__PURE__ */ u(b(), 1), ak(), fk(), mk = bs(), hk = /*#__PURE__*/ pk.forwardRef(function(e, t) {
		let { selected: n } = nk();
		return e.keepMounted || n ? /*#__PURE__*/ (0, mk.jsx)(dk, {
			...e,
			selected: n,
			ref: t
		}) : null;
	});
})), _k, vk, yk = o((() => {
	_k = /* @__PURE__ */ u(b(), 1), OD(), ak(), Aa(), vk = /*#__PURE__*/ _k.memo(/*#__PURE__*/ _k.forwardRef(function(e, t) {
		let { index: n, textRef: r, selectedByFocus: i } = nk(), a = CD(), { render: o, className: s, style: c, ...l } = e;
		return xa("div", e, {
			ref: [
				_k.useCallback((e) => {
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
function bk(e, t, n, r, i, a) {
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
		return o < t && s ? KD(s.offsetTop - i, a) : 0;
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
	return c > o && l ? KD(l.offsetTop + l.offsetHeight - r + i, a) : a;
}
var xk, Sk, Ck = o((() => {
	xk = /* @__PURE__ */ u(b(), 1), Il(), mi(), OD(), xO(), Xp(), om(), Aa(), xc(), qD(), Sk = /*#__PURE__*/ xk.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, direction: a, keepMounted: o, ...s } = e, c = a === "up", l = CD(), { side: u, scrollDownArrowRef: d, scrollUpArrowRef: f } = vO(), p = c ? "scrollUpArrowVisible" : "scrollDownArrowVisible", m = l.useState(p), h = l.useState("openMethod"), g = m && h !== "touch", _ = Nl(), v = c ? f : d, { mounted: y, transitionStatus: b, setMounted: x } = Jp(g);
		K(() => (l.context.scrollArrowsMountedCountRef.current += 1, l.set("hasScrollArrows", !0), () => {
			l.context.scrollArrowsMountedCountRef.current = Math.max(0, l.context.scrollArrowsMountedCountRef.current - 1), l.context.scrollArrowsMountedCountRef.current === 0 && l.set("hasScrollArrows", !1);
		}), [l]), im({
			open: g,
			ref: v,
			onComplete() {
				g || x(!1);
			}
		});
		let S = xa("div", e, {
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
						let n = GD(e.scrollHeight, e.clientHeight), r = KD(e.scrollTop, n), i = r === (c ? 0 : n), a = l.context.listRef.current;
						if (r !== e.scrollTop && (e.scrollTop = r), i) _.clear();
						else {
							if (a.length > 0) {
								let t = v.current?.offsetHeight || 0;
								e.scrollTop = bk(a, c, r, e.clientHeight, t, n);
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
			stateAttributesMapping: bc
		});
		return y || o ? S : null;
	});
})), wk, Tk, Ek, Dk = o((() => {
	wk = /* @__PURE__ */ u(b(), 1), Ck(), Tk = bs(), Ek = /*#__PURE__*/ wk.forwardRef(function(e, t) {
		return /*#__PURE__*/ (0, Tk.jsx)(Sk, {
			...e,
			ref: t,
			direction: "down"
		});
	});
})), Ok, kk, Ak, jk = o((() => {
	Ok = /* @__PURE__ */ u(b(), 1), Ck(), kk = bs(), Ak = /*#__PURE__*/ Ok.forwardRef(function(e, t) {
		return /*#__PURE__*/ (0, kk.jsx)(Sk, {
			...e,
			ref: t,
			direction: "up"
		});
	});
})), Mk = o((() => {
	ZD(), Aa(), nb(), Zy(), $r(), Wi(), di(), oh(), mi(), El(), ub(), OD(), oO(), uO(), pO(), _O(), Rc(), xc(), kO(), QO(), tk(), lk(), gk(), yk(), xO(), Dk(), jk(), Fi();
})), Nk = o((() => {
	Mk(), tO(), Rc(), BO(), xc();
}));
// src/components/ui/select.tsx
function Pk({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Bk.jsx)(lO, {
		"data-slot": "select-value",
		className: _s("flex flex-1 text-left", e),
		...t
	});
}
function Fk({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, Bk.jsxs)(aO, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: _s("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...r,
		children: [n, /* @__PURE__ */ (0, Bk.jsx)(fO, { render: /* @__PURE__ */ (0, Bk.jsx)(De, { className: "pointer-events-none size-4 text-muted-foreground" }) })]
	});
}
function Ik({ className: e, children: t, side: n = "bottom", sideOffset: r = 4, align: i = "center", alignOffset: a = 0, alignItemWithTrigger: o = !0, ...s }) {
	let c = Jv();
	return /* @__PURE__ */ (0, Bk.jsx)(gO, {
		container: c ?? void 0,
		children: /* @__PURE__ */ (0, Bk.jsx)(OO, {
			side: n,
			sideOffset: r,
			align: i,
			alignOffset: a,
			alignItemWithTrigger: o,
			className: "isolate z-50",
			children: /* @__PURE__ */ (0, Bk.jsxs)(XO, {
				"data-slot": "select-content",
				"data-align-trigger": o,
				className: _s("relative isolate z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-36 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...s,
				children: [
					/* @__PURE__ */ (0, Bk.jsx)(Rk, {}),
					/* @__PURE__ */ (0, Bk.jsx)(ek, { children: t }),
					/* @__PURE__ */ (0, Bk.jsx)(zk, {})
				]
			})
		})
	});
}
function Lk({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, Bk.jsxs)(ck, {
		"data-slot": "select-item",
		className: _s("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, Bk.jsx)(vk, {
			className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
			children: t
		}), /* @__PURE__ */ (0, Bk.jsx)(hk, {
			render: /* @__PURE__ */ (0, Bk.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ (0, Bk.jsx)(we, { className: "pointer-events-none" })
		})]
	});
}
function Rk({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Bk.jsx)(Ak, {
		"data-slot": "select-scroll-up-button",
		className: _s("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, Bk.jsx)(Ae, {})
	});
}
function zk({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Bk.jsx)(Ek, {
		"data-slot": "select-scroll-down-button",
		className: _s("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, Bk.jsx)(De, {})
	});
}
var Bk, Vk, Hk = o((() => {
	b(), Nk(), vs(), Qv(), Dr(), Bk = bs(), Vk = JD;
}));
// src/features/messages/messages-settings.tsx
function Uk() {
	let { inbox: e } = by(), [t, n] = (0, Wk.useState)(!1), [r, i] = (0, Wk.useState)("");
	if (!e) return /* @__PURE__ */ (0, Gk.jsx)("p", {
		className: "p-5 text-sm text-muted-foreground",
		children: "Carregando configurações…"
	});
	let a = e.settings;
	async function o(e) {
		n(!0), i("");
		try {
			e.sound && await gy(), await Q.settings(e);
		} catch (e) {
			i(e instanceof Error ? e.message : "Não foi possível salvar.");
		} finally {
			n(!1);
		}
	}
	return /* @__PURE__ */ (0, Gk.jsxs)("section", {
		className: "mx-auto w-full max-w-lg space-y-5 overflow-y-auto p-5",
		children: [
			/* @__PURE__ */ (0, Gk.jsxs)("div", { children: [/* @__PURE__ */ (0, Gk.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Configurações de mensagens"
			}), /* @__PURE__ */ (0, Gk.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Preferências da sua conta em todos os serviços."
			})] }),
			/* @__PURE__ */ (0, Gk.jsxs)("div", {
				className: "space-y-4 rounded-lg border border-border p-4",
				children: [/* @__PURE__ */ (0, Gk.jsxs)("h3", {
					className: "flex items-center gap-2 text-sm font-medium",
					children: [/* @__PURE__ */ (0, Gk.jsx)(Yn, { className: "size-4" }), "Solicitações"]
				}), /* @__PURE__ */ (0, Gk.jsxs)("label", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, Gk.jsx)(_D, {
						checked: a.autoAccept,
						disabled: t,
						onCheckedChange: (e) => void o({ autoAccept: !!e })
					}), /* @__PURE__ */ (0, Gk.jsxs)("span", {
						className: "text-sm",
						children: ["Aceitar DMs automaticamente", /* @__PURE__ */ (0, Gk.jsx)("span", {
							className: "mt-1 block text-xs text-muted-foreground",
							children: "Novas solicitações serão aceitas sem confirmação."
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, Gk.jsxs)("div", {
				className: "space-y-4 rounded-lg border border-border p-4",
				children: [
					/* @__PURE__ */ (0, Gk.jsxs)("h3", {
						className: "flex items-center gap-2 text-sm font-medium",
						children: [/* @__PURE__ */ (0, Gk.jsx)(he, { className: "size-4" }), "Notificações"]
					}),
					[
						{
							key: "notifications",
							label: "Notificações de novas mensagens",
							detail: "Mostra um aviso no canto superior direito."
						},
						{
							key: "previews",
							label: "Mostrar prévia da mensagem",
							detail: "Inclui o texto da mensagem no aviso."
						},
						{
							key: "sound",
							label: "Som de notificação",
							detail: "Toca um som curto nesta aba."
						}
					].map((e) => /* @__PURE__ */ (0, Gk.jsxs)("label", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, Gk.jsx)(_D, {
							checked: a[e.key],
							disabled: t,
							onCheckedChange: (t) => void o({ [e.key]: !!t })
						}), /* @__PURE__ */ (0, Gk.jsxs)("span", {
							className: "text-sm",
							children: [e.label, /* @__PURE__ */ (0, Gk.jsx)("span", {
								className: "mt-1 block text-xs text-muted-foreground",
								children: e.detail
							})]
						})]
					}, e.key)),
					typeof Notification < "u" && /* @__PURE__ */ (0, Gk.jsxs)("div", {
						className: "border-t border-border pt-3",
						children: [/* @__PURE__ */ (0, Gk.jsx)("p", {
							className: "mb-2 text-xs text-muted-foreground",
							children: "Avisos do navegador enquanto uma aba OrganizeOn estiver aberta."
						}), /* @__PURE__ */ (0, Gk.jsx)(Y, {
							type: "button",
							variant: "outline",
							disabled: t,
							onClick: async () => {
								a.desktop ? o({ desktop: !1 }) : await Notification.requestPermission() === "granted" ? o({ desktop: !0 }) : i("Permita notificações nas configurações do navegador para ativar esta opção.");
							},
							children: a.desktop ? "Desativar avisos do navegador" : "Ativar avisos do navegador"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, Gk.jsx)("div", {
				className: "space-y-2 rounded-lg border border-border p-4",
				children: /* @__PURE__ */ (0, Gk.jsxs)("label", {
					className: "text-sm font-medium",
					children: ["Reação com toque duplo", /* @__PURE__ */ (0, Gk.jsxs)(Vk, {
						value: a.quickReaction,
						disabled: t,
						onValueChange: (e) => {
							e && o({ quickReaction: e });
						},
						children: [/* @__PURE__ */ (0, Gk.jsx)(Fk, {
							className: "mt-2 w-full",
							children: /* @__PURE__ */ (0, Gk.jsx)(Pk, { children: a.quickReaction })
						}), /* @__PURE__ */ (0, Gk.jsx)(Ik, { children: LE.map((e) => /* @__PURE__ */ (0, Gk.jsx)(Lk, {
							value: e,
							children: e
						}, e)) })]
					})]
				})
			}),
			r && /* @__PURE__ */ (0, Gk.jsx)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: r
			})
		]
	});
}
var Wk, Gk, Kk = o((() => {
	Wk = /* @__PURE__ */ u(b(), 1), Dr(), yD(), Cs(), Hk(), Iy(), RE(), Gk = bs();
}));
// src/features/messages/requests-list.tsx
function qk({ onProfile: e }) {
	let { inbox: t } = by(), [n, r] = (0, Jk.useState)(null), [i, a] = (0, Jk.useState)(""), o = t?.requests || [];
	async function s(e, t) {
		r(e), a("");
		try {
			await Q.respond(e, t);
		} catch (e) {
			a(e instanceof Error ? e.message : "Não foi possível responder.");
		} finally {
			r(null);
		}
	}
	return /* @__PURE__ */ (0, Yk.jsxs)("section", {
		className: "mx-auto w-full max-w-2xl overflow-y-auto p-5",
		children: [
			/* @__PURE__ */ (0, Yk.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Solicitações de DM"
			}),
			/* @__PURE__ */ (0, Yk.jsx)("p", {
				className: "mb-5 mt-1 text-sm text-muted-foreground",
				children: "Escolha quem pode conversar com você."
			}),
			o.length ? /* @__PURE__ */ (0, Yk.jsx)("div", {
				className: "divide-y divide-border rounded-lg border border-border",
				children: o.map((t) => /* @__PURE__ */ (0, Yk.jsxs)("div", {
					className: "flex min-w-0 flex-wrap items-center gap-3 p-4",
					children: [
						/* @__PURE__ */ (0, Yk.jsx)("button", {
							type: "button",
							"aria-label": `Abrir perfil de ${t.peer.profile.displayName}`,
							onClick: () => e(t.peer),
							children: /* @__PURE__ */ (0, Yk.jsx)(Ry, {
								profile: t.peer.profile,
								className: "size-10"
							})
						}),
						/* @__PURE__ */ (0, Yk.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, Yk.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: t.peer.profile.displayName
								}),
								/* @__PURE__ */ (0, Yk.jsxs)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: ["@", t.peer.username]
								}),
								/* @__PURE__ */ (0, Yk.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: t.direction === "incoming" ? "Quer iniciar uma conversa." : "Aguardando resposta."
								})
							]
						}),
						/* @__PURE__ */ (0, Yk.jsx)("div", {
							className: "flex gap-2",
							children: t.direction === "incoming" ? /* @__PURE__ */ (0, Yk.jsxs)(Yk.Fragment, { children: [/* @__PURE__ */ (0, Yk.jsx)(Y, {
								type: "button",
								disabled: n === t.id,
								onClick: () => void s(t.id, "accept"),
								children: "Aceitar"
							}), /* @__PURE__ */ (0, Yk.jsx)(Y, {
								type: "button",
								variant: "outline",
								disabled: n === t.id,
								onClick: () => void s(t.id, "decline"),
								children: "Recusar"
							})] }) : /* @__PURE__ */ (0, Yk.jsx)(Y, {
								type: "button",
								variant: "outline",
								disabled: n === t.id,
								onClick: () => void s(t.id, "cancel"),
								children: "Cancelar solicitação"
							})
						})
					]
				}, t.id))
			}) : /* @__PURE__ */ (0, Yk.jsxs)("div", {
				className: "grid justify-items-center gap-3 rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground",
				children: [/* @__PURE__ */ (0, Yk.jsx)(Dt, { className: "size-7" }), /* @__PURE__ */ (0, Yk.jsx)("p", {
					className: "text-sm",
					children: "Nenhuma solicitação pendente."
				})]
			}),
			i && /* @__PURE__ */ (0, Yk.jsx)("p", {
				role: "alert",
				className: "mt-3 text-sm text-destructive",
				children: i
			})
		]
	});
}
var Jk, Yk, Xk = o((() => {
	Jk = /* @__PURE__ */ u(b(), 1), Dr(), Cs(), By(), Iy(), Yk = bs();
}));
// src/features/messages/new-conversation.tsx
function Zk() {
	let [e, t] = (0, Qk.useState)(""), [n, r] = (0, Qk.useState)(!1), [i, a] = (0, Qk.useState)("");
	return /* @__PURE__ */ (0, $k.jsxs)("section", {
		className: "mx-auto w-full max-w-md p-5",
		children: [
			/* @__PURE__ */ (0, $k.jsx)(Zt, { className: "mb-4 size-8 text-muted-foreground" }),
			/* @__PURE__ */ (0, $k.jsx)("h2", {
				className: "text-xl font-semibold",
				children: "Nova mensagem direta"
			}),
			/* @__PURE__ */ (0, $k.jsx)("p", {
				className: "mb-5 mt-2 text-sm text-muted-foreground",
				children: "Adicione uma conta pelo nome de usuário OrganizeOn."
			}),
			/* @__PURE__ */ (0, $k.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: async (t) => {
					t.preventDefault(), r(!0), a("");
					try {
						await Q.request(e.trim().replace(/^@/, ""));
					} catch (e) {
						a(e instanceof Error ? e.message : "Não foi possível enviar a solicitação.");
					} finally {
						r(!1);
					}
				},
				children: [
					/* @__PURE__ */ (0, $k.jsxs)("label", {
						className: "grid gap-1.5 text-sm",
						children: ["Nome de usuário", /* @__PURE__ */ (0, $k.jsx)(Lb, {
							autoFocus: !0,
							autoCapitalize: "none",
							autoComplete: "off",
							spellCheck: !1,
							maxLength: 33,
							value: e,
							disabled: n,
							placeholder: "@usuario",
							required: !0,
							onChange: (e) => t(e.target.value)
						})]
					}),
					i && /* @__PURE__ */ (0, $k.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: i
					}),
					/* @__PURE__ */ (0, $k.jsx)(Y, {
						type: "submit",
						disabled: n || e.replace(/^@/, "").trim().length < 3,
						children: n ? "Enviando…" : "Enviar solicitação"
					})
				]
			})
		]
	});
}
var Qk, $k, eA = o((() => {
	Qk = /* @__PURE__ */ u(b(), 1), Dr(), Cs(), zb(), Iy(), $k = bs();
}));
// src/components/admin/password-dialog.tsx
function tA({ request: e, onClose: t }) {
	let [n, r] = (0, nA.useState)(!1), [i, a] = (0, nA.useState)("");
	return /* @__PURE__ */ (0, rA.jsx)($v, {
		open: !0,
		onOpenChange: (e) => {
			!e && !n && t(!1);
		},
		children: /* @__PURE__ */ (0, rA.jsxs)(ny, {
			className: "sm:max-w-md",
			onKeyDown: (e) => {
				n && e.key === "Escape" && e.preventDefault();
			},
			children: [/* @__PURE__ */ (0, rA.jsxs)(ry, { children: [/* @__PURE__ */ (0, rA.jsx)(ay, { children: "Alterar senha" }), /* @__PURE__ */ (0, rA.jsx)(oy, { children: e.self ? "Atualize sua senha. Será necessário entrar novamente." : `Defina uma nova senha para ${e.username}.` })] }), /* @__PURE__ */ (0, rA.jsxs)("form", {
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
					/* @__PURE__ */ (0, rA.jsx)("input", {
						hidden: !0,
						readOnly: !0,
						autoComplete: "username",
						value: e.username
					}),
					e.self && /* @__PURE__ */ (0, rA.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Senha atual", /* @__PURE__ */ (0, rA.jsx)(Lb, {
							name: "currentPassword",
							type: "password",
							autoComplete: "current-password",
							required: !0,
							disabled: n
						})]
					}),
					/* @__PURE__ */ (0, rA.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Nova senha", /* @__PURE__ */ (0, rA.jsx)(Lb, {
							name: "newPassword",
							type: "password",
							minLength: 8,
							autoComplete: "new-password",
							required: !0,
							disabled: n
						})]
					}),
					/* @__PURE__ */ (0, rA.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Confirmar nova senha", /* @__PURE__ */ (0, rA.jsx)(Lb, {
							name: "confirmPassword",
							type: "password",
							minLength: 8,
							autoComplete: "new-password",
							required: !0,
							disabled: n
						})]
					}),
					i && /* @__PURE__ */ (0, rA.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: i
					}),
					/* @__PURE__ */ (0, rA.jsxs)(iy, { children: [/* @__PURE__ */ (0, rA.jsx)(Y, {
						type: "button",
						variant: "outline",
						disabled: n,
						onClick: () => t(!1),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, rA.jsx)(Y, {
						type: "submit",
						disabled: n,
						children: n ? "Salvando…" : "Salvar senha"
					})] })
				]
			})]
		})
	});
}
var nA, rA, iA = o((() => {
	nA = /* @__PURE__ */ u(b(), 1), Cs(), zb(), cy(), rA = bs();
}));
// src/features/profile/profile-card.tsx
function aA({ username: e, role: t, profile: n, onEdit: r }) {
	let i = (e, t) => r && /* @__PURE__ */ (0, oA.jsx)(Y, {
		type: "button",
		size: "icon-sm",
		variant: "ghost",
		"aria-label": t,
		onClick: () => r(e),
		children: /* @__PURE__ */ (0, oA.jsx)(gn, { className: "size-3.5" })
	});
	return /* @__PURE__ */ (0, oA.jsxs)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-card",
		children: [/* @__PURE__ */ (0, oA.jsx)("div", {
			className: "h-20 border-b border-border bg-muted",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, oA.jsxs)("div", {
			className: "px-5 pb-5 sm:px-6 sm:pb-6",
			children: [
				/* @__PURE__ */ (0, oA.jsxs)("div", {
					className: "-mt-10 mb-4 flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, oA.jsx)("div", {
						className: "rounded-2xl bg-card p-1",
						children: /* @__PURE__ */ (0, oA.jsx)(Ry, {
							profile: n,
							className: "size-20"
						})
					}), i("photo", "Editar foto de perfil")]
				}),
				/* @__PURE__ */ (0, oA.jsxs)("div", {
					className: "flex min-w-0 items-start gap-2",
					children: [/* @__PURE__ */ (0, oA.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, oA.jsx)("h2", {
							className: "break-words text-xl font-semibold leading-tight tracking-tight",
							style: { color: n.nameColor.toUpperCase() === "#FAFAFA" ? void 0 : n.nameColor },
							children: n.displayName
						}), /* @__PURE__ */ (0, oA.jsxs)("p", {
							className: "mt-1 break-all text-sm text-muted-foreground",
							children: ["@", e]
						})]
					}), i("identity", "Editar nome e cor")]
				}),
				/* @__PURE__ */ (0, oA.jsx)(Ub, {
					variant: "secondary",
					className: "mt-3",
					children: t
				}),
				/* @__PURE__ */ (0, oA.jsxs)("section", {
					className: "mt-5 border-t border-border pt-4",
					"aria-label": "Descrição do perfil",
					children: [/* @__PURE__ */ (0, oA.jsxs)("div", {
						className: "mb-2 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, oA.jsx)("h3", {
							className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
							children: "Sobre"
						}), i("bio", "Editar descrição")]
					}), /* @__PURE__ */ (0, oA.jsx)("p", {
						className: "whitespace-pre-wrap break-words text-sm leading-relaxed",
						children: n.bio || /* @__PURE__ */ (0, oA.jsx)("span", {
							className: "text-muted-foreground",
							children: "Nenhuma descrição adicionada."
						})
					})]
				})
			]
		})]
	});
}
var oA, sA = o((() => {
	Dr(), Cs(), Gb(), By(), oA = bs();
}));
// src/features/profile/avatar-editor.tsx
function cA({ file: e, shape: t, onSave: n, onCancel: r }) {
	let i = (0, lA.useRef)(null), [a, o] = (0, lA.useState)(null), [s, c] = (0, lA.useState)(1), [l, u] = (0, lA.useState)({
		x: 0,
		y: 0
	}), [d, f] = (0, lA.useState)(""), p = (0, lA.useRef)(null);
	return (0, lA.useEffect)(() => {
		let t = URL.createObjectURL(e), n = new Image();
		return n.onload = () => {
			n.naturalWidth * n.naturalHeight > 24e6 ? f("Escolha uma imagem de até 24 megapixels.") : o(n);
		}, n.onerror = () => f("Não foi possível abrir esta imagem."), n.src = t, () => URL.revokeObjectURL(t);
	}, [e]), (0, lA.useEffect)(() => {
		if (!a || !i.current) return;
		let e = i.current.getContext("2d");
		if (!e) return;
		let t = Math.min(a.naturalWidth, a.naturalHeight) / s, n = (a.naturalWidth - t) * (1 + l.x) / 2, r = (a.naturalHeight - t) * (1 + l.y) / 2;
		e.fillStyle = "#111113", e.fillRect(0, 0, 256, 256), e.drawImage(a, n, r, t, t, 0, 0, 256, 256);
	}, [
		a,
		s,
		l
	]), /* @__PURE__ */ (0, uA.jsxs)("div", {
		className: "grid gap-3 rounded-lg border p-4",
		children: [
			/* @__PURE__ */ (0, uA.jsx)("p", {
				className: "text-sm font-medium",
				children: "Recortar foto"
			}),
			/* @__PURE__ */ (0, uA.jsx)("canvas", {
				ref: i,
				width: 256,
				height: 256,
				"aria-label": "Prévia do recorte",
				className: "mx-auto aspect-square w-full max-w-56 touch-none bg-muted",
				style: { borderRadius: Ly(t) },
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
			d && /* @__PURE__ */ (0, uA.jsx)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: d
			}),
			/* @__PURE__ */ (0, uA.jsxs)("label", {
				className: "grid gap-1 text-xs",
				children: ["Zoom", /* @__PURE__ */ (0, uA.jsx)("input", {
					"aria-label": "Zoom do recorte",
					type: "range",
					min: 1,
					max: 3,
					step: .01,
					value: s,
					onChange: (e) => c(Number(e.target.value))
				})]
			}),
			/* @__PURE__ */ (0, uA.jsx)("div", {
				className: "grid grid-cols-2 gap-3",
				children: ["x", "y"].map((e) => /* @__PURE__ */ (0, uA.jsxs)("label", {
					className: "grid gap-1 text-xs",
					children: [e === "x" ? "Horizontal" : "Vertical", /* @__PURE__ */ (0, uA.jsx)("input", {
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
			/* @__PURE__ */ (0, uA.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, uA.jsx)(Y, {
					type: "button",
					variant: "outline",
					onClick: r,
					children: "Cancelar recorte"
				}), /* @__PURE__ */ (0, uA.jsx)(Y, {
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
var lA, uA, dA = o((() => {
	lA = /* @__PURE__ */ u(b(), 1), Cs(), By(), uA = bs();
}));
// src/features/profile/profile-field-editor.tsx
function fA({ field: e, profile: t, onSave: n, onCancel: r }) {
	let [i, a] = (0, pA.useState)(t), [o, s] = (0, pA.useState)(null), [c, l] = (0, pA.useState)(!1), [u, d] = (0, pA.useState)(""), f = (0, pA.useRef)(null);
	return /* @__PURE__ */ (0, mA.jsxs)("form", {
		className: "grid gap-4",
		onSubmit: async (t) => {
			if (t.preventDefault(), !(c || o)) {
				l(!0), d("");
				try {
					await n(e === "identity" ? {
						displayName: i.displayName,
						nameColor: i.nameColor
					} : e === "bio" ? { bio: i.bio } : {
						avatar: i.avatar,
						avatarShape: i.avatarShape
					});
				} catch (e) {
					d(e instanceof Error ? e.message : "Não foi possível salvar.");
				} finally {
					l(!1);
				}
			}
		},
		children: [
			e === "identity" && /* @__PURE__ */ (0, mA.jsxs)(mA.Fragment, { children: [/* @__PURE__ */ (0, mA.jsxs)("label", {
				className: "grid gap-1.5 text-sm",
				children: ["Nome de exibição", /* @__PURE__ */ (0, mA.jsx)(Lb, {
					autoFocus: !0,
					required: !0,
					maxLength: 40,
					value: i.displayName,
					disabled: c,
					onChange: (e) => a({
						...i,
						displayName: e.target.value
					})
				})]
			}), /* @__PURE__ */ (0, mA.jsxs)("label", {
				className: "grid gap-1.5 text-sm",
				children: ["Cor do nome", /* @__PURE__ */ (0, mA.jsxs)("span", {
					className: "flex items-center gap-3 rounded-md border border-input p-2",
					children: [/* @__PURE__ */ (0, mA.jsx)("input", {
						type: "color",
						"aria-label": "Cor do nome",
						value: i.nameColor,
						disabled: c,
						onChange: (e) => a({
							...i,
							nameColor: e.target.value
						}),
						className: "h-8 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
					}), /* @__PURE__ */ (0, mA.jsx)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: i.nameColor.toUpperCase()
					})]
				})]
			})] }),
			e === "bio" && /* @__PURE__ */ (0, mA.jsxs)("label", {
				className: "grid gap-1.5 text-sm",
				children: [
					"Descrição",
					/* @__PURE__ */ (0, mA.jsx)("textarea", {
						autoFocus: !0,
						"aria-label": "Descrição",
						rows: 5,
						maxLength: 280,
						value: i.bio,
						disabled: c,
						onChange: (e) => a({
							...i,
							bio: e.target.value
						}),
						className: "min-h-28 resize-y rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					}),
					/* @__PURE__ */ (0, mA.jsxs)("span", {
						className: "text-right text-xs text-muted-foreground",
						children: [i.bio.length, "/280"]
					})
				]
			}),
			e === "photo" && /* @__PURE__ */ (0, mA.jsxs)(mA.Fragment, { children: [
				/* @__PURE__ */ (0, mA.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, mA.jsx)(Ry, {
						profile: i,
						className: "size-16"
					}), /* @__PURE__ */ (0, mA.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, mA.jsx)("input", {
								ref: f,
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
									].includes(t.type) ? d("Escolha uma imagem PNG, JPEG ou WebP de até 5 MB.") : (d(""), s(t)));
								}
							}),
							/* @__PURE__ */ (0, mA.jsxs)(Y, {
								type: "button",
								variant: "outline",
								disabled: c,
								onClick: () => f.current?.click(),
								children: [/* @__PURE__ */ (0, mA.jsx)(wt, { className: "size-4" }), "Escolher foto"]
							}),
							i.avatar && /* @__PURE__ */ (0, mA.jsx)(Y, {
								type: "button",
								variant: "ghost",
								disabled: c,
								onClick: () => a({
									...i,
									avatar: null
								}),
								children: "Remover foto"
							})
						]
					})]
				}),
				o && /* @__PURE__ */ (0, mA.jsx)(cA, {
					file: o,
					shape: i.avatarShape,
					onCancel: () => s(null),
					onSave: (e) => {
						a({
							...i,
							avatar: e
						}), s(null);
					}
				}, o.name + o.lastModified),
				/* @__PURE__ */ (0, mA.jsxs)("label", {
					className: "grid gap-1.5 text-sm",
					children: ["Formato da foto", /* @__PURE__ */ (0, mA.jsxs)(Vk, {
						value: i.avatarShape,
						disabled: c,
						onValueChange: (e) => {
							e && a({
								...i,
								avatarShape: e
							});
						},
						children: [/* @__PURE__ */ (0, mA.jsx)(Fk, {
							className: "w-full",
							children: /* @__PURE__ */ (0, mA.jsx)(Pk, { children: hA[i.avatarShape] })
						}), /* @__PURE__ */ (0, mA.jsx)(Ik, { children: Object.entries(hA).map(([e, t]) => /* @__PURE__ */ (0, mA.jsx)(Lk, {
							value: e,
							children: t
						}, e)) })]
					})]
				})
			] }),
			u && /* @__PURE__ */ (0, mA.jsx)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: u
			}),
			/* @__PURE__ */ (0, mA.jsxs)("div", {
				className: "flex justify-end gap-2 border-t border-border pt-4",
				children: [/* @__PURE__ */ (0, mA.jsx)(Y, {
					type: "button",
					variant: "outline",
					disabled: c,
					onClick: r,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, mA.jsx)(Y, {
					type: "submit",
					disabled: c || !!o,
					children: c ? "Salvando…" : "Salvar alterações"
				})]
			})
		]
	});
}
var pA, mA, hA, gA = o((() => {
	pA = /* @__PURE__ */ u(b(), 1), Dr(), Cs(), zb(), Hk(), By(), dA(), mA = bs(), hA = {
		circle: "Círculo",
		square: "Quadrado",
		rounded: "Cantos arredondados"
	};
})), _A = /* @__PURE__ */ c({ default: () => vA });
function vA({ username: e, role: t, profile: n, onClose: r, editable: i = !0 }) {
	let [a, o] = (0, yA.useState)(null), [s, c] = (0, yA.useState)(!1), [l, u] = (0, yA.useState)(!1);
	return /* @__PURE__ */ (0, bA.jsxs)(bA.Fragment, { children: [/* @__PURE__ */ (0, bA.jsx)($v, {
		open: !0,
		onOpenChange: (e) => {
			!e && !l && r();
		},
		children: /* @__PURE__ */ (0, bA.jsxs)(ny, {
			className: "max-h-[90svh] overflow-y-auto sm:max-w-md",
			children: [/* @__PURE__ */ (0, bA.jsxs)(ry, { children: [/* @__PURE__ */ (0, bA.jsxs)("div", {
				className: "flex items-center gap-2 pr-6",
				children: [a && /* @__PURE__ */ (0, bA.jsx)(Y, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "Voltar ao perfil",
					disabled: l,
					onClick: () => o(null),
					children: /* @__PURE__ */ (0, bA.jsx)(le, { className: "size-4" })
				}), /* @__PURE__ */ (0, bA.jsx)(ay, { children: a ? xA[a] : i ? "Meu perfil" : "Perfil" })]
			}), /* @__PURE__ */ (0, bA.jsx)(oy, {
				className: "sr-only",
				children: a ? "Edite o campo selecionado do perfil." : `Perfil de ${n.displayName}, ${t}.`
			})] }), a && i ? /* @__PURE__ */ (0, bA.jsx)(fA, {
				field: a,
				profile: n,
				onCancel: () => o(null),
				onSave: async (t) => {
					u(!0);
					try {
						$b(e, await Jb.save(t)), o(null);
					} finally {
						u(!1);
					}
				}
			}, a) : /* @__PURE__ */ (0, bA.jsxs)(bA.Fragment, { children: [/* @__PURE__ */ (0, bA.jsx)(aA, {
				username: e,
				role: t,
				profile: n,
				onEdit: i ? o : void 0
			}), i && /* @__PURE__ */ (0, bA.jsx)("section", {
				className: "border-t border-border pt-4",
				"aria-label": "Segurança da conta",
				children: /* @__PURE__ */ (0, bA.jsxs)(Y, {
					type: "button",
					variant: "ghost",
					onClick: () => c(!0),
					className: "w-full justify-start",
					children: [/* @__PURE__ */ (0, bA.jsx)(It, { className: "size-4" }), "Alterar senha"]
				})
			})] })]
		})
	}), s && i && /* @__PURE__ */ (0, bA.jsx)(tA, {
		request: {
			username: e,
			self: !0,
			submit: Jb.password
		},
		onClose: (e) => {
			c(!1), e && (r(), Kb());
		}
	})] });
}
var yA, bA, xA, SA = o((() => {
	yA = /* @__PURE__ */ u(b(), 1), Dr(), Cs(), cy(), iA(), Yb(), ix(), sA(), gA(), bA = bs(), xA = {
		identity: "Editar nome",
		bio: "Editar descrição",
		photo: "Editar foto"
	};
})), CA = /* @__PURE__ */ c({ default: () => DA });
function wA() {
	let e = () => ({
		width: window.visualViewport?.width || innerWidth,
		height: window.visualViewport?.height || innerHeight,
		top: window.visualViewport?.offsetTop || 0
	}), [t, n] = (0, OA.useState)(e);
	return (0, OA.useEffect)(() => {
		let t = () => n(e());
		return visualViewport?.addEventListener("resize", t), visualViewport?.addEventListener("scroll", t), window.addEventListener("resize", t), () => {
			visualViewport?.removeEventListener("resize", t), visualViewport?.removeEventListener("scroll", t), window.removeEventListener("resize", t);
		};
	}, []), t;
}
function TA({ children: e }) {
	let [t, n] = (0, OA.useState)(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	return (0, OA.useEffect)(() => {
		let e = requestAnimationFrame(() => n(!0));
		return () => cancelAnimationFrame(e);
	}, []), /* @__PURE__ */ (0, kA.jsx)("div", {
		className: `h-full min-h-0 min-w-0 transition-[opacity,transform] duration-150 motion-reduce:transition-none ${t ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`,
		children: e
	});
}
function EA({ person: e, own: t, onClose: n }) {
	let r = ex(e.username, t);
	return /* @__PURE__ */ (0, kA.jsx)(OA.Suspense, {
		fallback: /* @__PURE__ */ (0, kA.jsx)("p", {
			role: "status",
			children: "Carregando perfil…"
		}),
		children: /* @__PURE__ */ (0, kA.jsx)(AA, {
			username: e.username,
			role: ax[e.role] || e.role,
			profile: t ? r : e.profile,
			editable: t,
			onClose: n
		})
	});
}
function DA() {
	let e = by(), t = wA(), [n, r] = (0, OA.useState)(""), [i, a] = (0, OA.useState)(null), o = (0, OA.useRef)(null), s = e.inbox?.conversations.find((t) => t.id === e.selectedId), c = !s && e.view === "inbox", l = (e.inbox?.conversations || []).filter((e) => !e.archived && [e.peer.username, e.peer.profile.displayName].some((e) => e.toLowerCase().includes(n.toLowerCase()))), u = e.inbox?.requests.filter((e) => e.direction === "incoming").length || 0;
	return /* @__PURE__ */ (0, kA.jsxs)(kA.Fragment, { children: [/* @__PURE__ */ (0, kA.jsx)($v, {
		open: !0,
		onOpenChange: (e) => {
			e || Q.close();
		},
		children: /* @__PURE__ */ (0, kA.jsxs)(ny, {
			showCloseButton: !1,
			className: "flex flex-col gap-0 overflow-hidden rounded-lg p-0",
			style: {
				width: Math.min(1100, t.width < 640 ? t.width : t.width - 32),
				maxWidth: t.width,
				height: Math.max(180, t.width < 640 ? t.height : Math.min(768, t.height - 32)),
				top: t.top + t.height / 2
			},
			onPointerDown: (e) => {
				e.pointerType === "mouse" || e.target.closest("[data-no-swipe],button,a,input,textarea,video,audio") || (o.current = {
					x: e.clientX,
					y: e.clientY
				});
			},
			onPointerUp: (e) => {
				let t = o.current;
				o.current = null, t && e.clientX - t.x > 84 && Math.abs(e.clientY - t.y) < 40 && Q.back();
			},
			onPointerCancel: () => {
				o.current = null;
			},
			children: [/* @__PURE__ */ (0, kA.jsxs)(ry, {
				className: "shrink-0 border-b border-border px-3 py-2",
				children: [/* @__PURE__ */ (0, kA.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						!c && /* @__PURE__ */ (0, kA.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Voltar às conversas",
							onClick: () => Q.back(),
							children: /* @__PURE__ */ (0, kA.jsx)(le, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, kA.jsx)(en, { className: "size-4 text-muted-foreground" }),
						/* @__PURE__ */ (0, kA.jsx)(ay, {
							className: "flex-1 text-sm",
							children: "Mensagens diretas"
						}),
						/* @__PURE__ */ (0, kA.jsx)("span", {
							className: `size-1.5 rounded-full ${e.connected ? "bg-emerald-500" : "bg-muted-foreground"}`,
							"aria-label": e.connected ? "Conectado" : "Reconectando"
						}),
						/* @__PURE__ */ (0, kA.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Configurações de mensagens",
							onClick: () => Q.view("settings"),
							children: /* @__PURE__ */ (0, kA.jsx)(Un, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, kA.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Fechar mensagens",
							onClick: () => Q.close(),
							children: /* @__PURE__ */ (0, kA.jsx)(Sr, { className: "size-4" })
						})
					]
				}), /* @__PURE__ */ (0, kA.jsx)(oy, {
					className: "sr-only",
					children: "Conversas privadas da sua conta OrganizeOn."
				})]
			}), /* @__PURE__ */ (0, kA.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, kA.jsxs)("aside", {
					className: `${c ? "flex" : "hidden md:flex"} w-full shrink-0 flex-col border-r border-border md:w-72`,
					"aria-label": "Lista de conversas",
					children: [
						/* @__PURE__ */ (0, kA.jsxs)("div", {
							className: "shrink-0 space-y-2 border-b border-border p-3",
							children: [
								/* @__PURE__ */ (0, kA.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, kA.jsx)("h2", {
										className: "text-sm font-medium",
										children: "Suas conversas"
									}), /* @__PURE__ */ (0, kA.jsx)(Y, {
										type: "button",
										size: "icon-sm",
										variant: "ghost",
										"aria-label": "Nova mensagem direta",
										onClick: () => Q.view("new"),
										children: /* @__PURE__ */ (0, kA.jsx)(Zt, { className: "size-4" })
									})]
								}),
								/* @__PURE__ */ (0, kA.jsx)(Lb, {
									"aria-label": "Pesquisar conversa",
									placeholder: "Pesquisar conversa…",
									className: "h-8",
									value: n,
									onChange: (e) => r(e.target.value)
								}),
								/* @__PURE__ */ (0, kA.jsxs)(Y, {
									type: "button",
									variant: e.view === "requests" ? "secondary" : "ghost",
									className: "w-full justify-start",
									onClick: () => Q.view("requests"),
									children: [
										/* @__PURE__ */ (0, kA.jsx)(Dt, { className: "size-4" }),
										"Solicitações",
										u > 0 && /* @__PURE__ */ (0, kA.jsx)(Ub, {
											variant: "secondary",
											className: "ml-auto",
											children: u
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, kA.jsx)("div", {
							className: "min-h-0 flex-1 overflow-y-auto p-1.5",
							children: !e.inbox && !e.error ? /* @__PURE__ */ (0, kA.jsxs)("p", {
								role: "status",
								className: "flex items-center gap-2 p-4 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, kA.jsx)(zt, { className: "size-3 animate-spin" }), "Carregando conversas…"]
							}) : l.length ? l.map((t) => /* @__PURE__ */ (0, kA.jsxs)("button", {
								type: "button",
								"aria-label": `Conversa com ${t.peer.profile.displayName}`,
								onClick: () => Q.select(t.id),
								className: `mb-1 flex w-full min-w-0 items-center gap-2.5 rounded-md p-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${e.selectedId === t.id ? "bg-accent" : "hover:bg-muted"}`,
								children: [
									/* @__PURE__ */ (0, kA.jsx)(Ry, {
										profile: t.peer.profile,
										className: "size-9"
									}),
									/* @__PURE__ */ (0, kA.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, kA.jsx)("span", {
											className: "block truncate text-sm font-medium",
											children: t.peer.profile.displayName
										}), /* @__PURE__ */ (0, kA.jsx)("span", {
											className: "mt-0.5 block truncate text-xs text-muted-foreground",
											children: t.lastMessage ? (t.lastMessage.sender.username === e.username ? "Você: " : "") + (t.lastMessage.deleted ? "Mensagem apagada" : t.lastMessage.content || "Arquivo") : "Conversa aceita"
										})]
									}),
									t.unread > 0 && /* @__PURE__ */ (0, kA.jsx)(Ub, {
										variant: "secondary",
										className: "tabular-nums",
										children: t.unread > 99 ? "99+" : t.unread
									})
								]
							}, t.id)) : /* @__PURE__ */ (0, kA.jsxs)("div", {
								className: "grid gap-3 p-6 text-center",
								children: [
									/* @__PURE__ */ (0, kA.jsx)(en, { className: "mx-auto size-7 text-muted-foreground" }),
									/* @__PURE__ */ (0, kA.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: n ? "Nenhuma conversa encontrada." : "Suas DMs vão aparecer aqui."
									}),
									/* @__PURE__ */ (0, kA.jsx)(Y, {
										type: "button",
										variant: "outline",
										onClick: () => Q.view("new"),
										children: "Nova DM"
									})
								]
							})
						}),
						e.error && /* @__PURE__ */ (0, kA.jsxs)("div", {
							className: "shrink-0 border-t border-border p-3",
							children: [/* @__PURE__ */ (0, kA.jsx)("p", {
								role: "alert",
								className: "text-xs text-destructive",
								children: e.error
							}), /* @__PURE__ */ (0, kA.jsxs)(Y, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: () => void Q.refresh(),
								children: [/* @__PURE__ */ (0, kA.jsx)(On, { className: "size-3" }), "Tentar novamente"]
							})]
						})
					]
				}), /* @__PURE__ */ (0, kA.jsx)("main", {
					className: `${c ? "hidden md:block" : "block"} min-h-0 min-w-0 flex-1`,
					children: /* @__PURE__ */ (0, kA.jsx)(TA, { children: s ? /* @__PURE__ */ (0, kA.jsx)(HE, {
						conversation: s,
						onProfile: a
					}, s.id) : e.view === "requests" ? /* @__PURE__ */ (0, kA.jsx)(qk, { onProfile: a }) : e.view === "new" ? /* @__PURE__ */ (0, kA.jsx)(Zk, {}) : e.view === "settings" ? /* @__PURE__ */ (0, kA.jsx)(Uk, {}) : /* @__PURE__ */ (0, kA.jsxs)("div", {
						className: "grid h-full place-content-center justify-items-center gap-3 p-8 text-center",
						children: [
							/* @__PURE__ */ (0, kA.jsx)(en, { className: "size-10 text-muted-foreground" }),
							/* @__PURE__ */ (0, kA.jsx)("h2", {
								className: "text-lg font-semibold",
								children: "Suas mensagens, em qualquer serviço"
							}),
							/* @__PURE__ */ (0, kA.jsx)("p", {
								className: "max-w-xs text-sm text-muted-foreground",
								children: "Escolha uma conversa ou adicione alguém pelo @usuário."
							}),
							/* @__PURE__ */ (0, kA.jsx)(Y, {
								type: "button",
								variant: "outline",
								onClick: () => Q.view("new"),
								children: "Nova DM"
							})
						]
					}) }, e.selectedId || e.view)
				})]
			})]
		})
	}), i && /* @__PURE__ */ (0, kA.jsx)(EA, {
		person: i,
		own: i.username === e.username,
		onClose: () => a(null)
	})] });
}
var OA, kA, AA, jA = o((() => {
	OA = /* @__PURE__ */ u(b(), 1), Dr(), cy(), Cs(), zb(), Gb(), By(), ix(), Iy(), ox(), GE(), Kk(), Xk(), eA(), kA = bs(), AA = (0, OA.lazy)(() => Promise.resolve().then(() => (SA(), _A)));
}));
cy(), Cs(), Iy();
var MA = (0, Z.lazy)(() => Promise.resolve().then(() => (jA(), CA)));
function NA({ username: e, children: t }) {
	let n = by(), r = !!e && /^[A-Za-z0-9_.-]{3,32}$/.test(e);
	return (0, Z.useEffect)(() => {
		if (r) return Q.start(e);
	}, [e, r]), /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [t, r && /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [n.open && /* @__PURE__ */ (0, X.jsx)(ly, {
		onClose: () => Q.close(),
		children: /* @__PURE__ */ (0, X.jsx)(Z.Suspense, {
			fallback: /* @__PURE__ */ (0, X.jsx)($v, {
				open: !0,
				onOpenChange: (e) => {
					e || Q.close();
				},
				children: /* @__PURE__ */ (0, X.jsxs)(ny, { children: [/* @__PURE__ */ (0, X.jsxs)(ry, { children: [/* @__PURE__ */ (0, X.jsx)(ay, { children: "Mensagens diretas" }), /* @__PURE__ */ (0, X.jsx)(oy, { children: "Carregando mensagens…" })] }), /* @__PURE__ */ (0, X.jsx)(Y, {
					variant: "outline",
					onClick: () => Q.close(),
					children: "Fechar"
				})] })
			}),
			children: /* @__PURE__ */ (0, X.jsx)(MA, {})
		})
	}), /* @__PURE__ */ (0, X.jsx)(Hy, {})] })] });
}
// src/hooks/use-mobile.ts
var PA = 768;
function FA() {
	let [e, t] = Z.useState(void 0);
	return Z.useEffect(() => {
		let e = window.matchMedia("(max-width: 767px)"), n = () => {
			t(window.innerWidth < PA);
		};
		return e.addEventListener("change", n), t(window.innerWidth < PA), () => e.removeEventListener("change", n);
	}, []), !!e;
}
Lw(), vs();
function IA({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(Iw, {
		"data-slot": "separator",
		orientation: t,
		className: _s("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", e),
		...n
	});
}
// node_modules/@base-ui/react/tooltip/root/TooltipRootContext.mjs
Fi();
var LA = /*#__PURE__*/ Z.createContext(void 0);
function RA(e) {
	let t = Z.useContext(LA);
	if (t === void 0 && !e) throw Error(Pi(72));
	return t;
}
ah(), Gc(), fl(), Sh();
var zA = {
	...gh,
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
}, BA = class extends nh {
	constructor(e, t, n) {
		let r = new Dm();
		super(VA(e, r, t, n), HA(r), zA);
	}
	setOpen = (e, t) => {
		_m(this, e, t, { extraState: { openChangeReason: t.reason } });
	};
	cancelPendingOpen(e) {
		this.state.floatingRootContext.dispatchOpenChange(!1, Uc(qc, e));
	}
};
function VA(e, t, n, r = !1) {
	return {
		...uh(t, n, r),
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
function HA(e) {
	return {
		popupRef: /*#__PURE__*/ Z.createRef(),
		onOpenChange: void 0,
		onOpenChangeComplete: void 0,
		triggerElements: e
	};
}
Um(), ma(), mi(), y_(), Gc(), Sh(), Mi(), fl();
var UA = Lm(function(e) {
	let { disabled: t = !1, defaultOpen: n = !1, open: r, disableHoverablePopup: i = !1, trackCursorAxis: a = "none", actionsRef: o, onOpenChange: s, onOpenChangeComplete: c, handle: l, triggerId: u, defaultTriggerId: d = null, children: f } = e, p = dm((e, t) => new BA({
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
	}), ym(p, { closeOnActiveTriggerUnmount: !0 });
	let { forceUnmount: y, transitionStatus: b } = bm(h, p), x = p.useState("isInstantPhase"), S = p.useState("instantType"), C = p.useState("lastOpenChangeReason"), w = Z.useRef(null);
	K(() => {
		m && t && p.setOpen(!1, Uc(ol));
	}, [
		m,
		t,
		p
	]), K(() => {
		b === "ending" && C === "none" || b !== "ending" && x ? (S !== "delay" && (w.current = S), p.set("instantType", "delay")) : w.current !== null && (p.set("instantType", w.current), w.current = null);
	}, [
		b,
		x,
		C,
		S,
		p
	]), K(() => {
		h && (g ?? p.set("payload", void 0));
	}, [
		p,
		g,
		h
	]), Z.useImperativeHandle(o, () => ({
		unmount: y,
		close: () => p.setOpen(!1, Uc(ll))
	}), [y, p]);
	let T = h || _ || !t && a !== "none";
	return /*#__PURE__*/ (0, X.jsxs)(LA.Provider, {
		value: p,
		children: [
			l && /*#__PURE__*/ (0, X.jsx)(fm, {
				handle: l,
				store: p
			}),
			T && /*#__PURE__*/ (0, X.jsx)(WA, {
				store: p,
				disabled: t,
				trackCursorAxis: a
			}),
			typeof f == "function" ? f({ payload: v }) : f
		]
	});
});
function WA({ store: e, disabled: t, trackCursorAxis: n }) {
	let r = e.useState("floatingRootContext"), i = Vp(r, {
		enabled: !t,
		referencePress: () => e.select("closeOnClick")
	}), a = Ip(r, {
		enabled: !t && n !== "none",
		axis: n === "none" ? void 0 : n
	}), o = Z.useMemo(() => _i(a.reference, i.reference), [a.reference, i.reference]);
	return xm(e, {
		activeTriggerProps: o,
		inactiveTriggerProps: o,
		popupProps: i.floating ?? pa
	}), null;
}
// node_modules/@base-ui/react/tooltip/provider/TooltipProviderContext.mjs
var GA = /*#__PURE__*/ Z.createContext(void 0);
function KA() {
	return Z.useContext(GA);
}
Fi(), $r(), Um(), Il(), $u(), Rc(), Aa(), Sh(), El(), y_(), Nu(), uu(), Gc(), fl(), Ph(), zu(), wu();
var qA = "data-base-ui-tooltip-trigger";
function JA(e) {
	let t = mu(e);
	return Nr(t) ? t : null;
}
var YA = Rm(function(e, t) {
	let { render: n, className: r, style: i, handle: a, payload: o, disabled: s, delay: c, closeOnClick: l = !0, closeDelay: u, id: d, ...f } = e, p = RA(!0), m = vh(a) ?? p;
	if (!m) throw Error(Pi(82));
	let h = Tl(d), g = m.useState("isTriggerActive", h), _ = m.useState("isOpenedByTrigger", h), v = m.useState("floatingRootContext"), y = Z.useRef(null), b = u ?? 0, { registerTrigger: x, isMountedByThisTrigger: S } = vm(h, y, m, {
		payload: o,
		closeOnClick: l,
		closeDelay: b
	}), C = KA(), { activeIdRef: w, delayRef: T, isInstantPhase: E, hasProvider: D } = Hu(v, { open: _ }), O = jh(v);
	m.useSyncedValue("isInstantPhase", E);
	let k = m.useState("disabled"), A = s ?? k, j = Zu(A), M = m.useState("trackCursorAxis"), N = m.useState("disableHoverablePopup"), P = Z.useRef(!1), F = Nl(), I = Z.useRef(void 0);
	function L() {
		return D && w.current != null ? 0 : c ?? C ?? 600;
	}
	function R(e) {
		let t = y.current;
		if (!t || !e) return !1;
		let n = pu(e, `[${qA}]`);
		return n !== null && n !== t && fu(t, n);
	}
	function ee(e) {
		let t = R(e);
		return P.current = t, t && (O.openChangeTimeout.clear(), O.restTimeout.clear(), O.restTimeoutPending = !1, F.clear()), t;
	}
	let z = Rh(v, {
		enabled: !A,
		mouseOnly: !0,
		move: !1,
		handleClose: !N && M !== "both" ? ag() : null,
		restMs: L,
		delay() {
			return u == null && D ? { close: Fu(T.current, "close") } : { close: b };
		},
		triggerElementRef: y,
		isActiveTrigger: g,
		isClosing: () => m.select("transitionStatus") === "ending",
		shouldOpen() {
			return !P.current;
		}
	}), B = Th(v, { enabled: !A }).reference, V = (e) => {
		let t = P.current, n = JA(e), r = ee(n), i = y.current, a = i && n && fu(i, n);
		if (r && m.select("open") && m.select("lastOpenChangeReason") === "trigger-hover") m.setOpen(!1, Uc(Jc, e));
		else if (t && !r && a && !j.current && !m.select("open") && i && cu(I.current)) {
			let t = () => {
				P.current || j.current || m.select("open") || m.setOpen(!0, Uc(Jc, e, i));
			}, n = L();
			n === 0 ? (F.clear(), t()) : F.start(n, t);
		}
	}, te = m.useState("appliedTriggerProps", S || M !== "none");
	return xa("button", e, {
		state: { open: _ },
		ref: [
			t,
			x,
			y
		],
		props: [
			z,
			B,
			te,
			{
				onMouseOver(e) {
					V(e.nativeEvent);
				},
				onFocus(e) {
					R(JA(e.nativeEvent)) && e.preventBaseUIHandler();
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
				[Cu]: A ? "" : void 0,
				[qA]: A ? void 0 : ""
			},
			f
		],
		stateAttributesMapping: Pc
	});
});
// node_modules/@base-ui/react/tooltip/portal/TooltipPortalContext.mjs
Fi();
var XA = /*#__PURE__*/ Z.createContext(void 0);
function ZA() {
	let e = Z.useContext(XA);
	if (e === void 0) throw Error(Pi(70));
	return e;
}
// node_modules/@base-ui/react/utils/FloatingPortalLite.mjs
np();
var QA = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { children: n, container: r, className: i, render: a, style: o, ...s } = e, { node: c, subtree: l } = Jf({
		container: r,
		ref: t,
		componentProps: e,
		elementProps: s
	});
	return !l && !c ? null : /*#__PURE__*/ (0, X.jsxs)(Z.Fragment, { children: [l, c && /*#__PURE__*/ js.createPortal(n, c)] });
}), $A = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e;
	return RA().useState("mounted") || n ? /*#__PURE__*/ (0, X.jsx)(XA.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, X.jsx)(QA, {
			ref: t,
			...r
		})
	}) : null;
});
// node_modules/@base-ui/react/tooltip/positioner/TooltipPositionerContext.mjs
Fi();
var ej = /*#__PURE__*/ Z.createContext(void 0);
function tj() {
	let e = Z.useContext(ej);
	if (e === void 0) throw Error(Pi(71));
	return e;
}
gC(), qf(), jC();
var nj = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, anchor: i, positionMethod: a = "absolute", side: o = "top", align: s = "center", sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = Gf, style: g, ..._ } = e, v = RA(), y = ZA(), b = v.useState("open"), x = v.useState("mounted"), S = v.useState("trackCursorAxis"), C = v.useState("disableHoverablePopup"), w = v.useState("floatingRootContext"), T = v.useState("instantType"), E = v.useState("transitionStatus"), D = uC({
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
	}), O = AC(e, Z.useMemo(() => ({
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
	return /*#__PURE__*/ (0, X.jsx)(ej.Provider, {
		value: D,
		children: O
	});
});
Rc(), om(), Aa(), hS(), y_(), Sh();
var rj = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = RA(), { side: s, align: c } = tj(), l = o.useState("open"), u = o.useState("instantType"), d = o.useState("transitionStatus"), f = o.useState("popupProps"), p = o.useState("floatingRootContext"), m = o.useState("disabled"), h = o.useState("closeDelay");
	im({
		open: l,
		ref: o.context.popupRef,
		onComplete() {
			l && o.context.onOpenChangeComplete?.(!0);
		}
	}), Fh(p, {
		enabled: !m,
		closeDelay: h
	});
	let g = o.useStateSetter("popupElement");
	return xa("div", e, {
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
			Tm,
			f,
			mS(d),
			a
		],
		stateAttributesMapping: Lc
	});
});
Rc(), Aa();
var ij = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = RA(), { arrowRef: s, side: c, align: l, arrowUncentered: u, arrowStyles: d } = tj();
	return xa("div", e, {
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
		stateAttributesMapping: Ic
	});
});
// node_modules/@base-ui/react/tooltip/provider/TooltipProvider.mjs
y_();
var aj = function(e) {
	let { delay: t, closeDelay: n, timeout: r = 400 } = e, i = Z.useMemo(() => ({
		open: t,
		close: n
	}), [t, n]);
	return /*#__PURE__*/ (0, X.jsx)(GA.Provider, {
		value: t,
		children: /*#__PURE__*/ (0, X.jsx)(Vu, {
			delay: i,
			timeoutMs: r,
			children: e.children
		})
	});
};
vs(), Qv();
function oj({ delay: e = 0, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(aj, {
		"data-slot": "tooltip-provider",
		delay: e,
		...t
	});
}
function sj({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(UA, {
		"data-slot": "tooltip",
		...e
	});
}
function cj({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(YA, {
		"data-slot": "tooltip-trigger",
		...e
	});
}
function lj({ className: e, side: t = "top", sideOffset: n = 4, align: r = "center", alignOffset: i = 0, children: a, ...o }) {
	let s = Jv();
	return /* @__PURE__ */ (0, X.jsx)($A, {
		container: s ?? void 0,
		children: /* @__PURE__ */ (0, X.jsx)(nj, {
			align: r,
			alignOffset: i,
			side: t,
			sideOffset: n,
			className: "isolate z-50",
			children: /* @__PURE__ */ (0, X.jsxs)(rj, {
				"data-slot": "tooltip-content",
				className: _s("z-50 inline-flex w-fit max-w-xs origin-[var(--transform-origin)] items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...o,
				children: [a, /* @__PURE__ */ (0, X.jsx)(ij, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })]
			})
		})
	});
}
Mi(), Hb(), Va(), vs(), Cs(), zb(), IE(), lx(), Dr();
var uj = "sidebar_state", dj = 604800, fj = "16rem", pj = "18rem", mj = "3rem", hj = "b", gj = Z.createContext(null);
function _j() {
	let e = Z.useContext(gj);
	if (!e) throw Error("useSidebar must be used within a SidebarProvider.");
	return e;
}
function vj({ defaultOpen: e = !0, open: t, onOpenChange: n, className: r, style: i, children: a, ...o }) {
	let s = FA(), [c, l] = Z.useState(!1), [u, d] = Z.useState(e), f = t ?? u, p = Z.useCallback((e) => {
		let t = typeof e == "function" ? e(f) : e;
		n ? n(t) : d(t), document.cookie = `${uj}=${t}; path=/; max-age=${dj}`;
	}, [n, f]), m = Z.useCallback(() => s ? l((e) => !e) : p((e) => !e), [
		s,
		p,
		l
	]);
	Z.useEffect(() => {
		let e = (e) => {
			e.key === hj && (e.metaKey || e.ctrlKey) && (e.preventDefault(), m());
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
	return /* @__PURE__ */ (0, X.jsx)(gj.Provider, {
		value: g,
		children: /* @__PURE__ */ (0, X.jsx)("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": fj,
				"--sidebar-width-icon": mj,
				...i
			},
			className: _s("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", r),
			...o,
			children: a
		})
	});
}
function yj({ side: e = "left", variant: t = "sidebar", collapsible: n = "offcanvas", className: r, children: i, dir: a, ...o }) {
	let { isMobile: s, state: c, openMobile: l, setOpenMobile: u } = _j();
	return n === "none" ? /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar",
		className: _s("flex h-full w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground", r),
		...o,
		children: i
	}) : s ? /* @__PURE__ */ (0, X.jsx)(OE, {
		open: l,
		onOpenChange: u,
		...o,
		children: /* @__PURE__ */ (0, X.jsxs)(jE, {
			dir: a,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-[var(--sidebar-width)] bg-sidebar p-0 text-sidebar-foreground",
			style: { "--sidebar-width": pj },
			side: e,
			children: [/* @__PURE__ */ (0, X.jsxs)(ME, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, X.jsx)(NE, { children: "Navegação" }), /* @__PURE__ */ (0, X.jsx)(PE, { children: "Navegue entre as páginas da aplicação." })]
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
			className: _s("relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon) + 1rem)]" : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]")
		}), /* @__PURE__ */ (0, X.jsx)("div", {
			"data-slot": "sidebar-container",
			"data-side": e,
			className: _s("fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", t === "floating" || t === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon) + 1rem + 2px)]" : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l", r),
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
function bj({ className: e, onClick: t, ...n }) {
	let { toggleSidebar: r } = _j();
	return /* @__PURE__ */ (0, X.jsxs)(Y, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon-sm",
		className: _s(e),
		onClick: (e) => {
			t?.(e), r();
		},
		...n,
		children: [/* @__PURE__ */ (0, X.jsx)(un, {}), /* @__PURE__ */ (0, X.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function xj({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("main", {
		"data-slot": "sidebar-inset",
		className: _s("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", e),
		...t
	});
}
function Sj({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: _s("flex flex-col gap-2 p-2", e),
		...t
	});
}
function Cj({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: _s("flex flex-col gap-2 p-2", e),
		...t
	});
}
function wj({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(IA, {
		"data-slot": "sidebar-separator",
		"data-sidebar": "separator",
		className: _s("mx-2 w-auto bg-sidebar-border", e),
		...t
	});
}
function Tj({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: _s("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", e),
		...t
	});
}
function Ej({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: _s("relative flex w-full min-w-0 flex-col p-2", e),
		...t
	});
}
function Dj({ className: e, render: t, ...n }) {
	return Bb({
		defaultTagName: "div",
		props: _i({ className: _s("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-none transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", e) }, n),
		render: t,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label"
		}
	});
}
function Oj({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: _s("flex w-full min-w-0 flex-col gap-0", e),
		...t
	});
}
function kj({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: _s("group/menu-item relative", e),
		...t
	});
}
var Aj = Ba("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-none transition-[width,height,padding] group-has-[data-sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
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
function jj({ render: e, isActive: t = !1, variant: n = "default", size: r = "default", tooltip: i, className: a, ...o }) {
	let { isMobile: s, state: c } = _j(), l = Bb({
		defaultTagName: "button",
		props: _i({ className: _s(Aj({
			variant: n,
			size: r
		}), a) }, o),
		render: i ? /* @__PURE__ */ (0, X.jsx)(cj, { render: e }) : e,
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size: r,
			active: t
		}
	});
	return i ? (typeof i == "string" && (i = { children: i }), /* @__PURE__ */ (0, X.jsxs)(sj, { children: [l, /* @__PURE__ */ (0, X.jsx)(lj, {
		side: "right",
		align: "center",
		hidden: c !== "collapsed" || s,
		...i
	})] })) : l;
}
Dr(), Gb(), Iy();
function Mj() {
	let e = by(), t = (e.inbox?.conversations.reduce((e, t) => e + t.unread, 0) || 0) + (e.inbox?.requests.filter((e) => e.direction === "incoming").length || 0);
	return /* @__PURE__ */ (0, X.jsxs)(jj, {
		"aria-label": "Mensagens diretas",
		tooltip: "Mensagens diretas",
		onClick: () => Q.open(),
		children: [
			/* @__PURE__ */ (0, X.jsx)(en, {}),
			/* @__PURE__ */ (0, X.jsx)("span", { children: "Mensagens" }),
			t > 0 && /* @__PURE__ */ (0, X.jsx)(Ub, {
				variant: "secondary",
				className: "ml-auto tabular-nums group-data-[collapsible=icon]:hidden",
				"aria-label": `${t} mensagens ou solicitações não lidas`,
				children: t > 99 ? "99+" : t
			})
		]
	});
}
ox(), Dr(), lT(), ix(), By();
var Nj = (0, Z.lazy)(() => Promise.resolve().then(() => (SA(), _A)));
function Pj({ username: e, role: t, onLogout: n }) {
	let [r, i] = (0, Z.useState)(!1), a = ex(e, t !== "guest"), o = ax[t] || t, s = /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)(Ry, { profile: a }), /* @__PURE__ */ (0, X.jsxs)("span", {
		className: "grid min-w-0 flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden",
		children: [/* @__PURE__ */ (0, X.jsx)("span", {
			className: "truncate font-medium",
			style: { color: a.nameColor.toUpperCase() === "#FAFAFA" ? void 0 : a.nameColor },
			children: a.displayName
		}), /* @__PURE__ */ (0, X.jsx)("span", {
			className: "truncate text-muted-foreground",
			children: o
		})]
	})] });
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
		t !== "guest" && /^[A-Za-z0-9_.-]{3,32}$/.test(e) && /* @__PURE__ */ (0, X.jsx)(Mj, {}),
		/* @__PURE__ */ (0, X.jsxs)(tT, { children: [/* @__PURE__ */ (0, X.jsxs)(nT, {
			render: /* @__PURE__ */ (0, X.jsx)(jj, {
				size: "lg",
				className: "h-12 justify-start",
				"aria-label": `Perfil de ${e}`
			}),
			children: [s, /* @__PURE__ */ (0, X.jsx)(Ae, { className: "ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" })]
		}), /* @__PURE__ */ (0, X.jsxs)(rT, {
			side: "top",
			align: "start",
			className: "w-64",
			children: [
				/* @__PURE__ */ (0, X.jsx)(iT, { children: /* @__PURE__ */ (0, X.jsx)(aT, {
					className: "px-2 py-2",
					children: /* @__PURE__ */ (0, X.jsxs)("span", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, X.jsx)(Ry, { profile: a }), /* @__PURE__ */ (0, X.jsxs)("span", {
							className: "grid min-w-0",
							children: [/* @__PURE__ */ (0, X.jsx)("span", {
								className: "truncate text-sm font-medium",
								style: { color: a.nameColor.toUpperCase() === "#FAFAFA" ? void 0 : a.nameColor },
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
				/* @__PURE__ */ (0, X.jsx)(sT, {}),
				/* @__PURE__ */ (0, X.jsxs)(oT, {
					disabled: t === "guest",
					onClick: () => {
						Qb(e).then(() => i(!0));
					},
					children: [/* @__PURE__ */ (0, X.jsx)(yr, {}), "Perfil"]
				}),
				n && /* @__PURE__ */ (0, X.jsxs)(oT, {
					onClick: n,
					className: "text-destructive",
					children: [/* @__PURE__ */ (0, X.jsx)(Ht, {}), t === "guest" ? "Sair do modo convidado" : "Sair da sessão"]
				})
			]
		})] }),
		r && /* @__PURE__ */ (0, X.jsx)(ly, {
			onClose: () => i(!1),
			children: /* @__PURE__ */ (0, X.jsx)(Z.Suspense, {
				fallback: /* @__PURE__ */ (0, X.jsx)("p", {
					role: "status",
					className: "fixed bottom-4 right-4 rounded-md border bg-popover p-3 text-sm",
					children: "Carregando perfil…"
				}),
				children: /* @__PURE__ */ (0, X.jsx)(Nj, {
					username: e,
					role: o,
					profile: a,
					onClose: () => i(!1)
				})
			})
		})
	] });
}
Dr(), Gb(), Cs(), cy();
function Fj({ account: e, confirmLogout: t }) {
	let { setOpen: n, setOpenMobile: r } = _j(), i = () => {
		n(!1), r(!1);
	}, a = [
		{
			id: "home",
			label: "Início",
			icon: xt
		},
		{
			id: "games",
			label: "Jogos",
			icon: vt
		},
		{
			id: "settings",
			label: "Configurações",
			icon: Un
		},
		...e.guest ? [] : [{
			id: "data",
			label: "Dados",
			icon: Ie
		}],
		{
			id: "proxy",
			label: "Servidor proxy",
			icon: tr
		},
		...e.canOpenDashboard ? [{
			id: "dashboard",
			label: "Dashboard",
			icon: Qn
		}] : []
	];
	return /* @__PURE__ */ (0, X.jsxs)(yj, {
		collapsible: "offcanvas",
		className: "pointer-events-auto",
		children: [
			/* @__PURE__ */ (0, X.jsx)(Sj, {
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
			/* @__PURE__ */ (0, X.jsx)(wj, {}),
			/* @__PURE__ */ (0, X.jsx)(Tj, { children: /* @__PURE__ */ (0, X.jsxs)(Ej, { children: [/* @__PURE__ */ (0, X.jsx)(Dj, { children: "Workspace" }), /* @__PURE__ */ (0, X.jsx)(Oj, { children: a.map(({ id: t, label: n, icon: r }) => /* @__PURE__ */ (0, X.jsx)(kj, { children: /* @__PURE__ */ (0, X.jsxs)(jj, {
				tooltip: n,
				onClick: () => {
					i(), e.onNavigate(t);
				},
				children: [
					/* @__PURE__ */ (0, X.jsx)(r, {}),
					/* @__PURE__ */ (0, X.jsx)("span", { children: n }),
					t === "proxy" && /* @__PURE__ */ (0, X.jsx)(Ub, {
						variant: "secondary",
						className: "ml-auto text-[10px]",
						children: e.proxyLabel
					})
				]
			}) }, t)) })] }) }),
			/* @__PURE__ */ (0, X.jsx)(Cj, {
				className: "px-2 pb-3",
				children: /* @__PURE__ */ (0, X.jsx)(Pj, {
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
function Ij(e) {
	let [t, n] = (0, Z.useState)(!1);
	return /* @__PURE__ */ (0, X.jsx)(NA, {
		username: e.guest ? null : e.username,
		children: /* @__PURE__ */ (0, X.jsxs)(vj, {
			defaultOpen: !1,
			className: "pointer-events-none min-h-0",
			children: [
				/* @__PURE__ */ (0, X.jsx)(Fj, {
					account: e,
					confirmLogout: () => n(!0)
				}),
				/* @__PURE__ */ (0, X.jsx)(bj, {
					className: "pointer-events-auto fixed left-3 top-3 z-40 border bg-background",
					"aria-label": "Abrir menu"
				}),
				/* @__PURE__ */ (0, X.jsx)($v, {
					open: t,
					onOpenChange: n,
					children: /* @__PURE__ */ (0, X.jsxs)(ny, {
						className: "sm:max-w-sm",
						children: [/* @__PURE__ */ (0, X.jsxs)(ry, { children: [/* @__PURE__ */ (0, X.jsx)(ay, { children: "Encerrar sessão?" }), /* @__PURE__ */ (0, X.jsx)(oy, { children: e.guest ? "Deseja sair do modo convidado?" : "Deseja realmente sair desta conta?" })] }), /* @__PURE__ */ (0, X.jsxs)(iy, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
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
		})
	});
}
// src/components/ui/card.tsx
vs();
function Lj({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card",
		"data-size": t,
		className: _s("group/card flex flex-col gap-[var(--card-spacing)] overflow-hidden rounded-xl bg-card py-[var(--card-spacing)] text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:1rem] has-[data-slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:0.75rem] data-[size=sm]:has-[data-slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", e),
		...n
	});
}
function Rj({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-header",
		className: _s("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-[var(--card-spacing)] has-[data-slot=card-action]:grid-cols-[1fr_auto] has-[data-slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-[var(--card-spacing)]", e),
		...t
	});
}
function zj({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("h2", {
		"data-slot": "card-title",
		className: _s("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", e),
		...t
	});
}
function Bj({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-description",
		className: _s("text-sm text-muted-foreground", e),
		...t
	});
}
function Vj({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-content",
		className: _s("px-[var(--card-spacing)]", e),
		...t
	});
}
function Hj({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-footer",
		className: _s("flex items-center rounded-b-xl border-t bg-muted/50 p-[var(--card-spacing)]", e),
		...t
	});
}
// node_modules/@base-ui/react/tabs/root/TabsRootContext.mjs
Fi();
var Uj = /*#__PURE__*/ Z.createContext(void 0);
function Wj() {
	let e = Z.useContext(Uj);
	if (e === void 0) throw Error(Pi(64));
	return e;
}
// node_modules/@base-ui/react/tabs/root/TabsRootDataAttributes.mjs
var Gj = "data-activation-direction", Kj = { tabActivationDirection: (e) => ({ [Gj]: e }) };
wx(), mi(), di(), Aa(), EC(), Gc(), fl();
var qj = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { className: n, defaultValue: r = 0, onValueChange: i, orientation: a = "horizontal", render: o, value: s, style: c, ...l } = e, u = e.defaultValue !== void 0, d = Z.useRef([]), [f, p] = Z.useState(() => /* @__PURE__ */ new Map()), [m, h] = Sx({
		controlled: s,
		default: r,
		name: "Tabs",
		state: "value"
	}), g = s !== void 0, [_, v] = Z.useState(() => /* @__PURE__ */ new Map()), y = Z.useRef(void 0), b = Z.useCallback((e) => Jj(_, e), [_]), [x, S] = Z.useState(() => ({
		previousValue: m,
		tabActivationDirection: "none"
	})), { previousValue: C, tabActivationDirection: w } = x, T = w, E = !1;
	C !== m && (T = Yj(C, m, a, _), E = C != null && m != null && b(m) == null);
	let D = E ? C : m, O = C !== D || w !== T;
	K(() => {
		O && S({
			previousValue: D,
			tabActivationDirection: T
		});
	}, [
		D,
		O,
		T
	]);
	let k = G((e, t) => {
		t.activationDirection = Yj(m, e, a, _), i?.(e, t), t.isCanceled || h(() => e);
	}), A = G((e, t) => {
		i?.(e, Uc(t, void 0, void 0, { activationDirection: "none" }));
	}), j = G((e, t) => (p((n) => {
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
	K(() => {
		if (g) return;
		function e(e, t) {
			h(() => e), S({
				previousValue: e,
				tabActivationDirection: "none"
			}), A(e, t), L.current = !1;
		}
		if (_.size === 0) {
			z.current && m !== null && !y.current?.isConnected && e(null, sl);
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
			let i = sl;
			r ? i = cl : t && (i = ol), e(n, i);
		} else r && F != null && (A(m, cl), L.current = !1);
	}, [
		I,
		g,
		A,
		F,
		h,
		_,
		m
	]);
	let B = xa("div", e, {
		state: {
			orientation: a,
			tabActivationDirection: T
		},
		ref: t,
		props: l,
		stateAttributesMapping: Kj
	});
	return /*#__PURE__*/ (0, X.jsx)(Uj.Provider, {
		value: P,
		children: /*#__PURE__*/ (0, X.jsx)(_C, {
			elementsRef: d,
			children: B
		})
	});
});
function Jj(e, t) {
	for (let [n, r] of e.entries()) if (t === r.value) return n;
	return null;
}
function Yj(e, t, n, r) {
	if (e == null || t == null) return "none";
	let [i, a, o] = n === "horizontal" ? [
		"left",
		"left",
		"right"
	] : [
		"top",
		"up",
		"down"
	], s = Jj(r, e), c = Jj(r, t);
	if (s == null || c == null) return s !== c && (typeof e == "number" || typeof e == "string") && typeof e == typeof t ? t > e ? o : a : "none";
	let l = s.getBoundingClientRect()[i], u = c.getBoundingClientRect()[i];
	return u < l ? a : u > l ? o : "none";
}
// node_modules/@base-ui/react/internals/composite/constants.mjs
var Xj = "data-composite-item-active";
// node_modules/@base-ui/react/tabs/list/TabsListContext.mjs
Fi();
var Zj = /*#__PURE__*/ Z.createContext(void 0);
function Qj() {
	let e = Z.useContext(Zj);
	if (e === void 0) throw Error(Pi(65));
	return e;
}
Wi(), mi(), di(), El(), Aa(), Hc(), hw(), zi(), Gc(), fl(), oh();
var $j = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { className: n, disabled: r = !1, render: i, value: a, id: o, nativeButton: s = !0, style: c, ...l } = e, { value: u, getTabPanelIdByValue: d, onValueChange: f, orientation: p, tabActivationDirection: m } = Wj(), { activateOnFocus: h, registerTabResizeObserverElement: g, tabsListElement: _ } = Qj(), { highlightedIndex: v, onHighlightedIndexChange: y } = Ii(), b = Tl(o), { compositeProps: x, compositeRef: S, index: C } = pw({ metadata: Z.useMemo(() => ({
		disabled: r,
		id: b,
		value: a
	}), [
		r,
		b,
		a
	]) }), w = a === u, T = Z.useRef(!1), E = Z.useRef(null), D = G((e) => {
		E.current?.(), E.current = e ? g(e) : null;
	});
	K(() => {
		if (T.current) {
			T.current = !1;
			return;
		}
		if (!(w && C > -1 && v !== C)) return;
		let e = _;
		if (e != null) {
			let t = du(Ui(e));
			if (t && fu(e, t)) return;
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
	let { getButtonProps: O, buttonRef: k } = qi({
		disabled: r,
		native: s,
		focusableWhenDisabled: !0
	}), A = d(a), j = Z.useRef(!1), M = Z.useRef(!1);
	function N(e) {
		f(a, Uc(Kc, e.nativeEvent, void 0, { activationDirection: "none" }));
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
		let t = Ui(e.currentTarget);
		function n() {
			j.current = !1, M.current = !1, t.removeEventListener("pointerup", n), t.removeEventListener("pointercancel", n);
		}
		t.addEventListener("pointerup", n), t.addEventListener("pointercancel", n);
	}
	return xa("button", e, {
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
				[Xj]: w ? "" : void 0,
				onKeyDownCapture() {
					T.current = !0;
				}
			},
			l,
			O
		],
		stateAttributesMapping: Kj
	});
});
// node_modules/@base-ui/react/tabs/panel/TabsPanelDataAttributes.mjs
xc();
var eM = "data-index";
Y_(), mi(), El(), xc(), om(), Xp(), Aa(), Kx();
var tM = {
	...Kj,
	...bc
}, nM = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { className: n, value: r, render: i, keepMounted: a = !1, style: o, ...s } = e, { value: c, getTabIdByPanelValue: l, orientation: u, tabActivationDirection: d, registerMountedTabPanel: f } = Wj(), p = Tl(), { ref: m, index: h } = Wx(), g = r === c, { mounted: _, transitionStatus: v, setMounted: y } = Jp(g), b = !_, x = l(r), S = {
		hidden: b,
		orientation: u,
		tabActivationDirection: d,
		transitionStatus: v
	}, C = Z.useRef(null), w = xa("div", e, {
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
			inert: J_(!g),
			[eM]: h
		}, s],
		stateAttributesMapping: tM
	});
	return im({
		open: g,
		ref: C,
		onComplete() {
			g || y(!1);
		}
	}), K(() => {
		if (!(p == null || b && !a)) return f(r, p);
	}, [
		b,
		a,
		r,
		p,
		f
	]), a || _ ? w : null;
});
zw(), di(), ia(), mi(), ma(), L_(), oh();
function rM(e) {
	let { loopFocus: t = !0, orientation: n = "both", grid: r, onLoop: i, direction: a, highlightedIndex: o, onHighlightedIndexChange: s, rootRef: c, enableHomeAndEndKeys: l = !1, stopEventPropagation: u, disabledIndices: d, modifierKeys: f = fa } = e, [p, m] = Z.useState(0), h = r != null, g = Z.useRef(null), _ = Qi(g, c), v = Z.useRef([]), y = Z.useRef(!1), b = Z.useRef(null), x = o ?? p, S = G((e, t = !1) => {
		if (b.current = v.current[e] ?? null, (s ?? m)(e), t) {
			let t = v.current[e];
			E_(g.current, t, a, n);
		}
	}), C = G((e) => {
		if (e.size === 0) return;
		if (y.current) {
			let e = v.current, t = e.indexOf(b.current);
			if (t === -1) {
				let t = e[x];
				!t || qd(e, x, d) ? S(iM(e, d)) : b.current = t;
			} else t !== x && S(t);
			return;
		}
		y.current = !0;
		let t = Array.from(e.keys()), r = t.find((e) => e?.hasAttribute("data-composite-item-active")) ?? null, i = r ? e.get(r)?.index ?? -1 : -1;
		if (i !== -1) S(i);
		else if (qd(t, x, d)) {
			let e = Kd(t, { disabledIndices: d });
			Hd(t, e) || S(e);
		}
		E_(g.current, r, a, n);
	});
	K(() => {
		if (d == null || o != null || !y.current) return;
		let e = v.current;
		if (qd(e, x, d)) {
			let t = Kd(e, { disabledIndices: d });
			Hd(e, t) || S(t);
		}
	}, [
		d,
		o,
		x,
		v,
		S
	]);
	let w = G((e, t, n) => i ? i(e, t, n, v) : n), T = G((e) => {
		let o = e.key === "Home" || e.key === "End";
		if (!P_.has(e.key) || !l && o || aM(e, f) || !g.current) return;
		let s = a === "rtl", c = s ? j_ : M_, p = s ? M_ : j_, m = n === "vertical" ? A_ : c, _ = n === "vertical" ? k_ : p, y = mu(e.nativeEvent);
		if (y != null && T_(y) && !Rw(y)) {
			let t = y.selectionStart, n = y.selectionEnd, r = y.value;
			if (t == null || e.shiftKey || t !== n || e.key !== _ && t < r.length || e.key !== m && t > 0) return;
		}
		let b = x, C = Ud(v, d), T = Wd(v, d);
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
		l && (e.key === "Home" ? b = C : e.key === "End" && (b = T)), b === x && (E || D) && (t && b === T && E ? (b = C, i && (b = i(e, x, b, v))) : t && b === C && D ? (b = T, i && (b = i(e, x, b, v))) : b = Kd(v.current, {
			startingIndex: b,
			decrement: D,
			disabledIndices: d
		})), b !== x && !Hd(v.current, b) && (u && e.stopPropagation(), (h || o || E || D) && e.preventDefault(), S(b, !0), queueMicrotask(() => {
			v.current[b]?.focus();
		}));
	});
	return {
		props: {
			ref: _,
			onFocus(e) {
				let t = g.current, n = mu(e.nativeEvent);
				t && n != null && T_(n) && n.setSelectionRange(0, n.value.length);
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
function iM(e, t) {
	let n = -1;
	for (let r = 0; r < e.length; r += 1) {
		let i = e[r];
		if (i && !qd(e, r, t)) {
			if (i.hasAttribute("data-composite-item-active")) return r;
			n === -1 && (n = r);
		}
	}
	return Math.max(n, 0);
}
function aM(e, t) {
	for (let n of I_) if (!t.includes(n) && e.getModifierState(n)) return !0;
	return !1;
}
ma(), EC(), zi(), Aa(), JS();
function oM(e) {
	let { render: t, className: n, style: r, refs: i = fa, props: a = fa, state: o = pa, stateAttributesMapping: s, highlightedIndex: c, onHighlightedIndexChange: l, orientation: u, grid: d, loopFocus: f, onLoop: p, enableHomeAndEndKeys: m, onMapChange: h, stopEventPropagation: g = !0, rootRef: _, disabledIndices: v, modifierKeys: y, highlightItemOnHover: b = !1, tag: x = "div", ...S } = e, { props: C, highlightedIndex: w, onHighlightedIndexChange: T, elementsRef: E, onMapChange: D, relayKeyboardEvent: O } = rM({
		grid: d,
		loopFocus: f,
		onLoop: p,
		orientation: u,
		highlightedIndex: c,
		onHighlightedIndexChange: l,
		rootRef: _,
		stopEventPropagation: g,
		enableHomeAndEndKeys: m,
		direction: GS(),
		disabledIndices: v,
		modifierKeys: y
	}), k = xa(x, e, {
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
	return /*#__PURE__*/ (0, X.jsx)(Ri.Provider, {
		value: A,
		children: /*#__PURE__*/ (0, X.jsx)(_C, {
			elementsRef: E,
			onMapChange: (e) => {
				h?.(e), D(e);
			},
			children: k
		})
	});
}
di(), mi(), ma();
var sM = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { activateOnFocus: n = !1, className: r, loopFocus: i = !0, render: a, style: o, ...s } = e, { orientation: c, setTabMap: l, tabActivationDirection: u } = Wj(), [d, f] = Z.useState(0), [p, m] = Z.useState(null), h = Z.useRef(/* @__PURE__ */ new Set()), g = Z.useRef(/* @__PURE__ */ new Set()), _ = Z.useRef(null);
	K(() => {
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
	let v = G((e) => (h.current.add(e), () => {
		h.current.delete(e);
	})), y = G((e) => (g.current.add(e), _.current?.observe(e), () => {
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
	return /*#__PURE__*/ (0, X.jsx)(Zj.Provider, {
		value: S,
		children: /*#__PURE__*/ (0, X.jsx)(oM, {
			render: a,
			className: r,
			style: o,
			state: b,
			refs: [t, m],
			props: [x, s],
			stateAttributesMapping: Kj,
			highlightedIndex: d,
			enableHomeAndEndKeys: !0,
			loopFocus: i,
			orientation: c,
			onHighlightedIndexChange: f,
			onMapChange: l,
			disabledIndices: fa
		})
	});
});
Va(), vs();
function cM({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(qj, {
		"data-slot": "tabs",
		"data-orientation": t,
		className: _s("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", e),
		...n
	});
}
var lM = Ba("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-muted",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function uM({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(sM, {
		"data-slot": "tabs-list",
		"data-variant": t,
		className: _s(lM({ variant: t }), e),
		...n
	});
}
function dM({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)($j, {
		"data-slot": "tabs-trigger",
		className: _s("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-[active]:shadow-sm group-data-[variant=line]/tabs-list:data-[active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent", "data-[active]:bg-background data-[active]:text-foreground dark:data-[active]:border-input dark:data-[active]:bg-input/30 dark:data-[active]:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[active]:after:opacity-100", e),
		...t
	});
}
function fM({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(nM, {
		"data-slot": "tabs-content",
		className: _s("d3-tabs-panel flex-1 text-sm outline-none", e),
		...t
	});
}
Dr(), Gb(), Cs(), cy(), zb(), Hk();
function pM({ initialMessage: e = "", onSubmit: t, onGuest: n }) {
	let [r, i] = (0, Z.useState)("login"), [a, o] = (0, Z.useState)(""), [s, c] = (0, Z.useState)(""), [l, u] = (0, Z.useState)(""), [d, f] = (0, Z.useState)(e), [p, m] = (0, Z.useState)(!1);
	return (0, Z.useEffect)(() => f(e), [e]), /* @__PURE__ */ (0, X.jsx)("main", {
		className: "fixed inset-0 z-[2147483647] grid min-h-svh place-items-center overflow-y-auto bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, X.jsxs)(Lj, {
			className: "w-full max-w-[380px] animate-ui-enter border-border bg-card shadow-none",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(Rj, {
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
						children: [/* @__PURE__ */ (0, X.jsx)(zj, {
							className: "text-xl",
							children: r === "register" ? "Criar conta" : r === "code" ? "Entrar com código" : "Entrar no OrganizeOn"
						}), /* @__PURE__ */ (0, X.jsx)(Bj, { children: "Autentique-se para acessar seus jogos e configurações." })]
					})]
				}),
				/* @__PURE__ */ (0, X.jsxs)(Vj, { children: [/* @__PURE__ */ (0, X.jsxs)(cM, {
					value: r,
					onValueChange: (e) => {
						i(e), f("");
					},
					children: [/* @__PURE__ */ (0, X.jsxs)(uM, {
						className: "grid h-9 w-full grid-cols-3 bg-muted/70",
						children: [
							/* @__PURE__ */ (0, X.jsx)(dM, {
								value: "login",
								children: "Entrar"
							}),
							/* @__PURE__ */ (0, X.jsx)(dM, {
								value: "register",
								children: "Criar conta"
							}),
							/* @__PURE__ */ (0, X.jsx)(dM, {
								value: "code",
								children: "Código"
							})
						]
					}), /* @__PURE__ */ (0, X.jsx)(fM, {
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
									children: ["Código de login", /* @__PURE__ */ (0, X.jsx)(Lb, {
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
									children: ["Usuário", /* @__PURE__ */ (0, X.jsx)(Lb, {
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
									children: ["Senha", /* @__PURE__ */ (0, X.jsx)(Lb, {
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
				/* @__PURE__ */ (0, X.jsxs)(Hj, {
					className: "gap-2 border-t border-border pt-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, X.jsx)(Yn, { className: "size-4 shrink-0" }), "Acesse com sua conta OrganizeOn."]
				})
			]
		})
	});
}
function mM(e) {
	return e < 1024 ? `${e} B` : e < 1024 ** 2 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1024 ** 2).toFixed(1)} MB`;
}
function hM(e) {
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
			await t(), await h(), Js.success("Ação concluída");
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
						children: /* @__PURE__ */ (0, X.jsx)(le, {})
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
				/* @__PURE__ */ (0, X.jsxs)(cM, {
					value: p,
					onValueChange: m,
					children: [
						/* @__PURE__ */ (0, X.jsxs)(uM, {
							className: "grid h-9 w-full grid-cols-3 sm:w-auto sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, X.jsx)(dM, {
									value: "backup",
									children: "Backup"
								}),
								/* @__PURE__ */ (0, X.jsx)(dM, {
									value: "progress",
									children: "Progressos"
								}),
								/* @__PURE__ */ (0, X.jsx)(dM, {
									value: "preferences",
									children: "Preferências"
								})
							]
						}),
						/* @__PURE__ */ (0, X.jsx)(fM, {
							value: "backup",
							className: "mt-4",
							children: /* @__PURE__ */ (0, X.jsxs)(Lj, { children: [/* @__PURE__ */ (0, X.jsxs)(Rj, {
								className: "flex-row items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsxs)(zj, {
									className: "flex items-center gap-2 text-base",
									children: [/* @__PURE__ */ (0, X.jsx)(Ie, { className: "size-4 text-muted-foreground" }), "Backup na nuvem"]
								}), /* @__PURE__ */ (0, X.jsx)(Bj, {
									className: "mt-1",
									children: "Sincronize preferências e dados da conta."
								})] }), /* @__PURE__ */ (0, X.jsx)(Ub, {
									variant: t?.enabled ? "default" : "secondary",
									children: t ? t.enabled ? "Ativo" : "Desativado" : "Consultando"
								})]
							}), /* @__PURE__ */ (0, X.jsxs)(Vj, {
								className: "grid gap-4",
								children: [/* @__PURE__ */ (0, X.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3 border-t pt-4 text-sm",
									children: [/* @__PURE__ */ (0, X.jsx)("span", {
										className: "text-muted-foreground",
										children: "Armazenamento utilizado"
									}), /* @__PURE__ */ (0, X.jsxs)("strong", {
										className: "font-mono text-xs sm:text-sm",
										children: [
											t ? mM(t.size || 0) : "—",
											" / ",
											mM(_)
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
						/* @__PURE__ */ (0, X.jsx)(fM, {
							value: "progress",
							className: "mt-4",
							children: /* @__PURE__ */ (0, X.jsxs)(Lj, { children: [/* @__PURE__ */ (0, X.jsxs)(Rj, { children: [/* @__PURE__ */ (0, X.jsxs)(zj, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, X.jsx)(vt, { className: "size-4 text-muted-foreground" }), "Progresso dos jogos"]
							}), /* @__PURE__ */ (0, X.jsx)(Bj, { children: "Os arquivos dos jogos continuam no navegador. Estas ações removem apenas os saves." })] }), /* @__PURE__ */ (0, X.jsxs)(Vj, {
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
										children: [/* @__PURE__ */ (0, X.jsxs)(Vk, {
											value: a,
											onValueChange: (e) => o(e ?? ""),
											children: [/* @__PURE__ */ (0, X.jsx)(Fk, {
												className: "w-full",
												children: /* @__PURE__ */ (0, X.jsx)(Pk, { placeholder: "Escolha um jogo" })
											}), /* @__PURE__ */ (0, X.jsx)(Ik, { children: r.map((e) => /* @__PURE__ */ (0, X.jsxs)(Lk, {
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
						/* @__PURE__ */ (0, X.jsx)(fM, {
							value: "preferences",
							className: "mt-4",
							children: /* @__PURE__ */ (0, X.jsxs)(Lj, { children: [/* @__PURE__ */ (0, X.jsxs)(Rj, { children: [/* @__PURE__ */ (0, X.jsxs)(zj, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, X.jsx)(Un, { className: "size-4 text-muted-foreground" }), "Preferências locais"]
							}), /* @__PURE__ */ (0, X.jsx)(Bj, { children: "Tema, proxy, identidade do navegador e teclas ficam salvos neste dispositivo." })] }), /* @__PURE__ */ (0, X.jsx)(Vj, { children: /* @__PURE__ */ (0, X.jsx)(Y, {
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
				/* @__PURE__ */ (0, X.jsx)($v, {
					open: d !== null,
					onOpenChange: (e) => !e && f(null),
					children: /* @__PURE__ */ (0, X.jsxs)(ny, { children: [/* @__PURE__ */ (0, X.jsxs)(ry, { children: [/* @__PURE__ */ (0, X.jsx)(ay, { children: "Confirmar exclusão" }), /* @__PURE__ */ (0, X.jsx)(oy, { children: d === "clear-all" ? "Apagar todos os saves de jogos deste perfil?" : d === "clear-game" ? `Apagar o save de ${a}?` : "Apagar as preferências locais deste dispositivo?" })] }), /* @__PURE__ */ (0, X.jsxs)(iy, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
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
function gM(e) {
	let [t, n] = (0, Z.useState)(e.currentId);
	return /* @__PURE__ */ (0, X.jsx)($v, {
		open: !0,
		onOpenChange: (t) => {
			t || e.onClose();
		},
		children: /* @__PURE__ */ (0, X.jsxs)(ny, {
			className: "max-h-[min(86svh,760px)] overflow-y-auto sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(ry, { children: [/* @__PURE__ */ (0, X.jsx)(ay, { children: "Servidor proxy" }), /* @__PURE__ */ (0, X.jsxs)(oy, { children: [e.guestMode ? "Convidados usam apenas servidores públicos externos." : "Escolha o servidor WISP usado pelo cliente.", " A medição representa a abertura do WebSocket neste dispositivo."] })] }),
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
											children: [r.name, r.beta && /* @__PURE__ */ (0, X.jsx)(Ub, {
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
											children: [/* @__PURE__ */ (0, X.jsx)(tr, { className: `size-3 ${i.state === "online" ? "text-emerald-500" : i.state === "offline" ? "text-destructive" : ""}` }), i.label]
										})
									]
								}),
								a && /* @__PURE__ */ (0, X.jsx)(we, { className: "size-4 text-foreground" })
							]
						}, r.id);
					})
				}),
				/* @__PURE__ */ (0, X.jsx)("p", {
					className: "rounded-md border bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground",
					children: "Servidores beta são operados por terceiros. O tráfego de navegação pode não passar pelo backend OrganizeOn."
				}),
				/* @__PURE__ */ (0, X.jsxs)(iy, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
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
function _M(e) {
	let { type: t, ...n } = e, r = (0, Z.useMemo)(() => t === "login" ? /* @__PURE__ */ (0, X.jsx)(pM, { ...n }) : t === "data" ? /* @__PURE__ */ (0, X.jsx)(hM, { ...n }) : t === "proxy" ? /* @__PURE__ */ (0, X.jsx)(gM, { ...n }) : /* @__PURE__ */ (0, X.jsx)(Ij, { ...n }), [t, n]);
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: t === "account" ? "organizeon-ui organizeon-overlay-root dark text-foreground" : "organizeon-ui dark min-h-svh bg-background text-foreground",
		children: r
	});
}
Dr(), Gb(), Cs();
function vM({ game: e }) {
	let t = e.type === "flash" ? "Flash · Ruffle" : e.type === "external-download" ? "HTML offline" : e.type === "remote" ? "Multiplayer" : "HTML5";
	return /* @__PURE__ */ (0, X.jsxs)(Lj, {
		className: "h-full overflow-hidden rounded-lg border-border bg-card p-0 shadow-none transition-colors hover:border-zinc-600",
		children: [/* @__PURE__ */ (0, X.jsx)("img", {
			className: "aspect-[16/10] w-full bg-muted object-cover",
			src: e.cover,
			alt: `Capa de ${e.name}`,
			loading: "lazy"
		}), /* @__PURE__ */ (0, X.jsxs)(Vj, {
			className: "grid gap-3 p-3.5 sm:p-4",
			children: [
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "flex flex-wrap gap-1.5",
					children: [
						/* @__PURE__ */ (0, X.jsxs)(Ub, {
							variant: "secondary",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, X.jsx)(vt, { className: "size-3" }), t]
						}),
						e.platforms.map((e) => /* @__PURE__ */ (0, X.jsx)(Ub, {
							variant: "outline",
							children: e
						}, e)),
						e.mobileWarning && /* @__PURE__ */ (0, X.jsx)(Ub, {
							variant: "outline",
							children: "Melhor com teclado"
						}),
						e.trending && /* @__PURE__ */ (0, X.jsxs)(Ub, {
							variant: "outline",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, X.jsx)(lt, { className: "size-3" }), "Em alta"]
						})
					]
				}),
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "flex min-w-0 items-start gap-2",
					children: [/* @__PURE__ */ (0, X.jsx)("h2", {
						className: "min-w-0 flex-1 text-base font-semibold leading-5 tracking-tight",
						children: e.name
					}), /* @__PURE__ */ (0, X.jsx)(Ub, {
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
							children: [e.type === "external-download" ? /* @__PURE__ */ (0, X.jsx)(He, {}) : e.type === "remote" ? /* @__PURE__ */ (0, X.jsx)(Tn, {}) : /* @__PURE__ */ (0, X.jsx)(Sn, {}), /* @__PURE__ */ (0, X.jsx)("span", {
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
							children: [/* @__PURE__ */ (0, X.jsx)(et, {}), "Créditos"]
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
							children: /* @__PURE__ */ (0, X.jsx)(ur, {})
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
Dr(), Cs(), zb();
function yM({ count: e, categories: t, onBack: n, onQueryChange: r, onFilterChange: i }) {
	let [a, o] = (0, Z.useState)("all"), s = [
		{
			id: "all",
			label: "Todos",
			icon: vt
		},
		{
			id: "trending",
			label: "Em alta",
			icon: lt
		},
		{
			id: "flash",
			label: "Flash",
			icon: Tr
		},
		{
			id: "pc",
			label: "PC",
			icon: null
		},
		{
			id: "mobile",
			label: "Celular",
			icon: ir
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
					children: /* @__PURE__ */ (0, X.jsx)(le, {})
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
					children: [/* @__PURE__ */ (0, X.jsx)(Ln, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, X.jsx)(Lb, {
						className: "pl-9",
						type: "search",
						"aria-label": "Pesquisar jogos",
						placeholder: `Pesquisar em ${e || "…"} jogos`,
						onChange: (e) => r(e.target.value)
					})]
				})
			]
		}), /* @__PURE__ */ (0, X.jsx)(cM, {
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
				children: /* @__PURE__ */ (0, X.jsx)(uM, {
					"aria-label": "Filtrar jogos",
					className: "h-auto w-max max-w-none flex-nowrap justify-start gap-1 bg-transparent p-0",
					children: s.map(({ id: e, label: t, icon: n }) => /* @__PURE__ */ (0, X.jsxs)(dM, {
						value: e,
						className: "min-h-8 flex-none gap-1.5 border border-transparent px-2.5 text-xs data-[active]:border-border data-[active]:bg-muted data-[active]:text-foreground",
						children: [n && /* @__PURE__ */ (0, X.jsx)(n, { className: "size-3.5" }), t]
					}, e))
				})
			})
		})]
	});
}
Dr(), Cs(), cy();
function bM({ title: e, description: t, confirmLabel: n = "Continuar", onCancel: r, onConfirm: i }) {
	return /* @__PURE__ */ (0, X.jsx)($v, {
		open: !0,
		onOpenChange: (e) => !e && r(),
		children: /* @__PURE__ */ (0, X.jsxs)(ny, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, X.jsxs)(ry, { children: [
				/* @__PURE__ */ (0, X.jsx)("div", {
					className: "grid size-9 place-items-center rounded-md border bg-muted",
					children: /* @__PURE__ */ (0, X.jsx)(pr, { className: "size-4 text-muted-foreground" })
				}),
				/* @__PURE__ */ (0, X.jsx)(ay, { children: e }),
				/* @__PURE__ */ (0, X.jsx)(oy, { children: t })
			] }), /* @__PURE__ */ (0, X.jsxs)(iy, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
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
function xM({ game: e, onClose: t }) {
	return /* @__PURE__ */ (0, X.jsx)($v, {
		open: !0,
		onOpenChange: (e) => !e && t(),
		children: /* @__PURE__ */ (0, X.jsxs)(ny, {
			className: "max-h-[85svh] overflow-y-auto sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(ry, { children: [/* @__PURE__ */ (0, X.jsxs)(ay, { children: ["Créditos · ", e.name] }), /* @__PURE__ */ (0, X.jsx)(oy, { children: "Créditos e licença deste jogo." })] }),
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
				/* @__PURE__ */ (0, X.jsx)(iy, { children: /* @__PURE__ */ (0, X.jsx)(Y, {
					onClick: t,
					children: "Fechar"
				}) })
			]
		})
	});
}
function SM({ name: e, definitions: t, selectedKeys: n, defaultKeys: r, isTetris: i, initialLeftHanded: a, onClose: o, onSave: s, onFullscreen: c }) {
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
	return /* @__PURE__ */ (0, X.jsx)($v, {
		open: !0,
		onOpenChange: (e) => !e && o(),
		children: /* @__PURE__ */ (0, X.jsxs)(ny, {
			className: "max-h-[min(85svh,720px)] overflow-y-auto sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(ry, { children: [/* @__PURE__ */ (0, X.jsxs)(ay, { children: ["Teclas · ", e] }), /* @__PURE__ */ (0, X.jsx)(oy, { children: "Ative as teclas usadas pelo jogo. A seleção fica salva neste aparelho." })] }),
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
							children: [/* @__PURE__ */ (0, X.jsx)(Jt, {}), "Tela cheia"]
						})
					]
				}),
				/* @__PURE__ */ (0, X.jsxs)(iy, {
					className: "flex-col-reverse sm:flex-row",
					children: [/* @__PURE__ */ (0, X.jsxs)(Y, {
						type: "button",
						variant: "outline",
						onClick: m,
						children: [/* @__PURE__ */ (0, X.jsx)(Pn, {}), "Restaurar padrão"]
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
Dr(), Cs(), Hk();
function CM({ title: e, description: t, label: n, value: r, options: i, applyLabel: a = "Aplicar", onApply: o }) {
	let [s, c] = (0, Z.useState)(r), l = s !== r, u = i.find((e) => e.value === s)?.description;
	return /* @__PURE__ */ (0, X.jsxs)(Lj, {
		className: "w-full animate-ui-enter",
		children: [/* @__PURE__ */ (0, X.jsxs)(Rj, {
			className: "gap-1.5 pb-0 sm:flex sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, X.jsx)(zj, { children: e }), /* @__PURE__ */ (0, X.jsx)(Bj, {
					className: "mt-1 max-w-3xl leading-relaxed",
					children: t
				})]
			}), /* @__PURE__ */ (0, X.jsxs)("div", {
				className: "grid w-full gap-2 sm:w-auto sm:min-w-52 sm:grid-cols-[minmax(9rem,1fr)_auto]",
				children: [/* @__PURE__ */ (0, X.jsxs)(Vk, {
					value: s,
					onValueChange: (e) => e && c(e),
					children: [/* @__PURE__ */ (0, X.jsx)(Fk, {
						"aria-label": n,
						className: "h-9 w-full",
						children: /* @__PURE__ */ (0, X.jsx)(Pk, {})
					}), /* @__PURE__ */ (0, X.jsx)(Ik, { children: i.map((e) => /* @__PURE__ */ (0, X.jsx)(Lk, {
						value: e.value,
						children: e.label
					}, e.value)) })]
				}), /* @__PURE__ */ (0, X.jsxs)(Y, {
					size: "sm",
					disabled: !l,
					onClick: () => o(s),
					children: [l ? /* @__PURE__ */ (0, X.jsx)(we, { "data-icon": "inline-start" }) : null, a]
				})]
			})]
		}), u ? /* @__PURE__ */ (0, X.jsx)(Vj, {
			className: "pt-2 text-xs text-muted-foreground",
			children: u
		}) : null]
	});
}
Dr(), Cs(), zb();
function wM({ onSubmit: e }) {
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
		children: /* @__PURE__ */ (0, X.jsxs)(Lj, {
			className: "w-full max-w-[380px] border-border bg-card shadow-none animate-ui-enter",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(Rj, {
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
						children: [/* @__PURE__ */ (0, X.jsx)(zj, {
							className: "text-xl",
							children: "Entrar no painel"
						}), /* @__PURE__ */ (0, X.jsx)(Bj, { children: "Autentique-se para acessar o conteúdo do Endpoint 2." })]
					})]
				}),
				/* @__PURE__ */ (0, X.jsx)(Vj, { children: /* @__PURE__ */ (0, X.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: (e) => void l(e),
					children: [
						/* @__PURE__ */ (0, X.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Usuário", /* @__PURE__ */ (0, X.jsx)(Lb, {
								autoComplete: "username",
								value: t,
								onChange: (e) => n(e.target.value),
								required: !0,
								disabled: s
							})]
						}),
						/* @__PURE__ */ (0, X.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Senha", /* @__PURE__ */ (0, X.jsx)(Lb, {
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
							children: [s && /* @__PURE__ */ (0, X.jsx)(zt, { className: "animate-spin" }), s ? "Entrando…" : "Entrar"]
						})
					]
				}) }),
				/* @__PURE__ */ (0, X.jsxs)(Hj, {
					className: "gap-2 border-t border-border pt-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, X.jsx)(Yn, { className: "size-4" }), "Acesse com sua conta OrganizeOn."]
				})
			]
		})
	});
}
// src/hooks/use-service-theme.ts
function TM(e) {
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
function EM({ icon: e, active: t }) {
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
Dr(), Cs();
function DM() {
	let { setOpenMobile: e } = _j();
	return /* @__PURE__ */ (0, X.jsx)(Oj, { children: /* @__PURE__ */ (0, X.jsx)(kj, { children: /* @__PURE__ */ (0, X.jsxs)(jj, {
		isActive: !0,
		tooltip: "Meus arquivos",
		onClick: () => e(!1),
		children: [/* @__PURE__ */ (0, X.jsx)(ot, {}), /* @__PURE__ */ (0, X.jsx)("span", { children: "Meus arquivos" })]
	}) }) });
}
function OM({ children: e, username: t, role: n, logout: r, refresh: i, refreshing: a }) {
	let { rootRef: o, theme: s, toggleTheme: c } = TM("d2-theme");
	return /* @__PURE__ */ (0, X.jsx)("div", {
		ref: o,
		className: "contents",
		children: /* @__PURE__ */ (0, X.jsx)(oj, { children: /* @__PURE__ */ (0, X.jsx)(NA, {
			username: t,
			children: /* @__PURE__ */ (0, X.jsxs)(vj, {
				defaultOpen: !0,
				children: [/* @__PURE__ */ (0, X.jsxs)(yj, {
					collapsible: "icon",
					children: [
						/* @__PURE__ */ (0, X.jsx)(Sj, {
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
						/* @__PURE__ */ (0, X.jsx)(wj, {}),
						/* @__PURE__ */ (0, X.jsx)(Tj, { children: /* @__PURE__ */ (0, X.jsxs)(Ej, { children: [/* @__PURE__ */ (0, X.jsx)(Dj, { children: "Workspace" }), /* @__PURE__ */ (0, X.jsx)(DM, {})] }) }),
						/* @__PURE__ */ (0, X.jsx)(Cj, {
							className: "px-2 pb-3",
							children: /* @__PURE__ */ (0, X.jsx)(Pj, {
								username: t,
								role: n,
								onLogout: r
							})
						})
					]
				}), /* @__PURE__ */ (0, X.jsxs)(xj, {
					className: "min-h-svh min-w-0",
					children: [/* @__PURE__ */ (0, X.jsxs)("header", {
						className: "sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4 sm:px-6",
						children: [
							/* @__PURE__ */ (0, X.jsx)(bj, { "aria-label": "Abrir ou recolher navegação" }),
							/* @__PURE__ */ (0, X.jsx)("span", {
								className: "flex-1 text-sm font-medium",
								children: "Meus arquivos"
							}),
							/* @__PURE__ */ (0, X.jsx)(Y, {
								variant: "ghost",
								size: "icon",
								onClick: c,
								"aria-label": s === "dark" ? "Ativar tema claro" : "Ativar tema escuro",
								children: s === "dark" ? /* @__PURE__ */ (0, X.jsx)(sr, {}) : /* @__PURE__ */ (0, X.jsx)(rn, {})
							}),
							/* @__PURE__ */ (0, X.jsx)(Y, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Atualizar",
								disabled: a,
								onClick: i,
								children: /* @__PURE__ */ (0, X.jsx)(EM, {
									icon: On,
									active: a
								})
							})
						]
					}), /* @__PURE__ */ (0, X.jsx)("main", {
						className: "mx-auto grid w-full max-w-5xl gap-5 px-4 py-6 sm:px-6 sm:py-8",
						children: e
					})]
				})]
			})
		}) })
	});
}
Dr(), Cs(), zb(), cy();
function kM({ username: e, role: t, request: n, upload: r, logout: i }) {
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
	return /* @__PURE__ */ (0, X.jsxs)(OM, {
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
			/* @__PURE__ */ (0, X.jsxs)(Lj, { children: [/* @__PURE__ */ (0, X.jsxs)(Rj, { children: [/* @__PURE__ */ (0, X.jsx)(zj, { children: "Adicionar arquivo" }), /* @__PURE__ */ (0, X.jsx)(Bj, { children: "Selecione um arquivo ou crie um texto." })] }), /* @__PURE__ */ (0, X.jsxs)(Vj, {
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
							children: [/* @__PURE__ */ (0, X.jsx)(ft, {}), "Selecionar arquivo"]
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
							children: [/* @__PURE__ */ (0, X.jsx)(gr, {}), "Enviar arquivo"]
						}), /* @__PURE__ */ (0, X.jsxs)(Y, {
							variant: "outline",
							onClick: () => _({
								name: "script.txt",
								content: ""
							}),
							children: [/* @__PURE__ */ (0, X.jsx)(Ze, {}), "Novo texto"]
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
			g && /* @__PURE__ */ (0, X.jsxs)(Lj, { children: [/* @__PURE__ */ (0, X.jsx)(Rj, { children: /* @__PURE__ */ (0, X.jsx)(zj, { children: g.id ? "Editar texto" : "Novo texto" }) }), /* @__PURE__ */ (0, X.jsx)(Vj, { children: /* @__PURE__ */ (0, X.jsxs)("form", {
				className: "grid gap-3",
				onSubmit: (e) => void C(e),
				children: [
					/* @__PURE__ */ (0, X.jsx)(Lb, {
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
			/* @__PURE__ */ (0, X.jsxs)(Lj, { children: [/* @__PURE__ */ (0, X.jsxs)(Rj, { children: [/* @__PURE__ */ (0, X.jsx)(zj, { children: "Arquivos" }), /* @__PURE__ */ (0, X.jsx)(Bj, { children: o.length ? `${o.length} arquivo(s)` : "Nenhum arquivo ainda." })] }), /* @__PURE__ */ (0, X.jsx)(Vj, {
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
								children: [/* @__PURE__ */ (0, X.jsx)(gn, {}), "Editar"]
							}),
							/* @__PURE__ */ (0, X.jsxs)(Y, {
								variant: "outline",
								size: "sm",
								onClick: () => void T(e),
								children: [/* @__PURE__ */ (0, X.jsx)(ze, {}), "Copiar link"]
							}),
							/* @__PURE__ */ (0, X.jsxs)(Y, {
								variant: "destructive",
								size: "sm",
								onClick: () => y(e),
								children: [/* @__PURE__ */ (0, X.jsx)(ur, {}), "Apagar"]
							})
						]
					})]
				}, e.id))
			})] }),
			/* @__PURE__ */ (0, X.jsx)($v, {
				open: !!v,
				onOpenChange: (e) => {
					e || y(null);
				},
				children: /* @__PURE__ */ (0, X.jsxs)(ny, { children: [/* @__PURE__ */ (0, X.jsxs)(ry, { children: [/* @__PURE__ */ (0, X.jsx)(ay, { children: "Apagar arquivo?" }), /* @__PURE__ */ (0, X.jsx)(oy, { children: v?.name })] }), /* @__PURE__ */ (0, X.jsxs)(iy, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
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
_(), Qv();
var AM = /* @__PURE__ */ new WeakMap(), jM = /* @__PURE__ */ new WeakMap(), MM = /* @__PURE__ */ new WeakMap();
function NM(e, t) {
	let n = t?.getRootNode(), r = n instanceof ShadowRoot ? n : document, i = r.querySelector("link[data-organizeon-ui=\"client\"]");
	if (i) return i;
	let a = document.createElement("link");
	return a.rel = "stylesheet", a.href = e, a.dataset.organizeonUi = "client", r instanceof ShadowRoot ? r.append(a) : document.head.append(a), a;
}
function PM(e, t, n) {
	jM.get(e)?.unmount(), NM(n, e);
	let r = (0, As.createRoot)(e);
	(0, js.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui dark min-h-full",
		children: /* @__PURE__ */ (0, X.jsx)(vM, { game: t })
	}))), jM.set(e, r);
}
function FM(e) {
	jM.get(e)?.unmount(), jM.delete(e);
}
function IM(e, t, n) {
	NM(n, e);
	let r = (0, As.createRoot)(e), i = (e) => (0, js.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui organizeon-inline-ui dark",
		children: /* @__PURE__ */ (0, X.jsx)(yM, { ...e })
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
function LM(e, t, n) {
	MM.get(e)?.unmount(), NM(n, e);
	let r = (0, As.createRoot)(e);
	(0, js.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui organizeon-inline-ui dark",
		children: /* @__PURE__ */ (0, X.jsx)(CM, { ...t })
	}))), MM.set(e, r);
}
function RM(e) {
	MM.get(e)?.unmount(), MM.delete(e);
}
function zM(e, t, n) {
	e.classList.add("organizeon-ui", "organizeon-overlay-root", "dark");
	let r = NM(n, e), i = (0, As.createRoot)(e), a = v(r, () => (0, js.flushSync)(() => i.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui dark",
		children: /* @__PURE__ */ (0, X.jsx)(qv, {
			container: e,
			children: t
		})
	}))));
	return () => {
		a(), i.unmount();
	};
}
function BM(e, t, n, r) {
	return zM(e, /* @__PURE__ */ (0, X.jsx)(xM, {
		game: t,
		onClose: n
	}), r);
}
function VM(e, t, n) {
	return zM(e, /* @__PURE__ */ (0, X.jsx)(SM, { ...t }), n);
}
function HM(e, t, n = "Confirmar ação", r = "Continuar") {
	return new Promise((i) => {
		let a = document.createElement("div");
		a.className = "organizeon-ui dark", document.body.append(a), NM(t, a);
		let o = (0, As.createRoot)(a), s = !1, c = (e) => {
			s || (s = !0, o.unmount(), a.remove(), i(e));
		};
		(0, js.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(qv, {
			container: a,
			children: /* @__PURE__ */ (0, X.jsx)(bM, {
				title: n,
				description: e,
				confirmLabel: r,
				onCancel: () => c(!1),
				onConfirm: () => c(!0)
			})
		})));
	});
}
function UM(e, t, n) {
	AM.get(e)?.root.unmount();
	let r = e.shadowRoot ?? e.attachShadow({ mode: "open" });
	r.replaceChildren();
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = n, r.append(i);
	let a = document.createElement("div");
	a.className = t.type === "account" ? "organizeon-ui organizeon-overlay-root dark" : "organizeon-ui dark", r.append(a);
	let o = (0, As.createRoot)(a);
	return o.render(/* @__PURE__ */ (0, X.jsx)(qv, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(oj, { children: /* @__PURE__ */ (0, X.jsx)(_M, { ...t }) })
	})), AM.set(e, {
		root: o,
		shadow: r,
		container: a
	}), () => {
		let t = AM.get(e);
		t && (t.root.unmount(), t.shadow.replaceChildren(), AM.delete(e));
	};
}
function WM(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui organizeon-overlay-root dark", r.append(i, a);
	let o = (0, As.createRoot)(a), s = v(i, () => (0, js.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(qv, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(oj, { children: /* @__PURE__ */ (0, X.jsx)(_M, { ...t }) })
	}))));
	return () => {
		s(), o.unmount(), r.replaceChildren();
	};
}
function GM(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui dark", r.append(i, a);
	let o = (0, As.createRoot)(a);
	return (0, js.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(wM, { onSubmit: t }))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function KM(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui dark", r.append(i, a);
	let o = d((e, n) => {
		let r = {};
		return new Headers(n.headers).forEach((e, t) => {
			r[t] = e;
		}), t.request(e, {
			...n,
			headers: r
		});
	}), s = (0, As.createRoot)(a);
	return (0, js.flushSync)(() => s.render(/* @__PURE__ */ (0, X.jsx)(qv, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(kM, { ...t })
	}))), () => {
		s.unmount(), o(), r.replaceChildren();
	};
}
function qM(e, t) {
	AM.get(e)?.root.unmount();
	let n = e.shadowRoot ?? e.attachShadow({ mode: "open" });
	n.replaceChildren();
	let r = document.createElement("link");
	r.rel = "stylesheet", r.href = t, n.append(r);
	let i = document.createElement("div");
	i.className = "organizeon-ui organizeon-overlay-root dark", n.append(i);
	let a = (0, As.createRoot)(i);
	return a.render(/* @__PURE__ */ (0, X.jsx)(qv, {
		container: i,
		children: /* @__PURE__ */ (0, X.jsx)(uc, {
			position: "bottom-right",
			theme: "dark",
			closeButton: !0,
			richColors: !1
		})
	})), AM.set(e, {
		root: a,
		shadow: n,
		container: i
	}), () => {
		a.unmount(), n.replaceChildren(), AM.delete(e);
	};
}
function JM(e, t = "info", n) {
	Js[t](e, n ? { id: n } : void 0);
}
function YM(e) {
	Js.dismiss(e);
}
function XM(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.textContent = "Carregando interface…", a.style.cssText = "display:grid;place-items:center;min-height:100svh;background:#09090b;color:#a1a1aa;font:14px system-ui";
	let o = document.createElement("div");
	o.className = "organizeon-ui dark", r.append(i, a, o);
	let s = (0, As.createRoot)(o), c = !1, l = t, u = (e) => {
		l = e, c && (0, js.flushSync)(() => s.render(/* @__PURE__ */ (0, X.jsx)(qv, {
			container: o,
			children: /* @__PURE__ */ (0, X.jsx)(oj, { children: /* @__PURE__ */ (0, X.jsx)(_M, { ...l }) })
		})));
	}, d = v(i, () => {
		c = !0, a.remove(), u(l);
	});
	return i.addEventListener("error", () => {
		a.textContent = "Não foi possível carregar os estilos da interface.";
	}, { once: !0 }), {
		update: u,
		unmount: () => {
			d(), s.unmount(), r.replaceChildren();
		}
	};
}
function ZM(e, t, n, r) {
	Js.custom((r) => /* @__PURE__ */ (0, X.jsx)(ws, {
		title: e,
		detail: t,
		percent: n,
		onClose: () => Js.dismiss(r)
	}), {
		id: "connection-status",
		duration: r > 0 ? r : Infinity
	});
}
export { HM as confirmClientAction, YM as dismissClientToast, IM as mountCatalogToolbar, zM as mountClientDialog, UM as mountClientSurface, qM as mountClientToaster, KM as mountD2Dashboard, GM as mountD2Login, PM as mountGameCard, VM as mountGameControlSettingsDialog, BM as mountGameCreditsDialog, WM as mountNavigation, LM as mountPreferenceCard, XM as mountReactiveSurface, JM as showClientToast, ZM as showConnectionToast, FM as unmountGameCard, RM as unmountPreferenceCard };
