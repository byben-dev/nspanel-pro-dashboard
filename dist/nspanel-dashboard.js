/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, le = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ce = Symbol(), ge = /* @__PURE__ */ new WeakMap();
let Oe = class {
  constructor(e, t, n) {
    if (this._$cssResult$ = !0, n !== ce) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (le && e === void 0) {
      const n = t !== void 0 && t.length === 1;
      n && (e = ge.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && ge.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const He = (s) => new Oe(typeof s == "string" ? s : s + "", void 0, ce), g = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((n, r, i) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[i + 1], s[0]);
  return new Oe(t, s, ce);
}, Ne = (s, e) => {
  if (le) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), r = G.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = t.cssText, s.appendChild(n);
  }
}, me = le ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return He(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: je, defineProperty: Le, getOwnPropertyDescriptor: Be, getOwnPropertyNames: Ue, getOwnPropertySymbols: Re, getPrototypeOf: Ie } = Object, X = globalThis, be = X.trustedTypes, Ve = be ? be.emptyScript : "", We = X.reactiveElementPolyfillSupport, B = (s, e) => s, Z = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? Ve : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, pe = (s, e) => !je(s, e), _e = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: pe };
Symbol.metadata ??= Symbol("metadata"), X.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let S = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = _e) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
      r !== void 0 && Le(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: r, set: i } = Be(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: r, set(a) {
      const c = r?.call(this);
      i?.call(this, a), this.requestUpdate(e, c, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? _e;
  }
  static _$Ei() {
    if (this.hasOwnProperty(B("elementProperties"))) return;
    const e = Ie(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(B("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(B("properties"))) {
      const t = this.properties, n = [...Ue(t), ...Re(t)];
      for (const r of n) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [n, r] of t) this.elementProperties.set(n, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, n] of this.elementProperties) {
      const r = this._$Eu(t, n);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const r of n) t.unshift(me(r));
    } else e !== void 0 && t.push(me(e));
    return t;
  }
  static _$Eu(e, t) {
    const n = t.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ne(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, n) {
    this._$AK(e, n);
  }
  _$ET(e, t) {
    const n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
    if (r !== void 0 && n.reflect === !0) {
      const i = (n.converter?.toAttribute !== void 0 ? n.converter : Z).toAttribute(t, n.type);
      this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const n = this.constructor, r = n._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const i = n.getPropertyOptions(r), a = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : Z;
      this._$Em = r;
      const c = a.fromAttribute(t, i.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, n, r = !1, i) {
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? pe)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
      this.C(e, t, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), i !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, i] of this._$Ep) this[r] = i;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, i] of n) {
        const { wrapped: a } = i, c = this[r];
        a !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, i, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[B("elementProperties")] = /* @__PURE__ */ new Map(), S[B("finalized")] = /* @__PURE__ */ new Map(), We?.({ ReactiveElement: S }), (X.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = globalThis, ye = (s) => s, Y = de.trustedTypes, $e = Y ? Y.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Me = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, De = "?" + $, Je = `<${De}>`, C = document, U = () => C.createComment(""), R = (s) => s === null || typeof s != "object" && typeof s != "function", he = Array.isArray, Ke = (s) => he(s) || typeof s?.[Symbol.iterator] == "function", ae = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xe = /-->/g, we = />/g, E = RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ae = /'/g, Ee = /"/g, Fe = /^(?:script|style|textarea|title)$/i, qe = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), o = qe(1), z = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ke = /* @__PURE__ */ new WeakMap(), k = C.createTreeWalker(C, 129);
function Te(s, e) {
  if (!he(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $e !== void 0 ? $e.createHTML(e) : e;
}
const Ge = (s, e) => {
  const t = s.length - 1, n = [];
  let r, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = L;
  for (let c = 0; c < t; c++) {
    const l = s[c];
    let h, v, p = -1, b = 0;
    for (; b < l.length && (a.lastIndex = b, v = a.exec(l), v !== null); ) b = a.lastIndex, a === L ? v[1] === "!--" ? a = xe : v[1] !== void 0 ? a = we : v[2] !== void 0 ? (Fe.test(v[2]) && (r = RegExp("</" + v[2], "g")), a = E) : v[3] !== void 0 && (a = E) : a === E ? v[0] === ">" ? (a = r ?? L, p = -1) : v[1] === void 0 ? p = -2 : (p = a.lastIndex - v[2].length, h = v[1], a = v[3] === void 0 ? E : v[3] === '"' ? Ee : Ae) : a === Ee || a === Ae ? a = E : a === xe || a === we ? a = L : (a = E, r = void 0);
    const y = a === E && s[c + 1].startsWith("/>") ? " " : "";
    i += a === L ? l + Je : p >= 0 ? (n.push(h), l.slice(0, p) + Me + l.slice(p) + $ + y) : l + $ + (p === -2 ? c : y);
  }
  return [Te(s, i + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class I {
  constructor({ strings: e, _$litType$: t }, n) {
    let r;
    this.parts = [];
    let i = 0, a = 0;
    const c = e.length - 1, l = this.parts, [h, v] = Ge(e, t);
    if (this.el = I.createElement(h, n), k.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = k.nextNode()) !== null && l.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith(Me)) {
          const b = v[a++], y = r.getAttribute(p).split($), q = /([.?@])?(.*)/.exec(b);
          l.push({ type: 1, index: i, name: q[2], strings: y, ctor: q[1] === "." ? Ye : q[1] === "?" ? Qe : q[1] === "@" ? Xe : ee }), r.removeAttribute(p);
        } else p.startsWith($) && (l.push({ type: 6, index: i }), r.removeAttribute(p));
        if (Fe.test(r.tagName)) {
          const p = r.textContent.split($), b = p.length - 1;
          if (b > 0) {
            r.textContent = Y ? Y.emptyScript : "";
            for (let y = 0; y < b; y++) r.append(p[y], U()), k.nextNode(), l.push({ type: 2, index: ++i });
            r.append(p[b], U());
          }
        }
      } else if (r.nodeType === 8) if (r.data === De) l.push({ type: 2, index: i });
      else {
        let p = -1;
        for (; (p = r.data.indexOf($, p + 1)) !== -1; ) l.push({ type: 7, index: i }), p += $.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const n = C.createElement("template");
    return n.innerHTML = e, n;
  }
}
function O(s, e, t = s, n) {
  if (e === z) return e;
  let r = n !== void 0 ? t._$Co?.[n] : t._$Cl;
  const i = R(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== i && (r?._$AO?.(!1), i === void 0 ? r = void 0 : (r = new i(s), r._$AT(s, t, n)), n !== void 0 ? (t._$Co ??= [])[n] = r : t._$Cl = r), r !== void 0 && (e = O(s, r._$AS(s, e.values), r, n)), e;
}
class Ze {
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
    const { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? C).importNode(t, !0);
    k.currentNode = r;
    let i = k.nextNode(), a = 0, c = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let h;
        l.type === 2 ? h = new W(i, i.nextSibling, this, e) : l.type === 1 ? h = new l.ctor(i, l.name, l.strings, this, e) : l.type === 6 && (h = new et(i, this, e)), this._$AV.push(h), l = n[++c];
      }
      a !== l?.index && (i = k.nextNode(), a++);
    }
    return k.currentNode = C, r;
  }
  p(e) {
    let t = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, t), t += n.strings.length - 2) : n._$AI(e[t])), t++;
  }
}
class W {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, n, r) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = O(this, e, t), R(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== z && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ke(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && R(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = I.createElement(Te(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const i = new Ze(r, this), a = i.u(this.options);
      i.p(t), this.T(a), this._$AH = i;
    }
  }
  _$AC(e) {
    let t = ke.get(e.strings);
    return t === void 0 && ke.set(e.strings, t = new I(e)), t;
  }
  k(e) {
    he(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let n, r = 0;
    for (const i of e) r === t.length ? t.push(n = new W(this.O(U()), this.O(U()), this, this.options)) : n = t[r], n._$AI(i), r++;
    r < t.length && (this._$AR(n && n._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const n = ye(e).nextSibling;
      ye(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ee {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, n, r, i) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = u;
  }
  _$AI(e, t = this, n, r) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) e = O(this, e, t, 0), a = !R(e) || e !== this._$AH && e !== z, a && (this._$AH = e);
    else {
      const c = e;
      let l, h;
      for (e = i[0], l = 0; l < i.length - 1; l++) h = O(this, c[n + l], t, l), h === z && (h = this._$AH[l]), a ||= !R(h) || h !== this._$AH[l], h === u ? e = u : e !== u && (e += (h ?? "") + i[l + 1]), this._$AH[l] = h;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ye extends ee {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Qe extends ee {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class Xe extends ee {
  constructor(e, t, n, r, i) {
    super(e, t, n, r, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = O(this, e, t, 0) ?? u) === z) return;
    const n = this._$AH, r = e === u && n !== u || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== u && (n === u || r);
    r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class et {
  constructor(e, t, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const tt = de.litHtmlPolyfillSupport;
tt?.(I, W), (de.litHtmlVersions ??= []).push("3.3.3");
const st = (s, e, t) => {
  const n = t?.renderBefore ?? e;
  let r = n._$litPart$;
  if (r === void 0) {
    const i = t?.renderBefore ?? null;
    n._$litPart$ = r = new W(e.insertBefore(U(), i), i, void 0, t ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ve = globalThis;
class f extends S {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = st(t, this.renderRoot, this.renderOptions);
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
f._$litElement$ = !0, f.finalized = !0, ve.litElementHydrateSupport?.({ LitElement: f });
const rt = ve.litElementPolyfillSupport;
rt?.({ LitElement: f });
(ve.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const m = (s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = { attribute: !0, type: String, converter: Z, reflect: !1, hasChanged: pe }, it = (s = nt, e, t) => {
  const { kind: n, metadata: r } = t;
  let i = globalThis.litPropertyMetadata.get(r);
  if (i === void 0 && globalThis.litPropertyMetadata.set(r, i = /* @__PURE__ */ new Map()), n === "setter" && ((s = Object.create(s)).wrapped = !0), i.set(t.name, s), n === "accessor") {
    const { name: a } = t;
    return { set(c) {
      const l = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(a, l, s, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, s, c), c;
    } };
  }
  if (n === "setter") {
    const { name: a } = t;
    return function(c) {
      const l = this[a];
      e.call(this, c), this.requestUpdate(a, l, s, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function d(s) {
  return (e, t) => typeof t == "object" ? it(s, e, t) : ((n, r, i) => {
    const a = r.hasOwnProperty(i);
    return r.constructor.createProperty(i, n), a ? Object.getOwnPropertyDescriptor(r, i) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function A(s) {
  return d({ ...s, state: !0, attribute: !1 });
}
const _ = g`
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

    --nsp-card-border:   rgba(0,0,0,0.07);
    --nsp-card-shadow:   0 1px 4px rgba(0,0,0,0.06);

    --nsp-glow-1: rgba(0,122,255,0.08);
    --nsp-glow-2: rgba(175,82,222,0.06);
    --nsp-glass-blur: blur(24px) saturate(160%);

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
    --nsp-surface:       #000000;
    --nsp-surface-2:     #1C1C1E;
    --nsp-surface-3:     #2C2C2E;

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

    --nsp-card-border:   rgba(255,255,255,0.1);
    --nsp-card-shadow:   inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 24px rgba(0,0,0,0.35);

    --nsp-glow-1: rgba(10,132,255,0.18);
    --nsp-glow-2: rgba(191,90,242,0.14);
    --nsp-glass-blur: blur(24px) saturate(180%);

    --nsp-nav-bg: rgba(0,0,0,0.55);
  }
`, J = g`
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
    background:
      radial-gradient(ellipse at 15% 20%, var(--nsp-glow-1) 0%, transparent 60%),
      radial-gradient(ellipse at 85% 80%, var(--nsp-glow-2) 0%, transparent 60%),
      var(--nsp-bg);
  }
  .card {
    background: var(--nsp-surface-2);
    border-radius: var(--nsp-r3);
    padding: var(--nsp-s4);
    border: 0.5px solid var(--nsp-card-border, transparent);
    box-shadow: var(--nsp-card-shadow, none);
    backdrop-filter: var(--nsp-glass-blur);
    -webkit-backdrop-filter: var(--nsp-glass-blur);
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
var at = Object.defineProperty, ot = Object.getOwnPropertyDescriptor, te = (s, e, t, n) => {
  for (var r = n > 1 ? void 0 : n ? ot(e, t) : e, i = s.length - 1, a; i >= 0; i--)
    (a = s[i]) && (r = (n ? a(e, t, r) : a(r)) || r);
  return n && r && at(e, t, r), r;
};
const lt = {
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  climate: "M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.52V18h-4v-4.48A5 5 0 0 1 7 9a5 5 0 0 1 5-5z",
  blinds: "M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z",
  media: "M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z",
  energy: "M7 2v11h3v9l7-12h-4l4-8z"
}, Ce = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy"
};
let M = class extends f {
  constructor() {
    super(...arguments), this.pages = [], this.activePage = "home", this.customLabels = {};
  }
  _tap(s) {
    this.dispatchEvent(new CustomEvent("page-change", { detail: { page: s }, bubbles: !0, composed: !0 }));
  }
  render() {
    return o`
      <nav>
        ${this.pages.map((s) => o`
          <button
            class=${s === this.activePage ? "active" : ""}
            @click=${() => this._tap(s)}
            aria-label=${Ce[s]}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d=${lt[s]} />
            </svg>
            <span>${this.customLabels[s] ?? Ce[s]}</span>
          </button>
        `)}
      </nav>
    `;
  }
};
M.styles = [_, g`
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
te([
  d({ type: Array })
], M.prototype, "pages", 2);
te([
  d({ type: String })
], M.prototype, "activePage", 2);
te([
  d({ attribute: !1 })
], M.prototype, "customLabels", 2);
M = te([
  m("nspanel-bottom-nav")
], M);
var ct = Object.defineProperty, pt = Object.getOwnPropertyDescriptor, N = (s, e, t, n) => {
  for (var r = n > 1 ? void 0 : n ? pt(e, t) : e, i = s.length - 1, a; i >= 0; i--)
    (a = s[i]) && (r = (n ? a(e, t, r) : a(r)) || r);
  return n && r && ct(e, t, r), r;
};
const dt = {
  sunny: "☀️",
  "clear-night": "🌙",
  partlycloudy: "⛅",
  cloudy: "☁️",
  fog: "🌫️",
  rainy: "🌦️",
  pouring: "🌧️",
  snowy: "❄️",
  "snowy-rainy": "🌨️",
  hail: "🌨️",
  lightning: "⚡",
  "lightning-rainy": "⛈️",
  windy: "💨",
  "windy-variant": "🌬️"
};
function ht(s) {
  const e = parseInt(s, 10);
  if (!isNaN(e) && String(e) === s.trim())
    return e === 0 ? "Heute" : e === 1 ? "Morgen" : `+${e}d`;
  const t = new Date(s);
  if (!isNaN(t.getTime())) {
    const n = /* @__PURE__ */ new Date(), r = new Date(n);
    return r.setDate(n.getDate() + 1), t.toDateString() === n.toDateString() ? "Heute" : t.toDateString() === r.toDateString() ? "Morgen" : t.toLocaleDateString("de-AT", { weekday: "short", day: "numeric" });
  }
  return s;
}
let x = class extends f {
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
    const s = /* @__PURE__ */ new Date();
    this._time = s.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" }), this._date = s.toLocaleDateString("de-AT", { weekday: "short", day: "numeric", month: "short" });
  }
  render() {
    const s = this.config ?? {}, e = this.hass, t = s.weather_entity ? e?.states[s.weather_entity] : null, n = s.trash_entity ? e?.states[s.trash_entity] : null, r = t?.attributes.temperature, i = t ? dt[t.state] ?? "🌡️" : null;
    return o`
      <div class="bar ${this.dark ? "nsp-dark" : ""}">
        <div class="left">
          <span class="time">${this._time}</span>
          <span class="date">${this._date}</span>
        </div>
        <div class="right">
          ${i ? o`<span class="chip">${i}${r != null ? ` ${Math.round(r)}°` : ""}</span>` : ""}
          ${n ? o`<span class="chip">🗑️ ${ht(n.state)}</span>` : ""}
        </div>
      </div>
    `;
  }
};
x.styles = [_, g`
    .bar {
      height: 34px;
      padding: 0 var(--nsp-s4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      background: var(--nsp-bg);
      border-bottom: 0.5px solid var(--nsp-separator);
    }
    .left {
      display: flex;
      align-items: baseline;
      gap: 7px;
    }
    .time {
      font-family: var(--nsp-font);
      font-size: 17px;
      font-weight: 600;
      letter-spacing: -0.03em;
      color: var(--nsp-text-1);
    }
    .date {
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-2);
    }
    .right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .chip {
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-2);
    }
  `];
N([
  d({ attribute: !1 })
], x.prototype, "hass", 2);
N([
  d({ attribute: !1 })
], x.prototype, "config", 2);
N([
  d({ type: Boolean })
], x.prototype, "dark", 2);
N([
  A()
], x.prototype, "_time", 2);
N([
  A()
], x.prototype, "_date", 2);
x = N([
  m("nspanel-status-bar")
], x);
var vt = Object.defineProperty, ut = Object.getOwnPropertyDescriptor, ue = (s, e, t, n) => {
  for (var r = n > 1 ? void 0 : n ? ut(e, t) : e, i = s.length - 1, a; i >= 0; i--)
    (a = s[i]) && (r = (n ? a(e, t, r) : a(r)) || r);
  return n && r && vt(e, t, r), r;
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
V.styles = [_, g`
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
ue([
  d({ attribute: !1 })
], V.prototype, "hass", 2);
ue([
  d({ type: String })
], V.prototype, "cameraEntity", 2);
V = ue([
  m("nspanel-doorbell-popup")
], V);
var ft = Object.defineProperty, gt = Object.getOwnPropertyDescriptor, K = (s, e, t, n) => {
  for (var r = n > 1 ? void 0 : n ? gt(e, t) : e, i = s.length - 1, a; i >= 0; i--)
    (a = s[i]) && (r = (n ? a(e, t, r) : a(r)) || r);
  return n && r && ft(e, t, r), r;
};
function mt(s) {
  if (s.start.date) return "Ganztag";
  const e = new Date(s.start.dateTime), t = s.end.dateTime ? new Date(s.end.dateTime) : null, n = (r) => r.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
  return t ? `${n(e)} – ${n(t)}` : n(e);
}
let P = class extends f {
  constructor() {
    super(...arguments), this.dark = !1, this._calEvents = [], this._calFetched = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._calTimer = window.setInterval(() => this._fetchCalendar(), 15 * 60 * 1e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this._calTimer);
  }
  updated(s) {
    s.has("hass") && this.hass && !this._calFetched && this.config?.calendar_entity && (this._calFetched = !0, this._fetchCalendar());
  }
  async _fetchCalendar() {
    const s = this.config?.calendar_entity;
    if (!s || !this.hass) return;
    const e = /* @__PURE__ */ new Date();
    e.setHours(0, 0, 0, 0);
    const t = /* @__PURE__ */ new Date();
    t.setHours(23, 59, 59, 999);
    try {
      const n = await this.hass.callWS({
        type: "calendar/event/list",
        entity_id: s,
        start_date_time: e.toISOString(),
        end_date_time: t.toISOString()
      });
      this._calEvents = n ?? [];
    } catch {
      this._calEvents = [];
    }
  }
  _toggleLight(s) {
    const e = this.hass?.states[s]?.state === "on", t = s.split(".")[0];
    this.hass.callService(t, e ? "turn_off" : "turn_on", { entity_id: s });
  }
  render() {
    const s = this.config ?? {}, e = this.hass, t = s.person_1 ? e?.states[s.person_1] : null, n = s.person_2 ? e?.states[s.person_2] : null, r = s.garden_light ? e?.states[s.garden_light] : null, i = s.light_2 ? e?.states[s.light_2] : null;
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        ${s.calendar_entity ? o`
          <div class="section-label">Heute</div>
          <div class="events-list">
            ${this._calEvents.length > 0 ? this._calEvents.map((a) => o`
                <div class="event-row">
                  <div class="event-dot"></div>
                  <div class="event-body">
                    <div class="event-title">${a.summary}</div>
                    <div class="event-time">${mt(a)}</div>
                  </div>
                </div>
              `) : o`<div class="no-events">Keine Termine heute</div>`}
          </div>
        ` : o`<div class="spacer"></div>`}

        ${t || n ? o`
          <div class="persons-row">
            ${t ? this._renderPerson(s.person_1, t) : ""}
            ${n ? this._renderPerson(s.person_2, n) : ""}
          </div>
        ` : ""}

        ${r || i ? o`
          <div class="lights-row">
            ${r ? this._renderLight(s.garden_light, r) : ""}
            ${i ? this._renderLight(s.light_2, i) : ""}
          </div>
        ` : ""}

      </div>
    `;
  }
  _renderPerson(s, e) {
    const n = (e.attributes.friendly_name ?? s).split(" ")[0], r = e.state === "home", i = e.attributes.entity_picture;
    return o`
      <div class="person-chip">
        <div class="person-avatar ${r ? "home" : ""}">
          ${i ? o`<img src="${i}" alt="${n}" />` : o`<span>${n[0]?.toUpperCase() ?? "?"}</span>`}
        </div>
        <div class="person-info">
          <div class="person-name">${n}</div>
          <div class="person-status ${r ? "home" : ""}">
            ${r ? "● Zu Hause" : "● Unterwegs"}
          </div>
        </div>
      </div>
    `;
  }
  _renderLight(s, e) {
    const t = e.state === "on", n = e.attributes.friendly_name ?? s.split(".")[1];
    return o`
      <button class="light-btn ${t ? "on" : ""}" @click=${() => this._toggleLight(s)}>
        <span class="light-icon">${t ? "☀️" : "🌙"}</span>
        <span class="light-name">${n}</span>
      </button>
    `;
  }
};
P.styles = [_, J, g`
    .page { gap: var(--nsp-s2); }
    .spacer { flex: 1; }

    .section-label {
      font-family: var(--nsp-font);
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--nsp-text-3);
      padding: 0 2px;
      flex-shrink: 0;
    }

    .events-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
      overflow-y: auto;
      min-height: 0;
    }

    .event-row {
      display: flex;
      align-items: flex-start;
      gap: var(--nsp-s2);
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: var(--nsp-s3);
      flex-shrink: 0;
    }

    .event-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--nsp-accent);
      margin-top: 4px;
      flex-shrink: 0;
    }

    .event-body { flex: 1; min-width: 0; }

    .event-title {
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .event-time {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 2px;
    }

    .no-events {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
    }

    .persons-row {
      display: flex;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }

    .person-chip {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
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

    .person-info { flex: 1; min-width: 0; }
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

    .lights-row {
      display: flex;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }

    .light-btn {
      flex: 1;
      height: 48px;
      border-radius: var(--nsp-r2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
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
    .light-btn.on {
      background: var(--nsp-yellow);
      border-color: transparent;
      box-shadow: none;
      color: #000;
    }
    .light-btn:active { opacity: 0.7; }
    .light-icon { font-size: 16px; }
    .light-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
    }
  `];
K([
  d({ attribute: !1 })
], P.prototype, "hass", 2);
K([
  d({ attribute: !1 })
], P.prototype, "config", 2);
K([
  d({ type: Boolean })
], P.prototype, "dark", 2);
K([
  A()
], P.prototype, "_calEvents", 2);
P = K([
  m("nspanel-page-home")
], P);
var bt = Object.defineProperty, _t = Object.getOwnPropertyDescriptor, se = (s, e, t, n) => {
  for (var r = n > 1 ? void 0 : n ? _t(e, t) : e, i = s.length - 1, a; i >= 0; i--)
    (a = s[i]) && (r = (n ? a(e, t, r) : a(r)) || r);
  return n && r && bt(e, t, r), r;
};
let D = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _setTemp(s) {
    const e = this.config?.thermostat_entity;
    if (!e) return;
    const t = this.hass?.states[e]?.attributes.temperature ?? 20;
    this.hass.callService("climate", "set_temperature", {
      entity_id: e,
      temperature: Math.round((t + s) * 2) / 2
    });
  }
  _setMode(s) {
    const e = this.config?.thermostat_entity;
    e && this.hass.callService("climate", "set_hvac_mode", { entity_id: e, hvac_mode: s });
  }
  render() {
    const s = this.config?.thermostat_entity, e = s ? this.hass?.states[s] : null;
    if (!e) return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">Kein Thermostat konfiguriert</div></div>
    `;
    const t = e.attributes.current_temperature, n = e.attributes.temperature, r = e.state, i = r === "heat";
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="pg-title">Thermostat</div>

        <div class="circle-wrap">
          <div class="temp-circle ${i ? "heating" : ""}">
            <div class="cur-temp">${t != null ? `${t.toFixed(1)}°` : "–"}</div>
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
          <button class="mode-btn ${r === "off" ? "active-off" : ""}"
            @click=${() => this._setMode("off")}>Aus</button>
          <button class="mode-btn ${i ? "active-heat" : ""}"
            @click=${() => this._setMode("heat")}>Heizen</button>
        </div>
      </div>
    `;
  }
};
D.styles = [_, J, g`
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
      border: 2px solid var(--nsp-card-border, var(--nsp-surface-3));
      background: var(--nsp-surface-2);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .temp-circle.heating {
      border-color: var(--nsp-orange);
      box-shadow: 0 0 32px rgba(255,159,10,0.25);
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
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
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
      border: 0.5px solid var(--nsp-card-border, var(--nsp-surface-3));
      background: var(--nsp-surface-2);
      box-shadow: var(--nsp-card-shadow, none);
      font-family: var(--nsp-font);
      font-size: 15px;
      font-weight: 500;
      color: var(--nsp-text-2);
      cursor: pointer;
    }
    .mode-btn.active-off {
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
se([
  d({ attribute: !1 })
], D.prototype, "hass", 2);
se([
  d({ attribute: !1 })
], D.prototype, "config", 2);
se([
  d({ type: Boolean })
], D.prototype, "dark", 2);
D = se([
  m("nspanel-page-climate")
], D);
var yt = Object.defineProperty, $t = Object.getOwnPropertyDescriptor, re = (s, e, t, n) => {
  for (var r = n > 1 ? void 0 : n ? $t(e, t) : e, i = s.length - 1, a; i >= 0; i--)
    (a = s[i]) && (r = (n ? a(e, t, r) : a(r)) || r);
  return n && r && yt(e, t, r), r;
};
const xt = ["cover_1", "cover_2", "cover_3", "cover_4", "cover_5", "cover_6", "cover_7", "cover_8"];
let F = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _cover(s, e) {
    this.hass.callService("cover", e, { entity_id: s });
  }
  _scene(s) {
    const e = s.split(".")[0];
    this.hass.callService(e === "scene" ? "scene" : "script", "turn_on", { entity_id: s });
  }
  render() {
    const s = this.config ?? {}, e = this.hass, t = xt.map((n) => s[n]).filter((n) => !!n);
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="covers-list">
          ${t.map((n) => {
      const r = e?.states[n];
      if (!r) return o``;
      const i = r.attributes.friendly_name ?? n, a = r.attributes.current_position;
      return o`
              <div class="cover-row">
                <div class="cover-name">${i}</div>
                ${a != null ? o`<div class="cover-pos">${a}%</div>` : ""}
                <div class="cover-btns">
                  <button class="cov-btn" @click=${() => this._cover(n, "open_cover")}>▲</button>
                  <button class="cov-btn" @click=${() => this._cover(n, "stop_cover")}>■</button>
                  <button class="cov-btn" @click=${() => this._cover(n, "close_cover")}>▼</button>
                </div>
              </div>
            `;
    })}
        </div>

        ${s.scene_up || s.scene_down ? o`
          <div class="bottom-bar">
            ${s.scene_up ? o`<button class="scene-btn" @click=${() => this._scene(s.scene_up)}>▲ Alle</button>` : ""}
            ${s.scene_down ? o`<button class="scene-btn" @click=${() => this._scene(s.scene_down)}>▼ Alle</button>` : ""}
          </div>
        ` : ""}
      </div>
    `;
  }
};
F.styles = [_, J, g`
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
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: 0 var(--nsp-s3);
      height: 46px;
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
    .scene-btn {
      flex: 1;
      height: 46px;
      padding: 0 var(--nsp-s3);
      border-radius: var(--nsp-r2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      background: var(--nsp-surface-2);
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 500;
      color: var(--nsp-text-2);
      cursor: pointer;
    }
    .scene-btn:active { opacity: 0.6; }
  `];
re([
  d({ attribute: !1 })
], F.prototype, "hass", 2);
re([
  d({ attribute: !1 })
], F.prototype, "config", 2);
re([
  d({ type: Boolean })
], F.prototype, "dark", 2);
F = re([
  m("nspanel-page-blinds")
], F);
var wt = Object.defineProperty, At = Object.getOwnPropertyDescriptor, ne = (s, e, t, n) => {
  for (var r = n > 1 ? void 0 : n ? At(e, t) : e, i = s.length - 1, a; i >= 0; i--)
    (a = s[i]) && (r = (n ? a(e, t, r) : a(r)) || r);
  return n && r && wt(e, t, r), r;
};
function Pe(s) {
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}
let T = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _call(s, e) {
    const t = this.config?.media_player;
    if (!t) return;
    const [n, r] = s.split(".");
    this.hass.callService(n, r, { entity_id: t, ...e });
  }
  _volume(s) {
    this._call("media_player.volume_set", { volume_level: s.target.valueAsNumber });
  }
  render() {
    const s = this.config?.media_player, e = s ? this.hass?.states[s] : null;
    if (!e) return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">Kein Media Player konfiguriert</div></div>
    `;
    const t = e.state === "playing", n = e.attributes.media_title ?? "", r = e.attributes.media_artist ?? "", i = e.attributes.entity_picture ?? "", a = e.attributes.volume_level ?? 0.5, c = e.attributes.media_duration ?? 0, l = e.attributes.media_position ?? 0, h = e.attributes.media_position_updated_at ?? "";
    let v = l;
    t && h && (v = Math.min(l + (Date.now() - new Date(h).getTime()) / 1e3, c));
    const p = c > 0 ? v / c : 0;
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="art-wrap">
          ${i ? o`<img class="art" src="${i}" alt="cover" />` : o`<div class="art art-empty">♪</div>`}
        </div>

        <div class="track-info">
          <div class="track-title">${n || (e.state === "off" ? "Aus" : "Kein Titel")}</div>
          ${r ? o`<div class="track-artist">${r}</div>` : ""}
        </div>

        ${c > 0 ? o`
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${p * 100}%"></div>
            </div>
            <div class="progress-times">
              <span>${Pe(v)}</span>
              <span>${Pe(c)}</span>
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
            ${t ? o`<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>` : o`<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M8 5v14l11-7z"/></svg>`}
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
T.styles = [_, J, g`
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
ne([
  d({ attribute: !1 })
], T.prototype, "hass", 2);
ne([
  d({ attribute: !1 })
], T.prototype, "config", 2);
ne([
  d({ type: Boolean })
], T.prototype, "dark", 2);
T = ne([
  m("nspanel-page-media")
], T);
var Et = Object.defineProperty, kt = Object.getOwnPropertyDescriptor, ie = (s, e, t, n) => {
  for (var r = n > 1 ? void 0 : n ? kt(e, t) : e, i = s.length - 1, a; i >= 0; i--)
    (a = s[i]) && (r = (n ? a(e, t, r) : a(r)) || r);
  return n && r && Et(e, t, r), r;
};
function oe(s) {
  return Math.abs(s) >= 1e3 ? `${(s / 1e3).toFixed(1)} kW` : `${Math.round(s)} W`;
}
let H = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  render() {
    const s = this.config ?? {}, e = this.hass, t = s.pv_entity ? e?.states[s.pv_entity] : null, n = s.grid_entity ? e?.states[s.grid_entity] : null, r = s.ev_entity ? e?.states[s.ev_entity] : null, i = t ? parseFloat(t.state) : null, a = n ? parseFloat(n.state) : null, c = r ? parseFloat(r.state) : null, l = a != null && a < 0, h = i != null && a != null ? i + (l ? a : 0) + (l ? 0 : a) : null;
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="pg-title">Energie</div>

        <div class="stats-grid">
          <div class="stat pv">
            <div class="stat-icon">☀️</div>
            <div class="stat-val">${i != null ? oe(i) : "–"}</div>
            <div class="stat-lbl">Erzeugung</div>
          </div>

          <div class="stat home">
            <div class="stat-icon">🏠</div>
            <div class="stat-val">${h != null ? oe(Math.abs(h)) : "–"}</div>
            <div class="stat-lbl">Verbrauch</div>
          </div>

          <div class="stat grid ${l ? "export" : "import"}">
            <div class="stat-icon">${l ? "⬆️" : "⬇️"}</div>
            <div class="stat-val">${a != null ? oe(Math.abs(a)) : "–"}</div>
            <div class="stat-lbl">${l ? "Einspeisung" : "Netzbezug"}</div>
          </div>

          <div class="stat ev ${r ? "" : "unavail"}">
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
H.styles = [_, J, g`
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
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
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
ie([
  d({ attribute: !1 })
], H.prototype, "hass", 2);
ie([
  d({ attribute: !1 })
], H.prototype, "config", 2);
ie([
  d({ type: Boolean })
], H.prototype, "dark", 2);
H = ie([
  m("nspanel-page-energy")
], H);
var Ct = Object.defineProperty, Pt = Object.getOwnPropertyDescriptor, fe = (s, e, t, n) => {
  for (var r = n > 1 ? void 0 : n ? Pt(e, t) : e, i = s.length - 1, a; i >= 0; i--)
    (a = s[i]) && (r = (n ? a(e, t, r) : a(r)) || r);
  return n && r && Ct(e, t, r), r;
};
const Se = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy"
}, ze = [
  { id: "home" },
  { id: "climate" },
  { id: "blinds" },
  { id: "media" },
  { id: "energy" }
], St = [
  { name: "weather_entity", label: "Wetter (weather.*)", selector: { entity: { domain: "weather" } } },
  { name: "calendar_entity", label: "Kalender (calendar.*)", selector: { entity: { domain: "calendar" } } },
  { name: "trash_entity", label: "Müllabfuhr (sensor.* / calendar.*)", selector: { entity: { domain: ["sensor", "calendar"] } } },
  { name: "person_1", label: "Person 1 (person.*)", selector: { entity: { domain: "person" } } },
  { name: "person_2", label: "Person 2 (person.*)", selector: { entity: { domain: "person" } } },
  { name: "garden_light", label: "Licht 1 (light.* / switch.*)", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "light_2", label: "Licht 2 (light.* / switch.*) — optional", selector: { entity: { domain: ["light", "switch"] } } }
], zt = [
  { name: "thermostat_entity", label: "Thermostat (climate.*)", selector: { entity: { domain: "climate" } } }
], Ot = [
  { name: "cover_1", label: "Cover / Jalousie 1 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_2", label: "Cover / Jalousie 2 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_3", label: "Cover / Jalousie 3 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_4", label: "Cover / Jalousie 4 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_5", label: "Cover / Jalousie 5 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_6", label: "Cover / Jalousie 6 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_7", label: "Cover / Jalousie 7 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "cover_8", label: "Cover / Jalousie 8 (cover.*)", selector: { entity: { domain: "cover" } } },
  { name: "scene_up", label: "Szene: Alle öffnen (scene.* / script.*)", selector: { entity: { domain: ["scene", "script"] } } },
  { name: "scene_down", label: "Szene: Alle schließen (scene.* / script.*)", selector: { entity: { domain: ["scene", "script"] } } }
], Mt = [
  { name: "media_player", label: "Media Player (media_player.*)", selector: { entity: { domain: "media_player" } } }
], Dt = [
  { name: "pv_entity", label: "PV Erzeugung (sensor.*, W oder kW)", selector: { entity: { domain: "sensor" } } },
  { name: "grid_entity", label: "Netzbezug/-einspeisung (sensor.*, W oder kW — negativ = Einspeisung)", selector: { entity: { domain: "sensor" } } },
  { name: "ev_entity", label: "EV / Akku SoC in % (sensor.*) — optional", selector: { entity: { domain: "sensor" } } }
], Ft = [
  { name: "doorbell_trigger", label: "Klingel-Auslöser (binary_sensor.*)", selector: { entity: { domain: "binary_sensor" } } },
  { name: "doorbell_camera", label: "Kamera für Livestream (camera.*)", selector: { entity: { domain: "camera" } } }
], Tt = (s) => s.label ?? s.name;
let Q = class extends f {
  createRenderRoot() {
    return this;
  }
  setConfig(s) {
    this._config = s;
  }
  _merge(s) {
    this._config = { ...this._config, ...s.detail.value }, this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: !0,
      composed: !0
    }));
  }
  _togglePage(s) {
    const e = [...this._config.pages ?? ["home"]], t = e.indexOf(s);
    t >= 0 ? e.length > 1 && e.splice(t, 1) : e.push(s), this._config = { ...this._config, pages: e }, this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: !0,
      composed: !0
    }));
  }
  _form(s) {
    return o`
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${s}
        .computeLabel=${Tt} @value-changed=${this._merge}></ha-form>
    `;
  }
  render() {
    if (!this._config) return o``;
    const s = this._config, e = s.pages ?? ["home"], t = (r) => `${r}_label`, n = (r) => s[t(r)] ?? "";
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
        ${ze.map((r) => o`
          <button class="nsp-chip ${e.includes(r.id) ? "active" : ""}"
            @click=${() => this._togglePage(r.id)}>
            ${n(r.id) || Se[r.id]}
          </button>
        `)}
      </div>
      <details class="nsp-details">
        <summary>Tab-Namen anpassen</summary>
        <div class="nsp-details-body">
          ${this._form(ze.map((r) => ({
      name: `${r.id}_label`,
      label: `${Se[r.id]} — benutzerdefinierter Name`,
      selector: { text: {} }
    })))}
        </div>
      </details>

      <div class="nsp-sec">Home</div>
      ${this._form(St)}

      <div class="nsp-sec">Climate</div>
      ${this._form(zt)}

      <div class="nsp-sec">Cover / Jalousien</div>
      ${this._form(Ot)}

      <div class="nsp-sec">Media</div>
      ${this._form(Mt)}

      <div class="nsp-sec">Energie</div>
      ${this._form(Dt)}

      <div class="nsp-sec">Türklingel</div>
      ${this._form(Ft)}

      <div class="nsp-sec">Hintergrund</div>
      ${this._form([
      { name: "bg_accent_1", label: "Glow-Farbe 1 (Hex, z.B. #0A84FF — leer = iOS Blau)", selector: { text: {} } },
      { name: "bg_accent_2", label: "Glow-Farbe 2 (Hex, z.B. #BF5AF2 — leer = iOS Lila)", selector: { text: {} } }
    ])}
    `;
  }
};
fe([
  d({ attribute: !1 })
], Q.prototype, "hass", 2);
fe([
  A()
], Q.prototype, "_config", 2);
Q = fe([
  m("nspanel-dashboard-editor")
], Q);
var Ht = Object.defineProperty, Nt = Object.getOwnPropertyDescriptor, j = (s, e, t, n) => {
  for (var r = n > 1 ? void 0 : n ? Nt(e, t) : e, i = s.length - 1, a; i >= 0; i--)
    (a = s[i]) && (r = (n ? a(e, t, r) : a(r)) || r);
  return n && r && Ht(e, t, r), r;
};
let w = class extends f {
  constructor() {
    super(...arguments), this._activePage = "home", this._doorbellActive = !1, this._dark = !1;
  }
  _glowVar(s, e) {
    if (!s) return "";
    const t = s.replace("#", "");
    if (t.length !== 6) return "";
    const n = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16);
    return `rgba(${n},${r},${i},${e})`;
  }
  static getConfigElement() {
    return document.createElement("nspanel-dashboard-editor");
  }
  static getStubConfig() {
    return { pages: ["home", "climate", "blinds", "media", "energy"] };
  }
  setConfig(s) {
    if (!s) throw new Error("Invalid config");
    this._config = s;
    const e = s.pages ?? ["home"];
    e.includes(this._activePage) || (this._activePage = e[0]);
  }
  updated(s) {
    if (s.has("hass") && this.hass) {
      this._dark = this.hass.themes?.darkMode ?? !1;
      const e = this._config?.doorbell_trigger;
      if (e) {
        const n = s.get("hass")?.states[e]?.state !== "on", r = this.hass.states[e]?.state === "on";
        n && r && (this._doorbellActive = !0);
      }
    }
  }
  get _pages() {
    return this._config?.pages ?? ["home"];
  }
  render() {
    if (!this._config) return o``;
    const s = this._dark, e = s ? 0.18 : 0.09, t = this._glowVar(this._config.bg_accent_1, e), n = this._glowVar(this._config.bg_accent_2, e), r = [t ? `--nsp-glow-1:${t}` : "", n ? `--nsp-glow-2:${n}` : ""].filter(Boolean).join(";");
    return o`
      <div class="shell ${s ? "nsp-dark" : ""}" style="${r}">
        <nspanel-status-bar
          .hass=${this.hass}
          .config=${this._config}
          ?dark=${s}
        ></nspanel-status-bar>
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
          @page-change=${(i) => {
      this._activePage = i.detail.page;
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
    const s = this.hass, e = this._config, t = this._dark;
    switch (this._activePage) {
      case "home":
        return o`<nspanel-page-home    .hass=${s} .config=${e} ?dark=${t}></nspanel-page-home>`;
      case "climate":
        return o`<nspanel-page-climate .hass=${s} .config=${e} ?dark=${t}></nspanel-page-climate>`;
      case "blinds":
        return o`<nspanel-page-blinds  .hass=${s} .config=${e} ?dark=${t}></nspanel-page-blinds>`;
      case "media":
        return o`<nspanel-page-media   .hass=${s} .config=${e} ?dark=${t}></nspanel-page-media>`;
      case "energy":
        return o`<nspanel-page-energy  .hass=${s} .config=${e} ?dark=${t}></nspanel-page-energy>`;
      default:
        return o``;
    }
  }
};
w.styles = [_, g`
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
j([
  d({ attribute: !1 })
], w.prototype, "hass", 2);
j([
  A()
], w.prototype, "_config", 2);
j([
  A()
], w.prototype, "_activePage", 2);
j([
  A()
], w.prototype, "_doorbellActive", 2);
j([
  A()
], w.prototype, "_dark", 2);
w = j([
  m("nspanel-dashboard")
], w);
export {
  w as NspanelDashboard
};
