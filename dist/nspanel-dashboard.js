/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, et = K.ShadowRoot && (K.ShadyCSS === void 0 || K.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, st = Symbol(), ut = /* @__PURE__ */ new WeakMap();
let St = class {
  constructor(t, s, n) {
    if (this._$cssResult$ = !0, n !== st) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (et && t === void 0) {
      const n = s !== void 0 && s.length === 1;
      n && (t = ut.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ut.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Dt = (e) => new St(typeof e == "string" ? e : e + "", void 0, st), g = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((n, i, r) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[r + 1], e[0]);
  return new St(s, e, st);
}, Tt = (e, t) => {
  if (et) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const n = document.createElement("style"), i = K.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = s.cssText, e.appendChild(n);
  }
}, ft = et ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const n of t.cssRules) s += n.cssText;
  return Dt(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ft, defineProperty: Ht, getOwnPropertyDescriptor: Nt, getOwnPropertyNames: jt, getOwnPropertySymbols: Ut, getPrototypeOf: Lt } = Object, Y = globalThis, gt = Y.trustedTypes, Bt = gt ? gt.emptyScript : "", Rt = Y.reactiveElementPolyfillSupport, D = (e, t) => e, q = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Bt : null;
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
} }, nt = (e, t) => !Ft(e, t), mt = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: nt };
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
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, s);
      i !== void 0 && Ht(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, s, n) {
    const { get: i, set: r } = Nt(this.prototype, t) ?? { get() {
      return this[s];
    }, set(a) {
      this[s] = a;
    } };
    return { get: i, set(a) {
      const c = i?.call(this);
      r?.call(this, a), this.requestUpdate(t, c, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const t = Lt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const s = this.properties, n = [...jt(s), ...Ut(s)];
      for (const i of n) this.createProperty(i, s[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [n, i] of s) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, n] of this.elementProperties) {
      const i = this._$Eu(s, n);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n) s.unshift(ft(i));
    } else t !== void 0 && s.push(ft(t));
    return s;
  }
  static _$Eu(t, s) {
    const n = s.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const n of s.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Tt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, s, n) {
    this._$AK(t, n);
  }
  _$ET(t, s) {
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : q).toAttribute(s, n.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = n.getPropertyOptions(i), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : q;
      this._$Em = i;
      const c = a.fromAttribute(s, r.type);
      this[i] = c ?? this._$Ej?.get(i) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, s, n, i = !1, r) {
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (r = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? nt)(r, s) || n.useDefault && n.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, s, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: n, reflect: i, wrapped: r }, a) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? s ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (s = void 0), this._$AL.set(t, s)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [i, r] of this._$Ep) this[i] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [i, r] of n) {
        const { wrapped: a } = r, c = this[i];
        a !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, r, c);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[D("elementProperties")] = /* @__PURE__ */ new Map(), S[D("finalized")] = /* @__PURE__ */ new Map(), Rt?.({ ReactiveElement: S }), (Y.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = globalThis, _t = (e) => e, Z = it.trustedTypes, bt = Z ? Z.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, zt = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, Ot = "?" + y, Vt = `<${Ot}>`, E = document, T = () => E.createComment(""), F = (e) => e === null || typeof e != "object" && typeof e != "function", rt = Array.isArray, It = (e) => rt(e) || typeof e?.[Symbol.iterator] == "function", X = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yt = /-->/g, $t = />/g, w = RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xt = /'/g, wt = /"/g, Mt = /^(?:script|style|textarea|title)$/i, Wt = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), o = Wt(1), z = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), At = /* @__PURE__ */ new WeakMap(), A = E.createTreeWalker(E, 129);
function kt(e, t) {
  if (!rt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bt !== void 0 ? bt.createHTML(t) : t;
}
const Jt = (e, t) => {
  const s = e.length - 1, n = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = k;
  for (let c = 0; c < s; c++) {
    const l = e[c];
    let p, h, d = -1, m = 0;
    for (; m < l.length && (a.lastIndex = m, h = a.exec(l), h !== null); ) m = a.lastIndex, a === k ? h[1] === "!--" ? a = yt : h[1] !== void 0 ? a = $t : h[2] !== void 0 ? (Mt.test(h[2]) && (i = RegExp("</" + h[2], "g")), a = w) : h[3] !== void 0 && (a = w) : a === w ? h[0] === ">" ? (a = i ?? k, d = -1) : h[1] === void 0 ? d = -2 : (d = a.lastIndex - h[2].length, p = h[1], a = h[3] === void 0 ? w : h[3] === '"' ? wt : xt) : a === wt || a === xt ? a = w : a === yt || a === $t ? a = k : (a = w, i = void 0);
    const b = a === w && e[c + 1].startsWith("/>") ? " " : "";
    r += a === k ? l + Vt : d >= 0 ? (n.push(p), l.slice(0, d) + zt + l.slice(d) + y + b) : l + y + (d === -2 ? c : b);
  }
  return [kt(e, r + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class H {
  constructor({ strings: t, _$litType$: s }, n) {
    let i;
    this.parts = [];
    let r = 0, a = 0;
    const c = t.length - 1, l = this.parts, [p, h] = Jt(t, s);
    if (this.el = H.createElement(p, n), A.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = A.nextNode()) !== null && l.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(zt)) {
          const m = h[a++], b = i.getAttribute(d).split(y), J = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: r, name: J[2], strings: b, ctor: J[1] === "." ? qt : J[1] === "?" ? Zt : J[1] === "@" ? Gt : Q }), i.removeAttribute(d);
        } else d.startsWith(y) && (l.push({ type: 6, index: r }), i.removeAttribute(d));
        if (Mt.test(i.tagName)) {
          const d = i.textContent.split(y), m = d.length - 1;
          if (m > 0) {
            i.textContent = Z ? Z.emptyScript : "";
            for (let b = 0; b < m; b++) i.append(d[b], T()), A.nextNode(), l.push({ type: 2, index: ++r });
            i.append(d[m], T());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ot) l.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(y, d + 1)) !== -1; ) l.push({ type: 7, index: r }), d += y.length - 1;
      }
      r++;
    }
  }
  static createElement(t, s) {
    const n = E.createElement("template");
    return n.innerHTML = t, n;
  }
}
function O(e, t, s = e, n) {
  if (t === z) return t;
  let i = n !== void 0 ? s._$Co?.[n] : s._$Cl;
  const r = F(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(e), i._$AT(e, s, n)), n !== void 0 ? (s._$Co ??= [])[n] = i : s._$Cl = i), i !== void 0 && (t = O(e, i._$AS(e, t.values), i, n)), t;
}
class Kt {
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
    const { el: { content: s }, parts: n } = this._$AD, i = (t?.creationScope ?? E).importNode(s, !0);
    A.currentNode = i;
    let r = A.nextNode(), a = 0, c = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let p;
        l.type === 2 ? p = new V(r, r.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (p = new Yt(r, this, t)), this._$AV.push(p), l = n[++c];
      }
      a !== l?.index && (r = A.nextNode(), a++);
    }
    return A.currentNode = E, i;
  }
  p(t) {
    let s = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, s), s += n.strings.length - 2) : n._$AI(t[s])), s++;
  }
}
class V {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, n, i) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = n, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = O(this, t, s), F(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== z && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : It(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && F(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = H.createElement(kt(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(s);
    else {
      const r = new Kt(i, this), a = r.u(this.options);
      r.p(s), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let s = At.get(t.strings);
    return s === void 0 && At.set(t.strings, s = new H(t)), s;
  }
  k(t) {
    rt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let n, i = 0;
    for (const r of t) i === s.length ? s.push(n = new V(this.O(T()), this.O(T()), this, this.options)) : n = s[i], n._$AI(r), i++;
    i < s.length && (this._$AR(n && n._$AB.nextSibling, i), s.length = i);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const n = _t(t).nextSibling;
      _t(t).remove(), t = n;
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
  constructor(t, s, n, i, r) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = s, this._$AM = i, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = v;
  }
  _$AI(t, s = this, n, i) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = O(this, t, s, 0), a = !F(t) || t !== this._$AH && t !== z, a && (this._$AH = t);
    else {
      const c = t;
      let l, p;
      for (t = r[0], l = 0; l < r.length - 1; l++) p = O(this, c[n + l], s, l), p === z && (p = this._$AH[l]), a ||= !F(p) || p !== this._$AH[l], p === v ? t = v : t !== v && (t += (p ?? "") + r[l + 1]), this._$AH[l] = p;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class qt extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class Zt extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class Gt extends Q {
  constructor(t, s, n, i, r) {
    super(t, s, n, i, r), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = O(this, t, s, 0) ?? v) === z) return;
    const n = this._$AH, i = t === v && n !== v || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== v && (n === v || i);
    i && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Yt {
  constructor(t, s, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    O(this, t);
  }
}
const Qt = it.litHtmlPolyfillSupport;
Qt?.(H, V), (it.litHtmlVersions ??= []).push("3.3.3");
const Xt = (e, t, s) => {
  const n = s?.renderBefore ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const r = s?.renderBefore ?? null;
    n._$litPart$ = i = new V(t.insertBefore(T(), r), r, void 0, s ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Xt(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return z;
  }
}
f._$litElement$ = !0, f.finalized = !0, at.litElementHydrateSupport?.({ LitElement: f });
const te = at.litElementPolyfillSupport;
te?.({ LitElement: f });
(at.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _ = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: nt }, se = (e = ee, t, s) => {
  const { kind: n, metadata: i } = s;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(s.name, e), n === "accessor") {
    const { name: a } = s;
    return { set(c) {
      const l = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(a, l, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, e, c), c;
    } };
  }
  if (n === "setter") {
    const { name: a } = s;
    return function(c) {
      const l = this[a];
      t.call(this, c), this.requestUpdate(a, l, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function u(e) {
  return (t, s) => typeof s == "object" ? se(e, t, s) : ((n, i, r) => {
    const a = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, n), a ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function C(e) {
  return u({ ...e, state: !0, attribute: !1 });
}
const x = g`
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
`, I = g`
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
var ne = Object.defineProperty, ie = Object.getOwnPropertyDescriptor, ot = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? ie(t, s) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && ne(t, s, i), i;
};
const re = {
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
let N = class extends f {
  constructor() {
    super(...arguments), this.pages = [], this.activePage = "home";
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
              <path d=${re[e]} />
            </svg>
            <span>${Et[e]}</span>
          </button>
        `)}
      </nav>
    `;
  }
};
N.styles = [x, g`
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
ot([
  u({ type: Array })
], N.prototype, "pages", 2);
ot([
  u({ type: String })
], N.prototype, "activePage", 2);
N = ot([
  _("nspanel-bottom-nav")
], N);
var ae = Object.defineProperty, oe = Object.getOwnPropertyDescriptor, lt = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? oe(t, s) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && ae(t, s, i), i;
};
let j = class extends f {
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
j.styles = [x, g`
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
lt([
  u({ attribute: !1 })
], j.prototype, "hass", 2);
lt([
  u({ type: String })
], j.prototype, "cameraEntity", 2);
j = lt([
  _("nspanel-doorbell-popup")
], j);
var le = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, W = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? ce(t, s) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && le(t, s, i), i;
};
function Pt(e) {
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
function pe(e) {
  try {
    return new Date(e).toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return e;
  }
}
function de(e) {
  const t = parseInt(e, 10);
  if (!isNaN(t) && String(t) === e.trim())
    return t === 0 ? "Heute" : t === 1 ? "Morgen" : `in ${t} Tagen`;
  const s = new Date(e);
  if (!isNaN(s.getTime())) {
    const n = /* @__PURE__ */ new Date(), i = new Date(n);
    return i.setDate(n.getDate() + 1), s.toDateString() === n.toDateString() ? "Heute" : s.toDateString() === i.toDateString() ? "Morgen" : s.toLocaleDateString("de-AT", { weekday: "short", day: "numeric", month: "short" });
  }
  return e;
}
let P = class extends f {
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
    const e = /* @__PURE__ */ new Date();
    this._time = e.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" }), this._date = e.toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long" });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.weather_entity ? t?.states[e.weather_entity] : null, n = e.calendar_entity ? t?.states[e.calendar_entity] : null, i = e.trash_entity ? t?.states[e.trash_entity] : null, r = e.person_1 ? t?.states[e.person_1] : null, a = e.person_2 ? t?.states[e.person_2] : null;
    return o`
      <div class="page">
        <div class="clock-block">
          <div class="time">${this._time}</div>
          <div class="date">${this._date}</div>
        </div>

        ${s ? this._renderWeather(s) : ""}

        ${n || i ? o`
          <div class="info-row">
            ${n ? this._renderCalendar(n) : ""}
            ${i ? this._renderTrash(i) : ""}
          </div>
        ` : ""}

        ${r || a ? o`
          <div class="persons-row">
            ${r ? this._renderPerson(r) : ""}
            ${a ? this._renderPerson(a) : ""}
          </div>
        ` : ""}
      </div>
    `;
  }
  _renderWeather(e) {
    const t = e.attributes.temperature, n = (e.attributes.forecast ?? [])[0];
    return o`
      <div class="card weather-card">
        <div class="weather-main">
          <span class="weather-icon">${Pt(e.state)}</span>
          <span class="weather-temp">${t != null ? `${Math.round(t)}°` : "–"}</span>
          <span class="weather-cond">${e.state.replace(/-/g, " ")}</span>
        </div>
        ${n ? o`
          <div class="weather-tmr">
            <span>${Pt(n.condition)}</span>
            <span>↑${Math.round(n.temperature)}°</span>
            ${n.templow != null ? o`<span>↓${Math.round(n.templow)}°</span>` : ""}
          </div>
        ` : ""}
      </div>
    `;
  }
  _renderCalendar(e) {
    const t = e.attributes.message, s = e.attributes.start_time, n = e.attributes.all_day;
    return t ? o`
      <div class="info-card">
        <div class="info-icon">📅</div>
        <div class="info-content">
          <div class="info-title">${t}</div>
          <div class="info-sub">${n ? "Ganztag" : s ? pe(s) : ""}</div>
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
          <div class="info-title">${de(e.state)}</div>
          <div class="info-sub">${t}</div>
        </div>
      </div>
    `;
  }
  _renderPerson(e) {
    const s = (e.attributes.friendly_name ?? e.entity_id).split(" ")[0], n = e.state === "home", i = e.attributes.entity_picture;
    return o`
      <div class="person-chip">
        <div class="person-avatar ${n ? "home" : ""}">
          ${i ? o`<img src="${i}" alt="${s}" />` : o`<span>${s[0]?.toUpperCase() ?? "?"}</span>`}
        </div>
        <div class="person-info">
          <div class="person-name">${s}</div>
          <div class="person-status ${n ? "home" : ""}">
            ${n ? "● Zu Hause" : "● Unterwegs"}
          </div>
        </div>
      </div>
    `;
  }
};
P.styles = [x, I, g`
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
W([
  u({ attribute: !1 })
], P.prototype, "hass", 2);
W([
  u({ attribute: !1 })
], P.prototype, "config", 2);
W([
  C()
], P.prototype, "_time", 2);
W([
  C()
], P.prototype, "_date", 2);
P = W([
  _("nspanel-page-home")
], P);
var he = Object.defineProperty, ve = Object.getOwnPropertyDescriptor, ct = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? ve(t, s) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && he(t, s, i), i;
};
let U = class extends f {
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
      <div class="page"><div class="empty">Kein Thermostat konfiguriert</div></div>
    `;
    const s = t.attributes.current_temperature, n = t.attributes.temperature, i = t.state, r = i === "heat";
    return o`
      <div class="page">
        <div class="pg-title">Thermostat</div>

        <div class="circle-wrap">
          <div class="temp-circle ${r ? "heating" : ""}">
            <div class="cur-temp">${s != null ? `${s.toFixed(1)}°` : "–"}</div>
            <div class="cur-label">aktuell</div>
          </div>
        </div>

        <div class="setpoint-row">
          <button class="btn-round" @click=${() => this._setTemp(-0.5)}>−</button>
          <div class="setpoint">
            <div class="set-val">${n != null ? `${n}°` : "–"}</div>
            <div class="set-label">Zieltemperatur</div>
          </div>
          <button class="btn-round" @click=${() => this._setTemp(0.5)}>+</button>
        </div>

        <div class="mode-row">
          <button class="mode-btn ${i === "off" ? "active-off" : ""}"
            @click=${() => this._setMode("off")}>Aus</button>
          <button class="mode-btn ${r ? "active-heat" : ""}"
            @click=${() => this._setMode("heat")}>Heizen</button>
        </div>
      </div>
    `;
  }
};
U.styles = [x, I, g`
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
ct([
  u({ attribute: !1 })
], U.prototype, "hass", 2);
ct([
  u({ attribute: !1 })
], U.prototype, "config", 2);
U = ct([
  _("nspanel-page-climate")
], U);
var ue = Object.defineProperty, fe = Object.getOwnPropertyDescriptor, pt = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? fe(t, s) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && ue(t, s, i), i;
};
const ge = ["cover_1", "cover_2", "cover_3", "cover_4", "cover_5", "cover_6", "cover_7", "cover_8"];
let L = class extends f {
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
    const e = this.config ?? {}, t = this.hass, s = ge.map((a) => e[a]).filter((a) => !!a), n = e.garden_light ? t?.states[e.garden_light] : null, i = n?.state === "on", r = n?.attributes.friendly_name ?? "Licht";
    return o`
      <div class="page">
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
          ${n ? o`
            <button class="light-btn ${i ? "on" : ""}" @click=${() => this._toggleLight()}>
              <span>${i ? "☀️" : "🌙"}</span>
              <span>${r}</span>
            </button>
          ` : ""}
          ${e.scene_up ? o`<button class="scene-btn" @click=${() => this._scene(e.scene_up)}>▲ Alle</button>` : ""}
          ${e.scene_down ? o`<button class="scene-btn" @click=${() => this._scene(e.scene_down)}>▼ Alle</button>` : ""}
        </div>
      </div>
    `;
  }
};
L.styles = [x, I, g`
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
pt([
  u({ attribute: !1 })
], L.prototype, "hass", 2);
pt([
  u({ attribute: !1 })
], L.prototype, "config", 2);
L = pt([
  _("nspanel-page-blinds")
], L);
var me = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, dt = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? _e(t, s) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && me(t, s, i), i;
};
function Ct(e) {
  return `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
}
let B = class extends f {
  _call(e, t) {
    const s = this.config?.media_player;
    if (!s) return;
    const [n, i] = e.split(".");
    this.hass.callService(n, i, { entity_id: s, ...t });
  }
  _volume(e) {
    this._call("media_player.volume_set", { volume_level: e.target.valueAsNumber });
  }
  render() {
    const e = this.config?.media_player, t = e ? this.hass?.states[e] : null;
    if (!t) return o`
      <div class="page"><div class="empty">Kein Media Player konfiguriert</div></div>
    `;
    const s = t.state === "playing", n = t.attributes.media_title ?? "", i = t.attributes.media_artist ?? "", r = t.attributes.entity_picture ?? "", a = t.attributes.volume_level ?? 0.5, c = t.attributes.media_duration ?? 0, l = t.attributes.media_position ?? 0, p = t.attributes.media_position_updated_at ?? "";
    let h = l;
    s && p && (h = Math.min(l + (Date.now() - new Date(p).getTime()) / 1e3, c));
    const d = c > 0 ? h / c : 0;
    return o`
      <div class="page">
        <div class="art-wrap">
          ${r ? o`<img class="art" src="${r}" alt="cover" />` : o`<div class="art art-empty">♪</div>`}
        </div>

        <div class="track-info">
          <div class="track-title">${n || (t.state === "off" ? "Aus" : "Kein Titel")}</div>
          ${i ? o`<div class="track-artist">${i}</div>` : ""}
        </div>

        ${c > 0 ? o`
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${d * 100}%"></div>
            </div>
            <div class="progress-times">
              <span>${Ct(h)}</span>
              <span>${Ct(c)}</span>
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
B.styles = [x, I, g`
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
dt([
  u({ attribute: !1 })
], B.prototype, "hass", 2);
dt([
  u({ attribute: !1 })
], B.prototype, "config", 2);
B = dt([
  _("nspanel-page-media")
], B);
var be = Object.defineProperty, ye = Object.getOwnPropertyDescriptor, ht = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? ye(t, s) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && be(t, s, i), i;
};
function tt(e) {
  return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(1)} kW` : `${Math.round(e)} W`;
}
let R = class extends f {
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.pv_entity ? t?.states[e.pv_entity] : null, n = e.grid_entity ? t?.states[e.grid_entity] : null, i = e.ev_entity ? t?.states[e.ev_entity] : null, r = s ? parseFloat(s.state) : null, a = n ? parseFloat(n.state) : null, c = i ? parseFloat(i.state) : null, l = a != null && a < 0, p = r != null && a != null ? r + (l ? a : 0) + (l ? 0 : a) : null;
    return o`
      <div class="page">
        <div class="pg-title">Energie</div>

        <div class="stats-grid">
          <div class="stat pv">
            <div class="stat-icon">☀️</div>
            <div class="stat-val">${r != null ? tt(r) : "–"}</div>
            <div class="stat-lbl">Erzeugung</div>
          </div>

          <div class="stat home">
            <div class="stat-icon">🏠</div>
            <div class="stat-val">${p != null ? tt(Math.abs(p)) : "–"}</div>
            <div class="stat-lbl">Verbrauch</div>
          </div>

          <div class="stat grid ${l ? "export" : "import"}">
            <div class="stat-icon">${l ? "⬆️" : "⬇️"}</div>
            <div class="stat-val">${a != null ? tt(Math.abs(a)) : "–"}</div>
            <div class="stat-lbl">${l ? "Einspeisung" : "Netzbezug"}</div>
          </div>

          <div class="stat ev ${i ? "" : "unavail"}">
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
R.styles = [x, I, g`
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
ht([
  u({ attribute: !1 })
], R.prototype, "hass", 2);
ht([
  u({ attribute: !1 })
], R.prototype, "config", 2);
R = ht([
  _("nspanel-page-energy")
], R);
var $e = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, vt = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? xe(t, s) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && $e(t, s, i), i;
};
const we = [
  { id: "home", label: "Home" },
  { id: "climate", label: "Climate" },
  { id: "blinds", label: "Blinds" },
  { id: "media", label: "Media" },
  { id: "energy", label: "Energy" }
], Ae = [
  { name: "weather_entity", label: "Wetter", selector: { entity: { domain: "weather" } } },
  { name: "calendar_entity", label: "Kalender", selector: { entity: { domain: "calendar" } } },
  { name: "trash_entity", label: "Müllabfuhr", selector: { entity: { domain: ["sensor", "calendar"] } } },
  { name: "person_1", label: "Person 1", selector: { entity: { domain: "person" } } },
  { name: "person_2", label: "Person 2", selector: { entity: { domain: "person" } } }
], Ee = [
  { name: "thermostat_entity", label: "Thermostat", selector: { entity: { domain: "climate" } } }
], Pe = [
  { name: "cover_1", label: "Jalousie 1", selector: { entity: { domain: "cover" } } },
  { name: "cover_2", label: "Jalousie 2", selector: { entity: { domain: "cover" } } },
  { name: "cover_3", label: "Jalousie 3", selector: { entity: { domain: "cover" } } },
  { name: "cover_4", label: "Jalousie 4", selector: { entity: { domain: "cover" } } },
  { name: "cover_5", label: "Jalousie 5", selector: { entity: { domain: "cover" } } },
  { name: "cover_6", label: "Jalousie 6", selector: { entity: { domain: "cover" } } },
  { name: "cover_7", label: "Jalousie 7", selector: { entity: { domain: "cover" } } },
  { name: "cover_8", label: "Jalousie 8", selector: { entity: { domain: "cover" } } },
  { name: "garden_light", label: "Gartenlicht", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "scene_up", label: "Szene: Alle hoch", selector: { entity: { domain: ["scene", "script"] } } },
  { name: "scene_down", label: "Szene: Alle runter", selector: { entity: { domain: ["scene", "script"] } } }
], Ce = [
  { name: "media_player", label: "Media Player", selector: { entity: { domain: "media_player" } } }
], Se = [
  { name: "pv_entity", label: "PV Leistung", selector: { entity: { domain: "sensor" } } },
  { name: "grid_entity", label: "Netz Leistung", selector: { entity: { domain: "sensor" } } },
  { name: "ev_entity", label: "Tesla SoC (optional)", selector: { entity: { domain: "sensor" } } }
], ze = [
  { name: "doorbell_trigger", label: "Klingel Trigger", selector: { entity: { domain: "binary_sensor" } } },
  { name: "doorbell_camera", label: "Kamera", selector: { entity: { domain: "camera" } } }
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
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${Oe}
        @value-changed=${this._merge}
      ></ha-form>
    `;
  }
  render() {
    if (!this._config) return o``;
    const e = this._config.pages ?? ["home"];
    return o`
      <style>
        .nsp-sec { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em;
          color:var(--secondary-text-color); margin:16px 0 4px; padding-bottom:4px;
          border-bottom:1px solid var(--divider-color); }
        .nsp-chips { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:8px; }
        .nsp-chip { padding:6px 14px; border-radius:980px; border:1.5px solid var(--divider-color);
          background:none; cursor:pointer; font-size:13px; color:var(--primary-text-color); }
        .nsp-chip.active { border-color:var(--primary-color); background:var(--primary-color); color:white; }
      </style>

      <div class="nsp-sec">Seiten</div>
      <div class="nsp-chips">
        ${we.map((t) => o`
          <button class="nsp-chip ${e.includes(t.id) ? "active" : ""}"
            @click=${() => this._togglePage(t.id)}>${t.label}</button>
        `)}
      </div>

      <div class="nsp-sec">Home</div>
      ${this._form(Ae)}

      <div class="nsp-sec">Climate</div>
      ${this._form(Ee)}

      <div class="nsp-sec">Jalousien</div>
      ${this._form(Pe)}

      <div class="nsp-sec">Media</div>
      ${this._form(Ce)}

      <div class="nsp-sec">Energie</div>
      ${this._form(Se)}

      <div class="nsp-sec">Türklingel</div>
      ${this._form(ze)}
    `;
  }
};
vt([
  u({ attribute: !1 })
], G.prototype, "hass", 2);
vt([
  C()
], G.prototype, "_config", 2);
G = vt([
  _("nspanel-dashboard-editor")
], G);
var Me = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, M = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? ke(t, s) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && Me(t, s, i), i;
};
let $ = class extends f {
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
        const n = e.get("hass")?.states[t]?.state !== "on", i = this.hass.states[t]?.state === "on";
        n && i && (this._doorbellActive = !0);
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
    const e = this.hass, t = this._config;
    switch (this._activePage) {
      case "home":
        return o`<nspanel-page-home    .hass=${e} .config=${t}></nspanel-page-home>`;
      case "climate":
        return o`<nspanel-page-climate .hass=${e} .config=${t}></nspanel-page-climate>`;
      case "blinds":
        return o`<nspanel-page-blinds  .hass=${e} .config=${t}></nspanel-page-blinds>`;
      case "media":
        return o`<nspanel-page-media   .hass=${e} .config=${t}></nspanel-page-media>`;
      case "energy":
        return o`<nspanel-page-energy  .hass=${e} .config=${t}></nspanel-page-energy>`;
      default:
        return o``;
    }
  }
};
$.styles = [x, g`
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
M([
  u({ attribute: !1 })
], $.prototype, "hass", 2);
M([
  C()
], $.prototype, "_config", 2);
M([
  C()
], $.prototype, "_activePage", 2);
M([
  C()
], $.prototype, "_doorbellActive", 2);
M([
  C()
], $.prototype, "_dark", 2);
$ = M([
  _("nspanel-dashboard")
], $);
export {
  $ as NspanelDashboard
};
