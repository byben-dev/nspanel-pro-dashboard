/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, ee = Z.ShadowRoot && (Z.ShadyCSS === void 0 || Z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = Symbol(), ue = /* @__PURE__ */ new WeakMap();
let Ee = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ee && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ue.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ue.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const De = (n) => new Ee(typeof n == "string" ? n : n + "", void 0, te), f = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, s, r) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new Ee(t, n, te);
}, ze = (n, e) => {
  if (ee) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = Z.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, n.appendChild(i);
  }
}, ve = ee ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return De(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Me, defineProperty: ke, getOwnPropertyDescriptor: Fe, getOwnPropertyNames: He, getOwnPropertySymbols: Te, getPrototypeOf: Ue } = Object, Q = globalThis, ge = Q.trustedTypes, je = ge ? ge.emptyScript : "", Ne = Q.reactiveElementPolyfillSupport, k = (n, e) => n, J = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? je : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, se = (n, e) => !Me(n, e), fe = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: se };
Symbol.metadata ??= Symbol("metadata"), Q.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let S = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = fe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && ke(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: r } = Fe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: s, set(a) {
      const l = s?.call(this);
      r?.call(this, a), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? fe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const e = Ue(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const t = this.properties, i = [...He(t), ...Te(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(ve(s));
    } else e !== void 0 && t.push(ve(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ze(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : J).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : J;
      this._$Em = s;
      const l = a.fromAttribute(t, r.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, r) {
    if (e !== void 0) {
      const a = this.constructor;
      if (s === !1 && (r = this[e]), i ??= a.getPropertyOptions(e), !((i.hasChanged ?? se)(r, t) || i.useDefault && i.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: r }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [s, r] of this._$Ep) this[s] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, r] of i) {
        const { wrapped: a } = r, l = this[s];
        a !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, r, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[k("elementProperties")] = /* @__PURE__ */ new Map(), S[k("finalized")] = /* @__PURE__ */ new Map(), Ne?.({ ReactiveElement: S }), (Q.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = globalThis, me = (n) => n, K = ie.trustedTypes, $e = K ? K.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Pe = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, Ce = "?" + y, Be = `<${Ce}>`, E = document, F = () => E.createComment(""), H = (n) => n === null || typeof n != "object" && typeof n != "function", ne = Array.isArray, Re = (n) => ne(n) || typeof n?.[Symbol.iterator] == "function", Y = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _e = /-->/g, ye = />/g, A = RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, xe = /"/g, Se = /^(?:script|style|textarea|title)$/i, Le = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), c = Le(1), O = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), Ae = /* @__PURE__ */ new WeakMap(), w = E.createTreeWalker(E, 129);
function Oe(n, e) {
  if (!ne(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $e !== void 0 ? $e.createHTML(e) : e;
}
const Ve = (n, e) => {
  const t = n.length - 1, i = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = M;
  for (let l = 0; l < t; l++) {
    const o = n[l];
    let p, v, h = -1, m = 0;
    for (; m < o.length && (a.lastIndex = m, v = a.exec(o), v !== null); ) m = a.lastIndex, a === M ? v[1] === "!--" ? a = _e : v[1] !== void 0 ? a = ye : v[2] !== void 0 ? (Se.test(v[2]) && (s = RegExp("</" + v[2], "g")), a = A) : v[3] !== void 0 && (a = A) : a === A ? v[0] === ">" ? (a = s ?? M, h = -1) : v[1] === void 0 ? h = -2 : (h = a.lastIndex - v[2].length, p = v[1], a = v[3] === void 0 ? A : v[3] === '"' ? xe : be) : a === xe || a === be ? a = A : a === _e || a === ye ? a = M : (a = A, s = void 0);
    const _ = a === A && n[l + 1].startsWith("/>") ? " " : "";
    r += a === M ? o + Be : h >= 0 ? (i.push(p), o.slice(0, h) + Pe + o.slice(h) + y + _) : o + y + (h === -2 ? l : _);
  }
  return [Oe(n, r + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class T {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const l = e.length - 1, o = this.parts, [p, v] = Ve(e, t);
    if (this.el = T.createElement(p, i), w.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = w.nextNode()) !== null && o.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Pe)) {
          const m = v[a++], _ = s.getAttribute(h).split(y), G = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: r, name: G[2], strings: _, ctor: G[1] === "." ? We : G[1] === "?" ? qe : G[1] === "@" ? Ge : X }), s.removeAttribute(h);
        } else h.startsWith(y) && (o.push({ type: 6, index: r }), s.removeAttribute(h));
        if (Se.test(s.tagName)) {
          const h = s.textContent.split(y), m = h.length - 1;
          if (m > 0) {
            s.textContent = K ? K.emptyScript : "";
            for (let _ = 0; _ < m; _++) s.append(h[_], F()), w.nextNode(), o.push({ type: 2, index: ++r });
            s.append(h[m], F());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ce) o.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(y, h + 1)) !== -1; ) o.push({ type: 7, index: r }), h += y.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = E.createElement("template");
    return i.innerHTML = e, i;
  }
}
function D(n, e, t = n, i) {
  if (e === O) return e;
  let s = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const r = H(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = s : t._$Cl = s), s !== void 0 && (e = D(n, s._$AS(n, e.values), s, i)), e;
}
class Ie {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, s = (e?.creationScope ?? E).importNode(t, !0);
    w.currentNode = s;
    let r = w.nextNode(), a = 0, l = 0, o = i[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let p;
        o.type === 2 ? p = new I(r, r.nextSibling, this, e) : o.type === 1 ? p = new o.ctor(r, o.name, o.strings, this, e) : o.type === 6 && (p = new Ze(r, this, e)), this._$AV.push(p), o = i[++l];
      }
      a !== o?.index && (r = w.nextNode(), a++);
    }
    return w.currentNode = E, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class I {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = D(this, e, t), H(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== O && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Re(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && H(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = T.createElement(Oe(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(t);
    else {
      const r = new Ie(s, this), a = r.u(this.options);
      r.p(t), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = Ae.get(e.strings);
    return t === void 0 && Ae.set(e.strings, t = new T(e)), t;
  }
  k(e) {
    ne(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const r of e) s === t.length ? t.push(i = new I(this.O(F()), this.O(F()), this, this.options)) : i = t[s], i._$AI(r), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = me(e).nextSibling;
      me(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(e, t = this, i, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = D(this, e, t, 0), a = !H(e) || e !== this._$AH && e !== O, a && (this._$AH = e);
    else {
      const l = e;
      let o, p;
      for (e = r[0], o = 0; o < r.length - 1; o++) p = D(this, l[i + o], t, o), p === O && (p = this._$AH[o]), a ||= !H(p) || p !== this._$AH[o], p === d ? e = d : e !== d && (e += (p ?? "") + r[o + 1]), this._$AH[o] = p;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class We extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class qe extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class Ge extends X {
  constructor(e, t, i, s, r) {
    super(e, t, i, s, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = D(this, e, t, 0) ?? d) === O) return;
    const i = this._$AH, s = e === d && i !== d || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== d && (i === d || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ze {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    D(this, e);
  }
}
const Je = ie.litHtmlPolyfillSupport;
Je?.(T, I), (ie.litHtmlVersions ??= []).push("3.3.3");
const Ke = (n, e, t) => {
  const i = t?.renderBefore ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = t?.renderBefore ?? null;
    i._$litPart$ = s = new I(e.insertBefore(F(), r), r, void 0, t ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = globalThis;
class g extends S {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ke(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return O;
  }
}
g._$litElement$ = !0, g.finalized = !0, re.litElementHydrateSupport?.({ LitElement: g });
const Qe = re.litElementPolyfillSupport;
Qe?.({ LitElement: g });
(re.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $ = (n) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xe = { attribute: !0, type: String, converter: J, reflect: !1, hasChanged: se }, Ye = (n = Xe, e, t) => {
  const { kind: i, metadata: s } = t;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(t.name, n), i === "accessor") {
    const { name: a } = t;
    return { set(l) {
      const o = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(a, o, n, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(a, void 0, n, l), l;
    } };
  }
  if (i === "setter") {
    const { name: a } = t;
    return function(l) {
      const o = this[a];
      e.call(this, l), this.requestUpdate(a, o, n, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function u(n) {
  return (e, t) => typeof t == "object" ? Ye(n, e, t) : ((i, s, r) => {
    const a = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), a ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(n, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function C(n) {
  return u({ ...n, state: !0, attribute: !1 });
}
const x = f`
  :host {
    /* --- Light Mode --- */
    --nsp-bg:            #FFFFFF;
    --nsp-bg-secondary:  #F2F2F7;
    --nsp-bg-tertiary:   #E5E5EA;
    --nsp-surface:       #FFFFFF;
    --nsp-surface-2:     #F2F2F7;
    --nsp-surface-3:     #E5E5EA;

    --nsp-text-1:        #000000;
    --nsp-text-2:        #3C3C43CC;
    --nsp-text-3:        #3C3C4399;
    --nsp-separator:     rgba(60,60,67,0.12);

    --nsp-accent:        #007AFF;
    --nsp-green:         #34C759;
    --nsp-red:           #FF3B30;
    --nsp-orange:        #FF9500;
    --nsp-yellow:        #FFCC00;
    --nsp-teal:          #5AC8FA;
    --nsp-purple:        #AF52DE;

    /* Typography */
    --nsp-font: -apple-system, "SF Pro Display", "SF Pro Text", system-ui, sans-serif;

    /* Spacing */
    --nsp-s1: 4px;
    --nsp-s2: 8px;
    --nsp-s3: 12px;
    --nsp-s4: 16px;
    --nsp-s5: 20px;
    --nsp-s6: 24px;

    /* Radius */
    --nsp-r1: 8px;
    --nsp-r2: 12px;
    --nsp-r3: 16px;
    --nsp-r4: 24px;

    /* Nav */
    --nsp-nav-h: 60px;
    --nsp-nav-bg: rgba(242,242,247,0.85);
  }

  /* --- Dark Mode --- */
  :host([dark]), .nsp-dark {
    --nsp-bg:            #000000;
    --nsp-bg-secondary:  #1C1C1E;
    --nsp-bg-tertiary:   #2C2C2E;
    --nsp-surface:       #1C1C1E;
    --nsp-surface-2:     #2C2C2E;
    --nsp-surface-3:     #3A3A3C;

    --nsp-text-1:        #FFFFFF;
    --nsp-text-2:        #EBEBF599;
    --nsp-text-3:        #EBEBF54D;
    --nsp-separator:     rgba(84,84,88,0.6);

    --nsp-accent:        #0A84FF;
    --nsp-green:         #30D158;
    --nsp-red:           #FF453A;
    --nsp-orange:        #FF9F0A;
    --nsp-yellow:        #FFD60A;
    --nsp-teal:          #64D2FF;
    --nsp-purple:        #BF5AF2;

    --nsp-nav-bg: rgba(28,28,30,0.85);
  }
`, W = f`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .page {
    width: 100%;
    height: 100%;
    padding: var(--nsp-s4);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--nsp-s3);
    overflow: hidden;
  }
  .card {
    background: var(--nsp-surface-2);
    border-radius: var(--nsp-r3);
    padding: var(--nsp-s4);
  }
  .label {
    font-family: var(--nsp-font);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--nsp-text-2);
  }
  .value {
    font-family: var(--nsp-font);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--nsp-text-1);
  }
`;
var et = Object.defineProperty, tt = Object.getOwnPropertyDescriptor, ae = (n, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? tt(e, t) : e, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && et(e, t, s), s;
};
const st = {
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  climate: "M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.52V18h-4v-4.48A5 5 0 0 1 7 9a5 5 0 0 1 5-5z",
  blinds: "M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z",
  media: "M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z",
  energy: "M7 2v11h3v9l7-12h-4l4-8z"
}, we = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy"
};
let U = class extends g {
  constructor() {
    super(...arguments), this.pages = [], this.activePage = "home";
  }
  _tap(n) {
    this.dispatchEvent(new CustomEvent("page-change", { detail: { page: n }, bubbles: !0, composed: !0 }));
  }
  render() {
    return c`
      <nav>
        ${this.pages.map((n) => c`
          <button
            class=${n === this.activePage ? "active" : ""}
            @click=${() => this._tap(n)}
            aria-label=${we[n]}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d=${st[n]} />
            </svg>
            <span>${we[n]}</span>
          </button>
        `)}
      </nav>
    `;
  }
};
U.styles = [x, f`
    :host { display: block; }

    nav {
      height: var(--nsp-nav-h);
      background: var(--nsp-nav-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-top: 0.5px solid var(--nsp-separator);
      display: flex;
      align-items: stretch;
    }

    button {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      color: var(--nsp-text-3);
      transition: color 0.15s;
      -webkit-tap-highlight-color: transparent;
    }

    button.active {
      color: var(--nsp-accent);
    }

    button svg {
      flex-shrink: 0;
    }

    span {
      font-family: var(--nsp-font);
      font-size: 10px;
      font-weight: 500;
      letter-spacing: -0.01em;
    }
  `];
ae([
  u({ type: Array })
], U.prototype, "pages", 2);
ae([
  u({ type: String })
], U.prototype, "activePage", 2);
U = ae([
  $("nspanel-bottom-nav")
], U);
var it = Object.defineProperty, nt = Object.getOwnPropertyDescriptor, oe = (n, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? nt(e, t) : e, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && it(e, t, s), s;
};
let j = class extends g {
  constructor() {
    super(...arguments), this.cameraEntity = "";
  }
  _dismiss() {
    this.dispatchEvent(new CustomEvent("dismiss", { bubbles: !0, composed: !0 }));
  }
  render() {
    return c`
      <div class="overlay">
        <div class="popup">
          <div class="header">
            <div class="bell">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
            </div>
            <span class="title">Doorbell</span>
          </div>

          ${this.cameraEntity ? c`
            <div class="stream">
              <ha-camera-stream
                .hass=${this.hass}
                .stateObj=${this.hass.states[this.cameraEntity]}
                muted
                autoPlay
              ></ha-camera-stream>
            </div>
          ` : c`
            <div class="stream no-cam">
              <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48" style="opacity:0.3">
                <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
            </div>
          `}

          <button class="dismiss" @click=${this._dismiss}>Dismiss</button>
        </div>
      </div>
    `;
  }
};
j.styles = [x, f`
    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .popup {
      background: var(--nsp-surface);
      border-radius: var(--nsp-r4);
      width: 340px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 24px 64px rgba(0,0,0,0.4);
    }

    .header {
      display: flex;
      align-items: center;
      gap: var(--nsp-s3);
      padding: var(--nsp-s4) var(--nsp-s5);
    }

    .bell {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--nsp-orange);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .title {
      font-family: var(--nsp-font);
      font-size: 17px;
      font-weight: 600;
      color: var(--nsp-text-1);
    }

    .stream {
      width: 100%;
      aspect-ratio: 4/3;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stream ha-camera-stream {
      width: 100%;
      height: 100%;
    }

    .no-cam {
      color: white;
    }

    .dismiss {
      margin: var(--nsp-s4);
      padding: var(--nsp-s3) var(--nsp-s4);
      border-radius: var(--nsp-r2);
      border: none;
      background: var(--nsp-bg-secondary);
      color: var(--nsp-accent);
      font-family: var(--nsp-font);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
  `];
oe([
  u({ attribute: !1 })
], j.prototype, "hass", 2);
oe([
  u({ type: String })
], j.prototype, "cameraEntity", 2);
j = oe([
  $("nspanel-doorbell-popup")
], j);
var rt = Object.defineProperty, at = Object.getOwnPropertyDescriptor, q = (n, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? at(e, t) : e, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && rt(e, t, s), s;
};
let P = class extends g {
  constructor() {
    super(...arguments), this._time = "", this._date = "";
  }
  connectedCallback() {
    super.connectedCallback(), this._tick(), this._timer = window.setInterval(() => this._tick(), 1e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this._timer);
  }
  _tick() {
    const n = /* @__PURE__ */ new Date();
    this._time = n.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" }), this._date = n.toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long" });
  }
  get _weather() {
    return this.config?.weather_entity ? this.hass?.states[this.config.weather_entity] ?? null : null;
  }
  render() {
    const n = this._weather, e = n ? `${Math.round(n.attributes.temperature)}°` : null, t = n?.state ?? null;
    return c`
      <div class="page">

        <!-- Clock -->
        <div class="clock-block">
          <div class="time">${this._time}</div>
          <div class="date">${this._date}</div>
        </div>

        <!-- Weather -->
        ${n ? c`
          <div class="card weather-row">
            <div class="weather-temp">${e}</div>
            <div class="weather-condition">${t}</div>
          </div>
        ` : ""}

        <!-- Placeholders for next events, trash — coming soon -->
        <div class="coming-soon">
          <span>Weather · Calendar · Trash · Presence</span><br/>
          <span>— coming in next session —</span>
        </div>

      </div>
    `;
  }
};
P.styles = [x, W, f`
    .clock-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--nsp-s5) 0 var(--nsp-s3);
    }

    .time {
      font-family: var(--nsp-font);
      font-size: 72px;
      font-weight: 300;
      letter-spacing: -0.04em;
      color: var(--nsp-text-1);
      line-height: 1;
    }

    .date {
      font-family: var(--nsp-font);
      font-size: 15px;
      font-weight: 400;
      color: var(--nsp-text-2);
      margin-top: var(--nsp-s2);
    }

    .weather-row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s3);
    }

    .weather-temp {
      font-family: var(--nsp-font);
      font-size: 32px;
      font-weight: 600;
      color: var(--nsp-text-1);
    }

    .weather-condition {
      font-family: var(--nsp-font);
      font-size: 15px;
      color: var(--nsp-text-2);
      text-transform: capitalize;
    }

    .coming-soon {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
      line-height: 1.8;
    }
  `];
q([
  u({ attribute: !1 })
], P.prototype, "hass", 2);
q([
  u({ attribute: !1 })
], P.prototype, "config", 2);
q([
  C()
], P.prototype, "_time", 2);
q([
  C()
], P.prototype, "_date", 2);
P = q([
  $("nspanel-page-home")
], P);
var ot = Object.defineProperty, lt = Object.getOwnPropertyDescriptor, le = (n, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? lt(e, t) : e, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && ot(e, t, s), s;
};
let N = class extends g {
  render() {
    return c`
      <div class="page">
        <div class="coming-soon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style="opacity:0.2; margin-bottom: 12px">
            <path d="M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7z"/>
          </svg>
          <div>Climate</div>
          <div>Thermostat · Underfloor Heating</div>
          <div>— coming soon —</div>
        </div>
      </div>
    `;
  }
};
N.styles = [x, W, ht];
le([
  u({ attribute: !1 })
], N.prototype, "hass", 2);
le([
  u({ attribute: !1 })
], N.prototype, "config", 2);
N = le([
  $("nspanel-page-climate")
], N);
const ht = f`
  .coming-soon {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: var(--nsp-font);
    font-size: 13px;
    color: var(--nsp-text-3);
    line-height: 2;
  }
  .coming-soon div:first-of-type {
    font-size: 17px;
    font-weight: 600;
    color: var(--nsp-text-2);
  }
`;
var ct = Object.defineProperty, pt = Object.getOwnPropertyDescriptor, he = (n, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? pt(e, t) : e, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && ct(e, t, s), s;
};
let B = class extends g {
  render() {
    return c`
      <div class="page">
        <div class="coming-soon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style="opacity:0.2; margin-bottom: 12px">
            <path d="M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z"/>
          </svg>
          <div>Blinds</div>
          <div>8 Covers · Individual + Scenes</div>
          <div>— coming soon —</div>
        </div>
      </div>
    `;
  }
};
B.styles = [x, W, f`
    .coming-soon {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
      line-height: 2;
    }
    .coming-soon div:first-of-type {
      font-size: 17px;
      font-weight: 600;
      color: var(--nsp-text-2);
    }
  `];
he([
  u({ attribute: !1 })
], B.prototype, "hass", 2);
he([
  u({ attribute: !1 })
], B.prototype, "config", 2);
B = he([
  $("nspanel-page-blinds")
], B);
var dt = Object.defineProperty, ut = Object.getOwnPropertyDescriptor, ce = (n, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? ut(e, t) : e, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && dt(e, t, s), s;
};
let R = class extends g {
  render() {
    return c`
      <div class="page">
        <div class="coming-soon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style="opacity:0.2; margin-bottom: 12px">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
          </svg>
          <div>Media</div>
          <div>Spotify · Radio</div>
          <div>— coming soon —</div>
        </div>
      </div>
    `;
  }
};
R.styles = [x, W, f`
    .coming-soon {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
      line-height: 2;
    }
    .coming-soon div:first-of-type {
      font-size: 17px;
      font-weight: 600;
      color: var(--nsp-text-2);
    }
  `];
ce([
  u({ attribute: !1 })
], R.prototype, "hass", 2);
ce([
  u({ attribute: !1 })
], R.prototype, "config", 2);
R = ce([
  $("nspanel-page-media")
], R);
var vt = Object.defineProperty, gt = Object.getOwnPropertyDescriptor, pe = (n, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? gt(e, t) : e, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && vt(e, t, s), s;
};
let L = class extends g {
  render() {
    return c`
      <div class="page">
        <div class="coming-soon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style="opacity:0.2; margin-bottom: 12px">
            <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
          </svg>
          <div>Energy</div>
          <div>PV · Tesla · evcc · Garden Light</div>
          <div>— coming soon —</div>
        </div>
      </div>
    `;
  }
};
L.styles = [x, W, f`
    .coming-soon {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
      line-height: 2;
    }
    .coming-soon div:first-of-type {
      font-size: 17px;
      font-weight: 600;
      color: var(--nsp-text-2);
    }
  `];
pe([
  u({ attribute: !1 })
], L.prototype, "hass", 2);
pe([
  u({ attribute: !1 })
], L.prototype, "config", 2);
L = pe([
  $("nspanel-page-energy")
], L);
var ft = Object.defineProperty, mt = Object.getOwnPropertyDescriptor, de = (n, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? mt(e, t) : e, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && ft(e, t, s), s;
};
const $t = [
  { id: "home", label: "Home" },
  { id: "climate", label: "Climate" },
  { id: "blinds", label: "Blinds" },
  { id: "media", label: "Media" },
  { id: "energy", label: "Energy" }
];
let V = class extends g {
  setConfig(n) {
    this._config = n;
  }
  _changed(n, e) {
    this._config = { ...this._config, [n]: e }, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 }));
  }
  _togglePage(n) {
    const e = [...this._config.pages ?? ["home"]], t = e.indexOf(n);
    t >= 0 ? e.length > 1 && e.splice(t, 1) : e.push(n), this._changed("pages", e);
  }
  render() {
    if (!this._config) return c``;
    const n = this._config, e = n.pages ?? ["home"];
    return c`
      <div class="editor">

        <div class="section-title">Pages</div>
        <div class="page-chips">
          ${$t.map((t) => c`
            <button
              class="chip ${e.includes(t.id) ? "active" : ""}"
              @click=${() => this._togglePage(t.id)}
            >${t.label}</button>
          `)}
        </div>

        <div class="section-title">Home</div>
        <ha-entity-picker
          label="Weather Entity"
          .hass=${this.hass}
          .value=${n.weather_entity ?? ""}
          .includeDomains=${["weather"]}
          @value-changed=${(t) => this._changed("weather_entity", t.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Calendar Entity"
          .hass=${this.hass}
          .value=${n.calendar_entity ?? ""}
          .includeDomains=${["calendar"]}
          @value-changed=${(t) => this._changed("calendar_entity", t.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Trash / Waste Collection Sensor"
          .hass=${this.hass}
          .value=${n.trash_entity ?? ""}
          .includeDomains=${["sensor"]}
          @value-changed=${(t) => this._changed("trash_entity", t.detail.value)}
        ></ha-entity-picker>

        <div class="section-title">Climate</div>
        <ha-entity-picker
          label="Thermostat Entity"
          .hass=${this.hass}
          .value=${n.thermostat_entity ?? ""}
          .includeDomains=${["climate"]}
          @value-changed=${(t) => this._changed("thermostat_entity", t.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Indoor Temperature Sensor"
          .hass=${this.hass}
          .value=${n.indoor_temp_entity ?? ""}
          .includeDomains=${["sensor"]}
          @value-changed=${(t) => this._changed("indoor_temp_entity", t.detail.value)}
        ></ha-entity-picker>

        <div class="section-title">Blinds</div>
        <ha-entity-picker
          label="Scene: All Up"
          .hass=${this.hass}
          .value=${n.scene_up ?? ""}
          .includeDomains=${["scene", "script"]}
          @value-changed=${(t) => this._changed("scene_up", t.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Scene: All Down"
          .hass=${this.hass}
          .value=${n.scene_down ?? ""}
          .includeDomains=${["scene", "script"]}
          @value-changed=${(t) => this._changed("scene_down", t.detail.value)}
        ></ha-entity-picker>

        <div class="section-title">Media</div>
        <ha-entity-picker
          label="Media Player"
          .hass=${this.hass}
          .value=${n.media_player ?? ""}
          .includeDomains=${["media_player"]}
          @value-changed=${(t) => this._changed("media_player", t.detail.value)}
        ></ha-entity-picker>

        <div class="section-title">Energy</div>
        <ha-entity-picker
          label="PV Power Sensor"
          .hass=${this.hass}
          .value=${n.pv_entity ?? ""}
          .includeDomains=${["sensor"]}
          @value-changed=${(t) => this._changed("pv_entity", t.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Grid Power Sensor"
          .hass=${this.hass}
          .value=${n.grid_entity ?? ""}
          .includeDomains=${["sensor"]}
          @value-changed=${(t) => this._changed("grid_entity", t.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="EV / Tesla SoC Sensor"
          .hass=${this.hass}
          .value=${n.ev_entity ?? ""}
          .includeDomains=${["sensor"]}
          @value-changed=${(t) => this._changed("ev_entity", t.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Garden Light"
          .hass=${this.hass}
          .value=${n.garden_light ?? ""}
          .includeDomains=${["light", "switch"]}
          @value-changed=${(t) => this._changed("garden_light", t.detail.value)}
        ></ha-entity-picker>

        <div class="section-title">Doorbell</div>
        <ha-entity-picker
          label="Doorbell Trigger (binary_sensor)"
          .hass=${this.hass}
          .value=${n.doorbell_trigger ?? ""}
          .includeDomains=${["binary_sensor"]}
          @value-changed=${(t) => this._changed("doorbell_trigger", t.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Doorbell Camera"
          .hass=${this.hass}
          .value=${n.doorbell_camera ?? ""}
          .includeDomains=${["camera"]}
          @value-changed=${(t) => this._changed("doorbell_camera", t.detail.value)}
        ></ha-entity-picker>

      </div>
    `;
  }
};
V.styles = f`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 4px 0;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color);
      margin-top: 12px;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--divider-color);
    }
    .page-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .chip {
      padding: 6px 14px;
      border-radius: 980px;
      border: 1.5px solid var(--divider-color);
      background: none;
      cursor: pointer;
      font-size: 13px;
      color: var(--primary-text-color);
    }
    .chip.active {
      border-color: var(--primary-color);
      background: var(--primary-color);
      color: white;
    }
    ha-entity-picker {
      display: block;
    }
  `;
de([
  u({ attribute: !1 })
], V.prototype, "hass", 2);
de([
  C()
], V.prototype, "_config", 2);
V = de([
  $("nspanel-dashboard-editor")
], V);
var _t = Object.defineProperty, yt = Object.getOwnPropertyDescriptor, z = (n, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? yt(e, t) : e, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && _t(e, t, s), s;
};
let b = class extends g {
  constructor() {
    super(...arguments), this._activePage = "home", this._doorbellActive = !1, this._dark = !1;
  }
  static getConfigElement() {
    return document.createElement("nspanel-dashboard-editor");
  }
  static getStubConfig() {
    return { pages: ["home", "climate", "blinds", "media", "energy"] };
  }
  setConfig(n) {
    if (!n) throw new Error("Invalid config");
    this._config = n;
    const e = n.pages ?? ["home"];
    e.includes(this._activePage) || (this._activePage = e[0]);
  }
  updated(n) {
    if (n.has("hass") && this.hass) {
      this._dark = this.hass.themes?.darkMode ?? !1;
      const e = this._config?.doorbell_trigger;
      if (e) {
        const i = n.get("hass")?.states[e]?.state !== "on", s = this.hass.states[e]?.state === "on";
        i && s && (this._doorbellActive = !0);
      }
    }
  }
  get _pages() {
    return this._config?.pages ?? ["home"];
  }
  render() {
    if (!this._config) return c``;
    const n = this._dark;
    return c`
      <div class="shell ${n ? "nsp-dark" : ""}">
        <div class="content">
          ${this._renderPage()}
        </div>

        <nspanel-bottom-nav
          .pages=${this._pages}
          .activePage=${this._activePage}
          @page-change=${(e) => {
      this._activePage = e.detail.page;
    }}
        ></nspanel-bottom-nav>

        ${this._doorbellActive ? c`
          <nspanel-doorbell-popup
            .hass=${this.hass}
            .cameraEntity=${this._config.doorbell_camera ?? ""}
            @dismiss=${() => {
      this._doorbellActive = !1;
    }}
          ></nspanel-doorbell-popup>
        ` : ""}
      </div>
    `;
  }
  _renderPage() {
    const n = this.hass, e = this._config;
    switch (this._activePage) {
      case "home":
        return c`<nspanel-page-home    .hass=${n} .config=${e}></nspanel-page-home>`;
      case "climate":
        return c`<nspanel-page-climate .hass=${n} .config=${e}></nspanel-page-climate>`;
      case "blinds":
        return c`<nspanel-page-blinds  .hass=${n} .config=${e}></nspanel-page-blinds>`;
      case "media":
        return c`<nspanel-page-media   .hass=${n} .config=${e}></nspanel-page-media>`;
      case "energy":
        return c`<nspanel-page-energy  .hass=${n} .config=${e}></nspanel-page-energy>`;
      default:
        return c``;
    }
  }
};
b.styles = [x, f`
    :host {
      display: block;
    }
    .shell {
      width: 100%;
      height: 100%;
      min-height: 480px;
      display: flex;
      flex-direction: column;
      background: var(--nsp-bg);
      overflow: hidden;
      position: relative;
    }
    .content {
      flex: 1;
      overflow: hidden;
      position: relative;
    }
  `];
z([
  u({ attribute: !1 })
], b.prototype, "hass", 2);
z([
  C()
], b.prototype, "_config", 2);
z([
  C()
], b.prototype, "_activePage", 2);
z([
  C()
], b.prototype, "_doorbellActive", 2);
z([
  C()
], b.prototype, "_dark", 2);
b = z([
  $("nspanel-dashboard")
], b);
export {
  b as NspanelDashboard
};
