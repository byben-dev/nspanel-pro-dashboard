/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, at = K.ShadowRoot && (K.ShadyCSS === void 0 || K.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ot = Symbol(), ut = /* @__PURE__ */ new WeakMap();
let zt = class {
  constructor(t, s, r) {
    if (this._$cssResult$ = !0, r !== ot) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (at && t === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (t = ut.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && ut.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Nt = (e) => new zt(typeof e == "string" ? e : e + "", void 0, ot), g = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((r, n, i) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[i + 1], e[0]);
  return new zt(s, e, ot);
}, Ft = (e, t) => {
  if (at) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const r = document.createElement("style"), n = K.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = s.cssText, e.appendChild(r);
  }
}, ft = at ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const r of t.cssRules) s += r.cssText;
  return Nt(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ht, defineProperty: jt, getOwnPropertyDescriptor: Lt, getOwnPropertyNames: Ut, getOwnPropertySymbols: Bt, getPrototypeOf: Rt } = Object, Y = globalThis, gt = Y.trustedTypes, Vt = gt ? gt.emptyScript : "", It = Y.reactiveElementPolyfillSupport, L = (e, t) => e, q = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Vt : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, lt = (e, t) => !Ht(e, t), mt = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: lt };
Symbol.metadata ??= Symbol("metadata"), Y.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = mt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const r = Symbol(), n = this.getPropertyDescriptor(t, r, s);
      n !== void 0 && jt(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, s, r) {
    const { get: n, set: i } = Lt(this.prototype, t) ?? { get() {
      return this[s];
    }, set(a) {
      this[s] = a;
    } };
    return { get: n, set(a) {
      const c = n?.call(this);
      i?.call(this, a), this.requestUpdate(t, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const t = Rt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const s = this.properties, r = [...Ut(s), ...Bt(s)];
      for (const n of r) this.createProperty(n, s[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [r, n] of s) this.elementProperties.set(r, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, r] of this.elementProperties) {
      const n = this._$Eu(s, r);
      n !== void 0 && this._$Eh.set(n, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const n of r) s.unshift(ft(n));
    } else t !== void 0 && s.push(ft(t));
    return s;
  }
  static _$Eu(t, s) {
    const r = s.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const r of s.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ft(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, s, r) {
    this._$AK(t, r);
  }
  _$ET(t, s) {
    const r = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, r);
    if (n !== void 0 && r.reflect === !0) {
      const i = (r.converter?.toAttribute !== void 0 ? r.converter : q).toAttribute(s, r.type);
      this._$Em = t, i == null ? this.removeAttribute(n) : this.setAttribute(n, i), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const r = this.constructor, n = r._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const i = r.getPropertyOptions(n), a = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : q;
      this._$Em = n;
      const c = a.fromAttribute(s, i.type);
      this[n] = c ?? this._$Ej?.get(n) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, s, r, n = !1, i) {
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (i = this[t]), r ??= a.getPropertyOptions(t), !((r.hasChanged ?? lt)(i, s) || r.useDefault && r.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, r)))) return;
      this.C(t, s, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: r, reflect: n, wrapped: i }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? s ?? this[t]), i !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (s = void 0), this._$AL.set(t, s)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, i] of this._$Ep) this[n] = i;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [n, i] of r) {
        const { wrapped: a } = i, c = this[n];
        a !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, i, c);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((s) => s.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((s) => this._$ET(s, this[s])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[L("elementProperties")] = /* @__PURE__ */ new Map(), S[L("finalized")] = /* @__PURE__ */ new Map(), It?.({ ReactiveElement: S }), (Y.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = globalThis, bt = (e) => e, Z = ct.trustedTypes, _t = Z ? Z.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ot = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, Mt = "?" + y, Wt = `<${Mt}>`, C = document, U = () => C.createComment(""), B = (e) => e === null || typeof e != "object" && typeof e != "function", pt = Array.isArray, Jt = (e) => pt(e) || typeof e?.[Symbol.iterator] == "function", rt = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yt = /-->/g, $t = />/g, A = RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xt = /'/g, wt = /"/g, Dt = /^(?:script|style|textarea|title)$/i, Kt = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), o = Kt(1), k = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), At = /* @__PURE__ */ new WeakMap(), E = C.createTreeWalker(C, 129);
function Tt(e, t) {
  if (!pt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return _t !== void 0 ? _t.createHTML(t) : t;
}
const qt = (e, t) => {
  const s = e.length - 1, r = [];
  let n, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = j;
  for (let c = 0; c < s; c++) {
    const l = e[c];
    let p, v, d = -1, m = 0;
    for (; m < l.length && (a.lastIndex = m, v = a.exec(l), v !== null); ) m = a.lastIndex, a === j ? v[1] === "!--" ? a = yt : v[1] !== void 0 ? a = $t : v[2] !== void 0 ? (Dt.test(v[2]) && (n = RegExp("</" + v[2], "g")), a = A) : v[3] !== void 0 && (a = A) : a === A ? v[0] === ">" ? (a = n ?? j, d = -1) : v[1] === void 0 ? d = -2 : (d = a.lastIndex - v[2].length, p = v[1], a = v[3] === void 0 ? A : v[3] === '"' ? wt : xt) : a === wt || a === xt ? a = A : a === yt || a === $t ? a = j : (a = A, n = void 0);
    const _ = a === A && e[c + 1].startsWith("/>") ? " " : "";
    i += a === j ? l + Wt : d >= 0 ? (r.push(p), l.slice(0, d) + Ot + l.slice(d) + y + _) : l + y + (d === -2 ? c : _);
  }
  return [Tt(e, i + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class R {
  constructor({ strings: t, _$litType$: s }, r) {
    let n;
    this.parts = [];
    let i = 0, a = 0;
    const c = t.length - 1, l = this.parts, [p, v] = qt(t, s);
    if (this.el = R.createElement(p, r), E.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = E.nextNode()) !== null && l.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(Ot)) {
          const m = v[a++], _ = n.getAttribute(d).split(y), J = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: i, name: J[2], strings: _, ctor: J[1] === "." ? Gt : J[1] === "?" ? Yt : J[1] === "@" ? Qt : Q }), n.removeAttribute(d);
        } else d.startsWith(y) && (l.push({ type: 6, index: i }), n.removeAttribute(d));
        if (Dt.test(n.tagName)) {
          const d = n.textContent.split(y), m = d.length - 1;
          if (m > 0) {
            n.textContent = Z ? Z.emptyScript : "";
            for (let _ = 0; _ < m; _++) n.append(d[_], U()), E.nextNode(), l.push({ type: 2, index: ++i });
            n.append(d[m], U());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Mt) l.push({ type: 2, index: i });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(y, d + 1)) !== -1; ) l.push({ type: 7, index: i }), d += y.length - 1;
      }
      i++;
    }
  }
  static createElement(t, s) {
    const r = C.createElement("template");
    return r.innerHTML = t, r;
  }
}
function z(e, t, s = e, r) {
  if (t === k) return t;
  let n = r !== void 0 ? s._$Co?.[r] : s._$Cl;
  const i = B(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== i && (n?._$AO?.(!1), i === void 0 ? n = void 0 : (n = new i(e), n._$AT(e, s, r)), r !== void 0 ? (s._$Co ??= [])[r] = n : s._$Cl = n), n !== void 0 && (t = z(e, n._$AS(e, t.values), n, r)), t;
}
class Zt {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: r } = this._$AD, n = (t?.creationScope ?? C).importNode(s, !0);
    E.currentNode = n;
    let i = E.nextNode(), a = 0, c = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let p;
        l.type === 2 ? p = new I(i, i.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(i, l.name, l.strings, this, t) : l.type === 6 && (p = new Xt(i, this, t)), this._$AV.push(p), l = r[++c];
      }
      a !== l?.index && (i = E.nextNode(), a++);
    }
    return E.currentNode = C, n;
  }
  p(t) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, s), s += r.strings.length - 2) : r._$AI(t[s])), s++;
  }
}
class I {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, r, n) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = r, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && t?.nodeType === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = z(this, t, s), B(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== k && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Jt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && B(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: r } = t, n = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = R.createElement(Tt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === n) this._$AH.p(s);
    else {
      const i = new Zt(n, this), a = i.u(this.options);
      i.p(s), this.T(a), this._$AH = i;
    }
  }
  _$AC(t) {
    let s = At.get(t.strings);
    return s === void 0 && At.set(t.strings, s = new R(t)), s;
  }
  k(t) {
    pt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, n = 0;
    for (const i of t) n === s.length ? s.push(r = new I(this.O(U()), this.O(U()), this, this.options)) : r = s[n], r._$AI(i), n++;
    n < s.length && (this._$AR(r && r._$AB.nextSibling, n), s.length = n);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const r = bt(t).nextSibling;
      bt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, r, n, i) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = s, this._$AM = n, this.options = i, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = u;
  }
  _$AI(t, s = this, r, n) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) t = z(this, t, s, 0), a = !B(t) || t !== this._$AH && t !== k, a && (this._$AH = t);
    else {
      const c = t;
      let l, p;
      for (t = i[0], l = 0; l < i.length - 1; l++) p = z(this, c[r + l], s, l), p === k && (p = this._$AH[l]), a ||= !B(p) || p !== this._$AH[l], p === u ? t = u : t !== u && (t += (p ?? "") + i[l + 1]), this._$AH[l] = p;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Gt extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Yt extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Qt extends Q {
  constructor(t, s, r, n, i) {
    super(t, s, r, n, i), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = z(this, t, s, 0) ?? u) === k) return;
    const r = this._$AH, n = t === u && r !== u || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, i = t !== u && (r === u || n);
    n && this.element.removeEventListener(this.name, this, r), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Xt {
  constructor(t, s, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    z(this, t);
  }
}
const te = ct.litHtmlPolyfillSupport;
te?.(R, I), (ct.litHtmlVersions ??= []).push("3.3.3");
const ee = (e, t, s) => {
  const r = s?.renderBefore ?? t;
  let n = r._$litPart$;
  if (n === void 0) {
    const i = s?.renderBefore ?? null;
    r._$litPart$ = n = new I(t.insertBefore(U(), i), i, void 0, s ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = globalThis;
class f extends S {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ee(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return k;
  }
}
f._$litElement$ = !0, f.finalized = !0, dt.litElementHydrateSupport?.({ LitElement: f });
const se = dt.litElementPolyfillSupport;
se?.({ LitElement: f });
(dt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: lt }, re = (e = ne, t, s) => {
  const { kind: r, metadata: n } = s;
  let i = globalThis.litPropertyMetadata.get(n);
  if (i === void 0 && globalThis.litPropertyMetadata.set(n, i = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), i.set(s.name, e), r === "accessor") {
    const { name: a } = s;
    return { set(c) {
      const l = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(a, l, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, e, c), c;
    } };
  }
  if (r === "setter") {
    const { name: a } = s;
    return function(c) {
      const l = this[a];
      t.call(this, c), this.requestUpdate(a, l, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function h(e) {
  return (t, s) => typeof s == "object" ? re(e, t, s) : ((r, n, i) => {
    const a = n.hasOwnProperty(i);
    return n.constructor.createProperty(i, r), a ? Object.getOwnPropertyDescriptor(n, i) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(e) {
  return h({ ...e, state: !0, attribute: !1 });
}
const w = g`
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
`, W = g`
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
var ie = Object.defineProperty, ae = Object.getOwnPropertyDescriptor, X = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? ae(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (n = (r ? a(t, s, n) : a(n)) || n);
  return r && n && ie(t, s, n), n;
};
const oe = {
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  climate: "M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.52V18h-4v-4.48A5 5 0 0 1 7 9a5 5 0 0 1 5-5z",
  blinds: "M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z",
  media: "M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z",
  energy: "M7 2v11h3v9l7-12h-4l4-8z"
}, Et = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy"
};
let O = class extends f {
  constructor() {
    super(...arguments), this.pages = [], this.activePage = "home", this.customLabels = {};
  }
  _tap(e) {
    this.dispatchEvent(new CustomEvent("page-change", { detail: { page: e }, bubbles: !0, composed: !0 }));
  }
  render() {
    return o`
      <nav>
        ${this.pages.map((e) => o`
          <button
            class=${e === this.activePage ? "active" : ""}
            @click=${() => this._tap(e)}
            aria-label=${Et[e]}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d=${oe[e]} />
            </svg>
            <span>${this.customLabels[e] ?? Et[e]}</span>
          </button>
        `)}
      </nav>
    `;
  }
};
O.styles = [w, g`
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
X([
  h({ type: Array })
], O.prototype, "pages", 2);
X([
  h({ type: String })
], O.prototype, "activePage", 2);
X([
  h({ attribute: !1 })
], O.prototype, "customLabels", 2);
O = X([
  b("nspanel-bottom-nav")
], O);
var le = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, ht = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? ce(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (n = (r ? a(t, s, n) : a(n)) || n);
  return r && n && le(t, s, n), n;
};
let V = class extends f {
  constructor() {
    super(...arguments), this.cameraEntity = "";
  }
  _dismiss() {
    this.dispatchEvent(new CustomEvent("dismiss", { bubbles: !0, composed: !0 }));
  }
  render() {
    return o`
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

          ${this.cameraEntity ? o`
            <div class="stream">
              <ha-camera-stream
                .hass=${this.hass}
                .stateObj=${this.hass.states[this.cameraEntity]}
                muted
                autoPlay
              ></ha-camera-stream>
            </div>
          ` : o`
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
V.styles = [w, g`
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
ht([
  h({ attribute: !1 })
], V.prototype, "hass", 2);
ht([
  h({ type: String })
], V.prototype, "cameraEntity", 2);
V = ht([
  b("nspanel-doorbell-popup")
], V);
var pe = Object.defineProperty, de = Object.getOwnPropertyDescriptor, F = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? de(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (n = (r ? a(t, s, n) : a(n)) || n);
  return r && n && pe(t, s, n), n;
};
function Ct(e) {
  return {
    sunny: "☀️",
    "clear-night": "🌙",
    partlycloudy: "⛅",
    cloudy: "☁️",
    fog: "🌫️",
    hail: "🌨️",
    lightning: "⚡",
    "lightning-rainy": "⛈️",
    pouring: "🌧️",
    rainy: "🌦️",
    snowy: "❄️",
    "snowy-rainy": "🌨️",
    windy: "💨",
    "windy-variant": "🌬️",
    exceptional: "⚠️"
  }[e] ?? "🌡️";
}
function he(e) {
  try {
    return new Date(e).toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return e;
  }
}
function ve(e) {
  const t = parseInt(e, 10);
  if (!isNaN(t) && String(t) === e.trim())
    return t === 0 ? "Heute" : t === 1 ? "Morgen" : `in ${t} Tagen`;
  const s = new Date(e);
  if (!isNaN(s.getTime())) {
    const r = /* @__PURE__ */ new Date(), n = new Date(r);
    return n.setDate(r.getDate() + 1), s.toDateString() === r.toDateString() ? "Heute" : s.toDateString() === n.toDateString() ? "Morgen" : s.toLocaleDateString("de-AT", { weekday: "short", day: "numeric", month: "short" });
  }
  return e;
}
let $ = class extends f {
  constructor() {
    super(...arguments), this.dark = !1, this._time = "", this._date = "";
  }
  connectedCallback() {
    super.connectedCallback(), this._tick(), this._timer = window.setInterval(() => this._tick(), 1e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this._timer);
  }
  _tick() {
    const e = /* @__PURE__ */ new Date();
    this._time = e.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" }), this._date = e.toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long" });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.weather_entity ? t?.states[e.weather_entity] : null, r = e.calendar_entity ? t?.states[e.calendar_entity] : null, n = e.trash_entity ? t?.states[e.trash_entity] : null, i = e.person_1 ? t?.states[e.person_1] : null, a = e.person_2 ? t?.states[e.person_2] : null;
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="clock-block">
          <div class="time">${this._time}</div>
          <div class="date">${this._date}</div>
        </div>

        ${s ? this._renderWeather(s) : ""}

        ${r || n ? o`
          <div class="info-row">
            ${r ? this._renderCalendar(r) : ""}
            ${n ? this._renderTrash(n) : ""}
          </div>
        ` : ""}

        ${i || a ? o`
          <div class="persons-row">
            ${i ? this._renderPerson(i) : ""}
            ${a ? this._renderPerson(a) : ""}
          </div>
        ` : ""}
      </div>
    `;
  }
  _renderWeather(e) {
    const t = e.attributes.temperature, r = (e.attributes.forecast ?? [])[0];
    return o`
      <div class="card weather-card">
        <div class="weather-main">
          <span class="weather-icon">${Ct(e.state)}</span>
          <span class="weather-temp">${t != null ? `${Math.round(t)}°` : "–"}</span>
          <span class="weather-cond">${e.state.replace(/-/g, " ")}</span>
        </div>
        ${r ? o`
          <div class="weather-tmr">
            <span>${Ct(r.condition)}</span>
            <span>↑${Math.round(r.temperature)}°</span>
            ${r.templow != null ? o`<span>↓${Math.round(r.templow)}°</span>` : ""}
          </div>
        ` : ""}
      </div>
    `;
  }
  _renderCalendar(e) {
    const t = e.attributes.message, s = e.attributes.start_time, r = e.attributes.all_day;
    return t ? o`
      <div class="info-card">
        <div class="info-icon">📅</div>
        <div class="info-content">
          <div class="info-title">${t}</div>
          <div class="info-sub">${r ? "Ganztag" : s ? he(s) : ""}</div>
        </div>
      </div>
    ` : o``;
  }
  _renderTrash(e) {
    const t = e.attributes.friendly_name ?? "Müll";
    return o`
      <div class="info-card">
        <div class="info-icon">🗑️</div>
        <div class="info-content">
          <div class="info-title">${ve(e.state)}</div>
          <div class="info-sub">${t}</div>
        </div>
      </div>
    `;
  }
  _renderPerson(e) {
    const s = (e.attributes.friendly_name ?? e.entity_id).split(" ")[0], r = e.state === "home", n = e.attributes.entity_picture;
    return o`
      <div class="person-chip">
        <div class="person-avatar ${r ? "home" : ""}">
          ${n ? o`<img src="${n}" alt="${s}" />` : o`<span>${s[0]?.toUpperCase() ?? "?"}</span>`}
        </div>
        <div class="person-info">
          <div class="person-name">${s}</div>
          <div class="person-status ${r ? "home" : ""}">
            ${r ? "● Zu Hause" : "● Unterwegs"}
          </div>
        </div>
      </div>
    `;
  }
};
$.styles = [w, W, g`
    .clock-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: var(--nsp-s2);
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
      color: var(--nsp-text-2);
      margin-top: 4px;
    }
    .weather-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--nsp-s3) var(--nsp-s4);
    }
    .weather-main { display: flex; align-items: center; gap: var(--nsp-s2); }
    .weather-icon { font-size: 24px; }
    .weather-temp {
      font-family: var(--nsp-font);
      font-size: 26px;
      font-weight: 600;
      color: var(--nsp-text-1);
    }
    .weather-cond {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-2);
      text-transform: capitalize;
    }
    .weather-tmr {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-2);
    }
    .info-row { display: flex; gap: var(--nsp-s2); }
    .info-card {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      background: var(--nsp-surface-2);
      border-radius: var(--nsp-r2);
      padding: var(--nsp-s3);
      min-width: 0;
    }
    .info-icon { font-size: 20px; flex-shrink: 0; }
    .info-content { flex: 1; min-width: 0; }
    .info-title {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 600;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .info-sub {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .persons-row { display: flex; gap: var(--nsp-s2); }
    .person-chip {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      background: var(--nsp-surface-2);
      border-radius: var(--nsp-r2);
      padding: var(--nsp-s3);
    }
    .person-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--nsp-surface-3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--nsp-font);
      font-size: 16px;
      font-weight: 600;
      color: var(--nsp-text-2);
      overflow: hidden;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    .person-avatar.home { border: 2px solid var(--nsp-green); }
    .person-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .person-name {
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 600;
      color: var(--nsp-text-1);
    }
    .person-status {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 2px;
    }
    .person-status.home { color: var(--nsp-green); }
  `];
F([
  h({ attribute: !1 })
], $.prototype, "hass", 2);
F([
  h({ attribute: !1 })
], $.prototype, "config", 2);
F([
  h({ type: Boolean })
], $.prototype, "dark", 2);
F([
  P()
], $.prototype, "_time", 2);
F([
  P()
], $.prototype, "_date", 2);
$ = F([
  b("nspanel-page-home")
], $);
var ue = Object.defineProperty, fe = Object.getOwnPropertyDescriptor, tt = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? fe(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (n = (r ? a(t, s, n) : a(n)) || n);
  return r && n && ue(t, s, n), n;
};
let M = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _setTemp(e) {
    const t = this.config?.thermostat_entity;
    if (!t) return;
    const s = this.hass?.states[t]?.attributes.temperature ?? 20;
    this.hass.callService("climate", "set_temperature", {
      entity_id: t,
      temperature: Math.round((s + e) * 2) / 2
    });
  }
  _setMode(e) {
    const t = this.config?.thermostat_entity;
    t && this.hass.callService("climate", "set_hvac_mode", { entity_id: t, hvac_mode: e });
  }
  render() {
    const e = this.config?.thermostat_entity, t = e ? this.hass?.states[e] : null;
    if (!t) return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">Kein Thermostat konfiguriert</div></div>
    `;
    const s = t.attributes.current_temperature, r = t.attributes.temperature, n = t.state, i = n === "heat";
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="pg-title">Thermostat</div>

        <div class="circle-wrap">
          <div class="temp-circle ${i ? "heating" : ""}">
            <div class="cur-temp">${s != null ? `${s.toFixed(1)}°` : "–"}</div>
            <div class="cur-label">aktuell</div>
          </div>
        </div>

        <div class="setpoint-row">
          <button class="btn-round" @click=${() => this._setTemp(-0.5)}>−</button>
          <div class="setpoint">
            <div class="set-val">${r != null ? `${r}°` : "–"}</div>
            <div class="set-label">Zieltemperatur</div>
          </div>
          <button class="btn-round" @click=${() => this._setTemp(0.5)}>+</button>
        </div>

        <div class="mode-row">
          <button class="mode-btn ${n === "off" ? "active-off" : ""}"
            @click=${() => this._setMode("off")}>Aus</button>
          <button class="mode-btn ${i ? "active-heat" : ""}"
            @click=${() => this._setMode("heat")}>Heizen</button>
        </div>
      </div>
    `;
  }
};
M.styles = [w, W, g`
    .pg-title {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--nsp-text-3);
      text-align: center;
    }
    .circle-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .temp-circle {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      border: 3px solid var(--nsp-surface-3);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .temp-circle.heating {
      border-color: var(--nsp-orange);
      box-shadow: 0 0 28px rgba(255,149,0,0.2);
    }
    .cur-temp {
      font-family: var(--nsp-font);
      font-size: 48px;
      font-weight: 300;
      letter-spacing: -0.03em;
      color: var(--nsp-text-1);
      line-height: 1;
    }
    .cur-label {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 6px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .setpoint-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--nsp-s5);
    }
    .btn-round {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: var(--nsp-surface-2);
      font-size: 26px;
      color: var(--nsp-text-1);
      cursor: pointer;
      font-family: var(--nsp-font);
      line-height: 1;
    }
    .btn-round:active { opacity: 0.6; }
    .setpoint { text-align: center; }
    .set-val {
      font-family: var(--nsp-font);
      font-size: 32px;
      font-weight: 600;
      color: var(--nsp-text-1);
      letter-spacing: -0.02em;
    }
    .set-label {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .mode-row { display: flex; gap: var(--nsp-s2); }
    .mode-btn {
      flex: 1;
      height: 48px;
      border-radius: var(--nsp-r2);
      border: 1.5px solid var(--nsp-surface-3);
      background: none;
      font-family: var(--nsp-font);
      font-size: 15px;
      font-weight: 500;
      color: var(--nsp-text-2);
      cursor: pointer;
    }
    .mode-btn.active-off {
      background: var(--nsp-surface-2);
      color: var(--nsp-text-1);
    }
    .mode-btn.active-heat {
      background: var(--nsp-orange);
      border-color: var(--nsp-orange);
      color: white;
    }
    .empty {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
    }
  `];
tt([
  h({ attribute: !1 })
], M.prototype, "hass", 2);
tt([
  h({ attribute: !1 })
], M.prototype, "config", 2);
tt([
  h({ type: Boolean })
], M.prototype, "dark", 2);
M = tt([
  b("nspanel-page-climate")
], M);
var ge = Object.defineProperty, me = Object.getOwnPropertyDescriptor, et = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? me(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (n = (r ? a(t, s, n) : a(n)) || n);
  return r && n && ge(t, s, n), n;
};
const be = ["cover_1", "cover_2", "cover_3", "cover_4", "cover_5", "cover_6", "cover_7", "cover_8"];
let D = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _cover(e, t) {
    this.hass.callService("cover", t, { entity_id: e });
  }
  _toggleLight() {
    const e = this.config?.garden_light;
    if (!e) return;
    const t = this.hass?.states[e]?.state === "on", s = e.split(".")[0];
    this.hass.callService(s, t ? "turn_off" : "turn_on", { entity_id: e });
  }
  _scene(e) {
    const t = e.split(".")[0];
    this.hass.callService(t === "scene" ? "scene" : "script", "turn_on", { entity_id: e });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = be.map((a) => e[a]).filter((a) => !!a), r = e.garden_light ? t?.states[e.garden_light] : null, n = r?.state === "on", i = r?.attributes.friendly_name ?? "Licht";
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="covers-list">
          ${s.map((a) => {
      const c = t?.states[a];
      if (!c) return o``;
      const l = c.attributes.friendly_name ?? a, p = c.attributes.current_position;
      return o`
              <div class="cover-row">
                <div class="cover-name">${l}</div>
                ${p != null ? o`<div class="cover-pos">${p}%</div>` : ""}
                <div class="cover-btns">
                  <button class="cov-btn" @click=${() => this._cover(a, "open_cover")}>▲</button>
                  <button class="cov-btn" @click=${() => this._cover(a, "stop_cover")}>■</button>
                  <button class="cov-btn" @click=${() => this._cover(a, "close_cover")}>▼</button>
                </div>
              </div>
            `;
    })}
        </div>

        <div class="bottom-bar">
          ${r ? o`
            <button class="light-btn ${n ? "on" : ""}" @click=${() => this._toggleLight()}>
              <span>${n ? "☀️" : "🌙"}</span>
              <span>${i}</span>
            </button>
          ` : ""}
          ${e.scene_up ? o`<button class="scene-btn" @click=${() => this._scene(e.scene_up)}>▲ Alle</button>` : ""}
          ${e.scene_down ? o`<button class="scene-btn" @click=${() => this._scene(e.scene_down)}>▼ Alle</button>` : ""}
        </div>
      </div>
    `;
  }
};
D.styles = [w, W, g`
    .page { gap: var(--nsp-s2); }
    .covers-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow-y: auto;
    }
    .cover-row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      background: var(--nsp-surface-2);
      border-radius: var(--nsp-r2);
      padding: 0 var(--nsp-s3);
      height: 42px;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    .cover-name {
      flex: 1;
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cover-pos {
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
      min-width: 30px;
      text-align: right;
    }
    .cover-btns { display: flex; gap: 4px; }
    .cov-btn {
      width: 32px;
      height: 32px;
      border-radius: var(--nsp-r1);
      border: none;
      background: var(--nsp-surface-3);
      color: var(--nsp-text-1);
      font-size: 11px;
      cursor: pointer;
    }
    .cov-btn:active { opacity: 0.6; }
    .bottom-bar { display: flex; gap: var(--nsp-s2); flex-shrink: 0; }
    .light-btn {
      flex: 1;
      height: 44px;
      border-radius: var(--nsp-r2);
      border: none;
      background: var(--nsp-surface-2);
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 500;
      color: var(--nsp-text-2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--nsp-s1);
    }
    .light-btn.on { background: var(--nsp-yellow); color: #000; }
    .scene-btn {
      height: 44px;
      padding: 0 var(--nsp-s3);
      border-radius: var(--nsp-r2);
      border: none;
      background: var(--nsp-surface-2);
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 500;
      color: var(--nsp-text-2);
      cursor: pointer;
    }
    .scene-btn:active { opacity: 0.6; }
  `];
et([
  h({ attribute: !1 })
], D.prototype, "hass", 2);
et([
  h({ attribute: !1 })
], D.prototype, "config", 2);
et([
  h({ type: Boolean })
], D.prototype, "dark", 2);
D = et([
  b("nspanel-page-blinds")
], D);
var _e = Object.defineProperty, ye = Object.getOwnPropertyDescriptor, st = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? ye(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (n = (r ? a(t, s, n) : a(n)) || n);
  return r && n && _e(t, s, n), n;
};
function Pt(e) {
  return `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
}
let T = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _call(e, t) {
    const s = this.config?.media_player;
    if (!s) return;
    const [r, n] = e.split(".");
    this.hass.callService(r, n, { entity_id: s, ...t });
  }
  _volume(e) {
    this._call("media_player.volume_set", { volume_level: e.target.valueAsNumber });
  }
  render() {
    const e = this.config?.media_player, t = e ? this.hass?.states[e] : null;
    if (!t) return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">Kein Media Player konfiguriert</div></div>
    `;
    const s = t.state === "playing", r = t.attributes.media_title ?? "", n = t.attributes.media_artist ?? "", i = t.attributes.entity_picture ?? "", a = t.attributes.volume_level ?? 0.5, c = t.attributes.media_duration ?? 0, l = t.attributes.media_position ?? 0, p = t.attributes.media_position_updated_at ?? "";
    let v = l;
    s && p && (v = Math.min(l + (Date.now() - new Date(p).getTime()) / 1e3, c));
    const d = c > 0 ? v / c : 0;
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="art-wrap">
          ${i ? o`<img class="art" src="${i}" alt="cover" />` : o`<div class="art art-empty">♪</div>`}
        </div>

        <div class="track-info">
          <div class="track-title">${r || (t.state === "off" ? "Aus" : "Kein Titel")}</div>
          ${n ? o`<div class="track-artist">${n}</div>` : ""}
        </div>

        ${c > 0 ? o`
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${d * 100}%"></div>
            </div>
            <div class="progress-times">
              <span>${Pt(v)}</span>
              <span>${Pt(c)}</span>
            </div>
          </div>
        ` : ""}

        <div class="controls">
          <button class="ctrl-btn" @click=${() => this._call("media_player.media_previous_track")}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>
          <button class="ctrl-btn play" @click=${() => this._call("media_player.media_play_pause")}>
            ${s ? o`<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>` : o`<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M8 5v14l11-7z"/></svg>`}
          </button>
          <button class="ctrl-btn" @click=${() => this._call("media_player.media_next_track")}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
            </svg>
          </button>
        </div>

        <div class="vol-row">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
          </svg>
          <input class="vol-slider" type="range" min="0" max="1" step="0.02"
            .value=${String(a)} @change=${this._volume} />
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </div>
      </div>
    `;
  }
};
T.styles = [w, W, g`
    .page { align-items: center; gap: var(--nsp-s3); }
    .art-wrap { flex: 1; display: flex; align-items: center; justify-content: center; }
    .art {
      width: 150px;
      height: 150px;
      border-radius: var(--nsp-r3);
      object-fit: cover;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }
    .art-empty {
      width: 150px;
      height: 150px;
      border-radius: var(--nsp-r3);
      background: var(--nsp-surface-2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      color: var(--nsp-text-3);
    }
    .track-info { text-align: center; width: 100%; }
    .track-title {
      font-family: var(--nsp-font);
      font-size: 17px;
      font-weight: 600;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .track-artist {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-2);
      margin-top: 2px;
    }
    .progress-wrap { width: 100%; }
    .progress-bar {
      height: 4px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--nsp-accent);
      border-radius: 2px;
    }
    .progress-times {
      display: flex;
      justify-content: space-between;
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 4px;
    }
    .controls { display: flex; align-items: center; gap: var(--nsp-s5); }
    .ctrl-btn {
      border: none;
      background: none;
      color: var(--nsp-text-1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-radius: 50%;
    }
    .ctrl-btn:active { opacity: 0.6; }
    .ctrl-btn.play {
      width: 56px;
      height: 56px;
      background: var(--nsp-accent);
      color: white;
      padding: 0;
    }
    .vol-row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      width: 100%;
      color: var(--nsp-text-3);
    }
    .vol-slider {
      flex: 1;
      -webkit-appearance: none;
      height: 4px;
      border-radius: 2px;
      background: var(--nsp-surface-3);
      outline: none;
    }
    .vol-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--nsp-accent);
      cursor: pointer;
    }
    .empty {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
    }
  `];
st([
  h({ attribute: !1 })
], T.prototype, "hass", 2);
st([
  h({ attribute: !1 })
], T.prototype, "config", 2);
st([
  h({ type: Boolean })
], T.prototype, "dark", 2);
T = st([
  b("nspanel-page-media")
], T);
var $e = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, nt = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? xe(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (n = (r ? a(t, s, n) : a(n)) || n);
  return r && n && $e(t, s, n), n;
};
function it(e) {
  return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(1)} kW` : `${Math.round(e)} W`;
}
let N = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.pv_entity ? t?.states[e.pv_entity] : null, r = e.grid_entity ? t?.states[e.grid_entity] : null, n = e.ev_entity ? t?.states[e.ev_entity] : null, i = s ? parseFloat(s.state) : null, a = r ? parseFloat(r.state) : null, c = n ? parseFloat(n.state) : null, l = a != null && a < 0, p = i != null && a != null ? i + (l ? a : 0) + (l ? 0 : a) : null;
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="pg-title">Energie</div>

        <div class="stats-grid">
          <div class="stat pv">
            <div class="stat-icon">☀️</div>
            <div class="stat-val">${i != null ? it(i) : "–"}</div>
            <div class="stat-lbl">Erzeugung</div>
          </div>

          <div class="stat home">
            <div class="stat-icon">🏠</div>
            <div class="stat-val">${p != null ? it(Math.abs(p)) : "–"}</div>
            <div class="stat-lbl">Verbrauch</div>
          </div>

          <div class="stat grid ${l ? "export" : "import"}">
            <div class="stat-icon">${l ? "⬆️" : "⬇️"}</div>
            <div class="stat-val">${a != null ? it(Math.abs(a)) : "–"}</div>
            <div class="stat-lbl">${l ? "Einspeisung" : "Netzbezug"}</div>
          </div>

          <div class="stat ev ${n ? "" : "unavail"}">
            <div class="stat-icon">🔋</div>
            <div class="stat-val">${c != null ? `${Math.round(c)}%` : "–"}</div>
            <div class="stat-lbl">Tesla</div>
            ${c != null ? o`
              <div class="ev-track">
                <div class="ev-fill" style="width:${c}%"></div>
              </div>
            ` : o`<div class="stat-hint">nicht verbunden</div>`}
          </div>
        </div>
      </div>
    `;
  }
};
N.styles = [w, W, g`
    .pg-title {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--nsp-text-3);
      text-align: center;
    }
    .stats-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--nsp-s2);
    }
    .stat {
      background: var(--nsp-surface-2);
      border-radius: var(--nsp-r3);
      padding: var(--nsp-s4);
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .stat.unavail { opacity: 0.45; }
    .stat-icon { font-size: 22px; }
    .stat-val {
      font-family: var(--nsp-font);
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--nsp-text-1);
      line-height: 1.1;
    }
    .stat-lbl {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .stat-hint {
      font-family: var(--nsp-font);
      font-size: 10px;
      color: var(--nsp-text-3);
      margin-top: 2px;
    }
    .stat.pv    .stat-val { color: var(--nsp-yellow); }
    .stat.export .stat-val { color: var(--nsp-green); }
    .stat.import .stat-val { color: var(--nsp-orange); }
    .ev-track {
      height: 4px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      margin-top: 4px;
      overflow: hidden;
    }
    .ev-fill {
      height: 100%;
      background: var(--nsp-green);
      border-radius: 2px;
    }
  `];
nt([
  h({ attribute: !1 })
], N.prototype, "hass", 2);
nt([
  h({ attribute: !1 })
], N.prototype, "config", 2);
nt([
  h({ type: Boolean })
], N.prototype, "dark", 2);
N = nt([
  b("nspanel-page-energy")
], N);
var we = Object.defineProperty, Ae = Object.getOwnPropertyDescriptor, vt = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? Ae(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (n = (r ? a(t, s, n) : a(n)) || n);
  return r && n && we(t, s, n), n;
};
const St = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy"
}, kt = [
  { id: "home" },
  { id: "climate" },
  { id: "blinds" },
  { id: "media" },
  { id: "energy" }
], Ee = [
  { name: "weather_entity", label: "Wetter (weather.*)", selector: { entity: { domain: "weather" } } },
  { name: "calendar_entity", label: "Kalender (calendar.*)", selector: { entity: { domain: "calendar" } } },
  { name: "trash_entity", label: "Müllabfuhr (sensor.* / calendar.*)", selector: { entity: { domain: ["sensor", "calendar"] } } },
  { name: "person_1", label: "Person 1 (person.*)", selector: { entity: { domain: "person" } } },
  { name: "person_2", label: "Person 2 (person.*)", selector: { entity: { domain: "person" } } }
], Ce = [
  { name: "thermostat_entity", label: "Thermostat (climate.*)", selector: { entity: { domain: "climate" } } }
], Pe = [
  { name: "cover_1", label: "Cover / Jalousie 1 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_2", label: "Cover / Jalousie 2 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_3", label: "Cover / Jalousie 3 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_4", label: "Cover / Jalousie 4 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_5", label: "Cover / Jalousie 5 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_6", label: "Cover / Jalousie 6 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_7", label: "Cover / Jalousie 7 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_8", label: "Cover / Jalousie 8 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "garden_light", label: "Licht / Schalter (light.* / switch.*)", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "scene_up", label: "Szene: Alle öffnen (scene.* / script.*)", selector: { entity: { domain: ["scene", "script"] } } },
  { name: "scene_down", label: "Szene: Alle schließen (scene.* / script.*)", selector: { entity: { domain: ["scene", "script"] } } }
], Se = [
  { name: "media_player", label: "Media Player (media_player.*)", selector: { entity: { domain: "media_player" } } }
], ke = [
  { name: "pv_entity", label: "PV Erzeugung (sensor.*, W oder kW)", selector: { entity: { domain: "sensor" } } },
  { name: "grid_entity", label: "Netzbezug/-einspeisung (sensor.*, W oder kW — negativ = Einspeisung)", selector: { entity: { domain: "sensor" } } },
  { name: "ev_entity", label: "EV / Akku SoC in % (sensor.*) — optional", selector: { entity: { domain: "sensor" } } }
], ze = [
  { name: "doorbell_trigger", label: "Klingel-Auslöser (binary_sensor.*)", selector: { entity: { domain: "binary_sensor" } } },
  { name: "doorbell_camera", label: "Kamera für Livestream (camera.*)", selector: { entity: { domain: "camera" } } }
], Oe = (e) => e.label ?? e.name;
let G = class extends f {
  createRenderRoot() {
    return this;
  }
  setConfig(e) {
    this._config = e;
  }
  _merge(e) {
    this._config = { ...this._config, ...e.detail.value }, this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: !0,
      composed: !0
    }));
  }
  _togglePage(e) {
    const t = [...this._config.pages ?? ["home"]], s = t.indexOf(e);
    s >= 0 ? t.length > 1 && t.splice(s, 1) : t.push(e), this._config = { ...this._config, pages: t }, this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: !0,
      composed: !0
    }));
  }
  _form(e) {
    return o`
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${e}
        .computeLabel=${Oe} @value-changed=${this._merge}></ha-form>
    `;
  }
  render() {
    if (!this._config) return o``;
    const e = this._config, t = e.pages ?? ["home"], s = (n) => `${n}_label`, r = (n) => e[s(n)] ?? "";
    return o`
      <style>
        .nsp-sec { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em;
          color:var(--secondary-text-color); margin:16px 0 4px; padding-bottom:4px;
          border-bottom:1px solid var(--divider-color); }
        .nsp-chips { display:flex; flex-wrap:wrap; gap:6px; }
        .nsp-chip { padding:6px 14px; border-radius:980px; border:1.5px solid var(--divider-color);
          background:none; cursor:pointer; font-size:13px; color:var(--primary-text-color); }
        .nsp-chip.active { border-color:var(--primary-color); background:var(--primary-color); color:white; }
        .nsp-details { margin:6px 0 0; border-radius:8px; border:1px solid var(--divider-color); overflow:hidden; }
        .nsp-details summary { padding:8px 12px; cursor:pointer; font-size:12px;
          color:var(--secondary-text-color); list-style:none; display:flex; align-items:center; gap:6px; }
        .nsp-details summary::before { content:'▶'; font-size:10px; transition:transform .2s; }
        .nsp-details[open] summary::before { transform:rotate(90deg); }
        .nsp-details-body { padding:4px 12px 12px; }
      </style>

      <div class="nsp-sec">Seiten</div>
      <div class="nsp-chips">
        ${kt.map((n) => o`
          <button class="nsp-chip ${t.includes(n.id) ? "active" : ""}"
            @click=${() => this._togglePage(n.id)}>
            ${r(n.id) || St[n.id]}
          </button>
        `)}
      </div>
      <details class="nsp-details">
        <summary>Tab-Namen anpassen</summary>
        <div class="nsp-details-body">
          ${this._form(kt.map((n) => ({
      name: `${n.id}_label`,
      label: `${St[n.id]} — benutzerdefinierter Name`,
      selector: { text: {} }
    })))}
        </div>
      </details>

      <div class="nsp-sec">Home</div>
      ${this._form(Ee)}

      <div class="nsp-sec">Climate</div>
      ${this._form(Ce)}

      <div class="nsp-sec">Cover / Jalousien</div>
      ${this._form(Pe)}

      <div class="nsp-sec">Media</div>
      ${this._form(Se)}

      <div class="nsp-sec">Energie</div>
      ${this._form(ke)}

      <div class="nsp-sec">Türklingel</div>
      ${this._form(ze)}
    `;
  }
};
vt([
  h({ attribute: !1 })
], G.prototype, "hass", 2);
vt([
  P()
], G.prototype, "_config", 2);
G = vt([
  b("nspanel-dashboard-editor")
], G);
var Me = Object.defineProperty, De = Object.getOwnPropertyDescriptor, H = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? De(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (n = (r ? a(t, s, n) : a(n)) || n);
  return r && n && Me(t, s, n), n;
};
let x = class extends f {
  constructor() {
    super(...arguments), this._activePage = "home", this._doorbellActive = !1, this._dark = !1;
  }
  static getConfigElement() {
    return document.createElement("nspanel-dashboard-editor");
  }
  static getStubConfig() {
    return { pages: ["home", "climate", "blinds", "media", "energy"] };
  }
  setConfig(e) {
    if (!e) throw new Error("Invalid config");
    this._config = e;
    const t = e.pages ?? ["home"];
    t.includes(this._activePage) || (this._activePage = t[0]);
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      this._dark = this.hass.themes?.darkMode ?? !1;
      const t = this._config?.doorbell_trigger;
      if (t) {
        const r = e.get("hass")?.states[t]?.state !== "on", n = this.hass.states[t]?.state === "on";
        r && n && (this._doorbellActive = !0);
      }
    }
  }
  get _pages() {
    return this._config?.pages ?? ["home"];
  }
  render() {
    if (!this._config) return o``;
    const e = this._dark;
    return o`
      <div class="shell ${e ? "nsp-dark" : ""}">
        <div class="content">
          ${this._renderPage()}
        </div>

        <nspanel-bottom-nav
          .pages=${this._pages}
          .activePage=${this._activePage}
          .customLabels=${{
      home: this._config.home_label,
      climate: this._config.climate_label,
      blinds: this._config.blinds_label,
      media: this._config.media_label,
      energy: this._config.energy_label
    }}
          @page-change=${(t) => {
      this._activePage = t.detail.page;
    }}
        ></nspanel-bottom-nav>

        ${this._doorbellActive ? o`
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
    const e = this.hass, t = this._config, s = this._dark;
    switch (this._activePage) {
      case "home":
        return o`<nspanel-page-home    .hass=${e} .config=${t} ?dark=${s}></nspanel-page-home>`;
      case "climate":
        return o`<nspanel-page-climate .hass=${e} .config=${t} ?dark=${s}></nspanel-page-climate>`;
      case "blinds":
        return o`<nspanel-page-blinds  .hass=${e} .config=${t} ?dark=${s}></nspanel-page-blinds>`;
      case "media":
        return o`<nspanel-page-media   .hass=${e} .config=${t} ?dark=${s}></nspanel-page-media>`;
      case "energy":
        return o`<nspanel-page-energy  .hass=${e} .config=${t} ?dark=${s}></nspanel-page-energy>`;
      default:
        return o``;
    }
  }
};
x.styles = [w, g`
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
H([
  h({ attribute: !1 })
], x.prototype, "hass", 2);
H([
  P()
], x.prototype, "_config", 2);
H([
  P()
], x.prototype, "_activePage", 2);
H([
  P()
], x.prototype, "_doorbellActive", 2);
H([
  P()
], x.prototype, "_dark", 2);
x = H([
  b("nspanel-dashboard")
], x);
export {
  x as NspanelDashboard
};
