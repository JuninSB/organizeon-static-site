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
})), R, z = o((() => {
	R = (e) => {
		for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
		return !1;
	};
})), B, V, H, ee = o((() => {
	B = /* @__PURE__ */ u(b(), 1), V = (0, B.createContext)({}), H = () => (0, B.useContext)(V);
})), te, U, ne = o((() => {
	te = /* @__PURE__ */ u(b(), 1), A(), L(), z(), ee(), U = (0, te.forwardRef)(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
		node: l,
		aliases: [],
		size: 24
	}, ...d }, f) => {
		let { size: p = 24, strokeWidth: m = 2, absoluteStrokeWidth: h = !1, nonScalingStroke: g = !1, color: _ = "currentColor", className: v = "" } = H() ?? {}, y = !!c || R(d), [b, x, S = []] = I(u, {
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
		return (0, te.createElement)(b, {
			ref: f,
			...x
		}, [...S.map(([e, t]) => (0, te.createElement)(e, t)), ...Array.isArray(c) ? c : [c]]);
	});
}));
// node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function W(e, t = [], n = []) {
	let r = typeof e == "string" ? C(e, t, n) : e, i = (0, re.forwardRef)(({ className: e, ...t }, n) => (0, re.createElement)(U, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = D(r.name)), i;
}
var re, G = o((() => {
	re = /* @__PURE__ */ u(b(), 1), w(), O(), ne();
})), K, ie, ae = o((() => {
	G(), K = {
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
	}, K.node, ie = W(K);
})), oe, se, ce = o((() => {
	G(), oe = {
		name: "arrow-left",
		size: 24,
		node: [["path", {
			d: "m12 19-7-7 7-7",
			key: "1l729n"
		}], ["path", {
			d: "M19 12H5",
			key: "x3x0zl"
		}]]
	}, oe.node, se = W(oe);
})), le, ue, de = o((() => {
	G(), le = {
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
	}, le.node, ue = W(le);
})), fe, pe, me = o((() => {
	G(), fe = {
		name: "bell",
		size: 24,
		node: [["path", {
			d: "M10.268 21a2 2 0 0 0 3.464 0",
			key: "vwvbt9"
		}], ["path", {
			d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
			key: "11g9vi"
		}]]
	}, fe.node, pe = W(fe);
})), he, ge, _e = o((() => {
	G(), he = {
		name: "bookmark",
		size: 24,
		node: [["path", {
			d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
			key: "oz39mx"
		}]]
	}, he.node, ge = W(he);
})), ve, ye, be = o((() => {
	G(), ve = {
		name: "check-check",
		size: 24,
		node: [["path", {
			d: "M18 6 7 17l-5-5",
			key: "116fxf"
		}], ["path", {
			d: "m22 10-7.5 7.5L13 16",
			key: "ke71qq"
		}]]
	}, ve.node, ye = W(ve);
})), xe, Se, Ce = o((() => {
	G(), xe = {
		name: "check",
		size: 24,
		node: [["path", {
			d: "M20 6 9 17l-5-5",
			key: "1gmf2c"
		}]]
	}, xe.node, Se = W(xe);
})), we, Te, Ee = o((() => {
	G(), we = {
		name: "chevron-down",
		size: 24,
		node: [["path", {
			d: "m6 9 6 6 6-6",
			key: "qrunsl"
		}]]
	}, we.node, Te = W(we);
})), De, Oe, ke = o((() => {
	G(), De = {
		name: "chevron-up",
		size: 24,
		node: [["path", {
			d: "m18 15-6-6-6 6",
			key: "153udz"
		}]]
	}, De.node, Oe = W(De);
})), Ae, je, Me = o((() => {
	G(), Ae = {
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
	}, Ae.node, je = W(Ae);
})), Ne, Pe, Fe = o((() => {
	G(), Ne = {
		name: "cloud",
		size: 24,
		node: [["path", {
			d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
			key: "p7xjir"
		}]]
	}, Ne.node, Pe = W(Ne);
})), Ie, Le, Re = o((() => {
	G(), Ie = {
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
	}, Ie.node, Le = W(Ie);
})), ze, Be, Ve = o((() => {
	G(), ze = {
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
	}, ze.node, Be = W(ze);
})), He, Ue, We = o((() => {
	G(), He = {
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
	}, He.node, Ue = W(He);
})), Ge, Ke, qe = o((() => {
	G(), Ge = {
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
	}, Ge.node, Ke = W(Ge);
})), Je, Ye, Xe = o((() => {
	G(), Je = {
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
	}, Je.node, Ye = W(Je);
})), Ze, Qe, $e = o((() => {
	G(), Ze = {
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
	}, Ze.node, Qe = W(Ze);
})), et, tt, nt = o((() => {
	G(), et = {
		name: "file",
		size: 24,
		node: [["path", {
			d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
			key: "1oefj6"
		}], ["path", {
			d: "M14 2v5a1 1 0 0 0 1 1h5",
			key: "wfsgrz"
		}]]
	}, et.node, tt = W(et);
})), rt, it, at = o((() => {
	G(), rt = {
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
	}, rt.node, it = W(rt);
})), ot, st, ct = o((() => {
	G(), ot = {
		name: "flame",
		size: 24,
		node: [["path", {
			d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
			key: "1slcih"
		}]]
	}, ot.node, st = W(ot);
})), lt, ut, dt = o((() => {
	G(), lt = {
		name: "folder-open",
		size: 24,
		node: [["path", {
			d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
			key: "usdka0"
		}]]
	}, lt.node, ut = W(lt);
})), ft, pt, mt = o((() => {
	G(), ft = {
		name: "forward",
		size: 24,
		node: [["path", {
			d: "m15 17 5-5-5-5",
			key: "nf172w"
		}], ["path", {
			d: "M4 18v-2a4 4 0 0 1 4-4h12",
			key: "jmiej9"
		}]]
	}, ft.node, pt = W(ft);
})), ht, gt, _t = o((() => {
	G(), ht = {
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
	}, ht.node, gt = W(ht);
})), vt, yt, bt = o((() => {
	G(), vt = {
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
	}, vt.node, yt = W(vt);
})), xt, St, Ct = o((() => {
	G(), xt = {
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
	}, xt.node, St = W(xt);
})), wt, Tt, Et = o((() => {
	G(), wt = {
		name: "inbox",
		size: 24,
		node: [["polyline", {
			points: "22 12 16 12 14 15 10 15 8 12 2 12",
			key: "o97t9d"
		}], ["path", {
			d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
			key: "oot6mr"
		}]]
	}, wt.node, Tt = W(wt);
})), Dt, Ot, kt = o((() => {
	G(), Dt = {
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
	}, Dt.node, Ot = W(Dt);
})), At, jt, Mt = o((() => {
	G(), At = {
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
	}, At.node, jt = W(At);
})), Nt, Pt, Ft = o((() => {
	G(), Nt = {
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
	}, Nt.node, Pt = W(Nt);
})), It, Lt, Rt = o((() => {
	G(), It = {
		name: "loader-circle",
		size: 24,
		node: [["path", {
			d: "M21 12a9 9 0 1 1-6.219-8.56",
			key: "13zald"
		}]],
		aliases: ["loader-2"]
	}, It.node, Lt = W(It);
})), zt, Bt, Vt = o((() => {
	G(), zt = {
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
	}, zt.node, Bt = W(zt);
})), Ht, Ut, Wt = o((() => {
	G(), Ht = {
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
	}, Ht.node, Ut = W(Ht);
})), Gt, Kt, qt = o((() => {
	G(), Gt = {
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
	}, Gt.node, Kt = W(Gt);
})), Jt, Yt, Xt = o((() => {
	G(), Jt = {
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
	}, Jt.node, Yt = W(Jt);
})), Zt, Qt, $t = o((() => {
	G(), Zt = {
		name: "message-circle",
		size: 24,
		node: [["path", {
			d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
			key: "1sd12s"
		}]]
	}, Zt.node, Qt = W(Zt);
})), en, tn, nn = o((() => {
	G(), en = {
		name: "moon",
		size: 24,
		node: [["path", {
			d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
			key: "kfwtm"
		}]]
	}, en.node, tn = W(en);
})), rn, an, on = o((() => {
	G(), rn = {
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
	}, rn.node, an = W(rn);
})), sn, cn, ln = o((() => {
	G(), sn = {
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
	}, sn.node, cn = W(sn);
})), un, dn, fn = o((() => {
	G(), un = {
		name: "paperclip",
		size: 24,
		node: [["path", {
			d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
			key: "1miecu"
		}]]
	}, un.node, dn = W(un);
})), pn, mn, hn = o((() => {
	G(), pn = {
		name: "pencil",
		size: 24,
		node: [["path", {
			d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
			key: "1a8usu"
		}], ["path", {
			d: "m15 5 4 4",
			key: "1mk7zo"
		}]]
	}, pn.node, mn = W(pn);
})), gn, _n, vn = o((() => {
	G(), gn = {
		name: "pin",
		size: 24,
		node: [["path", {
			d: "M12 17v5",
			key: "bb1du9"
		}], ["path", {
			d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
			key: "1nkz8b"
		}]]
	}, gn.node, _n = W(gn);
})), yn, bn, xn = o((() => {
	G(), yn = {
		name: "play",
		size: 24,
		node: [["path", {
			d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
			key: "10ikf1"
		}]]
	}, yn.node, bn = W(yn);
})), Sn, Cn, wn = o((() => {
	G(), Sn = {
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
	}, Sn.node, Cn = W(Sn);
})), Tn, En, Dn = o((() => {
	G(), Tn = {
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
	}, Tn.node, En = W(Tn);
})), On, kn, An = o((() => {
	G(), On = {
		name: "reply",
		size: 24,
		node: [["path", {
			d: "M20 18v-2a4 4 0 0 0-4-4H4",
			key: "5vmcpk"
		}], ["path", {
			d: "m9 17-5-5 5-5",
			key: "nvlc11"
		}]]
	}, On.node, kn = W(On);
})), jn, Mn, Nn = o((() => {
	G(), jn = {
		name: "rotate-ccw",
		size: 24,
		node: [["path", {
			d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
			key: "1357e3"
		}], ["path", {
			d: "M3 3v5h5",
			key: "1xhq8a"
		}]]
	}, jn.node, Mn = W(jn);
})), Pn, Fn, In = o((() => {
	G(), Pn = {
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
	}, Pn.node, Fn = W(Pn);
})), Ln, Rn, zn = o((() => {
	G(), Ln = {
		name: "send",
		size: 24,
		node: [["path", {
			d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
			key: "1ffxy3"
		}], ["path", {
			d: "m21.854 2.147-10.94 10.939",
			key: "12cjpa"
		}]]
	}, Ln.node, Rn = W(Ln);
})), Bn, Vn, Hn = o((() => {
	G(), Bn = {
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
	}, Bn.node, Vn = W(Bn);
})), Un, Wn, Gn = o((() => {
	G(), Un = {
		name: "shield-ban",
		size: 24,
		node: [["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}], ["path", {
			d: "m4.243 5.21 14.39 12.472",
			key: "1c9a7c"
		}]]
	}, Un.node, Wn = W(Un);
})), Kn, qn, Jn = o((() => {
	G(), Kn = {
		name: "shield-check",
		size: 24,
		node: [["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}], ["path", {
			d: "m9 12 2 2 4-4",
			key: "dzmm74"
		}]]
	}, Kn.node, qn = W(Kn);
})), Yn, Xn, Zn = o((() => {
	G(), Yn = {
		name: "shield",
		size: 24,
		node: [["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}]]
	}, Yn.node, Xn = W(Yn);
})), Qn, $n, er = o((() => {
	G(), Qn = {
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
	}, Qn.node, $n = W(Qn);
})), tr, nr, rr = o((() => {
	G(), tr = {
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
	}, tr.node, nr = W(tr);
})), ir, ar, or = o((() => {
	G(), ir = {
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
	}, ir.node, ar = W(ir);
})), sr, cr, lr = o((() => {
	G(), sr = {
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
	}, sr.node, cr = W(sr);
})), ur, dr, fr = o((() => {
	G(), ur = {
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
	}, ur.node, dr = W(ur);
})), pr, mr, hr = o((() => {
	G(), pr = {
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
	}, pr.node, mr = W(pr);
})), gr, _r, vr = o((() => {
	G(), gr = {
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
	}, gr.node, _r = W(gr);
})), yr, br, xr = o((() => {
	G(), yr = {
		name: "x",
		size: 24,
		node: [["path", {
			d: "M18 6 6 18",
			key: "1bl5f8"
		}], ["path", {
			d: "m6 6 12 12",
			key: "d8bk6v"
		}]]
	}, yr.node, br = W(yr);
})), Sr, Cr, wr = o((() => {
	G(), Sr = {
		name: "zap",
		size: 24,
		node: [["path", {
			d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
			key: "1v7up4"
		}]]
	}, Sr.node, Cr = W(Sr);
})), Tr = o((() => {
	G(), ae(), ce(), de(), me(), _e(), be(), Ce(), Ee(), ke(), Me(), Fe(), Re(), Ve(), We(), qe(), Xe(), $e(), nt(), at(), ct(), dt(), mt(), _t(), bt(), Ct(), Et(), kt(), Mt(), Ft(), Rt(), Vt(), Wt(), qt(), Xt(), $t(), nn(), on(), ln(), fn(), hn(), vn(), xn(), wn(), Dn(), An(), Nn(), In(), zn(), Hn(), Gn(), Jn(), Zn(), er(), rr(), or(), lr(), fr(), hr(), vr(), xr(), wr(), ee(), ne();
}));
// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Er() {
	return typeof window < "u";
}
function Dr(e) {
	return Ar(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Or(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function kr(e) {
	return ((Ar(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Ar(e) {
	return Er() ? e instanceof Node || e instanceof Or(e).Node : !1;
}
function jr(e) {
	return Er() ? e instanceof Element || e instanceof Or(e).Element : !1;
}
function Mr(e) {
	return Er() ? e instanceof HTMLElement || e instanceof Or(e).HTMLElement : !1;
}
function Nr(e) {
	return !Er() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Or(e).ShadowRoot;
}
function Pr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Vr(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Fr(e) {
	return /^(table|td|th)$/.test(Dr(e));
}
function Ir(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
function Lr(e) {
	let t = jr(e) ? Vr(e) : e;
	return Yr(t.transform) || Yr(t.translate) || Yr(t.scale) || Yr(t.rotate) || Yr(t.perspective) || !zr() && (Yr(t.backdropFilter) || Yr(t.filter)) || qr.test(t.willChange || "") || Jr.test(t.contain || "");
}
function Rr(e) {
	let t = Ur(e);
	for (; Mr(t) && !Br(t);) {
		if (Lr(t)) return t;
		if (Ir(t)) return null;
		t = Ur(t);
	}
	return null;
}
function zr() {
	return Xr ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Xr;
}
function Br(e) {
	return /^(html|body|#document)$/.test(Dr(e));
}
function Vr(e) {
	return Or(e).getComputedStyle(e);
}
function Hr(e) {
	return jr(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Ur(e) {
	if (Dr(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Nr(e) && e.host || kr(e);
	return Nr(t) ? t.host : t;
}
function Wr(e) {
	let t = Ur(e);
	return Br(t) ? (e.ownerDocument || e).body : Mr(t) && Pr(t) ? t : Wr(t);
}
function Gr(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Wr(e), i = r === e.ownerDocument?.body, a = Or(r);
	if (i) {
		let e = Kr(a);
		return t.concat(a, a.visualViewport || [], Pr(r) ? r : [], e && n ? Gr(e) : []);
	}
	return t.concat(r, Gr(r, [], n));
}
function Kr(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
var qr, Jr, Yr, Xr, Zr = o((() => {
	qr = /transform|translate|scale|rotate|perspective|filter/, Jr = /paint|layout|strict|content/, Yr = (e) => !!e && e !== "none";
})), Qr, $r, ei = o((() => {
	Qr = /* @__PURE__ */ u(b(), 1), $r = { ...Qr };
}));
// node_modules/@base-ui/utils/useRefWithInit.mjs
function ti(e, t) {
	let n = ni.useRef(ri);
	return n.current === ri && (n.current = e(t)), n;
}
var ni, ri, ii = o((() => {
	ni = /* @__PURE__ */ u(b(), 1), ri = {};
}));
// node_modules/@base-ui/utils/useStableCallback.mjs
function q(e) {
	let t = ti(ai).current;
	return t.next = e, ci(t.effect), t.trampoline;
}
function ai() {
	let e = {
		next: void 0,
		callback: oi,
		trampoline: (...t) => e.callback?.(...t),
		effect: () => {
			e.callback = e.next;
		}
	};
	return e;
}
function oi() {}
var si, ci, li = o((() => {
	ei(), ii(), si = $r.useInsertionEffect, ci = si && si !== $r.useLayoutEffect ? si : (e) => e();
})), ui, di, J, fi = o((() => {
	ui = /* @__PURE__ */ u(b(), 1), di = () => {}, J = typeof document < "u" ? ui.useLayoutEffect : di;
}));
// node_modules/@base-ui/utils/mergeObjects.mjs
function pi(e, t) {
	if (e && !t) return e;
	if (!e && t) return t;
	if (e || t) return {
		...e,
		...t
	};
}
var mi = o((() => {}));
// node_modules/@base-ui/react/merge-props/mergeProps.mjs
function hi(e, t, n, r, i) {
	if (!n && !r && !i && !e) return _i(t);
	let a = _i(e);
	return t && (a = vi(a, t)), n && (a = vi(a, n)), r && (a = vi(a, r)), i && (a = vi(a, i)), a;
}
function gi(e) {
	if (e.length === 0) return Oi;
	if (e.length === 1) return _i(e[0]);
	let t = _i(e[0]);
	for (let n = 1; n < e.length; n += 1) t = vi(t, e[n]);
	return t;
}
function _i(e) {
	return Si(e) ? { ...e(Oi) } : yi(e);
}
function vi(e, t) {
	return Si(t) ? t(e) : bi(e, t);
}
function yi(e) {
	let t = { ...e };
	for (let e in t) {
		let n = t[e];
		xi(e, n) && (t[e] = wi(n));
	}
	return t;
}
function bi(e, t) {
	if (!t) return e;
	for (let n in t) {
		let r = t[n];
		switch (n) {
			case "style":
				e[n] = pi(e.style, r);
				break;
			case "className":
				e[n] = Ei(e.className, r);
				break;
			default: e[n] = xi(n, r) ? Ci(e[n], r) : r;
		}
	}
	return e;
}
function xi(e, t) {
	let n = e.charCodeAt(0), r = e.charCodeAt(1), i = e.charCodeAt(2);
	return n === 111 && r === 110 && i >= 65 && i <= 90 && (typeof t == "function" || t === void 0);
}
function Si(e) {
	return typeof e == "function";
}
function Ci(e, t) {
	return t ? e ? (...n) => {
		let r = n[0];
		if (Di(r)) {
			let i = r;
			Ti(i);
			let a = t(...n);
			return i.baseUIHandlerPrevented || e?.(...n), a;
		}
		let i = t(...n);
		return e?.(...n), i;
	} : wi(t) : e;
}
function wi(e) {
	return e && ((...t) => {
		let n = t[0];
		return Di(n) && Ti(n), e(...t);
	});
}
function Ti(e) {
	return e.preventBaseUIHandler = () => {
		e.baseUIHandlerPrevented = !0;
	}, e;
}
function Ei(e, t) {
	return t ? e ? t + " " + e : t : e;
}
function Di(e) {
	return typeof e == "object" && !!e && "nativeEvent" in e;
}
var Oi, ki = o((() => {
	mi(), Oi = {};
})), Ai = o((() => {
	ki();
}));
// node_modules/@base-ui/utils/formatErrorMessage.mjs
function ji(e, t) {
	return function(n, ...r) {
		let i = new URL(e);
		return i.searchParams.set("code", n.toString()), r.forEach((e) => i.searchParams.append("args[]", e)), `${t} error #${n}; visit ${i} for the full message.`;
	};
}
var Mi, Ni = o((() => {
	Mi = ji("https://base-ui.com/production-error", "Base UI");
}));
// node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs
function Pi(e = !1) {
	let t = Fi.useContext(Ii);
	if (t === void 0 && !e) throw Error(Mi(16));
	return t;
}
var Fi, Ii, Li = o((() => {
	Ni(), Fi = /* @__PURE__ */ u(b(), 1), Ii = /*#__PURE__*/ Fi.createContext(void 0);
}));
// node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function Ri(e) {
	let { focusableWhenDisabled: t, disabled: n, composite: r = !1, tabIndex: i = 0, isNativeButton: a } = e, o = r && t !== !1, s = r && t === !1;
	return { props: zi.useMemo(() => {
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
var zi, Bi = o((() => {
	zi = /* @__PURE__ */ u(b(), 1);
}));
// node_modules/@base-ui/utils/owner.mjs
function Vi(e) {
	return e?.ownerDocument || document;
}
var Hi = o((() => {
	Zr();
}));
// node_modules/@base-ui/react/utils/dispatchClickWithModifiers.mjs
function Ui(e, t, { detail: n = 0, pointerType: r = "" } = {}) {
	e.dispatchEvent(new (Or(e)).PointerEvent("click", {
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
var Wi = o((() => {
	Hi();
}));
// node_modules/@base-ui/react/internals/use-button/useButton.mjs
function Gi(e = {}) {
	let { disabled: t = !1, focusableWhenDisabled: n, tabIndex: r = 0, native: i = !0, composite: a } = e, o = Ji.useRef(null), s = Pi(!0), c = a ?? s !== void 0, { props: l } = Ri({
		focusableWhenDisabled: n,
		disabled: t,
		composite: c,
		tabIndex: r,
		isNativeButton: i
	}), u = Ji.useCallback(() => {
		let e = o.current;
		Ki(e) && c && t && l.disabled === void 0 && e.disabled && (e.disabled = !1);
	}, [
		t,
		l.disabled,
		c
	]);
	return J(u, [u]), {
		getButtonProps: Ji.useCallback((e = {}) => {
			let { onClick: n, onMouseDown: r, onKeyUp: a, onKeyDown: o, onPointerDown: s, ...u } = e;
			return hi({
				onClick(e) {
					t ? e.preventDefault() : n?.(e);
				},
				onMouseDown(e) {
					t || r?.(e);
				},
				onKeyDown(e) {
					if (t || (Ti(e), o?.(e), e.baseUIHandlerPrevented)) return;
					let n = e.target === e.currentTarget, r = e.currentTarget, a = Ki(r), s = !i && qi(r), l = n && (i ? a : !s), u = e.key === "Enter", d = e.key === " ", f = r.getAttribute("role"), p = f?.startsWith("menuitem") || f === "option" || f === "gridcell";
					if (n && c && d) {
						if (e.defaultPrevented && p) return;
						e.preventDefault(), (!i || a) && (e.preventBaseUIHandler(), Ui(r, e));
					} else !l || i || !d && !u ? n && s && d && e.preventDefault() : e.defaultPrevented || (e.preventDefault(), u && (e.preventBaseUIHandler(), Ui(r, e)));
				},
				onKeyUp(e) {
					t || (Ti(e), a?.(e), e.target === e.currentTarget && i && c && Ki(e.currentTarget) && e.key === " " ? e.preventDefault() : e.baseUIHandlerPrevented || e.target !== e.currentTarget || i || c || e.defaultPrevented || e.key !== " " || (e.preventBaseUIHandler(), Ui(e.currentTarget, e)));
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
function Ki(e) {
	return Mr(e) && e.tagName === "BUTTON";
}
function qi(e) {
	return Mr(e) && e.tagName === "A" && !!e.href;
}
var Ji, Yi = o((() => {
	Ji = /* @__PURE__ */ u(b(), 1), Zr(), li(), fi(), Ai(), Li(), Bi(), Wi();
}));
// node_modules/@base-ui/utils/useMergedRefs.mjs
function Xi(e, t, n, r) {
	let i = ti(Qi).current;
	return $i(i, e, t, n, r) && ta(i, [
		e,
		t,
		n,
		r
	]), i.callback;
}
function Zi(e) {
	let t = ti(Qi).current;
	return ea(t, e) && ta(t, e), t.callback;
}
function Qi() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function $i(e, t, n, r, i) {
	return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== i;
}
function ea(e, t) {
	return e.refs.length !== t.length || e.refs.some((e, n) => e !== t[n]);
}
function ta(e, t) {
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
var na = o((() => {
	ii();
}));
// node_modules/@base-ui/utils/reactVersion.mjs
function ra(e) {
	return ia >= e;
}
var ia, aa = o((() => {
	b(), ia = 19;
}));
// node_modules/@base-ui/utils/getReactElementRef.mjs
function oa(e) {
	if (!/*#__PURE__*/ sa.isValidElement(e)) return null;
	let t = e, n = t.props;
	return (ra(19) ? n?.ref : t.ref) ?? null;
}
var sa, ca = o((() => {
	sa = /* @__PURE__ */ u(b(), 1), aa();
}));
// node_modules/@base-ui/utils/empty.mjs
function la() {}
var ua, da, fa = o((() => {
	ua = Object.freeze([]), da = Object.freeze({});
}));
// node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function pa(e, t) {
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
var ma = o((() => {}));
// node_modules/@base-ui/react/utils/resolveClassName.mjs
function ha(e, t) {
	return typeof e == "function" ? e(t) : e;
}
var ga = o((() => {}));
// node_modules/@base-ui/react/utils/resolveStyle.mjs
function _a(e, t) {
	return typeof e == "function" ? e(t) : e;
}
var va = o((() => {}));
// node_modules/@base-ui/react/internals/useRenderElement.mjs
function ya(e, t, n = {}) {
	let r = t.render;
	n.enabled !== !1 && (r = Sa(r));
	let i = ba(t, n, r);
	if (n.enabled === !1) return null;
	let a = n.state ?? da;
	return Ca(e, r, i, a);
}
function ba(e, t, n) {
	let { className: r, style: i } = e, { state: a = da, ref: o, props: s, stateAttributesMapping: c, enabled: l = !0 } = t, u = l ? ha(r, a) : void 0, d = l ? _a(i, a) : void 0, f = l ? pa(a, c) : da, p = l && s ? xa(s) : void 0, m = l ? pi(f, p) ?? {} : da;
	return typeof document < "u" && (l ? m.ref = Array.isArray(o) ? Zi([
		m.ref,
		oa(n),
		...o
	]) : Xi(m.ref, oa(n), o) : Xi(null, null)), l ? (u !== void 0 && (m.className = Ei(m.className, u)), d !== void 0 && (m.style = pi(m.style, d)), m) : da;
}
function xa(e) {
	return Array.isArray(e) ? gi(e) : hi(void 0, e);
}
function Sa(e) {
	if (e?.$$typeof !== Da) return e;
	let t = Ta.Children.toArray(e)[0];
	return /*#__PURE__*/ Ta.isValidElement(t) ? t : e;
}
function Ca(e, t, n, r) {
	if (t) {
		if (typeof t == "function") return t(n, r);
		let e = hi(n, t.props);
		return e.ref = n.ref, /*#__PURE__*/ Ta.cloneElement(t, e);
	}
	return wa(e, n);
}
function wa(e, t) {
	return e === "button" ? /*#__PURE__*/ (0, Ea.createElement)("button", {
		type: "button",
		...t,
		key: t.key
	}) : e === "img" ? /*#__PURE__*/ (0, Ea.createElement)("img", {
		alt: "",
		...t,
		key: t.key
	}) : /*#__PURE__*/ Ta.createElement(e, t);
}
var Ta, Ea, Da, Oa = o((() => {
	Ta = /* @__PURE__ */ u(b(), 1), na(), ca(), mi(), fa(), ma(), ga(), va(), Ai(), Ea = /* @__PURE__ */ u(b(), 1), Da = Symbol.for("react.lazy");
})), ka, Aa, ja = o((() => {
	ka = /* @__PURE__ */ u(b(), 1), Yi(), Oa(), Aa = /*#__PURE__*/ ka.forwardRef(function(e, t) {
		let { render: n, className: r, disabled: i = !1, focusableWhenDisabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { getButtonProps: l, buttonRef: u } = Gi({
			disabled: i,
			focusableWhenDisabled: a,
			native: o
		});
		return ya("button", e, {
			state: { disabled: i },
			ref: [t, u],
			props: [c, l]
		});
	});
})), Ma = o((() => {
	ja();
}));
// node_modules/clsx/dist/clsx.mjs
function Na(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Na(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Pa() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Na(e)) && (r && (r += " "), r += t);
	return r;
}
var Fa = o((() => {})), Ia, La, Ra, za = o((() => {
	Fa(), Ia = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, La = Pa, Ra = (e, t) => (n) => {
		if (t?.variants == null) return La(e, n?.class, n?.className);
		let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
			let t = n?.[e], a = i?.[e];
			if (t === null) return null;
			let o = Ia(t) || Ia(a);
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
		return La(e, a, s, n?.class, n?.className);
	};
})), Ba, Va, Ha, Ua, Wa, Ga, Ka, qa, Ja, Ya, Xa, Za, Qa, $a, eo, to, no, ro, io, ao, oo, so, co, lo, uo, fo, po, mo, ho, go, _o, vo, yo, bo, xo, So, Co, wo, To, Eo, Do, Oo, ko, Ao, jo, Mo, No, Po, Fo, Io, Lo, Ro, zo, Bo, Vo, Ho, Uo, Wo, Go, Ko, qo, Jo, Yo, Xo, Zo, Qo, $o, es, ts, ns, rs, is, as, os, ss, cs, ls, us, ds, fs, ps, ms, hs, gs = o((() => {
	Ba = (e, t) => {
		let n = Array(e.length + t.length);
		for (let t = 0; t < e.length; t++) n[t] = e[t];
		for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
		return n;
	}, Va = (e, t) => ({
		classGroupId: e,
		validator: t
	}), Ha = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
		nextPart: e,
		validators: t,
		classGroupId: n
	}), Ua = "-", Wa = [], Ga = "arbitrary..", Ka = (e) => {
		let t = Ya(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
		return {
			getClassGroupId: (e) => {
				if (e.startsWith("[") && e.endsWith("]")) return Ja(e);
				let n = e.split(Ua), r = +(n[0] === "" && n.length > 1);
				return qa(n, r, t);
			},
			getConflictingClassGroupIds: (e, t) => {
				if (t) {
					let t = r[e], i = n[e];
					return t ? i ? Ba(i, t) : t : i || Wa;
				}
				return n[e] || Wa;
			}
		};
	}, qa = (e, t, n) => {
		if (e.length - t === 0) return n.classGroupId;
		let r = e[t], i = n.nextPart.get(r);
		if (i) {
			let n = qa(e, t + 1, i);
			if (n) return n;
		}
		let a = n.validators;
		if (a === null) return;
		let o = t === 0 ? e.join(Ua) : e.slice(t).join(Ua), s = a.length;
		for (let e = 0; e < s; e++) {
			let t = a[e];
			if (t.validator(o)) return t.classGroupId;
		}
	}, Ja = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
		let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
		return r ? Ga + r : void 0;
	})(), Ya = (e) => {
		let { theme: t, classGroups: n } = e;
		return Xa(n, t);
	}, Xa = (e, t) => {
		let n = Ha();
		for (let r in e) {
			let i = e[r];
			Za(i, n, r, t);
		}
		return n;
	}, Za = (e, t, n, r) => {
		let i = e.length;
		for (let a = 0; a < i; a++) {
			let i = e[a];
			Qa(i, t, n, r);
		}
	}, Qa = (e, t, n, r) => {
		typeof e == "string" ? $a(e, t, n) : typeof e == "function" ? eo(e, t, n, r) : to(e, t, n, r);
	}, $a = (e, t, n) => {
		let r = e === "" ? t : no(t, e);
		r.classGroupId = n;
	}, eo = (e, t, n, r) => {
		ro(e) ? Za(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(Va(n, e)));
	}, to = (e, t, n, r) => {
		let i = Object.entries(e), a = i.length;
		for (let e = 0; e < a; e++) {
			let [a, o] = i[e];
			Za(o, no(t, a), n, r);
		}
	}, no = (e, t) => {
		let n = e, r = t.split(Ua), i = r.length;
		for (let e = 0; e < i; e++) {
			let t = r[e], i = n.nextPart.get(t);
			i || (i = Ha(), n.nextPart.set(t, i)), n = i;
		}
		return n;
	}, ro = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, io = (e) => {
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
	}, ao = "!", oo = ":", so = [], co = (e, t, n, r, i) => ({
		modifiers: e,
		hasImportantModifier: t,
		baseClassName: n,
		maybePostfixModifierPosition: r,
		isExternal: i
	}), lo = (e) => {
		let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
			let t = [], n = 0, r = 0, i = 0, a, o = e.length;
			for (let s = 0; s < o; s++) {
				let o = e[s];
				if (n === 0 && r === 0) {
					if (o === oo) {
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
			s.endsWith(ao) ? (c = s.slice(0, -1), l = !0) : s.startsWith(ao) && (c = s.slice(1), l = !0);
			let u = a && a > i ? a - i : void 0;
			return co(t, l, c, u);
		};
		if (t) {
			let e = t + oo, n = r;
			r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : co(so, !1, t, void 0, !0);
		}
		if (n) {
			let e = r;
			r = (t) => n({
				className: t,
				parseClassName: e
			});
		}
		return r;
	}, uo = (e) => {
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
	}, fo = (e) => ({
		cache: io(e.cacheSize),
		parseClassName: lo(e),
		sortModifiers: uo(e),
		postfixLookupClassGroupIds: po(e),
		...Ka(e)
	}), po = (e) => {
		let t = Object.create(null), n = e.postfixLookupClassGroups;
		if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
		return t;
	}, mo = /\s+/, ho = (e, t) => {
		let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(mo), l = "";
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
			let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + ao : _, y = v + g;
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
	}, go = (...e) => {
		let t = 0, n, r, i = "";
		for (; t < e.length;) (n = e[t++]) && (r = _o(n)) && (i && (i += " "), i += r);
		return i;
	}, _o = (e) => {
		if (typeof e == "string") return e;
		let t, n = "";
		for (let r = 0; r < e.length; r++) e[r] && (t = _o(e[r])) && (n && (n += " "), n += t);
		return n;
	}, vo = (e, ...t) => {
		let n, r, i, a, o = (o) => {
			let c = t.reduce((e, t) => t(e), e());
			return n = fo(c), r = n.cache.get, i = n.cache.set, a = s, s(o);
		}, s = (e) => {
			let t = r(e);
			if (t) return t;
			let a = ho(e, n);
			return i(e, a), a;
		};
		return a = o, (...e) => a(go(...e));
	}, yo = [], bo = (e) => {
		let t = (t) => t[e] || yo;
		return t.isThemeGetter = !0, t.themeKey = e, t;
	}, xo = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, So = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Co = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, wo = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, To = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Eo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, Do = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Oo = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ko = (e) => Co.test(e), Ao = (e) => !!e && !Number.isNaN(Number(e)), jo = (e) => !!e && Number.isInteger(Number(e)), Mo = (e) => e.endsWith("%") && Ao(e.slice(0, -1)), No = (e) => wo.test(e), Po = () => !0, Fo = (e) => To.test(e) && !Eo.test(e), Io = () => !1, Lo = (e) => Do.test(e), Ro = (e) => Oo.test(e), zo = (e) => !Ho(e) && !Xo(e), Bo = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Vo = (e) => is(e, cs, Io), Ho = (e) => xo.test(e), Uo = (e) => is(e, ls, Fo), Wo = (e) => is(e, us, Ao), Go = (e) => is(e, fs, Po), Ko = (e) => is(e, ds, Io), qo = (e) => is(e, os, Io), Jo = (e) => is(e, ss, Ro), Yo = (e) => is(e, ps, Lo), Xo = (e) => So.test(e), Zo = (e) => as(e, ls), Qo = (e) => as(e, ds), $o = (e) => as(e, os), es = (e) => as(e, cs), ts = (e) => as(e, ss), ns = (e) => as(e, ps, !0), rs = (e) => as(e, fs, !0), is = (e, t, n) => {
		let r = xo.exec(e);
		return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
	}, as = (e, t, n = !1) => {
		let r = So.exec(e);
		return r ? r[1] ? t(r[1]) : n : !1;
	}, os = (e) => e === "position" || e === "percentage", ss = (e) => e === "image" || e === "url", cs = (e) => e === "length" || e === "size" || e === "bg-size", ls = (e) => e === "length", us = (e) => e === "number", ds = (e) => e === "family-name", fs = (e) => e === "number" || e === "weight", ps = (e) => e === "shadow", ms = () => {
		let e = bo("color"), t = bo("font"), n = bo("text"), r = bo("font-weight"), i = bo("tracking"), a = bo("leading"), o = bo("breakpoint"), s = bo("container"), c = bo("spacing"), l = bo("radius"), u = bo("shadow"), d = bo("inset-shadow"), f = bo("text-shadow"), p = bo("drop-shadow"), m = bo("blur"), h = bo("perspective"), g = bo("aspect"), _ = bo("ease"), v = bo("animate"), y = () => [
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
			Xo,
			Ho
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
			Xo,
			Ho,
			c
		], T = () => [
			ko,
			"full",
			"auto",
			...w()
		], E = () => [
			jo,
			"none",
			"subgrid",
			Xo,
			Ho
		], D = () => [
			"auto",
			{ span: [
				"full",
				jo,
				Xo,
				Ho
			] },
			jo,
			Xo,
			Ho
		], O = () => [
			jo,
			"auto",
			Xo,
			Ho
		], k = () => [
			"auto",
			"min",
			"max",
			"fr",
			Xo,
			Ho
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
			ko,
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
			ko,
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
			ko,
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
			Xo,
			Ho
		], L = () => [
			...b(),
			$o,
			qo,
			{ position: [Xo, Ho] }
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
			es,
			Vo,
			{ size: [Xo, Ho] }
		], B = () => [
			Mo,
			Zo,
			Uo
		], V = () => [
			"",
			"none",
			"full",
			l,
			Xo,
			Ho
		], H = () => [
			"",
			Ao,
			Zo,
			Uo
		], ee = () => [
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
		], U = () => [
			Ao,
			Mo,
			$o,
			qo
		], ne = () => [
			"",
			"none",
			m,
			Xo,
			Ho
		], W = () => [
			"none",
			Ao,
			Xo,
			Ho
		], re = () => [
			"none",
			Ao,
			Xo,
			Ho
		], G = () => [
			Ao,
			Xo,
			Ho
		], K = () => [
			ko,
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
				blur: [No],
				breakpoint: [No],
				color: [Po],
				container: [No],
				"drop-shadow": [No],
				ease: [
					"in",
					"out",
					"in-out"
				],
				font: [zo],
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
				"inset-shadow": [No],
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
				radius: [No],
				shadow: [No],
				spacing: ["px", Ao],
				text: [No],
				"text-shadow": [No],
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
					ko,
					Ho,
					Xo,
					g
				] }],
				container: ["container"],
				"container-type": [{ "@container": [
					"",
					"normal",
					"size",
					Xo,
					Ho
				] }],
				"container-named": [Bo],
				columns: [{ columns: [
					Ao,
					"auto",
					Ho,
					Xo,
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
					jo,
					"auto",
					Xo,
					Ho
				] }],
				basis: [{ basis: [
					ko,
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
					Ao,
					ko,
					"auto",
					"initial",
					"none",
					Ho
				] }],
				grow: [{ grow: [
					"",
					Ao,
					Xo,
					Ho
				] }],
				shrink: [{ shrink: [
					"",
					Ao,
					Xo,
					Ho
				] }],
				order: [{ order: [
					jo,
					"first",
					"last",
					"none",
					Xo,
					Ho
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
					Uo
				] }],
				"font-smoothing": ["antialiased", "subpixel-antialiased"],
				"font-style": ["italic", "not-italic"],
				"font-weight": [{ font: [
					r,
					rs,
					Go
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
					Mo,
					Ho
				] }],
				"font-family": [{ font: [
					Qo,
					Ko,
					t
				] }],
				"font-features": [{ "font-features": [Ho] }],
				"fvn-normal": ["normal-nums"],
				"fvn-ordinal": ["ordinal"],
				"fvn-slashed-zero": ["slashed-zero"],
				"fvn-figure": ["lining-nums", "oldstyle-nums"],
				"fvn-spacing": ["proportional-nums", "tabular-nums"],
				"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
				tracking: [{ tracking: [
					i,
					Xo,
					Ho
				] }],
				"line-clamp": [{ "line-clamp": [
					Ao,
					"none",
					Xo,
					Wo
				] }],
				leading: [{ leading: [
					"none",
					a,
					...w()
				] }],
				"list-image": [{ "list-image": [
					"none",
					Xo,
					Ho
				] }],
				"list-style-position": [{ list: ["inside", "outside"] }],
				"list-style-type": [{ list: [
					"disc",
					"decimal",
					"none",
					Xo,
					Ho
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
				"text-decoration-style": [{ decoration: [...ee(), "wavy"] }],
				"text-decoration-thickness": [{ decoration: [
					Ao,
					"from-font",
					"auto",
					Xo,
					Uo
				] }],
				"text-decoration-color": [{ decoration: I() }],
				"underline-offset": [{ "underline-offset": [
					Ao,
					"auto",
					Xo,
					Ho
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
					jo,
					Xo,
					Ho
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
					Xo,
					Ho
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
					Xo,
					Ho
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
							jo,
							Xo,
							Ho
						],
						radial: [
							"",
							Xo,
							Ho
						],
						conic: [
							"",
							jo,
							Xo,
							Ho
						]
					},
					ts,
					Jo
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
				"border-w": [{ border: H() }],
				"border-w-x": [{ "border-x": H() }],
				"border-w-y": [{ "border-y": H() }],
				"border-w-s": [{ "border-s": H() }],
				"border-w-e": [{ "border-e": H() }],
				"border-w-bs": [{ "border-bs": H() }],
				"border-w-be": [{ "border-be": H() }],
				"border-w-t": [{ "border-t": H() }],
				"border-w-r": [{ "border-r": H() }],
				"border-w-b": [{ "border-b": H() }],
				"border-w-l": [{ "border-l": H() }],
				"divide-x": [{ "divide-x": H() }],
				"divide-x-reverse": ["divide-x-reverse"],
				"divide-y": [{ "divide-y": H() }],
				"divide-y-reverse": ["divide-y-reverse"],
				"border-style": [{ border: [
					...ee(),
					"hidden",
					"none"
				] }],
				"divide-style": [{ divide: [
					...ee(),
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
					...ee(),
					"none",
					"hidden"
				] }],
				"outline-offset": [{ "outline-offset": [
					Ao,
					Xo,
					Ho
				] }],
				"outline-w": [{ outline: [
					"",
					Ao,
					Zo,
					Uo
				] }],
				"outline-color": [{ outline: I() }],
				shadow: [{ shadow: [
					"",
					"inner",
					"none",
					u,
					ns,
					Yo
				] }],
				"shadow-color": [{ shadow: I() }],
				"inset-shadow": [{ "inset-shadow": [
					"none",
					d,
					ns,
					Yo
				] }],
				"inset-shadow-color": [{ "inset-shadow": I() }],
				"ring-w": [{ ring: H() }],
				"ring-w-inset": ["ring-inset"],
				"ring-color": [{ ring: I() }],
				"ring-offset-w": [{ "ring-offset": [Ao, Uo] }],
				"ring-offset-color": [{ "ring-offset": I() }],
				"inset-ring-w": [{ "inset-ring": H() }],
				"inset-ring-color": [{ "inset-ring": I() }],
				"text-shadow": [{ "text-shadow": [
					"none",
					f,
					ns,
					Yo
				] }],
				"text-shadow-color": [{ "text-shadow": I() }],
				opacity: [{ opacity: [
					Ao,
					Xo,
					Ho
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
				"mask-image-linear-pos": [{ "mask-linear": [Ao] }],
				"mask-image-linear-from-pos": [{ "mask-linear-from": U() }],
				"mask-image-linear-to-pos": [{ "mask-linear-to": U() }],
				"mask-image-linear-from-color": [{ "mask-linear-from": I() }],
				"mask-image-linear-to-color": [{ "mask-linear-to": I() }],
				"mask-image-t-from-pos": [{ "mask-t-from": U() }],
				"mask-image-t-to-pos": [{ "mask-t-to": U() }],
				"mask-image-t-from-color": [{ "mask-t-from": I() }],
				"mask-image-t-to-color": [{ "mask-t-to": I() }],
				"mask-image-r-from-pos": [{ "mask-r-from": U() }],
				"mask-image-r-to-pos": [{ "mask-r-to": U() }],
				"mask-image-r-from-color": [{ "mask-r-from": I() }],
				"mask-image-r-to-color": [{ "mask-r-to": I() }],
				"mask-image-b-from-pos": [{ "mask-b-from": U() }],
				"mask-image-b-to-pos": [{ "mask-b-to": U() }],
				"mask-image-b-from-color": [{ "mask-b-from": I() }],
				"mask-image-b-to-color": [{ "mask-b-to": I() }],
				"mask-image-l-from-pos": [{ "mask-l-from": U() }],
				"mask-image-l-to-pos": [{ "mask-l-to": U() }],
				"mask-image-l-from-color": [{ "mask-l-from": I() }],
				"mask-image-l-to-color": [{ "mask-l-to": I() }],
				"mask-image-x-from-pos": [{ "mask-x-from": U() }],
				"mask-image-x-to-pos": [{ "mask-x-to": U() }],
				"mask-image-x-from-color": [{ "mask-x-from": I() }],
				"mask-image-x-to-color": [{ "mask-x-to": I() }],
				"mask-image-y-from-pos": [{ "mask-y-from": U() }],
				"mask-image-y-to-pos": [{ "mask-y-to": U() }],
				"mask-image-y-from-color": [{ "mask-y-from": I() }],
				"mask-image-y-to-color": [{ "mask-y-to": I() }],
				"mask-image-radial": [{ "mask-radial": [Xo, Ho] }],
				"mask-image-radial-from-pos": [{ "mask-radial-from": U() }],
				"mask-image-radial-to-pos": [{ "mask-radial-to": U() }],
				"mask-image-radial-from-color": [{ "mask-radial-from": I() }],
				"mask-image-radial-to-color": [{ "mask-radial-to": I() }],
				"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
				"mask-image-radial-size": [{ "mask-radial": [{
					closest: ["side", "corner"],
					farthest: ["side", "corner"]
				}] }],
				"mask-image-radial-pos": [{ "mask-radial-at": b() }],
				"mask-image-conic-pos": [{ "mask-conic": [Ao] }],
				"mask-image-conic-from-pos": [{ "mask-conic-from": U() }],
				"mask-image-conic-to-pos": [{ "mask-conic-to": U() }],
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
					Xo,
					Ho
				] }],
				filter: [{ filter: [
					"",
					"none",
					Xo,
					Ho
				] }],
				blur: [{ blur: ne() }],
				brightness: [{ brightness: [
					Ao,
					Xo,
					Ho
				] }],
				contrast: [{ contrast: [
					Ao,
					Xo,
					Ho
				] }],
				"drop-shadow": [{ "drop-shadow": [
					"",
					"none",
					p,
					ns,
					Yo
				] }],
				"drop-shadow-color": [{ "drop-shadow": I() }],
				grayscale: [{ grayscale: [
					"",
					Ao,
					Xo,
					Ho
				] }],
				"hue-rotate": [{ "hue-rotate": [
					Ao,
					Xo,
					Ho
				] }],
				invert: [{ invert: [
					"",
					Ao,
					Xo,
					Ho
				] }],
				saturate: [{ saturate: [
					Ao,
					Xo,
					Ho
				] }],
				sepia: [{ sepia: [
					"",
					Ao,
					Xo,
					Ho
				] }],
				"backdrop-filter": [{ "backdrop-filter": [
					"",
					"none",
					Xo,
					Ho
				] }],
				"backdrop-blur": [{ "backdrop-blur": ne() }],
				"backdrop-brightness": [{ "backdrop-brightness": [
					Ao,
					Xo,
					Ho
				] }],
				"backdrop-contrast": [{ "backdrop-contrast": [
					Ao,
					Xo,
					Ho
				] }],
				"backdrop-grayscale": [{ "backdrop-grayscale": [
					"",
					Ao,
					Xo,
					Ho
				] }],
				"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
					Ao,
					Xo,
					Ho
				] }],
				"backdrop-invert": [{ "backdrop-invert": [
					"",
					Ao,
					Xo,
					Ho
				] }],
				"backdrop-opacity": [{ "backdrop-opacity": [
					Ao,
					Xo,
					Ho
				] }],
				"backdrop-saturate": [{ "backdrop-saturate": [
					Ao,
					Xo,
					Ho
				] }],
				"backdrop-sepia": [{ "backdrop-sepia": [
					"",
					Ao,
					Xo,
					Ho
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
					Xo,
					Ho
				] }],
				"transition-behavior": [{ transition: ["normal", "discrete"] }],
				duration: [{ duration: [
					Ao,
					"initial",
					Xo,
					Ho
				] }],
				ease: [{ ease: [
					"linear",
					"initial",
					_,
					Xo,
					Ho
				] }],
				delay: [{ delay: [
					Ao,
					Xo,
					Ho
				] }],
				animate: [{ animate: [
					"none",
					v,
					Xo,
					Ho
				] }],
				backface: [{ backface: ["hidden", "visible"] }],
				perspective: [{ perspective: [
					h,
					Xo,
					Ho
				] }],
				"perspective-origin": [{ "perspective-origin": x() }],
				rotate: [{ rotate: W() }],
				"rotate-x": [{ "rotate-x": W() }],
				"rotate-y": [{ "rotate-y": W() }],
				"rotate-z": [{ "rotate-z": W() }],
				scale: [{ scale: re() }],
				"scale-x": [{ "scale-x": re() }],
				"scale-y": [{ "scale-y": re() }],
				"scale-z": [{ "scale-z": re() }],
				"scale-3d": ["scale-3d"],
				skew: [{ skew: G() }],
				"skew-x": [{ "skew-x": G() }],
				"skew-y": [{ "skew-y": G() }],
				transform: [{ transform: [
					Xo,
					Ho,
					"",
					"none",
					"gpu",
					"cpu"
				] }],
				"transform-origin": [{ origin: x() }],
				"transform-style": [{ transform: ["3d", "flat"] }],
				translate: [{ translate: K() }],
				"translate-x": [{ "translate-x": K() }],
				"translate-y": [{ "translate-y": K() }],
				"translate-z": [{ "translate-z": K() }],
				"translate-none": ["translate-none"],
				zoom: [{ zoom: [
					jo,
					Xo,
					Ho
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
					Xo,
					Ho
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
					Xo,
					Ho
				] }],
				fill: [{ fill: ["none", ...I()] }],
				"stroke-w": [{ stroke: [
					Ao,
					Zo,
					Uo,
					Wo
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
	}, hs = /*#__PURE__*/ vo(ms);
}));
// src/lib/utils.ts
function _s(...e) {
	return hs(Pa(e));
}
var vs = o((() => {
	Fa(), gs();
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
	return /* @__PURE__ */ (0, xs.jsx)(Aa, {
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
	Ma(), za(), vs(), xs = bs(), Ss = Ra("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
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
Tr(), Cs();
var X = bs();
function ws({ title: e, detail: t, percent: n, onClose: r }) {
	let i = n === 100;
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		role: "status",
		className: "w-full rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-sm",
		children: [/* @__PURE__ */ (0, X.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [
				i ? /* @__PURE__ */ (0, X.jsx)(je, { className: "mt-0.5 size-4 shrink-0" }) : /* @__PURE__ */ (0, X.jsx)(Lt, { className: "mt-0.5 size-4 shrink-0 motion-safe:animate-spin" }),
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
					children: /* @__PURE__ */ (0, X.jsx)(br, {})
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
	var T = Object.assign, E = Symbol.for("react.element"), D = Symbol.for("react.transitional.element"), O = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), M = Symbol.for("react.consumer"), N = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), I = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), z = Symbol.for("react.activity"), B = Symbol.for("react.legacy_hidden"), V = Symbol.for("react.memo_cache_sentinel"), H = Symbol.for("react.view_transition"), ee = Symbol.for("react.recoverable"), te = Symbol.iterator;
	function U(e) {
		return typeof e != "object" || !e ? null : (e = te && e[te] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ne = Symbol.for("react.client.reference");
	function W(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ne ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case k: return "Fragment";
			case j: return "Profiler";
			case A: return "StrictMode";
			case F: return "Suspense";
			case I: return "SuspenseList";
			case z: return "Activity";
			case H: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case O: return "Portal";
			case N: return e.displayName || "Context";
			case M: return (e._context.displayName || "Context") + ".Consumer";
			case P:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case L: return t = e.displayName || null, t === null ? W(e.type) || "Memo" : t;
			case R:
				t = e._payload, e = e._init;
				try {
					return W(e(t));
				} catch {}
		}
		return null;
	}
	var re = Array.isArray, G = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ie = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, ae = [], oe = -1;
	function se(e) {
		return { current: e };
	}
	function ce(e) {
		0 > oe || (e.current = ae[oe], ae[oe] = null, oe--);
	}
	function le(e, t) {
		oe++, ae[oe] = e.current, e.current = t;
	}
	var ue = se(null), de = se(null), fe = se(null), pe = se(null);
	function me(e, t) {
		switch (le(fe, t), le(de, e), le(ue, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? dp(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = dp(t), e = fp(t, e);
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
		ce(ue), le(ue, e);
	}
	function he() {
		ce(ue), ce(de), ce(fe);
	}
	function ge(e) {
		var t = e.memoizedState;
		t !== null && (ch._currentValue = t.memoizedState, le(pe, e)), t = ue.current;
		var n = fp(t, e.type);
		t !== n && (le(de, e), le(ue, n));
	}
	function _e(e) {
		de.current === e && (ce(ue), ce(de)), pe.current === e && (ce(pe), ch._currentValue = ie);
	}
	var ve, ye;
	function be(e) {
		if (ve === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ve = t && t[1] || "", ye = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ve + e + ye;
	}
	var xe = !1;
	function Se(e, t) {
		if (!e || xe) return "";
		xe = !0;
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
			xe = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? be(n) : "";
	}
	function Ce(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return be(e.type);
			case 16: return be("Lazy");
			case 13: return e.child !== t && t !== null ? be("Suspense Fallback") : be("Suspense");
			case 19: return be("SuspenseList");
			case 0:
			case 15: return Se(e.type, !1);
			case 11: return Se(e.type.render, !1);
			case 1: return Se(e.type, !0);
			case 31: return be("Activity");
			case 30: return be("ViewTransition");
			default: return "";
		}
	}
	function we(e) {
		try {
			var t = "", n = null;
			do
				t += Ce(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Te = Object.prototype.hasOwnProperty, Ee = t.unstable_scheduleCallback, De = t.unstable_cancelCallback, Oe = t.unstable_shouldYield, ke = t.unstable_requestPaint, Ae = t.unstable_now, je = t.unstable_getCurrentPriorityLevel, Me = t.unstable_ImmediatePriority, Ne = t.unstable_UserBlockingPriority, Pe = t.unstable_NormalPriority, Fe = t.unstable_LowPriority, Ie = t.unstable_IdlePriority, Le = t.log, Re = t.unstable_setDisableYieldValue, ze = null, Be = null;
	function Ve(e) {
		if (typeof Le == "function" && Re(e), Be && typeof Be.setStrictMode == "function") try {
			Be.setStrictMode(ze, e);
		} catch {}
	}
	var He = Math.clz32 ? Math.clz32 : Ge, Ue = Math.log, We = Math.LN2;
	function Ge(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ue(e) / We | 0) | 0;
	}
	var Ke = 256, qe = 262144, Je = 4194304;
	function Ye(e) {
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
	function Xe(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ye(n))) : i = Ye(o) : i = Ye(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ye(n))) : i = Ye(o)) : i = Ye(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Ze(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Qe(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - He(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function $e(e, t) {
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
	function et() {
		var e = Je;
		return Je <<= 1, !(Je & 62914560) && (Je = 4194304), e;
	}
	function tt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function nt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function rt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - He(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && it(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function it(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - He(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function at(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - He(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function ot(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : st(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function st(e) {
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
	function ct(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function lt() {
		var e = K.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : wh(e.type)) : e;
	}
	function ut(e, t) {
		var n = K.p;
		try {
			return K.p = e, t();
		} finally {
			K.p = n;
		}
	}
	var dt = Math.random().toString(36).slice(2), ft = "__reactFiber$" + dt, pt = "__reactProps$" + dt, mt = "__reactContainer$" + dt, ht = "__reactEvents$" + dt, gt = "__reactListeners$" + dt, _t = "__reactHandles$" + dt, vt = "__reactResources$" + dt, yt = "__reactMarker$" + dt, bt = "__reactLoad$" + dt;
	function xt(e) {
		delete e[ft], delete e[pt], delete e[gt], delete e[_t];
	}
	function St(e) {
		var t;
		if (t = e[ft]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[mt] || n[ft]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = pm(e); e !== null;) {
					if (n = e[ft]) return n;
					e = pm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Ct(e) {
		if (e = e[ft] || e[mt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function wt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Tt(e) {
		var t = e[vt];
		return t ||= e[vt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Et(e) {
		e[yt] = !0;
	}
	function Dt(e) {
		e[bt] = void 0;
	}
	var Ot = /* @__PURE__ */ new Set(), kt = {};
	function At(e, t) {
		jt(e, t), jt(e + "Capture", t);
	}
	function jt(e, t) {
		for (kt[e] = t, e = 0; e < t.length; e++) Ot.add(t[e]);
	}
	var Mt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Nt = {}, Pt = {};
	function Ft(e) {
		return Te.call(Pt, e) ? !0 : Te.call(Nt, e) ? !1 : Mt.test(e) ? Pt[e] = !0 : (Nt[e] = !0, !1);
	}
	var It = !1;
	function Lt() {
		var e = It;
		return It = !1, e;
	}
	function Rt(e, t, n) {
		if (Ft(t)) {
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
	function zt(e, t, n) {
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
	function Bt(e, t, n, r) {
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
	function Vt(e) {
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
	function Ht(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Ut(e, t, n) {
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
	function Wt(e) {
		if (!e._valueTracker) {
			var t = Ht(e) ? "checked" : "value";
			e._valueTracker = Ut(e, t, "" + e[t]);
		}
	}
	function Gt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Ht(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var Kt = /[\n"\\]/g;
	function qt(e) {
		return e.replace(Kt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Jt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Vt(t)) : e.value !== "" + Vt(t) && (e.value = "" + Vt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Xt(e, Vt(n)) : o === "number" && e.value == t ? Xt(e, Vt(e.value)) : Xt(e, Vt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Vt(s) : e.removeAttribute("name");
	}
	function Yt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Wt(e);
				return;
			}
			n = n == null ? "" : "" + Vt(n), t = t == null ? n : "" + Vt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Wt(e);
	}
	function Xt(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function Zt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Vt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Qt(e, t, n) {
		t != null && (t = "" + Vt(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + Vt(n);
	}
	function $t(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (re(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Vt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Wt(e);
	}
	function en(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var tn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function nn(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || tn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function rn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", It = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (nn(e, a, r), It = !0);
		} else for (var o in t) t.hasOwnProperty(o) && nn(e, o, t[o]);
	}
	function an(e) {
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
	var on = /* @__PURE__ */ new Map([
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
	]), sn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function cn(e) {
		return sn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function ln() {}
	var un = null;
	function dn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var fn = null, pn = null;
	function mn(e) {
		var t = Ct(e);
		if (t && (e = t.stateNode)) {
			var n = e[pt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Jt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + qt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[pt] || null;
								if (!a) throw Error(i(90));
								Jt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Gt(r);
					}
					break a;
				case "textarea":
					Qt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Zt(e, !!n.multiple, t, !1);
			}
		}
	}
	var hn = !1;
	function gn(e, t, n) {
		if (hn) return e(t, n);
		hn = !0;
		try {
			return e(t);
		} finally {
			if (hn = !1, (fn !== null || pn !== null) && (Ld(), fn && (t = fn, e = pn, pn = fn = null, mn(t), e))) for (t = 0; t < e.length; t++) mn(e[t]);
		}
	}
	function _n(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[pt] || null;
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
		return T(t.prototype, {
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
	}, An = On(kn), jn = T({}, kn, {
		view: 0,
		detail: 0
	}), Mn = On(jn), Nn, Pn, Fn, In = T({}, jn, {
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
	}), Ln = On(In), Rn = On(T({}, In, { dataTransfer: 0 })), zn = On(T({}, jn, { relatedTarget: 0 })), Bn = On(T({}, kn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Vn = On(T({}, kn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Hn = On(T({}, kn, { data: 0 })), Un = {
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
	var Jn = On(T({}, jn, {
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
	})), Yn = On(T({}, In, {
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
	})), Xn = On(T({}, kn, { submitter: 0 })), Zn = On(T({}, jn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: qn
	})), Qn = On(T({}, kn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), $n = On(T({}, In, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), er = On(T({}, kn, {
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
		fn ? pn ? pn.push(r) : pn = [r] : fn = r, t = Jf(t, "onChange"), 0 < t.length && (n = new An("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var gr = null, _r = null;
	function vr(e) {
		Bf(e, 0);
	}
	function yr(e) {
		if (Gt(wt(e))) return e;
	}
	function br(e, t) {
		if (e === "change") return t;
	}
	var xr = !1;
	if (vn) {
		var Sr;
		if (vn) {
			var Cr = "oninput" in document;
			if (!Cr) {
				var wr = document.createElement("div");
				wr.setAttribute("oninput", "return;"), Cr = typeof wr.oninput == "function";
			}
			Sr = Cr;
		} else Sr = !1;
		xr = Sr && (!document.documentMode || 9 < document.documentMode);
	}
	function Tr() {
		gr && (gr.detachEvent("onpropertychange", Er), _r = gr = null);
	}
	function Er(e) {
		if (e.propertyName === "value" && yr(_r)) {
			var t = [];
			hr(t, _r, e, dn(e)), gn(vr, t);
		}
	}
	function Dr(e, t, n) {
		e === "focusin" ? (Tr(), gr = t, _r = n, gr.attachEvent("onpropertychange", Er)) : e === "focusout" && Tr();
	}
	function Or(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return yr(_r);
	}
	function kr(e, t) {
		if (e === "click") return yr(t);
	}
	function Ar(e, t) {
		if (e === "input" || e === "change") return yr(t);
	}
	function jr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Mr = typeof Object.is == "function" ? Object.is : jr;
	function Nr(e, t) {
		if (Mr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Te.call(t, i) || !Mr(e[i], t[i])) return !1;
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
	var Br = vn && "documentMode" in document && 11 >= document.documentMode, Vr = null, Hr = null, Ur = null, Wr = !1;
	function Gr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Wr || Vr == null || Vr !== Pr(r) || (r = Vr, "selectionStart" in r && zr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Ur && Nr(Ur, r) || (Ur = r, r = Jf(Hr, "onSelect"), 0 < r.length && (t = new An("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Vr)));
	}
	function Kr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var qr = {
		animationend: Kr("Animation", "AnimationEnd"),
		animationiteration: Kr("Animation", "AnimationIteration"),
		animationstart: Kr("Animation", "AnimationStart"),
		transitionrun: Kr("Transition", "TransitionRun"),
		transitionstart: Kr("Transition", "TransitionStart"),
		transitioncancel: Kr("Transition", "TransitionCancel"),
		transitionend: Kr("Transition", "TransitionEnd")
	}, Jr = {}, Yr = {};
	vn && (Yr = document.createElement("div").style, "AnimationEvent" in window || (delete qr.animationend.animation, delete qr.animationiteration.animation, delete qr.animationstart.animation), "TransitionEvent" in window || delete qr.transitionend.transition);
	function Xr(e) {
		if (Jr[e]) return Jr[e];
		if (!qr[e]) return e;
		var t = qr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Yr) return Jr[e] = t[n];
		return e;
	}
	var Zr = Xr("animationend"), Qr = Xr("animationiteration"), $r = Xr("animationstart"), ei = Xr("transitionrun"), ti = Xr("transitionstart"), ni = Xr("transitioncancel"), ri = Xr("transitionend"), ii = /* @__PURE__ */ new Map(), q = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	q.push("scrollEnd");
	function ai(e, t) {
		ii.set(e, t), At(t, [e]);
	}
	var oi = 0;
	function si(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = vd.identifierPrefix;
		var n = oi++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function ci(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Ed;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function li(e, t) {
		return e = ci(e), t = ci(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var ui = typeof reportError == "function" ? reportError : function(e) {
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
	}, di = [], J = 0, fi = 0;
	function pi() {
		for (var e = J, t = fi = J = 0; t < e;) {
			var n = di[t];
			di[t++] = null;
			var r = di[t];
			di[t++] = null;
			var i = di[t];
			di[t++] = null;
			var a = di[t];
			if (di[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && _i(n, i, a);
		}
	}
	function mi(e, t, n, r) {
		di[J++] = e, di[J++] = t, di[J++] = n, di[J++] = r, fi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
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
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - He(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function vi(e) {
		if (50 < Dd) throw Dd = 0, Od = null, Error(i(185));
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
		else if (typeof r == "string") s = Jm(e, n, ue.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case z: return e = xi(31, n, t, a), e.elementType = z, e.lanes = o, e;
			case k: return Ei(n.children, a, o, t);
			case A:
				s = 8, a |= 24;
				break;
			case j: return e = xi(12, n, t, a | 2), e.elementType = j, e.lanes = o, e;
			case F: return e = xi(13, n, t, a), e.elementType = F, e.lanes = o, e;
			case I: return e = xi(19, n, t, a), e.elementType = I, e.lanes = o, e;
			case B:
			case H: return e = a | 32, e = xi(30, n, t, e), e.elementType = H, e.lanes = o, e.stateNode = {
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
				stack: we(t)
			}, Ai.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: we(t)
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
		var i = 32 - He(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - He(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, zi = 1 << 32 - He(t) + i | n << i | r, Bi = a + e;
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
		switch (t[ft] = e, t[pt] = r, n) {
			case "dialog":
				Vf("cancel", t), Vf("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Vf("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Rf.length; n++) Vf(Rf[n], t);
				break;
			case "source":
				Vf("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Vf("error", t), Vf("load", t);
				break;
			case "details":
				Vf("toggle", t);
				break;
			case "input":
				Vf("invalid", t), Yt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Vf("invalid", t);
				break;
			case "textarea": Vf("invalid", t), $t(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || ep(t.textContent, n) ? (r.popover != null && (Vf("beforetoggle", t), Vf("toggle", t)), r.onScroll != null && Vf("scroll", t), r.onScrollEnd != null && Vf("scrollend", t), r.onClick != null && (t.onclick = ln), t = !0) : t = !1, t || Qi(e, !0);
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
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || mp(e.type, e.memoizedProps)), n = !n), n && qi && Qi(e), ea(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			qi = fm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			qi = fm(e);
		} else t === 27 ? (t = qi, Cp(e.type) ? (e = dm, dm = null, qi = e) : qi = t) : qi = Ki ? um(e.stateNode.nextSibling) : null;
		return !0;
	}
	function na() {
		qi = Ki = null, Ji = !1;
	}
	function ra() {
		var e = Yi;
		return e !== null && (ud === null ? ud = e : ud.push.apply(ud, e), Yi = null), e;
	}
	function ia(e) {
		Yi === null ? Yi = [e] : Yi.push(e);
	}
	var aa = se(null), oa = null, sa = null;
	function ca(e, t, n) {
		le(aa, t._currentValue), t._currentValue = n;
	}
	function la(e) {
		e._currentValue = aa.current, ce(aa);
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
					Mr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === pe.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [ch] : e.push(ch));
			}
			a = a.return;
		}
		return e !== null && da(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function pa(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Mr(e.context._currentValue, e.memoizedValue)) return !0;
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
		$$typeof: N,
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
			Oa = 0, ka = Nf(), Aa = {
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
	var Pa = G.S;
	G.S = function(e, t) {
		if (pd = Ae(), typeof t == "object" && t && typeof t.then == "function" && ja(e, t), Ta !== null) for (var n = yf; n !== null;) wa(n, Ta), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = yf; r !== null;) wa(r, n), r = r.next;
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
	var Fa = se(null);
	function Ia() {
		var e = Fa.current;
		return e === null ? Ju.pooledCache : e;
	}
	function La(e, t) {
		t === null ? le(Fa, Fa.current) : le(Fa, t.pool);
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
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(ln, ln), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ja(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(ln, ln);
				else {
					if (e = Ju, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
		throw t.$$typeof === E ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
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
			return i === k ? (e = d(e, t, n.props.children, r, n.key), Qa(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === R && Ga(i) === t.type) ? (t = a(t, n.props), Qa(t, n), t.return = e, t) : (t = Ti(n.type, n.key, n.props, null, e.mode, r), Qa(t, n), t.return = e, t);
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
					case D: return n = Ti(t.type, t.key, t.props, null, e.mode, n), Qa(n, t), n.return = e, n;
					case O: return t = ki(t, e.mode, n), t.return = e, t;
					case R: return t = Ga(t), f(e, t, n);
				}
				if (re(t) || U(t)) return t = Ei(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Za(t), n);
				if (t.$$typeof === N) return f(e, ga(e, t), n);
				$a(e, t);
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
					case R: return n = Ga(n), p(e, t, n, r);
				}
				if (re(n) || U(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Za(n), r);
				if (n.$$typeof === N) return p(e, t, ga(e, n), r);
				$a(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case D: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case O: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case R: return r = Ga(r), m(e, t, n, r, i);
				}
				if (re(r) || U(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Za(r), i);
				if (r.$$typeof === N) return m(e, t, n, ga(t, r), i);
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
			if (typeof o == "object" && o && o.type === k && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case D:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === k) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), Qa(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === R && Ga(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Qa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === k ? (c = Ei(o.props.children, e.mode, c, o.key), Qa(c, o), c.return = e, e = c) : (c = Ti(o.type, o.key, o.props, null, e.mode, c), Qa(c, o), c.return = e, e = c);
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
							c = ki(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case R: return o = Ga(o), _(e, r, o, c);
				}
				if (re(o)) return h(e, r, o, c);
				if (U(o)) {
					if (l = U(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, Za(o), c);
				if (o.$$typeof === N) return _(e, r, ga(e, o), c);
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
		if (r = r.shared, qu & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = vi(e), _i(e, null, n), t;
		}
		return mi(e, r, t, n), vi(e);
	}
	function co(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, at(e, n);
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
				if (p ? (Xu & f) === f : (r & f) === f) {
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
								d = T({}, d, f);
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), id |= o, e.lanes = o, e.memoizedState = d;
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
	var go = se(null), _o = se(0);
	function vo(e, t) {
		e = nd, le(_o, e), le(go, t), nd = e | t.baseLanes;
	}
	function yo() {
		le(_o, nd), le(go, go.current);
	}
	function bo() {
		nd = _o.current, ce(go), ce(_o);
	}
	var xo = se(null), So = null;
	function Co(e) {
		var t = e.alternate;
		le(Oo, Oo.current & 1), le(xo, e), So === null && (t === null || go.current !== null || t.memoizedState !== null) && (So = e);
	}
	function wo(e) {
		le(Oo, Oo.current), le(xo, e), So === null && (So = e);
	}
	function To(e) {
		e.tag === 22 ? (le(Oo, Oo.current), le(xo, e), So === null && (So = e)) : Eo();
	}
	function Eo() {
		le(Oo, Oo.current), le(xo, xo.current);
	}
	function Do(e) {
		ce(xo), So === e && (So = null), ce(Oo);
	}
	var Oo = se(0);
	function ko(e, t) {
		le(xo, xo.current), le(Oo, t);
	}
	function Ao(e) {
		ce(Oo), ce(xo), So === e && (So = null);
	}
	function jo(e) {
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
	var Mo = 0, No = null, Po = null, Fo = null, Io = !1, Lo = !1, Ro = !1, zo = 0, Bo = 0, Vo = null, Ho = 0;
	function Uo() {
		throw Error(i(321));
	}
	function Wo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Mr(e[n], t[n])) return !1;
		return !0;
	}
	function Go(e, t, n, r, i, a) {
		return Mo = a, No = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, G.H = e === null || e.memoizedState === null ? sc : cc, Ro = !1, a = n(r, i), Ro = !1, Lo && (a = qo(t, n, r, i)), Ko(e), a;
	}
	function Ko(e) {
		G.H = oc;
		var t = Po !== null && Po.next !== null;
		if (Mo = 0, Fo = Po = No = null, Io = !1, Bo = 0, Vo = null, t) throw Error(i(300));
		e === null || Tc || (e = e.dependencies, e !== null && pa(e) && (Tc = !0));
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
			G.H = lc, o = t(n, r);
		} while (Lo);
		return o;
	}
	function Jo() {
		var e = G.H, t = e.useState()[0];
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
		return Bo += 1, Vo === null && (Vo = []), e = Wa(Vo, e, t), t = No, (Fo === null ? t.memoizedState : Fo.next) === null && (t = t.alternate, G.H = t === null || t.memoizedState === null ? sc : cc), e;
	}
	function ns(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ts(e);
			if (e.$$typeof === ee) return;
			if (e.$$typeof === N) return ha(e);
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
		}, n === null && (n = es(), No.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = V;
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
				if (f === u.lane ? (Mo & f) === f : (Xu & f) === f) {
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
					}, l === null ? (c = l = f, s = o) : l = l.next = f, No.lanes |= p, id |= p;
					f = u.action, Ro && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, No.lanes |= f, id |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Mr(o, e.memoizedState) && (Tc = !0, d && (n = Aa, n !== null))) throw n;
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
			Mr(o, t.memoizedState) || (Tc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function cs(e, t, n) {
		var r = No, a = $o(), o = Ji;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Mr((Po || a).memoizedState, n);
		if (s && (a.memoizedState = n, Tc = !0), a = a.queue, Ms(ds.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Fo !== null && !!(Fo.memoizedState.tag & 1), Ds(e ? 9 : 8, { destroy: void 0 }, us.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, Ju === null) throw Error(i(349));
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
			return !Mr(e, n);
		} catch {
			return !0;
		}
	}
	function ps(e) {
		var t = gi(e, 2);
		t !== null && Md(t, e, 2);
	}
	function ms(e) {
		var t = Qo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Ro) {
				Ve(!0);
				try {
					n();
				} finally {
					Ve(!1);
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
			G.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, _s(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function _s(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = G.T, o = {};
			o.types = a === null ? null : a.types, G.T = o;
			try {
				var s = n(i, r), c = G.S;
				c !== null && c(o, s), vs(e, t, s);
			} catch (n) {
				bs(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), G.T = a;
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
		if (Ji) {
			var n = Ju.formState;
			if (n !== null) {
				a: {
					var r = No;
					if (Ji) {
						if (qi) {
							b: {
								for (var i = qi, a = Xi; i.nodeType !== 8;) if (!a || (i = um(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								qi = um(i.nextSibling), r = i.data === "F!";
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
			lastRenderedReducer: xs,
			lastRenderedState: t
		}, n.queue = r, n = ec.bind(null, No, r), r.dispatch = n, r = ms(!1), a = nc.bind(null, No, !1, r.queue), r = Qo(), i = {
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
	function Cs(e) {
		return X($o(), Po, e);
	}
	function X(e, t, n) {
		if (t = os(e, t, xs)[0], e = as(is)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ts(t);
		} catch (e) {
			throw e === za ? Va : e;
		}
		else r = t;
		t = $o();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (No.flags |= 2048, Ds(9, { destroy: void 0 }, ws.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ws(e, t) {
		e.action = t;
	}
	function Ts(e) {
		var t = $o(), n = Po;
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
		}, t = No.updateQueue, t === null && (t = es(), No.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ks() {
		return $o().memoizedState;
	}
	function As(e, t, n, r) {
		var i = Qo();
		No.flags |= e, i.memoizedState = Ds(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Z(e, t, n, r) {
		var i = $o();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		Po !== null && r !== null && Wo(r, Po.memoizedState.deps) ? i.memoizedState = Ds(t, a, n, r) : (No.flags |= e, i.memoizedState = Ds(1 | t, a, n, r));
	}
	function js(e, t) {
		As(8390656, 8, e, t);
	}
	function Ms(e, t) {
		Z(2048, 8, e, t);
	}
	function Ns(e) {
		No.flags |= 4;
		var t = No.updateQueue;
		if (t === null) t = es(), No.updateQueue = t, t.events = [e];
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
			if (qu & 2) throw Error(i(440));
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
		return t !== null && Wo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Vs(e, t) {
		var n = $o();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Wo(t, r[1])) return r[0];
		if (r = e(), Ro) {
			Ve(!0);
			try {
				e();
			} finally {
				Ve(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Hs(e, t, n) {
		return n === void 0 || Mo & 1073741824 && !(Xu & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Ad(), No.lanes |= e, id |= e, n);
	}
	function Us(e, t, n, r) {
		return Mr(n, t) ? n : go.current === null ? !(Mo & 106) || Mo & 1073741824 && !(Xu & 261930) ? (Tc = !0, e.memoizedState = n) : (e = Ad(), No.lanes |= e, id |= e, t) : (e = Hs(e, n, r), Mr(e, t) || (Tc = !0), e);
	}
	function Ws(e, t, n, r, i) {
		var a = K.p;
		K.p = a !== 0 && 8 > a ? a : 8;
		var o = G.T, s = {};
		s.types = o === null ? null : o.types, G.T = s, nc(e, !1, t, n);
		try {
			var c = i(), l = G.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? tc(e, t, Na(c, r), kd(e)) : tc(e, t, r, kd(e));
		} catch (n) {
			tc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, kd());
		} finally {
			K.p = a, o !== null && s.types !== null && (o.types = s.types), G.T = o;
		}
	}
	function Gs() {}
	function Ks(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = qs(e).queue;
		Ws(e, a, t, ie, n === null ? Gs : function() {
			return Js(e), n(r);
		});
	}
	function qs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ie,
			baseState: ie,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: is,
				lastRenderedState: ie
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
		t.next === null && (t = e.alternate.memoizedState), tc(e, t.next.queue, {}, kd());
	}
	function Ys() {
		return ha(ch);
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
					var n = kd();
					e = oo(n);
					var r = so(t, e, n);
					r !== null && (Md(r, t, n), co(r, t, n)), t = { cache: Sa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function $s(e, t, n) {
		var r = kd();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, rc(e) ? ic(t, n) : (n = hi(e, t, n, r), n !== null && (Md(n, e, r), ac(n, t, r)));
	}
	function ec(e, t, n) {
		tc(e, t, n, kd());
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
				if (i.hasEagerState = !0, i.eagerState = s, Mr(s, o)) return mi(e, t, i, 0), Ju === null && pi(), !1;
			} catch {}
			if (n = hi(e, t, i, r), n !== null) return Md(n, e, r), ac(n, t, r), !0;
		}
		return !1;
	}
	function nc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Nf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, rc(e)) {
			if (t) throw Error(i(479));
		} else t = hi(e, n, r, 2), t !== null && Md(t, e, 2);
	}
	function rc(e) {
		var t = e.alternate;
		return e === No || t !== null && t === No;
	}
	function ic(e, t) {
		Lo = Io = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function ac(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, at(e, n);
		}
	}
	var oc = {
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
	}, sc = {
		readContext: ha,
		use: ns,
		useCallback: function(e, t) {
			return Qo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ha,
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
			if (Ro) {
				Ve(!0);
				try {
					e();
				} finally {
					Ve(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Qo();
			if (n !== void 0) {
				var i = n(t);
				if (Ro) {
					Ve(!0);
					try {
						n(t);
					} finally {
						Ve(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = $s.bind(null, No, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Qo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = ms(e);
			var t = e.queue, n = ec.bind(null, No, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: zs,
		useDeferredValue: function(e, t) {
			return Hs(Qo(), e, t);
		},
		useTransition: function() {
			var e = ms(!1);
			return e = Ws.bind(null, No, e.queue, !0, !1), Qo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = No, a = Qo();
			if (Ji) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Ju === null) throw Error(i(349));
				Xu & 127 || ls(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, js(ds.bind(null, r, o, e), [e]), r.flags |= 2048, Ds(9, { destroy: void 0 }, us.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Qo(), t = Ju.identifierPrefix;
			if (Ji) {
				var n = Bi, r = zi;
				n = (r & ~(1 << 32 - He(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = zo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Ho++, t = "_" + t + "r_" + n.toString(32) + "_";
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
			return t.queue = n, t = nc.bind(null, No, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: rs,
		useCacheRefresh: function() {
			return Qo().memoizedState = Qs.bind(null, No);
		},
		useEffectEvent: function(e) {
			var t = Qo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (qu & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, cc = {
		readContext: ha,
		use: ns,
		useCallback: Bs,
		useContext: ha,
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
			return Us($o(), Po.memoizedState, e, t);
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
			return hs($o(), Po, e, t);
		},
		useMemoCache: rs,
		useCacheRefresh: Zs,
		useEffectEvent: Ps
	}, lc = {
		readContext: ha,
		use: ns,
		useCallback: Bs,
		useContext: ha,
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
			return Po === null ? Hs(n, e, t) : Us(n, Po.memoizedState, e, t);
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
			return Po === null ? (n.baseState = e, [e, n.queue.dispatch]) : hs(n, Po, e, t);
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
			var r = kd(), i = oo(r);
			i.payload = t, n != null && (i.callback = n), t = so(e, i, r), t !== null && (Md(t, e, r), co(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = kd(), i = oo(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = so(e, i, r), t !== null && (Md(t, e, r), co(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = kd(), r = oo(n);
			r.tag = 2, t != null && (r.callback = t), t = so(e, r, n), t !== null && (Md(t, e, n), co(t, e, n));
		}
	};
	function fc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Nr(n, r) || !Nr(i, a) : !0;
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
		ui(e);
	}
	function gc(e) {
		console.error(e);
	}
	function _c(e) {
		ui(e);
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
		return n = oo(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			vc(e, t);
		}, n;
	}
	function xc(e) {
		return e = oo(e), e.tag = 3, e;
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
			yc(t, n, r), typeof i != "function" && (gd === null ? gd = /* @__PURE__ */ new Set([this]) : gd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Cc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && fa(t, n, a, !0), n = xo.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return So === null ? Wd() : n.alternate === null && rd === 0 && (rd = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Ha ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), pf(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Ha ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), pf(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return pf(e, r, a), Wd(), !1;
		}
		if (Ji) return t = xo.current, t === null ? (r !== Zi && (t = Error(i(423), { cause: r }), ia(ji(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = ji(r, n), a = bc(e.stateNode, r, a), lo(e, a), rd !== 4 && (rd = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Zi && (e = Error(i(422), { cause: r }), ia(ji(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = ji(o, n), ld === null ? ld = [o] : ld.push(o), rd !== 4 && (rd = 2), t === null) return !0;
		r = ji(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = bc(n.stateNode, r, e), lo(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (gd === null || !gd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = xc(a), Sc(a, e, n, r), lo(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var wc = Error(i(461)), Tc = !1;
	function Ec(e, t, n, r) {
		t.child = e === null ? no(t, null, n, r) : to(t, e.child, n, r);
	}
	function Dc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ma(t), r = Go(e, t, n, o, a, i), s = Yo(), e !== null && !Tc ? (Xo(e, t, i), tl(e, t, i)) : (Ji && s && Ui(t), t.flags |= 1, Ec(e, t, r, i), t.child);
	}
	function Oc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Si(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, kc(e, t, a, r, i)) : (e = Ti(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !nl(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Nr : n, n(o, r) && e.ref === t.ref) return tl(e, t, i);
		}
		return t.flags |= 1, e = Ci(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function kc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Nr(a, r) && e.ref === t.ref) {
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
			}, e !== null && La(t, a === null ? null : a.cachePool), a === null ? yo() : vo(t, a), To(t);
			else return r = t.lanes = 536870912, Mc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && La(t, null), yo(), Eo()) : (La(t, a.cachePool), vo(t, a), Eo(), t.memoizedState = null);
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
		var a = Ia();
		return a = a === null ? null : {
			parent: xa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && La(t, null), yo(), To(t), e !== null && fa(e, t, r, !0), t.childLanes = i, null;
	}
	function Nc(e, t) {
		return t = Kc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Pc(e, t, n) {
		return to(t, e.child, null, n), e = Nc(t, t.pendingProps), e.flags |= 2, Do(t), t.memoizedState = null, e;
	}
	function Fc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (Ji) {
				if (r.mode === "hidden") return e = Nc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, jc(null, e);
				if (wo(t), (e = qi) ? (e = om(e, Xi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
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
			return Nc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (wo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Pc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Tc || fa(e, t, n, !1), a = (n & e.childLanes) !== 0, Tc || a) {
				if (go.current === null) {
					if (r = Ju, r !== null && (s = ot(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, gi(e, s), Md(r, e, s), wc;
					Wd();
				}
				t = Pc(e, t, n);
			} else e = o.treeContext, qi = um(s.nextSibling), Ki = t, Ji = !0, Yi = null, Xi = !1, e !== null && Gi(t, e), t = Nc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Ci(e.child, {
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
		return ma(t), n = Go(e, t, n, r, void 0, i), r = Yo(), e !== null && !Tc ? (Xo(e, t, i), tl(e, t, i)) : (Ji && r && Ui(t), t.flags |= 1, Ec(e, t, n, i), t.child);
	}
	function Rc(e, t, n, r, i, a) {
		return ma(t), t.updateQueue = null, n = qo(t, r, n, i), Ko(e), r = Yo(), e !== null && !Tc ? (Xo(e, t, a), tl(e, t, a)) : (Ji && r && Ui(t), t.flags |= 1, Ec(e, t, n, a), t.child);
	}
	function zc(e, t, n, r, i) {
		if (ma(t), t.stateNode === null) {
			var a = yi, o = n.contextType;
			typeof o == "object" && o && (a = ha(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = dc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, io(t), o = n.contextType, a.context = typeof o == "object" && o ? ha(o) : yi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (uc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && dc.enqueueReplaceState(a, a.state, null), po(t, r, a, i), fo(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = mc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = yi, typeof u == "object" && u && (o = ha(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && pc(t, a, r, o), ro = !1;
			var f = t.memoizedState;
			a.state = f, po(t, r, a, i), fo(), l = t.memoizedState, s || f !== l || ro ? (typeof d == "function" && (uc(t, n, d, r), l = t.memoizedState), (c = ro || fc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, ao(e, t), o = t.memoizedProps, u = mc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = yi, typeof l == "object" && l && (c = ha(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && pc(t, a, r, c), ro = !1, f = t.memoizedState, a.state = f, po(t, r, a, i), fo();
			var p = t.memoizedState;
			o !== d || f !== p || ro || e !== null && e.dependencies !== null && pa(e.dependencies) ? (typeof s == "function" && (uc(t, n, s, r), p = t.memoizedState), (u = ro || fc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && pa(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Ic(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = to(t, e.child, null, i), t.child = to(t, null, n, i)) : Ec(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = tl(e, t, i), e;
	}
	function Bc(e, t, n, r) {
		return na(), t.flags |= 256, Ec(e, t, n, r), t.child;
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
			cachePool: Ra()
		};
	}
	function Uc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= sd), e;
	}
	function Wc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Oo.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (Ji) {
				if (i ? Co(t) : Eo(), (e = qi) ? (e = om(e, Xi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ri === null ? null : {
						id: zi,
						overflow: Bi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Oi(e), n.return = t, t.child = n, Ki = t, qi = null)) : e = null, e === null) throw Qi(t);
				return t.lanes = cm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Eo(), i = t.mode, a = Kc({
				mode: "hidden",
				children: a
			}, i), r = Ei(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Hc(n), r.childLanes = Uc(e, o, n), t.memoizedState = Vc, jc(null, r)) : (Co(t), Gc(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return Jc(e, t, a, o, r, c, s, n);
		}
		return i ? (Eo(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Ci(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = Ei(i, a, n, null), i.flags |= 2) : i = Ci(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, jc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Hc(n) : (a = i.cachePool, a === null ? a = Ra() : (s = xa._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = Uc(e, o, n), t.memoizedState = Vc, jc(e.child, r)) : (Co(t), n = e.child, e = n.sibling, n = Ci(n, {
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
		return e = xi(22, e, null, t), e.lanes = 0, e;
	}
	function qc(e, t, n) {
		return to(t, e.child, null, n), e = Gc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Jc(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (Co(t), t.flags &= -257, qc(e, t, c)) : t.memoizedState === null ? (Eo(), o = a.fallback, s = t.mode, a = Kc({
			mode: "visible",
			children: a.children
		}, s), o = Ei(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, to(t, e.child, null, c), a = t.child, a.memoizedState = Hc(c), a.childLanes = Uc(e, r, c), t.memoizedState = Vc, jc(null, a)) : (Eo(), t.child = e.child, t.flags |= 128, null);
		if (Co(t), cm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, ia({
				value: a,
				source: null,
				stack: null
			})), qc(e, t, c);
		}
		if (Tc || fa(e, t, c, !1), r = (c & e.childLanes) !== 0, Tc || r) {
			if (go.current !== null) return qc(e, t, c);
			if (r = Ju, r !== null && (a = ot(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, gi(e, a), Md(r, e, a), wc;
			return sm(o) || Wd(), qc(e, t, c);
		}
		return sm(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, qi = um(o.nextSibling), Ki = t, Ji = !0, Yi = null, Xi = !1, e !== null && Gi(t, e), t = Gc(t, a.children), t.flags |= 134221824, t);
	}
	function Yc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), ua(e.return, t, n);
	}
	function Xc(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && jo(n) === null && (t = e), e = e.sibling;
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
		var o = Oo.current;
		if (t.flags & 128) return ko(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, ko(t, o), i === "backwards" && e !== null ? (Qc(e), Ec(e, t, r, n), Qc(e)) : Ec(e, t, r, n), r = Ji ? Fi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
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
					if (e = i.alternate, e !== null && jo(e) === null) {
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
		return ca(t, t.type, r.value), Ec(e, t, r.children, n), t.child;
	}
	function tl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), id |= t.lanes, (n & t.childLanes) === 0) {
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
	function nl(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && pa(e)));
	}
	function rl(e, t, n) {
		switch (t.tag) {
			case 3:
				me(t, t.stateNode.containerInfo), ca(t, xa, e.memoizedState.cache), na();
				break;
			case 27:
			case 5:
				ge(t);
				break;
			case 4:
				me(t, t.stateNode.containerInfo);
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
					return r || (n & i) !== 0 ? Wc(e, t, n) : (Co(t), e = tl(e, t, n), e === null ? null : e.sibling);
				}
				Co(t);
				break;
			case 19:
				if (t.flags & 128) return $c(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (fa(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return $c(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ko(t, Oo.current), r) break;
				return null;
			case 22: return t.lanes = 0, Ac(e, t, n, t.pendingProps);
			case 24: ca(t, xa, e.memoizedState.cache);
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
		} else Tc = !1, Ji && t.flags & 1048576 && Hi(t, Fi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ga(t.elementType), t.type = e, typeof e == "function") Si(e) ? (r = mc(e, r), t.tag = 1, t = zc(null, t, e, r, n)) : (t.tag = 0, t = Lc(null, t, e, r, n));
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
						throw t = W(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Lc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = mc(r, t.pendingProps), zc(e, t, r, a, n);
			case 3:
				a: {
					if (me(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
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
							t = Bc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = ji(Error(i(424)), t), ia(a), t = Bc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (qi = um(e.firstChild), Ki = t, Ji = !0, Yi = null, Xi = !0, n = no(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (na(), r === a) {
							t = tl(e, t, n);
							break a;
						}
						Ec(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Ic(e, t), e === null ? (n = Pm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Ji || (t.stateNode = pp(t.type, t.pendingProps, fe.current, t)) : t.memoizedState = Pm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ge(t), e === null && Ji && (r = t.stateNode = gm(t.type, t.pendingProps, fe.current), Ki = t, Xi = !0, a = qi, Cp(t.type) ? (dm = a, qi = um(r.firstChild)) : qi = a), Ec(e, t, t.pendingProps.children, n), Ic(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && Ji && ((a = r = qi) && (r = im(r, t.type, t.pendingProps, Xi), r === null ? a = !1 : (t.stateNode = r, Ki = t, qi = um(r.firstChild), Xi = !1, a = !0)), a || Qi(t)), ge(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, mp(a, o) ? r = null : s !== null && mp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Go(e, t, Jo, null, null, n), ch._currentValue = a), Ic(e, t), Ec(e, t, r, n), t.child;
			case 6: return e === null && Ji && ((e = n = qi) && (n = am(n, t.pendingProps, Xi), n === null ? e = !1 : (t.stateNode = n, Ki = t, qi = null, e = !0)), e || Qi(t)), null;
			case 13: return Wc(e, t, n);
			case 4: return me(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = to(t, null, r, n) : Ec(e, t, r, n), t.child;
			case 11: return Dc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Ic(e, t), Ec(e, t, r, n), t.child;
			case 8: return Ec(e, t, t.pendingProps.children, n), t.child;
			case 12: return Ec(e, t, t.pendingProps.children, n), t.child;
			case 10: return el(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, ma(t), a = ha(a), r = r(a), t.flags |= 1, Ec(e, t, r, n), t.child;
			case 14: return Oc(e, t, t.type, t.pendingProps, n);
			case 15: return kc(e, t, t.type, t.pendingProps, n);
			case 19: return $c(e, t, n);
			case 31: return Fc(e, t, n);
			case 22: return Ac(e, t, n, t.pendingProps);
			case 24: return ma(t), r = ha(xa), e === null ? (a = Ia(), a === null && (a = Ju, o = Sa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, io(t), ca(t, xa, a)) : ((e.lanes & n) !== 0 && (ao(e, t), po(t, null, null, n), fo()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ca(t, xa, r), r !== a.cache && da(t, [xa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ca(t, xa, r))), Ec(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : Ji && Ui(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Ic(e, t), Ec(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function al(e) {
		e.flags |= 4;
	}
	function ol(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Ym(t, r) : Ym(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Vd()) e.flags |= 8192;
				else throw Ka = Ha, Ba;
			}
		} else e.flags &= -16777217;
	}
	function sl(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Xm(t)) {
			if (Vd()) e.flags |= 8192;
			else throw Ka = Ha, Ba;
		}
	}
	function cl(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : et(), e.lanes |= t, cd |= t);
	}
	function ll(e, t) {
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
	function ul(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function dl(e, t, n) {
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
			case 14: return ul(t), null;
			case 1: return ul(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), la(xa), he(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ta(t) ? al(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ra())), ul(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (al(t), o === null ? (ul(t), ol(t, a, null, r, n)) : (ul(t), sl(t, o))) : o ? o === e.memoizedState ? (ul(t), t.flags &= -16777217) : (al(t), ul(t), sl(t, o)) : (e = e.memoizedProps, e !== r && al(t), ul(t), ol(t, a, e, r, n)), null;
			case 27:
				if (_e(t), n = fe.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && al(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return ul(t), t.subtreeFlags &= -33554433, null;
					}
					e = ue.current, ta(t) ? $i(t, e) : (e = gm(a, r, n), t.stateNode = e, al(t));
				}
				return ul(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (_e(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && al(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return ul(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = ue.current, ta(t)) $i(t, o);
					else {
						var s = up(fe.current);
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
						o[ft] = t, o[pt] = r;
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
						a: switch (rp(o, a, r), a) {
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
					if (e = fe.current, ta(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Ki, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[ft] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || ep(e.nodeValue, n)), e || Qi(t, !0);
					} else e = up(e).createTextNode(r), e[ft] = t, t.stateNode = e;
				}
				return ul(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ta(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[ft] = t;
						} else na(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						ul(t), e = !1;
					} else n = ra(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Do(t), t) : (Do(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return ul(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ta(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[ft] = t;
						} else na(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						ul(t), a = !1;
					} else a = ra(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Do(t), t) : (Do(t), null);
				}
				return Do(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), cl(t, t.updateQueue), ul(t), null);
			case 4: return he(), e === null && Wf(t.stateNode.containerInfo), t.flags |= 67108864, ul(t), null;
			case 10: return la(t.type), ul(t), null;
			case 19:
				if (Ao(t), r = t.memoizedState, r === null) return ul(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) ll(r, !1);
					else {
						if (rd !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = jo(e), o !== null) {
								for (t.flags |= 128, ll(r, !1), e = o.updateQueue, t.updateQueue = e, cl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) wi(n, e), n = n.sibling;
								return ko(t, Oo.current & 1 | 2), Ji && Vi(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Ae() > md && (t.flags |= 128, a = !0, ll(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = jo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, cl(t, e), ll(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !Ji) return ul(t), null;
						} else 2 * Ae() - r.renderingStartTime > md && n !== 536870912 && (t.flags |= 128, a = !0, ll(r, !1), t.lanes = 4194304);
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
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ae(), e.sibling = null, o = Oo.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || Ji ? ko(t, o) : (n = o, le(xo, t), le(Oo, n), So === null && (So = t)), Ji && Vi(t, r.treeForkCount), e;
				}
				return ul(t), null;
			case 22:
			case 23: return Do(t), bo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (ul(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ul(t), n = t.updateQueue, n !== null && cl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && ce(Fa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), la(xa), ul(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, ul(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function fl(e, t) {
		switch (Wi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return la(xa), he(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return _e(t), null;
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
			case 4: return he(), null;
			case 10: return la(t.type), null;
			case 22:
			case 23: return Do(t), bo(), e !== null && ce(Fa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return la(xa), null;
			case 25: return null;
			default: return null;
		}
	}
	function pl(e, t) {
		switch (Wi(t), t.tag) {
			case 3:
				la(xa), he();
				break;
			case 26:
			case 27:
			case 5:
				_e(t);
				break;
			case 4:
				he();
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
				Do(t), bo(), e !== null && ce(Fa);
				break;
			case 24: la(xa);
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
			ff(t, t.return, e);
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
	function gl(e) {
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
	function _l(e, t, n) {
		n.props = mc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			ff(e, t, n);
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
						var i = e.stateNode, a = si(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Fp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Ip(e);
							f(e.child, !1, $p, o, void 0, void 0), e.stateNode = o;
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
	function yl(e, t) {
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
	function bl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) tm(e.stateNode, t[n]);
	}
	function xl(e) {
		for (var t = e.return; t !== null && (wl(t) && tm(e.stateNode, t.stateNode), !Cl(t));) t = t.return;
	}
	function Sl(e) {
		for (var t = e.return; t !== null && (wl(t) && nm(e.stateNode, t.stateNode), !Cl(t));) t = t.return;
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
			ff(e, e.return, t);
		}
	}
	function El(e, t, n) {
		try {
			var r = e.stateNode;
			ap(r, e.type, n, t), r[pt] = t;
		} catch (t) {
			ff(e, e.return, t);
		}
	}
	function Dl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Cp(e.type) || e.tag === 4;
	}
	function Ol(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Dl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Cp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function kl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ln)), bl(e, r), It = !0;
		else if (i !== 4 && (i === 27 && (bl(e, r), r = null, Cp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (kl(e, t, n, r), e = e.sibling; e !== null;) kl(e, t, n, r), e = e.sibling;
	}
	function Al(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), bl(e, r), It = !0;
		else if (i !== 4 && (i === 27 && (bl(e, r), r = null, Cp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Al(e, t, n, r), e = e.sibling; e !== null;) Al(e, t, n, r), e = e.sibling;
	}
	function jl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			rp(t, r, n), t[ft] = e, t[pt] = n;
		} catch (t) {
			ff(e, e.return, t);
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
					var s = kp(o);
					r.push(s), s.view && (a = !0);
				} else a || kp(o).view && (a = !0);
				Ml = !0, Ep(o, Ll === 0 ? t : t + "_" + Ll, n), Ll++;
			} else e.tag === 22 && e.memoizedState !== null || e.tag === 30 && i || zl(e.child, t, n, r, i) && (a = !0);
			e = e.sibling;
		}
		return a;
	}
	function Bl(e, t) {
		for (; e !== null;) e.tag === 5 ? Dp(e.stateNode, e.memoizedProps) : e.tag === 22 && e.memoizedState !== null || e.tag === 30 && t || Bl(e.child, t), e = e.sibling;
	}
	function Vl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (Vl(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = li(t.default, t.share), t !== "none" && (Rl(e, n, t, null, !1) || Bl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Hl(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = si(r, n), a = li(r.default, n.paired ? r.share : r.enter);
			a === "none" ? Vl(e) : Rl(e, i, a, null, !1) ? (Vl(e), n.paired || t || jd(e, r.onEnter)) : Bl(e.child, !1);
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
								var a = li(n.default, n.share);
								if (a !== "none" && (Rl(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, jd(e, n.onShare)) : Bl(e.child, !1)), t.delete(r), t.size === 0) break;
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
			var t = e.memoizedProps, n = si(t, e.stateNode), r = Nl === null ? void 0 : Nl.get(n), i = li(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Rl(e, n, i, null, !1) ? r === void 0 ? jd(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Nl.delete(n), jd(e, t.onShare)) : Bl(e.child, !1)), Nl !== null && Ul(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Wl(e), e = e.sibling;
		else Nl !== null && Ul(e);
	}
	function Gl(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = si(t, e.stateNode);
				t = li(t.default, t.update), e.flags &= -5, t !== "none" && Rl(e, n, t, e.memoizedState = [], !1);
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
					var l = a[Ll], u = kp(c);
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
				e.flags & 4 && Ep(c, Ll === 0 ? n : n + "_" + Ll, i), s && e.flags & 4 || (Fl === null && (Fl = []), Fl.push(c, Ll === 0 ? r : r + "_" + Ll, t.memoizedProps)), Ll++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : Yl(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function Xl(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = si(n, r), a = li(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(Ap);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				Ll = 0, i = Yl(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || jd(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && Xl(e, t);
			e = e.sibling;
		}
	}
	var Zl = !1, Ql = !1, $l = !1, eu = !1, tu = typeof WeakSet == "function" ? WeakSet : Set, nu = null, ru = !1, iu = !1, au = !1, ou = !1;
	function su(e, t, n) {
		if (e = e.containerInfo, cp = _h, e = Rr(e), zr(e)) {
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
		for (lp = {
			focusedElem: e,
			selectionRange: r
		}, _h = !1, n = (n & 335544064) === n, nu = t, t = n ? 9270 : 1024; nu !== null;) {
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
							ff(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) rm(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								rm(r);
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
					n && r !== null && (n = si(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = li(a.default, a.update), a !== "none" && Rl(r, n, a, r.memoizedState = [], !0));
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
				Ou(e, n), r & 4 && ml(5, n);
				break;
			case 1:
				if (Ou(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						ff(n, n.return, e);
					}
					else {
						var i = mc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							ff(n, n.return, e);
						}
					}
				}
				r & 64 && gl(n), r & 512 && vl(n, n.return);
				break;
			case 3:
				if (Ou(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
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
			case 27: t === null && r & 4 && jl(n);
			case 26:
			case 5:
				Ou(e, n), t === null && r & 4 && Tl(n), r & 512 && vl(n, n.return);
				break;
			case 12:
				Ou(e, n);
				break;
			case 31:
				Ou(e, n), r & 4 && _u(e, n);
				break;
			case 13:
				Ou(e, n), r & 4 && vu(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = gf.bind(null, n), lm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Zl, !r) {
					var a = t !== null && t.memoizedState !== null || Ql;
					t = Zl, i = Ql, Zl = r, (Ql = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), Au(e, n, r)) : Ou(e, n), Zl = t, Ql = i;
				}
				break;
			case 30:
				Ou(e, n), r & 512 && vl(n, n.return);
				break;
			case 7: r & 512 && vl(n, n.return);
			default: Ou(e, n);
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
					ff(e, e.return, t);
				}
				fu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, It = !0;
				} catch (t) {
					ff(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? Tp(s, !0) : Tp(e.stateNode, !1);
				} catch (t) {
					ff(e, e.return, t);
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
		t !== null && (e.alternate = null, pu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && xt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var Q = null, mu = !1;
	function hu(e, t, n) {
		for (n = n.child; n !== null;) gu(e, t, n), n = n.sibling;
	}
	function gu(e, t, n) {
		if (Be && typeof Be.onCommitFiberUnmount == "function") try {
			Be.onCommitFiberUnmount(ze, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Ql || yl(n, t), hu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Ql && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Ql || yl(n, t), Sl(n);
				var r = Q, i = mu;
				Cp(n.type) && (Q = n.stateNode, mu = !1), hu(e, t, n), _m(n.stateNode, n.type, n.memoizedProps), Q = r, mu = i;
				break;
			case 5: Ql || yl(n, t), Sl(n);
			case 6:
				if (n.tag === 6 && Sl(n), r = Q, i = mu, Q = null, hu(e, t, n), Q = r, mu = i, Q !== null) {
					if (mu) try {
						(Q.nodeType === 9 ? Q.body : Q.nodeName === "HTML" ? Q.ownerDocument.body : Q).removeChild(n.stateNode), It = !0;
					} catch (e) {
						ff(n, t, e);
					}
					else try {
						Q.removeChild(n.stateNode), It = !0;
					} catch (e) {
						ff(n, t, e);
					}
				}
				break;
			case 18:
				Q !== null && (mu ? (e = Q, wp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Uh(e)) : wp(Q, n.stateNode));
				break;
			case 4:
				r = Q, i = mu, Q = n.stateNode.containerInfo, mu = !0, hu(e, t, n), Q = r, mu = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				hl(2, n, t), Ql || hl(4, n, t), hu(e, t, n);
				break;
			case 1:
				Ql || (yl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && _l(n, t, r)), hu(e, t, n);
				break;
			case 21:
				hu(e, t, n);
				break;
			case 22:
				Ql = (r = Ql) || n.memoizedState !== null, hu(e, t, n), Ql = r;
				break;
			case 30:
				yl(n, t), hu(e, t, n);
				break;
			case 7:
				Ql || yl(n, t), hu(e, t, n);
				break;
			default: hu(e, t, n);
		}
	}
	function _u(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Uh(e);
			} catch (e) {
				ff(t, t.return, e);
			}
		}
	}
	function vu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Uh(e);
		} catch (e) {
			ff(t, t.return, e);
		}
	}
	function yu(e) {
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
	function bu(e, t) {
		var n = yu(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = _f.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function xu(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Cp(l.type)) {
							Q = l.stateNode, mu = !1;
							break a;
						}
						break;
					case 5:
						Q = l.stateNode, mu = !1;
						break a;
					case 3:
					case 4:
						Q = l.stateNode.containerInfo, mu = !0;
						break a;
				}
				l = l.return;
			}
			if (Q === null) throw Error(i(160));
			gu(s, c, o), Q = null, mu = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Cu(t, e, n), t = t.sibling;
	}
	var Su = null;
	function Cu(e, t, n) {
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
				xu(t, e, n), wu(e), a & 4 && (hl(3, e, e.return), ml(3, e), hl(5, e, e.return));
				break;
			case 1:
				xu(t, e, n), wu(e), a & 512 && (Ql || r === null || yl(r, r.return)), a & 64 && Zl && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = Su, xu(t, e, n), wu(e), a & 512 && (Ql || r === null || yl(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (Zl) e.stateNode = pp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[yt] || r[ft] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), rp(r, t, n), r[ft] = e, Et(r), t = r;
												break a;
											case "link":
												if (o = Km("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), rp(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = Km("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), rp(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[ft] = e, Et(r), t = r;
									}
									e.stateNode = t;
								}
							} else Zl || qm(o, e.type, e.stateNode);
						} else e.stateNode = Vm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && El(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || Ql || t.parentNode.removeChild(t)) : a.count--, n === null ? Zl || qm(o, e.type, e.stateNode) : Vm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				xu(t, e, n), wu(e), a & 512 && (Ql || r === null || yl(r, r.return)), r !== null && a & 4 && El(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = $l, $l = !1, xu(t, e, n), $l = o, wu(e), a & 512 && (Ql || r === null || yl(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						en(t, ""), It = !0;
					} catch (t) {
						ff(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, El(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (eu = !0);
				break;
			case 6:
				if (xu(t, e, n), wu(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, It = !0;
					} catch (t) {
						ff(e, e.return, t);
					}
				}
				break;
			case 3:
				if (It = !1, Gm = null, o = Su, Su = xm(t.containerInfo), xu(t, e, n), Su = o, wu(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Uh(t.containerInfo);
				} catch (t) {
					ff(e, e.return, t);
				}
				eu && (eu = !1, Tu(e)), It = !1;
				break;
			case 4:
				a = $l, $l = Zl, r = Lt(), o = Su, Su = xm(e.stateNode.containerInfo), xu(t, e, n), wu(e), Su = o, It && iu && (au = !0), It = r, $l = a;
				break;
			case 12:
				xu(t, e, n), wu(e);
				break;
			case 31:
				xu(t, e, n), wu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, bu(e, t)));
				break;
			case 13:
				xu(t, e, n), wu(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (fd = Ae()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, bu(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = Zl, l = Ql, u = $l;
				Zl = c || o, $l = u || o, Ql = l || s, xu(t, e, n), Ql = l, $l = u, Zl = c, wu(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || Zl || Ql || (t = s || Ql, n = Zl, r = Ql, Zl = o || Zl, Ql = t, ku(e, 2), Zl = n, Ql = r), !o && $l || uu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, bu(e, n))));
				break;
			case 19:
				xu(t, e, n), wu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, bu(e, t)));
				break;
			case 30:
				a & 512 && (Ql || r === null || yl(r, r.return)), a = Lt(), o = iu, s = (n & 335544064) === n, c = e.memoizedProps, iu = s && li(c.default, c.update) !== "none", xu(t, e, n), wu(e), s && r !== null && It && (e.flags |= 4), iu = o, It = a;
				break;
			case 21: break;
			case 7: a & 512 && (Ql || r === null || yl(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: xu(t, e, n), wu(e);
		}
	}
	function wu(e) {
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
						n.flags & 32 && (en(l, ""), n.flags &= -33), Al(e, Ol(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						kl(e, Ol(e), u, s);
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
	function Tu(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Tu(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, _h = !0, t.reset(), _h = !1), e = e.sibling;
		}
	}
	function Eu(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Du(t, e), t = t.sibling;
		else Xl(t, !1);
	}
	function Du(e, t) {
		var n = e.alternate;
		if (n === null) Hl(e, !1);
		else switch (e.tag) {
			case 3:
				if (ou = ru = !1, Il(), Eu(t, e), !ru && !au) {
					if (e = Fl, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Dp(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
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
				Eu(t, e);
				break;
			case 4:
				r = ru, ru = !1, Eu(t, e), ru && (au = !0), ru = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? Eu(t, e) : Hl(e, !1));
				break;
			case 30:
				r = ru, i = Il(), ru = !1, Eu(t, e), ru && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = si(a, o), o = si(n.memoizedProps, o);
				var s = li(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, Ll = 0, t = Yl(e, n, t, o, s, a, !0), Ll !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (jd(e, e.memoizedProps.onUpdate), Fl = i) : i !== null && (i.push.apply(i, Fl), Fl = i), ru = e.flags & 32 ? !0 : r;
				break;
			default: Eu(t, e);
		}
	}
	function Ou(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) lu(e, t.alternate, t), t = t.sibling;
	}
	function ku(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					hl(4, n, n.return), ku(n, r);
					break;
				case 1:
					yl(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && _l(n, n.return, i), ku(n, r);
					break;
				case 27: r & 2 && _m(n.stateNode, n.type, n.memoizedProps);
				case 5:
					yl(n, n.return), n.tag !== 5 && n.tag !== 27 || Sl(n), ku(n, r);
					break;
				case 6:
					Sl(n);
					break;
				case 26:
					yl(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || Ql || i.parentNode.removeChild(i), ku(n, r);
					break;
				case 22:
					n.memoizedState === null && ku(n, r);
					break;
				case 30:
					yl(n, n.return), ku(n, r);
					break;
				case 7: yl(n, n.return);
				default: ku(n, r);
			}
			e = e.sibling;
		}
	}
	function Au(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Au(i, a, n), ml(4, a);
					break;
				case 1:
					if (Au(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
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
					s && o & 64 && gl(a), vl(a, a.return);
					break;
				case 27: n & 2 && jl(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || xl(a), Au(i, a, n), s && r === null && o & 4 && Tl(a), vl(a, a.return);
					break;
				case 6:
					xl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || Zl || qm(xm(c.ownerDocument), a.type, c), Au(i, a, n), s && r === null && o & 4 && Tl(a), vl(a, a.return);
					break;
				case 12:
					Au(i, a, n);
					break;
				case 31:
					Au(i, a, n), s && o & 4 && _u(i, a);
					break;
				case 13:
					Au(i, a, n), s && o & 4 && vu(i, a);
					break;
				case 22:
					a.memoizedState === null && Au(i, a, n), vl(a, a.return);
					break;
				case 30:
					Au(i, a, n), vl(a, a.return);
					break;
				case 7: vl(a, a.return);
				default: Au(i, a, n);
			}
			t = t.sibling;
		}
	}
	function ju(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Ca(n));
	}
	function Mu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ca(e));
	}
	function Nu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Pu(e, t, n, r), t = t.sibling;
		else i && Jl(t);
	}
	function Pu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && ql(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Nu(e, t, n, r), a & 2048 && ml(9, t);
				break;
			case 1:
				Nu(e, t, n, r);
				break;
			case 3:
				Nu(e, t, n, r), i && ou && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Ca(a)));
				break;
			case 12:
				if (a & 2048) {
					Nu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						ff(t, t.return, e);
					}
				} else Nu(e, t, n, r);
				break;
			case 31:
				Nu(e, t, n, r);
				break;
			case 13:
				Nu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && ql(t), o._visibility & 2 ? Nu(e, t, n, r) : (o._visibility |= 2, Fu(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && ql(s), o._visibility & 2 ? Nu(e, t, n, r) : Iu(e, t)), a & 2048 && ju(s, t);
				break;
			case 24:
				Nu(e, t, n, r), a & 2048 && Mu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Bl(a.child, !0), Bl(t.child, !0))), Nu(e, t, n, r);
				break;
			default: Nu(e, t, n, r);
		}
	}
	function Fu(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Fu(a, o, s, c, i), ml(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Fu(a, o, s, c, i)) : u._visibility & 2 ? Fu(a, o, s, c, i) : Iu(a, o), i && l & 2048 && ju(o.alternate, o);
					break;
				case 24:
					Fu(a, o, s, c, i), i && l & 2048 && Mu(o.alternate, o);
					break;
				default: Fu(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Iu(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Iu(n, r), i & 2048 && ju(r.alternate, r);
					break;
				case 24:
					Iu(n, r), i & 2048 && Mu(r.alternate, r);
					break;
				default: Iu(n, r);
			}
			t = t.sibling;
		}
	}
	var Lu = 8192;
	function Ru(e, t, n) {
		if (e.subtreeFlags & Lu) for (e = e.child; e !== null;) zu(e, t, n), e = e.sibling;
	}
	function zu(e, t, n) {
		switch (e.tag) {
			case 26:
				Ru(e, t, n), e.flags & Lu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Qm(n, e)) : $m(n, Su, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Ru(e, t, n), e.flags & Lu && (e = e.stateNode, (t & 335544128) === t && Qm(n, e));
				break;
			case 3:
			case 4:
				var r = Su;
				Su = xm(e.stateNode.containerInfo), Ru(e, t, n), Su = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Lu, Lu = 16777216, Ru(e, t, n), Lu = r) : Ru(e, t, n));
				break;
			case 30:
				if ((e.flags & Lu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Nl === null && (Nl = /* @__PURE__ */ new Map()), Nl.set(r, i);
				}
				Ru(e, t, n);
				break;
			default: Ru(e, t, n);
		}
	}
	function Bu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Vu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				nu = r, Wu(r, e);
			}
			Bu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Hu(e), e = e.sibling;
	}
	function Hu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Vu(e), e.flags & 2048 && hl(9, e, e.return);
				break;
			case 3:
				Vu(e);
				break;
			case 12:
				Vu(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Uu(e)) : Vu(e);
				break;
			default: Vu(e);
		}
	}
	function Uu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				nu = r, Wu(r, e);
			}
			Bu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					hl(8, t, t.return), Uu(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Uu(t));
					break;
				default: Uu(t);
			}
			e = e.sibling;
		}
	}
	function Wu(e, t) {
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
				case 24: Ca(n.memoizedState.cache);
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
	var Gu = {
		getCacheForType: function(e) {
			var t = ha(xa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ha(xa).controller.signal;
		}
	}, Ku = typeof WeakMap == "function" ? WeakMap : Map, qu = 0, Ju = null, Yu = null, Xu = 0, Zu = 0, Qu = null, $u = !1, ed = !1, td = !1, nd = 0, rd = 0, id = 0, ad = 0, od = 0, sd = 0, cd = 0, ld = null, ud = null, dd = !1, fd = 0, pd = 0, md = Infinity, hd = null, gd = null, _d = 0, vd = null, yd = null, bd = 0, xd = 0, Sd = null, Cd = null, wd = null, Td = null, Ed = null, Dd = 0, Od = null;
	function kd() {
		return qu & 2 && Xu !== 0 ? Xu & -Xu : G.T === null ? lt() : Nf();
	}
	function Ad() {
		if (sd === 0) {
			if (!(Xu & 536870912) || Ji) {
				var e = qe;
				qe <<= 1, !(qe & 3932160) && (qe = 262144), sd = e;
			} else sd = 536870912;
		}
		return e = xo.current, e !== null && (e.flags |= 32), sd;
	}
	function jd(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Fp(si(e.memoizedProps, n))), Td === null && (Td = []), Td.push(t.bind(null, r));
		}
	}
	function Md(e, t, n) {
		(e === Ju && (Zu === 2 || Zu === 9) || e.cancelPendingCommit !== null) && (zd(e, 0), Id(e, Xu, sd, !1)), nt(e, n), qu & 2 && e === Ju || (e === Ju && (!(qu & 2) && (ad |= n), rd === 4 && Id(e, Xu, sd, !1)), Tf(e));
	}
	function Nd(e, t, n) {
		if (qu & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Ze(e, t), a = r ? qd(e, t) : Gd(e, t, !0), o = r;
		do {
			if (a === 0) {
				ed && !r && Id(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Fd(n)) a = Gd(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = ld;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (zd(c, s).flags |= 256), s = Gd(c, s, !1), s !== 2 && s !== 6) {
								if (td && !l) {
									c.errorRecoveryDisabledLanes |= o, ad |= o, a = 4;
									break a;
								}
								o = ud, ud = a, o !== null && (ud === null ? ud = o : ud.push.apply(ud, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					zd(e, 0), Id(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Id(r, t, sd, !$u);
							break a;
						case 2:
							ud = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = fd + 300 - Ae(), 10 < a)) {
						if (Id(r, t, sd, !$u), Xe(r, 0, !0) !== 0) break a;
						bd = t, r.timeoutHandle = _p(Pd.bind(null, r, n, ud, hd, dd, t, sd, ad, cd, $u, o, "Throttled", -0, 0), a);
						break a;
					}
					Pd(r, n, ud, hd, dd, t, sd, ad, cd, $u, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		Tf(e);
	}
	function Pd(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
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
			unsuspend: ln
		}, Nl = null, zu(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = rh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? fd - Ae() : (a & 4194048) === a ? pd - Ae() : 0, m = th(d, m), m !== null) ? (bd = a, e.cancelPendingCommit = m(ef.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Id(e, a, o, !l)) : ef(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Fd(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Mr(a(), i)) return !1;
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
	function Id(e, t, n, r) {
		t = Qe(e, t), t &= ~od, t &= ~ad, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - He(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && it(e, n, t);
	}
	function Ld() {
		return qu & 6 ? !0 : (Ef(0, !1), !1);
	}
	function Rd() {
		if (Yu !== null) {
			if (Zu === 0) var e = Yu.return;
			else e = Yu, sa = oa = null, Zo(e), Ya = null, Xa = 0, e = Yu;
			for (; e !== null;) pl(e.alternate, e), e = e.return;
			Yu = null;
		}
	}
	function zd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, vp(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), bd = 0, Rd(), Ju = e, Yu = n = Ci(e.current, null), Xu = t, Zu = 0, Qu = null, $u = !1, ed = Ze(e, t), td = !1, cd = sd = od = ad = id = rd = 0, ud = ld = null, dd = !1, nd = Qe(e, t), pi(), n;
	}
	function Bd(e, t) {
		No = null, G.H = oc, t === za || t === Va ? (t = qa(), Zu = 3) : t === Ba ? (t = qa(), Zu = 4) : Zu = t === wc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Qu = t, Yu === null && (rd = 1, vc(e, ji(t, e.current)));
	}
	function Vd() {
		var e = xo.current;
		return e === null ? !0 : (Xu & 4194048) === Xu ? So === null : (Xu & 62914560) === Xu || Xu & 536870912 ? e === So : !1;
	}
	function Hd() {
		var e = G.H;
		return G.H = oc, e === null ? oc : e;
	}
	function Ud() {
		var e = G.A;
		return G.A = Gu, e;
	}
	function Wd() {
		rd = 4, $u || (Xu & 4194048) !== Xu && xo.current !== null || (ed = !0), !(id & 134217727) && !(ad & 134217727) || Ju === null || Id(Ju, Xu, sd, !1);
	}
	function Gd(e, t, n) {
		var r = qu;
		qu |= 2;
		var i = Hd(), a = Ud();
		(Ju !== e || Xu !== t) && (hd = null, zd(e, t)), t = !1;
		var o = rd;
		a: do
			try {
				if (Zu !== 0 && Yu !== null) {
					var s = Yu, c = Qu;
					switch (Zu) {
						case 8:
							Rd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							xo.current === null && (t = !0);
							var l = Zu;
							if (Zu = 0, Qu = null, Zd(e, s, c, l), n && ed) {
								o = 0;
								break a;
							}
							break;
						default: l = Zu, Zu = 0, Qu = null, Zd(e, s, c, l);
					}
				}
				Kd(), o = rd;
				break;
			} catch (t) {
				Bd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, sa = oa = null, qu = r, G.H = i, G.A = a, Yu === null && (Ju = null, Xu = 0, pi()), o;
	}
	function Kd() {
		for (; Yu !== null;) Yd(Yu);
	}
	function qd(e, t) {
		var n = qu;
		qu |= 2;
		var r = Hd(), a = Ud();
		Ju !== e || Xu !== t ? (hd = null, md = Ae() + 500, zd(e, t)) : ed = Ze(e, t);
		a: do
			try {
				if (Zu !== 0 && Yu !== null) {
					t = Yu;
					var o = Qu;
					b: switch (Zu) {
						case 1:
							Zu = 0, Qu = null, Zd(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Ua(o)) {
								Zu = 0, Qu = null, Xd(t);
								break;
							}
							t = function() {
								Zu !== 2 && Zu !== 9 || Ju !== e || (Zu = 7), Tf(e);
							}, o.then(t, t);
							break a;
						case 3:
							Zu = 7;
							break a;
						case 4:
							Zu = 5;
							break a;
						case 7:
							Ua(o) ? (Zu = 0, Qu = null, Xd(t)) : (Zu = 0, Qu = null, Zd(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Yu.tag) {
								case 26: s = Yu.memoizedState;
								case 5:
								case 27:
									var c = Yu;
									if (s ? Xm(s) : c.stateNode.complete) {
										Zu = 0, Qu = null;
										var l = c.sibling;
										if (l !== null) Yu = l;
										else {
											var u = c.return;
											u === null ? Yu = null : (Yu = u, Qd(u));
										}
										break b;
									}
							}
							Zu = 0, Qu = null, Zd(e, t, o, 5);
							break;
						case 6:
							Zu = 0, Qu = null, Zd(e, t, o, 6);
							break;
						case 8:
							Rd(), rd = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Jd();
				break;
			} catch (t) {
				Bd(e, t);
			}
		while (1);
		return sa = oa = null, G.H = r, G.A = a, qu = n, Yu === null ? (Ju = null, Xu = 0, pi(), rd) : 0;
	}
	function Jd() {
		for (; Yu !== null && !Oe();) Yd(Yu);
	}
	function Yd(e) {
		var t = il(e.alternate, e, nd);
		e.memoizedProps = e.pendingProps, t === null ? Qd(e) : Yu = t;
	}
	function Xd(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Rc(n, t, t.pendingProps, t.type, void 0, Xu);
				break;
			case 11:
				t = Rc(n, t, t.pendingProps, t.type.render, t.ref, Xu);
				break;
			case 5:
				Zo(t);
				var r = t;
				r === Ki && (Ji ? (ea(r), r.tag === 5 && r.stateNode != null && (qi = r.stateNode)) : (ea(r), Ji = !0));
			default: pl(n, t), t = Yu = wi(t, nd), t = il(n, t, nd);
		}
		e.memoizedProps = e.pendingProps, t === null ? Qd(e) : Yu = t;
	}
	function Zd(e, t, n, r) {
		sa = oa = null, Zo(t), Ya = null, Xa = 0;
		var i = t.return;
		try {
			if (Cc(e, i, t, n, Xu)) {
				rd = 1, vc(e, ji(n, e.current)), Yu = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Yu = i, t;
			rd = 1, vc(e, ji(n, e.current)), Yu = null;
			return;
		}
		t.flags & 32768 ? (Ji || r === 1 ? e = !0 : ed || Xu & 536870912 ? e = !1 : ($u = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = xo.current, r !== null && r.tag === 13 && (r.flags |= 16384))), $d(t, e)) : Qd(t);
	}
	function Qd(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				$d(t, $u);
				return;
			}
			e = t.return;
			var n = dl(t.alternate, t, nd);
			if (n !== null) {
				Yu = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Yu = t;
				return;
			}
			Yu = t = e;
		} while (t !== null);
		rd === 0 && (rd = 5);
	}
	function $d(e, t) {
		do {
			var n = fl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Yu = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Yu = e;
				return;
			}
			Yu = e = n;
		} while (e !== null);
		rd = 6, Yu = null;
	}
	function ef(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			lf();
		while (_d !== 0);
		if (qu & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === Ju && (Yu = Ju = null, Xu = 0), yd = t, vd = e, bd = n, Sd = a, Cd = r, tf(e, t, n, s, c, l, f);
		}
	}
	function tf(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (xd = s, s |= fi, rt(e, n, s, r, i, a), Td = null, (n & 335544064) === n ? (Ed = Ea(e), r = 10262) : (Ed = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, vf(Pe, function() {
			return uf(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Ml = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = G.T, G.T = null, i = K.p, K.p = 2, a = qu, qu |= 4;
			try {
				su(e, t, n);
			} finally {
				qu = a, K.p = i, G.T = r;
			}
		}
		_d = 1, Ml ? wd = Np(o, e.containerInfo, Ed, af, of, rf, sf, uf, nf, null, null) : (af(), of(), sf());
	}
	function nf(e) {
		if (_d !== 0) {
			var t = vd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function rf() {
		_d === 3 && (_d = 0, Du(yd, vd), _d = 4);
	}
	function af() {
		if (_d === 1) {
			_d = 0;
			var e = vd, t = yd, n = bd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = G.T, G.T = null;
				var i = K.p;
				K.p = 2;
				var a = qu;
				qu |= 4;
				try {
					iu = au = !1, Cu(t, e, n), n = lp;
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
					_h = !!cp, lp = cp = null;
				} finally {
					qu = a, K.p = i, G.T = r;
				}
			}
			e.current = t, _d = 2;
		}
	}
	function of() {
		if (_d === 2) {
			_d = 0;
			var e = vd, t = yd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = G.T, G.T = null;
				var r = K.p;
				K.p = 2;
				var i = qu;
				qu |= 4;
				try {
					lu(e, t.alternate, t);
				} finally {
					qu = i, K.p = r, G.T = n;
				}
			}
			_d = 3;
		}
	}
	function sf() {
		if (_d === 4 || _d === 3) {
			_d = 0;
			var e = wd;
			wd = null, ke();
			var t = vd, n = yd, r = bd, i = Cd, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? _d = 5 : (_d = 0, yd = vd = null, cf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (gd = null), ct(r), n = n.stateNode, Be && typeof Be.onCommitFiberRoot == "function") try {
				Be.onCommitFiberRoot(ze, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = G.T, a = K.p, K.p = 2, G.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					G.T = n, K.p = a;
				}
			}
			if (i = Td, o = Ed, Ed = null, i !== null && (Td = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			bd & 3 && lf(), Tf(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Od ? Dd++ : (Dd = 0, Od = t) : (Dd = 0, Od = null), Ef(0, !1);
		}
	}
	function cf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ca(t)));
	}
	function lf() {
		return wd !== null && (wd.skipTransition(), wd = null), af(), of(), sf(), uf();
	}
	function uf() {
		if (_d !== 5) return !1;
		var e = vd, t = xd;
		xd = 0;
		var n = ct(bd), r = G.T, a = K.p;
		try {
			K.p = 32 > n ? 32 : n, G.T = null, n = Sd, Sd = null;
			var o = vd, s = bd;
			if (_d = 0, yd = vd = null, bd = 0, qu & 6) throw Error(i(331));
			var c = qu;
			if (qu |= 4, Hu(o.current), Pu(o, o.current, s, n), qu = c, Ef(0, !1), Be && typeof Be.onPostCommitFiberRoot == "function") try {
				Be.onPostCommitFiberRoot(ze, o);
			} catch {}
			return !0;
		} finally {
			K.p = a, G.T = r, cf(e, t);
		}
	}
	function df(e, t, n) {
		t = ji(n, t), t = bc(e.stateNode, t, 2), e = so(e, t, 2), e !== null && (nt(e, 2), Tf(e));
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
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (gd === null || !gd.has(r))) {
					e = ji(n, e), n = xc(2), r = so(t, n, 2), r !== null && (Sc(n, r, t, e), nt(r, 2), Tf(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function pf(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Ku();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (td = !0, i.add(n), e = mf.bind(null, e, t, n), t.then(e, e));
	}
	function mf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Ju === e && (Xu & n) === n && (rd === 4 || rd === 3 && (Xu & 62914560) === Xu && 300 > Ae() - fd ? qu & 2 ? od |= n : zd(e, 0) : od |= n, cd === Xu && (cd = 0)), Tf(e);
	}
	function hf(e, t) {
		t === 0 && (t = et()), e = gi(e, t), e !== null && (nt(e, t), Tf(e));
	}
	function gf(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), hf(e, n);
	}
	function _f(e, t) {
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
		r !== null && r.delete(t), hf(e, n);
	}
	function vf(e, t) {
		return Ee(e, t);
	}
	var yf = null, bf = null, xf = !1, Sf = !1, Cf = !1, wf = 0;
	function Tf(e) {
		e !== bf && e.next === null && (bf === null ? yf = bf = e : bf = bf.next = e), Sf = !0, xf || (xf = !0, Mf());
	}
	function Ef(e, t) {
		if (!Cf && Sf) {
			Cf = !0;
			do
				for (var n = !1, r = yf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - He(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, jf(r, a));
						} else a = Xu, a = Xe(r, r === Ju ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Ze(r, a) || (n = !0, jf(r, a));
					}
					r = r.next;
				}
			while (n);
			Cf = !1;
		}
	}
	function Df() {
		Of();
	}
	function Of() {
		Sf = xf = !1;
		var e = 0;
		wf !== 0 && gp() && (e = wf);
		for (var t = Ae(), n = null, r = yf; r !== null;) {
			var i = r.next, a = kf(r, t);
			a === 0 ? (r.next = null, n === null ? yf = i : n.next = i, i === null && (bf = n)) : (n = r, (e !== 0 || a & 3) && (Sf = !0)), r = i;
		}
		_d !== 0 && _d !== 5 || Ef(e, !1), wf !== 0 && (wf = 0);
	}
	function kf(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - He(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = $e(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Ju, n = Xu, n = Xe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Zu === 2 || Zu === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && De(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Ze(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && De(r), ct(n)) {
				case 2:
				case 8:
					n = Ne;
					break;
				case 32:
					n = Pe;
					break;
				case 268435456:
					n = Ie;
					break;
				default: n = Pe;
			}
			return r = Af.bind(null, e), n = Ee(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && De(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function Af(e, t) {
		if (_d !== 0 && _d !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (lf() && e.callbackNode !== n) return null;
		var r = Xu;
		return r = Xe(e, e === Ju ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Nd(e, r, t), kf(e, Ae()), e.callbackNode != null && e.callbackNode === n ? Af.bind(null, e) : null);
	}
	function jf(e, t) {
		if (lf()) return null;
		Nd(e, t, !0);
	}
	function Mf() {
		xp(function() {
			qu & 6 ? Ee(Me, Df) : Of();
		});
	}
	function Nf() {
		if (wf === 0) {
			var e = ka;
			e === 0 && (e = Ke, Ke <<= 1, !(Ke & 261888) && (Ke = 256)), wf = e;
		}
		return wf;
	}
	function Pf(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : cn(e);
	}
	function Ff(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Pf((i[pt] || null).action), o = r.submitter;
			o && (t = (t = o[pt] || null) ? Pf(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new An("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (wf !== 0) {
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
	for (var If = 0; If < q.length; If++) {
		var Lf = q[If];
		ai(Lf.toLowerCase(), "on" + (Lf[0].toUpperCase() + Lf.slice(1)));
	}
	ai(Zr, "onAnimationEnd"), ai(Qr, "onAnimationIteration"), ai($r, "onAnimationStart"), ai("dblclick", "onDoubleClick"), ai("focusin", "onFocus"), ai("focusout", "onBlur"), ai(ei, "onTransitionRun"), ai(ti, "onTransitionStart"), ai(ni, "onTransitionCancel"), ai(ri, "onTransitionEnd"), jt("onMouseEnter", ["mouseout", "mouseover"]), jt("onMouseLeave", ["mouseout", "mouseover"]), jt("onPointerEnter", ["pointerout", "pointerover"]), jt("onPointerLeave", ["pointerout", "pointerover"]), At("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), At("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), At("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), At("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), At("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), At("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Rf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), zf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Rf));
	function Bf(e, t) {
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
						ui(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ui(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Vf(e, t) {
		var n = t[ht];
		n === void 0 && (n = t[ht] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Gf(t, e, 2, !1), n.add(r));
	}
	function Hf(e, t, n) {
		var r = 0;
		t && (r |= 4), Gf(n, e, r, t);
	}
	var Uf = "_reactListening" + Math.random().toString(36).slice(2);
	function Wf(e) {
		if (!e[Uf]) {
			e[Uf] = !0, Ot.forEach(function(t) {
				t !== "selectionchange" && (zf.has(t) || Hf(t, !1, e), Hf(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Uf] || (t[Uf] = !0, Hf("selectionchange", !1, t));
		}
	}
	function Gf(e, t, n, r) {
		switch (wh(t)) {
			case 2:
				var i = vh;
				break;
			case 8:
				i = yh;
				break;
			default: i = bh;
		}
		n = i.bind(null, t, n, e), i = void 0, !yn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Kf(e, t, n, r, i) {
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
					if (s = St(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		gn(function() {
			var r = a, i = dn(n), s = [];
			a: {
				var c = ii.get(e);
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
						case Zr:
						case Qr:
						case $r:
							l = Bn;
							break;
						case ri:
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
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = _n(m, p), g != null && d.push(qf(m, g, h))), f) break;
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
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== un && (u = n.relatedTarget || n.fromElement) && (St(u) || u[mt])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? St(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Ln, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Yn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : wt(c), h = l == null ? u : wt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, St(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? w(c, l, Yf) : null, c !== null && Xf(s, u, c, d, !1), l !== null && f !== null && Xf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? wt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = br;
					else if (mr(c)) {
						if (xr) _ = Ar;
						else {
							_ = Or;
							var v = Dr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && an(r.elementType) && (_ = br) : _ = kr;
					if (_ &&= _(e, r)) {
						hr(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? wt(r) : window, e) {
					case "focusin":
						(mr(v) || v.contentEditable === "true") && (Vr = v, Hr = r, Ur = null);
						break;
					case "focusout":
						Ur = Hr = Vr = null;
						break;
					case "mousedown":
						Wr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Wr = !1, Gr(s, n, i);
						break;
					case "selectionchange": if (Br) break;
					case "keydown":
					case "keyup": Gr(s, n, i);
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
				b && (ar && n.locale !== "ko" && (ur || b !== "onCompositionStart" ? b === "onCompositionEnd" && ur && (y = wn()) : (xn = i, Sn = "value" in xn ? xn.value : xn.textContent, ur = !0)), v = Jf(r, b), 0 < v.length && (b = new Hn(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = lr(n), y !== null && (b.data = y)))), (y = ir ? dr(e, n) : fr(e, n)) && (b = Jf(r, "onBeforeInput"), 0 < b.length && (v = new Hn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), Ff(s, e, r, n, i);
			}
			Bf(s, t);
		});
	}
	function qf(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Jf(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = _n(e, n), i != null && r.unshift(qf(e, i, a)), i = _n(e, t), i != null && r.push(qf(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Yf(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Xf(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = _n(n, a), l != null && o.unshift(qf(n, l, c))) : i || (l = _n(n, a), l != null && o.push(qf(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Zf = /\r\n?/g, Qf = /\u0000|\uFFFD/g;
	function $f(e) {
		return (typeof e == "string" ? e : "" + e).replace(Zf, "\n").replace(Qf, "");
	}
	function ep(e, t) {
		return t = $f(t), $f(e) === t;
	}
	function tp(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || en(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && en(e, "" + r);
				else return;
				break;
			case "className":
				zt(e, "class", r);
				break;
			case "tabIndex":
				zt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				zt(e, n, r);
				break;
			case "style":
				rn(e, r, o);
				return;
			case "data": if (t !== "object") {
				zt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = cn(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && tp(e, t, "name", a.name, a, null), tp(e, t, "formEncType", a.formEncType, a, null), tp(e, t, "formMethod", a.formMethod, a, null), tp(e, t, "formTarget", a.formTarget, a, null)) : (tp(e, t, "encType", a.encType, a, null), tp(e, t, "method", a.method, a, null), tp(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = cn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = ln);
				return;
			case "onScroll":
				r != null && Vf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Vf("scrollend", e);
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
				n = cn(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				Vf("beforetoggle", e), Vf("toggle", e), Rt(e, "popover", r);
				break;
			case "xlinkActuate":
				Bt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Bt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Bt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Bt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Bt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Bt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Bt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Bt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Bt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Rt(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = on.get(n) || n, Rt(e, n, r);
			else return;
		}
		It = !0;
	}
	function np(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				rn(e, r, o);
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
				if (typeof r == "string") en(e, r);
				else if (typeof r == "number" || typeof r == "bigint") en(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && Vf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Vf("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = ln);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!kt.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[pt] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					It = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Rt(e, n, r);
				}
				return;
		}
		It = !0;
	}
	function rp(e, t, n) {
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
				Vf("error", e), Vf("load", e);
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
						default: tp(e, t, o, s, n, null);
					}
				}
				a && tp(e, t, "srcSet", n.srcSet, n, null), r && tp(e, t, "src", n.src, n, null);
				return;
			case "input":
				Vf("invalid", e);
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
						default: tp(e, t, r, d, n, null);
					}
				}
				Yt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Vf("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: tp(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Zt(e, !!r, n, !0) : Zt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Vf("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
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
					default: tp(e, t, s, c, n, null);
				}
				$t(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: tp(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Vf("beforetoggle", e), Vf("toggle", e), Vf("cancel", e), Vf("close", e);
				break;
			case "iframe":
			case "object":
				Vf("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Rf.length; r++) Vf(Rf[r], e);
				break;
			case "image":
				Vf("error", e), Vf("load", e);
				break;
			case "details":
				Vf("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Vf("error", e), Vf("load", e);
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
					default: tp(e, t, u, r, n, null);
				}
				return;
			default: if (an(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && np(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && tp(e, t, c, r, n, null));
	}
	var ip = {};
	function ap(e, t, n, r) {
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
						default: r.hasOwnProperty(m) || tp(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (It = !0), o = m;
							break;
						case "name":
							m !== f && (It = !0), a = m;
							break;
						case "checked":
							m !== f && (It = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (It = !0), d = m;
							break;
						case "value":
							m !== f && (It = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (It = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && tp(e, t, p, m, r, f);
					}
				}
				Jt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || tp(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (It = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (It = !0), c = o;
						break;
					case "multiple": o !== l && (It = !0), s = o;
					default: o !== l && tp(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Zt(e, !!n, n ? [] : "", !1) : Zt(e, !!n, t, !0)) : Zt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: tp(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (It = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (It = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && tp(e, t, s, a, r, o);
				}
				Qt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: tp(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (It = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: tp(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && tp(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: tp(e, t, u, p, r, m);
				}
				return;
			default: if (an(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && np(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || np(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && tp(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || tp(e, t, f, p, r, m);
	}
	function op(e) {
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
	function sp() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && op(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && op(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var cp = null, lp = null;
	function up(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function dp(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function fp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function pp(e, t, n, r) {
		return n = up(n).createElement(e), n[ft] = r, n[pt] = t, rp(n, e, t), Et(n), n;
	}
	function mp(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var hp = null;
	function gp() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== hp && (hp = e, !0) : (hp = null, !1);
	}
	var _p = typeof setTimeout == "function" ? setTimeout : void 0, vp = typeof clearTimeout == "function" ? clearTimeout : void 0, yp = typeof Promise == "function" ? Promise : void 0, bp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : _p, xp = typeof queueMicrotask == "function" ? queueMicrotask : yp === void 0 ? _p : function(e) {
		return yp.resolve(null).then(e).catch(Sp);
	};
	function Sp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Cp(e) {
		return e === "head";
	}
	function wp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Uh(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") vm(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, vm(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[yt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && vm(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Uh(t);
	}
	function Tp(e, t) {
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
	function Ep(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Dp(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function Op(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function kp(e) {
		return Op(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function Ap(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return Op(t, n, e);
	}
	function jp(e) {
		return e.documentElement.clientHeight;
	}
	function Mp(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Np(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (jp(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += Zm(f), u > eh) {
									s.length = o;
									break;
								}
								f = new Promise(Mp.bind(f)), s.push(f);
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
	function Pp(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Pp.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : T({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Pp.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Pp.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Fp(e) {
		return {
			name: e,
			group: new Pp("group", e),
			imagePair: new Pp("image-pair", e),
			old: new Pp("old", e),
			new: new Pp("new", e)
		};
	}
	function Ip(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Ip.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (Vp(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = zp(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), f(this._fragmentFiber.child, !1, Lp, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Lp(e, t, n, r) {
		return _(e).addEventListener(t, n, r), !1;
	}
	Ip.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Vp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = zp(i.optionsOrUseCapture), f(this._fragmentFiber.child, !1, Rp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Rp(e, t, n, r) {
		return _(e).removeEventListener(t, n, r), !1;
	}
	function zp(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function Bp(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function Vp(e, t, n, r) {
		if (e.length === 0) return -1;
		r = Bp(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && Bp(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Ip.prototype.dispatchEvent = function(e) {
		var t = p(this._fragmentFiber);
		if (t === null) return !0;
		t = _(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, zp(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, zp(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Ip.prototype.focus = function(e) {
		f(this._fragmentFiber.child, !0, Hp, e, void 0, void 0);
	};
	function Hp(e, t) {
		return e.tag !== 6 && (e = _(e), mm(e, t));
	}
	Ip.prototype.focusLast = function(e) {
		var t = [];
		f(this._fragmentFiber.child, !0, Up, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Hp(t[n], e); n--);
	};
	function Up(e, t) {
		return t.push(e), !1;
	}
	Ip.prototype.blur = function() {
		var e = p(this._fragmentFiber);
		e !== null && (e = _(e), e = up(e).activeElement, e !== null && f(this._fragmentFiber.child, !1, Wp, e, void 0, void 0));
	};
	function Wp(e, t) {
		return e.tag !== 6 && (e = _(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Ip.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), f(this._fragmentFiber.child, !1, Gp, e, void 0, void 0);
	};
	function Gp(e, t) {
		return e.tag === 6 || (e = _(e), t.observe(e)), !1;
	}
	Ip.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), f(this._fragmentFiber.child, !1, Kp, e, void 0, void 0);
			for (var n = t = 0; n < qp.length; n++) {
				var r = qp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : qp[t++] = r;
			}
			qp.length = t;
		}
	};
	function Kp(e, t) {
		return e.tag === 6 || (e = _(e), t.unobserve(e)), !1;
	}
	var qp = [], Jp = !1;
	function Yp(e, t, n) {
		qp.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), Jp || (Jp = !0, hm(function() {
			Jp = !1;
			var e = qp;
			qp = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Ip.prototype.getClientRects = function() {
		var e = [];
		return f(this._fragmentFiber.child, !1, Xp, e, void 0, void 0), e;
	};
	function Xp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = _(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Ip.prototype.getRootNode = function(e) {
		var t = p(this._fragmentFiber);
		return t === null ? this : _(t).getRootNode(e);
	}, Ip.prototype.compareDocumentPosition = function(e) {
		var t = p(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		f(this._fragmentFiber.child, !1, Up, n, void 0, void 0);
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
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Zp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Zp(e, t, n, r, i) {
		var a = St(i);
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
	function Qp(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Ip.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		f(this._fragmentFiber.child, !1, Up, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = h(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || p(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = _(r), Qp(e, n);
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
			a.tag === 6 ? (a = _(a), Qp(a, n)) : _(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function $p(e, t) {
		return e = _(e), em(e, t), !1;
	}
	function em(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function tm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, zp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < qp.length; i++) {
				var a = qp[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (qp[r++] = a);
			}
			qp.length = r, n.observe(e);
		}), em(e, t));
	}
	function nm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, zp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? Yp(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function rm(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					rm(n), xt(n);
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
			} else if (!e[yt]) switch (t) {
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
		bp(function() {
			bp(function(t) {
				return e(t);
			});
		});
	}
	function gm(e, t, n) {
		switch (t = up(n), e) {
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
			n.hasOwnProperty(r) && i != null && tp(e, t, r, null, ip, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === ln && (e.onclick = null), xt(e);
	}
	function vm(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		xt(e);
	}
	var ym = /* @__PURE__ */ new Map(), bm = /* @__PURE__ */ new Set();
	function xm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var Sm = K.d;
	K.d = {
		f: Cm,
		r: wm,
		D: Dm,
		C: Om,
		L: km,
		m: Am,
		X: Mm,
		S: jm,
		M: Nm
	};
	function Cm() {
		var e = Sm.f(), t = Ld();
		return e || t;
	}
	function wm(e) {
		var t = Ct(e);
		t !== null && t.tag === 5 && t.type === "form" ? Js(t) : Sm.r(e);
	}
	var Tm = typeof document > "u" ? null : document;
	function Em(e, t, n) {
		var r = Tm;
		if (r && typeof t == "string" && t) {
			var i = qt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), bm.has(i) || (bm.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), rp(t, "link", e), Et(t), r.head.appendChild(t)));
		}
	}
	function Dm(e) {
		Sm.D(e), Em("dns-prefetch", e, null);
	}
	function Om(e, t) {
		Sm.C(e, t), Em("preconnect", e, t);
	}
	function km(e, t, n) {
		Sm.L(e, t, n);
		var r = Tm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + qt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + qt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + qt(n.imageSizes) + "\"]")) : i += "[href=\"" + qt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Fm(e);
					break;
				case "script": a = zm(e);
			}
			if (!(ym.has(a) || (e = T({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), ym.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Im(a)) || t === "script" && r.querySelector(Bm(a))))) {
				var o = r.createElement("link");
				rp(o, "link", e), t === "style" && (o[bt] = !0, o.onload = o.onerror = function() {
					Dt(o);
				}), Et(o), r.head.appendChild(o);
			}
		}
	}
	function Am(e, t) {
		Sm.m(e, t);
		var n = Tm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + qt(r) + "\"][href=\"" + qt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = zm(e);
			}
			if (!ym.has(a) && (e = T({
				rel: "modulepreload",
				href: e
			}, t), ym.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Bm(a))) return;
				}
				r = n.createElement("link"), rp(r, "link", e), Et(r), n.head.appendChild(r);
			}
		}
	}
	function jm(e, t, n) {
		Sm.S(e, t, n);
		var r = Tm;
		if (r && e) {
			var i = Tt(r).hoistableStyles, a = Fm(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Im(a))) s.loading = 5;
				else {
					e = T({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = ym.get(a)) && Um(e, n);
					var c = o = r.createElement("link");
					Et(c), rp(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Hm(o, t, r);
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
	function Mm(e, t) {
		Sm.X(e, t);
		var n = Tm;
		if (n && e) {
			var r = Tt(n).hoistableScripts, i = zm(e), a = r.get(i);
			a || (a = n.querySelector(Bm(i)), a || (e = T({
				src: e,
				async: !0
			}, t), (t = ym.get(i)) && Wm(e, t), a = n.createElement("script"), Et(a), rp(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nm(e, t) {
		Sm.M(e, t);
		var n = Tm;
		if (n && e) {
			var r = Tt(n).hoistableScripts, i = zm(e), a = r.get(i);
			a || (a = n.querySelector(Bm(i)), a || (e = T({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = ym.get(i)) && Wm(e, t), a = n.createElement("script"), Et(a), rp(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Pm(e, t, n, r) {
		var a = (a = fe.current) ? xm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Fm(n.href), t = Tt(a).hoistableStyles, r = t.get(n), r || (r = {
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
					e = Fm(n.href);
					var o = Tt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Im(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = ym.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, ym.set(e, o)), Rm(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = zm(n), t = Tt(a).hoistableScripts, r = t.get(n), r || (r = {
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
	function Fm(e) {
		return "href=\"" + qt(e) + "\"";
	}
	function Im(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Lm(e) {
		return T({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Rm(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[bt]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[bt] = !0, t.onload = t.onerror = Dt.bind(null, t), rp(t, "link", n), Et(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function zm(e) {
		return "[src=\"" + qt(e) + "\"]";
	}
	function Bm(e) {
		return "script[async]" + e;
	}
	function Vm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + qt(n.href) + "\"]");
				if (r) return t.instance = r, Et(r), r;
				var a = T({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Et(r), rp(r, "style", a), Hm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Fm(n.href);
				var o = e.querySelector(Im(a));
				if (o) return t.state.loading |= 4, t.instance = o, Et(o), o;
				r = Lm(n), (a = ym.get(a)) && Um(r, a), o = (e.ownerDocument || e).createElement("link"), Et(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), rp(o, "link", r), t.state.loading |= 4, Hm(o, n.precedence, e), t.instance = o;
			case "script": return o = zm(n.src), (a = e.querySelector(Bm(o))) ? (t.instance = a, Et(a), a) : (r = n, (a = ym.get(o)) && (r = T({}, n), Wm(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Et(a), rp(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Hm(r, n.precedence, e));
		return t.instance;
	}
	function Hm(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Um(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Wm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Gm = null;
	function Km(e, t, n) {
		if (Gm === null) {
			var r = /* @__PURE__ */ new Map(), i = Gm = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Gm, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[yt] || a[ft] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function qm(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Jm(e, t, n) {
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
	function Ym(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function Xm(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Zm(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function Qm(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Zm(t), e.suspenseyImages.push(t)), e = ih.bind(e), t.decode().then(e, e));
	}
	function $m(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Fm(r.href), a = t.querySelector(Im(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = rh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Et(a);
					return;
				}
				a = t.ownerDocument || t, r = Lm(r), (i = ym.get(i)) && Um(r, i), a = a.createElement("link"), Et(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), rp(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = rh.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var eh = 0;
	function th(e, t) {
		return e.stylesheets && e.count === 0 && oh(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && oh(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && eh === 0 && (eh = 62500 * sp());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && oh(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > eh ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function nh(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) oh(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function rh() {
		this.count--, nh(this);
	}
	function ih() {
		this.imgCount--, nh(this);
	}
	var ah = null;
	function oh(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ah = /* @__PURE__ */ new Map(), t.forEach(sh, e), ah = null, rh.call(e));
	}
	function sh(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ah.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ah.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = rh.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var ch = {
		$$typeof: N,
		Provider: null,
		Consumer: null,
		_currentValue: ie,
		_currentValue2: ie,
		_threadCount: 0
	};
	function lh(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = tt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = tt(0), this.hiddenUpdates = tt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function uh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new lh(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = xi(3, null, null, t), e.current = a, a.stateNode = e, t = Sa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, io(a), e;
	}
	function dh(e) {
		return e ? (e = yi, e) : yi;
	}
	function fh(e, t, n, r, i, a) {
		i = dh(i), r.context === null ? r.context = i : r.pendingContext = i, r = oo(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = so(e, r, t), n !== null && (Md(n, e, t), co(n, e, t));
	}
	function ph(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function mh(e, t) {
		ph(e, t), (e = e.alternate) && ph(e, t);
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = gi(e, 67108864);
			t !== null && Md(t, e, 67108864), mh(e, 67108864);
		}
	}
	function gh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = kd();
			t = st(t);
			var n = gi(e, t);
			n !== null && Md(n, e, t), mh(e, t);
		}
	}
	var _h = !0;
	function vh(e, t, n, r) {
		var i = G.T;
		G.T = null;
		var a = K.p;
		try {
			K.p = 2, bh(e, t, n, r);
		} finally {
			K.p = a, G.T = i;
		}
	}
	function yh(e, t, n, r) {
		var i = G.T;
		G.T = null;
		var a = K.p;
		try {
			K.p = 8, bh(e, t, n, r);
		} finally {
			K.p = a, G.T = i;
		}
	}
	function bh(e, t, n, r) {
		if (_h) {
			var i = xh(r);
			if (i === null) Kf(e, t, r, Sh, n), Nh(e, r);
			else if (Fh(i, e, t, n, r)) r.stopPropagation();
			else if (Nh(e, r), t & 4 && -1 < Mh.indexOf(e)) {
				for (; i !== null;) {
					var a = Ct(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ye(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - He(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									Tf(a), !(qu & 6) && (md = Ae() + 500, Ef(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = gi(a, 2), s !== null && Md(s, a, 2), Ld(), mh(a, 2);
					}
					if (a = xh(r), a === null && Kf(e, t, r, Sh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Kf(e, t, r, null, n);
		}
	}
	function xh(e) {
		return e = dn(e), Ch(e);
	}
	var Sh = null;
	function Ch(e) {
		if (Sh = null, e = St(e), e !== null) {
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
		return Sh = e, null;
	}
	function wh(e) {
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
			case "message": switch (je()) {
				case Me: return 2;
				case Ne: return 8;
				case Pe:
				case Fe: return 32;
				case Ie: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var Th = !1, Eh = null, Dh = null, Oh = null, kh = /* @__PURE__ */ new Map(), Ah = /* @__PURE__ */ new Map(), jh = [], Mh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Nh(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Eh = null;
				break;
			case "dragenter":
			case "dragleave":
				Dh = null;
				break;
			case "mouseover":
			case "mouseout":
				Oh = null;
				break;
			case "pointerover":
			case "pointerout":
				kh.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Ah.delete(t.pointerId);
		}
	}
	function Ph(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Ct(t), t !== null && hh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Fh(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Eh = Ph(Eh, e, t, n, r, i), !0;
			case "dragenter": return Dh = Ph(Dh, e, t, n, r, i), !0;
			case "mouseover": return Oh = Ph(Oh, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return kh.set(a, Ph(kh.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, Ah.set(a, Ph(Ah.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ih(e) {
		var t = St(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ut(e.priority, function() {
							gh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ut(e.priority, function() {
							gh(n);
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
	function Lh(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = xh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				un = r, n.target.dispatchEvent(r), un = null;
			} else return t = Ct(n), t !== null && hh(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Rh(e, t, n) {
		Lh(e) && n.delete(t);
	}
	function zh() {
		Th = !1, Eh !== null && Lh(Eh) && (Eh = null), Dh !== null && Lh(Dh) && (Dh = null), Oh !== null && Lh(Oh) && (Oh = null), kh.forEach(Rh), Ah.forEach(Rh);
	}
	function Bh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, Th || (Th = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, zh)));
	}
	var Vh = null;
	function Hh(e) {
		Vh !== e && (Vh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Vh === e && (Vh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Ch(r || n) === null) continue;
					break;
				}
				var a = Ct(n);
				a !== null && (e.splice(t, 3), t -= 3, Ks(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Uh(e) {
		function t(t) {
			return Bh(t, e);
		}
		Eh !== null && Bh(Eh, e), Dh !== null && Bh(Dh, e), Oh !== null && Bh(Oh, e), kh.forEach(t), Ah.forEach(t);
		for (var n = 0; n < jh.length; n++) {
			var r = jh[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < jh.length && (n = jh[0], n.blockedOn === null);) Ih(n), n.blockedOn === null && jh.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[pt] || null;
			if (typeof a == "function") o || Hh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[pt] || null) s = o.formAction;
					else if (Ch(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Hh(n);
			}
		}
	}
	function Wh() {
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
	function Gh(e) {
		this._internalRoot = e;
	}
	Kh.prototype.render = Gh.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		fh(n, kd(), e, t, null, null);
	}, Kh.prototype.unmount = Gh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			fh(e.current, 2, null, e, null, null), Ld(), t[mt] = null;
		}
	};
	function Kh(e) {
		this._internalRoot = e;
	}
	Kh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = lt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < jh.length && t !== 0 && t < jh[n].priority; n++);
			jh.splice(n, 0, e), n === 0 && Ih(e);
		}
	};
	var qh = n.version;
	if (qh !== "19.3.1") throw Error(i(527, qh, "19.3.1"));
	K.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : d(e), e = e === null ? null : e.stateNode, e;
	};
	var Jh = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: G,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Yh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Yh.isDisabled && Yh.supportsFiber) try {
			ze = Yh.inject(Jh), Be = Yh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = hc, s = gc, c = _c;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = uh(e, 1, !1, null, null, n, r, null, o, s, c, Wh), e[mt] = t.current, Wf(e), new Gh(t);
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
	let { invert: t, toast: n, unstyled: r, interacting: i, setHeights: a, visibleToasts: o, heights: s, index: c, toasts: l, expanded: u, removeToast: d, defaultRichColors: f, closeButton: p, style: m, cancelButtonStyle: h, actionButtonStyle: g, className: _ = "", descriptionClassName: v = "", duration: y, position: b, gap: x, expandByDefault: S, classNames: C, icons: w, closeButtonAriaLabel: T = "Close toast" } = e, [E, D] = Z.useState(null), [O, k] = Z.useState(null), [A, j] = Z.useState(!1), [M, N] = Z.useState(!1), [P, F] = Z.useState(!1), [I, L] = Z.useState(!1), [R, z] = Z.useState(!1), [B, V] = Z.useState(0), [H, ee] = Z.useState(0), te = Z.useRef(n.duration || y || $s), U = Z.useRef(null), ne = Z.useRef(null), W = c === 0, re = c + 1 <= o, G = n.type, K = G ?? "default", ie = n.dismissible !== !1, ae = n.className || "", oe = n.descriptionClassName || "", se = Z.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]), ce = Z.useMemo(() => n.closeButton ?? p, [n.closeButton, p]), le = Z.useMemo(() => n.duration || y || $s, [n.duration, y]), ue = Z.useRef(0), de = Z.useRef(0), fe = Z.useRef(0), pe = Z.useRef(null), [me, he] = b.split("-"), ge = Z.useMemo(() => s.reduce((e, t, n) => n >= se ? e : e + t.height, 0), [s, se]), _e = Vs(), ve = Z.useMemo(() => e.swipeDirections ?? ac(b), [e.swipeDirections, b]), ye = n.invert || t, be = G === "loading";
	de.current = Z.useMemo(() => se * x + ge, [se, ge]), Z.useEffect(() => {
		te.current = le;
	}, [le]), Z.useEffect(() => {
		j(!0);
	}, []), Z.useEffect(() => {
		let e = ne.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return ee(t), a((e) => [{
				toastId: n.id,
				height: t,
				position: n.position
			}, ...e]), () => a((e) => e.filter((e) => e.toastId !== n.id));
		}
	}, [a, n.id]), Z.useLayoutEffect(() => {
		if (!A) return;
		let e = ne.current, t = e.style.height;
		e.style.height = "auto";
		let r = e.getBoundingClientRect().height;
		e.style.height = t, ee(r), a((e) => e.find((e) => e.toastId === n.id) ? e.map((e) => e.toastId === n.id ? {
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
	let xe = Z.useCallback(() => {
		N(!0), V(de.current), a((e) => e.filter((e) => e.toastId !== n.id)), setTimeout(() => {
			d(n);
		}, rc);
	}, [
		n,
		d,
		a,
		de
	]);
	Z.useEffect(() => {
		if (n.promise && G === "loading" || n.duration === Infinity || n.type === "loading") return;
		let e;
		return u || i || _e ? (() => {
			if (fe.current < ue.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - ue.current;
				te.current -= e;
			}
			fe.current = (/* @__PURE__ */ new Date()).getTime();
		})() : te.current !== Infinity && (ue.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			n.onAutoClose == null || n.onAutoClose.call(n, n), xe();
		}, te.current)), () => clearTimeout(e);
	}, [
		u,
		i,
		n,
		G,
		_e,
		xe
	]), Z.useEffect(() => {
		n.delete && (xe(), n.onDismiss == null || n.onDismiss.call(n, n));
	}, [xe, n.delete]);
	function Se() {
		return w?.loading ? /*#__PURE__*/ Z.createElement("div", {
			className: ic(C?.loader, n?.classNames?.loader, "sonner-loader"),
			"data-visible": G === "loading"
		}, w.loading) : /*#__PURE__*/ Z.createElement(Fs, {
			className: ic(C?.loader, n?.classNames?.loader),
			visible: G === "loading"
		});
	}
	let Ce = n.icon || w?.[G] || Ns(G);
	return /*#__PURE__*/ Z.createElement("li", {
		tabIndex: 0,
		ref: ne,
		className: ic(_, ae, C?.toast, n?.classNames?.toast, C?.[K], n?.classNames?.[K]),
		"data-sonner-toast": "",
		"data-rich-colors": n.richColors ?? f,
		"data-styled": !(n.jsx || n.unstyled || r),
		"data-mounted": A,
		"data-promise": !!n.promise,
		"data-swiped": R,
		"data-removed": M,
		"data-visible": re,
		"data-y-position": me,
		"data-x-position": he,
		"data-index": c,
		"data-front": W,
		"data-swiping": P,
		"data-dismissible": ie,
		"data-type": G,
		"data-invert": ye,
		"data-swipe-out": I,
		"data-swipe-direction": O,
		"data-expanded": !!(u || S && A),
		"data-testid": n.testId,
		style: {
			"--index": c,
			"--toasts-before": c,
			"--z-index": l.length - c,
			"--offset": `${M ? B : de.current}px`,
			"--initial-height": S ? "auto" : `${H}px`,
			...m,
			...n.style
		},
		onDragEnd: () => {
			F(!1), D(null), pe.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && !be && ie && (U.current = /* @__PURE__ */ new Date(), V(de.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (F(!0), pe.current = {
				x: e.clientX,
				y: e.clientY
			}));
		},
		onPointerUp: () => {
			if (I || !ie) return;
			pe.current = null;
			let e = Number(ne.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(ne.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), r = (/* @__PURE__ */ new Date()).getTime() - U.current?.getTime(), i = E === "x" ? e : t, a = Math.abs(i) / r;
			if ((E === "x" ? ve.includes(e > 0 ? "right" : "left") : ve.includes(t > 0 ? "bottom" : "top")) && (Math.abs(i) >= nc || a > .11)) V(de.current), n.onDismiss == null || n.onDismiss.call(n, n), k(E === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), xe(), L(!0);
			else {
				var o, s;
				(o = ne.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = ne.current) == null || s.style.setProperty("--swipe-amount-y", "0px"), z(!1), F(!1), D(null);
			}
		},
		onPointerMove: (e) => {
			var t, n;
			if (!pe.current || !ie || window.getSelection()?.toString().length > 0) return;
			let r = e.clientY - pe.current.y, i = e.clientX - pe.current.x;
			!E && (Math.abs(i) > 1 || Math.abs(r) > 1) && D(Math.abs(i) > Math.abs(r) ? "x" : "y");
			let a = {
				x: 0,
				y: 0
			}, o = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (E === "y") {
				if (ve.includes("top") || ve.includes("bottom")) {
					if (ve.includes("top") && r < 0 || ve.includes("bottom") && r > 0) a.y = r;
					else {
						let e = r * o(r);
						a.y = Math.abs(e) < Math.abs(r) ? e : r;
					}
				}
			} else if (E === "x" && (ve.includes("left") || ve.includes("right"))) {
				if (ve.includes("left") && i < 0 || ve.includes("right") && i > 0) a.x = i;
				else {
					let e = i * o(i);
					a.x = Math.abs(e) < Math.abs(i) ? e : i;
				}
			}
			(Math.abs(a.x) > 0 || Math.abs(a.y) > 0) && z(!0), (t = ne.current) == null || t.style.setProperty("--swipe-amount-x", `${a.x}px`), (n = ne.current) == null || n.style.setProperty("--swipe-amount-y", `${a.y}px`);
		}
	}, ce && !n.jsx && G !== "loading" ? /*#__PURE__*/ Z.createElement("button", {
		"aria-label": T,
		"data-disabled": be,
		"data-close-button": !0,
		onClick: be || !ie ? () => {} : () => {
			xe(), n.onDismiss == null || n.onDismiss.call(n, n);
		},
		className: ic(C?.closeButton, n?.classNames?.closeButton)
	}, w?.close ?? Bs) : null, (G || n.icon || n.promise) && n.icon !== null && (w?.[G] !== null || n.icon) ? /*#__PURE__*/ Z.createElement("div", {
		"data-icon": "",
		className: ic(C?.icon, n?.classNames?.icon)
	}, G === "loading" ? n.icon || Se() : n.promise ? Se() : null, G === "loading" ? null : Ce) : null, /*#__PURE__*/ Z.createElement("div", {
		"data-content": "",
		className: ic(C?.content, n?.classNames?.content)
	}, /*#__PURE__*/ Z.createElement("div", {
		"data-title": "",
		className: ic(C?.title, n?.classNames?.title)
	}, n.jsx ? n.jsx : typeof n.title == "function" ? n.title() : n.title), n.description ? /*#__PURE__*/ Z.createElement("div", {
		"data-description": "",
		className: ic(v, oe, C?.description, n?.classNames?.description)
	}, typeof n.description == "function" ? n.description() : n.description) : null), /*#__PURE__*/ Z.isValidElement(n.cancel) ? n.cancel : n.cancel && Ys(n.cancel) ? /*#__PURE__*/ Z.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: n.cancelButtonStyle || h,
		onClick: (e) => {
			Ys(n.cancel) && ie && (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), xe());
		},
		className: ic(C?.cancelButton, n?.classNames?.cancelButton)
	}, n.cancel.label) : null, /*#__PURE__*/ Z.isValidElement(n.action) ? n.action : n.action && Ys(n.action) ? /*#__PURE__*/ Z.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: n.actionButtonStyle || g,
		onClick: (e) => {
			Ys(n.action) && (n.action.onClick == null || n.action.onClick.call(n.action, e), e.defaultPrevented || xe());
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
Tr();
var uc = ({ ...e }) => /* @__PURE__ */ (0, X.jsx)(lc, {
	theme: "dark",
	className: "toaster group",
	icons: {
		success: /* @__PURE__ */ (0, X.jsx)(je, { className: "size-4" }),
		info: /* @__PURE__ */ (0, X.jsx)(jt, { className: "size-4" }),
		warning: /* @__PURE__ */ (0, X.jsx)(dr, { className: "size-4" }),
		error: /* @__PURE__ */ (0, X.jsx)(an, { className: "size-4" }),
		loading: /* @__PURE__ */ (0, X.jsx)(Lt, { className: "size-4 animate-spin" })
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
	if (!e && t === void 0) throw Error(Mi(27));
	return t;
}
var fc, pc, mc = o((() => {
	Ni(), fc = /* @__PURE__ */ u(b(), 1), pc = /*#__PURE__*/ fc.createContext(void 0);
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
	zc = /* @__PURE__ */ u(b(), 1), mc(), Oa(), Rc(), Bc = /*#__PURE__*/ zc.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, forceRender: a = !1, ...o } = e, s = dc(), c = s.useState("open"), l = s.useState("nested"), u = s.useState("mounted");
		return ya("div", e, {
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
	Yi();
}));
// node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
function Uc(e, t, n, r) {
	let i = !1, a = !1, o = r ?? da;
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
	let r = n ?? da;
	return {
		reason: e,
		event: t ?? new Event("base-ui"),
		...r
	};
}
var Gc = o((() => {
	fa();
})), Kc, qc, Jc, Yc, Xc, Zc, Qc, $c, el, tl, nl, rl, il, al, ol, sl, cl, ll, ul, dl, fl, pl = o((() => {
	Kc = "none", qc = "trigger-press", Jc = "trigger-hover", Yc = "trigger-focus", Xc = "outside-press", Zc = "item-press", Qc = "close-press", $c = "focus-out", el = "escape-key", tl = "close-watcher", nl = "list-navigation", rl = "keyboard", il = "pointer", al = "cancel-open", ol = "sibling-open", sl = "disabled", cl = "missing", ll = "initial", ul = "imperative-action", dl = "swipe", fl = "window-resize";
})), ml = o((() => {
	pl();
})), hl, gl, _l = o((() => {
	hl = /* @__PURE__ */ u(b(), 1), mc(), Oa(), Hc(), Gc(), ml(), gl = /*#__PURE__*/ hl.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, ...s } = e, c = dc(), l = c.useState("open"), { getButtonProps: u, buttonRef: d } = Gi({
			disabled: a,
			native: o
		}), f = { disabled: a };
		function p(e) {
			l && c.setOpen(!1, Uc(Qc, e.nativeEvent));
		}
		return ya("button", e, {
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
function vl() {
	let [, e] = yl.useState({});
	return yl.useCallback(() => {
		e({});
	}, []);
}
var yl, bl = o((() => {
	yl = /* @__PURE__ */ u(b(), 1);
}));
// node_modules/@base-ui/utils/useId.mjs
function xl(e, t = "mui") {
	let n = Cl.useRef(void 0), r = vl(), i = e ?? n.current;
	return Cl.useEffect(() => {
		n.current ?? (wl += 1, n.current = `${t}-${wl}`, e ?? r());
	}, [
		e,
		t,
		r
	]), i;
}
function Sl(e, t) {
	if (Tl !== void 0) {
		let n = Tl();
		return e ?? (t ? `${t}-${n}` : n);
	}
	return xl(e, t);
}
var Cl, wl, Tl, El = o((() => {
	Cl = /* @__PURE__ */ u(b(), 1), ei(), bl(), wl = 0, Tl = $r.useId;
}));
// node_modules/@base-ui/react/internals/useBaseUiId.mjs
function Dl(e) {
	return Sl(e, "base-ui");
}
var Ol = o((() => {
	El();
})), kl, Al, jl = o((() => {
	kl = /* @__PURE__ */ u(b(), 1), mc(), Oa(), Ol(), Al = /*#__PURE__*/ kl.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, id: a, ...o } = e, s = dc(), c = Dl(a);
		return s.useSyncedValueWithCleanup("descriptionElementId", c), ya("p", e, {
			ref: t,
			props: [{ id: c }, o]
		});
	});
}));
// node_modules/@base-ui/utils/useOnMount.mjs
function Ml(e) {
	Nl.useEffect(e, ua);
}
var Nl, Pl = o((() => {
	Nl = /* @__PURE__ */ u(b(), 1), fa();
}));
// node_modules/@base-ui/utils/useTimeout.mjs
function Fl() {
	let e = ti(Ll.create).current;
	return Ml(e.disposeEffect), e;
}
var Il, Ll, Rl = o((() => {
	ii(), Pl(), Il = 0, Ll = class e {
		static create() {
			return new e();
		}
		currentId = Il;
		start(e, t) {
			this.clear(), this.currentId = setTimeout(() => {
				this.currentId = Il, t();
			}, e);
		}
		isStarted() {
			return this.currentId !== Il;
		}
		clear = () => {
			this.currentId !== Il && (clearTimeout(this.currentId), this.currentId = Il);
		};
		disposeEffect = () => this.clear;
	};
}));
// node_modules/@base-ui/utils/platform/shared.mjs
function zl() {
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
var Bl, Vl, Hl, Ul, Wl, Gl = o((() => {
	({userAgent: Bl, platform: Vl, maxTouchPoints: Hl} = zl()), Ul = Bl.toLowerCase(), Wl = Vl.toLowerCase();
})), Kl, ql, Jl, Yl, Xl, Zl = o((() => {
	Gl(), Kl = /^i(os$|p)/.test(Wl) || Wl === "macintel" && Hl > 1, ql = "android", Jl = Wl === ql || Ul.includes(ql), Yl = !Kl && Wl.startsWith("mac"), Wl.startsWith("win"), !Jl && /^(linux|chrome os)/.test(Wl), Xl = Yl || Kl;
})), Ql, $l = o((() => {
	Gl(), Ql = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none"), !Ql && Ul.includes("firefox"), !Ql && Ul.includes("chrom");
})), eu, tu = o((() => {
	Zl(), eu = Xl;
})), nu, ru = o((() => {
	Gl(), nu = /jsdom|happydom/.test(Ul);
})), iu = o((() => {
	Zl(), $l(), tu(), ru();
})), au = o((() => {
	iu();
}));
// node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function ou(e) {
	e.preventDefault(), e.stopPropagation();
}
function su(e) {
	return "nativeEvent" in e;
}
function cu(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : Jl && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function lu(e) {
	return nu ? !1 : !Jl && e.width === 0 && e.height === 0 || e.type === "pointerdown" && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" && (Jl || e.buttons === 0) || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
}
function uu(e, t) {
	let n = ["mouse", "pen"];
	return t || n.push("", void 0), n.includes(e);
}
function du(e) {
	let t = e.type;
	return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
var fu = o((() => {
	au();
}));
// node_modules/@base-ui/utils/shadowDom.mjs
function pu(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement != null;) t = t.shadowRoot.activeElement;
	return t;
}
function Q(e, t) {
	if (!e || !t) return !1;
	let n = t.getRootNode?.();
	if (e.contains(t)) return !0;
	if (n && Nr(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function mu(e, t) {
	let n = e;
	for (; n;) {
		if (jr(n) && n.matches(t)) return n;
		n = n.assignedSlot ?? n.parentNode ?? (Nr(n) ? n.host : null);
	}
	return null;
}
function hu(e) {
	return "composedPath" in e ? e.composedPath()[0] ?? e.target : e.target;
}
var gu = o((() => {
	Zr();
})), _u, vu, yu, bu, xu, Su, Cu = o((() => {
	_u = "data-base-ui-focusable", vu = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", yu = "ArrowLeft", bu = "ArrowRight", xu = "ArrowUp", Su = "ArrowDown";
})), wu, Tu = o((() => {
	Rc(), wu = "data-trigger-disabled";
}));
// node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function Eu(e, t) {
	if (!jr(e)) return !1;
	let n = e;
	if (t.hasElement(n)) return !n.hasAttribute(wu);
	for (let [, e] of t.entries()) if (Q(e, n)) return !e.hasAttribute(wu);
	return !1;
}
function Du(e, t) {
	if (t == null) return !1;
	if ("composedPath" in e) return e.composedPath().includes(t);
	let n = e;
	return n.target != null && t.contains(n.target);
}
function Ou(e) {
	return e.matches("html,body");
}
function ku(e) {
	return Mr(e) && e.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function Au(e) {
	return mu(e, `button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${vu}`) != null;
}
function ju(e) {
	return e ? e.getAttribute("role") === "combobox" && ku(e) : !1;
}
function Mu(e) {
	if (!e || nu) return !0;
	try {
		return e.matches(":focus-visible");
	} catch {
		return !0;
	}
}
function Nu(e) {
	return e ? e.hasAttribute("data-base-ui-focusable") ? e : e.querySelector("[data-base-ui-focusable]") || e : null;
}
var Pu = o((() => {
	Zr(), au(), gu(), Cu(), Tu();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverShared.mjs
function Fu(e, t) {
	return t != null && !uu(t) ? 0 : typeof e == "function" ? e() : e;
}
function Iu(e, t, n) {
	let r = Fu(e, n);
	return typeof r == "number" ? r : r?.[t];
}
function Lu(e) {
	return typeof e == "function" ? e() : e;
}
function Ru(e, t) {
	return t || e === "click" || e === "mousedown";
}
function zu(e) {
	return e?.includes("mouse") && e !== "mousedown";
}
var Bu = o((() => {
	fu(), Pu();
}));
// node_modules/@base-ui/react/floating-ui-react/components/FloatingDelayGroup.mjs
function Vu(e, t) {
	e.current = t.current;
}
function Hu(e) {
	let { children: t, delay: n, timeoutMs: r = 0 } = e, i = Wu.useRef(n), a = Wu.useRef(n), o = Wu.useRef(null), s = Wu.useRef(null), c = Fl();
	return J(() => {
		a.current = n, o.current ? i.current = {
			open: Iu(i.current, "open"),
			close: Iu(n, "close")
		} : i.current = n;
	}, [
		n,
		o,
		i,
		a
	]), /*#__PURE__*/ (0, Gu.jsx)(Ku.Provider, {
		value: Wu.useMemo(() => ({
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
function Uu(e, t = { open: !1 }) {
	let { open: n } = t, r = e.useState("floatingId"), { currentIdRef: i, delayRef: a, timeoutMs: o, initialDelayRef: s, currentContextRef: c, hasProvider: l, timeout: u } = Wu.useContext(Ku), [d, f] = Wu.useState(!1), p = Wu.useRef(n);
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
			close: Iu(s.current, "close")
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
	]), J(() => () => {
		if (i.current === r) {
			if (c.current = null, !p.current) return;
			i.current = null, Vu(a, s), u.clear();
		}
	}, [
		c,
		i,
		a,
		r,
		s,
		u
	]), Wu.useMemo(() => ({
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
var Wu, Gu, Ku, qu = o((() => {
	Wu = /* @__PURE__ */ u(b(), 1), Rl(), fi(), Bu(), Gc(), ml(), Gu = bs(), Ku = /*#__PURE__*/ Wu.createContext({
		hasProvider: !1,
		timeoutMs: 0,
		delayRef: { current: 0 },
		initialDelayRef: { current: 0 },
		timeout: new Ll(),
		currentIdRef: { current: null },
		currentContextRef: { current: null }
	});
}));
// node_modules/@base-ui/utils/addEventListener.mjs
function Ju(e, t, n, r) {
	return e.addEventListener(t, n, r), () => {
		e.removeEventListener(t, n, r);
	};
}
var Yu = o((() => {}));
// node_modules/@base-ui/utils/mergeCleanups.mjs
function Xu(...e) {
	return () => {
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			n && n();
		}
	};
}
var Zu = o((() => {}));
// node_modules/@base-ui/utils/useValueAsRef.mjs
function Qu(e) {
	let t = ti($u, e).current;
	return t.next = e, J(t.effect), t;
}
function $u(e) {
	let t = {
		current: e,
		next: e,
		effect: () => {
			t.current = t.next;
		}
	};
	return t;
}
var ed = o((() => {
	fi(), ii();
}));
// node_modules/@base-ui/utils/useAnimationFrame.mjs
function td() {
	let e = ti(ad.create).current;
	return Ml(e.disposeEffect), e;
}
var nd, rd, id, ad, od = o((() => {
	ii(), Pl(), nd = null, globalThis.requestAnimationFrame, rd = class {
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
	}, id = new rd(), ad = class e {
		static create() {
			return new e();
		}
		static request(e) {
			return id.request(e);
		}
		static cancel(e) {
			return id.cancel(e);
		}
		currentId = nd;
		request(e) {
			this.cancel(), this.currentId = id.request(() => {
				this.currentId = nd, e();
			});
		}
		cancel = () => {
			this.currentId !== nd && (id.cancel(this.currentId), this.currentId = nd);
		};
		disposeEffect = () => this.cancel;
	};
})), sd, cd, ld, ud = o((() => {
	sd = {
		clipPath: "inset(50%)",
		overflow: "hidden",
		whiteSpace: "nowrap",
		border: 0,
		padding: 0,
		width: 1,
		height: 1,
		margin: -1
	}, cd = {
		...sd,
		position: "fixed",
		margin: 0,
		top: 0,
		left: 0
	}, ld = {
		...sd,
		position: "absolute"
	};
})), dd, fd, pd, md = o((() => {
	dd = /* @__PURE__ */ u(b(), 1), fi(), au(), ud(), fd = bs(), pd = /*#__PURE__*/ dd.forwardRef(function(e, t) {
		let [n, r] = dd.useState();
		J(() => {
			eu && Ql && r("button");
		}, []);
		let i = {
			tabIndex: 0,
			role: n
		};
		return /*#__PURE__*/ (0, fd.jsx)("span", {
			...e,
			ref: t,
			style: cd,
			"aria-hidden": !n || void 0,
			...i,
			"data-base-ui-focus-guard": ""
		});
	});
}));
// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
function hd(e, t, n) {
	return Nd(e, Md(t, n));
}
function gd(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function _d(e) {
	return e.split("-")[0];
}
function vd(e) {
	return e.split("-")[1];
}
function yd(e) {
	return e === "x" ? "y" : "x";
}
function bd(e) {
	return e === "y" ? "height" : "width";
}
function xd(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Sd(e) {
	return yd(xd(e));
}
function Cd(e, t, n) {
	n === void 0 && (n = !1);
	let r = vd(e), i = Sd(e), a = bd(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Od(o)), [o, Od(o)];
}
function wd(e) {
	let t = Od(e);
	return [
		Td(e),
		t,
		Td(t)
	];
}
function Td(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
function Ed(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? zd : Rd : t ? Rd : zd;
		case "left":
		case "right": return t ? Bd : Vd;
		default: return [];
	}
}
function Dd(e, t, n, r) {
	let i = vd(e), a = Ed(_d(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Td)))), a;
}
function Od(e) {
	let t = _d(e);
	return Ld[t] + e.slice(t.length);
}
function kd(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Ad(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : kd(e);
}
function jd(e) {
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
var Md, Nd, Pd, Fd, Id, Ld, Rd, zd, Bd, Vd, Hd = o((() => {
	Md = Math.min, Nd = Math.max, Pd = Math.round, Fd = Math.floor, Id = (e) => ({
		x: e,
		y: e
	}), Ld = {
		left: "right",
		right: "left",
		bottom: "top",
		top: "bottom"
	}, Rd = ["left", "right"], zd = ["right", "left"], Bd = ["top", "bottom"], Vd = ["bottom", "top"];
}));
// node_modules/@base-ui/react/floating-ui-react/utils/composite.mjs
function Ud(e, t) {
	return t < 0 || t >= e.length;
}
function Wd(e, t) {
	return qd(e.current, { disabledIndices: t });
}
function Gd(e, t) {
	return qd(e.current, {
		decrement: !0,
		startingIndex: e.current.length,
		disabledIndices: t
	});
}
function Kd(e, t, n) {
	let { decrement: r, loopFocus: i, allowEscape: a, disabledIndices: o, minIndex: s, maxIndex: c } = n, l = () => qd(e, {
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
		index: Ud(e, u) ? -1 : u,
		wrapped: d
	};
}
function qd(e, { startingIndex: t = -1, decrement: n = !1, disabledIndices: r, amount: i = 1 } = {}) {
	let a = t;
	do
		a += n ? -i : i;
	while (a >= 0 && a <= e.length - 1 && Jd(e, a, r));
	return a;
}
function Jd(e, t, n) {
	if (typeof n == "function" ? n(t) : n?.includes(t) ?? !1) return !0;
	let r = e[t];
	return r ? !Xd(r) || r.matches(":disabled") ? !0 : !n && (r.hasAttribute("disabled") || r.getAttribute("aria-disabled") === "true") : !1;
}
function Yd(e) {
	return e.visibility === "hidden" || e.visibility === "collapse";
}
function Xd(e, t = e ? Vr(e) : null) {
	return !e || !e.isConnected || !t || Yd(t) ? !1 : typeof e.checkVisibility == "function" ? e.checkVisibility() : t.display !== "none" && t.display !== "contents";
}
var Zd = o((() => {
	Zr();
}));
// node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
function Qd(e) {
	let t = e.assignedSlot;
	if (t) return t;
	if (e.parentElement) return e.parentElement;
	let n = e.getRootNode();
	return Nr(n) ? n.host : null;
}
function $d(e) {
	for (let t of Array.from(e.children)) if (Dr(t) === "summary") return t;
	return null;
}
function ef(e, t) {
	let n = $d(t);
	return !!n && (e === n || Q(n, e));
}
function tf(e) {
	let t = e ? Dr(e) : "";
	return e != null && e.matches(xf) && (t !== "summary" || e.parentElement != null && Dr(e.parentElement) === "details" && $d(e.parentElement) === e) && (t !== "details" || $d(e) == null) && (t !== "input" || e.type !== "hidden");
}
function nf(e) {
	if (!tf(e) || !e.isConnected || e.matches(":disabled")) return !1;
	for (let t = e; t; t = Qd(t)) {
		let n = t !== e, r = Dr(t) === "slot";
		if (t.hasAttribute("inert") || n && Dr(t) === "details" && !t.open && !ef(e, t) || t.hasAttribute("hidden") || !r && !rf(t, n)) return !1;
	}
	return !0;
}
function rf(e, t) {
	let n = Vr(e);
	return t ? n.display !== "none" : Xd(e, n);
}
function af(e) {
	let t = e.tabIndex;
	if (t < 0) {
		let t = Dr(e);
		if (t === "details" || t === "audio" || t === "video" || Mr(e) && e.isContentEditable) return 0;
	}
	return t;
}
function of(e) {
	if (Dr(e) !== "input") return null;
	let t = e;
	return t.type === "radio" && t.name !== "" ? t : null;
}
function sf(e, t) {
	let n = of(e);
	if (!n) return !0;
	let r = t.find((e) => {
		let t = of(e);
		return t?.name === n.name && t.form === n.form && t.checked;
	});
	return r ? r === n : t.find((e) => {
		let t = of(e);
		return t?.name === n.name && t.form === n.form;
	}) === n;
}
function cf(e) {
	if (Mr(e) && Dr(e) === "slot") {
		let t = e.assignedElements({ flatten: !0 });
		if (t.length > 0) return t;
	}
	return Mr(e) && e.shadowRoot ? Array.from(e.shadowRoot.children) : Array.from(e.children);
}
function lf(e, t) {
	cf(e).forEach((e) => {
		tf(e) && t.push(e), lf(e, t);
	});
}
function uf(e, t, n) {
	cf(e).forEach((e) => {
		Mr(e) && e.matches(t) && n.push(e), uf(e, t, n);
	});
}
function df(e) {
	return nf(e) && af(e) >= 0;
}
function ff(e) {
	let t = [];
	return lf(e, t), t.filter(nf);
}
function pf(e) {
	let t = ff(e);
	return t.filter((e) => af(e) >= 0 && sf(e, t));
}
function mf(e, t) {
	let n = pf(e), r = n.length;
	if (r === 0) return;
	let i = pu(Vi(e)), a = n.indexOf(i);
	return n[a === -1 ? t === 1 ? 0 : r - 1 : a + t];
}
function hf(e) {
	return mf(Vi(e).body, 1) || e;
}
function gf(e) {
	return mf(Vi(e).body, -1) || e;
}
function _f(e, t, n) {
	if (!e) return null;
	let r = [];
	lf(Vi(e).body, r);
	let i = r.indexOf(e);
	if (i === -1) return null;
	let a = r.filter(nf);
	for (let e = 1; e < r.length; e += 1) {
		let o = r[(i + t * e + r.length) % r.length];
		if (!Q(n, o) && df(o) && sf(o, a)) return o;
	}
	return r[i];
}
function vf(e, t) {
	let n = t || e.currentTarget, r = e.relatedTarget;
	return !r || !Q(n, r);
}
function yf(e) {
	pf(e).forEach((e) => {
		e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
	});
}
function bf(e) {
	let t = [];
	uf(e, "[data-tabindex]", t), t.forEach((e) => {
		let t = e.dataset.tabindex;
		delete e.dataset.tabindex, t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex");
	});
}
var xf, Sf = o((() => {
	Zr(), Hi(), Pu(), Zd(), xf = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
}));
// node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function Cf(e, t, n = !0) {
	return e.filter((e) => e.parentId === t).flatMap((t) => [...!n || t.context?.open ? [t] : [], ...Cf(e, t.id, n)]);
}
function wf(e, t) {
	let n = [], r = e.find((e) => e.id === t)?.parentId;
	for (; r;) {
		let t = e.find((e) => e.id === r);
		r = t?.parentId, t && (n = n.concat(t));
	}
	return n;
}
var Tf = o((() => {}));
// node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function Ef(e) {
	return `data-base-ui-${e}`;
}
var Df = o((() => {}));
// node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs
function Of(e, t = {}) {
	let { preventScroll: n = !1, sync: r = !1, shouldFocus: i } = t;
	cancelAnimationFrame(kf);
	function a() {
		(!i || i()) && e?.focus({ preventScroll: n });
	}
	if (r) return a(), la;
	let o = requestAnimationFrame(a);
	return kf = o, () => {
		kf === o && (cancelAnimationFrame(o), kf = 0);
	};
}
var kf, Af = o((() => {
	fa(), kf = 0;
}));
// node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs
function jf(e) {
	return e ? Nr(e) ? e.host : jf(e.parentNode) : null;
}
function Mf(e, t, n, { mark: r = !0 }) {
	let i = zf(t, e), a = r ? Vf(t, Bf(i), new Set(i)) : [], o = [], s = [];
	if (n) {
		let e = zf(t, Array.from(t.querySelectorAll("[aria-live]"))), n = i.concat(e);
		Vf(t, Bf(n), new Set(n)).forEach((e) => {
			let t = e.getAttribute("aria-hidden"), n = t !== null && t !== "false", r = (Ff.get(e) || 0) + 1;
			Ff.set(e, r), o.push(e), r === 1 && n && If.add(e), n || e.setAttribute("aria-hidden", "true");
		});
	}
	return r && a.forEach((e) => {
		let t = (Lf.get(e) || 0) + 1;
		Lf.set(e, t), s.push(e), t === 1 && e.setAttribute(Pf, "");
	}), Rf += 1, () => {
		o.forEach((e) => {
			let t = (Ff.get(e) || 0) - 1;
			Ff.set(e, t), t || (If.has(e) || e.removeAttribute("aria-hidden"), If.delete(e));
		}), r && s.forEach((e) => {
			let t = (Lf.get(e) || 0) - 1;
			Lf.set(e, t), t || e.removeAttribute(Pf);
		}), --Rf, Rf || (Ff = /* @__PURE__ */ new WeakMap(), If = /* @__PURE__ */ new WeakSet(), Lf = /* @__PURE__ */ new WeakMap());
	};
}
function Nf(e, t = {}) {
	let { ariaHidden: n = !1, mark: r = !0 } = t, i = Vi(e[0]).body;
	return Mf(e, i, n, { mark: r });
}
var Pf, Ff, If, Lf, Rf, zf, Bf, Vf, Hf = o((() => {
	Zr(), Hi(), Pf = "data-base-ui-inert", Ff = /* @__PURE__ */ new WeakMap(), If = /* @__PURE__ */ new WeakSet(), Lf = /* @__PURE__ */ new WeakMap(), Rf = 0, zf = (e, t) => t.map((t) => {
		if (e.contains(t)) return t;
		let n = jf(t);
		return e.contains(n) ? n : null;
	}).filter((e) => e != null), Bf = (e) => {
		let t = /* @__PURE__ */ new Set();
		return e.forEach((e) => {
			let n = e;
			for (; n && !t.has(n);) t.add(n), n = n.parentNode;
		}), t;
	}, Vf = (e, t, n) => {
		let r = [], i = (e) => {
			e && !n.has(e) && Array.from(e.children).forEach((e) => {
				Dr(e) !== "script" && (t.has(e) ? i(e) : r.push(e));
			});
		};
		return i(e), r;
	};
})), Uf, Wf, Gf, Kf, qf, Jf, Yf, Xf = o((() => {
	Uf = { style: { transition: "none" } }, Wf = "data-base-ui-click-trigger", Gf = "data-base-ui-swipe-ignore", Kf = `[${Gf}]`, qf = { fallbackAxisSide: "none" }, Jf = { fallbackAxisSide: "end" }, Yf = {
		clipPath: "inset(50%)",
		position: "fixed",
		top: 0,
		left: 0
	};
}));
// node_modules/@base-ui/react/floating-ui-react/components/FloatingPortal.mjs
function Zf(e = {}) {
	let { ref: t, container: n, componentProps: r = da, elementProps: i } = e, a = Sl(), o = np()?.portalNode, [s, c] = Qf.useState(null), [l, u] = Qf.useState(null), d = q((e) => {
		e !== null && u(e);
	}), f = Qf.useRef(null);
	J(() => {
		if (n === null) {
			f.current && (f.current = null, u(null), c(null));
			return;
		}
		let e = (n && (Ar(n) ? n : n.current)) ?? o ?? document.body;
		e == null ? f.current && (f.current = null, u(null), c(null)) : f.current !== e && (f.current = e, u(null), c(e));
	}, [n, o]);
	let p = ya("div", r, {
		ref: [t, d],
		props: [{
			id: a,
			[rp]: ""
		}, i]
	}), m = s && p ? /*#__PURE__*/ $f.createPortal(p, s) : null;
	return {
		node: l,
		nodeId: /*#__PURE__*/ Qf.isValidElement(p) ? p.props.id : void 0,
		subtree: m
	};
}
var Qf, $f, ep, tp, np, rp, ip, ap = o((() => {
	Qf = /* @__PURE__ */ u(b(), 1), $f = /* @__PURE__ */ u(Os(), 1), Zr(), Yu(), Zu(), El(), fi(), li(), fa(), md(), Sf(), Gc(), ml(), Df(), Oa(), Xf(), ep = bs(), tp = /*#__PURE__*/ Qf.createContext(null), np = () => Qf.useContext(tp), rp = Ef("portal"), ip = /*#__PURE__*/ Qf.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, children: a, container: o, portalOwnerRole: s, ...c } = e, { node: l, nodeId: u, subtree: d } = Zf({
			container: o,
			ref: t,
			componentProps: e,
			elementProps: c
		}), f = Qf.useRef(null), p = Qf.useRef(null), m = Qf.useRef(null), h = Qf.useRef(null), [g, _] = Qf.useState(null), v = Qf.useRef(!1), y = g?.modal, b = g?.open, x = !!g && !g.modal && g.open && !!l;
		Qf.useEffect(() => {
			if (!l || y) return;
			function e(e) {
				l && e.relatedTarget && vf(e) && (e.type === "focusin" ? v.current &&= (bf(l), !1) : (yf(l), v.current = !0));
			}
			return Xu(Ju(l, "focusin", e, !0), Ju(l, "focusout", e, !0));
		}, [l, y]), J(() => {
			l && b === !0 && v.current && (bf(l), v.current = !1);
		}, [b, l]);
		let S = Qf.useMemo(() => ({
			beforeOutsideRef: f,
			afterOutsideRef: p,
			beforeInsideRef: m,
			afterInsideRef: h,
			portalNode: l,
			setFocusManagerState: _
		}), [l]);
		return /*#__PURE__*/ (0, ep.jsxs)(Qf.Fragment, { children: [d, /*#__PURE__*/ (0, ep.jsxs)(tp.Provider, {
			value: S,
			children: [
				x && l && /*#__PURE__*/ (0, ep.jsx)(pd, {
					"data-type": "outside",
					ref: f,
					onFocus: (e) => {
						vf(e, l) ? m.current?.focus() : gf(g ? g.domReference : null)?.focus();
					}
				}),
				x && l && /*#__PURE__*/ (0, ep.jsx)("span", {
					role: s,
					"aria-owns": u,
					style: Yf
				}),
				l && /*#__PURE__*/ $f.createPortal(a, l),
				x && l && /*#__PURE__*/ (0, ep.jsx)(pd, {
					"data-type": "outside",
					ref: p,
					onFocus: (e) => {
						vf(e, l) ? h.current?.focus() : (hf(g ? g.domReference : null)?.focus(), g?.closeOnFocusOut && g?.onOpenChange(!1, Uc("focus-out", e.nativeEvent)));
					}
				})
			]
		})] });
	});
}));
// node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function op() {
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
var sp = o((() => {})), cp, lp = o((() => {
	sp(), cp = class {
		nodesRef = { current: [] };
		events = op();
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
function up(e) {
	let t = Sl(), n = vp(e), r = _p();
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
function dp(e) {
	let { children: t, id: n } = e, r = _p();
	return /*#__PURE__*/ (0, mp.jsx)(hp.Provider, {
		value: pp.useMemo(() => ({
			id: n,
			parentId: r
		}), [n, r]),
		children: t
	});
}
function fp(e) {
	let { children: t, externalTree: n } = e, r = ti(() => n ?? new cp()).current;
	return /*#__PURE__*/ (0, mp.jsx)(gp.Provider, {
		value: r,
		children: t
	});
}
var pp, mp, hp, gp, _p, vp, yp = o((() => {
	pp = /* @__PURE__ */ u(b(), 1), El(), fi(), ii(), lp(), mp = bs(), hp = /*#__PURE__*/ pp.createContext(null), gp = /*#__PURE__*/ pp.createContext(null), _p = () => pp.useContext(hp)?.id || null, vp = (e) => {
		let t = pp.useContext(gp);
		return e ?? t;
	};
}));
// node_modules/@base-ui/react/utils/resolveRef.mjs
function bp(e) {
	return e == null ? e : "current" in e ? e.current : e;
}
var xp = o((() => {}));
// node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs
function Sp(e, t) {
	let n = Or(hu(e));
	return e instanceof n.KeyboardEvent ? "keyboard" : e instanceof n.FocusEvent ? t || "keyboard" : "pointerType" in e ? e.pointerType || (cu(e) ? "keyboard" : t || "mouse") : "touches" in e ? "touch" : e instanceof n.MouseEvent ? t || (e.detail === 0 ? "keyboard" : "mouse") : "";
}
function Cp() {
	Mp = Mp.filter((e) => e.deref()?.isConnected);
}
function wp(e) {
	Cp(), e && Dr(e) !== "body" && (Mp.push(new WeakRef(e)), Mp.length > jp && (Mp = Mp.slice(-20)));
}
function Tp() {
	return Cp(), Mp[Mp.length - 1]?.deref();
}
function Ep(e) {
	return e ? df(e) ? e : pf(e)[0] || e : null;
}
function Dp(e) {
	if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !e.getAttribute("role")?.includes("dialog")) return;
	let t = ff(e).filter((e) => {
		let t = e.getAttribute("data-tabindex") || "";
		return df(e) || e.hasAttribute("data-tabindex") && !t.startsWith("-");
	}), n = e.getAttribute("tabindex");
	t.length === 0 ? n !== "0" && (e.setAttribute("tabindex", "0"), e.setAttribute("data-tabindex", "0")) : (n !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tabindex", "-1"));
}
function Op(e) {
	let { context: t, children: n, disabled: r = !1, initialFocus: i = !0, returnFocus: a = !0, explicitReturnFocus: o, restoreFocus: s = !1, modal: c = !0, closeOnFocusOut: l = !0, openInteractionType: u = "", nextFocusableElement: d, previousFocusableElement: f, beforeContentFocusGuardRef: p, externalTree: m, getInsideElements: h } = e, g = t.useState("open"), _ = t.useState("domReferenceElement"), v = t.useState("floatingElement"), { events: y, dataRef: b } = t.context, x = q(() => b.current.floatingContext?.nodeId), S = i === !1, C = ju(_) && S, w = Qu(i), T = Qu(a), E = Qu(o), D = Qu(u), O = Qu(g), k = vp(m), A = np(), j = kp.useRef(!1), M = kp.useRef(!1), N = kp.useRef(!1), P = kp.useRef(null), F = kp.useRef(""), I = kp.useRef(""), L = kp.useRef(null), R = kp.useRef(null), z = Xi(L, p, A?.beforeInsideRef), B = Xi(R, A?.afterInsideRef), V = Fl(), H = Fl(), ee = td(), te = A != null, U = Nu(v), ne = q((e = U) => e ? pf(e) : []), W = q(() => h?.().filter((e) => e != null) ?? []);
	kp.useEffect(() => {
		if (r || !c) return;
		function e(e) {
			e.key === "Tab" && Q(U, pu(Vi(U))) && ne().length === 0 && !C && ou(e);
		}
		return Ju(Vi(U), "keydown", e);
	}, [
		r,
		U,
		c,
		C,
		ne
	]), kp.useEffect(() => {
		if (r || !g) return;
		let e = Vi(U);
		function t() {
			N.current = !1;
		}
		function n(e) {
			let t = hu(e), n = W(), r = Q(v, t) || Q(_, t) || Q(A?.portalNode, t) || n.some((e) => e === t || Q(e, t));
			N.current = !r, I.current = e.pointerType || "keyboard", mu(t, "[data-base-ui-click-trigger]") && (M.current = !0, H.start(0, () => {
				M.current = !1;
			}));
		}
		function i() {
			I.current = "keyboard";
		}
		return Xu(Ju(e, "pointerdown", n, !0), Ju(e, "pointerup", t, !0), Ju(e, "pointercancel", t, !0), Ju(e, "keydown", i, !0), t);
	}, [
		r,
		v,
		_,
		U,
		g,
		A,
		H,
		W
	]), kp.useEffect(() => {
		if (r || !l) return;
		let e = Vi(U);
		function n() {
			M.current = !0, H.start(0, () => {
				M.current = !1;
			});
		}
		function i(e) {
			let t = hu(e);
			df(t) && (P.current = t);
		}
		function a(n) {
			let r = n.relatedTarget, i = n.currentTarget, a = hu(n);
			c && r == null && a != null && Q(v, a) && wp(a), queueMicrotask(() => {
				let o = x(), l = t.context.triggerElements, u = W(), p = r?.hasAttribute(Ef("focus-guard")) && [
					L.current,
					R.current,
					A?.beforeInsideRef.current,
					A?.afterInsideRef.current,
					A?.beforeOutsideRef.current,
					A?.afterOutsideRef.current,
					bp(f),
					bp(d)
				].includes(r), m = !(Q(_, r) || Q(v, r) || Q(r, v) || Q(A?.portalNode, r) || u.some((e) => e === r || Q(e, r)) || l.hasMatchingElement((e) => Q(e, r)) || p || k && (Cf(k.nodesRef.current, o).find((e) => Q(e.context?.elements.floating, r) || Q(e.context?.elements.domReference, r)) || wf(k.nodesRef.current, o).find((e) => [e.context?.elements.floating, Nu(e.context?.elements.floating)].includes(r) || e.context?.elements.domReference === r)));
				if (i === _ && U && Dp(U), s && i !== _ && !Xd(a) && pu(e) === e.body) {
					if (Mr(U) && (U.focus(), s === "popup")) {
						ee.request(() => {
							U.focus();
						});
						return;
					}
					let e = ne(), t = P.current, n = (t && e.includes(t) ? t : null) || e[e.length - 1] || U;
					Mr(n) && n.focus();
				}
				b.current.insideReactTree ? b.current.insideReactTree = !1 : (C || !c) && r && m && !M.current && (C || r !== Tp()) && (j.current = !0, t.setOpen(!1, Uc($c, n)));
			});
		}
		function o() {
			N.current || (b.current.insideReactTree = !0, V.start(0, () => {
				b.current.insideReactTree = !1;
			}));
		}
		let u = Mr(_) ? _ : null;
		if (v || u) return Xu(u && Ju(u, "focusout", a), u && Ju(u, "pointerdown", n), v && Ju(v, "focusin", i), v && Ju(v, "focusout", a), v && A && Ju(v, "focusout", o, !0));
	}, [
		r,
		_,
		v,
		U,
		c,
		k,
		A,
		t,
		l,
		s,
		ne,
		C,
		x,
		b,
		V,
		H,
		ee,
		d,
		f,
		W
	]), kp.useEffect(() => {
		if (r || !v || !g) return;
		let e = Array.from(A?.portalNode?.querySelectorAll(`[${Ef("portal")}]`) || []), t = (k ? wf(k.nodesRef.current, x()) : []).find((e) => ju(e.context?.elements.domReference || null))?.context?.elements.domReference, n = Nf([
			v,
			...e,
			L.current,
			R.current,
			A?.beforeOutsideRef.current,
			A?.afterOutsideRef.current,
			...W(),
			t,
			bp(f),
			bp(d),
			C ? _ : null
		].filter((e) => e != null), {
			ariaHidden: c || C,
			mark: !1
		}), i = Nf([v, ...e].filter((e) => e != null));
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
		W
	]), J(() => {
		if (!g || r || !Mr(U)) return;
		F.current = "", I.current = "";
		let e = Vi(U), t = pu(e);
		queueMicrotask(() => {
			let n = w.current, r = typeof n == "function" ? n(D.current || "") : n;
			if (r === void 0 || r === !1 || Q(U, t)) return;
			let i = null, a = () => (i ??= ne(U), i[0] || U), o;
			o = r === !0 || r === null ? a() : bp(r), o ||= a();
			let s = Q(U, pu(e)), c = b.current.openEvent, l = c?.type === "mousedown" && cu(c);
			Of(o, {
				sync: l,
				preventScroll: o === U,
				shouldFocus() {
					if (!O.current) return !1;
					if (s) return !0;
					let t = pu(e);
					return !(t !== o && Q(U, t));
				}
			});
		});
	}, [
		r,
		g,
		U,
		ne,
		w,
		D,
		O,
		b
	]);
	let re = kp.useRef(null);
	J(() => {
		if (r || !U) {
			re.current = null;
			return;
		}
		re.current &&= (re.current.cancelled = !0, null);
		let e = Vi(U), t = pu(e), n = D.current == null;
		wp(t);
		function i(e) {
			if (e.open || (F.current = Sp(e.nativeEvent, I.current)), (e.reason === "focus-out" && e.triggerElement?.hasAttribute(Ef("focus-guard")) || e.reason === "trigger-hover" && e.nativeEvent.type === "mouseleave") && (j.current = !0), e.reason === "outside-press") {
				if (e.nested) j.current = !1;
				else if (cu(e.nativeEvent) || lu(e.nativeEvent)) j.current = !1;
				else {
					let e = !1;
					Vi(U).createElement("div").focus({ get preventScroll() {
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
			let a = _?.isConnected ? _ : null, o = t?.isConnected && Dr(t) !== "body" ? t : null, s = n ? o || a : a || o;
			return s ||= Tp() || null, typeof i == "boolean" ? s : bp(i) || s || null;
		}
		return () => {
			y.off("openchange", i);
			let t = pu(e), n = W(), r = Q(v, t) || n.some((e) => e === t || Q(e, t)) || k && Cf(k.nodesRef.current, x(), !1).some((e) => Q(e.context?.elements.floating, t)), o = T.current, s = F.current, c = a(s), l = { cancelled: !1 };
			re.current = l, queueMicrotask(() => {
				re.current === l && (re.current = null);
				let n = Ep(c), i = E.current ?? typeof o != "boolean";
				if (!l.cancelled && o && !j.current && Mr(n) && (i || n === t || t === e.body || r)) {
					let e = { preventScroll: !0 };
					s === "keyboard" && (e.focusVisible = !0), n.focus(e);
				}
				j.current = !1;
			});
		};
	}, [
		r,
		v,
		U,
		T,
		E,
		D,
		y,
		k,
		_,
		x,
		W
	]), J(() => {
		if (!Ql || g || !v) return;
		let e = pu(Vi(v));
		Mr(e) && ku(e) && Q(v, e) && e.blur();
	}, [g, v]), J(() => {
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
	]), J(() => {
		if (!r && U) return Dp(U), () => {
			queueMicrotask(Cp);
		};
	}, [r, U]);
	let G = !r && (!c || !C) && (te || c);
	return /*#__PURE__*/ (0, Ap.jsxs)(kp.Fragment, { children: [
		G && /*#__PURE__*/ (0, Ap.jsx)(pd, {
			"data-type": "inside",
			ref: z,
			onFocus: (e) => {
				if (c) {
					let e = ne();
					Of(e[e.length - 1]);
				} else A?.portalNode && (j.current = !1, vf(e, A.portalNode) ? hf(_)?.focus() : bp(f ?? A.beforeOutsideRef)?.focus());
			}
		}),
		n,
		G && /*#__PURE__*/ (0, Ap.jsx)(pd, {
			"data-type": "inside",
			ref: B,
			onFocus: (e) => {
				c ? Of(ne()[0]) : A?.portalNode && (l && (j.current = !0), vf(e, A.portalNode) ? gf(_)?.focus() : bp(d ?? A.afterOutsideRef)?.focus());
			}
		})
	] });
}
var kp, Ap, jp, Mp, Np = o((() => {
	kp = /* @__PURE__ */ u(b(), 1), Zr(), Yu(), Zu(), na(), ed(), li(), fi(), Rl(), au(), od(), Hi(), md(), Pu(), fu(), Sf(), Tf(), Zd(), Gc(), ml(), Df(), Af(), Hf(), ap(), yp(), Xf(), xp(), Ap = bs(), jp = 20, Mp = [];
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs
function Pp(e, t = {}) {
	let { enabled: n = !0, event: r = "click", toggle: i = !0, ignoreMouse: a = !1, stickIfOpen: o = !0, touchOpenDelay: s = 0, reason: c = qc } = t, l = e.context.dataRef, u = Fp.useRef(void 0), d = td(), f = Fl(), p = Fp.useMemo(() => {
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
				u.current = uu(e.pointerType, !0) && lu(e.nativeEvent) ? "virtual" : e.pointerType;
			},
			onMouseDown(i) {
				let o = u.current, s = i.nativeEvent, c = e.select("open");
				if (i.button !== 0 || r === "click" || uu(o, !0) && a) return;
				let l = n(c, i.currentTarget, (e) => e === "click" || e === "mousedown"), f = hu(s), p = ku(f);
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
				r === "mousedown" && o ? u.current = void 0 : uu(o, !0) && a || t(n(e.select("open"), i.currentTarget, (e) => e === "click" || e === "mousedown" || e === "keydown" || e === "keyup"), i.nativeEvent, i.currentTarget, o);
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
	return Fp.useMemo(() => n ? { reference: p } : da, [n, p]);
}
var Fp, Ip = o((() => {
	Fp = /* @__PURE__ */ u(b(), 1), od(), Rl(), fa(), Pu(), fu(), Gc(), ml();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useClientPoint.mjs
function Lp(e, t) {
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
function Rp(e) {
	return e != null && e.clientX != null;
}
function zp(e, t = {}) {
	let { enabled: n = !0, axis: r = "both" } = t, i = e.useState("open"), a = e.useState("floatingElement"), o = e.useState("domReferenceElement"), s = e.context.dataRef, c = Bp.useRef(!1), l = Bp.useRef(null), [u, d] = Bp.useState(), [f, p] = Bp.useState([]), m = q((t) => {
		e.set("positionReference", t);
	}), h = q((t, n, i) => {
		c.current || (!s.current.openEvent || Rp(s.current.openEvent)) && e.set("positionReference", Lp(i ?? o, {
			x: t,
			y: n,
			axis: r,
			dataRef: s,
			pointerType: u
		}));
	}), g = q((e) => {
		i ? l.current || (h(e.clientX, e.clientY, e.currentTarget), p([])) : h(e.clientX, e.clientY, e.currentTarget);
	}), _ = uu(u) ? a : i;
	Bp.useEffect(() => {
		if (!n) {
			m(o);
			return;
		}
		if (!_) return;
		function e() {
			l.current?.(), l.current = null;
		}
		let t = Or(a);
		function r(t) {
			let n = hu(t);
			Q(a, n) ? e() : h(t.clientX, t.clientY);
		}
		return !s.current.openEvent || Rp(s.current.openEvent) ? l.current = Ju(t, "mousemove", r) : m(o), e;
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
	]), Bp.useEffect(() => () => {
		e.set("positionReference", null);
	}, [e]), Bp.useEffect(() => {
		n && !a && (c.current = !1);
	}, [n, a]), Bp.useEffect(() => {
		!n && i && (c.current = !0);
	}, [n, i]);
	let v = Bp.useMemo(() => {
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
	return Bp.useMemo(() => n ? {
		reference: v,
		trigger: v
	} : {}, [n, v]);
}
var Bp, Vp = o((() => {
	Bp = /* @__PURE__ */ u(b(), 1), Yu(), li(), Zr(), Pu(), fu();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs
function Hp() {
	return !1;
}
function Up(e) {
	return {
		escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? !1,
		outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? !0
	};
}
function Wp(e, t = {}) {
	let { enabled: n = !0, escapeKey: r = !0, outsidePress: i = !0, outsidePressEvent: a = "sloppy", referencePress: o = Hp, bubbles: s, externalTree: c } = t, l = e.useState("open"), u = e.useState("floatingElement"), { dataRef: d, events: f } = e.context, p = vp(c), m = q(typeof i == "function" ? i : () => !1), h = typeof i == "function" ? m : i, g = h !== !1, _ = q(() => a), { escapeKey: v, outsidePress: y } = Up(s), b = Gp.useRef(!1), x = Gp.useRef(!1), S = Gp.useRef(!1), C = Gp.useRef(!1), w = Gp.useRef(!1), T = Gp.useRef(""), E = Gp.useRef(null), D = Fl(), O = Fl(), k = Fl(), A = q(() => {
		O.clear(), d.current.insideReactTree = !1;
	}), j = q((e) => {
		let t = d.current.floatingContext?.nodeId;
		return (p ? Cf(p.nodesRef.current, t) : []).some((t) => t.context?.open && !t.context.dataRef.current[e]);
	}), M = q((t) => Du(t, e.select("floatingElement")) || Du(t, e.select("domReferenceElement"))), N = q((t) => {
		o() && e.setOpen(!1, Uc(qc, t.nativeEvent));
	}), P = q((t) => {
		if (!l || !n || !r || t.key !== "Escape") return;
		let i = su(t) ? t.nativeEvent : t;
		if (w.current || i.isComposing || !v && j("__escapeKeyBubbles")) return;
		let a = Uc(el, i);
		e.setOpen(!1, a), a.isCanceled || t.preventDefault(), !v && !a.isPropagationAllowed && t.stopPropagation();
	}), F = q(() => {
		d.current.insideReactTree = !0, O.start(0, A);
	}), I = q((t) => {
		if (!l || !n || t.button !== 0) return;
		let r = hu(t.nativeEvent);
		Q(e.select("floatingElement"), r) && (b.current || (b.current = !0, x.current = !1));
	}), L = q((e) => {
		l && n && (e.defaultPrevented || e.nativeEvent.defaultPrevented) && b.current && (x.current = !0);
	});
	Gp.useEffect(() => {
		function e(e) {
			e.open || (C.current = !1);
		}
		return f.on("openchange", e), () => {
			f.off("openchange", e);
		};
	}, [f]), Gp.useEffect(() => A, [A]), Gp.useEffect(() => {
		if (!l || !n) return l || (C.current = !1, w.current = !1, T.current = "", E.current = null), A;
		d.current.__escapeKeyBubbles = v, d.current.__outsidePressBubbles = y;
		let t = new Ll(), i = Vi(u);
		function a() {
			k.clear(), w.current = !0;
		}
		function o() {
			w.current = !0, k.start(Ql ? 5 : 0, () => {
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
			let t = d.current.floatingContext?.nodeId, n = p && Cf(p.nodesRef.current, t).some((t) => Du(e, t.context?.elements.floating));
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
			let r = hu(n), i = `[${Ef("inert")}]`, a = jr(r) ? r.getRootNode() : null, o = Array.from((Nr(a) ? a : Vi(e.select("floatingElement"))).querySelectorAll(i)), s = e.context.triggerElements;
			if (r && (s.hasElement(r) || s.hasMatchingElement((e) => Q(e, r)))) return;
			let c = jr(r) ? r : null;
			for (; c && !Br(c);) {
				let e = Ur(c);
				if (Br(e) || !jr(e)) break;
				c = e;
			}
			if (!(o.length && jr(r) && !Ou(r) && !Q(r, e.select("floatingElement")) && o.every((e) => !Q(c, e)))) {
				if (Mr(r) && !("touches" in n)) {
					let e = Br(r), t = Vr(r), i = /auto|scroll/, a = e || i.test(t.overflowX), o = e || i.test(t.overflowY), s = a && r.clientWidth > 0 && r.scrollWidth > r.clientWidth, c = o && r.clientHeight > 0 && r.scrollHeight > r.clientHeight, l = t.direction === "rtl", u = c && (l ? n.offsetX <= r.offsetWidth - r.clientWidth : n.offsetX > r.clientWidth), d = s && n.offsetY > r.clientHeight;
					if (u || d) return;
				}
				if (!O(n)) {
					if (f() === "intentional") {
						if (n.detail !== 0 && !cu(n) && !C.current) return;
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
			let n = hu(e);
			if (!n) return;
			let r = Ju(n, e.type, () => {
				t(e), r();
			});
		}
		function R(e) {
			T.current = "touch", L(e, I);
		}
		function z(e) {
			D.clear(), e.type === "pointerdown" && (e.button === 0 && (C.current = !0), T.current = e.pointerType), (e.type !== "mousedown" || !E.current || E.current.dismissOnMouseDown) && L(e, (e) => {
				e.type === "pointerdown" ? F(e) : N(e);
			});
		}
		function B(e) {
			if (e.type === "pointercancel" && (C.current = !1), !b.current) return;
			let n = x.current;
			c(), f() === "intentional" && (e.type === "pointercancel" ? n && s() : O(e) || (n ? s() : (typeof h != "function" || h(e)) && (t.clear(), S.current = !0, A())));
		}
		function V(e) {
			if (f() !== "sloppy" || !E.current || M(e)) return;
			let t = e.touches[0];
			if (!t) return;
			let n = Math.abs(t.clientX - E.current.startX), r = Math.abs(t.clientY - E.current.startY), i = Math.sqrt(n * n + r * r);
			i > 5 && (E.current.dismissOnTouchEnd = !0), i > 10 && (N(e), D.clear(), E.current = null);
		}
		function H(e) {
			L(e, V);
		}
		function ee(e) {
			f() === "sloppy" && E.current && !M(e) && (E.current.dismissOnTouchEnd && N(e), D.clear(), E.current = null);
		}
		function te(e) {
			L(e, ee);
		}
		let U = Xu(r && Xu(Ju(i, "keydown", P), Ju(i, "compositionstart", a), Ju(i, "compositionend", o)), g && Xu(Ju(i, "click", z, !0), Ju(i, "pointerdown", z, !0), Ju(i, "pointerup", B, !0), Ju(i, "pointercancel", B, !0), Ju(i, "mousedown", z, !0), Ju(i, "mouseup", B, !0), Ju(i, "touchstart", R, {
			capture: !0,
			passive: !0
		}), Ju(i, "touchmove", H, {
			capture: !0,
			passive: !0
		}), Ju(i, "touchend", te, {
			capture: !0,
			passive: !0
		})));
		return () => {
			U(), t.clear(), c(), S.current = !1;
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
	let R = Gp.useMemo(() => ({
		onKeyDown: P,
		onPointerDown: N,
		onClick: N
	}), [P, N]), z = Gp.useMemo(() => ({
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
	return Gp.useMemo(() => n ? {
		reference: R,
		floating: z,
		trigger: R
	} : {}, [
		n,
		R,
		z
	]);
}
var Gp, Kp = o((() => {
	Gp = /* @__PURE__ */ u(b(), 1), Yu(), Zu(), Hi(), li(), Rl(), Zr(), au(), yp(), Gc(), ml(), Df(), Pu(), fu(), Tf();
})), qp = o((() => {})), Jp = o((() => {}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useSyncedFloatingRootContext.mjs
function Yp(e) {
	let { popupStore: t, treatPopupAsFloatingElement: n = !1, floatingRootContext: r, floatingId: i, nested: a, onOpenChange: o } = e, s = t.useState("open"), c = t.useState("activeTriggerElement"), l = t.useState(n ? "popupElement" : "positionerElement"), u = o;
	return t.useSyncedValue("floatingId", i), J(() => {
		let e = {
			open: s,
			floatingId: i,
			referenceElement: c,
			floatingElement: l
		};
		jr(c) && (e.domReferenceElement = c), r.state.positionReference === r.state.referenceElement && (e.positionReference = c), r.update(e);
	}, [
		s,
		i,
		c,
		l,
		r
	]), r.context.onOpenChange = u, r.context.nested = a, r;
}
var Xp = o((() => {
	fi(), Zr();
}));
// node_modules/@base-ui/react/internals/useTransitionStatus.mjs
function Zp(e, t = !1, n = !1, r = !1) {
	let [i, a] = Qp.useState(e && t ? "idle" : void 0), [o, s] = Qp.useState(e && !r);
	return e && !o && (s(!0), a("starting")), !e && o && i !== "ending" && !n && a("ending"), !e && !o && i === "ending" && a(void 0), J(() => {
		if (!e && o && i !== "ending" && n) {
			let e = ad.request(() => {
				a("ending");
			});
			return () => {
				ad.cancel(e);
			};
		}
	}, [
		e,
		o,
		i,
		n
	]), J(() => {
		if (!e || t || i === void 0) return;
		let n = ad.request(() => {
			a(void 0);
		});
		return () => {
			ad.cancel(n);
		};
	}, [
		t,
		e,
		i
	]), J(() => {
		if (!e || !t) return;
		e && o && i !== "idle" && a("starting");
		let n = ad.request(() => {
			a("idle");
		});
		return () => {
			ad.cancel(n);
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
var Qp, $p = o((() => {
	Qp = /* @__PURE__ */ u(b(), 1), fi(), od();
}));
// node_modules/@base-ui/react/utils/getFiniteAnimations.mjs
function em(e, t) {
	return e.getAnimations(t).filter((e) => {
		let t = e.effect?.getTiming();
		return t?.duration !== Infinity && t?.iterations !== Infinity;
	});
}
var tm = o((() => {}));
// node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
function nm(e) {
	if (!am) {
		let e = [];
		am = e, queueMicrotask(() => {
			am = null, im.flushSync(() => {
				for (let t of e) t();
			});
		});
	}
	am.push(e);
}
function rm(e, t = !1, n = !1) {
	let r = td();
	return q((i, a = null) => {
		r.cancel();
		let o = bp(e);
		if (o == null) return;
		let s = o, c = () => {
			n ? nm(() => {
				a?.aborted || i();
			}) : im.flushSync(i);
		};
		if (typeof s.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
			i();
			return;
		}
		function l() {
			Promise.all(em(s).map((e) => e.finished.then(la))).then(() => {
				a?.aborted || c();
			}, () => {
				a?.aborted || (em(s).some((e) => e.pending || e.playState !== "finished") ? l() : c());
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
var im, am, om = o((() => {
	im = /* @__PURE__ */ u(Os(), 1), od(), li(), fa(), xp(), tm(), _c(), am = null;
}));
// node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs
function sm(e) {
	let { enabled: t = !0, open: n, ref: r, batch: i = !1, onComplete: a } = e, o = q(a), s = rm(r, n, i);
	cm.useEffect(() => {
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
var cm, lm = o((() => {
	cm = /* @__PURE__ */ u(b(), 1), li(), om();
}));
// node_modules/@base-ui/react/internals/useUnmountAfterClose.mjs
function um(e) {
	let { open: t, ref: n, preventUnmountOnClose: r, setPreventUnmountOnClose: i, onUnmount: a, animateInitialOpen: o } = e, s = q(i), { mounted: c, setMounted: l, transitionStatus: u } = Zp(t, !1, !1, o), d = !t && r;
	J(() => {
		t && s(!1);
	}, [t, s]);
	let f = dm.useRef(c), p = dm.useRef(!1), m = vl(), h = () => {
		f.current = !1, l(!1), a();
	};
	J(() => {
		f.current = c, p.current && (p.current = !1, !t && c && h());
	});
	let g = q(() => {
		f.current && (t ? (p.current = !0, m()) : h());
	});
	return sm({
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
var dm, fm = o((() => {
	dm = /* @__PURE__ */ u(b(), 1), li(), fi(), bl(), $p(), lm();
}));
// node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs
function pm(e) {
	return (t) => t !== "touch" || e.current;
}
function mm(e, t = !1) {
	let n = Sl(), r = _p() != null, i = ti(() => e(n, r)).current;
	return Yp({
		popupStore: i,
		treatPopupAsFloatingElement: t,
		floatingRootContext: i.state.floatingRootContext,
		floatingId: n,
		nested: r,
		onOpenChange: i.setOpen
	}), i;
}
function hm({ handle: e, store: t }) {
	return J(() => e.attachStore(t), [e, t]), null;
}
function gm(e) {
	let t = e.context.triggerElements.size;
	e.select("open") && e.state.triggerCount !== t && e.set("triggerCount", t);
}
function _m(e, t) {
	let n = Em.useRef(null);
	return q((r) => {
		let i = n.current;
		if (i !== null) {
			if (i.element === r && i.store === t && i.id === e) return;
			n.current = null;
			let a = i.store;
			a.context.triggerElements.getById(i.id) === i.element && (a.context.triggerElements.delete(i.id), gm(a));
		}
		r !== null && e !== void 0 && (n.current = {
			store: t,
			id: e,
			element: r
		}, t.context.triggerElements.add(e, r), gm(t));
	});
}
function vm(e, t, n, r = !1) {
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
function ym(e) {
	let t = !1;
	return e.preventUnmountOnClose = () => {
		t = !0;
	}, () => t;
}
function bm(e, t, n, r = {}) {
	let i = n.reason, a = i === Jc, o = t && i === "trigger-focus", s = !t && (i === "trigger-press" || i === "escape-key"), c = ym(n);
	if (e.context.onOpenChange?.(t, n), n.isCanceled) return;
	r.onBeforeDispatch?.(), e.state.floatingRootContext.dispatchOpenChange(t, n);
	let l = () => {
		let i = vm(e.state, t, n.trigger, c()), l = {
			...r.extraState,
			...i
		};
		o ? l.instantType = "focus" : s ? l.instantType = "dismiss" : a && (l.instantType = void 0), e.update(l);
	};
	a ? Dm.flushSync(l) : l();
}
function xm(e, t, n, r) {
	let i = n.useState("isMountedByTrigger", e), a = _m(e, n), o = q((t) => {
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
function Sm(e, t = {}) {
	let { closeOnActiveTriggerUnmount: n = !1 } = t, r = Em.useRef(null), i = e.useState("open"), a = e.useState("triggerCount"), o = e.useState("activeTriggerId"), s = e.useState("activeTriggerElement");
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
function Cm(e, t, n, r) {
	let { mounted: i, transitionStatus: a, forceUnmount: o } = um({
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
	return ti(() => (t.set("mounted", i), null)), t.useSyncedValues({
		mounted: i,
		transitionStatus: a
	}), {
		forceUnmount: o,
		transitionStatus: a
	};
}
function wm(e, t) {
	e.useSyncedValues(t), J(() => () => {
		e.update({
			activeTriggerProps: da,
			inactiveTriggerProps: da,
			popupProps: da
		});
	}, [e]);
}
function Tm(e, t) {
	J(() => {
		!t && e.state.openMethod !== null && e.set("openMethod", null);
	}, [t, e]), J(() => () => {
		e.state.openMethod !== null && e.set("openMethod", null);
	}, [e]);
}
var Em, Dm, Om, km = o((() => {
	Em = /* @__PURE__ */ u(b(), 1), Dm = /* @__PURE__ */ u(Os(), 1), fa(), El(), li(), fi(), ii(), Cu(), yp(), Xp(), fm(), Gc(), ml(), Om = {
		tabIndex: -1,
		[_u]: ""
	};
})), Am, jm = o((() => {
	Am = class {
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
})), Mm = o((() => {})), Nm = o((() => {})), Pm = /* @__PURE__ */ s(((e) => {
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
})), Fm = /* @__PURE__ */ s(((e, t) => {
	t.exports = Pm();
})), Im = /* @__PURE__ */ s(((e) => {
	var t = b(), n = Fm();
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
})), Lm = /* @__PURE__ */ s(((e, t) => {
	t.exports = Im();
}));
// node_modules/@base-ui/utils/fastHooks.mjs
function Rm() {
	return Gm;
}
function zm(e) {
	Wm.push(e);
}
function Bm(e) {
	let t = (t, n) => {
		let r = ti(Hm).current, i;
		try {
			Gm = r;
			for (let e of Wm) e.before(r);
			i = e(t, n);
			for (let e of Wm) e.after(r);
			r.didInitialize = !0;
		} finally {
			Gm = void 0;
		}
		return i;
	};
	return t.displayName = e.displayName || e.name, t;
}
function Vm(e) {
	return /*#__PURE__*/ Um.forwardRef(Bm(e));
}
function Hm() {
	return { didInitialize: !1 };
}
var Um, Wm, Gm, Km = o((() => {
	Um = /* @__PURE__ */ u(b(), 1), ii(), Wm = [], Gm = void 0;
}));
// node_modules/@base-ui/utils/store/useStore.mjs
function qm(e, t, n, r, i) {
	return eh(e, t, n, r, i);
}
function Jm(e, t, n, r, i) {
	let a = Zm.useCallback(() => t(e.getSnapshot(), n, r, i), [
		e,
		t,
		n,
		r,
		i
	]);
	return (0, Qm.useSyncExternalStore)(e.subscribe, a, a);
}
function Ym(e, t, n, r, i) {
	let a = Rm();
	if (!a) return Jm(e, t, n, r, i);
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
function Xm(e, t, n, r, i) {
	return (0, $m.useSyncExternalStoreWithSelector)(e.subscribe, e.getSnapshot, e.getSnapshot, (e) => t(e, n, r, i));
}
var Zm, Qm, $m, eh, th = o((() => {
	Zm = /* @__PURE__ */ u(b(), 1), Qm = Fm(), $m = Lm(), aa(), Km(), eh = ra(19) ? Ym : Xm, zm({
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
			}), (0, Qm.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot));
		}
	});
})), nh, rh = o((() => {
	th(), nh = class {
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
			return qm(this, e, t, n, r);
		}
	};
})), ih, ah, oh = o((() => {
	ih = /* @__PURE__ */ u(b(), 1), rh(), th(), li(), fi(), fa(), ah = class extends nh {
		constructor(e, t = {}, n) {
			super(e), this.context = t, this.selectors = n;
		}
		useSyncedValue(e, t) {
			ih.useDebugValue(e);
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
			let t = this, n = Object.values(e);
			J(() => {
				t.update(e);
			}, [t, ...n]);
		}
		useControlledProp(e, t) {
			ih.useDebugValue(e);
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
			return ih.useDebugValue(e), qm(this, this.selectors[e], t, n, r);
		}
		useContextCallback(e, t) {
			ih.useDebugValue(e);
			let n = q(t ?? la);
			this.context[e] = n;
		}
		useStateSetter(e) {
			let t = ih.useRef(void 0);
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
})), sh = o((() => {
	b(), Os(), Fm(), bs();
})), ch = o((() => {
	Mm(), Nm(), th(), rh(), oh(), sh();
})), lh = o((() => {
	Pu(), Tf(), fu(), Zd(), Sf();
})), uh, dh, fh = o((() => {
	ch(), sp(), lh(), uh = {
		open: (e) => e.open,
		transitionStatus: (e) => e.transitionStatus,
		domReferenceElement: (e) => e.domReferenceElement,
		referenceElement: (e) => e.positionReference ?? e.referenceElement,
		floatingElement: (e) => e.floatingElement,
		floatingId: (e) => e.floatingId
	}, dh = class extends ah {
		constructor(e) {
			let { syncOnly: t, nested: n, onOpenChange: r, triggerElements: i, ...a } = e;
			super({
				...a,
				positionReference: a.referenceElement,
				domReferenceElement: a.referenceElement
			}, {
				onOpenChange: r,
				dataRef: { current: {} },
				events: op(),
				nested: n,
				triggerElements: i
			}, uh), this.syncOnly = t;
		}
		syncOpenEvent = (e, t) => {
			(!e || !this.state.open || t != null && du(t)) && (this.context.dataRef.current.openEvent = e ? t : void 0);
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
function ph(e, t, n = !1) {
	return {
		open: !1,
		openProp: void 0,
		mounted: !1,
		transitionStatus: void 0,
		floatingRootContext: new dh({
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
		activeTriggerProps: da,
		inactiveTriggerProps: da,
		popupProps: da
	};
}
function mh(e, t) {
	return t !== void 0 && _h(e) && gh(e) === t;
}
function hh(e, t) {
	return mh(e, t) ? !0 : t !== void 0 && _h(e) && gh(e) == null && !e.openedWithoutTrigger && e.triggerCount === 1;
}
var gh, _h, vh, yh, bh = o((() => {
	fa(), fh(), gh = (e) => e.triggerIdProp ?? e.activeTriggerId, _h = (e) => e.openProp ?? e.open, vh = (e) => (e.popupElement?.id ?? e.floatingId) || void 0, yh = {
		open: _h,
		mounted: (e) => e.mounted,
		transitionStatus: (e) => _h(e) && !e.mounted ? "starting" : e.transitionStatus,
		floatingRootContext: (e) => e.floatingRootContext,
		triggerCount: (e) => e.triggerCount,
		preventUnmountingOnClose: (e) => e.preventUnmountingOnClose,
		payload: (e) => e.payload,
		activeTriggerId: gh,
		activeTriggerElement: (e) => e.mounted ? e.activeTriggerElement : null,
		popupId: vh,
		isTriggerActive: (e, t) => t !== void 0 && gh(e) === t,
		isOpenedByTrigger: (e, t) => mh(e, t),
		isMountedByTrigger: (e, t) => t !== void 0 && gh(e) === t && e.mounted,
		triggerProps: (e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps,
		triggerPopupId: (e, t) => hh(e, t) ? vh(e) : void 0,
		popupProps: (e) => e.popupProps,
		popupElement: (e) => e.popupElement,
		positionerElement: (e) => e.positionerElement
	};
}));
// node_modules/@base-ui/react/utils/popups/usePopupHandleStore.mjs
function xh(e) {
	let t = Sh.useCallback((t) => e === void 0 ? la : e.subscribeStore(t), [e]), n = Sh.useCallback(() => e === void 0 ? void 0 : e.store, [e]);
	return (0, Ch.useSyncExternalStore)(t, n, () => e?.serverStore);
}
var Sh, Ch, wh = o((() => {
	Sh = /* @__PURE__ */ u(b(), 1), Ch = Fm(), fa();
})), Th = o((() => {
	qp(), Jp(), km(), jm(), bh(), wh();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function Eh(e) {
	let { open: t = !1, onOpenChange: n, elements: r = {} } = e, i = Sl(), a = _p() != null, o = ti(() => new dh({
		open: t,
		transitionStatus: void 0,
		onOpenChange: n,
		referenceElement: r.reference ?? null,
		floatingElement: r.floating ?? null,
		triggerElements: new Am(),
		floatingId: i,
		syncOnly: !1,
		nested: a
	})).current;
	return J(() => {
		let e = {
			open: t,
			floatingId: i
		};
		r.reference !== void 0 && (e.referenceElement = r.reference, e.domReferenceElement = jr(r.reference) ? r.reference : null), r.floating !== void 0 && (e.floatingElement = r.floating), o.update(e);
	}, [
		t,
		i,
		r.reference,
		r.floating,
		o
	]), o.context.onOpenChange = n, o.context.nested = a, o;
}
var Dh = o((() => {
	Zr(), El(), fi(), ii(), Th(), yp(), fh();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useFocus.mjs
function Oh(e, t = {}) {
	let { enabled: n = !0, delay: r } = t, { events: i, dataRef: a } = e.context, o = kh.useRef(!1), s = kh.useRef(null), c = kh.useRef(!0), l = Fl();
	kh.useEffect(() => {
		let t = e.select("domReferenceElement");
		if (!n) return;
		let r = Or(t);
		function i() {
			let t = e.select("domReferenceElement");
			!e.select("open") && Mr(t) && t === pu(Vi(t)) && (o.current = !0, s.current = t);
		}
		function a() {
			c.current = !0;
		}
		function l() {
			c.current = !1;
		}
		return Xu(Ju(r, "blur", i), Ah && Ju(r, "keydown", a, !0), Ah && Ju(r, "pointerdown", l, !0));
	}, [e, n]), kh.useEffect(() => {
		if (!n) return;
		function t(t) {
			if (t.reason === "trigger-press" || t.reason === "escape-key") {
				let t = e.select("domReferenceElement");
				jr(t) && (s.current = t, o.current = !0);
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
	let u = kh.useMemo(() => {
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
				let a = hu(n.nativeEvent);
				if (jr(a)) {
					if (Ah && !n.relatedTarget) {
						if (!c.current && !ku(a)) return;
					} else if (!Mu(a)) return;
				}
				let u = Eu(n.relatedTarget, e.context.triggerElements), { nativeEvent: d, currentTarget: f } = n;
				e.select("open") && u || !r ? e.setOpen(!0, Uc(Yc, d, f)) : l.start(r, () => {
					o.current || e.setOpen(!0, Uc(Yc, d, f));
				});
			},
			onBlur(n) {
				t();
				let r = n.relatedTarget, i = n.nativeEvent, o = jr(r) && r.hasAttribute(Ef("focus-guard")) && r.getAttribute("data-type") === "outside";
				l.start(0, () => {
					let t = e.select("domReferenceElement"), n = pu(Vi(t));
					!r && n === t || Q(a.current.floatingContext?.refs.floating.current, n) || Q(t, n) || o || Eu(r ?? n, e.context.triggerElements) || e.setOpen(!1, Uc(Yc, i));
				});
			}
		};
	}, [
		a,
		r,
		e,
		l
	]);
	return kh.useMemo(() => n ? {
		reference: u,
		trigger: u
	} : {}, [n, u]);
}
var kh, Ah, jh = o((() => {
	kh = /* @__PURE__ */ u(b(), 1), Yu(), au(), Zu(), Hi(), Rl(), Zr(), Df(), Pu(), Gc(), ml(), Ah = Yl && Ql;
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverInteractionSharedState.mjs
function Mh(e) {
	if (!e.performedPointerEventsMutation) return;
	let t = e.pointerEventsScopeElement;
	t && Ih.get(t) === e && (e.pointerEventsScopeElement?.style.removeProperty("pointer-events"), e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"), e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"), Ih.delete(t)), e.performedPointerEventsMutation = !1, e.pointerEventsScopeElement = null, e.pointerEventsReferenceElement = null, e.pointerEventsFloatingElement = null;
}
function Nh(e, t) {
	let { scopeElement: n, referenceElement: r, floatingElement: i } = t, a = Ih.get(n);
	a && a !== e && Mh(a), Mh(e), e.performedPointerEventsMutation = !0, e.pointerEventsScopeElement = n, e.pointerEventsReferenceElement = r, e.pointerEventsFloatingElement = i, Ih.set(n, e), n.style.pointerEvents = "none", r.style.pointerEvents = "auto", i.style.pointerEvents = "auto";
}
function Ph(e) {
	let t = e.context.dataRef.current, n = ti(() => t.hoverInteractionState ?? Fh.create()).current;
	return t.hoverInteractionState ||= n, Ml(t.hoverInteractionState.disposeEffect), t.hoverInteractionState;
}
var Fh, Ih, Lh = o((() => {
	Pl(), ii(), Rl(), lh(), Fh = class e {
		pointerType = void 0;
		interactedInside = !1;
		handler = void 0;
		blockMouseMove = !0;
		performedPointerEventsMutation = !1;
		pointerEventsScopeElement = null;
		pointerEventsReferenceElement = null;
		pointerEventsFloatingElement = null;
		restTimeoutPending = !1;
		openChangeTimeout = new Ll();
		restTimeout = new Ll();
		handleCloseOptions = void 0;
		static create() {
			return new e();
		}
		dispose = () => {
			this.openChangeTimeout.clear(), this.restTimeout.clear();
		};
		disposeEffect = () => this.dispose;
	}, Ih = /* @__PURE__ */ new WeakMap();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs
function Rh(e, t = {}) {
	let { enabled: n = !0, closeDelay: r = 0, nodeId: i } = t, a = e.useState("open"), o = e.useState("floatingElement"), s = e.useState("domReferenceElement"), { dataRef: c } = e.context, l = vp(), u = _p(), d = Ph(e), f = Fl(), p = q(() => Ru(c.current.openEvent?.type, d.interactedInside)), m = q(() => zu(c.current.openEvent?.type)), h = q(() => {
		Mh(d);
	});
	J(() => {
		a || (d.pointerType = void 0, d.restTimeoutPending = !1, d.interactedInside = !1, h());
	}, [
		a,
		d,
		h
	]), zh.useEffect(() => h, [h]), J(() => {
		if (n && a && d.handleCloseOptions?.blockPointerEvents && m() && jr(s) && o) {
			let e = s, t = o, n = Vi(o), r = l?.nodesRef.current.find((e) => e.id === u)?.context?.elements.floating;
			r && (r.style.pointerEvents = "");
			let i = d.pointerEventsScopeElement === t ? null : d.pointerEventsScopeElement, a = r === t ? null : r, c = d.handleCloseOptions?.getScope?.() ?? i ?? a ?? mu(e, "[data-rootownerid]") ?? n.body;
			return Nh(d, {
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
	]), zh.useEffect(() => {
		if (!n) return;
		function t() {
			return !!(l && u && Cf(l.nodesRef.current, u).length > 0);
		}
		function a(t) {
			let n = Iu(r, "close", d.pointerType), i = () => {
				e.setOpen(!1, Uc(Jc, t)), l?.events.emit("floating.closed", t);
			};
			n ? d.openChangeTimeout.start(n, i) : (d.openChangeTimeout.clear(), i());
		}
		function s(e) {
			let t = hu(e);
			Au(t) ? d.interactedInside = mu(t, "[aria-haspopup]") != null : d.interactedInside = !1;
		}
		function g() {
			d.openChangeTimeout.clear(), f.clear(), l?.events.off("floating.closed", v), h();
		}
		function _(n) {
			if (t() && l) {
				l.events.on("floating.closed", v);
				return;
			}
			if (Eu(n.relatedTarget, e.context.triggerElements)) return;
			let r = c.current.floatingContext?.nodeId ?? i, o = n.relatedTarget;
			l && r && jr(o) && Cf(l.nodesRef.current, r, !1).some((e) => Q(e.context?.elements.floating, o)) || (d.handler ? d.handler(n) : (h(), m() && !p() && a(n)));
		}
		function v(n) {
			l && u && !t() && f.start(0, () => {
				l.events.off("floating.closed", v), e.setOpen(!1, Uc(Jc, n)), l.events.emit("floating.closed", n);
			});
		}
		let y = o;
		return Xu(y && Ju(y, "mouseenter", g), y && Ju(y, "mouseleave", _), y && Ju(y, "pointerdown", s, !0), () => {
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
var zh, Bh = o((() => {
	zh = /* @__PURE__ */ u(b(), 1), Yu(), Zu(), fi(), Hi(), li(), Rl(), Zr(), Gc(), ml(), yp(), Pu(), Tf(), Lh(), Bu();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useHoverReferenceInteraction.mjs
function Vh(e, t = {}) {
	let { enabled: n = !0, delay: r = 0, handleClose: i = null, mouseOnly: a = !1, restMs: o = 0, move: s = !0, triggerElementRef: c = Wh, externalTree: l, isActiveTrigger: u = !0, getHandleCloseContext: d, isClosing: f, shouldOpen: p, guardStaleOpen: m = !1 } = t, { dataRef: h, events: g } = e.context, _ = vp(l), v = Ph(e), y = Hh.useRef(!1), b = Qu(i), x = Qu(r), S = Qu(o), C = Qu(n), w = Qu(p), T = Qu(f), E = q(() => Ru(h.current.openEvent?.type, v.interactedInside)), D = q(() => w.current?.() !== !1), O = q((t, n, r) => {
		let i = e.context.triggerElements;
		if (i.hasElement(n)) return !t || !Q(t, n);
		if (!jr(r)) return !1;
		let a = r;
		return i.hasMatchingElement((e) => Q(e, a)) && (!t || !Q(t, a));
	}), k = q(() => {
		v.handler &&= (Vi(e.select("domReferenceElement")).removeEventListener("mousemove", v.handler), void 0);
	}), A = q(() => {
		Mh(v);
	});
	return u && (v.handleCloseOptions = i?.__options), Hh.useEffect(() => k, [k]), Hh.useEffect(() => {
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
	]), Hh.useEffect(() => {
		if (!n) return;
		function t(t, n = !0) {
			let r = Iu(x.current, "close", v.pointerType);
			r ? v.openChangeTimeout.start(r, () => {
				e.setOpen(!1, Uc(Jc, t)), _?.events.emit("floating.closed", t);
			}) : n && (v.openChangeTimeout.clear(), e.setOpen(!1, Uc(Jc, t)), _?.events.emit("floating.closed", t));
		}
		let r = c.current ?? (u ? e.select("domReferenceElement") : null);
		if (!jr(r)) return;
		function i(t) {
			if (v.openChangeTimeout.clear(), v.blockMouseMove = !1, a && !uu(v.pointerType)) return;
			let n = Lu(S.current), r = Iu(x.current, "open", v.pointerType), i = hu(t), o = t.currentTarget ?? null, s = e.select("domReferenceElement"), c = o;
			if (jr(i) && !e.context.triggerElements.hasElement(i)) {
				for (let t of e.context.triggerElements.elements()) if (Q(t, i)) {
					c = t;
					break;
				}
			}
			jr(o) && jr(s) && !e.context.triggerElements.hasElement(o) && Q(o, s) && (c = s);
			let l = c != null && O(s, c, i), u = e.select("open"), d = T.current?.() ?? e.select("transitionStatus") === "ending", f = !u && d && y.current, p = !l && jr(c) && jr(s) && Q(s, c) && f, m = n > 0 && !r, h = l && (u || f) || p, g = !u || l;
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
			let r = Vi(e.select("domReferenceElement"));
			v.restTimeout.clear(), v.restTimeoutPending = !1;
			let i = h.current.floatingContext ?? d?.();
			if (!Eu(n.relatedTarget, e.context.triggerElements)) {
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
		let f = m ? Ju(r, "mouseout", l) : void 0;
		return s ? Xu(Ju(r, "mousemove", i, { once: !0 }), Ju(r, "mouseenter", i), Ju(r, "mouseleave", o), f) : Xu(Ju(r, "mouseenter", i), Ju(r, "mouseleave", o), f);
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
	]), Hh.useMemo(() => {
		if (!n) return;
		function t(e) {
			v.pointerType = e.pointerType;
		}
		return {
			onPointerDown: t,
			onPointerEnter: t,
			onMouseMove(t) {
				let { nativeEvent: n } = t, r = t.currentTarget, i = e.select("domReferenceElement"), o = e.select("open"), s = O(i, r, t.target);
				if (a && !uu(v.pointerType)) return;
				if (o && s && v.handleCloseOptions?.blockPointerEvents) {
					let t = e.select("floatingElement");
					if (t) {
						let e = v.handleCloseOptions?.getScope?.() ?? r.ownerDocument.body;
						Nh(v, {
							scopeElement: e,
							referenceElement: r,
							floatingElement: t
						});
					}
				}
				let c = Lu(S.current);
				if (o && !s || c === 0 || !s && v.restTimeoutPending && t.movementX ** 2 + t.movementY ** 2 < 2) return;
				v.restTimeout.clear();
				function l() {
					if (v.restTimeoutPending = !1, E()) return;
					let t = e.select("open");
					!v.blockMouseMove && (!t || s) && D() && e.setOpen(!0, Uc(Jc, n, r));
				}
				v.pointerType === "touch" ? Uh.flushSync(() => {
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
var Hh, Uh, Wh, Gh = o((() => {
	Hh = /* @__PURE__ */ u(b(), 1), Uh = /* @__PURE__ */ u(Os(), 1), Yu(), Zu(), Hi(), li(), ed(), Zr(), Gc(), ml(), yp(), Pu(), fu(), Lh(), Bu(), Wh = { current: null };
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useListNavigation.mjs
function Kh(e) {
	return Ql && e.movementX === 0 && e.movementY === 0;
}
function qh(e, t, n) {
	switch (e) {
		case "vertical": return t;
		case "horizontal": return n;
		default: return t || n;
	}
}
function Jh(e, t) {
	return qh(t, e === "ArrowUp" || e === "ArrowDown", e === "ArrowLeft" || e === "ArrowRight");
}
function Yh(e, t, n) {
	return qh(t, e === "ArrowDown", n ? e === "ArrowLeft" : e === "ArrowRight") || e === "Enter" || e === " " || e === "";
}
function Xh(e, t, n) {
	return qh(t, n ? e === yu : e === bu, e === Su);
}
function Zh(e, t, n, r) {
	return t === "both" || t === "horizontal" && r ? e === "Escape" : qh(t, n ? e === bu : e === yu, e === xu);
}
function Qh(e, t) {
	let { listRef: n, activeIndex: r, onNavigate: i = () => {}, enabled: a = !0, selectedIndex: o = null, allowEscape: s = !1, loopFocus: c = !1, nested: l = !1, rtl: u = !1, virtual: d = !1, focusItemOnOpen: f = "auto", focusItemOnHover: p = !0, openOnArrowKeyDown: m = !0, disabledIndices: h = void 0, orientation: g = "vertical", triggerOrientation: _ = g, parentOrientation: v, id: y, resetOnPointerLeave: b = !0, externalTree: x, nestedReturnFocusRef: S, grid: C } = t, w = C != null, T = e.useState("open"), E = e.useState("floatingElement"), D = e.useState("domReferenceElement"), O = e.context.dataRef, k = Nu(E), A = ju(D), j = Qu(k), M = _p(), N = vp(x), P = $h.useRef(f), F = $h.useRef(o ?? -1), I = $h.useRef(null), L = $h.useRef(!0), R = q((e) => {
		i(F.current === -1 ? null : F.current, e);
	}), z = $h.useRef(!!E), B = $h.useRef(T), V = $h.useRef(!1), H = $h.useRef(!1), ee = $h.useRef(null), te = Qu(h), U = Qu(T), ne = Qu(o), W = Qu(b), re = td(), G = td(), K = q(() => {
		re.cancel();
		function e(e) {
			d || (ee.current = Of(e, {
				sync: V.current,
				preventScroll: !0
			}));
		}
		let t = n.current[F.current], r = H.current;
		t && e(t), (V.current ? (e) => e() : (e) => re.request(e))(() => {
			let i = n.current[F.current] || t;
			i && (t || e(i), le && (r || !L.current) && i.scrollIntoView?.({
				block: "nearest",
				inline: "nearest"
			}));
		});
	});
	J(() => {
		O.current.orientation = g;
	}, [O, g]), J(() => {
		T || (I.current = null), T && f === "auto" || (P.current = f);
	}, [T, f]), J(() => {
		a && (T && E ? (F.current = o ?? -1, P.current && o != null && (H.current = !0, R())) : z.current && (F.current = -1, R()));
	}, [
		a,
		T,
		E,
		o,
		R
	]), J(() => {
		if (a) {
			if (!T) V.current = !1;
			else if (E) {
				if (r == null) {
					if (V.current = !1, ne.current != null) return;
					if (z.current && (F.current = -1, K()), (!B.current || !z.current) && P.current && (I.current != null || P.current === !0 && I.current == null)) {
						let e = 0, t = () => {
							n.current[0] == null ? (e < 2 && (e ? (e) => G.request(e) : queueMicrotask)(t), e += 1) : (F.current = I.current == null || Yh(I.current, _, u) || l ? Wd(n) : Gd(n), I.current = null, R());
						};
						t();
					}
				} else Ud(n.current, r) || (F.current = r, K(), H.current = !1);
			}
		}
	}, [
		a,
		T,
		E,
		r,
		ne,
		l,
		n,
		_,
		u,
		R,
		K,
		G
	]), J(() => {
		if (!a || E || !N || d || !z.current) return;
		let e = N.nodesRef.current, t = e.find((e) => e.id === M)?.context?.elements.floating, n = pu(Vi(D ?? t ?? null)), r = e.some((e) => e.context && Q(e.context.elements.floating, n));
		t && !r && L.current && t.focus({ preventScroll: !0 });
	}, [
		a,
		E,
		D,
		N,
		M,
		d
	]), J(() => {
		B.current = T, z.current = !!E;
	});
	let ie = r != null, ae = q((e) => {
		if (!U.current) return;
		let t = n.current.indexOf(e.currentTarget);
		t !== -1 && (F.current !== t || r !== t) && (F.current = t, R(e));
	}), oe = q(() => v ?? N?.nodesRef.current.find((e) => e.id === M)?.context?.dataRef?.current.orientation), se = q(() => Wd(n, te.current)), ce = q((t) => {
		if (L.current = !1, V.current = !0, t.which === 229 || !U.current && t.currentTarget === j.current) return;
		if (l && Zh(t.key, g, u, w)) {
			Jh(t.key, oe()) || ou(t), e.setOpen(!1, Uc(nl, t.nativeEvent));
			let n = S?.current ?? D;
			Mr(n) && n.focus();
			return;
		}
		r != null && r !== F.current && !Ud(n.current, r) && (F.current = r);
		let i = F.current, a = Wd(n, h), o = Gd(n, h);
		if (A || (t.key === "Home" && (ou(t), F.current = a, R(t)), t.key === "End" && (ou(t), F.current = o, R(t))), C != null) {
			let e = C(t, F.current, n, g, c, u, h, a, o);
			if (e != null && e !== F.current && (F.current = e, R(t)), g === "both") return;
		}
		if (Jh(t.key, g)) {
			ou(t);
			let e = pu(t.currentTarget.ownerDocument);
			if (T && !d && Q(t.currentTarget, e) && !n.current.some((t) => t != null && Q(t, e))) {
				F.current = Yh(t.key, g, u) ? a : o, R(t), r === F.current && K();
				return;
			}
			let { index: l, wrapped: f } = Kd(n.current, i, {
				decrement: !Yh(t.key, g, u),
				loopFocus: c,
				allowEscape: s,
				disabledIndices: h,
				minIndex: a,
				maxIndex: o
			});
			f && (V.current = !1), F.current = l, R(t);
		}
	}), le = $h.useMemo(() => ({
		onFocus(e) {
			V.current = !0, ae(e);
		},
		onClick({ currentTarget: e }) {
			d || e.focus({ preventScroll: !0 });
		},
		onMouseMove(e) {
			Kh(e) || (V.current = !0, H.current = !1, p && ae(e));
		},
		onPointerLeave(e) {
			if (!U.current || !L.current || e.pointerType === "touch") return;
			V.current = !0;
			let t = e.relatedTarget;
			if (p && !n.current.includes(t) && W.current && (ee.current?.(), ee.current = null, F.current = -1, R(e), !d)) {
				let e = j.current, t = pu(Vi(e));
				e && Q(e, t) && e.focus({ preventScroll: !0 });
			}
		}
	}), [
		ae,
		U,
		j,
		p,
		n,
		R,
		W,
		d
	]), ue = $h.useMemo(() => d && T && ie && { "aria-activedescendant": `${y}-${r}` }, [
		d,
		T,
		ie,
		y,
		r
	]), de = $h.useMemo(() => ({
		...A ? {} : ue,
		onKeyDown(t) {
			if (t.key === "Tab" && t.shiftKey && T && !d) {
				let n = hu(t.nativeEvent);
				if (n && !Q(j.current, n)) return;
				ou(t);
				let r = Uc($c, t.nativeEvent);
				e.setOpen(!1, r);
				let i = S?.current ?? D;
				!r.isCanceled && Mr(i) && i.focus();
			} else ce(t);
		},
		onPointerMove(e) {
			Kh(e) || (L.current = !0);
		}
	}), [
		ue,
		ce,
		j,
		A,
		e,
		T,
		d,
		D,
		S
	]), fe = $h.useMemo(() => {
		function t(t) {
			e.setOpen(!0, Uc(nl, t.nativeEvent, t.currentTarget));
		}
		function n(e) {
			f === "auto" && cu(e.nativeEvent) && (P.current = !d);
		}
		function r(e) {
			P.current = f, f === "auto" && lu(e.nativeEvent) && (P.current = !0);
		}
		return {
			onKeyDown(n) {
				let r = e.select("open");
				L.current = !1;
				let i = n.key.startsWith("Arrow"), a = Xh(n.key, oe(), u), o = Jh(n.key, r ? g : _), s = (l ? a : o) || n.key === "Enter" || n.key.trim() === "";
				if (d && r && (!l || ku(n.currentTarget))) return ce(n);
				if (r || m || !i) {
					if (s) {
						let e = Jh(n.key, oe());
						I.current = l && e ? null : n.key;
					}
					l ? a && (ou(n), r ? (F.current = se(), R(n), d && j.current?.focus()) : t(n)) : o && (ne.current != null && (F.current = ne.current), ou(n), !r && m ? t(n) : ce(n), r && R(n));
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
		ce,
		f,
		se,
		l,
		R,
		e,
		m,
		g,
		_,
		oe,
		u,
		ne,
		d,
		j
	]), pe = $h.useMemo(() => ({
		...ue,
		...fe
	}), [ue, fe]);
	return $h.useMemo(() => a ? {
		reference: pe,
		floating: de,
		item: le,
		trigger: fe
	} : {}, [
		a,
		pe,
		de,
		fe,
		le
	]);
}
var $h, eg = o((() => {
	$h = /* @__PURE__ */ u(b(), 1), od(), fi(), Hi(), li(), ed(), au(), Zr(), Gc(), ml(), yp(), Zd(), Cu(), Pu(), Af(), fu();
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useTypeahead.mjs
function tg(e, t) {
	let { listRef: n, elementsRef: r, activeIndex: i, onMatch: a, disabledIndices: o, onTyping: s, enabled: c = !0, resetMs: l = 750, selectedIndex: u = null } = t, d = q(s), f = e.useState("open"), p = Fl(), m = ng.useRef(""), h = ng.useRef(u ?? i ?? -1), g = ng.useRef(null), _ = q((e) => {
		function t(e) {
			return r?.current[e];
		}
		function s(e) {
			let n = t(e);
			return n && !Xd(n) || n?.matches(":disabled") ? !1 : o == null || !Jd(ua, e, o);
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
		if (m.current.length > 0 && e.key === " " && (ou(e), d?.(!0)), m.current.length > 0 && m.current[0] !== " " && c(_, m.current) === -1 && e.key !== " " && d?.(!1), _ == null || e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		f && e.key !== " " && (ou(e), d?.(!0));
		let v = m.current === "";
		v && (h.current = u ?? i ?? -1), _.every((e, t) => e && s(t) ? e[0]?.toLowerCase() !== e[1]?.toLowerCase() : !0) && m.current === e.key && (m.current = "", h.current = g.current), m.current += e.key, p.start(l, () => {
			m.current = "", h.current = g.current, d?.(!1);
		});
		let y = ((v ? u ?? i ?? -1 : h.current) ?? 0) + 1, b = c(_, m.current, y);
		b === -1 ? e.key !== " " && (m.current = "", d?.(!1)) : (a?.(b, e), g.current = b);
	}), v = q((t) => {
		let n = t.relatedTarget, r = e.select("domReferenceElement"), i = e.select("floatingElement");
		Q(r, n) || Q(i, n) || (p.clear(), m.current = "", h.current = g.current, d?.(!1));
	});
	J(() => {
		(f || u === null) && (p.clear(), g.current = null, m.current !== "" && (m.current = "", d?.(!1)));
	}, [
		f,
		u,
		p,
		d
	]);
	let y = ng.useMemo(() => ({
		onKeyDown: _,
		onBlur: v
	}), [_, v]);
	return ng.useMemo(() => c ? {
		reference: y,
		floating: y
	} : {}, [c, y]);
}
var ng, rg = o((() => {
	ng = /* @__PURE__ */ u(b(), 1), fi(), li(), Rl(), fa(), Zd(), Pu(), fu();
}));
// node_modules/@base-ui/react/floating-ui-react/safePolygon.mjs
function ig(e, t, n, r, i, a) {
	return r >= t != a >= t && e <= (i - n) * (t - r) / (a - r) + n;
}
function ag(e, t, n, r, i, a, o, s, c, l) {
	let u = !1;
	return ig(e, t, n, r, i, a) && (u = !u), ig(e, t, i, a, o, s) && (u = !u), ig(e, t, o, s, c, l) && (u = !u), ig(e, t, c, l, n, r) && (u = !u), u;
}
function og(e, t, n) {
	return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
}
function sg(e, t, n, r, i, a) {
	return e >= Math.min(n, i) && e <= Math.max(n, i) && t >= Math.min(r, a) && t <= Math.max(r, a);
}
function cg(e = {}) {
	let { blockPointerEvents: t = !1 } = e, n = new Ll(), r = ({ x: e, y: t, placement: r, elements: i, onClose: a, nodeId: o, tree: s }) => {
		let c = r?.split("-")[0], l = !1, u = null, d = null, f = typeof performance < "u" ? performance.now() : 0;
		function p(e, t) {
			let n = performance.now(), r = n - f;
			if (u === null || d === null || r === 0) return u = e, d = t, f = n, !1;
			let i = e - u, a = t - d, o = i * i + a * a, s = r * r * ug;
			return u = e, d = t, f = n, o < s;
		}
		function m() {
			n.clear(), a();
		}
		return function(r) {
			n.clear();
			let a = i.domReference, u = i.floating;
			if (!a || !u || c == null || e == null || t == null) return;
			let { clientX: d, clientY: f } = r, h = hu(r), g = r.type === "mouseleave", _ = Q(u, h), v = Q(a, h);
			if (_ && (l = !0, !g)) return;
			if (v && (l = !1, !g)) {
				l = !0;
				return;
			}
			if (g && jr(r.relatedTarget) && Q(u, r.relatedTarget)) return;
			function y() {
				return !!(s && Cf(s.nodesRef.current, o).length > 0);
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
					j = sg(d, f, D, x.top + 1, O, S.bottom - 1);
					break;
				case "bottom":
					j = sg(d, f, D, S.top + 1, O, x.bottom - 1);
					break;
				case "left":
					j = sg(d, f, S.right - 1, A, x.left + 1, k);
					break;
				case "right": j = sg(d, f, x.right - 1, A, S.left + 1, k);
			}
			if (j) return;
			if (l && !og(d, f, x) || !g && p(d, f)) {
				b();
				return;
			}
			let M = !1;
			switch (c) {
				case "top": {
					let n = T ? dg / 2 : dg * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t + dg + 1, o = C || T ? S.bottom - dg : S.top, s = C ? T ? S.bottom - dg : S.top : S.bottom - dg;
					M = ag(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "bottom": {
					let n = T ? dg / 2 : dg * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t - dg, o = C || T ? S.top + dg : S.bottom, s = C ? T ? S.top + dg : S.bottom : S.top + dg;
					M = ag(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "left": {
					let n = E ? dg / 2 : dg * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e + dg + 1, o = w || E ? S.right - dg : S.left, s = w ? E ? S.right - dg : S.left : S.right - dg;
					M = ag(d, f, o, S.top, s, S.bottom, a, r, a, i);
					break;
				}
				case "right": {
					let n = E ? dg / 2 : dg * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e - dg, o = w || E ? S.left + dg : S.right, s = w ? E ? S.left + dg : S.right : S.left + dg;
					M = ag(d, f, a, r, a, i, o, S.top, s, S.bottom);
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
var lg, ug, dg, fg = o((() => {
	Zr(), Rl(), Pu(), Tf(), lg = .1, ug = lg * lg, dg = .5;
}));
// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function pg(e, t, n) {
	let { reference: r, floating: i } = e, a = xd(t), o = Sd(t), s = bd(o), c = _d(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = vd(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function mg(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = gd(t, e), p = Ad(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = jd(await i.getClippingRect({
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
	}, y = jd(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
async function hg(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = _d(n), s = vd(n), c = xd(n) === "y", l = yg.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = gd(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var gg, _g, vg, yg, bg, xg, Sg, Cg, wg = o((() => {
	Hd(), gg = 50, _g = async (e, t, n) => {
		let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
			...o,
			detectOverflow: mg
		}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}), { x: u, y: d } = pg(l, r, c), f = r, p = 0, m = {};
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
			}, x && p < gg && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
				reference: e,
				floating: t,
				strategy: i
			}) : x.rects), {x: u, y: d} = pg(l, f, c)), n = -1);
		}
		return {
			x: u,
			y: d,
			placement: f,
			strategy: i,
			middlewareData: m
		};
	}, vg = function(e) {
		return e === void 0 && (e = {}), {
			name: "flip",
			options: e,
			async fn(t) {
				var n;
				let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = gd(e, t);
				if ((n = i.arrow) != null && n.alignmentOffset) return {};
				let g = _d(r), _ = xd(o), v = _d(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Od(o)] : wd(o)), x = p !== "none";
				!d && x && b.push(...Dd(o, m, p, y));
				let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
				if (l && w.push(C[g]), u) {
					let e = Cd(r, a, y);
					w.push(C[e[0]], C[e[1]]);
				}
				if (T = [...T, {
					placement: r,
					overflows: w
				}], !w.every((e) => e <= 0)) {
					let e = (i.flip?.index || 0) + 1, t = S[e];
					if (t && (u !== "alignment" || _ === xd(t) || T.every((e) => xd(e.placement) !== _ || e.overflows[0] > 0))) return {
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
									let t = xd(e.placement);
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
	}, yg = /*#__PURE__*/ new Set(["left", "top"]), bg = function(e) {
		return e === void 0 && (e = 0), {
			name: "offset",
			options: e,
			async fn(t) {
				var n;
				let { x: r, y: i, placement: a, middlewareData: o } = t, s = await hg(t, e);
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
	}, xg = function(e) {
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
				} }, ...l } = gd(e, t), u = {
					x: n,
					y: r
				}, d = await a.detectOverflow(t, l), f = xd(i), p = yd(f), m = u[p], h = u[f], g = (e, t) => hd(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
	}, Sg = function(e) {
		return e === void 0 && (e = {}), {
			options: e,
			fn(t) {
				let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = gd(e, t), u = {
					x: n,
					y: r
				}, d = xd(i), f = yd(d), p = u[f], m = u[d], h = gd(s, t), g = typeof h == "number" ? {
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
					let e = f === "y" ? "width" : "height", t = yg.has(_d(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
					m < n ? m = n : m > r && (m = r);
				}
				return {
					[f]: p,
					[d]: m
				};
			}
		};
	}, Cg = function(e) {
		return e === void 0 && (e = {}), {
			name: "size",
			options: e,
			async fn(t) {
				let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = gd(e, t), c = await i.detectOverflow(t, s), l = _d(n), u = vd(n), d = xd(n) === "y", { width: f, height: p } = r.floating, m, h;
				l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
				let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = Md(p - c[m], g), y = Md(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
				b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * Nd(c.left, c.right) : S = p - 2 * Nd(c.top, c.bottom)), await o({
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
function Tg(e) {
	let t = Vr(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Mr(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Pd(n) !== a || Pd(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Eg(e) {
	return jr(e) ? e : e.contextElement;
}
function Dg(e) {
	let t = Eg(e);
	if (!Mr(t)) return Id(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Tg(t), o = (a ? Pd(n.width) : n.width) / r, s = (a ? Pd(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
function Og(e) {
	let t = Or(e);
	return !zr() || !t.visualViewport ? Xg : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function kg(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Or(e);
}
function Ag(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Eg(e), o = Id(1);
	t && (r ? jr(r) && (o = Dg(r)) : o = Dg(e));
	let s = kg(a, n, r) ? Og(a) : Id(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Or(a), t = jr(r) ? Or(r) : r, n = e, i = Kr(n);
		for (; i && t !== n;) {
			let e = Dg(i), t = i.getBoundingClientRect(), r = Vr(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Or(i), i = Kr(n);
		}
	}
	return jd({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function jg(e, t) {
	let n = Hr(e).scrollLeft;
	return t ? t.left + n : Ag(kr(e)).left + n;
}
function Mg(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - jg(e, n),
		y: n.top + t.scrollTop
	};
}
function Ng(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = kr(r), s = t ? Ir(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Id(1), u = Id(0), d = Mr(r);
	if ((d || !a) && ((Dr(r) !== "body" || Pr(o)) && (c = Hr(r)), d)) {
		let e = Ag(r);
		l = Dg(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Mg(o, c) : Id(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Pg(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Fg(e) {
	let t = Hr(e), n = e.ownerDocument.body, r = Nd(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = Nd(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + jg(e), o = -t.scrollTop;
	return Vr(n).direction === "rtl" && (a += Nd(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
function Ig(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Or(e), a = kr(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !zr() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (jg(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Zg && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Lg(e, t) {
	let n = Ag(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Dg(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Rg(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Ig(e, n, t);
	else if (t === "document") r = Fg(kr(e));
	else if (jr(t)) r = Lg(t, n);
	else {
		let n = Og(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return jd(r);
}
function zg(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Gr(e, [], !1).filter((e) => jr(e) && Dr(e) !== "body"), i = null, a = Vr(e).position === "fixed", o = a ? Ur(e) : e;
	for (; jr(o) && !Br(o);) {
		let e = Vr(o), t = Lr(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Ur(o);
	}
	return t.set(e, r), r;
}
function Bg(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Ir(t) ? [] : zg(t, this._c) : [].concat(n), r], o = Rg(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Rg(t, a[e], i);
		s = Nd(n.top, s), c = Md(n.right, c), l = Md(n.bottom, l), u = Nd(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Vg(e) {
	let { width: t, height: n } = Tg(e);
	return {
		width: t,
		height: n
	};
}
function Hg(e, t, n) {
	let r = Mr(t), i = kr(t), a = n === "fixed", o = Ag(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Id(0);
	if ((r || !a) && ((Dr(t) !== "body" || Pr(i)) && (s = Hr(t)), r)) {
		let e = Ag(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = jg(i));
	let l = i && !r && !a ? Mg(i, s) : Id(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Ug(e) {
	return Vr(e).position === "static";
}
function Wg(e, t) {
	if (!Mr(e) || Vr(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return kr(e) === n && (n = n.ownerDocument.body), n;
}
function Gg(e, t) {
	let n = Or(e);
	if (Ir(e)) return n;
	if (!Mr(e)) {
		let t = Ur(e);
		for (; t && !Br(t);) {
			if (jr(t) && !Ug(t)) return t;
			t = Ur(t);
		}
		return n;
	}
	let r = Wg(e, t);
	for (; r && Fr(r) && Ug(r);) r = Wg(r, t);
	return r && Br(r) && Ug(r) && !Lr(r) ? n : r || Rr(e) || n;
}
function Kg(e) {
	return Vr(e).direction === "rtl";
}
function qg(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Jg(e, t, n) {
	let r = null, i, a = kr(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Fd(d), h = Fd(a.clientWidth - (u + f)), g = Fd(a.clientHeight - (d + p)), _ = Fd(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Nd(0, Md(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!qg(l, e.getBoundingClientRect())) return s();
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
	let c = Or(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Yg(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Eg(e), u = i || a ? [...l ? Gr(l) : [], ...t ? Gr(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Jg(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Ag(e) : null;
	c && g();
	function g() {
		let t = Ag(e);
		h && !qg(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Xg, Zg, Qg, $g, e_, t_, n_, r_, i_, a_, o_ = o((() => {
	wg(), Hd(), Zr(), Xg = /*#__PURE__*/ Id(0), Zg = 25, Qg = async function(e) {
		let t = this.getOffsetParent || Gg, n = this.getDimensions, r = await n(e.floating);
		return {
			reference: Hg(e.reference, await t(e.floating), e.strategy),
			floating: {
				x: 0,
				y: 0,
				width: r.width,
				height: r.height
			}
		};
	}, $g = {
		convertOffsetParentRelativeRectToViewportRelativeRect: Ng,
		getDocumentElement: kr,
		getClippingRect: Bg,
		getOffsetParent: Gg,
		getElementRects: Qg,
		getClientRects: Pg,
		getDimensions: Vg,
		getScale: Dg,
		isElement: jr,
		isRTL: Kg
	}, e_ = bg, t_ = xg, n_ = vg, r_ = Cg, i_ = Sg, a_ = (e, t, n) => {
		let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
			...$g,
			...i.platform,
			_c: r
		};
		return _g(e, t, {
			...i,
			platform: a
		});
	};
}));
// node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
function s_(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!s_(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !s_(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function c_(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function l_(e, t) {
	let n = c_(e);
	return Math.round(t * n) / n;
}
function u_(e) {
	let t = f_.useRef(e);
	return h_(() => {
		t.current = e;
	}), t;
}
function d_(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = f_.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = f_.useState(r);
	s_(f, r) || p(r);
	let [m, h] = f_.useState(null), [g, _] = f_.useState(null), v = f_.useCallback((e) => {
		e !== S.current && (S.current = e, h(e));
	}, []), y = f_.useCallback((e) => {
		e !== C.current && (C.current = e, _(e));
	}, []), b = a || m, x = o || g, S = f_.useRef(null), C = f_.useRef(null), w = f_.useRef(u), T = c != null, E = u_(c), D = u_(i), O = u_(l), k = f_.useCallback(() => {
		if (!S.current || !C.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		D.current && (e.platform = D.current), a_(S.current, C.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: O.current !== !1
			};
			A.current && !s_(w.current, t) && (w.current = t, m_.flushSync(() => {
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
	h_(() => {
		l === !1 && w.current.isPositioned && (w.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let A = f_.useRef(!1);
	h_(() => (A.current = !0, () => {
		A.current = !1;
	}), []), h_(() => {
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
	let j = f_.useMemo(() => ({
		reference: S,
		floating: C,
		setReference: v,
		setFloating: y
	}), [v, y]), M = f_.useMemo(() => ({
		reference: b,
		floating: x
	}), [b, x]), N = f_.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!M.floating) return e;
		let t = l_(M.floating, u.x), r = l_(M.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...c_(M.floating) >= 1.5 && { willChange: "transform" }
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
	return f_.useMemo(() => ({
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
var f_, p_, m_, h_, g_, __, v_, y_, b_, x_ = o((() => {
	o_(), f_ = /* @__PURE__ */ u(b(), 1), p_ = /* @__PURE__ */ u(b(), 1), m_ = /* @__PURE__ */ u(Os(), 1), h_ = typeof document < "u" ? p_.useLayoutEffect : function() {}, g_ = (e, t) => {
		let n = e_(e);
		return {
			name: n.name,
			fn: n.fn,
			options: [e, t]
		};
	}, __ = (e, t) => {
		let n = t_(e);
		return {
			name: n.name,
			fn: n.fn,
			options: [e, t]
		};
	}, v_ = (e, t) => ({
		fn: i_(e).fn,
		options: [e, t]
	}), y_ = (e, t) => {
		let n = n_(e);
		return {
			name: n.name,
			fn: n.fn,
			options: [e, t]
		};
	}, b_ = (e, t) => {
		let n = r_(e);
		return {
			name: n.name,
			fn: n.fn,
			options: [e, t]
		};
	};
})), S_ = o((() => {
	qu(), Np(), ap(), yp(), lp(), Ip(), Vp(), Kp(), Dh(), Xp(), jh(), Bh(), Gh(), eg(), rg(), fg(), x_();
}));
// node_modules/@base-ui/react/dialog/portal/DialogPortalContext.mjs
function C_() {
	let e = w_.useContext(T_);
	if (e === void 0) throw Error(Mi(26));
	return e;
}
var w_, T_, E_ = o((() => {
	Ni(), w_ = /* @__PURE__ */ u(b(), 1), T_ = /*#__PURE__*/ w_.createContext(void 0);
}));
// node_modules/@base-ui/react/internals/composite/composite.mjs
function D_(e) {
	return Mr(e) && e.tagName === "INPUT";
}
function O_(e) {
	return !!(D_(e) && e.selectionStart != null || Mr(e) && e.tagName === "TEXTAREA");
}
function k_(e, t, n, r) {
	if (!e || !t || !t.scrollTo) return;
	let i = e.scrollLeft, a = e.scrollTop, o = e.clientWidth < e.scrollWidth, s = e.clientHeight < e.scrollHeight;
	if (o && r !== "vertical") {
		let r = A_(e, t, "left"), a = j_(e), o = j_(t);
		n === "ltr" && (r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight ? i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight : r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft && (i = r - o.scrollMarginLeft - a.scrollPaddingLeft)), n === "rtl" && (r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft ? i = r - o.scrollMarginLeft - a.scrollPaddingLeft : r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight && (i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight));
	}
	if (s && r !== "horizontal") {
		let n = A_(e, t, "top"), r = j_(e), i = j_(t);
		n - i.scrollMarginTop < e.scrollTop + r.scrollPaddingTop ? a = n - i.scrollMarginTop - r.scrollPaddingTop : n + t.offsetHeight + i.scrollMarginBottom > e.scrollTop + e.clientHeight - r.scrollPaddingBottom && (a = n + t.offsetHeight + i.scrollMarginBottom - e.clientHeight + r.scrollPaddingBottom);
	}
	e.scrollTo({
		left: i,
		top: a,
		behavior: "auto"
	});
}
function A_(e, t, n) {
	let r = n === "left" ? "offsetLeft" : "offsetTop", i = 0;
	for (; t.offsetParent && (i += t[r], t.offsetParent !== e);) t = t.offsetParent;
	return i;
}
function j_(e) {
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
var M_, N_, P_, F_, I_, L_, R_, z_, B_ = o((() => {
	Zr(), lh(), M_ = "ArrowUp", N_ = "ArrowDown", P_ = "ArrowLeft", F_ = "ArrowRight", I_ = "Home", L_ = /* @__PURE__ */ new Set([
		M_,
		N_,
		P_,
		F_,
		I_,
		"End"
	]), R_ = "Shift", z_ = [
		R_,
		"Control",
		"Alt",
		"Meta"
	];
})), V_, H_ = o((() => {
	V_ = "--nested-dialogs";
})), U_, W_ = o((() => {
	Rc(), U_ = "data-nested-dialog-open";
})), G_, K_ = o((() => {
	xc(), Rc(), W_(), G_ = {
		...Ic,
		...bc,
		nestedDialogOpen(e) {
			return e ? { [U_]: "" } : null;
		}
	};
})), q_, J_, Y_, X_ = o((() => {
	q_ = /* @__PURE__ */ u(b(), 1), S_(), mc(), Oa(), E_(), lm(), B_(), Th(), H_(), K_(), J_ = bs(), Y_ = /*#__PURE__*/ q_.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, finalFocus: a, initialFocus: o, ...s } = e, c = dc(), l = c.useState("descriptionElementId"), u = c.useState("disablePointerDismissal"), d = c.useState("floatingRootContext"), f = c.useState("popupProps"), p = c.useState("modal"), m = c.useState("mounted"), h = c.useState("nested"), g = c.useState("nestedOpenDialogCount"), _ = c.useState("open"), v = c.useState("openMethod"), y = c.useState("titleElementId"), b = c.useState("transitionStatus"), x = c.useState("role"), S = d.useState("floatingId");
		C_(), sm({
			open: _,
			ref: c.context.popupRef,
			onComplete() {
				_ && c.context.onOpenChangeComplete?.(!0);
			}
		});
		let C = o === void 0 ? pm(c.context.popupRef) : o, w = g > 0, T = c.useStateSetter("popupElement"), E = ya("div", e, {
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
					...Om,
					hidden: !m,
					onKeyDown(e) {
						L_.has(e.key) && e.stopPropagation();
					},
					style: { [V_]: g }
				},
				s
			],
			ref: [
				t,
				c.context.popupRef,
				T
			],
			stateAttributesMapping: G_
		});
		return /*#__PURE__*/ (0, J_.jsx)(Op, {
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
function Z_(e) {
	return ra(19) ? e : e ? "true" : void 0;
}
var Q_ = o((() => {
	aa();
})), $_, ev, tv, nv = o((() => {
	$_ = /* @__PURE__ */ u(b(), 1), ev = bs(), tv = /*#__PURE__*/ $_.forwardRef(function(e, t) {
		let { cutout: n, ...r } = e, i;
		if (n) {
			let e = n.getBoundingClientRect();
			i = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${e.left}px ${e.top}px,${e.left}px ${e.bottom}px,${e.right}px ${e.bottom}px,${e.right}px ${e.top}px,${e.left}px ${e.top}px)`;
		}
		return /*#__PURE__*/ (0, ev.jsx)("div", {
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
})), rv, iv, av, ov = o((() => {
	rv = /* @__PURE__ */ u(b(), 1), Q_(), S_(), mc(), E_(), nv(), iv = bs(), av = /*#__PURE__*/ rv.forwardRef(function(e, t) {
		let { keepMounted: n = !1, ...r } = e, i = dc(), a = i.useState("mounted"), o = i.useState("modal"), s = i.useState("open");
		return a || n ? /*#__PURE__*/ (0, iv.jsx)(T_.Provider, {
			value: n,
			children: /*#__PURE__*/ (0, iv.jsxs)(ip, {
				ref: t,
				...r,
				children: [a && o === !0 && /*#__PURE__*/ (0, iv.jsx)(tv, {
					ref: i.context.internalBackdropRef,
					inert: Z_(!s)
				}), e.children]
			})
		}) : null;
	});
}));
// node_modules/@base-ui/utils/useScrollLock.mjs
function sv(e, t) {
	return Pr(e) ? e : t;
}
function cv(e, t, n) {
	return /hidden|clip/.test(e.getComputedStyle(sv(t, n)).overflowY);
}
function lv(e) {
	if (typeof document > "u") return !1;
	let t = Vi(e);
	return Or(t).innerWidth - t.documentElement.clientWidth > 0;
}
function uv(e) {
	if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u") return !1;
	let t = Vi(e), n = t.documentElement, r = t.body, i = sv(n, r), a = i.style.overflowY, o = n.style.scrollbarGutter;
	n.style.scrollbarGutter = "stable", i.style.overflowY = "scroll";
	let s = i.offsetWidth;
	i.style.overflowY = "hidden";
	let c = i.offsetWidth;
	return i.style.overflowY = a, n.style.scrollbarGutter = o, s === c;
}
function dv(e) {
	let t = Vi(e), n = t.documentElement, r = t.body, i = sv(n, r), a = {
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
function fv(e) {
	let t = Vi(e), n = t.documentElement, r = t.body, i = Or(n), a = 0, o = 0, s = !1, c = ad.create();
	if (Ql && (i.visualViewport?.scale ?? 1) !== 1) return () => {};
	function l() {
		let t = i.getComputedStyle(n), c = i.getComputedStyle(r), l = (t.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
		a = n.scrollTop, o = n.scrollLeft, mv = {
			scrollbarGutter: n.style.scrollbarGutter,
			overflowY: n.style.overflowY,
			overflowX: n.style.overflowX
		}, gv = n.style.scrollBehavior, hv = {
			position: r.style.position,
			height: r.style.height,
			width: r.style.width,
			boxSizing: r.style.boxSizing,
			overflowY: r.style.overflowY,
			overflowX: r.style.overflowX,
			scrollBehavior: r.style.scrollBehavior
		};
		let u = n.scrollHeight > n.clientHeight, d = n.scrollWidth > n.clientWidth, f = t.overflowY === "scroll" || c.overflowY === "scroll", p = t.overflowX === "scroll" || c.overflowX === "scroll", m = Math.max(0, i.innerWidth - r.clientWidth), h = Math.max(0, i.innerHeight - r.clientHeight), g = parseFloat(c.marginTop) + parseFloat(c.marginBottom), _ = parseFloat(c.marginLeft) + parseFloat(c.marginRight), v = sv(n, r);
		s = uv(e), s ? (n.style.scrollbarGutter = l, v.style.overflowY = "hidden", v.style.overflowX = "hidden") : (Object.assign(n.style, {
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
		Object.assign(n.style, mv), Object.assign(r.style, hv), s || (n.scrollTop = a, n.scrollLeft = o, n.removeAttribute("data-base-ui-scroll-locked"), n.style.scrollBehavior = gv);
	}
	function d() {
		u(), c.request(l);
	}
	l();
	let f = Ju(i, "resize", d);
	return () => {
		c.cancel(), u(), typeof i.removeEventListener == "function" && f();
	};
}
function pv(e = !0, t = null) {
	J(() => {
		if (e) return vv.acquire(t);
	}, [e, t]);
}
var mv, hv, gv, _v, vv, yv = o((() => {
	Zr(), Yu(), au(), Hi(), fi(), Rl(), od(), mv = {}, hv = {}, gv = "", _v = class {
		lockCount = 0;
		restore = null;
		timeoutLock = Ll.create();
		timeoutUnlock = Ll.create();
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
			let t = Vi(e), n = t.documentElement, r = t.body, i = Or(n);
			if (cv(i, n, r)) {
				let t = new i.MutationObserver(() => {
					cv(i, n, r) || (t.disconnect(), this.restore = null, this.lock(e));
				}), a = { attributes: !0 };
				t.observe(n, a), t.observe(r, a), this.restore = () => t.disconnect();
				return;
			}
			let a = Kl || !lv(e);
			this.restore = a ? dv(e) : fv(e);
		}
	}, vv = new _v();
}));
// node_modules/@base-ui/react/dialog/root/useDialogRoot.mjs
function bv({ store: e, parentContext: t, isDrawer: n }) {
	let r = e.useState("open"), i = e.useState("mounted"), a = e.useState("disablePointerDismissal"), o = e.useState("modal"), s = e.useState("popupElement"), c = e.useState("floatingRootContext"), [l, u] = xv.useState(0), [d, f] = xv.useState(0), p = l === 0, m = Wp(c, {
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
			let n = hu(t);
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
	return pv(r && o === !0, s), e.useContextCallback("onNestedDialogOpen", (t, n) => {
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
	]), wm(e, {
		activeTriggerProps: m.reference,
		inactiveTriggerProps: m.trigger,
		popupProps: m.floating,
		nestedOpenDialogCount: l,
		nestedOpenDrawerCount: d
	}), null;
}
var xv, Sv = o((() => {
	xv = /* @__PURE__ */ u(b(), 1), fi(), yv(), S_(), lh(), Th();
}));
// node_modules/@base-ui/react/dialog/store/DialogStore.mjs
function Cv(e, t, n, r = !1) {
	return {
		...ph(t, n, r),
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
function wv(e) {
	return {
		popupRef: /*#__PURE__*/ Tv.createRef(),
		backdropRef: /*#__PURE__*/ Tv.createRef(),
		internalBackdropRef: /*#__PURE__*/ Tv.createRef(),
		outsidePressEnabledRef: { current: !0 },
		triggerElements: e,
		onOpenChange: void 0,
		onOpenChangeComplete: void 0
	};
}
var Tv, Ev, Dv, Ov = o((() => {
	Tv = /* @__PURE__ */ u(b(), 1), ch(), Th(), Ev = {
		...yh,
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
	}, Dv = class extends ah {
		constructor(e, t, n) {
			let r = new Am(), i = Cv(e, r, t, n);
			super(i, wv(r), Ev);
		}
		setOpen = (e, t) => {
			t.preventUnmountOnClose = () => {
				this.set("preventUnmountingOnClose", !0);
			}, !e && t.trigger == null && this.state.activeTriggerId != null && (t.trigger = this.state.activeTriggerElement ?? void 0), this.context.onOpenChange?.(e, t), t.isCanceled || (this.state.floatingRootContext.dispatchOpenChange(e, t), this.update(vm(this.state, e, t.trigger)));
		};
	};
}));
// node_modules/@base-ui/react/dialog/root/useRenderDialogRoot.mjs
function kv(e, t) {
	let { children: n, open: r, defaultOpen: i = !1, onOpenChange: a, onOpenChangeComplete: o, disablePointerDismissal: s = !1, modal: c = !0, actionsRef: l, handle: u, triggerId: d, defaultTriggerId: f = null } = t, p = e === "drawer", m = e === "alert-dialog", h = m ? !0 : c, g = m || s, _ = m ? "alertdialog" : "dialog", v = dc(!0), y = {
		modal: h,
		disablePointerDismissal: g,
		nested: v != null,
		role: _
	}, b = mm((e, t) => new Dv({
		open: i,
		openProp: r,
		activeTriggerId: f,
		triggerIdProp: d,
		...y
	}, e, t), !0);
	b.useControlledProp("openProp", r), b.useControlledProp("triggerIdProp", d), b.useSyncedValues(y), b.useContextCallback("onOpenChange", a), b.useContextCallback("onOpenChangeComplete", o);
	let x = b.useState("open"), S = b.useState("mounted"), C = b.useState("payload");
	Tm(b, x), Sm(b);
	let { forceUnmount: w } = Cm(x, b);
	Av.useImperativeHandle(l, () => ({
		unmount: w,
		close: () => b.setOpen(!1, Uc(ul))
	}), [w, b]);
	let T = x || S || u != null;
	return /*#__PURE__*/ (0, jv.jsxs)(pc.Provider, {
		value: b,
		children: [
			u && /*#__PURE__*/ (0, jv.jsx)(hm, {
				handle: u,
				store: b
			}),
			T && /*#__PURE__*/ (0, jv.jsx)(bv, {
				store: b,
				parentContext: v?.context,
				isDrawer: p
			}),
			typeof n == "function" ? n({ payload: C }) : n
		]
	});
}
var Av, jv, Mv = o((() => {
	Av = /* @__PURE__ */ u(b(), 1), Sv(), mc(), Ov(), Gc(), ml(), Th(), jv = bs();
})), Nv, Pv = o((() => {
	Km(), Mv(), Nv = Bm(function(e) {
		return kv("dialog", e);
	});
})), Fv, Iv, Lv = o((() => {
	Fv = /* @__PURE__ */ u(b(), 1), Oa(), mc(), E_(), K_(), Iv = /*#__PURE__*/ Fv.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, children: a, ...o } = e, s = C_(), c = dc(), l = c.useState("open"), u = c.useState("nested"), d = c.useState("transitionStatus"), f = c.useState("nestedOpenDialogCount"), p = c.useState("mounted"), m = c.useStateSetter("viewportElement");
		return ya("div", e, {
			enabled: s || p,
			state: {
				open: l,
				nested: u,
				transitionStatus: d,
				nestedDialogOpen: f > 0
			},
			ref: [t, m],
			stateAttributesMapping: G_,
			props: [{
				role: "presentation",
				hidden: !p,
				style: { pointerEvents: l ? void 0 : "none" },
				children: a
			}, o]
		});
	});
})), Rv, zv, Bv = o((() => {
	Rv = /* @__PURE__ */ u(b(), 1), mc(), Oa(), Ol(), zv = /*#__PURE__*/ Rv.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, id: a, ...o } = e, s = dc(), c = Dl(a);
		return s.useSyncedValueWithCleanup("titleElementId", c), ya("h2", e, {
			ref: t,
			props: [{ id: c }, o]
		});
	});
}));
// node_modules/@base-ui/utils/useEnhancedClickHandler.mjs
function Vv(e) {
	let t = Hv.useRef(""), n = Hv.useCallback((n) => {
		n.defaultPrevented || (t.current = n.pointerType, e(n, n.pointerType));
	}, [e]);
	return {
		onClick: Hv.useCallback((n) => {
			n.detail === 0 ? e(n, "keyboard") : ("pointerType" in n ? e(n, n.pointerType) : e(n, t.current), t.current = "");
		}, [e]),
		onPointerDown: n
	};
}
var Hv, Uv = o((() => {
	Hv = /* @__PURE__ */ u(b(), 1);
}));
// node_modules/@base-ui/react/internals/useValueChanged.mjs
function Wv(e, t) {
	let n = Gv.useRef(e), r = q(t);
	J(() => {
		n.current !== e && r(n.current), n.current = e;
	}, [e, r]);
}
var Gv, Kv = o((() => {
	Gv = /* @__PURE__ */ u(b(), 1), fi(), li();
}));
// node_modules/@base-ui/react/utils/useOpenInteractionType.mjs
function qv(e, t) {
	let { onClick: n, onPointerDown: r } = Vv(q((n, r) => {
		(typeof e == "function" ? e() : e) || t(r || (Kl ? "touch" : ""));
	}));
	return Yv.useMemo(() => ({
		onClick: n,
		onPointerDown: r
	}), [n, r]);
}
function Jv(e) {
	let [t, n] = Yv.useState(null), r = qv(e, n);
	return Wv(e, (t) => {
		t && !e && n(null);
	}), Yv.useMemo(() => ({
		openMethod: t,
		triggerProps: r
	}), [t, r]);
}
var Yv, Xv = o((() => {
	Yv = /* @__PURE__ */ u(b(), 1), li(), Uv(), au(), Kv();
})), Zv = o((() => {
	Vc(), _l(), jl(), X_(), ov(), Pv(), Lv(), Bv(), Ni(), Km(), mc(), Yi(), Oa(), Rc(), Xf(), Th(), Ol(), S_(), Xv(), Ov(), Gc(), ml(), Jp();
})), Qv, $v = o((() => {
	Rc(), Qv = "data-nested-dialog-open";
})), ey = o((() => {
	Zv(), Rc(), H_(), W_(), $v();
}));
// src/components/ui/portal-context.tsx
function ty({ container: e, children: t }) {
	return /* @__PURE__ */ (0, iy.jsx)(ay.Provider, {
		value: e,
		children: t
	});
}
function ny() {
	return (0, ry.useContext)(ay);
}
var ry, iy, ay, oy = o((() => {
	ry = /* @__PURE__ */ u(b(), 1), iy = bs(), ay = (0, ry.createContext)(null);
}));
// src/components/ui/dialog.tsx
function sy({ ...e }) {
	return /* @__PURE__ */ (0, hy.jsx)(Nv, {
		"data-slot": "dialog",
		...e
	});
}
function cy({ container: e, ...t }) {
	let n = ny();
	return /* @__PURE__ */ (0, hy.jsx)(av, {
		"data-slot": "dialog-portal",
		container: e ?? n ?? void 0,
		...t
	});
}
function ly({ className: e, ...t }) {
	return /* @__PURE__ */ (0, hy.jsx)(Bc, {
		"data-slot": "dialog-overlay",
		className: _s("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", e),
		...t
	});
}
function uy({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ (0, hy.jsxs)(cy, { children: [/* @__PURE__ */ (0, hy.jsx)(ly, {}), /* @__PURE__ */ (0, hy.jsxs)(Y_, {
		"data-slot": "dialog-content",
		className: _s("oo-dialog-popup fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...r,
		children: [t, n && /* @__PURE__ */ (0, hy.jsxs)(gl, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ (0, hy.jsx)(Y, {
				variant: "ghost",
				className: "absolute top-2 right-2",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, hy.jsx)(br, {}), /* @__PURE__ */ (0, hy.jsx)("span", {
				className: "sr-only",
				children: "Fechar diálogo"
			})]
		})]
	})] });
}
function dy({ className: e, ...t }) {
	return /* @__PURE__ */ (0, hy.jsx)("div", {
		"data-slot": "dialog-header",
		className: _s("flex flex-col gap-2", e),
		...t
	});
}
function fy({ className: e, showCloseButton: t = !1, children: n, ...r }) {
	return /* @__PURE__ */ (0, hy.jsxs)("div", {
		"data-slot": "dialog-footer",
		className: _s("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", e),
		...r,
		children: [n, t && /* @__PURE__ */ (0, hy.jsx)(gl, {
			render: /* @__PURE__ */ (0, hy.jsx)(Y, { variant: "outline" }),
			children: "Close"
		})]
	});
}
function py({ className: e, ...t }) {
	return /* @__PURE__ */ (0, hy.jsx)(zv, {
		"data-slot": "dialog-title",
		className: _s("font-heading text-base leading-none font-medium", e),
		...t
	});
}
function my({ className: e, ...t }) {
	return /* @__PURE__ */ (0, hy.jsx)(Al, {
		"data-slot": "dialog-description",
		className: _s("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", e),
		...t
	});
}
var hy, gy = o((() => {
	b(), ey(), vs(), oy(), Cs(), Tr(), hy = bs();
}));
Cs(), gy();
var _y = class extends Z.Component {
	state = { failed: !1 };
	static getDerivedStateFromError() {
		return { failed: !0 };
	}
	render() {
		return this.state.failed ? /* @__PURE__ */ (0, X.jsx)(sy, {
			open: !0,
			onOpenChange: (e) => {
				e || this.props.onClose();
			},
			children: /* @__PURE__ */ (0, X.jsxs)(uy, { children: [/* @__PURE__ */ (0, X.jsxs)(dy, { children: [/* @__PURE__ */ (0, X.jsx)(py, { children: "Perfil indisponível" }), /* @__PURE__ */ (0, X.jsx)(my, { children: "Não foi possível abrir o perfil. Feche e tente novamente." })] }), /* @__PURE__ */ (0, X.jsx)(Y, {
				onClick: this.props.onClose,
				children: "Fechar"
			})] })
		}) : this.props.children;
	}
}, vy, yy, by = o((() => {
	vy = encodeURIComponent, yy = {
		inbox: (e) => p("/dm/inbox?active=" + (document.hidden ? "0" : "1") + (e === null ? "" : "&after=" + e)),
		request: (e) => p("/dm/requests", {
			method: "POST",
			body: JSON.stringify({ username: e })
		}),
		respond: (e, t) => p("/dm/conversations/" + vy(e) + "/request", {
			method: "POST",
			body: JSON.stringify({ action: t })
		}),
		messages: (e, t = {}) => {
			let n = new URLSearchParams();
			for (let [e, r] of Object.entries(t)) r !== void 0 && r !== "" && n.set(e, String(r));
			return p("/dm/conversations/" + vy(e) + "/messages?" + n);
		},
		send: (e, t) => p("/dm/conversations/" + vy(e) + "/messages", {
			method: "POST",
			body: JSON.stringify(t)
		}),
		message: (e) => p("/dm/messages/" + vy(e)),
		edit: (e, t) => p("/dm/messages/" + vy(e), {
			method: "PATCH",
			body: JSON.stringify({ content: t })
		}),
		remove: (e) => p("/dm/messages/" + vy(e), { method: "DELETE" }),
		action: (e, t, n) => p("/dm/messages/" + vy(e) + "/actions", {
			method: "POST",
			body: JSON.stringify({
				action: t,
				value: n
			})
		}),
		read: (e, t) => p("/dm/conversations/" + vy(e) + "/read", {
			method: "POST",
			body: JSON.stringify({ seq: t })
		}),
		typing: (e, t) => p("/dm/conversations/" + vy(e) + "/typing", {
			method: "POST",
			body: JSON.stringify({ active: t })
		}),
		conversation: (e, t) => p("/dm/conversations/" + vy(e), {
			method: "PATCH",
			body: JSON.stringify(t)
		}),
		settings: (e) => p("/dm/settings", {
			method: "PATCH",
			body: JSON.stringify(e)
		}),
		block: (e, t) => p("/dm/people/" + vy(e) + "/block", {
			method: "POST",
			body: JSON.stringify({ blocked: t })
		}),
		person: (e) => p("/dm/people/" + vy(e)),
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
			return p("/dm/conversations/" + vy(e) + "/attachments", {
				method: "POST",
				body: JSON.stringify({
					name: t.name,
					mime: t.type || "application/octet-stream",
					data: n
				})
			});
		},
		attachment: (e) => p("/dm/attachments/" + vy(e)),
		discardAttachment: (e) => p("/dm/attachments/" + vy(e), { method: "DELETE" })
	};
}));
// src/utils/unique-id.ts
function xy() {
	return typeof crypto.randomUUID == "function" ? crypto.randomUUID() : Array.from(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16)), (e) => e.toString(16).padStart(2, "0")).join("");
}
var Sy = o((() => {}));
// src/stores/messages-store.ts
function Cy(e, t) {
	Hy({ threads: {
		...jy.threads,
		[e]: {
			...jy.threads[e] || By(),
			...t
		}
	} });
}
async function wy() {
	Wy ||= new AudioContext(), await Wy.resume();
}
function Ty() {
	try {
		if (Wy?.state !== "running") return;
		let e = Wy.createOscillator(), t = Wy.createGain();
		e.frequency.value = 660, t.gain.setValueAtTime(.025, Wy.currentTime), t.gain.exponentialRampToValueAtTime(.001, Wy.currentTime + .12), e.connect(t), t.connect(Wy.destination), e.start(), e.stop(Wy.currentTime + .12);
	} catch {}
}
function Ey(e) {
	let t = jy.threads[e.conversationId];
	t && Cy(e.conversationId, { messages: Uy(t.messages, [e]) });
}
async function Dy() {
	if (Fy || !jy.username || !Ny) return;
	Py && clearTimeout(Py), Fy = !0;
	let e = My, t = Iy;
	try {
		let n = await yy.inbox(Ly);
		if (e !== My) return;
		if (!Array.isArray(n.conversations) || !Array.isArray(n.requests) || n.me?.username !== jy.username) throw Error("As mensagens estão temporariamente indisponíveis.");
		if (t !== Iy) return;
		for (let e of n.events) {
			if (!e.messageId || ![
				"edited",
				"deleted",
				"changed"
			].includes(e.kind) || !jy.threads[e.conversationId]?.messages.some((t) => t.id === e.messageId)) continue;
			let t = Ry.get(e.conversationId) || /* @__PURE__ */ new Set();
			t.add(e.messageId), Ry.set(e.conversationId, t);
		}
		Ly = n.cursor, Hy({
			inbox: n,
			connected: !0,
			updatedAt: Date.now(),
			error: ""
		});
		let r = jy.selectedId;
		if (jy.open && r && !document.hidden) {
			let i = jy.threads[r] || By(), a = await yy.messages(r, i.messages.length ? { after: i.messages.at(-1).seq } : {});
			if (e !== My || t !== Iy) return;
			let o = Uy(i.messages, a.messages), s = Ry.get(r);
			for (let n of [...s || []]) if (!o.some((e) => e.id === n)) s?.delete(n);
			else try {
				let r = await yy.message(n);
				if (e !== My || t !== Iy) return;
				o = Uy(o, [r.message]), s?.delete(n);
			} catch {}
			s?.size || Ry.delete(r), Cy(r, {
				messages: o,
				hasMore: i.messages.length ? i.hasMore : a.hasMore,
				typing: a.typing,
				error: ""
			});
			let c = o.at(-1);
			if (a.conversation.unread && c && document.hasFocus()) {
				if (await yy.read(r, c.seq), e !== My) return;
				Hy({ inbox: {
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
			if (jy.open && t.conversationId === jy.selectedId && !document.hidden && document.hasFocus()) continue;
			let r = await yy.claim(t.seq);
			if (e !== My) return;
			if (!r.claimed || !r.conversation) continue;
			let a = r.conversation.peer, o = r.kind === "request" ? "Quer iniciar uma conversa com você." : n.settings.previews ? r.message?.content || "Enviou um arquivo." : "Nova mensagem direta.";
			if (document.hidden && i) {
				let e = new Notification(a.profile.displayName, {
					body: o,
					icon: a.profile.avatar || void 0,
					tag: "organizeon-dm-" + t.seq
				});
				e.onclick = () => {
					window.focus(), Gy.open(t.conversationId), e.close();
				};
			} else Hy({ notices: [...jy.notices, {
				id: t.seq,
				conversationId: t.conversationId,
				person: a,
				text: o,
				kind: r.kind || "message"
			}].slice(-3) }), n.settings.sound && Ty();
		}
	} catch (t) {
		e === My && (t instanceof g && t.status === 401 ? (Ly = null, Ry.clear(), Hy({
			inbox: null,
			threads: {},
			notices: [],
			connected: !1,
			error: t.message
		})) : Hy({
			connected: !1,
			error: t instanceof Error ? t.message : "Não foi possível conectar às mensagens."
		}));
	} finally {
		e === My && (Fy = !1, Ny && (Py = setTimeout(() => void Dy(), document.hidden ? 2e4 : jy.open ? 1800 : 5e3)));
	}
}
function Oy() {
	return (0, ky.useSyncExternalStore)(Gy.subscribe, Gy.get, Gy.get);
}
var ky, Ay, jy, My, Ny, Py, Fy, Iy, Ly, Ry, zy, By, Vy, Hy, Uy, Wy, Gy, Ky = o((() => {
	ky = /* @__PURE__ */ u(b(), 1), _(), by(), Sy(), Ay = () => ({
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
	}), jy = Ay(), My = 0, Ny = 0, Fy = !1, Iy = 0, Ly = null, Ry = /* @__PURE__ */ new Map(), zy = /* @__PURE__ */ new Set(), By = () => ({
		messages: [],
		hasMore: !1,
		typing: !1,
		loading: !1,
		error: ""
	}), Vy = () => ({
		text: "",
		reply: null,
		attachments: [],
		retry: null
	}), Hy = (e) => {
		jy = {
			...jy,
			...e
		};
		for (let e of zy) e();
	}, Uy = (e, t) => [...new Map([...e, ...t].map((e) => [e.id, e])).values()].sort((e, t) => e.seq - t.seq).slice(-240), Wy = null, Gy = {
		get: () => jy,
		subscribe: (e) => (zy.add(e), () => {
			zy.delete(e);
		}),
		start(e) {
			jy.username !== e && (My++, Ry.clear(), Py && clearTimeout(Py), jy = {
				...Ay(),
				username: e
			}, Ly = null, Fy = !1, Ny = 0, Iy = 0);
			let t = My;
			return Ny++, Dy(), () => {
				t === My && --Ny <= 0 && (My++, Ry.clear(), Py && clearTimeout(Py), Fy = !1, Ly = null, Hy(Ay()));
			};
		},
		open(e) {
			let t = e || jy.selectedId, n = "inbox";
			e && jy.inbox?.requests.some((t) => t.id === e) && (t = null, n = "requests"), Hy({
				open: !0,
				selectedId: t,
				view: n
			}), t && Gy.load(t), Dy();
		},
		close() {
			Hy({ open: !1 });
		},
		back() {
			jy.selectedId ? Hy({
				selectedId: null,
				view: "inbox"
			}) : jy.view === "inbox" ? Hy({ open: !1 }) : Hy({ view: "inbox" });
		},
		view(e) {
			Hy({
				view: e,
				selectedId: null
			});
		},
		select(e) {
			Hy({
				selectedId: e,
				view: "inbox"
			}), Gy.load(e);
		},
		draft(e) {
			return jy.drafts[e] || Vy();
		},
		setDraft(e, t) {
			Hy({ drafts: {
				...jy.drafts,
				[e]: {
					...Gy.draft(e),
					...t
				}
			} });
		},
		dismissNotice(e) {
			Hy({ notices: jy.notices.filter((t) => t.id !== e) });
		},
		async refresh() {
			Iy++, Py && clearTimeout(Py), Fy ? Py = setTimeout(() => void Dy(), 200) : await Dy();
		},
		async load(e, t = !1) {
			let n = jy.threads[e] || By();
			if (n.loading) return;
			let r = My;
			Cy(e, {
				loading: !0,
				error: ""
			});
			try {
				let i = await yy.messages(e, t && n.messages.length ? { before: n.messages[0].seq } : {});
				if (r !== My) return;
				Cy(e, {
					messages: Uy(jy.threads[e]?.messages || [], i.messages),
					hasMore: i.hasMore,
					typing: i.typing,
					loading: !1
				});
			} catch (t) {
				r === My && Cy(e, {
					error: t instanceof Error ? t.message : "Não foi possível carregar.",
					loading: !1
				});
			}
		},
		async send(e) {
			let t = Gy.draft(e);
			if (!t.text.trim() && !t.attachments.length) return;
			let n = JSON.stringify({
				text: t.text,
				reply: t.reply?.id,
				attachments: t.attachments.map((e) => e.id)
			}), r = t.retry?.fingerprint === n ? t.retry.nonce : xy();
			Gy.setDraft(e, { retry: {
				fingerprint: n,
				nonce: r
			} });
			let i = My, a = await yy.send(e, {
				content: t.text,
				replyId: t.reply?.id,
				attachmentIds: t.attachments.map((e) => e.id),
				nonce: r
			});
			i === My && (Ey(a.message), Gy.setDraft(e, {
				text: "",
				reply: null,
				attachments: [],
				retry: null
			}), await Gy.refresh());
		},
		async upload(e, t) {
			let n = My;
			if (Gy.draft(e).attachments.length >= 4) throw Error("Você pode adicionar até quatro arquivos.");
			let r = await yy.upload(e, t);
			n === My && Gy.setDraft(e, { attachments: [...Gy.draft(e).attachments, r.attachment].slice(0, 4) });
		},
		async removeAttachment(e, t) {
			await yy.discardAttachment(t), Gy.setDraft(e, { attachments: Gy.draft(e).attachments.filter((e) => e.id !== t) });
		},
		async request(e) {
			let t = await yy.request(e);
			await Gy.refresh(), t.status === "accepted" ? Gy.select(t.id) : Gy.view("requests");
		},
		async respond(e, t) {
			await yy.respond(e, t), await Gy.refresh(), t === "accept" && Gy.select(e);
		},
		async settings(e) {
			let t = await yy.settings(e);
			Iy++, jy.inbox && Hy({ inbox: {
				...jy.inbox,
				settings: t.settings
			} });
		},
		async action(e, t, n) {
			await yy.action(e.id, t, n), t === "unread" ? Hy({
				selectedId: null,
				view: "inbox"
			}) : Ey((await yy.message(e.id)).message), await Gy.refresh();
		},
		async edit(e, t) {
			Ey((await yy.edit(e.id, t)).message), await Gy.refresh();
		},
		async remove(e) {
			await yy.remove(e.id), Ey((await yy.message(e.id)).message), await Gy.refresh();
		},
		async forward(e, t) {
			Ey((await yy.send(t, {
				forwardId: e.id,
				nonce: xy()
			})).message), await Gy.refresh(), Gy.select(t);
		},
		async conversation(e, t) {
			await yy.conversation(e, t), t.archived && jy.selectedId === e && Hy({ selectedId: null }), await Gy.refresh();
		},
		async block(e, t) {
			await yy.block(e.username, t), await Gy.refresh();
		}
	}, typeof window < "u" && (window.addEventListener("focus", () => void Gy.refresh()), document.addEventListener("visibilitychange", () => {
		document.hidden || Gy.refresh();
	}));
}));
// src/features/profile/profile-avatar.tsx
function qy(e) {
	return e === "circle" ? "50%" : e === "rounded" ? "20%" : "0";
}
function Jy({ profile: e, className: t = "size-8" }) {
	return /* @__PURE__ */ (0, Yy.jsx)("span", {
		className: `grid shrink-0 place-items-center overflow-hidden border border-border bg-muted ${t}`,
		style: { borderRadius: qy(e.avatarShape) },
		children: e.avatar ? /* @__PURE__ */ (0, Yy.jsx)("img", {
			src: e.avatar,
			alt: "",
			className: "size-full object-cover"
		}) : /* @__PURE__ */ (0, Yy.jsx)(_r, { className: "size-4 text-muted-foreground" })
	});
}
var Yy, Xy = o((() => {
	Tr(), Yy = bs();
}));
Tr(), oy(), Cs(), Xy(), Ky();
function Zy({ notice: e }) {
	let [t, n] = (0, Z.useState)(!1);
	(0, Z.useEffect)(() => {
		let e = requestAnimationFrame(() => n(!0)), t = setTimeout(() => r(), 9e3);
		return () => {
			cancelAnimationFrame(e), clearTimeout(t);
		};
	}, [e.id]);
	function r() {
		n(!1), setTimeout(() => Gy.dismissNotice(e.id), 150);
	}
	return /* @__PURE__ */ (0, X.jsx)("div", {
		role: "status",
		className: `pointer-events-auto rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-sm transition-[opacity,transform] duration-150 motion-reduce:transition-none ${t ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`,
		children: /* @__PURE__ */ (0, X.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [
				/* @__PURE__ */ (0, X.jsx)(Jy, {
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
								Gy.open(e.conversationId), r();
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
					children: /* @__PURE__ */ (0, X.jsx)(br, { className: "size-4" })
				})
			]
		})
	});
}
function Qy() {
	let { notices: e } = Oy(), t = ny();
	return e.length ? (0, js.createPortal)(/* @__PURE__ */ (0, X.jsx)("div", {
		"aria-label": "Notificações de mensagens",
		className: "pointer-events-none fixed right-4 top-4 z-50 grid w-[min(22rem,calc(100vw-2rem))] gap-2",
		children: e.map((e) => /* @__PURE__ */ (0, X.jsx)(Zy, { notice: e }, e.id))
	}), t || document.body) : null;
}
// node_modules/@base-ui/react/internals/noop.mjs
var $y = o((() => {
	fa();
})), eb, tb, nb = o((() => {
	eb = "data-valid", tb = "data-invalid";
})), rb, ib, ab, ob, sb = o((() => {
	nb(), rb = {
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
	}, ib = {
		valid: null,
		touched: !1,
		dirty: !1,
		filled: !1,
		focused: !1
	}, ab = {
		disabled: !1,
		...ib
	}, ob = { valid(e) {
		return e === null ? null : e ? { [eb]: "" } : { [tb]: "" };
	} };
}));
// node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
function cb(e = !0) {
	let t = lb.useContext(db);
	if (t.setValidityData === la && !e) throw Error(Mi(28));
	return t;
}
var lb, ub, db, fb = o((() => {
	Ni(), lb = /* @__PURE__ */ u(b(), 1), fa(), $y(), sb(), ub = {
		invalid: void 0,
		name: void 0,
		validityData: {
			state: rb,
			errors: [],
			error: "",
			value: "",
			initialValue: null
		},
		setValidityData: la,
		disabled: void 0,
		setTouched: la,
		setDirty: la,
		setFilled: la,
		setFocused: la,
		focusOwnerRef: { current: void 0 },
		validationMode: "onSubmit",
		shouldValidateOnChange: () => !1,
		state: ab,
		registerFieldControl: la,
		validation: {
			getValidationProps: (e, t = da) => t,
			inputRef: { current: null },
			registeredInputs: /* @__PURE__ */ new Map(),
			registerInput: la,
			getInputControl: () => null,
			commit: async () => {},
			change: la
		}
	}, db = /*#__PURE__*/ lb.createContext(ub);
}));
// node_modules/@base-ui/react/internals/form-context/FormContext.mjs
function pb() {
	return mb.useContext(hb);
}
var mb, hb, gb = o((() => {
	mb = /* @__PURE__ */ u(b(), 1), $y(), hb = /*#__PURE__*/ mb.createContext({
		elementRef: { current: null },
		formRef: { current: { fields: /* @__PURE__ */ new Map() } },
		errors: {},
		clearErrors: la,
		validationMode: "onSubmit",
		submitCountRef: { current: 0 }
	});
}));
// node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
function _b() {
	return vb.useContext(yb);
}
var vb, yb, bb = o((() => {
	vb = /* @__PURE__ */ u(b(), 1), $y(), yb = /*#__PURE__*/ vb.createContext({
		controlId: void 0,
		registerControlId: la,
		resetControlId: la,
		labelId: void 0,
		setLabelId: la,
		messageIds: [],
		setMessageIds: la,
		getDescriptionProps: (e) => e
	});
}));
// node_modules/@base-ui/react/internals/labelable-provider/useAriaLabelledBy.mjs
function xb(e, t, n, r = !0, i, a) {
	let [o, s] = wb.useState(), c = Dl(i ? `${i}-label` : void 0), l = !!a?.trim(), u = e ?? (l ? void 0 : t) ?? o;
	return J(() => {
		let i = e || t || l || !r ? void 0 : Sb(n.current, c);
		o !== i && s(i);
	}), u;
}
function Sb(e, t) {
	let n = Cb(e);
	if (n) return !n.id && t && (n.id = t), n.id || void 0;
}
function Cb(e) {
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
var wb, Tb = o((() => {
	wb = /* @__PURE__ */ u(b(), 1), fi(), Ol();
}));
// node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function Eb(e = {}) {
	let { id: t, enabled: n = !0 } = e, { controlId: r, registerControlId: i, resetControlId: a } = _b(), o = Dl(), s = ti(() => Symbol()), c = Db.useRef(!1), l = Db.useRef(!1), u = q(() => {
		c.current && i !== la && (c.current = !1, i(s.current, void 0));
	});
	return J(() => {
		if (!n || i === la) {
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
var Db, Ob = o((() => {
	Db = /* @__PURE__ */ u(b(), 1), fi(), li(), ii(), $y(), Ol(), bb();
}));
// node_modules/@base-ui/react/field/item/FieldItemContext.mjs
function kb() {
	return Ab.useContext(jb);
}
var Ab, jb, Mb = o((() => {
	Ab = /* @__PURE__ */ u(b(), 1), jb = /*#__PURE__*/ Ab.createContext({ disabled: !1 });
}));
// node_modules/@base-ui/react/internals/field-root-context/useSetFieldFocused.mjs
function Nb(e, t, n) {
	let { setFocused: r, focusOwnerRef: i } = cb(), a = q((t) => {
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
var Pb = o((() => {
	fi(), li(), fb();
}));
// node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function Fb(e, t, n, r, i = !0, a) {
	let { registerFieldControl: o } = cb(), s = ti(() => Symbol());
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
var Ib = o((() => {
	fi(), ii(), fb();
})), Lb, Rb, zb = o((() => {
	Lb = /* @__PURE__ */ u(b(), 1), fi(), li(), Rl(), fb(), Pb(), Ib(), gb(), bb(), Ob(), sb(), Oa(), Kv(), Gc(), ml(), Rb = /*#__PURE__*/ Lb.forwardRef(function(e, t) {
		let { render: n, className: r, id: i, name: a, value: o, disabled: s = !1, onValueChange: c, defaultValue: l, autoFocus: u = !1, style: d, ...f } = e, { state: p, name: m, disabled: h, setTouched: g, setDirty: _, validityData: v, setFilled: y, validationMode: b, validation: x } = cb(), { clearErrors: S, elementRef: C, submitCountRef: w } = pb(), T = h || s, E = m ?? a, D = {
			...p,
			disabled: T
		}, { labelId: O } = _b(), k = Eb({ id: i }), A = o !== void 0, j = o == null ? void 0 : String(o), M = q(() => x.inputRef.current?.value);
		Fb(x.inputRef, k, j, M, !T, a), J(() => {
			let e = j ?? x.inputRef.current?.value;
			e !== void 0 && y(e !== "");
		}, [
			j,
			l,
			x.inputRef,
			y
		]), Wv(j, () => {
			j !== void 0 && (S(E), _(j !== (v.initialValue ?? "")), x.change(j));
		});
		let N = Lb.useRef(null), P = Nb(T, N), F = Fl();
		return ya("input", e, {
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
			stateAttributesMapping: ob
		});
	});
})), Bb = o((() => {
	fi(), li(), fb(), sb(), Ni(), gb(), ii(), Ol(), bb(), Tb(), Ob(), Zr(), Hi(), lh(), Oa(), fa(), Rl(), Ai(), ei(), Mb(), lm(), xc(), $p(), zb();
})), Vb = o((() => {
	Bb(), xc(), nb();
})), Hb, Ub, Wb, Gb = o((() => {
	Hb = /* @__PURE__ */ u(b(), 1), Vb(), Ub = bs(), Wb = /*#__PURE__*/ Hb.forwardRef(function(e, t) {
		return /*#__PURE__*/ (0, Ub.jsx)(Rb, {
			ref: t,
			...e
		});
	});
})), Kb = o((() => {
	Gb();
}));
// src/components/ui/input.tsx
function qb({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ (0, Jb.jsx)(Wb, {
		type: t,
		"data-slot": "input",
		className: _s("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", e),
		...n
	});
}
var Jb, Yb = o((() => {
	b(), Kb(), vs(), Jb = bs();
}));
// node_modules/@base-ui/react/use-render/useRender.mjs
function Xb(e) {
	return ya(e.defaultTagName ?? "div", e, e);
}
var Zb = o((() => {
	Oa();
})), Qb = o((() => {
	Zb();
}));
// src/components/ui/badge.tsx
function $b({ className: e, variant: t = "default", render: n, ...r }) {
	return Xb({
		defaultTagName: "span",
		props: hi({ className: _s(ex({ variant: t }), e) }, r),
		render: n,
		state: {
			slot: "badge",
			variant: t
		}
	});
}
var ex, tx = o((() => {
	Ai(), Qb(), za(), vs(), ex = Ra("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
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
function nx() {
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
var rx, ix, ax = o((() => {
	_(), rx = (e) => ({
		displayName: e,
		nameColor: "#FAFAFA",
		bio: "",
		avatarShape: "circle",
		avatar: null
	}), ix = {
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
function ox(e) {
	let t = fx.get(e);
	return t || (t = {
		profile: rx(e),
		listeners: /* @__PURE__ */ new Set(),
		pending: null,
		revision: 0
	}, fx.set(e, t)), t;
}
function sx(e, t) {
	let n = ox(e);
	n.profile = t;
	for (let e of n.listeners) e();
}
async function cx(e) {
	let t = ox(e);
	if (!t.pending) {
		let n = t.revision;
		t.pending = ix.get().then((r) => {
			r && t.revision === n && sx(e, r);
		}).catch(() => {}).finally(() => {
			t.pending = null;
		});
	}
	return t.pending;
}
function lx(e, t) {
	ox(e).revision++, sx(e, t), px?.postMessage({ username: e });
}
function ux(e, t = !0) {
	let n = ox(e), r = (0, dx.useSyncExternalStore)((e) => (n.listeners.add(e), () => {
		n.listeners.delete(e);
	}), () => n.profile);
	return (0, dx.useEffect)(() => {
		if (!t) return;
		cx(e);
		let n = () => {
			document.hidden || cx(e);
		};
		window.addEventListener("focus", n);
		let r = setInterval(n, 6e4);
		return () => {
			clearInterval(r), window.removeEventListener("focus", n);
		};
	}, [e, t]), r;
}
var dx, fx, px, mx = o((() => {
	dx = /* @__PURE__ */ u(b(), 1), ax(), fx = /* @__PURE__ */ new Map();
	try {
		px = new BroadcastChannel("organizeon-profile"), px.onmessage = ({ data: e }) => {
			typeof e?.username == "string" && fx.has(e.username) && cx(e.username);
		};
	} catch {}
})), hx, gx = o((() => {
	hx = {
		owner: "Owner",
		ultra_admin: "Ultra admin",
		super_admin: "Super admin",
		admin: "Admin",
		user: "Usuário",
		guest: "Convidado"
	};
}));
// src/components/ui/skeleton.tsx
function _x({ className: e, ...t }) {
	return /* @__PURE__ */ (0, vx.jsx)("div", {
		"data-slot": "skeleton",
		className: _s("animate-pulse rounded-md bg-muted", e),
		...t
	});
}
var vx, yx = o((() => {
	vs(), vx = bs();
}));
// node_modules/@base-ui/react/menu/positioner/MenuPositionerContext.mjs
function bx(e) {
	let t = xx.useContext(Sx);
	if (t === void 0 && !e) throw Error(Mi(33));
	return t;
}
var xx, Sx, Cx = o((() => {
	Ni(), xx = /* @__PURE__ */ u(b(), 1), Sx = /*#__PURE__*/ xx.createContext(void 0);
}));
// node_modules/@base-ui/react/menu/root/MenuRootContext.mjs
function wx(e) {
	let t = Tx.useContext(Ex);
	if (t === void 0 && !e) throw Error(Mi(36));
	return t;
}
var Tx, Ex, Dx = o((() => {
	Ni(), Tx = /* @__PURE__ */ u(b(), 1), Ex = /*#__PURE__*/ Tx.createContext(void 0);
}));
// node_modules/@base-ui/react/context-menu/root/ContextMenuRootContext.mjs
function Ox(e = !0) {
	let t = kx.useContext(Ax);
	if (t === void 0 && !e) throw Error(Mi(25));
	return t;
}
var kx, Ax, jx = o((() => {
	Ni(), kx = /* @__PURE__ */ u(b(), 1), Ax = /*#__PURE__*/ kx.createContext(void 0);
}));
// node_modules/@base-ui/utils/useControlled.mjs
function Mx({ controlled: e, default: t, name: n, state: r = "value" }) {
	let { current: i } = Nx.useRef(e !== void 0), [a, o] = Nx.useState(() => t);
	return [i && e !== void 0 ? e : a, Nx.useCallback((e) => {
		i || o(e);
	}, [])];
}
var Nx, Px = o((() => {
	Nx = /* @__PURE__ */ u(b(), 1);
}));
// node_modules/@base-ui/react/menu/filter-root/MenuFilterContext.mjs
function Fx(e = "root") {
	let t = Rx.useContext(zx), n = Rx.useContext(Ex);
	return t === null || n === void 0 ? null : (e === "submenu-trigger" ? n.virtualFocus || n.parentVirtualFocus : n.virtualFocus) ? t : null;
}
function Ix() {
	return Bx;
}
function Lx(e, t, n = "root") {
	let r = Fx(n), i = ((n === "submenu-trigger" ? r?.useSubmenuTrigger : r?.useItem) ?? Ix)({
		label: e.label,
		children: e.children,
		render: e.render
	}), a = Xi(t, i.ref);
	return {
		visible: i.visible,
		ref: a,
		props: i.props
	};
}
var Rx, zx, Bx, Vx = o((() => {
	Rx = /* @__PURE__ */ u(b(), 1), na(), Dx(), zx = /*#__PURE__*/ Rx.createContext(null), Bx = {
		visible: !0,
		ref: null
	};
}));
// node_modules/@base-ui/react/menu/item/useMenuItemCommonProps.mjs
function Hx(e) {
	e.preventDefault();
}
function Ux(e) {
	let { closeOnClick: t, highlighted: n, id: r, nodeId: i, store: a, typingRef: o, itemRef: s, itemMetadata: c } = e, l = wx(), u = Ox(!0), d = c.type === "submenu-trigger", f = d ? l.parentVirtualFocus : l.virtualFocus, p = (d && l.parent.type === "menu" ? l.parent.store : l.store).useState("webkitAriaSelected", n), { events: m } = a.useState("floatingTreeRoot"), h = a.useState("open"), g = u !== void 0, _ = !f && h && n ? 0 : -1;
	return Wx.useMemo(() => ({
		id: r,
		role: "menuitem",
		tabIndex: _,
		"aria-selected": p,
		onMouseDown: f ? Hx : void 0,
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
				if (u.initialCursorPointRef.current = null, g && t && Math.abs(e.clientX - t.x) <= 1 && Math.abs(e.clientY - t.y) <= 1 || g && !Yl && e.button === 2) return;
			}
			s.current && a.context.allowMouseUpTriggerRef.current && (!g || e.button === 2) && c.type === "regular-item" && Ui(s.current, e, {
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
var Wx, Gx = o((() => {
	Wx = /* @__PURE__ */ u(b(), 1), au(), ml(), jx(), Dx(), Wi();
}));
// node_modules/@base-ui/react/menu/item/useMenuItem.mjs
function Kx(e) {
	let { closeOnClick: t, disabled: n, highlighted: r, id: i, store: a, typingRef: o = a.context.typingRef, nativeButton: s, itemMetadata: c, nodeId: l } = e, u = qx.useRef(null), { getButtonProps: d, buttonRef: f } = Gi({
		disabled: n,
		focusableWhenDisabled: !0,
		native: s,
		composite: !0
	}), p = Ux({
		closeOnClick: t,
		highlighted: r,
		id: i,
		nodeId: l,
		store: a,
		typingRef: o,
		itemRef: u,
		itemMetadata: c
	}), m = qx.useCallback((e) => hi(p, { onMouseEnter(e) {
		c.type === "submenu-trigger" && c.setActive(e.nativeEvent);
	} }, e, d), [
		p,
		d,
		c
	]), h = Xi(u, f);
	return qx.useMemo(() => ({
		getItemProps: m,
		itemRef: h
	}), [m, h]);
}
var qx, Jx, Yx = o((() => {
	qx = /* @__PURE__ */ u(b(), 1), na(), Hc(), Ai(), Gx(), Jx = { type: "regular-item" };
}));
// node_modules/@base-ui/react/internals/composite/list/CompositeListContext.mjs
function Xx() {
	return Zx.useContext(Qx);
}
var Zx, Qx, $x = o((() => {
	Zx = /* @__PURE__ */ u(b(), 1), Qx = /*#__PURE__*/ Zx.createContext({
		register: () => {},
		unregister: () => {},
		subscribeMapChange: () => () => {},
		nextIndexRef: { current: 0 }
	});
}));
// node_modules/@base-ui/react/internals/composite/list/useCompositeListItem.mjs
function eS(e = {}) {
	let { guess: t, label: n, metadata: r, textRef: i, index: a } = e, { register: o, unregister: s, subscribeMapChange: c, nextIndexRef: l } = Xx(), u = tS.useRef(-1), [d, f] = tS.useState(a == null && t ? () => {
		if (u.current === -1) {
			let e = l.current;
			l.current += 1, u.current = e;
		}
		return u.current;
	} : -1), p = a ?? d, m = tS.useRef(null), h = tS.useCallback((e) => {
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
var tS, nS = o((() => {
	tS = /* @__PURE__ */ u(b(), 1), fi(), $x();
}));
// node_modules/@base-ui/react/menu/group/MenuGroupContext.mjs
function rS() {
	let e = iS.useContext(aS);
	if (e === void 0) throw Error(Mi(31));
	return e;
}
var iS, aS, oS = o((() => {
	Ni(), iS = /* @__PURE__ */ u(b(), 1), aS = /*#__PURE__*/ iS.createContext(void 0);
})), sS, cS, lS, uS, dS = o((() => {
	sS = /* @__PURE__ */ u(b(), 1), Vx(), Oa(), oS(), cS = bs(), lS = /*#__PURE__*/ sS.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, ...a } = e, [o, s] = sS.useState(void 0), c = ya("div", e, {
			ref: t,
			props: {
				role: "group",
				"aria-labelledby": o,
				...a
			}
		});
		return /*#__PURE__*/ (0, cS.jsx)(aS.Provider, {
			value: s,
			children: c
		});
	}), uS = /*#__PURE__*/ sS.forwardRef(function(e, t) {
		let n = Fx()?.Group ?? lS;
		return /*#__PURE__*/ (0, cS.jsx)(n, {
			...e,
			ref: t
		});
	});
})), fS, pS, mS = o((() => {
	fS = /* @__PURE__ */ u(b(), 1), fi(), Oa(), Ol(), oS(), pS = /*#__PURE__*/ fS.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, id: a, ...o } = e, s = Dl(a), c = rS();
		return J(() => (c(s), () => {
			c((e) => e === s ? void 0 : e);
		}), [c, s]), ya("div", e, {
			ref: t,
			props: {
				id: s,
				"aria-hidden": !0,
				...o
			}
		});
	});
})), hS, gS, _S, vS, yS = o((() => {
	hS = /* @__PURE__ */ u(b(), 1), Vx(), Yx(), Dx(), Oa(), Ol(), nS(), gS = bs(), _S = /*#__PURE__*/ hS.forwardRef(function(e, t) {
		let { render: n, className: r, id: i, label: a, nativeButton: o = !1, disabled: s = !1, closeOnClick: c = !0, style: l, ...u } = e, { store: d } = wx(), f = eS({
			guess: !0,
			label: a
		}), p = Dl(i), m = d.useState("disabled"), h = d.useState("isActive", f.index), g = d.useState("floatingNodeId"), _ = d.useState("itemProps"), v = s || m, { getItemProps: y, itemRef: b } = Kx({
			closeOnClick: c,
			disabled: v,
			highlighted: h,
			id: p,
			store: d,
			nativeButton: o,
			nodeId: g,
			itemMetadata: Jx
		});
		return ya("div", e, {
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
	}), vS = /*#__PURE__*/ hS.forwardRef(function(e, t) {
		let n = Lx(e, t);
		return n.visible ? /*#__PURE__*/ (0, gS.jsx)(_S, {
			...e,
			ref: n.ref
		}) : null;
	});
}));
// node_modules/@base-ui/react/toolbar/root/ToolbarRootContext.mjs
function bS(e) {
	let t = xS.useContext(SS);
	if (t === void 0 && !e) throw Error(Mi(69));
	return t;
}
var xS, SS, CS = o((() => {
	Ni(), xS = /* @__PURE__ */ u(b(), 1), SS = /*#__PURE__*/ xS.createContext(void 0);
}));
// node_modules/@base-ui/react/internals/getDisabledMountTransitionStyles.mjs
function wS(e) {
	return e === "starting" ? Uf : da;
}
var TS = o((() => {
	fa(), Xf();
}));
// node_modules/@base-ui/react/menu/submenu-root/MenuSubmenuRootContext.mjs
function ES() {
	return DS.useContext(OS);
}
var DS, OS, kS = o((() => {
	DS = /* @__PURE__ */ u(b(), 1), OS = /*#__PURE__*/ DS.createContext(void 0);
}));
// node_modules/@base-ui/react/internals/resolveRenderedId.mjs
function AS(e, t) {
	let n = Sa(e.render);
	if (/*#__PURE__*/ MS.isValidElement(n)) {
		let e = n.props;
		if (Object.hasOwn(e, "id")) return e.id ?? "";
	}
	return e.id ?? t;
}
function jS(e, t, n) {
	let r = AS(e, t), i = r === t ? void 0 : r;
	return [r, MS.useCallback((e) => n?.(e ? i : void 0), [i, n])];
}
var MS, NS = o((() => {
	MS = /* @__PURE__ */ u(b(), 1), Oa();
}));
// node_modules/@base-ui/react/internals/resolvePopupLabel.mjs
function PS(e, t, n) {
	let r = Sa(e.render), i = /*#__PURE__*/ FS.isValidElement(r) ? r.props : void 0, a = e["aria-label"] ?? i?.["aria-label"], o = e["aria-labelledby"] ?? i?.["aria-labelledby"];
	return o == null && !a && (o = t ? t.id || void 0 : n || void 0), o;
}
var FS, IS = o((() => {
	FS = /* @__PURE__ */ u(b(), 1), Oa();
}));
// node_modules/@base-ui/react/menu/popup/MenuPopup.mjs
function LS() {
	return VS;
}
var RS, zS, BS, VS, HS, US = o((() => {
	RS = /* @__PURE__ */ u(b(), 1), S_(), Dx(), Cx(), Oa(), Rc(), lm(), Gc(), ml(), CS(), B_(), TS(), kS(), NS(), IS(), Vx(), zS = bs(), BS = /*#__PURE__*/ RS.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, finalFocus: a, id: o, initialFocus: s, ...c } = e, { store: l, defaultFloatingId: u, setRenderedFloatingId: d, virtualFocus: f, orientation: p } = wx(), m = ES(), { side: h, align: g } = bx(), _ = bS(!0) != null, v = l.useState("open"), y = l.useState("transitionStatus"), b = l.useState("popupProps"), x = l.useState("mounted"), S = l.useState("instantType"), C = l.useState("activeTriggerElement"), w = l.useState("parent"), T = l.useState("lastOpenChangeReason"), E = l.useState("rootId"), D = l.useState("floatingRootContext"), O = l.useState("floatingTreeRoot"), k = l.useState("closeDelay"), A = l.useState("hoverEnabled"), j = l.useState("disabled"), M = l.useState("openMethod"), N = l.useState("activeTriggerId"), P = l.useState("listElement"), [F, I] = jS(e, u, d), L = PS(e, C, N), R = w.type === "menu" ? m : void 0, z = w.type === "context-menu", B = s ?? w.type !== "menu";
		s === void 0 && P && w.type !== "menu" && (B = () => l.state.activeIndex === null && P), sm({
			open: v,
			ref: l.context.popupRef,
			onComplete() {
				v && l.context.onOpenChangeComplete?.(!0);
			}
		}), RS.useEffect(() => {
			function e(e) {
				l.setOpen(!1, Uc(e.reason, e.domEvent));
			}
			return O.events.on("close", e), () => {
				O.events.off("close", e);
			};
		}, [O.events, l]), Rh(D, {
			enabled: A && !j && !z && w.type !== "menubar",
			closeDelay: k
		});
		let V = l.useStateSetter("popupElement"), { parentVirtualFocusRef: H, handleFocus: ee } = (RS.useContext(zx)?.useParentHandoff ?? LS)(l, w, v, f), te = ya("div", e, {
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
				V,
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
						R?.onPopupKeyDown?.(e), _ && L_.has(e.key) && e.stopPropagation();
					},
					onFocus: ee
				},
				wS(y),
				c,
				{ "data-rootownerid": E }
			]
		}), U = w.type === void 0 || z;
		(C || w.type === "menubar" && T !== "outside-press") && (U = !0);
		let ne = R?.getReturnElement ?? H;
		return /*#__PURE__*/ (0, zS.jsx)(Op, {
			context: D,
			openInteractionType: M,
			modal: z,
			disabled: !x,
			returnFocus: a ?? ne ?? U,
			explicitReturnFocus: a === void 0 && ne ? !1 : void 0,
			initialFocus: B,
			restoreFocus: !0,
			getInsideElements: w.type === void 0 ? () => [l.context.beforeTriggerFocusGuardRef.current] : void 0,
			externalTree: w.type === "menubar" ? void 0 : O,
			previousFocusableElement: C,
			nextFocusableElement: w.type === void 0 ? l.context.triggerFocusTargetRef : void 0,
			beforeContentFocusGuardRef: l.context.beforeContentFocusGuardRef,
			children: te
		});
	}), VS = {
		parentVirtualFocusRef: void 0,
		handleFocus: void 0
	}, HS = /*#__PURE__*/ RS.forwardRef(function(e, t) {
		let n = Fx()?.Popup ?? BS;
		return /*#__PURE__*/ (0, zS.jsx)(n, {
			...e,
			ref: t
		});
	});
}));
// node_modules/@base-ui/react/menu/portal/MenuPortalContext.mjs
function WS() {
	let e = GS.useContext(KS);
	if (e === void 0) throw Error(Mi(32));
	return e;
}
var GS, KS, qS = o((() => {
	Ni(), GS = /* @__PURE__ */ u(b(), 1), KS = /*#__PURE__*/ GS.createContext(void 0);
})), JS, YS, XS, ZS = o((() => {
	JS = /* @__PURE__ */ u(b(), 1), S_(), Dx(), qS(), YS = bs(), XS = /*#__PURE__*/ JS.forwardRef(function(e, t) {
		let { keepMounted: n = !1, ...r } = e, { store: i, parent: a } = wx();
		if (!(i.useState("mounted") || n)) return null;
		let o = a.type === "menu" || a.type === "menubar" ? "group" : void 0;
		return /*#__PURE__*/ (0, YS.jsx)(KS.Provider, {
			value: n,
			children: /*#__PURE__*/ (0, YS.jsx)(ip, {
				ref: t,
				...r,
				portalOwnerRole: o
			})
		});
	});
}));
// node_modules/@base-ui/react/floating-ui-react/hooks/useFloating.mjs
function QS(e) {
	let { nodeId: t, externalTree: n, rootContext: r } = e, i = r.useState("referenceElement"), a = r.useState("floatingElement"), o = r.useState("domReferenceElement"), s = r.useState("open"), c = r.useState("floatingId"), [l, u] = $S.useState(null), d = $S.useRef(null), f = vp(n), p = $S.useMemo(() => ({
		reference: i,
		floating: a,
		domReference: o
	}), [
		i,
		a,
		o
	]), m = d_({
		...e,
		elements: {
			...p,
			...l && { reference: l }
		}
	}), h = $S.useCallback((e) => {
		let t = jr(e) ? {
			getBoundingClientRect: () => e.getBoundingClientRect(),
			getClientRects: () => e.getClientRects(),
			contextElement: e
		} : e;
		u(t), m.refs.setReference(t);
	}, [m.refs]), g = $S.useMemo(() => ({
		...m.refs,
		setPositionReference: h,
		domReference: d
	}), [m.refs, h]), _ = $S.useMemo(() => ({
		...m.elements,
		domReference: o
	}), [m.elements, o]), v = $S.useMemo(() => ({
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
	return J(() => {
		o && (d.current = o);
	}, [o]), J(() => {
		r.context.dataRef.current.floatingContext = v;
		let e = f?.nodesRef.current.find((e) => e.id === t);
		e && (e.context = v);
	}), $S.useMemo(() => ({
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
var $S, eC = o((() => {
	$S = /* @__PURE__ */ u(b(), 1), fi(), x_(), Zr(), yp();
}));
// node_modules/@base-ui/react/internals/direction-context/DirectionContext.mjs
function tC() {
	return nC.useContext(rC)?.direction ?? "ltr";
}
var nC, rC, iC = o((() => {
	nC = /* @__PURE__ */ u(b(), 1), rC = /*#__PURE__*/ nC.createContext(void 0);
})), aC, oC, sC = o((() => {
	Hd(), aC = (e) => ({
		name: "arrow",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = gd(e, t) || {};
			if (l == null) return {};
			let d = Ad(u), f = {
				x: n,
				y: r
			}, p = Sd(i), m = bd(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = s.floating[y] || a.floating[m], C = b / 2 - x / 2, w = S / 2 - h[m] / 2 - 1, T = Math.min(d[_], w), E = Math.min(d[v], w), D = T, O = S - h[m] - E, k = S / 2 - h[m] / 2 + C, A = hd(D, k, O), j = !c.arrow && vd(i) != null && k !== A && a.reference[m] / 2 - (k < D ? T : E) - h[m] / 2 < 0, M = j ? k < D ? k - D : k - O : 0;
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
	}), oC = (e, t) => {
		let { name: n, fn: r } = aC(e);
		return {
			name: n,
			fn: r,
			options: [e, t]
		};
	};
})), cC, lC = o((() => {
	cC = {
		name: "hide",
		async fn(e) {
			let { width: t, height: n, x: r, y: i } = e.rects.reference, a = t === 0 && n === 0 && r === 0 && i === 0, o = await e.platform.detectOverflow(e, { elementContext: "reference" });
			return { data: { referenceHidden: o.top - n >= 0 || o.right - t >= 0 || o.bottom - n >= 0 || o.left - t >= 0 || a } };
		}
	};
})), uC, dC = o((() => {
	uC = {
		sideX: "left",
		sideY: "top"
	};
})), fC, pC, mC, hC, gC, _C = o((() => {
	fC = "--available-width", pC = "--available-height", mC = "--anchor-width", hC = "--anchor-height", gC = "--transform-origin";
}));
// node_modules/@base-ui/react/internals/useAnchorPositioning.mjs
function vC(e, t, n) {
	let r = e === "inline-start" || e === "inline-end";
	return {
		top: "top",
		right: r ? n ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: r ? n ? "inline-end" : "inline-start" : "left"
	}[t];
}
function yC(e, t, n) {
	let { rects: r, placement: i } = e;
	return {
		side: vC(t, _d(i), n),
		align: vd(i) || "center",
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
function bC(e) {
	return xC(e, QS);
}
function xC(e, t) {
	let { anchor: n, positionMethod: r = "absolute", side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, collisionBoundary: c, collisionPadding: l = 5, sticky: u = !1, arrowPadding: d = 5, disableAnchorTracking: f = !1, inline: p, keepMounted: m = !1, floatingRootContext: h, mounted: g, collisionAvoidance: _, shift: v, nodeId: y, adaptiveOrigin: b, lazyFlip: x = !1, externalTree: S } = e, C = _.side || "flip", w = _.align || "flip", T = _.fallbackAxisSide || "end", E = v?.crossAxis ?? !1, D = v?.rootBoundary, O = typeof n == "function" ? n : void 0, k = q(O), A = O ? k : n, j = Qu(n), M = Qu(g), N = tC() === "rtl", [P, F] = CC.useState(null);
	!g && P !== null && F(null);
	let I = x === "placement", L = P ? _d(P) : null, R = P && I ? vd(P) || "center" : null, z = L || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": N ? "left" : "right",
		"inline-start": N ? "right" : "left"
	}[i], B = R || o, V = B === "center" ? z : `${z}-${B}`, H = l;
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
	let ee = +(i === "bottom"), te = +(i === "top"), U = +(i === "right"), ne = +(i === "left"), W = {
		boundary: c === "clipping-ancestors" ? "clippingAncestors" : c,
		padding: H
	}, re = CC.useRef(null), G = Qu(a), K = Qu(s), ie = typeof a == "function" ? 0 : a, ae = typeof s == "function" ? 0 : s, oe = [];
	p && oe.push(p), oe.push(g_((e) => {
		let t = yC(e, i, N), n = typeof G.current == "function" ? G.current(t) : G.current, r = typeof K.current == "function" ? K.current(t) : K.current;
		return {
			mainAxis: n,
			crossAxis: r,
			alignmentAxis: r
		};
	}, [
		ie,
		ae,
		N,
		i
	]));
	let se = w === "none" && C !== "shift", ce = !se && (u || E || C === "shift"), le = C === "none" ? null : y_({
		...W,
		padding: {
			top: H.top + 1 + ee,
			right: H.right + 1 + ne,
			bottom: H.bottom + 1 + te,
			left: H.left + 1 + U
		},
		mainAxis: !E && C === "flip",
		crossAxis: w === "flip" && "alignment",
		fallbackAxisSideDirection: T
	}), ue = se ? null : __({
		...W,
		rootBoundary: D,
		mainAxis: w !== "none",
		crossAxis: ce,
		limiter: u || E ? void 0 : v_((e) => {
			if (!re.current) return {};
			let { width: t, height: n } = re.current.getBoundingClientRect(), r = xd(_d(e.placement)), i = r === "y" ? t : n, a = r === "y" ? H.left + H.right : H.top + H.bottom;
			return { offset: i / 2 + a / 2 };
		})
	}, [
		W,
		u,
		E,
		D,
		H,
		w
	]);
	C === "shift" || w === "shift" || B === "center" ? oe.push(ue, le) : oe.push(le, ue), oe.push(b_({
		...W,
		apply({ elements: { floating: e }, availableWidth: t, availableHeight: n, rects: r }) {
			if (!M.current) return;
			let i = e.style;
			i.setProperty(wC, `${t}px`), i.setProperty(TC, `${n}px`);
			let a = Or(e).devicePixelRatio || 1, { x: o, y: s, width: c, height: l } = r.reference, u = (Math.round((o + c) * a) - Math.round(o * a)) / a, d = (Math.round((s + l) * a) - Math.round(s * a)) / a;
			i.setProperty(mC, `${u}px`), i.setProperty(hC, `${d}px`);
		}
	}), oC((e) => ({
		element: re.current || Vi(e.elements.floating).createElement("div"),
		padding: re.current ? d : 0
	}), [d]), {
		name: "transformOrigin",
		fn(e) {
			let { elements: { floating: t }, middlewareData: n, placement: r, platform: o, rects: s, y: c } = e, l = _d(r), u = vd(r), d = xd(l) === "y", f = re.current, p = typeof a == "function" ? a(yC(e, i, N)) : a, m;
			m = !f && u && Math.abs(d ? n.shift?.x || 0 : n.shift?.y || 0) <= 1 ? u === "start" === (d && o.isRTL?.(t) === !0) ? "100%" : "0%" : `${(d ? n.arrow?.x || 0 : n.arrow?.y || 0) + (d ? f?.clientWidth || 0 : f?.clientHeight || 0) / 2}px`;
			let h = l === "top" || l === "left" ? `calc(100% + ${p}px)` : `${-p}px`;
			return ce && d && Math.abs(n.shift?.y || 0) > p && (h = `${s.reference.y + s.reference.height / 2 - c}px`), t.style.setProperty(gC, d ? `${m} ${h}` : `${h} ${m}`), {};
		}
	}, cC, b), J(() => {
		!g && h && h.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null,
			positionReference: null
		});
	}, [g, h]);
	let de = CC.useMemo(() => ({
		ancestorScroll: !f,
		elementResize: !f && typeof ResizeObserver < "u",
		layoutShift: !f && typeof IntersectionObserver < "u"
	}), [f]), { refs: fe, elements: pe, x: me, y: he, middlewareData: ge, update: _e, placement: ve, context: ye, isPositioned: be, floatingStyles: xe } = t({
		rootContext: h,
		open: m ? g : void 0,
		placement: V,
		middleware: oe,
		strategy: r,
		whileElementsMounted: m ? void 0 : (...e) => Yg(...e, de),
		nodeId: y,
		externalTree: S
	}), { sideX: Se, sideY: Ce } = ge.adaptiveOrigin || uC, we = be ? r : "fixed", Te = CC.useMemo(() => {
		let e;
		return e = be ? b ? {
			position: we,
			[Se]: me,
			[Ce]: he
		} : {
			...xe,
			position: we
		} : {
			position: we,
			top: 0,
			left: 0
		}, e[wC] = "100vw", e[TC] = "100vh", be || (e.opacity = 0), e;
	}, [
		b,
		we,
		Se,
		me,
		Ce,
		he,
		xe,
		be
	]), Ee = CC.useRef(null);
	J(() => {
		if (!g) return;
		let e = j.current, t = typeof e == "function" ? e() : e, n = (SC(t) ? t.current : t) || null;
		n !== Ee.current && (fe.setPositionReference(n), Ee.current = n);
	}, [
		g,
		fe,
		A,
		j
	]), CC.useEffect(() => {
		if (!g) return;
		let e = j.current;
		typeof e != "function" && SC(e) && e.current !== Ee.current && (fe.setPositionReference(e.current), Ee.current = e.current);
	}, [
		g,
		fe,
		A,
		j
	]), CC.useEffect(() => {
		if (m && g && pe.reference && pe.floating) return Yg(pe.reference, pe.floating, _e, de);
	}, [
		m,
		g,
		pe,
		_e,
		de
	]);
	let De = _d(ve), Oe = vC(i, De, N), ke = vd(ve) || "center", Ae = !!ge.hide?.referenceHidden;
	J(() => {
		x && g && be && (De !== z || I && ke !== B) && F(ve);
	}, [
		x,
		I,
		g,
		be,
		ve,
		De,
		ke,
		z,
		B
	]);
	let je = CC.useMemo(() => ({
		position: "absolute",
		top: ge.arrow?.y,
		left: ge.arrow?.x
	}), [ge.arrow]), Me = ge.arrow?.centerOffset !== 0;
	return CC.useMemo(() => ({
		positionerStyles: Te,
		arrowStyles: je,
		arrowRef: re,
		arrowUncentered: Me,
		side: Oe,
		align: ke,
		physicalSide: De,
		anchorHidden: Ae,
		refs: fe,
		context: ye,
		isPositioned: be,
		update: _e
	}), [
		Te,
		je,
		re,
		Me,
		Oe,
		ke,
		De,
		Ae,
		fe,
		ye,
		be,
		_e
	]);
}
function SC(e) {
	return e != null && "current" in e;
}
var CC, wC, TC, EC = o((() => {
	CC = /* @__PURE__ */ u(b(), 1), Hd(), Hi(), fi(), ed(), li(), S_(), eC(), iC(), sC(), lC(), dC(), _C(), wC = fC, TC = pC;
}));
// node_modules/@base-ui/react/internals/composite/list/CompositeList.mjs
function DC(e) {
	let { children: t, elementsRef: n, labelsRef: r, onMapChange: i } = e, a = q(i), [, o] = PC.useState(0), s = ti(kC).current, c = ti(OC).current, l = PC.useRef(0), u = PC.useRef(!0), d = PC.useRef(null), f = PC.useRef(null), p = q(() => {
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
	function _(e) {
		if (f.current?.disconnect(), f.current = null, typeof MutationObserver != "function" || e.length < 2) return;
		let t = new MutationObserver((n) => {
			if (!MC(n)) return;
			let r = null;
			for (let n of e) if (n.isConnected) {
				if (r && NC(r, n) > 0) {
					t.disconnect(), p();
					return;
				}
				r = n;
			}
		});
		f.current = t;
		let n = /* @__PURE__ */ new Set();
		for (let t = 1; t < e.length; t += 1) {
			let r = jC(e[t - 1], e[t]);
			r && n.add(r);
		}
		n.forEach((e) => t.observe(e, { childList: !0 }));
	}
	let v = q(() => {
		let [e, t] = AC(c), n = g(e), r = d.current, i = !r || r.length !== e.length || e.some((e, t) => {
			let n = r[t];
			return e.index !== n.index || e.element !== n.element || e.registration.index !== n.registration.index || e.registration.metadata !== n.registration.metadata;
		});
		_(t), d.current = e, u.current = !1, i && (s.forEach((e) => e(n)), a(n));
	});
	J(() => (!u.current && d.current && g(d.current), () => {
		n.current = [], r && (r.current = []);
	}), [
		n,
		r,
		g
	]), J(() => {
		u.current && v();
	}), J(() => () => {
		f.current?.disconnect(), u.current = !0;
	}, []);
	let y = q((e) => (s.add(e), () => {
		s.delete(e);
	})), b = PC.useMemo(() => ({
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
	return /*#__PURE__*/ (0, FC.jsx)(Qx.Provider, {
		value: b,
		children: t
	});
}
function OC() {
	return /* @__PURE__ */ new Map();
}
function kC() {
	return /* @__PURE__ */ new Set();
}
function AC(e) {
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
	return r.sort((e, t) => NC(e.element, t.element)), r.forEach((e) => {
		for (; t.has(i);) i += 1;
		e.index = i, n.push(e), i += 1;
	}), t.size > 0 && n.sort((e, t) => e.index - t.index), [n, r.map((e) => e.element)];
}
function jC(e, t) {
	let n = e.parentElement;
	for (; n && !n.contains(t);) n = n.parentElement;
	return n;
}
function MC(e) {
	for (let t of e) for (let e = 0; e < t.removedNodes.length; e += 1) if (t.removedNodes[e].isConnected) return !0;
	return !1;
}
function NC(e, t) {
	return e.nextElementSibling === t ? -1 : t.nextElementSibling === e ? 1 : e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
var PC, FC, IC = o((() => {
	PC = /* @__PURE__ */ u(b(), 1), ii(), li(), fi(), $x(), FC = bs();
}));
// node_modules/@base-ui/react/internals/useTriggerSwitchTransition.mjs
function LC(e) {
	let { store: t, domReference: n, positionerElement: r, open: i } = e, a = RC.useRef(null), o = RC.useRef(null), s = rm(r);
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
var RC, zC = o((() => {
	RC = /* @__PURE__ */ u(b(), 1), fi(), om();
}));
// node_modules/@base-ui/react/utils/usePositioner.mjs
function BC(e, t, { styles: n, transitionStatus: r, props: i, refs: a, hidden: o, inert: s = !1 }) {
	let c = { ...n };
	return s && (c.pointerEvents = "none"), ya("div", e, {
		state: t,
		ref: a,
		props: [
			{
				role: "presentation",
				hidden: o,
				style: c
			},
			wS(r),
			i
		],
		stateAttributesMapping: Ic
	});
}
var VC = o((() => {
	Rc(), Oa(), TS();
}));
// node_modules/@base-ui/react/utils/useAnchoredPopupScrollLock.mjs
function HC(e, t, n, r) {
	let [i, a] = UC.useState(!1);
	J(() => {
		if (!e || !t || n == null) {
			a(!1);
			return;
		}
		let r = Vi(n).documentElement.clientWidth, i = n.offsetWidth;
		a(r > 0 && i > 0 && i >= r - WC);
	}, [
		e,
		t,
		n
	]), pv(e && (!t || i), r);
}
var UC, WC, GC = o((() => {
	UC = /* @__PURE__ */ u(b(), 1), Hi(), yv(), fi(), WC = 20;
})), KC, qC, JC, YC = o((() => {
	KC = /* @__PURE__ */ u(b(), 1), Q_(), Rl(), S_(), Cx(), Dx(), EC(), IC(), nv(), qS(), Xf(), jx(), Gc(), ml(), zC(), VC(), GC(), qC = bs(), JC = /*#__PURE__*/ KC.forwardRef(function(e, t) {
		let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o, align: s, sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = qf, style: g, ..._ } = e, { store: v, virtualFocus: y, syncHighlightedItem: b } = wx(), x = WS(), S = Ox(!0), C = v.useState("parent"), w = v.useState("floatingRootContext"), T = v.useState("floatingTreeRoot"), E = v.useState("mounted"), D = v.useState("open"), O = v.useState("modal"), k = v.useState("openMethod"), A = v.useState("activeTriggerElement"), j = v.useState("transitionStatus"), M = v.useState("positionerElement"), N = v.useState("instantType"), P = v.useState("adaptiveOrigin"), F = v.useState("lastOpenChangeReason"), I = v.useState("floatingNodeId"), L = v.useState("floatingParentNodeId"), R = w.useState("domReferenceElement"), z = n, B = c, V = l, H = s, ee = h;
		C.type === "context-menu" && (z = n ?? C.context?.anchor, H ??= "start", !o && H !== "center" && (V = e.alignOffset ?? 2, B = e.sideOffset ?? -5));
		let te = o, U = H;
		C.type === "menu" ? (te ??= "inline-end", U ??= "start", ee = e.collisionAvoidance ?? Jf) : C.type === "menubar" && (te ??= C.context.orientation === "vertical" ? "inline-end" : "bottom", U ??= "start");
		let ne = C.type === "context-menu", W = bC({
			anchor: z,
			floatingRootContext: w,
			positionMethod: S ? "fixed" : r,
			mounted: E,
			side: te,
			sideOffset: B,
			align: U,
			alignOffset: V,
			arrowPadding: ne ? 0 : f,
			collisionBoundary: u,
			collisionPadding: d,
			sticky: p,
			nodeId: I,
			keepMounted: x,
			disableAnchorTracking: m,
			collisionAvoidance: ee,
			shift: ne ? {
				crossAxis: !("side" in ee && ee.side === "flip"),
				rootBoundary: "layoutViewport"
			} : void 0,
			externalTree: T,
			adaptiveOrigin: P,
			lazyFlip: y ? "placement" : !1
		});
		KC.useEffect(() => {
			function e(e) {
				e.open && (e.parentNodeId === I && v.set("hoverEnabled", !1), e.nodeId !== I && e.parentNodeId === v.select("floatingParentNodeId") && v.setOpen(!1, Uc(ol)));
			}
			return T.events.on("menuopenchange", e), () => {
				T.events.off("menuopenchange", e);
			};
		}, [
			v,
			T.events,
			I
		]), KC.useEffect(() => {
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
		let re = Fl();
		KC.useEffect(() => {
			D || re.clear();
		}, [D, re]), KC.useEffect(() => {
			function e(e) {
				if (D && e.nodeId === v.select("floatingParentNodeId")) {
					if (e.target && A && A !== e.target) {
						let e = v.select("closeDelay");
						e > 0 ? re.isStarted() || re.start(e, () => {
							v.setOpen(!1, Uc(ol));
						}) : v.setOpen(!1, Uc(ol));
					} else re.clear();
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
			re
		]), KC.useEffect(() => {
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
		]), LC({
			store: v,
			domReference: R,
			positionerElement: M,
			open: D
		});
		let G = {
			open: D,
			side: W.side,
			align: W.align,
			anchorHidden: W.anchorHidden,
			nested: C.type === "menu",
			instant: N
		}, K = C.type === "menubar" && C.context.modal;
		HC(D && (K || O && F !== "trigger-hover"), k === "touch", M, A);
		let ie = BC(e, G, {
			styles: W.positionerStyles,
			transitionStatus: j,
			props: _,
			refs: [t, v.useStateSetter("positionerElement")],
			hidden: !E,
			inert: !D
		}), ae = E && C.type !== "menu" && (C.type !== "menubar" && O && F !== "trigger-hover" || C.type === "menubar" && C.context.modal), oe = null;
		return C.type === "menubar" ? oe = C.context.contentElement : C.type === void 0 && (oe = A), /*#__PURE__*/ (0, qC.jsxs)(Sx.Provider, {
			value: W,
			children: [ae && /*#__PURE__*/ (0, qC.jsx)(tv, {
				ref: C.type === "context-menu" || C.type === "nested-context-menu" ? C.context.internalBackdropRef : null,
				inert: Z_(!D),
				cutout: oe
			}), /*#__PURE__*/ (0, qC.jsx)(dp, {
				id: I,
				children: /*#__PURE__*/ (0, qC.jsx)(DC, {
					elementsRef: v.context.itemDomElements,
					labelsRef: v.context.itemLabels,
					onMapChange: b,
					children: ie
				})
			})]
		});
	});
}));
// node_modules/@base-ui/react/menubar/MenubarContext.mjs
function XC(e) {
	let t = ZC.useContext(QC);
	if (t === null && !e) throw Error(Mi(5));
	return t;
}
var ZC, QC, $C = o((() => {
	Ni(), ZC = /* @__PURE__ */ u(b(), 1), QC = /*#__PURE__*/ ZC.createContext(null);
}));
// node_modules/@base-ui/react/utils/getHighlightReason.mjs
function ew(e) {
	return e == null ? Kc : e.type.startsWith("key") ? rl : e.type.startsWith("mouse") || e.type.startsWith("pointer") ? il : Kc;
}
var tw = o((() => {
	ml();
}));
// node_modules/@base-ui/react/menu/store/MenuStore.mjs
function nw(e) {
	return {
		positionerRef: /*#__PURE__*/ iw.createRef(),
		popupRef: /*#__PURE__*/ iw.createRef(),
		typingRef: { current: !1 },
		itemDomElements: { current: [] },
		itemLabels: { current: [] },
		highlightReason: "none",
		highlightEvent: void 0,
		reportedItem: void 0,
		allowMouseUpTriggerRef: { current: !1 },
		virtualFocusRef: void 0,
		triggerFocusTargetRef: /*#__PURE__*/ iw.createRef(),
		beforeTriggerFocusGuardRef: /*#__PURE__*/ iw.createRef(),
		beforeContentFocusGuardRef: /*#__PURE__*/ iw.createRef(),
		onOpenChangeComplete: void 0,
		triggerElements: e
	};
}
function rw(e, t, n = !1, r) {
	return {
		...ph(e, t, n),
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
		filterTriggerProps: da,
		inputProps: da,
		inputFocused: !1,
		highlightedItem: void 0,
		hoverEnabled: !0,
		instantType: void 0,
		openChangeReason: null,
		floatingTreeRoot: new cp(),
		floatingNodeId: void 0,
		floatingParentNodeId: null,
		itemProps: da,
		keyboardEventRelay: void 0,
		closeDelay: 0,
		adaptiveOrigin: void 0,
		...r
	};
}
var iw, aw, ow, sw = o((() => {
	iw = /* @__PURE__ */ u(b(), 1), ch(), fa(), au(), lp(), Th(), aw = {
		...yh,
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
			let n = yh.triggerPopupId(e, t);
			return n ? e.listElement?.id || n : void 0;
		},
		filterTriggerProps: (e) => e.filterTriggerProps,
		inputProps: (e) => e.inputProps,
		webkitAriaSelected: (e, t) => Ql && e.inputFocused && t ? !0 : void 0,
		highlightedItemId: (e) => e.highlightedItem?.id || void 0,
		isActive: (e, t) => e.activeIndex === t,
		hoverEnabled: (e) => e.hoverEnabled,
		instantType: (e) => e.instantType === "trigger-change" && !yh.open(e) ? void 0 : e.instantType,
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
	}, ow = class extends ah {
		constructor(e, t, n = !1) {
			let r = new Am(), i = rw(r, t, n, e);
			super(i, nw(r), aw), this.observe("parent", (e) => {
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
})), cw, lw, uw = o((() => {
	cw = /* @__PURE__ */ u(b(), 1), lw = /*#__PURE__*/ cw.createContext(null);
}));
// node_modules/@base-ui/react/menu/utils/isKeyboardOpen.mjs
function dw(e, t) {
	return (e === "trigger-press" || e === "item-press") && t?.detail === 0;
}
function fw(e, t) {
	return e === "list-navigation" || dw(e, t);
}
var pw = o((() => {
	ml();
}));
// node_modules/@base-ui/react/menu/root/MenuRoot.mjs
function mw(e) {
	let t = hw.useContext(lw);
	if (t === null) return /*#__PURE__*/ (0, gw.jsx)(_w, { ...e });
	let n = t.Root;
	return /*#__PURE__*/ (0, gw.jsx)(lw.Provider, {
		value: null,
		children: /*#__PURE__*/ (0, gw.jsx)(n, {
			...t.options,
			...e
		})
	});
}
var hw, gw, _w, vw = o((() => {
	hw = /* @__PURE__ */ u(b(), 1), Rl(), li(), fi(), ii(), fa(), Km(), S_(), Dx(), $C(), Xf(), iC(), Xv(), Gc(), ml(), tw(), jx(), Ai(), om(), sw(), Th(), Ol(), uw(), pw(), gw = bs(), _w = Bm(function(e) {
		let { children: t, open: n, onOpenChange: r, onOpenChangeComplete: i, onItemHighlighted: a, defaultOpen: o = !1, disabled: s = !1, modal: c, loopFocus: l = !0, orientation: u = "vertical", actionsRef: d, closeParentOnEsc: f = !1, handle: p, triggerId: m, defaultTriggerId: h = null, highlightItemOnHover: g = !0, isSubmenu: _ = !1, virtualFocus: v = !1, virtualFocusRef: y, allowEscape: b = !0, resetOnPointerLeave: x = !0 } = e, S = Ox(!0), C = wx(!0), w = XC(!0), T = C?.store, E = C?.virtualFocus ?? !1, D = hw.useMemo(() => _ && T ? {
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
		]), O = Dl(), k = Dl(), [A, j] = hw.useState(void 0), M = (A ?? k) || void 0, N = _p(), P = D.type === "menu" ? D.store : void 0, F = (n ?? o) && P?.state.transitionStatus === "starting", I = ti(() => F ? P?.state.instantType : void 0).current, L = ti(() => {
			let e = new ow({
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
		let R = L.useState("floatingTreeRoot"), z = up(R), B = L.useState("open"), V = L.useState("activeTriggerElement"), H = L.useState("positionerElement"), ee = L.useState("hoverEnabled"), te = L.useState("disabled"), U = L.useState("lastOpenChangeReason"), ne = L.useState("parent"), W = L.useState("activeIndex"), re = L.useState("keyboardOpen"), G = L.useState("payload"), K = L.useState("floatingParentNodeId"), ie = hw.useRef(null), ae = hw.useRef(ne.type !== "context-menu"), oe = Fl(), se = hw.useRef(!0), ce = Fl(), le = K != null, { openMethod: ue, triggerProps: de } = Jv(B);
		L.useSyncedValues({
			disabled: s,
			highlightItemOnHover: g,
			modal: ne.type === void 0 ? c : void 0,
			openMethod: ue,
			rootId: O
		}), Sm(L);
		let { forceUnmount: fe, transitionStatus: pe } = Cm(B, L, () => {
			L.set("allowMouseEnter", !1);
		}, F), me = rm(L.context.popupRef);
		hw.useEffect(() => {
			if (I === void 0) return;
			let e = () => {
				L.state.instantType === I && L.set("instantType", void 0);
			};
			if (!B) {
				e();
				return;
			}
			if (pe !== void 0) return;
			if (L.context.popupRef.current == null) {
				e();
				return;
			}
			let t = new AbortController();
			return me(e, t.signal), () => {
				t.abort();
			};
		}, [
			I,
			B,
			pe,
			me,
			L
		]), J(() => {
			S && !C ? L.update({
				parent: {
					type: "context-menu",
					context: S
				},
				floatingNodeId: z,
				floatingParentNodeId: N
			}) : (C || !L.select("activeTriggerElement")) && L.update({
				floatingNodeId: z,
				floatingParentNodeId: N
			});
		}, [
			S,
			C,
			z,
			N,
			V,
			L
		]), hw.useEffect(() => {
			B || (ie.current = null), ne.type === "context-menu" && (B ? oe.start(500, () => {
				ae.current = !0;
			}) : (oe.clear(), ae.current = !1));
		}, [
			oe,
			B,
			ne.type
		]), J(() => {
			!B && !ee && L.set("hoverEnabled", !0);
		}, [
			B,
			ee,
			L
		]);
		let he = q((e, t) => {
			let n = t.reason;
			if (!e && !L.select("open") || B === e && t.trigger === V && U === n) return;
			let i = ym(t);
			if (!e && t.trigger == null && (t.trigger = V ?? void 0), r?.(e, t), t.isCanceled) return;
			L.state.floatingRootContext.dispatchOpenChange(e, t);
			let a = t.event;
			if (e === !1 && n !== "item-press" && a?.type === "click" && a.pointerType === "touch" && !se.current) return;
			e && n === "trigger-focus" ? (se.current = !1, ce.start(300, () => {
				se.current = !0;
			})) : (se.current = !0, ce.clear());
			let o = !e && (n === "escape-key" || n == null);
			ie.current = t.event;
			let s = vm(L.state, e, t.trigger, i());
			s.openChangeReason = n, s.keyboardOpen = e && fw(n, a), s.instantType = ne.type === "menubar" && (n === "trigger-focus" || n === "focus-out" || n === "trigger-hover" || n === "list-navigation" || n === "sibling-open") ? "group" : dw(n, a) ? "click" : o ? "dismiss" : void 0, L.update(s);
		}), ge = Yp({
			popupStore: L,
			floatingRootContext: L.state.floatingRootContext,
			floatingId: M,
			nested: N != null,
			onOpenChange: he
		}), _e = ge.context.events;
		J(() => {
			let e = ({ open: e, eventDetails: t }) => he(e, t);
			return _e.on("setOpen", e), () => {
				_e?.off("setOpen", e);
			};
		}, [_e, he]), J(() => L.subscribeToParentMenu(), [L]);
		let ve = hw.useCallback(() => {
			L.setOpen(!1, Uc(ul));
		}, [L]);
		hw.useImperativeHandle(d, () => ({
			unmount: fe,
			close: ve
		}), [fe, ve]);
		let ye;
		ne.type === "context-menu" && (ye = ne.context), hw.useImperativeHandle(ye?.positionerRef, () => H, [H]), hw.useImperativeHandle(ye?.actionsRef, () => ({ setOpen: he }), [he]);
		let be = Wp(ge, {
			enabled: !te,
			bubbles: { escapeKey: f && ne.type === "menu" },
			outsidePress() {
				return ne.type !== "context-menu" || ie.current?.type === "contextmenu" || ae.current;
			},
			externalTree: le ? R : void 0
		}), xe = tC(), Se = Qh(ge, {
			enabled: !te,
			listRef: L.context.itemDomElements,
			activeIndex: W,
			virtual: v,
			nested: ne.type === "menubar" || !v && ne.type !== void 0,
			parentOrientation: ne.type === "menubar" ? ne.context.orientation : void 0,
			loopFocus: l,
			focusItemOnOpen: v ? re : void 0,
			allowEscape: v && l && b,
			orientation: u,
			triggerOrientation: v ? "vertical" : u,
			rtl: xe === "rtl",
			disabledIndices: ua,
			onNavigate(e, t) {
				L.setActiveIndex(e, ew(t), t?.nativeEvent);
			},
			openOnArrowKeyDown: ne.type !== "context-menu" && !(v && _),
			externalTree: !v && le ? R : void 0,
			nestedReturnFocusRef: P?.context.virtualFocusRef,
			focusItemOnHover: g,
			resetOnPointerLeave: x
		}), Ce = hw.useCallback((e) => {
			L.context.typingRef.current = e;
		}, [L]), we = tg(ge, {
			enabled: !te && !v,
			listRef: L.context.itemLabels,
			elementsRef: L.context.itemDomElements,
			activeIndex: W,
			resetMs: 500,
			onMatch: (e, t) => {
				B && e !== W && L.setActiveIndex(e, rl, t.nativeEvent);
			},
			onTyping: Ce
		}), Te = q(a), Ee = hw.useRef(-1), De = q(() => {
			let e = L.state.activeIndex, t = e === null ? void 0 : L.context.itemDomElements.current[e] ?? void 0;
			if (t?.isConnected === !1) return;
			let n = t === void 0 ? -1 : e;
			if (Ee.current === n && L.context.reportedItem === t) return;
			Ee.current = n, L.context.reportedItem = t, v && L.set("highlightedItem", t);
			let { highlightReason: r, highlightEvent: i } = L.context;
			L.context.highlightReason = Kc, L.context.highlightEvent = void 0, a && Te(t, Wc(r, i, { label: t === void 0 ? void 0 : L.context.itemLabels.current[n] ?? void 0 }));
		});
		J(() => {
			De();
		}, [W, De]);
		let Oe = hw.useMemo(() => {
			if (!v) return Se.reference;
			if (!Se.trigger) return da;
			let { onFocus: e, ...t } = Se.trigger;
			return t;
		}, [
			v,
			Se.reference,
			Se.trigger
		]);
		L.useSyncedValue("inputProps", v ? Se.reference ?? da : da);
		let ke = hw.useMemo(() => {
			let e = hi(we.reference, Oe, be.reference, { onMouseMove() {
				L.set("allowMouseEnter", !0);
			} }, de);
			return e["aria-haspopup"] = "menu", e["aria-expanded"] = B, e;
		}, [
			L,
			we.reference,
			Oe,
			be.reference,
			de,
			B
		]), Ae = hw.useMemo(() => {
			let e = hi(Se.trigger, be.trigger, de);
			return e["aria-haspopup"] = "menu", e["aria-expanded"] = !1, e;
		}, [
			Se.trigger,
			be.trigger,
			de
		]);
		ti(() => (L.update({ inactiveTriggerProps: Ae }), null)), wm(L, {
			floatingRootContext: ge,
			activeTriggerProps: ke,
			inactiveTriggerProps: Ae,
			popupProps: hw.useMemo(() => hi(Om, {
				onMouseMove() {
					L.set("allowMouseEnter", !0), ne.type === "menu" && L.set("hoverEnabled", !1);
				},
				onClick() {
					L.select("hoverEnabled") && L.set("hoverEnabled", !1);
				},
				onKeyDown(e) {
					let t = L.select("keyboardEventRelay");
					t && !e.isPropagationStopped() && t(e);
				}
			}, we.floating, Se.floating, be.floating), [
				ne.type,
				L,
				we.floating,
				Se.floating,
				be.floating
			]),
			itemProps: Se.item ?? da
		});
		let je = hw.useMemo(() => ({
			store: L,
			parent: D,
			orientation: u,
			loopFocus: l,
			allowEscape: b,
			defaultFloatingId: k,
			setRenderedFloatingId: j,
			virtualFocus: v,
			parentVirtualFocus: E,
			syncHighlightedItem: De
		}), [
			L,
			D,
			u,
			l,
			b,
			k,
			v,
			E,
			De
		]), Me = typeof t == "function" ? t({ payload: G }) : t, Ne = /*#__PURE__*/ (0, gw.jsxs)(Ex.Provider, {
			value: je,
			children: [p && /*#__PURE__*/ (0, gw.jsx)(hm, {
				handle: p,
				store: L
			}), Me]
		});
		return (ne.type === void 0 || ne.type === "context-menu") && (Ne = /*#__PURE__*/ (0, gw.jsx)(fp, {
			externalTree: R,
			children: Ne
		})), Ne;
	});
}));
// node_modules/@base-ui/react/utils/getPseudoElementBounds.mjs
function yw(e, t) {
	let n = bw(t);
	return e.clientX >= n.left - xw && e.clientX <= n.right + xw && e.clientY >= n.top - xw && e.clientY <= n.bottom + xw;
}
function bw(e) {
	let t = e.getBoundingClientRect(), n = Or(e);
	if (nu) return t;
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
var xw, Sw = o((() => {
	Hi(), au(), xw = 5;
}));
// node_modules/@base-ui/react/internals/composite/item/useCompositeItem.mjs
function Cw(e = {}) {
	let { highlightItemOnHover: t, highlightedIndex: n, onHighlightedIndexChange: r } = Pi(), { ref: i, index: a } = eS(e), o = n === a, s = ww.useRef(null), c = Xi(i, s);
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
var ww, Tw = o((() => {
	ww = /* @__PURE__ */ u(b(), 1), na(), Li(), nS();
}));
// node_modules/@base-ui/react/internals/composite/item/CompositeItem.mjs
function Ew(e) {
	let { render: t, className: n, style: r, state: i = da, props: a = ua, refs: o = ua, metadata: s, stateAttributesMapping: c, tag: l = "div", ...u } = e, { compositeProps: d, compositeRef: f } = Cw({ metadata: s });
	return ya(l, e, {
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
var Dw = o((() => {
	fa(), Oa(), Tw();
}));
// node_modules/@base-ui/react/menu/utils/findRootOwnerId.mjs
function Ow(e) {
	if (Mr(e) && e.hasAttribute("data-rootownerid")) return e.getAttribute("data-rootownerid");
	if (!Br(e)) return Ow(Ur(e));
}
var kw = o((() => {
	Zr();
}));
// node_modules/@base-ui/react/utils/popups/useTriggerFocusGuards.mjs
function Aw(e, t) {
	function n(n, r, i) {
		let a = n.currentTarget;
		jw.flushSync(() => {
			e.setOpen(!1, Uc($c, n.nativeEvent, a));
		}), _f(a.isConnected ? a : t.current, r, i)?.focus();
	}
	function r(t) {
		n(t, -1, e.select("positionerElement"));
	}
	function i(t) {
		let r = e.select("positionerElement");
		r && vf(t, r) ? e.context.beforeContentFocusGuardRef.current?.focus() : n(t, 1, r);
	}
	return {
		handlePreFocusGuardFocus: r,
		handleFocusTargetFocus: i
	};
}
var jw, Mw = o((() => {
	jw = /* @__PURE__ */ u(Os(), 1), lh(), Gc(), ml();
}));
// node_modules/@base-ui/react/utils/useMixedToggleClickHandler.mjs
function Nw(e) {
	let { enabled: t = !0, mouseDownAction: n, open: r } = e, i = Pw.useRef(!1);
	return Pw.useMemo(() => t ? {
		onMouseDown: (e) => {
			(n === "open" && !r || n === "close" && r) && (i.current = !0, Vi(e.currentTarget).addEventListener("click", () => {
				i.current = !1;
			}, { once: !0 }));
		},
		onClick: (e) => {
			i.current && (i.current = !1, e.preventBaseUIHandler());
		}
	} : da, [
		t,
		n,
		r
	]);
}
var Pw, Fw = o((() => {
	Pw = /* @__PURE__ */ u(b(), 1), Hi(), fa();
}));
// node_modules/@base-ui/react/menu/trigger/MenuTrigger.mjs
function Iw(e, t) {
	let n = Fl(), [r, i] = Rw.useState(!1);
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
function Lw() {
	let e = XC(!0);
	return Rw.useMemo(() => e ? {
		type: "menubar",
		context: e
	} : { type: void 0 }, [e]);
}
var Rw, zw, Bw, Vw = o((() => {
	Ni(), Rw = /* @__PURE__ */ u(b(), 1), Rl(), Hi(), Km(), li(), fi(), fa(), S_(), lp(), lh(), Dx(), Rc(), Oa(), Yi(), Sw(), Dw(), Li(), kw(), Th(), Mw(), Ol(), ml(), Fw(), $C(), Xf(), md(), Ai(), zw = bs(), Bw = Vm(function(e, t) {
		let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, openOnHover: c, delay: l = 100, closeDelay: u = 0, handle: d, payload: f, ...p } = e, m = wx(!0), h = xh(d) ?? m?.store;
		if (!h) throw Error(Mi(85));
		let g = Dl(s), _ = h.useState("isTriggerActive", g), v = h.useState("floatingRootContext"), y = h.useState("isOpenedByTrigger", g), b = h.useState("triggerControlsId", g), x = Rw.useRef(null), S = Lw(), C = Pi(!0), w = vp(), T = Rw.useMemo(() => w ?? new cp(), [w]), { registerTrigger: E, isMountedByThisTrigger: D } = xm(g, x, h, {
			payload: f,
			closeDelay: u,
			parent: S,
			floatingTreeRoot: T,
			floatingNodeId: up(T),
			floatingParentNodeId: _p(),
			keyboardEventRelay: C?.relayKeyboardEvent
		}), O = S.type === "menubar", k = h.useState("disabled"), A = a || k || O && S.context.disabled, { getButtonProps: j, buttonRef: M } = Gi({
			disabled: A,
			native: o
		});
		Rw.useEffect(() => {
			!y && S.type === void 0 && (h.context.allowMouseUpTriggerRef.current = !1);
		}, [
			h,
			y,
			S.type
		]);
		let N = Rw.useRef(null), P = Fl(), F = q((e) => {
			if (!N.current) return;
			P.clear(), h.context.allowMouseUpTriggerRef.current = !1;
			let t = e.target;
			Q(N.current, t) || Q(h.select("positionerElement"), t) || t === N.current || t != null && Ow(t) === h.select("rootId") || yw(e, N.current) || T.events.emit("close", {
				domEvent: e,
				reason: al
			});
		});
		Rw.useEffect(() => {
			let e = Vi(N.current);
			if (y && h.select("lastOpenChangeReason") === "trigger-hover") return e.addEventListener("mouseup", F, { once: !0 }), () => {
				e.removeEventListener("mouseup", F);
			};
		}, [
			y,
			F,
			h
		]);
		let I = O && S.context.hasSubmenuOpen, L = Vh(v, {
			enabled: (c ?? I) && !A && (!O || I && !D),
			handleClose: cg({ blockPointerEvents: !O }),
			mouseOnly: !0,
			move: !1,
			restMs: S.type === void 0 ? l : void 0,
			delay: { close: u },
			triggerElementRef: x,
			externalTree: T,
			isActiveTrigger: _,
			isClosing: () => h.select("transitionStatus") === "ending"
		}), R = Iw(y, h.select("lastOpenChangeReason")), z = Pp(v, {
			enabled: !A,
			event: y && O ? "click" : "mousedown",
			toggle: !0,
			ignoreMouse: !1,
			stickIfOpen: S.type === void 0 && R
		}), B = Oh(v, { enabled: !A && I }), V = Nw({
			open: y,
			enabled: O,
			mouseDownAction: "open"
		}), H = Rw.useMemo(() => hi(B.reference, z.reference), [B.reference, z.reference]), ee = h.useState("triggerProps", D), te = h.useState("filterTriggerProps"), { handlePreFocusGuardFocus: U, handleFocusTargetFocus: ne } = Aw(h, x), W = {
			disabled: A,
			open: y
		}, re = [
			N,
			t,
			M,
			E,
			x
		], G = [
			H,
			L ?? da,
			ee,
			{
				"aria-haspopup": "menu",
				"aria-controls": b,
				id: g,
				onMouseDown: (e) => {
					h.select("open") || (P.start(200, () => {
						h.context.allowMouseUpTriggerRef.current = !0;
					}), Vi(e.currentTarget).addEventListener("mouseup", F, { once: !0 }));
				}
			},
			te,
			O ? { role: "menuitem" } : {},
			V,
			p,
			j
		], K = ya("button", e, {
			enabled: !O,
			stateAttributesMapping: Fc,
			state: W,
			ref: re,
			props: G
		});
		return O ? /*#__PURE__*/ (0, zw.jsx)(Ew, {
			tag: "button",
			render: n,
			className: r,
			style: i,
			state: W,
			refs: re,
			props: G,
			stateAttributesMapping: Fc
		}) : y ? /*#__PURE__*/ (0, zw.jsxs)(Rw.Fragment, { children: [
			/*#__PURE__*/ (0, zw.jsx)(pd, {
				ref: h.context.beforeTriggerFocusGuardRef,
				onFocus: U
			}, `${g}-pre-focus-guard`),
			/*#__PURE__*/ (0, zw.jsx)(Rw.Fragment, { children: K }, g),
			/*#__PURE__*/ (0, zw.jsx)(pd, {
				ref: h.context.triggerFocusTargetRef,
				onFocus: ne
			}, `${g}-post-focus-guard`)
		] }) : /*#__PURE__*/ (0, zw.jsx)(Rw.Fragment, { children: K }, g);
	});
}));
// node_modules/@base-ui/utils/usePreviousValue.mjs
function Hw(e) {
	let [t, n] = Uw.useState({
		current: e,
		previous: null
	});
	return Object.is(e, t.current) || n({
		current: e,
		previous: t.current
	}), t.previous;
}
var Uw, Ww = o((() => {
	Uw = /* @__PURE__ */ u(b(), 1);
})), Gw, Kw, qw = o((() => {
	Gw = /* @__PURE__ */ u(b(), 1), Oa(), Kw = /*#__PURE__*/ Gw.forwardRef(function(e, t) {
		let { className: n, render: r, orientation: i = "horizontal", style: a, ...o } = e;
		return ya("div", e, {
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
function Jw(e) {
	return e == null || e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true";
}
var Yw = o((() => {}));
// node_modules/@base-ui/react/internals/serializeValue.mjs
function Xw(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
var Zw = o((() => {}));
// node_modules/@base-ui/react/internals/resolveValueLabel.mjs
function Qw(e) {
	return typeof e == "object" && !!e && Array.isArray(e.items);
}
function $w(e) {
	return Qw(e?.[0]);
}
function eT(e) {
	return $w(e) ? e.flatMap((e) => e.items) : e;
}
function tT(e) {
	if (!Array.isArray(e)) return e != null && "null" in e;
	let t = e;
	if ($w(t)) {
		for (let e of t) for (let t of e.items) if (t && t.value == null && t.label != null) return !0;
		return !1;
	}
	for (let e of t) if (e && e.value == null && e.label != null) return !0;
	return !1;
}
function nT(e, t) {
	if (t && e != null) return t(e) ?? "";
	if (e && typeof e == "object") {
		if ("label" in e && e.label != null) return String(e.label);
		if ("value" in e) return String(e.value);
	}
	return Xw(e);
}
function rT(e, t) {
	return t && e != null ? t(e) ?? "" : e && typeof e == "object" && "value" in e && "label" in e ? Xw(e.value) : Xw(e);
}
function iT(e, t, n) {
	function r() {
		return nT(e, n);
	}
	if (n && e != null) return n(e);
	if (e && typeof e == "object" && "label" in e && e.label != null) return e.label;
	if (t && !Array.isArray(t)) return (Object.hasOwn(t, e) ? t[e] : void 0) ?? r();
	if (Array.isArray(t)) {
		let n = eT(t);
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
function aT(e, t, n) {
	return e.reduce((e, r, i) => (i > 0 && e.push(", "), e.push(/*#__PURE__*/ (0, sT.jsx)(oT.Fragment, { children: iT(r, t, n) }, i)), e), []);
}
var oT, sT, cT = o((() => {
	oT = /* @__PURE__ */ u(b(), 1), Zw(), sT = bs();
})), lT = o((() => {
	Cx(), Dx(), Oa(), Rc(), jx(), ml(), Px(), fa(), Vx(), Ni(), Yx(), nS(), Ol(), xc(), Gc(), $p(), lm(), dS(), mS(), yS(), Gx(), Hc(), Ai(), US(), ZS(), YC(), li(), oS(), vw(), kS(), uw(), Vw(), Q_(), od(), Ww(), fi(), Hi(), om(), Hd(), Zr(), _C(), iC(), dC(), qw(), ei(), au(), gu(), S_(), Th(), sw(), Jp(), ii(), $C(), fu(), cT(), ch(), lh(), eg(), NS(), Zd(), Wi(), $x(), IS(), ed(), Uv(), pw(), na(), Rl();
})), uT = o((() => {
	lT(), Rc(), xc();
}));
// src/components/ui/dropdown-menu.tsx
function dT({ ...e }) {
	return /* @__PURE__ */ (0, vT.jsx)(mw, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function fT({ ...e }) {
	return /* @__PURE__ */ (0, vT.jsx)(Bw, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function pT({ align: e = "start", alignOffset: t = 0, side: n = "bottom", sideOffset: r = 4, className: i, ...a }) {
	let o = ny();
	return /* @__PURE__ */ (0, vT.jsx)(XS, {
		container: o ?? void 0,
		children: /* @__PURE__ */ (0, vT.jsx)(JC, {
			className: "isolate z-50 outline-none",
			align: e,
			alignOffset: t,
			side: n,
			sideOffset: r,
			children: /* @__PURE__ */ (0, vT.jsx)(HS, {
				"data-slot": "dropdown-menu-content",
				className: _s("z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-32 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", i),
				...a
			})
		})
	});
}
function mT({ ...e }) {
	return /* @__PURE__ */ (0, vT.jsx)(uS, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function hT({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, vT.jsx)(pS, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: _s("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", e),
		...n
	});
}
function gT({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, vT.jsx)(vS, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: _s("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", e),
		...r
	});
}
function _T({ className: e, ...t }) {
	return /* @__PURE__ */ (0, vT.jsx)(Kw, {
		"data-slot": "dropdown-menu-separator",
		className: _s("-mx-1 my-1 h-px bg-border", e),
		...t
	});
}
var vT, yT = o((() => {
	b(), uT(), vs(), oy(), vT = bs();
}));
// src/features/messages/use-message-gestures.ts
function bT({ reply: e, actions: t }) {
	let n = (0, xT.useRef)(null), r = (0, xT.useRef)(null), [i, a] = (0, xT.useState)(0);
	(0, xT.useEffect)(() => () => {
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
var xT, ST = o((() => {
	xT = /* @__PURE__ */ u(b(), 1);
}));
// src/features/messages/message-media.tsx
function CT(e) {
	return e >= 1048576 ? (e / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(e / 1024)) + " KB";
}
function wT({ attachment: e }) {
	let [t, n] = (0, TT.useState)(null), [r, i] = (0, TT.useState)(!1), [a, o] = (0, TT.useState)("");
	(0, TT.useEffect)(() => () => {
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
				let t = await yy.attachment(e.id), r = atob(t.attachment.data), i = new Uint8Array(r.length);
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
	return /* @__PURE__ */ (0, ET.jsxs)("div", {
		className: "mt-2 w-fit max-w-full rounded-md border border-border bg-muted/40 p-2",
		"data-no-swipe": !0,
		children: [t ? s === "image" ? /* @__PURE__ */ (0, ET.jsx)("img", {
			src: t,
			alt: e.name,
			loading: "lazy",
			className: "max-h-72 max-w-full rounded object-contain"
		}) : s === "video" ? /* @__PURE__ */ (0, ET.jsx)("video", {
			controls: !0,
			src: t,
			className: "max-h-72 max-w-full rounded"
		}) : /* @__PURE__ */ (0, ET.jsx)("audio", {
			controls: !0,
			src: t,
			className: "max-w-full"
		}) : /* @__PURE__ */ (0, ET.jsxs)(Y, {
			type: "button",
			variant: "ghost",
			disabled: r,
			onClick: () => void l(),
			className: "h-auto max-w-full justify-start py-2",
			children: [
				r ? /* @__PURE__ */ (0, ET.jsx)(Lt, { className: "size-4 animate-spin" }) : c ? s === "image" ? /* @__PURE__ */ (0, ET.jsx)(Ot, { className: "size-4" }) : /* @__PURE__ */ (0, ET.jsx)(bn, { className: "size-4" }) : /* @__PURE__ */ (0, ET.jsx)(tt, { className: "size-4" }),
				/* @__PURE__ */ (0, ET.jsxs)("span", {
					className: "min-w-0 text-left",
					children: [/* @__PURE__ */ (0, ET.jsx)("span", {
						className: "block max-w-52 truncate text-xs",
						children: e.name
					}), /* @__PURE__ */ (0, ET.jsxs)("span", {
						className: "text-[10px] text-muted-foreground",
						children: [
							CT(e.size),
							" ·",
							" ",
							c ? "Carregar mídia" : "Baixar arquivo"
						]
					})]
				}),
				!c && /* @__PURE__ */ (0, ET.jsx)(Be, { className: "size-3" })
			]
		}), a && /* @__PURE__ */ (0, ET.jsx)("p", {
			role: "alert",
			className: "mt-1 max-w-60 text-xs text-destructive",
			children: a
		})]
	});
}
var TT, ET, DT = o((() => {
	TT = /* @__PURE__ */ u(b(), 1), Tr(), Cs(), by(), ET = bs();
}));
// src/features/messages/message-row.tsx
function OT({ text: e }) {
	return /* @__PURE__ */ (0, jT.jsx)(jT.Fragment, { children: e.split(/(https?:\/\/[^\s]+|@[A-Za-z0-9_.-]{3,32})/g).map((e, t) => /^https?:\/\//.test(e) ? /* @__PURE__ */ (0, jT.jsx)("a", {
		href: e,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "break-all text-primary underline underline-offset-2",
		children: e
	}, t) : /^@[A-Za-z0-9_.-]+$/.test(e) ? /* @__PURE__ */ (0, jT.jsx)("span", {
		className: "rounded bg-accent px-0.5 font-medium text-accent-foreground",
		children: e
	}, t) : e) });
}
function kT({ message: e, person: t, own: n, read: r, onReply: i, onActions: a, onMention: o, onProfile: s, onReact: c, quickReaction: l }) {
	let u = () => {
		e.deleted || a(e);
	}, d = bT({
		reply: () => {
			e.deleted || i(e);
		},
		actions: u
	}), [f, p] = (0, AT.useState)(!1);
	return /* @__PURE__ */ (0, jT.jsxs)("article", {
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
			/* @__PURE__ */ (0, jT.jsx)(Y, {
				type: "button",
				variant: "ghost",
				size: "icon",
				className: "mt-0.5 size-9 shrink-0 rounded-full p-0",
				"aria-label": `Abrir perfil de ${t.profile.displayName}`,
				onClick: () => s(t),
				children: /* @__PURE__ */ (0, jT.jsx)(Jy, {
					profile: t.profile,
					className: "size-9"
				})
			}),
			/* @__PURE__ */ (0, jT.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					e.reply && /* @__PURE__ */ (0, jT.jsxs)("div", {
						className: "mb-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, jT.jsx)(kn, { className: "size-3 shrink-0" }),
							/* @__PURE__ */ (0, jT.jsxs)("span", {
								className: "shrink-0",
								children: ["@", e.reply.username]
							}),
							/* @__PURE__ */ (0, jT.jsx)("span", {
								className: "truncate",
								children: e.reply.content || "Arquivo"
							})
						]
					}),
					/* @__PURE__ */ (0, jT.jsxs)("div", {
						className: "flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5 pr-6",
						children: [
							/* @__PURE__ */ (0, jT.jsx)("button", {
								type: "button",
								className: "max-w-full truncate rounded text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								style: { color: t.profile.nameColor.toUpperCase() === "#FAFAFA" ? void 0 : t.profile.nameColor },
								onClick: () => o(t.username),
								children: t.profile.displayName
							}),
							/* @__PURE__ */ (0, jT.jsx)("time", {
								dateTime: e.createdAt,
								className: "text-[10px] text-muted-foreground",
								title: new Date(e.createdAt).toLocaleString("pt-BR"),
								children: new Date(e.createdAt).toLocaleTimeString("pt-BR", {
									hour: "2-digit",
									minute: "2-digit"
								})
							}),
							e.editedAt && !e.deleted && /* @__PURE__ */ (0, jT.jsx)("span", {
								className: "text-[10px] text-muted-foreground",
								children: "editada"
							}),
							e.pinned && /* @__PURE__ */ (0, jT.jsx)(_n, {
								"aria-label": "Mensagem fixada",
								className: "size-3 text-muted-foreground"
							}),
							e.bookmarked && /* @__PURE__ */ (0, jT.jsx)(ge, {
								"aria-label": "Mensagem salva",
								className: "size-3 text-muted-foreground"
							})
						]
					}),
					e.forwarded && !e.deleted && /* @__PURE__ */ (0, jT.jsx)("p", {
						className: "mt-0.5 text-[10px] text-muted-foreground",
						children: "Encaminhada"
					}),
					/* @__PURE__ */ (0, jT.jsx)("p", {
						className: `mt-0.5 whitespace-pre-wrap break-words text-sm leading-relaxed ${e.deleted ? "italic text-muted-foreground" : ""}`,
						children: e.deleted ? "Mensagem apagada" : /* @__PURE__ */ (0, jT.jsx)(OT, { text: e.content })
					}),
					!e.deleted && e.attachments.map((e) => /* @__PURE__ */ (0, jT.jsx)(wT, { attachment: e }, e.id)),
					!e.deleted && e.reactions.length > 0 && /* @__PURE__ */ (0, jT.jsx)("div", {
						className: "mt-1.5 flex flex-wrap gap-1",
						children: e.reactions.map((t) => /* @__PURE__ */ (0, jT.jsxs)("button", {
							type: "button",
							"aria-label": `Reagir com ${t.emoji}, ${t.count}`,
							"aria-pressed": t.mine,
							onClick: () => c(e, t.emoji),
							className: `rounded-md border px-2 py-0.5 text-xs transition-colors ${t.mine ? "border-primary bg-accent" : "border-border bg-muted hover:bg-accent"}`,
							children: [
								t.emoji,
								" ",
								/* @__PURE__ */ (0, jT.jsx)("span", {
									className: "tabular-nums",
									children: t.count
								})
							]
						}, t.emoji))
					}),
					n && !e.deleted && /* @__PURE__ */ (0, jT.jsxs)("p", {
						className: "mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground",
						children: [r && /* @__PURE__ */ (0, jT.jsx)(ye, { className: "size-3" }), r ? "Lida" : "Enviada"]
					})
				]
			}),
			!e.deleted && /* @__PURE__ */ (0, jT.jsx)(Y, {
				type: "button",
				size: "icon-sm",
				variant: "ghost",
				"aria-label": "Ações da mensagem",
				className: `absolute right-1 top-1 ${f ? "" : "sm:opacity-0 sm:group-focus-within:opacity-100"}`,
				onClick: u,
				children: /* @__PURE__ */ (0, jT.jsx)(Ue, { className: "size-4" })
			})
		]
	});
}
var AT, jT, MT = o((() => {
	AT = /* @__PURE__ */ u(b(), 1), Tr(), Cs(), Xy(), ST(), DT(), jT = bs();
}));
// node_modules/@base-ui/react/popover/root/PopoverRootContext.mjs
function NT(e) {
	let t = PT.useContext(FT);
	if (t === void 0 && !e) throw Error(Mi(47));
	return t;
}
var PT, FT, IT = o((() => {
	Ni(), PT = /* @__PURE__ */ u(b(), 1), FT = /*#__PURE__*/ PT.createContext(void 0);
}));
// node_modules/@base-ui/react/popover/store/PopoverStore.mjs
function LT(e, t, n, r = !1) {
	let i = {
		...ph(t, n, r),
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
function RT(e) {
	return {
		popupRef: /*#__PURE__*/ zT.createRef(),
		onOpenChange: void 0,
		onOpenChangeComplete: void 0,
		triggerFocusTargetRef: /*#__PURE__*/ zT.createRef(),
		beforeTriggerFocusGuardRef: /*#__PURE__*/ zT.createRef(),
		beforeContentFocusGuardRef: /*#__PURE__*/ zT.createRef(),
		stickIfOpenTimeout: new Ll(),
		stickIfOpen: !0,
		triggerElements: e
	};
}
var zT, BT, VT, HT, UT = o((() => {
	zT = /* @__PURE__ */ u(b(), 1), BT = /* @__PURE__ */ u(Os(), 1), ch(), Rl(), ml(), Th(), Xf(), VT = {
		...yh,
		disabled: (e) => e.disabled,
		instantType: (e) => e.instantType === "trigger-change" && !yh.open(e) ? void 0 : e.instantType,
		openMethod: (e) => e.openMethod,
		openChangeReason: (e) => e.openChangeReason,
		isPressOpenedByTrigger: (e, t) => e.openChangeReason === "trigger-press" && yh.isOpenedByTrigger(e, t),
		isTouchPressOpen: (e, t) => t && e.openMethod === "touch" && e.openChangeReason === "trigger-press",
		hasTriggerFocusGuards: (e, t) => yh.isOpenedByTrigger(e, t) && !e.focusManagerModal,
		modal: (e) => e.modal,
		titleElementId: (e) => e.titleElementId,
		descriptionElementId: (e) => e.descriptionElementId,
		openOnHover: (e) => e.openOnHover,
		closeDelay: (e) => e.closeDelay,
		adaptiveOrigin: (e) => e.adaptiveOrigin
	}, HT = class extends ah {
		constructor(e, t, n) {
			let r = new Am();
			super(LT(e, r, t, n), RT(r), VT);
		}
		setOpen = (e, t) => {
			let n = t.reason === Jc, r = t.reason === "trigger-press" && t.event.detail === 0, i = !e && (t.reason === "escape-key" || t.reason == null), a = ym(t), o = this.select("activeTriggerId");
			if (!e && t.reason === "close-press" && t.trigger == null && o != null && (t.trigger = this.context.triggerElements.getById(o) ?? this.select("activeTriggerElement") ?? void 0), this.context.onOpenChange?.(e, t), t.isCanceled) return;
			this.state.floatingRootContext.dispatchOpenChange(e, t);
			let s = () => {
				let n = vm(this.state, e, t.trigger, a());
				n.openChangeReason = t.reason, this.update(n);
			};
			n ? (this.context.stickIfOpen = !0, this.context.stickIfOpenTimeout.start(500, () => {
				this.context.stickIfOpen = !1;
			}), BT.flushSync(s)) : s();
			let c;
			r ? c = "click" : i ? c = "dismiss" : t.reason === "focus-out" && (c = "focus"), this.set("instantType", c);
		};
	};
}));
// node_modules/@base-ui/react/popover/root/PopoverRoot.mjs
function WT(e) {
	return NT(!0) ? /*#__PURE__*/ (0, JT.jsx)(YT, { props: e }) : /*#__PURE__*/ (0, JT.jsx)(fp, { children: /*#__PURE__*/ (0, JT.jsx)(YT, { props: e }) });
}
function GT(e, t) {
	let n = mm((e, n) => new HT(t, e, n));
	return qT.useEffect(() => n.context.stickIfOpenTimeout.disposeEffect(), [n]), n;
}
function KT({ store: e, modal: t }) {
	let n = Wp(e.useState("floatingRootContext"), { outsidePressEvent: {
		mouse: t === "trap-focus" ? "sloppy" : "intentional",
		touch: "sloppy"
	} }), r = n.reference, i = n.floating;
	return wm(e, {
		activeTriggerProps: r,
		inactiveTriggerProps: r,
		popupProps: i
	}), null;
}
var qT, JT, YT, XT = o((() => {
	qT = /* @__PURE__ */ u(b(), 1), Km(), S_(), IT(), UT(), Gc(), ml(), Th(), JT = bs(), YT = Bm(function({ props: e }) {
		let { children: t, open: n, defaultOpen: r = !1, onOpenChange: i, onOpenChangeComplete: a, modal: o = !1, handle: s, triggerId: c, defaultTriggerId: l = null } = e, u = GT(s, {
			modal: o,
			open: r,
			openProp: n,
			activeTriggerId: l,
			triggerIdProp: c
		});
		u.useControlledProp("openProp", n), u.useControlledProp("triggerIdProp", c);
		let d = u.useState("open"), f = u.useState("mounted"), p = u.useState("payload");
		u.useContextCallback("onOpenChange", i), u.useContextCallback("onOpenChangeComplete", a), Tm(u, d), Sm(u);
		let { forceUnmount: m } = Cm(d, u, () => {
			u.context.stickIfOpen = !0, u.set("openChangeReason", null);
		});
		u.useSyncedValues({ modal: o }), qT.useEffect(() => {
			d || u.context.stickIfOpenTimeout.clear();
		}, [u, d]), qT.useImperativeHandle(e.actionsRef, () => ({
			unmount: m,
			close: () => u.setOpen(!1, Uc(ul))
		}), [m, u]);
		let h = d || f || s != null;
		return /*#__PURE__*/ (0, JT.jsxs)(FT.Provider, {
			value: u,
			children: [
				s && /*#__PURE__*/ (0, JT.jsx)(hm, {
					handle: s,
					store: u
				}),
				h && /*#__PURE__*/ (0, JT.jsx)(KT, {
					store: u,
					modal: o
				}),
				typeof t == "function" ? t({ payload: p }) : t
			]
		});
	});
})), ZT = o((() => {})), QT, $T, eE, tE = o((() => {
	Ni(), QT = /* @__PURE__ */ u(b(), 1), li(), Km(), IT(), Yi(), Rc(), Oa(), Xf(), S_(), ZT(), Ol(), md(), Th(), Mw(), Xv(), $T = bs(), eE = Vm(function(e, t) {
		let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, handle: s, payload: c, openOnHover: l = !1, delay: u = 300, closeDelay: d = 0, id: f, ...p } = e, m = NT(!0), h = xh(s) ?? m;
		if (!h) throw Error(Mi(74));
		let g = Dl(f), _ = h.useState("isTriggerActive", g), v = h.useState("floatingRootContext"), y = h.useState("isOpenedByTrigger", g), b = h.useState("triggerPopupId", g), x = QT.useRef(null), { registerTrigger: S, isMountedByThisTrigger: C } = xm(g, x, h, {
			payload: c,
			disabled: a,
			openOnHover: l,
			closeDelay: d
		}), w = h.useState("isPressOpenedByTrigger", g), T = h.useState("isTouchPressOpen", l), E = h.useState("hasTriggerFocusGuards", g), D = Vh(v, {
			enabled: !a && l && !T,
			mouseOnly: !0,
			move: !1,
			handleClose: cg(),
			restMs: u,
			delay: { close: d },
			triggerElementRef: x,
			isActiveTrigger: _,
			isClosing: () => h.select("transitionStatus") === "ending"
		}), O = Pp(v, { stickIfOpen: q(() => h.context.stickIfOpen) }), k = qv(() => h.select("open"), (e) => {
			h.set("openMethod", e);
		}), A = h.useState("triggerProps", C), { getButtonProps: j, buttonRef: M } = Gi({
			disabled: a,
			native: o
		}), N = { open(e) {
			return w ? Fc.open(e) : Pc.open(e);
		} }, { handlePreFocusGuardFocus: P, handleFocusTargetFocus: F } = Aw(h, x), I = ya("button", e, {
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
					[Wf]: "",
					id: g,
					"aria-haspopup": "dialog",
					"aria-expanded": y,
					"aria-controls": b
				},
				p,
				j
			],
			stateAttributesMapping: N
		}), L = /*#__PURE__*/ (0, $T.jsx)(QT.Fragment, { children: I }, g);
		return E ? /*#__PURE__*/ (0, $T.jsxs)(QT.Fragment, { children: [
			/*#__PURE__*/ (0, $T.jsx)(pd, {
				ref: h.context.beforeTriggerFocusGuardRef,
				onFocus: P
			}),
			L,
			/*#__PURE__*/ (0, $T.jsx)(pd, {
				ref: h.context.triggerFocusTargetRef,
				onFocus: F
			})
		] }) : L;
	});
}));
// node_modules/@base-ui/react/popover/portal/PopoverPortalContext.mjs
function nE() {
	let e = rE.useContext(iE);
	if (e === void 0) throw Error(Mi(45));
	return e;
}
var rE, iE, aE = o((() => {
	Ni(), rE = /* @__PURE__ */ u(b(), 1), iE = /*#__PURE__*/ rE.createContext(void 0);
})), oE, sE, cE, lE = o((() => {
	oE = /* @__PURE__ */ u(b(), 1), S_(), IT(), aE(), sE = bs(), cE = /*#__PURE__*/ oE.forwardRef(function(e, t) {
		let { keepMounted: n = !1, ...r } = e;
		return NT().useState("mounted") || n ? /*#__PURE__*/ (0, sE.jsx)(iE.Provider, {
			value: n,
			children: /*#__PURE__*/ (0, sE.jsx)(ip, {
				ref: t,
				...r
			})
		}) : null;
	});
}));
// node_modules/@base-ui/react/popover/positioner/PopoverPositionerContext.mjs
function uE() {
	let e = dE.useContext(fE);
	if (!e) throw Error(Mi(46));
	return e;
}
var dE, fE, pE = o((() => {
	Ni(), dE = /* @__PURE__ */ u(b(), 1), fE = /*#__PURE__*/ dE.createContext(void 0);
})), mE, hE, gE, _E = o((() => {
	mE = /* @__PURE__ */ u(b(), 1), Q_(), S_(), IT(), pE(), EC(), aE(), nv(), ml(), Xf(), zC(), VC(), GC(), hE = bs(), gE = /*#__PURE__*/ mE.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, anchor: a, positionMethod: o, side: s, align: c, sideOffset: l, alignOffset: u, collisionBoundary: d = "clipping-ancestors", collisionPadding: f, arrowPadding: p, sticky: m, disableAnchorTracking: h = !1, collisionAvoidance: g = Jf, ..._ } = e, v = NT(), y = nE(), b = up(), x = v.useState("floatingRootContext"), S = v.useState("mounted"), C = v.useState("open"), w = v.useState("openChangeReason"), T = v.useState("activeTriggerElement"), E = v.useState("modal"), D = v.useState("openMethod"), O = v.useState("positionerElement"), k = v.useState("instantType"), A = v.useState("transitionStatus"), j = bC({
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
		LC({
			store: v,
			domReference: x.useState("domReferenceElement"),
			positionerElement: O,
			open: C
		});
		let M = E === !0 && w !== "trigger-hover";
		HC(C && M, D === "touch", O, T);
		let N = v.useStateSetter("positionerElement"), P = BC(e, {
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
		return /*#__PURE__*/ (0, hE.jsxs)(fE.Provider, {
			value: j,
			children: [S && M && /*#__PURE__*/ (0, hE.jsx)(tv, {
				inert: Z_(!C),
				cutout: T
			}), /*#__PURE__*/ (0, hE.jsx)(dp, {
				id: b,
				children: P
			})]
		});
	});
}));
// node_modules/@base-ui/react/utils/closePart.mjs
function vE() {
	let [e, t] = yE.useState(0), n = q(() => (t((e) => e + 1), () => {
		t((e) => Math.max(0, e - 1));
	}));
	return {
		context: yE.useMemo(() => ({ register: n }), [n]),
		hasClosePart: e > 0
	};
}
var yE, bE, xE = o((() => {
	yE = /* @__PURE__ */ u(b(), 1), li(), bE = /*#__PURE__*/ yE.createContext(void 0);
})), SE, CE, wE, TE = o((() => {
	SE = /* @__PURE__ */ u(b(), 1), Zr(), S_(), IT(), pE(), Rc(), lm(), Oa(), ml(), B_(), CS(), TS(), xE(), Th(), CE = bs(), wE = /*#__PURE__*/ SE.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, initialFocus: a, finalFocus: o, ...s } = e, c = NT(), l = uE(), u = bS(!0) != null, { context: d, hasClosePart: f } = vE(), p = c.useState("open"), m = c.useState("openMethod"), h = c.useState("instantType"), g = c.useState("transitionStatus"), _ = c.useState("popupProps"), v = c.useState("titleElementId"), y = c.useState("descriptionElementId"), b = c.useState("modal"), x = c.useState("mounted"), S = c.useState("openChangeReason"), C = c.useState("activeTriggerElement"), w = c.useState("floatingRootContext"), T = w.useState("floatingId"), E = c.useState("disabled"), D = c.useState("openOnHover"), O = c.useState("closeDelay");
		sm({
			open: p,
			ref: c.context.popupRef,
			onComplete() {
				p && c.context.onOpenChangeComplete?.(!0);
			}
		}), Rh(w, {
			enabled: D && !E,
			closeDelay: O
		});
		let k = a === void 0 ? pm(c.context.popupRef) : a, A = b !== !1 && f;
		c.useSyncedValue("focusManagerModal", A);
		let j = c.useStateSetter("popupElement"), M = ya("div", e, {
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
					...Om,
					"aria-labelledby": v,
					"aria-describedby": y,
					onKeyDown(e) {
						u && L_.has(e.key) && e.stopPropagation();
					}
				},
				wS(g),
				s
			],
			stateAttributesMapping: Lc
		});
		return /*#__PURE__*/ (0, CE.jsx)(Op, {
			context: w,
			openInteractionType: m,
			modal: A,
			disabled: !x || S === "trigger-hover",
			initialFocus: k,
			returnFocus: o,
			restoreFocus: "popup",
			getInsideElements: () => [c.context.beforeTriggerFocusGuardRef.current],
			previousFocusableElement: Mr(C) ? C : void 0,
			nextFocusableElement: c.context.triggerFocusTargetRef,
			beforeContentFocusGuardRef: c.context.beforeContentFocusGuardRef,
			children: /*#__PURE__*/ (0, CE.jsx)(bE.Provider, {
				value: d,
				children: M
			})
		});
	});
})), EE = o((() => {
	XT(), tE(), lE(), _E(), TE(), pE(), IT(), Rc(), Oa(), ml(), Ol(), Hc(), Gc(), xE(), Q_(), od(), Ww(), fi(), li(), Hi(), om(), fa(), Hd(), Zr(), _C(), iC(), dC(), UT(), Jp();
})), DE = o((() => {
	EE(), Rc();
}));
// src/components/ui/popover.tsx
function OE({ className: e, align: t = "center", side: n = "top", sideOffset: r = 6, ...i }) {
	let a = ny();
	return /* @__PURE__ */ (0, kE.jsx)(cE, {
		container: a ?? void 0,
		children: /* @__PURE__ */ (0, kE.jsx)(gE, {
			align: t,
			side: n,
			sideOffset: r,
			className: "isolate z-50 outline-none",
			children: /* @__PURE__ */ (0, kE.jsx)(wE, {
				"data-slot": "popover-content",
				className: _s("pointer-events-auto max-h-[var(--available-height)] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-lg border border-border bg-popover p-3 text-sm text-popover-foreground shadow-sm outline-none transition-[opacity,transform] duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none", e),
				...i
			})
		})
	});
}
var kE, AE, jE, ME = o((() => {
	DE(), vs(), oy(), kE = bs(), AE = WT, jE = eE;
})), NE, PE, FE, IE, LE = o((() => {
	NE = /* @__PURE__ */ u(b(), 1), Tr(), Cs(), ME(), Yb(), Ky(), by(), PE = bs(), FE = [
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
	], IE = (0, NE.forwardRef)(function({ conversation: e, editing: t, onEditDone: n }, r) {
		let i = Oy().drafts[e.id] || Gy.draft(e.id), a = (0, NE.useRef)(null), o = (0, NE.useRef)(null), s = (0, NE.useRef)(0), [c, l] = (0, NE.useState)(!1), [u, d] = (0, NE.useState)(!1), [f, p] = (0, NE.useState)(""), [m, h] = (0, NE.useState)(t?.content || ""), [g, _] = (0, NE.useState)(""), v = t ? m : i.text;
		(0, NE.useLayoutEffect)(() => {
			t && a.current?.focus();
		}, [t?.id]), (0, NE.useLayoutEffect)(() => {
			a.current && (a.current.style.height = "auto", a.current.style.height = Math.min(120, Math.max(40, a.current.scrollHeight)) + "px");
		}, [v]);
		function y(n) {
			t ? h(n) : Gy.setDraft(e.id, { text: n }), n && Date.now() - s.current > 2500 ? (s.current = Date.now(), yy.typing(e.id, !0).catch(() => {})) : n || yy.typing(e.id, !1).catch(() => {});
		}
		function b(n) {
			let r = a.current, i = t ? m : Gy.draft(e.id).text, o = r?.selectionStart ?? i.length, s = r?.selectionEnd ?? o;
			y((i.slice(0, o) + n + i.slice(s)).slice(0, 4e3)), requestAnimationFrame(() => {
				r?.focus(), r?.setSelectionRange(o + n.length, o + n.length);
			});
		}
		(0, NE.useImperativeHandle)(r, () => ({
			mention: (e) => b("@" + e + " "),
			focus: () => a.current?.focus()
		}));
		async function x() {
			if (!(c || u || !e.canSend)) {
				l(!0), p("");
				try {
					t ? (await Gy.edit(t, m), n()) : await Gy.send(e.id), a.current?.focus();
				} catch (e) {
					p(e instanceof Error ? e.message : "Não foi possível enviar.");
				} finally {
					l(!1);
				}
			}
		}
		return /* @__PURE__ */ (0, PE.jsxs)("div", {
			className: "shrink-0 border-t border-border bg-background px-3 pb-3 pt-2",
			"data-no-swipe": !0,
			children: [
				(i.reply || t) && /* @__PURE__ */ (0, PE.jsxs)("div", {
					className: "mb-2 flex min-w-0 items-center gap-2 text-xs text-muted-foreground",
					children: [
						t ? /* @__PURE__ */ (0, PE.jsx)(mn, { className: "size-3" }) : /* @__PURE__ */ (0, PE.jsx)(kn, { className: "size-3" }),
						/* @__PURE__ */ (0, PE.jsx)("span", {
							className: "min-w-0 flex-1 truncate",
							children: t ? "Editando mensagem" : `Respondendo a @${i.reply.sender.username}: ${i.reply.content || "Arquivo"}`
						}),
						/* @__PURE__ */ (0, PE.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon-xs",
							"aria-label": t ? "Cancelar edição" : "Cancelar resposta",
							onClick: () => {
								t ? n() : Gy.setDraft(e.id, { reply: null });
							},
							children: /* @__PURE__ */ (0, PE.jsx)(br, { className: "size-3" })
						})
					]
				}),
				i.attachments.length > 0 && !t && /* @__PURE__ */ (0, PE.jsx)("div", {
					className: "mb-2 flex flex-wrap gap-1.5",
					children: i.attachments.map((t) => /* @__PURE__ */ (0, PE.jsxs)("div", {
						className: "flex max-w-full items-center gap-1 rounded-md border border-border bg-muted pl-2 text-xs",
						children: [/* @__PURE__ */ (0, PE.jsx)("span", {
							className: "max-w-36 truncate",
							children: t.name
						}), /* @__PURE__ */ (0, PE.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon-xs",
							"aria-label": `Remover anexo ${t.name}`,
							onClick: () => void Gy.removeAttachment(e.id, t.id).catch((e) => p(e.message)),
							children: /* @__PURE__ */ (0, PE.jsx)(br, { className: "size-3" })
						})]
					}, t.id))
				}),
				/* @__PURE__ */ (0, PE.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault(), x();
					},
					className: "flex items-end gap-1 rounded-lg border border-input bg-muted/40 p-1.5 focus-within:ring-1 focus-within:ring-ring",
					children: [
						/* @__PURE__ */ (0, PE.jsx)("input", {
							ref: o,
							type: "file",
							className: "sr-only",
							multiple: !0,
							"aria-label": "Anexar arquivos à mensagem",
							onChange: async (t) => {
								let n = Array.from(t.target.files || []);
								t.target.value = "", d(!0), p("");
								try {
									for (let t of n) await Gy.upload(e.id, t);
								} catch (e) {
									p(e instanceof Error ? e.message : "Não foi possível anexar.");
								} finally {
									d(!1);
								}
							}
						}),
						/* @__PURE__ */ (0, PE.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon",
							disabled: c || u || !e.canSend || !!t,
							"aria-label": "Adicionar arquivo",
							onClick: () => o.current?.click(),
							children: u ? /* @__PURE__ */ (0, PE.jsx)(Lt, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, PE.jsx)(dn, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, PE.jsx)("textarea", {
							ref: a,
							rows: 1,
							maxLength: 4e3,
							value: v,
							disabled: c || !e.canSend,
							"aria-label": "Mensagem direta",
							placeholder: e.canSend ? `Mensagem para @${e.peer.username}` : "Envio indisponível nesta conversa",
							onChange: (e) => y(e.target.value),
							onKeyDown: (r) => {
								r.key === "Enter" && !r.shiftKey && !r.nativeEvent.isComposing ? (r.preventDefault(), x()) : r.key === "Escape" && (t || i.reply) && (r.preventDefault(), r.stopPropagation(), t ? n() : Gy.setDraft(e.id, { reply: null }));
							},
							className: "max-h-32 min-h-10 min-w-0 flex-1 resize-none bg-transparent px-1 py-2 text-sm leading-5 outline-none disabled:opacity-50"
						}),
						/* @__PURE__ */ (0, PE.jsxs)(AE, { children: [/* @__PURE__ */ (0, PE.jsx)(jE, {
							render: /* @__PURE__ */ (0, PE.jsx)(Y, {
								type: "button",
								variant: "ghost",
								size: "icon",
								"aria-label": "Escolher emoji",
								disabled: !e.canSend
							}),
							children: /* @__PURE__ */ (0, PE.jsx)(Ke, { className: "size-4" })
						}), /* @__PURE__ */ (0, PE.jsxs)(OE, {
							className: "w-72 p-3",
							align: "end",
							children: [/* @__PURE__ */ (0, PE.jsx)(qb, {
								"aria-label": "Pesquisar emoji",
								placeholder: "Pesquisar emoji…",
								value: g,
								onChange: (e) => _(e.target.value)
							}), /* @__PURE__ */ (0, PE.jsx)("div", {
								className: "mt-2 grid max-h-48 grid-cols-6 gap-1 overflow-y-auto",
								children: FE.filter(([e, t]) => t.includes(g.toLowerCase()) || e.includes(g)).map(([e, t]) => /* @__PURE__ */ (0, PE.jsx)(Y, {
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
						/* @__PURE__ */ (0, PE.jsx)(Y, {
							type: "submit",
							size: "icon",
							disabled: c || u || !e.canSend || !v.trim() && !i.attachments.length,
							"aria-label": t ? "Salvar mensagem" : "Enviar mensagem",
							children: c ? /* @__PURE__ */ (0, PE.jsx)(Lt, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, PE.jsx)(Rn, { className: "size-4" })
						})
					]
				}),
				f && /* @__PURE__ */ (0, PE.jsx)("p", {
					role: "alert",
					className: "mt-2 text-xs text-destructive",
					children: f
				})
			]
		});
	});
})), RE, zE, BE, VE, HE, UE, WE, GE = o((() => {
	RE = "--nested-drawers", zE = "--drawer-height", BE = "--drawer-frontmost-height", VE = "--drawer-swipe-movement-x", HE = "--drawer-swipe-movement-y", UE = "--drawer-snap-point-offset", WE = "--drawer-swipe-strength";
})), KE, qE = o((() => {
	KE = "--drawer-swipe-progress";
})), JE, YE, XE = o((() => {
	JE = /* @__PURE__ */ u(b(), 1), mc(), Oa(), Rc(), GE(), qE(), YE = /*#__PURE__*/ JE.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, forceRender: a = !1, ...o } = e, s = dc(), c = s.useState("open"), l = s.useState("nested"), u = s.useState("mounted");
		return ya("div", e, {
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
					pointerEvents: c ? void 0 : "none",
					userSelect: "none",
					WebkitUserSelect: "none",
					[KE]: "0",
					[WE]: "1"
				}
			}, o],
			enabled: a || !l
		});
	});
})), ZE, QE = o((() => {
	ZE = "data-drawer-content";
})), $E, eD, tD = o((() => {
	$E = /* @__PURE__ */ u(b(), 1), mc(), Oa(), QE(), eD = /*#__PURE__*/ $E.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, ...a } = e;
		return dc(), ya("div", e, {
			ref: t,
			props: [{ [ZE]: "" }, a]
		});
	});
})), nD, rD = o((() => {
	jl(), nD = Al;
}));
// node_modules/@base-ui/react/drawer/provider/DrawerProviderContext.mjs
function iD() {
	return aD.useContext(oD);
}
var aD, oD, sD = o((() => {
	aD = /* @__PURE__ */ u(b(), 1), oD = /*#__PURE__*/ aD.createContext(void 0);
})), cD, lD, uD, dD, fD, pD, mD = o((() => {
	Rc(), cD = "data-expanded", lD = "data-nested-drawer-open", uD = "data-nested-drawer-swiping", dD = "data-swipe-dismiss", fD = "data-swipe-direction", pD = "data-swiping";
}));
// node_modules/@base-ui/react/drawer/root/DrawerRootContext.mjs
function hD(e) {
	let t = gD.useContext(_D);
	if (e !== !0 && t === void 0) throw Error(Mi(90));
	return t;
}
var gD, _D, vD = o((() => {
	Ni(), gD = /* @__PURE__ */ u(b(), 1), _D = /*#__PURE__*/ gD.createContext(void 0);
}));
// node_modules/@base-ui/utils/clamp.mjs
function yD(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
	return Math.max(t, Math.min(e, n));
}
var bD = o((() => {}));
// node_modules/@base-ui/react/drawer/root/useDrawerSnapPoints.mjs
function xD(e, t) {
	let n = e + t;
	return n >= 0 ? t : -Math.sqrt(-n) - e;
}
function SD(e, t, n) {
	if (!Number.isFinite(t) || t <= 0) return null;
	if (typeof e == "number") return Number.isFinite(e) ? e <= 1 ? yD(e, 0, 1) * t : e : null;
	let r = e.trim();
	if (r.endsWith("px")) {
		let e = Number.parseFloat(r);
		return Number.isFinite(e) ? e : null;
	}
	if (r.endsWith("rem")) {
		let e = Number.parseFloat(r);
		return Number.isFinite(e) ? e * n : null;
	}
	return null;
}
function CD(e, t) {
	let n = -1, r = Infinity;
	for (let i = 0; i < e.length; i += 1) {
		let a = Math.abs(e[i] - t);
		a < r && (r = a, n = i);
	}
	return n;
}
function wD() {
	let e = dc(), { snapPoints: t, activeSnapPoint: n, setActiveSnapPoint: r, popupHeight: i } = hD(), a = e.useState("viewportElement"), [o, s] = TD.useState(0), [c, l] = TD.useState(16), u = q(() => {
		let e = Vi(a).documentElement;
		s(a ? a.offsetHeight : e.clientHeight);
		let t = parseFloat(getComputedStyle(e).fontSize);
		Number.isFinite(t) && l(t);
	});
	J(() => {
		if (u(), !a || typeof ResizeObserver != "function") return;
		let e = new ResizeObserver(u);
		return e.observe(a), () => {
			e.disconnect();
		};
	}, [u, a]);
	let d = TD.useMemo(() => {
		if (!t || t.length === 0 || o <= 0 || i <= 0) return [];
		let e = Math.min(i, o), n = t.map((t) => {
			let n = SD(t, o, c);
			if (n === null) return null;
			let r = yD(n, 0, e);
			return {
				value: t,
				height: r,
				offset: Math.max(0, i - r)
			};
		}).filter((e) => !!e);
		if (n.length <= 1) return n;
		let r = [], a = [];
		for (let e = n.length - 1; e >= 0; --e) {
			let t = n[e];
			a.some((e) => Math.abs(e - t.height) <= 1) || (a.push(t.height), r.push(t));
		}
		return r.reverse(), r;
	}, [
		i,
		c,
		t,
		o
	]);
	return {
		snapPoints: t,
		activeSnapPoint: n,
		setActiveSnapPoint: r,
		popupHeight: i,
		viewportHeight: o,
		resolvedSnapPoints: d,
		activeSnapPointOffset: TD.useMemo(() => {
			if (n === null) return;
			let e = d.find((e) => Object.is(e.value, n));
			if (e) return e;
			let t = Math.min(i, o), r = SD(n, o, c);
			if (r === null) return;
			let a = yD(r, 0, t);
			return d[CD(d.map((e) => e.height), a)];
		}, [
			n,
			i,
			d,
			c,
			o
		])?.offset ?? null
	};
}
var TD, ED = o((() => {
	TD = /* @__PURE__ */ u(b(), 1), fi(), li(), Hi(), bD(), mc(), vD();
}));
// node_modules/@base-ui/react/drawer/viewport/DrawerViewportContext.mjs
function DD() {
	return OD.useContext(kD);
}
var OD, kD, AD = o((() => {
	OD = /* @__PURE__ */ u(b(), 1), kD = /*#__PURE__*/ OD.createContext(null);
}));
// node_modules/@base-ui/react/drawer/popup/DrawerPopup.mjs
function jD() {
	PD ||= (typeof CSS < "u" && "registerProperty" in CSS && ([
		VE,
		HE,
		UE
	].forEach((e) => {
		try {
			CSS.registerProperty({
				name: e,
				syntax: "<length>",
				inherits: !1,
				initialValue: "0px"
			});
		} catch {}
	}), [{
		name: KE,
		initialValue: "0"
	}, {
		name: WE,
		initialValue: "1"
	}].forEach(({ name: e, initialValue: t }) => {
		try {
			CSS.registerProperty({
				name: e,
				syntax: "<number>",
				inherits: !1,
				initialValue: t
			});
		} catch {}
	})), !0);
}
var MD, ND, PD, FD, ID, LD = o((() => {
	MD = /* @__PURE__ */ u(b(), 1), fi(), li(), fa(), S_(), mc(), Oa(), Rc(), qE(), GE(), mD(), E_(), lm(), B_(), vD(), ED(), AD(), Th(), ND = bs(), PD = !1, FD = {
		...Lc,
		expanded(e) {
			return e ? { [cD]: "" } : null;
		},
		nestedDrawerOpen(e) {
			return e ? { [lD]: "" } : null;
		},
		nestedDrawerSwiping(e) {
			return e ? { [uD]: "" } : null;
		},
		swipeDirection(e) {
			return { [fD]: e };
		},
		swiping(e) {
			return e ? { [pD]: "" } : null;
		}
	}, ID = /*#__PURE__*/ MD.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, finalFocus: a, initialFocus: o, ...s } = e, c = dc(), l = c.context.popupRef, { swipeDirection: u, frontmostHeight: d, hasNestedDrawer: f, nestedSwiping: p, nestedSwipeProgressStore: m, onPopupHeightChange: h, notifyParentFrontmostHeight: g, notifyParentHasNestedDrawer: _ } = hD(), v = c.useState("descriptionElementId"), y = c.useState("disablePointerDismissal"), b = c.useState("floatingRootContext"), x = c.useState("popupProps"), S = c.useState("modal"), C = c.useState("mounted"), w = c.useState("nested"), T = c.useState("nestedOpenDrawerCount"), E = c.useState("transitionStatus"), D = c.useState("open"), O = c.useState("openMethod"), k = c.useState("titleElementId"), A = c.useState("role"), j = b.useState("floatingId"), M = s.id ?? j, N = DD();
		C_();
		let { snapPoints: P, activeSnapPoint: F, activeSnapPointOffset: I } = wD(), L = T > 0, R = N?.swiping ?? !1, z = N?.swipeStrength ?? null, [B, V] = MD.useState(0), H = MD.useRef(0), ee = q(() => {
			let e = l.current;
			if (!e) return;
			let t = e.offsetHeight;
			if (H.current > 0 && d > H.current && t > H.current) return;
			if (H.current > 0 && f) {
				let e = H.current;
				V(e), h(e);
				return;
			}
			let n = t;
			n !== H.current && (H.current = n, V(n), h(n));
		});
		J(() => {
			if (!C) {
				H.current = 0, V(0), h(0);
				return;
			}
			let e = l.current;
			if (!e || (jD(), ee(), typeof ResizeObserver != "function")) return;
			let t = new ResizeObserver(ee);
			return t.observe(e), () => {
				t.disconnect();
			};
		}, [
			ee,
			C,
			L,
			h,
			l
		]), J(() => {
			let e = () => {
				let e = l.current;
				if (!e) return;
				let t = m.getSnapshot();
				t > 0 ? e.style.setProperty(KE, `${t}`) : e.style.setProperty(KE, "0");
			};
			e();
			let t = m.subscribe(e), n = l.current;
			return () => {
				t(), n && n.style.setProperty(KE, "0");
			};
		}, [m, l]), J(() => {
			if (D) return g?.(d), () => {
				g?.(0);
			};
		}, [
			d,
			D,
			g
		]), J(() => {
			if (_) return _(D || E === "ending"), () => {
				_(!1);
			};
		}, [
			_,
			D,
			E
		]), sm({
			open: D,
			ref: l,
			onComplete() {
				D && c.context.onOpenChangeComplete?.(!0);
			}
		});
		let te = o === void 0 ? l : o, U = c.useStateSetter("popupElement"), ne = {
			open: D,
			nested: w,
			transitionStatus: E,
			expanded: F === 1,
			nestedDrawerOpen: L,
			nestedDrawerSwiping: p,
			swipeDirection: u,
			swiping: R
		}, W;
		B && (f || E === "ending") && (W = `${B}px`);
		let re = P && P.length > 0 && (u === "down" || u === "up"), G = null;
		re && I !== null && (G = u === "up" ? -I : I);
		let K = N ? N.getDragStyles() : da;
		if (re && u === "down") {
			let e = I ?? 0, t = Number.parseFloat(String(K[HE]));
			K = R && Number.isFinite(t) ? {
				...K,
				transform: void 0,
				[HE]: `${xD(e, t)}px`
			} : {
				...K,
				transform: void 0
			};
		}
		let ie = ya("div", e, {
			state: ne,
			props: [
				x,
				{
					id: M,
					"aria-labelledby": k,
					"aria-describedby": v,
					role: A,
					...Om,
					hidden: !C,
					onKeyDown(e) {
						L_.has(e.key) && e.stopPropagation();
					},
					style: {
						...K,
						[KE]: "0",
						[RE]: T,
						[zE]: W,
						[UE]: typeof G == "number" ? `${G}px` : "0px",
						[BE]: d ? `${d}px` : void 0,
						[WE]: typeof z == "number" && Number.isFinite(z) && z > 0 ? `${z}` : "1"
					}
				},
				s
			],
			ref: [
				t,
				l,
				U
			],
			stateAttributesMapping: FD
		});
		return /*#__PURE__*/ (0, ND.jsx)(Op, {
			context: b,
			openInteractionType: O,
			disabled: !C,
			closeOnFocusOut: !y,
			initialFocus: te,
			returnFocus: a,
			modal: S !== !1,
			restoreFocus: "popup",
			children: ie
		});
	});
})), RD, zD = o((() => {
	ov(), RD = av;
}));
// node_modules/@base-ui/react/drawer/root/DrawerRoot.mjs
function BD(e) {
	let { children: t, open: n, defaultOpen: r = !1, onOpenChange: i, onOpenChangeComplete: a, disablePointerDismissal: o = !1, modal: s = !0, actionsRef: c, handle: l, triggerId: u, defaultTriggerId: d = null, swipeDirection: f = "down", snapToSequentialPoints: p = !1, snapPoints: m, snapPoint: h, defaultSnapPoint: g, onSnapPointChange: _ } = e, v = hD(!0), y = v?.onNestedSwipeProgressChange, b = v?.onNestedFrontmostHeightChange, x = v?.onNestedSwipingChange, S = v?.onNestedDrawerPresenceChange, [C, w] = UD.useState(0), [T, E] = UD.useState(0), [D, O] = UD.useState(!1), [k, A] = UD.useState(!1), [j] = UD.useState(VD), M = g === void 0 ? m?.[0] ?? null : g, N = h !== void 0, [P, F] = Mx({
		controlled: h,
		default: M,
		name: "Drawer",
		state: "snapPoint"
	}), I = UD.useRef(!1), L = UD.useRef(!1), R = q((e, t) => {
		let n = t ?? Uc("none");
		_?.(e, n), n.isCanceled || F(e);
	}), z = UD.useMemo(() => N || !m || m.length === 0 ? P : P === null || !m.some((e) => Object.is(e, P)) ? M : P, [
		P,
		N,
		M,
		m
	]), B = q((e) => {
		w(e), !I.current && e > 0 && E(e);
	}), V = q((e) => {
		e > 0 ? (I.current = !0, E(e)) : (I.current = !1, C > 0 && E(C));
	}), H = q((e) => {
		O(e);
	}), ee = q((e) => {
		j.set(e), y?.(e);
	}), te = q((e) => {
		A(e), x?.(e);
	}), U = q((e, t) => {
		i?.(e, t), t.isCanceled || !e && m && m.length > 0 && R(M, Uc(t.reason, t.event, t.trigger));
	}), ne = UD.useMemo(() => ({
		swipeDirection: f,
		swipeAreaActiveRef: L,
		snapToSequentialPoints: p,
		snapPoints: m,
		activeSnapPoint: z,
		setActiveSnapPoint: R,
		frontmostHeight: T,
		popupHeight: C,
		hasNestedDrawer: D,
		nestedSwiping: k,
		nestedSwipeProgressStore: j,
		onNestedDrawerPresenceChange: H,
		onPopupHeightChange: B,
		onNestedFrontmostHeightChange: V,
		onNestedSwipingChange: te,
		onNestedSwipeProgressChange: ee,
		notifyParentFrontmostHeight: b,
		notifyParentSwipingChange: x,
		notifyParentSwipeProgressChange: y,
		notifyParentHasNestedDrawer: S
	}), [
		z,
		T,
		D,
		k,
		j,
		S,
		y,
		x,
		b,
		H,
		V,
		ee,
		te,
		B,
		C,
		R,
		m,
		p,
		L,
		f
	]), W = kv("drawer", {
		open: n,
		defaultOpen: r,
		onOpenChange: U,
		onOpenChangeComplete: a,
		disablePointerDismissal: o,
		modal: s,
		actionsRef: c,
		handle: l,
		triggerId: u,
		defaultTriggerId: d,
		children: typeof t == "function" ? (e) => /*#__PURE__*/ (0, WD.jsxs)(UD.Fragment, { children: [GD ||= /*#__PURE__*/ (0, WD.jsx)(HD, {}), t(e)] }) : /*#__PURE__*/ (0, WD.jsxs)(UD.Fragment, { children: [KD ||= /*#__PURE__*/ (0, WD.jsx)(HD, {}), t] })
	});
	return /*#__PURE__*/ (0, WD.jsx)(_D.Provider, {
		value: ne,
		children: W
	});
}
function VD() {
	let e = 0, t = /* @__PURE__ */ new Set();
	return {
		getSnapshot: () => e,
		set(n) {
			let r = Number.isFinite(n) ? n : 0;
			r !== e && (e = r, t.forEach((e) => {
				e();
			}));
		},
		subscribe(e) {
			return t.add(e), () => {
				t.delete(e);
			};
		}
	};
}
function HD() {
	let e = iD(), t = dc(!1), n = e?.setDrawerOpen, r = e?.removeDrawer, i = t.useState("open"), a = t.useState("nestedOpenDialogCount"), o = t.useState("popupElement"), s = a === 0;
	return J(() => {
		if (r) return () => {
			r(t);
		};
	}, [r, t]), J(() => {
		n?.(t, i);
	}, [
		i,
		n,
		t
	]), UD.useEffect(() => {
		if (!i || !s || !Jl) return;
		let e = Or(o).CloseWatcher;
		if (!e) return;
		function n(e) {
			if (!t.select("open")) return;
			let n = Uc(tl, e);
			e.cancelable || (n.cancel = la), t.setOpen(!1, n), n.isCanceled && e.preventDefault();
		}
		let r = new e(), a = Ju(r, "cancel", n);
		return () => {
			a(), r.destroy();
		};
	}, [
		t,
		s,
		i,
		o
	]), null;
}
var UD, WD, GD, KD, qD = o((() => {
	UD = /* @__PURE__ */ u(b(), 1), Yu(), fa(), Px(), fi(), li(), Hi(), au(), vD(), Gc(), ml(), mc(), Mv(), sD(), WD = bs();
}));
// node_modules/@base-ui/react/utils/scrollable.mjs
function JD(e, t = !1) {
	let { overflowY: n } = Vr(e);
	return n !== "auto" && n !== "scroll" ? !1 : t ? e.clientHeight > 0 : e.scrollHeight > e.clientHeight;
}
function YD(e, t = !1) {
	let { overflowX: n } = Vr(e);
	return n !== "auto" && n !== "scroll" ? !1 : t ? e.clientWidth > 0 : e.scrollWidth > e.clientWidth;
}
function XD(e, t, n = !1) {
	return t === "vertical" ? JD(e, n) : YD(e, n);
}
function ZD(e, t, n, r = !1) {
	let i = e;
	for (; jr(i) && i !== t && !Br(i);) {
		if (Mr(i) && XD(i, n, r)) return i;
		i = Ur(i);
	}
	return null;
}
function QD(e, t, n = "vertical", r = !1) {
	return ZD(e, t, n, r) ?? (XD(t, n, r) ? t : null);
}
var $D = o((() => {
	Zr();
}));
// node_modules/@base-ui/react/utils/getElementAtPoint.mjs
function eO(e, t, n) {
	return typeof e?.elementFromPoint == "function" ? e.elementFromPoint(t, n) : null;
}
var tO = o((() => {}));
// node_modules/@base-ui/react/utils/getElementTransform.mjs
function nO(e, t) {
	let n = (t ?? Or(e).getComputedStyle(e)).transform, r = 0, i = 0, a = 1;
	if (n && n !== "none") {
		let e = n.match(/matrix(?:3d)?\(([^)]+)\)/);
		if (e) {
			let t = e[1].split(", ").map(parseFloat);
			t.length === 6 ? (r = t[4], i = t[5], a = Math.sqrt(t[0] * t[0] + t[1] * t[1])) : t.length === 16 && (r = t[12], i = t[13], a = t[0]);
		}
	}
	return {
		x: r,
		y: i,
		scale: a
	};
}
var rO = o((() => {
	Hi();
}));
// node_modules/@base-ui/react/utils/useSwipeDismiss.mjs
function iO(e, t, n) {
	switch (e) {
		case "up": return -n;
		case "down": return n;
		case "left": return -t;
		case "right": return t;
		default: return 0;
	}
}
function aO(e) {
	return Number.isFinite(e) && e > 0 ? e : null;
}
function oO(e, t) {
	return `translate3d(${e.x}px,${e.y}px,0) scale(${t})`;
}
function sO(e) {
	return e % 2 == 1;
}
function cO(e, t, n) {
	let r = e[n];
	if (typeof r == "function") try {
		r.call(e, t);
	} catch (e) {
		if (e && typeof e == "object" && "name" in e && e.name === "NotFoundError") return;
		throw e;
	}
}
function lO(e) {
	let { enabled: t, directions: n, elementRef: r, movementCssVars: i, canStart: a, ignoreSelectorWhenTouch: o = !0, ignoreScrollableAncestors: s = !1, swipeThreshold: c, onDismiss: l, onProgress: u, onCancel: d, onSwipeStart: f, onRelease: p, onSwipingChange: m, trackDrag: h = !0 } = e, g = _O, _ = n.length === 1 ? n[0] : void 0, v = Math.max(0, typeof c == "number" ? c : dO), y = n.includes("left"), b = n.includes("right"), x = n.includes("up"), S = n.includes("down"), C = y || b, w = x || S, T = C ? "horizontal" : "vertical", [E, D] = uO.useState(void 0), [O, k] = uO.useState(!1), [A, j] = uO.useState(!1), M = uO.useRef({
		x: 0,
		y: 0
	}), N = uO.useRef({
		x: 0,
		y: 0
	}), P = uO.useRef(null), F = uO.useRef({
		x: 0,
		y: 0,
		scale: 1
	}), I = uO.useRef(void 0), L = uO.useRef(0), R = uO.useRef(!1), z = uO.useRef({
		x: 0,
		y: 0
	}), B = uO.useRef(!1), V = uO.useRef(!1), H = uO.useRef(null), ee = uO.useRef(!1), te = uO.useRef(!1), U = uO.useRef({
		width: 0,
		height: 0
	}), ne = uO.useRef(0), W = uO.useRef(v), re = uO.useRef(null), G = uO.useRef(null), K = uO.useRef(null), ie = uO.useRef(!1), ae = uO.useRef({
		x: 0,
		y: 0
	}), oe = uO.useRef(null), se = uO.useRef(!1), ce = uO.useRef(null), le = q((e) => {
		se.current !== e && (se.current = e, k(e), m?.(e));
	});
	function ue(e) {
		if (!e) return;
		let t = r.current, n = re.current;
		if (!t || !n) return;
		let i = n({
			element: t,
			direction: e
		});
		W.current = Math.max(0, i);
	}
	let de = q((e, t) => {
		let n = Number.isFinite(e) ? yD(e, 0, 1) : 0, r = n !== ne.current, i = !1;
		if (t) {
			let e = oe.current;
			i = !e || e.deltaX !== t.deltaX || e.deltaY !== t.deltaY || e.direction !== t.direction;
		}
		(r || i) && (ne.current = n, t ? oe.current = t : r && (oe.current = null), u?.(n, t));
	}), fe = q((e) => {
		let t = r.current;
		if (!h || !t) {
			e || (ce.current = null);
			return;
		}
		let n = t.style, a = ce.current;
		e ? (a || (ce.current = [n.transition, n.transform]), n.transition = "none") : a && ([n.transition, n.transform] = a, ce.current = null);
		let o = N.current, s = F.current, c = o.x - s.x, l = o.y - s.y;
		e && (n.transform = oO(o, s.scale)), n.setProperty(i.x, `${c}px`), n.setProperty(i.y, `${l}px`);
	});
	function pe(e, t) {
		if (t === null) return;
		let n = K.current;
		if (n && t > n.time) {
			let r = Math.abs(e.x - n.x) < gO && Math.abs(e.y - n.y) < gO, i = r && !ie.current;
			if (ie.current = r, i) return;
			let a = Math.max(t - n.time, mO);
			ae.current = {
				x: (e.x - n.x) / a,
				y: (e.y - n.y) / a
			};
		}
		K.current = {
			x: e.x,
			y: e.y,
			time: t
		};
	}
	let me = uO.useCallback(() => {
		D(void 0), le(!1), j(!1), de(0), W.current = v, re.current = null, M.current = {
			x: 0,
			y: 0
		}, N.current = {
			x: 0,
			y: 0
		}, F.current = {
			x: 0,
			y: 0,
			scale: 1
		}, I.current = void 0, L.current = 0, R.current = !1, z.current = {
			x: 0,
			y: 0
		}, B.current = !1, P.current = null, V.current = !1, H.current = null, ee.current = !1, te.current = !1, U.current = {
			width: 0,
			height: 0
		}, G.current = null, K.current = null, ie.current = !1, ae.current = {
			x: 0,
			y: 0
		}, oe.current = null, fe(!1);
	}, [
		le,
		v,
		fe,
		de
	]);
	function he(e) {
		if ("touches" in e) {
			let t = e.touches[0];
			return t ? {
				x: t.clientX,
				y: t.clientY
			} : null;
		}
		return {
			x: e.clientX,
			y: e.clientY
		};
	}
	function ge(e) {
		return "touches" in e || e.pointerType === "touch";
	}
	function _e(e, t) {
		let n = r.current?.getRootNode();
		return eO(n, e.x, e.y) ?? hu(t);
	}
	function ve(e, t) {
		return ((n) => {
			let r = QD(e, t, n), i = Vi(r);
			return r === i.body || r === i.documentElement ? null : r;
		})(T);
	}
	function ye(e, t, n) {
		ee.current = !1;
		let i = ge(e), a = _e(t, e.nativeEvent), l = Vi(r.current).body, u = i && l ? ve(a, l) : null, d = n?.ignoreScrollableTarget ?? !1;
		if (u && !d || (ee.current = !!(u && d), mu(a, g) && (!i || o))) return !1;
		let p = r.current;
		if (s && p && a && !(n?.ignoreScrollableAncestors ?? !1) && ZD(a, p, T) != null) return !1;
		if (R.current = !1, I.current = void 0, L.current = 0, M.current = t, G.current = aO(e.timeStamp), K.current = null, ie.current = !1, ae.current = {
			x: 0,
			y: 0
		}, z.current = t, P.current = t, W.current = v, re.current = typeof c == "function" ? c : null, p) {
			U.current = {
				width: p.offsetWidth,
				height: p.offsetHeight
			}, ue(_);
			let t = nO(p);
			F.current = t, N.current = {
				x: t.x,
				y: t.y
			}, pe({
				x: t.x,
				y: t.y
			}, G.current), "touches" in e || cO(p, e.pointerId, "setPointerCapture");
		}
		return f?.(e.nativeEvent), le(!0), B.current = !0, de(0), fe(!0), !0;
	}
	function be() {
		xe(), ee.current = !1, P.current = null;
	}
	function xe() {
		V.current = !1, H.current = null;
	}
	function Se(e) {
		if (be(), !se.current) return;
		le(!1);
		let t = F.current;
		N.current = {
			x: t.x,
			y: t.y
		}, D(void 0), te.current = !1, fe(!1);
		let n = r.current;
		n && cO(n, e.pointerId, "releasePointerCapture"), de(0, {
			deltaX: 0,
			deltaY: 0,
			direction: void 0
		}), d?.(e.nativeEvent);
	}
	function Ce(e, t) {
		let n = (e) => Math.sign(e) * Math.abs(e) ** .5, r = (e, t, r) => !t && e < 0 || !r && e > 0 ? n(e) : e;
		return {
			x: C ? r(e, y, b) : n(e),
			y: w ? r(t, x, S) : n(t)
		};
	}
	function we(e, t, n) {
		let r = (e, t, n, r, i) => e > 0 && t <= 0 && r || e < 0 && t >= Math.max(0, n) && i;
		return w && n !== 0 ? r(n, e.scrollTop, e.scrollHeight - e.clientHeight, S, x) : C && t !== 0 ? r(t, e.scrollLeft, e.scrollWidth - e.clientWidth, b, y) : null;
	}
	let Te = q((e) => {
		if (!t || e.defaultPrevented || e.nativeEvent.defaultPrevented || !("touches" in e) && e.button !== 0) return;
		let n = he(e);
		n && (V.current = !0, H.current = n, ee.current = !1, te.current = !("touches" in e), (!a || a(n, {
			nativeEvent: e.nativeEvent,
			direction: _
		})) && ye(e, n) && xe());
	});
	function Ee(e, n, r) {
		if (!t || !se.current) return;
		let i = hu(e.nativeEvent);
		if (ge(e) && !ee.current) {
			let t = e.currentTarget;
			if (ve(i, t)) return;
		}
		if ("touches" in e || e.preventDefault(), B.current && (B.current = !1, h)) {
			M.current = n;
			let t = aO(e.timeStamp);
			t !== null && (G.current = t), K.current = null, ie.current = !1;
		}
		let a = n.x, o = n.y, s = r.x, c = r.y;
		(c < 0 && o > z.current.y || c > 0 && o < z.current.y) && (z.current = {
			x: z.current.x,
			y: o
		}), (s < 0 && a > z.current.x || s > 0 && a < z.current.x) && (z.current = {
			x: a,
			y: z.current.y
		});
		let l = a - M.current.x, u = o - M.current.y, d = o - z.current.y, f = a - z.current.x, p;
		if (!I.current) p = Math.abs(l) >= Math.abs(u) ? l > 0 ? "right" : "left" : u > 0 ? "down" : "up", p && (p === "left" && y || p === "right" && b || p === "up" && x || p === "down" && S) && (I.current = p, L.current = iO(p, l, u), D(p), ue(p));
		else {
			let e = I.current, t = iO(e, f, d);
			t > W.current ? (R.current = !1, D(e)) : !(y && b) && !(x && S) && L.current - t >= fO && (R.current = !0);
		}
		let m = Ce(l, u), g = F.current.x, v = F.current.y;
		C && (g += m.x), w && (v += m.y);
		let T = N.current, E = g !== T.x || v !== T.y;
		N.current = {
			x: g,
			y: v
		}, E && fe(!0), pe({
			x: g,
			y: v
		}, aO(e.timeStamp));
		let O = g - F.current.x, k = v - F.current.y, A = {
			deltaX: O,
			deltaY: k,
			direction: I.current
		}, j = 0, P = _ ?? I.current;
		if (P) {
			let e = P === "left" || P === "right" ? U.current.width : U.current.height, t = F.current.scale || 1, n = iO(P, O, k);
			e > 0 && t > 0 && n > 0 && (j = n / (e * t));
		}
		de(j, A);
	}
	let De = q((e) => {
		if (!t) return;
		let i = N.current, a = F.current, o = i.x - a.x, s = i.y - a.y, c = {
			deltaX: o,
			deltaY: s,
			direction: I.current
		};
		if (!se.current) {
			be(), de(0, c);
			return;
		}
		le(!1), be(), te.current = !1;
		let u = r.current;
		u && ("touches" in e || cO(u, e.pointerId, "releasePointerCapture"));
		let d = o, f = s, m = G.current, h = aO(e.timeStamp), g = m !== null && h !== null && h > m ? h - m : 0, v = g > 0 ? Math.max(g, pO) : 0, y = v > 0 ? d / v : 0, b = v > 0 ? f / v : 0, x = ae.current.x, S = ae.current.y, C = K.current;
		if (C && h !== null && h >= C.time) {
			let e = h - C.time;
			if (e <= hO) {
				let t = Math.max(e, mO), n = i.x - C.x, r = i.y - C.y, a = n / t, o = r / t;
				Math.abs(n) >= gO && (x = a), Math.abs(r) >= gO && (S = o);
			} else x = 0, S = 0;
		}
		let w = p?.({
			event: e.nativeEvent,
			direction: I.current,
			deltaX: d,
			deltaY: f,
			velocityX: y,
			velocityY: b,
			releaseVelocityX: x,
			releaseVelocityY: S
		}), T = typeof w == "boolean";
		if (R.current && !T) {
			N.current = {
				x: a.x,
				y: a.y
			}, D(void 0), fe(!1), de(0, c);
			return;
		}
		let E = !1, O;
		if (T) E = w, O = I.current ?? _;
		else for (let e of n) if (iO(e, d, f) > W.current) {
			E = !0, O = e;
			break;
		}
		E && O ? (D(O), j(!0), fe(!1), l?.(e.nativeEvent, { direction: O })) : (N.current = {
			x: a.x,
			y: a.y
		}, D(void 0), fe(!1), de(0, c));
	}), Oe = q((e) => {
		let t = he(e);
		if (!t) return;
		let n = !1;
		if (!("touches" in e)) {
			let t = sO(e.buttons);
			if (t && (te.current = !0), e.buttons !== 0 && !t) {
				Se(e);
				return;
			}
			if (e.buttons === 0 && te.current) {
				if (!se.current) {
					De(e);
					return;
				}
				n = !0;
			}
		}
		if (!O && V.current) {
			if (!ge(e) && (e.defaultPrevented || e.nativeEvent.defaultPrevented)) {
				be();
				return;
			}
			if (!a || a(t, {
				nativeEvent: e.nativeEvent,
				direction: _
			})) {
				let n = H.current, i = !1;
				if (ge(e)) {
					let a = r.current;
					if (n && a) {
						let r = _e(t, e.nativeEvent), o = Vi(a).body, s = o ? ve(r, o) : null;
						if (s && (Q(a, s) || Q(s, a))) {
							let e = we(s, t.x - n.x, t.y - n.y);
							if (e === !1) return;
							e === !0 && (i = !0);
						}
					}
				}
				ye(e, t, {
					ignoreScrollableTarget: i,
					ignoreScrollableAncestors: i
				}) && (n && i ? (xe(), M.current = n, z.current = n, P.current = n, B.current = !1) : (xe(), ee.current = !1));
			}
		}
		let i = P.current, o = i === null ? {
			x: 0,
			y: 0
		} : {
			x: t.x - i.x,
			y: t.y - i.y
		};
		P.current = t, Ee(e, t, o), n && !("touches" in e) && De(e);
	}), ke = q((e, t) => {
		Oe({
			touches: e.touches,
			currentTarget: t,
			nativeEvent: e,
			defaultPrevented: e.defaultPrevented,
			timeStamp: e.timeStamp
		});
	}), Ae = uO.useCallback(() => {
		let e = se.current, t = N.current, n = F.current, r = t.x - n.x, a = t.y - n.y;
		return !e && r === 0 && a === 0 && !A ? {
			[i.x]: "0px",
			[i.y]: "0px"
		} : {
			transition: e ? "none" : void 0,
			transform: e ? oO(t, n.scale) : void 0,
			[i.x]: `${r}px`,
			[i.y]: `${a}px`
		};
	}, [A, i]);
	return {
		swiping: O,
		swipeDirection: E,
		dragDismissed: A,
		getPointerProps: uO.useCallback(() => t ? {
			onPointerDown: Te,
			onPointerMove: Oe,
			onPointerUp: De,
			onPointerCancel: De
		} : {}, [
			t,
			De,
			Oe,
			Te
		]),
		getTouchProps: uO.useCallback(() => t ? {
			onTouchStart: Te,
			onTouchMove: Oe,
			onTouchEnd: De,
			onTouchCancel: De
		} : {}, [
			t,
			De,
			Oe,
			Te
		]),
		moveNative: ke,
		getDragStyles: Ae,
		reset: me
	};
}
var uO, dO, fO, pO, mO, hO, gO, _O, vO = o((() => {
	uO = /* @__PURE__ */ u(b(), 1), bD(), li(), Hi(), lh(), $D(), tO(), rO(), dO = 40, fO = 10, pO = 50, mO = 4, hO = 80, gO = 1, _O = "button,a,input,select,textarea,label,[role=\"button\"]";
})), yO, bO = o((() => {
	Bv(), yO = zv;
}));
// node_modules/@base-ui/react/drawer/virtual-keyboard-provider/DrawerVirtualKeyboardContext.mjs
function xO() {
	return SO.useContext(CO);
}
var SO, CO, wO = o((() => {
	SO = /* @__PURE__ */ u(b(), 1), CO = /*#__PURE__*/ SO.createContext(void 0);
}));
// node_modules/@base-ui/react/drawer/viewport/DrawerViewport.mjs
function TO(e, t) {
	e?.toggleAttribute(pD, t);
}
function EO(e) {
	return !!mu(e, Kf);
}
function DO(e) {
	return !!mu(e, ik);
}
function OO(e, t) {
	return t === "left" || t === "right" ? e.offsetWidth : e.offsetHeight;
}
function kO(e, t) {
	return Math.max(OO(e, t) * .5, KO);
}
function AO(e, t) {
	return e instanceof t.HTMLInputElement && e.type === "range";
}
function jO(e) {
	return e.tagName === "INPUT" || e.tagName === "TEXTAREA";
}
function MO(e, t) {
	let n = jr(e.anchorNode) ? e.anchorNode : e.anchorNode?.parentElement, r = jr(e.focusNode) ? e.focusNode : e.focusNode?.parentElement;
	return e.containsNode(t, !0) || Q(t, n) || Q(t, r);
}
function NO(e, t) {
	let n = pu(e);
	if (n && Q(t, n) && jO(n)) {
		let { selectionStart: e, selectionEnd: t } = n;
		if (e != null && t != null && e < t) return !0;
	}
	let r = e.getSelection?.();
	return !r || r.isCollapsed ? !1 : MO(r, t);
}
function PO(e, t) {
	return e.composedPath().some((e) => AO(e, t));
}
function FO(e) {
	return PO(e.nativeEvent, Or(e.currentTarget));
}
function IO(e, t) {
	e.lastX = t.clientX, e.lastY = t.clientY;
}
function LO(e, t, n, r) {
	if (e.preserveNativeCrossAxisScroll) return !0;
	if (e.drawerAxisAttributed || e.allowSwipe === !0 || !e.hasCrossAxisGestureTarget) return !1;
	if (!t.cancelable) return e.preserveNativeCrossAxisScroll = !0, !0;
	let i = r ? n.clientY - e.startY : n.clientX - e.startX, a = r ? n.clientX - e.startX : n.clientY - e.startY, o = Math.abs(i), s = Math.abs(a);
	return s >= nk && s > o + rk ? (e.preserveNativeCrossAxisScroll = !0, !0) : o >= nk ? (e.drawerAxisAttributed = !0, !1) : !0;
}
function RO(e, t) {
	return zO(e, t).max > 0;
}
function zO(e, t) {
	if (t === "vertical") {
		let t = Math.max(0, e.scrollHeight - e.clientHeight);
		return {
			offset: e.scrollTop,
			max: t
		};
	}
	let n = Math.max(0, e.scrollWidth - e.clientWidth);
	return {
		offset: e.scrollLeft,
		max: n
	};
}
function BO(e, t, n) {
	let r = HO(n, t), { offset: i, max: a } = zO(e, t);
	return r ? i <= 0 : i >= a;
}
function VO(e, t, n, r) {
	return (HO(n, t) ? r > 0 : r < 0) && BO(e, t, n);
}
function HO(e, t) {
	return t === "vertical" ? e === "down" : e === "right";
}
var UO, WO, GO, KO, qO, JO, YO, XO, ZO, QO, $O, ek, tk, nk, rk, ik, ak, ok, sk = o((() => {
	UO = /* @__PURE__ */ u(b(), 1), WO = /* @__PURE__ */ u(Os(), 1), Zr(), Yu(), Hi(), od(), fi(), li(), bD(), mc(), Lv(), $v(), Ai(), vD(), ED(), sD(), vO(), GE(), mD(), qE(), QE(), ml(), Gc(), lh(), AD(), xc(), $D(), Xf(), tO(), wO(), GO = bs(), KO = 10, qO = .5, JO = .5, YO = 300, XO = 4, ZO = .2, QO = 4, $O = 80, ek = 360, tk = .1, nk = 6, rk = 2, ik = `[${ZE}]`, ak = {
		horizontal: `[${Gf}="x"]`,
		vertical: `[${Gf}="y"]`
	}, ok = /*#__PURE__*/ UO.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, children: a, ...o } = e, s = dc(), c = s.context.popupRef, l = s.context.backdropRef, { swipeDirection: u, notifyParentSwipingChange: d, notifyParentSwipeProgressChange: f, frontmostHeight: p, snapToSequentialPoints: m, swipeAreaActiveRef: h } = hD(), g = iD(), { snapPoints: _, resolvedSnapPoints: v, activeSnapPoint: y, activeSnapPointOffset: b, setActiveSnapPoint: x, popupHeight: S } = wD(), C = s.useState("open"), w = s.useState("mounted"), T = s.useState("nested"), E = s.useState("nestedOpenDrawerCount"), D = s.useState("viewportElement"), O = s.useState("popupElement"), k = g?.visualStateStore, A = E > 0, j = u === "left" || u === "right" ? "horizontal" : "vertical", M = j === "vertical", N = M ? "horizontal" : "vertical", [P, F] = UO.useState(null), I = UO.useRef(void 0), L = UO.useRef(null), R = td(), z = UO.useRef(!1), B = UO.useRef(!1), V = UO.useRef(""), H = UO.useRef(!1), ee = UO.useRef(!1), te = UO.useRef(null), U = xO(), ne = UO.useMemo(() => {
			if (!_ || _.length < 2 || v.length < 2 || u !== "down" && u !== "up") return null;
			let e = v.map((e) => e.offset).sort((e, t) => e - t), t = e[0];
			return {
				minOffset: t,
				range: e[1] - t
			};
		}, [
			v,
			_,
			u
		]), W = UO.useMemo(() => !ne || b === null ? null : yD((b - ne.minOffset) / ne.range, 0, 1), [b, ne]), re = UO.useMemo(() => _ && _.length > 0 && (u === "down" || u === "up") ? u === "down" ? ["down", "up"] : ["up", "down"] : [u], [_, u]), G = q((e) => {
			c.current?.toggleAttribute(dD, e), l.current?.toggleAttribute(dD, e);
		}), K = q(() => {
			G(!1), c.current?.removeAttribute(gc), F(null);
		}), ie = q(() => {
			B.current && (B.current = !1, d?.(!1));
		}), ae = q((e, t, n) => {
			let r = C && !T && t, i = r ? e : 0, a = C && t ? e : 0;
			n && f && (f(a), a <= 0 && ie()), k?.set({
				swipeProgress: i,
				frontmostHeight: i > 0 ? p : 0
			});
			let o = l.current;
			if (!o) return;
			let s = r && i > 0;
			o.style.setProperty(KE, s ? `${i}` : "0"), s && p > 0 ? o.style.setProperty(zE, `${p}px`) : o.style.removeProperty(zE);
		});
		function oe(e, t, n, r, i, a, o, s) {
			let c = OO(e, t);
			if (c <= 0) return null;
			let l = ((t === "down" || t === "up") && _ && _.length > 0 ? b ?? 0 : 0) + iO(t, n, r), u = Math.max(0, c - l);
			if (u <= 0) return null;
			let d = iO(t, o, s), f = Math.abs(d) > 0 ? d : iO(t, i, a);
			if (f <= ZO) return null;
			let p = (yD(u / yD(f, ZO, QO), $O, ek) - $O) / 280;
			return tk + p * .9;
		}
		function se(e) {
			if (B.current || !e) return;
			let t = iO(e.direction ?? u, e.deltaX, e.deltaY);
			Math.abs(t) < KO || (B.current = !0, d?.(!0));
		}
		let ce = lO({
			enabled: w && !A,
			directions: re,
			elementRef: s.context.popupRef,
			ignoreSelectorWhenTouch: !1,
			ignoreScrollableAncestors: !0,
			movementCssVars: {
				x: VE,
				y: HE
			},
			onSwipeStart(e) {
				if ("touches" in e || e.pointerType === "touch") return;
				let t = c.current, n = Vi(t).getSelection?.();
				if (!n || n.isCollapsed) return;
				let r = jr(n.anchorNode) ? n.anchorNode : n.anchorNode?.parentElement, i = jr(n.focusNode) ? n.focusNode : n.focusNode?.parentElement;
				(Q(t, r) || Q(t, i)) && n.removeAllRanges();
			},
			onSwipingChange(e) {
				z.current = e, TO(s.context.backdropRef.current, e), !e && !f && ie();
			},
			swipeThreshold({ element: e, direction: t }) {
				return kO(e, t);
			},
			canStart(e, t) {
				let n = s.context.popupRef.current;
				if (!n) return !1;
				let r = t.nativeEvent, i = "touches" in r || r.pointerType === "touch", a = i ? te.current : null, o = n.ownerDocument, c = eO(n.getRootNode(), e.x, e.y);
				return !(!a?.startedInPopup && !Q(n, c) || i && NO(o, n) || a?.hasCrossAxisGestureTarget && !a.drawerAxisAttributed && a.allowSwipe !== !0);
			},
			onProgress(e, t) {
				let n = z.current;
				n && se(t);
				let r = !!(_ && _.length > 0);
				if (n && u === "down" && r && t) {
					let e = s.context.popupRef.current;
					e && (e.style.removeProperty("transform"), e.style.setProperty(HE, `${xD(b ?? 0, t.deltaY)}px`));
				}
				let i = e;
				if (ne && S > 0) {
					let e = b ?? ne.minOffset;
					n && t && Number.isFinite(t.deltaY) ? i = ((e) => yD((e - ne.minOffset) / ne.range, 0, 1))(yD(e + t.deltaY, 0, S)) : W !== null && (i = W);
				}
				n || (f?.(0), ie()), ae(i, !0, n);
			},
			onRelease({ event: e, deltaX: t, deltaY: n, direction: r, velocityX: i, velocityY: a, releaseVelocityX: o, releaseVelocityY: c }) {
				let l = s.context.popupRef.current;
				if (!l) {
					K();
					return;
				}
				let d = l;
				function f(e) {
					ie(), G(!0), d.style.removeProperty("transition"), d.setAttribute(gc, ""), WO.flushSync(() => {
						F(oe(d, e, t, n, i, a, o, c));
					});
				}
				if (!_ || _.length === 0) {
					if (!r) {
						K();
						return;
					}
					let e = iO(r, t, n);
					if (e <= 0) return K(), !1;
					if (iO(r, i, a) >= qO) return f(r), !0;
					let o = e > kO(d, r);
					return o ? f(r) : K(), o;
				}
				if (u !== "down" && u !== "up") {
					K();
					return;
				}
				if (!S) return K(), !1;
				if (v.length === 0) {
					K();
					return;
				}
				let p = u === "down" ? n : -n, h = Math.sign(p), g = u === "down" ? c : -c, C = u === "down" ? a : -a, w = g;
				if (h !== 0 && Math.abs(p) >= KO) {
					let e = Math.sign(w);
					e !== 0 && e !== h && (w = C);
				}
				let T = b ?? 0, E = yD(T + p, 0, S), D = Math.abs(w) >= JO ? yD(w, -4, XO) * YO : 0, O = m ? E : yD(E + D, 0, S), k = Uc(dl, e), A = () => (ae(0, !0, !0), K(), !1), j = (e) => (x(e.value, k), A()), M = (e) => r ? (x(null, k), k.isCanceled ? A() : (I.current = y, f(u), !0)) : j(e);
				if (m) {
					let e = [...v].sort((e, t) => e.offset - t.offset), t = e.map((e) => e.offset), n = CD(t, T), r = e[CD(t, O)], i = Math.sign(w), a = h !== 0 && i !== 0 && i === h && Math.abs(w) >= JO, o = O;
					if (a) {
						let t = yD(n + h, 0, e.length - 1);
						if (t !== n) {
							let n = e[t];
							(h > 0 ? O < n.offset : O > n.offset) && (r = n, o = n.offset);
						} else if (h > 0) return M(r);
					}
					return Math.abs(o - S) < Math.abs(o - r.offset) ? M(r) : j(r);
				}
				let N = v[CD(v.map((e) => e.offset), O)];
				return w >= qO && p > 0 || Math.abs(O - S) < Math.abs(O - N.offset) ? M(N) : j(N);
			},
			onDismiss(e) {
				k?.set({
					swipeProgress: 0,
					frontmostHeight: 0
				});
				let t = s.context.backdropRef.current;
				t && (t.style.setProperty(KE, "0"), t.style.removeProperty(zE));
				let n = Uc(dl, e);
				if (s.setOpen(!1, n), n.isCanceled) {
					let t = I.current;
					t !== void 0 && x(t, Uc(dl, e)), I.current = void 0, L.current?.(), K();
				} else if (s.select("open")) {
					let t = e;
					R.request(() => {
						if (s.select("open")) {
							let e = I.current;
							e !== void 0 && x(e, Uc(dl, t)), I.current = void 0, K(), L.current?.();
						} else I.current = void 0;
					});
				} else I.current = void 0, G(!0);
			}
		}), le = ce.getPointerProps(), ue = ce.getTouchProps(), { moveNative: de, reset: fe } = ce;
		L.current = fe, UO.useEffect(() => {
			let e = D ?? O;
			if (!e || !C || !w) return;
			let t = e, n = Vi(t);
			function r(e, r, i) {
				let a = M ? i.clientY - r.lastY : i.clientX - r.lastX;
				if (e.touches.length === 2 || NO(n, t) || A || LO(r, e, i, M)) return;
				let o = r.scrollTarget;
				if (!o || o === n.documentElement || o === n.body) e.cancelable && e.preventDefault(), e.stopPropagation(), de(e, t);
				else if (!RO(o, j)) e.cancelable && e.preventDefault(), e.stopPropagation();
				else {
					if (a !== 0) {
						let t = VO(o, j, u, a);
						r.allowSwipe ? e.cancelable && e.preventDefault() : e.cancelable && t ? (r.allowSwipe = !0, e.preventDefault()) : r.allowSwipe = !1;
					}
					r.allowSwipe === !0 && (e.stopPropagation(), de(e, t));
				}
			}
			function i(e) {
				if (U?.onTouchMove(e), ee.current) return;
				let t = te.current, n = e.touches[0];
				n && t && (r(e, t, n), IO(t, n));
			}
			return Ju(n, "touchmove", i, {
				passive: !1,
				capture: !0
			});
		}, [
			w,
			A,
			C,
			O,
			M,
			j,
			u,
			de,
			D,
			U
		]), J(() => {
			ne && !ce.swiping && ae(!C || T ? 0 : W ?? 0, !0, !1);
		}, [
			ae,
			p,
			T,
			f,
			C,
			W,
			ne,
			ce.swiping,
			s,
			k
		]), J(() => {
			if (f) return C || f(0), () => {
				f(0);
			};
		}, [f, C]), J(() => {
			C && (h.current || fe(), K());
		}, [
			K,
			C,
			fe,
			h
		]), J(() => {
			let e = l.current;
			return () => {
				k?.set({
					swipeProgress: 0,
					frontmostHeight: 0
				}), TO(e, !1);
				let t = l.current;
				t !== e && TO(t, !1), ie();
			};
		}, [
			l,
			ie,
			k
		]);
		let pe = UO.useMemo(() => ({
			swiping: ce.swiping,
			getDragStyles: ce.getDragStyles,
			swipeStrength: P ?? null,
			setSwipeDismissed: G
		}), [
			G,
			ce.getDragStyles,
			ce.swiping,
			P
		]);
		function me(e) {
			ee.current = e, te.current = null;
		}
		function he() {
			me(!1), V.current = "", H.current = !1;
		}
		function ge(e) {
			return V.current = "", e.pointerType !== "touch";
		}
		return /*#__PURE__*/ (0, GO.jsx)(Iv, {
			ref: t,
			className: r,
			style: i,
			render: n,
			...hi(o, {
				onPointerDown(e) {
					if (V.current = e.pointerType, H.current = e.pointerType === "pen", !C || !w || A) return;
					let t = eO(e.currentTarget.getRootNode(), e.clientX, e.clientY);
					EO(t) || DO(t) || e.pointerType !== "touch" && le.onPointerDown?.(e);
				},
				onPointerMove(e) {
					e.pointerType !== "touch" && le.onPointerMove?.(e);
				},
				onPointerUp(e) {
					ge(e) && le.onPointerUp?.(e);
				},
				onPointerCancel(e) {
					ge(e) && le.onPointerCancel?.(e);
				},
				onTouchStart(e) {
					if (V.current === "pen" && H.current) {
						H.current = !1, me(!1);
						return;
					}
					if (!C || !w || A) {
						me(!1);
						return;
					}
					let t = e.touches[0];
					if (!t) return;
					if (FO(e)) {
						me(!1);
						return;
					}
					let n = e.currentTarget, r = eO(n.getRootNode(), t.clientX, t.clientY), i = hu(e.nativeEvent), a = jr(i) ? i : n;
					if (!Q(n, a) || (U?.onTouchStart(e), mu(r, `[data-base-ui-swipe-ignore]:not(${ak[N]})`))) {
						me(!0);
						return;
					}
					ee.current = !1;
					let o = QD(a, n, j), s = QD(a, n, N) != null || mu(r, ak[N]) != null, l = null;
					o && (l = BO(o, j, u) ? null : !1), te.current = {
						startX: t.clientX,
						startY: t.clientY,
						lastX: t.clientX,
						lastY: t.clientY,
						startedInPopup: Q(c.current, r),
						scrollTarget: o,
						hasCrossAxisGestureTarget: s,
						allowSwipe: l,
						preserveNativeCrossAxisScroll: !1,
						drawerAxisAttributed: !1
					}, ue.onTouchStart?.(e);
				},
				onTouchEnd(e) {
					U?.onTouchEnd(e), he(), ue.onTouchEnd?.(e);
				},
				onTouchCancel(e) {
					U?.onTouchCancel(), he(), ue.onTouchCancel?.(e);
				},
				[Qv]: void 0
			}),
			children: /*#__PURE__*/ (0, GO.jsx)(kD.Provider, {
				value: pe,
				children: a
			})
		});
	});
})), ck = o((() => {
	XE(), _l(), tD(), rD(), fi(), Oa(), sD(), qE(), GE(), LD(), zD(), ii(), li(), qD(), Hi(), mc(), $y(), Gc(), ml(), vO(), rO(), mD(), vD(), Ol(), Th(), fu(), Rc(), bO(), Ni(), Km(), Yi(), Xf(), S_(), Xv(), sk(), Zr(), od(), Rl(), lh(), $D(), wO(), Ov(), Jp();
})), lk = o((() => {
	ck(), qE(), Rc(), GE(), mD();
})), uk = o((() => {}));
// src/components/ui/drawer.tsx
function dk({ children: e, className: t, ...n }) {
	let r = ny();
	return /* @__PURE__ */ (0, fk.jsxs)(RD, {
		container: r ?? void 0,
		children: [/* @__PURE__ */ (0, fk.jsx)(YE, {
			"data-slot": "drawer-overlay",
			className: "oo-drawer-backdrop pointer-events-auto fixed inset-0 z-50 bg-black/40"
		}), /* @__PURE__ */ (0, fk.jsx)(ok, {
			className: "pointer-events-none fixed inset-0 z-50 flex items-end justify-center",
			children: /* @__PURE__ */ (0, fk.jsxs)(ID, {
				"data-slot": "drawer-content",
				className: _s("oo-drawer-popup pointer-events-auto w-full max-w-lg rounded-t-xl border border-b-0 border-border bg-popover text-sm text-popover-foreground outline-none", t),
				...n,
				children: [/* @__PURE__ */ (0, fk.jsx)("div", {
					"aria-hidden": "true",
					"data-drawer-handle": !0,
					className: "flex h-7 shrink-0 touch-none select-none items-center justify-center",
					children: /* @__PURE__ */ (0, fk.jsx)("div", { className: "h-1 w-10 rounded-full bg-muted-foreground/40" })
				}), /* @__PURE__ */ (0, fk.jsx)(eD, {
					className: "oo-drawer-scroll overflow-y-auto overscroll-contain px-4 pb-4",
					children: e
				})]
			})
		})]
	});
}
var fk, pk, mk, hk, gk = o((() => {
	lk(), vs(), oy(), uk(), fk = bs(), pk = BD, mk = yO, hk = nD;
})), _k, vk = o((() => {
	_k = [
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
function yk({ message: e, own: t, onClose: n, onAction: r, onReact: i }) {
	let a = (0, bk.useRef)(null), o = (0, bk.useRef)(null);
	e && (a.current = {
		message: e,
		own: t
	});
	let s = e || a.current?.message, c = e ? t : !!a.current?.own;
	function l(t) {
		e && !o.current && (o.current = t, n());
	}
	let u = [
		[
			...c ? [{
				id: "edit",
				label: "Editar mensagem",
				icon: mn,
				description: "Alterar o texto da sua mensagem"
			}] : [],
			{
				id: "reply",
				label: "Responder",
				icon: kn,
				description: "Citar esta mensagem na resposta"
			},
			{
				id: "forward",
				label: "Encaminhar",
				icon: pt,
				description: "Enviar uma cópia identificada para outra conversa"
			}
		],
		[
			{
				id: "copy",
				label: "Copiar texto",
				icon: Le,
				description: "Copiar o texto para a área de transferência"
			},
			{
				id: "unread",
				label: "Marcar como não lida",
				icon: Ut,
				description: "Marcar a conversa como não lida a partir daqui"
			},
			{
				id: "pin",
				label: s?.pinned ? "Desafixar mensagem" : "Fixar mensagem",
				icon: _n,
				description: "Gerenciar as mensagens fixadas da conversa"
			},
			{
				id: "bookmark",
				label: s?.bookmarked ? "Remover dos salvos" : "Salvar mensagem",
				icon: ge,
				description: "Guardar esta mensagem nos seus salvos pessoais"
			}
		],
		...c ? [[{
			id: "remove",
			label: "Apagar mensagem",
			icon: cr,
			description: "Apagar sua mensagem para os participantes após confirmar"
		}]] : []
	];
	return /* @__PURE__ */ (0, xk.jsx)(pk, {
		open: !!e,
		swipeDirection: "down",
		onOpenChange: (e) => {
			e || n();
		},
		onOpenChangeComplete: (e) => {
			if (!e) {
				let e = o.current;
				o.current = null, e?.();
			}
		},
		children: /* @__PURE__ */ (0, xk.jsxs)(dk, { children: [
			/* @__PURE__ */ (0, xk.jsxs)("header", {
				className: "mb-3 flex items-center justify-between gap-3",
				children: [
					/* @__PURE__ */ (0, xk.jsx)(mk, {
						className: "text-sm font-medium",
						children: "Ações da mensagem"
					}),
					/* @__PURE__ */ (0, xk.jsx)(Y, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						"aria-label": "Fechar ações da mensagem",
						onClick: n,
						children: /* @__PURE__ */ (0, xk.jsx)(br, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, xk.jsx)(hk, {
						className: "sr-only",
						children: "Puxe para baixo para fechar ou escolha uma ação."
					})
				]
			}),
			/* @__PURE__ */ (0, xk.jsx)("div", {
				className: "mb-4 grid grid-cols-6 gap-2",
				children: _k.slice(0, 6).map((e) => /* @__PURE__ */ (0, xk.jsx)(Y, {
					type: "button",
					variant: "secondary",
					className: "h-11 rounded-lg text-xl",
					"aria-label": `Reagir com ${e}`,
					onClick: () => {
						s && l(() => i(s, e));
					},
					children: e
				}, e))
			}),
			/* @__PURE__ */ (0, xk.jsx)("div", {
				className: "grid gap-3",
				children: u.map((e, t) => /* @__PURE__ */ (0, xk.jsx)("div", {
					className: "overflow-hidden rounded-lg bg-muted/50",
					children: e.map(({ id: e, label: t, icon: n, description: i }, a) => /* @__PURE__ */ (0, xk.jsxs)(Y, {
						type: "button",
						variant: "ghost",
						title: i,
						className: `h-12 w-full justify-start gap-3 rounded-none px-3 ${a ? "border-t border-border/60" : ""} ${e === "remove" ? "text-destructive" : ""}`,
						onClick: () => {
							s && l(() => r(e, s));
						},
						children: [/* @__PURE__ */ (0, xk.jsx)(n, { className: "size-4 shrink-0" }), t]
					}, e))
				}, t))
			})
		] })
	});
}
var bk, xk, Sk = o((() => {
	bk = /* @__PURE__ */ u(b(), 1), Tr(), Cs(), gk(), vk(), xk = bs();
}));
// src/features/messages/message-thread.tsx
function Ck({ conversation: e, onProfile: t }) {
	let n = Oy(), r = n.threads[e.id], [i, a] = (0, wk.useState)(null), [o, s] = (0, wk.useState)(null), [c, l] = (0, wk.useState)(null), [u, d] = (0, wk.useState)(null), [f, p] = (0, wk.useState)(""), [m, h] = (0, wk.useState)(!1), [g, _] = (0, wk.useState)(""), [v, y] = (0, wk.useState)(!1), [b, x] = (0, wk.useState)(""), [S, C] = (0, wk.useState)(""), [w, T] = (0, wk.useState)("all"), [E, D] = (0, wk.useState)(null), [O, k] = (0, wk.useState)(!1), A = (0, wk.useRef)(null), j = (0, wk.useRef)(null), M = (0, wk.useRef)(!0);
	(0, wk.useEffect)(() => {
		let e = setTimeout(() => C(b.trim()), 250);
		return () => clearTimeout(e);
	}, [b]), (0, wk.useEffect)(() => {
		let t = !0;
		if (!S && w === "all") D(null);
		else return k(!0), yy.messages(e.id, {
			search: S,
			filter: w
		}).then((e) => {
			t && D(e.messages);
		}).catch((e) => {
			t && _(e.message);
		}).finally(() => {
			t && k(!1);
		}), () => {
			t = !1;
		};
	}, [
		e.id,
		S,
		w,
		n.inbox?.cursor
	]);
	let N = E || r?.messages || [];
	(0, wk.useLayoutEffect)(() => {
		M.current && j.current && (j.current.scrollTop = j.current.scrollHeight);
	}, [N.length, N.at(-1)?.id]);
	async function P(e) {
		_("");
		try {
			await e();
		} catch (e) {
			_(e instanceof Error ? e.message : "Não foi possível concluir.");
		}
	}
	function F(t) {
		e.canSend && (s(null), Gy.setDraft(e.id, { reply: t }), A.current?.focus());
	}
	function I() {
		y(!1), x(""), C(""), T("all"), D(null), k(!1), M.current = !0;
	}
	function L(e, t) {
		e === "reply" ? F(t) : e === "edit" ? (s(t), A.current?.focus()) : e === "remove" ? l(t) : e === "forward" ? (p(""), d(t)) : P(e === "copy" ? () => navigator.clipboard.writeText(t.content) : () => Gy.action(t, e));
	}
	let R = n.inbox?.me;
	return R ? /* @__PURE__ */ (0, $.jsxs)("section", {
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
						children: /* @__PURE__ */ (0, $.jsx)(Jy, {
							profile: e.peer.profile,
							className: "size-8"
						})
					}),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, $.jsx)("button", {
							type: "button",
							className: "max-w-full truncate text-left text-sm font-medium hover:underline",
							onClick: () => A.current?.mention(e.peer.username),
							children: e.peer.profile.displayName
						}), /* @__PURE__ */ (0, $.jsxs)("p", {
							className: "truncate text-[10px] text-muted-foreground",
							children: [e.peer.online ? "Online" : "@" + e.peer.username, e.muted ? " · silenciada" : ""]
						})]
					}),
					/* @__PURE__ */ (0, $.jsx)(Y, {
						type: "button",
						variant: "ghost",
						size: "icon",
						"aria-label": v ? "Fechar pesquisa da conversa" : "Pesquisar na conversa",
						"aria-expanded": v,
						"aria-controls": "dm-conversation-search",
						onClick: () => v ? I() : y(!0),
						children: v ? /* @__PURE__ */ (0, $.jsx)(br, { className: "size-4" }) : /* @__PURE__ */ (0, $.jsx)(Fn, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, $.jsxs)(dT, { children: [/* @__PURE__ */ (0, $.jsx)(fT, {
						render: /* @__PURE__ */ (0, $.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Opções da conversa"
						}),
						children: /* @__PURE__ */ (0, $.jsx)(Ue, { className: "size-4" })
					}), /* @__PURE__ */ (0, $.jsxs)(pT, {
						align: "end",
						children: [
							/* @__PURE__ */ (0, $.jsxs)(gT, {
								onClick: () => void P(() => Gy.conversation(e.id, { muted: !e.muted })),
								children: [e.muted ? /* @__PURE__ */ (0, $.jsx)(pe, {}) : /* @__PURE__ */ (0, $.jsx)(ue, {}), e.muted ? "Ativar notificações" : "Silenciar conversa"]
							}),
							/* @__PURE__ */ (0, $.jsxs)(gT, {
								onClick: () => void P(() => Gy.conversation(e.id, { archived: !0 })),
								children: [/* @__PURE__ */ (0, $.jsx)(ie, {}), "Fechar conversa"]
							}),
							/* @__PURE__ */ (0, $.jsxs)(gT, {
								onClick: () => void P(() => Gy.block(e.peer, !e.blockedByMe)),
								children: [e.blockedByMe ? /* @__PURE__ */ (0, $.jsx)(qn, {}) : /* @__PURE__ */ (0, $.jsx)(Wn, {}), e.blockedByMe ? "Desbloquear conta" : "Bloquear conta"]
							})
						]
					})] })
				]
			}),
			v && /* @__PURE__ */ (0, $.jsxs)("div", {
				id: "dm-conversation-search",
				className: "shrink-0 border-b border-border px-3 py-2",
				onKeyDown: (e) => {
					e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), I());
				},
				children: [/* @__PURE__ */ (0, $.jsxs)("label", {
					className: "flex min-w-0 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, $.jsx)(Fn, { className: "size-4 shrink-0 text-muted-foreground" }),
						/* @__PURE__ */ (0, $.jsx)(qb, {
							autoFocus: !0,
							"aria-label": "Pesquisar nesta conversa",
							className: "h-8",
							placeholder: "Pesquisar nesta conversa…",
							value: b,
							onChange: (e) => x(e.target.value)
						}),
						b && /* @__PURE__ */ (0, $.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon-sm",
							"aria-label": "Limpar pesquisa",
							onClick: () => x(""),
							children: /* @__PURE__ */ (0, $.jsx)(br, { className: "size-3" })
						})
					]
				}), /* @__PURE__ */ (0, $.jsx)("nav", {
					"aria-label": "Filtrar mensagens",
					className: "mt-2 overflow-x-auto touch-pan-x",
					children: /* @__PURE__ */ (0, $.jsx)("div", {
						className: "flex w-max min-w-full gap-1",
						children: Tk.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(Y, {
							type: "button",
							variant: w === e ? "secondary" : "ghost",
							size: "sm",
							"aria-pressed": w === e,
							onClick: () => {
								M.current = !0, T(e);
							},
							children: t
						}, e))
					})
				})]
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				ref: j,
				className: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 py-2",
				onScroll: () => {
					let e = j.current;
					e && (M.current = e.scrollHeight - e.scrollTop - e.clientHeight < 100);
				},
				"aria-label": "Histórico de mensagens",
				children: [
					!E && !S && w === "all" && r?.hasMore && /* @__PURE__ */ (0, $.jsx)("div", {
						className: "px-3 pb-3 text-center",
						children: /* @__PURE__ */ (0, $.jsxs)(Y, {
							type: "button",
							variant: "ghost",
							size: "sm",
							disabled: r.loading,
							onClick: () => {
								let t = j.current, n = t?.scrollHeight || 0;
								M.current = !1, Gy.load(e.id, !0).then(() => requestAnimationFrame(() => {
									t && (t.scrollTop += t.scrollHeight - n);
								}));
							},
							children: [r.loading ? /* @__PURE__ */ (0, $.jsx)(Lt, { className: "size-3 animate-spin" }) : /* @__PURE__ */ (0, $.jsx)(Te, { className: "size-3 rotate-180" }), "Carregar mensagens anteriores"]
						})
					}),
					O && /* @__PURE__ */ (0, $.jsx)("p", {
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
							children: [/* @__PURE__ */ (0, $.jsx)(_x, { className: "size-9 rounded-full" }), /* @__PURE__ */ (0, $.jsxs)("div", {
								className: "flex-1 space-y-2",
								children: [/* @__PURE__ */ (0, $.jsx)(_x, { className: "h-3 w-28" }), /* @__PURE__ */ (0, $.jsx)(_x, { className: "h-3 w-3/4" })]
							})]
						}, e))
					}) : N.length ? N.map((r, i) => {
						let o = new Date(r.createdAt).toLocaleDateString("pt-BR"), s = N[i - 1], c = r.sender.username === R.username ? R : e.peer;
						return /* @__PURE__ */ (0, $.jsxs)("div", { children: [(!s || new Date(s.createdAt).toLocaleDateString("pt-BR") !== o) && /* @__PURE__ */ (0, $.jsxs)("div", {
							className: "my-4 flex items-center gap-3 px-4 text-[10px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, $.jsx)("span", { className: "h-px flex-1 bg-border" }),
								/* @__PURE__ */ (0, $.jsx)("span", { children: o }),
								/* @__PURE__ */ (0, $.jsx)("span", { className: "h-px flex-1 bg-border" })
							]
						}), /* @__PURE__ */ (0, $.jsx)(kT, {
							message: r,
							person: c,
							own: r.sender.username === R.username,
							read: r.seq <= e.peerReadSeq,
							onReply: F,
							onActions: a,
							onMention: (e) => A.current?.mention(e),
							onProfile: t,
							onReact: (e, t) => void P(() => Gy.action(e, "reaction", t)),
							quickReaction: n.inbox?.settings.quickReaction || "👍"
						})] }, r.id);
					}) : /* @__PURE__ */ (0, $.jsxs)("div", {
						className: "grid h-full min-h-40 place-content-center justify-items-center gap-3 px-6 text-center",
						children: [
							/* @__PURE__ */ (0, $.jsx)(Jy, {
								profile: e.peer.profile,
								className: "size-14"
							}),
							/* @__PURE__ */ (0, $.jsx)("h3", {
								className: "text-base font-semibold",
								children: e.peer.profile.displayName
							}),
							/* @__PURE__ */ (0, $.jsx)("p", {
								className: "max-w-xs text-sm text-muted-foreground",
								children: S || w !== "all" ? "Nenhuma mensagem encontrada." : "Este é o início da sua conversa direta."
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
			/* @__PURE__ */ (0, $.jsx)(IE, {
				ref: A,
				conversation: e,
				editing: o,
				onEditDone: () => s(null)
			}, o?.id || "composer"),
			/* @__PURE__ */ (0, $.jsx)(yk, {
				message: i,
				own: i?.sender.username === R.username,
				onClose: () => a(null),
				onAction: L,
				onReact: (e, t) => void P(() => Gy.action(e, "reaction", t))
			}),
			/* @__PURE__ */ (0, $.jsx)(sy, {
				open: !!c,
				onOpenChange: (e) => {
					!e && !m && l(null);
				},
				children: /* @__PURE__ */ (0, $.jsxs)(uy, { children: [/* @__PURE__ */ (0, $.jsxs)(dy, { children: [/* @__PURE__ */ (0, $.jsx)(py, { children: "Apagar mensagem?" }), /* @__PURE__ */ (0, $.jsx)(my, { children: "A mensagem será apagada para os participantes desta DM." })] }), /* @__PURE__ */ (0, $.jsxs)(fy, { children: [/* @__PURE__ */ (0, $.jsx)(Y, {
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
								await Gy.remove(c), l(null);
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
			/* @__PURE__ */ (0, $.jsx)(sy, {
				open: !!u,
				onOpenChange: (e) => {
					!e && !m && d(null);
				},
				children: /* @__PURE__ */ (0, $.jsxs)(uy, { children: [
					/* @__PURE__ */ (0, $.jsxs)(dy, { children: [/* @__PURE__ */ (0, $.jsx)(py, { children: "Encaminhar mensagem" }), /* @__PURE__ */ (0, $.jsx)(my, { children: "Escolha outra conversa aceita." })] }),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "grid max-h-64 gap-1 overflow-y-auto",
						children: [n.inbox?.conversations.filter((t) => t.id !== e.id && t.canSend).map((e) => /* @__PURE__ */ (0, $.jsxs)(Y, {
							type: "button",
							variant: f === e.id ? "secondary" : "ghost",
							className: "h-12 justify-start",
							onClick: () => p(e.id),
							children: [/* @__PURE__ */ (0, $.jsx)(Jy, { profile: e.peer.profile }), /* @__PURE__ */ (0, $.jsx)("span", {
								className: "truncate",
								children: e.peer.profile.displayName
							})]
						}, e.id)), !n.inbox?.conversations.some((t) => t.id !== e.id && t.canSend) && /* @__PURE__ */ (0, $.jsx)("p", {
							className: "py-4 text-sm text-muted-foreground",
							children: "Nenhuma outra conversa aceita disponível."
						})]
					}),
					/* @__PURE__ */ (0, $.jsxs)(fy, { children: [/* @__PURE__ */ (0, $.jsx)(Y, {
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
									await Gy.forward(u, f), d(null);
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
var wk, $, Tk, Ek = o((() => {
	wk = /* @__PURE__ */ u(b(), 1), Tr(), Cs(), Yb(), yx(), gy(), yT(), Xy(), Ky(), by(), MT(), LE(), Sk(), $ = bs(), Tk = [
		["all", "Tudo"],
		["media", "Mídia"],
		["pinned", "Fixadas"],
		["links", "Links"],
		["files", "Arquivos"],
		["bookmarks", "Salvas"]
	];
}));
// node_modules/@base-ui/utils/getDefaultFormSubmitter.mjs
function Dk(e) {
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
var Ok = o((() => {})), kk, Ak, jk = o((() => {
	kk = "data-checked", Ak = "data-unchecked";
}));
// node_modules/@base-ui/react/checkbox/utils/getCheckboxStateAttributesMapping.mjs
function Mk(e) {
	return {
		checked(t) {
			return e.indeterminate ? {} : t ? { [kk]: "" } : { [Ak]: "" };
		},
		...ob
	};
}
var Nk = o((() => {
	sb(), jk();
}));
// node_modules/@base-ui/react/checkbox-group/CheckboxGroupContext.mjs
function Pk() {
	return Fk.useContext(Ik);
}
var Fk, Ik, Lk = o((() => {
	Fk = /* @__PURE__ */ u(b(), 1), Ik = /*#__PURE__*/ Fk.createContext(void 0);
}));
// node_modules/@base-ui/react/checkbox/root/CheckboxRootContext.mjs
function Rk() {
	let e = zk.useContext(Bk);
	if (e === void 0) throw Error(Mi(14));
	return e;
}
var zk, Bk, Vk = o((() => {
	Ni(), zk = /* @__PURE__ */ u(b(), 1), Bk = /*#__PURE__*/ zk.createContext(void 0);
})), Hk, Uk, Wk, Gk, Kk = o((() => {
	Hk = /* @__PURE__ */ u(b(), 1), fa(), Px(), fi(), na(), ud(), Hi(), Ok(), Nk(), Wi(), Oa(), Ol(), Ai(), Yi(), fb(), Pb(), Ib(), Mb(), gb(), bb(), Tb(), Ob(), Lk(), Vk(), Gc(), ml(), Kv(), Uk = bs(), Wk = "data-parent", Gk = /*#__PURE__*/ Hk.forwardRef(function(e, t) {
		let { checked: n, className: r, defaultChecked: i = !1, "aria-labelledby": a, disabled: o = !1, form: s, id: c, indeterminate: l = !1, inputRef: u, name: d, onCheckedChange: f, parent: p = !1, readOnly: m = !1, render: h, required: g = !1, uncheckedValue: _, value: v, nativeButton: y = !1, style: b, ...x } = e, { clearErrors: S } = pb(), { disabled: C, name: w, setDirty: T, setFilled: E, setTouched: D, state: O, validationMode: k, validityData: A, validation: j } = cb(), M = kb(), { labelId: N, registerControlId: P, getDescriptionProps: F } = _b(), I = Pk(), L = I?.allValues === void 0 ? void 0 : I.parent, R = L !== void 0, z = C || M.disabled || I?.disabled || o, B = w ?? d, V = v ?? B, H = Dl(), ee = I?.registerControlId !== P, te = Eb({
			id: c || void 0,
			enabled: ee
		}), U = y ? te : H, ne = {};
		R && (p ? ne = L.getParentProps() : V !== void 0 && (ne = L.getChildProps(V)));
		let { checked: W = n, indeterminate: re = l, onCheckedChange: G, ...K } = ne, ie = I?.value, ae = Hk.useRef(null), oe = Nb(z, ae), { getButtonProps: se, buttonRef: ce } = Gi({
			disabled: z,
			native: y
		}), le = I?.validation ?? j, [ue, de] = Mx({
			controlled: V !== void 0 && ie !== void 0 && !p ? ie.includes(V) : W,
			default: i,
			name: "Checkbox",
			state: "checked"
		}), fe = R ? !!W : ue, pe = R && re || l;
		Fb(ae, H, ue, void 0, !I && !z, d);
		let me = L?.registerChildId, he = Hk.useRef(null), ge = le.registerInput, _e = I ? V : void 0, ve = Hk.useCallback((e) => ge(e, {
			controlRef: ae,
			value: _e
		}), [ge, _e]), ye = Xi(u, he, p ? void 0 : ve), be = xb(a, N, he, !y, te, x["aria-label"]);
		J(() => {
			he.current && (he.current.indeterminate = pe), I || E(ue);
		}, [
			ue,
			pe,
			I,
			E
		]), Wv(ue, () => {
			I || (S(B), T(ue !== A.initialValue), le.change(ue));
		});
		let xe = hi({
			checked: ue,
			disabled: z,
			form: s,
			name: p ? void 0 : B,
			id: y ? void 0 : te,
			required: g,
			ref: ye,
			style: B ? ld : cd,
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
				if (f?.(t, n), !n.isCanceled && (G?.(t, n), !n.isCanceled && (de(t), V !== void 0 && I !== void 0 && !p && !R))) {
					let e = t ? [...I.value, V] : I.value.filter((e) => e !== V);
					I.setValue(e, n);
				}
			},
			onClick(e) {
				e.stopPropagation();
			},
			onFocus() {
				ae.current?.focus();
			}
		}, v === void 0 ? da : { value: (I ? ue && v : v) || "" }, F, (e) => le.getValidationProps(z, e));
		Hk.useEffect(() => {
			if (!L || V === void 0) return;
			let e = L.disabledStatesRef.current;
			return e.set(V, z), () => {
				e.delete(V);
			};
		}, [
			L,
			z,
			V
		]);
		let Se = Hk.useMemo(() => ({
			...O,
			checked: fe,
			disabled: z,
			readOnly: m,
			required: g,
			indeterminate: pe
		}), [
			O,
			fe,
			z,
			m,
			g,
			pe
		]), Ce = Mk(Se), we = ya("span", e, {
			state: Se,
			ref: [
				ce,
				ae,
				t
			],
			props: [
				{
					id: U,
					role: "checkbox",
					"aria-checked": pe ? "mixed" : fe,
					"aria-readonly": m || void 0,
					"aria-required": g || void 0,
					"aria-labelledby": be,
					[Wk]: p ? "" : void 0,
					onFocus() {
						oe(!0);
					},
					onBlur() {
						let e = he.current;
						e && (D(!0), oe(!1), k === "onBlur" && le.commit(I ? ie : e.checked));
					},
					onKeyDown(e) {
						if (e.key !== "Enter" || (e.preventBaseUIHandler(), e.defaultPrevented)) return;
						let t = he.current?.form ?? null, n = e.currentTarget, r = e.nativeEvent, i = e.preventDefault, a = r.preventDefault, o = !1;
						e.preventDefault = () => {
							o = !0, i.call(e);
						}, r.preventDefault = () => {
							o = !0, a.call(r);
						}, a.call(r), Or(n).queueMicrotask(() => {
							e.preventDefault = i, r.preventDefault = a, o || Dk(t)?.click();
						});
					},
					onClick(e) {
						if (m || z) return;
						e.preventDefault();
						let t = he.current;
						t && Ui(t, e);
					}
				},
				x,
				K,
				se,
				F,
				(e) => le.getValidationProps(z, e)
			],
			stateAttributesMapping: Ce
		}), Te = we.props.id;
		return J(() => {
			if (me && !p && V !== void 0 && Te !== void 0) return me(V, Te);
		}, [
			me,
			p,
			V,
			Te
		]), /*#__PURE__*/ (0, Uk.jsxs)(Bk.Provider, {
			value: Se,
			children: [
				we,
				!ue && !I && B && !p && _ !== void 0 && /*#__PURE__*/ (0, Uk.jsx)("input", {
					type: "hidden",
					form: s,
					name: B,
					value: _,
					disabled: z
				}),
				/*#__PURE__*/ (0, Uk.jsx)("input", {
					...xe,
					suppressHydrationWarning: !0
				})
			]
		});
	});
})), qk, Jk, Yk = o((() => {
	qk = /* @__PURE__ */ u(b(), 1), Vk(), Oa(), Nk(), lm(), $p(), xc(), Jk = /*#__PURE__*/ qk.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, keepMounted: a = !1, ...o } = e, s = Rk(), c = s.checked || s.indeterminate, { mounted: l, transitionStatus: u, setMounted: d } = Zp(c), f = qk.useRef(null), p = {
			...s,
			transitionStatus: u
		};
		sm({
			batch: !0,
			enabled: !c,
			open: c,
			ref: f,
			onComplete() {
				c || d(!1);
			}
		});
		let m = {
			...Mk(s),
			...bc
		}, h = a || l, g = ya("span", e, {
			ref: [t, f],
			state: p,
			stateAttributesMapping: m,
			props: o
		});
		return h ? g : null;
	});
})), Xk = o((() => {
	Kk(), Yk();
})), Zk = o((() => {
	Xk(), jk(), xc();
}));
// src/components/ui/checkbox.tsx
function Qk({ className: e, ...t }) {
	return /* @__PURE__ */ (0, $k.jsx)(Gk, {
		"data-slot": "checkbox",
		className: _s("inline-flex size-4 shrink-0 items-center justify-center rounded border border-input bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground", e),
		...t,
		children: /* @__PURE__ */ (0, $k.jsx)(Jk, { children: /* @__PURE__ */ (0, $k.jsx)(Se, { className: "size-3" }) })
	});
}
var $k, eA = o((() => {
	Zk(), Tr(), vs(), $k = bs();
}));
// node_modules/@base-ui/utils/useOnFirstRender.mjs
function tA(e) {
	let t = nA.useRef(!0);
	t.current && (t.current = !1, e());
}
var nA, rA = o((() => {
	nA = /* @__PURE__ */ u(b(), 1);
}));
// node_modules/@base-ui/react/select/root/SelectRootContext.mjs
function iA() {
	let e = oA.useContext(sA);
	if (e === void 0) throw Error(Mi(60));
	return e;
}
function aA() {
	let e = oA.useContext(cA);
	if (e === void 0) throw Error(Mi(61));
	return e;
}
var oA, sA, cA, lA = o((() => {
	Ni(), oA = /* @__PURE__ */ u(b(), 1), sA = /*#__PURE__*/ oA.createContext(void 0), cA = /*#__PURE__*/ oA.createContext(void 0);
}));
// node_modules/@base-ui/utils/areArraysEqual.mjs
function uA(e, t, n = Object.is) {
	let { length: r } = e;
	if (r !== t.length) return !1;
	for (let i = 0; i < r; i += 1) if (!n(e[i], t[i])) return !1;
	return !0;
}
var dA = o((() => {}));
// node_modules/@base-ui/react/internals/itemEquality.mjs
function fA(e, t, n) {
	return e == null || t == null ? Object.is(e, t) : n(e, t);
}
function pA(e, t, n) {
	return Array.isArray(e) && Array.isArray(t) ? !uA(e, t, (e, t) => fA(e, t, n)) : e !== t;
}
function mA(e, t, n) {
	return e ? e.some((e) => e !== void 0 && fA(t, e, n)) : !1;
}
function hA(e, t, n) {
	return e ? e.findIndex((e) => e !== void 0 && fA(e, t, n)) : -1;
}
function gA(e, t) {
	if (t !== bA) return (n) => mA(e, n, t);
	let n = new Set(e);
	return n.delete(void 0), (t) => n.has(t) && (t !== 0 || e.some((e) => Object.is(t, e)));
}
function _A(e, t, n, r) {
	let i = r && Array.isArray(t) ? e.findIndex(gA(t, n)) : hA(e, t, n);
	return i === -1 ? null : i;
}
function vA(e, t, n, r, i, a) {
	return mA(r, t, i) ? a != null && e > a && mA(r, n[a], i) ? a : e : e === a ? _A(n, r, i, !0) : a;
}
function yA(e, t, n) {
	return e.filter((e) => !fA(t, e, n));
}
var bA, xA = o((() => {
	dA(), bA = (e, t) => Object.is(e, t);
})), SA, CA = o((() => {
	xA(), cT(), SA = {
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
			return t == null ? !1 : n && Array.isArray(t) ? t.length > 0 : rT(t, r) !== "";
		},
		hasNullItemLabel: (e, t) => t ? tT(e.items) : !1,
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
			return e.multiple ? Array.isArray(r) && r.some((e) => fA(t, e, n)) : fA(t, r, n);
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
// node_modules/@base-ui/react/utils/scrollEdges.mjs
function wA(e, t) {
	return Math.max(0, e - t);
}
function TA(e, t) {
	if (t <= 0) return 0;
	let n = yD(e, 0, t), r = n, i = t - n, a = r <= 1, o = i <= 1;
	return a && o ? r <= i ? 0 : t : a ? 0 : o ? t : n;
}
var EA = o((() => {
	bD();
}));
// node_modules/@base-ui/react/select/root/SelectRoot.mjs
function DA(e) {
	let { id: t, value: n, defaultValue: r = null, onValueChange: i, open: a, defaultOpen: o = !1, onOpenChange: s, name: c, form: l, autoComplete: u, disabled: d = !1, readOnly: f = !1, required: p = !1, modal: m = !0, actionsRef: h, inputRef: g, onOpenChangeComplete: _, items: v, multiple: y = !1, itemToStringLabel: b, itemToStringValue: x, isItemEqualToValue: S = bA, highlightItemOnHover: C = !0, children: w } = e, { clearErrors: T } = pb(), { setDirty: E, setTouched: D, setFocused: O, validityData: k, setFilled: A, name: j, disabled: M, validation: N, validationMode: P } = cb(), F = Eb({ id: t }), I = M || d, L = j ?? c, [R, z] = Mx({
		controlled: n,
		default: y ? r ?? ua : r,
		name: "Select",
		state: "value"
	}), [B, V] = Mx({
		controlled: a,
		default: o,
		name: "Select",
		state: "open"
	}), H = OA.useRef([]), ee = OA.useRef([]), te = OA.useRef(null), U = OA.useRef(null), ne = OA.useRef(0), W = OA.useRef(null), re = OA.useRef([]), G = OA.useRef(!1), K = OA.useRef(null), ie = OA.useRef(null), ae = OA.useRef({
		allowSelectedMouseUp: !1,
		allowUnselectedMouseUp: !1,
		dragY: 0
	}), oe = OA.useRef(!1), se = OA.useRef(R), { openMethod: ce, triggerProps: le } = Jv(B), ue = ti(() => new ah({
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
		open: B,
		mounted: B,
		transitionStatus: void 0,
		items: v,
		forceMount: !1,
		openMethod: null,
		activeIndex: null,
		selectedIndex: null,
		popupProps: da,
		triggerProps: da,
		itemRoot: {
			props: da,
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
		setValue: la,
		setOpen: la,
		handleScrollArrowVisibility: la,
		onOpenChangeComplete: la,
		listRef: H,
		popupRef: te,
		scrollHandlerRef: U,
		scrollArrowsMountedCountRef: ne,
		valueRef: W,
		valuesRef: re,
		labelsRef: ee,
		typingRef: G,
		selectionRef: ae,
		firstItemTextRef: K,
		selectedItemTextRef: ie,
		alignItemWithTriggerActiveRef: oe,
		initialValueRef: se
	}, SA)).current, [de, fe] = OA.useState(!1), { mounted: pe, transitionStatus: me, forceUnmount: he } = um({
		open: B,
		ref: te,
		preventUnmountOnClose: de,
		setPreventUnmountOnClose: fe,
		onUnmount() {
			ue.update({
				activeIndex: null,
				openMethod: null,
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			}), _?.(!1);
		}
	}), ge = ue.useState("activeIndex"), _e = ue.useState("selectedIndex"), ve = ue.useState("triggerElement"), ye = ue.useState("positionerElement"), be = Hw(ce), xe = ce ?? be, Se = OA.useMemo(() => y ? "" : rT(R, x), [
		y,
		R,
		x
	]), Ce = OA.useMemo(() => y && Array.isArray(R) ? R.map((e) => rT(e, x)) : rT(R, x), [
		y,
		R,
		x
	]);
	Fb(Qu(ve), F, R, q(() => Ce), !I, c);
	let we = y ? Array.isArray(R) && R.length > 0 : R != null && Se !== "";
	J(() => {
		A(we);
	}, [we, A]), J(function() {
		let e = _A(re.current, R, S, y);
		e === null && (ie.current = null), B || ue.set("selectedIndex", e);
	}, [
		y,
		B,
		R,
		S,
		ue
	]), Wv(R, () => {
		T(L), E(pA(R, k.initialValue, S)), N.change(R);
	});
	let Te = q((e, t) => {
		let n = t, r = ym(n);
		s?.(e, n), t.isCanceled || (e || fe(r()), V(e), e || t.reason !== "focus-out" && t.reason !== "outside-press" || (D(!0), O(!1), P === "onBlur" && N.commit(R)));
	});
	OA.useImperativeHandle(h, () => ({
		unmount: he,
		close: () => {
			ue.state.open && Te(!1, Uc(ul));
		}
	}), [
		he,
		Te,
		ue
	]);
	let Ee = q((e, t) => {
		i?.(e, t), t.isCanceled || z(e);
	}), De = q((e) => {
		let t = wA(e.scrollHeight, e.clientHeight), n = TA(e.scrollTop, t), r = n > 0, i = n < t;
		ue.set("scrollUpArrowVisible", r), ue.set("scrollDownArrowVisible", i);
	}), Oe = Eh({
		open: B,
		onOpenChange: Te,
		elements: {
			reference: ve,
			floating: ye
		}
	}), ke = Pp(Oe, {
		enabled: !I,
		event: "mousedown"
	}), Ae = Wp(Oe), je = Qh(Oe, {
		enabled: !I,
		listRef: H,
		activeIndex: ge,
		selectedIndex: _e,
		disabledIndices: ua,
		onNavigate(e) {
			(e !== null || B) && ue.set("activeIndex", e);
		},
		focusItemOnHover: C
	}), Me = tg(Oe, {
		enabled: !I && (B || !f && !y),
		listRef: ee,
		activeIndex: ge,
		selectedIndex: _e,
		disabledIndices: (e) => Jw(H.current[e]),
		onMatch(e) {
			B ? ue.set("activeIndex", e) : Ee(re.current[e], Uc(Kc));
		},
		onTyping(e) {
			G.current = e;
		}
	}), Ne = OA.useMemo(() => hi(Me.reference, je.reference, Ae.reference, ke.reference, le), [
		ke.reference,
		Me.reference,
		je.reference,
		Ae.reference,
		le
	]), Pe = OA.useMemo(() => hi(Om, Me.floating, je.floating, Ae.floating), [
		Me.floating,
		je.floating,
		Ae.floating
	]), Fe = je.item ?? da, Ie = OA.useMemo(() => ({
		props: Fe,
		multiple: y,
		disabled: I,
		readOnly: f,
		isItemEqualToValue: S
	}), [
		Fe,
		y,
		I,
		f,
		S
	]);
	ue.useContextCallback("setValue", Ee), ue.useContextCallback("setOpen", Te), ue.useContextCallback("handleScrollArrowVisibility", De), ue.useContextCallback("onOpenChangeComplete", _), tA(() => {
		ue.update({
			popupProps: Pe,
			triggerProps: Ne,
			itemRoot: Ie
		});
	}), ue.useSyncedValues({
		id: F,
		modal: m,
		multiple: y,
		disabled: I,
		readOnly: f,
		required: p,
		highlightItemOnHover: C,
		value: R,
		open: B,
		mounted: pe,
		transitionStatus: me,
		popupProps: Pe,
		triggerProps: Ne,
		itemRoot: Ie,
		items: v,
		itemToStringLabel: b,
		itemToStringValue: x,
		isItemEqualToValue: S,
		openMethod: xe
	});
	let Le = Xi(g, N.inputRef), Re = y ? void 0 : L, ze = OA.useMemo(() => !y || !Array.isArray(R) || !L ? null : R.map((e) => {
		let t = rT(e, x);
		return /*#__PURE__*/ (0, kA.jsx)("input", {
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
	return /*#__PURE__*/ (0, kA.jsxs)(sA.Provider, {
		value: ue,
		children: [
			/*#__PURE__*/ (0, kA.jsx)(cA.Provider, {
				value: Oe,
				children: w
			}),
			/*#__PURE__*/ (0, kA.jsx)("input", {
				...N.getValidationProps(I, {
					onFocus() {
						ue.state.triggerElement?.focus({ focusVisible: !0 });
					},
					onChange(e) {
						if (e.nativeEvent.defaultPrevented || I || f) return;
						let t = e.currentTarget.value, n = Uc(Kc, e.nativeEvent);
						function r() {
							if (y) return;
							let e = t.toLowerCase(), r = re.current.findIndex((t) => rT(t, x).toLowerCase() === e || nT(t, b).toLowerCase() === e);
							r === -1 && (r = re.current.findIndex((t, n) => {
								let r = ee.current[n];
								return r != null && r.toLowerCase() === e;
							}));
							let i = re.current[r];
							i != null && Ee(i, n);
						}
						ue.set("forceMount", !0), queueMicrotask(r);
					}
				}),
				id: F && Re == null ? `${F}-hidden-input` : void 0,
				form: l,
				name: Re,
				autoComplete: u,
				value: Se,
				disabled: I,
				required: p && !(y && we),
				readOnly: f,
				ref: Le,
				style: L ? ld : cd,
				tabIndex: -1,
				"aria-hidden": !0,
				suppressHydrationWarning: !0
			}),
			ze
		]
	});
}
var OA, kA, AA = o((() => {
	OA = /* @__PURE__ */ u(b(), 1), ud(), na(), ii(), rA(), Ww(), Yw(), Px(), fi(), li(), ed(), ch(), fa(), S_(), lA(), fb(), Ib(), Ob(), fm(), CA(), Gc(), ml(), km(), gb(), cT(), xA(), Kv(), Xv(), EA(), Th(), Ai(), $y(), kA = bs();
}));
// node_modules/@base-ui/react/utils/resolveAriaLabelledBy.mjs
function jA(e, t) {
	return e ?? t;
}
var MA = o((() => {})), NA, PA = o((() => {
	Rc(), NA = "data-popup-side";
})), FA, IA, LA, RA, zA = o((() => {
	FA = /* @__PURE__ */ u(b(), 1), Hi(), Rl(), ed(), lA(), fb(), Pb(), bb(), Rc(), sb(), Oa(), Sw(), lh(), Ai(), Hc(), Gc(), ml(), Ob(), MA(), PA(), IA = 400, LA = {
		...Fc,
		...ob,
		popupSide: (e) => e ? { [NA]: e } : null,
		value: () => null
	}, RA = /*#__PURE__*/ FA.forwardRef(function(e, t) {
		let { render: n, className: r, id: i, disabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { setTouched: l, validationMode: u, validation: d, state: f, disabled: p } = cb(), { labelId: m } = _b(), h = iA(), g = h.useState("readOnly"), _ = h.useState("required"), v = h.useState("disabled"), y = p || v || a, b = h.useState("open"), x = h.useState("mounted"), S = h.useState("value"), C = h.useState("triggerProps"), w = h.useState("positionerElement"), T = h.useState("listElement"), E = h.useState("popupSide"), D = h.useState("id"), O = h.useState("labelId"), k = h.useState("hasSelectedValue"), A = x && w ? E : null, j = i ?? D, M = jA(m, O);
		Eb({ id: i });
		let N = Qu(w), P = FA.useRef(null), F = Nb(y, P), { getButtonProps: I, buttonRef: L } = Gi({
			disabled: y,
			native: o
		}), R = h.useStateSetter("triggerElement"), z = Fl(), B = Fl(), V = Fl();
		FA.useEffect(() => {
			if (b) return V.start(IA, () => {
				h.context.selectionRef.current.allowUnselectedMouseUp = !0, h.context.selectionRef.current.allowSelectedMouseUp = !0;
			}), () => {
				V.clear();
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
			V
		]);
		let H = hi(C, {
			id: j,
			role: "combobox",
			"aria-expanded": b,
			"aria-haspopup": "listbox",
			"aria-controls": b ? T?.id ?? Nu(w)?.id : void 0,
			"aria-labelledby": M,
			"aria-readonly": g || void 0,
			"aria-required": _ || void 0,
			tabIndex: y ? -1 : 0,
			onFocus(e) {
				F(!0), b && h.context.alignItemWithTriggerActiveRef.current && h.context.setOpen(!1, Uc(Kc, e.nativeEvent)), z.start(0, () => {
					h.set("forceMount", !0);
				});
			},
			onBlur(e) {
				Q(w, e.relatedTarget) || (l(!0), F(!1), u === "onBlur" && d.commit(S));
			},
			onMouseDown(e) {
				if (b) return;
				let t = Vi(e.currentTarget);
				function n(e) {
					if (!P.current) return;
					let t = e.target;
					Q(P.current, t) || Q(N.current, t) || yw(e, P.current) || h.context.setOpen(!1, Uc(al, e));
				}
				B.start(0, () => {
					t.addEventListener("mouseup", n, { once: !0 });
				});
			}
		}, c, I), ee = d.getValidationProps(y, H);
		ee.role = "combobox";
		let te = {
			...f,
			open: b,
			disabled: y,
			value: S,
			readOnly: g,
			popupSide: A,
			placeholder: !k
		};
		return ya("button", e, {
			ref: [
				t,
				P,
				L,
				R
			],
			state: te,
			stateAttributesMapping: LA,
			props: ee
		});
	});
})), BA, VA, HA, UA = o((() => {
	BA = /* @__PURE__ */ u(b(), 1), Oa(), lA(), cT(), VA = { value: () => null }, HA = /*#__PURE__*/ BA.forwardRef(function(e, t) {
		let { className: n, render: r, children: i, placeholder: a, style: o, ...s } = e, c = iA(), l = c.useState("value"), u = c.useState("items"), d = c.useState("itemToStringLabel"), f = c.useState("hasSelectedValue"), p = !f && a != null && i == null, m = c.useState("hasNullItemLabel", p), h = {
			value: l,
			placeholder: !f
		}, g = null;
		return g = typeof i == "function" ? i(l) : i ?? (p && !m ? a : Array.isArray(l) ? aT(l, u, d) : iT(l, u, d)), ya("span", e, {
			state: h,
			ref: [t, c.context.valueRef],
			props: [{ children: g }, s],
			stateAttributesMapping: VA
		});
	});
})), WA, GA, KA = o((() => {
	WA = /* @__PURE__ */ u(b(), 1), Oa(), lA(), Rc(), GA = /*#__PURE__*/ WA.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, ...a } = e;
		return ya("span", e, {
			state: { open: iA().useState("open") },
			ref: t,
			props: [{
				"aria-hidden": !0,
				children: "▼"
			}, a],
			stateAttributesMapping: Pc
		});
	});
})), qA, JA, YA, XA = o((() => {
	qA = /* @__PURE__ */ u(b(), 1), S_(), lA(), JA = bs(), YA = /*#__PURE__*/ qA.forwardRef(function(e, t) {
		let n = iA(), r = n.useState("mounted"), i = n.useState("forceMount");
		return r || i ? /*#__PURE__*/ (0, JA.jsx)(ip, {
			ref: t,
			...e
		}) : null;
	});
}));
// node_modules/@base-ui/react/select/positioner/SelectPositionerContext.mjs
function ZA() {
	let e = QA.useContext($A);
	if (!e) throw Error(Mi(59));
	return e;
}
var QA, $A, ej = o((() => {
	Ni(), QA = /* @__PURE__ */ u(b(), 1), $A = /*#__PURE__*/ QA.createContext(void 0);
}));
// node_modules/@base-ui/react/select/popup/utils.mjs
function tj(e, t) {
	e && Object.assign(e.style, t);
}
var nj, rj = o((() => {
	nj = {
		position: "relative",
		maxHeight: "100%",
		overflowX: "hidden",
		overflowY: "auto"
	};
})), ij, aj, oj, sj, cj = o((() => {
	ij = /* @__PURE__ */ u(b(), 1), Q_(), fi(), li(), lA(), IC(), EC(), ej(), nv(), Xf(), rj(), Gc(), ml(), xA(), VC(), GC(), aj = bs(), oj = { position: "fixed" }, sj = /*#__PURE__*/ ij.forwardRef(function(e, t) {
		let { anchor: n, className: r, render: i, positionMethod: a, side: o, align: s, sideOffset: c, alignOffset: l, collisionBoundary: u = "clipping-ancestors", collisionPadding: d, arrowPadding: f, sticky: p, disableAnchorTracking: m, alignItemWithTrigger: h = !0, collisionAvoidance: g = qf, style: _, ...v } = e, y = iA(), b = aA(), x = y.useState("open"), S = y.useState("mounted"), C = y.useState("modal"), w = y.useState("value"), T = y.useState("openMethod"), E = y.useState("positionerElement"), D = y.useState("triggerElement"), O = y.useState("isItemEqualToValue"), k = y.useState("transitionStatus"), A = ij.useRef(null), j = ij.useRef(null), [M, N] = ij.useState(h), P = S && M && T !== "touch";
		!S && M !== h && N(h), ij.useImperativeHandle(y.context.alignItemWithTriggerActiveRef, () => P), HC((P || C) && x, T === "touch", E, D);
		let F = bC({
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
		}), I = P ? "none" : F.side, L = P ? oj : F.positionerStyles, R = {
			open: x,
			side: I,
			align: F.align,
			anchorHidden: F.anchorHidden
		};
		J(() => {
			y.set("popupSide", F.side);
		}, [y, F.side]);
		let z = BC(e, R, {
			styles: L,
			transitionStatus: k,
			props: v,
			refs: [t, y.useStateSetter("positionerElement")],
			hidden: !S,
			inert: !x
		}), B = ij.useRef(0), V = q((e) => {
			if (y.context.valuesRef.current.length === 0) return;
			let t = B.current;
			B.current = e.size;
			let n = Uc(Kc);
			if (t !== 0 && !y.state.multiple && w !== null && hA(y.context.valuesRef.current, w, O) === -1) {
				let e = y.context.initialValueRef.current, t = e != null && hA(y.context.valuesRef.current, e, O) !== -1 ? e : null;
				y.context.setValue(t, n), t === null && (y.set("selectedIndex", null), y.context.selectedItemTextRef.current = null);
			}
			if (t !== 0 && y.state.multiple && Array.isArray(w)) {
				let e = w.filter((e) => hA(y.context.valuesRef.current, e, O) !== -1);
				e.length !== w.length && (y.context.setValue(e, n), e.length === 0 && (y.set("selectedIndex", null), y.context.selectedItemTextRef.current = null));
			}
			if (x && P) {
				y.update({
					scrollUpArrowVisible: !1,
					scrollDownArrowVisible: !1
				});
				let e = { height: "" };
				tj(E, e), tj(y.context.popupRef.current, e);
			}
		}), H = ij.useMemo(() => ({
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
		return /*#__PURE__*/ (0, aj.jsx)(DC, {
			elementsRef: y.context.listRef,
			labelsRef: y.context.labelsRef,
			onMapChange: V,
			children: /*#__PURE__*/ (0, aj.jsxs)($A.Provider, {
				value: H,
				children: [S && C && /*#__PURE__*/ (0, aj.jsx)(tv, {
					inert: Z_(!x),
					cutout: D
				}), z]
			})
		});
	});
})), lj, uj, dj, fj = o((() => {
	lj = bs(), uj = "base-ui-disable-scrollbar", dj = {
		className: uj,
		getElement(e) {
			return /*#__PURE__*/ (0, lj.jsx)("style", {
				nonce: e,
				href: uj,
				precedence: "base-ui:low",
				children: `.${uj}{scrollbar-width:none}.${uj}::-webkit-scrollbar{display:none}`
			});
		}
	};
}));
// node_modules/@base-ui/react/internals/csp-context/CSPContext.mjs
function pj() {
	return mj.useContext(hj) ?? gj;
}
var mj, hj, gj, _j = o((() => {
	mj = /* @__PURE__ */ u(b(), 1), hj = /*#__PURE__*/ mj.createContext(void 0), gj = { disableStyleElements: !1 };
})), vj, yj = o((() => {
	vj = "--transform-origin";
}));
// node_modules/@base-ui/react/select/popup/SelectPopup.mjs
function bj(e) {
	let t = e.maxHeight;
	return t.endsWith("px") && parseFloat(t) || Infinity;
}
function xj(e) {
	return wA(e.scrollHeight, e.clientHeight);
}
function Sj(e) {
	return $g.getScale(e);
}
function Cj(e, t, n) {
	return e / n[t];
}
function wj(e, t) {
	return jd({
		x: Cj(e.x, "x", t),
		y: Cj(e.y, "y", t),
		width: Cj(e.width, "x", t),
		height: Cj(e.height, "y", t)
	});
}
function Tj(e) {
	let { style: t } = e, n = {};
	for (let [e, r] of Aj) n[e] = t.getPropertyValue(e), t.setProperty(e, r, "important");
	return () => {
		for (let [e] of Aj) {
			let r = n[e];
			r ? t.setProperty(e, r) : t.removeProperty(e);
		}
	};
}
var Ej, Dj, Oj, kj, Aj, jj = o((() => {
	Ej = /* @__PURE__ */ u(b(), 1), Hd(), Yu(), au(), li(), Hi(), fi(), od(), bD(), S_(), lA(), Rc(), ej(), fj(), xc(), lm(), Oa(), rj(), Gc(), ml(), CS(), B_(), TS(), EA(), _j(), iC(), yj(), Dj = bs(), Oj = {
		...Ic,
		...bc
	}, kj = /*#__PURE__*/ Ej.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, finalFocus: a, ...o } = e, s = iA(), c = s.useState("multiple"), l = s.useState("readOnly"), u = s.useState("highlightItemOnHover"), d = aA(), { side: f, align: p, alignItemWithTriggerActive: m, isPositioned: h, setControlledAlignItemWithTrigger: g } = ZA(), _ = bS(!0) != null, v = tC(), { nonce: y, disableStyleElements: b } = pj(), x = s.useState("id"), S = s.useState("open"), C = s.useState("openMethod"), w = s.useState("mounted"), T = s.useState("popupProps"), E = s.useState("transitionStatus"), D = s.useState("triggerElement"), O = s.useState("positionerElement"), k = s.useState("listElement"), A = Ej.useRef(!1), j = Ej.useRef(!1), M = Ej.useRef({}), N = td(), P = q((e) => {
			if (!O || !s.context.popupRef.current || !j.current) return;
			let t = O.style.top === "0px", n = O.style.bottom === "0px";
			if (A.current || !m || !t && !n) {
				s.context.handleScrollArrowVisibility(e);
				return;
			}
			let r = Sj(O), i = Cj(O.getBoundingClientRect().height, "y", r), a = Vi(O), o = Or(O), c = o.getComputedStyle(O), l = parseFloat(c.marginTop), u = parseFloat(c.marginBottom), d = bj(o.getComputedStyle(s.context.popupRef.current)), f = Math.min(a.documentElement.clientHeight - l - u, d), p = e.scrollTop, h = xj(e), g = null, _ = (e) => {
				O.style.height = `${e}px`;
			}, v = t ? h - p : p, y = Math.min(i + v, f);
			if (v <= 1) {
				let n = yD(v, 0, f - i);
				n > 0 && _(i + n), e.scrollTop = t ? h : 0, f - (i + n) <= 1 && (A.current = !0), s.context.handleScrollArrowVisibility(e);
				return;
			}
			f - y > 1 ? g = t ? Infinity : 0 : n && p < h && (g = p - (v - (i + v - f)));
			let b = Math.ceil(y);
			if (b !== 0 && _(b), g != null) {
				let t = yD(g, 0, xj(e));
				Math.abs(e.scrollTop - t) > 1 && (e.scrollTop = t);
			}
			b >= f - 1 && (A.current = !0), s.context.handleScrollArrowVisibility(e);
		});
		Ej.useImperativeHandle(s.context.scrollHandlerRef, () => P, [P]), sm({
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
		J(() => {
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
		}, [s, O]), J(() => {
			S || m || (j.current = !1, A.current = !1, tj(O, M.current));
		}, [
			S,
			m,
			O
		]), J(() => {
			let e = s.context.popupRef.current;
			if (!S || !D || !O || !e || m && !h || s.state.transitionStatus === "ending") return;
			if (j.current = !0, e.style.removeProperty(vj), !m) {
				N.request(() => s.context.handleScrollArrowVisibility(k || e));
				return;
			}
			let t = Tj(e);
			try {
				let t = s.context.selectedItemTextRef.current;
				t?.isConnected || (t = !s.select("hasSelectedValue") && s.context.firstItemTextRef.current?.isConnected ? s.context.firstItemTextRef.current : null);
				let n = s.context.valueRef.current, r = Or(O), i = r.getComputedStyle(O), a = r.getComputedStyle(e), o = Vi(D), c = Sj(D), l = wj(D.getBoundingClientRect(), c), d = wj(O.getBoundingClientRect(), c), f = l.height, p = k || e, m = p.scrollHeight, h = parseFloat(a.borderBottomWidth), _ = parseFloat(i.marginTop) || 10, y = parseFloat(i.marginBottom) || 10, b = parseFloat(i.minHeight) || 100, x = bj(a), S = o.documentElement.clientHeight - _ - y, C = o.documentElement.clientWidth, w = S - l.bottom + f, T, E = v === "rtl" ? l.right - d.width : l.left, j = 0;
				if (t && n) {
					let e = wj(n.getBoundingClientRect(), c);
					T = wj(t.getBoundingClientRect(), c), E = d.left + (v === "rtl" ? e.right - T.right : e.left - T.left);
					let r = e.top - l.top + e.height / 2;
					j = T.top - d.top + T.height / 2 - r;
				}
				let N = w + j + y + h, P = Math.min(S, N), F = S - _ - y, I = N - P, L = C - 5;
				O.style.left = `${yD(E, 5, L - d.width)}px`, O.style.height = `${P}px`, O.style.maxHeight = "none", O.style.marginTop = `${_}px`, O.style.marginBottom = `${y}px`, e.style.height = "100%";
				let R = xj(p), z = I >= R - 1;
				z && (P = Math.min(S, d.height) - (I - R));
				let B = l.top < 20 || l.bottom > S - 20 || Math.ceil(P) + 1 < Math.min(m, b), V = (r.visualViewport?.scale ?? 1) !== 1 && Ql;
				if (B || V) {
					tj(O, M.current), g(!1);
					return;
				}
				let H = Math.max(b, P);
				if (z) {
					let e = Math.max(0, S - N);
					O.style.top = d.height >= F ? "0" : `${e}px`, O.style.height = `${P}px`, p.scrollTop = xj(p);
				} else O.style.bottom = "0", p.scrollTop = I;
				if (T) {
					let t = d.top, n = d.height, r = T.top + T.height / 2, i = yD(n > 0 ? (r - t) / n * 100 : 50, 0, 100);
					e.style.setProperty(vj, `50% ${i}%`);
				}
				(H === S || P >= x) && (A.current = !0), s.context.handleScrollArrowVisibility(p), u && s.state.selectedIndex === null && s.state.activeIndex === null && s.context.listRef.current[0] != null && s.set("activeIndex", 0);
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
		]), Ej.useEffect(() => {
			if (!m || !O || !S) return;
			let e = Or(O);
			function t(e) {
				s.context.setOpen(!1, Uc(fl, e));
			}
			return Ju(e, "resize", t);
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
				_ && L_.has(e.key) && e.stopPropagation();
			},
			onScroll(e) {
				k || P(e.currentTarget);
			},
			...m && { style: k ? { height: "100%" } : nj },
			className: !k && m ? dj.className : void 0
		}, L = ya("div", e, {
			ref: [t, s.context.popupRef],
			state: F,
			stateAttributesMapping: Oj,
			props: [
				T,
				I,
				wS(E),
				o
			]
		});
		return /*#__PURE__*/ (0, Dj.jsxs)(Ej.Fragment, { children: [!b && dj.getElement(y), /*#__PURE__*/ (0, Dj.jsx)(Op, {
			context: d,
			modal: !1,
			disabled: !w,
			openInteractionType: C,
			returnFocus: a,
			restoreFocus: !0,
			children: L
		})] });
	}), Aj = [
		["transform", "none"],
		["scale", "1"],
		["translate", "0 0"]
	];
})), Mj, Nj, Pj = o((() => {
	Mj = /* @__PURE__ */ u(b(), 1), lA(), ej(), Oa(), fj(), rj(), Nj = /*#__PURE__*/ Mj.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, ...a } = e, o = iA(), s = o.useState("multiple"), c = o.useState("readOnly"), { alignItemWithTriggerActive: l } = ZA(), u = o.useState("hasScrollArrows"), d = o.useState("openMethod"), f = {
			id: `${o.useState("id")}-list`,
			role: "listbox",
			"aria-multiselectable": s || void 0,
			"aria-readonly": c || void 0,
			onScroll(e) {
				o.context.scrollHandlerRef.current?.(e.currentTarget);
			},
			...l && { style: nj },
			className: u && d !== "touch" ? dj.className : void 0
		};
		return ya("div", e, {
			ref: [t, o.useStateSetter("listElement")],
			props: [f, a]
		});
	});
}));
// node_modules/@base-ui/react/select/item/SelectItemContext.mjs
function Fj() {
	let e = Ij.useContext(Lj);
	if (!e) throw Error(Mi(57));
	return e;
}
var Ij, Lj, Rj = o((() => {
	Ni(), Ij = /* @__PURE__ */ u(b(), 1), Lj = /*#__PURE__*/ Ij.createContext(void 0);
})), zj, Bj, Vj, Hj = o((() => {
	zj = /* @__PURE__ */ u(b(), 1), fi(), lA(), nS(), Oa(), Rj(), Hc(), Gc(), ml(), xA(), fu(), Bj = bs(), Vj = /*#__PURE__*/ zj.memo(/*#__PURE__*/ zj.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, value: a = null, label: o, disabled: s = !1, nativeButton: c = !1, ...l } = e, u = zj.useRef(null), d = eS({
			guess: !0,
			label: o,
			textRef: u
		}), f = iA(), { props: p, multiple: m, disabled: h, readOnly: g, isItemEqualToValue: _ } = f.useState("itemRoot"), v = h || s, y = f.useState("isActive", d.index), b = f.useState("open"), x = f.useState("isSelected", a), S = f.useState("isSelectedByFocus", d.index), C = d.index, w = zj.useRef(null);
		J(() => {
			let e = f.context.valuesRef.current;
			return e[C] = a, () => {
				delete e[C];
			};
		}, [
			C,
			a,
			f
		]), J(() => {
			let e = f.state.value, t = f.state.selectedIndex, n = t, r;
			m && Array.isArray(e) ? (n = vA(C, a, f.context.valuesRef.current, e, _, t), r = n === C, C === t && !r && (f.context.selectedItemTextRef.current = null)) : (r = e !== void 0 && fA(a, e, _), r && (n = C)), f.set("selectedIndex", n), r && u.current && (f.context.selectedItemTextRef.current = u.current);
		}, [
			C,
			m,
			_,
			f,
			a
		]);
		let T = zj.useRef("mouse"), E = zj.useRef(!1), { getButtonProps: D, buttonRef: O } = Gi({
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
				let n = Array.isArray(t) ? t : [], r = x ? yA(n, a, _) : [...n, a];
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
				let t = T.current !== "touch", n = e.nativeEvent.pointerType, r = t && cu(e.nativeEvent) && (n !== void 0 || y), i = t && !r && !E.current;
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
		}, N = ya("div", e, {
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
		}), P = zj.useMemo(() => ({
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
		return /*#__PURE__*/ (0, Bj.jsx)(Lj.Provider, {
			value: P,
			children: N
		});
	}));
})), Uj, Wj, Gj = o((() => {
	Uj = /* @__PURE__ */ u(b(), 1), $p(), lm(), Oa(), xc(), Wj = /*#__PURE__*/ Uj.memo(/*#__PURE__*/ Uj.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, keepMounted: a, selected: o, ...s } = e, c = Uj.useRef(null), { transitionStatus: l, setMounted: u } = Zp(o), d = ya("span", e, {
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
		return sm({
			batch: !0,
			enabled: !o,
			open: o,
			ref: c,
			onComplete() {
				o || u(!1);
			}
		}), d;
	}));
})), Kj, qj, Jj, Yj = o((() => {
	Kj = /* @__PURE__ */ u(b(), 1), Rj(), Gj(), qj = bs(), Jj = /*#__PURE__*/ Kj.forwardRef(function(e, t) {
		let { selected: n } = Fj();
		return e.keepMounted || n ? /*#__PURE__*/ (0, qj.jsx)(Wj, {
			...e,
			selected: n,
			ref: t
		}) : null;
	});
})), Xj, Zj, Qj = o((() => {
	Xj = /* @__PURE__ */ u(b(), 1), lA(), Rj(), Oa(), Zj = /*#__PURE__*/ Xj.memo(/*#__PURE__*/ Xj.forwardRef(function(e, t) {
		let { index: n, textRef: r, selectedByFocus: i } = Fj(), a = iA(), { render: o, className: s, style: c, ...l } = e;
		return ya("div", e, {
			ref: [
				Xj.useCallback((e) => {
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
function $j(e, t, n, r, i, a) {
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
		return o < t && s ? TA(s.offsetTop - i, a) : 0;
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
	return c > o && l ? TA(l.offsetTop + l.offsetHeight - r + i, a) : a;
}
var eM, tM, nM = o((() => {
	eM = /* @__PURE__ */ u(b(), 1), Rl(), fi(), lA(), ej(), $p(), lm(), Oa(), xc(), EA(), tM = /*#__PURE__*/ eM.forwardRef(function(e, t) {
		let { render: n, className: r, style: i, direction: a, keepMounted: o, ...s } = e, c = a === "up", l = iA(), { side: u, scrollDownArrowRef: d, scrollUpArrowRef: f } = ZA(), p = c ? "scrollUpArrowVisible" : "scrollDownArrowVisible", m = l.useState(p), h = l.useState("openMethod"), g = m && h !== "touch", _ = Fl(), v = c ? f : d, { mounted: y, transitionStatus: b, setMounted: x } = Zp(g);
		J(() => (l.context.scrollArrowsMountedCountRef.current += 1, l.set("hasScrollArrows", !0), () => {
			l.context.scrollArrowsMountedCountRef.current = Math.max(0, l.context.scrollArrowsMountedCountRef.current - 1), l.context.scrollArrowsMountedCountRef.current === 0 && l.set("hasScrollArrows", !1);
		}), [l]), sm({
			open: g,
			ref: v,
			onComplete() {
				g || x(!1);
			}
		});
		let S = ya("div", e, {
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
						let n = wA(e.scrollHeight, e.clientHeight), r = TA(e.scrollTop, n), i = r === (c ? 0 : n), a = l.context.listRef.current;
						if (r !== e.scrollTop && (e.scrollTop = r), i) _.clear();
						else {
							if (a.length > 0) {
								let t = v.current?.offsetHeight || 0;
								e.scrollTop = $j(a, c, r, e.clientHeight, t, n);
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
})), rM, iM, aM, oM = o((() => {
	rM = /* @__PURE__ */ u(b(), 1), nM(), iM = bs(), aM = /*#__PURE__*/ rM.forwardRef(function(e, t) {
		return /*#__PURE__*/ (0, iM.jsx)(tM, {
			...e,
			ref: t,
			direction: "down"
		});
	});
})), sM, cM, lM, uM = o((() => {
	sM = /* @__PURE__ */ u(b(), 1), nM(), cM = bs(), lM = /*#__PURE__*/ sM.forwardRef(function(e, t) {
		return /*#__PURE__*/ (0, cM.jsx)(tM, {
			...e,
			ref: t,
			direction: "up"
		});
	});
})), dM = o((() => {
	AA(), Oa(), fb(), sb(), Zr(), Hi(), li(), lh(), fi(), Ol(), bb(), lA(), zA(), UA(), KA(), XA(), Rc(), xc(), cj(), jj(), Pj(), Hj(), Yj(), Qj(), ej(), oM(), uM(), Ni();
})), fM = o((() => {
	dM(), PA(), Rc(), yj(), xc();
}));
// src/components/ui/select.tsx
function pM({ className: e, ...t }) {
	return /* @__PURE__ */ (0, yM.jsx)(HA, {
		"data-slot": "select-value",
		className: _s("flex flex-1 text-left", e),
		...t
	});
}
function mM({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, yM.jsxs)(RA, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: _s("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...r,
		children: [n, /* @__PURE__ */ (0, yM.jsx)(GA, { render: /* @__PURE__ */ (0, yM.jsx)(Te, { className: "pointer-events-none size-4 text-muted-foreground" }) })]
	});
}
function hM({ className: e, children: t, side: n = "bottom", sideOffset: r = 4, align: i = "center", alignOffset: a = 0, alignItemWithTrigger: o = !0, ...s }) {
	let c = ny();
	return /* @__PURE__ */ (0, yM.jsx)(YA, {
		container: c ?? void 0,
		children: /* @__PURE__ */ (0, yM.jsx)(sj, {
			side: n,
			sideOffset: r,
			align: i,
			alignOffset: a,
			alignItemWithTrigger: o,
			className: "isolate z-50",
			children: /* @__PURE__ */ (0, yM.jsxs)(kj, {
				"data-slot": "select-content",
				"data-align-trigger": o,
				className: _s("relative isolate z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-36 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...s,
				children: [
					/* @__PURE__ */ (0, yM.jsx)(_M, {}),
					/* @__PURE__ */ (0, yM.jsx)(Nj, { children: t }),
					/* @__PURE__ */ (0, yM.jsx)(vM, {})
				]
			})
		})
	});
}
function gM({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, yM.jsxs)(Vj, {
		"data-slot": "select-item",
		className: _s("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, yM.jsx)(Zj, {
			className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
			children: t
		}), /* @__PURE__ */ (0, yM.jsx)(Jj, {
			render: /* @__PURE__ */ (0, yM.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ (0, yM.jsx)(Se, { className: "pointer-events-none" })
		})]
	});
}
function _M({ className: e, ...t }) {
	return /* @__PURE__ */ (0, yM.jsx)(lM, {
		"data-slot": "select-scroll-up-button",
		className: _s("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, yM.jsx)(Oe, {})
	});
}
function vM({ className: e, ...t }) {
	return /* @__PURE__ */ (0, yM.jsx)(aM, {
		"data-slot": "select-scroll-down-button",
		className: _s("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, yM.jsx)(Te, {})
	});
}
var yM, bM, xM = o((() => {
	b(), fM(), vs(), oy(), Tr(), yM = bs(), bM = DA;
}));
// src/features/messages/messages-settings.tsx
function SM() {
	let { inbox: e } = Oy(), [t, n] = (0, CM.useState)(!1), [r, i] = (0, CM.useState)("");
	if (!e) return /* @__PURE__ */ (0, wM.jsx)("p", {
		className: "p-5 text-sm text-muted-foreground",
		children: "Carregando configurações…"
	});
	let a = e.settings;
	async function o(e) {
		n(!0), i("");
		try {
			e.sound && await wy(), await Gy.settings(e);
		} catch (e) {
			i(e instanceof Error ? e.message : "Não foi possível salvar.");
		} finally {
			n(!1);
		}
	}
	return /* @__PURE__ */ (0, wM.jsxs)("section", {
		className: "mx-auto w-full max-w-lg space-y-5 overflow-y-auto p-5",
		children: [
			/* @__PURE__ */ (0, wM.jsxs)("div", { children: [/* @__PURE__ */ (0, wM.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Configurações de mensagens"
			}), /* @__PURE__ */ (0, wM.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Preferências da sua conta em todos os serviços."
			})] }),
			/* @__PURE__ */ (0, wM.jsxs)("div", {
				className: "space-y-4 rounded-lg border border-border p-4",
				children: [/* @__PURE__ */ (0, wM.jsxs)("h3", {
					className: "flex items-center gap-2 text-sm font-medium",
					children: [/* @__PURE__ */ (0, wM.jsx)(qn, { className: "size-4" }), "Solicitações"]
				}), /* @__PURE__ */ (0, wM.jsxs)("label", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, wM.jsx)(Qk, {
						checked: a.autoAccept,
						disabled: t,
						onCheckedChange: (e) => void o({ autoAccept: !!e })
					}), /* @__PURE__ */ (0, wM.jsxs)("span", {
						className: "text-sm",
						children: ["Aceitar DMs automaticamente", /* @__PURE__ */ (0, wM.jsx)("span", {
							className: "mt-1 block text-xs text-muted-foreground",
							children: "Novas solicitações serão aceitas sem confirmação."
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, wM.jsxs)("div", {
				className: "space-y-4 rounded-lg border border-border p-4",
				children: [
					/* @__PURE__ */ (0, wM.jsxs)("h3", {
						className: "flex items-center gap-2 text-sm font-medium",
						children: [/* @__PURE__ */ (0, wM.jsx)(pe, { className: "size-4" }), "Notificações"]
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
					].map((e) => /* @__PURE__ */ (0, wM.jsxs)("label", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, wM.jsx)(Qk, {
							checked: a[e.key],
							disabled: t,
							onCheckedChange: (t) => void o({ [e.key]: !!t })
						}), /* @__PURE__ */ (0, wM.jsxs)("span", {
							className: "text-sm",
							children: [e.label, /* @__PURE__ */ (0, wM.jsx)("span", {
								className: "mt-1 block text-xs text-muted-foreground",
								children: e.detail
							})]
						})]
					}, e.key)),
					typeof Notification < "u" && /* @__PURE__ */ (0, wM.jsxs)("div", {
						className: "border-t border-border pt-3",
						children: [/* @__PURE__ */ (0, wM.jsx)("p", {
							className: "mb-2 text-xs text-muted-foreground",
							children: "Avisos do navegador enquanto uma aba OrganizeOn estiver aberta."
						}), /* @__PURE__ */ (0, wM.jsx)(Y, {
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
			/* @__PURE__ */ (0, wM.jsx)("div", {
				className: "space-y-2 rounded-lg border border-border p-4",
				children: /* @__PURE__ */ (0, wM.jsxs)("label", {
					className: "text-sm font-medium",
					children: ["Reação com toque duplo", /* @__PURE__ */ (0, wM.jsxs)(bM, {
						value: a.quickReaction,
						disabled: t,
						onValueChange: (e) => {
							e && o({ quickReaction: e });
						},
						children: [/* @__PURE__ */ (0, wM.jsx)(mM, {
							className: "mt-2 w-full",
							children: /* @__PURE__ */ (0, wM.jsx)(pM, { children: a.quickReaction })
						}), /* @__PURE__ */ (0, wM.jsx)(hM, { children: _k.map((e) => /* @__PURE__ */ (0, wM.jsx)(gM, {
							value: e,
							children: e
						}, e)) })]
					})]
				})
			}),
			r && /* @__PURE__ */ (0, wM.jsx)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: r
			})
		]
	});
}
var CM, wM, TM = o((() => {
	CM = /* @__PURE__ */ u(b(), 1), Tr(), eA(), Cs(), xM(), Ky(), vk(), wM = bs();
}));
// src/features/messages/requests-list.tsx
function EM({ onProfile: e }) {
	let { inbox: t } = Oy(), [n, r] = (0, DM.useState)(null), [i, a] = (0, DM.useState)(""), o = t?.requests || [];
	async function s(e, t) {
		r(e), a("");
		try {
			await Gy.respond(e, t);
		} catch (e) {
			a(e instanceof Error ? e.message : "Não foi possível responder.");
		} finally {
			r(null);
		}
	}
	return /* @__PURE__ */ (0, OM.jsxs)("section", {
		className: "mx-auto w-full max-w-2xl overflow-y-auto p-5",
		children: [
			/* @__PURE__ */ (0, OM.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Solicitações de DM"
			}),
			/* @__PURE__ */ (0, OM.jsx)("p", {
				className: "mb-5 mt-1 text-sm text-muted-foreground",
				children: "Escolha quem pode conversar com você."
			}),
			o.length ? /* @__PURE__ */ (0, OM.jsx)("div", {
				className: "divide-y divide-border rounded-lg border border-border",
				children: o.map((t) => /* @__PURE__ */ (0, OM.jsxs)("div", {
					className: "flex min-w-0 flex-wrap items-center gap-3 p-4",
					children: [
						/* @__PURE__ */ (0, OM.jsx)("button", {
							type: "button",
							"aria-label": `Abrir perfil de ${t.peer.profile.displayName}`,
							onClick: () => e(t.peer),
							children: /* @__PURE__ */ (0, OM.jsx)(Jy, {
								profile: t.peer.profile,
								className: "size-10"
							})
						}),
						/* @__PURE__ */ (0, OM.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, OM.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: t.peer.profile.displayName
								}),
								/* @__PURE__ */ (0, OM.jsxs)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: ["@", t.peer.username]
								}),
								/* @__PURE__ */ (0, OM.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: t.direction === "incoming" ? "Quer iniciar uma conversa." : "Aguardando resposta."
								})
							]
						}),
						/* @__PURE__ */ (0, OM.jsx)("div", {
							className: "flex gap-2",
							children: t.direction === "incoming" ? /* @__PURE__ */ (0, OM.jsxs)(OM.Fragment, { children: [/* @__PURE__ */ (0, OM.jsx)(Y, {
								type: "button",
								disabled: n === t.id,
								onClick: () => void s(t.id, "accept"),
								children: "Aceitar"
							}), /* @__PURE__ */ (0, OM.jsx)(Y, {
								type: "button",
								variant: "outline",
								disabled: n === t.id,
								onClick: () => void s(t.id, "decline"),
								children: "Recusar"
							})] }) : /* @__PURE__ */ (0, OM.jsx)(Y, {
								type: "button",
								variant: "outline",
								disabled: n === t.id,
								onClick: () => void s(t.id, "cancel"),
								children: "Cancelar solicitação"
							})
						})
					]
				}, t.id))
			}) : /* @__PURE__ */ (0, OM.jsxs)("div", {
				className: "grid justify-items-center gap-3 rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground",
				children: [/* @__PURE__ */ (0, OM.jsx)(Tt, { className: "size-7" }), /* @__PURE__ */ (0, OM.jsx)("p", {
					className: "text-sm",
					children: "Nenhuma solicitação pendente."
				})]
			}),
			i && /* @__PURE__ */ (0, OM.jsx)("p", {
				role: "alert",
				className: "mt-3 text-sm text-destructive",
				children: i
			})
		]
	});
}
var DM, OM, kM = o((() => {
	DM = /* @__PURE__ */ u(b(), 1), Tr(), Cs(), Xy(), Ky(), OM = bs();
}));
// src/features/messages/new-conversation.tsx
function AM() {
	let [e, t] = (0, jM.useState)(""), [n, r] = (0, jM.useState)(!1), [i, a] = (0, jM.useState)("");
	return /* @__PURE__ */ (0, MM.jsxs)("section", {
		className: "mx-auto w-full max-w-md p-5",
		children: [
			/* @__PURE__ */ (0, MM.jsx)(Yt, { className: "mb-4 size-8 text-muted-foreground" }),
			/* @__PURE__ */ (0, MM.jsx)("h2", {
				className: "text-xl font-semibold",
				children: "Nova mensagem direta"
			}),
			/* @__PURE__ */ (0, MM.jsx)("p", {
				className: "mb-5 mt-2 text-sm text-muted-foreground",
				children: "Adicione uma conta pelo nome de usuário OrganizeOn."
			}),
			/* @__PURE__ */ (0, MM.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: async (t) => {
					t.preventDefault(), r(!0), a("");
					try {
						await Gy.request(e.trim().replace(/^@/, ""));
					} catch (e) {
						a(e instanceof Error ? e.message : "Não foi possível enviar a solicitação.");
					} finally {
						r(!1);
					}
				},
				children: [
					/* @__PURE__ */ (0, MM.jsxs)("label", {
						className: "grid gap-1.5 text-sm",
						children: ["Nome de usuário", /* @__PURE__ */ (0, MM.jsx)(qb, {
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
					i && /* @__PURE__ */ (0, MM.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: i
					}),
					/* @__PURE__ */ (0, MM.jsx)(Y, {
						type: "submit",
						disabled: n || e.replace(/^@/, "").trim().length < 3,
						children: n ? "Enviando…" : "Enviar solicitação"
					})
				]
			})
		]
	});
}
var jM, MM, NM = o((() => {
	jM = /* @__PURE__ */ u(b(), 1), Tr(), Cs(), Yb(), Ky(), MM = bs();
}));
// src/components/admin/password-dialog.tsx
function PM({ request: e, onClose: t }) {
	let [n, r] = (0, FM.useState)(!1), [i, a] = (0, FM.useState)("");
	return /* @__PURE__ */ (0, IM.jsx)(sy, {
		open: !0,
		onOpenChange: (e) => {
			!e && !n && t(!1);
		},
		children: /* @__PURE__ */ (0, IM.jsxs)(uy, {
			className: "sm:max-w-md",
			onKeyDown: (e) => {
				n && e.key === "Escape" && e.preventDefault();
			},
			children: [/* @__PURE__ */ (0, IM.jsxs)(dy, { children: [/* @__PURE__ */ (0, IM.jsx)(py, { children: "Alterar senha" }), /* @__PURE__ */ (0, IM.jsx)(my, { children: e.self ? "Atualize sua senha. Será necessário entrar novamente." : `Defina uma nova senha para ${e.username}.` })] }), /* @__PURE__ */ (0, IM.jsxs)("form", {
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
					/* @__PURE__ */ (0, IM.jsx)("input", {
						hidden: !0,
						readOnly: !0,
						autoComplete: "username",
						value: e.username
					}),
					e.self && /* @__PURE__ */ (0, IM.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Senha atual", /* @__PURE__ */ (0, IM.jsx)(qb, {
							name: "currentPassword",
							type: "password",
							autoComplete: "current-password",
							required: !0,
							disabled: n
						})]
					}),
					/* @__PURE__ */ (0, IM.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Nova senha", /* @__PURE__ */ (0, IM.jsx)(qb, {
							name: "newPassword",
							type: "password",
							minLength: 8,
							autoComplete: "new-password",
							required: !0,
							disabled: n
						})]
					}),
					/* @__PURE__ */ (0, IM.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Confirmar nova senha", /* @__PURE__ */ (0, IM.jsx)(qb, {
							name: "confirmPassword",
							type: "password",
							minLength: 8,
							autoComplete: "new-password",
							required: !0,
							disabled: n
						})]
					}),
					i && /* @__PURE__ */ (0, IM.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: i
					}),
					/* @__PURE__ */ (0, IM.jsxs)(fy, { children: [/* @__PURE__ */ (0, IM.jsx)(Y, {
						type: "button",
						variant: "outline",
						disabled: n,
						onClick: () => t(!1),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, IM.jsx)(Y, {
						type: "submit",
						disabled: n,
						children: n ? "Salvando…" : "Salvar senha"
					})] })
				]
			})]
		})
	});
}
var FM, IM, LM = o((() => {
	FM = /* @__PURE__ */ u(b(), 1), Cs(), Yb(), gy(), IM = bs();
}));
// src/features/profile/profile-card.tsx
function RM({ username: e, role: t, profile: n, onEdit: r }) {
	let i = (e, t) => r && /* @__PURE__ */ (0, zM.jsx)(Y, {
		type: "button",
		size: "icon-sm",
		variant: "ghost",
		"aria-label": t,
		onClick: () => r(e),
		children: /* @__PURE__ */ (0, zM.jsx)(mn, { className: "size-3.5" })
	});
	return /* @__PURE__ */ (0, zM.jsxs)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-card",
		children: [/* @__PURE__ */ (0, zM.jsx)("div", {
			className: "h-20 border-b border-border bg-muted",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, zM.jsxs)("div", {
			className: "px-5 pb-5 sm:px-6 sm:pb-6",
			children: [
				/* @__PURE__ */ (0, zM.jsxs)("div", {
					className: "-mt-10 mb-4 flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, zM.jsx)("div", {
						className: "rounded-2xl bg-card p-1",
						children: /* @__PURE__ */ (0, zM.jsx)(Jy, {
							profile: n,
							className: "size-20"
						})
					}), i("photo", "Editar foto de perfil")]
				}),
				/* @__PURE__ */ (0, zM.jsxs)("div", {
					className: "flex min-w-0 items-start gap-2",
					children: [/* @__PURE__ */ (0, zM.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, zM.jsx)("h2", {
							className: "break-words text-xl font-semibold leading-tight tracking-tight",
							style: { color: n.nameColor.toUpperCase() === "#FAFAFA" ? void 0 : n.nameColor },
							children: n.displayName
						}), /* @__PURE__ */ (0, zM.jsxs)("p", {
							className: "mt-1 break-all text-sm text-muted-foreground",
							children: ["@", e]
						})]
					}), i("identity", "Editar nome e cor")]
				}),
				/* @__PURE__ */ (0, zM.jsx)($b, {
					variant: "secondary",
					className: "mt-3",
					children: t
				}),
				/* @__PURE__ */ (0, zM.jsxs)("section", {
					className: "mt-5 border-t border-border pt-4",
					"aria-label": "Descrição do perfil",
					children: [/* @__PURE__ */ (0, zM.jsxs)("div", {
						className: "mb-2 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, zM.jsx)("h3", {
							className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
							children: "Sobre"
						}), i("bio", "Editar descrição")]
					}), /* @__PURE__ */ (0, zM.jsx)("p", {
						className: "whitespace-pre-wrap break-words text-sm leading-relaxed",
						children: n.bio || /* @__PURE__ */ (0, zM.jsx)("span", {
							className: "text-muted-foreground",
							children: "Nenhuma descrição adicionada."
						})
					})]
				})
			]
		})]
	});
}
var zM, BM = o((() => {
	Tr(), Cs(), tx(), Xy(), zM = bs();
}));
// src/features/profile/avatar-editor.tsx
function VM({ file: e, shape: t, onSave: n, onCancel: r }) {
	let i = (0, HM.useRef)(null), [a, o] = (0, HM.useState)(null), [s, c] = (0, HM.useState)(1), [l, u] = (0, HM.useState)({
		x: 0,
		y: 0
	}), [d, f] = (0, HM.useState)(""), p = (0, HM.useRef)(null);
	return (0, HM.useEffect)(() => {
		let t = URL.createObjectURL(e), n = new Image();
		return n.onload = () => {
			n.naturalWidth * n.naturalHeight > 24e6 ? f("Escolha uma imagem de até 24 megapixels.") : o(n);
		}, n.onerror = () => f("Não foi possível abrir esta imagem."), n.src = t, () => URL.revokeObjectURL(t);
	}, [e]), (0, HM.useEffect)(() => {
		if (!a || !i.current) return;
		let e = i.current.getContext("2d");
		if (!e) return;
		let t = Math.min(a.naturalWidth, a.naturalHeight) / s, n = (a.naturalWidth - t) * (1 + l.x) / 2, r = (a.naturalHeight - t) * (1 + l.y) / 2;
		e.fillStyle = "#111113", e.fillRect(0, 0, 256, 256), e.drawImage(a, n, r, t, t, 0, 0, 256, 256);
	}, [
		a,
		s,
		l
	]), /* @__PURE__ */ (0, UM.jsxs)("div", {
		className: "grid gap-3 rounded-lg border p-4",
		children: [
			/* @__PURE__ */ (0, UM.jsx)("p", {
				className: "text-sm font-medium",
				children: "Recortar foto"
			}),
			/* @__PURE__ */ (0, UM.jsx)("canvas", {
				ref: i,
				width: 256,
				height: 256,
				"aria-label": "Prévia do recorte",
				className: "mx-auto aspect-square w-full max-w-56 touch-none bg-muted",
				style: { borderRadius: qy(t) },
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
			d && /* @__PURE__ */ (0, UM.jsx)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: d
			}),
			/* @__PURE__ */ (0, UM.jsxs)("label", {
				className: "grid gap-1 text-xs",
				children: ["Zoom", /* @__PURE__ */ (0, UM.jsx)("input", {
					"aria-label": "Zoom do recorte",
					type: "range",
					min: 1,
					max: 3,
					step: .01,
					value: s,
					onChange: (e) => c(Number(e.target.value))
				})]
			}),
			/* @__PURE__ */ (0, UM.jsx)("div", {
				className: "grid grid-cols-2 gap-3",
				children: ["x", "y"].map((e) => /* @__PURE__ */ (0, UM.jsxs)("label", {
					className: "grid gap-1 text-xs",
					children: [e === "x" ? "Horizontal" : "Vertical", /* @__PURE__ */ (0, UM.jsx)("input", {
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
			/* @__PURE__ */ (0, UM.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, UM.jsx)(Y, {
					type: "button",
					variant: "outline",
					onClick: r,
					children: "Cancelar recorte"
				}), /* @__PURE__ */ (0, UM.jsx)(Y, {
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
var HM, UM, WM = o((() => {
	HM = /* @__PURE__ */ u(b(), 1), Cs(), Xy(), UM = bs();
}));
// src/features/profile/profile-field-editor.tsx
function GM({ field: e, profile: t, onSave: n, onCancel: r }) {
	let [i, a] = (0, KM.useState)(t), [o, s] = (0, KM.useState)(null), [c, l] = (0, KM.useState)(!1), [u, d] = (0, KM.useState)(""), f = (0, KM.useRef)(null);
	return /* @__PURE__ */ (0, qM.jsxs)("form", {
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
			e === "identity" && /* @__PURE__ */ (0, qM.jsxs)(qM.Fragment, { children: [/* @__PURE__ */ (0, qM.jsxs)("label", {
				className: "grid gap-1.5 text-sm",
				children: ["Nome de exibição", /* @__PURE__ */ (0, qM.jsx)(qb, {
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
			}), /* @__PURE__ */ (0, qM.jsxs)("label", {
				className: "grid gap-1.5 text-sm",
				children: ["Cor do nome", /* @__PURE__ */ (0, qM.jsxs)("span", {
					className: "flex items-center gap-3 rounded-md border border-input p-2",
					children: [/* @__PURE__ */ (0, qM.jsx)("input", {
						type: "color",
						"aria-label": "Cor do nome",
						value: i.nameColor,
						disabled: c,
						onChange: (e) => a({
							...i,
							nameColor: e.target.value
						}),
						className: "h-8 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
					}), /* @__PURE__ */ (0, qM.jsx)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: i.nameColor.toUpperCase()
					})]
				})]
			})] }),
			e === "bio" && /* @__PURE__ */ (0, qM.jsxs)("label", {
				className: "grid gap-1.5 text-sm",
				children: [
					"Descrição",
					/* @__PURE__ */ (0, qM.jsx)("textarea", {
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
					/* @__PURE__ */ (0, qM.jsxs)("span", {
						className: "text-right text-xs text-muted-foreground",
						children: [i.bio.length, "/280"]
					})
				]
			}),
			e === "photo" && /* @__PURE__ */ (0, qM.jsxs)(qM.Fragment, { children: [
				/* @__PURE__ */ (0, qM.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, qM.jsx)(Jy, {
						profile: i,
						className: "size-16"
					}), /* @__PURE__ */ (0, qM.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, qM.jsx)("input", {
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
							/* @__PURE__ */ (0, qM.jsxs)(Y, {
								type: "button",
								variant: "outline",
								disabled: c,
								onClick: () => f.current?.click(),
								children: [/* @__PURE__ */ (0, qM.jsx)(St, { className: "size-4" }), "Escolher foto"]
							}),
							i.avatar && /* @__PURE__ */ (0, qM.jsx)(Y, {
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
				o && /* @__PURE__ */ (0, qM.jsx)(VM, {
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
				/* @__PURE__ */ (0, qM.jsxs)("label", {
					className: "grid gap-1.5 text-sm",
					children: ["Formato da foto", /* @__PURE__ */ (0, qM.jsxs)(bM, {
						value: i.avatarShape,
						disabled: c,
						onValueChange: (e) => {
							e && a({
								...i,
								avatarShape: e
							});
						},
						children: [/* @__PURE__ */ (0, qM.jsx)(mM, {
							className: "w-full",
							children: /* @__PURE__ */ (0, qM.jsx)(pM, { children: JM[i.avatarShape] })
						}), /* @__PURE__ */ (0, qM.jsx)(hM, { children: Object.entries(JM).map(([e, t]) => /* @__PURE__ */ (0, qM.jsx)(gM, {
							value: e,
							children: t
						}, e)) })]
					})]
				})
			] }),
			u && /* @__PURE__ */ (0, qM.jsx)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: u
			}),
			/* @__PURE__ */ (0, qM.jsxs)("div", {
				className: "flex justify-end gap-2 border-t border-border pt-4",
				children: [/* @__PURE__ */ (0, qM.jsx)(Y, {
					type: "button",
					variant: "outline",
					disabled: c,
					onClick: r,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, qM.jsx)(Y, {
					type: "submit",
					disabled: c || !!o,
					children: c ? "Salvando…" : "Salvar alterações"
				})]
			})
		]
	});
}
var KM, qM, JM, YM = o((() => {
	KM = /* @__PURE__ */ u(b(), 1), Tr(), Cs(), Yb(), xM(), Xy(), WM(), qM = bs(), JM = {
		circle: "Círculo",
		square: "Quadrado",
		rounded: "Cantos arredondados"
	};
})), XM = /* @__PURE__ */ c({ default: () => ZM });
function ZM({ username: e, role: t, profile: n, onClose: r, editable: i = !0 }) {
	let [a, o] = (0, QM.useState)(null), [s, c] = (0, QM.useState)(!1), [l, u] = (0, QM.useState)(!1);
	return /* @__PURE__ */ (0, $M.jsxs)($M.Fragment, { children: [/* @__PURE__ */ (0, $M.jsx)(sy, {
		open: !0,
		onOpenChange: (e) => {
			!e && !l && r();
		},
		children: /* @__PURE__ */ (0, $M.jsxs)(uy, {
			className: "max-h-[90svh] overflow-y-auto sm:max-w-md",
			children: [/* @__PURE__ */ (0, $M.jsxs)(dy, { children: [/* @__PURE__ */ (0, $M.jsxs)("div", {
				className: "flex items-center gap-2 pr-6",
				children: [a && /* @__PURE__ */ (0, $M.jsx)(Y, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "Voltar ao perfil",
					disabled: l,
					onClick: () => o(null),
					children: /* @__PURE__ */ (0, $M.jsx)(se, { className: "size-4" })
				}), /* @__PURE__ */ (0, $M.jsx)(py, { children: a ? eN[a] : i ? "Meu perfil" : "Perfil" })]
			}), /* @__PURE__ */ (0, $M.jsx)(my, {
				className: "sr-only",
				children: a ? "Edite o campo selecionado do perfil." : `Perfil de ${n.displayName}, ${t}.`
			})] }), a && i ? /* @__PURE__ */ (0, $M.jsx)(GM, {
				field: a,
				profile: n,
				onCancel: () => o(null),
				onSave: async (t) => {
					u(!0);
					try {
						lx(e, await ix.save(t)), o(null);
					} finally {
						u(!1);
					}
				}
			}, a) : /* @__PURE__ */ (0, $M.jsxs)($M.Fragment, { children: [/* @__PURE__ */ (0, $M.jsx)(RM, {
				username: e,
				role: t,
				profile: n,
				onEdit: i ? o : void 0
			}), i && /* @__PURE__ */ (0, $M.jsx)("section", {
				className: "border-t border-border pt-4",
				"aria-label": "Segurança da conta",
				children: /* @__PURE__ */ (0, $M.jsxs)(Y, {
					type: "button",
					variant: "ghost",
					onClick: () => c(!0),
					className: "w-full justify-start",
					children: [/* @__PURE__ */ (0, $M.jsx)(Pt, { className: "size-4" }), "Alterar senha"]
				})
			})] })]
		})
	}), s && i && /* @__PURE__ */ (0, $M.jsx)(PM, {
		request: {
			username: e,
			self: !0,
			submit: ix.password
		},
		onClose: (e) => {
			c(!1), e && (r(), nx());
		}
	})] });
}
var QM, $M, eN, tN = o((() => {
	QM = /* @__PURE__ */ u(b(), 1), Tr(), Cs(), gy(), LM(), ax(), mx(), BM(), YM(), $M = bs(), eN = {
		identity: "Editar nome",
		bio: "Editar descrição",
		photo: "Editar foto"
	};
})), nN = /* @__PURE__ */ c({ default: () => oN });
function rN() {
	let e = () => ({
		width: window.visualViewport?.width || innerWidth,
		height: window.visualViewport?.height || innerHeight,
		top: window.visualViewport?.offsetTop || 0
	}), [t, n] = (0, sN.useState)(e);
	return (0, sN.useEffect)(() => {
		let t = () => n(e());
		return visualViewport?.addEventListener("resize", t), visualViewport?.addEventListener("scroll", t), window.addEventListener("resize", t), () => {
			visualViewport?.removeEventListener("resize", t), visualViewport?.removeEventListener("scroll", t), window.removeEventListener("resize", t);
		};
	}, []), t;
}
function iN({ children: e }) {
	let [t, n] = (0, sN.useState)(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	return (0, sN.useEffect)(() => {
		let e = requestAnimationFrame(() => n(!0));
		return () => cancelAnimationFrame(e);
	}, []), /* @__PURE__ */ (0, cN.jsx)("div", {
		className: `h-full min-h-0 min-w-0 transition-[opacity,transform] duration-150 motion-reduce:transition-none ${t ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`,
		children: e
	});
}
function aN({ person: e, own: t, onClose: n }) {
	let r = ux(e.username, t);
	return /* @__PURE__ */ (0, cN.jsx)(sN.Suspense, {
		fallback: /* @__PURE__ */ (0, cN.jsx)("p", {
			role: "status",
			children: "Carregando perfil…"
		}),
		children: /* @__PURE__ */ (0, cN.jsx)(lN, {
			username: e.username,
			role: hx[e.role] || e.role,
			profile: t ? r : e.profile,
			editable: t,
			onClose: n
		})
	});
}
function oN() {
	let e = Oy(), t = rN(), [n, r] = (0, sN.useState)(""), [i, a] = (0, sN.useState)(null), o = (0, sN.useRef)(null), s = e.inbox?.conversations.find((t) => t.id === e.selectedId), c = !s && e.view === "inbox", l = (e.inbox?.conversations || []).filter((e) => !e.archived && [e.peer.username, e.peer.profile.displayName].some((e) => e.toLowerCase().includes(n.toLowerCase()))), u = e.inbox?.requests.filter((e) => e.direction === "incoming").length || 0;
	return /* @__PURE__ */ (0, cN.jsxs)(cN.Fragment, { children: [/* @__PURE__ */ (0, cN.jsx)(sy, {
		open: !0,
		onOpenChange: (e) => {
			e || Gy.close();
		},
		children: /* @__PURE__ */ (0, cN.jsxs)(uy, {
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
				o.current = null, t && e.clientX - t.x > 84 && Math.abs(e.clientY - t.y) < 40 && Gy.back();
			},
			onPointerCancel: () => {
				o.current = null;
			},
			children: [/* @__PURE__ */ (0, cN.jsxs)(dy, {
				className: "shrink-0 border-b border-border px-3 py-2",
				children: [/* @__PURE__ */ (0, cN.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						!c && /* @__PURE__ */ (0, cN.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Voltar às conversas",
							onClick: () => Gy.back(),
							children: /* @__PURE__ */ (0, cN.jsx)(se, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, cN.jsx)(Qt, { className: "size-4 text-muted-foreground" }),
						/* @__PURE__ */ (0, cN.jsx)(py, {
							className: "flex-1 text-sm",
							children: "Mensagens diretas"
						}),
						/* @__PURE__ */ (0, cN.jsx)("span", {
							className: `size-1.5 rounded-full ${e.connected ? "bg-emerald-500" : "bg-muted-foreground"}`,
							"aria-label": e.connected ? "Conectado" : "Reconectando"
						}),
						/* @__PURE__ */ (0, cN.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Configurações de mensagens",
							onClick: () => Gy.view("settings"),
							children: /* @__PURE__ */ (0, cN.jsx)(Vn, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, cN.jsx)(Y, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Fechar mensagens",
							onClick: () => Gy.close(),
							children: /* @__PURE__ */ (0, cN.jsx)(br, { className: "size-4" })
						})
					]
				}), /* @__PURE__ */ (0, cN.jsx)(my, {
					className: "sr-only",
					children: "Conversas privadas da sua conta OrganizeOn."
				})]
			}), /* @__PURE__ */ (0, cN.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, cN.jsxs)("aside", {
					className: `${c ? "flex" : "hidden md:flex"} w-full shrink-0 flex-col border-r border-border md:w-72`,
					"aria-label": "Lista de conversas",
					children: [
						/* @__PURE__ */ (0, cN.jsxs)("div", {
							className: "shrink-0 space-y-2 border-b border-border p-3",
							children: [
								/* @__PURE__ */ (0, cN.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, cN.jsx)("h2", {
										className: "text-sm font-medium",
										children: "Suas conversas"
									}), /* @__PURE__ */ (0, cN.jsx)(Y, {
										type: "button",
										size: "icon-sm",
										variant: "ghost",
										"aria-label": "Nova mensagem direta",
										onClick: () => Gy.view("new"),
										children: /* @__PURE__ */ (0, cN.jsx)(Yt, { className: "size-4" })
									})]
								}),
								/* @__PURE__ */ (0, cN.jsx)(qb, {
									"aria-label": "Pesquisar conversa",
									placeholder: "Pesquisar conversa…",
									className: "h-8",
									value: n,
									onChange: (e) => r(e.target.value)
								}),
								/* @__PURE__ */ (0, cN.jsxs)(Y, {
									type: "button",
									variant: e.view === "requests" ? "secondary" : "ghost",
									className: "w-full justify-start",
									onClick: () => Gy.view("requests"),
									children: [
										/* @__PURE__ */ (0, cN.jsx)(Tt, { className: "size-4" }),
										"Solicitações",
										u > 0 && /* @__PURE__ */ (0, cN.jsx)($b, {
											variant: "secondary",
											className: "ml-auto",
											children: u
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, cN.jsx)("div", {
							className: "min-h-0 flex-1 overflow-y-auto p-1.5",
							children: !e.inbox && !e.error ? /* @__PURE__ */ (0, cN.jsxs)("p", {
								role: "status",
								className: "flex items-center gap-2 p-4 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, cN.jsx)(Lt, { className: "size-3 animate-spin" }), "Carregando conversas…"]
							}) : l.length ? l.map((t) => /* @__PURE__ */ (0, cN.jsxs)("button", {
								type: "button",
								"aria-label": `Conversa com ${t.peer.profile.displayName}`,
								onClick: () => Gy.select(t.id),
								className: `mb-1 flex w-full min-w-0 items-center gap-2.5 rounded-md p-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${e.selectedId === t.id ? "bg-accent" : "hover:bg-muted"}`,
								children: [
									/* @__PURE__ */ (0, cN.jsx)(Jy, {
										profile: t.peer.profile,
										className: "size-9"
									}),
									/* @__PURE__ */ (0, cN.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, cN.jsx)("span", {
											className: "block truncate text-sm font-medium",
											children: t.peer.profile.displayName
										}), /* @__PURE__ */ (0, cN.jsx)("span", {
											className: "mt-0.5 block truncate text-xs text-muted-foreground",
											children: t.lastMessage ? (t.lastMessage.sender.username === e.username ? "Você: " : "") + (t.lastMessage.deleted ? "Mensagem apagada" : t.lastMessage.content || "Arquivo") : "Conversa aceita"
										})]
									}),
									t.unread > 0 && /* @__PURE__ */ (0, cN.jsx)($b, {
										variant: "secondary",
										className: "tabular-nums",
										children: t.unread > 99 ? "99+" : t.unread
									})
								]
							}, t.id)) : /* @__PURE__ */ (0, cN.jsxs)("div", {
								className: "grid gap-3 p-6 text-center",
								children: [
									/* @__PURE__ */ (0, cN.jsx)(Qt, { className: "mx-auto size-7 text-muted-foreground" }),
									/* @__PURE__ */ (0, cN.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: n ? "Nenhuma conversa encontrada." : "Suas DMs vão aparecer aqui."
									}),
									/* @__PURE__ */ (0, cN.jsx)(Y, {
										type: "button",
										variant: "outline",
										onClick: () => Gy.view("new"),
										children: "Nova DM"
									})
								]
							})
						}),
						e.error && /* @__PURE__ */ (0, cN.jsxs)("div", {
							className: "shrink-0 border-t border-border p-3",
							children: [/* @__PURE__ */ (0, cN.jsx)("p", {
								role: "alert",
								className: "text-xs text-destructive",
								children: e.error
							}), /* @__PURE__ */ (0, cN.jsxs)(Y, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: () => void Gy.refresh(),
								children: [/* @__PURE__ */ (0, cN.jsx)(En, { className: "size-3" }), "Tentar novamente"]
							})]
						})
					]
				}), /* @__PURE__ */ (0, cN.jsx)("main", {
					className: `${c ? "hidden md:block" : "block"} min-h-0 min-w-0 flex-1`,
					children: /* @__PURE__ */ (0, cN.jsx)(iN, { children: s ? /* @__PURE__ */ (0, cN.jsx)(Ck, {
						conversation: s,
						onProfile: a
					}, s.id) : e.view === "requests" ? /* @__PURE__ */ (0, cN.jsx)(EM, { onProfile: a }) : e.view === "new" ? /* @__PURE__ */ (0, cN.jsx)(AM, {}) : e.view === "settings" ? /* @__PURE__ */ (0, cN.jsx)(SM, {}) : /* @__PURE__ */ (0, cN.jsxs)("div", {
						className: "grid h-full place-content-center justify-items-center gap-3 p-8 text-center",
						children: [
							/* @__PURE__ */ (0, cN.jsx)(Qt, { className: "size-10 text-muted-foreground" }),
							/* @__PURE__ */ (0, cN.jsx)("h2", {
								className: "text-lg font-semibold",
								children: "Suas mensagens, em qualquer serviço"
							}),
							/* @__PURE__ */ (0, cN.jsx)("p", {
								className: "max-w-xs text-sm text-muted-foreground",
								children: "Escolha uma conversa ou adicione alguém pelo @usuário."
							}),
							/* @__PURE__ */ (0, cN.jsx)(Y, {
								type: "button",
								variant: "outline",
								onClick: () => Gy.view("new"),
								children: "Nova DM"
							})
						]
					}) }, e.selectedId || e.view)
				})]
			})]
		})
	}), i && /* @__PURE__ */ (0, cN.jsx)(aN, {
		person: i,
		own: i.username === e.username,
		onClose: () => a(null)
	})] });
}
var sN, cN, lN, uN = o((() => {
	sN = /* @__PURE__ */ u(b(), 1), Tr(), gy(), Cs(), Yb(), tx(), Xy(), mx(), Ky(), gx(), Ek(), TM(), kM(), NM(), cN = bs(), lN = (0, sN.lazy)(() => Promise.resolve().then(() => (tN(), XM)));
}));
gy(), Cs(), Ky();
var dN = (0, Z.lazy)(() => Promise.resolve().then(() => (uN(), nN)));
function fN({ username: e, children: t }) {
	let n = Oy(), r = !!e && /^[A-Za-z0-9_.-]{3,32}$/.test(e);
	return (0, Z.useEffect)(() => {
		if (r) return Gy.start(e);
	}, [e, r]), /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [t, r && /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [n.open && /* @__PURE__ */ (0, X.jsx)(_y, {
		onClose: () => Gy.close(),
		children: /* @__PURE__ */ (0, X.jsx)(Z.Suspense, {
			fallback: /* @__PURE__ */ (0, X.jsx)(sy, {
				open: !0,
				onOpenChange: (e) => {
					e || Gy.close();
				},
				children: /* @__PURE__ */ (0, X.jsxs)(uy, { children: [/* @__PURE__ */ (0, X.jsxs)(dy, { children: [/* @__PURE__ */ (0, X.jsx)(py, { children: "Mensagens diretas" }), /* @__PURE__ */ (0, X.jsx)(my, { children: "Carregando mensagens…" })] }), /* @__PURE__ */ (0, X.jsx)(Y, {
					variant: "outline",
					onClick: () => Gy.close(),
					children: "Fechar"
				})] })
			}),
			children: /* @__PURE__ */ (0, X.jsx)(dN, {})
		})
	}), /* @__PURE__ */ (0, X.jsx)(Qy, {})] })] });
}
// src/hooks/use-mobile.ts
var pN = 768;
function mN() {
	let [e, t] = Z.useState(void 0);
	return Z.useEffect(() => {
		let e = window.matchMedia("(max-width: 767px)"), n = () => {
			t(window.innerWidth < pN);
		};
		return e.addEventListener("change", n), t(window.innerWidth < pN), () => e.removeEventListener("change", n);
	}, []), !!e;
}
qw(), vs();
function hN({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(Kw, {
		"data-slot": "separator",
		orientation: t,
		className: _s("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", e),
		...n
	});
}
ey(), vs(), oy(), Cs(), Tr();
function gN({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(Nv, {
		"data-slot": "sheet",
		...e
	});
}
function _N({ container: e, ...t }) {
	let n = ny();
	return /* @__PURE__ */ (0, X.jsx)(av, {
		"data-slot": "sheet-portal",
		container: e ?? n ?? void 0,
		...t
	});
}
function vN({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(Bc, {
		"data-slot": "sheet-overlay",
		className: _s("fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs", e),
		...t
	});
}
function yN({ className: e, children: t, side: n = "right", showCloseButton: r = !0, ...i }) {
	return /* @__PURE__ */ (0, X.jsxs)(_N, { children: [/* @__PURE__ */ (0, X.jsx)(vN, {}), /* @__PURE__ */ (0, X.jsxs)(Y_, {
		"data-slot": "sheet-content",
		"data-side": n,
		className: _s("d3-sheet-content fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm", e),
		...i,
		children: [t, r && /* @__PURE__ */ (0, X.jsxs)(gl, {
			"data-slot": "sheet-close",
			render: /* @__PURE__ */ (0, X.jsx)(Y, {
				variant: "ghost",
				className: "absolute top-3 right-3",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, X.jsx)(br, {}), /* @__PURE__ */ (0, X.jsx)("span", {
				className: "sr-only",
				children: "Fechar navegação"
			})]
		})]
	})] });
}
function bN({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sheet-header",
		className: _s("flex flex-col gap-0.5 p-4", e),
		...t
	});
}
function xN({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(zv, {
		"data-slot": "sheet-title",
		className: _s("font-heading text-base font-medium text-foreground", e),
		...t
	});
}
function SN({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(Al, {
		"data-slot": "sheet-description",
		className: _s("text-sm text-muted-foreground", e),
		...t
	});
}
// node_modules/@base-ui/react/tooltip/root/TooltipRootContext.mjs
Ni();
var CN = /*#__PURE__*/ Z.createContext(void 0);
function wN(e) {
	let t = Z.useContext(CN);
	if (t === void 0 && !e) throw Error(Mi(72));
	return t;
}
ch(), Gc(), ml(), Th();
var TN = {
	...yh,
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
}, EN = class extends ah {
	constructor(e, t, n) {
		let r = new Am();
		super(DN(e, r, t, n), ON(r), TN);
	}
	setOpen = (e, t) => {
		bm(this, e, t, { extraState: { openChangeReason: t.reason } });
	};
	cancelPendingOpen(e) {
		this.state.floatingRootContext.dispatchOpenChange(!1, Uc(qc, e));
	}
};
function DN(e, t, n, r = !1) {
	return {
		...ph(t, n, r),
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
function ON(e) {
	return {
		popupRef: /*#__PURE__*/ Z.createRef(),
		onOpenChange: void 0,
		onOpenChangeComplete: void 0,
		triggerElements: e
	};
}
Km(), fa(), fi(), S_(), Gc(), Th(), Ai(), ml();
var kN = Bm(function(e) {
	let { disabled: t = !1, defaultOpen: n = !1, open: r, disableHoverablePopup: i = !1, trackCursorAxis: a = "none", actionsRef: o, onOpenChange: s, onOpenChangeComplete: c, handle: l, triggerId: u, defaultTriggerId: d = null, children: f } = e, p = mm((e, t) => new EN({
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
	}), Sm(p, { closeOnActiveTriggerUnmount: !0 });
	let { forceUnmount: y, transitionStatus: b } = Cm(h, p), x = p.useState("isInstantPhase"), S = p.useState("instantType"), C = p.useState("lastOpenChangeReason"), w = Z.useRef(null);
	J(() => {
		m && t && p.setOpen(!1, Uc(sl));
	}, [
		m,
		t,
		p
	]), J(() => {
		b === "ending" && C === "none" || b !== "ending" && x ? (S !== "delay" && (w.current = S), p.set("instantType", "delay")) : w.current !== null && (p.set("instantType", w.current), w.current = null);
	}, [
		b,
		x,
		C,
		S,
		p
	]), J(() => {
		h && (g ?? p.set("payload", void 0));
	}, [
		p,
		g,
		h
	]), Z.useImperativeHandle(o, () => ({
		unmount: y,
		close: () => p.setOpen(!1, Uc(ul))
	}), [y, p]);
	let T = h || _ || !t && a !== "none";
	return /*#__PURE__*/ (0, X.jsxs)(CN.Provider, {
		value: p,
		children: [
			l && /*#__PURE__*/ (0, X.jsx)(hm, {
				handle: l,
				store: p
			}),
			T && /*#__PURE__*/ (0, X.jsx)(AN, {
				store: p,
				disabled: t,
				trackCursorAxis: a
			}),
			typeof f == "function" ? f({ payload: v }) : f
		]
	});
});
function AN({ store: e, disabled: t, trackCursorAxis: n }) {
	let r = e.useState("floatingRootContext"), i = Wp(r, {
		enabled: !t,
		referencePress: () => e.select("closeOnClick")
	}), a = zp(r, {
		enabled: !t && n !== "none",
		axis: n === "none" ? void 0 : n
	}), o = Z.useMemo(() => hi(a.reference, i.reference), [a.reference, i.reference]);
	return wm(e, {
		activeTriggerProps: o,
		inactiveTriggerProps: o,
		popupProps: i.floating ?? da
	}), null;
}
// node_modules/@base-ui/react/tooltip/provider/TooltipProviderContext.mjs
var jN = /*#__PURE__*/ Z.createContext(void 0);
function MN() {
	return Z.useContext(jN);
}
Ni(), Zr(), Km(), Rl(), ed(), Rc(), Oa(), Th(), Ol(), S_(), Pu(), fu(), Gc(), ml(), Lh(), Bu(), Tu();
var NN = "data-base-ui-tooltip-trigger";
function PN(e) {
	let t = hu(e);
	return jr(t) ? t : null;
}
var FN = Vm(function(e, t) {
	let { render: n, className: r, style: i, handle: a, payload: o, disabled: s, delay: c, closeOnClick: l = !0, closeDelay: u, id: d, ...f } = e, p = wN(!0), m = xh(a) ?? p;
	if (!m) throw Error(Mi(82));
	let h = Dl(d), g = m.useState("isTriggerActive", h), _ = m.useState("isOpenedByTrigger", h), v = m.useState("floatingRootContext"), y = Z.useRef(null), b = u ?? 0, { registerTrigger: x, isMountedByThisTrigger: S } = xm(h, y, m, {
		payload: o,
		closeOnClick: l,
		closeDelay: b
	}), C = MN(), { activeIdRef: w, delayRef: T, isInstantPhase: E, hasProvider: D } = Uu(v, { open: _ }), O = Ph(v);
	m.useSyncedValue("isInstantPhase", E);
	let k = m.useState("disabled"), A = s ?? k, j = Qu(A), M = m.useState("trackCursorAxis"), N = m.useState("disableHoverablePopup"), P = Z.useRef(!1), F = Fl(), I = Z.useRef(void 0);
	function L() {
		return D && w.current != null ? 0 : c ?? C ?? 600;
	}
	function R(e) {
		let t = y.current;
		if (!t || !e) return !1;
		let n = mu(e, `[${NN}]`);
		return n !== null && n !== t && Q(t, n);
	}
	function z(e) {
		let t = R(e);
		return P.current = t, t && (O.openChangeTimeout.clear(), O.restTimeout.clear(), O.restTimeoutPending = !1, F.clear()), t;
	}
	let B = Vh(v, {
		enabled: !A,
		mouseOnly: !0,
		move: !1,
		handleClose: !N && M !== "both" ? cg() : null,
		restMs: L,
		delay() {
			return u == null && D ? { close: Iu(T.current, "close") } : { close: b };
		},
		triggerElementRef: y,
		isActiveTrigger: g,
		isClosing: () => m.select("transitionStatus") === "ending",
		shouldOpen() {
			return !P.current;
		}
	}), V = Oh(v, { enabled: !A }).reference, H = (e) => {
		let t = P.current, n = PN(e), r = z(n), i = y.current, a = i && n && Q(i, n);
		if (r && m.select("open") && m.select("lastOpenChangeReason") === "trigger-hover") m.setOpen(!1, Uc(Jc, e));
		else if (t && !r && a && !j.current && !m.select("open") && i && uu(I.current)) {
			let t = () => {
				P.current || j.current || m.select("open") || m.setOpen(!0, Uc(Jc, e, i));
			}, n = L();
			n === 0 ? (F.clear(), t()) : F.start(n, t);
		}
	}, ee = m.useState("appliedTriggerProps", S || M !== "none");
	return ya("button", e, {
		state: { open: _ },
		ref: [
			t,
			x,
			y
		],
		props: [
			B,
			V,
			ee,
			{
				onMouseOver(e) {
					H(e.nativeEvent);
				},
				onFocus(e) {
					R(PN(e.nativeEvent)) && e.preventBaseUIHandler();
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
				[wu]: A ? "" : void 0,
				[NN]: A ? void 0 : ""
			},
			f
		],
		stateAttributesMapping: Pc
	});
});
// node_modules/@base-ui/react/tooltip/portal/TooltipPortalContext.mjs
Ni();
var IN = /*#__PURE__*/ Z.createContext(void 0);
function LN() {
	let e = Z.useContext(IN);
	if (e === void 0) throw Error(Mi(70));
	return e;
}
// node_modules/@base-ui/react/utils/FloatingPortalLite.mjs
ap();
var RN = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { children: n, container: r, className: i, render: a, style: o, ...s } = e, { node: c, subtree: l } = Zf({
		container: r,
		ref: t,
		componentProps: e,
		elementProps: s
	});
	return !l && !c ? null : /*#__PURE__*/ (0, X.jsxs)(Z.Fragment, { children: [l, c && /*#__PURE__*/ js.createPortal(n, c)] });
}), zN = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e;
	return wN().useState("mounted") || n ? /*#__PURE__*/ (0, X.jsx)(IN.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, X.jsx)(RN, {
			ref: t,
			...r
		})
	}) : null;
});
// node_modules/@base-ui/react/tooltip/positioner/TooltipPositionerContext.mjs
Ni();
var BN = /*#__PURE__*/ Z.createContext(void 0);
function VN() {
	let e = Z.useContext(BN);
	if (e === void 0) throw Error(Mi(71));
	return e;
}
EC(), Xf(), VC();
var HN = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, anchor: i, positionMethod: a = "absolute", side: o = "top", align: s = "center", sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = Jf, style: g, ..._ } = e, v = wN(), y = LN(), b = v.useState("open"), x = v.useState("mounted"), S = v.useState("trackCursorAxis"), C = v.useState("disableHoverablePopup"), w = v.useState("floatingRootContext"), T = v.useState("instantType"), E = v.useState("transitionStatus"), D = bC({
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
	}), O = BC(e, Z.useMemo(() => ({
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
	return /*#__PURE__*/ (0, X.jsx)(BN.Provider, {
		value: D,
		children: O
	});
});
Rc(), lm(), Oa(), TS(), S_(), Th();
var UN = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = wN(), { side: s, align: c } = VN(), l = o.useState("open"), u = o.useState("instantType"), d = o.useState("transitionStatus"), f = o.useState("popupProps"), p = o.useState("floatingRootContext"), m = o.useState("disabled"), h = o.useState("closeDelay");
	sm({
		open: l,
		ref: o.context.popupRef,
		onComplete() {
			l && o.context.onOpenChangeComplete?.(!0);
		}
	}), Rh(p, {
		enabled: !m,
		closeDelay: h
	});
	let g = o.useStateSetter("popupElement");
	return ya("div", e, {
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
			Om,
			f,
			wS(d),
			a
		],
		stateAttributesMapping: Lc
	});
});
Rc(), Oa();
var WN = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, o = wN(), { arrowRef: s, side: c, align: l, arrowUncentered: u, arrowStyles: d } = VN();
	return ya("div", e, {
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
S_();
var GN = function(e) {
	let { delay: t, closeDelay: n, timeout: r = 400 } = e, i = Z.useMemo(() => ({
		open: t,
		close: n
	}), [t, n]);
	return /*#__PURE__*/ (0, X.jsx)(jN.Provider, {
		value: t,
		children: /*#__PURE__*/ (0, X.jsx)(Hu, {
			delay: i,
			timeoutMs: r,
			children: e.children
		})
	});
};
vs(), oy();
function KN({ delay: e = 0, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(GN, {
		"data-slot": "tooltip-provider",
		delay: e,
		...t
	});
}
function qN({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(kN, {
		"data-slot": "tooltip",
		...e
	});
}
function JN({ ...e }) {
	return /* @__PURE__ */ (0, X.jsx)(FN, {
		"data-slot": "tooltip-trigger",
		...e
	});
}
function YN({ className: e, side: t = "top", sideOffset: n = 4, align: r = "center", alignOffset: i = 0, children: a, ...o }) {
	let s = ny();
	return /* @__PURE__ */ (0, X.jsx)(zN, {
		container: s ?? void 0,
		children: /* @__PURE__ */ (0, X.jsx)(HN, {
			align: r,
			alignOffset: i,
			side: t,
			sideOffset: n,
			className: "isolate z-50",
			children: /* @__PURE__ */ (0, X.jsxs)(UN, {
				"data-slot": "tooltip-content",
				className: _s("z-50 inline-flex w-fit max-w-xs origin-[var(--transform-origin)] items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...o,
				children: [a, /* @__PURE__ */ (0, X.jsx)(WN, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })]
			})
		})
	});
}
Ai(), Qb(), za(), vs(), Cs(), Yb(), yx(), Tr();
var XN = "sidebar_state", ZN = 604800, QN = "16rem", $N = "18rem", eP = "3rem", tP = "b", nP = Z.createContext(null);
function rP() {
	let e = Z.useContext(nP);
	if (!e) throw Error("useSidebar must be used within a SidebarProvider.");
	return e;
}
function iP({ defaultOpen: e = !0, open: t, onOpenChange: n, className: r, style: i, children: a, ...o }) {
	let s = mN(), [c, l] = Z.useState(!1), [u, d] = Z.useState(e), f = t ?? u, p = Z.useCallback((e) => {
		let t = typeof e == "function" ? e(f) : e;
		n ? n(t) : d(t), document.cookie = `${XN}=${t}; path=/; max-age=${ZN}`;
	}, [n, f]), m = Z.useCallback(() => s ? l((e) => !e) : p((e) => !e), [
		s,
		p,
		l
	]);
	Z.useEffect(() => {
		let e = (e) => {
			e.key === tP && (e.metaKey || e.ctrlKey) && (e.preventDefault(), m());
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
	return /* @__PURE__ */ (0, X.jsx)(nP.Provider, {
		value: g,
		children: /* @__PURE__ */ (0, X.jsx)("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": QN,
				"--sidebar-width-icon": eP,
				...i
			},
			className: _s("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", r),
			...o,
			children: a
		})
	});
}
function aP({ side: e = "left", variant: t = "sidebar", collapsible: n = "offcanvas", className: r, children: i, dir: a, ...o }) {
	let { isMobile: s, state: c, openMobile: l, setOpenMobile: u } = rP();
	return n === "none" ? /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar",
		className: _s("flex h-full w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground", r),
		...o,
		children: i
	}) : s ? /* @__PURE__ */ (0, X.jsx)(gN, {
		open: l,
		onOpenChange: u,
		...o,
		children: /* @__PURE__ */ (0, X.jsxs)(yN, {
			dir: a,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-[var(--sidebar-width)] bg-sidebar p-0 text-sidebar-foreground",
			style: { "--sidebar-width": $N },
			side: e,
			children: [/* @__PURE__ */ (0, X.jsxs)(bN, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, X.jsx)(xN, { children: "Navegação" }), /* @__PURE__ */ (0, X.jsx)(SN, { children: "Navegue entre as páginas da aplicação." })]
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
function oP({ className: e, onClick: t, ...n }) {
	let { toggleSidebar: r } = rP();
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
		children: [/* @__PURE__ */ (0, X.jsx)(cn, {}), /* @__PURE__ */ (0, X.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function sP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("main", {
		"data-slot": "sidebar-inset",
		className: _s("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", e),
		...t
	});
}
function cP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: _s("flex flex-col gap-2 p-2", e),
		...t
	});
}
function lP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: _s("flex flex-col gap-2 p-2", e),
		...t
	});
}
function uP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(hN, {
		"data-slot": "sidebar-separator",
		"data-sidebar": "separator",
		className: _s("mx-2 w-auto bg-sidebar-border", e),
		...t
	});
}
function dP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: _s("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", e),
		...t
	});
}
function fP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: _s("relative flex w-full min-w-0 flex-col p-2", e),
		...t
	});
}
function pP({ className: e, render: t, ...n }) {
	return Xb({
		defaultTagName: "div",
		props: hi({ className: _s("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-none transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", e) }, n),
		render: t,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label"
		}
	});
}
function mP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: _s("flex w-full min-w-0 flex-col gap-0", e),
		...t
	});
}
function hP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: _s("group/menu-item relative", e),
		...t
	});
}
var gP = Ra("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-none transition-[width,height,padding] group-has-[data-sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
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
function _P({ render: e, isActive: t = !1, variant: n = "default", size: r = "default", tooltip: i, className: a, ...o }) {
	let { isMobile: s, state: c } = rP(), l = Xb({
		defaultTagName: "button",
		props: hi({ className: _s(gP({
			variant: n,
			size: r
		}), a) }, o),
		render: i ? /* @__PURE__ */ (0, X.jsx)(JN, { render: e }) : e,
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size: r,
			active: t
		}
	});
	return i ? (typeof i == "string" && (i = { children: i }), /* @__PURE__ */ (0, X.jsxs)(qN, { children: [l, /* @__PURE__ */ (0, X.jsx)(YN, {
		side: "right",
		align: "center",
		hidden: c !== "collapsed" || s,
		...i
	})] })) : l;
}
Tr(), tx(), Ky();
function vP() {
	let e = Oy(), { setOpenMobile: t } = rP(), n = (e.inbox?.conversations.reduce((e, t) => e + t.unread, 0) || 0) + (e.inbox?.requests.filter((e) => e.direction === "incoming").length || 0);
	return /* @__PURE__ */ (0, X.jsxs)(_P, {
		"aria-label": "Mensagens diretas",
		tooltip: "Mensagens diretas",
		onClick: () => {
			t(!1), Gy.open();
		},
		children: [
			/* @__PURE__ */ (0, X.jsx)(Qt, {}),
			/* @__PURE__ */ (0, X.jsx)("span", { children: "Mensagens" }),
			n > 0 && /* @__PURE__ */ (0, X.jsx)($b, {
				variant: "secondary",
				className: "ml-auto tabular-nums group-data-[collapsible=icon]:hidden",
				"aria-label": `${n} mensagens ou solicitações não lidas`,
				children: n > 99 ? "99+" : n
			})
		]
	});
}
gx(), Tr(), yT(), mx(), Xy();
var yP = (0, Z.lazy)(() => Promise.resolve().then(() => (tN(), XM)));
function bP({ username: e, role: t, onLogout: n }) {
	let [r, i] = (0, Z.useState)(!1), a = ux(e, t !== "guest"), o = hx[t] || t, s = /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)(Jy, { profile: a }), /* @__PURE__ */ (0, X.jsxs)("span", {
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
		t !== "guest" && /^[A-Za-z0-9_.-]{3,32}$/.test(e) && /* @__PURE__ */ (0, X.jsx)(vP, {}),
		/* @__PURE__ */ (0, X.jsxs)(dT, { children: [/* @__PURE__ */ (0, X.jsxs)(fT, {
			render: /* @__PURE__ */ (0, X.jsx)(_P, {
				size: "lg",
				className: "h-12 justify-start",
				"aria-label": `Perfil de ${e}`
			}),
			children: [s, /* @__PURE__ */ (0, X.jsx)(Oe, { className: "ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" })]
		}), /* @__PURE__ */ (0, X.jsxs)(pT, {
			side: "top",
			align: "start",
			className: "w-64",
			children: [
				/* @__PURE__ */ (0, X.jsx)(mT, { children: /* @__PURE__ */ (0, X.jsx)(hT, {
					className: "px-2 py-2",
					children: /* @__PURE__ */ (0, X.jsxs)("span", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, X.jsx)(Jy, { profile: a }), /* @__PURE__ */ (0, X.jsxs)("span", {
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
				/* @__PURE__ */ (0, X.jsx)(_T, {}),
				/* @__PURE__ */ (0, X.jsxs)(gT, {
					disabled: t === "guest",
					onClick: () => {
						cx(e).then(() => i(!0));
					},
					children: [/* @__PURE__ */ (0, X.jsx)(_r, {}), "Perfil"]
				}),
				n && /* @__PURE__ */ (0, X.jsxs)(gT, {
					onClick: n,
					className: "text-destructive",
					children: [/* @__PURE__ */ (0, X.jsx)(Bt, {}), t === "guest" ? "Sair do modo convidado" : "Sair da sessão"]
				})
			]
		})] }),
		r && /* @__PURE__ */ (0, X.jsx)(_y, {
			onClose: () => i(!1),
			children: /* @__PURE__ */ (0, X.jsx)(Z.Suspense, {
				fallback: /* @__PURE__ */ (0, X.jsx)("p", {
					role: "status",
					className: "fixed bottom-4 right-4 rounded-md border bg-popover p-3 text-sm",
					children: "Carregando perfil…"
				}),
				children: /* @__PURE__ */ (0, X.jsx)(yP, {
					username: e,
					role: o,
					profile: a,
					onClose: () => i(!1)
				})
			})
		})
	] });
}
Tr(), tx(), Cs(), gy();
function xP({ account: e, confirmLogout: t }) {
	let { setOpen: n, setOpenMobile: r } = rP(), i = () => {
		n(!1), r(!1);
	}, a = [
		{
			id: "home",
			label: "Início",
			icon: yt
		},
		{
			id: "games",
			label: "Jogos",
			icon: gt
		},
		{
			id: "settings",
			label: "Configurações",
			icon: Vn
		},
		...e.guest ? [] : [{
			id: "data",
			label: "Dados",
			icon: Pe
		}],
		{
			id: "proxy",
			label: "Servidor proxy",
			icon: $n
		},
		...e.canOpenDashboard ? [{
			id: "dashboard",
			label: "Dashboard",
			icon: Xn
		}] : []
	];
	return /* @__PURE__ */ (0, X.jsxs)(aP, {
		collapsible: "offcanvas",
		className: "pointer-events-auto",
		children: [
			/* @__PURE__ */ (0, X.jsx)(cP, {
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
			/* @__PURE__ */ (0, X.jsx)(uP, {}),
			/* @__PURE__ */ (0, X.jsx)(dP, { children: /* @__PURE__ */ (0, X.jsxs)(fP, { children: [/* @__PURE__ */ (0, X.jsx)(pP, { children: "Workspace" }), /* @__PURE__ */ (0, X.jsx)(mP, { children: a.map(({ id: t, label: n, icon: r }) => /* @__PURE__ */ (0, X.jsx)(hP, { children: /* @__PURE__ */ (0, X.jsxs)(_P, {
				tooltip: n,
				onClick: () => {
					i(), e.onNavigate(t);
				},
				children: [
					/* @__PURE__ */ (0, X.jsx)(r, {}),
					/* @__PURE__ */ (0, X.jsx)("span", { children: n }),
					t === "proxy" && /* @__PURE__ */ (0, X.jsx)($b, {
						variant: "secondary",
						className: "ml-auto text-[10px]",
						children: e.proxyLabel
					})
				]
			}) }, t)) })] }) }),
			/* @__PURE__ */ (0, X.jsx)(lP, {
				className: "px-2 pb-3",
				children: /* @__PURE__ */ (0, X.jsx)(bP, {
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
function SP(e) {
	let [t, n] = (0, Z.useState)(!1);
	return /* @__PURE__ */ (0, X.jsx)(fN, {
		username: e.guest ? null : e.username,
		children: /* @__PURE__ */ (0, X.jsxs)(iP, {
			defaultOpen: !1,
			className: "pointer-events-none min-h-0",
			children: [
				/* @__PURE__ */ (0, X.jsx)(xP, {
					account: e,
					confirmLogout: () => n(!0)
				}),
				/* @__PURE__ */ (0, X.jsx)(oP, {
					className: "pointer-events-auto fixed left-3 top-3 z-40 border bg-background",
					"aria-label": "Abrir menu"
				}),
				/* @__PURE__ */ (0, X.jsx)(sy, {
					open: t,
					onOpenChange: n,
					children: /* @__PURE__ */ (0, X.jsxs)(uy, {
						className: "sm:max-w-sm",
						children: [/* @__PURE__ */ (0, X.jsxs)(dy, { children: [/* @__PURE__ */ (0, X.jsx)(py, { children: "Encerrar sessão?" }), /* @__PURE__ */ (0, X.jsx)(my, { children: e.guest ? "Deseja sair do modo convidado?" : "Deseja realmente sair desta conta?" })] }), /* @__PURE__ */ (0, X.jsxs)(fy, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
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
function CP({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card",
		"data-size": t,
		className: _s("group/card flex flex-col gap-[var(--card-spacing)] overflow-hidden rounded-xl bg-card py-[var(--card-spacing)] text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:1rem] has-[data-slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:0.75rem] data-[size=sm]:has-[data-slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", e),
		...n
	});
}
function wP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-header",
		className: _s("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-[var(--card-spacing)] has-[data-slot=card-action]:grid-cols-[1fr_auto] has-[data-slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-[var(--card-spacing)]", e),
		...t
	});
}
function TP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("h2", {
		"data-slot": "card-title",
		className: _s("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", e),
		...t
	});
}
function EP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-description",
		className: _s("text-sm text-muted-foreground", e),
		...t
	});
}
function DP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-content",
		className: _s("px-[var(--card-spacing)]", e),
		...t
	});
}
function OP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		"data-slot": "card-footer",
		className: _s("flex items-center rounded-b-xl border-t bg-muted/50 p-[var(--card-spacing)]", e),
		...t
	});
}
// node_modules/@base-ui/react/tabs/root/TabsRootContext.mjs
Ni();
var kP = /*#__PURE__*/ Z.createContext(void 0);
function AP() {
	let e = Z.useContext(kP);
	if (e === void 0) throw Error(Mi(64));
	return e;
}
// node_modules/@base-ui/react/tabs/root/TabsRootDataAttributes.mjs
var jP = "data-activation-direction", MP = { tabActivationDirection: (e) => ({ [jP]: e }) };
Px(), fi(), li(), Oa(), IC(), Gc(), ml();
var NP = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { className: n, defaultValue: r = 0, onValueChange: i, orientation: a = "horizontal", render: o, value: s, style: c, ...l } = e, u = e.defaultValue !== void 0, d = Z.useRef([]), [f, p] = Z.useState(() => /* @__PURE__ */ new Map()), [m, h] = Mx({
		controlled: s,
		default: r,
		name: "Tabs",
		state: "value"
	}), g = s !== void 0, [_, v] = Z.useState(() => /* @__PURE__ */ new Map()), y = Z.useRef(void 0), b = Z.useCallback((e) => PP(_, e), [_]), [x, S] = Z.useState(() => ({
		previousValue: m,
		tabActivationDirection: "none"
	})), { previousValue: C, tabActivationDirection: w } = x, T = w, E = !1;
	C !== m && (T = FP(C, m, a, _), E = C != null && m != null && b(m) == null);
	let D = E ? C : m, O = C !== D || w !== T;
	J(() => {
		O && S({
			previousValue: D,
			tabActivationDirection: T
		});
	}, [
		D,
		O,
		T
	]);
	let k = q((e, t) => {
		t.activationDirection = FP(m, e, a, _), i?.(e, t), t.isCanceled || h(() => e);
	}), A = q((e, t) => {
		i?.(e, Uc(t, void 0, void 0, { activationDirection: "none" }));
	}), j = q((e, t) => (p((n) => {
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
	}, [_]), L = Z.useRef(!u), R = Z.useRef(r), z = Z.useRef(u), B = Z.useRef(!1);
	J(() => {
		if (g) return;
		function e(e, t) {
			h(() => e), S({
				previousValue: e,
				tabActivationDirection: "none"
			}), A(e, t), L.current = !1;
		}
		if (_.size === 0) {
			B.current && m !== null && !y.current?.isConnected && e(null, cl);
			return;
		}
		B.current = !0, y.current = _.keys().next().value;
		let t = F?.disabled, n = F == null && m !== null;
		if (!t && m === R.current && (z.current = !1), z.current && t && m === R.current) return;
		let r = L.current;
		if (t || n) {
			let n = I ?? null;
			if (m === n) {
				L.current = !1;
				return;
			}
			let i = cl;
			r ? i = ll : t && (i = sl), e(n, i);
		} else r && F != null && (A(m, ll), L.current = !1);
	}, [
		I,
		g,
		A,
		F,
		h,
		_,
		m
	]);
	let V = ya("div", e, {
		state: {
			orientation: a,
			tabActivationDirection: T
		},
		ref: t,
		props: l,
		stateAttributesMapping: MP
	});
	return /*#__PURE__*/ (0, X.jsx)(kP.Provider, {
		value: P,
		children: /*#__PURE__*/ (0, X.jsx)(DC, {
			elementsRef: d,
			children: V
		})
	});
});
function PP(e, t) {
	for (let [n, r] of e.entries()) if (t === r.value) return n;
	return null;
}
function FP(e, t, n, r) {
	if (e == null || t == null) return "none";
	let [i, a, o] = n === "horizontal" ? [
		"left",
		"left",
		"right"
	] : [
		"top",
		"up",
		"down"
	], s = PP(r, e), c = PP(r, t);
	if (s == null || c == null) return s !== c && (typeof e == "number" || typeof e == "string") && typeof e == typeof t ? t > e ? o : a : "none";
	let l = s.getBoundingClientRect()[i], u = c.getBoundingClientRect()[i];
	return u < l ? a : u > l ? o : "none";
}
// node_modules/@base-ui/react/internals/composite/constants.mjs
var IP = "data-composite-item-active";
// node_modules/@base-ui/react/tabs/list/TabsListContext.mjs
Ni();
var LP = /*#__PURE__*/ Z.createContext(void 0);
function RP() {
	let e = Z.useContext(LP);
	if (e === void 0) throw Error(Mi(65));
	return e;
}
Hi(), fi(), li(), Ol(), Oa(), Hc(), Tw(), Li(), Gc(), ml(), lh();
var zP = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { className: n, disabled: r = !1, render: i, value: a, id: o, nativeButton: s = !0, style: c, ...l } = e, { value: u, getTabPanelIdByValue: d, onValueChange: f, orientation: p, tabActivationDirection: m } = AP(), { activateOnFocus: h, registerTabResizeObserverElement: g, tabsListElement: _ } = RP(), { highlightedIndex: v, onHighlightedIndexChange: y } = Pi(), b = Dl(o), { compositeProps: x, compositeRef: S, index: C } = Cw({ metadata: Z.useMemo(() => ({
		disabled: r,
		id: b,
		value: a
	}), [
		r,
		b,
		a
	]) }), w = a === u, T = Z.useRef(!1), E = Z.useRef(null), D = q((e) => {
		E.current?.(), E.current = e ? g(e) : null;
	});
	J(() => {
		if (T.current) {
			T.current = !1;
			return;
		}
		if (!(w && C > -1 && v !== C)) return;
		let e = _;
		if (e != null) {
			let t = pu(Vi(e));
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
	let { getButtonProps: O, buttonRef: k } = Gi({
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
		let t = Vi(e.currentTarget);
		function n() {
			j.current = !1, M.current = !1, t.removeEventListener("pointerup", n), t.removeEventListener("pointercancel", n);
		}
		t.addEventListener("pointerup", n), t.addEventListener("pointercancel", n);
	}
	return ya("button", e, {
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
				[IP]: w ? "" : void 0,
				onKeyDownCapture() {
					T.current = !0;
				}
			},
			l,
			O
		],
		stateAttributesMapping: MP
	});
});
// node_modules/@base-ui/react/tabs/panel/TabsPanelDataAttributes.mjs
xc();
var BP = "data-index";
Q_(), fi(), Ol(), xc(), lm(), $p(), Oa(), nS();
var VP = {
	...MP,
	...bc
}, HP = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { className: n, value: r, render: i, keepMounted: a = !1, style: o, ...s } = e, { value: c, getTabIdByPanelValue: l, orientation: u, tabActivationDirection: d, registerMountedTabPanel: f } = AP(), p = Dl(), { ref: m, index: h } = eS(), g = r === c, { mounted: _, transitionStatus: v, setMounted: y } = Zp(g), b = !_, x = l(r), S = {
		hidden: b,
		orientation: u,
		tabActivationDirection: d,
		transitionStatus: v
	}, C = Z.useRef(null), w = ya("div", e, {
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
			inert: Z_(!g),
			[BP]: h
		}, s],
		stateAttributesMapping: VP
	});
	return sm({
		open: g,
		ref: C,
		onComplete() {
			g || y(!1);
		}
	}), J(() => {
		if (!(p == null || b && !a)) return f(r, p);
	}, [
		b,
		a,
		r,
		p,
		f
	]), a || _ ? w : null;
});
Yw(), li(), na(), fi(), fa(), B_(), lh();
function UP(e) {
	let { loopFocus: t = !0, orientation: n = "both", grid: r, onLoop: i, direction: a, highlightedIndex: o, onHighlightedIndexChange: s, rootRef: c, enableHomeAndEndKeys: l = !1, stopEventPropagation: u, disabledIndices: d, modifierKeys: f = ua } = e, [p, m] = Z.useState(0), h = r != null, g = Z.useRef(null), _ = Xi(g, c), v = Z.useRef([]), y = Z.useRef(!1), b = Z.useRef(null), x = o ?? p, S = q((e, t = !1) => {
		if (b.current = v.current[e] ?? null, (s ?? m)(e), t) {
			let t = v.current[e];
			k_(g.current, t, a, n);
		}
	}), C = q((e) => {
		if (e.size === 0) return;
		if (y.current) {
			let e = v.current, t = e.indexOf(b.current);
			if (t === -1) {
				let t = e[x];
				!t || Jd(e, x, d) ? S(WP(e, d)) : b.current = t;
			} else t !== x && S(t);
			return;
		}
		y.current = !0;
		let t = Array.from(e.keys()), r = t.find((e) => e?.hasAttribute("data-composite-item-active")) ?? null, i = r ? e.get(r)?.index ?? -1 : -1;
		if (i !== -1) S(i);
		else if (Jd(t, x, d)) {
			let e = qd(t, { disabledIndices: d });
			Ud(t, e) || S(e);
		}
		k_(g.current, r, a, n);
	});
	J(() => {
		if (d == null || o != null || !y.current) return;
		let e = v.current;
		if (Jd(e, x, d)) {
			let t = qd(e, { disabledIndices: d });
			Ud(e, t) || S(t);
		}
	}, [
		d,
		o,
		x,
		v,
		S
	]);
	let w = q((e, t, n) => i ? i(e, t, n, v) : n), T = q((e) => {
		let o = e.key === "Home" || e.key === "End";
		if (!L_.has(e.key) || !l && o || GP(e, f) || !g.current) return;
		let s = a === "rtl", c = s ? P_ : F_, p = s ? F_ : P_, m = n === "vertical" ? N_ : c, _ = n === "vertical" ? M_ : p, y = hu(e.nativeEvent);
		if (y != null && O_(y) && !Jw(y)) {
			let t = y.selectionStart, n = y.selectionEnd, r = y.value;
			if (t == null || e.shiftKey || t !== n || e.key !== _ && t < r.length || e.key !== m && t > 0) return;
		}
		let b = x, C = Wd(v, d), T = Gd(v, d);
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
		l && (e.key === "Home" ? b = C : e.key === "End" && (b = T)), b === x && (E || D) && (t && b === T && E ? (b = C, i && (b = i(e, x, b, v))) : t && b === C && D ? (b = T, i && (b = i(e, x, b, v))) : b = qd(v.current, {
			startingIndex: b,
			decrement: D,
			disabledIndices: d
		})), b !== x && !Ud(v.current, b) && (u && e.stopPropagation(), (h || o || E || D) && e.preventDefault(), S(b, !0), queueMicrotask(() => {
			v.current[b]?.focus();
		}));
	});
	return {
		props: {
			ref: _,
			onFocus(e) {
				let t = g.current, n = hu(e.nativeEvent);
				t && n != null && O_(n) && n.setSelectionRange(0, n.value.length);
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
function WP(e, t) {
	let n = -1;
	for (let r = 0; r < e.length; r += 1) {
		let i = e[r];
		if (i && !Jd(e, r, t)) {
			if (i.hasAttribute("data-composite-item-active")) return r;
			n === -1 && (n = r);
		}
	}
	return Math.max(n, 0);
}
function GP(e, t) {
	for (let n of z_) if (!t.includes(n) && e.getModifierState(n)) return !0;
	return !1;
}
fa(), IC(), Li(), Oa(), iC();
function KP(e) {
	let { render: t, className: n, style: r, refs: i = ua, props: a = ua, state: o = da, stateAttributesMapping: s, highlightedIndex: c, onHighlightedIndexChange: l, orientation: u, grid: d, loopFocus: f, onLoop: p, enableHomeAndEndKeys: m, onMapChange: h, stopEventPropagation: g = !0, rootRef: _, disabledIndices: v, modifierKeys: y, highlightItemOnHover: b = !1, tag: x = "div", ...S } = e, { props: C, highlightedIndex: w, onHighlightedIndexChange: T, elementsRef: E, onMapChange: D, relayKeyboardEvent: O } = UP({
		grid: d,
		loopFocus: f,
		onLoop: p,
		orientation: u,
		highlightedIndex: c,
		onHighlightedIndexChange: l,
		rootRef: _,
		stopEventPropagation: g,
		enableHomeAndEndKeys: m,
		direction: tC(),
		disabledIndices: v,
		modifierKeys: y
	}), k = ya(x, e, {
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
	return /*#__PURE__*/ (0, X.jsx)(Ii.Provider, {
		value: A,
		children: /*#__PURE__*/ (0, X.jsx)(DC, {
			elementsRef: E,
			onMapChange: (e) => {
				h?.(e), D(e);
			},
			children: k
		})
	});
}
li(), fi(), fa();
var qP = /*#__PURE__*/ Z.forwardRef(function(e, t) {
	let { activateOnFocus: n = !1, className: r, loopFocus: i = !0, render: a, style: o, ...s } = e, { orientation: c, setTabMap: l, tabActivationDirection: u } = AP(), [d, f] = Z.useState(0), [p, m] = Z.useState(null), h = Z.useRef(/* @__PURE__ */ new Set()), g = Z.useRef(/* @__PURE__ */ new Set()), _ = Z.useRef(null);
	J(() => {
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
	let v = q((e) => (h.current.add(e), () => {
		h.current.delete(e);
	})), y = q((e) => (g.current.add(e), _.current?.observe(e), () => {
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
	return /*#__PURE__*/ (0, X.jsx)(LP.Provider, {
		value: S,
		children: /*#__PURE__*/ (0, X.jsx)(KP, {
			render: a,
			className: r,
			style: o,
			state: b,
			refs: [t, m],
			props: [x, s],
			stateAttributesMapping: MP,
			highlightedIndex: d,
			enableHomeAndEndKeys: !0,
			loopFocus: i,
			orientation: c,
			onHighlightedIndexChange: f,
			onMapChange: l,
			disabledIndices: ua
		})
	});
});
za(), vs();
function JP({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(NP, {
		"data-slot": "tabs",
		"data-orientation": t,
		className: _s("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", e),
		...n
	});
}
var YP = Ra("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-muted",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function XP({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ (0, X.jsx)(qP, {
		"data-slot": "tabs-list",
		"data-variant": t,
		className: _s(YP({ variant: t }), e),
		...n
	});
}
function ZP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(zP, {
		"data-slot": "tabs-trigger",
		className: _s("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-[active]:shadow-sm group-data-[variant=line]/tabs-list:data-[active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent", "data-[active]:bg-background data-[active]:text-foreground dark:data-[active]:border-input dark:data-[active]:bg-input/30 dark:data-[active]:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[active]:after:opacity-100", e),
		...t
	});
}
function QP({ className: e, ...t }) {
	return /* @__PURE__ */ (0, X.jsx)(HP, {
		"data-slot": "tabs-content",
		className: _s("d3-tabs-panel flex-1 text-sm outline-none", e),
		...t
	});
}
Tr(), tx(), Cs(), gy(), Yb(), xM();
function $P({ initialMessage: e = "", onSubmit: t, onGuest: n }) {
	let [r, i] = (0, Z.useState)("login"), [a, o] = (0, Z.useState)(""), [s, c] = (0, Z.useState)(""), [l, u] = (0, Z.useState)(""), [d, f] = (0, Z.useState)(e), [p, m] = (0, Z.useState)(!1);
	return (0, Z.useEffect)(() => f(e), [e]), /* @__PURE__ */ (0, X.jsx)("main", {
		className: "fixed inset-0 z-[2147483647] grid min-h-svh place-items-center overflow-y-auto bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, X.jsxs)(CP, {
			className: "w-full max-w-[380px] animate-ui-enter border-border bg-card shadow-none",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(wP, {
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
						children: [/* @__PURE__ */ (0, X.jsx)(TP, {
							className: "text-xl",
							children: r === "register" ? "Criar conta" : r === "code" ? "Entrar com código" : "Entrar no OrganizeOn"
						}), /* @__PURE__ */ (0, X.jsx)(EP, { children: "Autentique-se para acessar seus jogos e configurações." })]
					})]
				}),
				/* @__PURE__ */ (0, X.jsxs)(DP, { children: [/* @__PURE__ */ (0, X.jsxs)(JP, {
					value: r,
					onValueChange: (e) => {
						i(e), f("");
					},
					children: [/* @__PURE__ */ (0, X.jsxs)(XP, {
						className: "grid h-9 w-full grid-cols-3 bg-muted/70",
						children: [
							/* @__PURE__ */ (0, X.jsx)(ZP, {
								value: "login",
								children: "Entrar"
							}),
							/* @__PURE__ */ (0, X.jsx)(ZP, {
								value: "register",
								children: "Criar conta"
							}),
							/* @__PURE__ */ (0, X.jsx)(ZP, {
								value: "code",
								children: "Código"
							})
						]
					}), /* @__PURE__ */ (0, X.jsx)(QP, {
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
									children: ["Código de login", /* @__PURE__ */ (0, X.jsx)(qb, {
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
									children: ["Usuário", /* @__PURE__ */ (0, X.jsx)(qb, {
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
									children: ["Senha", /* @__PURE__ */ (0, X.jsx)(qb, {
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
				/* @__PURE__ */ (0, X.jsxs)(OP, {
					className: "gap-2 border-t border-border pt-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, X.jsx)(qn, { className: "size-4 shrink-0" }), "Acesse com sua conta OrganizeOn."]
				})
			]
		})
	});
}
function eF(e) {
	return e < 1024 ? `${e} B` : e < 1024 ** 2 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1024 ** 2).toFixed(1)} MB`;
}
function tF(e) {
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
						children: /* @__PURE__ */ (0, X.jsx)(se, {})
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
				/* @__PURE__ */ (0, X.jsxs)(JP, {
					value: p,
					onValueChange: m,
					children: [
						/* @__PURE__ */ (0, X.jsxs)(XP, {
							className: "grid h-9 w-full grid-cols-3 sm:w-auto sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, X.jsx)(ZP, {
									value: "backup",
									children: "Backup"
								}),
								/* @__PURE__ */ (0, X.jsx)(ZP, {
									value: "progress",
									children: "Progressos"
								}),
								/* @__PURE__ */ (0, X.jsx)(ZP, {
									value: "preferences",
									children: "Preferências"
								})
							]
						}),
						/* @__PURE__ */ (0, X.jsx)(QP, {
							value: "backup",
							className: "mt-4",
							children: /* @__PURE__ */ (0, X.jsxs)(CP, { children: [/* @__PURE__ */ (0, X.jsxs)(wP, {
								className: "flex-row items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsxs)(TP, {
									className: "flex items-center gap-2 text-base",
									children: [/* @__PURE__ */ (0, X.jsx)(Pe, { className: "size-4 text-muted-foreground" }), "Backup na nuvem"]
								}), /* @__PURE__ */ (0, X.jsx)(EP, {
									className: "mt-1",
									children: "Sincronize preferências e dados da conta."
								})] }), /* @__PURE__ */ (0, X.jsx)($b, {
									variant: t?.enabled ? "default" : "secondary",
									children: t ? t.enabled ? "Ativo" : "Desativado" : "Consultando"
								})]
							}), /* @__PURE__ */ (0, X.jsxs)(DP, {
								className: "grid gap-4",
								children: [/* @__PURE__ */ (0, X.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3 border-t pt-4 text-sm",
									children: [/* @__PURE__ */ (0, X.jsx)("span", {
										className: "text-muted-foreground",
										children: "Armazenamento utilizado"
									}), /* @__PURE__ */ (0, X.jsxs)("strong", {
										className: "font-mono text-xs sm:text-sm",
										children: [
											t ? eF(t.size || 0) : "—",
											" / ",
											eF(_)
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
						/* @__PURE__ */ (0, X.jsx)(QP, {
							value: "progress",
							className: "mt-4",
							children: /* @__PURE__ */ (0, X.jsxs)(CP, { children: [/* @__PURE__ */ (0, X.jsxs)(wP, { children: [/* @__PURE__ */ (0, X.jsxs)(TP, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, X.jsx)(gt, { className: "size-4 text-muted-foreground" }), "Progresso dos jogos"]
							}), /* @__PURE__ */ (0, X.jsx)(EP, { children: "Os arquivos dos jogos continuam no navegador. Estas ações removem apenas os saves." })] }), /* @__PURE__ */ (0, X.jsxs)(DP, {
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
										children: [/* @__PURE__ */ (0, X.jsxs)(bM, {
											value: a,
											onValueChange: (e) => o(e ?? ""),
											children: [/* @__PURE__ */ (0, X.jsx)(mM, {
												className: "w-full",
												children: /* @__PURE__ */ (0, X.jsx)(pM, { placeholder: "Escolha um jogo" })
											}), /* @__PURE__ */ (0, X.jsx)(hM, { children: r.map((e) => /* @__PURE__ */ (0, X.jsxs)(gM, {
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
						/* @__PURE__ */ (0, X.jsx)(QP, {
							value: "preferences",
							className: "mt-4",
							children: /* @__PURE__ */ (0, X.jsxs)(CP, { children: [/* @__PURE__ */ (0, X.jsxs)(wP, { children: [/* @__PURE__ */ (0, X.jsxs)(TP, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, X.jsx)(Vn, { className: "size-4 text-muted-foreground" }), "Preferências locais"]
							}), /* @__PURE__ */ (0, X.jsx)(EP, { children: "Tema, proxy, identidade do navegador e teclas ficam salvos neste dispositivo." })] }), /* @__PURE__ */ (0, X.jsx)(DP, { children: /* @__PURE__ */ (0, X.jsx)(Y, {
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
				/* @__PURE__ */ (0, X.jsx)(sy, {
					open: d !== null,
					onOpenChange: (e) => !e && f(null),
					children: /* @__PURE__ */ (0, X.jsxs)(uy, { children: [/* @__PURE__ */ (0, X.jsxs)(dy, { children: [/* @__PURE__ */ (0, X.jsx)(py, { children: "Confirmar exclusão" }), /* @__PURE__ */ (0, X.jsx)(my, { children: d === "clear-all" ? "Apagar todos os saves de jogos deste perfil?" : d === "clear-game" ? `Apagar o save de ${a}?` : "Apagar as preferências locais deste dispositivo?" })] }), /* @__PURE__ */ (0, X.jsxs)(fy, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
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
function nF(e) {
	let [t, n] = (0, Z.useState)(e.currentId);
	return /* @__PURE__ */ (0, X.jsx)(sy, {
		open: !0,
		onOpenChange: (t) => {
			t || e.onClose();
		},
		children: /* @__PURE__ */ (0, X.jsxs)(uy, {
			className: "max-h-[min(86svh,760px)] overflow-y-auto sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(dy, { children: [/* @__PURE__ */ (0, X.jsx)(py, { children: "Servidor proxy" }), /* @__PURE__ */ (0, X.jsxs)(my, { children: [e.guestMode ? "Convidados usam apenas servidores públicos externos." : "Escolha o servidor WISP usado pelo cliente.", " A medição representa a abertura do WebSocket neste dispositivo."] })] }),
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
											children: [r.name, r.beta && /* @__PURE__ */ (0, X.jsx)($b, {
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
											children: [/* @__PURE__ */ (0, X.jsx)($n, { className: `size-3 ${i.state === "online" ? "text-emerald-500" : i.state === "offline" ? "text-destructive" : ""}` }), i.label]
										})
									]
								}),
								a && /* @__PURE__ */ (0, X.jsx)(Se, { className: "size-4 text-foreground" })
							]
						}, r.id);
					})
				}),
				/* @__PURE__ */ (0, X.jsx)("p", {
					className: "rounded-md border bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground",
					children: "Servidores beta são operados por terceiros. O tráfego de navegação pode não passar pelo backend OrganizeOn."
				}),
				/* @__PURE__ */ (0, X.jsxs)(fy, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
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
function rF(e) {
	let { type: t, ...n } = e, r = (0, Z.useMemo)(() => t === "login" ? /* @__PURE__ */ (0, X.jsx)($P, { ...n }) : t === "data" ? /* @__PURE__ */ (0, X.jsx)(tF, { ...n }) : t === "proxy" ? /* @__PURE__ */ (0, X.jsx)(nF, { ...n }) : /* @__PURE__ */ (0, X.jsx)(SP, { ...n }), [t, n]);
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: t === "account" ? "organizeon-ui organizeon-overlay-root dark text-foreground" : "organizeon-ui dark min-h-svh bg-background text-foreground",
		children: r
	});
}
Tr(), tx(), Cs();
function iF({ game: e }) {
	let t = e.type === "flash" ? "Flash · Ruffle" : e.type === "external-download" ? "HTML offline" : e.type === "remote" ? "Multiplayer" : "HTML5";
	return /* @__PURE__ */ (0, X.jsxs)(CP, {
		className: "h-full overflow-hidden rounded-lg border-border bg-card p-0 shadow-none transition-colors hover:border-zinc-600",
		children: [/* @__PURE__ */ (0, X.jsx)("img", {
			className: "aspect-[16/10] w-full bg-muted object-cover",
			src: e.cover,
			alt: `Capa de ${e.name}`,
			loading: "lazy"
		}), /* @__PURE__ */ (0, X.jsxs)(DP, {
			className: "grid gap-3 p-3.5 sm:p-4",
			children: [
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "flex flex-wrap gap-1.5",
					children: [
						/* @__PURE__ */ (0, X.jsxs)($b, {
							variant: "secondary",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, X.jsx)(gt, { className: "size-3" }), t]
						}),
						e.platforms.map((e) => /* @__PURE__ */ (0, X.jsx)($b, {
							variant: "outline",
							children: e
						}, e)),
						e.mobileWarning && /* @__PURE__ */ (0, X.jsx)($b, {
							variant: "outline",
							children: "Melhor com teclado"
						}),
						e.trending && /* @__PURE__ */ (0, X.jsxs)($b, {
							variant: "outline",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, X.jsx)(st, { className: "size-3" }), "Em alta"]
						})
					]
				}),
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "flex min-w-0 items-start gap-2",
					children: [/* @__PURE__ */ (0, X.jsx)("h2", {
						className: "min-w-0 flex-1 text-base font-semibold leading-5 tracking-tight",
						children: e.name
					}), /* @__PURE__ */ (0, X.jsx)($b, {
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
							children: [e.type === "external-download" ? /* @__PURE__ */ (0, X.jsx)(Be, {}) : e.type === "remote" ? /* @__PURE__ */ (0, X.jsx)(Cn, {}) : /* @__PURE__ */ (0, X.jsx)(bn, {}), /* @__PURE__ */ (0, X.jsx)("span", {
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
							children: [/* @__PURE__ */ (0, X.jsx)(Qe, {}), "Créditos"]
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
							children: /* @__PURE__ */ (0, X.jsx)(cr, {})
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
Tr(), Cs(), Yb();
function aF({ count: e, categories: t, onBack: n, onQueryChange: r, onFilterChange: i }) {
	let [a, o] = (0, Z.useState)("all"), s = [
		{
			id: "all",
			label: "Todos",
			icon: gt
		},
		{
			id: "trending",
			label: "Em alta",
			icon: st
		},
		{
			id: "flash",
			label: "Flash",
			icon: Cr
		},
		{
			id: "pc",
			label: "PC",
			icon: null
		},
		{
			id: "mobile",
			label: "Celular",
			icon: nr
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
					children: /* @__PURE__ */ (0, X.jsx)(se, {})
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
					children: [/* @__PURE__ */ (0, X.jsx)(Fn, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, X.jsx)(qb, {
						className: "pl-9",
						type: "search",
						"aria-label": "Pesquisar jogos",
						placeholder: `Pesquisar em ${e || "…"} jogos`,
						onChange: (e) => r(e.target.value)
					})]
				})
			]
		}), /* @__PURE__ */ (0, X.jsx)(JP, {
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
				children: /* @__PURE__ */ (0, X.jsx)(XP, {
					"aria-label": "Filtrar jogos",
					className: "h-auto w-max max-w-none flex-nowrap justify-start gap-1 bg-transparent p-0",
					children: s.map(({ id: e, label: t, icon: n }) => /* @__PURE__ */ (0, X.jsxs)(ZP, {
						value: e,
						className: "min-h-8 flex-none gap-1.5 border border-transparent px-2.5 text-xs data-[active]:border-border data-[active]:bg-muted data-[active]:text-foreground",
						children: [n && /* @__PURE__ */ (0, X.jsx)(n, { className: "size-3.5" }), t]
					}, e))
				})
			})
		})]
	});
}
Tr(), Cs(), gy();
function oF({ title: e, description: t, confirmLabel: n = "Continuar", onCancel: r, onConfirm: i }) {
	return /* @__PURE__ */ (0, X.jsx)(sy, {
		open: !0,
		onOpenChange: (e) => !e && r(),
		children: /* @__PURE__ */ (0, X.jsxs)(uy, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, X.jsxs)(dy, { children: [
				/* @__PURE__ */ (0, X.jsx)("div", {
					className: "grid size-9 place-items-center rounded-md border bg-muted",
					children: /* @__PURE__ */ (0, X.jsx)(dr, { className: "size-4 text-muted-foreground" })
				}),
				/* @__PURE__ */ (0, X.jsx)(py, { children: e }),
				/* @__PURE__ */ (0, X.jsx)(my, { children: t })
			] }), /* @__PURE__ */ (0, X.jsxs)(fy, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
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
function sF({ game: e, onClose: t }) {
	return /* @__PURE__ */ (0, X.jsx)(sy, {
		open: !0,
		onOpenChange: (e) => !e && t(),
		children: /* @__PURE__ */ (0, X.jsxs)(uy, {
			className: "max-h-[85svh] overflow-y-auto sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(dy, { children: [/* @__PURE__ */ (0, X.jsxs)(py, { children: ["Créditos · ", e.name] }), /* @__PURE__ */ (0, X.jsx)(my, { children: "Créditos e licença deste jogo." })] }),
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
				/* @__PURE__ */ (0, X.jsx)(fy, { children: /* @__PURE__ */ (0, X.jsx)(Y, {
					onClick: t,
					children: "Fechar"
				}) })
			]
		})
	});
}
function cF({ name: e, definitions: t, selectedKeys: n, defaultKeys: r, isTetris: i, initialLeftHanded: a, onClose: o, onSave: s, onFullscreen: c }) {
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
	return /* @__PURE__ */ (0, X.jsx)(sy, {
		open: !0,
		onOpenChange: (e) => !e && o(),
		children: /* @__PURE__ */ (0, X.jsxs)(uy, {
			className: "max-h-[min(85svh,720px)] overflow-y-auto sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(dy, { children: [/* @__PURE__ */ (0, X.jsxs)(py, { children: ["Teclas · ", e] }), /* @__PURE__ */ (0, X.jsx)(my, { children: "Ative as teclas usadas pelo jogo. A seleção fica salva neste aparelho." })] }),
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
							children: [/* @__PURE__ */ (0, X.jsx)(Kt, {}), "Tela cheia"]
						})
					]
				}),
				/* @__PURE__ */ (0, X.jsxs)(fy, {
					className: "flex-col-reverse sm:flex-row",
					children: [/* @__PURE__ */ (0, X.jsxs)(Y, {
						type: "button",
						variant: "outline",
						onClick: m,
						children: [/* @__PURE__ */ (0, X.jsx)(Mn, {}), "Restaurar padrão"]
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
Tr(), Cs(), xM();
function lF({ title: e, description: t, label: n, value: r, options: i, applyLabel: a = "Aplicar", onApply: o }) {
	let [s, c] = (0, Z.useState)(r), l = s !== r, u = i.find((e) => e.value === s)?.description;
	return /* @__PURE__ */ (0, X.jsxs)(CP, {
		className: "w-full animate-ui-enter",
		children: [/* @__PURE__ */ (0, X.jsxs)(wP, {
			className: "gap-1.5 pb-0 sm:flex sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, X.jsx)(TP, { children: e }), /* @__PURE__ */ (0, X.jsx)(EP, {
					className: "mt-1 max-w-3xl leading-relaxed",
					children: t
				})]
			}), /* @__PURE__ */ (0, X.jsxs)("div", {
				className: "grid w-full gap-2 sm:w-auto sm:min-w-52 sm:grid-cols-[minmax(9rem,1fr)_auto]",
				children: [/* @__PURE__ */ (0, X.jsxs)(bM, {
					value: s,
					onValueChange: (e) => e && c(e),
					children: [/* @__PURE__ */ (0, X.jsx)(mM, {
						"aria-label": n,
						className: "h-9 w-full",
						children: /* @__PURE__ */ (0, X.jsx)(pM, {})
					}), /* @__PURE__ */ (0, X.jsx)(hM, { children: i.map((e) => /* @__PURE__ */ (0, X.jsx)(gM, {
						value: e.value,
						children: e.label
					}, e.value)) })]
				}), /* @__PURE__ */ (0, X.jsxs)(Y, {
					size: "sm",
					disabled: !l,
					onClick: () => o(s),
					children: [l ? /* @__PURE__ */ (0, X.jsx)(Se, { "data-icon": "inline-start" }) : null, a]
				})]
			})]
		}), u ? /* @__PURE__ */ (0, X.jsx)(DP, {
			className: "pt-2 text-xs text-muted-foreground",
			children: u
		}) : null]
	});
}
Tr(), Cs(), Yb();
function uF({ onSubmit: e }) {
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
		children: /* @__PURE__ */ (0, X.jsxs)(CP, {
			className: "w-full max-w-[380px] border-border bg-card shadow-none animate-ui-enter",
			children: [
				/* @__PURE__ */ (0, X.jsxs)(wP, {
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
						children: [/* @__PURE__ */ (0, X.jsx)(TP, {
							className: "text-xl",
							children: "Entrar no painel"
						}), /* @__PURE__ */ (0, X.jsx)(EP, { children: "Autentique-se para acessar o conteúdo do Endpoint 2." })]
					})]
				}),
				/* @__PURE__ */ (0, X.jsx)(DP, { children: /* @__PURE__ */ (0, X.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: (e) => void l(e),
					children: [
						/* @__PURE__ */ (0, X.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Usuário", /* @__PURE__ */ (0, X.jsx)(qb, {
								autoComplete: "username",
								value: t,
								onChange: (e) => n(e.target.value),
								required: !0,
								disabled: s
							})]
						}),
						/* @__PURE__ */ (0, X.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Senha", /* @__PURE__ */ (0, X.jsx)(qb, {
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
							children: [s && /* @__PURE__ */ (0, X.jsx)(Lt, { className: "animate-spin" }), s ? "Entrando…" : "Entrar"]
						})
					]
				}) }),
				/* @__PURE__ */ (0, X.jsxs)(OP, {
					className: "gap-2 border-t border-border pt-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, X.jsx)(qn, { className: "size-4" }), "Acesse com sua conta OrganizeOn."]
				})
			]
		})
	});
}
// src/hooks/use-service-theme.ts
function dF(e) {
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
function fF({ icon: e, active: t }) {
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
Tr(), Cs();
function pF() {
	let { setOpenMobile: e } = rP();
	return /* @__PURE__ */ (0, X.jsx)(mP, { children: /* @__PURE__ */ (0, X.jsx)(hP, { children: /* @__PURE__ */ (0, X.jsxs)(_P, {
		isActive: !0,
		tooltip: "Meus arquivos",
		onClick: () => e(!1),
		children: [/* @__PURE__ */ (0, X.jsx)(it, {}), /* @__PURE__ */ (0, X.jsx)("span", { children: "Meus arquivos" })]
	}) }) });
}
function mF({ children: e, username: t, role: n, logout: r, refresh: i, refreshing: a }) {
	let { rootRef: o, theme: s, toggleTheme: c } = dF("d2-theme");
	return /* @__PURE__ */ (0, X.jsx)("div", {
		ref: o,
		className: "contents",
		children: /* @__PURE__ */ (0, X.jsx)(KN, { children: /* @__PURE__ */ (0, X.jsx)(fN, {
			username: t,
			children: /* @__PURE__ */ (0, X.jsxs)(iP, {
				defaultOpen: !0,
				children: [/* @__PURE__ */ (0, X.jsxs)(aP, {
					collapsible: "icon",
					children: [
						/* @__PURE__ */ (0, X.jsx)(cP, {
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
						/* @__PURE__ */ (0, X.jsx)(uP, {}),
						/* @__PURE__ */ (0, X.jsx)(dP, { children: /* @__PURE__ */ (0, X.jsxs)(fP, { children: [/* @__PURE__ */ (0, X.jsx)(pP, { children: "Workspace" }), /* @__PURE__ */ (0, X.jsx)(pF, {})] }) }),
						/* @__PURE__ */ (0, X.jsx)(lP, {
							className: "px-2 pb-3",
							children: /* @__PURE__ */ (0, X.jsx)(bP, {
								username: t,
								role: n,
								onLogout: r
							})
						})
					]
				}), /* @__PURE__ */ (0, X.jsxs)(sP, {
					className: "min-h-svh min-w-0",
					children: [/* @__PURE__ */ (0, X.jsxs)("header", {
						className: "sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4 sm:px-6",
						children: [
							/* @__PURE__ */ (0, X.jsx)(oP, { "aria-label": "Abrir ou recolher navegação" }),
							/* @__PURE__ */ (0, X.jsx)("span", {
								className: "flex-1 text-sm font-medium",
								children: "Meus arquivos"
							}),
							/* @__PURE__ */ (0, X.jsx)(Y, {
								variant: "ghost",
								size: "icon",
								onClick: c,
								"aria-label": s === "dark" ? "Ativar tema claro" : "Ativar tema escuro",
								children: s === "dark" ? /* @__PURE__ */ (0, X.jsx)(ar, {}) : /* @__PURE__ */ (0, X.jsx)(tn, {})
							}),
							/* @__PURE__ */ (0, X.jsx)(Y, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Atualizar",
								disabled: a,
								onClick: i,
								children: /* @__PURE__ */ (0, X.jsx)(fF, {
									icon: En,
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
Tr(), Cs(), Yb(), gy();
function hF({ username: e, role: t, request: n, upload: r, logout: i }) {
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
	return /* @__PURE__ */ (0, X.jsxs)(mF, {
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
			/* @__PURE__ */ (0, X.jsxs)(CP, { children: [/* @__PURE__ */ (0, X.jsxs)(wP, { children: [/* @__PURE__ */ (0, X.jsx)(TP, { children: "Adicionar arquivo" }), /* @__PURE__ */ (0, X.jsx)(EP, { children: "Selecione um arquivo ou crie um texto." })] }), /* @__PURE__ */ (0, X.jsxs)(DP, {
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
							children: [/* @__PURE__ */ (0, X.jsx)(ut, {}), "Selecionar arquivo"]
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
							children: [/* @__PURE__ */ (0, X.jsx)(mr, {}), "Enviar arquivo"]
						}), /* @__PURE__ */ (0, X.jsxs)(Y, {
							variant: "outline",
							onClick: () => _({
								name: "script.txt",
								content: ""
							}),
							children: [/* @__PURE__ */ (0, X.jsx)(Ye, {}), "Novo texto"]
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
			g && /* @__PURE__ */ (0, X.jsxs)(CP, { children: [/* @__PURE__ */ (0, X.jsx)(wP, { children: /* @__PURE__ */ (0, X.jsx)(TP, { children: g.id ? "Editar texto" : "Novo texto" }) }), /* @__PURE__ */ (0, X.jsx)(DP, { children: /* @__PURE__ */ (0, X.jsxs)("form", {
				className: "grid gap-3",
				onSubmit: (e) => void C(e),
				children: [
					/* @__PURE__ */ (0, X.jsx)(qb, {
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
			/* @__PURE__ */ (0, X.jsxs)(CP, { children: [/* @__PURE__ */ (0, X.jsxs)(wP, { children: [/* @__PURE__ */ (0, X.jsx)(TP, { children: "Arquivos" }), /* @__PURE__ */ (0, X.jsx)(EP, { children: o.length ? `${o.length} arquivo(s)` : "Nenhum arquivo ainda." })] }), /* @__PURE__ */ (0, X.jsx)(DP, {
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
								children: [/* @__PURE__ */ (0, X.jsx)(mn, {}), "Editar"]
							}),
							/* @__PURE__ */ (0, X.jsxs)(Y, {
								variant: "outline",
								size: "sm",
								onClick: () => void T(e),
								children: [/* @__PURE__ */ (0, X.jsx)(Le, {}), "Copiar link"]
							}),
							/* @__PURE__ */ (0, X.jsxs)(Y, {
								variant: "destructive",
								size: "sm",
								onClick: () => y(e),
								children: [/* @__PURE__ */ (0, X.jsx)(cr, {}), "Apagar"]
							})
						]
					})]
				}, e.id))
			})] }),
			/* @__PURE__ */ (0, X.jsx)(sy, {
				open: !!v,
				onOpenChange: (e) => {
					e || y(null);
				},
				children: /* @__PURE__ */ (0, X.jsxs)(uy, { children: [/* @__PURE__ */ (0, X.jsxs)(dy, { children: [/* @__PURE__ */ (0, X.jsx)(py, { children: "Apagar arquivo?" }), /* @__PURE__ */ (0, X.jsx)(my, { children: v?.name })] }), /* @__PURE__ */ (0, X.jsxs)(fy, { children: [/* @__PURE__ */ (0, X.jsx)(Y, {
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
_(), oy();
var gF = /* @__PURE__ */ new WeakMap(), _F = /* @__PURE__ */ new WeakMap(), vF = /* @__PURE__ */ new WeakMap();
function yF(e, t) {
	let n = t?.getRootNode(), r = n instanceof ShadowRoot ? n : document, i = r.querySelector("link[data-organizeon-ui=\"client\"]");
	if (i) return i;
	let a = document.createElement("link");
	return a.rel = "stylesheet", a.href = e, a.dataset.organizeonUi = "client", r instanceof ShadowRoot ? r.append(a) : document.head.append(a), a;
}
function bF(e, t, n) {
	_F.get(e)?.unmount(), yF(n, e);
	let r = (0, As.createRoot)(e);
	(0, js.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui dark min-h-full",
		children: /* @__PURE__ */ (0, X.jsx)(iF, { game: t })
	}))), _F.set(e, r);
}
function xF(e) {
	_F.get(e)?.unmount(), _F.delete(e);
}
function SF(e, t, n) {
	yF(n, e);
	let r = (0, As.createRoot)(e), i = (e) => (0, js.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui organizeon-inline-ui dark",
		children: /* @__PURE__ */ (0, X.jsx)(aF, { ...e })
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
function CF(e, t, n) {
	vF.get(e)?.unmount(), yF(n, e);
	let r = (0, As.createRoot)(e);
	(0, js.flushSync)(() => r.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui organizeon-inline-ui dark",
		children: /* @__PURE__ */ (0, X.jsx)(lF, { ...t })
	}))), vF.set(e, r);
}
function wF(e) {
	vF.get(e)?.unmount(), vF.delete(e);
}
function TF(e, t, n) {
	e.classList.add("organizeon-ui", "organizeon-overlay-root", "dark");
	let r = yF(n, e), i = (0, As.createRoot)(e), a = v(r, () => (0, js.flushSync)(() => i.render(/* @__PURE__ */ (0, X.jsx)("div", {
		className: "organizeon-ui dark",
		children: /* @__PURE__ */ (0, X.jsx)(ty, {
			container: e,
			children: t
		})
	}))));
	return () => {
		a(), i.unmount();
	};
}
function EF(e, t, n, r) {
	return TF(e, /* @__PURE__ */ (0, X.jsx)(sF, {
		game: t,
		onClose: n
	}), r);
}
function DF(e, t, n) {
	return TF(e, /* @__PURE__ */ (0, X.jsx)(cF, { ...t }), n);
}
function OF(e, t, n = "Confirmar ação", r = "Continuar") {
	return new Promise((i) => {
		let a = document.createElement("div");
		a.className = "organizeon-ui dark", document.body.append(a), yF(t, a);
		let o = (0, As.createRoot)(a), s = !1, c = (e) => {
			s || (s = !0, o.unmount(), a.remove(), i(e));
		};
		(0, js.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(ty, {
			container: a,
			children: /* @__PURE__ */ (0, X.jsx)(oF, {
				title: n,
				description: e,
				confirmLabel: r,
				onCancel: () => c(!1),
				onConfirm: () => c(!0)
			})
		})));
	});
}
function kF(e, t, n) {
	gF.get(e)?.root.unmount();
	let r = e.shadowRoot ?? e.attachShadow({ mode: "open" });
	r.replaceChildren();
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = n, r.append(i);
	let a = document.createElement("div");
	a.className = t.type === "account" ? "organizeon-ui organizeon-overlay-root dark" : "organizeon-ui dark", r.append(a);
	let o = (0, As.createRoot)(a);
	return o.render(/* @__PURE__ */ (0, X.jsx)(ty, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(KN, { children: /* @__PURE__ */ (0, X.jsx)(rF, { ...t }) })
	})), gF.set(e, {
		root: o,
		shadow: r,
		container: a
	}), () => {
		let t = gF.get(e);
		t && (t.root.unmount(), t.shadow.replaceChildren(), gF.delete(e));
	};
}
function AF(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui organizeon-overlay-root dark", r.append(i, a);
	let o = (0, As.createRoot)(a), s = v(i, () => (0, js.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(ty, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(KN, { children: /* @__PURE__ */ (0, X.jsx)(rF, { ...t }) })
	}))));
	return () => {
		s(), o.unmount(), r.replaceChildren();
	};
}
function jF(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.className = "organizeon-ui dark", r.append(i, a);
	let o = (0, As.createRoot)(a);
	return (0, js.flushSync)(() => o.render(/* @__PURE__ */ (0, X.jsx)(uF, { onSubmit: t }))), () => {
		o.unmount(), r.replaceChildren();
	};
}
function MF(e, t, n) {
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
	return (0, js.flushSync)(() => s.render(/* @__PURE__ */ (0, X.jsx)(ty, {
		container: a,
		children: /* @__PURE__ */ (0, X.jsx)(hF, { ...t })
	}))), () => {
		s.unmount(), o(), r.replaceChildren();
	};
}
function NF(e, t) {
	gF.get(e)?.root.unmount();
	let n = e.shadowRoot ?? e.attachShadow({ mode: "open" });
	n.replaceChildren();
	let r = document.createElement("link");
	r.rel = "stylesheet", r.href = t, n.append(r);
	let i = document.createElement("div");
	i.className = "organizeon-ui organizeon-overlay-root dark", n.append(i);
	let a = (0, As.createRoot)(i);
	return a.render(/* @__PURE__ */ (0, X.jsx)(ty, {
		container: i,
		children: /* @__PURE__ */ (0, X.jsx)(uc, {
			position: "bottom-right",
			theme: "dark",
			closeButton: !0,
			richColors: !1
		})
	})), gF.set(e, {
		root: a,
		shadow: n,
		container: i
	}), () => {
		a.unmount(), n.replaceChildren(), gF.delete(e);
	};
}
function PF(e, t = "info", n) {
	Js[t](e, n ? { id: n } : void 0);
}
function FF(e) {
	Js.dismiss(e);
}
function IF(e, t, n) {
	let r = e.attachShadow({ mode: "open" }), i = document.createElement("link");
	i.rel = "stylesheet", i.href = n;
	let a = document.createElement("div");
	a.textContent = "Carregando interface…", a.style.cssText = "display:grid;place-items:center;min-height:100svh;background:#09090b;color:#a1a1aa;font:14px system-ui";
	let o = document.createElement("div");
	o.className = "organizeon-ui dark", r.append(i, a, o);
	let s = (0, As.createRoot)(o), c = !1, l = t, u = (e) => {
		l = e, c && (0, js.flushSync)(() => s.render(/* @__PURE__ */ (0, X.jsx)(ty, {
			container: o,
			children: /* @__PURE__ */ (0, X.jsx)(KN, { children: /* @__PURE__ */ (0, X.jsx)(rF, { ...l }) })
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
function LF(e, t, n, r) {
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
export { OF as confirmClientAction, FF as dismissClientToast, SF as mountCatalogToolbar, TF as mountClientDialog, kF as mountClientSurface, NF as mountClientToaster, MF as mountD2Dashboard, jF as mountD2Login, bF as mountGameCard, DF as mountGameControlSettingsDialog, EF as mountGameCreditsDialog, AF as mountNavigation, CF as mountPreferenceCard, IF as mountReactiveSurface, PF as showClientToast, LF as showConnectionToast, xF as unmountGameCard, wF as unmountPreferenceCard };
